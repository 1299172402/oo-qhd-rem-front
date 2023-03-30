<!--开发现状表-->
<template>
  <div class="gradientBoxLeft" style="height:100%">
    <el-row style="height:100%">
      <div style="height:100%" title="开发现状">
          <el-table id="tableData1" :data="tableData" :header-cell-style="{background:'transparent',color:'#fff'}" highlight height="calc(100% - 40px)" >
            <el-table-column prop="date" label="时间" align="center" show-overflow-tooltip min-width="200" fixed="left">
              <template slot-scope="scope">
                {{scope.row.date | dateFormat }}
              </template>
            </el-table-column>
            <el-table-column prop="ogfName" label="区块" align="center" show-overflow-tooltip min-width="180" fixed="left"></el-table-column>
            <el-table-column label="油井（口）" align="center">
              <el-table-column prop="proWellCount" label="总井" align="center" show-overflow-tooltip min-width="120"></el-table-column>
              <el-table-column prop="proWellOpen" label="开井" align="center" show-overflow-tooltip min-width="120"></el-table-column>
            </el-table-column>
            <el-table-column label="月均日产水平（m³/d）" align="center">
              <el-table-column prop="liquidDailySum" label="液量" align="center" show-overflow-tooltip min-width="120"></el-table-column>
              <el-table-column prop="oilDailySum" label="油量" align="center" show-overflow-tooltip min-width="120"></el-table-column>
            </el-table-column>
            <el-table-column label="平均单井日产（m³/d）" align="center">
              <el-table-column prop="liquidDailyAvg" label="液量" align="center" show-overflow-tooltip min-width="120"></el-table-column>
              <el-table-column prop="oilDailyAvg" label="油量" align="center" show-overflow-tooltip min-width="120"></el-table-column>
            </el-table-column>
            <el-table-column label="注水井（口）" align="center">
              <el-table-column prop="injectionWellCount" label="总井" align="center"
                               show-overflow-tooltip min-width="120"></el-table-column>
              <el-table-column prop="injectionWellOpen" label="开井" align="center"
                               show-overflow-tooltip min-width="120"></el-table-column>
            </el-table-column>
            <el-table-column label="日注水（m³/d）" align="center">
              <el-table-column prop="injectionDailySum" label="合计" align="center"
                               show-overflow-tooltip min-width="120"></el-table-column>
              <el-table-column prop="injectionDailyAvg" label="平均单井" align="center"
                               show-overflow-tooltip min-width="120"></el-table-column>
            </el-table-column>
            <el-table-column prop="compressiveWaterCut" label="综合含水(%)" align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="cumOilProdYearly" label="截止当月年产油（m³）" align="center" min-width="140"
                             show-overflow-tooltip></el-table-column>
            <el-table-column label="注采比" align="center">
              <el-table-column prop="injectionProduceRateMonth" label="月" align="center"
                               show-overflow-tooltip min-width="120"></el-table-column>
              <el-table-column prop="injectionProduceRateSum" label="累计" align="center"
                               show-overflow-tooltip min-width="120"></el-table-column>
            </el-table-column>
            <el-table-column label="采油速度（%）" align="center">
              <el-table-column prop="reservoirsProduceSpeed" label="地质储量" align="center"
                               show-overflow-tooltip min-width="120"></el-table-column>
              <el-table-column prop="reservoirsProduceSpeedAvaliable" label="可采储量" align="center"
                               show-overflow-tooltip min-width="120"></el-table-column>
            </el-table-column>
            <el-table-column label="累计产量（×10⁴m³）" align="center">
              <el-table-column prop="oilSum" label="油量" align="center" show-overflow-tooltip min-width="120"></el-table-column>
              <el-table-column prop="waterSum" label="水量" align="center" show-overflow-tooltip min-width="120"></el-table-column>
            </el-table-column>
            <el-table-column label="采出程度（%）" align="center">
              <el-table-column prop="reservoirsProduceDegree" label="地质储量" align="center"
                               show-overflow-tooltip min-width="120"></el-table-column>
              <el-table-column prop="reservoirsProduceDegreeAvaliable" label="可采储量" align="center"
                               show-overflow-tooltip min-width="120"></el-table-column>
            </el-table-column>
            <el-table-column label="递减率（%）" align="center">
              <el-table-column prop="natureDeclineRate" label="自然递减率" align="center"
                               show-overflow-tooltip min-width="120"></el-table-column>
              <el-table-column prop="compressveDeclineRate" label="综合递减率" align="center"
                               show-overflow-tooltip min-width="120"></el-table-column>
            </el-table-column>
            <el-table-column prop="waterContainRaiseRate" label="含水上升率" align="center"
                             show-overflow-tooltip min-width="120"></el-table-column>
            <el-table-column prop="waterOilRateSum" label="累计水油比" align="center"
                             show-overflow-tooltip min-width="120"></el-table-column>
          </el-table>
      </NormalCard>
    </el-row>
  </div>
</template>

<script>
import {dynamicDataDevelopmentStatusTable} from "@/api/oilDeposit/rem-01/fielddynamicanalysis.js";
import {exportExcel} from "@/lib/exportExcel.js";

export default {
  props: {
    oilFieldId: {},
    blockId: {},
  },
  filters: {
    numberToTwo(val){
      if(val){
        return parseFloat(Number(val).toFixed(2));
      } else{
        return '-';
      }
    },
    dateFormat(val){
      if(val){
        return new Date(val).format('yyyy-MM');
      }else{
        return val;
      }
    }
  },
  data() {
    return {
      radio: 1,
      tableData: [],
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
        /*fieldId: this.blockId,*/
      }
      this.tableData = [];
      //调用接口方法
      await dynamicDataDevelopmentStatusTable(request).then((res) => {
        if (res.data.code == 0) {
          this.tableData= res.data.data.developStatus;
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
      let fileName1 = '开发现状';
      exportExcel('#tableData1',fileName1);
    }
  }

}
</script>
<style scoped lang="scss">
::v-deep .el-table .cell:empty::before{
  content: '-';
}
</style>