<!--沉积相图-->
<template>
  <el-container class="mt-2">
    <el-main>
      <!-- <NormalCard> -->
        <el-row>
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
        <el-row style="padding-top: 20px;height: 600px;overflow: auto;">
          <el-image :src="image">
            <div slot="error">
            </div>
          </el-image>
        </el-row>
      <!-- </NormalCard> -->
    </el-main>
  </el-container>
</template>
<style lang="scss" scoped>

</style>
<script>
// import NormalCard from '@/components/tools/NormalCard';
import {fieldLayers} from '@/api/oilDeposit/rem-02/primaryinfo.js';
import {depositionFaciesDiagram,} from '@/api/oilDeposit/rem-01/dynamicAnalysis.js';
// import {downFile} from "@/lib/remBase64Download";
// import config from "@/config";
export default {
  components: {
    // NormalCard,
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
      position: [],
      src: '../../static/img/oilAuxiliaryAnalysis/staticData/theSedimentaryFaciesMap.jpg',
      //图片数据
      image: '',
      imageList: [],
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
    //初始化调用搜索
    this.doSearch();
  },
  methods: {
    /**
     * hwh
     * 调用图片
     */
    async doSearch(){

      //初始化获取层段关系
      await fieldLayers({
        oilFieldId: this.oilFeildId,
        wellId: this.wellId,
      }).then((res)=>{
        if(res.data.code==200){
          //层段数据
          if(res.data.data) {
            this.position=res.data.data.fieldLayers;
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
              //this.selectPosition = '8CCB8A072D5D4677AFBDC091488A1AD7'
              this.$emit('childPara',this.selectPosition);
            }
          } else{
            this.position = [];
          }
        }
      });

      let request={
        ogfId: this.oilFeildId,
        platformId: this.platform,
        wellId: this.wellId,
      };
      depositionFaciesDiagram(request).then((res)=>{
        if(res.data.code==200){
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
      let fileName = '沉积相图';
      let layerMess = this.position.find((item)=>item.fieldLayerId==this.selectPosition);
      if(layerMess){
        fileName = (layerMess.layerName? layerMess.layerName : '' )+ fileName;
      }
      if(this.wellName){
        fileName = this.wellName + fileName;
      }
      // downFile(this.image,fileName);
    }
  },
}
</script>