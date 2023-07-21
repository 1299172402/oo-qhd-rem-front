<!--五敏分析数据-->
<template>
    <page-panel-new style="height:calc(100% - 100px);margin-top:0;" show-btn>
        <el-table 
            id="tableData"
            :data="tableData" :border="false" :row-style="{ height: '0px' }"
            header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }"
            style="width:100%;padding:0 10px;" height="100%" :default-sort="{ prop: 'date', order: 'descending' }"
            :header-cell-style="{ 'text-align': 'center', padding: '0px 0'}">
            <el-table-column label="序号" align="center" type="index" width="80"></el-table-column>
            <el-table-column label="检测项目" align="center" prop="testItemId" width="140"></el-table-column>
            <el-table-column label="样品编号" align="center" prop="" width="140"></el-table-column>
            <el-table-column :label="`孔隙度\n (%)`" align="center" prop="porosity" width="140"></el-table-column>
            <el-table-column :label="`初始渗透率\n (mD)`" align="center" prop="" width="140"></el-table-column>
            <el-table-column :label="`空气渗透率\n (mD)`" align="center" prop="permAir" width="140"></el-table-column>
            <el-table-column :label="`克氏渗透率\n (mD)`" align="center" prop="" width="140"></el-table-column>
            <el-table-column :label="`流体入口压力\n (MPa)`" align="center" prop="inletPress" width="140"></el-table-column>
            <el-table-column :label="`临界矿化度_浓度\n (mg/L)`" align="center" prop="" width="140"></el-table-column>
            <el-table-column :label="`临界矿化度_比值\n (ppm)`" align="center" prop="" width="140"></el-table-column>
            <el-table-column :label="`临界流速\n (m³/d)`" align="center" prop="criticalFlowVelocity" width="140"></el-table-column>
            <el-table-column :label="`临界流量\n (ml/min)`" align="center" prop="criticalFlow" width="140"></el-table-column>
            <el-table-column label="临界碱度" align="center" prop="criticalAlkalinity" width="140"></el-table-column>
            <el-table-column label="临界PH值" align="center" prop="criticalPh" width="140"></el-table-column>
            <el-table-column :label="`速敏损害率\n (%)`" align="center" prop="" width="140"></el-table-column>
            <el-table-column :label="`酸敏损害率\n (%)`" align="center" prop="acidDamageRate" width="140"></el-table-column>
            <el-table-column :label="`应力敏损害率\n (%)`" align="center" prop="stressDamageRate" width="140"></el-table-column>
            <el-table-column label="碱液类型" align="center" prop="alkaliType" width="140"></el-table-column>
            <el-table-column label="应力敏指数" align="center" prop="stressIndex" width="140"></el-table-column>
            <el-table-column label="速敏指数" align="center" prop="velocityIndex" width="140"></el-table-column>
            <el-table-column label="碱敏指数" align="center" prop="alkaliIndex" width="140"></el-table-column>
            <el-table-column label="水敏指数" align="center" prop="" width="140"></el-table-column>
            <el-table-column label="盐敏指数" align="center" prop="saltIndex" width="140"></el-table-column>
            <el-table-column label="酸敏指数" align="center" prop="acidIndex" width="140"></el-table-column>
            <el-table-column label="敏感性描述" align="center" prop="sensitivityDesc" width="140"></el-table-column>
            <el-table-column label="备注" align="center" prop="remark" width="200"></el-table-column>
        </el-table>
    </page-panel-new>
</template>

<script>
    import {reservoirDataFiveSensitivityAnalysisData} from "@/api/oilDeposit/rem-01/fielddynamicanalysis.js";
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
                tableData: []
            };
        },
        mounted() {
            this.doSearch();
        },
        methods: {
            async doSearch() {
                //置空子组件参数
                this.$emit('childPara', '');
                //获得查询参数
                let request = {
                    oilFieldId: this.oilFieldId,
                    fieldId: this.blockId,
                }
                //调用接口方法
                await reservoirDataFiveSensitivityAnalysisData(request).then((res) => {
                    if (res.data.code == 200) {
                        this.tableData = res.data.data.ascSensitivityMeasures;
                    } else {
                        this.tableData = [];
                    }
                });
            },
            //下载
            doDownLoad() {
                let fileName = '五敏分析数据';
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
