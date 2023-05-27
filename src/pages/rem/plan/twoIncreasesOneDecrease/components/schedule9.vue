<template>
    <info-window infoWidth="100%" infoHeight="100%" headerTitle="附表9 秦皇岛32-6/渤中作业公司年自然递减率生产运行因素分解" :isShowMaxBtn="true">
        
        <el-table class="doubleHeader" :row-style="{ height: '0px' }" :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }" :data="tableData" header-cell-class-name="table_header"
        :cell-style="{ padding: '6px', 'text-align': 'center' }" height="calc(100% - 40px)">
        
            <el-table-column type="index" label="序号" align="center" width="50px" fixed></el-table-column>
            <el-table-column prop="operationarea" label="作业公司" align="center" width="120" fixed></el-table-column>
            <el-table-column prop="oilField" label="油田" align="center" width="120" fixed></el-table-column>
            <el-table-column prop="years" label="年" align="center" fixed></el-table-column>
            
            <el-table-column prop="annualnaturaldecline" :label="`年自然递减\n（%）`" align="center" width="100"></el-table-column>
            <el-table-column prop="affectyield" :label="`影响产量\n（m³）`" align="center" width="100"></el-table-column>
            
            <el-table-column label="生产运行因素分解" align="center">
                <el-table-column label="海管腐蚀漏失" align="center">
                    <el-table-column prop="string-affectyield" :label="`年自然递减\n（%）`" align="center" width="100"></el-table-column>
                    <el-table-column prop="string-affectyield" :label="`影响产量\n（m³）`" align="center" width="100"></el-table-column>
                </el-table-column>
                <el-table-column label="海管外力破坏" align="center">
                    <el-table-column prop="string-affectyield" :label="`年自然递减\n（%）`" align="center" width="100"></el-table-column>
                    <el-table-column prop="string-affectyield" :label="`影响产量\n（m³）`" align="center" width="100"></el-table-column>
                </el-table-column>
                <el-table-column label="海缆故障" align="center">
                    <el-table-column prop="string-affectyield" :label="`年自然递减\n（%）`" align="center" width="100"></el-table-column>
                    <el-table-column prop="string-affectyield" :label="`影响产量\n（m³）`" align="center" width="100"></el-table-column>
                </el-table-column>
                <el-table-column label="海缆外力破坏" align="center">
                    <el-table-column prop="string-affectyield" :label="`年自然递减\n（%）`" align="center" width="100"></el-table-column>
                    <el-table-column prop="string-affectyield" :label="`影响产量\n（m³）`" align="center" width="100"></el-table-column>
                </el-table-column>
                <el-table-column label="天气" align="center">
                    <el-table-column prop="string-affectyield" :label="`年自然递减\n（%）`" align="center" width="100"></el-table-column>
                    <el-table-column prop="string-affectyield" :label="`影响产量\n（m³）`" align="center" width="100"></el-table-column>
                </el-table-column>
                <el-table-column label="限液" align="center">
                    <el-table-column prop="xyzrdj" :label="`年自然递减\n（%）`" align="center" width="100"></el-table-column>
                    <el-table-column prop="xyyxcl" :label="`影响产量\n（m³）`" align="center" width="100"></el-table-column>
                </el-table-column>
                <el-table-column label="其他因素" align="center">
                    <el-table-column prop="qtzrdj" :label="`年自然递减\n（%）`" align="center" width="100"></el-table-column>
                    <el-table-column prop="qtyxcl" :label="`影响产量\n（m³）`" align="center" width="100"></el-table-column>
                </el-table-column>
            </el-table-column>
            <el-table-column prop="note" label="备注" align="center" width="240"></el-table-column>
        </el-table>
        
    </info-window>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [{
                        operationarea: "秦皇岛",
                        oilField: "QHD32-6",
                        years: "2017",
                        annualnaturaldecline: "0.06",
                        affectyield: "1437",
                        xyzrdj: "0.0563",
                        xyyxcl: "1395",
                        qtzrdj: "0.0017",
                        qtyxcl: "42",
                    },
                    {
                        operationarea: "秦皇岛",
                        oilField: "QHD32-6",
                        years: "2018",
                        annualnaturaldecline: "0.23",
                        affectyield: "5450",
                        xyzrdj: "0.2295",
                        xyyxcl: "5450",
                        qtzrdj: "",
                        qtyxcl: "",
                    },
                    {
                        operationarea: "秦皇岛",
                        oilField: "QHD32-6",
                        years: "2019",
                        annualnaturaldecline: "0.43",
                        affectyield: "10249",
                        xyzrdj: "0.4292",
                        xyyxcl: "10249",
                        qtzrdj: "",
                        qtyxcl: "",
                    },
                    {
                        operationarea: "秦皇岛",
                        oilField: "QHD32-6",
                        years: "2020",
                        annualnaturaldecline: "0.2",
                        affectyield: "5209",
                        xyzrdj: "0.198",
                        xyyxcl: "5209",
                        qtzrdj: "",
                        qtyxcl: "",
                    },
                ],
            };
        }
    }
</script>

<style lang="scss" scoped>
    ::v-deep .el-table__fixed-header-wrapper .cell {
        line-height: 45px !important;
        height: 45px !important;
    }
    #tableData {
        ::v-deep .el-table__header-wrapper .cell {
            height: auto;
            white-space: pre;
        }

        ::v-deep .cell:empty {
            &::before {
                content: "-";
            }
        }
    }
</style>