<template>
    <div class="app-container" style="height: 100%">
        <info-window
            info-width="100%"
            info-height="100%"
            header-title="秦皇岛32-6油田生产指标总览"
            :is-show-max-btn="true"
        >
            <button class="detailLinkBtn" @click="linkroute('measuresPumpWellRecovery')">详细</button>
            <el-row :gutter="20" style="margin-bottom: 10px">
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <div class="yield water">
                            <div class="box">
                                <div>{{ dataList.dayOilProduction }}</div>
                                <div>m³</div>
                            </div>
                        </div>
                        <div class="text">日产油</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <div class="yield oil">
                            <div class="box">
                                <div>{{ dataList.cumeOilProd }}</div>
                                <div>10⁴m³</div>
                            </div>
                        </div>
                        <div class="text">累产油量</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <div class="yield gas">
                            <div class="box">
                                <div>{{ dataList.annualOilProduction }}</div>
                                <div>10⁴m³</div>
                            </div>
                        </div>
                        <div class="text">年产油量</div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <Echart
                            :chart-data="getEchartData(dataList.productionEfficiency, '%', 'rgb(59,197,197)', 'rgb(59,197,197)', 'rgb(59,197,197)')"
                        ></Echart>
                        <div class="chartText">生产时率</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <Echart
                            :chart-data="getEchartData(dataList.oilWellUtilizationRate, '%', 'rgb(13,190,124)', 'rgb(1,67,78)', 'rgb(13,190,124)')"
                        ></Echart>
                        <div class="chartText">油井利用率</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <Echart
                            :chart-data="getEchartData(dataList.comRate, '%', 'rgb(247,181,0)', 'rgb(41,72,94)', 'rgb(247,181,0)')"></Echart>
                        <div class="chartText">综合时率</div>
                    </div>
                </el-col>
                <!-- <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <Echart :chart-data="getEchartData(12, '口', 'rgb(36,151,194)', 'rgb(7,59,90)', 'rgb(36,151,194)')"></Echart>
                    <div class="chartText">水井总井数</div>
                  </div>
                </el-col> -->
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                    <div>
                        <Echart height="100%" :chart-data="histogram"></Echart>
                        <div class="chartText">自然递减</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div>
                        <Echart height="100%" :chart-data="histogram2"></Echart>
                        <div class="chartText">综合递减</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div>
                        <Echart height="100%" :chart-data="histogram3"></Echart>
                        <div class="chartText">总递减</div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <Echart
                            :chart-data="getEchart(dataList.waterInjectionWellInjection, '%', 'rgb(0,179,225)', 'rgb(38,43,90)', 'transparent')"></Echart>
                        <div class="chartText">分注井分注率</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <Echart
                            :chart-data="getEchart(dataList.layerPassRate, '%', 'rgb(235,125,96)', 'rgb(38,43,90)', 'transparent')"></Echart>
                        <div class="chartText">层段合格率</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <Echart
                            :chart-data="getEchart(dataList.waterCutIncreaseRate, '%', 'rgb(164,227,77)', 'rgb(38,43,90)', 'transparent')"></Echart>
                        <div class="chartText">含水上升率</div>
                    </div>
                </el-col>
            </el-row>
        </info-window>
    </div>
</template>
<script>
import Echart from "@/components/tools/Echarts/index.vue";
import verticalSwitchButton from "@/components/intelligentOilfield/vertical-switch-button/index.vue";
import {LineChart} from "echarts/charts";
import * as echarts from "echarts/core";
import {GridComponent, TooltipComponent, LegendComponent} from "echarts/components";
import {CanvasRenderer} from "echarts/renderers";
import {productionMetricsOverview} from "@/api/rem/reservoirbillboards";

