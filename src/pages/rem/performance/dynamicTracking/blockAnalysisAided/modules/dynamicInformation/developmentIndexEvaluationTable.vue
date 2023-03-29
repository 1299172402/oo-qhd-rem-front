<!--开发现状表-->
<template>
  <div style="height:100%">
    <el-row style="height:100%">
      <NormalCard style="height:100%" title="开发现状">
          <el-table id="tableData" highlight :data="tableData">
            <el-table-column prop="indicator" label="指标" align="center"></el-table-column>
            <el-table-column prop="evaluationResult" label="评价结果" align="center"></el-table-column>
            <el-table-column prop="conclusion" label="结论" align="center"></el-table-column>
          </el-table>
      </NormalCard>
    </el-row>
  </div>
</template>

<script>
import NormalCard from "@/components/tools/NormalCard";
import {dynamicDataDevelopmentIndexTable} from "@/api/rem-01/fielddynamicanalysis";
import {exportExcel} from "@/lib/exportExcel";

export default {
  components: {
    NormalCard
  },
  props: {
    oilFieldId: {},
    blockId: {},
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
        fieldId: this.blockId,
      }
      //调用接口方法
      await dynamicDataDevelopmentIndexTable(request).then((res) => {
        if (res.data.code == 0) {
          this.tableData = res.data.data.dynamicDataDevelopments;
        }
      });
    },
    /**
     * hwh
     * 下载
     */
    doDownLoad(){
      let fileName = '开发指标评价表';
      if(this.blockName){
        fileName = this.blockName + fileName;
      }
      exportExcel('#tableData',fileName);
    }
  }

}
</script>
<style scoped lang="scss">
::v-deep .el-table .cell:empty::before{
  content: '-';
}
</style>