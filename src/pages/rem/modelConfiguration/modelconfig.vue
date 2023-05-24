<!-- 模型配置列表 -->
<template>
    <div class="app-container">
        
        <header-search style="height: 80px">
            <div class="g-row-flex-V g-w100 g-h100">
                <span>模型名称：</span>
                <el-select v-model="searchForm.modelName" @change="modelOptionChange" :filterable="true" :clearable="true" style="margin-right:15px;">
                    <el-option v-for="item in modelOptions" :key="item.modelId" :label="item.modelName" :value="item.modelName"></el-option>
                </el-select>
                <span>配置项代码：</span>
                <el-input style="width:200px;margin-right:15px;" v-model="searchForm.configId"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="queryTableDate">搜索</el-button>
                <el-button class="commonBtn" icon="el-icon-refresh" style="margin-right:auto;" @click="resetting">重置</el-button>
                
                
            </div>
        </header-search>
        
        <page-panel-new style="height: calc(100% - 100px);">
            <div class="pagepanel-content" style="height:calc(100% - 60px)">
                <div class="pagepanel-btns" style="height:34px;margin-bottom:10px;display: flex;justify-content: flex-end;">
                    <el-button type="primary" v-if="isModuleBtn" @click="moduleDialog=true;">选定模型重算</el-button>
                    <el-button type="primary" @click="getModelInstructionManual">模型说明文档</el-button>
                </div>
                <div class="pagepanel-table" style="height:calc(100% - 44px);">
                    <el-table
                        width="100%"
                        height="100%"
                        :row-style="{ height: '0px' }"
                        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
                        :data="tableData"
                        :cell-style="{ padding: '6px', 'text-align': 'center' }"
                        :default-sort="{ prop: 'date', order: 'descending' }">
                        <el-table-column prop="modelName" label="模型名称" sortable width="250"></el-table-column>
                        <el-table-column prop="configId" label="配置项代码" sortable width="150"></el-table-column>
                        <el-table-column prop="configDescribe" label="配置项描述" min-width="860"></el-table-column>
                        <el-table-column prop="configValue" label="配置项值" width="100"></el-table-column>
                        <el-table-column prop="configUnit" label="配置项单位" width="100"></el-table-column>
                        <el-table-column prop="contrastMode" label="对比方式"  width="100"></el-table-column>
                        <el-table-column label="操作" width="150">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="openEditDialog(scope.row)">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <pagination v-if="page.total" :pageSizes="[15, 20, 40, 100]" :total="page.total" :page.sync="page.currentPage" :limit.sync="page.pageSize" @pagination="pagination" />
                </div>
            </div>
        </page-panel-new>
        
        <el-dialog title="编辑参数" :visible.sync="dialogVisible" width="500px">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="80px">
                    <el-form-item label="模型ID">
                        <el-input size="mini" v-model="editForm.modelId" disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="模型名称">
                        <el-input size="mini" v-model="editForm.modelName" disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="配置描述">
                        <el-input v-model="editForm.configDescribe" disabled="true" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="配置代码">
                        <el-input size="mini" v-model="editForm.configId" disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="配置项值" prop="configValue">
                        <el-input size="mini" v-model="editForm.configValue"></el-input>
                    </el-form-item>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editConfigValue()">确 定</el-button>
                <el-button class="cancelBtn" @click="dialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        
        <el-dialog title="选定模型重算" :visible.sync="moduleDialog" @closed="moduleDialogCancel">
            <div style="padding-bottom:20px;" v-if="dayOrMontKey==3">
                <el-radio v-model="radio" label="2">月度</el-radio>
                <el-radio v-model="radio" label="1">日度</el-radio>
            </div>
            <el-form inline :model="moduleFrom" :rules="rulesModule" ref="moduleFrom">
                <el-form-item label="模型名称">
                    <el-input type="text" v-model="searchForm.modelName" disabled></el-input>
                </el-form-item>
                <el-form-item label="模型代码">
                    <el-input type="text" v-model="moduleFrom.modelId" disabled></el-input>
                </el-form-item>
                <el-col :span="16">
                    <el-form-item label="油田区块标识" prop="ogfId" style="width:100%;">
                        <!-- <el-input type="text" v-model="moduleFrom.ogfId" disabled></el-input> -->
                        <el-input type="text" v-model="ogfIdValue" disabled></el-input>
                    </el-form-item>
                </el-col>
                <!-- 日度 -->
                <el-form-item label="开始日期" prop="beginDate" v-if="radio==1">
                    <el-date-picker v-model="moduleFrom.beginDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="终止日期" prop="endDate" v-if="radio==1">
                    <el-date-picker v-model="moduleFrom.endDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <!-- 月度 -->
                <el-form-item label="开始日期" prop="beginMonth" v-if="radio==2">
                    <el-date-picker v-model="moduleFrom.beginMonth " type="month" value-format="yyyy-MM" placeholder="选择月"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期" prop="endMonth" v-if="radio==2">
                    <el-date-picker v-model="moduleFrom.endMonth " type="month" value-format="yyyy-MM" placeholder="选择月"></el-date-picker>
                </el-form-item>
            </el-form>
            <el-row>
                <el-col :span="2" :offset="17">
                    <el-button @click="moduleDialogCancel" type="danger">取消</el-button>
                </el-col>
                <el-col :span="2" :offset="2">
                    <el-button @click="moduleDialogSure" type="primary">确定</el-button>
                </el-col>
            </el-row>
        </el-dialog>
    
    </div>
