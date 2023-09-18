<!-- 油藏看板 - 问题井统计-->
<template>
    <div class="app-container" style="height: calc(100%);">
            <div
                style="height: calc(100%)">
                <headerSearch class="g-w100 g-h100" style="height: auto">
                    <el-form :model="queryParams" :inline="true" style="margin-top: 18px">
                        <el-form-item label="油田:" style="margin-left:20px">
                            <el-select v-model="queryParams.ogfId" @change="choicepla" style="width: 160px;">
                                <el-option v-for="(item, index) in oilFields" :key="index" :label="item.ogfName"
                                           :value="item.ogfId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="平台:" style="margin-left:20px">
                            <el-select v-model="queryParams.assetCode" @change="choicewell" style="width: 220px">
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
                            <el-select v-model="queryParams.wellId" clearable style="width: 170px">
                                <el-option v-for="(item, index) in wellList" :key="index" :label="item.wellName"
                                           :value="item.wellId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="年份:" style="margin-left:20px">
                            <el-date-picker
                                type="year"
                                placeholder="选择年份"
                                value-format="yyyy"
                                v-model="queryParams.yearDate"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="mini" @click="searchinfo"  icon="el-icon-search" type="primary">搜索
                            </el-button>
                            <el-button size="mini" @click="reset" icon="el-icon-refresh" class="commonBtn">重置
                            </el-button>
                        </el-form-item>
                        <el-form-item style="float: right">
                            <el-button type="primary" @click="returnrouter">返回</el-button>
                        </el-form-item>
                    </el-form>
                </headerSearch>
                <page-panel header-title="油田低产低效井原因及潜力方向" style="flex:1;overflow: hidden" :show-btn="true">
                    <el-button icon="el-icon-download" type="primary" style="margin-top:-10px;float:right" @click="downTable">下载</el-button>
                    <el-table
                        :data="noticeList"
                        ref="table"
                        highlight-current-row
                        height="calc(100% - 100px)"
                        style="margin-top: 10px"
                        :row-style="{ height: '0px' }"
                        id="gzjtj"
                        :header-cell-style="{ 'text-align': 'center', padding: '0px' }"
                        header-cell-class-name="table_header"
                        :cell-style="{ 'text-align': 'center', padding: '2px' }"
                        :default-sort="{ prop: 'date', order: 'descending' }"
                    >
                        <el-table-column label="序号"  width="50px" type="index" align="center">
                        </el-table-column>
                        <el-table-column label="油田" prop="ogfNo" min-width="100px" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.ogfNo.includes("QHD32-6")? scope.row.ogfNo.replace("QHD32-6", "秦皇岛32-6油田") : scope.row.ogfNo}}</span>
                            </template>  
                        </el-table-column>
                        <el-table-column label="井号" prop="wellNo" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.wellNo !== null && scope.row.wellNo !== ''">{{scope.row.wellNo}}</span>
                                <span v-else>-</span>
                            </template>              
                        </el-table-column>
                        <el-table-column label="低产低效类别" prop="lowProdEffTypeCode"  align="center">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.lowProdEffTypeCode !== null && scope.row.lowProdEffTypeCode !== ''">{{scope.row.lowProdEffTypeCode}}</span>
                                    <span v-else>-</span>
                                </template>
                        </el-table-column>
                        <el-table-column label="生产情况"   align="center">
                            <el-table-column :label="`日产油\n(m³/d)`" prop="dailyOil"   align="center">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.dailyOil !== null && scope.row.dailyOil !== ''">{{scope.row.dailyOil}}</span>
                                    <span v-else>-</span>
                                </template>
                            </el-table-column>
                            <el-table-column :label="`日产气\n(m³/d)`" prop="dailyGas" align="center">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.dailyGas !== null && scope.row.dailyGas !== ''">{{scope.row.dailyGas}}</span>
                                    <span v-else>-</span>
                                </template>
                            </el-table-column>
                            <el-table-column :label="`含水\n(%)`" prop="waterCut"  align="center">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.waterCut !== null && scope.row.waterCut !== ''">{{scope.row.waterCut}}</span>
                                    <span v-else>-</span>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="低产低效原因"  align="center">
                            <el-table-column label="一级原因"  prop="shutdownTypeFirstClass" align="center">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.shutdownTypeFirstClass !== null && scope.row.shutdownTypeFirstClass !== ''">{{scope.row.shutdownTypeFirstClass}}</span>
                                    <span v-else>-</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="二级原因" prop="shutdownTypeSecondClass"  align="center">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.shutdownTypeSecondClass !== null && scope.row.shutdownTypeSecondClass !== ''">{{scope.row.shutdownTypeSecondClass}}</span>
                                    <span v-else>-</span>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="挖潜方向" prop="tappingDirection" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.tappingDirection !== null && scope.row.tappingDirection !== ''">{{scope.row.tappingDirection}}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="是否纳入当年计划" min-width="100px" prop="isPlan" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.isPlan !== null && scope.row.isPlan !== ''">{{scope.row.isPlan}}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="`计划日产\n(m³/d)`" prop="planOil" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.planOil !== null && scope.row.planOil !== ''">{{scope.row.planOil}}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注" prop="remark" show-overflow-tooltip align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.remark !== null && scope.row.remark !== ''">{{scope.row.remark}}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </page-panel>
                <pagination
                    :total="total"
                    v-show="total > 0"
                    @pagination="searchinfo"
                    style="position: absolute;bottom: 20px;right:35px"
                    :page.sync="queryParams.pageNum"
                    :limit.sync="queryParams.pageSize"
                />
            </div>
       

    </div>
