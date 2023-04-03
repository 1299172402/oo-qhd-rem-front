<!--小层数据-->
<template>
    <el-table id="tableData" highlight :data="tableData" style="width: 100%;" height="600">
        <el-table-column type="index" label="序号" width="180" align="center"></el-table-column>
        <!--<el-table-column prop="wellNo" label="井号" width="180" align="center"></el-table-column>
      <el-table-column prop="no" label="层号" align="center"></el-table-column>
      <el-table-column prop="twd" label="底界井深" align="center"></el-table-column>
      <el-table-column prop="tvd" label="底界垂深" align="center"></el-table-column>
      <el-table-column prop="vthickness" label="垂厚" align="center"></el-table-column>
      <el-table-column prop="layerName" label="油气田层位" align="center"></el-table-column>
      <el-table-column prop="contactRelationship" label="接触关系" align="center"></el-table-column>-->
        <el-table-column prop="ogfName" label="油气田" align="center"></el-table-column>
        <el-table-column prop="resource" label="来源活动" align="center"></el-table-column>
        <el-table-column prop="layerName" label="层位" align="center"></el-table-column>
        <el-table-column prop="wellName" label="井筒" align="center"></el-table-column>
        <el-table-column prop="topMd" :render-header="renderHeader" label="顶界斜深 (m)" align="center"></el-table-column>
        <el-table-column prop="bottomMd" :render-header="renderHeader" label="底界斜深 (m)" align="center"></el-table-column>
        <el-table-column prop="mthickness" label="斜厚" align="center"></el-table-column>
        <el-table-column prop="topTvd" :render-header="renderHeader" label="顶界垂深 (m)" align="center"></el-table-column>
        <el-table-column prop="bottomTvd" :render-header="renderHeader" label="底界垂深 (m)" align="center"></el-table-column>
        <el-table-column prop="tthickness" :render-header="renderHeader" label="垂厚 (m)" align="center"></el-table-column>
        <el-table-column prop="strataContact" label="接触关系" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
    </el-table>
</template>

<script>
    import { microLayerData } from '@/api/oilDeposit/rem-01/dynamicAnalysis.js';
    import { exportExcel } from '@/lib/exportExcel.js';
    export default {
        props: {
            oilFeildId: {},//选择油田
            platform: {},//选择平台
            wellId: {}//选择井号
        },
        data() {
            return {
                tableData: []
            };
        },
        mounted() {
            //初始化调用搜索
            this.doSearch();
        },
        methods: {
            //根据父组件传递过来的参数进行查询
            doSearch() {
                let request = {
                    ogfId: this.oilFeildId,
                    platformId: this.platform,
                    wellId: this.wellId
                };
                microLayerData(request).then((res) => {
                    if (res.data.code == 200) {
                        this.tableData = res.data.data.subLayer;
                    }
                });
            },
            //下载
            doDownLoad() {
                let fileName = '小层数据';
                if (this.wellName) {
                    fileName = this.wellName + fileName;
                }
                exportExcel('#tableData', fileName);
            },
            //eltable 表格头 标题单位样式
            renderHeader(h, { column }) {
                let header = column.label.split(' ');
                return [h('p', [h('p', {}, header[0]), h('span', {}, header[1])])];
            }
        }
    };
</script>

<style scoped lang="scss">
    ::v-deep .el-table .cell:empty::before {
        content: '-';
    }
</style>
