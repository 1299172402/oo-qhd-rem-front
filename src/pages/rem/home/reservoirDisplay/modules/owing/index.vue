<template>
    <info-window
        info-width="100%"
        info-height="100%"
        header-title="超欠注情况统计"
        :is-show-max-btn="true"
    >
        <button class="detailLinkBtn" @click="linkroute('/injection/indexHome')">详细</button>
        <el-button size="mini" type="primary" style="z-index:20;float:right" @click="downTable">下载</el-button>
        <el-table
            :data="tableData"
            height="100%"
            id="tabledata"
            style="width: 100%"
        >
            <el-table-column prop="date" label="序号" align="center" width="50">
                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>
            <el-table-column prop="wellName" label="井号" width="130"
                             align="center"></el-table-column>
            <el-table-column prop="productionIntervalNo" label="层位" align="center" width="200">
                <template slot-scope="scope">
                    <span>{{ scope.row.productionIntervalNo }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="injPump" label="注水工况" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.injPump }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="overflowInj" align="center" width="90">
                <template slot="header">
                    超/欠注量
                </template>
                <template slot-scope="scope">
                    <span>{{ scope.row.overflowInj }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="dayNum" label="天数?(d)" :render-header="renderheader"
                             width="70" align="center"></el-table-column>
            <el-table-column prop="injAllocRatio" label="比例?(%)" :render-header="renderheader"
                             width="70" align="center"></el-table-column>
        </el-table>

    </info-window>

</template>

<script>
import {getUltraShortShotStatistics} from "@/api/rem/r-intelligentIPA";
import {exportExcel} from "@/lib/exportExcel";
export default {
    data() {
        return {
            tableData: [],
        };
    },
    mounted() {
        this.queryUltraShortShotStatistics()
    },
    methods: {
        linkroute(rname) {
            this.$router.push({path: rname,query: {link:'remHome'}});
        },
        renderheader(h, {column, $index}) {
            return h('span', {}, [
                h('span', {}, column.label.split('?')[0]),
                h('br'),
                h('span', {}, column.label.split('?')[1])
            ]);
        },
        downTable(){
            exportExcel("#tabledata", "超欠注情况统计");
        },
        //超欠注情况统计
        queryUltraShortShotStatistics() {
            let queryData = {
                //区块
                blockId: 'YCFXDY8B643EDC9007F96F570600457D',
                //选择时间
                // dateTime: new Date().format('YYYY-MM') ,
                //修改取数的日期为5月
                dateTime: new Date().getFullYear() + '-' + (new Date().getMonth()),
                // dateTime:'2023-02',
                //油田
                ogfId: '3FC9A818F5BC43B88270DB80BBB3018F'
            }
            getUltraShortShotStatistics(queryData).then((res) => {
                this.tableData = res.ultraShortShotData
            })
        },
    }
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

.detailLinkBtn {
    position: absolute;
    right: 50px;
    top: 10px;
    width: 50px;
    height: 20px;
    background: linear-gradient(90deg, #0751b0, #50a6ec);
    text-align: center;
    font-size: smaller;
    border: 0;
    cursor: pointer;
    color: #ffffff;
}
</style>
