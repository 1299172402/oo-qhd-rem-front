<!--累产液产油现状图-->
<template>
    <div class="z-main">
        <div class="z-search">
            <el-select v-model="selectPosition" style="width: 220px;margin-right:20px;" placeholder="请选择" filterable @change="positionChange">
                <el-option v-for="(item,index) in position" :key="index" :label="item.layerName" :value="item.fieldLayerId"></el-option>
            </el-select>
            <el-radio-group v-model="radioType" style="margin-right:20px;">
                <el-radio label="LIQUID">产液</el-radio>
                <el-radio label="OIL">产油</el-radio>
            </el-radio-group>
            <div class="btns" style="margin-right:20px;">
                <el-button :class="[picType=='COLUMN'?'':'commonBtn']" :type="picType=='COLUMN'?'primary':''" @click="doPicTypeSwitch('COLUMN')">柱状图</el-button>
                <el-button :class="[picType=='BUBBLE'?'':'commonBtn']" :type="picType=='BUBBLE'?'primary':''" @click="doPicTypeSwitch('BUBBLE')">泡泡图</el-button>
            </div>
            <span>时间：</span>
            <el-date-picker v-model="yearTime" type="month" placeholder="选择年月" value-format="yyyy-MM" style="margin-right:20px;" :clearable="false"></el-date-picker>
            <el-button type="primary" @click="OnChangeImage">确认</el-button>
        </div> 
        <div class="z-echarts">
            <page-panel-new style="height:100%;margin-top:0;" show-btn @zoom-out-com="zoomOutCom">
                <H5Chart ref="H5Chart" height="100%" :url="url" width="100%"></H5Chart>
            </page-panel-new>
        </div> 
        
        <el-dialog width="10px" max-height="10px" :visible.sync="dialogVisible1" style="margin-top: 98%; margin-right: 2%">
            <H5Chart1 style="z-index: -9999;" ref="downH5Chart1" :url="url1" width="4000px" height="4000px"></H5Chart1>
        </el-dialog>
        <el-dialog width="10px" max-height="10px" :visible.sync="dialogVisible2" style="margin-top: 98%; margin-right: 2%">
            <H5Chart2 style="z-index: -9999;" ref="downH5Chart2" :url="url1" width="4000px" height="4000px"></H5Chart2>
        </el-dialog>
    </div>
</template>

