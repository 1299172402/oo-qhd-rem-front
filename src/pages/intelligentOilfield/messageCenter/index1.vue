<!-- 后台——消息中心首页 -->
<template>
  <div class="g-w100 g-h100" style="font-size: 16px; color: #fff">
    <page-panel-new class="g-w100 g-column-flex" style="height: calc(100% - 0px)">
      <div style="height: 73%; position: relative" class="g-column-flex-H">
        <el-button
          style="position: absolute; top: 0; left: 0"
          type="primary"
          size="mini"
          @click="handleToPage()"
        >
          信息维护
        </el-button>
        <div style="position: absolute; right: 0; color: var(--light-blue-color)">
          <!-- TODO: Maybe change back -->
          <!-- {{ $store.getters["user/tenantName"] }} -->
          秦皇岛作业公司
        </div>
        <div class="g-row-flex" style="margin-top: 40px">
          <div class="topPage1" style="position: relative" />
          <div class="topPage2" style="position: relative" />
          <div class="topPage3" style="position: relative" />
        </div>
        <div
          class="legend g-column-flex-HV"
          :style="{ background: $store.state.setting.mode === 'dark' ? 'rgba(0,96,166,0.3)' : '#e9f3fa' }"
        >
          <div
            v-for="(item, index) in rightLegend"
            :key="index"
            class="g-row-flex"
            style="margin-top: 15px"
            :style="{
              color: $store.state.setting.mode === 'dark' ? '#fff' : '#3490D3',
              marginTop: index === 0 ? '0px' : '15px',
            }"
          >
            <div class="legendText" style="text-align: right;">
              {{ item.startPoint }}
            </div>
            <div style="position: relative; width: 70px; margin: 0 10px;">
              <line-svg
                :linear-id="item.linkId"
                class="svgClass"
                :start-color="item.runningStatus === '0' ? 'red' : '#32cd32'"
                :end-color="item.runningStatus === '0' ? 'red' : '#32cd32'"
                style="left: 0%; top: 0%"
                div-stroke-width="6"
                ball-stroke-width="5"
                svg-width="70"
                svg-height="20"
                set-points="0,10 70,10 70,11"
              />
            </div>
            <div class="legendText" style="width: 100px">
              {{ item.endPoint }}
            </div>
          </div>
        </div>
        <div class="topImage" style="position: relative">
          <line-svg
            linear-id="liner1"
            start-color="#32cd32"
            end-color="#32cd32"
            class="svgClass"
            style="left: 50%"
            :div-stroke-width="divStrokeWidth"
            :ball-stroke-width="ballStrokeWidth"
            :svg-width="svgWidth"
            :svg-height="svgHeight"
            set-points="10,44 10,0 11,-1"
          />
        </div>
        <div class="topImage1" style="position: relative">
          <line-svg
            linear-id="liner2"
            start-color="#32cd32"
            end-color="#32cd32"
            class="svgClass"
            style="left: 50%"
            :div-stroke-width="divStrokeWidth"
            :ball-stroke-width="ballStrokeWidth"
            :svg-width="svgWidth"
            :svg-height="svgHeight"
            set-points="10,44 10,0 11,-1"
          />
        </div>
        <div class="centerImage" style="position: relative">
          <line-svg
            linear-id="liner3"
            class="svgClass"
            start-color="#32cd32"
            end-color="#32cd32"
            style="left: 50%"
            :div-stroke-width="divStrokeWidth"
            :ball-stroke-width="ballStrokeWidth"
            :svg-width="svgWidth"
            :svg-height="svgHeight"
            set-points="10,44 10,0 11,-1"
          />
          <line-svg
            linear-id="liner5"
            class="svgClass"
            start-color="#32cd32"
            end-color="#32cd32"
            style="left: 35%; top: 21%"
            :div-stroke-width="divStrokeWidth"
            :ball-stroke-width="ballStrokeWidth"
            svg-width="70"
            :svg-height="svgHeight"
            set-points="0,25 70,25 70,24"
          />
          <line-svg
            linear-id="liner5"
            class="svgClass"
            start-color="#32cd32"
            end-color="#32cd32"
            style="left: 57.8%; top: 21%"
            :div-stroke-width="divStrokeWidth"
            :ball-stroke-width="ballStrokeWidth"
            svg-width="70"
            :svg-height="svgHeight"
            set-points="0,25 70,25 70,24"
          />
        </div>
        <div class="bottomImage" style="position: relative">
          <line-svg
            linear-id="liner4"
            start-color="#32cd32"
            end-color="#32cd32"
            class="svgClass"
            style="left: 50%"
            :div-stroke-width="divStrokeWidth"
            :ball-stroke-width="ballStrokeWidth"
            :svg-width="svgWidth"
            :svg-height="svgHeight"
            set-points="10,44 10,0 11,-1"
          />
        </div>
      </div>
      <div style="height: 27%" class="bottomWaterBg g-row-flex">
        <div class="leftSystem g-w100 g-h100">
          <div class="g-w100" style="position: relative; margin-left: 45%; margin-top: 70px">
            <div
              :class="parentSignList[0]?.[3] === '0' ? 'redSign' : 'greenSign'"
              @click="parentJumpDetail(parentSignList[0]?.[0], parentSignList[0]?.[1])"
            >
              {{ parentSignList[0]?.[2] }}
            </div>
            <div
              :class="initList[keys[0]]?.[0]?.terraceState === '0' ? 'redSign' : 'greenSign'"
              style="position: absolute; left: 180px; top: -52px"
            >
              <span @click="jumpDetail(initList[keys[0]]?.[0])">{{ initList[keys[0]]?.[0]?.terraceCode }}</span>
              <line-svg
                :linear-id="initList[keys[0]]?.[0]?.terraceCode"
                :start-color="initList[keys[0]]?.[0]?.terraceState === '0' ? 'red' : '#32cd32'"
                :end-color="initList[keys[0]]?.[0]?.terraceState === '0' ? 'red' : '#32cd32'"
                class="svgClass"
                style="left: -180px; top: -20%"
                div-stroke-width="6"
                ball-stroke-width="5"
                svg-width="177px"
                svg-height="55px"
                set-points="177,25 25,25 25,55"
                @click-line="linkPage"
              />
            </div>
            <div
              :class="initList[keys[0]]?.[1]?.terraceState === '0' ? 'redSign' : 'greenSign'"
              style="position: absolute; left: -101px; top: 48px"
            >
              <span @click="jumpDetail(initList[keys[0]]?.[1])">{{ initList[keys[0]]?.[1]?.terraceCode }}</span>
              <line-svg
                :linear-id="initList[keys[0]]?.[1]?.terraceCode"
                :start-color="initList[keys[0]]?.[1]?.terraceState === '0' ? 'red' : '#32cd32'"
                :end-color="initList[keys[0]]?.[1]?.terraceState === '0' ? 'red' : '#32cd32'"
                class="svgClass"
                style="top: -10px; left: 60px"
                div-stroke-width="6"
                ball-stroke-width="5"
                svg-width="65px"
                svg-height="55px"
                set-points="0,25 58,25 58,0"
                @click-line="linkPage"
              />
            </div>
            <div
              :class="initList[keys[0]]?.[2]?.terraceState === '0' ? 'redSign' : 'greenSign'"
              style="position: absolute; left: 181px; top: 5px"
            >
              <span @click="jumpDetail(initList[keys[0]]?.[2])">{{ initList[keys[0]]?.[2]?.terraceCode }}</span>
              <line-svg
                :linear-id="initList[keys[0]]?.[2]?.terraceCode"
                :start-color="initList[keys[0]]?.[2]?.terraceState === '0' ? 'red' : '#32cd32'"
                :end-color="initList[keys[0]]?.[2]?.terraceState === '0' ? 'red' : '#32cd32'"
                class="svgClass"
                style="left: -127px; top: -11px"
                div-stroke-width="6"
                ball-stroke-width="5"
                svg-width="125px"
                svg-height="50px"
                set-points="125,27 0,27 0,26"
                @click-line="linkPage"
              />
            </div>
            <div
              :class="initList[keys[0]]?.[3]?.terraceState === '0' ? 'redSign' : 'greenSign'"
              style="position: absolute; left: -120px; top: -0"
            >
              <span @click="jumpDetail(initList[keys[0]]?.[3])">{{ initList[keys[0]]?.[3]?.terraceCode }}</span>
              <line-svg
                :linear-id="initList[keys[0]]?.[3]?.terraceCode"
                :start-color="initList[keys[0]]?.[3]?.terraceState === '0' ? 'red' : '#32cd32'"
                :end-color="initList[keys[0]]?.[3]?.terraceState === '0' ? 'red' : '#32cd32'"
                class="svgClass"
                style="top: -10px; left: 68px"
                div-stroke-width="6"
                ball-stroke-width="5"
                svg-width="52px"
                svg-height="55px"
                set-points="0,25 52,25 54,22"
                @click-line="linkPage"
              />
            </div>
            <div
              :class="initList[keys[0]]?.[4]?.terraceState === '0' ? 'redSign' : 'greenSign'"
              style="position: absolute; left: 151px; top: 59px"
            >
              <span @click="jumpDetail(initList[keys[0]]?.[4])">{{ initList[keys[0]]?.[4]?.terraceCode }}</span>
              <line-svg
                :linear-id="initList[keys[0]]?.[4]?.terraceCode"
                :start-color="initList[keys[0]]?.[4]?.terraceState === '0' ? 'red' : '#32cd32'"
                :end-color="initList[keys[0]]?.[4]?.terraceState === '0' ? 'red' : '#32cd32'"
                class="svgClass"
                style="left: -127px; top: -21px;"
                div-stroke-width="6"
                ball-stroke-width="5"
                svg-width="125px"
                svg-height="70px"
                set-points="125,40 10,40 10,0"
                @click-line="linkPage"
              />
            </div>
          </div>
        </div>
        <div class="centerSystem g-w100 g-h100">
          <div class="g-w100" style="position: relative; margin-left: 45%; margin-top: 70px">
            <div
              :class="parentSignList[1]?.[3] === '0' ? 'redSign' : 'greenSign'"
              @click="parentJumpDetail(parentSignList[1]?.[0], parentSignList[1]?.[1])"
            >
              {{ parentSignList[1]?.[2] }}
            </div>
            <!-- TODO: Maybe change back -->
            <!-- <div
              :class="initList[keys[1]]?.[0]?.terraceState === '0' ? 'redSign' : 'greenSign'"
              style="position: absolute; left: 180px; top: -52px"
            >
              <span @click="jumpDetail(initList[keys[1]]?.[0])">{{ initList[keys[1]]?.[0]?.terraceCode }}</span>
              <line-svg
                :linear-id="initList[keys[1]]?.[0]?.terraceCode"
                :start-color="initList[keys[1]]?.[0]?.terraceState === '0' ? 'red' : '#32cd32'"
                :end-color="initList[keys[1]]?.[0]?.terraceState === '0' ? 'red' : '#32cd32'"
                class="svgClass"
                style="left: -180px; top: -20%"
                div-stroke-width="6"
                ball-stroke-width="5"
                svg-width="177px"
                svg-height="55px"
                set-points="177,25 25,25 25,55"
                @click-line="linkPage"
              />
            </div>
            <div
              :class="initList[keys[1]]?.[1]?.terraceState === '0' ? 'redSign' : 'greenSign'"
              style="position: absolute; left: -100px; top: 48px"
            >
              <span @click="jumpDetail(initList[keys[1]]?.[1])">{{ initList[keys[1]]?.[1]?.terraceCode }}</span>
              <line-svg
                :linear-id="initList[keys[1]]?.[1]?.terraceCode"
                :start-color="initList[keys[1]]?.[1]?.terraceState === '0' ? 'red' : '#32cd32'"
                :end-color="initList[keys[1]]?.[1]?.terraceState === '0' ? 'red' : '#32cd32'"
                class="svgClass"
                style="top: -10px; left: 60px"
                div-stroke-width="6"
                ball-stroke-width="5"
                svg-width="90px"
                svg-height="55px"
                set-points="0,25 68,25 68,0"
                @click-line="linkPage"
              />
            </div>
            <div
              :class="initList[keys[1]]?.[2]?.terraceState === '0' ? 'redSign' : 'greenSign'"
              style="position: absolute; left: 161px; top: 49px"
            >
              <span @click="jumpDetail(initList[keys[1]]?.[2])">{{ initList[keys[1]]?.[2]?.terraceCode }}</span>
              <line-svg
                :linear-id="initList[keys[1]]?.[2]?.terraceCode"
                :start-color="initList[keys[1]]?.[2]?.terraceState === '0' ? 'red' : '#32cd32'"
                :end-color="initList[keys[1]]?.[2]?.terraceState === '0' ? 'red' : '#32cd32'"
                class="svgClass"
                style="left: -105px; top: -53px"
                div-stroke-width="6"
                ball-stroke-width="5"
                svg-width="100px"
                svg-height="100px"
                set-points="100,68 0,25 0,26"
                @click-line="linkPage"
              />
            </div> -->
          </div>
        </div>
        <div class="rightSystem g-w100 g-h100">
          <div class="g-w100" style="position: relative; margin-left: 45%; margin-top: 70px">
            <div
              :class="parentSignList[2]?.[3] === '0' ? 'redSign' : 'greenSign'"
              @click="parentJumpDetail(parentSignList[2]?.[0], parentSignList[2]?.[1])"
            >
              {{ parentSignList[2]?.[2] }}
            </div>
            <div
              :class="initList[keys[2]]?.[0]?.terraceState === '0' ? 'redSign' : 'greenSign'"
              style="position: absolute; left: 195px; top: -52px"
            >
              <span @click="jumpDetail(initList[keys[2]]?.[0])">{{ initList[keys[2]]?.[0]?.terraceCode }}</span>
              <line-svg
                :linear-id="initList[keys[2]]?.[0]?.terraceCode"
                :start-color="initList[keys[2]]?.[0]?.terraceState === '0' ? 'red' : '#32cd32'"
                :end-color="initList[keys[2]]?.[0]?.terraceState === '0' ? 'red' : '#32cd32'"
                class="svgClass"
                style="left: -180px; top: -20%"
                div-stroke-width="6"
                ball-stroke-width="5"
                svg-width="177px"
                svg-height="55px"
                set-points="177,25 25,25 25,55"
                @click-line="linkPage"
              />
            </div>
            <div
              :class="initList[keys[2]]?.[1]?.terraceState === '0' ? 'redSign' : 'greenSign'"
              style="position: absolute; left: -100px; top: 48px"
            >
              <span @click="jumpDetail(initList[keys[2]]?.[1])">{{ initList[keys[2]]?.[1]?.terraceCode }}</span>
              <line-svg
                :linear-id="initList[keys[2]]?.[1]?.terraceCode"
                :start-color="initList[keys[2]]?.[1]?.terraceState === '0' ? 'red' : '#32cd32'"
                :end-color="initList[keys[2]]?.[1]?.terraceState === '0' ? 'red' : '#32cd32'"
                class="svgClass"
                style="top: -10px; left: 70px"
                div-stroke-width="6"
                ball-stroke-width="5"
                svg-width="90px"
                svg-height="55px"
                set-points="0,25 58,25 58,0"
                @click-line="linkPage"
              />
            </div>
            <div
              :class="initList[keys[2]]?.[2]?.terraceState === '0' ? 'redSign' : 'greenSign'"
              style="position: absolute; left: 181px; top: 5px"
            >
              <span @click="jumpDetail(initList[keys[2]]?.[2])"> {{ initList[keys[2]]?.[2]?.terraceCode }}</span>
              <line-svg
                :linear-id="initList[keys[2]]?.[2]?.terraceCode"
                :start-color="initList[keys[2]]?.[2]?.terraceState === '0' ? 'red' : '#32cd32'"
                :end-color="initList[keys[2]]?.[2]?.terraceState === '0' ? 'red' : '#32cd32'"
                class="svgClass"
                style="left: -127px; top: -11px"
                div-stroke-width="6"
                ball-stroke-width="5"
                svg-width="125px"
                svg-height="50px"
                set-points="125,27 0,27 0,26"
                @click-line="linkPage"
              />
            </div>
            <div
              :class="initList[keys[2]]?.[3]?.terraceState === '0' ? 'redSign' : 'greenSign'"
              style="position: absolute; left: -120px; top: -0"
            >
              <span @click="jumpDetail(initList[keys[2]]?.[3])"> {{ initList[keys[2]]?.[3]?.terraceCode }}</span>
              <line-svg
                :linear-id="initList[keys[2]]?.[3]?.terraceCode"
                :start-color="initList[keys[2]]?.[3]?.terraceState === '0' ? 'red' : '#32cd32'"
                :end-color="initList[keys[2]]?.[3]?.terraceState === '0' ? 'red' : '#32cd32'"
                class="svgClass"
                style="top: -10px; left: 68px"
                div-stroke-width="6"
                ball-stroke-width="5"
                svg-width="52px"
                svg-height="55px"
                set-points="0,25 52,25 54,22"
                @click-line="linkPage"
              />
            </div>
            <div
              :class="initList[keys[2]]?.[4]?.terraceState === '0' ? 'redSign' : 'greenSign'"
              style="position: absolute; left: 160px; top: 59px"
            >
              <span @click="jumpDetail(initList[keys[2]]?.[4])"> {{ initList[keys[2]]?.[4]?.terraceCode }}</span>
              <line-svg
                :linear-id="initList[keys[2]]?.[4]?.terraceCode"
                :start-color="initList[keys[2]]?.[4]?.terraceState === '0' ? 'red' : '#32cd32'"
                :end-color="initList[keys[2]]?.[4]?.terraceState === '0' ? 'red' : '#32cd32'"
                class="svgClass"
                style="left: -127px; top: -21px;"
                div-stroke-width="6"
                ball-stroke-width="5"
                svg-width="125px"
                svg-height="70px"
                set-points="125,40 10,40 10,0"
                @click-line="linkPage"
              />
            </div>
            <div
              :class="initList[keys[2]]?.[5]?.terraceState === '0' ? 'redSign' : 'greenSign'"
              style="position: absolute; left: -110px; top: -50px"
            >
              <span @click="jumpDetail(initList[keys[2]]?.[5])"> {{ initList[keys[2]]?.[5]?.terraceCode }}</span>
              <line-svg
                :linear-id="initList[keys[2]]?.[5]?.terraceCode"
                :start-color="initList[keys[2]]?.[5]?.terraceState === '0' ? 'red' : '#32cd32'"
                :end-color="initList[keys[2]]?.[5]?.terraceState === '0' ? 'red' : '#32cd32'"
                class="svgClass"
                style="top: -10px; left: 70px"
                div-stroke-width="6"
                ball-stroke-width="5"
                svg-width="90px"
                svg-height="55px"
                set-points="0,25 58,25 58,55"
                @click-line="linkPage"
              />
            </div>
          </div>
        </div>
      </div>
    </page-panel-new>
  </div>
