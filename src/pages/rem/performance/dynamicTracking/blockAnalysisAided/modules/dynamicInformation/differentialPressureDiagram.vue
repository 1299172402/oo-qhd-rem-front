<!--注水强度等值图-->
<template>
  <div class="mt-2">
    <el-row style="margin-top:10px">
      <el-select v-model="selectPosition" style="width: 220px;" placeholder="请选择" filterable  clearable >
        <el-option
            v-for="(item,index) in position"
            :key="index"
            :label="item.layerName"
            :value="item.fieldLayerId"
        >
        </el-option>
      </el-select>
      <span>选择年月:</span>
      <el-date-picker
          v-model="yearTime"
          type="year"
          placeholder="选择年"
          value-format="yyyy"
      >
      </el-date-picker>
      <el-button @click="doYesEvent">确定</el-button>
    </el-row>
    <el-row style="margin-top:10px">
      <H5Chart ref="H5Chart" height="600px" :url="url" width="100%"></H5Chart>
    </el-row>
    <el-dialog width="10px" max-height="10px" :visible.sync="dialogVisible1" style="margin-top: 98%; margin-right: 2%">
      <H5Chart1 style="z-index: -9999;" ref="downH5Chart1" :url="url1" width="4000px" height="4000px"></H5Chart1>
    </el-dialog>
  </div>
</template>

