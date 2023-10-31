<template>
    <div class="app-container">
        <div class="topBanner">油藏看板
        </div>
        <el-dialog
            title=""
            :visible.sync="dialogVisible"
            width="30%"
            :close-on-click-modal="true"
        >
            <el-form
                ref="ruleForm"
                :model="chooseList"
                style="width: 600px"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="展示页签" prop="type">
                    <el-checkbox-group v-model="chooseList">
                        <el-checkbox label="日度产量跟踪" name="type"/>
                        <el-checkbox label="剩余油情况" name="type"/>
                        <el-checkbox label="油田单井大事件" name="type"/>
                        <el-checkbox label="月度产量对比图" name="type"/>
                        <el-checkbox label="产量构成详情" name="type"/>
                        <el-checkbox label="产能波动" name="type"/>
                        <el-checkbox label="问题井统计" name="type"/>
                        <el-checkbox label="关停井统计" name="type"/>
                        <el-checkbox label="秦皇岛32-6南区" name="type"/>
                        <el-checkbox label="分层注采量" name="type"/>
                        <el-checkbox label="措施建议表" name="type"/>
                        <el-checkbox label="超欠注情况统计" name="type"/>
                        <el-checkbox label="自然递减率" name="type"/>
                        <el-checkbox label="采油速度" name="type"/>
                        <el-checkbox label="采出程度与含水率关系图" name="type"/>
                        <el-checkbox label="含水上升率" name="type"/>
                        <el-checkbox label="秦皇岛32-6油田生产指标总览" name="type"/>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <el-button class="cancelBtn" @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" class="buttonActive_primary" @click="comfirm">确 定</el-button>
        </el-dialog>
        <grid-layout :layout="layout" company-name="yourCompany2"/>
    </div>
</template>

<script>
import gridLayout from "./grid-layout/index.vue";
import {LineChart} from "echarts/charts";
import {GridComponent, TooltipComponent, LegendComponent} from "echarts/components";
import chartsComponents from "@/components/intelligentOilfield/echarts-com/index.vue";
import {CanvasRenderer} from "echarts/renderers";
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
// this.$store.state
export default {
    name: "Oilexhibition",
    components: {
        chartsComponents,
        ...moduleName,
        gridLayout,
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
            chooseList: [],
            dialogVisible: false,
            layout: [
                { x: 0, y: 0, w: 8, h: 16, i: "0", name: "秦皇岛32-6油田日度产量跟踪", show: true },
                { x: 8, y: 0, w: 4, h: 8, i: "1", name: "剩余油情况", show: true },
                { x: 8, y: 8, w: 4, h: 8, i: "2", name: "油田单井大事件", show: true },
                { x: 0, y: 16, w: 8, h: 13, i: "3", name: "月度产量完成情况", show: true },
                { x: 8, y: 16, w: 4, h: 27, i: "4", name: "秦皇岛32-6油田生产指标总览", show: true },
                { x: 0, y: 28, w: 4, h: 14, i: "5", name: "产能波动", show: true },
                { x: 4, y: 28, w: 4, h: 14, i: "6", name: "问题井统计", show: true },
                { x: 0, y: 40, w: 4, h: 20, i: "7", name: "单井井底流压", show: true },
                { x: 4, y: 40, w: 4, h: 20, i: "8", name: "分层注采量", show: true },
                { x: 8, y: 40, w: 4, h: 10, i: "9", name: "产量构成详情", show: true },
                { x: 8, y: 50, w: 4, h: 10, i: "10", name: "关停井统计", show: true },
                { x: 0, y: 60, w: 6, h: 10, i: "11", name: "措施建议表", show: true },
                { x: 6, y: 60, w: 6, h: 10, i: "12", name: "超欠注情况统计", show: true },
                { x: 0, y: 70, w: 6, h: 10, i: "13", name: "自然递减率", show: true },
                { x: 6, y: 70, w: 6, h: 10, i: "16", name: "含水上升率", show: true },
                { x: 0, y: 80, w: 6, h: 10, i: "15", name: "采出程度与含水率关系图", show: true },
                { x: 6, y: 80, w: 6, h: 10, i: "14", name: "采油速度", show: true },
                
            ]
        };
    },
    methods: {
        linkroute(rname) {
            this.$router.push({
                path: "/plucking/mechanical/outerframe",
                query: {key: rname},
            });
        },
        comfirm() {
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
