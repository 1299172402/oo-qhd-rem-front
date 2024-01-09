<!-- 区块辅助分析 -->
<template>
  <div class="app-container">
    <headerSearch style="height: 80px">
      <div class="g-row-flex-V g-w100 g-h100">
        <span class="title" style="margin-left: 20px">油田：</span>
        <el-select v-model="selectOilField" placeholder="请选择" filterable @change="getFieldsDataApi">
          <el-option v-for="item in oilField" :key="item.ogfId" :label="item.ogfName" :value="item.ogfId"></el-option>
        </el-select>
        <!--开发构成曲线不显示 区块选择框-->
        <span
          style="margin-left: 20px"
          v-show="!(currentModule == 'yieldCompositionCurve' || currentModule == 'developmentStatusTable')"
          class="title"
          >区块：</span
        >
        <el-select
          v-show="!(currentModule == 'yieldCompositionCurve' || currentModule == 'developmentStatusTable')"
          v-model="selectBlock"
          placeholder="请选择"
          filterable
        >
          <el-option
            v-for="item in block"
            :key="item.reservoirAnalyseUnitId"
            :label="item.reservoirAnalyseUnitName"
            :value="item.reservoirAnalyseUnitId"
          ></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" style="margin-left: 20px" @click="doSearch">搜索</el-button>
        <el-button class="commonBtn" icon="el-icon-refresh" @click="resetting">重置</el-button>
      </div>
    </headerSearch>

    <pagePanelNew style="height: calc(100% - 100px)" class="g-w100">
      <div
        class="pagepanel-btns"
        style="
          height: 34px;
          margin-bottom: 10px;
          display: flex;
          justify-content: flex-end;
          position: absolute;
          right: 20px;
          top: 16px;
          z-index: 2;
        "
      >
        <!-- minIo上传 -->
        <el-button
          v-if="isUpdateFile"
          type="primary"
          icon="el-icon-upload2"
          style="margin-left: auto !important"
          @click="ljpmUploadDialogLast"
          >上传文档</el-button
        >
        <!-- minIo下载 -->
        <el-button
          type="primary"
          icon="el-icon-download"
          style="margin-left: 15px"
          :disabled="downloadButton"
          @click="doDownLoadNew"
          >下载</el-button
        >
      </div>

      <el-tabs class="g-pageHeader" style="margin-bottom: 15px" v-model="activeName" topline @tab-click="handleClick">
        <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.label" :name="item.name">
          <sliderTabs :tabs="item.modules" :currentModule="currentModule" @tabTabs="tabTabs"></sliderTabs>
        </el-tab-pane>
      </el-tabs>

      <!-- <keep-alive :include="[]" :max="10" v-if="selectBlock"> -->
        <component
          :is="component"
          ref="componentCustom"
          :oilFieldId="selectOilField"
          :block-id="selectBlock"
          @childPara="changeChildParam"
        ></component>
      <!-- </keep-alive> -->
    </pagePanelNew>

    <!-- minIo上传 -->
    <el-dialog
      custom-class="border"
      title="上传文档"
      :visible.sync="ljpmDialogLast"
      width="20%"
      :before-close="ljpmDialogCloseLast"
      :style="{ 'min-width': '1800px' }"
    >
      <div style="display: flex; justify-content: center">
        <file-upload
          v-model="imageurl"
          style="width: 250px"
          :limit="limit"
          :fileSize="20"
          :is-show-tip="false"
          biz-path="rem/oo-qhd-rem-agg"
          :file-type="fileType"
          @change="getResData"
        />
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button class="cancelBtn" @click="ljpmDialogCloseLast">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { QueryOgfDetail, QueryReservoirAnalyseUnit, userListByUserNames } from "@/api/rem/marster.js";
import sliderTabs from "./components/slider-tabs.vue";
// Minio
import FileUpload from "@/components/intelligentOilfield/FileUpload/index.vue";
import { addRemUploadFileMinio } from "@/api/rem/remuploadfileminio";

