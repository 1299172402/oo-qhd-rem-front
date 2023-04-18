<!-- 油井辅助分析 -->
<template>
  <div class="app-container">
    <headerSearch style="height: 80px">
      <div class="g-row-flex-V g-w100 g-h100">
        <span class="title">油田：</span>
        <el-select
          v-model="selectOilField"
          placeholder="请选择"
          filterable
          clearable
          disabled
          @change="doChangeYt"
          style="margin-right: 20px"
        >
          <el-option
            v-for="item in oilField"
            :key="item.oilFieldId"
            :label="item.name"
            :value="item.oilFieldId"
          ></el-option>
        </el-select>
        <span class="title">平台：</span>
        <el-select
          v-model="selectPlatform"
          style="width: 220px"
          placeholder="请选择"
          filterable
          clearable
          @change="doChangePT"
        >
          <el-option
            v-for="item in platform"
            :key="item.platFormId"
            :label="item.platName"
            :value="item.platFormId"
          ></el-option>
        </el-select>
        <span class="title" style="margin-left: 20px">井号：</span>
        <el-select v-model="selectWellId" filterable clearable @change="onChangeWell">
          <el-option
            v-for="item in wellData"
            :key="item.wellId"
            :label="item.wellName"
            :value="item.wellId"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" style="margin-left: 20px" @click="doSearch">搜索</el-button>
        <el-upload
          ref="upload"
          style="margin-left: 20px"
          class="upload-demo"
          action=""
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :auto-upload="false"
          :on-change="useUploadPic"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :show-file-list="false"
          :on-success="handleSuccess"
          v-show="
            canUpload &&
            !ljpmTag &&
            (currentModule == 'wellNetworkDiagram' ||
              currentModule == 'completionStringDrawing' ||
              currentModule == 'fluidProducingProfile' ||
              currentModule == 'saturationLog' ||
              currentModule == 'wellTestReport')
          "
        >
          <el-button type="primary" icon="el-icon-upload2">上传文档</el-button>
        </el-upload>
        <el-button class="upload-demo" v-show="canUpload && ljpmTag" style="margin-left: 20px" @click="ljpmUploadDialog"
          >上传文档</el-button
        >
        <el-button style="margin-left: 20px" type="primary" icon="el-icon-download" @click="doDownLoad">下载</el-button>
      </div>
    </headerSearch>
    <!-- :style="{ height: calc(100% - 100px)}" -->
    <pagePanelNew
      headerTitle="油井辅助分析"
       show-btn
      :style="{ height: this.currentModule == 'oilReport' ? 'auto' : 'calc(100% - 100px)' }"
      class="g-w100"
    >
      <el-tabs class="g-pageHeader" style="margin-bottom: 15px" v-model="activeName" topline @tab-click="handleClick">
        <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.label" :name="item.name">
          <div class="tab-view">
            <el-button
              v-for="(module, index) in item.modules"
              :key="index"
              :class="currentModule == module.name ? 'el-button--primary' : 'commonBtn'"
              @click="currentModule = module.name"
            >
              {{ module.label }}
            </el-button>
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
      <keep-alive :include="[]" :max="10">
        <component
          :is="component"
          ref="componentCustom"
          :oil-feild-id="selectOilField"
          :platform="selectPlatform"
          :well-id="selectWellId"
          :majorEventsBrieflyValue="majorEventsBrieflyValue"
          @childPara="changeChildParam"
        ></component>
      </keep-alive>
      <el-dialog
        custom-class="border"
        title="连井剖面图上传"
        :visible.sync="ljpmDialog"
        width="50%"
        :before-close="ljpmDialogClose"
      >
        <el-form ref="form" :model="ljUploadForm" label-width="80px">
          <el-form-item label="图片上传">
            <el-upload
              ref="ljpmUpload"
              class="upload-demo"
              action=""
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :on-change="ljpmChange"
              :on-exceed="handleExceed"
              :file-list="ljpmFileList"
              :http-request="httpRequest"
              :auto-upload="false"
            >
              <el-button slot="trigger" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="纵横方向">
            <el-select v-model="ljUploadForm.direction" class="f2" style="width: 200px" clearable>
              <el-option v-for="item in directionList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="井号">
            <el-transfer
              filterable
              :titles="['未选中', '已选中']"
              :filter-method="filterMethod"
              filter-placeholder="请输入"
              :props="props"
              v-model="ljUploadForm.chooseWell"
              :data="ljpmWellData"
            >
            </el-transfer>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ljpmDialogClose">取 消</el-button>
          <el-button type="primary" @click="ljpmUploadSave">确 定</el-button>
        </span>
      </el-dialog>
    </pagePanelNew>
  </div>
