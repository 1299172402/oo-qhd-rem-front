<!--岩心化验数据-->
<template>
    <page-panel-new style="height:calc(100% - 100px);margin-top:0;" show-btn>
        <el-table 
            id="tableData"
            :data="tableData" :border="false" :row-style="{ height: '0px' }"
            header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }"
            style="width:100%;padding:0 10px;" height="100%" :default-sort="{ prop: 'date', order: 'descending' }">
            <el-table-column label="序号" align="center" type="index" width="80"></el-table-column>
            <el-table-column label="样本标识" align="center" prop="sampleID"></el-table-column>
            <el-table-column :label="`实验日期\n (yyyy-mm-dd)`" min-width="130" align="center" prop="testDate"></el-table-column>
            <el-table-column label="报告编号" align="center" prop="reportNO"></el-table-column>
            <el-table-column label="实验方法" align="center" prop="testMethod"></el-table-column>
            <el-table-column :label="`模拟水密度\n (g/cm³)`" align="center" prop="simulationWaterDensity"></el-table-column>
            <el-table-column :label="`模拟油密度\n (g/cm³)`" align="center" prop="simulationOilDensity"></el-table-column>
            <el-table-column :label="`模拟气密度\n (g/cm³)`" align="center" prop="simulationGasDensity"></el-table-column>
            <el-table-column :label="`岩心长度\n (cm)`" align="center" prop="rockCenterLength"></el-table-column>
            <el-table-column :label="`岩心直径\n (cm)`" align="center" prop="rockCenterDiameter"></el-table-column>
            <el-table-column :label="`渗透率\n (μ㎡)`" align="center" prop="permeability"></el-table-column>
            <el-table-column :label="`孔隙度\n (%)`" align="center" prop="porosity"></el-table-column>
            <el-table-column :label="`饱和度\n (%)`" align="center" prop="saturation"></el-table-column>
            <el-table-column :label="`压力\n (MPa)`" align="center" prop="pressure"></el-table-column>
            <el-table-column label="驱替方式" align="center" prop="driveReplaceMethod"></el-table-column>
        </el-table>
    </page-panel-new>
</template>

<script>
    import {reservoirDataCoreTestData} from "@/api/oilDeposit/rem-01/fielddynamicanalysis";
    import {exportExcel} from "@/lib/exportExcel.js";
    
    export default {
        props: {
            oilFieldId: {},
            blockId: {},
        },
        data() {
            return {
                radio: 1,
                src: '../../static/img/blockAnalysisAided/reservoirData/pore.png',
                tableData: [],
            };
        },
        mounted() {
            this.doSearch();
        },
        methods: {
            //查询
            async doSearch() {
                //置空子组件参数
                this.$emit('childPara', '');
                //获得查询参数
                let request = {
                    oilFieldId: this.oilFieldId,
                    fieldId: this.blockId,
                }
                //调用接口方法
                await reservoirDataCoreTestData(request).then((res) => {
                    if (res.data.code == 200) {
                        this.tableData = res.data.data.coreTestDatas;
                    } else {
                        this.tableData = [];
                    }
                });
            },
            //下载
            doDownLoad() {
                let fileName = '岩心化验数据';
                if (this.blockName) {
                    fileName = this.blockName + fileName;
                }
                exportExcel('#tableData', fileName);
            },
        }
    }
</script>

<style scoped lang="scss">
    #tableData{
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
</style>
