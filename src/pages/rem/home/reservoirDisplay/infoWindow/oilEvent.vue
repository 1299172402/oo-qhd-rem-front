<!-- 示例组件 -->
<template>
  <div style="font-size: 20px" class="g-w100 g-h100">
    <info-window
      info-width="100%"
      info-height="100%"
      header-title="油田大事件"
      :is-show-max-btn="true"
    >
      <div class="g-w100 g-h100 g-row-flex" style="padding: 20px">
          <div style="height: 250px; width: 100%" class="g-w100">
            <button class="detailLinkBtn" @click="linkroute('oilEventDetail')">详细</button>
            <el-row>
              <el-col :span="4"> 1 </el-col>
              <el-col :span="15"> 2023年3月3日-4日停产检修 </el-col>
              <el-col :span="5"> 2023-02-26 </el-col>
            </el-row>
            <el-row style="margin-top: 20px">
              <el-col :span="4">2 </el-col>
              <el-col :span="15"> QHD32-6-F19井2023年3月13号转注</el-col>
              <el-col :span="5"> 2023-02-27 </el-col>
            </el-row>
            <el-row style="margin-top: 20px">
              <el-col :span="4">3</el-col>
              <el-col :span="15"> 2023年3月3日-4日停产检修 </el-col>
              <el-col :span="5"> 2023-02-23</el-col>
            </el-row>
          </div>
      </div>
    </info-window>
  </div>
</template>
<script>
export default {
    components:{
    },
  data() {
    return {
    };
  },
    methods:{
        linkroute(rname) {
            this.$router.push({name: rname});
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