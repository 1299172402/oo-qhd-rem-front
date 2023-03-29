<!-- 规范计划管理-措施管理界面 -->
<template>
    <div class="app-container">
        <headerSearch class="g-w100 g-h100">
            <div style="padding-top:12px;display: flex;align-items: center;">
                <div class="fl">
                    <span>油田：</span>
                    <el-select v-model="selectOilField" class="f2" disabled @change="onFieldChange">
                        <el-option v-for="(item, index) in oilFields" :key="index" :label="item.name"
                            :value="item.oilFieldId">
                        </el-option>
                    </el-select>
                </div>
                <div class="fl" style="margin-left:20px">
                    <span>平台：</span>
                    <el-select v-model="selectPlatform" class="f2" style="width: 220px;" @change="onPlatfromChange">
                        <el-option v-for="(item, index) in platforms" :key="index" :label="item.platName"
                            :value="item.platFormId">
                        </el-option>
                    </el-select>
                </div>
                <div class="fl" style="margin-left:20px">
                    <span>井号：</span>
                    <el-select v-model="wellId" class="f2">
                        <el-option v-for="(item, index) in wells" :key="index" :label="item.wellName"
                            :value="item.wellId">
                        </el-option>
                    </el-select>
                </div>
                <div class="fl" style="margin-left:20px">
                    <span>措施事件：</span>
                    <el-select v-model="measuresType" class="f2" filterable>
                        <el-option v-for="(item, index) in measuresTypes" :key="index" :label="item.name"
                            :value="item.code">
                        </el-option>
                    </el-select>
                </div>
                <div class="fl" style="margin-left:20px">
                    <span>时间:</span>
                    <el-date-picker v-model="dateTime" style="margin-left:10px" type="year" placeholder="选择日期"
                        value-format="yyyy"></el-date-picker>
                </div>
                <div class="fr" style="margin-left:20px">
                    <el-button type="primary" icon="el-icon-search" size="mini" @click="doSearch">搜索</el-button>
                    <el-button style="width:70px" @click="doExportFile" v-show="canDownload">下载</el-button>
                </div>
            </div>
        </headerSearch>
        <pagePanelNew headerTitle="措施管理" style="height: calc(100% - 100px)">
            <el-table id="csgl"
                :data="tableData.slice((queryParams.page - 1) * queryParams.pageSize, queryParams.page * queryParams.pageSize)"
                height="calc(100% - 114px)" :row-style="{ height: '0px' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }" header-cell-class-name="table_header"
                :cell-style="{ padding: '2px', 'text-align': 'center' }" style="width: 100%; height: 100%;">
                <el-table-column prop="wellName" label="井号" min-width="200">
                </el-table-column>
                <el-table-column prop="measureName" label="措施事件" min-width="150">
                </el-table-column>
                <el-table-column prop="m1" label="1月" min-width="100">
                    <template slot-scope="scope">
                        <span :class="['legend', scope.row.m1 == '已完成' ? 'bg-green' : scope.row.m1 == '进行中' ? 'bg-yellow' : scope.row.m1 == '待完成' ? 'bg-orange' : '']" @click="switchToMeasures(scope.row.ogfId, scope.row.prodPlatformId, scope.row.wellId, scope.row.measureCode, scope.row.yearMonthDay, scope.row.m1, scope.row.wellType, scope.row.wellNameNano, scope.row.wellBoreName)">{{scope.row.m1}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="m2" label="2月" min-width="100">
                    <template slot-scope="scope">
                        <span :class="['legend', scope.row.m2 == '已完成' ? 'bg-green' : scope.row.m2 == '进行中' ? 'bg-yellow' : scope.row.m2 == '待完成' ? 'bg-orange' : '']" @click="switchToMeasures(scope.row.ogfId, scope.row.prodPlatformId, scope.row.wellId, scope.row.measureCode, scope.row.yearMonthDay, scope.row.m2, scope.row.wellType, scope.row.wellNameNano, scope.row.wellBoreName)">{{scope.row.m2}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="m3" label="3月" min-width="100">
                    <template slot-scope="scope">
                        <span :class="['legend', scope.row.m3 == '已完成' ? 'bg-green' : scope.row.m3 == '进行中' ? 'bg-yellow' : scope.row.m3 == '待完成' ? 'bg-orange' : '']"  @click="switchToMeasures(scope.row.ogfId, scope.row.prodPlatformId, scope.row.wellId, scope.row.measureCode, scope.row.yearMonthDay, scope.row.m3, scope.row.wellType, scope.row.wellNameNano, scope.row.wellBoreName)">{{ scope.row.m3 }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="m4" label="4月" min-width="100">
                    <template slot-scope="scope">
                        <span :class="['legend', scope.row.m4 == '已完成' ? 'bg-green' : scope.row.m4 == '进行中' ? 'bg-yellow' : scope.row.m4 == '待完成' ? 'bg-orange' : '']" @click="switchToMeasures(scope.row.ogfId, scope.row.prodPlatformId, scope.row.wellId, scope.row.measureCode, scope.row.yearMonthDay, scope.row.m4, scope.row.wellType, scope.row.wellNameNano, scope.row.wellBoreName)">{{scope.row.m4}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="m5" label="5月" min-width="100">
                    <template slot-scope="scope">
                        <span :class="['legend', scope.row.m5 == '已完成' ? 'bg-green' : scope.row.m5 == '进行中' ? 'bg-yellow' : scope.row.m5 == '待完成' ? 'bg-orange' : '']" @click="switchToMeasures(scope.row.ogfId, scope.row.prodPlatformId, scope.row.wellId, scope.row.measureCode, scope.row.yearMonthDay, scope.row.m5, scope.row.wellType, scope.row.wellNameNano, scope.row.wellBoreName)">{{scope.row.m5}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="m6" label="6月" min-width="100">
                    <template slot-scope="scope">
                        <span :class="['legend', scope.row.m6 == '已完成' ? 'bg-green' : scope.row.m6 == '进行中' ? 'bg-yellow' : scope.row.m6 == '待完成' ? 'bg-orange' : '']" @click="switchToMeasures(scope.row.ogfId, scope.row.prodPlatformId, scope.row.wellId, scope.row.measureCode, scope.row.yearMonthDay, scope.row.m6, scope.row.wellType, scope.row.wellNameNano, scope.row.wellBoreName)">{{scope.row.m6}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="m7" label="7月" min-width="100">
                    <template slot-scope="scope">
                        <span :class="['legend', scope.row.m7 == '已完成' ? 'bg-green' : scope.row.m7 == '进行中' ? 'bg-yellow' : scope.row.m7 == '待完成' ? 'bg-orange' : '']"  @click="switchToMeasures(scope.row.ogfId, scope.row.prodPlatformId, scope.row.wellId, scope.row.measureCode, scope.row.yearMonthDay, scope.row.m7, scope.row.wellType, scope.row.wellNameNano, scope.row.wellBoreName)">{{scope.row.m7}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="m8" label="8月" min-width="100">
                    <template slot-scope="scope">
                        <span :class="['legend', scope.row.m8 == '已完成' ? 'bg-green' : scope.row.m8 == '进行中' ? 'bg-yellow' : scope.row.m8 == '待完成' ? 'bg-orange' : '']" @click="switchToMeasures(scope.row.ogfId, scope.row.prodPlatformId, scope.row.wellId, scope.row.measureCode, scope.row.yearMonthDay, scope.row.m8, scope.row.wellType, scope.row.wellNameNano, scope.row.wellBoreName)">{{scope.row.m8}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="m9" label="9月" min-width="100">
                    <template slot-scope="scope">
                        <span :class="['legend', scope.row.m9 == '已完成' ? 'bg-green' : scope.row.m9 == '进行中' ? 'bg-yellow' : scope.row.m9 == '待完成' ? 'bg-orange' : '']" @click="switchToMeasures(scope.row.ogfId, scope.row.prodPlatformId, scope.row.wellId, scope.row.measureCode, scope.row.yearMonthDay, scope.row.m9, scope.row.wellType, scope.row.wellNameNano, scope.row.wellBoreName)">{{scope.row.m9}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="m10" label="10月" min-width="100">
                    <template slot-scope="scope">
                        <span :class="['legend', scope.row.m10 == '已完成' ? 'bg-green' : scope.row.m10 == '进行中' ? 'bg-yellow' : scope.row.m10 == '待完成' ? 'bg-orange' : '']" @click="switchToMeasures(scope.row.ogfId, scope.row.prodPlatformId, scope.row.wellId, scope.row.measureCode, scope.row.yearMonthDay, scope.row.m10, scope.row.wellType, scope.row.wellNameNano, scope.row.wellBoreName)">{{scope.row.m10}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="m11" label="11月" min-width="100">
                    <template slot-scope="scope">
                        <span :class="['legend', scope.row.m11 == '已完成' ? 'bg-green' : scope.row.m11 == '进行中' ? 'bg-yellow' : scope.row.m11 == '待完成' ? 'bg-orange' : '']" @click="switchToMeasures(scope.row.ogfId, scope.row.prodPlatformId, scope.row.wellId, scope.row.measureCode, scope.row.yearMonthDay, scope.row.m11, scope.row.wellType, scope.row.wellNameNano, scope.row.wellBoreName)">{{scope.row.m11}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="m12" label="12月" min-width="100">
                    <template slot-scope="scope">
                        <span :class="['legend', scope.row.m12 == '已完成' ? 'bg-green' : scope.row.m12 == '进行中' ? 'bg-yellow' : scope.row.m12 == '待完成' ? 'bg-orange' : '']" @click="switchToMeasures(scope.row.ogfId, scope.row.prodPlatformId, scope.row.wellId, scope.row.measureCode, scope.row.yearMonthDay, scope.row.m12, scope.row.wellType, scope.row.wellNameNano, scope.row.wellBoreName)">{{scope.row.m12}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <pagination v-show="pageTotal > 0" :pageSizes="[15, 20, 40, 100]" :total="pageTotal" :page.sync="queryParams.page" :limit.sync="queryParams.pageSize" @pagination="pagination" />
        </pagePanelNew>
        <!-- <el-pagination style="margin-top:10px;float:right" :current-page="page" :page-size="pageSize"
        :page-sizes="[15, 20, 40, 100]" :pager-count="5" layout="prev, pager, next,sizes,slot, total"
        :total="pageTotal" @size-change="handleChangePageSize" @current-change="handleChangePage">
    </el-pagination> -->
    </div>
</template>

<script>
    import {
        fetchOilFields,
        fetchPlatforms,
        fetchInjectionWells,
        fetchInjectionWellsByPlatform,
        fetchProductionWells,
        fetchProductionWellsByPlatform,
    } from '@/api/oilDeposit/rem-02/primaryinfo.js';
    import {
        fetchMeasureInfos,
        nameAndCode,
    } from '@/api/oilDeposit/rem-03/oilfieldmanageplan.js';
    // import {exportExcel} from '@/utils/oilDeposit/exportExcel.js';
    export default {
        name: 'planIndex',
        data() {
            return {
                dateTime: "",
                queryParams: {
                    page: 1,
                    pageSize: 15,
                },
                pageTotal: 100,
                // 油田
                selectOilField: '',
                // 油田下拉框
                oilFields: [],
                // 平台
                selectPlatform: '',
                // 平台下拉
                platforms: [],
                // 井号
                wellId: '',
                // 井号下拉
                wells: [],
                // 措施
                measuresType: '',
                // 措施类型
                measuresTypes: [{
                        value: '全部',
                        label: '全部'
                    },
                    {
                        value: '酸化',
                        label: '酸化'
                    },
                    {
                        value: '压裂',
                        label: '压裂'
                    },
                ],
                // table表格数据
                tableData: [],
                // 已完成条数
                finishNum: 0,

                // 缓存权限数据
                myWidget: [],
                userInfo: {},
                // 按钮权限组
                // 添加记录
                canAddInfo: false,
                // 修改数据
                canUpdateInfo: false,
                // 发布数据
                canSendInfo: false,
                // 删除数据
                canDeleteInfo: false,
                // 下载数据
                canDownload: false,
                // 上传数据
                canUpload: false,
            };
        },
        created() {
            this.dateTime = new Date().format('yyyy');
        },
        mounted() {
            console.log(123)
            this.initData();
        },
        // 方法
        methods: {
            editData(row) {
                // 编辑页面跳转
                this.$router.push({
                    name: "wellMonitoring"
                })
            },
            /**
             * hwh
             * 页面初始化信息
             *
             */
            async initData() {
                console.log(111)
                await fetchOilFields().then((res) => {
                    if (res.data.code == 200) {
                        this.oilFields = res.data.data.oilFields;
                        if (this.oilFields.length == 0) {
                            this.selectOilField = "";
                        } else {
                            this.selectOilField = '3FC9A818F5BC43B88270DB80BBB3018F';
                        }
                    }
                });
                this.selectOilField = '3FC9A818F5BC43B88270DB80BBB3018F';
                const requestPlat = {
                    oilFieldId: this.selectOilField,
                };
                await fetchPlatforms(requestPlat).then((res) => {
                    if (res.data.code == 200) {
                        this.platforms = res.data.data.platform;
                        this.selectPlatform = requestPlat.oilFieldId;
                    }
                });
                // 初始化需要根据油田
                const requestWell = {
                    oilFieldId: this.selectOilField,
                };
                await fetchProductionWells(requestWell).then((res) => {
                    if (res.data.code == 200) {
                        let wellData=res.data.data.productionWells;
                        if(wellData.length){
                            const wellList = wellData.filter(el=>el.wellName);
                            this.wells = [...wellList];
                        }
                    }
                });
                await fetchInjectionWells(requestWell).then((res) => {
                    if (res.data.code == 200) {
                        const wellList = res.data.data.injectionWell;
                        this.wells = [...this.wells, ...wellList];
                    }
                });
                this.wells.unshift({
                    wellId: '',
                    wellName: '全部'
                });
                this.wellId = '';
                this.getMeasureNameAndCode(this.selectOilField, this.selectPlatform, this.wellId, this.measuresType, this.dateTime, this.page, this.pageSize, 0);
                this.getFetchMeasureInfos(this.selectOilField, this.selectPlatform, this.wellId, this.measuresType,this.dateTime, this.page, this.pageSize, 0);
            },
            /**
                *  hwh
                *  措施表信息
                * @param oilFieldId 油田id
                * @param platformId 平台id
                * @param wellId   井号id
                * @param measureId  措施id
                * @param year   年度
                * @param page   当前页面
                * @param pageSize 单页数量
                * @param isStimTypeCodeOrNot 是否是增产增注措施：0是，1不是
            */
            getFetchMeasureInfos(oilFieldId, platformId, wellId, measureId, year, page, pageSize, isStimTypeCodeOrNot) {
                const wellArray = [];
                wellArray.push(wellId);
                const request = {
                    oilFieldId,
                    platformId,
                    wellId: wellArray,
                    measureId,
                    year,
                    page,
                    pageSize,
                    isStimTypeCodeOrNot,
                };
                fetchMeasureInfos(request).then((res) => {
                    // eslint-disable-next-line eqeqeq
                    if (res.data.code == 200) {
                        /* this.tableData = res.data.data.measureManagamentInfos; */
                        // 临时

                        const as = res.data.data.measureManagamentInfos;
                        /*          let f1 = as.find((item)=>{
                        return item.wellName=='QHD32-6-B19'&&item.measureName=='换大泵'
                        });
                                  let f2 =as.find((item)=>{
                        return item.wellName=='QHD32-6-E23S1'&&item.measureName=='酸化增注'
                        });
                        
                        
                                  if(f2){
                                    as.splice(as.findIndex((item)=>{
                        return item.wellName=='QHD32-6-E23S1'&&item.measureName=='酸化增注'
                        }),1);
                                    as.unshift(f2);
                                  }
                                  if (f1){
                                    as.splice(as.findIndex((item)=>{
                        return item.wellName=='QHD32-6-B19'&&item.measureName=='换大泵'
                        }),1);
                                    as.unshift(f1);
                                  }
                        */


                        this.tableData = as;
                        this.finishNum = res.data.data.num;
                        this.pageTotal = res.data.data.measureManagamentInfos.length;
                    } else {
                        this.tableData = [];
                    }
                });
            },
            /**
             * zxb
             * 切换分页
             *
             */
            pagination(e) {
                this.page = e.page;
                this.pageSize = e.limit;
            },
            //
            /**
             * 检索信息
             */
            doSearch() {
                const oilFieldId = this.selectOilField;
                const plarformId = this.selectPlatform;
                const {wellId } = this;
                const measureId = this.measuresType;
                const year = this.dateTime;
                const {page} = this;
                const { pageSize} = this;
                this.getMeasureNameAndCode(oilFieldId, plarformId, wellId, measureId, year, page, pageSize, 0);
                this.getFetchMeasureInfos(oilFieldId, plarformId, wellId, measureId, year, page, pageSize, 0);
            },
            /**
             * hwh
             *  通过油田查询平台
             * @param oilFieldId 油田id
             */
            getFetchPlatforms(oilFieldId) {
                const request = {oilFieldId, };
                fetchPlatforms(request).then((res) => {
                    if (res.data.code == 200) {
                        this.platforms = res.data.data.platform;
                        this.selectPlatform = request.oilFieldId;
                    }
                });
            },
            /**
             * hwh
             * 通过油田 或 平台 获得井
             * @param oilFieldId
             * @param platformId
             */
            getFetchWells(oilFieldId, platformId) {
                this.wells = [];
                if (oilFieldId == platformId) {
                    const request = {oilFieldId};
                    fetchProductionWells(request).then((res) => {
                        if (res.data.code == 200) {
                            let wellData=res.data.data.productionWells||[];
                            if(wellData.length){
                                const wellList = wellData.filter(el=>el.wellName);
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
                    const request = {platformId};
                    fetchProductionWellsByPlatform(request).then((res) => {
                        if (res.data.code == 200) {
                            let wellData=res.data.data.productionWells||[];
                            if(wellData.length){
                                const wellList = wellData.filter(el=>el.wellName);
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
            /**
             * hwh
             * 表格穿透 穿透到重点项目
             * @param oilFieldId 油田id
             * @param platformId 平台id
             * @param selectWellId 选择井号
             * @param selectMeasuresId 措施事件id
             * @param yearMonthDay 时间
             * @param state 状态
             * @param wellType 井类型
             */
            switchToMeasures(oilFieldId, platformId, selectWellId, selectMeasuresId, yearMonthDay, state, wellType,
                wellNameNano, wellBoreName) {
                if (state != '已完成') {
                    return;
                }
                const dateDetail = yearMonthDay;
                // 跳转到重点项目页面  
                this.$router.push({
                    path: 'wellMonitoring',
                    query: {
                        oilFieldId,
                        platformId,
                        selectWellId,
                        selectMeasuresId,
                        measuresDate: dateDetail,
                        wellType,
                        wellNameNano,
                        wellBoreName,
                        canDownload: this.canDownload,
                    }
                });
            },
            /**
             * hwh
             * 措施事件
             */
            getMeasureNameAndCode(oilFieldId, platformId, wellId, measureId, year, page, pageSize,isStimTypeCodeOrNot) {
                const wellArray = [];
                wellArray.push(wellId);
                const request = {
                    oilFieldId,
                    platformId,
                    wellId: wellArray,
                    measureId,
                    year,
                    page,
                    pageSize,
                    isStimTypeCodeOrNot,
                }
                nameAndCode(request).then((res) => {
                    if (res.data.code == 200) {
                        this.measuresTypes = res.data.data.namesAndCodes;
                        this.measuresTypes.unshift({
                            code: '',
                            name: '全部'
                        });
                    }
                });
            },
            /**
             * hwh
             * 前端导出内容
             */
            doExportFile() {
                exportExcel('#csgl', '措施管理');
            },
            /**
             * hwh 油田改变内容
             * @param val
             */
            onFieldChange(val) {
                this.getFetchPlatforms(val);
            },
            /**
             * hwh
             * 平台改变内容
             * @param val
             */
            onPlatfromChange(val) {
                this.getFetchWells(this.selectOilField, val);
            },
            /**
             * hwh
             * 获取当前页面的权限内容，并处理其逻辑问题
             */
            getPageAuthMessage() {
                this.userInfo = VSAuth.getAuthInfo();
                const myPath = this.$route.path;
                // 该值可以为空
                const areaCode = "znytglxt";
                const loginName = this.userInfo.userName;
                getWidgetByAreaUser({
                    "areaCode": areaCode,
                    "loginName": loginName
                }).then(res => {
                    const myList = res.data.dataList;
                    if (myList) {
                        const pageMes = myList.find((item) => item.resPvalue == myPath);
                        if (pageMes) {
                            this.myWidget = pageMes.widgetList;
                        }
                        if (this.myWidget) {
                            for (const indexNum in this.myWidget) {
                                try {
                                    const myWidgetItem = this.myWidget[indexNum];
                                    switch (myWidgetItem.widgetCode) {
                                        case "addInfo":
                                            this.canAddInfo = true;
                                            break;
                                        case "updateInfo":
                                            this.canUpdateInfo = true;
                                            break;
                                        case "sendInfo":
                                            this.canSendInfo = true;
                                            break;
                                        case "deleteInfo":
                                            this.canDeleteInfo = true;
                                            break;
                                        case "download":
                                            this.canDownload = true;
                                            break;
                                        case "upload":
                                            this.canUpload = true;
                                            break;
                                        default:
                                    }
                                } catch (e) {
                                    continue;
                                }
                            }
                        }
                    }
                });
            },
        },
    };
</script>

<style lang="less" scoped>
    .app-container {
        height: 100%;

        .legend {
            padding: 5px 10px 5px 15px;
            position: relative;
            cursor: pointer;

            &::before {
                position: absolute;
                top: 40%;
                left: 0;
                content: '';
                display: block;
                margin-top: 0px;
                width: 8px;
                height: 8px;
                border-radius: 50%;
            }

            &.bg-green {
                &::before {
                  background: #00BC9C 100%;
                }
                text-decoration-line: underline;
            }

            &.bg-yellow {
                &::before {
                    background: #EDD722 100%;
                }
            }

            &.bg-orange {
                &::before {
                    background: #FF7135 100%;
                }
            }
        }
    }
</style>
