<!-- 油井辅助分析 -->
<template>
    <div class="app-container">
        
        <headerSearch style="height: 80px">
            <div class="g-row-flex-V g-w100 g-h100">
                <span class="title">油田：</span>
                <el-select v-model="selectOilField" placeholder="请选择" filterable clearable disabled @change="doChangeYt" style="margin-right: 15px">
                    <el-option v-for="item in oilField" :key="item.oilFieldId" :label="item.name" :value="item.oilFieldId"></el-option>
                </el-select>
                <span class="title">平台：</span>
                <el-select v-model="selectPlatform" style="width: 220px" placeholder="请选择" filterable clearable @change="doChangePT">
                    <el-option v-for="item in platform" :key="item.platFormId" :label="item.platName" :value="item.platFormId"></el-option>
                </el-select>
                <span class="title" style="margin-left: 15px">井号：</span>
                <el-select v-model="selectWellId" filterable @change="onChangeWell">
                    <el-option v-for="item in wellData" :key="item.wellId" :label="item.wellName" :value="item.wellId" :disabled="item.disabled"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" style="margin-left: 15px;" @click="doSearch">搜索</el-button>
                <el-button class="commonBtn" icon="el-icon-refresh" style="margin-right:auto;" @click="resetting">重置</el-button>
            </div>
        </headerSearch>
        
        <pagePanelNew headerTitle="油井辅助分析" :style="{ height: this.currentModule == 'oilReport' ? 'auto' : 'calc(100% - 100px)' }" class="g-w100">
            
            <div class="pagepanel-btns" style="height:34px;margin-bottom:10px;display: flex;justify-content: flex-end;position: absolute;right:20px;top:16px;z-index: 2;">
                <!-- 连井剖面上传 -->
                <el-button v-if="activeName=='staticData'&&currentModule=='connecting'" type="primary" icon="el-icon-download" @click="ljpmUploadDialog">上传文档</el-button>
                <!-- minIo上传 -->
                <el-button v-if="isUpdateFile" type="primary" icon="el-icon-upload2" style="margin-left: auto !important" @click="ljpmUploadDialogLast" >上传文档</el-button>
                <!-- minIo下载 -->
                <el-button v-else type="primary" icon="el-icon-download" style="margin-left:15px;" :disabled="downloadButton" @click="doDownLoadNew">下载</el-button>
                <!-- 返回 -->
                <el-button type="primary" v-if="$route.query.wellId" style="margin-left:15px;" @click="goBack">返回</el-button>
            </div>
            
            <el-tabs class="g-pageHeader" style="margin-bottom: 15px" v-model="activeName" topline @tab-click="handleClick">
                <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.label" :name="item.name">
                    <div class="tab-view">
                        <el-button v-for="(module, index) in item.modules" :key="index" :class="currentModule == module.name ? 'el-button--primary' : 'commonBtn'" @click="tapTabs2(module)">
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
            
            <keep-alive :include="[]" :max="10" v-if="blockId">
                <component 
                    :is="component" 
                    ref="componentCustom"   
                    :oilFeildId="selectOilField" 
                    :platform="selectPlatform" 
                    :wellId="selectWellId" 
                    :blockId="blockId"
                    :majorEventsBrieflyValue="majorEventsBrieflyValue" 
                    @childPara="changeChildParam">
                </component>
            </keep-alive>
        </pagePanelNew>
        
        <!-- 连井剖面上传 -->
        <el-dialog custom-class="border" title="连井剖面图上传" :visible.sync="ljpmDialog" width="920px" :close-on-click-modal="false" :before-close="ljpmDialogClose">
            <el-form ref="form" :model="ljUploadForm" label-width="80px">
                <el-form-item label="图片上传" style="width:100%;">
                    <file-upload 
                    v-model="ljUploadForm.imageurl" 
                    :limit="9" 
                    :fileSize="20" 
                    :is-picture-card="true" 
                    :is-show-tip="false" 
                    biz-path="rem-front/text" 
                    :file-type="['bmp','jpg','jpeg','png']" 
                    @change="getResData2"/>
                </el-form-item>
                
                <el-form-item label="纵横方向">
                    <el-select v-model="ljUploadForm.direction" class="f2" style="width: 200px" clearable>
                        <el-option label="横向" value="横向"></el-option>
                        <el-option label="纵向" value="纵向"></el-option>
                    </el-select>
                </el-form-item>
                
                <el-form-item label="井号">
                    <el-transfer filterable :titles="['未选中', '已选中']" :filter-method="filterMethod" filter-placeholder="请输入" :props="props" v-model="ljUploadForm.chooseWell" :data="ljpmWellData">
                    </el-transfer>
                </el-form-item>
                
            </el-form>
            <span slot="footer" class="dialog-footer" style="text-align: center">
                <el-button class="cancelBtn" @click="ljpmDialogClose">取 消</el-button>
                <el-button type="primary" @click="ljpmUploadSave">确 定</el-button>
            </span>
        </el-dialog>
        
        <!-- minIo上传 -->
        <el-dialog custom-class="border" title="上传文档" :visible.sync="ljpmDialogLast" width="20%" :before-close="ljpmDialogCloseLast" :style="{ 'min-width': '1800px' }">
            <div style="display: flex;justify-content: center;">
                <file-upload v-model="imageurl" style="width: 250px" :limit="limit" :fileSize="20" :is-show-tip="false" biz-path="rem-front/text" :file-type="fileType" @change="getResData"/>
            </div>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button class="cancelBtn" @click="ljpmDialogCloseLast">关 闭</el-button>
            </div>
        </el-dialog>
        
    </div>
