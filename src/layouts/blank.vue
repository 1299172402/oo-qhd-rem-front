<template>
  <div class="myWrapper">
      <router-view/>
  </div>
</template>
<script>
    export default{
        name:'blank',
    }
</script>
<style lang="less" scoped>
.myWrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>