<!-- 措施计划情况 -->
<template>
  <div class="app-container" style="height: 100%">
    <pagePanel headerTitle="措施计划情况表" style="height: calc(100% - 20px)">
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
          <el-table-column sortable  label="井号" prop="wellNo" min-width="200px" align="center"></el-table-column>
          <el-table-column label="生产层位" sortable prop="layerName" min-width="200px" align="center"></el-table-column>
          <el-table-column label="所属区块" sortable prop="blockName" min-width="200px" align="center"></el-table-column>
          <el-table-column :label="`油藏厚度 \n（m）`"  sortable width="130px" prop="reservoirThickness" align="center"></el-table-column>
          <el-table-column :label="`水平段长度 \n（m）`" sortable min-width="130px" prop="horizonIntervalLen" align="center"></el-table-column>
          <el-table-column label="完井方式" sortable min-width="130px" prop="completionMethod" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="生产现状" prop="name" align="center">
          <el-table-column sortable label="投产日期" min-width="130px" prop="startDate" align="center"></el-table-column>
          <el-table-column sortable :label="`日产液\n（m³/d）`" min-width="130px" prop="fluidProdDaily" align="center"></el-table-column>
          <el-table-column sortable :label="`日产油\n（m³/d）`" min-width="130px" prop="oilProdDaily" align="center"></el-table-column>
          <el-table-column sortable :label="`含水\n（%）`" prop="waterRatio" align="center"></el-table-column>
          <el-table-column sortable :label="`泵频\n（Hz）`" prop="pumpFrequency" align="center"></el-table-column>
          <el-table-column sortable :label="`累产油\n（万方）`" prop="cumOilProdYearly" align="center"></el-table-column>
          <el-table-column sortable label="地层压力测试时间" prop="testDate" min-width="140px" align="center"></el-table-column>
          <el-table-column sortable :label="`测试压力值\n（MPa）`" min-width="130px" prop="basalLevelStaticPress" align="center"></el-table-column>
          <el-table-column sortable :label="`流压\n（MPa）`" min-width="130px" prop="flowPress" align="center"></el-table-column>
          <el-table-column sortable :label="`生产压差\n（MPa）`" min-width="130px" prop="productPress" align="center"></el-table-column>
          <el-table-column sortable min-width="100px" label="井控储量" prop="probReservesWell" align="center"></el-table-column>
          <el-table-column sortable   label="剩余可采储量" prop="remainingRecoverableReserves" min-width="130px" align="center"></el-table-column>
          <el-table-column sortable  :label="`采液指数\n（m³/d.MPa）`" min-width="130px" prop="fluidProductionIndex" align="center"></el-table-column>
        </el-table-column>
        <el-table-column   label="预测值" prop="name" align="center">
          <el-table-column sortable min-width="100px"  label="产液值" prop="forecastFluid" align="center"></el-table-column>
          <el-table-column sortable min-width="100px"  label="含水" prop="forecastWaterRatio" align="center"></el-table-column>
          <el-table-column sortable min-width="100px"  label="日增油" prop="forecastOilInc" align="center"></el-table-column>
          <el-table-column sortable min-width="100px"  label="日产油" prop="forecastOil" align="center"></el-table-column>
          <el-table-column sortable min-width="100px"  label="生产压差" prop="forecastProductPress" align="center"></el-table-column>
          <el-table-column sortable min-width="100px"  label="流压" prop="forecastFlowPress" align="center"></el-table-column>
        </el-table-column>
        <el-table-column   label="其他因素" prop="name" align="center">
          <el-table-column sortable min-width="130px"   label="排量效率" prop="displacementEfficiency" align="center"></el-table-column>
          <el-table-column sortable min-width="130px"  label="历史出砂" prop="historySandDay" align="center"></el-table-column>
          <el-table-column sortable min-width="130px"   label="近期出砂" prop="sandDay" align="center"></el-table-column>
          <el-table-column sortable min-width="130px"   label="出秒量" prop="sandValue" align="center"></el-table-column>
          <el-table-column sortable min-width="130px"   label="电泵情况" prop="pumpCondition" align="center"></el-table-column>
          <el-table-column sortable min-width="130px"   label="管柱情况" prop="one" align="center"></el-table-column>
          <el-table-column sortable min-width="130px"   label="海管情况" prop="one" align="center"></el-table-column>
          <el-table-column sortable   label="泵能耗预测" min-width="130px" prop="one" align="center"></el-table-column>
          <el-table-column sortable min-width="130px"   label="变频器" prop="one" align="center"></el-table-column>
          <el-table-column sortable min-width="130px"   label="变压器" prop="one" align="center"></el-table-column>
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
      queryParams: { actionEvent: "", assetCode: "", month: "", ogfId: "", wellNo: "" },
      // 是否展开，默认全部展开
      isExpandAll: true,
      deptList: [],
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 选中数组
      ids: [],
      // 保存数组
      savelist: [],
    };
  },
  created() {
    this.getList();
    // this.choiceDepts(); // 获取组织机构
  },
  methods: {
    show(data) {
      this.queryParams.ogfId = data.selectOilField;
      this.queryParams.selectPlatform = data.assetCode;
      this.getList();
    },
    getList() {
        let list = 
        {
            oilFieldId: "3FC9A818F5BC43B88270DB80BBB3018F",
            selectBlock: "3FC9A818F5BC43B88270DB80BBB3018F",
            evaluationDate: this.$route.query.currentDate, 
            platformId: "3FC9A818F5BC43B88270DB80BBB3018F",
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
                platId: "3FC9A818F5BC43B88270DB80BBB3018F",
                wellIds:wells,
            };
            pumpReplaceDetail(data).then((res) => {
                this.noticeList = res.data.data;
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
