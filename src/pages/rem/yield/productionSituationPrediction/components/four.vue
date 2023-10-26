<!--单井产量预测-->
<template>
  <div class="z-main" style="height: 100%">
    <div style="display: flex; align-items: center; margin-bottom: 15px">
      <!-- <span>作业公司：</span>
            <el-select v-model="conditions.companyId" @change="changeOGFList" disabled style="width:320px;margin-right:15px;">
                <el-option v-for="item in companyList" :key="item.orgId" :label="item.orgName" :value="item.orgId"></el-option> -->
      <!-- </el-select> -->
      <span>油田：</span>
      <el-select v-model="conditions.ogfId" @change="searchPlatFormList" style="margin-right: 15px">
        <el-option v-for="item in ogfList" :key="item.ogfId" :label="item.ogfName" :value="item.ogfId"></el-option>
      </el-select>
      <span>平台：</span>
      <el-select v-model="conditions.platformId" clearable style="margin-right: 15px">
        <el-option
          v-for="item in platformList"
          :key="item.platformId"
          :label="item.platformCode"
          :value="item.platformId"
        ></el-option>
      </el-select>
      <span>预测年月：</span>
      <el-select v-model="conditions.yearMonth" placeholder="请选择" style="width: 200px; margin-right: 15px">
        <el-option
          v-for="item in forecastYearMonthList"
          :key="item.source_ID"
          :label="item.source_NAME"
          :value="item.source_ID"
        >
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="searchDataFromServer">搜索</el-button>
      <el-button
        class="commonBtn"
        icon="el-icon-refresh"
        style="margin-left: 15px !important; margin-right: auto"
        @click="resetting"
        >重置</el-button
      >
    </div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
      <div>
        <el-button type="primary" icon="el-icon-add" @click="save">保存</el-button>
        <el-button type="primary" @click="showAddDialog">添加</el-button>
      </div>
      <el-button icon="el-icon-download" type="primary" @click="doDownExcel('#table1', '单井产量预测')">下载</el-button>
    </div>
    <el-table :key="Math.random()" id="table1" :data="tableData" border height="calc(100% - 58px - 55px)">
      <el-table-column type="index" width="80" align="center" fixed></el-table-column>
      <el-table-column align="left" label="当前作业井名" prop="wellNo" width="150" fixed></el-table-column>
      <el-table-column align="center" label="当前作业措施" prop="measureTypeName" width="150"></el-table-column>
      <el-table-column align="center" label="产品类型" prop="productTypeName" width="100"></el-table-column>
      <el-table-column align="center" :label="`措施见效日期\n(yyyy-mm-dd)`" prop="measureSeffectDate" width="200">
        <template slot-scope="scope">
          <el-date-picker
            v-model="scope.row.measureSeffectDate"
            type="date"
            format="yyyy-MM-dd"
            style="width: 160PX;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="`日增油/日产油\n(m³)`" prop="" width="200">
        <template slot-scope="scope">
          <el-input-number
            v-model="scope.row.dailyAllocatingBase"
            :precision="4"
            size="medium"
            style="width: 160px"
            controls-position="right"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="`月递减率\n(%)`" prop="" width="200">
        <template slot-scope="scope">
          <el-input-number
            v-model="scope.row.decreaseRate"
            :precision="4"
            size="medium"
            style="width: 160px"
            controls-position="right"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="`月时率\n(%)`" prop="" width="200">
        <template slot-scope="scope">
          <el-input-number
            v-model="scope.row.timeEfficieincy"
            :precision="4"
            size="medium"
            style="width: 160px"
            controls-position="right"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="`见效天数\n(d)`" prop="effectDays" width="100"></el-table-column>
      <el-table-column align="center" :label="`单井年配产量\n(m³)`" prop="dailyAllocating" width="200">
        <template slot-scope="scope">
          <el-input-number
            v-model="scope.row.yearAllocating"
            :precision="4"
            size="medium"
            style="width: 160px"
            controls-position="right"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column align="left" label="备注" min-width="300" prop="remark">
        <template slot-scope="scope">
          <el-input v-model="scope.row.remark" size="medium"></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="calcSingleWellMeasure(scope.row)">计算配产量</el-button>
          <el-button type="text" style="color: #f56c6c" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="添加老井措施"
      :visible.sync="AddDialogFlag"
      width="30%"
      :modal-append-to-body="true"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      :before-close="handleDialogClose"
    >
      <fourAdd
        :ogfId="conditions.ogfId"
        :platId="conditions.platformId"
        :yearMonth="conditions.yearMonth"
        :handleDialogClose="handleDialogClose"
      ></fourAdd>
    </el-dialog>
  </div>
</template>

<script>
import { QueryOgfDetail, QueryPlatformDetail, userListByUserNames } from "@/api/rem/marster.js";
import { getForecastDate } from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
import {
  getWellDailyMeasureInfo,
  insertWellDailyMeasureInfo,
  deleteWellDailyMeasureInfoByIds,
  calcSingleWellMeasureStatInfos,
} from "@/api/oilDeposit/rem-03/WellDailyMeasureImprove.js";
import { exportExcel } from "@/lib/exportExcel.js";
import fourAdd from "../popups/fourAdd.vue";

