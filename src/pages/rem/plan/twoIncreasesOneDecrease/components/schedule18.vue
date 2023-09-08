<template>
    <pagePanel infoWidth="100%" infoHeight="100%" headerTitle="附表18 秦皇岛32-6作业公司示范油田概况" style="height: 100%;" showBtn>
        <el-table id="tableData" class="doubleHeader" :row-style="{ height: '0px' }" :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }" :data="tableData" header-cell-class-name="table_header"
                :cell-style="{ padding: '6px', 'text-align': 'center' }" height="calc(100% - 40px)">
            <el-table-column type="index" label="序号" align="center" width="80" fixed></el-table-column>
            <el-table-column prop="operationarea" label="作业公司" align="center" min-width="180" fixed></el-table-column>
            <el-table-column prop="oilField" label="示范油田" align="center" min-width="180" fixed></el-table-column>
            <el-table-column prop="kfjd" :label="`开发阶段\n（在生产、在建设、\n开发评价）`" align="center" min-width="160"></el-table-column>
            <el-table-column label="开发现状" align="center">
                <el-table-column prop="dydzcl" :label="'动用地质储量\n(10⁴t)'" align="center" min-width="140"></el-table-column>
                <el-table-column prop="bdcsl" :label="'当前标定采收率\n(%)'" align="center" min-width="140"></el-table-column>
                <el-table-column prop="sycl" :label="'2019年石油产量\n(10⁴t)'" align="center" min-width="140"></el-table-column>
            </el-table-column>
            <el-table-column label="示范工程简况" align="center">
                <el-table-column prop="sfnr" :label="`重点示范内容\n（综合调整、二次加密、稠油热采、低渗压裂、\n注气开发等`" align="center" min-width="340"></el-table-column>
                <el-table-column prop="gfdycl" :label="'规划动用地质储量\n(10⁴t)'" align="center" min-width="140"></el-table-column>
                <el-table-column prop="kccl" :label="'增加石油可采储量\n(10⁴t)'" align="center" min-width="140"></el-table-column>
                <el-table-column prop="cslfd" :label="'提高采收率幅度\n(%)'" align="center" min-width="140"></el-table-column>
                <el-table-column prop="ssjs" :label="'规划实施井数\n(口)'" align="center" min-width="140"></el-table-column>
                <el-table-column prop="gfcn" :label="'高峰产能\n(10⁴t)'" align="center" min-width="140"></el-table-column>
                <el-table-column prop="kftz" :label="'预计开发投资\n(亿元)'" align="center" min-width="140"></el-table-column>
                <el-table-column prop="ssnf" label="规划实施年份" align="center" min-width="140"></el-table-column>
            </el-table-column>
            <el-table-column prop="csjk" label="配套措施简况" align="center" min-width="440"></el-table-column>
        </el-table>
    </pagePanel>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [{
                    operationarea: "秦皇岛32-6作业公司",
                    oilField: "秦皇岛32-6油田",
                    dydzcl: "15879",
                    bdcsl: "36.8",
                    sycl: "233.03196095",
                    sfnr: "海上大型河流相稠油油田“双特高”期稳油控水关键技术示范",
                    gfdycl: "16864.37",
                    cslfd: "6.25",
                    gfcn: "233.46",
                    kftz: "11.92",
                    ssnf: "2020",
                    csjk: "1、2020年完成H平台内挂改造、2021年完成G平台内挂改造，2020-2030年通过内、外挂和低效井侧钻实施调整井128口；2、转注30口，年调驱井次8~10口；3、2021年8月完成扩容改造；4、2026年开始实施化学驱",
                }, ],
            };
        },
    };
</script>

<style lang="scss" scoped>
    ::v-deep .el-table__fixed-header-wrapper .cell {
        line-height: 42px !important;
        height: 42px !important;
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
    ::v-deep .el-table .el-table__body .cell{
        height: 80px !important;
        line-height: 20px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
    }
</style>
