<template>
    <div class="app-container" style="height: 100%">
        <div style="display: flex;flex-direction: row; height: 100%;">
            <div style="display: flex;flex-direction: column;  height:100%;margin-left: 15px; flex:1;  right: 0; overflow: hidden;">
                <headerSearch>
                    <el-form :inline="true" style="margin-top: 18px;text-align: left;">
                        <el-form-item label="油田：">
                            <el-select v-model="queryData.ogfId" @change="choicepla">
                                <el-option :label="oilFields[0].ogfName" :value="oilFields[0].ogfId"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="平台：" prop="pt">
                            <el-select v-model="queryData.pt" @change="onPlatfromChange">
                                <el-option v-for="item in platforms" :key="item.platformId" :label="item.platformCode" :value="item.platformId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="井号：">
                            <el-select v-model="queryData.wellId">
                                <el-option v-for="(item, index) in wells" :key="item.wellId" :label="item.wellName" :value="item.wellName">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="searchForOilField()" icon="el-icon-search">搜索
                            </el-button>
                            <el-button @click="drawer = true" type="primary" class="button_last">数据/模型更新</el-button>
                        </el-form-item>

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
import { queryDensityInfo, waterWarning } from "@/api/horizontalWell/horizontalWell.js";
import Echart from "@/components/tools/Echarts/index.vue";
import { exportExcel } from "@/lib/exportExcel";
import {
    QueryOgfDetail,
    QueryPlatformDetail,
    QueryWellDetail, userListByUserNames
} from "@/api/basic/master";
export default {
    data() {
        return {
            queryData: {
                assetCode: "",
                month: new Date().format("yyyy-MM"),
                ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
                // wellId: "09D30C16BD1D4F759D53F74941701307",
                wellId: "",
                orgId: "715AD1CD60484BB59E737CD18A9DE44A",
                pt: "",
            },
            wells: [],
            platforms: [],
            oilFields: [{ogfName:''}],

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
                        return (Number(value.min) * 0.8).toFixed(3);
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
    watch: {
        queryData: {
            handler(val) {
                let obj = {};
                obj = this.wells.find((item) => {
                    return item.wellId === val.wellId;
                });
                this.wellName = obj?.wellName
            },
            deep: true,
        }
    },
    components: {
        Echart,
    },
    mounted() {
        this.getList();
    },
    methods: {
        async searchForOilField() {
            let queryParams = {
                well_name: this.queryData.wellId.replace('QHD32-6-','')
                // well_name: 'H15H',
            }
            // let waterWarningValue = {
            //     // well_name: this.queryData.wellId.replace('QHD32-6-',''),
            //     well_name: 'H3H',
            //     n1: this.alarm_n[0],
            //     n2: this.alarm_n[1],
            //     n3: this.alarm_n[2],
            //     n4: this.alarm_n[3],
            // }
            await queryDensityInfo(queryParams).then((res) => {
                this.waterpercentChart(res.data.data)
            });
            // await waterWarning(waterWarningValue).then((res) => {
            //     this.updateValue(res)
            //     // console.log(res)
            // })
            this.updateThreshold()
        },
        async updateThreshold() {
            let waterWarningValue = {
                // well_name: "H15H",
                well_name: this.queryData.wellId.replace('QHD32-6-',''),
                n1: this.alarm_n[0],
                n2: this.alarm_n[1],
                n3: this.alarm_n[2],
                n4: this.alarm_n[3],
            }
            await waterWarning(waterWarningValue).then((res) => {
                this.updateValue(res)
            })
        },
        updateValue(res) {
            // res.date.unshift('')
            // res.differences.unshift(null)
            // this.waterWarningDiff.xAxis[0].data = res.date
            let DiffValue = res.differences
            // console.log(res)
            this.waterWarningDiff.series[0].data = DiffValue
            this.waterWarninglimit = res.threshold
            this.waterWarningDiff.series[1].data = []
            this.waterWarningDiff.series[1].data = [...Array(17)].map(() => res.threshold);
            this.waterWarningDiff.series[1].data.unshift(null)
            // this.waterWarningDiff.xAxis[0].data.unshift('')
            this.waterWarningDiff.series[0].data.unshift(null)
            this.yujingjieguo = res.alarmTime.map(item =>{
                return {
                    ...item,
                    diff:(item.diff * 100).toFixed(2),
                    liquid:(item.liquid * 100).toFixed(2),
                    pressure:(item.pressure * 100).toFixed(2),
                    waterpercent:(item.waterpercent * 100).toFixed(2),
                }
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
        getList() {
            //获取作业公司
            let params = {
                searchKeys: [this.$store.getters["user/userDetail"].user.userName],
            }
            userListByUserNames(params).then((res) => {
                this.queryData.orgId = (res.data.data[0]?.currentTenantBindOrgId) ? res.data.data[0].currentTenantBindOrgId : undefined;
            })
            //根据作业公司查询油田
            QueryOgfDetail({ operationZoneId: this.queryData.orgId }).then(res => {
                this.oilFields = res.data.data
            })
            //根据油田查询平台列表
            QueryPlatformDetail({ ogfId: this.queryData.ogfId }).then(res => {
                this.platforms = res.data.data
                this.queryData.pt = this.platforms[0].platformId;
                QueryWellDetail({ platformId: this.queryData.pt }).then((res) => {
                    this.wells = res.data.data
                    if (this.wells.length == 0) {
                        this.queryData.wellId = this.wells[0].wellName;
                    }
                    if (this.wells.length > 0) {
                        this.queryData.wellId = this.wells[1].wellName;
                    }
                })
            })
        },

        choicepla(val) {
            QueryPlatformDetail({ ogfId: val }).then(res => {
                this.platforms = res.data.data
                this.queryData.pt = this.platforms[0].platformId;
                QueryWellDetail({ platformId: this.queryData.pt }).then((res) => {
                    this.wells = res.data.data
                    this.queryData.wellId = this.wells[0].wellName
                })
            })
        },

        async onPlatfromChange(val) {
            await QueryWellDetail({ platformId: val, ogfId: this.queryData.ogfId }).then((res) => {
                this.wells = res.data.data
                this.queryData.wellId = this.wells[0]?.wellName
            })
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