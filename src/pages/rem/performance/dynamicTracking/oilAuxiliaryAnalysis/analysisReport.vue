<!-- 油井动态分析报告 -->
<template>
    <div style="display: flex; flex-direction: row; height: calc(100%)">
        <div style="height: 100%">
        <treeSelectionCustom
            ref="treeSelectionCustom"
            level="5"
            :treeType="1"
            :defaultCheckedKeys="defaultCheckedKeys"
            @getSelectItems="getSelectItems"
        />
        </div>
        <div
        class="z_app_container"
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
            <!-- 旧版本 -->
            <div class="app-container" v-if="!isNewformat">
                <headerSearch style="height:80px;">
                    <div class="g-row-flex-V g-w100 g-h100">
                        <span>油田：</span>
                        <el-select v-model="selYtdm" class="f2" style="width:180px" filterable clearable disabled @change="getFieldsData">
                            <el-option v-for="item in ytData" :key="item.oilFieldId" :label="item.name" :value="item.oilFieldId" :disabled="item.disabled">
                            </el-option>
                        </el-select>
                        
                        <span style="margin-left:15px;">区块：</span>
                        <el-select v-model="selectBlock" style="width: 180px" filterable @change="changeBlock">
                            <el-option v-for="item in blocks" :key="item.fieldId" :label="item.name" :value="item.fieldId"></el-option>
                        </el-select>
                        
                        <span style="margin-left:15px;">平台：</span>
                        <el-select v-model="platform" class="f2" style="width:220px" filterable @change="changePlatform">
                            <el-option v-for="item in ptData" :key="item.platFormId" :label="item.platName" :value="item.platFormId" :disabled="item.disabled">
                            </el-option>
                        </el-select>
                        :
                        <span style="margin-left:15px;">井号：</span>
                        <el-select v-model="wellId" class="f2" style="width:180px" filterable clearable @change="changeWell">
                            <el-option v-for="item in wellData" :key="item.wellId" :label="item.wellName" :value="item.wellId" :disabled="item.disabled">
                            </el-option>
                        </el-select>
                        
                        <span style="margin-left:15px;">评价时间：</span>
                        <el-date-picker v-model="currentDate" type="date" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
                        <el-button icon="el-icon-search" type="primary" style="margin-left: 20px" @click="doSearch">搜索</el-button>
                        <el-button class="commonBtn" icon="el-icon-refresh" @click="resetting">重置</el-button>
                        <el-button  class="commonBtn"  v-if="$route.query.page" style="position: absolute;right:2%" @click="$router.push({
                            path:$route.query.page
                        })">返回</el-button>
                    </div>
                </headerSearch>
                <pagePanelNew style="height: calc(100% - 100px);" class="g-w100">
                    <div class="btns" style="height:50px;display: flex;padding-left:7px;">
                        <el-button type="primary" @click="$router.push({path:'/modelConfiguration/modelconfig'})">模型配置</el-button>
                        <el-button type="primary" @click="isNewformat=!isNewformat;">切换版式</el-button>
                    </div>
                    <div style="height:calc(100% - 50px);overflow-y: scroll;overflow-x: hidden;padding-left:8px;padding-right:7px;display: flex;flex-direction: column;">
                        <el-row style="height: auto" :gutter="15" class="cont">
                            <el-col :span="6" style="height: auto">
                                <pagePanel headerTitle="生产动态" style="margin-top:0;height:100%;">
                                    <el-row :gutter="10">
                                        <el-col v-for="(item,index) in productionTrendsOptions" :key="index" :span="12">
                                            <el-button class="z-button"  :class="[item.value>0?'about1':'',item.code==selCode?'selectButton':'']" @click.stop="selRadioIterm(item.code,'productionTrendsOptions')">
                                                {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                            </el-button>
                                        </el-col>
                                    </el-row>
                                </pagePanel>
                            </el-col>
                            <el-col :span="18" style="height: auto">
                                <pagePanel headerTitle="生产问题监测" style="margin-top:0;height:100%;">
                                    <el-row :gutter="5">
                                        <el-col :span="8">
                                            <el-button class="commonBtn" style="width:100%;cursor: inherit;margin-bottom:10px;">油井工况</el-button>
                                            <el-col v-for="(item,index) in oilWellConditionOptions" :key="index" :span="12">
                                                <el-button class="z-button"  :class="[item.value>0?'about1':'',item.code==selCode?'selectButton':'']" @click.stop="selRadioIterm(item.code,'oilWellConditionOptions')">
                                                    {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                                </el-button>
                                            </el-col>
                                        </el-col>
                                        <el-col :span="3">
                                            <el-button class="commonBtn" style="width:100%;cursor: inherit;margin-bottom:10px;">供排关系</el-button>
                                            <el-col v-for="(item,index) in relationshipOptions" :key="index" :span="24">
                                                <el-button class="z-button"  :class="[item.value>0?'about1':'',item.code==selCode?'selectButton':'']" @click.stop="selRadioIterm(item.code,'relationshipOptions')">
                                                    {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                                </el-button>
                                            </el-col>
                                        </el-col>
                                        <el-col :span="3">
                                            <el-button class="commonBtn" style="width:100%;cursor: inherit;margin-bottom:10px;">递减率</el-button>
                                            <el-col v-for="(item,index) in diminishingOptions" :key="index" :span="24">
                                                <el-button class="z-button"  :class="[item.value>0?'about1':'',item.code==selCode?'selectButton':'']" @click.stop="selRadioIterm(item.code,'diminishingOptions')">
                                                    {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                                </el-button>
                                            </el-col>
                                        </el-col>
                                        <el-col :span="3">
                                            <el-button class="commonBtn" style="width:100%;cursor: inherit;margin-bottom:10px;">采液强度</el-button>
                                            <el-col v-for="(item,index) in fluidStrengthOptions" :key="index" :span="24">
                                                <el-button class="z-button"  :class="[item.value>0?'about1':'',item.code==selCode?'selectButton':'']" @click.stop="selRadioIterm(item.code,'fluidStrengthOptions')">
                                                    {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                                </el-button>
                                            </el-col>
                                        </el-col>
                                        <el-col :span="3">
                                            <el-button class="commonBtn" style="width:100%;cursor: inherit;margin-bottom:10px;">采液指数</el-button>
                                            <el-col v-for="(item,index) in fluidProductionOptions" :key="index" :span="24">
                                                <el-button class="z-button"  :class="[item.value>0?'about1':'',item.code==selCode?'selectButton':'']" @click.stop="selRadioIterm(item.code,'fluidProductionOptions')">
                                                    {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                                </el-button>
                                            </el-col>
                                        </el-col>
                                        <el-col :span="4">
                                            <el-button class="commonBtn" style="width:100%;cursor: inherit;margin-bottom:10px;">米采液指数</el-button>
                                            <el-col v-for="(item,index) in mfluidProductionOptions" :key="index" :span="24">
                                                <el-button class="z-button"  :class="[item.value>0?'about1':'',item.code==selCode?'selectButton':'']" @click.stop="selRadioIterm(item.code,'mfluidProductionOptions')">
                                                    {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                                </el-button>
                                            </el-col>
                                        </el-col>
                                    </el-row>
                                </pagePanel>
                            </el-col>
                        </el-row>
                        <el-row style="height: auto" :gutter="15" class="cont mt-5">
                            <el-col :span="12">
                                <pagePanel headerTitle="潜力分析" style="margin-top:0;height:100%;">
                                    <el-row :gutter="10">
                                        <el-col :span="12">
                                            <el-button class="commonBtn" style="width:100%;cursor: inherit;margin-bottom:10px;">提液潜力</el-button>
                                            <el-col v-for="(item,index) in extractionPotentialOptions" :key="index" :span="12">
                                                <el-button class="z-button"  :class="[item.value>0?'about1':'',item.code==selCode?'selectButton':'']" @click.stop="selRadioIterm(item.code,'extractionPotentialOptions')">
                                                    {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                                </el-button>
                                            </el-col>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-button class="commonBtn" style="width:100%;cursor: inherit;margin-bottom:10px;">储量动用</el-button>
                                            <el-col v-for="(item,index) in reserveProductionOptions" :key="index" :span="12">
                                                <el-button class="z-button"  :class="[item.value>0?'about1':'',item.code==selCode?'selectButton':'']" @click.stop="selRadioIterm(item.code,'reserveProductionOptions')">
                                                    {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                                </el-button>
                                            </el-col>
                                        </el-col>
                                    </el-row>
                                </pagePanel>
                            </el-col>
                            <el-col :span="12">
                                <pagePanel headerTitle="措施推荐" style="margin-top:0;height:100%;">
                                    <el-row :gutter="10" style="height: 100%">
                                        <el-col v-for="(item,index) in recommendedMeasuresOptions" :key="index" :span="12">
                                            <el-button class="z-button"  :class="[item.value>0?'about1':'',item.code==selCode?'selectButton':'']" @click.stop="selRadioIterm(item.code,'recommendedMeasuresOptions')">
                                                {{ item.name + (item.value > 0 ? '(' + item.value + ')' : '(0)') }}
                                            </el-button>
                                        </el-col>
                                    </el-row>
                                </pagePanel>
                            </el-col>
                        </el-row>
                        <div style="margin-top:5px;margin-bottom:10px;">
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
                        <div style="display: flex;justify-content: flex-end;margin-bottom:10px;">
                            <el-button type="primary" style="margin-left: 20px" v-if="selCode&&(selCode=='0050102'||selCode=='0050101' || selCode=='0060101' || selCode=='0060102'|| selCode=='0070101'|| selCode=='0070102')"
                            @click="$router.push({path:'attributtonAnalysis',query:{platform,wellId,currentDate,'link':linkdata(),evalResult:selCode }})">
                            归因分析详情
                            </el-button>
                            <el-button type="primary" style="margin-left: 20px" v-if="selCode&&(selCode=='0100101'||selCode=='0100102' || selCode=='0100103' || selCode=='0100106'|| selCode=='0100110'|| selCode=='0100111'|| selCode=='0100112'|| selCode=='0100114')" 
                            @click="$router.push({name:'planmessage',query:{platform,wellId,currentDate,measureCode:selCode}})">措施推荐详情</el-button>
                        </div>
                        <div style="flex:1;min-height:600px;">
                            <pagePanel headerTitle="油井动态分析详情列表" style="margin-top:0;height:100%;">
                                <div style="display: flex; justify-content: flex-end;">
                                    <el-button icon="el-icon-download" type="primary" style="margin-bottom: 20px;" @click="doDownExcel('#table1', '油井动态分析详情列表')">下载</el-button>
                                </div>
                                <el-table id="table1" highlight :data="tableData" height="calc(100% - 55px)" @sort-change="changeTableSort" ref="tableList" class="doubleHeader">
                                    <el-table-column type="index" label="序号" align="center" width="80px" fixed="left"></el-table-column>
                                    <el-table-column prop="wellName" label="井号" align="center" width="180px" :sortable="true" :sort-method="borepipeNoSort" fixed="left"></el-table-column>
                                    <!--生产动态项目-->
                                    <el-table-column v-for="(item, index) in productionTrendsTab" :key="item.code" :prop="item.code" align="center" min-width="160" sortable="custom" label-class-name="twoRowHeader">
                                        
                                        <template #header>
                                            <div class="headerSortRow1" v-if="item.name && item.name!='正常' && item.name.split(' ')[1]">
                                                <span>{{ item.name.split(' ')[0] ? item.name.split(' ')[0] : ""}}</span>
                                                <br />
                                                <span>{{ item.name.split(' ')[1] ? `(${item.name.split(' ')[1]})` : ""}}</span>
                                            </div>
                                            <div v-else>
                                                <span>{{item.name=='正常'?'生产状态':item.name}}</span>
                                            </div>
                                        </template>
                                        
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.scdt[item.code] == null">{{productionStatus(scope.row.scdt,item.code)}}</span>
                                            <span v-else-if="item.code == 'ZC'">{{ scope.row.scdt[item.code].showLabel ? scope.row.scdt[item.code].showLabel :'-' }}</span>
                                            <el-tooltip v-else class="item" effect="dark" :content="scope.row.scdt[item.code].value + ''" placement="top">
                                                <span>{{ scope.row.scdt[item.code].showLabel ? scope.row.scdt[item.code].showLabel :'-' }}</span>
                                            </el-tooltip>
                                        </template>
                                        
                                    </el-table-column>
                                    <!--生产问题监测项目-->
                                    <el-table-column prop="problemMonitoring" label="生产问题监测" align="center">
                                        <el-table-column v-for="(item, index) in problemMonitoringTab" min-width="120" :key="index" :prop="item.code" :label="item.name" align="center" width="180px" label-class-name="twoRowHeader">
                                            <template #header>
                                                <div v-if="item.isTwoHeader">
                                                    <span>{{item.name}}</span>
                                                    <br />
                                                    <span>{{item.unit}}</span>
                                                </div>
                                                <div v-else>
                                                    <span>{{item.name}}</span>
                                                </div>
                                            </template>
                                            <template slot-scope="scope">
                                                <span class="1" v-if="scope.row[item.code] == null"></span>
                                                <span class="2" v-else-if="item.code == 'yjgk' || item.code == 'gpgx'">{{ scope.row[item.code].showLabel?scope.row[item.code].showLabel:'-' }}</span>
                                                <span class="3" v-else style="display: flex;align-items: center;justify-content: center;">
                                                {{replaceStr(scope.row[item.code].showLabel)}}
                                                {{scope.row[item.code].value?parseFloat(scope.row[item.code].value).toFixed(2): !replaceStr(scope.row[item.code].showLabel)?'-':''}}
                                                    <img src="@/assets/rem/yieId/upTriangle.png" v-if="replaceStr(scope.row[item.code].showLabel)=='偏高'" style="width:20px;height:20px;">
                                                    <img src="@/assets/rem/yieId/downTriangle.png" v-if="replaceStr(scope.row[item.code].showLabel)=='偏低'"  style="width:20px;height:20px;">
                                                </span>
                                            </template>
                                        </el-table-column>
                                    </el-table-column>
                                    <!--潜力分析-->
                                    <el-table-column prop="potentialAnalysis" label="潜力分析" align="center">
                                        <el-table-column v-for="(item, index) in potentialAnalysisTab" :key="index" :prop="item.code" :label="item.name" align="center">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row[item.code] == null"></span>
                                                <span>{{ scope.row[item.code].showLabel?scope.row[item.code].showLabel:'-' }}</span>
                                            </template>
                                        </el-table-column>
                                    </el-table-column>
                                    <!--措施初选-->
                                    <el-table-column prop="recommendedMeasures" label="措施初选" align="center">
                                        <el-table-column prop="measuresName" label="推荐措施" align="center">
                                            <template slot-scope="scope">
                                                <!-- <span v-if="scope.row.cscx != null">{{ scope.row.cscx.showLabel ? scope.row.cscx.showLabel  :'-' }}</span> -->
                                                <span v-if="scope.row.cscx != null">{{ preliminarySelectioMeasures(scope.row.wellId,1) }}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="theDate" align="center"  min-width="130" label-class-name="twoRowHeader">
                                            <template #header>
                                                <div>
                                                    <span>推荐日期</span>
                                                    <br />
                                                    <span>(yyyy/mm/dd)</span>
                                                </div>
                                            </template>
                                            <template slot-scope="scope">
                                                <!-- <span v-if="scope.row.cscx != null">{{ scope.row.cscx.tjrq ? scope.row.cscx.tjrq :'-'}}</span> -->
                                                <span v-if="scope.row.cscx != null">{{ preliminarySelectioMeasures(scope.row.wellId,2) }}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="操作" align="center">
                                            <template slot-scope="scope">
                                                <el-button type="text" @click="openAnalysis(scope.row.wellId)">分析</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table-column>
                                    <!--日增油量-->
                                    <el-table-column prop="dailyOilIncrement" align="center" label-class-name="twoRowHeader">
                                        <template #header>
                                            <div>
                                                <span>日增油量</span>
                                                <br />
                                                <span>(m³/d)</span>
                                            </div>
                                        </template>
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.rzyl == null || scope.row.rzyl.showMvalue == null">-</span>
                                            <span v-else>{{ scope.row.rzyl.showMvalue ? scope.row.rzyl.showMvalue : '-'}}</span>
                                        </template>
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
                            <el-option v-for="item in ytData" :key="item.oilFieldId" :label="item.name" :value="item.oilFieldId" :disabled="item.disabled">
                            </el-option>
                        </el-select>
                        
                        <span style="margin-left:15px;">区块：</span>
                        <el-select v-model="selectBlock" style="width: 180px" filterable  @change="changeBlock">
                            <el-option v-for="item in blocks" :key="item.fieldId" :label="item.name" :value="item.fieldId"></el-option>
                        </el-select>
                        
                        <span style="margin-left:15px;">平台：</span>
                        <el-select v-model="platform" class="f2" style="width:220px" filterable @change="changePlatform">
                            <el-option v-for="item in ptData" :key="item.platFormId" :label="item.platName" :value="item.platFormId" :disabled="item.disabled">
                            </el-option>
                        </el-select>
                        
                        <span style="margin-left:15px;">井号：</span>
                        <el-select v-model="wellId" class="f2" style="width:180px" filterable clearable @change="changeWell">
                            <el-option v-for="item in wellData" :key="item.wellId" :label="item.wellName" :value="item.wellId" :disabled="item.disabled">
                            </el-option>
                        </el-select>
                        
                        <span style="margin-left:15px;">评价时间：</span>
                        <el-date-picker v-model="currentDate" type="date" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
                        <el-button icon="el-icon-search" type="primary" style="margin-left: 20px" @click="doSearch">搜索</el-button>
                        <el-button class="commonBtn" icon="el-icon-refresh" @click="resetting">重置</el-button>
                        <el-button  class="commonBtn"  v-if="$route.query.page" style="position: absolute;right:2%" @click="$router.push({
                            path:$route.query.page
                        })">返回</el-button>
                    </div>
                </headerSearch>
                <div class="app-container3">
                    <div class="leftBox">
                        <img src="@/assets/rem/performance/bg.gif" alt="" class="img1">
                        <img src="@/assets/rem/performance/jing-small.png" alt="" class="img2">
                        <img src="@/assets/rem/performance/shui-donghua.gif" alt="" class="img3">
                        <img src="@/assets/rem/performance/di.png" alt="" class="img4">
                        <img src="@/assets/rem/performance/01cai.gif" alt="" class="img5">
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
                        <div class="v2" style="height:206px;">
                            <pagePanel header-title="生产动态监测" style="height: 100%;">
                                <div class="z-content" style="height:calc(100%);overflow-y: scroll;">
                                    <div class="z-content-n">
                                        <div class="z-row-left">
                                            <div class="z_title">
                                                <img src="@/assets/rem/performance/z_sb.png" alt="">
                                                <span>生产动态</span>
                                            </div>
                                            <div class="z_schedule">
                                                <span class="sp1">正常：</span>
                                                <div class="z_proess">
                                                    <span class="z_proess_sp1" :style="{width:productionNum.zczb+'%'}">
                                                        <b style="cursor: pointer;" @click="productionSwitch=true">{{productionNum.zcnum}}</b>
                                                    </span>
                                                    <span class="z_proess_sp2"></span>
                                                </div>
                                                <span class="sp2">异常：<b style="cursor: pointer;" @click="productionSwitch=false">{{productionNum.ycnum}}</b></span>
                                            </div>
                                        </div>  
                                        <div class="z-row-center">
                                            <div class="numBtn" :class="[item.code==selCode?'numBtnBgActive':'']"
                                            v-for="(item,index) in productionTrendsOptions" :key="index" v-if="item.name!='正常'&&(item.value!=0||item.isShow)&&!productionSwitch" 
                                            @click="((val)=>{selRadioIterm(item.code,'productionTrendsOptions')})">
                                                <span class="sp1">{{item.value}}</span>
                                                <span class="sp2">{{item.name}}</span>
                                            </div>
                                            <div class="numBtn" :class="[item.code==selCode?'numBtnBgActive':'']"
                                            v-for="(item,index) in productionTrendsOptions" :key="index" v-if="item.name=='正常'&&productionSwitch"
                                            @click="((val)=>{selRadioIterm(item.code,'productionTrendsOptions')})">
                                                <span class="sp1">{{item.value}}</span>
                                                <span class="sp2">{{item.name}}</span>
                                            </div>
                                        </div>
                                        <div class="z-row-right">
                                            <div class="name">措施推荐</div>
                                            <div class="num">
                                                <span 
                                                    :class="[item.code==selCode?'spActive':'']"
                                                    v-for="(item,index) in recommendedMeasuresOptions" :key="index" v-if="item.name=='地面调参'" 
                                                    @click="selRadioIterm(item.code,'recommendedMeasuresOptions',item)">
                                                {{ item.name + (item.increase > 0 ? '/' + item.increase + 't' : '')  }}：<span style="color: #FFC835; font-size: 14px;">{{ (item.value > 0 ? item.value : '0') }}</span>
                                                </span>
                                            </div>
                                            <div style="width: 250px;display: flex;justify-content: flex-end;margin-top: 40px;padding-right: 26px">
                                                <el-button type="primary" style="margin-left: 20px" v-if="selCode&&(selCode== '0100111')"
                                                           @click="$router.push({name:'planmessage',query:{platform,wellId,currentDate,page:'oilAnalysisReport',measureCode:selCode}})">措施推荐详情</el-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </pagePanel>
                        </div>
                        <div class="v2 v3" style="height: 234px;">
                            <img src="@/assets/rem/performance/bgline0.png" alt="" class="bgline0">
                            <pagePanel header-title="油井工况诊断" style="height: 100%;">
                                <div class="z-content2" style="height:100%;overflow-y: scroll;">
                                    <div class="z1" style="flex:1;">
                                        <div class="z-content-n" style="flex-direction: column;">
                                            <div class="z-row-left">
                                                <div class="z_title">
                                                    <img src="@/assets/rem/performance/z_sb.png" alt="">
                                                    <span>油井工况</span>
                                                </div>
                                                <div class="z_schedule">
                                                    <span class="sp1">正常：</span>
                                                    <div class="z_proess">
                                                        <span class="z_proess_sp1" :style="{width:oilWellConditionNum.zczb+'%'}">
                                                            <b style="cursor: pointer;" @click="oilWellConditionSwitch=true">{{oilWellConditionNum.zcnum}}</b>
                                                        </span>
                                                        <span class="z_proess_sp2"></span>
                                                    </div>
                                                    <span class="sp2">异常：<b style="cursor: pointer;" @click="oilWellConditionSwitch=false">{{oilWellConditionNum.ycnum}}</b></span>
                                                </div>
                                            </div>  
                                            <div class="z-row-center">
                                                <div class="numBtn" :class="[item.code==selCode?'numBtnBgActive':'']"
                                                    v-for="(item,index) in oilWellConditionOptions" :key="index" v-if="item.name!='正常'&&(item.value!=0||item.isShow)&&!oilWellConditionSwitch"
                                                    @click="((val)=>{selRadioIterm(item.code,'oilWellConditionOptions')})">
                                                    <span class="sp1">{{item.value}}</span>
                                                    <span class="sp2">{{item.name}}</span>
                                                </div>
                                                <div class="numBtn" :class="[item.code==selCode?'numBtnBgActive':'']"
                                                    v-for="(item,index) in oilWellConditionOptions" :key="index" v-if="item.name=='正常'&&oilWellConditionSwitch"
                                                    @click="((val)=>{selRadioIterm(item.code,'oilWellConditionOptions')})">
                                                    <span class="sp1">{{item.value}}</span>
                                                    <span class="sp2">{{item.name}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="z2" style="flex:1;">
                                        <div class="z-content-n" style="flex-direction: column;">
                                            <div class="z-row-left">
                                                <div class="z_title">
                                                    <img src="@/assets/rem/performance/z_sb.png" alt="">
                                                    <span>供排关系</span>
                                                </div>
                                                <div class="z_schedule">
                                                    <span class="sp1">正常：</span>
                                                    <div class="z_proess">
                                                        <span class="z_proess_sp1" :style="{width:relationshipNum.zczb+'%'}">
                                                            <b style="cursor: pointer;" @click="relationshipSwitch=true">{{relationshipNum.zcnum}}</b>
                                                        </span>
                                                        <span class="z_proess_sp2"></span>
                                                    </div>
                                                    <span class="sp2">异常：<b style="cursor: pointer;" @click="relationshipSwitch=false">{{relationshipNum.ycnum}}</b></span>
                                                </div>
                                            </div>  
                                            <div class="z-row-center">
                                                <div class="numBtn" :class="[item.code==selCode?'numBtnBgActive':'']"
                                                    v-for="(item,index) in relationshipOptions" :key="index" v-if="item.name!='正常'&&item.name!='合理区'&&(item.value!=0||item.isShow)&&!relationshipSwitch"
                                                    @click="((val)=>{selRadioIterm(item.code,'relationshipOptions')})">
                                                    <span class="sp1">{{item.value}}</span>
                                                    <span class="sp2">{{item.name}}</span>
                                                </div>
                                                <div class="numBtn" :class="[item.code==selCode?'numBtnBgActive':'']"
                                                    v-for="(item,index) in relationshipOptions" :key="index" v-if="(item.name=='正常'||item.name=='合理区')&&relationshipSwitch"
                                                    @click="((val)=>{selRadioIterm(item.code,'relationshipOptions')})">
                                                    <span class="sp1">{{item.value}}</span>
                                                    <span class="sp2">{{item.name}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="z3">
                                        <div class="z-row-right" style="position: relative;top: 16px;height:96px;">
                                            <div class="name">措施推荐</div>
                                            <div class="num">
                                                <span 
                                                :class="[item.code==selCode?'spActive':'']"
                                                v-for="(item,index) in recommendedMeasuresOptions" :key="index" v-if="item.name=='换大泵'||item.name=='加深泵挂'"
                                                @click="selRadioIterm(item.code,'recommendedMeasuresOptions')">
                                                {{ item.name + (item.increase > 0 ? '/' + item.increase + 't' : '') }}：<span style="color: #FFC835; font-size: 14px;">{{ (item.value > 0 ? item.value : '0') }}</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div style="width: 250px;display: flex;justify-content: flex-end;margin-top: 30px;">
                                            <el-button type="primary" style="margin-left: 20px" v-if="selCode&&(selCode==hdbSelCode ||selCode== '0100112')"
                                            @click="$router.push({name:'planmessage',query:{platform,wellId,currentDate,page:'oilAnalysisReport',measureCode:selCode}})">措施推荐详情</el-button>
                                        </div>
                                    </div>
                                </div>
                            </pagePanel>
                        </div>
                        <div class="v2 v3">
                            <img src="@/assets/rem/performance/bgline2.png" alt="" class="bgline2">
                            <pagePanel header-title="油藏潜力分析"  style="height: 100%;">
                                <div style="height:100%;overflow-y: scroll;">
                                    <div class="z-content2">
                                        <div style="flex:1;">
                                            <div class="aaa" style="flex:1;display: flex;">
                                                <div class="z1" style="width:100%;">
                                                    <div class="z-content-n" style="flex-direction: column;">
                                                        <div class="z-row-left">
                                                            <div class="z_title">
                                                                <img src="@/assets/rem/performance/z_sb.png" alt="">
                                                                <span>递减率</span>
                                                            </div>
                                                            <div class="z_schedule">
                                                                <span class="sp1">正常：</span>
                                                                <div class="z_proess">
                                                                    <span class="z_proess_sp1" :style="{width:diminishingNum.zczb+'%'}">
                                                                        <b style="cursor: pointer;" @click="diminishingSwitch=true">{{diminishingNum.zcnum}}</b>
                                                                    </span>
                                                                    <span class="z_proess_sp2"></span>
                                                                </div>
                                                                <span class="sp2">异常：<b style="cursor: pointer;" @click="diminishingSwitch=false">{{diminishingNum.ycnum}}</b></span>
                                                            </div>
                                                        </div>  
                                                        <div class="z-row-center">
                                                            <div class="numBtn" :class="[item.code==selCode?'numBtnBgActive':'']"
                                                                v-for="(item,index) in diminishingOptions" :key="index" v-if="item.name!='正常'&&(item.value!=0||item.isShow)&&!diminishingSwitch"
                                                                @click="((val)=>{selRadioIterm(item.code,'diminishingOptions')})">
                                                                <span class="sp1">{{item.value}}</span>
                                                                <span class="sp2">{{item.name}}</span>
                                                            </div>
                                                            <div class="numBtn" :class="[item.code==selCode?'numBtnBgActive':'']"
                                                                v-for="(item,index) in diminishingOptions" :key="index" v-if="item.name=='正常'&&diminishingSwitch"
                                                                @click="((val)=>{selRadioIterm(item.code,'diminishingOptions')})">
                                                                <span class="sp1">{{item.value}}</span>
                                                                <span class="sp2">{{item.name}}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="z2" style="width:100%;">
                                                    <div class="z-content-n" style="flex-direction: column;">
                                                        <div class="z-row-left">
                                                            <div class="z_title">
                                                                <img src="@/assets/rem/performance/z_sb.png" alt="">
                                                                <span>采液强度</span>
                                                            </div>
                                                            <div class="z_schedule">
                                                                <span class="sp1">正常：</span>
                                                                <div class="z_proess">
                                                                    <span class="z_proess_sp1" :style="{width:fluidStrengthNum.zczb+'%'}">
                                                                        <b style="cursor: pointer;" @click="fluidStrengthSwitch=true">{{fluidStrengthNum.zcnum}}</b>
                                                                    </span>
                                                                    <span class="z_proess_sp2"></span>
                                                                </div>
                                                                <span class="sp2">异常：<b style="cursor: pointer;" @click="fluidStrengthSwitch=false">{{fluidStrengthNum.ycnum}}</b></span>
                                                            </div>
                                                        </div>  
                                                        <div class="z-row-center">
                                                            <div class="numBtn" :class="[item.code==selCode?'numBtnBgActive':'']"
                                                                v-for="(item,index) in fluidStrengthOptions" :key="index" v-if="item.name!='正常'&&(item.value!=0||item.isShow)  &&!fluidStrengthSwitch"
                                                                @click="((val)=>{selRadioIterm(item.code,'fluidStrengthOptions')})">
                                                                <span class="sp1">{{item.value}}</span>
                                                                <span class="sp2">{{item.name}}</span>
                                                            </div>
                                                            <div class="numBtn" :class="[item.code==selCode?'numBtnBgActive':'']"
                                                                v-for="(item,index) in fluidStrengthOptions" :key="index" v-if="item.name=='正常'&&fluidStrengthSwitch"
                                                                @click="((val)=>{selRadioIterm(item.code,'fluidStrengthOptions')})">
                                                                <span class="sp1">{{item.value}}</span>
                                                                <span class="sp2">{{item.name}}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="aaa" style="flex:1;display: flex;">
                                                <div class="z1" style="width:100%;">
                                                    <div class="z-content-n" style="flex-direction: column;">
                                                        <div class="z-row-left">
                                                            <div class="z_title">
                                                                <img src="@/assets/rem/performance/z_sb.png" alt="">
                                                                <span>采液指数</span>
                                                            </div>
                                                            <div class="z_schedule">
                                                                <span class="sp1">正常：</span>
                                                                <div class="z_proess">
                                                                    <span class="z_proess_sp1" :style="{width:fluidProductionNum.zczb+'%'}">
                                                                        <b style="cursor: pointer;" @click="fluidProductionSwitch=true">{{fluidProductionNum.zcnum}}</b>
                                                                    </span>
                                                                    <span class="z_proess_sp2"></span>
                                                                </div>
                                                                <span class="sp2">异常：<b style="cursor: pointer;" @click="fluidProductionSwitch=false">{{fluidProductionNum.ycnum}}</b></span>
                                                            </div>
                                                        </div>  
                                                        <div class="z-row-center">
                                                            <div class="numBtn"  :class="[item.code==selCode?'numBtnBgActive':'']"
                                                                v-for="(item,index) in fluidProductionOptions" :key="index" v-if="item.name!='正常'&&(item.value!=0||item.isShow)&&!fluidProductionSwitch"
                                                                @click="((val)=>{selRadioIterm(item.code,'fluidProductionOptions')})">
                                                                <span class="sp1">{{item.value}}</span>
                                                                <span class="sp2">{{item.name}}</span>
                                                            </div>
                                                            <div class="numBtn" :class="[item.code==selCode?'numBtnBgActive':'']"
                                                                v-for="(item,index) in fluidProductionOptions" :key="index" v-if="item.name=='正常'&&fluidProductionSwitch"
                                                                @click="((val)=>{selRadioIterm(item.code,'fluidProductionOptions')})">
                                                                <span class="sp1">{{item.value}}</span>
                                                                <span class="sp2">{{item.name}}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="z2" style="width:100%;">
                                                    <div class="z-content-n" style="flex-direction: column;">
                                                        <div class="z-row-left">
                                                            <div class="z_title">
                                                                <img src="@/assets/rem/performance/z_sb.png" alt="">
                                                                <span>米采液指数</span>
                                                            </div>
                                                            <div class="z_schedule">
                                                                <span class="sp1">正常：</span>
                                                                <div class="z_proess">
                                                                    <span class="z_proess_sp1" :style="{width:mfluidProductionNum.zczb+'%'}">
                                                                        <b style="cursor: pointer;" @click="mfluidProductionSwitch=true">{{mfluidProductionNum.zcnum}}</b>
                                                                    </span>
                                                                    <span class="z_proess_sp2"></span>
                                                                </div>
                                                                <span class="sp2">异常：<b style="cursor: pointer;" @click="mfluidProductionSwitch=false">{{mfluidProductionNum.ycnum}}</b></span>
                                                            </div>
                                                        </div>  
                                                        <div class="z-row-center">
                                                            <div class="numBtn" :class="[item.code==selCode?'numBtnBgActive':'']"
                                                                v-for="(item,index) in mfluidProductionOptions" :key="index" v-if="item.name!='正常'&&(item.value!=0||item.isShow)&&!mfluidProductionSwitch"
                                                                @click="((val)=>{selRadioIterm(item.code,'mfluidProductionOptions')})">
                                                                <span class="sp1">{{item.value}}</span>
                                                                <span class="sp2">{{item.name}}</span>
                                                            </div>
                                                            <div class="numBtn" :class="[item.code==selCode?'numBtnBgActive':'']"
                                                                v-for="(item,index) in mfluidProductionOptions" :key="index" v-if="item.name=='正常'&&mfluidProductionSwitch"
                                                                @click="((val)=>{selRadioIterm(item.code,'mfluidProductionOptions')})">
                                                                <span class="sp1">{{item.value}}</span>
                                                                <span class="sp2">{{item.name}}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="z3">
                                            <div class="z-row-right" style="height:130px;position: relative;top: 48px;">
                                                <div class="name">措施推荐</div>
                                                <div class="num">
                                                    <span 
                                                    :class="[item.code==selCode?'spActive':'']"
                                                    v-for="(item,index) in recommendedMeasuresOptions" :key="index" v-if="item.name=='开层'||item.name=='关层'||item.name=='防砂'||item.name=='停井复产'"
                                                    @click="selRadioIterm(item.code,'recommendedMeasuresOptions')">
                                                    {{ item.name + (item.increase > 0 ? '/' + item.increase + 't' : '')  }}：<span style="color: #FFC835; font-size: 14px;">{{ (item.value > 0 ? item.value : '0') }}</span>
                                                    </span>
                                                </div>
                                                <div style="width: 250px;display: flex;justify-content: flex-end;margin-top: 45px;padding-right: 28px">
                                                    <el-button type="primary" style="margin-left: 20px" v-if="selCode&&(selCode=='0100102'||selCode=='0100103'||selCode=='0100106'||selCode=='0100114')"
                                                               @click="$router.push({name:'planmessage',query:{platform,wellId,currentDate,page:'oilAnalysisReport',measureCode:selCode}})">措施推荐详情</el-button>
                                                </div>
                                                <div style="width: 250px;display: flex;justify-content: flex-end;position: relative;top:40px;">
                                                    <el-button type="primary" style="margin-left: 20px" v-if="selCode&&(selCode=='0050102'||selCode=='0050101' || selCode=='0060101' || selCode=='0060102'|| selCode=='0070101'|| selCode=='0070102'|| selCode=='0040101')"
                                                            @click="$router.push({path:'attributtonAnalysis',query:{platform,wellId,currentDate,'link':linkdata(),evalResult:selCode }})">
                                                        归因分析详情
                                                    </el-button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </pagePanel>
                        </div>
                        <div style="height:800px;position: relative;z-index: 3;">
                            <pagePanel header-title="油井动态分析详情列表"  style="height: 100%;">
                                <div style="display: flex; justify-content: flex-end;">
                                    <el-button icon="el-icon-download" type="primary" style="margin-bottom: 20px;" @click="doDownExcel('#table2', '油井动态分析详情列表')">下载</el-button>
                                </div>
                                <el-table id="table2" highlight :data="tableData" height="calc(100% - 55px)" @sort-change="changeTableSort" ref="tableList" class="doubleHeader">
                                    <el-table-column type="index" label="序号" align="center" width="80px" fixed="left"></el-table-column>
                                    <el-table-column prop="wellName" label="井号" align="center" width="180px" :sortable="true" :sort-method="borepipeNoSort" fixed="left"></el-table-column>
                                    <!--生产动态项目-->
                                    <el-table-column v-for="(item, index) in productionTrendsTab" :key="item.code" :prop="item.code" align="center" min-width="150" sortable="custom" label-class-name="twoRowHeader">
                                        
                                        <template #header>
                                            <div class="headerSortRow1" v-if="item.name && item.name!='正常' && item.name.split(' ')[1]">
                                                <span>{{ item.name.split(' ')[0] ? item.name.split(' ')[0] : ""}}</span>
                                                <br />
                                                <span>{{ item.name.split(' ')[1] ? `(${item.name.split(' ')[1]})` : ""}}</span>
                                            </div>
                                            <div v-else>
                                                <span>{{item.name=='正常'?'生产状态':item.name}}</span>
                                            </div>
                                        </template>
                                        
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.scdt[item.code] == null">{{productionStatus(scope.row.scdt,item.code)}}</span>
                                            
                                            <span v-else-if="item.code == 'ZC'">{{ scope.row.scdt[item.code].showLabel ? scope.row.scdt[item.code].showLabel :'-' }}</span>
                                            
                                            <el-tooltip v-else class="item" effect="dark" :content="scope.row.scdt[item.code].value + ''" placement="top">
                                                <span style="display: flex;align-items: center;justify-content: center;">
                                                    {{ scope.row.scdt[item.code].showLabel ? scope.row.scdt[item.code].showLabel :'-' }}
                                                    <img src="@/assets/rem/yieId/upTriangle.png" v-if="item.name.includes('上升')" style="width:20px;height:20px;">
                                                    <img src="@/assets/rem/yieId/downTriangle.png" v-if="item.name.includes('下降')"  style="width:20px;height:20px;">
                                                </span>
                                            </el-tooltip>
                                            
                                        </template>
                                        
                                    </el-table-column>
                                    <!--生产问题监测项目-->
                                    <el-table-column prop="problemMonitoring" label="生产问题监测" align="center">
                                        <el-table-column v-for="(item, index) in problemMonitoringTab" min-width="100" :key="index" :prop="item.code" :label="item.name" align="center" width="260px" label-class-name="twoRowHeader">
                                            <template #header>
                                                <div v-if="item.isTwoHeader">
                                                    <span>{{item.name}}</span>
                                                    <br />
                                                    <span>{{item.unit}}</span>
                                                </div>
                                                <div v-else>
                                                    <span>{{item.name}}</span>
                                                </div>
                                            </template>
                                            <template slot-scope="scope">
                                                <span class="1" v-if="scope.row[item.code] == null"></span>
                                                <span class="2" v-else-if="item.code == 'yjgk' || item.code == 'gpgx'">{{ scope.row[item.code].showLabel?scope.row[item.code].showLabel:'-' }}</span>
                                                <span class="3" v-else style="display: flex;align-items: center;justify-content: center;">
                                                {{scope.row[item.code].average ? `平均 ${scope.row[item.code].average} /` : '' }}
                                                {{replaceStr(scope.row[item.code].showLabel)}}
                                                {{scope.row[item.code].value?parseFloat(scope.row[item.code].value).toFixed(2): !replaceStr(scope.row[item.code].showLabel)?'-':''}}
                                                    <img src="@/assets/rem/yieId/upTriangle.png" v-if="replaceStr(scope.row[item.code].showLabel)=='偏高'" style="width:20px;height:20px;">
                                                    <img src="@/assets/rem/yieId/downTriangle.png" v-if="replaceStr(scope.row[item.code].showLabel)=='偏低'"  style="width:20px;height:20px;">
                                                </span>
                                            </template>
                                        </el-table-column>
                                    </el-table-column>
                                    <!--潜力分析-->
                                    <el-table-column prop="potentialAnalysis" label="潜力分析" align="center">
                                        <el-table-column v-for="(item, index) in potentialAnalysisTab" :key="index" :prop="item.code" :label="item.name" align="center">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row[item.code] == null"></span>
                                                <span>{{ scope.row[item.code].showLabel?scope.row[item.code].showLabel:'-' }}</span>
                                            </template>
                                        </el-table-column>
                                    </el-table-column>
                                    <!--措施初选-->
                                    <el-table-column prop="recommendedMeasures" label="措施初选" align="center">
                                        <el-table-column prop="measuresName" label="推荐措施" align="center">
                                            <template slot-scope="scope">
                                                <!-- <span v-if="scope.row.cscx != null">{{ scope.row.cscx.showLabel ? scope.row.cscx.showLabel  :'-' }}</span> -->
                                                <span v-if="scope.row.cscx != null">{{ preliminarySelectioMeasures(scope.row.wellId,1) }}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="theDate" align="center"  min-width="130" label-class-name="twoRowHeader">
                                            <template #header>
                                                <div>
                                                    <span>推荐日期</span>
                                                    <br />
                                                    <span>(yyyy/mm/dd)</span>
                                                </div>
                                            </template>
                                            <template slot-scope="scope">
                                                <!-- <span v-if="scope.row.cscx != null">{{ scope.row.cscx.tjrq ? scope.row.cscx.tjrq :'-'}}</span> -->
                                                <span v-if="scope.row.cscx != null">{{ preliminarySelectioMeasures(scope.row.wellId,2) }}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="操作" align="center">
                                            <template slot-scope="scope">
                                                <el-button type="text" @click="openAnalysis(scope.row.wellId)">分析</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table-column>
                                    <!--日增油量-->
                                    <el-table-column prop="dailyOilIncrement" align="center" label-class-name="twoRowHeader">
                                        <template #header>
                                            <div>
                                                <span>日增油量</span>
                                                <br />
                                                <span>(m³/d)</span>
                                            </div>
                                        </template>
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.rzyl == null || scope.row.rzyl.showMvalue == null">-</span>
                                            <span v-else>{{ scope.row.rzyl.showMvalue ? scope.row.rzyl.showMvalue : '-'}}</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </pagePanel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        dynamicProd,
        operatingStatus,
        supplyDischargeRelationship,
        declineRate,
        fluidProducingIntensity,
        fluidProductivityIndex,
        fluidProductivityIndexMeter,
        potential,
        reserveProducing,
        measureRecommend,
        proWellDynamicAnalysisDetail,
        findDynamicAnalysisUsingPOST
    } from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
    import {
        fetchOilFields,
        fetchFields,  
        fetchPlatforms,
        fetchProductionWellsByPlatform,
        fetchProductionWells
    } from "@/api/oilDeposit/rem-02/primaryinfo.js";
    import { getDate } from "@/api/oilDeposit/rem-04/oilAuxiliaryAnalysis.js"
    import compareSort from "@/lib/compareSort.js";
    import treeSelectionCustom from "@/pages/rem/basic/components/treeSelectionCustom.vue";
    import {exportExcel} from '@/lib/exportExcel.js';

    export default {
        name:'oilAnalysisReport',
        mixins: [compareSort],
        components: {
            treeSelectionCustom
        },
        watch: {
            "$route.query.wellNo"(){ // 监听路由变化
                if(this.$route.query.wellNo){//判断路由是否有井号参数
                    let wellItem=this.wellData.find(e=>e.wellName==this.$route.query.wellNo);
                    this.wellId=wellItem.wellId;
                    this.doSearch();
                }
            },
        },
        data() {
            return {
                // 主数据树结构默认选中的值
                defaultCheckedKeys: [],
                isNewformat:true,//默认新版本
                potentialWellNum:0,//潜力井
                listPage: 1,
                //数据来源,大于０为后台提取
                dataSource: 1,
                initTypes: 1, //进行初始加载
                paramMap: {}, //检索条件
                //默认油井(标签)
                radio1: 'oil',
                //油田筛选条件
                ytData: [],
                selYtdm: "", //选中项
                //区块筛选条件
                blocks:[],
                selectBlock:'',
                //平台筛选条件
                ptData: [],
                platform: "", //选中项
                //油井条件
                wellData: [],
                wellId: "", //选中项
                //评价日期条件
                currentDate: "",
                //有推荐措施的井
                recommendedMeasuresWells: {},
                //生产动态表头
                productionTrendsTab: [],
                //生产问题监测表头
                problemMonitoringTab: [{
                        code: "yjgk",
                        name: "油井工况",
                        isTwoHeader: false,
                    },
                    {
                        code: "gpgx",
                        name: "供排关系",
                        isTwoHeader: false,
                    }, {
                        code: "djl",
                        name: "递减率",
                        isTwoHeader: true,
                        unit: "(%)"
                    },
                    {
                        code: "cyqd",
                        name: "采液强度",
                        isTwoHeader: true,
                        unit: "[t/(d.m)]"

                    }, {
                        code: "cyzs",
                        name: "采液指数",
                        isTwoHeader: true,
                        unit: "[m³/(d.MPa)]"
                    },
                    {
                        code: "mcyzs",
                        name: "米采液指数",
                        isTwoHeader: true,
                        unit: "[m³/(m.d.MPa)]"
                    }
                ],
                //潜力分析表头
                potentialAnalysisTab: [{
                        code: "tyql",
                        name: "提液潜力"
                    },
                    {
                        code: "cldy",
                        name: "储量动用"
                    }
                ],
                //选中分析项目
                selCode: "",
                selTag: "",
                //换大泵
                hdbSelCode:'',
                //采液强度偏高
                cyqdpgSelCode:'',
                //采液强度偏低
                cyqdpdSelCode:'',
                //生产动态可用项目
                productionTrendsOptions: [],
                productionNum:{
                    allnum:0,
                    zcnum:0,
                    ycnum:0,
                    zczb:0,
                    yczb:0,
                },
                productionCode:'',//正常的code
                productionSwitch:false,//展示异常false, 正常 true
                //油井工况
                oilWellConditionOptions: [],
                oilWellConditionNum:{
                    allnum:0,
                    zcnum:0,
                    ycnum:0,
                    zczb:0,
                    yczb:0,
                },
                oilWellConditionSwitch:false,//展示异常false, 正常 true
                //供排关系
                relationshipOptions: [],
                relationshipNum:{
                    allnum:0,
                    zcnum:0,
                    ycnum:0,
                    zczb:0,
                    yczb:0,
                },
                relationshipSwitch:false,//展示异常false, 正常 true
                //递减率
                diminishingOptions: [],
                diminishingNum:{
                    allnum:0,
                    zcnum:0,
                    ycnum:0,
                    zczb:0,
                    yczb:0,
                },
                diminishingSwitch:false,//展示异常false, 正常 true
                //采液强度
                fluidStrengthOptions: [],
                fluidStrengthNum:{
                    allnum:0,
                    zcnum:0,
                    ycnum:0,
                    zczb:0,
                    yczb:0,
                },
                fluidStrengthSwitch:false,//展示异常false, 正常 true
                //采液指数
                fluidProductionOptions: [],
                fluidProductionNum:{
                    allnum:0,
                    zcnum:0,
                    ycnum:0,
                    zczb:0,
                    yczb:0,
                },
                fluidProductionSwitch:false,//展示异常false, 正常 true
                //米采液指数
                mfluidProductionOptions: [],
                mfluidProductionNum:{
                    allnum:0,
                    zcnum:0,
                    ycnum:0,
                    zczb:0,
                    yczb:0,
                },
                mfluidProductionSwitch:false,//展示异常false, 正常 true
                //潜力分析可用项目
                //提液潜力
                extractionPotentialOptions: [],
                //储量动用
                reserveProductionOptions: [],
                //措施推荐可用项目
                recommendedMeasuresOptions: [],
                //获取措施效果数据
                recommendedMeasuresData: [],
                //油井动态分析详细列表
                tableData: [],
                initTableData: [],
                dom: {},
                dealTableData: [],
                scrollFlag: false,
            }
        },
        mounted() {
            this.getDateApi(); //初始化油田
        },
        methods: {
            //重置
            resetting(){
                Object.assign(this.$data, this.$options.data());
                this.getDateApi(); //初始化油田
            },
            //本接口获取最后一次模型计算出来的结果，返回最后一次跑模型的日期。
            getDateApi(){
                getDate({wellMenu:'WELL_OIL'}).then(res=>{
                    if(res.data.code==200){
                        this.currentDate=res.data.data;   
                    }
                    this.queryOilFeildList();
                })
            },
            //油井下拉框数据获取
            queryOilFeildList(){
                fetchOilFields().then((res) => {
                    let msg = res.data.msg;
                    if (msg == "success") {
                        let myData = res.data.data.oilFields;
                        this.ytData = myData;
                        //初始选中油田
                        if (this.selYtdm == "" || this.selYtdm == undefined) {
                            this.selYtdm = '3FC9A818F5BC43B88270DB80BBB3018F'; //hwh xg 默认初始化 qhd326//myData[0].oilFieldId;
                        }
                        this.getFieldsData(); 
                    }
                });
            },
            //区块下拉框数据获取
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
            //平台下拉选择
            queryPlatFormList() {
                this.paramMap.oilFieldId = this.selYtdm; //油田
                this.paramMap.selectBlock=this.selectBlock;//区块
                this.ptData=[];
                this.wellData=[];
                fetchPlatforms(this.paramMap).then((res) => {
                    let msg = res.data.msg;
                    if (msg == "success") {
                        let myData = res.data.data.platform;
                        this.ptData = myData;
                        //初始选中油田
                        if (!this.platform) {
                            myData[0].platFormId=myData[0].oilFieldId;
                            this.platform = myData[0].platFormId;
                        } else {
                            this.platform = '';
                        }
                        this.queryOilWellListByPid(); 
                    }
                });
            },
            //获取井号
            async queryOilWellListByPid() {
                if (this.platform == this.selYtdm) {
                    this.paramMap.oilFieldId = this.selYtdm; //登记油田代码
                    await fetchProductionWells(this.paramMap).then((res) => {
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.productionWells;
                            this.wellData = myData;
                        }
                        this.defaultCheckedKeys = [this.selYtdm,this.selectBlock,this.platform,this.wellId];
                    });
                } else {
                    this.paramMap.platformId = this.platform?this.platform:this.ptData[0].oilFieldId; //登记平台代码
                    await fetchProductionWellsByPlatform(this.paramMap).then((res) => {
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.productionWells;
                            this.wellData = myData;
                        }
                        this.defaultCheckedKeys = [this.selYtdm,this.selectBlock,this.platform,this.wellId];
                    });
                }
                
                if(this.initTypes==1){//第一次加载
                    this.initTypes=2;
                    if(this.$route.query.wellNo){//判断路由是否有井号参数
                        let wellItem=this.wellData.find(e=>e.wellName==this.$route.query.wellNo);
                        this.wellId=wellItem.wellId;
                    }
                    this.doSearch();
                }
            },
            // 区块切换事件
            changeBlock() {
                this.$refs.treeSelectionCustom.setCheckedKeys([this.selectBlock, this.platform, this.wellId]);
                this.queryPlatFormList();
            },
            // 平台切换事件
            changePlatform() {
                this.$refs.treeSelectionCustom.setCheckedKeys([this.selectBlock, this.platform, this.wellId]);
                this.queryOilWellListByPid();
            },
            // 井号切换事件
            changeWell(val) {
                console.log('是否执行我了')
                this.$refs.treeSelectionCustom.setCheckedKeys([this.selectBlock, this.platform, this.wellId]);
            },
            // 主数据树结构数选中数据 selectList：选中数据Id集合，selectData：当前选中数据对象
            getSelectItems(selectList, selectData) {
                // 油田选中数据
                // this.selYtdm = selectList.ogfId;
                // 区块选中数据
                this.selectBlock = selectList.blockId;
                // 平台选中数据
                this.platform = selectList.platformIds;
                // 井号选中数据
                this.wellId = selectList.wellId;
                if (selectData.level === 1) {
                    this.queryPlatFormList()
                } else if (selectData.level === 2) {
                    this.queryOilWellListByPid()
                }
            },
            //进行数据查询处理
            doSearch() {
                //加上重新搜索清空选择 和 表格数据
                this.selCode = '';
                this.tableData = [];
                //重置
                this.listPage = 1;
                //重新初始化相关数据项目
                this.paramMap.evaluationDate = this.currentDate;
                this.paramMap.oilFieldId = this.selYtdm;
                this.paramMap.platformId = this.platform;
                this.paramMap.timeGranularityCode = "";
                this.paramMap.wellId = this.wellId;
                Promise.all([
                    //执行提取
                    this.queryWellTable(),
                    this.queryProductionTrends(), //生产动态
                ]).then(res => {
                    this.scrollFlag = true;
                    this.dealInitData();
                }).catch((error) => {
                    console.log(error)
                })
                this.queryOilWellCondition(); //油井工况
                this.queryRelationship(); //供排关系
                this.queryDiminishing(); //递减率
                this.queryFluidStrength(); //采液强度
                this.queryFluidProduction(); //采液指数
                this.queryMfluidProduction(); //米采液指数
                this.queryExtractionPotential(); //提液潜力
                this.queryReserveProduction(); //储量动用
                this.queryRecommendedMeasures(); //措施推荐
                this.queryProWellDynamicAnalysisDetail(); //措施井数据
            },
            //检索之后的处理
            dealInitData() {
                var wellInfo = this.dealTableData;
                if(wellInfo.length){
                    wellInfo.forEach((el,i)=>{
                        if(el.cyqd.showLabel&&el.cyqd.showLabel.includes('采液强度')){
                            wellInfo[i].cyqd.showLabel=el.cyqd.showLabel.replace('采液强度','')
                        }
                        if(el.cyzs.showLabel&&el.cyzs.showLabel.includes('采液指数')){
                            wellInfo[i].cyzs.showLabel=el.cyzs.showLabel.replace('采液指数','')
                        }
                        if(el.djl.showLabel&&el.djl.showLabel.includes('递减率')){
                            wellInfo[i].djl.showLabel=el.djl.showLabel.replace('递减率','')
                        }
                        if(el.mcyzs.showLabel&&el.mcyzs.showLabel.includes('米采液指数')){
                            wellInfo[i].mcyzs.showLabel=el.mcyzs.showLabel.replace('米采液指数','')
                        }
                    })
                }
                if (wellInfo != null) {
                    this.tableData = wellInfo;
                    this.listPage = 2;
                } else {
                    this.tableData = wellInfo;
                }
                //3、根据每个项目的井数遍历检查表头
                //productionTrendsOptions//生产动态
                this.productionTrendsTab = [];
                for (let j = 0; j < this.productionTrendsOptions.length; j++) {
                    let t_data = this.productionTrendsOptions[j]; //每个数据项
                    if (parseInt(t_data.value) > 0) {
                        let titleName = t_data.name + (t_data.unit ? ' ' + t_data.unit : '');
                        if (titleName.lastIndexOf('m3') > -1) {
                            titleName = titleName.replace('m3', 'm³');
                        }
                        console.log('titleName',titleName)
                        this.productionTrendsTab.push({
                            code: this.changeToVueCode(t_data.code, t_data.name),
                            name: titleName
                        });
                    }
                }
                console.log('this.productionTrendsTab',this.productionTrendsTab);
                console.log('this.tableData',this.tableData);
                this.$nextTick(()=>{
                    this.$refs.tableList.doLayout();
                })
                // this.selRadioIterm(this.productionCode,'productionTrendsOptions');
            },
            queryWellTable() {
                return new Promise((resolve, reject) => {
                    this.initTableData = [];
                    this.dealTableData = [];
                    var paramInfo = this.paramMap;
                    paramInfo['showNormal'] = true;
                    findDynamicAnalysisUsingPOST(paramInfo).then((res) => {
                        let msg = res.data.code;
                        if (msg == "200") {
                            this.initTableData = JSON.parse(JSON.stringify(res.data.data));
                            this.dealTableData = res.data.data;
                            console.log(this.initTableData,789789789)
                        } else {
                            this.$message.error("综合信息查询失败")
                        }
                        resolve('success');
                    });
                })
            },
            changeToVueCode(code, name) {
                var value = '';
                if (name == '正常') {
                    value = 'ZC';
                    return value;
                }
                switch (code) {
                    case '0010101':
                        value = 'YLSS';
                        break;
                    case '0010102':
                        value = 'YLXJ';
                        break;
                    case '0010201':
                        value = 'OILSS';
                        break;
                    case '0010202':
                        value = 'OILXJ';
                        break;
                    case '0010301':
                        value = 'HSLSS';
                        break;
                    case '0010302':
                        value = 'HSLXJ';
                        break;
                    case '0010401':
                        value = 'BRKYLSS';
                        break;
                    case '0010402':
                        value = 'BRKYLXJ';
                        break;
                    case '0010601':
                        value = 'YZSS';
                        break;
                    case '0010602':
                        value = 'YZXJ';
                        break;
                    case '0010701':
                        value = 'BPSS';
                        break;
                    case '0010702':
                        value = 'BPXJ';
                        break;
                }
                return value;
            },
            changeNameToVueCode(name) {
                var value = '';
                switch (name) {
                    case '液量上升':
                        value = 'YLSS';
                        break;
                    case '液量下降':
                        value = 'YLXJ';
                        break;
                    case '油量上升':
                        value = 'OILSS';
                        break;
                    case '油量下降':
                        value = 'OILXJ';
                        break;
                    case '含水率上升':
                        value = 'HSLSS';
                        break;
                    case '含水率下降':
                        value = 'HSLXJ';
                        break;
                    case '泵入口压力上升':
                        value = 'BRKYLSS';
                        break;
                    case '泵入口压力下降':
                        value = 'BRKYLXJ';
                        break;
                    case '油嘴上升':
                        value = 'YZSS';
                        break;
                    case '油嘴下降':
                        value = 'YZXJ';
                        break;
                    case '泵频上升':
                        value = 'BPSS';
                        break;
                    case '泵频下降':
                        value = 'BPXJ';
                        break;
                    case '正常':
                        value = 'ZC';
                        break;
                }
                return value;
            },
            //生产动态可用项目
            queryProductionTrends() {
                return new Promise((resolve, reject) => {
                    dynamicProd(this.paramMap).then((res) => {
                        console.log(res,999)
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.indicatorAnalysisDetailInfos;
                            this.productionNum.allnum=0;
                            this.productionNum.zcnum=0;
                            this.productionNum.ycnum=0;
                            myData.forEach((el,i)=>{
                                this.productionNum.allnum+=Number(el.value);
                                if(el.name=='正常'){
                                    console.log('正常',el)
                                    this.productionNum.zcnum=Number(el.value);
                                    this.productionCode=el.code;
                                }else{
                                    myData[i].isShow=Number(el.value)?true:false;
                                    this.productionNum.ycnum+=Number(el.value);
                                }
                            })
                            this.productionNum.zczb=this.productionNum.zcnum/this.productionNum.allnum * 100;
                            this.productionNum.yczb=this.productionNum.yczb/this.productionNum.allnum * 100;
                            this.productionTrendsOptions = myData;
                            console.log('this.productionTrendsOptions',this.productionTrendsOptions)
                        }
                        resolve('success');
                    }).catch(error => {
                        console.log(error)
                    });
                });
            },
            //生产问题监测可用项目01,油井工况
            queryOilWellCondition() {
                return new Promise((resolve, reject) => {
                    operatingStatus(this.paramMap).then((res) => {
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.indicatorAnalysisDetailInfos;
                            
                            this.oilWellConditionNum.allnum=0;
                            this.oilWellConditionNum.zcnum=0;
                            this.oilWellConditionNum.ycnum=0;
                            myData.forEach((el,i)=>{
                                this.oilWellConditionNum.allnum+=Number(el.value);
                                if(el.name=='正常'){
                                    this.oilWellConditionNum.zcnum=Number(el.value);
                                }else{
                                    myData[i].isShow=Number(el.value)?true:false;
                                    this.oilWellConditionNum.ycnum+=Number(el.value);
                                }
                            })
                            this.oilWellConditionNum.zczb=this.oilWellConditionNum.zcnum/this.oilWellConditionNum.allnum * 100;
                            this.oilWellConditionNum.yczb=this.oilWellConditionNum.yczb/this.oilWellConditionNum.allnum * 100;
                            this.oilWellConditionOptions = myData;
                        }
                        resolve('success');
                    });
                });
            },
            //生产问题监测可用项目02,供排关系
            queryRelationship() {
                return new Promise((resolve, reject) => {
                    supplyDischargeRelationship(this.paramMap).then((res) => {
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.indicatorAnalysisDetailInfos;
                            this.relationshipNum.allnum=0;
                            this.relationshipNum.zcnum=0;
                            this.relationshipNum.ycnum=0;
                            myData.forEach((el,i)=>{
                                this.relationshipNum.allnum+=Number(el.value);
                                if(el.name=='正常'||el.name=='合理区'){
                                    this.relationshipNum.zcnum+=Number(el.value);
                                }else{
                                    myData[i].isShow=Number(el.value)?true:false;
                                    this.relationshipNum.ycnum+=Number(el.value);
                                }
                            })
                            this.relationshipNum.zczb=this.relationshipNum.zcnum/this.relationshipNum.allnum * 100;
                            // this.relationshipNum.zczb=100;
                            this.relationshipNum.yczb=this.relationshipNum.yczb/this.relationshipNum.allnum * 100;
                            
                            this.relationshipOptions = myData;
                        }
                        resolve('success');
                    });
                });
            },
            //生产问题监测可用项目03,递减率
            queryDiminishing() {
                return new Promise((resolve, reject) => {
                    declineRate(this.paramMap).then((res) => {
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.indicatorAnalysisDetailInfos;
                            
                            this.diminishingNum.allnum=0;
                            this.diminishingNum.zcnum=0;
                            this.diminishingNum.ycnum=0;
                            myData.forEach((el,i)=>{
                                this.diminishingNum.allnum+=Number(el.value);
                                if(el.name=='正常'){
                                    this.diminishingNum.zcnum=Number(el.value);
                                }else{
                                    myData[i].isShow=Number(el.value)?true:false;
                                    this.diminishingNum.ycnum+=Number(el.value);
                                }
                            })
                            this.diminishingNum.zczb=this.diminishingNum.zcnum/this.diminishingNum.allnum * 100;
                            this.diminishingNum.yczb=this.diminishingNum.yczb/this.diminishingNum.allnum * 100;
                            
                            this.diminishingOptions = myData;
                        }
                        resolve('success');
                    });
                });
            },
            //生产问题监测可用项目04,采液强度
            queryFluidStrength() {
                return new Promise((resolve, reject) => {
                    fluidProducingIntensity(this.paramMap).then((res) => {
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.indicatorAnalysisDetailInfos;
                            this.fluidStrengthNum.allnum=0;
                            this.fluidStrengthNum.zcnum=0;
                            this.fluidStrengthNum.ycnum=0;
                            myData.forEach((el,i)=>{
                                this.fluidStrengthNum.allnum+=Number(el.value);
                                if(el.name=='正常'){
                                    this.fluidStrengthNum.zcnum=Number(el.value);
                                }else{
                                    myData[i].isShow=Number(el.value)?true:false;
                                    this.fluidStrengthNum.ycnum+=Number(el.value);
                                    if(el.name=='采液强度偏高'){
                                        this.cyqdpgSelCode=el.code;
                                    }else if(el.name=='采液强度偏低'){
                                        this.cyqdpdSelCode=el.code;
                                    }
                                }
                            })
                            this.fluidStrengthNum.zczb=this.fluidStrengthNum.zcnum/this.fluidStrengthNum.allnum * 100;
                            this.fluidStrengthNum.yczb=this.fluidStrengthNum.yczb/this.fluidStrengthNum.allnum * 100;
                            this.fluidStrengthOptions = myData;
                        }
                        resolve('success');
                    });
                });
            },
            //生产问题监测可用项目05,采液指数
            queryFluidProduction() {
                return new Promise((resolve, reject) => {
                    fluidProductivityIndex(this.paramMap).then((res) => {
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.indicatorAnalysisDetailInfos;
                            
                            this.fluidProductionNum.allnum=0;
                            this.fluidProductionNum.zcnum=0;
                            this.fluidProductionNum.ycnum=0;
                            myData.forEach((el,i)=>{
                                this.fluidProductionNum.allnum+=Number(el.value);
                                if(el.name=='正常'){
                                    this.fluidProductionNum.zcnum=Number(el.value);
                                }else{
                                    myData[i].isShow=Number(el.value)?true:false;
                                    this.fluidProductionNum.ycnum+=Number(el.value);
                                }
                            })
                            this.fluidProductionNum.zczb=this.fluidProductionNum.zcnum/this.fluidProductionNum.allnum * 100;
                            this.fluidProductionNum.yczb=this.fluidProductionNum.yczb/this.fluidProductionNum.allnum * 100;
                            
                            this.fluidProductionOptions = myData;
                        }
                        resolve('success');
                    });
                });
            },
            //生产问题监测可用项目06,米采液指数
            queryMfluidProduction() {
                return new Promise((resolve, reject) => {
                    fluidProductivityIndexMeter(this.paramMap).then((res) => {
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.indicatorAnalysisDetailInfos;
                            
                            this.mfluidProductionNum.allnum=0;
                            this.mfluidProductionNum.zcnum=0;
                            this.mfluidProductionNum.ycnum=0;
                            myData.forEach((el,i)=>{
                                this.mfluidProductionNum.allnum+=Number(el.value);
                                if(el.name=='正常'){
                                    this.mfluidProductionNum.zcnum=Number(el.value);
                                }else{
                                    myData[i].isShow=Number(el.value)?true:false;
                                    this.mfluidProductionNum.ycnum+=Number(el.value);
                                }
                            })
                            this.mfluidProductionNum.zczb=this.mfluidProductionNum.zcnum/this.mfluidProductionNum.allnum * 100;
                            this.mfluidProductionNum.yczb=this.mfluidProductionNum.yczb/this.mfluidProductionNum.allnum * 100;
                            
                            this.mfluidProductionOptions = myData;
                        }
                        resolve('success');
                    });
                });
            },
            //潜力分析可用项目01,提液潜力
            queryExtractionPotential() {
                return new Promise((resolve, reject) => {
                    potential(this.paramMap).then((res) => {
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.indicatorAnalysisDetailInfos;
                            this.extractionPotentialOptions = myData;
                        }
                        resolve('success');
                    });
                });
            },
            //潜力分析可用项目02,储量动用
            queryReserveProduction() {
                return new Promise((resolve, reject) => {
                    reserveProducing(this.paramMap).then((res) => {
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.indicatorAnalysisDetailInfos;
                            this.reserveProductionOptions = myData;
                        }
                        resolve('success');
                    });
                });
            },
            //措施推荐可用项目
            queryRecommendedMeasures() {
                return new Promise((resolve, reject) => {
                    measureRecommend(this.paramMap).then((res) => {
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.indicatorAnalysisDetailInfos;
                            this.potentialWellNum=0;
                            myData.forEach((el,i)=>{
                                this.potentialWellNum+=Number(el.value);
                                
                                if(el.name=='换大泵'){
                                    this.hdbSelCode=el.code;
                                }
                                
                            })
                            this.recommendedMeasuresOptions = myData;
                        }
                        resolve('success');
                    });
                });
            },
            //措施推荐可用项目,获取措施效果数据
            queryProWellDynamicAnalysisDetail() {
                return new Promise((resolve, reject) => {
                    proWellDynamicAnalysisDetail(this.paramMap).then((res) => {
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.evaluationResults;
                            this.recommendedMeasuresData = myData;
                            this.recommendedMeasuresWells = [];
                            this.initRecommendedMeasuresWells(); //生成井清单
                        }
                        resolve('success');
                    });
                });
            },
            preliminarySelectioMeasures(str,type){
                for(let i=0;i< this.recommendedMeasuresData.length;i++){
                    if( this.recommendedMeasuresData[i].wellId==str){
                        return type==1?this.recommendedMeasuresData[i].measuresName:this.recommendedMeasuresData[i].theDate
                    }
                }
                return '-'
            },
            //初始化有措施的井清单
            initRecommendedMeasuresWells() {
                return new Promise((resolve, reject) => {
                    if (this.recommendedMeasuresData) {
                        for (let i = 0; i < this.recommendedMeasuresData.length; i++) {
                            let tData = this.recommendedMeasuresData[i];
                            this.recommendedMeasuresWells[tData.wellName] = i;
                        }
                        console.log(this.recommendedMeasuresWells);
                    }
                    resolve('success');
                });
            },
            //选中项目
            selRadioIterm(val, tag,item) {
                console.log(item)
                this.scrollFlag = false;
                let myData = []; //我的数据
                let myWellCount = {}; //计算各项目的井数
                let t_count = 0; //计数器
                if(this.selCode!=val){
                    this.selCode = val; //选中项目
                }else{
                    this.selCode='';
                    this.doSearch();
                    return false;
                }
                
                this.selTag = tag; //选中数据集
                if (val == undefined || val == "") {
                    return false; //无效参数
                }
              
                //1、获取选中井集合
                if (this[tag]) {
                    for (let i = 0; i < this[tag].length; i++) {
                        let tData = this[tag][i];
                        if (val == tData.code) {
                            if ( !tData.wells || tData.wells == "null") { //无数据
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
                let tableData = this.initTableData;
                let reData = [];
                for (let i = 0; i < tableData.length; i++) {
                    let item = tableData[i];
                    let wellIdFilter = item.wellName;
                    for (let j = 0; j < myData.length; j++) {
                        let itemDb = myData[j];
                        if (wellIdFilter == itemDb.wellId) {
                            reData.push(item);
                            break;
                        }
                    }
                }
                for (let i = 0; i < myData.length; i++) {
                    let myWellId = myData[i].wellId; //井号
                    console.log('myData[i]',myData[i])
                    let forEachDataList=[
                        {key:'生产动态',name:'productionTrendsOptions'},
                        {key:'油井工况',name:'oilWellConditionOptions'},
                        {key:'供排关系',name:'relationshipOptions'},
                        {key:'递减率',name:'diminishingOptions'},
                        {key:'采液强度',name:'fluidStrengthOptions'},
                        {key:'采液指数',name:'fluidProductionOptions'},
                        {key:'米采液指数',name:'mfluidProductionOptions'},
                        {key:'提液潜力',name:'extractionPotentialOptions'},
                        {key:'储量动用',name:'reserveProductionOptions'},
                        {key:'措施推荐',name:'recommendedMeasuresOptions'},
                    ];
                    for(let k=0;k<forEachDataList.length;k++){
                        let name=forEachDataList[k].name;
                        let data=this[name];
                        for (let j = 0; j < data.length; j++) {
                            let t_data = data[j]; //每个数据项
                            if (val != t_data.code) { //选中项目不需要测试
                                if (!isNaN(myWellCount[t_data.code])) {
                                    t_count = myWellCount[t_data.code];
                                } else {
                                    t_count = 0; //初始化
                                }
                                let t_subWells = "," + t_data.wells + ",";
                                if (t_subWells.includes("," + myWellId + ",")) {
                                    t_count++; //计数
                                }
                                myWellCount[t_data.code] = t_count; //回写
                            }
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
                let forEachKeys=['productionTrendsOptions','oilWellConditionOptions','relationshipOptions','diminishingOptions','fluidStrengthOptions','fluidProductionOptions','mfluidProductionOptions','extractionPotentialOptions','reserveProductionOptions','recommendedMeasuresOptions'];
                this.productionTrendsTab = [];
                for(let i=0;i<forEachKeys.length;i++){
                    let key=forEachKeys[i];
                    let data=this[key];
                    for (let j = 0; j < data.length; j++) {
                        let t_data = data[j]; //每个数据项
                        //获得相关井数
                        if (!isNaN(myWellCount[t_data.code])) {
                            t_count = myWellCount[t_data.code];
                        } else {
                            t_count = 0; //初始化
                        }
                        data[j].value = t_count; //登记条数
                        if(key=='productionTrendsOptions'){
                            if (t_count > 0) {
                                let titleName = t_data.name + ' ' + (t_data.unit ? t_data.unit : '');
                                if (titleName.lastIndexOf('m3') > -1) {
                                    titleName = titleName.replace('m3', 'm³');
                                }
                                this.productionTrendsTab.push({
                                    code: this.changeToVueCode(t_data.code, t_data.name),
                                    name: titleName
                                });
                            }
                        }
                    }
                }
                this.tableData = reData; //加载数据
                console.log('this.tableData',this.tableData)
                this.$nextTick(() => {
                    this.$refs.tableList.doLayout();
                })
                //zxb-重新计算数量    
                let numKeys=['productionNum','oilWellConditionNum','relationshipNum','diminishingNum','fluidStrengthNum','fluidProductionNum','mfluidProductionNum'];
                let datakeys=['productionTrendsOptions','oilWellConditionOptions','relationshipOptions','diminishingOptions','fluidStrengthOptions','fluidProductionOptions','mfluidProductionOptions'];
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
            
            
            //跳转到水井页面
            goWaterWell(val) {
                if (val == "water") {
                    this.$router.push('/singleWellPerformance_water')
                }
            },
            //跳转到分析
            openAnalysis(wellNumber) {
                this.$router.push({
                    name: 'oilAuxiliaryAnalysis',
                    query: {
                        oilField: this.selYtdm,
                        wellId: wellNumber
                    }
                });
            },
            //获得对应日期串
            getMyDate(days) {
                let date = new Date();
                date = date.setDate(date.getDate() + days);
                date = new Date(date);
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
                if (prop != 'wellName') {
                    // 如果按降序
                    if (e.order === 'descending') {
                        //根据需要对字段进行写排序
                        this.tableData = this.tableData.sort((a, b) => {
                            if (!a.scdt[prop] || !a.scdt[prop].showLabel) {
                                return -1;
                            } else if (!b.scdt[prop] || !a.scdt[prop].showLabel) {
                                return 1;
                            } else {
                                return parseFloat(Number(a.scdt[prop].showLabel)) - parseFloat(Number(b.scdt[prop].showLabel));
                            }
                        })
                    } else { //发果是降序
                        this.tableData = this.tableData.sort((a, b) => {
                            if (!a.scdt[prop] || !a.scdt[prop].showLabel) {
                                return 1;
                            } else if (!b.scdt[prop] || !a.scdt[prop].showLabel) {
                                return -1;
                            } else {
                                return parseFloat(Number(b.scdt[prop].showLabel)) - parseFloat(Number(a.scdt[prop].showLabel));
                            }
                        })
                    }
                }
            },
            //自定义井号排序
            borepipeNoSort(oa, ob) {
                let wellA = oa.wellName;
                let wellB = ob.wellName;
                return this.wellNoSort(wellA, wellB);
            },
            // 判断数据
            linkdata(){
                const codeMapping = {
                    '0050102': 1,
                    '0050101': 1,
                    '0060102': 2,
                    '0060101': 2,
                    '0070102': 3,
                    '0070101': 3,
                    '0040101': 5
                };
                return codeMapping[this.selCode] || 0;
            },
            //替换表格文字
			replaceStr(str){
				if(str){
					let strs=['递减率','采液强度','米采液指数','采液指数'];
					for(let i=0;i<strs.length;i++){
						if(str.includes(strs[i])){
							return str.replace(strs[i],'')
						}
					}
				}
				return str;
			},
            //深化点-生产状态
            productionStatus(scdt,code){
                if(code=='ZC'){//如果是正常
                    let retStr='';
                    for(let key in scdt.wellExe){
                        if(scdt.wellExe[key]!='正常井'&& key=='GZTJ'){
                            retStr=scdt.wellExe[key];
                        }else if(scdt.wellExe[key]!='正常井'&& key=='XYJ'){
                            retStr=scdt.wellExe[key];
                        }else if(scdt.wellExe[key]!='正常井'&& key=='JP'){
                            retStr=scdt.wellExe[key];
                        }else if(scdt.wellExe[key]!='正常井'&& key=='GHSJ'){
                            retStr=scdt.wellExe[key];
                        }else if(scdt.wellExe[key]!='正常井'&& key=='DCJ'){
                            retStr=scdt.wellExe[key];
                        }
                    }
                    if(!retStr){
                        return '正常';
                    }else{
                        return retStr;
                    }
                }else{
                    return '-'
                }
            },
            //下载导出文件 tableId tableName
            doDownExcel(tableId, tableName) {
                exportExcel(tableId, tableName);
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
                    height:1240px;
                    // position: relative;
                    position: absolute;
                    left:0;
                    top:0;
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
                        top: 188px;
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
                        height: 419px;
                        position: absolute;
                        left: 178px;
                        top: 292px;
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
                    z-index:3;
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
                        min-width:250px;
                        height:70px;
                        padding-left:20px;
                        border: 1px solid;
                        border-image: linear-gradient(180deg, #2e5b7c, #01aaf2) 3 3;
                        background-image: var(--logo-bg) !important;
                        display: flex;
                        align-items: center;
                        margin-right: 66px;
                        .helpImg{
                            width:52px;
                            height:52px;
                            margin-right:18px;
                        }
                        span{
                            flex:1;
                            font-size: 50px;
                            color: #FFCA07;
                            font-weight: 600;
                        }
                        b{
                            margin-right:10px;
                            position: relative; 
                            top:-18px;
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
                                        padding: 1px;
                                        border: 1px solid rgba(41,171,226,1);
                                        margin-right:16px;
                                        display: flex;
                                        align-items: center;
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
                                    cursor: pointer;
                                    min-width: 70px;
                                    border-radius:4px;
                                    height:60px;
                                    padding:0 10px;
                                    margin-right:8px;
                                    margin-bottom:8px;
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
                                width: 250px;
                                height: 100px;
                                margin-right: 40px;
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
                                    cursor: pointer;
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
                    .z-content2{
                        padding-left:36px;
                        display: flex;
                        .z1{
                            margin-right:40px;
                        }
                        // .z3{
                        //     flex:1;
                        //     display: flex;
                        //     flex-direction: column;
                        //     .z-row-right{
                        //         width:250px;
                        //         height:110px;
                        //         margin-right:20px;
                        //         padding-bottom:20px;
                        //         border: 1px solid;
                        //         border-image: linear-gradient(180deg, #2e5b7c, #01aaf2) 3 3;
                        //         background-image: var(--logo-bg) !important;
                        //         .name{
                        //             padding-top:14px;
                        //             margin-bottom:14px;
                        //             font-size: 18px;
                        //             color: #24DEFF;
                        //             text-align: center;
                        //             line-height: 25px;
                        //             font-weight: 600;
                        //         }
                        //         .num{
                        //             cursor: pointer;
                        //             padding-left:30px;
                        //             flex-wrap: wrap;
                        //             display: flex;
                        //             align-items: center;
                        //             justify-content: space-between;
                        //             span{
                        //                 width:100px;
                        //                 font-size:12px;
                        //                 // text-align: right;
                        //             }
                        //         }
                        //     }
                        // }
                        .z-row-right{
                            width: 250px;
                            height: 100px;
                            margin-right: 40px;
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
                                cursor: pointer;
                                flex-wrap: wrap;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                span{
                                    font-size:12px;
                                }
                            }
                        }
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
                                        padding: 1px;
                                        border: 1px solid rgba(41,171,226,1);
                                        margin-right:16px;
                                        display: flex;
                                        align-items: center;
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
                                    cursor: pointer;
                                    min-width: 70px;
                                    border-radius:4px;
                                    height:60px;
                                    padding:0 10px;
                                    margin-right:8px;
                                    margin-bottom:8px;
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
                            
                        }
                    }
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
        height: 46px!important;
        line-height: 16px!important;
        white-space: pre-line;
        
        font-size:14px;
        text-align: center;
        border-color: var(--light-blue-color);
        color: var(--white-color);
        transition: all 0s;
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
    .selectButton{
        border-image: var(--primary-btn);
        border-color: var(--light-blue-color);
        background: var(--primary-btn) !important;
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

    .spActive{
        color:var(--light-blue-color);
    }
</style>
