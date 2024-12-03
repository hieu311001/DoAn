<template>
    <div>
        <!-- Lựa chọn hiển thị theo tháng hoặc năm -->
        <div class="options">
            <label>
                <input type="radio" v-model="timePeriod" value="month" /> Theo tháng
            </label>
            <label>
                <input type="radio" v-model="timePeriod" value="year" /> Theo năm
            </label>
        </div>

        <!-- Biểu đồ sản phẩm bán chạy -->
        <div class="chart flex">
            <canvas ref="chartCanvas"></canvas>
            <canvas ref="chartCanvas2"></canvas>
        </div>
    </div>
</template>

<script setup>
import Chart from 'chart.js/auto';
import { ref, onMounted, computed, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

const userInfo = ref(JSON.parse(getCookie('userInfo')));
const storeReport = computed(() => store.state.stores.storeReportInfo);
const storeReportInfo = ref(null);

const timePeriod = ref('month');
const chartCanvas = ref(null);
const chartCanvas2 = ref(null);
let chartInstance = null;
let chartInstance2 = null;

const chartData = computed(() => {
    return {
        labels: storeReportInfo.value.map(store => store.StoreText),
        datasets: [{
            label: 'Doanh thu sản phẩm',
            data: storeReportInfo.value.map(product => product.TotalPrice),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            borderWidth: 1
        }]
    };
});

const chartData2 = computed(() => {
    return {
        labels: storeReportInfo.value.map(store => store.StoreText),
        datasets: [{
            label: 'Số lượng đơn hàng bán ra',
            data: storeReportInfo.value.map(product => product.OrderCount || 0),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            borderWidth: 1
        }]
    };
});

const chartOptions = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Biểu đồ doanh thu theo từng cửa hàng'
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

const chartOptions2 = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Biểu đồ số lượng đơn hàng bán ra'
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

const renderChart = () => {
    if (!getCookie('token')) {
        return;
    }
    if (chartInstance) {
        chartInstance.destroy();
    }
    if (chartInstance2) {
        chartInstance2.destroy();
    }

    chartInstance = new Chart(chartCanvas.value, {
        type: 'pie',
        data: chartData.value,
        options: chartOptions
    });

    chartInstance2 = new Chart(chartCanvas2.value, {
        type: 'pie',
        data: chartData2.value,
        options: chartOptions2
    });
};

const processStoreReport = () => {
    let store = storeReport.value.reduce((acc, item) => {
        if (!acc[item.StoreID]) {
            acc[item.StoreID] = { StoreID: item.StoreID, TotalPrice: 0, OrderCount: 0 };
        }
        acc[item.StoreID].TotalPrice += item.TotalPrice;
        acc[item.StoreID].OrderCount += 1;
        acc[item.StoreID].StoreText = item.StoreName + " - " + item.Address;
        return acc;
    }, {});

    storeReportInfo.value = Object.values(store);
};

const loadStoreReport = async () => {
    let isMonth = timePeriod.value === 'month' ? false : true;
    await store.dispatch('getStoreReport', isMonth);
};

watch(timePeriod, async () => {
    await loadStoreReport();
    processStoreReport();
    renderChart();
});

onMounted(async () => {
    await loadStoreReport();
    processStoreReport();
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

.chart {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
    height: 400px;
}

body {
    overflow-x: hidden;
    margin: 0;
    padding: 0;
}
</style>
