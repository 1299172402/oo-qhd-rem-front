<!--压力测试-->
<template>
    <page-panel style="width: 100%; height: calc(100% - 100px); margin-top: 0;" headerTitle="压力数据" showBtn>
        <el-table
            id="tableData" 
            :data="tableData" :border="false" :row-style="{ height: '0px' }"
            header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }"
            style="width:100%;padding:0 10px;" height="calc(100% - 10px)" :default-sort="{ prop: 'date', order: 'descending' }"
            :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }">
            <el-table-column type="index" label="序号" fixed></el-table-column>
            <el-table-column prop="borepipeName" label="井号" width="140px" fixed></el-table-column>
            <el-table-column prop="wellInterceptType" label="试井项目解析类型" width="140"></el-table-column>
            <el-table-column prop="interpDate" label="解释时间" width="140">
                <template slot-scope="scope">
                    <span>{{scope.row.interpDate | dateTimeFormat}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="midMD" label="油层中部斜深 (m)" width="120"></el-table-column>
            <el-table-column prop="midTVD" label="油层中部垂深 (m)" width="120"></el-table-column>
            <el-table-column prop="midTemperature" label="油层中部温度 (℃)" width="120"></el-table-column>
            <el-table-column prop="midFlowPressure" label="油层中部流压 (MPa)" width="120"></el-table-column>
            <el-table-column prop="midStaticPressure" label="油层中部静压 (MPa)" width="120"></el-table-column>
            <el-table-column prop="baseLevelAltitude" label="基准面海拔 (m)" width="110"></el-table-column>
            <el-table-column prop="baseLevelTemperature" label="基准面温度 (℃)" width="110"></el-table-column>
            <el-table-column prop="baseStaticPressure" label="基准面静压 (MPa)" width="110"></el-table-column>
            <el-table-column prop="baseFlowPressure" label="基准面流压 (MPa)" width="110"></el-table-column>
            <el-table-column prop="reduceTemperature" label="折算温度梯度 (℃/m)" width="120"></el-table-column>
            <el-table-column prop="reducePressure" label="折算压力梯度 (MPa/m)" width="120"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
        </el-table>
    </page-panel>
</template>

<script>
    import {pressure} from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
    import {exportExcel} from "@/lib/exportExcel.js";
    export default {
        filters: {
            //处理时间格式
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
            };
        },
        mounted() {
            this.doSearch();
        },
        methods: {
            //根据父组件传递过来的参数进行查询
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
            //下载
            doDownLoad() {
                let fileName = '压力测试';
                if (this.wellName) {
                    fileName = this.wellName + fileName;
                }
                exportExcel('#tableData',fileName);
            },
        }
    }
</script>

<style scoped lang="scss">
    #tableData{
        ::v-deep .el-table__header-wrapper .cell{
            height: auto;
            line-height: 18px;
        }
        ::v-deep .cell:empty{
            &::before {
                content: '-';
            } 
        }
    } 
</style>
