<template>
  <el-container class="layout">
    <el-header height="auto">
      <header-search class="g-w100 g-h100" style="width: 100%">
        <div class="py-5 overflow-hidden" style="margin-top: 10px; margin-bottom: 10px">
          <div class="fl">
            <span>油田：</span>
            <el-select v-model="selectOilField" disabled @change="getFetchFields">
              <el-option v-for="item in oilField" :key="item.oilFieldId" :label="item.name" :value="item.oilFieldId">
              </el-option>
            </el-select>
            <span class="QU" style="margin-left: 20px">区块：</span>
            <el-select v-model="selectBlock">
              <el-option v-for="item in block" :key="item.fieldId" :label="item.name" :value="item.fieldId">
              </el-option>
            </el-select>
            <el-button icon="el-icon-search" type="primary" style="margin-left: 20px" @click="doSearch">
              检索
            </el-button>
          </div>
          <div class="fr overflow-hidden">
            <!-- 产能类 -->
            <el-radio-group v-model="radio1">
              <!-- <el-radio-button label="产能类"></el-radio-button> -->
              <el-button class="commonBtn" label="产能类" > 产能类 </el-button>
              <!-- 储量类 -->
              <router-link
                :to="{
                  name: 'developmentEffectEvaluation_reserves',
                  params: {
                    oilFieldId: selectOilField,
                    fieldId: selectBlock,
                    canDownload: canDownload,
                  },
                }"
              >
                <!-- <el-radio-button ></el-radio-button> -->

                <el-button class="commonBtn" label="储量类" style="margin-left: 20px"> 储存类 </el-button>
              </router-link>
              <!-- 含水类 -->
              <router-link
                :to="{
                  name: 'developmentEffectEvaluation_water',
                  params: {
                    oilFieldId: selectOilField,
                    fieldId: selectBlock,
                    canDownload: canDownload,
                  },
                }"
              >
                <!-- <el-radio-button label="含水类" style="margin-left: 3px"></el-radio-button> -->
                <el-button class="commonBtn" label="含水类" style="margin-left: 3px"> 含水类 </el-button>
                
              </router-link>
              <!-- 递减类  -->
              <router-link
                :to="{
                  name: 'developmentEffectEvaluation_Decreasing',
                  params: {
                    oilFieldId: selectOilField,
                    fieldId: selectBlock,
                    canDownload: canDownload,
                  },
                }"
              >
                <!-- <el-radio-button label="递减类"></el-radio-button> -->
                <el-button class="commonBtn" label="递减类"> 递减类 </el-button>
              </router-link>
            </el-radio-group>
          </div></div
      ></header-search>
    </el-header>

    <el-main class="el-main">
      <!-- <pagePanelNew style="height: 100%"> -->
      <div class="dom" style="margin-top: 20px">
        <el-row :gutter="20" style="margin-top: -20px">
          <el-col :span="12">
            <pagePanel headerTitle="采油速度" style="width: 100%; height: 370px" :isShowMaxBtn="true">
              <Echart :chart-data="productionSpeed" style="height: 100%"></Echart>
            </pagePanel>
          </el-col>
          <el-col :span="12">
            <pagePanel headerTitle="采出程度" style="width: 100%; height: 370px" :isShowMaxBtn="true"
              ><Echart :chart-data="recoveryDegree" style="height: 100%"></Echart
            ></pagePanel>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <pagePanel headerTitle="采出程度与含水率关系图" style="width: 100%; height: 380px" :isShowMaxBtn="true">
              <Echart :chart-data="relationship" style="height: 100%"></Echart
            ></pagePanel>
          </el-col>
          <el-col :span="12">
            <pagePanel headerTitle="注采比" style="width: 100%; height: 380px" :isShowMaxBtn="true">
              <div class="infoZhu">
                <span>合理注采比:</span>
                <el-input-number
                  v-model="lineStandOne"
                  :controls="false"
                  style="width: 180px"
                  @change="setFirstLine"
                ></el-input-number>
                <el-input-number
                  v-model="lineStandTwo"
                  :controls="false"
                  style="width: 180px"
                  @change="setSecondLine"
                ></el-input-number>
              </div>
              <Echart :chart-data="injectionProductionRatio" style="height: 100%"></Echart>
            </pagePanel>
          </el-col>
        </el-row>
        <el-row class="mt-5" :gutter="20">
          <el-col :span="12">
            <pagePanel headerTitle="地层总压降" style="width: 100%; height: 360px" :isShowMaxBtn="true">
              <div>
                <span>合理地层压力；</span>
                <el-input-number
                  v-model="lineStandThree"
                  :controls="false"
                  style="width: 180px"
                  @change="setThirdLine"
                ></el-input-number>
              </div>
              <Echart :chart-data="totalFormationPressureDrop" style="height: 100%"></Echart>
            </pagePanel>
          </el-col>
          <el-col :span="12">
            <pagePanel headerTitle="指标评价结果表" style="width: 100%; height: 360px" :isShowMaxBtn="true">
              <div class="Dui" style="margin-top: 5px">
                <span class="f1">对标油田</span>
                <el-select v-model="fields" class="f2" style="width: 190px" disabled>
                  <el-option
                    v-for="item in fieldsData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  >
                  </el-option>
                </el-select>
                <span class="f1" style="margin-left: 20px">开发阶段</span>
                <el-select v-model="fields" class="f2" style="width: 190px">
                  <el-option
                    v-for="item in fieldsData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  >
                  </el-option>
                </el-select>
                <el-button type="primary" style="min-width: 65px" class="jia"> 检索</el-button>
                <el-button type="primary" style="min-width: 65px"> 查看</el-button>
              </div>
              <el-table :data="tableData" highlight style="margin-top: 20px">
                <el-table-column prop="indicatorName" label="指标" align="center"></el-table-column>
                <el-table-column prop="evaluationResult" label="评价结果" align="center"></el-table-column>
                <el-table-column prop="lastPhaseValue" label="上阶段值" align="center"></el-table-column>
                <el-table-column prop="diffLastPhaseValue" label="与上阶段对比差值" align="center"></el-table-column>
                <el-table-column label="理论值" align="center">
                  <template slot-scope="scope">
                    <el-input-number
                      v-model="scope.row.theoryValue"
                      :controls="false"
                      style="width: 80px"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column prop="diffTheoryValue" label="与理论值对比差值" align="center">
                  <template slot-scope="scope">
                    <span>{{
                      (Number(scope.row.evaluationResult) - Number(scope.row.theoryValue)) | toFixNumberFour
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="diffSimilarOilField"
                  label="与同类型油田比较"
                  align="center"
                  width="80"
                ></el-table-column>
                <el-table-column prop="result" label="结论" align="center" width="80"></el-table-column>
              </el-table>
            </pagePanel>
          </el-col>
        </el-row>
      </div>
      <!-- </pagePanelNew> -->
    </el-main>
  </el-container>
</template>
<script>
import * as echarts from "echarts";
import Echart from "@/components/tools/Echarts/index.vue";
import { fetchOilFields, fetchFields } from "@/api/oilDeposit/rem-02/primaryinfo.js";
import {
  outputSpeed,
  outputDegree,
  outputDegreeTongChart,
  injectionProRate,
  generalPressure,
  indicatorEveluationResults,
} from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
import { getWidgetByAreaUser } from "@/api/oilDeposit/rmm-01/rmm01";
export default {
  components: {
    Echart,
  },
  filters: {
    toFixNumberFour(val) {
      return val.toFixed(4);
    },
  },
  data() {
    return {
      //对标油田
      fields: "",
      fieldsData: "",
      //注采比 第一条标线
      lineStandOne: 0.6,
      //注采比 第二条标线
      lineStandTwo: 1,
      //地层总降压 标线
      lineStandThree: 0,
      //油田
      oilField: [],
      //油田名字
      oilFieldName: "",
      //油田选中值
      selectOilField: "",
      //区块
      block: [],
      //区块选中值
      selectBlock: "",
      radio1: "产能类",
      //查询参数
      queryParams: {},
      page: 1,
      pageSize: 10,
      //油田列表
      oilFieldList: [
        {
          value: "QHD32-6",
          label: "秦皇岛32-6油田",
        },
      ],
      //区域列表
      areaList: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "区块1",
          label: "区块1",
        },
      ],
      //采油速度
      productionSpeed: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        dataZoom: {
          start: 0,
          type: "inside",
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "采油速度",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        legend: {
          data: [],
          left: 0,
          textStyle: {
            color: "#24DEFF",
          },
        },
        xAxis: {
          type: "category",
          axisLabel: {
            color: "#8FA4CC",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        color: ["#1379F7", "#FF5844", "#F5BE43", "#00BC9C", "#FF5844", "#DA835E", "#9A72FF", "#FF30AD", "#2ACAFF"],
        yAxis: [
          {
            name: "地质储量采油速度%",
            nameLocation: "center",
            nameTextStyle: { color: "#8FA4CC" },
            nameGap: 44,
            type: "value",
            minInterval: 0,
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
          {
            name: "可采、剩余可采采油速度%",
            nameLocation: "center",
            nameTextStyle: { color: "#8FA4CC" },
            nameGap: 44,
            type: "value",
            minInterval: 0,
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
        ],
        series: [],
      },
      //采出程度
      recoveryDegree: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          left: 0,
          textStyle: {
            color: "#24DEFF",
          },
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "地质储量采出程度",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        color: ["#1379F7", "#FF5844", "#F5BE43", "#00BC9C", "#FF5844", "#DA835E", "#9A72FF", "#FF30AD", "#2ACAFF"],
        xAxis: {
          name: "地质储量采出程度(%)",
          nameLocation: "center",
          nameTextStyle: { color: "#8FA4CC" },
          nameGap: 25,
          //max: 60,
          type: "value",
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
        yAxis: {
          name: "含水率(%)",
          nameLocation: "center",
          nameTextStyle: { color: "#8FA4CC" },
          nameGap: 30,
          type: "value",
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
          splitLine: {
            show: false,
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },

        series: [],
      },
      //采出程度与含水率关系图
      relationship: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          confine: true,
        },
        legend: {
          left: 0,
          textStyle: {
            color: "#24DEFF",
          },
          data: [
            /*"Rm=10", "Rm=20", "Rm=40", "Rm=60", "Rm=80", "采出程度"*/
          ],
          itemGap: 5,
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "采出程度与含水率关系",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        xAxis: {
          name: "地质储量采出程度(%)",
          nameLocation: "center",
          nameTextStyle: { color: "#8FA4CC" },
          nameGap: 30,
          type: "value",
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
        yAxis: {
          name: "综合含水率(%)",
          nameLocation: "center",
          nameTextStyle: { color: "#8FA4CC" },
          nameGap: 30,
          type: "value",
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
          splitLine: {
            show: false,
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        color: ["#1379F7", "#FF5844", "#F5BE43", "#00BC9C", "#FF5844", "#DA835E", "#9A72FF", "#FF30AD", "#2ACAFF"],

        series: [],
      },
      //注采比
      injectionProductionRatio: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        dataZoom: {
          start: 0,
          type: "inside",
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "注采比",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        xAxis: {
          type: "category",
          axisLabel: {
            color: "#8FA4CC",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        yAxis: {
          name: "月度注采比",
          nameLocation: "center",
          nameTextStyle: { color: "#8FA4CC" },
          nameGap: 30,
          //min:90,
          max: 1.2,
          interval: 0.2,
          type: "value",
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
        color: ["#1379F7", "#FF5844", "#F5BE43", "#00BC9C", "#FF5844", "#DA835E", "#9A72FF", "#FF30AD", "#2ACAFF"],
        series: [
          {
            name: "注采比",
            data: [],
            type: "line",
            barWidth: "20",
            markLine: {
              symbol: "none",
              silent: false,
              data: [
                {
                  yAxis: 0.6,
                },
                {
                  yAxis: 1,
                },
              ],
              lineStyle: {
                color: "orange",
                type: "solid",
              },
            },
            showSymbol: false,
          },
        ],
      },
      //地层总压降
      totalFormationPressureDrop: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["合理地层压力", "压力保持水平"],
          left: 0,
          textStyle: {
            color: "#fff",
          },
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "地层总压降",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        xAxis: {
          type: "category",
          /*data: ["CEPI", "CEPJ", "WHPH", "WHPC"],*/
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
          type: "value",
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
            name: "压力保持水平",
            data: [
              /*7, 6, 7, 4, 5*/
            ],
            type: "bar",
            barWidth: "20",
            label: {
              show: true,
              position: "top",
              color: "#00D9EA",
            },
            /*symbol: "circle",*/
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
            markLine: {
              symbol: "none",
              silent: false,
              data: [
                {
                  yAxis: 0,
                },
              ],
              lineStyle: {
                color: "orange",
                type: "solid",
              },
            },
          },
        ],
      },
      //指标评价结果表
      tableData: [],
      //缓存权限数据
      myWidget: [],
      userInfo: {},
      //按钮权限组
      //添加记录
      canAddInfo: false,
      //修改数据
      canUpdateInfo: false,
      //发布数据
      canSendInfo: false,
      //删除数据
      canDeleteInfo: false,
      //下载数据
      canDownload: false,
      //上传数据
      canUpload: false,
    };
  },
  watch: {},
  created() {},
  mounted() {
    this.initData();
    //获取权限问题内容
    this.getPageAuthMessage();
  },
  methods: {
    /**
     *  hwh
     *  设置注采比的第一条标线
     */
    setFirstLine() {
      let number = this.lineStandOne;
      this.injectionProductionRatio.series[0].markLine.data[0].yAxis = number;
    },
    /**
     * hwh
     * 设置注采比的第二条标线
     */
    setSecondLine() {
      let number = this.lineStandTwo;
      this.injectionProductionRatio.series[0].markLine.data[1].yAxis = number;
    },
    /**
     * hwh
     * 地层总降压的标线
     */
    setThirdLine() {
      let number = this.lineStandThree;
      this.totalFormationPressureDrop.series[0].markLine.data[0].yAxis = number;
    },
    /**
     * hwh
     * 设置页面初始化
     * @returns {Promise<void>}
     */
    async initData() {
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
     * 搜索方法
     */
    doSearch() {
      this.getOutputSpeed(this.selectOilField, this.selectBlock);
      this.getOutputDegree(this.selectOilField, this.selectBlock);
      this.getOutputDegreeTongChart(this.selectOilField, this.selectBlock);
      this.getInjectionProRate(this.selectOilField, this.selectBlock);
      this.getGeneralPressure(this.selectOilField, this.selectBlock);
      this.getIndicatorEveluationResults(this.selectOilField, this.selectBlock);
    },

    /**
     *  hwh
     *  产能类 采油速度
     * @param oilFieldId 油田id
     * @param fieldId 区块id
     */
    getOutputSpeed(oilFieldId, fieldId) {
      let request = {
        oilFieldId: oilFieldId,
        fieldId: fieldId,
      };
      outputSpeed(request).then((res) => {
        console.log(res, "22222222222222222222222");
        if (res.data.code == 200) {
          let lineChart = res.data.data.chart.linearDataSets;
          let legendData = [];
          let seriesData = [];
          lineChart.forEach((item, index) => {
            legendData.push(item.label);
            seriesData.push(this.outputSpeedLine(item));
          });
          this.productionSpeed.legend.data = legendData;
          this.productionSpeed.series = seriesData;
        } else {
          let legendData = [];
          let seriesData = [];
          this.productionSpeed.legend.data = legendData;
          this.productionSpeed.series = seriesData;
        }
      });
    },

    /**
     *  hwh
     *  采出速度 折线解析
     * @param linearChart
     * @returns {{}}
     */
    outputSpeedLine(linearChart) {
      let series = {};
      series.type = "line";
      let seriesName = linearChart.label;
      series.name = seriesName;
      if (seriesName == "实际年采油速度") {
        series.yAxisIndex = 0;
      } else if (seriesName == "可采储量采油速度" || seriesName == "剩余可采储量采油速度") {
        series.yAxisIndex = 1;
      }
      let linearData = linearChart.linearData;
      let seriesData = [];
      linearData.forEach((item, index) => {
        let point = [];
        let label = item.label.split("-");
        point.push(label[0] + "-" + label[1]);
        point.push(item.value);
        seriesData.push(point);
      });
      series.data = seriesData;
      series.symbol = "none";
      return series;
    },
    /**
     *  hwh
     *  采出程度
     * @param oilFieldId 油田id
     * @param fieldId  区块id
     */
    getOutputDegree(oilFieldId, fieldId) {
      let request = {
        oilFieldId: oilFieldId,
        fieldId: fieldId,
      };
      outputDegree(request).then((res) => {
        if (res.data.code == 200) {
          let seriesData = [];
          let lineChart = res.data.data.chart.lineChartDataSets;
          lineChart.forEach((item, index) => {
            seriesData.push(this.outputDegreeLine(item));
          });
          this.recoveryDegree.series = seriesData;
        } else {
          let seriesData = [];
          this.recoveryDegree.series = seriesData;
        }
      });
    },
    /**
     *  hwh
     *  采出程度折线解析
     * @param lineChart
     * @returns {{}}
     */
    outputDegreeLine(lineChart) {
      let series = {};
      series.type = "scatter";
      series.symbolSize = 4;
      /* series.symbol = 'none';*/
      series.name = lineChart.label;
      series.label = {
        show: false,
        position: "top",
        color: "#00D9EA",
      };
      let seriesData = [];
      let lineData = lineChart.numberPoints;
      lineData.forEach((item, index) => {
        let point = [];
        point.push(item.x);
        point.push(item.y);
        seriesData.push(point);
      });
      series.data = seriesData;
      return series;
    },
    /**
     *  hwh
     *  采出程度与含水率关系图
     * @param oilFieldId 油田id
     * @param fieldId 区块id
     */
    getOutputDegreeTongChart(oilFieldId, fieldId) {
      let request = {
        oilFieldId: oilFieldId,
        fieldId: fieldId,
      };
      let legendData = [];
      let seriesData = [];
      outputDegree(request).then((res) => {
        if (res.data.code == 200) {
          let lineChart = res.data.data.chart.lineChartDataSets;
          lineChart.forEach((item, index) => {
            legendData.push(item.label);
            seriesData.push(this.outputDegreeLine(item));
          });
        } else {
          legendData = [];
          seriesData = [];
        }
      });

      outputDegreeTongChart(request).then((res) => {
        if (res.data.code == 200) {
          let lineChart = res.data.data.chart.lineChartDataSets;
          lineChart.forEach((item, index) => {
            legendData.push("Rm=" + item.label);
            seriesData.push(this.outputDegreeTongChart(item));
          });
        } else {
          legendData = [];
          seriesData = [];
        }
      });
      this.relationship.legend.data = legendData;
      this.relationship.series = seriesData;
    },
    /**
     *  hwh
     *  采出程度童氏图折线解析
     * @param lineChart
     * @returns {{}}
     */
    outputDegreeTongChart(lineChart) {
      let series = {};
      series.name = "Rm=" + lineChart.label;
      series.type = "line";
      series.symbol = "none";
      /* series.symbolSize=3;*/
      series.smooth = true;
      let seriesData = [];
      let lineData = lineChart.numberPoints;
      lineData.forEach((item, index) => {
        let point = [];
        point.push(item.x);
        point.push(item.y);
        seriesData.push(point);
      });
      series.data = seriesData;
      return series;
    },
    /**
     * hwh
     *  注采比
     * @param oilFieldId 油田id
     * @param fieldId 区块id
     */
    getInjectionProRate(oilFieldId, fieldId) {
      let request = {
        oilFieldId: oilFieldId,
        fieldId: fieldId,
      };
      injectionProRate(request).then((res) => {
        if (res.data.code == 200) {
          let linearChart = res.data.data.chart.linearDataSets[0].linearData;
          let seriesData = [];
          linearChart.forEach((item, index) => {
            let point = [];
            let xData = "";
            let label = item.label.split("-");
            xData = label[0] + "-" + label[1];
            point.push(xData);
            point.push(item.value);
            seriesData.push(point);
          });
          this.injectionProductionRatio.series[0].data = seriesData;
        } else {
          let seriesData = [];
          this.injectionProductionRatio.series[0].data = seriesData;
        }
      });
    },
    /**
     *  hwh
     *  地层总压降
     * @param oilFieldId
     * @param fieldId
     */
    getGeneralPressure(oilFieldId, fieldId) {
      let request = {
        oilFieldId: oilFieldId,
        fieldId: fieldId,
      };
      generalPressure(request).then((res) => {
        if (res.data.code == 200) {
          let barChart = res.data.data.chart.barDataSets[0].barDatas;
          let seriesData = [];
          barChart.forEach((item, index) => {
            let point = [];
            point.push(item.label.substring(0, 4));
            point.push(item.value);
            seriesData.push(point);
          });
          this.totalFormationPressureDrop.series[0].data = seriesData;
        } else {
          let seriesData = [];
          this.totalFormationPressureDrop.series[0].data = seriesData;
        }
      });
    },
    /**
     * hwh
     * 指标评价结果
     * @param oilFieldId
     * @param fieldId
     */
    getIndicatorEveluationResults(oilFieldId, fieldId) {
      var request = {
        oilFieldId: oilFieldId,
        fieldId: fieldId,
      };
      indicatorEveluationResults(request).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.indicatorEvaluationResults;
        } else {
          this.tableData = [];
        }
      });
    },
    /**
     * hwh
     * 获取当前页面的权限内容，并处理其逻辑问题
     */
    getPageAuthMessage() {
      this.downPower(false);
      let myPath = this.$route.path;
      //该值可以为空
      let areaCode = "znytglxt";
      let loginName = this.userInfo.userName;
      getWidgetByAreaUser({ areaCode: areaCode, loginName: loginName }).then((res) => {
        let myList = res.data.dataList;
        if (myList) {
          let pageMes = myList.find((item) => {
            return item.resPvalue == myPath;
          });
          if (pageMes) {
            this.myWidget = pageMes.widgetList;
          }
          if (this.myWidget) {
            for (let indexNum in this.myWidget) {
              try {
                let myWidgetItem = this.myWidget[indexNum];
                switch (myWidgetItem.widgetCode) {
                  case "addInfo":
                    this.canAddInfo = true;
                    break;
                  case "updateInfo":
                    this.canUpdateInfo = true;
                    break;
                  case "sendInfo":
                    this.canSendInfo = true;
                    break;
                  case "deleteInfo":
                    this.canDeleteInfo = true;
                    break;
                  case "download":
                    {
                      this.canDownload = true;
                      this.downPower(this.canDownload);
                    }
                    break;
                  case "upload":
                    this.canUpload = true;
                    break;
                  default:
                }
              } catch (e) {
                continue;
              }
            }
          }
        }
      });
    },
    /**
     * 下载echarts 隐藏 显示
     * @param flag
     */
    downPower(flag) {
      this.productionSpeed.toolbox.show = flag;
      this.recoveryDegree.toolbox.show = flag;
      this.relationship.toolbox.show = flag;
      this.injectionProductionRatio.toolbox.show = flag;
      this.totalFormationPressureDrop.toolbox.show = flag;
    },
  },
};
</script>
<style lang="scss" scoped>
.el-header {
  padding: 0px 0px 0px 0px;
}
.g-w10 {
  text-align: center;
}
.Dui {
  .f2 {
    padding-left: 10px;
  }
}
::v-deep .el-card__body,
.el-main {
  padding: 0;
}
::v-deep .jia {
  margin-left: 20px;
}
.infoZhu {
  ::v-deep .el-input-number {
    padding-left: 10px;
  }
}
.formBox {
  & > div:not(:first-child) {
    margin-left: 20px;
  }
}

::v-deep .el-radio-button__inner {
  background-color: #031527;
  color: #02c8d3;
  border: 1px solid #00cbdd;
}
.py-5 {
  display: flex;
  justify-content: space-between;
}
.basicTable {
  height: auto;
}

.el-card {
  border-image: linear-gradient(90deg, rgba(116, 190, 243, 0), rgba(75, 241, 255, 0.5), rgba(116, 190, 243, 0)) 1 1;
  color: #00d6ea;
  font-weight: bold;
  background: rgba(143, 164, 204, 0.16);

  ::v-deep .el-card__body {
    padding: 0;
    line-height: 40px;
  }
}
::v-deep .el-table .cell:empty::before {
  content: "-";
}

::v-deep .el-radio-button:first-child .el-radio-button__inner {
  border: 1px solid #00d6ea;
}
.QU {
  padding-left: 10px;
}
</style>
