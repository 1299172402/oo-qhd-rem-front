<!-- 基础数据维护 - 密度维护表 -->
<template>
  <div class="app-container">
    <headerSearch class="g-w100 g-h100" style="height: auto">
      <el-form :inline="true" style="margin-top: 18px">
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
    <pagePanel headerTitle="作业公司产量跟踪" style="height: 650px">
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
        <el-table-column label="2022-10-23" prop="name" align="center"> </el-table-column>
        <el-table-column label="作业公司" prop="name" align="center">
          <el-table-column label="基础" prop="name" align="center"> </el-table-column>
          <el-table-column label="措施" prop="name" align="center"> </el-table-column>
          <el-table-column label="调整井" prop="name" align="center"> </el-table-column>
          <el-table-column label="开发井" prop="name" align="center"> </el-table-column>
          <el-table-column label="合计" prop="name" align="center"> </el-table-column>
        </el-table-column>
        <el-table-column label="QHD32-6" prop="name" align="center">
          <el-table-column label="基础" prop="name" align="center"> </el-table-column>
          <el-table-column label="措施" prop="name" align="center"> </el-table-column>
          <el-table-column label="调整井" prop="name" align="center"> </el-table-column>
          <el-table-column label="开发井" prop="name" align="center"> </el-table-column>
          <el-table-column label="合计" prop="name" align="center"> </el-table-column>
        </el-table-column>
        <el-table-column label="BZ3-2" prop="name" align="center">
          <el-table-column label="基础" prop="name" align="center"> </el-table-column>
          <el-table-column label="措施" prop="name" align="center"> </el-table-column>
          <el-table-column label="调整井" prop="name" align="center"> </el-table-column>
          <el-table-column label="开发井" prop="name" align="center"> </el-table-column>
          <el-table-column label="合计" prop="name" align="center"> </el-table-column>
        </el-table-column>
      </el-table>
    </pagePanel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noticeList: [],
      // originData: [
      //   {
      //     type: '12323',
      //     num: '342342',
      //     average: '3342',
      //   },
      //   {
      //     type: '234',
      //     num: '234',
      //     average: '23234',
      //   },
      //   {
      //     type: '324',
      //     num: '234',
      //     average: '2234',
      //   },
      // ],
      // originTitle: ['报表产量/m³', '前一日报表产量/m³', '滚动预测/m³','分公司奋斗/m³','分公司考核/m³'],
      // transTitle: ['2022-10-23', '基础', '措施', '调整井','开发井'], // transTitle 该标题为转化后的标题, 注意多一列,  因为原来的标题变成了竖着显示了, 所以多一列标题, 第一个为空即可
      // transData: [],
      queryData: {
        month: '',
      },
    };
  },
  created() {
    let matrixData = this.originData.map((row) => {
      let arr = [];
      for (let key in row) {
        arr.push(row[key]);
      }
      return arr;
    });
    this.transData = matrixData[0].map((col, i) => {
      return [
        this.originTitle[i],
        ...matrixData.map((row) => {
          return row[i];
        }),
      ];
    });
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
