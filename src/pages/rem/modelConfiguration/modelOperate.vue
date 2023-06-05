<!-- 添加模型配置 -->
<template>
    <div class="app-container">
        <pagePanelNew class="pagePanelNew" style="margin-top:0;">
            <el-tabs class="g-pageHeader" v-model="selectType" topline @tab-click="tabsChange">
                <el-tab-pane v-for="(item, index) in typeList" :key="index" :label="item.name" :name="item.name"></el-tab-pane>
            </el-tabs>
            <div class='container'>
                <div class="search" v-if="selectType!='通用配置'">
                    <span>油田：</span>
                    <el-select v-model="searchForm.ogfId" disabled style="width:200px;margin-right:15px;">
                        <el-option v-for="(item,index) in ogfSelectList" :key="index" :label="item.label" :value="item.id"></el-option>
                    </el-select>
                    <span>区块：</span>
                    <el-select v-model="searchForm.blockId" @change="blockChange" style="width:200px;margin-right:15px;">
                        <el-option v-for="(item,index) in blockSelectList" :key="index" :label="item.label" :value="item.id"></el-option>
                    </el-select>
                    <span v-if="selectType=='按井型配置'||selectType=='按井配置'">井型：</span>
                    <el-select v-if="selectType=='按井型配置'||selectType=='按井配置'" v-model="searchForm.wellType" @change="wellTypeChange" style="width:150px;margin-right:15px;">
                        <el-option v-for="(item,index) in wellTypeSelectList" :key="index" :label="item.label" :value="item.id"></el-option>
                    </el-select>
                    <span v-if="selectType=='按井配置'">井号：</span>
                    <el-select v-if="selectType=='按井配置'" v-model="searchForm.wellId" @change="wellIdChange" style="width:150px;margin-right:15px;">
                        <el-option v-for="(item,index) in wellSelectList" :key="index" :label="item.label" :value="item.id"></el-option>
                    </el-select>
                    <el-button type="primary" icon="el-icon-search" @click="">搜索</el-button>
                    <el-button type="primary" style="margin-left:15px!important;" @click="addTable">新增</el-button>
                </div>
                <div class="childComponents" :style="{height:selectType=='通用配置'? '100%' : 'calc(100% - 50px)' }" v-if='modeSelectList.length'>
                    <tableComponents1 :selectType="selectType" :searchForm="searchForm" :modeSelectList="modeSelectList" v-if="selectType=='通用配置'"></tableComponents1>
                    <div class="tableHeight">
                        <div class="block-view" v-for="(item,index) in tableList" :key="index">
                            <tableComponents2 :selectType="selectType" :searchForm="item" :modeSelectList="modeSelectList"  v-if="selectType=='按区块配置'" style="height:300px;"></tableComponents2>
                            <tableComponents3 :selectType="selectType" :searchForm="item" :modeSelectList="modeSelectList"  v-if="selectType=='按井型配置'" style="height:300px;"></tableComponents3>
                            <tableComponents4 :selectType="selectType" :searchForm="item" :modeSelectList="modeSelectList"  v-if="selectType=='按井配置'" style="height:300px;"></tableComponents4>
                        </div>
                    </div>
                    <pagination v-if="page.total&&selectType!='通用配置'" :pageSizes="[5, 10, 15]" :total="page.total" :page.sync="page.currentPage" :limit.sync="page.pageSize" @pagination="pagination" />
                </div>
            </div>
        </pagePanelNew>
    </div>
</template>

