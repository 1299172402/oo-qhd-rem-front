<template>
    <div class="app-container" style="width: 100%; height: 100%">
        <info-window
            info-width="100%"
            info-height="100%"
            header-title="产量构成详情"
            :is-show-max-btn="true"
        >
            <el-button class="buttonActive_primary detailLinkBtn"  type="primary" @click="linkroute">详细</el-button>
            <el-button class="buttonActive_primary detailLinkBtn"  type="primary"  style="right:110px"  @click="downEcharts">下载</el-button>
            <Echart ref="echartChart" :chart-data="histogram" width="100%" height="100%"></Echart>
        </info-window>
    </div>
</template>
<script>
import Echart from "@/components/tools/Echarts/index.vue";
import {LineChart} from "echarts/charts";
import * as echarts from "echarts/core";
import {GridComponent, TooltipComponent, LegendComponent} from "echarts/components";
import {CanvasRenderer} from "echarts/renderers";
import {queryCapacityComposition} from "@/api/rem/reservoirbillboards";
echarts.use([GridComponent, LegendComponent, TooltipComponent, LineChart, CanvasRenderer]);
export default {
    props: ["infodata"],
    components: {
        Echart,
    },
    data() {
        return {
            histogram: {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                    },
                },
                legend: {
                    data: ["当年累计产量", "滚动预测", "分公司奋斗", "分公司考核"],
                    bottom: 'bottom',
                    textStyle: {
                        color: "",
                    },
                    itemWidth: 10,
                    itemHeight: 10,
                    itemGap: 35,
                },
                dataZoom: {
                    start: 5,
                    type: "inside",
                },
                grid: {
                    left: "5%",
                    right: "4%",
                    bottom: "8%",
                    top: '10%',
                    containLabel: true,
                },
                xAxis: [
                    {
                        type: "category",
                        data: ["基础井", "措施井", "调整井", "开发井"],
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#a9a8a8",
                                width: 1,
                                type: "solid",
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#a9a8a8",
                            },
                        },
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        name: '当年累产油量(10⁴m³)',
                        nameLocation: "center",
                        nameTextStyle: {
                            padding: [0, 0, 20, 0], // 上、右、下、左
                        },
                        axisLabel: {
                            formatter: "{value} ",
                            color:'#a9a8a8'
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#a9a8a8'
                            }
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: "#a9a8a8",
                            },
                        },
                    },
                ],
                series: [
                    {
                        name: "当年累计产量",
                        type: "bar",
                        data: [],
                        barWidth: 10, //柱子宽度
                        barGap: 1, //柱子之间间距
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: "rgb(3,189,234)",
                                    },
                                    {
                                        offset: 1,
                                        color: "rgb(14,105,233)",
                                    },
                                ]),
                                opacity: 1,
                            },
                        },
                    },
                    {
                        name: "滚动预测",
                        type: "bar",
                        data: [],
                        barWidth: 10,
                        barGap: 1,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: "rgb(0,248,204)",
                                    },
                                    {
                                        offset: 1,
                                        color: "rgb(7,122,64)",
                                    },
                                ]),
                                opacity: 1,
                            },
                        },
                    },
                    {
                        name: "分公司奋斗",
                        type: "bar",
                        data: [],
                        barWidth: 10,
                        barGap: 1,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: "rgb(255,199,87)",
                                    },
                                    {
                                        offset: 1,
                                        color: "rgb(255,114,53)",
                                    },
                                ]),
                                opacity: 1,
                            },
                        },
                    },

                    {
                        name: "分公司考核",
                        type: "bar",
                        data: [],
                        barWidth: 10,
                        barGap: 1,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: "rgb(199,59,0)",
                                    },
                                    {
                                        offset: 1,
                                        color: "rgb(177,35,0)",
                                    },
                                ]),
                                opacity: 1,
                            },
                        },
                    },
                ],
            },
        };
    },
    mounted() {
        if (this.$store.state.setting.mode == "dark") {
            this.histogram.legend.textStyle.color = "#fff";
        } else {
            this.histogram.legend.textStyle.color = "#000000";
        }
        this.getinfo()
    },
    methods: {
        getinfo(){
            let info = {
                ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
            }
            queryCapacityComposition(info).then((res)=>{
                let arr = res.data.data
                arr.map((n)=>{
                    this.histogram.series[0].data.push(Number((n.yearLc/10000).toFixed(2)))
                    this.histogram.series[1].data.push(Number((n.gdyc/10000).toFixed(2)))
                    this.histogram.series[2].data.push(Number((n.fgsfd/10000).toFixed(2)))
                    this.histogram.series[3].data.push(Number((n.fgskh/10000).toFixed(2)))
                })
            })
        },
        downEcharts(){
            this.$refs.echartChart.chartDownLoad( '产量构成详情');
        },
        linkroute() {
            this.$router.push({
                path: "/plan/annualPlan",query: {page: '/reservoirDisplay/oilexhibition'}
            });
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
                    this.histogram.legend.textStyle.color = "#fff";
                } else {
                    this.histogram.legend.textStyle.color = "#000000";
                }
            },
            deep: true,
            immediate:true
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
