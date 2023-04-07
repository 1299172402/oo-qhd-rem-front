import Vue from "vue";

const JINPUT_QUERY_LIKE = "like";
const JINPUT_QUERY_NE = "ne";
const JINPUT_QUERY_GE = "ge"; // 大于等于
const JINPUT_QUERY_LE = "le"; // 小于等于

export default Vue.extend({
  name: "JInput",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: String,
      default: "",
      required: false
    },
    type: {
      type: String,
      required: false,
      default: JINPUT_QUERY_LIKE
    },
    placeholder: {
      type: String,
      required: false,
      default: ""
    }
  },
  data() {
    return {
      inputVal: ""
    };
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.initVal();
      }
    }
  },
  methods: {
    initVal() {
      if (!this.value) {
        this.inputVal = "";
      } else {
        let text = this.value;
        switch (this.type) {
          case JINPUT_QUERY_LIKE:
            text = text.substring(1, text.length - 1);
            break;
          case JINPUT_QUERY_NE:
            text = text.substring(1);
            break;
          case JINPUT_QUERY_GE:
            text = text.substring(2);
            break;
          case JINPUT_QUERY_LE:
            text = text.substring(2);
            break;
          default:
        }
        this.inputVal = text;
      }
    },
    backValue(e) {
      let text = e.target.value;
      switch (this.type) {
        case JINPUT_QUERY_LIKE:
          text = text ? `*${text}*` : "";
          break;
        case JINPUT_QUERY_NE:
          text = `!${text}`;
          break;
        case JINPUT_QUERY_GE:
          text = `>=${text}`;
          break;
        case JINPUT_QUERY_LE:
          text = `<=${text}`;
          break;
        default:
      }
      this.$emit("change", text);
    }
  },
  render() {
    return (
      <t-input
        placeholder={this.placeholder}
        value={this.inputVal}
        allowClear
        onInput={this.backValue}
      >

      </t-input>
    );
  }
});