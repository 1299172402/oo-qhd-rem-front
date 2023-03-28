<!-- 统计数据组件 -->
<template>
  <div style="font-size: 20px" class="g-w100 g-h100">
    <el-dialog
      @close="cancel"
      title="内容设置-指标中心"
      :visible.sync="openDialog"
      width="600px"
      append-to-body
      :close-on-click-modal="false"
    >
      <div>
        <div class="g-row-flex-V">
          <div style="margin-right: 10px">指标来源</div>
          <div>
            <el-select
              v-model="indicatorSource"
              placeholder="请选择"
              @change="changeSource"
              clearable
              @clear="clearData"
            >
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </div>
        </div>
        <div class="g-row-flex" style="flex-wrap: wrap; margin-top: 10px">
          <div
            v-for="(item, index) in imgList"
            :key="index"
            style="margin-right: 10px; position: relative"
            @click="selectItem(item)"
          >
            <img :src="item.url" alt="" class="imgSetting" />
            <i
              class="el-icon-success successIcon"
              :style="{ color: item.isSelected ? 'rgba(149,242,4,1)' : 'rgba(127, 127, 127, 1)' }"
            ></i>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel" class="cancelBtn">取 消</el-button>
      </div>
    </el-dialog>
    <info-window infoWidth="100%" infoHeight="100%" headerTitle="统计数据">
      <!-- <div
        style="padding: 20px; justify-content: space-between; overflow: scroll; flex-wrap: wrap"
        class="g-row-flex g-h100 divBox"
        id="myBox"
        :style="{ flexWrap: echartsList.length > 5 ? (newWPx <= 938 && newWPx !== 0 ? 'wrap' : 'nowrap') : 'wrap' }"
      >
        <div
          class="indexCenter"
          v-for="(item, index) in echartsList"
          :key="index"
          :style="{
            margin:
              newWPx <= 938 && newWPx !== 0
                ? '0px 0px 10px 0px'
                : index === echartsList.length - 1
                ? '0px'
                : '0px 10px 0px 0px',
          }" -->
         <div class="g-row-flex g-h100 divBox" style="flex-wrap: wrap;">
          <div
            class="g-row-flex"
            v-for="(item, index) in imgList1"
            :key="index"
            style="position: relative;padding: 20px; justify-content: space-around; flex-wrap: wrap"
          >
            <img :src="item.url" alt="" class="imgSetting" style="width:285px;height:100%"/>
          </div>
        </div>

          <!-- <component :is="getContent(item.type)" :echartsItem="item" /> -->
        <!-- </div>
      </div> -->
    </info-window>
  </div>
</template>
<script>
// import ComponentsLogin from '@/pages/intelligentOilfield/login/components/components-login.vue';
// import textCom from '@/pages/intelligentOilfield/portal/projectionMode/components/indexCenter/textCom.vue';
// import barChartCom from '@/pages/intelligentOilfield/portal/projectionMode/components/indexCenter/barChartCom.vue';
// import lineChartCom from '@/pages/intelligentOilfield/portal/projectionMode/components/indexCenter/lineChartCom.vue';
// import pieChartCom from '@/pages/intelligentOilfield/portal/projectionMode/components/indexCenter/pieChartCom.vue';

