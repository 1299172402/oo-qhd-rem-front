<template>
    <div style="height: 100%">
        <!-- 模型管理  油藏优化模型 -->
        <el-row style="width:100%; top: -10px;" type="flex">
            <span style="color:white;font-size:14px;margin-top: 7px">油田：</span>
            <el-select filterable disabled type="primary"
                       v-model="modelObject.ogfId" placeholder="全部" clearable>
                <el-option v-for="item in ogfList" :key="item.ogfId" :label="item.ogfName"
                           :value="item.ogfId">
                </el-option>
            </el-select>
            <span style="color:white;font-size:14px;margin-top: 7px;margin-left: 20px">区块：</span>
            <el-select filterable v-model="modelObject.blockId" clearable
                       placeholder="全部">
                <el-option v-for="item in blockList" :key="item.blockId" :label="item.blockName" :value="item.blockId"></el-option>
            </el-select>
            <span style="font-size: 14px;color: white;margin-top: 7px;margin-left: 100px">模型创建时间 : </span>
            <el-date-picker type="date" v-model="modelObject.startDate" style="margin-left: 10px"
                            :picker-options="pickerOptions" @change="handleTime" placeholder="年/月/日"
                            popper-class="elDatePicker" value-format="yyyy-MM-dd">
            </el-date-picker> 
             ----
            <el-date-picker  type="date" v-model="modelObject.endDate" :picker-options="pickerOptions2"
                             placeholder="年/月/日" popper-class="elDatePicker" value-format="yyyy-MM-dd">
            </el-date-picker>
            <el-button type="primary" style="margin-left: 15px"
                       size="small" @click="searchTableList()" icon="el-icon-search">检索
            </el-button>
            <el-button size="small" type="primary" style=""
                       icon="el-icon-circle-plus-outline" @click="handleAdd">创建油藏优化模型</el-button>
        </el-row>
        <pagePanel headerTitle="油藏优化模型" :show-btn="true" style="height: calc(100% - 10px);margin-top: 5px;height: 700px">
            <!-- 表格-->
            <el-table  highlight style="margin-top: -10px;margin-left: 1px;" height="calc(100% - 15px)"
                       :row-style="{ height: '0px' }"
                       header-cell-class-name="table_header"
                       v-loading="deleteModelLoading" element-loading-background="rgba(0,0,0,0.5)"
                       element-loading-text="删除中" element-loading-spinner="el-icon-loading"
                       :data="modelList">
                <el-table-column label="序号" type="index" width="100" align="center"
                                 :index="table_index"></el-table-column>
                <el-table-column prop="modelCode" label="模型代码" align="center"></el-table-column>
                <el-table-column prop="modelName" label="模型名称" align="center"></el-table-column>
                <el-table-column prop="blockName" label="对应区块" align="center"></el-table-column>
                <el-table-column prop="inputDate" label="生成时间" align="center"></el-table-column>
                <el-table-column prop="operate" label="操作" align="center">
                    <!-- 插槽 -->
                    <template v-slot="scope">
                        <el-button icon="el-icon-document" type="text" @click="lookResClick(scope.row.modelBasicId)">查看结果
                        </el-button>
                        <el-button icon="el-icon-delete" type="text" style="color: #f56c6c;"
                                   @click="deleteClick(scope.row.modelBasicId)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row>
                <el-pagination style="float: right;"
                               :current-page="modelObject.pn"
                               :total="totalPage"
                               :page-size="modelObject.pageSize"
                               layout="prev, pager, next" @current-change="getTableList">
                </el-pagination>
            </el-row>
            <el-dialog title="创建油藏优化模型" 
                       :visible.sync="dialogModelVisible" width="460px" >
                <el-form label-width="110px" :model="modelForm" :rules="modelRules" ref="modelForm" >
                    <el-form-item label="模型名称:" prop="modelName" class="item">
                        <el-input clearable v-model.trim="modelForm.modelName" style="width: 240px;"
                                  placeholder="请输入模型名称"></el-input>
                    </el-form-item>
                    <el-form-item label="所选区块:" prop="blockId" class="item">
                        <!--                        <div style="width: 260px;float: left">-->
                        <el-cascader :options="modelForm.options" clearable @clear="getTableList"
                                     style="width: 240px;"
                                     v-model="modelForm.blockId" @change="selectBlock" placeholder="请选择区块"></el-cascader>
                        <!--                        </div>-->
                    </el-form-item>
                    <el-form-item label="模拟起始时间:" prop="imitateInitDate" class="item">
                        <!--                        <div class="block" style="width: 260px;float: left">-->
                        <el-date-picker style="width: 240px;" v-model.trim="modelForm.imitateInitDate" type="date"
                                        placeholder="年/月/日" popper-class="elDatePicker">
                        </el-date-picker>
                        <!--                        </div>-->
                    </el-form-item>
                    <el-form-item  label="模型创建人:" prop="modelAuthor" class="item">
                        <el-input clearable @clear="getTableList" v-model.trim="modelForm.modelAuthor"
                                  style="width: 240px;"
                                  placeholder="请输入模型创建人"></el-input>
                    </el-form-item>
                    <el-form-item label="制定时间:" prop="inputDate" v-model.trim="modelForm.inputData"
                                  class="item">
                        <p align="left" style="color:white;font-size: 14px">{{ modelForm.inputDate }}</p>
                    </el-form-item>
                    <el-row style="float: right;margin-top: -10px;line-height: 50px">
                        <el-button type="primary" @click="getAddListData('modelForm')">开始创建
                        </el-button>
                        <el-button type="primary" @click="dialogModelVisible = false">取 消</el-button>
                    </el-row>
                </el-form>
            </el-dialog>
        </pagePanel>
    </div>
