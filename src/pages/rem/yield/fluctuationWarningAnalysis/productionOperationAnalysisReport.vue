<!-- 产量运行分析报告 -->
<template>
    <div class="app-container">
        <div class="z-container">
            <pagePanelNewNew class="pagePanelNewNew">
                <div class="pagePane-container">
                    <div class="pageHeader" style="width:100%;display: flex;align-items: center;justify-content: space-between;margin-bottom:10px;margin-left: 0;">
                        <span>{{ oilFieldName }}产量分析报告</span>
                        <el-button type="primary" style="height:30px;" @click="$router.go(-1)">返回</el-button>
                    </div>
                    <div class="rowBox">
                        <div class="row" style="margin-right:10px;">
                            <pagePanelNew headerTitle="" style="margin-top:0; height: 400px;" show-btn>
                                <div style="display: flex; justify-content: flex-end;">
                                    <el-button icon="el-icon-download" type="primary" style="margin-bottom: 20px;" @click="doDownExcel('#tableData0', '产量分析报告-数据一')">下载</el-button>
                                </div>
                                <el-table id="tableData0" header-cell-class-name="table_header"  :data="tableDataPtOne" highlight height="calc(100% - 55px)">
                                    <el-table-column prop="platformName" label="平台" align="center" min-width="140" fixed></el-table-column>
                                    <el-table-column prop="dayOutput" :label="'当日\n'+(unitType=='m'?'(m³)':'(t)')" align="center" min-width="140">
                                        <template slot-scope="{ row }">
                                            <span style="display: flex;align-items: center;justify-content: center;">
                                                {{ row.dayOutput | getFixNumberTwo }}
                                                <img src="@/assets/rem/yieId/UP.png" alt="" v-if="row.dayState=='UP'" style="width:26px;height:20px;">
                                                <img src="@/assets/rem/yieId/DOWN.png" alt="" v-if="row.dayState=='DOWN'" style="width:26px;height:20px;">
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="yesterdayOutput" :label="'与前日对比差值\n'+(unitType=='m'?'(m³)':'(t)')" align="center" min-width="160">
                                        <template slot-scope="{ row }">
                                            <span style="display: flex;align-items: center;justify-content: center;">
                                                {{ row.yesterdayOutput |getFixNumberTwo }}
                                                <img src="@/assets/rem/yieId/UP.png" alt="" v-if="row.yesterdayState=='UP'" style="width:26px;height:20px;">
                                                <img src="@/assets/rem/yieId/DOWN.png" alt="" v-if="row.yesterdayState=='DOWN'" style="width:26px;height:20px;">
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="tenDaysOutput" :label="'与前10日对比差值\n'+(unitType=='m'?'(m³)':'(t)')" align="center" min-width="160">
                                        <template slot-scope="{ row }">
                                            <span style="display: flex;align-items: center;justify-content: center;">
                                                {{ row.tenDaysOutput |getFixNumberTwo }}
                                                <img src="@/assets/rem/yieId/UP.png" alt="" v-if="row.tenDaysState=='UP'" style="width:26px;height:20px;">
                                                <img src="@/assets/rem/yieId/DOWN.png" alt="" v-if="row.tenDaysState=='DOWN'" style="width:26px;height:20px;">
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="lastMonthOutput" :label="'与前30日对比差值\n'+(unitType=='m'?'(m³)':'(t)')" align="center" min-width="160">
                                        <template slot-scope="{ row }">
                                            <span style="display: flex;align-items: center;justify-content: center;">
                                                {{ row.lastMonthOutput |getFixNumberTwo }}
                                                <img src="@/assets/rem/yieId/UP.png" alt="" v-if="row.lastMonthState=='UP'" style="width:26px;height:20px;">
                                                <img src="@/assets/rem/yieId/DOWN.png" alt="" v-if="row.lastMonthState=='DOWN'" style="width:26px;height:20px;">
                                            </span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </pagePanelNew>
                        </div>
                        <div class="row" style="margin-left:10px;">
                            <pagePanelNew headerTitle="" style="margin-top:0; height: 400px;" show-btn>
                                <div style="display: flex; justify-content: flex-end;">
                                    <el-button icon="el-icon-download" type="primary" style="margin-bottom: 20px;" @click="doDownExcel('#tableData1', '产量分析报告-数据二')">下载</el-button>
                                </div>
                                <el-table id="tableData1" header-cell-class-name="table_header"  :data="tableDataPtTwo" highlight height="calc(100% - 55px)">
                                    <el-table-column prop="platformName" label="平台" align="center" min-width="140" fixed></el-table-column>
                                    <el-table-column prop="dayOutput" :label="'当日\n'+(unitType=='m'?'(m³)':'(t)')" align="center" min-width="140">
                                        <template slot-scope="{ row }">
                                            <span style="display: flex;align-items: center;justify-content: center;">
                                                {{ row.dayOutput | getFixNumberTwo }}
                                                <img src="@/assets/rem/yieId/UP.png" alt="" v-if="row.dayState=='UP'" style="width:26px;height:20px;">
                                                <img src="@/assets/rem/yieId/DOWN.png" alt="" v-if="row.dayState=='DOWN'" style="width:26px;height:20px;">
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="yesterdayOutput" :label="'与前日对比差值\n'+(unitType=='m'?'(m³)':'(t)')" align="center" min-width="160">
                                        <template slot-scope="{ row }">
                                            <span style="display: flex;align-items: center;justify-content: center;">
                                                {{ row.yesterdayOutput |getFixNumberTwo }}
                                                <img src="@/assets/rem/yieId/UP.png" alt="" v-if="row.yesterdayState=='UP'" style="width:26px;height:20px;">
                                                <img src="@/assets/rem/yieId/DOWN.png" alt="" v-if="row.yesterdayState=='DOWN'" style="width:26px;height:20px;">
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="tenDaysOutput" :label="'与前10日对比差值\n'+(unitType=='m'?'(m³)':'(t)')" align="center" min-width="160">
                                        <template slot-scope="{ row }">
                                            <span style="display: flex;align-items: center;justify-content: center;">
                                                {{ row.tenDaysOutput |getFixNumberTwo }}
                                                <img src="@/assets/rem/yieId/UP.png" alt="" v-if="row.tenDaysState=='UP'" style="width:26px;height:20px;">
                                                <img src="@/assets/rem/yieId/DOWN.png" alt="" v-if="row.tenDaysState=='DOWN'" style="width:26px;height:20px;">
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="lastMonthOutput" :label="'与前30日对比差值\n'+(unitType=='m'?'(m³)':'(t)')" align="center" min-width="160">
                                        <template slot-scope="{ row }">
                                            <span style="display: flex;align-items: center;justify-content: center;">
                                                {{ row.lastMonthOutput |getFixNumberTwo }}
                                                <img src="@/assets/rem/yieId/UP.png" alt="" v-if="row.lastMonthState=='UP'" style="width:26px;height:20px;">
                                                <img src="@/assets/rem/yieId/DOWN.png" alt="" v-if="row.lastMonthState=='DOWN'" style="width:26px;height:20px;">
                                            </span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </pagePanelNew>
                        </div>
                    </div>
                    <div class="rowBox">
                        <div class="row">
                            <pagePanelNew headerTitle="" style="margin-top:0; height: 440px;" show-btn>
                                <div style="display: flex; justify-content: flex-end;">
                                    <el-button icon="el-icon-download" type="primary" style="margin-bottom: 20px;" @click="doDownExcel('#tableData', '产量分析报告-数据三')">下载</el-button>
                                </div>
                                <el-table 
                                    id="tableData"
                                    :data="tableDataThree" 
                                    :border="false"
                                    :row-style="{ height: '0px' }" 
                                    header-cell-class-name="table_header" 
                                    :cell-style="{ padding: '6px', 'text-align': 'center' }"
                                    style="width: 100%;" 
                                    height="calc(100% - 55px)" 
                                    :default-sort="{ prop: 'date', order: 'descending' }" 
                                    :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }">
                                    <el-table-column prop="wellNo" label="井号" width="120" fixed></el-table-column>
                                    <el-table-column prop="prodDate" label="日期" width="120"></el-table-column>
                                    <el-table-column prop="prodDuration" :label="`生产时间\n(h)`" width=""></el-table-column>
                                    <el-table-column prop="fluidProdDaily" :label="`日产液\n(m³)`" width="" :formatter="toPrecise2"></el-table-column>
                                    <el-table-column prop="gasProdDaily" :label="`日产气\n(10⁴/m³)`" width="130" :formatter="toPrecise4"></el-table-column>
                                    <el-table-column prop="oilProdDaily" :label="`日产油\n(m³)`" width="" :formatter="toPrecise2"></el-table-column>
                                    <el-table-column prop="waterRatio" :label="`含水\n(%)`" width="" :formatter="toPrecise2"></el-table-column>
                                    <el-table-column prop="waterProdDaily" :label="`日产水\n(m³)`" width="" :formatter="toPrecise2"></el-table-column>
                                    <el-table-column prop="gasOilRatio" :label="`气油比\n(m³/m³)`" width="130" :formatter="toPrecise2"></el-table-column>
                                    <el-table-column prop="airliftGasCont" :label="`气举量\n(10⁴/m³)`" width="130" :formatter="toPrecise4"></el-table-column>
                                    <el-table-column prop="pfl" :label="`动液面\n(m)`" width="" :formatter="toPrecise2"></el-table-column>
                                    <el-table-column prop="pumpFrequency" :label="`泵频率\n(Hz)`" width="" :formatter="toPrecise2"></el-table-column>
                                    <el-table-column prop="pumpCurrent" :label="`泵电流\n(A)`" width="" :formatter="toPrecise2"></el-table-column>
                                    <el-table-column prop="nozzleDiameter" :label="`油嘴\n(mm)`" width="" :formatter="toPrecise2"></el-table-column>
                                    <el-table-column prop="oilPress" :label="`油压\n(MPa)`" width="" :formatter="toPrecise2"></el-table-column>
                                    <el-table-column prop="drawdownPress" :label="`压差\n(MPa)`" width="" :formatter="toPrecise2"></el-table-column>
                                    <el-table-column prop="dhFlowingPress" :label="`流压\n(MPa)`" width="" :formatter="toPrecise2"></el-table-column>
                                    <el-table-column prop="datumPessure" :label="`基准面流压\n(MPa)`" width="130" :formatter="toPrecise2"></el-table-column>
                                    <el-table-column prop="backPress" :label="`回压\n(MPa)`" width="" :formatter="toPrecise2"></el-table-column>
                                    <el-table-column prop="pumpInletPress" :label="`泵入口压力\n(MPa)`" width="130" :formatter="toPrecise2"></el-table-column>
                                    <el-table-column prop="pumpOutletPress" :label="`泵出口压力\n(MPa)`" width="130" :formatter="toPrecise2"></el-table-column>
                                    <el-table-column prop="csgPress" :label="`套压\n(MPa)`" width="" :formatter="toPrecise2"></el-table-column>
                                    <el-table-column prop="techCsgPress" :label="`技术套压\n(MPa)`" width="" :formatter="toPrecise2"></el-table-column>
                                    <el-table-column prop="surfaceCsgPress" :label="`表层套压\n(MPa)`" width="" :formatter="toPrecise2"></el-table-column>
                                    <el-table-column prop="pumpMotorTemp" :label="`马达温度\n(℃)`" width="" :formatter="toPrecise2"></el-table-column>
                                    <el-table-column prop="whTemp" :label="`井口温度\n(℃)`" width="" :formatter="toPrecise2"></el-table-column>
                                    <el-table-column prop="dhFlowingTemp" :label="`流温\n(℃)`" width="" :formatter="toPrecise2"></el-table-column>
                                    <el-table-column prop="remark" label="备注" width=""></el-table-column>
                                </el-table>
                            </pagePanelNew>
                        </div>
                    </div>
                    <div class="rowBox">
                        <div class="row">
                            <pagePanelNew headerTitle="" style="margin-top:0; height: 440px;" show-btn>
                                <div style="display: flex; justify-content: flex-end;">
                                    <el-button icon="el-icon-download" type="primary" style="margin-bottom: 20px;" @click="doDownExcel('#table4', '产量分析报告-数据四')">下载</el-button>
                                </div>
                                <el-table id="table4" :data="eventData" highlight height="calc(100% - 55px)" empty-text="当日无大事件">
                                    <el-table-column prop="eventType" label="事件类型" align="center" width="180"></el-table-column>
                                    <el-table-column prop="wellNum" label="井数" align="center" width="160"></el-table-column>
                                    <el-table-column prop="content" align="center" label="井名"></el-table-column>
                                </el-table>
                            </pagePanelNew>
                        </div>
                    </div>
                </div>
            </pagePanelNewNew>
        </div>
    </div>
