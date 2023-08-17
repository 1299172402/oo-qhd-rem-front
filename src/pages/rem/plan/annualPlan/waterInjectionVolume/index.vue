<!-- 注水量 -->
<template>
    <div class="tab-container">
        <pagePanel :headerTitle="searchForm.oilFieldName + '年度计划运行曲线图'" :style="{marginTop:0, height: height+'px'}" show-btn>
            <div slot-name="titleContent">
                <el-button type="primary" style="position: absolute;right:56px;top:3px;height:26px; padding: 0 10px;" @click="switchToOilfieldWater">详情</el-button>
            </div>
            <Echart ref="echartChart" :chart-data="OilYearLineChart" height="100%"></Echart>
        </pagePanel>
        <div class="develop">
            <span :class="[isDevelop?'top-span':'active-span']" @click="tapDevelop"></span>
        </div>
        <pagePanel :headerTitle="searchForm.oilFieldName + '年度计划运行曲线表'" style="height: 580px;" show-btn v-show="isDevelop">
            <div slot-name="titleContent" style="display: flex; justify-content: flex-end;">
                <el-button icon="el-icon-download" type="primary" style="margin-bottom: 20px;" @click="downTable">下载</el-button>
            </div>
            <el-table 
                id="tableData"
                :data="oilYearData" :border="false" :row-style="{ height: '0px' }"
                header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }"
                style="width:100%;" height="calc(100% - 130px)" :default-sort="{ prop: 'date', order: 'descending' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }">
                <el-table-column type="index" align="center" label="序号" :index="tableIndex"></el-table-column>
                <el-table-column prop="theDate" align="center" label="时间"> </el-table-column>
                <el-table-column prop="injectionDailyReal" align="center" :label="`实际日注入量\n(m³/d)`" :formatter="numberToTwo"></el-table-column>
                <el-table-column prop="injectionDailyPlan" align="center" :label="`计划日注入量\n(m³/d)`" :formatter="numberToTwo"></el-table-column>
                <el-table-column property="injectionSumReal" align="center" :label="`实际年累注\n(10⁴m³)`" :formatter="numberToFour"></el-table-column>
                <el-table-column prop="injectionSumPlan" align="center" :label="`计划年累注\n(10⁴m³)`" :formatter="numberToFour"></el-table-column>
            </el-table>
            <pagination v-if="total" :total="total" :page="page" :limit="pageSize" @pagination="pagination"/>
        </pagePanel>
    </div>
</template>

