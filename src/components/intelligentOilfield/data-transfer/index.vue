<!--数据传输组件-->
<template>
  <div class="g-w100 g-h00" style="background: transparent;height: 100%;position: relative;">
    <div :style="[{ height: isQuickEntry ? '28%' : '44%' }]">
      <div class="g-row-flex-V" style="margin-bottom: 10px">
        <div style="margin-right: 10px">
          {{ searchName }}：
        </div>
        <div>
          <el-select
            v-model="indicatorSource"
            placeholder="请选择"
            clearable
            @change="changeSource(indicatorSource)"
          >
            <el-option
              v-for="item in searchOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div>{{ headerNameList[0].name }}</div>
      <div class="g-row-flex itemStyle" style="height: calc(100% - 82px);">
        <div v-for="(item, index1) in currentSelectedList" :key="index1" style="margin: 0 10px 5px 0">
          <el-button
            type="primary"
          >
            {{ item.name }}<i class="el-icon-error iconClass" @click="deleteItem(item)" />
          </el-button>
        </div>
      </div>
    </div>
    <div class="lineStyle" />
    <div :style="[{ height: isQuickEntry ? '28%' : '44%' }]">
      <div>{{ headerNameList[1].name }}</div>
      <div class="g-row-flex itemStyle">
        <div v-for="(item, index) in currentAllList" :key="index" style="margin: 0 10px 5px 0">
          <el-button class="cancelBtn" @click="selectData(item)">
            {{ item.name }}
          </el-button>
        </div>
      </div>
    </div>
    <div v-if="isQuickEntry" class="lineStyle" />
    <div v-if="isQuickEntry" style="height: 28%;">
      <div>自定义快捷入口</div>
      <div class="g-row-flex itemStyle">
        <div v-for="(item2, index2) in currentQuickEntryList" :key="index2" style="margin: 0 10px 5px 0">
          <el-button class="cancelBtn" style="position: relative" @click="selectEntryData(item2)">
            <div class="g-row-flex-V g-w100 g-h100">
              <div style="margin-right: 10px">
                {{ item2.name }}
              </div>
              <i class="el-icon-remove" style="position: absolute;right: 10px;width: 10px;color: red;cursor: pointer" @click.stop="removeQuickEntry(item2)" />
            </div>
          </el-button>
        </div>
        <i class="el-icon-circle-plus g-row-flex-V" style="font-size: 22px;color: var(--light-blue-color);cursor: pointer;line-height: 40px;height: 40px;" @click="addQuickEntry" />
      </div>
    </div>
    <div
      slot="footer"
      class="dialog-footer g-row-flex-V"
      style="position: absolute;right: 0;bottom: 0;"
    >
      <el-button type="primary" @click="submitForm">
        确 定
      </el-button>
      <el-button class="cancelBtn" @click="cancel">
        取 消
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // 自定义快捷入口集合
    quickEntryList: {
      type: Array,
      default: () => []
    },
    // 搜索下拉框关键词名字
    searchName: {
      type: String,
      default: "应用筛选"
    },
    // 搜索下拉框选项集合
    searchOption: {
      type: Array,
      default: () => []
    },
    headerNameList: {
      type: Array,
      default: () => [
        { id: 0, name: "已选应用", isSelected: true },
        { id: 1, name: "未选应用", isSelected: false }
      ]
    },
    allList: {
      type: Array,
      default: () => []
    },
    selectedList: {
      type: Array,
      default: () => []
    },
    // 快捷入口专属
    isQuickEntry: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: [],
      indicatorSource: "",
      currentSelectedList: this.selectedList,
      currentAllList: this.allList,
      currentQuickEntryList: this.quickEntryList
    };
  },
  watch: {
    allList: {
      handler(newVal) {
        this.currentAllList = newVal;
      },
      deep: true,
      immediate: true
    },
    selectedList: {
      handler(newVal) {
        this.currentSelectedList = newVal;
      },
      deep: true,
      immediate: true
    },
    quickEntryList: {
      handler(newVal) {
        this.currentQuickEntryList = newVal;
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 删除自定义快捷入口数据
    removeQuickEntry(val) {
      this.$confirm("确定删除该自定义快捷入口？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "cancelBtn",
        type: "warning"
      }).then(() => {
        this.$emit("removeQuickEntry", val);
      }).catch(() => {

      });
    },
    // 点击选择自定义快捷入口数据
    selectEntryData(val) {
      let currentItem = {};
      this.currentQuickEntryList.map((item, index) => {
        let result;
        if (item === val) {
          result = this.currentQuickEntryList.splice(index, 1);
          item.isSelected = "1";
          currentItem = item;
        }
        return result;
      });
      this.currentSelectedList.push({ ...val, type: "entryData" });
      this.$emit("changeData", this.currentSelectedList, currentItem);
    },
    // 增加快捷入口快捷数据源
    addQuickEntry() {
      this.$emit("addQuickEntry");
    },
    // 改变数据来源
    changeSource(value) {
      this.$emit("changeSource", value);
    },
    // 选择数据到上面
    selectData(val) {
      let currentItem = {};
      this.currentAllList.map((item, index) => {
        let result;
        if (item === val) {
          result = this.currentAllList.splice(index, 1);
          item.isSelected = "1";
          currentItem = item;
        }
        return result;
      });
      this.currentSelectedList.push(val);
      this.$emit("changeData", this.currentSelectedList, currentItem);
    },
    // 删除元素
    deleteItem(val) {
      let currentItem = {};
      this.currentSelectedList.map((item, index) => {
        let result;
        if (item === val) {
          result = this.currentSelectedList.splice(index, 1);
          item.isSelected = "0";
          currentItem = item;
        }
        return result;
      });
      if (val.enterUser === this.$store.getters["user/userDetail"].user.userId) { // 快捷入口的数据
        this.currentQuickEntryList.push(val);
      } else {
        this.currentAllList.push(val);
      }
      this.$emit("changeData", this.currentSelectedList, currentItem);
    },
    submitForm() {
      this.indicatorSource = "";
      this.$emit("submitForm");
    },
    cancel() {
      this.indicatorSource = "";
      this.$emit("cancel");
    }
  }
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
  height: calc(100% - 30px);
  overflow: auto;
  align-content: flex-start;
}

.lineStyle {
  border-top: 1px solid var(--light-blue-color);
  margin: 10px 0;
}
</style>