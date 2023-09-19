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
        <el-button  type="primary" class="buttonActive_primary detailLinkBtn" @click="linkroute">详细</el-button>
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
                path: "/plan/annualPlan?page=/reservoirDisplay/oilexhibition",
            })
        },
    }
};
</script>

<style scoped lang="less">
.detailLinkBtn {
    position: absolute;
    right: 45px;
    top: 10px;
    width: 50px;
    line-height: 22px;
    padding: 0 !important;
    height: 20px !important;
    font-size: smaller !important;
    text-align: center !important;
}
</style>