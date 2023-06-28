<!-- 开发趋势分析 -->
<template>
    <div class="app-container">
        <headerSearch style="height:80px;">
            <div class="g-row-flex-V g-w100 g-h100">
                <span>油田：</span>
                <el-select v-model="selectOilField" placeholder="请选择" disabled @change="onFieldChange" style="margin-right:20px">
                    <el-option v-for="item in oilField" :key="item.oilFieldId" :label="item.name" :value="item.oilFieldId">
                    </el-option>
                </el-select>
                <span>区块：</span>
                <el-select v-model="selectBlock" placeholder="请选择" style="margin-right:20px">
                    <el-option v-for="item in block" :key="item.fieldId" :label="item.name" :value="item.fieldId"></el-option>
                </el-select>
                <span>拟合起始时间：</span>
                <el-date-picker v-model="selectDate" format="yyyy-MM" value-format="yyyy-MM" type="monthrange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :clearable="false" style="margin-right:20px">
                </el-date-picker>
                <el-button icon="el-icon-search" type="primary" @click="searchThing">搜索</el-button>
                <el-button class="commonBtn" icon="el-icon-refresh" @click="resetting">重置</el-button>
            </div>
        </headerSearch>
        <pagePanelNew style="height: calc(100% - 100px);" class="z-main">
            <div style="padding-top:20px;">
                <span style="margin-left:auto;">单位选择：</span>
                <el-select v-model="selectUnitOfProduction" placeholder="请选择" style="width: 100px;margin-right:20px">
                    <el-option v-for="item in unitOfProduction" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <el-button type="primary" @click="searchThing">确定</el-button>
            </div>
            <!-- <pagePanelNew headerTitle="" style="height:590px;margin-bottom:20px;position: relative;">
                <div style="height:100%;">
                    <Echart :chart-data="lineTable" height="570px"></Echart>
                </div>
            </pagePanelNew> -->
            <Echart :chart-data="lineTable" height="600px" style="margin-bottom:20px;"></Echart>
            
            
            <div style="height: 300px;">
                <div style="padding-bottom:5px;height:100%;">
                    <el-table :data="messageResult" highlight style="width: 100%">
                       <el-table-column prop="message" label="根据历史数据，拟合预测各生产数据后三个月的趋势"> </el-table-column>
                    </el-table>
                </div>
            </div>
        </pagePanelNew>
    </div>
