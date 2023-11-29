<!--原油粘度-->
<template>
  <page-panel-new style="height: calc(100% - 101px); margin-top: 0" show-btn>
    <!-- :default-sort="{ prop: 'date', order: 'descending' }" -->
    <el-table
      id="tableData"
      :data="tableData"
      border
      :row-style="{ height: '0px' }"
      header-cell-class-name="table_header"
      :cell-style="{ padding: '6px', 'text-align': 'center' }"
      style="width: 100%"
      height="100%"
      :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
    >
      <el-table-column label="序号" align="center" type="index" width="80"></el-table-column>
      <el-table-column prop="borepipeNo" label="井号" align="center" width="180"></el-table-column>
      <el-table-column prop="date" :label="`日期\n(yyyy-mm-dd)`" align="center" min-width="140"></el-table-column>
      <el-table-column prop="oilAnalyResultId" label="流体样品类型" align="center" min-width="100"></el-table-column>
      <el-table-column prop="den" :label="`原油密度\n (g/cm³)`" align="center" width="140"></el-table-column>
      <el-table-column prop="" :label="`粘度\n (mPa.s)`" align="center" width="140"></el-table-column>
      <el-table-column prop="api60F" label="API_60F" align="center" width="100"></el-table-column>
      <el-table-column prop="waterContent" :label="`含水\n (%)`" align="center" width="100"></el-table-column>
      <el-table-column prop="scontent" :label="`含硫量\n (%)`" align="center" width="140"></el-table-column>
      <el-table-column prop="freezePoint" :label="`凝固点\n (℃)`" align="center" width="100"></el-table-column>
      <el-table-column prop="waxContent" :label="`蜡量\n (%)`" align="center" width="100"></el-table-column>
      <el-table-column prop="bitumen" :label="`沥青质\n (%)`" align="center" width="100"></el-table-column>
      <el-table-column prop="resin" :label="`胶质\n (%)`" align="center" width="100"></el-table-column>
    </el-table>
  </page-panel-new>
</template>

<script>
import { streamingMediaDataCrudeOilViscosity } from "@/api/oilDeposit/rem-01/fielddynamicanalysis";
import { exportExcel } from "@/lib/exportExcel.js";
export default {
  props: {
    oilFieldId: {},
    blockId: {},
  },
  data() {
    return {
      radio: 1,
      src: "../../static/img/blockAnalysisAided/reservoirData/pore.png",
      tableData: [],
    };
  },
  mounted() {
    this.doSearch();
  },
  methods: {
    async doSearch() {
      //置空子组件参数
      this.$emit("childPara", "");
      //获得查询参数
      let request = {
        oilFieldId: this.oilFieldId,
        fieldId: this.blockId,
      };
      //调用接口方法
      await streamingMediaDataCrudeOilViscosity(request).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.oilResults;
        } else {
          this.tableData = [];
        }
      });
    },
    //下载
    doDownLoad() {
      let fileName = "原油粘度";
      if (this.blockName) {
        fileName = this.blockName + fileName;
      }
      exportExcel("#tableData", fileName);
    },
  },
};
</script>

<style scoped lang="scss">
#tableData {
  ::v-deep .el-table__header-wrapper .cell {
    height: auto;
    line-height: 18px;
    padding: 3.5px 10px;
    white-space: pre;
  }
  ::v-deep .cell:empty {
    &::before {
      content: "-";
    }
  }
}
</style>
