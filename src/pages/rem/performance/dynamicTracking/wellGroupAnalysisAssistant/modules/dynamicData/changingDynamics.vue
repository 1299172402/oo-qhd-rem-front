<!--井组连通性变化动态-->
<template>
  <el-form label-width="90px">
    <div style="display: flex">
      <el-form-item label="开始时间" style="height: 60px">
        <el-date-picker
          value-format="yyyy-MM"
          :clearable="false"
          :picker-options="picker"
          v-model="queryData.firstMonth"
          type="month"
          placeholder="选择月"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="对比时间">
        <el-date-picker
          value-format="yyyy-MM"
          :clearable="false"
          :picker-options="pickerOption"
          @change="choiceendtime"
          v-model="queryData.secondMonth"
          type="month"
          placeholder="选择月"
        >
        </el-date-picker>
      </el-form-item>
    </div>
    <el-table
      highlight
      :key="itemKey"
      :cell-style="{ padding: '3px', 'text-align': 'center' }"
      :data="tableData"
      height="500px"
      style="margin-top: -30px"
    >
      <el-table-column type="index" label="序号" width="50px" header-align="center"></el-table-column>
      <el-table-column prop="waterWellName" label="水井" header-align="center"></el-table-column>
      <el-table-column prop="layerName" label="层位" header-align="center"></el-table-column>
      <el-table-column prop="oilWellName" label="油井" header-align="center"></el-table-column>
      <el-table-column prop="effectivenessSituation" label="受效情况" header-align="center"></el-table-column>
      <el-table-column header-align="center">
        <template slot="header">
          <div>{{ queryData.firstMonth }}注水情况</div>
        </template>
        <el-table-column label="连通系数" prop="firstMonthInjCoeff" header-align="center"> </el-table-column>
        <el-table-column label="注水劈分量" prop="firstMonthSplittingFluid" header-align="center"> </el-table-column>
        <el-table-column label="产液劈分量" prop="firstMonthSplittingInjectWater" header-align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column header-align="center">
        <template slot="header">
          <div>{{ queryData.secondMonth }}注水情况</div>
        </template>
        <el-table-column label="连通系数" prop="secondMonthInjCoeff" header-align="center"> </el-table-column>
        <el-table-column label="注水劈分量" prop="secondMonthSplittingFluid" header-align="center"> </el-table-column>
        <el-table-column label="产液劈分量" prop="secondMonthSplittingInjectWater" header-align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column header-align="center">
        <template slot="header">
          <div>调整幅度</div>
        </template>
        <el-table-column label="连通系数" align="cnter" prop="adjustRangeInjCoeff" header-align="center">
        </el-table-column>
        <el-table-column label="注水劈分量" align="cnter" prop="adjustRangeSplittingInjectWater" header-align="center">
        </el-table-column>
        <el-table-column
          label="产液劈分量"
          align="cnter"
          prop="adjustRangeSplittingSplittingFluid"
          header-align="center"
        >
        </el-table-column>
      </el-table-column>
      <el-table-column align="cnter" prop="remark" label="备注" header-align="center"></el-table-column>
    </el-table>
  </el-form>
</template>

<script>
import { getWellGroupCommunicateDynamic } from "@/api/rem/oilwellauxiliaryanalysis.js";
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
      pickerOption: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      itemKey: 0,
      tableData: [],
      queryData: {
        month: "",
        secondMonth: "",
        firstMonth: "",
      },
    };
  },
  mounted() {
    var date = new Date();
    var months = date.getMonth() + 1;
    var m = "0" + (months - 1);
    var x = "0" + (months - 2);
    var y = date.getFullYear();
    if (months == 1) {
      y--;
      m = "12";
    }
    if (months == 1) {
      y--;
      m = "11";
    }
    this.queryData.secondMonth = y + "-" + m.substr(m.length - 2, 2);
    this.queryData.firstMonth = y + "-" + x.substr(m.length - 2, 2);
    this.doSearch();
  },
  methods: {
    doSearch() {
      this.secondMonth = this.queryData.secondMonth;
      this.firstMonth = this.queryData.firstMonth;
      this.itemKey++;
      let request = {
        oilFieldId: this.oilFieldId,
        blockId: this.blockId,
        fieldLayerId: this.layerId,
        wellGroupId: this.wellGroupId,
        secondMonth: this.queryData.secondMonth,
        firstMonth: this.queryData.firstMonth,
      };
      getWellGroupCommunicateDynamic(request).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data;
        }
      });
    },
    choiceendtime() {
      if (new Date(this.queryData.secondMonth) < new Date(this.queryData.firstMonth)) {
        let sj = new Date(this.queryData.secondMonth).getTime() - 24 * 60 * 60 * 1000;
        var m = new Date(sj).getMonth() + 1;
        var y = new Date(sj).getFullYear();
        this.queryData.firstMonth = (m != 10) & (m != 11) & (m != 12) ? y + "-" + "0" + m : y + "-" + m;
      }
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
