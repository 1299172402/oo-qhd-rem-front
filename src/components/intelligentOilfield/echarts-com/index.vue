<template>
  <div
    v-if="!isDispose"
    ref="echarts"
    class="g-w100 g-h100 chartsComponentClass"
  />
</template>

<script>
export default {
  name: "EchartsComponents",
  props: {
    // 接收父组件传递过来的信息
    chartDataOptions: {
      type: Object, // 此处可以为Array或者Object或者其它，根据需求来。
      default: () => {
        "";
      }
    },
    echartsType: {
      type: String, // 图表类型。
      default: "pie1"
    }
  },
  data() {
    return {
      myEcharts: null,
      isDispose: false,
      dynamicId: null
    };
  },
  watch: {
    chartDataOptions: {
      handler() {
        this.refreshEcharts();
      },
      deep: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.initEcharts();
      //   const that = this
      this.$nextTick(() => {
        this.refreshEcharts();
      });
      //   if (false) {
      //     that.myEcharts.showLoading({
      //       text: '数据载入中',
      //       color: '#c23531',
      //       textColor: '#f30909',
      //       maskColor: 'rgba(255, 255, 255, 0.6)',
      //       zlevel: 100,
      //     })
      //   } else {
      this.myEcharts.hideLoading();
      //   }

      if (this.dynamicId) {
        clearInterval(this.dynamicId);
      }
      // 判断是否为动态图表
      if (this.chartDataOptions.dynamic) {
        this.dynamicId = setInterval(() => {
          this.myEcharts.setOption(this.chartDataOptions, true, false, false);
        }, 100);
      }
    }, 100);
  },
  beforeDestroy() {
    // console.log('-----------------------------jintu销毁echarts----------------------------------',this.myEcharts)
    if (this.myEcharts) {
      this.myEcharts.off("click");
      this.myEcharts.clear();
      this.myEcharts.dispose();
      this.isDispose = true;
    }
    if (this.dynamicId) {
      clearInterval(this.dynamicId);
    }
  },
  methods: {
    initEcharts() {
      // console.log('----------echarts创建---------------------------')
      //   const that = this
      this.isDispose = false;
      const $echartsDOM = this.$refs.echarts;
      this.myEcharts = this.$echarts.init($echartsDOM);
      // this.refreshEcharts();
    },
    refresh() {
      if (this.myEcharts) this.myEcharts.resize();
    },
    // 图表刷新
    refreshEcharts() {
      // 在渲染点击事件之前先清除点击事件
      if (this.myEcharts) {
        this.myEcharts.off("click");
        this.myEcharts.off("legendSelectChanged");
        // 渲染数据
        const option = this.chartDataOptions;
        this.myEcharts.clear();
        this.myEcharts.setOption(option, true, false, false);
        this.myEcharts.on("click", params => {
          this.$emit("get-params", params, this.chartDataOptions);
        });
        // 点击图例事件暴露
        this.myEcharts.on("legendSelectChanged", params => {
          // eslint-disable-next-line no-restricted-globals
          event.stopPropagation();
          this.$emit("legend-select-changed", params);
        });
      }
    }
  }
};
</script>

<style scoped>
.chartsComponentClass {
  background-image: var(--logo-bg) !important;
  background-size: unset !important;
  background-repeat: no-repeat !important;
  background-position: right top !important;
}
</style>