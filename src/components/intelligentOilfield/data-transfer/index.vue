<!--数据传输组件-->
<template>
  <div class="g-w100 g-h00" style="background: transparent">
    <div>
        <div class="g-row-flex-V" style="margin-bottom: 10px">
          <div style="margin-right: 10px">{{searchName}}：</div>
          <div>
            <el-select
              v-model="indicatorSource"
              placeholder="请选择"
              @change="changeSource(indicatorSource)"
              clearable
              @clear="clearData"
            >
              <el-option v-for="item in searchOption" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </div>
        </div>
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
    // 搜索下拉框关键词名字
    searchName: {
      type: String,
      default: '应用筛选',
    },
    // 搜索下拉框选项集合
    searchOption: {
      type: Array,
      default: ()=>[]
    },
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
    },
  },
  data() {
    return {
      options: [],
      indicatorSource: '',
      currentSelectedList: this.selectedList,
      currentAllList: this.allList,
    };
  },
  watch: {
    allList: {
      handler(newVal) {
        this.currentAllList = newVal;
      },
      deep: true,
      immediate: true,
    },
    selectedList: {
      handler(newVal) {
        this.currentSelectedList = newVal;
        // console.log('111', this.currentSelectedList);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 改变数据来源
    changeSource(value) {
      this.getDataList(value);
    },
    // 清除来源，获取所有数据
    clearData() {
      this.getDataList('');
    },
    // 获取所有数据来源
    getDataList(searchParam) {
      this.currentAllList = [];
      // 调取接口：获取指标图片来源接口（indicatorSource：当前搜索内容）
      //   listUser().then((response) => {
      //     this.allList = response.data.data;
      //   });
      
      switch (searchParam) {
      case '':
        this.currentAllList = [
          { id: 6, img: new URL(`../../../../../assets/intelligentOilfield/yewu1.png`, import.meta.url).href, name: '施工总览', url: 'https://element.eleme.cn/#/zh-CN/component/installation' },
          { id: 7, img: new URL(`../../../../../assets/intelligentOilfield/yewu2.png`, import.meta.url).href, name: '痕迹管理', url: 'https://lbs.amap.com/api/loca-v2/api#viewcontrol' },
          { id: 8, img: new URL(`../../../../../assets/intelligentOilfield/yewu3.png`, import.meta.url).href, name: '注采联动', url: 'https://www.isqqw.com/#/homepage' },
        ]
        break;
      case '1':
        this.currentAllList = [
          { id: 7, img: new URL(`../../../../../assets/intelligentOilfield/yewu2.png`, import.meta.url).href, name: '痕迹管理', url: 'https://lbs.amap.com/api/loca-v2/api#viewcontrol' },
        ]
        break;
      case '2':
        this.currentAllList = [
          { id: 8, img: new URL(`../../../../../assets/intelligentOilfield/yewu3.png`, import.meta.url).href, name: '注采联动', url: 'https://www.isqqw.com/#/homepage' },
        ]
        break;
      case '3':
        this.currentAllList = [
          { id: 6, img: new URL(`../../../../../assets/intelligentOilfield/yewu1.png`, import.meta.url).href, name: '施工总览', url: 'https://element.eleme.cn/#/zh-CN/component/installation' },
        ]
        break;
      default:
        break;
      }
    },
    // 选择数据到上面
    selectData(val) {
      this.currentAllList.map((item, index) => {
        let result;
        if (item === val) {
          result = this.currentAllList.splice(index, 1);
        }
        return result;
      });
      this.currentSelectedList.push(val);
      this.$emit('changeData', this.currentSelectedList);
    },
    // 删除元素
    deleteItem(val) {
      this.currentSelectedList.map((item, index) => {
        let result;
        if (item === val) {
          result = this.currentSelectedList.splice(index, 1);
        }
        return result;
      });
      this.currentAllList.push(val);
      this.$emit('changeData', this.currentSelectedList);
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
