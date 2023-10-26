<!--井组开发曲线-->
<template>
  <div class="z-main">
    <div class="z-search">
      <span>日期：</span>
      <el-date-picker
        v-model="selectData"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
    </div>
    <div class="z-echarts">
      <page-panel headerTitle="井组开发曲线图" :style="{ height: height + 'px', marginTop: 0 }" show-btn>
        <Echarts ref="echartDown" :chart-data="option" height="100%"></Echarts>
      </page-panel>
      <div class="develop">
        <span :class="[isDevelop ? 'top-span' : 'active-span']" @click="tapDevelop"></span>
      </div>
      <page-panel headerTitle="井组开发曲线" style="height: 500px" show-btn v-show="isDevelop">
        <el-table
          id="tableData"
          :data="tableData"
          border
          :row-style="{ height: '0px' }"
          header-cell-class-name="table_header"
          :cell-style="{ padding: '6px', 'text-align': 'center' }"
          style="width: 100%"
          height="100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
          :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
        >
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="time" :label="`时间\n(yyyy-mm-dd)`"> </el-table-column>
          <el-table-column prop="fluidProdDaily" :label="`日产液\n(m³)`" :formatter="toPrecise2"></el-table-column>
          <el-table-column prop="oilProdDail" :label="`日产油\n(m³)`" :formatter="toPrecise2"></el-table-column>
          <el-table-column prop="waterRatio" :label="`含水率\n(%)`" :formatter="toPrecise2"></el-table-column>
          <el-table-column prop="gasOilRatio" :label="`气油比\n(m³/m³)`" :formatter="toPrecise2"></el-table-column>
          <el-table-column prop="wellSumtOil" :label="`油井总井数\n(口)`"></el-table-column>
          <el-table-column prop="wellStartOil" :label="`油井开井数\n(口)`"></el-table-column>
          <el-table-column prop="wellSumInj" :label="`水井总井数\n(口)`"></el-table-column>
          <el-table-column prop="wellStartInj" :label="`水井开井数\n(口)`"></el-table-column>
          <el-table-column prop="injData" :label="`日注水\n(m³)`" :formatter="toPrecise2"></el-table-column>
        </el-table>
      </page-panel>
    </div>
  </div>
</template>

