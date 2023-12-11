<template>
    <div style="height:100%;">
        <div class="titleBox">
            <el-tabs v-model="activeName" class="g-pageHeader">
                <el-tab-pane label="定产配12312注" name="first"></el-tab-pane>
                <el-tab-pane label="智能配注" name="second">
                    <!-- <a href="http://sea-oil-web-qhd32-6znyt.tjdevapp.cnooc/"></a> -->
                </el-tab-pane>
            </el-tabs>
        </div>
        <header-search height="auto">
            <div v-if="activeName == 'first'" style="margin-top:20px;margin-bottom:20px;">
                <span>油田：</span>
                <el-select v-model="selectOilField" filterable clearable disabled style="width:180px">
                    <el-option
                        v-for="item in oilField"
                        :key="item.ogfId"
                        :label="item.ogfName"
                        :value="item.ogfId"
                    ></el-option>
                </el-select>
                <span style="margin-left:20px ">区块：</span>
                <el-select v-model="queryData.blockId" disabled>
                    <el-option
                        v-for="item in blockList"
                        :key="item.blockId"
                        :label="item.blockName"
                        :value="item.blockId"
                    ></el-option>
                </el-select>
                <span style="margin-left:20px ">时间：</span>
                <el-date-picker
                    v-model="queryData.dateTime"
                    type="month"
                    placeholder="请选择"
                    value-format="yyyy-MM"
                    disabled
                ></el-date-picker>
                <el-button
                    type="primary"
                    style="margin-left: 20px;float: right"
                    @click="returnroute"
                >返回
                </el-button>
                <!-- <el-button
                  icon="el-icon-search"
                  type="primary"
                  style="margin-left: 20px;background: rgba(0, 0, 0, 0);border: 1px solid #00b4ff;"
                  @click="doSearch"
                >确认</el-button> -->

                <!-- <span class="fangan">
                  <span style="color: #00b4ff;">{{ queryData.dateTime }}月配产配注方案</span>
                  <el-button type="primary" @click="viewDetail">
                    方案详情
                    <i class="el-icon-d-arrow-right" />
                  </el-button>
                </span> -->
            </div>
        </header-search>
        <pagePanelNew style="height: calc(100% - 100px)">
            <el-row v-if="activeName == 'first'" :gutter="20" style="margin: 0px 20px;height: 100%">
                <el-col :span="6" style="height:100%">
                    <pagePanel :headerTitle="title1" show-btn
                               style="height:calc(100% - 25px)">
                        <el-table
                            v-loading="sigleWellTable.length>0?false:true"
                            element-loading-background="rgba(0,0,0,0.5)"
                            element-loading-text="数据加载中"
                            element-loading-spinner="el-icon-loading"
                            :data="sigleWellTable"
                            id="indexscv"
                            highlight
                            style="margin-top: 10px"
                            height="100%"
                        >
                            <el-table-column
                                prop="wellName"
                                label="生产井"
                                show-overflow-tooltip
                                align="center"
                            ></el-table-column>
                            <el-table-column
                                prop="allocating"
                                label="本月日配产量?(m³)"
                                :render-header="renderheader"
                                align="center"
                            ></el-table-column>
                        </el-table>
                    </pagePanel>
                </el-col>
                <el-col :span="18" style="height:100%">
                    <pagePanel :headerTitle="title2" style="height:calc(100% - 25px)" show-btn>
                        <div class="buttonBox">
                            <el-button class="button" icon="el-icon-search" @click="assessBut">可行性评估</el-button>
                            <!-- @click="modify = true" -->
                            <el-button type="primary" icon="el-icon-edit" @click="modify = !modify">修改</el-button>
                            <el-button
                                type="primary"
                                :loading="saveLoad"
                                icon="el-icon-bank-card"
                                @click="handleSubmit('form')"
                            >保存
                            </el-button>
                        </div>
                        <el-form ref="form" :rules="rules" label-width="100px" style="height: calc(100% - 50px)" :model="form">
                            <el-table
                                :data="form.tableData2"
                                id="indexscv"
                                highlight
                                height="100%"
                                style="margin-top: 10px"
                                :header-cell-style="tableColor"
                                :cell-style="tableColorone"
                                :span-method="mergeTable"
                            >
                                <el-table-column prop="injWellNo" label="注水井" align="center"
                                                 min-width="120">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.injWellNo.includes("秦皇岛32-6")? scope.row.injWellNo.replace("秦皇岛32-6", "QHD32-6") : scope.row.injWellNo}}</span>
                                    </template>    
                                </el-table-column>
                                <el-table-column
                                    prop="injWellDaily"
                                    :render-header="renderheader"
                                    label="日配注量?(m³)"
                                    min-width="100"
                                    align="center"
                                ></el-table-column>
                                <el-table-column prop="injection" label="注采比" align="center"></el-table-column>
                                <el-table-column prop="layerNo" min-width="200" label="层段号"
                                                 align="center"></el-table-column>
                                <el-table-column
                                    prop="froecastInjDaily"
                                    :render-header="renderheader"
                                    label="预测日配注量?(m³)"
                                    min-width="120"
                                    align="center"
                                ></el-table-column>
                                <el-table-column
                                    prop="afterConfigurationInjDaily"
                                    :render-header="renderheader"
                                    label="上月实际日注水量?(m³)"
                                    min-width="150"
                                    align="center"
                                ></el-table-column>
                                <el-table-column
                                    prop="afterInjDaily"
                                    :render-header="renderheader"
                                    label="上月日配注水量?(m³)"
                                    min-width="120"
                                    align="center"
                                ></el-table-column>

                                <el-table-column
                                    prop="configurationInjDaily"
                                    :render-header="renderheader"
                                    label="本月日配注量?(m³)"
                                    min-width="150"
                                    align="center"
                                >
                                    <template slot-scope="scope">
                                        <el-form-item
                                            style="display: inline-block;"
                                            v-if="modify"
                                            :prop="'tableData2.'+scope.$index+'.configurationInjDaily'"
                                            :rules="rules.configurationInjDaily"
                                        >
                                            <el-input-number
                                                v-model="scope.row.configurationInjDaily"
                                                :min="0"
                                                :controls="false"
                                                style="width: 100%;margin-top: 5px;"
                                            />
                                        </el-form-item>
                                        <span v-else>
                          {{ scope.row.configurationInjDaily }}
                          <i
                              v-if="scope.row.configurationInjDaily-scope.row.afterConfigurationInjDaily > 0 && scope.row.configurationInjDaily!=null"
                              class="el-icon-my-export"
                          />
                          <i
                              v-if="scope.row.configurationInjDaily == scope.row.afterConfigurationInjDaily && scope.row.configurationInjDaily!=null"
                              class="el-icon-my-export2"
                          />
                          <i
                              v-if="scope.row.configurationInjDaily-scope.row.afterConfigurationInjDaily < 0 && scope.row.configurationInjDaily!=null"
                              class="el-icon-my-export1"
                          />
                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="layerRatio" label="注采比" align="center" min-width="80">
                                    <!-- <template slot-scope="scope">
                                                    <span>{{ scope.row.froecastInjDaily / scope.row.configurationInjDaily }}</span>
                                    </template>-->
                                </el-table-column>
                                <el-table-column prop="remark" label="备注" align="center" min-width="150">
                                    <template slot-scope="scope">
                                        <el-input v-if="modify" v-model="scope.row.remark"/>
                                        <span v-else>{{ scope.row.remark }}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!-- v-if="activeName == 'second'" -->
                        </el-form>
                    </pagePanel>
                </el-col>
            </el-row>
            <iframe
                style="height:100%; width:100%; border:none;"
                v-show="activeName == 'second'"
                allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" oallowfullscreen="true" msallowfullscreen="true"
                src="https://intelinj.tjioms-dev.tjltd.cnooc/"
            ></iframe>

        </pagePanelNew>
    </div>
