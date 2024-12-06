<template>
    <div class="container-sell">
        <div class="title h-4">
            Danh sách khách hàng
        </div>
        <div class="content">
            <div class="content-filter flex space-between">
                <div class="filter-left flex gap-8">
                    <div class="list-search">
                        <BaseInput showIcon="true" v-model="keyword" inputClass="m-input"
                            placeholder="Tìm theo tên nhân viên" @keypress.enter="handleSearch"
                            :clearInput="true" @clearInput="handleSearch">
                        </BaseInput>
                    </div>
                </div>
            </div>
            <div class="content-grid">
                <div class="product-grid">
                    <table class="product-table">
                        <thead>
                            <tr class="fix-row">
                                <th>Tên khách hàng</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
                                <th>Địa chỉ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users" :key="user.UserID" @dblclick="viewProductDetail(user)"
                                @mouseenter="hoveredProductId = user.UserID" @mouseleave="hoveredProductId = null"
                                :class="{ 'row-hover': hoveredProductId === user.UserID }">
                                <td>{{ user.FullName }}</td>
                                <td>{{ user.Email }}</td>
                                <td>{{ user.PhoneNumber }}</td>
                                <td>{{ user.Address }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <CustomerDetailPage v-if="showDetail" @closeDetail=closeDetail :userDetailInfo="userDetailInfo"></CustomerDetailPage>
        </div>
    </div>
</template>

<script setup>
import { openModal } from '@/utils/modalStore';
import { ref, onMounted, onUpdated, computed, watch, reactive, onBeforeMount, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { getValueEnum } from '@/common/commonFn';
import CustomerDetailPage from './CustomerDetailPage.vue';

const store = useStore();

// Quản lý trạng thái hover và popup
const hoveredProductId = ref(null);

const userDetailInfo = ref(null);

const showDetail = ref(false);

const closeDetail = () => {
    showDetail.value = false;
}

const users = computed(() => store.state.user.users);

const viewProductDetail = async (userEdit) => {
    userDetailInfo.value = userEdit;
    await store.dispatch('getUserCustomerByID', userEdit.UserID);
    showDetail.value = true;
};

onMounted(() => {
    store.dispatch('getUserCustomer');
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
        height: calc(100vh - 196px);
        overflow: auto;
        margin-top: 12px;

        .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            /* Đảm bảo có tối đa 4 cột */
            /* 4 sản phẩm mỗi hàng */
            gap: 20px;
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

            .out-of-stock {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: rgba(0, 0, 0, 0.7);
                /* Semi-transparent background */
                color: white;
                padding: 8px 16px;
                border-radius: 4px;
                font-size: 16px;
                font-weight: bold;
                text-align: center;
            }
        }

        .product-image {
            width: 100%;
            height: 100%;
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
            overflow: hidden;
            white-space: nowrap;
            /* Đảm bảo không xuống dòng */
            text-overflow: ellipsis;
            /* Thêm dấu ... khi văn bản bị cắt */
            max-height: 24px;
            /* Giới hạn chiều cao (điều chỉnh tùy thuộc vào font-size) */
        }

        .product-price {
            text-align: left;
            font-size: 16px;
            color: #888;

            .sale {
                text-decoration: line-through;
                margin-right: 12px;
            }
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

    /* Hiệu ứng hover cho dòng */
    .row-hover {
        background-color: #f1f1f1;
    }

    .delete-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .delete-modal {
        background: white;
        border-radius: 8px;
        padding: 24px;
        width: 400px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }

    .modal-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 16px;
    }

    .modal-content {
        font-size: 16px;
        margin-bottom: 24px;
    }

    .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
    }

    .btn-red {
        background-color: red;
        color: white;
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