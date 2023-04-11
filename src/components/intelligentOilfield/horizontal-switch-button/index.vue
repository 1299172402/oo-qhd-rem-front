<!--自定义水平切换按钮-->
<template>
  <div class="g-row-flex">
    <div v-for="(item, index) in dataList" :key="index" style="border-radius: 4px">
      <div class="leftBtn g-row-flex-HV" :style="{background: item.isChecked?colorList[$store.state.setting.mode]:'transparent',border: `1px solid ${borderList[$store.state.setting.mode]}`,color:item.isChecked?'#fff':borderList[$store.state.setting.mode]}" @click="selectBtn(item)">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: () => [
        { name: "全部", isChecked: true },
        { name: "我的", isChecked: false }
      ]
    },
    // 背景色系
    colorList: {
      type: Object,
      default() {
        return {
          "dark": "rgba(0, 222, 240, 0.4)", "light": "var(--light-blue-color)"
        };
      }
    },
    // border色系
    borderList: {
      type: Object,
      default() {
        return {
          "dark": "rgba(0, 222, 240, 1)", "light": "var(--only-light-blue-color)"
        };
      }
    },
    // 按钮宽度
    buttonWidth: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      aa: {}
    };
  },
  methods: {
    selectBtn(item) {
      this.dataList.forEach(el => {
        el.isChecked = false;
      });
      item.isChecked = true;
      this.$emit("selectBtn", item);
    }
  }
};
</script>
<style scoped>
.leftBtn {
  font-size: 16px;
  border: 1px solid red;
  color: red;
  width: 60px;
  height: 30px;
  cursor: pointer;
  background-image: var(--logo-bg) !important;
  background-size: 100% 100% !important;
}
</style>