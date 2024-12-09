<template>
    <div class="nav">
        <div class="nav-layout">
            <div class="nav-left">
                <div class="nav-left__icon">
                    <icon class="icon icon-option"></icon>
                </div>
                <div class="nav-left__logo">
                    <div class="nav-logo">
                        <icon class="icon icon-logo logo-cegov"></icon>
                    </div>
                    <div class="nav-content">Phượt Store</div>
                </div>
            </div>
            <div class="nav-right" v-tooltip="{ theme: { placement: 'bottom' } }">
                <div class="nav-right__icon" v-tooltip="'Thông báo'" @click="toggleNotifyBox">
                    <icon class="icon icon-notify">
                        <div v-if="notify.length > 0" class="notify-badge"></div>
                    </icon>
                </div>
                <div class="nav-right__icon" v-tooltip="'Trợ giúp'">
                    <icon class="icon icon-help"></icon>
                </div>
                <div class="nav-right__icon" v-tooltip="'Tài liệu'">
                    <icon class="icon icon-document"></icon>
                </div>
                <div class="nav-right__icon">
                    <icon class="icon icon-settings" v-tooltip="'Cài đặt'"></icon>
                </div>
                <div class="nav-right__avatar" @click="toggleBox">
                    <div class="nav-right__image">
                        <img src="@/assets/img/getavatar.png" alt="" class="avatar">
                    </div>
                    <div v-if="showBox" class="nav-right__box">
                        <div @click="openInfo" class="nav-right__box-item">Thông tin tài khoản</div>
                        <div @click="logout" class="nav-right__box-item">Đăng xuất</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showInfo" class="popup-overlay" @click="togglePopup">
            <div class="popup" @click.stop>
                <div class="popup-header">
                    <h3>Thông tin tài khoản</h3>
                    <button @click="togglePopup" class="popup-close-btn">X</button>
                </div>
                <div class="popup-content">
                    <div class="popup-item">
                        <img src="@/assets/img/getavatar.png" alt="Avatar" class="popup-avatar" />
                    </div>
                    <div class="popup-item">
                        <label for="name"><strong>Tên:</strong></label>
                        <input v-model="userInfo.FullName" id="name" type="text" class="popup-input" />
                    </div>
                    <div class="popup-item">
                        <label for="phone"><strong>SĐT:</strong></label>
                        <input v-model="userInfo.PhoneNumber" id="phone" type="text" class="popup-input" />
                    </div>
                    <div class="popup-item">
                        <label for="address"><strong>Địa chỉ:</strong></label>
                        <input v-model="userInfo.Address" id="address" type="text" class="popup-input" />
                    </div>
                </div>
                <div class="popup-footer">
                    <button @click="updateInfo" class="popup-update-btn">Cập nhật</button>
                </div>
            </div>
        </div>
        <div v-if="showNotifyBox" class="notify-box">
            <div class="notify-box-header">
                <strong>Thông báo</strong>
            </div>
            <div class="notify-box-content">
                <div v-for="(item, index) in notify" :key="index" class="notify-item"  @click="navigateTo(item)">
                    <p>{{ item.Message }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed, watch, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { handleShowToast } from '@/common/commonFn';

const router = useRouter();
const store = useStore();

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; // Trả về null nếu không tìm thấy cookie
}

const userInfo = ref(JSON.parse(getCookie('userInfo')));
const notify = ref([]);

// Định nghĩa biến showBox sử dụng ref()
const showBox = ref(false);
const showInfo = ref(false);

// Phương thức toggleBox để thay đổi trạng thái hiển thị của box
const toggleBox = () => {
    showBox.value = !showBox.value;
};

const showNotifyBox = ref(false);

// Toggle hiển thị hộp thông báo khi người dùng nhấn vào biểu tượng
const toggleNotifyBox = () => {
    showNotifyBox.value = !showNotifyBox.value;
};

// Đóng thông báo nếu click ngoài
const closeNotifyBox = (event) => {
    const notifyBox = document.querySelector('.notify-box');
    const notifyIcon = document.querySelector('.icon-notify');
    
    // Kiểm tra nếu click không phải vào thông báo hoặc icon thông báo
    if (notifyBox && !notifyBox.contains(event.target) && notifyIcon && !notifyIcon.contains(event.target)) {
        showNotifyBox.value = false;
    }
};

// Điều hướng đến màn hình tương ứng khi nhấp vào thông báo
const navigateTo = (item) => {
  // Điều hướng đến route đã chỉ định trong thông báo
  router.push(item.Route);
  showNotifyBox.value = false; // Đóng hộp thông báo sau khi điều hướng
};

const logout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

const openInfo = () => {
    showInfo.value = true;
}

const updateInfo = () => {
    store.dispatch('updateUser', {
        ...userInfo.value
    }).then(result => {
        if (result) {
            setCookie('userInfo', JSON.stringify(userInfo.value), 1);
        }
    })

    showInfo.value = false;
}

const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Toggle trạng thái của popup
const togglePopup = () => {
    showInfo.value = !showInfo.value;
};

// Loại bỏ sự kiện khi component bị unmount
onUnmounted(() => {
    document.removeEventListener('click', closeNotifyBox);
});

