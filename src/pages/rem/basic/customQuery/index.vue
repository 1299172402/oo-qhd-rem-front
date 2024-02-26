<template>
    <div class="app-container">
            <div
                style=" height: calc(100%);">
                <header-search>
                    <el-row style="margin: 20px 0">
                        <div style="display: inline-block">
                            <span>油田：</span>
                            <el-select v-model="ogfId" @change="choicewell">
                                <el-option
                                    v-for="(item, index) in oilFields"
                                    :key="index"
                                    :label="item.ogfName"
                                    :value="item.ogfId"
                                />
                            </el-select>
                            <span v-show="activeTabIndex == 1" style="padding-left: 20px">平台：</span>
                            <el-select v-show="activeTabIndex == 1"  v-model="platformId" @change="onPlatfromChange" :disabled="activeEchart">
                                <el-option v-for="(item, index) in plalist" :key="item.platformId"
                                           :label="item.platformCode"
                                           :value="item.platformId"/>
                            </el-select>
                            <span v-show="activeTabIndex == 1" style="padding-left: 20px">井号：</span>
                            <el-select v-show="activeTabIndex == 1" filterable v-model="wellId" multiple  collapse-tags :disabled="activeEchart">
                                <el-option v-for="(item, index) in wellData" :key="index" :label="item.wellName"
                                           :value="item.wellId"/>
                            </el-select>
                            <span style="padding-left: 20px">日期：</span>
                            <el-date-picker
                                v-show="activeTabIndexDate == 3"
                                v-model="selectDate"
                                type="daterange"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd"
                                :disabled="activeEchart"
                            />
                            <el-date-picker
                                v-show="activeTabIndexDate == 2"
                                v-model="selectDate"
                                type="monthrange"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM"
                                :disabled="activeEchart"
                            />
                            <el-date-picker
                                v-show="activeTabIndexDate == 1"
                                v-model="selectDate"
                                type="year"
                                placeholder="选择年份"
                                :disabled="activeEchart"
                            />
                        </div>
                        <div style="display: inline-block; float: right">
                            <el-button
                                icon="el-icon-search"
                                style="margin-right: 30px"
                                type="primary"
                                @click="doSearch"
                                v-if="activeEchart == true"
                            >返回
                            </el-button>
                        </div>
                    </el-row>
                </header-search>
                <page-panel-new :show-btn="true" v-if="!activeEchart"
                                style="min-height: calc(100% - 100px);height: 100%;overflow-y: scroll">
                    <el-row>
                        <div style="display: inline-block; float: right">
                            <el-button
                                icon="el-icon-search"
                                style="margin-right: 30px"
                                type="primary"
                                @click="doSearch"
                                v-if="activeEchart == false"
                            > 指标查询
                            </el-button>
                        </div>
                    </el-row>

                    <el-row>
                        <el-col :span="6" style="margin-left: 20px; margin-right: 20px">
                            <page-panel :show-btn="true" headerTitle="目标类型">
                                <el-radio-group @change="changetype" v-model="activeTabIndex">
                                    <el-radio :label="1"> 单井</el-radio>
                                    <el-radio :label="2"> 油田(区块)</el-radio>
                                </el-radio-group>
                            </page-panel>
                        </el-col>
                        <el-col :span="6" style="margin-left: 20px; margin-right: 20px">
                            <page-panel :show-btn="true" headerTitle="时间类型">
                                <el-radio-group v-model="activeTabIndexDate">
                                    <el-radio :label="3">日</el-radio>
                                    <el-radio :label="2">月</el-radio>
                                    <el-radio :label="1">年</el-radio>
                                </el-radio-group>
                            </page-panel>
                        </el-col>
                        <el-col :span="9" style="margin-left: 20px; margin-right: 20px">
                            <page-panel :show-btn="true" headerTitle="数据类型">
                                <el-radio-group v-model="activeTabIndexData">
                                    <el-radio :label="dataType.val" :key="index" v-for="(dataType,index) in dataTypes">
                                        {{ dataType.name }}
                                    </el-radio>
                                </el-radio-group>
                            </page-panel>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="8" style="margin-left: 20px; margin-right: 20px">
                            <page-panel :show-btn="true" headerTitle="状态指标" style="min-height: 250px"
                                        v-show="stateList.length != 0">
                                <el-row :gutter="10">
                                    <el-checkbox-group v-model="stateValue">
                                        <el-col v-for="item in stateList" :key="item.val" :span="6"
                                                style="min-width: 120px">
                                            <el-checkbox :label="item.val" :value="item.val">
                                                {{ item.name ? item.name : item }}
                                            </el-checkbox>
                                        </el-col>
                                    </el-checkbox-group>
                                </el-row>
                            </page-panel>
                        </el-col>
                        <el-col :span="6" style="margin-left: 20px; margin-right: 20px">
                            <page-panel
                                :show-btn="true"
                                headerTitle="生产指标"
                                style="min-height: 250px"
                                v-show="productList.length != 0"
                            >
                                <el-row :gutter="10">
                                    <el-checkbox-group v-model="productValue">
                                        <el-col v-for="item in productList" :key="item.val" :span="8"
                                                style="min-width: 120px">
                                            <el-checkbox :label="item.val" :value="item.val">
                                                {{ item.name ? item.name : item }}
                                            </el-checkbox>
                                        </el-col>
                                    </el-checkbox-group>
                                </el-row>
                            </page-panel>
                        </el-col>
                        <el-col :span="8" style="margin-left: 20px; margin-right: 20px">
                            <page-panel :show-btn="true" headerTitle="累产指标" style="min-height: 250px"
                                        v-show="totalList.length != 0">
                                <el-row :gutter="10">
                                    <el-checkbox-group v-model="totalValue">
                                        <el-col v-for="item in totalList" :key="item.val" :span="6"
                                                style="min-width: 120px">
                                            <el-checkbox :label="item.val" :value="item.val">
                                                {{ item.name ? item.name : item }}
                                            </el-checkbox>
                                        </el-col>
                                    </el-checkbox-group>
                                </el-row>
                            </page-panel>
                        </el-col>
                        <el-col :span="8" style="margin-left: 20px; margin-right: 20px">
                            <page-panel :show-btn="true" headerTitle="注入指标" style="min-height: 250px"
                                        v-show="injectList.length != 0">
                                <el-row :gutter="10">
                                    <el-checkbox-group v-model="injectValue">
                                        <el-col v-for="item in injectList" :key="item.val" :span="6"
                                                style="min-width: 120px">
                                            <el-checkbox :label="item.val" :value="item.val">
                                                {{ item.name ? item.name : item }}
                                            </el-checkbox>
                                        </el-col>
                                    </el-checkbox-group>
                                </el-row>
                            </page-panel>
                        </el-col>
                        <el-col :span="8" style="margin-left: 20px; margin-right: 20px">
                            <page-panel
                                :show-btn="true"
                                headerTitle="管理指标"
                                style="min-height: 250px"
                                v-show="managerList.length != 0"
                            >
                                <el-row :gutter="10">
                                    <el-checkbox-group v-model="managerValue">
                                        <el-col v-for="item in managerList" :key="item.val" :span="6"
                                                style="min-width: 120px">
                                            <el-checkbox :label="item.val" :value="item.val">
                                                {{ item.name ? item.name : item }}
                                            </el-checkbox>
                                        </el-col>
                                    </el-checkbox-group>
                                </el-row>
                            </page-panel>
                        </el-col>
                        <el-col :span="8" style="margin-left: 20px; margin-right: 20px">
                            <page-panel :show-btn="true" headerTitle="储采指标" style="min-height: 250px"
                                        v-show="storeList.length != 0">
                                <el-row :gutter="10">
                                    <el-checkbox-group v-model="storeValue">
                                        <el-col v-for="item in storeList" :key="item.val" :span="6"
                                                style="min-width: 120px">
                                            <el-checkbox :label="item.val" :value="item.val">
                                                {{ item.name ? item.name : item }}
                                            </el-checkbox>
                                        </el-col>
                                    </el-checkbox-group>
                                </el-row>
                            </page-panel>
                        </el-col>
                    </el-row>
                </page-panel-new>
                <page-panel
                    headerTitle="自定义查询"
                    :show-btn="true"
                    v-else-if="activeEchart"
                    style="height: calc(100% - 112px); padding-bottom: 60px"
                >
                    <el-button size="mini" @click="downexcel()" type="primary" icon="el-icon-download"
                               style="float: right;margin-bottom: 10px">下载
                    </el-button>
                    <el-table
                        :row-style="{ height: '0px' }"
                        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
                        :data="queryData"
                        height="calc(100% - 30px)"
                        border
                        id="zdycxtab"
                        header-cell-class-name="table_header"
                        :cell-style="{ padding: '6px', 'text-align': 'center' }"
                        style="margin: 20px 0; height: calc(100% - 125px)"
                        :default-sort="{ prop: 'date', order: 'descending' }"
                    >
                        <el-table-column
                            :key="index"
                            :prop="item.val"
                            :label="item.name"
                            min-width="160"
                            v-for="(item, index) in headerTextLower"
                        ></el-table-column>
                    </el-table>
                    <el-table
                        :row-style="{ height: '0px' }"
                        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
                        :data="dowload"
                        height="100%"
                        id="zdycx"
                        v-show="false"
                        header-cell-class-name="table_header"
                        :cell-style="{ padding: '6px', 'text-align': 'center' }"
                        style="margin: 20px 0; height: calc(100% - 125px)"
                        :default-sort="{ prop: 'date', order: 'descending' }"
                    >
                        <el-table-column
                            :key="index"
                            :prop="item.val"
                            :label="item.name"
                            min-width="160"
                            v-for="(item, index) in headerTextLower"
                        >
                        </el-table-column>
                    </el-table>
                    <pagination
                        v-if="pageTotal"
                        :pageSizes="[15, 20, 40, 100]"
                        :total="pageTotal"
                        :page.sync="page"
                        :limit.sync="pageSize"
                        @pagination="pagination"
                    />
                </page-panel>
                <el-dialog title="查询" :visible.sync="dialogVisible" width="720px" :close-on-click-modal="false">
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
                        <el-table-column prop="type" label="关系" width="110">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.type" size="small">
                                    <el-option label="且" value="AND"/>
                                    <el-option label="或" value="OR"/>
                                </el-select>
                            </template>
                        </el-table-column>

                        <el-table-column prop="name" label="指标" width="170">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.name" size="small">
                                    <el-option :key="index" :label="item.name" :value="item.val"
                                               v-for="(item,index) in headerText"/>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column prop="model" label="条件" width="110">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.model" size="small">
                                    <el-option label=">" value="gt"/>
                                    <el-option label="<" value="lt"/>
                                    <el-option label=">=" value="gteq"/>
                                    <el-option label="<=" value="lteq"/>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column prop="val" label="值" width="130">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.val" size="smaller"/>
                            </template>
                        </el-table-column>
                        <el-table-column prop="val" label="操作" width="130">
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
        </div>
