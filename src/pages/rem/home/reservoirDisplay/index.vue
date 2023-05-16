<template>
  <div class="app-container">
    <div class="topBanner">油藏看版
<!--        <el-button type="primary" style="float: right;margin-top: 20px" class="buttonActive_primary" @click="dialogVisible = true">-->
<!--            配置-->
<!--        </el-button>-->
    </div>
      
<!--      <el-dialog-->
<!--          title=""-->
<!--          :visible.sync="dialogVisible"-->
<!--          width="30%"-->
<!--          :close-on-click-modal="true"-->
<!--      >-->
<!--          <el-form-->
<!--              ref="ruleForm"-->
<!--              :model="chooseList"-->
<!--              style="width: 600px"-->
<!--              :rules="rules"-->
<!--              label-width="100px"-->
<!--              class="demo-ruleForm"-->
<!--          >-->
<!--              <el-form-item label="展示页签" prop="type">-->
<!--                  <el-checkbox-group v-model="chooseList">-->
<!--                      <el-checkbox label="日度产量跟踪" name="type" />-->
<!--                      <el-checkbox label="剩余油情况" name="type" />-->
<!--                      <el-checkbox label="油田大事件" name="type" />-->
<!--                      <el-checkbox label="月度产量对比图" name="type" />-->
<!--                      <el-checkbox label="产量构成详情" name="type" />-->
<!--                      <el-checkbox label="产能波动" name="type" />-->
<!--                      <el-checkbox label="问题井统计" name="type" />-->
<!--                      <el-checkbox label="关停井统计" name="type" />-->
<!--                      <el-checkbox label="秦皇岛32-6南区" name="type" />-->
<!--                      <el-checkbox label="分层注入量" name="type" />-->
<!--                      <el-checkbox label="措施效果跟踪表" name="type" />-->
<!--                      <el-checkbox label="超欠注情况统计" name="type" />-->
<!--                      <el-checkbox label="自然递减率" name="type" />-->
<!--                      <el-checkbox label="采油速度" name="type" />-->
<!--                      <el-checkbox label="采出程度与含水率关系图" name="type" />-->
<!--                      <el-checkbox label="含水上升" name="type" />-->
<!--                      <el-checkbox label="秦皇岛32-6油田生产指标总览" name="type" />-->
<!--                  </el-checkbox-group>-->
<!--              </el-form-item>-->
<!--          </el-form>-->
<!--        <el-button class="cancelBtn" @click="dialogVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" class="buttonActive_primary" @click="comfirm">确 定</el-button>-->
<!--      </el-dialog>-->
      <grid-layout :layout="layout" company-name="yourCompany2" />
