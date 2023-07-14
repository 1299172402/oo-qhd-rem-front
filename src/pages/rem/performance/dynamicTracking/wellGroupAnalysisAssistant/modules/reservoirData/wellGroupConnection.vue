<!--井组连通图-->
<template>
    <div class="z-main">
        <div class="z-container">
            <div class="v1">
                <page-panel-new style="height:100%;margin-top:0;" show-btn>
                    <div class="v1-con">
                        <el-image :src="src">
                            <div slot="error"></div>
                        </el-image>
                    </div>
                </page-panel-new>
            </div>
            <div class="v2">
                <el-table id="tableData" highlight :data="tableData" style="width: 100%" height="100%">
                    <el-table-column type="index" label="序号" align="center"></el-table-column>
                    <el-table-column prop="proWell" label="井名" align="center"></el-table-column>
                    <el-table-column prop="wellType" label="井别" align="center"></el-table-column>
                    <!-- <el-table-column prop="layerThickness" label="油层厚度"></el-table-column>
                    <el-table-column prop="injWell" label="注水井"></el-table-column>
                    <el-table-column prop="injLayer" label="水井层位"></el-table-column>
                    <el-table-column prop="injLayerThickness" label="水井层位厚度"></el-table-column> -->
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import {conectionPlot} from "@/api/oilDeposit/rem-01/wellgroupdynamicanalysis.js";
    import {exportExcel} from "@/lib/exportExcel.js";
    // miniIo
    import {queryRemUploadFileMinio} from "@/api/rem/remuploadfileminio";
    import {downFile} from "@/components/upload/utils/file";
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
                //mniIo
                fileId:'',
                filestrId:'',
                src:'',
                
                tableData: [],
            };
        },
        mounted() {
            this.doSearch();
        },
        methods: {
            doSearch() {
                this.queryRemUploadFileMinioApi();
                this.conectionPlotApi();
            },
            //获取minio图片
            async queryRemUploadFileMinioApi(){
                let params ={
                    operationId:this.blockId+'-'+this.wellGroupId,
                    operationType:'WELLGROUPJZLTT',
                    readOne:'one',
                }
                await queryRemUploadFileMinio(params).then((res) => {
                    if (res.data.code == 200) {
                        if(res.data.data.length){
                            this.fileId=res.data.data[0].fileId;
                            this.filestrId=res.data.data[0].filestrId;
                            downFile(this.fileId).then((res)=>{
                                this.src=window.URL.createObjectURL(res);
                            })
                        }else{
                            this.src='';
                        }
                    }else {
                        this.$message.error("文件查询接口异常!");
                    }
                });
            },
            //获取表格数据
            conectionPlotApi(){
                let request = {
                    oilFieldId: this.oilFieldId,
                    fieldId: this.blockId,
                    wellGroupId: this.wellGroupId,
                };
                conectionPlot(request).then((res) => {
                    if (res.data.code == 200) {
                        let data = res.data.data.data;
                        this.tableData = data.wellGroupConnections;
                    }
                });
            },
            //下载功能
            doDownLoad() {
                let fileName = '井组连通图';
                let file_suffix=this.filestrId.split('.')[1];
                downFile(this.id).then(res=>{
                    FileSaver.saveAs(res,`${fileName}.${file_suffix}`);
                })
                exportExcel('#tableData', fileName);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .z-main {
        width: 100%;
        height: calc(100% - 101px);
        display: flex;
        flex-direction: column;

        .z-container{
            width: 100%;
            flex:1;
            height:0;
            display: flex;
            overflow-y: scroll;
            .v1{
                flex:2;
                margin-right:20px;
                .v1-con{
                    width:100%;
                    height:100%;
                    overflow-y: scroll;
                }
            }
            .v2{
                flex:1;
            }
        }
    }
</style>
