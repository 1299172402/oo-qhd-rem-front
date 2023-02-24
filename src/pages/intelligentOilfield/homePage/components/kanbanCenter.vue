<!-- 看板中心组件 -->
<template>
  <div style="font-size: 20px" class="g-w100 g-h100">
    <div id="fullScreen_panorama">
      <bottomButton v-if="linkUrl !== ''" @bigScreenMode="fullExit" class="bottomBtn"></bottomButton>
      <iframe v-if="linkUrl !== ''" :src="linkUrl" frameborder="0" class="g-w100 g-h100"></iframe>
    </div>
    <el-dialog title="内容设置-看板中心" :visible.sync="openDialog" width="600px" append-to-body :close-on-click-modal="false"
      :show-close="false">
      <div>
        <dataTransfer @submitForm="submitForm" @cancel="cancel" searchName="看板来源" :searchOption="dict.type.sys_app_type"
          :allList="allList" :selectedList="selectedList" @changeData="changeData" @changeSource="changeSource"
          :headerNameList="headerNameList"></dataTransfer>
      </div>
    </el-dialog>
    <info-window infoWidth="100%" infoHeight="100%" headerTitle="已授权看板">
      <div style="padding: 10px 20px" class="g-w100 g-h100 g-column-flex">
      <!-- <el-tabs
          @tab-click="handleClick"
          v-model="activeName"
          class="g-pageHeader"
          style="position: relative; z-index: 0; height: 15%"
        >
          <el-tab-pane label="专业看板" name="professionalKanban"></el-tab-pane>
          <el-tab-pane label="协同看板" name="collaborativeKanban"></el-tab-pane>
                      </el-tabs> -->
        <div class="g-row-flex g-h100 divBox" style="flex-wrap: no-wrap;">
          <div class="g-column-flex-H" v-for="(item, index) in list" :key="index"
            style="position: relative;padding: 20px; justify-content: space-around; flex-wrap: wrap;cursor: pointer"
            @click="toClick(item.boardUrl)">
            <img :src="item.boardImg" alt="" class="imgSetting" style="width:40px" />
            {{ item.boardName }}
          </div>
        </div>
      <!-- <div class="g-w100 g-row-flex-HV" style="height: 85%;">
        <circularPanel
          @linkIframe="linkIframe"
          :changeNewPx="newWPx"
          :panels="selectedList"
          class="g-w100"
        ></circularPanel>
                      </div> -->
      </div>
    </info-window>
  </div>
</template>
<script>
// import circularPanel from '@/components/intelligentOilfield/circular-panel/index.vue';
import bottomButton from '@/components/intelligentOilfield/bottom-button/index.vue';
import dataTransfer from '@/components/intelligentOilfield/data-transfer/index.vue';

