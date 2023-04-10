<template>
    <div class="app-container">
        <el-row>
            <div style="display: inline-block" >
                <span>油田：</span>
                <el-select v-model="ogfId" @change="getInfo()">
                    <el-option
                        v-for="(item, index) in oilFields"
                        :key="index"
                        :label="item.oilFieldName"
                        :value="item.oilFieldId"
                    />
                </el-select>
                <span style="padding-left: 20px">日期：</span>
                <el-date-picker
                    v-model="selectDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                />
            </div>
       
            <div style="display: inline-block;float:right">
                <el-button
                    icon="el-icon-search"
                    style="margin-right: 30px; "
                    type="primary"
                    @click="doSearch" v-text="activeEchart?'返回':'指标查询'">
                </el-button>
            </div>
           
        </el-row>
        <page-panel-new v-if="!activeEchart" style="height:auto">
            <el-row>
                <el-col :span="6" style="margin-left: 20px;margin-right: 20px">
                    <pagePanel headerTitle="目标类型">
                        <el-radio-group v-model="activeTabIndex">
                            <el-radio :label="1">
                                单井
                            </el-radio>
                            <el-radio :label="2">
                                油田(区块)
                            </el-radio>
                        </el-radio-group>
                    </pagePanel>
                </el-col>
                <el-col :span="6" style="margin-left: 20px;margin-right: 20px">
                    <pagePanel headerTitle="时间类型">
                        <el-radio-group v-model="activeTabIndexDate">
                            <el-radio :label="3">日</el-radio>
                            <el-radio :label="2">月</el-radio>
                            <el-radio :label="1">年</el-radio>
                        </el-radio-group>
                    </pagePanel>
                </el-col>
                <el-col :span="9" style="margin-left: 20px;margin-right: 20px">
                    <pagePanel headerTitle="数据类型">
                        <el-radio-group v-model="activeTabIndexData">
                            <el-radio :label="dataType" v-for="dataType in dataTypes"></el-radio>
                        </el-radio-group>
                    </pagePanel>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8" style="margin-left: 20px;margin-right: 20px">
                    <pagePanel headerTitle="状态指标" style="min-height: 250px" v-show="stateList.length != 0">
                        <el-checkbox-group v-model="stateValue">
                            <el-checkbox :label="item.val" :value="item.val" v-for="item in stateList">{{ item.name?item.name:item }}</el-checkbox>
                        </el-checkbox-group>
                    </pagePanel>
                </el-col>
                <el-col :span="5" style="margin-left: 20px;margin-right: 20px">
                    <pagePanel headerTitle="生产指标" style="min-height: 250px" v-show="productList.length != 0">
                        <el-checkbox-group v-model="productValue">
                            <el-checkbox :label="item.val":value="item.val" v-for="item in productList">{{ item.name?item.name:item }}</el-checkbox>
                        </el-checkbox-group>
                    </pagePanel>
                </el-col>
                <el-col :span="8" style="margin-left: 20px;margin-right: 20px">
                    <pagePanel headerTitle="累产指标" style="min-height: 250px" v-show="totalList.length != 0">
                        <el-checkbox-group v-model="totalValue">
                            <el-checkbox :label="item" v-for="item in totalList"/>
                        </el-checkbox-group>
                    </pagePanel>
                </el-col>
                <el-col :span="8" style="margin-left: 20px;margin-right: 20px">
                    <pagePanel headerTitle="注入指标" style="min-height: 250px" v-show="injectList.length != 0">
                        <el-checkbox-group v-model="injectValue">
                            <el-checkbox :label="item" v-for="item in injectList"/>
                        </el-checkbox-group>
                    </pagePanel>
                </el-col>
                <el-col :span="8" style="margin-left: 20px;margin-right: 20px">
                    <pagePanel headerTitle="管理指标" style="min-height: 250px" v-show="managerList.length != 0">
                        <el-checkbox-group v-model="managerValue">
                            <el-checkbox :label="item" v-for="item in managerList"/>
                        </el-checkbox-group>
                    </pagePanel>
                </el-col>
                <el-col :span="8" style="margin-left: 20px;margin-right: 20px">
                    <pagePanel headerTitle="储采指标" style="min-height: 250px" v-show="storeList.length != 0">
                        <el-checkbox-group v-model="storeValue">
                            <el-checkbox :label="item" v-for="item in storeList"/>
                        </el-checkbox-group>
                    </pagePanel>
                </el-col>
            </el-row>
        </page-panel-new>
        <page-panel-new v-else-if="activeEchart" style="height:auto">
