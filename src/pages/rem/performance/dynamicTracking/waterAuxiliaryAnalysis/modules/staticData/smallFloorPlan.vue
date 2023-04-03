<!--小层平面图-->
<template>
  <el-container class="mt-2">
    <el-main>
      <NormalCard>
        <el-row>
          <!--<el-radio-group v-model="selectPosition">
            <el-radio v-for="(item,index) in position" :key="index" :label="item.fieldLayerId">{{ item.layerName }}</el-radio>
            &lt;!&ndash;<el-radio :label="3">层位1</el-radio>
            <el-radio :label="6">层位2</el-radio>
            <el-radio :label="9">层位3</el-radio>
            <el-radio :label="12">层位4</el-radio>&ndash;&gt;
          </el-radio-group>-->
          <el-select v-model="selectPosition" style="width: 220px;" placeholder="请选择" filterable  clearable >
            <el-option
                v-for="item in position"
                :key="item.fieldLayerId"
                :label="item.layerName"
                :value="item.fieldLayerId"
            >
            </el-option>
          </el-select>
        </el-row>
        <el-row style="padding-top: 20px;height:600px;overflow: auto;">
          <!--<el-image style="height: 600px" :src="src"></el-image>-->
          <el-image :src="image">
            <div slot="error">
            </div>
          </el-image>
        </el-row>
      </NormalCard>
    </el-main>
  </el-container>
</template>
<style lang="scss" scoped>

</style>
<script>
import NormalCard from '@/components/tools/NormalCard';
import {
  fieldLayers,
} from '@/api/rem-02/primaryinfo.js';
import {
  microPhasePlot,
} from '@/api/rem-01/dynamicAnalysis.js';
import {downFile} from "@/lib/remBase64Download";
import config from "@/config";

export default {
  components: {
    NormalCard
  },
  props: {
    //选择油田
    oilFeildId: {

    },
    //选择平台
    platform: {

    },
    //选择井号
    wellId: {

    }
  },
  data() {
    return {
      radio: 3,
      //所选择的层位
      selectPosition: '',
      //层位所选择内容信息
      position: [
       /*   {
        label: '层位1',
        value: 'cw1',
      }, {
        label: '层位2',
        value: 'cw2',
      }, {
        label: '层位3',
        value: 'cw3',
      }, {
        label: '层位4',
        value: 'cw4',
      }, {
        label: '层位5',
        value: 'cw5',
      },*/],
      src: '../../static/img/oilAuxiliaryAnalysis/staticData/smallFloorPlan.jpg',
      image: '',
      imageList: [],
      baseUrl:
          process.env.NODE_ENV === "production"
              ? config.publicRootPath
              : config.devRootPath,
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
    //this.initData();
    this.doSearch();

  },
  methods: {
    async initData(){
      //初始化获取层段关系
      await fieldLayers({
        oilFieldId: this.oilFeildId,
      }).then((res)=>{
        if(res.data.code==0){
          //层段数据
          this.position=res.data.data.fieldLayers;
          this.selectPosition=this.position[0].fieldLayerId;
        }
      });

    },
    async doSearch(){
      //初始化获取层段关系
      await fieldLayers({
        oilFieldId: this.oilFeildId,
        wellId: this.wellId,
      }).then((res)=>{
        if(res.data.code==0){
          //层段数据
          if(res.data.data) {
            this.position = res.data.data.fieldLayers;
            if (!this.selectPosition && this.position[0]){
              if(this.position.find((item)=>{
                return item.fieldLayerId == '26C4B92661D345969091868C256A7902'
              })){
                this.selectPosition = '26C4B92661D345969091868C256A7902';

              }
              else if(this.position.find((item)=>{
                return item.fieldLayerId == '263518079CED49AE8B6C9FE5CEBDD26A'
              })){
                this.selectPosition = '263518079CED49AE8B6C9FE5CEBDD26A';

              } else if(this.position.find((item)=>{
                return item.fieldLayerId == '87795A3E6BBC4469BC9AC5AE0BBE759C'
              })){
                this.selectPosition = '87795A3E6BBC4469BC9AC5AE0BBE759C';
              } else if(this.position.find((item)=>{
                return item.fieldLayerId == '02398139A19A4F62BEFAC658E870D487'
              })){
                this.selectPosition = '02398139A19A4F62BEFAC658E870D487';
              } else{
                this.selectPosition=this.position[0].fieldLayerId;
              }
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
        ogfId: this.oilFeildId,
        platformId: this.platform,
        wellId: this.wellId,
      }
      /**
       * hwh
       * 获取图片组信息
       */
      await microPhasePlot(request).then((res)=>{
        if(res.data.code==0){
          this.imageList=res.data.data.layerPics;
          let imageMess=this.imageList.find((item)=>item.layerId==this.selectPosition);
          if(!imageMess){
            this.image = '';
            return ;
          }
          if(imageMess.data&&imageMess.type)
            this.image='data:'+imageMess.type+';base64,'+imageMess.data;
          else{
            this.image = '';
          }
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
      let imageMess=this.imageList.find((item)=>item.layerId==this.selectPosition);
      if(!imageMess){
        this.image = '';
        return ;
      }
      if(imageMess.data&&imageMess.type)
        this.image='data:'+imageMess.type+';base64,'+imageMess.data;
      else{
        this.image = '';
      }
    },
    /**
     * hwh
     * 下载
     */
    doDownLoad(){
      let fileName = '地震属性图';
      let layerMess = this.position.find((item)=>item.fieldLayerId==this.selectPosition);
      if(layerMess){
        fileName = (layerMess.layerName? layerMess.layerName : '' )+ fileName;
      }
      if(this.wellName){
        fileName = this.wellName + fileName;
      }
      downFile(this.image,fileName);
    }
  }
}
</script>