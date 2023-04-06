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
            </div>
       
                <div style="display: inline-block;float:right">
                    <el-button
                        icon="el-icon-search"
                        style="margin-right: 30px; "
                        type="primary"
                        @click="doSearch">指标查询
                    </el-button>
                </div>
           
        </el-row>
        <page-panel-new>
            <el-row>
                <el-col span="4" style="margin-left: 20px;margin-right: 20px">
                    <pagePanel headerTitle="目标类型">
                        <el-radio-group v-model="activeTabIndex">
                            <el-radio :label="0">
                                单井
                            </el-radio>
                            <el-radio :label="1">
                                油田(区块)
                            </el-radio>
                        </el-radio-group>
                    </pagePanel>
                </el-col>
                <el-col span="4" style="margin-left: 20px;margin-right: 20px">
                    <pagePanel headerTitle="时间类型">
                        <el-radio-group v-model="activeTabIndexDate">
                            <el-radio label="日"></el-radio>
                            <el-radio label="月"></el-radio>
                            <el-radio label="年"></el-radio>
                        </el-radio-group>
                    </pagePanel>
                </el-col>
                <el-col span="13" style="margin-left: 20px;margin-right: 20px">
                    <pagePanel headerTitle="数据类型">
                        <el-radio-group v-model="activeTabIndexData">
                            <el-radio :label="dataType" v-for="dataType in dataTypes"></el-radio>
                        </el-radio-group>
                    </pagePanel>
                </el-col>
            </el-row>

            <el-row>
                <el-col span="8" style="margin-left: 20px;margin-right: 20px">
                    <pagePanel headerTitle="状态指标" style="height: 250px" v-show="stateList.length != 0">
                        <el-checkbox-group v-model="stateValue">
                            <el-checkbox :label="item" v-for="item in stateList"/>
                        </el-checkbox-group>
                    </pagePanel>
                </el-col>
                <el-col span="5" style="margin-left: 20px;margin-right: 20px">
                    <pagePanel headerTitle="生产指标" style="height: 250px">
                        <el-checkbox-group v-model="productValue">
                            <el-checkbox :label="item" v-for="item in productList"/>
                        </el-checkbox-group>
                    </pagePanel>
                </el-col>
                <el-col span="8" style="margin-left: 20px;margin-right: 20px">
                    <pagePanel headerTitle="累产指标" style="height: 250px" v-show="totalList.length != 0">
                        <el-checkbox-group v-model="totalValue">
                            <el-checkbox :label="item" v-for="item in totalList"/>
                        </el-checkbox-group>
                    </pagePanel>
                </el-col>
            </el-row>
        </page-panel-new>
        <el-dialog
            title="查询"
            :visible.sync="dialogVisible"
            width="30%"
            :close-on-click-modal="false"
        >
            <span>这是个弹出框</span>
            <span slot="footer" class="dialog-footer">
        <el-button class="cancelBtn" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "CustomQuery",
        data() {
            return {
                activeTabIndex: 0,
                activeTabIndexDate:0,
                activeTabIndexData:0,
                stateValue:[],
                productValue:[],
                totalValue:[],
                dialogVisible: false,
                ogfId: "",
                oilFields: [
                    {
                        oilFieldId: "715AD1CD60484BB59E737CD18A9DE44A",
                        oilFieldName: "秦皇岛32-6"
                    }
                ],
                dataTypes:['井口生产指标','计量生产指标','核实生产指标','注入指标','措施日增产','水源井指标','泵指标'],
                stateList:['生产时间','油嘴直径','井口温度','流温','油压','套压','回压','折算基准面流压','井底流压','泵频率','泵电流','泵电压','泵吸入口压力','泵出口压力','马达温度'],
                productList:['日产液','日产油','日产水','日产气','含水','气油比'],
                totalList:['月累生产时间','年累生产时间','总累生产时间','月累产液','月累产油','月累产水','年累产液','年累产油','年累产水','年累产气','总累产液','总累产油','总累产水','总累产气']
            };
        },
        computed: {},
        watch: {
            //监听年月日
            activeTabIndexDate:{
                handler(Nval){
                    console.log(Nval);
                    switch (Nval) {
                        case '日': this.dataTypes = ['井口生产指标','计量生产指标','核实生产指标','注入指标','措施日增产','水源井指标','泵指标'] 
                            break;
                        case '月': this.dataTypes = ['井口月生产','核实月生产','注入月指标']
                            break;
                        case '年': this.dataTypes = ['生产指标','核实生产','注入指标']
                            break;
                    }
                }
            },
            //监听数据类型
            activeTabIndexData:{
                handler(Nval){
                    console.log(Nval);
                    switch (Nval) {
                        case '井口生产指标':
                            this.stateList = ['生产时间','油嘴直径','井口温度','流温','油压','套压','回压','折算基准面流压','井底流压','泵频率','泵电流','泵电压','泵吸入口压力','泵出口压力','马达温度'],
                            this.productList = ['日产液','日产油','日产水','日产气','含水','气油比'],
                            this.totalList = ['月累生产时间','年累生产时间','总累生产时间','月累产液','月累产油','月累产水','年累产液','年累产油','年累产水','年累产气','总累产液','总累产油','总累产水','总累产气']
                        break;
                        case '计量生产指标':
                            this.stateList = ['计量时间','油嘴直径','井口温度','油压','套压','井底流温','井底流压','泵频率','泵电流','泵电压','泵入口温度','泵马达温度','泵入口压力','泵出口压力','气举嘴直径','气举压力'],
                            this.productList = ['实际日产液','实际日产油','实际日产水','实际日产气','折算日产液','折算日产油','折算日产水','折算日产气','含水','气油比','油气比','水气比'],
                            this.totalList=[]
                        break;
                        case '核实生产指标':
                            this.stateList = [],
                            this.productList = ['日核实产量','日核实油当量','日权益产量','日权益油当量','日净产量','日净产油当量'],
                            this.totalList=['月累核实产量','月累核实油当量','月累权益产量','月累权益油当量','月累净产量','月累净产油当量','年累核实产量','年累核实油当量','年累权益产量','年累权益油当量','年累净产量','年累净产油当量']
                        break;
                        case '注入指标':
                            this.stateList = ['生产时间','水嘴直径','干线压力','油压','套压','静压','流压','日注入量','日配注量'],
                            this.productList = ['月累生产时间','年累生产时间','总累生产时间','月累注入量','年累注入量','总累注入量'],
                            this.totalList=[]
                        break;
                        case '措施日增产':
                            this.stateList = ['生产时间','水嘴直径','干线压力','油压','套压','静压','流压','日注入量','日配注量'],
                            this.productList = ['月累生产时间','年累生产时间','总累生产时间','月累注入量','年累注入量','总累注入量'],
                            this.totalList=[]
                        break;
                        case '水源井指标':
                            this.stateList = ['生产时间','水嘴直径','水温','油压','套压','回压','电压','电流','泵频率','含沙率'],
                            this.productList = ['日产水'],
                            this.totalList=[]
                        break;
                            
                        case '井口月生产':
                            this.stateList = ['月生产天数','油嘴','井口温度','油压','套压','回压','泵吸入口压力','泵出口压力'],
                            this.productList = ['月产液','月产油','月产水','月产气','日产液水平','日产油水平','日产水水平','日产气水平','日产液能力','日产油能力','日产水能力','日产气能力','气油比','油气比','水气比','含水'],
                            this.totalList=['年累生产天数']
                        break;
                            
                    }
                }
            }
        },
        created() {
        },
        methods: {
            // 油井选择改变
            getInfo(val) {
                this.$message.success("选择了油井");
            },
            doSearch(val) {
                this.$message.success("点击了查询" + this.stateValue);
                this.dialogVisible = true
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