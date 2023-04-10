<!--日度措施配产-->
<template>
  <div>
    <el-container style="overflow: scroll; height: 100%">
      <headerSearch class="g-w100 g-h100">
        <el-form :inline="true" style="margin-top: 18px">
          <el-form-item label="作业公司：">
            <el-select v-model="conditions.companyId" @change="changeOGFList" disabled>
              <el-option
                v-for="item in companyList"
                :key="item.orgId"
                :label="item.orgName"
                :value="item.orgId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="油田：">
            <el-select v-model="conditions.ogfId" @change="searchPlatFormList">
              <el-option
                v-for="item in ogfList"
                :key="item.ogfId"
                :label="item.ogfName"
                :value="item.ogfId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="平台：">
            <el-select v-model="conditions.platformId">
              <el-option
                v-for="item in platformList"
                :key="item.platId"
                :label="item.platName"
                :value="item.platId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预测年月:">
            <el-select v-model="conditions.yearMonth" placeholder="请选择" style="width: 200px" class="f1">
              <el-option
                v-for="item in forecastYearMonthList"
                :key="item.source_ID"
                :label="item.source_NAME"
                :value="item.source_ID"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-date-picker v-model="conditions.yearMonth" type="month" format="yyyyMM" value-format="yyyyMM"></el-date-picker> -->
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="searchDataFromServer">检索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-add" @click="save">保存</el-button>
          </el-form-item>
        </el-form>
      </headerSearch>
    </el-container>
    <pagePanelNew headerTitle="作业公司产量跟踪" style="height: 100%">
      <div>
        <el-table
          :data="tableData"
          height="580"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <el-table-column align="center" label="当前作业井名" prop="wellNo"></el-table-column>
          <el-table-column align="center" label="预测版本" prop="forecastYearmonth"></el-table-column>
          <el-table-column align="center" label="当前作业措施" prop="measureTypeName"></el-table-column>
          <el-table-column align="center" label="产品类型" prop="productTypeName"></el-table-column>
          <el-table-column align="center" label="措施见效日期" prop="measureSeffectDate"></el-table-column>
          <el-table-column align="center" label="见效天数" prop="effectDays"></el-table-column>
          <el-table-column align="center" label="单井年配产量(m³)" prop="dailyAllocating">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.yearAllocating" size="small"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column align="center" label="备注" prop="remark">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remark" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button
                v-model="scope.row.wellMeasureImprovementId"
                size="small"
                @click="deleteRow(scope.row.wellMeasureImprovementId)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </pagePanelNew>
  </div>
</template>

<script>
//参数设置页面
import { getOrgInfo, getPlatInfo } from "@/api/oilDeposit/ipm-03/basedata";
// import { fetchALLOilFields } from "@/api/oilDeposit/rem-02/primaryinfo";
// // 导入方法
// import {getWellDailyMeasureInfo, insertWellDailyMeasureInfo, deleteWellDailyMeasureInfoByIds} from "@/api/rem-03/WellDailyMeasureImprove";
import { getForecastDate } from "@/api/oilDeposit/rem-03/oilfieldmanageplan";
export default {
  name: "WellDailyMeasureImprove",
  data() {
    return {
      loading: false, // 程序加载中标识
      conditions: {
        companyId: "", // 作业公司编号
        ogfId: "", // 油田编号
        platformId: "", // 平台编号
        yearMonth: "",
      },
      companyList: [], // 作业公司数据集
      ogfList: [], // 油田数据集
      platformList: [], // 平台数据集
      forecastYearMonthList: [],
      tableData: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await this.searchCompanyList();
      this.conditions.companyId = "29053E229AC34E70954249E0F084A20B"; //秦皇岛-勃中作业公司
      await this.changeOGFList(); // 调用查询油田接口查询油田数据
      this.conditions.ogfId = "3FC9A818F5BC43B88270DB80BBB3018F"; // QHD32-6油田
      await this.searchPlatFormList();

      this.getForecastDate(); //获取预测年月
    },

    //获取滚动预测日期下拉列表
    getForecastDate() {
      getForecastDate().then((res) => {
        console.log("getForecastDate==>", res);
        if (!res.data.code) {
          this.forecastYearMonthList = res.data.data;
        }
      });
    },

    /**
     * 查询数据
     * 触发方式
     * 1、页面初始化加载
     * 2、点击检索按钮触发
     */
    async searchDataFromServer() {
      if (!this.conditions.ogfId) {
        this.$message.error("请选择油田");
        return;
      }
      if (!this.conditions.yearMonth) {
        this.$message.error("请选择预测年月");
        return;
      }
      this.loading = true;
      let params = {
        rollingForecastDate: this.conditions.yearMonth,
        ogfId: this.conditions.ogfId,
        platform_id: this.conditions.platformId,
      };
      getWellDailyMeasureInfo(params).then((res) => {
        this.tableData = res.data.data;
        this.loading = false;
      });
    },

    /**
     * 保存结果
     * 策略:先删除，后保存
     */
    save() {
      this.$message.info("保存中...");
      insertWellDailyMeasureInfo(this.tableData).then((res) => {
        console.log(res);
        this.$message.info("保存成功...");
      });
    },

    /**
     * 查询作业公司列表
     * 页面初始化时加载
     */
    async searchCompanyList() {
      getOrgInfo().then((data) => {
        let code = data.data.code;
        if (code == 0) {
          this.companyList = data.data.data;
        }
      });
    },

    /**
     * 查询油田数据
     * 切换作业公司时触发
     */
    async changeOGFList() {
      //清空油田和平台的数据
      this.ogfList = [];
      this.platformList = [];
      this.conditions.ogfId = "";
      this.conditions.platformId = "";
      // 加载新数据
      fetchALLOilFields(this.conditions.companyId).then((res) => {
        let msg = res.data.msg;
        if (msg == "success") {
          let myData = res.data.data.oilFields;
          let array = [];
          myData.forEach((item) => {
            let ogf = {
              ogfId: item.oilFieldId,
              ogfName: item.name,
            };
            array.push(ogf);
          });
          this.ogfList = array;
        }
      });
    },

    /**
     * 查询平台列表
     * 切换油田时触发
     */
    searchPlatFormList() {
      this.platformList = [];
      getPlatInfo(this.conditions.ogfId).then((data) => {
        let code = data.data.code;
        if (code == 0) {
          this.platformList = data.data.data;
        }
      });
    },

    /**
     * 删除行
     * @param wellMeasureImprovementId
     */
    deleteRow(wellMeasureImprovementId) {
      let size = this.tableData.length;
      let delete_index;
      for (let i = 0; i < size; i++) {
        if (this.tableData[i].wellMeasureImprovementId == wellMeasureImprovementId) {
          delete_index = i;
          break;
        }
      }

      let array = [];
      array.push(wellMeasureImprovementId);
      // 删除信息
      deleteWellDailyMeasureInfoByIds(array).then((res) => {
        console.log(res);
      });
      this.tableData.splice(delete_index, 1);
      // this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {

      //   }).catch(() => {
      //   });
    },
  },
};
</script>

<style scoped></style>
