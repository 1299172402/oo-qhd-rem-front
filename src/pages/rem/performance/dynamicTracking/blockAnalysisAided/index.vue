<!-- 区块辅助分析 -->
<template>
    <div class="app-container">
        <headerSearch style="height:80px;">
            <div class="g-row-flex-V g-w100 g-h100">
                <span class="title" style="margin-left: 20px">油田：</span>
                <el-select v-model="selectOilField" placeholder="请选择" filterable clearable disabled
                    @change="getFetchFields">
                    <el-option v-for="item in oilField" :key="item.oilFieldId" :label="item.name"
                        :value="item.oilFieldId"></el-option>
                </el-select>
                <!--开发构成曲线不显示 区块选择框-->
                <span style="margin-left: 20px"
                    v-show="!(currentModule == 'yieldCompositionCurve' || currentModule == 'developmentStatusTable')"
                    class="title">区块：</span>
                <el-select
                    v-show="!(currentModule == 'yieldCompositionCurve' || currentModule == 'developmentStatusTable')"
                    v-model="selectBlock" placeholder="请选择" filterable clearable @change="onChangeBlock">
                    <el-option v-for="item in block" :key="item.fieldId" :label="item.name" :value="item.fieldId">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" style="margin-left: 20px;" @click="doSearch">搜索
                </el-button>
                <el-upload ref="upload" style="margin-left: 20px;" class="upload-demo" action="" :auto-upload="false"
                    :on-change="useUploadPic" :show-file-list="false" v-show="canUpload">
                    <el-button type="primary" icon="el-icon-upload2">上传文档</el-button>
                </el-upload>
                <el-button style="margin-left: 20px;" type="primary" icon="el-icon-download" @click="doDownLoad"
                    v-show="canDownload">下载</el-button>
            </div>
        </headerSearch>
        <pagePanelNew style="height: calc(100% - 100px)" class="g-w100">
            <el-tabs class="g-pageHeader" style="margin-bottom:15px;" v-model="activeName" topline>
                <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.label" :name="item.name">
                    <sliderTabs :tabs="item.modules" :currentModule="currentModule" @tabTabs="tabTabs"></sliderTabs>
                </el-tab-pane>
            </el-tabs>
            <keep-alive :include="[]" :max="10" v-if="selectBlock">
                <component :is="component" ref="componentCustom" :oilFieldId="selectOilField" :block-id="selectBlock" @childPara="changeChildParam"></component>
            </keep-alive>
        </pagePanelNew>
    </div>
