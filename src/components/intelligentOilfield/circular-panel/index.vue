<!--轮循面板组件-->
<template>
  <div v-loading="loading" class="g-w100 g-h100 panel">
    <!-- 非全屏展示 -->
    <el-carousel
      v-if="!$store.state.user.isMax"
      :style="{ '--container-height': containerHeight, height: '100%' }"
      trigger="click"
      :autoplay="false"
      arrow="never"
      indicator-position="outside"
    >
      <el-carousel-item
        v-for="(item1, index) in panelList"
        :key="index"
        class="g-row-flex"
        style="flex-wrap: wrap"
        :style="entranceType === 'UpperLower'?'':'align-content: flex-start;'"
      >
        <!-- eslint-disable -->
        <div v-for="(item2, index) in item1" :key="index + 200" class="g-column-flex-HV">
          <!-- <div class="panelImg"></div> -->
          <div class="g-column-flex-HV panelDiv" @click="jumpLink(item2, index)" v-if="entranceType === 'UpperLower'">
            <img :src="item2.img" alt="" style="width: 56px;height: 56px" v-if="item2.img"/>
             <!-- TODO: Maybe change back -->
            <!-- <span v-else style="width:60px;height:60px" class="thumbnail">{{item2.name[0]}}</span> -->
            <!-- 看板中心-圆形图片 -->
            <div v-if="!item2.img && modelName === 'kanban'" class="circleImage g-row-flex-HV" style="width: 56px;height: 56px">
                {{ item2.name[0] }}
            </div>
            <!-- 应用中心-方形图片 -->
            <div v-if="!item2.img && modelName === 'application'" class="squareImage g-row-flex-HV" style="width: 56px;height: 56px">
                {{ item2.name[0] }}
            </div>
            <div style="width: 68px;text-align: center;max-width: 68px;text-overflow: ellipsis;overflow: hidden;white-space: pre;" :title="item2.name" :style="{color:$store.state.setting.mode==='dark'?'#FFFFFF':'#606266'}">
              {{item2.name}}</div>
          </div>
          <!-- :class="index % 3 === 0 ? 'panelBlueColor' : index % 3 === 1 ? 'panelRedColor' : 'panelGreenColor'" -->
            <div v-else class="panelBg g-row-flex" :style="{color: $store.state.setting.mode === 'dark' ? '#fff' : '#51A1FF'}" @click="jumpLink(item2, index)">
                <!-- TODO: Maybe change back -->
                <!-- <a :href="item2.url" :id="'hrefText' + index" target="_blank" v-show="false">跳转</a>
                <div class="g-flex-row-HV textImageDiv">{{  item2.name }}</div> -->
                <div class="linkImage" style="margin-right: 10px;"></div>
                <div class="textImageDivNew"  :title="item2.name">{{ item2.name }}</div>
            </div>
        </div>
        <!-- eslint-disable -->
      </el-carousel-item>
    </el-carousel>
    <!-- 全屏展示 -->
    <div v-else class="g-w100 g-row-flex" style="flex-wrap: wrap;height: auto">
        <div v-for="(item, index) in panels" :key="'fullScreen_'+index" class="g-column-flex" style="margin-top: 5px">
            <div class="g-column-flex-H panelDiv" @click="jumpLink(item, index)" v-if="entranceType === 'UpperLower'">
                <img :src="item.img" alt="" style="width: 56px;height: 56px" v-if="item.img"/>
                <!-- <div v-else class="bgImage g-row-flex-HV" style="width: 56px;height: 56px">
                    {{ item.name[0] }}
                </div> -->
                <!-- 看板中心-圆形图片 -->
                <div v-if="!item.img && modelName === 'kanban'" class="circleImage g-row-flex-HV" style="width: 56px;height: 56px">
                    {{ item.name[0] }}
                </div>
                <!-- 应用中心-方形图片 -->
                <div v-if="!item.img && modelName === 'application'" class="squareImage g-row-flex-HV" style="width: 56px;height: 56px">
                    {{ item.name[0] }}
                </div>
                    <div style="width: 68px;text-align: center;max-width: 68px;text-overflow: ellipsis;overflow: hidden;white-space: pre;" :title="item.name" :style="{color:$store.state.setting.mode==='dark'?'#FFFFFF':'#606266'}">
                    {{item.name}}</div>
                </div>
            <!-- <div v-else class="panelBg g-row-flex-HV" @click="jumpLink(item, index)">
                <a :href="item.url" :id="'hrefText' + index" target="_blank" v-show="false">跳转</a>
                <div class="g-flex-row-HV textImageDiv">{{  item.name }}</div>
           </div> -->
            <el-tooltip  v-else effect="dark" :content="item.name" placement="bottom" >
            <div  class="panelBg g-row-flex" :style="{color: $store.state.setting.mode === 'dark' ? '#fff' : '#51A1FF'}" @click="jumpLink(item, index)" >
                <!-- TODO: Maybe change back -->
                <!-- <a :href="item.url" :id="'hrefText' + index" target="_blank" v-show="false">跳转</a>
                <div class="g-flex-row-HV textImageDiv">{{  item.name }}</div> -->
                <div class="linkImage" style="margin-right: 10px;"></div>
                <div class="textImageDivNew">{{ item.name }}</div>
            </div>
          </el-tooltip>
         </div>
        </div>
    </div>
  </div>