export default {
  dicts: ['sys_app_type'],
  components: {
    // circularPanel,
    bottomButton,
    dataTransfer,
  },
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
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      openDialog: false,
      headerNameList: [
        { id: 0, name: '已选看板', isSelected: true },
        { id: 1, name: '未选看板', isSelected: false },
      ],
      linkUrl: '',
      activeName: 'professionalKanban',
      selectedList: [],
      allList: [],
    };
  },
  watch: {
    newWPx: {
      handler(newVal) {
        console.log('最新宽度11', newVal);
      },
      deep: true,
      immediate: true,
    },
    'componentItem.contentSetting': {
      handler(newVal) {
        if (newVal) {
          this.openDialog = newVal;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    // this.getInitData(this.activeName);
  },
  methods: {
    toClick(url) {
      const a = document.createElement('a')
      a.setAttribute('target', '_blank')
      a.setAttribute('href', url)
      a.click()
      a.remove()
    },
    // 改变数据
    changeData(selectedList, currentItem) {
      console.log('aa', selectedList, currentItem);
    },
    changeSource(item) {
      console.log('bb', item);
    },
    submitForm() {
      this.openDialog = false;
      this.$emit('changeContentSetting', false);
    },
    cancel() {
      // 将数据置为初始状态
      this.openDialog = false;
      this.$emit('changeContentSetting', false);
    },
    linkIframe(item) {
      this.linkUrl = item.url;
      this.$nextTick(() => {
        this.fullScreen();
      });
    },
    fullExit() {
      this.linkUrl = '';
      this.$store.commit('user/setProjectionMode', false);
      // var element= document.documentElement;//若要全屏页面中div，var element= document.getElementById("divID");
      const element = document.getElementById('fullScreen_panorama');
      // IE ActiveXObject
      if (window.ActiveXObject) {
        const WsShell = new window.ActiveXObject('WScript.Shell');
        WsShell.SendKeys('{F11}');
        // 写退出全屏后的执行函数
      }
      // HTML5 W3C 提议
      else if (element.requestFullScreen) {
        document.exitFullscreen();
        // 写退出全屏后的执行函数
      }
      // IE 11
      else if (element.msRequestFullscreen) {
        document.msExitFullscreen();
        // 写退出全屏后的执行函数
      }
      // Webkit (works in Safari5.1 and Chrome 15)
      else if (element.webkitRequestFullScreen) {
        document.webkitCancelFullScreen();
        // 写退出全屏后的执行函数
      }
      // Firefox (works in nightly)
      else if (element.mozRequestFullScreen) {
        document.mozCancelFullScreen();
        // 写退出全屏后的执行函数
      }
    },
    fullScreen() {
      // var element= document.documentElement; //若要全屏页面中div，var element= document.getElementById("divID");
      const element = document.getElementById('fullScreen_panorama');
      // IE 10及以下ActiveXObject
      if (window.ActiveXObject) {
        const WsShell = new window.ActiveXObject('WScript.Shell');
        WsShell.SendKeys('{F11}');
        // 写全屏后的执行函数
      }
      // HTML W3C 提议
      else if (element.requestFXullScreen) {
        element.requestFullScreen();
        // 写全屏后的执行函数
      }
      // IE11
      else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
        // 写全屏后的执行函数
      }
      // Webkit (works in Safari5.1 and Chrome 15)
      else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
        // 写全屏后的执行函数
      }
      // Firefox (works in nightly)
      else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
        // 写全屏后的执行函数
      }
    },
    getInitData(param) {
      this.selectedList = [];
      // 调用接口,param为传参
      if (param === 'professionalKanban') {
        this.selectedList = [
          {
            img: new URL(`../../../../assets/intelligentOilfield/kanban-dark.png`, import.meta.url),
            name: '注水看板',
            url: 'https://www.isqqw.com/#/homepage',
          },
          {
            img: new URL(`../../../../assets/intelligentOilfield/kanban-dark.png`, import.meta.url),
            name: '操纵看板',
            url: 'https://element.eleme.cn/#/zh-CN/component/installation',
          },
          {
            img: new URL(`../../../../assets/intelligentOilfield/kanban-dark.png`, import.meta.url),
            name: '设备看板',
            url: 'https://lbs.amap.com/api/loca-v2/api#viewcontrol',
          },
          {
            img: new URL(`../../../../assets/intelligentOilfield/kanban-dark.png`, import.meta.url),
            name: '报警看板',
            url: 'https://www.iconfont.cn/home/index?spm=a313x.7781069.1998910419.2',
          },
          {
            img: new URL(`../../../../assets/intelligentOilfield/kanban-dark.png`, import.meta.url),
            name: '自定义看板',
            url: 'https://ant.design/components/overview-cn',
          },
          {
            img: new URL(`../../../../assets/intelligentOilfield/kanban-dark.png`, import.meta.url),
            name: '自定义看板',
            url: 'https://www.isqqw.com/#/homepage',
          },
          {
            img: new URL(`../../../../assets/intelligentOilfield/kanban-dark.png`, import.meta.url),
            name: '自定义看板',
            url: 'https://element.eleme.cn/#/zh-CN/component/installation',
          },
        ];
      } else {
        this.selectedList = [
          {
            img: new URL(`../../../../assets/intelligentOilfield/kanban-dark.png`, import.meta.url),
            name: '注水看板',
            url: 'https://lbs.amap.com/api/loca-v2/api#viewcontrol',
          },
          {
            img: new URL(`../../../../assets/intelligentOilfield/kanban-dark.png`, import.meta.url),
            name: '操纵看板',
            url: 'https://www.iconfont.cn/home/index?spm=a313x.7781069.1998910419.2',
          },
        ];
      }
    },
    handleClick() {
      this.getInitData(this.activeName);
    },
  },
};
</script>

<style scoped>
.bottomBtn {
  position: absolute;
  bottom: 0;
  /* right: 0;
  font-size: 44px;
  color: red;
  z-index: 999999999909999; */
}
</style>
