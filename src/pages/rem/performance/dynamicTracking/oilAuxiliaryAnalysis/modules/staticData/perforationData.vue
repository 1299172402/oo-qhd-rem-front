<!--射孔数据-->
<template>
    <page-panel-new style="height: calc(100% - 101px); margin-top:0;" show-btn>
        <el-table 
            id="tableData"
            :data="tableData" :border="false" :row-style="{ height: '0px' }"
            header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }"
            style="width:100%;" height="100%" :default-sort="{ prop: 'date', order: 'descending' }"
            :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }">
            <el-table-column type="index" label="序号" fixed></el-table-column>
            <el-table-column prop="wellNo" label="井号" width="130" fixed></el-table-column>
            <el-table-column prop="perfLayer" label="小层" width="200" fixed></el-table-column>
            <el-table-column prop="topDepth" :label="`井段顶斜深\n (m)`" min-width="120" :formatter="toPrecise2"></el-table-column>
            <el-table-column prop="bottomDepth" :label="`井段底斜深\n (m)`" min-width="120" :formatter="toPrecise2"></el-table-column>
            <el-table-column prop="accumulated" :label="`斜厚\n (m)`" min-width="120" :formatter="toPrecise2"></el-table-column>
            <el-table-column prop="topTvd" :label="`井段顶垂深\n (m)`" min-width="120" :formatter="toPrecise2"></el-table-column>
            <el-table-column prop="bottomTvd" :label="`井段底垂深\n (m)`" min-width="120" :formatter="toPrecise2"></el-table-column>
            <el-table-column prop="verticalEffectThickness" :label="`垂厚\n (m)`" min-width="120" :formatter="toPrecise2"></el-table-column>
            <el-table-column prop="sandTopDepth" :label="`防砂段顶斜深\n (m)`" min-width="120" :formatter="toPrecise2"></el-table-column>
            <el-table-column prop="sandBottomDepth" :label="`防砂段底斜深\n (m)`" min-width="120" :formatter="toPrecise2"></el-table-column>
            <el-table-column prop="layerName" label="生产段名称" min-width="120"></el-table-column>
            <el-table-column prop="accumulated" :label="`射开有效斜厚\n (m)`" min-width="120" :formatter="toPrecise2"></el-table-column>
            <el-table-column prop="openThickness" :label="`射开有效垂厚\n (m)`" min-width="120" :formatter="toPrecise2"></el-table-column>
            <el-table-column prop="remark" label="备注" show-overflow-tooltip  min-width="150"></el-table-column>
        </el-table>
    </page-panel-new>
</template>

<script>
    import { getComPerfInterval} from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
    import {exportExcel} from "@/lib/exportExcel.js";
    export default {
        props: {
            //选择油田
            oilFeildId: {},
            //选择平台
            platform: {},
            //选择井号
            wellId: {}
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
            doSearch() {
                let request = {
                    ogfId: this.oilFeildId,
                    platformId: this.platform,
                    wellId: this.wellId,
                };
                getComPerfInterval(request).then((res) => {
                    if (res.data.code == 200) {
                        this.tableData = res.data.data.comPerfInterval;
                    }
                })
            },
            //下载
            doDownLoad() {
                let fileName = '射孔数据';
                if (this.wellName) {
                    fileName = this.wellName + fileName;
                }
                exportExcel('#tableData',fileName);
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
        },
    }
</script>

<style scoped lang="scss">
    #tableData{
        ::v-deep .el-table__fixed-header-wrapper .cell,
        ::v-deep .el-table__header-wrapper .cell{
            height: auto;
            line-height: 18px;
            white-space: pre;
        }
        ::v-deep .cell:empty{
            &::before {
                content: '-';
            } 
        }
    } 
</style>
