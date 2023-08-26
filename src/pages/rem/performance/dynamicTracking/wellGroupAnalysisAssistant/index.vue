<!-- 井组辅助分析 -->
<template>
        <div style="display: flex; flex-direction: row; height: calc(100%)">
        <div style="height: 100%">
        <treeSelectionCustom
            ref="treeSelectionCustom"
            level="5"
            :treeType="4"
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
                    <el-select v-model="selectOilField" placeholder="请选择" filterable disabled @change="changeSelectOilField" style="margin-right: 15px">
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
                    <el-select  v-model="selectWellGroup" placeholder="请选择" filterable  style="margin-right: 15px" @change="changeWellGroup">
                        <el-option v-for="item in newWellGroup" :key="item.wellGroupId" :label="item.wellGroupName" :value="item.wellGroupId"></el-option>
                    </el-select>
                    
                    <el-button type="primary" icon="el-icon-search" @click="doSearch">搜索 </el-button>
                    <el-button class="commonBtn" icon="el-icon-refresh" @click="resetting">重置</el-button>
                </div>
            </headerSearch>
            
            <pagePanelNew style="height: calc(100% - 100px)" class="g-w100">
                <!-- v-if="isUpdateFile"  -->
                <div class="pagepanel-btns" style="height:34px;margin-bottom:10px;display: flex;justify-content: flex-end;position: absolute;right:20px;top:16px;z-index: 2;">
                    <!-- minIo上传 -->
                    <el-button v-if="isUpdateFile" type="primary" icon="el-icon-upload2" style="margin-left: auto !important" @click="ljpmUploadDialogLast" >上传文档</el-button>
                    <!-- minIo下载 -->
                    <el-button type="primary" icon="el-icon-download" style="margin-left:15px;" :disabled="downloadButton" @click="doDownLoadNew">下载</el-button>
                    <!-- 返回 -->
                    <el-button type="primary" v-if="$route.query.wellId" style="margin-left:15px;" @click="goBack">返回</el-button>
                </div>
                
                <el-tabs class="g-pageHeader" style="margin-bottom: 15px" v-model="activeName" topline @tab-click="handleClick">
                    <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.label" :name="item.name">
                        <!-- <el-button v-for="(module, index) in item.modules" :key="index" :class="currentModule == module.name ? 'el-button--primary' : 'commonBtn'" @click="handleTwoClicj(module)">{{ module.label }}</el-button> -->
                        <sliderTabs :tabs="item.modules" :currentModule="currentModule" @tabTabs="handleTwoClicj"></sliderTabs>
                    </el-tab-pane>
                </el-tabs>
                
                <keep-alive :include="[]" :max="10" v-if="selectBlock">
                    <component :is="component" ref="componentCustom" :oilFieldId="selectOilField" :blockId="selectBlock" :wellCentre="wellCentre" :wellGroupId="selectWellGroup" @childPara="changeChildParam"></component>
                </keep-alive>
                
            </pagePanelNew>
            
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
    </div>
</template>

