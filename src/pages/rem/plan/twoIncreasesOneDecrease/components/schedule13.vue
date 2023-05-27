<template>
    <info-window infoWidth="100%" infoHeight="100%" headerTitle="附表13 秦皇岛32-6/渤中作业公司石油地质储量动用规划" :isShowMaxBtn="true">
        <el-table id="tableData" class="doubleHeader" :row-style="{ height: '0px' }" :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }" :data="tableData" header-cell-class-name="table_header"
        :cell-style="{ padding: '6px', 'text-align': 'center' }" height="calc(100% - 40px)">
            <el-table-column type="index" label="序号" align="center" width="50px"  fixed></el-table-column>
            <el-table-column prop="operationarea" label="作业公司" align="center" show-overflow-tooltip width="120"  fixed></el-table-column>
            <el-table-column prop="oilField" label="油田" align="center" show-overflow-tooltip width="120"  fixed></el-table-column>
            <el-table-column :label="`纳入规划地质储量\n(10⁴t)`" align="center">
                <el-table-column prop="nrghtm" label="探明" align="center" width="120"></el-table-column>
                <el-table-column prop="string-affectyield" label="控制" align="center" width="120"></el-table-column>
                <el-table-column prop="string-affectyield" label="预测" align="center" width="120"></el-table-column>
                <el-table-column prop="nrghhj" label="合计" align="center" width="120"></el-table-column>
            </el-table-column>
            <el-table-column :label="`规划动用地质储量\n(10⁴t)`" align="center">
                <el-table-column prop="ghdytm" label="探明" align="center" width="120"></el-table-column>
                <el-table-column prop="string-affectyield" label="控制" align="center" width="120"></el-table-column>
                <el-table-column prop="string-affectyield" label="预测" align="center" width="120"></el-table-column>
                <el-table-column prop="ghdyhj" label="合计" align="center" width="120"></el-table-column>
            </el-table-column>
            <el-table-column :label="`动用程度\n(%)`" align="center">
                <el-table-column prop="dycdtm" label="探明" align="center" width="120"></el-table-column>
                <el-table-column prop="string-affectyield" label="控制" align="center" width="120"></el-table-column>
                <el-table-column prop="string-affectyield" label="预测" align="center" width="120"></el-table-column>
                <el-table-column prop="dycdhj" label="合计" align="center" width="120"></el-table-column>
            </el-table-column>
            <el-table-column prop="ghkccl" :label="'规划可采储量\n(10⁴t)'" align="center" width="140"></el-table-column>
            <el-table-column prop="ghcsl" :label="'规划采收率\n(%)'" align="center" width="140"></el-table-column>
            <el-table-column prop="ljcl" :label="'2019年底累积产量\n(10⁴t)'" align="center" width="160"></el-table-column>
            <el-table-column prop="sykccl" :label="'剩余可采储量\n(10⁴t)'" align="center" width="140"></el-table-column>
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
                    nrghtm: "18756.486",
                    nrghhj: "18756.486",
                    ghdytm: "14888.565",
                    ghdyhj: "14888.565",
                    dycdtm: "71.442",
                    dycdhj: "71.442",
                    ghkccl: "6188.688",
                    ghcsl: "37.413",
                    ljcl: "3116.007",
                    sykccl: "3072.681",
                }, ],
            };
        }
    };
</script>

<style lang="scss" scoped>
    ::v-deep .el-table__fixed-header-wrapper .cell {
        line-height: 51px !important;
        height: 51px !important;
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