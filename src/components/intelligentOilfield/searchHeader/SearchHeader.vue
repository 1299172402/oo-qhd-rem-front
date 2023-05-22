<template>
  <el-popover
    v-model="visible"
    placement="bottom"
    width="200"
    trigger="manual"
    @show="showPopover"
  >
    <el-input
      ref="sInput"
      v-model="value"
      placeholder="请输入内容"
      clearable
      @blur="closeOver"
      @keyup.enter.native="confirm"
    />
    <el-button
      type="primary"
      size="mini"
      style="margin-top: 15px;float: right;height: 30px"
      @click="confirm"
    >
      搜索
    </el-button>
    <el-button size="mini" style="margin-top: 15px;float: right;margin-right: 10px;height: 30px" @click="resetData">
      重置
    </el-button>
    <div
      slot="reference"
      v-click-outside="closeOver"
      style="margin-left: 5px"
      @click.stop="popClick"
    >
      <svg
        viewBox="64 64 896 896"
        data-icon="search"
        width="0.8em"
        height="0.8em"
        fill="currentColor"
        :style="{'color': $store.state.setting.mode === 'dark' ? '#00def0' : '#0075E9', 'margin-top': '5px'}"
      >
        <path d="M427.01594 1022.976512c-8.69965 0-16.887556-4.093953-21.493253-4.093953-12.793603-8.69965-21.493253-25.587206-21.493254-38.38081V609.999l-375.108445-541.425287c-8.69965-12.793603-12.793603-29.681159-4.093953-47.08046 8.69965-12.793603 21.493253-21.493253 38.380809-21.493253H981.234831c16.887556 0 29.681159 8.69965 38.380809 21.493253 8.69965 12.793603 4.093953 29.681159-4.093953 42.474763L640.413242 609.999v285.553224c0 16.887556-8.69965 29.681159-25.587207 38.380809l-170.410794 85.46127c-4.605697 3.582209-8.69965 3.582209-17.399301 3.582209z" p-id="9939" />
      </svg>
    </div>
  </el-popover>
</template>

<script>
export default {
  directives: {
    clickOutside: {
      bind(el, binding) {
        function clickHandler(e) {
          // 这里判断点击的元素是否是本身，是本身，则返回
          if (el.contains(e.target)) {
            return false;
          }
          // 判断指令中是否绑定了函数
          if (binding.expression) {
            // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
            binding.value(e);
          }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = clickHandler;
        document.addEventListener("click", clickHandler);
      },
      update() {},
      unbind(el) {
        // 解除事件监听
        document.removeEventListener("click", el.__vueClickOutside__);
        delete el.__vueClickOutside__;
      }
    }
  },
  inject: ["reload"],
  props: {
    tableType: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    defaultValue: {
      type: String,
      default: ""
    },
    options: {
      type: Array,
      default: function() {
        return [];
      }
    },
    defaultProps: {
      type: Object,
      default: function() {
        return {
          label: "label",
          value: "value"
        };
      }
    }
  },
  data() {
    return {
      value: "",
      visible: false,
      iconColor: false
    };
  },
  watch: {
    defaultValue(newVal) {
      this.value = newVal;
    }
  },
  methods: {
    showPopover() {
      this.$nextTick(() => {
        this.$refs.sInput.focus();
      });
    },
    resetData() {
      this.value = "";
      this.visible = false;
      this.iconColor = false;
      this.$emit("resetChange", { type: this.type, value: this.value, tableType: this.tableType });
    },
    closeOver() {
      this.visible = false;
    },
    popClick() {
      this.visible = !this.visible;
    },
    confirm() {
      this.visible = false;
      this.iconColor = true;
      this.$emit("selectChange", { type: this.type, value: this.value, tableType: this.tableType });
    }
  }
};
</script>