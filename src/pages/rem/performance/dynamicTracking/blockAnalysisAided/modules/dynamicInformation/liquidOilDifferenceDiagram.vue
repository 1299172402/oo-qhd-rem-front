<!--液油水差值图-->
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
      <el-radio-group v-model="radioType">
        <el-radio label="LIQUID">产液</el-radio>
        <el-radio label="OIL">产油</el-radio>
        <el-radio label="WATER">含水</el-radio>
      </el-radio-group>
      <span>开始年月:</span>
      <el-date-picker
          v-model="beginTime"
          type="month"
          placeholder="选择起始月"
          value-format="yyyy-MM-dd"
      >
      </el-date-picker>
      <span>结束年月:</span>
      <el-date-picker
          v-model="endTime"
          type="month"
          placeholder="选择结束月"
          value-format="yyyy-MM-dd"
      >
      </el-date-picker>
      <el-button @click="OnChangeImage">确定</el-button>
    </el-row>
    <el-row style="margin-top:10px">
      <!--<img style="height: 100%" :src="src">-->
      <!--<img style="height: 100%" :src="image">-->
      <H5Chart ref="H5Chart" height="600px" :url="url" width="100%"></H5Chart>
    </el-row>
    <el-dialog width="10px" max-height="10px" :visible.sync="dialogVisible1" style="margin-top: 98%; margin-right: 2%">
      <H5Chart1 style="z-index: -9999;" ref="downH5Chart1" :url="url1" width="4000px" height="4000px"></H5Chart1>
    </el-dialog>
  </div>
</template>

<script>
import {fieldOilLayers} from "@/api/oilDeposit/rem-02/primaryinfo.js";
import {dynamicDataOilWaterDifferenceIsogram} from "@/api/oilDeposit/rem-01/fielddynamicanalysis.js";
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
      //等值线图组件
      url: 'static/IsoFrameCom/View/eWGraphFrameShow-InterlayerGradient.html',
      radio: 1,
      src: '../../static/img/blockAnalysisAided/dynamicInformation/liquidOilWaterDifference.png',
      //选中层位
      selectPosition: '',
      //层位所选择内容信息
      position: [],
      image: '',
      radioType: 'LIQUID',
      beginTime: new Date().addDays(-60).format('yyyy-MM-dd'),
      endTime: new Date().format('yyyy-MM-dd'),
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
    this.doSearch();
  },
  methods: {
    async doSearch(){
      // this.$emit('childPara','');
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
            if (!this.selectPosition && this.position[0]){
              //this.selectPosition = this.position[0].fieldLayerId;
              if (this.position.find((item)=>{
return item.fieldLayerId == '263518079CED49AE8B6C9FE5CEBDD26A'
}))
                  //临时
                this.selectPosition = '263518079CED49AE8B6C9FE5CEBDD26A'
              else
                this.selectPosition = this.position[0].fieldLayerId;
              this.$emit('childPara',this.selectPosition);
            }
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
        beginDate: this.beginTime,
        endDate: this.endTime,
        liquidType: this.radioType,
      }
      /**
       * hwh
       * 获取图片组信息
       */
      await dynamicDataOilWaterDifferenceIsogram(request).then((res)=>{
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
          if (res.data.data) {
            this.layerData = res.data.data;
            this.sjcl(res.data.data, this.$refs.H5Chart);
          }
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
        beginDate: this.beginTime,
        endDate: this.endTime,
        liquidType: this.radioType,
      }
      dynamicDataOilWaterDifferenceIsogram(request).then((res)=>{
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
          if (res.data.data) {
            this.layerData = res.data.data;
            this.sjcl(res.data.data, this.$refs.H5Chart);
          }
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
      /*let fileName = '液油含水差值图';
      let layerMess = this.position.find((item)=>item.fieldLayerId==this.selectPosition);
      if(layerMess){
        fileName = (layerMess.layerName? layerMess.layerName : '' )+ fileName;
      }
      if(this.blockName){
        fileName = this.blockName + fileName;
      }
      downFile(this.image,fileName);*/
      // this.$refs.H5Chart.downLoadAllPicture();
      this.dialogVisible1 = true;
      setTimeout(()=>{
        _this.sjcl(_this.layerData, _this.$refs.downH5Chart1)
        //this.sjcl(this.layerData, this.$refs.downH5Chart1)
        this.dialogVisible1 = false;
        setTimeout(()=>{
          _this.$refs.downH5Chart1.downLoadAllPicture();
        }, 2000)
      }, 1000)
    },
    /**
     *
     * zwm写 hwh修改复用
     * 等值线图
     */
    sjcl(tc,refObj) {
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
      let Objects = [], Objects1 = [];
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
            parseInt(areaLines[i].fillColor[1]), parseInt(areaLines[i].fillColor[2])] : [155, 215, 215, 100],
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
        colorList.forEach((item, index)=> {
          var colorInfo = {"A": item.a, "R": item.r, "G": item.g, "B": item.b}
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
          "PositionX": MinXMap + 600,
          "PositionY": MaxYMap - 200,
          "Width": 200,
          "Height": 2500,
          "Text": obj.text == null ? [] : obj.text,
          "ColorList": reColor
        }],
      }
      Layers[1] = layer3;
      data.Layers = Layers
      console.log("应该刷新")
      refObj.setSampleDate(data);
    },

  }
}
</script>