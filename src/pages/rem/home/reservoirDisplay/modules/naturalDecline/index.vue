<template>
    <info-window
        info-width="100%"
        info-height="100%"
        header-title="自然递减率"
        :is-show-max-btn="true"
    >
<!--        <button class="detailLinkBtn" @click="linkroute('productionIndex')">详细</button>-->
        <Echart :chart-data="naturalDeclineRate" width="100%" height="100%"></Echart>
    </info-window>
</template>
<script>
import Echart from "@/components/tools/Echarts/index.vue";
import * as echarts from "echarts";
import { natureDeclineChart } from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";

export default {
  props: ["infodata"],
  components: {
    Echart,
  },
  data() {
    return {
      currentModel: this.$store.state.setting.mode,
        naturalDeclineRate: {
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow",
                },
            },
            dataZoom: {
                start: 95,
                type: "inside",
            },
            // toolbox: {
            //     show: true,
            //     feature: {
            //         saveAsImage: {
            //             name: "自然递减率",
            //             pixelRatio: 15,
            //             //值越大分辨率越高,下载的图片越清晰
            //             backgroundColor: "#022644",
            //         },
            //     },
            // },
            xAxis: {
                type: "category",
                axisLabel: {
                    color: "#8FA4CC",
                    margin: 20,
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(143,164,204,.5)'
                    },
                },
            },
            yAxis: {
                name: "自然递减率(%)",
                nameTextStyle: {
                    color: "#8FA4CC"
                },
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
                        color: 'rgba(143,164,204,.5)'
                    },
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(143,164,204,.5)'
                    },
                },
            },
            series: {
                data: [],
                type: "bar",
                label: {
                    show: true,
                },
            },
        },

    };
  },
  mounted() {
      this.getNatureDeclineChart()
  },
  methods: {
      //自然递减率
      getNatureDeclineChart(oilFieldId, fieldId) {
          let request = {
              oilFieldId: "3FC9A818F5BC43B88270DB80BBB3018F",
              fieldId: "3FC9A818F5BC43B88270DB80BBB3018F",
          };
          natureDeclineChart(request).then((res) =>{
              if (res.data.code == 200) {
                  let seriesData = [];
                  let barChartData = res.data.data.chart.barDataSets[0].barDatas;
                  /*barChartData.forEach((item, index) => {
                let point = [];
                let label = item.label.split('-');
                point.push(label[0] + '-' + label[1]);
                point.push(item.value);
                seriesData.push(point);
              });*/
                  seriesData = this.getBarChartSeries(barChartData);
                  //console.log(seriesData);
                  this.naturalDeclineRate.series.data = seriesData;
              }
          });
      },
      //柱状图
      getBarChartSeries(barChart) {
          let seriesData = [];
          for (let i = 0; i < barChart.length; i++) {
              let barData = {};
              //值大于等于0
              if (barChart[i].value >= 0) {
                  barData.value = barChart[i].value;
                  let label = barChart[i].label.split("-");
                  barData.value = [label[0] + "-" + label[1], barData.value];
                  barData.name = label[0] + "-" + label[1];
                  barData.label = {
                      show: false,
                      /*normal: {
                  position: "top",
                  color: "#fff",
                  fontSize: 14,
                },*/
                  };
                  barData.itemStyle = {
                      color: "#1379F7",
                  };
                  seriesData.push(barData);
              } else {
                  //值小于0
                  barData.value = barChart[i].value;
                  let label = barChart[i].label.split("-");
                  barData.value = [label[0] + "-" + label[1], barData.value];
                  barData.name = label[0] + "-" + label[1];
                  barData.label = {
                      show: false,
                      /*normal: {
                  position: "bottom",
                  color: "#fff",
                  fontSize: 14,
                },*/
                  };
                  barData.itemStyle = {
                      color: "#FF7135",
                  };
                  seriesData.push(barData);
              }
          }
          return seriesData;
      },
  },
};
</script>
<style lang="scss" scoped>
.detailLinkBtn {
    position: absolute;
    right: 50px;
    top: 10px;
    width: 50px;
    height: 20px;
    background: linear-gradient(90deg, #0751b0, #50a6ec);
    text-align: center;
    font-size: smaller;
    border: 0;
    cursor: pointer;
    color: #ffffff;
}
</style>