</template>
<script>
    import Echart from '@/components/tools/Echarts/index.vue';
    import {fetchOilFields,fetchFields} from '@/api/oilDeposit/rem-02/primaryinfo.js';
    import {searchDevTrendAnalysis} from '@/api/oilDeposit/rem-03/oilfieldmanageplan.js';
    import {getSearchDevTrendAnalysisDate} from '@/api/oilDeposit/rem-04/developStatus.js';
    export default {
        name:'developmentTrendAnalysis',
        components: {
            Echart,
        },
        data() {
            return {
                //油田
                oilField: [],
                //油田选中值
                selectOilField: [],
                //区块
                block: [],
                //区块选中值
                selectBlock: '全部',
                //产量单位
                unitOfProduction: [
                    {
                        label: 'm³',
                        value: 'm',
                    },
                    {
                        label: 't',
                        value: 't',
                    },
                ],
                //产量单位选择值
                selectUnitOfProduction: 'm',
                warnings: [
                    {
                        name: '全部',
                        value: '',
                    },
                    {
                        name: '产液量预警',
                        value: '7',
                    },
                    {
                        name: '产油量预警',
                        value: '6',
                    },
                    {
                        name: '注水量预警',
                        value: '9',
                    },
                    {
                        name: '含水率预警',
                        value: '8',
                    },
                    {
                        name: '注采比',
                        value: '11',
                    },
                ],
                //最大不能超过次日期
                maxDate:'',
                //选择时间
                selectDate: ['2023-01'],
                //表格数据
                messageResult: [],
                //折线曲线 x轴
                xData: [],
                //折线曲线 y轴1
                yData1: [],
                //折线曲线 y轴2
                yData2: [],
                //折线曲线 y轴3
                yData3: [],
                //折线曲线 y轴4
                yData4: [],
                //折线曲线 y轴5
                yData5: [],
                //折线图
                lineTable: {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        },
                        formatter: function(param) {
                            //排序重点，为了固定当前数据展示位置。
                            param.sort(function(a, b) {
                                return a.seriesIndex - b.seriesIndex;
                            });
                            //返回结果
                            let res = '';
                            //定义索引
                            let isAxisIndex = 0;
                            //日期时间拼接
                            res = res + param[0].axisValue + '<br>';
                            //循环拼接数据
                            for (let i = 0; i < param.length; i++) {
                                let val = param[i];
                                if (val.axisIndex != isAxisIndex) {
                                    isAxisIndex = val.axisIndex;
                                    res = res + '<br>';
                                }
                                res = res + val.marker + val.seriesName + ':' + val.value + '<br>';
                            }
                            return res;
                        },
                    },
                    grid: [
                        {
                            x: '8%',
                            y: '4%',
                            width: '90%',
                            height: '15%'
                        },
                        {
                            x: '8%',
                            y: '22%',
                            width: '90%',
                            height: '15%'
                        },
                        {
                            x: '8%',
                            y: '40%',
                            width: '90%',
                            height: '15%'
                        },
                        {
                            x: '8%',
                            y: '58%',
                            width: '90%',
                            height: '15%'
                        },
                        {
                            x: '8%',
                            y: '76%',
                            width: '90%',
                            height: '15%'
                        },
                    ],
                    axisPointer: {
                        link: {
                            xAxisIndex: 'all',
                        }
                    },
                    // X轴
                    xAxis: [
                        {
                            gridIndex: 0,
                            type: 'category',
                            data: [],
                            textStyle: {
                                fontSize: 14,
                            },
                            axisLabel: {
                                fontSize:12,
                                show: false,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    color: 'rgba(143,164,204,.5)'
                                },
                            },
                        },
                        {
                            gridIndex: 1,
                            data: [],
                            type: 'category',
                            axisLabel: {
                                show: false,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    color: 'rgba(143,164,204,.5)'
                                },
                            },
                        },
                        {
                            gridIndex: 2,
                            data: [],
                            type: 'category',
                            axisLabel: {
                                show: false,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    color: 'rgba(143,164,204,.5)'
                                },
                            },
                        },
                        {
                            gridIndex: 3,
                            data: [],
                            type: 'category',
                            axisLabel: {
                                show: false,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    color: 'rgba(143,164,204,.5)'
                                },
                            },
                        },
                        {
                            gridIndex: 4,
                            data: [],
                            type: 'category',
                            axisLabel: {
                                color: '#8FA4CC',
                                textStyle: {
                                    fontSize: 13,
                                },
                                rotate: 10,
                                verticalAlign:'top'
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                onZero:false,
                                lineStyle: {
                                    color: 'rgba(143,164,204,.5)'
                                },
                            },
                        },
                    ],
                    // y轴
                    yAxis: [
                        {
                            gridIndex: 0,
                            name: '产液量\n（10⁴m³）',
                            nameGap:60,
                            nameLocation: 'center',
                            nameRotate: 0,
                            scale: true,
                            nameTextStyle: {
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(143,164,204,.5)',
                                },
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: 'rgba(143,164,204,.5)',
                                    type: 'dashed',
                                },
                            },
                        },
                        {
                            gridIndex: 1,
                            scale: true,
                            name: '产油量\n（10⁴m³）',
                            nameGap:60,
                            nameLocation: 'center',
                            nameRotate: 0,
                            nameTextStyle: {
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(143,164,204,.5)',
                                },
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: 'rgba(143,164,204,.5)',
                                    type: 'dashed',
                                },
                            },
                        },
                        {
                            gridIndex: 2,
                            scale: true,
                            name: '含水率\n（%）',
                            nameGap:60,
                            nameLocation: 'center',
                            nameRotate: 0,
                            nameTextStyle: {
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(143,164,204,.5)',
                                },
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: 'rgba(143,164,204,.5)',
                                    type: 'dashed',
                                },
                            },
                        },
                        {
                            gridIndex: 3,
                            scale: true,
                            name: '含水上升率\n（%）',
                            nameGap:60,
                            nameLocation: 'center',
                            nameRotate: 0,
                            nameTextStyle: {
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(143,164,204,.5)',
                                },
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: 'rgba(143,164,204,.5)',
                                    type: 'dashed',
                                },
                            },
                        },
                        {
                            gridIndex: 4,
                            scale: true,
                            name: '综合递减率\n（%）',
                            nameGap:60,
                            nameLocation: 'center',
                            nameRotate: 0,
                            nameTextStyle: {
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            axisLabel: {
                                show: true,
                                color: '#8FA4CC',
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(143,164,204,.5)',
                                },
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: 'rgba(143,164,204,.5)',
                                    type: 'dashed',
                                },
                            },
                        },
                    ],
                    series: [
                        {
                            name: '产液量',
                            type: 'line',
                            xAxisIndex: 0,
                            yAxisIndex: 0,
                            data: [],
                            label: {
                                show: false,
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            lineStyle: {
                                color: '#9A72FF',
                            },
                            markArea: {
                                silent: true,
                                data: [[{xAxis: '2020-04'}, {xAxis: '2020-10'}]],
                                itemStyle: {
                                    color: 'rgba(36,222,255,0.22)',
                                },
                            },
                            symbol: 'circle',
                            symbolSize: 5,
                            itemStyle: {
                                color: '#9A72FF',
                                borderColor: 'rgba(255,255,255,0.32)',
                                borderWidth: 2,
                                borderType: 'solid',
                            }
                        },
                        {
                            name: '产油量',
                            type: 'line',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            data: [],
                            label: {
                                show: false,
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            lineStyle: {
                                color: '#3BEC7A',
                            },
                            markArea: {
                                silent: true,
                                data: [[{xAxis: '2020-04'}, {xAxis: '2020-10'}]],
                                itemStyle: {
                                    color: 'rgba(36,222,255,0.22)',
                                },
                            },
                            symbol: 'circle',
                            symbolSize: 5,
                            itemStyle: {
                                color: '#3BEC7A',
                                borderColor: 'rgba(255,255,255,0.32)',
                                borderWidth: 2,
                                borderType: 'solid',
                            }
                        },
                        {
                            name: '含水量',
                            type: 'line',
                            xAxisIndex: 2,
                            yAxisIndex: 2,
                            data: [],
                            label: {
                                show: false,
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            lineStyle: {
                                color: '#24DEFF',
                            },
                            markArea: {
                                silent: true,
                                label: {
                                    position: 'inside',
                                    color: '#24DEFF',
                                    fontSize: 14,
                                },
                                data:[[{name: '预测区',xAxis: '2020-04'},{xAxis: '2020-10'}]],
                                itemStyle: {
                                    color: 'rgba(36,222,255,0.22)',
                                },
                            },
                            symbol: 'circle',
                            symbolSize: 5,
                            itemStyle: {
                                color: '#24DEFF',
                                borderColor: 'rgba(255,255,255,0.32)',
                                borderWidth: 2,
                                borderType: 'solid',
                            },
                        },
                        {
                            name: '含水上升率',
                            type: 'line',
                            xAxisIndex: 3,
                            yAxisIndex: 3,
                            data: [],
                            label: {
                                show: false,
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            lineStyle: {
                                color: '#E9D456',
                            },
                            markArea: {
                                silent: true,
                                data: [[{xAxis: '2020-04'},{xAxis: '2020-10'}]],
                                itemStyle: {
                                    color: 'rgba(36,222,255,0.22)',
                                },
                            },
                            symbol: 'circle',
                            symbolSize: 5,
                            itemStyle: {
                                color: '#E9D456',
                                borderColor: 'rgba(255,255,255,0.32)',
                                borderWidth: 2,
                                borderType: 'solid',
                            }
                        },
                        {
                            name: '综合递减率',
                            type: 'line',
                            xAxisIndex: 4,
                            yAxisIndex: 4,
                            data: [],
                            label: {
                                show: false,
                                color: '#8FA4CC',
                                fontSize: 14,
                            },
                            lineStyle: {
                                color: '#24DEFF',
                            },
                            markArea: {
                                silent: true,
                                data: [[{xAxis: '2020-04'},{xAxis: '2020-10'}]],
                                itemStyle: {
                                    color: 'rgba(36,222,255,0.22)',
                                },
                            },
                            symbol: 'circle',
                            symbolSize: 5,
                            itemStyle: {
                                color: '#24DEFF',
                                borderColor: 'rgba(255,255,255,0.32)',
                                borderWidth: 2,
                                borderType: 'solid',
                            }
                        },
                    ],
                }
            }
        },
        async mounted() {
            await this.getSearchDevTrendAnalysisDateApi();
            await this.initData();
        },
        methods: {
            //重置
            resetting(){
                Object.assign(this.$data, this.$options.data());
                this.initData();
            },
            //获取搜索时间-最大日期
            async getSearchDevTrendAnalysisDateApi(){
                await getSearchDevTrendAnalysisDate().then(res=>{
                    if(res.data.code==200){
                        this.maxDate=res.data.data;
                        this.selectDate.push(this.maxDate)
                    }
                })
            },
            async initData() {
                await fetchOilFields().then((res) => {
                    if (res.data.code == 200) {
                        let data = res.data.data;
                        this.oilField = data.oilFields;
                    }
                });
                this.selectOilField = '3FC9A818F5BC43B88270DB80BBB3018F';
                let oilFieldrequest = {
                    oilFieldId: this.selectOilField,
                };
                await fetchFields(oilFieldrequest).then((res) => {
                    if (res.data.code == 200) {
                        let data = res.data.data.fields;
                        this.block = data;
                        if (this.block.length > 0) {
                            this.selectBlock = this.block[0].fieldId;
                        }
                    }
                });
                this.searchThing();
            },
            //折线图
            charts(fieldId, oilFieldId, beginDate, endDate, unitType) {
                let queryParams = {
                    beginDate: beginDate,
                    endDate: endDate,
                    fieldId: fieldId,
                    oilFieldId: oilFieldId,
                    unitType: unitType,
                };
                searchDevTrendAnalysis(queryParams).then((data) => {
                    if (data.status == 200) {
                        //综合递减
                        let declineChart = data.data.data.declineChart.linearDataSets;
                        //产液率
                        let liquidChart = data.data.data.liquidChart.linearDataSets;
                        //产油率
                        let oilChart = data.data.data.oilChart.linearDataSets;
                        //含水上升
                        let waterContainRaiseChart = data.data.data.waterContainRaiseChart.linearDataSets;
                        //含水率
                        let waterCutChart = data.data.data.waterCutChart.linearDataSets;
                        //描述
                        let MeDate = data.data.data.datas;
                        this.messageResult = MeDate;
                        //找到的对应的方法-产液率
                        //hwh xg 添加判断为空情况
                        if (liquidChart != null || liquidChart != undefined) this.liquidChart(liquidChart[0]);
                        //产油率
                        //hwh xg 添加判断为空情况
                        if (oilChart != null || oilChart != undefined) this.oilChart(oilChart[0]);
                        //含水上升率
                        //hwh xg 添加判断为空情况
                        if (waterContainRaiseChart != null || waterContainRaiseChart != undefined) this.waterContainRaiseChart(waterContainRaiseChart[0]);
                        //含水率
                        //hwh xg 添加判断为空情况
                        if (waterCutChart != null || waterCutChart != undefined) this.waterCutChart(waterCutChart[0]);
                        //综合递减
                        //hwh xg 添加判断为空情况
                        if (declineChart != null || declineChart != undefined) this.declineChart(declineChart[0]);
                    } else {
                        //如果错误，数据表置空
                        this.lineTable.series[0].data = [];
                        this.lineTable.xAxis[0].data = [];
                        this.lineTable.series[1].data = [];
                        this.lineTable.xAxis[1].data = [];
                        this.lineTable.series[2].data = [];
                        this.lineTable.xAxis[2].data = [];
                        this.lineTable.series[3].data = [];
                        this.lineTable.xAxis[3].data = [];
                        this.lineTable.series[4].data = [];
                        this.lineTable.xAxis[4].data = [];
                        this.messageResult = [];
                    }
                });
            },
            //折线图-综合递减
            declineChart(declineChart) {
                let list = declineChart.linearData;
                let x = [];
                let y = [];
                let length = list.length;
                list.forEach((ent, index) => {
                    x.push(ent.label);
                    y.push(ent.value);
                    if (index == length - 1) {
                        // this.lineTable.series[4].markArea.data[0][0].xAxis=ent.label;
                        this.lineTable.series[4].markArea.data[0][0].xAxis = ent.label;
                    } else if (index == length - 3) {
                        this.lineTable.series[4].markArea.data[0][1].xAxis = ent.label;
                    }
                });
                this.lineTable.series[4].data = y;
                this.lineTable.xAxis[4].data = x;
            },
            //折线图-产液
            liquidChart(liquidChart) {
                let list = liquidChart.linearData;
                let x = [];
                let y = [];
                let length = list.length;
                list.forEach((ent, index) => {
                    x.push(ent.label);
                    y.push(ent.value);
                    if (index == length - 1) {
                        this.lineTable.series[0].markArea.data[0][0].xAxis = ent.label;
                    } else if (index == length - 3) {
                        this.lineTable.series[0].markArea.data[0][1].xAxis = ent.label;
                    }
                });
                this.lineTable.series[0].data = y;
                this.lineTable.xAxis[0].data = x;
                if (this.selectUnitOfProduction == 'm') {
                    this.lineTable.yAxis[0].name = '产液量\n（10⁴m³）';
                } else if (this.selectUnitOfProduction == 't') {
                    this.lineTable.yAxis[0].name = '产液量\n（10⁴t）';
                }
            },
            //折线图-产油
            oilChart(oilChart) {
                let list = oilChart.linearData;
                let x = [];
                let y = [];
                let length = list.length;
                list.forEach((ent, index) => {
                    x.push(ent.label);
                    y.push(ent.value);
                    if (index == length - 1) {
                        this.lineTable.series[1].markArea.data[0][0].xAxis = ent.label;
                    } else if (index == length - 3) {
                        this.lineTable.series[1].markArea.data[0][1].xAxis = ent.label;
                    }
                });
                this.lineTable.series[1].data = y;
                this.lineTable.xAxis[1].data = x;
                if (this.selectUnitOfProduction == 'm') {
                    this.lineTable.yAxis[1].name = '产油量\n（10⁴m³）';
                } else if (this.selectUnitOfProduction == 't') {
                    this.lineTable.yAxis[1].name = '产油量\n（10⁴t）';
                }
            },
            //折线图-含水上升率
            waterContainRaiseChart(waterContainRaiseChart) {
                let list = waterContainRaiseChart.linearData;
                let x = [];
                let y = [];
                let length = list.length;
                list.forEach((ent, index) => {
                    x.push(ent.label);
                    y.push(ent.value);
                    if (index == length - 1) {
                        this.lineTable.series[3].markArea.data[0][0].xAxis = ent.label;
                    } else if (index == length - 3) {
                        this.lineTable.series[3].markArea.data[0][1].xAxis = ent.label;
                    }
                });
                this.lineTable.series[3].data = y;
                this.lineTable.xAxis[3].data = x;
            },
            //折线图-含水率
            waterCutChart(waterCutChart) {
                let list = waterCutChart.linearData;
                let x = [];
                let y = [];
                let length = list.length;
                list.forEach((ent, index) => {
                    x.push(ent.label);
                    y.push(ent.value);
                    if (index == length - 1) {
                        this.lineTable.series[2].markArea.data[0][0].xAxis = ent.label;
                    } else if (index == length - 3) {
                        this.lineTable.series[2].markArea.data[0][1].xAxis = ent.label;
                    }
                });
                this.lineTable.series[2].data = y;
                this.lineTable.xAxis[2].data = x;
            },
            //获取油田信息
            getOilFields() {
                let _this = this;
                fetchOilFields().then((res) => {
                    //获得详细信息
                    let data = res.data.data;
                    //获取油田信息
                    _this.oilField = data.oilFields;
                    let a;
                    for (let i in data.oilFields) {
                        // console.log(data.oilFields[i].oilFieldId+data.oilFields[i].name)
                        if (data.oilFields[i].oilFieldId == '3FC9A818F5BC43B88270DB80BBB3018F') {
                            a = i;
                        }
                    }
                    //选择油田默认选中第一个
                    _this.selectOilField = _this.oilField[a].oilFieldId;
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
                    if (res.data.data.fields && res.data.data.fields.length) _this.selectBlock = _this.block[0]
                        .fieldId;
                });
            },
            //根据查询条件进行
            searchThing() {
                //选中区块值
                let fieldId = this.selectBlock;
                //选中油田值
                let oilFieldId = this.selectOilField;
                //开始日期
                let beginDate = this.selectDate[0];
                //结束日期
                let endDate = this.selectDate[1];
                if(endDate>this.maxDate){
                    this.$message.warning(`结束月份不能大于${this.maxDate}`);
                    return false;
                }
                //单位
                let unitType = this.selectUnitOfProduction;
                // 查询图形数据（区块，油田，当前日s期，单位）
                this.charts(fieldId, oilFieldId, beginDate, endDate, unitType);
            },
            //油田内容改变
            onFieldChange(val) {
                this.getFieldsData(val);
            },
        },
    };
</script>

<style lang="scss" scoped>
    .app-container {
        height: 100%;
    }
    ::v-deep .z-main .g-w100:first-child{
        padding-top:0!important;
        overflow-y: scroll; 
    }
</style>