</template>

<script>

import {
    queryListOfOilfieldQueryPlatformsDetail,
    queryOperatingCompanyDetail,
    queryOperatorsCheckFieldListsDetail
} from "@/api/basic/master";
import {queryPlatformQueryWellListDetail} from "@/api/rem/marster";
import FileSaver from 'file-saver'
import {queryProblemWellStatisDetails,queryProblemWellStatisDetailsDownloadFile} from '@/api/rem/reservoirbillboards'
export default {
    name: "problemWellStatistics",
    dicts: ["sys_normal_disable"],
    components: {
    },
    data() {
        return {
            oilFields: [],
            // 表格数据
            noticeList: [],
            platforms:[],
            wellList:[],
            total:0,
            // 查询参数
            queryParams: {
                ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
                orgId: "715AD1CD60484BB59E737CD18A9DE44A",
                pageSize:10,
                pageNum:1,
                wellId:'',
                // yearDate:new Date().format('YYYY'),
                yearDate:'2022',
                assetCode:'',
            },
        };
    },
    created() {
        this.getlist();
        this.searchinfo()
    },
    methods: {
        getlist() {
            //根据作业公司查询油田
            queryOperatorsCheckFieldListsDetail({orgId:this.queryParams.orgId}).then(res=>{
                this.oilFields = res.data.data
            })
            //根据油田查询平台列表
            queryListOfOilfieldQueryPlatformsDetail({ogfId:this.queryParams.ogfId}).then(res=>{
                this.platforms = res.data.data
            })
            const requestPlat = {
                ogfId: this.queryParams.ogfId,
            };
            queryPlatformQueryWellListDetail(requestPlat).then((res) => {
                this.wellList = res.data.data;
            });
        },
        choicepla(val){
            queryListOfOilfieldQueryPlatformsDetail({ogfId:val}).then(res=>{
                this.platforms = res.data.data
            })
            const requestPlat = {
                ogfId: this.queryParams.ogfId,
            };
            queryPlatformQueryWellListDetail(requestPlat).then((res) => {
                this.wellList = res.data.data;
            });
        },
        downTable(){
            queryProblemWellStatisDetailsDownloadFile(this.queryParams).then((res)=>{
                const aBlob = new Blob([res]);
                FileSaver.saveAs(aBlob, `油田低产低效井原因及潜力分析.xls` );
            })
        },
        choicewell() {
            queryPlatformQueryWellListDetail({platformId: this.queryParams.assetCode}).then((res) => {
                this.wellList = res.data.data;
                if (res.data.data.length) {
                    this.queryParams.wellId = this.wellList[0].wellId
                } else {
                    this.queryParams.wellId = ''
                }
            });
        },
        searchinfo(){
            queryProblemWellStatisDetails(this.queryParams).then((res)=>{
                this.noticeList = res.data.data?.rows
                this.total = res.data.data?.total
            })
        },
        returnrouter() {
            this.$router.go(-1);
        },
        // 重置
        reset() {
            this.queryParams.ogfId = '3FC9A818F5BC43B88270DB80BBB3018F'
            this.choicepla(this.queryParams.ogfId)
            this.queryParams.assetCode = ''
            this.queryParams.wellId = ''
           
            this.queryParams.yearDate = '2022'
            this.getlist()
            // this.getInfo()
        },
    },
};
</script>
<style lang="less" scoped>
#gzjtj {
    ::v-deep .el-table__header-wrapper .cell {
        height: auto;
        line-height: 18px;
        white-space: pre;
    }
}
</style>

