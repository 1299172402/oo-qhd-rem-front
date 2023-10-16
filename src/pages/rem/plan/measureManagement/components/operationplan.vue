<!-- 现场作业计划 -->
<template>
    <div class="app-container" style="height: 100%">
        <headerSearch class="g-w100 g-h100" style="width: 100%;margin-top: 12px;padding: 5px">
            <el-form :model="queryParams" ref="queryForm" :inline="true" style="margin-top: 18px;height:auto">
                <el-form-item label="油田：">
                    <el-select v-model="queryParams.selectOilField" @change="choicepla">
                        <el-option
                            v-for="(item, index) in oilFields"
                            :key="index"
                            :label="item.ogfName"
                            :value="item.ogfId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="平台：">
                    <el-select @change="onPlatfromChange" clearable v-model="queryParams.asseCode">
                        <el-option v-for="item in platforms" :key="item.id" :label="item.platformName"
                                   :value="item.platformId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="井号：">
                    <el-select clearable v-model="queryParams.wellId">
                        <el-option v-for="item in wells" :key="item.wellId" :label="item.wellName" :value="item.wellId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="措施事件：">
                    <el-select
                        v-model="queryParams.measureTypeCode"
                        style="width: 150px"
                        placeholder="请选择"
                        filterable
                        clearable
                    >
                        <el-option
                            v-for="item in measures"
                            :key="item.currentJobContent"
                            :label="item.currentJobContent"
                            :value="item.measureTypeCode"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年度：">
                    <el-date-picker style="width: 150px" v-model="queryParams.yeartime" value-format="yyyy" type="year"
                                    placeholder="年">
                    </el-date-picker>
                </el-form-item>
                <el-button size="medium" type="primary" @click="retrieval" icon="el-icon-search"
                           style="margin-left: 10px"
                >搜索
                </el-button
                >
                <el-button class="commonBtn" @click="reset" icon="el-icon-refresh"> 重置</el-button>
                <el-button style="float: right" type="primary" @click="returnrouter">返回</el-button>
            </el-form>
        </headerSearch>
        <pagePanel headerTitle="现场作业计划表" style="height: calc(100% - 50px)">
            <el-button icon="el-icon-download" type="primary" style="margin-bottom: 20px;float: right"
                       @click="doDownExcel()">下载
            </el-button>
            <el-table
                :data="noticeList"
                highlight-current-row
                :row-style="{ height: '0px' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px' }"
                header-cell-class-name="table_header"
                :cell-style="{ 'text-align': 'center', padding: '2px' }"
                style="width: 100%"
                height="calc(100% - 90px)"
                :default-sort="{ prop: 'date', order: 'descending' }"
            >
                <el-table-column label="日期" prop="theDate" align="center">
                    <template slot-scope="scope">
                        <span
                            v-if="scope.row.theDate !== null && scope.row.theDate !== ''">{{ scope.row.theDate }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column label="*生产单元" min-width="130px" prop="prodectionUnit" align="center">
                    <template slot-scope="scope">
                        <span
                            v-if="scope.row.prodectionUnit !== null && scope.row.prodectionUnit !== ''">{{ scope.row.prodectionUnit }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column label="修井机状态" prop="workvoerRigStatus" align="center">
                    <template slot-scope="scope">
                        <span
                            v-if="scope.row.workvoerRigStatus !== null && scope.row.workvoerRigStatus !== ''">{{ scope.row.workvoerRigStatus }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column label="当前作业内容" min-width="90px" prop="currentJobContent" align="center">
                    <template slot-scope="scope">
                        <span
                            v-if="scope.row.currentJobContent !== null && scope.row.currentJobContent !== ''">{{ scope.row.currentJobContent }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column label="作业井号" min-width="100px" prop="jobWellNo" align="center">
                    <template slot-scope="scope">
                        <span
                            v-if="scope.row.jobWellNo !== null && scope.row.jobWellNo !== ''">{{ scope.row.jobWellNo }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column label="是否动管柱" prop="isMovingPipePresent" align="center">
                    <template slot-scope="scope">
                        <span
                            v-if="scope.row.isMovingPipePresent !== null && scope.row.isMovingPipePresent !== ''">{{ scope.row.isMovingPipePresent }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column label="开始时间" min-width="100px" prop="startDate" align="center">
                    <template slot-scope="scope">
                        <span
                            v-if="scope.row.startDate !== null && scope.row.startDate !== ''">{{ scope.row.startDate }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column label="预计结束时间" min-width="100px" prop="endDate" align="center">
                    <template slot-scope="scope">
                        <span
                            v-if="scope.row.endDate !== null && scope.row.endDate !== ''">{{ scope.row.endDate }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column label="当日作业内容简述" min-width="110px" show-overflow-tooltip prop="operationInfo"
                                 align="center">
                    <template slot-scope="scope">
                        <span
                            v-if="scope.row.operationInfo !== null && scope.row.operationInfo !== ''">{{ scope.row.operationInfo }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column label="下步作业内容" min-width="100px" prop="nextJobContent" align="center">
                    <template slot-scope="scope">
                        <span
                            v-if="scope.row.nextJobContent !== null && scope.row.nextJobContent !== ''">{{ scope.row.nextJobContent }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column label="作业井号" min-width="100px" prop="nextJobWellNo" align="center">
                    <template slot-scope="scope">
                        <span
                            v-if="scope.row.nextJobWellNo !== null && scope.row.nextJobWellNo !== ''">{{ scope.row.nextJobWellNo }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column label="是否动管柱" prop="isMovingPipePresent" align="center">
                    <template slot-scope="scope">
                        <span
                            v-if="scope.row.isMovingPipePresent !== null && scope.row.isMovingPipePresent !== ''">{{ scope.row.isMovingPipePresent }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column label="预计作业时间" prop="planStartDate" align="center">
                    <template slot-scope="scope">
                        <span
                            v-if="scope.row.planStartDate !== null && scope.row.planStartDate !== ''">{{ scope.row.planStartDate }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column label="备注" prop="remark" show-overflow-tooltip align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.remark !== null && scope.row.remark !== ''">{{ scope.row.remark }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
            </el-table>
            <pagination
                :total="total"
                v-show="total > 0"
                @pagination="changepage"
                style="position: absolute;bottom: 0;right:0"
                :page.sync="pageNum"
                :limit.sync="pageSize"
            />
        </pagePanel>
    </div>
</template>

<script>
import {getOnSiteWork, onSiteWorkActionEvent, onSiteWorkDownloadFile} from '@/api/rem/actionplanmanagement';
import {
    queryListOfOilfieldQueryPlatformsDetail,
    queryOperatorsCheckFieldListsDetail,
    queryPlatformQueryWellListDetail,userListByUserNames
} from "@/api/basic/master";
import FileSaver from 'file-saver'
import {QueryPlatformDetail, QueryWellDetail} from "@/api/rem/marster";

export default {
    data() {
        return {
            oilfield: [],
            deptSelect: [],
            measures: [],
            oilFields: [],
            platforms: [],
            wells: [],
            // 表格数据
            noticeList: [],
            queryParams: {
                measureTypeCode: '',
                asseCode: '',
                wellId: '',
                selectOilField: '',
                yeartime: new Date().format('YYYY')
            },
            // 总条数
            total: 0,
            pageNum: 1,
            orgId:'',
            pageSize: 10,
            // 查询参数
        };
    },
    created() {
        this.retrieval();
        let params = {
            searchKeys: [this.$store.getters["user/userDetail"].user.userName],
        }
        userListByUserNames(params).then((res) => {
           this.orgId = (res.data.data[0] && res.data.data[0]?.tenantInfos && res.data.data[0]?.tenantInfos[0]) ? res.data.data[0].tenantInfos[0]?.deptId : undefined;
            queryOperatorsCheckFieldListsDetail({orgId: this.orgId}).then(res => {
                this.oilFields = res.data.data
                if(this.orgId=='715AD1CD60484BB59E737CD18A9DE44A'){
                    this.queryParams.selectOilField = '3FC9A818F5BC43B88270DB80BBB3018F'
                }else{
                    this.queryParams.selectOilField = this.oilFields[0].ogfId
                }
            })
        })
        onSiteWorkActionEvent().then((res) => {
            this.measures = res.data.data
        })
        queryListOfOilfieldQueryPlatformsDetail({ogfId: '3FC9A818F5BC43B88270DB80BBB3018F'}).then(res => {
            this.platforms = res.data.data
        })
        queryPlatformQueryWellListDetail({ogfId: '3FC9A818F5BC43B88270DB80BBB3018F'}).then((res) => {
            this.wells = res.data.data
        })
    },
    methods: {
        show(data) {
            this.getList()
        },
        //平台下拉-change
        onPlatfromChange(val) {
            //根据平台获得井
            queryPlatformQueryWellListDetail({platformId: val}).then((res) => {
                this.wells = res.data.data
                this.queryParams.wellId = this.wells[0].wellId
            })
        },
        returnrouter() {
            this.$router.go(-1);
        },
        retrieval() {
            let data = {
                ogfId: this.queryParams.selectOilField,
                asseCode: this.queryParams.asseCode,
                wellId: this.queryParams.wellId,
                measureTypeCode: this.queryParams.measureTypeCode,
                yearTime: this.queryParams.yeartime,
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }
            getOnSiteWork(data).then((res) => {
                if (res.data.code === 200) {
                    this.noticeList = res.data.data.rows;
                    this.total = res.data.data.total
                } else {
                    this.$message.warning('系统错误请重新尝试或联系运维人员！');
                }
            });
        },
        doDownExcel() {
            let data = {
                ogfId: this.queryParams.selectOilField,
                asseCode: this.queryParams.asseCode,
                wellId: this.queryParams.wellId,
                measureTypeCode: this.queryParams.measureTypeCode,
                yearTime: this.queryParams.yeartime,
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }
            onSiteWorkDownloadFile(data).then((res) => {
                const aBlob = new Blob([res]);
                FileSaver.saveAs(aBlob, `现场作业计划表.xls`);
            })
        },
        choicepla(val){
            QueryPlatformDetail({ogfId: val}).then(res => {
                this.platforms = res.data.data
            })
            QueryWellDetail({
                ogfId: val,
            }).then((res) => {
                    this.wells = res.data.data;
            });
        },
        reset() {
            if(this.orgId=='715AD1CD60484BB59E737CD18A9DE44A'){
                this.queryParams.selectOilField = '3FC9A818F5BC43B88270DB80BBB3018F'
            }else{
                this.queryParams.selectOilField = this.oilFields[0].ogfId
            }
            queryListOfOilfieldQueryPlatformsDetail({ogfId: '3FC9A818F5BC43B88270DB80BBB3018F'}).then(res => {
                this.platforms = res.data.data
            })
            queryPlatformQueryWellListDetail({ogfId: '3FC9A818F5BC43B88270DB80BBB3018F'}).then((res) => {
                this.wells = res.data.data
            })
            this.queryParams.asseCode = ''
            this.queryParams.wellId = ''
            this.queryParams.measureTypeCode = ''
            this.retrieval()
        },
        changepage() {
            this.retrieval()
        },

    },
};
</script>
<style lang="less" scoped>
.app-container {
    height: 100%;

    .el-table {
        overflow: scroll;
    }
}

.el-tree {
    max-height: 370px;
    overflow: scroll;
}

.pertable thead .el-table-column--selection .cell {
    display: none;
}
</style>
