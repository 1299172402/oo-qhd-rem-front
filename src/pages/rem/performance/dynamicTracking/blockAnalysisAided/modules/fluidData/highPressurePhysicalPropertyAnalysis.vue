<!--高压物性分析-->
<template>
  <page-panel-new style="height: calc(100% - 101px); margin-top: 0" show-btn>
    <el-table
      id="tableData"
      :data="tableData"
      border
      :row-style="{ height: '0px' }"
      header-cell-class-name="table_header"
      :cell-style="{ padding: '6px', 'text-align': 'center' }"
      style="width: 100%"
      height="100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
      :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
    >
      <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
      <el-table-column label="油气藏标识" align="center" width="140" prop="reservoirId"></el-table-column>
      <el-table-column :label="`高点埋藏深度\n (m)`" width="140" align="center" prop="crestDepth"></el-table-column>
      <el-table-column
        :label="`含油气高度\n (m)`"
        align="center"
        prop="oilGasColumnHeight"
        width="140"
      ></el-table-column>
      <el-table-column
        :label="`油气藏中部海拔\n (m)`"
        width="140"
        align="center"
        prop="reservoirMidElevation"
      ></el-table-column>
      <el-table-column :label="`原始地层压力\n (MPa)`" width="140" align="center" prop="initialFmp"></el-table-column>
      <el-table-column label="原始地层压力系数" width="140" align="center" prop="initialFmpFactor"></el-table-column>
      <el-table-column
        :label="`原始饱和压力\n (MPa)`"
        width="140"
        align="center"
        prop="originSaturationPress"
      ></el-table-column>
      <el-table-column
        :label="`地饱压差\n (MPa)`"
        width="140"
        align="center"
        prop="reservoirsPressure"
      ></el-table-column>
      <el-table-column
        :label="`原始地层温度\n (℃)`"
        width="140"
        align="center"
        prop="initialFormaTemp"
      ></el-table-column>
      <el-table-column
        :label="`原始地层温度梯度\n (℃/100m)`"
        width="140"
        align="center"
        prop="originGeothermalGradient"
      ></el-table-column>
      <el-table-column label="地层体积系数" width="140" align="center" prop="bulkCoefficent"></el-table-column>
      <el-table-column :label="`溶解气油比\n(m³/m³)`" width="140" align="center" prop="solutionGOR"></el-table-column>
      <el-table-column
        label="地层油平均溶解气体系数"
        width="180"
        align="center"
        prop="oilAvgSolutionGasCoefficent"
      ></el-table-column>
      <!--<el-table-column label="地层油体积收缩率"  width="120px"  align="center" prop=""></el-table-column>-->
      <el-table-column :label="`地层油密度\n (g/cm³)`" width="140" align="center" prop="oilDensity"></el-table-column>
      <el-table-column :label="`地层油粘度\n (mPa·s)`" width="140" align="center" prop="oilViscosity"></el-table-column>
      <el-table-column
        :label="`饱和压力\n (MPa)`"
        width="140"
        align="center"
        prop="saturationPressure"
      ></el-table-column>
      <el-table-column
        :label="`饱和压力下原油粘度\n (mPa·s)`"
        width="160"
        align="center"
        prop="oilViscosityAt"
      ></el-table-column>
      <el-table-column
        :label="`饱和压力下原油密度\n (g/cm³)`"
        width="160"
        align="center"
        prop="oilViscosity"
      ></el-table-column>
      <el-table-column
        :label="`脱气原油密度\n (g/cm³)`"
        width="140"
        align="center"
        prop="deadOilDensity"
      ></el-table-column>
      <!--<el-table-column label="热膨胀" align="center" prop=""></el-table-column>-->
      <el-table-column
        :label="`死油密度\n (g/cm³)`"
        width="140"
        align="center"
        prop="degassedOilDensity"
      ></el-table-column>
      <el-table-column label="死油分子量" align="center" width="140" prop="deadOilMolecularWeight"></el-table-column>
      <el-table-column label="备注" align="center" width="200" prop="remark"></el-table-column>
    </el-table>
  </page-panel-new>
</template>

<script>
import { streamingMediaDataHighPressurePhysicalPropertyAnalysis } from "@/api/oilDeposit/rem-01/fielddynamicanalysis.js";
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
      await streamingMediaDataHighPressurePhysicalPropertyAnalysis(request).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.pvtAnalysises;
        } else {
          this.tableData = [];
        }
      });
    },
    //下载
    doDownLoad() {
      let fileName = "高压物性分析";
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
