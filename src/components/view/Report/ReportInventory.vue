<template>
    <div>
        <!-- Lựa chọn hiển thị theo tháng hoặc năm -->
        <div class="options flex mt-1">
            <div class="date-picker">
                <label for="fromDate">Từ ngày:</label>
                <input type="date" id="fromDate" v-model="fromDate" />
            </div>
            <div class="date-picker">
                <label for="toDate">Đến ngày:</label>
                <input type="date" id="toDate" v-model="toDate" />
            </div>
        </div>

        <!-- Bảng sản phẩm bán chạy với khả năng scroll dọc -->
        <div class="product-table-wrapper">
            <table class="product-table">
                <thead>
                    <tr>
                        <th>Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng tồn kho</th>
                        <th>Số lượng đã nhập</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, index) in productReport" :key="index">
                        <td><img :src="product.Image" alt="Ảnh sản phẩm" width="50" /></td>
                        <td>{{ product.ProductName }}</td>
                        <td>{{ product.TotalStorage }}</td>
                        <td>{{ product.TotalStorageOrder }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Biểu đồ sản phẩm bán chạy -->
        <div class="chart">
            <canvas ref="chartCanvas"></canvas>
        </div>
    </div>
</template>

<script setup>
import Chart from 'chart.js/auto'
import { ref, onMounted, onUpdated, computed, watch, reactive, onBeforeMount, watchEffect } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; // Trả về null nếu không tìm thấy cookie
}

const userInfo = ref(JSON.parse(getCookie('userInfo')));

const productReport = computed(() => store.state.product.dataProductReport);

const formatNumber = (number) => {
    return new Intl.NumberFormat('vi-VN', {
        minimumFractionDigits: 0, // Số chữ số thập phân tối thiểu
        maximumFractionDigits: 2, // Số chữ số thập phân tối đa
    }).format(number);
};

const timePeriod = ref('month'); // Mặc định là theo tháng
const chartCanvas = ref(null);
let chartInstance = null;

// Lấy ngày đầu tiên và ngày cuối cùng của tháng hiện tại
const currentDate = new Date();
const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 2);
const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

const fromDate = ref(firstDayOfMonth.toISOString().substr(0, 10));
const toDate = ref(lastDayOfMonth.toISOString().substr(0, 10));

// Dữ liệu biểu đồ cho doanh thu sản phẩm bán chạy
const chartData = computed(() => {
    return {
        labels: productReport.value.map(product => product.ProductName),
        datasets: [{
            label: 'Doanh thu sản phẩm',
            data: productReport.value.map(product => product.TotalStorageOrder),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            borderWidth: 1
        }]
    };
});

// Cấu hình biểu đồ
const chartOptions = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Biểu đồ số lượng sản phẩm nhập kho'
        },
        tooltip: {
            callbacks: {
                label: (context) => {
                    return `${context.label}: ${context.raw.toLocaleString()}`;
                }
            }
        }
    }
};

// Hàm vẽ biểu đồ
const renderChart = () => {
    if (!getCookie('token')) {
        return;
    }
    if (chartInstance) {
        chartInstance.destroy(); // Hủy biểu đồ cũ trước khi vẽ mới
    }
    chartInstance = new Chart(chartCanvas.value, {
        type: 'pie', // Biểu đồ tròn
        data: chartData.value,
        options: chartOptions
    });
};

const processProduct = () => {

}

const loadProduct = async () => {
    let storeID = '00000000-0000-0000-0000-000000000000';
    if (userInfo.value.Role == 1) {
        storeID = userInfo.value.StoreID;
    }
    let param = {
        storeID: storeID,
        fromDate: fromDate.value,
        toDate: toDate.value
    }
    await store.dispatch('getProductReportByStorageOrder', param);
}

// Watch sự thay đổi của khoảng thời gian
watch([fromDate, toDate], async () => {
    await loadProduct();
    processProduct(); // Cập nhật lại dữ liệu khi thay đổi thời gian
});

// Khởi tạo khi component được mount
onMounted(async () => {
    await loadProduct();
    renderChart();
});
</script>

<style scoped>
.options {
    margin-bottom: 20px;
}

.options label {
    margin-right: 10px;
}

.product-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.product-table th,
.product-table td {
    padding: 10px;
    text-align: center;
    border: 1px solid #ddd;
}

.product-table th {
    background-color: #f4f4f4;
    font-weight: bold;
}

.chart {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    /* Đảm bảo biểu đồ không quá rộng */
    margin: 0 auto;
    height: 600px;
    /* Giảm chiều cao của biểu đồ */
}

/* Cải thiện scroll của bảng và biểu đồ */
.product-table-wrapper {
    max-height: 280px;
    /* Chiều cao tối đa của bảng */
    overflow-y: auto;
    /* Kích hoạt scroll dọc khi bảng vượt quá chiều cao */
    margin-bottom: 20px;
    /* Khoảng cách dưới bảng */
}

.chart {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    /* Đảm bảo biểu đồ không quá rộng */
    margin: 20px auto;
    /* Thêm khoảng cách bên ngoài biểu đồ */
    height: 500px;
    /* Giảm chiều cao của biểu đồ */
}

body {
    overflow-x: hidden;
    /* Ngăn scroll ngang */
    margin: 0;
    padding: 0;
}

/* Đảm bảo các phần tử chiếm 100% chiều rộng và chiều cao */
html,
body,
.product-table-wrapper,
.chart {
    height: 100%;
}

div {
    box-sizing: border-box;
    /* Đảm bảo không bị tràn bội */
}

/* Đảm bảo trang không bị lệch scroll ngang */
body {
    overflow-x: hidden;
}

.options {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    align-items: center;
}


.date-picker {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.date-picker label {
    font-size: 14px;
    margin-bottom: 5px;
    font-weight: bold;
}

.date-picker input {
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    width: 150px;
}
</style>
