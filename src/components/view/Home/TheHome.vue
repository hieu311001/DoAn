<template>
  <div class="container">
    <TheHeader></TheHeader>
    <div class="layout-main">
      <TheMenu></TheMenu>
      <TheContent></TheContent>
    </div>
  </div>
</template>

<script setup>
  import TheMenu from '@/components/layout/TheMenu.vue';
  import TheContent from '@/components/layout/TheContent.vue';
  import TheHeader from '@/components/layout/TheHeader.vue';
</script>

<style scoped>
  @import url(@/assets/css/main.css);

  .container {
    width: 100vw;
    height: 100vh;
  }

  .layout-main{
    display: flex;
    width: 100%;
    height: 100%;
  }
</style>