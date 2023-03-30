<!--五敏分析数据-->
<template>
  <div class="mt-2">
    <!--<el-row style="margin-top:10px">
        <el-radio-group v-model="radio">
            <el-radio :label="1"><span style="font-size:14px">层位1</span></el-radio>
            <el-radio :label="2"><span style="font-size:14px">层位2</span></el-radio>
            <el-radio :label="3"><span style="font-size:14px">层位3</span></el-radio>
            <el-radio :label="4"><span style="font-size:14px">层位4</span></el-radio>
        </el-radio-group>
    </el-row>-->
    <el-row>
      <!-- 有空值不确定 -->
      <el-table id="tableData" highlight :data='tableData' height="600">
        <el-table-column label="序号" align="center" type="index" width="80"></el-table-column>
        <el-table-column label="检测项目" align="center" prop="testItemId" width="140"></el-table-column>
        <el-table-column label="样品编号" align="center" prop="" width="140"></el-table-column>
        <el-table-column :render-header="renderHeader" label="孔隙度 (%)" align="center" prop="porosity" width="140"></el-table-column>
        <el-table-column :render-header="renderHeader" label="初始渗透率 (mD)" align="center" prop="" width="140"></el-table-column>
        <el-table-column :render-header="renderHeader" label="空气渗透率 (mD)" align="center" prop="permAir" width="140"></el-table-column>
        <el-table-column :render-header="renderHeader" label="克氏渗透率 (mD)" align="center" prop="" width="140"></el-table-column>
        <el-table-column :render-header="renderHeader" label="流体入口压力 (MPa)"  align="center" prop="inletPress" width="140"></el-table-column>
        <el-table-column :render-header="renderHeader" label="临界矿化度_浓度 (mg/L)" align="center" prop="" width="140"></el-table-column>
        <el-table-column :render-header="renderHeader" label="临界矿化度_比值 (ppm)"  align="center" prop="" width="140"></el-table-column>
        <el-table-column :render-header="renderHeader" label="临界流速 (m³/d)" align="center" prop="criticalFlowVelocity" width="140"></el-table-column>
        <el-table-column :render-header="renderHeader" label="临界流量 (ml/min)" align="center" prop="criticalFlow" width="140"></el-table-column>
        <el-table-column label="临界碱度" align="center" prop="criticalAlkalinity" width="140"></el-table-column>
        <el-table-column label="临界PH值" align="center" prop="criticalPh" width="140"></el-table-column>
        <!--  <el-table-column label="渗透率损害率(%)" width="100px" align="center" prop=""></el-table-column>-->
        <el-table-column :render-header="renderHeader" label="速敏损害率 (%)"  align="center" prop="" width="140"></el-table-column>
        <el-table-column :render-header="renderHeader" label="酸敏损害率 (%)" align="center" prop="acidDamageRate" width="140"></el-table-column>
        <el-table-column :render-header="renderHeader" label="应力敏损害率 (%)" align="center" prop="stressDamageRate" width="140"></el-table-column>
        <el-table-column label="碱液类型" align="center" prop="alkaliType" width="140"></el-table-column>
        <el-table-column label="应力敏指数" align="center" prop="stressIndex" width="140"></el-table-column>
        <el-table-column label="速敏指数" align="center" prop="velocityIndex" width="140"></el-table-column>
        <el-table-column label="碱敏指数" align="center" prop="alkaliIndex" width="140"></el-table-column>
        <el-table-column label="水敏指数" align="center" prop="" width="140"></el-table-column>
        <el-table-column label="盐敏指数" align="center" prop="saltIndex" width="140"></el-table-column>
        <el-table-column label="酸敏指数" align="center" prop="acidIndex" width="140"></el-table-column>
        <el-table-column label="敏感性描述" align="center" prop="sensitivityDesc" width="140"></el-table-column>
        <el-table-column label="备注" align="center" prop="remark" width="200"></el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import {reservoirDataFiveSensitivityAnalysisData} from "@/api/oilDeposit/rem-01/fielddynamicanalysis.js";
import {exportExcel} from "@/lib/exportExcel.js";
export default {
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
      await reservoirDataFiveSensitivityAnalysisData(request).then((res) => {
        if (res.data.code == 0) {
          this.tableData=res.data.data.ascSensitivityMeasures;
        } else{
          this.tableData = [];
        }
      });
    },
    /**
     * hwh
     * 下载
     */
    doDownLoad(){
      let fileName = '五敏分析数据';
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