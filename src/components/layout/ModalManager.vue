<template>
    <div v-if="modal.modalName" class="modal-container">
        <component :is="modal.modalName" v-bind="modal.modalParams" @close="closeModal" />
    </div>
</template>

<script setup>
import { modal, closeModal } from '@/utils/modalStore'

</script>

<style scoped>
.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    /* Đảm bảo modal nằm trên cùng */
}
</style>