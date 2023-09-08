<template>
    <pagePanel infoWidth="100%" infoHeight="100%" headerTitle="附表12 秦皇岛32-6作业公司工程设施状况" style="height: 100%;" showBtn>
        
        <el-table id="tableData" class="doubleHeader" :row-style="{ height: '0px' }" :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }" :data="tableData" header-cell-class-name="table_header"
        :cell-style="{ padding: '6px', 'text-align': 'center' }" height="calc(100% - 40px)">
            <el-table-column prop="xh" label="序号" align="center" width="80" fixed></el-table-column>
            <el-table-column prop="kftx" label="开发体系" align="center" min-width="120" fixed></el-table-column>
            <el-table-column prop="ytq" label="油田群" align="center" min-width="120" fixed></el-table-column>
            <el-table-column prop="yt" label="油田" align="center" min-width="180" fixed></el-table-column>
            <el-table-column prop="pt" label="平台" align="center" min-width="160"></el-table-column>
            <el-table-column prop="cljzly" label="处理的介质来源" align="center" min-width="240"></el-table-column>
            <el-table-column label="投产时间" align="center">
                <el-table-column prop="tcrq" :label="`年/月/日\n(yyyy-dd-mm)`" align="center" min-width="130"></el-table-column>
            </el-table-column>
            <el-table-column label="设施处理能力" align="center">
                <el-table-column label="最大液处理能力" align="center">
                    <el-table-column prop="zdyeclnl" label="(m³/d)" align="center" min-width="120"></el-table-column>
                </el-table-column>
                <el-table-column label="最大油处理能力" align="center">
                    <el-table-column prop="zdyclnl" label="(m³/d)" align="center" min-width="120"></el-table-column>
                </el-table-column>
                <el-table-column label="最大气处理能力" align="center">
                    <el-table-column prop="zdqclnl" label="(m³/d)" align="center" min-width="120"></el-table-column>
                </el-table-column>
                <el-table-column label="最大水处理能力" align="center">
                    <el-table-column prop="zdsclnl" label="(m³/d)" align="center" min-width="120"></el-table-column>
                </el-table-column>
            </el-table-column>
            <el-table-column label="2019年12月日均产量" align="center">
                <el-table-column label="日产液" align="center">
                    <el-table-column prop="nmrcye" label="(m³/d)" align="center" min-width="120"></el-table-column>
                </el-table-column>
                <el-table-column label="日产油" align="center">
                    <el-table-column prop="nmrcyou" label="(m³/d)" align="center" min-width="120"></el-table-column>
                </el-table-column>
                <el-table-column label="日产气" align="center">
                    <el-table-column prop="nmrcq" label="(10⁴m³/d)" align="center" min-width="120"></el-table-column>
                </el-table-column>
            </el-table-column>
            <el-table-column label="电量" align="center">
                <el-table-column label="设计" align="center">
                    <el-table-column prop="dlsj" label="(kW)" align="center" min-width="120"></el-table-column>
                </el-table-column>
                <el-table-column label="当前" align="center">
                    <el-table-column prop="dldq" label="(kW)" align="center" min-width="120"></el-table-column>
                </el-table-column>
            </el-table-column>
            <el-table-column prop="qksm" :label="`海管等其他设施情况说明\n（可合并单元格）`" align="center" min-width="800"></el-table-column>
            <el-table-column prop="note" label="主要结论" align="center" min-width="200"></el-table-column>
        </el-table>
    </pagePanel>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [
                    {
                        xh: "1",
                        kftx: "石臼坨开发体系",
                        ytq: "石臼坨油气田群",
                        yt: "秦皇岛32-6油田",
                        pt: "QHD32-6WHPA",
                        cljzly: "不处理",
                        tcrq: "2001/10/08",
                        zdyeclnl: "0",
                        zdyclnl: "0",
                        zdqclnl: "0",
                        zdsclnl: "0",
                        nmrcye: "9292",
                        nmrcyou: "585",
                        nmrcq: "1.69",
                        dlsj: "0",
                        dldq: "0",
                        qksm: "注水海管：QHD32-6WHPA~QHD32-6WHPB  在用\r混输海管：QHD32-6WHPA~QHD32-6WHPB  封存",
                        note: "正常运行",
                    },
                    {
                        xh: "2",
                        kftx: "石臼坨开发体系",
                        ytq: "石臼坨油气田群",
                        yt: "秦皇岛32-6油田",
                        pt: "QHD32-6WHPB",
                        cljzly: "不处理",
                        tcrq: "2001/10/08",
                        zdyeclnl: "0",
                        zdyclnl: "0",
                        zdqclnl: "0",
                        zdsclnl: "0",
                        nmrcye: "7509",
                        nmrcyou: "478",
                        nmrcq: "1.34",
                        dlsj: "0",
                        dldq: "0",
                        qksm: "注水海管：QHD32-6WHPA~QHD32-6WHPB  在用\r混输海管：QHD32-6WHPA~QHD32-6WHPB  封存",
                        note: "正常运行",
                    },
                    {
                        xh: "3",
                        kftx: "石臼坨开发体系",
                        ytq: "石臼坨油气田群",
                        yt: "秦皇岛32-6油田",
                        pt: "QHD32-6WHPC",
                        cljzly: "不处理",
                        tcrq: "2002/07/01",
                        zdyeclnl: "0",
                        zdyclnl: "0",
                        zdqclnl: "0",
                        zdsclnl: "0",
                        nmrcye: "475",
                        nmrcyou: "5549",
                        nmrcq: "2.43",
                        dlsj: "0",
                        dldq: "0",
                        qksm: "QHD32-6WHPC至QHD32-6WHPD混输海管（在用，定期通球）\rQHD32-6WHPD至QHD32-6WHPC注水海管（在用，定期通球\rQHD33-1至QHD32-6WHPC混输海管（在用，定期通球）",
                        note: "正常运行",
                    },
                    {
                        xh: "4",
                        kftx: "石臼坨开发体系",
                        ytq: "石臼坨油气田群",
                        yt: "秦皇岛32-6油田",
                        pt: "QHD32-6WHPD",
                        cljzly: "不处理",
                        tcrq: "2002/05/28",
                        zdyeclnl: "0",
                        zdyclnl: "0",
                        zdqclnl: "0",
                        zdsclnl: "0",
                        nmrcye: "5135",
                        nmrcyou: "618",
                        nmrcq: "0.45",
                        dlsj: "0",
                        dldq: "0",
                        qksm: "注水海管：QHD32-6WHPD~QHD32-6WHPC  在用\r混输海管：QHD32-6WHPC~QHD32-6WHPD  封存",
                        note: "正常运行",
                    },
                    {
                        xh: "5",
                        kftx: "石臼坨开发体系",
                        ytq: "石臼坨油气田群",
                        yt: "秦皇岛32-6油田",
                        pt: "QHD32-6WHPE",
                        cljzly: "不处理",
                        tcrq: "2002/08/10",
                        zdyeclnl: "0",
                        zdyclnl: "0",
                        zdqclnl: "0",
                        zdsclnl: "0",
                        nmrcye: "12149",
                        nmrcyou: "552",
                        nmrcq: "0.18",
                        dlsj: "0",
                        dldq: "0",
                        qksm: "1、QHD32-6WHPE到QHD32-6WHPF混输海管（海管已封存）；\r2、QHD32-6WHPF到QHD32-6WHPE注水海管（在用，定期通球）；\r3、QHD32-6WHPE到QHD32-6CEPJ混输海管（在用，定期通球）；\r4、QHD32-6CEPJ到QHD32-6WHPE注水海管（在用，定期通球）。",
                        note: "正常运行",
                    },
                    {
                        xh: "6",
                        kftx: "石臼坨开发体系",
                        ytq: "石臼坨油气田群",
                        yt: "秦皇岛32-6油田",
                        pt: "QHD32-6WHPF",
                        cljzly: "不处理",
                        tcrq: "2002/08/10",
                        zdyeclnl: "0",
                        zdyclnl: "0",
                        zdqclnl: "0",
                        zdsclnl: "0",
                        nmrcye: "7830",
                        nmrcyou: "431",
                        nmrcq: "1.68",
                        dlsj: "0",
                        dldq: "0",
                        qksm: "注水海管：QHD32-6WHPF~QHD32-6WHPE  在用\r混输海管：QHD32-6WHPE~QHD32-6WHPF  封存",
                        note: "正常运行",
                    },
                    {
                        xh: "7",
                        kftx: "石臼坨开发体系",
                        ytq: "石臼坨油气田群",
                        yt: "秦皇岛32-6油田",
                        pt: "QHD32-6WHPG",
                        cljzly: "不处理",
                        tcrq: "2014/12/10",
                        zdyeclnl: "0",
                        zdyclnl: "0",
                        zdqclnl: "0",
                        zdsclnl: "0",
                        nmrcye: "16752",
                        nmrcyou: "873",
                        nmrcq: "1.85",
                        dlsj: "0",
                        dldq: "0",
                        qksm: "注水海管：QHD32-6CEPI~QHD32-6WHPG（在用，定期通球）\r混输海管：QHD32-6WHPG-QHD32-6CEPI（在用，定期通球）",
                        note: "正常运行",
                    },
                    {
                        xh: "8",
                        kftx: "石臼坨开发体系",
                        ytq: "石臼坨油气田群",
                        yt: "秦皇岛32-6油田",
                        pt: "QHD32-6WHPH",
                        cljzly: "不处理",
                        tcrq: "2013/11/29",
                        zdyeclnl: "0",
                        zdyclnl: "0",
                        zdqclnl: "0",
                        zdsclnl: "0",
                        nmrcye: "479",
                        nmrcyou: "5535",
                        nmrcq: "1.14",
                        dlsj: "0",
                        dldq: "0",
                        qksm: "QHD32-6WHPHA至QHD32-6CEPI混输海管（在用，定期通球）\rQHD32-6CEPI至QHD32-6WHPH注水海管（在用，定期通球）",
                        note: "正常运行",
                    },
                    {
                        xh: "9",
                        kftx: "石臼坨开发体系",
                        ytq: "石臼坨油气田群",
                        yt: "秦皇岛32-6油田",
                        pt: "QHD32-6CPEI",
                        cljzly: "B/C/G/H/I平台产液",
                        tcrq: "2013/11/29",
                        zdyeclnl: "64605",
                        zdyclnl: "10440",
                        zdqclnl: "20.59",
                        zdsclnl: "48000",
                        nmrcye: "17918",
                        nmrcyou: "1212",
                        nmrcq: "2.5",
                        dlsj: "33320",
                        dldq: "16710",
                        qksm: "QHD32-6WHPG-QHD32-6CEPI混输海管（在用，定期通球）\rQHD32-6WHPH-QHD32-6CEPI混输海管（在用，定期通球）\rQHD32-6CEPI~QHD32-6WHPA混输海管 （因QHD32-6WHPA平台调整井作业，暂停使用）\rQHD32-6CEPI~QHD32-6WHPD混输海管（在用，定期通球）\rQHD32-6CEPI~QHD32-6WHPA高压注水海管（在用，定期通球）\rQHD32-6CEPI~QHD32-6WHPD高压注水海管（在用，定期通球）\rQHD32-6CEPI~QHD32-6WHPG低压注水海管（在用，定期通球）\rQHD32-6CEPI~QHD32-6WHPH低压注水海管（在用，定期通球）",
                        note: "正常运行",
                    },
                    {
                        xh: "10",
                        kftx: "石臼坨开发体系",
                        ytq: "石臼坨油气田群",
                        yt: "秦皇岛32-6油田",
                        pt: "QHD32-6CPEJ",
                        cljzly: "E和J平台产液",
                        tcrq: "2014/09/05",
                        zdyeclnl: "65814",
                        zdyclnl: "7695",
                        zdqclnl: "8.54",
                        zdsclnl: "54000",
                        nmrcye: "24673",
                        nmrcyou: "1612",
                        nmrcq: "1.64",
                        dlsj: "30720",
                        dldq: "22200",
                        qksm: "1、QHD32-6WHPE→QHD32-6CEPJ混输海管（在用，定期通球）\r2、QHD32-6CEPJ→QHD32-6WHPF混输海管（在用，定期通球）\r3、QHD32-6CEPJ→QHD32-6WHPE注水海管（在用，定期通球）\r4、QHD32-6CEPJ→QHD32-6WHPF注水海管（在用，定期通球）",
                        note: "正常运行",
                    },
                    // {
                    //     xh: "11",
                    //     kftx: "石臼坨开发体系",
                    //     ytq: "石臼坨油气田群",
                    //     yt: "秦皇岛32-6油田",
                    //     pt: "渤海世纪",
                    //     cljzly: "QHD32-6QHD32-6CEPI/J处理至50%后的来液、QHD32-6QHD32-6WHPA/D/F平台产液、QHD33-1/S油田产液",
                    //     tcrq: "2001/10/11",
                    //     zdyeclnl: "35616",
                    //     zdyclnl: "14064",
                    //     zdqclnl: "24.5",
                    //     zdsclnl: "40800",
                    //     nmrcye: "",
                    //     nmrcyou: "",
                    //     nmrcq: "",
                    //     dlsj: "43000",
                    //     dldq: "18230",
                    //     qksm: "注水海管：SPM~QHD32-6WHPA  在用\rSPM~QHD32-6WHPD  在用\rSPM~QHD32-6WHPF  在用\r混输海管：QHD32-6WHPA-SPM  在用\rQHD32-6WHPD-SPM  在用\rQHD32-6WHPF-SPM   在用\r注水海管：SPM~QHD32-6WHPA  在用\rSPM~QHD32-6WHPD  在用\rSPM~QHD32-6WHPF  在用\r混输海管：QHD32-6WHPA-SPM  在用\rQHD32-6WHPD-SPM  在用\rQHD32-6WHPF-SPM   在用",
                    //     note: "正常运行",
                    // },
                ],
            };
        }
    };
</script>

<style lang="scss" scoped>
    ::v-deep .el-table__fixed-header-wrapper .cell {
        line-height: 34px !important;
        height: 34px !important;
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
    
    ::v-deep .el-table .el-table__body .cell{
        height: 100px !important;
        line-height: 20px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
    }
</style>