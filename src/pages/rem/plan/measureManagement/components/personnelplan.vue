<template>
    <div class="app-container" style="height: calc(100% - 20px);">
        <el-row :gutter="20">
            <el-col :span="12">
                <pagePanel headerTitle="平台人数对比" style="height: 250px">
                    <Echart :chart-data="histogram" height="100%"></Echart>
                </pagePanel>
            </el-col>
            <el-col :span="12">
                <pagePanel headerTitle="项目人数分布" style="height: 250px">
                    <!--                <Echart :chart-data="option" :events="events" height="100%"></Echart>-->
                </pagePanel>
            </el-col>
        </el-row>
        <pagePanel headerTitle="人员类型概况" style="height: calc(100% - 330px)">
            <el-table highlight :data="peoplelist" height="100%" style="width: 100%" :summary-method="getSummaries"
                      ref="table" show-summary>
                <el-table-column prop="prodPlatFormName" label="平台" min-width="200px"
                                 align="center"></el-table-column>
                <el-table-column prop="newsPapering" label="报务" min-width="80px" align="center"></el-table-column>
                <el-table-column prop="mineStaff" min-width="120px" label="定员" align="center"></el-table-column>
                <el-table-column prop="routineMaintenance" min-width="180px" label="常规维修"
                                 align="center"></el-table-column>
                <el-table-column
                    prop="conventionalOilAndGasWellOperation"
                    min-width="180px"
                    label="常规油水井作业"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="largeScaleEngineeringAndOperation"
                    min-width="180px"
                    label="大型工程及作业"
                    align="center"
                >
                </el-table-column>
                <el-table-column prop="logistics" min-width="80px" label="后勤" align="center"></el-table-column>
                <el-table-column prop="others" min-width="80px" label="其他" align="center"></el-table-column>
                <el-table-column
                    prop="maintenanceAndRenovationOfFacilities"
                    min-width="180px"
                    label="设施维修改造"
                    align="center"
                >
                </el-table-column>
                <el-table-column prop="medicalMatters" min-width="80px" label="医务" align="center"></el-table-column>
                <el-table-column prop="operationOfStimulationMeasures" label="增产措施作业" min-width="120px"
                                 align="center">
                </el-table-column>
                <el-table-column prop="littleSum" min-width="80px" label="小计" align="center"></el-table-column>
            </el-table>
        </pagePanel>
    </div>
</template>
<script>
// import echarts from 'echarts';
import Echart from '@/components/tools/Echarts/index.vue';
// import Echart from '@/components/tools/Echarts';
// import {
//   queryPlatformPob,
//   // queryPlatformPobCharts,
//   queryPOBProjectPeople,
// } from '@/api/prm-01/pipelinetransportationperformance.js';
// import { dailyList, getReloadOperating } from '@/api/pim-01/pim01.js';
/*import {
  getChemicals, getPlanType, getPlatforms,
} from "@/api/prm-01/commonmethod.js";*/
// import div from '@/components/tools/div';
import verticalSwitchButton from '@/components/intelligentOilfield/vertical-switch-button/index.vue';
// import { fetchOilFields, fetchPlatforms } from '@/api/rem-02/primaryinfo';
// echarts.use([GridComponent, LegendComponent, TooltipComponent, LineChart, CanvasRenderer]);
import {LineChart} from 'echarts/charts';
import {queryPlatformPob} from '@/api/prm/rc';
import * as echarts from 'echarts/core';
import {GridComponent, TooltipComponent, LegendComponent} from 'echarts/components';
import {CanvasRenderer} from 'echarts/renderers';

