<!-- 模型 - 归因分析 -->
<template>
    <div style="width: 100%; height: calc(100% - 90px)" class="pageBox">
        <header-search class="g-w100 g-h100" style="height: auto">
            <div class="g-row-flex-V g-w100 g-h100">
                <div style="margin-top: 20px; width: 100%">
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
                            <el-select v-model="queryData.assetCode" @change="choicewell" style="width: 220px">
                                <el-option
                                    v-for="(item, index) in platforms"
                                    :key="index"
                                    :label="item.platformName"
                                    :value="item.platformId"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="井号:">
                            <el-select v-model="queryData.well" style="width: 170px">
                                <el-option v-for="(item, index) in wellList" :key="index" :label="item.wellNo"
                                           :value="item.wellName">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="日期">
                            <el-date-picker
                                value-format="yyyy-MM-dd"
                                :clearable="false"
                                v-model="queryData.month"
                                type="date"
                                key="1"
                                style="width: 170px"
                                placeholder="选择月"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-search">搜索</el-button>
                            <el-button class="commonBtn" icon="el-icon-refresh"> 重置</el-button>
                        </el-form-item>

                        <el-form-item style="float: right">
                            <el-button type="primary" @click="returnrouter">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </header-search>
        <pagePanel headerTitle="采液强度分析流程图" style="height: 140%" class="g-w100" :show-btn="true">
            <Echart :chart-data="option" style="height: 100%"></Echart>
<!--            <el-button class="commonBtn" style="position: absolute;top:9%;right: 7%;height: 1px;line-height: 1px;font-size: 8px">推送</el-button>-->
<!--            <el-button class="commonBtn" style="position: absolute;top:13%;right: 7%;height: 1px;line-height: 1px;font-size: 8px">推送</el-button>-->
<!--            <el-button class="commonBtn" style="position: absolute;top:17%;right: 7%;height: 1px;line-height: 1px;font-size: 8px">推送</el-button>-->
<!--            <el-button class="commonBtn" style="position: absolute;top:21%;right: 7%;height: 1px;line-height: 1px;font-size: 8px">推送</el-button> -->
<!--            <el-button class="commonBtn" style="position: absolute;top:66%;right: 7%;height: 1px;line-height: 1px;font-size: 8px">推送</el-button>-->
<!--            <el-button class="commonBtn" style="position: absolute;top:44%;right: 7%;height: 1px;line-height: 1px;font-size: 8px">推送</el-button>-->
<!--            <el-button class="commonBtn" style="position: absolute;top:32%;right: 7%;height: 1px;line-height: 1px;font-size: 8px">推送</el-button>-->
        </pagePanel>
        <pagePanel headerTitle="采液强度分析关键参数明细表" style="height: 100%" class="g-w100" :show-btn="true">
            <el-table
                height="100%"
                :row-style="{ height: '0px' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
                header-cell-class-name="table_header"
                :cell-style="{ padding: '3px', 'text-align': 'center' }"
                :data="tableData"
                show-summary
                border
                ref="reset"
                style="width: 100%; height: 100%"
                id="cjyzsj"
                :default-sort="{ prop: 'date', order: 'descending' }"
            >
                <el-table-column prop="null" label="井号"></el-table-column>
                <el-table-column prop="null" :label="`采液强度\n(m³/mPa)`"></el-table-column>
                <el-table-column prop="null" label="含水率(%)"></el-table-column>
                <el-table-column prop="null" label="动液面(m)"></el-table-column>
                <el-table-column prop="null" label="储层物性"></el-table-column>
                <el-table-column prop="null" :label="`地层压力\n(mPa)`">></el-table-column>
                <el-table-column prop="null" :label="`*关停结束时间\n(yyyy/mm/dd)`"></el-table-column>
                <el-table-column prop="null" label="出砂情况"></el-table-column>
            </el-table>
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

