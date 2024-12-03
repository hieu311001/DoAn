<template>
    <div>
        <!-- Lựa chọn hiển thị theo tháng hoặc năm -->
        <div class="options">
            <label>
                <input type="radio" v-model="timePeriod" value="month" /> Theo ngày
            </label>
            <label>
                <input type="radio" v-model="timePeriod" value="year" /> Theo tháng
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
const storageReport = computed(() => store.state.stores.storageReportInfo);
const storageReportInfo = ref(null);

const timePeriod = ref('month');
const chartCanvas = ref(null);
const chartCanvas2 = ref(null);
let chartInstance = null;
let chartInstance2 = null;

const chartData = computed(() => {
    const filteredData = storageReport.value.filter(product => product.TotalStorageImport);

    return {
        labels: filteredData.map(store => store.ProductName),
        datasets: [{
            label: 'Doanh thu sản phẩm',
            data: filteredData.map(product => product.TotalStorageImport),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', 'orange'],
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56', 'orange'],
            borderWidth: 1
        }]
    };
});

const chartData2 = computed(() => {
    const filteredData = storageReport.value.filter(product => product.TotalStorageExport);

    return {
        labels: filteredData.map(store => store.ProductName),
        datasets: [{
            label: 'Số lượng đơn hàng bán ra',
            data: filteredData.map(product => product.TotalStorageExport),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', 'orange'],
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56', 'orange'],
            borderWidth: 1
        }]
    };
});

const chartOptions = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Biểu đồ nhập hàng'
        },
        tooltip: {
            callbacks: {
                label: (context) => {
                    return `${context.label}: ${context.raw.toLocaleString()} sản phẩm`;
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
            text: 'Biểu đồ xuất hàng'
        },
        tooltip: {
            callbacks: {
                label: (context) => {
                    return `${context.label}: ${context.raw.toLocaleString()} sản phẩm`;
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

const processStorageReport = () => {

};

const loadStorageReport = async () => {
    let isMonth = timePeriod.value === 'month' ? false : true;
    await store.dispatch('getStorageReport', isMonth);
};

watch(timePeriod, async () => {
    processStorageReport();
    renderChart();
});

onMounted(async () => {
    await loadStorageReport();
    processStorageReport();
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
