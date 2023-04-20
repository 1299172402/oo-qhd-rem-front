<template>
    <div class="app-container">
        <el-row>
            <div style="display: inline-block" >
                <span>油田：</span>
                <el-select v-model="ogfId" disabled>
                    <el-option
                        v-for="(item, index) in oilFields"
                        :key="index"
                        :label="item.oilFieldName"
                        :value="item.oilFieldId"
                    />
                </el-select>
                <span v-show="activeTabIndex == 1" style="padding-left: 20px">井号：</span>
                <el-select v-show="activeTabIndex == 1" v-model="wellId">
                    <el-option
                        v-for="(item, index) in wellData"
                        :key="index"
                        :label="item.wellName"
                        :value="item.wellId"
                    />
                </el-select>
                <span style="padding-left: 20px">日期：</span>
                <el-date-picker
                    v-show="activeTabIndexDate == 3"
                    v-model="selectDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                />
                <el-date-picker
                    v-show="activeTabIndexDate == 2"
                    v-model="selectDate"
                    type="monthrange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM"
                />
                <el-date-picker
                    v-show="activeTabIndexDate == 1"
                    v-model="selectDate"
                    type="year"
                    placeholder="选择年份"
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
        <page-panel-new :show-btn="true" v-if="!activeEchart" style="height:calc(100% - 62px)">
            <el-row>
                <el-col :span="6" style="margin-left: 20px;margin-right: 20px">
                    <page-panel-new :show-btn="true" headerTitle="目标类型">
                        <el-radio-group v-model="activeTabIndex">
                            <el-radio :label="1">
                                单井
                            </el-radio>
                            <el-radio :label="2">
                                油田(区块)
                            </el-radio>
                        </el-radio-group>
                    </page-panel-new>
                </el-col>
                <el-col :span="6" style="margin-left: 20px;margin-right: 20px">
                    <page-panel-new :show-btn="true" headerTitle="时间类型">
                        <el-radio-group v-model="activeTabIndexDate">
                            <el-radio :label="3">日</el-radio>
                            <el-radio :label="2">月</el-radio>
                            <el-radio :label="1">年</el-radio>
                        </el-radio-group>
                    </page-panel-new>
                </el-col>
                <el-col :span="9" style="margin-left: 20px;margin-right: 20px">
                    <page-panel-new :show-btn="true" headerTitle="数据类型">
                        <el-radio-group v-model="activeTabIndexData">
                            <el-radio :label="dataType.val" v-for="dataType in dataTypes">{{dataType.name}}</el-radio>
                        </el-radio-group>
                    </page-panel-new>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8" style="margin-left: 20px;margin-right: 20px">
                    <page-panel-new :show-btn="true" headerTitle="状态指标" style="min-height: 250px" v-show="stateList.length != 0">
                        <el-checkbox-group v-model="stateValue">
                            <el-checkbox :label="item.val" :value="item.val" v-for="item in stateList">{{ item.name?item.name:item }}</el-checkbox>
                        </el-checkbox-group>
                    </page-panel-new>
                </el-col>
                <el-col :span="5" style="margin-left: 20px;margin-right: 20px">
                    <page-panel-new :show-btn="true" headerTitle="生产指标" style="min-height: 250px" v-show="productList.length != 0">
                        <el-checkbox-group v-model="productValue">
                            <el-checkbox :label="item.val" :value="item.val" v-for="item in productList">{{ item.name?item.name:item }}</el-checkbox>
                        </el-checkbox-group>
                    </page-panel-new>
                </el-col>
                <el-col :span="8" style="margin-left: 20px;margin-right: 20px">
                    <page-panel-new :show-btn="true" headerTitle="累产指标" style="min-height: 250px" v-show="totalList.length != 0">
                        <el-checkbox-group v-model="totalValue">
                            <el-checkbox :label="item.val" :value="item.val" v-for="item in totalList">{{ item.name?item.name:item }}</el-checkbox>
                        </el-checkbox-group>
                    </page-panel-new>
                </el-col>
                <el-col :span="8" style="margin-left: 20px;margin-right: 20px">
                    <page-panel-new :show-btn="true" headerTitle="注入指标" style="min-height: 250px" v-show="injectList.length != 0">
                        <el-checkbox-group v-model="injectValue">
                            <el-checkbox :label="item.val" :value="item.val" v-for="item in injectList">{{ item.name?item.name:item }}</el-checkbox>
                        </el-checkbox-group>
                    </page-panel-new>
                </el-col>
                <el-col :span="8" style="margin-left: 20px;margin-right: 20px">
                    <page-panel-new :show-btn="true" headerTitle="管理指标" style="min-height: 250px" v-show="managerList.length != 0">
                        <el-checkbox-group v-model="managerValue">
                            <el-checkbox :label="item.val" :value="item.val" v-for="item in managerList">{{ item.name?item.name:item }}</el-checkbox>
                        </el-checkbox-group>
                    </page-panel-new>
                </el-col>
                <el-col :span="8" style="margin-left: 20px;margin-right: 20px">
                    <page-panel-new :show-btn="true" headerTitle="储采指标" style="min-height: 250px" v-show="storeList.length != 0">
                        <el-checkbox-group v-model="storeValue">
                            <el-checkbox :label="item.val" :value="item.val" v-for="item in storeList">{{ item.name?item.name:item }}</el-checkbox>
                        </el-checkbox-group>
                    </page-panel-new>
                </el-col>
            </el-row>
        </page-panel-new>
        <page-panel-new :show-btn="true" v-else-if="activeEchart" style="height:calc(100% - 62px)">
