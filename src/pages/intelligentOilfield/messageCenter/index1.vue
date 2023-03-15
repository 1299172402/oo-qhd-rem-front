<!-- 后台——消息中心 -->
<template>
  <div class="g-w100 g-h100 g-column-flex" style="font-size: 16px; color: #fff">
    <el-dialog
      :title="title"
      :visible.sync="openDialog"
      width="700px"
      append-to-body
      :close-on-click-modal="false"
      @close="clesrSearchList"
    >
      <div>
        <div class="g-row-flex-V" v-if="this.dialogType !== '搜索' && this.dialogType !== 'Flink集群'">
          <div style="margin-right: 10px">平台类型：</div>
          <div>
            <el-select v-model="indicatorSource" placeholder="请选择平台" @change="changeSource" clearable>
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </div>
        </div>
        <div style="margin-top: 20px">
          <el-tabs v-model="activeName" class="g-pageHeader" v-if="this.dialogType !== '搜索'" @tab-click="handleClick">
            <el-tab-pane v-for="(item, index2) in tabsList" :label="item.title" :name="item.title" :key="index2">
            </el-tab-pane>
          </el-tabs>
          <div class="g-row-flex-V">
            <div class="g-row-flex-V">
              <div style="margin-right: 10px">设备名称：</div>
              <div>
                <el-input v-model="nameInput" style="width: 150px" placeholder="请输入设备名称"></el-input>
              </div>
            </div>
            <div class="g-row-flex-V" style="margin: 0 10px">
              <div style="margin-right: 10px">设备状态：</div>
              <div>
                <el-select
                  style="width: 150px"
                  v-model="statusModel"
                  placeholder="请选择设备状态"
                  @change="changeStatusSource"
                  clearable
                >
                  <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div>
              <el-button type="primary" class="buttonActive_primary" @click="handleQuery">搜索</el-button>
              <el-button class="commonBtn" @click="resetQuery">重置</el-button>
            </div>
          </div>
        </div>
        <div class="g-row-flex-V" style="flex-wrap: wrap; margin-top: 10px">
          <div class="typeClass" v-for="(item, index) in searchList" :key="index">
            <div
              class="bgClass g-row-flex-V g-w100 g-h100"
              style="width: 170px; cursor: pointer"
              @click="clickItem(item, '工作项')"
              :style="{
                background: $store.state.setting.mode === 'dark' ? 'rgba(0,169,159,0.3)' : 'rgba(0,169,159,0.5)',
              }"
            >
              <div class="circleStyle" :style="{ background: item.status == 1 ? '#309800' : '#FF4D4F' }"></div>
              {{ item.equipmentName }}
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">关 闭</el-button>
      </div>
    </el-dialog>
    <div
      style="height: 63.19px; position: relative; display: flex; justify-content: space-between"
      class="g-row-flex-V"
    >
      <i class="el-icon-search searchStyle" @click="clickItem(input, '搜索')"></i>
      <el-input prefix-icon="aa" v-model="input" style="width: 400px" placeholder="请输入检索项目"></el-input>
      <el-button type="primary" plain size="mini" @click="handleToPage()">设备维护</el-button>
    </div>
    <div
      style="height: 728.8px; position: relative"
      :style="{ marginTop: isFullScreen ? '25px' : '5px' }"
      class="g-row-flex"
    >
      <div style="height: calc(100% - 0px)" class="g-column-flex leftBgStyle">
        <div
          style="margin: 10px 0 0 20px; font-weight: 700"
          :style="{ color: $store.state.setting.mode === 'dark' ? '#fff' : 'var(--onlyLightBlueColor)' }"
        >
          边端数据链路
        </div>
        <div class="g-w100 g-h100">
          <!-- I平台 -->
          <div style="height: 33%; position: relative; z-index: 1" class="g-row-flex-V">
            <div
              class="titleStyle"
              :style="{ color: $store.state.setting.mode === 'dark' ? '#3AA4ED' : 'var(--onlyLightBlueColor)' }"
            >
              I平台
            </div>
            <div
              class="g-row-flex-V"
              style="justify-content: space-between; width: 540px; height: 90%; border: 1px dashed #979797"
            >
              <div class="g-column-flex-V" style="height: calc(100% - 30px); position: relative">
                <div class="typeClass g-row-flex-V" v-for="(item, index) in resultIptList" :key="index" style="">
                  <div
                    class="bgClass g-row-flex-V g-w100 g-h100"
                    style="cursor: pointer"
                    :style="{
                      background: $store.state.setting.mode === 'dark' ? 'rgba(0,169,159,0.3)' : 'rgba(0,169,159,0.5)',
                    }"
                    @click="clickItem(item, '工作项')"
                  >
                    <div class="circleStyle" :style="{ background: item.isGreen ? '#309800' : '#FF4D4F' }"></div>
                    <svg-icon v-if="item.icon" class="svgIconClass" :icon-class="item.icon" style="margin-right: 6px" />
                    {{ item.name }}
                  </div>
                  <lineSvg
                    style="top: 5px"
                    :setPoints="
                      index === 0
                        ? topLine
                        : index === 1
                        ? '0,20 180,20 180,19 180,30 258,30'
                        : index === 2
                        ? '0,20 180,20 180,19 180,5 258,5'
                        : ''
                    "
                  >
                  </lineSvg>
                  <lineSvg style="top: -27px" v-if="index === 3" :setPoints="bottomLine"></lineSvg>
                </div>
              </div>
              <div
                class="bgClass g-column-flex-HV"
                style="height: 44px; background: rgba(0, 100, 169, 0.3); margin-right: 20px; position: relative"
                :style="{ background: $store.state.setting.mode === 'dark' ? 'rgba(0,100,169,0.3)' : '#183C5B' }"
              >
                物联网平台
                <lineSvg
                  style="left: 120px; top: 0px"
                  svgWidth="206px"
                  :svgHeight="wwLink"
                  setPoints="0,20 200,20 200,263 "
                ></lineSvg>
              </div>
            </div>
            <div class="absoulteDiv">
              <div
                class="bgClass g-row-flex-V g-w100 g-h100"
                style="cursor: pointer"
                :style="{
                  background: $store.state.setting.mode === 'dark' ? 'rgba(0,169,159,0.3)' : 'rgba(0,169,159,0.5)',
                }"
                @click="clickItem(lastIpt[0], '工作项')"
              >
                <div class="circleStyle" :style="{ background: lastIpt[0].isGreen ? '#309800' : '#FF4D4F' }"></div>
                {{ lastIpt[0].name }}
              </div>
              <lineSvg style="left: 70px; top: 30px" svgWidth="70px" :setPoints="verticalLine"></lineSvg>
            </div>
          </div>
          <!-- J平台 -->
          <div style="height: 33%; position: relative" class="g-row-flex-V">
            <div
              class="titleStyle"
              :style="{ color: $store.state.setting.mode === 'dark' ? '#3AA4ED' : 'var(--onlyLightBlueColor)' }"
            >
              J平台
            </div>
            <div
              class="g-row-flex-V"
              style="justify-content: space-between; width: 540px; height: 90%; border: 1px dashed #979797"
            >
              <div class="g-column-flex-V" style="height: calc(100% - 30px)">
                <div
                  class="typeClass g-row-flex-V"
                  v-for="(item, index2) in initJptList"
                  :key="index2"
                  style="position: relative"
                >
                  <div
                    class="bgClass g-row-flex-V g-w100 g-h100"
                    style="cursor: pointer"
                    :style="{
                      background: $store.state.setting.mode === 'dark' ? 'rgba(0,169,159,0.3)' : 'rgba(0,169,159,0.5)',
                    }"
                    @click="clickItem(item, '工作项')"
                  >
                    <div class="circleStyle" :style="{ background: item.isGreen ? '#309800' : '#FF4D4F' }"></div>
                    <svg-icon v-if="item.icon" class="svgIconClass" :icon-class="item.icon" style="margin-right: 6px" />
                    {{ item.name }}
                  </div>
                  <lineSvg
                    style="top: 5px; z-index: 0"
                    :setPoints="
                      index2 === 0
                        ? topLine
                        : index2 === 1
                        ? '0,20 180,20 180,19 180,30 258,30'
                        : index2 === 2
                        ? '0,20 180,20 180,19 180,5 258,5'
                        : ''
                    "
                  >
                  </lineSvg>
                  <lineSvg style="top: -27px; z-index: 0" v-if="index2 === 3" :setPoints="bottomLine"></lineSvg>
                </div>
              </div>
              <div
                class="bgClass g-column-flex-HV"
                style="
                  height: 44px;
                  background: rgba(0, 100, 169, 0.3);
                  margin-right: 20px;
                  z-index: 0;
                  position: relative;
                "
                :style="{ background: $store.state.setting.mode === 'dark' ? 'rgba(0,100,169,0.3)' : '#183C5B' }"
              >
                物联网平台
                <lineSvg
                  style="left: 120px; top: 0px"
                  svgWidth="155px"
                  svgHeight="50px"
                  setPoints="0,23 155,23 155,21 "
                >
                </lineSvg>
                <lineSvg style="left: 395px; top: 0px" svgWidth="58px" svgHeight="50px" setPoints="0,23 58,23 58,22 ">
                </lineSvg>
                <lineSvg
                  style="left: 330px; top: 50px"
                  svgWidth="105px"
                  svgHeight="266px"
                  :setPoints="wtLine"
                ></lineSvg>
              </div>
            </div>
          </div>
          <!-- FPSO平台 -->
          <div style="height: 33%; position: relative" class="g-row-flex-V">
            <div
              class="titleStyle"
              :style="{ color: $store.state.setting.mode === 'dark' ? '#3AA4ED' : 'var(--onlyLightBlueColor)' }"
            >
              FPSO平台
            </div>
            <div
              class="g-row-flex-V"
              style="justify-content: space-between; width: 540px; height: 90%; border: 1px dashed #979797"
            >
              <div class="g-column-flex-V" style="height: calc(100% - 30px)">
                <div class="typeClass g-row-flex-V" v-for="(item, index3) in resultFPSOptList" :key="index3">
                  <div
                    class="bgClass g-row-flex-V g-w100 g-h100"
                    :style="{
                      background: $store.state.setting.mode === 'dark' ? 'rgba(0,169,159,0.3)' : 'rgba(0,169,159,0.5)',
                    }"
                    style="cursor: pointer"
                    @click="clickItem(item, '工作项')"
                  >
                    <div class="circleStyle" :style="{ background: item.isGreen ? '#309800' : '#FF4D4F' }"></div>
                    <svg-icon v-if="item.icon" class="svgIconClass" :icon-class="item.icon" style="margin-right: 6px" />
                    {{ item.name }}
                  </div>
                  <lineSvg
                    style="top: 5px; z-index: 0"
                    :setPoints="
                      index3 === 0
                        ? topLine
                        : index3 === 1
                        ? '0,20 180,20 180,19 180,30 258,30'
                        : index3 === 2
                        ? '0,20 180,20 180,19 180,5 258,5'
                        : ''
                    "
                  >
                  </lineSvg>
                  <lineSvg style="top: -27px; z-index: 0" v-if="index3 === 3" :setPoints="bottomLine"></lineSvg>
                </div>
              </div>
              <div
                class="bgClass g-column-flex-HV"
                style="
                  height: 44px;
                  background: rgba(0, 100, 169, 0.3);
                  margin-right: 20px;
                  z-index: 0;
                  position: relative;
                "
                :style="{ background: $store.state.setting.mode === 'dark' ? 'rgba(0,100,169,0.3)' : '#183C5B' }"
              >
                物联网平台
                <lineSvg
                  style="left: 120px"
                  :style="{ top: wwlinkTop }"
                  svgWidth="206px"
                  :svgHeight="wwLink"
                  :setPoints="wwLinkLine"
                ></lineSvg>
              </div>
            </div>
            <div class="absoulteDiv">
              <div
                class="bgClass g-row-flex-V g-w100 g-h100"
                style="cursor: pointer; position: relative; z-index: 1"
                :style="{
                  background: $store.state.setting.mode === 'dark' ? 'rgba(0,169,159,0.3)' : 'rgba(0,169,159,0.5)',
                }"
                @click="clickItem(lastFPSOpt[0], '工作项')"
              >
                <div class="circleStyle" :style="{ background: lastFPSOpt[0].isGreen ? '#309800' : '#FF4D4F' }"></div>
                {{ lastFPSOpt[0].name }}
              </div>
              <lineSvg style="left: 70px; top: 30px; z-index: 0" svgWidth="70px" :setPoints="verticalLine"></lineSvg>
            </div>
          </div>
        </div>
        <div style="margin: 0px 0 20px 112px; font-size: 14px" class="g-row-flex-V">
          <div class="circleStyle" style="background: #309800"></div>
          <div :style="{ color: $store.state.setting.mode === 'dark' ? '#fff' : '#909399' }">数据服务正常</div>
          <div class="circleStyle" style="background: #ff4d4f"></div>
          <div :style="{ color: $store.state.setting.mode === 'dark' ? '#fff' : '#909399' }">数据服务异常</div>
        </div>
      </div>
      <div style="height: calc(100% - 0px)" class="g-column-flex rightBgStyle">
        <div
          style="margin: 10px 0 0 20px; font-weight: 700"
          :style="{ color: $store.state.setting.mode === 'dark' ? '#fff' : 'var(--onlyLightBlueColor)' }"
        >
          云端数据链路
        </div>
        <div class="g-row-flex-V g-h100 g-w100">
          <div class="g-column-flex-HV g-h100" style="width: 22%">
            <div
              class="g-column-flex-HV"
              style="width: 120px; border-radius: 4px; height: 44px; background: rgba(0, 100, 169, 0.3)"
              :style="{ background: $store.state.setting.mode === 'dark' ? 'rgba(0,100,169,0.3)' : '#183C5B' }"
            >
              物联网平台
            </div>
          </div>
          <div style="width: 78%" class="g-h100 g-column-flex">
            <div class="g-row-flex-V" style="height: 30%; position: relative">
              <div
                class="pageGreen g-column-flex-HV"
                style="margin-right: 26px"
                :style="{
                  background: $store.state.setting.mode === 'dark' ? 'rgba(45,141,92,0.3)' : 'rgba(45,141,92,0.6)',
                }"
              >
                <div style="margin-bottom: 10px">页面</div>
                <div class="greenBtn g-column-flex-HV">报警及实时数据展示</div>
              </div>
              <lineSvg
                style="left: 20px; z-index: 0"
                svgWidth="135px"
                :style="{ top: fyLinkTop }"
                :svgHeight="fyLinkHeight"
                :setPoints="fyPoint"
              ></lineSvg>
              <lineSvg
                style="left: 20px; z-index: 0"
                svgWidth="300px"
                :style="{ top: fyLinkTop }"
                :svgHeight="fyLinkHeight"
                setPoints="65,20 295,20 295,0"
              ></lineSvg>
              <lineSvg
                style="left: 255px; z-index: 0"
                svgWidth="400px"
                :style="{ top: fyLinkTop }"
                :svgHeight="fyLinkHeight"
                setPoints="65,20 175,20 175,0"
              ></lineSvg>
              <lineSvg
                style="left: 335px; z-index: 0"
                svgWidth="400px"
                :style="{ top: fyLinkTop }"
                :svgHeight="fyLinkHeight"
                setPoints="100,20 215,20 215,0"
              ></lineSvg>

              <div
                class="menOrange g-column-flex-HV"
                :style="{
                  background: $store.state.setting.mode === 'dark' ? 'rgba(211,90,32,0.3)' : 'rgba(211,90,32,0.6)',
                }"
              >
                <div class="g-column-flex-HV" style="margin-bottom: 10px">门户</div>
                <div class="g-row-flex-HV">
                  <div class="orangeBtn g-column-flex-HV" style="width: 100px">站内信</div>
                  <div class="orangeBtn g-column-flex-HV" style="width: 80px; margin: 0 20px">邮件</div>
                  <div class="orangeBtn g-column-flex-HV">边端云同步</div>
                </div>
              </div>
            </div>
            <div class="g-row-flex-V" style="height: 40%">
              <div class="g-column-flex" style="margin: 0 159px 120px 20px; position: relative">
                <div
                  class="blueBtn g-column-flex-HV"
                  style="width: 140px; margin-bottom: 77px; cursor: pointer"
                  @click="clickItem('', 'Flink集群')"
                  :style="{ background: $store.state.setting.mode === 'dark' ? 'rgba(36,222,255,0.5)' : '#085296' }"
                >
                  Flink集群
                </div>
                <lineSvg
                  style="left: 0px; top: 44px; z-index: 0"
                  svgWidth="135px"
                  svgHeight="78px"
                  setPoints="65,77 65,0 64,0"
                ></lineSvg>
                <lineSvg
                  style="left: 140px; top: 0px; z-index: 0"
                  svgWidth="155px"
                  svgHeight="78px"
                  setPoints="0,23 155,23 155,22"
                ></lineSvg>
                <lineSvg
                  style="left: 140px; top: 23px; z-index: 0"
                  svgWidth="155px"
                  svgHeight="78px"
                  setPoints="77,0 77,70 155,70"
                ></lineSvg>
                <lineSvg
                  style="left: 140px; top: 96px; z-index: 0"
                  svgWidth="155px"
                  svgHeight="78px"
                  setPoints="77,0 77,70 155,70"
                ></lineSvg>
                <div
                  class="blueBtn g-column-flex-HV"
                  style="width: 140px"
                  :style="{ background: $store.state.setting.mode === 'dark' ? 'rgba(36,222,255,0.5)' : '#085296' }"
                >
                  Kafks集群
                </div>
              </div>
              <div
                class="blueBg g-column-flex-HV"
                :style="{
                  background: $store.state.setting.mode === 'dark' ? 'rgba(36,222,255,0.2)' : 'rgba(8,82,150,0.3)',
                }"
              >
                <div
                  class="blueBtn g-row-flex-HV"
                  style="width: 154px"
                  :style="{ background: $store.state.setting.mode === 'dark' ? 'rgba(36,222,255,0.5)' : '#085296' }"
                >
                  <!-- <img class="dataBase" src="../../../assets/intelligentOilfield/dataBase.png" alt=""
                      style="margin-right: 3px" /> -->
                  <svg-icon class="svgIconClass" icon-class="data" style="margin-right: 6px" />
                  King Base
                </div>
                <div
                  class="blueBtn g-row-flex-HV"
                  style="width: 154px; margin: 20px 0"
                  :style="{ background: $store.state.setting.mode === 'dark' ? 'rgba(36,222,255,0.5)' : '#085296' }"
                >
                  <!-- <img class="dataBase" src="../../../assets/intelligentOilfield/dataBase.png" alt=""
                      style="margin-right: 3px" /> -->
                  <svg-icon class="svgIconClass" icon-class="data" style="margin-right: 6px" />
                  Redis应用层
                </div>
                <div
                  class="g-column-flex-HV blueBtn"
                  style="width: 154px; height: 144px"
                  :style="{ background: $store.state.setting.mode === 'dark' ? 'rgba(36,222,255,0.5)' : '#085296' }"
                >
                  <div class="g-row-flex-H" style="height: 44px">
                    <!-- <img class="dataBase" src="../../../assets/intelligentOilfield/dataBase.png" alt=""
                        style="margin-right: 3px" /> -->
                    <svg-icon class="svgIconClass" icon-class="data" style="margin-right: 6px" />
                    Clickhouse
                  </div>
                  <div class="yellowText">应用层</div>
                  <div class="yellowText" style="margin: 5px 0">聚合层</div>
                  <div class="yellowText">明细层</div>
                </div>
              </div>
            </div>
            <div class="g-row-flex-V" style="height: 30%">
              <div
                style="width: 386px; height: 119px"
                class="blueBg g-row-flex-HV"
                :style="{
                  background: $store.state.setting.mode === 'dark' ? 'rgba(36,222,255,0.2)' : 'rgba(8,82,150,0.3)',
                }"
              >
                <div
                  class="blueBtn"
                  style="height: 79px; margin-right: 66px"
                  :style="{ background: $store.state.setting.mode === 'dark' ? 'rgba(36,222,255,0.5)' : '#085296' }"
                >
                  <div class="g-row-flex-HV" style="height: 44px">
                    <!-- <img class="dataBase" src="../../../assets/intelligentOilfield/dataBase.png" alt=""
                        style="margin-right: 3px" /> -->
                    <svg-icon class="svgIconClass" icon-class="data" style="margin-right: 6px" />
                    kudu
                  </div>
                  <div class="yellowText g-row-flex-HV">贴源层</div>
                </div>
                <div
                  class="blueBtn g-row-flex-HV"
                  :style="{ background: $store.state.setting.mode === 'dark' ? 'rgba(36,222,255,0.5)' : '#085296' }"
                >
                  <!-- <img class="dataBase" src="../../../assets/intelligentOilfield/dataBase.png" alt=""
                      style="margin-right: 3px" /> -->
                  <svg-icon class="svgIconClass" icon-class="data" style="margin-right: 6px" />
                  Minio
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="margin: 0px 0 20px 36px; font-size: 14px" class="g-row-flex-V">
          <div class="squareStyle" style="background: #2d8d5c"></div>
          <div style="margin-right: 10px" :style="{ color: $store.state.setting.mode === 'dark' ? '#fff' : '#909399' }">
            各业务模块
          </div>
          <div class="squareStyle" style="background: #24deff"></div>
          <div style="margin-right: 10px" :style="{ color: $store.state.setting.mode === 'dark' ? '#fff' : '#909399' }">
            一库
          </div>
          <div class="squareStyle" style="background: #d35a20"></div>
          <div style="margin-right: 10px" :style="{ color: $store.state.setting.mode === 'dark' ? '#fff' : '#909399' }">
            一平台
          </div>
          <div class="squareStyle" style="background: #0064a9"></div>
          <div style="margin-right: 10px" :style="{ color: $store.state.setting.mode === 'dark' ? '#fff' : '#909399' }">
            物联网平台
          </div>
          <div class="squareStyle" style="background: #00a99f"></div>
          <div :style="{ color: $store.state.setting.mode === 'dark' ? '#fff' : '#909399' }">设备</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lineSvg from '@/pages/intelligentOilfield/messageCenter/lineSvg.vue';
