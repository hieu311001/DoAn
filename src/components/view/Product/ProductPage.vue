<template>
    <div class="container-sell">
        <div class="title h-4">
            Danh sách sản phẩm
        </div>
        <div class="content">
            <div class="content-filter flex space-between">
                <div class="filter-left flex gap-8">
                    <div class="list-search">
                        <BaseInput showIcon="true" v-model="keyword" inputClass="m-input"
                            placeholder="Tìm theo tên, mã sản phẩm" @keypress.enter="handleSearch" :clearInput="true"
                            @clearInput="handleSearch">
                        </BaseInput>
                    </div>
                    <div class="btn-filter" ref="refFilterBtn">
                        <BaseButton class="ms-button btn-white h-32 only-icon" @click="handleToggleFilter">
                            <template #icon>
                                <font-awesome-icon icon="filter" />
                            </template>
                        </BaseButton>
                    </div>
                    <div class="box-filter" ref="refFilterBox" v-show="showFilter">
                        <div class="filter-title h-3">
                            Lọc sản phẩm
                        </div>
                        <div class="filter-main">
                            <div class="filter-item">
                                <label class="m-label">Danh mục sản phẩm</label>
                                <div class="filter-object__input">
                                    <BaseCombobox id="category" placeholder="Chọn loại sản phẩm" propValue="Value"
                                        propText="Text" :data=dataCategory @getValueCombobox="getDataCombobox"
                                        :resetValue="resetValue" />
                                </div>
                            </div>
                            <div class="filter-item">
                                <label class="m-label">Thương hiệu</label>
                                <div class="filter-object__input">
                                    <BaseCombobox id="category" placeholder="Chọn thương hiệu" propValue="Value"
                                        propText="Text" :data=dataBranch @getValueCombobox="getDataCombobox"
                                        :resetValue="resetValue" />
                                </div>
                            </div>
                            <div class="filter-item">
                                <label class="m-label">Giá</label>
                                <div class="filter-object__input">
                                    <BaseCombobox id="category" placeholder="Chọn khoảng giá" propValue="Value"
                                        propText="Text" :data=dataPrice @getValueCombobox="getDataCombobox"
                                        :resetValue="resetValue" />
                                </div>
                            </div>
                        </div>
                        <div class="filter-bot flex gap-8">
                            <div class="filter-btn__close">
                                <BaseButton class="m-button btn-white" text="Hủy" @click="handleCloseFilter">
                                </BaseButton>
                            </div>
                            <div class="filter-btn__save">
                                <BaseButton class="m-button btn-blue" text="Áp dụng" @click="handleFilter"></BaseButton>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="filter-right">
                    <div class="cart-button" @click="openCart">
                        Nhập sản phẩm
                        <span v-if="cart.length > 0" class="badge">{{ cart.length }}</span>
                    </div>
                </div>
            </div>
            <div class="content-grid">
                <div class="product-grid">
                    <table class="product-table">
                        <thead>
                            <tr class="fix-row">
                                <th>Hình ảnh</th>
                                <th>Tên sản phẩm</th>
                                <th>Giá</th>
                                <th>Tồn kho</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in products" :key="product.ProductID"
                                @dblclick="viewProductDetail(product)"
                                @mouseenter="hoveredProductId = product.ProductID" @mouseleave="hoveredProductId = null"
                                :class="{ 'row-hover': hoveredProductId === product.ProductID }">
                                <td>
                                    <img :src="product.Image" alt="Product Image" class="product-image" />
                                </td>
                                <td>{{ product.ProductName }}</td>
                                <td>{{ formatNumber(product.Price) }}</td>
                                <td>{{ product.TotalAmount }}</td>
                                <td :class="getStatusClass(product.TotalAmount)">
                                    <div class="center">
                                        <span v-if="product.TotalAmount <= 15" class="warning-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path
                                                    d="M12 2L1 21h22L12 2zm0 13a1 1 0 110 2 1 1 0 010-2zm-1-8h2v6h-2V7z" />
                                            </svg>
                                        </span>
                                        <span>
                                            {{ getStatus(product.TotalAmount) }}
                                        </span>
                                    </div>

                                </td>
                                <td>
                                    <BaseButton class="m-button btn-white no-wrap" text="Nhập hàng" @click="addToCart(product)">
                                    </BaseButton>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <ProductStorage :cart="cart" v-if="showCart" @updateCart="updateCart" @closeCart="closeCart"></ProductStorage>
        <ProductStorageDetail :product="productDetail" :isImport="true" v-if="showDetail" @closeProduct="closeProduct">
        </ProductStorageDetail>
    </div>