export default {
  components: {
    fourAdd,
  },
  data() {
    return {
      AddDialogFlag: false,
      elTableHeight: 0,
      conditions: {
        companyId: "715AD1CD60484BB59E737CD18A9DE44A", // 作业公司编号
        ogfId: "3FC9A818F5BC43B88270DB80BBB3018F", // 油田编号
        platformId: "", // 平台编号
        yearMonth: "",
      },
      companyList: [], // 作业公司数据集
      ogfList: [], // 油田数据集
      platformList: [], // 平台数据集
      forecastYearMonthList: [],
      tableData: [],
      wellSelList: [],
      // dynamicHeight: 100 // 动态高度
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    //重置
    resetting() {
      this.$nextTick(() => {
        Object.assign(this.$data, this.$options.data());
        this.init();
      });
    },
    async init() {
      // await this.searchCompanyList();
      await this.changeOGFList();
      await this.searchPlatFormList();
      this.getForecastDate();
    },
    // //查询作业公司列表--页面初始化时加载
    // async searchCompanyList() {
    //     getOrgInfo().then(res=> {
    //         if (res.data.code == 200) {
    //             this.companyList = res.data.data;
    //             this.conditions.companyId = '715AD1CD60484BB59E737CD18A9DE44A' //秦皇岛-勃中作业公司
    //         }
    //     });
    // },
    //查询油田数据--切换作业公司时触发
    async changeOGFList() {
      this.ogfList = [];
      this.platformList = [];
      this.conditions.platformId = "";
      let params = {
        searchKeys: [this.$store.getters["user/userDetail"].user.userName],
      };
      await userListByUserNames(params).then((res) => {
        if (res.data.code == 200) {
          this.conditions.companyId =
            res.data.data[0]?.currentTenantBindOrgId
              ? res.data.data[0].currentTenantBindOrgId
              : undefined;
        }
      });
      await QueryOgfDetail({ operationZoneId: this.conditions.companyId }).then((data) => {
        let code = data.data.code;
        if (code == 200) {
          this.ogfList = data.data.data;
          if (this.conditions.companyId === "715AD1CD60484BB59E737CD18A9DE44A") {
            this.conditions.ogfId = "3FC9A818F5BC43B88270DB80BBB3018F";
          } else {
            this.conditions.ogfId = this.ogfList[0].ogfId ? this.ogfList[0].ogfId : undefined;
          }
        }
      });
    },
    //查询平台列表--切换油田时触发
    searchPlatFormList() {
      QueryPlatformDetail({ ogfId: this.conditions.ogfId }).then((res) => {
        if (res.data.code == 200) {
          this.conditions.platformId = "";
          this.platformList = res.data.data;
        }
      });
    },
    //获取滚动预测日期下拉列表
    getForecastDate() {
      getForecastDate().then((res) => {
        if (res.data.code == 200) {
          this.forecastYearMonthList = res.data.data;
        }
      });
    },
    //
    async searchDataFromServer() {
      if (!this.conditions.ogfId) {
        this.$message.error("请选择油田");
        return;
      }
      if (!this.conditions.yearMonth) {
        this.$message.error("请选择预测年月");
        return;
      }
      let params = {
        rollingForecastDate: this.conditions.yearMonth,
        ogfId: this.conditions.ogfId,
        platform_id: this.conditions.platformId,
      };
      getWellDailyMeasureInfo(params).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data ? res.data.data : [];
        }
      });
    },
    //保存结果,策略:先删除，后保存
    save() {
      // this.$message.info("保存中...");
      insertWellDailyMeasureInfo(this.tableData).then((res) => {
        console.log(res);
        this.$message.info("保存成功...");
      });
    },
    //计算单井配产量
    calcSingleWellMeasure(row) {
      let params = {};
      // 措施见效日期
      params.measureSeffectDate = row.measureSeffectDate;
      // 日增油/日产油
      params.dailyAllocatingBase = row.dailyAllocatingBase;
      // 递减率
      params.decreaseRate = row.decreaseRate;
      // 时率
      params.timeEfficieincy = row.timeEfficieincy;
      // 见效天数
      params.effectDays = row.effectDays;
      console.log(params);
      calcSingleWellMeasureStatInfos(params)
        .then((res) => {
          this.tableData.forEach((obj) => {
            if (row.wellMeasureImprovementId == obj.wellMeasureImprovementId) {
              obj.yearAllocating = res.data.data;
            }
          });
          this.$message.success("计算成功");
        })
        .catch((e) => {
          this.$message.error("计算失败");
        });
    },
    //删除行 @param index @param row
    deleteRow(index, row) {
      if (row.wellMeasureImprovementId) {
        let array = [];
        array.push(row.wellMeasureImprovementId);
        // 删除信息
        deleteWellDailyMeasureInfoByIds(array).then((res) => {
          console.log(res);
        });
      }
      this.tableData.splice(index, 1);
    },
    showAddDialog() {
      if (this.conditions.yearMonth == "") {
        this.$message.warning("请选择预测版本");
        return;
      }
      this.AddDialogFlag = !this.AddDialogFlag;
    },
    //关闭添加框
    handleDialogClose() {
      this.AddDialogFlag = false;
    },
    //下载导出文件 tableId tableName
    doDownExcel(tableId, tableName) {
      exportExcel(tableId, tableName);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-table__fixed-header-wrapper .cell,
::v-deep .el-table__header-wrapper .cell {
  height: auto !important;
  line-height: 18px !important;
  white-space: pre;
}
::v-deep .el-table__fixed-right {
  z-index: 2;
}
</style>
