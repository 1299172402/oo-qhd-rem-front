<!-- 油井分析报告 -->
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <staticData ref="toolchild0"></staticData>
    </el-row>
    <el-row :gutter="20">
      <homeworkWellHistory ref="toolchild1"></homeworkWellHistory>
    </el-row>
    <el-row :gutter="20">
      <productionData ref="toolchild2"></productionData>
      <!-- 生产指标 -->
    </el-row>
    <el-row :gutter="20">
      <pressureTest ref="toolchild3"></pressureTest>
      <!-- 压力数据 -->
    </el-row>
    <el-row :gutter="20">
      <waterInjection ref="toolchild4"></waterInjection>
      <!-- 注采对应曲线 -->
    </el-row>
<!--    <el-row :gutter="20">-->
<!--      <fundamentalData ref="toolchild5"></fundamentalData>-->
<!--    </el-row>-->
    <el-row :gutter="20">
      <driftData ref="toolchild5"></driftData>
    </el-row>
    <el-row :gutter="20">
      <perforationData ref="toolchild6"></perforationData>
    </el-row>
    <el-row :gutter="20">
      <loggingInterpretationResult ref="toolchild7"></loggingInterpretationResult
      ><!-- 测井 -->
    </el-row>
    <el-row :gutter="20">
      <wellPattern ref="toolchild8"></wellPattern>
    </el-row>
  </div>
</template>

<script>
const moduleFiles = import.meta.globEager(`./modules/*/index.vue`);
const moduleName = Object.entries(moduleFiles).reduce(
  (t, i) =>
    Object.assign(t, {
      [i[0].replace(/\.\/modules\/(\S+)\/index.vue/, "$1")]: i[1].default,
    }),
  {},
);
export default {
  props: {
    //选择油田
    oilFeildId: {},
    //选择平台
    platform: {},
    //选择井号
    wellId: {},
  },
  components: {
    ...moduleName,
  },
  data() {
    return {
      oilField: "",
      platforms: [], //平台数据
      wellData: [],
      pickerOption: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      // 油田下拉框
      oilFields: [],
      deptSelect: [
        {
          deptId: "715AD1CD60484BB59E737CD18A9DE44A  ",
          deptName: "秦皇岛32-6渤中作业公司",
        },
      ], //作业公司
      noticeList: [], // 表格数据
      datalist: [], //下方表格数据
      // 显示搜索条件
      queryData: {
        assetCode: "",
        ogfId: "",
        orgId: "",
        selectWellId: "",
      },
    };
  },
  mounted() {
    this.getinfo()
  },
  methods: {
    getinfo() {
      (this.queryData.ogfId = this.oilFeildId),
        (this.queryData.assetCode = this.platform),
        (this.queryData.selectWellId = this.wellId);
      for (let i = 0, j = 8; i <= j; i++) {
        const child = this.$refs[`toolchild${i}`];
        child.passValue(this.queryData);
      }
    },
    queryInfo(val) {
      this.queryData = val;
      for (let i = 0, j = 8; i <= j; i++) {
        const child = this.$refs[`toolchild${i}`];
        child.passValue(this.queryData);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.app-container {
  height: 100%;

  .el-table {
    overflow: scroll;
  }
}

::v-deep .el-table__header-wrapper {
  .cell {
    height: auto !important;
  }
}

.pertable thead .el-table-column--selection .cell {
  display: none;
}
::v-deep .el-table__body-wrapper {
  height: calc(100% - 70px) !important;
}
</style>
