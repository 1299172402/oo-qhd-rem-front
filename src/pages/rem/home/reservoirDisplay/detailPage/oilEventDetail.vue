<template>
    <div class="app-container" style="height: 100%">
        <header-search>
            <el-form style="margin: 20px 0" :inline="true">
                <el-form-item label="油田：">
                    <el-select v-model="queryData.ogfId" @change="choicepla" >
                        <el-option
                            v-for="(item, index) in oilFields"
                            :key="index"
                            :label="item.ogfName"
                            :value="item.ogfId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="平台：">
                    <el-select v-model="queryData.platformId" @change="onPlatfromChange">
                        <el-option v-for="item in platforms" :key="item.platformId" :label="item.platformName" :value="item.platformId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="井号：">
                    <el-select v-model="queryData.wellId">
                        <el-option v-for="item in wells" :key="item.id" :label="item.wellName" :value="item.wellId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期选择：">
                    <el-date-picker
                        v-model="queryData.selectDate"
                        type="daterange"
                        style="width: 300px"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                    />
                </el-form-item>
                <el-form-item label="大事类型：">
                    <el-select v-model="queryData.event">
                        <el-option v-for="item in events" :key="item.id" :label="item.name" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-button type="primary" @click="queryserch()" icon="el-icon-search">搜索</el-button>
                <el-button type="primary" @click="refresh()" icon="el-icon-refresh">重置</el-button>
                <el-button style="float: right" type="primary" @click="goBack()">返回</el-button>
            </el-form>
        </header-search>
        <page-panel :header-title=title style="height: calc(100% - 145px)" :show-btn="true">
            <el-table
                :data="tableData.slice((queryData.page - 1) * queryData.pageSize, queryData.page * queryData.pageSize)"
                highlight-current-row
                height="calc(100% - 50px)"
                style="margin-top: 10px"
                :row-style="{ height: '0px' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px' }"
                header-cell-class-name="table_header"
                :cell-style="{ 'text-align': 'center', padding: '2px' }"
                :default-sort="{ prop: 'date', order: 'descending' }"
            >
                <el-table-column label="序号" min-width="40px" prop="ogfName" align="center">
                    <template slot-scope="scope">
                        {{ scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column label="井号" min-width="130px" prop="wellNo" align="center"></el-table-column>
                <el-table-column label="大事类型"  min-width="130px" prop="appendixValueName" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.appendixValueName !== null && scope.row.appendixValueName !== ''">{{scope.row.appendixValueName}}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column label="开始时间"  min-width="130px" prop="startTime" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.startTime !== null && scope.row.startTime !== ''">{{ scope.row.startTime?scope.row.startTime.split(' ')[0]:'' }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column label="结束时间"  min-width="130px" prop="endTime" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.endTime !== null && scope.row.endTime !== ''">{{ scope.row.endTime?scope.row.endTime.split(' ')[0]:'' }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column label="大事简要"  min-width="130px" prop="chronicle" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.chronicle !== null && scope.row.chronicle !== ''">{{scope.row.chronicle}}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column label="备注"  min-width="500px" show-overflow-tooltip prop="remark" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.remark !== null && scope.row.remark !== ''">{{scope.row.remark}}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
            </el-table>
            <pagination v-if="pageTotal" :pageSizes="[16, 50, 100]" :total="pageTotal" :page.sync="queryData.page" :limit.sync="queryData.pageSize" @pagination="pagination" />
        </page-panel>
    </div>
</template>

<script>
    import {
        queryOperatingCompanyDetail,
        queryOperatorsCheckFieldListsDetail,
        queryListOfOilfieldQueryPlatformsDetail,
        queryPlatformQueryWellListDetail,
        queryOilAndGasFieldQueryPositionDetail,
        userListByUserNames
    } from "@/api/basic/master";
    import {queryOilFieldIncident, queryOilFieldIncidentType} from "@/api/rem/reservoirbillboards";
    export default {
        name:'oilEventDetail',
        data(){
            return {
                pageTotal:'',
                queryData: {
                    ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
                    wellId: "",
                    platformId: "",
                    selectDate:'',
                    event:[],
                    page: 1,
                    pageSize: 16,
                    orgId:'715AD1CD60484BB59E737CD18A9DE44A',
                },
                oilFields:[],
                title:'秦皇岛32-6油田单井大事记录表',
                platforms: [],
                wells: [],
                events:[],
                tableData:[]
            }
        },
        mounted() {
            this.getList();
            this.getWellData();
            this.getData();
        },
        methods:{
            goBack(){
                this.$router.push({name:'Oilexhibition'})
            },
            async getList() {
                //根据作业公司查询油田 111222
                await queryOperatorsCheckFieldListsDetail({orgId: this.queryData.orgId}).then(res => {
                    this.oilFields = res.data.data
                    let params = {
                        searchKeys: [this.$store.getters["user/userDetail"].user.userName],
                    }
                    let orgId
                    userListByUserNames(params).then((res) => {
                        orgId = (res.data.data[0] && res.data.data[0]?.tenantInfos && res.data.data[0]?.tenantInfos[0]) ? res.data.data[0].tenantInfos[0]?.deptId : undefined;
                        if (orgId === '715AD1CD60484BB59E737CD18A9DE44A') {
                            this.queryData.ogfId= '3FC9A818F5BC43B88270DB80BBB3018F';
                        } else {
                            if (this.oilFields != null && this.oilFields.length > 0) {
                                this.queryData.ogfId = this.oilFields[0].ogfId;
                            }
                        }
                    })
                })
                //根据油田查询平台列表
                await queryListOfOilfieldQueryPlatformsDetail({ogfId: this.queryData.ogfId}).then(res => {
                    this.platforms = res.data.data
                })
                //查询事件类型
                await queryOilFieldIncidentType().then(res=>{
                    this.events = res.data.data.data
                })
            },
            choicepla(val){
                this.queryData.platformId = '';
                const oilname = (this.oilFields.find(obj =>  obj.ogfId == this.queryData.ogfId)).ogfName;
                this.title = oilname +'单井大事记录表'
                queryListOfOilfieldQueryPlatformsDetail({ogfId: val}).then(res => {
                    this.platforms = res.data.data
                })
            },
            getWellData() {
                queryPlatformQueryWellListDetail({ogfId:this.queryData.ogfId}).then((res) => {
                    this.wells = res.data.data
                })
            },
            onPlatfromChange(val){
                //根据平台获得井
                queryPlatformQueryWellListDetail({platformId:val}).then((res) => {
                    this.wells = res.data.data
                })
            },
            getData(){
                let params = {
                    ogfId:this.queryData.ogfId,
                    platformId:this.queryData.platformId,
                    wellId:this.queryData.wellId,
                    chronicleTypeCode:this.queryData.event,
                    startTime:this.queryData.selectDate?this.queryData.selectDate[0]:'',
                    endTime:this.queryData.selectDate?this.queryData.selectDate[1]:''
                }
                queryOilFieldIncident(params).then(res=>{
                    this.tableData = res.data.data.data
                    this.pageTotal = res.data.data.data.length
                })
            },
            //切换分页
            pagination(e) {
                this.queryData.page = e.page;
                this.queryData.pageSize = e.limit;
            },
            queryserch(){
                this.getData()
            },
           async refresh(){
                this.queryData = {
                    ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
                    wellId: "",
                    platformId: "",
                    selectDate:'',
                    event:[],
                    page: 1,
                    pageSize: 16,
                }
                await this.getList();
                let oilname = (this.oilFields.find(obj =>  obj.ogfId == this.queryData.ogfId)).ogfName;
                queryListOfOilfieldQueryPlatformsDetail({ogfId:this.queryData.ogfId}).then(res => {
                    this.platforms = res.data.data
                })
                queryPlatformQueryWellListDetail({ogfId:this.queryData.ogfId}).then((res) => {
                    this.wells = res.data.data
                })
                this.title = oilname +'单井大事记录表'
                this.getData()
            }
        }
    }
</script>

<style scoped lang="less"></style>