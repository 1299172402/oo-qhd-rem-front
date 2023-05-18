<!-- 基础产量 -->
<template>
    <div class="tab-container">
        <info-window infoWidth="100%" :infoHeight="height+'px'" :headerTitle="searchForm.oilFieldName + '基础产量图'" isShowMaxBtn style="margin-top:0;">
            <div slot-name="titleContent">
                <el-button type="primary" style="position: absolute;right:50px;top:6px;height:30px;" @click="downEchart">下载</el-button>
            </div>
            <Echart ref="echartChart" :chart-data="OldLineChart" height="100%"></Echart>
        </info-window>
        <div class="develop">
            <span :class="[isDevelop?'top-span':'active-span']" @click="tapDevelop"></span>
        </div>
        <info-window infoWidth="100%" infoHeight="500px" :headerTitle="searchForm.oilFieldName + '基础产量'" isShowMaxBtn v-show="isDevelop">
            <div slot-name="titleContent">
                <el-button type="primary" style="position: absolute;right:50px;top:6px;height:30px;" @click="downTable">下载</el-button>
            </div>
            <el-table id="tableData" :data="tableData" :border="false" :row-style="{ height: '0px' }" header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }" style="width:100%;"
                height="calc(100% - 75px)" :default-sort="{ prop: 'date', order: 'descending' }" :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }">
                <el-table-column type="index" label="序号" :index="tableIndex"></el-table-column>
                <el-table-column prop="prodDate" label="时间"> </el-table-column>
                <el-table-column prop="oilprodReal" :label="searchForm.selectUnitOfProduction == 'm' ? '实际产量\n(m³)' : '实际产量\n(t)'" :formatter="numberToTwo"></el-table-column>
                <el-table-column prop="oilprodPlan" :label="searchForm.selectUnitOfProduction == 'm' ? '计划产量\n(m³)' : '计划产量\n(t)'" :formatter="numberToTwo"></el-table-column>
                <!-- <el-table-column prop="oilprodRollForecast" :label="searchForm.selectUnitOfProduction == 'm' ? '滚动预测\n(10⁴m³)' : '滚动预测\n(10⁴t)'"></el-table-column> -->
            </el-table>
            <pagination v-if="total" :total="total" :page="page" :limit="pageSize" @pagination="pagination" />
        </info-window>
    </div>
</template>

