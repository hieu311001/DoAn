<template>
    <div class="container">
        <div class="forgot-left"></div>
        <div class="forgot-right">
            <div class="form-title">
                <div class="form-title_left">Lấy lại mật khẩu</div>
                <div class="form-title_right">
                    <router-link to="/login">Đăng nhập</router-link>
                </div>
            </div>
            <div class="form-label form-username">
                <label class="m-label f-16" for="">Tên đăng nhập</label>
                <BaseInput 
                    :tabindex="1" 
                    placeholder="Nhập tên tài khoản"
                    inputClass="m-input no-icon">
                </BaseInput>
            </div>
            <div class=" form-label form-password">
                <label class="m-label f-16" for="">Email</label>
                <BaseInput 
                    :tabindex="2" 
                    placeholder="Nhập Email"
                    inputClass="m-input no-icon">
                </BaseInput>
            </div>
            <div class="form-btn_forgot">
                <BaseButton class="ms-button btn-active btn-blue w-full" text="Lấy lại mật khẩu" @click="forgot"></BaseButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import BaseInput from '../../base/input/BaseInput.vue'
import BaseButton from '../../base/button/BaseButton.vue'
</script>

<style scoped>
.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    height: 100vh;
    font-size: 16 px;
}

.forgot-left, .forgot-right {
    width: 50%;
}

.forgot-left{
    background: url('@/assets/img/login_background.webp') no-repeat;
    background-position: center;
    background-size: cover;
    height: 100%;
}

.forgot-right{
    padding: 60px;
    height: auto;
    font-size: 16px;
    box-sizing: border-box;
}

.form-title{
    font-size: 24px;
    font-weight: bold;
    padding: 24px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.form-title_right{
    font-size: 16px;
    color: red;
}

.form-label{
    padding: 12px 0;
}

.form-btn_forgot{
    padding: 24px 0;
}

.form-login{
    padding: 24px 0 12px 0;
}
</style>