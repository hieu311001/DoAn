<template>
    <div class="modal-container">
        <div class="cart-container">
            <div class="cart-title flex space-between">
                <div class="title-left">
                    <h2>Giỏ hàng hiện tại</h2>
                </div>
                <div class="title-right">
                    <div class="icon-close" @click="closeCart">
                        <icon class="icon icon-exit"></icon>
                    </div>
                </div>
            </div>
            <div class="cart-content mtop-12">
                <table>
                    <thead>
                        <tr>
                            <th>Số lượng</th>
                            <th>Sản phẩm</th>
                            <th>Giá</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in localCart" :key="product.id">
                            <td>
                                <BaseCounter v-model="product.quantity" :valueInput="product.quantity"></BaseCounter>
                            </td>
                            <td>{{ product.name }}</td>
                            <td>{{ formatPrice(product.price * product.quantity) }}</td>
                            <td>
                                <button @click="removeFromCart(product.id)">Xóa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="total">
                    <strong>Tổng tiền:</strong> {{ formatPrice(total) }}
                </div>
            </div>
            <div class="cart-footer">
                <div class="filter-bot flex gap-8">
                    <div class="filter-btn__close">
                        <BaseButton class="m-button btn-white" text="Thanh toán" @click="checkout">
                        </BaseButton>
                    </div>
                    <div class="filter-btn__save">
                        <BaseButton class="m-button btn-white" text="In hóa đơn" @click="printInvoice"></BaseButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, defineEmits, defineProps, onMounted } from 'vue';

const emit = defineEmits(['update:modelValue', 'saveForm', 'updateCart', 'closeCart']);
const props = defineProps({
    cart: null, // Data mà component cha gửi xuống
})

const promoCode = ref('');
const customer = ref({
    name: '',
    phone: '',
    email: ''
});

// Tạo một biến local để lưu trữ cart
const localCart = ref([...props.cart]);

// Tính tổng tiền từ localCart
const total = computed(() => {
    return localCart.value.reduce((sum, product) => sum + (product.price * product.quantity), 0);
});

// Format giá
const formatPrice = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const updateTotal = () => {
    // Logic to update total if needed, already handled by computed property
};

const removeFromCart = (productId) => {
    const index = localCart.value.findIndex(product => product.id === productId);
    if (index !== -1) {
        localCart.value.splice(index, 1);
        emit('updateCart', localCart.value);
    }
};

const applyPromo = () => {
    // Logic để áp dụng mã khuyến mãi nếu có
    alert(`Mã khuyến mãi "${promoCode.value}" đã được áp dụng!`);
};

const checkout = () => {
    // Logic thanh toán
    alert(`Thông tin khách hàng: ${customer.value.name}, ${customer.value.phone}, ${customer.value.email}`);
};

const printInvoice = () => {
    // Logic in hóa đơn
    alert('In hóa đơn...');
};

const closeCart = () => {
    emit('closeCart');
}
</script>


<style lang="scss" scoped>
.cart-container {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 24px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 80%;
    height: auto;

    .filter-bot {
        justify-content: flex-end;
        padding-top: 12px;
    }
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
}

.total {
    font-size: 18px;
    margin-top: 10px;
}

.promo {
    margin-top: 20px;
}

.customer-info {
    margin-top: 20px;
}

.customer-info input {
    display: block;
    margin-bottom: 10px;
}

.input-cart {
    width: 50%;
    height: 32px;

    &>input {
        padding: 0 12px;
    }
}
</style>