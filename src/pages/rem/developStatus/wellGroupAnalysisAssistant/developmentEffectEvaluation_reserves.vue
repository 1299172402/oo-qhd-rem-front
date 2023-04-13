<!--储量类 -->
<template>
  <div class="dom" style="margin-top: 0px">
    <el-row class="mt-5" :gutter="20" style="margin-top: -20px">
      <el-col :span="12">
        <pagePanel headerTitle="剩余储采比" style="width: 100%; height: 380px" :isShowMaxBtn="true" :show-btn="true">
          <Echart :chart-data="reserveProductionRatio" style="height: 100%"></Echart>
        </pagePanel>
      </el-col>
      <el-col :span="12">
        <pagePanel headerTitle="水驱动用程度" style="width: 100%; height: 380px" :isShowMaxBtn="true" :show-btn="true">
          <Echart :chart-data="degreeOfWaterDrive" style="height: 100%"></Echart
        ></pagePanel>
      </el-col>
    </el-row>
    <el-row class="mt-5" :gutter="20">
      <el-col :span="12">
        <pagePanel headerTitle="水驱控制程度" style="width: 100%; height: 380px" :isShowMaxBtn="true" :show-btn="true">
          <Echart :chart-data="waterDriveControlDegree" style="height: 100%"></Echart>
        </pagePanel>
      </el-col>
    </el-row>
  </div>
</template> 
 <script>
