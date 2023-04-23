<!--日度措施配产-->
<template>
    <div ref="mainRef" height="calc(100%)">
        <el-container style="overflow:scroll;">
            <el-header>
                <el-row>
                    作业公司：
                    <el-select v-model="conditions.companyId" @change="changeOGFList" disabled>
                        <el-option v-for="item in companyList" :key="item.orgId" :label="item.orgName" :value="item.orgId"></el-option>
                    </el-select>
                    油田：
                    <el-select v-model="conditions.ogfId" @change="searchPlatFormList">
                        <el-option v-for="item in ogfList" :key="item.ogfId" :label="item.ogfName" :value="item.ogfId"></el-option>
                    </el-select>
                    平台：
                    <el-select v-model="conditions.platformId" clearable>
                        <el-option v-for="item in platformList" :key="item.platId" :label="item.platName" :value="item.platId"></el-option>
                    </el-select>
                    预测年月:
                    <el-select v-model="conditions.yearMonth" placeholder="请选择" style="width:200px;" class="f1">
                        <el-option v-for="item in forecastYearMonthList" :key="item.source_ID" :label="item.source_NAME" :value="item.source_ID">
                        </el-option>
                    </el-select>
                    <el-button type="primary" icon="el-icon-search" @click="searchDataFromServer">检索</el-button>
                    <el-button type="primary" icon="el-icon-add" @click="save">保存</el-button>
                    <el-button type="primary" @click="showAddDialog">添加</el-button>
                </el-row>
            </el-header>
        </el-container>
        <el-main style="height:90%;">
            <div title="单井产量预测" style="height:90%;">
                <el-table :data="tableData" :height="dynamicHeight" :v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column align="left" label="当前作业井名" prop="wellNo" width="150"></el-table-column>
                    <el-table-column align="center" label="当前作业措施" prop="measureTypeName" width="150"></el-table-column>
                    <el-table-column align="center" label="产品类型" prop="productTypeName" width="100"></el-table-column>
                    <el-table-column align="center" label="措施见效日期" prop="measureSeffectDate" width="160">
                        <template slot-scope="scope">
                            <el-date-picker v-model="scope.row.measureSeffectDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                        </template>
                    </el-table-column>DAILY_ALLOCATING_BASE
                    <el-table-column align="center" label="日增油/日产油" prop="" width="160">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.dailyAllocatingBase" :precision=4 size="medium" style="width:150px;" controls-position="right"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="月递减率" prop="" width="160">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.decreaseRate" :precision=4 size="medium" style="width:150px;" controls-position="right"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="月时率" prop="" width="160">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.timeEfficieincy" :precision=4 size="medium" style="width:150px;" controls-position="right"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="见效天数" prop="effectDays" width="100"></el-table-column>
                    <el-table-column align="center" label="单井年配产量(m³)" prop="dailyAllocating" width="160">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.yearAllocating" :precision=4 size="medium" style="width:150px;" controls-position="right"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="备注" prop="remark">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.remark" size="medium"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button v-model="scope.row.wellMeasureImprovementId" size="small" @click="calcSingleWellMeasure(scope.row)">计算配产量</el-button>
                            <el-button v-model="scope.row.wellMeasureImprovementId" size="small" @click="deleteRow(scope.$index,scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-main>
        <el-dialog title="添加老井措施" :visible.sync="AddDialogFlag" width="30%" :modal-append-to-body="true" :close-on-press-escape="false" :destroy-on-close="true" :before-close="handleDialogClose">
            <fourAdd :ogfId="conditions.ogfId" :platId="conditions.platformId" :yearMonth="conditions.yearMonth" :handleDialogClose="handleDialogClose"></fourAdd>
        </el-dialog>
    </div>
</template>

