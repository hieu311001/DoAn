<template>
    <div class="modal-container">
        <div class="order-details">
            <div class="header flex space-between">
                <div class="title-left">
                    <h2>Thông tin chi tiết đơn hàng</h2>
                </div>
                <div class="title-right">
                    <div class="icon-close" @click="closeOrderDetail">
                        <icon class="icon icon-exit"></icon>
                    </div>
                </div>
            </div>

            <div class="customer-info">
                <h3>Khách Hàng</h3>
                <p><strong>Tên khách hàng:</strong> Nguyễn Văn A</p>
                <p><strong>Số điện thoại:</strong> 0901234567</p>
                <p><strong>Địa chỉ giao hàng:</strong> 123 Đường ABC, Phường XYZ, Quận 1, TP.HCM</p>
            </div>

            <div class="order-summary">
                <h3>Thông Tin Đơn Hàng</h3>
                <p><strong>Ngày tạo:</strong> 30/10/2024</p>
                <p><strong>Phương thức thanh toán:</strong> Tiền mặt</p>
                <p><strong>Tổng giá trị:</strong> 2.000.000 VND</p>
            </div>

            <div class="order-products">
                <h3>Sản Phẩm Trong Đơn</h3>
                <ul>
                    <li>Balo leo núi XYZ <span>x2</span> 500.000 VND</li>
                    <li>Lều cắm trại ABC <span>x1</span> 1.000.000 VND</li>
                </ul>
                <p class="total"><strong>Tổng cộng:</strong> 2.000.000 VND</p>
            </div>

            <div class="order-status flex">
                <p><strong>Trạng Thái Đơn Hàng:</strong></p>
                <BaseCombobox id="category" propValue="Value" propText="Text"
                    :data=orderStatus @getValueCombobox="getDataCombobox" :resetValue="resetValue" />
            </div>

            <div class="order-footer">
                <div class="filter-bot flex gap-8">
                    <BaseButton class="m-button btn-blue" text="Cập nhật" @click="updateOrder">
                    </BaseButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, defineEmits, defineProps, onMounted } from 'vue';

const emit = defineEmits(['update:modelValue', 'saveForm', 'updateCart', 'closeOrderDetail']);
const props = defineProps({
    cart: null, // Data mà component cha gửi xuống
})

const orderStatus = [
    {
        Text: "Đang xử lý",
        Value: 0
    },
    {
        Text: "Đang giao hàng",
        Value: 1
    },
    {
        Text: "Đã hoàn thành",
        Value: 2
    },
    {
        Text: "Đã hủy",
        Value: 3
    },
]

const status = ref('Đang xử lý');

const updateOrder = () => {
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
</style>
