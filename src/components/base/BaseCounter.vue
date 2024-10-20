<template>
    <div class="counter">
        <button @click="decrease">-</button>
        <input type="text" ref="input" v-model="quantity" min="0" />
        <button @click="increase">+</button>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, defineEmits, defineProps } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    valueInput: null
})

const quantity = ref(1);

const increase = () => {
    quantity.value++;
    emit("update:modelValue", quantity.value);
};

const decrease = () => {
    if (quantity.value > 0) {
        quantity.value--;
        emit("update:modelValue", quantity.value);
    }
};

onMounted(() => {
    if (props.valueInput) {
        quantity.value = props.valueInput;
    } 

    emit("update:modelValue", props.valueInput);
})

</script>

<style scoped>
.counter {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.counter button {
    width: 32px;
    height: 32px;
    font-size: 18px;
    border: none;
    background-color: #f0f0f0;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.counter button:hover {
    background-color: #ddd;
}

.counter input {
    width: 50px;
    text-align: center;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>