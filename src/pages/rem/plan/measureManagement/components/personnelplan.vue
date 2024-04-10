<template>
    <div style="height: calc(100vh - 160px)">
        <header-search>
            <el-form ref="ruleForm" inline style="margin-top: unset">
                <el-form-item label="油田：">
                    <el-select v-model="selectOilField" @change="changeyt">
                        <el-option
                            v-for="item in oilFields"
                            :key="item.ogfId"
                            :label="item.ogfName"
                            :value="item.ogfId"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="管理中心：">
                    <el-select v-model="selectglzxId" class="f2" @change="changeglzx">
                        <el-option
                            v-for="item in nplatforms"
                            :key="item.administrationCenterId"
                            :label="item.administrationCenterShortName"
                            :value="item.administrationCenterId"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="平台：">
                    <el-select v-model="selectPlatform">
                        <el-option
                            v-for="item in platforms"
                            :key="item.facilityId"
                            :label="item.facilityCode"
                            :value="item.facilityId"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="日期：">
                    <el-date-picker
                        v-model="endTime"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="年/月/日"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        icon="el-icon-search"
                        class="buttonActive_primary"
                        style="margin-left: 10px;"
                        @click="doSearch"
                    >
                        搜索
                    </el-button>
                    <el-button class="commonBtn" icon="el-icon-refresh" @click="resetForm('ruleForm')">
                        重置
                    </el-button>
                </el-form-item>
                <el-form-item style="float: right">
                    <el-button style="float: right" type="primary" @click="returnrouter">返回</el-button>
                </el-form-item>
            </el-form>
        </header-search>
        <page-panel-new
            :show-btn="true"
            style="height:calc(100% - 50px);min-height: 300px"
        >
            <el-row  style="height: 40%">
                <el-col :span="24">
                    <page-panel :show-btn="true" header-title="平台人数对比" style="margin-top: 0;">
                        <el-button type="primary" class="buttonActive_primary detailLinkBtn"   @click="downEcharts">下载</el-button>
                        <echart ref="echartChart" :chart-data="histogram" :height="chartHeight" />
                    </page-panel>
                </el-col>
                <!--        <el-col :span="12">-->
                <!--          <page-panel :show-btn="true" header-title="项目人数分布" style="margin-top: 0;">-->
                <!--            <echart :chart-data="histogram2" :height="chartHeight" />-->
                <!--          </page-panel>-->
                <!--        </el-col>-->
            </el-row>
            <!--      <el-row>-->
            <!--        <el-col :span="24">-->
            <!--          <page-panel :show-btn="true" header-title="当日施工概况">-->
            <!--            <el-table-->
            <!--              highlight-->
            <!--              :height="tableHeight"-->
            <!--              :data="tableData1"-->
            <!--              style="width: 100%"-->
            <!--              :border="false"-->
            <!--              :row-style="{ height: '0px' }"-->
            <!--              header-cell-class-name="table_header"-->
            <!--              :cell-style="{ padding: '6px', 'text-align': 'center' }"-->
            <!--              :default-sort="{ prop: 'date', order: 'descending' }"-->
            <!--              :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"-->
            <!--            >-->
            <!--              <el-table-column-->
            <!--                prop="prodPlatform"-->
            <!--                label="平台"-->
            <!--                min-width="200px"-->
            <!--                align="center"-->
            <!--              />-->
            <!--              <el-table-column-->
            <!--                prop="projectName"-->
            <!--                label="项目名称"-->
            <!--                min-width="180px"-->
            <!--                show-overflow-tooltip-->
            <!--                align="center"-->
            <!--              />-->
            <!--              <el-table-column-->
            <!--                prop="operatingBeginTime"-->
            <!--                min-width="180px"-->
            <!--                label="开工时间"-->
            <!--                align="center"-->
            <!--              />-->
            <!--              <el-table-column-->
            <!--                prop="planEndDate"-->
            <!--                min-width="180px"-->
            <!--                label="预计完工时间"-->
            <!--                align="center"-->
            <!--              />-->
            <!--              <el-table-column-->
            <!--                prop="projectUser"-->
            <!--                min-width="180px"-->
            <!--                label="当日施工人数"-->
            <!--                align="center"-->
            <!--              />-->
            <!--              <el-table-column-->
            <!--                prop="operatingContentToday"-->
            <!--                min-width="180px"-->
            <!--                label="当日工作内容"-->
            <!--                align="center"-->
            <!--              />-->
            <!--              <el-table-column-->
            <!--                prop="operatingContentToday"-->
            <!--                min-width="180px"-->
            <!--                label="明日工作计划"-->
            <!--                align="center"-->
            <!--              />-->
            <!--              <el-table-column-->
            <!--                prop="operatingContentToday"-->
            <!--                min-width="180px"-->
            <!--                label="时间进度"-->
            <!--                align="center"-->
            <!--              />-->
            <!--              <el-table-column-->
            <!--                prop="operatingContentToday"-->
            <!--                min-width="180px"-->
            <!--                label="实际进度"-->
            <!--                align="center"-->
            <!--              />-->
            <!--              <el-table-column-->
            <!--                prop="operatingContentToday"-->
            <!--                min-width="180px"-->
            <!--                label="工程领队"-->
            <!--                align="center"-->
            <!--              />-->
            <!--              <el-table-column-->
            <!--                prop="operatingContentToday"-->
            <!--                min-width="180px"-->
            <!--                label="现场负责人"-->
            <!--                align="center"-->
            <!--              />-->
            <!--              <el-table-column-->
            <!--                prop="operatingContentToday"-->
            <!--                min-width="180px"-->
            <!--                label="公司负责人"-->
            <!--                align="center"-->
            <!--              />-->
            <!--            </el-table>-->
            <!--          </page-panel>-->
            <!--        </el-col>-->
            <!--      </el-row>-->
            <el-row style="height:60% ">
                <el-col :span="24" style="height: 100%">
                    <page-panel :show-btn="true" header-title="人员类型概况" style="height: calc(100% - 20px)">
                        <el-form>
                            <el-form-item label="请选择：">
                                <el-date-picker
                                    v-model="currentTimeStart"
                                    style="width: 150px"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="请选择"
                                />
                                至
                                <el-date-picker
                                    v-model="currentTimeEnd"
                                    style="width: 150px"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="请选择"
                                />
                                <el-button
                                    icon="el-icon-search"
                                    style="margin-left: 10px"
                                    type="primary"
                                    @click="doSearch2"
                                >
                                    搜索
                                </el-button>
                                <el-button
                                    style="margin-left: 10px"
                                    type="primary"
                                    @click="downtable"
                                    icon="el-icon-download"
                                >
                                    下载
                                </el-button>
                            </el-form-item>
                        </el-form>
                        <el-table
                            ref="table"
                            highlight
                            height="calc(100% - 40px)"
                            :data="tableData2"
                            style="width: 100%"
                            :summary-method="getSummaries"
                            show-summary
                            id="rylxgk"
                            :border="false"
                            :row-style="{ height: '0px' }"
                            header-cell-class-name="table_header"
                            :cell-style="{ padding: '6px', 'text-align': 'center' }"
                            :default-sort="{ prop: 'date', order: 'descending' }"
                            :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
                        >
                            <el-table-column
                                label="序号"
                                type="index"
                                width="50"
                                align="center"
                            />
                            <el-table-column
                                prop="prodPlatFormName"
                                label="平台"
                                min-width="130px"
                                align="center"
                            />
                            <el-table-column
                                min-width="120px"
                                label="定员"
                                align="center"
                            >
                                <el-table-column
                                    prop="mineStaff"
                                    min-width="60px"
                                    label="人数"
                                    align="center"
                                />
                                <el-table-column
                                    prop="mineStaff"
                                    min-width="60px"
                                    label="工时"
                                    align="center"
                                    :formatter="getWorkTime"
                                />
                            </el-table-column>
                            <el-table-column
                                min-width="120px"
                                label="非定员"
                                align="center"
                            >
                                <el-table-column
                                    label="报务"
                                    min-width="80px"
                                    align="center"
                                >
                                    <el-table-column
                                        prop="newsPapering"
                                        min-width="60px"
                                        label="人数"
                                        align="center"
                                    />
                                    <el-table-column
                                        prop="newsPapering"
                                        min-width="60px"
                                        label="工时"
                                        align="center"
                                        :formatter="getWorkTime"
                                    />
                                </el-table-column>
                                <el-table-column
                                    min-width="180px"
                                    label="常规维修"
                                    align="center"
                                >
                                    <el-table-column
                                        prop="routineMaintenance"
                                        min-width="60px"
                                        label="人数"
                                        align="center"
                                    />
                                    <el-table-column
                                        prop="routineMaintenance"
                                        min-width="60px"
                                        label="工时"
                                        align="center"
                                        :formatter="getWorkTime"
                                    />
                                </el-table-column>
                                <el-table-column
                                    min-width="180px"
                                    label="常规油水井作业"
                                    align="center"
                                >
                                    <el-table-column
                                        prop="conventionalOilAndGasWellOperation"
                                        min-width="60px"
                                        label="人数"
                                        align="center"
                                    />
                                    <el-table-column
                                        prop="conventionalOilAndGasWellOperation"
                                        min-width="60px"
                                        label="工时"
                                        align="center"
                                        :formatter="getWorkTime"
                                    />
                                </el-table-column>
                                <el-table-column
                                    min-width="180px"
                                    label="大型工程及作业"
                                    align="center"
                                >
                                    <el-table-column
                                        prop="largeScaleEngineeringAndOperation"
                                        min-width="60px"
                                        label="人数"
                                        align="center"
                                    />
                                    <el-table-column
                                        prop="largeScaleEngineeringAndOperation"
                                        min-width="60px"
                                        label="工时"
                                        align="center"
                                        :formatter="getWorkTime"
                                    />
                                </el-table-column>
                                <el-table-column
                                    min-width="80px"
                                    label="后勤"
                                    align="center"
                                >
                                    <el-table-column
                                        prop="logistics"
                                        min-width="60px"
                                        label="人数"
                                        align="center"
                                    />
                                    <el-table-column
                                        prop="logistics"
                                        min-width="60px"
                                        label="工时"
                                        align="center"
                                        :formatter="getWorkTime"
                                    />
                                </el-table-column>
                                <el-table-column
                                    min-width="80px"
                                    label="其他"
                                    align="center"
                                >
                                    <el-table-column
                                        prop="others"
                                        min-width="60px"
                                        label="人数"
                                        align="center"
                                    />
                                    <el-table-column
                                        prop="others"
                                        min-width="60px"
                                        label="工时"
                                        align="center"
                                        :formatter="getWorkTime"
                                    />
                                </el-table-column>
                                <el-table-column
                                    min-width="180px"
                                    label="设施维修改造"
                                    align="center"
                                >
                                    <el-table-column
                                        prop="maintenanceAndRenovationOfFacilities"
                                        min-width="60px"
                                        label="人数"
                                        align="center"
                                    />
                                    <el-table-column
                                        prop="maintenanceAndRenovationOfFacilities"
                                        min-width="60px"
                                        label="工时"
                                        align="center"
                                        :formatter="getWorkTime"
                                    />
                                </el-table-column>
                                <el-table-column
                                    min-width="80px"
                                    label="医务"
                                    align="center"
                                >
                                    <el-table-column
                                        prop="medicalMatters"
                                        min-width="60px"
                                        label="人数"
                                        align="center"
                                    />
                                    <el-table-column
                                        prop="medicalMatters"
                                        min-width="60px"
                                        label="工时"
                                        align="center"
                                        :formatter="getWorkTime"
                                    />
                                </el-table-column>
                                <el-table-column
                                    label="增产措施作业"
                                    min-width="120px"
                                    align="center"
                                >
                                    <el-table-column
                                        prop="operationOfStimulationMeasures"
                                        min-width="60px"
                                        label="人数"
                                        align="center"
                                    />
                                    <el-table-column
                                        prop="operationOfStimulationMeasures"
                                        min-width="60px"
                                        label="工时"
                                        align="center"
                                        :formatter="getWorkTime"
                                    />
                                </el-table-column>
                                <el-table-column
                                    min-width="80px"
                                    label="小计"
                                    align="center"
                                >
                                    <el-table-column
                                        prop="sum"
                                        min-width="60px"
                                        label="人数"
                                        align="center"
                                    />
                                    <el-table-column
                                        prop="sum"
                                        min-width="60px"
                                        label="工时"
                                        align="center"
                                        :formatter="getWorkTime"
                                    />
                                </el-table-column>
                            </el-table-column>
                            <el-table-column
                                min-width="80px"
                                label="合计"
                                align="center"
                            >
                                <el-table-column
                                    prop="littleSum"
                                    min-width="60px"
                                    label="人数"
                                    align="center"
                                />
                                <el-table-column
                                    prop="littleSum"
                                    min-width="60px"
                                    label="工时"
                                    align="center"
                                    :formatter="getWorkTime"
                                />
                            </el-table-column>
                        </el-table>
                    </page-panel>
                </el-col>
            </el-row>
        </page-panel-new>
    </div>
