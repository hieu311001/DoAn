<template>
    <div class="modal-container">
        <div class="popup-container">
            <div class="popup-header">
                <h2>Thêm nhân viên</h2>
                <div class="icon-close" @click="closePopup">
                    <icon class="icon icon-exit"></icon>
                </div>
            </div>
            <div class="popup-body mt-3">
                <div class="input-group">
                    <label for="fullName">Họ và tên:</label>
                    <input v-model="employeeInfo.FullName" id="fullName" type="text" placeholder="Nhập họ và tên" />
                </div>
                <div class="input-group">
                    <label for="email">Email:</label>
                    <input v-model="employeeInfo.Email" id="email" type="email" placeholder="Nhập email" />
                </div>
                <div class="input-group">
                    <label for="phone">Số điện thoại:</label>
                    <input v-model="employeeInfo.PhoneNumber" id="phone" type="text" placeholder="Nhập số điện thoại" />
                </div>
                <div class="input-group">
                    <label for="store">Thuộc cửa hàng:</label>
                    <BaseCombobox cbbClass="cb-store" id="category" propValue="StoreID" propText="StoreText" placeholder="Chọn cửa hàng"
                        :data=storeInfo v-model="employeeInfo.StoreID" :valueCombobox="employeeInfo.StoreID" />
                </div>
                <div class="input-group">
                    <label for="role">Vai trò:</label>
                    <BaseCombobox cbbClass="cb-store" id="category" propValue="Role" propText="RoleName" :data=roleInfo
                        v-model="employeeInfo.Role" :valueCombobox="employeeInfo.Role" />
                </div>
            </div>
            <div class="popup-footer">
                <button @click="submitEmployee" v-if="modeAdd" class="btn-submit">Thêm</button>
                <button @click="submitEmployee" v-if="!modeAdd" class="btn-submit">Cập nhật</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref, computed, watch, defineEmits, defineProps, onMounted } from 'vue';
import { generateGUID } from '@/common/commonFn';

const emit = defineEmits(['update:modelValue', 'saveForm', 'updateCart', 'closePopup']);
const props = defineProps({
    modeAdd: {
        type: Boolean,
        default: true
    }, // Data mà component cha gửi xuống
});

const store = useStore();

const storeInfo = computed(() => store.state.stores.storeInfo);
const roleInfo = [
    {
        Role: 1,
        RoleName: "Nhân viên"
    },
    {
        Role: 2,
        RoleName: "Nhân viên kho"
    }
]

const isPopupVisible = ref(false);
const employeeInfo = ref({
    FullName: '',
    Email: '',
    Phone: '',
    Role: 1, // Default value for role
    StoreID: null
});

const stores = computed(() => store.state.stores.allStores);

// Đóng popup
const closePopup = () => {
    emit('closePopup');
};

// Xử lý thêm nhân viên
const submitEmployee = async () => {
    if (props.modeAdd) {
        await store.dispatch('addUser', {
            ...employeeInfo.value,
            UserID: generateGUID(),
            Password: "123456"
        })
    } else {
        await store.dispatch('editUser', {
            ...employeeInfo.value
        })
    }

    closePopup();
};

onMounted(() => {
    if (!props.modeAdd) {
        employeeInfo.value = store.state.user.userDetail;
    } else {
        employeeInfo.value = {
            FullName: '',
            Email: '',
            Phone: '',
            Role: 1, 
            StoreID: null
        }
    }
})
</script>

<style scoped>
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup-container {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.popup-header h2 {
    margin: 0;
}

.icon-close {
    cursor: pointer;
    font-size: 18px;
}

.input-group {
    margin-bottom: 15px;
}

.input-group label {
    display: block;
    margin-bottom: 5px;
}

.input-group input,
.input-group select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.popup-footer {
    display: flex;
    justify-content: flex-end;
}

.btn-submit {
    padding: 8px 16px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
}

.btn-submit:hover {
    background-color: #0056b3;
}
</style>