</template>

<script>
//接口
import {
    GetBlockListByOgfId,
    GddModelBasic,
    DeleteModelBasicById,
    JudgeModelBasicNameUnique,
    GetModelBasicById,
    GetModelBasicListByCondition,
    GetOgfBlockCascader,
    GetOgfList,
} from "@/api/rem/dispenseIndex.js";

export default {
    name: "modelManager",
    data(){
        return {
            //模型管理页面
            modelPage: '',
            pageSize: '',
            isShowDeleteDialog: false, //是否显示点击删除按钮之后的弹框
            startData: '',
            endDate: '',
            deleteModelLoading: false,
            //开始时间
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            //结束时间
            pickerOptions2: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            modelList: [],//方案表格数据
            totalPage: undefined,
            dialogModelVisible: false,//创建油藏模型弹出框
            modelObject: {
                ogfId: '',
                blockId: '',
                startDate: '',
                endDate: '',
                pn: 1,
                pageSize: 10,
                currentPage: '',
            },
            //jlj
            modelForm: {
                imitateInitDate: '',
                ogfId: '',
                blockId: '',
                startDate: '',
                endDate: '',
                modelName: '',
                options: [],
                modelCode: '',
                selectedBlockID: '',
                modelBasicId: '',
                modelAuthor: '',
            },
            modelRules: {
                modelName: [
                    { required: true, message: '方案名称不能为空', trigger: 'blur' },
                    { pattern: /^(a-z|A-Z|0-9)*[^$%^&*;:,<>?()\""\']{2,15}$/, message: '字符数量应处于2-15' },
                    { pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, message: '不能存在特殊字符' },
                    {
                        validator: (rule, value, callback) => {
                            JudgeModelBasicNameUnique(value).then(
                                data => {
                                    // 判断方案名称是否唯一
                                    let flag = data.result.judge
                                    if (flag === 1) {
                                        callback();
                                    } else {
                                        //提示信息
                                        callback(new Error('该模型名称已存在，请重新输入！'))
                                    }

                                })
                        }, trigger: 'blur'
                    }
                ],
                blockId: [
                    { required: true, message: '所选区块不能为空' }
                ],
                imitateInitDate: [
                    { required: true, message: '起始时间不能为空' },
                ],
                // fileNum: [
                //   { required: true, message: '文件个数不能为空' },
                //   { pattern: /^[0-9]{1,}$/, message: '只能输入数字' }
                // ],
                modelAuthor: [
                    { required: true, message: '制定人不能为空' },
                    { pattern: /^(a-z|A-Z|0-9)*[^$%^&*;:,<>?()\""\']{2,15}$/, message: '字符数量应处于2-15' },
                    { pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, message: '不能存在特殊字符' },
                ],
            },
            ogfList: [],
            selectedOgfID: '',
            blockList: [],
            selectedBlockID: '',
            value: '',
        }
    },
    created() {
        this.getTableList();
        this.getallList();
        this.djClick();
    },
    methods:{
        //分页序号连续
        table_index(index){
            return (this. modelObject.pn-1) * this. modelObject.pageSize + index + 1
        },
        // 获取区块二级级联
        getSecondData() {
            GetOgfBlockCascader().then(res => {
                this.modelForm.options = res.result.ogfAndBlockCascader
            })
        },
        //检索
        searchTableList() {
            this.modelObject.startDate = this.modelObject.startDate === null ? "" : this.modelObject.startDate
            this.modelObject.endDate = this.modelObject.endDate === null ? "" : this.modelObject.endDate
            let param = this.modelObject
            //选择结束时间后，必须选择开始时间才能进行查询
            if (param.endDate !== '' && param.startDate === '') {
                this.$message.warning("请选择开始时间")
            } else {
                GetModelBasicListByCondition(param).then(res => {
                    console.log(res)
                    if (res.code === 0) {
                        this.modelList = res.result.modelBasicList.list
                        this.totalPage = res.result.modelBasicList.total
                    }
                })
            }
        },
        // 选择第二个区块
        selectBlock(value) {
            this.modelForm.selectedBlockID = value[1]
        },
        // 创建注采方案弹窗显示
        handleAdd() {
            this.dialogModelVisible = true
            this.clearData()
            this.modelForm.inputDate = this.getdateTime()
            this.getSecondData()
        },
        // 表单验证
        clearData() {
            this.modelForm.modelBasicId = '',
                this.modelForm.blockId = '',
                this.modelForm.modelName = '',
                this.modelForm.modelAuthor = '',
                this.modelForm.inputDate = this.getdateTime()  // 当前时间，如：2022-11-30 19:00
        },
        // 查看结果
        lookResClick(id) {
            this.$emit('fatherMethod',id)
            //接收查看结果传来的id
            // this.lookResClickId = id
            // this.getResultCaseId()
            //跳转页面
            // this.$router.push({ name: 'zctpyh', params: { modelParams: id } })
        },
        handleTime() {
            // this.time1是变化的量，需要赋值给常量, const一旦定义不可改变。
            console.log("时间变化", 11)
            const y = this.modelObject.startDate
            this.pickerOptions2 = {
                disabledDate(time) {
                    return time.getTime() > Date.now() || (y > time)
                }
            }
        },
        //表格行的样式
        rowStyle({ row, rowIndex }) {
            return 'height:50px'
        },
        // 创建本地时间
        getdateTime() {
            var now = new Date(),
                y = now.getFullYear(),
                m = now.getMonth() + 1,
                d = now.getDate();
            return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
        },
        // 获取油田全部数据
        getallList() {
            GetOgfList().then(res => {
                this.ogfList = res.result.ogfList;
                this.modelObject.ogfId = this.ogfList[0].ogfId;
                this.djClick();
            })
        },
        // 通过油田Id获取区块列表
        djClick() {
            //console.log(this.caseObject.ogfId)
            //当点击油田之后，清空区块
            this.clearOptionBlock()
            //如果选择了油田信息，将选择的油田信息赋值给ogfId
            var param = {
                ogfId: this.modelObject.ogfId
            }
            GetBlockListByOgfId(param).then(res => {
                //把该油田对应的区块放到blockList
                this.blockList = res.result.blockList
            })
        },
        //清空区块数据
        clearOptionBlock() {
            this.modelObject.blockId = ''
            this.blockList = []
        },
        // 初始方案数据（条件查询）
        getTableList(page = 1) {
            this.modelObject.pn = page
            let param = this.modelObject
            //选择结束时间后，必须选择开始时间才能进行查询
            if (param.endDate !== '' && param.startDate === '') {
                this.$message.warning("请选择开始时间")
            } else {
                GetModelBasicListByCondition(param).then(res => {
                    console.log('biaogeshuju模型管理表格数据',res.result)
                    if (res.code === 0) {
                        this.modelList = res.result.modelBasicList.list
                        this.totalPage = res.result.modelBasicList.total
                    }
                })
            }
        },
        // 添加表单数据
        getYMD(date) {
            console.log(date,'xxxxxxxxxxxxxx');
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            return y + '-' + m + '-' + d;
        },
        // 插入一条方案数据
        getAddListData(formName) {
            // //提交校验
            this.$refs.modelForm.validate((valid) => {
                if (valid) {
                    //this.modelForm.blockId = this.blockIdSelect[1]
                    // 将创建表单中的数据赋值给后端caseVo对应数据
                    const modelBasicVo =
                        {
                            blockId: this.modelForm.selectedBlockID,
                            imitateInitDate: this.getYMD(this.modelForm.imitateInitDate),
                            // fileNum: this.modelForm.fileNum,
                            modelAuthor: this.modelForm.modelAuthor,
                            modelName: this.modelForm.modelName,
                            inputDate: this.modelForm.inputDate,
                        }
                    // 将创建表单中的数据提交到后端caseVo中
                    GddModelBasic(modelBasicVo).then(res => {
                        console.log(res)
                        this.$emit('fatherModelMethod',res.result.modelBasicId)
                        console.log('res.result.modelBasicId',res.result.modelBasicId)
                        this.dialogModelVisible = false;
                        this.getTableList();
                        //------------------------------- 有问题
                        // this.$router.push({ name: 'zctpyh', params: { modelParams: res.result.modelBasicId } })
                    }).catch(error => {
                        console.log(error)
                    });
                } else {
                    this.dialogModelVisible = true
                    this.$message.warning("请填写方案信息！")
                }
            })
        },
        // 通过方案ID删除方案
        deleteClick(id) {
            this.deleteModelLoading = true
            const param = {
                modelBasicId: id
            }
            DeleteModelBasicById(param).then(res => {
                if (res.code === 0) {
                    this.$message.success('删除成功')
                    this.getTableList();
                    this.deleteModelLoading = false
                } else {
                    this.$message.success('删除失败')
                    this.deleteModelLoading = false
                }
            })
        },
        //模型管理页面结束
    }
}
</script>

<style lang="scss" scoped>

</style>