import { searchequipment, equipmentStatus } from '@/api/intelligentOilfield/system/equipment';

export default {
  name: 'Message',
  components: {
    lineSvg,
  },
  data() {
    return {
      title: '设备分类',
      openDialog: false,
      input: '',
      initIptList: [
        { name: '电气类', isGreen: true, icon: 'electrical' },
        { name: '机械类', isGreen: false, icon: 'machinery' },
        { name: '仪表类', isGreen: true, icon: 'appearance' },
        { name: '其他', isGreen: true, icon: 'other' },
        { name: '视联网平台', isGreen: true },
      ],
      resultIptList: [],
      lastIpt: [],
      initJptList: [
        { name: '电气类', isGreen: 0, icon: 'electrical' },
        { name: '机械类', isGreen: 0, icon: 'machinery' },
        { name: '仪表类', isGreen: 0, icon: 'appearance' },
        { name: '其他', isGreen: 0, icon: 'other' },
      ],
      initFPSOptList: [
        { name: '电气类', isGreen: true, icon: 'electrical' },
        { name: '机械类', isGreen: false, icon: 'machinery' },
        { name: '仪表类', isGreen: true, icon: 'appearance' },
        { name: '其他', isGreen: true, icon: 'other' },
        { name: '视联网平台', isGreen: true },
      ],
      resultFPSOptList: [],
      lastFPSOpt: [],
      options: [
        { value: 'I平台', label: 'I平台' },
        { value: 'J平台', label: 'J平台' },
        { value: 'FPSO平台', label: 'FPSO平台' },
      ],
      indicatorSource: 'I平台',
      activeName: '电气类',
      statusOptions: [
        { value: '', label: '全部' },
        { value: '1', label: '正常' },
        { value: '0', label: '异常' },
      ],
      statusModel: '',
      nameInput: '',
      searchList: [],
      tabsList: [
        {
          title: '电气类',
          name: '1',
        },
        {
          title: '机械类',
          name: '2',
        },
        {
          title: '仪表类',
          name: '3',
        },
        {
          title: '其它',
          name: '4',
        },
        {
          title: '视联网平台',
          name: '5',
        },
      ],
      dialogType: '工作项',
      verticalLine: '12,10 12,10 11,37',
      topLine: '0,20 120,20 120,35 290 35,290,50',
      bottomLine: '0,40 120,40 120,25 290 25,290,4',
      wwLink: '218px',
      wwlinkTop: '-167px',
      wwLinkLine: '0,190 200,190 200,0',
      wtLine: '5,0 5,193 105,193',
      fyLinkHeight: '37px',
      fyLinkTop: '150px',
      fyPoint: '65,37 65,0 64,0',
      isFullScreen: false,
    };
  },
  created() {
    this.resultIptList = this.initIptList.filter((item) => item.name !== '视联网平台');
    this.lastIpt = this.initIptList.filter((item) => item.name === '视联网平台');
    this.resultFPSOptList = this.initFPSOptList.filter((item) => item.name !== '视联网平台');
    this.lastFPSOpt = this.initFPSOptList.filter((item) => item.name === '视联网平台');
    this.getstatus();
  },
  mounted() {
    console.log('aaa', document.body.clientHeight);
    this.differFBL();
    window.onresize = () =>
      (() => {
        // 监听页面宽高变化
        this.differFBL();
      })();
  },
  methods: {
    // 跳转设备维护
    handleToPage() {
      this.$router.push({ name: 'Equipment' });
    },
    // 获取状态
    getstatus() {
      equipmentStatus().then((res) => {
        this.initIptList[0].isGreen = Number(res.data.data.I平台.电气类);
        this.initIptList[1].isGreen = Number(res.data.data.I平台.机械类);
        this.initIptList[2].isGreen = Number(res.data.data.I平台.仪表类);
        this.initIptList[3].isGreen = Number(res.data.data.I平台.其他);
        this.initIptList[4].isGreen = Number(res.data.data.I平台.视联网平台);
        this.initFPSOptList[0].isGreen = Number(res.data.data.EPSO平台.电气类);
        this.initFPSOptList[1].isGreen = Number(res.data.data.EPSO平台.机械类);
        this.initFPSOptList[2].isGreen = Number(res.data.data.EPSO平台.仪表类);
        this.initFPSOptList[3].isGreen = Number(res.data.data.EPSO平台.其他);
        this.initFPSOptList[4].isGreen = Number(res.data.data.EPSO平台.视联网平台);
        this.initJptList[0].isGreen = Number(res.data.data.J平台.电气类);
        this.initJptList[1].isGreen = Number(res.data.data.J平台.机械类);
        this.initJptList[2].isGreen = Number(res.data.data.J平台.仪表类);
        this.initJptList[3].isGreen = Number(res.data.data.J平台.其他);
      });
    },
    differFBL() {
      if (document.body.clientHeight === 1080) {
        // this.verticalLine = '12,10 12,10 11,58';
        // this.topLine = '0,20 120,20 120,35 290 35,290,58';
        // this.bottomLine = '0,40 120,40 120,25 290 25,290,0';
        // this.wwLink = '265px';
        // this.wwlinkTop = '-210px';
        // this.wwLinkLine = '0,235 200,235 200,0';
        // this.wtLine = '5,0 5,245 105,245';
        // this.fyLinkHeight = '80px';
        // this.fyLinkTop = '170px';
        // this.fyPoint = '65,80 65,0 64,0'
        this.isFullScreen = true;
      } else {
        // this.verticalLine = '12,10 12,10 11,37';
        // this.topLine = '0,20 120,20 120,35 290 35,290,50';
        // this.bottomLine = '0,40 120,40 120,25 290 25,290,4';
        // this.wwLink = '218px';
        // this.wwlinkTop = '-167px';
        // this.wwLinkLine = '0,190 200,190 200,0';
        // this.wtLine = '5,0 5,193 105,193';
        // this.fyLinkHeight = '37px';
        // this.fyLinkTop = '150px';
        // this.fyPoint = '65,37 65,0 64,0'
        this.isFullScreen = false;
      }
    },
    // 关闭
    submitForm() {
      this.openDialog = false;
      this.statusModel = '';
      this.activeName = '电气类';
      this.searchList = [];
      this.nameInput = '';
      this.indicatorSource = 'I平台'
    },
    clesrSearchList() {
      this.statusModel = '';
      this.activeName = '电气类';
      this.searchList = [];
      this.nameInput = '';
      this.indicatorSource = 'I平台'
    },
    clickItem(val, type) {
      this.dialogType = type;
      if (this.dialogType === '搜索') {
        this.title = '检索结果';
        const queryParams = {
          equipmentName: this.input,
        };
        searchequipment(queryParams).then((res) => {
          this.searchList = res.data.data;
        });
      } else if (this.dialogType === '工作项') {
        this.title = '设备分类';
        const queryParams = {
          terrace: this.indicatorSource,
          type: this.activeName,
          equipmentName: this.nameInput,
          status: this.statusModel,
        };
        searchequipment(queryParams).then((res) => {
          this.searchList = res.data.data;
        });
      } else {
        // Flink集群
        this.title = 'Flink集群';
        const queryParams = {
          type: this.activeName,
          equipmentName: this.input,
          status: this.statusModel,
          clusterStatus: 1,
        };
        searchequipment(queryParams).then((res) => {
          this.searchList = res.data.data;
        });
      }
      this.openDialog = true;
    },
    // 搜索
    handleQuery() {
      if (this.title == '检索结果') {
        const queryParams = {
          equipmentName: this.nameInput,
          status: this.statusModel,
        };
        searchequipment(queryParams).then((res) => {
          this.searchList = res.data.data;
        });
      } else if (this.title == '设备分类') {
        const queryParams = {
          terrace: this.indicatorSource,
          type: this.activeName,
          equipmentName: this.nameInput,
          status: this.statusModel,
        };
        searchequipment(queryParams).then((res) => {
          this.searchList = res.data.data;
        });
      } else {
        // Flink集群
        const queryParams = {
          type: this.activeName,
          equipmentName: this.nameInput,
          status: this.statusModel,
          clusterStatus: 1,
        };
        searchequipment(queryParams).then((res) => {
          this.searchList = res.data.data;
        });
      }
    },
    // 重置
    resetQuery() {
      this.statusModel = '';
      this.activeName = '电气类';
      this.searchList = [];
      this.nameInput = '';
      this.handleQuery();
    },
    // 点击Tab标签
    handleClick(tab, event) {
      // console.log(tab, event);
      const queryParams = {
        terrace: this.title == '设备分类' ? this.indicatorSource : undefined,
        type: this.activeName,
        equipmentName: this.nameInput,
        status: this.statusModel,
        clusterStatus: this.title == 'Flink集群' ? 1 : undefined,
      };
      searchequipment(queryParams).then((res) => {
        this.searchList = res.data.data;
      });
    },

    changeSource(item) {
      console.log('点击选中111===', item);
      this.tabsList = [];
      if (item === 'I平台' || item === 'FPSO平台') {
        this.tabsList = [
          {
            title: '电气类',
            name: '1',
          },
          {
            title: '机械类',
            name: '2',
          },
          {
            title: '仪表类',
            name: '3',
          },
          {
            title: '其它',
            name: '4',
          },
          {
            title: '视联网平台',
            name: '5',
          },
        ];
      } else {
        this.tabsList = [
          {
            title: '电气类',
            name: '1',
          },
          {
            title: '机械类',
            name: '2',
          },
          {
            title: '仪表类',
            name: '3',
          },
          {
            title: '其它',
            name: '4',
          },
        ];
      }
    },
    changeStatusSource() {
      console.log('1');
    },
  },
};
</script>


