<template>
    <div class="modal-container">
        <div class="popup-container">
            <div class="popup-header">
                <h2 v-if="modeAdd">Thêm cửa hàng</h2>
                <h2 v-else>Thông tin cửa hàng</h2>
                <div class="icon-close" @click="closePopup">
                    <icon class="icon icon-exit"></icon>
                </div>
            </div>
            <div class="popup-body mt-3">
                <div class="input-group">
                    <label for="storeName">Tên cửa hàng:</label>
                    <input v-model="storeInfo.StoreName" id="storeName" type="text" placeholder="Nhập tên cửa hàng" />
                </div>
                <div class="input-group">
                    <label for="storeAddress">Địa chỉ:</label>
                    <input v-model="storeInfo.Address" id="storeAddress" type="text"
                        placeholder="Nhập địa chỉ cửa hàng" />
                </div>
            </div>
            <div class="popup-footer">
                <button @click="submitStore" v-if="modeAdd" class="btn-submit">Thêm</button>
                <button @click="submitStore" v-if="!modeAdd" class="btn-submit">Cập nhật</button>
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
})

const store = useStore();

const isPopupVisible = ref(false);
const storeInfo = ref({
    StoreName: '',
    Address: ''
});

// Đóng popup
const closePopup = () => {
    emit('closePopup');
};

// Xử lý thêm cửa hàng
const submitStore = async () => {
    if (props.modeAdd) {
        await store.dispatch('addStore', {
            ...storeInfo.value,
            StoreID: generateGUID()
        })
    } else {
        await store.dispatch('editStore', {
            ...storeInfo.value
        })
    }

    closePopup();
};

onMounted(() => {
    if (!props.modeAdd) {
        storeInfo.value = store.state.stores.storeDetail;
    } else {
        storeInfo.value = {
            StoreName: '',
            Address: ''
        }; 
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

.close-btn {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
}

.input-group {
    margin-bottom: 15px;
}

.input-group label {
    display: block;
    margin-bottom: 5px;
}

.input-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.popup-footer {
    display: flex;
    justify-content: flex-end;
}

.btn-cancel,
.btn-submit {
    padding: 8px 16px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 4px;
}

.btn-cancel {
    background-color: #f0f0f0;
}

.btn-submit {
    background-color: #007bff;
    color: white;
}

.btn-submit:hover {
    background-color: #0056b3;
}
</style>