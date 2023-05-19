<template>
    <div class="app-container" style="width: 100%; height: 100%">
        <div style="width: 15%; height: 10%; margin-left: 5%; text-align: center; padding: 5px 0">
<!--            投产时间：2001-10-->
        </div>
        <Echart :chart-data="histogram" width="100%" height="65%"></Echart>
        <el-row :gutter="20">
            <el-col :span="7">
                <div style="display: flex;position: relative;bottom: 60px">
                    <div style="width: 50%">
                        <Echart :chart-data="option"></Echart>
                        <div style="position:absolute;bottom:15%;left:2%;font-size: 10px;text-align: center">
                            <h5 style="color: #0d84ff">油田总井数/开井数(口)</h5>
                            <div style="font-size: 20px;">{{dataList.oilWellTotal}}/{{dataList.oilWellOpenTotal}}</div>
                        </div>
                        
                    </div>
                    <div style="width: 50%">
                        <Echart :chart-data="option2"></Echart>
                        <div style="position:absolute;bottom:15%;right:5%;font-size: 10px;text-align: center">
                            <h5 style="color: #0d84ff">水井总井数/开井数(口)</h5>
                            <div style="font-size: 20px;">{{dataList.injWellTotal}}/{{dataList.injWellOpenTotal}}</div>
                        </div>
                        
                    </div>
                </div>
            </el-col>
            <el-col :span="17" style="margin-top: 15px">
                <el-row :gutter="10">
                    <el-col :span="8" v-for="(item, index) in data" :key="index">
                        <div style="float: left; width: 60px; height: 60px">
<!--                            <svg-icon :icon-class="item.icon" style="width: 100%; height: 100%"/>-->
                            <el-image style="padding: 15%" :src="item.src"></el-image>
                        </div>
                        <div style="margin-top: 10px">
                            <div>{{ item.name }}</div>
                            <div>{{ item.value }}</div>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Echart from "@/components/tools/Echarts/index.vue";
import verticalSwitchButton from "@/components/intelligentOilfield/vertical-switch-button/index.vue";
import {LineChart} from "echarts/charts";
import * as echarts from "echarts/core";
import {GridComponent, TooltipComponent, LegendComponent} from "echarts/components";
import {CanvasRenderer} from "echarts/renderers";
import {queryYieldTracking} from "@/api/rem/reservoirbillboards.js"

