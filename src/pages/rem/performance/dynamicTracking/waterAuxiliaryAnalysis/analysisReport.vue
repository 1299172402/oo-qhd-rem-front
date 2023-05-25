<!-- 水井动态分析报告 -->
<template>
    <div class="z_app_container">
        <!-- 旧版本 -->
        <div class="app-container" v-if="!isNewformat">
            <headerSearch style="height:80px;">
                <div class="g-row-flex-V g-w100 g-h100">
                    <span>油田：</span>
                    <el-select v-model="selYtdm" class="f2" style="width:180px" filterable clearable disabled @change="changeOilFeild">
                        <el-option v-for="item in ytData" :key="item.oilFieldId" :label="item.name" :value="item.oilFieldId" :disabled="item.disabled"></el-option>
                    </el-select>
                    <span style="margin-left:15px;">平台：</span>
                    <el-select v-model="platform" class="f2" style="width:220px" filterable clearable @change="changePlatForm">
                        <el-option v-for="item in ptData" :key="item.platFormId" :label="item.platName" :value="item.platFormId" :disabled="item.disabled"></el-option>
                    </el-select>
                    <span style="margin-left:15px;">井号：</span>
                    <el-select v-model="wellId" class="f2" style="width:180px" filterable clearable>
                        <el-option v-for="item in wellData" :key="item.wellId" :label="item.wellName" :value="item.wellId" :disabled="item.disabled"></el-option>
                    </el-select>
                    <span style="margin-left:15px;">评价时间：</span>
                    <el-date-picker v-model="currentDate" type="date" placeholder="年/月/日" value-format="yyyy-MM-dd"></el-date-picker>
                    <el-button icon="el-icon-search" type="primary" style="margin-left: 20px" @click="doSearch">搜索</el-button>
                    <el-button class="commonBtn" icon="el-icon-refresh" @click="resetting">重置</el-button>
                </div>
            </headerSearch>
            <pagePanelNew style="height: calc(100% - 100px);" class="g-w100">
                <div class="btns" style="height:50px;display: flex;padding-left:7px;">
                    <el-button type="primary" @click="$router.push({path:'/modelConfiguration/modelconfig'})">模型配置</el-button>
                    <el-button type="primary" @click="isNewformat=!isNewformat;">切换版式</el-button>
                </div>
                <div style="height:calc(100% - 50px);overflow-y: scroll;overflow-x: hidden;padding-left:8px;padding-right:7px;display: flex;flex-direction: column;">
                    <div style="height:auto;">
                        <el-row style="min-height:300px;" :gutter="15" class="test">
                            <el-col :span="5" style="height: 100%">
                                <pagePanel headerTitle="注入问题" style="margin-top:0;height:100%;">
                                    <el-row :gutter="10">
                                        <el-col :span="12">
                                            <el-button class="commonBtn" style="width:100%;cursor: inherit;">注入动态</el-button>
                                            <el-radio-group v-model="selCode" style="width: 100%;" @change="((val)=>{selRadioIterm(val,'trendOfIndicators')})">
                                                <el-radio-button :class="item.value>0?'checkButton about1':'checkButton'" :label="item.code" v-for="(item,index) in trendOfIndicators" :key="index" :span="24">
                                                    {{item.name+(item.value>0?'('+item.value+')':'(0)')}}
                                                </el-radio-button>
                                            </el-radio-group>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-button class="commonBtn" style="width:100%;cursor: inherit;">井层注水工况</el-button>
                                            <el-radio-group v-model="selCode" style="width: 100%;" @change="((val)=>{selRadioIterm(val,'workingCondition')})">
                                                <el-radio-button :class="item.value>0?'checkButton about1':'checkButton'" :label="item.code" v-for="(item,index) in workingCondition" :key="index" :span="24">
                                                    {{item.name+(item.value>0?'('+item.value+')':'(0)')}}
                                                </el-radio-button>
                                            </el-radio-group>
                                        </el-col>
                                    </el-row>
                                </pagePanel>
                            </el-col>
                            <el-col :span="10" style="height: 100%">
                                <pagePanel headerTitle="超欠注原因分析" style="margin-top:0;height:100%;">
                                    <el-row :gutter="10">
                                        <el-col :span="6">
                                            <el-button class="commonBtn" style="width:100%;cursor: inherit;">地面原因</el-button>
                                            <el-radio-group v-model="selCode" style="width: 100%;" @change="((val)=>{selRadioIterm(val,'theGroundBecause')})">
                                                <el-radio-button :class="item.value>0?'checkButton about1':'checkButton'" :label="item.code" v-for="(item,index) in theGroundBecause" :key="index" :span="24">
                                                    {{item.name+(item.value>0?'('+item.value+')':'(0)')}}
                                                </el-radio-button>
                                            </el-radio-group>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-button class="commonBtn" style="width:100%;cursor: inherit;">井筒原因</el-button>
                                            <el-radio-group v-model="selCode" style="width: 100%;" @change="((val)=>{selRadioIterm(val,'wellboreReason')})">
                                                <el-radio-button :class="item.value>0?'checkButton about1':'checkButton'" :label="item.code" v-for="(item,index) in wellboreReason" :key="index" :span="24">
                                                    {{item.name+(item.value>0?'('+item.value+')':'(0)')}}
                                                </el-radio-button>
                                            </el-radio-group>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-button class="commonBtn" style="width:100%;cursor: inherit;">地层原因</el-button>
                                            <el-radio-group v-model="selCode" style="width: 100%;" @change="((val)=>{selRadioIterm(val,'formationReason')})">
                                                <el-radio-button :class="item.value>0?'checkButton about1':'checkButton'" :label="item.code" v-for="(item,index) in formationReason" :key="index" :span="24">
                                                    {{item.name+(item.value>0?'('+item.value+')':'(0)')}}
                                                </el-radio-button>
                                            </el-radio-group>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-button class="commonBtn" style="width:100%;cursor: inherit;">停注恢复</el-button>
                                            <el-radio-group v-model="selCode" style="width: 100%;" @change="((val)=>{selRadioIterm(val,'stopInjectionRecovery')})">
                                                <el-radio-button :class="item.value>0?'checkButton about1':'checkButton'" :label="item.code" v-for="(item,index) in stopInjectionRecovery" :key="index" :span="24">
                                                    {{item.name+(item.value>0?'('+item.value+')':'(0)')}}
                                                </el-radio-button>
                                            </el-radio-group>
                                        </el-col>
                                    </el-row>
                                </pagePanel>
                            </el-col>
                            <el-col :span="4" style="height: 100%">
                                <pagePanel headerTitle="注水动态" style="margin-top:0;height:100%;">
                                    <el-row :gutter="10" style="height: 100%">
                                        <el-radio-group v-model="selCode" style="width: 100%;" @change="((val)=>{selRadioIterm(val,'recommendedMeasuresOptions')})">
                                            <!-- <el-col v-for="(item,index) in recommendedMeasuresOptions" :key="index" :span="12">
                                                <el-radio-button :class="item.value>0?'checkButton about1':'checkButton'" :label="item.code">
                                                    {{item.name+(item.value>0?'('+item.value+')':'(0)')}}
                                                </el-radio-button>
                                            </el-col> -->
                                            <!-- 等模型 -->
                                            <el-col :span="24">
                                                <el-radio-button class="checkButton">
                                                    注水强度偏高（0）
                                                </el-radio-button>
                                            </el-col>
                                            <el-col :span="24">
                                                <el-radio-button class="checkButton">
                                                    注水强度偏低（0）
                                                </el-radio-button>
                                            </el-col>
                                            <el-col :span="24">
                                                <el-radio-button class="checkButton">
                                                    正常（0）
                                                </el-radio-button>
                                            </el-col>
                                        </el-radio-group>
                                    </el-row>
                                </pagePanel>
                            </el-col>
                            <el-col :span="5" style="height: 100%">
                                <pagePanel headerTitle="措施推荐" style="margin-top:0;height:100%;">
                                    <el-row :gutter="10" style="height: 100%">
                                        <el-radio-group v-model="selCode" style="width: 100%;" @change="((val)=>{selRadioIterm(val,'recommendedMeasuresOptions')})">
                                            <el-col v-for="(item,index) in recommendedMeasuresOptions" :key="index" :span="12">
                                                <el-radio-button :class="item.value>0?'checkButton about1':'checkButton'" :label="item.code">
                                                    {{item.name+(item.value>0?'('+item.value+')':'(0)')}}
                                                </el-radio-button>
                                            </el-col>
                                        </el-radio-group>
                                    </el-row>
                                </pagePanel>
                            </el-col>
                        </el-row>
                        <div style="margin-bottom:10px;">
                            <el-row>
                                <el-col :span="24">
                                    <table class="condationRow" style="float: right">
                                        <tr>
                                            <td style="padding-right:10px">图例：</td>
                                            <td class="checkBtn">选中</td>
                                            <td class="about">相关</td>
                                            <td class="noCheckBtn">未选中</td>
                                        </tr>
                                    </table>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div style="flex:1;min-height:380px;">
                        <pagePanel headerTitle="水井动态分析详情列表" style="margin-top:0;height:100%;">
                            <el-table highlight :data="tableData" height="100%" @sort-change="changeTableSort" ref="tableList">
                                <el-table-column prop="wellId" label="井号" align="center" :sortable="true" :sort-method="borepipeNoSort" fixed="left"></el-table-column>
                                <el-table-column prop="productionProblems" label="生产问题" align="center">
                                    <el-table-column v-for="(item, index) in trendOfIndicatorsTab" :key="index" :prop="item.code" :label="item.name" :render-header="renderHeader" align="center" sortable="custom">
                                        <template slot-scope="{row}">
                                            <span v-if="!row[item.code+'Message']">{{row[item.code]}}</span>
                                            <el-tooltip v-else class="item" effect="dark" :content="row[item.code+'Message']" placement="top">
                                                <span>{{row[item.code]}}</span>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                    <el-table-column v-for="(item, index) in productionProblemsTab" :key="index" :prop="item.code" :label="item.name" align="center">
                                        <template slot-scope="{row}">
                                            <span v-if="row[item.code+'Message']==''">{{row[item.code]}}</span>
                                            <el-tooltip v-else class="item" effect="dark" :content="row[item.code+'Message']" placement="top">
                                                <span>{{row[item.code]}}</span>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column prop="overUnderInjectionAnalysis" label="超欠注原因分析" align="center">
                                    <el-table-column v-for="(item, index) in overUnderInjectionAnalysisTab" :key="index" :prop="item.code" :label="item.name" align="center">
                                        <template slot-scope="{row}">
                                            <span v-if="row[item.code+'Message']==''">{{row[item.code]}}</span>
                                            <el-tooltip v-else class="item" effect="dark" :content="row[item.code+'Message']" placement="top">
                                                <span>{{row[item.code]}}</span>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column prop="recommendedMeasures" label="措施初选" align="center">
                                    <el-table-column prop="measuresName" label="推荐措施" align="center"></el-table-column>
                                    <el-table-column prop="theDate" label="推荐日期" align="center" width="120px"></el-table-column>
                                    <el-table-column label="操作" align="center">
                                        <template slot-scope="scope">
                                            <el-button type="text" @click="openAnalysis(scope.row.wellId)">分析</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                        </pagePanel>
                    </div>
                </div>
            </pagePanelNew>
        </div>
        <!-- 新版本 -->
        <div class="app-container2" v-if="isNewformat">
            <headerSearch style="height:80px;">
                <div class="g-row-flex-V g-w100 g-h100">
                    <span>油田：</span>
                    <el-select v-model="selYtdm" class="f2" style="width:180px" filterable clearable disabled @change="changeOilFeild">
                        <el-option v-for="item in ytData" :key="item.oilFieldId" :label="item.name" :value="item.oilFieldId" :disabled="item.disabled"></el-option>
                    </el-select>
                    <span style="margin-left:15px;">平台：</span>
                    <el-select v-model="platform" class="f2" style="width:220px" filterable clearable @change="changePlatForm">
                        <el-option v-for="item in ptData" :key="item.platFormId" :label="item.platName" :value="item.platFormId" :disabled="item.disabled"></el-option>
                    </el-select>
                    <span style="margin-left:15px;">井号：</span>
                    <el-select v-model="wellId" class="f2" style="width:180px" filterable clearable>
                        <el-option v-for="item in wellData" :key="item.wellId" :label="item.wellName" :value="item.wellId" :disabled="item.disabled"></el-option>
                    </el-select>
                    <span style="margin-left:15px;">评价时间：</span>
                    <el-date-picker v-model="currentDate" type="date" placeholder="年/月/日" value-format="yyyy-MM-dd"></el-date-picker>
                    <el-button icon="el-icon-search" type="primary" style="margin-left: 20px" @click="doSearch">搜索</el-button>
                    <el-button class="commonBtn" icon="el-icon-refresh" @click="resetting">重置</el-button>
                </div>
            </headerSearch> 
            <div class="app-container3">
                <div class="leftBox">
                    <img src="@/assets/rem/performance/bg.gif" alt="" class="img1">
                    <img src="@/assets/rem/performance/jing-small.png" alt="" class="img2">
                    <img src="@/assets/rem/performance/shui-donghua.gif" alt="" class="img3">
                    <img src="@/assets/rem/performance/di.png" alt="" class="img4">
                    <img src="@/assets/rem/performance/01zhu.gif" alt="" class="img5">
                    <img src="@/assets/rem/performance/bg.png" alt="" class="bg">
                </div>
                <div class="rightBox">
                    <div class="v1">
                        <img src="@/assets/rem/performance/bgline1.png" alt="" class="bgline1">
                        <div class="btns" style="height:40px;display: flex;">
                            <el-button type="primary" style="margin-left:auto;" @click="$router.push({path:'/modelConfiguration/modelconfig'})">模型配置</el-button>
                            <el-button type="primary" @click="isNewformat=!isNewformat;">切换版式</el-button>
                        </div>
                        <div class="btns0">
                            <img src="@/assets/rem/performance/help.png" alt="" class="helpImg">
                            <span>{{potentialWellNum}}</span>
                            <b>潜力井</b>
                        </div>
                    </div>
                    <div class="v2">
                        <info-window info-width="100%"  info-height="100%"  header-title="生产动态监测" :is-show-max-btn="false">
                            <div class="z-content" style="height:calc(100% - 55px);">
                                <div class="z-content-n">
                                    <div class="z-row-left">
                                        <div class="z_title">
                                            <img src="@/assets/rem/performance/z_sb.png" alt="">
                                            <span>注入动态</span>
                                        </div>
                                        <div class="z_schedule">
                                            <span class="sp1">正常：</span>
                                            <div class="z_proess">
                                                <span class="z_proess_sp1" :style="{width:trendOfIndicatorsNum.zczb+'%'}"><b>{{trendOfIndicatorsNum.zcnum}}</b></span>
                                                <span class="z_proess_sp2"></span>
                                            </div>
                                            <span class="sp2">异常：<b>{{trendOfIndicatorsNum.ycnum}}</b></span>
                                        </div>
                                    </div>  
                                    <div class="z-row-center">
                                        <div class="numBtn" v-for="(item,index) in trendOfIndicators" :key="index" v-if="item.name!='正常'">
                                            <span class="sp1">{{item.value}}</span>
                                            <span class="sp2">{{item.name}}</span>
                                        </div>
                                    </div>
                                    <div class="z-row-right">
                                        <div class="name">措施推荐</div>
                                        <div class="num">
                                            <span v-for="(item,index) in recommendedMeasuresOptions" :key="index" v-if="item.name=='地面提压'||item.name=='测调'">
                                                {{item.name+(item.value>0?'('+item.value+')':'(0)')}}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </info-window>
                    </div>
                    <div class="v2">
                        <img src="@/assets/rem/performance/bgline0.png" alt="" class="bgline0">
                        <info-window info-width="100%"  info-height="100%"  header-title="水井工况诊断" :is-show-max-btn="false">
                            <div class="z-content" style="height:calc(100% - 55px);">
                                <div class="z-content-n">
                                    <div class="z-row-left">
                                        <div class="z_title">
                                            <img src="@/assets/rem/performance/z_sb.png" alt="">
                                            <span>井筒原因</span>
                                        </div>
                                        <div class="z_schedule">
                                            <span class="sp1">正常：</span>
                                            <div class="z_proess">
                                                <span class="z_proess_sp1" :style="{width:wellboreReasonNum.zczb+'%'}"><b>{{wellboreReasonNum.zcnum}}</b></span>
                                                <span class="z_proess_sp2"></span>
                                            </div>
                                            <span class="sp2">异常：<b>{{wellboreReasonNum.ycnum}}</b></span>
                                        </div>
                                    </div>  
                                    <div class="z-row-center">
                                        <div class="numBtn" v-for="(item,index) in wellboreReason" :key="index" v-if="item.name!='正常'">
                                            <span class="sp1">{{item.value}}</span>
                                            <span class="sp2">{{item.name}}</span>
                                        </div>
                                    </div>
                                    <div class="z-row-right">
                                        <div class="name">措施推荐</div>
                                        <div class="num">
                                            <span v-for="(item,index) in recommendedMeasuresOptions" :key="index" v-if="item.name=='检查管柱'">
                                                {{item.name+(item.value>0?'('+item.value+')':'(0)')}}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </info-window>
                    </div>
                    <div class="v2 v3">
                        <img src="@/assets/rem/performance/bgline2.png" alt="" class="bgline2">
                        <info-window info-width="100%"  info-height="100%"  header-title="潜力分析" :is-show-max-btn="false">
                            <div class="z-content" style="height:calc(100% - 55px);">
                                <div class="z-content-n">
                                    <div class="z-row-left">
                                        <div class="z_title">
                                            <img src="@/assets/rem/performance/z_sb.png" alt="">
                                            <span>井层注水工况</span>
                                        </div>
                                        <div class="z_schedule">
                                            <span class="sp1">正常：</span>
                                            <div class="z_proess">
                                                <span class="z_proess_sp1" :style="{width:workingCondNum.zczb+'%'}"><b>{{workingCondNum.zcnum}}</b></span>
                                                <span class="z_proess_sp2"></span>
                                            </div>
                                            <span class="sp2">异常：<b>{{workingCondNum.ycnum}}</b></span>
                                        </div>
                                    </div>  
                                    <div class="z-row-center">
                                        <div class="numBtn" v-for="(item,index) in workingCondition" :key="index" v-if="item.name!='正常'">
                                            <span class="sp1">{{item.value}}</span>
                                            <span class="sp2">{{item.name}}</span>
                                        </div>
                                    </div>
                                    <div class="z-row-right" style="position: relative;top: 48px;">
                                        <div class="name">措施推荐</div>
                                        <div class="num">
                                            <span v-for="(item,index) in recommendedMeasuresOptions" :key="index" v-if="item.name=='储层改造'||item.name=='酸化解堵'||item.name=='恢复注水'">
                                                {{item.name+(item.value>0?'('+item.value+')':'(0)')}}
                                            </span>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="z-content-n">
                                    <div class="z-row-left">
                                        <div class="z_title">
                                            <img src="@/assets/rem/performance/z_sb.png" alt="">
                                            <span>注水强度</span>
                                        </div>
                                        <div class="z_schedule">
                                            <span class="sp1">正常：</span>
                                            <div class="z_proess">
                                                <span class="z_proess_sp1" style="width:0%"><b>0</b></span>
                                                <span class="z_proess_sp2"></span>
                                            </div>
                                            <span class="sp2">异常：<b>0</b></span>
                                        </div>
                                    </div>  
                                    <div class="z-row-center">
                                        <div class="numBtn">
                                            <span class="sp1">0</span>
                                            <span class="sp2">注水强度偏高</span>
                                        </div>
                                        <div class="numBtn">
                                            <span class="sp1">0</span>
                                            <span class="sp2">注水强度偏低</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </info-window>
                    </div>
                    <div style="height:360px;">
                        <info-window info-width="100%"  info-height="100%"  header-title="水井动态分析详情列表" :is-show-max-btn="false">
                            <el-table highlight :data="tableData" height="100%" @sort-change="changeTableSort" ref="tableList">
                                <el-table-column prop="wellId" label="井号" align="center" :sortable="true" :sort-method="borepipeNoSort" fixed="left"></el-table-column>
                                <el-table-column prop="productionProblems" label="生产问题" align="center">
                                    <el-table-column v-for="(item, index) in trendOfIndicatorsTab" :key="index" :prop="item.code" :label="item.name" :render-header="renderHeader" align="center" sortable="custom">
                                        <template slot-scope="{row}">
                                            <span v-if="!row[item.code+'Message']">{{row[item.code]}}</span>
                                            <el-tooltip v-else class="item" effect="dark" :content="row[item.code+'Message']" placement="top">
                                                <span>{{row[item.code]}}</span>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                    <el-table-column v-for="(item, index) in productionProblemsTab" :key="index" :prop="item.code" :label="item.name" align="center">
                                        <template slot-scope="{row}">
                                            <span v-if="row[item.code+'Message']==''">{{row[item.code]}}</span>
                                            <el-tooltip v-else class="item" effect="dark" :content="row[item.code+'Message']" placement="top">
                                                <span>{{row[item.code]}}</span>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column prop="overUnderInjectionAnalysis" label="超欠注原因分析" align="center">
                                    <el-table-column v-for="(item, index) in overUnderInjectionAnalysisTab" :key="index" :prop="item.code" :label="item.name" align="center">
                                        <template slot-scope="{row}">
                                            <span v-if="row[item.code+'Message']==''">{{row[item.code]}}</span>
                                            <el-tooltip v-else class="item" effect="dark" :content="row[item.code+'Message']" placement="top">
                                                <span>{{row[item.code]}}</span>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column prop="recommendedMeasures" label="措施初选" align="center">
                                    <el-table-column prop="measuresName" label="推荐措施" align="center"></el-table-column>
                                    <el-table-column prop="theDate" label="推荐日期" align="center" width="120px"></el-table-column>
                                    <el-table-column label="操作" align="center">
                                        <template slot-scope="scope">
                                            <el-button type="text" @click="openAnalysis(scope.row.wellId)">分析</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                        </info-window>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        layerVariationTrend,
        layerInjectionStatus,
        groundReason,
        wellBoreReason,
        layerReason,
        injectionClosed,
        injectionMeasureRecommend,
        injectionWellDynamicAnalysisDetail
    } from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
    import {
        fetchOilFields,
        fetchPlatforms,
        fetchInjectionWells,
        fetchInjectionWellsByPlatform
    } from "@/api/oilDeposit/rem-02/primaryinfo.js";
    export default {
        data() {
            return {
                isNewformat:true,//默认新版本
                potentialWellNum:0,//潜力井
                //数据来源,大于０为后台提取
                dataSource: 1,
                initTypes: 1, //进行初始加载
                paramMap: {}, //检索条件
                //默认水井(标签)
                radio1: 'water',
                //油田筛选条件
                ytData: [],
                selYtdm: "", //选中项
                //平台筛选条件
                ptData: [],
                platform: "", //选中项
                //水井条件
                wellData: [],
                wellId: "", //选中项
                //评价日期条件
                currentDate: "",
                //有推荐措施的井
                recommendedMeasuresWells: {},
                //生产问题表头
                productionProblemsTab: [{
                    code: "workingCondition",
                    name: "注水工况"
                }],
                //超欠注原因分析表头
                overUnderInjectionAnalysisTab: [{
                        code: "theGroundBecause",
                        name: "地面原因"
                    },
                    {
                        code: "wellboreReason",
                        name: "井筒原因"
                    }, {
                        code: "formationReason",
                        name: "地层原因"
                    },
                    {
                        code: "stopInjectionRecovery",
                        name: "停注恢复"
                    }
                ],
                //选中分析项目
                selCode: "",
                selTag: "",
                //井层指标变化趋势
                trendOfIndicators: [],
                trendOfIndicatorsNum:{
                    allnum:0,
                    zcnum:0,
                    ycnum:0,
                    zczb:0,
                    yczb:0,
                },
                //井层注水工况
                workingCondition: [],
                workingCondNum:{
                    allnum:0,
                    zcnum:0,
                    ycnum:0,
                    zczb:0,
                    yczb:0,
                },
                //地面原因
                theGroundBecause: [],
                //井筒原因
                wellboreReason: [],
                wellboreReasonNum:{
                    allnum:0,
                    zcnum:0,
                    ycnum:0,
                    zczb:0,
                    yczb:0,
                },
                //地层原因
                formationReason: [],
                //停注恢复
                stopInjectionRecovery: [],
                //措施推荐可用项目
                recommendedMeasuresOptions: [],
                //获取措施效果数据
                recommendedMeasuresData: [],
                //动态分析详细列表
                tableData: [],
                //井层指标变化趋势指标动态表头
                trendOfIndicatorsTab: [],
            }
        },
        mounted() {
            this.checkCurrentDate(); //初始化评价日期
            this.queryOilFeildList(); //初始化油田
        },
        methods: {
            //重置
            resetting(){
                this.$nextTick(()=>{
                	Object.assign(this.$data, this.$options.data());
                	this.checkCurrentDate(); //初始化评价日期
                	this.queryOilFeildList(); //初始化油田
                })
            },
            //更改油田编码
            changeOilFeild(val) {
                this.queryPlatFormList();
            },
            //更改平台编码
            changePlatForm(val) {
                this.queryWellListByPid();
                if (this.initTypes > 0) { //自动查询数据
                    this.doSearch();
                    this.initTypes--;
                }
            },
            //进行数据查询处理
            doSearch() {
                //加上重新搜索清空选择 和 表格数据
                this.selCode = '';
                this.tableData = [];
                //重新初始化相关数据项目
                // this.paramMap.evalTopic = "生产动态";
                this.paramMap.evaluationDate = this.currentDate;
                this.paramMap.oilFieldId = this.selYtdm;
                this.paramMap.platformId = this.platform;
                this.paramMap.timeGranularityCode = "";
                this.paramMap.wellId = this.wellId;

                //执行提取
                this.queryTrendOfIndicators(); //井层指标变化趋势
                this.queryWorkingCondition(); //井层注水工况
                this.queryTheGroundBecause(); //地面原因
                this.queryWellboreReason(); //井筒原因
                this.queryFormationReason(); //地层原因
                this.queryStopInjectionRecovery(); //停注恢复
                this.queryRecommendedMeasures(); //措施推荐
                this.queryProWellDynamicAnalysisDetail(); //措施井数据

                //触发初始选中 （测试没有使用，需要异步使用，还需要）
                this.selRadioIterm(this.selCode, this.selTag);
            },
            //井层指标变化趋势
            queryTrendOfIndicators() {
                if (this.dataSource < 1) { //静态数据
                    this.trendOfIndicators = [{
                            code: "tag0",
                            name: "正常",
                            value: 200,
                            wells: "JH1,JH2,JH3,JH4,JH5"
                        },
                        {
                            code: "tag1",
                            name: "水量上升",
                            value: 15,
                            wells: "JH6,JH7"
                        },
                        {
                            code: "tag2",
                            name: "水量下降",
                            value: 10,
                            wells: "JH8,JH9"
                        },
                        {
                            code: "tag3",
                            name: "注入压力上升",
                            value: 5,
                            wells: ""
                        },
                        {
                            code: "tag4",
                            name: "注入压力下降",
                            value: 5,
                            wells: "JH2,JH6"
                        }
                    ];
                } else { //使用接口
                    layerVariationTrend(this.paramMap).then((res) => {
                        // debugger
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.indicatorAnalysisDetailInfos;
                            this.trendOfIndicatorsNum.allnum=0;
                            this.trendOfIndicatorsNum.zcnum=0;
                            this.trendOfIndicatorsNum.ycnum=0;
                            myData.forEach((el,i)=>{
                                this.trendOfIndicatorsNum.allnum+=Number(el.value);
                                if(el.name=='正常'){
                                    this.trendOfIndicatorsNum.zcnum=Number(el.value);
                                }else{
                                    this.trendOfIndicatorsNum.ycnum+=Number(el.value);
                                }
                            })
                            this.trendOfIndicatorsNum.zczb=this.trendOfIndicatorsNum.zcnum/this.trendOfIndicatorsNum.allnum * 100;
                            this.trendOfIndicatorsNum.yczb=this.trendOfIndicatorsNum.yczb/this.trendOfIndicatorsNum.allnum * 100;
                            this.trendOfIndicators = myData;
                        }
                    });
                }
            },
            //井层注水工况
            queryWorkingCondition() {
                if (this.dataSource < 1) { //静态数据
                    this.workingCondition = [{
                            code: "tag00",
                            name: "合格",
                            value: 200,
                            wells: "JH1,JH2,JH3,JH4,JH5"
                        },
                        {
                            code: "tag01",
                            name: "超注",
                            value: 15,
                            wells: "JH6,JH7"
                        },
                        {
                            code: "tag02",
                            name: "欠注",
                            value: 10,
                            wells: "JH8,JH9"
                        },
                        {
                            code: "tag03",
                            name: "待落实区域",
                            value: 5,
                            wells: ""
                        }
                    ];
                } else { //使用接口
                    layerInjectionStatus(this.paramMap).then((res) => {
                        // debugger
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.indicatorAnalysisDetailInfos;
                            this.workingCondNum.allnum=0;
                            this.workingCondNum.zcnum=0;
                            this.workingCondNum.ycnum=0;
                            myData.forEach((el,i)=>{
                                this.workingCondNum.allnum+=Number(el.value);
                                if(el.name=='正常'){
                                    this.workingCondNum.zcnum=Number(el.value);
                                }else{
                                    this.workingCondNum.ycnum+=Number(el.value);
                                }
                            })
                            this.workingCondNum.zczb=this.workingCondNum.zcnum/this.workingCondNum.allnum * 100;
                            // this.workingCondNum.zczb=100;
                            this.workingCondNum.yczb=this.workingCondNum.yczb/this.workingCondNum.allnum * 100;
                            this.workingCondition = myData;
                        }
                    });
                }
            },
            //地面原因
            queryTheGroundBecause() {
                if (this.dataSource < 1) { //静态数据
                    this.theGroundBecause = [{
                            code: "tag10",
                            name: "泵压低",
                            value: 5,
                            wells: "JH1,JH2,JH3,JH4,JH5"
                        },
                        {
                            code: "tag11",
                            name: "正常",
                            value: 70,
                            wells: "JH6,JH7"
                        }
                    ];
                } else { //使用接口
                    groundReason(this.paramMap).then((res) => {
                        // debugger
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.indicatorAnalysisDetailInfos;
                            console.log("myData3", myData);
                            this.theGroundBecause = myData;
                        }
                    });
                }
            },
            //井筒原因
            queryWellboreReason() {
                if (this.dataSource < 1) { //静态数据
                    this.wellboreReason = [{
                            code: "tag20",
                            name: "管漏",
                            value: 1,
                            wells: "JH4"
                        },
                        {
                            code: "tag21",
                            name: "封隔器失效",
                            value: 1,
                            wells: "JH6"
                        },
                        {
                            code: "tag22",
                            name: "水嘴堵",
                            value: 0,
                            wells: ""
                        },
                        {
                            code: "tag23",
                            name: "水嘴刺大",
                            value: 1,
                            wells: "JH5"
                        },
                        {
                            code: "tag24",
                            name: "正常",
                            value: 76,
                            wells: "JH1,JH2,JH3,JH7"
                        }
                    ];
                } else { //使用接口
                    wellBoreReason(this.paramMap).then((res) => {
                        // debugger
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.indicatorAnalysisDetailInfos;
                            this.wellboreReasonNum.allnum=0;
                            this.wellboreReasonNum.zcnum=0;
                            this.wellboreReasonNum.ycnum=0;
                            myData.forEach((el,i)=>{
                                this.wellboreReasonNum.allnum+=Number(el.value);
                                if(el.name=='正常'){
                                    this.wellboreReasonNum.zcnum=Number(el.value);
                                }else{
                                    this.wellboreReasonNum.ycnum+=Number(el.value);
                                }
                            })
                            this.wellboreReasonNum.zczb=this.wellboreReasonNum.zcnum/this.wellboreReasonNum.allnum * 100;
                            // this.wellboreReasonNum.zczb=100;
                            this.wellboreReasonNum.yczb=this.wellboreReasonNum.yczb/this.wellboreReasonNum.allnum * 100;
                            this.wellboreReason = myData;
                        }
                    });
                }
            },
            //地层原因
            queryFormationReason() {
                if (this.dataSource < 1) { //静态数据
                    this.formationReason = [{
                            code: "tag30",
                            name: "油层吸水差",
                            value: 1,
                            wells: "JH1,JH2,JH3"
                        },
                        {
                            code: "tag31",
                            name: "地层堵塞",
                            value: 1,
                            wells: "JH6"
                        },
                        {
                            code: "tag32",
                            name: "正常",
                            value: 69,
                            wells: "JH1,JH2,JH3,JH7"
                        }
                    ];
                } else { //使用接口
                    layerReason(this.paramMap).then((res) => {
                        // debugger
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.indicatorAnalysisDetailInfos;
                            console.log("myData5", myData);
                            this.formationReason = myData;
                        }
                    });
                }
            },
            //停注恢复
            queryStopInjectionRecovery() {
                if (this.dataSource < 1) { //静态数据
                    this.stopInjectionRecovery = [{
                            code: "tag40",
                            name: "有潜力",
                            value: 1,
                            wells: "JH3"
                        },
                        {
                            code: "tag41",
                            name: "无潜力",
                            value: 1,
                            wells: "JH6"
                        }
                    ];
                } else { //使用接口
                    injectionClosed(this.paramMap).then((res) => {
                        // debugger
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.indicatorAnalysisDetailInfos;
                            console.log("myData6", myData);
                            this.stopInjectionRecovery = myData;
                        }
                    });
                }
            },
            //措施推荐可用项目
            queryRecommendedMeasures() {
                if (this.dataSource < 1) { //静态数据
                    this.recommendedMeasuresOptions = [{
                            code: "tagP1",
                            name: "检管",
                            value: 20,
                            increase: 10,
                            wells: ""
                        },
                        {
                            code: "tagP2",
                            name: "解堵改造",
                            value: 4,
                            increase: 0,
                            wells: ""
                        },
                        {
                            code: "tagP3",
                            name: "观察",
                            value: 4,
                            increase: 30,
                            wells: "JH2,JH3,JH4"
                        },
                        {
                            code: "tagP4",
                            name: "调整配注",
                            value: 0,
                            increase: 0,
                            wells: ""
                        },
                        {
                            code: "tagP5",
                            name: "测调",
                            value: 1,
                            increase: 0,
                            wells: ""
                        },
                        {
                            code: "tagP6",
                            name: "正常生产",
                            value: 60,
                            increase: 20,
                            wells: "JH7,JH6,JH3"
                        },
                        {
                            code: "tagP7",
                            name: "地面提压",
                            value: 2,
                            increase: 0,
                            wells: ""
                        },
                        {
                            code: "tagP8",
                            name: "恢复注水",
                            value: 0,
                            increase: 0,
                            wells: ""
                        },
                        {
                            code: "tagP9",
                            name: "防砂",
                            value: 1,
                            increase: 0,
                            wells: "JH7"
                        },
                        {
                            code: "tagP10",
                            name: "水质治理",
                            value: 2,
                            increase: 0,
                            wells: "JH2,JH5"
                        }
                    ];
                } else { //使用接口
                    injectionMeasureRecommend(this.paramMap).then((res) => {
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.indicatorAnalysisDetailInfos;
                            this.potentialWellNum=0;
                            myData.forEach((el,i)=>{
                                this.potentialWellNum+=Number(el.value);
                            })
                            this.recommendedMeasuresOptions = myData;
                        }
                    });
                }
            },
            //措施推荐可用项目,获取措施效果数据
            queryProWellDynamicAnalysisDetail() {
                if (this.dataSource < 1) { //静态数据
                    this.recommendedMeasuresData = [{
                            wellId: "JH1",
                            theDate: "2021-01-02",
                            measuresCode: "tagP2",
                            measuresName: "解堵",
                            increaseVolume: 2,
                            increaseQuality: 2,
                            increaseVolumeC: 2,
                            increaseQualityC: 2
                        },
                        {
                            wellId: "JH2",
                            theDate: "2021-01-01",
                            measuresCode: "tagP6",
                            measuresName: "开关层/补孔",
                            increaseVolume: 2,
                            increaseQuality: 2,
                            increaseVolumeC: 2,
                            increaseQualityC: 2
                        },
                        {
                            wellId: "JH3",
                            theDate: "2021-01-01",
                            measuresCode: "tagP8",
                            measuresName: "维持生产",
                            increaseVolume: 2,
                            increaseQuality: 2,
                            increaseVolumeC: 2,
                            increaseQualityC: 2
                        }
                    ];
                    this.initRecommendedMeasuresWells(); //生成井清单
                } else { //使用接口
                    injectionWellDynamicAnalysisDetail(this.paramMap).then((res) => {
                        console.log("myData11_tag", res);
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.evaluationResults;
                            console.log("myData11", myData);
                            this.recommendedMeasuresData = myData;
                            this.recommendedMeasuresWells = [];
                            this.initRecommendedMeasuresWells(); //生成井清单
                        }
                    });
                }
            },
            //初始化有措施的井清单
            initRecommendedMeasuresWells() {
                if (this.recommendedMeasuresData) {
                    for (let i = 0; i < this.recommendedMeasuresData.length; i++) {
                        let tData = this.recommendedMeasuresData[i];
                        this.recommendedMeasuresWells[tData.wellId] = i;
                    }
                }
            },
            //选中项目
            selRadioIterm(val, tag) {
                let myData = []; //我的数据
                let myWellCount = {}; //计算各项目的井数
                let t_count = 0; //计数器
                this.selCode = val; //选中项目
                this.selTag = tag; //选中数据集
                if (val == undefined || val == "") {
                    return false; //无效参数
                }
                //进行运算
                //1、获取选中井集合
                // console.log("logInfo:::",eval("this."+tag));
                if (eval("this." + tag)) {
                    for (let i = 0; i < eval("this." + tag).length; i++) {
                        let tData = eval("this." + tag)[i];
                        console.log(tData);
                        if (val == tData.code) {
                            if (tData.wells == undefined || tData.wells == "" || tData.wells == "null") { //无数据
                                myData = []; //没有数据
                                eval("this." + tag)[i].value = 0; //井数
                                myWellCount[tData.code] = 0; //计数器
                            } else { //有数据
                                let wellList = tData.wells.split(","); //我的井号串（逗号分割）
                                eval("this." + tag)[i].value = wellList.length; //井数
                                myWellCount[tData.code] = wellList.length; //计数器
                                for (let j = 0; j < wellList.length; j++) {
                                    myData[j] = {
                                        wellId: wellList[j]
                                    }; //初始容器
                                }
                            }
                            break; //找到
                        }
                    }
                }
                //2、按照顺序初始化计数器、生成数据体
                for (let i = 0; i < myData.length; i++) {
                    let myWellId = myData[i].wellId; //井号
                    //井层指标变化趋势trendOfIndicators
                    /*for(let j=0;j<this.trendOfIndicators.length;j++){
                      let t_data = this.trendOfIndicators[j];//每个数据项
                      if(val==t_data.code){//选中项目不需要测试
                        myData[i].trendOfIndicators = t_data.name;//默认
                      }else{
                        if(!isNaN(myWellCount[t_data.code])){
                          t_count = myWellCount[t_data.code];
                        }else{
                          t_count = 0;//初始化
                        }
                        let t_subWells = ","+t_data.wells+",";
                        if(t_subWells.includes(","+myWellId+",")){
                          myData[i].trendOfIndicators = t_data.name;//默认
                          t_count++;//计数
                        }
                        myWellCount[t_data.code] = t_count;//回写
                      }
                    }*/
                    for (let j = 0; j < this.trendOfIndicators.length; j++) {
                        let t_data = this.trendOfIndicators[j]; //每个数据项
                        if (val == t_data.code) { //选中项目不需要测试
                            myData[i][t_data.code] = '是'; //默认
                            //添加详情信息
                            if (t_data.basis == null) {
                                myData[i][t_data.code + 'Message'] = '';
                            } else {
                                let messData = t_data.basis.find((item) => {
                                    return item.well == myWellId
                                });
                                myData[i][t_data.code + 'Message'] = messData ? messData.message ? messData.message : '' : '';
                                myData[i][t_data.code] = messData ? messData.itemValue ? messData.itemValue : '' : '';
                            }
                        } else {
                            if (!isNaN(myWellCount[t_data.code])) {
                                t_count = myWellCount[t_data.code];
                            } else {
                                t_count = 0; //初始化
                            }
                            let t_subWells = "," + t_data.wells + ",";
                            if (t_subWells.includes("," + myWellId + ",")) {
                                myData[i][t_data.code] = '是'; //默认
                                //添加详情信息
                                if (t_data.basis == null) {
                                    myData[i][t_data.code + 'Message'] = '';
                                } else {
                                    let messData = t_data.basis.find((item) => {
                                        return item.well == myWellId
                                    });
                                    myData[i][t_data.code + 'Message'] = messData ? messData.message ? messData.message : '' : '';
                                    myData[i][t_data.code] = messData ? messData.itemValue ? messData.itemValue : '' : '';
                                }
                                t_count++; //计数
                            }
                            myWellCount[t_data.code] = t_count; //回写
                        }
                    }
                    //井层注水工况workingCondition
                    for (let j = 0; j < this.workingCondition.length; j++) {
                        let t_data = this.workingCondition[j]; //每个数据项
                        if (val == t_data.code) { //选中项目不需要测试
                            myData[i].workingCondition = t_data.name; //默认
                            //添加详情信息
                            if (t_data.basis == null) {
                                myData[i]['workingConditionMessage'] = '';
                            } else {
                                let messData = t_data.basis.find((item) => {
                                    return item.well == myWellId
                                });
                                myData[i]['workingConditionMessage'] = messData ? messData.message ? messData.message : '' : '';
                            }
                        } else {
                            if (!isNaN(myWellCount[t_data.code])) {
                                t_count = myWellCount[t_data.code];
                            } else {
                                t_count = 0; //初始化
                            }
                            let t_subWells = "," + t_data.wells + ",";
                            if (t_subWells.includes("," + myWellId + ",")) {
                                myData[i].workingCondition = t_data.name; //默认
                                //添加详情信息
                                if (t_data.basis == null) {
                                    myData[i]['workingConditionMessage'] = '';
                                } else {
                                    let messData = t_data.basis.find((item) => {
                                        return item.well == myWellId
                                    });
                                    myData[i]['workingConditionMessage'] = messData ? messData.message ? messData.message : '' : '';
                                }
                                t_count++; //计数
                            }
                            myWellCount[t_data.code] = t_count; //回写
                        }
                    }
                    //地面原因 theGroundBecause
                    for (let j = 0; j < this.theGroundBecause.length; j++) {
                        let t_data = this.theGroundBecause[j]; //每个数据项
                        if (val == t_data.code) { //选中项目不需要测试
                            myData[i].theGroundBecause = t_data.name; //默认
                            //添加详情信息
                            if (t_data.basis == null) {
                                myData[i]['theGroundBecauseMessage'] = '';
                            } else {
                                let messData = t_data.basis.find((item) => {
                                    return item.well == myWellId
                                });
                                myData[i]['theGroundBecauseMessage'] = messData ? messData.message ? messData.message : '' : '';
                            }
                        } else {
                            if (!isNaN(myWellCount[t_data.code])) {
                                t_count = myWellCount[t_data.code];
                            } else {
                                t_count = 0; //初始化
                            }
                            let t_subWells = "," + t_data.wells + ",";
                            if (t_subWells.includes("," + myWellId + ",")) {
                                myData[i].theGroundBecause = t_data.name; //默认
                                //添加详情信息
                                if (t_data.basis == null) {
                                    myData[i]['theGroundBecauseMessage'] = '';
                                } else {
                                    let messData = t_data.basis.find((item) => {
                                        return item.well == myWellId
                                    });
                                    myData[i]['theGroundBecauseMessage'] = messData ? messData.message ? messData.message : '' : '';
                                }
                                t_count++; //计数
                            }
                            myWellCount[t_data.code] = t_count; //回写
                        }
                    }
                    //井筒原因  wellboreReason
                    for (let j = 0; j < this.wellboreReason.length; j++) {
                        let t_data = this.wellboreReason[j]; //每个数据项
                        if (val == t_data.code) { //选中项目不需要测试
                            myData[i].wellboreReason = t_data.name; //默认
                            //添加详情信息
                            if (t_data.basis == null) {
                                myData[i]['wellboreReasonMessage'] = '';
                            } else {
                                let messData = t_data.basis.find((item) => {
                                    return item.well == myWellId
                                });
                                myData[i]['wellboreReasonMessage'] = messData ? messData.message ? messData.message : '' : '';
                            }
                        } else {
                            if (!isNaN(myWellCount[t_data.code])) {
                                t_count = myWellCount[t_data.code];
                            } else {
                                t_count = 0; //初始化
                            }
                            let t_subWells = "," + t_data.wells + ",";
                            if (t_subWells.includes("," + myWellId + ",")) {
                                myData[i].wellboreReason = t_data.name; //默认
                                //添加详情信息
                                if (t_data.basis == null) {
                                    myData[i]['wellboreReasonMessage'] = '';
                                } else {
                                    let messData = t_data.basis.find((item) => {
                                        return item.well == myWellId
                                    });
                                    myData[i]['wellboreReasonMessage'] = messData ? messData.message ? messData.message : '' : '';
                                }
                                t_count++; //计数
                            }
                            myWellCount[t_data.code] = t_count; //回写
                        }
                    }
                    //地层原因 formationReason
                    for (let j = 0; j < this.formationReason.length; j++) {
                        let t_data = this.formationReason[j]; //每个数据项
                        if (val == t_data.code) { //选中项目不需要测试
                            myData[i].formationReason = t_data.name; //默认
                            //添加详情信息
                            if (t_data.basis == null) {
                                myData[i]['formationReasonMessage'] = '';
                            } else {
                                let messData = t_data.basis.find((item) => {
                                    return item.well == myWellId
                                });
                                myData[i]['formationReasonMessage'] = messData ? messData.message ? messData.message : '' : '';
                            }
                        } else {
                            if (!isNaN(myWellCount[t_data.code])) {
                                t_count = myWellCount[t_data.code];
                            } else {
                                t_count = 0; //初始化
                            }
                            let t_subWells = "," + t_data.wells + ",";
                            if (t_subWells.includes("," + myWellId + ",")) {
                                myData[i].formationReason = t_data.name; //默认
                                //添加详情信息
                                if (t_data.basis == null) {
                                    myData[i]['formationReasonMessage'] = '';
                                } else {
                                    let messData = t_data.basis.find((item) => {
                                        return item.well == myWellId
                                    });
                                    myData[i]['formationReasonMessage'] = messData ? messData.message ? messData.message : '' : '';
                                }
                                t_count++; //计数
                            }
                            myWellCount[t_data.code] = t_count; //回写
                        }
                    }
                    //停注恢复 stopInjectionRecovery
                    for (let j = 0; j < this.stopInjectionRecovery.length; j++) {
                        let t_data = this.stopInjectionRecovery[j]; //每个数据项
                        if (val == t_data.code) { //选中项目不需要测试
                            myData[i].stopInjectionRecovery = t_data.name; //默认
                            //添加详情信息
                            if (t_data.basis == null) {
                                myData[i]['stopInjectionRecoveryMessage'] = '';
                            } else {
                                let messData = t_data.basis.find((item) => {
                                    return item.well == myWellId
                                });
                                myData[i]['stopInjectionRecoveryMessage'] = messData ? messData.message ? messData.message : '' : '';
                            }
                        } else {
                            if (!isNaN(myWellCount[t_data.code])) {
                                t_count = myWellCount[t_data.code];
                            } else {
                                t_count = 0; //初始化
                            }
                            let t_subWells = "," + t_data.wells + ",";
                            if (t_subWells.includes("," + myWellId + ",")) {
                                myData[i].stopInjectionRecovery = t_data.name; //默认
                                //添加详情信息
                                if (t_data.basis == null) {
                                    myData[i]['stopInjectionRecoveryMessage'] = '';
                                } else {
                                    let messData = t_data.basis.find((item) => {
                                        return item.well == myWellId
                                    });
                                    myData[i]['stopInjectionRecoveryMessage'] = messData ? messData.message ? messData.message : '' : '';
                                }
                                t_count++; //计数
                            }
                            myWellCount[t_data.code] = t_count; //回写
                        }
                    }
                    //recommendedMeasuresOptions//措施推荐；不需要考虑数据项
                    for (let j = 0; j < this.recommendedMeasuresOptions.length; j++) {
                        let t_data = this.recommendedMeasuresOptions[j]; //每个数据项
                        if (val == t_data.code) { //选中项目不需要测试
                            myData[i].measuresName = t_data.name; //默认
                            myData[i].theDate = this.paramMap.evaluationDate;
                        } else {
                            if (!isNaN(myWellCount[t_data.code])) {
                                t_count = myWellCount[t_data.code];
                            } else {
                                t_count = 0; //初始化
                            }
                            let t_subWells = "," + t_data.wells + ",";
                            if (t_subWells.includes("," + myWellId + ",")) {
                                myData[i].measuresName = t_data.name;
                                myData[i].theDate = this.paramMap.evaluationDate;
                                t_count++; //计数
                            }
                            myWellCount[t_data.code] = t_count; //回写
                        }
                    }
                    //有推荐措施时，附加措施效果数据
                    let t_index = this.recommendedMeasuresWells[myWellId];
                    if (!isNaN(t_index)) { //转移措施数据
                        let t_partData = this.recommendedMeasuresData[t_index]; //推荐措施的数据
                        myData[i].theDate = t_partData.theDate;
                        myData[i].measuresCode = t_partData.measuresCode;
                        myData[i].measuresName = t_partData.measuresName;
                        myData[i].increaseVolume = t_partData.increaseVolume;
                        myData[i].increaseQuality = t_partData.increaseQuality;
                        myData[i].increaseVolumeC = t_partData.increaseVolumeC;
                        myData[i].increaseQualityC = t_partData.increaseQualityC;
                    }
                }
                console.log(myData)
                //3、根据每个项目的井数遍历检查表头
                //井层指标变化趋势  trendOfIndicators
                this.trendOfIndicatorsTab = [];
                for (let j = 0; j < this.trendOfIndicators.length; j++) {
                    let t_data = this.trendOfIndicators[j]; //每个数据项
                    //获得相关井数
                    if (!isNaN(myWellCount[t_data.code])) {
                        t_count = myWellCount[t_data.code];
                    } else {
                        t_count = 0; //初始化
                    }
                    this.trendOfIndicators[j].value = t_count; //登记条数
                    if (t_count > 0) {
                        let titleName = t_data.name + ' ' + (t_data.unit ? t_data.unit : '');
                        if (titleName.lastIndexOf('m3') > -1) {
                            titleName = titleName.replace('m3', 'm³');
                        }
                        this.trendOfIndicatorsTab.push({
                            code: t_data.code,
                            name: titleName
                        });
                    }
                }
                //井层注水工况  workingCondition
                for (let j = 0; j < this.workingCondition.length; j++) {
                    let t_data = this.workingCondition[j]; //每个数据项
                    //获得相关井数
                    if (!isNaN(myWellCount[t_data.code])) {
                        t_count = myWellCount[t_data.code];
                    } else {
                        t_count = 0; //初始化
                    }
                    this.workingCondition[j].value = t_count; //登记条数
                }
                //地面原因 theGroundBecause
                for (let j = 0; j < this.theGroundBecause.length; j++) {
                    let t_data = this.theGroundBecause[j]; //每个数据项
                    //获得相关井数
                    if (!isNaN(myWellCount[t_data.code])) {
                        t_count = myWellCount[t_data.code];
                    } else {
                        t_count = 0; //初始化
                    }
                    this.theGroundBecause[j].value = t_count; //登记条数
                }
                //井筒原因 wellboreReason
                for (let j = 0; j < this.wellboreReason.length; j++) {
                    let t_data = this.wellboreReason[j]; //每个数据项
                    //获得相关井数
                    if (!isNaN(myWellCount[t_data.code])) {
                        t_count = myWellCount[t_data.code];
                    } else {
                        t_count = 0; //初始化
                    }
                    this.wellboreReason[j].value = t_count; //登记条数
                }
                //地层原因 formationReason
                for (let j = 0; j < this.formationReason.length; j++) {
                    let t_data = this.formationReason[j]; //每个数据项
                    //获得相关井数
                    if (!isNaN(myWellCount[t_data.code])) {
                        t_count = myWellCount[t_data.code];
                    } else {
                        t_count = 0; //初始化
                    }
                    this.formationReason[j].value = t_count; //登记条数
                }
                //停注恢复 stopInjectionRecovery
                for (let j = 0; j < this.stopInjectionRecovery.length; j++) {
                    let t_data = this.stopInjectionRecovery[j]; //每个数据项
                    //获得相关井数
                    if (!isNaN(myWellCount[t_data.code])) {
                        t_count = myWellCount[t_data.code];
                    } else {
                        t_count = 0; //初始化
                    }
                    this.stopInjectionRecovery[j].value = t_count; //登记条数
                }
                //recommendedMeasuresOptions//措施推荐；不需要考虑数据项
                for (let j = 0; j < this.recommendedMeasuresOptions.length; j++) {
                    let t_data = this.recommendedMeasuresOptions[j]; //每个数据项
                    //获得相关井数
                    if (!isNaN(myWellCount[t_data.code])) {
                        t_count = myWellCount[t_data.code];
                    } else {
                        t_count = 0; //初始化
                    }
                    this.recommendedMeasuresOptions[j].value = t_count; //登记条数
                }
                this.tableData = myData; //加载数据
                this.$nextTick(() => {
                    this.$refs.tableList.doLayout();
                })
            },
            //油井下拉框数据获取
            queryOilFeildList() {
                if (this.dataSource < 1) { //静态数据
                    this.selYtdm = [{
                        oilFieldId: "QHD326",
                        name: "秦皇岛32-6"
                    }];
                    this.selYtdm = "QHD326";
                    this.changeOilFeild(this.selYtdm); //级联条件处理
                } else { //使用接口
                    fetchOilFields().then((res) => {
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.oilFields;
                            this.ytData = myData;
                            //初始选中油田
                            if (this.selYtdm == "" || this.selYtdm == undefined) {
                                this.selYtdm = '3FC9A818F5BC43B88270DB80BBB3018F'; //hwh xg 默认初始化qhd326 //myData[0].oilFieldId;
                            }
                            this.changeOilFeild(this.selYtdm); //级联条件处理
                        }
                    });
                }
            },
            //初始平台下拉选择
            queryPlatFormList() {
                if (this.dataSource < 1) { //静态数据
                    this.ptData = [{
                            platFormId: "",
                            platName: '全部'
                        }, {
                            platFormId: 'CEPI',
                            platName: "CEPI"
                        },
                        {
                            platFormId: 'CEPJ',
                            platName: "CEPJ"
                        }, {
                            platFormId: 'WHPC',
                            platName: "WHPC"
                        }, {
                            platFormId: 'WHPH',
                            platName: "WHPH"
                        }
                    ];
                    this.platform = "CEPI"; //选中
                    this.changePlatForm(this.platform); //级联条件处理
                } else { //使用接口fetchPlatforms
                    this.paramMap.oilFieldId = this.selYtdm; //登记油田代码
                    fetchPlatforms(this.paramMap).then((res) => {
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.platform;
                            console.log("====queryPlatFormList", myData);
                            this.ptData = myData;
                            //初始选中油田
                            if (!this.platform) {
                                myData[0].platFormId=myData[0].oilFieldId;
                                this.platform = myData[0].platFormId;
                            } else {
                                this.platform = '';
                            }
                            this.changePlatForm(this.platform); //级联条件处理
                        }
                    });
                }
            },
            //初始油井下拉选择,根据油田
            queryOilWellList() {
                if (this.dataSource < 1) { //静态数据
                    this.wellData = [];
                    this.wellId = ""; //选中
                } else { //使用接口
                    this.paramMap.oilFieldId = this.selYtdm; //登记油田代码
                    fetchInjectionWells(this.paramMap).then((res) => {
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.injectionWell;
                            this.wellData = myData;
                        }
                    });
                }
            },
            //初始井下拉选择,根据平台
            queryWellListByPid() {
                if (this.dataSource < 1) { //静态数据
                    this.wellData = [];
                    this.wellId = ""; //选中
                } else { //使用接口
                    //判断平台全部情况 平台全部 的id 为 油田的id 所以通过判断油田和平台全部的id值是否相等调用不同方法
                    if (this.platform == this.selYtdm) {
                        this.queryOilWellList();
                    } else {
                        this.paramMap.platformId = this.platform?this.platform:this.ptData[0].oilFieldId; //登记平台代码
                        fetchInjectionWellsByPlatform(this.paramMap).then((res) => {
                            let msg = res.data.msg;
                            if (msg == "success") {
                                let myData = res.data.data.injectionWell;
                                this.wellData = myData;
                            }
                        });
                    }
                }
            },
            //跳转到油井页面
            goWaterWell(val) {
                if (val == "oil") {
                    this.$router.push('/singleWellPerformance_oil')
                }
            },
            //跳转到分析
            openAnalysis(wellNumber) {
                this.$router.push({
                    name: 'waterAuxiliaryAnalysis',
                    params: {
                        oilField: this.selYtdm,
                        wellId: wellNumber
                    }
                });
            },
            //检查评价日期是否有效
            checkCurrentDate() {
                if (this.currentDate == null || this.currentDate == "" || this.currentDate == undefined) {
                    //this.currentDate = this.getMyDate(-1);
                    this.currentDate = new Date().addDays(-1).format('yyyy-MM-dd');
                }
            },
            //获得对应日期串
            getMyDate(days) {
                let date = new Date();
                console.log("date0=" + date);
                date = date.setDate(date.getDate() + days);
                date = new Date(date);
                console.log("date1=" + date);
                let today = date.getDate();
                if (parseInt(today) < 10) {
                    today = '0' + today;
                }
                let dataMonth = date.getMonth() + 1;
                if (parseInt(dataMonth) < 10) {
                    dataMonth = '0' + dataMonth;
                }
                let newDate = date.getFullYear() + '-' + dataMonth + '-' + today;
                return newDate;
            },
            //el table 表格头 标题单位样式
            renderHeader(h, {
                column
            }) {
                let header = column.label.split(' ');
                return [h('span', [
                    h('p', {}, header[0]),
                    h('span', {}, header[1])
                ])];
            },
            // 排序列改变返回当前需要排序的列
            changeTableSort(e) {
                //获取当前列的字段
                const prop = e.prop;
                // 如果按降序
                if (e.order === 'descending') {
                    //根据需要对字段进行写排序
                    this.tableData = this.tableData.sort((a, b) => {
                        if (!a[prop]) {
                            return -1;
                        } else if (!b[prop]) {
                            return 1;
                        } else {
                            return parseFloat(Number(a[prop])) - parseFloat(Number(b[prop]));
                        }
                    })
                } else { //发果是降序
                    this.tableData = this.tableData.sort((a, b) => {
                        if (!a[prop]) {
                            return 1;
                        } else if (!b[prop]) {
                            return -1;
                        } else {
                            return parseFloat(Number(b[prop])) - parseFloat(Number(a[prop]));
                        }
                    })
                }
            },
            //自定义井号排序
            borepipeNoSort(oa, ob) {
                let wellA = oa.wellId;
                let wellB = ob.wellId;
                return this.wellNoSort(wellA, wellB);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .z_app_container{
        height:100%;
        .app-container{
            height:100%;
        }
        .app-container2{
            height:100%;
            // height:975px;
            .app-container3{
                margin-top:20px;
                height: calc(100% - 100px);
                position: relative;
                overflow-y: scroll;
                &::-webkit-scrollbar {
                  width: 0px;
                  height: 1px;
                }
                &::-webkit-scrollbar-thumb { //滑块部分
                  border-radius: 5px;
                  background-color: rgb(175, 74, 240);
                }
                &::-webkit-scrollbar-track { //轨道部分
                  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                  background: #ededed;
                  border-radius: 5px;
                }
                .leftBox{
                    width:563px;
                    height:968px;
                    position: relative;
                    .img1{
                        width:100%;
                        height:100%;
                        position: absolute;
                        left:0;
                        top:0;
                    }
                    .img2{
                        width:100%;
                        height:100%;
                        position: absolute;
                        left:0;
                        top:0;    
                        z-index: 2;
                    }
                    .img3{
                        position: absolute;
                        left: 0;
                        top: 146px;
                        width: 563px;
                        height: 378px;
                    }
                    .img4{
                        width:100%;
                        height:100%;
                        position: absolute;
                        left:0;
                        top:0;    
                    }
                    .img5{
                        width: 22px;
                        height: 356px;
                        position: absolute;
                        left: 178px;
                        top: 227px;
                    }
                    .bg{
                        width:100%;
                        height:100%;
                        position: absolute;
                        left:0;
                        top:0;
                    }
                }
                .rightBox{
                    width:100%;
                    height:100%;
                    position: absolute;
                    left:0;
                    top:0;
                }
                .v0{
                    padding-left:400px;
                }
                .v1{
                    margin:5px 0;
                    padding-left:400px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    position: relative;
                    .bgline1{
                        width: 358px;
                        height: 43px;
                        position: absolute;
                        left: 180px;
                        top: 30px;
                    }
                    .btns0{
                        // margin:5px 0;
                        width:224px;
                        height:70px;
                        padding-left:20px;
                        border: 1px solid;
                        border-image: linear-gradient(180deg, #2e5b7c, #01aaf2) 3 3;
                        background-image: var(--logo-bg) !important;
                        display: flex;
                        align-items: center;
                        position: relative;
                        .helpImg{
                            width:52px;
                            height:52px;
                            margin-right:18px;
                        }
                        span{
                            font-size: 50px;
                            color: #FFCA07;
                            font-weight: 600;
                        }
                        b{
                            position: absolute;
                            right:12px;
                            top:4px;
                            font-size: 16px;
                            color: #24DEFF;
                        }
                    }
                }
                .v2{
                    margin-bottom:30px;
                    padding-left:400px;
                    width:100%;
                    height:164px;
                    position: relative;
                    .bgline0{
                        width: 374px;
                        height: 134px;
                        position: absolute;
                        left: 172px;
                        top: -70px;
                    }
                    
                    .bgline2{
                        width: 380px;
                        height: 271px;
                        position: absolute;
                        left: 180px;
                        top: -72px;
                    }
                    .z-content{
                        padding-left:36px;
                        .z-content-n{
                            margin-top:16px;
                            display: flex;
                            .z-row-left{
                                margin-right:60px;
                                .z_title{
                                    display: flex;
                                    align-items: center;
                                    position: relative;
                                    img{
                                        width:38px;
                                        height:38px;
                                        margin-right:10px;
                                    }
                                    span{
                                        font-size: 16px;
                                        // color: #FFFFFF;
                                        text-align: center;
                                        font-weight: 600;
                                        z-index: 1;
                                    }
                                    &::before{
                                        content:'';
                                        background-image: linear-gradient(137deg, rgba(141,205,251,0.00) 0%, rgba(54,151,222,0.41) 30%, rgba(17,110,177,0.54) 67%, rgba(2,95,161,0.20) 88%, rgba(148,210,253,0.00) 100%);
                                        width:110px;
                                        height:32px;
                                        position: absolute;
                                        left:60px;
                                        top:2px;
                                        z-index: 0;
                                    }
                                }
                                .z_title2{
                                    display: flex;
                                    align-items: center;
                                    position: relative;
                                    img{
                                        width:38px;
                                        height:38px;
                                        margin-right:20px;
                                    }
                                    span{
                                        font-size: 16px;
                                        // color: #FFFFFF;
                                        text-align: center;
                                        font-weight: 600;
                                        z-index: 1;
                                    }
                                    &::before{
                                        content:'';
                                        background-image: linear-gradient(137deg, rgba(141,205,251,0.00) 0%, rgba(54,151,222,0.41) 30%, rgba(17,110,177,0.54) 67%, rgba(2,95,161,0.20) 88%, rgba(148,210,253,0.00) 100%);
                                        width:110px;
                                        height:32px;
                                        position: absolute;
                                        left:50px;
                                        top:2px;
                                        z-index: 0;
                                    }
                                }
                                .z_schedule{
                                    margin-top:22px;
                                    margin-bottom:10px;
                                    display: flex;
                                    align-items: center;
                                    .sp1{
                                        width:61px;
                                        font-size: 14px;
                                    }
                                    .z_proess{
                                        width:182px;
                                        height:16px;
                                        border: 1px solid rgba(41,171,226,1);
                                        margin-right:16px;
                                        display: flex;
                                        align-items: center;
                                        padding: 1px;
                                        .z_proess_sp1{
                                            height:100%;
                                            background: linear-gradient(to right, #2cbdfb 0%, #80e2bf 50%, #befe93 100%);
                                            b{
                                                font-size: 14px;
                                                color: #00223F;
                                                letter-spacing: 0;
                                                font-weight: 700;
                                                position: relative;
                                                top:-6px;
                                                left:14px;
                                            }
                                        }
                                        .z_proess_sp2{
                                            flex:1;
                                            height:100%;
                                            background: linear-gradient(to right, #ffc255 0%, #ff9c46 50%, #ff7b39 100%);
                                        }
                                    }
                                    .sp2{
                                        font-size: 14px;
                                        color:rgba(255,200,53,.8);
                                        b{
                                            font-size:20px;
                                            opacity: 1;
                                            color:#FFC835;
                                        }
                                    }
                                }
                            }
                            .z-row-center{
                                flex:1;
                                display: flex;
                                flex-wrap: wrap;
                                .numBtn{
                                    min-width: 100px;
                                    border-radius:4px;
                                    height:68px;
                                    padding:0 10px;
                                    margin-right:8px;
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    justify-content: center;
                                    background-image: linear-gradient(137deg, rgba(141,205,251,0.00) 0%, rgba(54,151,222,0.41) 30%, rgba(17,110,177,0.54) 67%, rgba(2,95,161,0.20) 88%, rgba(148,210,253,0.00) 100%);
                                    .sp1{
                                        font-size: 16px;
                                        color: #FFCA07;
                                        font-weight: 600;
                                    }
                                    .sp2{
                                        font-size: 12px;
                                    }
                                }
                            }
                            .z-row-right{
                                width:224px;
                                // height:90px;
                                margin-right:75px;
                                padding:0 30px 0 26px;
                                padding-bottom:20px;
                                border: 1px solid;
                                border-image: linear-gradient(180deg, #2e5b7c, #01aaf2) 3 3;
                                background-image: var(--logo-bg) !important;
                                .name{
                                    padding-top:14px;
                                    margin-bottom:14px;
                                    font-size: 18px;
                                    color: #24DEFF;
                                    text-align: center;
                                    line-height: 25px;
                                    font-weight: 600;
                                }
                                .num{
                                    flex-wrap: wrap;
                                    display: flex;
                                    align-items: center;
                                    justify-content: space-between;
                                    span{
                                        font-size:12px;
                                    }
                                }
                            }
                        }
                    }
                }
                .v3{
                    height:300px;
                }
            }
        }
    }
    
    .condationRow {
        height: 30px;
        line-height: 30px;
        margin-bottom: 0px;
        font-size: 14px;
    }

    //默认未选中
    ::v-deep .checkButton {
        width:100%;
        margin-top: 5px;
        .el-radio-button__inner{
            width:100%;
            height:100%;
            border-radius:0!important;
            border:1px solid rgba(143, 164, 204, 0.3);
            background: rgba(143, 164, 204, 0.3)!important;
            &:hover{
                background: var(--primary-btn)!important;
            }
        }
    }
    //选中
    ::v-deep .el-radio-group {
        .is-active{
            .el-radio-button__inner{
                width:100%;
                height:100%;
                border-radius:0;
                border:1px solid rgba(143, 164, 204, 0.3);
                background: var(--primary-btn)!important;
                &:hover{
                    background: var(--primary-btn)!important;
                }
            }
        }
    }
    //相关
    ::v-deep .about1 {
        background: rgb(2, 43, 117);
        .el-radio-button__inner{
            color:#fff;
            background: transparent!important;
        }
    }

    .checkBtn {
        width: 110px;
        height: 28px;
        font-size:14px;
        text-align: center;
        border-image: var(--primary-btn);
        background: var(--logo-bg) no-repeat top / contain, var(--primary-btn) !important;
        background-size: 100% 100% !important;
        color:#fff;
    }
    
    .about {
        width: 110px;
        height: 28px;
        font-size:14px;
        text-align: center;
        background: rgb(2, 43, 117);
        color:#fff;
    }
    
    .noCheckBtn {
        width: 110px;
        height: 28px;
        font-size:14px;
        text-align: center;
        background: rgba(143, 164, 204, 0.3);
    }


    ::v-deep .el-table thead.is-group th {
        background: transparent;
    }
</style>