<script>
import Echarts from "@/components/tools/Echarts/index.vue";
import { wellGroupDevLineCharts } from "@/api/oilDeposit/rem-01/wellgroupdynamicanalysis.js";
import FileSaver from "file-saver";
import { exportExcel } from "@/lib/exportExcel.js";
export default {
  components: {
    Echarts,
  },
  props: {
    //油田id
    oilFieldId: {},
    //区块id
    blockId: {},
    //井组切换
    wellCentre: {},
    //井组id
    wellGroupId: {},
  },
  data() {
    return {
      height: "",
      selectData: [],
      option: {
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0, 1, 2],
            start: 0, //滚动条开始位置（共100等份）
            end: 100, //滚动条结束位置
          },
        ],
        title: {},
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          textStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          x: "center",
          bottom: 5,
          icon: "rect",
          itemWidth: 12,
          itemHeight: 6,
          itemGap: 14,
        },
        toolbox: {
          show: false,
          feature: {
            saveAsImage: {
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
              iconStyle: {
                opacity: 0,
              },
            },
          },
        },
        grid: [
          {
            left: "10%",
            top: "6%",
            width: "80%",
            height: "24%",
          },
          {
            left: "10%",
            top: "36%",
            width: "80%",
            height: "24%",
          },
          {
            left: "10%",
            top: "64%",
            width: "80%",
            height: "24%",
          },
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: "category",
            data: [
              "2018-01",
              "2018-04",
              "2018-06",
              "2018-10",
              "2019-01",
              "2019-04",
              "2019-06",
              "2019-10",
              "2020-01",
              "2020-04",
              "2020-06",
              "2020-10",
            ],
            textStyle: {
              fontSize: 14,
            },
            axisLabel: {
              show: false,
              color: "#8FA4CC",
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
          },
          {
            gridIndex: 1,
            type: "category",
            data: [
              "2018-01",
              "2018-04",
              "2018-06",
              "2018-10",
              "2019-01",
              "2019-04",
              "2019-06",
              "2019-10",
              "2020-01",
              "2020-04",
              "2020-06",
              "2020-10",
            ],
            textStyle: {
              fontSize: 14,
            },
            axisLabel: {
              show: false,
              color: "#8FA4CC",
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
          },
          {
            name: "日期 (日)",
            nameGap: 28,
            gridIndex: 2,
            type: "category",
            data: [
              "2018-01",
              "2018-04",
              "2018-06",
              "2018-10",
              "2019-01",
              "2019-04",
              "2019-06",
              "2019-10",
              "2020-01",
              "2020-04",
              "2020-06",
              "2020-10",
            ],
            textStyle: {
              fontSize: 14,
            },
            axisLabel: {
              //show: false,
              color: "#8FA4CC",
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
          },
        ],
        yAxis: [
          {
            gridIndex: 0,
            name: "油\n气\n井\n总\n井\n数\n︵\n口\n︶",
            nameLocation: "center",
            nameRotate: 0,
            nameGap: 50,
            nameTextStyle: {
              color: "#030303",
              fontSize: 14,
            },
            minInterval: 1,
            scale: true,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
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
            },
          },
          {
            gridIndex: 0,
            name: "油\n气\n井\n开\n井\n数\n︵\n口\n︶",
            nameLocation: "center",
            nameRotate: 360,
            nameGap: 50,
            nameTextStyle: {
              color: "#bf282c",
              fontSize: 14,
            },
            minInterval: 1,
            offset: 80,
            position: "left",
            scale: true,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
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
            },
          },
          {
            gridIndex: 0,
            name: "水\n井\n总\n井\n数\n︵\n口\n︶",
            nameLocation: "center",
            nameRotate: 360,
            nameGap: 50,
            nameTextStyle: {
              color: "#294f97",
              fontSize: 14,
            },
            minInterval: 1,
            position: "right",
            scale: true,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
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
            },
          },
          {
            gridIndex: 0,
            name: "水\n井\n开\n井\n数\n︵\n口\n︶",
            nameLocation: "center",
            nameRotate: 360,
            nameGap: 50,
            nameTextStyle: {
              color: "#9b5497",
              fontSize: 14,
            },
            minInterval: 1,
            position: "right",
            offset: 80,
            scale: true,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
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
            },
          },
          {
            gridIndex: 1,
            name: "日\n产\n液\n︵\nm³\n︶",
            nameLocation: "center",
            nameGap: 50,
            nameRotate: 0,
            nameTextStyle: {
              color: "rgb(250,0,251)",
              fontSize: 14,
            },
            scale: true,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
            },
            axisTick: {
              show: true,
              inside: true,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgb(165,42,42)",
              },
            },
            splitLine: {
              show: false,
            },
          },
          {
            gridIndex: 1,
            name: "日\n产\n油\n︵\nm³\n︶",
            nameLocation: "center",
            nameRotate: 0,
            nameGap: 50,
            nameTextStyle: {
              color: "#69b146",
              fontSize: 14,
            },
            position: "left",
            offset: 80,
            scale: true,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
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
            },
          },
          {
            gridIndex: 1,
            name: "含\n水\n率\n︵\n%\n︶",
            nameLocation: "center",
            nameRotate: 360,
            nameGap: 50,
            nameTextStyle: {
              color: "#284f96",
              fontSize: 14,
            },
            position: "right",
            scale: true,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
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
            },
          },
          {
            gridIndex: 2,
            name: "注\n采\n比",
            nameLocation: "center",
            nameRotate: 360,
            nameGap: 50,
            nameTextStyle: {
              color: "#8FA4CC",
              fontSize: 14,
            },
            scale: true,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
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
            },
          },
          {
            gridIndex: 2,
            name: "累\n积\n注\n采\n比",
            nameLocation: "center",
            nameRotate: 360,
            nameGap: 50,
            nameTextStyle: {
              color: "#8FA4CC",
              fontSize: 14,
            },
            offset: 80,
            position: "left",
            scale: true,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
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
            },
          },
          {
            gridIndex: 2,
            name: "气\n油\n比\n︵\nm³\n/\nm³\n︶",
            nameLocation: "center",
            nameRotate: 360,
            nameGap: 50,
            nameTextStyle: {
              color: "#d92d28",
              fontSize: 14,
            },
            position: "right",
            scale: true,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
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
            },
          },
          {
            gridIndex: 2,
            name: "日\n注\n水\n︵\nm³\n︶",
            nameLocation: "center",
            nameRotate: 360,
            nameGap: 50,
            nameTextStyle: {
              color: "#61bcc4",
              fontSize: 14,
            },
            position: "right",
            offset: 80,
            scale: true,
            axisLabel: {
              show: true,
              color: "#8FA4CC",
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
            },
          },
        ],
        series: [],
      },
      isDevelop: false, //是否展示表格
      tableData: [],
    };
  },
  mounted() {
    this.height = document.getElementsByClassName("z-echarts")[0].scrollHeight - 50;
    console.log(this.height);

    let year = new Date().getFullYear();
    this.selectData = [new Date(year + "-01-01").format("yyyy-MM-dd"), new Date().format("yyyy-MM-dd")];
    this.doSearch();
  },
  methods: {
    //根据条件搜索 - 生成相应的图形
    doSearch() {
      let beginDate = this.selectData[0];
      let endDate = this.selectData[1];
      let request = {
        beginDate: beginDate,
        endDate: endDate,
        oilFieldId: this.oilFieldId,
        fieldId: this.blockId,
        wellCentre: this.wellCentre,
        wellGroupId: this.wellGroupId,
      };
      wellGroupDevLineCharts(request).then((res) => {
        let seriesData = [];
        //let legendData = [];
        let xSet = new Set();
        if (res.data.code == 200) {
          if (res.data.data && res.data.data.wellGroupTableList.length) {
            this.tableData = res.data.data.wellGroupTableList;
          }
          let lineCharts = res.data.data.charts;
          lineCharts.forEach((chart, index) => {
            let line = chart.linearDataSets;
            line.forEach((chartData, index) => {
              let series = {};
              let lineName = chartData.label;
              series.type = "line";
              series.name = lineName;
              let chartDatalabel = chartData.label;
              //数据所属图像
              if (chartDatalabel == "日产液") {
                series.xAxisIndex = 1;
                series.yAxisIndex = 4;
                series.itemStyle = { color: "rgb(250,0,251)" };
              } else if (chartDatalabel == "日产油") {
                series.xAxisIndex = 1;
                series.yAxisIndex = 5;
                series.itemStyle = { color: "#69b146" };
              } else if (chartDatalabel == "含水率") {
                series.xAxisIndex = 1;
                series.yAxisIndex = 6;
                series.itemStyle = { color: "rgb(0,255,255)" };
              } else if (chartDatalabel == "注入量") {
                series.xAxisIndex = 2;
                series.yAxisIndex = 10;
                series.itemStyle = { color: "rgb(0,255,255)" };
              } else if (chartDatalabel == "注采比") {
                series.xAxisIndex = 2;
                series.yAxisIndex = 7;
                // series.itemStyle={color:'rgb(0,255,255)'}
              } else if (chartDatalabel == "气油比") {
                series.xAxisIndex = 2;
                series.yAxisIndex = 9;
                series.itemStyle = { color: "#d92d28" };
              } else if (chartDatalabel == "油井总井数") {
                series.xAxisIndex = 0;
                series.yAxisIndex = 0;
                series.itemStyle = { color: "rgb(0,255,255)" };
              } else if (chartDatalabel == "油井开井数") {
                series.xAxisIndex = 0;
                series.yAxisIndex = 1;
                series.itemStyle = { color: "#bf282c" };
              } else if (chartDatalabel == "水井总井数") {
                series.xAxisIndex = 0;
                series.yAxisIndex = 2;
                series.itemStyle = { color: "#294f97" };
              } else if (chartDatalabel == "水井开井数") {
                series.xAxisIndex = 0;
                series.yAxisIndex = 3;
                series.itemStyle = { color: "#9b5497" };
              } else if (chartDatalabel == "日注水") {
                series.xAxisIndex = 2;
                series.yAxisIndex = 10;
                series.itemStyle = { color: "#61bcc4" };
              } else {
                return true;
              }
              //折线数据
              let lineData = chartData.linearData;
              let pointData = [];
              for (let i = 0; i < lineData.length; i++) {
                let point = [];
                point.push(lineData[i].label);
                xSet.add(lineData[i].label);
                point.push(lineData[i].value);
                pointData.push(point);
              }
              series.data = pointData;
              series.showSymbol = false;
              seriesData.push(series);
            });
          });
        }
        let xData = Array.from(xSet).sort();
        this.option.xAxis[0].data = xData;
        this.option.xAxis[1].data = xData;
        this.option.xAxis[2].data = xData;
        this.option.series = seriesData;
      });
    },
    //下载echarts
    doDownLoad() {
      let res = this.$refs["echartDown"].chart.getDataURL({
        type: "png",
        pixelRatio: 14,
        backgroundColor: "#022644",
      });
      let fileName = "井组开发曲线";
      if (this.wellGroupName) {
        fileName = this.wellGroupName + fileName;
      }
      FileSaver.saveAs(res, fileName);
      this.doDownTable();
    },
    //表格-展示||隐藏
    tapDevelop() {
      this.isDevelop = !this.isDevelop;
      if (this.isDevelop) {
        this.$nextTick(() => {
          let parentDom = document.getElementsByClassName("z-echarts")[0];
          parentDom.scrollBy({ top: this.height, behavior: "smooth" });
        });
      }
    },
    //表格导出
    doDownTable() {
      exportExcel("#tableData", "井组开发曲线");
    },
    // 表格格式化m³法 - 数值只保留两位小数
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
.z-main {
  width: 100%;
  height: calc(100% - 101px);
  .z-search {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  .z-echarts {
    width: 100%;
    height: calc(100% - 60px);
    overflow-y: scroll;
    padding-right: 20px;
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
}
</style>
