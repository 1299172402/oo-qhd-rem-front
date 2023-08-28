<!-- 年注入量 -->
<template>
    <div class="app-container">
        
        <header-search style="width:100%;height:80px;">
            <div class="g-row-flex-V g-w100 g-h100">
                <div style="margin: 10px 20px 10px 0px;">
                    作业公司：
                    <el-select v-model="queryParams.companyId" placeholder="请选择" disabled @change="changeCompany">
                        <el-option v-for="item in companyList" :key="item.orgId" :label="item.orgName" :value="item.orgId"></el-option>
                    </el-select>
                </div>
                <div style="margin: 10px 20px 10px 0px;">
                    油田：
                    <el-select v-model="queryParams.oilFieldId" disabled>
                        <el-option v-for="item in oilFieldList" :key="item.oilFieldId" :label="item.name" :value="item.oilFieldId"></el-option>
                    </el-select>
                </div>
                <div style="margin: 10px 20px 10px 0px;">
                    开始与结束日期：
                    <el-date-picker v-model="queryParams.dates" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" unlink-panels @change="createChange">
                    </el-date-picker>
                </div>
                <div style="margin: 10px 20px 10px 0px;">
                    <el-button icon="el-icon-search" type="primary" @click="doSearch">搜索</el-button>
                    <el-button icon="el-icon-refresh" class="commonBtn" @click="resetting">重置</el-button>
                </div>
                <div style="margin-left:auto;">
                    <el-button type="warning" plain class="commonBtn" @click="close">返回</el-button>
                </div>
            </div>
        </header-search>
        
        <page-panel-new class="app-content">
            <pagePanel headerTitle="年注入量" style="height: 500px;" show-btn>
                <Echart :chart-data="inInjection" height="100%"></Echart>   
            </pagePanel>
            <pagePanel :headerTitle="`${oilFieldName || ''}平台注入量`" style="height: 550px;" show-btn>
                <div style="display: flex; justify-content: flex-end">
                    <el-button style="margin-bottom: 20px" type="primary" @click="doDownExcel('#ptnzrl', `${oilFieldName || ''}平台注入量`)">下载</el-button>
                </div>
                <el-table id="ptnzrl" :data="tableData" highlight height="calc(100% - 55px)">
                    <el-table-column label="序号" header-align="center" align="center" type="index" width="60"></el-table-column>
                    <el-table-column prop="platform_name" label="平台" align="center"></el-table-column>
                    <el-table-column prop="dailycount2" :label="`油藏需求注入量\n(10⁴m³)`" align="center" :formatter="toPrecise4"></el-table-column>
                    <el-table-column prop="dailycount3" :label="`年考核注入量\n(10⁴m³)`" align="center" :formatter="toPrecise4"></el-table-column>
                    <el-table-column prop="dailycount1" :label="`年实际注入量\n(10⁴m³)`" align="center" :formatter="toPrecise4"></el-table-column>
                </el-table>
            </pagePanel>
        </page-panel-new>
    </div>
</template>