export default {
  name: "blockAnalysisAided",
  components: {
    sliderTabs,
    FileUpload,
  },
  data() {
    return {
      //minIo
      isUpdateFile: true, //是否显示上传文档按钮
      ljpmDialogLast: false,
      limit: 1,
      fileType: ["pdf"],
      imageurl: "",
      operationTypeList: {
        geologicalMap: {
          //综合地质图
          operationType: "BLOCKZHDZT",
          limit: 1,
          fileType: ["pdf"],
        },
        structuralMap: {
          //小层顶面构造图
          operationType: "BLOCKXCDMGZT",
          limit: 1,
          fileType: ["bmp", "jpg", "jpeg", "png"],
        },
        porosityDevelopment: {
          //地震属性图
          operationType: "BLOCKDZSXT",
          limit: 1,
          fileType: ["bmp", "jpg", "jpeg", "png", "pdf"],
        },
        sedimentaryMicrofacies: {
          //沉积相图
          operationType: "BLOCKCJXT",
          limit: 1,
          fileType: ["bmp", "jpg", "jpeg", "png", "pdf"],
        },
        permeabilityDistribution: {
          //渗透率分布图
          operationType: "BLOCKSTLFBT",
          limit: 1,
          fileType: ["bmp", "jpg", "jpeg", "png", "pdf"],
        },
        reservoirProfile: {
          //地震剖面图
          operationType: "BLOCKDZPMT",
          limit: 1,
          fileType: ["bmp", "jpg", "jpeg", "png", "pdf"],
        },
        effectiveThicknessMap: {
          //有效厚度图
          operationType: "BLOCKYXHDT",
          limit: 1,
          fileType: ["bmp", "jpg", "jpeg", "png", "pdf"],
        },
        permeabilityCurve: {
          //相渗透率曲线
          operationType: "BLOCKXSTLQX",
          limit: 1,
          fileType: ["bmp", "jpg", "jpeg", "png", "pdf"],
        },

        reservesReport: {
          //储量报告
          operationType: "BLOCKCLBG",
          limit: 1,
          fileType: ["pdf"],
        },
        developmentPlan: {
          //开发方案
          operationType: "BLOCKJZLTT",
          limit: 1,
          fileType: ["pdf"],
        },
        developmentAdjustmentPlan: {
          //开发调整方案
          operationType: "BLOCKKFTZFA",
          limit: 1,
          fileType: ["pdf"],
        },
        wellPattern: {
          //井网图
          operationType: "BLOCKJWT",
          limit: 1,
          fileType: ["bmp", "jpg", "jpeg", "png"],
        },
        cumulativeOilWaterProduction: {
          //累产液产油现状图
          operationType: "BLOCK",
          limit: 1,
          fileType: ["bmp", "jpg", "jpeg", "png", "pdf"],
        },
        remainingOil: {
          //含油饱和度分布图
          operationType: "BLOCKHYBHDFBT",
          limit: 1,
          fileType: ["bmp", "jpg", "jpeg", "png", "pdf"],
        },
        oilwaterIsoline: {
          //液油含水等值线图
          operationType: "BLOCK",
          limit: 1,
          fileType: ["bmp", "jpg", "jpeg", "png", "pdf"],
        },
        liquidOilDifferenceDiagram: {
          //液油含水差值图
          operationType: "BLOCK",
          limit: 1,
          fileType: ["bmp", "jpg", "jpeg", "png", "pdf"],
        },
        totalPressureDropDiagram: {
          //地层压力分布图
          operationType: "BLOCK",
          limit: 1,
          fileType: ["bmp", "jpg", "jpeg", "png", "pdf"],
        },
        differentialPressureDiagram: {
          //生产压差图
          operationType: "BLOCK",
          limit: 1,
          fileType: ["bmp", "jpg", "jpeg", "png", "pdf"],
        },
        fluidStrengthEquivalence: {
          //采液强度等值图
          operationType: "BLOCK",
          limit: 1,
          fileType: ["bmp", "jpg", "jpeg", "png", "pdf"],
        },
        isogramOfWaterInjectionIntensity: {
          //注水强度等值图
          operationType: "BLOCK",
          limit: 1,
          fileType: ["bmp", "jpg", "jpeg", "png", "pdf"],
        },
        cumulativeOilProductionPerMeter: {
          //米采指数
          operationType: "BLOCK",
          limit: 1,
          fileType: ["bmp", "jpg", "jpeg", "png", "pdf"],
        },
        distributionOfAccumulatedwateroilRatio: {
          //累积水油比分布图
          operationType: "BLOCK",
          limit: 1,
          fileType: ["bmp", "jpg", "jpeg", "png", "pdf"],
        },
        injectionProductionRatioDistribution: {
          //注采比分布图
          operationType: "BLOCK",
          limit: 1,
          fileType: ["bmp", "jpg", "jpeg", "png", "pdf"],
        },
      },
      fileId: "",
      downloadButton: false,
      companyId: "",
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
      component: null,
      activeName: "reservoirData",
      currentModule: "geologicalMap",
      queryParams: {},
      tabs: [
        {
          label: "储层资料",
          name: "reservoirData",
          modules: [
            {
              label: "综合地质图",
              name: "geologicalMap",
            },
            {
              label: "小层顶面构造图",
              name: "structuralMap",
            },
            {
              label: "地震属性图",
              name: "porosityDevelopment",
            },
            {
              label: "沉积相图",
              name: "sedimentaryMicrofacies",
            },
            {
              label: "渗透率分布图",
              name: "permeabilityDistribution",
            },
            {
              label: "地震剖面图",
              name: "reservoirProfile",
            },
            // {
            //     label: "连井剖面图",
            //     name: "wellTieProfiles",
            // },
            // // {一期代码就是注释的
            // //   label: "砂层厚度图",
            // //   name: "sandThicknessMap",
            // // },
            {
              label: "有效厚度图",
              name: "effectiveThicknessMap",
            },
            {
              label: "油藏基础信息",
              name: "basicReservoirInformation",
            },
            {
              label: "相渗透率曲线",
              name: "permeabilityCurve",
            },
            {
              label: "岩心化验数据",
              name: "coreTest",
            },
            {
              label: "五敏分析数据",
              name: "fiveSensitivityAnalysis",
            },
          ],
        },
        {
          label: "流体资料",
          name: "fluidData",
          modules: [
            {
              label: "原油粘度",
              name: "viscosityOfCrudeOil",
            },
            {
              label: "高压物性分析",
              name: "highPressurePhysicalPropertyAnalysis",
            },
            {
              label: "水物性数据",
              name: "waterPhysicalPropertyData",
            },
          ],
        },
        {
          label: "开发资料",
          name: "developmentMaterials",
          modules: [
            {
              label: "储量报告",
              name: "reservesReport",
            },
            {
              label: "开发方案",
              name: "developmentPlan",
            },
            {
              label: "开发调整方案",
              name: "developmentAdjustmentPlan",
            },
            {
              label: "井网图",
              name: "wellPattern",
            },
            // {
            //   label: "井网完善图",//一期代码就是注释的
            //   name: "wellPatternImprovementChart",
            // },
          ],
        },
        {
          label: "动态资料",
          name: "dynamicInformation",
          modules: [
            {
              label: "累产液产油现状图",
              name: "cumulativeOilWaterProduction",
            },
            {
              label: "含油饱和度分布图",
              name: "remainingOil",
            },
            {
              label: "液油含水等值线图",
              name: "oilwaterIsoline",
            },
            {
              label: "液油含水差值图",
              name: "liquidOilDifferenceDiagram",
            },
            {
              label: "地层压力分布图",
              name: "totalPressureDropDiagram",
            },
            {
              label: "生产压差图",
              name: "differentialPressureDiagram",
            },
            {
              label: "采液强度等值图",
              name: "fluidStrengthEquivalence",
            },
            {
              label: "注水强度等值图",
              name: "isogramOfWaterInjectionIntensity",
            },
            {
              label: "米采指数",
              name: "cumulativeOilProductionPerMeter",
            },
            {
              label: "累积水油比分布图",
              name: "distributionOfAccumulatedwateroilRatio",
            },
            {
              label: "注采比分布图",
              name: "injectionProductionRatioDistribution",
            },
            {
              label: "综合开发曲线",
              name: "comprehensiveDevelopmentCurve",
            },
            {
              label: "产量构成曲线",
              name: "yieldCompositionCurve",
            },
            {
              label: "开发现状表",
              name: "developmentStatusTable",
            },
            {
              label: "开发指标评价表",
              name: "developmentIndexEvaluationTable",
            },
          ],
        },
      ],
      //子组件返回数据
      childParam: "",
      //获得选择图的种类
      childParamType: "",
    };
  },
  computed: {
    loader() {
      if (!this.currentModule) {
        return null;
      }
      return () => import(`./modules/${this.activeName}/${this.currentModule}.vue`);
    },
  },
  watch: {
    currentModule: {
      immediate: true,
      handler(newName, oldName) {
        this.loader()
          .then(() => {
            // console.log("走then");
            this.component = () => this.loader();
          })
          .catch(() => {
            // console.log("走catch");
          });
      },
    },
  },
  async created() {
    await this.initData();
  },
  methods: {
    //minIo-打开上传组件
    ljpmUploadDialogLast() {
      this.ljpmDialogLast = true;
    },
    //minIo-关闭上传组件
    ljpmDialogCloseLast() {
      this.ljpmFileList = [];
      this.ljpmDialogLast = false;
    },
    //子组件传递的层位参数
    changeChildParam(val, val2) {
      this.childParam = val;
      if (val2) {
        this.childParamType = val2;
      }
    },
    //minIo-监听上传
    getResData(data) {
      let operationType = this.operationTypeList[this.currentModule].operationType;
      if (this.currentModule == "cumulativeOilWaterProduction" && this.childParamType == "BUBBLE") {
        //如果是累产液产油现状图并且是泡泡图
        if (this.childParamType == "BUBBLE") {
          //泡泡图
          operationType = "BLOCKLCYCYXZTBUBBLE";
        }
      }
      let params = {
        fileId: data[0].id,
        filestrId: data[0].name,
        remUploadFileMinioId: "",
        operationId:
          operationType == "BLOCK"
            ? this.selectBlock
            : this.selectBlock + (this.childParam ? "-" + this.childParam : ""),
        operationType,
      };
      this.uploadFile(params);
    },
    uploadFile(params) {
      this.ljpmDialogLast = false;
      addRemUploadFileMinio(params).then((res) => {
        if (res.data.code == 200) {
          this.$message.success("文件上传成功!");
          this.ljpmDialogLast = false;
          this.doSearch();
          this.imageurl = ""; // 清空已选择的文件
        } else {
          this.$message.error("文件上传失败!");
          this.ljpmDialog = false;
          this.doSearch();
          this.imageurl = ""; // 清空已选择的文件
        }
      });
    },
    //minIo-下载
    doDownLoadNew() {
      this.$refs.componentCustom.doDownLoad();
    },

    //重置
    resetting() {
      let activeName = this.activeName;
      let currentModule = this.currentModule;
      this.currentModule = "";
      this.$nextTick(() => {
        Object.assign(this.$data, this.$options.data());
        this.activeName = activeName;
        this.currentModule = currentModule;
        this.initData();
      });
    },
    //点击一级
    handleClick(tab) {
      let index = Number(tab.index);
      this.activeName = tab.name;
      this.currentModule = this.tabs[index].modules[0].name;
      this.childParam = ""; //清空层位
      this.isUpdateFile = this.operationTypeList[this.currentModule] ? true : false;

      if (this.operationTypeList[this.currentModule] && this.operationTypeList[this.currentModule].limit) {
        this.limit = this.operationTypeList[this.currentModule].limit;
        this.fileType = this.operationTypeList[this.currentModule].fileType;
      }
    },
    //点击二级
    tabTabs(name) {
      this.currentModule = name;
      this.childParam = ""; //清空层位

      this.isUpdateFile = this.operationTypeList[this.currentModule] ? true : false;
      if (this.operationTypeList[this.currentModule] && this.operationTypeList[this.currentModule].limit) {
        this.limit = this.operationTypeList[this.currentModule].limit;
        this.fileType = this.operationTypeList[this.currentModule].fileType;
      }
    },
    //初始化页面
    async initData() {
      let params = {
        searchKeys: [this.$store.getters["user/userDetail"].user.userName],
      };
      await userListByUserNames(params).then((res) => {
        if (res.data.code == 200) {
          this.companyId =
            res.data.data[0]?.currentTenantBindOrgId
              ? res.data.data[0].currentTenantBindOrgId
              : undefined;
        }
      });
      await QueryOgfDetail({ operationZoneId: this.companyId }).then((data) => {
        let code = data.data.code;
        if (code == 200) {
          this.oilField = data.data.data;
          if (this.companyId === "715AD1CD60484BB59E737CD18A9DE44A") {
            this.selectOilField = "3FC9A818F5BC43B88270DB80BBB3018F";
          } else {
            this.selectOilField = this.oilField[0].ogfId ? this.oilField[0].ogfId : undefined;
          }
        }
      });
      //区块信息初始化
      await QueryReservoirAnalyseUnit({ ogfId: this.selectOilField }).then((res) => {
        if (res.data.code == 200) {
          this.block = res.data.data;
          this.block.unshift({
            reservoirAnalyseUnitId: this.selectOilField,
            reservoirAnalyseUnitName: "全部",
            reservoirAnalyseUnitNo: "全部",
          });
          if (this.block.length) {
            this.selectBlock = this.selectOilField;
          }
        }
      });
      this.$nextTick(() => {
        this.doSearch();
      });
    },
    //获取区块信息
    async getFieldsDataApi() {
      await QueryReservoirAnalyseUnit({ ogfId: this.selectOilField }).then((res) => {
        if (res.data.code == 200) {
          this.block = res.data.data;
          this.block.unshift({
            reservoirAnalyseUnitId: this.selectOilField,
            reservoirAnalyseUnitName: "全部",
            reservoirAnalyseUnitNo: "全部",
          });
          if (this.block.length) {
            this.selectBlock = this.selectOilField;
          }
        }
      });
    },
    //搜索功能
    doSearch() {
      if (this.$refs.componentCustom.selectPosition) {
        this.$refs.componentCustom.selectPosition = "";
      }
      //调用子组件的事件
      this.loader()
        .then(() => {
          // console.log("走then");
          this.$refs.componentCustom.doSearch();
        })
        .catch(() => {
          // console.log("走catch");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  height: 100%;
}

::v-deep .upload-demo {
  .el-upload {
    margin-top: 0;
    border: none;
  }
}

::v-deep .el-upload {
  border: 0px;
  border-radius: 0px;
}

::v-deep .el-upload-list {
  display: none;
}
</style>
