<template>
    <div class="container-sell">
        <div class="title h-4">
            Báo cáo cửa hàng
        </div>
        <div class="content">
            <div class="tabs flex gap-8">
                <BaseButton @click="showContent('sales')" class="m-button btn-white" v-if="userInfo?.Role != 2"
                    :class="{ active: activeTab === 'sales' }" text="Doanh số"></BaseButton>
                <BaseButton @click="showContent('products')" class="m-button btn-white" v-if="userInfo?.Role != 3 && userInfo?.Role != 2"
                    :class="{ active: activeTab === 'products' }" text="Sản phẩm"></BaseButton>
                <BaseButton @click="showContent('inventory')" class="m-button btn-white" v-if="userInfo?.Role != 3 && userInfo?.Role != 0 && userInfo?.Role != 2"
                    :class="{ active: activeTab === 'inventory' }" text="Tồn kho"></BaseButton>
                <BaseButton @click="showContent('store')" class="m-button btn-white" v-if="userInfo?.Role == 0"
                    :class="{ active: activeTab === 'store' }" text="Cửa hàng"></BaseButton>
                <BaseButton @click="showContent('storage')" class="m-button btn-white" v-if="userInfo?.Role == 2"
                    :class="{ active: activeTab === 'storage' }" text="Xuất nhập kho"></BaseButton>
            </div>
            <div class="content-grid">
                <div v-if="activeTab === 'sales'">
                    <ReportSales></ReportSales>
                </div>
                <div v-if="activeTab === 'products'">
                    <ReportProduct></ReportProduct>
                </div>
                <div v-if="activeTab === 'inventory' && userInfo.Role != 0">
                    <ReportInventory></ReportInventory>
                </div>
                <div v-if="activeTab === 'store' && userInfo.Role == 0">
                    <ReportStore></ReportStore>
                </div>
                <div v-if="activeTab === 'storage' && userInfo.Role == 2">
                    <ReportStorage></ReportStorage>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import BaseButton from '@/components/base/button/BaseButton.vue';
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { formatDate, getValueEnum } from '@/common/commonFn';
import ReportSales from './ReportSales.vue';
import ReportProduct from './ReportProduct.vue';
import ReportInventory from './ReportInventory.vue';
import ReportStore from './ReportStore.vue';
import ReportStorage from './ReportStorage.vue';

const activeTab = ref(null);
const showStorageDetail = ref(false);
const showOrder = ref(false);

// Quản lý trạng thái hover và popup
const hoveredProductId = ref(null);

const store = useStore();

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; // Trả về null nếu không tìm thấy cookie
}

const userInfo = ref(JSON.parse(getCookie('userInfo')));

const productOrder = ref(null);
const storageOrder = ref(null);

const showContent = (tab) => {
    activeTab.value = tab;
};

const formatNumber = (number) => {
    return new Intl.NumberFormat('vi-VN', {
        minimumFractionDigits: 0, // Số chữ số thập phân tối thiểu
        maximumFractionDigits: 2, // Số chữ số thập phân tối đa
    }).format(number);
};

onMounted(() => {
    if (userInfo.value.Role == 2) {
        activeTab.value = 'storage';
    } else {
        activeTab.value = 'sales';
    }
})
</script>

<style lang="scss" scoped>
.container-sell {
    .active {
        font-weight: 700;
    }

    padding: 24px;

    .content {
        margin-top: 12px;
    }

    .list-search {
        width: 240px;
        height: 32px;
    }

    .filter-left {
        position: relative;
    }

    .box-filter {
        width: 360px;
        margin-top: 4px;
        position: absolute;
        top: 100%;

        display: block;
        z-index: 15;
        border-radius: 4px;
        box-shadow: 0 0 16px rgba(23, 27, 42, .24);

        padding: 24px;
        background-color: #fff;
        z-index: 999;

        .filter-item {
            margin-top: 12px;
        }

        .filter-bot {
            justify-content: flex-end;
            padding-top: 12px;
        }
    }

    .cart-button {
        position: relative;
        display: inline-block;
        cursor: pointer;
        padding: 5px 20px;
        border: 1px solid black;
        border-radius: 5px;
    }

    .badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background-color: red;
        color: white;
        border-radius: 50%;
        padding: 5px 10px;
        font-size: 12px;
        min-width: 24px;
        min-height: 24px;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .content-grid {
        height: calc(100vh - 236px);
        overflow: auto;
        margin-top: 12px;

        .content-tab {
            margin-top: 12px;
        }

        .product-box {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            background-color: white;
            transition: transform 0.2s;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .product-box:hover {
            transform: scale(1.05);
            /* Hiệu ứng phóng to nhẹ khi hover */
        }

        .image-container {
            position: relative;
            width: 100%;
            height: 200px;
            /* Đặt chiều cao cố định hoặc điều chỉnh theo ý muốn */
            overflow: hidden;
            border-radius: 8px;
            /* Bo góc ảnh nếu cần */
        }

        .product-image {
            object-fit: cover;
            /* Đảm bảo ảnh lấp đầy container mà không bị méo */
            border-radius: inherit;
            /* Giữ bo góc giống container */
        }

        /* Badge giảm giá nằm trong ảnh */
        .Sale-badge {
            position: absolute;
            top: 5px;
            left: 5px;
            background-color: red;
            color: white;
            padding: 5px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            /* Thêm bóng để rõ hơn */
        }

        /* Căn trái tên và giá */
        .product-name {
            text-align: left;
            font-size: 18px;
            margin: 10px 0;
        }

        .product-price {
            text-align: left;
            font-size: 16px;
            color: #888;
        }

        .add-to-cart-button {
            background-color: #28a745;
            /* Màu xanh lá cây */
            color: white;
            border: none;
            border-radius: 5px;
            padding: 5px 15px;
            cursor: pointer;
            font-size: 14px;
            margin-top: 10px;
            transition: background-color 0.3s;
        }

        .add-to-cart-button:hover {
            background-color: #218838;
            /* Màu xanh đậm hơn khi hover */
        }
    }

    .product-table {
        width: 100%;
        border-collapse: collapse;
    }

    .product-table th,
    .product-table td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: center;
    }

    .product-image {
        width: 50px;
        height: 50px;
        object-fit: cover;
    }

    .in-stock {
        color: green;
    }

    .low-stock {
        color: orange;
    }

    .out-of-stock {
        color: red;
    }

    /* Hiệu ứng hover cho dòng */
    .row-hover {
        background-color: #f1f1f1;
    }

    /* Định nghĩa icon cảnh báo */
    .warning-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-right: 8px;
        width: 24px;
        height: 24px;
    }

    /* SVG kế thừa màu từ trạng thái */
    .warning-icon svg {
        width: 24px;
        height: 24px;
        fill: currentColor;
    }

    .total-footer {
        margin-top: 12px;
    }
}
</style>
