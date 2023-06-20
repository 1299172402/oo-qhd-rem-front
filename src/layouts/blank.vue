<template>
  <div class="myWrapper">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<style lang="less" scoped>
.myWrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>