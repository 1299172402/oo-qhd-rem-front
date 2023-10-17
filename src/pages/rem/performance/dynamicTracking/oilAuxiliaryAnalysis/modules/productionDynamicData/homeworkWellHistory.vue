<!--作业井史-->
<template>
    <page-panel-new style="height:calc(100% - 101px);" show-btn>
        <el-table id="tableData" :data="tableData" :border="false" :row-style="{ height: '0px' }" header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }" style="width:100%;" height="100%" :default-sort="{ prop: 'date', order: 'descending' }" :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }">
            <el-table-column type="index" label="序号" align="center"></el-table-column>
            <el-table-column prop="startTime" :label="`开始时间\n(yyyy-mm-dd)`" align="center" width="180"></el-table-column>
            <el-table-column prop="chronicle" label="大事简要" align="center" width="200"></el-table-column>
            <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        </el-table>
    </page-panel-new>
</template>
<script>
    import { workingHistory} from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
    import {exportExcel} from "@/lib/exportExcel.js";
    export default {
        props: {
            //选择油田
            oilFeildId: {},
            //选择平台
            platform: {},
            //选择井号
            wellId: {},
            //大事简要
            majorEventsBrieflyValue: ''
        },
        data() {
            return {
                tableData: [],
            }
        },
        mounted() {
            this.doSearch();
        },
        methods: {
            //根据父组件传递过来的参数进行查询
            doSearch(majorEventsBrieflyValue) { 
                let request = {
                    ogfId: this.oilFeildId,
                    platformId: this.platform,
                    wellId: this.wellId,
                    majorEventsBriefly:majorEventsBrieflyValue!==undefined?majorEventsBrieflyValue:this.majorEventsBrieflyValue
                };
                workingHistory(request).then((res) => {
                    if (res.data.code == 200) {
                        this.tableData = res.data.data.workingHistorys;
                    }
                })
            },
            //下载
            doDownLoad() {
                let fileName = '作业井史';
                if (this.wellName) {
                    fileName = this.wellName + fileName;
                }
                exportExcel('#tableData',fileName);
            }
        },
    }
</script>

<style scoped lang="scss">
    ::v-deep .el-table .cell:empty::before {
        content: '-';
    }
    ::v-deep .el-table__body-wrapper{
        height: calc(100% - 34px);
    }
    ::v-deep .el-table__header-wrapper .cell{
            height: auto !important;
            line-height: 18px !important;
            white-space: pre;
        }
</style>
