<template>
    <info-window infoWidth="100%" infoHeight="100%" headerTitle="附表11 秦皇岛32-6/渤中作业公司剩余井槽资源情况" :isShowMaxBtn="true">

        <el-table id="tableData" class="doubleHeader" :row-style="{ height: '0px' }" :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }" :data="tableData" header-cell-class-name="table_header"
        :cell-style="{ padding: '6px', 'text-align': 'center' }" height="calc(100% - 40px)">
        
            <el-table-column prop="xh" label="序号" align="center" fixed></el-table-column>
            <el-table-column prop="operationarea" label="作业公司" align="center" width="120" fixed></el-table-column>
            <el-table-column prop="oilField" label="油田" align="center" width="120" fixed></el-table-column>
            
            <el-table-column prop="jkptmc" label="井口平台名称" align="center" width="120"></el-table-column>
            <el-table-column prop="pttcrq" :label="`平台投产日期\n(yyyy-dd-mm)`" align="center" width="130"></el-table-column>
            <el-table-column label="平台设计寿命" align="center">
                <el-table-column prop="ptsjsm" :label="`(年)`" align="center" width="120"></el-table-column>
            </el-table-column>
            <el-table-column label="原平台" align="center">
                <el-table-column prop="yptzjcs" :label="`总井槽数\n(口)`" align="center" width="120"></el-table-column>
                <el-table-column prop="yptyzjcs" :label="`已钻井槽数\n(口)`" align="center" width="120"></el-table-column>
            </el-table-column>
            <el-table-column label="内外挂平台" align="center">
                <el-table-column prop="nwgzjcs" :label="`总井槽数\n(口)`" align="center" width="120"></el-table-column>
                <el-table-column prop="nwgyzjcs" :label="`已钻井槽数\n(口)`" align="center" width="120"></el-table-column>
            </el-table-column>
            <el-table-column label="当前总剩余井槽数" align="center">
                <el-table-column prop="dqsyjcs" label="(口)" align="center" width="150"></el-table-column>
            </el-table-column>
            <el-table-column :label="`十四五规划内\n外挂井槽数`" align="center">
                <el-table-column prop="string-affectyield" label="(口)" align="center" width="150"></el-table-column>
            </el-table-column>
            <el-table-column label="十四五规划实施井数" align="center">
                <el-table-column prop="sswssjs" label="(口)" align="center" width="150"></el-table-column>
            </el-table-column>
            <el-table-column :label="`十四五规划外\n新摸排出潜力井位\n（2021-2025）`" align="center">
                <el-table-column prop="qljw" label="口" align="center" width="150"></el-table-column>
            </el-table-column>
            <el-table-column :label="`十四五规划外新摸排出潜力井位\n内外挂井槽可行性`" align="center">
                <el-table-column prop="knwgjcs" :label="`作业区论证\n可内外挂井槽数`" align="center" width="130"></el-table-column>
                <el-table-column prop="string-affectyield" :label="`需要工程校核、\n测算等需要\n第三方协助论证`" align="center" width="120"></el-table-column>
            </el-table-column>
            <el-table-column prop="note" label="备注" align="center" width="240"></el-table-column>
            
        </el-table>
    </info-window>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [
                    {
                        operationarea: "秦皇岛",
                        xh: "1",
                        oilField: "QHD32-6",
                        jkptmc: "QHD32-6A",
                        pttcrq: "2001-10-08",
                        ptsjsm: "20",
                        yptzjcs: "35",
                        yptyzjcs: "35",
                        nwgzjcs: "0",
                        nwgyzjcs: "0",
                        dqsyjcs: "0",
                        sswssjs: "",
                        qljw: "",
                        knwgjcs: "0",
                        note: "岸电及扩容项目老平台适应性改造，外扩占用空间和增加重量较大，不具备挂井槽条件",
                    },
                    {
                        operationarea: "秦皇岛",
                        xh: "2",
                        oilField: "QHD32-6",
                        jkptmc: "QHD32-6B",
                        pttcrq: "2001-10-08",
                        ptsjsm: "20",
                        yptzjcs: "35",
                        yptyzjcs: "34",
                        nwgzjcs: "0",
                        nwgyzjcs: "0",
                        dqsyjcs: "1",
                        sswssjs: "3",
                        qljw: "",
                        knwgjcs: "0",
                        note: "1个井位因水下落物无法使用。通过栈桥与WHPG平台相连，不具备挂井槽空间",
                    },
                    {
                        operationarea: "秦皇岛",
                        xh: "3",
                        oilField: "QHD32-6",
                        jkptmc: "QHD32-6C",
                        pttcrq: "2002-07-01",
                        ptsjsm: "20",
                        yptzjcs: "35",
                        yptyzjcs: "35",
                        nwgzjcs: "0",
                        nwgyzjcs: "0",
                        dqsyjcs: "0",
                        sswssjs: "3",
                        qljw: "",
                        knwgjcs: "0",
                        note: "通过栈桥与WHPH平台相连，不具备挂井槽空间",
                    },
                    {
                        operationarea: "秦皇岛",
                        xh: "4",
                        oilField: "QHD32-6",
                        jkptmc: "QHD32-6D",
                        pttcrq: "2002-05-28",
                        ptsjsm: "20",
                        yptzjcs: "35",
                        yptyzjcs: "35",
                        nwgzjcs: "0",
                        nwgyzjcs: "0",
                        dqsyjcs: "0",
                        sswssjs: "3",
                        qljw: "",
                        knwgjcs: "0",
                        note: "岸电及扩容项目老平台适应性改造，外扩占用空间和增加重量较大，不具备挂井槽条件",
                    },
                    {
                        operationarea: "秦皇岛",
                        xh: "5",
                        oilField: "QHD32-6",
                        jkptmc: "QHD32-6E",
                        pttcrq: "2002-08-10",
                        ptsjsm: "20",
                        yptzjcs: "35",
                        yptyzjcs: "35",
                        nwgzjcs: "0",
                        nwgyzjcs: "0",
                        dqsyjcs: "0",
                        sswssjs: "10",
                        qljw: "",
                        knwgjcs: "0",
                        note: "岸电及扩容项目老平台适应性改造，外扩占用空间和增加重量较大，不具备挂井槽条件",
                    },
                    {
                        operationarea: "秦皇岛",
                        xh: "6",
                        oilField: "QHD32-6",
                        jkptmc: "QHD32-6F",
                        pttcrq: "2002-08-10",
                        ptsjsm: "20",
                        yptzjcs: "35",
                        yptyzjcs: "35",
                        nwgzjcs: "0",
                        nwgyzjcs: "0",
                        dqsyjcs: "0",
                        sswssjs: "13",
                        qljw: "",
                        knwgjcs: "0",
                        note: "岸电及扩容项目老平台适应性改造，外扩占用空间和增加重量较大，不具备挂井槽条件",
                    },
                    {
                        operationarea: "秦皇岛",
                        xh: "7",
                        oilField: "QHD32-6",
                        jkptmc: "QHD32-6G",
                        pttcrq: "2014-12-10",
                        ptsjsm: "25",
                        yptzjcs: "40",
                        yptyzjcs: "40",
                        nwgzjcs: "0",
                        nwgyzjcs: "0",
                        dqsyjcs: "0",
                        sswssjs: "8",
                        qljw: "8",
                        knwgjcs: "8",
                        note: "可挂4单筒双井，若有更多需求需要进一步可行研究",
                    },
                    {
                        operationarea: "秦皇岛",
                        xh: "8",
                        oilField: "QHD32-6",
                        jkptmc: "QHD32-6H",
                        pttcrq: "2013-11-29",
                        ptsjsm: "25",
                        yptzjcs: "20",
                        yptyzjcs: "20",
                        nwgzjcs: "0",
                        nwgyzjcs: "0",
                        dqsyjcs: "0",
                        sswssjs: "10",
                        qljw: "",
                        knwgjcs: "10",
                        note: "可挂5个单筒双井，2020年计划实施8口井；2021年新增2口井。",
                    },
                    {
                        operationarea: "秦皇岛",
                        xh: "9",
                        oilField: "QHD32-6",
                        jkptmc: "QHD32-6I",
                        pttcrq: "2014-08-15",
                        ptsjsm: "25",
                        yptzjcs: "40",
                        yptyzjcs: "40",
                        nwgzjcs: "0",
                        nwgyzjcs: "0",
                        dqsyjcs: "0",
                        sswssjs: "8",
                        qljw: "",
                        knwgjcs: "8",
                        note: "南井口区侧有栈桥与扩容项目CEPK平台相连不具备外挂井槽条件。",
                    },
                    {
                        operationarea: "秦皇岛",
                        xh: "10",
                        oilField: "QHD32-6",
                        jkptmc: "QHD32-6J",
                        pttcrq: "2014-09-05",
                        ptsjsm: "25",
                        yptzjcs: "40",
                        yptyzjcs: "40",
                        nwgzjcs: "16",
                        nwgyzjcs: "16",
                        dqsyjcs: "0",
                        sswssjs: "6",
                        qljw: "",
                        knwgjcs: "8",
                        note: "南北两个井口区已经各外挂一排井槽，且岸电及扩容项目有变电站平台和CEPL平台，不具备挂井槽条件",
                    },
                ],
            };
        }
    };
</script>

<style lang="scss" scoped>
    ::v-deep .el-table__fixed-header-wrapper .cell {
        line-height: 54px !important;
        height: 54px !important;
    }
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
</style>