</template>

<script>
    import * as echarts from "echarts";
    import Echart from "@/components/tools/Echarts/index.vue";
    import { outputTracingAnalysis, outputTracing, platformOutputContributeAnalysis,dailyMainEvent, wellOutputWaveAnalysis } from "@/api/oilDeposit/rem-02/outputmanagement.js";
    import { getProdDailyTable } from "@/api/oilDeposit/rem-04/yieId.js"
    import FileSaver from 'file-saver';
    import {exportExcel} from '@/lib/exportExcel.js';

    export default {
        name:'productionOperationAnalysisReport',
        filters: {
            getFixNumberTwo(val) {
                return val ? val.toFixed(2) : (val === 0 ? val : "-");
            }
        },
        data() {
            return {
                //油田id
                oilField: "",
                //区块id
                block: "",
                //当前时间
                theDate: "",
                //单位类型
                unitType: "",
                //油田名称
                oilFieldName: "",
                //井ids
                wellIds:[],
                //平台表格数据
                tableDataPtOne: [],
                //平台表格数据
                tableDataPtTwo: [],
                //中间表格
                tableDataThree:[],
                //表格数据，问题事件
                eventData: [],
            };
        },
        mounted() {
            this.oilFieldName = this.$route.query.oilFieldName;
            this.oilField = this.$route.query.oilField;
            this.block = this.$route.query.block;
            this.theDate = this.$route.query.theDate;
            this.unitType = this.$route.query.unitType;
            let wellIds=JSON.parse(this.$route.query.wellIds);
            if(wellIds.length){
                this.wellIds=wellIds.map(el=>el.borepipeId);
            }
            console.log('this.wellIds',this.wellIds)
            //平台产量贡献分析
            this.getContributeAnalysis(
                this.block,
                this.oilField,
                this.theDate,
                this.unitType,
                false,
            );
            //获取中间表格数据
            this.getProdDailyTable();
            //平台产量贡献分析
            this.getContributeAnalysis(
                this.block,
                this.oilField,
                this.theDate,
                this.unitType,
                true,
            );
            //单当日关键事件
            this.getDailyMainEvent(
                this.block,
                this.oilField,
                this.theDate,
                this.unitType
            );
        },
        methods: {
            //获取平台产量贡献分析信息
            getContributeAnalysis(fieldId, oilFieldId, theDate, unitType, platformDetail) {
                let request = {
                    fieldId: fieldId,
                    oilFieldId: oilFieldId,
                    theDate: theDate,
                    unitType: unitType,
                    platformDetail: platformDetail,
                };
                let _this = this;
                platformOutputContributeAnalysis(request).then((res) => {
                    if (platformDetail == false) {
                        let data = res.data.data.chart.pieDataSet[0];
                        //获取图例数据
                        let legendData = [];
                        //获取折线图数据
                        let seriesData = [];
                        //饼图数据
                        let pieData = data.pieDatas;
                        if (pieData) {
                            for (let i = 0; i < pieData.length; i++) {
                                let detail = {};
                                detail.value = pieData[i].value.toFixed(2);
                                detail.name = pieData[i].label;
                                seriesData.push(detail);
                                legendData.push(pieData[i].label);
                            }
                        }
                        legendData.sort();
                        _this.pieEchart.legend.data = legendData;
                        _this.pieEchart.series.data = seriesData;
                        if (unitType == "t") {
                            _this.pieEchart.series.label.formatter = function(param) {
                                let res = "";
                                let name = (param.name ? param.name : '') + ' ';
                                let value = " " + (param.value ? param.value : 0) + "t/d";
                                let percent = " " + (param.percent ? param.percent : 0) + "%";
                                res = name + value + percent;
                                return res;
                            };
                        } else if (unitType == "m") {
                            _this.pieEchart.series.label.formatter = function(param) {
                                let res = "";
                                let name = (param.name ? param.name : '') + ' ';
                                let value = " " + (param.value ? param.value : '0') + "m³/d";
                                let percent = " " + (param.percent ? param.percent : '0') + "%";
                                res = name + value + percent;
                                return res;
                            };
                        }
                    } else {
                        let tableDate = res.data.data.platformOutputs;
                        let tableOne = [];
                        let tableTwo = [];
                        if (tableDate) {
                            tableDate = tableDate.sort(function(a, b) {
                                if (a.platformName > b.platformName) {
                                    return 1;
                                } else if (a.platformName < b.platformName) {
                                    return -1;
                                } else {
                                    return 0;
                                }
                            });
                            for (let i = 0; i < tableDate.length; i++) {
                                if (i < tableDate.length / 2)
                                    tableOne.push(tableDate[i]);
                                else
                                    tableTwo.push(tableDate[i]);
                            }
                        }
                        _this.tableDataPtOne = tableOne;
                        _this.tableDataPtTwo = tableTwo;
                    }
                });
            },
            //获取中间表格数据
            getProdDailyTable(){
                getProdDailyTable({wellIds:this.wellIds,theDate:this.theDate}).then(res=>{
                    if(res.data.code==200){
                        this.tableDataThree=res.data.data;
                    }
                })
            },
            //获取当日关键事件
            getDailyMainEvent(fieldId, oilFieldId, theDate, unitType) {
                let request = {
                    fieldId: fieldId,
                    oilFieldId: oilFieldId,
                    theDate: theDate,
                    unitType: unitType,
                };
                let _this = this;
                dailyMainEvent(request).then((res) => {
                    let data = res.data.data;
                    _this.eventData = data.dailyMainEvents;
                });
            },
            //下载导出文件 tableId tableName
            doDownExcel(tableId, tableName) {
                exportExcel(tableId, tableName);
            },
            // 表格格式化方法 - 数值只保留两位小数
            toPrecise2(row, column) {
                if (
                    (row[column.property] || parseFloat(row[column.property]) === 0) &&
                    typeof parseFloat(row[column.property]) === "number"
                ) {
                    return parseFloat(row[column.property]) || parseFloat(row[column.property]) === 0
                    ? parseFloat(row[column.property]).toFixed(2)
                    : "0";
                } else {
                    return row[column.property] ? row[column.property] : "-";
                }
            },
            // 表格格式化方法 - 数值只保留四位位小数
            toPrecise4(row, column) {
                if (
                    (row[column.property] || parseFloat(row[column.property]) === 0) &&
                    typeof parseFloat(row[column.property]) === "number"
                ) {
                    return parseFloat(row[column.property]) || parseFloat(row[column.property]) === 0
                    ? parseFloat(row[column.property]).toFixed(4)
                    : "0";
                } else {
                    return row[column.property] ? row[column.property] : "-";
                }
            },
        }
    };
