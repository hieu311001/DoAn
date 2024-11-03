<template>
    <div class="modal-container">
        <div class="order-details">
            <div class="header flex space-between">
                <div class="title-left">
                    <h2>Chi tiết yêu cầu nhập hàng</h2>
                </div>
                <div class="title-right">
                    <div class="icon-close" @click="closeOrderDetail">
                        <icon class="icon icon-exit"></icon>
                    </div>
                </div>
            </div>

            <div class="store-info">
                <p><strong>Tên cửa hàng:</strong> {{ productStoreDetail.StoreName }}</p>
                <p><strong>Ngày tạo:</strong> {{ formatDate(productStoreDetail.CreateDate) }}</p>
                <p><strong>Ghi chú:</strong> {{ productStoreDetail.Note }}</p>
            </div>

            <div class="product-list">
                <h3>Danh Sách Sản Phẩm</h3>
                <div style="height: 256px; overflow: auto">
                    <table class="product-table">
                        <thead>
                            <tr class="fix-row">
                                <th>Hình ảnh</th>
                                <th>Sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Số lượng tồn kho</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in productStoreDetail.Products" :key="product.ProductID">
                                <td style="text-align: center">
                                    <img :src="product.Image" alt="Product Image" class="product-image"/>
                                </td>
                                <td>{{ product.ProductName }}</td>
                                <td>{{ product.Amount }}</td>
                                <td>{{ product.TotalAmount }} </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="order-status flex">
                <p><strong>Trạng Thái:</strong></p>
                <BaseCombobox id="category" :disabled="!isEdit" propValue="Value" propText="Text" :data=orderStatus
                    :valueCombobox="productStoreDetail.Status" @getValueCombobox="getDataCombobox" />
            </div>

            <div class="order-footer" v-if="isEdit">
                <div class="filter-bot flex gap-8">
                    <BaseButton class="m-button btn-blue" text="Duyệt yêu cầu" @click="acceptRequest">
                    </BaseButton>
                    <BaseButton class="m-button btn-blue" text="Hủy" @click="cancelRequest">
                    </BaseButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, defineEmits, defineProps, onMounted } from 'vue';
import { useStore } from 'vuex';
import { formatDate } from '@/common/commonFn';

const emit = defineEmits(['update:modelValue', 'saveForm', 'updateCart', 'closeOrderDetail']);
const props = defineProps({
    isEdit: {
        type: Boolean,
        default: true
    }, // Data mà component cha gửi xuống
})

const store = useStore();

const productStoreDetail = computed(() => store.state.productStore.dataProductStoreDetail);

const orderStatus = [
    {
        Text: "Đang xử lý",
        Value: 0
    },
    {
        Text: "Đã hoàn thành",
        Value: 1
    },
    {
        Text: "Đã hủy",
        Value: 2
    },
]

const status = ref('Đang xử lý');

const acceptRequest = () => {
    alert(`Trạng thái đơn hàng đã được cập nhật: ${status.value}`);
};

const cancelOrder = () => {
    alert('Đơn hàng đã bị hủy.');
};

const closeOrderDetail = () => {
    emit('closeOrderDetail');
}
</script>

<style lang="scss" scoped>
.order-details {
    width: 80%;
    padding: 24px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-family: Arial, sans-serif;
    background-color: #fff;
}

.header,
.order-info,
.customer-info,
.order-summary,
.order-products,
.order-status,
.buttons {
    margin-bottom: 12px;
}

.header span {
    font-weight: bold;
    display: inline-block;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
}

.order-info,
.customer-info,
.order-summary,
.order-products,
.order-status {
    padding-top: 8px;
}

.customer-info h3,
.order-summary h3,
.order-products h3 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
    border-bottom: 1px solid #ddd;
}

.order-products ul {
    list-style-type: none;
    padding: 0;
}

.order-products li {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
}

.order-status {
    gap: 8px;
}

.buttons {
    display: flex;
    gap: 10px;
}

.total {
    margin-top: 8px;
}

.product-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    /* Đảm bảo ảnh lấp đầy container mà không bị méo */
    border-radius: inherit;
    /* Giữ bo góc giống container */
}

.buttons button {
    padding: 8px 16px;
    border: none;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
}

.buttons button:first-child {
    background-color: #28a745;
}

.buttons button:last-child {
    background-color: #dc3545;
}

.filter-bot {
    justify-content: flex-end;
    padding-top: 12px;
}

.request-details {
    border: 1px solid #000;
    padding: 10px;
    width: 400px;
    background-color: #f9f9f9;
    font-family: Arial, sans-serif;
}

.header {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    padding-bottom: 5px;
    margin-bottom: 10px;
}

.close-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
}

.store-info p,
.product-list p {
    margin: 5px 0;
}

.product-list h3 {
    margin-top: 10px;
    font-weight: bold;
}

.product-list table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
}

.product-list table,
.product-list th,
.product-list td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}
</style>
