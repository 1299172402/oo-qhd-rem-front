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
                        disabled
                        style="width: 180px"
                        @change="changeOil">
                        <el-option
                            v-for="item in oilList"
                            :key="item.ogfId"
                            :label="item.ogfName"
                            :value="{ value: item.ogfId, label: item.ogfName }"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="区块：">
                    <el-select v-model="queryData.blockId" @change="changeBlock">
                        <el-option
                            v-for="item in blockList"
                            :key="item.blockId"
                            :label="item.blockName"
                            :value="{ value: item.blockId, label: item.blockName }"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="井别：">
                    <el-select v-model="queryData.wellCategory" filterable @change="changeWell" style="width: 100px">
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
                        v-model="wellName"
                        class="collapseTags"
                        clearable
                        @change="getDataInfo(wellName)">
                        <el-option
                            v-for="item in wellList"
                            :key="item.wellName"
                            :label="item.wellName"
                            :value="item.wellName"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
        </header-search>
        <page-panel-new header-title="油井生产段维护列表" class="g-w100" style="height:580px">
            <el-row class="mbBottom">
                <el-col class="height-placeholder" :span="20">
                    <el-button type="primary" @click="showAddDialog">
                        新增
                    </el-button>
                </el-col>
                <!-- <el-col :span="4" style="text-align: right">
                  <el-button
                    v-hasPermi="['system:logininfor:export']"
                    type="primary"
                  >
                    导出
                  </el-button>
                </el-col> -->
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
                <el-table-column type="index" label="序号" width="100" />
                <el-table-column prop="wellName" label="井名" min-width="150"/>
                <el-table-column prop="layerName" label="层位名称" v-if="this.ifshow" min-width="150"/>
                <el-table-column prop="prIntervalname" label="生产段" width="150" />
                <el-table-column prop="openOrClose" label="状态" width="100" />
                <el-table-column prop="startDate" label="日期" width="180" />
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
                    <span class="idstyle">{{this.DialogData.wellName}}</span>
                </div>
                <div style="margin-top: 10px;" v-if="this.ifshow">
                    层位名称
                    <span style="margin-left: 25px;"><el-select v-model="lnselect" class="f2" style="width:220px" filterable clearable @change="choseLN">
                  <el-option v-for="item in LNData" :key="item" :label="item" :value="item" :disabled="item.disabled">
                  </el-option>
              </el-select></span>
                </div>
                <div style="margin-top: 10px;">
                    生产段
                    <span style="margin-left: 25px;"><el-select v-model="piselect" class="f2" style="width:220px" filterable clearable @change="chosePI">
                  <el-option v-for="item in PIData" :key="item" :label="item" :value="item" :disabled="item.disabled">
                  </el-option>
              </el-select></span>
                </div>
                <div style="margin-top: 10px;">
                    开关状态
                    <span style="margin-left: 12px;margin-top: 20px;"><el-select v-model="ocselect" class="f2" style="width:220px" filterable clearable @change="choseOc">
                  <el-option v-for="item in ocData" :key="item" :label="item" :value="item" :disabled="item.disabled">
                  </el-option>
              </el-select></span>
                </div>
                <div style="margin-top: 10px;">
                    时间
                    <span class="idstyle"><el-date-picker
                        v-model="date1"
                        type="date"
                        placeholder="选择日期"
                        style="width: 400px"/></span>
                </div>
                <span slot="footer" class="dialog-footer">
        <el-button class="cancelBtn" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" class="buttonActive_primary" @click="sureInfo">确 定</el-button>
      </span>
            </el-dialog>
            <pagination
                v-show="total > 0"
                :total="total"
                :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize"
            />
            <!-- <el-pagination background layout="prev, pager, next,total" :total="1000" class="paginationDiv"> </el-pagination> -->
        </page-panel-new>
    </div>
