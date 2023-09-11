<template>
    <pagePanel infoWidth="100%" infoHeight="100%" headerTitle="附表6 秦皇岛32-6作业公司年自然递减率井筒因素分解" style="height: 100%;" showBtn>
        <el-table id="tableData" class="doubleHeader" :row-style="{ height: '0px' }" :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }" :data="tableData" header-cell-class-name="table_header"
            :cell-style="{ padding: '6px', 'text-align': 'center' }" height="calc(100% - 40px)">
           
            <el-table-column type="index" label="序号" align="center" width="80" fixed></el-table-column>
            <el-table-column prop="operationarea" label="作业公司" align="center" min-width="180" fixed></el-table-column>
            <el-table-column prop="oilField" label="油田" align="center" min-width="180" fixed></el-table-column>
            <el-table-column prop="years" label="年" align="center" fixed></el-table-column>
            
            <el-table-column prop="annualnaturaldecline" :label="`年自然递减\n（%）`" align="center" min-width="100"></el-table-column>
            <el-table-column prop="affectyield" :label="`影响产量\n（m³）`" align="center" min-width="100"></el-table-column>
            <el-table-column label="井筒因素分解" align="center">
                <el-table-column label="管柱问题" align="center">
                    <el-table-column prop="stringannualnaturaldecrease" :label="`年自然递减\n（%）`" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="stringaffectyield" :label="`影响产量\n（m³）`" align="center" min-width="100"></el-table-column>
                </el-table-column>
                <el-table-column label="结垢结蜡" align="center">
                    <el-table-column prop="scalingannualnaturaldecrease" :label="`年自然递减\n（%）`" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="scalingaffectyield" :label="`影响产量\n（m³）`" align="center" min-width="100"></el-table-column>
                </el-table-column>
                <el-table-column label="井下落物" align="center">
                    <el-table-column prop="fallingobjectsannualnaturaldecrease" :label="`年自然递减\n（%）`" min-width="100" align="center"></el-table-column>
                    <el-table-column prop="fallingobjectsaffectyield" :label="`影响产量\n（m³）`" align="center" min-width="100"></el-table-column>
                </el-table-column>
                <el-table-column label="污染" align="center">
                    <el-table-column prop="pollutionannualnaturaldecrease" :label="`年自然递减\n（%）`" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="pollutionaffectyield" :label="`影响产量\n（m³）`" align="center" min-width="100"></el-table-column>
                </el-table-column>
                <el-table-column label="出砂" align="center">
                    <el-table-column prop="productionannualnaturaldecrease" :label="`年自然递减\n（%）`" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="productionaffectyield" :label="`影响产量\n（m³）`" align="center" min-width="100"></el-table-column>
                </el-table-column>
                <el-table-column label="其他因素" align="center">
                    <el-table-column prop="otherannualnaturaldecrease" :label="`年自然递减\n（%）`" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="otheraffectyield" :label="`影响产量\n（m³）`" align="center" min-width="100"></el-table-column>
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
                tableData: [{
                        operationarea: "秦皇岛32-6作业公司",
                        oilField: "秦皇岛32-6油田",
                        years: "2017",
                        annualnaturaldecline: "2.46",
                        affectyield: "60980",
                        stringannualnaturaldecrease: "0.0025",
                        stringaffectyield: "63",
                        fallingobjectsannualnaturaldecrease: "",
                        pollutionaffectyield: "",
                        productionannualnaturaldecrease: "2.4605",
                        productionaffectyield: "60917",
                    },
                    {
                        operationarea: "秦皇岛32-6作业公司",
                        oilField: "秦皇岛32-6油田",
                        years: "2018",
                        annualnaturaldecline: "2.72",
                        affectyield: "64596",
                        stringannualnaturaldecrease: "",
                        stringaffectyield: "",
                        fallingobjectsannualnaturaldecrease: "0.0219",
                        pollutionaffectyield: "519",
                        productionannualnaturaldecrease: "2.6987",
                        productionaffectyield: "64077",
                    },
                    {
                        operationarea: "秦皇岛32-6作业公司",
                        oilField: "秦皇岛32-6油田",
                        years: "2019",
                        annualnaturaldecline: "2.62",
                        affectyield: "62501",
                        stringannualnaturaldecrease: "",
                        stringaffectyield: "",
                        fallingobjectsannualnaturaldecrease: "",
                        pollutionaffectyield: "",
                        productionannualnaturaldecrease: "2.6176",
                        productionaffectyield: "62501",
                    },
                    {
                        operationarea: "秦皇岛32-6作业公司",
                        oilField: "秦皇岛32-6油田",
                        years: "2020",
                        annualnaturaldecline: "2.48",
                        affectyield: "65126",
                        stringannualnaturaldecrease: "",
                        stringaffectyield: "",
                        fallingobjectsannualnaturaldecrease: "0",
                        pollutionaffectyield: "1",
                        productionannualnaturaldecrease: "2.4757",
                        productionaffectyield: "65125",
                    },
                ],
            };
        }
    };
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
