<!-- 采收率及可采储量预测 -->
<template>
    <div class="app-container" style="height:100%;">
        <header-search style="height: 80px">
            <div class="g-row-flex-V g-w100 g-h100">
                <div style="margin-right:15px;">
                    <span>油田：</span>
                    <el-select v-model="selectOilField" placeholder="请选择" class="f2" disabled @change="changeOilfield">
                        <el-option v-for="item in oilField" :key="item.oilFieldId" :label="item.name" :value="item.oilFieldId">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin-right:15px;">
                    <span>区块：</span>
                    <el-select v-model="selectBlock" placeholder="请选择" class="f2" @change="changeBlock">
                        <el-option v-for="item in block" :key="item.fieldId" :label="item.name" :value="item.fieldId">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <span>层系：</span>
                    <el-select v-model="cx" class="f2" style="width:180px">
                        <el-option v-for="(item,index) in position" :key="index" :label="item.layerName" :value="item.fieldLayerId" :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin-right:15px;">
                    <el-button icon="el-icon-search" type="primary" style="margin-left: 20px" @click="Retrieval">检索</el-button>
                </div>
            </div>
        </header-search>
        <page-panel-new style="height: calc(100% - 100px);">
            <div style="height:100%">
                <el-row style="height:150px;margin-bottom:10px;">
                    <el-table highlight :data="wellPerformanceAnalysis" style="width: 100%" height="calc(100% - 0px)">
                        <el-table-column align="center" prop="name" label="油田(区块)" show-overflow-tooltip></el-table-column>
                        <el-table-column align="center" label="储备状况">
                            <el-table-column align="center" show-overflow-tooltip>
                                <template slot="header">地质储量(10<sup>4</sup>t)</template>
                                <template slot-scope="scoped">
                                    <span>{{ scoped.row.geologyReservoirs!=null ? scoped.row.geologyReservoirs :'-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" show-overflow-tooltip>
                                <template slot="header">可采储量(10<sup>4</sup>t)</template>
                                <template slot-scope="scoped">
                                    <span>{{ scoped.row.recoverableReserves!= null ? scoped.row.recoverableReserves :'-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="采收率(%)" prop="recoveryRatio" show-overflow-tooltip>
                                <template slot-scope="scoped">
                                    <span>{{scoped.row.recoveryRatio | toFixedTwo}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" show-overflow-tooltip>
                                <template slot="header">累产油(10<sup>4</sup>t)</template>
                                <template slot-scope="scoped">
                                    <span>{{ scoped.row.oilSum | toFixedTwo}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" width="120px" show-overflow-tooltip>
                                <template slot="header">目前剩余可采储量(10<sup>4</sup>t)</template>
                                <template slot-scope="scoped">
                                    <span>{{ scoped.row.remainCurrent | toFixedTwo }}</span>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column align="center" label="采出程度">
                            <el-table-column align="center" label="地质储量(%)" prop="geologyReservoirsForOutput" show-overflow-tooltip></el-table-column>
                            <el-table-column align="center" label="可采储量(%)" prop="recoverableReservesForOutput" show-overflow-tooltip></el-table-column>
                        </el-table-column>
                        <el-table-column align="center" label="采油速度">
                            <el-table-column align="center" label="可采储量(%)" prop="recoverableReservesForProSpeed" show-overflow-tooltip></el-table-column>
                            <el-table-column align="center" label="剩余可采储量(%)" prop="recoverableReservesRemainForProSpeed" show-overflow-tooltip></el-table-column>
                        </el-table-column>
                    </el-table>
                </el-row>
                <el-row style="height:32px;margin-bottom:10px;">
                    <el-tabs class="g-pageHeader" v-model="activeName" topline @tab-click="handleClick">
                        <el-tab-pane style="height: auto" v-for="(item, index) in tabs" :key="index" :label="item.label" :name="item.name"></el-tab-pane>
                    </el-tabs>
                </el-row>
                <div v-if="activeName=='waterDrive'" style="height:calc(100% - 202px);overflow-y: scroll;overflow-x: hidden;">
                    <div style="display: flex;align-items: center;margin-bottom:15px;">
                        <span>拟合起始时间：</span>
                        <el-date-picker v-model="dateTime" type="monthrange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
                        <el-radio-group v-model="radio1" style="margin-left:10px;">
                            <el-radio-button label="图表"></el-radio-button>
                            <el-radio-button label="数据"></el-radio-button>
                        </el-radio-group>
                    </div>
                    <el-row style="height:100%" :gutter="20">
                        <el-col :span="14" style="height:100%">
                            <info-window style="margin-top:0;" infoWidth="100%" infoHeight="340px" headerTitle="" isShowMaxBtn>
                                <div style="height:100%" v-if="radio1=='图表'">
                                    <Echart :chart-data="option" height="100%"></Echart>
                                </div>
                                <el-table highlight :data="sjtableDate" height="100%" v-if="radio1=='数据'">
                                    <el-table-column align="center" type="index" label="序号"></el-table-column>
                                    <el-table-column align="center" prop="theDate" label="日期" show-overflow-tooltip></el-table-column>
                                    <el-table-column align="center" prop="x" :label="radioType=='A'?'Np':radioType=='B'?'Np':radioType=='C'?'Lp':radioType=='D'?'Wp':radioType=='YUQITAI'?'lg(Lp/Wp)':'x'"></el-table-column>
                                    <el-table-column align="center" prop="y" :label="radioType=='A'?'lgWp':radioType=='B'?'lgLp':radioType=='C'?'Lp/Np':radioType=='D'?'Lp/Np':radioType=='YUQITAI'?'logNp':'y'"></el-table-column>
                                </el-table>
                            </info-window>
                            <div class="pageHeader" style="width:100%;display: flex;align-items: center;justify-content: space-between;margin-top:10px;margin-bottom:10px;margin-left: 0;">
                                <span>计算结果</span>
                            </div>
                            <el-row style="height:60px;text-align:center;">
                                <el-col :span="12">
                                    <el-row>
                                        <el-col><span style="font-size:30px;color:#24DEFF">{{ sqproOutputRate |toFixedTwo}}</span></el-col>
                                        <el-col><span style="font-size:12px;color:#24DEFF">采收率(%)</span></el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="12">
                                    <el-row>
                                        <el-col><span style="font-size:30px;color:#24DEFF">{{ sqreservoirsAvailable | toFixedTwo }}</span></el-col>
                                        <el-col><span style="font-size:12px;color:#24DEFF">可采储量(10⁴m³)</span></el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="10" style="height:100%">
                            <el-row style="height:100%">
                                <info-window style="margin-top:0;" infoWidth="100%" infoHeight="340px" headerTitle="驱潜类型" isShowMaxBtn>
                                    <div class="z-radioBox">
                                        <el-radio v-model="radioType" label="A" @change="sqtzChart">甲型---lgWp=a+bNp</el-radio>
                                        <el-radio v-model="radioType" label="B" @change="sqtzChart">乙型---lgLp=a+bNp</el-radio>
                                        <el-radio v-model="radioType" label="C" @change="sqtzChart">丙型---Lp/Np=a+bLp</el-radio>
                                        <el-radio v-model="radioType" label="D" @change="sqtzChart">丁型---Lp/Np=a+bWp</el-radio>
                                        <div class="remark">注：Np累产油. Wp累产水. Lp累产液. NR.可动用油储量. q水驱特征参数</div>
                                    </div>
                                </info-window>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
                <div v-if="activeName=='decreasing'" style="height:calc(100% - 202px);overflow-y: scroll;overflow-x: hidden;">
                    <el-row style="height:100%;width: 100%;" :gutter="20">
                        <!---左下-->
                        <el-col :span="24" style="height:100%">
                            <div height="100%">
                                <el-row>
                                    <div style="display: flex;align-items: center;">
                                        <span>拟合起始时间：</span>
                                        <el-date-picker v-model="dateTime1" type="monthrange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM"></el-date-picker>
                                        <el-radio-group v-model="radio2" style="margin-left:15px;">
                                            <el-radio-button label="图表"></el-radio-button>
                                            <el-radio-button label="数据"></el-radio-button>
                                        </el-radio-group>
                                        <span style="margin-left: 20px;">外推时间：</span>
                                        <el-input-number v-model="num1" :min="0" :max="10" label="描述文字" @change="djqxChart" style="margin-right:6px;"></el-input-number>
                                        <span>月</span>
                                    </div>
                                </el-row>
                                <el-row style="margin:10px 0;">
                                    <el-radio-group v-model="radio3" @change="djqxChart()">
                                        <el-radio :label="1">指数递减</el-radio>
                                        <el-radio :label="2">调和递减</el-radio>
                                        <el-radio :label="3">双曲线递减</el-radio>
                                    </el-radio-group>
                                </el-row>
                                <el-row v-if="radio2=='图表'">
                                    <Echart :chart-data="optionTwo" height="300px"></Echart>
                                </el-row>
                                <el-row v-if="radio2=='数据'">
                                    <div style="height:300px">
                                        <el-table highlight :data="djtableDate" height="calc(100% - 40px)">
                                            <el-table-column align="center" type="index" label="序号"></el-table-column>
                                            <el-table-column align="center" prop="theDate" label="日期" show-overflow-tooltip></el-table-column>
                                            <el-table-column align="center" prop="x" label="x"></el-table-column>
                                            <el-table-column align="center" prop="y" label="y"></el-table-column>
                                        </el-table>
                                    </div>
                                </el-row>
                                <div class="pageHeader" style="width:100%;display: flex;align-items: center;justify-content: space-between;margin-top:10px;margin-bottom:10px;margin-left: 0;">
                                    <span>计算结果</span>
                                </div>
                                <el-row style="height:60px;text-align:center;margin-top:10px">
                                    <el-col :span="12">
                                        <el-row>
                                            <el-col><span style="font-size:30px;color:#24DEFF">{{ djproOutputRate | toFixedTwo }}</span></el-col>
                                            <el-col><span style="font-size:12px;color:#24DEFF">采收率(%)</span></el-col>
                                        </el-row>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-row>
                                            <el-col><span style="font-size:30px;color:#24DEFF">{{ djreservoirsAvailable | toFixedTwo }}</span></el-col>
                                            <el-col><span style="font-size:12px;color:#24DEFF">可采储量(10⁴m³)</span></el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                        <!---右下-->
                        <!--<el-col :span="12" style="height:100%">
                              <el-row style="height:20%;">
                                <NormalCard title="数据类型" height="100%">
                                  &lt;!&ndash;<el-radio style="margin-left:10px;margin-top:10px" v-model="radioMonth1" :label="1"
                                            @change="djqxChart()">&ndash;&gt;<span class="fontSpan">月度</span>&lt;!&ndash;</el-radio>&ndash;&gt;
                                </NormalCard>
                              </el-row>
                              <el-row style="height:25%;margin-top:20px">
                                <NormalCard title="预测时间" height="100%">
                                  &lt;!&ndash;<el-radio style="margin-left:10px;margin-top:20px" v-model="radioDate1" :label="1"
                                            @change="djqxChart()">&ndash;&gt;
                                  <span class="fontSpan">外推时间：</span>
                                  &lt;!&ndash;</el-radio>&ndash;&gt;
                                  <el-input-number
                                      v-model="num1"
                                      :min="0"
                                      :max="10"
                                      label="描述文字"
                                      @change="djqxChart()"
                                  ></el-input-number>
                                </NormalCard>
                              </el-row>
                            </el-col>-->
                    </el-row>
                </div>
                <div v-if="activeName=='plateMethod'" style="height:calc(100% - 202px);overflow-y: scroll;overflow-x: hidden;">
                    <el-row style="height:100%;width: 100%;" :gutter="20">
                        <!---左下-->
                        <el-col :span="24" style="height:100%">
                            <div height="100%">
                                <el-row style="margin-bottom:10px;">
                                    <div style="display: flex;align-items: center;">
                                        <span>拟合起始时间：</span>
                                        <el-date-picker v-model="dateTime2" type="monthrange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM"></el-date-picker>
                                        <el-radio-group v-model="radio4" style="margin-left:15px;">
                                            <el-radio-button label="图表"></el-radio-button>
                                            <el-radio-button label="数据"></el-radio-button>
                                        </el-radio-group>
                                    </div>  
                                </el-row>
                                <el-row v-if="radio4 == '图表'">
                                    <Echart :chart-data="optionThree" height="300px"></Echart>
                                </el-row>
                                <el-row v-if="radio4 == '数据'">
                                    <div style="height:300px">
                                        <el-table highlight :data="tstableDate" height="calc(100% - 40px)">
                                            <el-table-column align="center" type="index" label="序号"></el-table-column>
                                            <el-table-column align="center" prop="theDate" label="日期" show-overflow-tooltip></el-table-column>
                                            <el-table-column align="center" prop="x" label="x"></el-table-column>
                                            <el-table-column align="center" prop="y" label="y"></el-table-column>
                                        </el-table>
                                    </div>
                                </el-row>
                                <div class="pageHeader" style="width:100%;display: flex;align-items: center;justify-content: space-between;margin-top:10px;margin-bottom:10px;margin-left: 0;">
                                    <span>计算结果</span>
                                </div>
                                <el-row style="height:60px;text-align:center;margin-top:10px">
                                    <el-col :span="12">
                                        <el-row>
                                            <el-col><span style="font-size:30px;color:#24DEFF">{{ tsproOutputRate | toFixedTwo }}</span></el-col>
                                            <el-col><span style="font-size:12px;color:#24DEFF">采收率(%)</span></el-col>
                                        </el-row>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-row>
                                            <el-col><span style="font-size:30px;color:#24DEFF">{{ tsreservoirsAvailable | toFixedTwo }}</span></el-col>
                                            <el-col><span style="font-size:12px;color:#24DEFF">可采储量(10⁴m³)</span></el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div v-if="activeName=='empiricalFormula'" style="height:calc(100% - 202px);overflow-y: scroll;overflow-x: hidden;">
                    <el-row style="height:100%" :gutter="20">
                        <!---左下-->
                        <el-col :span="12" style="height:100%">
                            <div height="100%">
                                <el-row style="height:90%">
                                    <el-col :span="18" style="margin-left:60px">
                                        <table class="border" style="width:100%;margin-top:20px">
                                            <thead>
                                                <tr>
                                                    <td colspan="2">参数名称</td>
                                                    <td>参数值</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td colspan="2">原油粘度<br>(mPa.s)</td>
                                                    <td>
                                                        <el-input v-model="paramater.thickness" type="text" width="50px"></el-input>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">水平渗透率(10¯²um²)</td>
                                                    <td>
                                                        <el-input v-model="paramater.permeability" type="text" width="50px"></el-input>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">孔隙度(%)</td>
                                                    <td>
                                                        <el-input v-model="paramater.porosity" type="text" width="50px"></el-input>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">井网密度(口/㎞²)</td>
                                                    <td>
                                                        <el-input v-model="paramater.wellDensity" type="text" width="50px"></el-input>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">油层温度</td>
                                                    <td>
                                                        <el-input v-model="paramater.layerTemperature" type="text" width="50px"></el-input>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">油气比(m²/t)</td>
                                                    <td>
                                                        <el-input v-model="paramater.gasOilRatio" type="text" width="50px"></el-input>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">非均质性</td>
                                                    <td>
                                                        <el-input v-model="paramater.heterogeneity" type="text" width="50px"></el-input>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">地层束缚水饱和度</td>
                                                    <td>
                                                        <el-input v-model="paramater.layerWaterSaturation" type="text" width="50px"></el-input>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">原始原油体积系数</td>
                                                    <td>
                                                        <el-input v-model="paramater.oilVolumnFactor" type="text" width="50px"></el-input>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">有效厚度</td>
                                                    <td>
                                                        <el-input v-model="paramater.validThickness" type="text" width="50px"></el-input>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">原始地层压力</td>
                                                    <td>
                                                        <el-input v-model="paramater.originalLayerPressure" type="text" width="50px"></el-input>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">砂岩系数S<sub>k</sub></td>
                                                    <td>
                                                        <el-input v-model="paramater.sk" type="text" width="50px"></el-input>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">渗透率变异系数V<sub>k</sub></td>
                                                    <td>
                                                        <el-input v-model="paramater.variation" type="text" width="50px"></el-input>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">地层油水粘度比μ<sub>r</sub></td>
                                                    <td>
                                                        <el-input v-model="paramater.ur" type="text" width="50px"></el-input>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">过渡带的储量系数</td>
                                                    <td>
                                                        <el-input v-model="paramater.z" type="text" width="50px"></el-input>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">废弃压力MPa</td>
                                                    <td>
                                                        <el-input v-model="paramater.pa" type="text" width="50px"></el-input>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">井控面积</td>
                                                    <td>
                                                        <el-input v-model="paramater.ssmall" type="text" width="50px"></el-input>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </el-col>
                                </el-row>
                                <el-row style="height:10%;margin-top:10px">
                                    <el-col style="margin-left:140px" :span="6">
                                        <el-button type="primary" @click="getExperienceFormulaParameter()">参数读取</el-button>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-button type="primary" @click="jygsChart()">开始计算</el-button>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                        <!---右下-->
                        <el-col :span="12" style="height:100%">
                            <NormalCard height="100%">
                                <el-table height="850px" :data="computingData" highlight>
                                    <el-table-column align="center" prop="formulaName" label="采收率计算方法"></el-table-column>
                                    <el-table-column align="center" prop="recoveryRatio" label="采收率(%)"></el-table-column>
                                    <el-table-column align="center" prop="recoverableReserves" label="可采储量(万吨)"></el-table-column>
                                </el-table>
                            </NormalCard>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </page-panel-new>
    </div>
</template>

<script>
    import {mapState,mapGetters} from 'vuex';
    import Echart from "@/components/tools/Echarts/index.vue";
    import {fetchOilFields,fetchFields,fieldOilLayers} from "@/api/oilDeposit/rem-02/primaryinfo.js";
    import {oilFieldRecoveryRatio, waterDriveChartData,  declineChartData, tongChartData, experienceFormulaCalResult,experienceFormulaParameter} from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
    export default {
        computed:{
            ...mapState({
                mode: state=> state.setting.mode
            })
        },
        watch:{
            mode(val){
                this.option.legend.textStyle.color=val=='dark'?'#fff':'#000';
            },
        },
        components: {Echart},
        filters: {
            //保留4位小数
            toFixedFour(val) {
                if (val) {
                    return parseFloat(Number(val).toFixed(4));
                } else {
                    return '-';
                }
            },
            //保留2位小数
            toFixedTwo(val) {
                if (val) {
                    return parseFloat(Number(val).toFixed(2));
                } else {
                    return '-';
                }
            }
        },
        data() {
            return {
                declineTypeCode: '1',
                sqproOutputRate: "",
                sqreservoirsAvailable: "",
                djproOutputRate: "",
                djreservoirsAvailable: "",
                tsproOutputRate: "",
                tsreservoirsAvailable: "",
                radio1: '图表',
                radio2: '图表',
                radio3: 1,
                radio4: '图表',
                selectOilField: '3FC9A818F5BC43B88270DB80BBB3018F',
                oilField: [],
                selectBlock: '3FC9A818F5BC43B88270DB80BBB3018F',
                block: [],
                cx: '',
                blocks: [],
                //拟合起始时间
                dateTime: [],
                dateTime1: [],
                dateTime2: [],
                //区潜类型
                radioType: 'A',
                //月度
                radioMonth: '0',
                radioMonth1: 1,
                //预测时间
                radioDate: '0',
                radioDate1: '0',
                //预测时间数值
                num: '',
                num1: 0,

                color: ['#1379F7', '#FF5844', '#FF7135', '#00BC9C', '#FF0000', '#FF30AD', '#F5FFA3', '#9A72FF', '#39008D', '#2ACAFF', '#72818B'],

                wellPerformanceAnalysis: [],

                sjtableDate: [],
                djtableDate: [],

                paramater: {},
                //水驱特征曲线曲线
                option: {
                    legend: {
                        top:10,
                        left: 30,
                        textStyle:{
                            color: this.$store.state.setting.mode=='dark'?'#fff':'#000'
                        },
                        data: [],
                        icon: 'rect',
                        itemHeight: 8,
                        itemWidth: 16
                    },
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                    xAxis: {
                        boundaryGap: false,
                        splitNumber: 10,
                        name: "Np 10^4m3",
                        nameLocation: "center",
                        nameTextStyle: {
                            color: "#8FA4CC"
                        },
                        nameGap: 25,
                        type: "value",
                        axisLabel: {
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(151,151,151,.16)",
                            },
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: "rgba(255,255,255,.16)",
                            },
                        },
                    },
                    yAxis: {
                        name: "lgWp",
                        nameLocation: "center",
                        nameTextStyle: {
                            color: "#8FA4CC"
                        },
                        nameGap: 50,
                        type: "value",
                        axisLabel: {
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,.16)",
                            },
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: "rgba(255,255,255,.16)",
                            },
                        },


                    },
                    series: [
                        {
                            data: [],
                            type: 'line',
                            smooth: true,
                            color: '#387DFF',
                            name: "",
                            symbol: "none",
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        width: 5,
                                        type: 'dotted'
                                    }
                                }
                            },
                        },
                        {
                            data: [],
                            type: "line",
                            color: 'red',
                            smooth: true,
                            name: "",
                            symbol: "none",
                        },
                    ]
                },
                //tabs切换值
                activeName: '',
                //标签名称
                tabs: [{
                        label: "水驱特征曲线",
                        name: "waterDrive",
                    },
                    {
                        label: "递减曲线法",
                        name: "decreasing",
                    },
                    {
                        label: "童氏图版法",
                        name: "plateMethod",
                    },
                    {
                        label: "经验公式法",
                        name: "empiricalFormula",
                    },
                ],
                optionTwo: {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                    legend: {
                        left: 30,
                        textStyle: {
                            color: "#24DEFF",
                        },
                        data: [],
                        icon: 'circle',
                        itemHeight: 12,
                    },
                    xAxis: {
                        name: "时间",
                        type: 'category',
                        nameLocation: "center",
                        nameTextStyle: {
                            color: "#8FA4CC"
                        },
                        nameGap: 25,
                        axisLabel: {
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(151,151,151,.16)",
                            },
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: "rgba(255,255,255,.16)",
                            },
                        },
                    },
                    yAxis: {
                        // data:[],
                        name: "日产油量/10*4m³",
                        nameLocation: "center",
                        nameTextStyle: {
                            color: "#8FA4CC"
                        },
                        nameGap: 25,
                        type: "value",
                        axisLabel: {
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,.16)",
                            },
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: "rgba(255,255,255,.16)",
                            },
                        },
                    },
                    series: [{
                            data: [],
                            type: 'line',
                            smooth: true,
                            name: "",
                            symbol: 'none',
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        width: 5,
                                        type: 'dotted'
                                    }
                                }
                            },
                        },
                        {
                            data: [],
                            type: 'line',
                            symbol: 'none',
                            symbolSize: 10,
                            name: "",
                            itemStyle: {
                                color: '#00FFD4	'
                            }
                        },
                    ]
                },
                optionThree: {
                    color: [],
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                        confine: true,
                    },
                    legend: {
                        left: 30,
                        textStyle: {
                            color: "#24DEFF",
                        },
                        data: [],
                        icon: 'rect',
                        itemHeight: 8,
                        itemWidth: 16,
                    },
                    xAxis: {
                        name: "采出程度(%)",
                        nameLocation: "center",
                        nameTextStyle: {
                            color: "#8FA4CC"
                        },
                        nameGap: 25,
                        type: "value",
                        axisLabel: {
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(151,151,151,.16)",
                            },
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: "rgba(255,255,255,.16)",
                            },
                        },
                    },
                    yAxis: {
                        name: "综合含水率(%)",
                        nameLocation: "center",
                        nameTextStyle: {
                            color: "#8FA4CC"
                        },
                        nameGap: 25,
                        type: "value",
                        axisLabel: {
                            color: "#8FA4CC",
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,.16)",
                            },
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: "rgba(255,255,255,.16)",
                            },
                        },
                    },
                    series: [{
                            data: [],
                            name: "",
                            type: "scatter",
                            symbol: 'circle',
                            symbolSize: 8,
                        },
                        {
                            data: [],
                            name: "",
                            type: "line",
                            smooth: true,
                            symbol: "none",
                        },
                        {
                            data: [],
                            name: "",
                            type: "line",
                            smooth: true,
                            symbol: "none",
                        },
                        {
                            data: [],
                            name: "",
                            type: "line",
                            smooth: true,
                            symbol: "none",
                        },
                        {
                            data: [],
                            name: "",
                            type: "line",
                            smooth: true,
                            symbol: "none",
                        },
                        {
                            data: [],
                            name: "",
                            type: "line",
                            smooth: true,
                            symbol: "none",
                        },
                        {
                            data: [],
                            name: "",
                            type: "line",
                            smooth: true,
                            symbol: "none",
                        },
                        {
                            data: [],
                            name: "",
                            type: "line",
                            smooth: true,
                            symbol: "none",
                        },
                        {
                            data: [],
                            name: "",
                            type: "line",
                            smooth: true,
                            symbol: "none",
                        },
                        {
                            data: [],
                            name: "",
                            type: "line",
                            smooth: true,
                            symbol: "none",
                        },
                        {

                            data: [],
                            name: "",
                            type: "line",
                            smooth: true,
                            symbol: "none",
                        },
                        {

                            data: [],
                            name: "",
                            type: "line",
                            smooth: true,
                            symbol: "none",
                        },
                        {

                            data: [],
                            name: "",
                            type: "line",
                            smooth: true,
                            symbol: "none",
                        },
                        {

                            data: [],
                            name: "",
                            type: "line",
                            smooth: true,
                            symbol: "none",
                        },
                        {

                            data: [],
                            name: "",
                            type: "line",
                            smooth: true,
                            symbol: "none",
                        },
                        {

                            data: [],
                            name: "",
                            type: "line",
                            smooth: true,
                            symbol: "none",

                        },

                    ],
                },
                //经验公式表格名称顺序
                formula: ['俞启泰公式', '陈元千公式（1996）', '水驱砂岩油藏相应井网密度', '美国Guthrie和Greenberger', '万吉业公式', 'API公式', 'Кожакин公式', '俄罗斯Гомзиков公式 ', '陈元千公式（1990）', '井网密度', '可采储量经验公式', '辽河油田水驱砂岩'],
                //计算方法数据
                computingData: [],
                //层位列表
                position: [],
            }
        },
        created() {
            //初始化时间,选择tabs值
            let today = new Date();
            let date = {
                year: today.getFullYear(),
                month: today.getMonth() + 1,
            }
            var mon = "";
            if (date.month < 10) {
                mon = date.year + "-0" + date.month;
            } else {
                mon = date.year + "-" + date.month;
            }
            let today1 = new Date().addDays(-30);
            let date1 = {
                year: today1.getFullYear(),
                month: today1.getMonth() + 1,
            }
            var mon1 = "";
            if (date1.month < 10) {
                mon1 = date1.year + "-0" + date1.month;
            } else {
                mon1 = date1.year + "-" + date1.month;
            }
            this.dateTime = [mon1, mon];
            this.dateTime1 = [mon1, mon];
            this.dateTime2 = [mon1, mon];
            this.activeName = 'waterDrive';
            this.dateTime = [new Date().addDays(-365).format('yyyy-MM-dd'), new Date().format('yyyy-MM-dd')];
            this.dateTime1 = [new Date().addDays(-365).format('yyyy-MM-dd'), new Date().format('yyyy-MM-dd')];
            this.dateTime2 = [new Date().addDays(-365).format('yyyy-MM-dd'), new Date().format('yyyy-MM-dd')];
            console.log(this.mode)
            console.log(this.$store.state.setting.mode)
        },
        mounted() {
            //获取油田id
            this.getOilFields();
            //获取区块id
            this.getFieldsData("3FC9A818F5BC43B88270DB80BBB3018F");
            this.getFieldOilLayers();
            this.Retrieval();
        },
        methods: {
            //切换tabs
            handleClick() {
                console.log(this.activeName)
            },
            //获取油田信息
            getOilFields() {
                fetchOilFields().then((res) => {
                    //获得详细信息
                    let data = res.data.data;
                    //获取油田信息
                    this.oilField = data.oilFields;
                    let a;
                    for (let i in data.oilFields) {
                        if (data.oilFields[i].oilFieldId == '3FC9A818F5BC43B88270DB80BBB3018F') {
                            a = i
                        }
                    }
                    //选择油田默认选中第一个
                    this.selectOilField = this.oilField[a].oilFieldId;
                });
            },
            //获得区块信息
            getFieldsData(oilFieldId) {
                let request = {
                    oilFieldId: oilFieldId
                };
                let _this = this;
                fetchFields(request).then((res) => {
                    // 获得数据
                    let data = res.data.data.fields;
                    //获得区块信息
                    _this.block = data;
                    //默认选中第一个区块信息
                    _this.selectBlock = _this.block[0].fieldId;
                });
            },
            //获得层位信息
            getFieldOilLayers() {
                let request = {
                    oilFieldId: this.selectOilField,
                    fieldId: this.selectBlock,
                    wellId: '',
                }
                fieldOilLayers(request).then((res) => {
                    if (res.data.code == 200) {
                        //层段数据
                        if (res.data.data) {
                            this.position = res.data.data.fieldLayers;
                        } else {
                            this.position = [];
                        }
                    }
                })
            },
            //检索
            Retrieval() {
                let request = {
                    fieldId: this.selectBlock,
                    oilFieldId: this.selectOilField,
                }
                this.wellPerformanceAnalysis = [];
                oilFieldRecoveryRatio(request).then((res) => {
                    let data = res.data.data.recoveryRatioInfos;
                    this.wellPerformanceAnalysis = data;
                });
                this.sqtzChart();
                this.djqxChart();
                this.tstbChart();
                this.jygsChart();
            },
            //水驱特征曲线
            sqtzChart() {
                let predictDays = "0";
                let request = {
                    beginDate: this.dateTime[0],
                    endDate: this.dateTime[1],
                    fieldId: this.selectBlock,
                    oilFieldId: this.selectOilField,
                    timeGranularityTypeCode: this.radioMonth,
                    predictDays: predictDays,
                    waterDriveCode: this.radioType,
                }
                waterDriveChartData(request).then((res) => {
                    if (res.data.code == 200) {
                        let data = res.data.data.chart;
                        let sjdata = res.data.data.statChartDatas;
                        this.sqproOutputRate = res.data.data.proOutputRate;
                        this.sqreservoirsAvailable = res.data.data.reservoirsAvailable;
                        this.sjtableDate = sjdata;
                        this.option.legend.data = [data.bubbleDataSets[0].label, data.lineChartDataSets[0].label];
                        this.option.series[0].name = data.bubbleDataSets[0].label;
                        let list = data.bubbleDataSets[0].bubblePoints;
                        // let length = data.bubbleDataSets[0].bubblePoints.length;
                        let seriesData = [];
                        list.forEach((ent, index) => {
                            let dd = [ent.x, ent.y];
                            seriesData.push(dd);
                        })
                        this.option.series[0].data = seriesData;

                        this.option.series[1].name = data.lineChartDataSets[0].label;
                        let list1 = data.lineChartDataSets[0].numberPoints;
                        //let length1 = data.lineChartDataSets[0].numberPoints.length;
                        let seriesData1 = [];
                        list1.forEach((ent, index) => {
                            let dd = [ent.x, ent.y];
                            seriesData1.push(dd);
                        })
                        this.option.xAxis.name = (this.radioType == 'A' ? 'Np' : this.radioType == 'B' ? 'Np' : this.radioType == 'C' ? 'Lp' : this.radioType == 'D' ? 'Wp' : this.radioType == 'YUQITAI' ? 'lg(Lp/Wp)' : 'x');
                        this.option.yAxis.name = (this.radioType == 'A' ? 'lgWp' : this.radioType == 'B' ? 'lgLp' : this.radioType == 'C' ? 'Lp/Np' : this.radioType == 'D' ? 'Lp/Np' : this.radioType == 'YUQITAI' ? 'logNp' : 'y');
                        this.option.series[1].data = seriesData1;
                    } else {
                        this.option.legend.data = [];
                        this.option.series[0].data = [];
                        this.option.series[1].name = [];
                        this.option.series[1].data = [];
                    }
                });
            },
            //递减曲线法
            djqxChart() {
                let predictDays = "0";
                predictDays = this.num1;
                let request = {
                    beginDate: this.dateTime1[0] + '-01',
                    endDate: this.dateTime1[1] + '-01',
                    declineTypeCode: this.radio3,
                    fieldId: this.selectBlock,
                    oilFieldId: this.selectOilField,
                    predictDays: predictDays,
                    timeGranularityTypeCode: this.radioMonth,
                };
                declineChartData(request).then((res) => {
                    let data = res.data.data.chart;
                    this.optionTwo.legend.data = [data.linearDataSets[0].label, data.linearDataSets[1].label];
                    this.optionTwo.series[0].name = data.linearDataSets[0].label;

                    let charlen = data.linearDataSets.length;
                    for (var i = 0; i < charlen; i++) {
                        this.optionTwo.series[i].name = data.linearDataSets[i].label;
                        let list = data.linearDataSets[i].linearData;
                        let length = data.linearDataSets[i].linearData.length;
                        let seriesData = [];
                        list.forEach((ent, index) => {
                            if (index < length) {
                                let dd = [list[index].label, list[index].value];
                                seriesData.push(dd);
                            }
                        });
                        this.optionTwo.series[i].data = seriesData;
                    }


                    let djdata = res.data.data.statChartDatas;
                    this.djproOutputRate = res.data.data.proOutputRate;
                    this.djreservoirsAvailable = res.data.data.reservoirsAvailable;
                    this.djtableDate = djdata;
                });
            },
            //童氏图版法
            tstbChart() {
                let request = {
                    beginDate: this.dateTime1[0] + '-01',
                    endDate: this.dateTime1[1] + '-01',
                    fieldId: this.selectBlock,
                    oilFieldId: this.selectOilField,

                };

                tongChartData(request).then((res) => {
                    if (res.data.code == 200) {
                        let data = res.data.data.chart;
                        let tsdata = res.data.data.statChartDatas;
                        this.tstableDate = tsdata;
                        this.tsproOutputRate = res.data.data.proOutputRate;
                        this.tsreservoirsAvailable = res.data.data.reservoirsAvailable;

                        //        let colorlen = data.lineChartDataSets.length;
                        //        let colotlist = data.lineChartDataSets;

                        this.optionThree.legend.data = [data.bubbleDataSets[0].label, data.lineChartDataSets[0].label, data.lineChartDataSets[1].label, data.lineChartDataSets[2].label,
                            data.lineChartDataSets[3].label, data.lineChartDataSets[4].label, data.lineChartDataSets[5].label, data.lineChartDataSets[6].label, data.lineChartDataSets[7].label,
                            data.lineChartDataSets[8].label, data.lineChartDataSets[9].label, data.lineChartDataSets[10].label, data.lineChartDataSets[11].label, data.lineChartDataSets[12].label, data.lineChartDataSets[13].label
                        ];
                        this.optionThree.series[0].name = data.bubbleDataSets[0].label;
                        let charlen = data.lineChartDataSets.length;
                        console.log(charlen);
                        for (var j = 0; j < charlen; j++) {
                            this.optionThree.series[j + 1].name = data.lineChartDataSets[j].label;

                        }

                        let list = data.bubbleDataSets[0].bubblePoints;
                        let length = data.bubbleDataSets[0].bubblePoints.length;
                        let seriesData = [];
                        list.forEach((ent, index) => {
                            if (index < length) {
                                let dd = [list[index].x, list[index].y];
                                seriesData.push(dd);
                            }
                        });
                        this.optionThree.series[0].data = seriesData;

                        for (var x = 0; x < charlen; x++) {
                            let list1 = data.lineChartDataSets[x].numberPoints;
                            let length1 = data.lineChartDataSets[x].numberPoints.length;
                            let seriesData1 = [];
                            list1.forEach((ent, index) => {
                                if (index < length1) {
                                    let dd = [list1[index].x, list1[index].y];
                                    seriesData1.push(dd);
                                }
                            });
                            this.optionThree.series[x + 1].data = seriesData1;
                        }
                    } else {
                        this.optionThree.legend.data = [];
                        let serieslist = this.optionThree.series;
                        serieslist.forEach((item, index) => {
                            item.name = '';
                            item.data = [];
                        })
                    }
                });
            },
            //经验公式法
            jygsChart() {
                /*this.paramater.k=1.1;
                this.paramater.kplus=1.1;*/
                let request = {
                    beginDate: this.dateTime2[0] + '-01',
                    endDate: this.dateTime2[1] + '-01',
                    experienceFormulaParameter: this.paramater,
                    fieldId: this.selectBlock,
                    oilFieldId: this.selectOilField,
                };
                // console.log(request);
                experienceFormulaCalResult(request).then((res) => {
                    if (res.data.code == 200) {
                        let data = res.data.data.experienceFormulaCalResults;
                        // console.log(data);
                        this.computingData = [];
                        this.formula.forEach((point, index) => {
                            let zb = data.find((item) => {
                                return item.formulaName == point
                            });
                            if (zb) {
                                this.computingData.push(zb);
                            } else {
                                this.computingData.push({
                                    formulaName: point
                                })
                            }
                        });
                    } else {
                        this.computingData = this.formula.map((item) => {
                            return {
                                formulaName: item
                            }
                        });
                    }
                }).catch((error) => {
                    this.computingData = this.formula.map((item) => {
                        return {
                            formulaName: item
                        }
                    });
                });
            },
            //获得经验参数
            getExperienceFormulaParameter() {
                let request = {
                    oilFieldId: this.selectOilField,
                    fieldId: this.selectBlock,
                    fieldLayerId: this.fieldLayerId,
                }
                experienceFormulaParameter(request).then((res) => {
                    if (res.data.code == 200) {
                        this.paramater = res.data.data.experienceFormulaParameter;
                    }
                });

            },
            //改变油田信息
            changeOilfield(val) {
                this.selectBlock = '';
                this.block = [];
                this.cx = '';
                this.position = [];
                this.getFieldsData(val);
            },
            //改变区块信息
            changeBlock(val) {
                this.cx = '';
                this.position = [];
                this.getFieldOilLayers();
            },
        }
    }
</script>

<style lang="scss" scoped>
    .z-radioBox{
        padding-top:20px;
        padding-left:20px;
        .el-radio{
            margin-bottom:10px;
        }
        .remark{
            color:#CD3D00;
        }
    }
    table>tbody>tr>td {
        text-align: center
    }
    ::v-deep .el-table .cell:empty::before {
        content: '-';
    }
</style>
