<!-- 模型 - 归因分析 -->
<template>
  <div style="width: 100%; height: calc(100% - 90px)" class="pageBox">
    <header-search class="g-w100 g-h100" style="height: auto">
      <div class="g-row-flex-V g-w100 g-h100">
        <div style="margin-top: 20px; width: 100%">
          <el-form :inline="true">
            <el-form-item label="作业公司:" style="margin-left: 30px">
              <el-select v-model="queryData.orgId" disabled>
                <el-option v-for="item in zygsSelect" :key="item.orgId" :label="item.orgName" :value="item.orgId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="油田:">
              <el-select v-model="queryData.ogfId" disabled style="width: 160px">
                <el-option v-for="(item, index) in oilFields" :key="index" :label="item.ogfName" :value="item.ogfId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="平台:">
              <el-select v-model="queryData.assetCode" @change="choicewell" style="width: 220px">
                <el-option
                  v-for="(item, index) in platforms"
                  :key="index"
                  :label="item.platformName"
                  :value="item.platformId"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="井号:">
              <el-select v-model="queryData.well" style="width: 170px">
                <el-option v-for="(item, index) in wellList" :key="index" :label="item.wellNo" :value="item.wellName">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="日期">
              <el-date-picker
                value-format="yyyy-MM-dd"
                :clearable="false"
                v-model="queryData.month"
                type="date"
                key="1"
                style="width: 170px"
                placeholder="选择月"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search">搜索</el-button>
              <el-button class="commonBtn" icon="el-icon-refresh"> 重置 </el-button>
            </el-form-item>

            <el-form-item style="float: right">
              <el-button type="primary" icon="el-icon-back" @click="returnrouter">返回</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </header-search>
    <page-panel-new headerTitle="归因分析报告" style="height: 100%" class="g-w100" :show-btn="true">
      <el-row :gutter="20" style="height:100%">
        <el-col :span="10">
          <pagePanel headerTitle="采液强度分析流程图" style="height: 100%" class="g-w100" :show-btn="true"> </pagePanel>
        </el-col>
        <el-col :span="14"  style="height:100%">
          <pagePanel headerTitle="采液强度分析关键参数明细表" style="height: 100%" class="g-w100" :show-btn="true">
            <el-table
              height="100%"
              :row-style="{ height: '0px' }"
              :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
              header-cell-class-name="table_header"
              :cell-style="{ padding: '3px', 'text-align': 'center' }"
              :data="tableData"
              show-summary
              border
              ref="reset"
              style="width: 100%; height: 100%"
              id="cjyzsj"
              :default-sort="{ prop: 'date', order: 'descending' }"
            >
              <el-table-column prop="null" label="井号"> </el-table-column>
              <el-table-column prop="null" :label="`采液强度\n(m³/mPa)`"> </el-table-column>
              <el-table-column prop="null" label="含水率(%)"> </el-table-column>
              <el-table-column prop="null" label="动液面(m)"> </el-table-column>
              <el-table-column prop="null" label="储层物性"> </el-table-column>
              <el-table-column prop="null" :label="`地层压力\n(mPa)`">></el-table-column>
              <el-table-column prop="null" :label="`*关停结束时间\n(yyyy/mm/dd)`"> </el-table-column>
              <el-table-column prop="null" label="出砂情况"> </el-table-column>
            </el-table>
          </pagePanel>
        </el-col>
      </el-row>
    </page-panel-new>
  </div>
</template>
<script>
import {
  queryOperatorsCheckFieldListsDetail,
  queryListOfOilfieldQueryPlatformsDetail,
  queryOperatingCompanyDetail,
  queryPlatformQueryWellListDetail,
} from "@/api/rem/marster.js";
export default {
  components: {},
  props: {
    infoData: {
      // default: false,
      // type: Boolean,
    },
  },
  data() {
    return {
      queryData: {
        assetCode: "",
        month: "",
        ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
        orgId: "715AD1CD60484BB59E737CD18A9DE44A",
        beginDate: "",
        endDate: "",
        well: "",
      },
      pickerOption: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      tableData: [],
      oilFields: [],
      platforms: [],
      wellList: {},
      zygsSelect: [], //作业公司
    };
  },
  mounted() {
    this.getData();
    var data = new Date();
    var time = data.getTime() - 24 * 60 * 60 * 1000;
    var time = new Date().getTime() - 24 * 60 * 60 * 1000;
    var yesday = new Date(time); // 获取的是前一天日期
    yesday =
      yesday.getFullYear() +
      "-" +
      (yesday.getMonth() > 9 ? yesday.getMonth() + 1 : "0" + (yesday.getMonth() + 1)) +
      "-" +
      (yesday.getDate() > 9 ? yesday.getDate() : "0" + yesday.getDate()); //字符串拼接转格式
    this.queryData.month = yesday;
  },
  methods: {
    getData() {
      queryOperatingCompanyDetail({}).then((res) => {
        this.zygsSelect = res.data.data;
      });
      queryOperatorsCheckFieldListsDetail({ orgId: "715AD1CD60484BB59E737CD18A9DE44A" }).then((res) => {
        if (res.data.code == 200) {
          this.oilFields = res.data.data;
          if (this.oilFields.length == 0) {
            this.oilField = "";
          } else {
            this.oilField = "3FC9A818F5BC43B88270DB80BBB3018F";
          }
          this.selectOilField = "3FC9A818F5BC43B88270DB80BBB3018F";
          const requestPlat = {
            ogfId: this.selectOilField,
          };
          queryPlatformQueryWellListDetail(requestPlat).then((res) => {
            this.wellList = res.data.data;
          });
          queryListOfOilfieldQueryPlatformsDetail(requestPlat).then((res) => {
            if (res.data.code == 200) {
              this.platforms = res.data.data;
              this.platforms.map((n) => {
                if (n.platformName == "全部") {
                  n.platformId = "";
                }
              });
              this.queryData.assetCode = "";
            }
          });
        }
      });
    },
    choicewell() {
      queryPlatformQueryWellListDetail({ platformId: this.queryData.assetCode }).then((res) => {
        this.wellList = res.data.data;
      });
    },
    // 返回按钮
    returnrouter() {
      this.$router.go(-1);
    },
    queryinfo(data) {},
    getList() {
      getFactoryRunTime({});
    },
  },
};
</script>

<style scoped lang="scss">
.pageBox {
  color: var(--formText);
  position: relative;
  font-family: PingFangSC-Regular, PingFang SC;
}

.topSearchDiv {
  display: flex;
}

.btnPosition {
  margin: 0 0 20px 0;
  justify-content: flex-end;
}

::v-deep .el-table__footer-wrapper td.el-table__cell {
  text-align: center;
}
::v-deep.el-table .el-table__footer-wrapper .cell {
  color: rgb(174, 178, 179);
  font-weight: bolder;
}
::v-deep .el-table--border th.gutter:last-of-type {
  display: block !important;
  width: 17px !important;
}
</style>
<style lang="scss" scoped>
::v-deep .el-main {
  padding: 0px 0px 20px;
  overflow: hidden;
}
::v-deep .btnStyle {
  margin-bottom: 0px;
}
.formBox {
  & > div:not(:first-child) {
    margin-left: 20px;
  }
}
.basicTable {
  height: auto;
  // padding-bottom: 10px;
}
::v-deep .el-table .cell {
  white-space: pre-line;
}
::v-deep .el-table .cell:empty::before {
  content: "-";
}
::v-deep .el-table__header-wrapper {
  .cell {
    height: auto !important;
    line-height: 1.5 !important;
    white-space: pre;
  }
}
::v-deep .el-tabs__header {
  margin: 0;
}
</style>
