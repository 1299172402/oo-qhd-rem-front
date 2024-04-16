<!-- 单井详情页 -->
<template>
  <div class="app-container">
    <Echarts :chart-data="oilOption2" width="100%" height="100%" :isClear="false"></Echarts>
  </div>
</template>

<script>
import { Message } from "element-ui";
import Echarts from "@/components/tools/Echarts/index.vue";
import * as FmtUtil from "@/utils/FmtUtil";
import { getWellsHmiMetetData } from "@/api/oilDeposit/opm/opmData.js";
import { isArray } from "lodash";

export default {
  components: {
    Echarts,
  },
  props: {
    selectedOilWell: {
      type: String,
      default: "",
    },
  },
  beforeRouteLeave(to, from, next) {
    this.clearTimeOutTask(this.updateStoreData);
    // 注意一定要next()让其跳转!!!
    next();
  },
  data() {
    return {
      wellName: "",
      vmsData: {},
      selectedWellData: {},
      // point: {},
      pointSize: 60,

      updateStoreData: null,
      timer: null,

      oilOption2: {
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "油井日度曲线",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
              iconStyle: {
                opacity: 0,
              },
            },
          },
        },
        // dataZoom: [
        //   {
        //     type: "inside",
        //     xAxisIndex: [0],
        //     start: 0, //滚动条开始位置（共100等份）
        //     end: 100, //滚动条结束位置
        //   },
        // ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            animation: false,
          },
          valueDecimals: 2,
          formatter(params) {
            var relVal = params[0].name;
            params.forEach((item) => {
              if (item.seriesName == "计划年累产" || item.seriesName == "实际年累产") {
                relVal += "<br/>" + item.marker + item.seriesName + " : " + parseFloat(item.value[1] || 0).toFixed(4);
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
          y2: 80,
        },
        legend: {
          data: ["油", "气", "水", "液"],
          textStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          x: "center",
          bottom: 30,
          // icon: "c",
          // itemWidth: 20,
          // itemHeight: 10,
          itemGap: 14,
        },
        xAxis: {
          name: "时间",
          nameTextStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          type: "category",
          data: [],
          max: "dataMax",
          min: "dataMin",
          axisLabel: {
            show: true,
            color: "#8FA4CC",
            // showMinLabel: true,
            // showMaxLabel: true,
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
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          name: "流量(m³/d)",
          nameLocation: "middle",
          nameGap: 70,
          nameTextStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          type: "value",
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
        series: [
          {
            name: "油",
            type: "line",
            data: [],
            lineStyle: {
              color: "#2ca02c",
            },
            itemStyle: {
              color: "#2ca02c",
            },
            allowPointSelect: true,
            smooth: true,
            yAxisIndex: 0,
          },
          {
            name: "气",
            type: "line",
            data: [],
            lineStyle: {
              color: "#ffff00",
            },
            itemStyle: {
              color: "#ffff00",
            },
            allowPointSelect: true,
            smooth: true,
            yAxisIndex: 0,
          },
          {
            name: "水",
            type: "line",
            data: [],
            lineStyle: {
              color: "#00def0",
            },
            itemStyle: {
              color: "#00def0",
            },
            allowPointSelect: true,
            smooth: true,
            yAxisIndex: 0,
          },
          {
            name: "液",
            type: "line",
            data: [],
            lineStyle: {
              color: "#e377c2",
            },
            itemStyle: {
              color: "#e377c2",
            },
            allowPointSelect: true,
            smooth: true,
            yAxisIndex: 0,
          },
        ],
      },
    };
  },
  created() {
    const that = this;
    this.wellName = this.selectedOilWell;
    that.clearTimeOutTask(that.updateStoreData);
    that.clearChart();
    that.$nextTick(async () => {
      await that.handleQuery();
    });
  },
  mounted() {},
  beforeDestroy() {
    this.clearTimeOutTask(this.updateStoreData);
    this.clearChart();
  },
  methods: {
    // 获取某油井数据
    async getWellVmsData() {
      const that = this;
      await getWellsHmiMetetData(that.wellName)
        .then((res) => {
          if (res.data.code === 200) {
            const { data } = res.data;
            if (data) {
              FmtUtil.unitConver4Wellbore(data);
              that.vmsData = data;
            }
          } else {
            that.vmsData = null;
          }
        })
        .catch((e) => {
          that.vmsData = null;
        });
    },

    // 清除定时器
    clearTimeOutTask(data) {
      if (data) {
        clearTimeout(data);
        data = null;
      }
    },

    getWellData() {
      const that = this;
      that.clearTimeOutTask(this.timer);
      const timeout = 1000;
      getData();
      function getData() {
        const data = that.selectedWellData;
        if (data) {
          that.updateChartPoint(Date.now(), data);
        }
        that.timer = setTimeout(getData, timeout);
      }
    },

    updateChartPoint(time, data, isForce = false) {
      const timeStr = new Date(time).format("yyyy-MM-dd hh:mm:ss");
      let oil = data.myFoStdvol;
      let gas = data.myFgStdvol;
      let water = data.myFwStdvol;
      let liq = data.myFlStdvol;
      // const point = FmtUtil.createFluxPoint(timeStr, [oil, gas, water, liq]);
      // if (isForce) {
      //   this.$refs.FluxChart.updateChart(point);
      // } else {
      //   that.point = point;
      // }
      this.oilOption2.xAxis.data.push(timeStr);
      this.oilOption2.series[0].data.push([timeStr, oil]);
      this.oilOption2.series[1].data.push([timeStr, gas]);
      this.oilOption2.series[2].data.push([timeStr, water]);
      this.oilOption2.series[3].data.push([timeStr, liq]);
      if (this.oilOption2.xAxis.data.length > this.pointSize) {
        this.oilOption2.xAxis.data.shift();
        this.oilOption2.series[0].data.shift();
        this.oilOption2.series[1].data.shift();
        this.oilOption2.series[2].data.shift();
        this.oilOption2.series[3].data.shift();
      }
    },

    // 搜索
    async handleQuery() {
      const that = this;
      that.clearTimeOutTask(that.updateStoreData);
      that.clearChart();
      that.selectedWellData = {};

      if (that.wellName !== "") {
        await that.getAndUpdateLiveData();
      } else {
        that.clearChart();
        Message({
          message: "请先选择油井",
        });
        that.selectedWellData = {};
      }
    },

    // 拼接整体对象
    async getAndUpdateLiveData() {
      const that = this;
      that.clearTimeOutTask(that.updateStoreData);
      await that.getWellVmsData();
      const vmsObj = {};
      if (that.vmsData) {
        vmsObj.update = that.vmsData.update;
        vmsObj.myFoStdvol = that.vmsData.myFoStdvol;
        vmsObj.myFgStdvol = that.vmsData.myFgStdvol;
        vmsObj.myFwStdvol = that.vmsData.myFwStdvol;
        vmsObj.myFlStdvol = that.vmsData.myFlStdvol;
      } else {
        vmsObj.update = "N/A";
        vmsObj.myFoStdvol = "N/A";
        vmsObj.myFgStdvol = "N/A";
        vmsObj.myFwStdvol = "N/A";
        vmsObj.myFlStdvol = "N/A";
        that.clearTimeOutTask(that.updateStoreData);
        that.clearChart();
        return;
      }

      that.selectedWellData = { ...vmsObj };
      if (that.selectedWellData.my_fo && that.selectedWellData.my_fw) {
        that.selectedWellData.my_fl = FmtUtil.formatVals(that.selectedWellData.my_fo, that.selectedWellData.my_fw, "+");
      }
      if (that.selectedWellData.myFo && that.selectedWellData.myFw) {
        that.selectedWellData.myFl = FmtUtil.formatVals(that.selectedWellData.myFo, that.selectedWellData.myFw, "+");
      }
      await that.getWellData();

      that.updateStoreData = setTimeout(() => {
        that.getAndUpdateLiveData();
      }, 2000);
    },

    // 清图
    clearChart() {
      this.clearTimeOutTask(this.timer);

      this.$nextTick(() => {
        this.oilOption2.xAxis.data = [];
        this.oilOption2.series[0].data = [];
        this.oilOption2.series[1].data = [];
        this.oilOption2.series[2].data = [];
        this.oilOption2.series[3].data = [];
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: 100%;
  .footerBox {
    height: calc(100% - 60px);
  }
}
</style>
