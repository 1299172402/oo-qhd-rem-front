<!-- 后台——二级页面（平台设备监控和链路状态） -->
<template>
  <div class="g-w100 g-h100" style="font-size: 16px; color: #fff;">
    <el-dialog
      :title="dialogTitle"
      :visible.sync="openDialog"
      width="80vw"
      append-to-body
      :close-on-click-modal="false"
      custom-class="land-dialog"
      @close="clearSearchList"
    >
      <div style="height: 93%;padding-left: 13px;">
        <div style="margin-top: 20px;">
          <div class="g-row-flex-V">
            <div class="g-row-flex-V">
              <div>
                设备名称：
              </div>
              <div>
                <el-input
                  v-model="nameInput"
                  clearable
                  style="width: 220px;"
                  placeholder="请输入设备名称"
                />
              </div>
            </div>
            <div class="g-row-flex-V" style="margin: 0 20px;">
              <div>
                设备编号：
              </div>
              <div>
                <el-input
                  v-model="codeInput"
                  style="width: 220px;"
                  placeholder="请输入设备编号"
                  clearable
                />
              </div>
            </div>
            <div style="margin-left: 10px;">
              <el-button type="primary" class="buttonActive_primary" @click="handleQuery">
                搜索
              </el-button>
              <el-button class="commonBtn" @click="resetQuery">
                重置
              </el-button>
            </div>
          </div>
        </div>
        <div class="g-row-flex" style="flex-wrap: wrap; margin-top: 10px; overflow: scroll; height: 100%;align-content: flex-start;">
          <div
            v-for="(item, index) in searchList"
            :key="index"
            class="typeClass"
            style="margin-top: 20px;"
          >
            <div
              class="bgClass g-row-flex-V g-w100 g-h100"
              style="width: 170px;margin: 0 12px 0 0;padding-right: 18px;"
              :style="{
                background: $store.state.setting.mode === 'dark' ? 'rgba(0,169,159,0.3)' : 'rgba(44, 88, 118, 1)',
              }"
            >
              <div
                v-if="item.passStatus === '1'"
                class="circleStyle"
                :style="{ background: item.status == '1' ? '#32cd32' : 'red' }"
                style="flex-shrink: 0;"
              />
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.equipmentType + '-' + item.equipmentCode"
                placement="top"
              >
                <span
                  style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
                  :style="{ marginLeft: item.passStatus === '1' ? '0px' : '20px'}"
                >
                  {{ item.equipmentType }} -  {{ item.equipmentCode }}
                </span>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">
          关 闭
        </el-button>
      </div>
    </el-dialog>
    <page-panel
      :style="{width: headerTitle !== '链路状态' ? '100%' : '1642px'}"
      class="g-w100 g-column-flex"
      :header-title="headerTitle"
      style="height: calc(100% - 0px);"
    >
      <!-- 平台设备监控 -->
      <div v-show="headerTitle !== '链路状态'" class="g-w100 g-h100">
        <div
          style="height: 60px;"
          class="g-w100 g-row-flex-HV"
          :style="{ background: $store.state.setting.mode === 'dark' ? 'rgba(0,100,169,0.3)' : 'rgba(52,144,211,0.5)' }"
        >
          <div
            class="g-column-flex-HV"
            style="height: 44px; margin-right: 20px; position: relative;"
          >
            物联网平台
          </div>
        </div>
        <div style="height: calc(100% - 60px); position: relative; z-index: 0;padding: 75px 0 0 70px;overflow-y: scroll;overflow-x: hidden;" class="g-w100 g-row-flex">
          <div
            class="g-row-flex g-w100"
            style="align-content: flex-start;flex-wrap: wrap;height: 100%;"
            :style="{marginTop: '-38px'}"
          >
            <div
              v-for="(item, index) in platDevList"
              :key="index"
              class="g-column-flex-HV"
              style="width: 380px; height: 80px; position: relative; margin-top: -17px;"
            >
              <line-svg
                :linear-id="item.systemId"
                :start-color="item.linkState === '1' ? '#32cd32' : 'red'"
                :end-color="item.linkState === '1' ? '#32cd32' : 'red'"
                class="svgClass"
                style="top: 0;left: 0;margin-top: -20px;"
                svg-height="70px"
                :svg-width="svgWidth"
                set-points="130,60 80,60 80,-1"
              />
              <div
                class="bgClass g-row-flex-V g-w100 g-h100 typeClass"
                style="cursor: pointer;margin-top: 0;z-index: 0;width: 180px;margin-left: 62px;padding-right: 18px;"
                :style="{
                  background: $store.state.setting.mode === 'dark' ? 'rgba(0,169,159,0.3)' : 'rgba(44, 88, 118, 1)',
                }"
                @click="clickItem(item)"
              >
                <div
                  v-show="item.runningState"
                  class="circleStyle"
                  style="flex-shrink: 0;"
                  :style="{ background: item.runningState === '1' ? '#32cd32' : 'red' }"
                />
                <!-- TODO: Maybe change back -->
                <!-- <svg-icon
                  v-if="item.icon"
                  class="svgIconClass"
                  :icon-class="item.icon"
                  style="margin: 0 6px 0 16px;"
                /> -->
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="item.systemName"
                  placement="top"
                >
                  <span
                    style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
                    :style="{
                      marginLeft: item.runningState ? '0px' : '20px'
                    }"
                  >
                    {{ item.systemName }}
                  </span>
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 链路状态 -->
      <div v-show="headerTitle === '链路状态'" class="g-w100 g-h100 g-row-flex-HV">
        <div class="g-w100 g-h100 g-column-flex-V" style="margin-left: 200px;">
          <div
            class="pageGreen g-column-flex-HV"
            style="margin-right: 26px; height: 500px;"
            :style="{
              background: $store.state.setting.mode === 'dark' ? 'rgba(45,141,92,0.3)' : 'rgba(45,141,92,0.6)',
            }"
          >
            <div style="margin-bottom: 10px;">
              {{ parentSignList[0]?.[1] }}
            </div>

            <div class="g-column-flex-HV">
              <div class="greenBtn g-column-flex-HV" style="margin: 0 10px 5px;">
                {{ parentSignList[0]?.[1] }}
                <line-svg
                  :linear-id="parentSignList[0]?.[2]"
                  :start-color="parentSignList[0]?.[3] === '0' ? 'red' : '#32cd32'"
                  :end-color="parentSignList[0]?.[3] === '0' ? 'red' : '#32cd32'"
                  class="svgClass"
                  style="top: 0;left: 220px;margin-top: 0;background: green;"
                  svg-height="340px"
                  svg-width="736px"
                  set-points="0,25 700,25 700,325 736,325"
                />
              </div>
              <div class="greenBtn g-column-flex-HV" style="margin: 0 10px;">
                {{ initList[keys[0]]?.[0].terraceName }}
                <line-svg
                  :linear-id="initList[keys[0]]?.[0]?.terraceCode"
                  :start-color="initList[keys[0]]?.[0].terraceState === '0' ? 'red' : '#32cd32'"
                  :end-color="initList[keys[0]]?.[0].terraceState === '0' ? 'red' : '#32cd32'"
                  class="svgClass"
                  style="top: 0;left: 220px;margin-top: 0;"
                  svg-height="45px"
                  svg-width="736px"
                  set-points="0,25 700,25 700,26"
                />
              </div>
              <div class="greenBtn g-column-flex-HV" style="margin: 5px 10px;">
                {{ initList[keys[0]]?.[1].terraceName }}
                <line-svg
                  :linear-id="initList[keys[0]]?.[1]?.terraceCode"
                  :start-color="initList[keys[0]]?.[1].terraceState === '0' ? 'red' : '#32cd32'"
                  :end-color="initList[keys[0]]?.[1].terraceState === '0' ? 'red' : '#32cd32'"
                  class="svgClass"
                  style="top: 0;left: 220px;margin-top: 0;"
                  svg-height="45px"
                  svg-width="736px"
                  set-points="0,25 700,25 700,26"
                />
              </div>
              <div class="greenBtn g-column-flex-HV" style="margin: 0 10px;">
                {{ initList[keys[0]]?.[2].terraceName }}
                <line-svg
                  :linear-id="initList[keys[0]]?.[2]?.terraceCode"
                  :start-color="initList[keys[0]]?.[2].terraceState === '0' ? 'red' : '#32cd32'"
                  :end-color="initList[keys[0]]?.[2].terraceState === '0' ? 'red' : '#32cd32'"
                  class="svgClass"
                  style="top: 0;left: 220px;margin-top: 0;"
                  svg-height="45px"
                  svg-width="736px"
                  set-points="0,25 700,25 700,26"
                />
              </div>
              <div class="greenBtn g-column-flex-HV" style="margin: 5px 10px;">
                {{ initList[keys[0]]?.[3].terraceName }}
                <line-svg
                  :linear-id="initList[keys[0]]?.[3]?.terraceCode"
                  :start-color="initList[keys[0]]?.[3].terraceState === '0' ? 'red' : '#32cd32'"
                  :end-color="initList[keys[0]]?.[3].terraceState === '0' ? 'red' : '#32cd32'"
                  class="svgClass"
                  style="top: 0;left: 220px;margin-top: 0;"
                  svg-height="45px"
                  svg-width="736px"
                  set-points="0,25 700,25 700,26"
                />
              </div>
              <div class="greenBtn g-column-flex-HV" style="margin: 0 10px;">
                {{ initList[keys[0]]?.[4].terraceName }}
                <line-svg
                  :linear-id="initList[keys[0]]?.[4]?.terraceCode"
                  :start-color="initList[keys[0]]?.[4].terraceState === '0' ? 'red' : '#32cd32'"
                  :end-color="initList[keys[0]]?.[4].terraceState === '0' ? 'red' : '#32cd32'"
                  class="svgClass"
                  style="top: 0;left: 220px;margin-top: 0;"
                  svg-height="45px"
                  svg-width="736px"
                  set-points="0,25 700,25 700,26"
                />
              </div>
            </div>
          </div>
          <div
            class="pageGreen g-column-flex-HV"
            style="margin: 20px 26px 20px 0;height: 120px;"
            :style="{
              background: $store.state.setting.mode === 'dark' ? 'rgba(45,141,92,0.3)' : 'rgba(45,141,92,0.6)',
            }"
          >
            <div>
              {{ parentSignList[1]?.[1] }}
            </div>
            <div class="g-column-flex-HV">
              <div class="greenBtn g-column-flex-HV" style="margin: 0 10px;">
                {{ parentSignList[1]?.[1] }}
                <line-svg
                  :linear-id="parentSignList[1]?.[2]"
                  :start-color="parentSignList[1]?.[3] === '0' ? 'red' : '#32cd32'"
                  :end-color="parentSignList[1]?.[3] === '0' ? 'red' : '#32cd32'"
                  class="svgClass"
                  style="top: 0;left: 220px;margin-top: -2px;"
                  svg-height="45px"
                  svg-width="736px"
                  set-points="0,25 736,25 736,26"
                />
              </div>
              <!-- TODO: Maybe change back -->
              <!-- <div class="greenBtn g-column-flex-HV" style="margin: 0 10px">
                {{ initList[keys[1]]?.[0].terraceName }}
                <line-svg
                  :linear-id="initList[keys[1]]?.[0]?.terraceCode"
                  :start-color="initList[keys[1]]?.[0].terraceState === '0' ? 'red' : '#32cd32'"
                  :end-color="initList[keys[1]]?.[0].terraceState === '0' ? 'red' : '#32cd32'"
                  class="svgClass"
                  style="top: 0;left: 220px;margin-top: 0;"
                  svg-height="45px"
                  svg-width="736px"
                  set-points="0,25 700,25 700,26"
                />
              </div>
              <div class="greenBtn g-column-flex-HV" style="margin: 5px 10px">
                {{ initList[keys[1]]?.[1].terraceName }}
                <line-svg
                  :linear-id="initList[keys[1]]?.[1]?.terraceCode"
                  :start-color="initList[keys[1]]?.[1].terraceState === '0' ? 'red' : '#32cd32'"
                  :end-color="initList[keys[1]]?.[1].terraceState === '0' ? 'red' : '#32cd32'"
                  class="svgClass"
                  style="top: 0;left: 220px;margin-top: 0;"
                  svg-height="45px"
                  svg-width="736px"
                  set-points="0,25 700,25 700,26"
                />
              </div>
              <div class="greenBtn g-column-flex-HV" style="margin: 0 10px">
                {{ initList[keys[1]]?.[2].terraceName }}
                <line-svg
                  :linear-id="initList[keys[1]]?.[2]?.terraceCode"
                  :start-color="initList[keys[1]]?.[2].terraceState === '0' ? 'red' : '#32cd32'"
                  :end-color="initList[keys[1]]?.[2].terraceState === '0' ? 'red' : '#32cd32'"
                  class="svgClass"
                  style="top: 0;left: 220px;margin-top: 0;"
                  svg-height="45px"
                  svg-width="736px"
                  set-points="0,25 700,25 700,26"
                />
              </div> -->
            </div>
          </div>
          <div
            class="pageGreen g-column-flex-HV"
            style="margin: 0 26px 0 0; height: 550px;"
            :style="{
              background: $store.state.setting.mode === 'dark' ? 'rgba(45,141,92,0.3)' : 'rgba(45,141,92,0.6)',
            }"
          >
            <div style="margin-bottom: 10px;">
              {{ parentSignList[2]?.[1] }}
            </div>
            <div class="g-column-flex-HV">
              <div class="greenBtn g-column-flex-HV" style="margin: 0 10px 5px;">
                {{ parentSignList[2]?.[1] }}
                <line-svg
                  :linear-id="parentSignList[2]?.[2]"
                  :start-color="parentSignList[2]?.[3] === '0' ? 'red' : '#32cd32'"
                  :end-color="parentSignList[2]?.[3] === '0' ? 'red' : '#32cd32'"
                  class="svgClass"
                  style="top: 0;left: 220px;margin-top: 0;"
                  svg-height="45px"
                  svg-width="736px"
                  set-points="0,25 700,25 700,26"
                />
              </div>
              <div class="greenBtn g-column-flex-HV" style="margin: 0 10px;">
                {{ initList[keys[2]]?.[0].terraceName }}
                <line-svg
                  :linear-id="initList[keys[2]]?.[0]?.terraceCode"
                  :start-color="initList[keys[2]]?.[0].terraceState === '0' ? 'red' : '#32cd32'"
                  :end-color="initList[keys[2]]?.[0].terraceState === '0' ? 'red' : '#32cd32'"
                  class="svgClass"
                  style="top: 0;left: 220px;margin-top: 0;"
                  svg-height="45px"
                  svg-width="736px"
                  set-points="0,25 700,25 700,26"
                />
              </div>
              <div class="greenBtn g-column-flex-HV" style="margin: 5px 10px;">
                {{ initList[keys[2]]?.[1].terraceName }}
                <line-svg
                  :linear-id="initList[keys[2]]?.[1]?.terraceCode"
                  :start-color="initList[keys[2]]?.[1].terraceState === '0' ? 'red' : '#32cd32'"
                  :end-color="initList[keys[2]]?.[1].terraceState === '0' ? 'red' : '#32cd32'"
                  class="svgClass"
                  style="top: 0;left: 220px;margin-top: 0;"
                  svg-height="45px"
                  svg-width="736px"
                  set-points="0,25 700,25 700,26"
                />
              </div>
              <div class="greenBtn g-column-flex-HV" style="margin: 0 10px;position: relative;">
                {{ initList[keys[2]]?.[2].terraceName }}
                <line-svg
                  :linear-id="initList[keys[2]]?.[2]?.terraceCode"
                  :start-color="initList[keys[2]]?.[2].terraceState === '0' ? 'red' : '#32cd32'"
                  :end-color="initList[keys[2]]?.[2].terraceState === '0' ? 'red' : '#32cd32'"
                  class="svgClass"
                  style="top: 0;left: 220px;margin-top: 0;"
                  svg-height="45px"
                  svg-width="736px"
                  set-points="0,25 700,25 700,26"
                />
              </div>
              <div class="greenBtn g-column-flex-HV" style="margin: 5px 10px;position: relative;">
                {{ initList[keys[2]]?.[3].terraceName }}
                <line-svg
                  :linear-id="initList[keys[2]]?.[3]?.terraceCode"
                  :start-color="initList[keys[2]]?.[3].terraceState === '0' ? 'red' : '#32cd32'"
                  :end-color="initList[keys[2]]?.[3].terraceState === '0' ? 'red' : '#32cd32'"
                  class="svgClass"
                  style="top: 0;left: 220px;margin-top: 0;"
                  svg-height="45px"
                  svg-width="736px"
                  set-points="0,25 700,25 700,26"
                />
              </div>
              <div class="greenBtn g-column-flex-HV" style="margin: 0 10px;position: relative;">
                {{ initList[keys[2]]?.[4].terraceName }}
                <line-svg
                  :linear-id="initList[keys[2]]?.[4]?.terraceCode"
                  :start-color="initList[keys[2]]?.[4].terraceState === '0' ? 'red' : '#32cd32'"
                  :end-color="initList[keys[2]]?.[4].terraceState === '0' ? 'red' : '#32cd32'"
                  class="svgClass"
                  style="top: 0;left: 220px;margin-top: 0;"
                  svg-height="45px"
                  svg-width="736px"
                  set-points="0,25 700,25 700,26"
                />
              </div>
              <div class="greenBtn g-column-flex-HV" style="margin: 5px 10px;position: relative;">
                {{ initList[keys[2]]?.[5].terraceName }}
                <line-svg
                  :linear-id="initList[keys[2]]?.[5]?.terraceCode"
                  :start-color="initList[keys[2]]?.[5].terraceState === '0' ? 'red' : '#32cd32'"
                  :end-color="initList[keys[2]]?.[5].terraceState === '0' ? 'red' : '#32cd32'"
                  class="svgClass"
                  style="top: 0;left: 220px;margin-top: -318px;"
                  svg-height="355px"
                  svg-width="736px"
                  set-points="0,340 700,340 700,5 736,5"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="bgClass g-column-flex-HV"
          style="height: 244px; background: rgba(0, 100, 169, 0.3);
          margin-right: 240px; position: relative;width: 280px;margin-left: 62px;"
          :style="{ background: $store.state.setting.mode === 'dark' ? 'rgba(0,100,169,0.3)' : 'rgba(43, 143, 229, 1)' }"
        >
          物联网平台
        </div>
      </div>
    </page-panel>
  </div>
