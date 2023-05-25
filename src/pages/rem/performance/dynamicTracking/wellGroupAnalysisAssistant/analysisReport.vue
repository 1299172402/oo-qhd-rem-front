<!-- 井组动态分析报告 -->
<template>
    <div class="z_app_container">
        <!-- 旧版本 -->
        <div class="app-container" v-if="!isNewformat">
            <headerSearch style="height:80px;">
                <div class="g-row-flex-V g-w100 g-h100">
                    <span>油田：</span>
                    <el-select v-model="selYtdm" class="f2" style="width:180px" filterable clearable disabled @change="changeOilFeild">
                        <el-option v-for="item in ytData" :key="item.oilFieldId" :label="item.name" :value="item.oilFieldId">
                        </el-option>
                    </el-select>
                    <span style="margin-left:15px;">区块：</span>
                    <el-select v-model="selBlock" class="f2" style="width:180px" filterable clearable @change="changeBlock">
                        <el-option v-for="item in blockData" :key="item.fieldId" :label="item.name" :value="item.fieldId">
                        </el-option>
                    </el-select>
                    <span style="margin-left:15px;">水井井组：</span>
                    <el-select v-model="searchKeys" class="f2" style="width:180px" filterable clearable>
                        <el-option v-for="item in wellGroupList" :key="item.wellGroupId" :label="item.name" :value="item.wellGroupId">
                        </el-option>
                    </el-select>
                    <span style="margin-left:15px;">年月：</span>
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
                    <el-row style="height:auto" :gutter="15" class="cont">
                        <el-col :span="19" style="height: 100%">
                            <pagePanel headerTitle="开发生产问题监测" style="margin-top:0;height:100%;">
                                <el-row :gutter="10">
                                    <el-col :span="9">
                                        <el-button class="commonBtn" style="width:100%;cursor: inherit;">动态变化趋势</el-button>
                                        <el-radio-group v-model="selCode" class="z-radio-group" @change="((val)=>{selRadioIterm(val,'trendOfIndicators')})">
                                            <el-radio-button v-for="(item,index) in trendOfIndicators" :key="index" :class="item.value>0?'checkButton about1':'checkButton'" :label="item.code">
                                                {{item.name+(item.value>0?'('+item.value+')':'(0)')}}
                                            </el-radio-button>
                                        </el-radio-group>
                                    </el-col>
                                    <el-col :span="5">
                                        <el-button class="commonBtn" style="width:100%;cursor: inherit;">注水受效分析</el-button>
                                        <el-radio-group v-model="selCode" style="width: 100%;" @change="((val)=>{selRadioIterm(val,'injectionResponseAnalysis')})">
                                            <el-radio-button v-for="(item,index) in injectionResponseAnalysis" :key="index" :class="item.value>0?'checkButton about1':'checkButton'" :label="item.code">
                                                {{item.name+(item.value>0?'('+item.value+')':'(0)')}}
                                            </el-radio-button>
                                        </el-radio-group>
                                    </el-col>
                                    <el-col :span="5">
                                        <el-button class="commonBtn" style="width:100%;cursor: inherit;">注采平衡</el-button>
                                        <el-radio-group v-model="selCode" style="width: 100%;" @change="((val)=>{selRadioIterm(val,'injectionProductionBalance')})">
                                            <el-radio-button v-for="(item,index) in injectionProductionBalance" :key="index" :class="item.value>0?'checkButton about1':'checkButton'" :label="item.code">
                                                {{item.name+(item.value>0?'('+item.value+')':'(0)')}}
                                            </el-radio-button>
                                        </el-radio-group>
                                    </el-col>
                                    <el-col :span="5">
                                        <el-button class="commonBtn" style="width:100%;cursor: inherit;">压力保持</el-button>
                                        <el-radio-group v-model="selCode" style="width: 100%;" @change="((val)=>{selRadioIterm(val,'thePressureToKeep')})">
                                            <el-radio-button v-for="(item,index) in thePressureToKeep" :key="index" :class="item.value>0?'checkButton about1':'checkButton'" :label="item.code">
                                                {{item.name+(item.value>0?'('+item.value+')':'(0)')}}
                                            </el-radio-button>
                                        </el-radio-group>
                                    </el-col>
                                </el-row>
                            </pagePanel>
                        </el-col>
                        <el-col :span="5" style="height: 100%">
                            <pagePanel headerTitle="措施推荐" style="margin-top:0;height:100%;">
                                <el-row :gutter="10" style="height: 100%">
                                    <el-radio-group v-model="selCode" style="width: 100%;" @change="((val)=>{selRadioIterm(val,'recommendedMeasuresOptions')})">
                                        <el-radio-button v-for="(item,index) in recommendedMeasuresOptions" :key="index" :class="item.value>0?'checkButton about1':'checkButton'" :label="item.code">
                                            {{item.name+(item.value>0?'('+item.value+')':'(0)')}}
                                        </el-radio-button>
                                    </el-radio-group>
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
                    <div style="flex:1;min-height:380px;">
                        <pagePanel headerTitle="井组动态分析详情列表" style="margin-top:0;height:100%;">
                            <el-table highlight :data="tableData" height="100%" @sort-change="changeTableSort" ref="tableList">
                                <el-table-column prop="wellId" align="center" label="井组" width="180px" :sortable="true" :sort-method="borepipeNoSort" fixed="left"></el-table-column>
                                <el-table-column v-for="(item, index) in trendOfIndicatorsTab" :key="index" :prop="item.code" :label="item.name" :render-header="renderHeader" align="center" min-width="140" sortable="custom">
                                    <template slot-scope="{row}">
                                        <span v-if="row[item.code+'Message']==''">{{row[item.code]}}</span>
                                        <el-tooltip v-else class="item" effect="dark" :content="row[item.code+'Message']" placement="top">
                                            <span>{{row[item.code]}}</span>
                                        </el-tooltip>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="injectionResponseAnalysis" align="center" label="注水受效" min-width="140">
                                    <template slot-scope="{row}">
                                        <span v-if="row['injectionResponseAnalysisMessage']==''">{{row['injectionResponseAnalysis']}}</span>
                                        <el-tooltip v-else class="item" effect="dark" :content="row['injectionResponseAnalysisMessage']" placement="top">
                                            <span>{{row['injectionResponseAnalysis']}}</span>
                                        </el-tooltip>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="injectionProductionBalance" align="center" label="注水平衡" min-width="140">
                                    <template slot-scope="{row}">
                                        <span v-if="row['injectionProductionBalanceMessage']==''">{{row['injectionProductionBalance']}}</span>
                                        <el-tooltip v-else class="item" effect="dark" :content="row['injectionProductionBalanceMessage']" placement="top">
                                            <span>{{row['injectionProductionBalance']}}</span>
                                        </el-tooltip>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="thePressureToKeep" align="center" label="压力保持" min-width="140">
                                    <template slot-scope="{row}">
                                        <span v-if="row['thePressureToKeepMessage']==''">{{row['thePressureToKeep']}}</span>
                                        <el-tooltip v-else class="item" effect="dark" :content="row['thePressureToKeepMessage']" placement="top">
                                            <span>{{row['thePressureToKeep']}}</span>
                                        </el-tooltip>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="措施初选">
                                    <el-table-column prop="measuresName" align="center" label="推荐措施" min-width="140"></el-table-column>
                                    <el-table-column prop="theDate" min-width="140px" align="center" label="推荐日期"></el-table-column>
                                    <el-table-column prop="address" align="center" label="操作" min-width="140">
                                        <template slot-scope="scope">
                                            <!--<el-button @click="handleClick(scope.row)" type="text" size="small">分析</el-button>-->
                                            <el-button type="text" size="small" @click="openAnalysis(scope.row.wellId)">分析</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <!--<el-table-column align="center" label="预测增油量">
                    <el-table-column prop="province" align="center" label="日增油">
                      <el-table-column prop="increaseVolume" align="center" label="m³/d" width="140">
                      </el-table-column>
                      <el-table-column prop="increaseQuality" align="center" label="t/d" width="140">
                      </el-table-column>
                    </el-table-column>
                    <el-table-column prop="city" align="center" label="累计油">
                      <el-table-column prop="tenCube" align="center" label="m³" width="140">
                       &lt;!&ndash; <template slot="increaseVolumeC">10<sup>4</sup>m³</template>&ndash;&gt;
                      </el-table-column>
                      <el-table-column prop="tenTon" align="center" label="t" width="140">
                        &lt;!&ndash;<template slot="increaseQualityC">10<sup>4</sup>t</template>&ndash;&gt;
                      </el-table-column>
                    </el-table-column>
                  </el-table-column>-->
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
                        <el-option v-for="item in ytData" :key="item.oilFieldId" :label="item.name" :value="item.oilFieldId">
                        </el-option>
                    </el-select>
                    <span style="margin-left:15px;">区块：</span>
                    <el-select v-model="selBlock" class="f2" style="width:180px" filterable clearable @change="changeBlock">
                        <el-option v-for="item in blockData" :key="item.fieldId" :label="item.name" :value="item.fieldId">
                        </el-option>
                    </el-select>
                    <span style="margin-left:15px;">水井井组：</span>
                    <el-select v-model="searchKeys" class="f2" style="width:180px" filterable clearable>
                        <el-option v-for="item in wellGroupList" :key="item.wellGroupId" :label="item.name" :value="item.wellGroupId">
                        </el-option>
                    </el-select>
                    <span style="margin-left:15px;">年月：</span>
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
                    <img src="@/assets/rem/performance/01cai.gif" alt="" class="img6">
                    <img src="@/assets/rem/performance/01zhu.gif" alt="" class="img5">
                    <img src="@/assets/rem/performance/01cai.gif" alt="" class="img7">
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
                            <b>潜力井组</b>
                        </div>
                    </div>
                    <div class="v2">
                        <info-window info-width="100%"  info-height="100%"  header-title="井组变化趋势分析" :is-show-max-btn="false">
                            <div class="z-content" style="height:100%;overflow-y: scroll;">
                                <div class="z-content-n">
                                    <div class="z-row-left">
                                        <div class="z_title">
                                            <img src="@/assets/rem/performance/z_sb.png" alt="">
                                            <span>动态变化趋势</span>
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
                                </div>
                            </div>
                        </info-window>
                    </div>
                    <div class="v2 v3">
                        <img src="@/assets/rem/performance/bgline2.png" alt="" class="bgline2">
                        <info-window info-width="100%"  info-height="100%"  header-title="开发生产问题监测" :is-show-max-btn="false">
                            <div class="z-content2" style="height:100%;overflow-y: scroll;">
                                <div class="z1">
                                    <div class="z-content-n">
                                        <div class="z-row-left">
                                            <div class="z_title">
                                                <img src="@/assets/rem/performance/z_sb.png" alt="">
                                                <span>注采平衡</span>
                                            </div>
                                            <div class="z_schedule">
                                                <span class="sp1">正常：</span>
                                                <div class="z_proess">
                                                    <span class="z_proess_sp1" :style="{width:injectionProductionBalanceNum.zczb+'%'}"><b>{{injectionProductionBalanceNum.zcnum}}</b></span>
                                                    <span class="z_proess_sp2"></span>
                                                </div>
                                                <span class="sp2">异常：<b>{{injectionProductionBalanceNum.ycnum}}</b></span>
                                            </div>
                                        </div>  
                                        <div class="z-row-center">
                                            <div class="numBtn" v-for="(item,index) in injectionProductionBalance" :key="index" v-if="item.name!='正常'">
                                                <span class="sp1">{{item.value}}</span>
                                                <span class="sp2">{{item.name}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="z-content-n">
                                        <div class="z-row-left">
                                            <div class="z_title">
                                                <img src="@/assets/rem/performance/z_sb.png" alt="">
                                                <span>注水受效分析</span>
                                            </div>
                                            <div class="z_schedule">
                                                <span class="sp1">正常：</span>
                                                <div class="z_proess">
                                                    <span class="z_proess_sp1" :style="{width:injectionResponseAnalysisNum.zczb+'%'}"><b>{{injectionResponseAnalysisNum.zcnum}}</b></span>
                                                    <span class="z_proess_sp2"></span>
                                                </div>
                                                <span class="sp2">异常：<b>{{injectionResponseAnalysisNum.ycnum}}</b></span>
                                            </div>
                                        </div>  
                                        <div class="z-row-center">
                                            <div class="numBtn" v-for="(item,index) in injectionResponseAnalysis" :key="index" v-if="item.name!='正常'">
                                                <span class="sp1">{{item.value}}</span>
                                                <span class="sp2">{{item.name}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="z2">
                                    <div class="z-content-n" style="flex-direction: column;">
                                        <div class="z-row-left" style="margin-bottom:16px;">
                                            <div class="z_title">
                                                <img src="@/assets/rem/performance/z_sb.png" alt="">
                                                <span>压力保持</span>
                                            </div>
                                            <div class="z_schedule">
                                                <span class="sp1">正常：</span>
                                                <div class="z_proess">
                                                    <span class="z_proess_sp1" :style="{width:thePressureToKeepNum.zczb+'%'}"><b>{{thePressureToKeepNum.zcnum}}</b></span>
                                                    <span class="z_proess_sp2"></span>
                                                </div>
                                                <span class="sp2">异常：<b>{{thePressureToKeepNum.ycnum}}</b></span>
                                            </div>
                                        </div>  
                                        <div class="z-row-center">
                                            <div class="numBtn" v-for="(item,index) in thePressureToKeep" :key="index" v-if="item.name!='正常'">
                                                <span class="sp1">{{item.value}}</span>
                                                <span class="sp2">{{item.name}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="z3">
                                    <div class="z-row-right" style="position: relative;top: 48px;">
                                        <div class="name">措施推荐</div>
                                        <div class="num">
                                            <span v-for="(item,index) in recommendedMeasuresOptions" :key="index">{{item.name}}：{{item.value}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </info-window>
                    </div>
                    <div style="height:340px;">
                        <info-window info-width="100%"  info-height="100%"  header-title="井组动态分析详情列表" :is-show-max-btn="false">
                            <el-table highlight :data="tableData" height="100%" @sort-change="changeTableSort" ref="tableList">
                                <el-table-column prop="wellId" align="center" label="井组" width="180px" :sortable="true" :sort-method="borepipeNoSort" fixed="left"></el-table-column>
                                <el-table-column v-for="(item, index) in trendOfIndicatorsTab" :key="index" :prop="item.code" :label="item.name" :render-header="renderHeader" align="center" min-width="140" sortable="custom">
                                      <template slot-scope="{row}">
                                          <span v-if="row[item.code+'Message']==''">{{row[item.code]}}</span>
                                          <el-tooltip v-else class="item" effect="dark" :content="row[item.code+'Message']" placement="top">
                                              <span>{{row[item.code]}}</span>
                                          </el-tooltip>
                                      </template>
                                  </el-table-column>
                                <el-table-column prop="injectionResponseAnalysis" align="center" label="注水受效" min-width="140">
                                      <template slot-scope="{row}">
                                          <span v-if="row['injectionResponseAnalysisMessage']==''">{{row['injectionResponseAnalysis']}}</span>
                                          <el-tooltip v-else class="item" effect="dark" :content="row['injectionResponseAnalysisMessage']" placement="top">
                                              <span>{{row['injectionResponseAnalysis']}}</span>
                                          </el-tooltip>
                                      </template>
                                  </el-table-column>
                                <el-table-column prop="injectionProductionBalance" align="center" label="注水平衡" min-width="140">
                                      <template slot-scope="{row}">
                                          <span v-if="row['injectionProductionBalanceMessage']==''">{{row['injectionProductionBalance']}}</span>
                                          <el-tooltip v-else class="item" effect="dark" :content="row['injectionProductionBalanceMessage']" placement="top">
                                              <span>{{row['injectionProductionBalance']}}</span>
                                          </el-tooltip>
                                      </template>
                                  </el-table-column>
                                <el-table-column prop="thePressureToKeep" align="center" label="压力保持" min-width="140">
                                      <template slot-scope="{row}">
                                          <span v-if="row['thePressureToKeepMessage']==''">{{row['thePressureToKeep']}}</span>
                                          <el-tooltip v-else class="item" effect="dark" :content="row['thePressureToKeepMessage']" placement="top">
                                              <span>{{row['thePressureToKeep']}}</span>
                                          </el-tooltip>
                                      </template>
                                  </el-table-column>
                                <el-table-column align="center" label="措施初选">
                                    <el-table-column prop="measuresName" align="center" label="推荐措施" min-width="140"></el-table-column>
                                    <el-table-column prop="theDate" min-width="140px" align="center" label="推荐日期"></el-table-column>
                                    <el-table-column prop="address" align="center" label="操作" min-width="140">
                                        <template slot-scope="scope">
                                            <el-button type="text" size="small" @click="openAnalysis(scope.row.wellId)">分析</el-button>
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
        indicatorVariationTrendency,
        injectionEffectivity,
        proInjectBalance,
        pressureMaintain,
        wellGroupRecommendMeasure,
        wellGroupDynamicAnalysisDetail
    } from "@/api/oilDeposit/rem-01/wellgroupdynamicanalysis.js";
    import {
        fetchOilFields,
        fetchFields,
        wellGroups
    } from "@/api/oilDeposit/rem-02/primaryinfo.js";
    import compareSort from "@/lib/compareSort.js";
    export default {
        mixins: [compareSort],
        data() {
            return {
                isNewformat:true,//默认新版本
                potentialWellNum:0,//潜力井
                //数据来源,大于０为后台提取
                dataSource: 1,
                initTypes: 1, //进行初始加载
                //油田筛选条件
                ytData: [],
                selYtdm: "", //选中项
                //区块筛选条件
                blockData: [],
                //井组筛选条件
                wellGroupList: [],
                selBlock: "", //选中项
                //附加条件
                searchKeys: "", //区块名模糊查询
                //评价日期条件
                currentDate: "",
                //有推荐措施的井
                recommendedMeasuresWells: {},
                //选中分析项目
                selCode: "",
                selTag: "",
                //开发生产问题监测可用项目
                //指标变化趋势
                trendOfIndicators: [],
                trendOfIndicatorsNum:{
                    allnum:0,
                    zcnum:0,
                    ycnum:0,
                    zczb:0,
                    yczb:0,
                },
                //注水受效分析
                injectionResponseAnalysis: [],
                injectionResponseAnalysisNum:{
                    allnum:0,
                    zcnum:0,
                    ycnum:0,
                    zczb:0,
                    yczb:0,
                },
                //注采平衡
                injectionProductionBalance: [],
                injectionProductionBalanceNum:{
                    allnum:0,
                    zcnum:0,
                    ycnum:0,
                    zczb:0,
                    yczb:0,
                },
                //压力保持
                thePressureToKeep: [],
                thePressureToKeepNum:{
                    allnum:0,
                    zcnum:0,
                    ycnum:0,
                    zczb:0,
                    yczb:0,
                },
                //措施推荐可用项目
                recommendedMeasuresOptions: [],
                //获取措施效果数据
                recommendedMeasuresData: [],
                //油井动态分析详细列表
                tableData: [],
                //指标变化趋势动态表头
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
                Object.assign(this.$data, this.$options.data());
                this.checkCurrentDate(); //初始化评价日期
                this.queryOilFeildList(); //初始化油田
            },
            //更改油田编码
            changeOilFeild(val) {
                let paramMap = {
                    "oilFieldId": val
                };
                this.queryBlockList(paramMap);
            },
            //更改平台编码
            changeBlock(val) {
                this.queryWellGroupList();
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
                let paramMap = {
                    "evalTopic": "",
                    "evalTypeId": "",
                    "fieldId": this.selBlock,
                    "fieldLayerId": "",
                    "fileName": this.searchKeys,
                    "oilFieldId": this.selYtdm,
                    "path": "",
                    "wellGroupId": this.searchKeys,
                    "yearMonth": this.currentDate
                };
                this.queryTrendOfIndicators(paramMap); //指标变化趋势
                this.queryInjectionResponseAnalysis(paramMap); //注水受效分析
                this.queryInjectionProductionBalance(paramMap); //注采平衡
                this.queryThePressureToKeep(paramMap); //压力保持
                this.queryRecommendedMeasures(paramMap); //措施推荐
                this.queryProWellDynamicAnalysisDetail(paramMap); //措施井数据
                //触发初始选中  （测试没有使用，需要异步使用，还需要）
                this.selRadioIterm(this.selCode, this.selTag);
            },
            //指标变化趋势
            queryTrendOfIndicators(request) {
                if (this.dataSource < 1) { //静态数据
                    this.trendOfIndicators = [{
                            code: "tag0",
                            name: "正常",
                            value: 200,
                            wells: "JH1,JH2,JH3,JH4,JH5"
                        },
                        {
                            code: "tag1",
                            name: "液量上升",
                            value: 2,
                            wells: "JH1,JH7"
                        },
                        {
                            code: "tag2",
                            name: "液量下降",
                            value: 2,
                            wells: "JH8,JH5"
                        },
                        {
                            code: "tag3",
                            name: "含水上升",
                            value: 1,
                            wells: "JH2"
                        },
                        {
                            code: "tag4",
                            name: "含水下降",
                            value: 2,
                            wells: "JH3,JH4"
                        },
                        {
                            code: "tag5",
                            name: "泵入口压力上升",
                            value: 0,
                            wells: ""
                        },
                        {
                            code: "tag6",
                            name: "泵入口压力下降",
                            value: 1,
                            wells: "JH4"
                        }
                    ];
                } else { //使用接口
                    indicatorVariationTrendency(request).then((res) => {
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
            //注水受效分析
            queryInjectionResponseAnalysis(request) {
                if (this.dataSource < 1) { //静态数据
                    this.injectionResponseAnalysis = [{
                            code: "tag10",
                            name: "平面水驱不均衡",
                            value: 2,
                            wells: "JH8,JH6"
                        },
                        {
                            code: "tag11",
                            name: "层间水淹差异",
                            value: 2,
                            wells: "JH7,JH9"
                        },
                        {
                            code: "tag12",
                            name: "正常",
                            value: 5,
                            wells: "JH1,JH2,JH3,JH4,JH5"
                        }
                    ];
                } else { //使用接口
                    injectionEffectivity(request).then((res) => {
                        // debugger
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.indicatorAnalysisDetailInfos;
                            this.injectionResponseAnalysisNum.allnum=0;
                            this.injectionResponseAnalysisNum.zcnum=0;
                            this.injectionResponseAnalysisNum.ycnum=0;
                            myData.forEach((el,i)=>{
                                this.injectionResponseAnalysisNum.allnum+=Number(el.value);
                                if(el.name=='正常'){
                                    this.injectionResponseAnalysisNum.zcnum=Number(el.value);
                                }else{
                                    this.injectionResponseAnalysisNum.ycnum+=Number(el.value);
                                }
                            })
                            this.injectionResponseAnalysisNum.zczb=this.injectionResponseAnalysisNum.zcnum/this.injectionResponseAnalysisNum.allnum * 100;
                            this.injectionResponseAnalysisNum.yczb=this.injectionResponseAnalysisNum.yczb/this.injectionResponseAnalysisNum.allnum * 100;
                            this.injectionResponseAnalysis = myData;
                        }
                    });
                }
            },
            //注采平衡
            queryInjectionProductionBalance(request) {
                if (this.dataSource < 1) { //静态数据
                    this.injectionProductionBalance = [{
                            code: "tag21",
                            name: "平衡",
                            value: 200,
                            wells: "JH1,JH2,JH3,JH4,JH5"
                        },
                        {
                            code: "tag22",
                            name: "不平衡",
                            value: 2,
                            wells: "JH3,JH4"
                        }
                    ];
                } else { //使用接口
                    proInjectBalance(request).then((res) => {
                        // debugger
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.indicatorAnalysisDetailInfos;
                            this.injectionProductionBalanceNum.allnum=0;
                            this.injectionProductionBalanceNum.zcnum=0;
                            this.injectionProductionBalanceNum.ycnum=0;
                            myData.forEach((el,i)=>{
                                this.injectionProductionBalanceNum.allnum+=Number(el.value);
                                if(el.name=='正常'){
                                    this.injectionProductionBalanceNum.zcnum=Number(el.value);
                                }else{
                                    this.injectionProductionBalanceNum.ycnum+=Number(el.value);
                                }
                            })
                            this.injectionProductionBalanceNum.zczb=this.injectionProductionBalanceNum.zcnum/this.injectionProductionBalanceNum.allnum * 100;
                            this.injectionProductionBalanceNum.yczb=this.injectionProductionBalanceNum.yczb/this.injectionProductionBalanceNum.allnum * 100;
                            this.injectionProductionBalance = myData;
                        }
                    });
                }
            },
            //压力保持
            queryThePressureToKeep(request) {
                if (this.dataSource < 1) { //静态数据
                    this.thePressureToKeep = [{
                            code: "tag31",
                            name: "好",
                            value: 4,
                            wells: "JH1,JH4,JH5"
                        },
                        {
                            code: "tag32",
                            name: "差",
                            value: 2,
                            wells: "JH3,JH4"
                        }
                    ];
                } else { //使用接口
                    pressureMaintain(request).then((res) => {
                        // debugger
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.indicatorAnalysisDetailInfos;
                            this.thePressureToKeepNum.allnum=0;
                            this.thePressureToKeepNum.zcnum=0;
                            this.thePressureToKeepNum.ycnum=0;
                            myData.forEach((el,i)=>{
                                this.thePressureToKeepNum.allnum+=Number(el.value);
                                if(el.name=='正常'){
                                    this.thePressureToKeepNum.zcnum=Number(el.value);
                                }else{
                                    this.thePressureToKeepNum.ycnum+=Number(el.value);
                                }
                            })
                            this.thePressureToKeepNum.zczb=this.thePressureToKeepNum.zcnum/this.thePressureToKeepNum.allnum * 100;
                            this.thePressureToKeepNum.yczb=this.thePressureToKeepNum.yczb/this.thePressureToKeepNum.allnum * 100;
                            this.thePressureToKeep = myData;
                        }
                    });
                }
            },
            //措施推荐可用项目
            queryRecommendedMeasures(paramMap) {
                if (this.dataSource < 1) { //静态数据
                    this.recommendedMeasuresOptions = [{
                            code: "tagP1",
                            name: "注采调配",
                            value: 2,
                            increase: 0,
                            wells: "JH1,JH4"
                        },
                        {
                            code: "tagP2",
                            name: "调驱调剖",
                            value: 4,
                            increase: 0,
                            wells: "JH8,JH9"
                        },
                        {
                            code: "tagP8",
                            name: "正常生产",
                            value: 20,
                            increase: 0,
                            wells: "JH2,JH5,JH7"
                        }
                    ];
                } else { //使用接口
                    wellGroupRecommendMeasure(paramMap).then((res) => {
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.indicatorAnalysisDetailInfos;
                            this.potentialWellNum=0;
                            myData.forEach((el,i)=>{
                                this.potentialWellNum=Number(el.value);
                            })
                            this.recommendedMeasuresOptions = myData;
                        }
                    });
                }
            },
            //措施推荐可用项目,获取措施效果数据
            queryProWellDynamicAnalysisDetail(paramMap) {
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
                    wellGroupDynamicAnalysisDetail(paramMap).then((res) => {
                        let msg = res.data.msg;
                        if (msg == "success") {
                            let myData = res.data.data.evaluationResults;
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
                    //指标变化趋势 trendOfIndicators
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
                    //注水受效分析 injectionResponseAnalysis
                    for (let j = 0; j < this.injectionResponseAnalysis.length; j++) {
                        let t_data = this.injectionResponseAnalysis[j]; //每个数据项
                        if (val == t_data.code) { //选中项目不需要测试
                            myData[i].injectionResponseAnalysis = t_data.name; //默认
                            //添加详情信息
                            if (t_data.basis == null) {
                                myData[i]['injectionResponseAnalysisMessage'] = '';
                            } else {
                                let messData = t_data.basis.find((item) => {
                                    return item.well == myWellId
                                });
                                myData[i]['injectionResponseAnalysisMessage'] = messData ? messData.message ? messData.message : '' : '';
                            }
                        } else {
                            if (!isNaN(myWellCount[t_data.code])) {
                                t_count = myWellCount[t_data.code];
                            } else {
                                t_count = 0; //初始化
                            }
                            let t_subWells = "," + t_data.wells + ",";
                            if (t_subWells.includes("," + myWellId + ",")) {
                                myData[i].injectionResponseAnalysis = t_data.name; //默认
                                //添加详情信息
                                if (t_data.basis == null) {
                                    myData[i]['injectionResponseAnalysisMessage'] = '';
                                } else {
                                    let messData = t_data.basis.find((item) => {
                                        return item.well == myWellId
                                    });
                                    myData[i]['injectionResponseAnalysisMessage'] = messData ? messData.message ? messData.message : '' : '';
                                }
                                t_count++; //计数
                            }
                            myWellCount[t_data.code] = t_count; //回写
                        }
                    }
                    //注采平衡 injectionProductionBalance
                    for (let j = 0; j < this.injectionProductionBalance.length; j++) {
                        let t_data = this.injectionProductionBalance[j]; //每个数据项
                        if (val == t_data.code) { //选中项目不需要测试
                            myData[i].injectionProductionBalance = t_data.name; //默认
                            //添加详情信息
                            if (t_data.basis == null) {
                                myData[i]['injectionProductionBalanceMessage'] = '';
                            } else {
                                let messData = t_data.basis.find((item) => {
                                    return item.well == myWellId
                                });
                                myData[i]['injectionProductionBalanceMessage'] = messData ? messData.message ? messData.message : '' : '';
                            }
                        } else {
                            if (!isNaN(myWellCount[t_data.code])) {
                                t_count = myWellCount[t_data.code];
                            } else {
                                t_count = 0; //初始化
                            }
                            let t_subWells = "," + t_data.wells + ",";
                            if (t_subWells.includes("," + myWellId + ",")) {
                                myData[i].injectionProductionBalance = t_data.name; //默认
                                //添加详情信息
                                if (t_data.basis == null) {
                                    myData[i]['injectionProductionBalanceMessage'] = '';
                                } else {
                                    let messData = t_data.basis.find((item) => {
                                        return item.well == myWellId
                                    });
                                    myData[i]['injectionProductionBalanceMessage'] = messData ? messData.message ? messData.message : '' : '';
                                }
                                t_count++; //计数
                            }
                            myWellCount[t_data.code] = t_count; //回写
                        }
                    }
                    //压力保持 thePressureToKeep
                    for (let j = 0; j < this.thePressureToKeep.length; j++) {
                        let t_data = this.thePressureToKeep[j]; //每个数据项
                        if (val == t_data.code) { //选中项目不需要测试
                            myData[i].thePressureToKeep = t_data.name; //默认
                            //添加详情信息
                            if (t_data.basis == null) {
                                myData[i]['thePressureToKeepMessage'] = '';
                            } else {
                                let messData = t_data.basis.find((item) => {
                                    return item.well == myWellId
                                });
                                myData[i]['thePressureToKeepMessage'] = messData ? messData.message ? messData.message : '' : '';
                            }
                        } else {
                            if (!isNaN(myWellCount[t_data.code])) {
                                t_count = myWellCount[t_data.code];
                            } else {
                                t_count = 0; //初始化
                            }
                            let t_subWells = "," + t_data.wells + ",";
                            if (t_subWells.includes("," + myWellId + ",")) {
                                myData[i].thePressureToKeep = t_data.name; //默认
                                //添加详情信息
                                if (t_data.basis == null) {
                                    myData[i]['thePressureToKeepMessage'] = '';
                                } else {
                                    let messData = t_data.basis.find((item) => {
                                        return item.well == myWellId
                                    });
                                    myData[i]['thePressureToKeepMessage'] = messData ? messData.message ? messData.message : '' : '';
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
                            //myData[i][t_data.code] = '是';//默认
                        } else {
                            if (!isNaN(myWellCount[t_data.code])) {
                                t_count = myWellCount[t_data.code];
                            } else {
                                t_count = 0; //初始化
                            }
                            let t_subWells = "," + t_data.wells + ",";
                            if (t_subWells.includes("," + myWellId + ",")) {
                                //myData[i][t_data.code] = '是';//默认
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
                //指标变化趋势 trendOfIndicators
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
                        }); //添加动态表头
                    }
                }
                //注水受效分析 injectionResponseAnalysis
                for (let j = 0; j < this.injectionResponseAnalysis.length; j++) {
                    let t_data = this.injectionResponseAnalysis[j]; //每个数据项
                    //获得相关井数
                    if (!isNaN(myWellCount[t_data.code])) {
                        t_count = myWellCount[t_data.code];
                    } else {
                        t_count = 0; //初始化
                    }
                    this.injectionResponseAnalysis[j].value = t_count; //登记条数
                }
                //注采平衡 injectionProductionBalance
                for (let j = 0; j < this.injectionProductionBalance.length; j++) {
                    let t_data = this.injectionProductionBalance[j]; //每个数据项
                    //获得相关井数
                    if (!isNaN(myWellCount[t_data.code])) {
                        t_count = myWellCount[t_data.code];
                    } else {
                        t_count = 0; //初始化
                    }
                    this.injectionProductionBalance[j].value = t_count; //登记条数
                }
                //压力保持 thePressureToKeep
                for (let j = 0; j < this.thePressureToKeep.length; j++) {
                    let t_data = this.thePressureToKeep[j]; //每个数据项
                    //获得相关井数
                    if (!isNaN(myWellCount[t_data.code])) {
                        t_count = myWellCount[t_data.code];
                    } else {
                        t_count = 0; //初始化
                    }
                    this.thePressureToKeep[j].value = t_count; //登记条数
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
            //初始区块下拉选择
            queryBlockList(paramMap) {
                if (this.dataSource < 1) { //静态数据
                    this.blockData = [{
                        fieldId: "",
                        name: '全部'
                    }, {
                        fieldId: 'CEPI',
                        name: "南区"
                    }, {
                        fieldId: 'CEPJ',
                        name: "北区"
                    }];
                    this.selBlock = "CEPI"; //选中
                    this.changeBlock(this.selBlock); //级联条件处理
                } else { //使用接口fetchFields
                    fetchFields(paramMap).then((res) => {
                        let msg = res.data.msg;
                        console.log("=========fetchFields", res);
                        if (msg == "success") {
                            let myData = res.data.data.fields;
                            this.blockData = myData;
                            //初始选中油田
                            if (myData && myData[0]) {
                                this.selBlock = myData[0].fieldId;
                            }
                            this.changeBlock(this.selBlock); //级联条件处理
                        }
                    });
                }
            },
            //初始化井组下拉选择
            queryWellGroupList() {
                let oilFieldId = [];
                if (this.selYtdm == this.selBlock) {
                    this.blockData.forEach((item, index) => {
                        oilFieldId.push(item.fieldId);
                    })
                } else {
                    oilFieldId.push(this.selBlock);
                }
                let request = {
                    oilFieldId: oilFieldId,
                }
                wellGroups(request).then((res) => {
                    if (res.data.code == 200) {
                        this.searchKeys = '';
                        this.wellGroupList = res.data.data.wellGroups;
                        this.wellGroupList.unshift({
                            wellGroupId: '',
                            name: '全部'
                        });
                    }
                });
            },
            //跳转到水井页面
            goWaterWell(val) {
                if (val == "water") {
                    this.$router.push('/singleWellPerformance_water')
                }
            },
            //检查评价日期是否有效
            checkCurrentDate() {
                if (this.currentDate == null || this.currentDate == "" || this.currentDate == undefined) {
                    /*this.currentDate = this.getMyDate(-1);*/
                    this.currentDate = new Date().addDays(-1).format('yyyy-MM-dd');
                }
            },
            //跳转到分析
            openAnalysis(wellNumber) {
                this.$router.push({
                    name: 'wellGroupAnalysisAssistant',
                    params: {
                        oilField: this.selYtdm,
                        block: this.selBlock,
                        wellId: wellNumber,
                    }
                })
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
            ///自定义井号排序
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
                    // height:1240px;
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
                        width: 18px;
                        height:370px;
                        position: absolute;
                        left: 190px;
                        top: 224px;
                    }
                    .img6{
                        width: 18px;
                        height:370px;
                        position: absolute;
                        left: 167px;
                        top: 224px;
                    }
                    .img7{
                        width: 18px;
                        height:370px;
                        position: absolute;
                        left: 212px;
                        top: 224px;
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
                    height:328px;
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
                                        padding:1px;
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
                                    width: 120px;
                                    border-radius:4px;
                                    height:68px;
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
                        .z3{
                            flex:1;
                            display: flex;
                            justify-content: flex-end;
                            .z-row-right{
                                width:250px;
                                height:110px;
                                margin-right:20px;
                                padding:0 20px 0 10px;
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
                                        width:100px;
                                        font-size:12px;
                                        text-align: right;
                                    }
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
                                        padding:1px;
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
                                    width: 120px;
                                    border-radius:4px;
                                    height:68px;
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
    
    ::v-deep .z-radio-group{
        width:100%;
        display:flex;
        flex-wrap:wrap;
        .el-radio-button{
            width:237px;
            margin-right:10px;
        }
        .el-radio-button:nth-child(2n){
            margin-right:0;
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


    ::v-deep .editInput {
        width: 100%;
    }

    ::v-deep .title_1 {
        display: inline-block;
        text-align: center;
    }


    .my-5 {
        &>*:not(span) {
            margin-right: 10px;
        }

        &>span {
            margin-right: 4px;
        }
    }

    .table-fixed {
        ::v-deep .el-table__body-wrapper {
            height: calc(84% - 44px) !important;
        }
    }

    ::v-deep .el-table thead.is-group th {
        background: transparent;
    }
</style>
