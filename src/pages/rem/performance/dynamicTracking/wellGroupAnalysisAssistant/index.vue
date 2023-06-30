<!-- 井组辅助分析 -->
<template>
    <div class="app-container">
        
        <headerSearch style="height: 80px">
            <div class="g-row-flex-V g-w100 g-h100">
                <span class="title">油田：</span>
                <el-select v-model="selectOilField" placeholder="请选择" filterable clearable disabled @change="changeSelectOilField" style="margin-right: 15px">
                    <el-option v-for="item in oilField" :key="item.oilFieldId" :label="item.name" :value="item.oilFieldId"></el-option>
                </el-select>
                <span class="title">区块：</span>
                <el-select v-model="selectBlock" placeholder="请选择" filterable @change="changeSelectBlock" style="margin-right: 15px">
                    <el-option v-for="item in block" :key="item.fieldId" :label="item.name" :value="item.fieldId"></el-option>
                </el-select>
                <span class="title" v-if="currentModule == 'wellGroupDevelopment' || currentModule == 'injectionProductionCorresponding'">井组切换：</span>
                <el-select v-model="wellCentre" placeholder="请选择" @change="changeSelectWellCentre" style="margin-right: 15px" v-if="currentModule == 'wellGroupDevelopment' || currentModule == 'injectionProductionCorresponding'">
                    <el-option label="以水井为中心" value="WATERCENTRE"></el-option>
                    <el-option label="以油井为中心" value="OILCENTRE"></el-option>
                </el-select>
                
                <span class="title">井组：</span>
                <!-- <el-select v-if="currentModule != 'dynamicsInjection' &&currentModule != 'changingDynamics' &&currentModule != 'stateChange'" v-model="selectWellGroup" placeholder="请选择" filterable clearable style="margin-right: 15px">
                    <el-option v-for="item in wellGroup" :key="item.wellGroupId" :label="item.name" :value="item.wellGroupId"></el-option>
                </el-select> -->
                <el-select  v-model="selectWellGroup" placeholder="请选择" filterable clearable style="margin-right: 15px">
                    <el-option v-for="item in newWellGroup" :key="item.wellGroupId" :label="item.wellGroupName" :value="item.wellGroupId"></el-option>
                </el-select>
                
                <el-button type="primary" icon="el-icon-search" @click="doSearch">搜索 </el-button>
                <el-button class="commonBtn" icon="el-icon-refresh" @click="resetting">重置</el-button>
            </div>
        </headerSearch>
        
        <pagePanelNew style="height: calc(100% - 100px)" class="g-w100">
            
            <div class="pagepanel-btns" v-if="isUpdateFile" style="height:34px;margin-bottom:10px;display: flex;justify-content: flex-end;position: absolute;right:20px;top:16px;z-index: 2;">
                <!-- minIo上传 -->
                <el-button v-if="isUpdateFile" type="primary" icon="el-icon-upload2" style="margin-left: auto !important" @click="ljpmUploadDialogLast" >上传文档</el-button>
                <!-- minIo下载 -->
                <el-button type="primary" icon="el-icon-download" style="margin-left:15px;" :disabled="downloadButton" @click="doDownLoadNew">下载</el-button>
            </div>
            
            <el-tabs class="g-pageHeader" style="margin-bottom: 15px" v-model="activeName" topline @tab-click="handleClick">
                <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.label" :name="item.name">
                    <el-button v-for="(module, index) in item.modules" :key="index" :class="currentModule == module.name ? 'el-button--primary' : 'commonBtn'" @click="handleTwoClicj(module)">{{ module.label }}</el-button>
                </el-tab-pane>
            </el-tabs>
            
            <keep-alive :include="[]" :max="10" v-if="wellGroup.length">
                <component :is="component" ref="componentCustom" :oil-field-id="selectOilField" :block-id="selectBlock" :wellCentre="wellCentre" :well-group-id="selectWellGroup" @childPara="changeChildParam"></component>
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
    import {
        fetchOilFields,
        fetchFields,
        fieldLayers,
        wellGroups,
        uploadFile,
        getLjpmWells,
    } from "@/api/oilDeposit/rem-02/primaryinfo.js";
    import {
        wellGroupList
    } from "@/api/rem/wellgroupinformaintenance";
    import FileUpload from "@/components/intelligentOilfield/FileUpload/index.vue";
    export default {
        components: {
            FileUpload,
        },
        name: "WellGroupAnalysisAssistant",
        data() {
            return {
                //minIo
                isUpdateFile:true,//是否显示上传文档按钮
                ljpmDialogLast: false,
                limit:1,
                fileType:['pdf'],
                imageurl:'',
                operationTypeList:{
                    smallLayerStructureDiagram:{//小层顶面构造图
                        operationType:'WELLGROUPXCDMGZT',
                        limit:3,
                        fileType:['bmp','jpg','jpeg','png','pdf']
                    },
                    seismicAttributes:{//地震属性图
                        operationType:'WELLGROUPDZSXT',
                        limit:1,
                        fileType:['bmp','jpg','jpeg','png','pdf']
                    },
                    thicknessOfSandLayer:{//沉积相图
                        operationType:'WELLGROUPCJXT',
                        limit:1,
                        fileType:['bmp','jpg','jpeg','png','pdf']
                    },
                    effectiveThickness:{//有效厚层图
                        operationType:'WELLGROUPYXHCT',
                        limit:1,
                        fileType:['bmp','jpg','jpeg','png','pdf']
                    },
                    permeabilityDistribution:{//渗透率分布图
                        operationType:'WELLGROUPSTFBT',
                        limit:1,
                        fileType:['bmp','jpg','jpeg','png','pdf']
                    },
                    wellGroupConnection:{//井组连通图
                        operationType:'WELLGROUPJZLTT',
                        limit:1,
                        fileType:['bmp','jpg','jpeg','png','pdf']
                    },
                },
                fileId:'',
                downloadButton: false,

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
                                isUpdateFile:true,
                                label: "小层顶面构造图",
                                name: "smallLayerStructureDiagram",
                            },
                            {
                                isUpdateFile:true,
                                label: "地震属性图",
                                name: "seismicAttributes",
                            },
                            {
                                isUpdateFile:true,
                                label: "沉积相图",
                                name: "thicknessOfSandLayer",
                            },
                            {
                                isUpdateFile:true,
                                label: "有效厚层图",
                                name: "effectiveThickness",
                            },
                            {
                                isUpdateFile:true,
                                label: "渗透率分布图",
                                name: "permeabilityDistribution",
                            },
                            {
                                isUpdateFile:true,
                                label: "井组连通图",
                                name: "wellGroupConnection",
                            },
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
                                isUpdateFile:true,
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
            //子组件传递的层位参数
            changeChildParam(val) {
                this.childParam = val;
            },
            //minIo-监听上传
            getResData(data){
                console.log('data123456789',data)
                let operationType=this.operationTypeList[this.currentModule].operationType;
                let params = {
                    fileId: data[0].id,
                    filestrId:data[0].name,
                    remUploadFileMinioId:'' ,
                    operationId:this.childParam+this.selectWellGroup,
                    operationType,
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
            resetting() {
                let activeName = this.activeName;
                let currentModule = this.currentModule;
                this.currentModule = '';
                this.$nextTick(() => {
                    Object.assign(this.$data, this.$options.data());
                    this.activeName = activeName;
                    this.currentModule = currentModule;
                    this.initData();
                })
            },
            //点击一级tabs
            handleClick(tab) {
                this.activeName = tab.name;
                this.currentModule = this.tabs[tab.index].modules[0].name;
                this.isUpdateFile=this.tabs[tab.index].modules[0].isUpdateFile?true:false;
            },
            //点击二级tabs
            handleTwoClicj(module) {
                this.currentModule = module.name;
                for(let i=0;i<this.tabs.length;i++){
                    let modules=this.tabs[i].modules;
                    for(let j=0;j<modules.length;j++){
                        if(this.currentModule==modules[j].name){
                            this.isUpdateFile=modules[j].isUpdateFile?true:false;
                            break;
                        }
                    }
                }
                if(this.currentModule == "dynamicsInjection" ||this.currentModule == "changingDynamics" ||this.currentModule == "stateChange") {
                    this.selectWellGroup = this.newWellGroup[0].wellGroupId;
                } else {
                    this.selectWellGroup = this.wellGroup[0].wellGroupId;
                }
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
                await fetchFields({
                    oilFieldId: this.selectOilField
                }).then((res) => {
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
                let obj = {
                    blockId: "YCFXDY8B643EDC9007F96F570600457D",
                    dateTime: "",
                    ogfId: "",
                    wellDataDtoList: [{
                        wellId: "",
                        wellName: ""
                    }],
                    wellGroupId: ""
                }
                wellGroupList(obj).then((res) => {
                    if (res.data.code == 200 && res.data.data && res.data.data.length) {
                        this.newWellGroup = res.data.data;
                        this.selectWellGroup = this.newWellGroup[0].wellGroupId;
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
                let blockId = this.selectBlock
                if (blockId == '3FC9A818F5BC43B88270DB80BBB3018F') {
                    blockId = 'YCFXDY8B643EDC9007F96F570600457D'
                }
                let obj = {
                    blockId: blockId,
                    dateTime: "",
                    ogfId: "",
                    wellDataDtoList: [{
                        wellId: "",
                        wellName: ""
                    }],
                    wellGroupId: ""
                }
                //动态资料-井组配注变化动态||井组连通性变化动态||注采井网状态变化 调zxp这个接口
                wellGroupList(obj).then((res) => {
                    if (res.data.code == 200 && res.data.data && res.data.data.length) {
                        this.newWellGroup = res.data.data;
                        this.selectWellGroup= this.newWellGroup[0].wellGroupId
                    }
                });
            },
            //改变选中井组切换内容
            changeSelectWellCentre() {},
            
            //下载
            doDownLoad() {
                let wellGroupThing = this.wellGroup.find((item) => {
                    return item.wellGroupId == this.selectWellGroup;
                });
                this.$refs.componentCustom.wellGroupName = wellGroupThing ? wellGroupThing.name : '';
                this.$refs.componentCustom.doDownLoad();
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