<script>
    import {fieldOilLayers} from "@/api/oilDeposit/rem-02/primaryinfo.js";
    import {dynamicDataCumulativeOilAndWaterProductionStatusMap} from "@/api/oilDeposit/rem-01/fielddynamicanalysis.js";
    import {downFile} from "@/lib/remBase64Download.js";
    import H5Chart from "@/components/tools/H5Chart/index.vue";
    import H5Chart1 from "@/components/tools/H5Chart/index1.vue";
    import H5Chart2 from "@/components/tools/H5Chart/index1.vue";
    
    // miniIo
    import {queryRemUploadFileMinio} from "@/api/rem/remuploadfileminio";
    import {downFile as minioDownFile} from "@/components/upload/utils/file";
    import FileSaver from "file-saver";
    export default {
        components: {
            H5Chart,
            H5Chart1,
            H5Chart2,
        },
        props: {
            oilFieldId: {},
            blockId: {}
        },
        data() {
            return {
                url: '/IsoFrameCom1/IsoFrameCom/View/eWGraphFrameShow-yscl.html',
                url1: '/IsoFrameCom1/IsoFrameCom/View/eWGraphFrameShow-InterlayerGradient1.html',
                
                zztUrl: '/IsoFrameCom1/IsoFrameCom/View/eWGraphFrameShow-yscl.html',
                pptUrl: '/IsoFrameCom1/IsoFrameCom/View/eWGraphFrameShow-paopao.html',
                
                dialogVisible1: false,
                dialogVisible2: false,
                //选中层位
                selectPosition: '',
                //层位所选择内容信息
                position: [],
                image: '',
                //类型
                radioType: "LIQUID",
                //图类
                picType: "COLUMN",
                //年份
                yearTime: new Date().format('yyyy-MM'),
                oilWaterChartData: {},
            };
        },
        async mounted() {
            await this.doSearch();
        },
        methods: {
            async doSearch() {
                await this.fieldOilLayersApi();
                await this.OnChangeImage();
            },
            //初始化获取层段关系
            async fieldOilLayersApi(){
                this.selectPosition='';
                await fieldOilLayers({oilFieldId: this.oilFieldId,fieldId: this.blockId}).then((res) => {
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
            },
            // //获取底图
            async queryRemUploadFileMinioApi(){
                let fileId='';
                let params ={
                    operationId:this.picType=='COLUMN' ? this.blockId : this.blockId+'-'+this.selectPosition,//泡泡图要跟层位绑定
                    operationType: this.picType=='COLUMN' ?'BLOCK':'BLOCKLCYCYXZTBUBBLE',  
                    readOne:'one' 
                }
                await queryRemUploadFileMinio(params).then((res) => {
                    if (res.data.code == 200) {
                        if(res.data.data.length){
                            fileId= res.data.data[0].fileId;
                        }else{
                            this.image='';
                        }
                    }else {
                        this.$message.error("文件查询接口异常!");
                    }
                });
                if(!fileId){
                    return false;
                }
                await minioDownFile(fileId).then((res)=>{
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
            },
            //获取图层信息
            async OnChangeImage() {
                await this.queryRemUploadFileMinioApi();
                let request = {
                    oilFieldId: this.oilFieldId,
                    fieldId: this.blockId,
                    layerId: this.selectPosition,
                    year: this.yearTime,
                    liquidType: this.radioType,
                    pictureType: this.picType,
                }
                await dynamicDataCumulativeOilAndWaterProductionStatusMap(request).then((res) => {
                    if (res.data.code == 200) {
                        this.oilWaterChartData = res.data.data.oilWaterChart;
                        if (this.picType == 'COLUMN') {
                            this.columnPic(this.oilWaterChartData);
                        } else if (this.picType == 'BUBBLE') {
                            this.bubblePic(this.oilWaterChartData);
                        }
                    }
                });
            },
            //图片类型切换
            doPicTypeSwitch(val) {
                if(this.picType!=val){
                    this.picType=val;
                    if (this.picType == 'COLUMN') {
                        this.url = this.zztUrl;
                    } else if (this.picType == 'BUBBLE') {
                        this.url = this.pptUrl;
                    }
                    this.$emit('childPara', this.selectPosition, this.picType);
                }
            },
            //柱状图解析
            columnPic(oilWaterChart) {
                let MinXMap = oilWaterChart.minXmap;
                let MaxXMap = oilWaterChart.maxXmap;
                let MinYMap = oilWaterChart.minYmap;
                let MaxYMap = oilWaterChart.maxYmap;
                let PicturePath = this.image;
                let IsShowPicture = oilWaterChart.showPicture;
                let PicMinXMap = oilWaterChart.picMinXmap;
                let PicMaxXMap = oilWaterChart.picMaxXmap;
                let PicMinYMap = oilWaterChart.picMinYmap;
                let PicMaxYMap = oilWaterChart.picMaxYmap;
            
                let h5data = {}
                h5data.MinXMap = MinXMap;
                h5data.MaxXMap = MaxXMap;
                h5data.MinYMap = MinYMap;
                h5data.MaxYMap = MaxYMap;
            
                h5data.PicMinXMap = PicMinXMap;
                h5data.PicMaxXMap = PicMaxXMap;
                h5data.PicMinYMap = PicMinYMap;
                h5data.PicMaxYMap = PicMaxYMap;
            
                h5data.PictureBase64 = PicturePath;
                h5data.IsShowPicture = IsShowPicture;
            
                let columnLayer = {}
                columnLayer.LayerName = '开采现状图层';
                columnLayer.LayerType = 10;
                columnLayer.Active = true;
                columnLayer.Display = true;
                let proStatusLayer = oilWaterChart.proStatusLayer;
                let Objects = [];
                if (proStatusLayer) {
                    Objects = proStatusLayer.map((item) => {
                        let barItem = {};
                        barItem.ObjType = Number(item.objType);
                        barItem.IsShowHistogram = item.showHistogram;
                        barItem.Width = item.width;
                        barItem.MaxHisHeight = item.maxHisHeight;
                        barItem.MaxHisValue = item.maxHisValue;
                        barItem.Interval = item.interval;
                        barItem.Radius = item.radius;
                        barItem.IsReversal = item.reversal;
                        barItem.IsLegend = item.legend;
                        barItem.ShowLineLength = item.showLineLength;
                        barItem.ScDate = item.scDate;
                        barItem.IsDrawDirectLine = item.drawDirectLine;
                        barItem.offX = item.offX;
                        barItem.offY = item.offY;
                        barItem.HistogramDecimals = item.histogramDecimals;
                        barItem.PositionX = item.positionX ? item.positionX : 0;
                        barItem.PositionY = item.positionY ? item.positionY : 0;
                        let histogramList = item.histogram;
                        if (histogramList) {
                            barItem.Histogram = histogramList.map((point) => {
                                let dd = {}
                                dd.Text = point.text;
                                dd.Code = point.code;
                                dd.Value = point.value;
                                dd.Color = point.argbColor;
                                dd.ShowText = false; //point.showText;
                                dd.HintText = `${point.showTime || '-'}：${point.value || '-'} 10⁴m³`;
                                return dd;
                            })
                        }
                        return barItem;
                    })
                }
                columnLayer.Objects = Objects;
                h5data.Layers = [];
                h5data.Layers.push(columnLayer);
                this.$refs.H5Chart.setSampleDate(h5data);
            },
            //泡泡图解析 
            bubblePic(oilWaterChart) {
                let MinXMap = oilWaterChart.minXmap;
                let MaxXMap = oilWaterChart.maxXmap;
                let MinYMap = oilWaterChart.minYmap;
                let MaxYMap = oilWaterChart.maxYmap;
                let PicturePath = this.image;
                let IsShowPicture = oilWaterChart.showPicture;
                let PicMinXMap = oilWaterChart.picMinXmap;
                let PicMaxXMap = oilWaterChart.picMaxXmap;
                let PicMinYMap = oilWaterChart.picMinYmap;
                let PicMaxYMap = oilWaterChart.picMaxYmap;
            
                let h5data = {}
                h5data.MinXMap = MinXMap;
                h5data.MaxXMap = MaxXMap;
                h5data.MinYMap = MinYMap;
                h5data.MaxYMap = MaxYMap;
            
                h5data.PicMinXMap = PicMinXMap;
                h5data.PicMaxXMap = PicMaxXMap;
                h5data.PicMinYMap = PicMinYMap;
                h5data.PicMaxYMap = PicMaxYMap;
            
                h5data.PictureBase64 = PicturePath;
                h5data.IsShowPicture = IsShowPicture;
            
                let columnLayer = {}
                columnLayer.LayerName = '泡泡图';
                columnLayer.LayerType = 15;
                columnLayer.Active = true;
                columnLayer.Display = true;
                let bubbleChartLayer = oilWaterChart.bubbleChartLayer;
                let Objects = [];
                if (bubbleChartLayer) {
                    Objects = bubbleChartLayer.map((item) => {
                        let pieItem = {};
                        pieItem.ObjType = item.objType;
                        pieItem.Radius = item.radius;
                        pieItem.WellName = item.wellName;
                        pieItem.Legend = item.legend;
                        pieItem.CoordX = item.positionX;
                        pieItem.CoordY = item.positionY;
                        let piedata = item.pie;
                        if (piedata) {
                            pieItem.Pie = piedata.map((pie) => {
                                let dd = {};
                                dd.Text = pie.text;
                                dd.Code = pie.code;
                                dd.Value = pie.value;
                                dd.Color = pie.argbColor;
                                dd.showText = pie.showText;
                                return dd;
                            })
                        }
                        return pieItem;
                    })
                }
                columnLayer.Objects = Objects;
                h5data.Layers = [];
                h5data.Layers.push(columnLayer);
                this.$refs.H5Chart.setSampleDate(h5data);
            },
            //下载功能
            doDownLoad() {
                if (this.picType == 'COLUMN') {
                    this.dialogVisible1 = true;
                } else if (this.picType == 'BUBBLE') {
                    this.dialogVisible2 = true;
                }
                setTimeout(() => {
                    if (this.picType == 'COLUMN') {
                        this.columnPic(this.oilWaterChartData, this.$refs.downH5Chart1);
                    } else if (this.picType == 'BUBBLE') {
                        this.bubblePic(this.oilWaterChartData, this.$refs.downH5Chart2);
                    }
                    if (this.picType == 'COLUMN') {
                        this.dialogVisible1 = false;
                    } else if (this.picType == 'BUBBLE') {
                        this.dialogVisible2 = false;
                    }
                    setTimeout(() => {
                        if (this.picType == 'COLUMN') {
                            this.$refs.downH5Chart1.downLoadAllPicture();
                        } else if (this.picType == 'BUBBLE') {
                            this.$refs.downH5Chart2.downLoadAllPicture();
                        }
                    }, 2000)
                }, 1000)
            },
            // 图放大缩小时重置状态
            zoomOutCom() {
                setTimeout(() => {
                    this.$refs.H5Chart.handlerZoomHeight();
                }, 10);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .z-main{
        width: 100%;
        height:calc(100% - 86px);
        display:flex;
        flex-direction: column;
        padding-bottom:15px;
        .z-search{
            height:60px;
            display: flex;
            align-items: center;
        }
        .z-echarts{
            padding-top:15px;
            width: 100%;
            flex:1;
        }
    }
</style>

