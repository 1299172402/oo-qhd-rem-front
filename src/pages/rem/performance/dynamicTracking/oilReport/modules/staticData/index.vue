<!-- 基本信息 -->
<template>
  <div class="app-container">
    <pagePanel headerTitle="单井基本信息">
      <el-table
        id="tableData"
        :data="tableData"
        :border="false"
        :row-style="{ height: '0px' }"
        header-cell-class-name="table_header"
        :cell-style="{ padding: '6px', 'text-align': 'center' }"
        style="width: 100%; padding: 20px 0;height:500px"
        :default-sort="{ prop: 'date', order: 'descending' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
      >
        <el-table-column prop="wellNo" label="井号" align="center"> </el-table-column>
        <el-table-column prop="fieldName" label="区块" align="center"> </el-table-column>
        <el-table-column prop="horizontalLength" :render-header="renderHeader" label="水平段长度 (m)" align="center">
        </el-table-column>

        <el-table-column prop="completeType" label="完井方式" align="center"> </el-table-column>
        <el-table-column prop="boreType" label="管柱类型" align="center"> </el-table-column>
        <el-table-column prop="kb" :render-header="renderHeader" label="补心海拔 (m)" align="center"> </el-table-column>
        <el-table-column prop="baseLevelDepth" :render-header="renderHeader" label="基准面深度 (m)" align="center">
        </el-table-column>
        <el-table-column label="投产时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.productionDate | formatTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pumpTvd" :render-header="renderHeader" label="泵挂垂深 (m)" align="center">
        </el-table-column>
        <el-table-column prop="displacement" :render-header="renderHeader" label="泵排量 (m³)" align="center">
        </el-table-column>
        <el-table-column prop="pumpHead" :render-header="renderHeader" label="泵扬程 (m)" align="center">
        </el-table-column>
      </el-table>
    </pagePanel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oilField: '',
      platforms: [], //平台数据
      pickerOption: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      tableData:[],
      // 油田下拉框
      oilFields: [],
      platforms: [],
      deptSelect: [
        {
          deptId: '715AD1CD60484BB59E737CD18A9DE44A  ',
          deptName: '秦皇岛32-6渤中作业公司',
        },
      ], //作业公司
      noticeList: [], // 表格数据
      datalist: [], //下方表格数据
      // 显示搜索条件
      queryData: {
        assetCode: '',
        month: '',
        ogfId: '3FC9A818F5BC43B88270DB80BBB3018F',
        orgId: '715AD1CD60484BB59E737CD18A9DE44A  ',
      },
    };
  },
  created() {
  },
  methods: {
    passValue(val){
      console.log(val)
    },
    renderHeader(h, { column }) {
      let header = column.label.split(' ');
      return [h('p', [h('p', {}, header[0]), h('span', {}, header[1])])];
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
</style>
