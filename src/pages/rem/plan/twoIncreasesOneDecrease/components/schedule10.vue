<template>
        <info-window infoWidth="100%" infoHeight="100%" headerTitle="附表10 秦皇岛32-6/渤中作业公司井网适应性情况" :isShowMaxBtn="true">
            <el-table id="tableData" class="doubleHeader" :row-style="{ height: '0px' }" :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }" :data="tableData" header-cell-class-name="table_header"
        :cell-style="{ padding: '6px', 'text-align': 'center' }" height="calc(100% - 40px)">
                <el-table-column prop="xh" label="序号" align="center" width="50px" fixed></el-table-column>
                <el-table-column prop="operationarea" label="作业公司" align="center" width="120" fixed></el-table-column>
                <el-table-column prop="oilField" label="油田" align="center" width="120" fixed></el-table-column>
                
                <el-table-column prop="dydzcl" :label="'动用地质储量\n(10⁴t)'" align="center" width="120"></el-table-column>
                <el-table-column prop="ljysjzjs" :label="'累计油水井总井数\n（含有生产贡献的被侧钻井）\n（口）'" align="center" width="220"></el-table-column>
                <el-table-column prop="dqysjzs" :label="'当前油水井总数\n（口）'" align="center" width="120"></el-table-column>
                
                <el-table-column label="油井开井数" align="center">
                    <el-table-column prop="yjxj" label="小计" align="center" width="100"></el-table-column>
                    <el-table-column prop="yjspj" :label="`其中：\n水平井`" align="center" width="100"></el-table-column>
                    <el-table-column prop="yjfcj" :label="`其中：\n定向井分采井`" align="center" width="110"></el-table-column>
                    <el-table-column prop="yjhcj" :label="`其中：\n定向井合采井`" align="center" width="110"></el-table-column>
                </el-table-column>
                <el-table-column label="水井开井数" align="center">
                    <el-table-column prop="sjxj" label="小计" align="center" width="100"></el-table-column>
                    <el-table-column prop="sjspj" :label="`其中：\n水平井`" align="center" width="110"></el-table-column>
                    <el-table-column prop="sjfzj" :label="`其中：\n定向井分注井`" align="center" width="110"></el-table-column>
                    <el-table-column prop="sjtzj" :label="`其中：\n定向井统注井`" align="center" width="110"></el-table-column>
                </el-table-column>
                <el-table-column prop="hymj" :label="'当前井网控制含油面积\n（k㎡）'" align="center" width="170"></el-table-column>
                <el-table-column prop="jwmd" :label="'井网密度\n(口/k㎡)'" align="center" width="120"></el-table-column>
                <el-table-column prop="jkcl" :label="'井控储量\n(10⁴t)'" align="center" width="120"></el-table-column>
                <el-table-column prop="ysjsb" label="油水井数比" align="center" width="120"></el-table-column>
                <el-table-column prop="ljzcb" label="累计注采比" align="center" width="120"></el-table-column>
                <el-table-column prop="zcb" label="2020年度注采比" align="center" width="140"></el-table-column>
                <el-table-column prop="ylbcsp" :label="`压力保持水平\n（%）`" align="center" width="140"></el-table-column>
                <el-table-column :label="`油井注采受效情况占比\n（%）`" align="center">
                    <el-table-column prop="qkzbdx" label="多向" align="center"></el-table-column>
                    <el-table-column prop="qkzbsx" label="双向" align="center"></el-table-column>
                    <el-table-column prop="qkzbdx1" label="单向" align="center"></el-table-column>
                    <el-table-column prop="qkzbbsx" label="不受效" align="center"></el-table-column>
                    <el-table-column prop="qkzbwzsj" label="无注水井" align="center"></el-table-column>
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
                    xh: "1",
                    oilField: "QHD32-6",
                    dydzcl: "15879",
                    ljysjzjs: "391",
                    dqysjzs: "351",
                    yjspj: "180",
                    yjfcj: "13",
                    yjhcj: "56",
                    sjspj: "8",
                    sjfzj: "77",
                    sjtzj: "0",
                    hymj: "43.16",
                    jwmd: "7.7",
                    jkcl: "40.6",
                    ysjsb: "2.9",
                    ljzcb: "0.5",
                    zcb: "0.7",
                    ylbcsp: "95.96",
                    qkzbdx: "19.3",
                    qkzbsx: "28.9",
                    qkzbdx1: "48.6",
                    qkzbbsx: "0",
                    qkzbwzsj: "3.2",
                    note: "油田边、底水丰富，天然能量占比大",
                }, ],
            };
        },
        
    };
</script>

<style lang="scss" scoped>
    ::v-deep .el-table__fixed-header-wrapper .cell {
        line-height: 68px !important;
        height: 68px !important;
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

