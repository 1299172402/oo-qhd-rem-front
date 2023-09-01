<!-- 现场作业计划 -->
<template>
    <div class="app-container" style="height: 100%">
        <headerSearch class="g-w100 g-h100" style="width: 100%;margin-top: 12px">
            <el-form :model="queryParams" ref="queryForm" :inline="true" style="margin-top: 18px">
                <el-form-item label="油田：">
                    <el-select v-model="queryParams.selectOilField" disabled>
                        <el-option
                            v-for="(item, index) in oilFields"
                            :key="index"
                            :label="item.ogfName"
                            :value="item.ogfId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="平台："  >
                    <el-select  clearable v-model="queryParams.asseCode">
                        <el-option v-for="item in platforms" :key="item.id" :label="item.platformName" :value="item.platformId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期：">
                    <el-date-picker v-model="queryParams.endTime" value-format="yyyy-MM-dd" type="date"
                                    placeholder="年/月/日">
                    </el-date-picker>
                </el-form-item>
                <el-button size="medium" type="primary" @click="retrieval" icon="el-icon-search"
                           style="margin-left: 10px"
                >搜索
                </el-button
                >
                <el-button class="commonBtn" @click="reset" icon="el-icon-refresh"> 重置</el-button>
                <el-button style="float: right" type="primary" @click="returnrouter">返回</el-button>
            </el-form>
        </headerSearch>
        <pagePanel headerTitle="人员计划" style="height: calc(100% - 20px)">
            <pagePanel headerTitle="平台人数对比" style="margin-top:0px;height: calc(50% - 20px)">
                <Echart :chart-data="histogram" height="100%"></Echart>
            </pagePanel>
            <pagePanel headerTitle="人员类型概况" style="height: 51%;overflow-y: hidden">
                <el-button icon="el-icon-download"  type="primary" style="float:right" @click="downtable">下载</el-button>
                <el-table
                    highlight
                    :data="tableData2"
                    style="width: 100%"
                    height="100%"
                    id="peisontable"
                    :summary-method="getSummaries"
                    show-summary
                >
                    <el-table-column
                        prop="prodPlatFormName"
                        label="平台"
                        min-width="200px"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="newsPapering"
                        label="报务"
                        min-width="80px"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="mineStaff"
                        min-width="120px"
                        label="定员"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="routineMaintenance"
                        min-width="180px"
                        label="常规维修"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="conventionalOilAndGasWellOperation"
                        min-width="180px"
                        label="常规油水井作业"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="largeScaleEngineeringAndOperation"
                        min-width="180px"
                        label="大型工程及作业"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="logistics"
                        min-width="80px"
                        label="后勤"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="others"
                        min-width="80px"
                        label="其他"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="maintenanceAndRenovationOfFacilities"
                        min-width="180px"
                        label="设施维修改造"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="medicalMatters"
                        min-width="80px"
                        label="医务"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="operationOfStimulationMeasures"
                        label="增产措施作业"
                        min-width="120px"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="littleSum"
                        min-width="80px"
                        label="小计"
                        align="center">
                    </el-table-column>
                </el-table>
            </pagePanel>
        </pagePanel>
    </div>
</template>

<script>
import {getOnSiteWork, queryPlatformPob} from '@/api/rem/actionplanmanagement';
import Echart from "@/components/tools/Echarts/index.vue";
import {LineChart} from "echarts/charts";
import * as echarts from "echarts/core";
import {GridComponent, TooltipComponent, LegendComponent} from "echarts/components";
import {CanvasRenderer} from "echarts/renderers";
import {queryCapacityComposition} from "@/api/rem/reservoirbillboards";
import {queryListOfOilfieldQueryPlatformsDetail, queryOperatorsCheckFieldListsDetail} from "@/api/basic/master";

