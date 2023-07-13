<!--液油含水等值线图-->
<template>
    <div class="z-main">
        <div class="z-search">
            <el-select v-model="selectPosition" style="width: 220px;margin-right:20px;" placeholder="请选择"  clearable>
                <el-option v-for="(item, index) in position" :key="index" :label="item.layerName" :value="item.fieldLayerId"></el-option>
            </el-select>
            <el-radio-group v-model="radioType" style="margin-right:20px;">
                <el-radio label="LIQUID">产液</el-radio>
                <el-radio label="OIL">产油</el-radio>
                <el-radio label="WATER">含水</el-radio>
            </el-radio-group>
            <span>时间：</span>
            <el-date-picker v-model="yearTime" type="month" placeholder="选择月" value-format="yyyy-MM" style="margin-right:20px;"></el-date-picker>
            <el-button type="primary" @click="OnChangeImage">确认</el-button>
            <el-button type="primary" @click="openSetUpDialog">设置底图</el-button>
            <div class="contourLine" style="display: flex;align-items: center;margin-left:20px;" v-if="intervalNum">
                <span>等值线颜色：</span>
                <el-color-picker v-model="form.color1" show-alpha size="small" style="margin-right:15px;"/>
                <el-color-picker v-model="form.color2" show-alpha size="small" style="margin-right:15px;" />
                <el-color-picker v-model="form.color3" show-alpha size="small" style="margin-right:15px;" />
                <el-color-picker v-model="form.color4" show-alpha size="small" style="margin-right:15px;" />
                <span>等值线间隔：</span>
                <el-input type="number" v-model="form.interval" style="width:150px"></el-input>
                <span>（可设区间：大于0 且 小于{{intervalNum}}）</span>
                <el-button type="primary" @click="sureContourLine">绘制</el-button>  
            </div>
        </div>
        <div class="z-echarts">
            <H5Chart ref="H5Chart" height="100%" :url="url" width="100%" @load="frameLoad"></H5Chart>
        </div>
        <el-dialog width="10px" max-height="10px" :visible.sync="dialogVisible1" style="margin-top: 98%; margin-right: 2%">
            <H5Chart1 style="z-index: -9999;" ref="downH5Chart1" :url="url1" width="4000px" height="4000px"></H5Chart1>
        </el-dialog>
        <!-- 设置底图 -->
        <el-dialog title="设置底图" :visible.sync="setUpDialog" width="800px" :close-on-click-modal="false">
            <div class="uploadBox">
                <el-upload ref="upload" class="upload-demo" action="" :multiple="false" :limit="1" :auto-upload="false" :on-change="useUploadPic" :show-file-list="false">
                    <el-button type="primary" style="height:32px;">上传底图</el-button>
                </el-upload>
            </div>
            <el-table 
                :data="fileTableList" 
                :row-style="{ height: '0px' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
                header-cell-class-name="table_header"
                style="width:100%;"
                height="400"
                :cell-style="{ padding: '6px', 'text-align': 'center' }"
                :default-sort="{ prop: 'uploadDate', order: 'descending' }">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="uploadDate" label="上传时间" sortable width="160px"></el-table-column>
                <el-table-column prop="fileName" label="文件名" width="330px"></el-table-column>
                <el-table-column prop="midMD" label="操作" width="170" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-if="scope.row.currentUse==='1'">当前使用</span>
                        <el-button type="primary" style="height:26px;" v-if="scope.row.currentUse!=='1'" @click="putFilePathListApi(scope)">使用</el-button>
                        <el-button class="errorBtn" style="height:26px;" v-if="scope.row.currentUse!=='1'" @click="deleteFileApi(scope)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button class="cancelBtn" @click="setUpDialog = false">取 消</el-button>
                <el-button type="primary" @click="setUpDialog = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { dynamicDataOilWaterContourMap } from '@/api/oilDeposit/rem-01/fielddynamicanalysis.js';
    import { fieldOilLayers,uploadFile } from '@/api/oilDeposit/rem-02/primaryinfo.js';
    import { getFilePathList,putFilePathList,deleteFile } from '@/api/oilDeposit/rem-04/oilAuxiliaryAnalysis.js';
    import H5Chart from '@/components/tools/H5Chart/index.vue';
    import H5Chart1 from '@/components/tools/H5Chart/index1.vue';
    import { downFile } from '@/lib/remBase64Download.js';
    
    // miniIo
    import {queryRemUploadFileMinio} from "@/api/rem/remuploadfileminio";
    import {downFile as minioDownFile} from "@/components/upload/utils/file";
    import FileSaver from "file-saver";
    export default {
        components: {
            H5Chart,
            H5Chart1
        },
        props: {
            oilFieldId: {},
            blockId: {}
        },
        data() {
            return {
                url: '/IsoFrameCom/View/eWGraphFrameShow-InterlayerGradient.html',
                url1: '/IsoFrameCom1/IsoFrameCom/View/eWGraphFrameShow-InterlayerGradient1.html',
                dialogVisible1: false,
                //选中层位
                selectPosition: '',
                //层位所选择内容信息
                position: [],
                image: '',
                layerData: [],
                radioType: 'LIQUID',
                yearTime: new Date().format('yyyy-MM'),
                csData: '',
                //设置底图
                setUpDialog: false,
                fileTableList:[],
                //自定义等值线
                form: {
                  interval: '', 
                  color1:'',
                  color2:'',
                  color3:'',
                  color4:'',
                },
                intervalNum:0,//等值线间隔最大值。
            };
        },
        watch: {
            //监听层位信息，给其动态传值
            selectPosition(val) {
                this.$emit('childPara', this.selectPosition);
                this.OnChangeImage();
                this.getFilePathListApi();
            }
        },
        async mounted() {
            await this.doSearch();
        },
        methods: {
            async doSearch() {
                await this.fieldOilLayersApi();
                await this.queryRemUploadFileMinioApi();
                this.OnChangeImage();
                //获取上传文件列表
                this.getFilePathListApi();
            },
            //初始化获取层段关系
            async fieldOilLayersApi(){
                await fieldOilLayers({oilFieldId: this.oilFieldId,fieldId: this.blockId,wellId: ''}).then((res) => {
                    if (res.data.code == 200) {
                        //层段数据
                        if (res.data.data) {
                            this.position = res.data.data.fieldLayers;
                            if (!this.selectPosition && this.position[0]) {
                                let isTrue=this.position.find((item) => {return item.fieldLayerId == '263518079CED49AE8B6C9FE5CEBDD26A'})
                                if (isTrue){
                                    this.selectPosition = '263518079CED49AE8B6C9FE5CEBDD26A';//临时
                                }else{
                                    this.selectPosition = this.position[0].fieldLayerId;
                                }
                                this.$emit('childPara', this.selectPosition, this.picType);
                            }
                        } else {
                            this.position = [];
                        }
                    }
                });
            },
            //获取底图
            async queryRemUploadFileMinioApi(){
                let params ={
                    operationId:this.blockId,
                    operationType:'BLOCK',
                    readOne:'one' 
                }
                await queryRemUploadFileMinio(params).then((res) => {
                    if (res.data.code == 200) {
                        if(res.data.data.length){
                            let fileId= res.data.data[0].fileId;
                            minioDownFile(fileId).then((res)=>{
                                let src=window.URL.createObjectURL(res);
                                const image = new Image();
                                image.src = src;
                                image.onload = () => {
                                  // 构建canvas节点
                                  const canvas = document.createElement('canvas');
                                  canvas.width = image.width;
                                  canvas.height = image.height;
                                  const context = canvas.getContext('2d');
                                  context.drawImage(image, 0, 0, image.width, image.height);
                                  // 转换
                                  const imgBase64 = canvas.toDataURL();
                                  this.image=imgBase64;
                                };
                            })
                        }else{
                            this.image='';
                        }
                    }else {
                        this.$message.error("文件查询接口异常!");
                    }
                });
            },
            //切换图片
            async OnChangeImage() {
                this.intervalNum=0;
                let request = {
                    oilFieldId: this.oilFieldId,
                    fieldId: this.blockId,
                    layerId: this.selectPosition,
                    year: this.yearTime + '-01',
                    liquidType: this.radioType
                };
                await dynamicDataOilWaterContourMap(request).then((res) => {
                    if (res.data.code == 200) {
                        if (res.data.data) {
                            if(res.data.data.areaLine){
                                let list=res.data.data.areaLine;
                                let max = Math.max.apply(Math, list.map(i => {return Number(i.isolineValue) }));
                                let min = Math.min.apply(Math, list.map(i => {return Number(i.isolineValue) }));
                                this.intervalNum=this.numSub(max,min);
                            }
                            this.layerData = res.data.data;
                            this.sjcl(res.data.data, this.$refs.H5Chart);
                        }
                    } 
                });
            },
            //两数向减
            numSub(num1, num2) {
                let baseNum, baseNum1, baseNum2;
                let precision;// 精度
                try {
                    baseNum1 = num1.toString().split(".")[1].length;
                } catch (e) {
                    baseNum1 = 0;
                }
                try {
                    baseNum2 = num2.toString().split(".")[1].length;
                } catch (e) {
                    baseNum2 = 0;
                }
                baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
                precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
                return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
            },
            //单选按钮选中改变事件
            changeRadio() {
                this.$emit('childPara', this.selectPosition);
                this.OnChangeImage();
            },
            //frame加载
            frameLoad() {
                this.loadFinish = true;
                if (this.layerData) {
                    this.sjcl(this.layerData, this.$refs.H5Chart);
                }
            },
            //zwm写 hwh修改复用 等值线图
            sjcl(tc, refObj) {
                // this.$router.push({path: "/blockAnalysisAided"});
                let obj = tc;
                let MinXMap = obj.x2;
                let MaxXMap = obj.x3;
                let MinYMap = obj.y2;
                let MaxYMap = obj.y3;
                //let PictureBase64 = obj.data;
                let IsShowPicture = true;
                let PicMinXMap = obj.x2;
                let PicMaxXMap = obj.x3;
                let PicMinYMap = obj.y2;
                let PicMaxYMap = obj.y3;
                let LayerName = '等值线图层';
                let LayerType = 8;
                let Active = true;
                let Display = true;
                let LayerIndex = 8;
                let data = {};
                let Layers = [];
                data.MinXMap = MinXMap;
                data.MaxXMap = MaxXMap;
                data.MinYMap = MinYMap;
                data.MaxYMap = MaxYMap;

                data.PictureBase64 = this.image;
                data.IsShowPicture = IsShowPicture;
                data.PicMinXMap = PicMinXMap;
                data.PicMaxXMap = PicMaxXMap;
                data.PicMinYMap = PicMinYMap;
                data.PicMaxYMap = PicMaxYMap;
                let Layers_cont = {};
                Layers_cont.LayerName = LayerName;
                Layers_cont.LayerType = LayerType;
                Layers_cont.Active = Active;
                Layers_cont.Display = Display;
                Layers_cont.LayerIndex = LayerIndex;
                let Objects = [],
                    Objects1 = [];
                let areaLines = obj.areaLine;
                for (let i = 0; i < areaLines.length; i++) {
                    let object = {
                        ObjType: 131,
                        Closed: false,
                        ShowDot: false,
                        Value: areaLines[i].isolineValue ? areaLines[i].isolineValue : '',
                        ViewPen: {
                            /*PenColorA: 255,
                                PenColorR: 0,
                                PenColorG: 255,
                                PenColorB: 0,*/
                            PenColorA: parseInt(areaLines[i].fillColor[3]),
                            PenColorR: parseInt(areaLines[i].fillColor[0]),
                            PenColorG: parseInt(areaLines[i].fillColor[1]),
                            PenColorB: parseInt(areaLines[i].fillColor[2]),
                            PenWidth: 2,
                            PenDashStyle: 0
                        },
                        circleRadius: 0,
                        ViewPenCircle: {
                            PenColorA: 0,
                            PenColorR: 255,
                            PenColorG: 255,
                            PenColorB: 255,
                            PenWidth: 0,
                            PenDashStyle: 0
                        },
                        ViewBrushCircle: {
                            BrushColorA: 0,
                            BrushColorR: 255,
                            BrushColorG: 0,
                            BrushColorB: 0,
                            FillStyle: 5
                        },
                        UseSign: true,
                        Points: areaLines[i].points
                    };
                    Objects[i] = object;
                    let object1 = {
                        ObjType: 132,
                        Closed: false,
                        ShowDot: false,
                        Value: areaLines[i].isolineValue ? areaLines[i].isolineValue : '',
                        ViewPen: {
                            PenColorA: 255,
                            /*PenColorR: parseInt(areaLines[i].objects.fillColor.substr(1,3),16),
                                PenColorG:parseInt(areaLines[i].objects.fillColor.substr(3,5),16),
                                PenColorB: parseInt(areaLines[i].objects.fillColor.substr(5,7),16),*/
                            PenColorR: 0,
                            PenColorG: 255,
                            PenColorB: 0,
                            PenWidth: 2,
                            PenDashStyle: 0
                        },
                        circleRadius: 0,
                        ViewPenCircle: {
                            PenColorA: 0,
                            PenColorR: 255,
                            PenColorG: 255,
                            PenColorB: 255,
                            PenWidth: 0,
                            PenDashStyle: 0
                        },
                        ViewBrushCircle: {
                            BrushColorA: 0,
                            BrushColorR: 255,
                            BrushColorG: 0,
                            BrushColorB: 0,
                            FillStyle: 5
                        },
                        UseSign: true,
                        FillColor: areaLines[i].fillColor
                            ? [parseInt(areaLines[i].fillColor[3]), parseInt(areaLines[i].fillColor[0]), parseInt(areaLines[i].fillColor[1]), parseInt(areaLines[i].fillColor[2])]
                            : [155, 215, 215, 100],
                        //FillColor: [155,215,215,100],
                        Points: areaLines[i].points
                    };
                    Objects1[i] = object1;
                }
                Layers_cont.Objects = Objects;
                //Layers[0] = Layers_cont;
                let LayerName1 = '等值线填充颜色图层';
                let LayerType1 = 9;
                let Active1 = true;
                let Display1 = true;
                let LayerIndex1 = 8;
                let Layers_cont1 = {};
                Layers_cont1.LayerName = LayerName1;
                Layers_cont1.LayerType = LayerType1;
                Layers_cont1.Active = Active1;
                Layers_cont1.Display = Display1;
                Layers_cont1.LayerIndex = LayerIndex1;
                Layers_cont1.Objects = Objects1;
                Layers[0] = Layers_cont1;
                var reColor = [];
                var colorList = obj.colorList;
                if (colorList != null) {
                    colorList.forEach((item, index) => {
                        var colorInfo = {
                            A: item.a,
                            R: item.r,
                            G: item.g,
                            B: item.b
                        };
                        reColor.push(colorInfo);
                    });
                }
                let layer3 = {
                    LayerName: '等值线颜色填充',
                    LayerType: 0,
                    Active: true,
                    Display: true,
                    LayerIndex: 1,
                    ClearLayer: true,
                    Objects: [
                        {
                            ObjType: 144,
                            PositionX: MinXMap + 600,
                            PositionY: MaxYMap - 200,
                            Width: 200,
                            Height: 2500,
                            Text: obj.text == null ? [] : obj.text,
                            ColorList: reColor
                        }
                    ]
                };
                Layers[1] = layer3;
                data.Layers = Layers;
                refObj.setSampleDate(data);
            },
            //下载功能
            doDownLoad() {
                /*let fileName = '液油含水等值线图';
                    let layerMess = this.position.find((item)=>item.fieldLayerId==this.selectPosition);
                    if(layerMess){
                      fileName = (layerMess.layerName? layerMess.layerName : '' )+ fileName;
                    }
                    if(this.blockName){
                      fileName = this.blockName + fileName;
                    }
                    downFile(this.image,fileName);*/
                //this.$refs.H5Chart.downLoadAllPicture();
                this.dialogVisible1 = true;
                setTimeout(() => {
                    console.log(this.$refs.downH5Chart1);
                    this.sjcl(this.layerData, this.$refs.downH5Chart1);
                    //this.sjcl(this.layerData, this.$refs.downH5Chart1)
                    this.dialogVisible1 = false;
                    setTimeout(() => {
                        this.$refs.downH5Chart1.downLoadAllPicture();
                    }, 2000);
                }, 1000);
            },
            //打开设置弹框
            openSetUpDialog(){
                this.setUpDialog=true;
            },
            //获取上传文件列表接口
            async getFilePathListApi(){
                let params={
                    ogfId:this.oilFieldId,// 油田标识
                    blockId:this.blockId,//区块标识
                    layerId:this.selectPosition,//层位id
                    fileType:'LIQUID_OIL_WATER_EQUIVALENCE',//文件类型
                }
                await getFilePathList(params).then(res=>{
                    if(res.data.code==200){
                        this.fileTableList=[];
                        this.fileTableList=res.data.data;
                    }
                })
            },
            //上传底图
            async useUploadPic(file, fileList) {
                console.log(file);
                // return 
                //获得油田参数 展示不用
                let oilFieldid = this.oilFieldId;
                //获得区块id
                let block = this.blockId;
                //一级目录 油井目录
                let firstPath = 'field';
                //文件类型
                let fileType = file.raw.type;
                if (this.isCorrectFileType(fileType)) {
                    return false;
                }
                //获得图片二进制流
                const fileData = await this.selectImageFile(file.raw);
                let fileDataNew = fileData.replace(/^data:\w+\/[a-zA-Z-]+;base64,/, "");
                //获得当前选项中的映射关系
                let tabName ={name: 'oilwaterIsoline',pathName: 'LIQUID_OIL_WATER_EQUIVALENCE'};
                let position = this.selectPosition;
                //有井层的情况
                let fileName = '';
                if (position == null || position == '' || position == undefined) {
                    fileName = tabName.pathName + '_' + block;
                } else {
                    fileName = tabName.pathName + '_' + position + '_' + block;
                }
                //请求参数
                let request = {
                    ogfId:this.oilFieldId,//新增参数-油田标识
                    layerId:this.selectPosition,//新增参数-层位id
                    fileOriginalName:file.name.substring(0,file.name.lastIndexOf('.')),//新增参数-文件名称
                    data: fileDataNew,
                    contentType: fileType,//文件类型
                    fieldId: block,//区块id
                    fileName: fileName,
                    path: firstPath,
                    wellGroupId: '',//井组id
                    wellId: '',//井id
                    operatingCompanyId: '',
                    platformId: '',
                    wellTypeCode: '',
                };
                uploadFile(request).then((res) => {
                    if (res.data.code == 200) {
                        this.getFilePathListApi();
                        this.$message.success('上传成功！');
                    }
                });
            },
            //解析图片文件 图片文件转二进制流
            selectImageFile(file) {
                return new Promise(((resolve, reject) => {
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = ((result) => {
                        resolve(reader.result)
                    });
                }))
            },
            ///判断上传文件是否是正确的类型
            isCorrectFileType(type) {
                if (type == 'image/bmp' || type == 'image/gif' || type == 'image/x-icon' || type == 'image/pipeg' || type == 'image/jpeg' || type == 'image/png') {
                    return false;
                } else {
                    this.$message.error('请上传正确图片类型');
                    return true;
                }
            },
            //删除文件
            deleteFileApi(scope){
                deleteFile({remFileRecordId:scope.row.remFileRecordId}).then(res=>{
                    if(res.data.code==200){
                        this.fileTableList.splice(scope.$index,1);
                    }  
                })
            },
            //使用图片
            putFilePathListApi(scope){
                putFilePathList({remFileRecordId:scope.row.remFileRecordId}).then(res=>{
                    if(res.data.code==200){
                        this.OnChangeImage();
                        this.getFilePathListApi();
                        this.$message.success('使用成功！');
                    }  
                })
            },
            //确定自定义等值线
            sureContourLine(){
                let colorList=[];
                let form=JSON.parse(JSON.stringify(this.form));
                console.log(form,88);
                let colorNum=0;
                for(let key in form){
                    if(key.includes('color')&&form[key]){
                        colorNum+=1;
                        let a=form[key].replace('rgba(','');
                        let b=a.substring(0,a.length-1);
                        let c=b.split(', ');
                        // let obj={ r:c[0],g:c[1], b:c[2],a:c[3]};
                        colorList.push([...c]);
                    }
                }
                if(colorNum<2){
                    this.$message.warning(`最少输入两个线条颜色`);
                    return false;
                }
                console.log(colorList);
                if(form.interval!==''){
                    if(form.interval==='0'){
                        this.$message.warning(`可设区间：大于0 且 小于${this.intervalNum}`);
                        return false;
                    }else if(Number(form.interval)>this.intervalNum){
                        this.$message.warning(`可设区间：大于0 且 小于${this.intervalNum}`);
                        return false;
                    }
                }
                // return;
                let request = {
                    oilFieldId: this.oilFieldId,
                    fieldId: this.blockId,
                    layerId: this.selectPosition,
                    year: this.yearTime + '-01',
                    liquidType: this.radioType,
                    colorList,
                    interval:this.form.interval
                };
                dynamicDataOilWaterContourMap(request).then((res) => {
                    if (res.data.code == 200) {
                        if (res.data.data) {
                            if(res.data.data.areaLine){
                                let list=res.data.data.areaLine;
                                let max = Math.max.apply(Math, list.map(i => {return Number(i.isolineValue) }));
                                let min = Math.min.apply(Math, list.map(i => {return Number(i.isolineValue) }));
                                console.log('max',max)
                                console.log('min',min)
                                this.intervalNum=this.numSub(max,min);
                                console.log('间隔',this.intervalNum);
                            }
                            this.layerData = res.data.data;
                            this.sjcl(res.data.data, this.$refs.H5Chart);
                        }
                    } 
                });
            },
        }
    };
</script>

<style lang="scss" scoped>
    .z-main {
        width: 100%;
        height: calc(100% - 86px);
        display: flex;
        flex-direction: column;
        padding-bottom: 15px;
        .z-search {
            height: 60px;
            display: flex;
            align-items: center;
        }
        .z-echarts {
            padding-top: 15px;
            width: 100%;
            flex: 1;
        }
        .uploadBox{
            display: flex;
            justify-content: flex-end;
            margin-bottom:15px;
        }
        ::v-deep .el-table__header{
            width:100%!important;
        }
        ::v-deep .el-table__body-wrapper{
            .el-table__body{
                width:100%!important;
            }
        }
    }
</style>
