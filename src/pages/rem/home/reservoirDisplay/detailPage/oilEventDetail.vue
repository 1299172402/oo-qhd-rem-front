<template>
    <div class="app-container" style="height: 100%">
        <header-search>
            <el-form style="margin: 20px 0" :inline="true">
                <el-form-item label="油田：">
                    <el-select v-model="queryData.ogfId" disabled>
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
                        <el-option v-for="item in platforms" :key="item.id" :label="item.platformName" :value="item.platformId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="井号：">
                    <el-select v-model="queryData.wellId">
                        <el-option v-for="item in wells" :key="item.id" :label="item.wellName" :value="item.wellId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期：">
                    <el-date-picker
                        v-model="queryData.selectDate"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        :disabled="activeEchart"
                    />
                </el-form-item>
                <el-form-item label="大事类型：">
                    <el-select v-model="queryData.event">
                        <el-option v-for="item in events" :key="item.id" :label="item.wellName" :value="item.wellId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-button type="primary" @click="queryserch()" icon="el-icon-search">搜索</el-button>
                <el-button type="primary" @click="refresh()" icon="el-icon-refresh">重置</el-button>
                <el-button style="float: right" type="primary" @click="goBack()">返回</el-button>
            </el-form>
        </header-search>
        <page-panel header-title="秦皇岛32-6油田单井大事记录表" style="height: calc(100% - 145px)" :show-btn="true">
            <el-table
                :data="noticeList"
                @current-change="handleCurrentChange"
                highlight-current-row
                height="calc(100% - 30px)"
                style="margin-top: 10px"
                :row-style="{ height: '0px' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px' }"
                header-cell-class-name="table_header"
                :cell-style="{ 'text-align': 'center', padding: '2px' }"
                :default-sort="{ prop: 'date', order: 'descending' }"
            >
                <el-table-column label="序号" fixed min-width="40px" prop="ogfName" align="center">
                    <template slot-scope="scope">
                        {{ scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column label="井号" fixed min-width="130px" prop="ogfName" align="center"></el-table-column>
                <el-table-column label="大事类型代码"  min-width="130px" prop="ogfName" align="center"></el-table-column>
                <el-table-column label="开始时间"  min-width="130px" prop="ogfName" align="center"></el-table-column>
                <el-table-column label="结束时间"  min-width="130px" prop="ogfName" align="center"></el-table-column>
                <el-table-column label="大事简要"  min-width="300px" prop="ogfName" align="center"></el-table-column>
                <el-table-column label="备注"  min-width="130px" prop="ogfName" align="center"></el-table-column>
            </el-table>
        </page-panel>
    </div>
</template>

<script>
    import {
        queryOperatingCompanyDetail,
        queryOperatorsCheckFieldListsDetail,
        queryListOfOilfieldQueryPlatformsDetail,
        queryPlatformQueryWellListDetail,
        queryOilAndGasFieldQueryPositionDetail
    } from "@/api/basic/master";
    export default {
        data(){
            return {
                queryData: {
                    ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
                    wellId: "",
                    platformId: "",
                    selectDate:'',
                    event:''
                },
                oilFields:[],
                platforms: [],
                wells: [],
                events:[]
            }
        },
        mounted() {
            this.getList();
            this.getWellData();
        },
        methods:{
            goBack(){
                this.$router.push({name:'reservoirDisplay'})
            },
            getList() {
                //根据作业公司查询油田
                queryOperatorsCheckFieldListsDetail({orgId: this.queryData.orgId}).then(res => {
                    this.oilFields = res.data.data
                })
                //根据油田查询平台列表
                queryListOfOilfieldQueryPlatformsDetail({ogfId: this.queryData.ogfId}).then(res => {
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
            }
        }
    }
</script>

<style scoped lang="less"></style>