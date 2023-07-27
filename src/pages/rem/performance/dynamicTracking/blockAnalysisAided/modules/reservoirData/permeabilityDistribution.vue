<!-- 渗透率分布图 -->
<template>
    <div style="height:calc(100% - 100px);">
        <div class="z-search">
            <el-select v-model="selectPosition" style="width: 220px;" placeholder="请选择" filterable clearable>
                <el-option v-for="(item,index) in position" :key="index" :label="item.layerName" :value="item.fieldLayerId"></el-option>
            </el-select>
        </div>
        <div class="z-main">
            <page-panel-new style="height:100%;margin-top:0;" show-btn>
                <H5Chart ref="H5Chart" height="100%" :url="url" width="100%" @load="frameLoad"></H5Chart>
            </page-panel-new>
        </div>
        <el-dialog width="10px" max-height="10px" :visible.sync="dialogVisible" style="margin-top: 98%; margin-right: 2%">
            <H5Chart1 style="z-index: -9999;" ref="downH5Chart" :url="url1" width="4000px" height="4000px"></H5Chart1>
        </el-dialog>
    </div>
</template>

<script>
    import {fieldOilLayers} from "@/api/oilDeposit/rem-02/primaryinfo";
    import {dynamicDataDynamicLiquidLevelContourMap,} from "@/api/oilDeposit/rem-01/fielddynamicanalysis";
    import H5Chart from "@/components/tools/H5Chart/index.vue";
    import H5Chart1 from "@/components/tools/H5Chart/index1.vue";

    var _this;
    export default {
        name: "permeabilityDistribution",
        components: {
            H5Chart,
            H5Chart1,
        },
        props: {
            oilFieldId: {},
            blockId: {}
        },
        data() {
            return {
                dialogVisible: false,
                downFile: false,
                url: 'static/IsoFrameCom/View/eWGraphFrameShow-InterlayerGradient.html',
                url1: 'static/IsoFrameCom1/IsoFrameCom/View/eWGraphFrameShow-InterlayerGradient1.html',
                //选中层位
                selectPosition: '',
                //层位所选择内容信息
                position: [],
                image: '',
            };
        },
        watch: {
            //监听层位信息，给其动态传值
            selectPosition(val) {
                console.log("dfghbdsadadasdasd")
                this.$emit('childPara', this.selectPosition);
                this.OnChangeImage();
            }
        },
        mounted() {
            _this = this;
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
                        } else {
                            this.position = [];
                        }
                    }
                });
                
                this.dynamicDataDynamicLiquidLevelContourMapApi();
                
            },
            dynamicDataDynamicLiquidLevelContourMapApi(){
                let request = {
                    oilFieldId: this.oilFieldId,
                    fieldId: this.blockId,
                    layerId: this.selectPosition,
                }
                dynamicDataDynamicLiquidLevelContourMap(request).then((res) => {
                    if (res.data.code == 200) {
                        if (res.data.data.layerPics) {
                            if (res.data.data.layerPics.length > 0) {
                                let imageData = res.data.data.layerPics[0];
                                console.log(imageData,88)
                                this.image = 'data:' + imageData.type + ';base64,' + imageData.data;
                                console.log(this.image)
                            } else {
                                this.image = '';
                            }
                        } else {
                            this.image = '';
                        }
                        if (res.data.data) {
                            this.layerData = res.data.data;
                            this.sjcl(res.data.data, this.$refs.H5Chart);
                        }
                    } else {
                        this.image = '';
                    }
                });
            },
            //切换图片
            OnChangeImage() {
                this.image = '';
                this.dynamicDataDynamicLiquidLevelContourMapApi();
            },
            //frame加载
            frameLoad() {
                this.loadFinish = true;
                if (this.layerData) {
                    this.sjcl(this.layerData, this.$refs.H5Chart)
                }
            },
            sjcl(tc, refObj) {
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
                let LayerName = "等值线图层"
                let LayerType = 8
                let Active = true
                let Display = true
                let LayerIndex = 8
                let data = {}
                let Layers = []
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
                let Layers_cont = {}
                Layers_cont.LayerName = LayerName
                Layers_cont.LayerType = LayerType
                Layers_cont.Active = Active
                Layers_cont.Display = Display
                Layers_cont.LayerIndex = LayerIndex
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
                    }
                    Objects[i] = object
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
                        FillColor: areaLines[i].fillColor ? [parseInt(areaLines[i].fillColor[3]), parseInt(areaLines[i].fillColor[0]),
                            parseInt(areaLines[i].fillColor[1]), parseInt(areaLines[i].fillColor[2])
                        ] : [155, 215, 215, 100],
                        //FillColor: [155,215,215,100],
                        Points: areaLines[i].points
                    }
                    Objects1[i] = object1
                }
                Layers_cont.Objects = Objects
                //Layers[0] = Layers_cont;
                let LayerName1 = "等值线填充颜色图层"
                let LayerType1 = 9
                let Active1 = true
                let Display1 = true
                let LayerIndex1 = 8
                let Layers_cont1 = {}
                Layers_cont1.LayerName = LayerName1
                Layers_cont1.LayerType = LayerType1
                Layers_cont1.Active = Active1
                Layers_cont1.Display = Display1
                Layers_cont1.LayerIndex = LayerIndex1
                Layers_cont1.Objects = Objects1
                Layers[0] = Layers_cont1;
                var reColor = [];
                var colorList = obj.colorList;
                if (colorList != null) {
                    colorList.forEach((item, index) => {
                        var colorInfo = {
                            "A": item.a,
                            "R": item.r,
                            "G": item.g,
                            "B": item.b
                        }
                        reColor.push(colorInfo);
                    })
                }
                let layer3 = {
                    "LayerName": "等值线颜色填充",
                    "LayerType": 0,
                    "Active": true,
                    "Display": true,
                    "LayerIndex": 1,
                    "ClearLayer": true,
                    "Objects": [{
                        "ObjType": 144,
                        "PositionX": MinXMap + 630,
                        "PositionY": MaxYMap - 200,
                        "Width": 200,
                        "Height": 2500,
                        "Text": obj.text == null ? [] : obj.text,
                        "ColorList": reColor
                    }],
                }
                Layers[1] = layer3;
                data.Layers = Layers
                refObj.setSampleDate(data);
            },
            //下载功能
            async doDownLoad() {
                this.dialogVisible = true;
                setTimeout(() => {
                    _this.sjcl(_this.layerData, _this.$refs.downH5Chart)
                    this.dialogVisible = false;
                    setTimeout(() => {
                        _this.$refs.downH5Chart.downLoadAllPicture();
                    }, 2000)
                }, 1000)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .z-search{
        height:50px;
    }
    .z-main{
        width: 100%;
        height:calc(100% - 50px);
        overflow: auto;
        // border: 1px solid #ddd;
        border-image: linear-gradient(180deg, rgba(0, 96, 166, 0.2), var(--onlyLightBlueColor)) 1 1;
    }
</style>
