<!--数据传输组件-->
<template>
  <div class="g-w100 g-h00" style="background: transparent">
    <div>
      <div>{{ headerNameList[0].name }}</div>
      <div class="g-row-flex itemStyle">
        <div v-for="(item, index1) in currentSelectedList" :key="index1" style="margin: 0 10px 5px 0">
          <el-button type="primary"
            >{{ item.name }}<i class="el-icon-error iconClass" @click="deleteItem(item)"></i
          ></el-button>
        </div>
      </div>
    </div>
    <div class="lineStyle"></div>
    <div>
      <div>{{ headerNameList[1].name }}</div>
      <div class="g-row-flex itemStyle">
        <div v-for="(item, index) in currentAllList" :key="index" style="margin: 0 10px 5px 0">
          <el-button class="cancelBtn" @click="selectData(item)">{{ item.name }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    headerNameList: {
      type: Array,
      default: () => [
        { id: 0, name: '已选应用', isSelected: true },
        { id: 1, name: '未选应用', isSelected: false },
      ],
    },
    allList: {
      type: Array,
      default: () => [],
    },
    selectedList: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      currentSelectedList: this.selectedList,
      currentAllList: this.allList,
    };
  },
  watch: {
    allList: {
      handler(newVal) {
        this.currentAllList = newVal ;
      },
      deep: true,
      immediate: true
    },
    selectedList: {
      handler(newVal) {
        this.currentSelectedList = newVal;
        // console.log('111', this.currentSelectedList);
      },
      deep: true,
      immediate: true
    },
  },
  methods: {
    // 选择数据到上面
    selectData(val) {
      this.currentAllList.map((item,index) => {
        let result;
        if(item === val) {
          result = this.currentAllList.splice(index,1)
        }
        return result;
      })
      this.currentSelectedList.push(val);
      this.$emit('changeData', this.currentSelectedList )
    },
    // 删除元素
    deleteItem(val) {
      this.currentSelectedList.map((item,index) => {
        let result;
        if(item === val) {
          result = this.currentSelectedList.splice(index,1)
        }
        return result;
      })
      this.currentAllList.push(val)
      this.$emit('changeData', this.currentSelectedList )
    },
  },
};
</script>
<style scoped>
.iconClass {
  color: red;
  padding-left: 10px;
  width: 10px;
}
.itemStyle {
    margin-top: 10px;
    flex-wrap: wrap;
}
.lineStyle {
    border-top: 1px solid var(--lightBlueColor);
    margin: 10px 0;
}
</style>
