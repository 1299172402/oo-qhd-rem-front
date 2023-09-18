<!-- 后台——消息中心备份 -->
<template>
  <div class="g-w100 g-h100 g-column-flex" style="font-size: 16px; color: #fff;">
    <el-dialog
      :title="title"
      :visible.sync="openDialog"
      width="80vw"
      append-to-body
      :close-on-click-modal="false"
      custom-class="land-dialog"
      @close="clesrSearchList"
    >
      <div style="height: 400px;">
        <div style="margin-top: 20px;">
          <el-tabs
            v-if="dialogType !== '搜索' && dialogType !== '工作项'"
            v-model="activeName"
            class="g-pageHeader"
            @tab-click="handleClick"
          >
            <el-tab-pane
              v-for="(item, index2) in tabsList"
              :key="index2"
              :label="item.title"
              :name="item.title"
            />
          </el-tabs>
          <div class="g-row-flex-V">
            <div class="g-row-flex-V">
              <div style="margin-right: 10px;">
                设备名称：
              </div>
              <div>
                <el-input v-model="nameInput" style="width: 150px;" placeholder="请输入设备名称" />
              </div>
            </div>
            <div class="g-row-flex-V" style="margin: 0 10px;">
              <div style="margin-right: 10px;">
                设备状态：
              </div>
              <div>
                <el-select
                  v-model="statusModel"
                  style="width: 150px;"
                  placeholder="请选择设备状态"
                  clearable
                >
                  <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div>
              <el-button type="primary" class="buttonActive_primary" @click="handleQuery">
                搜索
              </el-button>
              <el-button class="commonBtn" @click="resetQuery">
                重置
              </el-button>
            </div>
          </div>
        </div>
        <div class="g-row-flex-V" style="flex-wrap: wrap; margin-top: 10px;">
          <div v-for="(item, index) in searchList" :key="index" class="typeClass">
            <div
              class="bgClass g-row-flex-V g-w100 g-h100"
              style="width: 170px; cursor: pointer;"
              :style="{
                background: $store.state.setting.mode === 'dark' ? 'rgba(0,169,159,0.3)' : 'rgba(44, 88, 118, 1)',
              }"
              @click="clickItem(item, '工作项')"
            >
              <div class="circleStyle" :style="{ background: item.status == 1 ? '#309800' : '#FF4D4F' }" />
              {{ item.equipmentName }}
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
    <div
      style="height: 63.19px; position: relative; display: flex; justify-content: space-between;"
      class="g-row-flex-V"
    >
      <i class="el-icon-search searchStyle" @click="clickItem(input, '搜索')" />
      <el-input
        v-model="input"
        prefix-icon="aa"
        style="width: 400px;"
        placeholder="请输入检索项目"
      />
      <el-button
        type="primary"
        plain
        size="mini"
        @click="handleToPage()"
      >
        设备维护
      </el-button>
    </div>
    <div
      style="height: 728.8px; position: relative;"
      :style="{ marginTop: isFullScreen ? '25px' : '5px' }"
      class="g-row-flex"
    >
      <div style="height: calc(100% - 0px);" class="g-column-flex leftBgStyle">
        <div
          style="margin: 10px 0 0 20px; font-weight: 700;"
          :style="{ color: $store.state.setting.mode === 'dark' ? '#fff' : 'var(--only-light-blue-color)' }"
        >
          边端数据链路
        </div>
        <div class="g-w100 g-h100">
          <!-- I平台 -->
          <div style="height: 33%; position: relative; z-index: 1;" class="g-row-flex-V">
            <div
              class="titleStyle"
              :style="{
                color: $store.state.setting.mode === 'dark' ? '#3AA4ED' : 'var(--only-light-blue-color)',
                cursor: 'pointer',
              }"
              @click="clickItem($event, '平台')"
            >
              I平台
            </div>
            <div
              class="g-row-flex-V"
              style="justify-content: space-between; width: 540px; height: 90%; border: 1px dashed #979797;"
            >
              <div class="g-column-flex-V" style="height: calc(100% - 30px); position: relative;">
                <div
                  v-for="(item, index) in resultIptList"
                  :key="index"
                  class="typeClass g-row-flex-V"
                  style=""
                >
                  <div
                    class="bgClass g-row-flex-V g-w100 g-h100"
                    style="cursor: pointer;"
                    :style="{
                      background: $store.state.setting.mode === 'dark' ? 'rgba(0,169,159,0.3)' : 'rgba(44, 88, 118, 1)',
                    }"
                    @click="clickItem(item, '工作项', 'I平台')"
                  >
                    <div class="circleStyle" :style="{ background: item.isGreen ? '#309800' : '#FF4D4F' }" />
                    <svg-icon
                      v-if="item.icon"
                      class="svgIconClass"
                      :icon-class="item.icon"
                      style="margin-right: 6px;"
                    />
                    {{ item.name }}
                  </div>
                  <line-svg
                    style="top: 5px;"
                    :set-points="
                      index === 0
                        ? topLine
                        : index === 1
                          ? '0,20 180,20 180,19 180,30 258,30'
                          : index === 2
                            ? '0,20 180,20 180,19 180,5 258,5'
                            : ''
                    "
                  />
                  <line-svg v-if="index === 3" style="top: -27px;" :set-points="bottomLine" />
                </div>
              </div>
              <div
                class="bgClass g-column-flex-HV"
                style="height: 44px; background: rgba(0, 100, 169, 0.3); margin-right: 20px; position: relative;"
                :style="{ background: $store.state.setting.mode === 'dark' ? 'rgba(0,100,169,0.3)' : 'rgba(43, 143, 229, 1)' }"
              >
                物联网平台
                <line-svg
                  style="left: 120px; top: 0;"
                  svg-width="206px"
                  :svg-height="wwLink"
                  set-points="0,20 200,20 200,263 "
                />
              </div>
            </div>
            <div class="absoulteDiv">
              <div
                class="bgClass g-row-flex-V g-w100 g-h100"
                style="cursor: pointer;"
                :style="{
                  background: $store.state.setting.mode === 'dark' ? 'rgba(0,169,159,0.3)' : 'rgba(44, 88, 118, 1)',
                }"
                @click="clickItem(lastIpt[0], '工作项', 'I平台')"
              >
                <div class="circleStyle" :style="{ background: lastIpt[0].isGreen ? '#309800' : '#FF4D4F' }" />
                {{ lastIpt[0].name }}
              </div>
              <line-svg style="left: 70px; top: 30px;" svg-width="70px" :set-points="verticalLine" />
            </div>
          </div>
          <!-- J平台 -->
          <div style="height: 33%; position: relative;" class="g-row-flex-V">
            <div
              class="titleStyle"
              :style="{
                color: $store.state.setting.mode === 'dark' ? '#3AA4ED' : 'var(--only-light-blue-color)',
                cursor: 'pointer',
              }"
              @click="clickItem($event, '平台')"
            >
              J平台
            </div>
            <div
              class="g-row-flex-V"
              style="justify-content: space-between; width: 540px; height: 90%; border: 1px dashed #979797;"
            >
              <div class="g-column-flex-V" style="height: calc(100% - 30px);">
                <div
                  v-for="(item, index2) in initJptList"
                  :key="index2"
                  class="typeClass g-row-flex-V"
                  style="position: relative;"
                >
                  <div
                    class="bgClass g-row-flex-V g-w100 g-h100"
                    style="cursor: pointer;"
                    :style="{
                      background: $store.state.setting.mode === 'dark' ? 'rgba(0,169,159,0.3)' : 'rgba(44, 88, 118, 1)',
                    }"
                    @click="clickItem(item, '工作项', 'J平台')"
                  >
                    <div class="circleStyle" :style="{ background: item.isGreen ? '#309800' : '#FF4D4F' }" />
                    <svg-icon
                      v-if="item.icon"
                      class="svgIconClass"
                      :icon-class="item.icon"
                      style="margin-right: 6px;"
                    />
                    {{ item.name }}
                  </div>
                  <line-svg
                    style="top: 5px; z-index: 0;"
                    :set-points="
                      index2 === 0
                        ? topLine
                        : index2 === 1
                          ? '0,20 180,20 180,19 180,30 258,30'
                          : index2 === 2
                            ? '0,20 180,20 180,19 180,5 258,5'
                            : ''
                    "
                  />
                  <line-svg v-if="index2 === 3" style="top: -27px; z-index: 0;" :set-points="bottomLine" />
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
                :style="{ background: $store.state.setting.mode === 'dark' ? 'rgba(0,100,169,0.3)' : 'rgba(43, 143, 229, 1)' }"
              >
                物联网平台
                <line-svg
                  style="left: 120px; top: 0;"
                  svg-width="155px"
                  svg-height="50px"
                  set-points="0,23 155,23 155,21 "
                />
                <line-svg
                  style="left: 395px; top: 0;"
                  svg-width="58px"
                  svg-height="50px"
                  set-points="0,23 58,23 58,22 "
                />
                <line-svg
                  style="left: 330px; top: 50px;"
                  svg-width="105px"
                  svg-height="266px"
                  :set-points="wtLine"
                />
              </div>
            </div>
          </div>
          <!-- FPSO平台 -->
          <div style="height: 33%; position: relative;" class="g-row-flex-V">
            <div
              class="titleStyle"
              :style="{
                color: $store.state.setting.mode === 'dark' ? '#3AA4ED' : 'var(--only-light-blue-color)',
                cursor: 'pointer',
              }"
              @click="clickItem($event, '平台')"
            >
              FPSO平台
            </div>
            <div
              class="g-row-flex-V"
              style="justify-content: space-between; width: 540px; height: 90%; border: 1px dashed #979797;"
            >
              <div class="g-column-flex-V" style="height: calc(100% - 30px);">
                <div v-for="(item, index3) in resultFPSOptList" :key="index3" class="typeClass g-row-flex-V">
                  <div
                    class="bgClass g-row-flex-V g-w100 g-h100"
                    :style="{
                      background: $store.state.setting.mode === 'dark' ? 'rgba(0,169,159,0.3)' : 'rgba(44, 88, 118, 1)',
                    }"
                    style="cursor: pointer;"
                    @click="clickItem(item, '工作项', 'FPSO平台')"
                  >
                    <div class="circleStyle" :style="{ background: item.isGreen ? '#309800' : '#FF4D4F' }" />
                    <svg-icon
                      v-if="item.icon"
                      class="svgIconClass"
                      :icon-class="item.icon"
                      style="margin-right: 6px;"
                    />
                    {{ item.name }}
                  </div>
                  <line-svg
                    style="top: 5px; z-index: 0;"
                    :set-points="
                      index3 === 0
                        ? topLine
                        : index3 === 1
                          ? '0,20 180,20 180,19 180,30 258,30'
                          : index3 === 2
                            ? '0,20 180,20 180,19 180,5 258,5'
                            : ''
                    "
                  />
                  <line-svg v-if="index3 === 3" style="top: -27px; z-index: 0;" :set-points="bottomLine" />
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
                :style="{ background: $store.state.setting.mode === 'dark' ? 'rgba(0,100,169,0.3)' : 'rgba(43, 143, 229, 1)' }"
              >
                物联网平台
                <line-svg
                  style="left: 120px;"
                  :style="{ top: wwlinkTop }"
                  svg-width="206px"
                  :svg-height="wwLink"
                  :set-points="wwLinkLine"
                />
              </div>
            </div>
            <div class="absoulteDiv">
              <div
                class="bgClass g-row-flex-V g-w100 g-h100"
                style="cursor: pointer; position: relative; z-index: 1;"
                :style="{
                  background: $store.state.setting.mode === 'dark' ? 'rgba(0,169,159,0.3)' : 'rgba(44, 88, 118, 1)',
                }"
                @click="clickItem(lastFPSOpt[0], '工作项', 'FPSO平台')"
              >
                <div class="circleStyle" :style="{ background: lastFPSOpt[0].isGreen ? '#309800' : '#FF4D4F' }" />
                {{ lastFPSOpt[0].name }}
              </div>
              <line-svg style="left: 70px; top: 30px; z-index: 0;" svg-width="70px" :set-points="verticalLine" />
            </div>
          </div>
        </div>
        <div style="margin: 0 0 20px 112px; font-size: 14px;" class="g-row-flex-V">
          <div class="circleStyle" style="background: #309800;" />
          <div :style="{ color: $store.state.setting.mode === 'dark' ? '#fff' : '#909399' }">
            数据服务正常
          </div>
          <div class="circleStyle" style="background: #ff4d4f;" />
          <div :style="{ color: $store.state.setting.mode === 'dark' ? '#fff' : '#909399' }">
            数据服务异常
          </div>
        </div>
      </div>
      <div style="height: calc(100% - 0px);" class="g-column-flex rightBgStyle">
        <div
          style="margin: 10px 0 0 20px; font-weight: 700;"
          :style="{ color: $store.state.setting.mode === 'dark' ? '#fff' : 'var(--only-light-blue-color)' }"
        >
          云端数据链路
        </div>
        <div class="g-row-flex-V g-h100 g-w100">
          <div class="g-column-flex-HV g-h100" style="width: 21.2%;">
            <div
              class="g-column-flex-HV"
              style="width: 120px; border-radius: 4px; height: 44px; background: rgba(0, 100, 169, 0.3);"
              :style="{ background: $store.state.setting.mode === 'dark' ? 'rgba(0,100,169,0.3)' : 'rgba(43, 143, 229, 1)' }"
            >
              物联网平台
            </div>
          </div>
          <div style="width: 78%;" class="g-h100 g-column-flex">
            <div class="g-row-flex-V" style="height: 30%; position: relative;">
              <div
                class="pageGreen g-column-flex-HV"
                style="margin-right: 26px;"
                :style="{
                  background: $store.state.setting.mode === 'dark' ? 'rgba(45,141,92,0.3)' : 'rgba(45,141,92,0.6)',
                }"
              >
                <div style="margin-bottom: 10px;">
                  页面
                </div>
                <div class="g-row-flex-HV">
                  <div class="greenBtn g-column-flex-HV" style="width: 80px; margin: 0 10px;">
                    报警中心
                  </div>
                  <div class="greenBtn g-column-flex-HV" style="width: 80px; margin: 0 10px;">
                    业务模块
                  </div>
                </div>
              </div>
              <line-svg
                style="left: 0; z-index: 0;top: 140px;"
                svg-width="135px"
                svg-height="90px"
                set-points="65,77 65,0 64,0"
              />
              <line-svg
                style="left: 93px; z-index: 0;top: 140px;"
                svg-width="135px"
                :svg-height="fyLinkHeight"
                set-points="65,27 65,0 64,0"
              />
              <line-svg
                style="left: 20px; z-index: 0;top: 140px;"
                svg-width="300px"
                :svg-height="fyLinkHeight"
                set-points="48,30 295,30 295,0"
              />
              <line-svg
                style="left: 253px; z-index: 0;top: 140px;"
                svg-width="400px"
                :svg-height="fyLinkHeight"
                set-points="65,30 175,30 175,0"
              />
              <line-svg
                style="left: 331px; z-index: 0;top: 140px;"
                svg-width="400px"
                :svg-height="fyLinkHeight"
                set-points="100,30 215,30 215,0"
              />
              <div
                class="menOrange g-column-flex-HV"
                :style="{
                  background: $store.state.setting.mode === 'dark' ? 'rgba(211,90,32,0.3)' : 'rgba(211,90,32,0.6)',
                }"
              >
                <div class="g-column-flex-HV" style="margin-bottom: 10px;">
                  门户
                </div>
                <div class="g-row-flex-HV">
                  <div class="orangeBtn g-column-flex-HV" style="width: 100px;">
                    站内信
                  </div>
                  <div class="orangeBtn g-column-flex-HV" style="width: 80px; margin: 0 20px;">
                    邮件
                  </div>
                  <div class="orangeBtn g-column-flex-HV">
                    边端云同步
                  </div>
                </div>
              </div>
            </div>
            <div class="g-row-flex-V" style="height: 40%;margin-top: 5%;">
              <div class="g-column-flex" style="margin: 0 159px 120px 20px; position: relative;">
                <div
                  class="blueBtn g-column-flex-HV"
                  style="width: 140px; margin-bottom: 45px; cursor: pointer;flex-direction: unset;"
                  :style="{ background: $store.state.setting.mode === 'dark' ? 'rgba(36,222,255,0.3)' : '#085296' }"
                  @click="clickItem('', 'Flink集群')"
                >
                  <div class="circleStyle" :style="{ background: isOK === 1 ? '#309800' : '#FF4D4F' }" style="margin: 0 6px 0 0;" />
                  <div>Flink集群</div>
                </div>
                <line-svg
                  style="left: 0; top: 44px; z-index: 0;"
                  svg-width="135px"
                  svg-height="78px"
                  set-points="65,45 65,0 64,0"
                />
                <line-svg
                  style="left: 140px; top: 0; z-index: 0;"
                  svg-width="155px"
                  svg-height="78px"
                  set-points="0,23 155,23 155,22"
                />
                <line-svg
                  style="left: 140px; top: 23px; z-index: 0;"
                  svg-width="155px"
                  svg-height="78px"
                  set-points="77,0 77,70 155,70"
                />
                <line-svg
                  style="left: 140px; top: 96px; z-index: 0;"
                  svg-width="155px"
                  svg-height="78px"
                  set-points="77,0 77,70 155,70"
                />
                <div
                  class="blueBtn g-column-flex-HV"
                  style="width: 140px;"
                  :style="{ background: $store.state.setting.mode === 'dark' ? 'rgba(36,222,255,0.3)' : '#085296' }"
                >
                  Kafks集群
                </div>
              </div>
              <div
                class="blueBg g-column-flex-HV"
                style="max-width: 194px;max-height: 312px;height: auto;width: auto;padding: 15px;"
                :style="{
                  background: $store.state.setting.mode === 'dark' ? 'rgba(36,222,255,0.2)' : 'rgba(8,82,150,0.3)',
                }"
              >
                <div
                  class="blueBtn g-row-flex-HV"
                  style="width: 154px;"
                  :style="{ background: $store.state.setting.mode === 'dark' ? 'rgba(36,222,255,0.3)' : '#085296' }"
                >
                  <!-- TODO: Maybe change back -->
                  <!-- <img class="dataBase" src="../../../assets/intelligentOilfield/dataBase.png" alt=""
                        style="margin-right: 3px" /> -->
                  <svg-icon class="svgIconClass" icon-class="data" style="margin-right: 6px;" />
                  King Base
                </div>
                <div
                  class="blueBtn g-row-flex-HV"
                  style="width: 154px; margin: 20px 0;"
                  :style="{ background: $store.state.setting.mode === 'dark' ? 'rgba(36,222,255,0.3)' : '#085296' }"
                >
                  <!-- TODO: Maybe change back -->
                  <!-- <img class="dataBase" src="../../../assets/intelligentOilfield/dataBase.png" alt=""
                        style="margin-right: 3px" /> -->
                  <svg-icon class="svgIconClass" icon-class="data" style="margin-right: 6px;" />
                  Redis应用层
                </div>
                <div
                  class="g-column-flex-HV blueBtn"
                  style="width: 154px; height: 144px;"
                  :style="{ background: $store.state.setting.mode === 'dark' ? 'rgba(36,222,255,0.3)' : '#085296' }"
                >
                  <div class="g-row-flex-H" style="height: 44px;">
                    <!-- TODO: Maybe change back -->
                    <!-- <img class="dataBase" src="../../../assets/intelligentOilfield/dataBase.png" alt=""
                          style="margin-right: 3px" /> -->
                    <svg-icon class="svgIconClass" icon-class="data" style="margin-right: 6px;" />
                    Clickhouse
                  </div>
                  <div class="yellowText">
                    应用层
                  </div>
                  <div class="yellowText" style="margin: 5px 0;">
                    聚合层
                  </div>
                  <div class="yellowText">
                    明细层
                  </div>
                </div>
              </div>
            </div>
            <div class="g-row-flex-V" style="height: 30%;">
              <div
                style="max-width: 386px;max-height: 119px;height: auto;width: auto;padding: 15px;"
                class="blueBg g-row-flex-HV"
                :style="{
                  background: $store.state.setting.mode === 'dark' ? 'rgba(36,222,255,0.2)' : 'rgba(8,82,150,0.3)',
                }"
              >
                <div
                  class="blueBtn"
                  style="height: 79px; margin-right: 66px;"
                  :style="{ background: $store.state.setting.mode === 'dark' ? 'rgba(36,222,255,0.3)' : '#085296' }"
                >
                  <div class="g-row-flex-HV" style="height: 44px;">
                    <!-- TODO: Maybe change back -->
                    <!-- <img class="dataBase" src="../../../assets/intelligentOilfield/dataBase.png" alt=""
                          style="margin-right: 3px" /> -->
                    <svg-icon class="svgIconClass" icon-class="data" style="margin-right: 6px;" />
                    kudu
                  </div>
                  <div class="yellowText g-row-flex-HV">
                    贴源层
                  </div>
                </div>
                <div
                  class="blueBtn g-row-flex-HV"
                  :style="{ background: $store.state.setting.mode === 'dark' ? 'rgba(36,222,255,0.3)' : '#085296' }"
                >
                  <!-- TODO: Maybe change back -->
                  <!-- <img class="dataBase" src="../../../assets/intelligentOilfield/dataBase.png" alt=""
                        style="margin-right: 3px" /> -->
                  <svg-icon class="svgIconClass" icon-class="data" style="margin-right: 6px;" />
                  Minio
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="margin: 0 0 20px 36px; font-size: 14px;" class="g-row-flex-V">
          <div class="squareStyle" :style="{ background: $store.state.setting.mode === 'dark' ? '#2d8d5c' : '#2D8D5C ' }" />
          <div style="margin-right: 10px;" :style="{ color: $store.state.setting.mode === 'dark' ? '#fff' : '#909399' }">
            各业务模块
          </div>
          <div class="squareStyle" :style="{ background: $store.state.setting.mode === 'dark' ? '#24deff' : '#085296' }" />
          <div style="margin-right: 10px;" :style="{ color: $store.state.setting.mode === 'dark' ? '#fff' : '#909399' }">
            一库
          </div>
          <div class="squareStyle" :style="{ background: $store.state.setting.mode === 'dark' ? '#d35a20' : '#D35A20' }" />
          <div style="margin-right: 10px;" :style="{ color: $store.state.setting.mode === 'dark' ? '#fff' : '#909399' }">
            一平台
          </div>
          <div class="squareStyle" :style="{ background: $store.state.setting.mode === 'dark' ? '#0064a9' : '#2B8FE5' }" />
          <div style="margin-right: 10px;" :style="{ color: $store.state.setting.mode === 'dark' ? '#fff' : '#909399' }">
            物联网平台
          </div>
          <div class="squareStyle" :style="{ background: $store.state.setting.mode === 'dark' ? '#00a99f' : '#2C5876' }" />
          <div :style="{ color: $store.state.setting.mode === 'dark' ? '#fff' : '#909399' }">
            设备
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lineSvg from "@/pages/intelligentOilfield/messageCenter/lineSvg.vue";
import { searchequipment, equipmentStatus } from "@/api/intelligentOilfield/system/equipment";