<!--            <ProductionData></ProductionData>-->
            <el-table
                :row-style="{ height: '0px' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
                :data="queryData"
                header-cell-class-name="table_header"
                :cell-style="{ padding: '6px', 'text-align': 'center' }"
                style="margin: 20px 0"
                :default-sort="{ prop: 'date', order: 'descending' }"
            >
                <el-table-column :key="index" :prop="item.val" :label="item.name" width="110" v-for="(item,index) in headerText"></el-table-column>
            </el-table>
        </page-panel-new>
        <el-dialog
            title="查询"
            :visible.sync="dialogVisible"
            width="720px"
            :close-on-click-modal="false"
        >
            <el-button class="commonBtn" @click="addRow">添加</el-button>
            <el-table
                :row-style="{ height: '0px' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
                :data="tableRow"
                height="300px"
                header-cell-class-name="table_header"
                :cell-style="{ padding: '6px', 'text-align': 'center' }"
                style="width: 700px; margin: 20px 0"
                :default-sort="{ prop: 'date', order: 'descending' }"
            >
                <el-table-column
                    prop="type"
                    label="关系"
                    width="110"
                >
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.type" size="small">
                            <el-option label="且" value="0"/>
                            <el-option label="或" value="1"/>
                        </el-select>
                    </template>
                </el-table-column>
                
                <el-table-column
                    prop="name"
                    label="指标"
                    width="170"
                >
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.name" size="small">
                            <el-option :label="item.name" :value="item.name" v-for="item in headerText"/>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="model"
                    label="条件"
                    width="110"
                >
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.model" size="small">
                            <el-option label=">" value=">"/>
                            <el-option label="<" value="<"/>
                            <el-option label=">=" value=">="/>
                            <el-option label="<=" value="<="/>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="val"
                    label="值"
                    width="130"
                >
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.val" size="smaller" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="val"
                    label="操作"
                    width="130"
                >
                    <template slot-scope="scope">
                        <el-button class="commonBtn" @click="deleteRow(scope)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <span slot="footer" class="dialog-footer">
            <el-button class="cancelBtn" @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