</template>

<script>
import {
  fetchOilFields,
  fetchPlatforms,
  uploadFile,
  ljpmImgUploadFile,
  fetchProductionWells,
  fetchProductionWellsByPlatform,
  getLjpmWells,
} from "@/api/oilDeposit/rem-02/primaryinfo.js";
import { getMajorEventsBriefly } from "@/api/oilDeposit/rem-04/oilAuxiliaryAnalysis.js";
// import VSAuth from '@vsui/lib-vueauth4vseaf';
import { getWidgetByAreaUser } from "@/api/oilDeposit/rmm-01/rmm01.js";
export default {
  name: "OilAuxiliaryAnalysis",
  data() {
    return {
      majorEventsBrieflyValue: "", //大事间要绑定值
      majorEventsBrieflyList: [], //大事间要数据源
      //选择油田
      selectOilField: "",
      //油田列表
      oilField: [],
      //选择平台
      selectPlatform: "",
      //平台列表
      platform: [],
      //选择单井信息
      selectWellId: "",
      //采油井信息
      wellData: [],
      ljpmWellData: [],
      fileList: [],
      component: null,
      activeName: "staticData",
      // currentModule: 'smallLayerStructureDiagram',
      currentModule: "loggingInterpretationResult",
      queryParams: {
        ogfId: "",
        platId: "",
      },
      tabs: [
        {
          label: "静态资料",
          name: "staticData",
          modules: [
            // {
            //     label: '小层顶面构造图',
            //     name: 'smallLayerStructureDiagram',
            // },
            // {
            //     label: '地震属性图', //原小层平面图
            //     name: 'smallFloorPlan',
            // },
            // {
            //     label: '连井剖面图', //原地震属性图
            //     name: 'seismicAttributeMap',
            // },
            // {
            //     label: '沉积相图',
            //     name: 'theSedimentaryFaciesMap',
            // },
            /* {
                                 label: "测井曲线",
                                 name: "wellLoggingCurve",
                            },*/
            /*{
                                label: "固井质量测井图",
                                name: "cementingQualityLog",
                              },*/
            // {
            //     label: '地震剖面图',
            //     name: 'seismicProfile',
            // },
            // {
            //     label: '地质探边图',
            //     name: 'whileDrillingTrajectory',
            // },
            {
              label: "测井解释成果",
              name: "loggingInterpretationResult",
            },
            // {
            //     label: "小层数据",
            //     name: "smallLayerData",
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
              label: "油井分析报告",
              name: "oilReport",
            },
            {
              label: "连井剖面图",
              name: "connecting",
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
              label: "压力测试",
              name: "pressureTest",
            },
            {
              label: "产液剖面",
              name: "fluidProducingProfile",
            },
            {
              label: "饱和度测井",
              name: "saturationLog",
            },
            {
              label: "化验数据",
              name: "testData",
            },
            {
              label: "试井报告",
              name: "wellTestReport",
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
          pathName: "PRODUCTION_PROFILE_RESULTS",
        }, //产液剖面
        {
          name: "saturationLog",
          pathName: "SATURATION_LOG",
        }, //饱和度测井
        {
          name: "wellTestReport",
          pathName: "WELL_TEST_REPORT",
        }, //试井报告
        {
          name: "connecting",
          pathName: "CONNECTING",
        }, // 连井剖面图
      ],
      //子组件返回数据
      childParam: "",
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
      canUpload: true,
      //连井剖面是否选中
      ljpmTag: true, //一期默认false，二期没定权限怎么做，先打开为true
      //连井剖面弹窗
      ljpmDialog: false,
      //连井上传图片表单
      props: {
        key: "wellId",
        label: "wellName",
      },
      ljUploadForm: {
        direction: "横向",
        chooseWell: [],
      },
      directionList: [
        {
          label: "横向",
          value: "横向",
        },
        {
          label: "纵向",
          value: "纵向",
        },
      ],
      ljpmFileList: [],
      wellList: [
        {
          prodPlatformName: "1",
          key: "1",
          label: "1",
        },
        {
          prodPlatformName: "2",
          key: "2",
          label: "2",
        },
        {
          prodPlatformName: "1",
          key: "3",
          label: "3",
        },
        {
          prodPlatformName: "2",
          key: "4",
          label: "4",
        },
        {
          prodPlatformName: "1",
          key: "5",
          label: "5",
        },
        {
          prodPlatformName: "2",
          key: "6",
          label: "6",
        },
        {
          prodPlatformName: "1",
          key: "7",
          label: "7",
        },
        {
          prodPlatformName: "2",
          key: "8",
          label: "8",
        },
        {
          prodPlatformName: "1",
          key: "9",
          label: "9",
        },
        {
          prodPlatformName: "2",
          key: "10",
          label: "10",
        },
        {
          prodPlatformName: "1",
          key: "11",
          label: "11",
        },
        {
          prodPlatformName: "2",
          key: "12",
          label: "12",
        },
        {
          prodPlatformName: "1",
          key: "13",
          label: "13",
        },
        {
          prodPlatformName: "2",
          key: "14",
          label: "14",
        },
        {
          prodPlatformName: "1",
          key: "15",
          label: "15",
        },
        {
          prodPlatformName: "2",
          key: "16",
          label: "16",
        },
      ],
      filterMethod(query, item) {
        return item.wellName.indexOf(query) > -1;
      },
    };
  },
  computed: {
    loader() {
      if (!this.currentModule) {
        return null;
      }
      console.log(this.currentModule);
      if (this.currentModule == "seismicAttributeMap") {
        this.ljpmTag = true;
      } else {
        this.ljpmTag = false;
      }
      if (this.currentModule == "oilReport") {
        let data = {
          ogfId: this.selectOilField,
          assetCode: this.selectPlatform,
          selectWellId: this.selectWellId,
        };
        // setTimeOut(function(){
        //    this.$refs.componentCustom.queryInfo(data);
        //   },1000)
        return () => import(`../oilReport/oilReport.vue`);
      } else {
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
            this.component = () => import(`./modules/staticData/smallFloorPlan.vue`);
          });
      },
    },
  },
  mounted() {
    //初始化
    this.initData();
    //获取权限问题内容
    // this.getPageAuthMessage();
  },
  methods: {
    queryInfo(queryString) {
      console.log(queryString);
    },
    handleClick(tab) {
      this.activeName = tab.name;
      this.currentModule = this.tabs[tab.index].modules[0].name;
    },
    handleRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`,
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //初始化数据
    async initData() {
      let oilFeildId = this.$route.params.oilField;
      console.log(this.$route.params);
      let wellId = this.$route.params.wellId;
      //获得油田信息给下拉列表
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
      if (oilFeildId == undefined || oilFeildId == null) {
        this.selectOilField = "3FC9A818F5BC43B88270DB80BBB3018F";
      } else {
        this.selectOilField = oilFeildId;
      }
      //获取油田id
      let paraPlatForm = {
        oilFieldId: this.selectOilField,
      };
      await fetchPlatforms(paraPlatForm).then((res) => {
        //判断联通状态
        if (res.data.code == 200) {
          this.platform = res.data.data.platform;
          if (this.platform.length == 0) {
            this.selectPlatform = "";
          } else {
            this.selectPlatform = this.platform[0].platFormId;
          }
        }
      });
      await fetchProductionWells(paraPlatForm).then((res) => {
        //判断联通状态
        if (res.data.code == 200) {
          let wellData = res.data.data.productionWells;
          this.wellData = wellData.filter((el) => el.wellName);
        }
      });
      if (wellId == undefined || wellId == null) {
        if (this.wellData && this.wellData.length > 0) {
          this.selectWellId = this.wellData[0].wellId;
        }
      } else {
        let wellMess = this.wellData.find((item) => {
          return item.wellId == wellId;
        });
        this.selectWellId = wellMess.wellId;
      }
      this.doSearch();
    },
    //获得平台数据@param oilFieldId
    getFetchPlatforms(oilFieldId) {
      let request = {
        oilFieldId: oilFieldId,
      };
      fetchPlatforms(request).then((res) => {
        if (res.data.code == 200) {
          this.platform = res.data.data.platform;
          if (this.platform.length == 0) {
            this.selectPlatform = "";
          } else {
            this.selectPlatform = this.platform[0].platFormId;
          }
        }
      });
    },
    //通过平台id 查询油井信息@param platformId
    getFetchProductionWellsByPlatform(platformId) {
      let request = {
        platformId: platformId,
      };
      fetchProductionWellsByPlatform(request).then((res) => {
        if (res.data.code == 200) {
          let wellData = res.data.data.productionWells;
          this.wellData = wellData.filter((el) => el.wellName);
        }
      });
    },
    //通过油田id 查询油井信息@param oilFieldId
    getFetchProductionWells(oilFieldId) {
      let request = {
        oilFieldId: oilFieldId,
      };
      fetchProductionWells(request).then((res) => {
        if (res.data.code == 200) {
          let wellData = res.data.data.productionWells;
          this.wellData = wellData.filter((el) => el.wellName);
        }
      });
    },
    getLjpmWells() {
      let request = {
        ogfId: this.selectOilField,
      };
      getLjpmWells(request).then((res) => {
        if (res.data.code == 200) {
          this.ljpmWellData = res.data.data;
        }
      });
    },
    //大事简要数据源接口
    getMajorEventsBriefly() {
      getMajorEventsBriefly({
        ogfId: this.selectOilField,
        platformId: this.selectPlatform,
        wellId: this.selectWellId,
      }).then((res) => {
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
    //上传图片文件
    async useUploadPic(file, fileList) {
      if (
        this.currentModule == "smallLayerStructureDiagram" ||
        this.currentModule == "smallFloorPlan" ||
        this.currentModule == "theSedimentaryFaciesMap"
      ) {
        this.$message.error("该部分内容需要通过区块辅助分析进行上传");
        return;
      }
      if (fileList.length > 1) {
        this.fileList.slice(-1);
      }
      //获得油田参数
      let oilFieldid = this.selectOilField;
      //获得平台id
      let platForm = this.selectPlatform;
      //获得井号
      let wellId = this.selectWellId;
      //一级目录 油井目录
      let firstPath = "production-well";
      //文件类型
      let fileType = file.raw.type;
      console.log(fileType);
      if (this.isCorrectFileType(fileType)) {
        return true;
      }
      //获得图片二进制流
      const fileData = await this.selectImageFile(file.raw);
      let fileDataNew = fileData.replace(/^data:\w+\/[a-zA-Z-]+;base64,/, "");
      //获得当前选项中的映射关系
      let tabName = this.tabsPathName.find((item) => item.name == this.currentModule);
      if (tabName === null || tabName === undefined) {
        this.$message.error("该标签无法上传文件或图片,请切换标签");
        return;
      }
      let position = this.childParam;
      let fileName = "";
      //有井层的情况
      if (tabName.pathName == "SUBLAYER" || tabName.pathName == "TOP_SUBLAYER") {
        if (!position || position == "") {
          this.$message.error("请选择层位");
          return;
        }
        //文件名称拼接
        fileName = tabName.pathName + (position.length > 0 ? "_" + position : "") + "_" + wellId;
      } else {
        //文件名称拼接
        fileName = tabName.pathName + "_" + wellId;
      }
      //let xfileData=this.dataURLtoBlob(fileData);
      //请求参数
      let request = {
        contentType: fileType,
        data: fileDataNew,
        fieldId: oilFieldid,
        fileName: fileName,
        operatingCompanyId: "",
        path: firstPath,
        platformId: platForm,
        wellGroupId: "",
        wellId: wellId,
        wellTypeCode: "",
      };
      /*let request=new FormData();
                  request.append('contentType',fileType);
                  request.append('data',fileDataNew);
                  request.append('fieldId',oilFieldid);
                  request.append('fileName',fileName);
                  request.append('path',firstPath);
                  request.append('platformId',platForm);
                  request.append('wellId',wellId);*/
      uploadFile(request).then((res) => {
        if (res.data.code == 200) {
          this.$message.success("文件上传成功");
          this.doSearch();
        }
      });
    },
    //hwh解析图片文件 图片文件转二进制流@param file
    selectImageFile(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (result) => {
          resolve(reader.result);
        };
      });
    },
    //hwh 是否能够上传图片通过映射表来判断
    showUploadPic() {
      let tabName = this.tabsPathName.find((item) => item.name == this.currentModule);
      console.log(tabName);
      if (tabName == null) {
        return true;
      } else {
        return false;
      }
    },
    //hwh子组件传递参数@param val
    changeChildParam(val) {
      this.childParam = val;
    },
    /*//base64 转二进制流
              dataURLtoBlob(dataurl) {
                var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                while (n--) {
                  u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], { type: mime });
              },*/
    //搜索功能
    doSearch() {
      this.$refs.componentCustom.oilFeildId = this.selectOilField;
      this.$refs.componentCustom.platform = this.selectPlatform;
      this.$refs.componentCustom.wellId = this.selectWellId;
      if (this.childParam) {
        this.$refs.componentCustom.selectPosition = this.childParam;
      }
      this.majorEventsBrieflyValue = "";
      this.getMajorEventsBriefly();

      let data = {
        ogfId: this.selectOilField,
        assetCode: this.selectPlatform,
        selectWellId: this.selectWellId,
      };
      if (this.currentModule == "oilReport") {
        this.$refs.componentCustom.queryInfo(data);
      } else {
        this.$refs.componentCustom.doSearch(this.majorEventsBrieflyValue);
      }
    },
    //上传成功后操作
    handleSuccess() {
      this.$refs.upload.clearFiles();
    },
    ljpmUploadDialog() {
      //打开弹窗
      this.ljpmDialog = true;
      this.getLjpmWells();
    },
    //切换油田修改平台内容
    doChangeYt(val) {
      this.selectPlatform = "";
      this.selectWellId = "";
      this.getFetchPlatforms(val);
    },
    //切换平台级联改变
    doChangePT(val) {
      this.selectWellId = "";
      if (this.selectOilField == val) {
        this.getFetchProductionWells(val);
      } else {
        this.getFetchProductionWellsByPlatform(val);
      }
    },
    //切换井改变
    onChangeWell() {
      this.childParam = "";
      this.$refs.componentCustom.selectPosition = this.childParam;
    },
    //下载
    doDownLoad() {
      let well = this.wellData.find((item) => {
        return item.wellId == this.selectWellId;
      });
      this.$refs.componentCustom.wellName = well.wellName;
      if (this.childParam) {
        this.$refs.componentCustom.selectPosition = this.childParam;
      }
      this.$refs.componentCustom.doDownLoad();
    },
    //判断上传文件是否是正确的类型@param type
    isCorrectFileType(type) {
      if (
        this.currentModule == "smallLayerStructureDiagram" ||
        this.currentModule == "smallFloorPlan" ||
        this.currentModule == "seismicAttributeMap" ||
        this.currentModule == "theSedimentaryFaciesMap" ||
        this.currentModule == "wellLoggingCurve" ||
        this.currentModule == "cementingQualityLog" ||
        this.currentModule == "seismicProfile" ||
        this.currentModule == "whileDrillingTrajectory" ||
        this.currentModule == "wellNetworkDiagram" ||
        this.currentModule == "completionStringDrawing" ||
        this.currentModule == "saturationLog"
      ) {
        if (
          type == "image/bmp" ||
          type == "image/gif" ||
          type == "image/x-icon" ||
          type == "image/pipeg" ||
          type == "image/jpeg" ||
          type == "image/png"
        ) {
          return false;
        } else {
          this.$message.error("请上传正确图片类型");
          return true;
        }
      } else if (this.currentModule == "fluidProducingProfile" || this.currentModule == "wellTestReport") {
        if (type == "application/pdf") {
          return false;
        } else {
          this.$message.error("请上传pdf类型文件");
          return true;
        }
      } else {
        return true;
      }
    },
    //hwh获取当前页面的权限内容，并处理其逻辑问题
    getPageAuthMessage() {
      // this.userInfo = VSAuth.getAuthInfo();
      let myPath = this.$route.path;
      //该值可以为空
      let areaCode = "znytglxt";
      let loginName = this.userInfo.userName;
      getWidgetByAreaUser({
        areaCode: areaCode,
        loginName: loginName,
      }).then((res) => {
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
                    this.canDownload = true;
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
    ljpmDialogClose() {
      this.ljUploadForm = {
        direction: "横向",
        chooseWell: [],
      };
      this.ljpmFileList = [];
      this.ljpmDialog = false;
    },
    ljpmUploadSave() {
      if (this.ljUploadForm.chooseWell == null || this.ljUploadForm.chooseWell.length <= 0) {
        this.$message.warning("请选择井号");
        return;
      }
      var fileType = this.$refs.ljpmUpload.fileList[0].raw.type;
      if (this.isCorrectFileType(fileType)) {
        return true;
      }
      this.$refs.ljpmUpload.submit();
    },
    ljpmChange(file, fileList) {
      fileList = [];
      fileList.push(file);
      this.ljpmFileList = fileList;
    },
    async httpRequest(param) {
      console.log("2222");
      let fileObj = param.file;
      var fileData = await this.selectImageFile(fileObj);
      //文件类型
      let fileType = fileObj.type;
      if (this.isCorrectFileType(fileType)) {
        return true;
      }
      let fileDataNew = fileData.replace(/^data:\w+\/[a-zA-Z-]+;base64,/, "");
      //获得当前选项中的映射关系
      let tabName = this.tabsPathName.find((item) => item.name == this.currentModule);
      let fileName = "";
      let oilFieldid = this.selectOilField;
      //获得平台id
      let platForm = this.selectPlatform;
      //获得井号
      let wellId = this.selectWellId;
      //一级目录 油井目录
      let firstPath = "production-well";
      //文件名称拼接
      fileName = tabName.pathName + "_" + wellId;
      let request = {
        contentType: fileType,
        lontitudeLatitude: this.ljUploadForm.direction,
        fieldId: oilFieldid,
        fileName: fileName,
        data: fileDataNew,
        path: firstPath,
        platformId: platForm,
        wellId: wellId,
        sectionName: wellId,
        wellIdList: this.ljUploadForm.chooseWell,
      };
      console.log(request);
      ljpmImgUploadFile(request)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message.success("文件上传成功");
            this.doSearch();
          } else {
            param.fileList = [param.file];
            this.$message.error("文件上传失败");
          }
        })
        .catch((error) => {
          param.fileList = [param.file];
          this.$message.error("文件上传失败");
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
</style>
