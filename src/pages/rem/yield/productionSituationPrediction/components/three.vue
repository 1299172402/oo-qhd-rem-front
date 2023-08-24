<!-- 作业公司产量总览 -->
<template>
    <div class="z-main" style="height:100%;">
        <div style="display: flex;justify-content: space-between;align-items: center;margin-bottom:15px;">
           <div>
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
                <el-button type="primary" icon="el-icon-search" @click="doSearch">搜索</el-button>
                <el-button class="commonBtn" icon="el-icon-refresh" style="margin-left:15px!important;margin-right:auto;" @click="resetting">重置</el-button>
           </div>
           <el-button icon="el-icon-download" type="primary" style="margin-bottom: 20px;" @click="doDownExcel('#TaskOutputTrackingTable', '作业公司产量总览')">下载</el-button>
        </div>
        <el-table id="TaskOutputTrackingTable" :data="tableData" highlight height="calc(100% - 75px)" show-summary :summary-method="getSummaries">
            <el-table-column prop="wellType" label="累产/10⁴m³" align="center" min-width="130"></el-table-column>
            <el-table-column prop="branchStruggle" label="分公司奋斗" align="center" min-width="130"></el-table-column>
            <el-table-column prop="branchAssessment" label="分公司考核" align="center" min-width="130"></el-table-column>
            <el-table-column prop="rollingForecast" label="滚动预测" align="center" min-width="130"></el-table-column>
            <el-table-column prop="branchStruggleInventoryTime" label="截至盘库时间分公司奋斗" align="center" min-width="180"></el-table-column>
            <el-table-column prop="branchAssessmentInventoryTime" label="截至盘库时间分公司考核" align="center" min-width="180"></el-table-column>
            <el-table-column prop="secondQuarterProdPlan" align="center" min-width="130">
                <template slot="header">
                    <div>当季度产量计划</div>
                    <div>(暂未有目标)</div>
                </template>
            </el-table-column>
            <el-table-column prop="actualOutputOfInventory" label="盘库实际产量" align="center" min-width="130"></el-table-column>
            <el-table-column prop="branchActualSubStruggle" label="实际-分公司奋斗" align="center" min-width="130"></el-table-column>
            <el-table-column prop="branchActualSubAssessment" label="实际-分公司考核" align="center" min-width="130"></el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {getForecastDate,getWorkCompanyTrack} from '@/api/oilDeposit/rem-03/oilfieldmanageplan.js';
    import {exportExcel} from '@/lib/exportExcel.js';

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
                tableData:[],
            };
        },
        mounted() {
            this.getForecastDate();
        },
        methods: {
            //重置
            resetting(){
            	this.$nextTick(()=>{
            		Object.assign(this.$data, this.$options.data());
            		this.getForecastDate();
            	})
            },
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
            //根据选择平台查询数据
            doSearch() {
                this.queryTaskOutputTrackingTableData();
            },
            //查询作业公司产量跟踪表格数据
            queryTaskOutputTrackingTableData() {
                let params = {
                    rollingForecastDate: this.searchForm.rollingForecastDate,
                    date: this.searchForm.date,
                    unitType: this.searchForm.unitType,
                };
                getWorkCompanyTrack(params).then(res=> {
                    if (res.data.code==200) {
                        let data=[];
                        data[0] = res.data.data[6];
                        data[1] = res.data.data[0];
                        data[2] = res.data.data[1];
                        data[3] = res.data.data[2];
                        data[4] = res.data.data[3];
                        data[5] = res.data.data[4];
                        data[6] = res.data.data[5];
                        this.tableData =data;
                    }
                })
            },
            //表格合计行返回
            getSummaries(param) {
                const {
                    columns,
                    data
                } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => Number.isNaN(value))) {
                        let sum = 0;
                        values.forEach((item, index1) => {
                            if (index1 == 0 || index1 > 3) {
                                console.log(index1 + ": " + item)
                                sum = sum + item;
                            }
                        })
                        sums[index] = sum.toFixed(4);
                    } else {
                        sums[index] = null;
                    }
                });
                return sums;
            },
            //下载导出文件 tableId tableName
            doDownExcel(tableId, tableName) {
                exportExcel(tableId, tableName);
            },
        }
    };
</script>

<style lang="scss" scoped>
    ::v-deep .el-table__body-wrapper{
        height:290px!important;
    }
    ::v-deep .el-table__footer-wrapper{
        .cell{
            color:var(--white-opacity7);
        }
    }
</style>