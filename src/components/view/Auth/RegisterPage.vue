<template>
    <div class="container">
        <div class="register-left"></div>
        <div class="register-right">
            <div class="form-title">Đăng ký</div>

            <div class="form-label form-username">
                <label class="m-label f-16">Email</label>
                <BaseInput :tabindex="1" placeholder="Nhập email" v-model="register.Email" inputClass="m-input no-icon">
                </BaseInput>
            </div>

            <div class="form-label form-password">
                <label class="m-label f-16">Mật khẩu</label>
                <BaseInput :tabindex="3" type="password" v-model="register.Password" placeholder="Nhập mật khẩu"
                    inputClass="m-input no-icon">
                </BaseInput>
            </div>

            <div class="form-label form-repassword">
                <label class="m-label f-16">Nhập lại mật khẩu</label>
                <BaseInput :tabindex="4" type="password" v-model="register.CheckPassword"
                    placeholder="Nhập lại mật khẩu" inputClass="m-input no-icon">
                </BaseInput>
                <!-- Warning message if passwords do not match -->
                <p v-if="!passwordsMatch" class="warning-text">Mật khẩu không khớp</p>
            </div>

            <div class="form-btn_register">
                <BaseButton class="ms-button btn-active btn-blue w-full" text="Đăng ký" @click="handleRegister">
                </BaseButton>
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
import { ref, onMounted, onUpdated, computed, watch, reactive, onBeforeMount, watchEffect } from 'vue';
import { useStore } from 'vuex';
import BaseInput from '../../base/input/BaseInput.vue'
import BaseButton from '../../base/button/BaseButton.vue'
import { generateGUID } from '@/common/commonFn';
import { useRouter } from 'vue-router';

const router = useRouter();

const store = useStore();

const register = ref({
    Email: null,
    Password: null,
    CheckPassword: null
})

const passwordsMatch = computed(() => {
    return register.value.Password === register.value.CheckPassword;
});

const handleRegister = async () => {
    if (!passwordsMatch.value) {
        return;
    }

    var res = await store.dispatch('register', {
        UserID: generateGUID(),
        Email: register.value.Email,
        Role: 3,
        Password: register.value.Password
    })

    if (res) {
        router.push({ name: 'login' });
    }
}
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

.register-left,
.register-right {
    width: 50%;
}

.warning-text {
    color: red;
    font-size: 14px;
    margin-top: 4px;
}

.register-left {
    background: url('@/assets/img/background-login.jpg') no-repeat;
    background-position: center;
    background-size: cover;
    height: 100%;
}

.register-right {
    padding: 60px;
    height: auto;
    font-size: 16px;
    box-sizing: border-box;
}

.form-title {
    font-size: 32px;
    font-weight: bold;
    padding: 24px 0;
}

.form-label {
    padding: 12px 0;
}

.form-btn_register {
    padding: 24px 0;
}

.form-login {
    padding: 24px 0 12px 0;
}
</style>