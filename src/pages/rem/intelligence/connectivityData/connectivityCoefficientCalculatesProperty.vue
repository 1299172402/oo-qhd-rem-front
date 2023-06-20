<template>
    <div class="app-container" style="height:100%">
        <header-search>
            <el-form style="margin: 20px 0 10px 0" :inline="true">
                <el-form-item label="油田：">
                    <el-select v-model="Select.ogf" disabled>
                        <el-option :value="Select.ogf" :label="Select.ogfName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="区块：">
                    <el-select v-model="Select.block" disabled @change="changeBlock">
                        <el-option :label="Select.blockName" :value="Select.block"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间：">
                    <el-date-picker
                        v-model="Select.dateTime"
                        type="month"
                        value-format="yyyy-M"
                        disabled
                    ></el-date-picker>
                </el-form-item>
<!--                <el-button type="primary" icon="el-icon-search" size="mini" class="confirmBut">确认</el-button>-->
<!--                <el-button type="primary" icon="el-icon-refresh" size="mini" class="commonBtn">重置</el-button>-->
                <el-button type="primary"  @click="returnBut" class="confirmBut" style="float: right">返回</el-button>
            </el-form>
        </header-search>
        <page-panel header-title="井组参数配置">
            <el-form style="margin: 0" :inline="true">
                <el-form-item label="井组名称：">
                    <el-select v-model="selectBlock" placeholder="请选择" @change="changeBlock">
                        <el-option
                            v-for="item in blanks"
                            :key="item.wellGroupId"
                            :label="item.wellGroupName"
                            :value="item.wellGroupId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-button
                    type="primary"
                    size="mini"
                    icon="el-icon-edit"
                    class="confirmBut"
                    :disabled="disabledComp || !form.tableWater.length"
                    @click="modify = !modify"
                >更改
                </el-button>
                <el-button
                    type="primary"
                    size="mini"
                    :loading="saveLoad"
                    icon="el-icon-bank-card"
                    class="confirmBut"
                    :disabled="disabledComp || !form.tableWater.length"
                    @click="preserve('form')"
                >保存
                </el-button>
                <el-button
                    type="primary"
                    size="mini"
                    @click="downloadTable"
                    style="float: right"
                >下载
                </el-button>
            </el-form>
            <el-form ref="form" :rules="rules"  :model="form" style="height: 100%">
          
                <el-table
                    id="indexscv"
                    :data="form.tableWater"
                    highlight
                    style="margin-top: 10px"
                    height="90%"
                    :span-method="mergeTable"
                >
                    <el-table-column
                        prop="wellGroupName"
                        show-overflow-tooltip
                        label="井组名称"
                        align="center"
                    ></el-table-column>
                    <el-table-column prop="injWellNo" show-overflow-tooltip label="水井井号"
                                     align="center"></el-table-column>
                    <el-table-column prop="layerName" show-overflow-tooltip label="层位名称"
                                     align="center"></el-table-column>
                    <el-table-column prop="proWellNo" label="油井井号" show-overflow-tooltip
                                     align="center"></el-table-column>
                    <el-table-column
                        prop="wellSpacing"
                        min-width="40px"
                        label="注采井距?(m)"
                        :render-header="renderheader"
                        show-overflow-tooltip
                        align="center"
                    
                    >
                        <template slot-scope="scope">
                            <el-form-item
                                :prop="'tableWater.'+scope.$index+'.wellSpacing'"
                                :rules="rules.wellSpacing"
                                v-if="modify"
                            >
                                <el-input type="number" v-model="scope.row.wellSpacing" @blur="viteBut"/>
                            </el-form-item>
                            <span v-else>{{ scope.row.wellSpacing }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="aroundWellNum"
                        label="周围注采井数(口)"
                        style="color: aquamarine;height: 200px;"
                        :render-header="renderHeader"
                        min-width="40px"
                        show-overflow-tooltip
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-form-item
                                :prop="'tableWater.'+scope.$index+'.aroundWellNum'"
                                :rules="rules.aroundWellNum"
                                v-if="modify"
                            >
                                <el-input type="number" v-model="scope.row.aroundWellNum" @blur="viteBut"/>
                            </el-form-item>
                            <span v-else>{{ scope.row.aroundWellNum }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="井控面积?(m²/口)"
                        prop="wellControlArea"
                        :render-header="renderheader"
                        min-width="40px"
                        show-overflow-tooltip
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-form-item :prop="'tableWater.'+scope.$index+'.wellControlArea'" v-if="modify">
                                <el-input type="number" v-model="scope.row.wellControlArea" @blur="viteBut"/>
                            </el-form-item>
                            <span v-else>{{ scope.row.wellControlArea }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="airPermeability"
                        min-width="50px"
                        label="渗透率?(mD)"
                        :render-header="renderheader"
                        show-overflow-tooltip
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-form-item :prop="'tableWater.'+scope.$index+'.airPermeability'" v-if="modify">
                                <el-input type="number" v-model="scope.row.airPermeability" @blur="viteBut"/>
                            </el-form-item>
                            <span v-else>{{ scope.row.airPermeability }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="thicknessEffe"
                        min-width="40px"
                        label="有效厚度?(m)"
                        :render-header="renderheader"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="shaleContent"
                        min-width="40px"
                        label="泥质含量?(%)"
                        :render-header="renderheader"
                        show-overflow-tooltip
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-form-item :prop="'tableWater.'+scope.$index+'.shaleContent'" v-if="modify">
                                <el-input type="number" v-model="scope.row.shaleContent" @blur="viteBut"/>
                            </el-form-item>
                            <span v-else>{{ scope.row.shaleContent }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
        </page-panel>
    </div>
</template>
<script>

import {exportExcel} from "@/lib/exportExcel";
import {
    postCoefficientconnectivity,
    postWellgroupRevise,
    getselectWellGroup, //井组下拉
    downloadGroupParamDTO
} from "@/api/rem/r-wellConnectEvaluate.js";
import HelpHint from "@/pages/rem/intelligence/connectivityData/tooltig.vue"
import FileSaver from "file-saver";

export default {
    name:'coefficientCalculates',
    components: {
        HelpHint
    },
    data() {
        return {
            blanks: [],
            selectBlock: 0,
            modify: false,
            form: {
                tableWater: [],
            },
            Select: {
                block: undefined,
                blockName: '',
                ogf: undefined,
                ogfName: '',
                dateTime: ''

            },
            rules: {
                aroundWellNum: [
                    {
                        required: true,
                        pattern: /^((^[0-9]{1,4})$)|^((^[0-9]{1,4})\.([0-9]{1,4})$)/,
                        message: '输入不正确',
                    }
                ],
                wellSpacing: [
                    {
                        required: true,
                        pattern: /^((^[0-9]{1,4})$)|^((^[0-9]{1,4})\.([0-9]{1,4})$)/,
                        message: '输入不正确',
                    }
                ],
                wellControlArea: [
                    {required: true, pattern: /^((^[0-9]{0,4})$)/, message: '输入不正确',}
                ],
                airPermeability: [
                    {
                        required: true,
                        pattern: /^((^[0-9]{1,4})$)|^((^[0-9]{1,4})\.([0-9]{1,4})$)/,
                        message: '输入不正确',
                    }
                ],
                shaleContent: [
                    {
                        required: true,
                        pattern: /^((^[0-9]{1,4})$)|^((^[0-9]{1,4})\.([0-9]{1,4})$)/,
                        message: '输入不正确',
                    }
                ]
            },
            mergeArr: ['wellGroupName'],
            mergeObj: {},
            saveLoad: false,
            disabledComp: false,
        };
    },
    mounted() {
        //获取井组下拉数据
        const params = JSON.parse(localStorage.getItem('CONNECTIVITY_DATA'))
        if (params && params.blockId) {
            this.Select.block = params.blockId
            this.Select.blockName = params.blockName
            this.Select.ogf = params.ogfId
            this.Select.ogfName = params.ogfName
            this.Select.dateTime = params.dateTime
        }

        this.selectData();
        this.changeBlock(0)
    },
    methods: {
        mergeTable({row, column, rowIndex, columnIndex}) {
            if (columnIndex === 0) {
                if (this.mergeObj['wellGroupName'][rowIndex]) {
                    return [this.mergeObj['wellGroupName'][rowIndex], 1]
                } else {
                    return [0, 0]
                }
            }

            if (columnIndex === 1) {
                if (this.mergeObj['wellGroupName'][rowIndex]) {
                    return [this.mergeObj['wellGroupName'][rowIndex], 1]
                } else {
                    return [0, 0]
                }
            }

            if (columnIndex === 2) {
                if (this.mergeObj['wellGroupName'][rowIndex]) {
                    return [this.mergeObj['wellGroupName'][rowIndex], 1]
                } else {
                    return [0, 0]
                }
            }
        },
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
        returnBut() {
            this.$router.go(-1)
        },
        // 表格下载
        // downloadTable () {
        //   exportExcel("#indexscv", this.Select.blockName + "井组参数配置");
        // },
        downloadTable() {
            downloadGroupParamDTO(this.form.tableWater).then((res) => {
                const aBlob = new Blob([res]);
                FileSaver.saveAs(aBlob, this.Select.blockName + "井组参数配置.xls");
            }).catch(() => {
                this.$message.error('下载失败')
            })
        },
        // 获取井组下拉数据
        selectData() {
            let params = {
                ogfId: this.Select.ogf,
                blockId: this.Select.block,
                dateTime: this.Select.dateTime,
            };
            getselectWellGroup(params).then((res) => {
                this.blanks = res;
                this.blanks.unshift({
                    wellGroupId: 0,
                    wellGroupName: '全部'
                })
            });
        },
        viteBut() {
            if (this.$refs['form'])
                this.$refs['form'].validate()
        },
        // 井组点击事件
        changeBlock(e) {
            let params = {}
            if (e == 0) {
                params = {
                    wellGroupId: '',
                    ogfId: this.Select.ogf,
                    blockId: this.Select.block,
                    dateTime: this.Select.dateTime,
                    apifoxApild: "48248204"
                };
            } else {
                params = {
                    wellGroupId: this.selectBlock,
                    ogfId: this.Select.ogf,
                    blockId: this.Select.block,
                    dateTime: this.Select.dateTime,
                    apifoxApild: "48248204"
                };
            }
            postCoefficientconnectivity(params).then((res) => {
                if (Array.isArray(res) && res.length) {
                    this.disabledComp = this.Select.dateTime !== (new Date(res[0].updateYearMonth)).format("yyyy-MM")
                }
                res.forEach(item => {
                    item.wellSpacing = item.wellSpacing ? item.wellSpacing : ''
                    item.aroundWellNum = item.aroundWellNum ? item.aroundWellNum : ''
                    item.wellControlArea = item.wellControlArea ? item.wellControlArea : ''
                    item.airPermeability = item.airPermeability ? Math.round(item.airPermeability) : ''
                    item.thicknessEffe = item.thicknessEffe ? item.thicknessEffe : ''
                    item.shaleContent = item.shaleContent ? Number(item.shaleContent).toFixed(1) : ''
                });
                this.form.tableWater = res
                this.getSpanArr(res)
            });
        },
        // 保存
        preserve(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    let params = [];
                    for (const item of this.form.tableWater) {
                        params.push({
                            wellGroupId: item.wellGroupId,
                            injWellId: item.injWellId,
                            oilWellId: item.oilWellId,
                            wellGroupDataId: item.wellGroupdataId,
                            wellSpacing: item.wellSpacing,
                            aroundWellNum: item.aroundWellNum,
                            wellControlArea: item.wellControlArea,
                            airPermeability: item.airPermeability,
                            thicknessEffe: item.thicknessEffe,
                            shaleContent: item.shaleContent,
                            layerId: item.layerId,
                            proWellId: item.proWellId,
                            updateYearMonth: item.updateYearMonth,
                        });
                    }
                    postWellgroupRevise(params).then((res) => {
                        if (res.code == 0) {
                            this.$message.success("保存成功!");
                        } else {
                            this.$message.error( "保存失败!");
                        }
                    });
                    this.modify = false;
                } else {
                    return false;
                }
            });
        },
        renderheader(h, {column, $index}) {
            return h('span', {}, [
                h('span', {}, column.label.split('?')[0]),
                h('br'),
                h('span', {}, column.label.split('?')[1])
            ]);
        },
        renderHeader(h, {column}) {
            // 悬浮提示的文字内容
            const info = '以油井为中心，周围注水井和采油井的井数之和'
            return h(
                'div',
                [
                    h('span', column.label),
                    // placement指定悬浮显示方向
                    h('el-tooltip', {props: {placement: 'top', effect: 'light'}},
                        [
                            // style 调文字颜色样式
                            h('div', {slot: 'content', style: {whiteSpace: 'normal', color: 'blue'}}, info),
                            // el-icon-warning是element图标, style 调图标颜色 样式
                            h('i', {class: 'el-icon-warning', style: 'color: #409EFF; margin-left: 5px;'})
                        ]
                    )
                ]
            )
        }
    },
};
</script>

<style lang="scss" scoped>
</style>
