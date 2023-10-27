<!-- 分注井层段合格率 -->
<template>
  <div class="app-container">
    <header-search style="width: 100%; height: 80px">
      <div class="g-row-flex-V g-w100 g-h100">
        <div style="margin: 10px 20px 10px 0px">
          油田：
          <el-select v-model="queryParams.oilFieldId" @change="getFetchPlatforms">
            <el-option
              v-for="item in oilFieldList"
              :key="item.ogfId"
              :label="item.ogfName"
              :value="item.ogfId"
              @change="changeOgf"
            ></el-option>
          </el-select>
        </div>
        <div style="margin: 10px 20px 10px 0px">
          年度：
          <el-date-picker
            v-model="queryParams.beginDate"
            type="year"
            placeholder="选择年"
            value-format="yyyy"
            style="width: 160px"
            @change="createChange"
          ></el-date-picker>
          <!-- 日期：
          <el-date-picker
            v-model="queryParams.dates"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            unlink-panels
            @change="createChange"
          >
          </el-date-picker> -->
        </div>
        <div style="margin: 10px 20px 10px 0px">
          <el-button icon="el-icon-search" type="primary" @click="doSearch">搜索</el-button>
          <el-button icon="el-icon-refresh" class="commonBtn" @click="resetting">重置</el-button>
        </div>
        <div style="margin-left: auto">
          <el-button type="warning" plain class="commonBtn" @click="close">返回</el-button>
        </div>
      </div>
    </header-search>

    <page-panel-new class="app-content">
      <pagePanel headerTitle="分注井层段合格率" style="height: 500px" show-btn>
        <div class="g-row-flex-V" style="margin-bottom: 20px">
          <div style="margin-right: 20px">
            平台：
            <el-select v-model="queryParams.platFormId" clearable style="width: 220px">
              <el-option
                v-for="item in platformList"
                :key="item.platformId"
                :label="item.platformCode"
                :value="item.platformId"
              ></el-option>
            </el-select>
          </div>
          <div>
            <el-button icon="el-icon-search" type="primary" @click="doSearch">确定</el-button>
          </div>
        </div>
        <Echart :chart-data="sectionPassRate" height="calc(100% - 55px)"></Echart>
      </pagePanel>
      <el-row :gutter="20" style="padding-bottom: 20px">
        <el-col :span="12">
          <pagePanel :headerTitle="`${oilFieldName || ''}分注井层段合格率明细`" style="height: 550px" show-btn>
            <div style="display: flex; justify-content: space-between">
              <div style="margin-right: 20px">
                日期：
                <el-date-picker
                  v-model="queryParams.month"
                  type="month"
                  placeholder="选择月"
                  value-format="yyyy-MM"
                  @change="doSearch"
                ></el-date-picker>
              </div>
              <el-button
                style="margin-bottom: 20px"
                type="primary"
                @click="doDownExcel('#fzjcdhglmx', `${oilFieldName || ''}分注井层段合格率明细`)"
              >
                下载
              </el-button>
            </div>
            <el-table id="fzjcdhglmx" :data="tableData1" border highlight height="calc(100% - 130px)">
              <!-- :index="formatIndex"  -->
              <el-table-column
                label="序号"
                header-align="center"
                :index="formatIndex"
                align="center"
                type="index"
                width="80"
              ></el-table-column>
              <el-table-column prop="ogfName" label="油田" align="center" min-width="140"></el-table-column>
              <el-table-column prop="wellNo" label="注水井号" align="center" min-width="160"></el-table-column>
              <el-table-column prop="layerName" label="层段号" align="center" min-width="220"></el-table-column>
              <el-table-column
                prop="statisticsDate"
                :label="`年月日\n(yyy-mm-dd)`"
                align="center"
                min-width="120"
              ></el-table-column>
              <!-- :formatter="formatterBoolean1" -->
              <el-table-column prop="isUnqualified" label="是否合格" align="center" min-width="100"></el-table-column>
            </el-table>
            <pagination
              :total="total"
              :page.sync="queryParams.page"
              :limit.sync="queryParams.pageSize"
              :page-sizes="[10, 20, 50, 100]"
              :pager-count="5"
              layout="prev, pager, next, sizes, total"
              @pagination="handleTableChange"
            />
          </pagePanel>
        </el-col>
        <el-col :span="12">
          <pagePanel :headerTitle="`${oilFieldName || ''}单井层段合格明细`" style="height: 550px" show-btn>
            <div style="display: flex; justify-content: space-between">
              <div style="margin-right: 20px; margin-bottom: ">
                日期：
                <el-date-picker
                  v-model="queryParams.date"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  @change="doSearch"
                ></el-date-picker>
              </div>
              <el-button
                style="margin-bottom: 20px"
                type="primary"
                @click="doDownExcel('#djcdhgmx', `${oilFieldName || ''}单井层段合格明细`)"
              >
                下载
              </el-button>
            </div>
            <el-table id="djcdhgmx" :data="tableData2" border highlight height="calc(100% - 55px)">
              <!-- :index="formatIndex"  -->
              <el-table-column
                label="序号"
                header-align="center"
                align="center"
                type="index"
                width="80"
              ></el-table-column>
              <el-table-column prop="wellNo" label="井号" align="center" min-width="160"></el-table-column>
              <el-table-column
                prop="isSplit"
                label="是否分注"
                :formatter="formatterBoolean2"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="isBlending"
                label="是否调配"
                :formatter="formatterBoolean2"
                align="center"
              ></el-table-column>
              <el-table-column prop="totalLayers" label="总层段数" align="center"></el-table-column>
              <el-table-column prop="effectLayers" label="有效层段数" align="center"></el-table-column>
              <el-table-column prop="qualifieLayers" label="合格层段数" align="center"></el-table-column>
            </el-table>
          </pagePanel>
        </el-col>
      </el-row>
    </page-panel-new>
  </div>