</template>
<script>
import {queryPioilWellInfo,queryPiInfo,addDataPiInfo,upDataPiInfo,deleteDataPiInfo} from "@/api/rem/pioilwellmaintain.js";
import {
    getProductionSplit,
    getOgfInfo,
    getblockData,
    getWellData
} from "@/api/rem/r-intelligentIPA.js";
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
                wellId: ["DA0269628E74490ABDE198E7D1DBF3EA"], //井号
                value: [timeNew.format('YYYY-MM-DD'), lastDay.format('YYYY-MM-DD')],
                // ['2022-10-24', '2022-11-24']
                startTime: '',
                wellName:'',
                endTime: ''
            },
            //油田下拉框
            oilList: [],
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
            //井别下拉
            wellCategoryList: [
                {id: "01", name: "油井"},
                {id: "02", name: "水井"},
            ],
            //井号下拉
            wellList: [],

            //已完成条数
            finishNum: 0,
            addwellName:'1212',
            dialogtitle:'',
            PIData:[],
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
                    proid:"",
                    wellName: "1",
                    layerName:"1",
                    prIntervalname: "1",
                    openOrClose: "1",
                    startDate: "2023-06-21"
                },
            ],
            DialogData:{
                piId:"000",
                wellName: "1",
                layerName:"1",
                prIntervalname: "1",
                openOrClose: "1",
                startDate: "2023-06-21"
            },

        };
    },
    methods: {
        queryOilFeild() {
            getOgfInfo().then((res) => {
                this.oilList = res.ogfId;
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
        changeWell() {
            if (this.queryData.blockId) {
                this.queryData.wellId = []
                this.tableData = []
                this.queryWellData();

            }
        },
        queryWellData() {
            let params = {
                blockId: this.queryData.blockId.value,
                apprndixId: this.queryData.wellCategory,
            };
            getWellData(params).then((res) => {
                this.wellList = res.wellList;
                this.wellName=this.wellList[0].wellName
                console.log(res.wellList[0].wellName)
                this.getDataInfo(this.wellName)
            });
        },
        changeBlock(e) {
            console.log(e)
            this.queryData.wellId = [];
            if (this.queryData.wellCategory) {
                this.queryWellData();
            }
        },
        queryBlockFeild() {
            let param = {
                ogfId: this.queryData.ogfId.value,
            };
            getblockData(param).then((res) => {
                console.log("看数据")
                console.log(res.blockList)
                this.blockList = res.blockList;
            });
        },
        changeOil() {
            // this.queryData.blockId = "";
            this.queryData.wellId = [];
            this.queryBlockFeild();
        },
        cellStyle(row,column,rowIndex,columnIndex){
            console.log('kkqqkkaa')
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
            console.log(this.Data[0].wellName)
            this.showDialog(this.Data[0].wellName,'add')

        },
        choseLN(){
            this.DialogData.layerName=this.lnselect

        },
        chosePI(){
            this.DialogData.prIntervalname=this.piselect

        },
        choseOc(){
            this.DialogData.openOrClose=this.ocselect

        },
        upInfo(){
            this.dialogVisible = false

            console.log(this.DialogData)

        },
        getPIData(){
            queryPiInfo().then((res) => {
                console.log(res.data.data)
                this.PIData=res.data.data
            });
        },
        getLNData(){
            const param={
                wellName:this.DialogData.wellName
            }
            queryLnInfo(param).then((res) => {
                console.log(res.data.data)
                this.LNData=res.data.data
            });
        },
        showDialog(row,whatshow){
            if(whatshow=='up'){
                this.dialogtitle='编辑'
                this.dialogVisible = true
                this.DialogData.piId=row.piId
                this.DialogData.wellName=row.wellName
                console.log("wwwqqqeee")
                console.log(row)

            }else{
                this.dialogtitle='新增'
                this.dialogVisible = true
                this.DialogData.wellName=row
            }


        },
        getDataInfo(wellName) {
            if(this.queryData.wellCategory=='01'){
                this.ifshow=false
            }else{
                this.ifshow=true
            }
            this.queryParams.wellName=wellName
            queryPioilWellInfo(this.queryParams).then((res) => {
                this.Data=res.data.data
                this.addwellName=this.Data[0].wellName
            });
        },
    },
    created(){
        const params = JSON.parse(localStorage.getItem('PRODUCTION_SPLIT'))
        if (params && params.blockId) {
            console.log('1111111222222')
            this.queryData.ogfId.value = params.ogfId.value
            this.queryData.ogfId.label = params.ogfId.label
            this.queryData.blockId.value = params.blockId.value
            this.queryData.blockId.label = params.blockId.label
            this.queryData.wellCategory = params.wellCategory
            this.queryData.value = params.value
            let arr = []
            params.wellId.forEach(item => {
                arr.push(item.wellId)
            })
            this.queryData.wellId = arr
            localStorage.removeItem('PRODUCTION_SPLIT')
        } else {
            console.log('888888889999999')
            this.queryData.ogfId.value = "3FC9A818F5BC43B88270DB80BBB3018F"
            this.queryData.ogfId.label = "秦皇岛32-6"
            this.queryData.blockId.value = "83D33B89B0DAB7DFA440BD060746883A"
            this.queryData.blockId.label = "秦皇岛32-6南区"
            this.queryData.wellCategory = "01"
            this.queryData.wellId = ["DA0269628E74490ABDE198E7D1DBF3EA"]
            this.queryData.wellName = "QHD32-6-A21H1"
        }
        this.queryOilFeild();
        this.queryBlockFeild();
        this.queryWellData();
        this.queryProductionSplit()
    },
    mounted() {

    }

}

</script>
<style scoped>
.idstyle{
    margin-left: 40px;
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