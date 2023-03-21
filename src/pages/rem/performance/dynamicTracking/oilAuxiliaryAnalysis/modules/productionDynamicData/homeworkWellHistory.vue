<!--作业井史-->
<template>
  <!-- <NormalCard class="mt-2"> -->
    <el-table
        id="tableData"
        highlight
        :data="tableData"
        style="width: 100%;"
        height="600"
    >
      <el-table-column
          type="index"
          label="序号"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="startTime"
          label="开始时间"
          align="center"
          width="180"
      >
      </el-table-column>
      <el-table-column
          prop="chronicle"
          label="大事简要"
          align="center"
          width="200"
      >
      </el-table-column>
      <el-table-column
          prop="remark"
          label="备注"
          align="center"
      >
      </el-table-column>
    </el-table>
  <!-- </NormalCard> -->
</template>
<script>
// import NormalCard from '@/components/tools/NormalCard';
import {workingHistory} from "@/api/oilDeposit/rem-01/dynamicAnalysis";
// import {exportExcel} from "@/lib/exportExcel";

export default {
  components: {
    // NormalCard,
  },
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
      workingHistory(request).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.workingHistorys;
        }
      })
    },
    /**
     * hwh
     * 下载
     */
    doDownLoad(){
      let fileName = '作业井史';
      if(this.wellName){
        fileName = this.wellName + fileName;
      }
      // exportExcel('#tableData',fileName);
    }
  },
}
</script>
<style scoped lang="scss">
::v-deep .el-table .cell:empty::before{
  content: '-';
}
</style>