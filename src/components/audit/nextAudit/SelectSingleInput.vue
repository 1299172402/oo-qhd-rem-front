<template>
  <t-select-input
    v-model="inputValue"
    clearable
    allow-input
    :placeholder="inputValue || placeholder"
    :popup-visible="popupVisible"
    :disabled="disabled"
    @popup-visible-change="onPopupVisibleChange"
    @change="handleChange"
    @input-change="handleInput"
    @clear="() => { $emit('change', ''); }"
  >
    <template slot="panel">
      <div class="select-single-input-panel">
        <ul class="tdesign-demo__select-input-ul-autocomplete">
          <template v-if="inputOptions.length <= 0">
            <span style="text-align: center;">暂无数据</span>
          </template>
          <template v-else>
            <li
              v-for="(item,index) in inputOptions"
              :key="index"
              @click="() => { handleChange(item[valueField]); }"
            >
              {{ item[textField] }}
            </li>
          </template>
        </ul>
      </div>
    </template>
  </t-select-input>
</template>
<script>
import Vue from "vue";

const optionMap = new Map(); // 缓存角色字典翻译

export default Vue.extend({
  name: "SelectSingleInput",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: String,
      default: undefined
    },
    options: {
      type: Array,
      default: () => []
    },
    valueField: {
      type: String,
      default: "value"
    },
    textField: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: ""
    },
    allowAdd: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputValue: undefined,
      searchValue: "",
      popupVisible: false
    };
  },
  computed: {
    inputOptions() {
      if (!this.allowAdd || this.searchValue === "" || this.options.find(v => v[this.textField].indexOf(this.searchValue) !== -1)) {
        return this.searchValue ? this.optionsFilter(this.searchValue, this.options) : this.options;
      }
      const options = [
        {
          [this.valueField]: this.searchValue,
          [this.textField]: this.searchValue
        },
        ...this.options
      ];
      return this.searchValue ? this.optionsFilter(this.searchValue, options) : options;
    }
  },
  watch: {
    value: {
      handler(val, oldVal) {
        if (!val && !oldVal) {
          return;
        }
        this.$nextTick(() => {
          this.inputValue = optionMap.get(val) || val;
        });
      },
      immediate: true
    },
    inputOptions: {
      handler: function(val) {
        val.forEach(item => {
          optionMap.set(item[this.valueField], item[this.textField]);
        });
      },
      immediate: true
    }
  },
  methods: {
    handleChange(val) {
      this.popupVisible = false;
      this.$emit("change", val);
    },
    handleInput(e) {
      this.searchValue = e;
    },
    onPopupVisibleChange(val) {
      this.popupVisible = val;
    },
    optionsFilter(value, options) {
      return options.filter(item => item.roleName.includes(value));
    }
  }
});
</script>
<style scoped lang="less">
@import "./style/SelectSingleInput.less";
</style>