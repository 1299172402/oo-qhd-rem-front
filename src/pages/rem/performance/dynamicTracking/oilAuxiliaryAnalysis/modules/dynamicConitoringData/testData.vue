<!--化验数据-->
<template>
    <div class="z-main">
        <div class="infoWindowBox" style='margin-bottom:10px;' >
            <info-window infoWidth="100%" infoHeight="100%" headerTitle="原油分析化验数据">
                <el-table 
                    id="tableData"
                    :data="tableData" :border="false" :row-style="{ height: '0px' }"
                    header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }"
                    style="width:100%;padding:0 10px;" height="calc(100% - 10px)" :default-sort="{ prop: 'date', order: 'descending' }"
                    :header-cell-style="{ 'text-align': 'center', padding: '0px 0'}">
                    <el-table-column type="index" label="序号" width="80"></el-table-column>
                    <el-table-column prop="borepipeNo" label="井号" width="160"></el-table-column>
                    <el-table-column prop="date" label="日期" width="100">
                        <template slot-scope="scope">
                          <span>{{scope.row.date | dateTimeFormat}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sampleId" label="流体样品类型" min-width="140"></el-table-column>
                    <el-table-column prop="den" label="原油密度 (g/cm³)" min-width="140"></el-table-column>
                    <el-table-column prop="" label="粘度 (mPa.s)" min-width="120"></el-table-column>
                    <el-table-column prop="api60F" label="API_60F" min-width="100"></el-table-column>
                    <el-table-column prop="waterContent" label="含水 (%)" min-width="100"></el-table-column>
                    <el-table-column prop="scontent" label="含硫量 (%)" min-width="140"></el-table-column>
                    <el-table-column prop="freezePoint" label="凝固点 (℃)" min-width="140"></el-table-column>
                    <el-table-column prop="waxContent" label="蜡量 (%)" min-width="140"></el-table-column>
                    <el-table-column prop="bitumen" label="沥青质 (%)" min-width="100"></el-table-column>
                    <el-table-column prop="resin" label="胶质 (%)" min-width="100"></el-table-column>
                </el-table>
            </info-window>
        </div>
        <div class="infoWindowBox">
            <info-window infoWidth="100%" infoHeight="100%" headerTitle="采出水化验数据">
                <el-table 
                    id="tableData1"
                    :data="tableData1" :border="false" :row-style="{ height: '0px' }"
                    header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }"
                    style="width:100%;padding:0 10px;" height="calc(100% - 10px)" :default-sort="{ prop: 'date', order: 'descending' }"
                    :header-cell-style="{ 'text-align': 'center', padding: '0px 0'}">
                    <el-table-column type="index" label="序号" width="80"></el-table-column>
                    <el-table-column prop="borepipeNo" label="井号" width="160"></el-table-column>
                    <el-table-column prop="date" label="日期" width="100">
                        <template slot-scope="scope">
                            <span>{{scope.row.date | dateTimeFormat}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sampleId" label="流体样品类型" min-width="140"></el-table-column>
                    <el-table-column prop="fluidPH" label="PH值/酸碱度" min-width="140"></el-table-column>
                    <el-table-column prop="color" label="颜色" min-width="120"></el-table-column>
                    <el-table-column prop="waterValue" label="水型" min-width="100"></el-table-column>
                    <el-table-column prop="" label="地层水矿化度 (mg/L)  " min-width="100"></el-table-column>
                    <el-table-column prop="anionContent" label="阴离子总量 (mg/L)" min-width="140"></el-table-column>
                    <el-table-column prop="cationContent" label="阳离子总量 (mg/L)" min-width="140"></el-table-column>
                    <el-table-column prop="totalAlkalinity" label="总碱度 (mmol/L)" min-width="140"></el-table-column>
                    <el-table-column prop="cumHardness" label="总硬度" min-width="100"></el-table-column>
                    <el-table-column prop="resis" label="电阻率 (Ωm)" min-width="100"></el-table-column>
                </el-table>
            </info-window>
        </div>
    </div>
</template>

<script>
    import {testReport} from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
    import {exportExcel} from "@/lib/exportExcel.js";
    export default {
        filters: {
            dateTimeFormat(val) {
                if (val) {
                    return new Date(val).format('yyyy-MM-dd');
                } else {
                    return '-';
                }
            }
        },
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
                tableData1: [],
            };
        },
        mounted() {
            // this.doSearch();
        },
        methods: {
            //根据父组件传递过来的参数进行查询
            doSearch() {
                let request = {
                    ogfId: this.oilFeildId,
                    platformId: this.platform,
                    wellId: this.wellId,
                };
                testReport(request).then((res) => {
                    if (res.data.code == 200) {
                        this.tableData = res.data.data.oilResults;
                        this.tableData1 = res.data.data.results;
                    } else {
                        this.tableData = [];
                        this.tableData1 = [];
                    }
                })
            },
            //下载
            doDownLoad() {
                let fileName = '化验数据';
                if (this.wellName) {
                    fileName = this.wellName + fileName;
                }
                exportExcel('#tableData',fileName+'原油分析');
                exportExcel('#tableData1',fileName+'采出水');

            },
        }
    }
</script>

<style scoped lang="scss">
    .z-main{
        width: 100%;
        height:calc(100% - 100px);
        display: flex;
        flex-direction: column;
        .infoWindowBox{
            flex:1;
        }
    }
    ::v-deep .el-table .cell:empty::before {
        content: '-';
    }
</style>
