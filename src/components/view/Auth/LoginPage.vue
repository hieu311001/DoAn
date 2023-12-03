<template>
    <div class="container">
        <div class="login-left"></div>
        <div class="login-right">
            <div class="form-title">Đăng nhập</div>
            <div class="form-label form-username">
                <label class="m-label f-16" for="">Tên đăng nhập</label>
                <BaseInput 
                    :tabindex="1" 
                    placeholder="Nhập tên tài khoản"
                    inputClass="m-input no-icon">
                </BaseInput>
            </div>
            <div class=" form-label form-password">
                <label class="m-label f-16" for="">Mật khẩu</label>
                <BaseInput 
                    :tabindex="2" 
                    type="password"
                    placeholder="Nhập mật khẩu"
                    inputClass="m-input no-icon">
                </BaseInput>
            </div>
            <div class="form-btn_login">
                <BaseButton class="ms-button btn-active btn-blue w-full" text="Đăng nhập" @click="login"></BaseButton>
            </div>
            <div class="line"></div>
            <div class="form-forgotPass">
                <router-link to="/forgot" class="link-blue">Quên mật khẩu</router-link>
            </div>
            <div class="form-register">
                <span>Bạn chưa có tài khoản?</span>
                <router-link to="/register" class="link-blue"> Đăng ký tại đây</router-link>
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
    font-size: 16   px;
}

.login-left, .login-right {
    width: 50%;
}

.login-left{
    background: url('@/assets/img/login_background.webp') no-repeat;
    background-position: center;
    background-size: cover;
    height: 100%;
}

.login-right{
    padding: 60px;
    height: auto;
    font-size: 16px;
    box-sizing: border-box;
}

.form-title{
    font-size: 32px;
    font-weight: bold;
    padding: 24px 0;
}

.form-label{
    padding: 12px 0;
}

.form-btn_login{
    padding: 24px 0;
}

.form-forgotPass{
    padding: 24px 0 12px 0;
}
</style>