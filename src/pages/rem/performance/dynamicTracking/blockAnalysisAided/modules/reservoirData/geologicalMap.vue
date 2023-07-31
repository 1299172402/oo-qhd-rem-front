<!--构造图-->
<template>
    <div style="height:calc(100% - 100px);">
        <div class="z-search">
            <el-select v-model="selectPosition" style="width: 220px;" placeholder="请选择" filterable clearable @change="selectChange">
                <el-option v-for="(item,index) in position" :key="index" :label="item.layerName" :value="item.fieldLayerId"></el-option>
            </el-select>
        </div>
        <div class="z-main">
            <div class="z-left-view">
                <page-panel-new style="height:100%;margin-top:0;" show-btn>
                    <iframe style="height: 100%;width: 100%" :src="url"></iframe>
                </page-panel-new>
            </div>
            <div class="z-right-view">
                <page-panel-new style="height:100%;margin-top:0;" show-btn>
                    <el-table
                        id="tableData"
                        :data="tableData" :border="false" :row-style="{ height: '0px' }"
                        header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }"
                        style="width:100%;padding:0 10px;" height="calc(100% - 10px)" :default-sort="{ prop: 'date', order: 'descending' }"
                        :header-cell-style="{ 'text-align': 'center', padding: '0px 0'}">
                        <el-table-column label="序号" type="index" align="center" width="100" fixed></el-table-column>
                        <el-table-column label="层位" prop="layer" align="center" width="140" fixed></el-table-column>
                        <el-table-column label="井号" prop="wellbore" align="center" width="140" fixed></el-table-column>
                        <el-table-column :label="`顶界斜深\n(m)`" prop="topMd" align="center"></el-table-column>
                        <el-table-column :label="`底界斜深\n(m)`" prop="bottomMd" align="center"></el-table-column>
                        <el-table-column label="斜厚" prop="mdThickness" align="center"></el-table-column>
                        <el-table-column :label="`顶界垂深\n(m)`" prop="topTvd" align="center"></el-table-column>
                        <el-table-column :label="`底界垂深\n(m)`" prop="bottomTvd" align="center"></el-table-column>
                        <el-table-column label="垂厚" prop="verticalThickness" align="center"></el-table-column>
                        <el-table-column :label="`反射时长\n(m)`" prop="reflectionDuration" align="center"></el-table-column>
                        <el-table-column label="分层日期" prop="divDate" align="center" min-width="140"></el-table-column>
                        <el-table-column label="层位描述" prop="layerDesc" align="center" min-width="240"></el-table-column>
                        <el-table-column label="接触关系" prop="contectRelationCode" align="center" min-width="200"></el-table-column>
                    </el-table>
                </page-panel-new>
            </div>
        </div>
    </div>
</template>

<script>
    import {fieldOilLayers} from "@/api/oilDeposit/rem-02/primaryinfo.js";
    import { reservoirDataComprehensiveGeologicalMap} from "@/api/oilDeposit/rem-01/fielddynamicanalysis.js";
    import {exportExcel} from "@/lib/exportExcel.js";
    // miniIo
    import {queryRemUploadFileMinio} from "@/api/rem/remuploadfileminio";
    import {filePreview,downFile} from "@/components/upload/utils/file";
    import FileSaver from "file-saver";
    export default {
        props: {
            oilFieldId: {},
            blockId: {}
        },
        data() {
            return {
                //mniIo
                url:'',
                id:'',
                filestrId:'',
                //层位数据源
                position: [],
                //层位绑定值
                selectPosition: '',
                //表格数据
                tableData: [],
            };
        },
        mounted() {
            this.doSearch();
        },
        methods: {
            async doSearch() {
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
                                if (this.blockId == 'YCFXDY8B643EDC9007F96F570600457D' || this.blockId == 'YCFXDY8B643EDC9007F96F570600456D') {
                                    if (this.position.find((item) => {
                                            return item.fieldLayerId == '263518079CED49AE8B6C9FE5CEBDD26A'
                                        })) {
                                        this.selectPosition = '263518079CED49AE8B6C9FE5CEBDD26A';
                                    } else {
                                        this.selectPosition = this.position[0].fieldLayerId;
                                    }
                                } else if (this.blockId == 'YCFXDY8B643EDC9007F96F570600458D') {
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
                            this.$emit('childPara', this.selectPosition);
                        } else {
                            this.position = [];
                        }
                    }
                });
                this.OnChangeImage();
            },
            //获取图片和table数据
            OnChangeImage() {
                let params ={
                    operationId:this.blockId+'-'+this.selectPosition,
                    operationType:'BLOCKZHDZT',
                    readOne:'one' 
                }
                queryRemUploadFileMinio(params).then((res) => {
                    if (res.data.code == 200) {
                        if(res.data.data.length){
                            let data =res.data.data[0].fileId
                            this.id = res.data.data[0].fileId
                            this.filestrId = res.data.data[0].filestrId
                            filePreview(data).then((res)=>{
                                this.url = res.data.data
                            })
                        }
                    }else {
                        this.$message.error("文件查询接口异常!");
                    }
                });
                
                let request = {
                    oilFieldId: this.oilFieldId,
                    fieldId: this.blockId,
                    layerId: this.selectPosition,
                }
                reservoirDataComprehensiveGeologicalMap(request).then((res) => {
                    if (res.data.code == 200) {
                        this.tableData = res.data.data.comGeoFormaDivisions;
                    }
                });
            },
            selectChange(e){
                this.$emit('childPara', e);
                this.OnChangeImage();
            },
            //下载table
            doDownLoad() {
                let fileName = '综合地质图';
                let layerMess = this.position.find((item) => item.fieldLayerId == this.selectPosition);
                if (layerMess) {
                    fileName= layerMess.layerName +'-'+fileName;
                }
                //下载表格
                exportExcel('#tableData',fileName);
                //下载pdf文件
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
        display: flex;
        overflow: hidden;
        .z-left-view{
            width:600px;
            height:100%;
            overflow-y: scroll;
            margin-right:30px;
            // padding-right:40px;
            // border: 1px solid #ddd;
            // border-image: linear-gradient(180deg, rgba(0, 96, 166, 0.2), var(--onlyLightBlueColor)) 1 1;
        }
        .z-right-view{
            flex:1;
            width:0;
        }
    }
    #tableData{
        ::v-deep .el-table__header-wrapper .cell{
            height: auto;
            line-height: 18px;
            white-space: pre;
        }
        ::v-deep .cell:empty{
            &::before {
                content: '-';
            } 
        }
    } 
</style>
