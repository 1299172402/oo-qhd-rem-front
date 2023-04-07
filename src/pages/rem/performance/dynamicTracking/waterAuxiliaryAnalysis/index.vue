<!-- 水井辅助分析 -->
<template>
    <div class="app-container">
        <headerSearch style="height:80px;">
            <div class="g-row-flex-V g-w100 g-h100">
                <span class="title">油田：</span>
                <el-select v-model="selectOilField" placeholder="请选择" filterable clearable disabled @change="doChangeYt" style="margin-right: 20px">
                    <el-option v-for="item in oilField" :key="item.oilFieldId" :label="item.name" :value="item.oilFieldId"></el-option>
                </el-select>
                <span class="title">平台：</span>
                <el-select v-model="selectPlatform" placeholder="请选择" filterable clearable @change="doChangePT" style="width: 220px;margin-right: 20px">
                    <el-option v-for="item in platform" :key="item.platFormId" :label="item.platName" :value="item.platFormId"></el-option>
                </el-select>
                <span class="title">井号：</span>
                <el-select v-model="selectWellId" class="f2" filterable clearable @change="onChangeWell" style="width:180px;margin-right: 20px">
                    <el-option v-for="item in wellData" :key="item.wellId" :label="item.wellName" :value="item.wellId" :disabled="item.disabled"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" style="margin-left: 20px;" @click="doSearch">检索</el-button>
                <el-upload ref="upload" style="margin-left: 20px;"  class="upload-demo" action="" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :auto-upload="false" :on-change="useUploadPic" :on-exceed="handleExceed" :file-list="fileList" :show-file-list="false" :on-success="handleSuccess" v-show="canUpload && !ljpmTag">
                    <el-button type="primary" icon="el-icon-upload2">上传文档</el-button>
                </el-upload>
                <el-button style="margin-left: 20px;" type="primary" icon="el-icon-download" @click="doDownLoad" v-show="canDownload">下载</el-button>
            </div>
        </headerSearch>
        <pagePanelNew headerTitle="" :class="activeSelect" class="g-w100">
            <el-tabs class="g-pageHeader" style="margin-bottom:15px;" v-model="activeName" topline @tab-click="handleClick">
                <el-tab-pane style="height: auto" v-for="(item, index) in tabs" :key="index" :label="item.label" :name="item.name">
                    <div class="tab-view">
                        <el-button v-for="(module, index) in item.modules" :key="index" :class="currentModule == module.name ? 'el-button--primary' : 'commonBtn'" @click="currentModule = module.name"> {{ module.label }}
                        </el-button>
                        <div class="select-view" v-if="currentModule == 'homeworkWellHistory'">
                            <span class="title" style="margin-left: 20px">大事简要：</span>
                            <el-select v-model="majorEventsBrieflyValue" placeholder="请选择" filterable clearable @change="majorEventsBrieflyChange">
                                <el-option v-for="(item,index) in majorEventsBrieflyList" :key="index" :label="item.chronicle" :value="item.chronicle"></el-option>
                            </el-select>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <keep-alive :include="[]" :max="10">
                <component :is="component" ref="componentCustom" :oil-feild-id="selectOilField" :platform="selectPlatform" :well-id="selectWellId" @childPara="changeChildParam"></component>
            </keep-alive>
        </pagePanelNew>
    </div>
</template>

