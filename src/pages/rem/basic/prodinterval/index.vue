<template>
    <div style="width: 100%; height: 100%" class="pageBox">
        <div class="titleStyle">
            生产段维护
        </div>
        <header-search>
            <el-form style="margin-top: 20px" :inline="true">
                <el-form-item label="油田：">
                    <el-select
                        v-model="queryData.ogfId"
                        style="width: 180px"
                        @change="queryBlockFeild1">
                        <el-option
                            v-for="item in oilList"
                            :key="item.ogfId"
                            :label="item.ogfName"
                            :value="{ value: item.ogfId, label: item.ogfName }"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="区块：">
                    <el-select v-model="queryData.blockId" @change="queryWellData1" >
                        <el-option
                            v-for="item in blockList"
                            :key="item.blockId"
                            :label="item.reservoirAnalyseUnitName"
                            :value="{ value: item.reservoirAnalyseUnitId, label: item.reservoirAnalyseUnitName }"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="井别：">
                    <el-select v-model="queryData.wellCategory" filterable style="width: 100px" @change="queryWellData1">
                        <el-option
                            v-for="item in wellCategoryList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="井号：">
                    <el-select
                        v-model="queryData.wellId"
                        class="collapseTags"
                        clearable
                        @change="getDataInfo">
                        <el-option
                            v-for="item in wellList"
                            :key="item.wellId"
                            :label="item.wellName"
                            :value="item.wellId"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
        </header-search>
        <page-panel-new header-title="油井生产段维护列表" class="g-w100" style="height:580px">
            <el-row class="mbBottom">
                <el-col class="height-placeholder" :span="20">
<!--                    <el-button type="primary" @click="showAddDialog">-->
<!--                        新增-->
<!--                    </el-button>-->
                    <el-button type="primary" @click="showAddDialogPI">
                        新增生产段
                    </el-button>
                </el-col>
            </el-row>
         
            <el-table
                height="calc(100% - 113px)"
                :row-style="{ height: '0px' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
                header-cell-class-name="table_header"
                :cell-style="cellStyle"
                :data="Data"
                style="width: 100%; height: 100%"
                :default-sort="{ prop: 'date', order: 'descending' }"
            >
                <el-table-column prop="wellName" label="井名" min-width="150"/>
                <el-table-column prop="prodInterName" label="生产段" width="150" />
                <el-table-column prop="layerName" label="层位名称" min-width="150"/>
                
                
                <el-table-column label="操作" width="400">
                    <template slot-scope="scope">
                        <el-button type="text" @click="showDialog(scope.row,'up')">
                            编辑
                        </el-button>
                        <el-button type="text" style="color: #f56c6c" @click="deleteData(scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog
                :title=this.dialogtitle
                :visible.sync="dialogVisible"
                width="30%"
                :close-on-click-modal="false">
                <div style="margin-top: 10px;">
                    井名
                    <span class="idstyle" >{{this.editdialogWellName}}</span>
                </div>
                <div style="margin-top: 10px;">
                    生产段
                    <span class="idstyle" style="margin-left: 45px">{{this.editdialogPiName}}</span>
                </div>
                <div style="margin-top: 10px;">
                    <div>生产段顶深
                        <el-input class="inputPi" type="number" v-model="inputEditPItop" :placeholder="minputEditPItop" style="margin-left: 10px">

                        </el-input>
                        
                    </div>
                    <div>生产段底深
                        <el-input class="inputPi" type="number" v-model="inputEditPIbottom" :placeholder="minputEditPIbottom" style="margin-left: 10px">

                        </el-input>

                    </div>
                    
                </div>
                <div style="margin-top: 10px;">
                    层位名称
                    <span style="margin-left: 25px;"><el-select v-model="lnselect" class="f2" style="width:220px" filterable clearable>
                  <el-option v-for="item in LNData" :key="item.layerId" :label="item.layerName" :value="item.layerId" :disabled="item.disabled">
                  </el-option>
              </el-select></span>
                </div>
                
                <span slot="footer" class="dialog-footer">
                    <el-button class="cancelBtn" @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" class="buttonActive_primary" @click="sureInfo">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                :title=this.dialogtitleAddPI
                :visible.sync="dialogVisiblePI"
                width="30%"
                :close-on-click-modal="false">
                <div style="margin-top: 10px;" v-show="ifeditwellName">
                    井名
                    <span style="margin-left: 68px;"><el-select v-model="queryData.wellId" class="f2" style="width:220px;margin-left:15px " filterable clearable @change="choseWell">
                  <el-option v-for="item in wellList" :key="item.wellId" :label="item.wellName" :value="item.wellId" :disabled="item.disabled">
                  </el-option>
                 </el-select></span>
                </div>
                <div style="margin-top: 10px;">
                    生产段
                    <span style="margin-left: 68px;"><el-select v-model="piselectPI" class="f2" style="width:220px" filterable clearable>
                  <el-option v-for="item in PIDataNew" :key="item.lable" :label="item.lable" :value="item.lable" :disabled="item.disabled">
                  </el-option>
                 </el-select></span>
                </div>
                <div style="margin-top: 10px;">
                    生产段顶深
                    <span style="margin-left: 40px;">
                        <el-input class="inputPi" type="number" v-model="inputPItop" placeholder="请输入生产段顶深">
                            
                        </el-input>
                    </span>
                </div>
                <div style="margin-top: 10px;">
                    生产段底深
                    <span style="margin-left: 40px;">
                        <el-input class="inputPi" type="number" v-model="inputPIbottom" placeholder="请输入生产段底深">
                            
                        </el-input>
                    </span>
                </div>
                <div style="margin-top: 10px;">
                    层位名称
                    <span style="margin-left: 53px;"><el-select v-model="lnselect" class="f2" style="width:220px" filterable clearable >
                  <el-option v-for="item in LNData" :key="item.layerId" :label="item.layerName" :value="item.layerId" :disabled="item.disabled">
                  </el-option>
              </el-select></span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="cancelBtn" @click="dialogVisiblePI = false">取 消</el-button>
                    <el-button type="primary" class="buttonActive_primary" @click="sureInfoPI">确 定</el-button>
                </span>
            </el-dialog>
