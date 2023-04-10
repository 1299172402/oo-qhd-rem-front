<!--产量形式预测-作业公司产量跟踪 -->
<template>
  <div class="app-container">
    <headerSearch class="g-w100 g-h100" style="height: auto; width: 100%">
      <el-form :inline="true" style="margin-top: 18px; width: 100%">
        <el-form-item label="日期：" prop="noticeContent">
          <el-date-picker value-format="yyyy-MM" v-model="queryData.queryDate" type="month" placeholder="选择月">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="产量单位选择：" prop="createBy">
          <el-select v-model="queryData.selectUnitOfProduction" placeholder="请选择" style="width: 120px" class="f1">
            <el-option v-for="item in unitOfProduction" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchinfo" icon="el-icon-search">检索</el-button>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="primary" icon="el-icon-download" @click="doDownExcel()">下载</el-button>
        </el-form-item>
      </el-form>
    </headerSearch>
    <pagePanel headerTitle="作业公司产量跟踪" style="height: 650px">
      <el-table :data="outputTrackingTableData" highlight style="width: 100%" height="calc(100% - 30px)">
        <el-table-column
          fixed
          style="overflow-x: hidden"
          prop="type"
          :label="outputTrackingTableDate"
          align="center"
          width="300"
        >
        </el-table-column>
        <!-- // 'QHD32-6', 'QHD33-1', 'NB35-2', 'QHD33-1S', 'CFD6-4', 'BZ3-2' -->
        <el-table-column label="作业公司" align="center">
          <el-table-column prop="zygsjc" label="基础" align="center" width="100"> </el-table-column>
          <el-table-column prop="zygscs" label="措施" align="center" width="100"> </el-table-column>
          <el-table-column prop="zygstz" label="调整井" align="center" width="100"> </el-table-column>
          <el-table-column prop="zygskf" label="开发井" align="center" width="100"> </el-table-column>
          <el-table-column prop="zygshj" label="合计" align="center" width="100"> </el-table-column>
        </el-table-column>
        <el-table-column label="CFD6-4" align="center">
          <el-table-column prop="cfd64jc" label="基础" align="center" width="100"> </el-table-column>
          <el-table-column prop="cfd64cs" label="措施" align="center" width="100"> </el-table-column>
          <el-table-column prop="cfd64tz" label="调整井" align="center" width="100"> </el-table-column>
          <el-table-column prop="cfd64hj" label="合计" align="center" width="100"> </el-table-column>
        </el-table-column>
        <el-table-column label="NB35-2" align="center">
          <el-table-column prop="nb352jc" label="基础" align="center" width="100"> </el-table-column>
          <el-table-column prop="nb352cs" label="措施" align="center" width="100"> </el-table-column>
          <el-table-column prop="nb352tz" label="调整井" align="center" width="100"> </el-table-column>
          <el-table-column prop="nb352hj" label="合计" align="center" width="100"> </el-table-column>
        </el-table-column>
        <el-table-column label="BZ3-2" align="center">
          <el-table-column prop="bz32jc" label="基础" align="center" width="100"> </el-table-column>
          <el-table-column prop="bz32cs" label="措施" align="center" width="100"> </el-table-column>
          <el-table-column prop="bz32tz" label="调整井" align="center" width="100"> </el-table-column>
          <el-table-column prop="bz32hj" label="合计" align="center" width="100"> </el-table-column>
        </el-table-column>
        <el-table-column label="QHD33-1" align="center">
          <el-table-column prop="qhd331jc" label="基础" align="center" width="100"> </el-table-column>
          <el-table-column prop="qhd331cs" label="措施" align="center" width="100"> </el-table-column>
          <el-table-column prop="qhd331tz" label="调整井" align="center" width="100"> </el-table-column>
          <el-table-column prop="qhd331kf" label="开发井" align="center" width="100"> </el-table-column>
          <el-table-column prop="qhd331hj" label="合计" align="center" width="100"> </el-table-column>
        </el-table-column>
        <el-table-column label="QHD33-1S" align="center">
          <el-table-column prop="qhd331sjc" label="基础" align="center" width="100"> </el-table-column>
          <el-table-column prop="qhd331scs" label="措施" align="center" width="100"> </el-table-column>
          <el-table-column prop="qhd331stj" label="调整井" align="center" width="100"> </el-table-column>
          <el-table-column prop="qhd331shj" label="合计" align="center" width="100"> </el-table-column>
        </el-table-column>
      </el-table>
    </pagePanel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noticeList: [],
      unitOfProduction: [],
      queryData: {
        queryDate: new Date().addDays(-1).format("yyyy-MM-dd"),
        selectUnitOfProduction: "",
      },
      outputTrackingTableData: [],
      unitOfProduction: [
        {
          label: "m³",
          value: "m",
        },
        {
          label: "t",
          value: "t",
        },
      ],
      outputTrackingTableDate: "",
      allOutputTrackingTableData: [
        { type: "报表产量/", code: "baoBiao" },
        { type: "前一日报表产量/", code: "baoBiaoYesterday" },
        { type: "滚动预测/", code: "yuCe" },
        // {"type": '滚动预测(奋斗)/', code: '滚动预测(奋斗)/'},
        { type: "分公司奋斗/", code: "fenDou" },
        { type: "分公司考核/", code: "kaoHe" },
        { type: "报表产量-滚动预测产量", code: "baoBiaoYuCeDiff" },
        { type: "当日-前一日产量", code: "当日-前一日产量" },
        { type: "下舱产量/", code: "下舱产量/" },
        { type: "前一日下舱产量/", code: "前一日下舱产量/" },
        { type: "下舱产量-滚动预测(/", code: "下舱产量-滚动预测(/" },
        { type: "下舱产量-滚动预测奋斗(/", code: "下舱产量-滚动预测奋斗(/" },
        { type: "下舱产量-分公司奋斗", code: "下舱产量-分公司奋斗" },
        { type: "下舱产量-分公司考核", code: "下舱产量-分公司考核" },
      ],
    };
  },
  created() {
    let matrixData = this.originData.map((row) => {
      let arr = [];
      for (let key in row) {
        arr.push(row[key]);
      }
      return arr;
    });
    this.transData = matrixData[0].map((col, i) => {
      return [
        this.originTitle[i],
        ...matrixData.map((row) => {
          return row[i];
        }),
      ];
    });
  },
  methods: {
    searchinfo() {},
    doDownExcel() {},
    queryOutputTrackingTableData() {
      let queryParams = {
        date: this.outputTrackingForm.queryDate,
        unitType: this.outputTrackingForm.selectUnitOfProduction,
      };
      console.log();
      queryOutputTraccking(queryParams).then((data) => {
        console.log("data==>", data);
        if (data.data.msg == "success") {
          this.outputTrackingTableData = this.dealOutputTrackingData(data.data.data);
          this.outputTrackingTableDate = this.outputTrackingForm.queryDate;
        } else {
          this.$message({ showClose: true, message: "作业公司产量跟踪数据获取失败！", type: "error" });
        }
        //this.outputTrackingTableDate = outputTrackingForm.queryDate
        //this.outputTrackingTableDate = data.data.data;
      });
    },
    dealOutputTrackingData(objData) {
      // objData = {"code":0,"msg":"success","data":{"baoBiao":{"QHD32-6":{"tiaoZheng":33.17,"cuoShi":34.42,"jiChu":5779.14},"BZ19-4":{"tiaoZheng":407.1,"jiChu":2830.8},"BZ25-1S":{"jiChu":3441.85},"BZ25-1":{"jiChu":820.35}},"kaoHe":{"QHD32-6":{"tiaoZheng":73.88,"cuoShi":0.0,"jiChu":5538.46},"BZ19-4":{"tiaoZheng":171.91,"cuoShi":0.0,"jiChu":3003.72},"BZ25-1S":{"tiaoZheng":0.0,"cuoShi":0.0,"jiChu":3425.32},"BZ25-1":{"tiaoZheng":0.0,"cuoShi":0.0,"jiChu":860.07}},"fenDou":{"QHD32-6":{"tiaoZheng":73.85,"cuoShi":0.0,"jiChu":5587.15},"BZ19-4":{"tiaoZheng":171.91,"cuoShi":0.0,"jiChu":3003.72},"BZ25-1S":{"tiaoZheng":0.0,"cuoShi":0.0,"jiChu":3425.32},"BZ25-1":{"tiaoZheng":0.0,"cuoShi":0.0,"jiChu":860.07}},"yuCe":{"QHD32-6":{"tiaoZheng":58.92,"cuoShi":44.69,"jiChu":5661.85},"BZ19-4":{"tiaoZheng":171.19,"cuoShi":0.0,"jiChu":3028.01},"BZ25-1S":{"tiaoZheng":0.0,"cuoShi":0.0,"jiChu":3358.79},"BZ25-1":{"tiaoZheng":0.0,"cuoShi":0.0,"jiChu":823.83}},"baoBiaoYesterday":{"QHD32-6":{"tiaoZheng":33.76,"cuoShi":34.61,"jiChu":5776.81},"BZ19-4":{"tiaoZheng":417.12,"jiChu":2826.18},"BZ25-1S":{"jiChu":3442.51},"BZ25-1":{"jiChu":819.59}},"kaoHeYesterday":{"QHD32-6":{"tiaoZheng":73.88,"cuoShi":0.0,"jiChu":5541.13},"BZ19-4":{"tiaoZheng":172.13,"cuoShi":0.0,"jiChu":3005.04},"BZ25-1S":{"tiaoZheng":0.0,"cuoShi":0.0,"jiChu":3426.38},"BZ25-1":{"tiaoZheng":0.0,"cuoShi":0.0,"jiChu":860.51}},"fenDouYesterday":{"QHD32-6":{"tiaoZheng":73.86,"cuoShi":0.0,"jiChu":5589.85},"BZ19-4":{"tiaoZheng":172.13,"cuoShi":0.0,"jiChu":3005.04},"BZ25-1S":{"tiaoZheng":0.0,"cuoShi":0.0,"jiChu":3426.38},"BZ25-1":{"tiaoZheng":0.0,"cuoShi":0.0,"jiChu":860.51}},"yuCeYesterday":{"QHD32-6":{"tiaoZheng":23.95,"cuoShi":44.72,"jiChu":5664.54},"BZ19-4":{"tiaoZheng":171.43,"cuoShi":0.0,"jiChu":3029.49},"BZ25-1S":{"tiaoZheng":0.0,"cuoShi":0.0,"jiChu":3360.39},"BZ25-1":{"tiaoZheng":0.0,"cuoShi":0.0,"jiChu":824.27}},"baoBiaoYuCeDiff":{"BZ25-1":{"jiChu":-3.48},"BZ19-4":{"tiaoZheng":235.91,"jiChu":-197.21},"BZ25-1S":{"jiChu":83.06},"QHD32-6":{"cuoShi":-10.27,"tiaoZheng":-25.75,"jiChu":117.29}}}};
      // objData = objData.data;
      var reList = [];
      var keys = Object.keys(objData);
      /*for (var i = 0; i < keys.length; i++) {
          var item = keys[i];
      }*/
      if (keys == null || keys.length == 0) {
        return reList;
      }

      keys.forEach((item, index) => {
        var lineTitle = this.dealLineTitle(item);
        if (lineTitle != null && lineTitle != "") {
          let obj_keys = Object.keys(objData[item]);

          this.oilFieldData.forEach((wellName) => {
            if (undefined != objData[item] && undefined != objData[item][wellName]) {
              if (undefined == objData[item][wellName].jiChu) {
                objData[item][wellName].jiChu = 0;
              }
              if (undefined == objData[item][wellName].cuoShi) {
                objData[item][wellName].cuoShi = 0;
              }
              if (undefined == objData[item][wellName].tiaoZheng) {
                objData[item][wellName].tiaoZheng = 0;
              }
              if (undefined == objData[item][wellName].kaiFa) {
                objData[item][wellName].kaiFa = 0;
              }
              if (undefined == objData[item][wellName].heJi) {
                objData[item][wellName].heJi = parseFloat(
                  parseFloat(objData[item][wellName].jiChu) +
                    parseFloat(objData[item][wellName].cuoShi) +
                    parseFloat(objData[item][wellName].tiaoZheng),
                ).toFixed(2);
              }
            } else {
              objData[item][wellName] = {};
            }
          });
        }
      });
      keys.forEach((item, index) => {
        let lineTitle = this.dealLineTitle(item);
        if (lineTitle != null && lineTitle != "") {
          // 'QHD32-6', 'QHD33-1', 'NB35-2', 'QHD33-1S', 'CFD6-4', 'BZ3-2'
          // 'QHD32-6', 'NB35-2' , 'QHD33-1S','QHD33-1'
          let lineObj = {
            type: lineTitle,
            code: item,
            zygsjc: (
              (objData[item]["QHD32-6"]["jiChu"] ? parseFloat(objData[item]["QHD32-6"]["jiChu"]) : 0) +
              (objData[item]["QHD33-1"]["jiChu"] ? parseFloat(objData[item]["QHD33-1"]["jiChu"]) : 0) +
              (objData[item]["NB35-2"]["jiChu"] ? parseFloat(objData[item]["NB35-2"]["jiChu"]) : 0) +
              (objData[item]["QHD33-1S"]["jiChu"] ? parseFloat(objData[item]["QHD33-1S"]["jiChu"]) : 0) +
              (objData[item]["CFD6-4"]["jiChu"] ? parseFloat(objData[item]["CFD6-4"]["jiChu"]) : 0) +
              (objData[item]["BZ3-2"]["jiChu"] ? parseFloat(objData[item]["BZ3-2"]["jiChu"]) : 0)
            ).toFixed(2),
            zygscs: (
              (objData[item]["QHD32-6"]["cuoShi"] ? parseFloat(objData[item]["QHD32-6"]["cuoShi"]) : 0) +
              (objData[item]["QHD33-1"]["cuoShi"] ? parseFloat(objData[item]["QHD33-1"]["cuoShi"]) : 0) +
              (objData[item]["NB35-2"]["cuoShi"] ? parseFloat(objData[item]["NB35-2"]["cuoShi"]) : 0) +
              (objData[item]["QHD33-1S"]["cuoShi"] ? parseFloat(objData[item]["QHD33-1S"]["cuoShi"]) : 0) +
              (objData[item]["CFD6-4"]["cuoShi"] ? parseFloat(objData[item]["CFD6-4"]["cuoShi"]) : 0) +
              (objData[item]["BZ3-2"]["cuoShi"] ? parseFloat(objData[item]["BZ3-2"]["cuoShi"]) : 0)
            ).toFixed(2),
            zygstz: (
              (objData[item]["QHD32-6"]["tiaoZheng"] ? parseFloat(objData[item]["QHD32-6"]["tiaoZheng"]) : 0) +
              (objData[item]["QHD33-1"]["tiaoZheng"] ? parseFloat(objData[item]["QHD33-1"]["tiaoZheng"]) : 0) +
              (objData[item]["NB35-2"]["tiaoZheng"] ? parseFloat(objData[item]["NB35-2"]["tiaoZheng"]) : 0) +
              (objData[item]["QHD33-1S"]["tiaoZheng"] ? parseFloat(objData[item]["QHD33-1S"]["tiaoZheng"]) : 0) +
              (objData[item]["CFD6-4"]["tiaoZheng"] ? parseFloat(objData[item]["CFD6-4"]["tiaoZheng"]) : 0) +
              (objData[item]["BZ3-2"]["tiaoZheng"] ? parseFloat(objData[item]["BZ3-2"]["tiaoZheng"]) : 0)
            ).toFixed(2),
            zygskf: objData[item]["QHD33-1"]["kaiFa"] ? parseFloat(objData[item]["QHD33-1"]["kaiFa"].toFixed(2)) : "",
            zygshj: (
              parseFloat(objData[item]["QHD32-6"]["jiChu"]) +
              parseFloat(objData[item]["QHD33-1"]["jiChu"]) +
              parseFloat(objData[item]["NB35-2"]["jiChu"]) +
              parseFloat(objData[item]["QHD33-1S"]["jiChu"]) +
              parseFloat(objData[item]["CFD6-4"]["jiChu"]) +
              parseFloat(objData[item]["BZ3-2"]["jiChu"]) +
              parseFloat(objData[item]["QHD32-6"]["cuoShi"]) +
              parseFloat(objData[item]["QHD33-1"]["cuoShi"]) +
              parseFloat(objData[item]["NB35-2"]["cuoShi"]) +
              parseFloat(objData[item]["QHD33-1S"]["cuoShi"]) +
              parseFloat(objData[item]["CFD6-4"]["cuoShi"]) +
              parseFloat(objData[item]["BZ3-2"]["cuoShi"]) +
              parseFloat(objData[item]["QHD32-6"]["tiaoZheng"]) +
              parseFloat(objData[item]["QHD33-1"]["tiaoZheng"]) +
              parseFloat(objData[item]["NB35-2"]["tiaoZheng"]) +
              parseFloat(objData[item]["QHD33-1S"]["tiaoZheng"]) +
              parseFloat(objData[item]["CFD6-4"]["tiaoZheng"]) +
              parseFloat(objData[item]["BZ3-2"]["tiaoZheng"]) +
              parseFloat(objData[item]["QHD33-1"]["kaiFa"])
            ).toFixed(2),
            qhd326jc: objData[item]["QHD32-6"]["jiChu"] ? objData[item]["QHD32-6"]["jiChu"] : "",
            qhd326cs: objData[item]["QHD32-6"]["cuoShi"] ? objData[item]["QHD32-6"]["cuoShi"] : "",
            qhd326tz: objData[item]["QHD32-6"]["tiaoZheng"] ? objData[item]["QHD32-6"]["tiaoZheng"] : "",
            qhd326hj: objData[item]["QHD32-6"]["heJi"] ? objData[item]["QHD32-6"]["heJi"] : "",
            // NB35-2
            nb352jc: objData[item]["NB35-2"]["jiChu"] ? objData[item]["NB35-2"]["jiChu"] : "",
            nb352cs: objData[item]["NB35-2"]["cuoShi"] ? objData[item]["NB35-2"]["cuoShi"] : "",
            nb352tz: objData[item]["NB35-2"]["tiaoZheng"] ? objData[item]["NB35-2"]["tiaoZheng"] : "",
            nb352hj: objData[item]["NB35-2"]["heJi"] ? objData[item]["NB35-2"]["heJi"] : "",
            // QHD33-1S
            qhd331sjc: objData[item]["QHD33-1S"]["jiChu"] ? objData[item]["QHD33-1S"]["jiChu"] : "",
            qhd331scs: objData[item]["QHD33-1S"]["cuoShi"] ? objData[item]["QHD33-1S"]["cuoShi"] : "",
            qhd331stz: objData[item]["QHD33-1S"]["tiaoZheng"] ? objData[item]["QHD33-1S"]["tiaoZheng"] : "",
            qhd331shj: objData[item]["QHD33-1S"]["heJi"] ? objData[item]["QHD33-1S"]["heJi"] : "",
            // CFD6-4
            cfd64jc: objData[item]["CFD6-4"]["jiChu"] ? objData[item]["CFD6-4"]["jiChu"] : "",
            cfd64cs: objData[item]["CFD6-4"]["cuoShi"] ? objData[item]["CFD6-4"]["cuoShi"] : "",
            cfd64tz: objData[item]["CFD6-4"]["tiaoZheng"] ? objData[item]["CFD6-4"]["tiaoZheng"] : "",
            cfd64hj: objData[item]["CFD6-4"]["heJi"] ? objData[item]["CFD6-4"]["heJi"] : "",
            // BZ3-2
            bz32jc: objData[item]["BZ3-2"]["jiChu"] ? objData[item]["BZ3-2"]["jiChu"] : "",
            bz32cs: objData[item]["BZ3-2"]["cuoShi"] ? objData[item]["BZ3-2"]["cuoShi"] : "",
            bz32tz: objData[item]["BZ3-2"]["tiaoZheng"] ? objData[item]["BZ3-2"]["tiaoZheng"] : "",
            bz32hj: objData[item]["BZ3-2"]["heJi"] ? objData[item]["BZ3-2"]["heJi"] : "",
            // 'QHD32-6', 'QHD33-1', 'NB35-2', 'QHD33-1S', 'CFD6-4', 'BZ3-2'
            qhd331jc: objData[item]["QHD33-1"]["jiChu"] ? objData[item]["QHD33-1"]["jiChu"] : "",
            qhd331cs: objData[item]["QHD33-1"]["cuoShi"] ? objData[item]["QHD33-1"]["cuoShi"] : "",
            qhd331tz: objData[item]["QHD33-1"]["tiaoZheng"] ? objData[item]["QHD33-1"]["tiaoZheng"] : "",
            qhd331kf: objData[item]["QHD33-1"]["kaiFa"] ? objData[item]["QHD33-1"]["kaiFa"] : "",
            qhd331hj: objData[item]["QHD33-1"]["heJi"] ? objData[item]["QHD33-1"]["heJi"] : "",
            bzhj: (
              (objData[item]["NB35-2"]["jiChu"] ? parseFloat(objData[item]["NB35-2"]["jiChu"]) : 0) +
              (objData[item]["QHD33-1S"]["jiChu"] ? parseFloat(objData[item]["QHD33-1S"]["jiChu"]) : 0) +
              (objData[item]["QHD33-1"]["jiChu"] ? parseFloat(objData[item]["QHD33-1"]["jiChu"]) : 0) +
              (objData[item]["NB35-2"]["cuoShi"] ? parseFloat(objData[item]["NB35-2"]["cuoShi"]) : 0) +
              (objData[item]["QHD33-1S"]["cuoShi"] ? parseFloat(objData[item]["QHD33-1S"]["cuoShi"]) : 0) +
              (objData[item]["QHD33-1"]["cuoShi"] ? parseFloat(objData[item]["QHD33-1"]["cuoShi"]) : 0) +
              (objData[item]["NB35-2"]["tiaoZheng"] ? parseFloat(objData[item]["NB35-2"]["tiaoZheng"]) : 0) +
              (objData[item]["QHD33-1S"]["tiaoZheng"] ? parseFloat(objData[item]["QHD33-1S"]["tiaoZheng"]) : 0) +
              (objData[item]["QHD33-1"]["tiaoZheng"] ? parseFloat(objData[item]["QHD33-1"]["tiaoZheng"]) : 0) +
              (objData[item]["QHD33-1"]["kaiFa"] ? parseFloat(objData[item]["QHD33-1"]["kaiFa"]) : 0)
            ).toFixed(2),
          };
          reList.push(lineObj);
        }
        console.log("reList");
        console.log(reList);
      });
      let today = reList.find((item) => {
        return item.code == "baoBiao";
      });
      let yesterday = reList.find((item) => {
        return item.code == "baoBiaoYesterday";
      });
      console.log(today, yesterday);
      // 'QHD32-6', 'QHD33-1', 'NB35-2', 'QHD33-1S', 'CFD6-4', 'BZ3-2'
      var obj = {
        type: "当日-前一日产量",
        zygsjc:
          today["zygsjc"] == "" && yesterday["zygsjc"] == "" ? "" : (today["zygsjc"] - yesterday["zygsjc"]).toFixed(2),
        zygscs:
          today["zygscs"] == "" && yesterday["zygscs"] == "" ? "" : (today["zygscs"] - yesterday["zygscs"]).toFixed(2),
        zygstz:
          today["zygstz"] == "" && yesterday["zygstz"] == "" ? "" : (today["zygstz"] - yesterday["zygstz"]).toFixed(2),
        zygskf:
          today["zygskf"] == "" && yesterday["zygskf"] == "" ? "" : (today["zygskf"] - yesterday["zygskf"]).toFixed(2),
        zygshj:
          today["zygshj"] == "" && yesterday["zygshj"] == "" ? "" : (today["zygshj"] - yesterday["zygshj"]).toFixed(2),

        // QHD32-6
        qhd326jc:
          today["qhd326jc"] == "" && yesterday["qhd326jc"] == ""
            ? ""
            : (today["qhd326jc"] - yesterday["qhd326jc"]).toFixed(2),
        qhd326cs:
          today["qhd326cs"] == "" && yesterday["qhd326cs"] == ""
            ? ""
            : (today["qhd326cs"] - yesterday["qhd326cs"]).toFixed(2),
        qhd326tz:
          today["qhd326tz"] == "" && yesterday["qhd326tz"] == ""
            ? ""
            : (today["qhd326tz"] - yesterday["qhd326tz"]).toFixed(2),
        qhd326hj:
          today["qhd326hj"] == "" && yesterday["qhd326hj"] == ""
            ? ""
            : (today["qhd326hj"] - yesterday["qhd326hj"]).toFixed(2),

        // QHD33-1
        qhd331jc:
          today["qhd331jc"] == "" && yesterday["qhd331jc"] == ""
            ? ""
            : (today["qhd331jc"] - yesterday["qhd331jc"]).toFixed(2),
        qhd331cs:
          today["qhd331cs"] == "" && yesterday["qhd331cs"] == ""
            ? ""
            : (today["qhd331cs"] - yesterday["qhd331cs"]).toFixed(2),
        qhd331tz:
          today["qhd331tz"] == "" && yesterday["qhd331tz"] == ""
            ? ""
            : (today["qhd331tz"] - yesterday["qhd331tz"]).toFixed(2),
        qhd331hj:
          today["qhd331hj"] == "" && yesterday["qhd331hj"] == ""
            ? ""
            : (today["qhd331hj"] - yesterday["qhd331hj"]).toFixed(2),

        // NB35-2
        nb352jc:
          today["nb352jc"] == "" && yesterday["nb352jc"] == ""
            ? ""
            : (today["nb352jc"] - yesterday["nb352jc"]).toFixed(2),
        nb352cs:
          today["nb352cs"] == "" && yesterday["nb352cs"] == ""
            ? ""
            : (today["nb352cs"] - yesterday["nb352cs"]).toFixed(2),
        nb352tz:
          today["nb352tz"] == "" && yesterday["nb352tz"] == ""
            ? ""
            : (today["nb352tz"] - yesterday["nb352tz"]).toFixed(2),
        nb352hj:
          today["nb352hj"] == "" && yesterday["nb352hj"] == ""
            ? ""
            : (today["nb352hj"] - yesterday["nb352hj"]).toFixed(2),

        // QHD33-1S
        qhd331sjc:
          today["qhd331sjc"] == "" && yesterday["qhd331sjc"] == ""
            ? ""
            : (today["qhd331sjc"] - yesterday["qhd331sjc"]).toFixed(2),
        qhd331scs:
          today["qhd331scs"] == "" && yesterday["qhd331scs"] == ""
            ? ""
            : (today["qhd331scs"] - yesterday["qhd331scs"]).toFixed(2),
        qhd331stz:
          today["qhd331stz"] == "" && yesterday["qhd331stz"] == ""
            ? ""
            : (today["qhd331stz"] - yesterday["qhd331stz"]).toFixed(2),
        qhd331shj:
          today["qhd331shj"] == "" && yesterday["qhd331shj"] == ""
            ? ""
            : (today["qhd331shj"] - yesterday["qhd331shj"]).toFixed(2),

        // CFD6-4
        cfd64jc:
          today["cfd64jc"] == "" && yesterday["cfd64jc"] == ""
            ? ""
            : (today["cfd64jc"] - yesterday["cfd64jc"]).toFixed(2),
        cfd64cs:
          today["cfd64cs"] == "" && yesterday["cfd64cs"] == ""
            ? ""
            : (today["cfd64cs"] - yesterday["cfd64cs"]).toFixed(2),
        cfd64tz:
          today["cfd64tz"] == "" && yesterday["cfd64tz"] == ""
            ? ""
            : (today["cfd64tz"] - yesterday["cfd64tz"]).toFixed(2),
        cfd64hj:
          today["cfd64hj"] == "" && yesterday["cfd64hj"] == ""
            ? ""
            : (today["cfd64hj"] - yesterday["cfd64hj"]).toFixed(2),

        // BZ3-2
        bz32jc:
          today["bz32jc"] == "" && yesterday["bz32jc"] == "" ? "" : (today["bz32jc"] - yesterday["bz32jc"]).toFixed(2),
        bz32cs:
          today["bz32cs"] == "" && yesterday["bz32cs"] == "" ? "" : (today["bz32cs"] - yesterday["bz32cs"]).toFixed(2),
        bz32tz:
          today["bz32tz"] == "" && yesterday["bz32tz"] == "" ? "" : (today["bz32tz"] - yesterday["bz32tz"]).toFixed(2),
        bz32hj:
          today["bz32hj"] == "" && yesterday["bz32hj"] == "" ? "" : (today["bz32hj"] - yesterday["bz32hj"]).toFixed(2),

        total_sum: today["bzhj"] == "" && yesterday["bzhj"] == "" ? "" : (today["bzhj"] - yesterday["bzhj"]).toFixed(2),
      };
      reList.push(obj);
      var finalList = [];
      this.allOutputTrackingTableData.forEach((item, index) => {
        var lineTitle = this.dealLineTitle(item.code);
        var obj = reList.find((item1) => {
          return item1.type == lineTitle;
        });
        if (obj == null) {
          obj = {
            type: lineTitle,
            zygsjc: "",
            zygscs: "",
            zygstz: "",
            zygskf: "",
            zygshj: "",
            seljc: "",
            selcs: "",
            seltz: "",
            selhj: "",
            ewyjc: "",
            ewycs: "",
            ewytz: "",
            ewyhj: "",
            ewysjc: "",
            ewyscs: "",
            ewystz: "",
            ewyshj: "",
            yjsjc: "",
            yjscs: "",
            yjstz: "",
            yjskf: "",
            yjshj: "",
            bzhj: "",
          };
        }
        finalList.push(obj);
      });
      return finalList;
    },
  },
};
</script>
<style lang="less" scoped>
.app-container {
  height: 100%;

  .el-table {
    overflow: scroll;
  }
}

.el-tree {
  max-height: 370px;
  overflow: scroll;
}

.pertable thead .el-table-column--selection .cell {
  display: none;
}
</style>
