<!-- 递减类 -->
<template>
    <div class="z-main">
        <div class="rowBox">
            <div class="row" style="margin-right:20px;">
                <pagePanel headerTitle="自然递减率" style="height: 380px;margin-top:0;" show-btn>
                    <Echart :chart-data="naturalDeclineRate" style="height: 100%"></Echart>
                </pagePanel>
            </div>
            <div class="row" style="margin-right:20px;">
                <pagePanel headerTitle="综合递减率" style="height: 380px;margin-top:0;" show-btn>
                    <Echart :chart-data="comprehensiveDeclineRate" style="height: 100%"></Echart>
                </pagePanel>
            </div>
        </div>
        <div class="rowBox">
            <div class="row" style="margin-right:20px;">
                <pagePanel headerTitle="总递减率" style="width: 100%; height: 380px" show-btn>
                    <Echart :chart-data="totalDeclineRate" style="height: 100%"></Echart>
                </pagePanel>
            </div>
            <div class="row" style="margin-right:20px;">
                <pagePanel headerTitle="产量标定法" style="width: 100%; height: 380px" show-btn>
                    <Echart :chart-data="yieldCalibrationMethod" style="height: 100%"></Echart>
                </pagePanel>
            </div>
        </div>
        <div class="rowBox">
            <div class="row" style="margin-right:20px;">
                <pagePanel headerTitle="指标评价结果表" style="height: 380px" show-btn>
                    <el-table :data="tableData" highlight height="100%">
                        <el-table-column prop="indicatorName" label="指标" align="center"></el-table-column>
                        <el-table-column prop="evaluationResult" label="评价结果" align="center"></el-table-column>
                        <el-table-column prop="lastPhaseValue" label="上阶段值" align="center"></el-table-column>
                        <el-table-column prop="diffLastPhaseValue" label="与上阶段对比差值" align="center"></el-table-column>
                        <el-table-column prop="result" label="结论" align="center"></el-table-column>
                    </el-table>
                </pagePanel>
            </div>
            <div class="row" style="margin-right:20px;"></div>
        </div>
    </div>
</template>