echarts.use([GridComponent, LegendComponent, TooltipComponent, LineChart, CanvasRenderer]);
let value = 0;
let name = "统计";
export default {
    props: ["infodata"],
    components: {
        Echart,
    },
    mounted() {
        this.histogram.series[1].splitLine.lineStyle.color = this.$store.state.setting.mode == 'dark' ? 'rgb(3,42,59)' : '#fff'
        this.histogram2.series[1].splitLine.lineStyle.color = this.$store.state.setting.mode == 'dark' ? 'rgb(3,42,59)' : '#fff'
        this.histogram3.series[1].splitLine.lineStyle.color = this.$store.state.setting.mode == 'dark' ? 'rgb(3,42,59)' : '#fff'
        this.getData();
    },
    computed: {
        getGlobeTheme() {
            return this.$store.state.setting.mode == 'dark' ? 'rgb(3,42,59)' : '#fff'
        }
    },
    watch: {
        getGlobeTheme: {
            handler(val) {
                this.histogram.series[1].splitLine.lineStyle.color = val
                this.histogram2.series[1].splitLine.lineStyle.color = val
                this.histogram3.series[1].splitLine.lineStyle.color = val
            }
        }
    },
    data() {
        return {
            dataList:'',
            histogram: {
                title: {
                    // text: '{a|' + value + '}{c|%}',
                    text: "{a|" + value + "%}{c|\n" + name + "}",
                    x: "center",
                    y: "center",
                    textStyle: {
                        rich: {
                            a: {
                                fontSize: 18,
                                color: "#29EEF3",
                            },

                            c: {
                                fontSize: 10,
                                color: "#fff",
                                // padding: [5,0]
                            },
                        },
                    },
                },
                series: [
                    {
                        name: "",
                        type: "pie",
                        radius: ['58%', '68%'],
                        silent: true,
                        clockwise: true,
                        startAngle: 90,
                        z: 0,
                        zlevel: 0,
                        label: {
                            normal: {
                                position: "center",
                            },
                        },
                        data: [
                            {
                                value: 0,
                                name: "",
                                itemStyle: {
                                    normal: {
                                        color: "red",
                                    },
                                },
                            },
                            {
                                value: 0,
                                name: "",
                                label: {
                                    normal: {
                                        show: false,
                                    },
                                },
                                itemStyle: {
                                    normal: {
                                        color: "transparent",
                                    },
                                },
                            },
                        ],
                    },
                    {
                        name: "",
                        type: "gauge",
                        radius: "82%",
                        center: ["50%", "50%"],
                        startAngle: 0,
                        endAngle: 355.9,
                        splitNumber: 60,
                        hoverAnimation: true,
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            length: 83,
                            lineStyle: {
                                width: 3,
                                color: "red",
                            },
                        },
                        axisLabel: {
                            show: false,
                        },
                        pointer: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                opacity: 0,
                            },
                        },
                        detail: {
                            show: false,
                        },
                        data: [
                            {
                                value: 0,
                                name: "",
                            },
                        ],
                    },
                ],
            },
            histogram2: {
                title: {
                    // text: '{a|' + value + '}{c|%}',
                    text: "{a|" + value + "%}{c|\n" + name + "}",
                    x: "center",
                    y: "center",
                    textStyle: {
                        rich: {
                            a: {
                                fontSize: 18,
                                color: "#29EEF3",
                            },

                            c: {
                                fontSize: 10,
                                color: "#fff",
                                // padding: [5,0]
                            },
                        },
                    },
                },
                series: [
                    {
                        name: "",
                        type: "pie",
                        radius: ['58%', '68%'],
                        silent: true,
                        clockwise: true,
                        startAngle: 90,
                        z: 0,
                        zlevel: 0,
                        label: {
                            normal: {
                                position: "center",
                            },
                        },
                        data: [
                            {
                                value: 0,
                                name: "",
                                itemStyle: {
                                    normal: {
                                        color: "red",
                                    },
                                },
                            },
                            {
                                value: 0,
                                name: "",
                                label: {
                                    normal: {
                                        show: false,
                                    },
                                },
                                itemStyle: {
                                    normal: {
                                        color: "transparent",
                                    },
                                },
                            },
                        ],
                    },
                    {
                        name: "",
                        type: "gauge",
                        radius: "82%",
                        center: ["50%", "50%"],
                        startAngle: 0,
                        endAngle: 355.9,
                        splitNumber: 60,
                        hoverAnimation: true,
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            length: 83,
                            lineStyle: {
                                width: 3,
                                color: "red",
                            },
                        },
                        axisLabel: {
                            show: false,
                        },
                        pointer: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                opacity: 0,
                            },
                        },
                        detail: {
                            show: false,
                        },
                        data: [
                            {
                                value: 0,
                                name: "",
                            },
                        ],
                    },
                ],
            },
            histogram3: {
                title: {
                    // text: '{a|' + value + '}{c|%}',
                    text: "{a|" + value + "%}{c|\n" + name + "}",
                    x: "center",
                    y: "center",
                    textStyle: {
                        rich: {
                            a: {
                                fontSize: 18,
                                color: "#29EEF3",
                            },

                            c: {
                                fontSize: 10,
                                color: "#fff",
                                // padding: [5,0]
                            },
                        },
                    },
                },
                series: [
                    {
                        name: "",
                        type: "pie",
                        radius: ['58%', '68%'],
                        silent: true,
                        clockwise: true,
                        startAngle: 90,
                        z: 0,
                        zlevel: 0,
                        label: {
                            normal: {
                                position: "center",
                            },
                        },
                        data: [
                            {
                                value: 0,
                                name: "",
                                itemStyle: {
                                    normal: {
                                        color: "red",
                                    },
                                },
                            },
                            {
                                value: 0,
                                name: "",
                                label: {
                                    normal: {
                                        show: false,
                                    },
                                },
                                itemStyle: {
                                    normal: {
                                        color: "transparent",
                                    },
                                },
                            },
                        ],
                    },
                    {
                        name: "",
                        type: "gauge",
                        radius: "82%",
                        center: ["50%", "50%"],
                        startAngle: 0,
                        endAngle: 355.9,
                        splitNumber: 60,
                        hoverAnimation: true,
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            length: 83,
                            lineStyle: {
                                width: 3,
                                color: "red",
                            },
                        },
                        axisLabel: {
                            show: false,
                        },
                        pointer: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                opacity: 0,
                            },
                        },
                        detail: {
                            show: false,
                        },
                        data: [
                            {
                                value: 0,
                                name: "",
                            },
                        ],
                    },
                ],
            },
        };
    },
    methods: {
        getData(){
            // new Date().format('YYYY-MM')
            productionMetricsOverview({date:'2020-01' + '-01'}).then(res=>{
                console.log(res);
                this.dataList = res.data.data
                if(!res.data.data.naturalDecline)  res.data.data.naturalDecline = 0
                this.histogram.series[0].data[0].value = res.data.data.naturalDecline
                this.histogram.series[0].data[1].value = 100 - res.data.data.naturalDecline
                this.histogram.title.text = "{a|" + res.data.data.naturalDecline + "%}{c|\n" +   "统计}"
                if(!res.data.data.overallDecline)  res.data.data.overallDecline = 0
                this.histogram2.series[0].data[0].value = res.data.data.overallDecline
                this.histogram2.series[0].data[1].value = 100 - res.data.data.overallDecline
                this.histogram2.title.text = "{a|" + res.data.data.overallDecline + "%}{c|\n" +   "统计}"
                if(!res.data.data.wholeDeclineRate)  res.data.data.wholeDeclineRate = 0
                this.histogram3.series[0].data[0].value = res.data.data.wholeDeclineRate
                this.histogram3.series[0].data[1].value = 100 - res.data.data.wholeDeclineRate
                this.histogram3.title.text = "{a|" + res.data.data.wholeDeclineRate + "%}{c|\n" +   "统计}"
            })  
        },
        //图表
        getEchartData(value, unit, valueColor, backColor, centerColor, data) {
            var option = {
                tooltip: {
                    trigger: value,
                    formatter: unit,
                },
                series: [
                    {
                        type: "pie",
                        selectedMode: "single",
                        radius: [0, "75%"],
                        color: centerColor,
                        label: {
                            fontSize: 10,
                        },
                        data: [
                            {value: 0, name: value, label: {color: "white", position: "center"}},
                            {value: 1, name: unit, label: {color: "white", position: "inner"}},
                        ],
                    },
                    {
                        type: "pie",
                        color: [valueColor, backColor],
                        radius: ["95%", "85%"],
                        labelLine: {
                            length: 30,
                        },
                        label: {
                            show: false,
                        },
                        data: [
                            {value: value, name: "Direct"},
                            {value: 100 - value, name: "Others"},
                        ],
                    },
                ],
            };
            return option;
            // option && myChart.setOption(option);
        },

        //图表
        getEchart(value, unit, valueColor, backColor, centerColor, data) {
            var option = {
                tooltip: {
                    trigger: value,
                    formatter: unit,
                },
                series: [
                    {
                        type: "pie",

                        selectedMode: "single",
                        radius: [0, "75%"],
                        color: centerColor,
                        label: {
                            fontSize: 10,
                        },
                        data: [
                            {value: 0, name: value, label: {color: "white", position: "center"}},
                            {value: 1, name: unit, label: {color: "white", position: "inner"}},
                        ],
                    },
                    {
                        type: "pie",
                        color: [valueColor, backColor, "transparent"],
                        radius: ["95%", "85%"],
                        startAngle: 180,
                        labelLine: {
                            length: 30,
                        },
                        label: {
                            show: false,
                        },
                        data: [
                            {value: value, name: "Others"},
                            {value: 100 - value, name: "Direct"},
                            {value: 100, name: "528"},
                        ],
                    },
                ],
            };
            return option;

            // option && myChart.setOption(option);
        },
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
</style>
<style lang="scss" scoped>
::v-deep .el-radio-button .el-radio-button__inner {
    padding: 10px 5px;
    border-radius: 4px 4px 4px 4px;
    width: 100%;
    background: rgba(143, 164, 204, 0.3);
    // overflow: hidden;
    // text-overflow: ellipsis;
    // white-space: nowrap;
}

.condationRow {
    height: 30px;
    line-height: 30px;
    margin-bottom: 0px;
    font-size: 14px;
}

.checkBtn {
    width: 100px;
    height: 20px;
    text-align: center;
    background: #387dff;
}

.about1 {
    background: #103986;
    background: rgb(2, 43, 117);
}

.about {
    width: 100px;
    height: 20px;
    text-align: center;
    background: #103986;
    background: rgba(56, 125, 255, 0.5);
}

.noCheckBtn {
    width: 100px;
    height: 20px;
    text-align: center;
    background: rgba(143, 164, 204, 0.3);
}

::v-deep .editInput {
    width: 100%;
}

::v-deep .title_1 {
    display: inline-block;
    text-align: center;
}

::v-deep .checkButton {
    width: 100%;
    margin-top: 5px;
}

::v-deep .el-radio-button:last-child .el-radio-button__inner {
    border-radius: 0 0px 0px 0;
    font-size: 14px;
}

::v-deep .cardLeft {
    height: 40px;
    width: 100%;
}

.el-card {
    border-image: linear-gradient(90deg, rgba(116, 190, 243, 0), rgba(75, 241, 255, 0.5), rgba(116, 190, 243, 0)) 1 1;
    color: #00d6ea;
    font-weight: bold;
    background: rgba(143, 164, 204, 0.16);

    ::v-deep .el-card__body {
        padding: 0;
        line-height: 40px;
        text-align: center;
    }
}

::v-deep .screenBtn {
    height: 30px;
    margin-left: 10px;
}

::v-deep .el-radio-group .el-radio-button {
    width: 100%;
    border: none;
}

//选中颜色
::v-deep .test .el-radio-group .el-radio-button.is-active {
    width: 100%;
    background: #387dff;
}

.my-5 {
    & > *:not(span) {
        margin-right: 10px;
    }

    & > span {
        margin-right: 4px;
    }
}

::v-deep .el-table thead.is-group th {
    background: transparent;
}

.yield {
    height: 111px;
    border: 1px solid rgb(32, 112, 224);
    border-radius: 5px;
    text-align: center;

    .box {
        margin-top: 40px;
    }
}

.water {
    background-color: rgb(36, 176, 239);
}

.oil {
    background-color: rgb(25, 120, 227);
}

.gas {
    background-color: rgb(148, 56, 244);
}

.liquid {
    background-color: rgb(24, 121, 228);
}

.text {
    margin-top: 10px;
    height: 42px;
    border: 1px solid rgb(32, 112, 224);
    text-align: center;
    line-height: 42px;
    box-shadow: 0px 0px 15px #66ffff inset;
}

.chart {
    // margin-top: 10px;
    height: 120px !important;
    border-radius: 5px;
    text-align: center;
    line-height: 120px;
}

.chartText {
    margin-top: 10px;
    height: 42px;
    border: 1px solid rgb(32, 112, 224);
    text-align: center;
    line-height: 42px;
    box-shadow: 0px 0px 15px #66ffff inset;
}

.detailLinkBtn {
    position: absolute;
    right: 50px;
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
