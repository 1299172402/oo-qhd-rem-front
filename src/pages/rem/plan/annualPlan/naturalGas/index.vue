<!-- 天然气 -->
<template>
    <div class="tab-container">
        <info-window infoWidth="100%" :infoHeight="height+'px'" style="margin-top: 0;" :headerTitle="searchForm.oilFieldName + '天然气产量跟踪图'" isShowMaxBtn>
            <div slot-name="titleContent">
                <el-button type="primary" style="position: absolute;right:50px;top:6px;height:30px;" @click="downEchart">下载</el-button>
            </div>
            <Echart ref="echartChart" :chart-data="GasProLineChart" height="100%"></Echart>
        </info-window>
        <div class="develop">
            <span :class="[isDevelop?'top-span':'active-span']" @click="tapDevelop"></span>
        </div>
        <info-window infoWidth="100%" infoHeight="500px" :headerTitle="searchForm.oilFieldName + '天然气产量跟踪表'" isShowMaxBtn v-show="isDevelop">
            <div slot-name="titleContent">
                <el-button type="primary" style="position: absolute;right:50px;top:6px;height:30px;" @click="downTable">下载</el-button>
            </div>
            <el-table 
                id="tableData"
                :data="tableData" :border="false" :row-style="{ height: '0px' }"
                header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }"
                style="width:100%;" height="calc(100% - 101px)" :default-sort="{ prop: 'date', order: 'descending' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }">
                <el-table-column type="index" align="center" label="序号" :index="tableIndex"></el-table-column>
                <el-table-column prop="prodDate" align="center" label="时间"> </el-table-column>
                <el-table-column property="gasProdPlan" align="center" :label="`计划产气量\n(10⁴m³)`" :formatter="numberToFour"></el-table-column>
                <el-table-column property="gasProdDaily" align="center" :label="`产气量\n(10⁴m³)`" :formatter="numberToFour"></el-table-column>
                <el-table-column prop="oilEquivalent" align="center" :label="`油当量\n(m³/d)`" :formatter="numberToTwo"></el-table-column>
                <el-table-column prop="gasProdRollFocecast" align="center" :label="`滚动预测产气量\n(10⁴m³)`" :formatter="numberToFour"></el-table-column>
            </el-table>
            <pagination v-if="total" :total="total" :page="page" :limit="pageSize" @pagination="pagination"/>
        </info-window>
    </div>
</template>

<script>
    import Echart from '@/components/tools/Echarts/index.vue';
    import { searchGasChart} from '@/api/oilDeposit/rem-03/oilfieldmanageplan.js';
    import { getGasTable ,downGetGasTable } from '@/api/oilDeposit/rem-04/plan.js';
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
                GasProLineChart: {//天然气产量折线图
                    dataZoom: [
                        {
                            type: "inside",
                            xAxisIndex: [0],
                            start: 0, //滚动条开始位置（共100等份）
                            end: 100, //滚动条结束位置
                        },
                    ],
                    color: ['#1379F7', '#FF5844', '#F5BE43', '#00BC9C'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        },
                    },
                    grid:{
                        x: 120,
                        y: 30,
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
                        // name: '时间/日',
                        // nameTextStyle: {
                        //     color: '#8FA4CC',
                        //     fontSize: 14,
                        // },
                        // nameGap: 55,
                        type: 'category',
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
                            name: '产气量/10⁴m³',
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
                        {
                            name: '油当量(折算)/m³',
                            nameLocation:'middle',
                            nameGap:70,
                            nameTextStyle: {
                                color: '#8FA4CC',
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
                tableData:[],//天然气表格数据
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
                this.getSearchGasChart();
                this.getGasTable();
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
                    if (labelName == '产气量') {
                        point.push(parseFloat(Number(lineData[i].value).toFixed(2)));
                    } else if (labelName == '油当量（折算）') {
                        point.push(parseFloat(Number(lineData[i].value).toFixed(4)));
                    }else {
                        point.push(lineData[i].value);
                    }
                    seriesData.push(point);
                }
                series.data = seriesData;
                return series;
            },
            //表格数据获取
            getGasTable() {
                let request = {
                    oilFieldId: this.searchForm.selectOilField,
                    beginDate: this.searchForm.selectDate[0],
                    endDate: this.searchForm.selectDate[1],
                    planTypeCode: this.searchForm.planTypeCode,
                    rollForecastVersion: this.searchForm.rollForecastVersion,
                    pageNum: this.page,
                    pageSize: this.pageSize,
                };
                getGasTable(request).then((res) => {
                    if (res.data.code == 200) {
                        this.tableData = res.data.rows;
                        this.total = res.data.total;
                    } else {
                        this.tableData = [];
                        this.total = 0;
                    }
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
                this.getGasTable();
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
            //下载echarts
            downEchart() {
                this.$refs.echartChart.chartDownLoad(this.searchForm.oilFieldName +'天然气产量跟踪图');
            },
            //导出table
            downTable() {
                let request = {
                    oilFieldId: this.searchForm.selectOilField,
                    unitType: this.searchForm.selectUnitOfProduction,
                    beginDate: this.searchForm.selectDate[0],
                    endDate: this.searchForm.selectDate[1],
                    planTypeCode: this.searchForm.planTypeCode,
                    rollForecastVersion: this.searchForm.rollForecastVersion,
                };
                downGetGasTable(request).then(res=>{
                    const blob = new Blob([res], { type: "application/octet-stream" });
                    FileSaver.saveAs(blob, this.searchForm.oilFieldName + '天然气产量跟踪表.xlsx');
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