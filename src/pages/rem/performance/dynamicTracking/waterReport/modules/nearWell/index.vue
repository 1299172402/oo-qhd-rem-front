<!-- 临井数据 -->
<template>
  <div class="app-container">
    <pagePanel headerTitle="临井数据">
<!--      <el-form style="padding-left: 20%" label-width="110px">-->
<!--        <el-row :gutter="20">-->
<!--          <el-form-item label="平台"> </el-form-item>-->
<!--           <el-form-item label="井坐标位置"> </el-form-item>-->
<!--        </el-row>-->
<!--        <el-row :gutter="20">-->
<!--          <el-col :span="12"> <el-form-item label="井型"> </el-form-item></el-col>-->
<!--          <el-col :span="12"> <el-form-item label="井别"> </el-form-item></el-col>-->
<!--        </el-row>-->
<!--        <el-row :gutter="20">-->
<!--          <el-col :span="12"> <el-form-item label="井基准图"> </el-form-item></el-col>-->
<!--          <el-col :span="12"> <el-form-item label="补心海拔"> </el-form-item></el-col>-->
<!--        </el-row>-->
<!--        <el-row :gutter="20">-->
<!--          <el-col :span="12"> <el-form-item label="完钻井深"> </el-form-item></el-col>-->
<!--          <el-col :span="12"> <el-form-item label="完钻垂深"> </el-form-item></el-col>-->
<!--        </el-row>-->
<!--      </el-form>-->
    </pagePanel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    // var date = new Date();
    // var months = date.getMonth() + 1;
    // var m = '0' + (months - 1);
    // var y = date.getFullYear();
    // if (months == 1) {
    //   y--;
    //   m = '12';
    // }
    // this.getData();
  },
  methods: {
    passValue(val) {
      console.log(val);
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
