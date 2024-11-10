<template>
    <div class="modal-container">
        <div class="cart-container">
            <div class="cart-title flex space-between">
                <div class="title-left">
                    <h2>Giỏ hàng hiện tại</h2>
                </div>
                <div class="title-right">
                    <div class="icon-close" @click="closeCart(false)">
                        <icon class="icon icon-exit"></icon>
                    </div>
                </div>
            </div>
            <div class="cart-content mtop-12">
                <table>
                    <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in localCart" :key="product.ProductID">
                            <td style="text-align:center">
                                <img :src="product.Image" alt="Product Image" class="product-image" />
                            </td>
                            <td>{{ product.ProductName }}</td>
                            <td>
                                <BaseCounter v-model="product.Quantity" :valueInput="product.Quantity"></BaseCounter>
                            </td>
                            <td>{{ formatPrice(product.Price * product.Quantity * (1 - product.Sale / 100)) }}</td>
                            <td>
                                <button @click="removeFromCart(product.ProductID)">Xóa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="total">
                    <strong>Tổng tiền:</strong> {{ formatPrice(total) }}
                </div>
                <div class="mt-3 info-pay">
                    <div class="pay-info">
                        <div class="flex gap-8 mt-3" v-if="userInfo.Role == 3">
                            <p><strong>Cửa hàng:</strong></p>
                            <BaseCombobox cbbClass="cb-store" id="category" propValue="StoreID" propText="StoreText" :data=storeInfo
                                 @getValueCombobox="getDataCombobox" v-model="customer.Store"/>
                        </div>
                        <div class="flex gap-8">
                            <div class="label-item flex gap-8 mt-3">
                                <div class="label">
                                    Họ và tên:
                                </div>
                                <div class="input flex-1">
                                    <input v-model="customer.Name" type="text" class="m-input input-product" />
                                </div>
                            </div>
                            <div class="label-item flex gap-8 mt-3">
                                <div class="label">
                                    SĐT:
                                </div>
                                <div class="input flex-1">
                                    <input v-model="customer.Phone" type="text" class="m-input input-product" />
                                </div>
                            </div>
                        </div>
                        <div class="flex gap-8 mt-3">
                            <div class="label-item flex gap-8 mt-3">
                                <div class="label">
                                    Địa chỉ:
                                </div>
                                <div class="input flex-1">
                                    <input v-model="customer.Address" type="text" class="m-input input-product" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pay-option mt-3">
                        <div class="radio-group">
                            <label class="radio-container">
                                <input v-model="paymentMethod" type="radio" name="option" value="0" />
                                <span class="radio-label">Thanh toán khi nhận hàng</span>
                            </label>
                            <label class="radio-container">
                                <input v-model="paymentMethod" type="radio" name="option" value="1" />
                                <span class="radio-label">Thanh toán online</span>
                            </label>
                        </div>
                        <div class="qr-pay mt-2 flex gap-8" v-if="paymentMethod == 1">
                            <div class="text">Vui lòng quét mã để thanh toán</div>
                            <div class="qr-image">
                                <img width="160" height="160" src="" class="" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cart-footer">
                <div class="filter-bot flex gap-8">
                    <div class="filter-btn__close">
                        <BaseButton class="m-button btn-white" text="Tạo đơn hàng" @click="createOrder">
                        </BaseButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { generateGUID, showToastWarning } from '@/common/commonFn';
import { ref, computed, watch, defineEmits, defineProps, onMounted } from 'vue';

const emit = defineEmits(['update:modelValue', 'saveForm', 'updateCart', 'closeCart']);
const props = defineProps({
    cart: null, // Data mà component cha gửi xuống
})

const promoCode = ref('');
const customer = ref({
    Name: '',
    Phone: '',
    Address: '',
    Store: null
});

const store = useStore();

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; // Trả về null nếu không tìm thấy cookie
}

const userInfo = ref(JSON.parse(getCookie('userInfo')));
const storeInfo = computed(() => store.state.stores.storeInfo);

