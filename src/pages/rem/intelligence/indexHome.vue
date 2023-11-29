<template>
    <!-- 智能注采调配首页 -->
    <!-- 每一个echarts请求都增加了最后一个死数据，有的echarts请求是直接写死，变量注释了，剩余油情况放了一张图片-->
    <!-- 智能注采调配首页 -->
    <div class="app-container" style="height:100%">
        <header-search>
            <div class="my-5" style="margin:20px 0">
                <span>油田：</span>
                <el-select
                    v-model="queryData.ogfId"
                    class="f2"
                    filterable
                    clearable
                    style="width:180px"
                    @change="changeOil"
                >
                    <el-option
                        v-for="item in oilList"
                        :key="item.ogfId"
                        :label="item.ogfName"
                        :value="item.ogfId"
                    ></el-option>
                </el-select>
                <span>区块：</span>
                <el-select v-model="queryData.blockId">
                    <el-option
                        v-for="item in blockList"
                        :key="item.blockId"
                        :label="item.blockName"
                        :value="item.blockId"
                    ></el-option>
                </el-select>
                <span>年度：</span>
                <el-date-picker
                    v-model="queryData.dateTime"
                    type="month"
                    placeholder="请选择"
                    value-format="yyyy-MM"
                    :picker-options="pickOptions"
                ></el-date-picker>
                <el-button
                    @click="searchList"
                    icon="el-icon-search"
                    type="primary"
                    style="margin-left: 20px"
                >搜索
                </el-button>
                <el-button
                    v-if="this.$route.query.link"
                    @click="returnBack"
                    type="primary"
                    style="margin-left: 20px;float: right"
                >返回
                </el-button>
            </div>
        </header-search>
        <div style="display: flex;justify-content: space-around; height: 100%;">
            <div id="scope" style="flex:4; height: 118%; margin-right: 15px;">
                <page-panel :header-title="title" style=" height: 100% " :show-btn="true">
                    <el-button
                        type="primary"
                        class="buttonActive_primary detailLinkBtn"
                        @click="downdata()">下载
                    </el-button
                    >
                    <el-row :gutter="20" style="margin-bottom: 10px;">
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <div class="yield water">
                                    <div class="box">
                                        <div>{{ groupBlock.waterProd }}</div>
                                        <div>10⁴m³</div>
                                    </div>
                                </div>
                                <div class="text">产水量</div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <div class="yield oil">
                                    <div class="box">
                                        <div>{{ groupBlock.oilProd }}</div>
                                        <div>10⁴m³</div>
                                    </div>
                                </div>
                                <div class="text">产油量</div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <div class="yield gas">
                                    <div class="box">
                                        <div>{{ groupBlock.gasProd }}</div>
                                        <div>10⁴m³</div>
                                    </div>
                                </div>
                                <div class="text">产气量</div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <div class="yield liquid">
                                    <div class="box">
                                        <div>{{ groupBlock.fluidProd }}</div>
                                        <div>10⁴m³</div>
                                    </div>
                                </div>
                                <div class="text">产液量</div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <Echart
                                    :chart-data="getEchartData(groupBlock.injAlloc, '10⁴m³', 'rgb(59,197,197)', 'rgb(59,197,197)', 'rgb(59,197,197)')"
                                ></Echart>
                                <div class="chartText">配注量</div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <Echart
                                    :chart-data="getEchartData(groupBlock.inj, '10⁴m³', 'rgb(13,190,124)', 'rgb(1,67,78)', 'rgb(13,190,124)')"
                                ></Echart>
                                <div class="chartText">注水量</div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <Echart
                                    :chart-data="getEchartData(groupBlock.oilWellNum, '口', 'rgb(247,181,0)', 'rgb(41,72,94)', 'rgb(247,181,0)')"
                                ></Echart>
                                <div class="chartText">油井总井数</div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <Echart
                                    :chart-data="getEchartData(groupBlock.waterWellNum, '口', 'rgb(36,151,194)', 'rgb(7,59,90)', 'rgb(36,151,194)')"
                                ></Echart>
                                <div class="chartText">水井总井数</div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <Echart
                                    :chart-data="getEchartData(groupBlock.openOilNUm, '口', 'rgb(36,151,194)', 'rgb(7,59,90)', 'rgb(36,151,194)')"
                                ></Echart>
                                <div class="chartText">油井开井数</div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <Echart
                                    :chart-data="getEchartData(groupBlock.openWaterNum, '口', 'rgb(235, 125, 96)', 'rgb(7,59,90)', 'rgb(235, 125, 96)')"
                                ></Echart>
                                <div class="chartText">水井开井数</div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <Echart
                                    id="chart"
                                    :chart-data="getEchartData(groupBlock.injRatio, '', 'rgb(164, 227, 77)', 'rgb(7,59,90)', 'rgb(164, 227, 77)')"
                                ></Echart>
                                <div class="chartText">注采比</div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <Echart
                                    :chart-data="getEchartData(groupBlock.haveWater, '%', 'rgb(185, 75, 215)', 'rgb(7,59,90)', 'rgb(185, 75, 215)')"
                                ></Echart>
                                <div class="chartText">含水</div>
                            </div>
                        </el-col>
                    </el-row>
                </page-panel>
            </div>

            <div style="flex:4; height: 118%; margin-right: 15px;">
                <page-panel header-title="分层注采量" style="height: 100%;position: relative; " :show-btn="true">
                    <el-button
                        type="primary"
                        class="buttonActive_primary detailLinkBtn"
                        @click="getDetail">详情
                    </el-button
                    >
                    <el-button
                        type="primary"
                        style="right:100px"
                        class="buttonActive_primary detailLinkBtn"
                        @click="downEcharts('chartDom','分层注采量')">下载
                    </el-button
                    >
                    <Echart ref="echartfc" :chart-data="optionfczc" width="100%" height="100%"></Echart>
                </page-panel>
            </div>

            <div style="width: 33%;height: 118%;display:flex;flex-direction: column;justify-content: space-between;">
                <div style="height:calc(60% - 15px);margin-bottom: 15px;">
                    <page-panel header-title="单井井底流压" style="height: 100%;" :show-btn="true">
                        <el-button
                            type="primary"
                            class="buttonActive_primary detailLinkBtn"
                            @click="detailed = true">详情
                        </el-button
                        >
                        <el-button
                            type="primary"
                            style="right:100px"
                            class="buttonActive_primary detailLinkBtn"
                            @click="downEchartssec()">下载
                        </el-button
                        >
                        <Echart
                            :chart-data="getResidueOilChart()"
                            height="100%"
                            ref="echartChart"
                            style="height: 100%!important;"
                        >
                        </Echart>
                    </page-panel>
                    <el-dialog :visible.sync="detailed" title="单井井底流压">
                        <el-table :data="residueOil" height="600">
                            <el-table-column prop="date" label="序号" align="center" width="80">
                                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                            </el-table-column>
                            <el-table-column prop="wellNo" label="井号" align="center">
                            </el-table-column>
                            <el-table-column prop="dhFlowingPress" label="井底流压(MPa)" align="center">
                                <template slot-scope="scope">
                        <span
                            v-if="scope.row.dhFlowingPress !== null && scope.row.dhFlowingPress !== ''">{{
                                scope.row.dhFlowingPress
                            }}</span>
                                    <span v-else>-</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="fluidProdDaily" label="日产液量(m³)" align="center">
                                <template slot-scope="scope">
                        <span
                            v-if="scope.row.fluidProdDaily !== null && scope.row.fluidProdDaily !== ''">{{
                                scope.row.fluidProdDaily
                            }}</span>
                                    <span v-else>-</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-dialog>
                </div>
                <div style="height:40%">
                    <page-panel header-title="超欠注情况统计" style="height: 100%;" :show-btn="true">
                        <el-button
                            type="primary"
                            class="buttonActive_primary detailLinkBtn"
                            @click="doDownExcel()">下载
                        </el-button
                        >
                        <el-table
                            :data="tableData"
                            height="calc(100% - 20px)"
                            style="width: 100%"
                            id="tabledow"
                            :header-cell-style="headerColor"
                        >
                            <el-table-column prop="date" label="序号" align="center" width="50">
                                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                            </el-table-column>
                            <el-table-column prop="wellName" label="井号" min-width="130"
                                             align="center"></el-table-column>
                            <el-table-column prop="productionIntervalNo" label="层位" align="center" min-width="200">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.productionIntervalNo }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="injPump" label="注水工况" align="center">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.injPump }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="overflowInj" align="center" min-width="90">
                                <template slot="header">
                                    超/欠注量<br/>(m³/d)
                                </template>
                                <template slot-scope="scope">
                                    <span>{{ scope.row.overflowInj }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="dayNum" label="天数?(d)" :render-header="renderheader"
                                             min-width="70" align="center"></el-table-column>
                            <el-table-column prop="injAllocRatio" label="比例?(%)" :render-header="renderheader"
                                             min-width="70" align="center"></el-table-column>
                        </el-table>
                    </page-panel>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as echarts from 'echarts';
import Echart from "@/components/tools/Echarts/index.vue";
import {
    getUltraShortShotStatistics,
    getWellGroupBlock,
    getStratifiedInjectionDetails,
    getResidueOilCondotion
} from "@/api/rem/r-intelligentIPA.js";
import {getuserListByUserNames,getFieldListsDetail,getblockData} from "@/api/basic/masterBycoderXu.js"
import FileSaver from 'file-saver'
import queryConditionMixin from "@/mixins/queryConditionMixin.js";
import {exportExcel} from '@/lib/exportExcel.js';
import html2canvas from "html2canvas";

export default {
    name: 'IndexHome',
    components: {
        Echart
    },
    mixins: [queryConditionMixin],
    data() {
        return {
            oilList:[],
            baseUrl: process.env.NODE_ENV == "production" ? '/rem/' : '/',
            queryData: {
                //区块
                blockId: '',
                //选择时间
                dateTime: this.eeee(),
                // dateTime: '2023-05',
                //油田
                ogfId: '',
                orgId:''
            },
            chartDom: '',
            title: '',
            //左侧数据
            groupBlock: {},
            //超欠注情况
            tableData: [],
            detailed: false,
            dataList: [],
            injList: [],
            injAllocList: [],
            fluidProdList: [],
            pickOptions: {
                disabledDate: (time) => {
                    const date = new Date(time)
                    const date1 = new Date()
                    return date.getTime() > date1.getTime()
                }
            },
            residueOil: [],
            ResidueOilRank: [],
            optionfczc: {
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                dataZoom: {
                    start: 0,
                    type: "inside",
                },
                legend: {
                    textStyle: {
                        color: "#989898"
                    },
                    bottom: "bottom",
                },
                grid: {
                    left: '10%',
                    right: '10%',
                    top: '5%',
                    bottom: '5%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 1],
                    axisLabel: {
                        color: '#a9a8a8'
                    },
                },
                yAxis: {
                    type: 'category',
                    data: '',
                    axisLabel: {
                        color: '#a9a8a8'
                    }
                },
                series: [
                    {
                        name: '月注水量(10⁴m³)',
                        type: 'bar',
                        color: 'rgb(9,141,234)',
                        data: '',
                    },
                    {
                        name: '月配注量(10⁴m³)',
                        type: 'bar',
                        color: 'rgb(4,182,131)',
                        data: ''
                    },
                    {
                        name: '月产液量(10⁴m³)',
                        type: 'bar',
                        color: 'rgb(255,156,70)',
                        data: ''
                    }
                ]
            }

        }
    },
    mounted() {
        // this.searchList()
        this.getuserListByUserNamesData()
    },
    methods: {
        changeOil () {
            this.queryData.blockId = "";
            this.queryData.wellId = "";
            this.queryBlockFeild();
        },
        queryBlockFeild () {
            getblockData({ogfId:this.queryData.ogfId}).then((res) => {
                this.blockList = res.blockList;
                this.blockList.forEach(item => {
                    if (item.blockId == this.queryData.blockId) {
                        this.title = item.blockName
                    }
                })
            });
        },
        getuserListByUserNamesData(){
            let params = {
                searchKeys:[this.$store.getters["user/userDetail"].user.userName],
            }
            getuserListByUserNames(params).then((res)=>{
                this.queryData.orgId=res.data.data[0].currentTenantBindOrgId
                this.queryOilFeild()
            })

        },
        queryOilFeild() {
            getFieldListsDetail({orgId:this.queryData.orgId}).then((res) => {
                this.oilList = res.data.data;
                var list =res.data.data;
                for(var i=0;i<list.length;i++){
                    if(list[i].ogfId==='3FC9A818F5BC43B88270DB80BBB3018F'){
                        this.queryData.ogfId=list[i].ogfId
                    }
                }
                this.queryBlockFeild()
            });

        },
        returnBack() {
            this.$router.go(-1)
        },
        downdata() {
            const screenEl = document.getElementById('scope');
            if (this.$store.state.setting.mode === 'dark') {
                screenEl.classList.add('dark-mode');
            }
            this.$nextTick(() => {
                html2canvas(screenEl, {
                    useCORS: true,
                    dpi: 150,
                    scale: 2,
                    height: screenEl.scrollHeight,
                    windowHeight: screenEl.scrollHeight,
                }).then((canvas) => {
                    canvas.toBlob(blob => {
                        const href = window.URL.createObjectURL(new Blob([blob]))
                        const link = document.createElement('a')
                        link.href = href
                        link.download = this.title + '.png'
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                    }, 'image/png')
                    if (this.$store.state.setting.mode === 'dark') {
                        screenEl.classList.remove('dark-mode');
                    }
                })
            })
        },
        doDownExcel() {
            exportExcel('#tabledow', '超欠注情况统计');
        },
        renderheader(h, {column, $index}) {
            return h('span', {}, [
                h('span', {}, column.label.split('?')[0]),
                h('br'),
                h('span', {}, column.label.split('?')[1])
            ]);
        },
        eeee() {
            let data = new Date()
            if (data.getMonth() < 10) {
                return data.getFullYear() + '-0' + (data.getMonth())
            } else {
                return data.getFullYear() + '-' + (data.getMonth())
            }
        },
        headerColor({row, column, rowIndex, columnIndex}) {
            if (rowIndex === 0) {
                return "color:#66ffff"
            }
        },
        /**
         * 获取数据
         */
        searchList() {
            if (!this.queryData.dateTime) {
                return this.$message.error('请输入时间')
            }
            //左侧区块
            this.queryWellGroupBlock()
            //分层注采量
            this.queryStratifiedInjectionDetails()
            //超欠注情况统计
            this.queryUltraShortShotStatistics()
            this.blockList.forEach(item => {
                if (item.blockId == this.queryData.blockId) {
                    this.title = item.blockName
                }
            });
            let params = {
                blockId: this.queryData.blockId,
                yearMonth: this.queryData.dateTime,
            }
            getResidueOilCondotion(params).then(res => {
                try {
                    this.residueOil = res.map(item => {
                        item.dhFlowingPress = item.dhFlowingPress ? Number(item.dhFlowingPress).toFixed(1) : '';
                        item.fluidProdDaily = item.fluidProdDaily ? Math.round(item.fluidProdDaily) : '';
                        return item;
                    });
                } catch (e) {
                }
                const newArray = res.filter(obj => obj.dhFlowingPress != '' && obj.fluidProdDaily != '');
                this.ResidueOilRank = newArray.slice(0, 10);
                this.ResidueOilRank.sort((a, b) => a.dhFlowingPress - b.dhFlowingPress)
            })
        },
        //左侧区块
        queryWellGroupBlock() {
            getWellGroupBlock(this.queryData).then((res) => {
                res.injRatio = res.injRatio == null ? '' : Number(res.injRatio).toFixed(1)
                res.haveWater = res.haveWater == null ? '' : Number(res.haveWater).toFixed(1)
                res.waterProd = res.waterProd == null ? '' : Number(res.waterProd).toFixed(4)
                res.oilProd = res.oilProd == null ? '' : Number(res.oilProd).toFixed(4)
                res.gasProd = res.gasProd == null ? '' : Number(res.gasProd).toFixed(4)
                res.fluidProd = res.fluidProd == null ? '' : Number(res.fluidProd).toFixed(4)
                res.injAlloc = res.injAlloc == null ? '' : Number(res.injAlloc).toFixed(4)
                res.inj = res.inj == null ? '' : Number(res.inj).toFixed(4)
                this.groupBlock = res
                this.getEchartData()
                this.getEchart()
            })
        },
        //分层注采量
        queryStratifiedInjectionDetails() {
            let params = {
                blockId: this.queryData.blockId,
                startTime: this.queryData.dateTime,
                timeStatus: '1',
                type: 1
            }
            getStratifiedInjectionDetails(params).then((res) => {
                let productionIntervalNo = [], inj = [], injAlloc = [], fluidProd = []
                res.forEach((item) => {
                    if (item.productionIntervalNo) {
                        productionIntervalNo.push(String(item.productionIntervalNo))
                        inj.push(Number(item.inj).toFixed(2))
                        injAlloc.push(Number(item.injAlloc).toFixed(2))
                        fluidProd.push(Number(item.fluidProd).toFixed(2))
                    }
                })
                this.optionfczc.yAxis.data = productionIntervalNo
                this.optionfczc.series[0].data = inj
                this.optionfczc.series[1].data = injAlloc
                this.optionfczc.series[2].data = fluidProd
            })
        },

        //超欠注情况统计
        queryUltraShortShotStatistics() {
            getUltraShortShotStatistics(this.queryData).then((res) => {
                this.tableData = res.ultraShortShotData
            })
        },
        getResidueOilChart() {
            let option = {
                legend: {
                    textStyle: {
                        color: this.$store.state.setting.mode == 'dark' ? '#ffffff' : "#000000"
                    },
                    bottom: "bottom",
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '5%',
                    right: '15%',
                    bottom: '5%',
                    top: '5%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'value',
                    name: '日产液量',
                    nameTextStyle: {
                        color: '#a9a8a8'
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    interval: 400,
                    axisLabel: {
                        color: '#a9a8a8'
                    }
                }, {
                    type: 'value',
                    name: '井底流压',
                    nameTextStyle: {
                        color: '#a9a8a8'
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        color: '#a9a8a8'
                    }
                }],
                yAxis: {
                    type: 'category',
                    data: [],
                    axisLabel: {
                        color: '#a9a8a8'
                    }
                }
            };
            if (!this.ResidueOilRank) {
                return option
            } else {
                option.yAxis.data = this.ResidueOilRank.map(item => item.wellNo)
                option.series = [
                    {
                        name: '井底流压(MPa)',
                        type: 'bar',
                        xAxisIndex: 1,
                        color: 'rgb(9,141,234)',
                        data: this.ResidueOilRank.map(item => Number(item.dhFlowingPress).toFixed(1)),
                    },
                    {
                        name: '日产液量(m³)',
                        type: 'bar',
                        xAxisIndex: 0,
                        color: 'rgb(4,182,131)',
                        data: this.ResidueOilRank.map(item => Math.round(Number(item.fluidProdDaily)))
                    }
                ]
            }
            return option
        },
        //图表
        getEchartData(value, unit, valueColor, backColor, centerColor, data) {
            var option = {
                tooltip: {
                    show: false, // 取消提示框的显示
                    trigger: value,
                    formatter: unit,
                },
                series: [
                    {
                        type: 'pie',
                        selectedMode: 'single',
                        radius: [0, '75%'],
                        color: centerColor,
                        label: {
                            fontSize: 14,
                        },
                        animation: false,   //去掉动画效果
                        silent: true,    //不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件
                        hoverAnimation: false,
                        clickable: false,
                        axisPointer: {
                            show: false, // 取消坐标轴指示器的显示
                        },
                        data: [
                            {value: 0, name: value, label: {color: 'white', position: 'center'}},
                            {value: 1, name: unit, label: {color: 'white', position: 'inner'}},
                        ]
                    },
                    {
                        type: 'pie',
                        color: [valueColor, backColor],
                        radius: ['95%', '85%'],
                        labelLine: {
                            length: 30
                        },
                        clickable: false,
                        hoverAnimation: false,
                        axisPointer: {
                            show: false, // 取消坐标轴指示器的显示
                        },
                        label: {
                            fontSize: 12,
                            show: false
                        },
                        data: [
                            {value: 335, name: 'Direct'},
                            {value: 102, name: 'Others'}
                        ]
                    }
                ]
            };
            return option;
        },

        //图表
        getEchart(value, unit, valueColor, backColor, centerColor, data) {
            var option = {
                tooltip: {
                    trigger: value,
                    formatter: unit,
                },
                series: [
                    {
                        type: 'pie',
                        selectedMode: 'single',
                        radius: [0, '75%'],
                        color: centerColor,
                        label: {
                            fontSize: 15,
                        },
                        animation: false,   //去掉动画效果
                        silent: true,    //不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件
                        data: [
                            {value: 0, name: value, label: {color: '#a9a8a8', position: 'center'}},
                            {value: 1, name: unit, label: {color: '#a9a8a8', position: 'inner'}},
                        ]
                    },
                    {
                        type: 'pie',
                        color: [valueColor, backColor, 'transparent'],
                        radius: ['95%', '85%'],
                        startAngle: 180,
                        labelLine: {
                            length: 30
                        },
                        label: {
                            show: false
                        },
                        data: [
                            {value: 9, name: 'Others'},
                            {value: 1, name: 'Direct'},
                            {value: 10, name: '528'},

                        ]
                    }
                ]
            };
            return option;
        },
        downEcharts(dom, fileName) {
            this.$refs.echartfc.chartDownLoad('分层注采量');
        },
        downEchartssec() {
            this.$refs.echartChart.chartDownLoad('单井井底流压');
        },
        //分层注采量详情
        getDetail() {
            localStorage.setItem('INTELLIGENCE', JSON.stringify(this.queryData))
            this.$router.push({name: 'IntelligenceDetail', params: this.queryData})
        }
    },
    computed: {
        getGlobeTheme(val) {
            return this.$store.state.setting.mode;
        },
    },
    watch: {
        getGlobeTheme: {
            handler(Nval) {
                if (Nval == "dark") {
                    this.optionfczc.legend.textStyle.color = "#fff";
                } else {
                    this.optionfczc.legend.textStyle.color = "#000000";
                }
            },
            deep: true,
            immediate: true
        },
    },
}
</script>
<style lang="scss" scoped>
::v-deep .el-radio-button .el-radio-button__inner {
    padding: 10px 5px;
    border-radius: 4px 4px 4px 4px;
    width: 100%;
    background: rgba(143, 164, 204, 0.3);
}

#tabledow {
    ::v-deep .el-table__header-wrapper .cell {
        height: auto;
        line-height: 18px;
        white-space: pre;
    }

    ::v-deep .cell:empty {
        &::before {
            content: "-";
        }
    }
}

