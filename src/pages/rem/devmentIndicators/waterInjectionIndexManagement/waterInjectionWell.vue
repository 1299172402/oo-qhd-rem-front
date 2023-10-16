<!-- 注水井分注率 -->
<template>
  <div class="app-container">
    <header-search style="width: 100%; height: 80px">
      <div class="g-row-flex-V g-w100 g-h100">
        <div style="margin: 10px 20px 10px 0px">
          油田：
          <el-select v-model="queryParams.oilFieldId" >
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
            v-model="queryParams.year"
            type="year"
            placeholder="选择年"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
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
      <pagePanel headerTitle="注水井分注率" style="height: 500px" show-btn>
        <Echart :chart-data="waterInjectionRate" height="100%"></Echart>
      </pagePanel>
      <pagePanel :headerTitle="`${oilFieldName || ''}注水井分注率明细`" style="height: 550px" show-btn>
        <div style="display: flex; justify-content: flex-end">
          <el-button
            style="margin-bottom: 20px"
            type="primary"
            @click="doDownExcel('#zhjfzlmx', `${oilFieldName || ''}注水井分注率明细`)"
          >
            下载
          </el-button>
        </div>
        <el-table id="zhjfzlmx" :data="tableData" highlight height="calc(100% - 55px)">
          <!-- :index="formatIndex"  -->
          <el-table-column label="序号" header-align="center" align="center" type="index" width="60"></el-table-column>
          <el-table-column prop="platFormName" label="平台" align="center"></el-table-column>
          <el-table-column
            prop="null"
            :label="`考核指标\n分注率\n(%)`"
            align="center"
            min-width="70"
            :formatter="toPrecise2"
          ></el-table-column>
          <el-table-column label="计划指标" align="center">
            <el-table-column
              prop="planTotalWellCount"
              :label="`总注水井数\n(口)`"
              align="center"
              min-width="70"
            ></el-table-column>
            <el-table-column
              prop="planSplitRatioWellCount"
              :label="`分注井数\n(口)`"
              align="center"
              min-width="70"
            ></el-table-column>
            <el-table-column
              prop="planSplitRatioRate"
              :label="`分注率\n(%)`"
              align="center"
              min-width="70"
              :formatter="toPrecise2"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="实际指标" align="center">
            <el-table-column
              prop="totalWellCount"
              :label="`总注水井数\n(口)`"
              align="center"
              min-width="70"
            ></el-table-column>
            <el-table-column
              prop="splitRatioWellCount"
              :label="`分注井数\n(口)`"
              align="center"
              min-width="70"
            ></el-table-column>
            <el-table-column
              prop="splitRatioRate"
              :label="`分注率\n(%)`"
              align="center"
              min-width="70"
              :formatter="toPrecise2"
            ></el-table-column>
          </el-table-column>
        </el-table>
      </pagePanel>
    </page-panel-new>
  </div>
</template>

<script>
import Echart from "@/components/tools/Echarts/index.vue";
import { injectionWellDividingRate } from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
import { QueryOgfDetail, userListByUserNames } from "@/api/rem/marster.js";

import { exportExcel } from "@/lib/exportExcel.js";
import dayjs from "dayjs";

