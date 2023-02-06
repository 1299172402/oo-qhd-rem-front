<!--轮循面板组件-->
<template>
  <div class="g-w100 g-h00 panel">
    <el-carousel trigger="click" :autoplay="false" arrow="never" indicator-position="outside">
      <el-carousel-item v-for="(item1,index) in panelList" :key="index" class="g-row-flex" style="flex-wrap: wrap">
        <div class="g-column-flex-H panelDiv" v-for="(item2,index) in item1" :key="index+200">
          <div class="panelImg"></div>
          <div>{{item2.name}}</div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  props: {
    panels:{
      type: Array,
      default() {
        return [
          {img:'',name:'油藏管理'},
          {img:'',name:'设备设施'},
          {img:'',name:'安全'},
          {img:'',name:'船体'},
          {img:'',name:'油藏管理'},
          {img:'',name:'设备设施'},
          {img:'',name:'安全'},
          {img:'',name:'船体'},
          {img:'',name:'船体'},
        ];
      }
    },
    height: {

    }
  },
    
  data() {
    return {};
  },
  computed: {
    panelList() {
      // 先判定容器的高来决定一页可放几个标签 height 要先减去头部的高度以及底部的分页条的高度 每一行高100，上下padding加起来是40
      console.log(this.height)
      //   const height2 = this.height-40-32
      //   const row = Math.floor(height2/140)
            
      //  alert(Math.floor(80/52));
      // 根据页容量进行分页
      const returnList  = []
      for (let i = 0; i < this.panels.length; i += 4) {
        returnList.push(this.panels.slice(i, i + 4));
      }
      console.log(returnList)
      return returnList
         
    },
  },
  methods: {},
};
</script>
<style>
.panel {
   position: relative;
   z-index: 0 !important;
}
  .panel  .el-carousel__button{
        width: 8px !important;
        height: 8px !important;
        border-radius: 7px !important;
    }
    .panel .el-carousel__indicators--outside button {
        background-color: #3f87bc !important;
    }
    .panel .el-carousel__container{
        height: 80px !important;
    }
</style>
<style scoped>
  
/* */
.panelImg {
  background-image: url('https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 50px;
  height: 50px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  /* background-color: #99a9bf; */
}

.el-carousel__item:nth-child(2n + 1) {
  /* background-color: #d3dce6; */
}
.panelDiv {
  margin: 0 16px;
}
</style>
