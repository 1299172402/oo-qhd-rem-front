<!--化验数据-->
<template>
    <div class="z-main">
        <info-window infoWidth="100%" infoHeight="calc(100% / 2 )" style='margin-bottom:10px;' headerTitle="原油分析化验数据">
            <el-table 
                id="tableData"
                :data="tableData" :border="false" :row-style="{ height: '0px' }"
                header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }"
                style="width:100%;padding:0 10px;" height="calc(100% - 10px)" :default-sort="{ prop: 'date', order: 'descending' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px 0'}">
                <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
                <el-table-column prop="borepipeNo" label="井号" align="center" width="180"></el-table-column>
                <el-table-column prop="date" label="日期" align="center" min-width="140">
                   <template slot-scope="scope">
                        <span>{{scope.row.date | dateTimeFormat}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="sampleId" label="流体样品类型" align="center" min-width="100"></el-table-column>
                <el-table-column prop="den" :render-header="renderHeader" label="原油密度 (g/cm³)" align="center" width="140">
                </el-table-column>
                <el-table-column prop="" :render-header="renderHeader" label="粘度 (mPa.s)" align="center" width="140">
                </el-table-column>
                <el-table-column prop="api60F" label="API_60F" align="center" width="100">
                </el-table-column>
                <el-table-column prop="waterContent" :render-header="renderHeader" label="含水 (%)" align="center" width="100">
                </el-table-column>
                <el-table-column prop="scontent" :render-header="renderHeader" label="含硫量 (%)" align="center" width="140">
                </el-table-column>
                <el-table-column prop="freezePoint" :render-header="renderHeader" label="凝固点 (℃)" align="center" width="100">
                </el-table-column>
                <el-table-column prop="waxContent" :render-header="renderHeader" label="蜡量 (%)" align="center" width="100"></el-table-column>
                <el-table-column prop="bitumen" :render-header="renderHeader" label="沥青质 (%)" align="center" width="100"></el-table-column>
                <el-table-column prop="resin" :render-header="renderHeader" label="胶质 (%)" align="center" width="100"></el-table-column>
            </el-table>
        </info-window>
        <info-window infoWidth="100%" infoHeight="calc(100% / 2)" headerTitle="采出水化验数据">
            <el-table 
                id="tableData1"
                :data="tableData1" :border="false" :row-style="{ height: '0px' }"
                header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }"
                style="width:100%;padding:0 10px;" height="calc(100% - 10px)" :default-sort="{ prop: 'date', order: 'descending' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px 0'}">
                <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
                <el-table-column prop="borepipeNo" label="井号" align="center" min-width="160"></el-table-column>
                <el-table-column prop="date" label="日期" align="center" min-width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.date | dateTimeFormat}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="sampleId" label="流体样品类型" align="center" min-width="140"></el-table-column>
                <el-table-column prop="fluidPH" label="PH值/酸碱度" align="center" min-width="100"></el-table-column>
                <el-table-column prop="color" label="颜色" align="center" min-width="100"></el-table-column>
                <el-table-column prop="waterValue" label="水型" align="center" min-width="100"></el-table-column>
                <el-table-column prop="" :render-header="renderHeader" label="地层水矿化度 (mg/L)  " align="center" min-width="100"></el-table-column>
                <el-table-column prop="anionContent" :render-header="renderHeader" label="阴离子总量 (mg/L)" align="center" min-width="140"></el-table-column>
                <el-table-column prop="cationContent" :render-header="renderHeader" label="阳离子总量 (mg/L)" align="center" min-width="140"></el-table-column>
                <el-table-column prop="totalAlkalinity" :render-header="renderHeader" label="总碱度 (mmol/L)" align="center" min-width="140"></el-table-column>
                <el-table-column prop="cumHardness" label="总硬度" align="center" min-width="100"></el-table-column>
                <el-table-column prop="resis" :render-header="renderHeader" label="电阻率 (Ωm)" align="center" min-width="100"></el-table-column>
            </el-table>
        </info-window>
    </div>
</template>

<script>
    import {testReport} from "@/api/oilDeposit/rem-01/dynamicAnalysis";
    // import {exportExcel} from "@/lib/exportExcel";
    export default {
        filters: {
            /**
             * hwh
             * 处理事件格式
             * @param val
             * @returns {string|*}
             */
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
                radio: 3,
                src: '../../static/img/oilAuxiliaryAnalysis/productionDynamicData/fluidProducingProfile.jpg',
                tableData: [],
                tableData1: [],
            };
        },
        mounted() {
            //初始化调用搜索
            // this.doSearch();
        },
        methods: {
            /**
             * hwh
             * 根据父组件传递过来的参数进行查询
             */
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
            /**
             * hwh
             * 下载
             */
            doDownLoad() {
                let fileName = '化验数据';
                if (this.wellName) {
                    fileName = this.wellName + fileName;
                }
                // exportExcel('#tableData',fileName+'原油分析');
                // exportExcel('#tableData1',fileName+'采出水');

            },
            /**
             * hwh el table 表格头 标题单位样式
             * @param h
             * @param column
             * @returns {*[]}
             */
            renderHeader(h, {
                column
            }) {
                let header = column.label.split(' ');
                return [h('p', [
                    h('p', {}, header[0]),
                    h('span', {}, header[1])
                ])];
            }
        }
    }
</script>

<style scoped lang="scss">
    .z-main{
        width: 100%;
        height:calc(100% - 86px);
        padding-top:20px;
    }
    ::v-deep .el-table .cell:empty::before {
        content: '-';
    }
</style>
