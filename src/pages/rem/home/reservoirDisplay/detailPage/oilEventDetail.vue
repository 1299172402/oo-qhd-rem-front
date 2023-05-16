<template>
    <div class="app-container">
        <header-search>
            <el-form style="margin-top: 20px" :inline="true">
                <el-form-item label="油田">
                    <el-select v-model="queryData.ogfId" disabled>
                        <el-option
                            v-for="(item, index) in oilFields"
                            :key="index"
                            :label="item.ogfName"
                            :value="item.ogfId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="平台" prop="pt">
                    <el-select v-model="queryData.platformId" @change="onPlatfromChange">
                        <el-option v-for="item in platforms" :key="item.id" :label="item.platformName" :value="item.platformId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="井号">
                    <el-select v-model="queryData.wellId">
                        <el-option v-for="item in wells" :key="item.id" :label="item.wellName" :value="item.wellId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-button type="primary" @click="queryserch()" icon="el-icon-search">搜索</el-button>
                <el-button type="primary" @click="refresh()" icon="el-icon-refresh">重置</el-button>
                <el-button style="float: right" type="primary" @click="goBack()" icon="el-icon-refresh">返回</el-button>
            </el-form>
        </header-search>
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
                },
                oilFields:[],
                platforms: [],
                wells: [],
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
                //根据平台获得井
                queryPlatformQueryWellListDetail({ogfId:this.queryData.ogfId}).then((res) => {
                    this.wells = res.data.data
                })
            }
        }
    }
</script>

<style scoped lang="less"></style>