import * as echarts from "echarts";
import Echart from "@/components/tools/Echarts/index.vue";
import { fetchOilFields, fetchFields } from "@/api/oilDeposit/rem-02/primaryinfo.js";
import verticalSwitchButton from "@/components/intelligentOilfield/vertical-switch-button/index.vue";
import {
  reservoirsUseDegreeChart,
  reservoirsControlDegreeChart,
  reservoirsProRateChart,
  waterDriveUseDegreeChart,
  waterControlDegreeChart,
} from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
export default {
  components: {
    Echart,
    verticalSwitchButton,
  },
  props: {
    selectOilField: {
      type: String,
      default: "",
    },
    selectBlock: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      //油田
      oilField: [],
      //区块
      block: [],
      radio1: "储量类",
      //查询参数
      queryParams: {},
      page: 1,
      pageSize: 10,
      //储量动用程度
      reserveUtilization: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "储量动用程度",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        xAxis: {
          name: "时间",
          nameLocation: "center",
          nameTextStyle: { color: "#8FA4CC" },
          nameGap: 25,
          type: "category",
          /*data: [
              "2009",
              "2010",
              "2011",
              "2012",
              "2013",
              "2014",
              "2015",
              "2016",
              "2017",
              "2018",
              "2019",
              "2020",
            ],*/
          axisLabel: {
            color: "#8FA4CC",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              //color: '#979797'
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        yAxis: {
          name: "动用程度/%",
          nameLocation: "center",
          nameTextStyle: { color: "#8FA4CC" },
          nameGap: 30,
          type: "value",
          max: 120,
          axisLabel: {
            color: "#8FA4CC",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(151,151,151,.16)",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        series: [
          {
            data: [
              /*  ["2009",99.0],
                ["2010",99.1],
                ["2011",99.7],
                ["2012",99.5],
                ["2013",99.5],
                ["2014",99.6],
                ["2015",99.4],
                ["2016",99.5],
                ["2017",99.3],
                ["2018",99.8],
                ["2019",99.7],
                ["2020",99.6],*/
            ],
            type: "bar",
            barWidth: "20",
            label: {
              show: false,
              position: "top",
              color: "#00D9EA",
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#00D9EA",
                },
                {
                  offset: 1,
                  color: "#0F65EA",
                },
              ]),
            },
          },
        ],
      },
      //储量控制程度
      degreeOfReserveControl: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "储量控制程度",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        xAxis: {
          name: "时间",
          nameLocation: "center",
          nameTextStyle: { color: "#8FA4CC" },
          nameGap: 25,
          type: "category",
          /*data: [
              "2009",
              "2010",
              "2011",
              "2012",
              "2013",
              "2014",
              "2015",
              "2016",
              "2017",
              "2018",
              "2019",
              "2020",
            ],*/
          axisLabel: {
            color: "#8FA4CC",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              //color: '#979797'
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        yAxis: {
          name: "控制程度/%",
          nameLocation: "center",
          nameTextStyle: { color: "#8FA4CC" },
          nameGap: 30,
          type: "value",
          max: 120,
          axisLabel: {
            color: "#8FA4CC",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(151,151,151,.16)",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        series: [
          {
            data: [
              /* ["2009",99.0],
                ["2010",99.1],
                ["2011",99.7],
                ["2012",99.5],
                ["2013",99.5],
                ["2014",99.6],
                ["2015",99.4],
                ["2016",99.5],
                ["2017",99.3],
                ["2018",99.8],
                ["2019",99.7],
                ["2020",99.6],*/
            ],
            type: "bar",
            barWidth: "20",
            label: {
              show: false,
              position: "top",
              color: "#00D9EA",
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#00D9EA",
                },
                {
                  offset: 1,
                  color: "#0F65EA",
                },
              ]),
            },
          },
        ],
      },
      //储采比
      reserveProductionRatio: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "剩余储采比",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        xAxis: {
          type: "value",
          name: "可采储量采出程度/%",
          nameLocation: "center",
          nameTextStyle: { color: "#8FA4CC" },
          nameGap: 25,
          /*data: ["0", "5", "10", "15", "20", "25", "30", "35", "40", "45"],*/
          axisLabel: {
            color: "#8FA4CC",
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#35546d",
            },
          },
          axisLine: {
            lineStyle: {
              //color: '#979797'
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        yAxis: {
          name: "剩余可采储量储采比/%",
          nameLocation: "center",
          nameTextStyle: { color: "#8FA4CC" },
          nameGap: 45,
          type: "value",
          axisLabel: {
            color: "#8FA4CC",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#35546d",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#35546d",
            },
          },
        },
        series: [
          {
            data: [
              /*16, 14, 12, 10, 8, 7, 7.5, 8, 8, 8.5*/
            ],
            type: "scatter",
            label: {
              show: false,
              position: "top",
              color: "#00D9EA",
            },
            /*symbol: "none",*/
            /*itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#49E1F0",
                  },
                  {
                    offset: 1,
                    color: "#24DEFF",
                  },
                ]),
              },*/
          },
        ],
      },
      //水驱动用程度
      degreeOfWaterDrive: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "水驱动用程度",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        xAxis: {
          name: "时间",
          nameLocation: "center",
          nameTextStyle: { color: "#8FA4CC" },
          nameGap: 25,
          type: "category",
          /*data: [
             /!* "2009",
              "2010",
              "2011",
              "2012",
              "2013",
              "2014",
              "2015",
              "2016",
              "2017",
              "2018",
              "2019",
              "2020",*!/
            ],*/
          axisLabel: {
            color: "#8FA4CC",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              //color: '#979797'
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        yAxis: {
          name: "动用程度/%",
          nameLocation: "center",
          nameTextStyle: { color: "#8FA4CC" },
          nameGap: 30,
          type: "value",
          max: 100,
          axisLabel: {
            color: "#8FA4CC",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(151,151,151,.16)",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        series: [
          {
            data: [
              /*99.0,
                99.1,
                99.7,
                99.5,
                99.6,
                99.4,
                99.5,
                99.3,
                99.8,
                99.7,
                99.6,
                99.1,*/
            ],
            type: "bar",
            barWidth: "20",
            label: {
              show: false,
              position: "top",
              color: "#00D9EA",
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#00D9EA",
                },
                {
                  offset: 1,
                  color: "#0F65EA",
                },
              ]),
            },
          },
        ],
      },
      //水驱控制程度
      waterDriveControlDegree: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "水驱控制程度",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        xAxis: {
          name: "时间",
          nameLocation: "center",
          nameTextStyle: { color: "#8FA4CC" },
          nameGap: 25,
          type: "category",
          /* data: [
              /!*"2009",
              "2010",
              "2011",
              "2012",
              "2013",
              "2014",
              "2015",
              "2016",
              "2017",
              "2018",
              "2019",
              "2020",*!/
            ],*/
          axisLabel: {
            color: "#8FA4CC",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              //color: '#979797'
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        yAxis: {
          name: "控制程度/%",
          nameLocation: "center",
          nameTextStyle: { color: "#8FA4CC" },
          nameGap: 30,
          type: "value",
          max: 100,
          axisLabel: {
            color: "#8FA4CC",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(151,151,151,.16)",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        series: [
          {
            data: [
              /*99.0,
                99.1,
                99.7,
                99.5,
                99.6,
                99.4,
                99.5,
                99.3,
                99.8,
                99.7,
                99.6,
                99.1,*/
            ],
            type: "bar",
            barWidth: "20",
            label: {
              show: false,
              position: "top",
              color: "#00D9EA",
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#00D9EA",
                },
                {
                  offset: 1,
                  color: "#0F65EA",
                },
              ]),
            },
          },
        ],
      },
      canDownload: false,
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      this.canDownload = this.$route.params.canDownload;
      this.downPower(this.canDownload);
      //调用油田接口
      await fetchOilFields().then((res) => {
        if (res.data.code == 200) {
          this.oilField = res.data.data.oilFields;
          if (this.oilField.length == 0) {
            this.selectOilField = "";
          } else {
            this.selectOilField = this.oilField[0].oilFieldId;
          }
        }
      });
      let oilFieldId = this.$route.params.oilFieldId;
      if (oilFieldId == undefined) {
        //设置默认油田
        this.selectOilField = "3FC9A818F5BC43B88270DB80BBB3018F";
      } else {
        this.selectOilField = oilFieldId;
      }
      let requestFields = {
        oilFieldId: this.selectOilField,
      };
      //获得区块信息
      await fetchFields(requestFields).then((res) => {
        if (res.data.code == 200) {
          this.block = res.data.data.fields;
          //区块全部为油田的id。
          this.selectBlock = this.selectOilField;
        }
      });
      let fieldId = this.$route.params.fieldId;
      if (fieldId) {
        this.selectBlock = fieldId;
      }
      this.doSearch();
    },
    /**
     * hwh
     * 搜索方法
     */
    doSearch() {
      this.getReservoirsProRateChart(this.selectOilField, this.selectBlock);
      this.getWaterControlDegreeChart(this.selectOilField, this.selectBlock);
      this.getWaterDriveUseDegreeChart(this.selectOilField, this.selectBlock);
    },
    /**
     * hwh
     * 获得区块信息
     * @param oilFieldId
     */
    getFetchFields(oilFieldId) {
      let request = {
        oilFieldId: oilFieldId,
      };
      fetchFields(request).then((res) => {
        if (res.data.code == 200) {
          this.block = res.data.data.fields;
          //区块全部为油田的id。
          this.selectBlock = oilFieldId;
        }
      });
    },
    /**
     * hwh
     * 储采比
     * @param oilFieldId
     * @param fieldId
     */
    getReservoirsProRateChart(oilFieldId, fieldId) {
      let request = {
        oilFieldId: oilFieldId,
        fieldId: fieldId,
      };
      reservoirsProRateChart(request).then((res) => {
        if (res.data.code == 200) {
          let seriesData = [];
          //let xData = [];
          //let linearChart = res.data.data.chart.lineChartDataSets;
          let lineData = res.data.data.chart.lineChartDataSets[0].numberPoints;
          lineData.forEach((item, index) => {
            let point = [];
            point.push(item.x);
            point.push(item.y);
            seriesData.push(point);
          });
          this.reserveProductionRatio.series[0].data = seriesData;
        }
      });
    },
    /**
     *  hwh
     *  储量动用程度
     * @param oilFieldId
     * @param fieldId
     */
    getReservoirsUseDegreeChart(oilFieldId, fieldId) {
      let request = {
        oilFieldId: oilFieldId,
        fieldId: fieldId,
      };
      reservoirsUseDegreeChart(request).then((res) => {
        if (res.data.code == 200) {
          let seriesData = [];
          //let barChart=res.data.data.chart.barDataSets;
          let barData = res.data.data.chart.barDataSets[0].barDatas;
          barData.forEach((item, index) => {
            let point = [];
            let label = item.label.split("-");
            point.push(label[0]);
            point.push(item.value);
            seriesData.push(point);
          });
          this.reserveUtilization.series[0].data = seriesData;
        }
      });
    },
    /**
     *  hwh
     *  储量控制程度
     * @param oilFieldId
     * @param fieldId
     */
    getReservoirsControlDegreeChart(oilFieldId, fieldId) {
      let request = {
        oilFieldId: oilFieldId,
        fieldId: fieldId,
      };
      reservoirsControlDegreeChart(request).then((res) => {
        if (res.data.code == 200) {
          let seriesData = [];
          //let barChart=res.data.data.chart.barDataSets;
          let barData = res.data.data.chart.barDataSets[0].barDatas;
          barData.forEach((item, index) => {
            let point = [];
            let label = item.label.split("-");
            point.push(label[0]);
            point.push(item.value);
            seriesData.push(point);
          });
          this.degreeOfReserveControl.series[0].data = seriesData;
        }
      });
    },
    /**
     *  hwh
     *  水驱动用程度
     * @param oilFieldId
     * @param fieldId
     */
    getWaterDriveUseDegreeChart(oilFieldId, fieldId) {
      let request = {
        oilFieldId: oilFieldId,
        fieldId: fieldId,
      };
      waterDriveUseDegreeChart(request).then((res) => {
        if (res.data.code == 200) {
          let seriesData = [];
          let barData = res.data.data.chart.barDataSets[0].barDatas;
          barData.forEach((item, index) => {
            let point = [];
            let label = item.label.split("-");
            point.push(label[0]);
            point.push(item.value);
            seriesData.push(point);
          });
          this.degreeOfWaterDrive.series[0].data = seriesData;
        }
      });
    },
    /**
     *  hwh
     *  水驱动用程度
     * @param oilFieldId
     * @param fieldId
     */
    getWaterControlDegreeChart(oilFieldId, fieldId) {
      let request = {
        oilFieldId: oilFieldId,
        fieldId: fieldId,
      };
      waterControlDegreeChart(request).then((res) => {
        if (res.data.code == 200) {
          let seriesData = [];
          let barData = res.data.data.chart.barDataSets[0].barDatas;
          barData.forEach((item, index) => {
            let point = [];
            let label = item.label.split("-");
            point.push(label[0]);
            point.push(item.value);
            seriesData.push(point);
          });
          this.waterDriveControlDegree.series[0].data = seriesData;
        }
      });
    },
    /**
     * 下载echarts 隐藏 显示
     * @param flag
     */
    downPower(flag) {
      this.reserveProductionRatio.toolbox.show = flag;
      this.degreeOfWaterDrive.toolbox.show = flag;
      this.waterDriveControlDegree.toolbox.show = flag;
    },
  },
};
</script>
<style lang="scss" scoped>
.QU {
  padding-left: 10px;
}
.formBox {
  & > div:not(:first-child) {
    margin-left: 20px;
  }
}
.py-5 {
  display: flex;
  justify-content: space-between;
}
.basicTable {
  height: auto;
  // padding-bottom: 10px;
}
.el-card {
  //border-width: 1px 0;
  //border-radius: 0;
  border-image: linear-gradient(90deg, rgba(116, 190, 243, 0), rgba(75, 241, 255, 0.5), rgba(116, 190, 243, 0)) 1 1;
  color: #00d6ea;
  font-weight: bold;
  background: rgba(143, 164, 204, 0.16);

  ::v-deep .el-card__body {
    padding: 0;
    line-height: 40px;
  }
}
::v-deep .el-radio-button__inner {
  background-color: #031527;
  color: #02c8d3;
  border: 1px solid #00cbdd;
  background: transparent;
}

::v-deep .el-radio-button:first-child .el-radio-button__inner {
  border: 1px solid #00d6ea;
}
</style>
