<!--水物性数据-->
<template>
    <page-panel-new style="height:calc(100% - 101px);margin-top:0;" show-btn>
        <el-table
            id="tableData"
            :data="tableData" :border="false" :row-style="{ height: '0px' }"
            header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }"
            style="width:100%;" height="100%" :default-sort="{ prop: 'date', order: 'descending' }"
            :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }">
            <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
            <el-table-column prop="borepipeNo" label="井号" align="center" min-width="160"></el-table-column>
            <el-table-column prop="date" :label="`日期\n(yyyy-mm-dd)`" align="center" min-width="140">
            </el-table-column>
            <el-table-column prop="sampleId" label="流体样品类型" align="center" min-width="140">
            </el-table-column>
            <el-table-column prop="fluidPH" label="PH值/酸碱度" align="center" min-width="140">
            </el-table-column>
            <el-table-column prop="color" label="颜色" align="center" min-width="140">
            </el-table-column>
            <el-table-column prop="" :label="`地层水矿化度\n (mg/L)`" align="center" min-width="140">
            </el-table-column>
            <el-table-column prop="anionContent" :label="`阴离子总量\n (mg/L)`" align="center" min-width="140">
            </el-table-column>
            <el-table-column prop="cationContent" :label="`阳离子总量\n (mg/L)`" align="center" min-width="140">
            </el-table-column>
            <el-table-column prop="totalAlkalinity" :label="`总碱度\n (mmol/L)`" align="center" min-width="140">
            </el-table-column>
            <el-table-column prop="cumHardness" :label="`总硬度\n (mmol/L)`" align="center" min-width="140">
            </el-table-column>
            <el-table-column prop="resis" :label="`电阻率\n (Ωm)`" align="center" min-width="140">
            </el-table-column>
        </el-table>
    </page-panel-new>
</template>

<script>
    import {streamingMediaDataWaterPhysicalPropertyData} from "@/api/oilDeposit/rem-01/fielddynamicanalysis";
    import {exportExcel} from "@/lib/exportExcel.js";
    export default {
        props: {
            oilFieldId: {},
            blockId: {},
        },
        data() {
            return {
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
                await streamingMediaDataWaterPhysicalPropertyData(request).then((res) => {
                    if (res.data.code == 200) {
                        this.tableData = res.data.data.results;
                    } else {
                        this.tableData = [];
                    }
                });
            },
            //下载
            doDownLoad() {
                let fileName = '水物性数据';
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
            padding:3.5px 10px;
            white-space: pre;
        }
        ::v-deep .cell:empty{
            &::before {
                content: '-';
            } 
        }
    } 
</style>
