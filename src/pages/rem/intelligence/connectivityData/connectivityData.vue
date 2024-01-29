<template>
    <!-- 井间联通性评价 -->
    <div class="app-container" style="height: 100%">
        <header-search>
            <el-form style="margin: 20px 0 10px 0" :inline="true">
                <el-form-item label="油田：">
                    <el-select
                        v-model="this.selectOilField"
                        filterable
                        disabled
                        clearable
                        @change="changeOilfield"
                    >
                        <el-option
                            v-for="item in oilList"
                            :key="item.ogfId"
                            :label="item.ogfName"
                            :value="item.ogfId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="区块：">
                    <el-select v-model="queryData.blockId" filterable clearable>
                        <el-option
                            v-for="item in blockList"
                            :key="item.reservoirAnalyseUnitId"
                            :label="item.reservoirAnalyseUnitName"
                            :value=" item.reservoirAnalyseUnitId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期：">
                    <el-date-picker
                        v-model="queryData.dateTime"
                        type="month"
                        placeholder="请选择"
                        value-format="yyyy-MM"
                        :picker-options="pickerOptions"
                    ></el-date-picker>
                </el-form-item>
                <el-button
                    type="primary"
                    class="confirmBut"
                    icon="el-icon-search"
                    size="mini"
                    @click="tableOilfield"
                >搜索
                </el-button>
                <el-button
                    type="primary"
                    class="commonBtn"
                    icon="el-icon-refresh"
                    size="mini"
                    @click="reset"
                >
                    重置
                </el-button>
                <el-button type="primary" style="float: right" class="buttonActive_primary" v-if="this.$route.query.page" @click="$router.push({name:$route.query.page});">返回</el-button>
                <el-button type="danger" style="float: right" class="countBut" @click="examine">
                    查看连通系数计算基础数据
                </el-button>
            </el-form>
        </header-search>
        <page-panel
            :show-btn="true"
            header-title="连通系数计算"
            class="normalCard"
            style="color: white; height: calc(100% - 105px);width: 100%;"
        >
            <div style="">
                <el-button
                    type="primary"
                    size="mini"
                    class="confirmBut"
                    :loading="btnLoad"
                    icon="el-icon-cpu"
                    @click="Correction(1)"
                >运算
                </el-button>
                <el-button
                    type="primary"
                    size="mini"
                    :loading="btnLoad"
                    class="confirmBut"
                    icon="el-icon-s-tools"
                    @click="Correction(2)"
                >修正
                </el-button>
                <el-button
                    type="primary"
                    size="mini"
                    class="confirmBut"
                    icon="el-icon-refresh"
                    :disabled="!isComputed && !isCorrected"
                    @click="handleExchange"
                >置换
                </el-button>
                <el-button
                    type="primary"
                    size="mini"
                    icon="el-icon-edit"
                    style="margin-left: 50px; width: 70px"
                    :disabled="disabledComp || !form.tableData.length"
                    @click="modify = !modify"
                >更改
                </el-button>
                <el-button
                    type="primary"
                    size="mini"
                    :loading="preserveLoad"
                    icon="el-icon-bank-card"
                    style="width: 70px"
                    :disabled="disabledComp || !form.tableData.length"
                    @click="preserve('form')"
                >保存
                </el-button>
                <el-button
                    type="primary"
                    size="mini"
                    style="float: right"
                    @click="downloadTable"
                >下载
                </el-button>
            </div>
            <el-form ref="form" style="height: 100%;" :model="form">
                <el-table
                    :data="form.tableData"
                    id="indexscv"
                    highlight
                    height="96%"
                    style="margin-top: 10px;height: 100%;"
                    :cell-style="changeCellStyle"
                    :header-cell-style="tableColor"
                    :span-method="mergeTable"
                >
                    <el-table-column prop="wellGroupName" min-width="200" label="井组名称"
                                     align="center"></el-table-column>
                    <el-table-column prop="injWellNo" min-width="140" label="水井井号"
                                     align="center"></el-table-column>
                    <el-table-column prop="layerName" label="层位名称" min-width="200"
                                     align="center"></el-table-column>
                    <el-table-column prop="proWellNo" label="油井井号" min-width="140"
                                     align="center"></el-table-column>
                    <el-table-column prop="diviDingCoeff" label="连通系数?(动态调整)" min-width="120"
                                     align="center" :render-header="renderheader" show-overflow-tooltip
                                     class="lian">
                        <template slot-scope="scope">
                            <el-form-item
                                v-if="modify"
                                :prop="'tableData.'+scope.$index+'.diviDingCoeff'"
                                :rules="rules.injDividingCoeff"
                            >
                                <el-input
                                    v-model="scope.row.diviDingCoeff"
                                    placeholder="连通系数(动态调整)"
                                    @blur="veitBut"
                                />
                            </el-form-item>
                            <span v-else>{{ scope.row.diviDingCoeff }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="injSplitData" label="劈分注水量?m³/d" :render-header="renderheader"
                                     show-overflow-tooltip min-width="125px" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.injSplitData !== null && scope.row.injSplitData !== ''">{{scope.row.injSplitData}}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="operationalNarration" label="静态连通性系数" min-width="120"
                                     :render-header="renderheader" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.operationalNarration !== null && scope.row.operationalNarration !== ''">{{scope.row.operationalNarration}}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="operationInjSplitData" label="劈分注水量?m³/d"
                                     :render-header="renderheader" show-overflow-tooltip min-width="120px"
                                     align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.operationInjSplitData !== null && scope.row.operationInjSplitData !== ''">{{scope.row.operationInjSplitData}}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="correctionFactor" label="动态连通性系数" min-width="120"
                                     :render-header="renderheader" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.correctionFactor !== null && scope.row.correctionFactor !== ''">{{scope.row.correctionFactor}}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="reviseInjSplitData" label="劈分注水量?m³/d"
                                     :render-header="renderheader" show-overflow-tooltip min-width="120px"
                                     align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.reviseInjSplitData !== null && scope.row.reviseInjSplitData !== ''">{{scope.row.reviseInjSplitData}}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="remark" min-width="150" label="备注" show-overflow-tooltip
                                     align="center">
                        <template slot-scope="scope">
                            <el-form-item v-if="modify" :prop="'tableData.'+scope.$index+'.remark'">
                                <el-input v-if="modify" v-model="scope.row.remark"/>
                            </el-form-item>

                            <span v-else>{{ scope.row.remark }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
        </page-panel>
        <!-- <NormalCard
          title="平面注水量劈分结果"
          class="normalCard title"
          style="color: white;height:  100%;width: 44%;"
        >
          <el-table
            :data="tableWater"
            highlight
            height="96%"
            style="margin-top: 10px;height: 100%;"
          >
            <el-table-column
              prop="injWellNo"
              show-overflow-tooltip
              label="水井井号"
              min-width="20px"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="layerName"
              min-width="40px"
              show-overflow-tooltip
              label="层位名称"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="oilWellNo"
              min-width="40px"
              show-overflow-tooltip
              label="油井井号"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="injSplitData"
              label="劈分注水量?m³/d"
              :render-header="renderheader"
              show-overflow-tooltip
              min-width="20px"
              align="center"
            ></el-table-column>
          </el-table>
        </NormalCard> -->
        <!-- 置换 -->
        <el-dialog title="置换" :visible.sync="exchangeVisible" width="40%">
            <div style="margin: 0  0 20px 10px;">
                <el-radio-group v-model="exchangeType">
                    <el-radio :label="1">计算</el-radio>
                    <el-radio :label="2">修正</el-radio>
                </el-radio-group>
            </div>
            <el-table ref="multipleTable" :data="form.wellGroupList" @selection-change="handleSelectionChange"
                      height="50vh">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column property="wellGroupName" label="井组名称"></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="saveExchange">确认</el-button>
          </span>
        </el-dialog>
    </div>

</template>
<script>
// import queryConditionMixin from "@/mixins/queryConditionMixin.js";
import {
    postCoefficientConnectionpreserve, //保存
    getCorrectionOperation, //运算与修正
    downLoadUnicomModeloperationDto
} from "@/api/rem/r-wellConnectEvaluate.js";
import {getuserListByUserNames,getFieldListsDetail,getblockData} from "@/api/basic/masterBycoderXu.js"


import {exportExcel} from "@/lib/exportExcel";
import FileSaver from "file-saver";
import { QueryOgfDetail, QueryReservoirAnalyseUnit, userListByUserNames } from "@/api/rem/marster.js";

export default {
    name:'connectivityData',
    components: {},
    // mixins: [queryConditionMixin],
    data() {
        var ratio = (rule, value, callback) => {
            let index = parseInt(rule.field.split('.')[1])
            let arr = 0
            this.form.tableData.forEach(item => {
                if (this.form.tableData[index].wellGroupName === item.wellGroupName) {
                    arr += item.diviDingCoeff - 0
                }
            });
            if ((arr >= 0.99 && arr <= 1.01) || arr === 0) {
                return callback()
            } else {
                return callback(new Error("连通系数(动态调整)之和不为1请重新填写"))
            }
        }
        return {
            blockList:[],
            oilList:[],
            selectOilField:"",
            queryData: {
                ogfId: '3FC9A818F5BC43B88270DB80BBB3018F',
                blockId: '',
                dateTime: this.eeee(),
            },
            //   new Date().format("yyyy-MM")
            form: {
                tableData: [],
                wellGroupIds: [],
                wellGroupList: []
            },
            tableWater: [],
            input: "",
            modify: false,
            rules: {
                injDividingCoeff: [
                    // { type: 'string', required: true, pattern: /^((^[0])\.([0-9]{1,2})$)|^((^[0-1])$)/, message: '输入不正确', },
                    {
                        validator: ratio, trigger: 'blur'
                    }
                ]
            },
            btnLoad: false,
            mergeArr: ['wellGroupName'],
            mergeObj: {},
            preserveLoad: false,
            isComputed: false,
            isCorrected: false,
            exchangeVisible: false,
            exchangeType: 1,
            multipleSelection: [],
            disabledDateTime: null,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            }
        };
    },
    created() {
        const params = JSON.parse(localStorage.getItem('CONNECTIVITY_DATA'))
        if (params && params.blockId) {
            this.queryData.blockId = params.blockId
            this.queryData.ogfId = params.ogfId
            this.queryData.dateTime = params.dateTime
            localStorage.removeItem('CONNECTIVITY_DATA')
        }
        //获取油田下拉数据
        
        this.getuserListByUserNamesData();
        
    },
    computed: {
        disabledComp() {
            return this.queryData.dateTime !== (new Date(this.disabledDateTime)).format("yyyy-MM")
        }
    },
    methods: {
        getuserListByUserNamesData(){
          let params = {
            searchKeys:[this.$store.getters["user/userDetail"].user.userName],
          }
          getuserListByUserNames(params).then((res)=>{
            this.queryData.orgId=res.data.data[0].currentTenantBindOrgId
            this.getOilFields()
          })
  
        },
        getOilFields() {
          getFieldListsDetail({operationZoneId:this.queryData.orgId}).then((res) => {
            this.oilList = res.data.data;
            var list =res.data.data;
            for(var i=0;i<list.length;i++){
              if(list[i].ogfId==='3FC9A818F5BC43B88270DB80BBB3018F'){
                this.selectOilField=list[i].ogfId
              }else {
                this.selectOilField=list[0].ogfId
              }
            }
            this.selectblock()
          });
        },
        mergeTable({row, column, rowIndex, columnIndex}) {
            if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
                if (this.mergeObj['wellGroupName'][rowIndex]) {
                    return [this.mergeObj['wellGroupName'][rowIndex], 1]
                } else {
                    return [0, 0]
                }
            }
        },
        getSpanArr(data) {
            this.mergeArr.forEach((key) => {
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
        eeee() {
            var today = new Date(); // 获取当前日期
            var yesterday = new Date(today); // 创建一个新的日期对象，并将其设置为当前日期
            yesterday.setDate(today.getDate() - 1); // 将日期设置为前一天
            var year = yesterday.getFullYear(); // 获取年份
            var month = (yesterday.getMonth() + 1).toString().padStart(2, '0'); // 获取月份，并确保格式正确
            var day = yesterday.getDate().toString().padStart(2, '0'); // 获取日期，并确保格式正确
            return `${year}-${month}`; // 构造日期字符串
        },
        tableColor({row, column, rowIndex, columnIndex}) {
            if (rowIndex === 0 && columnIndex === 4 || columnIndex === 10) {
                return "color:#66ffff"; //修改的样式
            }
        },
        renderheader(h, {column, $index}) {
            return h('span', {}, [
                h('span', {}, column.label.split('?')[0]),
                h('br'),
                h('span', {}, column.label.split('?')[1])
            ]);
        },
        // 获取油田下拉数据
        selectData() {
            getoilfield().then(({ogfId}) => {
                this.oilList = ogfId;
            });
        },
        // 获取区块下拉数据
        selectblock() {
          getblockData({ogfId:this.queryData.ogfId}).then((res) => {
            this.blockList = res.data.data;
            for(var i=0;i<this.blockList.length;i++){
              if(this.blockList[i].reservoirAnalyseUnitId=="83D33B89B0DAB7DFA440BD060746883A"){
                this.queryData.blockId=this.blockList[i].reservoirAnalyseUnitId
              }
            }
            
            this.tableOilfield()
          });
        },
        // 油田下拉点击事件
        changeOilfield() {
            this.selectblock();
            this.queryData.blockId = ""
        },
        // 区块下拉点击事件
        changeBlock() {
        },
        //重置
        reset() {
            (this.queryData.blockId = "6CD7342CA6DD418183A4B3BC38584F7C");
            (this.queryData.ogfId = "3FC9A818F5BC43B88270DB80BBB3018F");
            (this.queryData.dateTime = this.eeee());
            (this.tableOilfield());
        },
        // 获取油田列表数据
        tableOilfield() {
            let params = {
                blockId: this.queryData.blockId,
                type: 0,
                dateTime: this.queryData.dateTime,
            };
            this.form.wellGroupIds = []
            this.form.wellGroupList = []
            try{
                getCorrectionOperation(params).then((res) => {
                if (Array.isArray(res)) {
                    this.disabledDateTime = res[0].updateYearMonth ? res[0].updateYearMonth : null
                }
                if (res[0].wellGroupId == null) {
                    this.form.tableData = [];
                } else {
                    res.forEach(item => {
                        item.diviDingCoeff = String(item.diviDingCoeff)
                        if (!this.form.wellGroupIds.includes(item.wellGroupId)) {
                            this.form.wellGroupIds.push(item.wellGroupId)
                            this.form.wellGroupList.push({
                                wellGroupName: item.wellGroupName,
                                wellGroupId: item.wellGroupId
                            })
                        }
                    })
                    this.form.tableData = res;
                }
                this.$set(this.form, 'tableData', this.form.tableData)
                this.getSpanArr(this.form.tableData)
            });
            }catch(e){
                console.log("查询月份没有数据")
            }
        },
        // 运算、修正: type = 1 运算，type = 2 修正
        Correction(type) {
            this.btnLoad = true
            let params = {
                blockId: this.queryData.blockId,
                type: type,
                dateTime: this.queryData.dateTime,
            };
            let existsList = []
            getCorrectionOperation(params).then((res) => {
                if(Array.isArray(this.form.tableData) && this.form.tableData.length){
                    this.form.tableData.forEach((el) => {
                        for (const item of res) {
                            if (item.wellGroupId === el.wellGroupId && item.injWellId === el.injWellId && item.oilWellId === el.oilWellId) {
                                existsList.push(item.oilWellId)
                                el.injDividingCoeff = Number(item.injDividingCoeff).toFixed(2)
                                if (type === 1) {
                                    el.operationalNarration = item.operationalNarration
                                    el.operationInjSplitData = item.operationInjSplitData
                                } else if (type === 2) {
                                    el.correctionFactor = item.correctionFactor
                                    el.reviseInjSplitData = item.reviseInjSplitData
                                }
                                break;
                            }
                        }
                    })

                    // 补充没有井组处理
                    this.form.tableData.forEach(elItme => {
                        if (!existsList.includes(elItme.oilWellId)) {
                            if (type === 1) {
                                elItme.operationalNarration = 0
                                elItme.operationInjSplitData = 0
                            } else if (type === 2) {
                                elItme.correctionFactor = 0
                                elItme.reviseInjSplitData = 0
                            }
                        }
                    })
                } else{
                    this.form.tableData = res
                }

                this.$set(this.form, 'tableData', this.form.tableData)
                this.getSpanArr(this.form.tableData)
                
                if (type === 1) {
                    this.isComputed = true
                } else if (type === 2) {
                    this.isCorrected = true
                }
            }).catch(() => {
                this.$set(this.form, 'tableData', [])
            }).finally(() => {
                this.btnLoad = false;
            })
        },
        // 查看连通系数计算基础数据
        examine() {
            if (this.queryData.blockId && this.queryData.dateTime && this.queryData.ogfId) {
                let ogfName = this.oilList.length ? this.oilList.find(
                    (item) => item.ogfId == this.queryData.ogfId
                ).ogfName : '';
                let blockName = this.blockList.length ? this.blockList.find(
                    (item) => item.reservoirAnalyseUnitId == this.queryData.blockId
                ).reservoirAnalyseUnitName : '';
                const params = {
                    blockId: this.queryData.blockId, //区块id
                    blockName: blockName,
                    ogfId: this.queryData.ogfId, //油田id
                    ogfName: ogfName,
                    dateTime: this.queryData.dateTime //时间
                }
                localStorage.setItem('CONNECTIVITY_DATA', JSON.stringify(params));
                this.$router.push({
                    name: "CoefficientCalculates",
                    params,
                });
            } else {
                this.$message.error("条件不足，请添加条件")
            }
        },
        // 表格下载
        // downloadTable () {
        //   if (this.queryData.ogfId && this.queryData.blockId) {
        //     // let ogfName = this.oilList.find(
        //     //   (item) => item.ogfId == this.queryData.ogfId
        //     // ).ogfName;
        //     let blockName = this.blockList.find(
        //       (item) => item.blockId == this.queryData.blockId
        //     ).blockName;
        //     exportExcel("#indexscv", blockName + "连通系数计算结果表");
        //   } else {
        //     this.$message.error("请选择油田与区块")
        //   }
        // },
        downloadTable() {
            let blockName = ''
            if (this.queryData.ogfId && this.queryData.blockId) {
                blockName = this.blockList.find((item) => item.blockId == this.queryData.blockId).blockName;
            }
            downLoadUnicomModeloperationDto(this.form.tableData).then((res) => {
                const aBlob = new Blob([res]);
                FileSaver.saveAs(aBlob, blockName + "连通系数计算结果表.xls");
            }).catch(() => {
                this.$message.error('下载失败')
            })
        },

        veitBut() {
            if (this.$refs['form'])
                this.$refs['form'].validate()
        },
        // 保存
        preserve(form) {
            let params = [];
            let data = this.form.tableData;
            for (var i = 0; i < data.length; i++) {
                params.push({
                    wellGroupId: data[i].wellGroupId,
                    proWellId: data[i].oilWellId,
                    remark: data[i].remark,
                    diviDingCoeff: data[i].diviDingCoeff,
                    dateTime: this.queryData.dateTime,
                });
            }
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.preserveLoad = true
                    postCoefficientConnectionpreserve(params).then(bool => {
                        if (bool) {
                            this.modify = false
                            // getUnicomInjSplit({
                            //     blockId: this.queryData.blockId,
                            //     dateTime: this.queryData.dateTime,
                            // }).then((res) => {
                            //     this.tableWater = res;
                            // }); 
                            // 接口404,接手代码。未知原因
                            this.$message.success("保存成功")
                        } else {
                            this.$message.error("保存失败")
                        }
                    }).finally(() => {
                        this.preserveLoad = false
                    })
                } else {
                    return false;
                }
            });
        },
        changeCellStyle(row, column, rowIndex, columnIndex) {
            //列的label的名称
            if (
                row.column.label === "连通系数?(动态调整)" ||
                row.column.label === "备注"
            ) {
                return "color:#EB7A3D";
            } else {
                return "";
            }
        },

        handleSelectionChange(val) {
            this.multipleSelection = [];
            val.forEach(item => {
                this.multipleSelection.push(item.wellGroupId)
            })
        },

        // 置换
        handleExchange() {
            this.exchangeVisible = true
            this.$nextTick(() => {
                this.$refs.multipleTable.clearSelection();
            })
        },

        // 置换保存
        saveExchange() {
            if (!this.multipleSelection.length || this.exchangeType === 1 && !this.isComputed || this.exchangeType === 2 && !this.isCorrected) {
                this.exchangeVisible = false
                return
            }

            if (this.exchangeType === 1) { // 计算——>动态调整
                this.form.tableData.forEach(item => {
                    if (this.multipleSelection.includes(item.wellGroupId)) {
                        item.diviDingCoeff = item.operationalNarration
                        item.injSplitData = item.operationInjSplitData
                    }
                })
            } else if (this.exchangeType === 2) { // 修正——>动态调整
                this.form.tableData.forEach(item => {
                    if (this.multipleSelection.includes(item.wellGroupId)) {
                        item.diviDingCoeff = item.correctionFactor
                        item.injSplitData = item.reviseInjSplitData
                    }
                })
            }
            this.$set(this.form, 'tableData', this.form.tableData)
            this.exchangeVisible = false
        },
    },
}
</script>
<style lang="scss" scoped>
// .case {
//   padding-top: 12px;
// }

