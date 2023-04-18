<!--井组配注变化动态-->
<template>
  <el-form>
    <el-row :gutter="20">
      <el-col :span="5">
        <el-form-item label="开始时间">
          <el-date-picker
            value-format="yyyy-MM"
            :clearable="false"
            :picker-options="pickerOption"
            v-model="queryData.month"
            type="month"
            key="1"
            placeholder="选择月"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-form-item label="对比时间">
        <el-date-picker
          value-format="yyyy-MM"
          :clearable="false"
          :picker-options="pickerOption"
          v-model="queryData.month"
          type="month"
          key="1"
          placeholder="选择月"
        >
        </el-date-picker>
      </el-form-item>
    </el-row>
    <el-table  highlight :data="tableData" height="calc(100% - 101px)" style="margin-top:-30px">
      <el-table-column type="index" label="序号" width="50px" header-align="center"></el-table-column>
      <el-table-column prop="wellNo" label="井号" header-align="center"></el-table-column>
      <el-table-column prop="fieldName" label="层位" header-align="center"></el-table-column>
      <el-table-column header-align="center">
        <template slot="header">
          <div>2022</div>
        </template>
        <el-table-column label="配注量(m³/d)" header-align="center"> </el-table-column>
        <el-table-column label="注采比" header-align="center"> </el-table-column>
        <el-table-column label="注水强度(m³*d.m)" header-align="center"> </el-table-column>
      </el-table-column>
      <el-table-column header-align="center">
        <template slot="header">
          <div>2022</div>
        </template>
        <el-table-column label="配注量(m³/d)" header-align="center"> </el-table-column>
        <el-table-column label="注采比" header-align="center"> </el-table-column>
        <el-table-column label="注水强度(m³*d.m)" header-align="center"> </el-table-column>
      </el-table-column>
      <el-table-column prop="fieldName" label="备注" header-align="center"></el-table-column>
    </el-table>
  </el-form>
</template>

<script>
import { exportExcel } from "@/lib/exportExcel.js";
export default {
  props: {
    //油田id
    oilFieldId: {},
    //区块id
    blockId: {},
    //层系id
    layerId: {},
    //井组id
    wellGroupId: {},
  },
  data() {
    return {
      tableData: [],
      queryData: {
        month: "",
      },
    };
  },
  mounted() {
    this.doSearch();
  },
  methods: {
    doSearch() {
      // let request = {
      //     oilFieldId: this.oilFieldId,
      //     fieldId: this.blockId,
      //     fieldLayerId: this.layerId,
      //     wellGroupId: this.wellGroupId,
      // };
      // wellGroupMeasureStat(request).then((res) => {
      //     if (res.data.code == 200) {
      //         this.tableData = res.data.data.wellGroupMeasureStats;
      //     }
      // });
    },
    doDownLoad() {
      let fileName = "措施效果";
      if (this.wellGroupName) {
        fileName = this.wellGroupName + fileName;
      }
      exportExcel("#tableData", fileName);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-table .cell:empty::before {
  content: "-";
}
</style>
