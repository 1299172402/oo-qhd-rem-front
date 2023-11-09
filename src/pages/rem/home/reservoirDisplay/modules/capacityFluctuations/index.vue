<template>
    <div class="app-container" style="height: 100%">
        <info-window
            info-width="100%"
            info-height="100%"
            header-title="产能波动"
            :is-show-max-btn="true"
        >
            <el-button type="primary" class="buttonActive_primary detailLinkBtn" @click="linkroute('StatisticalTableProduction')">详情</el-button>
            <el-button type="primary" class="buttonActive_primary detailLinkBtn"  style="right:110px"  @click="downEcharts">下载</el-button>
            <Echart ref="echartChart" :chart-data="histogram" height="100%"></Echart>
        </info-window>
    </div>
</template>
<script>
import Echart from "@/components/tools/Echarts/index.vue";
import {getYieldFluctuation} from "@/api/rem/reservoirbillboards.js"
import verticalSwitchButton from "@/components/intelligentOilfield/vertical-switch-button/index.vue";
import {LineChart} from "echarts/charts";
import * as echarts from "echarts/core";
import {GridComponent, TooltipComponent, LegendComponent} from "echarts/components";
import {CanvasRenderer} from "echarts/renderers";
import {
    outputTracingAnalysis,
} from "@/api/oilDeposit/rem-02/outputmanagement.js";
echarts.use([GridComponent, LegendComponent, TooltipComponent, LineChart, CanvasRenderer]);
export default {
    props: ["infodata"],
    components: {
        Echart,
    },
    data() {
        return {
            histogram: {
                textStyle: {
                    fontSize: 10,
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                    },
                },
                grid: {
                    top: '10%',
                    left: '12%',
                    right: 10,
                    bottom: 50,
                },
                dataZoom: {
                    start: 0,
                    type: "inside",
                },
                xAxis: {
                    nameTextStyle: {
                        color: "#a9a8a8",
                        padding: [0, 0, -10, 0],
                        fontSize: 14,
                    },
                    axisLabel: {
                        color: "#a9a8a8",
                        fontWeight: 400,
                        fontSize: 16,
                        interval:0
                    },
                    axisTick: {
                        show:true,
                        inside: true
                    },
                    splitLine: {
                        show: false,
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#a9a8a8",
                            width: 1,
                            type: "line",
                        },
                        show: true,
                    },
                    data: [],
                    type: "category",
                },
                yAxis: {
                    name: "变化井数(口)",
                    type: "value",
                    min:0,
                    max:100,
                    nameTextStyle: {
                        color: "#a9a8a8",
                        fontSize: 12,
                    },
                    axisLabel: {
                        margin: 20,
                        color: "#a9a8a8",
                        fontSize: 16,
                    },
                    axisTick: {
                        show:true,
                        inside: true
                    },
                    splitLine: {
                        show: false,
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#a9a8a8",
                            width: 1,
                            type: "line",
                        },
                        show: true,
                    },
                },
                series: [
                    {
                        data: [],
                        type: "bar",
                        barMaxWidth: "auto",
                        barWidth: 28,
                        itemStyle: {
                            color: {
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                type: "linear",
                                global: false,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: "rgb(0,243,199)",
                                    },
                                    {
                                        offset: 1,
                                        color: "rgb(7,121,64)",
                                    },
                                ],
                            },
                        },
                        // label: {
                        //   show: true,
                        //   position: "top",
                        //   distance: 10,
                        //   color: "#fff",
                        //   position: [30, 10],
                        // },
                    },
                ],
            },
            prodDate:'',
            prodDateCompare:'',
        };
    },
    mounted() {
        this.getinfo()
    },
    methods: {
        linkroute(rname) {
            this.$router.push({name: rname,query:{prodDate:this.prodDate,prodDateCompare:this.prodDateCompare,page:'reservoirDisplay/oilexhibition'}});
        },
        downEcharts(){
            this.$refs.echartChart.chartDownLoad( '产能波动');
        },
        getinfo() {
           let date = [new Date().addDays(-30).format("yyyy-MM-dd"), new Date().addDays(-1).format("yyyy-MM-dd")];
            let data =  {
                beginDate: date[0],
                endDate: date[1],
            fieldId: "3FC9A818F5BC43B88270DB80BBB3018F",
            outputUnit: "m",
            wellId: "3FC9A818F5BC43B88270DB80BBB3018F",
            }
            outputTracingAnalysis(data).then((res)=>{
                let yesterdayStr = res.data.data.chart.linearDataSets[0].linearData[res.data.data.chart.linearDataSets[0].linearData.length - 1].label
                var dd = new Date(yesterdayStr);
                dd.setDate(dd.getDate()  -1);
                var y = dd.getFullYear();
                var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
                var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
                console.log()
                let pormps = {
                    ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
                    platId: "",
                    prodDate: y + "-" + m + "-" + d,
                    prodDateCompare: yesterdayStr
                }
                getYieldFluctuation(pormps).then((res) => {
                    this.histogram.yAxis.min = null
                    this.histogram.yAxis.max = null
                    var previousDay = new Date(res.data.data.maxProdDate);
                    var previousDayTimestamp = previousDay.getTime() - (24 * 60 * 60 * 1000);
                    previousDay.setTime(previousDayTimestamp);
                    this.prodDateCompare = res.data.data.maxProdDate
                    this.prodDate = previousDay.format("yyyy-MM-dd")
                    res.data.data.xdata.forEach((item) => {
                        if(item.indexOf('以上')!=-1){
                            this.histogram.xAxis.data.push(item.replace(/以上/,'(m³)以上'))
                        }else{
                            this.histogram.xAxis.data.push(item+'(m³)')
                        }
                    });
                    res.data.data.ydata.forEach((item) => {
                        this.histogram.series[0].data.push(item)
                    });
                })
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