export default {
    components: {
        Echart
    },
    props: {
        infoData: {
            // default: false,
            // type: Boolean,
        },
    },
    data() {
        return {
            queryData: {
                assetCode: "",
                month: "",
                ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
                orgId: "715AD1CD60484BB59E737CD18A9DE44A",
                beginDate: "",
                endDate: "",
                well: "",
            },
            pickerOption: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            },
            tableData: [],
            oilFields: [],
            platforms: [],
            wellList: {},
            zygsSelect: [], //作业公司
            option: {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                series: [{
                    type: 'tree',
                    data:[
                        {
                            "level": 1,
                            "name": "日产液量日常上升",
                            "children": [
                                {
                                    "level": 2,
                                    "name": "地面",
                                    "children": [
                                        {
                                            "level": 3,
                                            "name": "数据采集",
                                            "children": [
                                                {
                                                    "level": 4,
                                                    "name": "日产液量",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "其他项均正常，数据采集日产液量变大(如:超过10%，考虑是否根据液量等级制定变化范围。)判断方法:平台所有产液量变动。",
                                                            "children": [
                                                                {
                                                                    "level": 6,
                                                                    "name": "仪表/设备故障"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "level": 3,
                                            "name": "生产时间",
                                            "children": [
                                                {
                                                    "level": 4,
                                                    "name": "生产时长",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "前日关停影响"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "level": 3,
                                            "name": "工作制度",
                                            "children": [
                                                {
                                                    "level": 4,
                                                    "name": "气举嘴直径\n油嘴直径",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "1、调整参数影响\n2、气举嘴、油嘴故障"
                                                        }
                                                    ]
                                                },
                                            ]
                                        },
                                        {
                                            "level": 3,
                                            "name": "干线压力",
                                            "children": [
                                                {
                                                    "level": 4,
                                                    "name": "回压",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "集输管线穿孔(海上是否可忽略)"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "level": 3,
                                            "name": "温度",
                                            "children": [
                                                {
                                                    "level": 4,
                                                    "name": "井口温度",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "关停层、封堵层失效等"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "level": 4,
                                                    "name": "套管温度",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "关停层、封堵层失效等"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "level": 2,
                                    "name": "井筒",
                                    "children": [
                                        {
                                            "level": 3,
                                            "name": "工作制度",
                                            "children": [
                                                {
                                                    "level": 4,
                                                    "name": "泵频率",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "1、更换设备影响\n2、调整参数影响\n3、设备故障影响"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "level": 4,
                                                    "name": "泵转速",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "1、更换设备影响\n2、调整参数影响\n3、设备故障影响"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "level": 3,
                                            "name": "泵工况",
                                            "children": [
                                                {
                                                    "level": 4,
                                                    "name": "泵效",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "1、注采调整影响\n2、洗井等影响"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "level": 4,
                                                    "name": "沉没度",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "1、注采调整影响\n2、洗井等影响"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "level": 2,
                                    "name": "地层",
                                    "children": [
                                        {
                                            "level": 3,
                                            "name": "井底状况",
                                            "children": [
                                                {
                                                    "level": 4,
                                                    "name": "井底流温",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "1、注采调整影响\n2、关停层、封堵层失效等"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "level": 4,
                                                    "name": "井底流压",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "1、注采调整影响\n2、关停层、封堵层失效等"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "level": 3,
                                            "name": "含水状况",
                                            "children": [
                                                {
                                                    "level": 4,
                                                    "name": "含水率",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "1、注采调整影响\n2、高含水层能量上升等影响\n3、固井质量差导致管外窜等"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "level": 3,
                                            "name": "能量状况",
                                            "children": [
                                                {
                                                    "level": 4,
                                                    "name": "动液面",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "1、注调整影响\n2、高含水层能量上升等影响\n3、封隔器失效导致高能量层出液"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    top: '1%',
                    left: '7%',
                    bottom: '1%',
                    right: '20%',
                    symbolSize: 7,
                    label: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 12,
                        lineHeight: 24,
                        formatter: function (params) {
                            console.log(params)
                            if (params.data.level === 1) {
                                return '{a|' + params.name + '}'
                            } else if (params.data.level === 2) {
                                return '{b|' + params.name + '}'
                            } else if (params.data.level === 3) {
                                return '{c|' + params.name + '}'
                            } else if (params.data.level === 6) {
                                return '{f|' + params.name + '}'
                            } else if (params.data.level === 5) {
                                params.name = params.name.replace(/(.{20})/g, "$1\n");
                                return '{e|' + params.name + '}'
                            } else {
                                let s = '{d|' + params.name + '}'
                                return s
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
                                backgroundColor: '#bec985'
                            },
                            d: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#9b6e4a'
                            },
                            e: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#1ca3c1',
                                offset:[100,100]
                            } ,
                            f: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#789e2f',
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
                        disabled:true,
                        focus: 'ancestor'
                    },
                    select: {
                        disabled: true
                    },
                    selectedMode: "multiple",
                    expandAndCollapse: false,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }]
            }
        };
    },
    mounted() {
        this.getData();
        var data = new Date();
        var time = data.getTime() - 24 * 60 * 60 * 1000;
        var time = new Date().getTime() - 24 * 60 * 60 * 1000;
        var yesday = new Date(time); // 获取的是前一天日期
        yesday =
            yesday.getFullYear() +
            "-" +
            (yesday.getMonth() > 9 ? yesday.getMonth() + 1 : "0" + (yesday.getMonth() + 1)) +
            "-" +
            (yesday.getDate() > 9 ? yesday.getDate() : "0" + yesday.getDate()); //字符串拼接转格式
        this.queryData.month = yesday;
    },
    methods: {
        getData() {
            queryOperatingCompanyDetail({}).then((res) => {
                this.zygsSelect = res.data.data;
            });
            queryOperatorsCheckFieldListsDetail({orgId: "715AD1CD60484BB59E737CD18A9DE44A"}).then((res) => {
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
                            this.queryData.assetCode = "";
                        }
                    });
                }
            });
        },
        choicewell() {
            queryPlatformQueryWellListDetail({platformId: this.queryData.assetCode}).then((res) => {
                this.wellList = res.data.data;
            });
        },
        // 返回按钮
        returnrouter() {
            this.$router.go(-1);
        },
        queryinfo(data) {
        },
        getList() {
            getFactoryRunTime({});
        },
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

::v-deep .el-table .cell {
    white-space: pre-line;
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
