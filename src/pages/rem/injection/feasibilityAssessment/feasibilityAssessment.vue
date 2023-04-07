<template>
  <!-- 配置方案与评估查看页 -->
  <el-container class="layout">
    <el-header height="auto">
      <div class="my-5" align="left">
        <router-link to="waterPrediction" class="route">吸水能力预测</router-link>
        <router-link to="schemePrediction" class="route router-link-active">配注方案分析与评估</router-link>
      </div>
      <div style="display: flex;justify-content: space-between;">
        <div style="display: flex;">
          <div class="select">
            <span>作业公司:</span>
            <el-select v-model="querSelect.jobSelect" filterable clearable @change="jobselectBut">
              <el-option
                v-for="item in jobList"
                :key="item.orgId"
                :label="item.orgName"
                :value="item.orgId"
              ></el-option>
            </el-select>
          </div>
          <div class="select">
            <span>油田:</span>
            <el-select v-model="querSelect.ogfSelect" @change="ogfSelectBut" filterable clearable>
              <el-option
                v-for="item in ogfList"
                :key="item.ogfId"
                :label="item.ogfName"
                :value="item.ogfId"
              ></el-option>
            </el-select>
          </div>
          <div class="select">
            <span>平台:</span>
            <el-select v-model="querSelect.platSelect" filterable clearable @change="platListBut">
              <el-option
                v-for="item in platList"
                :key="item.assetCode"
                :label="item.platformName"
                :value="item.assetCode"
              ></el-option>
            </el-select>
          </div>
          <div class="select">
            <span>井号:</span>
            <el-select v-model="querSelect.wellSelect" filterable clearable>
              <el-option
                v-for="item in wellList"
                :key="item.wellId"
                :label="item.wellName"
                :value="item.wellId"
              ></el-option>
            </el-select>
          </div>
          <div style="margin-right: 10px;">
            <span>日期:</span>
            <el-date-picker
              v-model="querSelect.dateTime"
              type="month"
              placeholder="选择月"
              value-format="yyyy-MM"
            ></el-date-picker>
          </div>
          <el-button type="primary" @click="searchBut">检索</el-button>
        </div>
        <div>
          <returnBut></returnBut>
        </div>
      </div>
    </el-header>
    <el-main >
      <div class="titleBox">
        <el-tabs v-model="activeName">
          <el-tab-pane label="工艺可行性" name="first">
            <div style="display: flex;justify-content: space-between;">
              <div style="flex:1;height: 400px;">
                <img :src='baseUrl + "static/img/feasibility/gongyi.jpg"' style="height: 100%; " />
              </div>
              <div style="width: 45%;height:400px;margin-left: 15px;">
                <pagePanel style="height: 145px" class="g-w100">
                    <el-table :data="tableData1" highlight height="120">
                    <el-table-column
                      prop="appendixValueName"
                      show-overflow-tooltip
                      label="注水工艺"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      show-overflow-tooltip
                      prop="maxFlow"
                      label="单层最大测试流量?(m³/d)"
                      :render-header="renderheader"
                      align="center"
                    ></el-table-column>
                  </el-table>
                </pagePanel>
                <pagePanel style="height: 245px;margin-top: 10px;" class="g-w100">
                  <el-table :data="tableData2" highlight height="230">
                    <el-table-column
                      show-overflow-tooltip
                      prop="layerCode"
                      label="层段"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      show-overflow-tooltip
                      label="流量计测量范围(m³/d)"
                      :render-header="renderheader"
                      align="center"
                    >
                      <el-table-column
                        show-overflow-tooltip
                        label="低值"
                        prop="minFlow"
                        align="center"
                      ></el-table-column>
                      <el-table-column
                        show-overflow-tooltip
                        label="高值"
                        prop="maxFlow"
                        align="center"
                      ></el-table-column>
                    </el-table-column>
                  </el-table>
                </pagePanel>
              </div>
              <pagePanel style="flex: 4; height: 400px; margin-left: 15px;" class="g-w100">
                <Echarts
                  :chart-data="getEcharts( groupBlockone, '日配注量', '工艺单层最大测试流量')"
                  height="95%"
                ></Echarts>
              </pagePanel>
            </div>
          </el-tab-pane>
          <el-tab-pane label="管柱可行性" name="second">
            <div style="display: flex;justify-content: space-between;">
              <div style="flex: 1;height: 400px;">
                <img :src='baseUrl + "static/img/feasibility/guanzhu.jpg"' style="height: 100%; " />
              </div>
              <div style=" width: 800px ;height: 400px; margin: 0px 15px;">
                <pagePanel>
                  <el-table :data="tableData3" highlight height="365">
                    <el-table-column
                      show-overflow-tooltip
                      label="井号/层段"
                      prop="layerCode"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      show-overflow-tooltip
                      label="流动类型"
                      :render-header="renderheader"
                      align="center"
                    >
                      <template>
                        <span>油管内流动</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      show-overflow-tooltip
                      prop="compstringInnerDiameter"
                      label="流道内径?(mm)"
                      :render-header="renderheader"
                      align="center"
                    ></el-table-column>
                    <!-- <el-table-column
                      show-overflow-tooltip
                      prop="compstringOutDiameter"
                      label="流道外径?(mm)"
                      :render-header="renderheader"
                      align="center"
                    ></el-table-column> -->
                    <el-table-column
                      show-overflow-tooltip
                      prop="componentMaterial"
                      label="材质"
                      :render-header="renderheader"
                      align="center"
                    >
                    <template slot-scope="scope">
                      <span>{{ scope.row.componentMaterial == 1 ? '碳钢' : '防腐' }}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                      show-overflow-tooltip
                      prop="evalInjDaily"
                      label="评估流量?(m³/d)"
                      :render-header="renderheader"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      show-overflow-tooltip
                      prop="evalInjSpeed"
                      label="评估流量对应流速?(m/s)"
                      :render-header="renderheader"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      show-overflow-tooltip
                      prop="washSpeed"
                      label="冲蚀流速?(m/s)"
                      :render-header="renderheader"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      show-overflow-tooltip
                      prop="washFlowDaily"
                      label="冲蚀流量?(m³/d)"
                      :render-header="renderheader"
                      align="center"
                    ></el-table-column>
                  </el-table>
                </pagePanel>
              </div>
              <div style="flex: 4; height: 400px;">
                <pagePanel style="width: 100%; height: 195px;">
                  <Echarts
                    :chart-data="getEchartstwo( groupBlocktherr,[
                      {name:'评估流量对应流速', key: 'topPressure'},
                      {name:'冲蚀流速(碳钢)', key: 'bottomPressure'},
                      {name:'冲蚀流速(防腐)', key: 'anticorrosiveWashSpeed'}],10,2,'m/s')"
                    height="97%"
                  ></Echarts>
                </pagePanel>
                <pagePanel style="width: 100%; height: 195px;margin-top: 10px;">
                  <Echarts
                    :chart-data="getEchartstwo( groupBlockfour,[
                      {name:'评估流量', key: 'topPressure'},
                      {name:'冲蚀流量(碳钢)', key: 'bottomPressure'},
                      {name:'冲蚀流量(防腐)', key: 'anticorrosiveWashFlowDaily'}],2000,500,'m³/d')"
                    height="97%"
                  ></Echarts>
                </pagePanel>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="地层可行性" name="third">
            <div style="display: flex;justify-content: space-between;">
              <div style="flex:1;height: 400px;">
                <img :src='baseUrl + "static/img/feasibility/diceng.jpg"' style="height: 100%;" />
              </div>
              <div style="width: 46%;height: 400px;margin-left: 15px;">
                <pagePanel>
                  <el-table :data="tableData4" highlight height="365">
                    <el-table-column
                      show-overflow-tooltip
                      label="层段"
                      prop="layerCode"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      show-overflow-tooltip
                      prop="absorpPredictIndex"
                      label="预测当前吸水指数?[m³/(d·MPa)]"
                      :render-header="renderheader"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      show-overflow-tooltip
                      prop="allocInjDaily"
                      label="评估配注量?(m³/d)"
                      :render-header="renderheader"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      show-overflow-tooltip
                      prop="needBottomFlowPress"
                      label="所需井底流压?(MPa)"
                      :render-header="renderheader"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      show-overflow-tooltip
                      prop="layersBottomSafePress"
                      label="最大安全井底注入压力?(MPa)"
                      :render-header="renderheader"
                      align="center"
                    ></el-table-column>
                  </el-table>
                </pagePanel>
              </div>
              <pagePanel style="flex: 4; height: 400px;margin-left: 15px;">
                <Echarts :chart-data="getEcharts( groupBlock, '所需井底流压', '最大安全井底注入压力')" height="90%"></Echarts>
              </pagePanel>
            </div>
          </el-tab-pane>
          <el-tab-pane label="地面可行性" name="fourth">
            <div style="display: flex;justify-content: space-between;">
              <div style="flex: 1;height: 400px;">
                <img :src='baseUrl + "static/img/feasibility/dimian.jpg"' style="height: 100%;" />
              </div>
              <div style="width: 46%;height: 400px;margin-left: 15px;">
                <pagePanel>
                  <el-table :data="tableData5" highlight height="365">
                    <el-table-column
                      show-overflow-tooltip
                      label="层段"
                      prop="layerCode"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      show-overflow-tooltip
                      prop="absorpPredictIndex"
                      label="预测当前吸水指数?[m³/(d·MPa)]"
                      :render-header="renderheader"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      show-overflow-tooltip
                      prop="allocInjDaily"
                      label="评估配注量?(m³/d)"
                      :render-header="renderheader"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      show-overflow-tooltip
                      prop="needBottomFlowPress"
                      label="所需井底流压?(MPa)"
                      :render-header="renderheader"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      show-overflow-tooltip
                      prop="needWhInjPress"
                      label="所需井口压力?(MPa)"
                      :render-header="renderheader"
                      align="center"
                    ></el-table-column>
                  </el-table>
                </pagePanel>
              </div>
              <pagePanel style="flex: 4; height: 400px;margin-left: 15px;">
                <Echarts
                  :chart-data="getEchartstwo( groupBlocktwo,[
                    {name:'所需井口压力', key: 'topPressure'},
                      {name:'泵压', key: 'bottomPressure'}],10,2,'MPa')"
                  height="97%"
                ></Echarts>
              </pagePanel>
            </div>
          </el-tab-pane>
        </el-tabs>
        <pagePanel style="width: 100%;margin-top: 20px;">
          <tableVue :table="table"></tableVue>
        </pagePanel>
        <div class="fr">
          <div style="position: absolute; top: 5px;right: 0px;">
            <el-button type="primary" @click="analysis">分析</el-button>
            <el-button type="primary" @click="dispose">处理</el-button>
            <el-button type="primary" @click="routerBut">参数配置</el-button>
          </div>
          <el-dialog title="处理" :visible.sync="dialogTableVisible">
            <el-table :data="tableDataOne" highlight :span-method="hebing">
              <el-table-column property="wellName" label="井号" width="150"></el-table-column>
              <el-table-column property="layerCode" label="层段" width="200"></el-table-column>
              <el-table-column property="allocInjDaily" label="建议配注量(m³/d)">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.allocInjDaily" />
                </template>
              </el-table-column>
              <el-table-column property="suggestStimTypeCode" label="措施建议">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.suggestStimTypeCode" @change="qq(scope.row)">
                    <el-option
                      v-for="item in selectlist"
                      :key="item.id"
                      :label="item.suggest"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column property="remark" label="备注">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.remark" @change="qq(scope.row)" />
                </template>
              </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogTableVisible = false">取 消</el-button>
              <el-button type="primary" @click="submit">提交</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import returnBut from '@/components/rem/tools/waterInjection/redurned.vue';
