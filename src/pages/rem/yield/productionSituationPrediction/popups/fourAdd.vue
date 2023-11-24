<template>
    <normal-card title="添加老井措施">
        <el-form :model="formObj" label-width="150px">
            <el-form-item label="当前作业井名">
                <el-select v-model="formObj.wellId" filterable>
                    <el-option v-for="item in pageList.wellList" :key="item.wellId" :label="item.wellName" :value="item.wellId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="当前作业措施">
                <el-input v-model="formObj.measureTypeName" size="medium" @focus="showSelDialog"></el-input>
            </el-form-item>
            <el-form-item label="产品类型">
                <el-select v-model="formObj.productTypeCode">
                    <el-option v-for="item in pageList.productTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="措施见效日期">
                <el-date-picker v-model="formObj.measureSeffectDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="日增油/日产油">
                <el-input-number v-model="formObj.dailyAllocatingBase" :precision="4" size="medium" style="width:150px;" controls-position="right"></el-input-number>
            </el-form-item>
            <el-form-item label="月递减率">
                <el-input-number v-model="formObj.decreaseRate" :precision="4" size="medium" style="width:150px;" controls-position="right"></el-input-number>
            </el-form-item>
            <el-form-item label="月时率">
                <el-input-number v-model="formObj.timeEfficieincy" :precision="4" size="medium" style="width:150px;" controls-position="right"></el-input-number>
            </el-form-item>
            <el-form-item label="见效天数">
                <el-input-number v-model="formObj.effectDays" size="medium" style="width:150px;" controls-position="right"></el-input-number>
            </el-form-item>
            <el-form-item label="单井年配产量(m³)">
                <el-input-number v-model="formObj.yearAllocating" :precision="4" size="medium" style="width:150px;" controls-position="right"></el-input-number>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="formObj.remark" size="medium"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="calcSingleWellMeasure">计算单井配产量</el-button>
                <el-button type="primary" @click="saveEvt">保存</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="选择作业措施" :visible.sync="SelDialogFlag" width="30%" height="40%" :modal-append-to-body="false" :close-on-press-escape="false" :destroy-on-close="true">
            <selectOperationalMeasures :recvData="recvData"></selectOperationalMeasures>
        </el-dialog>
    </normal-card>
</template>
<script>
    import {getLjpmWells} from "@/api/oilDeposit/rem-02/primaryinfo.js";
    import {insertWellDailyMeasureInfoSingle,calcSingleWellMeasureStatInfos} from "@/api/oilDeposit/rem-03/WellDailyMeasureImprove.js";
    import selectOperationalMeasures from "./selectOperationalMeasures.vue";
    export default {
        components: {
            selectOperationalMeasures
        },
        props: {
            ogfId: String,
            platId: String,
            yearMonth: String,
            handleDialogClose: Function
        },
        watch: {
            ogfId() {
                this.init()
            }
        },
        data() {
            return {
                params: {
                    ogfId: '',
                    platId: ''
                },
                SelDialogFlag: false, // 作业措施选择框展现标识
                formObj: {
                    wellId: '', // 当前作业井名
                    forecastYearmonth: '', // 预测版本

                    measureTypeCode1: '', // 当前作业措施代码
                    measureTypeName: '', // 当前作业措施名称

                    productTypeCode: '002001', // 产品类型
                    measureSeffectDate: '', // 措施见效日期
                    dailyAllocatingBase: '', // 日增油、日产油
                    decreaseRate: 0, //月递减率
                    timeEfficieincy: 0, //月时率
                    effectDays: 365, // 见效天数
                    yearAllocating: 0, // 单井年配产量
                    remark: '' // 备注
                },
                pageList: {
                    wellList: [], // 当前作业井列表
                    measureTypeList: [], // 当前作业措施列表
                    productTypeList: [{
                        id: '002001',
                        name: '原油'
                    }, {
                        id: '004001',
                        name: '天然气'
                    }] 
                }
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            //初始化加载数据
            init() {
                getLjpmWells({
                    ogfId: this.ogfId,
                    platId: this.platId
                }).then(res => {
                    this.pageList.wellList = res.data.data
                })
            },
            //计算单井配产量
            calcSingleWellMeasure() {
                let params = {};
                // 措施见效日期
                params.measureSeffectDate = this.formObj.measureSeffectDate;
                // 日增油/日产油
                params.dailyAllocatingBase = this.formObj.dailyAllocatingBase;
                // 递减率
                params.decreaseRate = this.formObj.decreaseRate;
                // 时率
                params.timeEfficieincy = this.formObj.timeEfficieincy;
                // 见效天数
                params.effectDays = this.formObj.effectDays;
                calcSingleWellMeasureStatInfos(params).then(res => {
                    this.formObj.yearAllocating = res.data.data
                    this.$message.success('计算成功')
                }).catch(e => {
                    this.$message.error('计算失败')
                })
            },
            //表单元素验证
            validateForm() {
                let flag = true
                if (!this.formObj.wellId) {
                    flag = false
                    this.$message.warning('请选择作业井名')
                    return flag
                }
                return flag
            },
            //保存
            saveEvt() {
                this.formObj.forecastYearmonth = this.yearMonth;
                if (this.validateForm()) {
                    insertWellDailyMeasureInfoSingle(this.formObj).then(res => {
                        if (res.data.data) {
                            this.$message.success('保存成功')
                            this.handleDialogClose()
                        }
                    }).catch(err => {
                        this.$message.error('保存失败')
                    })
                }
            },
            showSelDialog() {
                this.SelDialogFlag = true
            },
            recvData(data) {
                this.formObj.measureTypeCode1 = data.code
                this.formObj.measureTypeName = data.label
                this.SelDialogFlag = false
            }
        },
    }
</script>