<!--      <el-row :gutter="20" >-->
<!--      <el-col :span="17">-->
<!--          <info-window-->
<!--              info-width="100%"-->
<!--              info-height="100%"-->
<!--              header-title="test"-->
<!--              :is-show-max-btn="true"-->
<!--          >-->
<!--              <div class="g-w100 g-h100 g-row-flex" style="padding: 20px">-->
<!--                  <pagePanel v-if="(chooseList.filter(item=>{return item=='日度产量跟踪'})).length" headerTitle="秦皇岛32-6油田日度产量跟踪" style="height: 600px; width: 100%;overflow: hidden" class="g-w100">-->
<!--                      <button class="detailLinkBtn" @click="linkroute('fault')">详细</button>-->
<!--                      <outputTracking></outputTracking>-->
<!--                  </pagePanel>-->
<!--              </div>-->
<!--          </info-window>-->
<!--     -->
<!--      </el-col>-->
<!--      <el-col :span="7">-->
<!--        <pagePanel v-if="(chooseList.filter(item=>{return item=='剩余油情况'})).length" headerTitle="剩余油情况" style="height: 330px; width: 100%" class="g-w100">-->
<!--          <button class="detailLinkBtn" @click="linkroute('operationOverview')">详细</button>-->
<!--          <remainingOil></remainingOil>-->
<!--        </pagePanel>-->
<!--        <pagePanel v-if="(chooseList.filter(item=>{return item=='油田大事件'})).length" headerTitle="油田大事件" style="height: 250px; width: 100%" class="g-w100">-->
<!--          <button class="detailLinkBtn" @click="linkroute('operationOverview')">详细</button>-->
<!--          <el-row>-->
<!--            <el-col :span="4"> 1 </el-col>-->
<!--            <el-col :span="15"> 2023年3月3日-4日停产检修 </el-col>-->
<!--            <el-col :span="5"> 2023-02-26 </el-col>-->
<!--          </el-row>-->
<!--          <el-row style="margin-top: 20px">-->
<!--            <el-col :span="4">2 </el-col>-->
<!--            <el-col :span="15"> QHD32-6-F19井2023年3月13号转注</el-col>-->
<!--            <el-col :span="5"> 2023-02-27 </el-col>-->
<!--          </el-row>-->
<!--          <el-row style="margin-top: 20px">-->
<!--            <el-col :span="4">3</el-col>-->
<!--            <el-col :span="15"> 2023年3月3日-4日停产检修 </el-col>-->
<!--            <el-col :span="5"> 2023-02-23</el-col>-->
<!--          </el-row>-->
<!--        </pagePanel>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    <el-row :gutter="20" >-->
<!--      <el-col :span="17">-->
<!--        <pagePanel v-if="(chooseList.filter(item=>{return item=='月度产量对比图'})).length" headerTitle="秦皇岛32-6油田月度产量对比图" style="height: 450px; width: 100%;" class="g-w100">-->
<!--          <button class="detailLinkBtn" @click="linkroute('fault')">详细</button>-->
<!--          <monthContrast></monthContrast>-->
<!--        </pagePanel>-->
<!--      </el-col>-->
<!--      <el-col :span="7">-->
<!--        <pagePanel v-if="(chooseList.filter(item=>{return item=='产量构成详情'})).length" headerTitle="产量构成详情" style="height: 450px; width: 100%" class="g-w100">-->
<!--          <button class="detailLinkBtn" @click="linkroute('operationOverview')">详细</button>-->
<!--          <yieldComponects></yieldComponects>-->
<!--        </pagePanel>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    <el-row :gutter="20" >-->
<!--      <el-col :span="9">-->
<!--        <pagePanel  v-if="(chooseList.filter(item=>{return item=='产能波动'})).length" headerTitle="产能波动" style="height: 450px; width: 100%" class="g-w100">-->
<!--          <button class="detailLinkBtn" @click="linkroute('fault')">详细</button>-->
<!--          <capacityFluctuations></capacityFluctuations>-->
<!--        </pagePanel>-->
<!--      </el-col>-->
<!--      <el-col :span="8">-->
<!--        <pagePanel v-if="(chooseList.filter(item=>{return item=='问题井统计'})).length" headerTitle="问题井统计" style="height: 450px; width: 100%" class="g-w100">-->
<!--          <button class="detailLinkBtn" @click="linkroute('operationOverview')">详细</button>-->
<!--          <problemStatistics></problemStatistics>-->
<!--        </pagePanel>-->
<!--      </el-col>-->
<!--      <el-col :span="7">-->
<!--        <pagePanel v-if="(chooseList.filter(item=>{return item=='关停井统计'})).length" headerTitle="关停井统计" style="height: 450px; width: 100%" class="g-w100">-->
<!--          <button class="detailLinkBtn" @click="linkroute('operationOverview')">详细</button>-->
<!--          <shutdownWell></shutdownWell>-->
<!--        </pagePanel>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    <el-row :gutter="20"  >-->
<!--      <el-col :span="9">-->
<!--        <pagePanel v-if="(chooseList.filter(item=>{return item=='秦皇岛32-6南区'})).length" headerTitle="秦皇岛32-6南区" style="height: 750px; width: 100%" class="g-w100">-->
<!--          <button class="detailLinkBtn" @click="linkroute('productionIndex')">详细</button>-->
<!--          <exhibition></exhibition>-->
<!--        </pagePanel>-->
<!--      </el-col>-->
<!--      <el-col :span="8">-->
<!--        <pagePanel v-if="(chooseList.filter(item=>{return item=='分层注入量'})).length" headerTitle="分层注入量" style="height: 750px; width: 100%" class="g-w100">-->
<!--          <button class="detailLinkBtn" @click="linkroute('manufacturerOperationTime')">详细</button>-->
<!--          <stratifiedInjection></stratifiedInjection>-->
<!--        </pagePanel>-->
<!--      </el-col>-->
<!--      <el-col :span="7">-->
<!--        <pagePanel v-if="(chooseList.filter(item=>{return item=='措施效果跟踪表'})).length" headerTitle="措施效果跟踪表" style="height: 370px; width: 100%" class="g-w100">-->
<!--          <button class="buttonActive_primary detailLinkBtn" @click="linkroute('measuresPumpWellRecovery')">-->
<!--            详细-->
<!--          </button>-->
<!--          <span style="color: #1ec5e6; position: relative; top: -45px; left: 150px">措施潜力井统计表</span>-->
<!--          <span style="color: #1ec5e6; position: relative; top: -45px; left: 160px"-->
<!--            >增油量值设置-->
<!--            <div class="inputstyle"><el-input></el-input></div>-->
<!--          </span>-->
<!--          <effectMeasure style="margin-top:-50px"></effectMeasure>-->
<!--        </pagePanel>-->
<!--        <pagePanel  v-if="(chooseList.filter(item=>{return item=='超欠注情况统计'})).length" headerTitle="超欠注情况统计" style="height: 370px; width: 100%" class="g-w100">-->
<!--          <button class="detailLinkBtn" @click="linkroute('measuresPumpWellRecovery')">详细</button>-->
<!--            <owing></owing>-->
<!--        </pagePanel>-->
<!--      -->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    <el-row :gutter="20"  >-->
<!--      <el-col :span="8">-->
<!--        <pagePanel v-if="(chooseList.filter(item=>{return item=='自然递减率'})).length" headerTitle="自然递减率" style="height: 450px; width: 100%" class="g-w100">-->
<!--          <button class="detailLinkBtn" @click="linkroute('productionIndex')">详细</button>-->
<!--          <naturalDecline></naturalDecline>-->
<!--        </pagePanel>-->
<!--        <pagePanel v-if="(chooseList.filter(item=>{return item=='采出程度与含水率关系图'})).length" headerTitle="采出程度与含水率关系图" style="height: 450px; width: 100%" class="g-w100">-->
<!--          <button class="detailLinkBtn" @click="linkroute('productionIndex')">详细</button>-->
<!--          <recoverLevel></recoverLevel>-->
<!--        </pagePanel>-->
<!--      </el-col>-->
<!--      <el-col :span="8">-->
<!--        <pagePanel v-if="(chooseList.filter(item=>{return item=='采油速度'})).length"  headerTitle="采油速度" style="height: 450px; width: 100%" class="g-w100">-->
<!--          <button class="detailLinkBtn" @click="linkroute('manufacturerOperationTime')">详细</button>-->
<!--          <recoveryRate></recoveryRate>-->
<!--        </pagePanel>-->
<!--        <pagePanel v-if="(chooseList.filter(item=>{return item=='含水上升'})).length" headerTitle="含水上升" style="height: 450px; width: 100%" class="g-w100">-->
<!--          <button class="detailLinkBtn" @click="linkroute('manufacturerOperationTime')">详细</button>-->
<!--          <waterUp></waterUp>-->
<!--        </pagePanel>-->
<!--      </el-col>-->
<!--      <el-col :span="8"  >-->
<!--        <pagePanel-->
<!--            v-if="(chooseList.filter(item=>{return item=='秦皇岛32-6油田生产指标总览'})).length"-->
<!--          :show-btn="true"-->
<!--          headerTitle="秦皇岛32-6油田生产指标总览"-->
<!--          style="height: 930px; width: 100%"-->
<!--          class="g-w100"-->
<!--        >-->
<!--          &lt;!&ndash; <button class="detailLinkBtn" @click="linkroute('measuresPumpWellRecovery')">详细</button> &ndash;&gt;-->
<!--          <overviewIndicators></overviewIndicators>-->
<!--        </pagePanel>-->
<!--      </el-col>-->
<!--    </el-row>-->
  </div>