.fl {
    margin-left: 10px;
}

.f2 {
    width: 140px;
    height: 40px;
    line-height: 40px;
}

.countBut {
    background-image: linear-gradient(to left, #e64f4f, #efa565);
    height: 40px;
}

.confirmBut {
    background: rgba(0, 0, 0, 0);
    border: 1px solid #66ffff;
}

.f3 {
    background: rgb(23, 45, 65);
    margin-left: 15px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    width: 230px;
}

.case4 {
    display: flex;
    justify-content: space-between;
}

.case2 {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.title {
    text-align: center;
}

.lian {
    color: #66ffff;
}

//::v-deep .el-form-item__content {
//    margin-left: 10% !important;
//    width: 80%;
//}

// ::v-deep input::-webkit-inner-spin-button {
//   -webkit-appearance: none !important;
// }

// ::v-deep input::-webkit-outer-spin-button {
//   -webkit-appearance: none !important;
// }

// ::v-deep input[type="number"] {
//   -moz-appearance: textfield;
// }

::v-deep .el-table__row {
    height: 65px;
}

#indexscv {
    ::v-deep .el-table__header-wrapper .cell {
        height: auto !important;;
        line-height: 18px !important;
        white-space: pre !important;;
    }

    ::v-deep .el-table__fixed-header-wrapper .cell {
        height: auto;
        line-height: 18px !important;
        white-space: pre;
    }

    ::v-deep .cell:empty {
        &::before {
            content: "-";
        }
    }

    .is-group {

    }
}
</style>
