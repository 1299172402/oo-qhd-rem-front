import Vue from "vue";
import "./style/OpenCloseStyle.less";

// 默认参数
const defaultSetting = {
  // 图标位置，水平垂直居中
  locationStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  backgroundStyle: {
    width: "36px",
    height: "36px",
    bgColor: "rgb(242 242 242)",
    bgColorHover: "rgb(230 229 229)",
    padding: "0"
  },
  marginLeft: {
    left: ["-40px", "0px"],
    right: ["40px", "0px"]
  },
  iconClass: {
    toLeft: "el-icon-d-arrow-left",
    toRight: "el-icon-d-arrow-right"
  }
};

export default Vue.extend({
  name: "OpenClose",
  props: {
    // 用于左边left还是右边right
    postion: {
      type: String,
      default: "left"
    },
    // 图标位置，未传入项采用默认（具体参数参考defaultSetting）
    locationStyle: {
      type: Object,
      default: () => ({})
    },
    // 图标font-size
    iconSize: {
      type: String,
      default: "14px"
    },
    // 背景样式名
    backgroundClass: {
      type: String,
      default: ""
    },
    // 背景样式，未传入项采用默认（具体参数参考defaultSetting）
    backgroundStyle: {
      type: Object,
      default: () => ({})
    },
    // title[展开状态下的title，折叠状态的title]
    title: {
      type: Array,
      default: () => ["折叠", "展开"]
    },
    defaultIsOpen: {
      type: Boolean,
      default: true
    },
    // 图标[toLeft, toRight]
    iconClass: {
      type: Object,
      default: () => ({})
    },
    // margin-left[展开状态下的值，折叠状态下的值]
    marginLeft: {
      type: Object,
      default: () => ({})
    },
    // 该组件独占flex中的一列，宽度36px
    hasFlexLocation: {
      type: Boolean,
      default: true
    },
    // hasFlexLocation为false时使用
    right: {
      type: String,
      default: "10px"
    },
    // right且hasFlexLocation为false时使用
    left: {
      type: String,
      default: "10px"
    }
  },
  data() {
    return {
      isOpen: this.defaultIsOpen,
      isHover: false
    };
  },
  computed: {
    myLeftRight() {
      return this.hasFlexLocation ? {} : {
        left: (this.postion === "left" && !this.isOpen || this.postion === "right" && this.isOpen) ? this.left : "unset",
        right: (this.postion === "right" && !this.isOpen || this.postion === "left" && this.isOpen) ? this.right : "unset",
        transform: "translateY(-50%)",
        marginLeft: "0px"
      };
    },
    myLocationStyle() {
      return {
        position: this.locationStyle.position || defaultSetting.locationStyle.position,
        top: this.locationStyle.top || defaultSetting.locationStyle.top,
        left: this.locationStyle.left || defaultSetting.locationStyle.left,
        transform: this.locationStyle.transform || defaultSetting.locationStyle.transform,
        marginLeft: this.marginLeft[this.postion] && this.marginLeft[this.postion][this.isOpen ? 0 : 1] || defaultSetting.marginLeft[this.postion][this.isOpen ? 0 : 1],
        ...this.myLeftRight
      };
    },
    myStyle() {
      const bgColor = this.isHover ? "bgColorHover" : "bgColor";
      return {
        ...this.myLocationStyle,
        width: this.backgroundStyle.width || defaultSetting.backgroundStyle.width,
        height: this.backgroundStyle.height || defaultSetting.backgroundStyle.height,
        backgroundColor: this.backgroundStyle[bgColor] || defaultSetting.backgroundStyle[bgColor],
        padding: this.backgroundStyle.padding || defaultSetting.backgroundStyle.padding
      };
    },
    myIconStyle() {
      return {
        "height": this.backgroundStyle.height || defaultSetting.backgroundStyle.height,
        "transform": "translateX(1px)"
      };
    },
    myIconClass() {
      const toLeft = this.iconClass.toLeft || defaultSetting.iconClass.toLeft;
      const toRight = this.iconClass.toRight || defaultSetting.iconClass.toRight;
      return this.postion === "left" ? [toLeft, toRight] : [toRight, toLeft];
    }
  },
  methods: {
    handleClick() {
      this.isOpen = !this.isOpen;
      this.$emit("click", this.isOpen);
    }
  },
  render() {
    return (
      <span
        style={this.myStyle}
        class="zm-open-close"
        title={this.isOpen ? this.title[0] : this.title[1]}
        onMouseenter={() => { this.isHover = true; }}
        onMouseleave={() => { this.isHover = false; }}
        onClick={this.handleClick}
      >
        <span>
          <t-icon name={this.isOpen ? this.myIconClass[0] : this.myIconClass[1]} style={this.myIconStyle} />
        </span>
        {
          this.$slots.default ? this.$slots.default : null
        }
      </span>
    );
  }
});