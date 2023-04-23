<!-- 油田预测产量 -->
<template>
    <div>
        <info-window style="margin-top:0;" infoWidth="100%" infoHeight="400px" headerTitle="油田产量影响因素" isShowMaxBtn>
            <div slot-name="titleContent" style="position: absolute;right:52px;top:5px;">
                <el-button type="primary" style="height:30px;" @click="saveEditRow">保存修改</el-button>
            </div>
            <el-table :data="tableData" highlight height="100%" :cell-style="{padding:'10px'}">
                <el-table-column v-if="show" prop="ogfId"></el-table-column>
                <el-table-column prop="ogfNo" label="油田" align="center"></el-table-column>
                <el-table-column prop="queryInitialProd" label="日产量(m³)" align="center">
                    <template slot-scope="scope">
                        {{scope.row.queryInitialProd}}
                    </template>
                </el-table-column>
                <el-table-column prop="initialProd" label="修正日产量(m³)" align="center">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.initialProd" :min="0" :precision="4"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column prop="degressionOfYear" label="年递减率(%)" align="center">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.degressionOfYear" :min="-100" :max="100" :precision="4"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column prop="rateOfHour" label="生产时率(%)" align="center">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.rateOfHour" :min="0" :max="100" :precision="4"></el-input-number>
                    </template>
                </el-table-column>
            </el-table>
        </info-window>
        <info-window infoWidth="100%" infoHeight="400px" headerTitle="油田预测产量" isShowMaxBtn>
            <div slot-name="titleContent" style="position: absolute;right:52px;top:5px;">
                <el-button type="primary" style="height:30px;" @click="doDownLoad(2)">下载</el-button>
            </div>
            <el-table id="ForecastProductionTable" :data="tableData1" highlight style="font-size:15px;font-weight:500" :cell-style="{padding:'25px'}">
                <el-table-column label="油田" align="center">
                    <template>
                        <span>预测年产量(/{{unitName}})</span>
                    </template>
                </el-table-column>
                <el-table-column prop="qhd326" label="QHD32-6" align="center"></el-table-column>
                <el-table-column prop="cfd64" label="CFD6-4" align="center"></el-table-column>
                <el-table-column prop="nb352" label="NB35-2" align="center"></el-table-column>
                <el-table-column prop="bz32" label="BZ3-2" align="center"></el-table-column>
                <el-table-column prop="qhd331" label="QHD33-1" align="center"></el-table-column>
                <el-table-column prop="qhd331s" label="QHD33-1S" align="center"></el-table-column>
                <el-table-column prop="work" label="作业公司" align="center"></el-table-column>
            </el-table>
        </info-window>
        <info-window infoWidth="100%" infoHeight="400px" headerTitle="油田剩余水平" isShowMaxBtn>
            <div slot-name="titleContent" style="position: absolute;right:52px;top:5px;">
                <el-button type="primary" style="height:30px;" @click="doDownLoad(3)">下载</el-button>
            </div>
            <el-table id="ResidualLevelTable" :data="tableData2" highlight style="width:100%;font-size:15px;font-weight:500" :cell-style="{padding:'25px'}">
                <el-table-column label="油田" align="center">
                    <template slot-scope="scope">
                        <span v-show="scope.$index==0">分公司奋斗，后续需日产(/{{unitName}})</span>
                        <span v-show="scope.$index==1">分公司考核，后续需日产(/{{unitName}})</span>
                    </template>
                </el-table-column>
                <el-table-column prop="qhd326" label="QHD32-6" align="center"></el-table-column>
                <el-table-column prop="cfd64" label="CFD6-4" align="center"></el-table-column>
                <el-table-column prop="nb352" label="NB35-2" align="center"></el-table-column>
                <el-table-column prop="bz32" label="BZ3-2" align="center"></el-table-column>
                <el-table-column prop="qhd331" label="QHD33-1" align="center"></el-table-column>
                <el-table-column prop="qhd331s" label="QHD33-1S" align="center"></el-table-column>
                <el-table-column prop="work" label="作业公司" align="center"></el-table-column>
            </el-table>
        </info-window>
    </div>
</template>