<script>
    import { fetchOilFields,fetchFields,fieldLayers, wellGroups,uploadFile,getLjpmWells,} from "@/api/oilDeposit/rem-02/primaryinfo.js";
    import { wellGroupList} from "@/api/rem/wellgroupinformaintenance";
    import FileUpload from "@/components/intelligentOilfield/FileUpload/index.vue";
    // Minio
    import {addRemUploadFileMinio} from "@/api/rem/remuploadfileminio";
    import {downFile} from "@/components/upload/utils/file";
    import FileSaver from "file-saver";
    import treeSelectionCustom from "@/pages/rem/basic/components/treeSelectionCustom.vue";
    import sliderTabs from './components/slider-tabs.vue';

    export default {
        components: {
            FileUpload,
            treeSelectionCustom,
            sliderTabs
        },
        name: "WellGroupAnalysisAssistant",
        data() {
            return {
                // 主数据树结构默认选中的值
                defaultCheckedKeys: [],
                //minIo
                isUpdateFile:false,//是否显示上传文档按钮
                ljpmDialogLast: false,
                limit:1,
                fileType:['pdf'],
                imageurl:'',
                operationTypeList:{
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
                            // {
                            //     label: "调驱/调剖",
                            //     name: "effectOfMeasures",
                            // },
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
            "$route.query.wellId"(){ // 监听路由变化
                this.initData();
            },
        },
        async mounted() {
            await this.initData();
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
                    operationId:this.selectBlock+'-'+this.selectWellGroup,//这个值很重要，这是确定业务与图片的依赖关系。
                    operationType,//这个值很重要，这是确定业务与图片的依赖关系。
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
                //是否显示minio上传文档按钮
                this.isUpdateFile=this.operationTypeList[this.currentModule]?true:false;
                if(this.operationTypeList[this.currentModule]&&this.operationTypeList[this.currentModule].limit){
                    this.limit=this.operationTypeList[this.currentModule].limit;
                    this.fileType=this.operationTypeList[this.currentModule].fileType;
                }
            },
            //点击二级tabs
            handleTwoClicj(name) {
                this.currentModule = name;
                this.selectWellGroup = this.newWellGroup[0].wellGroupId;
                this.childParam='';//清空层位
                //是否显示minio上传文档按钮
                this.isUpdateFile=this.operationTypeList[this.currentModule]?true:false;
                if(this.operationTypeList[this.currentModule]&&this.operationTypeList[this.currentModule].limit){
                    this.limit=this.operationTypeList[this.currentModule].limit;
                    this.fileType=this.operationTypeList[this.currentModule].fileType;
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
                        if (this.$route.query.block) {
                            //先走传参
                            this.selectBlock = this.$route.query.block;
                        } else {
                            this.selectBlock = this.selectOilField;
                        }
                    }
                });
                //井组信息初始化
                let obj = {
                    ogfId: this.selectOilField,
                    blockId: "YCFXDY8B643EDC9007F96F570600457D",
                }
                await wellGroupList(obj).then((res) => {
                    if (res.data.code == 200 && res.data.data && res.data.data.length) {
                        this.newWellGroup = res.data.data;
                        if(this.$route.query.wellId){
                            let item=this.newWellGroup.find(el=>el.wellGroupName==this.$route.query.wellId);
                            console.log(item,88)
                            this.selectWellGroup=item.wellGroupId;
                        }else{
                            this.selectWellGroup = this.newWellGroup[0].wellGroupId;
                        }
                    }
                });
                this.doSearch();
            },
            // 井组切换事件
            changeWellGroup() {
                this.$refs.treeSelectionCustom.setCheckedKeys([this.selectBlock, this.selectWellGroup]);
            },
            // 主数据树结构数选中数据 selectList：选中数据Id集合，selectData：当前选中数据对象
            getSelectItems(selectList, selectData) {
                // 油田选中数据
                // this.selYtdm = selectList.ogfId;
                // 区块选中数据
                this.selectBlock = selectList.blockId;
                // 井组选中数据
                this.selectWellGroup = selectList.wellGroupId;
                // 判断如果没有wellGroupList没有当前井组，调取井组接口根据区块获取井号数据
                let isUpdata = this.newWellGroup.map((item) => item.wellId).includes(selectList.selectWellGroup);
                if (!isUpdata || selectList.blockId != this.selectBlock) {
                    wellGroupList({ogfId: this.selYtdm, blockId: this.selectBlock}).then((res) => {
                    if (res.data.code == 200) {
                        this.newWellGroup = res.data.data;
                    }
                });
                }
            },
            //搜索功能
            doSearch() {
                this.$nextTick(() => {
                    console.log( this.$refs.componentCustom)  
                    this.$refs.componentCustom.oilFieldId = this.selectOilField; 
                    this.$refs.componentCustom.blockId = this.selectBlock
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
                // TODO lv 页面没有使用，代码检查错误先注释
                // let oilFieldId = [];
                if (this.selectOilField == this.selectBlock) {
                    this.block.forEach((item, index) => {
                        oilFieldId.push(item.fieldId);
                    });
                } else {
                    // TODO lv 页面没有使用，代码检查错误先注释
                    // oilFieldId.push(this.selectBlock);
                }
                let blockId = this.selectBlock
                if (blockId == '3FC9A818F5BC43B88270DB80BBB3018F') {
                    blockId = 'YCFXDY8B643EDC9007F96F570600457D'
                }
                let obj = {
                    ogfId: this.selectOilField,
                    blockId: blockId,
                }
                //动态资料-井组配注变化动态||井组连通性变化动态||注采井网状态变化 调zxp这个接口
                wellGroupList(obj).then((res) => {
                    if (res.data.code == 200) {
                        if(res.data.data && res.data.data.length){
                            this.newWellGroup = res.data.data;
                            this.selectWellGroup= this.newWellGroup[0].wellGroupId
                        }else{
                            this.newWellGroup =[];
                            this.selectWellGroup= '';
                        }
                        this.$refs.treeSelectionCustom.setCheckedKeys([this.selectBlock, this.selectWellGroup]);
                    }
                });
            },
            //改变选中井组切换内容
            changeSelectWellCentre() {},
            //返回
            goBack(){
                this.$router.push({
                    path:'/dynamicManagement/dynamicTrackingWellGroup/wellGroupAnalysisReport'
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

    ::v-deep .el-upload-list {
        display: none;
    }
</style>
