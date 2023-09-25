<template>
    <div style="height:100%">
        <header-search height="auto;">
            <div class="my-5" style="margin-top:20px;margin-bottom:20px;">
                <span>油田：</span>
                <el-select
                    v-model="queryData.ogfId"
                    class="f2"
                    filterable
                    disabled
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
                <span>时间：</span>
                <el-date-picker
                    v-model="queryData.dateTime"
                    type="month"
                    placeholder="请选择"
                    value-format="yyyy-MM"
                ></el-date-picker>
                <el-button
                    icon="el-icon-search"
                    type="primary"
                    style="margin-left: 20px"
                    @click="queryBut"
                >搜索
                </el-button>
                <el-button class="commonBtn" @click="refresh" icon="el-icon-refresh"> 重置</el-button>
                <el-button
                    type="primary"
                    style="float: right"
                    @click="returnroute"
                >返回
                </el-button>
                <span class="fangan">
          <!-- <el-radio v-model="radio" label="1">小层配注优先</el-radio>
          <el-radio v-model="radio" label="2">整井配注优先</el-radio>-->
        
        </span>
            </div>
        </header-search>

        <pagePanelNew style="height: calc(100% - 100px)">
            <el-radio-group v-model="radio" @input="qq">
                <el-radio label="1">小层配注优先</el-radio>
                <el-radio label="2">整井配注优先</el-radio>
            </el-radio-group>
            <el-row :gutter="20" style="height: calc(100% - 20px)">
                <el-col :span="6" style="height: 100%">
                    <pagePanel headerTitle="指定单井产量" style="height:calc(100% - 10px );" show-btn>
                        <div align="left">
                            <el-button type="primary" align="left" icon="el-icon-edit" @click="modify1 = true">修改
                            </el-button>
                            <el-button type="primary" :loading="saveWellLoad" icon="el-icon-bank-card"
                                       @click="handleSubmit1">保存
                            </el-button>
                        </div>
                        <el-table
                            :data="tableData1"
                            id="indexscv"
                            highlight
                            height="calc(100% - 50px)"
                            style="margin-top: 10px"
                            :header-cell-style="tableColor"
                            :cell-style="tableColorone"
                        >
                            <el-table-column
                                prop="wellName"
                                label="生产井"
                                show-overflow-tooltip
                                align="center"
                                width="150"
                            ></el-table-column>
                            <el-table-column
                                prop="fluidProd"
                                label="上月日均产液量?(m³/d)"
                                :render-header="renderheader"
                                show-overflow-tooltip
                                width="120"
                                align="center"
                            ></el-table-column>
                            <el-table-column
                                prop="allocating"
                                label="本月日配产量?(m³/d)"
                                width="115"
                                :render-header="renderheader"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    <el-input type="number" v-if="modify1" v-model="scope.row.allocating"/>
                                    <span v-else>{{ scope.row.allocating }}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </pagePanel>
                </el-col>

                <el-col :span="10" style="height: 100%">
                    <pagePanel headerTitle="指定注采比" style="height: calc(100% - 10px);" show-btn>
                        <div class="buttonBox" align="left">
                            <el-button type="primary" icon="el-icon-edit" @click="queryEdit">修改</el-button>
                            <el-button type="primary" icon="el-icon-bank-card" @click="handleSubmit2('form')"
                                       :loading="saveInLoad">保存
                            </el-button>
                        </div>
                        <el-form ref="form" :rules="rules" label-width="100px" style="height: 100%" :model="form">
                            <el-table
                                v-if="radio == 1"
                                :data="form.tableData2"
                                id="indexscv"
                                highlight
                                style="margin-top: 10px;"
                                :cell-style="tableColorone"
                                :header-cell-style="tableColor1"
                                :span-method="arrheader"
                                height="calc(100% - 40px)"
                            >
                                <!-- :span-method="arrheader" -->
                                <el-table-column prop="injWellNo" label="水井井号" width="150"
                                                 align="center">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.injWellNo.includes("秦皇岛32-6")? scope.row.injWellNo.replace("秦皇岛32-6", "QHD32-6") : scope.row.injWellNo}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="layerNo" label="层位名称" align="center"
                                                 width="220"></el-table-column>
                                <el-table-column
                                    prop="oilWellNo"
                                    show-overflow-tooltip
                                    label="油井井号"
                                    width="150"
                                    align="center"
                                >
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.oilWellNo.includes("秦皇岛32-6")? scope.row.oilWellNo.replace("秦皇岛32-6", "QHD32-6") : scope.row.oilWellNo}}</span>
                                    </template>  
                                </el-table-column>
                                <el-table-column
                                    :render-header="renderheader"
                                    width="90"
                                    prop="oilSplitData"
                                    label="油井配产量?(m³/d)"
                                    align="center"
                                ></el-table-column>
                                <el-table-column
                                    prop="groupInjRatio"
                                    label="注采比"
                                    show-overflow-tooltip
                                    align="center"
                                >
                                    <template slot-scope="scope">
                                        <el-form-item
                                            v-if="modify2"
                                            :prop="'tableData2.'+scope.$index+'.groupInjRatio'"
                                            :rules="rules.groupInjRatio"
                                        >
                                            <el-input type="number" v-model="scope.row.groupInjRatio"
                                                      @input="handleInput(scope.row)"/>
                                        </el-form-item>
                                        <span v-else>{{ scope.row.groupInjRatio }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    :render-header="renderheader"
                                    prop="injSplitData"
                                    label="水井配注量?(m³/d)"
                                    width="90"
                                    align="center"
                                >
                                </el-table-column>
                            </el-table>
                            <el-table
                                v-if="radio == '2'"
                                :data="form.tableData2"
                                id="indexscv"
                                highlight
                                :span-method="arrheader1"
                                style="margin-top: 10px"
                                height="calc(100% - 40px)"
                            >
                                <!-- :span-method="arrheader1" -->
                                <el-table-column prop="injWellNo" label="水井井号" align="center"
                                                 min-width="160">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.injWellNo.includes("秦皇岛32-6")? scope.row.injWellNo.replace("秦皇岛32-6", "QHD32-6") : scope.row.injWellNo}}</span>
                                    </template>   
                                </el-table-column>
                                <el-table-column prop="oilSplitData" align="center">
                                    <template slot="header">
                                        <p>
                                            生产井配产
                                            <br/>(m³/d)
                                        </p>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="groupInjRatio" label="给定注采比" align="center">
                                    <template slot-scope="scope">
                                        <el-form-item
                                            v-if="modify4"
                                            :prop="'tableData2.'+scope.$index+'.groupInjRatio'"
                                            :rules="rules.groupInjRatio"
                                        >
                                            <el-input type="number" v-model="scope.row.groupInjRatio"/>
                                        </el-form-item>
                                        <span v-else>{{ scope.row.groupInjRatio }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="injSplitData"
                                    label="注水井配注?(m³/d)"
                                    align="center"
                                    :render-header="renderheader"
                                ></el-table-column>
                            </el-table>
                        </el-form>
                    </pagePanel>
                </el-col>

                <el-col :span="8" style="height: 100%" >
                    <pagePanel headerTitle="预测结果"
                               style="height:50%;margin-bottom: 20px;overflow-y: hidden" show-btn
                    >

                        <div style="display: flex; margin: 3px 10px 0 10px;justify-content: end;">
                            <el-button
                                align="right"
                                style="width: 29%; line-height:14px;"
                                class="button"
                                icon="el-icon-document"
                                :disabled="!tableData3.length"
                                @click="viewDetail"
                            >查看方案
                            </el-button>
                        </div>

                        <div style="display: flex;justify-content: space-between;" v-if="yucejieguo!==''">
                            <el-button align="left" style="width: 100%;">{{ yucejieguo }}</el-button>
                        </div>
                        <el-table :data="tableData3" id="indexscv" highlight
                                  height="calc(100% - 80px)"
                                  style="margin-top: 10px;max-height: 430px;overflow-y: auto;">
                            <el-table-column prop="layerNo" label="层名" show-overflow-tooltip min-width="200"
                                             align="center"></el-table-column>
                            <el-table-column prop="layerConfigurationInj" label="层配注量(m³/d)" align="center">
                                <template slot="header">
                                    <p>
                                        层配注量
                                        <br/>(m³/d)
                                    </p>
                                </template>
                            </el-table-column>
                            <el-table-column prop="layerRatio" label="层注采比" align="center"></el-table-column>
                        </el-table>
                    </pagePanel>
                    <pagePanelNew style="height: 45%;" show-btn>
                        <el-button type="text" class="foreBtn">预测结果</el-button>
                        <Echart height="100%" :chart-data="getEchart()"></Echart>
                    </pagePanelNew>
                </el-col>
            </el-row>
        </pagePanelNew>
    </div>
</template>
<script>
import Echart from "@/components/tools/Echarts/index.vue";
import {
    getWellAvgFluidProdAlloc,
    getWellInjRatio,
    getWellGuessResult,
    wellAvgFluidProdAllocUpdate
} from '@/api/rem/r-intelligentIPA.js'
import queryConditionMixin from "@/mixins/queryConditionMixin.js";
import {arrayFindAll} from "@/lib/arrayFind";

export default {
    components: {
        Echart
    },
    mixins: [queryConditionMixin],
    data() {
        return {
            queryData: {
                ogfId: this.$route.params.ogfId,
                blockId: this.$route.params.blockId,
                dateTime: this.$route.params.dateTime,
                // '2022-10'
            },
            modify1: false,
            modify2: false,
            modify3: false,
            modify4: false,
            radio: '1',
            //指定单井产量
            tableData1: [],
            //指定注采比
            form: {
                tableData2: []
            },
            ying: [],
            //预测结果
            tableData3: [],
            //图表-层配注量
            layerConfigurationInj: [],
            //图表-层配产量
            layerOilSplitData: [],
            //图表-层注采比
            layerRatio: [],
            rules: {
                groupInjRatio: [
                    // { type: 'string', required: true, pattern: /^((^[1-9])\.([0-9]{1,2})$)|^((^[1-9])$)|^(([1-9])\.([0-9])$)|^(([1-9])$)/, message: '输入不正确', }
                ],
            },
            spanArr: [],
            yucejieguo: '',
            mergeArr: ['injWellNo', 'layerNo', 'oilSplitData',],
            mergeObj: {},
            saveWellLoad: false,
            saveInLoad: false
        }
    },
    created() {
        const params = JSON.parse(localStorage.getItem('OPTIMIZATION'))
        if (params && params.ogfId) {
            this.queryData.ogfId = params.ogfId
            this.queryData.blockId = params.blockId
            this.queryData.dateTime = params.dateTime
        }
        this.queryWellAvgFluidProdAlloc();
    },
    methods: {
        eeee() {
            let data = new Date()
            if (data.getMonth() < 10) {
                return data.getFullYear() + '-0' + data.getMonth()
            } else {
                return data.getFullYear() + '-' + data.getMonth()
            }
        },
        groupBy(data) {
            this.mergeArr.forEach((key, index1) => {
                let count = 0;
                this.mergeObj[key] = []
                data.forEach((item, index) => {
                    if (index === 0) {
                        this.mergeObj[key].push(1)
                    } else {
                        if (item[key] === data[index - 1][key]) {
                            this.mergeObj[key][count] += 1;
                            this.mergeObj[key].push(0)
                        } else {
                            count = index
                            this.mergeObj[key].push(1)
                        }
                    }
                })
            })
        },
        arrheader({row, column, rowIndex, columnIndex}) {
            if (columnIndex === 0) {
                if (row.wellIndex == 0) {
                    return {
                        rowspan: row.wellRowspan,
                        colspan: 1
                    }
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    }
                }
            }
            if (columnIndex == 1 || columnIndex == 3 || columnIndex == 4 || columnIndex == 5) {
                if (row.layerIndex == 0) {
                    return {
                        rowspan: row.layerRowspan,
                        colspan: 1
                    }
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    }
                }
            }
        },
        arrheader1({row, column, rowIndex, columnIndex}) {
            if (columnIndex === 0) {
                if (row.wellIndex == 0) {
                    return {
                        rowspan: row.wellRowspan,
                        colspan: 1
                    }
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    }
                }
            }
        },
        qq() {
            this.form.tableData2 = []
            this.tableData3 = []
            this.queryWellInjRatio()
        },
        queryBut() {
            this.queryWellAvgFluidProdAlloc()
        },
        queryEdit() {
            if (this.radio == '1') {
                this.modify2 = true
            } else {
                this.modify4 = true
            }

        },
        renderheader(h, {column, $index}) {
            return h('span', {}, [
                h('span', {}, column.label.split('?')[0]),
                h('br'),
                h('span', {}, column.label.split('?')[1])
            ]);
        },
        tableColor({row, column, rowIndex, columnIndex}) {
            if (rowIndex === 0 && columnIndex === 2) {
                return "color:#66ffff"; //修改的样式
            }

            if (rowIndex === 0 && columnIndex === 4) {
                return "color:#66ffff"; //修改的样式
            }
        },
        tableColor1({row, column, rowIndex, columnIndex}) {
            if (rowIndex === 0 && columnIndex === 4) {
                return "color:#66ffff"; //修改的样式
            }
        },
        tableColorone({row, column, rowIndex, columnIndex}) {
            if (
                column.label === "本月日配产量?(m³/d)" ||
                column.label === "注采比"
            ) {
                return "color:#66ffff"; //修改的样式
            } else {
                return "";
            }
        },
        //指定单井产量
        queryWellAvgFluidProdAlloc() {
            let params = {
                blockId: this.queryData.blockId,
                dateTime: this.queryData.dateTime,
            }
            getWellAvgFluidProdAlloc(params).then(({wellDataList}) => {
                const storeList = []
                wellDataList.forEach(item => {
                    item.fluidProd = Math.floor(item.fluidProd)
                    item.allocating = Math.floor(item.allocating)
                    storeList.push({wellName: item.wellName, allocating: item.allocating})
                })
                localStorage.setItem('SINGLEWELL_TABLE', JSON.stringify(storeList))
                this.tableData1 = wellDataList
                this.queryWellInjRatio()
            })
        },
        //指定注采比
        queryWellInjRatio() {
            let params = {
                blockId: this.queryData.blockId,
                dateTime: this.queryData.dateTime,
                type: this.radio,
                wellInjRatioList: this.tableData1
            }
            getWellInjRatio(params).then((res) => {
                // 多添加的
                let arr = eval(res.wellGroupData)
                let WellIdObj = {}
                let layerIdObj = {}
                let wellIndex = 0, layerIndex = 0
                arr.forEach(item => {
                    if (WellIdObj[item.injWellId]) {
                        wellIndex++;
                    } else {
                        WellIdObj[item.injWellId] = {
                            rowspan: arrayFindAll(arr, item.injWellId, 'injWellId').length
                        }
                        item.wellRowspan = WellIdObj[item.injWellId].rowspan;
                        wellIndex = 0;
                    }
                    if (layerIdObj[item.wellGroupId]) {
                        layerIndex++;
                    } else {
                        layerIdObj[item.wellGroupId] = {
                            rowspan: arrayFindAll(arr, item.wellGroupId, 'wellGroupId').length
                        }
                        item.layerRowspan = layerIdObj[item.wellGroupId].rowspan;
                        layerIndex = 0
                    }
                    item.wellIndex = wellIndex.toString();
                    item.layerIndex = layerIndex.toString();
                })
                this.form.tableData2 = arr
                // this.getSpanArr(arr, 'injWellNo')
                this.groupBy(arr)
                this.ying = eval(res.groupWaterInferData)
                this.$message.success("保存成功")
            }).catch(() => {
                this.$message.error("请配置井组参数信息!")
            })
        },
        // 预测结果
        queryWellGuessResult() {
            let data = {
                type: this.radio,
                blockId: this.queryData.blockId,
                dateTime: this.queryData.dateTime,
                str: this.ying,
                allocList: this.form.tableData2
            }
            getWellGuessResult(data).then((res) => {
                this.tableData3 = res.wellGroupData
                // 区块注采比：1    区块配注量(10⁴m³)：128.3
                this.yucejieguo = ''
                if (res.blockInjAlloc && res.blockInjAlloc.length > 0) {
                    this.yucejieguo = `区块注采比：${res.blockInjAlloc[0].blockRatio}  区块配注量(m³/d)：${res.blockInjAlloc[0].blockInjAlloc}`
                }
            }).finally(() => {
                this.saveInLoad = false
            })
        },
        // 保存
        handleSubmit1() {
            this.modify1 = false
            this.saveWellLoad = true
            const storeList = []
            this.tableData1.forEach(item => storeList.push({wellName: item.wellName, allocating: item.allocating}))
            localStorage.setItem('SINGLEWELL_TABLE', JSON.stringify(storeList))
            // wellAvgFluidProdAllocUpdate(this.tableData1).then((bool) => {
            //   if (bool) {
            //   this.queryWellAvgFluidProdAlloc()
            this.queryWellInjRatio()
            // this.$message.success("保存成功")
            // } else {
            //   this.$message.error("保存失败")
            // }
            // }).finally(() => {
            this.saveWellLoad = false
            // })

        },
        handleSubmit2(form) {
            if (this.radio == '1') {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.saveInLoad = true
                        this.modify2 = false
                        this.queryWellGuessResult()
                        this.form.tableData2.forEach(item => {
                            let len = 0
                            if (Number.isNaN(item.groupInjRatio)) {
                                item.groupInjRatio = 0
                                item.injSplitData = 0
                            } else if (item.groupInjRatio.toString().indexOf('.') > -1) {
                                const string = item.groupInjRatio.toString()
                                len = string.length - string.indexOf('.') - 1
                                item.injSplitData = item.groupInjRatio * Math.pow(10, len) * item.oilSplitData / Math.pow(10, len)
                            } else {
                                item.injSplitData = item.groupInjRatio * item.oilSplitData
                            }
                        })
                        this.$message.success("保存成功")
                    } else {
                        return false;
                    }
                });
            } else {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.modify4 = false
                        this.queryWellGuessResult()
                        this.form.tableData2 = this.form.tableData2.map(item => {
                            item.injSplitData = item.groupInjRatio * item.oilSplitData;
                            return item;
                        })
                        this.$message.success("保存成功")
                    } else {
                        return false;
                    }
                });
            }
        },
        //查看方案
        viewDetail() {
            localStorage.setItem('OPTIMIZATION_DETAIL', JSON.stringify({
                ...this.queryData,
                type: this.radio == '2' ? 1 : 0,
                schemeId: this.tableData3.length ? this.tableData3[0].schemeId : ''
            }))
            localStorage.setItem('PRATIE_TABLEDATE', JSON.stringify(this.tableData1))
            this.$router.push({name: 'optimizationResult'})
        },
        //图表
        getEchart() {
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                grid: {
                    top: "10%",
                    left: "13%",
                    right: "10%",
                    bottom: "25%",
                },
                legend: {
                    data: ['层配注量', '层配产量', '注采比'],
                    bottom: '0%',
                    textStyle: {
                        color: "#a9a8a8",
                        fontSize: 14,
                    },
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.tableData3.map((item) => item.layerNo),
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLabel: {
                            rotate: 15,
                            color:'#a9a8a8'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '配注量(m³)',
                        nameLocation: "center",
                        nameTextStyle: {
                            color: "#989898",
                        },
                        nameGap: 45,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name: '注采比',
                        nameLocation: "center",
                        nameGap: 32,
                        nameTextStyle: {
                            color: "#989898",
                        },
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: [
                    {
                        name: '层配注量',
                        type: 'bar',
                        barMaxWidth: "10",
                        tooltip: {
                            valueFormatter: function (value) {
                                return value;
                            }
                        },
                        
                        data: this.tableData3.map((item) => item.layerConfigurationInj)
                    },
                    {
                        name: '层配产量',
                        type: 'bar',
                        barMaxWidth: "10",
                        tooltip: {
                            valueFormatter: function (value) {
                                return value;
                            }
                        },
                        data: this.tableData3.map((item) => item.layerOilSplitData)
                    },
                    {
                        name: '注采比',
                        type: 'line',
                        yAxisIndex: 1,
                        
                        tooltip: {
                            valueFormatter: function (value) {
                                return value;
                            }
                        },
                        data: this.tableData3.map((item) => item.layerRatio)
                    }
                ]
            };
            return option;
        },
        handleInput(row) {
            this.form.tableData2.forEach(item => {
                if (row.injWellId === item.injWellId && row.layerId === item.layerId) {
                    item.groupInjRatio = row.groupInjRatio
                }
            })
        },
        returnroute() {
            this.$router.go(-1)
        },
        refresh(){
            const params = JSON.parse(localStorage.getItem('OPTIMIZATION'))
            if (params && params.ogfId) {
                this.queryData.ogfId = params.ogfId
                this.queryData.blockId = params.blockId
                this.queryData.dateTime = params.dateTime
            }
            this.queryWellAvgFluidProdAlloc();
        }
    },
}
</script>
<style lang="scss" scoped>
#indexscv {
    ::v-deep .el-table__header-wrapper .cell {
        height: auto;
        line-height: 18px;
        white-space: pre;
    }
}
.el-table__header,
.el-table__body,
.el-table__footer {
    width: 100%;
    table-layout: fixed !important;
}

::v-deep .el-table__row {
    height: 54px;
}

.buttonBox {
    margin-bottom: 10px;
}

.button {
    // border: 1px solid rgb(255, 200, 53) !important;
    // color: rgb(255, 200, 53) !important;
    line-height: 14px;
}

.fangan {
    float: right;
    margin-right: 30px;
}

.el-radio .el-radio__label {
    font-size: 16px !important;
}

::v-deep .el-form-item__content {
    margin-left: 10% !important;
    width: 80%;
}

// .el-input {
//   margin-top: 20px;
// }
::v-deep input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
}

::v-deep input::-webkit-outer-spin-button {
    -webkit-appearance: none !important;
}

::v-deep input[type="number"] {
    -moz-appearance: textfield;
}

// ::v-deep .cell {
//   margin-top: 20px !important;
// }

.foreBtn {
    position: absolute;
    right: 14%;
    top: 5.5%;
    z-index: 999;
}
</style>
