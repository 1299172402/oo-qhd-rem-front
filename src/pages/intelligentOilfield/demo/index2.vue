<template>
  <div>
    <div class="headerTitle spaceMargin">
      ====================================================echarts/d3等组件一览大全========================================
    </div>
    <div class="headerTitle spaceMargin">
      1、echarts图表【未作封装以及大小适配】=========================================================================================
    </div>
    <div class="spaceMargin">
      1.1、折线图
    </div>
    <charts-components
      ref="dataOptionLine"
      :chart-data-options="dataOptionLine"
      echarts-type="line1"
      style="width: 600px; height: 400px"
    />
    <div class="spaceMargin">
      1.2、多Y轴折线图
    </div>
    <charts-components ref="char8" :chart-data-options="char8" style="width: 600px; height: 400px" />
    <div class="spaceMargin">
      1.3、柱状折线混合图（设置了x轴文字过长显示）
    </div>
    <charts-components
      ref="dataZhuzhuang"
      :chart-data-options="dataZhuzhuang"
      echarts-type="bar1"
      style="width: 600px; height: 400px"
    />
    <div class="spaceMargin">
      1.4、散点图
    </div>
    <charts-components ref="char4" :chart-data-options="char4" style="width: 600px; height: 400px" />
    <div class="spaceMargin">
      1.5、横线柱状单一堆叠图
    </div>
    <charts-components ref="char5" :chart-data-options="char5" style="width: 600px; height: 100px" />
    <div class="spaceMargin">
      1.6、横向柱状图
    </div>
    <charts-components ref="char6" :chart-data-options="char6" style="width: 600px; height: 400px" />
    <div class="spaceMargin">
      1.7、多柱柱状图
    </div>
    <charts-components ref="char7" :chart-data-options="char7" style="width: 1000px; height: 400px" />
    <div class="spaceMargin">
      1.8、横向堆叠柱状图
    </div>
    <charts-components ref="char10" :chart-data-options="char10" style="width: 600px; height: 400px" />
    <div class="spaceMargin">
      1.9、环形图
    </div>
    <charts-components
      ref="dataOption"
      :chart-data-options="dataOption"
      echarts-type="pie1"
      style="width: 400px; height: 400px"
    />
    <div class="spaceMargin">
      1.10、半环形图
    </div>
    <charts-components :chart-data-options="char3" style="width: 600px; height: 400px" />
    <div class="spaceMargin">
      1.11、雷达图A（单维度）
    </div>
    <charts-components :chart-data-options="char1" style="width: 600px; height: 400px" />
    <div class="spaceMargin">
      1.12、雷达图B（多维度）
    </div>
    <charts-components :chart-data-options="char2" style="width: 600px; height: 400px" />
    <div class="spaceMargin">
      1.13、仪表盘A
    </div>
    <charts-components :chart-data-options="char9" style="width: 600px; height: 400px" />
    <div class="spaceMargin">
      1.14、仪表盘B
    </div>
    <charts-components :chart-data-options="char11" style="width: 600px; height: 400px" />
    <div class="spaceMargin">
      1.15、仪表盘C
    </div>
    <charts-components :chart-data-options="char12" style="width: 600px; height: 400px" />
    <div class="spaceMargin">
      1.16、水球图A
    </div>
    <charts-components :chart-data-options="char13" style="width: 600px; height: 400px" />
    <div class="spaceMargin">
      1.17、水球图B
    </div>
    <charts-components :chart-data-options="char14" style="width: 600px; height: 400px" />
    <div class="spaceMargin">
      1.18、多Y轴状折线图
    </div>
    <charts-components :chart-data-options="char15" style="width: 600px; height: 400px" />
    <!-- TODO: Maybe change back -->
    <!-- <div id="lineContainer" ref="lineContainer" style="width: 50%; height: 410px" /> -->
    <div class="headerTitle spaceMargin">
      2、d3图表深浅色系切换示例（适合数据比较多的时候使用）
    </div>
    <div class="spaceMargin">
      2.1、d3饼图
    </div>
    <d-pie :dataset="[30, 10, 43, 55, 13]" />
    <div class="spaceMargin">
      2.2、d3折线图
    </div>
    <d-line id="line" :dataset="data1" />
    <div class="spaceMargin">
      2.1、d3柱状图
    </div>
    <d-bar :label-list="labelList" :data-list="dataListD3" />
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
import dPie from "@/components/intelligentOilfield/d3/dPie.vue";
import dLine from "@/components/intelligentOilfield/d3/dLine.vue";
import dBar from "@/components/intelligentOilfield/d3/dBar.vue";
// 引入水球图
import "echarts-liquidfill";

echarts.use([GridComponent, LegendComponent, TooltipComponent, LineChart, CanvasRenderer]);
const labelName = ["总值", "合格值"];