</template>

<script>
import lineSvg from "@/pages/intelligentOilfield/messageCenter/lineSvg.vue";
import { eqSystemListNoPage, searchEquipmentByLink, terraceState } from "@/api/intelligentOilfield/system/equipment";

export default {
  name: "Message",
  components: {
    lineSvg
  },
  data() {
    return {
      currentSystemId: "",
      dialogTitle: "",
      headerTitle: "FPSO平台设备状态",
      svgWidth: "400px",
      title: "",
      openDialog: false,
      platDevList: [],
      nameInput: "",
      codeInput: "",
      searchList: [],
      parentSignList: [],
      keys: [],
      initList: []
    };
  },
  mounted() {
    if (this.$route.query.pathName) {
      this.headerTitle = `${this.$route.query.pathName}设备状态`;
    } else {
      this.headerTitle = "链路状态";
    }
    this.getList();
  },
  methods: {
    getList() {
      this.platDevList = [];
      if (this.headerTitle === "链路状态") {
        terraceState().then(res => {
          this.initList = JSON.parse(JSON.stringify(res.data.data));
          Object.keys(this.initList).forEach(key => {
            this.parentSignList.push(key.split("-"));
            this.keys.push(key);
          });
          // TODO: Maybe change back
        //   console.log("initList===", this.initList);
        //   console.log("parentSignList===", this.parentSignList);
        //   console.log("keys===", this.keys);
        });
      } else {
        eqSystemListNoPage(this.$route.query.terraceId).then(res => {
          this.platDevList = res.data.data;
        });
      }
    },
    // 跳转设备维护
    handleToPage() {
      this.$router.push({ name: "Equipment" });
    },
    // 关闭
    submitForm() {
      this.openDialog = false;
      this.searchList = [];
      this.nameInput = "";
    },
    clearSearchList() {
      this.searchList = [];
      this.nameInput = "";
    },
    clickItem(val) {
      this.currentSystemId = val.systemId;
      const params = {
        systemId: this.currentSystemId,
        equipmentType: "",
        equipmentCode: ""
      };
      this.searchEquipment(params);
      this.dialogTitle = val.systemName;
      this.openDialog = true;
    },
    // 搜索封装
    searchEquipment(queryParams) {
      searchEquipmentByLink(queryParams).then(res => {
        this.searchList = res.data.data;
      });
    },
    // 搜索
    handleQuery() {
      const queryParams = {
        systemId: this.currentSystemId,
        equipmentType: this.nameInput,
        equipmentCode: this.codeInput
      };
      this.searchEquipment(queryParams);
    },
    // 重置
    resetQuery() {
      this.searchList = [];
      this.nameInput = "";
      this.codeInput = "";
      this.handleQuery();
    }
  }
};
</script>

<style scoped>
.svgClass {
  position: absolute;
  z-index: 0 !important;
}

.minPage {
  margin: 0;
}

.searchStyle {
  position: absolute;
  left: 8px;
  color: var(--light-blue-color);
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  z-index: 1;
}

.typeClass {
  height: 40px;
  position: relative;
}

.bgClass {
  background: rgba(0, 169, 159, 0.3);
  color: #fff;
  border-radius: 4px;
}

.titleStyle {
  width: 112px;
  height: 22px;
  font-size: 16px;
  font-family: AlibabaPuHuiTiB;
  color: #3aa4ed;
  line-height: 22px;
  text-align: center;
}

.circleStyle {
  width: 6px;
  height: 6px;
  background: #52c41a;
  border-radius: 6px;
  margin: 0 6px 0 16px;
}

.pageGreen {
  width: 300px;
  height: 200px;
  background: rgba(45, 141, 92, 0.3);
  border-radius: 4px;
}

.greenBtn {
  width: 220px;
  height: 37px;
  background: rgba(45, 141, 92, 0.6);
  border-radius: 4px;
  position: relative;
}

</style>