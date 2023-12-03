<template>
    <div class="container">
        <div class="register-left"></div>
        <div class="register-right">
            <div class="form-title">Đăng nhập</div>
            <div class="form-label form-username">
                <label class="m-label f-16" for="">Tên đăng nhập</label>
                <BaseInput 
                    :tabindex="1" 
                    placeholder="Nhập tên tài khoản"
                    inputClass="m-input no-icon">
                </BaseInput>
            </div>
            <div class="form-label form-username">
                <label class="m-label f-16" for="">Email</label>
                <BaseInput 
                    :tabindex="2" 
                    placeholder="Nhập tên tài khoản"
                    inputClass="m-input no-icon">
                </BaseInput>
            </div>
            <div class=" form-label form-password">
                <label class="m-label f-16" for="">Mật khẩu</label>
                <BaseInput 
                    :tabindex="3" 
                    type="password"
                    placeholder="Nhập mật khẩu"
                    inputClass="m-input no-icon">
                </BaseInput>
            </div>
            <div class=" form-label form-repassword">
                <label class="m-label f-16" for="">Nhập lại mật khẩu</label>
                <BaseInput 
                    :tabindex="4" 
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    inputClass="m-input no-icon">
                </BaseInput>
            </div>
            <div class="form-btn_register">
                <BaseButton class="ms-button btn-active btn-blue w-full" text="Đăng ký" @click="register"></BaseButton>
            </div>
            <div class="line"></div>
            <div class="form-login">
                <span>Bạn đã có tài khoản?</span>
                <router-link to="/login" class="link-blue"> Đăng nhập tại đây</router-link>
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

.register-left, .register-right {
    width: 50%;
}

.register-left{
    background: url('@/assets/img/login_background.webp') no-repeat;
    background-position: center;
    background-size: cover;
    height: 100%;
}

.register-right{
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

.form-btn_register{
    padding: 24px 0;
}

.form-login{
    padding: 24px 0 12px 0;
}
</style>