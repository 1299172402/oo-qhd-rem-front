<!-- 生产段状态 -->
<template>
    <el-table :data="tableData" :border="false" :row-style="{ height: '0px' }" header-cell-class-name="table_header"
        :cell-style="{ padding: '6px', 'text-align': 'center' }" style="width:100%; padding: 20px 0"
        height="calc(100% - 86px)" :default-sort="{ prop: 'date', order: 'descending' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }">
        <el-table-column prop="wellNo" label="井号"></el-table-column>
        <el-table-column prop="productionIntervalNo" label="生产段"></el-table-column>
        <el-table-column prop="openOrClose" label="变更状态"></el-table-column>
        <el-table-column prop="startDate" label="变更时间"></el-table-column>
    </el-table>
</template>

<script>
    import {
        getProductionStatus
    } from "@/api/oilDeposit/rem-04/oilAuxiliaryAnalysis.js";
    export default {
        props: {
            //选择油田
            oilFeildId: '',
            //选择平台
            platform: '',
            //选择井号
            wellId: '',
        },
        data() {
            return {
                tableData: [],
            }
        },
        created() {
            this.doSearch();
        },
        methods: {
            //列表数据
            doSearch() {
                let request = {
                    ogfId: this.oilFeildId,
                    platformId: this.platform,
                    wellId: this.wellId,
                };
                getProductionStatus(request).then((res) => {
                    if (res.data.code == 200) {
                        this.tableData = res.data.data;
                    }
                });
            },
        }
    }
</script>
