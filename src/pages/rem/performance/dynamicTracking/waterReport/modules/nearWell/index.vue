<!-- 邻井数据 -->
<template>
  <div class="app-container">
    <pagePanel headerTitle="邻井数据" show-btn>
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
            <el-table-column type="index" width="60" label="序号"></el-table-column>
            <el-table-column prop="wellNo" label="井号" width="130"></el-table-column>
            <el-table-column prop="oilPoolMiddlePree" :label="`油藏中部压力\n(Mpa)`">
            </el-table-column>
            <el-table-column prop="recdInjAllnWell" :label="`推荐注入井配注量\n(m³)`"></el-table-column>
            <el-table-column prop="dailyFluidProd" :label="`日产液量\n(m³)`"></el-table-column>
            <el-table-column prop="dailyOilProd" :label="`日产油量\n(m³)`"></el-table-column>
            <el-table-column prop="comeWaterCut" :label="`综合含水率\n(m³)`"></el-table-column>
            <el-table-column prop="dailyGasProd" :label="`日产气量\n(m³)`"></el-table-column>
            <el-table-column prop="dailyGasFluidProd" label="气液比"></el-table-column>
            <el-table-column prop="wellBottomStaticPree" :label="`井底静压\n(Mpa)`"></el-table-column>
            <el-table-column prop="wellBottomPree" :label="`井底流压\n(Mpa)`"></el-table-column>
            <el-table-column prop="fluidStaticPree" label="产液指数"></el-table-column>
        </el-table>
    </pagePanel>
  </div>
</template>

<script>
import { queryAdjacentWellData} from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
import {exportExcel} from "@/lib/exportExcel.js";
import {downFile} from "@/lib/remBase64Download";
export default {
    props: {
        //选择油田
        oilFeildId: {},
        //选择平台
        platform: {},
        //选择井号
        wellId: {},
        queryData:{}
    },
  data() {
    return {
      tableData: [],
    };
  },
    mounted() {
    this.doSearch();
  },
    watch:{
        queryData:{
            handler(Nval){
                let data = {
                    wellId: Nval.selectWellId
                }
                queryAdjacentWellData(data).then((res)=>{
                    this.tableData = res.data.data
                })
            }
        }
    },
  methods: {
      doSearch() {
          let data = {
              wellId:this.queryData.selectWellId
          }
          queryAdjacentWellData(data).then((res)=>{
            this.tableData = res.data.data
        })
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
#tableData {
    ::v-deep .el-table__header-wrapper .cell {
        height: auto;
        line-height: 18px;
        white-space: pre;
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
