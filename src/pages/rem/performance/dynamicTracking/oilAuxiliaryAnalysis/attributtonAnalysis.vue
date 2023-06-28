<!-- 模型 - 归因分析 -->
<template>
    <div style="width: 100%; height: calc(100% - 90px)" class="pageBox">
        <header-search class="g-w100 g-h100" style="height: auto">
            <div class="g-row-flex-V g-w100 g-h100">
                <div style="width: 100%">
                    <el-form :inline="true">
                        <el-form-item label="作业公司:" style="margin-left: 30px">
                            <el-select v-model="queryData.orgId" disabled>
                                <el-option v-for="item in zygsSelect" :key="item.orgId" :label="item.orgName"
                                           :value="item.orgId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="油田:">
                            <el-select v-model="queryData.ogfId" disabled style="width: 160px">
                                <el-option v-for="(item, index) in oilFields" :key="index" :label="item.ogfName"
                                           :value="item.ogfId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="平台:">
                            <el-select v-model="queryData.assetCode" @change="choicewell" clearable
                                       style="width: 220px">
                                <el-option
                                    clearable
                                    v-for="(item, index) in platforms"
                                    :key="index"
                                    :label="item.platformName"
                                    :value="item.platformId"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="井号:">
                            <el-select v-model="queryData.well" clearable style="width: 170px">
                                <el-option v-for="(item, index) in wellList" :key="index" :label="item.wellName"
                                           :value="item.wellId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="日期:">
                            <el-date-picker
                                v-if="link == 4"
                                disabled
                                value-format="yyyy-MM-dd"
                                clearable
                                v-model="queryData.month"
                                type="date"
                                key="1"
                                style="width: 170px"
                                placeholder="选择月"
                            >
                            </el-date-picker>
                            <el-date-picker
                                v-if="link == 1 || link == 2 || link == 3 || link == 5 || link == 6"
                                value-format="yyyy-MM"
                                disabled
                                clearable
                                v-model="queryData.month"
                                type="month"
                                key="2"
                                style="width: 170px"
                                placeholder="选择月"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-search" @click="doSearch">搜索</el-button>
                            <el-button class="commonBtn" icon="el-icon-refresh"> 重置</el-button>
                        </el-form-item>

                        <el-form-item style="float: right">
                            <el-button type="primary" @click="returnRouter">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </header-search>
        <pagePanel v-if="link==4" :headerTitle="title" style="height: 120%" :show-btn="true">
            <Echart :chart-data="option2" style="height: 100%"></Echart>
        </pagePanel>
        <pagePanel v-else-if="link==5" :headerTitle="title" style="height: 120%" :show-btn="true">
            <Echart :chart-data="option3" style="height: 100%"></Echart>
        </pagePanel>
        <pagePanel v-else-if="link==6" :headerTitle="title" style="height: 120%" :show-btn="true">
            <Echart :chart-data="option4" style="height: 100%"></Echart>
        </pagePanel>
        <pagePanel v-else :headerTitle="title" style="height: 120%" :show-btn="true">
            <Echart :chart-data="option" style="height: 100%"></Echart>
        </pagePanel>
        <pagePanel v-if="link=='5'" :headerTitle="title+'明细表'" style="height: 100%" :show-btn="true">
            <el-table
                height="100%"
                :row-style="{ height: '0px' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
                header-cell-class-name="table_header"
                :cell-style="{ padding: '3px', 'text-align': 'center' }"
                :data="tableData"
                border
                ref="reset"
                style="width: 100%; height: 100%"
                id="cjyzsj"
                :default-sort="{ prop: 'date', order: 'descending' }"
            >
                <el-table-column prop="null" label="井号"></el-table-column>
                <el-table-column prop="null" label="日期"></el-table-column>
                <el-table-column prop="null" :label="`递减率\n(%)`"></el-table-column>
                <el-table-column prop="null" :label="`月度产液量\n(m³)`"></el-table-column>
                <el-table-column prop="null" :label="`生产时率\n(%)`"></el-table-column>
                <el-table-column prop="null" :label="`含水率\n(%)`"></el-table-column>
                <el-table-column prop="null" label="排量效率"></el-table-column>
                <el-table-column prop="null" :label="`流压\n(MPa)`"></el-table-column>
                <el-table-column prop="null" label="归因"></el-table-column>
                <el-table-column prop="null" label="措施"></el-table-column>
            </el-table>
        </pagePanel>
        <pagePanel v-if="link=='6'" :headerTitle="title+'明细表'" style="height: 100%" :show-btn="true">
            <el-table
                height="100%"
                :row-style="{ height: '0px' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
                header-cell-class-name="table_header"
                :cell-style="{ padding: '3px', 'text-align': 'center' }"
                :data="tableData"
                border
                ref="reset"
                style="width: 100%; height: 100%"
                id="cjyzsj"
                :default-sort="{ prop: 'date', order: 'descending' }"
            >
                <el-table-column prop="null" label="井号"></el-table-column>
                <el-table-column prop="null" label="日期"></el-table-column>
                <el-table-column prop="null" label="井组压力保持评价"></el-table-column>
                <el-table-column prop="null" :label="`井组月度产液量\n(m³)`"></el-table-column>
                <el-table-column prop="null" label="注采平衡分析结果"></el-table-column>
                <el-table-column prop="null" :label="`井组水井分层月注水量\n(m³)`"></el-table-column>
                <el-table-column prop="null" label="归因"></el-table-column>
                <el-table-column prop="null" label="下步措施"></el-table-column>
            </el-table>
        </pagePanel>
        <pagePanel v-if="link=='4'" :headerTitle="title+'明细表'" style="height: 100%" :show-btn="true">
            <el-table
                height="100%"
                :row-style="{ height: '0px' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
                :cell-style="{ padding: '3px', 'text-align': 'center' }"
                :data="tableData"
                border
                ref="reset"
                style="height: 100%"
                id="cjyzsj"
                :default-sort="{ prop: 'date', order: 'descending' }"
            >
                <el-table-column prop="wellNo" label="井号"></el-table-column>
                <el-table-column prop="evalTime" label="日期">
                    <template slot-scope="scope">
                        <span>{{ scope.row.evalTime ? scope.row.evalTime.split(' ')[0] : '-' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="layerName" show-overflow-tooltip label="层位"></el-table-column>
                <el-table-column prop="itemValue" :label="`注水强度\n(m³/d·m)`"></el-table-column>
                <el-table-column prop="evalResult" show-overflow-tooltip label="评价结论"></el-table-column>
                <el-table-column prop="injDuration" :label="`生产时长\n(h)`"></el-table-column>
                <el-table-column prop="injDaily" :label="`注入量\n(m³)`"></el-table-column>
                <el-table-column prop="whInjPress" :label="`注入压力\n(mPa)`"></el-table-column>
                <el-table-column prop="injAllocationRate" :label="`配注量\n(m³/d)`"></el-table-column>
                <el-table-column prop="valueAttribution" show-overflow-tooltip label="归因"></el-table-column>
                <el-table-column prop="vauleMeasure" show-overflow-tooltip label="建议措施"></el-table-column>
            </el-table>
        </pagePanel>
        <pagePanel v-if="link=='1' || link=='2' || link=='3'" :headerTitle="title+'明细表'" style="height: 100%" :show-btn="true">
            <el-table
                height="calc(100% - 50px)"
                :row-style="{ height: '0px' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
                header-cell-class-name="table_header"
                :cell-style="{ padding: '3px', 'text-align': 'center' }"
                :data="tableData"
                border
                ref="reset"
                style="width: 100%; height: 100%"
                id="cjyzsj"
                :default-sort="{ prop: 'date', order: 'descending' }"
            >
                <el-table-column prop="wellName" label="井号"></el-table-column>
                <el-table-column prop="date" label="日期">
                    <template slot-scope="scope">
                        <span> {{ scope.row.date ? scope.row.date.split(' ')[0].replace(/-01/g,'') : '' }} </span>
                    </template>
                </el-table-column>
                <el-table-column v-if="link == 1" prop="intensity" :label="`采液强度\n(m³/d·m)`"></el-table-column>
                <el-table-column v-if="link == 2" prop="fluidProductionIndex" :label="`采液指数\n(m³/mPa·d)`"></el-table-column>
                <el-table-column v-if="link == 3" prop="metreFluidProductionIndex" :label="`米采液指数\n(m³/mPa·d·m)`"></el-table-column>
                <el-table-column prop="yield" :label="`产液量\n(m³)`"></el-table-column>
                <el-table-column prop="monthlyProdEff" :label="`生产时率\n(%)`"></el-table-column>
                <el-table-column prop="pumpEfficiency" label="泵效"></el-table-column>
                <el-table-column prop="watCnt" :label="`含水率\n(%)`"></el-table-column>
                <el-table-column prop="flwPrs" :label="`流压\n(MPa)`"></el-table-column>
                <el-table-column prop="attribution" show-overflow-tooltip label="归因"></el-table-column>
                <el-table-column prop="measure" show-overflow-tooltip label="措施"></el-table-column>
            </el-table>
            <pagination
                :pageSizes="[15, 20, 40, 100]"
                :total="pageTotal"
                :page.sync="queryData.page"
                :limit.sync="queryData.pageSize"
                @pagination="pagination"
            />
        </pagePanel>
        
    </div>
</template>
<script>
import Echart from "@/components/tools/Echarts/index.vue";
import {
    queryOperatorsCheckFieldListsDetail,
    queryListOfOilfieldQueryPlatformsDetail,
    queryOperatingCompanyDetail,
    queryPlatformQueryWellListDetail,
} from "@/api/rem/marster.js";
import {queryWaterInjIntensityAttributeAnalysis} from "@/api/rem/waterinjintensityattributeanalysis.js"
import {analyzeOilWellFluidAttributionQuery} from "@/api/rem/wellmonthlyanalysis";
import {oilWellFluidQuery} from "@/api/rem/oilwellfluid";

export default {
    components: {
        Echart
    },
    data() {
        return {
            pageTotal:'',
            queryData: {
                assetCode: "",
                month: "",
                ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
                orgId: "715AD1CD60484BB59E737CD18A9DE44A",
                well: "",
                pageNum:"1",
                pageSize:"15",
            },
            tableData: [],
            oilFields: [],
            platforms: [],
            wellList: {},
            zygsSelect: [], //作业公司
            title: '油井采液强度归因分析',
            link: '1',
            evalResult:'',
            option: {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                series: [{
                    type: 'tree',
                    data: [
                        {
                            "level": 1,
                            "name": "采液指数不合理",
                            "children": [
                                {
                                    "level": 2,
                                    "name": "判断月度生产时率",
                                    "children": [
                                        {
                                            "level": 3,
                                            "name": "",
                                            "children": [
                                                {
                                                    "level": 4,
                                                    "name": "",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因1：直接关联关停记录表。\n下步措施：提高生产时率",
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },

                                        {
                                            "level": 3,
                                            "name": "判断油嘴和泵频率",
                                            "children": [
                                                {
                                                    "level": 4,
                                                    "name": "判断排量效率",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "判断含水率",
                                                            "children": [
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因3：目前处于中低含水期\n下步措施：存在乳化风险",
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因6：①注采失调；②水线突进。\n下步措施：产液结构优化调整、优化注水",
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "level": 6,
                                                                    "name": "判断流压",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因4：注采失调\n下步措施：排查周边井组状态",
                                                                        },
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因5：①设备影响；②邻井干扰；③关停层、封堵层失效。\n下步措施：①检泵，查管柱；②邻井排查；③上作业",
                                                                        },
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因7：地层能量不足。\n下步措施：优化注水",
                                                                        }
                                                                    ]
                                                                }

                                                            ]
                                                        },
                                                        {
                                                            "level": 5,
                                                            "name": "判断流压",
                                                            "children": [
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因4：注采失调\n下步措施：排查周边井组状态",
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因5：①设备影响；②邻井干扰；③关停层、封堵层失效。\n下步措施：①检泵，查管柱；②邻井排查；③上作业",
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因7：地层能量不足。\n下步措施：优化注水",
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }

                                                    ]
                                                },
                                                {
                                                    "level": 4,
                                                    "name": "",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因2：调整参数影响。\n下步措施：提高生产时率",
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                            ]
                                        },
                                    ]
                                },
                            ]
                        }
                    ],
                    top: '1%',
                    left: '10%',
                    bottom: '1%',
                    right: '20%',
                    symbol: 'none',
                    symbolSize: 7,
                    label: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 12,
                        lineHeight: 24,
                        // width: 100,
                        // ellipsis: false,
                        formatter: function (params) {
                            if (params.data.level === 1 && params.data.name) {
                                return '{a|' + params.name + '}'
                            } else if (params.data.level === 2 && params.data.name) {
                                return '{b|' + params.name + '}'
                            } else if (params.data.level === 3 && params.data.name) {
                                return '{c|' + params.name + '}'
                            } else if (params.data.level === 4 && params.data.name) {
                                return '{d|' + params.name + '}'
                            } else if (params.data.level === 6 && params.data.name) {
                                return '{f|' + params.name + '}'
                            } else if (params.data.level === 5 && params.data.name) {
                                return '{e|' + params.name + '}'
                            } else if (params.data.level === 7 && params.data.name) {
                                return '{h|' + params.name + '}'
                            } else {
                                return ''
                            }
                        },
                        rich: {
                            a: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#546fc6'
                            },
                            b: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#7ab1a6'
                            },
                            c: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#446dd3'
                            },
                            d: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#904a9b'
                            },
                            e: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#1ca3c1',
                            },
                            f: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#3c8418',
                                // width:'10px',
                            },
                            h: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#9e2f5d',
                                // width:'10px',
                            }
                        }
                    },
                    lineStyle: {
                        color: '#91cd75'
                    },
                    leaves: {
                        label: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    },

                    emphasis: {
                        disabled: true,
                        focus: 'ancestor',
                    },
                    select: {
                        disabled: true
                    },
                    selectedMode: "multiple",
                    expandAndCollapse: false,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }]
            },
            option2: {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                series: [{
                    type: 'tree',
                    data: [
                        {
                            "level": 1,
                            "name": "注水强度不合理",
                            "children": [
                                {
                                    "level": 2,
                                    "name": "判断生产时长",
                                    "children": [
                                        {
                                            "level": 3,
                                            "name": "",
                                            "children": [
                                                {
                                                    "level": 4,
                                                    "name": "",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因1：直接关联关停记录表或备注。\n下步措施：提高生产时率",
                                                                        }
                                                                    ]
                                                                },
                                                            ]
                                                        },
                                                    ]
                                                },
                                            ]
                                        },
                                        {
                                            "level": 3,
                                            "name": "判断分层段配注量",
                                            "children": [
                                                {
                                                    "level": 4,
                                                    "name": "",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因2：调整参数影响。\n下步措施：提高生产时率",
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    "level": 4,
                                                    "name": "判断分层段配注量",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "判断分层段/分层井口压力",
                                                            "children": [
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因4：井口压力过高。\n下步措施：建议分层酸化",
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "level": 6,
                                                                    "name": "判断分层段/分层可配注的最大量",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因5：注采失调。\n下步措施：调整分层配注量",
                                                                        },
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因6：注采关系失调。\n下步措施：调整产液结构",
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    "level": 4,
                                                    "name": "判断注水强度",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因3：①水线突破；②井组内产液变化。\n下步措施：注采调整",
                                                                        },
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因7：①地层污染；②吸水能力影响；③井组内产液变化。\n下步措施：观察调整",
                                                                        }
                                                                    ]
                                                                },
                                                            ]
                                                        },
                                                    ]
                                                },
                                            ]
                                        },
                                    ]
                                },
                            ]
                        }
                    ],
                    top: '1%',
                    left: '7%',
                    bottom: '1%',
                    right: '15%',
                    symbol: 'none',
                    symbolSize: 7,
                    label: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 12,
                        lineHeight: 24,
                        // width: 100,
                        // ellipsis: false,
                        formatter: function (params) {
                            if (params.data.level === 1 && params.data.name) {
                                return '{a|' + params.name + '}'
                            } else if (params.data.level === 2 && params.data.name) {
                                return '{b|' + params.name + '}'
                            } else if (params.data.level === 3 && params.data.name) {
                                return '{c|' + params.name + '}'
                            } else if (params.data.level === 4 && params.data.name) {
                                return '{d|' + params.name + '}'
                            } else if (params.data.level === 5 && params.data.name) {
                                return '{e|' + params.name + '}'
                            } else if (params.data.level === 6 && params.data.name) {
                                return '{f|' + params.name + '}'
                            } else if (params.data.level === 7 && params.data.name) {
                                return '{a|' + params.name + '}'
                            } else {
                                return ''
                            }
                        },
                        rich: {
                            a: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#546fc6'
                            },
                            b: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#7ab1a6'
                            },
                            c: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#446dd3'
                            },
                            d: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#904a9b'
                            },
                            e: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#1ca3c1',
                            },
                            f: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#9e2f5d',
                                // width:'10px',
                            },
                            z: {
                                color: '#ec1111',
                                fontWeight: 'bold'
                                // width:'10px',
                            }
                        }
                    },
                    lineStyle: {
                        color: '#91cd75'
                    },
                    leaves: {
                        label: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    },

                    emphasis: {
                        disabled: true,
                        focus: 'ancestor',
                    },
                    select: {
                        disabled: true
                    },
                    selectedMode: "multiple",
                    expandAndCollapse: false,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }]
            },
            option3: {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                series: [{
                    type: 'tree',
                    data: [
                        {
                            "level": 1,
                            "name": "油井递减率高",
                            "children": [
                                {
                                    "level": 2,
                                    "name": "判断月度产液量",
                                    "children": [
                                        {
                                            "level": 99,
                                            "name": "归因7：①注采失调；②水线突进。\n下步措施：产液结构优化调整、优化注水",
                                        },
                                        {
                                            "level": 3,
                                            "name": "判断月度含水率",
                                            "children": [
                                                {
                                                    "level": 4,
                                                    "name": "",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "关联水井注水量分析（通过井组关系获取）",
                                                            "children": [
                                                                {
                                                                    "level": 6,
                                                                    "name": "归因9：注水调配英雄。\n下步措施：调整配注量",
                                                                },
                                                                {
                                                                    "level": 6,
                                                                    "name": "归因10：①封隔器失效；②水线突进。\n下步措施：①卡封；②产液结构优化调整",
                                                                }
                                                            ]
                                                        }
                                                        
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "level": 3,
                                            "name": "判断月度生产时率",
                                            "children": [
                                                {
                                                    "level": 99,
                                                    "name": "归因1：直接关联关停记录表。\n下步措施：提高生产时率",
                                                },
                                                {
                                                    "level": 4,
                                                    "name": "判断油嘴和泵频率",
                                                    "children": [
                                                        {
                                                            "level": 99,
                                                            "name": "归因2：调整参数影响。\n下步措施：参数二次调整",
                                                        },
                                                        {
                                                            "level": 5,
                                                            "name": "判断排量效率",
                                                            "children": [
                                                                {
                                                                    "level": 5,
                                                                    "name": "判断流压",
                                                                    "children": [
                                                                        {
                                                                            "level": 99,
                                                                            "name": "归因3：注采失调。\n下步措施：排查周边井组状态",
                                                                        },
                                                                        {
                                                                            "level": 99,
                                                                            "name": "归因4：①设备影响；②邻井干扰；③关停层、封堵层失效。\n下步措施：①检泵、查管柱；②邻井排查；③上作业",
                                                                        },
                                                                        {
                                                                            "level": 99,
                                                                            "name": "归因6：地层能量不足。\n下步措施：优化注水",
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "level": 5,
                                                                    "name": "判断泵工况（已有成果）",
                                                                    "children": [
                                                                        {
                                                                            "level": 99,
                                                                            "name": "归因5：举升设备异常。\n下步措施：检泵",
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        
                                    ]
                                },
                            ]
                        }
                    ],
                    top: '1%',
                    left: '7%',
                    bottom: '1%',
                    right: '22%',
                    symbol: 'none',
                    symbolSize: 7,
                    label: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 12,
                        lineHeight: 24,
                        // width: 100,
                        // ellipsis: false,
                        formatter: function (params) {
                            if (params.data.level === 1 && params.data.name) {
                                return '{a|' + params.name + '}'
                            } else if (params.data.level === 2 && params.data.name) {
                                return '{b|' + params.name + '}'
                            } else if (params.data.level === 3 && params.data.name) {
                                return '{c|' + params.name + '}'
                            } else if (params.data.level === 4 && params.data.name) {
                                return '{d|' + params.name + '}'
                            } else if (params.data.level === 5 && params.data.name) {
                                return '{e|' + params.name + '}'
                            } else if (params.data.level === 6 && params.data.name) {
                                return '{f|' + params.name + '}'
                            } else if (params.data.level === 7 && params.data.name) {
                                return '{a|' + params.name + '}'
                            }else if (params.data.level === 99 && params.data.name) {
                                return '{f|' + params.name + '}'
                            } else {
                                return ''
                            }
                        },
                        rich: {
                            a: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#546fc6'
                            },
                            b: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#7ab1a6'
                            },
                            c: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#446dd3'
                            },
                            d: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#904a9b'
                            },
                            e: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#1ca3c1',
                            },
                            f: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#9e2f5d',
                                // width:'10px',
                            },
                            z: {
                                color: '#ec1111',
                                fontWeight: 'bold'
                                // width:'10px',
                            }
                        }
                    },
                    lineStyle: {
                        color: '#91cd75'
                    },
                    leaves: {
                        label: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    },

                    emphasis: {
                        disabled: true,
                        focus: 'ancestor',
                    },
                    select: {
                        disabled: true
                    },
                    selectedMode: "multiple",
                    expandAndCollapse: false,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }]
            },
            option4: {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                series: [{
                    type: 'tree',
                    data: [
                        {
                            "level": 1,
                            "name": "井组产油量降低",
                            "children": [
                                {
                                    "level": 2,
                                    "name": "调用井组压力保持评价模型",
                                    "children": [
                                        {
                                            "level": 3,
                                            "name": "判断井组月度产液量",
                                            "children": [
                                                {
                                                    "level": 4,
                                                    "name": "判断井组月度注水量",
                                                    "children": [
                                                        {
                                                            "level": 6,
                                                            "name": "归因5：①封隔器失效；②水线突进。\n下步措施：①卡封；②产液结构优化调整", 
                                                        },
                                                        {
                                                            "level": 5,
                                                            "name": "分析示踪剂（来水方向）",
                                                            "children": [
                                                                {
                                                                    "level": 6,
                                                                    "name": "归因4：注水调配影响。\n下步措施：调整配注量",
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    "level": 4,
                                                    "name": "油井采液强度指标归因分析模型",
                                                    "children": [
                                                        {
                                                            "level": 6,
                                                            "name": "归因统计分析（一井或多井）",
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "level": 3,
                                            "name": "调用井组注采平衡分析模型",
                                            "children": [
                                                {
                                                    "level": 4,
                                                    "name": "分析井组水井分层月注水量（单井加和）",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "油井采液强度指标归因分析模型",
                                                            "children": [
                                                                {
                                                                    "level": 6,
                                                                    "name": "归因统计分析（一井或多井）",
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "level": 5,
                                                            "name": "分析井组内水井分层月注水量",
                                                            "children": [
                                                                {
                                                                    "level": 6,
                                                                    "name": "归因1：井组超注。\n下步措施：控水调配注",
                                                                },
                                                                {
                                                                    "level": 6,
                                                                    "name": "归因2：注采关系失调。\n下步措施：调整产液结构",
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    "level": 4,
                                                    "name": "",
                                                    "children": [
                                                        {
                                                            "level": 6,
                                                            "name": "归因3：层内非均质性强。\n下步措施：调剖堵水", 
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                    ]
                                },
                            ]
                        }
                    ],
                    top: '1%',
                    left: '8%',
                    bottom: '1%',
                    right: '22%',
                    symbol: 'none',
                    symbolSize: 7,
                    label: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 12,
                        lineHeight: 24,
                        // width: 100,
                        // ellipsis: false,
                        formatter: function (params) {
                            if (params.data.level === 1 && params.data.name) {
                                return '{a|' + params.name + '}'
                            } else if (params.data.level === 2 && params.data.name) {
                                return '{b|' + params.name + '}'
                            } else if (params.data.level === 3 && params.data.name) {
                                return '{c|' + params.name + '}'
                            } else if (params.data.level === 4 && params.data.name) {
                                return '{d|' + params.name + '}'
                            } else if (params.data.level === 5 && params.data.name) {
                                return '{e|' + params.name + '}'
                            } else if (params.data.level === 6 && params.data.name) {
                                return '{f|' + params.name + '}'
                            } else if (params.data.level === 7 && params.data.name) {
                                return '{a|' + params.name + '}'
                            } else {
                                return ''
                            }
                        },
                        rich: {
                            a: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#546fc6'
                            },
                            b: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#7ab1a6'
                            },
                            c: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#446dd3'
                            },
                            d: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#904a9b'
                            },
                            e: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#1ca3c1',
                            },
                            f: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#9e2f5d',
                                // width:'10px',
                            },
                            z: {
                                color: '#ec1111',
                                fontWeight: 'bold'
                                // width:'10px',
                            }
                        }
                    },
                    lineStyle: {
                        color: '#91cd75'
                    },
                    leaves: {
                        label: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    },

                    emphasis: {
                        disabled: true,
                        focus: 'ancestor',
                    },
                    select: {
                        disabled: true
                    },
                    selectedMode: "multiple",
                    expandAndCollapse: false,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }]
            },
        };
    },
    mounted() {
        this.getData();
        this.queryData.month = this.$route.query.currentDate
        if(this.$route.query.platform == '3FC9A818F5BC43B88270DB80BBB3018F'){
            this.$route.query.platform = ''
        }
        this.queryData.assetCode = this.$route.query.platform
        this.queryData.well = this.$route.query.wellId
        this.evalResult = this.$route.query.evalResult
        this.link = this.$route.query.link
        if (this.link == '4') {
            this.title = '注水强度归因分析'
        } else if (this.link == '1') {
            this.option.series[0].data[0].name = '油井采液强度不合理'
            this.title = '油井采液强度归因分析'
        } else if (this.link == '2') {
            this.option.series[0].data[0].name = '油井采液指数不合理'
            this.title = '油井采液指数归因分析'
        } else if (this.link == '3') {
            this.option.series[0].data[0].name = '油井米采液指数不合理'
            this.title = '油井米采液指数归因分析'
        }else if(this.link == '5'){
            this.title = '油井递减率归因分析'
        }else if(this.link == '6'){
            this.title = '井组生产动态归因分析'
        }
        this.getFormData();
    },
    methods: {
        async getData() {
            await queryOperatingCompanyDetail({}).then((res) => {
                this.zygsSelect = res.data.data;
            });
            await queryOperatorsCheckFieldListsDetail({orgId: "715AD1CD60484BB59E737CD18A9DE44A"}).then((res) => {
                if (res.data.code == 200) {
                    this.oilFields = res.data.data;
                    if (this.oilFields.length == 0) {
                        this.oilField = "";
                    } else {
                        this.oilField = "3FC9A818F5BC43B88270DB80BBB3018F";
                    }
                    this.selectOilField = "3FC9A818F5BC43B88270DB80BBB3018F";
                    const requestPlat = {
                        ogfId: this.selectOilField,
                    };
                    queryPlatformQueryWellListDetail(requestPlat).then((res) => {
                        this.wellList = res.data.data;
                    });
                    queryListOfOilfieldQueryPlatformsDetail(requestPlat).then((res) => {
                        if (res.data.code == 200) {
                            this.platforms = res.data.data;
                            this.platforms.map((n) => {
                                if (n.platformName == "全部") {
                                    n.platformId = "";
                                }
                            });
                            // this.queryData.assetCode = "";
                        }
                    });
                }
            });
        },
        choicewell() {
            queryPlatformQueryWellListDetail({platformId: this.queryData.assetCode}).then((res) => {
                this.wellList = res.data.data;
                if (res.data.data.length) {
                    this.queryData.well = res.data.data[0].wellId
                } else {
                    this.queryData.well = ''
                }
            });
        },
        //切换分页
        pagination(e) {
            this.queryData.pageNum = e.page;
            this.queryData.pageSize = e.limit;
            this.getFormData()
        },
        // 返回按钮
        returnRouter() {
            this.$router.go(-1);
        },
        doSearch() {
            this.getFormData()
        },
        getFormData() {
            let params = {
                date: this.queryData.month,
                wellId: this.queryData.well,
                assetCode: this.queryData.assetCode,
                ogfId: this.queryData.ogfId,
                operationZone: this.queryData.orgId,
                evalResult: this.evalResult,
                evalTypeId: 'ZS',
                pageNum:this.queryData.pageNum,
                pageSize:this.queryData.pageSize
            }
            if (this.link == '4') {
                queryWaterInjIntensityAttributeAnalysis(params).then(res => {
                    this.tableData = res.data.data
                })
            }
            if (this.link == '1' || this.link == '2' || this.link == '3') {
                oilWellFluidQuery(params).then(res => {
                    this.tableData = res.data.data.rows
                    this.pageTotal = res.data.data.total
                })
            }
        }
    },
};
</script>

<style scoped lang="scss">
.pageBox {
    color: var(--formText);
    position: relative;
    font-family: PingFangSC-Regular, PingFang SC;
}

.topSearchDiv {
    display: flex;
}

.btnPosition {
    margin: 0 0 20px 0;
    justify-content: flex-end;
}

::v-deep .el-table__footer-wrapper td.el-table__cell {
    text-align: center;
}

::v-deep.el-table .el-table__footer-wrapper .cell {
    color: rgb(174, 178, 179);
    font-weight: bolder;
}

::v-deep .el-table--border th.gutter:last-of-type {
    display: block !important;
    width: 17px !important;
}
</style>
<style lang="scss" scoped>
::v-deep .el-main {
    padding: 0px 0px 20px;
    overflow: hidden;
}

::v-deep .btnStyle {
    margin-bottom: 0px;
}

.formBox {
    & > div:not(:first-child) {
        margin-left: 20px;
    }
}

.basicTable {
    height: auto;
    // padding-bottom: 10px;
}

::v-deep .el-table .cell:empty::before {
    content: "-";
}

::v-deep .el-table__header-wrapper {
    .cell {
        height: auto !important;
        line-height: 1.5 !important;
        white-space: pre;
    }
}

::v-deep .el-tabs__header {
    margin: 0;
}
</style>
