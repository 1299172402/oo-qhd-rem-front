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
          <ol>
            <li> 1 2022年9月3日-4日停产检修  2022-08-30</li>
            <li> 2   2022年9月3日-4日停产检修 2022-08-30</li>
            <li> 3  2022年9月3日-4日停产检修 2022-08-30</li>
          </ol>
        </pagePanel>
      </el-col>
    </el-row>
    <el-row :gutter="20">
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
    <el-row :gutter="20">
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
          <button class="detailLinkBtn" @click="linkroute('operationOverview')">详细</button>
          <shutdownWell></shutdownWell>
        </pagePanel>
      </el-col>
    </el-row>
    <el-row :gutter="20">
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
          <button class="detailLinkBtn" @click="linkroute('measuresPumpWellRecovery')">详细</button>
        </pagePanel>
        <pagePanel headerTitle="超欠注情况统计" style="height: 370px; width: 100%" class="g-w100">
          <button class="detailLinkBtn" @click="linkroute('measuresPumpWellRecovery')">详细</button>
        </pagePanel>
      </el-col>
    </el-row>
     <el-row :gutter="20">
      <el-col :span="8">
        <pagePanel headerTitle="自然递减率" style="height: 750px; width: 100%" class="g-w100">
          <button class="detailLinkBtn" @click="linkroute('productionIndex')">详细</button>
          <naturalDecline></naturalDecline>
        </pagePanel>
        <pagePanel headerTitle="采出程度与含水率关系图" style="height: 750px; width: 100%" class="g-w100">
          <button class="detailLinkBtn" @click="linkroute('productionIndex')">详细</button>
          <naturalDecline></naturalDecline>
        </pagePanel>
      </el-col>
      <el-col :span="8">
        <pagePanel headerTitle="采油速度" style="height: 750px; width: 100%" class="g-w100">
          <button class="detailLinkBtn" @click="linkroute('manufacturerOperationTime')">详细</button>
          <recoveryRate></recoveryRate>
        </pagePanel>
          <pagePanel headerTitle="含水上升" style="height: 750px; width: 100%" class="g-w100">
          <button class="detailLinkBtn" @click="linkroute('manufacturerOperationTime')">详细</button>
              <waterUp></waterUp>
        </pagePanel>
      </el-col>
      <el-col :span="8">
        <pagePanel headerTitle="秦皇岛32-6油田生产指标总览" style="height: 1500px; width: 100%" class="g-w100">
          <button class="detailLinkBtn" @click="linkroute('measuresPumpWellRecovery')">详细</button>
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
        path: "/plucking/mechanical/outerframe",
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
.item5 {
  border: 8px inset #2cd5ff;
  padding-top: 10%;
}
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
</style>
