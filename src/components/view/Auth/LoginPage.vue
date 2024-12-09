<template>
    <div class="container">
        <div class="login-left"></div>
        <div class="login-right">
            <div class="form-title">Đăng nhập</div>
            <div class="form-label form-username">
                <label class="m-label f-16" for="">Tên đăng nhập</label>
                <BaseInput 
                    v-model="user.UserName"
                    :tabindex="1" 
                    placeholder="Nhập tên tài khoản/email"
                    inputClass="m-input no-icon">
                </BaseInput>
            </div>
            <div class=" form-label form-password">
                <label class="m-label f-16" for="">Mật khẩu</label>
                <BaseInput 
                    :tabindex="2" 
                    v-model="user.Password"
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
import { useStore } from 'vuex';
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const store = useStore();

const userInfo = computed(() => store.state.user.userInfo);

const user = reactive({
    UserName: null,
    Password: null
})

const login = async () => {
   var loginSuccess = await store.dispatch('login', user);
   if (loginSuccess) {
        router.push({ name: 'intro' });
        setCookie('token', userInfo.value.AccessToken, 1);
        setCookie('userInfo', JSON.stringify(userInfo.value), 1);
   }
}

const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 4 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
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
    background: url('@/assets/img/background-login.jpg') no-repeat;
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