</template>

<script>
    import { fetchOilFields,fetchPlatforms,uploadFile,ljpmImgUploadFile, fetchProductionWells,fetchProductionWellsByPlatform,getLjpmWells,} from "@/api/oilDeposit/rem-02/primaryinfo.js";
    //miniIo
    import { getBlockWell,getMajorEventsBriefly} from "@/api/oilDeposit/rem-04/oilAuxiliaryAnalysis.js";
    import FileUpload from "@/components/intelligentOilfield/FileUpload/index.vue";
    import {addRemUploadFileMinio} from "@/api/rem/remuploadfileminio";
    import {downFile} from "@/components/upload/utils/file";
    import FileSaver from "file-saver";
    export default {
        name: "OilAuxiliaryAnalysis",
        components: {FileUpload},
        data() {
            return {
                //minIo
                ljpmDialogLast: false,//miniIo弹框是否显示
                isUpdateFile:false,//是否展示minio上传按钮
                limit:1,
                fileType:['pdf'],
                imageurl:'',
                operationTypeList:{
                    whileDrillingTrajectory:{//地质探边图
                        operationType:'OILDZTBT',
                        limit:1,
                        fileType:['bmp','jpg','jpeg','png','pdf']
                    },
                    wellNetworkDiagram:{//井网图
                        operationType:'OILJWT',
                        limit:1,
                        fileType:['bmp','jpg','jpeg','png','pdf']
                    },
                    completionStringDrawing:{//完井管柱图
                        operationType:'OILWJGZT',
                        limit:1,
                        fileType:['bmp','jpg','jpeg','png','pdf']
                    },
                    fluidProducingProfile:{//产液剖面
                        operationType:'OILCYPM',
                        limit:1,
                        fileType:['pdf'],
                    },
                    saturationLog:{//饱和度测井
                        operationType:'OILBHDCJ',
                        limit:1,
                        fileType:['pdf'],
                    },
                    wellTestReport:{//试井报告
                        operationType:'OILSJBG',
                        limit:1,
                        fileType:['pdf'],
                    },
                    drillingReport:{//钻完井报告
                        operationType:'YJZWJBG',
                        limit:1,
                        fileType:['pdf'],
                    },
                    completionReport:{//完井完工报告
                        operationType:'YJWJWGBG',
                        limit:1,
                        fileType:['pdf'],
                    },
                    geologicalSummary:{//完井地质总结
                        operationType:'YJWJDZZJ',
                        limit:1,
                        fileType:['pdf']
                    },
                },
                //文件下载的id
                fileId:'',
                downloadButton: false,
                
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
                //区块id
                blockId:'',
                //采油井信息
                wellData: [],
                ljpmWellData: [],
                fileList: [],
                component: null,
                activeName: "staticData",
                currentModule: "smallLayerStructureDiagram",
                queryParams: {
                    ogfId: "",
                    platId: "",
                },
                tabs: [
                    {
                        label: "静态资料",
                        name: "staticData",
                        modules: [
                            {
                                label: '小层顶面构造图',
                                name: 'smallLayerStructureDiagram',
                            },
                            {
                                label: '地震属性图', //原小层平面图
                                name: 'smallFloorPlan',
                            },
                            {
                                label: '地震剖面图',
                                name: 'seismicProfile',
                            },
                            {
                                label: '沉积相图',
                                name: 'theSedimentaryFaciesMap',
                            },
                            {
                                label: '地质探边图',
                                name: 'whileDrillingTrajectory',
                            },
                            {
                                label: "连井剖面图",
                                name: "connecting",
                            },
                            /* {
                                 label: "测井曲线",
                                 name: "wellLoggingCurve",
                            },*/
                            /*{
                                label: "固井质量测井图",
                                name: "cementingQualityLog",
                              },*/
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
                        ],
                    },
                    {
                        label: "生产动态资料",
                        name: "productionDynamicData",
                        modules: [{
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
                        modules: [{
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
                //子组件返回数据
                childParam: "",
                
                //连井剖面弹窗
                ljpmDialog: false,
                //连井剖面是否选中
                ljpmTag: false,
                //连井上传图片表单
                props: {
                    key: "wellId",
                    label: "wellName",
                },
                ljUploadForm: {
                    imageurl:'',
                    minioFiles:[],
                    direction: "横向",
                    chooseWell: [],
                },
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
            "$route.query.wellId"(){ // 监听路由变化
                this.initData();
            },
        },
        mounted() {
            this.initData();
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
            //minIo文件-存库
            uploadFile(params){
                this.ljpmDialogLast = false;
                addRemUploadFileMinio(params).then((res) => {
                    if (res.data.code == 200) {
                        this.$message.success("文件上传成功!");
                        this.ljpmDialogLast = false;
                        this.imageurl = '';
                        this.doSearch();
                    }else {
                        this.$message.error("文件上传失败!");
                        this.ljpmDialog = false;
                        this.imageurl = '';
                        this.doSearch();
                    }
                });
            },
            //minIo-下载
            doDownLoadNew(){
                // const id = this.$refs.componentCustom.id
                // let fileName = this.$refs.componentCustom.fileName
                // downFile(id).then((res) => {
                //     FileSaver.saveAs(res,`${fileName}`);
                // });
                //如果是产液剖面||饱和度测井-则下载表格
                // if(this.currentModule=='fluidProducingProfile'||this.currentModule=='saturationLog'){
                    this.$refs.componentCustom.doDownLoad();
                // }
            },
            
            //连井剖面弹框-打开
            ljpmUploadDialog() {
                this.ljpmDialog = true;
            },
            //连井剖面弹框-取消|关闭
            ljpmDialogClose() {
                this.ljUploadForm = {
                    imageurl:'',
                    minioFiles:[],
                    direction: "横向",
                    chooseWell: [],
                };
                this.ljpmDialog = false;
            },
            //连井剖面弹框-图片上传
            getResData2(data){
                this.ljUploadForm.minioFiles=data;
            },
            //连井剖面弹框-确定
            async ljpmUploadSave() {
                if(!this.ljUploadForm.minioFiles.length){
                    this.$message.warning("请上传图片！");
                    return;
                }else if (this.ljUploadForm.chooseWell == null || !this.ljUploadForm.chooseWell.length) {
                    this.$message.warning("请选择井号！");
                    return;
                }else{
                    let operationId=this.ljUploadForm.chooseWell.join(';');
                    for(let i=0;i<this.ljUploadForm.minioFiles.length;i++){
                        let params = {
                            fileId:this.ljUploadForm.minioFiles[i].id,
                            filestrId:this.ljUploadForm.minioFiles[i].name,
                            fileDirection:this.ljUploadForm.direction,
                            operationId,
                            operationType:'REMLJPMT',
                            fileDirection:this.ljUploadForm.direction,
                            remUploadFileMinioId:'',
                        };
                        await addRemUploadFileMinio(params).then(res =>res);
                        console.log(`这是第${i+1}个`);
                    }
                    this.$message.success("文件上传成功!");
                    this.ljpmDialog = false;
                    this.ljUploadForm = {
                        imageurl:'',
                        minioFiles:[],
                        direction: "横向",
                        chooseWell: [],
                    };
                    this.doSearch();
                }
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
            queryInfo(queryString) {
                console.log(queryString);
            },
            //点击一级
            handleClick(tab) {
                this.activeName = tab.name;
                this.currentModule = this.tabs[tab.index].modules[0].name;
                this.isUpdateFile=false;
                for(let key in this.operationTypeList){
                    if(key==this.currentModule){
                        this.isUpdateFile=true;
                        return false;
                    }
                }
            },
            //点击二级
            tapTabs2(module){
                this.currentModule = module.name;
                this.isUpdateFile=false;
                for(let key in this.operationTypeList){
                    if(key==this.currentModule){
                        this.isUpdateFile=true;
                        return false;
                    }
                }
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
                if (!wellId) {
                    if (this.wellData && this.wellData.length > 0) {
                        this.selectWellId = this.wellData[0].wellId;
                    }
                } else {
                    let wellMess = this.wellData.find((item) => {
                        return item.wellId == wellId;
                    });
                    this.selectWellId = wellMess.wellId;
                }
                
                await this.getBlockWellApi();
                this.getLjpmWells();
                this.doSearch();
            },
            //获取全部的油水井
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
            //获得平台数据@param oilFieldId
            getFetchPlatforms(oilFieldId) {
                let request = {
                    oilFieldId: oilFieldId,
                };
                fetchPlatforms(request).then((res) => {
                    if (res.data.code == 200) {
                        this.platform = res.data.data.platform;
                        this.selectPlatform = this.platform[0].platFormId;
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
                        this.selectWellId = this.wellData[0].wellId;
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
                        this.selectWellId = this.wellData[0].wellId;
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
          
            //子组件传递参数
            changeChildParam(val) {
                this.childParam = val;
            },
            
            //根据井号id获取区块id
            async getBlockWellApi(){
                await getBlockWell({wellId:this.selectWellId}).then(res=>{
                    if(res.data.code==200){
                        this.blockId=res.data.data.blockId;
                    }
                })
            },
            //搜索功能
            doSearch() {
                this.$refs.componentCustom.oilFeildId = this.selectOilField;
                this.$refs.componentCustom.platform = this.selectPlatform;
                this.$refs.componentCustom.wellId = this.selectWellId;
                if(this.$refs.componentCustom.blockId){
                    this.$refs.componentCustom.blockId = this.blockId;
                }
                
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
                if(this.$refs.componentCustom.selectPosition){
                    this.$refs.componentCustom.selectPosition = this.childParam;
                }
                this.getBlockWellApi();
            },
            //返回
            goBack(){
                this.$router.push({
                    path:'/dynamicManagement/dynamicTrackingOilAuxiliary/oilAnalysisReport'
                })
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
    
    
    ::v-deep .el-dialog__footer{
        text-align:center;
    }
    
</style>
