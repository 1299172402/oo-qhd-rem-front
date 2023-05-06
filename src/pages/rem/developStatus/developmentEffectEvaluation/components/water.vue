<!-- 含水量 -->
<template>
    <div class="z-main">
        <div class="rowBox">
            <div class="row" style="margin-right: 20px">
                <pagePanel headerTitle="含水上升率" style="height: 380px; margin-top: 0" show-btn>
                    <Echart :chart-data="rateOfWaterCutRise" style="height: 100%"></Echart>
                </pagePanel>
            </div>
            <div class="row" style="margin-right: 20px">
                <pagePanel headerTitle="水驱指数" style="height: 380px; margin-top: 0" show-btn>
                    <Echart :chart-data="recoveryDegree" style="height: 100%"></Echart>
                </pagePanel>
            </div>
        </div>
        <div class="rowBox">
            <div class="row" style="margin-right: 20px">
                <pagePanel headerTitle="存水率" style="height: 380px" show-btn>
                    <Echart :chart-data="waterRate" style="height: 100%"></Echart>
                </pagePanel>
            </div>
            <!--含水类表格 -->
            <div class="row" style="margin-right: 20px">
                <pagePanel headerTitle="指标评价结果表" style="height: 380px" show-btn>
                    <el-table :data="tableData" highlight height="100%">
                        <el-table-column prop="indicatorName" label="指标" align="center"></el-table-column>
                        <el-table-column prop="evaluationResult" label="评价结果" align="center">
                            <template slot-scope="scope">
                                <span>{{
                                  (Number(scope.row.evaluationResult) - Number(scope.row.theoryValue)) | toFixNumberFour
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="lastPhaseValue" label="上阶段值" align="center">
                            <template slot-scope="scope">
                                <span>{{
                                  (Number(scope.row.evaluationResult) - Number(scope.row.theoryValue)) | toFixNumberFour
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="diffLastPhaseValue" label="与上阶段对比差值" align="center"></el-table-column>
                        <el-table-column label="理论值" align="center">
                            <template slot-scope="scope">
                                <el-input-number v-model="scope.row.theoryValue" :controls="false" class="el-input-number"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column label="与理论值对比差值" align="center">
                            <template slot-scope="scope">
                                <span>{{
                                  (Number(scope.row.evaluationResult) - Number(scope.row.theoryValue)) | toFixNumberFour
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="result" label="结论" align="center"></el-table-column>
                    </el-table>
                </pagePanel>
            </div>
        </div>
    </div>
</template>

<script>
    import Echart from "@/components/tools/Echarts/index.vue";
    import { fetchFields, fetchOilFields } from "@/api/oilDeposit/rem-02/primaryinfo";
    import { waterContainRaiseChart, waterIndicatorChart, waterSotreRateChart, indicatorResult } from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
    export default {
        components: {
            Echart,
        },
        props: {
            selectOilField: {
                type: String,
                default: "",
            },
            selectBlock: {
                type: String,
                default: "",
            },
        },
        filters: {
            toFixNumberFour(val) {
                return val.toFixed(4);
            },
        },
        data() {
            return {
                //油田
                oilField: [],
                //区块
                block: [],
                //区块选中值
                //查询参数
                queryParams: {},
                page: 1,
                pageSize: 10,
                //含水上升率
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
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                name: "含水上升率",
                                pixelRatio: 15,
                                //值越大分辨率越高,下载的图片越清晰
                                backgroundColor: "#022644",
                            },
                        },
                    },
                    legend: {
                        left: 0,
                        textStyle: {
                            color: "#24DEFF",
                        },
                        data: [
                            /*"油田1", "油田2", "Ⅰ期", "Ⅱ期", "理论曲线"*/
                        ],
                    },
                    xAxis: {
                        name: "含水率(%)",
                        nameLocation: "center",
                        nameTextStyle: {
                            color: "#8FA4CC",
                        },
                        nameGap: 25,
                        //min:90,
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
                            show: true,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            },
                        },
                    },
                    yAxis: {
                        name: "含水上升率(%)",
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
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            },
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            },
                        },
                    },
                    color: ["#24DEFF", "#00FFD4", "#387DFF", "#E9D456", "#CD3D00", "#8635FF"],
                    series: [],
                },
                //采出程度
                recoveryDegree: {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                    legend: {
                        left: 0,
                        textStyle: {
                            color: "#24DEFF",
                        },
                        data: ["累计水驱指数", "累积注采比", "月水驱指数"],
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                name: "水驱指数",
                                pixelRatio: 15,
                                //值越大分辨率越高,下载的图片越清晰
                                backgroundColor: "#022644",
                            },
                        },
                    },
                    xAxis: {
                        name: "采出程度(%)",
                        nameLocation: "center",
                        nameTextStyle: {
                            color: "#8FA4CC",
                        },
                        nameGap: 25,
                        //max: 60,
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
                            show: true,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            },
                        },
                    },
                    yAxis: [
                        {
                            name: "累计水驱指数，累积注采比(%)",
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
                                lineStyle: {
                                    color: 'rgba(143,164,204,.5)'
                                },
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(143,164,204,.5)'
                                },
                            },
                        },
                        {
                            name: "阶段水驱指数(%)",
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
                        }
                    ],
                    color: ["#24DEFF", "#00FFD4", "#387DFF", "#E9D456", "#CD3D00", "#8635FF"],
                    series: [],
                },
                //存水率
                waterRate: {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                    legend: {
                        left: 0,
                        textStyle: {
                            color: "#24DEFF",
                        },
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                name: "存水率",
                                pixelRatio: 15,
                                //值越大分辨率越高,下载的图片越清晰
                                backgroundColor: "#022644",
                            },
                        },
                    },
                    xAxis: {
                        name: "采出程度(%)",
                        nameLocation: "center",
                        nameTextStyle: {
                            color: "#8FA4CC",
                        },
                        nameGap: 25,
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
                            show: true,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            },
                        },
                    },
                    yAxis: {
                        name: "存水率(%)",
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
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            },
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(143,164,204,.5)'
                            },
                        },
                    },
                    color: ["#24DEFF", "#00FFD4", "#387DFF", "#E9D456", "#CD3D00", "#8635FF"],
                    series: [],
                },
                //指标评价结果表
                tableData: [],
                canDownload: false,
            }
        },
        mounted() {
            this.doSearch();
        },
        methods: {
            //设置页面初始化
            doSearch() {
                this.getWaterContainRaiseChart(this.selectOilField, this.selectBlock);
                this.getWaterIndicatorChart(this.selectOilField, this.selectBlock);
                this.getWaterSotreRateChart(this.selectOilField, this.selectBlock);
                this.getIndicatorResult(this.selectOilField, this.selectBlock);
            },
            //含水上升率
            getWaterContainRaiseChart(oilFieldId, fieldId) {
                let request = {
                    oilFieldId: oilFieldId,
                    fieldId: fieldId,
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
                        this.rateOfWaterCutRise.legend.data = legendData;
                        this.rateOfWaterCutRise.series = seriesData;
                    }
                });
            },
            //含水率上升折线解析
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
            //驱水指数
            getWaterIndicatorChart(oilFieldId, fieldId) {
                let request = {
                    oilFieldId: oilFieldId,
                    fieldId: fieldId,
                };
                waterIndicatorChart(request).then((res) => {
                    if (res.data.code == 200) {
                        let legendData = [];
                        let seriesData = [];
                        let lineChartS = res.data.data.chart.lineChartDataSets;
                        lineChartS.forEach((item, index) => {
                            legendData.push(item.label);
                            seriesData.push(this.waterIndicatorLine(item));
                        });
                        this.recoveryDegree.legend.data = legendData;
                        this.recoveryDegree.series = seriesData;
                    }
                });
            },
            //驱水指数折线解析
            waterIndicatorLine(lineChart) {
                let series = {};
                series.type = "line";
                series.symbol = "none";
                series.name = lineChart.label;
                let label = lineChart.label;
                if (label == "累计水驱指数" || label == "累计注采比") {
                    series.yAxisIndex = 0;
                } else if (label == "月水驱指数") {
                    series.yAxisIndex = 1;
                }
                let lineData = lineChart.numberPoints;
                let seriesData = [];
                lineData.forEach((item, index) => {
                    let point = [];
                    point.push(item.x);
                    point.push(item.y);
                    seriesData.push(point);
                });
                series.data = seriesData;
                return series;
            },
            //存水率
            getWaterSotreRateChart(oilFieldId, fieldId) {
                let request = {
                    oilFieldId: oilFieldId,
                    fieldId: fieldId,
                };
                waterSotreRateChart(request).then((res) => {
                    if (res.data.code == 200) {
                            let legendData = [];
                            let seriesData = [];
                            let lineCharts = res.data.data.chart.lineChartDataSets;
                            lineCharts.forEach((item, index) => {
                                if (item.label == "阶段存水率" || item.label == "累计存水率") {
                                    legendData.push(item.label);
                                } else {
                                    legendData.push("Rm=" + item.label);
                                }
                                seriesData.push(this.waterSotreRateLine(item));
                            });
                        this.waterRate.legend.data = legendData;
                        this.waterRate.series = seriesData;
                    }
                });
            },
            //存水率折线数据解析
            waterSotreRateLine(lineChart) {
                let series = {};
                series.type = "line";
                series.smooth = true;
                let label = lineChart.label;
                if (lineChart.label == "阶段存水率" || lineChart.label == "累计存水率") {
                    label = lineChart.label;
                } else {
                    label = "Rm=" + label;
                }
                series.name = label;
                series.symbol = "none";
                let lineData = lineChart.numberPoints;
                let seriesData = [];
                lineData.forEach((item, index) => {
                    let point = [];
                    point.push(item.x);
                    point.push(item.y);
                    seriesData.push(point);
                });
                series.data = seriesData;
                return series;
            },
            //指标评价结果
            getIndicatorResult(oilFieldId, fieldId) {
                let request = {
                    oilFieldId: oilFieldId,
                    fieldId: fieldId,
                };
                indicatorResult(request).then((res) => {
                    if (res.data.code == 200) {
                        this.tableData = res.data.data.indicatorEvaluationResults;
                    }
                });
            },
            //下载echarts 隐藏 显示
            downPower(flag) {
                this.rateOfWaterCutRise.toolbox.show = flag;
                this.recoveryDegree.toolbox.show = flag;
                this.waterRate.toolbox.show = flag;
            },
        },
    }
</script>

<style lang="scss" scoped>
    .z-main {
        padding-bottom: 8px;

        .rowBox {
            padding-left: 8px;
            display: flex;
            align-items: center;

            .row {
                flex: 1;
                width: 0;

                ::v-deep .el-input-number {
                    width: 80px;
                    height: 30px;

                    .el-input__inner {
                        height: 30px;
                    }
                }
            }
        }
    }
</style>
