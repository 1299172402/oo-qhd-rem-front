<!-- 递减类 -->
<template>
    <div class="z-main">
        <div class="rowBox">
            <div class="row" style="margin-right:20px;">
                <!-- <pagePanel headerTitle="自然递减率" style="height: 380px;margin-top:0;" show-btn></pagePanel> -->
                <info-window infoWidth="100%" infoHeight="380px" headerTitle="自然递减率" isShowMaxBtn>
                    <Echart :chart-data="naturalDeclineRate" style="height: 100%"></Echart>
                </info-window>
            </div>
            <div class="row" style="margin-right:20px;">
                <info-window infoWidth="100%" infoHeight="380px" headerTitle="综合递减率" isShowMaxBtn>
                    <Echart :chart-data="comprehensiveDeclineRate" style="height: 100%"></Echart>
                </info-window>
            </div>
        </div>
        <div class="rowBox" style="margin-top:20px;">
            <div class="row" style="margin-right:20px;">
                <info-window infoWidth="100%" infoHeight="380px" headerTitle="总递减率" isShowMaxBtn>
                    <Echart :chart-data="totalDeclineRate" style="height: 100%"></Echart>
                </info-window>
            </div>
            <div class="row" style="margin-right:20px;">
                <info-window infoWidth="100%" infoHeight="380px" headerTitle="产量标定法" isShowMaxBtn>
                    <Echart :chart-data="yieldCalibrationMethod" style="height: 100%"></Echart>
                </info-window>
            </div>
        </div>
        <div class="rowBox" style="margin-top:20px;">
            <div class="row" style="margin-right:20px;">
                <info-window infoWidth="100%" infoHeight="380px" headerTitle="指标评价结果表" isShowMaxBtn>
                    <el-table :data="tableData" highlight height="100%">
                        <el-table-column prop="indicatorName" label="指标" align="center"></el-table-column>
                        <el-table-column prop="evaluationResult" label="评价结果" align="center"></el-table-column>
                        <el-table-column prop="lastPhaseValue" label="上阶段值" align="center"></el-table-column>
                        <el-table-column prop="diffLastPhaseValue" label="与上阶段对比差值" align="center"></el-table-column>
                        <el-table-column prop="result" label="结论" align="center"></el-table-column>
                    </el-table>
                </info-window>
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
                        start: 95,
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
                                iconStyle:{
                                    opacity:0
                                }
                            },
                        },
                    },
                    xAxis: {
                        type: "category",
                        axisLabel: {
                            color: "#8FA4CC",
                            margin: 20,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            },
                        },
                    },
                    yAxis: {
                        name: "自然递减率(%)",
                        nameLocation: "center",
                        nameTextStyle: {
                            color: "#8FA4CC",
                        },
                        nameGap: 35,
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
                    series: {
                        data: [],
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
                        start: 95,
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
                                iconStyle:{
                                    opacity:0
                                }
                            },
                        },
                    },
                    xAxis: {    
                        type: "category",
                        axisLabel: {
                            margin: 20,
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            },
                        },
                    },
                    yAxis: {
                        name: "综合递减率(%)",
                        nameLocation: "center",
                        nameTextStyle: {
                            color: "#8FA4CC",
                        },
                        nameGap: 35,
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
                    series: [{
                        data: [],
                        type: "line",//scatter
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
                //总递减率
                totalDeclineRate: {
                    dataZoom: [
                        {
                            type: "inside",
                            xAxisIndex: [0],
                            start: 0, //滚动条开始位置（共100等份）
                            end: 100, //滚动条结束位置
                        },
                    ],
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
                                iconStyle:{
                                    opacity:0
                                }
                            },
                        },
                    },
                    xAxis: {
                        type: "category",
                        axisLabel: {
                            margin: 20,
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            },
                        },
                    },
                    yAxis: {
                        name: "总递减率(%)",
                        nameLocation: "center",
                        nameTextStyle: {
                            color: "#8FA4CC",
                        },
                        nameGap: 35,
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
                    series: [{
                        data: [],
                        type: "line",
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
                    dataZoom: [
                        {
                            type: "inside",
                            xAxisIndex: [0],
                            start: 0, //滚动条开始位置（共100等份）
                            end: 100, //滚动条结束位置
                        },
                    ],
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
                                iconStyle:{
                                    opacity:0
                                }
                            },
                        },
                    },
                    xAxis: {
                        type: "category",
                        axisLabel: {
                            margin: 20,
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
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
                    series: [{
                        data: [],
                        type: "line",
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
                        let lineChart = res.data.data.chart?.linearDataSets[0].linearData || [];
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
                        seriesData.sort()
                        this.totalDeclineRate.series[0].data = seriesData;
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
        padding-top:8px;
        padding-bottom: 8px;
        .rowBox {
            padding-left:8px;
            display: flex;
            align-items: center;
            .row {
                flex: 1;
                width:0;
            }
        }
    }
</style>
