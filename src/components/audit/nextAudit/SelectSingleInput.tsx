import Vue from "vue";
import "./style/SelectSingleInput.less"

const map = new Map<string, string>(); // 缓存角色字典翻译
export default Vue.extend({
  name: "SelectSingleInput",
  props: {
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
    value: {
      type: String,
      default: undefined
    },
    allowAdd: {
      type: Boolean,
      default: false
    },
    filterOption: {
      type: Function,
      default: null
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
      
    };
  },
  computed: {
    inputOptions() {
      if (!this.allowAdd || this.searchValue === "" || this.options.find(v => v[this.textField].indexOf(this.searchValue) !== -1)) {
        return this.options;
      } 
      return [
        {
          [this.valueField]: this.searchValue,
          [this.textField]: this.searchValue
        },
        ...this.options
      ];
      
    }
  },
  watch: {
    value: {
      handler(val, oldVal) {
        if (!val && !oldVal) {
          return;
        }
        this.inputValue = map.get(val);
        this.searchValue = this.filterOption ? val : "";
      },
      immediate: true
    }
  },
  methods: {
    handleChange(val) {
      this.$emit("changeValue", val);
      this.$emit("change", this.options.find(v => v[this.valueField] === val));
    },
    handleInput(e) {
      this.searchValue = this.filterOption ? e : "";
    }
  },
  render() {
    map.clear();
    return (
      <t-select-input
        value={this.inputValue}
        clearable
        placeholder={this.placeholder}
        // showSearch={this.filterOption !== null}
        filterOption={this.filterOption}
        disable={this.disable}
        onChange={this.handleChange}
        onSearch={this.handleInput}
        onClear={() => { this.$emit("changeValue", undefined) }}
      >
        {
          <template slot="panel">
            <div class="select-single-input-panel">
              <ul class="tdesign-demo__select-input-ul-autocomplete">
                {
                  this.inputOptions.map(item => {
                    map.set(item[this.valueField], item[this.textField]);
                    return (
                      <li key={item[this.valueField]} onClick={() => { this.handleChange(item[this.valueField]) }}>
                        {item[this.textField]}
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </template>
        }
      </t-select-input>
    )
  }
})