<!--作业井史-->
<template>
    <pagePanel headerTitle="作业井史" style="height: 500px;" show-btn>
        <el-table id="tableData" :data="tableData" border :row-style="{ height: '0px' }" header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }" style="width:100%;" height="100%" :default-sort="{ prop: 'date', order: 'descending' }" :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }">
            <el-table-column type="index" label="序号" align="center"></el-table-column>
            <el-table-column prop="startTime" :label="`开始时间\n(yyyy-mm-dd)`" align="center" width="180"></el-table-column>
            <!--<el-table-column prop="endTime" label="结束时间" align="center"></el-table-column>-->
            <el-table-column prop="chronicle" label="大事简要" align="center" width="200"></el-table-column>
            <el-table-column prop="remark" label="备注" align="left"></el-table-column>
        </el-table>
    </pagePanel>
</template>

<script>
    import { workingHistory } from '@/api/oilDeposit/rem-01/dynamicAnalysis.js';
    import { exportExcel } from '@/lib/exportExcel.js';
    export default {
        data() {
            return {
                tableData: []
            };
        },
        methods: {
            passValue(val) {
                this.oilFeildId = val.ogfId;
                this.platform = val.assetCode;
                this.wellId = val.selectWellId;
                this.doSearch();
            },
            //根据父组件传递过来的参数进行查询
            doSearch() {
                let request = {
                    ogfId:  this.oilFeildId ,
                    platformId: this.platform,
                    wellId: this.wellId,
                };
                workingHistory(request).then((res) => {
                    if (res.data.code == 200) {
                        this.tableData = res.data.data.workingHistorys;
                    }
                });
            },
        }
    };
</script>

<style scoped lang="scss">
    // ::v-deep .el-table__body-wrapper{
    //     height: calc(100% - 34px);
    // }
    #tableData {
        ::v-deep .el-table__header-wrapper .cell {
            height: auto;
            line-height: 18px;
            white-space: pre;
        }
    }
    #tableData{
        ::v-deep .cell:empty{
            &::before {
                content: '-';
            } 
        }
    } 
</style>
