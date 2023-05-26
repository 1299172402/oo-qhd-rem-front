<template>
    <div class="app-container" style="height: 100%;">
        <header-search style="height: auto;display: grid">
            <el-form style="margin: 20px 0 10px 0" :inline="true">
                <el-form-item label="油田：">
                    <el-select v-model="params.ogfId.value" disabled>
                        <el-option
                            v-for="item in params.ogfList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="区块：">
                    <el-select v-model="params.blockId.value" disabled>
                        <el-option
                            v-for="item in params.blockList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="井别：">
                    <el-select v-model="params.wellCategory" class="f2" style="width: 100px" filterable disabled>
                        <el-option
                            v-for="item  in wellCategoryList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="井号：">
                    <el-select v-model="wellId" class="f2" disabled>
                        <el-option
                            v-for="item in params.wellId"
                            :key="item.wellId"
                            :label="item.wellName"
                            :value="item.wellId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间：">
                    <el-date-picker
                        v-model="params.value"
                        type="daterange"
                        range-separator="-"
                        style="width: 250px"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        disabled
                    ></el-date-picker>
                </el-form-item>
                <el-button type="primary" class="confirmBut" icon="el-icon-search" disabled>搜索</el-button>
                <el-button type="primary" class="commonBtn" icon="el-icon-refresh" disabled>重置</el-button>
                <el-button type="primary" class="confirmBut" icon="el-icon-back" style="float: right" @click="returned">返回</el-button>
            </el-form>
        </header-search>
        <page-panel header-title="单井劈分系数结果" style="height:calc(100% - 100px)">
            <el-form :inline="true">
                <el-form-item label="井号：">
                    <el-select v-model="wellId" @change="OilfieldBut">
                        <el-option
                            v-for="item in params.wellId"
                            :key="item.wellId"
                            :label="item.wellName"
                            :value="item.wellId"
                        ></el-option>
                    </el-select>
                    <el-button type="primary" style="margin-left: 20px" @click="handleAllSave">保存</el-button>
                    <el-button type="primary" @click="handleOperation">运行计算</el-button>
                </el-form-item>
                <el-button type="primary" icon="el-icon-download" class="commonBtn" style="float: right" @click="downloadTable">下载</el-button>
            </el-form>
            <el-table
                v-show="params.wellCategory === '01'"
                :data="tableData"
                style="width: 100%;"
                row-key="id"
                highlight
                height="calc(100% - 60px)"
                :span-method="deviceSpanMethod"
                border
                align="center"
                id="indexscv"
                @expand-change="expandChange"
                :cell-style="changeCellStyle"
                :tree-props="{children: 'layerData', hasChildren: 'hasChildren'}"
            >
                <el-table-column prop="name" label="层段" width="250"></el-table-column>
                <!-- <el-table-column prop="singleLAyer" label="小层"></el-table-column> -->
                <el-table-column prop="stateDate" label="开始时间" align="center"></el-table-column>
                <el-table-column prop="OpenStatus" label="状态" align="center">
                    <template slot-scope="scope">
                        <div>{{ scope.row.openStatus == true ? "打开" : "关闭" }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="airPermeability" label="渗透率(mD)" align="center"></el-table-column>
                <el-table-column prop="thicknessEffe" label="厚度(m)" align="center"></el-table-column>
                <el-table-column prop="ratio" label="劈分系数" align="center"></el-table-column>
                <el-table-column prop="remark" label="备注" align="center"></el-table-column>
                <el-table-column prop="address" width="150" align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="handelUpdate(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-table
                v-show="params.wellCategory === '02'"
                :data="tableData"
                style="width: 100%;margin-top:10px;"
                row-key="id"
                highlight
                height="calc(100% - 60px)"
                :span-method="deviceSpanMethod"
                border
                align="center"
                id="indexscvShui"
                @expand-change="expandChange"
                :cell-style="changeCellStyle"
                :tree-props="{children: 'waterLayerData', hasChildren: 'hasChildren'}"
            >
                <el-table-column prop="name" label="层段" width="250"></el-table-column>
                <!-- <el-table-column prop="singleLAyer" label="小层"></el-table-column> -->
                <!-- <el-table-column prop="OpenStatus" label="状态" align="center">
                  <template slot-scope="scope">
                    <div>{{ scope.row.openState == true ? "打开" : "关闭" }}</div>
                  </template>
                </el-table-column> -->
                <el-table-column prop="airPermeability" label="渗透率(mD)" align="center"></el-table-column>
                <el-table-column prop="thicknessEffe" label="厚度(m)" align="center"></el-table-column>
                <el-table-column prop="oilRatio" label="劈分系数" align="center"></el-table-column>
                <el-table-column prop="remark" label="备注" align="center"></el-table-column>
                <el-table-column prop="address" width="150" align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="handelUpdate(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </page-panel>
        <div v-if="params.wellCategory === '01'">
            <el-dialog title="修改" :visible.sync="redactBut" width="900px" append-to-body>
                <el-form ref="form" label-width="100px" :model="form" style="height: 500px;overflow-y: scroll">
                    <el-card
                        class="box-card"
                        v-for="(interval, index) in form.table"
                        :key="interval.intervalId"
                    >
                        <div slot="header" class="clearfix">
                            <el-row style="width:100%">
                                <el-col :span="2">{{ interval.intervNo }}</el-col>
                                <el-col :span="10">
                                    <el-form-item label="劈分系数" :prop="'table.'+index+'.ratio'" :rules="rules.ratio">
                                        <el-input
                                            style="width: 220px;"
                                            type="number"
                                            v-model="interval.ratio"
                                            placeholder="请输入劈分系数"
                                            @blur="vaitBut"
                                        />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="备注">
                                        <el-input style="width: 220px;" v-model="interval.remark"
                                                  placeholder="请输入备注"/>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                        <div v-for="(layer,layerIndex) in interval.layerData" :key="layer.intervalId">
                            <el-form-item
                                :label="layer.layerNo"
                                :prop="'table.'+index+'.layerData.' +layerIndex+'.ratio'"
                                :rules="rules.layerData"
                                label-width="200px"
                            >
                                <el-input
                                    type="number"
                                    style="width: 220px;"
                                    placeholder="请输入劈分系数"
                                    v-model="layer.ratio"
                                    @blur="vaitBut"
                                />
                            </el-form-item>
                        </div>
                    </el-card>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submit('form')">确 定</el-button>
                    <el-button @click="redactBut = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>

        <div v-if="params.wellCategory === '02'">
            <el-dialog title="修改" :visible.sync="redactBut" width="900px" append-to-body>
                <el-form ref="form" label-width="100px" :model="form"  style="height: 500px;overflow-y: scroll">
                    <el-card
                        class="box-card"
                        v-for="(interval, index) in form.table"
                        :key="interval.intervalId"
                    >
                        <div slot="header" class="clearfix">
                            <el-row style="width:100%">
                                <el-col :span="2">{{ interval.intervNo }}</el-col>
                                <el-col :span="10">
                                    <el-form-item label="劈分系数" :prop="'table.'+index+'.oilRatio'"
                                                  :rules="rules.oilRatio">
                                        <el-input
                                            style="width: 220px;"
                                            type="number"
                                            v-model="interval.oilRatio"
                                            placeholder="请输入劈分系数"
                                            @blur="vaitBut"
                                        />
                                    </el-form-item>
                                </el-col>

                                <el-col :span="10">
                                    <el-form-item label="备注">
                                        <el-input style="width: 220px;" v-model="interval.remark"
                                                  placeholder="请输入备注"/>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                        <div v-for="(layer,layerIndex) in interval.waterLayerData" :key="layer.intervalId">
                            <el-form-item
                                :label="layer.layerName"
                                :prop="'table.'+index+'.waterLayerData.' +layerIndex+'.oilRatio'"
                                :rules="rules.waterLayerData"
                                label-width="200px"
                            >
                                <el-input
                                    type="number"
                                    style="width: 220px;"
                                    placeholder="请输入劈分系数"
                                    v-model="layer.oilRatio"
                                    @blur="vaitBut"
                                />
                            </el-form-item>
                        </div>
                    </el-card>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submit('form')">确 定</el-button>
                    <el-button @click="redactBut = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
// import { exportExcel } from "@/lib/exportExcel";
import {
    postdividingCoefficient,
    postdividingCoefficientSave,
    exportDividingCoefficient
} from "@/api/rem/r-wellConnectEvaluate.js"
import {getChopSection, exportChopSection} from '@/api/rem/r-intelligentIPA.js';
import {v4 as uuidv4} from 'uuid';
import FileSaver from "file-saver";

export default {
    components: {},
    data() {
        // 油井
        var ratio = (rule, value, callback) => {
            let index = Number(rule.field.split('.')[1])
            if (this.form.table[index].layerData.length > 0) {
                let arr = 0
                this.form.table[index].layerData.forEach(item => {
                    arr += item.ratio * 100
                })

                if (isNaN(arr)) {
                    return callback(new Error("输入不正确"))
                }
                if (arr != this.form.table[index].ratio * 100) {
                    return callback(new Error("小层劈分系数之和与防砂段不相等"))
                } else {
                    return callback()
                }
            } else {
                return callback()
            }
        }
        // 水井
        var oilRatio = (rule, value, callback) => {
            let index = Number(rule.field.split('.')[1])
            if (this.form.table[index].waterLayerData.length > 0) {
                let arr = 0
                this.form.table[index].waterLayerData.forEach(item => {
                    arr += item.oilRatio * 100
                })
                if (isNaN(arr)) {
                    return callback(new Error("输入不正确"))
                }
                if (arr != this.form.table[index].oilRatio * 100) {
                    return callback(new Error("小层劈分系数之和与防砂段不相等"))
                } else {
                    return callback()
                }
            } else {
                return callback()
            }
        }
        return {
            well: [],
            wellId: undefined, //井号
            //井别下拉框
            wellCategoryList: [
                {id: "01", name: "油井"},
                {id: "02", name: "水井"},
            ],
            type: 0,	 //0：查询列表 1：运算结果
            tableData: [],
            redactBut: false,
            childrenArr1: 0,
            childrenLength: 0,
            key: [],
            values: [],
            childrenArr: [],
            form: {
                table: [],
            },
            datayear: '',
            rules: {
                ratio: [
                    {
                        type: 'string',
                        required: true,
                        pattern: /^((^[0-9]{1,2})\.([0-9]{1,2})$)|^((^[0-9]{0,2})$)|^(([0-9]{1,2})\.([0-9])([1-9])$)|^(([0-9]{1,2})$)/,
                        message: '输入不正确'
                    },
                    {
                        validator: ratio, trigger: ['blur', 'change']
                    }
                ],
                layerData: [
                    {
                        type: 'string',
                        trigger: 'change',
                        required: true,
                        pattern: /^((^[0-9]{1,2})\.([0-9]{1,2})$)|^((^[1-9]{1,2})$)|^(([0-9]{1,2})\.([0-9])([1-9])$)|^(([1-9]{1,2})$)/,
                        message: '输入不正确',
                    },
                    {
                        validator: ratio, trigger: ['blur', 'change']
                    }
                ],
                oilRatio: [
                    {
                        type: 'string',
                        required: true,
                        pattern: /^((^[0-9]{1,2})\.([0-9]{1,2})$)|^((^[0-9]{0,2})$)|^(([0-9]{1,2})\.([0-9])([1-9])$)|^(([0-9]{1,2})$)/,
                        message: '输入不正确'
                    },
                    {
                        validator: oilRatio, trigger: ['blur', 'change']
                    }
                ],
                waterLayerData: [
                    {
                        type: 'string',
                        trigger: 'change',
                        required: true,
                        pattern: /^((^[0-9]{1,2})\.([0-9]{1,2})$)|^((^[1-9]{1,2})$)|^(([0-9]{1,2})\.([0-9])([1-9])$)|^(([1-9]{1,2})$)/,
                        message: '输入不正确',
                    },
                    {
                        validator: oilRatio, trigger: ['blur', 'change']
                    }
                ]
            },
            params: {
                ogfId: {value: '', label: ''},
                blockId: [],
                ogfList: [],
                blockList: [],
                wellCategory: '',
            },
        }
    },
    mounted() {
        const params = JSON.parse(localStorage.getItem('PRODUCTION_SPLIT'))
        if (params) {
            this.params = {...params, ogfList: [params.ogfId], blockList: [params.blockId]}
            this.well = params.wellId
            this.wellId = params.wellId[0].wellId
        }
        this.OilfieldBut()
    },
    methods: {
        getdata() {
            var arr = this.tableData
            const num = arr.reduce((acc, item) => {
                acc[item.stateDate] ? acc[item.stateDate]++ : acc[item.stateDate] = 1
                return acc
            }, {})
            this.key = Object.keys(num)
            this.values = Object.values(num)
            this.childrenArr1 = this.tableData.length
            this.childrenArr = Array(this.values.length).fill(0)
        },
        // 表格列的颜色
        changeCellStyle(row, column, rowIndex, columnIndex) {
            //列的label的名称
            if (
                row.column.label === "劈分系数" ||
                row.column.label === "备注"
            ) {
                return "color:#66ffff"; //修改的样式
            } else {
                return "";
            }
        },
        // 合并表格
        deviceSpanMethod({row, column, rowIndex, columnIndex}) {
            if (this.params.wellCategory === '01') {
                if (columnIndex === 7) {
                    if (rowIndex < this.values[0]) {
                        return {
                            rowspan: this.values[0] + this.childrenArr[0],
                            colspan: 1
                        };
                    } else if (rowIndex >= this.values[0]) {
                        return {
                            rowspan: this.values[1] + this.childrenArr[1],
                            colspan: 1
                        };
                    }
                }
            } else {
                if (columnIndex === 6) {
                    return {
                        rowspan: this.childrenArr1,
                        colspan: 1
                    }
                }
            }
        },
        // 点击树形展开按钮的回调事件，重新改变表格数据，自动计算合并行
        expandChange(row, expanded) {
            console.log(row, expanded)
            if (this.params.wellCategory === '01') {
                for (let i = 0; i < this.key.length; i++) {
                    if (row.stateDate == this.key[i]) {
                        if (expanded) {
                            this.childrenArr[i] += row.layerData.length
                        } else {
                            this.childrenArr[i] = this.childrenArr[i] - row.layerData.length
                        }
                    }
                }
            } else {
                console.log(this.childrenArr1)
                if (expanded) {
                    this.childrenArr1 += row.waterLayerData.length
                } else {
                    this.childrenArr1 = this.childrenArr1 - row.waterLayerData.length
                }
                console.log(this.childrenArr1)
            }
        },
        // 编辑
        handelUpdate(row) {
            this.form.table = []
            this.redactBut = true
            this.tableData.forEach(i => {
                if (i.stateDate == row.stateDate) {
                    this.form.table.push(JSON.parse(JSON.stringify(i)))
                    this.datayear = i.stateDate
                }
            })

            this.$nextTick(() => {
                this.$refs['form'].clearValidate()
            })
        },
        vaitBut() {
            this.$refs['form'].validate()
        },
        // 提交
        submit(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.form.table.forEach(i => {
                        i.DividingCoefficient = 0
                        if (Array.isArray(i.layerData)) {
                            i.layerData.forEach(j => {
                                i.DividingCoefficient += parseFloat(j.DividingCoefficient)
                            })
                        }
                    })

                    let arr = 0
                    for (const item of this.form.table) {
                        if (this.params.wellCategory === '01') {
                            arr += item.ratio * 100
                        } else if (this.params.wellCategory === '02') {
                            arr += item.oilRatio * 100
                        }
                    }
                    if (arr != 100) {
                        this.$message.error("劈分系数相加不等于1")
                        return
                    }
                    const type = this.params.wellCategory === '01' ? 1 : this.params.wellCategory === '02' ? 2 : 0
                    // 保存数据
                    this.submitSave({
                        wellId: this.wellId,
                        type,
                        divCoefficLayerDtoList: this.form.table
                    }).finally(() => {
                        this.redactBut = false
                    })
                } else {
                    return false
                }
            })
        },

        handleAllSave() {
            const type = this.params.wellCategory === '01' ? 1 : this.params.wellCategory === '02' ? 2 : 0
            this.submitSave({wellId: this.wellId, type, divCoefficLayerDtoList: this.tableData})
        },

        // 保存
        submitSave(data) {
            return postdividingCoefficientSave(data).then(() => {
                this.OilfieldBut()
                this.$message.success("提交成功")
            }).catch(() => {
                this.$message.error("提交失败")
            })
        },

        // 下载
        downloadTable() {
            let wellName = undefined
            if (Array.isArray(this.params.wellId)) {
                for (const item of this.params.wellId) {
                    if (item.wellId == this.wellId) {
                        wellName = item.wellName
                        break
                    }
                }
            }
            if (this.params.wellCategory === '01') {
                // exportExcel("#indexscv", arr + "单井劈分系数结果");
                exportDividingCoefficient({
                    wellName: wellName,
                    wellId: this.wellId,
                    wellType: this.params.wellCategory,
                    blockId: this.params.blockId.value,
                    endTime: this.params.value[1],
                    startTime: this.params.value[0],
                    type: 0,
                }).then((res) => {
                    const aBlob = new Blob([res]);
                    FileSaver.saveAs(aBlob, `${wellName}单井劈分系数结果.xls`);
                })
            } else if (this.params.wellCategory === '02') {
                // exportExcel("#indexscvShui", arr + "单井劈分系数结果");
                exportChopSection({
                    apprndixId: this.params.wellCategory,
                    beginTime: this.params.value[0],
                    endTime: this.params.value[1],
                    ogfId: this.params.ogfId.value,
                    wellId: this.wellId,
                    blockId: this.params.blockId.value,
                }).then((res) => {
                    const aBlob = new Blob([res]);
                    FileSaver.saveAs(aBlob, `${wellName}单井劈分系数结果.xls`);
                })
            }
        },
        // 运行计算
        handleOperation() {
            if (this.params.wellCategory === '02') {
                return
            }
            this.type = 1
            this.OilfieldBut()
        },

        // 通过井号下拉获取表格数据
        OilfieldBut() {
            let wellName = undefined
            if (Array.isArray(this.params.wellId)) {
                for (const item of this.params.wellId) {
                    if (item.wellId == this.wellId) {
                        wellName = item.wellName
                        break
                    }
                }
            }
            if (this.params.wellCategory === "01") {
                postdividingCoefficient({
                    wellName: wellName,
                    wellId: this.wellId,
                    wellType: this.params.wellCategory,
                    blockId: this.params.blockId.value,
                    endTime: this.params.value[1],
                    startTime: this.params.value[0],
                    type: this.type,
                }).then((res) => {
                    this.tableData = res.map(item => {
                        item.id = uuidv4();
                        item.name = item.intervNo;
                        item.stateDate = item.stateDate ? item.stateDate.replaceAll('-', '/') : ''
                        item.airPermeability = Math.floor(item.airPermeability)
                        item.ratio = Number(item.ratio).toFixed(2)
                        if (Array.isArray(item.layerData) && item.layerData.length) {
                            item.layerData.forEach(layer => {
                                layer.stateDate = layer.stateDate ? layer.stateDate.replaceAll('-', '/') : ''
                                layer.airPermeability = Math.floor(layer.airPermeability)
                                layer.ratio = Number(layer.ratio).toFixed(2)
                                layer.id = uuidv4();
                                layer.name = layer.layerNo;
                            })
                        }
                        return item;
                    })
                    this.getdata()
                }).finally(() => {
                    this.type = 0
                })
            } else {
                getChopSection({
                    apprndixId: this.params.wellCategory,
                    beginTime: this.params.value[0],
                    endTime: this.params.value[1],
                    ogfId: this.params.ogfId.value,
                    wellId: this.wellId,
                    blockId: this.params.blockId.value,
                }).then((res) => {
                    this.tableData = res.map(item => {
                        item.id = item.intervId;
                        item.name = item.intervNo;
                        // item.airPermeability = Math.floor(item.airPermeability)
                        // item.ratio = Number(item.ratio).toFixed(2)
                        item.waterLayerData.forEach(layer => {
                            //   layer.airPermeability = Math.floor(layer.airPermeability)
                            //   layer.ratio = Number(layer.ratio).toFixed(2)
                            layer.id = layer.layerId;
                            layer.name = layer.layerName;
                        })
                        return item;
                    })
                    this.getdata()
                })

            }

        },
        // 返回按钮
        returned() {
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    margin-top: 15px;
    align-items: center;

    div {
        margin-left: 10px;
    }
}

.f2 {
    width: 140px;
    height: 40px;
    line-height: 40px;
}

.f3 {
    background: rgb(23, 45, 65);
    height: 40px;
    line-height: 40px;
    text-align: center;
    width: 230px;
}

.item {
    margin-left: 30px;
    margin-bottom: 5px;
}

::v-deep.el-card {
    background: rgba(0, 0, 0, 0);
    color: white;
}

.clearfix {
    display: flex;
    align-items: center;

    .el-input {
        width: 150px;
        margin-left: 10px;
    }
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both;
}

.box-card {
    //   width: 550px;
    margin: auto;
    margin-bottom: 5px;
}

::v-deep .el-icon-arrow-right:before {
    content: "\e6e0";
    color: #66ffff;
    font-size: 16px;
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
</style>
