<!-- 井组辅助分析 -->
<template>
    <div class="app-container">
        <headerSearch style="height:80px;">
            <div class="g-row-flex-V g-w100 g-h100">
                <span class="title">油田：</span>
                <el-select v-model="selectOilField" placeholder="请选择" filterable clearable disabled @change="changeSelectOilField" style="margin-right: 20px">
                    <el-option v-for="item in oilField" :key="item.oilFieldId" :label="item.name" :value="item.oilFieldId"></el-option>
                </el-select>
                <span class="title">区块：</span>
                <el-select v-model="selectBlock" placeholder="请选择" filterable clearable @change="changeSelectBlock" style="margin-right: 20px">
                    <el-option v-for="item in block" :key="item.fieldId" :label="item.name" :value="item.fieldId"></el-option>
                </el-select>
                <!-- <span class="title">层系：</span>
                <el-select v-model="selectLayer" style="width: 10%" filterable  clearable>
                   <el-option v-for="item in layer" :key="item.fieldLayerId" :label="item.layerName" :value="item.fieldLayerId"></el-option>
                </el-select> --> 
                <span class="title">井组：</span>
                <el-select v-model="selectWellGroup" placeholder="请选择" filterable clearable style="margin-right: 20px">
                    <el-option v-for="item in wellGroup" :key="item.wellGroupId" :label="item.name" :value="item.wellGroupId"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" style="margin-right: 20px" @click="doSearch">检索</el-button>
                <el-upload ref="upload" style="margin-right: 20px" class="upload-demo" action="" :auto-upload="false" :on-change="useUploadPic" :show-file-list="false" v-show="canUpload">
                    <el-button type="primary">上传文档</el-button>
                </el-upload>
                <el-button  type="primary" @click="doDownLoad" v-show="canDownload">下载</el-button>
            </div>
        </headerSearch>
        <pagePanelNew headerTitle="" style="height: calc(100% - 100px)" class="g-w100">
            <el-tabs class="g-pageHeader" style="margin-bottom:15px;" v-model="activeName" topline @tab-click="handleClick">
                <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.label" :name="item.name">
                    <el-button v-for="(module, index) in item.modules" :key="index" :class="currentModule == module.name ? 'el-button--primary' : 'commonBtn'" @click="currentModule = module.name">{{ module.label }}</el-button>
                </el-tab-pane>
            </el-tabs>
            <keep-alive :include="[]" :max="10" v-if="selectWellGroup">
                <component :is="component" ref="componentCustom" :oil-field-id="selectOilField" :block-id="selectBlock" :layer-id="selectLayer" :well-group-id="selectWellGroup" @childPara="changeChildParam"></component>
            </keep-alive>
        </pagePanelNew>
    </div>
</template>

