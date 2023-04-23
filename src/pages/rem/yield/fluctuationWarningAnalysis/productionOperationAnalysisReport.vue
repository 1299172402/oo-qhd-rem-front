<!-- 产量运行分析报告 -->
<template>
    <div class="app-container">
        <div class="z-container">
            <pagePanelNew class="pagePanelNew">
                <div class="pagePane-container">
                    <div class="pageHeader" style="width:100%;display: flex;align-items: center;justify-content: space-between;margin-bottom:10px;margin-left: 0;">
                        <span>{{ oilFieldName }}产量分析报告</span>
                        <!-- <el-button class="fr" @click="doPicture" v-show="canDownload">下载</el-button> -->
                    </div>
                    <div class="rowBox">
                        <div class="row" style="margin-right:20px;">
                            <info-window style="margin-top:0;" infoWidth="100%" infoHeight="400px" headerTitle="" isShowMaxBtn>
                                <el-table :data="tableDataPtOne" highlight height="100%">
                                    <el-table-column prop="platformName" label="平台" align="center" min-width="20%"></el-table-column>
                                    <el-table-column prop="dayOutput" :label="'当日'+(unitType=='m'?'(m³)':'(t)')" align="center" min-width="20%">
                                        <template slot-scope="{ row }">
                                            {{ row.dayOutput | getFixNumberTwo }}
                                            <span>
                                                <svg-icon v-if="row.dayState=='UP'" icon-class="0-down-arrow" class-name="up-arrow"></svg-icon>
                                                <svg-icon v-if="row.dayState=='DOWN'" icon-class="0-down-arrow" class-name="down-arrow"></svg-icon>
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="yesterdayOutput" :label="'前日'+(unitType=='m'?'(m³)':'(t)')" align="center" min-width="20%">
                                        <template slot-scope="{ row }">
                                            {{ row.yesterdayOutput |getFixNumberTwo }}
                                            <span>
                                                <svg-icon v-if="row.yesterdayState=='UP'" icon-class="0-down-arrow" class-name="up-arrow"></svg-icon>
                                                <svg-icon v-if="row.yesterdayState=='DOWN'" icon-class="0-down-arrow" class-name="down-arrow"></svg-icon>
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="tenDaysOutput" :label="'上旬'+(unitType=='m'?'(m³)':'(t)')" align="center" min-width="20%">
                                        <template slot-scope="{ row }">
                                            {{ row.tenDaysOutput |getFixNumberTwo }}
                                            <span>
                                                <svg-icon v-if="row.tenDaysState=='UP'" icon-class="0-down-arrow" class-name="up-arrow"></svg-icon>
                                                <svg-icon v-if="row.tenDaysState=='DOWN'" icon-class="0-down-arrow" class-name="down-arrow"></svg-icon>
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="lastMonthOutput" :label="'上月'+(unitType=='m'?'(m³)':'(t)')" align="center" min-width="20%">
                                        <template slot-scope="{ row }">
                                            {{ row.lastMonthOutput |getFixNumberTwo }}
                                            <span>
                                                <svg-icon v-if="row.lastMonthState=='UP'" icon-class="0-down-arrow" class-name="up-arrow"></svg-icon>
                                                <svg-icon v-if="row.lastMonthState=='DOWN'" icon-class="0-down-arrow" class-name="down-arrow"></svg-icon>
                                            </span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </info-window>
                        </div>
                        <div class="row" style="margin-right:20px;">
                            <info-window style="margin-top:0;" infoWidth="100%" infoHeight="400px" headerTitle="" isShowMaxBtn>
                                <el-table :data="tableDataPtTwo" highlight height="100%">
                                    <el-table-column prop="platformName" label="平台" align="center" min-width="20%"></el-table-column>
                                    <el-table-column prop="dayOutput" :label="'当日'+(unitType=='m'?'(m³)':'(t)')" align="center" min-width="20%">
                                        <template slot-scope="{ row }">
                                            {{ row.dayOutput |getFixNumberTwo }}
                                            <span>
                                                <svg-icon v-if="row.dayState=='UP'" icon-class="0-down-arrow" class-name="up-arrow"></svg-icon>
                                                <svg-icon v-if="row.dayState=='DOWN'" icon-class="0-down-arrow" class-name="down-arrow"></svg-icon>
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="yesterdayOutput" :label="'前日'+(unitType=='m'?'(m³)':'(t)')" align="center" min-width="20%">
                                        <template slot-scope="{ row }">
                                            {{ row.yesterdayOutput |getFixNumberTwo }}
                                            <span>
                                                <svg-icon v-if="row.yesterdayState=='UP'" icon-class="0-down-arrow" class-name="up-arrow"></svg-icon>
                                                <svg-icon v-if="row.yesterdayState=='DOWN'" icon-class="0-down-arrow" class-name="down-arrow"></svg-icon>
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="tenDaysOutput" :label="'上旬'+(unitType=='m'?'(m³)':'(t)')" align="center" min-width="20%">
                                        <template slot-scope="{ row }">
                                            {{ row.tenDaysOutput |getFixNumberTwo }}
                                            <span>
                                                <svg-icon v-if="row.tenDaysState=='UP'" icon-class="0-down-arrow" class-name="up-arrow"></svg-icon>
                                                <svg-icon v-if="row.tenDaysState=='DOWN'" icon-class="0-down-arrow" class-name="down-arrow"></svg-icon>
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="lastMonthOutput" :label="'上月'+(unitType=='m'?'(m³)':'(t)')" align="center" min-width="20%">
                                        <template slot-scope="{ row }">
                                            {{ row.lastMonthOutput |getFixNumberTwo }}
                                            <span>
                                                <svg-icon v-if="row.lastMonthState=='UP'" icon-class="0-down-arrow" class-name="up-arrow"></svg-icon>
                                                <svg-icon v-if="row.lastMonthState=='DOWN'" icon-class="0-down-arrow" class-name="down-arrow"></svg-icon>
                                            </span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </info-window>
                        </div>
                    </div>
                    <div class="rowBox">
                        <div class="row" style="margin-right:20px;">
                            <info-window style="margin-top:0;" infoWidth="100%" infoHeight="440px" headerTitle="" isShowMaxBtn>
                                <el-table 
                                    id="tableData"
                                    :data="eventData" 
                                    :border="false"
                                    :row-style="{ height: '0px' }" 
                                    header-cell-class-name="table_header" 
                                    :cell-style="{ padding: '6px', 'text-align': 'center' }"
                                    style="width: 100%;" 
                                    height="100%" 
                                    :default-sort="{ prop: 'date', order: 'descending' }" 
                                    :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }">
                                    <el-table-column prop="" label="井号" width=""></el-table-column>
                                    <el-table-column prop="" label="日期" width=""></el-table-column>
                                    <el-table-column prop="" :label="`生产时间\n(h)`" width=""></el-table-column>
                                    <el-table-column prop="" :label="`日产液\n(m^3)`" width=""></el-table-column>
                                    <el-table-column prop="" :label="`日产气\n(10^4/m^3)`" width="130"></el-table-column>
                                    <el-table-column prop="" :label="`日产油\n(m^3)`" width=""></el-table-column>
                                    <el-table-column prop="" :label="`含水\n(%)`" width=""></el-table-column>
                                    <el-table-column prop="" :label="`日产水\n(m^3)`" width=""></el-table-column>
                                    <el-table-column prop="" :label="`气油比\n(m^3/m^3)`" width="130"></el-table-column>
                                    <el-table-column prop="" :label="`气举量\n(10^4/m^3)`" width="130"></el-table-column>
                                    <el-table-column prop="" :label="`动液面\n(m)`" width=""></el-table-column>
                                    <el-table-column prop="" :label="`泵频率\n(Hz)`" width=""></el-table-column>
                                    <el-table-column prop="" :label="`泵电流\n(A)`" width=""></el-table-column>
                                    <el-table-column prop="" :label="`油嘴\n(mm)`" width=""></el-table-column>
                                    <el-table-column prop="" :label="`油压\n(MPa)`" width=""></el-table-column>
                                    <el-table-column prop="" :label="`压差\n(MPa)`" width=""></el-table-column>
                                    <el-table-column prop="" :label="`流压\n(MPa)`" width=""></el-table-column>
                                    <el-table-column prop="" :label="`基准面流压\n(MPa)`" width="130"></el-table-column>
                                    <el-table-column prop="" :label="`回压\n(MPa)`" width=""></el-table-column>
                                    <el-table-column prop="" :label="`泵入口压力\n(MPa)`" width="130"></el-table-column>
                                    <el-table-column prop="" :label="`泵出口压力\n(MPa)`" width="130"></el-table-column>
                                    <el-table-column prop="" :label="`套压\n(MPa)`" width=""></el-table-column>
                                    <el-table-column prop="" :label="`技术套压\n(MPa)`" width=""></el-table-column>
                                    <el-table-column prop="" :label="`表层套压\n(MPa)`" width=""></el-table-column>
                                    <el-table-column prop="" :label="`马达温度\n(℃)`" width=""></el-table-column>
                                    <el-table-column prop="" :label="`井口温度\n(℃)`" width=""></el-table-column>
                                    <el-table-column prop="" :label="`流温\n(℃)`" width=""></el-table-column>
                                    <el-table-column prop="" label="备注" width=""></el-table-column>
                                </el-table>
                            </info-window>
                        </div>
                    </div>
                    <div class="rowBox">
                        <div class="row" style="margin-right:20px;">
                            <info-window style="margin-top:0;" infoWidth="100%" infoHeight="440px" headerTitle="" isShowMaxBtn>
                                <el-table :data="eventData" highlight height="100%" empty-text="当日无大事件">
                                    <el-table-column prop="eventType" label="事件类型" align="center" width="180"></el-table-column>
                                    <el-table-column prop="wellNum" label="井数" align="center" width="160"></el-table-column>
                                    <el-table-column prop="content" align="center" label="井名"></el-table-column>
                                </el-table>
                            </info-window>
                        </div>
                    </div>
                </div>
            </pagePanelNew>
        </div>
    </div>
