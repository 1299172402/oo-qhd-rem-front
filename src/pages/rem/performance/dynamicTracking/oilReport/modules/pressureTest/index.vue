<!--压力测试-->
<template>
  <div class="app-container">
    <pagePanel headerTitle="压力数据" style="height: 500px" show-btn>
        <el-table
            id="tableData"
            :data="tableData" border :row-style="{ height: '0px' }"
            header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }"
            style="width:100%;padding:0 10px;" height="calc(100% - 10px)" :default-sort="{ prop: 'date', order: 'descending' }"
            :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }">
            <el-table-column type="index" label="序号" fixed></el-table-column>
            <el-table-column prop="borepipeName" label="井号" width="140px" fixed></el-table-column>
            <el-table-column prop="wellInterceptType" label="试井项目解析类型" width="140"></el-table-column>
            <el-table-column prop="interpDate" :label="`解释时间\n(yyyy-mm-dd)`" width="140">
                <template slot-scope="scope">
                    <span>{{scope.row.interpDate | dateTimeFormat}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="midMD" :label="`油层中部斜深\n(m)`" width="120" :formatter="toPrecise2"></el-table-column>
            <el-table-column prop="midTVD" :label="`油层中部垂深\n(m)`" width="120" :formatter="toPrecise2"></el-table-column>
            <el-table-column prop="midTemperature" :label="`油层中部温度\n(℃)`" width="120" :formatter="toPrecise2"></el-table-column>
            <el-table-column prop="midFlowPressure" :label="`油层中部流压\n(MPa)`" width="120" :formatter="toPrecise2"></el-table-column>
            <el-table-column prop="midStaticPressure" :label="`油层中部静压\n(MPa)`" width="120" :formatter="toPrecise2"></el-table-column>
            <el-table-column prop="baseLevelAltitude" :label="`基准面海拔\n(m)`" width="110" :formatter="toPrecise2"></el-table-column>
            <el-table-column prop="baseLevelTemperature" :label="`基准面温度\n(℃)`" width="110" :formatter="toPrecise2"></el-table-column>
            <el-table-column prop="baseStaticPressure" :label="`基准面静压\n(MPa)`" width="110" :formatter="toPrecise2"></el-table-column>
            <el-table-column prop="baseFlowPressure" :label="`基准面流压\n(MPa)`" width="110" :formatter="toPrecise2"></el-table-column>
            <el-table-column prop="reduceTemperature" :label="`折算温度梯度\n(℃/m)`" width="120" :formatter="toPrecise2"></el-table-column>
            <el-table-column prop="reducePressure" :label="`折算压力梯度\n(MPa/m)`" width="120" :formatter="toPrecise2"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
        </el-table>
    </pagePanel>
  </div>
</template>

<script>
import { pressure } from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
import { exportExcel } from "@/lib/exportExcel.js";
export default {
  filters: {
    /**
     * hwh
     * 处理事件格式
     * @param val
     * @returns {string|*}
     */
    dateTimeFormat(val) {
      if (val) {
        return new Date(val).format("yyyy-MM-dd");
      } else {
        return "-";
      }
    },
  },
  data() {
    return {
      tableData: [],
      oilFeildId: "3FC9A818F5BC43B88270DB80BBB3018F",
      platform: "3F1E5858C6CC41E2BF4FFC4902797C08",
      wellId: "09D30C16BD1D4F759D53F74941701307",
    };
  },
  methods: {
    passValue(val) {
      this.oilFeildId = val.ogfId;
      this.platform = val.assetCode;
      this.wellId = val.selectWellId;
      this.doSearch();
    },
    /**
     * hwh
     * 根据父组件传递过来的参数进行查询
     */
    doSearch() {
      let request = {
        ogfId: this.oilFeildId,
        platformId: this.platform,
        wellId: this.wellId,
      };
      pressure(request).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.pressureTest;
        }
      });
    },
    /**
     * hwh
     * 下载
     */
    doDownLoad() {
      let fileName = "压力测试";
      if (this.wellName) {
        fileName = this.wellName + fileName;
      }
      exportExcel("#tableData", fileName);
    },

    /**
     * hwh el table 表格头 标题单位样式
     * @param h
     * @param column
     * @returns {*[]}
     */
    renderHeader(h, { column }) {
      let header = column.label.split(" ");
      return [h("p", [h("p", {}, header[0]), h("span", {}, header[1])])];
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-table .cell:empty::before {
  content: "-";
}
::v-deep .el-table__empty-block {
  height: 500px;
}
::v-deep .el-table__body-wrapper {
  height: calc(100% - 70px) !important;
}
::v-deep .el-table__fixed-header-wrapper .cell{
   height: auto !important;
}
</style>
