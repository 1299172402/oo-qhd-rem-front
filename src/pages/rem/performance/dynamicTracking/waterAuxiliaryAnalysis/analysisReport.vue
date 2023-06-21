<!-- 水井动态分析报告 -->
<template>
    <div class="z_app_container">
        <!-- 旧版本 -->
        <div class="app-container" v-if="!isNewformat">
            <headerSearch style="height:80px;">
                <div class="g-row-flex-V g-w100 g-h100">
                    <span>油田：</span>
                    <el-select v-model="selYtdm" class="f2" style="width:180px" filterable clearable disabled @change="getFieldsData">
                        <el-option v-for="item in ytData" :key="item.oilFieldId" :label="item.name" :value="item.oilFieldId" :disabled="item.disabled"></el-option>
                    </el-select>
                    <span style="margin-left:15px;">区块：</span>
                    <el-select v-model="selectBlock" style="width: 180px" filterable clearable @change="queryPlatFormList">
                        <el-option v-for="item in blocks" :key="item.fieldId" :label="item.name" :value="item.fieldId"></el-option>
                    </el-select>
                    <span style="margin-left:15px;">平台：</span>
                    <el-select v-model="platform" class="f2" style="width:220px" filterable clearable @change="queryWellListByPid">
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
                                            <el-button class="commonBtn" style="width:100%;cursor: inherit;margin-bottom:10px;">注入动态</el-button>
                                            <el-col v-for="(item,index) in trendOfIndicators" :key="index" :span="24">
                                                <el-button class="z-button"  :class="[item.value>0?'about1':'',item.code==selCode?'selectButton':'']" @click.stop="selRadioIterm(item.code,'trendOfIndicators')">
                                                    {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                                </el-button>
                                            </el-col>   
                                        </el-col>
                                        <el-col :span="12">
                                            <el-button class="commonBtn" style="width:100%;cursor: inherit;margin-bottom:10px;">井层注水工况</el-button>
                                            <el-col v-for="(item,index) in workingCondition" :key="index" :span="24">
                                                <el-button class="z-button"  :class="[item.value>0?'about1':'',item.code==selCode?'selectButton':'']" @click.stop="selRadioIterm(item.code,'workingCondition')">
                                                    {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                                </el-button>
                                            </el-col>  
                                        </el-col>
                                    </el-row>
                                </pagePanel>
                            </el-col>
                            <el-col :span="10" style="height: 100%">
                                <pagePanel headerTitle="超欠注原因分析" style="margin-top:0;height:100%;">
                                    <el-row :gutter="10">
                                        <el-col :span="6">
                                            <el-button class="commonBtn" style="width:100%;cursor: inherit;margin-bottom:10px;">地面原因</el-button>
                                            <el-col v-for="(item,index) in theGroundBecause" :key="index" :span="24">
                                                <el-button class="z-button"  :class="[item.value>0?'about1':'',item.code==selCode?'selectButton':'']" @click.stop="selRadioIterm(item.code,'theGroundBecause')">
                                                    {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                                </el-button>
                                            </el-col>  
                                            
                                        </el-col>
                                        <el-col :span="6">
                                            <el-button class="commonBtn" style="width:100%;cursor: inherit;margin-bottom:10px;">井筒原因</el-button>
                                            <el-col v-for="(item,index) in wellboreReason" :key="index" :span="24">
                                                <el-button class="z-button"  :class="[item.value>0?'about1':'',item.code==selCode?'selectButton':'']" @click.stop="selRadioIterm(item.code,'wellboreReason')">
                                                    {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                                </el-button>
                                            </el-col>  
                                        </el-col>
                                        <el-col :span="6">
                                            <el-button class="commonBtn" style="width:100%;cursor: inherit;margin-bottom:10px;">地层原因</el-button>
                                            <el-col v-for="(item,index) in formationReason" :key="index" :span="24">
                                                <el-button class="z-button"  :class="[item.value>0?'about1':'',item.code==selCode?'selectButton':'']" @click.stop="selRadioIterm(item.code,'formationReason')">
                                                    {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                                </el-button>
                                            </el-col>  
                                        </el-col>
                                        <el-col :span="6">
                                            <el-button class="commonBtn" style="width:100%;cursor: inherit;margin-bottom:10px;">停注恢复</el-button>
                                            <el-col v-for="(item,index) in stopInjectionRecovery" :key="index" :span="24">
                                                <el-button class="z-button"  :class="[item.value>0?'about1':'',item.code==selCode?'selectButton':'']" @click.stop="selRadioIterm(item.code,'stopInjectionRecovery')">
                                                    {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                                </el-button>
                                            </el-col>  
                                        </el-col>
                                    </el-row>
                                </pagePanel>
                            </el-col>
                            <el-col :span="4" style="height: 100%">
                                <pagePanel headerTitle="注水强度" style="margin-top:0;height:100%;">
                                    <el-row :gutter="10" style="height: 100%">
                                        <el-radio-group v-model="selCode"  style="width: 100%;">
                                            <!-- 等模型 -->
                                            <el-col :span="24">
                                                <el-radio-button class="checkButton" label="0001">
                                                    注水强度偏高{{`(` + this.zsqdForm.evaluationBiasTall + `)`}}
                                                </el-radio-button>
                                            </el-col>
                                            <el-col :span="24">
                                                <el-radio-button class="checkButton" label="0002">
                                                    注水强度偏低{{`(` +  this.zsqdForm.evaluationBiasLow  + `)`}}
                                                </el-radio-button>
                                            </el-col>
                                           
                                            <el-col :span="24">
                                                <el-radio-button class="checkButton" label="BG" >
                                                    注水强度变高{{`(` +  this.zsqdForm.evaluationChangeTall  + `)`}}
                                                </el-radio-button>
                                            </el-col>
                                            <el-col :span="24">
                                                <el-radio-button class="checkButton" label="BD">
                                                    注水强度变低{{`(` +  this.zsqdForm.evaluationChangeLow  + `)`}}
                                                </el-radio-button>
                                            </el-col>
                                            <el-col :span="24">
                                                <el-radio-button class="checkButton">
                                                    正常{{`(` +  this.zsqdForm.evaluationNormal  + `)`}}
                                                </el-radio-button>
                                            </el-col>
                                        </el-radio-group>
                                    </el-row>
                                </pagePanel>
                            </el-col>
                            <el-col :span="5" style="height: 100%">
                                <pagePanel headerTitle="措施推荐" style="margin-top:0;height:100%;">
                                    <el-row :gutter="10" style="height: 100%">
                                        <!-- <el-radio-group v-model="selCode" style="width: 100%;" @change="((val)=>{selRadioIterm(val,'recommendedMeasuresOptions')})">
                                            <el-col v-for="(item,index) in recommendedMeasuresOptions" :key="index" :span="12">
                                                <el-radio-button :class="item.value>0?'checkButton about1':'checkButton'" :label="item.code">
                                                    {{item.name+(item.value>0?'('+item.value+')':'(0)')}}
                                                </el-radio-button>
                                            </el-col>
                                        </el-radio-group> -->
                                        <el-col v-for="(item,index) in recommendedMeasuresOptions" :key="index" :span="24">
                                            <el-button class="z-button"  :class="[item.value>0?'about1':'',item.code==selCode?'selectButton':'']" @click.stop="selRadioIterm(item.code,'recommendedMeasuresOptions')">
                                                {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                            </el-button>
                                        </el-col>  
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
                                                <td v-if="selCode=='BD'  ||selCode=='BG' " class="noCheckBtn"><el-button type="primary"  @click="$router.push({name:'attributtonAnalysis',query:{'selectBlock':selectBlock,'platform':platform,'wellId':wellId,'link':4,'evalResult':selCode,'currentDate':currentDate}} )">
                                                    归因分析详情
                                                </el-button></td>
                                        </tr>
                                    </table>
                                </el-col>
                            </el-row>
<!--                            <div  style="width: 250px;display: flex;justify-content: flex-end;position: relative;top:40px;">-->
<!--                                <el-button type="primary"  @click="$router.push({path:'attributtonAnalysis'})">-->
<!--                                    归因分析详情-->
<!--                                </el-button>-->
<!--                            </div>-->
                        </div>
                    </div>
                    <div style="flex:1;min-height:380px;">
                        <pagePanel headerTitle="水井动态分析详情列表" style="margin-top:0;height:100%;">
                            <el-table
                            class="doubleHeader"
                            :row-style="{ height: '0px' }"
                            :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
                            :data="tableData"
                            header-cell-class-name="table_header"
                            :cell-style="{ padding: '6px', 'text-align': 'center' }"
                            :default-sort="{ prop: 'date', order: 'descending' }"
                            height="100%"
                            @sort-change="changeTableSort" ref="tableList"
                            row-key="wellId"
                            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                            <el-table-column type="index" label="序号" align="center" width="80px" fixed="left"></el-table-column>
                                <el-table-column prop="wellId" label="井号" align="center" width="180px" :sortable="true" :sort-method="borepipeNoSort" fixed="left"></el-table-column>
                                <el-table-column prop="productionProblems" label="生产问题" align="center">
                                    <el-table-column label-class-name="twoRowHeader" v-for="(item, index) in trendOfIndicatorsTab" :key="index" :prop="item.code" :label="item.name" align="center" sortable="custom">
                                        <template #header>
                                            <div v-if="item.unit">
                                                <span>{{item.name}}</span>
                                                <br />
                                                <span>{{item.unit}}</span>
                                            </div>
                                            <div v-else>
                                                <span>{{item.name}}</span>
                                            </div>
                                        </template>
                                        <template slot-scope="{row}">
                                            <span style="display: flex;align-items: center;justify-content: center;">
                                                <span v-if="!row[item.code+'Message']">{{row[item.code]?row[item.code]:'-'}}</span>
                                                <el-tooltip v-else class="item" effect="dark" :content="row[item.code+'Message']" placement="top">
                                                    <span>{{row[item.code]?row[item.code]:'-'}}</span>
                                                </el-tooltip>
                                                <img src="@/assets/rem/yieId/upTriangle.png" v-if="row[item.code+'Message']&&row[item.code+'Message'].includes('上升')" style="width:20px;height:20px;">
                                                <img src="@/assets/rem/yieId/downTriangle.png" v-if="row[item.code+'Message']&&row[item.code+'Message'].includes('下降')"  style="width:20px;height:20px;">
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="注水强度"></el-table-column>
                                    <el-table-column v-for="(item, index) in productionProblemsTab" :key="index" :prop="item.code" :label="item.name"  align="center">
                                        <template slot-scope="{row}">
                                            <span v-if="row[item.code+'Message']==''">{{row[item.code]?row[item.code]:'-'}}</span>
                                            <el-tooltip v-else class="item" effect="dark" :content="row[item.code+'Message']" placement="top">
                                                <span>{{row[item.code]?row[item.code]:'-'}}</span>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column prop="overUnderInjectionAnalysis" label="超欠注原因分析" align="center">
                                    <el-table-column v-for="(item, index) in overUnderInjectionAnalysisTab" :key="index" :prop="item.code" :label="item.name" align="center">
                                        <template slot-scope="{row}">
                                            <span v-if="row[item.code+'Message']==''">{{row[item.code]?row[item.code]:'-'}}</span>
                                            <el-tooltip v-else class="item" effect="dark" :content="row[item.code+'Message']" placement="top">
                                                <span>{{row[item.code]?row[item.code]:'-'}}</span>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column prop="recommendedMeasures" label="措施初选" align="center">
                                    <el-table-column prop="measuresName" label="推荐措施" align="center">
                                        <template slot-scope="{row}">
                                             <span>{{row.measuresName?row.measuresName:'-'}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="theDate" label="推荐日期" align="center" width="120px">
                                        <template slot-scope="{row}">
                                             <span>{{row.theDate?row.theDate:'-'}}</span>
                                        </template>
                                    </el-table-column>
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
                    <el-select v-model="selYtdm" class="f2" style="width:180px" filterable clearable disabled @change="getFieldsData">
                        <el-option v-for="item in ytData" :key="item.oilFieldId" :label="item.name" :value="item.oilFieldId" :disabled="item.disabled"></el-option>
                    </el-select>
                    <span style="margin-left:15px;">区块：</span>
                    <el-select v-model="selectBlock" style="width: 180px" filterable clearable @change="queryPlatFormList">
                        <el-option v-for="item in blocks" :key="item.fieldId" :label="item.name" :value="item.fieldId"></el-option>
                    </el-select>
                    <span style="margin-left:15px;">平台：</span>
                    <el-select v-model="platform" class="f2" style="width:220px" filterable clearable @change="queryWellListByPid">
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
                    <img src="@/assets/rem/performance/bg.png" alt="" class="bg" v-if="$store.state.setting.mode=='dark'">
                    <img src="@/assets/rem/performance/bg2.png" alt="" class="bg" v-else>
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
                    <div class="v2" style="z-index: 5;">
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
                                                <span class="z_proess_sp1" :style="{width:trendOfIndicatorsNum.zczb+'%'}">
                                                    <b @click="trendOfIndicatorsSwitch=true">{{trendOfIndicatorsNum.zcnum}}</b>
                                                </span>
                                                <span class="z_proess_sp2"></span>
                                            </div>
                                            <span class="sp2">异常：<b @click="trendOfIndicatorsSwitch=false">{{trendOfIndicatorsNum.ycnum}}</b></span>
                                        </div>
                                    </div>  
                                    <div class="z-row-center">
                                        <div class="numBtn"  :class="[item.code==selCode?'numBtnBgActive':'']"
                                            v-for="(item,index) in trendOfIndicators" :key="index" 
                                            v-if="item.name!='正常'&&(item.value!=0||item.isShow)&&!trendOfIndicatorsSwitch" 
                                            @click="((val)=>{selRadioIterm(item.code,'trendOfIndicators')})">
                                            <span class="sp1">{{item.value}}</span>
                                            <span class="sp2">{{item.name}}</span>
                                        </div>
                                        <div class="numBtn"  :class="[item.code==selCode?'numBtnBgActive':'']"
                                            v-for="(item,index) in trendOfIndicators" :key="index" 
                                            v-if="item.name=='正常'&&trendOfIndicatorsSwitch"
                                            @click="((val)=>{selRadioIterm(item.code,'trendOfIndicators')})">
                                            <span class="sp1">{{item.value}}</span>
                                            <span class="sp2">{{item.name}}</span>
                                        </div>
                                    </div>
                                    <div class="z-row-right">
                                        <div class="name">措施推荐</div>
                                        <div class="num">
                                            <span 
                                                v-for="(item,index) in recommendedMeasuresOptions" :key="index" 
                                                v-if="item.name=='地面提压'||item.name=='测调'"
                                                @click="((val)=>{selRadioIterm(item.code,'recommendedMeasuresOptions')})">
                                                {{item.name}}：
                                                <b style="color: #FFC835; font-size: 14px;">{{item.value}}</b>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </info-window>
                    </div>
                    <div class="v2" style="z-index: 4;">
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
                                                <span class="z_proess_sp1" :style="{width:wellboreReasonNum.zczb+'%'}">
                                                    <b @click="wellboreReasonSwitch=true">{{wellboreReasonNum.zcnum}}</b>
                                                </span>
                                                <span class="z_proess_sp2"></span>
                                            </div>
                                            <span class="sp2">异常：<b @click="wellboreReasonSwitch=true">{{wellboreReasonNum.ycnum}}</b></span>
                                        </div>
                                    </div>  
                                    <div class="z-row-center">
                                        <div class="numBtn" :class="[item.code==selCode?'numBtnBgActive':'']"
                                            v-for="(item,index) in wellboreReason" :key="index" 
                                            v-if="item.name!='正常'&&(item.value!=0||item.isShow)&&!wellboreReasonSwitch"
                                            @click="((val)=>{selRadioIterm(item.code,'wellboreReason')})">
                                            <span class="sp1">{{item.value}}</span>
                                            <span class="sp2">{{item.name}}</span>
                                        </div>
                                        <div class="numBtn" :class="[item.code==selCode?'numBtnBgActive':'']"
                                            v-for="(item,index) in wellboreReason" :key="index" 
                                            v-if="item.name=='正常'&&wellboreReasonSwitch"
                                            @click="((val)=>{selRadioIterm(item.code,'wellboreReason')})">
                                            <span class="sp1">{{item.value}}</span>
                                            <span class="sp2">{{item.name}}</span>
                                        </div>
                                    </div>
                                    <div class="z-row-right">
                                        <div class="name">措施推荐</div>
                                        <div class="num">
                                            <span 
                                                v-for="(item,index) in recommendedMeasuresOptions" :key="index" 
                                                v-if="item.name=='检查管柱'"
                                                @click="((val)=>{selRadioIterm(item.code,'recommendedMeasuresOptions')})">
                                                {{item.name}}：
                                                <b style="color: #FFC835; font-size: 14px;">{{item.value}}</b>
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
                                                <span class="z_proess_sp1" :style="{width:workingCondNum.zczb+'%'}">
                                                    <b @click="workingCondSwitch=true">{{workingCondNum.zcnum}}</b>
                                                </span>
                                                <span class="z_proess_sp2"></span>
                                            </div>
                                            <span class="sp2">异常：<b @click="workingCondSwitch=false">{{workingCondNum.ycnum}}</b></span>
                                        </div>
                                    </div>  
                                    <div class="z-row-center">
                                        <div class="numBtn" :class="[item.code==selCode?'numBtnBgActive':'']"
                                            v-for="(item,index) in workingCondition" :key="index" 
                                            v-if="item.name!='正常'&&item.name!='合格区'&&(item.value!=0||item.isShow)&&!workingCondSwitch"
                                            @click="((val)=>{selRadioIterm(item.code,'workingCondition')})">
                                            <span class="sp1">{{item.value}}</span>
                                            <span class="sp2">{{item.name}}</span>
                                        </div>
                                        <div class="numBtn"  :class="[item.code==selCode?'numBtnBgActive':'']"
                                            v-for="(item,index) in workingCondition" :key="index" 
                                             v-if="(item.name=='正常'||item.name=='合格区')&&workingCondSwitch"
                                            @click="((val)=>{selRadioIterm(item.code,'workingCondition')})">
                                            <span class="sp1">{{item.value}}</span>
                                            <span class="sp2">{{item.name}}</span>
                                        </div>
                                    </div>
                                    <div class="z-row-right" style="position: relative;top: 48px;">
                                        <div class="name">措施推荐</div>
                                        <div class="num">
                                            <span 
                                                v-for="(item,index) in recommendedMeasuresOptions" :key="index" v-if="item.name=='储层改造'||item.name=='酸化解堵'||item.name=='恢复注水'"
                                                @click="((val)=>{selCode=item.code;selRadioIterm(item.code,'recommendedMeasuresOptions')})">
                                                {{item.name}}：
                                                <b style="color: #FFC835; font-size: 14px;">{{item.value}}</b>
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
                                        <div class="numBtn" v-if="false">
                                            <span class="sp1">0</span>
                                            <span class="sp2">注水强度偏高</span>
                                        </div>
                                        <div class="numBtn" v-if="false">
                                            <span class="sp1">0</span>
                                            <span class="sp2">注水强度偏低</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </info-window>
                    </div>
                    <div style="height:540px;">
                        <info-window info-width="100%"  info-height="100%"  header-title="水井动态分析详情列表" :is-show-max-btn="false">
                            <el-table
                            class="doubleHeader"
                            :row-style="{ height: '0px' }"
                            :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
                            :data="tableData"
                            header-cell-class-name="table_header"
                            :cell-style="{ padding: '6px', 'text-align': 'center' }"
                            :default-sort="{ prop: 'date', order: 'descending' }"
                            height="100%"
                            @sort-change="changeTableSort" ref="tableList"
                            row-key="wellId"
                            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                            <el-table-column type="index" label="序号" align="center" width="80px" fixed="left"></el-table-column>
                                <el-table-column prop="wellId" label="井号" align="center" :sortable="true" :sort-method="borepipeNoSort" fixed="left"></el-table-column>
                                <el-table-column prop="productionProblems" label="生产问题" align="center">
                                    <el-table-column label-class-name="twoRowHeader" v-for="(item, index) in trendOfIndicatorsTab" :key="index" :prop="item.code" :label="item.name" align="center" sortable="custom">
                                        <template #header>
                                            <div v-if="item.unit">
                                                <span>{{item.name}}</span>
                                                <br />
                                                <span>{{item.unit}}</span>
                                            </div>
                                            <div v-else>
                                                <span>{{item.name}}</span>
                                            </div>
                                        </template>
                                        <template slot-scope="{row}">
                                            <span style="display: flex;align-items: center;justify-content: center;">
                                                <span v-if="!row[item.code+'Message']">{{row[item.code]?row[item.code]:'-'}}</span>
                                                <el-tooltip v-else class="item" effect="dark" :content="row[item.code+'Message']" placement="top">
                                                    <span>{{row[item.code]?row[item.code]:'-'}}</span>
                                                </el-tooltip>
                                                <img src="@/assets/rem/yieId/upTriangle.png" v-if="row[item.code+'Message']&&row[item.code+'Message'].includes('上升')" style="width:20px;height:20px;">
                                                <img src="@/assets/rem/yieId/downTriangle.png" v-if="row[item.code+'Message']&&row[item.code+'Message'].includes('下降')"  style="width:20px;height:20px;">
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column v-for="(item, index) in productionProblemsTab" :key="index" :prop="item.code" :label="item.name"  align="center">
                                        <template slot-scope="{row}">
                                            <span v-if="row[item.code+'Message']==''">{{row[item.code]?row[item.code]:'-'}}</span>
                                            <el-tooltip v-else class="item" effect="dark" :content="row[item.code+'Message']" placement="top">
                                                <span>{{row[item.code]?row[item.code]:'-'}}</span>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column prop="overUnderInjectionAnalysis" label="超欠注原因分析" align="center">
                                    <el-table-column v-for="(item, index) in overUnderInjectionAnalysisTab" :key="index" :prop="item.code" :label="item.name" align="center">
                                        <template slot-scope="{row}">
                                            <span v-if="row[item.code+'Message']==''">{{row[item.code]?row[item.code]:'-'}}</span>
                                            <el-tooltip v-else class="item" effect="dark" :content="row[item.code+'Message']" placement="top">
                                                <span>{{row[item.code]?row[item.code]:'-'}}</span>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column prop="recommendedMeasures" label="措施初选" align="center">
                                    <el-table-column prop="measuresName" label="推荐措施" align="center">
                                        <template slot-scope="{row}">
                                             <span>{{row.measuresName?row.measuresName:'-'}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="theDate" label="推荐日期" align="center" width="120px">
                                        <template slot-scope="{row}">
                                             <span>{{row.theDate?row.theDate:'-'}}</span>
                                        </template>
                                    </el-table-column>
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
        injectionWellDynamicAnalysisDetail,
        queryEvaluationWaterInjCount
    } from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
    import {
        fetchFields,
        fetchOilFields,
        fetchPlatforms,
        fetchInjectionWells,
        fetchInjectionWellsByPlatform
    } from "@/api/oilDeposit/rem-02/primaryinfo.js";
    export default {
        name:'waterAnalysisReport',
        data() {
            return {
                collectWells:[],//收集井
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
                //区块筛选条件
                blocks:[],
                selectBlock:'',
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
                //注水强度form菜单数据
                zsqdForm:[],
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
                trendOfIndicatorsSwitch:false,//展示异常false, 正常 true
                trendOfIndicatorsCode:'',//正常的code
                //井层注水工况
                workingCondition: [],
                workingCondNum:{
                    allnum:0,
                    zcnum:0,
                    ycnum:0,
                    zczb:0,
                    yczb:0,
                },
                workingCondSwitch:false,//展示异常false, 正常 true
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
                wellboreReasonSwitch:false,//展示异常false, 正常 true
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
            this.getzsqdData()
        },
        methods: {
            clickmodel(){
                console.log(123)  
            },
            //获取注水强度数据
            getzsqdData(){
                let assetCode = this.platform,reservoirUnitId = this.selectBlock
                if(assetCode == '3FC9A818F5BC43B88270DB80BBB3018F' ){
                    assetCode = ''
                }
                if(reservoirUnitId == '3FC9A818F5BC43B88270DB80BBB3018F' ){
                    reservoirUnitId = ''
                }
                let params = {
                    assetCode:assetCode,
                    date:this.currentDate,
                    ogfId:this.selYtdm,
                    reservoirUnitId:reservoirUnitId,
                    wellId:this.wellId
                }
                queryEvaluationWaterInjCount(params).then((res) =>{
                     this.zsqdForm = res.data.data[0]
                })
            },
            //重置
            resetting(){
                this.$nextTick(()=>{
                	Object.assign(this.$data, this.$options.data());
                	this.checkCurrentDate(); //初始化评价日期
                	this.queryOilFeildList(); //初始化油田
                })
            },
            //获取油田数据
            queryOilFeildList() {
                fetchOilFields().then((res) => {
                    let msg = res.data.msg;
                    if (msg == "success") {
                        let myData = res.data.data.oilFields;
                        this.ytData = myData;
                        //初始选中油田
                        if (this.selYtdm == "" || this.selYtdm == undefined) {
                            this.selYtdm = '3FC9A818F5BC43B88270DB80BBB3018F'; //hwh xg 默认初始化qhd326 //myData[0].oilFieldId;
                        }
                        this.getFieldsData();
                    }
                });
            },
            //获取区块数据
            getFieldsData(){
                let request = {
                    oilFieldId: this.selYtdm
                };
                fetchFields(request).then((res) => {
                    if (res.data.data.fields.length != 0) { //获得区块信息
                        this.blocks = res.data.data.fields;
                        //默认选中第一个区块信息
                        this.selectBlock = this.blocks[0].fieldId;
                        this.queryPlatFormList();
                    }
                });
            },
            //获取平台数据
            queryPlatFormList() {
                this.paramMap.oilFieldId = this.selYtdm; //油田
                this.paramMap.selectBlock=this.selectBlock;//区块
                this.ptData=[];
                this.wellData=[];
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
                        this.queryWellListByPid(); 
                    }
                });
            },
            //获取井号
            queryWellListByPid() {
                //判断平台全部情况 平台全部 的id 为 油田的id 所以通过判断油田和平台全部的id值是否相等调用不同方法
                if (this.platform == this.selYtdm) {
                    this.paramMap.oilFieldId = this.selYtdm; //登记油田代码
                    fetchInjectionWells(this.paramMap).then((res) => {
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.injectionWell;
                            this.wellData = myData;
                        }
                    });
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
                
                if(this.initTypes==1){//第一次加载
                    this.initTypes=2;
                    this.doSearch();
                }
            },
            //进行数据查询处理
            async doSearch() {
                //加上重新搜索清空选择 和 表格数据
                this.selCode = '';
                this.tableData = [];
                //重新初始化相关数据项目
                this.paramMap.evaluationDate = this.currentDate;
                this.paramMap.oilFieldId = this.selYtdm;
                this.paramMap.platformId = this.platform;
                this.paramMap.timeGranularityCode = "";
                this.paramMap.wellId = this.wellId;
                //执行提取
                await this.queryTrendOfIndicators(); //井层指标变化趋势
                await this.queryWorkingCondition(); //井层注水工况
                await this.queryTheGroundBecause(); //地面原因
                await this.queryWellboreReason(); //井筒原因
                await this.queryFormationReason(); //地层原因
                await this.queryStopInjectionRecovery(); //停注恢复
                await this.queryRecommendedMeasures(); //措施推荐
                await this.queryProWellDynamicAnalysisDetail(); //措施井数据
                await this.getzsqdData(); //zxp
                
                //触发初始选中 （测试没有使用，需要异步使用，还需要）
                // this.selRadioIterm(this.selCode, this.selTag);
                if(this.collectWells.length){
                    let data=[];
                    for(let i=0;i<this.collectWells.length;i++){
                        data.push(...this.collectWells[i]);
                    }  
                    data= [...new Set(data)];
                    let myData=[];
                    data.forEach((el,i)=>{
                        myData.push({wellId:el,children:[]})
                    });
                    this.queryTableData(myData);
                }
            },
            queryTableData(myData,val=''){
                let myWellCount = {}; //计算各项目的井数
                let t_count = 0; //计数器
                //2、按照顺序初始化计数器、生成数据体
                for (let i = 0; i < myData.length; i++) {
                    let myWellId = myData[i].wellId; //井号
                    //井层指标变化趋势trendOfIndicators
                    for (let j = 0; j < this.trendOfIndicators.length; j++) {
                        let t_data = this.trendOfIndicators[j]; //每个数据项
                        let messData={};
                        //添加详情信息
                        if (t_data.basis == null) {
                            myData[i][t_data.code + 'Message'] = '';
                        } else {
                            messData = t_data.basis.find((item) => {
                                return item.well == myWellId
                            });
                            myData[i][t_data.code + 'Message'] = messData&& messData.message ? messData.message : '' ;
                            myData[i][t_data.code] = messData&&messData.itemValue ? messData.itemValue : '';
                        }
                        //选中项目不需要测试
                        if (val == t_data.code) { 
                            myData[i][t_data.code] = '是'; //默认
                        } else {
                            if (!isNaN(myWellCount[t_data.code])) {
                                t_count = myWellCount[t_data.code];
                            } else {
                                t_count = 0; //初始化
                            }
                            let t_subWells = "," + t_data.wells + ",";
                            if (t_subWells.includes("," + myWellId + ",")) {
                                myData[i][t_data.code] = '是'; //默认
                                t_count++; //计数
                            }
                            myWellCount[t_data.code] = t_count; //回写
                        }
                        //深化点-点击井号展示井位
                        console.log('messData----------aaaaaaaaaaaa',messData)
                        if(messData&&messData.evalBasisLayers){
                            let key1=t_data.code + 'Message';
                            console.log('key1',key1)
                            let key2=t_data.code;
                            let evalBasisLayers=messData.evalBasisLayers;//层位数据
                            let children=myData[i].children;
                            if(children.length){
                                for(let a=0;a<evalBasisLayers.length;a++){
                                    let isFindOut=false;//默认没有查到
                                    for(let b=0;b<children.length;b++){
                                        if(evalBasisLayers[a].layerCode == children[b].wellId){
                                            isFindOut=true;
                                            children[b][key1]=evalBasisLayers[a].message;
                                            children[b][key2]=evalBasisLayers[a].itemValue;
                                        }   
                                    }
                                    if(!isFindOut){
                                        children.push({
                                            wellId:evalBasisLayers[a].layerCode,
                                            [key1]:evalBasisLayers[a].message,
                                            [key2]:evalBasisLayers[a].itemValue,
                                        })
                                    }
                                }
                            }else{
                                evalBasisLayers.forEach((el,i)=>{
                                    children.push({
                                        wellId:el.layerCode,
                                        [key1]:el.message,
                                        [key2]:el.itemValue
                                    })
                                })
                            }
                        }
                    }
                    //井层注水工况workingCondition
                    for (let j = 0; j < this.workingCondition.length; j++) {
                        let t_data = this.workingCondition[j]; //每个数据项
                        let messData={};
                        //添加详情信息
                        if (t_data.basis == null) {
                            myData[i]['workingConditionMessage'] = '';
                        } else {
                            messData = t_data.basis.find((item) => {
                                return item.well == myWellId
                            });
                            myData[i]['workingConditionMessage'] = messData ? messData.message ? messData.message : '' : '';
                        }
                        if (val == t_data.code) { //选中项目不需要测试
                            myData[i].workingCondition = t_data.name; //默认
                        } else {
                            if (!isNaN(myWellCount[t_data.code])) {
                                t_count = myWellCount[t_data.code];
                            } else {
                                t_count = 0; //初始化
                            }
                            let t_subWells = "," + t_data.wells + ",";
                            if (t_subWells.includes("," + myWellId + ",")) {
                                myData[i].workingCondition = t_data.name; //默认
                                t_count++; //计数
                            }
                            myWellCount[t_data.code] = t_count; //回写
                        }
                        if(messData&&messData.evalBasisLayers){
                            let key1='workingConditionMessage';
                            let evalBasisLayers=messData.evalBasisLayers;//层位数据
                            let children=myData[i].children;
                            if(children.length){
                                for(let a=0;a<evalBasisLayers.length;a++){
                                    let isFindOut=false;//默认没有查到
                                    for(let b=0;b<children.length;b++){
                                        if(evalBasisLayers[a].layerCode == children[b].wellId){
                                            isFindOut=true;
                                            children[b][key1]=evalBasisLayers[a].message;
                                        }   
                                    }
                                    if(!isFindOut){
                                        children.push({
                                            wellId:evalBasisLayers[a].layerCode,
                                            [key1]:evalBasisLayers[a].message,
                                        })
                                    }
                                }
                            }else{
                                evalBasisLayers.forEach((el,i)=>{
                                    children.push({
                                        wellId:el.layerCode,
                                        [key1]:el.message,
                                    })
                                })
                            }
                        }
                    }
                    //地面原因 theGroundBecause
                    for (let j = 0; j < this.theGroundBecause.length; j++) {
                        let t_data = this.theGroundBecause[j]; //每个数据项
                        let messData={};
                        //添加详情信息
                        if (t_data.basis == null) {
                            myData[i]['theGroundBecauseMessage'] = '';
                        } else {
                            messData = t_data.basis.find((item) => {
                                return item.well == myWellId
                            });
                            myData[i]['theGroundBecauseMessage'] = messData ? messData.message ? messData.message : '' : '';
                        }
                        //选中项目不需要测试
                        if (val == t_data.code) { 
                            myData[i].theGroundBecause = t_data.name; //默认
                        } else {
                            if (!isNaN(myWellCount[t_data.code])) {
                                t_count = myWellCount[t_data.code];
                            } else {
                                t_count = 0; //初始化
                            }
                            let t_subWells = "," + t_data.wells + ",";
                            if (t_subWells.includes("," + myWellId + ",")) {
                                myData[i].theGroundBecause = t_data.name; //默认
                                t_count++; //计数
                            }
                            myWellCount[t_data.code] = t_count; //回写
                        }
                        //深化点-点击井号展示井位
                        console.log('messData----------aaaaaaaaaaaa',messData)
                        if(messData&&messData.evalBasisLayers){
                            let key1='theGroundBecauseMessage';
                            let evalBasisLayers=messData.evalBasisLayers;//层位数据
                            let children=myData[i].children;
                            if(children.length){
                                for(let a=0;a<evalBasisLayers.length;a++){
                                    let isFindOut=false;//默认没有查到
                                    for(let b=0;b<children.length;b++){
                                        if(evalBasisLayers[a].layerCode == children[b].wellId){
                                            isFindOut=true;
                                            children[b][key1]=evalBasisLayers[a].message;
                                        }   
                                    }
                                    if(!isFindOut){
                                        children.push({
                                            wellId:evalBasisLayers[a].layerCode,
                                            [key1]:evalBasisLayers[a].message,
                                        })
                                    }
                                }
                            }else{
                                evalBasisLayers.forEach((el,i)=>{
                                    children.push({
                                        wellId:el.layerCode,
                                        [key1]:el.message,
                                    })
                                })
                            }
                        }
                    }
                    //井筒原因  wellboreReason
                    for (let j = 0; j < this.wellboreReason.length; j++) {
                        let t_data = this.wellboreReason[j]; //每个数据项
                        let messData={};
                        //添加详情信息
                        if (t_data.basis == null) {
                            myData[i]['wellboreReasonMessage'] = '';
                        } else {
                            messData = t_data.basis.find((item) => {
                                return item.well == myWellId
                            });
                            myData[i]['wellboreReasonMessage'] = messData ? messData.message ? messData.message : '' : '';
                        }
                        //选中项目不需要测试
                        if (val == t_data.code) { 
                            myData[i].wellboreReason = t_data.name; //默认
                            
                        } else {
                            if (!isNaN(myWellCount[t_data.code])) {
                                t_count = myWellCount[t_data.code];
                            } else {
                                t_count = 0; //初始化
                            }
                            let t_subWells = "," + t_data.wells + ",";
                            if (t_subWells.includes("," + myWellId + ",")) {
                                myData[i].wellboreReason = t_data.name; //默认
                                t_count++; //计数
                            }
                            myWellCount[t_data.code] = t_count; //回写
                        }
                        if(messData&&messData.evalBasisLayers){
                            let key1='wellboreReasonMessage';
                            let evalBasisLayers=messData.evalBasisLayers;//层位数据
                            let children=myData[i].children;
                            if(children.length){
                                for(let a=0;a<evalBasisLayers.length;a++){
                                    let isFindOut=false;//默认没有查到
                                    for(let b=0;b<children.length;b++){
                                        if(evalBasisLayers[a].layerCode == children[b].wellId){
                                            isFindOut=true;
                                            children[b][key1]=evalBasisLayers[a].message;
                                        }   
                                    }
                                    if(!isFindOut){
                                        children.push({
                                            wellId:evalBasisLayers[a].layerCode,
                                            [key1]:evalBasisLayers[a].message,
                                        })
                                    }
                                }
                            }else{
                                evalBasisLayers.forEach((el,i)=>{
                                    children.push({
                                        wellId:el.layerCode,
                                        [key1]:el.message,
                                    })
                                })
                            }
                        }
                    }
                    //地层原因 formationReason
                    for (let j = 0; j < this.formationReason.length; j++) {
                        let t_data = this.formationReason[j]; //每个数据项
                        let messData={};
                        //添加详情信息
                        if (t_data.basis == null) {
                            myData[i]['formationReasonMessage'] = '';
                        } else {
                            messData = t_data.basis.find((item) => {
                                return item.well == myWellId
                            });
                            myData[i]['formationReasonMessage'] = messData ? messData.message ? messData.message : '' : '';
                        }
                        //选中项目不需要测试
                        if (val == t_data.code) { 
                            myData[i].formationReason = t_data.name; //默认
                        } else {
                            if (!isNaN(myWellCount[t_data.code])) {
                                t_count = myWellCount[t_data.code];
                            } else {
                                t_count = 0; //初始化
                            }
                            let t_subWells = "," + t_data.wells + ",";
                            if (t_subWells.includes("," + myWellId + ",")) {
                                myData[i].formationReason = t_data.name; //默认
                                t_count++; //计数
                            }
                            myWellCount[t_data.code] = t_count; //回写
                        }
                        //深化点-点击井号展示井位
                        if(messData&&messData.evalBasisLayers){
                            let key1='formationReasonMessage';
                            let evalBasisLayers=messData.evalBasisLayers;//层位数据
                            let children=myData[i].children;
                            if(children.length){
                                for(let a=0;a<evalBasisLayers.length;a++){
                                    let isFindOut=false;//默认没有查到
                                    for(let b=0;b<children.length;b++){
                                        if(evalBasisLayers[a].layerCode == children[b].wellId){
                                            isFindOut=true;
                                            children[b][key1]=evalBasisLayers[a].message;
                                        }   
                                    }
                                    if(!isFindOut){
                                        children.push({
                                            wellId:evalBasisLayers[a].layerCode,
                                            [key1]:evalBasisLayers[a].message,
                                        })
                                    }
                                }
                            }else{
                                evalBasisLayers.forEach((el,i)=>{
                                    children.push({
                                        wellId:el.layerCode,
                                        [key1]:el.message,
                                    })
                                })
                            }
                        }
                    }
                    //停注恢复 stopInjectionRecovery
                    for (let j = 0; j < this.stopInjectionRecovery.length; j++) {
                        let t_data = this.stopInjectionRecovery[j]; //每个数据项
                        let messData={};
                        //添加详情信息
                        if (t_data.basis == null) {
                            myData[i]['stopInjectionRecoveryMessage'] = '';
                        } else {
                            messData = t_data.basis.find((item) => {
                                return item.well == myWellId
                            });
                            myData[i]['stopInjectionRecoveryMessage'] = messData ? messData.message ? messData.message : '' : '';
                        }
                        if (val == t_data.code) { //选中项目不需要测试
                            myData[i].stopInjectionRecovery = t_data.name; //默认
                        } else {
                            if (!isNaN(myWellCount[t_data.code])) {
                                t_count = myWellCount[t_data.code];
                            } else {
                                t_count = 0; //初始化
                            }
                            let t_subWells = "," + t_data.wells + ",";
                            if (t_subWells.includes("," + myWellId + ",")) {
                                myData[i].stopInjectionRecovery = t_data.name; //默认
                                t_count++; //计数
                            }
                            myWellCount[t_data.code] = t_count; //回写
                        }
                        //深化点-点击井号展示井位
                        if(messData&&messData.evalBasisLayers){
                            let key1='stopInjectionRecoveryMessage';
                            let evalBasisLayers=messData.evalBasisLayers;//层位数据
                            let children=myData[i].children;
                            if(children.length){
                                for(let a=0;a<evalBasisLayers.length;a++){
                                    let isFindOut=false;//默认没有查到
                                    for(let b=0;b<children.length;b++){
                                        if(evalBasisLayers[a].layerCode == children[b].wellId){
                                            isFindOut=true;
                                            children[b][key1]=evalBasisLayers[a].message;
                                        }   
                                    }
                                    if(!isFindOut){
                                        children.push({
                                            wellId:evalBasisLayers[a].layerCode,
                                            [key1]:evalBasisLayers[a].message,
                                        })
                                    }
                                }
                            }else{
                                evalBasisLayers.forEach((el,i)=>{
                                    children.push({
                                        wellId:el.layerCode,
                                        [key1]:el.message,
                                    })
                                })
                            }
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
                //3、根据每个项目的井数遍历检查表头
                //井层指标变化趋势  trendOfIndicators
                this.trendOfIndicatorsTab = [];
                for (let j = 0; j < this.trendOfIndicators.length; j++) {
                    let t_data = this.trendOfIndicators[j];
                    //获得相关井数
                    if (!isNaN(myWellCount[t_data.code])) {
                        t_count = myWellCount[t_data.code];
                    } else {
                        t_count = 0; //初始化
                    }
                    this.trendOfIndicators[j].value = t_count; //登记条数
                    if (t_count > 0) {
                        let titleName = t_data.name;
                        let unit='';
                        if(t_data.unit){
                            unit=t_data.unit.replace('m3', 'm³');
                        }
                        this.trendOfIndicatorsTab.push({
                            code: t_data.code,
                            name: titleName,
                            unit
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
                console.log('myData',myData);
                console.log('trendOfIndicatorsTab',this.trendOfIndicatorsTab)
                this.$nextTick(() => {
                    this.$refs.tableList.doLayout();
                })
            },
            //井层指标变化趋势 || 注入动态---zxb
            async queryTrendOfIndicators() {
                await layerVariationTrend(this.paramMap).then((res) => {
                    let msg = res.data.msg;
                    if (msg == "success") {
                        let myData = res.data.data.indicatorAnalysisDetailInfos;
                        this.trendOfIndicatorsNum.allnum=0;
                        this.trendOfIndicatorsNum.zcnum=0;
                        this.trendOfIndicatorsNum.ycnum=0;
                        myData.forEach((el,i)=>{
                            if(el.wells){
                                let wells=el.wells.split(',');
                                this.collectWells.push(wells);
                            }
                            this.trendOfIndicatorsNum.allnum+=Number(el.value);
                            if(el.name=='正常'){
                                this.trendOfIndicatorsNum.zcnum=Number(el.value);
                            }else{
                                myData[i].isShow=Number(el.value)?true:false;
                                this.trendOfIndicatorsNum.ycnum+=Number(el.value);
                            }
                        })
                        this.trendOfIndicatorsNum.zczb=this.trendOfIndicatorsNum.zcnum/this.trendOfIndicatorsNum.allnum * 100;
                        this.trendOfIndicatorsNum.yczb=this.trendOfIndicatorsNum.yczb/this.trendOfIndicatorsNum.allnum * 100;
                        this.trendOfIndicators = myData;
                    }
                });
            },
            //井层注水工况---zxb
            async queryWorkingCondition() {
                await layerInjectionStatus(this.paramMap).then((res) => {
                    let msg = res.data.msg;
                    if (msg == "success") {
                        let myData = res.data.data.indicatorAnalysisDetailInfos;
                        this.workingCondNum.allnum=0;
                        this.workingCondNum.zcnum=0;
                        this.workingCondNum.ycnum=0;
                        myData.forEach((el,i)=>{
                            if(el.wells){
                                let wells=el.wells.split(',');
                                this.collectWells.push(wells);
                            }
                            this.workingCondNum.allnum+=Number(el.value);
                            if(el.name=='正常'||el.name=='合格区'){
                                this.workingCondNum.zcnum=Number(el.value);
                            }else{
                                myData[i].isShow=Number(el.value)?true:false;
                                this.workingCondNum.ycnum+=Number(el.value);
                            }
                        })
                        this.workingCondNum.zczb=this.workingCondNum.zcnum/this.workingCondNum.allnum * 100;
                        this.workingCondNum.yczb=this.workingCondNum.yczb/this.workingCondNum.allnum * 100;
                        this.workingCondition = myData;
                    }
                });
            },
            //地面原因
            async queryTheGroundBecause() {
                await groundReason(this.paramMap).then((res) => {
                    // debugger
                    let msg = res.data.msg;
                    if (msg == "success") {
                        let myData = res.data.data.indicatorAnalysisDetailInfos;
                        console.log("myData3", myData);
                        this.theGroundBecause = myData;
                    }
                });
            },
            //井筒原因---zxb
            async queryWellboreReason() {
                await wellBoreReason(this.paramMap).then((res) => {
                    let msg = res.data.msg;
                    if (msg == "success") {
                        let myData = res.data.data.indicatorAnalysisDetailInfos;
                        this.wellboreReasonNum.allnum=0;
                        this.wellboreReasonNum.zcnum=0;
                        this.wellboreReasonNum.ycnum=0;
                        myData.forEach((el,i)=>{
                            if(el.wells){
                                let wells=el.wells.split(',');
                                this.collectWells.push(wells);
                            }
                            this.wellboreReasonNum.allnum+=Number(el.value);
                            if(el.name=='正常'){
                                this.wellboreReasonNum.zcnum=Number(el.value);
                            }else{
                                myData[i].isShow=Number(el.value)?true:false;
                                this.wellboreReasonNum.ycnum+=Number(el.value);
                            }
                        })
                        this.wellboreReasonNum.zczb=this.wellboreReasonNum.zcnum/this.wellboreReasonNum.allnum * 100;
                        this.wellboreReasonNum.yczb=this.wellboreReasonNum.yczb/this.wellboreReasonNum.allnum * 100;
                        this.wellboreReason = myData;
                    }
                });
            },
            //地层原因
            async queryFormationReason() {
                await layerReason(this.paramMap).then((res) => {
                    // debugger
                    let msg = res.data.msg;
                    if (msg == "success") {
                        let myData = res.data.data.indicatorAnalysisDetailInfos;
                        console.log("myData5", myData);
                        this.formationReason = myData;
                    }
                });
            },
            //停注恢复
            async queryStopInjectionRecovery() {
                await injectionClosed(this.paramMap).then((res) => {
                     // debugger
                    let msg = res.data.msg;
                    if (msg == "success") {
                        let myData = res.data.data.indicatorAnalysisDetailInfos;
                        console.log("myData6", myData);
                        this.stopInjectionRecovery = myData;
                    }
                });
            },
            //措施推荐可用项目
            async queryRecommendedMeasures() {
                await injectionMeasureRecommend(this.paramMap).then((res) => {
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
            },
            //措施推荐可用项目,获取措施效果数据
            async queryProWellDynamicAnalysisDetail() {
                await injectionWellDynamicAnalysisDetail(this.paramMap).then((res) => {
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
                console.log(val,888,this.selCode,999)
                let myData = []; //我的数据
                let myWellCount = {}; //计算各项目的井数
                let t_count = 0; //计数器
                this.selTag = tag; //选中数据集
                if (val == undefined || val == "") {
                    return false; //无效参数
                }
                if(this.selCode!=val){
                    this.selCode = val; //选中项目
                }else{
                    this.selCode='';
                    this.doSearch();
                    return false;
                }
                //进行运算
                //1、获取选中井集合
                if (this[tag].length) {
                    for (let i = 0; i < this[tag].length; i++) {
                        let tData = this[tag][i];
                        console.log(tData);
                        if (val == tData.code) {
                            if (tData.wells == undefined || tData.wells == "" || tData.wells == "null") { //无数据
                                myData = []; //没有数据
                                this[tag][i].value = 0; //井数
                                myWellCount[tData.code] = 0; //计数器
                            } else { //有数据
                                let wellList = tData.wells.split(","); //我的井号串（逗号分割）
                                this[tag][i].value = wellList.length; //井数
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
                
                //3、根据每个项目的井数遍历检查表头
                //井层指标变化趋势  trendOfIndicators
                this.trendOfIndicatorsTab = [];
                for (let j = 0; j < this.trendOfIndicators.length; j++) {
                    let t_data = this.trendOfIndicators[j];
                    //获得相关井数
                    if (!isNaN(myWellCount[t_data.code])) {
                        t_count = myWellCount[t_data.code];
                    } else {
                        t_count = 0; //初始化
                    }
                    this.trendOfIndicators[j].value = t_count; //登记条数
                    if (t_count > 0) {
                        let titleName = t_data.name;
                        let unit='';
                        if(t_data.unit){
                            unit=t_data.unit.replace('m3', 'm³');
                        }
                        this.trendOfIndicatorsTab.push({
                            code: t_data.code,
                            name: titleName,
                            unit
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
                console.log('myData',myData);
                console.log('trendOfIndicatorsTab',this.trendOfIndicatorsTab)
                this.$nextTick(() => {
                    this.$refs.tableList.doLayout();
                })
                //zxb-重新计算数量
                let numKeys=['trendOfIndicatorsNum','wellboreReasonNum','workingCondNum'];
                let datakeys=['trendOfIndicators','wellboreReason','workingCondition'];
                for(let i=0;i<numKeys.length;i++){
                    let numKey=numKeys[i];
                    let dataKey=datakeys[i];
                    this[numKey].allnum=0;
                    this[numKey].zcnum=0;
                    this[numKey].ycnum=0;
                    this[dataKey].forEach((el,i)=>{
                        this[numKey].allnum+=Number(this[dataKey][i].value);
                        if(el.name=='正常'||el.name=='合格区'){
                            this[numKey].zcnum=Number(this[dataKey][i].value);
                        }else{
                            this[numKey].ycnum+=Number(this[dataKey][i].value);
                        }
                    })
                    this[numKey].zczb=this[numKey].zcnum/this[numKey].allnum * 100;
                    this[numKey].yczb=this[numKey].yczb/this[numKey].allnum * 100;
                }
                //zxb-重新计算推荐井组
                this.potentialWellNum=0;
                for(let i=0;i<this.recommendedMeasuresOptions.length;i++){
                    let el=this.recommendedMeasuresOptions[i];
                    this.potentialWellNum+=Number(el.value);
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
                    z-index: 3;
                    .bgline1{
                        width: 358px;
                        height: 43px;
                        position: absolute;
                        left: 180px;
                        top: 30px;
                        z-index: -1;
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
                    z-index: 2;
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
                                        padding-left:30px;
                                        font-size: 16px;
                                        // color: #FFFFFF;
                                        text-align: center;
                                        font-weight: 600;
                                        z-index: 1;
                                    }
                                    &::before{
                                        content:'';
                                        background-image: linear-gradient(137deg, rgba(141,205,251,0.00) 0%, rgba(54,151,222,0.41) 30%, rgba(17,110,177,0.54) 67%, rgba(2,95,161,0.20) 88%, rgba(148,210,253,0.00) 100%);
                                        width:130px;
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
                                        padding-left:30px;
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
                                            cursor: pointer;
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
                                        cursor: pointer;
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
                                    cursor: pointer;
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
                                .numBtnBgActive{
                                        background: var(--logo-bg) no-repeat top / contain, var(--primary-btn) !important;
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
                                        cursor: pointer;
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

    .z-button{
        width: 100%;
        height: 28px;
        font-size:14px;
        text-align: center;
        border-color: var(--light-blue-color);
        color: var(--white-color);
        transition: all 0s;
        height: 34px;
        line-height: 8px;
        border-radius: 0 !important;
        background: rgba(143, 164, 204, 0.3);
        background-size: 100% 100% !important;
        &:hover{
            border-image: var(--primary-btn);
            border-color: var(--light-blue-color);
            background: var(--primary-btn) !important;
        }
    }
    .selectButton{
        border-image: var(--primary-btn);
        border-color: var(--light-blue-color);
        background: var(--primary-btn) !important;
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
    ::v-deep .table_header .twoRowHeader{
        display: flex!important;
        justify-content: center;
    }
</style>
