<!-- 天然气 -->
<template>
    <div class="tab-container">
        <info-window infoWidth="100%" :infoHeight="height+'px'" style="margin-top: 0;" :headerTitle="searchForm.oilFieldName + '天然气产量跟踪'" isShowMaxBtn>
            <div slot-name="titleContent">
                <el-button type="primary" style="position: absolute;right:50px;top:6px;height:30px;" @click="downEchart">下载</el-button>
            </div>
            <Echart :chart-data="GasProLineChart" height="100%"></Echart>
        </info-window>
        <info-window infoWidth="100%" infoHeight="500px" :headerTitle="searchForm.oilFieldName + '天然气产量跟踪'" isShowMaxBtn style="margin-top: 10px">
            <div slot-name="titleContent">
                <el-button type="primary" style="position: absolute;right:50px;top:6px;height:30px;" @click="doDownTable">下载</el-button>
            </div>
            <el-table 
                id="tableData"
                :data="naturalGasData" :border="false" :row-style="{ height: '0px' }"
                header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }"
                style="width:100%;" height="calc(100% - 101px)" :default-sort="{ prop: 'date', order: 'descending' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }">
                <el-table-column type="index" align="center" label="序号" :index="tableIndex"></el-table-column>
                <el-table-column prop="theDate" align="center" label="时间"> </el-table-column>
                <el-table-column property="injectionSumReal" align="center" :label="`产量\n(10⁴m³)`" :formatter="numberToTwo"></el-table-column>
                <el-table-column prop="injectionDailyPlan" align="center" :label="`油当量\n(m³/d)`"></el-table-column>
                <el-table-column prop="injectionSumPlan" align="center" :label="`滚动预测产气量\n(10⁴m³)`"></el-table-column>
            </el-table>
            <pagination v-if="total" :total="total" :page="page" :limit="pageSize" @pagination="pagination"/>
        </info-window>
    </div>
</template>

<script>
    import Echart from '@/components/tools/Echarts/index.vue';
    import { searchGasChart} from '@/api/oilDeposit/rem-03/oilfieldmanageplan.js';
    import {  } from '@/api/oilDeposit/rem-04/plan.js';
    import { exportExcel } from '@/lib/exportExcel.js';
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
                GasProLineChart: {//天然气产量折线图
                    color: ['#1379F7', '#FF5844', '#F5BE43', '#00BC9C'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        },
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                name: '天然气产量',
                                pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
                                backgroundColor: '#022644',
                            },
                        },
                    },
                    legend: {
                        data: [],
                        textStyle: {
                            color: '#8FA4CC',
                            fontSize: 14,
                        },
                        top: '8%',
                        icon: 'rect',
                        itemWidth: 12,
                        itemHeight: 6,
                        itemGap: 14,
                    },
                    xAxis: {
                        name: '时间/日',
                        nameTextStyle: {
                            color: '#fff',
                            fontSize: 14,
                        },
                        nameGap: 55,
                        type: 'category',
                        axisLabel: {
                            color: '#8FA4CC',
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
                                color: 'rgba(255,255,255,.16)',
                            },
                        },
                    },
                    yAxis: [{
                            name: '产气量/10⁴m³',
                            nameTextStyle: {
                                color: '#fff',
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
                                    color: 'rgba(151,151,151,.16)',
                                },
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: 'rgba(255,255,255,.16)',
                                },
                            },
                        },
                        {
                            name: '油当量(折算)/10⁴m³',
                            nameTextStyle: {
                                color: '#fff',
                                fontSize: 14,
                            },
                            minInterval: 0.01,
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
                                    color: 'rgba(151,151,151,.16)',
                                },
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: 'rgba(255,255,255,.16)',
                                },
                            },
                        },
                    ],
                    series: [],
                },
                naturalGasData:[],//天然气表格数据
                page:1,
                pageSize:10,
                total:0,
            };
        },
        mounted() {
            this.height=document.getElementById('pagePanelNew').scrollHeight-40-46;
            this.initData();
        },
        methods: {
            //初始化信息
            async initData() {
                this.getSearchGasChart();
            },
            //年度计划 天然气统计图
            getSearchGasChart() {
                let request = {
                    oilFieldId: this.searchForm.selectOilField,
                    beginDate: this.searchForm.selectDate[0],
                    endDate: this.searchForm.selectDate[1],
                    planTypeCode: this.searchForm.planTypeCode,
                    rollForecastVersion: this.searchForm.rollForecastVersion,
                };
                searchGasChart(request).then((res) => {
                    //图例中信息
                    let legendData = [];
                    //折线数据信息
                    let seriesData = [];
                    //请求成功 获得数据
                    if (res.data.code == 200) {
                        //获得图表中数据
                        let chartDataS = res.data.data.chart.linearDataSets;
                        for (let i = 0; i < chartDataS.length; i++) {
                            legendData.push(chartDataS[i].label);
                            seriesData.push(this.getLinearChartSeriesGasChart(chartDataS[i]));
                        }
                        //获得图例结果赋值
                        this.GasProLineChart.legend.data = legendData;
                        //获得折线数据结果赋值
                        this.GasProLineChart.series = seriesData;
                    } else {
                        //获得图例结果赋值
                        this.GasProLineChart.legend.data = legendData;
                        //获得折线数据结果赋值
                        this.GasProLineChart.series = seriesData;
                    }
                });
            },
            //天然气统计图 解析折线数据 拼接折线数据
            getLinearChartSeriesGasChart(linearChart) {
                let series = {};
                series.name = linearChart.label;
                series.type = 'line';
                series.symbol = 'none';
                let labelName = linearChart.label;
                if (labelName == '产气量') {
                    series.yAxisIndex = 0;
                } else if (labelName == '油当量（折算）') {
                    series.yAxisIndex = 1;
                }
                let seriesData = [];
                let lineData = linearChart.linearData;
                for (let i = 0; i < lineData.length; i++) {
                    let point = [];
                    point.push(lineData[i].label);
                    point.push(lineData[i].value);
                    seriesData.push(point);
                }
                series.data = seriesData;
                return series;
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
                // this.getSearchInjectionTable();
            },
            //导出天然气产量CSV文件
            doDownYYCL() {
                exportExcel('#yttrqclgz', '天然气产量跟踪');
            },
            //下载echarts
            downEchart() {
                // this.GasProLineChart.toolbox.show = flag;
            },
            //导出原油产量CSV文件
            doDownTable() {
                exportExcel('#tableData', '原油产量');
            },
            numberToTwo(row, column, cellValue, index) {
                if (cellValue) {
                    return parseFloat(Number(cellValue).toFixed(2));
                } else {
                    return '-';
                }
            },
        },
    };
</script>

<style lang="scss" scoped>
    .tab-container{
        height:100%;
        overflow-y: scroll;
        overflow-x: hidden;
        padding-right:20px;
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