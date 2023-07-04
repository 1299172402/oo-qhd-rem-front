<!-- 原油产量 -->
<template>
    <div class="tab-container">
        <info-window infoWidth="100%" :infoHeight="height+'px'" :headerTitle="searchForm.oilFieldName + '年度计划运行曲线图'" isShowMaxBtn style="margin-top:0;">
            <div slot-name="titleContent">
                <el-button type="primary" style="position: absolute;right:50px;top:6px;height:30px;" @click="downEchart">下载</el-button>
            </div>
            <slot name="downBtn"></slot>
            <Echart ref="echartChart" :chart-data="productLineChart" height="calc(100% - 30px)"></Echart>
        </info-window>
        <div class="develop">
            <span :class="[isDevelop?'top-span':'active-span']" @click="tapDevelop"></span>
        </div>
        <info-window infoWidth="100%" infoHeight="580px" :headerTitle="searchForm.oilFieldName + '年度计划运行曲线表'" isShowMaxBtn v-show="isDevelop">
            <div slot-name="titleContent">
                <el-button type="primary" style="position: absolute;right:50px;top:6px;height:30px;" @click="downTable">下载</el-button>
            </div>
            <el-table 
                id="tableData"
                :data="runTimeData.slice((queryParams.page - 1) * queryParams.pageSize, queryParams.page * queryParams.pageSize)"
                :border="false" 
                :row-style="{ height: '0px' }"
                header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }"
                style="width:100%;" height="calc(100% - 75px)" :default-sort="{ prop: 'date', order: 'descending' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }">
                <el-table-column type="index" align="center" label="序号"></el-table-column>
                <el-table-column prop="theDate" align="center" label="时间"> </el-table-column>
                <el-table-column prop="oilAudit" align="center" :label="searchForm.selectUnitOfProduction == 'm' ? '考核日产\n(m³/d)' : '考核日产\n(t/d)'" :formatter="numberToTwo"></el-table-column>
                <el-table-column prop="oilReal" align="center" :label="searchForm.selectUnitOfProduction == 'm' ? '实际日产\n(m³/d)' : '实际日产\n(t/d)'" :formatter="numberToTwo"></el-table-column>
                <el-table-column property="sumPlan" prop="sumPlan" align="center" :label="searchForm.selectUnitOfProduction == 'm' ? '计划年累产\n(10⁴m³)' : '计划年累产\n(10⁴t)'" :formatter="numberToFour"></el-table-column>
                <el-table-column prop="sumReal" align="center" :label="searchForm.selectUnitOfProduction == 'm' ? '实际年累产\n(10⁴m³)' : '实际年累产\n(10⁴t)'" :formatter="numberToFour"></el-table-column>
            </el-table>
            <!-- <pagination v-if="total" :total="total" :page="page" :limit="pageSize" @pagination="pagination"/> -->
            <pagination v-if="total" :pageSizes="[10, 20, 40, 100]" :total="total" :page.sync="queryParams.page" :limit.sync="queryParams.pageSize" @pagination="pagination" />
        </info-window>
    </div>
</template>

