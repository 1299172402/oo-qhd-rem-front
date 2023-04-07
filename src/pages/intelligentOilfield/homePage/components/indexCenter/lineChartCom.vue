<!-- 指标中心-文本小组件 -->
<template>
  <div style="font-size: 14px;padding: 10px;color: rgba(144,144,144,1)" class="g-w100 g-h100">
    <div>蓬勃采油速度</div>
    <div class="numStyle">
      127
    </div>
    <div class="g-row-flex-V">
      <img src="@/assets/intelligentOilfield/line.png" alt="">
    </div>
  </div>
</template>
<script>

export default {
  name: "LineChartCom"
};
</script>

<style scoped>
.numStyle {
  font-size: 22px;
  font-weight: 700;
  margin: 5px 0 10px;
}
</style>