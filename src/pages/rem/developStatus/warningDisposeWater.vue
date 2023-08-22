<!-- 水井 -->
<template>
  <el-container class="layout">
    <el-header height="auto">
      <div class="titleBox">
        <header-search style="height: 60px" class="Header">
          <span class="title">油田预警处理</span>
          <el-button type="primary" class="buttonActive_primary" @click="switchToBack"> 返回 </el-button>
        </header-search>
      </div>
    </el-header>
    <el-container>
      <el-header>
        <el-row style="margin-top: 15px">
          <div style="text-align: center; color: #24deff; font-size: 18px">
            <span>预警处理界面</span>
          </div>
          <div style="float: right; color: #24deff; font-size: 14px">
            <span>预警原因：{{ $route.query.warningType }}</span>
            <br />
            <span>时间：{{ $route.query.theDate }} &nbsp;&nbsp; 处理人：{{ $route.query.handler }}</span>
          </div>
        </el-row>
      </el-header>
      <el-main>
        <el-row :gutter="20" style="height: 80%">
          <el-col span="12" style="height: 100%">
            <page-panel-new style="height: 100%" :show-btn="true">
              <div>
                <Echart :chart-data="lineTable" height="583px"></Echart>
              </div>
            </page-panel-new>
          </el-col>
          <el-col span="12" style="height: 100%; margin-top: 10px">
            <page-panel-new
              style="height: 100%"
              :show-btn="true"
              title="QHD32-6油田指标预警关联分析"
              class="m1"
              height="100%"
            >
              <el-row>
                <span>水井指标变化排名</span>
                <el-table id="tableData" style="margin-top: 10px" :data="tableDataWater" highlight height="550px">
                  <el-table-column type="index" label="序号" width="60px" align="center"></el-table-column>
                  <el-table-column prop="borepipeId" label="井号" min-width="120px" align="center"></el-table-column>
                  <el-table-column prop="injDaysMonthly" :label="`月注入天数\n(d)`" align="center"></el-table-column>
                  <el-table-column prop="injMonthly" :label="`月注入变化量\n(10⁴m³)`" align="center" :formatter="toPrecise4"></el-table-column>
                  <el-table-column prop="whInjPress" :label="`井口注入压力\n(MPa)`" align="center" :formatter="toPrecise2"></el-table-column>
                </el-table>
              </el-row>
            </page-panel-new>
          </el-col>
        </el-row>
        <el-row style="height: 20%">
          <page-panel-new style="height: 100%" :show-btn="true">
            <el-row>
              <el-input
                v-model="textarea"
                type="textarea"
                placeholder="最新意见及结论"
                :autosize="{ minRows: 4, maxRows: 6 }"
                style="height: 100%"
              >
              </el-input>
            </el-row>
            <div style="margin-top: 20px" class="displat">
              <el-button type="primary" @click="save()" style="margin-left: 20px">保存</el-button>
              <el-button type="primary" class="buttonActive_primary" @click="addWarning()">加入观察室</el-button>
              <el-button type="primary" class="buttonActive_primary" @click="delWarning()">关闭预警</el-button>
            </div>
          </page-panel-new>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>
  <script>
import { Message } from "element-ui";
import Echart from "@/components/tools/Echarts/index.vue";
import { fetchOilFields, fetchFields } from "@/api/oilDeposit/rem-02/primaryinfo.js";
import {
  proWellIndicatorWarningAssosiationAnalysisForInjectionWell,
  proWellIndicatorWarningAssosiationAnalysisForProWell,
  oilFieldOutputVaryChart,
  proWellIndicatorWarningAssosiationAnalysisClose,
  proWellIndicatorWarningAssosiationAnalysisSave,
  proWellIndicatorWarningAssosiationAnalysisToObserve,
} from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";

