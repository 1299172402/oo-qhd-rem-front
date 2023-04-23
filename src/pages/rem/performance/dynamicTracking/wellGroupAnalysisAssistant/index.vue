<!-- 井组辅助分析 -->
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
          @change="changeSelectOilField"
          style="margin-right: 15px"
        >
          <el-option
            v-for="item in oilField"
            :key="item.oilFieldId"
            :label="item.name"
            :value="item.oilFieldId"
          ></el-option>
        </el-select>
        <span class="title">区块：</span>
        <el-select
          v-model="selectBlock"
          placeholder="请选择"
          filterable
          @change="changeSelectBlock"
          style="margin-right: 15px"
        >
          <el-option v-for="item in block" :key="item.fieldId" :label="item.name" :value="item.fieldId"></el-option>
        </el-select>
        <span
          class="title"
          v-if="currentModule == 'wellGroupDevelopment' || currentModule == 'injectionProductionCorresponding'"
          >井组切换：</span
        >
        <el-select
          v-model="wellCentre"
          placeholder="请选择"
          @change="changeSelectWellCentre"
          style="margin-right: 15px"
          v-if="currentModule == 'wellGroupDevelopment' || currentModule == 'injectionProductionCorresponding'"
        >
          <el-option label="以水井为中心" value="WATERCENTRE"></el-option>
          <el-option label="以油井为中心" value="OILCENTRE"></el-option>
        </el-select>
        <span class="title">井组：</span>
        <el-select
          v-if="
            currentModule != 'dynamicsInjection' &&
            currentModule != 'changingDynamics' &&
            currentModule != 'stateChange'
          "
          v-model="selectWellGroup"
          placeholder="请选择"
          filterable
          clearable
          style="margin-right: 15px"
        >
          <el-option
            v-for="item in wellGroup"
            :key="item.wellGroupId"
            :label="item.name"
            :value="item.wellGroupId"
          ></el-option>
        </el-select>
        <el-select
          v-else
          v-model="selectWellGroup"
          placeholder="请选择"
          filterable
          clearable
          style="margin-right: 15px"
        >
          <el-option
            v-for="item in newWellGroup"
            :key="item.wellGroupId"
            :label="item.wellGroupName"
            :value="item.wellGroupId"
          ></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" style="margin-right: 20px" @click="doSearch">搜索 </el-button>
        <el-button
          type="primary"
          icon="el-icon-upload2"
          @click="ljpmUploadDialog"
          style="margin-left: 0px !important"
          v-if="currentModule == 'connecting'"
          >上传文档</el-button
        >
        <el-upload
          ref="upload"
          v-else
          class="upload-demo"
          action=""
          :auto-upload="false"
          :on-change="useUploadPic"
          :show-file-list="false"
        >
          <el-button type="primary" icon="el-icon-upload2">上传文档</el-button>
        </el-upload>
        <el-button type="primary" style="margin-left: 20px !important" icon="el-icon-download" @click="doDownLoad"
          >下载</el-button
        >
      </div>
    </headerSearch>
    <pagePanelNew style="height: calc(100% - 100px)" class="g-w100">
      <el-tabs class="g-pageHeader" style="margin-bottom: 15px" v-model="activeName" topline @tab-click="handleClick">
        <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.label" :name="item.name">
          <el-button
            v-for="(module, index) in item.modules"
            :key="index"
            :class="currentModule == module.name ? 'el-button--primary' : 'commonBtn'"
            @click="handleTwoClicj(module)"
            >{{ module.label }}</el-button
          >
        </el-tab-pane>
      </el-tabs>
      <keep-alive :include="[]" :max="10" v-if="wellGroup.length">
        <component
          :is="component"
          ref="componentCustom"
          :oil-field-id="selectOilField"
          :block-id="selectBlock"
          :wellCentre="wellCentre"
          :well-group-id="selectWellGroup"
          @childPara="changeChildParam"
        ></component>
      </keep-alive>
    </pagePanelNew>
    <el-dialog
      custom-class="border"
      title="连井剖面图上传"
      :visible.sync="ljpmDialog"
      width="50%"
      :before-close="ljpmDialogClose"
    >
      <el-form ref="form" :model="ljUploadForm" label-width="80px">
        <el-form-item label="图片上传" style="width: 88px">
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
  </div>