</template>

<script>
import Echart from "@/components/tools/Echarts/index.vue";
import { dividingLayerQualityRate } from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
import { QueryOgfDetail, QueryPlatformDetail, userListByUserNames } from "@/api/rem/marster.js";
import { exportExcel } from "@/lib/exportExcel.js";
import dayjs from "dayjs";

export default {
  // name: "splitHole",
  components: {
    Echart,
  },
  data() {
    return {
      queryParams: {
        companyId: "715AD1CD60484BB59E737CD18A9DE44A", // 作业公司
        oilFieldId: "3FC9A818F5BC43B88270DB80BBB3018F", // 油田
        platFormId: "", // 平台
        // dates: [dayjs().format("YYYY-01-01"), dayjs().subtract(1, "day").format("YYYY-MM-DD")], // 时间范围集合
        beginDate: dayjs().format("YYYY"), // 开始时间
        // endDate: dayjs().subtract(1, "day").format("YYYY-MM-DD"), // 结束时间
        month: dayjs().subtract(1, "day").format("YYYY-MM"), // 分注井层段合格率明细 日期选择
        date: dayjs().subtract(1, "day").format("YYYY-MM-DD"), // 单井层段合格明细 日期选择
        isDesc: 1,
        page: 1,
        pageSize: 10,
      },
      total: 0, //  表格分页总数
      // 油田名称
      oilFieldName: "",
      //油田列表
      oilFieldList: [],
      //平台列表
      platformList: [],
      //分注井层段合格率
      sectionPassRate: {
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0],
            start: 0, //滚动条开始位置（共100等份）
            end: 100, //滚动条结束位置
          },
        ],
        title: {
          text: "分注井层段合格率",
          textStyle: {
            color: "#8FA4CC",
          },
          top: 0,
          left: "center",
        },
        grid: {
          x: 120,
          y: 80,
          x2: 120,
          y2: 60,
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "分注井层段合格率",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
              iconStyle: {
                opacity: 0,
              },
            },
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: [],
          textStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          x: "center",
          bottom: 0,
          icon: "rect",
          itemWidth: 12,
          itemHeight: 6,
          itemGap: 14,
        },
        xAxis: {
          name: "日期 (月)",
          nameTextStyle: {
            color: "#8FA4CC",
          },
          type: "category",
          axisLabel: {
            color: "#8FA4CC",
            fontSize: 14,
            padding: [10, 0, 0, 0],
          },
          axisTick: {
            show: true,
            inside: true,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#8FA4CC",
            },
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        yAxis: [
          {
            name: "分注井层段合格率 (%)",
            nameLocation: "middle",
            nameGap: 70,
            nameTextStyle: {
              color: "#8FA4CC",
            },
            type: "value",
            min: 0,
            max: 100,
            axisLabel: {
              color: "#8FA4CC",
            },
            scale: true,
            axisTick: {
              show: true,
              inside: true,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#8FA4CC",
              },
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,255,255,.16)",
              },
            },
          },
        ],
        color: ["#1379F7", "#FF5844", "#F5BE43", "#00BC9C", "#FF5844", "#DA835E", "#9A72FF", "#FF30AD", "#2ACAFF"],
        series: [],
      },
      // 表格数据
      tableData1: [],
      tableData2: [],
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    //重置
    resetting() {
      Object.assign(this.$data, this.$options.data());
      this.initData();
    },
    //表格序号
    formatIndex(index) {
      return (this.queryParams.page - 1) * this.queryParams.pageSize + index + 1;
    },
    //返回按钮
    close() {
      const obj = {
        name: "WaterInjectionIndexManagement",
      };
      this.$tab.closeOpenPage(obj);
    },
    //初始化页面
    async initData() {
      let params = {
        searchKeys: [this.$store.getters["user/userDetail"].user.userName],
      };
      await userListByUserNames(params).then((res) => {
        if (res.data.code == 200) {
          this.queryParams.companyId = res.data.data[0]?.currentTenantBindOrgId
            ? res.data.data[0].currentTenantBindOrgId
            : undefined;
        }
      });
      await QueryOgfDetail({ operationZoneId: this.queryParams.companyId }).then((data) => {
        let code = data.data.code;
        if (code == 200) {
          this.oilFieldList = data.data.data;
          if (this.queryParams.companyId === "715AD1CD60484BB59E737CD18A9DE44A") {
            this.queryParams.oilFieldId = "3FC9A818F5BC43B88270DB80BBB3018F";
          } else {
            this.queryParams.oilFieldId = this.oilFieldList[0].ogfId ? this.oilFieldList[0].ogfId : undefined;
          }
        }
      });
      // 获取平台信息
      this.getFetchPlatforms();
      // 分注井层段合格率图表数据
      this.doDividingLayerQualityRate();
    },
    //获得平台数据
    getFetchPlatforms() {
      this.queryParams.platFormId = "";
      QueryPlatformDetail({ ogfId: this.queryParams.oilFieldId }).then((res) => {
        //判断联通状态
        if (res.data.code == 200) {
          this.platformList = res.data.data;
          // this.queryParams.platFormId = res.data.data[0].platformId;
        }
      });
    },

    //油田切换
    changeOgf() {
      this.getFetchPlatforms();
    },
    //时间范围切换
    createChange(dates) {
      // if (dates && dates.length == 2) {
      // this.queryParams.beginDate = dates[0];
      // this.queryParams.endDate = dates[1];
      if (dayjs(this.queryParams.beginDate).format("YYYY") === dayjs().format("YYYY")) {
        this.queryParams.month = dayjs().format("YYYY-MM");
        this.queryParams.date = dayjs().format("YYYY-MM-DD");
      } else {
        this.queryParams.month = dayjs(this.queryParams.beginDate).endOf("month").format("YYYY-MM");
        this.queryParams.date = dayjs(this.queryParams.beginDate).endOf("month").format("YYYY-MM-DD");
      }
      // } else {
      //   this.queryParams.beginDate = "";
      //   this.queryParams.endDate = "";
      // }
    },
    //查询
    doSearch() {
      //分注井层段合格率
      this.doDividingLayerQualityRate();
    },
    /**
     *  监听表格分页变化
     * @param pagination 分页数据对象
     */
    handleTableChange(pagination) {
      this.queryParams.page = pagination.page;
      this.queryParams.pageSize = pagination.limit;
      this.doDividingLayerQualityRate();
    },
    //分注井层段合格率
    doDividingLayerQualityRate() {
      this.oilFieldName =
        this.oilFieldList.filter((item) => item.ogfId === this.queryParams.oilFieldId)[0].ogfName || "";
      dividingLayerQualityRate(this.queryParams, true).then((res) => {
        if (res?.data?.code == 200) {
          let legendData = [];
          let seriesData = [];
          let xData = [];
          let xSet = new Set();
          let resData = res.data.data;
          let barCharts = resData?.chart?.linearDataSets;
          this.tableData1 = resData.tableList && resData.tableList[0].length && resData.tableList[0][0].rows.length ? resData.tableList[0][0].rows : [];
          this.total = resData.tableList && resData.tableList[0].length && resData.tableList[0] ? resData.tableList[0][0].total : 0;
          this.tableData2 = resData.tableList && resData.tableList[1] ? resData.tableList[1] : [];
          if (barCharts) {
            barCharts.forEach((item, index) => {
              legendData.push(item.label);
              let series = {};
              series.name = item.label;
              series.type = "bar";
              series.barWidth = "22";
              series.label = {
                show: true,
                position: "top",
                color: "#8FA4CC",
              };
              let barData = item.linearData;
              let seriesMess = [];
              barData.forEach((dot, index) => {
                let point = [];
                point.push(dot.label);
                xSet.add(dot.label);
                point.push(dot.value);
                seriesMess.push(point);
              });
              series.data = seriesMess;
              seriesData.push(series);
            });
          }
          xData = Array.from(xSet).sort();
          this.sectionPassRate.xAxis.data = xData;
          this.sectionPassRate.legend.data = legendData;
          this.sectionPassRate.series = seriesData;
          this.sectionPassRate.title.text = `${this.oilFieldName || ""}${
            this.queryParams.beginDate ? this.queryParams.beginDate + "年" : ""
          }分注井层段合格率`;
        }
      });
    },
    //表格id 表格名称
    doDownExcel(tableId, tableName) {
      exportExcel(tableId, tableName);
    },
    //表格格式化方法 - 是否合格 1不合格 0合格
    formatterBoolean1(row, column) {
      return row[column.property] == 1 ? "否" : "是";
    },
    //表格格式化方法 - 是否分注、是否调配 0否 其它是
    formatterBoolean2(row, column) {
      return row[column.property] == 0 ? "否" : "是";
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  padding: 0 7px;
  height: 100%;
}
::v-deep .app-content {
  height: calc(100% - 100px) !important;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-bottom: 8px;
  .g-w100:first-child {
    padding-top: 0 !important;
  }
}

::v-deep .el-main {
  padding: 0px 0px 20px;
  overflow: hidden;
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

.el-col-4 {
  width: 20%;
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
</style>