export default {
  name: "Message",
  components: {
    lineSvg
  },
  data() {
    return {
      isOK: true,
      title: "设备分类",
      openDialog: false,
      input: "",
      initIptList: [
        { name: "电气类", isGreen: true, icon: "electrical" },
        { name: "机械类", isGreen: false, icon: "machinery" },
        { name: "仪表类", isGreen: true, icon: "appearance" },
        { name: "其他", isGreen: true, icon: "other" },
        { name: "视联网平台", isGreen: true }
      ],
      resultIptList: [],
      lastIpt: [],
      initJptList: [
        { name: "电气类", isGreen: 0, icon: "electrical" },
        { name: "机械类", isGreen: 0, icon: "machinery" },
        { name: "仪表类", isGreen: 0, icon: "appearance" },
        { name: "其他", isGreen: 0, icon: "other" }
      ],
      initFPSOptList: [
        { name: "电气类", isGreen: true, icon: "electrical" },
        { name: "机械类", isGreen: false, icon: "machinery" },
        { name: "仪表类", isGreen: true, icon: "appearance" },
        { name: "其他", isGreen: true, icon: "other" },
        { name: "视联网平台", isGreen: true }
      ],
      resultFPSOptList: [],
      lastFPSOpt: [],
      options: [
        { value: "I平台", label: "I平台" },
        { value: "J平台", label: "J平台" },
        { value: "FPSO平台", label: "FPSO平台" }
      ],
      indicatorSource: "I平台",
      activeName: "电气类",
      statusOptions: [
        { value: "", label: "全部" },
        { value: "1", label: "正常" },
        { value: "0", label: "异常" }
      ],
      statusModel: "",
      nameInput: "",
      searchList: [],
      tabsList: [
        {
          title: "电气类",
          name: "1"
        },
        {
          title: "机械类",
          name: "2"
        },
        {
          title: "仪表类",
          name: "3"
        },
        {
          title: "其它",
          name: "4"
        },
        {
          title: "视联网平台",
          name: "5"
        }
      ],
      dialogType: "工作项",
      verticalLine: "12,10 12,10 11,37",
      topLine: "0,20 120,20 120,35 290 35,290,50",
      bottomLine: "0,40 120,40 120,25 290 25,290,4",
      wwLink: "218px",
      wwlinkTop: "-167px",
      wwLinkLine: "0,190 200,190 200,0",
      wtLine: "5,0 5,193 105,193",
      fyLinkHeight: "37px",
      fyLinkTop: "150px",
      fyPoint: "65,57 65,0 64,0",
      isFullScreen: false
    };
  },
  created() {
    this.resultIptList = this.filterData(this.initIptList, "视联网平台", false);
    this.lastIpt = this.filterData(this.initIptList, "视联网平台", true);
    this.resultFPSOptList = this.filterData(this.initFPSOptList, "视联网平台", false);
    this.lastFPSOpt = this.filterData(this.initFPSOptList, "视联网平台", true);
    this.getstatus();
  },
  mounted() {
    this.differFBL();
    window.onresize = () =>
      (() => {
        // 监听页面宽高变化
        this.differFBL();
      })();
  },
  methods: {
    filterName(list, name, isFindName) {
      return list.filter(item => isFindName ? (item.name === name) : (item.name !== name));
    },
    // 跳转设备维护
    handleToPage() {
      this.$router.push({ name: "Equipment" });
    },
    // 获取状态
    getstatus() {
      equipmentStatus().then(res => {
        this.isOK = Number(res.data.data.集群.集群);
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
        this.isFullScreen = true;
      } else {
        this.isFullScreen = false;
      }
    },
    // 关闭
    submitForm() {
      this.openDialog = false;
      this.statusModel = "";
      this.activeName = "电气类";
      this.searchList = [];
      this.nameInput = "";
      this.indicatorSource = "I平台";
    },
    clesrSearchList() {
      this.statusModel = "";
      this.activeName = "电气类";
      this.searchList = [];
      this.nameInput = "";
      this.indicatorSource = "I平台";
    },
    clickItem(val, type, titletype) {
      this.dialogType = type;
      if (this.dialogType === "搜索") {
        this.title = "检索结果";
        const queryParams = {
          equipmentName: this.input
        };
        this.searchequipment(queryParams);
      } else if (this.dialogType === "平台") {
        this.title = val.target.innerHTML;
        const queryParams = {
          terrace: this.title,
          type: this.activeName,
          equipmentName: this.nameInput,
          status: this.statusModel
        };
        this.searchequipment(queryParams);
      } else if (this.dialogType === "工作项") {
        this.title = `${titletype}-${val.name}`;
        const queryParams = {
          terrace: titletype, // 平台名
          type: val.name,
          equipmentName: this.nameInput,
          status: this.statusModel
        };
        this.searchequipment(queryParams);
      } else {
        // Flink集群
        this.title = "Flink集群";
        const queryParams = {
          type: this.activeName,
          equipmentName: this.input,
          status: this.statusModel,
          clusterStatus: 1
        };
        this.searchequipment(queryParams);
      }
      this.openDialog = true;
    },
    // 搜索封装
    searchequipment(queryParams) {
      searchequipment(queryParams).then(res => {
        this.searchList = res.data.data;
      });
    },
    // 搜索
    handleQuery() {
      if (this.dialogType === "搜索") {
        const queryParams = {
          terrace: this.title,
          type: this.activeName,
          equipmentName: this.nameInput,
          status: this.statusModel
        };
        this.searchequipment(queryParams);
      } else if (this.dialogType === "平台") {
        const queryParams = {
          terrace: this.title,
          type: this.activeName,
          equipmentName: this.nameInput,
          status: this.statusModel
        };
        this.searchequipment(queryParams);
      } else if (this.dialogType === "工作项") {
        const queryParams = {
          terrace: this.indicatorSource, // 平台名
          type: this.activeName,
          equipmentName: this.nameInput,
          status: this.statusModel
        };
        this.searchequipment(queryParams);
      } else {
        // Flink集群
        const queryParams = {
          type: this.activeName,
          equipmentName: this.nameInput,
          status: this.statusModel,
          clusterStatus: 1
        };
        this.searchequipment(queryParams);
      }
    },
    // 重置
    resetQuery() {
      this.statusModel = "";
      this.activeName = "电气类";
      this.searchList = [];
      this.nameInput = "";
      this.handleQuery();
    },
    // 点击Tab标签
    handleClick() {
      const queryParams = {
        terrace: this.title.includes("平台") ? this.title : undefined,
        type: this.activeName,
        equipmentName: this.nameInput,
        status: this.statusModel,
        clusterStatus: this.title === "Flink集群" ? 1 : undefined
      };
      this.searchequipment(queryParams);
    },
    changeSource(item) {
      this.tabsList = [];
      if (item === "I平台" || item === "FPSO平台") {
        this.tabsList = [
          {
            title: "电气类",
            name: "1"
          },
          {
            title: "机械类",
            name: "2"
          },
          {
            title: "仪表类",
            name: "3"
          },
          {
            title: "其它",
            name: "4"
          },
          {
            title: "视联网平台",
            name: "5"
          }
        ];
      } else {
        this.tabsList = [
          {
            title: "电气类",
            name: "1"
          },
          {
            title: "机械类",
            name: "2"
          },
          {
            title: "仪表类",
            name: "3"
          },
          {
            title: "其它",
            name: "4"
          }
        ];
      }
    }
  }
};
</script>

<style scoped>
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
    background: var(--svg-line-bg);
    border-radius: 4px;
    margin-right: 80px;
  }

  .rightBgStyle {
    width: 890px;
    background: var(--svg-line-bg);
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