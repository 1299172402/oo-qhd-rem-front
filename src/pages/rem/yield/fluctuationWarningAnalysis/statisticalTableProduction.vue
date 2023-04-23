<!-- 产量波动统计表 -->
<template>
    <div class="app-container">
        <headerSearch class="g-w100 g-h100" style="height:auto;padding-top:18px;padding-bottom:8px;margin-bottom:20px;">
            <div style="display: flex;align-items: center;flex-wrap:wrap;">
                <div style="margin-right:15px;margin-bottom:10px;">
                    <span>油田：</span>
                    <el-select v-model="selectOilField" disabled @change="onFieldChange" style="width:165px;">
                        <el-option v-for="(item, index) in oilFields" :key="index" :label="item.name" :value="item.oilFieldId"></el-option>
                    </el-select>
                </div>
                <div style="margin-right:15px;margin-bottom:10px;">
                    <span>平台：</span>
                    <el-select v-model="selectPlatform" @change="onPlatfromChange" style="width: 220px;">
                        <el-option v-for="(item, index) in platforms" :key="index" :label="item.platName" :value="item.platFormId"></el-option>
                    </el-select>
                </div>
                <div style="margin-right:15px;margin-bottom:10px;">
                    <span>井号：</span>
                    <el-select v-model="wellId" filterable @change="getMeasureNameAndCode" style="width:170px;">
                        <el-option v-for="(item, index) in wells" :key="index" :label="item.wellName" :value="item.wellId"></el-option>
                    </el-select>
                </div>
                <div style="margin-right:15px;margin-bottom:10px;">
                    <span>对比基准日期：</span>
                    <el-date-picker v-model="dateTime" :clearable="false" style="width:160px;" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                </div>
                <div style="margin-right:15px;margin-bottom:10px;">
                    <span>对比日期：</span>
                    <el-date-picker v-model="dateTime2" :clearable="false" style="width:160px;" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                </div>
                <div style="margin-right:15px;margin-bottom:10px;">
                    <span>影响因素：</span>
                    <el-select v-model="measureId" style="width:170px;">
                        <el-option label="全部" value="全部"></el-option>
                        <el-option label="含水上升" value="含水上升"></el-option>
                        <el-option label="产液下降" value="产液下降"></el-option>
                        <el-option label="转注" value="转注"></el-option>
                        <el-option label="降频控制" value="降频控制"></el-option>
                        <el-option label="机组故障" value="机组故障"></el-option>
                    </el-select>
                </div>
                <div style="margin-right:15px;margin-bottom:10px;">
                    <el-button type="primary" icon="el-icon-search" @click="getFetchMeasureInfos">检索</el-button>
                </div>
            </div>
        </headerSearch>
        <div class="z-container">
            <pagePanelNew style="height:100%;margin-top:0;">
                <div class="pageHeader"
                    style="width:100%;display: flex;align-items: center;justify-content: space-between;margin-bottom:10px;margin-left: 0;">
                    <span>秦皇岛32-6油田单井产量变化</span>
                </div>
                <div class="tableBox" id="tableBox" style="height:calc(100% - 75px)">
                    <el-table 
                      id="tableData" 
                      :data="tableData" 
                      :border="false"
                      :row-style="{ height: '0px' }" 
                      header-cell-class-name="table_header" 
                      :cell-style="{ padding: '6px', 'text-align': 'center' }"
                      style="width: 100%; margin: 20px 0" 
                      height="100%" 
                      :default-sort="{ prop: 'date', order: 'descending' }" 
                      :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }">
                      <el-table-column prop="" label="井号" width="150"/>
                      <el-table-column label="2022-05-31">
                        <el-table-column prop="name" :label="`日产液\n(m³/d)`" width="110" />
                        <el-table-column prop="province" :label="`日产油\n(m³/d)`" width="110" />
                        <el-table-column prop="city" :label="`含水\n(%)`" width="110" />
                        <el-table-column prop="address" :label="`井底流压\n(Mpa)`" width="120" />
                        <el-table-column prop="zip" :label="`泵频率\n(Hz)`" width="110" />
                      </el-table-column>
                      <el-table-column label="2022-08-31">
                        <el-table-column prop="name" :label="`日产液\n(m³/d)`" width="110" />
                        <el-table-column prop="province" :label="`日产油\n(m³/d)`" width="110" />
                        <el-table-column prop="city" :label="`含水\n(%)`" width="110" />
                        <el-table-column prop="address" :label="`井底流压\n(Mpa)`" width="120" />
                        <el-table-column prop="zip" :label="`泵频率\n(Hz)`" width="110" />
                      </el-table-column>
                      <el-table-column label="变化量">
                        <el-table-column prop="name" :label="`产液对比\n(m³/d)`" width="160" />
                        <el-table-column prop="province" :label="`产油对比\n(m³/d)`" width="160" />
                        <el-table-column prop="city" :label="`含水对比\n(%)`" width="160" />
                        <el-table-column prop="address" :label="`井底流压对比\n(Mpa)`" width="170" />
                        <el-table-column prop="zip" :label="`泵频率对比\n(Hz)`" width="160" />
                      </el-table-column>
                      <el-table-column prop="remark" label="备注" width="250"/>
                    </el-table>
                </div>
            </pagePanelNew>
        </div>
    </div>
</template>

