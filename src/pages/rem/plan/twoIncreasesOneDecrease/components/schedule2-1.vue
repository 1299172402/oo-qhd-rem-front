<template>
    <pagePanel infoWidth="100%" infoHeight="100%" headerTitle="附表2-1 2019年秦皇岛32-6作业公司探明地质储量动用情况" style="height: 100%;" showBtn>
        <el-table id="tableData" class="doubleHeader" :row-style="{ height: '0px' }" :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }" :data="tableData" header-cell-class-name="table_header"
            :cell-style="{ padding: '6px', 'text-align': 'center' }" height="calc(100% - 40px)">
            <el-table-column type="index" label="序号" width="80" fixed></el-table-column>
            <el-table-column prop="operationarea" label="作业公司" min-width="180" fixed></el-table-column>
            <el-table-column prop="oilField" label="油田" min-width="180" fixed></el-table-column>

            <el-table-column prop="provedreserves" :label="`探明地质储量\n(10⁴t)`" min-width="160"></el-table-column>
            <el-table-column prop="useprovengeologicalreserves" :label="`动用探明地质储量\n(10⁴t)`" min-width="180"></el-table-column>
            <el-table-column :label="`未动用探明地质储量\n(10⁴t)`">
                <el-table-column prop="reservesengineering1" label="工程" min-width="100"></el-table-column>
                <el-table-column prop="reservesheavyoil" label="稠油" min-width="100"></el-table-column>
                <el-table-column prop="reservesthreelow" label="三低" min-width="100"></el-table-column>
                <el-table-column prop="reservesother" label="其他" min-width="100"></el-table-column>
                <el-table-column prop="reservessubtotal" label="小计" min-width="100"></el-table-column>
            </el-table-column>
            <el-table-column :label="`未动用探明地质储量规划/计划动用\n(10⁴t)`">
                <el-table-column prop="plansengineering" label="工程" min-width="100"></el-table-column>
                <el-table-column prop="plansheavyoil" label="稠油" min-width="100"></el-table-column>
                <el-table-column prop="plansthreelow" label="三低" min-width="100"></el-table-column>
                <el-table-column prop="plansother" label="其他" min-width="100"></el-table-column>
                <el-table-column prop="planssubtotal" label="小计" min-width="100"></el-table-column>
            </el-table-column>
            <el-table-column prop="plannedusage" label="规划/计划动用方式" min-width="200"></el-table-column>
            <el-table-column prop="remainingunused" label="剩余未动用主要原因" min-width="240"></el-table-column>
            
        </el-table>
    </pagePanel>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [{
                    oilField: "秦皇岛32-6油田",
                    provedreserves: "18756.4860",
                    operationarea: "秦皇岛32-6作业公司",
                    useprovengeologicalreserves: "14291.1",
                    reservesthreelow: "4465.3860",
                    reservessubtotal: "4465.3860",
                    plansthreelow: "886.8330",
                    planssubtotal: "886.8330",
                    plannedusage: "后期低产低效井侧钻",
                    remainingunused: "非主力砂体薄、差、小、散",
                }],
            };
        },
    };
</script>

<style lang="scss" scoped>
    #tableData {
      ::v-deep .el-table__header-wrapper .cell {
        height: auto;
        line-height: 18px;
        white-space: pre;
      }
      ::v-deep .cell:empty {
        &::before {
          content: "-";
        }
      }
    }
    ::v-deep .el-table__fixed-body-wrapper {
        top: 70px;
    }
    ::v-deep .el-table__fixed-header-wrapper .cell {
        line-height: 29px !important;
        height: 29px !important;
    }
</style>
