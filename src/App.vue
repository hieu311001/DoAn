<template>
  <div v-if="true">
    <TheHome></TheHome>
    <modal-manager></modal-manager>
  </div>
  <div v-else>
    <login-page v-if="false"></login-page>
    <register-page v-else></register-page>
  </div>
</template>

<script setup>
import LoginPage from '@/components/view/Auth/LoginPage';
import RegisterPage from '@/components/view/Auth/RegisterPage';
import ForgotPasswordPage from '@/components/view/Auth/ForgotPasswordPage';
import TheHome from '@/components/view/Home/TheHome';
import ModalManager from './components/layout/ModalManager.vue';
</script>

<style>
@import url(@/assets/css/main.css);

.app-container {
  height: 100%;
}

.app-container>div{
  height: 100%;
}
</style>