import tableVue from "@/components/rem/tools/waterInjection/table.vue";
// import Echarts from "@/components/tools/Echarts";
// import {
//   getabsorpPredict,
//   getassessmentList,
//   getseparateType,
//   getflowParameter,
//   getcompMaxInjDaily,
//   getcompProbility,
//   getlayerProbability,
//   getequipmentProbability,
//   getSuggestInfo,
//   getupdateSuggestInfo
// } from "@/api/ipm-04/w-injectionEvaluation.js"
// import { fetchOilFields } from "@/api/rem-02/primaryinfo.js";

export default {
  components: {
    returnBut,
    // Echarts,
    tableVue
  },
  // mixins: [dropDownUnit],
  data () {
    return {
      baseUrl: process.env.NODE_ENV == "production" ? '/ipm/' : '/',
      activeName: 'first',
      tableData: [],
      value2: '',
      selectlist: [],
      table: [],
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData5: [],
      tableDataOne: [],
      groupBlock: [],
      groupBlockone: [],
      groupBlocktwo: {},
      groupBlocktherr: {},
      groupBlockfour: {},
      dialogTableVisible: false,
      querSelect: {
        jobSelect: undefined,
        ogfSelect: undefined,
        wellSelect: undefined,
        dateTime: '',
        platSelect: undefined,
      },
      // aaa: false,
    };
  },
  created () {
    const params = JSON.parse(localStorage.getItem('SCHEMEANALYSIS'))
    if(params && params.wellId){
      this.querSelect.jobSelect = params.orgId
      this.querSelect.ogfSelect = params.ogfId
      this.querSelect.wellSelect = params.wellId
      this.querSelect.dateTime = params.dateTime
      this.querSelect.platSelect = '0C118F2856574256A8F1BBA26F99BA1A'
    }
    this.gettans()
  },
  mounted () {
    this.initData();
  },

  methods: {
    async initData () {
      //获取油田数据
      await fetchOilFields().then((res) => {
        let msg = res.data.msg;
        if (msg == "success") {
          let myData = res.data.data.oilFields;
          let array = []
          myData.forEach(item => {
            let ogf = {
              ogfId: item.oilFieldId,
              ogfName: item.name
            }
            array.push(ogf)
          })
          this.ogfList = array;
        }
      });
    },
    qq (data) {
      console.log(data)
      this.tableDataOne.forEach(item => {
        item.suggestStimTypeCode = data.suggestStimTypeCode
        item.remark = data.remark
      })
    },
    hebing ({ row, column, rowIndex, columnIndex }) {
      let arr = this.tableDataOne.length
      if (columnIndex === 4) {
        return {
          rowspan: arr,
          colspan: 1
        }
      };

      if (columnIndex === 3) {
        return {
          rowspan: arr,
          colspan: 1
        }
      };

      ;
    },
    gettans () {
      let data = {
        wellId: this.querSelect.wellSelect,
        dateTime: this.querSelect.dateTime
      }
      this.gettable(data)
      this.getseparate(data)
      this.getParameter(data)
      this.getDaily(data)
      this.getProbility(data)
      this.getProbability(data)
      this.getequipment(data)
    },
    // 检索
    searchBut () {
      this.gettans()
    },
    // 地面可行性
    getequipment (data) {
      getequipmentProbability(data).then((res) => {
        this.tableData5 = res
        this.groupBlocktwo = res.map(item => {
          return {
            ytitle: item.layerCode,
            topPressure: item.needWhInjPress,
            bottomPressure: item.pumpRatePress
          }
        })
        this.getEchartstwo()
      })

    },
    // 地层可行性
    getProbability (data) {
      getlayerProbability(data).then((res) => {
        this.tableData4 = res
        this.groupBlock = res.map(item => {
          return {
            ytitle: item.layerCode,
            topPressure: item.needBottomFlowPress,
            bottomPressure: item.layersBottomSafePress
          }
        })
        // 数组顺序颠倒  与表格一致
        this.groupBlock = this.groupBlock.reverse()
        this.getEcharts()
      })
    },
    // 管柱可行性
    getProbility (data) {
      getcompProbility(data).then((res) => {
        this.tableData3 = res
        this.groupBlocktherr = res.map(item => {
          return {
            ytitle:item.layerCode,
            topPressure:item.evalInjSpeed,
            bottomPressure:item.washSpeed,
            ...item
          }
        })
        this.groupBlockfour = res.map(item => {
          return {
            ytitle:item.layerCode,
            topPressure:item.evalInjDaily,
            bottomPressure:item.washFlowDaily,
            ...item
          }
        })
        this.getEchartstwo()
      })
    },
    // 工艺可行性图表
    getDaily (data) {
      getcompMaxInjDaily(data).then((res) => {
        this.groupBlockone = res.map(item => {
          return {
            ytitle: item.layerCode,
            topPressure: item.allocInjDaily,
            bottomPressure: item.compMaxInjDaily
          }
        })
        // 数组顺序颠倒  与表格一致
        this.groupBlockone = this.groupBlockone.reverse()
        this.getEcharts()
      })
    },
    // 流量计测量范围信息
    getParameter (data) {
      getflowParameter(data).then((res) => {
        this.tableData2 = res
      })
    },
    // 注水工艺信息
    getseparate (data) {
      getseparateType(data).then((res) => {
        this.tableData1 = [res]
      })
    },
    // 评估列表
    gettable (data) {
      getassessmentList(data).then((res) => {
        this.table = res
      })
    },
    // 换行
    renderheader (h, { column, $index }) {
      return h('span', {}, [
        h('span', {}, column.label.split('?')[0]),
        h('br'),
        h('span', {}, column.label.split('?')[1])
      ]);
    },
    // 返回
    returned () {
      this.$emit('feasibility', "配置方案分析与预估")
    },
    // 分析
    analysis () {
      const params = {
        orgId: this.querSelect.jobSelect,
        ogfId: this.querSelect.ogfSelect,
        platId: this.querSelect.platSelect,
        wellId: this.querSelect.wellSelect,
        dateTime: this.querSelect.dateTime
      }
      localStorage.setItem('FEASIBILITY_ASSESSMENT', JSON.stringify(params))
      this.$router.push({
        name: "decisionCube",
        params
      })
    },
    // 处理
    dispose () {
      this.dialogTableVisible = true
      let data = {
        wellId: this.querSelect.wellSelect,
        dateTime: this.querSelect.dateTime
      }
      getabsorpPredict(data).then((res) => {
        this.tableDataOne = res
      })
      getSuggestInfo().then((res) => {
        this.selectlist = res
      })
    },
    // 提交
    submit () {
      this.dialogTableVisible = false
      let arr = []
      this.tableDataOne.forEach(item => {
        let obj = {
          ipmAllocProjectEvalId: item.ipmAllocProjectEvalId,
          suggestStimTypeCode: item.suggestStimTypeCode,
          suggestAllocInjDaily: item.allocInjDaily,
          remark: item.remark
        }
        arr.push(obj)
      })
      console.log(arr)
      getupdateSuggestInfo(arr).then((bool) => {
        if (bool) {
          this.$message.success("提交成功")
          this.gettable({ wellId: this.querSelect.wellSelect, dateTime: this.querSelect.dateTime })
        } else {
          this.$message.error("提交失败")
        }
      })
    },
    routerBut () {
      this.$router.push("parameterSetting")
    },
    // 横
    getEcharts (data, name1, name2) {
      if(!Array.isArray(data) || data.length < 1) return {};
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: [
          { x: "16%", y: "8%", width: "73%", height: "85%" },
          { x: "16%", y: "8%", width: "73%", height: "85%" },
        ],
        xAxis: {
          name: "单位:(MPa)",
          nameTextStyle: {
            color: "#3399ff"
          },
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          // data: data.ytitle,
          data: data.map(item => {
            return {
              value: item.ytitle,
              textStyle: {
                color: (val) => {
                  if (item.topPressure - item.bottomPressure > 0) {
                    return '#f70'
                  } else {
                    return '#fff';
                  }

                }
              }
            }
          })
        },
        series: [
          {
            name: name1,
            barMaxWidth: "40",
            type: 'bar',
            data: data.map(item => {
              return {
                value: item.topPressure
              }
            })
          },
          {
            name: name2,
            barMaxWidth: "40",
            type: 'bar',
            data: data.map(item => {
              return {
                value: item.bottomPressure
              }
            })


          }
        ]
      }
      return option
    },
    // 竖
    getEchartstwo (data, names, number, number1, unit) {
      function getSeries(){
        let datas = []
        names.forEach(item => {
          datas.push({
            name: item.name,
            barMaxWidth: "50",
            type: item.key === 'topPressure'? 'bar': 'line',
            data: data.map(d=>{
              return{
                value:d[item.key]
              }
            })

          })
        })
        return datas;
      }
      if(!Array.isArray(data) || data.length < 1) return {};
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {

        },
        legend: {
          data: names.map(item => item.name)
        },
        grid: [
          { x: "40", y: "23%", width: "90%", height: "63%" },
          { x: "40", y: "23%", width: "90%", height: "63%" },
        ],
        xAxis: [
          {
            type: 'category',
            // axisLabel:{
            //   rotate: 10
            // },
            data: data.map(item => {
              return {
                value: item.ytitle,
                textStyle: {
                  color: (val) => {
                    if (item.topPressure - item.bottomPressure > 0) {
                      return '#f70'
                    } else {
                      return '#fff';
                    }

                  }
                }
              }
            }),
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: "单位:(" + unit + ")",
            nameTextStyle: {
              color: "#3399ff"
            },
            min: 0,
            max: number,
            interval: number1
          },
        ],
        series: getSeries()
      }
      return option
    }
  }
}

</script>

<style lang="scss" scoped>
.titleBox {
  height: 100%;
  .formBox {
    right: 0;
    bottom: 0;
    width: calc(100% - 200px);
  }
}
.route {
  border: 1px solid #66ffff;
  color: #66ffff;
  padding: 8px;
  text-decoration: none;
}

.router-link-active {
  color: white;
  background: #3399ff;
}
.select {
  margin-right: 15px;
}
</style>