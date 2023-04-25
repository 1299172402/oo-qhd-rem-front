<!-- 油田预测产量 -->
<template>
    <div class="z-main" style="height:100%;">
        <div style="display: flex;align-items: center;margin-bottom:15px;">
            <span>滚动预测：</span>
            <el-select v-model="searchForm.rollingForecastDate" placeholder="请选择" style="width:200px;margin-right:15px;">
                <el-option v-for="item in rollingForecastDateList" :key="item.source_ID" :label="item.source_NAME" :value="item.source_ID"></el-option>
            </el-select>
            <span>日期：</span>
            <el-date-picker v-model="searchForm.date" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :picker-options="pickerOptions" style="margin-right:15px;"></el-date-picker>
            <span>产量单位选择：</span>
            <el-select v-model="searchForm.unitType" placeholder="请选择" style="width:100px;margin-right:15px;">
                <el-option v-for="item in unitTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="doSearch">检索</el-button>
        </div>
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
    import {getForecastDate,getOilFieldInfo,getOilForecastProd,getOilResidueLevel,saveInfluencingFactorsOfOilfieldProduction} from '@/api/oilDeposit/rem-03/oilfieldmanageplan.js';
    import { exportExcel} from '@/lib/exportExcel.js';
    export default {
        data() {
            return {
                oilFieldData: ['QHD32-6', 'QHD33-1', 'NB35-2', 'QHD33-1S', 'CFD6-4', 'BZ3-2'],
                //滚动预测数据源
                rollingForecastDateList:[],
                //产量单位数据源
                unitTypeList: [
                  {
                    label: "m³",
                    value: "m",
                  },
                  {
                    label: "t",
                    value: "t",
                  },
                ],
                pickerOptions: {
                  disabledDate(time) {
                    // 油田预测产量
                    var date = new Date();
                    var year = date.getFullYear();
                    var end_date = new Date(year, 12, 0);
                    var begin_date = new Date(year, date.getMonth(), date.getDate());
                    if (time >= begin_date && time <= end_date) {
                      return false;
                    } else {
                      return true;
                    }
                  },
                },
                searchForm:{
                    rollingForecastDate:'',//滚动预测
                    date:new Date().addDays(-1).format('yyyy-MM-dd'),//日期
                    unitType:'m',//单位
                },
                
                
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
            this.getForecastDate();
        },
        methods: {
            //获取滚动预测下拉框数据源
            getForecastDate() {
                getForecastDate().then((res) => {
                    if (res.data.code==200) {
                        this.rollingForecastDateList = res.data.data;
                        this.searchForm.rollingForecastDate = this.rollingForecastDateList[0].source_ID;
                    }
                    this.doSearch();
                });
            },
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
                getOilFieldInfo().then(res => {
                    if (res.data.code==200) {
                        this.tableData = res.data.data;
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
                getOilForecastProd(queryParams).then(res => {
                    if (res.data.code==200&&res.data.data.length) {
                        res.data.data.forEach((item, index) => {
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
                getOilResidueLevel(queryParams).then(res => {
                    if (res.data.code==200&&res.data.data.length) {
                        res.data.data.forEach((item, index) => {
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
                    if (res.data.code==200&&res.data.data) {
                        this.$message.success("保存成功");
                        this.queryTableData();
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