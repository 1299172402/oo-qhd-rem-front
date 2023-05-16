<template>
    <info-window
        info-width="100%"
        info-height="100%"
        header-title="超欠注情况统计"
        :is-show-max-btn="true"
    >
        <button class="detailLinkBtn" @click="linkroute('measuresPumpWellRecovery')">详细</button>
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
            <el-table-column prop="well" label="">
                <template slot="header">
                    <div style="color: #1ec5e6">井号</div>
                </template>
            </el-table-column>
            <el-table-column prop="date" width="100px" label="">
                <template slot="header">
                    <div style="color: #1ec5e6">层位</div>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="">
                <template slot="header">
                    <div style="color: #1ec5e6">注水工况</div>
                </template>
            </el-table-column>
            <el-table-column prop="addoil" label="">
                <template slot="header">
                    <div style="color: #1ec5e6">
                        超/欠注量 <br />
                        (m³/d)
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </info-window>
    
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "Nml-3",
          well: "QHD32-6-A01",
          address: "欠注",
          addoil: "82",
        },
        {
         date: "Nml-3",
          well: "QHD32-6-A02",
          address: "欠注",
          addoil: "87",
        },
        {
          date: "Nml-3",
          well: "QHD32-6-A03",
         address: "欠注",
          addoil: "28",
        },
        {
         date: "Nml-2",
          well: "QHD32-6-A01",
         address: "超注",
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

.detailLinkBtn {
    position: absolute;
    right: 50px;
    top: 10px;
    width: 50px;
    height: 20px;
    background: linear-gradient(90deg, #0751b0, #50a6ec);
    text-align: center;
    font-size: smaller;
    border: 0;
    cursor: pointer;
    color: #ffffff;
}
</style>