</template>
<script>
import * as echarts from "echarts";
import Echart from "@/components/tools/Echarts/index.vue";
import {queryPlatformPob, queryPOBProjectPeople,QueryAdministrationCenter,getPlatform} from "@/api/prm/pobapi"
import {userListByUserNames,QueryOgfDetail,QueryPlatformDetail} from "@/api/basic/master"
import {exportExcel} from "@/lib/exportExcel";
export default {
    components: {
        Echart
    },
    data() {
        return {
            radio: "3",
            currentTimeStart: new Date().addDays(-7).format("yyyy-MM-dd"),
            currentTimeEnd: new Date().format("yyyy-MM-dd"),
            companyId: "",
            // 单选下拉框 油田
            oilFields: [],
            // 单选下拉框 平台
            platforms: [],
            // 初始化选择平台
            selectPlatform: "",
            // 初始化选择管理中心
            selectglzxId: "",
            nplatforms: [],
            // 初始化选择油田
            selectOilField: "",
            // 时间段选择
            currentTime: [new Date().addDays(-30).format("yyyy-MM-dd"), new Date().format("yyyy-MM-dd")],
            // 时间选择
            endTime: new Date().addDays(-1).format("yyyy-MM-dd"),
            // 分页
            page: 1,
            pageSize: 10,
            total: 0,
            // ecahrts 高度
            chartHeight: "200px",
            // table高度
            tableHeight: 280,
            // 柱状图1  平台人数对比
            histogram: {
                tooltip: {
                    show: true
                },
                legend: {
                    bottom: 10,
                    padding: [-10, 100],
                    icon: "rect",
                    itemWidth: 12,
                    itemHeight: 10,
                    itemGap: 40,
                    data: ["定员人数", "POB"],
                    textStyle: {
                        color: "rgb(131,142,150)",
                        fontSize: 14
                    }
                },
                grid: {
                    top: 30,
                    left: 40,
                    right: 10,
                    bottom: 40
                },
                xAxis: [
                    {
                        type: "category",
                        data: [],
                        axisLabel: {
                            interval: 0,
                            showMinLabel: true,
                            showMaxLabel: true,
                            color: "rgb(131,142,150)",
                            fontSize: 14
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                // color: '#979797'
                                color: "rgb(131,142,150)",
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        axisLabel: {
                            color: "rgb(131,142,150)",
                            fontSize: 14
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "rgb(131,142,150)",
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "rgb(131,142,150)",
                            }
                        }
                    }
                ],
                series: [{
                    name: "定员人数",
                    type: "bar",
                    barWidth: "12",
                    data: [],
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                            [{
                                offset: 0,
                                color: "#00D9EA"
                            }, {
                                offset: 1,
                                color: "#0F65EA"
                            }])
                    },
                    label: {
                        normal: {
                            show: true,
                            position: "top",
                            textStyle: {
                                fontSize: 14,
                                color: "rgb(131,142,150)",
                            }
                        }
                    }
                    /* showBackground: true,
                    backgroundStyle: {
                      color: 'rgba(143,164,204,0.2)',
                    }, */
                }, {
                    name: "POB",
                    type: "bar",
                    barWidth: "12",
                    data: [],
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                            [{
                                offset: 0,
                                color: "#F5BE43"
                            }, {
                                offset: 1,
                                color: "#FF7135"
                            }])
                    },
                    label: {
                        normal: {
                            show: true,
                            position: "top",
                            textStyle: {
                                fontSize: 14,
                                color: "rgb(131,142,150)",
                            }
                        }
                    }
                    /* showBackground: true,
                    backgroundStyle: {
                      color: 'rgba(143,164,204,0.2)',
                    }, */
                }
                ]
            },
            // 柱状图2  项目人数分布
            histogram2: {
                tooltip: {
                    show: true
                },
                grid: {
                    top: 30,
                    left: 40,
                    right: 10,
                    bottom: 30
                },
                xAxis: {
                    type: "category",
                    data: [],
                    axisLabel: {
                        color: "#8FA4CC",
                        fontSize: 14
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,.16)"
                        }
                    }
                },
                yAxis: {
                    type: "value",
                    axisLabel: {
                        color: "#8FA4CC",
                        fontSize: 14
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "rgba(151,151,151,.16)"
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(255,255,255,.16)"
                        }
                    }
                },
                series: [{
                    data: [],
                    type: "bar",
                    barWidth: "32",
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                            [{
                                offset: 0,
                                color: "#00D9EA"
                            }, {
                                offset: 1,
                                color: "#0F65EA"
                            }])
                    }
                    /* showBackground: true,
                    backgroundStyle: {
                      color: 'rgba(143,164,204,0.2)',
                    }, */
                }]
            },
            // 表格数据1  当日施工概况数据展示
            tableData1: [],
            tableData2: [],
         
        };
    },
    watch: {
        // selectOilField(val) {
        //   this.getFetchPlatforms(val);
        // }

        // selectPlatform(val) {
        //   this.getFetchWells(this.selectOilField, val);
        // }
    },
    updated() {
        this.$nextTick(() => {
            this.$refs.table.doLayout();
        });
    },
    mounted() {
        // 初始化下拉框数据
        this.initData();
    },
    methods: {
        getWorkTime(row, column) {
            return parseFloat(row[column.property]) * 12;
        },
        returnrouter(){
            this.$router.go(-1);
        },
        downEcharts(){
            this.$refs.echartChart.chartDownLoad( '平台人数对比');
        },
        downtable(){
            exportExcel("#rylxgk", "人员类型概况");
        },
        // 通过油田查询管理中心
        changeyt() {
            this.nplatforms = [];// 清空管理中心
            this.selectglzxId = "";
            const requestPlat = {
                ogfId: this.selectOilField
            };
            const paramsCenter = {
                administrationCenterId: "",
                administrationCenterShortName: "全部"
            };
            QueryAdministrationCenter(requestPlat).then(res => {
                if (res.meta.status === 200) {
                    this.nplatforms = res.data;
                    if (this.nplatforms.length !== 1) {
                        this.nplatforms.unshift(paramsCenter);
                    }
                    // this.nplatforms.unshift(paramsCenter);
                    this.selectglzxId = this.nplatforms[0].administrationCenterId;
                    this.changeglzx(this.selectglzxId);
                }
            });
        },
        // 通过管理中心查询平台
        changeglzx(val) {
            this.platforms = [];// 清空平台
            this.selectPlatform = "";
            let date = {};
            if (val === "") {
                date = {
                    ogfId: this.selectOilField,
                    administrationCenterId: ""
                };
            } else {
                date = {
                    ogfId: this.selectOilField,
                    administrationCenterId: val
                };
            }
            const params = {
                facilityId: "",
                facilityName: "全部",
                facilityCode: "全部"
            };
            getPlatform(date).then(res => {    // 根据管理中心查其下的平台
                const platforms = res.data.data;
                platforms.forEach(item => {
                    if (item.facilityCode === "HYSY109FPSO") {
                        item.facilityId = "14DD407DE9DA45CAA4EF58FD4AAD11B8";
                    }
                });
                this.platforms = platforms;
                if (val === "") { // 管理中心选全部
                    this.platforms.unshift(params);
                    this.selectPlatform = this.platforms[0].facilityId;
                } else {
                    this.selectPlatform = null;
                }
            });
        },
        glzxIdRel(val) {
            if (val === "8360BBA7B269083BC3C230C5DF854558") {
                val = "CEPI";
            } else if (val === "96DF270D217D14D6976AB05B6FEC7419") {
                val = "CEPJ";
            } else if (val === "C91967964843712A96F0356D59076951") {
                val = "FPSO";
            }
            return val;
        },

        resetForm(formName) {
            this.selectglzxId = "";
            this.$refs[formName].resetFields();
            this.endTime = new Date().addDays(-1).format("yyyy-MM-dd");
            this.selectOilField = "3FC9A818F5BC43B88270DB80BBB3018F";
            this.selectPlatform = this.platforms[0]?.platFormId;
            this.doSearch();
        },
        // 搜索数据
        doSearch() {
            const queryParams = {
                glzxId: this.selectglzxId,
                endTime: this.endTime,
                startTime: this.endTime,
                oilFieldId: this.selectOilField,
                platformId: this.selectPlatform,
                pageNum: this.page,
                pageSize: this.pageSize
            };
            this.selectPlatformPob(queryParams);
        },

        doSearch2() {
            const queryParams = {
                glzxId: this.selectglzxId,
                endTime: this.currentTimeEnd,
                startTime: this.currentTimeStart,
                oilFieldId: this.selectOilField,
                platformId: this.selectPlatform,
                pageNum: this.page,
                pageSize: this.pageSize
            };
            this.selectPlatformPob2(queryParams);
        },
        // 页面初始化信息
        async initData() {
            let searchKeys = {
                searchKeys: [this.$store.getters["user/userDetail"].user.userName],
            };
            await userListByUserNames(searchKeys).then((res) => {
                this.companyId = (res.data.data[0]?.currentTenantBindOrgId) ? res.data.data[0].currentTenantBindOrgId : undefined;
            })
            //获取油田信息
            await QueryOgfDetail({operationZoneId: this.companyId}).then((data) => {
                let code = data.data.code;
                if (code == 200) {
                    this.oilFields = data.data.data;
                    if (this.companyId === "715AD1CD60484BB59E737CD18A9DE44A") {
                        this.selectOilField = "3FC9A818F5BC43B88270DB80BBB3018F";
                    } else {
                        this.selectOilField = this.oilField[0].ogfId ? this.oilField[0].ogfId : undefined;
                    }
                }
            });

            /* const data = {};
            await fetchOilFields(data).then(res => {
              if (res.data.code === 200) {
                this.oilFields = res.data.data;
                if (this.oilFields.length === 0) {
                  this.selectOilField = "";
                } else {
                  this.selectOilField = "3FC9A818F5BC43B88270DB80BBB3018F"; // 32-6油田
                }
              }
            });
            this.selectOilField = "3FC9A818F5BC43B88270DB80BBB3018F"; // 32-6油田 */
            const requestPlat = {
                ogfId: this.selectOilField
            };
            const paramsCenter = {
                administrationCenterId: "",
                administrationCenterShortName: "全部"
            };
            await QueryAdministrationCenter(requestPlat).then(res => { // 管理中心
                if (res.meta.status === 200) {
                    this.nplatforms = res.data;
                    this.nplatforms.unshift(paramsCenter);
                    this.selectglzxId = this.nplatforms[0].administrationCenterId;
                }
            });
            const params = {
                facilityId: "",
                facilityName: "全部",
                facilityCode: "全部"
            };
            await getPlatform(requestPlat).then(res => {
                console.log(res);
                if (res.data.code === 200) {
                    const platforms = res.data.data;
                    platforms.forEach(item => {
                        if (item.facilityCode === "HYSY109FPSO") {
                            item.facilityId = "14DD407DE9DA45CAA4EF58FD4AAD11B8";
                        }
                    });
                    this.platforms = platforms;
                    this.platforms.unshift(params);
                    this.selectPlatform = this.platforms[0]?.facilityId;
                    console.log("======this.platforms==", this.platforms);
                }
            });
            const queryParams = {
                endTime: this.endTime,
                startTime: this.endTime,
                oilFieldId: this.selectOilField,
                platformId: this.selectPlatform,
                pageNum: this.page,
                pageSize: this.pageSize
            };
            const queryParams2 = {
                endTime: this.currentTimeEnd,
                startTime: this.currentTimeStart,
                oilFieldId: this.selectOilField,
                platformId: this.selectPlatform,
                pageNum: this.page,
                pageSize: this.pageSize
            };

            this.selectPlatformPob(queryParams);
            this.selectPlatformPob2(queryParams2);
            // this.selectPOBProjectPeopleOthers(queryParamsPOB); 废弃
            // this.doGetReloadOperating(this.selectPlatform, "", this.endTime);
        },

        /**
         *  通过油田查询平台
         * @param oilFieldId 油田id
         */
        getFetchPlatforms(oilFieldId) {
            const request = {
                ogfId: oilFieldId
            };
            getPlatform(request).then(res => {
                if (res.data.code === 200) {
                    const platforms = res.data.data;
                    // this.platforms = res.data.data;
                    platforms.forEach(item => {
                        if (item.facilityName === "海洋石油109(渤海世纪号)") {
                            item.facilityId = "14DD407DE9DA45CAA4EF58FD4AAD11B8";
                        }
                    });
                    this.platforms = platforms;
                    this.selectPlatform = this.platforms[0].facilityId;
                }
            });
        },
        /**
         *  改变当前页 跳转下一页
         * @param pageValue 当前页数
         */
        handleChangePage(pageValue) {
            this.page = pageValue;
            this.doSearch();
        },
        /**
         *  改变当前页大小
         * @param rowsValue 当前页大小
         */
        handleChangePageSize(rowsValue) {
            this.pageSize = rowsValue;
            this.doSearch();
        },
        // 查询POB人员情况
        selectPlatformPob(queryParams) {
            queryPlatformPob(queryParams).then(data => {
                data = data.data;
                if (data === null) {
                    return;
                }
                data.forEach(item => {
                    if (item.prodPlatFormName === "海洋石油109(渤海世纪)") {
                        item.prodPlatFormName = "HYSY109FPSO";
                    }
                });
                let list;
                // eslint-disable-next-line prefer-const
                list = data;
                const x = [];
                const y = [];
                const y1 = [];
                // eslint-disable-next-line no-restricted-syntax
                for (const i in list) {
                    if (list.hasOwnProperty(i)) {
                        if (list[i].prodPlatFormName === "海洋石油109(渤海世纪)") { // 14DD407DE9DA45CAA4EF58FD4AAD11B8
                            // 折线图
                            x.push("HYSY109FPSO");
                            y.push(list[i].mineStaff);// waterTimeRate
                            y1.push(list[i].littleSum);
                        } else {
                            // 折线图
                            // x.push(list[i].prodPlatFormName.substr(7, 4));
                            x.push(list[i].prodPlatFormName);
                            y.push(list[i].mineStaff);// waterTimeRate
                            y1.push(list[i].littleSum);
                        }
                    }
                }

                // 柱图
                this.histogram.series[0].data = y;
                this.histogram.series[1].data = y1;
                this.histogram.xAxis[0].data = x;
            });
        },
        selectPlatformPob2(queryParams) {
            queryPlatformPob(queryParams).then(data => {
                data = data.data;
                if (data === null) {
                    return;
                }
                data.forEach(item => {
                    if (item.prodPlatFormName === "海洋石油109(渤海世纪)") {
                        item.prodPlatFormName = "HYSY109FPSO";
                    }
                    item.sum =Number(item.littleSum)- Number(item.mineStaff) ;
                });
                this.tableData2 = data;
            });
        },
        // 查询POB施工项目情况
        selectPOBProjectPeople(queryParams) {
            queryPOBProjectPeople(queryParams).then(data => {
                console.log("queryPOBProjectPeople", queryPOBProjectPeople);
                data = data.data;
                const list = data;
                this.tableData1 = data;
                // this.total=data.total;
                // 查询图形
                const x = [];
                const y = [];
                // let y1=[];
                for (const i in list) {
                    if (list.hasOwnProperty(i)) {
                        // 折线图
                        x.push(list[i].prodPlatform);
                        y.push(list[i].projectUser.slice(0, 1));// waterTimeRate
                    }
                }
                // 柱图
                this.histogram2.series[0].data = y;
                this.histogram2.xAxis.data = x;
            });
        },
        // 查询POB施工项目情况
        // selectPOBProjectPeopleOthers(queryParams) {
        //     return;
        //     dailyList(queryParams).then(data => {
        //         console.log("selectPOBProjectPeopleOthers", data);
        //         data = data.data.records;
        //         const list = data;
        //         this.tableData1 = data;
        //         // this.total=data.total;
        //         // 查询图形
        //         const x = [];
        //         const y = [];
        //         // let y1=[];
        //         for (const i in list) {
        //             if (list.hasOwnProperty(i)) {
        //                 // 折线图
        //                 x.push(list[i].prodPlatform);
        //                 y.push(list[i].projectUser.slice(0, 1));// waterTimeRate
        //             }
        //         }
        //         // 柱图
        //         this.histogram2.series[0].data = y;
        //         this.histogram2.xAxis.data = x;
        //     });
        // },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = "合计";
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        }
                        return prev;
                    }, 0);
                    if (index == 3 || index == 5 || index == 7 || index == 9 || index == 11 || index == 13 || index == 15 || index == 17 || index == 19 || index == 21 || index == 23 || index == 25) {
                        sums[index] = Number(sums[index - 1] * 12);
                    } else {
                        sums[index] = Number(sums[index]);
                    }
                } else {
                    sums[index] = "";
                }
            });
            return sums;
        },
        /**
         * hwh
         * 查看施工日报
         * @param platformId 平台id
         * @param startTime 开始时间
         * @param endTime 结束时间
         */
        // doGetReloadOperating(platformId, startTime, endTime) {
        //     return;
        //     // 如果平台id等于油田id为空
        //     if (platformId == "3FC9A818F5BC43B88270DB80BBB3018F") {
        //         platformId = "";
        //     }
        //     getReloadOperating(platformId, startTime, endTime).then(res => {
        //         if (res.data.code == 0) {
        //             this.f = res.data;
        //             // this.changeEchartsOption(this.tableData1);
        //         } else {
        //             this.tableData1 = [];
        //         }
        //     });
        // },
        /**
         * hwh
         * 根据当日施工日报表格内容信息 画图
         * @param tableData
         */
        changeEchartsOption(tableData) {
            if (tableData && tableData.length >= 0) {
                const xData = [];
                const seriesData = [];
                // 遍历图表信息
                for (let i = 0; i < tableData.length; i++) {
                    const point = [];
                    xData.push(tableData[i].projectName);
                    point.push(tableData[i].projectName);
                    point.push(isNaN(Number(tableData[i].projectUser)) ? 0 : Number(tableData[i].projectUser));
                    seriesData.push(point);
                }
                this.histogram2.xAxis.data = xData;
                this.histogram2.series[0].data = seriesData;
            } else {
                this.histogram2.xAxis.data = [];
                this.histogram2.series[0].data = [];
            }
        }

    }
};
</script>
<style lang="scss" scoped>
.detailLinkBtn {
    position: absolute;
    right: 50px;
    top:6px;
    width: 50px;
    line-height: 20px;
    padding: 0 !important;
    height: 20px !important;
    font-size: smaller !important;
    text-align: center !important;
}

::v-deep .el-form--inline .el-form-item {
    margin: 10px 10px 10px 0;
}
.el-pagination {
    text-align: right;
}
::v-deep.el-table .el-table__footer-wrapper .cell {
    color: rgb(174, 178, 179);
    font-weight: bolder;
}
</style>