<!--            <ProductionData></ProductionData>-->
            <el-table
                :row-style="{ height: '0px' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
                :data="queryData"
                height="100%"
                header-cell-class-name="table_header"
                :cell-style="{ padding: '6px', 'text-align': 'center' }"
                style="margin: 20px 0;height: calc(100% - 125px)"
                :default-sort="{ prop: 'date', order: 'descending' }"
            >
                <el-table-column :key="index" :prop="item.val" :label="item.name" width="140" v-for="(item,index) in headerTextLower"></el-table-column>
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
                            <el-option label="且" value="AND"/>
                            <el-option label="或" value="OR"/>
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
                            <el-option :label="item.name" :value="item.val" v-for="item in headerText"/>
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
import {fetchProductionWells} from "@/api/oilDeposit/rem-02/primaryinfo.js";
export default {
    name: "CustomQuery",
    components: {
        ProductionData  
    },
    mounted() {
        const year = new Date().getFullYear();
        this.selectDate = [new Date(`${year}-01-01`).format("yyyy-MM-dd"), new Date().format("yyyy-MM-dd")];
        this.initData()
    },
    data() {
        return {
            queryData:[],
            typeVal:0,
            selectDate:[],//时间选择
            activeEchart:false,
            activeTabIndex: 1,
            activeTabIndexDate:3,
            activeTabIndexData:'wellhead',
            stateValue:[],//状态指标
            productValue:[],//生产指标
            totalValue:[],//累产指标
            injectValue:[],//注入指标
            managerValue:[],//管理指标
            storeValue:[],//储采指标
            dialogVisible: false,
            ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
            wellId: '',
            oilFields: [
                {
                    oilFieldId: "3FC9A818F5BC43B88270DB80BBB3018F",
                    oilFieldName: "秦皇岛32-6油田"
                }
            ],
            wellData:[],
            dataTypes:[
                { val:'wellhead' ,name:'井口生产指标'},
                { val:'proProDic' ,name:'计量生产指标'},
                { val:'verifyPro' ,name:'核实生产指标'},
                { val:'inject' ,name:'注入指标'}
            ],
            stateList : 
                [
                    // { val:'PROD_DATE', name :'生产日期' },
                    { val:'NOZZLE_DIAMETER', name :'油嘴直径' },
                    { val:'WH_TEMP', name :'井口温度' },
                    { val:'DH_FLOWING_TEMP', name :'油压' },
                    { val:'CSG_PRESS', name :'套压' },
                    { val:'BACK_PRESS', name :'回压' },
                    { val:'DH_FLOWING_PRESS', name :'井底流压' },
                    { val:'PUMP_FREQUENCY', name :'泵频率' },
                    { val:'PUMP_CURRENT', name :'泵电流' },
                    { val:'PUMP_VOLTAGE', name :'泵电压' },
                    { val:'PUMP_INLET_PRESS', name :'泵吸入口压力' },
                    { val:'PUMP_OUTLET_PRESS', name :'泵出口压力' }
                ],
            productList :
                [
                    { val:'FLUID_PROD_DAILY', name :'日产液' },
                    { val:'OIL_PROD_DAILY', name :'日产油' },
                    { val:'WATER_PROD_DAILY', name :'日产水' },
                    { val:'GAS_PROD_DAILY', name :'日产气' },
                    { val:'WATER_RATIO', name :'含水' },
                    { val:'OIL_GAS_RATIO', name :'气油比' }
                ],
            totalList : [
                { val:'MONTH_PROD_DURATION', name :'月累生产时间' },
                { val:'YEAR_PROD_DURATION', name :'年累生产时间' },
                { val:'MONTHLY_CUMU_FLUID_PROD', name :'月累产液' },
                { val:'MONTHLY_CUMU_OIL_PROD', name :'月累产油' },
                { val:'MONTHLY_ACCUM_WATER_PROD', name :'月累产水' },
                { val:'MONTHLY_CUMU_GAS_PROD', name :'月累产气' },
                { val:'YEAR_CUMU_FLUID_PROD', name :'年累产液' },
                { val:'YEAR_CUMU_OIL_PROD', name :'年累产油' },
                { val:'YEAR_ACCUM_WATER_PROD', name :'年累产水' },
                { val:'YEAR_CUMU_GAS_PROD', name :'年累产气' },
                { val:'REMAKE', name :'备注' }
            ],
            injectList:[],
            managerList:[],//管理指标
            storeList:[],//储采指标
            tableData:[],//弹窗表格数据
            tableRow:[],
            headerText:[],//生成标题数据
            headerTextLower:[]
        };
    },
    computed: {
        
    },

    watch: {
        // 监听目标类型
        activeTabIndex:{
            handler(Nval){
                this.activeTabIndexDate = 3
                if(Nval == 1){
                    this.activeTabIndexData = 'wellhead'//'井口生产指标'
                    this.dataTypes = [
                        { val:'wellhead' ,name:'井口生产指标' },
                        { val:'proProDic' ,name:'计量生产指标' },
                        { val:'verifyPro' ,name:'核实生产指标' },
                        { val:'inject' ,name:'注入指标' }
                    ]
                }else{
                    this.activeTabIndexData = 'proProDic'//'生产指标'
                    this.dataTypes =[
                        { val:'proProDic', name:'生产指标' },
                        { val:'verifyPro', name:'核实生产指标' },
                        { val:'measure', name:'油田措施日指标' }
                    ]
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
                            this.selectDate = [new Date(`${new Date().getFullYear()}-01-01`).format("yyyy-MM-dd"), new Date().format("yyyy-MM-dd")];
                            this.activeTabIndexData = 'wellhead'//井口生产指标
                            this.dataTypes = [
                                { val:'wellhead' ,name:'井口生产指标'},
                                { val:'proProDic' ,name:'计量生产指标'},
                                { val:'verifyPro' ,name:'核实生产指标'},
                                { val:'inject' ,name:'注入指标'}
                            ] 
                            break;
                        case 2:
                            this.selectDate = [new Date(`${new Date().getFullYear()}-01`).format("yyyy-MM"), new Date().format("yyyy-MM")];
                            this.activeTabIndexData = 'Mwellhead'//'井口月生产'
                            this.dataTypes = [
                                { val:'Mwellhead', name:'井口月生产' },
                                { val:'MverifyPro', name:'核实月生产' },
                                { val:'Minject', name:'注入月指标' }
                            ]
                            break;
                    case 1:
                        this.selectDate = new Date().format("yyyy")
                        this.activeTabIndexData = 'YproProDic'//'生产指标'
                            this.dataTypes = [
                                { val:'YproProDic', name:'生产指标' },
                                { val:'YverifyPro', name:'核实生产' },
                                { val:'Yinject', name:'注入指标' }
                            ]
                            break;
                    }
                }else{
                    switch (Nval) {
                        case 3:
                            this.selectDate = [new Date(`${new Date().getFullYear()}-01-01`).format("yyyy-MM-dd"), new Date().format("yyyy-MM-dd")];
                            this.activeTabIndexData = 'YTproProDic' //'生产指标'
                            this.dataTypes = [
                                { val:'YTproProDic', name:'生产指标' },
                                { val:'verifyPro', name:'核实生产指标' },
                                { val:'measure', name:'油田措施日指标' }
                            ] 
                            break;
                        case 2:
                            this.selectDate = [new Date(`${new Date().getFullYear()}-01`).format("yyyy-MM"), new Date().format("yyyy-MM")];
                            this.activeTabIndexData = 'MproProDic'//'油田月指标'
                            this.dataTypes = [
                                { val:'MproProDic', name:'油田月指标' },
                                { val:'MverifyPro', name:'核实生产月指标' }
                            ]
                            break;
                        case 1:
                            this.selectDate = new Date().format("yyyy")
                            this.activeTabIndexData = 'YproProDic'//'生产指标'
                            this.dataTypes = [
                                { val:'YproProDic',name:'生产指标' },
                                { val:'YverifyPro',name:'核实生产年指标' }
                            ]
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
        initData(){
            let oilFieldId = '3FC9A818F5BC43B88270DB80BBB3018F';
            const request = {
                oilFieldId,
            };
            fetchProductionWells(request).then((res) => {
                if (res.data.code == 200) {
                    let wellList = res.data.data.productionWells;
                    let arr = [];
                    wellList.map((n) => {
                        if (n.wellName != null) {
                            arr.push(n);
                        }
                    });
                    this.wellData = [...new Set(arr)];
                }
            });
        },
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
                case 'wellhead'://'井口生产指标':
                    this.stateList = [
                        // { val:'PROD_DATE', name :'生产日期' },
                        { val:'NOZZLE_DIAMETER', name :'油嘴直径' },
                        { val:'WH_TEMP', name :'井口温度' },
                        { val:'DH_FLOWING_TEMP', name :'油压' },
                        { val:'CSG_PRESS', name :'套压' },
                        { val:'BACK_PRESS', name :'回压' },
                        { val:'DH_FLOWING_PRESS', name :'井底流压' },
                        { val:'PUMP_FREQUENCY', name :'泵频率' },
                        { val:'PUMP_CURRENT', name :'泵电流' },
                        { val:'PUMP_VOLTAGE', name :'泵电压' },
                        { val:'PUMP_INLET_PRESS', name :'泵吸入口压力' },
                        { val:'PUMP_OUTLET_PRESS', name :'泵出口压力' }
                    ],
                    this.productList = [
                        { val:'FLUID_PROD_DAILY', name :'日产液' },
                        { val:'OIL_PROD_DAILY', name :'日产油' },
                        { val:'WATER_PROD_DAILY', name :'日产水' },
                        { val:'GAS_PROD_DAILY', name :'日产气' },
                        { val:'WATER_RATIO', name :'含水' },
                        { val:'OIL_GAS_RATIO', name :'气油比' }
                    ],
                    this.totalList = [
                        { val:'MONTH_PROD_DURATION', name :'月累生产时间' },
                        { val:'YEAR_PROD_DURATION', name :'年累生产时间' },
                        { val:'MONTHLY_CUMU_FLUID_PROD', name :'月累产液' },
                        { val:'MONTHLY_CUMU_OIL_PROD', name :'月累产油' },
                        { val:'MONTHLY_ACCUM_WATER_PROD', name :'月累产水' },
                        { val:'MONTHLY_CUMU_GAS_PROD', name :'月累产气' },
                        { val:'YEAR_CUMU_FLUID_PROD', name :'年累产液' },
                        { val:'YEAR_CUMU_OIL_PROD', name :'年累产油' },
                        { val:'YEAR_ACCUM_WATER_PROD', name :'年累产水' },
                        { val:'YEAR_CUMU_GAS_PROD', name :'年累产气' },
                        { val:'REMAKE', name :'备注' }
                    ],
                    this.injectList=[],
                    this.managerList=[]
                break;

                case 'proProDic'://'计量生产指标':
                    this.stateList = [
                        { val:'CALCUL_DATE',name: '计量时间' },
                        { val:'NOZZLE_DIAMETER',name: '油嘴直径' },
                        { val:'WH_TEMP',name: '井口温度' },
                        { val:'DH_FLOWING_TEMP',name: '油压' },
                        { val:'CSG_PRESS',name: '套压' },
                        { val:'DH_FLOWING_TEMP',name: '井底流温' },
                        { val:'DH_FLOWING_PRESS',name: '井底流压' },
                        { val:'PUMP_FREQUENCY',name: '泵频率' },
                        { val:'PUMP_CURRENT',name: '泵电流' },
                        { val:'PUMP_VOLTAGE',name: '泵电压' },
                        { val:'PUMP_INLET_TEMP',name: '泵入口温度' },
                        { val:'PUMP_MOTOR_TEMP',name: '泵马达温度' },
                        { val:'PUMP_INLET_PRESS',name: '泵入口压力' },
                        { val:'PUMP_OUTLET_PRESS',name: '泵出口压力' },
                        { val:'GAS_LIFT_CHOKE_DIAMETER',name: '气举嘴直径' },
                        { val:'GAS_LIFT_PRESS',name: '气举压力' }
                    ],
                    this.productList = [
                        { val: 'ACTUAL_DAILY_LIQUID_PROD', name: '实际日产液' },
                        { val: 'ACTUAL_DAILY_OIL_PROD', name: '实际日产油' },
                        { val: 'ACTUAL_DAILY_WATER_PROD', name: '实际日产水' },
                        { val: 'ACTUAL_DAILY_GAS_PROD', name: '实际日产气' },
                        { val: 'WATER_RATIO', name: '含水' },
                        { val: 'GAS_OIL_RATIO', name: '气油比' },
                        { val: 'OIL_GAS_RATIO', name: '油气比' },
                        { val: 'WATER_GAS_RATIO', name: '水气比' }
                    ],
                    this.totalList=[],
                    this.injectList=[],
                    this.managerList=[]
                break;
            case 'verifyPro'://'核实生产指标':
                if(this.activeTabIndex == '1'){
                    this.stateList = [],
                    this.productList = [
                        { val: 'DAILY_VE_PROD', name: '日核实产量' },
                        { val: 'DAILY_CUMU_NET_PROD', name: '日净产量' }
                    ],
                    this.totalList=[
                        { val: 'MONTHLY_VE_PROD', name: '月累核实产量' },
                        { val: 'MONTHLY_CUMU_NET_PROD', name: '月累净产量' },
                        { val: 'YEAR_VE_PROD', name: '年累核实产量' },
                        { val: 'YEAR_CUMU_NET_PROD', name: '年累净产量' }
                    ],
                    this.injectList=[],
                    this.managerList=[]
                }else{
                    //油田日核实生产指标
                    this.stateList = [],
                    this.productList = [
                        { val:'DAILY_VE_PROD', name:'日核实产量' },
                        { val:'DAILY_CUMU_NET_PROD', name:'日净产量' }
                    ],
                    this.totalList=[
                        { val:'MONTHLY_VE_PROD', name:'月累核实产量' },
                        { val:'MONTHLY_CUMU_NET_PROD', name:'月累净产量' },
                        { val:'MONTHLY_VERIFICA_AIR_DEFENSE_VOLUME', name:'月累核实放空量' },
                        { val:'MONTHLY_VERI_VOLUME', name:'月累核实外输量' },
                        { val:'YEAR_VE_PROD', name:'年累核实产量' },
                        { val:'YEAR_VE_OIL_EQUI', name:'年累核实油当量' },
                        { val:'YEAR_CUMU_NET_PROD', name:'年累净产量' },
                        { val:'YEAR_VER_SELF_CONSUMPTION', name:'年累核实自用量' },
                        { val:'YEAR_VER_RELEASE_VOLUME', name:'年累核实放空量' },
                        { val:'YEAR_VER_EXPORT_VOLUME', name:'年累核实外输量' }
                    ],
                    this.injectList=[],
                    this.managerList=[]
                }
                break;

            case 'inject'://'注入指标':
                this.stateList = [
                    { val:'PROD_DATE', name: '生产时间' },
                    { val:'WATER_NOZZLE_DIAMETER', name: '水嘴直径' },
                    { val:'MAINLINE_PRESSURE', name: '干线压力' },
                    { val:'DH_FLOWING_TEMP', name: '油压' },
                    { val:'CSG_PRESS', name: '套压' },
                    { val:'STATIC_PRESS', name: '静压' },
                    { val:'FLOW_PRESS', name: '流压' },
                    { val:'DAILY_INJ_POUR_VOLUME', name: '日注入量' },
                    { val:'DAILY_INJECTION_VOLUME', name: '日配注量' }
                ],
                this.productList = [
                    { val:'MONTHLY_CUMULATIVE_PRODUCTION_TIME', name:'月累生产时间'},
                    { val:'YEAR_CUMULATIVE_PRODUCTION_TIME', name:'年累生产时间'},
                    { val:'MONTHLY_CUMULATIVE_INJECTION_VOLUME', name:'月累注入量'},
                    { val:'YEAR_CUMULATIVE_INJECTION_VOLUME', name:'年累注入量'},
                    { val:'REMARK', name:'备注'}
                ],
                this.totalList=[],
                this.injectList=[],
                this.managerList=[]
                break;
                //月   
            case 'Mwellhead'://'井口月生产':
                this.stateList = [
                    { val:'MONTHLY_PROD_DAYS', name:'月生产天数' },
                    { val:'OIL_NOZZLE', name:'油嘴' },
                    { val:'WH_TEMP', name:'井口温度' },
                    { val:'DH_FLOWING_TEMP', name:'油压' },
                    { val:'CSG_PRESS', name:'套压' },
                    { val:'BACK_PRESS', name:'回压' },
                    { val:'PUMP_INLET_PRESS', name:'泵吸入口压力' },
                    { val:'PUMP_OUTLET_PRESS', name:'泵出口压力' }
                ],
                this.productList = [
                    { val:'MONTHLY_LIQUID_PROD',name:'月产液' },
                    { val:'MONTHLY_OIL_PROD',name:'月产油' },
                    { val:'MONTHLY_WATER_PROD',name:'月产水' },
                    { val:'MONTHLY_GAS_PROD',name:'月产气' },
                    { val:'DAILY_LIQUID_PROD_LEVEL',name:'日产液水平' },
                    { val:'DAILY_OIL_PROD_LEVEL',name:'日产油水平' },
                    { val:'DAILY_WATER_PROD_LEVEL',name:'日产水水平' },
                    { val:'DAILY_GAS_PROD_LEVEL',name:'日产气水平' },
                    { val:'DAILY_LIQUID_PROD_CAP',name:'日产液能力' },
                    { val:'DAILY_OIL_PROD_CAP',name:'日产油能力' },
                    { val:'DAILY_WATER_PROD_CAP',name:'日产水能力' },
                    { val:'DAILY_GAS_PROD_CAP',name:'日产气能力' },
                    { val:'GAS_OIL_RATIO',name:'气油比' },
                    { val:'OIL_GAS_RATIO',name:'油气比' },
                    { val:'WATER_GAS_RATIO',name:'水气比' },
                    { val:'WATER_RATIO',name:'含水' }

                ],
                this.totalList=[
                    { val:'YEAR_CUMU_PROD_DAILY', name:'年累生产天数' },
                    { val:'YEAR_CUMU_FLUID_PROD', name:'年累产液' },
                    { val:'YEAR_CUMU_OIL_PROD', name:'年累产油' },
                    { val:'YEAR_ACCUM_WATER_PROD', name:'年累产水' },
                    { val:'YEAR_CUMU_GAS_PROD', name:'年累产气' }
                ],
                this.injectList=[],
                this.managerList=[]
                break;
            case 'MverifyPro'://'核实月生产':
                this.stateList = [],
                this.productList = [],
                this.totalList = [
                    { val:'MONTHLY_VE_PROD', name:'月累核实产量' },
                    { val:'MONTHLY_CUMU_NET_PROD', name:'月累净产量' }
                ],
                this.injectList=[],
                this.managerList=[]
                break;
            case 'Minject'://'注入月指标':
                this.stateList = [
                    { val:'MONTHLY_PROD_DAYS',name:'月生产天数' },
                    { val:'WATER_NOZZLE_DIAMETER',name:'水嘴直径' },
                    { val:'MAINLINE_PRESSURE',name:'干线压力' },
                    { val:'DH_FLOWING_TEMP',name:'油压' },
                    { val:'CSG_PRESS',name:'套压' },
                    { val:'DAILY_INJ_VOL',name:'日配注入量' },
                    { val:'DAILY_AVG_INJ_VOL',name:'日均注入量' }
                ],
                this.productList = [],
                this.totalList = [],
                this.injectList = [
                    { val:'YEAR_CUMU_PROD_DAILY', name:'年累生产天数' },
                    { val:'MONTHLY_INJECT_VOL', name:'月注入量' },
                    { val:'YEAR_CUMUL_INJ_VOLUME', name:'年累注入量' }
                ],
                this.managerList=[]
                break;
            case 'YTproProDic'://'生产指标'://油田日的生产指标
                    this.stateList = [],
                    this.productList = [
                        { val:'DAILY_LIQUID_PROD', name:'日产液'},
                        { val:'DAILY_OIL_PROD', name:'日产油'},
                        { val:'DAILY_WATER_PROD', name:'日产水'},
                        { val:'DAILY_GAS_PROD', name:'日产气'},
                        { val:'WATER_RATIO', name:'含水'},
                        { val:'OIL_GAS_RATIO', name:'气油比'},
                        { val:'MONTHLY_CUMU_FLUID_PROD', name:'月累产液'},
                        { val:'MONTHLY_CUMU_OIL_PROD', name:'月累产油'},
                        { val:'MONTHLY_ACCUM_WATER_PROD', name:'月累产水'},
                        { val:'MONTHLY_CUMU_GAS_PROD', name:'月累产气'}
                    ],
                    this.totalList = [
                        { val:'YEAR_CUMU_FLUID_PROD', name:'年累产液' },
                        { val:'YEAR_CUMU_OIL_PROD', name:'年累产油' },
                        { val:'YEAR_ACCUM_WATER_PROD', name:'年累产水' },
                        { val:'YEAR_CUMU_GAS_PROD', name:'年累产气' }
                    ],
                    this.injectList = [
                        { val:'AVERAGE_OIL_PRESS', name:'平均油压'},
                        { val:'AVERAGE_MAINLINE_PRESS', name:'平均干线压力'},
                        { val:'DAILY_WATER_INJECT_AMOUNT', name:'日注水聚总量'},
                        { val:'MONTHLY_CUMUL_WATER_INJECT_AMOUNT', name:'月累注水聚总量'},
                        { val:'YEAR_CUMUL_WATER_INJECT_AMOUNT', name:'年累注水聚总量'}
                    ],
                    this.managerList=[
                        { val:'DAY_TOTAL_NUMBER_WELLS_PER', name:'日总井数'},
                        { val:'DAY_NUMBER_WELLS_OPENED_PER', name:'日开井数'},
                        { val:'TOTAL_DAILY_INJECTION_WELLS', name:'日注入总井数'},
                        { val:'NUMBER_DAILY_INJECTION_WELLS_OPENED', name:'日注入开井数'}
                    ]
                    break;
                //年
            case 'YproProDic'://'生产指标':
                if(this.activeTabIndex == '1'){
                    this.stateList = [],
                    this.productList = [
                        { val:'YEAR_CUMU_PROD_DAILY', name:'年累生产天数' },
                        { val:'FLUID_PROD_YEAR', name:'年产液' },
                        { val:'OIL_PROD_YEAR', name:'年产油' },
                        { val:'WATER_PROD_YEAR', name:'年产水' },
                        { val:'GAS_PROD_YEAR', name:'年产气' }
                    ],
                    this.totalList = [],
                    this.injectList = [],
                    this.managerList=[]
                }else if(this.activeTabIndex == '2' && this.activeTabIndexDate == 1){
                    //油田年生产指标
                    this.stateList = [],
                        this.productList = [],
                        this.totalList = [
                            { val:'INJ_WATER_YEAR', name:'年注水聚总量' },
                            { val:'YEAR_LIQUID_PRODUCT', name:'年产液' },
                            { val:'OIL_PRODUCTION_YEAR', name:'年产油' },
                            { val:'PROD_WATER_YEAR', name:'年产水' },
                            { val:'GAS_PRODUCTION_YEAR', name:'年产气' }
                        ],
                        this.injectList = [],
                        this.managerList=[]
                }

                break;
            case 'YverifyPro'://'核实生产':
                this.stateList = [],
                    this.productList = [],
                    this.totalList = [
                        { val:'MONTHLY_VE_PROD', name:'年累核实产量' },
                        { val:'MONTHLY_CUMU_NET_PROD', name:'年累净产量' }
                    ],
                    this.injectList = [],
                    this.managerList=[]
                break;
            case 'Yinject'://'注入指标':
                this.stateList = [],
                    this.productList = [
                        { val:'YEAR_CUMU_PROD_DAILY', name:'年累生产天数' },
                        { val:'YEAR_CUMUL_INJ_VOLUME', name:'年累注入量' }
                    ],
                    this.totalList = [],
                    this.injectList = [],
                    this.managerList=[]
                break;
                
                //油田
            case 'measure'://'油田措施日指标':
                this.stateList = [],
                    this.productList = [
                        { val:'DAILY_PROD_LIQUID', name:'日增产液'},
                        { val:'DAILY_INCOIL_PROD', name:'日增产油'},
                        { val:'DAILY_INCWATER_PROD', name:'日增产水'},
                        { val:'DAILY_INCGAS_PROD', name:'日增产气'}
                    ],
                    this.totalList = [
                        { val:'MONTHLY_ACCUM_PROD_SOLUT', name:'月累增产液'},
                        { val:'MONTHLY_CUMUL_INC_OIL_PROD', name:'月累增产油'},
                        { val:'MONTHLY_CUMUL_INC_WATER_PROD', name:'月累增产水'},
                        { val:'MONTHLY_CUMUL_INC_GAS_PROD', name:'月累增产气'},
                        { val:'YEAR_CUMUL_YIELD_INCREASE_LIQUID', name:'年累增产液'},
                        { val:'YEAR_CUMUL_INCR_OIL_PROD', name:'年累增产油'},
                        { val:'YEAR_CUMUL_INCR_WATER_PROD', name:'年累增产水'},
                        { val:'YEAR_CUMUL_INCR_GAS_PROD', name:'年累增产气'}
                    ],
                    this.injectList = [],
                    this.managerList=[
                        { val:'DAILY_MEASURE_WELLS', name:'日措施井次' },
                        { val:'MONTHLY_CUMUL_COUNT', name:'月累措施井次' },
                        { val:'YEAR_CUMUL_COUNT', name:'年累措施井次' }
                    ]
                break;
                //文档不全
            case 'MproProDic'://'油田月指标':
                this.stateList = [],
                    this.productList = [
                        { val:'SYN_WATER_RATIO', name:'综合含水'},
                        { val:'SYN_OIL_GAS_RATIO', name:'综合气油比'},
                        { val:'DAILY_LIQUID_PROD_LEVEL', name:'日产液水平'},
                        { val:'DAILY_OIL_PROD_LEVEL', name:'日产油水平'},
                        { val:'DAILY_WATER_PROD_LEVEL', name:'日产水水平'},
                        { val:'DAILY_GAS_PROD_LEVEL', name:'日产气水平'},
                        { val:'DAILY_LIQUID_PROD_CAP', name:'日产液能力'},
                        { val:'DAILY_OIL_PROD_CAP', name:'日产油能力'},
                        { val:'DAILY_WATER_PROD_CAP', name:'日产水能力'},
                        { val:'DAILY_GAS_PROD_CAP', name:'日产气能力'}
                    ],
                    this.totalList = [],
                    this.injectList = [
                        { val:'DAILY_LIQUID_INJ_LEVEL', name:'日注液水平'},
                        { val:'DAILY_WATER_INJ_LEVEL', name:'日注水水平'},
                        { val:'DAILY_GAS_INJ_LEVEL', name:'日注气水平'},
                        { val:'DAILY_LIQUID_INJ_CAPACITY', name:'日注液能力'},
                        { val:'DAILY_WATER_INJ_CAPACITY', name:'日注水能力'},
                        { val:'DAILY_GAS_INJ_CAPACITY', name:'日注气能力'}
                    ],
                    this.managerList=[]
                    // this.storeList = ['井口储采比','井口采油速度','井口采出油速度','剩余油储量','剩余气储量','剩余油采出速度','剩余气采出速度','剩余油采出程度','剩余气采出程度']
                break;
            case 'MverifyPro'://'核实生产月指标':
                    this.stateList = [],
                    this.productList = [],
                    this.totalList = [
                        { val:'MONTHLY_VE_PROD', name:'月累核实产量' },
                        { val:'MONTHLY_CUMU_NET_PROD', name:'月累净产量' }
                    ],
                    this.injectList = [],
                    this.managerList=[]
                break;
            case 'YverifyPro'://'核实生产年指标':
                this.stateList = [],
                    this.productList = [],
                    this.totalList = [
                        { val:'MONTHLY_VE_PROD',name:'年累核实产量' },
                        { val:'MONTHLY_CUMU_NET_PROD',name:'年累净产量' }
                    ],
                    this.injectList = [],
                    this.managerList=[]
                break;
            }
        },
        doSearch(val) {
            if(this.activeEchart){
                this.activeEchart = false
            }else{
                if(!this.selectDate){
                    this.$message.error('请选择日期查询！');
                    return;
                }
                this.dialogVisible = true
                this.tableData = []
                let newArr = this.stateValue.concat(this.productValue,this.totalValue,this.injectValue,this.managerValue,this.storeValue)
                let tableArr = []
                for(let i=0;i<newArr.length;i++){
                    tableArr.push({
                        type: "AND",
                        name: newArr[i],
                        model: ">",
                        val: ""
                    })
                }
                let header = this.stateList.concat(this.productList,this.totalList,this.injectList,this.managerList,this.storeList)
                this.headerText = []
                for(let i = 0;i<tableArr.length;i++){
                    this.headerText.push(header.filter((item) =>{
                        return item.val == tableArr[i].name
                    })[0])
                }
                this.headerTextLower = []
                this.headerText.forEach((item)=>{
                    this.headerTextLower.push({val:item.val.toLowerCase().replace(/_/g,''),name:item.name})
                })
                this.headerTextLower.unshift({name:'井名',val:'name'},{name:'生产时间',val:'proddate'})
                this.tableData = tableArr
            }
        },
        confirm(){
            let sqlStrAnd = '',sqlStrOr = '';
            let flag = true
            console.log(this.tableRow);
            this.tableRow.forEach((item)=>{
                if(item.type && item.name && item.model && item.val) {
                    if(item.type == 'AND'){
                        sqlStrAnd+=`${item.type} ${item.name} ${item.model} ${item.val} `                    
                    }else{
                        sqlStrOr+=`${item.type} ${item.name} ${item.model} ${item.val} `
                    }
                }else{
                    flag = false
                }
            })
            if(!flag){
                this.$message.error('请填写完整查询条件！');
                return 
            }
            let sqlStr = sqlStrAnd + sqlStrOr
            if (sqlStrOr) {sqlStr =  sqlStr.slice(0, sqlStr.lastIndexOf('AND')) + '( ' + sqlStr.slice(sqlStr.lastIndexOf('AND')) + ')'}else{
                sqlStr = sqlStrAnd
            }
            let condList = this.stateValue.concat(this.productValue,this.totalValue,this.injectValue,this.managerValue,this.storeValue)
            let condListFormat = []
            condList.forEach((item)=>{
                condListFormat.push(item.toLowerCase().replace(/_/g,''))
            })
            this.dialogVisible = false
            this.activeEchart = !this.activeEchart
            let params = {
                condList:condListFormat,//字段名字
                sqlSent:sqlStr,//拼接sql
                targetType: this.activeTabIndex, //目标类型 井：1  油田 ：2
                dataType:  this.activeTabIndexData , //数据类型 （井口指标，计量指标等）
                timeType:  this.activeTabIndexDate , //时间类型 1 年 2月 3 日
                startTime:  this.selectDate.length > 1?this.selectDate[0]:this.selectDate, //开始时间
                endTime: this.selectDate[1],//结束时间
                dataId:this.activeTabIndex == 2?this.ogfId:this.wellId
            }
            this.queryData = []
            queryCustomQueryList( params ).then((res)=>{
                this.queryData = res.data.data.data
            })
        },
        addRow(val){
            this.tableRow.push({} )
        },
        deleteRow(val){
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