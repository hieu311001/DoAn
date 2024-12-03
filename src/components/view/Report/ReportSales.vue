<template>
    <div>
        <!-- Tùy chọn lựa chọn hiển thị theo ngày trong tháng hoặc tháng trong năm -->
        <div class="options flex mt-1">
            <label>
                <input type="radio" v-model="timePeriod" value="day" /> Theo ngày trong tháng
            </label>
            <label>
                <input type="radio" v-model="timePeriod" value="month" /> Theo tháng trong năm
            </label>
            <div class="order-status flex" v-if="userInfo.Role == 0">
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
import Chart from 'chart.js/auto'
import { ref, onMounted, onUpdated, computed, watch, reactive, onBeforeMount, watchEffect, nextTick } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; // Trả về null nếu không tìm thấy cookie
}

const userInfo = ref(JSON.parse(getCookie('userInfo')));

const productOrders = computed(() => store.state.productOrder.dataProductOrders);
const stores = ref(null);
const storeID = ref(null);

const dataReport = ref({
    TotalMoney: null,
    TotalOrder: null,
    TotalUser: null
})


const timePeriod = ref('day') // Lựa chọn mặc định: theo ngày trong tháng
const chartCanvas = ref(null)
let chartInstance = null;

const formatNumber = (number) => {
    return new Intl.NumberFormat('vi-VN', {
        minimumFractionDigits: 0, // Số chữ số thập phân tối thiểu
        maximumFractionDigits: 2, // Số chữ số thập phân tối đa
    }).format(number);
};

// Dữ liệu biểu đồ theo ngày trong tháng
const dayData = {
    labels: Array.from({ length: 31 }, (_, i) => `Ngày ${i + 1}`),
    datasets: [{
        label: 'Doanh thu hàng ngày',
        data: Array(31).fill(0), // Dữ liệu doanh thu theo ngày (sẽ cập nhật sau)
        fill: false,
        borderColor: '#42A5F5',
        tension: 0.4,
        borderWidth: 2
    }]
};

// Dữ liệu biểu đồ theo tháng trong năm
const monthData = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    datasets: [{
        label: 'Doanh thu theo tháng',
        data: Array(12).fill(0), // Dữ liệu doanh thu theo tháng (sẽ cập nhật sau)
        fill: false,
        borderColor: '#42A5F5',
        tension: 0.4,
        borderWidth: 2
    }]
};

// Cấu hình biểu đồ
const chartOptions = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Biểu đồ doanh thu'
        },
        tooltip: {
            mode: 'index',
            intersect: false
        }
    },
    scales: {
        x: {
            title: {
                display: true,
                text: timePeriod.value === 'day' ? 'Ngày' : 'Tháng'
            }
        },
        y: {
            title: {
                display: true,
                text: 'Doanh thu (đ)'
            }
        }
    }
};

// Hàm vẽ biểu đồ
const renderChart = (data) => {
    if (!getCookie('token')) {
        return;
    }

    if (chartInstance) {
        chartInstance.destroy(); // Hủy biểu đồ cũ trước khi vẽ mới
    }
    chartInstance = new Chart(chartCanvas.value, {
        type: 'line',
        data: data,
        options: chartOptions
    });
};

// Xử lý dữ liệu cho tổng doanh thu, số đơn hàng và số khách hàng
const processProductOrder = () => {
    let curDate = new Date();
    let curMonth =  curDate.getMonth() + 1;
    let curYear =  curDate.getYear();
    let dailyRevenue = Array(31).fill(0); // Doanh thu theo ngày
    let monthlyRevenue = Array(12).fill(0); // Doanh thu theo tháng

    let orderDone = productOrders.value.filter(item => item.Status == 2);

    if (timePeriod.value == 'day') {
        let orderDay = orderDone.filter(item => {
            var a = new Date(item.OrderDate);
            if (a.getMonth() + 1 == curMonth && a.getYear() == curYear) {
                return true;
            }
        })

        orderDay.forEach(order => {
            let day = (new Date(order.OrderDate)).getDate();
            dailyRevenue[day-1] += order.TotalPrice;
        })

        dataReport.value.TotalMoney = orderDay.reduce((sum, order) => sum + order.TotalPrice, 0);
        dataReport.value.TotalUser = (new Set(orderDay.map(order => order.UserID))).size;
        dataReport.value.TotalOrder = orderDay.length;
    } else if (timePeriod.value == 'month') {
        let orderMonth = orderDone.filter(item => {
            var a = new Date(item.OrderDate);
            if (a.getYear() == curYear) {
                return true;
            }
        })

        orderMonth.forEach(order => {
            let month = (new Date(order.OrderDate)).getMonth() + 1;
            monthlyRevenue[month-1] += order.TotalPrice;
        })

        dataReport.value.TotalMoney = orderMonth.reduce((sum, order) => sum + order.TotalPrice, 0);
        dataReport.value.TotalUser = (new Set(orderMonth.map(order => order.UserID))).size;
        dataReport.value.TotalOrder = orderMonth.length;
    }

    // Cập nhật dữ liệu doanh thu vào biểu đồ
    dayData.datasets[0].data = dailyRevenue;
    monthData.datasets[0].data = monthlyRevenue;

    // Render lại biểu đồ sau khi cập nhật dữ liệu
    renderChart(timePeriod.value === 'day' ? dayData : monthData);
};

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
watch(timePeriod, (newPeriod) => {
    processProductOrder(); // Cập nhật lại dữ liệu khi thay đổi thời gian
});

// Watch sự thay đổi của thời gian
watch(storeID, async (newStore) => {
    await store.dispatch('getOrder', newStore);
    processProductOrder(); // Cập nhật lại dữ liệu khi thay đổi thời gian
});



// Khởi tạo biểu đồ khi component được mount
onMounted(async () => {
    await store.dispatch('getStore');
    processStore();
    let storeID = '00000000-0000-0000-0000-000000000000';
    if (userInfo.value.Role == 1) {
        storeID = userInfo.value.StoreID;
    }
    await store.dispatch('getOrder', storeID);
    processProductOrder();
    renderChart(dayData) // Mặc định vẽ theo ngày trong tháng
})
</script>

<style scoped>
.options {
    margin-bottom: 20px;
}

.options label {
    margin-right: 10px;
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