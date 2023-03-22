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
                <div class="fl mg">
                    <span>平台：</span>
                    <el-select v-model="selectPlatform" class="f2" style="width: 220px;" @change="onPlatfromChange">
                        <el-option v-for="(item, index) in platforms" :key="index" :label="item.platName"
                            :value="item.platFormId">
                        </el-option>
                    </el-select>
                </div>
                <div class="fl mg">
                    <span>井号：</span>
                    <el-select v-model="wellId" class="f2">
                        <el-option v-for="(item, index) in wells" :key="index" :label="item.wellName"
                            :value="item.wellId">
                        </el-option>
                    </el-select>
                </div>
                <div class="fl mg">
                    <span>措施事件：</span>
                    <el-select class="f2" filterable>
                        <el-option v-for="(item, index) in []" :key="index" :label="item.name" :value="item.code">
                        </el-option>
                    </el-select>
                </div>
                <div class="fl mg">
                    <span>措施类型：</span>
                    <el-select v-model="measuresType" class="f2" filterable>
                        <el-option v-for="(item, index) in measuresTypes" :key="index" :label="item.name"
                            :value="item.code">
                        </el-option>
                    </el-select>
                </div>
                <div class="fl mg">
                    <span>措施版本：</span>
                    <el-select class="f2" filterable>
                        <el-option v-for="(item, index) in []" :key="index" :label="item.name" :value="item.code">
                        </el-option>
                    </el-select>
                </div>
                <div class="fl mg">
                    <span>时间:</span>
                    <el-date-picker class="f3" v-model="dateTime" style="margin-left:10px" type="year"
                        placeholder="选择日期" value-format="yyyy"></el-date-picker>
                </div>
                <div class="fr mg">
                    <el-button type="primary" icon="el-icon-search" size="mini" @click="doSearch">搜索</el-button>
                    <el-button style="width:70px" @click="doExportFile" v-show="canDownload">下载</el-button>
                </div>
            </div>
        </headerSearch>
        <pagePanelNew headerTitle="措施管理" style="height: calc(100% - 100px)">
            <div class="pageHeader"
                style="width:100%;display: flex;align-items: center;justify-content: space-between;margin-bottom:10px;">
                秦皇岛32-6油田作业计划跟踪
                <el-button type="primary" icon="el-icon-download" style="height:30px;">下载</el-button>
            </div>
            <div class="tableBox">
                <el-table id="csgl"
                    :data="tableData1.slice((queryParams.page - 1) * queryParams.pageSize, queryParams.page * queryParams.pageSize)"
                    height="calc(100% - 114px)" :row-style="{ height: '0px' }"
                    :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
                    header-cell-class-name="table_header" :cell-style="{ padding: '2px', 'text-align': 'center' }"
                    style="width: 100%; height: 100%;">
                    <el-table-column prop="measureName1" label="井号" width="130"></el-table-column>
                    <el-table-column prop="measureName2" label="作业类型" width="80"></el-table-column>
                    <el-table-column prop="measureName3" label="措施作业天数(计划/实际)" width="110">
                        <template slot-scope="scope">
                            <span v-if="scope.row.measureName3_1||scope.row.measureName3_2">
                               {{scope.row.measureName3_1}}/{{scope.row.measureName3_2}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="measureName4" label="措施是否达标" width="80"></el-table-column>
                    <el-table-column prop="measureName5" label="类别" width="100"></el-table-column>
                    <el-table-column prop="measureName6">
                        <template slot="header" slot-scope="scope">
                            <div class="header-titlts">
                                <div class="icon0">
                                    <b class="b0"></b>
                                    <span>实际</span>
                                </div>
                                <div class="icon0">
                                    <b class="b1"></b>
                                    <span>计划/滚动预测</span>
                                </div>
                                <div class="icon0">
                                    <b class="b2"></b>
                                    <span>未开始计划</span>
                                </div>
                                <div class="icon1">
                                    <img src="@/assets/rem/plan/i0.png" alt="">
                                    <span>增产性措施</span>
                                </div>
                                <div class="icon1">
                                    <img src="@/assets/rem/plan/i1.png" alt="">
                                    <span>增注性措施</span>
                                </div>
                                <div class="icon1 mg0">
                                    <img src="@/assets/rem/plan/i2.png" alt="">
                                    <span>维护性措施</span>
                                </div>
                            </div>
                        </template>
                        <template slot-scope="scope">
                            <div class="vv" v-if="scope.row.type!='date'" :style="{marginLeft:scope.row.mgleftwidth}">
                                <div class="vv-left">
                                    <img src="@/assets/rem/plan/i0.png" alt="">
                                    <!-- <img src="@/assets/rem/plan/i1.png" alt=""> -->
                                    <!-- <img src="@/assets/rem/plan/i2.png" alt=""> -->
                                </div>
                                <div class="vv-right">
                                    <div class="vv-line">
                                        <div class="line" :style="{width:scope.row.sjwidth}">
                                            <el-progress class="progress1" type="line" :percentage="100" :show-text="false"></el-progress>
                                        </div>
                                        <div class="day">{{scope.row.measureName3_1}}天</div>
                                    </div>
                                    <div class="vv-line">
                                        <div class="line" :style="{width:scope.row.jhwidth}">
                                            <el-progress class="progress2" type="line" :percentage="100" :show-text="false"></el-progress>
                                        </div>
                                        <div class="day">{{scope.row.measureName3_2}}天</div>
                                    </div>
                                </div>
                            </div>
                            <div class="z-date" v-if="scope.row.type=='date'">
                                <div class="day" v-for="(item,index) in days" :key="index">{{item}}</div>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="mcBox" :style="{height:(tableData1.length-1)?((tableData1.length-1)*40) +'px':'40px',width:mcWidth}" v-if="true"></div>
            </div>
            <pagination v-show="pageTotal > 0" :pageSizes="[15, 20, 40, 100]" :total="pageTotal" :page.sync="queryParams.page" :limit.sync="queryParams.pageSize" @pagination="pagination" />
        </pagePanelNew>
        <!-- 现场作业进度表-弹框 -->
        <fieldOperations :dialogVisible="fieldOperationsShow" @close="fieldOperationsShow=false;"></fieldOperations>>
    </div>
</template>

<script>
    import fieldOperations from './components/components-fieldOperations.vue';
    import moment from "dayjs";
    import {
        fetchOilFields,
        fetchPlatforms,
        fetchInjectionWells,
        fetchInjectionWellsByPlatform,
        fetchProductionWells,
        fetchProductionWellsByPlatform,
    } from '@/api/oilDeposit/rem-02/primaryinfo.js';
    import {fetchMeasureInfos,nameAndCode} from '@/api/oilDeposit/rem-03/oilfieldmanageplan.js';
    // import {exportExcel} from '@/utils/oilDeposit/exportExcel.js';
    export default {
        name: 'planIndex',
        components: {
            fieldOperations
        },
        data() {
            return {
                mcWidth: '',
                days: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01', '2022-06-01', '2022-07-01',
                    '2022-08-01', '2022-09-01', '2022-10-01', '2022-11-01', '2022-12-01',
                ],
                dateTime: new Date().format('yyyy'),
                queryParams: {
                    page: 1,
                    pageSize: 15,

                },
                pageTotal: 0,
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
                tableData1: [
                    {
                        measureName1: 'QHD32-6-C03',
                        measureName2: '上返补孔',
                        measureName3_1: 40,
                        measureName3_2: 38,
                        measureName4: '达标',
                        measureName5: '计划实际',
                        sj_stardata: '2022-05-03',
                        sj_enddata: '2022-06-12',
                        jh_stardata: '2022-05-03',
                        jh_enddata: '2022-06-10',
                        sjwidth: 0, //实际宽度
                        jhwidth: 0, //计划宽度
                        mgleftwidth: 0, //距离左边
                    },
                    {
                        measureName1: 'QHD32-6-C03',
                        measureName2: '上返补孔',
                        measureName3_1: 92,
                        measureName3_2: 30,
                        measureName4: '达标',
                        measureName5: '计划实际',
                        sj_stardata: '2022-06-01',
                        sj_enddata: '2022-08-31',
                        jh_stardata: '2022-06-01',
                        jh_enddata: '2022-06-30',
                        sjwidth: 0, //实际宽度
                        jhwidth: 0, //计划宽度
                        mgleftwidth: 0, //距离左边
                    }
                ],
                fieldOperationsShow: true,
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
        mounted() {
            // this.initData();
            this.initData2();
            this.mcMarginLeft();
        },
        methods: {
            //如果是今年数据，根据当前日期显示出蒙层
            mcMarginLeft() {
                let newDate = moment().format('YYYY-MM-DD');
                let diffObject = this.leftDiff(newDate);
                let marginLeft = (diffObject.month * 78) + (diffObject.month * 20) + (78 / 30 * diffObject.day) - 4 +'px';
                this.mcWidth = `calc(100% - 550px - ${marginLeft} )`;
                console.log(this.mcWidth, 88);
            },
            initData2() {
                if (this.tableData1.length) {
                    this.tableData1.forEach((el, i) => {
                        if (el.type != 'date') {
                            let day = this.dateDiff('2022-01-01', el.sj_stardata);
                            let diffObject = this.leftDiff(el.sj_stardata);
                            this.tableData1[i].mgleftwidth = (diffObject.month * 78) + (diffObject
                                    .month * 20) +
                                (78 / 30 * diffObject.day) - 4 + 'px';

                            let sjwidth = (78 / 30 * el.measureName3_1) + (this.diffMonth(el
                                .sj_stardata, el
                                .sj_enddata) * 17.5);
                            let jhwidth = (78 / 30 * el.measureName3_2) + (this.diffMonth(el
                                .jh_stardata, el
                                .jh_enddata) * 17.5);
                            this.tableData1[i].sjwidth = Math.floor(sjwidth) + 'px';
                            this.tableData1[i].jhwidth = Math.floor(jhwidth) + 'px';

                            console.log(this.tableData1[i]);
                        }
                    })
                }

            },
            //获取两个时间相隔天数
            dateDiff(sDate1, sDate2) {
                //sDate1和sDate2是2006-12-18格式
                let aDate1, aDate2, oDate1, oDate2, iDays;
                aDate1 = sDate1.split("-");
                oDate1 = new Date(aDate1[1] + '/' + aDate1[2] + '/' + aDate1[0]);
                aDate2 = sDate2.split("-");
                oDate2 = new Date(aDate2[1] + '/' + aDate2[2] + '/' + aDate2[0]);
                iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);
                return iDays
            },
            //计算当前时间已过去多少天
            leftDiff(sDate) {
                let date = sDate.split('-');
                let nowMonth = Number(date[1]);
                let month = nowMonth - 1; //距离今年一月相差多少月。
                let day = Number(date[2]); //当月已过去多少天
                return {
                    month,
                    day
                }
            },
            //计划两个日期相差月数
            diffMonth(sDate1, sDate2) {
                let starMonth = Number(sDate1.split('-')[1]);
                let endMonth = Number(sDate2.split('-')[1]);
                return endMonth - starMonth;
            },
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
                        const wellList = res.data.data.productionWells;
                        this.wells = [...wellList];
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
                this.getMeasureNameAndCode(this.selectOilField, this.selectPlatform, this.wellId, this
                    .measuresType,
                    this.dateTime, this.page, this.pageSize, 0);
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
            getFetchMeasureInfos(oilFieldId, platformId, wellId, measureId, year, page, pageSize,
                isStimTypeCodeOrNot) {
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
                    if (res.data.code == 200) {
                        const as = res.data.data.measureManagamentInfos;

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
            /**
             * 检索信息
             */
            doSearch() {
                const oilFieldId = this.selectOilField;
                const plarformId = this.selectPlatform;
                const {
                    wellId
                } = this;
                const measureId = this.measuresType;
                const year = this.dateTime;
                const {
                    page
                } = this;
                const {
                    pageSize
                } = this;
                this.getMeasureNameAndCode(oilFieldId, plarformId, wellId, measureId, year, page, pageSize, 0);
                this.getFetchMeasureInfos(oilFieldId, plarformId, wellId, measureId, year, page, pageSize, 0);
            },
            /**
             * hwh
             *  通过油田查询平台
             * @param oilFieldId 油田id
             */
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
            /**
             * hwh
             * 通过油田 或 平台 获得井
             * @param oilFieldId
             * @param platformId
             */
            getFetchWells(oilFieldId, platformId) {
                this.wells = [];
                if (oilFieldId == platformId) {
                    const request = {
                        oilFieldId,
                    };
                    fetchProductionWells(request).then((res) => {
                        if (res.data.code == 200) {
                            const oilWellList = res.data.data.productionWells || [];
                            this.wells = this.wells.concat(oilWellList);
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
                        platformId,
                    };
                    fetchProductionWellsByPlatform(request).then((res) => {
                        if (res.data.code == 200) {
                            const oilWellList = res.data.data.productionWells || [];
                            this.wells = this.wells.concat(oilWellList);
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
            getMeasureNameAndCode(oilFieldId, platformId, wellId, measureId, year, page, pageSize,
            isStimTypeCodeOrNot) {
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
            }
        },
    };
</script>

<style lang="scss" scoped>
    ::v-deep #csgl .has-gutter {
        height: 66px;

        tr th:nth-child(3) {
            .cell {
                line-height: 18px;
            }
        }

        tr th:nth-child(4) {
            .cell {
                line-height: 18px;
            }
        }
    }

    ::v-deep .el-table__body-wrapper {
        .el-table__body {
            tbody tr:last-child {
                td {
                    border: none;
                }
            }
        }
    }

    ::v-deep .el-table tbody tr:last-child:hover {
        background: transparent !important;

        td,
        .cell:hover {
            background: transparent !important;
        }
    }

    .app-container {
        height: 100%;

        .header-titlts {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .icon0 {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 60px;

                .b0 {
                    width: 18px;
                    height: 18px;
                    margin-right: 10px;
                    background-image: linear-gradient(135deg, #26BAFF 0%, #7EE1C0 55%, #C0FF91 100%);
                    box-shadow: 4px 0px 4px -8px rgba(0, 24, 148, 0.8);
                }

                .b1 {
                    width: 18px;
                    height: 18px;
                    margin-right: 10px;
                    background-image: linear-gradient(-45deg, #6ACBFF 0%, #4A91F4 45%, #2D5EEB 100%);
                    border-radius: 1px;
                }
            }

            .b2 {
                width: 18px;
                height: 18px;
                margin-right: 10px;
                background-image: linear-gradient(0deg, #13B1EB 0%, #37C9FF 100%);
                border-radius: 1px;
            }
        }

        span {
            font-size: 14px;
            font-weight: 500;
        }
    }

    .icon1 {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 34px;

        img {
            width: 40px;
            height: 40px;
        }
    }

    span {
        font-size: 14px;
        font-weight: 500;
    }

    .vv {
        width: 100%;
        display: flex;
        .vv-left {
            width: 40px;
            height: 40px;
            margin-right: 4px;

            img {
                width: 40px;
                height: 40px;
            }
        }
    }

    .vv-right {
        padding-top: 4px;

        .vv-line {
            height: 15px;
            line-height: 15px;
            display: flex;
            align-items: center;

            .line {
                width: 160px;
                margin-right: 6px;

                .progress1 {
                    ::v-deep .el-progress-bar__inner {
                        background-image: linear-gradient(135deg, #26BAFF 0%, #7EE1C0 55%, #C0FF91 100%);
                        box-shadow: 4px 0px 4px -8px rgba(0, 24, 148, 0.8);
                    }
                }

                .progress2 {
                    ::v-deep .el-progress-bar__inner {
                        background-image: linear-gradient(-45deg, #6ACBFF 0%, #4A91F4 45%, #2D5EEB 100%);
                        border-radius: 7px;
                    }
                }
            }

            .day {
                font-size: 12px;
                color: #2CBDFB;

            }
        }
        
    }

    .z-date {
        padding-left: 40px;
        display: flex;
        align-items: center;

        .day {
            width: 78px;
            margin-right: 20px;
        }

        .day:last-child {
            margin-right: 0;
        }
        
    }

    .f2 {
        width: 165px !important;

    }

    .f3 {
        width: 150px !important;
    }

    .mg {
        margin-left: 15px;
    }

    .mg0 {
        margin-right: 0;
    }

    .tableBox {
        position: relative;

        .mcBox {
            position: absolute;
            right: 0;
            top: 66px;
            width: calc(100% - 550px);
            background-image: linear-gradient(90deg, rgba(169, 217, 255, 0.26) 0%, rgba(49, 167, 255, 0.26) 100%);

            &::before {
                content: '';
                position: absolute;
                width: 0px;
                height: 100%;
                border-left: 4px dotted rgba(255, 156, 37, 1);

            }
        }
        
    }
</style>
