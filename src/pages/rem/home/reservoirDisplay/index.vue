<template>
  <div>
    <div class="topBanner">油藏看版</div>
    <el-row :gutter="20">
      <el-col :span="17">
        <pagePanel headerTitle="秦皇岛32-6油田日度产量跟踪" style="height: 600px; width: 100%" class="g-w100">
          <button class="detailLinkBtn" @click="linkroute('fault')">详细</button>
          <outputTracking></outputTracking>
        </pagePanel>
      </el-col>
      <el-col :span="7">
        <pagePanel headerTitle="剩余油情况" style="height: 330px; width: 100%" class="g-w100">
          <button class="detailLinkBtn" @click="linkroute('operationOverview')">详细</button>
          <remainingOil></remainingOil>
        </pagePanel>
        <pagePanel headerTitle="油田大事件" style="height: 250px; width: 100%" class="g-w100">
          <button class="detailLinkBtn" @click="linkroute('operationOverview')">详细</button>
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
        </pagePanel>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="position:relative;top:-50px">
      <el-col :span="17">
        <pagePanel headerTitle="秦皇岛32-6油田月度产量对比图" style="height: 450px; width: 100%" class="g-w100">
          <button class="detailLinkBtn" @click="linkroute('fault')">详细</button>
          <monthContrast></monthContrast>
        </pagePanel>
      </el-col>
      <el-col :span="7">
        <pagePanel headerTitle="产量构成详情" style="height: 450px; width: 100%" class="g-w100">
          <button class="detailLinkBtn" @click="linkroute('operationOverview')">详细</button>
          <yieldComponects></yieldComponects>
        </pagePanel>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="position:relative;top:-50px">
      <el-col :span="9">
        <pagePanel headerTitle="产能波动" style="height: 450px; width: 100%" class="g-w100">
          <button class="detailLinkBtn" @click="linkroute('fault')">详细</button>
          <capacityFluctuations></capacityFluctuations>
        </pagePanel>
      </el-col>
      <el-col :span="8">
        <pagePanel headerTitle="问题井统计" style="height: 450px; width: 100%" class="g-w100">
          <button class="detailLinkBtn" @click="linkroute('operationOverview')">详细</button>
          <problemStatistics></problemStatistics>
        </pagePanel>
      </el-col>
      <el-col :span="7">
        <pagePanel headerTitle="关停井统计" style="height: 450px; width: 100%" class="g-w100">
          <button class="detailLinkBtn" @click="linkroute('shutdownDetection')">详细</button>
          <shutdownWell></shutdownWell>
        </pagePanel>
      </el-col>
    </el-row>
    <el-row :gutter="20"  style="position:relative;top:-50px">
      <el-col :span="9">
        <pagePanel headerTitle="秦皇岛32-6南区" style="height: 750px; width: 100%" class="g-w100">
          <button class="detailLinkBtn" @click="linkroute('productionIndex')">详细</button>
          <exhibition></exhibition>
        </pagePanel>
      </el-col>
      <el-col :span="8">
        <pagePanel headerTitle="分层注入量" style="height: 750px; width: 100%" class="g-w100">
          <button class="detailLinkBtn" @click="linkroute('manufacturerOperationTime')">详细</button>
          <stratifiedInjection></stratifiedInjection>
        </pagePanel>
      </el-col>
      <el-col :span="7">
        <pagePanel headerTitle="措施效果跟踪表" style="height: 370px; width: 100%" class="g-w100">
          <button class="buttonActive_primary detailLinkBtn" @click="linkroute('measuresPumpWellRecovery')">
            详细
          </button>
          <span style="color: #1ec5e6; position: relative; top: -45px; left: 150px">措施潜力井统计表</span>
          <span style="color: #1ec5e6; position: relative; top: -45px; left: 160px"
            >增油量值设置
            <div class="inputstyle"><el-input></el-input></div>
          </span>
          <effectMeasure style="margin-top:-50px"></effectMeasure>
        </pagePanel>
        <pagePanel headerTitle="超欠注情况统计" style="height: 370px; width: 100%" class="g-w100">
          <button class="detailLinkBtn" @click="linkroute('measuresPumpWellRecovery')">详细</button>
            <owing></owing>
        </pagePanel>
      
      </el-col>
    </el-row>
    <el-row :gutter="20"  style="position:relative;top:-50px">
      <el-col :span="8">
        <pagePanel headerTitle="自然递减率" style="height: 450px; width: 100%" class="g-w100">
          <button class="detailLinkBtn" @click="linkroute('productionIndex')">详细</button>
          <naturalDecline></naturalDecline>
        </pagePanel>
        <pagePanel headerTitle="采出程度与含水率关系图" style="height: 450px; width: 100%" class="g-w100">
          <button class="detailLinkBtn" @click="linkroute('productionIndex')">详细</button>
          <recoverLevel></recoverLevel>
        </pagePanel>
      </el-col>
      <el-col :span="8">
        <pagePanel headerTitle="采油速度" style="height: 450px; width: 100%" class="g-w100">
          <button class="detailLinkBtn" @click="linkroute('manufacturerOperationTime')">详细</button>
          <recoveryRate></recoveryRate>
        </pagePanel>
        <pagePanel headerTitle="含水上升" style="height: 450px; width: 100%" class="g-w100">
          <button class="detailLinkBtn" @click="linkroute('manufacturerOperationTime')">详细</button>
          <waterUp></waterUp>
        </pagePanel>
      </el-col>
      <el-col :span="8"  >
        <pagePanel
          :show-btn="true"
          headerTitle="秦皇岛32-6油田生产指标总览"
          style="height: 930px; width: 100%"
          class="g-w100"
        >
          <!-- <button class="detailLinkBtn" @click="linkroute('measuresPumpWellRecovery')">详细</button> -->
          <overviewIndicators></overviewIndicators>
        </pagePanel>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { LineChart } from "echarts/charts";
