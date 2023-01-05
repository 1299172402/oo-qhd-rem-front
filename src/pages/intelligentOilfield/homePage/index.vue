<template>
  <div style="width: 100%; height: 100%">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="boxCard cardStyle">1-1</div>
      </el-col>
      <el-col :span="8"> <div class="boxCard cardStyle">1-2</div> </el-col>
      <el-col :span="8"> <div class="boxCard cardStyle">1-3</div> </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="boxCard cardStyle">2-1</div>
      </el-col>
      <el-col :span="8"> <div class="boxCard cardStyle">2-2</div> </el-col>
      <el-col :span="8"> <div class="boxCard cardStyle">2-3</div> </el-col>
    </el-row>
    <el-row>
      <el-col :span="12"><div class="boxCard cardStyle">3-1</div></el-col>
      <el-col :span="12"><div class="boxCard cardStyle">3-2</div></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>

<style>
.cardStyle {
  height: 250px;
  margin: 0 10px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
