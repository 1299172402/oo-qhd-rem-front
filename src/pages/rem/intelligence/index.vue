<template>
    <!-- 智能注采调配首页 -->
    <!-- 每一个echarts请求都增加了最后一个死数据，有的echarts请求是直接写死，变量注释了，剩余油情况放了一张图片-->
    <!-- 智能注采调配首页 -->
    <div class="app-container" style="height:100%">
        <header-search>
            <div class="my-5" style="margin:20px 0">
                <span>油田：</span>
                <el-select
                    v-model="queryData.ogfId"
                    class="f2"
                    filterable
                    clearable
                    disabled
                    style="width:180px"
                    @change="changeOil"
                >
                    <el-option
                        v-for="item in oilList"
                        :key="item.ogfId"
                        :label="item.ogfName"
                        :value="item.ogfId"
                    ></el-option>
                </el-select>
                <span>区块：</span>
                <el-select v-model="queryData.blockId">
                    <el-option
                        v-for="item in blockList"
                        :key="item.blockId"
                        :label="item.blockName"
                        :value="item.blockId"
                    ></el-option>
                </el-select>
                <span>时间：</span>
                <el-date-picker
                    v-model="queryData.dateTime"
                    type="month"
                    placeholder="请选择"
                    value-format="yyyy-MM"
                    :picker-options="pickOptions"
                ></el-date-picker>
                <el-button
                    @click="searchList"
                    icon="el-icon-search"
                    type="primary"
                    style="margin-left: 20px"
                >搜索
                </el-button>
                <el-button
                    v-if="this.$route.query.link == 'remHome'"
                    @click="returnBack"
                    type="primary"
                    style="margin-left: 20px;float: right"
                >返回
                </el-button>
            </div>
        </header-search>
        <div style="display: flex;justify-content: space-around; height: 100%;">
            <div style="flex:4; height: 118%; margin-right: 15px;">
                <page-panel :header-title="title" style=" height: 100% " :show-btn="true">
                    <el-row :gutter="20" style="margin-bottom: 10px;">
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <div class="yield water">
                                    <div class="box">
                                        <div>{{ groupBlock.waterProd }}</div>
                                        <div>10⁴m³</div>
                                    </div>
                                </div>
                                <div class="text">产水量</div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <div class="yield oil">
                                    <div class="box">
                                        <div>{{ groupBlock.oilProd }}</div>
                                        <div>10⁴m³</div>
                                    </div>
                                </div>
                                <div class="text">产油量</div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <div class="yield gas">
                                    <div class="box">
                                        <div>{{ groupBlock.gasProd }}</div>
                                        <div>10⁴m³</div>
                                    </div>
                                </div>
                                <div class="text">产气量</div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <div class="yield liquid">
                                    <div class="box">
                                        <div>{{ groupBlock.fluidProd }}</div>
                                        <div>10⁴m³</div>
                                    </div>
                                </div>
                                <div class="text">产液量</div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <Echart
                                    :chart-data="getEchartData(groupBlock.injAlloc, '10⁴m³', 'rgb(59,197,197)', 'rgb(59,197,197)', 'rgb(59,197,197)')"
                                ></Echart>
                                <div class="chartText">配注量</div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <Echart
                                    :chart-data="getEchartData(groupBlock.inj, '10⁴m³', 'rgb(13,190,124)', 'rgb(1,67,78)', 'rgb(13,190,124)')"
                                ></Echart>
                                <div class="chartText">注水量</div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <Echart
                                    :chart-data="getEchartData(groupBlock.oilWellNum, '口', 'rgb(247,181,0)', 'rgb(41,72,94)', 'rgb(247,181,0)')"
                                ></Echart>
                                <div class="chartText">油井总井数</div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <Echart
                                    :chart-data="getEchartData(groupBlock.waterWellNum, '口', 'rgb(36,151,194)', 'rgb(7,59,90)', 'rgb(36,151,194)')"
                                ></Echart>
                                <div class="chartText">水井总井数</div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <Echart
                                    :chart-data="getEchart(groupBlock.openOilNUm, '口', 'rgb(0,179,225)', 'rgb(38,43,90)', 'transparent')"
                                ></Echart>
                                <div class="chartText">油井开井数</div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <Echart
                                    :chart-data="getEchart(groupBlock.openWaterNum, '口', 'rgb(235,125,96)', 'rgb(38,43,90)', 'transparent')"
                                ></Echart>
                                <div class="chartText">水井开井数</div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <Echart
                                    :chart-data="getEchart(groupBlock.injRatio, '', 'rgb(164,227,77)', 'rgb(38,43,90)', 'transparent')"
                                ></Echart>
                                <div class="chartText">注采比</div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <Echart
                                    :chart-data="getEchart(groupBlock.haveWater, '%', 'rgb(185,75,215)', 'rgb(38,43,90)', 'transparent')"
                                ></Echart>
                                <div class="chartText">含水</div>
                            </div>
                        </el-col>
                    </el-row>
                </page-panel>
            </div>

            <div style="flex:4; height: 118%; margin-right: 15px;">
                <page-panel header-title="分层注采量" style="height: 100%;position: relative; " :show-btn="true">
                    <button class="detailLinkBtn" @click="getDetail">详细</button>
                    <div id="main" style="width: 100%; height: 100%"></div>
                </page-panel>
            </div>

            <div style="width: 33%;height: 118%;display:flex;flex-direction: column;justify-content: space-between;">
                <div style="height:calc(60% - 15px);margin-bottom: 15px;">
                    <page-panel header-title="单井井底流压" style="height: 100%;" :show-btn="true">
                        <button class="detailLinkBtn" @click="detailed = true">详细</button>
                        <Echart
                            :chart-data="getResidueOilChart()"
                            height="100%"
                            style="height: 100%!important;"
                        >
                        </Echart>
                    </page-panel>
                    <el-dialog :visible.sync="detailed" title="单井井底流压">
                        <el-table :data="residueOil" height="600">
                            <el-table-column prop="date" label="序号" align="center" width="80">
                                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                            </el-table-column>
                            <el-table-column prop="wellNo" label="井号" align="center">
                            </el-table-column>
                            <el-table-column prop="dhFlowingPress" label="井底流压(MPa)" align="center">
                            </el-table-column>
                            <el-table-column prop="fluidProdDaily" label="日产液量(m³/d)" align="center">
                            </el-table-column>
                        </el-table>
                    </el-dialog>
                </div>
                <div style="height:40%">
                    <page-panel header-title="超欠注情况统计" style="height: 100%;" :show-btn="true">
                        <el-table
                            :data="tableData"
                            height="100%"
                            style="width: 100%"
                            :header-cell-style="headerColor"
                        >
                            <el-table-column prop="date" label="序号" align="center" width="50">
                                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                            </el-table-column>
                            <el-table-column prop="wellName" label="井号" width="130"
                                             align="center"></el-table-column>
                            <el-table-column prop="productionIntervalNo" label="层位" align="center" width="200">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.productionIntervalNo }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="injPump" label="注水工况" align="center" >
                                <template slot-scope="scope">
                                    <span>{{ scope.row.injPump }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="overflowInj" align="center" width="90">
                                <template slot="header">
                                    超/欠注量<br/>(m³/d)
                                </template>
                                <template slot-scope="scope">
                                    <span>{{ scope.row.overflowInj }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="dayNum" label="天数?(d)" :render-header="renderheader"
                                             width="70" align="center"></el-table-column>
                            <el-table-column prop="injAllocRatio" label="比例?(%)" :render-header="renderheader"
                                             width="70" align="center"></el-table-column>
                        </el-table>
                    </page-panel>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as echarts from 'echarts';
// import echarts from "echarts";
import Echart from "@/components/tools/Echarts/index.vue";
import {
    getUltraShortShotStatistics,
    getWellGroupBlock,
    getStratifiedInjectionDetails,
    getResidueOilCondotion
} from "@/api/rem/r-intelligentIPA.js";
import queryConditionMixin from "@/mixins/queryConditionMixin.js";

export default {
    name:'index',
    components: {
        Echart
    },
    mixins: [queryConditionMixin],
    data() {
        return {
            baseUrl: process.env.NODE_ENV == "production" ? '/rem/' : '/',
            queryData: {
                //区块
                blockId: 'YCFXDY8B643EDC9007F96F570600457D',
                //选择时间
                dateTime: this.eeee(),
                //油田
                ogfId: '3FC9A818F5BC43B88270DB80BBB3018F'
            },
            title: '',
            //左侧数据
            groupBlock: {},
            //超欠注情况
            tableData: [],
            detailed: false,
            dataList: [],
            injList: [],
            injAllocList: [],
            fluidProdList: [],
            pickOptions: {
                disabledDate: (time) => {
                    const date = new Date(time)
                    const date1 = new Date()
                    return date.getTime() > date1.getTime()
                }
            },
            residueOil: [],
            ResidueOilRank: [],
        }
    },
    mounted() {
        this.searchList()
    },
    methods: {
        returnBack(){
            this.$router.go(-1)
        },
        renderheader(h, {column, $index}) {
            return h('span', {}, [
                h('span', {}, column.label.split('?')[0]),
                h('br'),
                h('span', {}, column.label.split('?')[1])
            ]);
        },
        eeee() {
            let data = new Date()
            if (data.getMonth() < 10) {
                return data.getFullYear() + '-0' + (data.getMonth() + 1)
            } else {
                return data.getFullYear() + '-' + (data.getMonth() + 1)
            }
        },
        headerColor({row, column, rowIndex, columnIndex}) {
            if (rowIndex === 0) {
                return "color:#66ffff"
            }
        },
        /**
         * 获取数据
         */
        searchList() {
            if (!this.queryData.dateTime) {
                return this.$message.error('请输入时间')
            }
            //左侧区块
            this.queryWellGroupBlock()
            //分层注采量
            this.queryStratifiedInjectionDetails()
            //超欠注情况统计
            this.queryUltraShortShotStatistics()
            this.blockList.forEach(item => {
                if (item.blockId == this.queryData.blockId) {
                    this.title = item.blockName
                }
            });
            let params = {
                blockId: this.queryData.blockId,
                yearMonth: this.queryData.dateTime,
            }
            getResidueOilCondotion(params).then(res => {
                try {
                    this.residueOil = res.map(item => {
                        item.dhFlowingPress = item.dhFlowingPress ? Number(item.dhFlowingPress).toFixed(1) : '';
                        item.fluidProdDaily = item.fluidProdDaily ? Math.round(item.fluidProdDaily) : '';
                        return item;
                    });
                } catch (e) {
                }

                this.ResidueOilRank = res.slice(0, 10);
                this.ResidueOilRank.sort((a, b) => a.dhFlowingPress - b.dhFlowingPress)
                console.log(this.ResidueOilRank)
            })
        },
        //左侧区块
        queryWellGroupBlock() {
            getWellGroupBlock(this.queryData).then((res) => {
                res.injRatio = Number(res.injRatio).toFixed(1)
                res.haveWater = Number(res.haveWater).toFixed(1)
                res.waterProd = Number(res.waterProd).toFixed(2)
                res.oilProd = Number(res.oilProd).toFixed(2)
                res.gasProd = Number(res.gasProd).toFixed(2)
                res.fluidProd = Number(res.fluidProd).toFixed(2)
                res.injAlloc = Number(res.injAlloc).toFixed(2)
                res.inj = Number(res.inj).toFixed(2)
                this.groupBlock = res
                this.getEchartData()
                this.getEchart()
            })
        },

        //分层注采量
        queryStratifiedInjectionDetails() {

            let params = {
                blockId: this.queryData.blockId,
                startTime: this.queryData.dateTime,
                timeStatus: '1',
                type: 1
            }
            getStratifiedInjectionDetails(params).then((res) => {
                this.dataList = []
                this.injList = []
                this.injAllocList = []
                this.fluidProdList = []
                res.forEach((item) => {
                    if(item.productionIntervalNo){
                        this.dataList.push(String(item.productionIntervalNo))
                        this.injList.push(Number(item.inj).toFixed(2))
                        this.injAllocList.push(Number(item.injAlloc).toFixed(2))
                        this.fluidProdList.push(Number(item.fluidProd).toFixed(2))
                    }
                })
                this.getMainEchart()
            })
        },

        //超欠注情况统计
        queryUltraShortShotStatistics() {
            getUltraShortShotStatistics(this.queryData).then((res) => {
                console.log(res)
                this.tableData = res.ultraShortShotData
            })
        },
        getResidueOilChart() {
            let option = {
                legend: {
                    textStyle: {
                        color: "#66ffff"
                    },
                    bottom: "bottom",
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '10%',
                    right: '15%',
                    bottom: '15%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'value',
                    name: '日产液量',
                    nameTextStyle: {
                        color: '#a9a8a8'
                    },
                    axisLine:{
                        show:true
                    },
                    interval: 400,
                    axisLabel: {
                        color: '#a9a8a8'
                    }
                }, {
                    type: 'value',
                    name: '井底流压',
                    nameTextStyle: {
                        color: '#a9a8a8'
                    },
                    axisLine:{
                        show:true
                    },
                    axisLabel: {
                        color: '#a9a8a8'
                    }
                }],
                yAxis: {
                    type: 'category',
                    data: [],
                    axisLabel: {
                        color: '#a9a8a8'
                    }
                }
            };
            if (!this.ResidueOilRank) {
                return option
            } else {
                option.yAxis.data = this.ResidueOilRank.map(item => item.wellNo)
                option.series = [
                    {
                        name: '井底流压(MPa)',
                        type: 'bar',
                        xAxisIndex: 1,
                        color: 'rgb(9,141,234)',
                        data: this.ResidueOilRank.map(item => Number(item.dhFlowingPress).toFixed(1)),
                    },
                    {
                        name: '日产液量(m³/d)',
                        type: 'bar',
                        xAxisIndex: 0,
                        color: 'rgb(4,182,131)',
                        data: this.ResidueOilRank.map(item => Math.round(Number(item.fluidProdDaily)))
                    }
                ]
            }
            return option
        },
        //图表
        getEchartData(value, unit, valueColor, backColor, centerColor, data) {
            var option = {
                tooltip: {
                    trigger: value,
                    formatter: unit,
                },
                series: [
                    {
                        type: 'pie',
                        selectedMode: 'single',
                        radius: [0, '75%'],
                        color: centerColor,
                        label: {
                            fontSize: 10,
                        },
                        data: [
                            {value: 0, name: value, label: {color: 'white', position: 'center'}},
                            {value: 1, name: unit, label: {color: 'white', position: 'inner'}},
                        ]
                    },
                    {
                        type: 'pie',
                        color: [valueColor, backColor],
                        radius: ['95%', '85%'],
                        labelLine: {
                            length: 30
                        },
                        label: {
                            show: false
                        },
                        data: [
                            {value: 335, name: 'Direct'},
                            {value: 102, name: 'Others'}
                        ]
                    }
                ]
            };
            return option;

            // option && myChart.setOption(option);
        },

        //图表
        getEchart(value, unit, valueColor, backColor, centerColor, data) {
            var option = {
                tooltip: {
                    trigger: value,
                    formatter: unit,
                },
                series: [
                    {
                        type: 'pie',

                        selectedMode: 'single',
                        radius: [0, '75%'],
                        color: centerColor,
                        label: {
                            fontSize: 10,
                        },
                        data: [
                            {value: 0, name: value, label: {color: '#a9a8a8', position: 'center'}},
                            {value: 1, name: unit, label: {color: '#a9a8a8', position: 'inner'}},
                        ]
                    },
                    {
                        type: 'pie',
                        color: [valueColor, backColor, 'transparent'],
                        radius: ['95%', '85%'],
                        startAngle: 180,
                        labelLine: {
                            length: 30
                        },
                        label: {
                            show: false
                        },
                        data: [
                            {value: 9, name: 'Others'},
                            {value: 1, name: 'Direct'},
                            {value: 10, name: '528'},

                        ]
                    }
                ]
            };
            return option;

            // option && myChart.setOption(option);
        },

        //图表
        getMainEchart() {
            let chartDom = document.getElementById('main');
            let myChart = echarts.init(chartDom);
            let option;

            option = {
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    textStyle: {
                        color: "#66ffff"
                    },
                    bottom: "bottom",
                },
                grid: {
                    left: '10%',
                    right: '10%',
                    top: '5%',
                    bottom: '5%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 1],
                    axisLabel: {
                        color: '#a9a8a8'
                    }
                },
                yAxis: {
                    type: 'category',
                    data: this.dataList,
                    axisLabel: {
                        color: '#a9a8a8'
                    }
                },
                series: [
                    {
                        name: '月注水量(10⁴m³)',
                        type: 'bar',
                        color: 'rgb(9,141,234)',
                        data: this.injList,
                    },
                    {
                        name: '月配注量(10⁴m³)',
                        type: 'bar',
                        color: 'rgb(4,182,131)',
                        data: this.injAllocList
                    },
                    {
                        name: '月产液量(10⁴m³)',
                        type: 'bar',
                        color: 'rgb(255,156,70)',
                        data: this.fluidProdList
                    }
                ]
            };

            option && myChart.setOption(option);

        },

        //分层注采量详情
        getDetail() {
            localStorage.setItem('INTELLIGENCE', JSON.stringify(this.queryData))
            this.$router.push({name: 'intelligenceDetail', params: this.queryData})
        }
    }
}
</script>
<style lang="scss" scoped>
::v-deep .el-radio-button .el-radio-button__inner {
    padding: 10px 5px;
    border-radius: 4px 4px 4px 4px;
    width: 100%;
    background: rgba(143, 164, 204, 0.3);
    // overflow: hidden;
    // text-overflow: ellipsis;
    // white-space: nowrap;
}

