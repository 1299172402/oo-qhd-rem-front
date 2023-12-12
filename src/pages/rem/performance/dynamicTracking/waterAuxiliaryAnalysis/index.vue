<!-- 水井辅助分析 -->
<template>
  <div style="display: flex; flex-direction: row; height: calc(100%)">
    <div style="height: 100%">
      <treeSelection
        ref="treeSelection"
        level="5"
        wellType="注水井"
        :defaultCheckedKeys="defaultCheckedKeys"
        @getSelectItems="getSelectItems"
      />
    </div>
    <div
      class="app-container"
      style="
        display: flex;
        flex-direction: column;
        height: 100%;
        flex: 1;
        right: 0;
        overflow: hidden;
        margin-left: 20px;
      "
    >
      <headerSearch style="height: 80px">
        <div class="g-row-flex-V g-w100 g-h100">
          <span class="title">油田：</span>
          <el-select
            v-model="selectOilField"
            placeholder="请选择"
            filterable
            style="margin-right: 15px"
            @change="doChangeYt"
          >
            <el-option v-for="item in oilField" :key="item.ogfId" :label="item.ogfName" :value="item.ogfId"></el-option>
          </el-select>
          <span class="title">平台：</span>
          <el-select
            v-model="selectPlatform"
            placeholder="请选择"
            filterable
            @change="doChangePT"
            style="width: 220px; margin-right: 15px"
          >
            <el-option
              v-for="item in platform"
              :key="item.platformId"
              :label="item.platformCode"
              :value="item.platformId"
            ></el-option>
          </el-select>
          <span class="title">井号：</span>
          <el-select v-model="selectWellId" class="f2" filterable @change="onChangeWell" style="width: 180px">
            <el-option
              v-for="item in wellData"
              :key="item.wellId"
              :label="item.wellName"
              :value="item.wellId"
            ></el-option>
          </el-select>
          <el-button type="primary" icon="el-icon-search" style="margin-left: 15px" @click="doSearch">搜索</el-button>
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
          <!-- 返回 -->
          <el-button type="primary" v-if="$route.query.wellId" style="margin-left: 15px" @click="goBack"
            >返回</el-button
          >
        </div>

        <el-tabs class="g-pageHeader" style="margin-bottom: 15px" v-model="activeName" topline @tab-click="handleClick">
          <el-tab-pane
            style="height: auto"
            v-for="(item, index) in tabs"
            :key="index"
            :label="item.label"
            :name="item.name"
          >
            <div class="tab-view">
              <!-- <el-button v-for="(module, index) in item.modules" :key="index" :class="currentModule == module.name ? 'el-button--primary' : 'commonBtn'" @click="tabsClick(module)">
                                {{ module.label }}
                            </el-button> -->
              <sliderTabs :tabs="item.modules" :currentModule="currentModule" @tabTabs="tabsClick"></sliderTabs>
              <div class="select-view" v-if="currentModule == 'homeworkWellHistory'">
                <span class="title" style="margin-left: 20px">大事简要：</span>
                <el-select
                  v-model="majorEventsBrieflyValue"
                  placeholder="请选择"
                  filterable
                  clearable
                  @change="majorEventsBrieflyChange"
                >
                  <el-option
                    v-for="(item, index) in majorEventsBrieflyList"
                    :key="index"
                    :label="item.chronicle"
                    :value="item.chronicle"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <!-- <keep-alive :include="[]" :max="10" v-if="blockId"> -->
        <component
          :is="component"
          ref="componentCustom"
          :oilFeildId="selectOilField"
          :platform="selectPlatform"
          :wellId="selectWellId"
          :blockId="blockId"
          @childPara="changeChildParam"
        >
        </component>
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
  </div>
</template>

<script>
import { QueryOgfDetail, QueryPlatformDetail, QueryWellDetail, userListByUserNames } from "@/api/rem/marster.js";
//miniIo
import { getBlockWell, getMajorEventsBriefly } from "@/api/oilDeposit/rem-04/oilAuxiliaryAnalysis.js";
import FileUpload from "@/components/intelligentOilfield/FileUpload/index.vue";
import { addRemUploadFileMinio } from "@/api/rem/remuploadfileminio";
import { downFile } from "@/components/upload/utils/file";
import FileSaver from "file-saver";
import treeSelection from "@/pages/rem/basic/components/treeSelection.vue";
import sliderTabs from "./components/slider-tabs.vue";