<script>
import {fieldOilLayers} from "@/api/oilDeposit/rem-02/primaryinfo.js";
import {dynamicDataDifferentialPressureDiagram} from "@/api/oilDeposit/rem-01/fielddynamicanalysis.js";
import {downFile} from "@/lib/remBase64Download.js";
import H5Chart from "@/components/tools/H5Chart/index.vue";
import H5Chart1 from "@/components/tools/H5Chart/index1.vue";
let _this;
export default {
  components: {
    H5Chart,
    H5Chart1,
  },
  props: {
    oilFieldId: {

    },
    blockId: {

    }
  },
  data() {
    return {
      dialogVisible1: false,
      url1: 'static/IsoFrameCom1/IsoFrameCom/View/eWGraphFrameShow-InterlayerGradient1.html',
      url: 'static/IsoFrameCom1/IsoFrameCom/View/eWGraphFrameShow-paopao.html',
      radio: 1,
      src: '../../static/img/blockAnalysisAided/dynamicInformation/liquidOilWaterDifference.png',
      //选中层位
      selectPosition: '',
      //层位所选择内容信息
      position: [],
      image: '',
      yearTime: new Date().format('yyyy'),
      oilWaterChartData: {},
    };
  },
  watch: {
    //监听层位信息，给其动态传值
    selectPosition(val){
      this.$emit('childPara',this.selectPosition);
      this.OnChangeImage();
    }
  },
  mounted() {
    _this = this;
    //this.initData();
    this.doSearch();

  },
  methods: {
    async doSearch(){
      //初始化获取层段关系
      await fieldOilLayers({
        oilFieldId: this.oilFieldId,
        fieldId: this.blockId,
        wellId: '',
      }).then((res)=>{
        if(res.data.code==0){
          //层段数据
          if(res.data.data) {
            this.position = res.data.data.fieldLayers;
            if (!this.selectPosition && this.position[0])
              if (this.position.find((item)=>{
return item.fieldLayerId == '263518079CED49AE8B6C9FE5CEBDD26A'
}))
                  //临时
                this.selectPosition = '263518079CED49AE8B6C9FE5CEBDD26A'
              else
                this.selectPosition = this.position[0].fieldLayerId;
            this.$emit('childPara',this.selectPosition);
          } else{
            this.position = [];
          }
        }
      });
      /**
       *  hwh
       *  获取参数油田id 平台id 井id
       * @type {{ogfId: *, platformId: *, wellId: *}}
       */
      let request={
        oilFieldId: this.oilFieldId,
        fieldId: this.blockId,
        layerId: this.selectPosition,
        year: this.yearTime,
      }
      /**
       * hwh
       * 获取图片组信息
       */
      await dynamicDataDifferentialPressureDiagram(request).then((res)=>{
        if(res.data.code==0){
          if(res.data.data.layerPics){
            if(res.data.data.layerPics.length>0){
              let imageData = res.data.data.layerPics[0];
              let type = imageData.type;
              this.image='data:'+type+';base64,'+imageData.data;


            } else{
              this.image = '';
            }
          } else{
            this.image = '';
          }
          //this.bubblePic(res.data.data.oilWaterChart);
          this.oilWaterChartData = res.data.data.oilWaterChart
          this.bubblePic(this.oilWaterChartData, this.$refs.H5Chart);
        } else{
          this.image = '';
        }
      });
    },
    /**
     * hwh
     * 切换图片
     * @constructor
     */
    OnChangeImage(){
      this.image='';
      let request={
        oilFieldId: this.oilFieldId,
        fieldId: this.blockId,
        layerId: this.selectPosition,
        year: this.yearTime,
      }
      dynamicDataDifferentialPressureDiagram(request).then((res)=>{
        if(res.data.code==0){
          if(res.data.data.layerPics){
            if(res.data.data.layerPics.length>0){
              let imageData = res.data.data.layerPics[0];
              let type = imageData.type;
              this.image='data:'+type+';base64,'+imageData.data;


            } else{
              this.image = '';
            }
          } else{
            this.image = '';
          }
          //this.bubblePic(res.data.data.oilWaterChart);
          this.oilWaterChartData = res.data.data.oilWaterChart
          this.bubblePic(this.oilWaterChartData, this.$refs.H5Chart);
        } else{
          this.image = '';
        }
      });
    },
    /**
     * hwh
     * 单选按钮选中改变事件
     */
    changeRadio(){
      this.$emit('childPara',this.selectPosition);
      this.OnChangeImage();
    },
    /**
     * hwh
     * 下载功能
     */
    doDownLoad(){
      /*let fileName = '生产压差图';
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
      setTimeout(()=>{
        _this.bubblePic(this.oilWaterChartData, _this.$refs.downH5Chart1)
        //this.sjcl(this.layerData, this.$refs.downH5Chart1)
        this.dialogVisible1 = false;
        setTimeout(()=>{
          _this.$refs.downH5Chart1.downLoadAllPicture();
        }, 2000)
      }, 1000)
    },
    /**
     * hwh
     * 柱状图解析
     */
    columnPic(oilWaterChart){
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

      let columnLayer={}
      columnLayer.LayerName = '开采现状图层';
      columnLayer.LayerType = 10;
      columnLayer.Active = true;
      columnLayer.Display = true;
      let proStatusLayer = oilWaterChart.proStatusLayer;
      let Objects = [];
      if(proStatusLayer){
        Objects = proStatusLayer.map((item)=>{
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
          barItem.PositionX = item.positionX? item.positionX:0;
          barItem.PositionY = item.positionY?item.positionY:0;
          let histogramList = item.histogram;
          if(histogramList){
            barItem.Histogram = histogramList.map((point)=>{
              let dd = {}
              dd.Text = point.text;
              dd.Code = point.code;
              dd.Value = point.value;
              dd.Color = point.argbColor;
              dd.ShowText = false;//point.showText;
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
    /**
     * hwh
     * 泡泡图解析
     * @param oilWaterChart
     */
    bubblePic(oilWaterChart, refObj){
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

      let columnLayer={}
      columnLayer.LayerName = '泡泡图';
      columnLayer.LayerType = 15;
      columnLayer.Active = true;
      columnLayer.Display = true;
      let bubbleChartLayer = oilWaterChart.bubbleChartLayer;
      let Objects = [];
      if(bubbleChartLayer){
        Objects = bubbleChartLayer.map((item)=>{
          let pieItem = {};
          pieItem.ObjType = item.objType;
          pieItem.Radius = item.radius;
          pieItem.WellName = item.wellName;
          pieItem.Legend = item.legend;
          pieItem.CoordX = item.positionX;
          pieItem.CoordY = item.positionY;
          let piedata = item.pie;
          if(piedata){
            pieItem.Pie = piedata.map((pie)=>{
              let dd = {};
              dd.Text = pie.text;
              dd.Code = pie.code;
              dd.Value = pie.value;
              dd.Color = pie.argbColor;
              dd.ShowText = pie.showText;
              return dd;
            })
          }
          return pieItem;
        })
      }
      columnLayer.Objects = Objects;
      h5data.Layers = [];
      h5data.Layers.push(columnLayer);
      refObj.setSampleDate(h5data);
    },
    /**
     * hwh
     * 点击确定时的查询 和 初始化一致
     */
    doYesEvent(){
      /**
       *  hwh
       *  获取参数油田id 平台id 井id
       * @type {{ogfId: *, platformId: *, wellId: *}}
       */
      let request={
        oilFieldId: this.oilFieldId,
        fieldId: this.blockId,
        layerId: this.selectPosition,
        year: this.yearTime,
      }
      /**
       * hwh
       * 获取图片组信息
       */
      dynamicDataDifferentialPressureDiagram(request).then((res)=>{
        if(res.data.code==0){
          if(res.data.data.layerPics){
            if(res.data.data.layerPics.length>0){
              let imageData = res.data.data.layerPics[0];
              let type = imageData.type;
              this.image='data:'+type+';base64,'+imageData.data;
            } else{
              this.image = '';
            }
          } else{
            this.image = '';
          }
          //this.bubblePic(res.data.data.oilWaterChart);
          this.oilWaterChartData = res.data.data.oilWaterChart
          this.bubblePic(this.oilWaterChartData, this.$refs.H5Chart);
        } else{
          this.image = '';
        }
      });
    },
  }
}
</script>