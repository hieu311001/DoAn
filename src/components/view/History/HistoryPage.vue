<template>
    <div class="container-sell">
        <div class="title h-4">
            Lịch sử hoạt động
        </div>
        <div class="content">
            <div class="tabs flex gap-8">
                <BaseButton @click="showContent('orders')" class="m-button btn-white"
                    :class="{ active: activeTab === 'orders' }" text="Đơn hàng đã tạo"></BaseButton>
                <BaseButton @click="showContent('requests')" class="m-button btn-white"
                    :class="{ active: activeTab === 'requests' }" text="Yêu Cầu Nhập Hàng
                    Đã Tạo"></BaseButton>
            </div>
            <div class="content-grid">
                <div v-if="activeTab === 'orders'">
                    <div class="product-grid">
                        <table class="product-table">
                            <thead>
                                <tr class="fix-row">
                                    <th>Khách hàng</th>
                                    <th>Ngày tạo</th>
                                    <th>Tổng tiền</th>
                                    <th>Thanh toán</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="product in productOrders" :key="product.ProductOrderID"
                                    @dblclick="viewOrderDetail(product)"
                                    @mouseenter="hoveredProductId = product.ProductOrderID"
                                    @mouseleave="hoveredProductId = null"
                                    :class="{ 'row-hover': hoveredProductId === product.ProductOrderID }">
                                    <td>{{ product.FullName }}</td>
                                    <td>{{ formatDate(product.OrderDate) }}</td>
                                    <td>{{ formatNumber(product.TotalAmount) }} đ</td>
                                    <td>{{ getValueEnum(product.PaymentMethod, "PaymentMethod") }}</td>
                                    <td>{{ getValueEnum(product.Status, "ProductOrderStatus") }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div v-if="activeTab === 'requests'">
                    <div class="product-grid">
                        <table class="product-table">
                            <thead>
                                <tr class="fix-row">
                                    <th>Tên cửa hàng</th>
                                    <th>Ngày tạo</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="product in productStorages" :key="product.ProductID"
                                    @dblclick="viewProductStorageDetail(product)"
                                    @mouseenter="hoveredProductId = product.ProductID"
                                    @mouseleave="hoveredProductId = null"
                                    :class="{ 'row-hover': hoveredProductId === product.ProductID }">
                                    <td>{{ product.StoreName }}</td>
                                    <td>{{ formatDate(product.CreateDate) }}</td>
                                    <td>{{ getValueEnum(product.Status, "StorageOrderStatus") }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <ProductStorageDetail :product="productDetail" :isEdit="false" v-if="showStorageDetail" @closeProductStorageDetail="closeProductStorageDetail">
        </ProductStorageDetail>
        <ProductOrderDetail v-if="showOrder" :isEdit="false" @closeOrderDetail="closeOrderDetail">
        </ProductOrderDetail>
    </div>
</template>

<script setup>
import BaseButton from '@/components/base/button/BaseButton.vue';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { formatDate, getValueEnum } from '@/common/commonFn';
import ProductStorageDetail from '../ProductStore/StorageOrderDetail.vue';
import ProductOrderDetail from '../ProductOrder/ProductOrderDetail.vue';

const activeTab = ref('orders');
const showStorageDetail = ref(false);
const showOrder = ref(false);

// Quản lý trạng thái hover và popup
const hoveredProductId = ref(null);

const store = useStore();
const productOrders = computed(() => store.state.productOrder.dataProductOrders);
const productStorages = computed(() => store.state.storageOrder.dataStorageOrders);

const showContent = (tab) => {
    activeTab.value = tab;
};

const closeProductStorageDetail = () => {
    showStorageDetail.value = false;
}

const viewProductStorageDetail = (tab) => {
    showStorageDetail.value = true;
}

const closeOrderDetail = () => {
    showOrder.value = false;
}

const viewOrderDetail = (tab) => {
    showOrder.value = true;
}

const formatNumber = (number) => {
    return new Intl.NumberFormat('vi-VN', {
        minimumFractionDigits: 0, // Số chữ số thập phân tối thiểu
        maximumFractionDigits: 2, // Số chữ số thập phân tối đa
    }).format(number);
};
</script>

<style lang="scss" scoped>
.container-sell {
    .active{
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
