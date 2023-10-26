<!--轮循面板组件-->
<template>
  <div class="g-w100 g-h00">
    <el-carousel trigger="click" :autoplay="false">
      <el-carousel-item
        v-for="item1 in 4"
        :key="item1"
        class="g-row-flex"
        style="flex-wrap: wrap;"
      >
        <div v-for="item2 in 12" :key="item2" class="g-column-flex-H panelDiv">
          <div class="panelImg" />
          <div>其他应用{{ item2 }}</div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  props: {

  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
.panelImg {
  background-image: url("https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png");
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