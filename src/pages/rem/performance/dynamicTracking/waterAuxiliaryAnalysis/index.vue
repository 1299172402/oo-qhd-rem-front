<!-- 水井辅助分析 -->
<template>
    <div class="app-container">
        
        <headerSearch style="height: 80px">
            <div class="g-row-flex-V g-w100 g-h100">
                <span class="title">油田：</span>
                <el-select v-model="selectOilField" placeholder="请选择" filterable clearable disabled style="margin-right: 15px">
                    <el-option v-for="item in oilField" :key="item.oilFieldId" :label="item.name" :value="item.oilFieldId"></el-option>
                </el-select>
                <span class="title">平台：</span>
                <el-select v-model="selectPlatform" placeholder="请选择" filterable clearable @change="doChangePT" style="width: 220px; margin-right: 15px">
                    <el-option v-for="item in platform" :key="item.platFormId" :label="item.platName" :value="item.platFormId"></el-option>
                </el-select>
                <span class="title">井号：</span>
                <el-select v-model="selectWellId" class="f2" filterable clearable @change="onChangeWell" style="width: 180px;">
                    <el-option v-for="item in wellData" :key="item.wellId" :label="item.wellName" :value="item.wellId" :disabled="item.disabled"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" style="margin-left: 15px" @click="doSearch">搜索</el-button>
                <el-button class="commonBtn" icon="el-icon-refresh" @click="resetting">重置</el-button>
            </div>
        </headerSearch>
        
        <pagePanelNew :style="{ height: currentModule == 'waterReport' ? 'auto' : 'calc(100% - 100px)' }" class="g-w100">
            
            <div class="pagepanel-btns" style="height:34px;margin-bottom:10px;display: flex;justify-content: flex-end;position: absolute;right:20px;top:16px;z-index: 2;">
                <!-- minIo上传 -->
                <el-button v-if="currentModule=='wellNetworkDiagram'||currentModule=='completionStringDrawing'||currentModule=='wellTestReport'||currentModule=='drillingReport'||currentModule=='completionReport'||currentModule=='geologicalSummary'" type="primary" icon="el-icon-upload2" style="margin-left: auto !important" @click="ljpmUploadDialogLast" >上传文档</el-button>
                <!-- minIo下载 -->
                <el-button type="primary" icon="el-icon-download" style="margin-left:15px;" :disabled="downloadButton" @click="doDownLoadNew">下载</el-button>
            </div>
            
            <el-tabs class="g-pageHeader" style="margin-bottom: 15px" v-model="activeName" topline @tab-click="handleClick">
                <el-tab-pane style="height: auto" v-for="(item, index) in tabs" :key="index" :label="item.label" :name="item.name">
                    <div class="tab-view">
                        <el-button v-for="(module, index) in item.modules" :key="index" :class="currentModule == module.name ? 'el-button--primary' : 'commonBtn'" @click="tabsClick(module)">
                            {{ module.label }}
                        </el-button>
                        <div class="select-view" v-if="currentModule == 'homeworkWellHistory'">
                            <span class="title" style="margin-left: 20px">大事简要：</span>
                            <el-select v-model="majorEventsBrieflyValue" placeholder="请选择" filterable clearable @change="majorEventsBrieflyChange">
                                <el-option v-for="(item, index) in majorEventsBrieflyList" :key="index" :label="item.chronicle" :value="item.chronicle"></el-option>
                            </el-select>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <keep-alive :include="[]" :max="10">
                <component :is="component" ref="componentCustom" :oil-feild-id="selectOilField" :platform="selectPlatform" :well-id="selectWellId" @childPara="changeChildParam"></component>
            </keep-alive>
        </pagePanelNew>
        <!-- minIo上传 -->
        <el-dialog custom-class="border" title="上传文档" :visible.sync="ljpmDialogLast" width="20%" :before-close="ljpmDialogCloseLast" :style="{ 'min-width': '1800px' }">
            <el-row>
                <el-form ref="form" :model="ljUploadForm" label-width="40px">
                    <el-form-item label="" style="width: 88px">
                        <file-upload v-model="imageurl" style="width: 250px" :limit="limit" :fileSize="20" :is-show-tip="false" biz-path="rem-front/text" bucket-name="zhy" :file-type="fileType" @change="getResData"/>
                    </el-form-item>
                </el-form>
            </el-row>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="ljpmDialogCloseLast">关 闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>
    
