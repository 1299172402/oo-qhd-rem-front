<!-- 基础数据维护 - 作业公司产量总览 -->
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
    <pagePanel headerTitle="作业公司产量总览" style="height: 650px"
      ><el-table
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
        <el-table-column label="累产/10m⁴m³" prop="name" align="center"> </el-table-column>
        <el-table-column label="分公司奋斗" prop="name" align="center"> </el-table-column>
        <el-table-column label="分公司考核" prop="name" align="center"> </el-table-column>
        <el-table-column label="滚动预测" prop="name" align="center"> </el-table-column>
        <el-table-column label="截至盘存时间分公司奋斗" width="180px" prop="name" align="center"> </el-table-column>
        <el-table-column label="截至盘存时间分公司考核" width="180px" prop="name" align="center"> </el-table-column>
        <el-table-column label="当季度产量计划（暂未有目标）" width="230px" prop="name" align="center">
        </el-table-column>
        <el-table-column label="盘库实际产量" prop="name" align="center"> </el-table-column>
        <el-table-column label="实际-分公司奋斗" prop="name" align="center"> </el-table-column>
        <el-table-column label="实际-分公司考核" prop="name" align="center"> </el-table-column>
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