<style scoped>
.searchStyle {
  position: absolute;
  left: 8px;
  color: var(--lightBlueColor);
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  z-index: 1;
}

.typeClass {
  height: 40px;
  margin-top: 5px;
  position: relative;
}

.bgClass {
  background: rgba(0, 169, 159, 0.3);
  color: #fff;
  border-radius: 4px;
  width: 120px;
  margin-left: 20px;
}

.lineStyle {
  border-top: 1px solid red;
  width: 200px;
}

.leftBgStyle {
  width: 672px;
  background: var(--svgLineBg);
  border-radius: 4px;
  margin-right: 80px;
}

.rightBgStyle {
  width: 890px;
  background: var(--svgLineBg);
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

.absoulteDiv {
  position: absolute;
  right: 40px;
  top: 20px;
  height: 40px;
}

.squareStyle {
  width: 10px;
  height: 10px;
  background: #2d8d5c;
  border-radius: 2px;
  margin: 0 6px 0 16px;
}

.pageGreen {
  width: 220px;
  height: 98px;
  background: rgba(45, 141, 92, 0.3);
  border-radius: 4px;
}

.greenBtn {
  width: 180px;
  height: 44px;
  background: rgba(45, 141, 92, 0.6);
  border-radius: 4px;
}

.menOrange {
  width: 380px;
  height: 98px;
  background: rgba(211, 90, 32, 0.3);
  border-radius: 4px;
}

.orangeBtn {
  width: 120px;
  height: 44px;
  background: rgba(211, 90, 32, 0.6);
  border-radius: 4px;
}

.blueBg {
  width: 194px;
  height: 312px;
  background: rgba(36, 222, 255, 0.3);
  border-radius: 4px;
}

.blueBtn {
  width: 140px;
  height: 44px;
  background: rgba(36, 222, 255, 0.5);
  border-radius: 4px;
}

.yellowText {
  font-size: 16px;
  font-family: AlibabaPuHuiTiR;
  color: #fffc49;
}

.dataBase {
  width: 20px;
  height: 20px;
}
</style>
