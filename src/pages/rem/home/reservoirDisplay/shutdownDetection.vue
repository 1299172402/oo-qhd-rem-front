<!-- 油藏看板 - 关停井跟踪 -->
<template>
    <div style="width: 100%; height: calc(100% - 90px)" class="pageBox">
        <header-search class="g-w100 g-h100" style="height: auto">
            <div class="g-row-flex-V g-w100 g-h100">
                <div style="margin: 0px; width: 100%">
                    <el-form :inline="true">
                        <el-form-item label="作业公司:">
                            <el-select v-model="queryData.orgId" disabled>
                                <el-option v-for="item in zygsSelect" :key="item.orgId" :label="item.orgName"
                                           :value="item.orgId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="油田:" style="margin-left:20px">
                            <el-select v-model="queryData.ogfId" disabled style="width: 160px;">
                                <el-option v-for="(item, index) in oilFields" :key="index" :label="item.ogfName"
                                           :value="item.ogfId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="平台:" style="margin-left:20px">
                            <el-select v-model="queryData.platformId" clearable @change="choicewell" style="width: 220px">
                                <el-option
                                    v-for="(item, index) in platforms"
                                    :key="index"
                                    :label="item.platformName"
                                    :value="item.platformId"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="井号:" style="margin-left:20px">
                            <el-select v-model="queryData.wellId" clearable style="width: 170px">
                                <el-option v-for="(item, index) in wellList" :key="index" :label="item.wellName" 
                                           :value="item.wellId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="开始与结束日期：">
                            <el-date-picker
                                v-model="month"
                                type="daterange"
                                style="width: 300px"
                                range-separator="-"
                                key="2"
                                value-format="yyyy-MM-dd"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="关停分类:" >
                            <el-select v-model="queryData.injShutdownTypeCode" clearable style="width: 220px">
                                <el-option
                                    v-for="(item, index) in ShutDownValueDict"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.code"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="计划属性:" style="margin-left:20px">
                            <el-select v-model="queryData.shutdownPlanTypeCode" clearable style="width: 220px">
                                <el-option
                                    v-for="(item, index) in PlanValueDict"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.code"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="queryinfo" icon="el-icon-search">搜索</el-button>
                            <el-button class="commonBtn" @click="result" icon="el-icon-refresh"> 重置</el-button>
                        </el-form-item>
                        <el-form-item style="float: right">
                            <el-button  style="float: right" type="primary" @click="returnrouter">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </header-search>
        <pagePanel headerTitle="秦皇岛32-6油田关停井跟踪" style="height: calc(100% - 40px )" class="g-w100"
                   :show-btn="true">
            <el-button icon="el-icon-download" type="primary" style="margin-bottom: 20px;float: right" @click="doDownExcel()">下载</el-button>
            <el-table
                :row-style="{ height: '0px' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
                header-cell-class-name="table_header"
                :cell-style="{ padding: '3px', 'text-align': 'center' }"
                :data="tableData"
                border
                height="calc(100% - 100px)"
                width="100%"
                ref="reset"
                style="width: 100%; height: calc(100% - 40px )"
                id="cjyzsj"
                :default-sort="{ prop: 'date', order: 'descending' }"
            >
                <el-table-column prop="wellName" label="井号"></el-table-column>
                <el-table-column prop="appendixValueName" label="*关停分类"></el-table-column>
                <el-table-column prop="reasonAppendixValueName" label="*关停原因"></el-table-column>
                <el-table-column prop="planAppendixValueName" label="*计划属性"></el-table-column>
                <el-table-column prop="beginDate" sortable min-width="90px" :label="`*关停开始时间\n(yyyy/mm/dd)`">
                    <template slot-scope="scope">
                        <span v-if="scope.row.beginDate">{{scope.row.beginDate.substring(0,10)}}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column prop="endDate" sortable min-width="90px" :label="`*关停结束时间\n(yyyy/mm/dd)`">
                    <template slot-scope="scope">
                        <span v-if="scope.row.endDate">{{scope.row.endDate.substring(0,10)}}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column prop="impactProdution" :label="`影响产量\n(m³)`">
                    <template slot-scope="scope">
                      <span v-if="!isNaN(Number(scope.row.impactProdution).toFixed(2))">{{Number(scope.row.impactProdution).toFixed(2)}}</span>  
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" show-overflow-tooltip label="备注"></el-table-column>
            </el-table>
            <pagination
                v-show="total > 0"
                :total="total"
                :page.sync="queryData.pageNum"
                :limit.sync="queryData.pageSize"
                @pagination="queryinfo"
            />

        </pagePanel>
    </div>
