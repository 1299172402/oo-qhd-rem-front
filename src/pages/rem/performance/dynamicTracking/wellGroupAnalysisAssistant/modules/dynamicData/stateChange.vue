<!--注采井网状况变化-->
<template>
  <el-form label-width="90px" style="height: calc(100% - 60px)">
    <div style="display: flex">
      <el-form-item label="开始时间" style="height: 30px">
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
    <page-panel-new style="height:calc(100% - 101px);margin-top: 0px" show-btn>
      <el-table
        highlight
        :key="itemKey"
        :cell-style="{ padding: '3px', 'text-align': 'center' }"
        :data="tableData"
        id="tableData"
        height="calc(100% - 72px)"
      >
        <el-table-column type="index" label="序号" width="50px" header-align="center"></el-table-column>
        <el-table-column prop="wellGroupName" label="井组" width="230px" header-align="center"></el-table-column>
        <el-table-column prop="yearMonth" label="时间" header-align="center"></el-table-column>
        <el-table-column prop="wellCount" label="总井数" header-align="center"></el-table-column>
        <el-table-column prop="oilWellsCount" label="油井数" header-align="center"></el-table-column>
        <el-table-column prop="waterWellsCount" label="水井数" header-align="center"></el-table-column>
        <el-table-column header-align="center">
          <template slot="header">
            <div>受控井</div>
          </template>
          <el-table-column prop="effectOneWay" label="单向" header-align="center"> </el-table-column>
          <el-table-column prop="effectDoubleWay" label="双向" header-align="center"> </el-table-column>
          <el-table-column prop="effectManyWay" label="多向" header-align="center"> </el-table-column>
          <el-table-column prop="effectControlledWayCount" label="小计" header-align="center"> </el-table-column>
          <el-table-column prop="effectControlledWayRate" :label="`受控率\n(%)`" header-align="center">
            <template slot-scope="scoped">
              {{ scoped.row.effectControlledWayRate * 100 }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="effectUncontrolledWay" label="非受控井" header-align="center"></el-table-column>
      </el-table>
      <pagination
        :total="total"
        v-show="total > 0"
        @pagination="changepage"
        :page.sync="pageNum"
        :limit.sync="pageSize"
      />
    </page-panel-new>
  </el-form>
</template>

<script>
import { queryInjectionWellNetworkConditionsList } from "@/api/rem/oilwellauxiliaryanalysis.js";
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
      itemKey: 0,
      queryData: {
        month: "",
        secondMonth: "",
        firstMonth: "",
      },
      total: 0,
      pageNum: 1,
      pageSize: 10,
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
        if(this.blockId == '3FC9A818F5BC43B88270DB80BBB3018F'){
            this.blockId = ''
        }
      let request = {
        // ogfId: this.oilFieldId,
        blockId: this.blockId,
        fieldLayerId: this.layerId,
        wellGroupId: this.wellGroupId,
        secondMonth: this.queryData.secondMonth,
        firstMonth: this.queryData.firstMonth,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      queryInjectionWellNetworkConditionsList(request).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.rows;
          this.total = res.data.data.total;
        } else {
          this.$message.error("系统错误请重新尝试或联系运维人员！");
        }
      });
    },
    changepage() {
      this.doSearch();
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
      let fileName = "注采井网状况变化";
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
