<template>
    <info-window infoWidth="100%" infoHeight="100%" headerTitle="附表4 秦皇岛32-6/渤中作业公司年自然递减率主控因素分析" :isShowMaxBtn="true">
        
        <el-table class="doubleHeader" :row-style="{ height: '0px' }" :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }" :data="tableData" header-cell-class-name="table_header"
            :cell-style="{ padding: '6px', 'text-align': 'center' }" height="calc(100% - 40px)">
            
            <el-table-column type="index" label="序号" width="50px" fixed></el-table-column>
            <el-table-column prop="operationarea" label="作业公司" width="100" fixed></el-table-column>
            <el-table-column prop="oilField" label="油田" width="100" fixed></el-table-column>
            <el-table-column prop="years" label="年" fixed></el-table-column>
            
            <el-table-column prop="annualnaturaldecline" :label="`年自然递减\n（%）`" width="100"></el-table-column>
            <el-table-column prop="affectyield" :label="`影响产量\n（m³）`" width="100"></el-table-column>
            
            <el-table-column label="各主控因素分解">
                <el-table-column label="地质油藏因素">
                    <el-table-column prop="geologyannualnaturaldecrease" :label="`年自然递减\n（%）`" width="100"></el-table-column>
                    <el-table-column prop="geologyaffectyield" :label="`影响产量\n（m³）`" width="100"></el-table-column>
                </el-table-column>
                <el-table-column label="井筒因素">
                    <el-table-column prop="wellboreannualnaturaldecrease" :label="`年自然递减\n（%）`" width="100"></el-table-column>
                    <el-table-column prop="wellboreaffectyield" :label="`影响产量\n（m³）`" width="100"></el-table-column>
                </el-table-column>
                <el-table-column label="作业因素">
                    <el-table-column prop="workannualnaturaldecrease" :label="`年自然递减\n（%）`" width="100"></el-table-column>
                    <el-table-column prop="workaffectyield" :label="`影响产量\n（m³）`" width="100"></el-table-column>
                </el-table-column>
                <el-table-column label="工程因素">
                    <el-table-column prop="projectannualnaturaldecrease" :label="`年自然递减\n（%）`" width="100"></el-table-column>
                    <el-table-column prop="projectaffectyield" :label="`影响产量\n（m³）`" width="100"></el-table-column>
                </el-table-column>
                <el-table-column label="生产运行因素">
                    <el-table-column prop="productionannualnaturaldecrease" :label="`年自然递减\n（%）`" width="100"></el-table-column>
                    <el-table-column prop="productionaffectyield" :label="`影响产量\n（m³）`" width="100"></el-table-column>
                </el-table-column>
                <el-table-column label="其他因素">
                    <el-table-column prop="otherannualnaturaldecrease" :label="`年自然递减\n（%）`" width="100"></el-table-column>
                    <el-table-column prop="otheraffectyield" :label="`影响产量\n（m³）`" width="100"></el-table-column>
                </el-table-column>
            </el-table-column>
            <el-table-column prop="note" label="备注" width="240"></el-table-column>
        </el-table>
    </info-window>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [
                    {
                        operationarea: '秦皇岛',
                        oilField: 'QHD32-6',
                        years: '2017',
                        annualnaturaldecline: '14.26',
                        affectyield: '353012',
                        geologyannualnaturaldecrease: '10.6464',
                        geologyaffectyield: '263586',
                        wellboreannualnaturaldecrease: '2.463',
                        wellboreaffectyield: '60980',
                        workannualnaturaldecrease: '0.887',
                        workaffectyield: '21962',
                        projectannualnaturaldecrease: '0.2038',
                        projectaffectyield: '5047',
                        productionannualnaturaldecrease: '0.058',
                        productionaffectyield: '1437',
                    },
                    {
                        operationarea: '秦皇岛',
                        oilField: 'QHD32-6',
                        years: '2018',
                        annualnaturaldecline: '11',
                        affectyield: '261081',
                        geologyannualnaturaldecrease: '7.1253',
                        geologyaffectyield: '169179',
                        wellboreannualnaturaldecrease: '2.7206',
                        wellboreaffectyield: '64596',
                        workannualnaturaldecrease: '0.908',
                        workaffectyield: '21559',
                        projectannualnaturaldecrease: '0.0125',
                        projectaffectyield: '297',
                        productionannualnaturaldecrease: '0.2295',
                        productionaffectyield: '5450',
                    },
                    {
                        operationarea: '秦皇岛',
                        oilField: 'QHD32-6',
                        years: '2019',
                        annualnaturaldecline: '9.07',
                        affectyield: '216557',
                        geologyannualnaturaldecrease: '5.0635',
                        geologyaffectyield: '120901',
                        wellboreannualnaturaldecrease: '2.6176',
                        wellboreaffectyield: '62501',
                        workannualnaturaldecrease: '0.7671',
                        workaffectyield: '18317',
                        projectannualnaturaldecrease: '0.1922',
                        projectaffectyield: '4589',
                        productionannualnaturaldecrease: '0.4292',
                        productionaffectyield: '10249',
                    },
                    {
                        operationarea: '秦皇岛',
                        oilField: 'QHD32-6',
                        years: '2020',
                        annualnaturaldecline: '15',
                        affectyield: '394584',
                        geologyannualnaturaldecrease: '11.0429',
                        geologyaffectyield: '290495',
                        wellboreannualnaturaldecrease: '2.4757',
                        wellboreaffectyield: '65126',
                        workannualnaturaldecrease: '0.834',
                        workaffectyield: '21940',
                        projectannualnaturaldecrease: '0.4491',
                        projectaffectyield: '11814',
                        productionannualnaturaldecrease: '0.198',
                        productionaffectyield: '5209',
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
</style>
