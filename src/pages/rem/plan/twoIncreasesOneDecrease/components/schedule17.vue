<template>
    <info-window infoWidth="100%" infoHeight="100%" headerTitle="附表17 秦皇岛32-6/渤中作业公司控制递减综合治理专项工作" :isShowMaxBtn="true">
        <el-table id="tableData" class="doubleHeader" :row-style="{ height: '0px' }" :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }" :data="tableData" header-cell-class-name="table_header"
                :cell-style="{ padding: '6px', 'text-align': 'center' }" height="calc(100% - 40px)">
            <el-table-column type="index" label="序号" align="center" width="50px" fixed></el-table-column>
            <el-table-column prop="operationarea" label="作业公司" align="center" width="120" fixed></el-table-column>
            <el-table-column prop="oilField" label="油田" align="center" width="120" fixed></el-table-column>
            <el-table-column prop="yxjj" label="优先解决的问题" align="center" width="340"></el-table-column>
            <el-table-column prop="jjtj" label="主要解决途径" align="center" width="460"></el-table-column>
            <el-table-column prop="jdmb" :label="`阶段目标\n（油水井数比、阶段注采比、压力保持水平、\n含水上升率、自然递减率）`" align="center" width="340"></el-table-column>
            <el-table-column prop="zxgz" :label="`控制递减综合治理专项工作\n（1~2年期）`" align="center" width="460"></el-table-column>
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
                    yxjj: "1、液量受限；2、水驱不均、优势渗流通道发育；3、局部井网不完善",
                    jjtj: "1、扩容改造；2、优化注水及调剖调驱；3、转注及实施调整井完善井网",
                    jdmb: "油水井数比降至2.1，阶段注采比保持在0.8，地层压力保持水平在90%以上，含水上升率降至1.0%，自然递减率控制11%以内，油田采收率提高1.54%",
                    zxgz: "1、2021年8月完成全油田扩容改造；2、2020-2021年完成优化注水310井次，其中调驱调剖18井次；3、2020-2021年完成转注25井次，实施调整井36井次",
                }, ],
            };
        },
    };
</script>

<style lang="scss" scoped>
    ::v-deep .el-table__fixed-header-wrapper .cell {
        line-height: 59px !important;
        height: 59px !important;
    }
    #tableData {
        ::v-deep .el-table__header-wrapper .cell {
            height: auto;
            line-height: 20px;
            white-space: pre;
        }

        ::v-deep .cell:empty {
            &::before {
                content: "-";
            }
        }
    }
</style>

