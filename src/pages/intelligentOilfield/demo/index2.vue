<template>
  <div>
    <div class="headerTitle spaceMargin">
      ====================================================echarts/d3等组件一览大全========================================
    </div>
    <div class="headerTitle spaceMargin">
      1、echarts图表【未作封装以及大小适配】=========================================================================================
    </div>
    <charts-components :chart-data-options="dataOption" echarts-type="pie1" style="width: 400px; height: 400px" />
    <charts-components :chart-data-options="dataOptionLine" echarts-type="line1" style="width: 600px; height: 400px" />
    <charts-components :chart-data-options="dataZhuzhuang" echarts-type="bar1" style="width: 600px; height: 400px" />
    <!-- TODO: Maybe change back -->
    <!-- <div id="lineContainer" ref="lineContainer" style="width: 50%; height: 410px" /> -->
    <div style="margin: 40px 0">
      =================================end========================
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { GridComponent, TooltipComponent, LegendComponent } from "echarts/components";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import chartsComponents from "@/components/intelligentOilfield/echarts-com/index.vue";
import { CanvasRenderer } from "echarts/renderers";
import { getFolderLineDataSet } from "./index";

echarts.use([GridComponent, LegendComponent, TooltipComponent, LineChart, CanvasRenderer]);
const labelName = ["总值", "合格值"];

const getRate = 70;

