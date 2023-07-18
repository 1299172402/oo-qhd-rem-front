<!--测井解释成果-->
<template>
    <page-panel-new style="height: calc(100% - 101px); margin-top:0;" show-btn>
        <el-table 
            id="tableData"
            :data="tableData" :border="false" :row-style="{ height: '0px' }"
            header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }"
            style="width:100%; " height="100%" :default-sort="{ prop: 'date', order: 'descending' }"
            :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }">
            <el-table-column type="index" label="序号" fixed></el-table-column>
            <el-table-column prop="wellName" label="井号" width="130" fixed></el-table-column>
            <el-table-column prop="layerName" label="层号" width="200" fixed></el-table-column>
            <el-table-column prop="topMd" :label="`顶界斜深\n (m)`"  width="120"></el-table-column>
            <el-table-column prop="bottomMd" :label="`底界斜深\n (m)`"  width="120"></el-table-column>
            <el-table-column prop="mthickness" :label="`斜厚\n (m)`"  width="120"></el-table-column>
            <el-table-column prop="topTvd" :label="`顶界垂深\n (m)`"  width="120"></el-table-column>
            <el-table-column prop="bottomTvd" :label="`底界垂深\n (m)`"  width="120"></el-table-column>
            <el-table-column prop="tthickness" :label="`垂厚\n (m)`"  width="120"></el-table-column>
            <el-table-column prop="resistivity" :label="`地层电阻\n (Ω·m)`"  width="120"></el-table-column>
            <el-table-column prop="effePorosity" :label="`孔隙度\n (%)`"  width="120"></el-table-column>
            <el-table-column prop="effePermeability" :label="`空气渗透率\n (mD)`" width="120"></el-table-column>
            <el-table-column prop="oilSaturation" :label="`含油饱和度\n (%)`" width="120"></el-table-column>
            <el-table-column prop="shaleContent" :label="`泥质含量\n (%)`"  width="120"></el-table-column>
            <el-table-column prop="topKb" :label="`海拔顶深\n (m)`"  width="120"></el-table-column>
            <el-table-column prop="bottomKb" :label="`海拔底深\n (m)`"  width="120"></el-table-column>
            <el-table-column prop="usefulThickness" :label="`有效厚度\n (m)`"  width="120"></el-table-column>
            <el-table-column prop="interpConclusion" label="解释结论"></el-table-column>
            <el-table-column prop="remark" label="备注" width="200"></el-table-column>
        </el-table>
    </page-panel-new>
</template>

<script>
    import { loggingInterpretation, } from '@/api/oilDeposit/rem-01/dynamicAnalysis.js';
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
        data() {
            return {
                // oilFeildId:'',
                // platform:'',
                // wellId:'',
                tableData: []
            }
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
                loggingInterpretation(request).then((res) => {
                    console.log('res',res)
                    if (res&&res.data.code == 200) {
                        this.tableData = res.data.data.loggingInterceptResult;
                    }
                })
            },
            //下载
            doDownLoad() {
                let fileName = '测井解释成果';
                if (this.wellName) {
                    fileName = this.wellName + fileName;
                }
                exportExcel('#tableData',fileName);
            },
        },
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
