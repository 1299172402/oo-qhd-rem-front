<template>
  <div style="height: 100%">
    <div>
      <el-radio v-model="radio" label="1" type="text" @change="tabChange(1)">区块结果展示</el-radio>
      <el-radio v-model="radio" label="2" type="text" @change="tabChange(2)">单井结果展示</el-radio>
    </div>
      <!-- 无数据空白 -->
      <div v-if="this.modelBasicInfo.modelStep == 0" >
<!--          <el-empty :image="require('@/icons/svg/data.png')" :image-size="250" description="暂无数据，请上传模型后查看"></el-empty>-->
      </div>

      <!-- 区块指标 -->
      <div v-show="isShowqk" style="height: 100%">
          <el-button type="primary" style="float: right; margin-top: -50px"
                     class="buttonright" @click="isShowTable = true">查看数据
          </el-button>
          <div v-show="isShowChart" style="margin-top:10px; height: 100% !important;">
              <!-- 放置折线图 -->
              <div v-show="control1" style="height: 90% !important;">
                  <Echart  :chart-data="echartsAll" height="100%" width="100%" style="100% !important;"></Echart>
              </div>
              <div style="text-align:center">
                  <el-radio-group v-model="radio2" @change="changeRadio2" class="radioqk">
                      <el-radio-button label="净现值" class="radionpv"></el-radio-button>
                      <el-radio-button label="日(产水/注水/产油)" class="radiofofo"></el-radio-button>
                      <el-radio-button label="累(注水/产水/产油)" class="radiofofo"></el-radio-button>
                      <el-radio-button label="含水率"></el-radio-button>
                      <el-radio-button label="油藏压力" class="radiofpr"></el-radio-button>
                  </el-radio-group>
              </div>
          </div>
          <!-- 引入echarts组件，并通过v-bind:type 去绑定对应的值 -->
          <div v-bind:type="radio2"></div>

          <!-- 放置表格 -->
          <div v-show="isShowTable">
              <pagePanel :headerTitle="titleBlockData" :show-btn="true"
                         style="height: calc(100% - 10px);z-index:100;position: absolute;top: -20px;left: -0px">
                  <el-table :data="tableList" height="calc(100% - 15px)" style="background-color: rgba(128,128,128,0.5)">
                      <el-table-column fixed="left" prop="simulationTime" label="时间步" align="center">
                      </el-table-column>
                      <el-table-column prop="npv" label="净现值//(元)" :render-header="renderHeader" align="center">
                          <template v-slot="scope">
                              {{ fun(scope.row.npv) }}
                          </template>
                      </el-table-column>
                      <el-table-column prop="fopt" label="累产油//(m³)" :render-header="renderHeader" align="center">
                          <template v-slot="scope">
                              {{ fun(scope.row.fopt) }}
                          </template>
                      </el-table-column>
                      <el-table-column prop="fwit" label="累注水//(m³)" :render-header="renderHeader" align="center">
                          <template v-slot="scope">
                              {{ fun(scope.row.fwit) }}
                          </template>
                      </el-table-column>
                      <el-table-column prop="fwpt" label="累产水//(m³)" :render-header="renderHeader" align="center">
                          <template v-slot="scope">
                              {{ fun(scope.row.fwpt) }}
                          </template>
                      </el-table-column>
                      <el-table-column prop="fwir" label="日注水//(m³/d)" :render-header="renderHeader" align="center">
                          <template v-slot="scope">
                              {{ fun(scope.row.fwir) }}
                          </template>
                      </el-table-column>
                      <el-table-column prop="fwpr" label="日产水//(m³/d)" :render-header="renderHeader" align="center">
                          <template v-slot="scope">
                              {{ fun(scope.row.fwpr) }}
                          </template>
                      </el-table-column>
                      <el-table-column prop="fwct" label="含水率" align="center">
                          <template v-slot="scope">
                              {{ fun(scope.row.fwct) }}
                          </template>
                      </el-table-column>
                      <el-table-column prop="fpr" label="油藏压力//(barsa)" :render-header="renderHeader" align="center">
                          <template v-slot="scope">
                              {{ fun(scope.row.fpr) }}
                          </template>
                      </el-table-column>
                      <el-table-column prop="fopr" label="日产油//(m³/d)" :render-header="renderHeader" align="center">
                          <template v-slot="scope">
                              {{ fun(scope.row.fopr) }}
                          </template>
                      </el-table-column>
                  </el-table>
                  <el-button @click="isShowTable = false" type="text" size="small" class="dialogback"
                             style="color: white; font-size: 14px; line-height: 10px; float: right;margin-top: 10px">退出查看
                  </el-button>
              </pagePanel>
          </div>
      </div>

      <!-- 单井指标 -->
      <div v-show="isShowdj" style="height: 100%">
          <el-button class="buttonright" type="text" style="color: white; font-size: 14px; line-height: 10px;float:right;margin-top:-50px"
                     @click="djViewData">查看数据</el-button>
          <!-- 单井 油井 折线图 -->
          <div v-show="isChartOil" style="margin-top:10px; height: 100% !important;">
              <!-- 放置折线图 -->
              <div v-if="this.modelBasicInfo.modelStep" style="height: 90% !important;">
                  <Echart :chart-data="echartsAllOil" height="100%" width="100%" style="100% !important;"></Echart>
              </div>
              <!-- 选择框 -->
              <div style="text-align:center">
                  <el-select filterable popper-class="downselect" class="buttonClassLogo radioselect"
                             style="width: 120px;float: left;"
                             v-model="modelWellType" @change="twoSelect()">
                      <el-option v-for="item in modelWellTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                  </el-select>
                  <el-select filterable popper-class="downselect" class="buttonClassLogo radioselect" style="float: left;width: 120px; left: 10px"
                             v-model="modelWellNo" @change="djjhSelect()">
                      <el-option v-for="item in WellNoList" :key="item.value" :label="item.label"
                                 :value="item.value"></el-option>
                  </el-select>
                  <el-radio-group class="radiodj" v-model="radio3" @change="changeRadio3"
                                  style="float:right !important;">
                      <el-radio-button label="累(产油/产水)" class="radiowopt"></el-radio-button>
                      <el-radio-button label="日(产油/产水)" class="radiowopt"></el-radio-button>
                      <el-radio-button label="含水率"></el-radio-button>
                      <el-radio-button v-show="opt" label="优化阶段产油量" class="radiowwct"></el-radio-button>
                  </el-radio-group>
              </div>
          </div>
          <!-- 引入echarts组件，并通过v-bind:type 去绑定对应的值 -->
          <div v-bind:type="radio3"></div>

          <!-- 单井 水井 折线图 -->
          <div v-show="isChartWater" style="margin-top:10px; height: 100% !important;">
              <!-- 放置单井 水井折线图 -->
              <div style="height: 90% !important;">
                  <Echart :chart-data="echartsAllWater" height="100%" width="100%" style="100% !important;"></Echart>
              </div>
              <!--        <div class="chartframe">-->
              <!--          <el-row style="position: absolute; left: 20px; top: 130px">-->
              <!--            <el-image :src="require('@/icons/svg/u1903.png')" style="width: 770px; height: 525px"></el-image>-->
              <!--            <div style="position: absolute; left: 18px; top: 10px">-->
              <!--              <div id="main" ref="wmain"></div>-->
              <!--            </div>-->
              <!--          </el-row>-->
              <!--        </div>-->
              <!--        <div class="radiodj">-->
              <div style="text-align:center">
                  <el-select filterable popper-class="downselect" class="buttonClassLogo radioselect"
                             style="width: 120px;float: left;"
                             v-model="modelWellType" @change="twoSelect()">
                      <el-option v-for="item in modelWellTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                  </el-select>
                  <el-select filterable popper-class="downselect" class="buttonClassLogo radioselect" style="float: left;width: 120px; left: 10px"
                             v-model="modelWellNo" @change="djjhSelect()">
                      <el-option v-for="item in WellNoList" :key="item.value" :label="item.label"
                                 :value="item.value"></el-option>
                  </el-select>
                  <el-radio-group class="radiodj" v-model="radio4" style="float:right !important;"
                                  @change="changeRadio4">
                      <el-radio-button label="井底流压" class="radiowbhp"></el-radio-button>
                      <el-radio-button label="累注水" class="radiowbhp"></el-radio-button>
                      <el-radio-button label="(液产量/日注水)" class="radiowwir"></el-radio-button>
                  </el-radio-group>
              </div>
              <!--        </div>-->
          </div>
          <!-- 引入echarts组件，并通过v-bind:type 去绑定对应的值 -->
          <div v-bind:type="radio4"></div>

          <!-- 放置单井 表格 -->
          <div class="tableframe" v-show="isDjTable">
              <pagePanel :headerTitle="titleOilData" :show-btn="true"
                         style="height: calc(100% - 10px);z-index:100;position: absolute;top: -20px;left: -0px;">
                  <el-table :data="djtableList" height="calc(100% - 15px)" style="background-color: rgba(128,128,128,0.5)">
                      <el-table-column fixed="left" prop="simulationTime" label="时间步" align="center">
                      </el-table-column>
                      <el-table-column prop="wopt" label="累产油//(m³)" :render-header="renderHeader" align="center">
                          <template v-slot="scope">
                              {{ fun(scope.row.wopt) }}
                          </template>
                      </el-table-column>
                      <el-table-column prop="wwpt" label="累产水//(m³)" :render-header="renderHeader" align="center">
                          <template v-slot="scope">
                              {{ fun(scope.row.wwpt) }}
                          </template>
                      </el-table-column>
                      <el-table-column prop="wopr" label="日产油//(m³/d)" :render-header="renderHeader" align="center">
                          <template v-slot="scope">
                              {{ fun(scope.row.wopr) }}
                          </template>
                      </el-table-column>
                      <el-table-column prop="wwpr" label="日产水//(m³/d)" :render-header="renderHeader" align="center">
                          <template v-slot="scope">
                              {{ fun(scope.row.wwpr) }}
                          </template>
                      </el-table-column>
                      <el-table-column prop="wwct" label="含水率"  :render-header="renderHeader"  align="center">
                          <template v-slot="scope">
                              {{ fun(scope.row.wwct) }}
                          </template>
                      </el-table-column>
                      <el-table-column prop="wbhp" label="井底流压//(barsa)" :render-header="renderHeader" align="center">
                          <template v-slot="scope">
                              {{ fun(scope.row.wbhp) }}
                          </template>
                      </el-table-column>
                      <el-table-column prop="wlpr" label="液产量//(m³/d)" :render-header="renderHeader" align="center">
                          <template v-slot="scope">
                              {{ fun(scope.row.wlpr) }}
                          </template>
                      </el-table-column>
                      <el-table-column prop="wwit" label="累注水//(m³)" :render-header="renderHeader"  align="center">
                          <template v-slot="scope">
                              {{ fun(scope.row.wwit) }}
                          </template>
                      </el-table-column>
                      <el-table-column prop="wwir" label="日注水//(m³/d)" :render-header="renderHeader" align="center">
                          <template v-slot="scope">
                              {{ fun(scope.row.wwir) }}
                          </template>
                      </el-table-column>
                  </el-table>
                  <!--          <el-row class="dialogback">-->
                  <el-button class="dialogback" @click="isDjTable = false" type="text"
                             style="color: white; font-size: 14px; line-height: 10px;float: right;margin-top: 10px">
                      退出查看
                  </el-button>
                  <!--          </el-row>-->
              </pagePanel>
          </div>
      </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import Echart from "@/components/tools/Echarts/index.vue";
