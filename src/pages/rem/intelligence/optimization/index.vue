<template>
    <div style="height:100%;">
        <div class="titleBox">
            <el-tabs v-model="activeName" class="g-pageHeader" @tab-click="setWidth">
                <el-tab-pane label="定产配注" name="first"></el-tab-pane>
                <el-tab-pane label="智能配注" name="second">
                    <!-- <a href="http://sea-oil-web-qhd32-6znyt.tjdevapp.cnooc/"></a> -->
                </el-tab-pane>
            </el-tabs>
        </div>
        <header-search  style="height: auto;display: grid">
            <div v-if="activeName == 'first'" style="margin-top:20px;margin-bottom:20px;">
                <span>油田：</span>
                <el-select v-model="queryData.ogfId" filterable clearable disabled style="width:180px;">
                    <el-option
                        v-for="item in oilList"
                        :key="item.ogfId"
                        :label="item.ogfName"
                        :value="item.ogfId"
                    ></el-option>
                </el-select>
                <span style="margin-left:20px">区块：</span>
                <el-select v-model="queryData.blockId">
                    <el-option
                        v-for="item in blockList"
                        :key="item.blockId"
                        :label="item.blockName"
                        :value="item.blockId"
                    ></el-option>
                </el-select>
                <span style="margin-left:20px">时间：</span>
                <el-date-picker
                    v-model="queryData.dateTime"
                    type="month"
                    placeholder="请选择"
                    value-format="yyyy-MM"
                ></el-date-picker>
                <el-button
                    icon="el-icon-search"
                    type="primary"
                    style="margin-left: 20px;background: rgba(0, 0, 0, 0);border: 1px solid #00b4ff;"
                    @click="doSearch"
                >搜索
                </el-button>
                <el-button class="commonBtn" @click="refresh" icon="el-icon-refresh"> 重置</el-button>
                <span class="fangan">
            <span style="color: #00b4ff;">{{ queryData.dateTime }}月配产配注方案</span>
            <el-button type="primary" @click="viewDetail">
              方案详情
              <i class="el-icon-d-arrow-right"/>
            </el-button>
          </span>
            </div>
        </header-search>
        <pagePanelNew style="height: auto">
            <el-row v-if="activeName == 'first'" :gutter="20" style="height:800px">
                <el-col :span="6" style="height:100%">
                    <pagePanel :headerTitle="title1" :title="title1" :show-btn="true"
                               style="text-align: center;height:calc(100% - 10px)">
                        <el-table
                            v-loading="tableData1.length>0?false:true"
                            element-loading-background="rgba(0,0,0,0.5)"
                            element-loading-text="数据加载中"
                            element-loading-spinner="el-icon-loading"
                            :data="tableData1"
                            id="indexscvFirst"
                            highlight
                            style="margin-top: 10px"
                            height="100%"
                        >
                            <el-table-column prop="wellNo" label="油井井号" show-overflow-tooltip align="center"
                                             min-width="160"></el-table-column>
                            <el-table-column prop="fluidProdDaily" label="日配产量(m³/d)" align="center">
                                <template slot="header">
                                    <p>
                                        日配产量
                                        <br/>(m³/d)
                                    </p>
                                </template>
                            </el-table-column>
                        </el-table>
                    </pagePanel>
                </el-col>
                <el-col :span="18" style="height:100%">
                    <pagePanel :headerTitle="title2" style="height:calc(100% - 10px);" :show-btn="true">
                        <div class="buttonBox">
                            <el-row :gutter="20">
                                <el-col :span="22">
                                    <el-button class="button" icon="el-icon-search" @click="assessBut">可行性评估
                                    </el-button>
                                    <!-- @click="modify = true" -->
                                    <el-button type="primary" icon="el-icon-edit" @click="modify = true">修改
                                    </el-button>
                                    <el-button
                                        type="primary"
                                        :loading="saveLoad"
                                        icon="el-icon-bank-card"
                                        @click="handleSubmit('form')"
                                    >保存
                                    </el-button>
                                </el-col>
                                <el-col :span="2">
                                    <el-button type="primary" icon="el-icon-download"
                                               @click="doDownLoadExcelh"
                                    >下载
                                    </el-button
                                    >
                                </el-col>
                            </el-row>
                        </div>
                        <el-form ref="form" :rules="rules" style="height: 100%" label-width="100px" :model="form">
                            <el-table
                                :data="form.tableData2"
                                id="indexscvSecond"
                                highlight
                                style="margin-top: 10px"
                                :header-cell-style="tableColor"
                                :cell-style="tableColorone"
                                :span-method="mergeTable"
                                height="calc(100% - 30px)"
                            >
                                <el-table-column prop="injWellNo" label="注水井" align="center"
                                                 min-width="180px"></el-table-column>
                                <el-table-column
                                    prop="injWellDaily"
                                    :render-header="renderheader"
                                    label="日配注量?(m³/d)"
                                    min-width="100"
                                    align="center"
                                ></el-table-column>
                                <el-table-column prop="injection" label="注采比" align="center"></el-table-column>
                                <el-table-column prop="layerNo" min-width="200" label="层段号"
                                                 align="center"></el-table-column>
                                <el-table-column
                                    prop="froecastInjDaily"
                                    :render-header="renderheader"
                                    label="预测日配注量?(m³/d)"
                                    min-width="120"
                                    align="center"
                                ></el-table-column>
                                <el-table-column
                                    prop="afterConfigurationInjDaily"
                                    :render-header="renderheader"
                                    label="上月实际日注水量?(m³/d)"
                                    min-width="150"
                                    align="center"
                                ></el-table-column>
                                <el-table-column
                                    prop="afterInjDaily"
                                    :render-header="renderheader"
                                    label="上月日配注水量?(m³/d)"
                                    min-width="120"
                                    align="center"
                                ></el-table-column>

                                <el-table-column
                                    prop="configurationInjDaily"
                                    :render-header="renderheader"
                                    label="本月日配注量?(m³/d)"
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
                                <el-table-column prop="remark" show-overflow-tooltip label="备注" align="center" min-width="150">
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
                ref="iframe"
                :style="getStyle"
                v-show="activeName == 'second'"
                src="https://dl-front-qhd32-6znyt.tj.app.cnooc/sow/"
            ></iframe>

        </pagePanelNew>
    </div>