<script>
    import { fetchOilFields, fetchPlatforms,fetchInjectionWells, fetchInjectionWellsByPlatform,fetchProductionWells, fetchProductionWellsByPlatform} from '@/api/oilDeposit/rem-02/primaryinfo.js';
    import { fetchMeasureInfos,nameAndCode} from '@/api/oilDeposit/rem-03/oilfieldmanageplan.js';
    import { exportExcel } from '@/lib/exportExcel.js';
    export default {
        name: 'statisticalTableProduction',
        data() {
            return {
                //油田下拉框
                oilFields: [],
                selectOilField: '',
                //平台下拉框
                platforms: [],
                selectPlatform: '',
                //井号下拉框
                wells: [],
                wellId: '',
                //对比基准
                dateTime: new Date().format('yyyy-MM-dd'),
                //对比日期
                dateTime2:new Date().format('yyyy-MM-dd'),
                //影响因素
                measureId:'全部',
                //表格数据
                tableData: [
                  {
                    date: "2016-05-03",
                    name: "王小虎",
                    province: "上海",
                    city: "普陀区",
                    address: "上海市普陀区金沙江路 1518 弄",
                    remark: '啊实打实大苏打倒萨大啊啊啊啊啊啊啊啊啊'
                  },
                ],
                pageTotal: 0,
                queryParams: {
                    page: 1,
                    pageSize: 15,
                },
            };
        },
        mounted() {
            console.log('this.dateTime2',this.dateTime2)
            this.initData();
        },
        methods: {
            //页面初始化信息
            async initData() {
                //油田
                await fetchOilFields().then((res) => {
                    if (res.data.code == 200) {
                        this.oilFields = res.data.data.oilFields;
                        this.selectOilField = '3FC9A818F5BC43B88270DB80BBB3018F';
                    }
                });
                //平台
                await fetchPlatforms({
                    oilFieldId: this.selectOilField
                }).then((res) => {
                    if (res.data.code == 200) {
                        this.platforms = res.data.data.platform;
                        this.selectPlatform = this.selectOilField;
                    }
                });
                //井号
                await fetchProductionWells({
                    oilFieldId: this.selectOilField
                }).then((res) => {
                    if (res.data.code == 200) {
                        const wellData = res.data.data.productionWells;
                        const wellList = wellData.filter(el => el.wellName);
                        this.wells = [...wellList];
                    }
                });
                // this.getFetchMeasureInfos();
            },
            //油田下拉-change
            onFieldChange(val) {
                this.getFetchPlatforms(val);
                this.getMeasureNameAndCode();
            },
            //通过油田查询平台
            getFetchPlatforms(oilFieldId) {
                const request = {
                    oilFieldId,
                };
                fetchPlatforms(request).then((res) => {
                    if (res.data.code == 200) {
                        this.platforms = res.data.data.platform;
                        this.selectPlatform = request.oilFieldId;
                    }
                });
            },
            //平台下拉-change
            onPlatfromChange(val) {
                this.getFetchWells(this.selectOilField, val);
                this.getMeasureNameAndCode();
            },
            //通过油田 或 平台 获得井
            getFetchWells(oilFieldId, platformId) {
                this.wells = [];
                if (oilFieldId == platformId) {
                    const request = {
                        oilFieldId
                    };
                    fetchProductionWells(request).then((res) => {
                        if (res.data.code == 200) {
                            let wellData = res.data.data.productionWells || [];
                            if (wellData.length) {
                                const wellList = wellData.filter(el => el.wellName);
                                this.wells = this.wells.concat(wellList);
                            }
                        }
                    });
                    fetchInjectionWells(request).then((res) => {
                        if (res.data.code == 200) {
                            const waterWellList = res.data.data.injectionWell || [];
                            this.wells = this.wells.concat(waterWellList);
                        }
                    });
                } else {
                    const request = {
                        platformId
                    };
                    fetchProductionWellsByPlatform(request).then((res) => {
                        if (res.data.code == 200) {
                            let wellData = res.data.data.productionWells || [];
                            if (wellData.length) {
                                const wellList = wellData.filter(el => el.wellName);
                                this.wells = this.wells.concat(wellList);
                            }
                        }
                    });
                    fetchInjectionWellsByPlatform(request).then((res) => {
                        if (res.data.code == 200) {
                            const waterWellList = res.data.data.injectionWell || [];
                            this.wells = this.wells.concat(waterWellList);
                        }
                    });
                }
                this.wells.unshift({
                    wellId: '',
                    wellName: '全部'
                });
                this.wellId = '';
            },
            //措施事件下拉框数据源
            getMeasureNameAndCode() {
                let params = {
                    oilFieldId: this.selectOilField, //油田id
                    platformId: this.selectPlatform, //平台id
                    wellId: [this.wellId], //井号id
                    measureId: this.measuresType, //措施事件
                    year: this.dateTime, //时间-年
                    page: 1,
                    pageSize: 1000,
                }
                nameAndCode(params).then((res) => {
                    if (res.data.code == 200) {
                        this.measuresTypes = res.data.data.namesAndCodes;
                        this.measuresTypes.unshift({
                            code: '',
                            name: '全部'
                        });
                        this.measureId = '';
                    }
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .app-container {
        height: 100%;
        display: flex;
        flex-direction: column;

        .z-container {
            flex: 1;
            height: 0;
        }
        
        
        #tableData{
            ::v-deep .el-table__header-wrapper{
                .el-table__header{
                    thead {
                        tr:last-child{
                            .cell{
                                height: auto;
                                line-height: 18px;
                                white-space: pre;
                            } 
                        }
                    } 
                }
            } 
            ::v-deep .cell:empty{
                &::before {
                    content: '-';
                } 
            }
        } 
    }
</style>
