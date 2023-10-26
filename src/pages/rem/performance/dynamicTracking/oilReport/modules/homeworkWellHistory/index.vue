<!--作业井史-->
<template>
  <div>
    <pagePanel headerTitle="生产简史" style="height:600px" show-btn>
      <el-table
        id="tableData"
        :data="tableData"
        border
        :row-style="{ height: '0px' }"
        header-cell-class-name="table_header"
        :cell-style="{ padding: '6px', 'text-align': 'center' }"
        style="width: 100%;"
        height="100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
      >
        <el-table-column type="index" label="序号" width="150px" align="center"> </el-table-column>
        <el-table-column prop="startTime" :label="`开始时间\n(yyyy-mm-dd)`" align="center" width="250"> </el-table-column>
        <el-table-column prop="chronicle" label="大事简要" align="center" width="300"> </el-table-column>
        <el-table-column prop="remark" label="备注" align="center"> </el-table-column>
      </el-table>
    </pagePanel>
  </div>
</template>

<script>
import { workingHistory } from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
import { exportExcel } from "@/lib/exportExcel.js";
export default {
  data() {
    return {
      tableData: [],
      //选择油田
      oilFeildId: "3FC9A818F5BC43B88270DB80BBB3018F",
      //选择平台
      platform: "3F1E5858C6CC41E2BF4FFC4902797C08",
      //选择井号
      wellId: "09D30C16BD1D4F759D53F74941701307",
    };
  },
  mounted() {
    //初始化调用搜索
    this.doSearch();
  },
  methods: {
    passValue(val) {
      this.oilFeildId = val.ogfId;
      this.platform = val.assetCode;
      this.wellId = val.selectWellId;
      this.doSearch();
    },
    /**
     * hwh
     * 根据父组件传递过来的参数进行查询
     */
    doSearch() {
      let request = {
        ogfId: this.oilFeildId,
        platformId: this.platform,
        wellId: this.wellId,
      };
      workingHistory(request).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.workingHistorys;
        }
      });
    },
    /**
     * hwh
     * 下载
     */
    doDownLoad() {
      let fileName = "作业井史";
      if (this.wellName) {
        fileName = this.wellName + fileName;
      }
      exportExcel("#tableData", fileName);
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-table .cell:empty::before {
  content: "-";
}
#tableData {
    ::v-deep .el-table__header-wrapper .cell {
        height: auto;
        line-height: 18px;
        white-space: pre;
    }
}
// ::v-deep .el-table__body-wrapper {
//   height: calc(100% - 34px);
// }
</style>
