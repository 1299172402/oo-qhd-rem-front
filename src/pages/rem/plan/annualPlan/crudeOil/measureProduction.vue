<!-- 措施产量 -->
<template>
  <div class="tab-container">
    <pagePanel
      :headerTitle="searchForm.oilFieldName + '措施产量图'"
      :style="{ marginTop: 0, height: height + 'px' }"
      show-btn
    >
      <!-- <div slot-name="titleContent">
                <el-button type="primary" style="position: absolute;right:50px;top:6px;height:30px;" @click="downEchart">下载</el-button>
            </div> -->
      <Echart ref="echartChart" :chart-data="productLineChart" height="100%"></Echart>
    </pagePanel>
    <div class="develop">
      <span :class="[isDevelop ? 'top-span' : 'active-span']" @click="tapDevelop"></span>
    </div>
    <pagePanel :headerTitle="searchForm.oilFieldName + '措施产量表'" style="height: 580px" show-btn v-show="isDevelop">
      <div slot-name="titleContent" style="display: flex; justify-content: flex-end">
        <el-button icon="el-icon-download" type="primary" style="margin-bottom: 20px" @click="downTable"
          >下载</el-button
        >
      </div>
      <el-table
        id="tableData"
        :data="tableData"
        border
        :row-style="{ height: '0px' }"
        header-cell-class-name="table_header"
        :cell-style="{ padding: '6px' }"
        style="width: 100%"
        height="calc(100% - 130px)"
        :default-sort="{ prop: 'date', order: 'descending' }"
        :header-cell-style="{ padding: '0px 0' }"
      >
        <el-table-column type="index" align="center" label="序号" width="80" :index="tableIndex"></el-table-column>
        <el-table-column prop="prodDate" header-align="center" align="center" :label="`时间\n(yyyy-mm-dd)`">
        </el-table-column>
        <el-table-column
          prop="measureWellNumReal"
          header-align="center"
          align="center"
          :label="searchForm.selectUnitOfProduction == 'm' ? '实际措施井次\n(次)' : '实际措施井次\n(次)'"
        ></el-table-column>
        <el-table-column
          prop="measureWellNumPlan"
          header-align="center"
          align="center"
          :label="searchForm.selectUnitOfProduction == 'm' ? '计划措施井次\n(次)' : '计划措施井次\n(次)'"
        ></el-table-column>
        <el-table-column
          prop="oilprodReal"
          header-align="center"
          align="center"
          :label="searchForm.selectUnitOfProduction == 'm' ? '实际产量\n(m³/d)' : '实际产量\n(t/d)'"
          :formatter="toPrecise2"
        ></el-table-column>
        <el-table-column
          prop="oilprodPlan"
          header-align="center"
          align="center"
          :label="searchForm.selectUnitOfProduction == 'm' ? '计划产量\n(m³/d)' : '计划产量\n(t/d)'"
          :formatter="toPrecise2"
        ></el-table-column>
        <el-table-column
          prop="oilprodRollForecast"
          align="center"
          :label="searchForm.selectUnitOfProduction == 'm' ? '滚动预测\n(m³)' : '滚动预测\n(t)'"
          :formatter="toPrecise2"
        ></el-table-column>
      </el-table>
      <pagination v-if="total" :total="total" :page="page" :limit="pageSize" @pagination="pagination" />
    </pagePanel>
  </div>
</template>