<script>
    import {getAllModelName,} from '@/api/modelConfiguration/config/modelConfigAPI.js';
    import {getOgfList,getBlockList,getProdDailyTable,getWellList,getWell,addGeneralConfig,getPageBySelectType} from '@/api/oilDeposit/rem-04/modelConfiguration.js';
    import tableComponents1 from  './components/tableComponents.vue'
    import tableComponents2 from  './components/tableComponents.vue'
    import tableComponents3 from  './components/tableComponents.vue'
    import tableComponents4 from  './components/tableComponents.vue'
    export default {
        components:{tableComponents1,tableComponents2,tableComponents3,tableComponents4},
        data() {
            return {
                selectLoading:true,
                typeList: [
                    {name: "通用配置",},
                    {name: "按区块配置",},
                    {name: "按井型配置",},
                    {name: "按井配置",},
                ],
                selectType:'通用配置',
                ogfSelectList:[],
                blockSelectList:[],
                wellTypeSelectList:[],
                wellSelectList:[],
                modeSelectList: [],
                searchForm: {
                    ogfId:'',
                    ogfName:'',
                    blockId:'',
                    blockName:'',
                    wellType:'',
                    wellId :'',
                    wellName:'',
                    modelName: '',
                    modelId: '',
                    configId: ''
                },
                tableList:[],
                page: {
                    total: 0, // 总页数
                    currentPage: 1, // 当前页数
                    pageSize:5 // 每页显示多少条
                },
            }
        },
        async created() {
            await this.getOgfListApi();
            await this.getBlockList();
            this.getProdDailyTableApi();
            await this.getWellListApi();
            this.getAllModelName();
        },
        methods: {
            //获取油田下拉框数据源
            async getOgfListApi(){
                try{
                    await getOgfList().then(res=>{
                        if(res.data.code==200){
                            let data=res.data.data;
                            this.ogfSelectList=res.data.data;
                            if(data.length){
                                for(let i=0;i<data.length;i++){
                                    if(data[i].label=='秦皇岛32-6油田'){
                                        this.searchForm.ogfId=data[i].id;
                                        this.searchForm.ogfName=data[i].label;
                                    }
                                }
                            }
                        }
                    })
                }catch(err){
                    console.log(err);
                }
            },
            //根据油田id-获取区块数据源
            async getBlockList(){
                try{
                    await getBlockList(this.searchForm).then(res=>{
                        if(res.data.code==200){
                            this.blockSelectList=res.data.data;
                            this.blockSelectList.unshift({label:'全部',id:''})
                        }
                    })
                }catch(err){
                    console.log(err);
                }
            },
            blockChange(){
                this.searchForm.wellType ="";
                this.searchForm.wellId ="";
                for(let i=0;i<this.blockSelectList.length;i++){
                    if(this.searchForm.blockId==this.blockSelectList[i].id){
                        this.searchForm.blockName=this.blockSelectList[i].label;
                    }
                }
            },
            //获取井型数据
            async getProdDailyTableApi(){
                try{
                    await getProdDailyTable(this.searchForm).then(res=>{
                        if(res.data.code==200){
                            this.wellTypeSelectList=res.data.data;
                        }
                    })
                } catch(err){
                    console.log(err);
                }
            },
            wellTypeChange(){
                this.searchForm.wellId ="";
                for(let i=0;i<this.wellTypeSelectList.length;i++){
                    if(this.searchForm.wellType==this.wellTypeSelectList[i].id){
                        this.searchForm.wellTypeName=this.wellTypeSelectList[i].label;
                    }
                }
            },
            //获取井号数据源
            getWellListApi(){
                try{
                    getWellList(this.searchForm).then(res=>{
                        if(res.data.code==200){
                            this.wellSelectList=res.data.data;
                        }
                    })
                }catch(err){
                    console.log(err);
                }
            },
            //根据井号id-获取上级井型，区块，油田
            wellIdChange(){
                for(let i=0;i<this.wellSelectList.length;i++){
                    if(this.searchForm.wellId==this.wellSelectList[i].id){
                        this.searchForm.wellName=this.wellSelectList[i].label;
                    }
                }
            },
            //获取所有的模型名称
            getAllModelName() {
                getAllModelName().then(response => {
                    if (response.data.code ==200) {
                        this.modeSelectList = response.data.data;
                    } else {
                        this.$message.error(response.data.msg);
                    }
                })
            },
            //切换tabs
            tabsChange(){
                this.selectLoading=false;
                this.$nextTick(()=>{
                    this.selectLoading=true;
                })
                console.log('this.selectType',this.selectType)
                if(this.selectType!='通用配置'){
                    console.log('??')
                    this.getPageBySelectTypeApi();
                }
            },
            //获取大分页接口
            getPageBySelectTypeApi(){
                getPageBySelectType({selectType:this.selectType,...this.searchForm,size:this.page.pageSize,current:this.page.currentPage}).then(res=>{
                    if(res.data.code==200){
                        this.tableList=res.data.data.records;
                        this.page.total=res.data.data.total;
                    }else{
                        this.tableList=[];
                    }
                })
            },
            //切换分页
            pagination(e) {
                this.page.currentPage = e.page;
                this.page.pageSize = e.limit;
                this.getPageBySelectTypeApi();
            },
            //新增
            addTable(){
                if(this.selectType=='按区块配置'){
                    if(!this.searchForm.blockId){
                        this.$message.warning('请选择区块！');
                        return false;
                    }
                }else if(this.selectType=='按井型配置'){
                    if(!this.searchForm.blockId){
                        this.$message.warning('请选择区块！');
                        return false;
                    }else if(!this.searchForm.wellType){
                        this.$message.warning('请选择井型！');
                        return false;
                    }
                }else if(this.selectType=='按井配置'){
                    if(!this.searchForm.blockId){
                        this.$message.warning('请选择区块！');
                        return false;
                    }else if(!this.searchForm.wellType){
                        this.$message.warning('请选择井型！');
                        return false;
                    }else if(!this.searchForm.wellId){
                        this.$message.warning('请选择井！');
                        return false;
                    }
                }
                this.tableList.unshift({
                    ogfId: this.searchForm.ogfId,
                    ogfName: this.searchForm.ogfName,
                    blockId:this.searchForm.blockId,
                    blockName:this.searchForm.blockName,
                    wellType:this.searchForm.wellType,
                    wellTypeName:this.searchForm.wellTypeName,
                    wellId: this.searchForm.wellId,
                    wellName: this.searchForm.wellName
                })
            }
        },
    };
</script>

<style scoped="scoped" lang="scss">
    .app-container{
        height:100%;
        .pagePanelNew{
            height:100%;
            .g-pageHeader{
                height:50px;
            }
            .container{
                // padding:0 10px;
                height:calc(100% - 50px);
                .search{
                    height:50px;
                }
                .childComponents{
                    height:calc(100% - 50px);
                    overflow-y: scroll;
                    overflow-x: hidden;
                    .tableHeight{
                        height:calc(100% - 50px);
                        padding-right:20px;
                        overflow-y: scroll;
                        overflow-x: hidden;
                        .block-view{
                            height:350px;
                            
                        }
                    }
                }
            }
        }
    }
</style>
