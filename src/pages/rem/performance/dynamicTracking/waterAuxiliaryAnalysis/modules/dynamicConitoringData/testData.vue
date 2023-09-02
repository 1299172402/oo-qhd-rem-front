<!--化验数据-->
<template>
  <div class="z-main">
    <page-panel style="width: 100%; height: 100%; margin-top: 0" headerTitle="采出水化验数据" show-btn>
      <el-table
        id="tableData"
        :data="tableData"
        :border="false"
        :row-style="{ height: '0px' }"
        header-cell-class-name="table_header"
        :cell-style="{ padding: '6px', 'text-align': 'center' }"
        style="width: 100%; padding: 0 10px"
        height="calc(100% - 10px)"
        :default-sort="{ prop: 'date', order: 'descending' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
      >
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="well_name" label="井号" align="center"></el-table-column>
        <el-table-column prop="sample_depth" :label="`样品深度`" align="center" min-width="130"></el-table-column>
        <el-table-column prop="ca" :label="`钙离子`" align="center" min-width="130"></el-table-column>
        <el-table-column prop="hco3" :label="`镁离子`" align="center" min-width="130"></el-table-column>
        <el-table-column
          prop="total_mineralization"
          :label="`样品总矿化度`"
          align="center"
          min-width="130"
        ></el-table-column>
        <!-- 
                    <el-table-column prop="date" label="日期" width="100">
                        <template slot-scope="scope">
                          <span>{{scope.row.date | dateTimeFormat}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sampleId" label="流体样品类型" min-width="140"></el-table-column>
                    <el-table-column prop="den" :label="`原油密度\n (g/cm³)`" min-width="140"></el-table-column>
                    <el-table-column prop="" :label="`粘度\n (mPa.s)`" min-width="120"></el-table-column>
                    <el-table-column prop="api60F" label="API_60F" min-width="100"></el-table-column>
                    <el-table-column prop="waterContent" :label="`含水\n (%)`" min-width="130"></el-table-column>
                    <el-table-column prop="scontent" :label="`含硫量\n (%)`" min-width="140"></el-table-column>
                    <el-table-column prop="freezePoint" :label="`凝固点\n (℃)`" min-width="140"></el-table-column>
                    <el-table-column prop="waxContent" :label="`蜡量\n (%)`" min-width="140"></el-table-column>
                    <el-table-column prop="bitumen" :label="`沥青质\n (%)`" min-width="100"></el-table-column>
                    <el-table-column prop="resin" :label="`胶质\n (%)`" min-width="110"></el-table-column> -->
      </el-table>
    </page-panel>
  </div>
</template>

<script>
import { getWellAssay } from "@/api/oilDeposit/ipm-02/injectsinglewell.js";
import { exportExcel } from "@/lib/exportExcel.js";
export default {
  filters: {
    dateTimeFormat(val) {
      if (val) {
        return new Date(val).format("yyyy-MM-dd");
      } else {
        return "-";
      }
    },
  },
  props: {
    //选择油田
    oilFeildId: {},
    //选择平台
    platform: {},
    //选择井号
    wellId: {},
  },
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.doSearch();
  },
  methods: {
    //根据父组件传递过来的参数进行查询
    doSearch() {
      let request = {
        ogfId: this.oilFeildId,
        platId: this.platform,
        borepipeId: this.wellId,
        page: 1,
        pageSize: 99999,
      };
      getWellAssay(request).then((data) => {
        let code = data.data.code;
        if (code == 200) {
          this.tableData = data.data.data.rows;
        } else {
          this.tableData = [];
        }
      });
    //   testReport(request).then((res) => {
    //     if (res.data.code == 200) {
    //       this.tableData = res.data.data.oilResults;
    //       this.tableData1 = res.data.data.results;
    //     } else {
    //       this.tableData = [];
    //       this.tableData1 = [];
    //     }
    //   });
    },
    //下载
    doDownLoad() {
      let fileName = "化验数据";
      if (this.wellName) {
        fileName = this.wellName + fileName;
      }
    //   exportExcel("#tableData", fileName + "原油分析");
      exportExcel("#tableData", fileName + "采出水");
    },
  },
};
</script>

<style scoped lang="scss">
.z-main {
  width: 100%;
  height: calc(100% - 100px);
  display: flex;
  flex-direction: column;
}
#tableData,
#tableData1 {
  ::v-deep .el-table__header-wrapper .cell {
    height: auto !important;
    line-height: 36px !important;
    white-space: pre;
  }
  ::v-deep .cell:empty {
    &::before {
      content: "-";
    }
  }
}
</style>
