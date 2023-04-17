import SelectHeader from "../../../components/intelligentOilfield/searchHeader/SearchHeader.vue";

let self;
export default {
  comments: [SelectHeader],
  data() {
    return {
      filterParams: []
    };
  },
  beforeCreate() {
    self = this;
  },
  methods: {
    // 渲染**的tableheader
    renderSpecNameHeader(createElement, { column }) {
      // 该列的绑定数据
      return createElement(
        "div", { style: "display:inline-flex;" },
        [
          createElement("div", {
            domProps: {
              innerHTML: column.label
            }
          }),
          createElement(SelectHeader, {
            style: "cursor: pointer;",
            // 组件 prop
            props: {
              type: column.property,
              options: self.specIdOptions, // 下拉框选项
              defaultValue: self.examinerFieldChname, // 默认值
              defaultProps: {
                value: "examinerFieldName",
                label: "examinerFieldChname"
              }
            },
            // 事件监听器在 `on` 属性内，
            // 但不再支持如 `v-on:keyup.enter` 这样的修饰器。
            // 需要在处理函数中手动检查 keyCode。
            on: {
              selectChange: self.selectChange,
              resetChange: self.resetChange
            }
          })
        ]
      );
    },
    // 选择框回调
    selectChange(data) {
      const searchVale = this.filterParams.filter(item => item.type === data.type);
      if (searchVale.length > 0) {
        if (data.value) {
          this.filterParams.forEach(item => {
            if (item.type === data.type) {
              item.value = data.value;
            }
          });
        } else {
          this.filterParams.splice(this.filterParams.indexOf(searchVale[0]), 1);
        }
      } else {
        this.filterParams.push(data);
      }
      this.filterParamsChange();
    },
    // 重置回调
    resetChange(data) {
      const searchVale = this.filterParams.filter(item => item.type === data.type);
      if (searchVale.length > 0) {
        this.filterParams.splice(this.filterParams.indexOf(searchVale[0]), 1);
      }
      this.filterParamsChange();
    }
  }
};