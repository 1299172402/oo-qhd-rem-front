<template>
    <div style="height: 100%;position: relative;">
        <div class="btns" style="position: absolute;right:0;top:0px;z-index: 99;">
            <el-button type="primary" style="margin-left:auto!important;" v-if="$route.query.page" @click="goBack">返回</el-button>
        </div>
        <el-tabs class="g-pageHeader" v-model="radioValue" @tab-click="qeruyAlLData">
            <el-tab-pane v-for="(item, index) in tabList1" :key="index" :label="item.name" :name="item.name" />
        </el-tabs>
        <vertical-switch-button :data-list="tabList2" buttonHeight="30px" btn-direction="row" @selectBtn="selectBtn" style="height: auto" />
        <el-main>
            <div v-if="radioValue == '油田指标预警' && switchNumber == '1'" style="height: 100%">
                <pagePanelNew style="margin-top: 0px; height: 100%" showBtn>
                    <div style="display: flex; justify-content: end">
                        <el-button
                            v-show="canDownload"
                            style="margin-bottom: 20px"
                            icon="el-icon-download"
                            type="primary"
                            @click="downloadFile1"
                        >
                            下载
                        </el-button>
                    </div>
                    <el-table ref="table1" :data="tableData" highlight :row-class-name="tableRowClassName" height="calc(100% - 130px)">
                        <el-table-column type="index" prop="index" label="序号" width="80" align="center"></el-table-column>
                        <el-table-column prop="theDate" :label="`预警时间\n(yyyy/mm/dd)`" align="center"></el-table-column>
                        <el-table-column prop="obj" label="预警对象" align="center"></el-table-column>
                        <el-table-column prop="warningType" label="预警模型类型" align="center"></el-table-column>
                        <el-table-column prop="warningDesc" label="预警描述" align="center"></el-table-column>
                        <!--<el-table-column label="阈值配置" align="center">
                              <template slot-scope="scope">
                                  <el-button v-if="scope.row.disposalStatus == '0' || scope.row.disposalStatus == '1'" type="text" size="small" @click="handleClick(scope.row)">
                                      <span style="color:#FFFFFF">配置</span>
                                  </el-button>
                                  <el-button type="text" size="small" @click="handleClick(scope.row)" >
                                      <span style="color:#FFFFFF">查看</span>
                                  </el-button>
                              </template>
                          </el-table-column>-->
                        <el-table-column label="预警分析" align="center">
                            <template slot-scope="scope">
                                <el-button v-if="scope.row.disposalStatus == '0' || scope.row.disposalStatus == '1'" type="text" size="small" @click="warningDispose(scope.row)">
                                    <span style="color: #ffffff">处理</span>
                                </el-button>
                                <el-button type="text" size="small" @click="warningDispose(scope.row)">
                                    <span style="color: #ffffff">查看</span>
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="处置状态" align="center">
                            <template slot-scope="scope">
                                {{ scope.row.status ? scope.row.status : "-" }}
                            </template>
                        </el-table-column>
                        <el-table-column v-if="false" prop="handler" label="处理人"></el-table-column>
                    </el-table>
                    <pagination :total="total" :page.sync="page" :limit.sync="pageSize" :page-sizes="[10, 20, 50, 100]" :pager-count="5" layout="prev, pager, next, sizes, total, jumper" @pagination="handleTableChange" />
                </pagePanelNew>
            </div>
            <div v-if="radioValue == '油田指标预警' && switchNumber == '2'" style="height: 100%">
                <pagePanelNew style="margin-top: 0px; height: 100%" showBtn>
                    <div style="display: flex; justify-content: end">
                        <el-button
                            v-show="canDownload"
                            style="margin-bottom: 20px"
                            icon="el-icon-download"
                            type="primary"
                            @click="downloadFile1"
                        >
                            下载
                        </el-button>
                    </div>
                    <el-table ref="table2" :data="tableData" highlight height="calc(100% - 130px)">
                        <el-table-column type="index" prop="index" label="序号" width="80" align="center"></el-table-column>
                        <el-table-column prop="theDate" :label="`预警时间\n(yyyy/mm/dd)`" align="center"></el-table-column>
                        <el-table-column prop="obj" label="预警对象" align="center"></el-table-column>
                        <el-table-column prop="warningType" label="预警模型类型" align="center"></el-table-column>
                        <el-table-column prop="warningDesc" label="预警描述" align="center"></el-table-column>
                        <el-table-column prop="observeDays" label="加入观察室天数" align="center">
                            <template slot-scope="scope">
                                {{ scope.row.observeDays != null ? scope.row.observeDays : "-" }}
                            </template>
                        </el-table-column>
                        <!--<el-table-column  label="阈值配置" align="center">
                              <template slot-scope="scope">
                                  <el-button v-if="scope.row.disposalStatus == '0' || scope.row.disposalStatus == '1'" type="text" size="small" @click="handleClick(scope.row)">
                                      <span style="color:#FFFFFF">配置</span>
                                  </el-button>
                                  <el-button type="text" size="small" @click="handleClick(scope.row)" >
                                      <span style="color:#FFFFFF">查看</span>
                                  </el-button>
                              </template>
                          </el-table-column>-->
                        <el-table-column label="预警分析" align="center">
                            <template slot-scope="scope">
                                <el-button v-if="scope.row.disposalStatus == '0' || scope.row.disposalStatus == '1'" type="text" size="small" @click="warningDispose(scope.row)">
                                    <span style="color: #ffffff">处理</span>
                                </el-button>
                                <el-button type="text" size="small" @click="warningDispose(scope.row)">
                                    <span style="color: #ffffff">查看</span>
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="处置状态" align="center">
                            <template slot-scope="scope">
                                {{ scope.row.status ? scope.row.status : "-" }}
                            </template>
                        </el-table-column>
                    </el-table>
                    <pagination :total="total" :page.sync="page" :limit.sync="pageSize" :page-sizes="[10, 20, 50, 100]" :pager-count="5" layout="prev, pager, next, sizes, total, jumper" @pagination="handleTableChange" />
                </pagePanelNew>
            </div>
            <div v-if="radioValue == '油田指标预警' && switchNumber == '3'" style="height: 100%">
                <pagePanelNew style="margin-top: 0px; height: 100%" showBtn>
                    <div class="g-row-flex-V" style="justify-content: space-between; margin-bottom: 10px">
                        <div class="g-row-flex-V" style="flex-wrap: wrap">
                            <div style="margin: 10px 20px 10px 0px">
                                日期：
                                <el-date-picker v-model="historyDateTime" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
                            </div>
                            <div style="margin: 10px 20px 10px 0px">
                                预警：
                                <el-select v-model="warningTypeCode" class="f2" style="width: 180px">
                                    <el-option v-for="item in warnings" :key="item.value" :label="item.name" :value="item.value" :disabled="item.disabled"></el-option>
                                </el-select>
                            </div>
                            <div style="margin: 10px 20px 10px 0px">
                                <el-button icon="el-icon-search" type="primary" @click="switchParam('3')">搜索</el-button>
                                <el-button icon="el-icon-refresh" class="commonBtn" @click="resettingQuery">重置</el-button>
                            </div>
                        </div>
                        <div class="g-row-flex-V" style="flex-wrap: wrap;align-self: flex-end;">
                            <div style="margin: 10px 0px 10px 20px">
                                <el-button
                                    v-show="canDownload"
                                    icon="el-icon-download"
                                    type="primary"
                                    @click="downloadFile1"
                                >
                                    下载
                                </el-button>
                            </div>
                        </div>
                    </div>
                    <el-table ref="table3" :data="tableData" highlight height="calc(100% - 130px)">
                        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
                        <el-table-column prop="theDate" :label="`预警时间\n(yyyy/mm/dd)`" align="center"></el-table-column>
                        <el-table-column prop="obj" label="预警对象" align="center"></el-table-column>
                        <el-table-column prop="warningType" label="预警模型类型" align="center"></el-table-column>
                        <el-table-column prop="warningDesc" label="预警描述" align="center"></el-table-column>
                        <el-table-column prop="result" label="处置结果" align="center">
                            <template slot-scope="scope">
                                <div v-if="scope.row.result == null || scope.row.result == ''">
                                    <span class="hrefSpan" style="cursor: pointer" href="#" @click="warningDispose(scope.row)">关闭</span>
                                </div>
                                <span class="hrefSpan" style="cursor: pointer" href="#" @click="warningDispose(scope.row)">{{scope.row.result}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="handler" label="处理人" align="center">
                            <template slot-scope="scope">
                                {{ scope.row.handler ? scope.row.handler : "-" }}
                            </template>
                        </el-table-column>
                        <el-table-column v-if="false" prop="handler" label="处理人"></el-table-column>
                        <el-table-column v-if="false" prop="handler" label="处理人"></el-table-column>
                    </el-table>
                    <pagination :total="total" :page.sync="page" :limit.sync="pageSize" :page-sizes="[10, 20, 50, 100]" :pager-count="5" layout="prev, pager, next, sizes, total, jumper" @pagination="handleTableChange" />
                </pagePanelNew>
            </div>
            <div v-if="radioValue == '区块指标预警' && switchNumber == '1'" style="height: 100%">
                <pagePanelNew style="margin-top: 0px; height: 100%" showBtn>
                    <div style="display: flex; justify-content: end">
                        <el-button
                            v-show="canDownload"
                            style="margin-bottom: 20px"
                            icon="el-icon-download"
                            type="primary"
                            @click="downloadFile2"
                        >
                            下载
                        </el-button>
                    </div>
                    <el-table ref="table4" :data="tableData" highlight :row-class-name="tableRowClassName" height="calc(100% - 130px)">
                        <el-table-column type="index" prop="index" label="序号" width="80" align="center"></el-table-column>
                        <el-table-column prop="theDate" :label="`预警时间\n(yyyy/mm/dd)`" align="center"></el-table-column>
                        <el-table-column prop="obj" label="预警对象" align="center"></el-table-column>
                        <el-table-column prop="warningType" label="预警模型类型" align="center"></el-table-column>
                        <el-table-column prop="warningDesc" label="预警描述" align="center"></el-table-column>
                        <!--<el-table-column label="阈值配置" align="center">
                              <template slot-scope="scope">
                                  <el-button v-if="scope.row.disposalStatus == '0' || scope.row.disposalStatus == '1'" type="text" size="small" @click="handleClick(scope.row)">
                                      <span style="color:#FFFFFF">配置</span>
                                  </el-button>
                                  <el-button type="text" size="small" @click="handleClick(scope.row)" >
                                      <span style="color:#FFFFFF">查看</span>
                                  </el-button>
                              </template>
                          </el-table-column>-->
                        <el-table-column label="预警分析" align="center">
                            <template slot-scope="scope">
                                <el-button v-if="scope.row.disposalStatus == '0' || scope.row.disposalStatus == '1'" type="text" size="small" @click="warningDispose(scope.row)">
                                    <span style="color: #ffffff">处理</span>
                                </el-button>
                                <el-button type="text" size="small" @click="warningDispose(scope.row)">
                                    <span style="color: #ffffff">查看</span>
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="处置状态" align="center">
                            <template slot-scope="scope">
                                {{ scope.row.status ? scope.row.status : "-" }}
                            </template>
                        </el-table-column>
                        <el-table-column v-if="false" prop="handler" label="处理人"></el-table-column>
                    </el-table>
                    <pagination :total="total" :page.sync="page" :limit.sync="pageSize" :page-sizes="[10, 20, 50, 100]" :pager-count="5" layout="prev, pager, next, sizes, total, jumper" @pagination="handleTableChange" />
                </pagePanelNew>
            </div>
            <div v-if="radioValue == '区块指标预警' && switchNumber == '2'" style="height: 100%">
                <pagePanelNew style="margin-top: 0px; height: 100%" showBtn>
                    <div style="display: flex; justify-content: end">
                        <el-button
                            v-show="canDownload"
                            style="margin-bottom: 20px"
                            icon="el-icon-download"
                            type="primary"
                            @click="downloadFile2"
                        >
                            下载
                        </el-button>
                    </div>
                    <el-table ref="table5" :data="tableData" highlight height="calc(100% - 130px)">
                        <el-table-column type="index" prop="index" label="序号" width="80" align="center"></el-table-column>
                        <el-table-column prop="theDate" :label="`预警时间\n(yyyy/mm/dd)`" align="center"> </el-table-column>
                        <el-table-column prop="obj" label="预警对象" align="center"></el-table-column>
                        <el-table-column prop="warningType" label="预警模型类型" align="center"></el-table-column>
                        <el-table-column prop="warningDesc" label="预警描述" align="center"> </el-table-column>
                        <el-table-column prop="observeDays" label="加入观察室天数" align="center">
                            <template slot-scope="scope">
                                {{ scope.row.observeDays != null ? scope.row.observeDays : "-" }}
                            </template>
                        </el-table-column>
                        <!--<el-table-column  label="阈值配置" align="center">
                              <template slot-scope="scope">
                                  <el-button v-if="scope.row.disposalStatus == '0' || scope.row.disposalStatus == '1'" type="text" size="small" @click="handleClick(scope.row)">
                                      <span style="color:#FFFFFF">配置</span>
                                  </el-button>
                                  <el-button type="text" size="small" @click="handleClick(scope.row)" >
                                      <span style="color:#FFFFFF">查看</span>
                                  </el-button>
                              </template>
                          </el-table-column>-->
                        <el-table-column label="预警分析" align="center">
                            <template slot-scope="scope">
                                <el-button v-if="scope.row.disposalStatus == '0' || scope.row.disposalStatus == '1'" type="text" size="small" @click="warningDispose(scope.row)">
                                    <span style="color: #ffffff">处理</span>
                                </el-button>
                                <el-button type="text" size="small" @click="warningDispose(scope.row)">
                                    <span style="color: #ffffff">查看</span>
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="处置状态" align="center">
                            <template slot-scope="scope">
                                {{ scope.row.status ? scope.row.status : "-" }}
                            </template>
                        </el-table-column>
                    </el-table>
                    <pagination :total="total" :page.sync="page" :limit.sync="pageSize" :page-sizes="[10, 20, 50, 100]" :pager-count="5" layout="prev, pager, next, sizes, total, jumper" @pagination="handleTableChange" />
                </pagePanelNew>
            </div>
            <div v-if="radioValue == '区块指标预警' && switchNumber == '3'" style="height: 100%">
                <pagePanelNew style="margin-top: 0px; height: 100%" showBtn>
                    <div class="g-row-flex-V" style="justify-content: space-between; margin-bottom: 10px">
                        <div class="g-row-flex-V" style="flex-wrap: wrap">
                            <div style="margin: 10px 20px 10px 0px">
                                日期：
                                <el-date-picker v-model="historyDateTimeSec" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </div>
                            <div style="margin: 10px 20px 10px 0px">
                                预警：
                                <el-select v-model="warningTypeCode" class="f2" style="width: 180px">
                                    <el-option v-for="item in warnings" :key="item.value" :label="item.name" :value="item.value" :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </div>
                            <div style="margin: 10px 20px 10px 0px">
                                <el-button icon="el-icon-search" type="primary" @click="switchParam('3')">搜索</el-button>
                                <el-button icon="el-icon-refresh" class="commonBtn" @click="resettingQuery">重置</el-button>
                            </div>
                        </div>
                        <div class="g-row-flex-V" style="flex-wrap: wrap;align-self: flex-end;">
                            <div style="margin: 10px 0px 10px 20px">
                                <el-button
                                    v-show="canDownload"
                                    icon="el-icon-download"
                                    type="primary"
                                    @click="downloadFile2"
                                >
                                    下载
                                </el-button>
                            </div>
                        </div>
                    </div>
                    <el-table ref="table6" :data="tableData" highlight height="calc(100% - 130px)">
                        <el-table-column type="index" prop="index" label="序号" width="80" align="center"></el-table-column>
                        <el-table-column prop="theDate" :label="`预警时间\n(yyyy/mm/dd)`" align="center"></el-table-column>
                        <el-table-column prop="obj" label="预警对象" align="center"></el-table-column>
                        <el-table-column prop="warningType" label="预警模型类型" align="center"></el-table-column>
                        <el-table-column prop="warningDesc" label="预警描述" align="center"></el-table-column>
                        <el-table-column prop="result" label="处置结果" align="center">
                            <template slot-scope="scope">
                                <div v-if="scope.row.result == null || scope.row.result == ''">
                                    <span class="hrefSpan" style="cursor: pointer" href="#" @click="warningDispose(scope.row)">关闭</span>
                                </div>
                                <span class="hrefSpan" style="cursor: pointer" href="#" @click="warningDispose(scope.row)">{{scope.row.result}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="handler" label="处理人" align="center">
                            <template slot-scope="scope">
                                {{ scope.row.handler }}
                            </template>
                        </el-table-column>
                        <el-table-column v-if="false" prop="handler" label="处理人"></el-table-column>
                        <el-table-column v-if="false" prop="handler" label="处理人"></el-table-column>
                    </el-table>
                    <pagination :total="total" :page.sync="page" :limit.sync="pageSize" :page-sizes="[10, 20, 50, 100]" :pager-count="5" layout="prev, pager, next, sizes, total, jumper" @pagination="handleTableChange" />
                </pagePanelNew>
            </div>
        </el-main>
    </div>
</template>
<script>
    import {
        fetchOilFields,
        fetchFields
    } from "@/api/oilDeposit/rem-02/primaryinfo.js";
    import {
        oilFieldDevWarnings,
        fieldDevWarnings
    } from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
    import {
        getWidgetByAreaUser
    } from "@/api/oilDeposit/rmm-01/rmm01";
    import verticalSwitchButton from "@/components/intelligentOilfield/vertical-switch-button/index.vue";
    import {getWarningsDate} from '@/api/oilDeposit/rem-04/developStatus.js';
    import {exportExcelFromJson} from '@/lib/exportExcel.js';

    export default {
        name: "developmentWarningCapacity",
        components: {
            verticalSwitchButton,
        },
        data() {
            return {
                //hwh 修改
                oilFieldId: "3FC9A818F5BC43B88270DB80BBB3018F",
                //预警数量
                alertCount: 0,
                //分页参数总数
                total: 10,
                //当前页
                page: 1,
                //当前页条数
                pageSize: 10,
                //div切换变量
                radioValue: "",
                tabList1: [
                    {
                        name: "油田指标预警"
                    }, 
                    {
                        name: "区块指标预警"
                    },
                ],
                //选择显示div
                switchNumber: "1",
                //预警
                warningTypeCode: "",
                //搜索输入框
                input: "",
                //日期
                dateTime: "",
                //历史日期
                historyDateTime:[],
                //历史日期
                historyDateTimeSec: "",
                //缓存数据
                tempRadio: "",
                //切换div值缓存
                tempSwitchNumber: "",
                //查询参数
                queryParams: {
                    warningCode: "WARNING",
                },
                //预警类型
                warningType: "全部",
                warningTypes: [
                    {
                        name: "全部",
                        value: "0",
                    },
                    {
                        name: "预测预警",
                        value: "1",
                    },
                    {
                        name: "对比预警",
                        value: "2",
                    },
                ],
                //表格数据
                tableData: [],
                //预警信息
                warnings: [
                    {
                        name: "全部",
                        value: "",
                    },
                    {
                        name: "产液量预警",
                        value: "7",
                    },
                    {
                        name: "产油量预警",
                        value: "6",
                    },
                    {
                        name: "注水量预警",
                        value: "9",
                    },
                    {
                        name: "含水率预警",
                        value: "8",
                    },
                    {
                        name: "注采比",
                        value: "11",
                    },
                    {
                        name: "递减率预警",
                        value: "12",
                    },
                ],
                // TODO lv 页面没有使用，代码检查错误先注释
                // pickerOptions: {
                //     disabledDate(time) {
                //         let curDate = new Date().toString(); // 当前时间戳转为字符串
                //         let curDateYear = new Date().getFullYear(); // 当前时间的年份
                //         let oneYearAgoDate = curDate.replace(curDateYear, curDateYear - 1); // 字符串年份替换为一年前
                //         let oneYear = new Date(oneYearAgoDate).getTime(); //一年前字符串转为时间戳
                //         return time.getTime() > Date.now() || time.getTime() < oneYear;
                //     },
                // },
                //表单数据
                increaseAndDecrease: [{
                        label: "增加",
                        value: "增加",
                    },
                    {
                        label: "减少",
                        value: "减少",
                    },
                ],
                //缓存权限数据
                myWidget: [],
                userInfo: {},
                //按钮权限组
                //添加记录
                canAddInfo: false,
                //修改数据
                canUpdateInfo: false,
                //发布数据
                canSendInfo: false,
                //删除数据
                canDeleteInfo: false,
                //下载数据
                canDownload: true,
                //上传数据
                canUpload: false,
                //特殊管理权限
                ycglKfyj: false,
            };
        },
        computed: {
            tabList2() {
                return [{
                        name: `新预警(${this.alertCount || 0})`,
                        key: "1",
                        isChecked: this.switchNumber == "1"
                    },
                    {
                        name: "观察",
                        key: "2",
                        isChecked: this.switchNumber == "2"
                    },
                    {
                        name: "历史预警",
                        key: "3",
                        isChecked: this.switchNumber == "3"
                    },
                ];
            },
        },
        created() {
            this.dateTime = [new Date().addDays(-30).format("yyyy-MM-dd"), new Date().format("yyyy-MM-dd")];
            let year = new Date().getFullYear();
            let startDate = year + "-01-01";
            this.historyDateTimeSec = [new Date(startDate).format("yyyy-MM-dd"), new Date().format("yyyy-MM-dd")];
        },
        async mounted() {
            await this.getWarningsDateApi();
            this.selectOilfieldData(this.dateTime[0], this.dateTime[1], this.oilFieldId, "WARNING");
            if (this.$route.query == undefined) {
                this.radioValue = "油田指标预警";
                //二级选择重置
                this.switchNumber = "1";
            } else {
                this.radioValue = this.$route.query.radioValue == undefined ? "油田指标预警" : this.$route.query.radioValue;
                this.switchNumber = this.$route.query.switchNumber == undefined ? "1" : this.$route.query.switchNumber;
            }
            this.qeruyAlLData();
        },
        methods: {
            //获取历史预警-搜索日期
            async getWarningsDateApi() {
                await getWarningsDate({ogfId:'3FC9A818F5BC43B88270DB80BBB3018F'}).then(res => {
                    if(res.data.code==200){
                        this.historyDateTime.push(res.data.data.beginTime);
                        this.historyDateTime.push(res.data.data.endTime);
                    }
                    console.log('this.historyDateTime',this.historyDateTime)
                })
            },
            //获取油田信息
            getOilFields() {
                let _this = this;
                fetchOilFields().then((res) => {
                    //获得详细信息
                    let data = res.data.data;
                    //获取油田信息
                    _this.oilField = data.oilFields;
                    //选择油田默认选中第一个
                    _this.selectOilField = _this.oilField[0].oilFieldId;
                });
            },
            //获得区块信息
            getFieldsData(oilFieldId) {
                let request = {
                    oilFieldId: oilFieldId
                };
                let _this = this;
                fetchFields(request).then((res) => {
                    // 获得数据
                    let data = res.data.data.fields;
                    //获得区块信息
                    _this.block = data;
                    //默认选中第一个区块信息
                    _this.selectBlock = _this.block[0].fieldId;
                });
            },
            // 重置搜索条件
            resettingQuery() {
                this.page = 1;
                this.pageSize = 10;
                this.dateTime = [new Date().addDays(-30).format("yyyy-MM-dd"), new Date().format("yyyy-MM-dd")];
                let year = new Date().getFullYear();
                let startDate = year + "-01-01";
                this.historyDateTime = [new Date(startDate).format("yyyy-MM-dd"), new Date().format("yyyy-MM-dd")];
                this.historyDateTimeSec = [new Date(startDate).format("yyyy-MM-dd"), new Date().format("yyyy-MM-dd")];
                this.warningTypeCode = "";
                this.tempRadio = this.radioValue;
                this.tempSwitchNumber = this.switchNumber;
                var OilfieldId = this.oilFieldId;
                if (this.radioValue == "油田指标预警" && this.switchNumber == "1") {
                    this.selectOilfieldData(this.dateTime[0], this.dateTime[1], OilfieldId, "WARNING");
                } else if (this.radioValue == "油田指标预警" && this.switchNumber == "2") {
                    this.selectOilfieldData(this.dateTime[0], this.dateTime[1], OilfieldId, "OBSERVE");
                } else if (this.radioValue == "油田指标预警" && this.switchNumber == "3") {
                    this.selectOilfieldData(this.historyDateTime[0], this.historyDateTime[1], OilfieldId, "HIS");
                } else if (this.radioValue == "区块指标预警" && this.switchNumber == "1") {
                    this.selectFieldData(this.dateTime[0], this.dateTime[1], OilfieldId, "WARNING");
                } else if (this.radioValue == "区块指标预警" && this.switchNumber == "2") {
                    this.selectFieldData(this.dateTime[0], this.dateTime[1], OilfieldId, "OBSERVE");
                } else if (this.radioValue == "区块指标预警" && this.switchNumber == "3") {
                    this.selectFieldData(this.historyDateTimeSec[0], this.historyDateTimeSec[1], OilfieldId, "HIS");
                } else {
                    this.tableData = [];
                    this.total = 0;
                }
            },
            switchParam(row) {
                /*console.log(row);*/
                this.tempRadio = this.radioValue;
                this.tempSwitchNumber = this.switchNumber;
                //1级选择重置
                this.switchNumber = row;
                var OilfieldId = this.oilFieldId;
                if (this.radioValue == "油田指标预警" && row == "1") {
                    this.selectOilfieldData(this.dateTime[0], this.dateTime[1], OilfieldId, "WARNING");
                } else if (this.radioValue == "油田指标预警" && row == "2") {
                    this.selectOilfieldData(this.dateTime[0], this.dateTime[1], OilfieldId, "OBSERVE");
                } else if (this.radioValue == "油田指标预警" && row == "3") {
                    this.selectOilfieldData(this.historyDateTime[0], this.historyDateTime[1], OilfieldId, "HIS");
                } else if (this.radioValue == "区块指标预警" && row == "1") {
                    this.selectFieldData(this.dateTime[0], this.dateTime[1], OilfieldId, "WARNING");
                } else if (this.radioValue == "区块指标预警" && row == "2") {
                    this.selectFieldData(this.dateTime[0], this.dateTime[1], OilfieldId, "OBSERVE");
                } else if (this.radioValue == "区块指标预警" && row == "3") {
                    this.selectFieldData(this.historyDateTimeSec[0], this.historyDateTimeSec[1], OilfieldId, "HIS");
                } else {
                    this.tableData = [];
                    this.total = 0;
                }
            },
            //div切换方法
            closeDiv() {
                this.radioValue = this.tempRadio;
                this.switchNumber = this.tempSwitchNumber;
            },
            //数据查询方法
            qeruyAlLData() {
                if (this.radioValue == "油田指标预警" && this.switchNumber == "1") {
                    this.selectOilfieldData(this.dateTime[0], this.dateTime[1], this.oilFieldId, "WARNING");
                } else if (this.radioValue == "油田指标预警" && this.switchNumber == "2") {
                    this.selectOilfieldData(this.dateTime[0], this.dateTime[1], this.oilFieldId, "OBSERVE");
                } else if (this.radioValue == "油田指标预警" && this.switchNumber == "3") {
                    this.selectOilfieldData(this.historyDateTime[0], this.historyDateTime[1], this.oilFieldId, "HIS");
                } else if (this.radioValue == "区块指标预警" && this.switchNumber == "1") {
                    this.selectFieldData(this.dateTime[0], this.dateTime[1], this.oilFieldId, "WARNING");
                } else if (this.radioValue == "区块指标预警" && this.switchNumber == "2") {
                    this.selectFieldData(this.dateTime[0], this.dateTime[1], this.oilFieldId, "OBSERVE");
                } else if (this.radioValue == "区块指标预警" && this.switchNumber == "3") {
                    this.selectFieldData(this.historyDateTimeSec[0], this.historyDateTimeSec[1], this.oilFieldId, "HIS");
                } else {
                    this.tableData = [];
                    this.total = 0;
                }
            },
            selectBtn(item) {
                console.log(item);
                this.switchNumber = item.key;
                this.switchParam(this.switchNumber);
            },
            /**
             * hwh
             * 查询历史记录信息
             */
            queryHistoryData() {
                if (this.radioValue == "油田指标预警") {
                    this.selectOilfieldData(this.historyDateTime[0], this.historyDateTime[1], this.oilFieldId, "WARNING");
                } else if (this.radioValue == "区块指标预警") {
                    this.selectFieldData(this.historyDateTimeSec[0], this.historyDateTimeSec[1], this.oilFieldId, "WARNING");
                } else {
                    this.tableData = [];
                    this.total = 0;
                }
            },
            //查询油田数据统一接口
            selectOilfieldData(beginDate, endDate, fieldId, warningCode) {
                /* beginDate='2020-09-01'
                    endDate='2021-03-01'*/
                let queryParams = {
                    beginDate: beginDate,
                    endDate: endDate,
                    fieldId: fieldId,
                    page: this.page,
                    pageSize: this.pageSize,
                    warningCode: warningCode,
                    warningTypeCode: this.warningTypeCode,
                };
                oilFieldDevWarnings(queryParams).then((data) => {
                    console.log(data?.data?.data);

                    this.tableData = data?.data?.data?.indicatorWarnings || {};
                    this.total = data?.data?.data?.total || 0;
                    if (warningCode == "WARNING") {
                        this.alertCount = data?.data?.data?.total || 0;
                    }
                });
            },
            //查询区块数据统一接口
            selectFieldData(beginDate, endDate, fieldId, warningCode) {
                /*beginDate='2020-09-01'
                    endDate='2021-03-01'*/
                let queryParams = {
                    beginDate: beginDate,
                    endDate: endDate,
                    fieldId: fieldId,
                    page: this.page,
                    pageSize: this.pageSize,
                    warningCode: warningCode,
                    warningTypeCode: this.warningTypeCode,
                };
                fieldDevWarnings(queryParams).then((data) => {
                    console.log(data?.data?.data);
                    this.tableData = data?.data?.data?.indicatorWarnings || [];
                    this.total = data?.data?.data?.total || 0;
                    if (warningCode == "WARNING") {
                        this.alertCount = data?.data?.data?.total || 0;
                    }
                });
            },
            //处置结果
            warningDispose(row) {
                //6、7、8代表以油井为中心、、、9代表以水井为中心、、、11代表以油水井为中心
                if (row.warningCode == "6" || row.warningCode == "7" || row.warningCode == "8") {
                    //oil
                    this.$router.push({
                        name: "WarningDisposeOil",
                        query: {
                            warningType: row.warningType,
                            theDate: row.theDate,
                            handler: row.handler,
                            id: row.id,
                            warningCode: row.warningCode,
                            oilfieldId: this.oilFieldId,
                            ycglKfyj: this.ycglKfyj,
                        },
                    });
                } else if (row.warningCode == "9") {
                    //water
                    this.$router.push({
                        name: "WarningDisposeWater",
                        query: {
                            warningType: row.warningType,
                            theDate: row.theDate,
                            handler: row.handler,
                            id: row.id,
                            warningCode: row.warningCode,
                            oilfieldId: this.oilFieldId,
                            ycglKfyj: this.ycglKfyj,
                        },
                    });
                } else if (row.warningCode == "11") {
                    //oil+water
                    this.$router.push({
                        name: "warningDispose",
                        query: {
                            warningType: row.warningType,
                            theDate: row.theDate,
                            handler: row.handler,
                            id: row.id,
                            warningCode: row.warningCode,
                            oilfieldId: this.oilFieldId,
                            ycglKfyj: this.ycglKfyj,
                        },
                    });
                } else {
                    this.$router.push({
                        name: "warningDispose",
                        query: {
                            warningType: row.warningType,
                            theDate: row.theDate,
                            handler: row.handler,
                            id: row.id,
                            warningCode: row.warningCode,
                            oilfieldId: this.oilFieldId,
                            ycglKfyj: this.ycglKfyj,
                        },
                    });
                }
                // this.$router.push({ name:'warningDispose',query:{warningType:row.warningType,theDate:row.theDate,handler:row.handler,id:row.id,warningCode:row.warningCode,opinion:row.result}})
            },
            /**
             *  监听表格分页变化
             * @param pagination 分页数据对象
             */
            handleTableChange(pagination) {
                this.page = pagination.page;
                this.pageSize = pagination.limit;
                if (this.radioValue == "油田指标预警" && this.switchNumber == "1") {
                    this.selectOilfieldData(this.dateTime[0], this.dateTime[1], this.oilFieldId, "WARNING");
                } else if (this.radioValue == "油田指标预警" && this.switchNumber == "2") {
                    this.selectOilfieldData(this.dateTime[0], this.dateTime[1], this.oilFieldId, "OBSERVE");
                } else if (this.radioValue == "油田指标预警" && this.switchNumber == "3") {
                    this.selectOilfieldData(this.historyDateTime[0], this.historyDateTime[1], this.oilFieldId, "HIS");
                } else if (this.radioValue == "区块指标预警" && this.switchNumber == "1") {
                    this.selectFieldData(this.dateTime[0], this.dateTime[1], this.oilFieldId, "WARNING");
                } else if (this.radioValue == "区块指标预警" && this.switchNumber == "2") {
                    this.selectFieldData(this.dateTime[0], this.dateTime[1], this.oilFieldId, "OBSERVE");
                } else if (this.radioValue == "区块指标预警" && this.switchNumber == "3") {
                    this.selectFieldData(this.historyDateTimeSec[0], this.historyDateTimeSec[1], this.oilFieldId, "HIS");
                } else {
                    this.tableData = [];
                    this.total = 0;
                }
            },
            //行间样式
            tableRowClassName({row,rowIndex}) {
                if (!row.status) {
                    return "warning-row";
                }
                return "";
            },
            //返回
            goBack(){
                this.$router.push({
                    path:'/'+this.$route.query.page
                })
            },
            /**
             * hwh
             * 下载表格信息
             */
            downloadFile1() {
                let queryParams = {
                    beginDate: '',
                    endDate: '',
                    fieldId: this.oilFieldId,
                    page: 1,
                    pageSize: 99999,
                    warningCode: '',
                    warningTypeCode: this.warningTypeCode,
                };
                if (this.radioValue == "油田指标预警" && this.switchNumber == "1") {
                    this.queryParams.beginDate = this.dateTime[0];
                    this.queryParams.endDate =  this.dateTime[1];
                    this.queryParams.warningCode = "WARNING";
                } else if (this.radioValue == "油田指标预警" && this.switchNumber == "2") {
                    this.queryParams.beginDate = this.dateTime[0];
                    this.queryParams.endDate =  this.dateTime[1];
                    this.queryParams.warningCode = "OBSERVE";
                } else if (this.radioValue == "油田指标预警" && this.switchNumber == "3") {
                    this.queryParams.beginDate = this.historyDateTime[0];
                    this.queryParams.endDate =  this.historyDateTime[1];
                    this.queryParams.warningCode = "HIS";
                }
                oilFieldDevWarnings(queryParams).then((data) => {
                    let code = data.data.code;
                    if (code == 200) {
                        let list =  [];
                        let headTitle = null;
                        let fileName = "";
                        if (this.radioValue == "油田指标预警" && this.switchNumber == "1") {
                            headTitle = this.$refs.table1.$children.length ? this.$refs.table1.$children : null;
                            fileName = "油田指标预警-新预警";
                        } else if (this.radioValue == "油田指标预警" && this.switchNumber == "2") {
                            headTitle = this.$refs.table2.$children.length ? this.$refs.table2.$children : null;
                            fileName = "油田指标预警-观察";
                        } else if (this.radioValue == "油田指标预警" && this.switchNumber == "3") {
                            headTitle = this.$refs.table3.$children.length ? this.$refs.table3.$children : null;
                            fileName = "油田指标预警-历史预警";
                        } 
                        exportExcelFromJson(headTitle, list, fileName);
                    }
                });
            },
            downloadFile2() {
                let queryParams = {
                    beginDate: '',
                    endDate: '',
                    fieldId: this.oilFieldId,
                    page: 1,
                    pageSize: 99999,
                    warningCode: '',
                    warningTypeCode: this.warningTypeCode,
                };
                if (this.radioValue == "区块指标预警" && this.switchNumber == "1") {
                    this.queryParams.beginDate = this.dateTime[0];
                    this.queryParams.endDate =  this.dateTime[1];
                    this.queryParams.warningCode = "WARNING";
                } else if (this.radioValue == "区块指标预警" && this.switchNumber == "2") {
                    this.queryParams.beginDate = this.dateTime[0];
                    this.queryParams.endDate =  this.dateTime[1];
                    this.queryParams.warningCode = "OBSERVE";
                } else if (this.radioValue == "区块指标预警" && this.switchNumber == "3") {
                    this.queryParams.beginDate = this.historyDateTimeSec[0];
                    this.queryParams.endDate =  this.historyDateTimeSec[1];
                    this.queryParams.warningCode = "HIS";
                }
                fieldDevWarnings(queryParams).then((data) => {
                    let code = data.data.code;
                    if (code == 200) {
                        let list =  [];
                        let headTitle = null;
                        let fileName = "";
                        if (this.radioValue == "区块指标预警" && this.switchNumber == "1") {
                            headTitle = this.$refs.table4.$children.length ? this.$refs.table4.$children : null;
                            fileName = "区块指标预警-新预警";
                        } else if (this.radioValue == "区块指标预警" && this.switchNumber == "2") {
                            headTitle = this.$refs.table5.$children.length ? this.$refs.table5.$children : null;
                            fileName = "区块指标预警-观察";
                        } else if (this.radioValue == "区块指标预警" && this.switchNumber == "3") {
                            headTitle = this.$refs.table6.$children.length ? this.$refs.table6.$children : null;
                            fileName = "区块指标预警-历史预警";
                        } 
                        exportExcelFromJson(headTitle, list, fileName);
                    }
                });
            },
        },
    };
</script>

<style scoped>
    ::v-deep .el-main {
        padding: 0px;
        overflow-y: scroll;
        overflow-x: hidden;
        margin-top: 0px;
        height: calc(100% - 98px);
    }

    .hrefSpan {
        color: #24deff;
    }
    ::v-deep .el-table__header-wrapper .cell {
        height: auto !important;
        line-height: 18px !important;
        white-space: pre;
    }
    ::v-deep .el-table .cell:empty::before {
        content: "-";
    }
</style>
