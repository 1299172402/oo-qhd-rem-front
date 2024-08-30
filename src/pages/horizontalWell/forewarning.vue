<template>
    <div class="app-container" style="height: 100%">
        <div style="display: flex;flex-direction: row; height: 100%;">
            <div style="display: flex;flex-direction: column;  height:100%;margin-left: 15px; flex:1;  right: 0; overflow: hidden;">
                <headerSearch>
                    <el-form :model="queryParams" :inline="true" style="margin-top: 18px;text-align: left;">
                        <el-form-item label="油田：">
                            <el-select v-model="queryParams.oil_field" placeholder="请选择油田" clearable size="small" style="width: 240px">
                                <el-option v-for="(item, index) in oil_field_list" :key="index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="平台：">
                            <el-select v-model="queryParams.platform" placeholder="请选择平台" clearable size="small" style="width: 240px">
                                <el-option v-for="(item, index) in platform_list" :key="index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="井号：">
                            <el-select v-model="queryParams.well_num" placeholder="请选择井号" clearable size="small" style="width: 240px">
                                <el-option v-for="(item, index) in well_num_list" :key="index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-button icon="el-icon-search" type="primary" style="margin-left: 20px" @click="searchForOilField">查询</el-button>
                        <el-button @click="drawer = true" type="primary" class="button_last">数据/模型更新</el-button>
                        <t-drawer :footer="false" header="数据上传" :visible.sync="drawer" placement="left" :close-btn="true" size="60%">

                            <el-card style="margin-top:2vh">
                                <div slot="header" class="clearfix">
                                    <span>含水率预警界限表</span>
                                </div>

                                <el-table :span-method="objectSpanMethod" :data="water_alarm_table" style="width: 100%;" :header-cell-style="{ backgroundColor: 'rgb(0,55,94)', color: 'rgb(54, 201, 234)', fontSize: '14px' }">
                                    <el-table-column label="井类别">
                                        <template slot-scope="scope">
                                            <span>{{ (scope.row.jingleibie) }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="低含水期σ">
                                        <template slot-scope="scope">
                                            <div v-if="scope.$index == 3">
                                                <el-input v-model="alarm_n[0]" size="small" />
                                            </div>
                                            <div v-else>{{ (scope.row.dihanshuiqi) }}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="中含水期σ">
                                        <template slot-scope="scope">
                                            <div v-if="scope.$index == 3">
                                                <el-input v-model="alarm_n[1]" size="small" />
                                            </div>
                                            <div v-else>{{ (scope.row.zhonghanshuiqi) }}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="高含水期σ">
                                        <template slot-scope="scope">
                                            <div v-if="scope.$index == 3">
                                                <el-input v-model="alarm_n[2]" size="small" />
                                            </div>
                                            <div v-else>{{ (scope.row.gaohanshuiqi) }}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="特高含水期σ">
                                        <template slot-scope="scope">
                                            <div v-if="scope.$index == 3">
                                                <el-input v-model="alarm_n[3]" size="small" />
                                            </div>
                                            <div v-else>{{ (scope.row.tegao) }}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="阈值">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.yuzhi }}</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-card>
                            <el-card style="margin-top:2vh">
                                <div slot="header" class="clearfix">
                                    <span>含水率阈值计算结果
                                    </span>
                                </div>
                                <el-table :data="water_cal" max-height="400px" style="margin-top: 0vh;" :header-cell-style="{ backgroundColor: 'rgb(0,55,94)', color: 'rgb(54, 201, 234)', fontSize: '14px' }">
                                    <el-table-column label="井类别">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.jingleibie }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="低含水期阈值">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.dihanshuiqi }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="中含水期阈值">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.zhonghanshuiqi }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="高含水期阈值">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.gaohanshuiqi }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="特高含水期阈值">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.tegao }}</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-button type="primary" style="margin-top: 20px" @click="updateThreshold">更新阈值</el-button>

                            </el-card>


                        </t-drawer>
                    </el-form>
                </headerSearch>
                <div style="overflow-y:scroll;overflow-x: hidden;padding-bottom: 1%;">
                    <div style="height: 95vh;margin-bottom: -12vh;">
                        <page-panel headerTitle="预警曲线" :show-btn="true">
                            <div style="height:85vh">
                                <el-button icon="el-icon-download" type="primary" style="margin-bottom: 20px" @click="downEchartdown">下载</el-button>
                                <el-row>
                                    <Echart ref="waterWarning" :chart-data="waterWarningDiff" height="580px"></Echart>
                                </el-row>
                            </div>
                        </page-panel>
                    </div>
                    <page-panel headerTitle="预警结果记录表" :show-btn="true">
                        <el-row>
                            <el-button style="float: right" type="primary" icon="el-icon-download" @click="doDownExcel()">下载</el-button>
                        </el-row>
                        
                        <el-table id="yjjgjlb" :data="yujingjieguo" max-height="450px" :header-cell-style="{ backgroundColor: 'rgb(0,55,94)', color: 'rgb(54, 201, 234)', fontSize: '14px' }">
                            <el-table-column label="日期">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.date }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="含水率(%)">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.waterpercent }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="压力(MPa)">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.pressure }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="日产液量(㎡/d)">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.liquid }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="含水率变化量(%)">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.diff }}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </page-panel>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import LogoFull from "@/assets/logo.svg";