<script>
    import {fetchOilFields, fetchFields,fieldLayers, wellGroups,uploadFile,} from '@/api/oilDeposit/rem-02/primaryinfo.js';
    // import { getWidgetByAreaUser} from "@/api/rmm-01/rmm01";
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
                //层系选中值
                selectLayer: '',
                //层系列表
                layer: [],
                //井组选中值
                selectWellGroup: '',
                //井组列表
                wellGroup: [],
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
                            // {
                            //     label: "渗透率分布图",
                            //     name: "permeabilityDistribution",
                            // },
                            // {
                            //     label: "井组连通图",
                            //     name: "wellGroupConnection",
                            // },
                            /*  {
                                label: "渗透率柱状图",
                                name: "permeabilityColumnar",
                              },*/
                        ],
                    },
                    // {
                    //     label: "动态资料",
                    //     name: "dynamicData",
                    //     modules: [
                    //         {
                    //             label: "井组开发曲线",
                    //             name: "wellGroupDevelopment",
                    //         },
                    //         {
                    //             label: "注采对应曲线",
                    //             name: "injectionProductionCorresponding",
                    //         },
                    //         {
                    //             label: "示踪剂",
                    //             name: "tracer",
                    //         },
                    //         {
                    //             label: "措施效果",
                    //             name: "effectOfMeasures",
                    //         },
                    //     ],
                    // },
                ],
                //文件名称对应项
                tabsPathName: [
                    {
                        name: 'smallLayerStructureDiagram',
                        pathName: "STRUCTURE"
                    }, //小层顶面构造图
                    {
                        name: 'seismicAttributes',
                        pathName: 'SEISMIC_ATTRIBUTES'
                    }, //地震属性图
                    {
                        name: 'wellGroupConnection',
                        pathName: 'WELL_GROUP_CONNECTION'
                    }, //井组连通图
                    {
                        name: 'thicknessOfSandLayer',
                        pathName: 'THICKNESS_SAND_LAYER'
                    }, //砂层厚度图
                    {
                        name: 'effectiveThickness',
                        pathName: 'EFFECTIVE_THICKNESS'
                    }, //有效厚度图
                    {
                        name: 'permeabilityDistribution',
                        pathName: 'PERMEABILITY_DISTRIBUTION'
                    }, //渗透率分布图
                    {
                        name: 'permeabilityColumnar',
                        pathName: 'PERMEABILITY_COLUMNAR'
                    }, //渗透率分布图
                    {
                        name: 'tracer',
                        pathName: 'TRACER'
                    }, //示踪剂
                ],
                //子组件返回数据
                childParam: '',
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
                canDownload: true,
                //上传数据
                canUpload: true,
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
        //监视
        watch: {
            //监视当前module
            currentModule: {
                immediate: true,
                handler(newName, oldName) {
                    this.loader().then(() => {
                        this.component = () => this.loader();
                    }).catch(() => {
                        this.component = () => import("./modules/reservoirData/seismicAttributes.vue");
                    });
                },
            },
            /*selectOilField(val) {
              this.getFetchFields(val);
              this.getFieldLayers(val);
            },
            selectBlock(val){
              this.getWellGroups();
            },*/
        },
        mounted() {
            this.initData();
            //获取权限问题内容
            // this.getPageAuthMessage();
        },
        methods: {
            //点击标签自动切换并默认第一个module内容
            handleClick(tab) {
                this.activeName = tab.name;
                this.currentModule = this.tabs[tab.index].modules[0].name;
            },
            //初始化页面
            async initData() {
                let oilFeildId = this.$route.params.oilField;
                let blockId = this.$route.params.block;
                let wellId = this.$route.params.wellId;
                console.log(oilFeildId, blockId, wellId);
                //油田信息初始化
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
                //默认qhd32-6
                if (oilFeildId == undefined || oilFeildId == null) {
                    this.selectOilField = '3FC9A818F5BC43B88270DB80BBB3018F';
                } else {
                    this.selectOilField = oilFeildId;
                }
                //区块信息初始化
                let requestField = {
                    oilFieldId: this.selectOilField
                };
                await fetchFields(requestField).then((res) => {
                    if (res.data.code == 200) {
                        this.block = res.data.data.fields;
                        //区块 全部默认为 油田id
                        this.selectBlock = this.selectOilField;
                    }
                });
                if (blockId == undefined || blockId == null) {
                    this.selectBlock = '3FC9A818F5BC43B88270DB80BBB3018F';
                } else {
                    this.selectBlock = blockId;
                }
                //层系
                let requestLayer = {
                    oilFieldId: this.selectOilField
                };
                fieldLayers(requestLayer).then((res) => {
                    if (res.data.code == 200) {
                        this.layer = res.data.data.fieldLayers;
                    }
                });
                let blockGroup = [];
                if (this.selectBlock == this.selectBlock) {
                    this.block.forEach((item, index) => {
                        blockGroup.push(item.fieldId);
                    });
                } else {
                    blockGroup.push(this.selectBlock);
                }
                let requestWellGroups = {
                    oilFieldId: blockGroup
                };
                //井组
                await wellGroups(requestWellGroups).then((res) => {
                    if (res.data.code == 200) {
                        this.wellGroup = res.data.data.wellGroups;
                    }
                });
                if (wellId == null || wellId == undefined) {
                    if (this.wellGroup && this.wellGroup.length > 0) {
                        this.selectWellGroup = this.wellGroup[0].wellGroupId;
                    }
                } else {
                    this.selectWellGroup = wellId;
                }
                this.doSearch();
            },
            //获得区块类型
            getFetchFields(oilFieldId) {
                let request = {
                    oilFieldId: oilFieldId,
                }
                fetchFields(request).then((res) => {
                    if (res.data.code == 200) {
                        this.block = res.data.data.fields;
                        //区块 全部默认为 油田id
                        this.selectBlock = this.selectOilField;
                    }
                })
            },
            //获得层位信息
            getFieldLayers(oilFieldId) {
                let request = {
                    oilFieldId: oilFieldId
                };
                fieldLayers(request).then((res) => {
                    if (res.data.code == 200) {
                        this.layer = res.data.data.fieldLayers;
                    }
                });
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
                }
                wellGroups(request).then((res) => {
                    if (res.data.code == 200) {
                        this.wellGroup = res.data.data.wellGroups;
                    }
                });
            },
            //上传图片文件
            async useUploadPic(file, fileList) {
                if (this.currentModule == 'smallLayerStructureDiagram' || this.currentModule =='seismicAttributes' || this.currentModule == 'thicknessOfSandLayer' ||this.currentModule == 'effectiveThickness' || this.currentModule == 'permeabilityDistribution') {
                    this.$message.error('该部分内容需要通过区块辅助分析进行上传');
                    return;
                }
                if (fileList.length > 1) {
                    this.fileList.slice(-1);
                }
                //获得油田参数
                // let oilFieldid = this.selectOilField;
                //获得区块id
                let block = this.selectBlock;
                //获得层系
                // let layer = this.selectLayer;
                //获得井组
                let wellGroup = this.selectWellGroup;
                //一级目录 油井目录
                let firstPath = 'well-group';
                //文件类型
                let fileType = file.raw.type;
                if (this.isCorrectFileType(fileType)) {
                    return true;
                }
                //获得图片二进制流
                const fileData = await this.selectImageFile(file.raw);
                let fileDataNew = fileData.replace(/^data:\w+\/[a-zA-Z-]+;base64,/, "");
                //获得当前选项中的映射关系
                let tabName = this.tabsPathName.find(
                    (item) => item.name == this.currentModule
                );
                if (tabName === null || tabName === undefined) {
                    this.$message.error('该标签无法上传文件或图片,请切换标签');
                    return
                }
                let position = this.childParam;
                let fileName = '';
                if (!wellGroup || wellGroup == '') {
                    this.$message.error('请选择井组');
                    return;
                }
                //有井层的情况
                if (tabName.pathName == 'TRACER') {
                    if (position.length <= 0) {
                        this.$message.error('请选择示踪剂的某项进行上传');
                        return;
                    }
                    //文件名称拼接
                    fileName = position + '_' + wellGroup;
                } else {
                    //文件名称拼接
                    fileName = tabName.pathName + '_' + wellGroup;
                }
                //请求参数
                let request = {
                    contentType: fileType,
                    data: fileDataNew,
                    fieldId: block,
                    fileName: fileName,
                    operatingCompanyId: '',
                    path: firstPath,
                    platformId: '',
                    wellGroupId: wellGroup,
                    wellId: '',
                    wellTypeCode: '',
                };
                uploadFile(request).then((res) => {
                    if (res.data.code == 0) {
                        this.$message.success('文件上传成功');
                        this.doSearch();
                    }
                });
            },
            //解析图片文件 图片文件转二进制流
            selectImageFile(file) {
                return new Promise(((resolve, reject) => {
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = ((result) => {
                        resolve(reader.result)
                    });
                }))
            },
            //检索功能
            doSearch() {
                this.$refs.componentCustom.wellId = this.selectWellId;
                this.$refs.componentCustom.oilFeildId = this.selectOilField;
                this.$refs.componentCustom.platform = this.selectPlatform;
                this.$refs.componentCustom.wellGroupId = this.selectWellGroup;
                //调用子组件的事件
                this.$refs.componentCustom.doSearch();
            },
            //子组件传递参数
            changeChildParam(val) {
                this.childParam = val;
                //console.log(this.childParam);
            },
            //下载
            doDownLoad() {
                let wellGroupThing = this.wellGroup.find((item) => {
                    return item.wellGroupId == this.selectWellGroup
                });
                this.$refs.componentCustom.wellGroupName = wellGroupThing.name;
                this.$refs.componentCustom.doDownLoad();
            },
            //判断上传文件是否是正确的类型
            isCorrectFileType(type) {
                if (this.currentModule == 'seismicAttributes' || this.currentModule == 'wellGroupConnection' || this
                    .currentModule == 'thicknessOfSandLayer' || this.currentModule == 'effectiveThickness' || this
                    .currentModule == 'permeabilityDistribution' ||
                    this.currentModule == 'permeabilityColumnar'
                ) {
                    if (type == 'image/bmp' || type == 'image/gif' || type == 'image/x-icon' || type == 'image/pipeg' ||
                        type == 'image/jpeg' || type == 'image/png') {
                        return false;
                    } else {
                        this.$message.error('请上传正确图片类型');
                        return true;
                    }
                } else if (this.currentModule == 'tracer') {
                    if (this.childParam == 'TRACER_REPORT') {
                        if (type == 'application/pdf') {
                            return false;
                        } else {
                            this.$message.error('请上传pdf类型文件');
                            return true;
                        }
                    } else if (this.childParam == 'TRACER_RESULTS' || this.childParam == 'TRACER_INFORMATION') {
                        if (type == 'image/bmp' || type == 'image/gif' || type == 'image/x-icon' || type ==
                            'image/pipeg' || type == 'image/jpeg' || type == 'image/png') {
                            return false;
                        } else {
                            this.$message.error('请上传正确图片类型');
                            return true;
                        }
                    }
                } else {
                    return true;
                }
            },
            //获取当前页面的权限内容，并处理其逻辑问题
            getPageAuthMessage() {
                this.userInfo = VSAuth.getAuthInfo();
                let myPath = this.$route.path;
                //该值可以为空
                let areaCode = "znytglxt";
                let loginName = this.userInfo.userName;
                if (loginName == "admin") {
                    this.canAddInfo = true;
                    this.canUpdateInfo = true;
                    this.canSendInfo = true;
                    this.canDeleteInfo = true;
                    this.canDownload = true;
                    this.canUpload = true;
                }
                getWidgetByAreaUser({"areaCode": areaCode,"loginName": loginName}).then(res => {
                    let myList = res.data.dataList;
                    if (myList) {
                        let pageMes = myList.find((item) => {
                            return item.resPvalue == myPath
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
            //改变选中油田内容
            changeSelectOilField(val) {
                this.selectLayer = '';
                this.getFetchFields(val);
                this.getFieldLayers(val);
            },
            //改变选中区块内容
            changeSelectBlock(val) {
                this.selectWellGroup = '';
                this.getWellGroups();
            },
        },
    };
</script>

<style lang="scss" scoped>
    .app-container{
        height:100%;
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