<script>
    import * as echarts from "echarts";
    import Echart from "@/components/tools/Echarts/index.vue";
    import { fetchFields, fetchOilFields } from "@/api/oilDeposit/rem-02/primaryinfo";
    import { natureDeclineChart,composiveDeclineChart,targetChart,declineIndicatorEveluationResult,generalDeclineChart } from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
    export default {
        components: {
            Echart
        },
        props: {
            selectOilField: {
                type: String,
                default:"",
            },
            selectBlock: {
                type: String,
                default:"",
            },
        },
        data() {
            return {
                //查询参数
                queryParams: {},
                page: 1,
                pageSize: 10,
                //自然递减率
                naturalDeclineRate: {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                    dataZoom: {
                        start: 80,
                        type: "inside",
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                name: "自然递减率",
                                pixelRatio: 15,
                                //值越大分辨率越高,下载的图片越清晰
                                backgroundColor: "#022644",
                            },
                        },
                    },
                    xAxis: {
                        type: "category",
                        /*data: [
                      "2009",
                      "2010",
                      "2011",
                      "2012",
                      "2013",
                      "2014",
                      "2015",
                      "2016",
                      "2017",
                      "2018",
                      "2019",
                      "2020",
                    ],*/
                        axisLabel: {
                            color: "#8FA4CC",
                            margin: 20,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                //color: '#979797'
                                color: "rgba(255,255,255,.16)",
                            },
                        },
                    },
                    yAxis: {
                        name: "自然递减率(%)",
                        nameTextStyle: {
                            color: "#8FA4CC"
                        },
                        type: "value",
                        axisLabel: {
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#35546d",
                            },
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "#35546d",
                            },
                        },
                    },
                    series: {
                        data: [
                        /*-50, -10, -20, 10, -5, -10, -10, -5, 5, 10, -20, -5*/
                        ],
                        type: "bar",
                        label: {
                            show: true,
                        },
                    },
                },
                //综合递减率
                comprehensiveDeclineRate: {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                    dataZoom: {
                        start: 80,
                        type: "inside",
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                name: "综合递减率",
                                pixelRatio: 15,
                                //值越大分辨率越高,下载的图片越清晰
                                backgroundColor: "#022644",
                            },
                        },
                    },
                    xAxis: {
                        type: "category",
                        /*data: [
                      "2009",
                      "2010",
                      "2011",
                      "2012",
                      "2013",
                      "2014",
                      "2015",
                      "2016",
                      "2017",
                      "2018",
                      "2019",
                      "2020",
                    ],*/
                        axisLabel: {
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                //color: '#979797'
                                color: "rgba(255,255,255,.16)",
                            },
                        },
                    },
                    yAxis: {
                        name: "综合递减率(%)",
                        nameTextStyle: {
                            color: "#8FA4CC"
                        },
                        type: "value",
                        axisLabel: {
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#35546d",
                            },
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "#35546d",
                            },
                        },
                    },
                    series: [{
                        data: [],
                        type: "scatter",
                        barWidth: "20",
                        label: {
                            show: false,
                            position: "top",
                            color: "#00D9EA",
                        },
                        /*symbol: "none",*/
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: "#49E1F0",
                            },
                            {
                                offset: 1,
                                color: "#24DEFF",
                            },
                            ]),
                        },
                    },
                    ],
                },
                //总递减率
                totalDeclineRate: {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                name: "总递减率",
                                pixelRatio: 15,
                                //值越大分辨率越高,下载的图片越清晰
                                backgroundColor: "#022644",
                            },
                        },
                    },
                    xAxis: {
                        type: "category",
                        axisLabel: {
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,.16)",
                            },
                        },
                    },
                    yAxis: {
                        name: "总递减率(%)",
                        nameTextStyle: {
                            color: "#8FA4CC"
                        },
                        type: "value",
                        axisLabel: {
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#35546d",
                            },
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "#35546d",
                            },
                        },
                    },
                    series: [{
                        data: [],
                        type: "scatter",
                        barWidth: "20",
                        label: {
                            show: false,
                            position: "top",
                            color: "#00D9EA",
                        },
                        /* symbol: "circle",*/
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: "#49E1F0",
                            },
                            {
                                offset: 1,
                                color: "#24DEFF",
                            },
                            ]),
                        },
                    },
                    ],
                },
                //产量标定法
                yieldCalibrationMethod: {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                name: "产量标定法",
                                pixelRatio: 15,
                                //值越大分辨率越高,下载的图片越清晰
                                backgroundColor: "#022644",
                            },
                        },
                    },
                    xAxis: {
                        type: "category",
                        axisLabel: {
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                //color: '#979797'
                                color: "rgba(255,255,255,.16)",
                            },
                        },
                    },
                    yAxis: {
                        type: "value",
                        axisLabel: {
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#35546d",
                            },
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "#35546d",
                            },
                        },
                    },
                    series: [{
                        data: [],
                        type: "scatter",
                        barWidth: "20",
                        label: {
                            show: false,
                            position: "top",
                            color: "#00D9EA",
                        },
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: "#49E1F0",
                            },
                            {
                                offset: 1,
                                color: "#24DEFF",
                            },
                            ]),
                        },
                    },
                    ],
                },
                //指标评价结果表
                tableData: [],
                canDownload: false,
            };
        },
        mounted() {
            this.doSearch();
        },
        methods: {
            //设置页面初始化
            async initData() {
                this.canDownload = this.$route.params.canDownload;
                this.downPower(this.canDownload);
                this.doSearch();
            },
            //搜索方法
            doSearch() {
                this.getNatureDeclineChart(this.selectOilField, this.selectBlock);
                this.getComposiveDeclineChart(this.selectOilField, this.selectBlock);
                this.getTargetChart(this.selectOilField, this.selectBlock);
                this.getDeclineIndicatorEveluationResult(this.selectBlock);
                this.getGeneralDeclineChart(this.selectOilField, this.selectBlock);
            },
            //自然递减率
            getNatureDeclineChart(oilFieldId, fieldId) {
                let request = {
                    oilFieldId: oilFieldId,
                    fieldId: fieldId,
                };
                natureDeclineChart(request).then((res) =>{
                    if (res.data.code == 200) {
                        let seriesData = [];
                        let barChartData = res.data.data.chart.barDataSets[0].barDatas;
                        /*barChartData.forEach((item, index) => {
                      let point = [];
                      let label = item.label.split('-');
                      point.push(label[0] + '-' + label[1]);
                      point.push(item.value);
                      seriesData.push(point);
                    });*/
                        seriesData = this.getBarChartSeries(barChartData);
                        //console.log(seriesData);
                        this.naturalDeclineRate.series.data = seriesData;
                    }
                });
            },
            //柱状图
            getBarChartSeries(barChart) {
                let seriesData = [];
                for (let i = 0; i < barChart.length; i++) {
                    let barData = {};
                    //值大于等于0
                    if (barChart[i].value >= 0) {
                        barData.value = barChart[i].value;
                        let label = barChart[i].label.split("-");
                        barData.value = [label[0] + "-" + label[1], barData.value];
                        barData.name = label[0] + "-" + label[1];
                        barData.label = {
                            show: false,
                            /*normal: {
                        position: "top",
                        color: "#fff",
                        fontSize: 14,
                      },*/
                        };
                        barData.itemStyle = {
                            color: "#1379F7",
                        };
                        seriesData.push(barData);
                    } else {
                        //值小于0
                        barData.value = barChart[i].value;
                        let label = barChart[i].label.split("-");
                        barData.value = [label[0] + "-" + label[1], barData.value];
                        barData.name = label[0] + "-" + label[1];
                        barData.label = {
                            show: false,
                            /*normal: {
                        position: "bottom",
                        color: "#fff",
                        fontSize: 14,
                      },*/
                        };
                        barData.itemStyle = {
                            color: "#FF7135",
                        };
                        seriesData.push(barData);
                    }
                }
                return seriesData;
            },
            //综合递减率
            getComposiveDeclineChart(oilFieldId, fieldId) {
                let request = {
                    oilFieldId: oilFieldId,
                    fieldId: fieldId,
                };
                composiveDeclineChart(request).then((res) =>{
                    if (res.data.code == 200) {
                        let lineChart = res.data.data.chart.barDataSets[0].barDatas;
                        let seriesData = [];
                        lineChart.forEach((item, index) =>{
                            let point = [];
                            let label = item.label.split("-");
                            point.push(label[0] + "-" + label[1]);
                            point.push(item.value);
                            seriesData.push(point);
                        });
                        this.comprehensiveDeclineRate.series[0].data = seriesData;
                    }
                });
            },
            //产量标定法
            getTargetChart(oilFieldId, fieldId) {
                let request = {
                    oilFieldId: oilFieldId,
                    fieldId: fieldId,
                };
                targetChart(request).then((res) =>{
                    if (res.data.code == 200) {
                        let seriesData = [];
                        let lineChart = res.data.data.chart.linearDataSets[0].linearData;
                        lineChart.forEach((item, index) =>{
                            let point = [];
                            point.push(item.label);
                            point.push(item.value);
                            seriesData.push(point);
                        });
                        this.yieldCalibrationMethod.series[0].data = seriesData;
                    }
                });
            },
            //递减类-指标评价结果
            getDeclineIndicatorEveluationResult(fieldId) {
                let request = {
                    oilFieldId: fieldId,
                };
                declineIndicatorEveluationResult(request).then((res) =>{
                    if (res.data.code == 200) {
                        this.tableData = res.data.data.indicatorEvaluationResults;
                    }
                });
            },
            //总递减率折线
            getGeneralDeclineChart(oilFieldId, fieldId) {
                let request = {
                    oilFieldId: oilFieldId,
                    fieldId: fieldId,
                };
                generalDeclineChart(request).then((res) =>{
                    if (res.data.code == 200) {
                        let seriesData = [];
                        let lineData = res.data.data.chart.lineChartDataSets[0].numberPoints;
                        lineData.forEach((item, index) =>{
                            let point = [];
                            point.push(item.x);
                            point.push(item.y);
                            seriesData.push(point);
                        });
                        this.totalDeclineRate.series[0].data = seriesData.sort();
                    }
                });
            },
            //下载echarts 隐藏 显示
            downPower(flag) {
                this.naturalDeclineRate.toolbox.show = flag;
                this.comprehensiveDeclineRate.toolbox.show = flag;
                this.totalDeclineRate.toolbox.show = flag;
                this.yieldCalibrationMethod.toolbox.show = flag;
            },
        },
    };
</script>

<style lang="scss" scoped>
    .z-main {
        .rowBox {
            display: flex;
            align-items: center;
            .row {
                flex: 1;
                width:0;
            }
        }
    }
</style>
