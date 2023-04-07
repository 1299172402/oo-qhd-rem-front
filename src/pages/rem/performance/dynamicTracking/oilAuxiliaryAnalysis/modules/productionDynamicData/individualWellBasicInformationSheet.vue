<!--单井基本信息表-->
<template>
    <el-table
        id="tableData"
        :data="tableData"
        :border="false"
        :row-style="{ height: '0px' }"
        header-cell-class-name="table_header"
        :cell-style="{ padding: '6px', 'text-align': 'center' }"
        style="width:100%;"
        height="calc(100% - 101px)"
        :default-sort="{ prop: 'date', order: 'descending' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
    >
        <el-table-column type="index" label="序号"></el-table-column> 
        <el-table-column prop="wellNo" label="井号"></el-table-column>
        <el-table-column prop="fieldName" label="区块"></el-table-column>
        <el-table-column prop="horizontalLength" :render-header="renderHeader" label="水平段长度 (m)"></el-table-column>
        <el-table-column prop="completeType" label="完井方式"></el-table-column>
        <el-table-column prop="boreType" label="管柱类型"></el-table-column>
        <el-table-column prop="kb" :render-header="renderHeader" label="补心海拔 (m)"></el-table-column>
        <el-table-column prop="baseLevelDepth" :render-header="renderHeader" label="基准面深度 (m)"></el-table-column>
        <el-table-column label="投产时间">
            <template slot-scope="scope">
                <span>{{ scope.row.productionDate | formatTime }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="pumpTvd" :render-header="renderHeader" label="泵挂垂深 (m)"></el-table-column>
        <el-table-column prop="displacement" :render-header="renderHeader" label="泵排量 (m³)"></el-table-column>
        <el-table-column prop="pumpHead" :render-header="renderHeader" label="泵扬程 (m)"></el-table-column>
    </el-table>
</template>
<script>
    import { wellBaseInfo } from '@/api/oilDeposit/rem-01/dynamicAnalysis.js';
    import { exportExcel } from '@/lib/exportExcel.js';
    export default {
        filters: {
            formatTime(val) {
                if (val) {
                    return new Date(val).format('yyyy-MM-dd');
                } else {
                    return '';
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
                tableData: []
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
                    wellId: this.wellId
                };
                wellBaseInfo(request).then((res) => {
                    if (res.data.code == 200) {
                        this.tableData = res.data.data.wellBaseInfo;
                    }
                });
            },
            //下载
            doDownLoad() {
                let fileName = '单井基本信息表';
                if (this.wellName) {
                    fileName = this.wellName + fileName;
                }
                exportExcel('#tableData', fileName);
            }
        }
    };
</script>

<style scoped lang="scss">
    #tableData {
        // ::v-deep .el-table__header-wrapper .cell{
        //     height: auto;
        //     line-height: 18px;
        // }
        ::v-deep .cell:empty {
            &::before {
                content: '-';
            }
        }
    }
</style>
