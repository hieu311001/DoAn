<template>
    <div class="modal-container">
        <div class="product-detail-container">
            <div class="product-title flex space-between">
                <div class="title-left">
                    <h2>Thông tin sản phẩm</h2>
                </div>
                <div class="title-right">
                    <div class="icon-close" @click="closeProduct">
                        <icon class="icon icon-exit"></icon>
                    </div>
                </div>
            </div>
            <div class="product-main flex">
                <div class="product-image">
                    <img :src="product.image" :alt="product.name" />
                </div>
                <div class="product-info">
                    <h2>{{ product.name }}</h2>
                    <p class="price">{{ formatPrice(product.price) }}</p>
                    <p class="description" v-html="product.description"></p>
                    <div class="add-cart">
                        <BaseCounter v-model="quantity"></BaseCounter>
                        <button class="add-to-cart-button" @click="addToCart">Thêm vào giỏ</button>
                    </div>
                    <div class="product-contact">
                        <div class="store-info">
                            <ul>
                                <li>
                                    <strong>Tư vấn Online, Ship hàng: 0963069*** (Zalo / Messenger)</strong>
                                </li>
                                <li>Freeship nội thành đơn từ <strong>1 triệu</strong>.</li>
                                <li>
                                    Freeship tỉnh đơn từ <strong>1 triệu</strong> nếu chuyển khoản trước
                                    (Hỗ trợ ship tối đa <strong>70k</strong>).
                                </li>
                                <li>Mở cửa: <strong>8h30 - 22h</strong> tất cả các ngày.</li>
                                <li>
                                    <strong>Lưu ý:</strong> Giá các sản phẩm chưa bao gồm VAT.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="product-bottom">

            </div>
        </div>
    </div>
</template>

<script setup>
import BaseCounter from '@/components/base/BaseCounter.vue';
import { ref, computed, watch, defineEmits, defineProps } from 'vue';

const emit = defineEmits(['update:modelValue', 'closeProduct', 'addToCart']);
const props = defineProps({
    product: null, // Data mà component cha gửi xuống
})

const quantity = ref(1);

const formatPrice = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
};

const closeProduct = () => {
    emit('closeProduct');
}

const addToCart = () => {
    emit('addToCart', {quantity: quantity.value, product: props.product});
}

</script>

<style lang="scss" scoped>
.product-detail-container {
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 80%;
    height: auto;

    .product-main {
        gap: 24px;
        align-items: flex-start;
    }

    .add-to-cart-button {
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 6px 15px;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.3s;
        margin: 0;
    }

    .add-to-cart-button:hover {
        background-color: #218838;
    }

    .product-contact {
        margin: 12px 0 0 16px;

        strong {
            padding: 0;
        }
    }

    .add-cart {
        display: flex;
        align-items:center;
        gap: 8px;
    }
}

.product-image img {
    max-width: 400px;
    width: 100%;
    object-fit: cover;
    border-radius: 8px;
}

.product-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.price {
    font-size: 20px;
    font-weight: bold;
    color: #e53935;
}

.description {
    margin: 12px 0;
}

button {
    margin-top: 8px;
    padding: 10px;
    border: none;
    cursor: pointer;
}

.btn-add-to-cart {
    background-color: #4caf50;
    color: white;
}

.btn-back {
    background-color: #757575;
    color: white;
}
</style>