<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

</script>

<style>
@import url(@/assets/css/main.css);

.layout-main {
  height: calc(100% - 64px);
  position: relative;
  background: #fff;
}

.app-container {
  height: 100%;
}

.app-container>div{
  height: 100%;
}
</style>