</template>

<script>
import {queryCustomQueryList} from "@/api/basic/basic";
import {fetchProductionWells} from "@/api/oilDeposit/rem-02/primaryinfo.js";
import {
    QueryOgfDetail, QueryPlatformDetail,
    QueryWellDetail, userListByUserNames
} from "@/api/basic/master";
import {exportExcel} from "@/lib/exportExcel";
import treeMultipleSelection from "@/pages/rem/basic/components/index.vue";
import treeSelectionAll from "@/pages/rem/basic/components/treeSelectionAll.vue";

export default {
    components: {
        treeSelectionAll,
        treeMultipleSelection
    },
    name: "customQuery",
    mounted() {
        const year = new Date().getFullYear();
        this.selectDate = [new Date(`${year}-01-01`).format("yyyy-MM-dd"), new Date().format("yyyy-MM-dd")];

        this.initData();
    },
    data() {
        return {
            // 主数据树结构默认选中的值
            defaultCheckedKeys: [],
            params: "",
            key: 1,
            type: 1,
            listdata: [], //树形数组
            pageTotal: 0,
            page: 1,
            orgId: '',
            pageSize: 15,
            queryData: [],
            dowload: [],
            typeVal: 0,
            selectDate: [], //时间选择
            activeEchart: false,
            activeTabIndex: 1,
            activeTabIndexDate: 3,
            activeTabIndexData: "wellhead",
            stateValue: [], //状态指标
            productValue: [], //生产指标
            totalValue: [], //累产指标
            injectValue: [], //注入指标
            managerValue: [], //管理指标
            storeValue: [], //储采指标
            dialogVisible: false,
            ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
            wellId: [],
            platformId:'',
            oilFields: [],
            wellData: [],
            plalist:[],
            dataTypes: [
                {val: "wellhead", name: "井口生产指标"},
                {val: "proProDic", name: "计量生产指标"},
                {val: "verifyPro", name: "核实生产指标"},
                {val: "inject", name: "注入指标"},
            ],
            stateList: [
                {val: "NOZZLE_DIAMETER", name: "油嘴直径", unit: "mm"},
                {val: "WH_TEMP", name: "井口温度", unit: "℃"},
                {val: "DH_FLOWING_TEMP", name: "油压", unit: "MPa"},
                {val: "CSG_PRESS", name: "套压", unit: "MPa"},
                {val: "BACK_PRESS", name: "回压", unit: "MPa"},
                {val: "DH_FLOWING_PRESS", name: "井底流压", unit: "MPa"},
                {val: "PUMP_FREQUENCY", name: "泵频率", unit: "Hz"},
                {val: "PUMP_CURRENT", name: "泵电流", unit: "A"},
                {val: "PUMP_VOLTAGE", name: "泵电压", unit: "V"},
                {val: "PUMP_INLET_PRESS", name: "泵吸入口压力", unit: "MPa"},
                {val: "PUMP_OUTLET_PRESS", name: "泵出口压力", unit: "MPa"},
            ],
            productList: [
                {val: "FLUID_PROD_DAILY", name: "日产液", unit: "m³"},
                {val: "OIL_PROD_DAILY", name: "日产油", unit: "m³"},
                {val: "WATER_PROD_DAILY", name: "日产水", unit: "m³"},
                {val: "GAS_PROD_DAILY", name: "日产气", unit: "m³"},
                {val: "WATER_RATIO", name: "含水", unit: "%"},
                {val: "OIL_GAS_RATIO", name: "气油比", unit: "m³/m³"},
            ],
            totalList: [
                {val: "MONTH_PROD_DURATION", name: "月累生产时长", unit: "h"},
                {val: "YEAR_PROD_DURATION", name: "年累生产时长", unit: "h"},
                {val: "MONTHLY_CUMU_FLUID_PROD", name: "月累产液", unit: "m³"},
                {val: "MONTHLY_CUMU_OIL_PROD", name: "月累产油", unit: "m³"},
                {val: "MONTHLY_ACCUM_WATER_PROD", name: "月累产水", unit: "m³"},
                {val: "MONTHLY_CUMU_GAS_PROD", name: "月累产气", unit: "m³"},
                {val: "YEAR_CUMU_FLUID_PROD", name: "年累产液", unit: "m³"},
                {val: "YEAR_CUMU_OIL_PROD", name: "年累产油", unit: "m³"},
                {val: "YEAR_ACCUM_WATER_PROD", name: "年累产水", unit: "m³"},
                {val: "YEAR_CUMU_GAS_PROD", name: "年累产气", unit: "m³"},
                {val: "REMAKE", name: "备注", unit: ""},
            ],
            injectList: [],
            managerList: [], //管理指标
            storeList: [], //储采指标
            tableData: [], //弹窗表格数据
            tableRow: [],
            headerText: [], //生成标题数据
            headerTextLower: [],
        };
    },
    computed: {},

    watch: {
        // 监听目标类型
        activeTabIndex: {
            handler(Nval) {
                this.activeTabIndexDate = 3;
                //判断类型
                if (Nval == 1) {
                    //单井
                    this.activeTabIndexData = "wellhead"; //'井口生产指标'
                    this.dataTypes = [
                        {val: "wellhead", name: "井口生产指标"},
                        {val: "proProDic", name: "计量生产指标"},
                        {val: "verifyPro", name: "核实生产指标"},
                        {val: "inject", name: "注入指标"},
                    ];
                } else {
                    //油田
                    this.activeTabIndexData = "YTproProDic"; //'生产指标'
                    this.dataTypes = [
                        {val: "YTproProDic", name: "生产指标"},
                        {val: "verifyPro", name: "核实生产指标"},
                        {val: "measure", name: "油田措施日指标"},
                    ];
                }
                this.changeList();
            },
        },

        //监听年月日
        activeTabIndexDate: {
            handler(Nval) {
                this.tableData = [];
                if (this.activeTabIndex == 1) {
                    switch (Nval) {
                    case 3:
                        this.selectDate = [
                            new Date(`${new Date().getFullYear()}-01-01`).format("yyyy-MM-dd"),
                            new Date().format("yyyy-MM-dd"),
                        ];
                        this.activeTabIndexData = "wellhead"; //井口生产指标
                        this.dataTypes = [
                            {val: "wellhead", name: "井口生产指标"},
                            {val: "proProDic", name: "计量生产指标"},
                            {val: "verifyPro", name: "核实生产指标"},
                            {val: "inject", name: "注入指标"},
                        ];
                        break;
                    case 2:
                        this.selectDate = [
                            new Date(`${new Date().getFullYear()}-01`).format("yyyy-MM"),
                            new Date().format("yyyy-MM"),
                        ];
                        this.activeTabIndexData = "Mwellhead"; //'井口月生产'
                        this.dataTypes = [
                            {val: "Mwellhead", name: "井口月生产"},
                            {val: "MverifyPro", name: "核实月生产"},
                            {val: "Minject", name: "注入月指标"},
                        ];
                        break;
                    case 1:
                        this.selectDate = new Date().format("yyyy");
                        this.activeTabIndexData = "YproProDic"; //'生产指标'
                        this.dataTypes = [
                            {val: "YproProDic", name: "生产指标"},
                            {val: "YverifyPro", name: "核实生产"},
                            {val: "Yinject", name: "注入指标"},
                        ];
                        break;
                    }
                } else {
                    switch (Nval) {
                    case 3:
                        this.selectDate = [
                            new Date(`${new Date().getFullYear()}-01-01`).format("yyyy-MM-dd"),
                            new Date().format("yyyy-MM-dd"),
                        ];
                        this.activeTabIndexData = "YTproProDic"; //'生产指标'
                        this.dataTypes = [
                            {val: "YTproProDic", name: "生产指标"},
                            {val: "verifyPro", name: "核实生产指标"},
                            {val: "measure", name: "油田措施日指标"},
                        ];
                        break;
                    case 2:
                        this.selectDate = [
                            new Date(`${new Date().getFullYear()}-01`).format("yyyy-MM"),
                            new Date().format("yyyy-MM"),
                        ];
                        this.activeTabIndexData = "MproProDic"; //'油田月指标'
                        this.dataTypes = [
                            {val: "MproProDic", name: "油田月指标"},
                            {val: "MverifyPro", name: "核实生产月指标"},
                        ];
                        break;
                    case 1:
                        this.selectDate = new Date().format("yyyy");
                        this.activeTabIndexData = "YproProDic"; //'生产指标'
                        this.dataTypes = [
                            {val: "YproProDic", name: "生产指标"},
                            {val: "YverifyPro", name: "核实生产年指标"},
                        ];
                        break;
                    }
                }
                this.changeList();
            },
        },
        //监听数据类型
        activeTabIndexData: {
            handler(Nval) {
                this.changeList();
            },
        },
    },
    created() {
    },
    methods: {
        getSelectItems(selectList, selectData) {
            // let ogfId = selectList.ogfId;
            // let wellIds = selectList.wellIds;
            //
            // let ogfIdOld = this.ogfId;
            // let wellIdsOld = this.wellId;
            //
            // if (ogfId != ogfIdOld) {
            //     this.queryData.ogfId = ogfId;
            //     this.choicewell(ogfId);
            // }else if (wellIds != wellIdsOld) {
            //     this.queryData.wellId = wellIds;
            //     this.changewell(wellIds);
            // }
            // let ttt=this.$refs.treeSelectionAll.deptOptions;
        },
       
       async changetype(val) {
            if (val == 1) {
                let ogfId = "3FC9A818F5BC43B88270DB80BBB3018F";
                const request = {
                    ogfId,
                };
              await  QueryPlatformDetail(ogfId).then((res)=>{
                    this.plalist = res.data.data
                  
                })
                await  QueryWellDetail(request).then((res) => {
                        this.wellData = res.data.data;
                        this.key++
                });
            } else {
                this.key++
            }
        },
       async choicewell(val) {
            this.platformId = ''
           this.wellId = []
           await  QueryPlatformDetail({ogfId:this.ogfId}).then((res)=>{
               this.plalist = res.data.data
               this.platformId = this.plalist[0].platformId
           })
           await QueryWellDetail({ogfId: this.ogfId,platformId: this.platformId}).then((res) => {
               if (res.data.code == 200) {
                   this.wellData = res.data.data;
                   this.wellId = [`${res.data.data[0].wellId}`]
                   this.key++
               }
           });
        },
        onPlatfromChange(val) {
            this.wellId = []
            QueryWellDetail({platformId: val, ogfId: this.ogfId}).then((res) => {
                this.wellData = res.data.data;
                this.wellId = [`${res.data.data[0].wellId}`]
            })
            // await this.queryserch()
        },
       async initData() {
            //查询条件
            let params = {
                searchKeys: [this.$store.getters["user/userDetail"].user.userName],
            }
           await userListByUserNames(params).then((res) => {
                this.orgId = (res.data.data[0]?.currentTenantBindOrgId) ? res.data.data[0].currentTenantBindOrgId : undefined;
               
            })
           await QueryOgfDetail({operationZoneId: this.orgId}).then(res => {
               if (res.data.code == 200) {
                   this.oilFields = res.data.data
               }
           })
            await  QueryPlatformDetail({ogfId:this.ogfId}).then((res)=>{
                this.plalist = res.data.data
                this.platformId = this.plalist[0].platformId
            })
            await QueryWellDetail({ogfId: this.ogfId,platformId: this.platformId}).then((res) => {
                if (res.data.code == 200) {
                    this.wellData = res.data.data;
                    this.wellId = [`${res.data.data[0].wellId}`]
                    this.key++
                }
            });
        },
        childinfo(val) {
            if (val.length > 3) {
                this.wellId = val[3].value
            } else {
                this.wellId = ''
            }
        },
        changeList() {
            //切换tab
            let Nval = this.activeTabIndexData;
            this.tableRow = [];
            (this.stateValue = []),
                (this.productValue = []),
                (this.totalValue = []),
                (this.injectValue = []),
                (this.managerValue = []),
                (this.storeList = []);
            switch (Nval) {
                //日
            case "wellhead": //'井口生产指标':
                (this.stateList = [
                    {val: "NOZZLE_DIAMETER", name: "油嘴直径", unit: "mm"},
                    {val: "WH_TEMP", name: "井口温度", unit: "℃"},
                    {val: "DH_FLOWING_TEMP", name: "油压", unit: "MPa"},
                    {val: "CSG_PRESS", name: "套压", unit: "MPa"},
                    {val: "BACK_PRESS", name: "回压", unit: "MPa"},
                    {val: "DH_FLOWING_PRESS", name: "井底流压", unit: "MPa"},
                    {val: "PUMP_FREQUENCY", name: "泵频率", unit: "Hz"},
                    {val: "PUMP_CURRENT", name: "泵电流", unit: "A"},
                    {val: "PUMP_VOLTAGE", name: "泵电压", unit: "V"},
                    {val: "PUMP_INLET_PRESS", name: "泵吸入口压力", unit: "MPa"},
                    {val: "PUMP_OUTLET_PRESS", name: "泵出口压力", unit: "MPa"},
                ]),
                    (this.productList = [
                        {val: "FLUID_PROD_DAILY", name: "日产液", unit: "m³"},
                        {val: "OIL_PROD_DAILY", name: "日产油", unit: "m³"},
                        {val: "WATER_PROD_DAILY", name: "日产水", unit: "m³"},
                        {val: "GAS_PROD_DAILY", name: "日产气", unit: "m³"},
                        {val: "WATER_RATIO", name: "含水", unit: "%"},
                        {val: "OIL_GAS_RATIO", name: "气油比", unit: "m³/m³"},
                    ]),
                    (this.totalList = [
                        {val: "MONTH_PROD_DURATION", name: "月累生产时长", unit: "h"},
                        {val: "YEAR_PROD_DURATION", name: "年累生产时长", unit: "h"},
                        {val: "MONTHLY_CUMU_FLUID_PROD", name: "月累产液", unit: "m³"},
                        {val: "MONTHLY_CUMU_OIL_PROD", name: "月累产油", unit: "m³"},
                        {val: "MONTHLY_ACCUM_WATER_PROD", name: "月累产水", unit: "m³"},
                        {val: "MONTHLY_CUMU_GAS_PROD", name: "月累产气", unit: "m³"},
                        {val: "YEAR_CUMU_FLUID_PROD", name: "年累产液", unit: "m³"},
                        {val: "YEAR_CUMU_OIL_PROD", name: "年累产油", unit: "m³"},
                        {val: "YEAR_ACCUM_WATER_PROD", name: "年累产水", unit: "m³"},
                        {val: "YEAR_CUMU_GAS_PROD", name: "年累产气", unit: "m³"},
                        {val: "REMAKE", name: "备注", unit: ""},
                    ]),
                    (this.injectList = []),
                    (this.managerList = []);
                break;
            case "proProDic": //'计量生产指标':
                (this.stateList = [
                    {val: "CALCUL_DATE", name: "计量时间", unit: "h"},
                    {val: "NOZZLE_DIAMETER", name: "油嘴直径", unit: "mm"},
                    {val: "WH_TEMP", name: "井口温度", unit: "℃"},
                    {val: "DH_FLOWING_TEMP", name: "油压", unit: "MPa"},
                    {val: "CSG_PRESS", name: "套压", unit: "MPa"},
                    {val: "FLOWING_TEMP", name: "井底流温", unit: "℃"},
                    {val: "DH_FLOWING_PRESS", name: "井底流压", unit: "MPa"},
                    {val: "PUMP_FREQUENCY", name: "泵频率", unit: "Hz"},
                    {val: "PUMP_CURRENT", name: "泵电流", unit: "A"},
                    {val: "PUMP_VOLTAGE", name: "泵电压", unit: "V"},
                    {val: "PUMP_INLET_TEMP", name: "泵入口温度", unit: "℃"},
                    {val: "PUMP_MOTOR_TEMP", name: "泵马达温度", unit: "℃"},
                    {val: "PUMP_INLET_PRESS", name: "泵入口压力", unit: "MPa"},
                    {val: "PUMP_OUTLET_PRESS", name: "泵出口压力", unit: "MPa"},
                    {val: "GAS_LIFT_CHOKE_DIAMETER", name: "气举嘴直径", unit: "mm"},
                    {val: "GAS_LIFT_PRESS", name: "气举压力", unit: "MPa"},
                ]),
                    (this.productList = [
                        {val: "ACTUAL_DAILY_LIQUID_PROD", name: "实际日产液", unit: "m³"},
                        {val: "ACTUAL_DAILY_OIL_PROD", name: "实际日产油", unit: "m³"},
                        {val: "ACTUAL_DAILY_WATER_PROD", name: "实际日产水", unit: "m³"},
                        {val: "ACTUAL_DAILY_GAS_PROD", name: "实际日产气", unit: "m³"},
                        {val: "WATER_RATIO", name: "含水", unit: "%"},
                        {val: "GAS_OIL_RATIO", name: "气油比", unit: "m³/m³"},
                        {val: "OIL_GAS_RATIO", name: "油气比", unit: "m³/m³"},
                        {val: "WATER_GAS_RATIO", name: "水气比", unit: "m³/m³"},
                    ]),
                    (this.totalList = []),
                    (this.injectList = []),
                    (this.managerList = []);
                break;
            case "verifyPro": //'核实生产指标':
                if (this.activeTabIndex == "1") {
                    (this.stateList = []),
                        (this.productList = [
                            {val: "DAILY_VE_PROD", name: "日核实产量", unit: "m³"},
                            {val: "DAILY_CUMU_NET_PROD", name: "日净产量", unit: "m³"},
                        ]),
                        (this.totalList = [
                            {val: "MONTHLY_VE_PROD", name: "月累核实产量", unit: "m³"},
                            {val: "MONTHLY_CUMU_NET_PROD", name: "月累净产量", unit: "m³"},
                            {val: "YEAR_VE_PROD", name: "年累核实产量", unit: "m³"},
                            {val: "YEAR_CUMU_NET_PROD", name: "年累净产量", unit: "m³"},
                        ]),
                        (this.injectList = []),
                        (this.managerList = []);
                } else {
                    //油田日核实生产指标
                    (this.stateList = []),
                        (this.productList = [
                            {val: "DAILY_VE_PROD", name: "日核实产量", unit: "m³"},
                            {val: "DAILY_CUMU_NET_PROD", name: "日净产量", unit: "m³"},
                        ]),
                        (this.totalList = [
                            {val: "MONTHLY_VE_PROD", name: "月累核实产量", unit: "m³"},
                            {val: "MONTHLY_CUMU_NET_PROD", name: "月累净产量", unit: "m³"},
                            {val: "MONTHLY_VERIFICA_AIR_DEFENSE_VOLUME", name: "月累核实放空量", unit: "m³"},
                            {val: "MONTHLY_VERI_VOLUME", name: "月累核实外输量", unit: "m³"},
                            {val: "YEAR_VE_PROD", name: "年累核实产量", unit: "m³"},
                            {val: "YEAR_VE_OIL_EQUI", name: "年累核实油当量", unit: "m³"},
                            {val: "YEAR_CUMU_NET_PROD", name: "年累净产量", unit: "m³"},
                            {val: "YEAR_VER_SELF_CONSUMPTION", name: "年累核实自用量", unit: "m³"},
                            {val: "YEAR_VER_RELEASE_VOLUME", name: "年累核实放空量", unit: "m³"},
                            {val: "YEAR_VER_EXPORT_VOLUME", name: "年累核实外输量", unit: "m³"},
                        ]),
                        (this.injectList = []),
                        (this.managerList = []);
                }
                break;

            case "inject": //'注入指标':
                (this.stateList = [
                    {val: "PROD_DATE", name: "生产时间", unit: "yyyy-mm-dd"},
                    {val: "WATER_NOZZLE_DIAMETER", name: "水嘴直径", unit: "mm"},
                    {val: "MAINLINE_PRESSURE", name: "干线压力", unit: "MPa"},
                    {val: "DH_FLOWING_TEMP", name: "油压", unit: "MPa"},
                    {val: "CSG_PRESS", name: "套压", unit: "MPa"},
                    {val: "STATIC_PRESS", name: "静压", unit: "MPa"},
                    {val: "FLOW_PRESS", name: "流压", unit: "MPa"},
                    {val: "DAILY_INJ_POUR_VOLUME", name: "日注入量", unit: "m³"},
                    {val: "DAILY_INJECTION_VOLUME", name: "日配注量", unit: "m³"},
                ]),
                    (this.productList = [
                        {val: "MONTHLY_CUMULATIVE_PRODUCTION_TIME", name: "月累生产时长", unit: "h"},
                        {val: "YEAR_CUMULATIVE_PRODUCTION_TIME", name: "年累生产时长", unit: "h"},
                        {val: "MONTHLY_CUMULATIVE_INJECTION_VOLUME", name: "月累注入量", unit: "m³"},
                        {val: "YEAR_CUMULATIVE_INJECTION_VOLUME", name: "年累注入量", unit: "m³"},
                        {val: "REMARK", name: "备注", unit: ""},
                    ]),
                    (this.totalList = []),
                    (this.injectList = []),
                    (this.managerList = []);
                break;
                //月
            case "Mwellhead": //'井口月生产':
                (this.stateList = [
                    {val: "MONTHLY_PROD_DAYS", name: "月生产天数", unit: "d"},
                    {val: "OIL_NOZZLE", name: "油嘴", unit: "mm"},
                    {val: "WH_TEMP", name: "井口温度", unit: "℃"},
                    {val: "DH_FLOWING_TEMP", name: "油压", unit: "MPa"},
                    {val: "CSG_PRESS", name: "套压", unit: "MPa"},
                    {val: "BACK_PRESS", name: "回压", unit: "MPa"},
                    {val: "PUMP_INLET_PRESS", name: "泵吸入口压力", unit: "MPa"},
                    {val: "PUMP_OUTLET_PRESS", name: "泵出口压力", unit: "MPa"},
                ]),
                    (this.productList = [
                        {val: "MONTHLY_LIQUID_PROD", name: "月产液", unit: "m³"},
                        {val: "MONTHLY_OIL_PROD", name: "月产油", unit: "m³"},
                        {val: "MONTHLY_WATER_PROD", name: "月产水", unit: "m³"},
                        {val: "MONTHLY_GAS_PROD", name: "月产气", unit: "m³"},
                        {val: "DAILY_LIQUID_PROD_LEVEL", name: "日产液水平", unit: "m³"},
                        {val: "DAILY_OIL_PROD_LEVEL", name: "日产油水平", unit: "m³"},
                        {val: "DAILY_WATER_PROD_LEVEL", name: "日产水水平", unit: "m³"},
                        {val: "DAILY_GAS_PROD_LEVEL", name: "日产气水平", unit: "m³"},
                        {val: "DAILY_LIQUID_PROD_CAP", name: "日产液能力", unit: "m³"},
                        {val: "DAILY_OIL_PROD_CAP", name: "日产油能力", unit: "m³"},
                        {val: "DAILY_WATER_PROD_CAP", name: "日产水能力", unit: "m³"},
                        {val: "DAILY_GAS_PROD_CAP", name: "日产气能力", unit: "m³"},
                        {val: "GAS_OIL_RATIO", name: "气油比", unit: "m³/m³"},
                        {val: "OIL_GAS_RATIO", name: "油气比", unit: "m³/m³"},
                        {val: "WATER_GAS_RATIO", name: "水气比", unit: "m³/m³"},
                        {val: "WATER_RATIO", name: "含水", unit: "%"},
                    ]),
                    (this.totalList = [
                        {val: "YEAR_CUMU_PROD_DAILY", name: "年累生产天数", unit: "d"},
                        {val: "YEAR_CUMU_FLUID_PROD", name: "年累产液", unit: "m³"},
                        {val: "YEAR_CUMU_OIL_PROD", name: "年累产油", unit: "m³"},
                        {val: "YEAR_ACCUM_WATER_PROD", name: "年累产水", unit: "m³"},
                        {val: "YEAR_CUMU_GAS_PROD", name: "年累产气", unit: "m³"},
                    ]),
                    (this.injectList = []),
                    (this.managerList = []);
                break;
            case "MverifyPro": //'核实月生产':
                (this.stateList = []),
                    (this.productList = []),
                    (this.totalList = [
                        {val: "MONTHLY_VE_PROD", name: "月累核实产量", unit: "m³"},
                        {val: "MONTHLY_CUMU_NET_PROD", name: "月累净产量", unit: "m³"},
                    ]),
                    (this.injectList = []),
                    (this.managerList = []);
                break;
            case "Minject": //'注入月指标':
                (this.stateList = [
                    {val: "MONTHLY_PROD_DAYS", name: "月生产天数", unit: "d"},
                    {val: "WATER_NOZZLE_DIAMETER", name: "水嘴直径", unit: "mm"},
                    {val: "MAINLINE_PRESSURE", name: "干线压力", unit: "MPa"},
                    {val: "DH_FLOWING_TEMP", name: "油压", unit: "MPa"},
                    {val: "CSG_PRESS", name: "套压", unit: "MPa"},
                    {val: "DAILY_INJ_VOL", name: "日配注入量", unit: "m³"},
                    {val: "DAILY_AVG_INJ_VOL", name: "日均注入量", unit: "m³"},
                ]),
                    (this.productList = []),
                    (this.totalList = []),
                    (this.injectList = [
                        {val: "YEAR_CUMU_PROD_DAILY", name: "年累生产天数", unit: "m³"},
                        {val: "MONTHLY_INJECT_VOL", name: "月注入量", unit: "m³"},
                        {val: "YEAR_CUMUL_INJ_VOLUME", name: "年累注入量", unit: "m³"},
                    ]),
                    (this.managerList = []);
                break;
            case "YTproProDic": //'生产指标'://油田日的生产指标
                (this.stateList = []),
                    (this.productList = [
                        {val: "DAILY_LIQUID_PROD", name: "日产液", unit: "m³"},
                        {val: "DAILY_OIL_PROD", name: "日产油", unit: "m³"},
                        {val: "DAILY_WATER_PROD", name: "日产水", unit: "m³"},
                        {val: "DAILY_GAS_PROD", name: "日产气", unit: "m³"},
                        {val: "WATER_RATIO", name: "含水", unit: "%"},
                        {val: "OIL_GAS_RATIO", name: "气油比", unit: "m³/m³"},
                        {val: "MONTHLY_CUMU_FLUID_PROD", name: "月累产液", unit: "m³"},
                        {val: "MONTHLY_CUMU_OIL_PROD", name: "月累产油", unit: "m³"},
                        {val: "MONTHLY_ACCUM_WATER_PROD", name: "月累产水", unit: "m³"},
                        {val: "MONTHLY_CUMU_GAS_PROD", name: "月累产气", unit: "m³"},
                    ]),
                    (this.totalList = [
                        {val: "YEAR_CUMU_FLUID_PROD", name: "年累产液", unit: "m³"},
                        {val: "YEAR_CUMU_OIL_PROD", name: "年累产油", unit: "m³"},
                        {val: "YEAR_ACCUM_WATER_PROD", name: "年累产水", unit: "m³"},
                        {val: "YEAR_CUMU_GAS_PROD", name: "年累产气", unit: "m³"},
                    ]),
                    (this.injectList = [
                        {val: "AVERAGE_OIL_PRESS", name: "平均油压", unit: "MPa"},
                        {val: "AVERAGE_MAINLINE_PRESS", name: "平均干线压力", unit: "MPa"},
                        {val: "DAILY_WATER_INJECT_AMOUNT", name: "日注水聚总量", unit: "m³"},
                        {val: "MONTHLY_CUMUL_WATER_INJECT_AMOUNT", name: "月累注水聚总量", unit: "m³"},
                        {val: "YEAR_CUMUL_WATER_INJECT_AMOUNT", name: "年累注水聚总量", unit: "m³"},
                    ]),
                    (this.managerList = [
                        {val: "DAY_TOTAL_NUMBER_WELLS_PER", name: "日生产总井数", unit: "口"},
                        {val: "DAY_NUMBER_WELLS_OPENED_PER", name: "日生产开井数", unit: "口"},
                        {val: "TOTAL_DAILY_INJECTION_WELLS", name: "日注入总井数", unit: "口"},
                        {val: "NUMBER_DAILY_INJECTION_WELLS_OPENED", name: "日注入开井数", unit: "口"},
                    ]);
                break;
                //年
            case "YproProDic": //'生产指标':
                if (this.activeTabIndex == "1") {
                    (this.stateList = []),
                        (this.productList = [
                            {val: "YEAR_CUMU_PROD_DAILY", name: "年累生产天数", unit: "d"},
                            {val: "FLUID_PROD_YEAR", name: "年产液", unit: "m³"},
                            {val: "OIL_PROD_YEAR", name: "年产油", unit: "m³"},
                            {val: "WATER_PROD_YEAR", name: "年产水", unit: "m³"},
                            {val: "GAS_PROD_YEAR", name: "年产气", unit: "m³"},
                        ]),
                        (this.totalList = []),
                        (this.injectList = []),
                        (this.managerList = []);
                } else if (this.activeTabIndex == "2" && this.activeTabIndexDate == 1) {
                    //油田年生产指标
                    (this.stateList = []),
                        (this.productList = []),
                        (this.totalList = [
                            {val: "INJ_WATER_YEAR", name: "年注水聚总量", unit: "m³"},
                            {val: "YEAR_LIQUID_PRODUCT", name: "年产液", unit: "m³"},
                            {val: "OIL_PRODUCTION_YEAR", name: "年产油", unit: "m³"},
                            {val: "PROD_WATER_YEAR", name: "年产水", unit: "m³"},
                            {val: "GAS_PRODUCTION_YEAR", name: "年产气", unit: "m³"},
                        ]),
                        (this.injectList = []),
                        (this.managerList = []);
                }

                break;
            case "YverifyPro": //'核实生产':
                (this.stateList = []),
                    (this.productList = []),
                    (this.totalList = [
                        {val: "MONTHLY_VE_PROD", name: "年累核实产量", unit: "m³"},
                        {val: "MONTHLY_CUMU_NET_PROD", name: "年累净产量", unit: "m³"},
                    ]),
                    (this.injectList = []),
                    (this.managerList = []);
                break;
            case "Yinject": //'注入指标':
                (this.stateList = []),
                    (this.productList = [
                        {val: "YEAR_CUMU_PROD_DAILY", name: "年累生产天数", unit: "d"},
                        {val: "YEAR_CUMUL_INJ_VOLUME", name: "年累注入量", unit: "m³"},
                    ]),
                    (this.totalList = []),
                    (this.injectList = []),
                    (this.managerList = []);
                break;

                //油田
            case "measure": //'油田措施日指标':
                (this.stateList = []),
                    (this.productList = [
                        {val: "DAILY_PROD_LIQUID", name: "日增产液", unit: "m³"},
                        {val: "DAILY_INCOIL_PROD", name: "日增产油", unit: "m³"},
                        {val: "DAILY_INCWATER_PROD", name: "日增产水", unit: "m³"},
                        {val: "DAILY_INCGAS_PROD", name: "日增产气", unit: "m³"},
                    ]),
                    (this.totalList = [
                        {val: "MONTHLY_ACCUM_PROD_SOLUT", name: "月累增产液", unit: "m³"},
                        {val: "MONTHLY_CUMUL_INC_OIL_PROD", name: "月累增产油", unit: "m³"},
                        {val: "MONTHLY_CUMUL_INC_WATER_PROD", name: "月累增产水", unit: "m³"},
                        {val: "MONTHLY_CUMUL_INC_GAS_PROD", name: "月累增产气", unit: "m³"},
                        {val: "YEAR_CUMUL_YIELD_INCREASE_LIQUID", name: "年累增产液", unit: "m³"},
                        {val: "YEAR_CUMUL_INCR_OIL_PROD", name: "年累增产油", unit: "m³"},
                        {val: "YEAR_CUMUL_INCR_WATER_PROD", name: "年累增产水", unit: "m³"},
                        {val: "YEAR_CUMUL_INCR_GAS_PROD", name: "年累增产气", unit: "m³"},
                    ]),
                    (this.injectList = []),
                    (this.managerList = [
                        {val: "DAILY_MEASURE_WELLS", name: "日措施井次", unit: "次"},
                        {val: "MONTHLY_CUMUL_COUNT", name: "月累措施井次", unit: "次"},
                        {val: "YEAR_CUMUL_COUNT", name: "年累措施井次", unit: "次"},
                    ]);
                break;
                //文档不全
            case "MproProDic": //'油田月指标':
                (this.stateList = []),
                    (this.productList = [
                        {val: "SYN_WATER_RATIO", name: "综合含水", unit: "%"},
                        {val: "SYN_OIL_GAS_RATIO", name: "综合气油比", unit: "m³/m³"},
                        {val: "DAILY_LIQUID_PROD_LEVEL", name: "日产液水平", unit: "m³"},
                        {val: "DAILY_OIL_PROD_LEVEL", name: "日产油水平", unit: "m³"},
                        {val: "DAILY_WATER_PROD_LEVEL", name: "日产水水平", unit: "m³"},
                        {val: "DAILY_GAS_PROD_LEVEL", name: "日产气水平", unit: "m³"},
                        {val: "DAILY_LIQUID_PROD_CAP", name: "日产液能力", unit: "m³"},
                        {val: "DAILY_OIL_PROD_CAP", name: "日产油能力", unit: "m³"},
                        {val: "DAILY_WATER_PROD_CAP", name: "日产水能力", unit: "m³"},
                        {val: "DAILY_GAS_PROD_CAP", name: "日产气能力", unit: "m³"},
                    ]),
                    (this.totalList = []),
                    (this.injectList = [
                        {val: "DAILY_LIQUID_INJ_LEVEL", name: "日注液水平", unit: "m³"},
                        {val: "DAILY_WATER_INJ_LEVEL", name: "日注水水平", unit: "m³"},
                        {val: "DAILY_GAS_INJ_LEVEL", name: "日注气水平", unit: "m³"},
                        {val: "DAILY_LIQUID_INJ_CAPACITY", name: "日注液能力", unit: "m³"},
                        {val: "DAILY_WATER_INJ_CAPACITY", name: "日注水能力", unit: "m³"},
                        {val: "DAILY_GAS_INJ_CAPACITY", name: "日注气能力", unit: "m³"},
                    ]),
                    (this.managerList = []);
                // this.storeList = ['井口储采比','井口采油速度','井口采出油速度','剩余油储量','剩余气储量','剩余油采出速度','剩余气采出速度','剩余油采出程度','剩余气采出程度']
                break;
            case "MverifyPro": //'核实生产月指标':
                (this.stateList = []),
                    (this.productList = []),
                    (this.totalList = [
                        {val: "MONTHLY_VE_PROD", name: "月累核实产量", unit: "m³"},
                        {val: "MONTHLY_CUMU_NET_PROD", name: "月累净产量", unit: "m³"},
                    ]),
                    (this.injectList = []),
                    (this.managerList = []);
                break;
            case "YverifyPro": //'核实生产年指标':
                (this.stateList = []),
                    (this.productList = []),
                    (this.totalList = [
                        {val: "MONTHLY_VE_PROD", name: "年累核实产量", unit: "m³"},
                        {val: "MONTHLY_CUMU_NET_PROD", name: "年累净产量", unit: "m³"},
                    ]),
                    (this.injectList = []),
                    (this.managerList = []);
                break;
            }
        },
        doSearch(val) {
            if (this.activeEchart) {
                this.activeEchart = false;
            } else {
                if (!this.selectDate) {
                    this.$message.error("请选择日期查询！");
                    return;
                }
                this.dialogVisible = true;
                this.tableData = [];
                //合并数组 合并所有指标
                let newArr = this.stateValue.concat(
                    this.productValue,
                    this.totalValue,
                    this.injectValue,
                    this.managerValue,
                    this.storeValue,
                );
                let tableArr = [];
                for (let i = 0; i < newArr.length; i++) {
                    tableArr.push({
                        type: "AND",
                        name: newArr[i],
                        model: ">",
                        val: "",
                    });
                }
                let header = this.stateList.concat(
                    this.productList,
                    this.totalList,
                    this.injectList,
                    this.managerList,
                    this.storeList,
                );
                this.headerText = [];
                for (let i = 0; i < tableArr.length; i++) {
                    this.headerText.push(
                        header.filter((item) => {
                            return item.val == tableArr[i].name;
                        })[0],
                    );
                }
                this.headerTextLower = [];
                this.headerText.forEach((item) => {
                    this.headerTextLower.push({
                        val: isNaN(item.val.toLowerCase().replace(/_/g, ""))?item.val.toLowerCase().replace(/_/g, ""):(item.val.toLowerCase().replace(/_/g, "")).toFixed(2) ,
                        name: `${item.name}${item.unit ? `\n(${item.unit})` : ""}`,
                    });
                });
                //添加固定的两个字段 井名 生产时间
                this.headerTextLower.unshift({name: "井名", val: "name"}, {name:this.activeTabIndexDate==3? `生产时间\n(yyyy-mm-dd)`: this.activeTabIndexDate==2? `生产时间\n(yyyy-mm)`:`生产时间\n(yyyy)` , val: "proddate"});
                this.tableData = tableArr;
            }
        },
        confirm() {
            let sqlStrAnd = "",
                sqlStrOr = "";
            let flag = true;
            this.tableRow.forEach((item) => {
                if (item.type && item.name && item.model && item.val) {
                    if (item.type == "AND") {
                        sqlStrAnd += `${item.type} ${item.name} ${item.model} ${item.val} `;
                    } else {
                        sqlStrOr += `${item.type} ${item.name} ${item.model} ${item.val} `;
                    }
                } else {
                    flag = false;
                }
            });
            let sqlObj = [];
            this.tableRow.forEach((item) => {
                if (item.type && item.name && item.model && item.val) {
                    sqlObj.push({
                        link: item.type,
                        index: item.name,
                        condition: item.model,
                        value: item.val,
                    });
                }
            });
            if (!flag) {
                this.$message.error("请填写完整查询条件！");
                return;
            }
            let sqlStr = sqlStrAnd + sqlStrOr;
            if (sqlStrOr) {
                sqlStr = sqlStr.slice(0, sqlStr.lastIndexOf("AND")) + "( " + sqlStr.slice(sqlStr.lastIndexOf("AND")) + ")";
            } else {
                sqlStr = sqlStrAnd;
            }
            let condList = this.stateValue.concat(
                this.productValue,
                this.totalValue,
                this.injectValue,
                this.managerValue,
                this.storeValue,
            );
            let condListFormat = [];
            condList.forEach((item) => {
                condListFormat.push(item.toLowerCase().replace(/_/g, ""));
            });
            this.dialogVisible = false;
            this.activeEchart = !this.activeEchart;
            let params = {
                condList: condListFormat, //字段名字
                // sqlSent:sqlStr,//拼接sql
                sqlSent: sqlObj, //拼接sql
                targetType: this.activeTabIndex, //目标类型 井：1  油田 ：2
                dataType: this.activeTabIndexData, //数据类型 （井口指标，计量指标等）
                timeType: this.activeTabIndexDate, //时间类型 1 年 2月 3 日
                startTime: this.activeTabIndexDate != 1 ? this.selectDate[0] : this.selectDate, //开始时间
                endTime: this.selectDate[1], //结束时间
                wellIdList:this.wellId,
                dataId: null,//若目标类型为2油田传ogfId,若为井传wellId
                platformId:this.platformId,
                ogfId:this.ogfId,
                pageNum: this.page,//分页页码
                pageSize: this.pageSize,//每页页数
            };
            this.params = params;
            this.queryData = [];
            queryCustomQueryList(params).then((res) => {
                let dataArray =  res.data.data.rows;
                dataArray.forEach((data)=>{
                    for (var key in data) {
                        if (key == 'monthprodduration' || key == 'yearprodduration'
                            || key == 'calculdate'|| key == 'monthlyproddays'|| key == 'yearcumuproddaily'|| key == 'daynumberwellsopenedper'|| 
                            key == 'daytotalnumberwellsper'|| key == 'numberdailyinjectionwellsopened'|| key == 'totaldailyinjectionwells'|| key == 'dailymeasurewells'
                            || key == 'monthlycumulcount'|| key == 'yearcumulcount') {
                            if (data[key] === null || data[key] === '') {
                                continue;
                            }
                            data[key] = parseFloat(data[key]).toFixed(0);
                        }
                    }
                })
                this.queryData = dataArray
                this.pageTotal = res.data.data.total;
            });
        },
        downexcel() {
            let sqlStrAnd = "",
                sqlStrOr = "";
            this.tableRow.forEach((item) => {
                if (item.type && item.name && item.model && item.val) {
                    if (item.type == "AND") {
                        sqlStrAnd += `${item.type} ${item.name} ${item.model} ${item.val} `;
                    } else {
                        sqlStrOr += `${item.type} ${item.name} ${item.model} ${item.val} `;
                    }
                }
            });
            let sqlObj = [];
            this.tableRow.forEach((item) => {
                if (item.type && item.name && item.model && item.val) {
                    sqlObj.push({
                        link: item.type,
                        index: item.name,
                        condition: item.model,
                        value: item.val,
                    });
                }
            });
            let sqlStr = sqlStrAnd + sqlStrOr;
            if (sqlStrOr) {
                sqlStr = sqlStr.slice(0, sqlStr.lastIndexOf("AND")) + "( " + sqlStr.slice(sqlStr.lastIndexOf("AND")) + ")";
            } else {
                sqlStr = sqlStrAnd;
            }
            let condList = this.stateValue.concat(
                this.productValue,
                this.totalValue,
                this.injectValue,
                this.managerValue,
                this.storeValue,
            );
            let condListFormat = [];
            condList.forEach((item) => {
                condListFormat.push(item.toLowerCase().replace(/_/g, ""));
            });
            let params = {
                condList: condListFormat, //字段名字
                // sqlSent:sqlStr,//拼接sql
                sqlSent: sqlObj, //拼接sql
                targetType: this.activeTabIndex, //目标类型 井：1  油田 ：2
                dataType: this.activeTabIndexData, //数据类型 （井口指标，计量指标等）
                timeType: this.activeTabIndexDate, //时间类型 1 年 2月 3 日
                startTime: this.activeTabIndexDate != 1 ? this.selectDate[0] : this.selectDate, //开始时间
                endTime: this.selectDate[1], //结束时间
                dataId: this.activeTabIndex == 2 ? this.ogfId : this.wellId,//若目标类型为2油田传ogfId,若为井传wellId
                pageNum: 1,//分页页码
                pageSize: 10000,//暂用此下载方法
            };
            this.params = params;
            this.dowload = [];
            queryCustomQueryList(params).then((res) => {
                this.dowload = res.data.data.rows;
            }).then(() => {
                this.$nextTick(() => {
                    exportExcel("#zdycx", "自定义查询");
                })
            })
        },
        addRow(val) {
            this.tableRow.push({});
        },
        deleteRow(val) {
            this.tableRow.splice(val.$index, 1);
        },
        //切换分页
        pagination(e) {
            this.params.pageNum = e.page;
            this.params.pageSize = e.limit;
            queryCustomQueryList(this.params).then((res) => {
                this.queryData = res.data.data.rows;
                this.pageTotal = res.data.data.total;
            });
        },
    },
};
</script>
<style lang="scss" scoped>
#zdycxtab {
    ::v-deep .el-table__header-wrapper .cell {
        height: auto;
        line-height: 35px;
        white-space: pre;
    }
}
</style>
<style lang="less" scoped>
::v-deep .el-table .cell {
    height: 48px !important;
    line-height: 25px !important;
}
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
#zdycx {
    ::v-deep .cell:empty {
        &::before {
            content: "-";
        }
    }
}
</style>