</template>
<script>
import { addAccessinfo } from "@/api/intelligentOilfield/system/user";
import jumpSupApp, { addTokenToUrl } from "@/utils/jumpSupApp.js";

export default {
  props: {
    panels: {
      type: Array,
      default() {
        return [];
      }
    },
    // 跳转类型
    jumpType: {
      type: String,
      default: "iframe"
    },
    // 入口类型, UpperLower:图片文本上下结构,Containment:图片文本包容结构
    entranceType: {
      type: String,
      default: "UpperLower"
    },
    // 模块名-可能不同模块名绑定字段不一样
    modelName: {
      type: String,
      default: "kanban"
    },
    // 缩放组件至某一宽度newWPx，目的是换展现形式
    changeNewPx: {
      type: Number,
      default: 464
    },
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
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      //   containerHeight: '100px',
      onePageNum: 0,
      panelList: [],
      currentWPX: this.changeNewPx
    };
  },
  computed: {
    containerHeight() {
      // if (this.entranceType === 'UpperLower') {
      //   return '120px';
      // }
      // return '120px';
      return "calc(100% - 32px)";
    }
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
      immediate: true
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
        const onePageNumW = this.entranceType === "UpperLower" ? parseInt((newVal.width - 23) / 76, 10) : parseInt((newVal.width - 23) / 200, 10);
        // 快捷入口蓝底白色版的:parseInt((newVal.height - 50 - 32 - 2 - 46) / 46, 10)
        const onePageNumH = this.entranceType === "UpperLower" ? parseInt((newVal.height - 50 - 64 - 2 - (newVal.name === "应用中心" ? 42 : 0)) / 88, 10) : parseInt((newVal.height - 50 - 32 - 2 - 38) / 32, 10);
        if (newVal.width && onePageNumW > 0 && newVal.height && onePageNumH > 0) {
          this.onePageNum = onePageNumW * onePageNumH;
          // console.log('最后个数'+newVal.name, this.onePageNum);
          for (let i = 0; i < this.panels.length; i += this.onePageNum) {
            this.panelList.push(this.panels.slice(i, i + this.onePageNum));
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 全屏展示链接, 未完不能全屏跳转！！！
    linkPage() {
      document.getElementById("hrefText").click();
    },
    jumpLink(item) {
      if (this.jumpType === "iframe") {
        this.$emit("linkIframe", item);
      } else if (this.modelName === "application") { // 应用中心
        // 内部跳转的逻辑
        const paramQuery = {
          appId: item.appId,
          appName: item.appName,
          userId: this.$store.getters["user/userDetail"].user.userId
        };
        addAccessinfo(paramQuery).then(() => {});
        jumpSupApp(item.appPcAccessUrl);
        // document.getElementById(`hrefText${index}`).click();
      } else if (this.modelName === "enter") { // 快捷入口
        window.open(addTokenToUrl(item.enterUrl), "_blank");
      }
    }
  }
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
  background: var(--dot-bg) !important;
}

.panel .el-carousel__container {
  height: var(--container-height);
}
</style>
<style scoped lang="less">
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel--horizontal {
  overflow-y: hidden;
}

.el-carousel__item {
  justify-content: flex-start;
}

.el-carousel__item:nth-child(2n) {
  /* background-color: #99a9bf; */
}

.el-carousel__item:nth-child(2n + 1) {
  /* background-color: #d3dce6; */
}

.panelDiv {
  padding: 0 8px;
  margin: 5px 0;
  cursor: pointer;
  font-size: 12px;
  font-family: PingFangSC-Medium, "PingFang SC";
  font-weight: 500;
  color: #909399;
  width: auto;
}

.panelBg {
  width: 196px;
  height: 30px;
  text-align: center;
  margin: 0 10px;
  cursor: pointer;
  font-size: 12px;
  font-family: PingFangSC-Medium, "PingFang SC";
  font-weight: 500;
  // TODO: Maybe change back

  /* background: url('../../../assets/intelligentOilfield/enterImage.png'); */
  border-radius: 2px;
  color: #51a1ff;
  // border: 1px solid #51a1ff;
}

.textImageDiv {
  font-size: 16px;
  font-family: "PingFangSC-Semibold, PingFang SC";

  /* font-weight: 600; */
  // color: #51a1ff;
  color: #fff;
}

.textImageDivNew {
  font-size: 14px;
  font-family: "PingFangSC-Semibold, PingFang SC";
  font-weight: 500;
  width: calc(100% - 26px);
  text-align: left;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 30px;
  word-break: break-all;
  /* stylelint-disable */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
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