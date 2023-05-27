<template>
    <info-window infoWidth="100%" infoHeight="100%" headerTitle="附表16 秦皇岛32-6/渤中作业公司提高单井产量实施路径" :isShowMaxBtn="true">
        <el-table id="tableData" class="doubleHeader" :row-style="{ height: '0px' }" :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }" :data="tableData" header-cell-class-name="table_header"
               :cell-style="{ padding: '6px', 'text-align': 'center' }" height="calc(100% - 40px)">
            <el-table-column prop="xh" label="序号" align="center" fixed></el-table-column>
            <el-table-column prop="operationarea" label="作业公司" align="center" width="140" fixed></el-table-column>
            <el-table-column prop="oilField" label="油田" align="center" width="120" fixed></el-table-column>
            <el-table-column prop="kfjd" :label="`开发阶段\n（在生产、\n在建设、\n开发评价）`" align="center" width="120"></el-table-column>
            <el-table-column prop="clsd" :label="`提高单井产量手段\n（包括但不限于\n稠油热采、低渗\n压裂、注气开发等）`" align="center" width="150"></el-table-column>
            <el-table-column :label="`实施井数\n(口)`" align="center">
                <el-table-column prop="dxj" label="定向井" align="center"></el-table-column>
                <el-table-column prop="spj" label="水平井" align="center"></el-table-column>
                <el-table-column prop="ssjsxj" label="小计" align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="提高单井产量情况" align="center">
                <el-table-column prop="pjcl" :label="`措施前单井\n平均产量\n(t/d)`" align="center" width="120"></el-table-column>
                <el-table-column prop="clyc" :label="`措施后单井\n平均产量预测\n（三个月）\n(t/d)`" align="center" width="120"></el-table-column>
                <el-table-column prop="zcps" label="增产倍数" align="center" width="120"></el-table-column>
            </el-table-column>
            <el-table-column prop="csjk" label="配套措施简况" align="center" width="120"></el-table-column>
            <el-table-column :label="`不做措施产油量预测\n(10⁴t)`" align="center">
                <el-table-column prop="b2020" label="2020" align="center"></el-table-column>
                <el-table-column prop="b2021" label="2021" align="center"></el-table-column>
                <el-table-column prop="b2022" label="2022" align="center"></el-table-column>
                <el-table-column prop="b2023" label="2023" align="center"></el-table-column>
                <el-table-column prop="b2024" label="2024" align="center"></el-table-column>
                <el-table-column prop="b2025" label="2025" align="center"></el-table-column>
                <el-table-column prop="b2026" label="2026" align="center"></el-table-column>
                <el-table-column prop="b2027" label="2027" align="center"></el-table-column>
                <el-table-column prop="b2028" label="2028" align="center"></el-table-column>
                <el-table-column prop="b2029" label="2029" align="center"></el-table-column>
                <el-table-column prop="b2030" label="2030" align="center"></el-table-column>
            </el-table-column>
            <el-table-column :label="`做措施后产油量预测\n(10⁴t)`" align="center">
                <el-table-column prop="z2020" label="2020" align="center"></el-table-column>
                <el-table-column prop="z2021" label="2021" align="center"></el-table-column>
                <el-table-column prop="z2022" label="2022" align="center"></el-table-column>
                <el-table-column prop="z2023" label="2023" align="center"></el-table-column>
                <el-table-column prop="z2024" label="2024" align="center"></el-table-column>
                <el-table-column prop="z2025" label="2025" align="center"></el-table-column>
                <el-table-column prop="z2026" label="2026" align="center"></el-table-column>
                <el-table-column prop="z2027" label="2027" align="center"></el-table-column>
                <el-table-column prop="z2028" label="2028" align="center"></el-table-column>
                <el-table-column prop="z2029" label="2029" align="center"></el-table-column>
                <el-table-column prop="z2030" label="2030" align="center"></el-table-column>
            </el-table-column>
        </el-table>
    </info-window>
    
</template>

<script>
    export default {
        data() {
            return {
                tableData: [
                    {
                        operationarea: "秦皇岛32-6/渤中",
                        xh: "1",
                        oilField: "秦皇岛32-6",
                        kfjd: "在生产",
                        clsd: "热采",
                        dxj: "1",
                        spj: "3",
                        ssjsxj: "4",
                        pjcl: "12",
                        clyc: "12",
                        zcps: "1",
                        b2020: "200",
                        b2021: "210",
                        b2022: "220",
                        b2023: "230",
                        b2024: "240",
                        b2025: "250",
                        b2026: "260",
                        b2027: "270",
                        b2028: "280",
                        b2029: "290",
                        b2030: "300",
                        z2020: "250",
                        z2021: "280",
                        z2022: "310",
                        z2023: "340",
                        z2024: "370",
                        z2025: "400",
                        z2026: "430",
                        z2027: "460",
                        z2028: "490",
                        z2029: "520",
                        z2030: "550",
                    },
                    {
                        operationarea: "秦皇岛32-6/渤中",
                        xh: "2",
                        oilField: "秦皇岛32-6",
                        kfjd: "在生产",
                        clsd: "聚合物",
                        dxj: "3",
                        spj: "4",
                        ssjsxj: "7",
                        pjcl: "12",
                        clyc: "12",
                        zcps: "1",
                        b2020: "201",
                        b2021: "211",
                        b2022: "221",
                        b2023: "231",
                        b2024: "241",
                        b2025: "251",
                        b2026: "261",
                        b2027: "271",
                        b2028: "281",
                        b2029: "291",
                        b2030: "301",
                        z2020: "251",
                        z2021: "281",
                        z2022: "311",
                        z2023: "341",
                        z2024: "371",
                        z2025: "401",
                        z2026: "431",
                        z2027: "461",
                        z2028: "491",
                        z2029: "521",
                        z2030: "551",
                    },
                    {
                        operationarea: "秦皇岛32-6/渤中",
                        xh: "3",
                        oilField: "秦皇岛32-6",
                        kfjd: "在生产",
                        clsd: "分支井",
                        dxj: "0",
                        spj: "1",
                        ssjsxj: "1",
                        pjcl: "12",
                        clyc: "12",
                        zcps: "1",
                        b2020: "202",
                        b2021: "212",
                        b2022: "222",
                        b2023: "232",
                        b2024: "242",
                        b2025: "252",
                        b2026: "262",
                        b2027: "272",
                        b2028: "282",
                        b2029: "292",
                        b2030: "302",
                        z2020: "252",
                        z2021: "282",
                        z2022: "312",
                        z2023: "342",
                        z2024: "372",
                        z2025: "402",
                        z2026: "432",
                        z2027: "462",
                        z2028: "492",
                        z2029: "522",
                        z2030: "552",
                    },
                ],
            };
        }
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

