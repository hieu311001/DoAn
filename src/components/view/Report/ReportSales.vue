<template>
    <div>
        <!-- Tùy chọn lựa chọn khoảng thời gian -->
        <div class="options flex mt-1">
            <div class="date-picker">
                <label for="fromDate">Từ ngày:</label>
                <input type="date" id="fromDate" v-model="fromDate" />
            </div>
            <div class="date-picker">
                <label for="toDate">Đến ngày:</label>
                <input type="date" id="toDate" v-model="toDate" />
            </div>
            <div class="date-picker" v-if="userInfo.Role == 0">
                <label>Cửa hàng:</label>
                <BaseCombobox id="category" propValue="StoreID" propText="StoreText"
                    :valueCombobox="storeID" v-model="storeID" :data=stores
                    :resetValue="resetValue" />
            </div>
        </div>

        <!-- Thông tin tổng quan -->
        <div class="summary">
            <p><strong>Tổng doanh thu:</strong> {{ formatNumber(dataReport.TotalMoney) }} đ</p>
            <p><strong>Số đơn hàng:</strong> {{ dataReport.TotalOrder }}</p>
            <p><strong>Tổng số khách hàng:</strong> {{ dataReport.TotalUser }}</p>
        </div>

        <!-- Biểu đồ doanh thu -->
        <div class="chart">
            <canvas ref="chartCanvas"></canvas>
        </div>
    </div>
</template>

<script setup>
import Chart from 'chart.js/auto';
import { ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; // Trả về null nếu không tìm thấy cookie
};

const userInfo = ref(JSON.parse(getCookie('userInfo')));

const productOrders = ref([]);
const stores = ref(null);
const storeID = ref(null);

const dataReport = ref({
    TotalMoney: null,
    TotalOrder: null,
    TotalUser: null
});

// Lấy ngày đầu tiên và ngày cuối cùng của tháng hiện tại
const currentDate = new Date();
const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 2);
const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

const fromDate = ref(firstDayOfMonth.toISOString().substr(0, 10));
const toDate = ref(lastDayOfMonth.toISOString().substr(0, 10));

const chartCanvas = ref(null);
let chartInstance = null;

const formatNumber = (number) => {
    return new Intl.NumberFormat('vi-VN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(number);
};

// Hàm vẽ biểu đồ
const renderChart = (data) => {
    if (chartInstance) {
        chartInstance.destroy();
    }
    chartInstance = new Chart(chartCanvas.value, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Biểu đồ doanh thu'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Thời gian'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Doanh thu (đ)'
                    }
                }
            }
        }
    });
};

// Xử lý dữ liệu theo khoảng thời gian
const processProductOrder = () => {
    const start = new Date(fromDate.value);
    const end = new Date(toDate.value);
    
    // Lọc đơn hàng trong khoảng thời gian
    const filteredOrders = productOrders.value.filter(order => {
        const orderDate = new Date(order.OrderDate);
        return orderDate >= start && orderDate <= end && order.Status == 2;
    });

    // Sắp xếp đơn hàng theo thời gian (từ cũ đến mới)
    filteredOrders.sort((a, b) => new Date(a.OrderDate) - new Date(b.OrderDate));

    // Tổng hợp dữ liệu
    dataReport.value.TotalMoney = filteredOrders.reduce((sum, order) => sum + order.TotalPrice, 0);
    dataReport.value.TotalUser = (new Set(filteredOrders.map(order => order.UserID))).size;
    dataReport.value.TotalOrder = filteredOrders.length;

    // Chuẩn bị dữ liệu biểu đồ
    const chartData = {
        labels: filteredOrders.map(order => new Date(order.OrderDate).toLocaleDateString('vi-VN')),
        datasets: [{
            label: 'Doanh thu',
            data: filteredOrders.map(order => order.TotalPrice),
            borderColor: '#42A5F5',
            fill: false,
            tension: 0.4
        }]
    };

    // Vẽ biểu đồ
    renderChart(chartData);
};

// Watch sự thay đổi của khoảng thời gian
watch([fromDate, toDate], processProductOrder);

// Watch sự thay đổi của thời gian
watch(storeID, async (newStore) => {
    await store.dispatch('getOrder', newStore);
    productOrders.value = store.state.productOrder.dataProductOrders;
    processProductOrder(); // Cập nhật lại dữ liệu khi thay đổi thời gian
});

// Khởi tạo
onMounted(async () => {
    await store.dispatch('getStore');

    let storex = store.state.stores.storeInfo;
    stores.value = storex.filter(f => {
        if (f.StoreID == '00000000-0000-0000-0000-000000000000') {
            f.StoreName = "Tất cả";
            f.StoreText = "Tất cả";
        }

        return f;
    });
    const defaultStoreID = userInfo.value.Role === 1 ? userInfo.value.StoreID : '00000000-0000-0000-0000-000000000000';
    await store.dispatch('getOrder', defaultStoreID);
    productOrders.value = store.state.productOrder.dataProductOrders;
    processProductOrder();
});
</script>

<style scoped>
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

.summary {
    margin-bottom: 20px;
}

.summary p {
    font-size: 18px;
    margin: 5px 0;
}

.chart {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
}
</style>