</template>

<script>
import lineSvg from "@/pages/intelligentOilfield/messageCenter/lineSvg.vue";
import { listByLike, terraceState } from "@/api/intelligentOilfield/system/equipment";

export default {
  name: "Message",
  components: {
    lineSvg
  },
  data() {
    return {
      rightLegend: [],
      divStrokeWidth: "15",
      ballStrokeWidth: "11",
      svgWidth: "135px",
      svgHeight: "44px",
      parentSignList: [],
      keys: [],
      initList: []
    };
  },
  created() {
    this.getStatus();
  },
  methods: {
    linkPage() {
      this.$router.push({ name: "platFormEquMon", params: { platName: "链路状态" }});
    },
    jumpDetail(obj) {
      this.$router.push({
        name: "platFormEquMon",
        params: { platName: obj.terraceName },
        query: { pathName: obj.terraceName, terraceId: obj.terraceId }
      });
    },
    parentJumpDetail(terraceId, terraceName) {
      this.$router.push({
        name: "platFormEquMon",
        params: { platName: terraceName },
        query: { pathName: terraceName, terraceId: terraceId }
      });
    },
    // 跳转设备维护
    handleToPage() {
      this.$router.push({ name: "Equipment" });
    },
    // 获取状态
    getStatus() {
      this.parentSignList = [];
      listByLike().then(res => {
        this.rightLegend = res.data.data;
      });
      terraceState().then(res => {
        this.initList = res.data.data;
        Object.keys(this.initList).forEach(key => {
          this.parentSignList.push(key.split("-"));
          this.keys.push(key);
        });
        // 编号-名称-code-状态
      });
    }
  }
};
</script>