<script>
    import Echart from "@/components/tools/Echarts/index.vue";
    import { injectionYear} from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
    import {getOrgInfo,getOgfInfo} from "@/api/oilDeposit/ipm-03/basedata.js";
    import {fetchOilFields } from "@/api/oilDeposit/rem-02/primaryinfo.js";
    import {exportExcel} from "@/lib/exportExcel.js";
    import dayjs from "dayjs";

    export default {
        name: "annualInjection",
        components: {
            Echart,
        },
        data() {
            return {
                queryParams: {
                    companyId: "715AD1CD60484BB59E737CD18A9DE44A", // 作业公司
                    oilFieldId: "3FC9A818F5BC43B88270DB80BBB3018F", // 油田
                    dates: [dayjs().format("YYYY-01-01"), dayjs().format("YYYY-MM-DD")], // 时间范围集合
                    beginDate: dayjs().format("YYYY-01-01"), // 开始时间
                    endDate: dayjs().format("YYYY-MM-DD"), // 结束时间
                    year: dayjs().format("YYYY-MM-DD"), // 时间年份
                    // pageNum: 1,
                    // pageSize: 9999,
                    isDesc: 1,
                },
                // 油田名称
                oilFieldName: "",
                //作业公司列表
                companyList: [],
                //油田列表
                oilFieldList: [{
                        value: "CEPI",
                        label: "CEPI",
                    },
                    {
                        value: "CEPJ",
                        label: "CEPJ",
                    },
                    {
                        value: "WHPC",
                        label: "WHPC",
                    },
                    {
                        value: "WHPH",
                        label: "WHPH",
                    },
                ],
                //年注入量图表数据
                inInjection: {
                    dataZoom: [
                        {
                            type: "inside",
                            xAxisIndex: [0],
                            start: 0, //滚动条开始位置（共100等份）
                            end: 100, //滚动条结束位置
                        },
                    ],
                    title: {
                        text: "年注入量",
                        textStyle: {
                            color: "#8FA4CC",
                        },
                        top: 0,
                        left: "center"
                    },
                    grid: {
                        x: 120,
                        y: 30,
                        x2: 120,
                        y2: 80,
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                name: '年注入量',
                                pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
                                backgroundColor: '#022644',
                                iconStyle:{
                                    opacity: 0,
                                }
                            },
                        },
                    },
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                    legend: {
                        data: [],
                        textStyle: {
                            color: '#8FA4CC',
                            fontSize: 14,
                        },
                        x:'center',
                        bottom:0,
                        icon: 'rect',
                        itemWidth: 12,
                        itemHeight: 6,
                        itemGap: 14,
                    },
                    xAxis: {
                        name: "日期",
                        nameGap: 35,
                        nameTextStyle: {
                            color: "#8FA4CC"
                        },
                        type: "category",
                        axisLabel: {
                            color: "#8FA4CC",
                            fontSize: 14,
                            padding:[10,0,0,0],
                            // TODO lv 临时暂时屏蔽， 数据不够
                            // interval: function (index, val) {
                            //   //判断是否是一号
                            //   if (val.substr(-2) == "01") {
                            //     return true;
                            //   } else if (val == '2023-01-14') {
                            //     // TODO lv 临时
                            //     return true;
                            //   }else {
                            //     return false;
                            //   }
                            // },
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#8FA4CC",
                            },
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: "rgba(255,255,255,.16)",
                            },
                        },
                    },
                    yAxis: [
                        {
                            name: "日注水量 (m³/d)",
                            nameLocation:'middle',
                            nameGap:70,
                            nameTextStyle: {
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            scale: true,
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
                                    color: "#8FA4CC",
                                },
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: "rgba(255,255,255,.16)",
                                },
                            },
                        },
                        {
                            name: "年注水量 (10⁴m³)",
                            nameLocation:'middle',
                            nameGap:70,
                            nameTextStyle: {
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            scale: true,
                            type: "value",
                            axisLabel: {
                                color: "#8FA4CC",
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "rgba(255,255,255,.16)",
                                }
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: "rgba(255,255,255,.16)",
                                }
                            }
                        },
                    ],
                    series: [],
                },
                // 表格数据 
                tableData: [],
            };
        },
        mounted() {
            this.initData();
        },
        methods: {
            //重置
            resetting(){
                Object.assign(this.$data, this.$options.data())
                this.initData();
            },
            //表格序号
            formatIndex(index) {
                return (this.queryParams.pageNum - 1) * this.queryParams.pageSize + index + 1;
            },
            //返回按钮
            close() {
                const obj = {
                    name: "waterInjectionIndexManagement"
                };
                this.$tab.closeOpenPage(obj);
            },
            //初始化页面
            async initData() {
                await getOrgInfo().then((data) => {
                    let code = data.data.code;
                    if (code == 200) {
                        this.companyList = data.data.data;
                    }
                });
                await fetchOilFields().then((res) => {
                    if (res.data.code == 200) {
                        this.oilFieldList = res.data.data.oilFields;
                        if (this.oilFieldList.length == 0) {
                            this.queryParams.oilFieldId = "";
                            this.oilFieldName = "";
                        } else {
                            this.queryParams.oilFieldId = this.oilFieldList[0].oilFieldId;
                            this.oilFieldName = this.oilFieldList[0].name;
                        }
                    } else {
                        this.$message.error("油田读取错误");
                    }
                });
                // 年注入量图表数据
                this.doInjectionYear();
            },
            //作业公司切换事件
            changeCompany() {
                getOgfInfo(this.queryParams.companyId).then((data) => {
                    this.queryParams.oilFieldId = null;
                    this.oilFieldList = [];
                    let code = data.data.code;
                    if (code == 200) {
                        this.oilFieldList = data.data.data;
                    } else {
                        this.oilFieldList = [];
                    }
                });
            },
            //时间范围切换
            createChange(dates) {
                if (dates && dates.length == 2) {
                    this.queryParams.beginDate = dates[0];
                    this.queryParams.endDate = dates[1];
                } else {
                    this.queryParams.beginDate = "";
                    this.queryParams.endDate = "";
                }
            },
            //查询
            doSearch() {
                //年注入量
                this.doInjectionYear();
            },
            //注水指标管理-年注入量
            doInjectionYear() {
                injectionYear(this.queryParams).then((res) => {
                    if (res.data.code == 200) {
                        //图例数据集
                        let legendData = [];
                        //折线数据集
                        let seriesData = [];
                        let xSet = new Set();
                        let xData = [];
                        let chartDatas = res.data.data.chart.linearDataSets;
                        let resData = res.data.data;
                        this.tableData = resData.tableList ? resData.tableList[0] : [];
                        for (let i = 0; i < chartDatas.length; i++) {
                            legendData.push(chartDatas[i].label);
                            seriesData.push(this.getLinearChartInjectionChart(chartDatas[i], xSet));
                        }
                        xData = Array.from(xSet).sort();
                        this.inInjection.legend.data = legendData;
                        this.inInjection.series = seriesData;
                        this.inInjection.xAxis.data = xData;
                        this.inInjection.title.text =
                            `${this.oilFieldName || ''}${this.queryParams.beginDate && this.queryParams.endDate ? dayjs(this.queryParams.beginDate).format("YYYY-MM-DD") + "至" + dayjs(this.queryParams.endDate).format("YYYY-MM-DD") : ""}年注入量`;
                    }
                });
            },
            //年注入量-折线数据
            getLinearChartInjectionChart(linearChart, xSet) {
                //结果数据
                let series = {};
                series.name = linearChart.label;
                series.type = "line";
                series.symbol = "none";
                let labelName = linearChart.label;
                if (labelName == "实际日注入量" || labelName == "滚动预测" || labelName == "计划日注入量") {
                    series.yAxisIndex = 0;
                } else if (labelName == "实际年累注" || labelName == "计划年累注") {
                    series.yAxisIndex = 1;
                }
                let seriesData = [];
                let lineData = linearChart.linearData;
                for (let i = 0; i < lineData.length; i++) {
                    let point = [];
                    xSet.add(lineData[i].label);
                    point.push(lineData[i].label);
                    point.push(lineData[i].value);
                    seriesData.push(point);
                }
                series.data = seriesData;
                return series;
            },
            //表格id 表格名称
            doDownExcel(tableId, tableName) {
                exportExcel(tableId, tableName);
            },
            // 表格格式化方法 - 数值只保留两位小数
            toPrecise4(row, column) {
                if (
                    (row[column.property] || parseFloat(row[column.property]) === 0) &&
                    typeof parseFloat(row[column.property]) === "number"
                ) {
                    return parseFloat(row[column.property]) || parseFloat(row[column.property]) === 0
                    ? parseFloat(row[column.property]).toFixed(4)
                    : "0";
                } else {
                    return row[column.property] ? row[column.property] : "-";
                }
            },
        },
    };
</script>

<style lang="scss" scoped>
    .app-container{
        padding:0 7px;
        height:100%;
    }
    ::v-deep .app-content{
        height: calc(100% - 100px)!important;
        overflow-y: scroll;
        .g-w100:first-child{
          padding-top:0!important;
        }
    }
    
    ::v-deep .el-main {
        padding: 0px 0px 20px;
        overflow: hidden;
    }

    .formBox {
        &>div:not(:first-child) {
            margin-left: 20px;
        }
    }

    .basicTable {
        height: auto;
        // padding-bottom: 10px;
    }

    .el-col-4 {
        width: 20%;
    }

    ::v-deep .el-table .cell:empty::before {
        content: "-";
    }

    ::v-deep .el-table__header-wrapper {
        .cell {
            height: auto !important;
            line-height: 1.5 !important;
            white-space: pre;
        }
    }
</style>
