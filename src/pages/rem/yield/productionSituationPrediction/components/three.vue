<!-- 作业公司产量总览 -->
<template>
    <el-table id="TaskOutputTrackingTable" :data="tableData" highlight height="100%" show-summary :summary-method="getSummaries">
        <el-table-column prop="wellType" label="累产/10⁴m³" align="center"></el-table-column>
        <el-table-column prop="branchStruggle" label="分公司奋斗" align="center"></el-table-column>
        <el-table-column prop="branchAssessment" label="分公司考核" align="center"></el-table-column>
        <el-table-column prop="rollingForecast" label="滚动预测" align="center"></el-table-column>
        <el-table-column prop="branchStruggleInventoryTime" label="截至盘库时间分公司奋斗" align="center"></el-table-column>
        <el-table-column prop="branchAssessmentInventoryTime" label="截至盘库时间分公司考核" align="center"></el-table-column>
        <el-table-column prop="secondQuarterProdPlan" align="center">
            <template slot="header">
                <div>当季度产量计划</div>
                <div>(暂未有目标)</div>
            </template>
        </el-table-column>
        <el-table-column prop="actualOutputOfInventory" label="盘库实际产量" align="center"></el-table-column>
        <el-table-column prop="branchActualSubStruggle" label="实际-分公司奋斗" align="center"></el-table-column>
        <el-table-column prop="branchActualSubAssessment" label="实际-分公司考核" align="center"></el-table-column>
    </el-table>
</template>

<script>
    import {getWorkCompanyTrack} from '@/api/oilDeposit/rem-03/oilfieldmanageplan.js';
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
                tableData:[],
            };
        },
        mounted() {
            this.doSearch();
        },
        methods: {
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
        }
    };
</script>