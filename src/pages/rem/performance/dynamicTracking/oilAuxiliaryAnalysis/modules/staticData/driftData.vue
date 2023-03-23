<!--井斜数据-->
<template>
    <el-table 
        :data="tableData" :border="false" :row-style="{ height: '0px' }"
        header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }"
        style="width:100%; padding: 20px 0" height="calc(100% - 86px)" :default-sort="{ prop: 'date', order: 'descending' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }">
      <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
      <el-table-column prop="wellName" label="井标识" width="180" align="center"></el-table-column>
      <el-table-column prop="measureDepth" :render-header="renderHeader" label="测点斜深 (m)" align="center"></el-table-column>
      <el-table-column prop="measureVerticalDepth" :render-header="renderHeader" label="测点垂深 (m)" align="center"></el-table-column>
      <el-table-column prop="deviationAngle" :render-header="renderHeader" label="井斜角 (°)" align="center"></el-table-column>
      <el-table-column prop="azinuthAngle" :render-header="renderHeader" label="方位角 (°)" align="center"></el-table-column>
      <el-table-column prop="displacement" :render-header="renderHeader" label="位移 (m)" align="center"> </el-table-column>
      <el-table-column prop="closureAzimuth" :render-header="renderHeader" label="闭合方位 (°)" align="center"></el-table-column>
      <el-table-column prop="closureDistance" :render-header="renderHeader" label="闭合距 (m)" align="center"></el-table-column>
      <el-table-column prop="NSIncrement" label="坐标北南增量" align="center"></el-table-column>
      <el-table-column prop="EWIncrement" label="坐标东西增量" align="center"></el-table-column>
      <el-table-column prop="curvature" :render-header="renderHeader" label="狗腿度（曲度） (°/30m)" width="180" align="center"></el-table-column>
      <el-table-column prop="remark" label="备注" min-width="180" align="center"></el-table-column>
    </el-table>
</template>
<script>
import {deviationData,} from '@/api/oilDeposit/rem-01/dynamicAnalysis.js';
// import {exportExcel} from "@/lib/exportExcel";

export default {
  props: {
    //选择油田
    oilFeildId: {},
    //选择平台
    platform: {},
    //选择井号
    wellId: {}
  },
  data() {
    return {
      tableData: [],
    }
  },
  mounted() {
    //初始化调用搜索
    this.doSearch();
  },
  methods: {
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
      deviationData(request).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.wellDeviation;
        }
      })
    },
    /**
     * hwh
     * 下载
     */
    doDownLoad(){
      let fileName = '井斜数据';
      if(this.wellName){
        fileName = this.wellName + fileName;
      }
      // exportExcel('#tableData',fileName);
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
  },
}
</script>
<style scoped lang="scss">
::v-deep .el-table .cell:empty::before{
  content: '-';
}
</style>