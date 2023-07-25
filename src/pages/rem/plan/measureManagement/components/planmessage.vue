<!-- 措施计划情况 -->
<template>
  <div class="app-container" style="height: 100%">
    <pagePanel headerTitle="措施计划情况表" style="height: calc(100% - 20px)">
        <el-row>
            <el-button
                type="primary"
                style="float: right"
                icon="el-icon-download"
                @click="doDownExcel()"
            >
                下载
            </el-button>
        </el-row>
      <el-table
        :data="noticeList"
        highlight-current-row
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px' }"
        header-cell-class-name="table_header"
        :cell-style="{ 'text-align': 'center', padding: '2px' }"
        style="width: 100%; height: 100%"
        height="calc(100% - 30px)"
        id="xczyjhb"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
       
        <el-table-column  label="井基本信息" prop="wellId" align="center">
          <el-table-column sortable  label="井号" prop="wellNo" min-width="200px" align="center">
              
          </el-table-column>
          <el-table-column label="生产层位" sortable prop="layerName" min-width="200px" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.layerName !== null && scope.row.layerName !== ''">{{scope.row.layerName}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column label="所属区块" sortable prop="blockName" min-width="200px" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.blockName !== null && scope.row.blockName !== ''">{{scope.row.blockName}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column :label="`油藏厚度 \n（m）`"  sortable width="130px" prop="reservoirThickness" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.reservoirThickness !== null && scope.row.reservoirThickness !== ''">{{scope.row.reservoirThickness}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column :label="`水平段长度 \n（m）`" sortable min-width="130px" prop="horizonIntervalLen" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.horizonIntervalLen !== null && scope.row.horizonIntervalLen !== ''">{{scope.row.horizonIntervalLen}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column label="完井方式" sortable min-width="130px" prop="completionMethod" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.completionMethod !== null && scope.row.completionMethod !== ''">{{scope.row.completionMethod}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="生产现状" prop="name" align="center">
          <el-table-column sortable label="投产日期" min-width="130px" prop="startDate" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.startDate !== null && scope.row.startDate !== ''">{{scope.row.startDate}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column sortable :label="`日产液\n（m³/d）`" min-width="130px" prop="fluidProdDaily" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.fluidProdDaily !== null && scope.row.fluidProdDaily !== ''">{{scope.row.fluidProdDaily}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column sortable :label="`日产油\n（m³/d）`" min-width="130px" prop="oilProdDaily" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.oilProdDaily !== null && scope.row.oilProdDaily !== ''">{{scope.row.oilProdDaily}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column sortable :label="`含水\n（%）`"  min-width="130px" prop="waterRatio" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.waterRatio !== null && scope.row.waterRatio !== ''">{{scope.row.waterRatio}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column sortable :label="`泵频\n（Hz）`"  min-width="100px" prop="pumpFrequency" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.pumpFrequency !== null && scope.row.pumpFrequency !== ''">{{scope.row.pumpFrequency}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column sortable :label="`累产油\n（万方）`"  min-width="130px" prop="cumOilProdYearly" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.cumOilProdYearly !== null && scope.row.cumOilProdYearly !== ''">{{Number(scope.row.cumOilProdYearly).toFixed(2)}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column sortable label="地层压力测试时间"  prop="testDate" min-width="160px" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.testDate !== null && scope.row.testDate !== ''">{{(scope.row.testDate)}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column sortable :label="`测试压力值\n（MPa）`" min-width="130px" prop="basalLevelStaticPress" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.basalLevelStaticPress !== null && scope.row.basalLevelStaticPress !== ''">{{(scope.row.basalLevelStaticPress)}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column sortable :label="`流压\n（MPa）`" min-width="130px" prop="flowPress" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.flowPress !== null && scope.row.flowPress !== ''">{{scope.row.flowPress}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column sortable :label="`生产压差\n（MPa）`" min-width="130px" prop="productPress" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.productPress !== null && scope.row.productPress !== ''">{{scope.row.productPress}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column sortable min-width="120px" label="井控储量"  prop="probReservesWell" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.probReservesWell !== null && scope.row.probReservesWell !== ''">{{scope.row.probReservesWell}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column sortable   label="剩余可采储量" prop="remainingRecoverableReserves" min-width="130px" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.remainingRecoverableReserves !== null && scope.row.remainingRecoverableReserves !== ''">{{scope.row.remainingRecoverableReserves}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column sortable  :label="`采液指数\n（m³/d.MPa）`" min-width="150px" prop="fluidProductionIndex" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.fluidProductionIndex !== null && scope.row.fluidProductionIndex !== ''">{{scope.row.fluidProductionIndex}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
        </el-table-column>
        <el-table-column   label="预测值" prop="name" align="center">
          <el-table-column sortable min-width="120px" :label="`产液值\n（m³/d）`"  prop="forecastFluid" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.forecastFluid !== null && scope.row.forecastFluid !== ''">{{scope.row.forecastFluid}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column sortable min-width="100px" :label="`含水\n（%）`"  prop="forecastWaterRatio" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.forecastWaterRatio !== null && scope.row.forecastWaterRatio !== ''">{{scope.row.forecastWaterRatio}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column sortable min-width="120px" :label="`日增油\n（m³/d）`" prop="forecastOilInc" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.forecastOilInc !== null && scope.row.forecastOilInc !== ''">{{scope.row.forecastOilInc}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column sortable min-width="120px"  :label="`日产油\n（m³/d）`" prop="forecastOil" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.forecastOil !== null && scope.row.forecastOil !== ''">{{scope.row.forecastOil}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column sortable min-width="120px" :label="`生产压差\n（MPa）`"    prop="forecastProductPress" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.forecastProductPress !== null && scope.row.forecastProductPress !== ''">{{scope.row.forecastProductPress}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column sortable min-width="120px" :label="`流压\n（MPa）`"  prop="forecastFlowPress" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.forecastFlowPress !== null && scope.row.forecastFlowPress !== ''">{{scope.row.forecastFlowPress}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
        </el-table-column>
        <el-table-column   label="其他因素" prop="name" align="center">
          <el-table-column sortable min-width="130px"   :label="`排量效率\n(%)`" prop="displacementEfficiency" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.displacementEfficiency !== null && scope.row.displacementEfficiency !== ''">{{scope.row.displacementEfficiency}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column sortable min-width="130px"  :label="`历史出砂(天)`" prop="historySandDay" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.historySandDay !== null && scope.row.historySandDay !== ''">{{scope.row.historySandDay}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column sortable min-width="130px"   :label="`近期出砂(天)`" prop="sandDay" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.sandDay !== null && scope.row.sandDay !== ''">{{scope.row.sandDay}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column sortable min-width="130px"   :label="`出砂量(%)`" prop="sandValue" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.sandValue !== null && scope.row.sandValue !== ''">{{scope.row.sandValue}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column sortable min-width="130px"   label="电泵情况" prop="pumpCondition" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.pumpCondition !== null && scope.row.pumpCondition !== ''">{{scope.row.pumpCondition}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column sortable min-width="130px"   label="管柱情况" prop="tubularColumnCondition" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.tubularColumnCondition !== null && scope.row.tubularColumnCondition !== ''">{{scope.row.tubularColumnCondition}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column sortable min-width="190px"   label="起始平台名称" prop="fromPlatformName" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.fromPlatformName !== null && scope.row.fromPlatformName !== ''">{{scope.row.fromPlatformName}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
            <el-table-column sortable min-width="200px"   label="终止平台名称" prop="toplatformName" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.toplatformName !== null && scope.row.toplatformName !== ''">{{scope.row.toplatformName}}</span>
                    <span v-else>N/A</span>
                </template>
            </el-table-column>
            <el-table-column sortable min-width="130px"   label="海管情况" prop="quantity" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.quantity !== null && scope.row.quantity !== ''"> {{Number(scope.row.quantity).toFixed(2)}}</span>
                    <span v-else>N/A</span>
                </template>
            </el-table-column>
          <el-table-column sortable   label="泵能耗预测" min-width="130px" prop="pumpEnergyConsumeForecast" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.pumpEnergyConsumeForecast !== null && scope.row.pumpEnergyConsumeForecast !== ''">{{scope.row.pumpEnergyConsumeForecast}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column sortable min-width="130px"   label="变频器" prop="frequencyConverter" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.frequencyConverter !== null && scope.row.frequencyConverter !== ''">{{scope.row.frequencyConverter}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
          <el-table-column sortable min-width="130px"   label="变压器" prop="transformer" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.transformer !== null && scope.row.transformer !== ''">{{scope.row.transformer}}</span>
                  <span v-else>N/A</span>
              </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </pagePanel>
  </div>
</template>

<script>
import { queryMeasurePlanList } from "@/api/rem/actionplanmanagement";
import { pumpReplaceDetail } from "@/api/rem/welldynamicanalysis";
import {
    measureRecommend,
} from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
import {exportExcel} from "@/lib/exportExcel";
export default {
  data() {
    return {
      open: false, // 新增弹框
      dialogVisible: false, //运行计算展示弹窗
      title: "", // 弹窗标题
      company: [],
      oilfield: [],
      deptSelect: [],
      // 表格数据
      noticeList: [],
      queryParams: { actionEvent: "", assetCode: "", month: "", ogfId: "", wellNo: "",selectPlatform:'' },
      // 是否展开，默认全部展开
      isExpandAll: true,
      deptList: [],
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 选中数组
      ids: [],
        date:'',
      // 保存数组
      savelist: [],
    };
  },
  created() {
      if(this.$route.query.platform){
          this.getList(); 
      }
   
    // this.choiceDepts(); // 获取组织机构
  },
  methods: {
    show(data) {
      this.queryParams.ogfId = data.selectOilField;
      this.queryParams.selectPlatform = data.selectPlatform;
      this.date = data.endTime
      this.getinfo();
    }, 
      getinfo(){
        if(this.queryParams.selectPlatform == ''){
            this.queryParams.selectPlatform = '3FC9A818F5BC43B88270DB80BBB3018F'
        }
          let list =
              {
                  oilFieldId: "3FC9A818F5BC43B88270DB80BBB3018F",
                  selectBlock: "3FC9A818F5BC43B88270DB80BBB3018F",
                  evaluationDate: this.date,
                  platformId:this.queryParams.selectPlatform,
                  timeGranularityCode: "",
                  wellId: "",
                  showNormal: true
              }
          measureRecommend(list).then((res)=>{
              const wells = []
              res.data?.data?.indicatorAnalysisDetailInfos.map((n)=>{
                  if(n.name == '换大泵'){
                      n.basis.map((j)=>{
                          wells.push(j.id)
                      })
                  }
              })
              let data = {
                  date: this.date,
                  ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
                  platId: this.queryParams.selectPlatform,
                  wellIds:wells,
              };
              pumpReplaceDetail(data).then((res) => {
                  if(res.data.code == 200){
                      this.noticeList = res.data.data;
                  }else{
                      this.noticeList = []
                  }
              });
          })

      },
      doDownExcel() {
          exportExcel("#xczyjhb", "措施计划情况表");
      },
    getList() {
        let list = 
        {
            oilFieldId: "3FC9A818F5BC43B88270DB80BBB3018F",
            selectBlock: "3FC9A818F5BC43B88270DB80BBB3018F",
            evaluationDate: this.$route.query.currentDate, 
            platformId: this.$route.query.platform,
            timeGranularityCode: "",
            wellId: "",
            showNormal: true
        }       
        measureRecommend(list).then((res)=>{
            const wells = []
            res.data?.data?.indicatorAnalysisDetailInfos.map((n)=>{
                if(n.name == '换大泵'){
                    n.basis.map((j)=>{
                        wells.push(j.id)
                    })
                }
            })
            let data = {
                date: this.$route.query.currentDate,
                ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
                platId: this.$route.query.platform,
                wellIds:wells,
            };
            pumpReplaceDetail(data).then((res) => {
                if(res.data.code == 200){
                    this.noticeList = res.data.data;
                }else{
                    this.noticeList = []
                }
            });
        })
      
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
::v-deep .el-table__header-wrapper {
  .cell {
    height: auto !important;
  }
}
.pertable thead .el-table-column--selection .cell {
  display: none;
}
#xczyjhb {
    ::v-deep .el-table__header-wrapper .cell {
        height: auto;
        line-height: 18px;
        white-space: pre;
    }
}
</style>