export default {
  name: "WaterAuxiliaryAnalysis",
  components: { FileUpload, treeSelection, sliderTabs },
  data() {
    return {
      // 主数据树结构默认选中的值
      defaultCheckedKeys: [],
      //minIo
      isUpdateFile: false, //是否显示上传文档按钮
      ljpmDialogLast: false,
      limit: 1,
      fileType: ["pdf"],
      imageurl: "",
      operationTypeList: {
        seismicProfile: {
          //测井曲线
          operationType: "DZPMT",
          limit: 1,
          fileType: ["bmp", "jpg", "jpeg", "png", "pdf"],
        },
        wellLoggingCurve: {
          //测井曲线
          operationType: "WATERCJQX",
          limit: 1,
          fileType: ["bmp", "jpg", "jpeg", "png", "pdf"],
        },
        whileDrillingTrajectory: {
          //地质探边图
          operationType: "WATERDZTBT",
          limit: 1,
          fileType: ["bmp", "jpg", "jpeg", "png", "pdf"],
        },
        wellNetworkDiagram: {
          //井网图
          operationType: "WATERJWT",
          limit: 1,
          fileType: ["bmp", "jpg", "jpeg", "png", "pdf"],
        },
        completionStringDrawing: {
          //完井管柱图
          operationType: "WATERWJGZT",
          limit: 1,
          fileType: ["bmp", "jpg", "jpeg", "png", "pdf"],
        },
        wellTestReport: {
          //试井报告
          operationType: "WATERSJBG",
          limit: 1,
          fileType: ["pdf"],
        },
        drillingReport: {
          //钻完井报告
          operationType: "SJZWJBG",
          limit: 1,
          fileType: ["pdf"],
        },
        completionReport: {
          //完井完工报告
          operationType: "SJWJWGBG",
          limit: 1,
          fileType: ["pdf"],
        },
        geologicalSummary: {
          //完井地质总结
          operationType: "SJWJDZZJ",
          limit: 1,
          fileType: ["pdf"],
        },
      },
      fileId: "",
      downloadButton: false,

      props: {
        key: "wellId",
        label: "wellName",
      },
      ljpmWellData: [],
      ljUploadForm: {
        direction: "横向",
        chooseWell: [],
      },
      majorEventsBrieflyValue: "", //大事间要绑定值
      majorEventsBrieflyList: [], //大事间要数据源
      //连井剖面是否选中
      ljpmTag: false,
      //连井剖面弹窗
      ljpmDialog: false,
      companyId: "",
      //选择油田
      selectOilField: "",
      //油田列
      oilField: [],
      //选择平
      selectPlatform: "",
      //平台列
      platform: [],
      //选择单井信息
      selectWellId: "",
      //区块id
      blockId: "",
      //采油井信
      wellData: [],
      fileList: [],
      queryParams: {},
      component: null,
      activeName: "staticData",
      currentModule: "smallLayerStructureDiagram",
      tabs: [
        {
          label: "静态资料",
          name: "staticData",
          modules: [
            {
              label: "小层顶面构造图",
              name: "smallLayerStructureDiagram",
            },
            {
              label: "地震属性图",
              name: "smallFloorPlan",
            },
            {
              label: "测井曲线",
              name: "wellLoggingCurve",
            },
            // {
            //     label: "固井质量测井图",
            //     name: "cementingQualityLog",
            // },
            {
              label: "地震剖面图",
              name: "seismicProfile",
            },
            {
              label: "沉积相图",
              name: "theSedimentaryFaciesMap",
            },
            {
              label: "地质探边图",
              name: "whileDrillingTrajectory",
            },
            {
              label: "连井剖面图",
              name: "connecting",
            },
            {
              label: "测井解释成果",
              name: "loggingInterpretationResult",
            },
            // {
            //     label: '小层数据',
            //     name: 'smallLayerData'
            // },
            {
              label: "射孔数据",
              name: "perforationData",
            },
            {
              label: "井斜数据",
              name: "driftData",
            },
            {
              label: "水井分析报告",
              name: "waterReport",
            },
            {
              label: "视吸水指数",
              name: "injectivityIndex",
            },
            {
              label: "示踪剂",
              name: "tracer",
            },
          ],
        },
        {
          label: "生产动态资料",
          name: "productionDynamicData",
          modules: [
            {
              label: "生产数据",
              name: "productionData",
            },
            {
              label: "井网图",
              name: "wellNetworkDiagram",
            },
            {
              label: "完井管柱图",
              name: "completionStringDrawing",
            },
            {
              label: "作业井史",
              name: "homeworkWellHistory",
            },
            {
              label: "单井基本信息表",
              name: "individualWellBasicInformationSheet",
            },
            {
              label: "生产段状态",
              name: "productionSectionStatus",
            },
          ],
        },
        {
          label: "动态监测资料",
          name: "dynamicConitoringData",
          modules: [
            {
              label: "分层调配测试",
              name: "fluidProducingProfile",
            },
            {
              label: "压降测试",
              name: "pressureTest",
            },
            {
              label: "试井",
              name: "wellTestReport",
            },
            {
              label: "化验数据",
              name: "testData",
            },
            {
              label: "分层调配数据",
              name: "stratificationTesting",
            },
          ],
        },
        {
          label: "钻完井资料",
          name: "drillingCompletion",
          modules: [
            {
              label: "钻完井报告",
              name: "drillingReport",
            },
            {
              label: "完井完工报告",
              name: "completionReport",
            },
            {
              label: "完井地质总结",
              name: "geologicalSummary",
            },
          ],
        },
      ],
      //文件名称对应项
      tabsPathName: [
        {
          name: "smallFloorPlan",
          pathName: "SUBLAYER",
        }, //小层平面图
        {
          name: "seismicAttributeMap",
          pathName: "SEISMIC_ATTRIBUTES",
        }, //地震属性图
        {
          name: "theSedimentaryFaciesMap",
          pathName: "DEPOSITION",
        }, //沉积相图
        {
          name: "smallLayerStructureDiagram",
          pathName: "TOP_SUBLAYER",
        }, //小层顶面构造图
        {
          name: "wellLoggingCurve",
          pathName: "LOGGING",
        }, //测井曲线
        {
          name: "cementingQualityLog",
          pathName: "CEMENTING",
        }, //固井质量测井图
        {
          name: "seismicProfile",
          pathName: "SEISMIC_PROFILE",
        }, //地震剖面图
        {
          name: "whileDrillingTrajectory",
          pathName: "WHILE_DRILLING",
        }, //随钻轨迹图
        {
          name: "wellNetworkDiagram",
          pathName: "WELL_PATTERN",
        }, //井网图
        {
          name: "completionStringDrawing",
          pathName: "COMPLETION_PIPE",
        }, //完井管状图
        {
          name: "fluidProducingProfile",
          pathName: "SUCTION_PROFILE",
        }, //产液剖面
        //{name:'saturationLog',pathName:'SATURATION_LOG'}, //饱和度测井
        {
          name: "wellTestReport",
          pathName: "WELL_TEST_REPORT",
        }, //试井报告
        {
          name: "connecting",
          pathName: "CONNECTING",
        }, //试井报告
      ],
      //子组件返回数据
      childParam: "",
    };
  },
  computed: {
    loader() {
      if (!this.currentModule) {
        return null;
      }
      if (this.currentModule == "seismicAttributeMap") {
        this.ljpmTag = true;
      } else {
        this.ljpmTag = false;
      }
      if (this.currentModule == "waterReport") {
        this.aName = this.activeName;
        this.ctModule = this.currentModule;
        return () => import(`../waterReport/index.vue`);
      } else {
        this.aName = this.activeName;
        this.ctModule = this.currentModule;
        return () => import(`./modules/${this.activeName}/${this.currentModule}.vue`);
      }
    },
  },
  watch: {
    currentModule: {
      immediate: true,
      handler(newName, oldName) {
        this.loader()
          .then(() => {
            this.component = () => this.loader();
          })
          .catch(() => {
            console.log("走catch");
          });
      },
    },
    "$route.query.wellId"() {
      // 监听路由变化
      console.log("id 变化了", this.$route.query.wellId);
      this.initData();
      this.doSearch();
    },
  },
  mounted() {
    this.initData();
    this.doSearch();
  },
  methods: {
    //minIo-打开上传组件
    ljpmUploadDialogLast() {
      this.limit = this.operationTypeList[this.currentModule].limit;
      this.fileType = this.operationTypeList[this.currentModule].fileType;
      this.ljpmDialogLast = true;
    },
    //minIo-关闭上传组件
    ljpmDialogCloseLast() {
      this.ljUploadForm = {
        direction: "横向",
        chooseWell: [],
      };
      this.ljpmFileList = [];
      this.ljpmDialogLast = false;
    },
    //minIo-监听上传
    getResData(data) {
      let operationType = this.operationTypeList[this.currentModule].operationType;
      let params = {
        fileId: data[0].id,
        filestrId: data[0].name,
        operationId: this.selectWellId,
        operationType,
        remUploadFileMinioId: "",
        uploadTime: "",
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
          this.$refs.form.resetFields();
        } else {
          this.$message.error("文件上传失败!");
          this.ljpmDialog = false;
          this.doSearch();
          this.imageurl = ""; // 清空已选择的文件
          this.$refs.form.resetFields();
        }
      });
    },
    //minIo-下载
    doDownLoadNew() {
      //如果是产液剖面||饱和度测井-则下载表格
      // if(this.currentModule=='fluidProducingProfile'||this.currentModule=='saturationLog'){
      this.$refs.componentCustom.doDownLoad();
      // }
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
    //点击一级tabs
    handleClick(tab) {
      this.activeName = tab.name;
      this.currentModule = this.tabs[tab.index].modules[0].name;

      this.isUpdateFile = this.operationTypeList[this.currentModule] ? true : false;
      if (this.isUpdateFile) {
        this.limit = this.operationTypeList[this.currentModule].limit;
        this.fileType = this.operationTypeList[this.currentModule].fileType;
      }
    },
    //点击二级菜单
    tabsClick(name) {
      if (name == "stratificationTesting") {
        //分层调配
        let url = `https://ipm.tjioms-dev.tjltd.cnooc/#/waterflood/merge`;
        window.open(url, "_blank");
      } else if (name == "injectivityIndex") {
        window.open("https://ipm.tjioms-dev.tjltd.cnooc/#/waterflood/merge", "_blank");
      } else {
        this.currentModule = name;
        this.isUpdateFile = this.operationTypeList[this.currentModule] ? true : false;
        if (this.isUpdateFile) {
          this.limit = this.operationTypeList[this.currentModule].limit;
          this.fileType = this.operationTypeList[this.currentModule].fileType;
        }
      }
    },
    //初始化 数据
    async initData() {
      let wellId = this.$route.query.wellId;
      let params = {
        searchKeys: [this.$store.getters["user/userDetail"].user.userName],
      };
      await userListByUserNames(params).then((res) => {
        if (res.data.code == 200) {
          this.companyId = res.data.data[0]?.currentTenantBindOrgId
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

      if (this.$route.query.oilField) {
        this.selectOilField = this.$route.query.oilField;
      }
      await QueryPlatformDetail({ ogfId: this.selectOilField }).then((res) => {
        if (res.data.code == 200) {
          this.platform = res.data.data;
          this.platform.unshift({
            platformId: this.selectOilField,
            platformCode: "全部",
          });
          if (this.platform.length == 0) {
            this.selectPlatform = "";
          } else {
            this.selectPlatform = this.platform[0].platformId;
          }
        }
      });
      await QueryWellDetail({
        ogfId: this.selectOilField,
        // platformId: this.selectPlatform,
        wellboreType: "注水井",
      }).then((res) => {
        if (res.data.code == 200) {
          this.wellData = res.data.data;
        }
      });
      if (!wellId) {
        if (this.wellData && this.wellData.length > 0) {
          this.selectWellId = this.wellData[0].wellId;
        }
      } else {
        let wellMess = this.wellData.find((item) => {
          return item.wellName == wellId;
        });
        this.selectWellId = wellMess.wellId;
      }
      await this.getBlockWellApi();
      this.defaultCheckedKeys = [this.selectOilField, this.selectPlatform, this.selectWellId];
      this.doSearch();
    },
    //根据井号id获取区块id
    async getBlockWellApi() {
      await getBlockWell({ wellId: this.selectWellId }).then((res) => {
        if (res.data.code == 200) {
          this.blockId = res.data.data?.blockId;
        }
      });
    },
    //搜索功能
    doSearch() {
      this.$refs.componentCustom.wellId = this.selectWellId;
      this.$refs.componentCustom.oilFeildId = this.selectOilField;
      this.$refs.componentCustom.platform = this.selectPlatform;
      if (this.$refs.componentCustom.blockId) {
        this.$refs.componentCustom.blockId = this.blockId;
      }

      if (this.childParam) {
        this.$refs.componentCustom.selectPosition = this.childParam;
      }
      this.majorEventsBrieflyValue = "";
      this.getMajorEventsBriefly();

      if (this.currentModule == "waterReport") {
        this.$refs.componentCustom.queryAll();
      } else {
        this.$refs.componentCustom.doSearch();
      }
    },
    //切换油田修改平台内容
    doChangeYt(val) {
      this.selectPlatform = "";
      this.selectWellId = "";
      QueryPlatformDetail({ ogfId: this.selectOilField }).then((res) => {
        if (res.data.code == 200) {
          this.platform = res.data.data;
          this.platform.unshift({
            platformId: this.selectOilField,
            platformCode: "全部",
          });
          if (this.platform.length == 0) {
            this.selectPlatform = "";
          } else {
            this.selectPlatform = this.platform[0].platformId;
          }
        }
      });
      this.doChangePT(this.selectOilField);
    },
    //平台change
    doChangePT(val) {
      this.selectWellId = "";
      this.getFetchProductionWellsByPlatform(this.selectOilField == val);
    },
    //查询油井信息
    getFetchProductionWellsByPlatform(isOilFieldId) {
      QueryWellDetail({
        ogfId: this.selectOilField,
        platformId: isOilFieldId ? undefined : this.selectPlatform,
        wellboreType: "注水井",
      }).then((res) => {
        if (res.data.code == 200) {
          this.wellData = res.data.data;
          this.selectWellId = this.wellData[0].wellId;
          this.$refs.treeSelection.setCheckedKeys([this.selectOilField, this.selectPlatform, this.selectWellId]);
        }
      });
    },
    //井号-change
    onChangeWell() {
      this.childParam = "";
      this.$refs.componentCustom.selectPosition = this.childParam;
      this.$refs.treeSelection.setCheckedKeys([this.selectOilField, this.selectPlatform, this.selectWellId]);
      this.getBlockWellApi();
    },
    //主数据树结构数选中数据 selectList：选中数据Id集合，selectData：当前选中数据对象
    getSelectItems(selectList, selectData) {
      //作业公司选中数据
      // this.queryParams.companyId = selectList.orgId;
      // 油田选中数据
      this.selectOilField = selectList.ogfId;
      //平台选中数据
      this.selectPlatform = selectList.platformIds;
      // 井号选中数据
      this.selectWellId = selectList.wellIds;
      // 判断如果当前平台，调用获取平台接口
      let isUpdata1 = this.platform.map((item) => item.platformId).includes(selectList.platformIds);
      if (!isUpdata1) {
        this.platform = [];
        QueryPlatformDetail({ ogfId: this.selectOilField }).then((res) => {
          //判断联通状态
          if (res.data.code == 200) {
            this.platform = res.data?.data || [];
            this.platform.unshift({
              platformId: this.selectOilField,
              platformCode: "全部",
            });
          }
        });
      }
      // 判断如果当前井号，调用获取井号接口
      let isUpdata = this.wellData.map((item) => item.wellId).includes(selectList.wellIds);
      if (!isUpdata) {
        this.wellData = [];
        QueryWellDetail({
          ogfId: this.selectOilField,
          platformId: this.selectOilField == this.selectPlatform ? undefined : this.selectPlatform,
          wellboreType: "注水井",
        }).then((res) => {
          if (res.data.code == 200) {
            this.wellData = res.data?.data || [];
          }
        });
      }
    },
    //大事简要数据源接口
    getMajorEventsBriefly() {
      let parmas = {
        ogfId: this.selectOilField,
        platformId: this.selectPlatform,
        wellId: this.selectWellId,
      };
      getMajorEventsBriefly(parmas).then((res) => {
        if (res.data.code == 200) {
          this.majorEventsBrieflyList = res.data.data;
        }
      });
    },
    //zxb大事简要下拉框change事件
    majorEventsBrieflyChange(e) {
      this.majorEventsBrieflyValue = e;
      console.log("this.majorEventsBrieflyValue", this.majorEventsBrieflyValue);
      this.$refs.componentCustom.doSearch(this.majorEventsBrieflyValue);
    },
    //子组件传递参数
    changeChildParam(val) {
      this.childParam = val;
    },
    //返回
    goBack() {
      this.$router.push({
        path: "/dynamicManagement/dynamicTrackingWaterAuxiliary/waterAnalysisReport",
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

.tab-view {
  display: flex;

  .select-view {
    margin-left: 40px;
  }
}

::v-deep .el-upload-list {
  display: none;
}
</style>
