<!--措施效果-->
<template>
    <el-table id="tableData" highlight :data="tableData" style="width: 100%" height="calc(100% - 101px)">
        <el-table-column type="index" label="序号" header-align="center" width="60"></el-table-column>
        <el-table-column prop="wellNo" label="井号" header-align="center" width="140"></el-table-column>
        <el-table-column prop="fieldName" label="区块" header-align="center"></el-table-column>
        <el-table-column prop="beginDate" label="开工日期" header-align="center"></el-table-column>
        <el-table-column prop="beginWellDate" label="开井日期" header-align="center"></el-table-column>
        <el-table-column prop="measureType" label="措施类型" header-align="center"></el-table-column>
        <el-table-column label="预测增产" header-align="center">
            <el-table-column prop="address" label="吨/天" header-align="center">
            </el-table-column>
        </el-table-column>
        <el-table-column label="措施前生产情况" header-align="center">
            <el-table-column label="日产液量" header-align="center">
                <el-table-column prop="bmLiquidDaily" label="方/天" header-align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="日产油量" header-align="center">
                <el-table-column prop="bmOilDaily" label="吨/天" header-align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="含水率" header-align="center">
                <el-table-column prop="bmWaterCut" label="%" header-align="center"></el-table-column>
            </el-table-column>
        </el-table-column>
        <el-table-column label="措施后生产情况" header-align="center">
            <el-table-column label="日产液量" header-align="center">
                <el-table-column prop="amLiquidDaily" label="方/天" header-align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="日产油量" header-align="center">
                <el-table-column prop="amOilDaily" label="吨/天" header-align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="含水率" header-align="center">
                <el-table-column prop="amWaterCut" label="%" header-align="center"></el-table-column>
            </el-table-column>
        </el-table-column>
        <el-table-column label="措施生产情况" header-align="center">
            <el-table-column label="日增油" header-align="center">
                <el-table-column prop="oilDaily" label="方/天" header-align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="累增油" header-align="center">
                <el-table-column prop="oilSum" label="吨/天" header-align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="增产有效期" header-align="center">
                <el-table-column prop="validDays" label="天" header-align="center"></el-table-column>
            </el-table-column>
        </el-table-column>
    </el-table>
</template>

<script>
    import {wellGroupMeasureStat} from '@/api/oilDeposit/rem-01/wellgroupdynamicanalysis.js';
    import {exportExcel} from "@/lib/exportExcel.js";
    export default {
        props: {
            //油田id
            oilFieldId: {},
            //区块id
            blockId: {},
            //层系id
            layerId: {},
            //井组id
            wellGroupId: {}
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
                    oilFieldId: this.oilFieldId,
                    fieldId: this.blockId,
                    fieldLayerId: this.layerId,
                    wellGroupId: this.wellGroupId,
                };
                wellGroupMeasureStat(request).then((res) => {
                    if (res.data.code == 200) {
                        this.tableData = res.data.data.wellGroupMeasureStats;
                    }
                });
            },
            doDownLoad() {
                let fileName = '措施效果';
                if (this.wellGroupName) {
                    fileName = this.wellGroupName + fileName;
                }
                exportExcel('#tableData', fileName);
            }
        }
    };
</script>

<style lang="scss" scoped>
    ::v-deep .el-table .cell:empty::before {
        content: '-';
    }
</style>
