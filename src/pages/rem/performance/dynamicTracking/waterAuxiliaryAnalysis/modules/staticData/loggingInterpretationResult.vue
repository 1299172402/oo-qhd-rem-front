<!--测井解释成果-->
<template>
  <page-panel-new style="height: calc(100% - 101px); margin-top: 0" show-btn>
    <el-table id="tableData" highlight :data="tableData" border="" style="width: 100%" height="100%">
      <el-table-column type="index" label="序号" align="center" width="80" fixed></el-table-column>
      <el-table-column prop="wellName" label="井号" align="center" width="160" fixed></el-table-column>
      <el-table-column prop="layerName" label="层号" align="center" min-width="200" fixed></el-table-column>
      <el-table-column
        prop="topMd"
        :render-header="renderHeader"
        :label="`顶界斜深\n(m)`"
        align="center"
        min-width="100"
      ></el-table-column>
      <el-table-column
        prop="bottomMd"
        :render-header="renderHeader"
        :label="`底界斜深\n(m)`"
        align="center"
        min-width="100"
      ></el-table-column>
      <el-table-column prop="mthickness" :label="`斜厚\n(m)`" align="center" min-width="100"></el-table-column>
      <el-table-column
        prop="topTvd"
        :render-header="renderHeader"
        :label="`顶界垂深\n(m)`"
        align="center"
        min-width="100"
      ></el-table-column>
      <el-table-column
        prop="bottomTvd"
        :render-header="renderHeader"
        :label="`底界垂深\n(m)`"
        align="center"
        min-width="100"
      ></el-table-column>
      <el-table-column
        prop="tthickness"
        :render-header="renderHeader"
        :label="`垂厚\n(m)`"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="resistivity"
        :render-header="renderHeader"
        :label="`地层电阻\n(Ω·m)`"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="effePorosity"
        :render-header="renderHeader"
        :label="`孔隙度\n(%)`"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="effePermeability"
        :render-header="renderHeader"
        :label="`空气渗透率\n(%)`"
        align="center"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="oilSaturation"
        :render-header="renderHeader"
        :label="`含油饱和度\n(%)`"
        align="center"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="shaleContent"
        :render-header="renderHeader"
        :label="`泥质含量\n(%)`"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="topKb"
        :render-header="renderHeader"
        :label="`海拔顶深\n(m)`"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="bottomKb"
        :render-header="renderHeader"
        :label="`海拔低深\n(m)`"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="usefulThickness"
        :render-header="renderHeader"
        :label="`有效厚度\n(m)`"
        align="center"
      ></el-table-column>
      <el-table-column prop="interpConclusion" label="解释结论" align="center"></el-table-column>
      <el-table-column prop="remark" label="备注" align="center" min-width="200"></el-table-column>
    </el-table>
  </page-panel-new>
</template>
<script>
import { loggingInterpretation } from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
import { exportExcel } from "@/lib/exportExcel.js";
export default {
  props: {
    //选择油田
    oilFeildId: {},
    //选择平台
    platform: {},
    //选择井号
    wellId: {},
  },
  data() {
    return {
      tableData: [],
    };
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
      loggingInterpretation(request).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.loggingInterceptResult;
        }
      });
    },
    //下载
    doDownLoad() {
      let fileName = "测井解释成果";
      if (this.wellName) {
        fileName = this.wellName + fileName;
      }
      exportExcel("#tableData", fileName);
    },
    renderHeader(h, { column }) {
      let header = column.label.split(" ");
      return [h("p", [h("p", {}, header[0]), h("span", {}, header[1])])];
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-table .cell:empty::before {
  content: "-";
}
::v-deep .el-table__fixed-header-wrapper,
::v-deep .el-table__header-wrapper {
  .cell {
    height: auto !important;
    line-height: 18px !important;
    white-space: pre;
  }
}
</style>
