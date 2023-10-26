<!--米采液指数-->
<template>
    <div class="z-main">
        <div class="z-search">
            <el-select v-model="selectPosition" style="width: 220px;margin-right:20px;" placeholder="请选择" filterable @change="positionChange">
                <el-option v-for="(item, index) in position" :key="index" :label="item.layerName" :value="item.fieldLayerId"></el-option>
            </el-select>
            <el-radio-group v-model="radioType" style="margin-right:20px;">
                <el-radio label="LIQUID">产液</el-radio>
                <el-radio label="OIL">产油</el-radio>
            </el-radio-group>
            <span>日期：</span>
            <el-date-picker v-model="yearTime" type="month" placeholder="选择年月" value-format="yyyy-MM-dd" style="margin-right:20px;"></el-date-picker>
            <el-button type="primary" @click="OnChangeImage">确认</el-button>
        </div>
        <div class="z-echarts">
            <page-panel-new style="height:100%;margin-top:0;" show-btn>
                <H5Chart ref="H5Chart" height="100%" :url="url" width="100%"></H5Chart>
            </page-panel-new>
        </div> 
        <el-dialog width="10px" max-height="10px" :visible.sync="dialogVisible1" style="margin-top: 98%; margin-right: 2%">
            <H5Chart1 style="z-index: -9999;" ref="downH5Chart1" :url="url1" width="4000px" height="4000px"></H5Chart1>
        </el-dialog>
    </div>
</template>

<script>
    import { fieldOilLayers } from '@/api/oilDeposit/rem-02/primaryinfo.js';
    import { meterProIndicator } from '@/api/oilDeposit/rem-01/fielddynamicanalysis.js';
    import { downFile } from '@/lib/remBase64Download.js';
    import H5Chart from '@/components/tools/H5Chart/index.vue';
    import H5Chart1 from '@/components/tools/H5Chart/index1.vue';
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
                dialogVisible1: false,
                url1: '/IsoFrameCom1/IsoFrameCom/View/eWGraphFrameShow-InterlayerGradient1.html',
                url: '/IsoFrameCom/View/eWGraphFrameShow-InterlayerGradient.html',
                radioType: 'LIQUID',
                radio: 1,
                src: '../../static/img/blockAnalysisAided/dynamicInformation/liquidOilWaterDifference.png',
                //选中层位
                selectPosition: '',
                //层位所选择内容信息
                position: [],
                image: '',
                yearTime: new Date().format('yyyy-MM-dd')
            };
        },
        
        async mounted() {
            await this.doSearch();
        },
        methods: {
            async doSearch() {
                await this.fieldOilLayersApi();
                await this.queryRemUploadFileMinioApi();
                this.OnChangeImage();
            },
            //初始化获取层段关系
            async fieldOilLayersApi(){
                await fieldOilLayers({oilFieldId: this.oilFieldId,fieldId: this.blockId,wellId: ''}).then((res) => {
                    if (res.data.code == 200) {
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
            //层位change
            positionChange(val){
                this.$emit('childPara', this.selectPosition, this.picType);
                this.OnChangeImage();
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
            //获取图层信息
            async OnChangeImage() {
                let request = {
                    oilFieldId: this.oilFieldId,
                    fieldId: this.blockId,
                    layerId: this.selectPosition,
                    year: this.yearTime,
                    liquidType: this.radioType
                };
                await meterProIndicator(request).then((res) => {
                    if (res.data.code == 200) {
                        if (res.data.data) {
                            this.layerData = res.data.data;
                            this.sjcl(res.data.data, this.$refs.H5Chart);
                        }
                    }
                });
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
                        var colorInfo = { A: item.a, R: item.r, G: item.g, B: item.b };
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
                this.dialogVisible1 = true;
                setTimeout(() => {
                    this.sjcl(this.layerData, this.$refs.downH5Chart1);
                    this.dialogVisible1 = false;
                    setTimeout(() => {
                        this.$refs.downH5Chart1.downLoadAllPicture();
                    }, 2000);
                }, 1000);
            },
        }
    };
</script>

<style lang="scss" scoped>
    .z-main{
        width: 100%;
        height:calc(100% - 86px);
        display:flex;
        flex-direction: column;
        padding-bottom:15px;
        .z-search{
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }
        .z-echarts{
            width: 100%;
            flex:1;
        }
    }
</style>
