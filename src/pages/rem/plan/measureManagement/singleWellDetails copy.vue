<!-- 单井详情页 -->
<template>
  <div class="app-container">
    <Echarts :chart-data="oilOption2" width="100%" height="100%" :isClear="false"></Echarts>
  </div>
</template>

<script>
import { Message } from "element-ui";
import Echarts from "@/components/tools/Echarts/index.vue";
// import { parseTime } from "@/utils/MyUtil";
import * as FmtUtil from "@/utils/FmtUtil";
// import { getWellsData } from "@/api/pom/vms";
import { getWellsHmiMetetData } from "@/api/oilDeposit/opm/opmData.js";
import { isArray } from "lodash";

export default {
  components: {
    Echarts,
  },
  props: {
    selectedOilWellName: {
      type: "String",
      default: "",
    },
  },
  data() {
    return {
      // selectedOilWellName: "QHD32-6-I10H",
      fieldWellsData: [],
      selectedWellData: {},
      updateStoreData: null,
      timer: null,
      timeout: 1000,
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
      pointSize: 60,
    };
  },
  watch: {
    selectedOilWellName() {
      this.handleQuery();
    },
  },
  created() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    this.clear();
    that.$nextTick(async () => {
      await that.getWellsDataList({ field: "QHD32-6_VMS" });
      await that.handleQuery();
    });
  },
  mounted() {
    // this.getWellData();
    this.$nextTick(async () => {
      await this.intervalUpdateData();
    });
  },
  // 页面销毁前清除定时器
  beforeDestroy() {
    this.clearTimeout();
    this.clear();
  },
  // 路由跳转前，清除定时器
  beforeRouteLeave(to, from, next) {
    next();
    this.clearTimeout();
  },
  methods: {
    // 查询某项目所有井的计算结果及运行数据 // 获取全油田油井数据（vms！）
    async getWellsDataList(params) {
      if (!params.field) {
        return;
      }
      if (params.field.indexOf("VMS") === -1) {
        params.field += "_VMS";
      }
      const { data } = await getWellsHmiMetetData(params.field);
      if (!data) {
        return;
      }
      if (!data.data || !isArray(data.data)) {
        return;
      }
      // debugger;
      data.data.map((item) => {
        if (!item.myName.includes("QHD32-6-")) {
          item.myName = `QHD32-6-${item.myName}`;
        }
        FmtUtil.unitConver4Well(item);
        return item;
      });
      this.fieldWellsData = data.data;
    },
    // 实时更新
    async intervalUpdateData() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this;
      that.clear();
      await this.getWellsDataList({ field: "QHD32-6_VMS" });
      that.$nextTick(async () => {
        if (!that.fieldWellsData) {
          return;
        }
        const vmsTableData = that.fieldWellsData.filter((i) => {
          if (that.selectedOilWellName === i.myName) {
            return i;
          }
        });
        if (!vmsTableData[0]) {
          return;
        }
        const vmsObj = {
          update: vmsTableData[0].update,
          myFoStdvol: vmsTableData[0].myFoStdvol,
          myFgStdvol: vmsTableData[0].myFgStdvol,
          myFwStdvol: vmsTableData[0].myFwStdvol,
          myFlStdvol: vmsTableData[0].myFlStdvol,
        };
        that.selectedWellData = { ...vmsObj };
      });
      that.updateStoreData = setTimeout(async () => {
        await that.intervalUpdateData();
      }, 10000);
    },
    // 清除定时器
    clear() {
      if (this.updateStoreData) {
        clearTimeout(this.updateStoreData);
        this.updateStoreData = null;
      }
    },
    clearTimeout() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
    clearChart() {
      this.clearTimeout();
      this.oilOption2.xAxis.data = [];
      this.oilOption2.series[0].data = [];
      this.oilOption2.series[1].data = [];
      this.oilOption2.series[2].data = [];
      this.oilOption2.series[3].data = [];
    },
    getWellData() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this;
      const timeout = 1000;
      // eslint-disable-next-line no-use-before-define
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
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this;
      // const timeStr = parseTime(time);
      const timeStr = new Date(time).format("yyyy-MM-dd hh:mm:ss");
      let oil = data.myFoStdvol;
      let gas = data.myFgStdvol;
      let water = data.myFwStdvol;
      let liq = data.myFlStdvol;

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
      this.selectedWellData = {};
      if (this.selectedOilWellName !== "") {
        this.clearChart();
        this.clearTimeout();
        this.$nextTick(async () => {
          // eslint-disable-next-line array-callback-return
          if (!this.fieldWellsData) {
            return;
          }
          // eslint-disable-next-line array-callback-return
          const vmsTableData = this.fieldWellsData.filter((i) => {
            if (this.selectedOilWellName === i.myName) {
              return i;
            }
          });
          if (!vmsTableData[0]) {
            return;
          }
          const vmsObj = {
            update: vmsTableData[0].update,
            myFoStdvol: vmsTableData[0].myFoStdvol,
            myFgStdvol: vmsTableData[0].myFgStdvol,
            myFwStdvol: vmsTableData[0].myFwStdvol,
            myFlStdvol: vmsTableData[0].myFlStdvol,
          };
          this.selectedWellData = { ...vmsObj };
          this.getWellData();
        });
      } else {
        this.clearChart();
        Message({
          message: "请先选择油井",
        });
        this.selectedWellData = {};
      }
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