.condationRow {
    height: 30px;
    line-height: 30px;
    margin-bottom: 0px;
    font-size: 14px;
}

.checkBtn {
    width: 100px;
    height: 20px;
    text-align: center;
    background: #387dff;
}

.about1 {
    background: #103986;
    background: rgb(2, 43, 117);
}

.about {
    width: 100px;
    height: 20px;
    text-align: center;
    background: #103986;
    background: rgba(56, 125, 255, 0.5);
}

.noCheckBtn {
    width: 100px;
    height: 20px;
    text-align: center;
    background: rgba(143, 164, 204, 0.3);
}

::v-deep .editInput {
    width: 100%;
}

::v-deep .title_1 {
    display: inline-block;
    text-align: center;
}

::v-deep .checkButton {
    width: 100%;
    margin-top: 5px;
}

::v-deep .el-radio-button:last-child .el-radio-button__inner {
    border-radius: 0 0px 0px 0;
    font-size: 14px;
}

::v-deep .cardLeft {
    height: 40px;
    width: 100%;
}

.el-card {
    border-image: linear-gradient(
            90deg,
            rgba(116, 190, 243, 0),
            rgba(75, 241, 255, 0.5),
            rgba(116, 190, 243, 0)
    ) 1 1;
    color: #00d6ea;
    font-weight: bold;
    background: rgba(143, 164, 204, 0.16);

    ::v-deep .el-card__body {
        padding: 0;
        line-height: 40px;
        text-align: center;
    }
}

