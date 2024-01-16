<!-- 封装业务表格组件 -->
<template>
    <div class="z_container">
        <div class="btns">
            <div class="fonts" v-if="selectType!='通用配置'">
                <span style="width:160px;" v-if="selectType=='按井配置'">井号：{{searchForm.wellName}}</span>
                <span style="width:150px;" v-if="selectType=='按井配置'||selectType=='按井型配置'">井型：{{searchForm.wellTypeName}}</span>
                <span style="width:200px;" v-if="selectType=='按井配置'||selectType=='按井型配置'||selectType=='按区块配置'">区块：{{searchForm.blockName}}</span>
                <span>油田：{{searchForm.ogfName}}</span>
            </div>
            <el-button type="primary" @click="addTableRow">新增</el-button>
        </div>
        <div class="z-table">
            <el-table width="100%" height="100%" :row-style="{ height: '0px' }" border :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }" :data="tableData" :cell-style="{ padding: '6px', 'text-align': 'center' }">
                <el-table-column prop="modelName" label="模型名称"  width="250">
                    <template slot-scope="scope">
                        <div>
                            <el-select v-model="scope.row.modelName" @change="modelOptionChange($event,scope.$index)" :filterable="true" :clearable="true" v-if="scope.row.state!=3">
                                <el-option v-for="item in modeSelectList" :key="item.modelId" :label="item.modelName" :value="item.modelId"></el-option>
                            </el-select>
                            <span v-else>{{scope.row.modelName}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="modelId" label="模型ID"  width="100"></el-table-column>  
                <el-table-column prop="configDescribe" label="配置项描述" >
                    <template slot-scope="scope">
                        <div>
                            <el-input placeholder="输入配置项描述" v-model="scope.row.configDescribe" v-if="scope.row.state!=3"></el-input>
                            <span v-else>{{scope.row.configDescribe}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="configId" label="配置项代码"  width="180">
                    <template slot-scope="scope">
                        <div>
                            <!-- <el-input  placeholder="输入配置项代码" v-model="scope.row.configId" v-if="scope.row.state!=3"></el-input> -->
                            <el-select
                                v-if="scope.row.state!=3"
                                v-model="scope.row.configId"
                                filterable
                                allow-create
                                default-first-option
                                @change="configIdChange($event,scope.$index)" 
                                placeholder="请选择或输入配置项代码">
                                <el-option
                                v-for="item in configList"
                                :key="item.configId + scope.$index + scope.row.modelId"
                                :label="item.configId"
                                :value="item.configId">
                                </el-option>
                            </el-select>
                            <span v-else>{{scope.row.configId}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="configValue" label="配置项值" width="150">
                    <template slot-scope="scope">
                        <div>
                            <el-input type="number" placeholder="输入配置项值" v-model="scope.row.configValue" v-if="scope.row.state!=3"></el-input>
                            <span v-else>{{scope.row.configValue}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="configUnit" label="配置项单位" width="150">
                    <template slot-scope="scope">
                        <div>
                            <el-input  placeholder="输入配置项单位" v-model="scope.row.configUnit" v-if="scope.row.state!=3"></el-input>
                            <span v-else>{{scope.row.configUnit}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="configUnit" label="对齐方式" width="150">
                    <template slot-scope="scope">
                        <div>
                            <el-select v-model="scope.row.contrastMode" v-if="scope.row.state!=3">
                                <el-option label="相对值" value="相对值"></el-option>=
                                <el-option label="绝对值" value="绝对值"></el-option>
                            </el-select>
                            <span v-else>{{scope.row.contrastMode}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button type="text" @click="saveTableRow(scope.row,scope.$index)" v-if="scope.row.state==1">保存</el-button>
                        <el-button type="text" @click="calceTableRow(scope.$index)" v-if="scope.row.state==1">取消</el-button>
                        
                        <el-button type="text" @click="openEditRowSubmit(scope.row,scope.$index)" v-if="scope.row.state==2">提交</el-button>
                        <el-button type="text" @click="openEditRow(scope.row,scope.$index)" v-if="scope.row.state!=1">{{scope.row.state==2?'取消':'编辑'}}</el-button>
                        
                        <el-button type="text" style="color: #f56c6c" @click="deleteTableRow(scope.row,scope.$index)" v-if="scope.row.state!=1&&scope.row.state!=2">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination v-show="page.total > 0" :total="page.total" :page.sync="page.currentPage" :limit.sync="page.pageSize" small :background="true" class="smallNoBg"  @pagination="pagination"/>
        </div>
    </div>
</template>

<script>
    import {queryTableData, getConfig} from '@/api/modelConfiguration/config/modelConfigAPI';
    import {addGeneralConfig,editGeneralConfig,delGeneralConfig} from '@/api/oilDeposit/rem-04/modelConfiguration.js';
    export default{
        props:{
            selectType:{
                type:String,
                default:''
            },
            modeSelectList:{
                type:Array,
                default:()=>{
                    return []
                }
            },
            searchForm:{
                type:Object,
                default:()=>{
                    return {}
                }
            }
        },
        data() {
            return {
                params:{},
                tableData:[],//state 1新增 2编辑 3正常展示
                page: {
                    total: 0, // 总页数
                    currentPage: 1, // 当前页数
                    pageSize: 10 // 每页显示多少条
                },
                configList: [], // 配置项下拉框列表
                editItemOld: {}, // 编辑时记录当前行数据，取消时还原
            }
        },
        created(){
            if(this.selectType=='通用配置'){
                this.queryTableDate(this.searchForm);
            }
        },
        methods:{
            //查询列表数据
            async queryTableDate(searchForm) {
                this.queryData=searchForm;
                if(!searchForm){
                    this.tableData = [];
                    this.page.total = 0;
                    return false;
                }
                let params={
                    current: this.page.currentPage,
                    size: this.page.pageSize,
                    ...this.queryData
                }
                await queryTableData(params).then(response => {
                    if( response.data.code==200){
                        let data=response.data.data.records;
                        if(data.length){
                            for(let i=0;i<data.length;i++){
                                data[i].state=3;
                            }
                        }
                        this.tableData = data;
                        this.page.total = response.data.data.total;
                    }
                })
            },
            getConfig(modelName="") {
                getConfig({modelName: modelName ? modelName : "",}).then(response => {
                    if( response.data.code==200){
                        this.configList = response.data.data;
                    }
                })
            },
            //切换分页
            pagination(e) {
                this.page.currentPage = e.page;
                this.page.pageSize = e.limit;
                this.queryTableDate(this.queryData);
            },
            //change模型名称
            modelOptionChange(e,index){
                this.$set(this.tableData[index],'modelId',e);
                this.$set(this.tableData[index],'modelName',this.modeSelectList.find(item=>item.modelId === e).modelName);

                this.$set(this.tableData[index],'configId',"");
                this.$set(this.tableData[index],'configDescribe',"");
                this.$set(this.tableData[index],'configValue',"");
                this.$set(this.tableData[index],'configUnit',"");
                this.getConfig(this.modeSelectList.find(item=>item.modelId === e).modelName);
            },
            //配置项代码切换
            configIdChange(e,index){
                this.$set(this.tableData[index],'configId',e);
                let item = this.configList.find(item=>item.configId === e);
                if(item){
                    this.$set(this.tableData[index],'modelName',item.modelName);
                    this.$set(this.tableData[index],'modelId',item.modelId);
                    this.$set(this.tableData[index],'configDescribe',item.configDescribe);
                    this.$set(this.tableData[index],'configValue',item.configValue);
                    this.$set(this.tableData[index],'configUnit',item. configUnit);
                } else {
                // this.$set(this.tableData[index],'modelName',item.modelName);
                this.$set(this.tableData[index],'configDescribe',"");
                this.$set(this.tableData[index],'configValue',"");
                this.$set(this.tableData[index],'configUnit',"");
                }
            },
            //新增
            addTableRow(){
                this.tableData.unshift({state:1,modelName:'',modelId:'',configDescribe:'',configId:'',configValue:'',configUnit:''})
                this.getConfig();
            },
            //保存
            saveTableRow(row,index){
                this.$confirm('是否确定保存该条信息？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    addGeneralConfig({...this.queryData,...this.searchForm,...row,selectType: this.selectType.replace('按', '')}).then(res=>{
                       this.$message.success('保存成功！')
                       this.$set(this.tableData[index],'state',3);
                    })
                }).catch(() => {});
            },
            //取消
            calceTableRow(index){
                this.tableData.splice(index,1);
            },
            //编辑
            openEditRow(row,index){
                let state=row.state==2?3:2;
                // this.editItemOld = row;
                this.$set(this.tableData[index],'state',state);
                this.getConfig(row.modelName);
            },
            //提交编辑
            openEditRowSubmit(row,index){
                this.$confirm('是否确定提交该条信息？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    editGeneralConfig({...this.queryData,...row}).then(res=>{
                       this.$message.success('编辑成功！');
                       this.$set(this.tableData[index],'state',3);
                    })
                }).catch(() => {});
            },
            //删除
            deleteTableRow(row,index){
                this.$confirm(`你是否要删除${row.modelName}的模型配置，点击确定删除，点击取消，弹框关闭`, '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    delGeneralConfig({id:row.id}).then(res=>{
                        this.$message.success('删除成功！')
                        this.queryTableDate(this.queryData);
                    })
                }).catch(() => {});
            },
        }
    }
</script>

<style lang="scss" scoped>
    ::v-deep .el-table__row{
        height:60px!important;
    }
    .z_container{
        height:100%;
        position: relative;
        
        .btns{
            height:50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .fonts{
                display: flex;
                align-items: center;
            }
        }
        
        .z-table{
            height:calc(100% - 50px - 70px);
        }
    }
</style>