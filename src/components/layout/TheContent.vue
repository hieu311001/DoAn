<template>
    <div class="content-area">
        <router-view name="content"></router-view>
    </div>
</template>

<script setup>

</script>

<style scoped>
.content-area {
    flex: 1;
    min-height: 0;
    min-width: 0;
    height: 100%;
    width: 100%;
    background-color: #fff;
}
</style>
    