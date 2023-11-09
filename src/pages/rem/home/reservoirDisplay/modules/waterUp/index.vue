<template>
    <div style="font-size: 20px" class="g-w100 g-h100">
        <info-window
            info-width="100%"
            info-height="100%"
            header-title="含水上升率"
            :is-show-max-btn="true"
        >
            <el-button  type="primary" class="detailLinkBtn" @click="linkroute('/developStatus/developmentEffectEvaluation')">详情</el-button>
            <el-button  type="primary" class="detailLinkBtn" style="right:110px" @click="downEcharts">下载</el-button>
            <Echart ref="echartChart" :chart-data="rateOfWaterCutRise" width="100%" height="100%"></Echart>
        </info-window>
    </div>
</template>
<script>
import Echart from "@/components/tools/Echarts/index.vue";
import * as echarts from "echarts";
import {waterContainRaiseChart} from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";

//前端细节区分
var tip = {
    tofiexd: 2, //y轴刻度保留2位数小数
    unit: "%", //y轴刻度单位
};
var type = "line_auto_up_down";
export default {
    props: ["infodata"],
    components: {
        Echart,
    },
    data() {
        return {
            rateOfWaterCutRise: {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                    },
                },
                dataZoom: {
                    start: 0,
                    type: "inside",
                },
                grid: {
                    top: "15%",
                    left: "3%",
                    right: "10%",
                    bottom: "12%",
                    containLabel: true,
                },
                legend: {
                    data: [],
                    bottom: "bottom",
                    textStyle: {
                        color: "",
                    },
                },
                xAxis: {
                    name: "含水率(%)",
                    nameTextStyle: {
                        color: "#8FA4CC",
                    },
                    //min:90,
                    type: "value",
                    axisLabel: {
                        color: "#8FA4CC",
                    },
                    axisTick: {
                        show:true,
                        inside: true
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(143,164,204,.5)'
                        },
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: 'rgba(143,164,204,.5)'
                        },
                    },
                },
                yAxis: {
                    name: "含水上升率(%)",
                    nameTextStyle: {
                        color: "#a9a8a8",
                        // padding: [0, 0, 0, 0], // 上、右、下、左
                    },
                    max: 100,
                    min: 0,
                    type: "value",
                    axisLabel: {
                        color: "#8FA4CC",
                    },
                    axisTick: {
                        show:true,
                        inside: true
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(143,164,204,.5)'
                        },
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: 'rgba(143,164,204,.5)'
                        },
                    },
                },
                color: ["#24DEFF", "#00FFD4", "#387DFF", "#E9D456", "#CD3D00", "#8635FF"],
                series: [],
            },

        };
    },
    mounted() {
        this.getWaterContainRaiseChart()
    },
    methods: {
        linkroute(name) {
            this.$router.push({
                path: name,
                query: {link: 'water', page: '/reservoirDisplay/oilexhibition'}
            });
        },
        downEcharts() {
            this.$refs.echartChart.chartDownLoad('含水上升');
        },
        //含水上升率
        getWaterContainRaiseChart(oilFieldId, fieldId) {
            let request = {
                oilFieldId: '3FC9A818F5BC43B88270DB80BBB3018F',
                fieldId: '3FC9A818F5BC43B88270DB80BBB3018F',
            };
            waterContainRaiseChart(request).then((res) => {
                if (res.data.code == 200) {
                    let legendData = [];
                    let seriesData = [];
                    let lineCharts = res.data.data.chart.lineChartDataSets;
                    lineCharts.forEach((item, index) => {
                        legendData.push(item.label);
                        seriesData.push(this.waterContainRaiseLine(item));
                    });
                    this.rateOfWaterCutRise.yAxis.min = null;
                    this.rateOfWaterCutRise.yAxis.max = null;
                    this.rateOfWaterCutRise.legend.data = legendData;
                    this.rateOfWaterCutRise.series = seriesData;
                }
            });
        },
        waterContainRaiseLine(lineChart) {
            let series = {};
            series.type = "line";
            series.smooth = true;
            series.name = lineChart.label;
            series.symbol = "none";
            if (lineChart.label == "含水上升率") {
                series.type = "scatter";
                series.symbol = "circle";
                series.symbolSize = 8;
            }
            let seriesData = [];
            let lineData = lineChart.numberPoints;
            lineData.forEach((item, index) => {
                let point = [];
                point.push(item.x);
                point.push(item.y);
                seriesData.push(point);
            });
            //seriesData.sort();
            series.data = seriesData;
            return series;
        },

    },
    computed: {
        getGlobeTheme(val) {
            return this.$store.state.setting.mode;
        },
    },
    watch: {
        getGlobeTheme: {
            handler(Nval) {
                if (Nval == "dark") {
                    this.rateOfWaterCutRise.legend.textStyle.color = "#fff";
                } else {
                    this.rateOfWaterCutRise.legend.textStyle.color = "#000000";
                }
            },
            deep: true,
            immediate:true
        },
    },
};
</script>
<style lang="scss" scoped>
.detailLinkBtn {
position: absolute;
    right: 45px;
    top: 10px;
    width: 50px;
    line-height: 20px;
    padding: 0 !important;
    height: 20px !important;
    font-size: smaller !important;
    text-align: center !important;
}
</style>