</template>

<script>
import gridLayout from "./grid-layout/index.vue";

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
      gridLayout
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
        chooseList:[],
        dialogVisible:false,
        layout: [
            { x: 0, y: 0, w: 7, h: 16, i: "0", name: "秦皇岛32-6油田日度产量跟踪" },
            { x: 7, y: 0, w: 3, h: 8, i: "1", name: "剩余油情况" },
            { x: 7, y: 8, w: 3, h: 8, i: "2", name: "油田大事件" },
            { x: 0, y: 16, w: 7, h: 12, i: "3", name: "月度产量对比图" },
            { x: 7, y: 16, w: 3, h: 12, i: "4", name: "产量构成详情" },
            { x: 0, y: 28, w: 3, h: 12, i: "5", name: "产能波动" },
            { x: 3, y: 28, w: 3, h: 12, i: "6", name: "问题井统计" },
            { x: 6, y: 28, w: 4, h: 12, i: "7", name: "关停井统计" },
            { x: 0, y: 40, w: 3, h: 20, i: "8", name: "秦皇岛32-6南区" },
            { x: 3, y: 40, w: 3, h: 20, i: "9", name: "分层注入量" },
            { x: 6, y: 40, w: 4, h: 10, i: "10", name: "措施效果跟踪表" },
            { x: 6, y: 50, w: 4, h: 10, i: "11", name: "超欠注情况统计" },
            { x: 0, y: 70, w: 3, h: 12, i: "12", name: "自然递减率" },
            { x: 3, y: 70, w: 3, h: 12, i: "13", name: "采油速度" },
            { x: 0, y: 80, w: 3, h: 12, i: "14", name: "采出程度与含水率关系图" },
            { x: 3, y: 80, w: 3, h: 12, i: "15", name: "含水上升" },
            { x: 6, y: 70, w: 4, h: 24, i: "16", name: "秦皇岛32-6油田生产指标总览" },
        ]
    };
  },
  methods: {
    linkroute(rname) {
      this.$router.push({
        path: "/plucking/mechanical/outerframe",
        query: { key: rname },
      });
    },
      comfirm(){
        console.log(this.chooseList)
          this.dialogVisible = false
      }
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
