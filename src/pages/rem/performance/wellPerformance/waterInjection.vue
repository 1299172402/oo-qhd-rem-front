<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="block">
        <div style="width: 100%; text-align: center; font-size: 20px; margin-bottom: 40px">吸水剖面测井结果图</div>
        <el-image
          style="width: 100%; height: 600px"
          :src="require('@/pages/rem/performance/wellPerformance/img/吸水剖面.png')"
        ></el-image>
      </div>
    </el-col>
    <el-col :span="12">
        <div style="width: 100%; text-align: center; font-size: 20px; margin-bottom: 40px">吸水剖面测井结果</div>
      <el-table :data="tableData" style="width: 100%" align="center">
        <el-table-column prop="date" label="解释层位" width="180"> </el-table-column>
        <el-table-column prop="name" label="顶界深度（m）" width="180"> </el-table-column>
        <el-table-column prop="address" label="底界深度（m）"> </el-table-column>
         <el-table-column prop="address" label="启动压力（MPa）"> </el-table-column>
         <el-table-column prop="address" label="视吸水指数（m³/(MPa·d)）"> </el-table-column>
          <el-table-column prop="address" label="吸水指数（m³/(MPa·d)）"> </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
};
</script>

<style></style>