export default {
  // name: "waterQuality",
  components: {
    Echart,
  },
  data() {
    return {
      queryParams: {
        companyId: "715AD1CD60484BB59E737CD18A9DE44A", // 作业公司
        oilFieldId: "3FC9A818F5BC43B88270DB80BBB3018F", // 油田
        year: dayjs().format("YYYY-MM-DD"), // 时间年份
        // dates: [dayjs().subtract(7, "day").format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD")], // 时间范围集合
        // beginDate: dayjs().subtract(7, "day").format("YYYY-MM-DD"), // 开始时间
        // endDate: dayjs().format("YYYY-MM-DD"), // 结束时间
        // pageNum: 1,
        // pageSize: 9999,
        isDesc: 1,
      },
      // 油田名称
      oilFieldName: "",
      //油田列表
      oilFieldList: [],
      //注水井分注率
      waterInjectionRate: {
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0],
            start: 0, //滚动条开始位置（共100等份）
            end: 100, //滚动条结束位置
          },
        ],
        title: {
          text: "注水井分注率",
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
              name: "注水井分注率",
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
          name: "平台",
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
            show: false,
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
            name: "注水井分注率 (%)",
            nameLocation: "middle",
            nameGap: 70,
            nameTextStyle: {
              color: "#8FA4CC",
              fontSize: 14,
            },
            type: "value",
            min: 0,
            max: 100,
            axisLabel: {
              color: "#8FA4CC",
            },
            scale: true,
            axisTick: {
              show: false,
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
      tableData: [],
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
    // 表格序号
    formatIndex(index) {
      return (this.queryParams.pageNum - 1) * this.queryParams.pageSize + index + 1;
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
          this.queryParams.companyId =
            res.data.data[0] && res.data.data[0]?.tenantInfos && res.data.data[0]?.tenantInfos[0]
              ? res.data.data[0].tenantInfos[0]?.deptId
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
      // 注水井分注率图表数据
      this.doInjectionWellDividingRate();
    },

    //油田切换
    changeOgf() {
      // getPlatInfo(this.queryParams.ogfId).then((data) => {
      //   this.queryParams.platId = null;
      //   let code = data.data.code;
      //   if (code == 200) {
      //     this.platformList = data.data.data;
      //   } else {
      //     this.platformList = [];
      //   }
      // });
    },
    //时间范围切换
    createChange(dates) {
      if (dates && dates.length == 2) {
        this.queryParams.beginDate = dates[0];
        this.queryParams.endDate = dates[1];
      } else {
        this.queryParams.beginDate = "";
        this.queryParams.endDate = "";
      }
    },
    //查询
    doSearch() {
      //注水井分注率
      this.doInjectionWellDividingRate();
    },
    //注水井分注率
    doInjectionWellDividingRate() {
      this.oilFieldName = this.oilFieldList.filter((item) => item.ogfId === this.queryParams.oilFieldId)[0].ogfName || "";
      injectionWellDividingRate(this.queryParams).then((res) => {
        if (res.data.code == 200) {
          let legendData = [];
          let seriesData = [];
          let xData = [];
          let xSet = new Set();
          let resData = res.data.data;
          let barCharts = resData?.chart?.barDataSets;
          this.tableData = resData.tableList ? resData.tableList[0] : [];
          barCharts.forEach((item, index) => {
            legendData.push(item.label);
            let series = {};
            series.name = item.label;
            series.type = "bar";
            series.barWidth = "22";
            series.max = 100;
            series.label = {
              show: true,
              position: "top",
              color: "#8FA4CC",
            };
            series.itemStyle = {
              normal: {
                borderRadius: [7, 7, 0, 0],
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    // 四个数字分别对应 数组中颜色的开始位置，分别为 右，下，左，上。例如（1,0,0,0 ）代表从右边开始渐
                    // 变。offset取值为0~1，0代表开始时的颜色，1代表结束时的颜色，柱子表现为这两种颜色的渐变。
                    offset: 0,
                    color: "#16c8ed",
                  },
                  {
                    offset: 1,
                    color: "#0f66ea",
                  },
                ]),
              },
            };
            let barData = item.barDatas;
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
          xData = Array.from(xSet).sort();
          this.waterInjectionRate.xAxis.data = xData;
          this.waterInjectionRate.legend.data = legendData;
          this.waterInjectionRate.series = seriesData;
          this.waterInjectionRate.title.text = `${this.oilFieldName || ""}${
            this.queryParams.year ? dayjs(this.queryParams.year).format("YYYY") + "年" : ""
          }注水井分注率`;
        }
      });
    },
    //表格id 表格名称
    doDownExcel(tableId, tableName) {
      exportExcel(tableId, tableName);
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
.app-container {
  padding: 0 7px;
  height: 100%;
}
::v-deep .app-content {
  height: calc(100% - 100px) !important;
  overflow-y: scroll;
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