onMounted(async () => {
    document.addEventListener('click', closeNotifyBox);
    if (userInfo.value.Role == 1) {
        await store.dispatch('getAllProduct', userInfo.value.StoreID);
        let product = store.state.product.dataProducts;
        if (product) {
            let productLost = product.find(f => f.TotalAmount <= 15);
            if (productLost) {
                notify.value.push({
                    Message: "🔔 Thông báo: Có sản phẩm trong cửa hàng sắp hết! Vui lòng bổ sung thêm hàng để đảm bảo hoạt động kinh doanh không bị gián đoạn.",
                    Route: "/product"
                })
            }
        }

        await store.dispatch('getOrder', userInfo.value.StoreID);
        let productOrder = store.state.productOrder.dataProductOrders;
        if (productOrder) {
            let productOrderLost = productOrder.find(f => f.Status == 0);
            if (productOrderLost) {
                notify.value.push({
                    Message: "⚠️ Thông báo: Có đơn hàng đang cần xử lý! Vui lòng kiểm tra và xử lý đơn hàng càng sớm càng tốt.",
                    Router: "/product-order"
                })
            }
        }
    } else if (userInfo.value.Role == 2) {
        await store.dispatch('getAllProduct', '00000000-0000-0000-0000-000000000000');
        let product = store.state.product.dataProducts;
        if (product) {
            let productLost = product.find(f => f.TotalAmount <= 15);
            if (productLost) {
                notify.value.push({
                    Message: "🔔 Thông báo: Có sản phẩm trong kho sắp hết! Vui lòng bổ sung thêm hàng để đảm bảo hoạt động kinh doanh không bị gián đoạn.",
                    Router: "/product"
                })
            }
        }

        await store.dispatch('getAllStorageOrder', '00000000-0000-0000-0000-000000000000');
        let storageOrder = store.state.storageOrder.dataStorageOrders?.filter(f => f.StoreID != '00000000-0000-0000-0000-000000000000');
        if (storageOrder) {
            let storageLost = storageOrder.find(f => f.Status == 0);
            if (storageLost) {
                notify.value.push({
                    Message: "⚠️ Thông báo: Có yêu cầu nhập hàng đang cần xử lý! Vui lòng kiểm tra và xử lý yêu cầu càng sớm càng tốt.",
                    Route: "/store-order"
                })
            }
        }
    }
})
</script>

<style scoped>
.nav {
    position: relative;
    height: 56px;
    background: #fff;
    min-width: 1036px;
}

.nav-layout {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    position: relative;
    display: flex;
    z-index: 999;
    justify-content: space-between;
}

.nav-left,
.nav-right,
.nav-left__logo {
    display: flex;
    align-items: center;
    justify-content: center;
}

.nav-content {
    font-size: 20px;
    font-weight: 700;
}

.nav-left__icon {
    height: 100%;
    padding: 0 16px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.nav-right__icon {
    position: relative;
    width: 32px;
    height: 28px;
    margin: 14px 5px;
}

.nav-right__icon:hover {
    cursor: pointer;
    background-color: #f5f5f5;
    border-radius: 50%;
}

.nav-right__icon icon {
    position: absolute;
    top: 3px;
    left: 4px;
}

.nav-right__avatar {
    margin-right: 12px;
    text-align: center;
    align-items: center;
    display: flex;
    height: 100%;
    width: 48px;
    position: relative;
}

.nav-right__avatar:hover {
    cursor: pointer;
    background-color: #f5f5f5;
}

.nav-right__image {
    margin: auto;
    position: relative;
}

.nav-right__image img {
    border: none;
    border-radius: 50%;
    height: 32px;
    width: 32px;
}

.logo-cegov {
    display: block;
    width: 32px;
    height: 32px;
    background-size: 32px;
    margin-right: 12px;
    background-image: url('https://phuotbuistore.com/wp-content/uploads/2018/11/Untitled-1.png');
}

/* Styles for the box under avatar */
.nav-right__box {
    position: absolute;
    top: 40px;
    /* Khoảng cách từ avatar đến box */
    right: 0;
    background: #fff;
    border: 1px solid #ddd;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    width: 180px;
    padding: 10px 0;
    z-index: 10;
}

.nav-right__box-item {
    padding: 8px 16px;
    cursor: pointer;
}

.nav-right__box-item:hover {
    background-color: #f5f5f5;
}

/* Styles for the popup */
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.popup {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    width: 400px;
}

.popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.popup-close-btn {
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
}

.popup-content {
    margin-top: 10px;
}

.popup-item {
    margin: 10px 0;
}

.popup-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-bottom: 10px;
}

.popup-input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.popup-footer {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}

.popup-update-btn {
    padding: 8px 16px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.popup-update-btn:hover {
    background-color: #0056b3;
}

/* Danh sách thông báo */
.notify-box {
    position: absolute;
    top: 50px;  /* Vị trí cách từ dưới icon */
    right: 10px;
    width: 400px;  /* Chiều rộng của hộp thông báo */
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #ddd;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 999;
    padding: 10px;
    display: flex;
    flex-direction: column;
}

/* Tiêu đề của danh sách thông báo */
.notify-box-header {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;  /* Khoảng cách giữa tiêu đề và các thông báo */
    color: #333;
}

/* Nội dung của thông báo */
.notify-box-content {
    max-height: 300px;  /* Giới hạn chiều cao cho danh sách thông báo */
    overflow-y: auto;   /* Cuộn dọc nếu danh sách quá dài */
}

/* Mỗi thông báo */
.notify-item {
    padding: 8px 10px;
    margin-bottom: 8px;
    background-color: #f9f9f9;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    color: #555;
    font-size: 14px;
    transition: background-color 0.3s;
}

/* Hiệu ứng khi hover vào mỗi thông báo */
.notify-item:hover {
    background-color: #e9ecef;
    cursor: pointer;
}

/* Dấu đỏ */
.notify-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
    border: 2px solid white;
}
</style>
