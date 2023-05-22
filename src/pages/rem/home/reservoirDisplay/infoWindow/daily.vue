<!-- 示例组件 -->
<template>
  <div style="font-size: 20px" class="g-w100 g-h100">
    <info-window
      info-width="100%"
      info-height="100%"
      header-title="秦皇岛32-6油田日度产量跟踪"
      :is-show-max-btn="true"
    >
      <div class="g-w100 g-h100 g-row-flex" style="padding: 20px">
        <button class="detailLinkBtn" @click="linkroute">详细</button>
        <outputTracking></outputTracking>
      </div>
    </info-window>
  </div>
</template>
<script>
import outputTracking from '../modules/outputTracking/index.vue'
export default {
    components:{
        outputTracking  
    },
  data() {
    return {
    };
  },
    methods:{
        linkroute() {
            this.$router.push({
                path: "/plan/annualPlan",
            });
        },
    }
};
</script>

<style scoped lang="less">
.detailLinkBtn {
    position: absolute;
    right: 60px;
    top: 10px;
    width: 50px;
    height: 20px;
    background: linear-gradient(90deg, #0751b0, #50a6ec);
    text-align: center;
    font-size: smaller;
    border: 0;
    cursor: pointer;
    color: #ffffff;
}
</style>