import {
    GetBlockSeries,
    GetBlockListByModelBasicId,
    GetModelWellNoList,
    GetWellSeries,
    GetWellListByModelBasicId,
    GetOilWellOpt,
} from "@/api/rem/dispenseModel.js";
export default {
  name: "blockIndicators",
  components: {
      Echart
  },
  props: {
    modelBasicInfo: {
      type: Object,
    },
  },
  data() {
    return {
      titleBlockData:'区块结果数据',
      titleOilData:'单井结果数据',
      //模块参数
      radio: '1',
      radio2: "净现值",
      radio3: "累(产油/产水)",
      radio4: "井底流压",
      isShowqk: true,
      control: true,
      control1: false,
      isShowdj: false,
      // histogram:[],
      echartsAll: [],  //echarts图标接收数据----区块
      echartsAllOil: [],  //echarts图标接收数据----油井
      echartsAllWater: [],  //echarts图标接收数据----水井
      //1-"日产水", "日注水", "日产油"
      echartsListDay: {
        backgroundColor: "rgba(128, 128, 128, 0)",
        tooltip: {
          //提示框组件
          trigger: "axis", //item数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
          axisPointer: {
            type: "shadow",
          },
          backgroundColor: "rgba(30, 144, 255, 0.2)",
          textStyle: {
            color: "#FFFFFF",
            fontSize: "16",
          },
          position: function (point) {
            // 固定在顶部
            return [point[0], "18%"];
          },
          formatter: "时间步：{b}<br />{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}",
        },
        legend: {
          data: ["日产水", "日注水", "日产油"],
          textStyle: {
            color: "#FFFFFF",
            fontSize: 15,
          },
        },
        toolbox: {
          show: true,
          itemSize: 20,
          itemGap: 20,
          feature: {
            //dataView: { readOnly: false },
            //restore: {},
            saveAsImage: {
              backgroundColor: "#014059",
            },
          },
          iconStyle: {
            borderColor: "#FFFFFF",
          },
        },
        //图表位置
        grid: {
          left: "50",
          top: "60",
          right: "30",
          bottom: "35",
        },
        xAxis: {
          //type:'category',
          name: "时间/天",
          nameTextStyle: {
            padding: [0, 0, -60, -30],
            color: "#FFFFFF",
            fontSize: "13",
          },
          //两边留白
          boundaryGap: false,
          lineStyle: {
            type: "solid",
          },
          axisLabel: {
            show: true,
            //rotate:20,
            // x轴的字体样式
            textStyle: {
              color: "#FFFFFF",
              fontSize: "13",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(192,192,192,0.4)",
            },
          },
          axisTick: {
            show: true,
          },
          splitLine: {
            show: false,
          },
          data: [],
        },
        yAxis: {
          name: "m³/d",
          nameTextStyle: {
            padding: [0, 0, 8, -50],
            color: "#FFFFFF",
            fontSize: "13",
          },
          // y轴的字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: "#FFFFFF",
              fontSize: "13",
            },
            formatter: function (value) {
              return value + "";
            },
            formatter: function (value) {
              let indexList = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];
              if (Math.abs(value) > 10) {
                if (value === 0) return "0";
                // 检查是否已经转化为科学计数了
                // else if ((value + '').indexOf('e') > 0)
                //   return (value + '').replace(/e/, 'E')
                else {
                  var res = value.toString();
                  var numN1 = 0;
                  var numN2 = 1;
                  var num1 = 0;
                  var num2 = 0;
                  var t1 = 1;
                  // 计入小数点前后有多少位
                  for (var k = 0; k < res.length; k++) {
                    if (res[k] === ".") t1 = 0;
                    if (t1) num1++;
                    else num2++;
                  }
                  // 均转换为科学计数法表示
                  if (Math.abs(value) < 1) {
                    // 小数点后一位开始计算
                    for (var i = 2; i < res.length; i++) {
                      if (res[i] === "0") numN2++; //记录10的负指数值（默认值从1开始）
                      else if (res[i] === ".") continue;
                      else break;
                    }
                    let v = parseFloat(value);
                    // 10的numN2次方
                    v = v * Math.pow(10, numN2);
                    v = v.toFixed(1); //四舍五入 仅保留一位小数位数
                    let char = indexList[Number(numN2)];
                    return v.toString() + "×10" + char;
                  } else if (num1 > 1) {
                    numN1 = num1 - 1;
                    var v = parseFloat(value);
                    v = v / Math.pow(10, numN1);
                    if (num2 > 1) v = v.toFixed(1);

                    let char = indexList[Number(numN1)];
                    return v.toString() + "×10" + char;
                  }
                }
              } else return value;
            },
          },
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dotted",
              color: "rgba(192,192,192,0.2)",
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        //划分线段颜色
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [],
        },
        series: [
          {
            name: "日产水",
            type: "line",
            symbolSize: 8,
            symbol: "circle",
            data: [],
            lineStyle: {
              color: "#00FF7F",
              width: 1,
            },
            itemStyle: {
              color: "#00FF7F",
            },
          },
          {
            name: "日注水",
            type: "line",
            symbolSize: 8,
            symbol: "circle",
            data: [],
            lineStyle: {
              color: "#eb12c8",
              width: 1,
            },
            itemStyle: {
              color: "#eb12c8",
            },
          },
          {
            name: "日产油",
            type: "line",
            symbolSize: 8,
            symbol: "circle",
            data: [],
            lineStyle: {
              color: "#9400D3",
              width: 1,
            },
            itemStyle: {
              color: "#9400D3",
            },
          },
        ],
      }, //折线图m3/d
      //2-"累注水", "累产水", "累产油"
      echartsListt: {
        backgroundColor: "rgba(128, 128, 128, 0)",
        tooltip: {
          //提示框组件
          trigger: "axis", //item数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
          axisPointer: {
            type: "shadow",
          },
          backgroundColor: "rgba(30, 144, 255, 0.2)",
          textStyle: {
            color: "#FFFFFF",
            fontSize: "16",
          },
          position: function (point) {
            // 固定在顶部
            return [point[0], "18%"];
          },
          formatter: "时间步: {b}<br />{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}",
        },
        legend: {
          data: ["累注水", "累产水", "累产油"],
          textStyle: {
            color: "#FFFFFF",
            fontSize: 15,
          },
        },
        toolbox: {
          show: true,
          itemSize: 20,
          itemGap: 20,
          feature: {
            //dataView: { readOnly: false },
            //restore: {},
            saveAsImage: {
              backgroundColor: "#014059",
            },
          },
          iconStyle: {
            borderColor: "#FFFFFF",
          },
        },
        //图表位置
        grid: {
          left: "55",
          top: "60",
          right: "30",
          bottom: "35",
        },
        xAxis: {
          //type:'category',
          name: "时间/天",
          nameTextStyle: {
            padding: [0, 0, -60, -30],
            color: "#FFFFFF",
            fontSize: "13",
          },
          //两边留白
          boundaryGap: false,
          lineStyle: {
            type: "solid",
          },
          axisLabel: {
            show: true,
            //rotate:20,
            // x轴的字体样式
            textStyle: {
              color: "#FFFFFF",
              fontSize: "13",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(192,192,192,0.4)",
            },
          },
          axisTick: {
            show: true,
          },
          splitLine: {
            show: false,
          },
          data: [],
        },
        yAxis: {
          name: "m³",
          nameTextStyle: {
            padding: [0, 0, 8, -50],
            color: "#FFFFFF",
            fontSize: "13",
          },
          // y轴的字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: "#FFFFFF",
              fontSize: "13",
            },
            // formatter: function (value) {
            //   return value + "";
            // },
            formatter: function (value) {
              let indexList = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];
              if (Math.abs(value) > 10) {
                if (value === 0) return "0";
                // 检查是否已经转化为科学计数了
                // else if ((value + '').indexOf('e') > 0)
                //   return (value + '').replace(/e/, 'E')
                else {
                  var res = value.toString();
                  var numN1 = 0;
                  var numN2 = 1;
                  var num1 = 0;
                  var num2 = 0;
                  var t1 = 1;
                  // 计入小数点前后有多少位
                  for (var k = 0; k < res.length; k++) {
                    if (res[k] === ".") t1 = 0;
                    if (t1) num1++;
                    else num2++;
                  }
                  // 均转换为科学计数法表示
                  if (Math.abs(value) < 1) {
                    // 小数点后一位开始计算
                    for (var i = 2; i < res.length; i++) {
                      if (res[i] === "0") numN2++; //记录10的负指数值（默认值从1开始）
                      else if (res[i] === ".") continue;
                      else break;
                    }
                    let v = parseFloat(value);
                    // 10的numN2次方
                    v = v * Math.pow(10, numN2);
                    v = v.toFixed(1); //四舍五入 仅保留一位小数位数
                    let char = indexList[Number(numN2)];
                    return v.toString() + "×10" + char;
                  } else if (num1 > 1) {
                    numN1 = num1 - 1;
                    var v = parseFloat(value);
                    v = v / Math.pow(10, numN1);
                    if (num2 > 1) v = v.toFixed(1);

                    let char = indexList[Number(numN1)];
                    return v.toString() + "×10" + char;
                  }
                }
              } else return value;
            },
          },
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dotted",
              color: "rgba(192,192,192,0.2)",
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        //划分线段颜色
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [],
        },
        series: [
          {
            name: "累注水",
            type: "line",
            symbolSize: 8,
            symbol: "circle",
            data: [],
            lineStyle: {
              color: "#11f5f5",
              width: 1,
            },
            itemStyle: {
              color: "#11f5f5",
            },
          },
          {
            name: "累产水",
            type: "line",
            symbolSize: 8,
            symbol: "circle",
            data: [],
            lineStyle: {
              color: "#FF6A6A",
              width: 1,
            },
            itemStyle: {
              color: "#FF6A6A",
            },
          },
          {
            name: "累产油",
            type: "line",
            symbolSize: 8,
            symbol: "circle",
            data: [],
            lineStyle: {
              color: "#F0FFF0",
              width: 1,
            },
            itemStyle: {
              color: "#F0FFF0",
            },
          },
        ],
      }, //折线图m3/d
      //3-"净现值"
      echartsNpv: {
        backgroundColor: "rgba(128, 128, 128, 0)",
        tooltip: {
          //提示框组件
          trigger: "axis", //item数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
          axisPointer: {
            type: "shadow",
          },
          backgroundColor: "rgba(30, 144, 255, 0.2)",
          textStyle: {
            color: "#FFFFFF",
            fontSize: "16",
          },
          position: function (point) {
            // 固定在顶部
            return [point[0], "18%"];
          },
          formatter: "时间步: {b}<br />{a0}: {c0}",
        },
        legend: {
          data: ["净现值"],
          textStyle: {
            color: "#FFFFFF",
            fontSize: 15,
          },
        },
        toolbox: {
          show: true,
          itemSize: 20,
          itemGap: 20,
          feature: {
            //dataView: { readOnly: false },
            //restore: {},
            saveAsImage: {
              backgroundColor: "#014059",
            },
          },
          iconStyle: {
            borderColor: "#FFFFFF",
          },
        },
        //图表位置
        grid: {
          left: "65",
          top: "60",
          right: "30",
          bottom: "35",
        },
        xAxis: {
          //type:'category',
          name: "时间/天",
          nameTextStyle: {
            padding: [0, 0, -60, -30],
            color: "#FFFFFF",
            fontSize: "13",
          },
          //两边留白
          boundaryGap: false,
          lineStyle: {
            type: "solid",
          },
          axisLabel: {
            show: true,
            //rotate:20,
            // x轴的字体样式
            textStyle: {
              color: "#FFFFFF",
              fontSize: "13",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(192,192,192,0.4)",
            },
          },
          axisTick: {
            show: true,
          },
          splitLine: {
            show: false,
          },
          data: [],
        },
        yAxis: {
          name: "元",
          nameTextStyle: {
            padding: [0, 0, 8, -50],
            color: "#FFFFFF",
            fontSize: "13",
          },
          // y轴的字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: "#FFFFFF",
              fontSize: "13",
            },
            formatter: function (value) {
              let indexList = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];
              if (Math.abs(value) > 10) {
                if (value === 0) return "0";
                // 检查是否已经转化为科学计数了
                // else if ((value + '').indexOf('e') > 0)
                //   return (value + '').replace(/e/, 'E')
                else {
                  var res = value.toString();
                  var numN1 = 0;
                  var numN2 = 1;
                  var num1 = 0;
                  var num2 = 0;
                  var t1 = 1;
                  // 计入小数点前后有多少位
                  for (var k = 0; k < res.length; k++) {
                    if (res[k] === ".") t1 = 0;
                    if (t1) num1++;
                    else num2++;
                  }
                  // 均转换为科学计数法表示
                  if (Math.abs(value) < 1) {
                    // 小数点后一位开始计算
                    for (var i = 2; i < res.length; i++) {
                      if (res[i] === "0") numN2++; //记录10的负指数值（默认值从1开始）
                      else if (res[i] === ".") continue;
                      else break;
                    }
                    let v = parseFloat(value);
                    // 10的numN2次方
                    v = v * Math.pow(10, numN2);
                    v = v.toFixed(1); //四舍五入 仅保留一位小数位数
                    let char = indexList[Number(numN2)];
                    return v.toString() + "×10" + char;
                  } else if (num1 > 1) {
                    numN1 = num1 - 1;
                    var v = parseFloat(value);
                    v = v / Math.pow(10, numN1);
                    if (num2 > 1) v = v.toFixed(1);

                    let char = indexList[Number(numN1)];
                    return v.toString() + "×10" + char;
                  }
                }
              } else return value;
            },
          },
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dotted",
              color: "rgba(192,192,192,0.2)",
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        //划分线段颜色
        visualMap: {
          type: "piecewise",
          show: false,
          dimension: 0,
          pieces: [],
        },
        series: [
          {
            name: "净现值",
            type: "line",
            symbolSize: 8,
            symbol: "circle",
            data: [],
            lineStyle: {
              color: "#00FFFF",
              width: 1,
            },
            itemStyle: {
              color: "#00FFFF",
            },
          },
        ],
      },
      //4-"含水率"
      echartsBaifenhao: {
        backgroundColor: "rgba(128, 128, 128, 0)",
        tooltip: {
          //提示框组件
          trigger: "axis", //item数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
          axisPointer: {
            type: "shadow",
          },
          backgroundColor: "rgba(30, 144, 255, 0.2)",
          textStyle: {
            color: "#FFFFFF",
            fontSize: "16",
          },
          position: function (point) {
            // 固定在顶部
            return [point[0], "18%"];
          },
          formatter: "时间步: {b}<br />{a0}: {c0}",
        },
        legend: {
          data: ["含水率"],
          textStyle: {
            color: "#FFFFFF",
            fontSize: 15,
          },
        },
        toolbox: {
          show: true,
          itemSize: 20,
          itemGap: 20,
          feature: {
            //dataView: { readOnly: false },
            //restore: {},
            saveAsImage: {
              backgroundColor: "#014059",
            },
          },
          iconStyle: {
            borderColor: "#FFFFFF",
          },
        },
        //图表位置
        grid: {
          left: "45",
          top: "60",
          right: "30",
          bottom: "35",
        },
        xAxis: {
          //type:'category',
          name: "时间/天",
          nameTextStyle: {
            padding: [0, 0, -60, -30],
            color: "#FFFFFF",
            fontSize: "13",
          },
          splitLine: {
            show: false,
          },
          //两边留白
          boundaryGap: false,
          lineStyle: {
            type: "solid",
          },
          axisLabel: {
            show: true,
            //rotate:20,
            // x轴的字体样式
            textStyle: {
              color: "#FFFFFF",
              fontSize: "13",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(192,192,192,0.4)",
            },
          },
          axisTick: {
            show: true,
          },
          data: [],
          //data: ['1','2']
        },
        yAxis: {
          name: "无因次",
          nameTextStyle: {
            padding: [0, 0, 8, -50],
            color: "#FFFFFF",
            fontSize: "13",
          },
          // y轴的字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: "#FFFFFF",
              fontSize: "13",
            },
            formatter: function (value) {
              return value + "";
            },
          },
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dotted",
              color: "rgba(192,192,192,0.2)",
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        //划分线段颜色
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [],
        },
        series: [
          {
            name: "含水率",
            type: "line",
            symbolSize: 8,
            symbol: "circle",
            data: [],
            data: ["200", "300"],
            lineStyle: {
              color: "#FDF5E6",
              width: 1,
            },
            itemStyle: {
              color: "#FDF5E6",
            },
          },
        ],
      },
      //5-"油藏压力"
      echartsMpa: {
        backgroundColor: "rgba(128, 128, 128, 0)",
        tooltip: {
          //提示框组件
          trigger: "axis", //item数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
          axisPointer: {
            type: "shadow",
          },
          backgroundColor: "rgba(30, 144, 255, 0.2)",
          textStyle: {
            color: "#FFFFFF",
            fontSize: "16",
          },
          position: function (point) {
            // 固定在顶部
            return [point[0], "18%"];
          },
          formatter: "时间步: {b}<br />{a0}: {c0}",
        },
        legend: {
          data: ["油藏压力"],
          textStyle: {
            color: "#FFFFFF",
            fontSize: 15,
          },
        },
        toolbox: {
          show: true,
          itemSize: 20,
          itemGap: 20,
          feature: {
            //dataView: { readOnly: false },
            //restore: {},
            saveAsImage: {
              backgroundColor: "#014059",
            },
          },
          iconStyle: {
            borderColor: "#FFFFFF",
          },
        },
        //图表位置
        grid: {
          left: "40",
          top: "60",
          right: "30",
          bottom: "35",
        },
        xAxis: {
          //type:'category',
          name: "时间/天",
          nameTextStyle: {
            padding: [0, 0, -60, -30],
            color: "#FFFFFF",
            fontSize: "13",
          },
          splitLine: {
            show: false,
          },
          //两边留白
          boundaryGap: false,
          lineStyle: {
            type: "solid",
          },
          axisLabel: {
            show: true,
            //rotate:20,
            // x轴的字体样式
            textStyle: {
              color: "#FFFFFF",
              fontSize: "13",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(192,192,192,0.4)",
            },
          },
          axisTick: {
            show: true,
          },
          data: [],
          //data: ['1','2']
        },
        yAxis: {
          name: "barsa",
          nameTextStyle: {
            padding: [0, 0, 8, -50],
            color: "#FFFFFF",
            fontSize: "13",
          },
          // y轴的字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: "#FFFFFF",
              fontSize: "13",
            },
            formatter: function (value) {
              return value + "";
            },
          },
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dotted",
              color: "rgba(192,192,192,0.2)",
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        //划分线段颜色
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [],
        },
        series: [
          {
            name: "油藏压力",
            type: "line",
            symbolSize: 8,
            symbol: "circle",
            data: [],
            //data: ["200", "300"],
            lineStyle: {
              color: "#00FF00",
              width: 1,
            },
            itemStyle: {
              color: "#00FF00",
            },
          },
        ],
      },
      //6-"井底流压"
      echartsMpaa: {
        backgroundColor: "rgba(128, 128, 128, 0)",
        tooltip: {
          //提示框组件
          trigger: "axis", //item数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
          axisPointer: {
            type: "shadow",
          },
          backgroundColor: "rgba(30, 144, 255, 0.2)",
          textStyle: {
            color: "#FFFFFF",
            fontSize: "16",
          },
          position: function (point) {
            // 固定在顶部
            return [point[0], "18%"];
          },
          formatter: "时间步: {b}<br />{a0}: {c0}",
        },
        legend: {
          data: ["井底流压"],
          textStyle: {
            color: "#FFFFFF",
            fontSize: 15,
          },
        },
        toolbox: {
          show: true,
          itemSize: 20,
          itemGap: 20,
          feature: {
            //dataView: { readOnly: false },
            //restore: {},
            saveAsImage: {
              backgroundColor: "#014059",
            },
          },
          iconStyle: {
            borderColor: "#FFFFFF",
          },
        },
        //图表位置
        grid: {
          left: "40",
          top: "60",
          right: "30",
          bottom: "35",
        },
        xAxis: {
          //type:'category',
          name: "时间/天",
          nameTextStyle: {
            padding: [0, 0, -60, -30],
            color: "#FFFFFF",
            fontSize: "13",
          },
          splitLine: {
            show: false,
          },
          //两边留白
          boundaryGap: false,
          lineStyle: {
            type: "solid",
          },
          axisLabel: {
            show: true,
            //rotate:20,
            // x轴的字体样式
            textStyle: {
              color: "#FFFFFF",
              fontSize: "13",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(192,192,192,0.4)",
            },
          },
          axisTick: {
            show: true,
          },
          data: [],
          //data: ['1','2']
        },
        yAxis: {
          name: "barsa",
          nameTextStyle: {
            padding: [0, 0, 8, -50],
            color: "#FFFFFF",
            fontSize: "13",
          },
          // y轴的字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: "#FFFFFF",
              fontSize: "13",
            },
            formatter: function (value) {
              return value + "";
            },
          },
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dotted",
              color: "rgba(192,192,192,0.2)",
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        //划分线段颜色
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [],
        },
        series: [
          {
            name: "井底流压",
            type: "line",
            symbolSize: 8,
            symbol: "circle",
            data: [],
            //data: ["200", "300"],
            lineStyle: {
              color: "#00FF00",
              width: 1,
            },
            itemStyle: {
              color: "#00FF00",
            },
          },
        ],
      },
      //7-"累产油", "累产水"
      echartsListwo: {
        backgroundColor: "rgba(128, 128, 128, 0)",
        tooltip: {
          //提示框组件
          trigger: "axis", //item数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
          axisPointer: {
            type: "shadow",
          },
          backgroundColor: "rgba(30, 144, 255, 0.2)",
          textStyle: {
            color: "#FFFFFF",
            fontSize: "16",
          },
          position: function (point) {
            // 固定在顶部
            return [point[0], "18%"];
          },
          formatter: "时间步: {b}<br />{a0}: {c0}<br />{a1}: {c1}",
        },
        legend: {
          data: ["累产油", "累产水"],
          textStyle: {
            color: "#FFFFFF",
            fontSize: 15,
          },
        },
        toolbox: {
          show: true,
          itemSize: 20,
          itemGap: 20,
          feature: {
            //dataView: { readOnly: false },
            //restore: {},
            saveAsImage: {
              backgroundColor: "#014059",
            },
          },
          iconStyle: {
            borderColor: "#FFFFFF",
          },
        },
        //图表位置
        grid: {
          left: "65",
          top: "60",
          right: "30",
          bottom: "35",
        },
        xAxis: {
          //type:'category',
          name: "时间/天",
          nameTextStyle: {
            padding: [0, 0, -60, -30],
            color: "#FFFFFF",
            fontSize: "13",
          },
          //两边留白
          boundaryGap: false,
          lineStyle: {
            type: "solid",
          },
          axisLabel: {
            show: true,
            //rotate:20,
            // x轴的字体样式
            textStyle: {
              color: "#FFFFFF",
              fontSize: "13",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(192,192,192,0.4)",
            },
          },
          axisTick: {
            show: true,
          },
          splitLine: {
            show: false,
          },
          data: [],
          //data: ['1','2']
        },
        yAxis: {
          name: "m³",
          nameTextStyle: {
            padding: [0, 0, 8, -50],
            color: "#FFFFFF",
            fontSize: "13",
          },
          // y轴的字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: "#FFFFFF",
              fontSize: "13",
            },
            formatter: function (value) {
              let indexList = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];
              if (Math.abs(value) > 10) {
                if (value === 0) return "0";
                // 检查是否已经转化为科学计数了
                // else if ((value + '').indexOf('e') > 0)
                //   return (value + '').replace(/e/, 'E')
                else {
                  var res = value.toString();
                  var numN1 = 0;
                  var numN2 = 1;
                  var num1 = 0;
                  var num2 = 0;
                  var t1 = 1;
                  // 计入小数点前后有多少位
                  for (var k = 0; k < res.length; k++) {
                    if (res[k] === ".") t1 = 0;
                    if (t1) num1++;
                    else num2++;
                  }
                  // 均转换为科学计数法表示
                  if (Math.abs(value) < 1) {
                    // 小数点后一位开始计算
                    for (var i = 2; i < res.length; i++) {
                      if (res[i] === "0") numN2++; //记录10的负指数值（默认值从1开始）
                      else if (res[i] === ".") continue;
                      else break;
                    }
                    let v = parseFloat(value);
                    // 10的numN2次方
                    v = v * Math.pow(10, numN2);
                    v = v.toFixed(1); //四舍五入 仅保留一位小数位数
                    let char = indexList[Number(numN2)];
                    return v.toString() + "×10" + char;
                  } else if (num1 > 1) {
                    numN1 = num1 - 1;
                    var v = parseFloat(value);
                    v = v / Math.pow(10, numN1);
                    if (num2 > 1) v = v.toFixed(1);

                    let char = indexList[Number(numN1)];
                    return v.toString() + "×10" + char;
                  }
                }
              } else return value;
            },
          },
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dotted",
              color: "rgba(192,192,192,0.2)",
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        //划分线段颜色
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [],
        },
        series: [
          {
            name: "累产油",
            type: "line",
            symbolSize: 8,
            symbol: "circle",
            data: [],
            lineStyle: {
              color: "#95F204",
              width: 1,
            },
            itemStyle: {
              color: "#95F204",
            },
          },
          {
            name: "累产水",
            type: "line",
            symbolSize: 8,
            symbol: "circle",
            data: [],
            lineStyle: {
              color: "#11f5f5",
              width: 1,
            },
            itemStyle: {
              color: "#11f5f5",
            },
          },
        ],
      }, //m3/d
      //8-"日产油", "日产水"
      echartsListwor: {
        backgroundColor: "rgba(128, 128, 128, 0)",
        tooltip: {
          //提示框组件
          trigger: "axis", //item数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
          axisPointer: {
            type: "shadow",
          },
          backgroundColor: "rgba(30, 144, 255, 0.2)",
          textStyle: {
            color: "#FFFFFF",
            fontSize: "16",
          },
          position: function (point) {
            // 固定在顶部
            return [point[0], "18%"];
          },
          formatter: "时间步: {b}<br />{a0}: {c0}<br />{a1}: {c1}",
        },
        legend: {
          data: ["日产油", "日产水"],
          textStyle: {
            color: "#FFFFFF",
            fontSize: 15,
          },
        },
        toolbox: {
          show: true,
          itemSize: 20,
          itemGap: 20,
          feature: {
            //dataView: { readOnly: false },
            //restore: {},
            saveAsImage: {
              backgroundColor: "#014059",
            },
          },
          iconStyle: {
            borderColor: "#FFFFFF",
          },
        },
        //图表位置
        grid: {
          left: "65",
          top: "60",
          right: "30",
          bottom: "35",
        },
        xAxis: {
          //type:'category',
          name: "时间/天",
          nameTextStyle: {
            padding: [0, 0, -60, -30],
            color: "#FFFFFF",
            fontSize: "13",
          },
          //两边留白
          boundaryGap: false,
          lineStyle: {
            type: "solid",
          },
          axisLabel: {
            show: true,
            //rotate:20,
            // x轴的字体样式
            textStyle: {
              color: "#FFFFFF",
              fontSize: "13",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(192,192,192,0.4)",
            },
          },
          axisTick: {
            show: true,
          },
          splitLine: {
            show: false,
          },
          data: [],
          //data: ['1','2']
        },
        yAxis: {
          name: "m³/d",
          nameTextStyle: {
            padding: [0, 0, 8, -50],
            color: "#FFFFFF",
            fontSize: "13",
          },
          // y轴的字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: "#FFFFFF",
              fontSize: "13",
            },
            formatter: function (value) {
              let indexList = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];
              if (Math.abs(value) > 10) {
                if (value === 0) return "0";
                // 检查是否已经转化为科学计数了
                // else if ((value + '').indexOf('e') > 0)
                //   return (value + '').replace(/e/, 'E')
                else {
                  var res = value.toString();
                  var numN1 = 0;
                  var numN2 = 1;
                  var num1 = 0;
                  var num2 = 0;
                  var t1 = 1;
                  // 计入小数点前后有多少位
                  for (var k = 0; k < res.length; k++) {
                    if (res[k] === ".") t1 = 0;
                    if (t1) num1++;
                    else num2++;
                  }
                  // 均转换为科学计数法表示
                  if (Math.abs(value) < 1) {
                    // 小数点后一位开始计算
                    for (var i = 2; i < res.length; i++) {
                      if (res[i] === "0") numN2++; //记录10的负指数值（默认值从1开始）
                      else if (res[i] === ".") continue;
                      else break;
                    }
                    let v = parseFloat(value);
                    // 10的numN2次方
                    v = v * Math.pow(10, numN2);
                    v = v.toFixed(1); //四舍五入 仅保留一位小数位数
                    let char = indexList[Number(numN2)];
                    return v.toString() + "×10" + char;
                  } else if (num1 > 1) {
                    numN1 = num1 - 1;
                    var v = parseFloat(value);
                    v = v / Math.pow(10, numN1);
                    if (num2 > 1) v = v.toFixed(1);

                    let char = indexList[Number(numN1)];
                    return v.toString() + "×10" + char;
                  }
                }
              } else return value;
            },
          },
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dotted",
              color: "rgba(192,192,192,0.2)",
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        //划分线段颜色
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [],
        },
        series: [
          {
            name: "日产油",
            type: "line",
            symbolSize: 8,
            symbol: "circle",
            data: [],
            lineStyle: {
              color: "#EC0F16",
              width: 1,
            },
            itemStyle: {
              color: "#EC0F16",
            },
          },
          {
            name: "日产水",
            type: "line",
            symbolSize: 8,
            symbol: "circle",
            data: [],
            lineStyle: {
              color: "#eb12c8",
              width: 1,
            },
            itemStyle: {
              color: "#eb12c8",
            },
          },
        ],
      }, //m3/d
      //9-"累注水"
      echartsListww: {
        backgroundColor: "rgba(128, 128, 128, 0)",
        tooltip: {
          //提示框组件
          trigger: "axis", //item数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
          axisPointer: {
            type: "shadow",
          },
          backgroundColor: "rgba(30, 144, 255, 0.2)",
          textStyle: {
            color: "#FFFFFF",
            fontSize: "16",
          },
          position: function (point) {
            // 固定在顶部
            return [point[0], "18%"];
          },
          formatter: "时间步: {b}<br />{a0}: {c0}",
        },
        legend: {
          data: ["累注水"],
          textStyle: {
            color: "#FFFFFF",
            fontSize: 15,
          },
        },
        toolbox: {
          show: true,
          itemSize: 20,
          itemGap: 20,
          feature: {
            //dataView: { readOnly: false },
            //restore: {},
            saveAsImage: {
              backgroundColor: "#014059",
            },
          },
          iconStyle: {
            borderColor: "#FFFFFF",
          },
        },
        //图表位置
        grid: {
          left: "65",
          top: "60",
          right: "30",
          bottom: "35",
        },
        xAxis: {
          //type:'category',
          name: "时间/天",
          nameTextStyle: {
            padding: [0, 0, -60, -30],
            color: "#FFFFFF",
            fontSize: "13",
          },
          //两边留白
          boundaryGap: false,
          lineStyle: {
            type: "solid",
          },
          axisLabel: {
            show: true,
            //rotate:20,
            // x轴的字体样式
            textStyle: {
              color: "#FFFFFF",
              fontSize: "13",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(192,192,192,0.4)",
            },
          },
          axisTick: {
            show: true,
          },
          splitLine: {
            show: false,
          },
          data: [],
          //data: ['1','2']
        },
        yAxis: {
          name: "m³",
          nameTextStyle: {
            padding: [0, 0, 8, -50],
            color: "#FFFFFF",
            fontSize: "13",
          },
          // y轴的字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: "#FFFFFF",
              fontSize: "13",
            },
            formatter: function (value) {
              let indexList = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];
              if (Math.abs(value) > 10) {
                if (value === 0) return "0";
                // 检查是否已经转化为科学计数了
                // else if ((value + '').indexOf('e') > 0)
                //   return (value + '').replace(/e/, 'E')
                else {
                  var res = value.toString();
                  var numN1 = 0;
                  var numN2 = 1;
                  var num1 = 0;
                  var num2 = 0;
                  var t1 = 1;
                  // 计入小数点前后有多少位
                  for (var k = 0; k < res.length; k++) {
                    if (res[k] === ".") t1 = 0;
                    if (t1) num1++;
                    else num2++;
                  }
                  // 均转换为科学计数法表示
                  if (Math.abs(value) < 1) {
                    // 小数点后一位开始计算
                    for (var i = 2; i < res.length; i++) {
                      if (res[i] === "0") numN2++; //记录10的负指数值（默认值从1开始）
                      else if (res[i] === ".") continue;
                      else break;
                    }
                    let v = parseFloat(value);
                    // 10的numN2次方
                    v = v * Math.pow(10, numN2);
                    v = v.toFixed(1); //四舍五入 仅保留一位小数位数
                    let char = indexList[Number(numN2)];
                    return v.toString() + "×10" + char;
                  } else if (num1 > 1) {
                    numN1 = num1 - 1;
                    var v = parseFloat(value);
                    v = v / Math.pow(10, numN1);
                    if (num2 > 1) v = v.toFixed(1);

                    let char = indexList[Number(numN1)];
                    return v.toString() + "×10" + char;
                  }
                }
              } else return value;
            },
          },
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dotted",
              color: "rgba(192,192,192,0.2)",
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        //划分线段颜色
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [],
        },
        series: [
          {
            name: "累注水",
            type: "line",
            symbolSize: 8,
            symbol: "circle",
            data: [],
            lineStyle: {
              color: "#11f5f5",
              width: 1,
            },
            itemStyle: {
              color: "#11f5f5",
            },
          },
        ],
      }, //m3/d
      //10-"液产量", "日注水"
      echartsListwwr: {
        backgroundColor: "rgba(128, 128, 128, 0)",
        tooltip: {
          //提示框组件
          trigger: "axis", //item数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
          axisPointer: {
            type: "shadow",
          },
          backgroundColor: "rgba(30, 144, 255, 0.2)",
          textStyle: {
            color: "#FFFFFF",
            fontSize: "16",
          },
          position: function (point) {
            // 固定在顶部
            return [point[0], "18%"];
          },
          formatter: "时间步: {b}<br />{a0}: {c0}<br />{a1}: {c1}",
        },
        legend: {
          data: ["液产量", "日注水"],
          textStyle: {
            color: "#FFFFFF",
            fontSize: 15,
          },
        },
        toolbox: {
          show: true,
          itemSize: 20,
          itemGap: 20,
          feature: {
            //dataView: { readOnly: false },
            //restore: {},
            saveAsImage: {
              backgroundColor: "#014059",
            },
          },
          iconStyle: {
            borderColor: "#FFFFFF",
          },
        },
        //图表位置
        grid: {
          left: "65",
          top: "60",
          right: "30",
          bottom: "35",
        },
        xAxis: {
          //type:'category',
          name: "时间/天",
          nameTextStyle: {
            padding: [0, 0, -60, -30],
            color: "#FFFFFF",
            fontSize: "13",
          },
          //两边留白
          boundaryGap: false,
          lineStyle: {
            type: "solid",
          },
          axisLabel: {
            show: true,
            //rotate:20,
            // x轴的字体样式
            textStyle: {
              color: "#FFFFFF",
              fontSize: "13",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(192,192,192,0.4)",
            },
          },
          axisTick: {
            show: true,
          },
          splitLine: {
            show: false,
          },
          data: [],
          //data: ['1','2']
        },
        yAxis: {
          name: "m³/d",
          nameTextStyle: {
            padding: [0, 0, 8, -50],
            color: "#FFFFFF",
            fontSize: "13",
          },
          // y轴的字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: "#FFFFFF",
              fontSize: "13",
            },
            formatter: function (value) {
              let indexList = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];
              if (Math.abs(value) > 10) {
                if (value === 0) return "0";
                // 检查是否已经转化为科学计数了
                // else if ((value + '').indexOf('e') > 0)
                //   return (value + '').replace(/e/, 'E')
                else {
                  var res = value.toString();
                  var numN1 = 0;
                  var numN2 = 1;
                  var num1 = 0;
                  var num2 = 0;
                  var t1 = 1;
                  // 计入小数点前后有多少位
                  for (var k = 0; k < res.length; k++) {
                    if (res[k] === ".") t1 = 0;
                    if (t1) num1++;
                    else num2++;
                  }
                  // 均转换为科学计数法表示
                  if (Math.abs(value) < 1) {
                    // 小数点后一位开始计算
                    for (var i = 2; i < res.length; i++) {
                      if (res[i] === "0") numN2++; //记录10的负指数值（默认值从1开始）
                      else if (res[i] === ".") continue;
                      else break;
                    }
                    let v = parseFloat(value);
                    // 10的numN2次方
                    v = v * Math.pow(10, numN2);
                    v = v.toFixed(1); //四舍五入 仅保留一位小数位数
                    let char = indexList[Number(numN2)];
                    return v.toString() + "×10" + char;
                  } else if (num1 > 1) {
                    numN1 = num1 - 1;
                    var v = parseFloat(value);
                    v = v / Math.pow(10, numN1);
                    if (num2 > 1) v = v.toFixed(1);

                    let char = indexList[Number(numN1)];
                    return v.toString() + "×10" + char;
                  }
                }
              } else return value;
            },
          },
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dotted",
              color: "rgba(192,192,192,0.2)",
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        //划分线段颜色
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [],
        },
        series: [
          {
            name: "液产量",
            type: "line",
            symbolSize: 8,
            symbol: "circle",
            data: [],
            lineStyle: {
              color: "#95F204",
              width: 1,
            },
            itemStyle: {
              color: "#95F204",
            },
          },
          {
            name: "日注水",
            type: "line",
            symbolSize: 8,
            symbol: "circle",
            data: [],
            lineStyle: {
              color: "#EC0F16",
              width: 1,
            },
            itemStyle: {
              color: "#EC0F16",
            },
          },
        ],
      },
      //11-"优化累产油量"
      echartsBar: {
        backgroundColor: "rgba(128, 128, 128, 0)",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          backgroundColor: "rgba(30, 144, 255, 0.2)",
          textStyle: {
            color: "#FFFFFF",
            fontSize: "16",
          },
          position: function (point) {
            // 固定在顶部
            return [point[0], "18%"];
          },
        },
        legend: {
          data: ["优化累产油量"],
          textStyle: {
            color: "#FFFFFF",
            fontSize: 15,
          },
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "top",
          itemSize: 20,
          itemGap: 20,
          feature: {
            saveAsImage: {
              backgroundColor: "#014059",
              show: true,
            },
          },
          iconStyle: {
            borderColor: "#FFFFFF",
          },
        },
        //图表位置
        grid: {
          left: "60",
          top: "60",
          right: "30",
          bottom: "80",
        },
        dataZoom: [
          {
            type: "slider",
            show: true,
            handleSize: 20,
            height: "20px",
            startValue: 0,
            endValue: 11, //xArraylength是x轴返回的数据的个数
            showDetail: false,
            bottom: "1",
            left: "45",
            zoomLock: true,
            brushSelect: false,
          },
        ],
        xAxis: {
          name: "井号",
          type: "category",
          //两边留白
          //boundaryGap: true,
          lineStyle: {
            type: "solid",
          },
          axisLabel: {
            show: true,
            rotate: 25,
            // x轴的字体样式
            textStyle: {
              color: "#FFFFFF",
              fontSize: "13",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(192,192,192,0.4)",
            },
          },
          axisTick: {
            show: true,
          },
          splitLine: {
            show: false,
          },
          nameTextStyle: {
            padding: [0, 0, -60, -10],
            color: "#FFFFFF",
            fontSize: "13",
          },
          data: [],
        },
        yAxis: {
          //name: "优\n化\n累\n产\n油\n量",
          name: "m³",
          //nameLocation: "left",
          nameTextStyle: {
            padding: [0, 0, 10, -20],
            color: "#FFFFFF",
            fontSize: "13",
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#FFFFFF",
              fontSize: "13",
            },
            formatter: function (value) {
              let indexList = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];
              if (Math.abs(value) > 10) {
                if (value === 0) return "0";
                // 检查是否已经转化为科学计数了
                // else if ((value + '').indexOf('e') > 0)
                //   return (value + '').replace(/e/, 'E')
                else {
                  var res = value.toString();
                  var numN1 = 0;
                  var numN2 = 1;
                  var num1 = 0;
                  var num2 = 0;
                  var t1 = 1;
                  // 计入小数点前后有多少位
                  for (var k = 0; k < res.length; k++) {
                    if (res[k] === ".") t1 = 0;
                    if (t1) num1++;
                    else num2++;
                  }
                  // 均转换为科学计数法表示
                  if (Math.abs(value) < 1) {
                    // 小数点后一位开始计算
                    for (var i = 2; i < res.length; i++) {
                      if (res[i] === "0") numN2++; //记录10的负指数值（默认值从1开始）
                      else if (res[i] === ".") continue;
                      else break;
                    }
                    let v = parseFloat(value);
                    // 10的numN2次方
                    v = v * Math.pow(10, numN2);
                    v = v.toFixed(1); //四舍五入 仅保留一位小数位数
                    let char = indexList[Number(numN2)];
                    return v.toString() + "×10" + char;
                  } else if (num1 > 1) {
                    numN1 = num1 - 1;
                    var v = parseFloat(value);
                    v = v / Math.pow(10, numN1);
                    if (num2 > 1) v = v.toFixed(1);

                    let char = indexList[Number(numN1)];
                    return v.toString() + "×10" + char;
                  }
                }
              } else return value;
            },
          },
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dotted",
              color: "rgba(192,192,192,0.2)",
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            name: "优化累产油量",
            type: "bar",
            barWidth: "50%",
            itemStyle: {
              normal: {
                color: "#00FF7F",
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#FFFFFF",
                    fontSize: 12,
                  },
                },
              },
            },
            barGap: 0,
            emphasis: {
              focus: "series",
            },
            data: [],
          },
        ],
      },
      isShowChart: true,
      isShowTable: false,
      qkdialogTableVisible: false,
      tableList: [], //区块表格
      isChartOil: true,
      isChartWater: false,
      isDjTable: false,
      djdialogTableVisible: false,
      modelWellType: "1", //油水井
      modelWellNo: "", //油水井井号
      djtableList: [], //单井表格
      modelWellTypeOptions: [
        {
          value: "1",
          label: "油井",
        },
        {
          value: "0",
          label: "水井",
        },
      ],
      WellNoList: [], //油水井号选择
      tt: "",
      modelStep: "",
      opt: false,
      indexData: [],
      piecesData: [],
      djindexData: [],
      djpiecesData: [],
    };
  },
  //监听radio2值得变化，进行echarts渲染
  watch: {
    radio2: {
      handler(newValue, oldValue) {
        this.radio2 = newValue;
        this.getCharts(); //值发生改变则渲染一次echarts
      },
    },
    radio3: {
      handler(newValue, oldValue) {
        this.radio3 = newValue;
        this.djjhSelect(); //值发生改变则渲染一次echarts
      },
    },
    isMax:{
      handler(newValue, oldValue) {
       console.log(newValue)
      },
    },
    radio4: {
      handler(newValue, oldValue) {
        this.radio4 = newValue;
        this.djjhSelect(); //值发生改变则渲染一次echarts
      },
    },
    tt: {
      handler: function (value) {
        if (value != null) {
          this.run();
        }
      },
    },
  },
  mounted() {
    setTimeout(() => {
      this.h();
    }, 1000);
  },
  methods: {
    run() {
      setTimeout(() => {
        if (this.modelBasicInfo.modelStep != 0) {
          this.twoSelect();
          this.djjhSelect();
          this.getDjTable();
          this.getCharts();
          this.getTable();
        }
      }, 1000);
    },
    h() {
      this.tt = this.modelBasicInfo.modelBasicId;
      console.log("ehgfdjgeiud", this.tt);
    },
    //单位换行
    renderHeader(h, { column }) {
      return h("span", {}, [
        h("span", {}, column.label.split("//")[0]),
        h("br"),
        h("span", {}, column.label.split("//")[1]),
      ])
    },
    //保留两位小数
    fun(val) {
      return Number(val).toFixed(2);
    },
    //区块，单井切换
    tabChange(i) {
      if (i === 1) {
        this.isShowqk = true;
        this.isShowdj = false;
      } else if (i === 2) {
        this.isShowqk = false;
        this.isShowdj = true;
        this.djjhSelect();
      }
    },
    //区块当选框选择值进行改变
    changeRadio2(value) {
      //console.log("当前选中" + value);
      this.radio2 = value;
      //this.getCharts();
    },
    //区块渲染echarts
    getCharts() {
      // this.echartsAll
      if (this.modelBasicInfo.modelStep == 0) {
        this.control = true;
        this.control1 = false;
        console.log("control1", this.control1);
      } else if (this.modelBasicInfo.modelStep != 0) {
        this.control1 = true;
        this.control = false;
        GetBlockSeries(this.modelBasicInfo.modelBasicId)
          .then(({ code, result }) => {
            if (code === 0) {
              let num = result.blockSeries.simulationTimeList;
              //折线图分段
              var arr = result.blockSeries.isRealList;
              console.log("arrrrrrrrrrrr", arr);
              this.indexData = [];
              for (let index = 0; index < arr.length; index++) {
                if (arr[index] != arr[index + 1]) {
                  this.indexData.push(index + 1);
                }
              }
              console.log("this.indexData", this.indexData);
              let firstdata = arr[0];
              this.piecesData = [];
              for (let i = 0; i < this.indexData.length; i++) {
                let min = this.indexData[i - 1] - 1;
                let max = this.indexData[i] - 1;
                if (firstdata == 0) {
                  if (i == 0) {
                    var piece = {
                      gt: -1,
                      lte: this.djindexData[0] - 1,
                      color: "#FF4500",
                    };
                  } else {
                    if (i % 2 == 1) {
                      var piece = {
                        gt: min,
                        lte: max,
                        color: "#EEEE00",
                      };
                    } else {
                      var piece = {
                        gt: min,
                        lte: max,
                        color: "#FF4500",
                      };
                    }
                  }
                } else {
                  if (i == 0) {
                    var piece = {
                      gt: -1,
                      lte: this.indexData[0] - 1,
                      color: "#EEEE00",
                    };
                  } else {
                    if (i % 2 == 1) {
                      var piece = {
                        gt: min,
                        lte: max,
                        color: "#FF4500",
                      };
                    } else {
                      var piece = {
                        gt: min,
                        lte: max,
                        color: "#EEEE00",
                      };
                    }
                  }
                }
                this.piecesData.push(piece);
              }
              console.log("this.piecesData", this.piecesData);

              // 此处根据type切换对应得值。根据后端接口来，将所以得值带过来了取不同得字段
              if (this.radio2 == "油藏压力") {
                this.echartsMpa.xAxis.data = num;
                this.echartsMpa.series[0].data = result.blockSeries.fprList;
                this.echartsMpa.visualMap.pieces = this.piecesData;
                this.echartsAll =  this.echartsMpa;
              }
              if (this.radio2 == "含水率") {
                this.echartsBaifenhao.xAxis.data = num;
                this.echartsBaifenhao.series[0].data = result.blockSeries.fwctList;
                this.echartsBaifenhao.visualMap.pieces = this.piecesData;
                this.echartsAll =  this.echartsBaifenhao;
              }
              if (this.radio2 == "净现值") {
                this.echartsNpv.xAxis.data = num;
                this.echartsNpv.series[0].data = result.blockSeries.npvList;
                this.echartsNpv.visualMap.pieces = this.piecesData;
                this.echartsAll =  this.echartsNpv
                // this.echartsAll.echartsNpv.xAxis.data = num;
                // this.echartsAll.echartsNpv.series[0].data = result.blockSeries.npvList;
                // this.echartsAll.echartsNpv.visualMap.pieces = this.piecesData;
                // var myChart = echarts.init(this.$refs.main);
                // myChart.setOption(this.echartsNpv, true);
                // this.echartsAll = this.echartsNpv;
                // this.chart.setOption(this.echartsAll, true);
                // window.LineChart = myChart;
              }
              if (this.radio2 == "日(产水/注水/产油)") {
                this.echartsListDay.xAxis.data = num;
                this.echartsListDay.series[0].data = result.blockSeries.fwprList;
                this.echartsListDay.series[1].data = result.blockSeries.fwirList;
                this.echartsListDay.series[2].data = result.blockSeries.foprList;
                this.echartsListDay.visualMap.pieces = this.piecesData;
                this.echartsAll =  this.echartsListDay

              }
              if (this.radio2 == "累(注水/产水/产油)") {
                this.echartsListt.xAxis.data = num;
                this.echartsListt.series[0].data = result.blockSeries.fwitList;
                this.echartsListt.series[1].data = result.blockSeries.fwptList;
                this.echartsListt.series[2].data = result.blockSeries.foptList;
                this.echartsListt.visualMap.pieces = this.piecesData;
                this.echartsAll =  this.echartsListt
              }
            } else {
              // this.$message.error(error);
            }
          })
          .catch((error) => {
            //this.$message.error(error);
          });
      }
    },
    //区块表格数据
    getTable() {
      console.log("------");
      console.log(this.modelBasicInfo.modelBasicId);
      //var modelBasicId = "034955F19E54404A861810038045659A";
      var modelBasicId = this.modelBasicInfo.modelBasicId;
      GetBlockListByModelBasicId(modelBasicId).then(({ code, result }) => {
        if (code === 0) {
          console.log(result);
          this.tableList = result.blockList;
        }
      });
    },
    //单井油井当选框选择值进行改变
    changeRadio3(value) {
      this.radio3 = value;
    },

    //单井水井当选框选择值进行改变
    changeRadio4(value) {
      this.radio4 = value;
    },
    //下拉框两级联动
    twoSelect() {
      //水井油井折线图切换
      var param = {
        modelBasicId: this.modelBasicInfo.modelBasicId,
        modelWellType: this.modelWellType, //1-油井 0-水井
      };
      if (this.modelWellType == "1") {
        this.isChartOil = true;
        this.isChartWater = false;
        GetModelWellNoList(param).then(({ code, result }) => {
          if (code === 0) {
            this.WellNoList = result.modelWellNoList;
            this.modelWellNo = this.WellNoList[0].value; //默认显示第一条数据
            console.log("echartsmodelWellNo", this.modelWellNo);
            this.djjhSelect();
          }
        });
      } else {
        this.isChartWater = true;
        this.isChartOil = false;
        GetModelWellNoList(param).then(({ code, result }) => {
          if (code === 0) {
            this.WellNoList = result.modelWellNoList;
            this.modelWellNo = this.WellNoList[0].value; //默认显示第一条数据
            console.log("echartsmodelWellNo", this.modelWellNo);
            this.djjhSelect();
          }
        });
      }
    },
    djjhSelect() {
      var param = {
        modelBasicId: this.modelBasicInfo.modelBasicId,
        modelWellType: this.modelWellType, //1-油井
        modelWellNo: this.modelWellNo, //单井井号
      };
      if (this.modelBasicInfo.modelStep != 0) {
        if (this.modelWellType == "1") {
          GetWellSeries(param).then(({ code, result }) => {
            if (code === 0) {
              console.log("所有数据", result);
              let num = result.wellSeries.simulationTimeList;
              //折线图分段
              let arr = result.wellSeries.isRealList;
              this.djindexData = [];
              for (let index = 0; index < arr.length; index++) {
                if (arr[index] != arr[index + 1]) {
                  this.djindexData.push(index + 1);
                }
              }
              let firstdata = arr[0];
              this.djpiecesData = [];
              for (let i = 0; i < this.djindexData.length; i++) {
                let min = this.djindexData[i - 1] - 1;
                let max = this.djindexData[i] - 1;
                if (firstdata == 0) {
                  if (i == 0) {
                    var piece = {
                      gt: -1,
                      lte: this.djindexData[0] - 1,
                      color: "#FF4500",
                    };
                  } else {
                    if (i % 2 == 1) {
                      var piece = {
                        gt: min,
                        lte: max,
                        color: "#EEEE00",
                      };
                    } else {
                      var piece = {
                        gt: min,
                        lte: max,
                        color: "#FF4500",
                      };
                    }
                  }
                } else {
                  if (i == 0) {
                    var piece = {
                      gt: -1,
                      lte: this.djindexData[0] - 1,
                      color: "#EEEE00",
                    };
                  } else {
                    if (i % 2 == 1) {
                      var piece = {
                        gt: min,
                        lte: max,
                        color: "#FF4500",
                      };
                    } else {
                      var piece = {
                        gt: min,
                        lte: max,
                        color: "#EEEE00",
                      };
                    }
                  }
                }
                this.djpiecesData.push(piece);
              }
              // 此处根据type切换对应得值。根据后端接口来，将所以得值带过来了取不同得字段
              if (this.radio3 == "累(产油/产水)") {
                this.echartsListwo.xAxis.data = num;
                this.echartsListwo.series[0].data = result.wellSeries.woptList;
                this.echartsListwo.series[1].data = result.wellSeries.wwptList;
                this.echartsListwo.visualMap.pieces = this.djpiecesData;
                this.echartsAllOil = this.echartsListwo
                // var myChart = echarts.init(this.$refs.omain);
                // myChart.setOption(this.echartsListwo, true);
              }
              if (this.radio3 == "日(产油/产水)") {
                this.echartsListwor.xAxis.data = num;
                this.echartsListwor.series[0].data = result.wellSeries.woprList;
                this.echartsListwor.series[1].data = result.wellSeries.wwprList;
                this.echartsListwor.visualMap.pieces = this.djpiecesData;
                this.echartsAllOil = this.echartsListwor
                // var myChart = echarts.init(this.$refs.omain);
                // myChart.setOption(this.echartsListwor, true);
              }
              if (this.radio3 == "含水率") {
                this.echartsBaifenhao.xAxis.data = num;
                this.echartsBaifenhao.series[0].data = result.wellSeries.wwctList;
                this.echartsBaifenhao.visualMap.pieces = this.djpiecesData;
                this.echartsAllOil = this.echartsBaifenhao
                // var myChart = echarts.init(this.$refs.omain);
                // myChart.setOption(this.echartsBaifenhao, true);
              }
              if (this.modelBasicInfo.modelStep >= 2) {
                this.opt = true;
                if (this.radio3 == "优化阶段产油量") {
                  GetOilWellOpt(this.modelBasicInfo.modelBasicId).then(({ code, result }) => {
                    if (code == 0) {
                      let oilWellNo = [];
                      let arrNo = result.oilWellOpt;
                      arrNo.forEach((element) => {
                        oilWellNo.push(element.modelWellNo);
                      });
                      let oilOpt = [];
                      arrNo.forEach((element) => {
                        let opt = parseInt(element.opt);
                        oilOpt.push(opt);
                      });
                      // let start = oilWellNo.length-12
                      // let end = oilWellNo.length-1
                      // this.echartsBar.dataZoom[0].startValue = start
                      // this.echartsBar.dataZoom[0].endValue = end
                      console.log("result.oilWellOpt.modelWellNo", oilWellNo);
                      // console.log("result.oilWellOpt.opt", oilOpt);
                      this.echartsBar.xAxis.data = oilWellNo;
                      this.echartsBar.series[0].data = oilOpt;
                      this.echartsAllOil = this.echartsBar
                      // var myChart = echarts.init(this.$refs.omain);
                      // myChart.setOption(this.echartsBar, true);
                    }
                  });
                }
              }
            }
          });
        } else {
          GetWellSeries(param).then(({ code, result }) => {
            if (code === 0) {
              // console.log('kxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', result.wellSeries)
              let num = result.wellSeries.simulationTimeList;
              //折线图分段
              var arr = result.wellSeries.isRealList;
              this.djindexData = [];
              for (let index = 0; index < arr.length; index++) {
                if (arr[index] != arr[index + 1]) {
                  this.djindexData.push(index + 1);
                }
              }
              let firstdata = arr[0];
              this.djpiecesData = [];
              for (let i = 0; i < this.djindexData.length; i++) {
                let min = this.djindexData[i - 1] - 1;
                let max = this.djindexData[i] - 1;
                if (firstdata == 0) {
                  if (i == 0) {
                    var piece = {
                      gt: -1,
                      lte: this.djindexData[0] - 1,
                      color: "#FF4500",
                    };
                  } else {
                    if (i % 2 == 1) {
                      var piece = {
                        gt: min,
                        lte: max,
                        color: "#EEEE00",
                      };
                    } else {
                      var piece = {
                        gt: min,
                        lte: max,
                        color: "#FF4500",
                      };
                    }
                  }
                } else {
                  if (i == 0) {
                    var piece = {
                      gt: -1,
                      lte: this.djindexData[0] - 1,
                      color: "#EEEE00",
                    };
                  } else {
                    if (i % 2 == 1) {
                      var piece = {
                        gt: min,
                        lte: max,
                        color: "#FF4500",
                      };
                    } else {
                      var piece = {
                        gt: min,
                        lte: max,
                        color: "#EEEE00",
                      };
                    }
                  }
                }

                this.djpiecesData.push(piece);
              }
              if (this.radio4 == "井底流压") {
                this.echartsMpaa.xAxis.data = num;
                this.echartsMpaa.series[0].data = result.wellSeries.wbhpList;
                this.echartsMpaa.visualMap.pieces = this.djpiecesData;
                this.echartsAllWater = this.echartsMpaa
                // var myChart = echarts.init(this.$refs.wmain);
                // myChart.setOption(this.echartsMpaa, true);
              }
              if (this.radio4 == "累注水") {
                this.echartsListww.xAxis.data = num;
                this.echartsListww.series[0].data = result.wellSeries.wwitList;
                this.echartsListww.visualMap.pieces = this.djpiecesData;
                this.echartsAllWater = this.echartsListww
                // var myChart = echarts.init(this.$refs.wmain);
                // myChart.setOption(this.echartsListww, true);
              }
              if (this.radio4 == "(液产量/日注水)") {
                this.echartsListwwr.xAxis.data = num;
                this.echartsListwwr.series[0].data = result.wellSeries.wlprList;
                this.echartsListwwr.series[1].data = result.wellSeries.wwirList;
                this.echartsListwwr.visualMap.pieces = this.djpiecesData;
                this.echartsAllWater = this.echartsListwwr
                // var myChart = echarts.init(this.$refs.wmain);
                // myChart.setOption(this.echartsListwwr, true);
              }
            }
          });
        }
      }
    },
    getDjTable() {
      var param = {
        modelBasicId: this.modelBasicInfo.modelBasicId,
        modelWellType: this.modelWellType, //1-油井
        modelWellNo: this.modelWellNo, //单井井号
      };
      GetWellListByModelBasicId(param).then(({ code, result }) => {
        if (code === 0) {
          this.djtableList = result.wellList;
        }
      });
    },
    //单井查看数据
    djViewData() {
      this.isDjTable = !this.isDjTable;
      this.getDjTable();
    },
  },
};
</script>

<style lang="scss" scoped>

</style>