export default {
  components: {
    Echart,
  },
  props: {
    fieldId: {
      type: String,
      default: "",
    },
    beginDate: {
      type: String,
      default: "",
    },
  },
  filters: {
    //表格数据为空值修改为'-'
    isNullTableNumber(val) {
      if (val == null) {
        return "-";
      } else {
        return val;
      }
    },
  },
  data() {
    return {
      //hwh 修改
      oilFieldId: "3FC9A818F5BC43B88270DB80BBB3018F",
      eee: "",
      value1: "",
      page: 1,
      pageSize: 10,
      switchNumber: "",
      oilField: [],
      block: "",
      selectBlock: "",
      warning: "",
      input: "",
      textarea: "",
      selectOilField: "",
      fields: "",
      fieldsData: [
        {
          name: "秦皇岛32-6",
          value: "秦皇岛32-6",
        },
      ],
      blocks: [
        {
          name: "南区",
          value: "南区",
        },
        {
          name: "北区",
          value: "北区",
        },
      ],
      deviceList: [
        {
          name: "Defoamer BHX-1410",
          value: "Defoamer BHX-1410",
        },
        {
          name: "Water Clarifier BHQ-08",
          value: "Water Clarifier BHQ-08",
        },
      ],
      //预警信息
      tableDataOil: [],
      tableDataWater: [],
      // TODO lv 页面没有使用，代码检查错误先注释
      // pickerOptions: {
      //   disabledDate(time) {
      //     let curDate = new Date().toString(); // 当前时间戳转为字符串
      //     let curDateYear = new Date().getFullYear(); // 当前时间的年份
      //     let oneYearAgoDate = curDate.replace(curDateYear, curDateYear - 1); // 字符串年份替换为一年前
      //     let oneYear = new Date(oneYearAgoDate).getTime(); //一年前字符串转为时间戳
      //     return time.getTime() > Date.now() || time.getTime() < oneYear;
      //   },
      // },
      //表格数据
      messageResult: [
        {
          message: "产液量：持续上升，上升速度为50m3/day",
        },
        {
          message: "产油量：",
        },
        {
          message: "含水率：",
        },
        {
          message: "含水上升率：",
        },
        {
          message: "总递减率：",
        },
      ],
      //折线图
      lineTable: {
        tooltip: {
          trigger: "axis",
          //限定tooltip在折线图范围内
          axisPointer: {
            snap: true,
            type: "shadow",
          },
          confine: true,
          //提示框浮层内边距，单位px，默认各方向内边距为10
          padding: 10,
          formatter: function (param) {
            //排序重点，为了固定当前数据展示位置。
            param.sort(function (a, b) {
              return a.seriesIndex - b.seriesIndex;
            });
            //返回结果
            let res = "";
            //定义索引
            let isAxisIndex = 0;
            //日期时间拼接
            res = res + param[0].axisValue + "<br>";
            //循环拼接数据
            for (let i = 0; i < param.length; i++) {
              let val = param[i];
              if (val.axisIndex != isAxisIndex) {
                isAxisIndex = val.axisIndex;
                res = res + "<br>";
              }
              res = res + val.marker + val.seriesName + ":" + val.value + "<br>";
            }
            return res;
          },
        },
        grid: [
          { x: "8%", y: "4%", width: "90%", height: "18%" },
          { x: "8%", y: "22%", width: "90%", height: "18%" },
          { x: "8%", y: "40%", width: "90%", height: "18%" },
          { x: "8%", y: "58%", width: "90%", height: "18%" },
          { x: "8%", y: "76%", width: "90%", height: "18%" },
        ],
        axisPointer: {
          link: {
            xAxisIndex: "all",
            yAxisIndex: "all",
          },
        },
        xAxis: [
          {
            gridIndex: 0,
            type: "category",
            data: [],
            textStyle: {
              fontSize: 14,
            },
            axisLabel: {
              show: false,
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
          {
            gridIndex: 1,
            data: [],
            type: "category",
            axisLabel: {
              show: false,
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
          {
            type: "category",
            gridIndex: 2,
            data: [],
            axisLabel: {
              show: false,
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
          {
            type: "category",
            gridIndex: 3,
            data: [],
            axisLabel: {
              show: false,
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
          {
            type: "category",
            gridIndex: 4,
            data: [],
            axisLabel: {
              color: "#8FA4CC",
              textStyle: {
                fontSize: 14,
              },
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
        ],
        yAxis: [
          {
            gridIndex: 0,
            name: "月产液（10⁴m³）",
            nameLocation: "center",
            nameRotate: 90,
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            axisLabel: {
              show: false,
              color: "#8FA4CC",
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#979797",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.16)",
                type: "dashed",
              },
            },
          },
          {
            gridIndex: 1,
            name: "产油量（10⁴m³）",
            nameLocation: "center",
            nameRotate: 90,
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            axisLabel: {
              show: false,
              color: "#8FA4CC",
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#979797",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.16)",
                type: "dashed",
              },
            },
          },
          {
            gridIndex: 2,
            name: "含水率（%）",
            nameLocation: "center",
            nameRotate: 90,
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            axisLabel: {
              show: false,
              color: "#8FA4CC",
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#979797",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.16)",
                type: "dashed",
              },
            },
          },
          {
            gridIndex: 3,
            name: "注采比（%）",
            nameLocation: "center",
            nameRotate: 90,
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            axisLabel: {
              show: false,
              color: "#8FA4CC",
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#979797",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.16)",
                type: "dashed",
              },
            },
          },
          {
            gridIndex: 4,
            name: "总递减率（%）",
            nameLocation: "center",
            nameRotate: 90,
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            axisLabel: {
              show: false,
              color: "#8FA4CC",
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#979797",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.16)",
                type: "dashed",
              },
            },
          },
        ],
        series: [
          {
            name: "产液量",
            type: "line",
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: [],
            label: {
              show: true,
              color: "#fff",
              fontSize: 14,
            },
            lineStyle: {
              color: "#00BC9C",
            },
            symbol: "circle",
            symbolSize: 5,
            itemStyle: {
              color: "#00BC9C",
              borderColor: "rgba(255,255,255,0.32)",
              borderWidth: 2,
              borderType: "solid",
            },
          },
          {
            name: "产油量",
            type: "line",
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: [],
            label: {
              show: true,
              color: "#fff",
              fontSize: 14,
            },
            lineStyle: {
              color: "#FF7135",
            },
            symbol: "circle",
            symbolSize: 5,
            itemStyle: {
              color: "#FF7135",
              borderColor: "rgba(255,255,255,0.32)",
              borderWidth: 2,
              borderType: "solid",
            },
          },
          {
            name: "含水率",
            type: "line",
            xAxisIndex: 2,
            yAxisIndex: 2,
            data: [],
            label: {
              show: true,
              color: "#fff",
              fontSize: 14,
            },
            lineStyle: {
              color: "#24DEFF",
            },
            symbol: "circle",
            symbolSize: 5,
            itemStyle: {
              color: "#24DEFF",
              borderColor: "rgba(255,255,255,0.32)",
              borderWidth: 2,
              borderType: "solid",
            },
          },
          {
            name: "注采比",
            type: "line",
            xAxisIndex: 3,
            yAxisIndex: 3,
            data: [],
            label: {
              show: true,
              color: "#fff",
              fontSize: 14,
            },
            lineStyle: {
              color: "#FF7135",
            },
            symbol: "circle",
            symbolSize: 5,
            itemStyle: {
              color: "#FF7135",
              borderColor: "rgba(255,255,255,0.32)",
              borderWidth: 2,
              borderType: "solid",
            },
          },
          {
            name: "总递减率",
            type: "line",
            xAxisIndex: 4,
            yAxisIndex: 4,
            data: [],
            label: {
              show: true,
              color: "#fff",
              fontSize: 14,
            },
            lineStyle: {
              color: "#FF7135",
            },
            symbol: "circle",
            symbolSize: 5,
            itemStyle: {
              color: "#FF7135",
              borderColor: "rgba(255,255,255,0.32)",
              borderWidth: 2,
              borderType: "solid",
            },
          },
        ],
      },
      ycglKfyj: false,
      //用户信息
      userInfo: {},
    };
  },
  //初始化数据
  mounted: function () {
    this.ycglKfyj = this.$route.query.ycglKfyj;
    this.textarea = this.$route.query.opinion;
    let warningTypeCode = this.$route.query.warningCode;
    let theDate = this.$route.query.theDate;
    let oilfieldId = this.$route.query.oilfieldId;

    if (oilfieldId) {
      this.oilFieldId = oilfieldId;
    }
    // this.selectOilField="E57E55ABF19D4F199F8EB070DA4AA7";
    //F35E226D47CE4B09B497B852D774D122
    //折线图
    this.charts("", this.oilFieldId, theDate);
    //获取水井组数据
    this.injectionWellData(warningTypeCode, theDate);
    //获取油井组数据
    this.proWellData(warningTypeCode, theDate);
    // this.injectionWellData(this.$route.query.warningTypeCode)
  },
  //方法
  methods: {
    //获取水井组数据
    injectionWellData(warningTypeCode, endDate) {
      let queryParams = {
        beginDate: "",
        endDate: endDate,
        fieldId: "",
        oilFieldId: this.oilFieldId,
        warningTypeCode: warningTypeCode,
      };
      proWellIndicatorWarningAssosiationAnalysisForInjectionWell(queryParams).then((data) => {
        let rows = data.data.data.wellGroupForInjectionWells;
        console.log(rows);
        this.tableDataWater = rows;
      });
    },
    //获取油井数据
    proWellData(warningTypeCode, endDate) {
      let queryParams = {
        beginDate: "",
        endDate: endDate,
        fieldId: "",
        oilFieldId: this.oilFieldId,
        warningTypeCode: warningTypeCode,
      };
      proWellIndicatorWarningAssosiationAnalysisForProWell(queryParams).then((data) => {
        let rows = data.data.data.wellGroupForProWells;
        this.tableDataOil = rows;
      });
    },
    //折线图
    charts(fieldId, oilFieldId, endDate) {
      let queryParams = {
        beginDate: "",
        endDate: endDate,
        fieldId: fieldId,
        oilFieldId: oilFieldId,
        warningTypeCode: this.$route.query.warningCode,
      };
      oilFieldOutputVaryChart(queryParams).then((data) => {
        console.log(data, "12121212");
        //产液
        let liquidChart = data.data.data.charts[0].linearDataSets[0];
        console.log(liquidChart);
        //产油
        let oilChart = data.data.data.charts[1].linearDataSets[0];
        //含水率
        let waterCutChart = data.data.data.charts[2].linearDataSets[0];
        //注采比
        let zcbChart = data.data.data.charts[3].linearDataSets[0];
        //递减率
        let djlChart = data.data.data.charts[4].linearDataSets[0];

        //找到的对应的方法-产液率
        this.liquidChart(liquidChart);
        //产油率
        this.oilChart(oilChart);
        //含水率
        this.waterCutChart(waterCutChart);
        //注采比
        this.zcbChart(zcbChart);
        //递减率
        this.djlChart(djlChart);
      });
    },
    //折线图-产液
    liquidChart(liquidChart) {
      let list = liquidChart.linearData;
      let x = [];
      let y = [];
      console.log(list);
      list.forEach((ent, index) => {
        x.push(ent.label.substring(0, 7));
        y.push(ent.value);
      });
      // console.log(x)
      this.lineTable.series[0].data = y;
      this.lineTable.xAxis[0].data = x;
    },
    //折线图-产油
    oilChart(oilChart) {
      let list = oilChart.linearData;
      let x = [];
      let y = [];
      list.forEach((ent, index) => {
        x.push(ent.label.substring(0, 7));
        y.push(ent.value);
      });
      this.lineTable.series[1].data = y;
      this.lineTable.xAxis[1].data = x;
    },
    //折线图-含水
    waterCutChart(waterCutChart) {
      let list = waterCutChart.linearData;
      let x = [];
      let y = [];
      list.forEach((ent, index) => {
        x.push(ent.label.substring(0, 7));
        y.push(ent.value);
      });
      this.lineTable.series[2].data = y;
      this.lineTable.xAxis[2].data = x;
    },
    //折线图-注采比
    zcbChart(zcbChart) {
      let list = zcbChart.linearData;
      let x = [];
      let y = [];
      list.forEach((ent, index) => {
        x.push(ent.label.substring(0, 7));
        y.push(ent.value);
      });
      this.lineTable.series[3].data = y;
      this.lineTable.xAxis[3].data = x;
    },
    //折线图-注采比
    djlChart(djlChart) {
      let list = djlChart.linearData;
      let x = [];
      let y = [];
      list.forEach((ent, index) => {
        x.push(ent.label.substring(0, 7));
        y.push(ent.value);
      });
      this.lineTable.series[4].data = y;
      this.lineTable.xAxis[4].data = x;
    },
    //获取油田信息
    getOilFields() {
      let _this = this;
      fetchOilFields().then((res) => {
        //获得详细信息
        let data = res.data.data;
        //获取油田信息
        _this.oilField = data.oilFields;
        //选择油田默认选中第一个
        _this.selectOilField = _this.oilField[0].oilFieldId;
      });
    },
    //获得区块信息
    getFieldsData(oilFieldId) {
      let request = { oilFieldId: oilFieldId };
      let _this = this;
      fetchFields(request).then((res) => {
        // 获得数据
        let data = res.data.data.fields;
        //获得区块信息
        _this.block = data;
        //默认选中第一个区块信息
        _this.selectBlock = _this.block[0].fieldId;
      });
    },
    //保存功能
    save() {
      let request = { id: this.$route.query.id, opinion: this.textarea };
      proWellIndicatorWarningAssosiationAnalysisSave(request).then((res) => {
        Message({
          showClose: true,
          message: "保存成功",
          type: "success",
        });
        this.textarea = "";
      });
    },
    //加入观察室
    addWarning() {
      let request = { id: this.$route.query.id, opinion: this.textarea };
      proWellIndicatorWarningAssosiationAnalysisToObserve(request).then((res) => {
        Message({
          showClose: true,
          message: "加入观察室成功",
          type: "success",
        });
      });
      this.textarea = "";
    },
    //关闭预警
    delWarning() {
      let request = { id: this.$route.query.id, opinion: this.textarea };
      proWellIndicatorWarningAssosiationAnalysisClose(request).then((res) => {
        Message({
          showClose: true,
          message: "关闭预警成功",
          type: "success",
        });
      });
      this.textarea = "";
    },
    /**
     *返回上一级
     */
    switchToBack() {
      this.$router.go(-1);
    },
    // 表格格式化方法 - 数值只保留两位小数
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
    // 表格格式化方法 - 数值只保留四位小数
    toPrecise4(row, column) {
      if (
          (row[column.property] || parseFloat(row[column.property]) === 0) &&
          typeof parseFloat(row[column.property]) === "number"
      ) {
          return parseFloat(row[column.property]) || parseFloat(row[column.property]) === 0
          ? parseFloat(row[column.property]).toFixed(4)
          : "0";
      } else {
          return row[column.property] ? row[column.property] : "-";
      }
    },
  },
};
</script>
  <style lang="scss" scoped>
.fl {
  margin-left: 10px;
}

.m1 {
  margin-top: 10px;
}

.roundButton {
  margin-left: 10px;
  width: 80px;
  height: 25px;
  font-size: 12px;
}

.hrefSpan {
  color: #24deff;
}

.Header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.displat {
  display: flex;
  flex-direction: row-reverse;
}
</style>
  