const paymentMethod = ref(0);

// Tạo một biến local để lưu trữ cart
const localCart = ref([...props.cart]);

// Tính tổng tiền từ localCart
const total = computed(() => {
    return localCart.value.reduce((sum, product) => sum + (product.Price * product.Quantity * (1 - product.Sale / 100)), 0);
});

// Format giá
const formatPrice = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const removeFromCart = (productId) => {
    const index = localCart.value.findIndex(product => product.ProductID === productId);
    if (index !== -1) {
        localCart.value.splice(index, 1);
        emit('updateCart', localCart.value);
    }
};

const createOrder = () => {
    if (localCart.value.length <= 0 && userInfo.value.Role != 3) {
        showToastWarning(store, "Không có sản phẩm nào");
        return;
    }

    let productOrderID = generateGUID();
    let paramMaster = {
        ProductOrderID: productOrderID,
        UserID: userInfo.value.UserID,
        FullName: customer.value.Name,
        PhoneNumber: customer.value.Phone,
        Address: customer.value.Address,
        TotalPrice: total.value,
        PaymentMethod: paymentMethod.value,
        StoreID: userInfo.value.Role == 3 ? customer.value.Store : userInfo.value.StoreID,
        OrderDate: new Date(),
        Status: 0
    }

    let paramDetail = [];

    localCart.value.forEach(item => {
        paramDetail.push({
            ProductOrderDetailID: generateGUID(),
            ProductOrderID: productOrderID,
            ProductID: item.ProductID,
            Amount: item.Quantity,
            Price: item.Price * item.Quantity * (1 - item.Sale / 100)
        })
    })

    store.dispatch('createOrder', {
        productOrder: paramMaster,
        productOrderDetails: paramDetail,
    });

    closeCart(true);
};

const closeCart = (resetCart) => {
    emit('closeCart', resetCart);
}

onMounted(() => {
    if (userInfo.value.Role == 3) {
        customer.value.Name = userInfo.value.FullName;
        customer.value.Phone = userInfo.value.PhoneNumber;
        customer.value.Address = userInfo.value.Address;
    }
})
</script>

<style lang="scss">
.cb-store {
    flex: 1;

    .combobox__input {
        min-height: 32px !important;
    }

    .combobox-icon {
        top: 5px !important; 
    }
}
</style>

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

    .product-image {
        width: 50px;
        height: 50px;
        object-fit: cover;
        /* Đảm bảo ảnh lấp đầy container mà không bị méo */
        border-radius: inherit;
        /* Giữ bo góc giống container */
    }

    .cart-content {
        max-height: 70vh;
        overflow: auto;
    }

    .label-item {
        flex: 1;

        .label {
            font-size: 16px;
            font-weight: 600;
        }
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

.radio-group {
    display: flex;
    gap: 20px;
    /* Khoảng cách giữa các nút radio */
}

.radio-container {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 16px;
    position: relative;
}

.radio-container input[type="radio"] {
    display: none;
    /* Ẩn radio gốc */
}

.radio-label {
    position: relative;
    padding-left: 24px;
    /* Khoảng cách cho nút radio tùy chỉnh */
    cursor: pointer;
}

.radio-label::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    border: 2px solid #007bff;
    /* Màu viền của radio */
    border-radius: 50%;
    background-color: #fff;
    /* Màu nền */
    transition: background-color 0.3s, border-color 0.3s;
}

.radio-container input[type="radio"]:checked+.radio-label::before {
    border-color: #007bff;
    /* Màu viền khi được chọn */
}

.radio-container input[type="radio"]:checked+.radio-label::after {
    content: "";
    position: absolute;
    left: 4px;
    /* Căn giữa vòng tròn nhỏ bên trong */
    top: calc(50% - 4px);
    width: 8px;
    height: 8px;
    background-color: #007bff;
    /* Màu vòng tròn nhỏ bên trong */
    border-radius: 50%;
}
</style>