<script>
import { fetchOilFields, fetchPlatforms, fetchInjectionWells, fetchInjectionWellsByPlatform, uploadFile } from '@/api/oilDeposit/rem-02/primaryinfo.js';
import { getMajorEventsBriefly } from '@/api/oilDeposit/rem-04/oilAuxiliaryAnalysis.js';
// import { getWidgetByAreaUser } from '@/api/rmm-01/rmm01';
export default {
    name: 'WaterAuxiliaryAnalysis',
    data() {
        return {
            majorEventsBrieflyValue:'',//大事间要绑定值
            majorEventsBrieflyList:[],//大事间要数据源
            //连井剖面是否选中
            ljpmTag: false,
            //连井剖面弹窗
            ljpmDialog: false,
            //选择油田
            selectOilField: '',
            //油田列
            oilField: [],
            //选择平
            selectPlatform: '',
            //平台列
            platform: [],
            //选择单井信息
            selectWellId: '',
            //采油井信
            wellData: [],
            fileList: [],
            queryParams: {},
            component: null,
            activeName: 'staticData',
            currentModule: 'perforationData',
            tabs: [
                {
                    label: '静态资料',
                    name: 'staticData',
                    modules: [
                        // {
                        //     label: '小层顶面构造图',
                        //     name: 'smallLayerStructureDiagram'
                        // },
                        // {
                        //     label: '地震属性图', //原小层平面图
                        //     name: 'smallFloorPlan'
                        // },
                        // {
                        //     label: '连井剖面图', //原地震属性图
                        //     name: 'seismicAttributeMap'
                        // },
                        // {
                        //     label: '测井曲线',
                        //     name: 'wellLoggingCurve'
                        // },
                        /*{
                                  label: "固井质量测井图",
                                  name: "cementingQualityLog",
                                },*/
                        // {
                        //     label: '地震剖面图',
                        //     name: 'seismicProfile'
                        // },
                        // {
                        //     label: '地质探边图',
                        //     name: 'whileDrillingTrajectory'
                        // },
                        // {
                        //     label: '沉积相图',
                        //     name: 'theSedimentaryFaciesMap'
                        // },
                        // {
                        //     label: '测井解释成果',
                        //     name: 'loggingInterpretationResult'
                        // },
                        /*{
                            label: '小层数据',
                            name: 'smallLayerData'
                        },*/
                        {
                            label: '射孔数据',
                            name: 'perforationData'
                        },
                        {
                            label: '井斜数据',
                            name: 'driftData'
                        },
                        {
                            label: '水井分析报告',
                            name: 'waterReport'
                        }
                    ]
                },
                {
                    label: '生产动态资料',
                    name: 'productionDynamicData',
                    modules: [
                        // {
                        //     label: '生产数据',
                        //     name: 'productionData'
                        // },
                        // {
                        //     label: '井网图',
                        //     name: 'wellNetworkDiagram'
                        // },
                        // {
                        //     label: '完井管柱图',
                        //     name: 'completionStringDrawing'
                        // },
                        {
                            label: '作业井史',
                            name: 'homeworkWellHistory'
                        },
                        {
                            label: '单井基本信息表',
                            name: 'individualWellBasicInformationSheet'
                        }
                    ]
                }
                // {
                //     label: '动态监测资料',
                //     name: 'dynamicConitoringData',
                //     modules: [
                //         {
                //             label: '分层调配数据',
                //             name: 'stratificationTesting'
                //         },
                //         {
                //             label: '吸水剖面',
                //             name: 'fluidProducingProfile'
                //         },
                //         {
                //             label: '压降测试',
                //             name: 'pressureTest'
                //         },
                //         {
                //             label: '试井',
                //             name: 'wellTestReport'
                //         }
                //     ]
                // }
            ],
            //文件名称对应项
            tabsPathName: [
                { name: 'smallFloorPlan', pathName: 'SUBLAYER' }, //小层平面图
                { name: 'seismicAttributeMap', pathName: 'SEISMIC_ATTRIBUTES' }, //地震属性图
                { name: 'theSedimentaryFaciesMap', pathName: 'DEPOSITION' }, //沉积相图
                { name: 'smallLayerStructureDiagram', pathName: 'TOP_SUBLAYER' }, //小层顶面构造图
                { name: 'wellLoggingCurve', pathName: 'LOGGING' }, //测井曲线
                { name: 'cementingQualityLog', pathName: 'CEMENTING' }, //固井质量测井图
                { name: 'seismicProfile', pathName: 'SEISMIC_PROFILE' }, //地震剖面图
                { name: 'whileDrillingTrajectory', pathName: 'WHILE_DRILLING' }, //随钻轨迹图
                { name: 'wellNetworkDiagram', pathName: 'WELL_PATTERN' }, //井网图
                { name: 'completionStringDrawing', pathName: 'COMPLETION_PIPE' }, //完井管状图
                { name: 'fluidProducingProfile', pathName: 'SUCTION_PROFILE' }, //产液剖面
                //{name:'saturationLog',pathName:'SATURATION_LOG'}, //饱和度测井
                { name: 'wellTestReport', pathName: 'WELL_TEST_REPORT' } //试井报告
            ],
            //子组件返回数据
            childParam: '',
            //缓存权限数据
            myWidget: [],
            userInfo: {},
            //按钮权限组
            //添加记
            canAddInfo: false,
            //修改数
            canUpdateInfo: false,
            //发布数
            canSendInfo: false,
            //删除数
            canDeleteInfo: false,
            //下载数
            canDownload: true,
            //上传数
            canUpload: false
        };
    },
    computed: {
        loader() {
            if (!this.currentModule) {
                return null;
            }
            if (this.currentModule == 'seismicAttributeMap') {
                this.ljpmTag = true;
            } else {
                this.ljpmTag = false;
            }
            if(this.currentModule == 'waterReport'){
                this.activeSelect = 'activeWaterReport'
                return () => import(`../waterReport/index.vue`);
            }else{
                this.activeSelect = 'activeOther'
                return () => import(`./modules/${this.activeName}/${this.currentModule}.vue`);
            }
        }
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
                        this.component = () => import('./modules/staticData/smallFloorPlan.vue');
                    });
            }
        }
        /*selectOilField(val){
                  this.getFetchPlatforms(val);
                },
                selectPlatform(val){
                  if (this.selectOilField==val){
                    this.getFetchProductionWells(val);
                  }else{
                    this.getFetchProductionWellsByPlatform(val);
                  }
                },*/
    },
    mounted() {
        this.initData();
    },
    methods: {
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
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        //初始化 数据
        async initData() {
            let oilFeildId = this.$route.params.oilField;
            let wellId = this.$route.params.wellId;
            console.log(oilFeildId, wellId);
            //获得油田信息给下拉列表
            await fetchOilFields().then((res) => {
                if (res.data.code == 200) {
                    this.oilField = res.data.data.oilFields;
                    if (this.oilField.length == 0) {
                        this.selectOilField = '';
                    } else {
                        this.selectOilField = this.oilField[0].oilFieldId;
                    }
                }
            });
            if (oilFeildId == undefined || oilFeildId == null) {
                this.selectOilField = '3FC9A818F5BC43B88270DB80BBB3018F';
            } else {
                this.selectOilField = oilFeildId;
            }
            //获取油田id
            let paraPlatForm = { oilFieldId: this.selectOilField };
            await fetchPlatforms(paraPlatForm).then((res) => {
                if (res.data.code == 200) {
                    this.platform = res.data.data.platform;
                    if (this.platform.length == 0) {
                        this.selectPlatform = '';
                    } else {
                        this.selectPlatform = this.platform[0].platFormId;
                    }
                }
            });
            await fetchInjectionWells(paraPlatForm).then((res) => {
                if (res.data.code == 200) {
                    this.wellData = res.data.data.injectionWell;
                }
            });
            if (wellId == undefined || wellId == null) {
                if (this.wellData && this.wellData.length > 0) {
                    this.selectWellId = this.wellData[0].wellId;
                }
            } else {
                let wellMess = this.wellData.find((item) => {
                    return item.wellName == wellId;
                });
                this.selectWellId = wellMess.wellId;
            }
            this.doSearch();
        },
        //查询油井信息
        getFetchProductionWellsByPlatform(platformId) {
            let request = { platformId };
            fetchInjectionWellsByPlatform(request).then((res) => {
                if (res.data.code == 200) {
                    this.wellData = res.data.data.injectionWell;
                }
            });
        },
        //查询油井信息
        getFetchProductionWells(oilFieldId) {
            let request = { oilFieldId: oilFieldId };
            fetchInjectionWells(request).then((res) => {
                if (res.data.code == 200) {
                    this.wellData = res.data.data.injectionWell;
                }
            });
        },
        //大事简要数据源接口
        getMajorEventsBriefly() {
            let parmas={
                ogfId: this.selectOilField,
                platformId: this.selectPlatform,
                wellId: this.selectWellId,
            }
            getMajorEventsBriefly(parmas).then((res) => {
                if(res.data.code==200){
                   this.majorEventsBrieflyList=res.data.data;
                }
            });
        },
        //zxb大事简要下拉框change事件
        majorEventsBrieflyChange(e){
            this.majorEventsBrieflyValue=e;
            console.log('this.majorEventsBrieflyValue',this.majorEventsBrieflyValue)
            this.$refs.componentCustom.doSearch(this.majorEventsBrieflyValue);
        },
        //上传图片文件
        async useUploadPic(file, fileList) {
            if (this.currentModule == 'smallLayerStructureDiagram' || this.currentModule == 'smallFloorPlan' || this.currentModule == 'theSedimentaryFaciesMap') {
                this.$message.error('该部分内容需要通过区块辅助分析进行上传');
                return;
            }
            console.log(fileList);
            if (fileList.length > 1) {
                this.fileList.slice(-1);
                //获得油田参数
                let oilFieldid = this.selectOilField;
                //获得平台id
                let platForm = this.selectPlatform;
                //获得井
                let wellId = this.selectWellId;
                //一级目录 油井目录
                let firstPath = 'injection-well';
                //文件类
                let fileType = file.raw.type;
                if (this.isCorrectFileType(fileType)) {
                    return true;
                }
                //获得图片二进制流
                const fileData = await this.selectImageFile(file.raw);
                let fileDataNew = fileData.replace(/^data:\w+\/[a-zA-Z-]+;base64,/, '');
                //获得当前选项中的映射关系
                let tabName = this.tabsPathName.find((item) => item.name == this.currentModule);
                if (tabName === null || tabName === undefined) {
                    this.$message.error('该标签无法上传文件或图片,请切换标签');
                    return;
                }
                let position = this.childParam;
                let fileName = '';
                //有井层的情况
                if (tabName.pathName == 'SUBLAYER' || tabName.pathName == 'TOP_SUBLAYER') {
                    if (!position || position == '') {
                        this.$message.error('请选择层位');
                        return;
                    }
                    //文件名称拼接
                    fileName = tabName.pathName + (position.length > 0 ? '_' + position : '') + '_' + wellId;
                } else {
                    //文件名称拼接
                    fileName = tabName.pathName + '_' + wellId;
                }
                //请求参数
                let request = {
                    contentType: fileType,
                    data: fileDataNew,
                    fieldId: oilFieldid,
                    fileName: fileName,
                    operatingCompanyId: '',
                    path: firstPath,
                    platformId: platForm,
                    wellGroupId: '',
                    wellId: wellId,
                    wellTypeCode: ''
                };
                console.log(request);
                uploadFile(request).then((res) => {
                    if (res.data.code == 200) {
                        this.$message.success('文件上传成功');
                        this.doSearch();
                    }
                });
            }
        },
        //是否能够上传图片
        showUploadPic() {
            let tabName = this.tabsPathName.find((item) => item.name == this.currentModule);
            console.log(tabName);
            if (tabName == null) {
                return true;
            } else {
                return false;
            }
        },
        //子组件传递参数
        changeChildParam(val) {
            this.childParam = val;
            console.log(this.childParam);
        },
        //检索功能
        doSearch() {
            this.$refs.componentCustom.wellId = this.selectWellId;
            this.$refs.componentCustom.oilFeildId = this.selectOilField;
            this.$refs.componentCustom.platform = this.selectPlatform;
            if (this.childParam) {
                this.$refs.componentCustom.selectPosition = this.childParam;
            }
            this.majorEventsBrieflyValue='';
            this.getMajorEventsBriefly();
            console.log(this.currentModule);
            if(this.currentModule == 'waterReport'){
                this.$refs.componentCustom.queryAll()
            }else{
                this.$refs.componentCustom.doSearch();
            }
        },
        //上传成功后操作
        handleSuccess() {
            this.$refs.upload.clearFiles();
        },
        doChangeYt(val) {
            this.selectPlatform = '';
            this.selectWellId = '';
            this.getFetchPlatforms(val);
        },
        doChangePT(val) {
            this.selectWellId = '';
            if (this.selectOilField == val) {
                this.getFetchProductionWells(val);
            } else {
                this.getFetchProductionWellsByPlatform(val);
            }
        },
        //切换井改变
        onChangeWell() {
            this.childParam = '';
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
        //判断上传文件是否是正确的类型
        isCorrectFileType(type) {
            if (
                this.currentModule == 'smallLayerStructureDiagram' ||
                this.currentModule == 'smallFloorPlan' ||
                this.currentModule == 'seismicAttributeMap' ||
                this.currentModule == 'wellLoggingCurve' ||
                this.currentModule == 'cementingQualityLog' ||
                this.currentModule == 'seismicProfile' ||
                this.currentModule == 'whileDrillingTrajectory' ||
                this.currentModule == 'theSedimentaryFaciesMap' ||
                this.currentModule == 'wellNetworkDiagram' ||
                this.currentModule == 'completionStringDrawing' ||
                this.currentModule == 'fluidProducingProfile'
            ) {
                if (type == 'image/bmp' || type == 'image/gif' || type == 'image/x-icon' || type == 'image/pipeg' || type == 'image/jpeg' || type == 'image/png') {
                    return false;
                } else {
                    this.$message.error('请上传正确图片类型');
                    return true;
                }
            } else if (this.currentModule == 'wellTestReport') {
                if (type == 'application/pdf') {
                    return false;
                } else {
                    this.$message.error('请上传pdf类型文件');
                    return true;
                }
            } else {
                return true;
            }
        },
        getPageAuthMessage() {
            // this.userInfo = VSAuth.getAuthInfo();
            this.userInfo = {};
            let myPath = this.$route.path;
            //该值可以为空
            let areaCode = 'znytglxt';
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
                                    case 'addInfo':
                                        this.canAddInfo = true;
                                        break;
                                    case 'updateInfo':
                                        this.canUpdateInfo = true;
                                        break;
                                    case 'sendInfo':
                                        this.canSendInfo = true;
                                        break;
                                    case 'deleteInfo':
                                        this.canDeleteInfo = true;
                                        break;
                                    case 'download':
                                        this.canDownload = true;
                                        break;
                                    case 'upload':
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
        }
    }
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
    .activeWaterReport{
        height: auto !important;
    }
    .activeOther{
       height: calc(100% - 100px); 
    }
</style>
