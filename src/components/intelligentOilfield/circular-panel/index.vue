<!--轮循面板组件-->
<template>
  <div class="g-w100 g-h100 panel">
    <el-carousel :style="{ '--containerHeight': containerHeight, height: '100%' }" trigger="click" :autoplay="false"
      arrow="never" indicator-position="outside">
      <el-carousel-item v-for="(item1, index) in panelList" :key="index" class="g-row-flex" style="flex-wrap: wrap">
        <div class="g-column-flex-HV panelDiv" v-for="(item2, index) in item1" :key="index + 200">
          <!-- <div class="panelImg"></div> -->
          <div class="g-column-flex-HV" @click="jumpLink(item2, index)" v-if="entranceType === 'UpperLower'">
            <img :src="item2.img" alt="" style="width:60px;height:60px" />
            <div style="max-width:60px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;" :title="item2.name">
              {{
                item2.name }}</div>
          </div>
          <!-- :class="index % 3 === 0 ? 'panelBlueColor' : index % 3 === 1 ? 'panelRedColor' : 'panelGreenColor'" -->
          <div v-else class="panelBg g-row-flex-HV" @click="jumpLink(item2, index)">
            <a :href="item2.url" :id="'hrefText' + index" target="_blank" v-show="false">跳转</a>
            <div class="g-flex-row-HV textImageDiv">{{ item2.name }}</div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import { jumpToApplication } from '@/utils/thirdPartyInteraction.js';
import { addAccessinfo } from '@/api/intelligentOilfield/system/user';

export default {
  props: {
    panels: {
      type: Array,
      default() {
        return [];
      },
    },
    // 跳转类型
    jumpType: {
      type: String,
      default: 'iframe',
    },
    // 入口类型, UpperLower:图片文本上下结构,Containment:图片文本包容结构
    entranceType: {
      type: String,
      default: 'UpperLower',
    },
    // 模块名-可能不同模块名绑定字段不一样
    modelName: {
      type: String,
      default: 'kanban'
    },
    // 缩放组件至某一宽度newWPx，目的是换展现形式
    changeNewPx: {
      type: Number,
      default: 464,
    },
    height: {},
    currentResizeList: {
      type: Object,
      default: () => ({})
    },
    componentItem: {
      type: Object,
      default: () => ({
        height: 0,
        width: 0
      })
    },
  },
  data() {
    return {
      //   containerHeight: '100px',
      onePageNum: 0,
      panelList: [],
      currentWPX: this.changeNewPx,
    };
  },
  computed: {
    containerHeight() {
      // if (this.entranceType === 'UpperLower') {
      //   return '120px';
      // }
      // return '120px';
      return 'calc(100% - 32px)'
    },
  },
  watch: {
    panels: {
      handler(newVal) {
        this.panelList = [];
        if (this.onePageNum) {
          for (let i = 0; i < newVal.length; i += this.onePageNum) {
            this.panelList.push(newVal.slice(i, i + this.onePageNum));
          }
        }
      },
      deep: true,
      immediate: true,
    },
    // changeNewPx: {
    //   handler(newVal) {
    //     this.currentWPX = newVal;
    //     // console.log('最新宽度22', this.currentWPX);
    //     if (this.currentWPX !== 0) {
    //       this.onePageNum = parseInt((this.currentWPX - 42) / 80, 10);
    //       //   console.log('最后个数', this.onePageNum);
    //     }
    //     this.panelList = [];
    //     for (let i = 0; i < this.panels.length; i += this.onePageNum) {
    //       this.panelList.push(this.panels.slice(i, i + this.onePageNum));
    //     }
    //   },
    //   deep: true,
    //   immediate: true,
    // },
    componentItem: {
      handler(newVal) {
        // console.log(newVal)
        // console.log(parseInt((newVal.width - 42) / 80, 10))
        // console.log(parseInt((newVal.width - 42) / 80, 10))
        // console.log(this.entranceType)
        this.panelList = [];
        this.onePageNum = 0;
        // const onePageNumW = this.entranceType === 'UpperLower' ? parseInt((newVal.width - 42) / 80, 10) : parseInt((newVal.width - 42) / 124, 10);
        // const onePageNumH = this.entranceType === 'UpperLower' ? parseInt((newVal.height - 128) / 80, 10) : parseInt((newVal.height - 96) / 80, 10);
        const onePageNumW = this.entranceType === 'UpperLower' ? parseInt((newVal.width - 22) / 80, 10) : parseInt((newVal.width - 22) / 190, 10);
        const onePageNumH = this.entranceType === 'UpperLower' ? parseInt((newVal.height - 128) / 105, 10) : parseInt((newVal.height - 96) / 65, 10);
        if (newVal.width && onePageNumW > 0 && newVal.height && onePageNumH > 0) {
          this.onePageNum = onePageNumW * onePageNumH;
          // console.log('最后个数'+newVal.name, this.onePageNum);
          for (let i = 0; i < this.panels.length; i += this.onePageNum) {
            this.panelList.push(this.panels.slice(i, i + this.onePageNum));
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 全屏展示链接, 未完不能全屏跳转！！！
    linkPage() {
      document.getElementById('hrefText').click();
    },
    jumpLink(item) {
      if (this.jumpType === 'iframe') {
        this.$emit('linkIframe', item);
      } else if (this.modelName === 'application') { // 应用中心
        if (item.appType === '0') { // 内部跳转的逻辑
          const paramQuery = {
            appId: item.appId,
            appName: item.appName,
            userId: this.$store.getters['user/userDetail'].user.userId
          }
          addAccessinfo(paramQuery).then((response) => {
            console.log('asas', response);
          });
          jumpToApplication(item.appPcAccessUrl)
          // document.getElementById(`hrefText${index}`).click();
        }
      } else if (this.modelName === 'enter') { // 快捷入口
        jumpToApplication(item.enterUrl)
      }
    },
  },
};
</script>
<style>
.panel {
  position: relative;
  z-index: 0 !important;
}

.panel .el-carousel__button {
  width: 8px !important;
  height: 8px !important;
  border-radius: 7px !important;
}

.panel .el-carousel__indicators--outside button {
  background-color: #3f87bc !important;
}

.panel .el-carousel__container {
  height: var(--containerHeight);
}
</style>
<style scoped>
/* */
.panelImg {
  background-image: url('https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 50px;
  height: 50px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item {
  justify-content: space-around;
}

.el-carousel__item:nth-child(2n) {
  /* background-color: #99a9bf; */
}

.el-carousel__item:nth-child(2n + 1) {
  /* background-color: #d3dce6; */
}

.panelDiv {
  margin: 10px;
  cursor: pointer;

  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #909399;
}

.panelBg {
  width: 170px;
  height: 44px;
  text-align: center;
  line-height: 16px;
  padding: 0px 10px;
  background: url('../../../assets/intelligentOilfield/enterImage.png');
  color: #fff;
}

.textImageDiv {
  font-size: 16px;
  font-family: 'PingFangSC-Semibold, PingFang SC';
  /* font-weight: 600; */
  color: #FFFFFF;
}

.panelBlueColor {
  background: linear-gradient(to bottom, transparent, rgba(26, 103, 210, 0.6));
  border: 1px solid rgba(26, 103, 210, 1);
}

.panelRedColor {
  background: linear-gradient(to bottom, transparent, rgba(224, 96, 25, 0.6));
  border: 1px solid rgba(224, 96, 25, 1);
}

.panelGreenColor {
  background: linear-gradient(to bottom, transparent, rgba(1, 229, 194, 0.6));
  border: 1px solid rgba(1, 229, 194, 1);
}
</style>
