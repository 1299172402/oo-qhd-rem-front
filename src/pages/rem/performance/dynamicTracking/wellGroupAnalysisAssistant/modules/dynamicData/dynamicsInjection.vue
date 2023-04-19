<!--井组配注变化动态-->
<template>
  <el-form label-width="90px">
    <div style="display: flex">
      <el-form-item label="开始时间" style="height: 60px">
        <el-date-picker
          value-format="yyyy-MM"
          :clearable="false"
          :picker-options="picker"
          @change="choiceendtime"
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
      :data="tableData"
      :cell-style="{ padding: '3px', 'text-align': 'center' }"
      height="500px"
      style="margin-top: -30px"
      :key="itemKey"
    >
      <el-table-column type="index" label="序号" width="50px" header-align="center"></el-table-column>
      <el-table-column prop="wellNo" label="井号" header-align="center"></el-table-column>
      <el-table-column prop="layerName" label="层位" width="200px" header-align="center"></el-table-column>
      <el-table-column header-align="center">
        <template slot="header">
          <div>{{ firstMonth }}</div>
        </template>
        <el-table-column prop="dosage01" :label="`配注量\n(m³/d)`" header-align="center"> </el-table-column>
        <el-table-column prop="injectionRatio01" label="注采比" header-align="center"> </el-table-column>
        <el-table-column prop="injectionStrength01" :label="`注水强度\n(m³*d.m)`" header-align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column header-align="center">
        <template slot="header">
          <div>{{ secondMonth }}</div>
        </template>
        <el-table-column prop="dosage02" :label="`配注量\n(m³/d)`" header-align="center"> </el-table-column>
        <el-table-column prop="injectionRatio02" label="注采比" header-align="center"> </el-table-column>
        <el-table-column prop="injectionStrength02" :label="`注水强度\n(m³*d.m)`" header-align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column header-align="center">
        <template slot="header">
          <div>调整幅度</div>
        </template>
        <el-table-column :label="`配注量\n(m³/d)`" header-align="center">
          <template slot-scope="scoped">
            {{ scoped.row.dosage02 - scoped.row.dosage01 }}
          </template>
        </el-table-column>
        <el-table-column prop="injectionRatio02" label="注采比" header-align="center">
          <template slot-scope="scoped">
            {{ scoped.row.injectionRatio02 - scoped.row.injectionRatio01 }}
          </template>
        </el-table-column>
        <el-table-column :label="`注水强度\n(m³*d.m)`" header-align="center">
          <template slot-scope="scoped">
            {{ scoped.row.injectionStrength02 - scoped.row.injectionStrength01 }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="fieldName" label="备注" header-align="center"></el-table-column>
    </el-table>
  </el-form>
</template>

<script>
import { getWellGroupInjectionDynamic } from "@/api/rem/oilwellauxiliaryanalysis.js";
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
      secondMonth: "",
      firstMonth: "",
      itemKey: 0,
      queryData: {
        month: "",
        secondMonth: "",
        firstMonth: "",
      },
      picker: {
        disabledDate: (time) => {
          let data = new Date(this.queryData.secondMonth).getTime();
          return time.getTime() > data - 24 * 60 * 60 * 1000;
        },
      },
      pickerOption: {
        disabledDate(time) {
          let year = new Date().getFullYear();
          let month = new Date().getMonth() + 1;
          let days = new Date(year, month, 0).getDate();
          return time.getTime() > Date.now() - 24 * 60 * 60 * 1000 * days;
        },
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
    this.secondMonth = y + "-" + m.substr(m.length - 2, 2);
    this.firstMonth = y + "-" + x.substr(m.length - 2, 2);
    this.doSearch();
  },
  methods: {
    doSearch() {
      this.secondMonth = this.queryData.secondMonth;
      this.firstMonth = this.queryData.firstMonth;
      this.itemKey++;
      let request = {
        ogfId: this.oilFieldId,
        blockId: this.blockId,
        fieldLayerId: this.layerId,
        wellGroupId: this.wellGroupId,
        secondMonth: this.queryData.secondMonth,
        firstMonth: this.queryData.firstMonth,
      };
      getWellGroupInjectionDynamic(request).then((res) => {
        if (res.data.code == 200) {
          console.log(res);
          this.tableData = res.data.data.data;
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
<style scoped lang="scss">
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
</style>