</template>

<script setup>
import { openModal } from '@/utils/modalStore';
import { ref, onMounted, onUpdated, computed, watch, reactive, onBeforeMount, watchEffect } from 'vue';
import { useStore } from 'vuex';
import CartPage from '../Sells/CartPage.vue';
import ProductStorage from './ProductStorage.vue';
import ProductDetailPage from '../Sells/ProductDetailPage.vue';
import ProductStorageDetail from './ProductStorageDetail.vue';

const showFilter = ref(false);

const dataCategory = [
    {
        Text: "Tất cả",
        Value: ""
    },
    {
        Text: "Áo",
        Value: ""
    },
    {
        Text: "Quần",
        Value: ""
    },
    {
        Text: "Giày dép",
        Value: ""
    },
    {
        Text: "Đồ phượt",
        Value: ""
    },
]

const dataBranch = [
    {
        Text: "Gucci",
        Value: ""
    },
    {
        Text: "Balenciaga",
        Value: ""
    },
    {
        Text: "Adidas",
        Value: ""
    },
]

const dataPrice = [
    {
        Text: "< 500.000",
        Value: ""
    },
    {
        Text: "500.000 -> 1.000.000",
        Value: ""
    },
    {
        Text: "1.000.000 -> 3.000.000",
        Value: ""
    },
    {
        Text: "> 3.000.000",
        Value: ""
    },
]

const store = useStore();

const products = computed(() => store.state.product.dataProducts);

const refFilterBtn = ref("null");
const refFilterBox = ref("null");
const cart = ref([]);
const showCart = ref(false);
const showDetail = ref(false);
const productDetail = ref(null);

// Quản lý trạng thái hover và popup
const hoveredProductId = ref(null);

const openCart = () => {
    showCart.value = true;
}

const viewProductDetail = (product) => {
    store.dispatch('getProductByID', product.ProductID);
    showDetail.value = true;
};

const updateCart = (cartData) => {
    cart.value = cartData;
}

const closeCart = (resetCart) => {
    showCart.value = false;
    if (resetCart) {
        cart.value = [];
    }
}

const closeProduct = () => {
    showDetail.value = false;
}

const getStatus = (stock) => (stock === 0 ? 'Hết hàng' : stock <= 15 ? 'Sắp hết' : 'Còn hàng');

const getStatusClass = (stock) => {
    return stock === 0 ? 'out-of-stock' : stock <= 15 ? 'low-stock' : 'in-stock';
};

const handleToggleFilter = () => {
    let posBtn = refFilterBtn.value.getBoundingClientRect();
    refFilterBox.value.style.left = posBtn.left;

    showFilter.value = !showFilter.value;
}

const handleCloseFilter = () => {
    showFilter.value = false;
}

const addToCart = (product) => {
    const existingProduct = cart.value.find(item => item.ProductID === product.ProductID);
    if (!existingProduct) {
        product.Quantity = 1;
        cart.value.push({ ...product, selected: false });
    }
};

const formatNumber = (number) => {
    return new Intl.NumberFormat('vi-VN', {
        minimumFractionDigits: 0, // Số chữ số thập phân tối thiểu
        maximumFractionDigits: 2, // Số chữ số thập phân tối đa
    }).format(number);
};

onMounted(() => {
    store.dispatch('getAllProduct', '8101bb84-99e2-11ef-a88b-02508d4f66ec');
})

</script>

<style lang="scss" scoped>
.container-sell {
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

    .filter-right {
        display: flex;
        gap: 12px;
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

    .more-btn {
        position: relative;
        display: inline-block;
        cursor: pointer;
        padding: 5px 10px;
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
        height: calc(100vh - 196px);
        overflow: auto;
        margin-top: 12px;

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
            width: 50px;
            height: 50px;
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
}

@media (max-width: 768px) {

    /* Khi chiều rộng màn hình nhỏ hơn 768px */
    .product-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        /* Chuyển thành 2 sản phẩm mỗi hàng */
    }
}
</style>