<script>
import Echart from "@/components/tools/Echarts/index.vue";
import { measureChart } from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
import { measureTable } from "@/api/oilDeposit/rem-04/plan.js";
import { exportExcel } from "@/lib/exportExcel.js";
export default {
  components: {
    Echart,
  },
  props: {
    searchForm: {
      type: Object,
      default: () => {
        return {
          selectOilField: "",
          oilFieldName: "",
          selectDate: [],
          planTypeCode: "",
          rollForecastVersion: "",
          selectUnitOfProduction: "",
        };
      },
    },
  },
  data() {
    return {
      height: "",
      productLineChart: {
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: (this.searchForm.oilFieldName ? this.searchForm.oilFieldName : "") + "措施产量图",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
              iconStyle: {
                opacity: 0,
              },
            },
          },
        },
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0],
            start: 0, //滚动条开始位置（共100等份）
            end: 100, //滚动条结束位置
          },
        ],
        color: ["#69b146", "#DA835E", "#FF5844", "#00BC9C", "#9A72FF", "#F5BE43"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter(params) {
            var relVal = params[0].name;
            params.forEach((item) => {
              if (item.seriesName == "实际措施井次" || item.seriesName == "计划措施井次") {
                relVal += "<br/>" + item.marker + item.seriesName + " : " + (item.value[1] || 0);
              } else {
                relVal += "<br/>" + item.marker + item.seriesName + " : " + parseFloat(item.value[1] || 0).toFixed(2);
              }
            });
            return relVal;
          },
        },
        grid: {
          x: 120,
          y: 50,
          x2: 120,
          y2: 100,
        },
        legend: {
          data: [],
          textStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          x: "center",
          bottom: 30,
          icon: "rect",
          itemWidth: 12,
          itemHeight: 6,
          itemGap: 14,
        },
        xAxis: {
          name: "日期 (日)",
          // nameTextStyle: {
          //     color: '#8FA4CC',
          //     fontSize: 14,
          // },
          // nameLocation: 'center',
          nameGap: 30,
          type: "category",
          axisLabel: {
            color: "#8FA4CC",
            padding: [10, 0, 0, 0],
            fontSize: 14,
            showMinLabel: true,
            showMaxLabel: true,
            // interval: function (index, val) {
            //   if (val.substr(-2) == "01") {
            //     return true;
            //   } else {
            //     return false;
            //   }
            // },
            // rotate: 20,
          },
          axisTick: {
            show: true,
            inside: true,
          },
          axisLine: {
            lineStyle: {
              color: "#8FA4CC",
            },
          },
        },
        yAxis: [
          {
            type: "value",
            name: "产油量(m³)",
            nameTextStyle: {
              color: "#8FA4CC",
              fontSize: 14,
            },
            nameLocation: "center",
            nameGap: 70,
            axisLabel: {
              color: "#8FA4CC",
              fontSize: 14,
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
                color: "#8FA4CC",
              },
            },
          },
          {
            type: "value",
            name: "措施井次(口)",
            nameTextStyle: {
              color: "#8FA4CC",
              fontSize: 14,
            },
            nameLocation: "center",
            nameGap: 70,
            axisLabel: {
              color: "#8FA4CC",
              fontSize: 14,
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
                color: "#8FA4CC",
              },
            },
          },
        ],
        series: [],
      },
      isDevelop: false, //是否展示表格
      tableData: [],
      page: 1,
      pageSize: 10,
      total: 0,
    };
  },
  mounted() {
    this.height = document.getElementById("pagePanelNew").scrollHeight - 40 - 46 - 50 - 7 - 15;
    this.initData();
  },
  methods: {
    async initData() {
      this.$nextTick(() => {
        this.getMeasureChart();
        this.getMeasureTable();
      });
    },
    //echart数据获取
    getMeasureChart() {
      let request = {
        oilFieldId: this.searchForm.selectOilField,
        unitType: this.searchForm.selectUnitOfProduction,
        beginDate: this.searchForm.selectDate[0],
        endDate: this.searchForm.selectDate[1],
        planTypeCode: this.searchForm.planTypeCode,
        rollForecastVersion: this.searchForm.rollForecastVersion,
      };
      measureChart(request).then((res) => {
        if (res.data.code == 200) {
          //图例数据
          let legendData = [];
          //数据数据
          let seriesData = [];
          //x轴数据 对应x轴数据显示不全的情况
          let xSet = new Set();
          //获得调数据
          let chartDataS = res.data.data.chart.linearDataSets;
          for (let i = 0; i < chartDataS.length; i++) {
            legendData.push(chartDataS[i].label);
            let linearChart = chartDataS[i];
            let series = {};
            series.name = linearChart.label;
            series.type = "line";
            series.symbol = "none";
            let name = linearChart.label;
            if (name == "实际措施井次") {
              series.yAxisIndex = 1;
            } else if (name == "计划措施井次") {
              series.yAxisIndex = 1;
            } else if (name == "实际注入量") {
              series.yAxisIndex = 0;
            } else if (name == "计划注入量") {
              series.yAxisIndex = 0;
            } else if (name == "滚动预测") {
              series.yAxisIndex = 0;
            }
            let seriesDataD = [];
            let linearData = linearChart.linearData;
            for (let i = 0; i < linearData.length; i++) {
              let point = [];
              //获得x坐标点,去重
              xSet.add(linearData[i].label.substring(0, 10));
              //拼写每个坐标点的数据
              point.push(linearData[i].label.substring(0, 10));
              point.push(linearData[i].value);
              seriesDataD.push(point);
            }
            //放入数据集合
            series.data = seriesDataD;
            //放入series集合中
            seriesData.push(series);
          }
          //set 集合转数组
          let xData = Array.from(xSet).sort();
          this.productLineChart.xAxis.data = xData;
          //console.log(xData);
          if (this.searchForm.selectUnitOfProduction == "t") {
            this.productLineChart.yAxis[0].name = "产油量(t)";
          } else if (this.searchForm.selectUnitOfProduction == "m") {
            this.productLineChart.yAxis[0].name = "产油量(m³)";
          }
          //图例数据
          this.productLineChart.legend.data = legendData;
          this.productLineChart.series = seriesData;
          //井口次
          this.productWellCount = res.data.data.times;
          //增油量
          this.productionOilCount = res.data.data.injection;
        }
      });
    },
    //表格数据获取
    getMeasureTable() {
      let request = {
        oilFieldId: this.searchForm.selectOilField,
        unitType: this.searchForm.selectUnitOfProduction,
        beginDate: this.searchForm.selectDate[0],
        endDate: this.searchForm.selectDate[1],
        planTypeCode: this.searchForm.planTypeCode,
        rollForecastVersion: this.searchForm.rollForecastVersion,
        pageNum: this.page,
        pageSize: this.pageSize,
      };
      measureTable(request).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.rows;
          this.total = res.data.total;
        } else {
          this.tableData = [];
          this.total = 0;
        }
      });
    },
    //保留两位小数
    toPrecise2(row, column, cellValue, index) {
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
    //表格自定义索引
    tableIndex(index) {
      index = index + 1 + (this.page - 1) * this.pageSize;
      return index;
    },
    //分页
    pagination(obj) {
      if (this.pageSize != obj.limit) {
        this.page = 1;
        this.pageSize = obj.limit;
      } else {
        this.page = obj.page;
      }
      this.getMeasureTable();
    },
    //表格-展示||隐藏
    tapDevelop() {
      this.isDevelop = !this.isDevelop;
      if (this.isDevelop) {
        this.$nextTick(() => {
          let parentDom = document.getElementsByClassName("tab-container")[0];
          parentDom.scrollBy({ top: this.height, behavior: "smooth" });
        });
      }
    },
    //下载echarts
    downEchart() {
      this.$refs.echartChart.chartDownLoad(this.searchForm.oilFieldName + "措施产量图");
    },
    //导出table
    downTable() {
      exportExcel("#tableData", this.searchForm.oilFieldName + "措施产量表");
    },
  },
};
</script>

<style lang="scss" scoped>
.tab-container {
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-top: 7px;
  padding-left: 7px;
  padding-right: 15px;
  padding-bottom: 15px;

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
}
</style>