<script>
    import Echart from '@/components/tools/Echarts/index.vue';
    import { searchInjectionChart,searchInjectionTable } from '@/api/oilDeposit/rem-03/oilfieldmanageplan.js';
    import {dowmInjectionTable } from '@/api/oilDeposit/rem-04/plan.js';
    import FileSaver from 'file-saver';
    export default {
        components: {
            Echart,
        },
        props:{
            searchForm:{
                type:Object,
                default:()=>{
                    return {
                        oilFieldName:'',
                        selectOilField:'',
                        selectDate:[],
                        planTypeCode:'',
                        rollForecastVersion:'',
                        selectUnitOfProduction:'',
                    }
                }
            }
        },
        data() {
            return {
                height:'',
                OilYearLineChart: {//注水量折线图
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                name:  (this.searchForm.oilFieldName ? this.searchForm.oilFieldName : '') + "年度计划运行曲线图",
                                pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
                                backgroundColor: '#022644',
                                iconStyle:{
                                    opacity:0
                                }
                            },
                        },
                    },
                    dataZoom: [
                        {
                            type: "inside",
                            xAxisIndex: [0],
                            start: 0, //滚动条开始位置（共100等份）
                            end: 100, //滚动条结束位置
                        },
                    ],
                    color: ['#1379F7', '#FF5844', '#F5BE43', '#00BC9C', '#9A72FF', '#DA835E'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        },
                    },
                    grid:{
                        x: 120,
                        y: 50,
                        x2: 120,
                        y2: 100,
                    },
                    legend: {
                        data: [],
                        textStyle: {
                            color: '#8FA4CC',
                            fontSize: 14,
                        },
                        x:'center',
                        bottom:30,
                        icon: 'rect',
                        itemWidth: 12,
                        itemHeight: 6,
                        itemGap: 14,
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        axisLabel: {
                            color: '#8FA4CC',
                            padding:[10,0,0,0],
                            fontSize: 14,
                            interval: function(index, val) {
                                if (val.substr(-2) == '01') {
                                    return true;
                                } else {
                                    return false;
                                }
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#8FA4CC',
                            },
                        },
                    },
                    yAxis: [
                        {
                            name: '日注水量m³/d',
                            nameLocation:'middle',
                            nameGap:80,
                            nameTextStyle: {
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            scale: true,
                            type: 'value',
                            axisLabel: {
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#8FA4CC',
                                },
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#8FA4CC',
                                },
                            },
                        },
                        {
                            name: '年注水量10⁴m³',
                            nameLocation:'middle',
                            nameGap:70,
                            nameTextStyle: {
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            scale: true,
                            type: 'value',
                            axisLabel: {
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#8FA4CC',
                                },
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#8FA4CC',
                                },
                            },
                        },
                    ],
                    series: [],
                },
                isDevelop:false,//是否展示表格
                oilYearData: [],//注水量表格数据
                page:1,
                pageSize:10,
                total:0,
            };
        },
        mounted() {
            this.height=document.getElementById('pagePanelNew').scrollHeight-40-46-50-7-15;
            this.initData();
        },
        methods: {
            //初始化信息
            async initData() {
                this.getSearchInjectionChart();
                this.getSearchInjectionTable();
            },
            //年度计划 注水量统计图
            getSearchInjectionChart() {
                let request = {
                    oilFieldId: this.searchForm.selectOilField,
                    beginDate: this.searchForm.selectDate[0],
                    endDate: this.searchForm.selectDate[1],
                    planTypeCode: this.searchForm.planTypeCode,
                    rollForecastVersion: this.searchForm.rollForecastVersion,
                };
                searchInjectionChart(request).then((res) => {
                    //图例数据集
                    let legendData = [];
                    //折线数据集
                    let seriesData = [];
                    let xSet = new Set();
                    let xData = [];
                    if (res.data.code == 200) {
                        let chartDatas = res.data.data.chart.linearDataSets;
                        for (let i = 0; i < chartDatas.length; i++) {
                            if (chartDatas[i].label == '滚动预测') {
                                legendData.push('预测注水量');
                            } else {
                                legendData.push(chartDatas[i].label);
                            }
                            seriesData.push(this.getLinearChartInjectionChart(chartDatas[i], xSet));
                        }
                        xData = Array.from(xSet).sort();
                        this.OilYearLineChart.legend.data = legendData;
                        this.OilYearLineChart.series = seriesData;
                        this.OilYearLineChart.xAxis.data = xData;
                    } else {
                        this.OilYearLineChart.legend.data = legendData;
                        this.OilYearLineChart.series = seriesData;
                        this.OilYearLineChart.xAxis.data = xData;
                    }
                });
            },
            //年度计划 注水量统计图 折线数据解析
            getLinearChartInjectionChart(linearChart, xSet) {
                //结果数据
                let series = {};
                series.name = linearChart.label;
                series.type = 'line';
                series.symbol = 'none';
                let labelName = linearChart.label;
                //如果滚动预测
                if (labelName == '滚动预测') {
                    series.name = '预测注水量';
                }
                if (labelName == '实际日注入量' || labelName == '滚动预测' || labelName == '计划日注入量') {
                    series.yAxisIndex = 0;
                } else if (labelName == '实际年累注' || labelName == '计划年累注') {
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
            //年度计划 注水量统计表
            getSearchInjectionTable() {
                let request = {
                    oilFieldId: this.searchForm.selectOilField,
                    beginDate: this.searchForm.selectDate[0],
                    endDate: this.searchForm.selectDate[1],
                    planTypeCode: this.searchForm.planTypeCode,
                    rollForecastVersion: this.searchForm.rollForecastVersion,
                    page: this.page,
                    pageSize: this.pageSize,
                };
                searchInjectionTable(request).then((res) => {
                    //成功获取数据
                    if (res.data.code == 200) {
                        this.oilYearData = res.data.data.waterInjections;
                        this.total = res.data.data.total;
                    } else {
                        this.oilYearData = [];
                        this.total = 0;
                    }
                });
            },
            //表格索引
            tableIndex(index) {
                index = index + 1 + (this.page - 1) * this.pageSize;
                return index;
            },
            //分页
            pagination(obj){
                if(this.pageSize!=obj.limit){
                    this.page=1;
                    this.pageSize=obj.limit;
                }else{
                    this.page=obj.page;
                }
                this.getSearchInjectionTable();
            },
            //表格-展示||隐藏
            tapDevelop(){
                this.isDevelop=!this.isDevelop;
                if(this.isDevelop){
                    this.$nextTick(()=>{
                        let parentDom=document.getElementsByClassName('tab-container')[0];
                        parentDom.scrollBy({top: this.height,behavior: 'smooth'});
                    })
                }
            },
            //跳转详情
            switchToOilfieldWater() {
              this.$router.push({
                name: 'waterInjectionVolumeDetail',
                params: this.searchForm
              });
            },
            //保留两位小数
            numberToTwo(row, column, cellValue, index) {
                if (cellValue) {
                    return Number(cellValue).toFixed(2);
                } else {
                    return '-';
                }
            },
            //保留四位小数
            numberToFour(row, column, cellValue, index) {
                if (cellValue) {
                    return Number(cellValue).toFixed(4);
                } else {
                    return '-';
                }
            },
            //下载echarts
            downEchart() {
                this.$refs.echartChart.chartDownLoad(this.searchForm.oilFieldName +'年度计划运行曲线图');
            },
            //导出table
            downTable() {
                let request = {
                        oilFieldId: this.searchForm.selectOilField,
                        beginDate: this.searchForm.selectDate[0],
                        endDate: this.searchForm.selectDate[1],
                        planTypeCode: this.searchForm.planTypeCode,
                        rollForecastVersion: this.searchForm.rollForecastVersion,
                    };
                    dowmInjectionTable(request).then(res=>{
                        const blob = new Blob([res], { type: "application/octet-stream" });
                        FileSaver.saveAs(blob, this.searchForm.oilFieldName + '注水量表.xlsx');
                    })
                
            },
        },
    };
</script>

<style lang="scss" scoped>
    .tab-container{
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        padding-top:7px;
        padding-left:7px;
        padding-right:15px;
        padding-bottom:15px;
    }
    #tableData{
        ::v-deep .el-table__header-wrapper .cell{
            height: auto;
            line-height: 18px;
            white-space: pre;
        }
        ::v-deep .cell:empty{
            &::before {
                content: '-';
            } 
        }
    } 
</style>