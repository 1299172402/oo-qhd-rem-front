<!--射孔数据-->
<template>
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
          prop="wellNo"
          label="井号"
          align="center"
          min-width="140"
      >
      </el-table-column>

      <!--<el-table-column
          prop="layerName"
          label="层位"
          align="center"
      >
      </el-table-column>-->
      <el-table-column
          prop="perfLayer"
          label="小层"
          align="center"
      >
      </el-table-column>

      <el-table-column
          prop="topDepth"
          :render-header="renderHeader"
          label="井段顶斜深 (m)"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="bottomDepth"
          :render-header="renderHeader"
          label="井段底斜深 (m)"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="accumulated"
          label="斜厚"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="topTvd"
          :render-header="renderHeader"
          label="井段顶垂深 (m)"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="bottomTvd"
          :render-header="renderHeader"
          label="井段底垂深 (m)"
          align="center"
      >
      </el-table-column>
      <el-table-column
          :render-header="renderHeader"
          prop="verticalEffectThickness"
          label="垂厚 (m)"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="sandTopDepth"
          align="center"
          :render-header="renderHeader"
          label="防砂段顶斜深 (m)">
      </el-table-column>
      <el-table-column
          prop="sandBottomDepth"
          align="center"
          :render-header="renderHeader"
          label="防砂段底斜深 (m)">
      </el-table-column>
      <el-table-column
          prop="layerName"
          label="生产段名称"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="accumulated"
          :render-header="renderHeader"
          label="射开有效斜厚 (m)"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="openThickness"
          :render-header="renderHeader"
          label="射开有效垂厚 (m)"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="remark"
          label="备注">
      </el-table-column>
    </el-table>
</template>
<script>
import {getComPerfInterval} from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
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
      getComPerfInterval(request).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.comPerfInterval;
        }
      })
    },
    /**
     * hwh
     * 下载
     */
    doDownLoad(){
      let fileName = '射孔数据';
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