</template>
<script>
import {
    queryOperatorsCheckFieldListsDetail,
    queryListOfOilfieldQueryPlatformsDetail,
    queryOperatingCompanyDetail,
    queryPlatformQueryWellListDetail,
} from "@/api/rem/marster.js";
import {queryShutDownWellStatisDetails,queryShutDownWellStatisDetailsDownloadFile, queryShutDownValueDict, queryPlanValueDict} from '@/api/rem/reservoirbillboards'
import FileSaver from 'file-saver'
export default {
    name:'shutdownDetection',
    components: {},
    props: {
        infoData: {
            // default: false,
            // type: Boolean,
        },
    },
    data() {
        return {
            queryData: {
                platformId: "",
                month: "",
                pageNum: 1,
                pageSize: 10,
                ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
                orgId: "715AD1CD60484BB59E737CD18A9DE44A",
                startTime: "",
                endTime: "",
                wellId: "",
                shutdownPlanTypeCode: '',
                injShutdownTypeCode: '',

            },
            total: 0,
            month: [], //开始与结束时间中转字段
            tableData: [],
            selectOilFieldL: '',
            oilFields: [],
            platforms: [],
            wellList: {},
            zygsSelect: [], //作业公司
            PlanValueDict: {},
            startmonth: {},
            ShutDownValueDict: {},
        };
    },
    mounted() {
        this.getData();
        var data = new Date();
        var y = data.getFullYear();
        var time = data.getTime() - 24 * 60 * 60 * 1000;
        var time = new Date().getTime() - 24 * 60 * 60 * 1000;
        var yesday = new Date(time); // 获取的是前一天日期
        yesday =
            yesday.getFullYear() +
            "-" +
            (yesday.getMonth() > 9 ? yesday.getMonth() + 1 : "0" + (yesday.getMonth() + 1)) +
            "-" +
            (yesday.getDate() > 9 ? yesday.getDate() : "0" + yesday.getDate()); //字符串拼接转格式
        this.queryData.startTime = y + "-" + "01-01";
        this.queryData.endTime = yesday;
        this.$set(this.month, 0, this.queryData.startTime);
        this.$set(this.month, 1, this.queryData.endTime);
        this.startmonth = this.month
        this.queryinfo()
    },
    methods: {
        // 下载
        doDownExcel(){
            this.queryData.startTime = this.month[0]
            this.queryData.endTime = this.month[1]
            queryShutDownWellStatisDetailsDownloadFile(this.queryData).then((res)=>{
                const aBlob = new Blob([res]);
                FileSaver.saveAs(aBlob, `秦皇岛32-6油田关停井跟踪.xls` );
            })
        },
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
                            this.queryData.platformId = "";
                        }
                    });
                }
            });
            queryPlanValueDict().then((res) => {
                this.PlanValueDict = res.data.data.data
            })
            queryShutDownValueDict().then((res) => {
                this.ShutDownValueDict = res.data.data.data
            })

        },
        choicewell() {
            queryPlatformQueryWellListDetail({platformId: this.queryData.platformId}).then((res) => {
                this.wellList = res.data.data;
            });
        },
        // 返回按钮
        returnrouter() {
            this.$router.go(-1);
        },
        result() {
            this.queryData.platformId = ''
            let requestPlat = {
                ogfId: this.selectOilField,
            };
            var data = new Date();
            var y = data.getFullYear();
            var time = data.getTime() - 24 * 60 * 60 * 1000;
            var time = new Date().getTime() - 24 * 60 * 60 * 1000;
            var yesday = new Date(time); // 获取的是前一天日期
            yesday =
                yesday.getFullYear() +
                "-" +
                (yesday.getMonth() > 9 ? yesday.getMonth() + 1 : "0" + (yesday.getMonth() + 1)) +
                "-" +
                (yesday.getDate() > 9 ? yesday.getDate() : "0" + yesday.getDate()); //字符串拼接转格式
            queryPlatformQueryWellListDetail(requestPlat).then((res) => {
                this.wellList = res.data.data;
            });
            this.queryData.wellId = ''
            this.queryData.shutdownPlanTypeCode = ''
            this.queryData.injShutdownTypeCode = ''
            // this.month = this.startmonth
            this.queryData.startTime =y + "-" + "01-01";
            this.queryData.endTime = yesday;
            this.$set(this.month, 0, this.queryData.startTime);
            this.$set(this.month, 1, this.queryData.endTime);
            this.queryinfo()
        },
        queryinfo() {
            this.queryData.startTime = this.month[0]
            this.queryData.endTime = this.month[1]
            queryShutDownWellStatisDetails(this.queryData).then((res) => {
                this.tableData = res.data.data.data.rows
                this.total = res.data.data.data.total
            })
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

::v-deep .el-table .caret-wrapper {
   top:-8px;right:-10px
}
//::v-deep .has-gutter.caret-wrapper{
//    
//}
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

//::v-deep .el-table .cell {
//    white-space: pre-line;
//}
//
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