echarts.use([GridComponent, LegendComponent, TooltipComponent, LineChart, CanvasRenderer]);
import {exportExcel} from "@/lib/exportExcel";
export default {
    components: {
        Echart,
    },
    data() {
        return {
            open: false, // 新增弹框
            dialogVisible: false, //运行计算展示弹窗
            title: '', // 弹窗标题
            company: [],
            tableData2: [],
            oilfield: [],
            deptSelect: [],
            platforms:[],
            oilFields:[],
            addform: {
                noticeContent: '',
                noticeType: '',
                radio: '',
                sendTime: '',
                deptIds: [],
            },
            queryParams:
                {
                    endTime: '',
                    selectPlatform: '',
                    selectOilField: "3FC9A818F5BC43B88270DB80BBB3018F",
                    asseCode:'',
                },
            // 表格数据
            noticeList: [],
            // 是否展开，默认全部展开
            isExpandAll: true,
            deptList: [],
            // 总条数
            histogram: {
                tooltip: {
                    show: true
                },
                legend: {
                    left: 'left',
                    padding: [5, 100],
                    icon: 'rect',
                    itemWidth: 12,
                    itemHeight: 10,
                    itemGap: 40,
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
                    bottom: 30
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
            total: 0,
        };
    },
    created() {
        let currentDate = new Date();

// 使用 setDate() 方法设置日期为当前日期减去一天
        currentDate.setDate(currentDate.getDate() - 1);

// 获取前一天的年、月、日
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1; // 月份从 0 开始，需要加 1
        let day = currentDate.getDate();

// 格式化为字符串，如果月份和日期小于 10，前面补零
        let formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        this.queryParams.endTime = formattedDate
        let data = {
            endTime: this.queryParams.endTime,
            platformId:this.queryParams.asseCode
        }
        this.selectPlatformPob(data)
        queryOperatorsCheckFieldListsDetail({orgId:'715AD1CD60484BB59E737CD18A9DE44A'}).then(res=>{
            this.oilFields = res.data.data
        })
        queryListOfOilfieldQueryPlatformsDetail({ogfId:'3FC9A818F5BC43B88270DB80BBB3018F'}).then(res=>{
            this.platforms = res.data.data
        })
        // this.choiceDepts(); // 获取组织机构
    },
    methods: {
        downtable(){
            exportExcel("#peisontable", "人员类型概况");
        },
        retrieval(){
            let queryParams = {
                platformId: this.queryParams.selectPlatform,
                endTime: this.queryParams.endTime
            }
            this.selectPlatformPob(queryParams)
        },
        returnrouter(){
            this.$router.go(-1);
        },
        reset(){
            let currentDate = new Date();

// 使用 setDate() 方法设置日期为当前日期减去一天
            currentDate.setDate(currentDate.getDate() - 1);

// 获取前一天的年、月、日
            let year = currentDate.getFullYear();
            let month = currentDate.getMonth() + 1; // 月份从 0 开始，需要加 1
            let day = currentDate.getDate();

// 格式化为字符串，如果月份和日期小于 10，前面补零
            let formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            this.queryParams.endTime = formattedDate
            this.queryParams.selectPlatform = ''
            this.selectPlatformPob(this.queryParams)
        },
        getSummaries(param) {
            const {columns, data} = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    sums[index] = Number(sums[index]);
                } else {
                    sums[index] = '';
                }
            });
            return sums;
        },
        selectPlatformPob(queryParams) {
            queryPlatformPob(queryParams).then((data) => {
                data = data.data
                this.tableData2 = data;
                // this.total=data.total;
                let list;
                list = data;
                let x = [];
                let y = [];
                let y1 = [];
                for (let i in list) {
                    if (list.hasOwnProperty(i)) {
                        if (list[i].prodPlatFormName === '海洋石油109(渤海世纪)') {
                            //折线图
                            x.push('FPSO');
                            y.push(list[i].mineStaff);//waterTimeRate
                            y1.push(list[i].littleSum);
                        } else {
                            //折线图
                            x.push(list[i].prodPlatFormName.substr(7, 4));
                            y.push(list[i].mineStaff);//waterTimeRate
                            y1.push(list[i].littleSum);
                        }
                    }
                }

                //柱图
                this.histogram.series[0].data = y;
                this.histogram.series[1].data = y1;
                this.histogram.xAxis[0].data = x;
            })
        },

    },
};
</script>
<style lang="less" scoped>

::v-deep.el-table .el-table__footer-wrapper .cell {
    color: rgb(174, 178, 179);
    font-weight: bolder;
}

.pertable thead .el-table-column--selection .cell {
    display: none;
}
</style>
