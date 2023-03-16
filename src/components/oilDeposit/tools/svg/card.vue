<template>
  <div
    :class="['gradientBox', color, position]"
    :style="{ width: width, height: height }"
  >
    <svg :height="_height" :width="_width">
      <defs>
        <linearGradient
          :id="`fillColor-${color}`"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" :stop-color="fillColor[0]" />
          <stop offset="100%" :stop-color="fillColor[1]" />
        </linearGradient>
        <linearGradient
          :id="`strokeColor-${color}`"
          x1="0%"
          y1="100%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" :stop-color="strokeColor[0]" />
          <stop offset="100%" :stop-color="strokeColor[1]" />
        </linearGradient>
      </defs>
      <polygon
        :points="points"
        :fill="`URL(#fillColor-${color})`"
        :style="`stroke: url(#strokeColor-${color}); stroke-width: 1`"
      />
    </svg>
    <slot></slot>
  </div>
</template>
<script>
/**
 * @author: ddhhh
 * @param {*}
 * @return {*}
 * @description: Resource Geographic Mark（资源地理信息标注规范）
 * @Date: 2020-12-11 20:37:09
 */
export default {
  // mixins: [resize],
  props: {
    width: {
      type: String,
      default: "98px",
    },
    height: {
      type: String,
      default: "63px",
    },
    color: {
      type: String,
      default: "dafult",
    },
    position: {
      type: String,
      default: "left",
    },
  },
  data() {
    return {
      boxOffsetWidth: 0,
      boxOffsetHeight: 0,
    };
  },
  computed: {
    _width() {
      return this.boxOffsetWidth
        ? this.boxOffsetWidth
        : this.width == "auto"
        ? 20
        : Number(this.width.replace(/px|%/, ""));
    },
    _height() {
      return this.boxOffsetHeight
        ? this.boxOffsetHeight
        : this.height == "auto"
        ? 20
        : Number(this.height.replace(/px|%/, ""));
    },
    points() {
      // console.log('2222',`20,0 ${this._width},0 ${this._width},${this._height - 20} ${this._width - 20},${this._height} 0,${this._height} 0,20`)
      return `20,0 ${this._width},0 ${this._width},${this._height - 20} ${
        this._width - 20
      },${this._height} 0,${this._height} 0,20`;
    },
    fillColor() {
      switch (this.color) {
        case "blue":
          return ["rgba(33,122,255,0)", "rgba(33,122,255,0.5)"];
          break;
        case "green":
          return ["rgba(0,255,211,0)", "rgba(0,255,211,0.5)"];
          break;
        case "orange":
          return ["rgba(255,103,18,0)", "rgba(255,103,18,0.5)"];
          break;
        case "gray":
          return ["rgba(138,164,209,0)", "rgba(138,164,209,0.5)"];
          break;
        default:
          return ["rgba(0,72,122,0.16)", "rgba(0,68,115,0.64)"];
          break;
      }
    },
    strokeColor() {
      switch (this.color) {
        case "blue":
          return ["rgba(33,122,255,1)", "rgba(33,122,255,1)"];
          break;
        case "green":
          return ["rgba(0,255,213,1)", "rgba(0,255,213,1)"];
          break;
        case "orange":
          return ["rgba(255,103,18,1)", "rgba(255,103,18,1)"];
          break;
        case "gray":
          return ["rgba(138,164,209,1)", "rgba(138,164,209,1)"];
          break;
        default:
          return ["rgba(0,180,255,1)", "rgba(116,190,243,0.5)"];
          break;
      }
    },
  },
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang="scss">
.gradientBox {
  position: relative;
  padding: 2px 0 0 20px;
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
}
@mixin berfore {
  &:before {
    position: absolute;
    content: "";
    border: 5px solid transparent;
    border-bottom-color: #2F91C7;
  }
  @content;
}
@mixin bottomColor($color) {
  &:before {
    border-bottom-color: $color;
  }
}

.left {
  &:before {
    left: -10px;
    top: 50%;
    margin-top: -5px;
    transform: rotateZ(-90deg);
  }
}
.right {
  &:before {
    right: -10px;
    top: 50%;
    margin-top: -5px;
    transform: rotateZ(90deg);
  }
}
.top {
  &:before {
    top: -10px;
    left: 50%;
    margin-left: -5px;
    // transform: rotateZ(-180deg);
  }
}
.bottom {
  &:before {
    bottom: -10px;
    left: 50%;
    margin-left: -5px;
    transform: rotateZ(-180deg);
  }
}
.leftTop{
  &:before {
    top: 0;
    left: 0;
    margin-left:-5px;
    margin-top:-5px;
    transform: rotateZ(-45deg);
  }
}
.rightTop{
  &:before {
    top: 0;
    right: 0;
    margin-right:-5px;
    margin-top:-5px;
    transform: rotateZ(45deg);
  }
}
.leftBottom{
  &:before {
    bottom: 0;
    left: 0;
    margin-left:-5px;
    margin-bottom:-5px;
    transform: rotateZ(-135deg);
  }
}
.rightBottom{
  &:before {
    bottom: 0;
    right: 0;
    margin-right:-5px;
    margin-bottom:-5px;
    transform: rotateZ(135deg);
  }
}
.gradientBox {
  @include berfore;
}
.blue{
  @include bottomColor(#217AFF)
}
.green{
  @include bottomColor(#00FFD5)
}
.orange{
  @include bottomColor(#FF6712)
}
.gray{
  @include bottomColor(#8AA4D1)
}
</style>
