<template>
    <info-window infoWidth="100%" infoHeight="100%" headerTitle="附表5 秦皇岛32-6/渤中作业公司年自然递减率地质油藏因素分解" :isShowMaxBtn="true">
        <el-table class="doubleHeader" :row-style="{ height: '0px' }" :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }" :data="tableData" header-cell-class-name="table_header"
            :cell-style="{ padding: '6px', 'text-align': 'center' }" height="calc(100% - 40px)">
            
            <el-table-column type="index" label="序号" align="center" width="50px" fixed></el-table-column>
            <el-table-column prop="operationarea" label="作业公司" align="center" width="100" fixed></el-table-column>
            <el-table-column prop="oilField" label="油田" align="center" width="100" fixed></el-table-column>
            <el-table-column prop="years" label="年" align="center" fixed></el-table-column>
            
            <el-table-column prop="annualnaturaldecline" :label="`年自然递减\n（%）`" align="center" width="100"></el-table-column>
            <el-table-column prop="affectyield" :label="`影响产量\n（m³）`" align="center" width="100"></el-table-column>
            
            <el-table-column label="地质油藏因素分解" align="center">
                <el-table-column label="转注影响" align="center">
                    <el-table-column prop="conversionannualnaturaldecrease" :label="`年自然递减\n（%）`" align="center" width="100"></el-table-column>
                    <el-table-column prop="conversionaffectyield" :label="`影响产量\n（m³）`" align="center" width="100"></el-table-column>
                </el-table-column>
                <el-table-column label="侧钻影响" align="center">
                    <el-table-column prop="sidetrackannualnaturaldecrease" :label="`年自然递减\n（%）`" align="center" width="100"></el-table-column>
                    <el-table-column prop="sidetrackaffectyield" :label="`影响产量\n（m³）`" align="center" width="100"></el-table-column>
                </el-table-column>
                <el-table-column label="含水上升影响" align="center">
                    <el-table-column prop="waterannualnaturaldecrease" :label="`年自然递减\n（%）`" align="center" width="100"></el-table-column>
                    <el-table-column prop="wateraffectyield" :label="`影响产量\n（m³）`" align="center" width="100"></el-table-column>
                </el-table-column>
                <el-table-column label="产液结构优化" align="center">
                    <el-table-column prop="productionannualnaturaldecrease" :label="`年自然递减\n（%）`" align="center" width="100"></el-table-column>
                    <el-table-column prop="productionaffectyield" :label="`影响产量\n（m³）`" align="center" width="100"></el-table-column>
                </el-table-column>
                <el-table-column label="能量不足" align="center">
                    <el-table-column prop="energyannualnaturaldecrease" :label="`年自然递减\n（%）`" align="center" width="100"></el-table-column>
                    <el-table-column prop="energyaffectyield" :label="`影响产量\n（m³）`" align="center" width="100"></el-table-column>
                </el-table-column>
                <el-table-column label="其他因素" align="center">
                    <el-table-column prop="otherannualnaturaldecrease" :label="`年自然递减\n（%）`" align="center" width="100"></el-table-column>
                    <el-table-column prop="otheraffectyield" :label="`影响产量\n（m³）`" align="center" width="100"></el-table-column>
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
                        annualnaturaldecline: "10.65",
                        affectyield: "263586",
                        conversionannualnaturaldecrease: "0.3772",
                        conversionaffectyield: "9338",
                        sidetrackannualnaturaldecrease: "0.1654",
                        sidetrackaffectyield: "4094",
                        waterannualnaturaldecrease: "26.9173",
                        wateraffectyield: "666428",
                        productionannualnaturaldecrease: "-18.7638",
                        productionaffectyield: "-464560",
                        energyannualnaturaldecrease: "1.9502",
                        energyaffectyield: "48284",
                        otherannualnaturaldecrease: "0.0001",
                        otheraffectyield: "2",
                    },
                    {
                        operationarea: "秦皇岛",
                        oilField: "QHD32-6",
                        years: "2018",
                        annualnaturaldecline: "7.13",
                        affectyield: "169179",
                        conversionannualnaturaldecrease: "0.2075",
                        conversionaffectyield: "4926",
                        sidetrackannualnaturaldecrease: "0.1725",
                        sidetrackaffectyield: "4096",
                        waterannualnaturaldecrease: "23.9347",
                        wateraffectyield: "568292",
                        productionannualnaturaldecrease: "-19.6549",
                        productionaffectyield: "-466674",
                        energyannualnaturaldecrease: "2.4535",
                        energyaffectyield: "58254",
                        otherannualnaturaldecrease: "0.012",
                        otheraffectyield: "285",
                    },
                    {
                        operationarea: "秦皇岛",
                        oilField: "QHD32-6",
                        years: "2019",
                        annualnaturaldecline: "5.06",
                        affectyield: "120901",
                        conversionannualnaturaldecrease: "0.0581",
                        conversionaffectyield: "1388",
                        sidetrackannualnaturaldecrease: "0.2881",
                        sidetrackaffectyield: "6880",
                        waterannualnaturaldecrease: "14.401",
                        wateraffectyield: "343849",
                        productionannualnaturaldecrease: "-13.7579",
                        productionaffectyield: "-328494",
                        energyannualnaturaldecrease: "4.0309",
                        energyaffectyield: "96245",
                        otherannualnaturaldecrease: "0.0433",
                        otheraffectyield: "1033",
                    },
                    {
                        operationarea: "秦皇岛",
                        oilField: "QHD32-6",
                        years: "2020",
                        annualnaturaldecline: "11.04",
                        affectyield: "290495",
                        conversionannualnaturaldecrease: "0.0468",
                        conversionaffectyield: "1230",
                        sidetrackannualnaturaldecrease: "0.3134",
                        sidetrackaffectyield: "8245",
                        waterannualnaturaldecrease: "26.0599",
                        wateraffectyield: "685538",
                        productionannualnaturaldecrease: "-20.4522",
                        productionaffectyield: "-538020",
                        energyannualnaturaldecrease: "4.6809",
                        energyaffectyield: "123136",
                        otherannualnaturaldecrease: "0.368",
                        otheraffectyield: "9680",
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