const colors = [getComputedStyle(document.documentElement).getPropertyValue("--chart1"),
  getComputedStyle(document.documentElement).getPropertyValue("--chart2"),
  getComputedStyle(document.documentElement).getPropertyValue("--chart3"),
  getComputedStyle(document.documentElement).getPropertyValue("--chart4"),
  getComputedStyle(document.documentElement).getPropertyValue("--chart5"),
  getComputedStyle(document.documentElement).getPropertyValue("--chart6"),
  getComputedStyle(document.documentElement).getPropertyValue("--chart7"),
  getComputedStyle(document.documentElement).getPropertyValue("--chart8"),
  getComputedStyle(document.documentElement).getPropertyValue("--chart9"),
  getComputedStyle(document.documentElement).getPropertyValue("--chart10")
];
const getRate = 70;
const getxb1 = 650; // 男生人数
const getxb2 = 350; // 女生人数
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
    chartsComponents, dPie, dLine, dBar
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
                  color: "#8FA4CC"
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
          extraCssText: "max-width: 150px; white-space: pre-wrap",
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
          x: "center", // 可设定图例在左、右、居中
          y: "bottom", // 可设定图例在上、下、居中
          padding: [2, 0, 10, 0], // 可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
          textStyle: {
            color: getComputedStyle(document.documentElement).getPropertyValue("--text1"),
            fontSize: 14
          },
          data: ["历史价格"]
        },

        grid: {
          top: "5%",
          left: "12%",
          right: "13%",
          bottom: "15%"
          // TODO: Maybe change back
          // containLabel: true
        },
        xAxis: [
          {
            name: "日期(日)",
            nameTextStyle: {
              color: "#8FA4CC",
              fontSize: 14
            },
            type: "category",
            axisLine: {
              show: false,
              color: "#A582EA"
            },

            axisLabel: {
              color: "#8FA4CC",
              fontSize: 14
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
            // 居中
            nameLocation: "middle",
            // 坐标轴名称与轴线之间的距离。
            nameGap: 50,
            nameTextStyle: {
              color: "#8FA4CC",
              fontSize: 14
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
                color: "#8FA4CC",
                fontSize: 14
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
          top: "5%",
          left: "12%",
          right: "13%",
          bottom: "25%"
        },
        tooltip: {
          trigger: "axis",
          extraCssText: "max-width: 200px; white-space: pre-wrap",
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
          x: "center", // 可设定图例在左、右、居中
          y: "bottom", // 可设定图例在上、下、居中
          padding: [2, 0, 10, 0], // 可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
          textStyle: {
            color: getComputedStyle(document.documentElement).getPropertyValue("--text1"),
            fontSize: 14
          },
          itemGap: 50,
          itemHeight: 10,
          data: ["肥料", "农药"]
        },
        xAxis: {
          data: ["草堂镇镇镇镇镇", "白帝镇", "朱衣镇", "康乐镇", "永乐镇", "安坪镇"],
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
            rotate: -45,
            formatter: function(value) {
              let res = value;
              if (res.length > 6) {
                res = `${res.substring(0, 6)}...`;
              }
              return res;
            },
            textStyle: {
              color: "#8FA4CC",
              fontSize: 14
            }
          }
        },
        yAxis: [
          {
            type: "value",
            name: "吨",
            // 居中
            nameLocation: "middle",
            // 坐标轴名称与轴线之间的距离。
            nameGap: 30,
            nameTextStyle: {
              color: "#8FA4CC",
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
                color: "#8FA4CC",
                fontSize: 14
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
      ],
      char1: {
        tooltip: {
          // 雷达图的tooltip不会超出div，也可以设置position属性，position定位的tooltip 不会随着鼠标移动而位置变化，不友好
          confine: true,
          enterable: true // 鼠标是否可以移动到tooltip区域内
        },
        radar: {
          name: {
            textStyle: {
              color: "#088AD5",
              fontSize: 14
            }
          },
          "shape": "circle",
          center: ["50%", "50%"],
          radius: "80%",
          startAngle: 120,
          scale: true,
          axisLine: {
            lineStyle: {
              color: "#088AD5"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: "#088AD5" // 设置网格的颜色
            }
          },
          indicator: [
            {
              name: "信访",
              max: 100
            },
            {
              name: "12345",
              max: 100
            },
            {
              name: "事件",
              max: 100
            },
            {
              name: "矛盾调解",
              max: 100
            },
            {
              name: "人民调解",
              max: 100
            }
          ],
          splitArea: {
            show: false
          }
        },
        grid: {
          position: "center"
        },
        polar: {
          center: ["50%", "50%"], // 默认全局居中
          radius: "0%"
        },
        angleAxis: {
          min: 0,
          interval: 5,
          clockwise: false,
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        radiusAxis: {
          min: 0,
          interval: 20,
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: "个人雷达图",
            type: "radar",
            symbol: "circle", // 拐点的样式，还可以取值'rect','angle'等
            symbolSize: 10, // 拐点的大小
            itemStyle: {
              normal: {
                color: "#088AD5"
              }
            },
            areaStyle: {
              normal: {
                color: "#088AD5",
                opacity: 0.5
              }
            },
            lineStyle: {
              width: 2,
              color: "#088AD5"
            },
            label: {
              normal: {
                show: true,
                formatter: params => params.value,
                color: "#088AD5"
              }
            },
            data: [
              {
                value: [20, 50, 60, 60, 90, 80]
              }
            ]
          }
        ]
      },
      char2: {
        "tooltip": {
          "show": true,
          "trigger": "item",
          "confine": true,
          extraCssText: "max-width: 300px; white-space: pre-wrap"
        },
        "legend": {
          "icon": "roundRect",
          "left": "center",
          "top": "bottom",
          "itemHeight": 3,
          "textStyle": {
            "fontSize": 14,
            "color": "#088AD5"
          }
        },
        "radar": {
          "center": [
            "50%",
            "50%"
          ],
          "radius": "70%",
          "splitNumber": 4,
          "shape": "circle",
          "axisLine": {
            "show": true,
            "lineStyle": {
              "color": "#088AD5"
            }
          },
          "splitLine": {
            "show": true,
            "lineStyle": {
              "color": "#088AD5"
            }
          },
          name: {
            formatter: function(value) {
              const list = value.split("");
              let result = "";
              for (let i = 1;i <= list.length;i++) {
                if (!(i % 10) && list[i] !== undefined) {
                  result += `${list[i - 1]}\n`;
                } else {
                  result += list[i - 1];
                }
              }
              return result;
            }
          },
          "indicator": [
            {
              "max": 33.589858019999994,
              "min": 8.817294088,
              "name": "新开工面积合计"
            },
            {
              "max": 24.430116012,
              "min": -19.409638404000003,
              "name": "省网用电量"
            },
            {
              "max": 31.359995748,
              "min": -8.5877728368,
              "name": "铁路货运量"
            },
            {
              "max": 0.0714815064,
              "min": -8.0652219948,
              "name": "中外资银行业机构本外币贷款余额_企(事)业单位中长期贷款"
            },
            {
              "max": -5.004399198400001,
              "min": -15.252673644,
              "name": "社会融资规模"
            }
          ]
        },
        "series": {
          "name": "雷达图",
          "type": "radar",
          "itemStyle": {
            "show": false
          },
          "lineStyle": {
            "normal": {
              "width": 2
            }
          },
          "areaStyle": {
            "normal": {
              "color": "rgba(0, 0, 0, 0)"
            }
          },
          "data": [
            {
              "name": "河南省",
              "value": [
                27.99154835,
                -16.17469867,
                26.13332979,
                0.059567922,
                -12.71056137
              ]
            },
            {
              "name": "北京市",
              "value": [
                11.02161761,
                20.35843001,
                -7.156477364,
                -6.721018329,
                -6.255498998
              ]
            }
          ]
        }
      },
      char3: {
        tooltip: {
          trigger: "item"
        },
        series: [{
          name: "性别分布",
          type: "pie",
          radius: ["55%", "115%"],
          startAngle: 180,
          center: ["45%", "83%"],
          roseType: "radius",
          labelLine: {
            show: true,
            normal: {
              length: 20,
              length2: 15,
              lineStyle: {
                color: "#088AD5"
              }
            }
          },
          label: {
            color: "#088AD5",
            normal: {
              color: "#088AD5"
            }
          },
          data: [
            {
              value: getxb1,
              name: "男生",
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: "#4C8DFA"
                  }, {
                    offset: 1,
                    color: "#5CCFFF"
                  }], false)
                }
              }
            },
            {
              value: getxb2,
              name: "女生",
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: "#FFD18B"
                  },
                  {
                    offset: 1,
                    color: "#FDAD59"
                  }], false)
                }
              }
            },
            {
              value: getxb1 + getxb2,
              name: "",
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              itemStyle: {
                normal: {
                  color: "transparent",
                  borderWidth: 0,
                  shadowBlur: 0,
                  borderColor: "transparent",
                  shadowColor: "transparent"
                }
              }
            }]
        },
        {
          type: "pie",
          radius: ["55%", "130%"],
          startAngle: 180,
          hoverAnimation: false,
          center: ["45%", "83%"],
          roseType: "radius",
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
            value: getxb1,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: "rgba(76,141,250,.3)"
                }, {
                  offset: 1,
                  color: "rgba(92,207,255,.3)"
                }], false)
              }
            }
          },
          {
            value: getxb2,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: "rgba(255,209,139,.3)"
                }, {
                  offset: 1,
                  color: "rgba(253,173,89,.3)"
                }], false)
              }
            }
          },
          {
            value: getxb1 + getxb2,
            name: "",
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            itemStyle: {
              normal: {
                color: "transparent",
                borderWidth: 0,
                shadowBlur: 0,
                borderColor: "transparent",
                shadowColor: "transparent"
              }
            }
          }],
          z: -1
        }]
      },
      char4: {
        color: ["#37A2DA"],
        grid: {
          top: "5%",
          left: "12%",
          right: "13%",
          bottom: "15%"
        },
        legend: {
          x: "center", // 可设定图例在左、右、居中
          y: "bottom", // 可设定图例在上、下、居中
          padding: [2, 0, 10, 0], // 可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
          textStyle: {
            color: getComputedStyle(document.documentElement).getPropertyValue("--text1"),
            fontSize: 14
          },
          data: ["体重"]
        },
        tooltip: {
          trigger: "item",
          showDelay: 0,
          formatter: function(params) {
            if (params.value.length > 1) {
              return `${params.seriesName} :<br/>${
                params.value[0]}cm ${
                params.value[1]}kg `;
            }
            return `${params.seriesName} :<br/>${
              params.name} : ${
              params.value}kg `;
          },
          axisPointer: {
            show: true,
            type: "cross"
          }
        },
        xAxis: [{
          type: "value",
          scale: true,
          axisLabel: {
            formatter: "{value} cm",
            color: "#8FA4CC",
            fontSize: 14
          },
          splitLine: {
            show: false,
            lineStyle: {
              type: "dashed"
            }
          }
        }],
        yAxis: [{
          type: "value",
          scale: true,
          axisLabel: {
            formatter: "{value} kg",
            color: "#8FA4CC",
            fontSize: 14
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "gray",
              opacity: 0.23
            }
          }
        }],
        series: [{
          name: "体重",
          type: "scatter",
          symbolSize: 14,
          data: [
            [178.0, 89.6],
            [180.3, 82.8],
            [180.3, 76.4],
            [164.5, 63.2],
            [173.0, 60.9],
            [183.5, 74.8],
            [175.5, 70.0],
            [188.0, 72.4],
            [189.2, 84.1],
            [172.8, 69.1],
            [170.0, 59.5],
            [182.0, 67.2],
            [170.0, 61.3],
            [177.8, 68.6],
            [184.2, 80.1],
            [186.7, 87.8],
            [171.4, 84.7],
            [172.7, 73.4],
            [175.3, 72.1],
            [180.3, 82.6],
            [182.9, 88.7],
            [188.0, 84.1],
            [177.2, 94.1],
            [172.1, 74.9],
            [167.0, 59.1],
            [169.5, 75.6],
            [174.0, 86.2],
            [172.7, 75.3],
            [182.2, 87.1],
            [164.1, 55.2],
            [163.0, 57.0],
            [171.5, 61.4],
            [165.1, 65.0],
            [174.0, 88.6],
            [175.3, 84.1],
            [185.4, 66.8],
            [177.8, 75.5],
            [180.3, 93.2],
            [180.3, 82.7],
            [177.8, 58.0],
            [177.8, 79.5],
            [172.7, 90.9],
            [190.5, 73.6],
            [185.4, 76.4],
            [168.9, 69.1],
            [167.6, 84.5],
            [175.3, 64.5],
            [170.2, 69.1],
            [190.5, 108.6],
            [177.8, 86.4],
            [172.7, 76.8],
            [177.8, 63.6],
            [177.8, 80.9],
            [182.9, 80.9],
            [170.2, 85.5],
            [167.6, 68.6],
            [175.3, 67.7],
            [165.1, 66.4],
            [185.4, 102.3],
            [181.6, 70.5],
            [172.7, 95.9],
            [190.5, 84.1],
            [179.1, 87.3],
            [175.3, 71.8],
            [170.2, 65.9],
            [193.0, 95.9],
            [171.4, 91.4],
            [177.8, 81.8],
            [177.8, 96.8],
            [167.6, 69.1],
            [167.6, 82.7],
            [180.3, 75.5],
            [182.9, 79.5],
            [176.5, 73.6],
            [186.7, 91.8],
            [188.0, 84.1],
            [188.0, 85.9],
            [177.8, 81.8],
            [174.0, 82.5],
            [177.8, 80.5],
            [171.4, 70.0],
            [185.4, 81.8],
            [185.4, 84.1],
            [188.0, 90.5],
            [188.0, 91.4],
            [182.9, 89.1],
            [176.5, 85.0],
            [175.3, 69.1],
            [175.3, 73.6],
            [188.0, 80.5],
            [188.0, 82.7],
            [175.3, 86.4],
            [170.5, 67.7],
            [179.1, 92.7],
            [177.8, 93.6],
            [175.3, 70.9],
            [182.9, 75.0],
            [170.8, 93.2],
            [188.0, 93.2],
            [180.3, 77.7],
            [177.8, 61.4],
            [185.4, 94.1],
            [168.9, 75.0],
            [185.4, 83.6],
            [180.3, 85.5],
            [174.0, 73.9],
            [167.6, 66.8],
            [182.9, 87.3],
            [160.0, 72.3],
            [180.3, 88.6],
            [167.6, 75.5],
            [186.7, 101.4],
            [175.3, 91.1],
            [175.3, 67.3],
            [175.9, 77.7],
            [175.3, 81.8],
            [179.1, 75.5],
            [181.6, 84.5],
            [177.8, 76.6],
            [182.9, 85.0],
            [177.8, 102.5],
            [184.2, 77.3],
            [179.1, 71.8],
            [176.5, 87.9],
            [188.0, 94.3],
            [174.0, 70.9],
            [167.6, 64.5],
            [170.2, 77.3],
            [167.6, 72.3],
            [188.0, 87.3],
            [174.0, 80.0],
            [176.5, 82.3],
            [180.3, 73.6],
            [167.6, 74.1],
            [188.0, 85.9],
            [180.3, 73.2],
            [167.6, 76.3],
            [183.0, 65.9],
            [183.0, 90.9],
            [179.1, 89.1],
            [170.2, 62.3],
            [177.8, 82.7],
            [179.1, 79.1],
            [190.5, 98.2],
            [177.8, 84.1],
            [180.3, 83.2],
            [180.3, 83.2]
          ]
        }]
      },
      char5: {
        "color": ["#4C98FB", "#83CCE7", "#26C7C8", "#73DEBD"],
        "legend": {
          x: "center", // 可设定图例在左、右、居中
          y: "bottom", // 可设定图例在上、下、居中
          padding: [2, 0, 10, 0], // 可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
          textStyle: {
            color: getComputedStyle(document.documentElement).getPropertyValue("--text1"),
            fontSize: 14
          },
          "data": ["华为", "中兴", "烽火", "瑞斯"] },
        "grid": {
          "left": "20%"
        },
        "xAxis": {
          "type": "value",
          "show": false,
          "minorSplitLine": {
            "show": false
          }
        },
        "yAxis": {
          "type": "category",
          "data": ["各厂商端口占比"],
          axisLabel: {
            show: true,
            margin: 15,
            textStyle: {
              color: "#8FA4CC",
              fontSize: 14
            }
          },
          "axisLine": { "show": false },
          "axisTick": { "show": false }},
        "series": [
          { "name": "华为", "type": "bar", "stack": "total", "barWidth": "30px", "label": { "show": true }, "emphasis": { "focus": "series" }, "data": [320] },
          { "name": "中兴", "type": "bar", "stack": "total", "barWidth": "30px", "label": { "show": true }, "emphasis": { "focus": "series" }, "data": [120] },
          { "name": "烽火", "type": "bar", "stack": "total", "barWidth": "30px", "label": { "show": true }, "emphasis": { "focus": "series" }, "data": [220] },
          { "name": "瑞斯", "type": "bar", "stack": "total", "barWidth": "30px", "label": { "show": true }, "emphasis": { "focus": "series" }, "data": [150] }] },
      char6: {
        backgroundColor: "transparent",
        "color": [
          "#1c9a4c"
        ],
        "grid": {
          top: "5%",
          left: "17%",
          right: "13%",
          bottom: "15%"
        },
        legend: {
          x: "center", // 可设定图例在左、右、居中
          y: "bottom", // 可设定图例在上、下、居中
          padding: [2, 0, 10, 0], // 可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
          textStyle: {
            color: getComputedStyle(document.documentElement).getPropertyValue("--text1"),
            fontSize: 14
          }
        },
        "yAxis": {
          "data": [
            "用户撞车",
            "SQL注入检测",
            "机器人登录",
            "账号盗用",
            "web高频攻击",
            "端口扫描",
            "内网连接…",
            "邮件外发"
          ],
          "axisTick": {
            "show": false
          },
          axisLabel: {
            color: "#8FA4CC",
            fontSize: 14
          }
        },
        "xAxis": [
          {
            "axisTick": {
              "show": false
            },
            splitLine: {
              show: false
            },
            "type": "value",
            "splitNumber": 5,
            "axisLabel": {
              "formatter": "{value}%",
              color: "#8FA4CC",
              fontSize: 14
            }
          }
        ],
        "series": [
          {
            "name": "销量",
            "type": "bar",
            "barWidth": "55%",
            "label": {
              "normal": {
                "show": true,
                "position": "right",
                "formatter": "{c}%",
                "textStyle": {
                  "color": "#8FA4CC"
                }
              }
            },
            "data": [
              "23.61",
              "4.29",
              "7.73",
              "2.15",
              "10.73",
              "17.17",
              "21.46",
              "12.88"
            ]
          }
        ]
      },
      char7: {
        backgroundColor: "transparent",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["接入率", "在线率", "完好率"],
          x: "center", // 可设定图例在左、右、居中
          y: "bottom", // 可设定图例在上、下、居中
          padding: [2, 0, 10, 0], // 可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
          textStyle: {
            color: getComputedStyle(document.documentElement).getPropertyValue("--text1"),
            fontSize: 14
          }
        },
        grid: {
          top: "5%",
          left: "5%",
          right: "13%",
          bottom: "15%"
        },
        xAxis: [{
          type: "category",
          data: ["喀什市",
            "疏附县",
            "疏勒县",
            "英吉沙县",
            "泽普县",
            "岳普湖县",
            "巴楚县",
            "伽师县",
            "叶城县",
            "莎车县 "
          ],
          axisLine: {
            show: true,
            lineStyle: {
              color: "grey",
              width: 1,
              type: "solid"
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#8FA4CC",
              fontSize: 14
            }
          }
        }],
        yAxis: [{
          type: "value",
          axisLabel: {
            formatter: "{value} %",
            textStyle: {
              color: "#8FA4CC",
              fontSize: 14
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "grey",
              width: 1,
              type: "solid"
            }
          },
          splitLine: {
            lineStyle: {
              color: "grey",
              opacity: 0.23
            }
          }
        }],
        series: [{
          name: "接入率",
          type: "bar",
          data: [20, 50, 80, 58, 83, 68, 57, 80, 42, 66],
          barWidth: 10, // 柱子宽度
          barGap: 1, // 柱子之间间距
          itemStyle: {
            normal: {
              color: "#008cff",
              opacity: 1
            }
          }
        }, {
          name: "在线率",
          type: "bar",
          data: [50, 70, 60, 61, 75, 87, 60, 62, 86, 46],
          barWidth: 10,
          barGap: 1,
          itemStyle: {
            normal: {
              color: "#00da9c",
              opacity: 1
            }
          }
        }, {
          name: "完好率",
          type: "bar",
          data: [70, 48, 73, 68, 53, 47, 50, 72, 96, 86],
          barWidth: 10,
          barGap: 1,
          itemStyle: {
            normal: {
              color: "#c4e300",
              opacity: 1
            }
          }
        }]
      },
      char8: {
        title: {
          textStyle: {
            color: "#088AD5"
          }
        },
        color: colors,
        tooltip: {
          trigger: "axis"
        },
        grid: {
          top: "5%",
          left: "25%",
          right: "13%",
          bottom: "18%"
          // TODO: Maybe change back
          // containLabel: true
        },
        toolbox: {
          feature: {
            dataView: {
              show: false,
              readOnly: false
            },
            restore: {
              show: false
            },
            saveAsImage: {
              show: false
            }
          }
        },
        legend: {
          textStyle: {
            color: getComputedStyle(document.documentElement).getPropertyValue("--text1"),
            fontSize: 14
          },
          x: "center", // 可设定图例在左、右、居中
          y: "bottom", // 可设定图例在上、下、居中
          padding: [3, 0, 20, 0], // 可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
          position: "right",
          data: ["设备新增数量", "产品新增数量", "厂商新增数量"]
        },
        xAxis: [
          {
            type: "category",
            // axisTick: {
            //   alignWithLabel: false
            // },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#ECEDF0", // y轴线的颜色（若只设置了y轴线的颜色，未设置y轴文字的颜色，则y轴文字会默认跟设置的y轴线颜色一致）
                width: 1, // y轴线的宽度
                type: "dashed" // y轴线为实线
              }
            },
            axisLabel: {
              color: "#8FA4CC",
              fontSize: 14
            },
            data: [
              "2016-01",
              "2016-02",
              "2016-03",
              "2016-04",
              "2016-05",
              "2016-06",
              "2016-07",
              "2016-08",
              "2016-09",
              "2016-10",
              "2016-11",
              "2016-12"
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "设备新增数量",
            nameTextStyle: {
              color: "#8FA4CC",
              fontSize: 14
            },
            // 居中
            nameLocation: "middle",
            // 坐标轴名称与轴线之间的距离。
            nameGap: 55,
            min: 0,
            max: 11000,
            position: "left",
            axisLine: {
              lineStyle: {
                color: colors[2]
              },
              show: true
            },
            axisLabel: {
              show: true,
              margin: 15,
              textStyle: {
                color: "#8FA4CC",
                fontSize: 14
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "grey",
                opacity: 0.23,  // y轴线的颜色（若只设置了y轴线的颜色，未设置y轴文字的颜色，则y轴文字会默认跟设置的y轴线颜色一致）
                width: 1, // y轴线的宽度
                type: "solid" // y轴线为实线
              }
            },
            axisTick: {
              show: true
            }
          },
          {
            type: "value",
            name: "产品新增数量",
            nameTextStyle: {
              fontSize: 14
            },
            // 居中
            nameLocation: "middle",
            // 坐标轴名称与轴线之间的距离。
            nameGap: 50,
            min: 0,
            max: 200,
            position: "right",
            axisLine: {
              lineStyle: {
                color: colors[0]
              },
              show: true
            },
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                fontSize: 14
              }
            },
            axisTick: {
              show: true
            },
            splitLine: {
              show: false
            }
          },
          {
            type: "value",
            nameTextStyle: {
              fontSize: 14
            },
            name: "厂商新增数量",
            // 居中
            nameLocation: "middle",
            // 坐标轴名称与轴线之间的距离。
            nameGap: 40,
            min: 0,
            max: 200,
            position: "left",
            offset: 80,
            axisLine: {
              lineStyle: {
                color: colors[1]
              },
              show: true
            },
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                fontSize: 14
              }
            },
            axisTick: {
              show: true
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "设备新增数量",
            type: "line",
            data: [
              10000, 2000, 1065, 3620, 6530, 9510, 2000, 3002, 3580, 5063, 1520, 9000
            ]
          },
          {
            name: "产品新增数量",
            type: "line",
            yAxisIndex: 1,
            data: [10, 50, 100, 32, 56, 87, 41, 25, 46, 96, 30, 150]
          },
          {
            name: "厂商新增数量",
            type: "line",
            data: [1200, 1850, 206, 36, 255, 1800, 1600, 4547, 9958, 69, 93, 150]
          }
        ]
      },
      char10: {
        "tooltip": { "trigger": "axis", "axisPointer": { "type": "shadow" }},
        "legend": {
          x: "center", // 可设定图例在左、右、居中
          y: "bottom", // 可设定图例在上、下、居中
          padding: [2, 0, 10, 0], // 可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
          textStyle: {
            color: getComputedStyle(document.documentElement).getPropertyValue("--text1"),
            fontSize: 14
          },
          "data": [{ "name": "SO2", "icon": "rect" }, { "name": "O3", "icon": "rect" }]
        },
        "grid": {
          top: "5%",
          left: "12%",
          right: "13%",
          bottom: "15%"
        },
        "xAxis": {
          "type": "value",
          "axisLine": {
            "show": true,
            "lineStyle": {
              "color": "grey",
              opacity: 0.23
            }},
          "axisLabel": {
            "show": true,
            color: "#8FA4CC",
            fontSize: 14
          },
          "axisTick": { "show": false },
          "splitLine": {
            "show": true,
            "lineStyle": {
              "color": "grey",
              opacity: 0.23
            }}},
        "yAxis": {
          "type": "category",
          "data": ["地区一", "地区二", "地区三", "地区四"],
          "inverse": true,
          "axisLine": {
            "show": false
          },
          "axisLabel": {
            "show": true,
            color: "#8FA4CC",
            fontSize: 14
          },
          "axisTick": {
            "show": false
          },
          "splitLine": { "show": false }},
        "series": [
          { "name": "SO2",
            "type": "bar",
            "barWidth": 20,
            "stack": "因子",
            "data": [12, 10, 20, 30],
            "itemStyle": {
              "color": "#FFD237",
              "shadowColor": "rgba(0, 0, 0, 0.16)",
              "shadowOffsetX": 0,
              "shadowOffsetY": 3,
              "shadowBlur": 6 }},
          {
            "name": "O3",
            "type": "bar",
            "barWidth": 20,
            "stack": "因子",
            "data": [21, 25, 25, 25],
            "itemStyle": { "color": "#F39927",
              "shadowColor": "rgba(0, 0, 0, 0.16)",
              "shadowOffsetX": 0, "shadowOffsetY": 3, "shadowBlur": 6 }},
          { "name": "总计", "type": "bar", "barWidth": 20, "barGap": "-100%", "label": { "show": true, "offset": [10, 0], "position": "right", "textStyle": { "color": "#8FA4CC", "fontSize": 16 }}, "itemStyle": { "normal": { "color": "transparent" }}, "data": [33, 35, 45, 55] }] },
      char11: {
        title: {
          x: "center",
          bottom: 80,
          subtext: "信用等级",
          subtextStyle: {
            color: "#8FA4CC"
          }
        },
        tooltip: {
          show: true,
          backgroundColor: "#F7F9FB",
          borderColor: "#92DAFF",
          borderWidth: "1px",
          textStyle: {
            color: "black"
          },
          formatter: function(param) {
            return `<em style="color:${param.color};">${param.value}</em> 分`;
          }

        },
        series: [{
          name: "信用分",
          type: "gauge",
          min: 350,
          max: 950,
          axisLine: {
            show: true,
            lineStyle: {
              width: 40,
              shadowBlur: 0,
              color: [
                [0.2, "#E43F3D"],
                [0.4, "#E98E2C"],
                [0.6, "#DDBD4D"],
                [0.8, "#7CBB55"],
                [1, "#9CD6CE"]
              ]
            }
          },
          axisTick: {
            show: false,
            splitNumber: 1
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false,
            length: 40,
            lineStyle: {
            }
          },
          pointer: {
            show: true
          },
          detail: {
            formatter: function(param) {
              var level = "";
              if (param < 470) {
                level = "较差";
              } else if (param < 590) {
                level = "中等";
              } else if (param < 710) {
                level = "良好";
              } else if (param < 830) {
                level = "优秀";
              } else if (param <= 950) {
                level = "极好";
              } else {
                level = "暂无";
              }
              return level;
            },
            offsetCenter: [0, 80],
            textStyle: {
              fontSize: 24,
              color: "#088AD5"
            }
          },
          data: [{
            name: "",
            value: Math.floor(666)
          }]
        }]
      },
      char12: {
        title: {
          x: "center",
          bottom: 80,
          subtext: "信用等级",
          subtextStyle: {
            color: "#8FA4CC"
          }
        },
        tooltip: {
          show: true,
          backgroundColor: "#F7F9FB",
          borderColor: "#92DAFF",
          borderWidth: "1px",
          textStyle: {
            color: "black"
          },
          formatter: function(param) {
            return `<em style="color:${param.color};">${param.value}</em> 分`;
          }

        },
        series: [{
          name: "信用分",
          type: "gauge",
          min: 0,
          max: 120,
          axisLine: {
            show: true,
            lineStyle: {
              width: 20,
              shadowBlur: 0,
              color: [
                [0.7, "#7CBB55"],
                [1, "#E98E2C"]
              ]
            }
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: "#088AD5"
            }
          },
          axisLabel: {
            formatter: "{value} %",
            distance: 25,
            textStyle: {
              color: "#088AD5"
            }

          },
          splitLine: {
            show: true,
            length: 10,
            lineStyle: {
              color: "#088AD5"
            }
          },
          pointer: {
            show: true
          },
          detail: {
            formatter: function(param) {
              return `${param}%`;
            },
            offsetCenter: [0, 80],
            textStyle: {
              fontSize: 24,
              color: "#088AD5"
            }
          },
          data: [{
            name: "",
            value: 78
          }]
        }]
      },
      char13: {
        title: [{
          text: "首要污染物：PM10",
          x: "center",
          y: "35%",
          textStyle: {
            fontWeight: "normal",
            fontSize: 14,
            color: "#fff"
          }
        }
        ],
        series: [
          {
            type: "liquidFill",
            radius: "45%",
            center: ["50%", "45%"],
            data: [0.5, 0.5, 0.5], // data个数代表波浪数
            backgroundStyle: {
              borderWidth: 1,
              color: "rgba(251,250,251,0.1)"
            },
            label: {
              normal: {
                // color: "blue",
                textStyle: {
                  fontSize: 20,
                  color: "#fff"
                }
              }
            },
            outline: {
              show: false
            }
          },
          {
            type: "pie",
            center: ["50%", "45%"],
            radius: ["50%", "52%"],
            hoverAnimation: false,
            data: [
              {
                name: "",
                value: 500,
                labelLine: {
                  show: false
                },
                itemStyle: {
                  color: "#009cff"
                },
                emphasis: {
                  labelLine: {
                    show: false
                  },
                  itemStyle: {
                    color: "#009cff"
                  }
                }
              },
              {
                // 画中间的图标
                name: "",
                value: 10,
                labelLine: {
                  show: false
                },
                itemStyle: {
                  color: "#ffffff",
                  normal: {
                    color: "#009cff",
                    borderColor: "#009cff",
                    borderWidth: 10,
                    borderRadius: "100%"
                  }
                },
                label: {
                  // borderRadius: "100%"
                },
                emphasis: {
                  labelLine: {
                    show: false
                  },
                  itemStyle: {
                    color: "transparent"
                  }
                }
              },
              {
                // 画剩余的刻度圆环
                name: "",
                value: 88,
                itemStyle: {
                  color: "transparent"
                },
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                emphasis: {
                  labelLine: {
                    show: false
                  },
                  itemStyle: {
                    color: "rgba(255,255,255,0)"
                  }
                }
              }
            ]
          }
        ]

      },
      char14: {
        title: {
          text: "山东",
          textStyle: {
            fontSize: 20,
            color: "rgba(255, 255, 255, 0.7)",
            rich: {
              a: {
                fontSize: 36
              }
            }
          },
          x: "center",
          y: "40%"
        },
        series: [{
          type: "liquidFill",
          radius: "50%",
          data: [0.6],
          color: "rgba(67,209,100,1)",
          label: {
            normal: {
              color: "#fff",
              insideColor: "transparent",
              textStyle: {
                fontSize: 16,
                fontWeight: "bold",
                fontFamily: "Microsoft YaHei"
              }
            }
          },
          outline: {
            show: true,
            borderDistance: 5,
            itemStyle: {
              borderColor: "rgba(67,209,100,1)",
              borderWidth: 2
            }
          },
          backgroundStyle: {
            color: "rgba(67,209,100,.3)"
          }
        }]
      },
      char15: {
        title: {
          textStyle: {
            color: "#088AD5"
          }
        },
        color: colors,
        tooltip: {
          trigger: "axis"
        },
        grid: {
          top: "5%",
          left: "25%",
          right: "13%",
          bottom: "18%"
          // TODO: Maybe change back
          // containLabel: true
        },
        toolbox: {
          feature: {
            dataView: {
              show: false,
              readOnly: false
            },
            restore: {
              show: false
            },
            saveAsImage: {
              show: false
            }
          }
        },
        legend: {
          textStyle: {
            color: getComputedStyle(document.documentElement).getPropertyValue("--text1"),
            fontSize: 14
          },
          x: "center", // 可设定图例在左、右、居中
          y: "bottom", // 可设定图例在上、下、居中
          padding: [3, 0, 20, 0], // 可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
          position: "right",
          data: ["设备新增数量", "产品新增数量", "厂商新增数量"]
        },
        xAxis: [
          {
            type: "category",
            // axisTick: {
            //   alignWithLabel: false
            // },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#ECEDF0", // y轴线的颜色（若只设置了y轴线的颜色，未设置y轴文字的颜色，则y轴文字会默认跟设置的y轴线颜色一致）
                width: 1, // y轴线的宽度
                type: "dashed" // y轴线为实线
              }
            },
            axisLabel: {
              color: "#8FA4CC",
              fontSize: 14
            },
            data: [
              "2016-01",
              "2016-02",
              "2016-03",
              "2016-04",
              "2016-05",
              "2016-06",
              "2016-07",
              "2016-08",
              "2016-09",
              "2016-10",
              "2016-11",
              "2016-12"
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "设备新增数量",
            nameTextStyle: {
              color: "#8FA4CC",
              fontSize: 14
            },
            // 居中
            nameLocation: "middle",
            // 坐标轴名称与轴线之间的距离。
            nameGap: 55,
            min: 0,
            max: 11000,
            position: "left",
            axisLine: {
              lineStyle: {
                color: colors[2]
              },
              show: true
            },
            axisLabel: {
              show: true,
              margin: 15,
              textStyle: {
                color: "#8FA4CC",
                fontSize: 14
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "grey",
                opacity: 0.23,  // y轴线的颜色（若只设置了y轴线的颜色，未设置y轴文字的颜色，则y轴文字会默认跟设置的y轴线颜色一致）
                width: 1, // y轴线的宽度
                type: "solid" // y轴线为实线
              }
            },
            axisTick: {
              show: true
            }
          },
          {
            type: "value",
            name: "产品新增数量",
            nameTextStyle: {
              fontSize: 14
            },
            // 居中
            nameLocation: "middle",
            // 坐标轴名称与轴线之间的距离。
            nameGap: 50,
            min: 0,
            max: 200,
            position: "right",
            axisLine: {
              lineStyle: {
                color: colors[0]
              },
              show: true
            },
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                fontSize: 14
              }
            },
            axisTick: {
              show: true
            },
            splitLine: {
              show: false
            }
          },
          {
            type: "value",
            nameTextStyle: {
              fontSize: 14
            },
            name: "厂商新增数量",
            // 居中
            nameLocation: "middle",
            // 坐标轴名称与轴线之间的距离。
            nameGap: 40,
            min: 0,
            max: 200,
            position: "left",
            offset: 80,
            axisLine: {
              lineStyle: {
                color: colors[1]
              },
              show: true
            },
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                fontSize: 14
              }
            },
            axisTick: {
              show: true
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "设备新增数量",
            type: "bar",
            barGap: 0.2,
            barWidth: 10,
            data: [
              10000, 2000, 1065, 3620, 6530, 9510, 2000, 3002, 3580, 5063, 1520, 9000
            ]
          },
          {
            name: "产品新增数量",
            type: "line",
            yAxisIndex: 1,
            data: [10, 50, 100, 32, 56, 87, 41, 25, 46, 96, 30, 150]
          },
          {
            name: "厂商新增数量",
            type: "line",
            data: [1200, 1850, 206, 36, 255, 1800, 1600, 4547, 9958, 69, 93, 150]
          }
        ]
      },
      char9: {
        "backgroundColor": "transparent",
        "series": [
          {
            "type": "pie",
            "radius": "85%",
            "center": [
              "50%",
              "50%"
            ],
            "z": 0,
            "itemStyle": {
              "normal": {
                "color": {
                  "x": 0.5,
                  "y": 0.5,
                  "r": 1,
                  "type": "radial",
                  "global": false,
                  "colorStops": [
                    {
                      "offset": 0,
                      "color": "rgba(17,24,43,0)",
                      "opacity": 0.3
                    },
                    {
                      "offset": 0.5,
                      "color": "rgba(28,42,91,.6)",
                      "opacity": 0.2
                    },
                    {
                      "offset": 1,
                      "color": "#141C33",
                      "opacity": 0.1
                    }
                  ]
                },
                "label": {
                  "show": false
                },
                "labelLine": {
                  "show": false
                }
              }
            },
            "hoverAnimation": false,
            "label": {
              "show": false
            },
            "tooltip": {
              "show": false
            },
            "data": [
              100
            ]
          },
          {
            "type": "gauge",
            "name": "外层辅助",
            "radius": "74%",
            "startAngle": "225",
            "endAngle": "-45",
            "min": 0,
            "max": 100,
            "splitNumber": 4,
            "pointer": {
              "show": false
            },
            "detail": {
              "show": false
            },
            "data": [
              {
                "value": 1
              }
            ],
            "title": {
              "show": true,
              "offsetCenter": [
                0,
                30
              ],
              "textStyle": {
                "color": "#fff",
                "fontStyle": "normal",
                "fontWeight": "normal",
                "fontFamily": "微软雅黑",
                "fontSize": 20
              }
            },
            "axisLine": {
              "show": true,
              "lineStyle": {
                "color": [
                  [
                    1,
                    "#00FFFF"
                  ]
                ],
                "width": 2,
                "opacity": 1
              }
            },
            "axisTick": {
              "show": false
            },
            "splitLine": {
              "show": true,
              "length": -44,
              "lineStyle": {
                "color": "#051932",
                "width": 0,
                "type": "solid"
              }
            },
            "axisLabel": {
              "show": false,
              "fontSize": 20
            }
          },
          {
            "type": "gauge",
            "radius": "70%",
            "startAngle": "225",
            "endAngle": "-45",
            "pointer": {
              "show": false
            },
            "detail": {
              textStyle: {
                color: "#FFF",
                fontSize: 29
              },
              "rich": {
                "white": {
                  "fontSize": 50,
                  "color": "#fff",
                  "fontWeight": "500",
                  "padding": [
                    -150,
                    0,
                    0,
                    0
                  ]
                },
                "bule": {
                  "fontSize": 120,
                  "fontFamily": "DINBold",
                  "color": "#fff",
                  "fontWeight": "700",
                  "padding": [
                    -120,
                    0,
                    0,
                    0
                  ]
                },
                "radius": {
                  "width": 350,
                  "height": 80,
                  "borderWidth": 1,
                  "borderColor": "#0092F2",
                  "fontSize": 50,
                  "color": "#d02a2a",
                  "backgroundColor": "rgba(185,72,147,0.1)",
                  "borderRadius": 20,
                  "textAlign": "center"
                },
                "size": {
                  "height": 400,
                  "padding": [
                    100,
                    0,
                    0,
                    0
                  ]
                }
              },
              "offsetCenter": [
                "0%",
                "0%"
              ]
            },
            "data": [
              {
                "value": 93,
                "name": "订单响应占比"
              }
            ],
            "title": {
              "show": true,
              "color": "#fff",
              "fontStyle": "normal",
              "fontWeight": "normal",
              "fontFamily": "微软雅黑",
              "fontSize": 20
            },
            "axisLine": {
              "show": true,
              "lineStyle": {
                "color": [
                  [
                    0.91,
                    {
                      "x": 0,
                      "y": 0,
                      "x2": 1,
                      "y2": 0,
                      "type": "linear",
                      "global": false,
                      "colorStops": [
                        {
                          "offset": 0,
                          "color": "#5CF9FE"
                        },
                        {
                          "offset": 0.17,
                          "color": "#468EFD"
                        },
                        {
                          "offset": 0.9,
                          "color": "#468EFD"
                        },
                        {
                          "offset": 1,
                          "color": "#5CF9FE"
                        }
                      ]
                    }
                  ],
                  [
                    1,
                    "#15337C"
                  ]
                ],
                "width": 25,
                "shadowOffsetX": 0,
                "shadowOffsetY": 0,
                "opacity": 1
              }
            },
            "axisTick": {
              "show": false
            },
            "splitLine": {
              "show": false,
              "length": 25,
              "lineStyle": {
                "color": "#00377a",
                "width": 2,
                "type": "solid"
              }
            },
            "axisLabel": {
              "show": false
            }
          },
          {
            "name": "灰色内圈",
            "type": "gauge",
            "z": 2,
            "radius": "60%",
            "startAngle": "225",
            "endAngle": "-45",
            "axisLine": {
              "lineStyle": {
                "color": [
                  [
                    1,
                    "#018DFF"
                  ]
                ],
                "width": 2,
                "opacity": 1
              }
            },
            "splitLine": {
              "show": false
            },
            "axisLabel": {
              "show": false
            },
            "pointer": {
              "show": false
            },
            "axisTick": {
              "show": false
            },
            "detail": {
              "show": 0
            }
          },
          {
            "name": "白色圈刻度",
            "type": "gauge",
            "radius": "60%",
            "startAngle": 225,
            "endAngle": -45,
            "z": 4,
            "axisTick": {
              "show": false
            },
            "splitLine": {
              "length": 16,
              "lineStyle": {
                "width": 2,
                "color": "rgba(1,244,255, 0.9)"
              }
            },
            "axisLabel": {
              "color": "rgba(255,255,255,0)",
              "fontSize": 66
            },
            "pointer": {
              "show": false
            },
            "axisLine": {
              "lineStyle": {
                "opacity": 0
              }
            },
            "detail": {
              "show": false
            },
            "data": [
              {
                "value": 0,
                "name": ""
              }
            ]
          },
          {
            "type": "pie",
            "radius": "56%",
            "center": [
              "50%",
              "50%"
            ],
            "z": 1,
            "itemStyle": {
              "normal": {
                "color": {
                  "x": 0.5,
                  "y": 0.5,
                  "r": 0.8,
                  "type": "radial",
                  "global": false,
                  "colorStops": [
                    {
                      "offset": 0,
                      "color": "#4978EC"
                    },
                    {
                      "offset": 0.5,
                      "color": "#1E2B57"
                    },
                    {
                      "offset": 1,
                      "color": "#141F3D"
                    }
                  ]
                },
                "label": {
                  "show": false
                },
                "labelLine": {
                  "show": false
                }
              }
            },
            "hoverAnimation": false,
            "label": {
              "show": false
            },
            "tooltip": {
              "show": false
            },
            "data": [
              100
            ]
          }
        ]
      }
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
    },
    "$store.state.setting.mode": {
      handler() {
        this.dataOptionLine.legend.textStyle.color = getComputedStyle(document.documentElement).getPropertyValue("--text1");
        this.$refs.dataOptionLine?.refreshEcharts();
        this.char8.legend.textStyle.color = getComputedStyle(document.documentElement).getPropertyValue("--text1");
        this.$refs.char8?.refreshEcharts();
        this.dataZhuzhuang.legend.textStyle.color = getComputedStyle(document.documentElement).getPropertyValue("--text1");
        this.$refs.dataZhuzhuang?.refreshEcharts();
        this.char4.legend.textStyle.color = getComputedStyle(document.documentElement).getPropertyValue("--text1");
        this.$refs.char4?.refreshEcharts();
        this.char5.legend.textStyle.color = getComputedStyle(document.documentElement).getPropertyValue("--text1");
        this.$refs.char5?.refreshEcharts();
        this.char6.legend.textStyle.color = getComputedStyle(document.documentElement).getPropertyValue("--text1");
        this.$refs.char6?.refreshEcharts();
        this.char7.legend.textStyle.color = getComputedStyle(document.documentElement).getPropertyValue("--text1");
        this.$refs.char7?.refreshEcharts();
        this.char10.legend.textStyle.color = getComputedStyle(document.documentElement).getPropertyValue("--text1");
        this.$refs.char10?.refreshEcharts();
      },
      deep: true,
      immediate: true
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