const color = [
  {
    type: "linear",
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: "rgba(242, 164, 64, 1)" // 0% 处的颜色
      },
      {
        offset: 1,
        color: "rgba(255, 213, 65, 1)" // 100% 处的颜色
      }
    ]
  },
  {
    type: "linear",
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: "rgba(29, 130, 255, 1)" // 0% 处的颜色
      },
      {
        offset: 1,
        color: "rgba(0, 255, 246, 1)" // 100% 处的颜色
      }
    ]
  }
];
export default {
  components: {
    chartsComponents
  },
  data() {
    return {
      labelList: ["成都", "武汉", "上海", "北京", "深圳", "陕西", "山西", "甘肃"],
      dataListD3: [100, 105, 200, 250, 230, 320, 128, 68],
      data1: [
        {
          "name": "哈尔滨",
          "value": [{ key: "2015-1-1", value: 10 }, { key: "2015-1-2", value: 12 }, { key: "2015-1-3", value: 13 }, { key: "2015-1-17", value: 17 }]
        },
        {
          "name": "海南",
          "value": [{ key: "2015-1-1", value: 9 }, { key: "2015-1-2", value: 48 }, { key: "2015-1-3", value: 5 }, { key: "2015-1-17", value: 49 }]
        },
        {
          "name": "天津",
          "value": [{ key: "2015-1-2", value: 30 }, { key: "2015-1-3", value: 1 }, { key: "2015-1-4", value: 32 }, { key: "2015-1-5", value: 10 }]
        }
      ],
      dataOption: {
        polar: {
          center: ["50%", "50%"],
          radius: ["38%", "76%"]
        },
        angleAxis: {
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          min: 0,
          max: 100,
          boundaryGap: ["0", "100"],
          startAngle: 90
        },
        radiusAxis: {
          type: "category",
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          data: labelName,
          z: 10
        },
        series: [
          {
            name: "",
            hoverAnimation: false,
            silent: true,
            type: "pie",
            data: [{ name: "合格值", value: 100 }],
            z: 1,
            center: ["50%", "50%"],
            radius: ["27%", "68%"],
            label: {
              show: true,
              position: "center",

              formatter: `{total|${getRate}%}\n\n{lname|合格值}`,
              rich: {
                total: {
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#0DDBFF"
                },
                lname: {
                  fontSize: 12,
                  color: "#FFF"
                }
              }
            },
            itemStyle: {
              color: "rgba(62, 109, 255, 0.2)"
            }
          },
          {
            // TODO: Maybe change back
            // hoverAnimation:false,
            name: labelName[0],
            barGap: "-100%",
            // TODO: Maybe change back
            // silent:true,
            type: "bar",
            data: [100],
            coordinateSystem: "polar",
            z: 2,
            label: {
              show: false
            },
            itemStyle: {
              color: color[0]
            }
          },
          {
            // TODO: Maybe change back
            // hoverAnimation:false,
            roundCap: true,
            // TODO: Maybe change back
            // silent:true,
            name: labelName[1],
            type: "bar",
            coordinateSystem: "polar",
            barGap: "-100%",
            data: [getRate],
            z: 3,
            label: {
              show: false
            },
            itemStyle: {
              color: color[1]
            }
          }
        ]
      },
      dataOptionLine: {
        // 你的代码
        backgroundColor: "transparent",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(0, 255, 233,0)"
                  },
                  {
                    offset: 0.5,
                    color: "rgba(255, 255, 255,1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(0, 255, 233,0)"
                  }
                ],
                global: false
              }
            }
          }
        },
        legend: {
          x: "46%",
          top: "0%",
          textStyle: {
            color: "gray",
            fontSize: 12
          },
          data: ["历史价格"]
        },

        grid: {
          top: "25%",
          left: "12%",
          right: "3%",
          bottom: "10%"
          // TODO: Maybe change back
          // containLabel: true
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: false,
              color: "#A582EA"
            },

            axisLabel: {
              color: "gray",
              width: 100
            },
            splitLine: {
              show: false
            },
            boundaryGap: false,
            data: [
              "11/12",
              "11/13",
              "11/14",
              "11/15",
              "11/16",
              "11/17",
              "11/18",
              "11/19",
              "11/20",
              "11/21",
              "11/22",
              "11/23",
              "11/24",
              "11/25",
              "11/26",
              "11/27",
              "11/28",
              "11/29",
              "11/30",
              "12/01",
              "12/02",
              "12/03",
              "12/04",
              "12/05",
              "12/06",
              "12/07",
              "12/08",
              "12/09",
              "12/10",
              "12/11"
            ] // this.$moment(data.times).format("HH-mm") ,
          }
        ],

        yAxis: [
          {
            name: "单位：元",
            nameTextStyle: {
              color: "gray",
              fontSize: 12
            },
            type: "value",
            min: 0,
            splitNumber: 10,
            splitLine: {
              show: true,
              lineStyle: {
                color: "gray",
                opacity: 0.23
              }
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              margin: 15,
              textStyle: {
                color: "gray"
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "历史价格",
            type: "line",
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 5,
            lineStyle: {
              normal: {
                color: "#2CABE3"
              }
            },
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#2CABE3",
                fontSize: 10
              }
            },
            itemStyle: {
              color: "#2CABE3",
              borderColor: "#2CABE3",
              borderWidth: 0
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(81,150,164,0.3)"
                    },
                    {
                      offset: 1,
                      color: "rgba(81,150,164,0)"
                    }
                  ],
                  false
                )
              }
            },
            data: [
              100.08, 136.97, 142.37, 135.04, 159.28, 157.08, 66.14, 149.27, 186.26, 0, 0, 170.3, 111.31, 54.86, 119.06,
              109.57, 105.31, 34.87, 129.04, 35.33, 0, 31.51, 127.09, 136.76, 188.59, 142.03, 126.7, 133.33, 124.09,
              67.43
            ]
          }
        ]
      },
      dataZhuzhuang: {
        backgroundColor: "transparent",
        title: {
          show: true,
          text: "",
          textStyle: {
            align: "rigth",
            color: "gray",
            fontSize: 20
          },
          top: "3%",
          left: "5%"
        },
        grid: {
          top: "28%",
          right: "10%",
          bottom: "18%" // 也可设置left和right设置距离来控制图表的大小
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(17,95,182,0.5)",
          textStyle: {
            color: "#fff"
          },
          // TODO: Maybe change back
          // axisPointer: {
          //     type: "line",
          //     label: {
          //         show: false,
          //     }
          // },
          formatter: pa => {
            const oneDotHtml =
              "<span style=\"display:inline-block;margin-right:5px;width:10px;height:10px;background-color:#1480C2\"></span>";
            const twoDotHtml =
              "<span style=\"display:inline-block;margin-right:5px;width:10px;height:10px;background-color:#8957A1\"></span>";
            return `${pa[0].name}<br/>${oneDotHtml}${pa[1].seriesName}：${pa[1].value}<br>${twoDotHtml}${pa[0].seriesName}：${pa[0].value}`;
          }
        },
        dataZoom: [
          {
            show: false,
            xAxisIndex: 0,
            type: "slider",
            startValue: 0,
            endValue: this.end
          }
        ],
        legend: {
          top: "20%",
          left: "40%",
          // icon: 'rect',
          textStyle: {
            padding: [0, 0, 0, 10],
            color: "gray",
            fontSize: 14,
            lineHeight: 16
          },
          itemGap: 50,
          itemHeight: 10,
          data: ["肥料", "农药"]
        },
        xAxis: {
          data: ["草堂镇", "白帝镇", "朱衣镇", "康乐镇", "永乐镇", "安坪镇"],
          axisLine: {
            show: true, // 隐藏X轴轴线
            lineStyle: {
              color: "gray"
            }
          },
          axisTick: {
            show: false // 隐藏X轴刻度
          },
          axisLabel: {
            show: true,
            textStyle: {
              padding: [5, 0, 0, 0],
              color: "gray" // X轴文字颜色
            }
          }
        },
        yAxis: [
          {
            type: "value",
            name: "吨",
            nameTextStyle: {
              color: "gray",
              fontSize: 14
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(33,35,98,1)"
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "gray"
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: 14,
                color: "gray"
              }
            }
          },
          {
            type: "value",
            // TODO: Maybe change back
            // name: "同比",
            // nameTextStyle: {
            //     show: false,
            //     color: "#ebf8ac"
            // },
            position: "right",
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false,
              textStyle: {
                color: "gray"
              }
            }
          }
          // TODO: Maybe change back
          // {
          //     type: "value",
          //     // gridIndex: 1,
          //     min: 50,
          //     max: 100,
          //     splitNumber: 8,
          //     splitLine: {
          //         show: false
          //     },
          //     axisLine: {
          //         show: false
          //     },
          //     axisTick: {
          //         show: false
          //     },
          //     axisLabel: {
          //         show: false
          //     },
          //     splitArea: {
          //         show: true,
          //         areaStyle: {
          //             color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"]
          //         }
          //     }
          // }
        ],
        series: [
          {
            name: "农药",
            type: "line",
            yAxisIndex: 1, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            smooth: false, // 平滑曲线显示
            showAllSymbol: true, // 显示所有图形。
            symbol: "emptyCircle", // 标记的图形为实心圆
            symbolSize: 10, // 标记的大小
            itemStyle: {
              // 折线拐点标志的样式
              color: "#8957A1"
            },
            lineStyle: {
              color: "#8957A1"
            },
            // areaStyle:{
            //     color: 'transparent'
            //     // color: "rgba(5,140,255, 0.2)"
            // },
            data: [5, 5, 5, 5, 5, 5]
          },
          {
            name: "肥料",
            type: "bar",
            barWidth: "30%",
            showBackground: false,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "red"
                  },
                  {
                    offset: 0,
                    color: "#1F0D5E"
                  },
                  {
                    offset: 1,
                    color: "#1480C2"
                  }
                ])
              }
            },
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: "gray"
                }
              }
            },
            data: [14, 16, 20, 7, 15, 11]
          }
        ]
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  computed: {
    ...mapState("setting", ["brandTheme", "mode"])
  },
  watch: {
    brandTheme() {
    },
    mode() {
      this.renderCharts();
    }
  },
  mounted() {
    // TODO: Maybe change back
    // this.$nextTick(() => {
    //   this.updateContainer();
    // });
    // this.renderCharts();
  },
  methods: {
    onMaterialChange(value) {
      const { chartColors } = this.$store.state.setting;

      this.lineChart.setOption(getFolderLineDataSet({ dateTime: value, ...chartColors }));
    },
    updateContainer() {
      this.lineChart.resize?.({
        width: this.lineContainer.clientWidth,
        height: this.lineContainer.clientHeight
      });
    },
    renderCharts() {
      const { chartColors } = this.$store.state.setting;

      if (!this.lineContainer) {
        this.lineContainer = document.getElementById("lineContainer");
      }
      this.lineChart = echarts.init(this.lineContainer);
      this.lineChart.setOption(getFolderLineDataSet({ ...chartColors }));

      window.addEventListener("resize", this.updateContainer, false);
    }
  }
};
</script>
<style scoped>
.el-progress {
  margin: 10px;
}

.lineStyle {
  text-align: center;
}

.headerTitle {
  font-size: 16px;
  color: var(--light-blue-color);
  font-weight: 700;
}

.demoClass .spaceMargin {
  padding: 15px 0;
}
</style>