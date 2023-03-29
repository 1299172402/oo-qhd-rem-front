<!--岩心化验数据-->
<template>
  <NormalCard class="mt-2">
    <!--<el-row style="margin-top:10px">
        <el-radio-group v-model="radio">
            <el-radio :label="1"><span style="font-size:14px">层位1</span></el-radio>
            <el-radio :label="2"><span style="font-size:14px">层位2</span></el-radio>
            <el-radio :label="3"><span style="font-size:14px">层位3</span></el-radio>
            <el-radio :label="4"><span style="font-size:14px">层位4</span></el-radio>
        </el-radio-group>
    </el-row>-->
    <el-row>
      <el-table id="tableData" highlight :data='tableData' height="600">
        <el-table-column label="序号" align="center" type="index" width="80"></el-table-column>
        <el-table-column label="样本标识" align="center" prop="sampleID"></el-table-column>
        <el-table-column label="实验日期" align="center" prop="testDate"></el-table-column>
        <el-table-column label="报告编号" align="center" prop="reportNO"></el-table-column>
        <el-table-column label="实验方法" align="center" prop="testMethod"></el-table-column>
        <el-table-column :render-header="renderHeader" label="模拟水密度 (g/cm³)" align="center" prop="simulationWaterDensity"></el-table-column>
        <el-table-column :render-header="renderHeader" label="模拟油密度 (g/cm³)" align="center" prop="simulationOilDensity"></el-table-column>
        <el-table-column label="模拟气密度" align="center" prop="simulationGasDensity"></el-table-column>
        <el-table-column :render-header="renderHeader" label="岩心长度 (cm)" align="center" prop="rockCenterLength"></el-table-column>
        <el-table-column :render-header="renderHeader" label="岩心直径 (cm)" align="center" prop="rockCenterDiameter"></el-table-column>
        <el-table-column :render-header="renderHeader" label="渗透率 (μ㎡)" align="center" prop="permeability"></el-table-column>
        <el-table-column :render-header="renderHeader" label="孔隙度 (%)" align="center" prop="porosity"></el-table-column>
        <el-table-column label="饱和度" align="center" prop="saturation"></el-table-column>
        <el-table-column :render-header="renderHeader" label="压力 (MPa)" align="center" prop="pressure"></el-table-column>
        <el-table-column label="驱替方式" align="center" prop="driveReplaceMethod"></el-table-column>
      </el-table>
    </el-row>
  </NormalCard>
</template>

<script>

import {reservoirDataCoreTestData} from "@/api/rem-01/fielddynamicanalysis";
import NormalCard from '@/components/tools/NormalCard';
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
      tableData: [],
    };
  },
  mounted() {
    this.doSearch();
  },
  methods: {
    /**
     * hwh
     * 查询
     * @returns {Promise<void>}
     */
    async doSearch() {
      //置空子组件参数
      this.$emit('childPara', '');
      //获得查询参数
      let request = {
        oilFieldId: this.oilFieldId,
        fieldId: this.blockId,
      }
      //调用接口方法
      await reservoirDataCoreTestData(request).then((res) => {
        if (res.data.code == 0) {
            this.tableData=res.data.data.coreTestDatas;
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
      let fileName = '岩心化验数据';
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