</script>

<style lang="scss" scoped>
    .app-container{
        height: 100%;
        display: flex;
        flex-direction: column;
        .z-container{
            flex:1;
            height:0;
            .pagePanelNewNew{
                height:100%;
                margin-top:0;
                .pagePane-container{
                    height:100%;
                    overflow-x: hidden;
                    overflow-y: scroll;
                    .rowBox {
                        margin-bottom:20px;
                        display: flex;
                        align-items: center;
                        .row {
                            flex: 1;
                            width:0;
                            .row-container{
                                display: flex;
                                flex-direction: column;
                                height:100%;
                                .searchBox{
                                    padding:10px 0;
                                    padding-right:10px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: flex-end;
                                }
                                .echartBox{
                                    flex:1;
                                    height:0;
                                }
                            }
                        }
                    }
                    .rowBox:last-child{
                        margin-bottom:0;
                    }
                }
            }
        }
    }
    #tableData0,#tableData1,#tableData{
        ::v-deep .el-table__header-wrapper{
            .el-table__header{
                thead {
                    tr{
                        .cell{
                            height: auto;
                            line-height: 18px;
                            white-space: pre;
                        } 
                    }
                } 
            }
        } 
        ::v-deep .cell:empty{
            &::before {
                content: '-';
            } 
        }
    } 
</style>