<script>
    //参数设置页面
    import { getOrgInfo,getPlatInfo} from "@/api/oilDeposit/ipm-03/basedata.js";
    import {fetchALLOilFields,getLjpmWells } from "@/api/oilDeposit/rem-02/primaryinfo.js";
    // 导入方法
    import {getWellDailyMeasureInfo,insertWellDailyMeasureInfo,deleteWellDailyMeasureInfoByIds, calcSingleWellMeasureStatInfos } from "@/api/oilDeposit/rem-03/WellDailyMeasureImprove.js";
    import {getForecastDate} from '@/api/oilDeposit/rem-03/oilfieldmanageplan.js';
    import fourAdd from '../popups/fourAdd.vue'
    export default {
        components: {
            fourAdd
        },
        data() {
            return {
                loading: false, // 程序加载中标识
                AddDialogFlag: false,
                elTableHeight: 0,
                conditions: {
                    companyId: '', // 作业公司编号
                    ogfId: '', // 油田编号
                    platformId: '', // 平台编号
                    yearMonth: ''
                },
                companyList: [], // 作业公司数据集
                ogfList: [], // 油田数据集
                platformList: [], // 平台数据集
                forecastYearMonthList: [],
                tableData: [],
                wellSelList: [],

                dynamicHeight: 100 // 动态高度
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            async init() {
                await this.searchCompanyList();
                this.conditions.companyId = '29053E229AC34E70954249E0F084A20B' //秦皇岛-勃中作业公司
                await this.changeOGFList(); // 调用查询油田接口查询油田数据
                this.conditions.ogfId = '3FC9A818F5BC43B88270DB80BBB3018F' // QHD32-6油田
                await this.searchPlatFormList();
                this.getForecastDate(); //获取预测年月
            },
            //获取滚动预测日期下拉列表
            getForecastDate() {
                getForecastDate().then((res) => {
                    console.log("getForecastDate==>", res);
                    if (!res.data.code) {
                        this.forecastYearMonthList = res.data.data;
                    }
                });
            },
            //
            async searchDataFromServer() {
                if (!this.conditions.ogfId) {
                    this.$message.error('请选择油田')
                    return
                }
                if (!this.conditions.yearMonth) {
                    this.$message.error('请选择预测年月')
                    return
                }
                this.loading = true
                let params = {
                    rollingForecastDate: this.conditions.yearMonth,
                    ogfId: this.conditions.ogfId,
                    platform_id: this.conditions.platformId
                }
                getWellDailyMeasureInfo(params).then(res => {
                    this.tableData = res.data.data
                    this.loading = false
                    // 动态设置表格高度
                    this.dynamicHeight = window.innerHeight - 350
                })
                // 查询油田数据
                this.searchWellList()
            },
            //保存结果,策略:先删除，后保存
            save() {
                this.$message.info('保存中...')
                insertWellDailyMeasureInfo(this.tableData).then(res => {
                    console.log(res)
                    this.$message.info('保存成功...')
                })
            },
            //计算单井配产量
            calcSingleWellMeasure(row) {
                let params = {}
                // 措施见效日期
                params.measureSeffectDate = row.measureSeffectDate;
                // 日增油/日产油
                params.dailyAllocatingBase = row.dailyAllocatingBase;
                // 递减率
                params.decreaseRate = row.decreaseRate;
                // 时率
                params.timeEfficieincy = row.timeEfficieincy;
                // 见效天数
                params.effectDays = row.effectDays;
                console.log(params);
                calcSingleWellMeasureStatInfos(params).then(res => {
                    this.tableData.forEach(obj => {
                        if (row.wellMeasureImprovementId == obj.wellMeasureImprovementId) {
                            obj.yearAllocating = res.data.data
                        }
                    })
                    this.$message.success('计算成功')
                }).catch(e => {
                    this.$message.error('计算失败')
                })
            },
            //查询作业公司列表--页面初始化时加载
            async searchCompanyList() {
                getOrgInfo().then((data) => {
                    let code = data.data.code;
                    if (code == 200) {
                        this.companyList = data.data.data;
                    }
                });
            },
            //查询油田数据--切换作业公司时触发
            async changeOGFList() {
                //清空油田和平台的数据
                this.ogfList = [];
                this.platformList = [];
                this.conditions.ogfId = '';
                this.conditions.platformId = '';
                // 加载新数据
                fetchALLOilFields(this.conditions.companyId).then((res) => {
                    let msg = res.data.msg;
                    if (msg == "success") {
                        let myData = res.data.data.oilFields;
                        let array = []
                        myData.forEach(item => {
                            let ogf = {
                                ogfId: item.oilFieldId,
                                ogfName: item.name
                            }
                            array.push(ogf)
                        })
                        this.ogfList = array;
                    }
                });
            },
            //查询平台列表--切换油田时触发
            searchPlatFormList() {
                this.platformList = [];
                getPlatInfo(this.conditions.ogfId).then((data) => {
                    let code = data.data.code;
                    if (code == 0) {
                        this.platformList = data.data.data;
                    }
                });
            },
            searchWellList() {
                let params = {}
                params.ogfId = this.conditions.ogfId
                params.platId = this.conditions.platformId
                console.log(params);
                getLjpmWells(params).then(res => {
                    console.log(res)
                })
            },
            //删除行 @param index @param row
            deleteRow(index, row) {
                if (row.wellMeasureImprovementId) {
                    let array = []
                    array.push(row.wellMeasureImprovementId)
                    // 删除信息
                    deleteWellDailyMeasureInfoByIds(array).then(res => {
                        console.log(res)
                    })
                }
                this.tableData.splice(index, 1)
            },
            showAddDialog() {
                if (this.conditions.yearMonth == '') {
                    this.$message.warning('请选择预测版本')
                    return
                }
                this.AddDialogFlag = !this.AddDialogFlag
            },
            //关闭添加框
            handleDialogClose() {
                this.AddDialogFlag = false
            }
        }
    }
</script>

<style scoped>

</style>
