<template>
  <div
    ref="svgBox"
    class="gradientBox"
    :style="{ width: width, height: height }"
  >
    <svg :height="_height" :width="_width">
      <defs>
        <linearGradient id="boxLine" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="rgba(0,72,122,0.16) " />
          <stop offset="100%" stop-color="rgba(0,68,115,0.64)" />
        </linearGradient>
        <linearGradient id="boxFillGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(0,180,255,1)" />
          <stop offset="100%" stop-color="rgba(116,190,243,0.5)" />
        </linearGradient>
        <linearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(0,150,255,0.00)" />
          <stop offset="100%" stop-color="rgba(0,202,255,0.68)" />
        </linearGradient>
      </defs>
      <polygon
        :points="points"
        fill="URL(#boxLine)"
        style="stroke: url(#boxFillGradient); stroke-width: 1"
      />
      <line
        v-if="title"
        x1="0"
        y1="32"
        :x2="_width"
        y2="32"
        style="stroke: rgba(0, 108, 153, 1); stroke-width: 1"
      />
      <polygon
        v-if="title"
        :points="titlePoints"
        fill="URL(#titleGradient)"
        style="stroke: transparent; stroke-width: 1"
      />
    </svg>
    <div v-if="title" class="gradientBoxTitle">
      {{title}}
      <slot name="title"></slot>
    </div>
    <div class="gradientBoxBody"></div>
    <slot></slot>
  </div>
</template>
<script>
import resize from "./mixins/resize";
export default {
  mixins: [resize],
  props: {
    width: {
      type: String,
      default: "auto",
    },
    height: {
      type: String,
      default: "auto",
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      boxOffsetWidth: 0,
      boxOffsetHeight: 0,
      autoResizeHeight: false,
      autoResizeWidth: false
    };
  },
  computed: {
    _width() {
      return this.boxOffsetWidth
        ? this.boxOffsetWidth
        : this.width == "auto"
        ? 20
        : this.width.replace(/px|%/, "");
    },
    _height() {
      return this.boxOffsetHeight
        ? this.boxOffsetHeight
        : this.height == "auto"
        ? 20
        : this.height.replace(/px|%/, "");
    },
    points() {
      return `20,0 ${this._width},0 ${this._width},${this._height - 20} ${
        this._width - 20
      },${this._height} 0,${this._height} 0,20`;
    },
    titlePoints() {
      return `20,0 ${this._width},0 ${this._width},32 0,32 0,20`;
    },
    titleLine() {
      return `0,32 ${this._width},32`;
    },
  },
  beforeMount(){
    this.autoResizeHeight = !this.height.toLocaleLowerCase().includes('px')
    this.autoResizeWidth = !this.width.toLocaleLowerCase().includes('px')
    console.log('this.autoResizeHeight:',this.autoResizeHeight,'this.autoResizeWidth',this.autoResizeWidth)
  },
  mounted() {
    this.boxOffsetWidth = this.$el.offsetWidth;
    this.boxOffsetHeight = this.$el.offsetHeight;
  },
  beforeDestroy() {},
};
</script>
<style lang="scss">
.gradientBox {
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  & > * {
    position: relative;
    z-index: 1;
  }
  svg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }
  .gradientBoxTitle {
    position: absolute;
    left: 20px;
    right: 0;
    top: 0;
    height: 32px;
    font-size: 14px;
    color: #24deff;
    letter-spacing: 0;
    line-height: 32px;
  }
}
</style>