::v-deep .screenBtn {
    height: 30px;
    margin-left: 10px;
}

::v-deep .el-radio-group .el-radio-button {
    width: 100%;
    border: none;
}

//选中颜色
::v-deep .test .el-radio-group .el-radio-button.is-active {
    width: 100%;
    background: #387dff;
}

.my-5 {
    & > *:not(span) {
        margin-right: 10px;
    }

    & > span {
        margin-right: 4px;
    }
}

::v-deep .el-table thead.is-group th {
    background: transparent;
}

.yield {
    height: 111px;
    border: 1px solid rgb(32, 112, 224);
    border-radius: 5px;
    text-align: center;

    .box {
        margin-top: 40px;
    }
}

.water {
    background-color: rgb(36, 176, 239);
}

.oil {
    background-color: rgb(25, 120, 227);
}

.gas {
    background-color: rgb(148, 56, 244);
}

.liquid {
    background-color: rgb(24, 121, 228);
}

.text {
    margin-top: 10px;
    height: 42px;
    border: 1px solid rgb(32, 112, 224);
    text-align: center;
    line-height: 42px;
    box-shadow: 0px 0px 15px #66ffff inset;
}

.chart {
    // margin-top: 10px;
    height: 120px !important;
    border-radius: 5px;
    text-align: center;
    line-height: 120px;
}

.chartText {
    margin-top: 10px;
    height: 42px;
    border: 1px solid rgb(32, 112, 224);
    text-align: center;
    line-height: 42px;
    box-shadow: 0px 0px 15px #66ffff inset;
}
.detailLinkBtn {
    position: absolute;
    right: 60px;
    top: 5px;
    width: 50px;
    height: 20px;
    background: linear-gradient(90deg, #0751b0, #50a6ec);
    text-align: center;
    font-size: smaller;
    border: 0;
    cursor: pointer;
    color: #ffffff;
}
</style>

