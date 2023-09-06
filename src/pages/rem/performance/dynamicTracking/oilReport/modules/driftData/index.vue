<!--井斜数据-->
<template>
<pagePanel headerTitle="井斜数据" style="height: 600px;" show-btn>
    <el-table
        id="tableData"
        :data="tableData" :border="false" :row-style="{ height: '0px' }"
        header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }"
        style="width:100%;" height="100%" :default-sort="{ prop: 'date', order: 'descending' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="wellName" label="井号"></el-table-column>
        <el-table-column prop="measureDepth" :label="`测点斜深\n (m)`"></el-table-column>
        <el-table-column prop="measureVerticalDepth" :label="`测点垂深\n (m)`"></el-table-column>
        <el-table-column prop="deviationAngle" :label="`井斜角\n (°)`"></el-table-column>
        <el-table-column prop="azinuthAngle" :label="`方位角\n (°)`"></el-table-column>
        <el-table-column prop="displacement" :label="`位移\n (m)`"></el-table-column>
        <el-table-column prop="closureAzimuth" :label="`闭合方位\n (°)`"></el-table-column>
        <el-table-column prop="closureDistance" :label="`闭合距\n (m)`"></el-table-column>
        <el-table-column prop="NSIncrement" :label="`坐标北南增量\n (m)`"></el-table-column>
        <el-table-column prop="EWIncrement" :label="`坐标东西增量\n (m)`"></el-table-column>
        <el-table-column prop="curvature" :label="`狗腿度\n(°/30m)`"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
    </el-table>
</pagePanel>
</template>
<script>
import {deviationData,} from '@/api/oilDeposit/rem-01/dynamicAnalysis.js';
import {exportExcel} from "@/lib/exportExcel.js";

export default {
  data() {
    return {
      tableData: [],
       oilFeildId: "3FC9A818F5BC43B88270DB80BBB3018F",
      //选择平台
      platform: "3F1E5858C6CC41E2BF4FFC4902797C08",
      //选择井号
      wellId: "09D30C16BD1D4F759D53F74941701307",
    }
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
    //根据父组件传递过来的参数进行查询
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
    //下载
    doDownLoad(){
      let fileName = '井斜数据';
      if(this.wellName){
        fileName = this.wellName + fileName;
      }
      exportExcel('#tableData',fileName);
    },
     renderHeader(h, { column }) {
      let header = column.label.split(" ");
      return [h("p", [h("p", {}, header[0]), h("span", {}, header[1])])];
    },
  },
}
</script>
<style scoped lang="scss">
    #tableData{
        ::v-deep .cell:empty{
            &::before {
                content: '-';
            } 
        }
    } 
</style>