</template>
<script>
import { fetchFields, fetchOilFields, uploadFile } from '@/api/oilDeposit/rem-02/primaryinfo.js';
import sliderTabs from './components/slider-tabs.vue';
export default {
    name: 'blockAnalysisAided',
    components: {
        sliderTabs
    },
    data () {
        return {
            fileList: [],
            //油田
            oilField: [],
            //油田名字
            oilFieldName: '',
            //油田选中值
            selectOilField: '',
            //区块
            block: [],
            //区块选中值
            selectBlock: '',
            component: null,
            activeName: 'dynamicInformation',
            currentModule: 'cumulativeOilWaterProduction',
            queryParams: {},
            tabs: [
                // {    
                //     label: "储层资料",
                //     name: "reservoirData",  
                //     modules: [    
                //         {
                //             label: "综合地质图",  
                //             name: "geologicalMap",    
                //         },    
                //         { 
                //             label: "小层顶面构造图", //原构造图    
                //             name: "structuralMap",    
                //         }, 
                //         {    
                //             label: "地震属性图", //原孔隙度裂缝发育情况    
                //             name: "porosityDevelopment", 
                //         },    
                //         {    
                //             label: "沉积相图", 
                //             name: "sedimentaryMicrofacies",   
                //         },    
                //         {
                //             label: "渗透率分布图",   
                //             name: "permeabilityDistribution",    
                //         },
                //         {   
                //             label: "地震剖面图",    
                //             name: "reservoirProfile",
                //         },   
                //         {    
                //             label: "连井剖面图",
                //             name: "wellTieProfiles",    
                //         },    
                //         // // {一期代码就是注释的    
                //         // //   label: "砂层厚度图",  
                //         // //   name: "sandThicknessMap",    
                //         // // },    
                //         {    
                //             label: "有效厚度图",    
                //             name: "effectiveThicknessMap",    
                //         },  
                //         {    
                //             label: "油藏基础信息",    
                //             name: "basicReservoirInformation",    
                //         },   
                //         {    
                //             label: "相渗透率曲线", 
                //             name: "permeabilityCurve",   
                //         },    
                //         { 
                //             label: "岩心化验数据",   
                //             name: "coreTest",  
                //         }, 
                //         {   
                //             label: "五敏分析数据",    
                //             name: "fiveSensitivityAnalysis",
                //         }  
                //     ],    
                // },
                // {  
                //     label: "流体资料",    
                //     name: "fluidData",
                //     modules: [  
                //         {    
                //             label: "原油粘度",
                //             name: "viscosityOfCrudeOil",  
                //         },    
                //         {    
                //             label: "高压物性分析", 
                //             name: "highPressurePhysicalPropertyAnalysis",    
                //         },    
                //         { 
                //             label: "水物性数据",    
                //             name: "waterPhysicalPropertyData",    
                //         }, 
                //     ],    
                // },    
                // { 
                //     label: "开发资料",   
                //     name: "developmentMaterials",    
                //     modules: [
                //         {   
                //             label: "储量报告",    
                //             name: "reservesReport",
                //         },   
                //         {    
                //             label: "开发方案",
                //             name: "developmentPlan",   
                //         },    
                //         {
                //             label: "开发调整方案",    
                //             name: "developmentAdjustmentPlan",    
                //         },    
                //         {    
                //             label: "井网图",    
                //             name: "wellPattern",    
                //         },  
                //         {    
                //           label: "井网完善图",//一期代码就是注释的    
                //           name: "wellPatternImprovementChart",    
                //         },    
                //     ],    
                // },  
                {
                    label: '动态资料',
                    name: 'dynamicInformation',
                    modules: [
                        {
                            label: '累产液产油现状图',
                            name: 'cumulativeOilWaterProduction'
                        },
                        {
                            label: '含油饱和度分布图',
                            name: 'remainingOil'
                        },
                        {
                            label: '液油含水等值线图',
                            name: 'oilwaterIsoline'
                        },
                        // {一期代码就是注释        
                        //    label: "动液面等值图",    
                        //    name: "dynamicLiquidLevelEquivalence",        
                        // }, 
                        // {一期代码就是注释       
                        //    label: "动液面差值图",        
                        //    name: "dynamicLiquidLevelDifference",   
                        // },  
                        {
                            label: '液油含水差值图',
                            name: 'liquidOilDifferenceDiagram'
                        },
                        {
                            label: '地层压力分布图',
                            name: 'totalPressureDropDiagram'
                        },
                        {
                            label: '生产压差图',
                            name: 'differentialPressureDiagram'
                        },
                        {
                            label: '采液强度等值图',
                            name: 'fluidStrengthEquivalence'
                        },
                        {
                            label: '注水强度等值图',
                            name: 'isogramOfWaterInjectionIntensity'
                        },
                        {
                            label: '米采指数',
                            name: 'cumulativeOilProductionPerMeter'
                        },
                        {
                            label: '累积水油比分布图',
                            name: 'distributionOfAccumulatedwateroilRatio'
                        },
                        {
                            label: '注采比分布图',
                            name: 'injectionProductionRatioDistribution'
                        },
                        {
                            label: '综合开发曲线',
                            name: 'comprehensiveDevelopmentCurve'
                        },
                        {
                            label: '产量构成曲线',
                            name: 'yieldCompositionCurve'
                        },
                        {
                            label: '开发现状表',
                            name: 'developmentStatusTable'
                        },
                        {
                            label: '开发指标评价表',
                            name: 'developmentIndexEvaluationTable'
                        }
                    ]
                }
            ],
            //文件名称对应项
            tabsPathName: [
                {
                    name: 'permeabilityDistribution',
                    pathName: 'PERMEABILITY_DISTRIBUTION'
                },
                //渗透率分布图    
                {
                    name: 'wellTieProfiles',
                    pathName: 'WELL_GROUP_CONNECTION'
                },
                //连井剖面图   
                {
                    name: 'structuralMap',
                    pathName: 'STRUCTURE'
                },
                //构造图
                {
                    name: 'geologicalMap',
                    pathName: 'COMPREHENSIVE_GEOLOGY'
                },
                //综合地质图    
                {
                    name: 'sedimentaryMicrofacies',
                    pathName: 'DEPOSITION'
                },
                //沉积相图  
                {
                    name: 'reservoirProfile',
                    pathName: 'RESERVOIR_PROFILE'
                },
                //油藏剖面图
                {
                    name: 'sandThicknessMap',
                    pathName: 'THICKNESS_SAND_LAYER'
                },
                //砂层厚度图    
                {
                    name: 'effectiveThicknessMap',
                    pathName: 'EFFECTIVE_THICKNESS'
                },
                //有效厚度图  
                {
                    name: 'permeabilityCurve',
                    pathName: 'PHASE_PERMEABILITY'
                },
                //相渗透率曲线图    
                {
                    name: 'porosityDevelopment',
                    pathName: 'POROSITY_FRACTURE'
                },
                //孔隙度裂缝图   
                {
                    name: 'wellPattern',
                    pathName: 'WELL_PATTERN'
                },
                //井网图 
                {
                    name: 'wellPatternImprovementChart',
                    pathName: 'WELL_PATTERN_IMPROVEMENT'
                },
                //井网完善图   
                {
                    name: 'cumulativeOilWaterProduction',
                    pathName: 'CUMULATIVE_OIL_WATER'
                },
                //累产油产水图  
                {
                    name: 'remainingOil',
                    pathName: 'SURPLUS_OIL'
                },
                //剩余油分布图    
                {
                    name: 'oilwaterIsoline',
                    pathName: 'LIQUID_OIL_WATER_EQUIVALENCE'
                },
                //液油水等值图   
                {
                    name: 'liquidOilDifferenceDiagram',
                    pathName: 'LIQUID_OIL_WATER_DIFFERENCE'
                },
                //液油水差值图 
                {
                    name: 'totalPressureDropDiagram',
                    pathName: 'TOTAL_PRESSURE_DROP'
                },
                //总压降图    
                {
                    name: 'differentialPressureDiagram',
                    pathName: 'DIFFERENTIAL_PRESSURE'
                },
                //压差图  
                {
                    name: 'fluidStrengthEquivalence',
                    pathName: 'FLUID_STRENGTH_EQUIVALENCE'
                },
                //采液强度等值图    
                {
                    name: 'isogramOfWaterInjectionIntensity',
                    pathName: 'INJECTION_INTENSITY_EQUIVALENCE'
                },
                //注水强度等值图    
                // {
                //     name: 'yieldCompositionCurve', 
                //     pathName: 'YIELD_COMPONENTS',
                // },
                //产量构成曲线
                {
                    name: 'reservesReport',
                    pathName: 'RESERVE_REPORT'
                },
                //储量报告   
                {
                    name: 'developmentPlan',
                    pathName: 'DEVELOPMENT_PROGRAM'
                },
                //开发方案 
                {
                    name: 'distributionOfAccumulatedwateroilRatio',
                    pathName: 'CUMULATIVE_WATER_OIL_SCORE'
                },
                //累计水油比分布图    
                {
                    name: 'injectionProductionRatioDistribution',
                    pathName: 'INJECTION_PRODUCTION_SCORE_LAYOUT'
                },
                //注采比分布图  
                {
                    name: 'developmentAdjustmentPlan',
                    pathName: 'DEVELOP_ADJUSTMENT_PLAN'
                },
                //开发调整方案
                {
                    name: 'cumulativeOilProductionPerMeter',
                    pathName: 'meterProIndicator'
                },
                //米采指数
            ],
            //子组件返回数据
            childParam: '',
            //获得选择图的种类
            childParamType: '',
            //缓存权限数据
            myWidget: [],
            userInfo: {},
            //按钮权限组
            canAddInfo: false,
            //添加记录
            canUpdateInfo: false,
            //修改数据
            canSendInfo: false,
            //发布数据
            canDeleteInfo: false,
            //删除数据
            canDownload: true,
            //下载数据
            canUpload: true
            //上传数据
        };
    },
    computed: {
        loader () {
            if (!this.currentModule) {
                return null;
            }
            return () => import(`./modules/${this.activeName}/${this.currentModule}.vue`);
        }
    },
    watch: {
        currentModule: {
            immediate: true,
            handler (newName, oldName) {
                this.loader()
                    .then(() => {
                        console.log('走then');
                        this.component = () => this.loader();
                    })
                    .catch(() => {
                        console.log('走catch');
                    });
            }
        }
    },
    created () {
        this.initData();
    },
    methods: {
        tabTabs (name) {
            this.currentModule = name;
        },
        //初始化页面
        async initData () {
            //油田信息初始化
            await fetchOilFields().then((res) => {
                if (res.data.code == 200) {
                    this.oilField = res.data.data.oilFields;
                    if (!this.oilField.length) {
                        this.selectOilField = '';
                    } else {
                        this.selectOilField = this.oilField[0].oilFieldId;
                    }
                }
            });
            //区块信息初始化
            let requestField = {
                oilFieldId: this.selectOilField
            };
            await fetchFields(requestField).then((res) => {
                if (res.data.code == 200) {
                    this.block = res.data.data.fields;
                    if (this.block.length) {
                        this.selectBlock = this.block[1] ? this.block[1].fieldId : this.block[0].fieldId;
                    }
                }
            });
            this.$nextTick(() => {
                this.doSearch();
            });
        },
        //获得区块类型
        getFetchFields (oilFieldId) {
            let request = {
                oilFieldId
            };
            fetchFields(request).then((res) => {
                if (res.data.code == 200) {
                    this.block = res.data.data.fields;
                    this.selectBlock = this.block[0].fieldId;
                }
            });
        },
        //上传图片文件
        async useUploadPic (file, fileList) {
            if (fileList.length > 1) {
                this.fileList.slice(-1);
            }
            //获得油田参数 展示不用
            let oilFieldid = this.selectOilField;
            //获得区块id
            let block = this.selectBlock;
            //一级目录 油井目录
            let firstPath = 'field';
            //文件类型
            let fileType = file.raw.type;
            if (this.isCorrectFileType(fileType)) {
                return true;
            }
            //获得图片二进制流
            const fileData = await this.selectImageFile(file.raw);
            let fileDataNew = fileData.replace(/^data:\w+\/[a-zA-Z-]+;base64,/, '');
            //let fileDataNew = fileData;
            //获得当前选项中的映射关系
            let tabName = this.tabsPathName.find((item) => item.name == this.currentModule);
            if (tabName === null || tabName === undefined) {
                this.$message.error('该标签无法上传文件或图片,请切换标签');
                return;
            }
            let position = this.childParam;
            //有井层的情况
            let fileName = '';
            //有井层的情况
            // if (tabName.pathName == 'SUBLAYER' || tabName.pathName == 'TOP_SUBLAYER') {
            //    //文件名称拼接
            //    fileName = tabName.pathName + (position.length > 0 ? '_' + position : '') + '_' + block;
            // } else {
            //    //文件名称拼接
            //    fileName = tabName.pathName + '_' + block;
            // }
            if (
                tabName.pathName == 'STRUCTURE' ||
                tabName.pathName == 'COMPREHENSIVE_GEOLOGY' ||
                tabName.pathName == 'DEPOSITION' ||
                tabName.pathName == 'THICKNESS_SAND_LAYER' ||
                tabName.pathName == 'EFFECTIVE_THICKNESS' ||
                tabName.pathName == 'PHASE_PERMEABILITY' ||
                tabName.pathName == 'POROSITY_FRACTURE' ||
                tabName.pathName == 'CUMULATIVE_OIL_WATER' ||
                tabName.pathName == 'SURPLUS_OIL' ||
                tabName.pathName == 'LIQUID_OIL_WATER_EQUIVALENCE' ||
                tabName.pathName == 'LIQUID_OIL_WATER_DIFFERENCE' ||
                tabName.pathName == 'TOTAL_PRESSURE_DROP' ||
                tabName.pathName == 'DIFFERENTIAL_PRESSURE' ||
                tabName.pathName == 'FLUID_STRENGTH_EQUIVALENCE' ||
                tabName.pathName == 'INJECTION_INTENSITY_EQUIVALENCE' ||
                tabName.pathName == 'INJECTION_PRODUCTION_SCORE_LAYOUT' ||
                tabName.pathName == 'PERMEABILITY_DISTRIBUTION'
            ) {
                if (!position || position == '') {
                    this.$message.error('请选择层位');
                    return;
                }
            }
            if (position == null || position == '' || position == undefined) {
                fileName = tabName.pathName + '_' + block;
            } else {
                if (this.currentModule == 'sedimentaryMicrofacies') {
                    fileName = tabName.pathName + '_' + position + '_' + oilFieldid;
                } else {
                    fileName = tabName.pathName + '_' + position + '_' + block;
                }
            }
            if (this.currentModule == 'cumulativeOilWaterProduction') {
                fileName = fileName + '_' + this.childParamType;
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
                wellGroupId: '',
                wellId: '',
                wellTypeCode: ''
            };
            uploadFile(request).then((res) => {
                if (res.data.code == 0) {
                    this.$message.success('图片上传成功');
                    this.doSearch();
                }
            });
        },
        //解析图片文件 图片文件转二进制流
        selectImageFile (file) {
            return new Promise((resolve, reject) => {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (result) => {
                    resolve(reader.result);
                };
            });
        },
        //搜索功能
        doSearch () {
            if (this.childParam) {
                this.$refs.componentCustom.selectPosition = this.childParam;
            }
            //调用子组件的事件
            this.loader().then(() => {
                console.log('走then');
                this.$refs.componentCustom.doSearch();
            }).catch(() => {
                console.log('走catch');
            });
        },
        //子组件传递参数
        changeChildParam (val, val2) {
            this.childParam = val;
            if (val2) {
                this.childParamType = val2;
            }
        },
        //切换区块
        onChangeBlock () {
            this.childParam = '';
            this.$refs.componentCustom.selectPosition = this.childParam;
        },
        //下载
        doDownLoad () {
            //let feildName = ''; 临时未来可能加入
            if (this.selectOilField == this.selectBlock) {
                let feild = this.oilField.find((item) => {
                    return item.oilFieldId == this.selectOilField;
                });
                this.$refs.componentCustom.blockName = feild.name;
            } else {
                let feild = this.block.find((item) => {
                    return item.fieldId == this.selectBlock;
                });
                this.$refs.componentCustom.blockName = feild.name;
            }
            if (this.childParam) {
                this.$refs.componentCustom.selectPosition = this.childParam;
            }
            this.$refs.componentCustom.doDownLoad();
        },
        ///判断上传文件是否是正确的类型
        isCorrectFileType (type) {
            if (
                this.currentModule == 'structuralMap' ||
                this.currentModule == 'geologicalMap' ||
                this.currentModule == 'sedimentaryMicrofacies' ||
                this.currentModule == 'reservoirProfile' ||
                this.currentModule == 'sandThicknessMap' ||
                this.currentModule == 'effectiveThicknessMap' ||
                this.currentModule == 'permeabilityCurve' ||
                this.currentModule == 'porosityDevelopment' ||
                this.currentModule == 'wellPattern' ||
                this.currentModule == 'wellPatternImprovementChart' ||
                this.currentModule == 'cumulativeOilWaterProduction' ||
                this.currentModule == 'remainingOil' ||
                this.currentModule == 'oilwaterIsoline' ||
                this.currentModule == 'liquidOilDifferenceDiagram' ||
                this.currentModule == 'totalPressureDropDiagram' ||
                this.currentModule == 'differentialPressureDiagram' ||
                this.currentModule == 'fluidStrengthEquivalence' ||
                this.currentModule == 'isogramOfWaterInjectionIntensity' ||
                this.currentModule == 'cumulativeOilProductionPerMeter' ||
                this.currentModule == 'distributionOfAccumulatedwateroilRatio' ||
                this.currentModule == 'injectionProductionRatioDistribution' ||
                this.currentModule == 'permeabilityDistribution'
            ) {
                if (type == 'image/bmp' || type == 'image/gif' || type == 'image/x-icon' || type == 'image/pipeg' ||
                    type == 'image/jpeg' || type == 'image/png') {
                    return false;
                } else {
                    this.$message.error('请上传正确图片类型');
                    return true;
                }
            } else if (this.currentModule == 'reservesReport' || this.currentModule == 'developmentPlan' || this
                .currentModule == 'developmentAdjustmentPlan') {
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
        //获取当前页面的权限内容，并处理其逻辑问题
        getPageAuthMessage () {
            // this.userInfo = VSAuth.getAuthInfo();
            this.userInfo = {};
            let myPath = this.$route.path;
            //该值可以为空
            let areaCode = 'znytglxt';
            let loginName = this.userInfo.userName;
            if (loginName == 'admin') {
                this.canAddInfo = true;
                this.canUpdateInfo = true;
                this.canSendInfo = true;
                this.canDeleteInfo = true;
                this.canDownload = true;
                this.canUpload = true;
            }
            getWidgetByAreaUser({
                areaCode: areaCode,
                loginName: loginName
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

::v-deep .el-upload {
    border: 0px;
    border-radius: 0px;
}

::v-deep .el-upload-list {
    display: none;
}
</style>