export default {
//   components: {
//     ComponentsLogin,
//     textCom,
//   },
  props: {
    // 缩放组件至某一宽度newWPx，目的是换展现形式
    newWPx: {
      type: Number,
      default: 0,
    },
    componentItem: {
      type: Object,
      default: () => ({}),
    },
    operate: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      imgList: [],
      imgList1: [],
      mode: 'light',
      openDialog: false,
      indicatorSource: '',
      options: [],
      initEchartsList: [], // 模板展示
      echartsList: [], // 当前展示
      storeEchartsList: [], // 存储接口展示
    };
  },
  watch: {
    newWPx: {
      handler(newVal) {
        // console.log('最新宽度', newVal);
        // 最后一行以左边对齐
        if (newVal <= 938 && newVal !== 0) {
          // 兼容IE浏览器
          document.styleSheets[0].addRule('#myBox::after', 'display:block');
          // 支持非IE的现代浏览器
          document.styleSheets[0].insertRule('#myBox::after {display: block}', 0);
        } else {
          document.styleSheets[0].addRule('#myBox::after', 'display:none');
          document.styleSheets[0].insertRule('#myBox::after {display: none}', 0);
        }
      },
      deep: true,
      immediate: true,
    },
    'componentItem.content': {
      handler(newVal) {
        this.echartsList = newVal === 'default' ? this.echartsList : [];
      },
      deep: true,
      immediate: true,
    },
    'componentItem.contentSetting': {
      handler(newVal) {
        if (newVal) {
          this.getDataList('');
          this.openDialog = newVal;
        }
      },
      deep: true,
      immediate: true,
    },
    '$store.state.setting.mode': {
      handler(newVal) {
        this.mode = newVal;
      },
      deep: true,
      immediate: true,
    },
    operate: {
      handler(newVal) {
        console.log('cc', newVal);
        if (newVal === '重置') {
          this.echartsList = JSON.parse(JSON.stringify(this.initEchartsList));
        } else if (newVal === '取消') {
          this.echartsList = JSON.parse(JSON.stringify(this.storeEchartsList));
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.getOptionsList();
    this.getDataList('');
    this.getEchartsList();
  },
  methods: {
    getEchartsList() {
      this.echartsList = [];
      // 指标中心展示接口
      //   listUser().then((response) => {
      //     this.echartsList = response.data.data;
      //   this.storeEchartsList = JSON.parse(JSON.stringify(this.echartsList))
      //   this.initEchartsList = response.data.data.initEchartsList;
      //   });
      // 接口所得列表
      this.echartsList = [
        { type: 'text', name: '产量指标', num: '28425.00', hasLift: true, rise: true, liftNum: '20.5%' },
        { type: 'barChart', name: '采油速度', num: '768.00', hasLift: false, rise: true, liftNum: '-' },
        { type: 'pieChart', name: '月度产量情况', num: '83%', hasLift: true, rise: false, liftNum: '20.5%' },
        { type: 'lineChart', name: '人员考勤', num: '527', hasLift: false, rise: true, liftNum: '-' },
        { type: 'text', name: '产量指标1', num: '123.00', hasLift: true, rise: false, liftNum: '12.5%' },
      ];
      //
      this.storeEchartsList = JSON.parse(JSON.stringify(this.echartsList));
      // 模板列表
      this.initEchartsList = [
        { type: 'text', name: '产量指标', num: '28425.00', hasLift: true, rise: true, liftNum: '20.5%' },
        { type: 'barChart', name: '采油速度', num: '768.00', hasLift: false, rise: true, liftNum: '-' },
        { type: 'pieChart', name: '月度产量情况', num: '83%', hasLift: true, rise: false, liftNum: '20.5%' },
        { type: 'lineChart', name: '人员考勤', num: '527', hasLift: false, rise: true, liftNum: '-' },
        { type: 'text', name: '产量指标', num: '28425.00', hasLift: true, rise: true, liftNum: '20.5%' },
        { type: 'barChart', name: '采油速度', num: '768.00', hasLift: false, rise: true, liftNum: '-' },
        { type: 'pieChart', name: '月度产量情况', num: '83%', hasLift: true, rise: false, liftNum: '20.5%' },
        { type: 'lineChart', name: '人员考勤', num: '527', hasLift: false, rise: true, liftNum: '-' },
      ];
    },
    // 获取所有数据来源
    getDataList() {
      this.imgList = [];
      // 调取接口：获取指标图片来源接口（所有/搜索参数：searchParam：下拉选中;this.mode:传当前色系）
      //   listUser().then((response) => {
      //     this.imgList = response.data.data;
      //   });
      this.imgList1 = [
        {
          isSelected: true,
          name: '产量指标',
          type: 'text',
          url: new URL(`../../../../assets/intelligentOilfield/sj1.png`, import.meta.url).href,
        },
        {
          isSelected: true,
          name: '产量指标',
          type: 'text',
          url: new URL(`../../../../assets/intelligentOilfield/sj2.png`, import.meta.url).href,
        },
        {
          isSelected: true,
          name: '产量指标',
          type: 'text',
          url: new URL(`../../../../assets/intelligentOilfield/sj3.png`, import.meta.url).href,
        },
        {
          isSelected: true,
          name: '产量指标',
          type: 'text',
          url: new URL(`../../../../assets/intelligentOilfield/sj4.png`, import.meta.url).href,
        },
        {
          isSelected: true,
          name: '产量指标',
          type: 'text',
          url: new URL(`../../../../assets/intelligentOilfield/sj5.png`, import.meta.url).href,
        },
      ];
    //   switch (searchParam) {
    //   case '':
    //     this.imgList = [
    //       {
    //         isSelected: true,
    //         name: '产量指标',
    //         type: 'text',
    //         url: new URL(`../../../../../assets/intelligentOilfield/text-${this.mode}.png`, import.meta.url).href,
    //       },
    //       {
    //         isSelected: true,
    //         name: '采油速度',
    //         type: 'barChart',
    //         url: new URL(`../../../../../assets/intelligentOilfield/bar-${this.mode}.png`, import.meta.url).href,
    //       },
    //       {
    //         isSelected: true,
    //         name: '人员考勤',
    //         type: 'lineChart',
    //         url: new URL(`../../../../../assets/intelligentOilfield/line-${this.mode}.png`, import.meta.url).href,
    //       },
    //       {
    //         isSelected: true,
    //         name: '月度产量情况',
    //         type: 'pieChart',
    //         url: new URL(`../../../../../assets/intelligentOilfield/pie-${this.mode}.png`, import.meta.url).href,
    //       },
    //       {
    //         isSelected: true,
    //         name: '产量指标1',
    //         type: 'text',
    //         url: new URL(`../../../../../assets/intelligentOilfield/text-${this.mode}.png`, import.meta.url).href,
    //       },
    //     ];
    //     break;
    //   case '1':
    //     this.imgList = [
    //       {
    //         isSelected: true,
    //         name: '产量指标',
    //         type: 'text',
    //         url: new URL(`../../../../../assets/intelligentOilfield/text-${this.mode}.png`, import.meta.url).href,
    //       },
    //       {
    //         isSelected: true,
    //         name: '采油速度',
    //         type: 'barChart',
    //         url: new URL(`../../../../../assets/intelligentOilfield/bar-${this.mode}.png`, import.meta.url).href,
    //       },
    //     ];
    //     break;
    //   case '2':
    //     this.imgList = [
    //       {
    //         isSelected: true,
    //         name: '采油速度',
    //         type: 'barChart',
    //         url: new URL(`../../../../../assets/intelligentOilfield/bar-${this.mode}.png`, import.meta.url).href,
    //       },
    //       {
    //         isSelected: true,
    //         name: '人员考勤',
    //         type: 'lineChart',
    //         url: new URL(`../../../../../assets/intelligentOilfield/line-${this.mode}.png`, import.meta.url).href,
    //       },
    //       {
    //         isSelected: true,
    //         name: '月度产量情况',
    //         type: 'pieChart',
    //         url: new URL(`../../../../../assets/intelligentOilfield/pie-${this.mode}.png`, import.meta.url).href,
    //       },
    //     ];
    //     break;
    //   case '3':
    //     this.imgList = [
    //       {
    //         isSelected: true,
    //         name: '月度产量情况',
    //         type: 'pieChart',
    //         url: new URL(`../../../../../assets/intelligentOilfield/pie-${this.mode}.png`, import.meta.url).href,
    //       },
    //     ];
    //     break;
    //   default:
    //     break;
    //   }
    },
    getOptionsList() {
      // 调取接口：获取下拉来源接口
      this.options = [
        {
          value: '1',
          label: '油藏管理',
        },
        {
          value: '2',
          label: '内力管理',
        },
        {
          value: '3',
          label: '按说管理',
        },
      ];
    },
    // getContent(i) {
    //   switch (i) {
    //   case 'text':
    //     return textCom;
    //   case 'barChart':
    //     return barChartCom;
    //   case 'pieChart':
    //     return pieChartCom;
    //   case 'lineChart':
    //     return lineChartCom;
    //   default:
    //     break;
    //   }
    // },
    submitForm() {
      // 通过name关键词获取数据接口
      this.echartsList = [];
      this.imgList.forEach((el) => {
        if (el.isSelected) {
          switch (el.name) {
          case '产量指标':
            this.echartsList.push({
              type: 'text',
              name: '产量指标',
              num: '28425.00',
              hasLift: true,
              rise: true,
              liftNum: '20.5%',
            });
            break;
          case '采油速度':
            this.echartsList.push({
              type: 'barChart',
              name: '采油速度',
              num: '768.00',
              hasLift: false,
              rise: true,
              liftNum: '-',
            });
            break;
          case '月度产量情况':
            this.echartsList.push({
              type: 'pieChart',
              name: '月度产量情况',
              num: '83%',
              hasLift: true,
              rise: false,
              liftNum: '20.5%',
            });
            break;
          case '人员考勤':
            this.echartsList.push({
              type: 'lineChart',
              name: '人员考勤',
              num: '527',
              hasLift: false,
              rise: true,
              liftNum: '-',
            });
            break;
          case '产量指标1':
            this.echartsList.push({
              type: 'text',
              name: '产量指标1',
              num: '123.00',
              hasLift: true,
              rise: false,
              liftNum: '12.5%',
            });
            break;
          default:
            break;
          }
        }
      });
      // 将已选应用存储起来
      //   console.log('存储应用==', this.storeSelectedList);
      //   this.selectedList = JSON.parse(JSON.stringify(this.storeSelectedList))
      // 调取接口
      this.cancel();
    },
    cancel() {
      // 将数据置为初始状态
      this.getDataList('');
      this.openDialog = false;
      this.indicatorSource = '';
      this.$emit('changeContentSetting', false);
    },
    // 选中指标
    selectItem(item) {
      item.isSelected = !item.isSelected;
    },
    // 改变数据来源
    changeSource(value) {
      this.getDataList(value);
    },
    // 清除来源，获取所有数据
    clearData() {
      this.getDataList('');
    },
  },
};
</script>

<style scoped>
.indexCenter {
  border: 1px solid var(--lightBlueColor);
  width: 18%;
  min-width: 190px;
  min-height: 116px;
}

.divBox:after {
  content: '';
  width: 190px;
  display: none;
}
.imgSetting {
  width: 150px;
}
.successIcon {
  color: rgba(127, 127, 127, 1);
  position: absolute;
  font-size: 20px;
  right: 5px;
  top: 5px;
  cursor: pointer;
}
</style>