echarts.use([GridComponent, LegendComponent, TooltipComponent, LineChart, CanvasRenderer]);
export default {
    props: ['infodata'],
    components: {
        Echart,
        verticalSwitchButton,
    },
    data() {
        return {
            //单选下拉框 油田
            oilFields: [],
            //单选下拉框 平台
            platforms: [],
            //初始化选择平台
            selectPlatform: '',
            //初始化选择油田
            selectOilField: '',
            //时间段选择
            currentTime: [new Date().addDays(-30).format('yyyy-MM-dd'), new Date().format('yyyy-MM-dd')],
            //时间选择
            //分页
            page: 1,
            pageSize: 10,
            total: 0,
            queryParams: {endTime: '', oilFieldId: '', platformId: '',},
            //   events: [{ name: 'click' }],
            // ecahrts 高度
            chartHeight: '150px',
            // table高度
            tableHeight: 280,
            option: {},
            tableData1: [],
            peoplelist: [],
            tableData2: [
                {
                    platform: 'CEPI',
                    address: '-',
                },
                {
                    platform: 'CEPJ',
                    address: '-',
                },
                {
                    platform: '合计',
                    address: '-',
                },
            ],
            histogram: {
                tooltip: {
                    show: true
                },
                legend: {
                    icon: 'rect',
                    itemWidth: 12,
                    itemHeight: 10,
                    itemGap: 40,
                    bottom: '-7',
                    data: ['定员人数', 'POB'],
                    textStyle: {
                        color: '#FFFFFF',
                        fontSize: 14,
                    }
                },
                grid: {
                    top: 30,
                    left: 40,
                    right: 10,
                    bottom: 35
                },
                xAxis: [
                    {
                        type: 'category',
                        data: [],
                        axisLabel: {
                            color: '#8FA4CC',
                            fontSize: 14,
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                //color: '#979797'
                                color: 'rgba(255,255,255,.16)',
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#8FA4CC',
                            fontSize: 14,
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#979797'
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(255,255,255,.16)',
                            }
                        }
                    }
                ],
                series: [{
                    name: '定员人数',
                    type: 'bar',
                    barWidth: '12',
                    data: [],
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                            [{
                                offset: 0,
                                color: '#00D9EA'
                            }, {
                                offset: 1,
                                color: '#0F65EA'
                            }])
                    },
                    /*showBackground: true,
                    backgroundStyle: {
                      color: 'rgba(143,164,204,0.2)',
                    },*/
                }, {
                    name: 'POB',
                    type: 'bar',
                    barWidth: '12',
                    data: [],
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                            [{
                                offset: 0,
                                color: '#F5BE43'
                            }, {
                                offset: 1,
                                color: '#FF7135'
                            }])
                    },
                    /*showBackground: true,
                    backgroundStyle: {
                      color: 'rgba(143,164,204,0.2)',
                    },*/
                },
                ]
            },
        };
    },
    mounted() {
        //初始化下拉框数据
        // this.initData();
        // this.ageEchartData();
        this.getinfo();
    },
    methods: {
        // 接受参数
        show(data) {
            this.queryParams.endTime = data.endTime
            this.queryParams.oilFieldId = data.selectOilField
            this.queryParams.platformId = data.selectPlatform
            console.log(this.queryParams,'------------')
            this.getinfo()
        },
        getinfo() {
            console.log(this.queryParams,'xxxxxxxx')
            queryPlatformPob(this.queryParams).then((data) => {
                this.peoplelist = data.data;
                this.$nextTick(() => {
                    this.$refs.table.doLayout()
                })
                let list;
                list = data.data;
                let x = [];
                let y = [];
                let y1 = [];
                for (let i in list) {
                    if (list.hasOwnProperty(i)) {
                        if (list[i].prodPlatFormName === '渤海世纪') {
                            //折线图
                            x.push('FPSO');
                            y.push(list[i].mineStaff); //waterTimeRate
                            y1.push(list[i].littleSum);
                        } else {
                            x.push(list[i].prodPlatFormName.substr(7, 4));
                            y.push(list[i].mineStaff); //waterqueryParamsTimeRate
                            y1.push(list[i].littleSum);
                        }
                    }
                }
                //柱图
                this.histogram.series[0].data = y;
                this.histogram.series[1].data = y1;
                this.histogram.xAxis[0].data = x;
            });
        },

        //查询POB施工项目情况
        selectPOBProjectPeopleOthers(queryParams) {
            dailyList(queryParams).then((data) => {
                data = data.data.data.records;
                let list = data;
                this.tableData1 = data;
                // this.total=data.total;
                //查询图形
                let x = [];
                let y = [];
                // let y1=[];
                for (let i in list) {
                    if (list.hasOwnProperty(i)) {
                        //折线图
                        x.push(list[i].prodPlatform);
                        y.push(list[i].projectUser.slice(0, 1)); //waterTimeRate
                    }
                }
                //柱图
                this.histogram2.series[0].data = y;
                this.histogram2.xAxis.data = x;
            });
        },
        getSummaries(param) {
            const {columns, data} = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }
                const values = data.map((item) => Number(item[column.property]));
                if (!values.every((value) => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    sums[index] = Number(sums[index]);
                    sums[index];
                } else {
                    sums[index] = '';
                }
            });
            return sums;
        },
        /**
         * hwh
         * 查看施工日报
         * @param platformId 平台id
         * @param startTime 开始时间
         * @param endTime 结束时间
         */
        doGetReloadOperating(platformId, startTime, endTime) {
            //如果平台id等于油田id为空
            if (platformId == '3FC9A818F5BC43B88270DB80BBB3018F') {
                platformId = '';
            }
            getReloadOperating(platformId, startTime, endTime).then((res) => {
                if (res.data.code == 0) {
                    this.tableData1 = res.data.data;
                    this.changeEchartsOption(this.tableData1);
                } else {
                    this.tableData1 = [];
                }
            });
        },
        /**
         * hwh
         * 根据当日施工日报表格内容信息 画图
         * @param tableData
         */
        // changeEchartsOption(tableData) {
        //   if (tableData && tableData.length >= 0) {
        //     let xData = [];
        //     let seriesData = [];
        //     //遍历图表信息
        //     for (let i = 0; i < tableData.length; i++) {
        //       let point = [];
        //       xData.push(tableData[i].projectName);
        //       point.push(tableData[i].projectName);
        //       point.push(isNaN(Number(tableData[i].projectUser)) ? 0 : Number(tableData[i].projectUser));
        //       seriesData.push(point);
        //     }
        //     this.histogram2.xAxis.data = xData;
        //     this.histogram2.series[0].data = seriesData;
        //   } else {
        //     this.histogram2.xAxis.data = [];
        //     this.histogram2.series[0].data = [];
        //   }
        // },
    },
};
</script>
<style lang="scss" scoped>
// .f1 {
//   margin: 10px;
// }
.cont {
    & > div {
        margin-top: 20px;
    }
}
::v-deep.el-table .el-table__footer-wrapper .cell{
    color: rgb(174, 178, 179);
    font-weight: bolder;
}
.m1 {
    margin-top: 10px;
}

.f1 {
    margin-left: 10px;
}
</style>