<script>
    import { fetchOilFields,fetchPlatforms,fetchInjectionWells,fetchInjectionWellsByPlatform,uploadFile } from "@/api/oilDeposit/rem-02/primaryinfo.js";
    import { getMajorEventsBriefly } from "@/api/oilDeposit/rem-04/oilAuxiliaryAnalysis.js";
    import FileUpload from "@/components/intelligentOilfield/FileUpload/index.vue";
    import {addRemUploadFileMinio} from "@/api/rem/remuploadfileminio";
    import {downFile} from "@/components/upload/utils/file";
    import FileSaver from "file-saver";
    export default {
        name: "WaterAuxiliaryAnalysis",
        components: {FileUpload},
        data() {
            return {
                //minIo
                ljpmDialogLast: false,
                limit:1,
                fileType:['pdf'],
                imageurl:'',
                operationTypeList:{
                    wellNetworkDiagram:{//井网图
                        operationType:'WATERJWT',
                        limit:1,
                        fileType:['bmp','jpg','jpeg','png','pdf']
                    },
                    completionStringDrawing:{//完井管柱图
                        operationType:'WATERWJGZT',
                        limit:1,
                        fileType:['bmp','jpg','jpeg','png','pdf']
                    },
                    wellTestReport:{//试井报告
                        operationType:'WATERSJBG',
                        limit:1,
                        fileType:['pdf'],
                    },
                    drillingReport:{//钻完井报告
                        operationType:'SJZWJBG',
                        limit:1,
                        fileType:['pdf'],
                    },
                    completionReport:{//完井完工报告
                        operationType:'SJWJWGBG',
                        limit:1,
                        fileType:['pdf'],
                    },
                    geologicalSummary:{//完井地质总结
                        operationType:'SJWJDZZJ',
                        limit:1,
                        fileType:['pdf']
                    },
                },
                fileId:'',
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
                //采油井信
                wellData: [],
                fileList: [],
                queryParams: {},
                component: null,
                activeName: "staticData",
                currentModule: "perforationData",
                tabs: [
                    {
                        label: "静态资料",
                        name: "staticData",
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
                                label: "连井剖面图",
                                name: "connecting",
                            },
                            {
                                label: "视吸水指数",
                                name: "injectivityIndex",
                            },
                            {
                                label: "示踪剂",
                                name: "tracer",
                            }
                        ]
                    },
                    {
                        label: "生产动态资料",
                        name: "productionDynamicData",
                        modules: [{
                                label: '生产数据',
                                name: 'productionData'
                            },
                            {
                                label: '井网图',
                                name: 'wellNetworkDiagram'
                            },
                            {
                                label: '完井管柱图',
                                name: 'completionStringDrawing'
                            },
                            {
                                label: "作业井史",
                                name: "homeworkWellHistory",
                            },
                            {
                                label: "单井基本信息表",
                                name: "individualWellBasicInformationSheet",
                            },
                        ],
                    },
                    {
                        label: '动态监测资料',
                        name: 'dynamicConitoringData',
                        modules: [
                            {
                                label: '分层调配测试',
                                name: 'fluidProducingProfile'
                            },
                            {
                                label: '压降测试',
                                name: 'pressureTest'
                            },
                            {
                                label: '试井',
                                name: 'wellTestReport'
                            },
                            {
                                label: '分层调配数据',
                                name: 'stratificationTesting'
                            },
                        ]
                    },
                    {
                        label: "钻完井资料",
                        name: "drillingCompletion",
                        modules: [{
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
                        pathName: "SUBLAYER"
                    }, //小层平面图
                    {
                        name: "seismicAttributeMap",
                        pathName: "SEISMIC_ATTRIBUTES"
                    }, //地震属性图
                    {
                        name: "theSedimentaryFaciesMap",
                        pathName: "DEPOSITION"
                    }, //沉积相图
                    {
                        name: "smallLayerStructureDiagram",
                        pathName: "TOP_SUBLAYER"
                    }, //小层顶面构造图
                    {
                        name: "wellLoggingCurve",
                        pathName: "LOGGING"
                    }, //测井曲线
                    {
                        name: "cementingQualityLog",
                        pathName: "CEMENTING"
                    }, //固井质量测井图
                    {
                        name: "seismicProfile",
                        pathName: "SEISMIC_PROFILE"
                    }, //地震剖面图
                    {
                        name: "whileDrillingTrajectory",
                        pathName: "WHILE_DRILLING"
                    }, //随钻轨迹图
                    {
                        name: "wellNetworkDiagram",
                        pathName: "WELL_PATTERN"
                    }, //井网图
                    {
                        name: "completionStringDrawing",
                        pathName: "COMPLETION_PIPE"
                    }, //完井管状图
                    {
                        name: "fluidProducingProfile",
                        pathName: "SUCTION_PROFILE"
                    }, //产液剖面
                    //{name:'saturationLog',pathName:'SATURATION_LOG'}, //饱和度测井
                    {
                        name: "wellTestReport",
                        pathName: "WELL_TEST_REPORT"
                    }, //试井报告
                    {
                        name: "connecting",
                        pathName: "CONNECTING"
                    }, //试井报告
                ],
                //子组件返回数据
                childParam: "",
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
                canUpload: false,
                aName: "",
                ctModule: "",
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
                    this.loader().then(() => {
                        this.component = () => this.loader();
                    }).catch(() => {
                        console.log('走catch')
                    });
                },
            }
        },
        mounted() {
            this.initData();
            this.doSearch()
        },
        methods: {
            //minIo-打开上传组件
            ljpmUploadDialogLast(){
                this.limit=this.operationTypeList[this.currentModule].limit;
                this.fileType=this.operationTypeList[this.currentModule].fileType;
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
            getResData(data){
                let operationType=this.operationTypeList[this.currentModule].operationType;
                let params = {
                    fileId: data[0].id,
                    filestrId:data[0].name,
                    operationId:this.selectWellId,
                    operationType,
                    remUploadFileMinioId:'' ,
                    uploadTime:''
                };
                this.uploadFile(params);
            },
            uploadFile(params){
                this.ljpmDialogLast = false;
                addRemUploadFileMinio(params).then((res) => {
                    if (res.data.code == 200) {
                        this.$message.success("文件上传成功!");
                        this.ljpmDialogLast = false;
                        this.doSearch()
                        this.imageurl = ''; // 清空已选择的文件
                        this.$refs.form.resetFields();
                    }else {
                        this.$message.error("文件上传失败!");
                        this.ljpmDialog = false;
                        this.doSearch()
                        this.imageurl = ''; // 清空已选择的文件
                        this.$refs.form.resetFields();
                    }
                });
            },
            //minIo-下载
            doDownLoadNew(){
                const id = this.$refs.componentCustom.id
                let fileName = this.$refs.componentCustom.fileName
                downFile(id).then((res) => {
                    FileSaver.saveAs(res,`${fileName}`);
                });
                //如果是产液剖面||饱和度测井-则下载表格
                if(this.currentModule=='fluidProducingProfile'||this.currentModule=='saturationLog'){
                    this.$refs.componentCustom.doDownLoad();
                }
            },
            //原先下载
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
            //重置
            resetting(){
                let activeName=this.activeName;
                let currentModule=this.currentModule;
            	this.currentModule='';
            	this.$nextTick(()=>{
            		Object.assign(this.$data, this.$options.data());
                    this.activeName=activeName;
                    this.currentModule=currentModule;
            		this.initData();
            	})
            },
            //点击一级tabs
            handleClick(tab) {
                this.activeName = tab.name;
                this.currentModule = this.tabs[tab.index].modules[0].name;
            },
            //点击二级菜单
            tabsClick(module){
                if(module.name=='stratificationTesting'){//分层调配
                    let url=`https://ipm.tjioms-dev.tjltd.cnooc/#/waterflood/merge`;
                    window.open(url,'_blank');
                }
                else if (module.name == "injectivityIndex") {
                    window.open("https://ipm.tjioms-dev.tjltd.cnooc/#/waterflood/merge", "_blank");
                }else{
                    this.currentModule = module.name;
                }
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
                    oilFieldId: this.selectOilField
                };
                await fetchPlatforms(paraPlatForm).then((res) => {
                    if (res.data.code == 200) {
                        this.platform = res.data.data.platform;
                        if (this.platform.length == 0) {
                            this.selectPlatform = "";
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
            //搜索功能
            doSearch() {
                this.$refs.componentCustom.wellId = this.selectWellId;
                this.$refs.componentCustom.oilFeildId = this.selectOilField;
                this.$refs.componentCustom.platform = this.selectPlatform;
                if (this.childParam) {
                    this.$refs.componentCustom.selectPosition = this.childParam;
                }
                this.majorEventsBrieflyValue = "";
                this.getMajorEventsBriefly();
                console.log(this.currentModule);
                if (this.currentModule == "waterReport") {
                    this.$refs.componentCustom.queryAll();
                } else {
                    this.$refs.componentCustom.doSearch();
                }
            },
            //搜索-平台change
            doChangePT(val) {
                this.selectWellId = "";
                if (this.selectOilField == val) {
                    this.getFetchProductionWells(val);
                } else {
                    this.getFetchProductionWellsByPlatform(val);
                }
            },
            //查询油井信息
            getFetchProductionWells(oilFieldId) {
                let request = {
                    oilFieldId: oilFieldId
                };
                fetchInjectionWells(request).then((res) => {
                    if (res.data.code == 200) {
                        this.wellData = res.data.data.injectionWell;
                    }
                });
            },
            //查询油井信息
            getFetchProductionWellsByPlatform(platformId) {
                let request = {
                    platformId
                };
                fetchInjectionWellsByPlatform(request).then((res) => {
                    if (res.data.code == 200) {
                        this.wellData = res.data.data.injectionWell;
                    }
                });
            },
            //搜索-井号-change
            onChangeWell() {
                this.childParam = "";
                this.$refs.componentCustom.selectPosition = this.childParam;
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
                console.log(this.childParam);
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