.condationRow {
    height: 30px;
    line-height: 30px;
    margin-bottom: 0px;
    font-size: 14px;
}

.checkBtn {
    width: 100px;
    height: 20px;
    text-align: center;
    background: #387dff;
}

.about1 {
    background: #103986;
    background: rgb(2, 43, 117);
}

.about {
    width: 100px;
    height: 20px;
    text-align: center;
    background: #103986;
    background: rgba(56, 125, 255, 0.5);
}

.noCheckBtn {
    width: 100px;
    height: 20px;
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

::v-deep .checkButton {
    width: 100%;
    margin-top: 5px;
}

::v-deep .el-radio-button:last-child .el-radio-button__inner {
    border-radius: 0 0px 0px 0;
    font-size: 14px;
}

::v-deep .cardLeft {
    height: 40px;
    width: 100%;
}

.el-card {
    border-image: linear-gradient(
            90deg,
            rgba(116, 190, 243, 0),
            rgba(75, 241, 255, 0.5),
            rgba(116, 190, 243, 0)
    ) 1 1;
    color: #00d6ea;
    font-weight: bold;
    background: rgba(143, 164, 204, 0.16);

    ::v-deep .el-card__body {
        padding: 0;
        line-height: 40px;
        text-align: center;
    }
}

::v-deep .screenBtn {
    height: 30px;
    margin-left: 10px;
}

::v-deep .el-radio-group .el-radio-button {
    width: 100%;
    border: none;
}

//选中颜色
::v-deep .test .el-radio-group .el-radio-button.is-active {
    width: 100%;
    background: #387dff;
}

.my-5 {
    & > *:not(span) {
        margin-right: 10px;
    }

    & > span {
        margin-right: 4px;
    }
}

::v-deep .el-table thead.is-group th {
    background: transparent;
}

.yield {
    height: 111px;
    border: 1px solid rgb(32, 112, 224);
    border-radius: 5px;
    text-align: center;

    .box {
        margin-top: 40px;
        font-size: 17px;
    }
}

.water {
    background-color: rgb(36, 176, 239);
}

.oil {
    background-color: rgb(25, 120, 227);
}

.gas {
    background-color: rgb(148, 56, 244);
}

.liquid {
    background-color: rgb(24, 121, 228);
}

.text {
    margin-top: 10px;
    height: 42px;
    border: 1px solid rgb(32, 112, 224);
    text-align: center;
    line-height: 42px;
    box-shadow: 0px 0px 15px #66ffff inset;
}

.chart {
    // margin-top: 10px;
    height: 120px !important;
    border-radius: 5px;
    text-align: center;
    line-height: 120px;
}

.chartText {
    margin-top: 10px;
    height: 42px;
    border: 1px solid rgb(32, 112, 224);
    text-align: center;
    line-height: 42px;
    box-shadow: 0px 0px 15px #66ffff inset;
}

.detailLinkBtn {
    position: absolute;
    right: 45px;
    top: 5px;
    width: 50px;
    line-height: 25px;
    padding: 0px !important;
    height: 20px !important;
    font-size: smaller !important;
    text-align: center !important;
}

.downBtn {
    position: absolute;
    right: 50px;
    top: 10px;
    width: 50px;
    height: 20px;
    background: linear-gradient(90deg, #0751b0, #50a6ec);
    text-align: center;
    font-size: smaller;
    border: 0;
    cursor: pointer;
    color: #ffffff;
}

.dark-mode {
    background-color: #02213a;
}
</style>

