<template>
        <info-window infoWidth="100%" infoHeight="100%" headerTitle="附表15 秦皇岛32-6/渤中作业公司提高采收率实施路径" :isShowMaxBtn="true">
            <el-table id="tableData" class="doubleHeader" :row-style="{ height: '0px' }" :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }" :data="tableData" header-cell-class-name="table_header"
                :cell-style="{ padding: '6px', 'text-align': 'center' }" height="calc(100% - 40px)">
                <el-table-column type="index" label="序号" align="center" width="50px" fixed></el-table-column>
                <el-table-column prop="operationarea" label="作业公司" align="center" width="120" fixed></el-table-column>
                <el-table-column prop="oilField" label="油田" align="center" width="120" fixed></el-table-column>
                
                <el-table-column prop="czwt" label="存在问题" align="center" width="340"></el-table-column>
                <el-table-column prop="ghcsl" :label="`规划采收率\n(%)`" align="center" width="120"></el-table-column>
                <el-table-column prop="sslj" label="实施路径" align="center" width="340"></el-table-column>
                <el-table-column prop="ztmb" :label="`总体目标（油水井数比、阶段注采比、压力\n保持水平、含水上升率、自然递减率等）`" align="center" width="340"></el-table-column>
                <el-table-column prop="slfd" :label="`提高采收率幅度\n（%）`" align="center" width="140"></el-table-column>
                <el-table-column prop="kccl" :label="`增加石油可采储量\n(10⁴t)`" align="center" width="140"></el-table-column>
                <el-table-column prop="zdcs" label="重大措施" align="center" width="340"></el-table-column>
                <el-table-column prop="csjk" label="配套措施简况" align="center" width="340"></el-table-column>
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
                    czwt: "1、油田整体含水高，水驱效率低，油田液处理能力受限，基础产量及措施产量存在风险；2、油田进入特高含水阶段、主力砂体挖潜难度越来越大，目前井网难动用；3、优质主力砂体水驱采收率高，进一步提高采收率难度大",
                    sslj: "1、深化优化注水，降低自然递减率，实施扩容改造；2、精细刻画剩余油，深化油田挖潜工作；3、优选潜力井区，开展三次采油",
                    ztmb: "十五五”末实现油水井数比降至1.8，阶段注采比1.0，压力保持水平90%，含水上升率控制在0.2%，自然递减率降至10%以内",
                    slfd: "6.25",
                    kccl: "1034.05",
                    zdcs: "1、油井转注41井次；2、2020~2030年增加调整井128口；3、2026年开始实施化学驱，化学驱储量约4500万吨，涉及55个井组",
                    csjk: "1、2021年8月完成全油田扩容改造；2、H平台2020-2021年内挂实施10口调整井；其余通过其他平台外挂及低效井逐步实施",
                }, ],
            };
        },
    };
</script>

<style lang="scss" scoped>
    ::v-deep .el-table__fixed-header-wrapper .cell {
        line-height: 67px !important;
        height: 67px !important;
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