<script>
    import dayjs from "dayjs";
    import Echart from '@/components/tools/Echarts/index.vue';
    import { searchOilProductionChart, searchOilProductionTable} from '@/api/oilDeposit/rem-03/oilfieldmanageplan.js';
    import { downLoadOilProductionTable} from '@/api/oilDeposit/rem-04/plan.js';
    import { exportExcel } from '@/lib/exportExcel.js';
    import FileSaver from 'file-saver';
    import * as XLSX from '@/lib/xlsx'
    
    export default {
        components: {
            Echart,
        },
        props:{
            searchForm:{
                type:Object,
                default:()=>{
                    return {
                        selectOilField:'',
                        oilFieldName:'',
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
                productLineChart: {//原油产量折线图
                    color: ['#1379F7', '#FF5844', '#F5BE43', '#00BC9C', '#9A72FF', '#DA835E'],
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
                        y2: 150,
                    },
                    legend: {
                        data: [],
                        textStyle: {
                            color: '#8FA4CC',
                            fontSize: 14,
                        },
                        x:'center',
                        bottom:60,
                        icon: 'rect',
                        itemWidth: 12,
                        itemHeight: 6,
                        itemGap: 14,
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        axisLabel: {
                            color: '#8FA4CC',
                            fontSize: 14,
                            padding:[10,0,0,0],
                            interval: function(index, val) {
                                if (val.substr(-2) == '01') {
                                    return true;
                                } else {
                                    return false;
                                }
                            },
                            formatter:function(value, index){
                                return value.substring(0,7);
                            }
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#8FA4CC',
                            },
                        },
                    }, ],
                    yAxis: [
                        {
                            name: '日产m³/d',
                            nameLocation:'middle',
                            nameGap:70,
                            nameTextStyle: {
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            type: 'value',
                            scale: true,
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
                            name: '年产10⁴m³',
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
                    dataZoom:{
                        type: 'slider',
                        realtime:true, //拖动滚动条时是否动态的更新图表数据
                        height:10,//滚动条高度
                        startValue:'',//滚动条开始位置
                        endValue:'',//结束位置
                        zoomLock:true,
                        showDetail:false,
                        brushSelect: false,
                        backgroundColor:'rgba(0,0,0,0)',
                        dataBackground:{
                            lineStyle:{
                              color:'rgba(0,0,0,0)'  
                            },
                            areaStyle:{
                                color:'rgba(0,0,0,0)',
                                opacity:1
                            },
                        },
                        selectedDataBackground:{
                            areaStyle :{
                                color:'rgba(0,0,0,0)'
                            } 
                        },
                    }
                },
                isDevelop:false,//是否展示表格
                runTimeData: [],//原油产量表格数据
                // page:1,
                // pageSize:10,
                total:0,
                queryParams: {
                    page: 1,
                    pageSize: 10,
                },
            };
        },
        mounted() {
            this.height=document.getElementById('pagePanelNew').scrollHeight-40-46-50-7-15;
            this.initData();
        },
        methods: {
            async initData() {
                this.$nextTick(()=>{
                    this.getSearchOilProductionChart();
                    this.getSearchOilProductionTable();
                })
            },
            //原油产量统计图
            getSearchOilProductionChart() {
                this.productLineChart.dataZoom.startValue=this.searchForm.selectDate[0];
                let endValue=dayjs(this.searchForm.selectDate[0]).add(11, 'month').format('YYYY-MM-DD');
                let a=endValue.split('-');
                let m=a[1].includes('0')?a[1].substring(1) : a[1];
                a[2]=new Date(a[0], m, 0).getDate();
                endValue=a.join('-');
                this.productLineChart.dataZoom.endValue=endValue;
                let request = {
                    oilFieldId: this.searchForm.selectOilField,
                    unitType: this.searchForm.selectUnitOfProduction,
                    beginDate: this.searchForm.selectDate[0],
                    endDate: this.searchForm.selectDate[1],
                    planTypeCode: this.searchForm.planTypeCode,
                    rollForecastVersion: this.searchForm.rollForecastVersion,
                };
                searchOilProductionChart(request).then((res) => {
                    //图表数据
                    let legendData = [];
                    //数据数组
                    let seriesData = [];
                    //判断当前请求是否成功
                    if (res.data.code == 200) {
                        let charDataS = res.data.data.chart.linearDataSets;
                        for (let i = 0; i < charDataS.length; i++) {
                            //获得每一个折线数据
                            let linearChart = charDataS[i];
                            //向图例中添加 折线名称
                            if (linearChart.label != '实际年产' && linearChart.label != '计划年产') {
                                legendData.push(linearChart.label);
                            } else if (linearChart.label == '实际年产') {
                                legendData.push('实际年累产');
                            } else if (linearChart.label == '计划年产') {
                                legendData.push('计划年累产');
                            }
                            //向数据数组中添加 所有折线的信息
                            seriesData.push(this.getLinearChartSeriesOilProduct(linearChart));
                        }
                        //图例数据
                        this.productLineChart.legend.data = legendData;
                        //各线的数据
                        this.productLineChart.series = seriesData;
                        if (this.searchForm.selectUnitOfProduction == 'm') {
                            this.productLineChart.yAxis[0].name = '日产m³/d';
                            this.productLineChart.yAxis[1].name = '年产10⁴m³';
                        } else if (this.searchForm.selectUnitOfProduction == 't') {
                            this.productLineChart.yAxis[0].name = '日产t/d';
                            this.productLineChart.yAxis[1].name = '年产10⁴t';
                        }
                    } else {
                        //图例数据
                        this.productLineChart.legend.data = legendData;
                        //各线的数据
                        this.productLineChart.series = seriesData;
                        if (this.searchForm.selectUnitOfProduction == 'm') {
                            this.productLineChart.yAxis[0].name = '日产m³/d';
                            this.productLineChart.yAxis[1].name = '年产10⁴m³';
                        } else if (this.searchForm.selectUnitOfProduction == 't') {
                            this.productLineChart.yAxis[0].name = '日产t/d';
                            this.productLineChart.yAxis[1].name = '年产10⁴t';
                        }
                    }
                });
            },
            //原油产量 折线图数据解析
            getLinearChartSeriesOilProduct(linearChart) {
                // 单折线数据结构
                let series = {};
                series.name = linearChart.label;
                series.type = 'line';
                series.symbol = 'none';
                let label = linearChart.label;
                if (label == '实际日产') {
                    series.yAxisIndex = 0;
                } else if (label == '考核日产') {
                    series.yAxisIndex = 0;
                } else if (label == '滚动预测') {
                    series.yAxisIndex = 0;
                } else if (label == '实际年产') {
                    series.yAxisIndex = 1;
                    series.name = '实际年累产';
                } else if (label == '计划年产') {
                    series.yAxisIndex = 1;
                    series.name = '计划年累产';
                } else if (label == '剩余水平') {
                    series.yAxisIndex = 0;
                }
                let seriesData = [];
                let chartData = linearChart.linearData;
                for (let i = 0; i < chartData.length; i++) {
                    let point = [];
                    //放入带入点
                    point.push(chartData[i].label);
                    point.push(chartData[i].value);
                    seriesData.push(point);
                }
                series.data = seriesData;
                return series;
            },
            //原油产量 表格数据获取
            getSearchOilProductionTable() {
                let request = {
                    oilFieldId: this.searchForm.selectOilField,
                    unitType: this.searchForm.selectUnitOfProduction,
                    beginDate: this.searchForm.selectDate[0],
                    endDate: this.searchForm.selectDate[1],
                    planTypeCode: this.searchForm.planTypeCode,
                    rollForecastVersion: this.searchForm.rollForecastVersion,
                    // page: this.page,
                    // pageSize: this.pageSize,
                    page:1,
                    pageSize:1000,
                };
                searchOilProductionTable(request).then((res) => {
                    if (res.data.code == 200) {
                        this.runTimeData = res.data.data.oilProduces;
                        this.total = res.data.data.total;
                    } else {
                        this.runTimeData = [];
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
            
            //分页
            pagination(obj){
                // if(this.pageSize!=obj.limit){
                //     this.page=1;
                //     this.pageSize=obj.limit;
                // }else{
                //     this.page=obj.page;
                // }
                // this.getSearchOilProductionTable();
                this.page = e.page;
                this.pageSize = e.limit;
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
                this.$refs.echartChart.chartDownLoad(this.searchForm.oilFieldName +'年度计划运行曲线图');
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
                downLoadOilProductionTable(request).then(res=>{
                    const blob = new Blob([res], { type: "application/octet-stream" });
                    FileSaver.saveAs(blob, this.searchForm.oilFieldName + '年度计划运行曲线表.xlsx');
                })
                // let queryParams=JSON.parse(JSON.stringify(this.queryParams));
                // this.queryParams.pageSize=1000;
                // this.queryParams.page=1;
                // this.$nextTick(function () {
                //     let xlsxParam = {raw: true};
                //     let wb = XLSX.utils.table_to_book(document.querySelector("#tableData"), xlsxParam);
                //     const wbout = XLSX.write(wb, {
                //         bookType: "xlsx",
                //         bookSST: true,
                //         type: "array"
                //     });
                //     try {
                //         FileSaver.saveAs(new Blob([wbout], {type: "application/octet-stream"}), this.searchForm.oilFieldName + '年度计划运行曲线表.xlsx');
                //     } catch (e) {
                //         if (typeof console !== "undefined") console.log(e, wbout);
                //     }
                //     this.queryParams=JSON.parse(JSON.stringify(queryParams));
                //     return wbout;
                // });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .tab-container{
        height:100%;
        padding-top:7px;
        padding-left:7px;
        padding-right:15px;
        padding-bottom:15px;
        overflow-y: scroll;
        overflow-x: hidden;
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
    }
</style>