<style scoped>
.minPage {
  margin: 0;
}

.redSign {
  width: fit-content;
  padding: 0 10px;
  height: 40px;
  line-height: 40px;
  border: 2px solid red;
  color: #fff;
  border-radius: 10px;
  background: rgba(21, 43, 62, 1);
  cursor: pointer;
}

.greenSign {
  width: fit-content;
  padding: 0 10px;
  height: 40px;
  line-height: 40px;
  border: 2px solid var(--light-blue-color);
  color: #fff;
  border-radius: 10px;
  background: rgba(21, 43, 62, 1);
  cursor: pointer;
}

.legend {
  height: 155px;
  background: #e9f3fa;
  position: absolute;
  right: 0;
  top: 136px;
}

.legendText {
  font-size: 18px;
  font-family: PingFangSC-Medium, "PingFang SC";
  font-weight: 500;
  width: 92px;
}

.svgClass {
  top: 100%;
  z-index: 0 !important;
  cursor: pointer;
}

.topPage1 {
  background: url("@/assets/intelligentOilfield/topPage1.png");
  background-size: 100% 100%;
  width: 224px;
  height: 80px;
}

.topPage2 {
  background: url("@/assets/intelligentOilfield/topPage2.png");
  background-size: 100% 100%;
  width: 224px;
  height: 80px;
  margin: 0 153px;
}