<script>
    import Echart from '@/components/tools/Echarts/index.vue';
    import { oldWellChart} from '@/api/oilDeposit/rem-03/oilfieldmanageplan.js';
    import { oldWellTable} from '@/api/oilDeposit/rem-04/plan.js';
    import {exportExcel} from '@/lib/exportExcel.js';
    export default {
        components: {
            Echart,
        },
        props: {
            searchForm: {
                type: Object,
                default: () => {
                    return {
                        selectOilField: '',
                        oilFieldName: '',
                        selectDate: [],
                        planTypeCode: '',
                        rollForecastVersion: '',
                        selectUnitOfProduction: '',
                    }
                }
            }
        },
        data() {
            return {
                height: '',
                OldLineChart: {
                    color: ['#1379F7', '#FF5844', '#F5BE43', '#00BC9C', '#9A72FF', '#DA835E'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        }
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
                    xAxis: [{
                        // name: '时间/日',
                        // nameLocation: 'center',
                        // nameGap: 30,
                        // nameTextStyle: {
                        //     color: '#8FA4CC',
                        //     fontSize: 14,
                        //     align: 'center',
                        // },
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
                    }, ],
                    yAxis: [{
                        name: '产油量/t',
                        nameLocation:'middle',
                        nameGap:70,
                        nameTextStyle: {
                            color: '#8FA4CC',
                            fontSize: 14,
                        },
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
                    }, ],
                    series: [],
                },
                isDevelop: false, //是否展示表格
                tableData: [],
                page: 1,
                pageSize: 10,
                total: 0,
            };
        },
        mounted() {
            this.height = document.getElementById('pagePanelNew').scrollHeight - 40 - 46 - 50 -7 -15;
            this.initData();
        },
        methods: {
            async initData() {
                this.$nextTick(() => {
                    this.getOldWellChart();
                    this.getOldWellTable();
                })
            },
            //echart数据获取
            getOldWellChart() {
                let request = {
                    oilFieldId: this.searchForm.selectOilField,
                    unitType: this.searchForm.selectUnitOfProduction,
                    beginDate: this.searchForm.selectDate[0],
                    endDate: this.searchForm.selectDate[1],
                    planTypeCode: this.searchForm.planTypeCode,
                    rollForecastVersion: this.searchForm.rollForecastVersion,
                };
                oldWellChart(request).then((res) => {
                    if (res.data.code == 200) {
                        //图例数据
                        let legendData = [];
                        //数据数据
                        let seriesData = [];

                        //获得调数据
                        let chartDataS = res.data.data.chart.linearDataSets;
                        for (let i = 0; i < chartDataS.length; i++) {
                            legendData.push(chartDataS[i].label);
                            //调用生成相关折线图数据
                            seriesData.push(this.getLinearSeries(chartDataS[i], '1'));
                        }
                        if (this.searchForm.selectUnitOfProduction == 't') {
                            this.OldLineChart.yAxis[0].name = '产油量/t';
                        } else if (this.searchForm.selectUnitOfProduction == 'm') {
                            this.OldLineChart.yAxis[0].name = '产油量/m³';
                        }
                        //图例数据
                        this.OldLineChart.legend.data = legendData;
                        this.OldLineChart.series = seriesData;
                    }
                });
            },
            //echart数据解析
            getLinearSeries(linear, type) {
                let series = {};
                series.type = 'line';
                series.name = linear.label;
                series.symbol = 'none';
                let seriesData = [];
                //折线数据数组
                let chartLine = linear.linearData;
                if (chartLine.length == 1) {
                    series.symbol = 'circle';
                    series.size = 3;
                }
                for (let i = 0; i < chartLine.length; i++) {
                    let point = [];
                    if (type === '1') {
                        point.push(chartLine[i].label.substring(0, 10));
                    } else {
                        point.push(chartLine[i].label);
                    }
                    point.push(chartLine[i].value);
                    seriesData.push(point);
                }
                series.data = seriesData;
                return series;
            },
            //表格数据获取
            getOldWellTable() {
                let request = {
                    oilFieldId: this.searchForm.selectOilField,
                    unitType: this.searchForm.selectUnitOfProduction,
                    beginDate: this.searchForm.selectDate[0],
                    endDate: this.searchForm.selectDate[1],
                    planTypeCode: this.searchForm.planTypeCode,
                    rollForecastVersion: this.searchForm.rollForecastVersion,
                    pageNum: this.page,
                    pageSize: this.pageSize,
                };
                oldWellTable(request).then((res) => {
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
            //表格自定义索引
            tableIndex(index) {
                index = index + 1 + (this.page - 1) * this.pageSize;
                return index;
            },
            //分页
            pagination(obj) {
                if (this.pageSize != obj.limit) {
                    this.page = 1;
                    this.pageSize = obj.limit;
                } else {
                    this.page = obj.page;
                }
                this.getOldWellTable();
            },
            //表格-展示||隐藏
            tapDevelop() {
                this.isDevelop = !this.isDevelop;
                if (this.isDevelop) {
                    this.$nextTick(() => {
                        let parentDom = document.getElementsByClassName('tab-container')[0];
                        parentDom.scrollBy({
                            top: this.height,
                            behavior: 'smooth'
                        });
                    })
                }
            },
            //下载echarts
            downEchart() {
                this.$refs.echartChart.chartDownLoad(this.searchForm.oilFieldName + '基础产量图');
            },
            //导出table
            downTable() {
                exportExcel('#tableData', this.searchForm.oilFieldName + '基础产量表');
            },
        },
    };
</script>

<style lang="scss" scoped>
    .tab-container {
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        padding-top:7px;
        padding-left:7px;
        padding-right:15px;
        padding-bottom:15px;

        #tableData {
            ::v-deep .el-table__header-wrapper .cell {
                height: auto;
                line-height: 18px;
                white-space: pre;
            }

            ::v-deep .cell:empty {
                &::before {
                    content: '-';
                }
            }
        }
    }
</style>