echarts.use([GridComponent, LegendComponent, TooltipComponent, LineChart, CanvasRenderer]);
//前端细节区分
var demoData = {
    name: "批次转化率",
    value: "",
};
let dataArr = 6130;
export default {
    props: ["infodata"],
    components: {
        Echart,
    },
    data() {
        return {
            histogram: {
                color: ["#00C1DE", "#6F7AF8", "#F5A547", "#3399ff"],
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                    },
                },
                grid: {
                    left: '5%',
                    right: '5%',
                    top: 30,
                    bottom: 30,
                    show: false, // 隐藏坐标系网格线
                    containLabel: true,
                },
                legend: {
                    bottom: "bottom",
                    textStyle: {
                        color: "",
                    },
                    data: [
                        {
                            name: "计划日产",
                            icon: "circle",
                        },
                        {
                            name: "实际日产",
                            icon: "circle",
                        },
                        {
                            name: "实际累产",
                            icon: "circle",
                        },
                        {
                            name: "计划累产",
                            icon: "circle",
                        },
                    ],
                },
                xAxis: [
                    {
                        type: "category",
                        boundaryGap: false,
                        data: [],
                        axisLabel: {
                            fontSize: 16,
                            color: "#a9a8a8",
                            // margin: 10,
                            interval: 30, // 控制每隔多少个标签显示一个标签
                            formatter: function (value) {
                                return Number( value.substring(5, 7) )+ '月'; // 只保留月份部分
                            },
                        },
                        axisLine: {
                            show: true, // 隐藏 x 轴线
                        },
                        splitLine: {
                            show: false, // 隐藏 x 轴分隔线
                        },
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        name: "日产 (m³/d)",
                        nameTextStyle: {
                            padding: [0, 0, 60, 0], // 上、右、下、左
                        },
                        nameLocation: "center",
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#a9a8a8",
                            },
                        },
                        splitLine: {
                            show: false, // 隐藏 x 轴分隔线
                        },
                        axisLabel: {
                            fontSize: 16,
                            color: "#a9a8a8",
                            margin: 10,
                            formatter: "{value}",
                        },
                    },
                    {
                        type: "value",
                        name: "年产(10⁴m³)",
                        position: "right",
                        nameTextStyle: {
                            padding: [60, 0, 0, 0], // 上、右、下、左
                        },
                        nameLocation: "center",
                        scale: true,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#a9a8a8",
                            },
                        },
                        splitLine: {
                            show: false, // 隐藏 x 轴分隔线
                        },
                        axisLabel: {
                            fontSize: 16,
                            color: "#a9a8a8",
                            margin: 10,
                            formatter: "{value}",
                        },
                    },
                ],
                series: [
                    {
                        name: "计划日产",
                        type: "line",
                        symbolSize: 0, // 设置点的大小为 0，不会显示出来
                        yAxisIndex: 0,
                        data: [],
                    },
                    {
                        name: "实际日产",
                        type: "line",
                        symbolSize: 0, // 设置点的大小为 0，不会显示出来
                        yAxisIndex: 0,
                        data: [],
                    },
                    {
                        name: "实际累产",
                        symbolSize: 0, // 设置点的大小为 0，不会显示出来
                        type: "line",
                        yAxisIndex: 1,
                        data: [
                            
                        ],
                    },
                    {
                        name: "计划累产",
                        type: "line",
                        symbolSize: 0, // 设置点的大小为 0，不会显示出来
                        yAxisIndex: 1,
                        data: [
                           
                        ],
                    },
                ],
            },
            dataList:'',
            data: [
                {
                    src: new URL('./image/01.png', import.meta.url).href,
                    icon: "01",
                    name: "日产油(m³)",
                    value: "0",
                },
                {
                    src:new URL('./image/02.png', import.meta.url).href,
                    icon: "02",
                    name: "与前日日产油差值(m³)",
                    value: "0",
                },
                {
                    src:new URL('./image/03.png', import.meta.url).href,
                    icon: "03",
                    name: "年累产油(10⁴m³)",
                    value: "0",
                },
                {
                    src:new URL('./image/04.png', import.meta.url).href,
                    icon: "04",
                    name: "采收率(%)",
                    value: "0",
                },
                {
                    src:new URL('./image/05.png', import.meta.url).href,
                    icon: "05",
                    name: "综合含水率(%)",
                    value: "0",
                },
                {
                    src:new URL('./image/06.png', import.meta.url).href,
                    icon: "06",
                    name: "地质储量(10⁴m³)",
                    value: "0",
                },
            ],
            option: {
                series: [
                    // 底层
                    {
                        name: "内部宽线条",
                        type: "gauge",
                        radius: "44",
                        startAngle: 186,
                        endAngle: -6,
                        axisLine: {
                            roundCap: true,
                            lineStyle: {
                                color: [[1, "#2f7194"]],
                                width: 15,
                            },
                        },
                        axisLabel: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                        detail: {
                            show: false,
                        },
                        title: {
                            show: false,
                        },
                    },
                    //   间隔条形
                    {
                        name: "间隔条形",
                        type: "gauge",
                        radius: "40",
                        min: 0,
                        max: 10000,

                        z: 4,
                        splitNumber: 14,
                        startAngle: 186,
                        endAngle: -6,
                        axisLine: {
                            lineStyle: {
                                opacity: 0,
                            },
                        },
                        axisLabel: {
                            show: false,
                        },
                        axisTick: {
                            show: true,
                            length: 12,
                            splitNumber: 2,
                            distance: -12,
                            lineStyle: {
                                color: "#0552c7",
                                width: 2,
                            },
                        },
                        splitLine: {
                            show: false,
                        },
                        detail: {
                            show: false,
                        },
                        title: {
                            show: false,
                        },
                    },
                    // 数据
                    {
                        name: "内层数据刻度",
                        type: "gauge",
                        radius: "41",
                        z: 3,
                        // min: 0,
                        // max: 10000,

                        startAngle: 186,
                        endAngle: -6,
                        // 进度的颜色
                        axisLine: {
                            roundCap: true,
                            lineStyle: {
                                width: 10,
                                // color: [[0.2, '#77D97F'],[0.8, '#4285F4'],[1, '#FF7E7F']],
                                color: [
                                    // [dataArr/10000,'#fff'],
                                    [1, "#053db5"],
                                ],
                            },
                        },
                        progress: {
                            show: true,
                            roundCap: false,
                            width: 11,
                            itemStyle: {
                                color: {
                                    type: "linear",
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        {
                                            offset: dataArr / 10000 / 6,
                                            color: "#ffffff",
                                        },
                                        {
                                            offset: 0.4,
                                            color: "#54cae2",
                                        },
                                        {
                                            offset: 0.7,
                                            color: "#3690a3",
                                        },
                                        {
                                            offset: 1,
                                            color: "#2d7a8b",
                                        },
                                    ],
                                    // global: false // 缺省为 false
                                },
                                borderColor: "#1b5b76",
                                borderWidth: "2",
                            },
                        },
                        tooltip: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                        pointer: {
                            show:false,
                            length: "78%",
                            width: 2,
                            offsetCenter: [0, "-30%"],
                            itemStyle: {
                                color: {
                                    type: "linear",
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: "#ffffff",
                                        },
                                        {
                                            offset: 0.7,
                                            color: "#ffffff",
                                        },
                                        {
                                            offset: 1,
                                            color: "#2d7a8b",
                                        },
                                    ],
                                    // global: false // 缺省为 false
                                },
                                // shadowColor: 'rgba(0, 0, 0, 0.5)',
                                shadowBlur: 7,
                                shadowColor: "#ffffff",
                            },
                        },
                        detail: {
                            offsetCenter: ["4%", "-5%"],
                            formatter: function (value) {
                                return "{value|" + value + "}";
                            },
                            rich: {
                                value: {
                                    fontSize: 13,
                                    fontWeight: "bolder",
                                    // color: "#ffffff",
                                    textShadowBlur: "12",
                                    textShadowColor: "#3ea0b5",
                                },
                                unit: {
                                    fontSize: 18,
                                    fontWeight: "bolder",
                                    // color: "#ffffff",
                                    textShadowBlur: "12",
                                    textShadowColor: "#3ea0b5",
                                },
                            },
                        },
                        data: [
                            {
                                value: 90.45,
                            },
                        ],
                    },
                    // 最内层线
                    {
                        name: "最内层线",
                        type: "gauge",
                        radius: "28",

                        startAngle: 192,
                        min: 0,
                        max: 10000,
                        endAngle: -12,
                        splitLine: {
                            show: false,
                            lineStyle: {
                                opacity: 0,
                            },
                        },
                        axisLabel: {
                            show: false,
                        },
                        // 上面一圈
                        itemStyle: {
                            color: "#50cbe7",
                            shadowColor: "rgba(0,138,255,0.45)",
                            shadowBlur: 2,
                            shadowOffsetX: 1,
                            shadowOffsetY: 1,
                        },
                        // 刻度指到位置
                        progress: {
                            roundCap: true,
                            show: true,
                            roundCap: true,
                            width: 3,
                        },
                        axisLine: {
                            roundCap: true,
                            show: true,
                            lineStyle: {
                                color: [[1, "#2e719a"]],
                                width: 3,
                                opacity: 0.5,
                                shadowColor: "rgba(0,138,255,0.45)",
                                shadowBlur: 5,
                                shadowOffsetX: 1,
                                shadowOffsetY: 1,
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        pointer: {
                            show: false,
                        },
                        detail: {
                            show: false,
                        },
                        data: [
                            {
                                value: dataArr,
                                // value: data.value
                            },
                        ],
                    },
                ],
            },
            option2: {
                series: [
                    // 底层
                    {
                        name: "内部宽线条",
                        type: "gauge",
                        radius: "44",
                        startAngle: 186,
                        endAngle: -6,
                        axisLine: {
                            roundCap: true,
                            lineStyle: {
                                color: [[1, "#2f7194"]],
                                width: 15,
                            },
                        },
                        axisLabel: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                        detail: {
                            show: false,
                        },
                        title: {
                            show: false,
                        },
                    },
                    //   间隔条形
                    {
                        name: "间隔条形",
                        type: "gauge",
                        radius: "40",
                        min: 0,
                        max: 10000,

                        z: 4,
                        splitNumber: 14,
                        startAngle: 186,
                        endAngle: -6,
                        axisLine: {
                            lineStyle: {
                                opacity: 0,
                            },
                        },
                        axisLabel: {
                            show: false,
                        },
                        axisTick: {
                            show: true,
                            length: 12,
                            splitNumber: 2,
                            distance: -12,
                            lineStyle: {
                                color: "#2f7698",
                                width: 2,
                            },
                        },
                        splitLine: {
                            show: false,
                        },
                        detail: {
                            show: false,
                        },
                        title: {
                            show: false,
                        },
                    },
                    // 数据
                    {
                        name: "内层数据刻度",
                        type: "gauge",
                        radius: "41",
                        z: 3,
                        // min: 0,
                        // max: 10000,

                        startAngle: 186,
                        endAngle: -6,
                        // 进度的颜色
                        axisLine: {
                            roundCap: true,
                            lineStyle: {
                                width: 10,
                                // color: [[0.2, '#77D97F'],[0.8, '#4285F4'],[1, '#FF7E7F']],
                                color: [
                                    // [dataArr/10000,'#fff'],
                                    [1, "#1c5a73"],
                                ],
                            },
                        },
                        progress: {
                            show: true,
                            roundCap: false,
                            width: 11,
                            itemStyle: {
                                color: {
                                    type: "linear",
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        {
                                            offset: dataArr / 10000 / 6,
                                            color: "#ffffff",
                                        },
                                        {
                                            offset: 0.4,
                                            color: "#54cae2",
                                        },
                                        {
                                            offset: 0.7,
                                            color: "#3690a3",
                                        },
                                        {
                                            offset: 1,
                                            color: "#2d7a8b",
                                        },
                                    ],
                                    // global: false // 缺省为 false
                                },
                                borderColor: "#1b5b76",
                                borderWidth: "2",
                            },
                        },
                        tooltip: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                        pointer: {
                            show:false,
                            length: "78%",
                            width: 2,
                            offsetCenter: [0, "-30%"],
                            itemStyle: {
                                color: {
                                    type: "linear",
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: "#ffffff",
                                        },
                                        {
                                            offset: 0.7,
                                            color: "#ffffff",
                                        },
                                        {
                                            offset: 1,
                                            color: "#2d7a8b",
                                        },
                                    ],
                                    // global: false // 缺省为 false
                                },
                                // shadowColor: 'rgba(0, 0, 0, 0.5)',
                                shadowBlur: 7,
                                shadowColor: "#ffffff",
                            },
                        },
                        detail: {
                            offsetCenter: ["4%", "-5%"],
                            formatter: function (value) {
                                return "{value|" + value + "}";
                            },
                            rich: {
                                value: {
                                    fontSize: 13,
                                    fontWeight: "bolder",
                                    // color: "#ffffff",
                                    textShadowBlur: "12",
                                    textShadowColor: "#3ea0b5",
                                },
                                unit: {
                                    fontSize: 18,
                                    fontWeight: "bolder",
                                    // color: "#ffffff",
                                    textShadowBlur: "12",
                                    textShadowColor: "#3ea0b5",
                                },
                            },
                        },
                        data: [
                            {
                                value: dataArr,
                            },
                        ],
                    },
                    // 最内层线
                    {
                        name: "最内层线",
                        type: "gauge",
                        radius: "28",

                        startAngle: 192,
                        min: 0,
                        max: 10000,
                        endAngle: -12,
                        splitLine: {
                            show: false,
                            lineStyle: {
                                opacity: 0,
                            },
                        },
                        axisLabel: {
                            show: false,
                        },
                        // 上面一圈
                        itemStyle: {
                            color: "#50cbe7",
                            shadowColor: "rgba(0,138,255,0.45)",
                            shadowBlur: 2,
                            shadowOffsetX: 1,
                            shadowOffsetY: 1,
                        },
                        // 刻度指到位置
                        progress: {
                            roundCap: true,
                            show: true,
                            roundCap: true,
                            width: 3,
                        },
                        axisLine: {
                            roundCap: true,
                            show: true,
                            lineStyle: {
                                color: [[1, "#2e719a"]],
                                width: 3,
                                opacity: 0.5,
                                shadowColor: "rgba(0,138,255,0.45)",
                                shadowBlur: 5,
                                shadowOffsetX: 1,
                                shadowOffsetY: 1,
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        pointer: {
                            show: false,
                        },
                        detail: {
                            show: false,
                        },
                        data: [
                            {
                                value: dataArr,
                                // value: data.value
                            },
                        ],
                    },
                ],
            },
        };
    },
    computed: {
        getGlobeTheme(val) {
            return this.$store.state.setting.mode;
        },
    },
    watch: {
        getGlobeTheme: {
            immediate: true,
            handler(Nval) {
                console.log(Nval);
                if (Nval == "dark") {
                    this.histogram.legend.textStyle.color = "#ffffff";
                } else {
                    this.histogram.legend.textStyle.color = "#000000";
                }
            },
            deep: true,
        },
    },
    mounted() {
        this.getData()
    },
    methods: {
        getData() {
            queryYieldTracking({
                ogfId: '3FC9A818F5BC43B88270DB80BBB3018F',
                orgId: '715AD1CD60484BB59E737CD18A9DE44A'
            }).then(res => {
                // @ApiModelProperty("计划日产、实际日产")
                //     List<LinearDataSet> linearDataSet;
                // @ApiModelProperty("计划累产、实际累产")
                //     List<LinearDataSet> linearDataSetsSum;
                // @ApiModelProperty("油井总井数")
                //     private Integer oilWellTotal;
                // @ApiModelProperty("油井开井数")
                //     private Long oilWellOpenTotal;
                // @ApiModelProperty("值=油井开井数/油井总井数×100")
                //     private BigDecimal oilWellPercentage;
                // @ApiModelProperty("水井总井数")
                //     private Integer injWellTotal;
                // @ApiModelProperty("水井开井数")
                //     private Long injWellOpenTotal;
                // @ApiModelProperty("值=水井开井数/水井总井数×100")
                //     private BigDecimal injWellPercentage;
                // @ApiModelProperty("日产油")
                //     private BigDecimal oilProductionDaily;
                // @ApiModelProperty("与前日日产油差值")
                //     private String oilDifference;
                // @ApiModelProperty("年累产油")
                //     private String accOilProduction;
                // @ApiModelProperty("规划采收率%")
                //     private String recoveryEfficiency;
                // @ApiModelProperty("综合含水率%")
                //     private String waterContent;
                // @ApiModelProperty("储量")
                //     private String reserves;
                this.data[0].value = res.data.data.oilProductionDaily
                this.data[1].value = res.data.data.oilDifference
                this.data[2].value = res.data.data.accOilProduction
                this.data[3].value = res.data.data.recoveryEfficiency
                this.data[4].value = res.data.data.waterContent
                this.data[5].value = res.data.data.reserves
                this.option.series[2].data[0].value = res.data.data.oilWellPercentage
                this.option2.series[2].data[0].value = res.data.data.injWellPercentage
                //头部表格
                this.histogram.xAxis[0].data = res.data.data.linearDataSet[1].linearData.map(item=>{
                    return item.label
                })
                //计划日产
                this.histogram.series[0].data = res.data.data.linearDataSet[1].linearData.map(item=>{
                    return item.value
                })
                //实际日产
                this.histogram.series[1].data = res.data.data.linearDataSet[0].linearData.map(item=>{
                    return item.value
                })
                //计划累产
                this.histogram.series[2].data = res.data.data.linearDataSetsSum[1].linearData.map(item=>{
                    return (item.value/10000).toFixed(2)
                })
                //实际累产
                this.histogram.series[3].data = res.data.data.linearDataSetsSum[0].linearData.map(item=>{
                    return (item.value/10000).toFixed(2)
                })
                this.dataList = res.data.data
            })
        }
    },
};
</script>
<style lang="scss" scoped>
// .f1 {
//   margin: 10px;
// }
.cont {
    & > div {
        margin-top: 20px;
    }
}

.m1 {
    margin-top: 10px;
}

.f1 {
    margin-left: 10px;
}

.text {
    margin-top: 10px;
    height: 42px;
    border: 1px solid rgb(32, 112, 224);
    text-align: center;
    line-height: 42px;
    box-shadow: 0px 0px 15px #66ffff inset;
}

.xbox {
    display: flex;
    align-items: center;
    height: 200px;
}

.item {
    height: 100%;
    box-sizing: border-box;
}

#item1 {
    width: 30%;
}

.item-group {
    display: flex;
    flex-grow: 1;
}

#item2 {
    flex-basis: 70%;
    margin-right: 20px;
}

#item3 {
    flex-basis: 70%;
}
</style>