<script>
    import {getOilFieldInfo,getOilForecastProd,getOilResidueLevel,saveInfluencingFactorsOfOilfieldProduction} from '@/api/oilDeposit/rem-03/oilfieldmanageplan.js';
    import { exportExcel} from '@/lib/exportExcel.js';
    export default {
        props:{
            searchForm:{
                type:Object,
                default:()=>{
                    return {
                        rollingForecastDate:'',//滚动预测
                        date:new Date().getFullYear() + '-12-31',//日期
                        unitType:'m',//单位
                    }
                }
            }
        },
        data() {
            return {
                unitName: 'm³',
                //油田产量影响因素
                show:false,
                tableData: [],
                //油田预测产量
                tableData1: [
                    {
                        qhd326: "",
                        bz251s: "",
                        bz251: "",
                        bz194: "",
                        work: ""
                    },
                ],
                //油田剩余水平
                tableData2: [
                    {
                        qhd326: "",
                        bz251s: "",
                        bz251: "",
                        bz194: "",
                        work: ""
                    }, 
                    {
                        qhd326: "",
                        bz251s: "",
                        bz251: "",
                        bz194: "",
                        work: ""
                    }
                ],
            };
        },
        mounted(){
            this.doSearch();
        },
        methods: {
            doSearch() {
                if (this.searchForm.rollingForecastDate == 'm') {
                    this.unitName = '10⁴m³';
                } else if (this.searchForm.rollingForecastDate == 't') {
                    this.unitName = 't';
                }
                this.queryTableData();
                this.queryTableData1();
                this.queryTableData2();
            },
            //查询油田产量影响因素表格数据
            queryTableData() {
                getOilFieldInfo().then((data) => {
                    if (!data.data.code) {
                        this.tableData = data.data.data;
                    }
                })
            },
            //查询油田预测产量表格数据
            queryTableData1() {
                let queryParams = {
                    rollingForecastDate: this.searchForm.rollingForecastDate,
                    date: this.searchForm.date,
                    unitType: this.searchForm.unitType,
                };
                getOilForecastProd(queryParams).then((data) => {
                    if (!data.data.code) {
                        data.data.data.forEach((item, index) => {
                            if (item.ogfNo == 'QHD32-6') {
                                this.tableData1[0].qhd326 = item.forecastProd;
                            } else if (item.ogfNo == 'CFD6-4') {
                                this.tableData1[0].cfd64 = item.forecastProd;
                            } else if (item.ogfNo == 'NB35-2') {
                                this.tableData1[0].nb352 = item.forecastProd;
                            } else if (item.ogfNo == 'BZ3-2') {
                                this.tableData1[0].bz32 = item.forecastProd;
                            } else if (item.ogfNo == 'QHD33-1') {
                                this.tableData1[0].qhd331 = item.forecastProd;
                            } else if (item.ogfNo == 'QHD33-1S') {
                                this.tableData1[0].qhd331s = item.forecastProd;
                            } else {
                                this.tableData1[0].work = item.forecastProd;
                            }
                        })
                    }
                })
            },
            //查询油田剩余水平表格数据
            queryTableData2() {
                let queryParams = {
                    date: this.searchForm.date,
                    unitType: this.searchForm.unitType,
                };
                getOilResidueLevel(queryParams).then((data) => {
                    console.log("getOilResidueLevel==>", data);
                    if (!data.data.code) {
                        data.data.data.forEach((item, index) => {
                            if (item.ogfNo == 'QHD32-6') {
                                this.tableData2[0].qhd326 = item.oilNeedAfterStruggle;
                                this.tableData2[1].qhd326 = item.oilNeedAfterExamine;
                            } else if (item.ogfNo == 'CFD6-4') {
                                this.tableData2[0].cfd64 = item.oilNeedAfterStruggle;
                                this.tableData2[1].cfd64 = item.oilNeedAfterExamine;
                            } else if (item.ogfNo == 'NB35-2') {
                                this.tableData2[0].nb352 = item.oilNeedAfterStruggle;
                                this.tableData2[1].nb352 = item.oilNeedAfterExamine;
                            } else if (item.ogfNo == 'BZ3-2') {
                                this.tableData2[0].bz32 = item.oilNeedAfterStruggle;
                                this.tableData2[1].bz32 = item.oilNeedAfterExamine;
                            } else if (item.ogfNo == 'QHD33-1') {
                                this.tableData2[0].qhd331 = item.oilNeedAfterStruggle;
                                this.tableData2[1].qhd331 = item.oilNeedAfterExamine;
                            } else if (item.ogfNo == 'QHD33-1S') {
                                this.tableData2[0].qhd331s = item.oilNeedAfterStruggle;
                                this.tableData2[1].qhd331s = item.oilNeedAfterExamine;
                            } else {
                                this.tableData2[0].work = item.oilNeedAfterStruggle;
                                this.tableData2[1].work = item.oilNeedAfterExamine;
                            }
                        })
                    }
                })
            },
            //保存编辑
            saveEditRow() {
                var params = [];
                var keys = Object.keys(this.tableData);
                if (keys != null || keys.length != 0) {
                    keys.forEach((item, index) => {
                        // console.log("11111111=>",item)
                        var lineObj = {
                            'ogfId': this.tableData[item]['ogfId'],
                            'ogfNo': this.tableData[item]['ogfNo'],
                            'degressionOfDays': this.tableData[item]['degressionOfDays'],
                            'rateOfHour': this.tableData[item]['rateOfHour'],
                            'degressionOfYear': this.tableData[item]['degressionOfYear'],
                            'initialProd': this.tableData[item]['initialProd']
                        };
                        params.push(lineObj);
                    })
                }
                console.log("this.tableData==>", params);
                saveInfluencingFactorsOfOilfieldProduction(params).then((res) => {
                    if (!res.data.code) {
                        this.$message.error("保存成功");
                        this.queryForecastOutputTableData();
                    } else {
                        this.$message.error("保存失败");
                    }
                });
            },
            //下载
            doDownLoad(index) {
                if (index === 2) {
                    let fileName = '油田预测产量';
                    exportExcel('#ForecastProductionTable', fileName);
                }
                if (index === 3) {
                    let fileName1 = '油田剩余水平';
                    exportExcel('#ResidualLevelTable', fileName1);
                }
            },
        },
    };
</script>