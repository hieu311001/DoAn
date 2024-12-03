<template>
    <div class="introduction-tab">
        <!-- Phần hình ảnh giới thiệu -->
        <div class="image-section">
            <img src="https://top10tphcm.com/wp-content/uploads/2023/01/cua-hang-PhuotStore.jpg" alt="Hình ảnh giới thiệu"
                class="intro-image" />
        </div>

        <!-- Phần giới thiệu chuỗi cửa hàng -->
        <div class="introduction-section">
            <h2 class="center">GIỚI THIỆU CỬA HÀNG</h2>
            <div class="content-block">
                <p>Phượt Store là shop online chuyên cung cấp các sản phẩm đi phượt cho các bạn trẻ có niềm đam mê
                    phượt. Phượt Store luôn mang đến cho các bạn những sản phẩm tốt nhất để các bạn có thể thoải mái,
                    yên tâm mà tận hưởng những chuyến phượt mà không cần phải lo nghĩ đến độ an toàn của những trang
                    phục, phụ kiện, vật dụng phượt của Phượt Store.</p>
                <p>Phượt Store luôn đảm bảo 3 tiêu chí cho những món đồ phượt của bạn TỐT – CHẤT – ĐẸP</p>
                <p>Phượt Store luôn cam kết 3 tiêu chí trên cho những phượt thủ sử dụng sản phẩm và dịch vụ tại Phượt
                    Store:
                    TỐT – Phượt Store cam kết luôn mang đến những sản phẩm chất lượng tốt, an toàn cho khách hàng.
                    CHẤT – Phượt Store luôn lựa chọn những sản phẩm ưu tú nhất, chất nhất để ngoài yếu tố an toàn sản
                    phẩm còn thể hiện được cá tính riêng cho các phượt thủ.
                    ĐẸP – Phượt Store lựa chọn những sản phẩm đẹp nhất làm thay đổi các nhìn của mọi người xung quanh
                    khi khách hàng khoác lên sản phẩm của Phượt Store vi vu trên mọi nẻo đường.</p>
                <p>Các mặt hàng sản phẩm</p>
                <div class="product-list">
                    <div class="product-item">
                        <p>1. Mũ bảo hiểm moto</p>
                    </div>
                    <div class="product-item">
                        <p>2. Ba lô túi phượt</p>
                    </div>
                    <div class="product-item">
                        <p>3. Găng tay</p>
                    </div>
                    <div class="product-item">
                        <p>4. Đồ bảo hộ moto</p>
                    </div>
                    <div class="product-item">
                        <p>5. Đồ sinh tồn</p>
                    </div>
                    <div class="product-item">
                        <p>6. Đồ chơi xe</p>
                    </div>
                </div>
                <p>Phượt Store mong muốn gắn kết những bạn trẻ đam mê phượt, thích tự do khám phá những phong cảnh, địa
                    điểm, con người của những vùng miền đẹp của đất nước Việt Nam.</p>
            </div>

            <!-- Phần địa chỉ các cửa hàng -->
            <div class="store-section">
                <div class="info flex">
                    <div class="contact">
                        <h1>Phượt store</h1>
                        <p class="mt-2">Mở cửa 8h30 – 22h tất cả các ngày</p>
                        <p>Tư vấn online - Ship các tỉnh</p>
                        <p>SĐT - Zalo tư vấn: 0363202***</p>
                    </div>
                    <div class="address">
                        <h2 class="mb-2">Danh sách cửa hàng</h2>
                        <div v-for="store in storeData" :key="store.StoreID">
                            <p>{{ store.StoreText }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUpdated, computed, watch, reactive, onBeforeMount, watchEffect } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const stores = computed(() => store.state.stores.storeInfo);
const storeData = ref(null);

onMounted(async () => {
    await store.dispatch('getStore');

    storeData.value = stores.value.filter(item => item.StoreID != '00000000-0000-0000-0000-000000000000')
})
</script>

<style lang="scss" scoped>
.introduction-tab {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
    max-height: calc(100vh - 56px);
    overflow-y: auto;
}

.product-item {
    font-size: 16px;
}

.image-section {
    text-align: center;
    margin-bottom: 30px;
}

.intro-image {
    max-width: 100%;
    height: auto;
}

.introduction-section,
.store-section {
    border-top: 2px solid #ccc;
    padding: 20px 0;

    .info {
        align-items: flex-start;
        gap: 48px;
    }
}

h2.center {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    text-transform: uppercase;
}

.content-block p {
    margin: 10px 0;
    line-height: 1.6;
}

.store-section ul {
    list-style: none;
    padding: 0;
}

.store-section li {
    margin: 8px 0;
    font-size: 16px;
}
</style>