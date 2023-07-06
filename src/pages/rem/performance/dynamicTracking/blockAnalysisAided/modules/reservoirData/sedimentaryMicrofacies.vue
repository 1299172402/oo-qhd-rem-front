<!--沉积相图-->
<template>
    <div style="height:calc(100% - 100px);">
        <div class="z-search">
            <el-select v-model="selectPosition" style="width: 220px;" placeholder="请选择" filterable clearable @change="selectChange">
                <el-option v-for="(item,index) in position" :key="index" :label="item.layerName" :value="item.fieldLayerId"></el-option>
            </el-select>
        </div>
        <div class="z-main">
            <el-image :src="src">
                <div slot="error"></div>
            </el-image>
        </div>
    </div>
</template>

<script>
    import {fieldOilLayers} from "@/api/oilDeposit/rem-02/primaryinfo.js";
    // miniIo
    import {queryRemUploadFileMinio} from "@/api/rem/remuploadfileminio";
    import {filePreview,downFile} from "@/components/upload/utils/file";
    import FileSaver from "file-saver";
    export default {
        props: {
            oilFieldId: {},
            blockId: {},
        },
        data() {
            return {
                //mniIo
                fileId:'',
                filestrId:'',
                src:'',
                //层位数据源
                position: [],//选中层位
                selectPosition: '',
            };
        },
        async mounted() {
            await this.fieldOilLayersApi();
            this.doSearch();
        },
        methods: {
            //获取层位接口
            async fieldOilLayersApi(){
                //初始化获取层段关系
                await fieldOilLayers({
                    oilFieldId: this.oilFieldId,
                    fieldId: this.blockId,
                    wellId: '',
                }).then((res) => {
                    if (res.data.code == 200) {
                        //层段数据
                        if (res.data.data) {
                            this.position = res.data.data.fieldLayers;
                            if (!this.selectPosition && this.position[0]) {
                                if (this.blockId == '6CD7342CA6DD418183A4B3BC38584F7C' || this.blockId == 'B440B47EE4D64C6CB56100AFE868DCA3') {
                                    if (this.position.find((item) => {
                                            return item.fieldLayerId == '263518079CED49AE8B6C9FE5CEBDD26A'
                                        })) {
                                        this.selectPosition = '263518079CED49AE8B6C9FE5CEBDD26A';
                                    } else {
                                        this.selectPosition = this.position[0].fieldLayerId;
                                    }
                                }else if (this.blockId == 'F35E226D47CE4B09B497B852D774D122') {
                                    if (this.position.find((item) => {
                                            return item.fieldLayerId == '87795A3E6BBC4469BC9AC5AE0BBE759C'
                                        })) {
                                        this.selectPosition = '87795A3E6BBC4469BC9AC5AE0BBE759C';
                                    } else if (this.position.find((item) => {
                                            return item.fieldLayerId == '02398139A19A4F62BEFAC658E870D487'
                                        })) {
                                        this.selectPosition = '02398139A19A4F62BEFAC658E870D487';
                                    } else {
                                        this.selectPosition = this.position[0].fieldLayerId;
                                    }
                                } else {
                                    this.selectPosition = this.position[0].fieldLayerId;
                                } 
                                this.$emit('childPara', this.selectPosition);
                            }
                        } else {
                            this.position = [];
                        }
                        this.$emit('childPara', this.selectPosition);
                    }
                });
            },
            //获取图片
            doSearch() {
                this.imageList=[];
                let params ={
                    operationId:this.blockId+'-'+this.selectPosition,
                    operationType:'BLOCKCJXT',
                    readOne:'one' 
                }
                queryRemUploadFileMinio(params).then((res) => {
                    if (res.data.code == 200) {
                        if(res.data.data.length){
                            this.fileId=res.data.data[0].fileId;
                            this.filestrId=res.data.data[0].filestrId;
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
            //层位change
            selectChange(e){
                this.$emit('childPara', e);
                this.doSearch();
            },
            //下载功能
            doDownLoad() {
                let fileName = '沉积相图';
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
        height:50px;
    }
    .z-main{
        width: 100%;
        height:calc(100% - 50px);
        overflow: auto;
    }
</style>
