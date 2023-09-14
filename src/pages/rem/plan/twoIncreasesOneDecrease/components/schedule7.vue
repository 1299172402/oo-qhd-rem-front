<template>
    <pagePanel infoWidth="100%" infoHeight="100%" headerTitle="附表7 秦皇岛32-6作业公司年自然递减率作业因素分解" style="height: 100%;" showBtn>
        <el-table id="tableData" class="doubleHeader" :row-style="{ height: '0px' }" :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }" :data="tableData" header-cell-class-name="table_header"
            :cell-style="{ padding: '6px', 'text-align': 'center' }" height="calc(100% - 40px)">
            <el-table-column type="index" label="序号" align="center" width="80" fixed></el-table-column>
            <el-table-column prop="operationarea" label="作业公司" align="center" min-width="180" fixed></el-table-column>
            <el-table-column prop="oilField" label="油田" align="center" min-width="180" fixed></el-table-column>
            <el-table-column prop="years" label="年" align="center" fixed></el-table-column>
            <el-table-column prop="annualnaturaldecline" :label="`年自然递减\n（%）`" align="center" min-width="100"></el-table-column>
            <el-table-column prop="affectyield" :label="`影响产量\n（m³）`" align="center" min-width="100"></el-table-column>
            <el-table-column label="作业因素分解" align="center">
                <el-table-column label="有修井机平台举升系统故障" align="center">
                    <el-table-column label="故障待修" align="center">
                        <el-table-column prop="organicmalfunctionsannualnaturaldecrease" :label="`年自然递减\n（%）`" min-width="100" align="center"></el-table-column>
                        <el-table-column prop="organicmalfunctionsaffectyield" :label="`影响产量\n（m³）`" align="center" min-width="100"></el-table-column>
                    </el-table-column>
                    <el-table-column label="检修作业" align="center">
                        <el-table-column prop="organicoverhaulingannualnaturaldecrease" :label="`年自然递减\n（%）`" min-width="100" align="center"></el-table-column>
                        <el-table-column prop="organicoverhaulingaffectyield" :label="`影响产量\n（m³）`" align="center" min-width="100"></el-table-column>
                    </el-table-column>
                    <el-table-column label="检修后产量下降" align="center">
                        <el-table-column prop="organicyieldannualnaturaldecrease" :label="`年自然递减\n（%）`" min-width="100" align="center"></el-table-column>
                        <el-table-column prop="organicyieldaffectyield" :label="`影响产量\n（m³）`" align="center" min-width="100"></el-table-column>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="无修井机平台举升系统故障" align="center">
                    <el-table-column label="故障待修" align="center">
                        <el-table-column prop="inorganicsmalfunctionsannualnaturaldecrease" :label="`年自然递减\n（%）`" min-width="100" align="center"></el-table-column>
                        <el-table-column prop="inorganicsmalfunctionsaffectyield" :label="`影响产量\n（m³）`" min-width="100" align="center"></el-table-column>
                    </el-table-column>
                    <el-table-column label="检修作业" align="center">
                        <el-table-column prop="inorganicsoverhaulingannualnaturaldecrease" :label="`年自然递减\n（%）`" min-width="100" align="center"></el-table-column>
                        <el-table-column prop="inorganicsoverhaulingaffectyield" :label="`影响产量\n（m³）`" min-width="100" align="center"></el-table-column>
                    </el-table-column>
                    <el-table-column label="检修后产量下降" align="center">
                        <el-table-column prop="inorganicsyieldannualnaturaldecrease" :label="`年自然递减\n（%）`" min-width="100" align="center"></el-table-column>
                        <el-table-column prop="inorganicsyieldaffectyield" :label="`影响产量\n（m³）`" align="center" min-width="100"></el-table-column>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="增产作业" align="center">
                    <el-table-column label="作业期间损失" align="center">
                        <el-table-column prop="operationallossannualnaturaldecrease" :label="`年自然递减\n（%）`" min-width="100" align="center"></el-table-column>
                        <el-table-column prop="operationallossaffectyield" :label="`影响产量\n（m³）`" align="center" min-width="100"></el-table-column>
                    </el-table-column>
                    <el-table-column label="作业后效果变差" align="center">
                        <el-table-column prop="aftertheworkannualnaturaldecrease" :label="`年自然递减\n（%）`" min-width="100" align="center"></el-table-column>
                        <el-table-column prop="aftertheworkaffectyield" :label="`影响产量\n（m³）`" align="center" min-width="100"></el-table-column>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="测试" align="center">
                    <el-table-column prop="testingannualnaturaldecrease" :label="`年自然递减\n（%）`" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="testingaffectyield" :label="`影响产量\n（m³）`" align="center" min-width="100"></el-table-column>
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
                tableData: [
                    {
                        operationarea: "秦皇岛32-6作业公司",
                        oilField: "秦皇岛32-6油田",
                        years: "2017",
                        annualnaturaldecline: "0.89",
                        affectyield: "21962",
                        organicmalfunctionsannualnaturaldecrease: "0.3124",
                        organicmalfunctionsaffectyield: "7734",
                        organicoverhaulingannualnaturaldecrease: "0.2012",
                        inorganicsoverhaulingaffectyield: "4982",
                        inorganicsyieldannualnaturaldecrease: "0.1364",
                        inorganicsyieldaffectyield: "3378",
                        inorganicsmalfunctionsannualnaturaldecrease: "",
                        inorganicsmalfunctionsaffectyield: "",
                        operationallossannualnaturaldecrease: "0.158",
                        operationallossaffectyield: "3912",
                        aftertheworkannualnaturaldecrease: "0.0476",
                        aftertheworkaffectyield: "1179",
                        testingannualnaturaldecrease: "0.0314",
                        testingaffectyield: "777",
                        otherannualnaturaldecrease: "",
                        otheraffectyield: "",
                    },
                    {
                        operationarea: "秦皇岛32-6作业公司",
                        oilField: "秦皇岛32-6油田",
                        years: "2018",
                        annualnaturaldecline: "0.91",
                        affectyield: "21559",
                        organicmalfunctionsannualnaturaldecrease: "0.5327",
                        organicmalfunctionsaffectyield: "12649",
                        organicoverhaulingannualnaturaldecrease: "0.0307",
                        inorganicsoverhaulingaffectyield: "730",
                        inorganicsyieldannualnaturaldecrease: "0.1069",
                        inorganicsyieldaffectyield: "2537",
                        inorganicsmalfunctionsannualnaturaldecrease: "",
                        inorganicsmalfunctionsaffectyield: "",
                        operationallossannualnaturaldecrease: "0.1017",
                        operationallossaffectyield: "2414",
                        aftertheworkannualnaturaldecrease: "0.0639",
                        aftertheworkaffectyield: "1518",
                        testingannualnaturaldecrease: "0.0449",
                        testingaffectyield: "1066",
                        otherannualnaturaldecrease: "0.0272",
                        otheraffectyield: "645",
                    },
                    {
                        operationarea: "秦皇岛32-6作业公司",
                        oilField: "秦皇岛32-6油田",
                        years: "2019",
                        annualnaturaldecline: "0.77",
                        affectyield: "18317",
                        organicmalfunctionsannualnaturaldecrease: "0.5013",
                        organicmalfunctionsaffectyield: "11969",
                        organicoverhaulingannualnaturaldecrease: "0.0652",
                        inorganicsoverhaulingaffectyield: "1557",
                        inorganicsyieldannualnaturaldecrease: "0.0277",
                        inorganicsyieldaffectyield: "662",
                        inorganicsmalfunctionsannualnaturaldecrease: "",
                        inorganicsmalfunctionsaffectyield: "",
                        operationallossannualnaturaldecrease: "0.0728",
                        operationallossaffectyield: "1738",
                        aftertheworkannualnaturaldecrease: "0.071",
                        aftertheworkaffectyield: "1696",
                        testingannualnaturaldecrease: "0.0291",
                        testingaffectyield: "695",
                        otherannualnaturaldecrease: "",
                        otheraffectyield: "",
                    },
                    {
                        operationarea: "秦皇岛32-6作业公司",
                        oilField: "秦皇岛32-6油田",
                        years: "2020",
                        annualnaturaldecline: "0.83",
                        affectyield: "21940",
                        organicmalfunctionsannualnaturaldecrease: "0.356",
                        organicmalfunctionsaffectyield: "9365",
                        organicoverhaulingannualnaturaldecrease: "0.074",
                        inorganicsoverhaulingaffectyield: "1947",
                        inorganicsyieldannualnaturaldecrease: "0.1809",
                        inorganicsyieldaffectyield: "4759",
                        inorganicsmalfunctionsannualnaturaldecrease: "0.0002",
                        inorganicsmalfunctionsaffectyield: "6",
                        operationallossannualnaturaldecrease: "0.1634",
                        operationallossaffectyield: "4298",
                        aftertheworkannualnaturaldecrease: "0.0344",
                        aftertheworkaffectyield: "904",
                        testingannualnaturaldecrease: "0.0226",
                        testingaffectyield: "594",
                        otherannualnaturaldecrease: "0.0025",
                        otheraffectyield: "67",
                    },
                ],
            }
        }
    }
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