</template>
<script>
import queryConditionMixin from "@/mixins/queryConditionMixin.js";
import {
    getWellMonthAllocation,
    getWellMonthInj,
    getChatPlanINjAlloc,
    wellAvgFluidProdAllocUpdate, wellAvgFluidProdAllocUpdateNew
} from "@/api/rem/r-intelligentIPA.js";
import {
    getoilfield, //油田下拉
} from "@/api/rem/r-wellConnectEvaluate.js";
import { QueryOgfDetail, QueryReservoirAnalyseUnit, userListByUserNames } from "@/api/rem/marster.js";
import Iframe from '@/components/rem/tools/iframe.vue'

export default {
    name:'optimizationResult',
    components: {
        Iframe
    },
    mixins: [queryConditionMixin],
    data() {
        return {
            oilField: [],
            queryData: {
                ogfId: '3FC9A818F5BC43B88270DB80BBB3018F',
                blockId: '6CD7342CA6DD418183A4B3BC38584F7C',
                dateTime: this.eeee(),
                // '2022-10'
                // new Date().format("yyyy-MM")
            },
            activeName: 'first',
            modify: false,
            sigleWellTable: [],
            tableData1: [],
            form: {
                tableData2: [],
            },
            title1: '',
            title2: '',
            rules: {
                configurationInjDaily: [
                    {required: true, message: '请输入', trigger: 'blur'},
                    {type: 'number', message: '输入值必须为数字'}
                ],
            },
            mergeArr: ['injWellNo'],
            mergeObj: {},
            host: window.location.protocol + '//',
            saveLoad: false,
            type: 0, // 0小层 1整井,
            tableDataList: [],
            schemeId: '',
        }
    },
    methods:{
        getOilFields() {
        let _this = this;
        QueryOgfDetail({}).then((res) => {
            _this.oilField = res.data.data;
            //选择油田默认选秦皇岛32-6油田
            if (_this.oilField.length == 0) {
            _this.selectOilField = "";
            } else {
            _this.selectOilField = "3FC9A818F5BC43B88270DB80BBB3018F";
            }
        });
        },
        // 获取油田下拉数据
        selectData() {
            getoilfield().then(({ogfId}) => {
                this.oilList = ogfId;
            });
        },
        selectblock() {
            // if (!this.selectField) return;
            getblock({
                ogfId: this.queryData.ogfId
            }).then(({blockList}) => {
                this.blockList = blockList;
            });
            //   }
        },
        changeOilfield() {
            this.selectblock();
            this.queryData.blockId = ""
        },
      // table表头标题样式
      tableColorone({row, column, rowIndex, columnIndex}) {
            if (
                column.label === "本月日配注量?(m³)"
            ) {
                return "color:#66ffff"; //修改的样式
            } else {
                return "";
            }
        },
        // table表格列样式
        tableColor({row, column, rowIndex, columnIndex}) {
            if (rowIndex === 0 && columnIndex === 7) {
                return "color:#66ffff"; //修改的样式
            }
        },
        // table表格单位换行
        renderheader(h, {column, $index}) {
            return h('span', {}, [
                h('span', {}, column.label.split('?')[0]),
                h('br'),
                h('span', {}, column.label.split('?')[1])
            ]);
        },
        // 框框标题
        doSearch() {
            if (this.queryData.dateTime) {
                this.title1 = this.queryData.dateTime + '指定单井产量'
                this.title2 = this.queryData.dateTime + '月单井月度配注计划表'
            } else {
                this.title1 = '指定单井产量'
                this.title2 = '单井月度配注计划表'
            }
            if (this.queryData.ogfId && this.queryData.blockId && this.queryData.dateTime) {
                //   this.queryTable()
                this.queryTableData()
            } else {
                this.$message.error("检索条件不足")
            }
        },
        // 可行性评估
        assessBut() {
            var baseUrl = ''
                if (window.location.origin.includes('test')) {
                    baseUrl = 'tjioms-test.tjltd.cnooc'
                } else if (window.location.origin.includes('dev') || window.location.origin.includes('808')) {
                    baseUrl = 'tjioms-dev.tjltd.cnooc'
                }else if (window.location.origin.includes('tpro')) {
                    baseUrl = 'tjioms-tpro.tjltd.cnooc'
                }else{
                    baseUrl='tjioms-test.tjltd.cnooc'
                }
                window.open('https://ipm.'+baseUrl+'/#/waterflood/merge?page=optimization')
            },
        // 保存
        handleSubmit(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.saveLoad = true
                    this.modify = false
                    wellAvgFluidProdAllocUpdateNew({
                        blockId:this.queryData.blockId,
                        injWellMonthDtos: this.form.tableData2,
                        dateTime: this.queryData.dateTime
                    }).then(() => {
                        this.$message.success("保存成功")
                    }).finally(() => {
                        this.saveLoad = false
                    })
                } else {
                    return false;
                }
            });


        },
        // 方案详情跳转
        viewDetail() {
            this.$router.push({
                name: 'optimizationDetail',
                params: {
                    ogfId: this.queryData.ogfId,
                    blockId: this.queryData.blockId,
                    dateTime: this.queryData.dateTime,
                }
            })
        },
        returnroute() {
            this.$router.go(-1)
        },
        //单井月度配产计划表
        //   queryTable () {
        //     let params = {
        //       blockId: this.queryData.blockId,
        //       dateTime: this.queryData.dateTime,
        //     }
        //     getWellMonthAllocation(params).then((res) => {
        //       res.forEach(item => {
        //         item.fluidProdDaily = Math.floor(item.fluidProdDaily)
        //       })
        //       this.tableData1 = res
        //     })
        //   },
        //单井月度配注计划表
        queryTableData(arr) {
            let params = {
                blockId: this.queryData.blockId,
                dateTime: this.queryData.dateTime,
                type: this.type,
                allInjFluList: this.tableDataList,
                schemeId: this.schemeId
            }
            getChatPlanINjAlloc(params).then((res) => {
                let arr1 = []
                res.forEach(item => {
                    //   item.injWellDaily = Math.floor(layer.injWellDaily)
                    if (item.layerDataList) {
                        var layers = item.layerDataList
                        layers.forEach((layer, index) => {
                            //   layer.afterConfigurationInjDaily = Math.floor(layer.afterConfigurationInjDaily)
                            layer.afterInjDaily = Math.floor(layer.afterInjDaily)
                            layer.froecastInjDaily = Math.floor(layer.froecastInjDaily)
                            layer.configurationInjDaily = layer.configurationInjDaily ? layer.configurationInjDaily : layer.froecastInjDaily
                            //   layer.configurationInjDaily = Math.floor(layer.configurationInjDaily)
                            // console.log(item)
                            arr1.push({
                                ...layer,
                                ...item,
                                rowSpan: layers.length,
                                condition: index,
                                proWellId: '',
                            })
                        })
                    }
                })
                this.form.tableData2 = arr1
                this.getSpanArr(arr1)
            })
        },
        objectSpanMethod({row, column, rowIndex, columnIndex}) {
            if (row.rowSpan) {
                if (columnIndex == 0 || columnIndex == 1 || columnIndex == 2) {
                    if (row.condition == 0) {
                        return {
                            rowspan: row.rowSpan,
                            colspan: 1,
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0,
                        };
                    }
                }
            }
        },
        // 合并单元格
        mergeTable({row, column, rowIndex, columnIndex}) {
            if (columnIndex === 0) {
                if (this.mergeObj['injWellNo'][rowIndex]) {
                    return [this.mergeObj['injWellNo'][rowIndex], 1]
                } else {
                    return [0, 0]
                }
            }

            if (columnIndex === 1) {
                if (this.mergeObj['injWellNo'][rowIndex]) {
                    return [this.mergeObj['injWellNo'][rowIndex], 1]
                } else {
                    return [0, 0]
                }
            }

            if (columnIndex === 2) {
                if (this.mergeObj['injWellNo'][rowIndex]) {
                    return [this.mergeObj['injWellNo'][rowIndex], 1]
                } else {
                    return [0, 0]
                }
            }
        },
        getSpanArr(data){
            this.mergeArr.forEach((key, index1)=>{
                let count = 0;
                this.mergeObj[key] = []
                data.forEach((item, index)=>{
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
        // 时间处理
        eeee() {
           let data = new Date()
           if (data.getMonth() < 10) {
                return data.getFullYear() + '-0' + data.getMonth()
            } else {
                return data.getFullYear() + '-' + data.getMonth()
            }

        }

    },
    created() {
        this.getOilFields();
        const params = JSON.parse(localStorage.getItem('OPTIMIZATION_DETAIL'))
        if (params) {
            this.queryData.ogfId = params.ogfId
            this.queryData.blockId = params.blockId
            this.queryData.dateTime = params.dateTime
            this.type = params.type
            this.schemeId = params.schemeId
        }
        this.tableDataList = JSON.parse(localStorage.getItem('PRATIE_TABLEDATE'))
        this.queryTableData(this.form.tableData2)
        
    },
    mounted() {
        
        const table = JSON.parse(localStorage.getItem('SINGLEWELL_TABLE'))
        this.sigleWellTable = Array.isArray(table) ? table : []
        this.doSearch()
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
.buttonBox {
    float: right;
    margin-bottom: 10px;
}

.button {
    border: 1px solid rgb(255, 200, 53) !important;
    color: rgb(255, 200, 53) !important;
}

.fangan {
    float: right;
    margin-right: 30px;
    padding: 5px;
    border: 1px solid #00b4ff;

    span {
        margin: 0 30px;
    }
}

::v-deep .el-form-item__content {
    margin-left: 10% !important;
    width: 80%;
}

::v-deep input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
}

::v-deep input::-webkit-outer-spin-button {
    -webkit-appearance: none !important;
}

::v-deep input[type="number"] {
    -moz-appearance: textfield;
}

.el-icon-my-export {
    background: url("./up.png") center no-repeat;
}

.el-icon-my-export:before {
    content: "替";
    font-size: 16px;
    visibility: hidden;
}

.el-icon-my-export {
    font-size: 16px;
}

.el-icon-my-export:before {
    content: "\e611";
}

.el-icon-my-export1 {
    background: url("./down.png") center no-repeat;
}

.el-icon-my-export1:before {
    content: "替";
    font-size: 16px;
    visibility: hidden;
}

.el-icon-my-export1 {
    font-size: 16px;
}

.el-icon-my-export1:before {
    content: "\e611";
}

.el-icon-my-export2 {
    background: url("./right.png") center no-repeat;
}

.el-icon-my-export2:before {
    content: "替";
    font-size: 16px;
    visibility: hidden;
}

.el-icon-my-export2 {
    font-size: 16px;
}

.el-icon-my-export2:before {
    content: "\e611";
}
</style>
  