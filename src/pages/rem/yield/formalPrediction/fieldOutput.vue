<!-- 基础数据维护 - 密度维护表 -->
<template>
  <div class="app-container">
    <headerSearch class="g-w100 g-h100" style="height: auto">
      <el-form :inline="true" style="margin-top: 18px">
        <el-form-item label="滚动预测：" prop="deptId">
          <el-date-picker value-format="yyyy-MM" v-model="queryData.month" type="month" placeholder="选择月">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="日期：" prop="noticeContent">
          <el-date-picker value-format="yyyy-MM" v-model="queryData.month" type="month" placeholder="选择月">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="产量单位选择：" prop="createBy">
          <el-select clearable size="small" style="width: 240px">
            <el-option
              v-for="(item, index) in deptSelect"
              :key="index"
              :label="item.name"
              :value="item.fieldId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </headerSearch>
    <pagePanel headerTitle="油田产量影响因素" style="height: 300px">
      <el-table
        :data="noticeList"
        highlight-current-row
        height="100%"
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px' }"
        header-cell-class-name="table_header"
        :cell-style="{ 'text-align': 'center', padding: '2px' }"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <!-- <el-table-column type="selection" width="55" align="center" /> -->
        <el-table-column label="油田" prop="name" align="center"> </el-table-column>
        <el-table-column label="日产量（m³）" prop="name" align="center"> </el-table-column>
        <el-table-column label="修正日产量（m³）" prop="name" align="center"> </el-table-column>
        <el-table-column label="年递减率（%）" prop="name" align="center"> </el-table-column>
        <el-table-column label="生产时率（%）" prop="name" align="center"> </el-table-column>
      </el-table>
    </pagePanel>
    <pagePanel headerTitle="油田预测产量" style="height: 150px">
      <el-table
        :data="noticeList"
        highlight-current-row
        height="100%"
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px' }"
        header-cell-class-name="table_header"
        :cell-style="{ 'text-align': 'center', padding: '2px' }"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <!-- <el-table-column type="selection" width="55" align="center" /> -->
        <el-table-column label="油田" prop="name" align="center"> </el-table-column>
        <el-table-column label="QHD32-6" prop="name" align="center"> </el-table-column>
        <el-table-column label="QHD33-1" prop="name" align="center"> </el-table-column>
        <el-table-column label="CFD6-4" prop="name" align="center"> </el-table-column>
        <el-table-column label="BZ3-2" prop="name" align="center"> </el-table-column>
        <el-table-column label="作业公司" prop="name" align="center"> </el-table-column>
      </el-table>
    </pagePanel>
    <pagePanel headerTitle="油田剩余水平" style="height: 150px">
      <el-table
        :data="noticeList"
        highlight-current-row
        height="100%"
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px' }"
        header-cell-class-name="table_header"
        :cell-style="{ 'text-align': 'center', padding: '2px' }"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <!-- <el-table-column type="selection" width="55" align="center" /> -->
        <el-table-column label="油田" prop="name" align="center"> </el-table-column>
        <el-table-column label="QHD32-6" prop="name" align="center"> </el-table-column>
        <el-table-column label="QHD33-1" prop="name" align="center"> </el-table-column>
        <el-table-column label="CFD6-4" prop="name" align="center"> </el-table-column>
        <el-table-column label="BZ3-2" prop="name" align="center"> </el-table-column>
        <el-table-column label="作业公司" prop="name" align="center"> </el-table-column>
      </el-table>
    </pagePanel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noticeList: [],
      queryData: {
        month: '',
      },
    };
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.app-container {
  height: 100%;

  .el-table {
    overflow: scroll;
  }
}

.el-tree {
  max-height: 370px;
  overflow: scroll;
}

.pertable thead .el-table-column--selection .cell {
  display: none;
}
</style>