<!--            <pagination-->
<!--                v-show="total > 0"-->
<!--                :total="total"-->
<!--                :page.sync="queryParams.pageNum"-->
<!--                :limit.sync="queryParams.pageSize"-->
<!--            />-->
            <!-- <el-pagination background layout="prev, pager, next,total" :total="1000" class="paginationDiv"> </el-pagination> -->
        </page-panel-new>
    </div>
</template>
<script>
import {queryPioilWellInfo,queryLnInfo,queryPiInfo,addDataPiInfo,upDataPiInfo,deleteDataPiInfo,addPINew,queryPIcomInfo} from "@/api/rem/pioilwellmaintain.js";
import {
    getProductionSplit,
} from "@/api/rem/r-intelligentIPA.js";
import {getuserListByUserNames,getFieldListsDetail,getblockData,getWellDataforme} from "@/api/basic/masterBycoderXu.js"

let timeNew = new Date();
timeNew.setMonth(timeNew.getMonth() - 1);
timeNew.setDate(1)
let lastDay = new Date(timeNew.getFullYear(), timeNew.getMonth() + 1, 0);
let stopTime = new Date('2000-1-1')
let filterTime = new Date();
export default {
    name:"ProdIntervalMaintain",
    data() {
        return {
            minputEditPItop:'',
            minputEditPIbottom:'',
            inputEditPItop:'',
            inputEditPIbottom:'',
            inputPItop:'',
            inputPIbottom:'',
            wellList: [],
            wellnameSelect:'',
            ifshow:false,
            queryData: {
                ogfId: {
                    value: "3FC9A818F5BC43B88270DB80BBB3018F",
                    label: "秦皇岛32-6",
                }, //油田
                blockId: {
                    // value: "6CD7342CA6DD418183A4B3BC38584F7C",
                    value: "YCFXDY8B643EDC9007F96F570600457D",
                    label: "秦皇岛32-6南区",
                }, //区块
                wellCategory: "01", //井别
                wellId: "", //井号
                value: [timeNew.format('YYYY-MM-DD'), lastDay.format('YYYY-MM-DD')],
                // ['2022-10-24', '2022-11-24']
                startTime: '',
                wellName:'',
                endTime: ''
            },
            //油田下拉框
            oilList: [],
            ifeditwellNameY:false,
            datePickOptions: {
                disabledDate: (time) => {
                    if (time.getTime() > filterTime.getTime()) {
                        return true;
                    } else if (time.getTime() < stopTime.getTime()) {
                        return true;
                    } else {
                        return false;
                    }
                },
            },
            //区块下拉
            blockList: [],
            editdialogWellName:'',
            editdialogPiName:'',
            //井别下拉
            wellCategoryList: [
                {id: "01", name: "油井"},
                {id: "02", name: "水井"},
            ],
            ifeditwellName:true,
            
            //井号下拉
            

            //已完成条数
            finishNum: 0,
            addwellName:'1212',
            dialogtitle:'',
            dialogtitleAddPI:'新增生产段',
            dialogVisiblePI:false,
            PIData:[],
            PIDataNew:[
                {lable:'P1'},
                {lable:'P2'},
                {lable:'P3'},
                {lable:'P4'},
                {lable:'P5'},
                {lable:'P6'},
                {lable:'P7'},
                {lable:'P8'},
                {lable:'P9'}
            ],
            LNData:[],
            date1: "",
            dialogVisible: false,
            //油井条件
            wellData: [],
            wellId: "",
            wellName:"", //选中项
            ytData: [],
            //区块筛选条件
            blocks:[],
            selectBlock:'',
            //平台筛选条件
            ptData: [],
            platform: "", //选中项
            piselect:"",
            piselectPI:"",
            lnselect:"",
            paramMap: {},
            ocselect:"",
            ocData:["打开","关闭"],
            selYtdm: "",
            // 总条数
            total: 10,
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                wellId: "",
                roleName: undefined,
                roleKey: undefined,
                status: undefined
            },
            input: "",
            value: "",
            options: [
                {
                    value: "选项1",
                    label: "正常"
                },
                {
                    value: "选项2",
                    label: "停用"
                }
            ],
            tableData: [
                {
                    roleName: "管理员",
                    permissions: "admin",
                    roleSort: "1",
                    assigningUser: "查看（1）",
                    status: "正常",
                    date: "2016-05-04 12:21"
                },
                {
                    roleName: "组织机构",
                    permissions: "common",
                    roleSort: "2",
                    assigningUser: "查看（12）",
                    status: "正常",
                    date: "2013-03-12 05:11"
                },
                {
                    roleName: "其余角色",
                    permissions: "common",
                    roleSort: "2",
                    assigningUser: "查看（10）",
                    status: "停用",
                    date: "2022-12-04 01:45"
                },
                {
                    roleName: "管理员",
                    permissions: "admin",
                    roleSort: "1",
                    assigningUser: "查看（1）",
                    status: "正常",
                    date: "2016-05-04 12:21"
                },
                {
                    roleName: "其余角色",
                    permissions: "common",
                    roleSort: "2",
                    assigningUser: "查看（10）",
                    status: "停用",
                    date: "2022-12-04 01:45"
                },
                {
                    roleName: "其余角色",
                    permissions: "common",
                    roleSort: "2",
                    assigningUser: "查看（10）",
                    status: "停用",
                    date: "2022-12-04 01:45"
                },
                {
                    roleName: "管理员",
                    permissions: "admin",
                    roleSort: "1",
                    assigningUser: "查看（1）",
                    status: "正常",
                    date: "2016-05-04 12:21"
                },
                {
                    roleName: "组织机构",
                    permissions: "common",
                    roleSort: "2",
                    assigningUser: "查看（12）",
                    status: "正常",
                    date: "2013-03-12 05:11"
                },
                {
                    roleName: "其余角色",
                    permissions: "common",
                    roleSort: "2",
                    assigningUser: "查看（10）",
                    status: "停用",
                    date: "2022-12-04 01:45"
                },
                {
                    roleName: "管理员",
                    permissions: "admin",
                    roleSort: "1",
                    assigningUser: "查看（1）",
                    status: "正常",
                    date: "2016-05-04 12:21"
                },
                {
                    roleName: "管理员",
                    permissions: "admin",
                    roleSort: "1",
                    assigningUser: "查看（1）",
                    status: "正常",
                    date: "2016-05-04 12:21"
                },
                {
                    roleName: "管理员",
                    permissions: "admin",
                    roleSort: "1",
                    assigningUser: "查看（1）",
                    status: "正常",
                    date: "2016-05-04 12:21"
                },
                {
                    roleName: "管理员",
                    permissions: "admin",
                    roleSort: "1",
                    assigningUser: "查看（1）",
                    status: "正常",
                    date: "2016-05-04 12:21"
                },
                {
                    roleName: "管理员",
                    permissions: "admin",
                    roleSort: "1",
                    assigningUser: "查看（1）",
                    status: "正常",
                    date: "2016-05-04 12:21"
                },
                {
                    roleName: "管理员",
                    permissions: "admin",
                    roleSort: "1",
                    assigningUser: "查看（1）",
                    status: "正常",
                    date: "2016-05-04 12:21"
                },
                {
                    roleName: "管理员",
                    permissions: "admin",
                    roleSort: "1",
                    assigningUser: "查看（1）",
                    status: "正常",
                    date: "2016-05-04 12:21"
                },
                {
                    roleName: "管理员",
                    permissions: "admin",
                    roleSort: "1",
                    assigningUser: "查看（1）",
                    status: "正常",
                    date: "2016-05-04 12:21"
                },
                {
                    roleName: "管理员",
                    permissions: "admin",
                    roleSort: "1",
                    assigningUser: "查看（1）",
                    status: "正常",
                    date: "2016-05-04 12:21"
                },
                {
                    roleName: "管理员",
                    permissions: "admin",
                    roleSort: "1",
                    assigningUser: "查看（1）",
                    status: "正常",
                    date: "2016-05-04 12:21"
                },
                {
                    roleName: "管理员",
                    permissions: "admin",
                    roleSort: "1",
                    assigningUser: "查看（1）",
                    status: "正常",
                    date: "2016-05-04 12:21"
                }
            ],
            Data:[
                {
                    wellName: "1",
                    layerName:"1",
                    prodInterName: "1",
                },
            ],
            DialogData:{
                piId:"000",
                wellName: "1",
                wellId:"",
                layerName:"1",
                prIntervalname: "1",
                openOrClose: "1",
                startDate: "2023-06-21"
            },

        };
    },
    methods: {
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
                        this.queryData.ogfId.value=list[i].ogfId
                    }else {
                        this.queryData.ogfId.value=list[0].ogfId
                    }
                }
                this.queryBlockFeild()
            });
        },
        resettingQuery(){
            this.queryData.wellId = [""];
            this.queryData.wellCategory = '01'
            this.queryData.blockId = {
                value: "6CD7342CA6DD418183A4B3BC38584F7C",
                label: "秦皇岛32-6南区",
            },
                this.queryData.value = [timeNew.format('YYYY-MM-DD'), lastDay.format('YYYY-MM-DD')]
            this.doSearch()
        },
        queryProductionSplit() {
            let params = {
                endTime: this.queryData.endTime,
                startTime: this.queryData.startTime,
                wellIdList: this.queryData.wellId.join(','),
                wellType: this.queryData.wellCategory,
                blockId: this.queryData.blockId.value,
            };
            if (this.queryData.wellId.length == 0 || this.queryData.value.length == 0) {
                this.tableData = []
                this.$message.error("井号或时间未选择")
                return
            }
            getProductionSplit(params).then((res) => {
                res.forEach((item) => {
                    item.name = item.wellNo;
                    item.id = item.wellId;
                    item.airPermeability = Math.floor(item.airPermeability)
                    item.oilSplitData = Math.floor(item.oilSplitData)
                    // item.waterSplitData = item.waterSplitData * 100;
                    item.oilRatio = Number(item.oilRatio).toFixed(1)
                    item.waterRatio = Number(item.waterRatio).toFixed(1)
                    item.thicknessEffe = Number(item.thicknessEffe).toFixed(1)
                    if (item.intervaData) {
                        item.children = item.intervaData;
                        item.intervaData.forEach((inter) => {
                            inter.name = inter.intervNo;
                            inter.id = inter.intervId;
                            inter.airPermeability = Math.floor(inter.airPermeability)
                            inter.oilSplitData = Math.floor(inter.oilSplitData)
                            inter.thicknessEffe = Number(inter.thicknessEffe).toFixed(1)
                            inter.oilRatio = Number(inter.oilRatio).toFixed(1)
                            // inter.waterSplitData = inter.waterSplitData * 100
                            inter.waterRatio = Number(inter.waterRatio).toFixed(1)
                            if (inter.layerData && inter.layerData.length > 0) {
                                inter.layerData.map((layer) => {
                                    layer.name = layer.layerNo;
                                    layer.id = layer.layerId;
                                    layer.airPermeability = Math.floor(layer.airPermeability)
                                    layer.oilSplitData = Math.floor(layer.oilSplitData)
                                    layer.thicknessEffe = Number(layer.thicknessEffe).toFixed(1)
                                    layer.oilRatio = Number(layer.oilRatio).toFixed(1)
                                    // layer.waterSplitData = layer.waterSplitData * 100
                                    layer.waterRatio = Number(layer.waterRatio).toFixed(1)
                                    return layer;
                                });
                                inter.children = inter.layerData;
                            }
                        })
                    }
                });
                this.tableData = res;
            });
        },
        doSearch() {
            this.queryProductionSplit();
        },
        // changeWell() {
        //     if (this.queryData.blockId) {
        //         this.queryData.wellId = []
        //         this.tableData = []
        //         this.queryWellData();
        //
        //     }
        // },
        queryWellData1() {
            let params = {
                blockId: this.queryData.blockId.value,
                wellType: this.queryData.wellCategory,
                ogfId: this.queryData.ogfId.value
            };
            getWellDataforme(params).then((res) => {
                this.wellList = res.data.data;
                this.getDataInfo(this.wellList)
            });
        },
        queryWellData() {
            let params = {
                blockId: this.queryData.blockId.value,
                wellType: this.queryData.wellCategory,
                ogfId: this.queryData.ogfId.value
            };
            getWellDataforme(params).then((res) => {
                this.wellList = res.data.data;
                this.getDataInfo(this.wellList)
            });
        },
        // changeBlock(e) {
        //     console.log(e)
        //     this.queryData.wellId = [];
        //     if (this.queryData.wellCategory) {
        //         this.queryWellData();
        //     }
        // },
        queryBlockFeild1() {
            getblockData({ogfId:this.queryData.ogfId.value}).then((res) => {
                this.blockList = res.data.data;
                if(this.blockList.length===0){
                    this.queryData='无数据'
                }
                for(var i=0;i<this.blockList.length;i++){
                    if(this.blockList[i].reservoirAnalyseUnitId=="83D33B89B0DAB7DFA440BD060746883A"){
                        this.queryData.blockId.value=this.blockList[i].reservoirAnalyseUnitId
                    }
                }
            });
        },
        queryBlockFeild() {
            getblockData({ogfId:this.queryData.ogfId.value}).then((res) => {
               
                this.blockList = res.data.data;
                if(this.blockList.length===0){
                    this.queryData='无数据'
                }
                for(var i=0;i<this.blockList.length;i++){
                    if(this.blockList[i].reservoirAnalyseUnitId=="83D33B89B0DAB7DFA440BD060746883A"){
                        this.queryData.blockId.value=this.blockList[i].reservoirAnalyseUnitId
                    }
                }
                this.queryWellData();
            });
        },
        changeOil() {
            // this.queryData.blockId = "";
            this.queryData.wellId = [];
            this.queryBlockFeild();
        },
        cellStyle(row,column,rowIndex,columnIndex){
            if(row.row.iftrue==true){
                return 'color:red;padding:3px;text-align:center;color:green'
            }else{
                return 'color:red;padding:3px;text-align:center;color:red'
            }
        },
        deleteData(row){
            console.log(row)
            this.DialogData.piId=row.piId
            deleteDataPiInfo(this.DialogData).then((res) => {

                this.getDataInfo(res.data.msg)

            });

        },
        sureInfoPI(){
            console.log(this.queryData.wellId)
            console.log(this.piselectPI)
            console.log(this.inputPItop)
            console.log(this.inputPIbottom)
            console.log(this.wellList.length)
            var mwellname=''
            for(var i=0;i<this.wellList.length;i++){
                if(this.wellList[i].wellId==this.queryData.wellId){
                    mwellname=this.wellList[i].wellName
                }
            }
            var mlayerName=''
            var mlayerCode=''
            for(var i=0;i<this.LNData.length;i++){
                if(this.LNData[i].layerId==this.lnselect){
                    mlayerName=this.LNData[i].layerName
                    mlayerCode=this.LNData[i].layerCode
                }
            }
            const params={
                wellId:this.queryData.wellId,
                piselectPI:this.piselectPI,
                inputPItop:this.inputPItop,
                inputPIbottom:this.inputPIbottom,
                wellName:mwellname,
                layerName:mlayerName,
                layerId:this.lnselect,
                layerCode:mlayerCode
            }
            addPINew(params).then((res) => {
                console.log(res)
                this.dialogVisiblePI = false

            });
        },
        sureInfo(){
            if(this.dialogtitle=='新增'){
                const date = new Date(this.date1);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const formattedDate = `${year}-${month}-${day}`;
                this.DialogData.startDate=formattedDate
                addDataPiInfo(this.DialogData).then((res) => {
                    this.dialogVisible = false
                    this.getDataInfo(res.data.msg)

                });
            }else{
                const date = new Date(this.date1);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const formattedDate = `${year}-${month}-${day}`;
                this.DialogData.startDate=formattedDate
                upDataPiInfo(this.DialogData).then((res) => {
                    this.dialogVisible = false
                    this.getDataInfo(res.data.msg)
                });
            }

        },

        showAddDialog(){
            
            if(this.queryData.wellId===null||this.queryData.wellId===''){
                console.log('1111')
                this.showDialog('','add')
            }else {
                console.log('22222')
                console.log(this.queryData.wellId)
                this.showDialog(this.queryData.wellId,'add')
            }
           

        },
        showAddDialogPI(){
            this.dialogtitleAddPI='新增生产段'
            this.dialogVisiblePI = true
            this.ifeditwellNameY=false
            this.ifeditwellName=true
            this.getLNData()
        },
        choseLN(){
            this.getLNData()

        },
        chosePI(){
            
            this.getPIData()

        },
        choseWell(){
            this.DialogData.wellId=this.wellnameSelect

        },
        choseOc(){
            this.DialogData.openOrClose=this.ocselect

        },
        upInfo(){
            this.dialogVisible = false

            console.log(this.DialogData)

        },
        getPIData(){
            var wellName=''
            for(var i=0;i<this.wellList.length;i++){
                if(this.wellList[i].wellId==this.queryData.wellId){
                    wellName=this.wellList[i].wellName
                }
            }
            const params={
                wellId:this.queryData.wellId,
                wellName:wellName
            }
            queryPiInfo(params).then((res) => {
                console.log(res.data.data.data)
                this.PIData=res.data.data.data
            });
        },
        getLNData(){
            const params={
                ogfId:this.queryData.ogfId.value
            }
            queryLnInfo(params).then((res) => {
                console.log(res.data.data)
                this.LNData=res.data.data.data
            });
        },
        showDialog(row,whatshow){
            console.log('11118888')
            console.log(row)
            console.log(whatshow)
            
            if(whatshow=='up'){
                this.dialogtitle='编辑'
                this.editdialogWellName=row.wellName
                this.editdialogPiName=row.prodInterName
                this.dialogVisible = true
                this.ifeditwellNameY=true
                this.ifeditwellName=false
                var mpiId=row.prodInterId
                const params={
                    piId:mpiId
                }
                queryPIcomInfo(params).then((res) => {
                    // this.minputEditPItop=res.data.data.data
                    // minputEditPIbottom:'',
                    var result=res.data.data.data
                    this.minputEditPItop=result[0].top
                    this.minputEditPIbottom=result[0].bottom
                });
                this.getLNData()
            }


        },
        getDataInfo(wellParams) {
            
            if(Array.isArray(wellParams)){
                let wellIdrry=[""];
                for(let i=0;i<wellParams.length;i++){
                    wellIdrry[i]='"'+wellParams[i].wellId+'"'
                }
                const params={
                    wellList:wellIdrry
                }
                queryPioilWellInfo(params).then((res) => {
                    this.Data=res.data.data.data
                    // this.addwellName=this.Data[0].wellName
                });
            }else{
                let wellIdrry=[""];
                console.log('898989891111')
                console.log(wellParams)
                wellIdrry[0]='"'+this.queryData.wellId+'"'
                const params={
                    wellList:wellIdrry
                }
                queryPioilWellInfo(params).then((res) => {

                    this.Data=res.data.data.data
                    // this.addwellName=this.Data[0].wellName
                });
            } 
            
        },
    },
    created(){
        this.getuserListByUserNamesData();
        // this.queryOilFeild();
        // this.queryBlockFeild();
        // this.queryWellData();
        // this.queryProductionSplit()
    },
    mounted() {

    }

}

</script>
<style scoped>
.idstyle{
    margin-left: 60px;
}
.inputPi{
    width: 220px;
}
.titleStyle{
    color: #fff;
    position: relative;
    text-align: center;
    font-weight: bold;
    font-size: 25px;
}
.pageBox {
    color: var(--form-text);
    position: relative;
    font-family: PingFangSC-Regular, "PingFang SC";
}

.topSearchDiv {
    display: flex;
}

.btnPosition {
    margin: 0 0 20px;
    justify-content: flex-start;
}
</style>