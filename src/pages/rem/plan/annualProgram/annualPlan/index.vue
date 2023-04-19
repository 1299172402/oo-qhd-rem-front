<!-- 年度计划管理 -->
<template>
    <div class="app-container">
        <headerSearch class="g-w100 g-h100" style="height:auto;padding-top:18px;padding-bottom:8px;margin-bottom:20px;">
            <div style="display: flex;align-items: center;flex-wrap:wrap;">
                <div style="margin-right:15px;margin-bottom:10px;">
                    <span>油田：</span>
                    <el-select v-model="searchForm.selectOilField" placeholder="请选择" disabled>
                        <el-option v-for="(item,index) in oilField" :key="index" :label="item.name" :value="item.oilFieldId"></el-option>
                    </el-select>
                </div>
                <div style="margin-right:15px;margin-bottom:10px;">
                    <span>时间：</span>
                    <el-date-picker v-model="searchForm.selectDate" :clearable="false" unlink-panels type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" range-separator="至 " start-placeholder="开始日期" end-placeholder="结束日期" style="width:260px;"></el-date-picker>
                </div>
                <div style="margin-right:15px;margin-bottom:10px;">
                    <span>产量计划类型：</span>
                    <el-select v-model="searchForm.planTypeCode" placeholder="请选择" style="width:150px;">
                        <el-option v-for="(item,index) in planTypeSelect" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
                <div style="margin-right:15px;margin-bottom:10px;" v-if="pageType=='原油产量'">
                    <span>产量构成：</span>
                    <el-select v-model="searchForm.theYieldComponentsValue" placeholder="请选择" style="width:150px;">
                        <el-option v-for="(item,index) in theYieldComponentsSelect" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
                <div style="margin-right:15px;margin-bottom:10px;">
                    <span>滚动预测版本：</span>
                    <el-select v-model="searchForm.rollForecastVersion" placeholder="请选择" style="width:150px;">
                        <el-option v-for="(item,index) in rollingForecastSelect" :key="index" :label="item.rollForecastName" :value="item.rollForecastVersion"></el-option>
                    </el-select>
                </div>
                <div style="margin-right:15px;margin-bottom:10px;">
                    <el-button icon="el-icon-search" type="primary" style="margin-left:10px;" @click="doSearch">搜索</el-button>
                </div>
                <div style="margin-left:auto;margin-bottom:10px;" v-if="pageType == '原油产量'">
                    <span>单位选择：</span>
                    <el-select v-model="searchForm.selectUnitOfProduction" placeholder="请选择" style="width: 100px;" @change="doSearch">
                        <el-option v-for="(item,index) in unitOfProduction" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
            </div>
        </headerSearch>
        <div class="z-container">
            <pagePanelNew class="pagePanelNew" id="pagePanelNew">
                <el-tabs class="g-pageHeader" v-model="pageType" topline v-if="isLoadChildCommon">
                    <el-tab-pane label="原油产量" name="原油产量">
                        <crudeOil v-if="pageType=='原油产量'&&searchForm.theYieldComponentsValue==1" :searchForm="searchForm" ref="childComponent"></crudeOil>
                        <basicYield v-if="pageType=='原油产量'&&searchForm.theYieldComponentsValue==2" :searchForm="searchForm" ref="childComponent"></basicYield>
                        <measureProduction v-if="pageType=='原油产量'&&searchForm.theYieldComponentsValue==3" :searchForm="searchForm" ref="childComponent"></measureProduction>
                        <adjustingWellProduction v-if="pageType=='原油产量'&&searchForm.theYieldComponentsValue==4" :searchForm="searchForm" ref="childComponent"></adjustingWellProduction>
                        <devWellProduction v-if="pageType=='原油产量'&&searchForm.theYieldComponentsValue==5" :searchForm="searchForm" ref="childComponent"></devWellProduction>
                    </el-tab-pane>
                    <el-tab-pane label="天然气产量" name="天然气产量">
                        <naturalGas v-if="pageType=='天然气产量'" :searchForm="searchForm" ref="childComponent"></naturalGas>
                    </el-tab-pane>
                    <el-tab-pane label="油田注水量" name="油田注水量">
                        <waterInjectionVolume v-if="pageType=='油田注水量'" :searchForm="searchForm" ref="childComponent"></waterInjectionVolume>
                    </el-tab-pane>
                </el-tabs>
            </pagePanelNew>
        </div>
    </div>
