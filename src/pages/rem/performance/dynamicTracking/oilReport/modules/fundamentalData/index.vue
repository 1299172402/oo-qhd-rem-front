<!-- 基本信息 -->
<template>
    <div class="app-container">
        <pagePanel headerTitle="基础数据" show-btn>
            <el-table
                id="tableData"
                :data="tableData"
                border
                :row-style="{ height: '0px' }"
                header-cell-class-name="table_header"
                :cell-style="{ padding: '6px', 'text-align': 'center' }"
                style="width:100%;"
                height="100%"
                :default-sort="{ prop: 'date', order: 'descending' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
            >
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="platformName" label="平台" width="130"></el-table-column>
                <el-table-column prop="coordX" label="井坐标位置">
                    <template slot-scope="scope">
                        <span>{{'X：'+scope.row.coordX + ' , Y：' + scope.row.coordY}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="appendixValueNameC" label="井型"></el-table-column>
                <el-table-column prop="appendixValueNameT" label="井别"></el-table-column>
                <el-table-column prop="basalLevelAltitude" label="井基准表"></el-table-column>
                <el-table-column prop="kB" label="补心海拔"></el-table-column>
                <el-table-column prop="tD" label="完钻井深"></el-table-column>
                <el-table-column prop="totalTvd" label="完钻垂深"></el-table-column>
            </el-table>
        </pagePanel>
    </div>
</template>

<script>
import {queryBasicData} from "@/api/rem/oilanalysisreport";

export default {
    data() {
        return {
            tableData: [],
            oilFeildId: "3FC9A818F5BC43B88270DB80BBB3018F",
            //选择平台
            platform: "3F1E5858C6CC41E2BF4FFC4902797C08",
            //选择井号
            wellId: "09D30C16BD1D4F759D53F74941701307",
        };
    },
    created() {
        // var date = new Date();
        // var months = date.getMonth() + 1;
        // var m = '0' + (months - 1);
        // var y = date.getFullYear();
        // if (months == 1) {
        //   y--;
        //   m = '12';
        // }
        // this.getData();
    },
    mounted() {
        // this.doSearch()
    },
    methods: {
        doSearch() {
            let params = {
                assetCode:this.platform,
                wellId:this.wellId
            }
            queryBasicData(params).then(res=>{
                this.tableData = res.data.data
            })
        },
        passValue(val) {
            this.oilFeildId = val.ogfId;
            this.platform = val.assetCode;
            this.wellId = val.selectWellId;
            this.doSearch();
        },
    },
};
</script>
<style lang="less" scoped>
.app-container {
    height: 100%;

    .el-table {
        overflow: scroll;
    }
}

::v-deep .el-table__header-wrapper {
    .cell {
        height: auto !important;
    }
}

.pertable thead .el-table-column--selection .cell {
    display: none;
}
</style>
