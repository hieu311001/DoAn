<template>
    <div class="modal-container">
        <div class="order-details">
            <div class="header flex space-between">
                <div class="title-left">
                    <h2>Thông tin khách hàng</h2>
                </div>
                <div class="title-right">
                    <div class="icon-close" @click="closeDetail">
                        <icon class="icon icon-exit"></icon>
                    </div>
                </div>
            </div>

            <div class="customer-info">
                <h3>Khách Hàng</h3>
                <p><strong>Tên khách hàng:</strong> {{ userDetailInfo?.FullName }}</p>
                <p><strong>Số điện thoại:</strong> {{ userDetailInfo?.PhoneNumber }}</p>
                <p><strong>Địa chỉ giao hàng:</strong> {{ userDetailInfo?.Address }}</p>
            </div>

            <div class="order-products">
                <h3>Sản phẩm đã mua</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Tên Sản Phẩm</th>
                            <th>Số Lượng</th>
                            <th>Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in userDetail" :key="user?.ProductOrderID">
                            <td style="text-align:center">
                                <img :src="user.Image" alt="Product Image" class="product-image" />
                            </td>
                            <td>{{ user?.ProductName }}</td>
                            <td>{{ user?.ProductAmount }}</td>
                            <td>{{ formatNumber(user?.Price * user?.ProductAmount * (100 - user?.Sale)/100) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { formatDate, getValueEnum } from '@/common/commonFn';
import { ref, computed, watch, defineEmits, defineProps, onMounted, nextTick } from 'vue';
import { useStore } from 'vuex';

const emit = defineEmits(['update:modelValue', 'saveForm', 'updateCart', 'closeDetail']);
const props = defineProps({
    isEdit: {
        type: Boolean,
        default: true
    }, // Data mà component cha gửi xuống
    userDetailInfo: {
        type: Object,
        default: null
    }
})

const store = useStore();

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; // Trả về null nếu không tìm thấy cookie
}

const userInfo = ref(JSON.parse(getCookie('userInfo')));

const userDetail = computed(() => store.state.user.userDetail);

// Tạo một biến local để lưu trữ cart
const productOrder = ref(props.productOrder);

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

const closeDetail = () => {
    emit('closeDetail');
}

const formatNumber = (number) => {
    return new Intl.NumberFormat('vi-VN', {
        minimumFractionDigits: 0, // Số chữ số thập phân tối thiểu
        maximumFractionDigits: 2, // Số chữ số thập phân tối đa
    }).format(number);
};

onMounted(() => {

})

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
.order-status {
    padding-top: 8px;
}

.customer-info h3,
.order-summary h3 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
    border-bottom: 1px solid #ddd;
}

.order-products {
    margin-top: 16px;

    h3 {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 8px;
        border-bottom: 1px solid #ddd;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 8px;
    }

    th,
    td {
        padding: 8px;
        text-align: left;
        border: 1px solid #ddd;
    }

    th {
        background-color: #f8f8f8;
        font-weight: bold;
    }

    tbody tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    tbody tr:hover {
        background-color: #f1f1f1;
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
</style>
