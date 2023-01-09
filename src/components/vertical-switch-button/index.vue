<!--自定义竖向切换按钮-->
<template>
  <div class="g-w100 g-h100">
    <div v-for="(item, index) in dataList" :key="index" class="btnStyle">
      <el-button
        v-if="item.isChecked"
        style="width: 200px"
        :style="{ width: buttonWidth }"
        :type="item.isChecked ? 'primary' : ''"
        @click="selectBtn(item)"
        >{{ item.name }}</el-button
      >
      <el-button
        v-else
        :style="{ width: buttonWidth }"
        :class="!item.isChecked ? 'commonBtn' : ''"
        @click="selectBtn(item)"
        >{{ item.name }}</el-button
      >
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: () => [
        { name: '全部待办', isChecked: true },
        { name: '我的已办', isChecked: false },
        { name: '尚未处理', isChecked: false },
        { name: '我的发起', isChecked: false },
      ],
    },
    // 按钮宽度
    buttonWidth: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  methods: {
    selectBtn(item) {
      this.dataList.forEach((el) => {
        el.isChecked = false;
      });
      item.isChecked = true;
      this.$emit('selectBtn', item);
    },
  },
};
</script>
<style scoped>
.el-button + .el-button {
  /* margin-left: 0px; */
}
.btnStyle {
  margin-bottom: 20px;
}
</style>
