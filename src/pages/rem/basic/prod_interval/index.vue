<template>
    <div style="height:100%;">
        
            <header-search>
                <el-form style="margin-top: 20px" :inline="true">
                    <el-form-item label="油田：">
                        <el-select
                            v-model="selectOilField"
                            style="width: 180px"
                            @change="queryBlockFeild1"
                        >
                            <el-option
                                v-for="item in oilList"
                                :key="item.ogfId"
                                :label="item.ogfName"
                                :value="item.ogfId"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="区块：">
                        <el-select v-model="blockselect" @change="changeWell">
                            <el-option
                                v-for="item in blockList"
                                :key="item.reservoirAnalyseUnitId"
                                :label="item.reservoirAnalyseUnitName"
                                :value="item.reservoirAnalyseUnitId"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item label="井号：">
                        <el-select
                            v-model="queryData.wellId"
                            class="collapseTags"
                            collapse-tags
                            multiple
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in wellList"
                                :key="item.wellId"
                                :label="item.wellName"
                                :value="item.wellId"
                            />
                        </el-select>
                    </el-form-item>
<!--                    <el-form-item label="井别：">-->
<!--                        <el-select v-model="queryData.wellCategory" filterable @change="changeWell" style="width: 100px">-->
<!--                            <el-option-->
<!--                                v-for="item in wellCategoryList"-->
<!--                                :key="item.id"-->
<!--                                :label="item.name"-->
<!--                                :value="item.id"-->
<!--                            ></el-option>-->
<!--                        </el-select>-->
<!--                    </el-form-item>-->
                    <el-button
                        type="primary"
                        icon="el-icon-search"
                        style="margin-left: 20px"
                    >搜索
                    </el-button>
                </el-form>
            </header-search>
            <page-panel
                :show-btn="true"
                header-title="水井生产段信息"
                style="margin-top: 20px;height: calc(100% - 80px)">
                
                
            </page-panel>
        
    </div>

</template>

<script>
import {getuserListByUserNames,getFieldListsDetail,getblockData,getWellData} from "@/api/basic/masterBycoderXu.js"

export default {
    name: "OilWellMainTain",
    data(){
        return{
            selectOilField:'',
            blockselect:'',
            oilField: [],
            orgId:'',
            queryData: {
                orgId:'',
                ogfId: "",
                // blockId: '6CD7342CA6DD418183A4B3BC38584F7C',
                blockId: "",
                // '2022-10'
                // new Date().format("yyyy-MM")
            },
            oilList: [],
            blockList: [],
            wellList: []
        } 
    },
    created() {
        this.getuserListByUserNamesData();
    },
    methods:{
        getuserListByUserNamesData(){
            let params = {
                searchKeys:[this.$store.getters["user/userDetail"].user.userName],
            }
            getuserListByUserNames(params).then((res)=>{
                this.orgId=res.data.data[0].currentTenantBindOrgId
                this.queryOilFeild()
            })

        },
        queryOilFeild() {
            getFieldListsDetail({operationZoneId:this.orgId}).then((res) => {
                this.oilList = res.data.data;
                var list =res.data.data;
                for(var i=0;i<list.length;i++){
                    if(list[i].ogfId==='3FC9A818F5BC43B88270DB80BBB3018F'){
                        this.selectOilField=list[i].ogfId
                    }else {
                        this.selectOilField=list[0].ogfId
                    }
                }
                // this.selectOilField='3FC9A818F5BC43B88270DB80BBB3018F'
                this.queryBlockFeild()
            });
        },
        queryOilFeild1() {
            getFieldListsDetail({operationZoneId:this.orgId}).then((res) => {
                this.oilList = res.data.data;
                var list =res.data.data;
                this.selectOilField=list[0].ogfId
                // this.selectOilField='3FC9A818F5BC43B88270DB80BBB3018F'
                this.queryBlockFeild()
            });
        },
        changeOil() {
            // this.queryData.blockId = "";
            this.queryData.wellId = [];
            this.queryBlockFeild();
        },
        queryBlockFeild() {
            getblockData({ogfId:this.selectOilField}).then((res) => {
                this.blockList = res.data.data;
                if(this.blockList.length===0){
                    this.blockselect='无数据'
                }else {
                    this.blockselect='83D33B89B0DAB7DFA440BD060746883A'
                }
                
                this.queryWellData();
            });
        },
        queryBlockFeild1() {
            getblockData({ogfId:this.selectOilField}).then((res) => {
                this.blockList = res.data.data;
                if(this.blockList.length===0){
                    this.queryData='无数据'
                }
                this.blockselect=this.blockList[0].reservoirAnalyseUnitId
                for(var i=0;i<this.blockList.length;i++){
                    if(this.blockList[i].reservoirAnalyseUnitId=="83D33B89B0DAB7DFA440BD060746883A"){
                        this.blockselect=this.blockList[i].reservoirAnalyseUnitId
                    }else {
                        this.blockselect=this.blockList[0].reservoirAnalyseUnitId
                    }
                }
                this.queryWellData();
            });
        },
        queryWellData() {
            // let params = {
            //     blockId: this.queryData.blockId.value,
            //     apprndixId: this.queryData.wellCategory,
            // };
            var welltypeName='注水井';
            // if(this.queryData.wellCategory==="01"){
            //     welltypeName='采油井'
            // }else {
            //     welltypeName='注水井'
            // }
            getWellData({blockId:this.queryData.blockId,ogfId:this.queryData.ogfId,wellboreType:welltypeName,objectState:'生产'}).then((res) => {
                this.wellList=res.data.data
            });
        },
    }
}

</script>

<style scoped lang="scss">

</style>