<!--分层调配数据-->
<template>
    <div class="z-main">
        <!-- <el-table id="tableData" :data="tableData" :border="false" :row-style="{ height: '0px' }" header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }" style="width:100%;" height="100%" :default-sort="{ prop: 'date', order: 'descending' }" :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }">
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column prop="borePipeName" label="井号" min-width="140"></el-table-column>
            <el-table-column prop="startDate" label="开始时间" width="120">
                <template slot-scope="scope">
                    <span>{{scope.row.startDate | dateTimeFormat}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="endDate" label="结束时间" width="120">
                <template slot-scope="scope">
                    <span>{{scope.row.endDate | dateTimeFormat}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="layerName" label="解释层位标识" min-width="180"></el-table-column>
            <el-table-column prop="testedThickness" :label="`测试厚度\n(m)`" width="100"></el-table-column>
            <el-table-column prop="waterNozzleDiameter" :label="`水嘴直径\n(mm)`" width="100"></el-table-column>
            <el-table-column prop="intakeWellHeadPress" :label="`注入井口压力\n(MPa)`" width="140"></el-table-column>
            <el-table-column prop="dailyInj" :label="`层日注入量\n(m³/d)`" width="140"></el-table-column>
            <el-table-column prop="injectivityIndex" :label="`吸水指数\n(m³/(MPa·d))`" width="140"></el-table-column>
            <el-table-column prop="startPress" :label="`启动压力\n(MPa)`" width="100"></el-table-column>
            <el-table-column prop="timeInterval" :label="`时间间隔\n(h)`" width="100"></el-table-column>
            <el-table-column prop="testResult" label="测试结论代码" width="200"></el-table-column>
            <el-table-column prop="remark" min-width="240" label="备注"></el-table-column>
        </el-table> -->
    </div>
</template>

<script>
    import { divLayerTestData} from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
    import {exportExcel} from "@/lib/exportExcel.js";
    export default {
        props: {
            //选择油田
            oilFeildId: {},
            //选择平台
            platform: {},
            //选择井号
            wellId: {}
        },
        filters: {
            dateTimeFormat(val) {
                if (val) {
                    let rq = new Date(val).format("yyyy-MM-dd");
                    return rq;
                } else {
                    return val;
                }
            }
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
                divLayerTestData(request).then((res) => {
                    if (res.data.code == 200) {
                        this.tableData = res.data.data.divLayerTestDatas;
                    }
                })
            },
            doDownLoad() {
                let fileName = '分层测试';
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
