<!--有效厚层图-->
<template>
    <div style="height:calc(100% - 100px);">
        <div class="z-search">
            <el-select v-model="selectPosition" style="width: 220px;" placeholder="请选择" filterable clearable @change="selectChange">
                <el-option v-for="(item,index) in position" :key="index" :label="item.layerName" :value="item.fieldLayerId"></el-option>
            </el-select>
            <div v-if="uploadTime" style="margin-left: 20px;">上传时间：{{ uploadTime }}</div>
        </div>
        <div class="z-main">
            <page-panel-new style="height:100%;margin-top:0;" show-btn>
                <div style="overflow: auto;width: 100%; height: 100%;">   
                    <el-image :src="src" style="width: 100%;">
                        <div slot="error"></div>
                    </el-image>
                </div>
            </page-panel-new>
        </div>
    </div>
</template>

<script>
    import {fieldLayers} from "@/api/oilDeposit/rem-02/primaryinfo.js";
    // miniIo
    import {queryRemUploadFileMinio} from "@/api/rem/remuploadfileminio";
    import {filePreview,downFile} from "@/components/upload/utils/file";
    import FileSaver from "file-saver";
    export default {
        props: {
            //油田id
            oilFieldId: {},  
            //区块id   
            blockId: {},
            //井组id
            wellGroupId: {}
        },
        data() {
            return {
                //mniIo文件列表
                mniIoFiles:[],
                //层位数据源
                position: [],
                //层位绑定值
                selectPosition: '',
                src:'',
                fitInfo:'cover',   
                uploadTime: "", // 图上产传时间
            };
        },
        async mounted() {
            await this.doSearch();
        },
        methods: {
            //获取图片
            async doSearch(isBoolean=true) {
                if(isBoolean){
                    await this.fieldLayersApi();
                }
                let params ={
                    operationId:this.blockId+'-'+this.selectPosition,
                    operationType:'BLOCKYXHDT',
                    readOne:'one' 
                }
                await queryRemUploadFileMinio(params).then((res) => {
                    if (res.data.code == 200) {
                        if(res.data.data.length){
                            this.fileId=res.data.data[0].fileId;
                            this.filestrId=res.data.data[0].filestrId;
                            this.uploadTime=res.data.data[0].uploadTime || "";
                            downFile(this.fileId).then((res)=>{
                                this.src=window.URL.createObjectURL(res);
                            })
                        }else{
                            this.src="";
                        }
                    }else {
                        this.$message.error("文件查询接口异常!");
                    }
                });
            },
            //层位
            async fieldLayersApi(){
                await fieldLayers({oilFieldId:this.oilFieldId,wellGroupId:this.wellGroupId}).then((res) => {
                    if (res.data.code == 200) {
                        //层段数据
                        if (res.data.data) {
                            if (res.data.data.fieldLayers) {
                                this.position = res.data.data.fieldLayers;
                                for(let i=0;i<this.position.length;i++){
                                    if(this.position[i].fieldLayerId=='26C4B92661D345969091868C256A7902'){
                                        this.selectPosition = '26C4B92661D345969091868C256A7902';
                                        break;
                                    }else if(this.position[i].fieldLayerId=='263518079CED49AE8B6C9FE5CEBDD26A'){
                                        this.selectPosition = '263518079CED49AE8B6C9FE5CEBDD26A';
                                        break;
                                    }else if(this.position[i].fieldLayerId=='87795A3E6BBC4469BC9AC5AE0BBE759C'){
                                        this.selectPosition = '87795A3E6BBC4469BC9AC5AE0BBE759C';
                                        break;
                                    }else if(this.position[i].fieldLayerId=='02398139A19A4F62BEFAC658E870D487'){
                                        this.selectPosition = '02398139A19A4F62BEFAC658E870D487';
                                        break;
                                    }else{
                                        this.selectPosition = this.position[0].fieldLayerId;
                                    }
                                }
                                this.$emit('childPara', this.selectPosition);
                            }
                        }
                    } 
                });
            },
            //层位change
            selectChange(e){
                this.$emit('childPara', e);
                this.doSearch(false);
            },
            //下载功能
            doDownLoad(){
                let fileName = '有效厚度图';
                let layerMess = this.position.find((item) => item.fieldLayerId == this.selectPosition);
                if (layerMess) {
                    fileName= layerMess.layerName +'-'+fileName;
                }
                let file_suffix=this.filestrId.split('.')[1];
                downFile(this.id).then(res=>{
                    FileSaver.saveAs(res,`${fileName}.${file_suffix}`);
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .z-search{
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }
    .z-main{
        width: 100%;
        height:calc(100% - 50px);
        // border: 1px solid #ddd;
        border-image: linear-gradient(180deg, rgba(0, 96, 166, 0.2), var(--onlyLightBlueColor)) 1 1;
        overflow: auto;
    }
</style>

