<template>
  <div class="app-container">
    <div v-if="token">
      <TheHome></TheHome>
      <modal-manager></modal-manager>
    </div>
    <div v-else>
      <login-page v-if="!token"></login-page>
      <register-page v-else></register-page>
    </div>
    <ToastMessage></ToastMessage>
  </div>
</template>

<script setup>
import LoginPage from '@/components/view/Auth/LoginPage';
import RegisterPage from '@/components/view/Auth/RegisterPage';
import ForgotPasswordPage from '@/components/view/Auth/ForgotPasswordPage';
import TheHome from '@/components/view/Home/TheHome';
import ModalManager from './components/layout/ModalManager.vue';
import ToastMessage from './components/ToastMessage.vue';
import { onMounted, ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();

const user = computed(() => store.state.user.userInfo);
const token = ref(null);

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null; // Trả về null nếu không tìm thấy cookie
}

watch(token, () => {
  if (!token.value) {
    router.push({ name: 'login' });
  }
})

onMounted(() => {
  token.value = getCookie('token');
  if (!token.value) {
    router.push({ name: 'login' });
  }

  // Theo dõi cookie mỗi giây (hoặc thời gian tùy chọn)
  setInterval(() => {
    const newToken = getCookie("token");
    if (newToken !== token.value) {
      token.value = newToken;
    }
  }, 1000); // Cập nhật mỗi giây
})
</script>

<style>
@import url(@/assets/css/main.css);

.app-container {
  height: 100%;
}

.app-container>div {
  height: 100%;
}
</style>