import ProductionData from '@/pages/rem/basic/customQuery/modules/index.vue'
import {queryCustomQueryList} from "@/api/basic/basic";
export default {
    name: "CustomQuery",
    components: {
        ProductionData  
    },
    mounted() {
        const year = new Date().getFullYear();
        this.selectDate = [new Date(`${year}-01-01`).format("yyyy-MM-dd"), new Date().format("yyyy-MM-dd")];  
    },
    data() {
        return {
            queryData:[],
            typeVal:0,
            selectDate:[],//时间选择
            activeEchart:false,
            activeTabIndex: 1,
            activeTabIndexDate:3,
            activeTabIndexData:'井口生产指标',
            stateValue:[],//状态指标
            productValue:[],//生产指标
            totalValue:[],//累产指标
            injectValue:[],//注入指标
            managerValue:[],//管理指标
            storeValue:[],//储采指标
            dialogVisible: false,
            ogfId: "",
            oilFields: [
                {
                    oilFieldId: "715AD1CD60484BB59E737CD18A9DE44A",
                    oilFieldName: "秦皇岛32-6"
                }
            ],
            dataTypes:['井口生产指标','计量生产指标','核实生产指标','注入指标'],
            stateList : [{val:'proddate',name:'生产时间'},{val:'nozzlediameter',name :'油嘴直径'},{val:'whtemp',name :'井口温度'},{val:'dhflowingtemp',name :'流温'},{val:'oilpress',name :'油压'},{val:'csgpress',name :'套压'},{val:'backpress',name :'回压'},{val:'datumpessure',name :'折算基准面流压'},{val:'dhflowingpress',name :'井底流压'},{val:'pumpfrequency',name :'泵频率'},{val:'pumpcurrent',name :'泵电流'},{val:'pumpvoltage',name :'泵电压'},{val:'pumpinletpress',name :'泵吸入口压力'},{val:'pumpoutletpress',name :'泵出口压力'},{val:'pumpmotortemp',name :'马达温度'}],
            productList : [{val:'fluidproddaily',name:'日产液'},{val:'oilproddaily',name:'日产油'},{val:'waterproddaily',name:'日产水'},{val:'gasproddaily',name:'日产气'},{val:'waterratio',name:'含水'},{val:'oilgasratio',name:'气油比'}],
            totalList:['月累生产时间','年累生产时间','总累生产时间','月累产液','月累产油','月累产水','年累产液','年累产油','年累产水','年累产气','总累产液','总累产油','总累产水','总累产气'],
            injectList:[],
            managerList:[],//管理指标
            storeList:[],//储采指标
            tableData:[],//弹窗表格数据
            tableRow:[],
            headerText:[],//生成标题数据
        };
    },
    computed: {
        
    },
    watch: {
        // 监听目标类型
        activeTabIndex:{
            handler(Nval){
                this.activeTabIndexDate = 3
                if(Nval == 0){
                    this.activeTabIndexData = '井口生产指标'
                    this.dataTypes = ['井口生产指标','计量生产指标','核实生产指标','注入指标']
                }else{
                    this.activeTabIndexData = '生产指标'
                    this.dataTypes = ['生产指标','核实生产指标','油田措施日指标']
                }
                this.changeList()
            }
        },
        //监听年月日
        activeTabIndexDate:{
            handler(Nval){
                this.tableData = []
                if(this.activeTabIndex == 1){
                    switch (Nval) {
                        case 3:
                            this.activeTabIndexData = '井口生产指标'
                            this.dataTypes = ['井口生产指标','计量生产指标','核实生产指标','注入指标'] 
                            break;
                        case 2:
                            this.activeTabIndexData = '井口月生产'
                            this.dataTypes = ['井口月生产','核实月生产','注入月指标']
                            break;
                        case 1:
                            this.activeTabIndexData = '生产指标'
                            this.dataTypes = ['生产指标','核实生产','注入指标']
                            break;
                    }
                }else{
                    switch (Nval) {
                        case '日':
                            this.activeTabIndexData = '生产指标'
                            this.dataTypes = ['生产指标','核实生产指标','油田措施日指标'] 
                            break;
                        case '月':
                            this.activeTabIndexData = '油田月指标'
                            this.dataTypes = ['油田月指标','核实生产月指标']
                            break;
                        case '年':
                            this.activeTabIndexData = '生产指标'
                            this.dataTypes = ['生产指标','核实生产年指标']
                            break;
                    }
                }
                this.changeList()
                
            }
        },
        //监听数据类型
        activeTabIndexData:{
            handler(Nval){
                this.changeList()
            }
        }
    },
    created() {
    },
    methods: {
        changeList(){
            let Nval = this.activeTabIndexData
            this.tableRow = []
            this.stateValue = [],
            this.productValue = [],
            this.totalValue = [],
            this.injectValue = [],
            this.managerValue=[],
            this.storeList = []
            switch (Nval) {
                //日
                
            case '井口生产指标':
                this.stateList = [{val:'proddate',name:'生产时间'},{val:'nozzlediameter',name :'油嘴直径'},{val:'whtemp',name :'井口温度'},{val:'dhflowingtemp',name :'流温'},{val:'oilpress',name :'油压'},{val:'csgpress',name :'套压'},{val:'backpress',name :'回压'},{val:'datumpessure',name :'折算基准面流压'},{val:'dhflowingpress',name :'井底流压'},{val:'pumpfrequency',name :'泵频率'},{val:'pumpcurrent',name :'泵电流'},{val:'pumpvoltage',name :'泵电压'},{val:'pumpinletpress',name :'泵吸入口压力'},{val:'pumpoutletpress',name :'泵出口压力'},{val:'pumpmotortemp',name :'马达温度'}],
                    this.productList = [{val:'fluidproddaily',name:'日产液'},{val:'oilproddaily',name:'日产油'},{val:'waterproddaily',name:'日产水'},{val:'gasproddaily',name:'日产气'},{val:'waterratio',name:'含水'},{val:'oilgasratio',name:'气油比'}],
                    this.totalList = ['月累生产时间','年累生产时间','总累生产时间','月累产液','月累产油','月累产水','年累产液','年累产油','年累产水','年累产气','总累产液','总累产油','总累产水','总累产气'],
                    this.injectList=[],
                    this.managerList=[]
                break;

            // [
            //     { val :'fluidproddaily', name :'日产液量' },
            //     { val :'oilproddaily', name :'日产油量' },
            //     { val :'waterproddaily', name :'日产水量' },
            //     { val :'gasproddaily', name :'日产气量' },
            //     { val :'fluidproddaily', name :'日产液量' },
            //     { val :'oilproddaily', name :'日产油量' },
            //     { val :'waterproddaily', name :'日产水量' },
            //     { val :'gasproddaily', name :'日产气量' },
            //     { val :'waterratio', name :'含水率' },
            //     { val :'gasoilratio', name :'气油比' },
            //     { val :'oilgasratio', name :'油气比' },
            //     { val :'watergasratio', name :'水气比' }
            // ]
        
            case '计量生产指标':
                this.stateList = [
                    { val :'暂无', name :'计量时间' },
                    { val :'nozzlediameter', name :'油嘴直径' },
                    { val :'whtemp', name :'井口温度' },
                    { val :'oilpress', name :'油压' },
                    { val :'csgpress', name :'套压' },
                    { val :'dhflowingtemp', name :'井底流温' },
                    { val :'dhflowingpress', name :'井底流压' },
                    { val :'pumpfrequency', name :'泵频率' },
                    { val :'pumpcurrent', name :'泵电流' },
                    { val :'pumpvoltage', name :'泵电压' },
                    { val :'pumpinlettemp', name :'泵入口温度' },
                    { val :'pumpmotortemp', name :'泵马达温度' },
                    { val :'pumpinletpress', name :'泵入口压力' },
                    { val :'pumpoutletpress', name :'泵出口压力' },
                    { val :'gasliftchokediameter', name :'气举嘴直径' },
                    { val :'gasliftpress', name :'气举压力' }
                ],
                this.productList = ['实际日产液','实际日产油','实际日产水','实际日产气','折算日产液','折算日产油','折算日产水','折算日产气','含水','气油比','油气比','水气比'],
                this.totalList=[],
                this.injectList=[],
                this.managerList=[]
                break;
            case '核实生产指标':
                if(this.activeTabIndex == '1'){
                    this.stateList = [],
                    this.productList = ['日核实产量','日核实油当量','日权益产量','日权益油当量','日净产量','日净产油当量'],
                    this.totalList=['月累核实产量','月累核实油当量','月累权益产量','月累权益油当量','月累净产量','月累净产油当量','年累核实产量','年累核实油当量','年累权益产量','年累权益油当量','年累净产量','年累净产油当量'],
                    this.injectList=[],
                    this.managerList=[]
                }else{
                    this.stateList = [],
                    this.productList = ['日核实产量','日核实油当量','日权益产量','日权益油当量','日净产量','日净产油当量'],
                    this.totalList=['月累核实产量','月累核实油当量','月累权益产量','月累权益油当量','月累净产量','月累净产油当量','月累核实自用量','月累核实放空量','月累核实外输量','年累核实产量','年累核实油当量','年累权益产量','年累权益产量','年累权益油当量','年累净产量','年累净产油当量','年累核实自用量','年累核实放空量','年累核实外输量'],
                    this.injectList=[],
                    this.managerList=[]
                }
                break;

            case '注入指标':
                this.stateList = ['生产时间','水嘴直径','干线压力','油压','套压','静压','流压','日注入量','日配注量'],
                    this.productList = ['月累生产时间','年累生产时间','总累生产时间','月累注入量','年累注入量','总累注入量'],
                    this.totalList=[],
                    this.injectList=[],
                    this.managerList=[]
                break;
            case '措施日增产':
                this.stateList = ['生产时间','水嘴直径','干线压力','油压','套压','静压','流压','日注入量','日配注量'],
                    this.productList = ['月累生产时间','年累生产时间','总累生产时间','月累注入量','年累注入量','总累注入量'],
                    this.totalList=[],
                    this.injectList=[],
                    this.managerList=[]
                break;
                //月   
            case '井口月生产':
                this.stateList = ['月生产天数','油嘴','井口温度','油压','套压','回压','泵吸入口压力','泵出口压力'],
                    this.productList = ['月产液','月产油','月产水','月产气','日产液水平','日产油水平','日产水水平','日产气水平','日产液能力','日产油能力','日产水能力','日产气能力','气油比','油气比','水气比','含水'],
                    this.totalList=['年累生产天数','总累生产天数','年累产液','年累产油','年累产水','年累产气','总累产液','总累产油','总累产水','总累产气'],
                    this.injectList=[],
                    this.managerList=[]
                break;
            case '核实月生产':
                this.stateList = [],
                    this.productList = [],
                    this.totalList = ['月累核实产量','月累核实油当量','月累权益产量','月累权益油当量','月累净产量','月累净产油当量'],
                    this.injectList=[],
                    this.managerList=[]
                break;
            case '注入月指标':
                this.stateList = ['月生产天数','水嘴直径','干线压力','油压','套压','日配注入量','日均注入量'],
                    this.productList = [],
                    this.totalList = [],
                    this.injectList = ['年累生产天数','总累生产天数','月注入量','年累注入量','总累注入量'],
                    this.managerList=[]
                break;
                //年
            case '生产指标':
                console.log(this.activeTabIndexDate);
                if(this.activeTabIndex == '1'){
                    this.stateList = [],
                        this.productList = ['年累生产天数','总累生产天数','年产液','年产油','年产水','累产液','累产油','累产水','累产气'],
                        this.totalList = [],
                        this.injectList = [],
                        this.managerList=[]
                }else if(this.activeTabIndex == '2' && this.activeTabIndexDate == 3){
                    this.stateList = [],
                        this.productList = ['日产液','日产油','日产水','日产气','含水','汽油比','月累产液','月累产油','月累产水','月累产气'],
                        this.totalList = ['年累产液','年累产油','年累产水','年累产气','总累产液','总累产油','总累产水','总累产气'],
                        this.injectList = ['平均油压','平均干线压力','日注水聚总量','月累注水聚总量','年累注水聚总量','总累注水聚总量'],
                        this.managerList=['日总井数','日开井数','日总新井数','日开新井数','月累总井数','月累开井数','月累开新井数','年累总井数','年累开井数','年累总新井数','年累开新井数','日注入总井数','日注入开井数','月累注入总井数','月累注入开井数','年累注入总井数','年累注入开井数']
                }else if(this.activeTabIndex == '2' && this.activeTabIndexDate == 1){
                    this.stateList = [],
                        this.productList = [],
                        this.totalList = ['年产液','年产油','年产水','年产气','总累产液','总累产油','总累产水','总累产气'],
                        this.injectList = [],
                        this.managerList=[]
                }

                break;
            case '核实生产':
                this.stateList = [],
                    this.productList = [],
                    this.totalList = ['年累核实产量','年累核实油当量','年累权益产量','年累权益油当量','年累净产量','年累净产油当量'],
                    this.injectList = [],
                    this.managerList=[]
                break;
            case '注入指标':
                this.stateList = [],
                    this.productList = ['年累生产天数','总累生产天数','年累注入量','总累注入量'],
                    this.totalList = [],
                    this.injectList = [],
                    this.managerList=[]
                break;
            case '油田措施日指标':
                this.stateList = [],
                    this.productList = ['日增产液','日增产油','日增产水','日增产气'],
                    this.totalList = ['月累增产液','月累增产油','月累增产水','月累增产气','年累增产液','年累增产油','年累增产水','年累增产气'],
                    this.injectList = [],
                    this.managerList=['日措施井次','月累措施井次','年累措施井次']
                break;
                //文档不全
            case '油田月指标':
                this.stateList = [],
                    this.productList = ['综合含水','含水上升率','综合气油比','总递减率','老井自然递减率','老井综合递减率','平均单井开井天数','日均产液','日均产油','日均产水','日均产气','日产液水平','日产油水平','日产水水平','日产气水平','日产液能力','日产油能力','日产水能力','日产气能力','平均单井日产液','平均单井日产油','平均单井日产水','平均单井日产气','平均单井日产液水平','平均单井日产油水平','平均单井日产水水平','平均单井日产气水平','平均单井日产液能力','平均单井日产水能力','平均单井日产气能力'],
                    this.totalList = [],
                    this.injectList = ['平均油压','平均套压','平均干线压力(泵压)','平均注入开井天数','日均注液','日均注水','日均注气','日注液水平','日注水水平','日注汽水平','日注液能力','日注水能力','日注气能力','平均单井日注液量','平均单井日注水量','平均单井日注气量','平均单井日注液水平','平均单井日注水水平','平均单井日注气水平','平均注入开井天数','平均注液开井天数','平均注水开井天数','平均注气开井天数','月注采比','年累注采比','总累注采比','月亏空量','年累亏空量','总累亏空量'],
                    this.managerList=[],
                    this.storeList = ['井口储采比','井口采油速度','井口采出油速度','剩余油储量','剩余气储量','剩余油采出速度','剩余气采出速度','剩余油采出程度','剩余气采出程度']
                break;
            case '核实生产月指标':
                    this.stateList = [],
                    this.productList = [],
                    this.totalList = ['月累核实生产','月累核实油当量','月累权益产量','月累权益油当量','月累净产量','月累净产油当量'],
                    this.injectList = [],
                    this.managerList=[]
                break;
            case '核实生产年指标':
                this.stateList = [],
                    this.productList = [],
                    this.totalList = ['年累核实产量','年累核实油当量','年累权益产量','年累权益油当量','年累净产量','年累净产油当量'],
                    this.injectList = [],
                    this.managerList=[]
                break;
            }
        },
        // 油井选择改变
        getInfo(val) {
            this.$message.success("选择了油井");
        },
        doSearch(val) {
            if(this.activeEchart){
                this.activeEchart = false
            }else{
                // this.$message.success("点击了查询" + this.stateValue);
                this.dialogVisible = true
                this.tableData = []
                let newArr = this.stateValue.concat(this.productValue,this.totalValue,this.injectValue,this.managerValue,this.storeValue)
                let tableArr = []
                for(let i=0;i<newArr.length;i++){
                    tableArr.push({
                        type: "且",
                        name: newArr[i],
                        model: ">",
                        val: ""
                    })
                }
                let header = this.stateList.concat(this.productList)
                console.log(header);
                console.log(this.tableData);
                this.headerText = []
                for(let i = 0;i<tableArr.length;i++){
                    this.headerText.push(header.filter((item) =>{
                        return item.val == tableArr[i].name
                    })[0])
                }
                console.log(this.headerText);
                this.tableData = tableArr
                console.log(process.env.NODE_ENV);
            }
        },
        confirm(){
            this.dialogVisible = false
            this.activeEchart = !this.activeEchart
            queryCustomQueryList({
                targetType: this.activeTabIndex, //目标类型 井：1  油田 ：2
                dataType:  'wellhead' , //数据类型 （井口指标，计量指标等）
                timeType:  this.activeTabIndexDate , //时间类型 1 年 2月 3 日
                statusList: this.stateValue ,//状态指标
                productList: this.productValue ,//生产指标
                accumList:  this.totalValue,//累产指标
                startTime:  this.selectDate[0], //开始时间
                endTime: this.selectDate[0],//结束时间
                // dataId:'BE6D76EC53E54A1E9B4F41DB1C204DDF',//油井或油田idn
                dataId:this.ogfId
            }).then((res)=>{
                this.queryData = res.data.data.data
                console.log(this.queryData);
                console.log(this.tableData);
            })
        },
        addRow(val){
            this.tableRow.push({} )
        },
        deleteRow(val){
            console.log(val);
            this.tableRow.splice(val.$index,1)
        }
    }
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