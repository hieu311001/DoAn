<template>
    <div class="modal-container">
        <div class="cart-container">
            <div class="cart-title flex space-between">
                <div class="title-left">
                    <h2>Nhập hàng</h2>
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
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in localCart" :key="product.ProductID">
                            <td class="center">
                                <img :src="product.Image" alt="Product Image" class="product-image" />
                            </td>
                            <td>{{ product.ProductName }}</td>
                            <td>
                                <BaseCounter v-model="product.Quantity" :valueInput="product.Quantity"></BaseCounter>
                            </td>
                            <td>
                                <button @click="removeFromCart(product.ProductID)">Xóa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="note">
                    <div class="mt-3">
                        <div class="label-item">
                            <div class="label">
                                Ghi chú:
                            </div>
                            <div class="input">
                                <input v-model="note" type="text" class="m-input input-product" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cart-footer">
                <div class="filter-bot flex gap-8">
                    <div class="filter-btn__close">
                        <BaseButton class="m-button btn-white" text="Tạo yêu cầu" @click="createStoreOrder">
                        </BaseButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, defineEmits, defineProps, onMounted } from 'vue';
import { generateGUID } from '@/common/commonFn';
import { useStore } from 'vuex';

const emit = defineEmits(['update:modelValue', 'saveForm', 'updateCart', 'closeCart']);
const props = defineProps({
    cart: null, // Data mà component cha gửi xuống
});

const store = useStore();

const note = ref();

// Tạo một biến local để lưu trữ cart
const localCart = ref([...props.cart]);

const removeFromCart = (productId) => {
    const index = localCart.value.findIndex(product => product.ProductID === productId);
    if (index !== -1) {
        localCart.value.splice(index, 1);
        emit('updateCart', localCart.value);
    }
};

const createStoreOrder = () => {
    if (localCart.value.length <= 0) {
        alert('Không có sản phẩm nào');
        return;
    }

    let storageOrderID = generateGUID();
    let paramMaster = {
        StorageOrderID: storageOrderID,
        StoreID: '8101bb84-99e2-11ef-a88b-02508d4f66ec',
        CreateDate: new Date(),
        Status: 0,
        Note: note.value
    }

    let paramDetail = [];

    localCart.value.forEach(item => {
        paramDetail.push({
            StorageOrderDetailID: generateGUID(),
            StorageOrderID: storageOrderID,
            ProductID: item.ProductID,
            Amount: item.Quantity
        })
    })

    store.dispatch('createStoreOrder', {
        storeOrder: paramMaster,
        storeOrderDetails: paramDetail,
    });

    closeCart(true);
};

const closeCart = (resetCart) => {
    emit('closeCart', resetCart);
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
        width: 50px;
        height: 50px;
        object-fit: cover;
        /* Đảm bảo ảnh lấp đầy container mà không bị méo */
        border-radius: inherit;
        /* Giữ bo góc giống container */
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