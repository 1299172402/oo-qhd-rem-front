<template>
    <info-window infoWidth="100%" infoHeight="100%" headerTitle="附表2-2 2019年秦皇岛作业区探明地质储量规划动用情况" :isShowMaxBtn="true">
        <el-table id="tableData" class="doubleHeader" :row-style="{ height: '0px' }" :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }" :data="tableData" header-cell-class-name="table_header"
            :cell-style="{ padding: '6px', 'text-align': 'center' }" height="calc(100% - 40px)">
            <el-table-column type="index" label="序号" align="center" width="60px" fixed></el-table-column>
            <el-table-column prop="workingarea" label="作业区" align="center" width="120" fixed></el-table-column>
            <el-table-column prop="oilField" label="油田" align="center" width="120" fixed></el-table-column>
            <el-table-column prop="provedreserves" :label="`探明地质储量\n(10⁴t)`" align="center" width="160"></el-table-column>
            <el-table-column :label="`规划动用探明地质储量\n(10⁴t)`" align="center" width="160">
                <el-table-column prop="useengineering" label="工程" align="center" width="100"></el-table-column>
                <el-table-column prop="useheavyoil" label="稠油" align="center" width="100"></el-table-column>
                <el-table-column prop="usethreelow" label="三低" align="center" width="100"></el-table-column>
                <el-table-column prop="useother" label="其他" align="center" width="100"></el-table-column>
                <el-table-column prop="usesubtotal" label="小计" align="center" width="100"></el-table-column>
            </el-table-column>
            <el-table-column :label="`规划未动用探明地质储量\n(10⁴t)`" align="center">
                <el-table-column prop="notuseengineering" label="工程" align="center" width="100"></el-table-column>
                <el-table-column prop="notuseheavyoil" label="稠油" align="center" width="100"></el-table-column>
                <el-table-column prop="notusethreelow" label="三低" align="center" width="100"></el-table-column>
                <el-table-column prop="notuseother" label="其他" align="center" width="100"></el-table-column>
                <el-table-column prop="notusesubtotal" label="小计" align="center" width="100"></el-table-column>
            </el-table-column>
            <el-table-column prop="nonutilizationofplanning" label="规划未动用主要原因" align="center" min-width="240"></el-table-column>
        </el-table>
    </info-window>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [{
                    oilField: "QHD32-6",
                    provedreserves: "18756.486",
                    workingarea: "秦皇岛",
                    usethreelow: "4465.386",
                    usesubtotal: "4465.386",
                    notusethreelow: "886.833",
                    notusesubtotal: "886.833",
                    nonutilizationofplanning: "非主力砂体薄、差、小、散",
                }, ],
            }
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