.topPage3 {
  background: url("@/assets/intelligentOilfield/topPage3.png");
  background-size: 100% 100%;
  width: 224px;
  height: 80px;
}

.topImage {
  background: url("@/assets/intelligentOilfield/topBg4.png");
  background-size: 100% 100%;
  width: 490px;
  height: 40px;
  margin-top: 20px;
}

.topImage1 {
  background: url("@/assets/intelligentOilfield/topBg2-text.png");
  background-size: 100% 100%;
  width: 750px;
  height: 60px;
  margin-top: 2%;
}

.centerImage {
  background: url("@/assets/intelligentOilfield/topBg3.png");
  background-size: 100% 100%;
  width: 980px;
  height: 76px;
  margin-top: 2%;
}

.bottomImage {
  background: url("@/assets/intelligentOilfield/topBg1.png");
  background-size: 100% 100%;
  width: 1280px;
  height: 100px;
  margin-top: 2%;
}

.bottomWaterBg {
  background: url("@/assets/intelligentOilfield/bottomBg.png");
  background-size: 100% 100%;
  width: 100%;
  height: 266px;
  position: relative;
}

.leftSystem {
  left: 30px;
  top: 20px;
  z-index: 0;
  width: 33%;
  height: 100%;
}

.centerSystem {
  left: 530px;
  top: 20px;
  z-index: 0;
  width: 33%;
  height: 100%;
}

.rightSystem {
  left: 1000px;
  top: 20px;
  z-index: 0;
  width: 33%;
  height: 100%;
}
</style>