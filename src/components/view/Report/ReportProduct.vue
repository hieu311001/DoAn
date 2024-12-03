<template>
    <div>
        <!-- Lựa chọn hiển thị theo tháng hoặc năm -->
        <div class="options flex mt-1">
            <label>
                <input type="radio" v-model="timePeriod" value="month" /> Theo tháng
            </label>
            <label>
                <input type="radio" v-model="timePeriod" value="year" /> Theo năm
            </label>
            <div class="order-status flex" v-if="userInfo.Role == 0">
                <BaseCombobox id="category" propValue="StoreID" propText="StoreText" :valueCombobox="storeID"
                    v-model="storeID" :data=stores :resetValue="resetValue" />
            </div>
        </div>

        <!-- Bảng sản phẩm bán chạy với khả năng scroll dọc -->
        <div class="product-table-wrapper">
            <table class="product-table">
                <thead>
                    <tr>
                        <th>Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng bán</th>
                        <th>Doanh thu</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, index) in productReport" :key="index">
                        <td><img :src="product.Image" alt="Ảnh sản phẩm" width="50" /></td>
                        <td>{{ product.ProductName }}</td>
                        <td>{{ product.TotalOrders }}</td>
                        <td>{{ formatNumber(product.TotalPrice) }} đ</td>
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

const stores = ref(null);
const storeID = ref(null);

const timePeriod = ref('month'); // Mặc định là theo tháng
const chartCanvas = ref(null);
let chartInstance = null;

// Dữ liệu biểu đồ cho doanh thu sản phẩm bán chạy
const chartData = computed(() => {
    return {
        labels: productReport.value.map(product => product.ProductName),
        datasets: [{
            label: 'Doanh thu sản phẩm',
            data: productReport.value.map(product => product.TotalPrice),
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
            text: 'Biểu đồ doanh thu theo từng sản phẩm'
        },
        tooltip: {
            callbacks: {
                label: (context) => {
                    return `${context.label}: ${context.raw.toLocaleString()} đ`;
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
        storeID: storeID.value || storeID,
        isMonth: timePeriod.value == 'month' ? false : true
    }
    await store.dispatch('getProductByProductOrder', param);
}

const processStore = () => {
    let storeInfo = store.state.stores.storeInfo;
    storeInfo.forEach(item => {
        if (item.StoreID == '00000000-0000-0000-0000-000000000000') {
            item.StoreText = 'Tất cả';
        }
    })

    stores.value = storeInfo;
}

// Watch sự thay đổi của thời gian
watch(timePeriod, async (newPeriod) => {
    await loadProduct();
    processProduct(); // Cập nhật lại dữ liệu khi thay đổi thời gian
});

// Watch sự thay đổi của thời gian
watch(storeID, async (newStore) => {
    let param = {
        storeID: newStore,
        isMonth: timePeriod.value == 'month' ? false : true
    }
    await store.dispatch('getProductByProductOrder', param);
    processProduct(); // Cập nhật lại dữ liệu khi thay đổi thời gian
});


// Khởi tạo khi component được mount
onMounted(async () => {
    await store.dispatch('getStore');
    processStore();
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
</style>