import { queryDensityInfo, waterWarning } from "@/api/horizontalWell/horizontalWell.js";
import Echart from "@/components/tools/Echarts/index.vue";
import { exportExcel } from "@/lib/exportExcel";
export default {
    data() {
        return {
            queryParams: {
                oil_field: '',
                platform: '',
                well_num: '',
            },
            oil_field_list: [{
                value: '选项1',
                label: '秦皇岛32-6'
            }, {
                value: '选项2',
                label: '秦皇岛32-7'
            }, {
                value: '选项3',
                label: '秦皇岛32-8'
            }],

            platform_list: [{
                value: '选项1',
                label: '平台1'
            }, {
                value: '选项2',
                label: '平台2'
            }, {
                value: '选项3',
                label: '平台3'
            }],

            well_num_list: [{
                value: '选项1',
                label: '井1'
            }, {
                value: '选项2',
                label: '井2'
            }, {
                value: '选项3',
                label: '井3'
            }],
            alarm_n: [1, 1, 1, 1],
            // r4c1: '',
            // r4c2: '',
            // r4c3: '',
            // r4c4: '',
            drawer: false,
            waterWarninglimit: 0,
            waterWarningDiff: {
                title: [{
                    gridIndex: 0,
                    text: '含水率变化量%(与前一月相比)',
                    left: '39%',
                    textStyle: {
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'normal',
                    },
                }, {
                    gridIndex: 1,
                    text: '含水率%',
                    left: '45%',
                    top: '38%',
                    textStyle: {
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'normal',
                    },
                },],
                color: ["#00f2f1", "#ed3f35", "#00EC00", "#9f35ff", "#FFD306", "#FFD306"],
                tooltip: {
                    trigger: "axis",
                },

                axisPointer: {
                    link: {
                        xAxisIndex: "all",
                        yAxisIndex: "all",
                    },
                },

                legend: {
                    formatter: function (name) {
                        if (name === '含水率变化量（%）') {
                            return '真实值';
                        } else if (name === '预警') {
                            return name;
                        } else {
                            return '预测值';
                        }
                    },
                    top: "0%",
                    textStyle: {
                        color: "#4c9bfd"
                    },
                    right: "10%"
                },
                xAxis: [{
                    gridIndex: 0,
                    name: '时间',
                    nameTextStyle: {
                        color: "#4c9bfd",
                        padding: [0, 0, 0, 0],
                        lineHeight: 30,
                    },
                    type: "category",
                    boundaryGap: false,
                    data: [],
                    axisTick: {
                        show: true
                    },
                    axisLabel: {
                        color: "#4c9bfd"
                    },
                    axisLine: {
                        show: false
                    }
                }, {
                    gridIndex: 1,
                    name: '时间',
                    nameTextStyle: {
                        color: "#4c9bfd",
                        padding: [0, 0, 0, 0],
                        lineHeight: 30,
                    },
                    type: "category",
                    boundaryGap: false,
                    data: [],
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: "#4c9bfd"
                    },
                    axisLine: {
                        show: false
                    }
                },],
                grid: [
                    { x: "6%", y: "5%", width: "90%", height: "26%" },
                    { x: "6%", y: "48%", width: "90%", height: "26%" },
                ],
                yAxis: [{
                    gridIndex: 0,
                    min: function (value) {
                        return value.min.toFixed(3);
                    },
                    type: "value",
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: "#4c9bfd"
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: "#012f4a"
                        }
                    },
                }, {
                    gridIndex: 1,
                    min: function (value) {
                        return value.min.toFixed(3);
                    },
                    name: '%',
                    nameTextStyle: {
                        color: "#4c9bfd"
                    },
                    type: "value",
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: "#4c9bfd"
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            color: "#012f4a" // 分割线颜色
                        }
                    },
                },],
                series: [
                    {
                        name: '含水率变化量（%）',
                        type: 'line',
                        smooth: true,
                        data: [],
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        symbol: (param, ob) => {
                            if (ob.dataIndex > 11) {
                                if (param >= this.waterWarninglimit) {
                                    return 'diamond'
                                } else {
                                    return 'circle'
                                }
                            }
                        },
                        symbolSize: (param, ob) => {
                            if (ob.dataIndex > 11) {
                                if (param >= this.waterWarninglimit) {
                                    return 20
                                } else {
                                    return 10
                                }
                            }
                        },
                        itemStyle: {
                            color: (param) => {
                                if (param.dataIndex > 11) {
                                    if (param.value >= this.waterWarninglimit) {
                                        return 'red'
                                    } else {
                                        return '#00f2f1'
                                    }
                                }
                            },
                            borderWidth: 1, //拐点边框大小
                        },
                    },
                    {
                        name: '预警',
                        type: 'line',
                        smooth: true,
                        data: [],
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                    },
                    {
                        name: '含水率（%）',
                        type: 'line',
                        smooth: true,
                        data: [],
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                    },

                ],
                visualMap: {
                    type: 'piecewise',
                    show: false,
                    seriesIndex: [0, 2],
                    dimension: 0,
                    pieces: [
                        {
                            lte: 11,
                            color: '#00f2f1'
                        },
                        {
                            gt: 11,
                            lte: 18,
                            color: '#00EC00'
                        },

                    ]
                },
            },
            yujingjieguo: [],
            water_alarm_table: [{
                jingleibie: '一类井',
                dihanshuiqi: '3.08',
                zhonghanshuiqi: '2.54',
                gaohanshuiqi: '0.51',
                tegao: '0.35',
                yuzhi: 'nσ',
            }, {
                jingleibie: '二类井',
                dihanshuiqi: '3.96',
                zhonghanshuiqi: '3.82',
                gaohanshuiqi: '0.48',
                tegao: '0.41',
                yuzhi: '',
            }, {
                jingleibie: '三类井',
                dihanshuiqi: '2.53',
                zhonghanshuiqi: '2.53',
                gaohanshuiqi: '6.54',
                tegao: '0.35',
                yuzhi: '',
            }, {
                jingleibie: '自定义n值',
            }],
            // water_cal: [{
            //     jingleibie: '一类井',
            //     dihanshuiqi: '6',
            //     zhonghanshuiqi: '4',
            //     gaohanshuiqi: '2',
            //     tegao: '1',
            // }, {
            //     jingleibie: '二类井',
            //     dihanshuiqi: '5.7',
            //     zhonghanshuiqi: '4',
            //     gaohanshuiqi: '2',
            //     tegao: '1',
            // }, {
            //     jingleibie: '三类井',
            //     dihanshuiqi: '6.4',
            //     zhonghanshuiqi: '4',
            //     gaohanshuiqi: '2',
            //     tegao: '1',
            // }],
            wach_xAxis: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
            water_change: [
                {
                    name: '含水率变化量（%）',
                    type: 'line',
                    smooth: true,
                    data: [],
                    symbol: function (param, ob) {
                        if (ob.dataIndex > 11) {
                            if (param > 0.3) {
                                return 'diamond'
                            } else {
                                return 'circle'
                            }
                        }
                    },
                    symbolSize: function (param, ob) {
                        if (ob.dataIndex > 11) {
                            if (param > 0.3) {
                                return 20
                            } else {
                                return 10
                            }
                        }
                    },
                    itemStyle: {
                        color: function (param) {
                            if (param.dataIndex > 11) {
                                if (param.value > 0.3) {
                                    return 'red'
                                } else {
                                    return '#00f2f1'
                                }
                            }
                        },
                        borderWidth: 1, //拐点边框大小
                    },
                },
                {
                    name: '预警',
                    type: 'line',
                    smooth: true,
                    data: [],
                },
                {
                    name: '含水率%',
                    type: 'line',
                    smooth: true,
                    data: [],
                },
            ],
            water_intc: [{
                name: '数值',
                type: 'line',
                smooth: true,
                data: [],
            },]
        }
    },
    computed: {
        water_cal() {
            let water_cal = [{}, {}, {}]
            //一类井
            water_cal[0].jingleibie = '一类井'
            water_cal[0].dihanshuiqi = (this.alarm_n[0] * this.water_alarm_table[0].dihanshuiqi).toFixed(2)
            water_cal[0].zhonghanshuiqi = (this.alarm_n[1] * this.water_alarm_table[0].zhonghanshuiqi).toFixed(2)
            water_cal[0].gaohanshuiqi = (this.alarm_n[2] * this.water_alarm_table[0].gaohanshuiqi).toFixed(2)
            water_cal[0].tegao = (this.alarm_n[3] * this.water_alarm_table[0].tegao).toFixed(2)
            //二类井
            water_cal[1].jingleibie = '二类井'
            water_cal[1].dihanshuiqi = (this.alarm_n[0] * this.water_alarm_table[1].dihanshuiqi).toFixed(2)
            water_cal[1].zhonghanshuiqi = (this.alarm_n[1] * this.water_alarm_table[1].zhonghanshuiqi).toFixed(2)
            water_cal[1].gaohanshuiqi = (this.alarm_n[2] * this.water_alarm_table[1].gaohanshuiqi).toFixed(2)
            water_cal[1].tegao = (this.alarm_n[3] * this.water_alarm_table[1].tegao).toFixed(2)
            //三类井
            water_cal[2].jingleibie = '三类井'
            water_cal[2].dihanshuiqi = (this.alarm_n[0] * this.water_alarm_table[2].dihanshuiqi).toFixed(2)
            water_cal[2].zhonghanshuiqi = (this.alarm_n[1] * this.water_alarm_table[2].zhonghanshuiqi).toFixed(2)
            water_cal[2].gaohanshuiqi = (this.alarm_n[2] * this.water_alarm_table[2].gaohanshuiqi).toFixed(2)
            water_cal[2].tegao = (this.alarm_n[3] * this.water_alarm_table[2].tegao).toFixed(2)
            return water_cal
        }
    },
    components: {
        LogoFull,
        Echart,
    },
    methods: {
        async searchForOilField() {
            let queryParams = {
                well_name: "D28H"
            }
            let waterWarningValue = {
                well_name: "D28H",
                n1: this.alarm_n[0],
                n2: this.alarm_n[1],
                n3: this.alarm_n[2],
                n4: this.alarm_n[3],
            }
            await queryDensityInfo(queryParams).then((res) => {
                this.waterpercentChart(res.data.data)
            });
            await waterWarning(waterWarningValue).then((res) => {
                this.updateValue(res)
                // console.log(res)
            })
        },
        updateValue(res) {
            // res.date.unshift('')
            // res.differences.unshift(null)
            // this.waterWarningDiff.xAxis[0].data = res.date
            let DiffValue = res.differences.map(function (item) {
                return (item * 100).toFixed(1)
            })
            console.log(res)
            this.waterWarningDiff.series[0].data = DiffValue
            this.waterWarninglimit = res.threshold
            this.waterWarningDiff.series[1].data = []
            this.waterWarningDiff.series[1].data = [...Array(17)].map(() => res.threshold);
            this.waterWarningDiff.series[1].data.unshift(null)
            // this.waterWarningDiff.xAxis[0].data.unshift('')
            this.waterWarningDiff.series[0].data.unshift(null)
            this.yujingjieguo = res.alarmTime
        },
        async updateThreshold() {
            let waterWarningValue = {
                well_name: "D28H",
                n1: this.alarm_n[0],
                n2: this.alarm_n[1],
                n3: this.alarm_n[2],
                n4: this.alarm_n[3],
            }
            await waterWarning(waterWarningValue).then((res) => {
                this.updateValue(res)
                console.log(res)
            })
        },
        waterpercentChart(data) {
            let waterHistorylist = data.history.waterpercent.map(function (item) {
                return (item * 100).toFixed(1)
            })
            let waterPredictionlist = data.prediction.waterpercent.map(function (item) {
                return (item * 100).toFixed(1)
            })
            this.waterWarningDiff.xAxis[1].data = data.history.date.concat(data.prediction.date);
            this.waterWarningDiff.series[2].data = waterHistorylist.concat(waterPredictionlist);
            this.waterWarningDiff.xAxis[0].data = data.history.date.concat(data.prediction.date);
        },

        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 5) {
                if (rowIndex < 3) {
                    return {
                        rowspan: 3,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 1,
                        colspan: 1
                    };
                }
            }
        },
        downEchartdown() {
            this.$refs.waterWarning.chartDownLoad('含水率预警曲线');
        },
        doDownExcel() {
            exportExcel("#yjjgjlb", "预警结果记录表");
        },
    }
}
</script>
  
<style lang="less" scoped>
.el-table,
.el-table__expanded-cell {
    background-color: #4c515c4a;
}

:deep(.el-table th) {
    color: rgb(54, 201, 234);
    background-color: unset;
}

:deep(.el-table tr) {
    color: rgb(54, 201, 234);
    background-color: unset;
}

/deep/ .el-table tbody tr:hover>td {
    background-color: rgb(12, 112, 143) !important;
    color: #ffffff;
}

.baojingyuzhi {
    display: flex;
    margin-left: 3vw;
    justify-content: left;
    // position: relative;
    // top: 40%;
}
</style>