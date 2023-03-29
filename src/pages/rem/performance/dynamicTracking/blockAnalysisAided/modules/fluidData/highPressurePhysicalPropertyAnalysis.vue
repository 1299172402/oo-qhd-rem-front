<!--高压物性分析-->
<template>
  <NormalCard class="mt-2">
    <el-row style="margin-top:10px">
      <el-table id="tableData" highlight :data='tableData' height="600">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column label="油气藏标识" align="center" width="140" prop="reservoirId"></el-table-column>
        <el-table-column :render-header="renderHeader" label="高点埋藏深度 (m)" width="140" align="center" prop="crestDepth"></el-table-column>
        <el-table-column :render-header="renderHeader" label="含油气高度 (m)" align="center" prop="oilGasColumnHeight" width="140"></el-table-column>
        <el-table-column :render-header="renderHeader" label="油气藏中部海拔 (m)" width="140" align="center" prop="reservoirMidElevation"></el-table-column>
        <el-table-column :render-header="renderHeader" label="原始地层压力 (MPa)" width="140" align="center" prop="initialFmp"></el-table-column>
        <el-table-column label="原始地层压力系数" width="140" align="center" prop="initialFmpFactor"></el-table-column>
        <el-table-column :render-header="renderHeader" label="原始饱和压力 (MPa)" width="140" align="center" prop="originSaturationPress"></el-table-column>
        <el-table-column :render-header="renderHeader" label="地饱压差 (MPa)" width="140" align="center" prop="reservoirsPressure"></el-table-column>
        <el-table-column :render-header="renderHeader" label="原始地层温度 (℃)" width="140" align="center" prop="initialFormaTemp"></el-table-column>
        <el-table-column :render-header="renderHeader" label="原始地层温度梯度 (℃/100m)" width="140" align="center" prop="originGeothermalGradient"></el-table-column>
        <el-table-column label="地层体积系数" width="140" align="center" prop="bulkCoefficent"></el-table-column>
        <el-table-column label="溶解气油比" width="140" align="center" prop="solutionGOR"></el-table-column>
        <el-table-column label="地层油平均溶解气体系数" width="165" align="center" prop="oilAvgSolutionGasCoefficent"></el-table-column>
        <!--<el-table-column label="地层油体积收缩率"  width="120px"  align="center" prop=""></el-table-column>-->
        <el-table-column :render-header="renderHeader" label="地层油密度 (g/cm³)" width="140" align="center" prop="oilDensity"></el-table-column>
        <el-table-column :render-header="renderHeader" label="地层油粘度 (mPa·s)" width="140" align="center" prop="oilViscosity"></el-table-column>
        <el-table-column :render-header="renderHeader" label="饱和压力 (MPa)" width="140" align="center" prop="saturationPressure"></el-table-column>
        <el-table-column :render-header="renderHeader" label="饱和压力下原油粘度 (mPa·s)" width="160"  align="center" prop="oilViscosityAt"></el-table-column>
        <el-table-column :render-header="renderHeader" label="饱和压力下原油密度 (g/cm³)" width="160" align="center" prop="oilViscosity"></el-table-column>
        <el-table-column :render-header="renderHeader" label="脱气原油密度 (g/cm³)" width="140" align="center" prop="deadOilDensity"></el-table-column>
        <!--<el-table-column label="热膨胀" align="center" prop=""></el-table-column>-->
        <el-table-column :render-header="renderHeader" label="死油密度 (g/cm³)" width="140" align="center" prop="degassedOilDensity"></el-table-column>
        <el-table-column label="死油分子量" align="center" width="140" prop="deadOilMolecularWeight"></el-table-column>
        <el-table-column label="备注" align="center" width="200" prop="remark"></el-table-column>
      </el-table>
    </el-row>
  </NormalCard>
</template>

<script>
import {streamingMediaDataHighPressurePhysicalPropertyAnalysis} from "@/api/rem-01/fielddynamicanalysis";
import NormalCard from "@/components/tools/NormalCard";
import {exportExcel} from "@/lib/exportExcel";
export default {
  components: {
    NormalCard,
  },
  props: {
    oilFieldId: {},
    blockId: {},
  },
  data() {
    return {
      radio: 1,
      src: '../../static/img/blockAnalysisAided/reservoirData/pore.png',
      tableData: []
    };
  },
  mounted() {
    this.doSearch();
  },
  methods: {
    async doSearch(){
      //置空子组件参数
      this.$emit('childPara', '');
      //获得查询参数
      let request = {
        oilFieldId: this.oilFieldId,
        fieldId: this.blockId,
      }
      //调用接口方法
      await streamingMediaDataHighPressurePhysicalPropertyAnalysis(request).then((res) => {
        if (res.data.code == 0) {
          this.tableData=res.data.data.pvtAnalysises;
        } else{
          this.tableData=[];
        }
      });
    },
    /**
     * hwh
     * 下载
     */
    doDownLoad(){
      let fileName = '高压物性分析';
      if(this.blockName){
        fileName = this.blockName + fileName;
      }
      exportExcel('#tableData',fileName);
    },
    /**
     * hwh el table 表格头 标题单位样式
     * @param h
     * @param column
     * @returns {*[]}
     */
    renderHeader (h, {column}) {
      let header = column.label.split(' ');
      return [h('p', [
        h('p', {}, header[0]),
        h('span', {}, header[1])
      ])];
    }
  }
}
</script>
<style scoped lang="scss">
::v-deep .el-table .cell:empty::before{
  content: '-';
}
</style>