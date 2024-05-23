<!--射孔数据-->
<template>
    <page-panel header-title="射孔数据" style="height: 600px" show-btn>
        <el-table
        id="tableData"
        :data="tableData"  border :row-style="{ height: '0px' }"
         :cell-style="{ padding: '6px', 'text-align': 'center' }"
        style="width:100%;" height="calc(100% - 10px)" :default-sort="{ prop: 'date', order: 'descending' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }">
        <el-table-column type="index" width="60" label="序号" fixed></el-table-column>
        <el-table-column prop="wellNo" label="井号" width="130" fixed></el-table-column>
        <el-table-column prop="perfLayer" label="小层" width="200" fixed></el-table-column>
        <el-table-column prop="topDepth" :label="`井段顶斜深\n (m)`" min-width="120"></el-table-column>
        <el-table-column prop="bottomDepth" :label="`井段底斜深\n (m)`" min-width="120"></el-table-column>
        <el-table-column prop="accumulated" :label="`斜厚\n (m)`" min-width="120"></el-table-column>
        <el-table-column prop="topTvd" :label="`井段顶垂深\n (m)`" min-width="120"></el-table-column>
        <el-table-column prop="bottomTvd" :label="`井段底垂深\n (m)`" min-width="120"></el-table-column>
        <el-table-column prop="verticalEffectThickness" :label="`垂厚\n (m)`" min-width="120"></el-table-column>
        <el-table-column prop="sandTopDepth" :label="`防砂段顶斜深\n (m)`" min-width="120"></el-table-column>
        <el-table-column prop="sandBottomDepth" :label="`防砂段底斜深\n (m)`" min-width="120"></el-table-column>
        <el-table-column prop="layerName" label="生产段名称" min-width="120"></el-table-column>
        <el-table-column prop="accumulated" :label="`射开有效斜厚\n (m)`" min-width="120"></el-table-column>
        <el-table-column prop="openThickness" :label="`射开有效垂厚\n (m)`" min-width="120"></el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip  min-width="150"></el-table-column>
    </el-table>
    </page-panel>
</template>

<script>
import { getComPerfInterval} from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
import {exportExcel} from "@/lib/exportExcel.js";
export default {
    data() {
        return {
            tableData: [],
            oilFeildId: {},
            //选择平台
            platform: {},
            //选择井号
            wellId: {},
        }
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
                ogfId: this.oilFeildId,
                platformId:  this.platform,
                wellId: this.wellId,
            };
            getComPerfInterval(request).then((res) => {
                if (res.data.code == 200) {
                    this.tableData = res.data.data.comPerfInterval;
                }
            })
        },
    },
}
</script>

<style scoped lang="scss">
#tableData{
    ::v-deep .el-table__fixed-header-wrapper .cell{
        height: auto !important;
        white-space: pre;
    }
    ::v-deep .el-table__header-wrapper .cell{
        height: auto !important;
        white-space: pre;
    }
    ::v-deep .cell:empty{
        &::before {
            content: '-';
        }
    }
}
</style>
