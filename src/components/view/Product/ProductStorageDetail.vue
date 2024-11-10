<template>
    <div class="modal-container">
        <div class="product-detail-container">
            <div class="product-title flex space-between">
                <div class="title-left">
                    <h2 v-if="isAdd && !isUpdate">Thêm sản phẩm</h2>
                    <h2 v-else>Thông tin sản phẩm</h2>
                </div>
                <div class="title-right">
                    <div class="icon-close" @click="closeProduct">
                        <icon class="icon icon-exit"></icon>
                    </div>
                </div>
            </div>
            <div class="product-detail">
                <div class="product-image" @click="selectImage">
                    <div :class="['image-preview-box', product.Image ? 'no-border' : '']">
                        <img v-if="product.Image" :src="product.Image" alt="Product Image" class="image-preview" />
                        <div v-else class="image-placeholder">Chọn ảnh</div>
                    </div>
                    <input type="file" ref="refFile" @change="onImageChange" style="display: none;" :disabled="!isAdd">
                </div>
                <div class="product-info">
                    <div class="item">
                        <h3>Tên sản phẩm:</h3>
                        <input v-model="product.ProductName" type="text" class="m-input input-product"
                            :disabled="!isAdd">
                    </div>
                    <div class="item">
                        <h3>Giá:</h3>
                        <input v-model.number="product.Price" type="number" class="m-input input-product"
                            :disabled="!isAdd" />
                    </div>
                    <div class="item">
                        <h3>Khuyến mãi (%):</h3>
                        <input v-model.number="product.Sale" type="number" class="m-input input-product"
                            :disabled="!isAdd" />
                    </div>
                    <div class="item" v-if="!isAdd">
                        <h3>Số lượng tồn kho:</h3>
                        <input v-model.number="product.TotalAmount" type="number" class="m-input input-product"
                            :disabled="!isAdd" />
                    </div>
                </div>
            </div>
            <div class="product-description">
                <h3>Diễn giải:</h3>
                <div v-html="product.Description" ref="refDes" :contenteditable="isAdd == 1 ? true : false"
                    class="description-preview"></div>
            </div>
            <div class="product-bottom">
                <button v-if="isAdd && !isUpdate" @click="addProduct" class="btn-add">Thêm sản phẩm</button>
                <button v-if="isAdd && isUpdate" @click="updateProduct" class="btn-update">Cập nhật</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { generateGUID } from '@/common/commonFn';
import BaseCounter from '@/components/base/BaseCounter.vue';
import { ref, computed, watch, defineEmits, defineProps, onMounted, nextTick, reactive } from 'vue';
import { useStore } from 'vuex';

const emit = defineEmits(['update:modelValue', 'closeProduct', 'addToCart']);
const props = defineProps({
    isAdd: {
        default: false,
        type: Boolean,
    },
    isUpdate: {
        default: false,
        type: Boolean,
    },
})

const store = useStore();

const refDes = ref(null);

const product = ref({
    Image: null,
    ProductName: null,
    Price: 0,
    Sale: 0,
    TotalAmount: 0,
    Description: null
})

const quantity = ref(1);
const refFile = ref(null);

const formatNumber = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
};

// Hàm chọn hình ảnh
const selectImage = () => {
    if (refFile.value) {
        refFile.value.click();
    }
};

// Hàm xử lý thay đổi hình ảnh
const onImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            product.value.Image = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const addProduct = async () => {
    delete product.value.TotalAmount;
    await store.dispatch('addProduct', {
        ...product.value,
        ProductID: generateGUID(),
        Description: refDes.value.innerHTML,
        ProductCategory: 0,
        Brand: null
    });
    closeProduct();
};

const updateProduct = async () => {
    await store.dispatch('updateProduct', product.value);
    closeProduct();
};

const closeProduct = () => {
    emit('closeProduct');
}

const addToCart = () => {
    if (!quantity.value) {
        quantity.value = 1;
    }
    emit('addToCart', { quantity: quantity.value, product: props.product });
}

onMounted(() => {
    if (props.isAdd && props.isUpdate) {
        product.value = store.state.product.dataProductDetail;
    }
})
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

    input:disabled {
        opacity: 0.8;
    }

    .input-product {
        max-height: 32px;
        margin-top: 8px;
    }

    .product-main {
        gap: 24px;
        align-items: flex-start;
    }

    .product-detail {
        display: flex;
        gap: 40px;
        margin: 20px 0;
    }

    .description-preview {
        margin-top: 10px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #f9f9f9;
    }

    .product-image {
        height: 200px;
        width: 300px;
        flex: 1;
        cursor: pointer;
        position: relative;

        .image-preview-box {
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 2px dashed #ccc;
            border-radius: 5px;
            background-color: #f9f9f9;

            &.no-border {
                border: none;
                /* Loại bỏ viền khi có ảnh */
            }
        }

        .image-preview {
            max-width: 100%;
            max-height: 100%;
            object-fit: cover;
            border-radius: 5px;
        }

        .image-placeholder {
            color: #aaa;
            font-size: 16px;
            text-align: center;
        }
    }

    .product-info {
        flex: 2;

        .item {
            margin-top: 12px;
        }
    }

    .input-field {
        width: 100%;
        padding: 8px;
        margin: 8px 0;
        border-radius: 4px;
        border: 1px solid #ccc;
    }

    .product-description {
        margin-top: 20px;
    }

    .description-area {
        width: 100%;
        height: 100px;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #ccc;
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
        align-items: center;
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

.product-price {
    font-size: 20px;
    font-weight: bold;
    color: #e53935;

    .sale {
        text-decoration: line-through;
        margin-right: 12px;
    }
}

.Description {
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

.product-bottom {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}

.btn-add,
.btn-update {
    padding: 8px 16px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
}

.btn-add {
    background-color: #007bff;
    color: white;
}

.btn-add:hover {
    background-color: #0056b3;
}

.btn-update {
    background-color: #007bff;
    color: white;
}

.btn-update:hover {
    background-color: #0056b3;
}
</style>