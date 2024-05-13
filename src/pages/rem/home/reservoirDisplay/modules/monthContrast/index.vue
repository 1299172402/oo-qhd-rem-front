<template>
    <div class="app-container" style="width: 100%; height: 100%">
        
        <info-window
            info-width="100%"
            info-height="100%"
            header-title="月度产量完成情况"
            :is-show-max-btn="true"
        >
            <el-button type="primary" class="buttonActive_primary detailLinkBtn" @click="linkroute('AnnualPlan')">详情</el-button>
            <el-button type="primary" class="buttonActive_primary detailLinkBtn" style="right:110px"  @click="downEcharts">下载</el-button>
            <el-select v-model="proPlanTypeCode" @change="choicecode" style="position: absolute;top:8%;z-index: 10">
                <el-option
                    v-for="(item, index) in codelist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
            <Echart ref="echartChart" :chart-data="histogram" style="height: 100%"></Echart>
        </info-window>
    </div>
</template>
<script>
import Echart from "@/components/tools/Echarts/index.vue";
import * as echarts from "echarts/core";
import {monthlyProductionComparison,getAllProductionPlanTypes,getProductionDataByPlanType} from "@/api/rem/reservoirbillboards";
export default {
    props: ["infodata"],
    components: {
        Echart,
    },
    data() {
        return {
            xAxisData: [],
            histogram: {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                    },
                },
                legend: {
                    bottom: "bottom",
                    padding: [5, 100],
                    icon: "rect",
                    itemWidth: 12,
                    itemHeight: 10,
                    itemGap: 40,
                    data: ["分公司考核-月度计划产量", "分公司考核-月度实际产量"],
                    textStyle: {
                        color: "#a9a8a8",
                        fontSize: 14,
                    },
                },
                dataZoom: {
                    start: 1,
                    type: "inside",
                },
                grid: {
                    top: '15%',
                    left: '5%',
                    right: 10,
                    bottom: 50,
                },
                xAxis: [
                    {
                        type: "category",
                        data: [],
                        axisLabel: {
                            color: "#a9a8a8",
                            fontSize: 14,
                        },
                        axisTick: {
                            show:true,
                            inside: true
                        },
                        label: {
                            interval: 0,
                            rotate: 40,
                        },
                        axisLine: {
                            lineStyle: {
                                //color: '#979797'
                                color: "#a9a8a8",
                            },
                        },
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        name: "月产油(10⁴m³)",
                        min: 0,
                        max: 100,
                        axisLabel: {
                            color: "#a9a8a8",
                            fontSize: 14,
                        },
                        axisTick: {
                            show:true,
                            inside: true
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#a9a8a8",
                            },
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: "rgba(255,255,255,.16)",
                            },
                        },
                    },
                ],
                series: [
                    {
                        name: "分公司考核-月度计划产量",
                        type: "bar",
                        barWidth: "12",
                        data: [0],
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: "#00D9EA",
                                },
                                {
                                    offset: 1,
                                    color: "#0F65EA",
                                },
                            ]),
                        },
                    },
                    {
                        name: "分公司考核-月度实际产量",
                        type: "bar",
                        barWidth: "12",
                        data: [0],
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: "#F5BE43",
                                },
                                {
                                    offset: 1,
                                    color: "#FF7135",
                                },
                            ]),
                        },
                    },
                ],
            },
            proPlanTypeCode:'',
            codelist:[]
        };

    },
   async mounted() {
       await getAllProductionPlanTypes().then((res)=>{
            this.codelist = res.data.data
            this.proPlanTypeCode = this.codelist[0].value
        })
     await   this.getinfo();
    },
    methods: {
        linkroute(rname) {
            this.$router.push({name: rname,query: {page:'Oilexhibition'}});
        },
        downEcharts(){
            this.$refs.echartChart.chartDownLoad( '油田月度产量对比');
        },
        choicecode(){
            getProductionDataByPlanType({'ogfId':'3FC9A818F5BC43B88270DB80BBB3018F','proPlanTypeCode':this.proPlanTypeCode}).then(res => {
                let data = res.data.data
                this.histogram.series[0].data = data.map(item => {
                    return Number(item.allocProdMonthly / 10000).toFixed(4)
                })
              let text = ''
                  this.codelist.forEach((item)=>{
                if(this.proPlanTypeCode ==item.value){
                  text =  item.label
                }
              })
              this.histogram.legend.data = [text+'-月度计划产量','月度实际产量']
              this.histogram.series[0].name = text+'-月度计划产量',
                  this.histogram.series[1].name ='月度实际产量',
              this.histogram.legend  = abc
              // console.log(this.histogram.legend)
             
              // var myChart = echarts.init(this.$refs.echartChart);
              // // console.log(this.histogram.legend)
              // myChart.resize()
              
            })
        },
        getinfo() {
            monthlyProductionComparison({'ogfId':'3FC9A818F5BC43B88270DB80BBB3018F','proPlanTypeCode':this.proPlanTypeCode}).then(res => {
                this.histogram.yAxis[0].min = null
                this.histogram.yAxis[0].max = null
                this.histogram.series[0].data = res.data.data.monthlyPlannedOutputVo.map(item => {
                    return Number(item.allocProdMonthly / 10000).toFixed(4)
                })
                this.histogram.series[1].data = res.data.data.monthlyActualOutputVoList.map(item => {
                    return Number(item.checkedProdMonthly / 10000).toFixed(4)
                })
                this.xAxisData = [];
                res.data.data.monthlyPlannedOutputVo.map(item => {
                    return this.xAxisData.push(item.yearMonthesG)
                })
                this.histogram.xAxis[0].data = this.xAxisData;
            })
        }
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
                if (Nval == "dark") {
                    this.histogram.legend.textStyle.color = "#ffffff";
                } else {
                    this.histogram.legend.textStyle.color = "#000000";
                }
            },
            deep: true,
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
    line-height: 22px;
    padding: 0 !important;
    height: 20px !important;
    font-size: smaller !important;
    text-align: center !important;
}
</style>