</template>

<script>
import {
  fetchOilFields,
  fetchFields,
  fieldLayers,
  wellGroups,
  uploadFile,
  getLjpmWells,
} from "@/api/oilDeposit/rem-02/primaryinfo.js";
import { wellGroupList } from "@/api/rem/wellgroupinformaintenance";
export default {
  name: "WellGroupAnalysisAssistant",
  data() {
    return {
      fileList: [],
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
      //井组切换选中值
      wellCentre: "WATERCENTRE",
      //井组选中值
      selectWellGroup: "",
      //井组列表
      wellGroup: [],
      //新井组列表
      newWellGroup: [],
      ljpmFileList: [],
      ljpmDialog: false,
      queryParams: {},
      ljpmWellData: [],
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
      filterMethod(query, item) {
        return item.wellName.indexOf(query) > -1;
      },
      handlePreview(file) {
        return; //防报错
      },
      props: {
        key: "wellId",
        label: "wellName",
      },
      queryParams: {},
      component: null,
      //当前活跃标签
      activeName: "reservoirData",
      //当前活跃module
      currentModule: "smallLayerStructureDiagram",
      //自动生产标签列表
      tabs: [
        {
          label: "储层资料",
          name: "reservoirData",
          modules: [
            {
              label: "小层顶面构造图",
              name: "smallLayerStructureDiagram",
            },
            {
              label: "地震属性图",
              name: "seismicAttributes",
            },
            {
              label: "沉积相图",
              name: "thicknessOfSandLayer",
            },
            {
              label: "有效厚层图",
              name: "effectiveThickness",
            },
            {
              label: "渗透率分布图",
              name: "permeabilityDistribution",
            },
            {
              label: "井组连通图",
              name: "wellGroupConnection",
            },
            /*  {
                                                label: "渗透率柱状图",
                                                name: "permeabilityColumnar",
                                            },*/
            {
              label: "连井剖面图",
              name: "connecting",
            },
          ],
        },
        {
          label: "动态资料",
          name: "dynamicData",
          modules: [
            {
              label: "井组开发曲线",
              name: "wellGroupDevelopment",
            },
            {
              label: "注采对应曲线",
              name: "injectionProductionCorresponding",
            },
            {
              label: "示踪剂",
              name: "tracer",
            },
            {
              label: "调驱/调剖",
              name: "effectOfMeasures",
            },
            {
              label: "井组配注变化动态",
              name: "dynamicsInjection",
            },
            {
              label: "井组连通性变化动态",
              name: "changingDynamics",
            },
            {
              label: "注采井网状态变化",
              name: "stateChange",
            },
          ],
        },
      ],
      //文件名称对应项
      tabsPathName: [
        {
          name: "smallLayerStructureDiagram",
          pathName: "STRUCTURE",
        }, //小层顶面构造图
        {
          name: "seismicAttributes",
          pathName: "SEISMIC_ATTRIBUTES",
        }, //地震属性图
        {
          name: "wellGroupConnection",
          pathName: "WELL_GROUP_CONNECTION",
        }, //井组连通图
        {
          name: "thicknessOfSandLayer",
          pathName: "THICKNESS_SAND_LAYER",
        }, //砂层厚度图
        {
          name: "effectiveThickness",
          pathName: "EFFECTIVE_THICKNESS",
        }, //有效厚度图
        {
          name: "permeabilityDistribution",
          pathName: "PERMEABILITY_DISTRIBUTION",
        }, //渗透率分布图
        {
          name: "permeabilityColumnar",
          pathName: "PERMEABILITY_COLUMNAR",
        }, //渗透率分布图
        {
          name: "tracer",
          pathName: "TRACER",
        }, //示踪剂
      ],
      //子组件返回数据
      childParam: "",
    };
  },
  computed: {
    loader() {
      return () => import(`./modules/${this.activeName}/${this.currentModule}.vue`);
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
  },
  mounted() {
    this.initData();
  },
  methods: {
    //点击一级tabs
    handleClick(tab) {
      this.activeName = tab.name;
      this.currentModule = this.tabs[tab.index].modules[0].name;
    },
    //点击二级tabs
    handleTwoClicj(module) {
      this.currentModule = module.name;
      if (
        this.currentModule == "dynamicsInjection" ||
        this.currentModule == "changingDynamics" ||
        this.currentModule == "stateChange"
      ) {
        this.selectWellGroup = this.newWellGroup[0].wellGroupId;
      } else {
        this.selectWellGroup = this.wellGroup[0].wellGroupId;
      }
    },
    ljpmUploadDialog() {
      //打开弹窗
      this.ljpmDialog = true;
      this.getLjpmWells();
    },
    ljpmDialogClose() {
      this.ljUploadForm = {
        direction: "横向",
        chooseWell: [],
      };
      this.ljpmFileList = [];
      this.ljpmDialog = false;
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`,
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
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
    async httpRequest(param) {
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
    ljpmChange(file, fileList) {
      fileList = [];
      fileList.push(file);
      this.ljpmFileList = fileList;
    },
    //初始化页面
    async initData() {
      //油田信息初始化
      await fetchOilFields().then((res) => {
        if (res.data.code == 200) {
          this.oilField = res.data.data.oilFields;
          this.selectOilField = this.oilField[0].oilFieldId;
        }
      });
      //区块信息初始化
      await fetchFields({ oilFieldId: this.selectOilField }).then((res) => {
        if (res.data.code == 200) {
          this.block = res.data.data.fields;
          if (this.$route.params.block) {
            //先走传参
            this.selectBlock = this.$route.params.block;
          } else {
            this.selectBlock = this.selectOilField;
          }
        }
      });
      //井组信息初始化
      let requestWellGroups = {
        oilFieldId: this.block.map((item) => item.fieldId),
        wellCentre: this.wellCentre,
      };
      wellGroups(requestWellGroups).then((res) => {
        if (res.data.code == 200 && res.data.data && res.data.data.wellGroups.length) {
          this.wellGroup = res.data.data.wellGroups;
          if (this.$route.params.wellId) {
            //先走传参
            this.selectWellGroup = this.$route.params.wellId;
          } else if (this.wellGroup && this.wellGroup.length) {
            this.selectWellGroup = this.wellGroup[0].wellGroupId;
          }
        }
      });
      //动态资料-井组配注变化动态||井组连通性变化动态||注采井网状态变化 调zxp这个接口
      wellGroupList(requestWellGroups).then((res) => {
        if (res.data.code == 200 && res.data.data && res.data.data.length) {
          this.newWellGroup = res.data.data;
        }
      });
      this.doSearch();
    },
    //搜索功能
    doSearch() {
      this.$nextTick(() => {
        this.$refs.componentCustom.oilFeildId = this.selectOilField;
        this.$refs.componentCustom.platform = this.selectPlatform;
        this.$refs.componentCustom.wellGroupId = this.selectWellGroup;
        this.$refs.componentCustom.doSearch();
      });
    },
    //改变选中油田内容
    changeSelectOilField() {
      this.getFetchFields();
    },
    //获得区块类型
    getFetchFields() {
      let request = {
        oilFieldId: this.selectOilField,
      };
      fetchFields(request).then((res) => {
        if (res.data.code == 200) {
          this.block = res.data.data.fields;
          //区块 全部默认为 油田id
          this.selectBlock = this.selectOilField;
        }
      });
    },
    //改变选中区块内容
    changeSelectBlock(val) {
      this.selectWellGroup = "";
      this.getWellGroups();
    },
    //获得井组信息
    getWellGroups() {
      let oilFieldId = [];
      if (this.selectOilField == this.selectBlock) {
        this.block.forEach((item, index) => {
          oilFieldId.push(item.fieldId);
        });
      } else {
        oilFieldId.push(this.selectBlock);
      }
      let request = {
        oilFieldId: oilFieldId,
      };
      wellGroups(request).then((res) => {
        if (res.data.code == 200) {
          this.wellGroup = res.data.data.wellGroups;
        }
      });
      wellGroupList(request).then((res) => {
        if (res.data.code == 200) {
          this.newWellGroup = res.data.data;
        }
      });
    },
    //改变选中井组切换内容
    changeSelectWellCentre() {},
    //上传图片文件
    async useUploadPic(file, fileList) {
      if (
        this.currentModule == "smallLayerStructureDiagram" ||
        this.currentModule == "seismicAttributes" ||
        this.currentModule == "thicknessOfSandLayer" ||
        this.currentModule == "effectiveThickness" ||
        this.currentModule == "permeabilityDistribution"
      ) {
        this.$message.error("该部分内容需要通过区块辅助分析进行上传");
        return;
      }
      if (fileList.length > 1) {
        this.fileList.slice(-1);
      }
      //获得油田参数
      // let oilFieldid = this.selectOilField;
      //获得区块id
      let block = this.selectBlock;
      //获得井组
      let wellGroup = this.selectWellGroup;
      //一级目录 油井目录
      let firstPath = "well-group";
      //文件类型
      let fileType = file.raw.type;
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
      if (!wellGroup || wellGroup == "") {
        this.$message.error("请选择井组");
        return;
      }
      //有井层的情况
      if (tabName.pathName == "TRACER") {
        if (position.length <= 0) {
          this.$message.error("请选择示踪剂的某项进行上传");
          return;
        }
        //文件名称拼接
        fileName = position + "_" + wellGroup;
      } else {
        //文件名称拼接
        fileName = tabName.pathName + "_" + wellGroup;
      }
      //请求参数
      let request = {
        contentType: fileType,
        data: fileDataNew,
        fieldId: block,
        fileName: fileName,
        operatingCompanyId: "",
        path: firstPath,
        platformId: "",
        wellGroupId: wellGroup,
        wellId: "",
        wellTypeCode: "",
      };
      uploadFile(request).then((res) => {
        if (res.data.code == 0) {
          this.$message.success("文件上传成功");
          this.doSearch();
        }
      });
    },
    //解析图片文件 图片文件转二进制流
    selectImageFile(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (result) => {
          resolve(reader.result);
        };
      });
    },
    //子组件传递参数
    changeChildParam(val) {
      this.childParam = val;
      console.log(this.childParam);
    },
    //下载
    doDownLoad() {
      let wellGroupThing = this.wellGroup.find((item) => {
        return item.wellGroupId == this.selectWellGroup;
      });
      this.$refs.componentCustom.wellGroupName = wellGroupThing.name;
      this.$refs.componentCustom.doDownLoad();
    },
    //判断上传文件是否是正确的类型
    isCorrectFileType(type) {
      if (
        this.currentModule == "seismicAttributes" ||
        this.currentModule == "wellGroupConnection" ||
        this.currentModule == "thicknessOfSandLayer" ||
        this.currentModule == "effectiveThickness" ||
        this.currentModule == "permeabilityDistribution" ||
        this.currentModule == "permeabilityColumnar"
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
      } else if (this.currentModule == "tracer") {
        if (this.childParam == "TRACER_REPORT") {
          if (type == "application/pdf") {
            return false;
          } else {
            this.$message.error("请上传pdf类型文件");
            return true;
          }
        } else if (this.childParam == "TRACER_RESULTS" || this.childParam == "TRACER_INFORMATION") {
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
        }
      } else {
        return true;
      }
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

::v-deep .el-upload-list {
  display: none;
}
</style>
