<!-- 渐变色带切角背景card -->
<template>
  <div>
    <div class="qiejiao" />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
.qiejiao {
  /* background: red; */
  background-image: linear-gradient(-45deg,transparent 10px,lightskyblue 0);
  background-size: 100% 100%;
  background-position: right bottom;
  background-repeat: no-repeat;
  border: 1px solid red;
  width: 386px;
  height: 200px;
}

.topBox {
  display: flex;
}

.topRight {
  /* background: green; */
  width: 200px;
  height: 50px;
}

.centerBox {
  width: 200px;
}
</style>