<!--地震属性图-->
<template>
  <el-container class="mt-2">
    <el-main>
        <el-row style="height: 600px;overflow: auto;">
          <el-carousel :interval="4000" height="570px" :autoplay="false" indicator-position="outside">
            <el-carousel-item v-for="(item, index) in imageList" ref="imageCaeousel" :key="index" style="height: 550px; overflow-y: auto;display: block">
              <el-image :src="item" :fit="fitInfo" style="width: 100%" :preview-src-list="imageList">
                <div slot="error">
                </div>
              </el-image>
            </el-carousel-item>
          </el-carousel>
        </el-row>
    </el-main>
  </el-container>
</template>
<style lang="scss" scoped>

</style>
<script>
import {getSectionWell} from '@/api/oilDeposit/rem-01/dynamicAnalysis.js';
// import {downFileList} from '@/lib/remBase64Download';

export default {
  props: {
    //选择油田
    oilFeildId: {

    },
    //选择平台
    platform: {

    },
    //选择井号
    wellId: {

    },
  },
  data() {
    return {
      //图片数据
      image: '',
      imageList: [],
      fitInfo: 'contain',
    };
  },
  mounted() {
    //初始化调用搜索
    this.doSearch();
    //置为不可滚动
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('el-image__inner')) {
        var list = this.$refs.imageCaeousel;
        if (list != null && list.length > 0) {
          list.forEach(item=>{
            item.$el.style['overflow-y'] = 'hidden'
          })
        }
      }
    }, false)
    //重新置为可以滚动
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('el-icon-circle-close')) {
        var list = this.$refs.imageCaeousel;
        if (list != null && list.length > 0) {
          list.forEach(item=>{
            item.$el.style['overflow-y'] = 'auto'
          })
        }
      }
    }, false)
  },
  methods: {
    /**
     * hwh
     * 调用图片
     */
    doSearch(){
      let request= {
        //"fileName": "string",
        "ogfId": this.oilFeildId,
        //"path": "string",
        "platformId": this.platform,
        "wellId": this.wellId,
        //"wellTypeCode": "string"
      }
      /*let request= {
        "ogfId": "3FC9A818F5BC43B88270DB80BBB3018F",
        "platformId": "3FC9A818F5BC43B88270DB80BBB3018F",
        "wellId": "09D30C16BD1D4F759D53F74941701307"
      }*/
      this.imageList = [];
      getSectionWell(request).then((res)=>{
        if(res.data.code==200){
          let imgData = res.data.data.data;
          let type = res.data.data.type;
          let firstParty='data:'+type+';base64,';
          if(imgData){
            this.imageList.push(firstParty+imgData);
          }
          let wellIds = res.data.data.wellIds;
          if (wellIds != null && wellIds.length > 0) {
            wellIds.forEach((item, index) => {
              if (item != this.wellId) {
                var queryParam = {
                  "ogfId": this.oilFeildId,
                  "platformId": this.platform,
                  "wellId": item,
                }
                getSectionWell(queryParam).then((res)=>{
                  if(res.data.code==200){
                    let imgDataChild = res.data.data.data;
                    let typeChild = res.data.data.type;
                    let firstPartyChild='data:'+typeChild+';base64,';
                    if(imgDataChild){
                      this.imageList.push(firstPartyChild+imgDataChild);
                    }
                  }
                })
              }
            })
          }
          console.log(this.imageList)
        }
      });
    },
    /**
     * hwh
     * 下载
     */
    doDownLoad(){
      let fileName = '连井剖面图';
      if(this.wellName){
        fileName = this.wellName + fileName;
      }
      //批量下载
      // downFileList(this.imageList,fileName);
    }
  },
}
</script>
<!--<style type="text/css" scoped>
  .el-carousel__item {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>-->
<style scoped>
  ::v-deep .el-carousel__indicators--outside button {
    background-color: #23d8f8 !important;
    opacity: .40 !important;
  }
  ::v-deep .el-carousel__indicator.is-active button {
    opacity: 1 !important;
  }
</style>