<template>
  <el-table
    :data="tableData"
    highlight-current-row
    height="100%"
    id="tableData"
    :row-style="{ height: '0px' }"
    :header-cell-style="{ 'text-align': 'center', padding: '0px', color: '' }"
    header-cell-class-name="table_header"
    :cell-style="{ 'text-align': 'center', padding: '0px' }"
    :default-sort="{ prop: 'date', order: 'descending' }"
    style="width: 100%"
  >
    <el-table-column width="50px">
      <template slot="header">
        <div style="color: #1ec5e6">序号</div>
      </template>
      <template slot-scope="scope">
        {{ scope.$index + 1 }}
      </template>
    </el-table-column>
    <el-table-column prop="date" width="100px" label="">
      <template slot="header">
        <div style="color: #1ec5e6">推荐日期</div>
      </template>
    </el-table-column>
    <el-table-column prop="well" label="">
      <template slot="header">
        <div style="color: #1ec5e6">井号</div>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="">
      <template slot="header">
        <div style="color: #1ec5e6">推荐措施</div>
      </template>
    </el-table-column>
    <el-table-column prop="addoil" label="">
      <template slot="header">
        <div style="color: #1ec5e6">
          预计增油量 <br />
          (m³/d)
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2023-03-23",
          well: "QHD32-6-A01",
          address: "换大泵",
          addoil: "82",
        },
        {
          date: "2023-03-22",
          well: "QHD32-6-A02",
          address: "换大泵",
          addoil: "87",
        },
        {
          date: "2023-03-21",
          well: "QHD32-6-A03",
         address: "地面调参",
          addoil: "28",
        },
        {
          date: "2023-03-24",
          well: "QHD32-6-A01",
          address: "换大泵",
          addoil: "42",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
#tableData {
  ::v-deep .el-table__header-wrapper .cell {
    height: auto;
    line-height: 18px;
    white-space: pre;
  }
  ::v-deep .cell:empty {
    &::before {
      content: "-";
    }
  }
}
</style>
