<!--井斜数据-->
<template>
    <page-panel-new style="height:calc(100% - 101px);margin-top:0;" show-btn>
      <el-table 
        id="tableData"
        :data="tableData" 
        :border="false" 
        :row-style="{ height: '0px' }" 
        header-cell-class-name="table_header" 
        :cell-style="{ padding: '6px', 'text-align': 'center' }" 
        style="width:100%;" 
        height="calc(100% - 101px)" 
        :default-sort="{ prop: 'date', order: 'descending' }" 
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="wellName" label="井号" width="130"></el-table-column>
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
    </page-panel-new>
</template>

<script>
    import {deviationData,} from '@/api/oilDeposit/rem-01/dynamicAnalysis.js';
    import {exportExcel} from "@/lib/exportExcel.js";
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
      },
    }
</script>

<style scoped lang="scss">
    #tableData{
        ::v-deep .el-table__header-wrapper .cell{
            height: auto;
            line-height: 18px;
            white-space: pre;
        }
        ::v-deep .cell:empty{
            &::before {
                content: '-';
            } 
        }
    } 
</style>