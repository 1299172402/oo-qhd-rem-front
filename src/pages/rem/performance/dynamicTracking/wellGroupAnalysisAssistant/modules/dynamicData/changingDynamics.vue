<!--井组连通性变化动态-->
<template>
  <el-form label-width="90px" style="height: calc(100% - 55px)">
    <div style="display: flex; align-items: center; margin-bottom: 15px">
      <el-form-item label="开始时间" style="margin-bottom: 0">
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

      <el-form-item label="对比时间" style="margin-bottom: 0">
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
    <!-- <div style="height:100%"> -->
    <page-panel-new style="height: calc(100% - 101px); margin-top: 0px" show-btn>
      <el-table
        highlight
        :key="itemKey"
        :header-cell-style="{ 'text-align': 'center' }"
        :data="tableData"
        id="tableData"
        :span-method="objectSpanMethod"
        height="100%"
      >
        <el-table-column
          prop="waterWellName"
          fixed
          label="水井"
          min-width="150"
          header-align="center"
        ></el-table-column>
        <el-table-column prop="layerName" label="层位" min-width="200" header-align="center"></el-table-column>
        <el-table-column prop="oilWellName" label="油井" min-width="130" header-align="center"></el-table-column>
        <el-table-column prop="effectivenessSituation" label="受效情况" header-align="center"></el-table-column>
        <el-table-column header-align="center" min-width="500">
          <template slot="header">
            <div>{{ queryData.firstMonth }}注水情况</div>
          </template>
          <el-table-column
            label="连通系数"
            min-width="90"
            prop="firstMonthInjCoeff"
            align="right"
            :formatter="toPrecise2"
          >
          </el-table-column>
          <el-table-column
            :label="`注水劈分量\n(m³)`"
            min-width="160"
            prop="firstMonthSplittingFluid"
            align="right"
            :formatter="toPrecise2"
          >
          </el-table-column>
          <el-table-column
            :label="`产液劈分量\n(m³)`"
            min-width="160"
            prop="firstMonthSplittingInjectWater"
            align="right"
            :formatter="toPrecise2"
          ></el-table-column>
        </el-table-column>
        <el-table-column header-align="center">
          <template slot="header">
            <div>{{ queryData.secondMonth }}注水情况</div>
          </template>
          <el-table-column label="连通系数" prop="secondMonthInjCoeff" align="right" :formatter="toPrecise2">
          </el-table-column>
          <el-table-column
            :label="`注水劈分量\n(m³)`"
            min-width="130"
            prop="secondMonthSplittingFluid"
            align="right"
            :formatter="toPrecise2"
          >
          </el-table-column>
          <el-table-column
            :label="`产液劈分量\n(m³)`"
            min-width="130"
            prop="secondMonthSplittingInjectWater"
            align="right"
            :formatter="toPrecise2"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column header-align="center">
          <template slot="header">
            <div>调整幅度</div>
          </template>
          <el-table-column
            label="连通系数"
            align="right"
            prop="adjustRangeInjCoeff"
            header-align="center"
            :formatter="toPrecise2"
          >
          </el-table-column>
          <el-table-column
            :label="`注水劈分量\n(m³)`"
            min-width="130"
            align="right"
            prop="adjustRangeSplittingInjectWater"
            header-align="center"
            :formatter="toPrecise2"
          >
          </el-table-column>
          <el-table-column
            :label="`产液劈分量\n(m³)`"
            min-width="130"
            align="right"
            prop="adjustRangeSplittingSplittingFluid"
            header-align="center"
            :formatter="toPrecise2"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          align="cnter"
          prop="remark"
          show-overflow-tooltip
          min-width="130"
          label="备注"
          header-align="center"
        ></el-table-column>
      </el-table>
    </page-panel-new>
    <!-- </div> -->
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
      picker: {
        disabledDate: (time) => {
          let data = new Date(this.queryData.secondMonth).getTime();
          return time.getTime() > data - 24 * 60 * 60 * 1000;
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
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        // this.tableData  修改
        const _row = this.flitterData(this.tableData).one[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
    flitterData(arr) {
      let spanOneArr = [];
      let concatOne = 0;
      arr.forEach((item, index) => {
        if (index === 0) {
          spanOneArr.push(1);
        } else {
          //cityName 修改
          if (item.waterWellName === arr[index - 1].waterWellName) {
            //第一列需合并相同内容的判断条件
            spanOneArr[concatOne] += 1;
            spanOneArr.push(0);
          } else {
            spanOneArr.push(1);
            concatOne = index;
          }
        }
      });
      return {
        one: spanOneArr,
      };
    },
    doSearch() {
      this.secondMonth = this.queryData.secondMonth;
      this.firstMonth = this.queryData.firstMonth;
      this.itemKey++;
      if (this.blockId == "3FC9A818F5BC43B88270DB80BBB3018F") {
        this.blockId = "";
      }
      let request = {
        oilFieldId: this.oilFieldId,
        fieldLayerId: this.layerId,
        blockId: this.blockId,
        wellGroupId: this.wellGroupId,
        secondMonth: this.queryData.secondMonth,
        firstMonth: this.queryData.firstMonth,
      };
      getWellGroupCommunicateDynamic(request).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data;
        } else {
          this.$message.error("系统错误请重新尝试或联系运维人员！");
        }
      });
    },
    choiceendtime() {
      if (new Date(this.queryData.secondMonth) <= new Date(this.queryData.firstMonth)) {
        let sj = new Date(this.queryData.secondMonth).getTime() - 24 * 60 * 60 * 1000;
        var m = new Date(sj).getMonth() + 1;
        var y = new Date(sj).getFullYear();
        this.queryData.firstMonth = (m != 10) & (m != 11) & (m != 12) ? y + "-" + "0" + m : y + "-" + m;
      }
    },
    doDownLoad() {
      let fileName = "井组连通性变化动态";
      exportExcel("#tableData", fileName);
    },
    // 表格格式化方法 - 数值只保留两位小数
    toPrecise2(row, column) {
      if (
        (row[column.property] || parseFloat(row[column.property]) === 0) &&
        typeof parseFloat(row[column.property]) === "number"
      ) {
        return parseFloat(row[column.property]) || parseFloat(row[column.property]) === 0
          ? parseFloat(row[column.property]).toFixed(2)
          : "0";
      } else {
        return row[column.property] ? row[column.property] : "-";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-table .cell:empty::before {
  content: "-";
}
#tableData {
  ::v-deep .el-table__header-wrapper .cell {
    height: auto;
    line-height: 23px;
    white-space: pre;
  }

  ::v-deep .cell:empty {
    &::before {
      content: "-";
    }
  }
}
</style>
