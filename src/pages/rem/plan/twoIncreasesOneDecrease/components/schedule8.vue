<template>
    <pagePanel infoWidth="100%" infoHeight="100%" headerTitle="附表8 秦皇岛32-6作业公司年自然递减率工程因素分解" style="height: 100%;" showBtn>
        <el-table id="tableData" class="doubleHeader" :row-style="{ height: '0px' }" :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }" :data="tableData" header-cell-class-name="table_header"
        :cell-style="{ padding: '6px', 'text-align': 'center' }" height="calc(100% - 40px)">
            <el-table-column type="index" label="序号" align="center" width="80" fixed></el-table-column>
            <el-table-column prop="operationarea" label="作业公司" align="center" min-width="180" fixed></el-table-column>
            <el-table-column prop="oilField" label="油田" align="center" min-width="180" fixed></el-table-column>
            <el-table-column prop="years" label="年" align="center" fixed></el-table-column>
            
            <el-table-column prop="annualnaturaldecline" :label="`年自然递减\n（%）`" align="center" min-width="100"></el-table-column>
            <el-table-column prop="affectyield" :label="`影响产量\n（m³）`" align="center" min-width="100"></el-table-column>
            
            <el-table-column label="工程因素分解" align="center">
                <el-table-column label="计划内检修" align="center">
                    <el-table-column prop="jhnzrdj" :label="`年自然递减\n（%）`" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="jhnyxcl" :label="`影响产量\n（m³）`" align="center" min-width="100"></el-table-column>
                </el-table-column>
                <el-table-column label="计划外停产" align="center">
                    <el-table-column label="电力系统故障" align="center">
                        <el-table-column prop="dlxtzrdj" :label="`年自然递减\n（%）`" align="center" min-width="100"></el-table-column>
                        <el-table-column prop="dlxtyxcl" :label="`影响产量\n（m³）`" align="center" min-width="100"></el-table-column>
                    </el-table-column>
                    <el-table-column label="仪器仪表" align="center">
                        <el-table-column prop="yqybzrdj" :label="`年自然递减\n（%）`" align="center" min-width="100"></el-table-column>
                        <el-table-column prop="yqybyxcl" :label="`影响产量\n（m³）`" align="center" min-width="100"></el-table-column>
                    </el-table-column>
                    <el-table-column label="流程跑冒" align="center">
                        <el-table-column prop="string-affectyield" :label="`年自然递减\n（%）`" align="center" min-width="100"></el-table-column>
                        <el-table-column prop="string-affectyield" :label="`影响产量\n（m³）`" align="center" min-width="100"></el-table-column>
                    </el-table-column>
                    <el-table-column label="井口装置故障" align="center">
                        <el-table-column prop="jkzzzrdj" :label="`年自然递减\n（%）`" align="center" min-width="100"></el-table-column>
                        <el-table-column prop="jkzzyxcl" :label="`影响产量\n（m³）`" align="center" min-width="100"></el-table-column>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="其他因素" align="center">
                    <el-table-column prop="string-affectyield" :label="`年自然递减\n（%）`" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="string-affectyield" :label="`影响产量\n（m³）`" align="center" min-width="100"></el-table-column>
                </el-table-column>
            </el-table-column>
            <el-table-column prop="note" label="备注" align="center" min-width="240"></el-table-column>
        </el-table>
    </pagePanel>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [
                    {
                        operationarea: "秦皇岛32-6作业公司",
                        oilField: "秦皇岛32-6油田",
                        years: "2017",
                        annualnaturaldecline: "0.2",
                        affectyield: "5047",
                        jhnzrdj: "0.0208",
                        jhnyxcl: "515",
                        dlxtzrdj: "0.1473",
                        dlxtyxcl: "3648",
                        yqybzrdj: "0.0188",
                        yqybyxcl: "466",
                        jkzzzrdj: "0.0169",
                        jkzzyxcl: "418",
                    },
                    {
                        operationarea: "秦皇岛32-6作业公司",
                        oilField: "秦皇岛32-6油田",
                        years: "2018",
                        annualnaturaldecline: "0.01",
                        affectyield: "297",
                        jhnzrdj: "0.0006",
                        jhnyxcl: "14",
                        dlxtzrdj: "0.0118",
                        dlxtyxcl: "280",
                        yqybzrdj: "",
                        yqybyxcl: "",
                        jkzzzrdj: "0.0001",
                        jkzzyxcl: "3",
                    },
                    {
                        operationarea: "秦皇岛32-6作业公司",
                        oilField: "秦皇岛32-6油田",
                        years: "2019",
                        annualnaturaldecline: "0.19",
                        affectyield: "4589",
                        jhnzrdj: "0.1913",
                        jhnyxcl: "4568",
                        dlxtzrdj: "0.0009",
                        dlxtyxcl: "21",
                        yqybzrdj: "",
                        yqybyxcl: "",
                        jkzzzrdj: "",
                        jkzzyxcl: "",
                    },
                    {
                        operationarea: "秦皇岛32-6作业公司",
                        oilField: "秦皇岛32-6油田",
                        years: "2020",
                        annualnaturaldecline: "0.45",
                        affectyield: "11814",
                        jhnzrdj: "0.0325",
                        jhnyxcl: "854",
                        dlxtzrdj: "0.4166",
                        dlxtyxcl: "10960",
                        yqybzrdj: "",
                        yqybyxcl: "",
                        jkzzzrdj: "",
                        jkzzyxcl: "",
                    },
                ],
            };
        },
    };
</script>

<style lang="scss" scoped>
    ::v-deep .el-table__fixed-header-wrapper .cell {
        line-height: 42px !important;
        height: 42px !important;
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