</template>

<script>
    import * as echarts from "echarts";
    import Echart from "@/components/tools/Echarts/index.vue";
    import {outputTracingAnalysis, outputTracing, platformOutputContributeAnalysis,dailyMainEvent, wellOutputWaveAnalysis,} from "@/api/oilDeposit/rem-02/outputmanagement.js";
    import FileSaver from 'file-saver';
    export default {
        filters: {
            getFixNumberTwo(val) {
                return val.toFixed(4);
            }
        },
        data() {
            return {
                //区块id
                block: "",
                //油田id
                oilField: "",
                //当前时间
                theDate: "",
                //单位类型
                unitType: "",
                //油田名称
                oilFieldName: "",
                //波动值
                unitValue: '',
                //平台表格数据
                tableDataPtOne: [

                ],
                //平台表格数据
                tableDataPtTwo: [

                ],

                //折线图
                echartOption: {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                    dataZoom: {
                        start: 0,
                        type: "inside"
                    },
                    grid: {
                        //bottom: 130,
                    },
                    backgroundColor: "transparent",
                    //color: ["#1379F7", "#8FA4CC", "#E9D456", "#00BC9C", "#FF7135"],
                    color: ["#2ACAFF", "#72818B", "#9A72FF", "#00BC9C"],
                    legend: [{
                        data: ["实际产量", "剩余水平", "计划产量", "滚动预测", "趋势预测"],
                        textStyle: {
                            color: "#8FA4CC",
                            fontSize: 14,
                        },
                        icon: "rect",
                        itemWidth: 12,
                        itemHeight: 6,
                        itemGap: 14,
                        x: "right",
                    }, ],
                    xAxis: {
                        name: "时间/天",
                        nameTextStyle: {
                            color: "#FFFFFF",
                            fontSize: 14,
                        },
                        type: "category",
                        axisLabel: {
                            color: "#8FA4CC",
                            fontSize: 14,
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#979797",
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                    },
                    yAxis: {
                        type: "value",
                        //min: 6200,
                        name: "产油量/(t/d)",
                        nameTextStyle: {
                            color: "#FFFFFF",
                            fontSize: 14,
                        },
                        scale: true,
                        axisLine: {
                            lineStyle: {
                                color: "#979797",
                            },
                        },
                        axisLabel: {
                            color: "#8FA4CC",
                            fontSize: 14,
                        },
                        splitLine: {
                            show: false,
                        },
                    },
                    series: [],
                },
                //饼图
                pieEchart: {
                    tooltip: {},
                    grid: {},
                    color: [
                        "#72818B",
                        "#F5BE43",
                        "#2ACAFF",
                        "#FF7135",
                        "#3BEC7A",
                        "#E9D456",
                        "#9A72FF",
                        "#FF30AD",
                        "#F5FFA3",
                        "#00BC9C",
                        "#DA835E",
                        "#5FCC37",
                        "#FF5844",
                        "#1379F7",
                    ],
                    legend: {
                        show: false,
                        data: [],
                        textStyle: {
                            color: "#8FA4CC",
                            fontSize: 12,
                        },
                        icon: "circle",
                        y: "bottom",
                        itemWidth: 8,
                        itemGrap: 14,
                    },
                    series: {
                        type: "pie",
                        radius: ["40%", "70%"],
                        avoidLabelOverlap: false,
                        width: "90%",
                        height: "90%",
                        label: {
                            show: true,
                            position: "outside",
                            fontSize: 12,
                            color: "#8FA4CC",
                            formatter: "{d}%\n{c}t/d",
                        },
                        labelLine: {
                            show: true,
                            lineStyle: {
                                color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [{
                                        offset: 0,
                                        color: "#0F65EA",
                                    },
                                    {
                                        offset: 0.25,
                                        color: "#0A8DEA",
                                    },
                                    {
                                        offset: 0.75,
                                        color: "#02CAEA",
                                    },
                                    {
                                        offset: 1,
                                        color: "#00D9EA",
                                    },
                                ]),
                            },
                        },
                        itemStyle: {},
                        data: [],
                    },
                },
                //柱状图
                productOilBarChart: {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            // 坐标轴指示器，坐标轴触发有效
                            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
                        },
                    },
                    grid: {
                        top: 50,
                        left: 90,
                        bottom: 80,
                    },
                    xAxis: {
                        type: "category",
                        data: [],
                        axisLabel: {
                            rotate: 30,
                            color: "#8FA4CC",
                            fontSize: 14,
                            margin: 20,
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
                        name: "产油量变化/t",
                        nameTextStyle: {
                            color: "#fff",
                            fontSize: 14,
                            lineHeight: 40,
                        },
                        type: "value",
                        axisLabel: {
                            color: "#8FA4CC",
                            fontSize: 14,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "rgba(151,151,151,.16)",
                            },
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(255,255,255,.16)",
                            },
                        },
                    },
                    series: {
                        type: "bar",
                        label: {
                            show: true,
                        },
                        barWidth: 22,
                        data: [],
                    },
                },
                //柱状图
                productYeildBarChart: {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                    grid: {
                        top: 50,
                        left: 90,
                        bottom: 80,
                    },
                    xAxis: {
                        type: "category",
                        data: [],
                        axisLabel: {
                            rotate: 30,
                            color: "#8FA4CC",
                            fontSize: 14,
                            margin: 20,
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
                        name: "产液量变化/m³",
                        nameTextStyle: {
                            color: "#fff",
                            fontSize: 14,
                            lineHeight: 40,
                        },
                        type: "value",
                        axisLabel: {
                            color: "#8FA4CC",
                            fontSize: 14,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "rgba(151,151,151,.16)",
                            },
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(255,255,255,.16)",
                            },
                        },
                    },
                    series: {
                        type: "bar",
                        label: {
                            show: true,
                        },
                        barWidth: 22,
                        data: [],
                    },
                },
                //柱状图
                waterBarChart: {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            // 坐标轴指示器，坐标轴触发有效
                            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
                        },
                    },
                    grid: {
                        top: 50,
                        left: 90,
                        bottom: 80,
                    },
                    xAxis: {
                        type: "category",
                        data: [],
                        axisLabel: {
                            rotate: 30,
                            color: "#8FA4CC",
                            fontSize: 14,
                            margin: 20,
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
                        name: "含水率变化/%",
                        nameTextStyle: {
                            color: "#fff",
                            fontSize: 14,
                            lineHeight: 40,
                        },
                        type: "value",
                        axisLabel: {
                            color: "#8FA4CC",
                            fontSize: 14,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "rgba(151,151,151,.16)",
                            },
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(255,255,255,.16)",
                            },
                        },
                    },
                    series: {
                        type: "bar",
                        label: {
                            show: true,
                        },
                        barWidth: 22,
                        data: [],
                    },
                },
                //表格数据，问题事件
                eventData: [],
                //实际产量
                realOutput: "",
                //实际产量状态
                realOutputFlag: "",
                //计划产量
                planOutput: "",
                //剩余水平
                remainingLevel: "",
                //滚动预测产量
                rollingPrediction: '',
                //折线最小值
                lineMin: 0,
                //下载限制
                canDownload: false,
            };
        },
        mounted() {
            this.block = this.$route.query.block;
            this.oilField = this.$route.query.oilField;
            this.theDate = this.$route.query.theDate;
            this.unitType = this.$route.query.unitType;
            this.oilFieldName = this.$route.query.oilFieldName;
            this.selectDate = this.$route.query.selectDate;
            this.unitValue = this.$route.query.unitValue;
            this.canDownload = this.$route.query.canDownload;
            //console.log(this.block,this.oilField,this.theDate,this.unitType,this.oilField);
            //产量跟踪预警分析
            this.getOutputTracinAnalysis(
                this.selectDate[0],
                this.selectDate[1],
                this.block,
                this.unitType,
                this.oilField
            );

            //产量跟踪分析
            this.getOutputTracing(
                this.block,
                this.oilField,
                this.theDate,
                this.unitType
            );
            //平台产量贡献分析
            this.getContributeAnalysis(
                this.block,
                this.oilField,
                this.theDate,
                this.unitType,
                false,
            );
            //平台产量贡献分析
            this.getContributeAnalysis(
                this.block,
                this.oilField,
                this.theDate,
                this.unitType,
                true,
            );
            //单井产量波动分析
            this.getWellOutputWave(
                this.block,
                this.oilField,
                this.theDate,
                this.unitType,
                this.unitValue,
            );
            //单当日关键事件
            this.getDailyMainEvent(
                this.block,
                this.oilField,
                this.theDate,
                this.unitType
            );
        },
        methods: {
            //油田产量跟踪预警分析
            getOutputTracinAnalysis(beginDate, endDate, fieldId, outputUnit, wellId) {
                //获取请求参数
                let request = {
                    beginDate: beginDate,
                    endDate: endDate,
                    fieldId: fieldId,
                    outputUnit: outputUnit,
                    wellId: wellId,
                };
                //获取上层变量
                let _this = this;
                //请求获取油田产量跟踪预警分析
                outputTracingAnalysis(request).then((res) => {
                    //获得图表数据
                    let data = res.data.data.chart;
                    //获取图例数据
                    let legendData = [];
                    //获取折线图数据
                    let series = [];

                    //let xAxisData = [];
                    this.lineMin = undefined;
                    let xSet = new Set();
                    if (data) {
                        //请求结果
                        //折线图数组
                        let lineChartArray = data.linearDataSets || [];
                        //遍历数组数据
                        for (let i = 0; i < lineChartArray.length; i++) {
                            legendData.push(lineChartArray[i].label);
                            series.push(_this.getEchartsLineSeries(lineChartArray[i], xSet));
                        }
                    }
                    //向Echarts中添加参数
                    _this.echartOption.legend.data = legendData;
                    _this.echartOption.series = series;
                    if (this.lineMin) {
                        if (this.lineMin > 1000) {
                            this.lineMin = this.lineMin - 50;
                            this.lineMin = Math.floor(this.lineMin / 100) * 100;
                            //this.lineMin=Math.floor(this.lineMin);
                        } else {
                            this.lineMin = this.lineMin - 5;
                            this.lineMin = Math.floor(this.lineMin / 10) * 10;
                            //this.lineMin=Math.floor(this.lineMin);
                        }
                    }
                    let xData = Array.from(xSet).sort();
                    _this.echartOption.xAxis.data = xData;
                    //_this.echartOption.yAxis.min=this.lineMin;

                    //判断单位修改单位名称
                    if (outputUnit == "t") {
                        _this.echartOption.yAxis.name = "产油量/(t/d)";
                    } else if (outputUnit == "m") {
                        _this.echartOption.yAxis.name = "产油量/(m³/d)";
                    }
                });
            },

            //获得折线图数据series
            getEchartsLineSeries(lineData, xSet) {
                //数据拼接
                let seriesData = {};
                seriesData.name = lineData.label;
                seriesData.type = "line";
                seriesData.symbol = "none";
                //标签名称
                let labelName = lineData.label;
                //所有数据集合
                let allData = [];
                //
                let linearData = lineData.linearData;
                if (this.lineMin == undefined) {
                    this.lineMin = linearData[0].value;
                }
                if (labelName == "实际产量") {
                    seriesData.symbol = "circle";
                    seriesData.symbolSize = 5;
                    seriesData.showAllSymbol = true;
                    seriesData.z = 10;
                    for (let i = 0; i < linearData.length; i++) {
                        if (linearData[i].description === null || linearData[i].description === undefined || linearData[i].description === '') {
                            let point = [];
                            point.push(linearData[i].label);
                            xSet.add(linearData[i].label);
                            point.push(linearData[i].value.toFixed(2));
                            if (this.lineMin > linearData[i].value) {
                                this.lineMin = linearData[i].value;
                            }
                            allData.push(point);
                        } else {
                            let point = {};
                            point.value = [linearData[i].label, linearData[i].value.toFixed(2)];
                            if (this.lineMin > linearData[i].value) {
                                this.lineMin = linearData[i].value;
                            }
                            point.symbol = "circle";
                            point.symbolSize = 10;
                            //红色
                            let itemStyleR = {
                                normal: {
                                    color: "#FF5844",
                                },
                            };
                            //蓝色
                            let itemStyleO = {
                                normal: {
                                    color: "#1379F7",
                                },
                            };
                            //黄色
                            let itemStyleY = {
                                normal: {
                                    color: "#F5BE43",
                                },
                            };
                            //判断预警等级
                            if (linearData[i].description == "红色预警") {
                                point.itemStyle = itemStyleR;
                            } else if (linearData[i].description == "蓝色预警") {
                                point.itemStyle = itemStyleO;
                            } else if (linearData[i].description == "黄色预警") {
                                point.itemStyle = itemStyleY;
                            }
                            allData.push(point);
                        }
                    }
                } else {
                    for (let i = 0; i < linearData.length; i++) {
                        let point = [];
                        point.push(linearData[i].label);
                        xSet.add(linearData[i].label);
                        point.push(linearData[i].value.toFixed(2));
                        if (this.lineMin > linearData[i].value) {
                            this.lineMin = linearData[i].value;
                        }
                        allData.push(point);
                    }
                }
                seriesData.data = allData;
                return seriesData;
            },

            //获取产量跟踪分析信息
            getOutputTracing(fieldId, oilFieldId, theDate, unitType) {
                let request = {
                    fieldId: fieldId,
                    oilFieldId: oilFieldId,
                    theDate: theDate,
                    unitType: unitType,
                };
                let _this = this;
                outputTracing(request).then((res) => {
                    //获取产量跟踪分析数据
                    let data = res.data.data.outputTraceAnalysis;
                    //实际产量
                    if (data == null) {
                        _this.realOutput = '';
                        _this.realOutputFlag = '';
                        _this.planOutput = '';
                        _this.remainingLevel = '';
                        _this.rollingPrediction = '';
                    } else {
                        //实际产量
                        _this.realOutput = data.realOutput;
                        _this.realOutputFlag = data.realOutputFlag;
                        _this.planOutput = data.planOutput;
                        _this.remainingLevel = data.remainingLevel;
                        _this.rollingPrediction = data.rollingPrediction;
                    }
                    if (unitType == "m") {
                        _this.realOutput =
                            _this.realOutput.length != 0 ? _this.realOutput + "m³" : "";
                        _this.planOutput =
                            _this.planOutput.length != 0 ? _this.planOutput + "m³" : "";
                        _this.remainingLevel =
                            _this.remainingLevel.length != 0 ? _this.remainingLevel + "m³" : "";
                        _this.rollingPrediction =
                            _this.rollingPrediction.length != 0 ?
                            _this.rollingPrediction + "m³" :
                            "";
                    } else if (unitType == "t") {
                        _this.realOutput =
                            _this.realOutput.length != 0 ? _this.realOutput + "t" : "";
                        _this.planOutput =
                            _this.planOutput.length != 0 ? _this.planOutput + "t" : "";
                        _this.remainingLevel =
                            _this.remainingLevel.length != 0 ? _this.remainingLevel + "t" : "";
                        _this.rollingPrediction =
                            _this.rollingPrediction.length != 0 ?
                            _this.rollingPrediction + "t" :
                            "";
                    }
                });
            },

            //获取平台产量贡献分析信息
            getContributeAnalysis(fieldId, oilFieldId, theDate, unitType, platformDetail) {
                let request = {
                    fieldId: fieldId,
                    oilFieldId: oilFieldId,
                    theDate: theDate,
                    unitType: unitType,
                    platformDetail: platformDetail,
                };
                let _this = this;
                platformOutputContributeAnalysis(request).then((res) => {
                    if (platformDetail == false) {
                        let data = res.data.data.chart.pieDataSet[0];
                        //获取图例数据
                        let legendData = [];
                        //获取折线图数据
                        let seriesData = [];
                        //饼图数据
                        let pieData = data.pieDatas;
                        if (pieData) {
                            for (let i = 0; i < pieData.length; i++) {
                                let detail = {};
                                detail.value = pieData[i].value.toFixed(2);
                                detail.name = pieData[i].label;
                                seriesData.push(detail);
                                legendData.push(pieData[i].label);
                            }
                        }
                        _this.pieEchart.legend.data = legendData.sort();
                        _this.pieEchart.series.data = seriesData;
                        if (unitType == "t") {
                            _this.pieEchart.series.label.formatter = function(param) {
                                let res = "";
                                let name = (param.name ? param.name : '') + ' ';
                                let value = " " + (param.value ? param.value : 0) + "t/d";
                                let percent = " " + (param.percent ? param.percent : 0) + "%";
                                res = name + value + percent;
                                return res;
                            };
                        } else if (unitType == "m") {
                            _this.pieEchart.series.label.formatter = function(param) {
                                let res = "";
                                let name = (param.name ? param.name : '') + ' ';
                                let value = " " + (param.value ? param.value : '0') + "m³/d";
                                let percent = " " + (param.percent ? param.percent : '0') + "%";
                                res = name + value + percent;
                                return res;
                            };
                        }
                    } else {
                        let tableDate = res.data.data.platformOutputs;
                        let tableOne = [];
                        let tableTwo = [];
                        if (tableDate) {
                            tableDate = tableDate.sort(function(a, b) {
                                if (a.platformName > b.platformName) {
                                    return 1;
                                } else if (a.platformName < b.platformName) {
                                    return -1;
                                } else {
                                    return 0;
                                }
                            });
                            for (let i = 0; i < tableDate.length; i++) {
                                if (i < tableDate.length / 2)
                                    tableOne.push(tableDate[i]);
                                else
                                    tableTwo.push(tableDate[i]);
                            }
                        }
                        _this.tableDataPtOne = tableOne;
                        _this.tableDataPtTwo = tableTwo;
                    }
                });
            },

            //获取单井产量波动分析
            getWellOutputWave(fieldId, oilFieldId, theDate, unitType, waveSetting) {
                let request = {
                    fieldId: fieldId,
                    oilFieldId: oilFieldId,
                    theDate: theDate,
                    unitType: unitType,
                    waveSetting: waveSetting,
                };
                let _this = this;
                wellOutputWaveAnalysis(request).then((res) => {
                    //获取产油数据项
                    let data = res.data.data.oilChart;
                    let xAxisData = [];
                    let barDate = data.barDataSets[0].barDatas;

                    for (let i = 0; i < barDate.length; i++) {
                        xAxisData.push(barDate[i].label);
                    }
                    _this.productOilBarChart.xAxis.data = xAxisData;
                    _this.productOilBarChart.series.data = _this.getBarChartSeries(barDate);
                    //单位切换
                    if (unitType == "t") {
                        _this.productOilBarChart.yAxis.name = "产油量变化/t";
                    } else if (unitType == "m") {
                        _this.productOilBarChart.yAxis.name = "产油量变化/m³";
                    }

                    //获取产液量数据项
                    let dataY = res.data.data.liquidChart;
                    let xAxisDataY = [];
                    let barDateY = dataY.barDataSets[0].barDatas;

                    for (let i = 0; i < barDateY.length; i++) {
                        xAxisDataY.push(barDateY[i].label);
                    }
                    _this.productYeildBarChart.xAxis.data = xAxisDataY;
                    _this.productYeildBarChart.series.data = _this.getBarChartSeries(barDateY);
                    //获取含水变化率
                    let dataI = res.data.data.waterCutChart;
                    let xAxisDataI = [];
                    let barDateI = dataI.barDataSets[0].barDatas;

                    for (let i = 0; i < barDateI.length; i++) {
                        xAxisDataI.push(barDate[i].label);
                    }
                    _this.waterBarChart.xAxis.data = xAxisDataI;
                    _this.waterBarChart.series.data = _this.getBarChartSeries(barDateI);
                });
            },
            //柱状图
            getBarChartSeries(barChart) {
                let seriesData = [];
                for (let i = 0; i < barChart.length; i++) {
                    let barData = {};
                    //值大于等于0
                    if (barChart[i].value >= 0) {
                        barData.value = barChart[i].value.toFixed(2);
                        barData.name = barChart[i].label;
                        barData.label = {
                            normal: {
                                position: "top",
                                color: "#fff",
                                fontSize: 14,
                            },
                        };
                        barData.itemStyle = {
                            color: "#1379F7",
                        };
                        seriesData.push(barData);
                    } else { //值小于0
                        barData.value = barChart[i].value.toFixed(2);
                        barData.name = barChart[i].label;
                        barData.label = {
                            normal: {
                                position: "bottom",
                                color: "#fff",
                                fontSize: 14,
                            },
                        };
                        barData.itemStyle = {
                            color: "#FF7135",
                        };
                        seriesData.push(barData);
                    }
                }
                return seriesData;
            },

            //获取当日关键事件
            getDailyMainEvent(fieldId, oilFieldId, theDate, unitType) {
                let request = {
                    fieldId: fieldId,
                    oilFieldId: oilFieldId,
                    theDate: theDate,
                    unitType: unitType,
                };
                let _this = this;
                dailyMainEvent(request).then((res) => {
                    let data = res.data.data;
                    _this.eventData = data.dailyMainEvents;
                });
            },
        }
    };
</script>

<style lang="scss" scoped>
    .app-container{
        height: 100%;
        display: flex;
        flex-direction: column;
        .z-container{
            flex:1;
            height:0;
            .pagePanelNew{
                height:100%;
                margin-top:0;
                .pagePane-container{
                    height:100%;
                    overflow-x: hidden;
                    overflow-y: scroll;
                    .rowBox {
                        margin-bottom:20px;
                        display: flex;
                        align-items: center;
                        .row {
                            flex: 1;
                            width:0;
                            .row-container{
                                display: flex;
                                flex-direction: column;
                                height:100%;
                                .searchBox{
                                    padding:10px 0;
                                    padding-right:10px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: flex-end;
                                }
                                .echartBox{
                                    flex:1;
                                    height:0;
                                }
                            }
                        }
                    }
                    .rowBox:last-child{
                        margin-bottom:0;
                    }
                }
            }
        }
    }
    #tableData{
        ::v-deep .el-table__header-wrapper{
            .el-table__header{
                thead {
                    tr{
                        .cell{
                            height: auto;
                            line-height: 18px;
                            white-space: pre;
                        } 
                    }
                } 
            }
        } 
        ::v-deep .cell:empty{
            &::before {
                content: '-';
            } 
        }
    } 
</style>