</template>

<script>
    import { fetchOilFields } from '@/api/oilDeposit/rem-02/primaryinfo.js';
    import { getRollForecastVersion } from '@/api/oilDeposit/rem-04/plan.js';
    import crudeOil from './crudeOil/index.vue'
    import naturalGas from './naturalGas/index.vue'
    import waterInjectionVolume from './waterInjectionVolume/index.vue'
    
    import basicYield from './crudeOil/basicYield.vue'
    import measureProduction from './crudeOil/measureProduction.vue'
    import adjustingWellProduction from './crudeOil/adjustingWellProduction.vue'
    import devWellProduction from './crudeOil/devWellProduction.vue'
    export default {
        components: {
            crudeOil,
            naturalGas,
            waterInjectionVolume,
            basicYield,
            measureProduction,
            adjustingWellProduction,
            devWellProduction
        },
        data() {
            return {
                //油田数据
                oilField: [],
                //产量计划类型数据
                planTypeSelect:[
                    {label:'分公司考核',value:'002003'},
                    {label:'分公司奋斗',value:'001003'},
                    {label:'有限考核',value:'002002'},
                    {label:'有限奋斗',value:'001002'},
                ],
                //产量构成数据
                theYieldComponentsSelect:[
                    {label:'石油液体',value:1},
                    {label:'基础产量',value:2},
                    {label:'措施产量',value:3},
                    {label:'调整井产量',value:4},
                    {label:'开发井产量',value:5},
                ],
                //滚动预测版本数据
                rollingForecastSelect:[],
                //产量单位数据
                unitOfProduction: [{label: 'm³/d',value: 'm',},{label: 't/d',value: 't'}],
                //tabs-绑定值
                pageType: '原油产量',
                //搜索对象
                searchForm:{
                    oilFieldName: '',//油田名称
                    selectOilField: '',//油田绑定值
                    selectDate:['2023-01-01','2023-12-31'],//日期
                    planTypeCode:'002003',//产量计划类型绑定值
                    theYieldComponentsValue:1,//产量构成绑定值
                    rollForecastVersion:'',//滚动预测绑定值
                    selectUnitOfProduction: 'm',//产量单位绑定值
                },
                //是否加载子组件
                isLoadChildCommon:false,
            };
        },
        mounted() {
            this.initData();
        },
        methods: {
            //初始化信息
            async initData() {
                //获取油田
                await fetchOilFields().then((res) => {
                    if(res.data.code==200){
                        if (res.data.data&&res.data.data.oilFields) {
                            this.oilField = res.data.data.oilFields;
                            this.searchForm.oilFieldName = this.oilField[0].name;
                            this.searchForm.selectOilField = this.oilField[0].oilFieldId;
                        }
                    }
                });
                //获取滚动预测版本
                await getRollForecastVersion({beginDate:this.searchForm.selectDate[0],endDate:this.searchForm.selectDate[1]}).then((res) => {
                    if(res.data.code==200){
                        if(res.data.data&&res.data.data.length){
                            this.rollingForecastSelect=res.data.data;
                            this.searchForm.rollForecastVersion=this.rollingForecastSelect[0].rollForecastVersion;
                        }
                    }
                })
                this.isLoadChildCommon=true;
            },
            //查询事件
            doSearch() {
                this.$refs.childComponent.initData();
            },
        },
    };
</script>

<style lang="scss" scoped>
    .app-container{
        height: 100%;
        display: flex;
        flex-direction: column;
        .z-container{
            flex:1;
            height:0;
            .pagePanelNew{
                height:100%;
                margin-top:0;
            }
        }
    }
    ::v-deep .el-tabs{
        width:100%;
        height:100%;
        .el-tabs__content{
            width:100%;
            height: calc(100% - 47px);
            .el-tab-pane{
                width:100%;
                height:100%;
            }
        }
    }
</style>
