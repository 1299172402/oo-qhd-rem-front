<!-- 油藏看板 - 关停井跟踪 -->
<template>
    <div style="width: 100%; height: calc(100% - 90px)" class="pageBox">
        <header-search class="g-w100 g-h100" style="height: auto">
            <div class="g-row-flex-V g-w100 g-h100">
                <div style="margin: 0px; width: 100%">
                    <el-form :inline="true">
<!--                        <el-form-item label="作业公司:">-->
<!--                            <el-select v-model="queryData.orgId">-->
<!--                                <el-option v-for="item in zygsSelect" :key="item.orgId" :label="item.orgName"-->
<!--                                           :value="item.orgId">-->
<!--                                </el-option>-->
<!--                            </el-select>-->
<!--                        </el-form-item>-->
                        <el-form-item label="油田:" style="margin-left:20px">
                            <el-select v-model="queryData.ogfId" style="width: 160px;"  @change="queryPlatformSelect" >
                                <el-option v-for="(item, index) in oilFields" :key="index" :label="item.ogfName"
                                           :value="item.ogfId" >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="平台:" style="margin-left:20px">
                            <el-select v-model="queryData.platformId" clearable @change="choicewell" style="width: 220px">
                                <el-option
                                    v-for="(item, index) in platforms"
                                    :key="index"
                                    :label="item.platformCode"
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
                        <el-form-item label="日期：">
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
                :data="tableData"
                border
                height="calc(100% - 100px)"
                width="100%"
                ref="reset"
                style="width: 100%; height: calc(100% - 40px )"
                id="cjyzsj"
                :default-sort="{ prop: 'date', order: 'descending' }"
            >
                <el-table-column prop="wellName" align="center" type="index" width="50px" label="序号"></el-table-column>
                <el-table-column prop="wellName" align="center" min-width="60px" label="井号"></el-table-column>
                <el-table-column prop="appendixValueName" align="center" min-width="60px" label="*关停分类"></el-table-column>
                <el-table-column prop="reasonAppendixValueName" align="center" min-width="60px" label="*关停原因"></el-table-column>
                <el-table-column prop="planAppendixValueName" align="center" min-width="40px" label="*计划属性"></el-table-column>
                <el-table-column prop="beginDate" align="center" sortable min-width="60px" :label="`*关停开始时间\n(yyyy-mm-dd)`">
                    <template slot-scope="scope">
                        <span v-if="scope.row.beginDate">{{scope.row.beginDate.substring(0,10)}}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column prop="endDate" align="center" sortable min-width="60px" :label="`*关停结束时间\n(yyyy-mm-dd)`">
                    <template slot-scope="scope">
                        <span v-if="scope.row.endDate">{{scope.row.endDate.substring(0,10)}}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column prop="impactProdution" min-width="40px" align="center" :label="`影响产量\n(m³)`">
                    <template slot-scope="scope">
                      <span v-if="!isNaN(Number(scope.row.impactProdution).toFixed(2))">{{Number(scope.row.impactProdution).toFixed(2)}}</span>  
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" min-width="130px" show-overflow-tooltip label="备注"></el-table-column>
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
    userListByUserNames,
    QueryPlatformDetail
} from "@/api/rem/marster.js";
import {queryShutDownWellStatisDetails,queryShutDownWellStatisDetailsDownloadFile, queryShutDownValueDict, queryPlanValueDict} from '@/api/rem/reservoirbillboards'
import FileSaver from 'file-saver'
export default {
    name:'ShutdownDetection',
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
            orgId: ''
        };
    },
    async mounted() {
        await this.initializeDate();
        await this.getData();
        await this.queryinfo();
    },
    methods: {
        initializeDate() {
            let now = new Date();
            // 当前年月的日
            let nowDay = now.getDate();
            //当前月份完整日期 (Thu Jul 07 2022 12:03:37 GMT+0800 (中国标准时间))
            let lastMonth = new Date(now.getTime());
            // 设置上一个月（这里不需要减1） getMonth()返回表示月份的数字 setMonth()设置月份参数
            lastMonth.setMonth(lastMonth.getMonth());
            // 设置为0，默认为当前月的最后一天
            lastMonth.setDate(0);
            // 上一个月的天数
            let daysOflastMonth = lastMonth.getDate();
            // 设置上一个月的日期，如果当前月的日期大于上个月的总天数，则为最后一天
            // 例如当前是3月31，而2月只有28或29天，则取2月的最后一天
            lastMonth.setDate(nowDay > daysOflastMonth ? daysOflastMonth : nowDay);
            var startDate =
                lastMonth.getFullYear() +
                "-" +
                (lastMonth.getMonth() + 1 >= 10 ? lastMonth.getMonth() + 1 : "0" + (lastMonth.getMonth() + 1)) +//月份从0开始
                "-" +
                (lastMonth.getDate() >= 10 ? lastMonth.getDate() : "0" + lastMonth.getDate());
            
            var endDate =
                now.getFullYear() +
                "-" +
                (now.getMonth() + 1 >= 10 ? now.getMonth() + 1 : "0" + (now.getMonth() + 1)) +//月份从0开始
                "-" +
                (now.getDate() >= 10 ? now.getDate() : "0" + now.getDate());

            this.$set(this.month, 0, startDate);
            this.$set(this.month, 1, endDate);

        },
        //作业公司
        // queryJobCompanySelect() {
        //     queryOperatingCompanyDetail({}).then((res) => {
        //         this.zygsSelect = res.data.data;
        //     });
        // },
        //获取当前作业公司
        async getCurrentJobCompany() {
            let params = {
                searchKeys: [this.$store.getters["user/userDetail"].user.userName],
            }
            await userListByUserNames(params).then((res) => {
                this.ogfId = (res.data.data[0]?.currentTenantBindOrgId) ? res.data.data[0].currentTenantBindOrgId : undefined;
            })
        },
        //油田
        async queryOrgSelect() {
            await queryOperatorsCheckFieldListsDetail({orgId: this.ogfId}).then((res) => {
                if (res.data.code === 200) {
                    this.oilFields = res.data.data;
                    if (this.orgId === '715AD1CD60484BB59E737CD18A9DE44A') {
                        this.queryData.ogfId = '3FC9A818F5BC43B88270DB80BBB3018F';
                    } else {
                        if (this.oilFields != null && this.oilFields.length > 0) {
                            this.queryData.ogfId = this.oilFields[0].ogfId;
                        }
                    }
                }
            });
        },
        //平台
        async queryPlatformSelect() {
            await QueryPlatformDetail({ogfId:this.queryData.ogfId}).then((res) => {
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
            await this.queryWellSelect()
        },
        //井号
        async queryWellSelect() {
            await queryPlatformQueryWellListDetail({ogfId: this.queryData.ogfId}).then((res) => {
                this.wellList = res.data.data;
                this.queryData.wellId = ''
            });
        },
        //关停井分类
        queryShutdownCategorySelect() {
            queryShutDownValueDict().then((res) => {
                this.ShutDownValueDict = res.data.data.data
                this.queryData.injShutdownTypeCode=''
            })
        },
        //计划属性
        queryPlanAttributesSelect() {
            queryPlanValueDict().then((res) => {
                this.PlanValueDict = res.data.data.data
                this.queryData.shutdownPlanTypeCode = ''
            })
        },
        
        // 下载
        doDownExcel(){
            this.queryData.startTime = this.month[0]
            this.queryData.endTime = this.month[1]
            queryShutDownWellStatisDetailsDownloadFile(this.queryData).then((res)=>{
                const aBlob = new Blob([res]);
                FileSaver.saveAs(aBlob, `秦皇岛32-6油田关停井跟踪.xls` );
            })
        },
        async getData() {
            // this.queryJobCompanySelect();
            await this.getCurrentJobCompany();
            await this.queryOrgSelect();
            await this.queryPlatformSelect();
            await this.queryWellSelect();
            await this.queryShutdownCategorySelect();
            await this.queryPlanAttributesSelect();
            await this.queryPlanAttributesSelect();
        },
        choicewell() {
            queryPlatformQueryWellListDetail({platformId: this.queryData.platformId}).then((res) => {
                this.wellList = res.data.data;
                this.queryData.wellId=''
            });
        },
        // 返回按钮
        returnrouter() {
            this.$router.go(-1);
        },
        async result() {
            await this.initializeDate();
            await this.getData();
            await this.queryinfo()
        },
        queryinfo() {
            this.queryData.startTime = this.month[0]
            this.queryData.endTime = this.month[1]
            // this.getData();
            queryShutDownWellStatisDetails(this.queryData).then((res) => {
                this.tableData = res.data.data.data.rows
                this.total = Number(res.data.data.data.total)
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
