<!--数据传输组件-->
<template>
  <div class="g-w100 g-h00" style="background: transparent;height: 100%;position: relative;">
    <!-- 2023/05/26注释,为设置自定义快捷入口不同高度 -->
    <!-- TODO: Maybe change back -->
    <!-- :style="[{ height: isQuickEntry ? '28%' : '44%' }]" -->
    <div style="height: 44%;">
      <div v-if="transferType === '快捷入口'" class="g-row-flex-V" style="margin-bottom: 10px;">
        <div style="margin-right: 10px;">
          快捷入口名称：
        </div>
        <div>
          <el-input
            v-model="enterInfo"
            style="width: 220px;"
            size="medium"
            clearable
            placeholder="请输入快捷入口名称"
            @change="changeSource(indicatorSource, enterInfo)"
          />
        </div>
      </div>
      <div v-if="transferType !== '快捷入口'" class="g-row-flex-V" style="margin-bottom: 10px;">
        <div style="margin-right: 10px;">
          {{ searchName }}：
        </div>
        <div>
          <el-select
            v-model="indicatorSource"
            style="width: 220px;"
            placeholder="请选择"
            clearable
            @change="changeSource(indicatorSource, enterInfo)"
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
        <div v-for="(item, index1) in currentSelectedList" :key="index1" style="margin: 0 10px 5px 0;">
          <el-tooltip v-if="item.name && item.name.length>12" :content="item.name">
            <el-button
              type="primary"
            >
              {{ item.name | btnName }}<i class="el-icon-error iconClass" @click="deleteItem(item)" />
            </el-button>
          </el-tooltip>
          <el-button
            v-else
            type="primary"
          >
            {{ item.name | btnName }}<i class="el-icon-error iconClass" @click="deleteItem(item)" />
          </el-button>
        </div>
      </div>
    </div>
    <div class="lineStyle" />
    <!-- 2023/05/26注释,为设置自定义快捷入口不同高度 -->
    <!-- TODO: Maybe change back -->
    <!-- :style="[{ height: isQuickEntry ? '28%' : '44%' }]" -->
    <div style="height: 44%;">
      <div>{{ headerNameList[1].name }}</div>
      <div class="g-row-flex itemStyle">
        <div v-for="(item, index) in currentAllList" :key="index" style="margin: 0 10px 5px 0;">
          <el-tooltip v-if="item.name && item.name.length>12" :content="item.name">
            <el-button class="cancelBtn" @click="selectData(item)">
              {{ item.name |btnName }}
            </el-button>
          </el-tooltip>
          <el-button v-else class="cancelBtn" @click="selectData(item)">
            {{ item.name |btnName }}
          </el-button>
        </div>
      </div>
    </div>
    <!-- 2023/05/26注释 -->
    <!-- TODO: Maybe change back -->
    <!-- <div v-if="isQuickEntry" class="lineStyle" />
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
    </div> -->
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
  filters: {
    btnName(val) {
      if (val.length > 12) {
        return `${val.slice(0, 12)}...`;
      }
      return val;
    }
  },
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
    },
    // 所有数据集合
    totalDataList: {
      type: Array,
      default: () => []
    },
    // 穿梭框所属类型
    transferType: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      enterInfo: "",
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
    changeSource(value, name) {
      this.$emit("changeSource", value, name);
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
      // 所有集合状态改变
      this.totalDataList.forEach(el => {
        if (this.transferType === "看板中心") {
          if (el.boardId === val.boardId) {
            el.isSelected = "1";
          }
        } else if (this.transferType === "业务中心") {
          if (el.businessId === val.businessId) {
            el.isSelected = "1";
          }
        } else if (this.transferType === "指标中心") {
          if (el.indexId === val.indexId) {
            el.isSelected = "1";
          }
        } else if (this.transferType === "快捷入口") {
          if (el.enterId === val.enterId) {
            el.isSelected = "1";
          }
        } else if (this.transferType === "应用中心") {
          if (el.appId === val.appId) {
            el.isSelected = "1";
          }
        }
      });
      this.currentSelectedList.push(val);
      this.$emit("changeData", this.currentSelectedList, currentItem, this.totalDataList);
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
      // 所有集合状态改变
      this.totalDataList.forEach(el => {
        if (this.transferType === "看板中心") {
          if (el.boardId === val.boardId) {
            el.isSelected = "0";
          }
        } else if (this.transferType === "业务中心") {
          if (el.businessId === val.businessId) {
            el.isSelected = "0";
          }
        } else if (this.transferType === "指标中心") {
          if (el.indexId === val.indexId) {
            el.isSelected = "0";
          }
        } else if (this.transferType === "快捷入口") {
          if (el.enterId === val.enterId) {
            el.isSelected = "0";
          }
        } else if (this.transferType === "应用中心") {
          if (el.appId === val.appId) {
            el.isSelected = "0";
          }
        }
      });
      this.currentAllList.push(val);
      //  2023/05/26注释,注释自定义快捷入口逻辑
      //   if (val.enterUser === this.$store.getters["user/userDetail"].user.userId) { // 快捷入口的数据
      //     this.currentQuickEntryList.push(val);
      //   } else {
      //     this.currentAllList.push(val);
      //   }
      this.$emit("changeData", this.currentSelectedList, currentItem, this.totalDataList);
    },
    submitForm() {
      this.indicatorSource = "";
      this.enterInfo = "";
      this.$emit("submitForm");
    },
    cancel() {
      this.indicatorSource = "";
      this.enterInfo = "";
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