</template>

<script>
    import {
        queryTableData,
        editModelConfigValue,
        getAllModelName,
        rangeSelDayApi,
        selMonthRangeApi,
        getModelInstructionManual
    } from '@/api/modelConfiguration/config/modelConfigAPI';
    import { saveAs } from "file-saver";
    export default {
        data() {
            return {
                dialogVisible: false,
                tableLoading: false,
                tableData: [],
                modelOptions: [],
                rules: {
                    configValue: [{
                        required: true,
                        message: '请输入配置项值',
                        trigger: 'blur'
                    }]
                },
                page: {
                    total: 0, // 总页数
                    currentPage: 1, // 当前页数
                    pageSize: 20 // 每页显示多少条
                },
                searchForm: {
                    modelName: '',
                    modelId: '',
                    configId: ''
                },
                editForm: {
                    modelId: '',
                    modelName: '',
                    ogfId: '',
                    configId: '',
                    configValue: '',
                    configDescribe: ''
                },
                isModuleBtn: false, //选定模型重算按钮 是否显示，默认不显示
                // 选定模型重算弹框
                moduleDialog: false,
                moduleFrom: {
                    beginMonth: '', //月度开始
                    endMonth: '', //月度结束
                    modelId: '', //模型代码
                    ogfId: '3FC9A818F5BC43B88270DB80BBB3018F', //油田区块标识
                    beginDate: '', //日度开始
                    endDate: '', //日度结束
                },
                ogfIdValue: '秦皇岛32-6油田',
                rulesModule: {
                    ogfId: [{
                        required: true,
                        message: '请输入',
                        trigger: 'blur'
                    }],
                    beginMonth: [{
                        required: true,
                        message: '请选择',
                        trigger: 'blur'
                    }],
                    endMonth: [{
                        required: true,
                        message: '请选择',
                        trigger: 'blur'
                    }],
                    beginDate: [{
                        required: true,
                        message: '请选择',
                        trigger: 'blur'
                    }],
                    endDate: [{
                        required: true,
                        message: '请选择',
                        trigger: 'blur'
                    }],
                },
                radio: '1',
                //日度模型
                dayOrMontList: [ //1:日度 2:月度 3:日月都有
                    {
                        key: '1',
                        value: 'AC-03'
                    },
                    {
                        key: '1',
                        value: 'AC-04'
                    },
                    {
                        key: '1',
                        value: 'AC-13'
                    },
                    {
                        key: '1',
                        value: 'AC-15'
                    },
                    {
                        key: '1',
                        value: 'AC-20'
                    },
                    {
                        key: '2',
                        value: 'AC-07'
                    },
                    {
                        key: '2',
                        value: 'AC-08'
                    },
                    {
                        key: '2',
                        value: 'AC-11'
                    },
                    {
                        key: '2',
                        value: 'AC-17'
                    },
                    {
                        key: '2',
                        value: 'AC-18'
                    },
                    {
                        key: '2',
                        value: 'AC-21'
                    },
                    {
                        key: '2',
                        value: 'AC-22'
                    },
                    {
                        key: '2',
                        value: 'AC-24'
                    },
                    {
                        key: '2',
                        value: 'AC-25'
                    },
                    {
                        key: '2',
                        value: 'AC-26'
                    },
                    {
                        key: '2',
                        value: 'AC-28'
                    },
                    {
                        key: '2',
                        value: 'AC-29'
                    },
                    {
                        key: '2',
                        value: 'AC-36'
                    },
                    {
                        key: '2',
                        value: 'AC-37'
                    },
                    {
                        key: '3',
                        value: 'AC-02'
                    },
                    {
                        key: '3',
                        value: 'AC-19'
                    },
                    {
                        key: '3',
                        value: 'AC-12'
                    },
                ],
                dayOrMontKey: '1', //默认选中日度=1  月度=2 日月都有=3
            };
        },
        created() {
            this.getAllModelName();
            this.queryTableDate();
        },
        methods: {
            //重置
            resetting(){
            	this.$nextTick(()=>{
            		Object.assign(this.$data, this.$options.data());
            		this.getAllModelName();
            		this.queryTableDate();
            	})
            },
            // 获取所有的模型名称
            getAllModelName() {
                getAllModelName().then(response => {
                    if (response.data.code ==200) {
                        this.modelOptions = response.data.data;
                    } else {
                        this.$message.error(response.data.msg);
                    }
                })
            },
            //查询列表数据
            queryTableDate() {
                this.tableLoading = true;
                queryTableData(Object.assign({current: this.page.currentPage,size: this.page.pageSize},this.searchForm)).then(response => {
                    this.tableData = response.data.data.records;
                    this.page.total = response.data.data.total;
                    this.tableLoading = false;
                    //是否显示选定模型重算按钮
                    this.isModuleBtn = false;
                    if (this.tableData.length) {
                        let modelId = this.tableData[0].modelId;
                        for (let i = 0; i < this.dayOrMontList.length; i++) {
                            if (this.dayOrMontList[i].value == modelId) {
                                this.isModuleBtn  = true;
                                this.dayOrMontKey = this.dayOrMontList[i].key;
                                if (this.dayOrMontKey == 1 || this.dayOrMontKey == 2) {
                                    this.radio = this.dayOrMontKey;
                                } else {
                                    this.radio = '2';
                                }
                                this.moduleFrom.modelId = modelId;
                                break;
                            }
                        }
                    }
                }).catch(() => {
                    this.tableLoading = false;
                });
            },
            // 根据模型名称获取模型id
            modelOptionChange() {
                this.searchForm.modelId='';
                for (const item of this.modelOptions) {
                    if (item.modelName == this.searchForm.modelName) {
                        this.searchForm.modelId = item.modelId;
                        this.isModuleBtn = false;
                    }
                }
            },
            //打开弹出框
            openEditDialog(row) {
                this.$nextTick(() => {
                    if (this.$refs['editForm'] !== undefined) {
                        this.$refs['editForm'].resetFields();
                    }
                    this.dialogVisible = true;
                    this.editForm = row;
                });
            },
            //编辑配置参数
            editConfigValue() {
                this.$refs['editForm'].validate(valid => {
                    if (valid) {
                        editModelConfigValue(this.editForm).then(response => {
                            if (response.data.code == 0) {
                                this.queryTableDate();
                                this.dialogVisible = false;
                            } else {
                                this.$message.error(response.data.msg);
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            //点击选定模型重算弹框-确定
            moduleDialogSure() {
                this.$refs['moduleFrom'].validate((valid) => {
                    if (valid) {
                        if (this.radio == 1) { //日度
                            let query = JSON.parse(JSON.stringify(this.moduleFrom));
                            delete query.beginMonth;
                            delete query.endMonth;
                            rangeSelDayApi(query).then(response => {
                                if (response.data.code == 0) {
                                    this.moduleDialogCancel();
                                } else {
                                    this.$message.error(response.data.msg);
                                }
                            }).catch(() => {
                                this.$message.error('请求错误');
                            });
                        } else { //月度
                            let query = JSON.parse(JSON.stringify(this.moduleFrom));
                            delete query.beginDate;
                            delete query.endDate;
                            selMonthRangeApi(query).then(response => {
                                if (response.data.code == 0) {
                                    this.moduleDialogCancel();
                                } else {
                                    this.$message.error(response.data.msg);
                                }
                            }).catch(() => {
                                this.$message.error('请求错误');
                            });
                        }
                    } else {
                        return false;
                    }
                })
            },
            moduleDialogCancel() {
                this.$refs['moduleFrom'].resetFields();
                this.moduleDialog = false;
            },
            
            //切换分页
            pagination(e) {
                this.page.currentPage = e.page;
                this.page.pageSize = e.limit;
                this.queryTableDate();
            },
            
            //模型说明文档下载
            getModelInstructionManual() {
                getModelInstructionManual().then(res => {
                    const blob = new Blob([res],{ type: "application/vnd.ms-excel" });
                    saveAs(blob, '油藏动态分析模型说明手册');
                }).catch(() => {});
            },
        },
    };
</script>

<style scoped="scoped" lang="scss">
    .app-container{
        height:100%;
    }
    ::v-deep .el-table .cell{
        height:auto!important;
        line-height: inherit!important;
    }
</style>
