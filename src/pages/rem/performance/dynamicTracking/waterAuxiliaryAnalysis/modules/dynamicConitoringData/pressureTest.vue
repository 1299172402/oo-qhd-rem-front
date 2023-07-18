<!--压降测试-->
<template>
    <div class="z-main">
        <page-panel headerTitle="压力数据" style="height: 100%; margin-top: 0;" show-btn>
            <el-table id="tableData" :data="tableData" :border="false" :row-style="{ height: '0px' }" header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }" style="width:100%;" height="calc(100% - 10px)" :default-sort="{ prop: 'date', order: 'descending' }" :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }">
                <el-table-column type="index" label="序号" width="80" fixed></el-table-column>
                <el-table-column prop="borepipeName" label="井号" width="140" fixed></el-table-column>
                <el-table-column prop="wellInterceptType" label="试井项目解析类型" width="140" fixed></el-table-column>
                <el-table-column prop="reducePressure" :label="`折算压力梯度\n(MPa/100m)`" width="140"></el-table-column>
                <el-table-column prop="reduceTemperature" :label="`折算温度梯度\n(℃/100m)`" width="140"></el-table-column>
                <el-table-column prop="midMD" :label="`油层中部斜深\n(m)`" width="140"></el-table-column>
                <el-table-column prop="midTVD" :label="`油层中部垂深\n(m)`" width="140"></el-table-column>
                <el-table-column prop="midTemperature" :label="`油层中部温度\n(℃)`" width="140"></el-table-column>
                <el-table-column prop="midFlowPressure" :label="`油层中部流压\n(MPa)`" width="140"></el-table-column>
                <el-table-column prop="midStaticPressure" :label="`油层中部静压\n(MPa)`" width="140"></el-table-column>
                <el-table-column prop="baseLevelTVD" :label="`基准面垂深\n(m)`" width="140"></el-table-column>
                <el-table-column prop="baseLevelTemperature" :label="`基准面温度\n(℃)`" width="140"></el-table-column>
                <el-table-column prop="baseStaticPressure" :label="`基准面静压\n(MPa)`" width="140"></el-table-column>
                <el-table-column prop="baseFlowPressure" :label="`基准面流压\n(MPa)`" width="140"></el-table-column>
                <el-table-column prop="owTVD" :label="`油水界面垂深\n(m)`" width="140"></el-table-column>
                <el-table-column prop="goTVD" :label="`气油界面垂深\n(m)`" width="140"></el-table-column>
                <el-table-column prop="gwTVD" :label="`气水界面垂深\n(m)`" width="140"></el-table-column>
                <el-table-column prop="baseLevelAltitude" :label="`基准面海拔\n(m)`" width="140"></el-table-column>
                <el-table-column prop="remark" width="240" label="备注"></el-table-column>
            </el-table>
        </page-panel>
    </div>
</template>

<script>
    import { pressure} from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
    import { exportExcel } from "@/lib/exportExcel.js";
    export default {
        props: {
            //选择油田
            oilFeildId: {},
            //选择平台
            platform: {},
            //选择井号
            wellId: {}
        },
        data() {
            return {
                tableData: [],
            };
        },
        mounted() {
            this.doSearch();
        },
        methods: {
            doSearch() {
                let request = {
                    ogfId: this.oilFeildId,
                    platformId: this.platform,
                    wellId: this.wellId,
                };
                pressure(request).then((res) => {
                    if (res.data.code == 200) {
                        this.tableData = res.data.data.pressureTest;
                    }
                })
            },
            doDownLoad() {
                let fileName = '压力测试';
                if (this.wellName) {
                    fileName = this.wellName + fileName;
                }
                exportExcel('#tableData', fileName);
            },
        },
    }
</script>

<style scoped lang="scss">
    .z-main{
        height:calc(100% - 101px);
        #tableData{
            ::v-deep .el-table__body{
                .el-table__row{
                    td{
                        &:last-child {
                            .cell{
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                line-height: 18px;
                            }
                        }
                    }
                }
            }
            ::v-deep .el-table__header-wrapper .cell{
                height: auto;
                line-height: 18px;
                white-space: pre;
            }
            ::v-deep .cell:empty{
                &::before {
                    content: '-';
                } 
            }
        } 
    }
</style>