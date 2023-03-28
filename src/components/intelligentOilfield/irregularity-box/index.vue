<!-- 带切角背景card -->
<template>
  <div>
    <div class="qiejiao"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.qiejiao {
  /* background: red; */
  background: linear-gradient(135deg, transparent 10px, var(--opacityBlueBg2) 0) left top,
    linear-gradient(0deg, transparent 0px, var(--opacityBlueBg2) 0) right top,
    linear-gradient(-45deg, transparent 10px, var(--opacityBlueBg2) 0) right bottom,
    linear-gradient(0deg, transparent 0px, var(--opacityBlueBg2) 0) left bottom;
  background-size: 50% 50%;
  background-repeat: no-repeat;
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
