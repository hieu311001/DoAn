<template>
    <div class="modal">
        <h3>Example Modal</h3>
        <p>Message: {{ message }}</p>
        <button @click="$emit('close')">Close</button>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    message: {
        type: String,
        default: 'Hello!',
    },
});
</script>

<style scoped>
.modal {
    background: white;
    padding: 20px;
    border-radius: 8px;
}
</style>