import { GridComponent, TooltipComponent, LegendComponent } from "echarts/components";
import chartsComponents from "@/components/intelligentOilfield/echarts-com/index.vue";
import { CanvasRenderer } from "echarts/renderers";
import * as echarts from "echarts/core";
const moduleFiles = import.meta.globEager(`./modules/*/index.vue`);
const moduleName = Object.entries(moduleFiles).reduce(
  (t, i) =>
    Object.assign(t, {
      [i[0].replace(/\.\/modules\/(\S+)\/index.vue/, "$1")]: i[1].default,
    }),
  {},
);
echarts.use([GridComponent, LegendComponent, TooltipComponent, LineChart, CanvasRenderer]);
const labelName = ["总值", "合格值", "测试"];

const getRate = 70;

// this.$store.state
export default {
  components: {
    chartsComponents,
    ...moduleName,
    // productionIndex,
    // fault,
    // productInfo,
    // measureResume,
    // operationUnitRunTime,
    // checkRecoveryPump
  },
  computed: {
    getGlobeTheme(val) {
      return this.$store.state.setting.mode;
    },
  },
  watch: {
    getGlobeTheme(val) {
      this.mode = val;
    },
  },
  data() {
    return {
      mode: "",
    };
  },
  methods: {
    linkroute(rname) {
      this.$router.push({
        path: `/reservoirDisplay/${rname}`,
        query: { key: rname },
      });
    },
  },
};
</script>

<style scoped>
/* .container {
  display: flex;
  flex-wrap: wrap;
  height: 100px;
  flex-direction: column;
} */

.detailLinkBtn {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 50px;
  height: 20px;
  background: linear-gradient(90deg, #0751b0, #50a6ec);
  text-align: center;
  font-size: smaller;
  border: 0;
  cursor: pointer;
  color: #ffffff;
}
.topBanner {
  width: 100%;
  height: 60px;
  background: url("@/assets/topBanner.svg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  line-height: 50px;
  text-align: center;
  font-size: 25px;
  color: #00b4ff;
}
.inputstyle ::v-deep.el-input__inner {
  width: 10%;
  position: relative;
  top: -25px;
  left: 200px;
  height: 20px;
}
</style>