</template>
<script>
import queryConditionMixin from "@/mixins/queryConditionMixin.js";
import {getWellMonthAllocation, getWellMonthInj, wellAvgFluidProdAllocUpdate} from "@/api/rem/r-intelligentIPA.js";
import Iframe from '@/components/rem/tools/iframe.vue'
import {exportExcel} from '@/lib/exportExcel';

export default {
    name:'optimization',
    components: {
        Iframe
    },
    mixins: [queryConditionMixin],
    created(){
        //若由REM跳转 聚焦吸水指数
        if(this.$route.query.link == 'rem'){
            this.activeName = "second"
        }else{
            this.queryTableData(this.form.tableData2)
        }
    },
    data() {
        return {
            iframeWidth: 1,
            queryData: {
                ogfId: '3FC9A818F5BC43B88270DB80BBB3018F',
                // blockId: '6CD7342CA6DD418183A4B3BC38584F7C',
                blockId: 'YCFXDY8B643EDC9007F96F570600457D',
                dateTime: this.eeee(),
                // '2022-10'
                // new Date().format("yyyy-MM")
            },
            activeName: 'first',
            modify: false,
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
        }
    },
    computed: {
        getStyle() {
            return {
                height:'800px',
                width:'1720px',
                border:"none",
                transform: `scale(${ (this.iframeWidth - 40) / 1720 > 1 ? 1 : (this.iframeWidth - 40) / 1720})`,
                transformOrigin: '0% 0%'
            }
        }  
    },
    methods: {
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
        // 合并单元格数据处理
        getSpanArr(data) {
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
        // 时间处理
        eeee() {
            let data = new Date()
            if (data.getMonth() < 10) {
                return data.getFullYear() + '-0' + data.getMonth()
            } else {
                return data.getFullYear() + '-' + data.getMonth()
            }
        },
        refresh() {
            this.queryData.blockId = '6CD7342CA6DD418183A4B3BC38584F7C',
                this.queryData.dateTime = this.eeee()
            this.doSearch()
        },
        // table表头标题样式
        tableColorone({row, column, rowIndex, columnIndex}) {
            if (
                column.label === "本月日配注量?(m³/d)"
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
                this.title1 = this.queryData.dateTime + '月单井月度配产计划表'
                this.title2 = this.queryData.dateTime + '月单井月度配注计划表'
            } else {
                this.title1 = '单井月度配产计划表'
                this.title2 = '单井月度配注计划表'
            }
            if (this.queryData.ogfId && this.queryData.blockId && this.queryData.dateTime) {
                this.queryTable()
                this.queryTableData()
            } else {
                this.$message.error("检索条件不足")
            }
        },
        // 可行性评估
        assessBut() {
            this.$confirm('是否跳转至配注方案分析与评估?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                
                window.open('https://ipm.tjioms-dev.tjltd.cnooc/#/waterflood/merge?link=rem','_blank')
                // this.$router.push({name: "schemePrediction"})
            })
        },
        // 保存
        handleSubmit(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.saveLoad = true
                    this.modify = false
                    if (!this.queryData.dateTime && this.form.tableData2.length) {
                        this.queryData.dateTime = this.form.tableData2[0].dateTime
                    }
                    wellAvgFluidProdAllocUpdate({
                        injWellMonthDtos: this.form.tableData2,
                        dateTime: this.queryData.dateTime
                    }).then((bool) => {
                        this.$message.success("保存成功")
                        this.queryTableData()
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
            const params = {
                ogfId: this.queryData.ogfId,
                blockId: this.queryData.blockId,
                dateTime: this.queryData.dateTime,
            }
            localStorage.setItem('OPTIMIZATION', JSON.stringify(params))
            this.$router.push({
                name: 'optimizationDetail',
                params,
            })
        },
        //单井月度配产计划表
        queryTable() {
            let params = {
                blockId: this.queryData.blockId,
                dateTime: this.queryData.dateTime,
            }
            getWellMonthAllocation(params).then((res) => {
                res.forEach(item => {
                    item.fluidProdDaily = Math.floor(item.fluidProdDaily)
                })
                this.tableData1 = res
            })
        },
        //单井月度配注计划表
        queryTableData(arr) {
            let params = {
                blockId: this.queryData.blockId,
                dateTime: this.queryData.dateTime,
            }
            getWellMonthInj(params).then((res) => {
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
                            arr1.push({
                                ...layer,
                                ...item,
                                rowSpan: layers.length,
                                condition: index,
                                proWellId: '',
                                dateTime: this.queryData.dateTime
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
        doDownLoadExcelh() {
            exportExcel("#indexscvSecond", this.title2);
        },
        setWidth(){
            this.iframeWidth = this.$refs.iframe.parentNode.clientWidth;
        }
    },
    mounted() {
        this.$nextTick(()=>{
            setTimeout(()=>{
                window.addEventListener('resize',this.setWidth);
            },1000)
        })
        this.$once('hook:beforeDestroy',()=>{
            window.removeEventListener('resize',this.setWidth)
        })
        if(this.$route.query.link == 'rem'){
            this.doSearch()
        }else{
            this.doSearch()
        }
    },
}
</script>
<style lang="scss" scoped>
.buttonBox {
    float: left;
    margin-bottom: 10px;
    width: 100%;
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
