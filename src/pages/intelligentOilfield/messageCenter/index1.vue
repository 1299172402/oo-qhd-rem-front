<!-- 后台——消息中心首页 -->
<template>
  <div ref="elRef" class="g-w100 g-h100" style="font-size: 16px; color: #fff">
    <el-dialog
      :title="iframeDialogTitle"
      :visible.sync="openIframeDialog"
      width="1500px"
      append-to-body
      :close-on-click-modal="false"
    >
      <div style="height: 97%">
        <div class="g-w100 g-h100" style="height: 700px">
          <iframe
            :id="'iframe_' + currentIframeObj.id"
            v-postTheme="$store.state.setting.mode"
            :src="addToken(currentIframeObj.url)"
            frameborder="0"
            class="g-w100 g-h100"
          />
        </div>
        <div slot="footer" class="dialog-footer g-row-flex" style="margin-top: 10px">
          <el-button type="primary" @click="openIframeDialog = false">
            关 闭
          </el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="openDialog"
      width="650px"
      append-to-body
      :close-on-click-modal="false"
    >
      <div style="height: 93%">
        <div class="g-w100 g-h100" style="height: 450px">
          <div class="g-w100 g-h100" style="position: relative">
            <div
              class="g-row-flex-HV"
              style="margin: 0 auto"
              :class="findDataByPoint('Clouds_IOT', 'class')"
              @click="clickClouds"
            >
              云端物联网平台
            </div>
            <div class="g-row-flex-HV" style="margin-top: 280px">
              <div
                class="mainSize g-column-flex-HV"
                :class="[
                  getDataStatus('CEPJ', 'class'),
                  findDataByCode('CEPJ')?.terraceShowUrl ? 'pointerCursor' : 'autoCursor',
                ]"
                @click="openNewLink(findDataByCode('CEPJ')?.terraceShowUrl)"
              >
                <div class="mainSizeRedBg" :class="[getDataStatusMain('CEPJ')]" />
                {{ findDataByCode("CEPJ")?.terraceName }}
              </div>
              <div
                class="mainSize g-column-flex-HV"
                style="margin: 0 80px"
                :class="[
                  getDataStatus('FPSO', 'class'),
                  findDataByCode('FPSO')?.terraceShowUrl ? 'pointerCursor' : 'autoCursor',
                ]"
                @click="openNewLink(findDataByCode('FPSO')?.terraceShowUrl)"
              >
                <div class="mainSizeRedBg" :class="[getDataStatusMain('FPSO')]" />
                {{ findDataByCode("FPSO")?.terraceName }}
              </div>
              <div
                class="mainSize g-column-flex-HV"
                :class="[
                  getDataStatus('CEPI', 'class'),
                  findDataByCode('CEPI')?.terraceShowUrl ? 'pointerCursor' : 'autoCursor',
                ]"
                @click="openNewLink(findDataByCode('CEPI')?.terraceShowUrl)"
              >
                <div class="mainSizeRedBg" :class="[getDataStatusMain('CEPI')]" />
                {{ findDataByCode("CEPI")?.terraceName }}
              </div>
            </div>
            <!-- Maritime_FPSO -  Clouds_IOT-->
            <line-svg
              linear-id="Maritime_FPSO_Clouds_IOT"
              :start-color="findDataByLink('Maritime_FPSO', 'Clouds_IOT')"
              :end-color="findDataByLink('Maritime_FPSO', 'Clouds_IOT')"
              class="svgClass"
              :class="[
                findDataByStartAndEnd('Maritime_FPSO', 'Clouds_IOT')?.pointShowUrl ? 'pointerCursor' : 'autoCursor',
              ]"
              style="left: 270px; top: 45px"
              div-stroke-width="6"
              ball-stroke-width="5"
              svg-width="50px"
              svg-height="286px"
              set-points="25,286 25,0 26,0"
              @click-line="openPointsLink(findDataByStartAndEnd('Maritime_FPSO', 'Clouds_IOT')?.pointShowUrl)"
            />

            <!-- Maritime_CEPJ -  Clouds_IOT-->
            <line-svg
              linear-id="Maritime_CEPJ_Clouds_IOT"
              :start-color="findDataByLink('Maritime_CEPJ', 'Clouds_IOT')"
              :end-color="findDataByLink('Maritime_CEPJ', 'Clouds_IOT')"
              class="svgClass"
              :class="[
                findDataByStartAndEnd('Maritime_CEPJ', 'Clouds_IOT')?.pointShowUrl ? 'pointerCursor' : 'autoCursor',
              ]"
              style="left: 120px; top: 44px"
              div-stroke-width="6"
              ball-stroke-width="5"
              svg-width="130px"
              svg-height="286px"
              set-points="10,286 10,115 120,115 120,0"
              @click-line="openPointsLink(findDataByStartAndEnd('Maritime_CEPJ', 'Clouds_IOT')?.pointShowUrl)"
            />
            <!-- Maritime_CEPI -  Clouds_IOT-->
            <line-svg
              linear-id="Maritime_CEPI_Clouds_IOT"
              :start-color="findDataByLink('Maritime_CEPI', 'Clouds_IOT')"
              :end-color="findDataByLink('Maritime_CEPI', 'Clouds_IOT')"
              class="svgClass"
              :class="[
                findDataByStartAndEnd('Maritime_CEPI', 'Clouds_IOT')?.pointShowUrl ? 'pointerCursor' : 'autoCursor',
              ]"
              style="left: 340px; top: 44px"
              div-stroke-width="6"
              ball-stroke-width="5"
              svg-width="130px"
              svg-height="286px"
              set-points="120,286 120,115 10,115 10,0"
              @click-line="openPointsLink(findDataByStartAndEnd('Maritime_CEPI', 'Clouds_IOT')?.pointShowUrl)"
            />
          </div>
        </div>
        <div slot="footer" class="dialog-footer g-row-flex">
          <el-button type="primary" @click="submitForm">
            关 闭
          </el-button>
        </div>
      </div>
    </el-dialog>
    <page-panel-new
      class="g-w100 g-column-flex"
      style="height: calc(100% - 0px);"
    >
      <div class="g-row-flex" style="justify-content: flex-end">
        <el-select v-model="zuhuModel" placeholder="请选择" clearable>
          <el-option
            v-for="item in zuhuOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div
        v-show="zuhuModel === '秦皇岛作业公司'"
        style="height: 100%; position: relative"
        class="g-column-flex-H"
      >
        <!-- TODO: Maybe change back -->
        <!-- <el-button style="position: absolute; top: -33px; left: 0" type="primary" @click="handleToPage()">
          信息维护
        </el-button> -->
        <el-button
          style="position: absolute; top: -33px; left: 0"
          type="primary"
          @click="openIframeDialogMethods(ifameList[0])"
        >
          {{ ifameList[0].name }}
        </el-button>
        <el-button
          style="position: absolute; top: -33px; left: 110px"
          type="primary"
          @click="openIframeDialogMethods(ifameList[1])"
        >
          {{ ifameList[1].name }}
        </el-button>
        <div style="position: absolute; right: 0; color: var(--old-blue-color)">
          <!-- TODO: Maybe change back -->
          <!-- {{ $store.getters["user/tenantName"] }} -->
          <!-- 秦皇岛作业公司 -->
        </div>
        <div
          id="mainContainer"
          style="width: 100%;height: 100%;margin-right: 76px;"
          class="g-column-flex-H"
          :style="{marginTop: linkMarginTop + 'px'}"
        >
          <div class="topImage g-row-flex-HV" style="position: relative; margin-top: 10px">
            <div
              class="g-row-flex-HV greenBg"
              :class="[findDataByStartAndEnd('Msg', 'Msg')?.pointShowUrl ? 'pointerCursor' : 'autoCursor']"
              @click="openPointsLink(findDataByStartAndEnd('Msg', 'Msg')?.pointShowUrl)"
            >
              消息中心
            </div>
            <!-- TODO: Maybe change back -->
            <!-- <div class="absoultePos" style="left: 199px; top: -10px">
              大数据服务 (restful)
            </div> -->
            <div class="absoultePos" style="left: 230px; top: 36px">
              监控数据
            </div>

            <!-- BigData_Apps - Msg-->
            <line-svg
              linear-id="BigData_Apps_Msg"
              :start-color="findDataByLink('BigData_Apps', 'Msg')"
              :end-color="findDataByLink('BigData_Apps', 'Msg')"
              :class="[findDataByStartAndEnd('BigData_Apps', 'Msg')?.pointShowUrl ? 'pointerCursor' : 'autoCursor']"
              class="svgClass"
              style="left: 199px; top: 11px; z-index: 1 !important"
              div-stroke-width="6"
              ball-stroke-width="5"
              svg-width="125px"
              svg-height="30px"
              set-points="125,15 0,15 0,16"
              @click-line="openPointsLink(findDataByStartAndEnd('BigData_Apps', 'Msg')?.pointShowUrl)"
            />
            <div
              class="g-row-flex-HV yellowBg"
              :class="[findDataByStartAndEnd('Alarm', 'Alarm')?.pointShowUrl ? 'pointerCursor' : 'autoCursor']"
              style="margin-left: 455px"
              @click="openPointsLink(findDataByStartAndEnd('Alarm', 'Alarm')?.pointShowUrl)"
            >
              报警中心
            </div>
            <!-- TODO: Maybe change back -->
            <!-- <div class="absoultePos" style="left: 529px; top: -10px">
              大数据服务 (socket)
            </div> -->
            <div class="absoultePos" style="left: 569px; top: 36px">
              报警数据
            </div>
            <!-- BigData_Apps - Alarm-->
            <line-svg
              linear-id="BigData_Apps_Alarm"
              :start-color="findDataByLink('BigData_Apps', 'Alarm')"
              :end-color="findDataByLink('BigData_Apps', 'Alarm')"
              class="svgClass"
              :class="[findDataByStartAndEnd('BigData_Apps', 'Alarm')?.pointShowUrl ? 'pointerCursor' : 'autoCursor']"
              style="left: 531px; top: 11px; z-index: 1 !important"
              div-stroke-width="6"
              ball-stroke-width="5"
              svg-width="125px"
              svg-height="30px"
              set-points="0,15 123,15 123,16"
              @click-line="openPointsLink(findDataByStartAndEnd('BigData_Apps', 'Alarm')?.pointShowUrl)"
            />
          </div>
          <div class="topImage1 g-row-flex-HV" style="position: relative; margin-top: -50px">
            <div
              class="g-row-flex-HV"
              :class="[
                findDataByPoint('BigData_Apps', 'class'),
                findDataByStartAndEnd('BigData_Apps', 'Alarm')?.pointShowUrl ? 'pointerCursor' : 'autoCursor',
              ]"
              @click="openPointsLink(findDataByStartAndEnd('BigData_Apps', 'BigData_Apps')?.pointShowUrl)"
            >
              大数据应用
            </div>
            <!-- BigData_Aggs -  BigData_Apps-->
            <line-svg
              linear-id="BigData_Aggs_BigData_Apps"
              :start-color="findDataByLink('BigData_Aggs', 'BigData_Apps')"
              :end-color="findDataByLink('BigData_Aggs', 'BigData_Apps')"
              :class="[
                findDataByStartAndEnd('BigData_Aggs', 'BigData_Apps')?.pointShowUrl ? 'pointerCursor' : 'autoCursor',
              ]"
              class="svgClass"
              style="left: 335px; top: 48px"
              div-stroke-width="6"
              ball-stroke-width="5"
              svg-width="100px"
              svg-height="57px"
              set-points="50,255 50,0 51,0"
              @click-line="openPointsLink(findDataByStartAndEnd('BigData_Aggs', 'BigData_Apps')?.pointShowUrl)"
            />
          </div>
          <div class="topImage1 g-row-flex-HV" style="position: relative">
            <div
              class="g-row-flex-HV"
              :class="[
                findDataByPoint('BigData_Aggs', 'class'),
                findDataByStartAndEnd('BigData_Aggs', 'Alarm')?.pointShowUrl ? 'pointerCursor' : 'autoCursor',
              ]"
              @click="openPointsLink(findDataByStartAndEnd('BigData_Aggs', 'BigData_Aggs')?.pointShowUrl)"
            >
              大数据聚合
            </div>
            <!-- BigData -  BigData_Aggs-->
            <line-svg
              linear-id="Queue_BigData"
              :start-color="findDataByLink('BigData', 'BigData_Aggs')"
              :end-color="findDataByLink('BigData', 'BigData_Aggs')"
              :class="[findDataByStartAndEnd('BigData', 'BigData_Aggs')?.pointShowUrl ? 'pointerCursor' : 'autoCursor']"
              class="svgClass"
              style="left: 335px; top: 48px"
              div-stroke-width="6"
              ball-stroke-width="5"
              svg-width="100px"
              svg-height="57px"
              set-points="50,255 50,0 51,0"
              @click-line="openPointsLink(findDataByStartAndEnd('BigData', 'BigData_Aggs')?.pointShowUrl)"
            />
          </div>
          <div class="topImage1 g-row-flex-HV" style="position: relative">
            <div
              class="g-row-flex-HV"
              :class="[
                findDataByPoint('BigData', 'class'),
                findDataByStartAndEnd('BigData', 'Alarm')?.pointShowUrl ? 'pointerCursor' : 'autoCursor',
              ]"
              @click="openPointsLink(findDataByStartAndEnd('BigData', 'BigData')?.pointShowUrl)"
            >
              大数据处理
            </div>
            <div class="absoultePos" style="left: 245px; top: 65px">
              大数据服务(Flink)
            </div>
            <div class="absoultePos" style="left: 400px; top: 65px">
              实时数据，报警数据
            </div>
            <!-- Queue -  BigData-->
            <line-svg
              linear-id="Queue_BigData"
              :start-color="findDataByLink('Queue', 'BigData')"
              :end-color="findDataByLink('Queue', 'BigData')"
              :class="[findDataByStartAndEnd('Queue', 'BigData')?.pointShowUrl ? 'pointerCursor' : 'autoCursor']"
              class="svgClass"
              style="left: 335px; top: 48px"
              div-stroke-width="6"
              ball-stroke-width="5"
              svg-width="100px"
              svg-height="57px"
              set-points="50,255 50,0 51,0"
              @click-line="openPointsLink(findDataByStartAndEnd('Queue', 'BigData')?.pointShowUrl)"
            />
          </div>
          <div class="centerImage g-row-flex-HV" style="position: relative">
            <div
              class="g-row-flex-HV"
              :class="[
                findDataByPoint('Queue', 'class'),
                findDataByStartAndEnd('Queue', 'Queue')?.pointShowUrl ? 'pointerCursor' : 'autoCursor',
              ]"
              @click="openPointsLink(findDataByStartAndEnd('Queue', 'Queue')?.pointShowUrl)"
            >
              消息队列
            </div>
            <!-- 数据湖 -->
            <div
              class="kuduClass g-row-flex-HV"
              :class="[
                findDataByPoint('Kudu', 'class'),
                findDataByStartAndEnd('Kudu', 'Kudu')?.pointShowUrl ? 'pointerCursor' : 'autoCursor',
              ]"
              @click="openPointsLink(findDataByStartAndEnd('Kudu', 'Kudu')?.pointShowUrl)"
            >
              数据湖
            </div>
            <div class="absoultePos" style="left: 600px; top: 2px">
              大数据服务(Flink)
            </div>
            <div class="absoultePos" style="left: 593px; top: 47px">
              实时数据，报警数据
            </div>
            <!-- Queue -  Kudu-->
            <line-svg
              linear-id="Queue_Kudu"
              :start-color="findDataByLink('Queue', 'Kudu')"
              :end-color="findDataByLink('Queue', 'Kudu')"
              class="svgClass"
              :class="[findDataByStartAndEnd('Queue', 'Kudu')?.pointShowUrl ? 'pointerCursor' : 'autoCursor']"
              style="left: 593px; top: 21px"
              div-stroke-width="6"
              ball-stroke-width="5"
              svg-width="133"
              svg-height="30"
              set-points="0,14 0,15 133,15"
              @click-line="openPointsLink(findDataByStartAndEnd('Queue', 'Kudu')?.pointShowUrl)"
            />

            <!-- 云端物联网平台 -->
            <div
              class="kuduClass g-row-flex-HV"
              style="left: 42px; cursor: pointer; z-index: 1"
              :class="findDataByPoint('Clouds_IOT', 'class')"
              @click="clickClouds"
            >
              云端物联网平台
            </div>
            <div class="absoultePos" style="left: 281px; top: 2px">
              大数据服务
            </div>
            <div class="absoultePos" style="left: 256px; top: 47px">
              实时数据，报警数据
            </div>
            <!-- Clouds_IOT -  Queue-->
            <line-svg
              linear-id="Clouds_IOT_Queue"
              :start-color="findDataByLink('Clouds_IOT', 'Queue')"
              :end-color="findDataByLink('Clouds_IOT', 'Queue')"
              class="svgClass"
              :class="[findDataByStartAndEnd('Clouds_IOT', 'Queue')?.pointShowUrl ? 'pointerCursor' : 'autoCursor']"
              style="left: 254px; top: 21px"
              div-stroke-width="6"
              ball-stroke-width="5"
              svg-width="133"
              svg-height="30"
              set-points="0,14 0,15 133,15"
              @click-line="openPointsLink(findDataByStartAndEnd('Clouds_IOT', 'Queue')?.pointShowUrl)"
            />
          </div>
          <div class="bottomImage g-row-flex-HV" style="position: relative">
            <div class="absoultePos" style="left: 169px; top: 182px">
              物联网ETL
            </div>
            <div class="absoultePos" style="left: 265px; top: 182px">
              实时数据，报警数据
            </div>
            <div class="absoultePos" style="left: 664px; top: 199px">
              物联网ETL
            </div>
            <div class="absoultePos" style="left: 915px; top: 109px">
              物联网ETL
            </div>
            <div class="absoultePos" style="left: 887px; top: 155px">
              实时数据，报警数据
            </div>
            <!-- 一整条线 -->
            <!-- Maritime_FPSO -  Clouds_IOT-->
            <line-svg
              linear-id="Maritime_FPSO_Clouds_IOT1"
              :start-color="findDataByLink('Maritime_FPSO', 'Clouds_IOT')"
              :end-color="findDataByLink('Maritime_FPSO', 'Clouds_IOT')"
              class="svgClass"
              :class="[
                findDataByStartAndEnd('Maritime_FPSO', 'Clouds_IOT')?.pointShowUrl ? 'pointerCursor' : 'autoCursor',
              ]"
              style="left: 635px; top: 174px; z-index: 1 !important"
              div-stroke-width="6"
              ball-stroke-width="5"
              svg-width="30px"
              svg-height="94px"
              set-points="15,94 15,0 16,0"
              @click-line="openPointsLink(findDataByStartAndEnd('Maritime_FPSO', 'Clouds_IOT')?.pointShowUrl)"
            />
            <line-svg
              linear-id="Maritime_FPSO_Clouds_IOT2"
              :start-color="findDataByLink('Maritime_FPSO', 'Clouds_IOT')"
              :end-color="findDataByLink('Maritime_FPSO', 'Clouds_IOT')"
              class="svgClass"
              :class="[
                findDataByStartAndEnd('Maritime_FPSO', 'Clouds_IOT')?.pointShowUrl ? 'pointerCursor' : 'autoCursor',
              ]"
              style="left: 301px; top: 162px; z-index: 1 !important"
              div-stroke-width="6"
              ball-stroke-width="5"
              svg-width="363px"
              svg-height="25px"
              set-points="346,16 346,15 0,15"
              @click-line="openPointsLink(findDataByStartAndEnd('Maritime_FPSO', 'Clouds_IOT')?.pointShowUrl)"
            />
            <line-svg
              linear-id="Maritime_FPSO_Clouds_IOT3"
              :start-color="findDataByLink('Maritime_FPSO', 'Clouds_IOT')"
              :end-color="findDataByLink('Maritime_FPSO', 'Clouds_IOT')"
              class="svgClass"
              :class="[
                findDataByStartAndEnd('Maritime_FPSO', 'Clouds_IOT')?.pointShowUrl ? 'pointerCursor' : 'autoCursor',
              ]"
              style="left: 291px; top: 92px; z-index: 1 !important"
              div-stroke-width="6"
              ball-stroke-width="5"
              svg-width="20px"
              svg-height="95px"
              set-points="10,88 10,0 11,0"
              @click-line="openPointsLink(findDataByStartAndEnd('Maritime_FPSO', 'Clouds_IOT')?.pointShowUrl)"
            />
            <!-- 带!号小报警 -->
            <!-- TODO: Maybe change back -->
            <!-- <div v-if="findDataByStartAndEnd('Maritime_FPSO', 'Clouds_IOT')?.runningStatus === '0'">
              <div class="alarmPromptMessage" style="left: 641px; top: 184px">
                !
              </div>
              <svg style="width: 150px; height: 52px; position: absolute; left: 495px; top: 200px">
                <polyline points="150,0 105,40 0,40" style="fill: none; stroke: var(--old-red-color); stroke-width: 1" />
              </svg>
              <div class="warnText" style="left: 500px; top: 215px">
                系统故障：{{ findDataByStartAndEnd('Maritime_FPSO', 'Clouds_IOT').damageCount }}/{{ findDataByStartAndEnd('Maritime_FPSO', 'Clouds_IOT').allCount }}
              </div>
            </div> -->
            <div class="leftSystem g-h100">
              <div class="g-w100" style="position: relative; margin-left: 72%; margin-top: 70px">
                <!-- CEPJ -->
                <!-- 带!号小报警 -->
                <div v-if="findDataByCode('CEPJ')?.runningStatus === '0'">
                  <div class="alarmPromptMessage" style="left: 95px; top: -10px">
                    !
                  </div>
                  <svg
                    style="background: transparent; width: 140px; height: 52px; position: absolute; left: 110px; top: -45px"
                  >
                    <polyline points="0,40 35,5 150,5" style="fill: none; stroke: var(--old-red-color); stroke-width: 1" />
                  </svg>
                  <div class="warnText" style="left: 122px; top: -65px; width: 125px;text-align: center;">
                    系统故障：{{ findDataByCode('CEPJ').damageCount }}/{{ findDataByCode('CEPJ').allCount }}
                  </div>
                </div>
                <div
                  class="mainSize g-column-flex-HV"
                  :class="[
                    getDataStatus('CEPJ', 'class'),
                    findDataByCode('CEPJ')?.terraceShowUrl ? 'pointerCursor' : 'autoCursor',
                  ]"
                  @click="openNewLink(findDataByCode('CEPJ')?.terraceShowUrl)"
                >
                  <div class="mainSizeRedBg" :class="[getDataStatusMain('CEPJ')]" />
                  {{ findDataByCode("CEPJ")?.terraceName }}
                </div>
                <!-- WHPA -->
                <!-- 带!号小报警 -->
                <div v-if="findDataByCode('WHPA')?.runningStatus === '0'">
                  <div class="alarmPromptMessage" style="left: -180px; top: -80px">
                    !
                  </div>
                  <svg
                    style="background: transparent; width: 140px; height: 52px; position: absolute; left: -310px; top: -80px"
                  >
                    <polyline points="150,0 105,40 0,40" style="fill: none; stroke: var(--old-red-color); stroke-width: 1" />
                  </svg>
                  <div class="warnText" style="left: -315px; top: -65px; width: 125px; text-align: center;">
                    系统故障：{{ findDataByCode('WHPA').damageCount }}/{{ findDataByCode('WHPA').allCount }}
                  </div>
                </div>
                <div
                  class="g-column-flex-HV"
                  :class="[
                    getDataStatus('WHPA', 'class'),
                    findDataByCode('WHPA')?.terraceShowUrl ? 'pointerCursor' : 'autoCursor',
                  ]"
                  style="position: absolute; left: -175px; top: -73px"
                  @click="openNewLink(findDataByCode('WHPA')?.terraceShowUrl)"
                >
                  <div class="smallRedBg" :class="[getSmallSignStatus('WHPA')]" />
                  <span>
                    {{ findDataByCode("WHPA")?.terraceName }}
                  </span>
                  <line-svg
                    :linear-id="findDataByCode('WHPA')?.terraceCode"
                    :start-color="getDataStatus('WHPA', 'color')"
                    :end-color="getDataStatus('WHPA', 'color')"
                    class="svgClass"
                    :class="[findDataByCode('WHPA')?.terraceShowUrl ? 'pointerCursor' : 'autoCursor']"
                    style="top: 22px; left: 79px"
                    div-stroke-width="6"
                    ball-stroke-width="5"
                    svg-width="125px"
                    svg-height="50px"
                    set-points="0,15 115,15 115,50"
                    @click-line="openNewLink(findDataByCode('WHPA')?.terraceShowUrl)"
                  />
                </div>
                <!-- WHPE -->
                <!-- 带!号小报警 -->
                <div v-if="findDataByCode('WHPE')?.runningStatus === '0'">
                  <div class="alarmPromptMessage" style="left: -211px; top: 8px">
                    !
                  </div>
                  <svg
                    style="background: transparent; width: 140px; height: 52px; position: absolute; left: -349px; top: 16px"
                  >
                    <polyline points="150,0 105,40 0,40" style="fill: none; stroke: var(--old-red-color); stroke-width: 1" />
                  </svg>
                  <div class="warnText" style="left: -359px; top: 32px; width: 125px;text-align: center;">
                    系统故障：{{ findDataByCode('WHPE').damageCount }}/{{ findDataByCode('WHPE').allCount }}
                  </div>
                </div>
                <div
                  class="g-column-flex-HV"
                  :class="[
                    getDataStatus('WHPE', 'class'),
                    findDataByCode('WHPE')?.terraceShowUrl ? 'pointerCursor' : 'autoCursor',
                  ]"
                  style="position: absolute; left: -204px; top: 17px"
                  @click="openNewLink(findDataByCode('WHPE')?.terraceShowUrl)"
                >
                  <div class="smallRedBg" :class="[getSmallSignStatus('WHPE')]" />
                  <span>
                    {{ findDataByCode("WHPE")?.terraceName }}
                  </span>
                  <line-svg
                    :linear-id="findDataByCode('WHPE')?.terraceCode"
                    :start-color="getDataStatus('WHPE', 'color')"
                    :end-color="getDataStatus('WHPE', 'color')"
                    class="svgClass"
                    :class="[findDataByCode('WHPE')?.terraceShowUrl ? 'pointerCursor' : 'autoCursor']"
                    style="top: 25px; left: 79px"
                    div-stroke-width="6"
                    ball-stroke-width="5"
                    svg-width="126px"
                    svg-height="20px"
                    set-points="0,11 0,10 125,10"
                    @click-line="openNewLink(findDataByCode('WHPE')?.terraceShowUrl)"
                  />
                </div>
                <!-- WHPF -->
                <!-- 带!号小报警 -->
                <div v-if="findDataByCode('WHPF')?.runningStatus === '0'">
                  <div class="alarmPromptMessage" style="left: 300px; top: 88px">
                    !
                  </div>
                  <svg
                    style="background: transparent; width: 140px; height: 52px; position: absolute; left: 310px; top: 100px"
                  >
                    <polyline points="0,0 35,40 150,40" style="fill: none; stroke: var(--old-red-color); stroke-width: 1" />
                  </svg>
                  <div class="warnText" style="left: 332px; top: 117px; width: 125px;text-align: center;">
                    系统故障：{{ findDataByCode('WHPF').damageCount }}/{{ findDataByCode('WHPF').allCount }}
                  </div>
                </div>
                <div
                  class="g-column-flex-HV"
                  :class="[
                    getDataStatus('WHPF', 'class'),
                    findDataByCode('WHPF')?.terraceShowUrl ? 'pointerCursor' : 'autoCursor',
                  ]"
                  style="position: absolute; left: 230px; top: 17px"
                  @click="openNewLink(findDataByCode('WHPF')?.terraceShowUrl)"
                >
                  <div class="smallRedBg" :class="[getSmallSignStatus('WHPF')]" />
                  <span>
                    {{ findDataByCode("WHPF")?.terraceName }}
                  </span>
                  <line-svg
                    :linear-id="findDataByCode('WHPF')?.terraceCode"
                    :start-color="getDataStatus('WHPF', 'color')"
                    :end-color="getDataStatus('WHPF', 'color')"
                    class="svgClass"
                    :class="[findDataByCode('WHPF')?.terraceShowUrl ? 'pointerCursor' : 'autoCursor']"
                    style="left: -125px; top: 25px"
                    div-stroke-width="6"
                    ball-stroke-width="5"
                    svg-width="126px"
                    svg-height="20px"
                    set-points="125,10 0,10 0,11"
                    @click-line="openNewLink(findDataByCode('WHPF')?.terraceShowUrl)"
                  />
                </div>
                <!-- CEPL -->
                <!-- 带!号小报警 -->
                <div v-if="findDataByCode('CEPL')?.runningStatus === '0'">
                  <div class="alarmPromptMessage" style="left: -181px; top: 100px">
                    !
                  </div>
                  <svg
                    style="background: transparent; width: 140px; height: 52px; position: absolute; left: -314px; top: 106px"
                  >
                    <polyline points="150,0 105,40 0,40" style="fill: none; stroke: var(--old-red-color); stroke-width: 1" />
                  </svg>
                  <div class="warnText" style="left: -329px; top: 124px; width: 125px;text-align: center;">
                    系统故障：{{ findDataByCode('CEPL').damageCount }}/{{ findDataByCode('CEPL').allCount }}
                  </div>
                </div>
                <div
                  class="g-column-flex-HV"
                  :class="[
                    getDataStatus('CEPL', 'class'),
                    findDataByCode('CEPL')?.terraceShowUrl ? 'pointerCursor' : 'autoCursor',
                  ]"
                  style="position: absolute; left: -175px; top: 107px;"
                  @click="openNewLink(findDataByCode('CEPL')?.terraceShowUrl)"
                >
                  <div class="smallRedBg" :class="[getSmallSignStatus('CEPL')]" />
                  <span>
                    {{ findDataByCode("CEPL")?.terraceName }}
                  </span>
                  <line-svg
                    :linear-id="findDataByCode('CEPL')?.terraceCode"
                    :start-color="getDataStatus('CEPL', 'color')"
                    :end-color="getDataStatus('CEPL', 'color')"
                    class="svgClass"
                    :class="[findDataByCode('CEPL')?.terraceShowUrl ? 'pointerCursor' : 'autoCursor']"
                    style="top: -3px; left: 79px"
                    div-stroke-width="6"
                    ball-stroke-width="5"
                    svg-width="125px"
                    svg-height="50px"
                    set-points="0,40 115,40 115,0"
                    @click-line="openNewLink(findDataByCode('CEPL')?.terraceShowUrl)"
                  />
                </div>
                <!-- EPP -->
                <!-- 带!号小报警 -->
                <div v-if="findDataByCode('EPP')?.runningStatus === '0'">
                  <div class="alarmPromptMessage" style="left: 270px; top: 176px">
                    !
                  </div>
                  <svg
                    style="background: transparent; width: 140px; height: 52px; position: absolute; left: 275px; top: 183px"
                  >
                    <polyline points="0,0 35,40 150,40" style="fill: none; stroke: var(--old-red-color); stroke-width: 1" />
                  </svg>
                  <div class="warnText" style="left: 299px; top: 200px; width: 125px;text-align: center;">
                    系统故障：{{ findDataByCode('EPP').damageCount }}/{{ findDataByCode('EPP').allCount }}
                  </div>
                </div>
                <div
                  class="g-column-flex-HV"
                  :class="[
                    getDataStatus('EPP', 'class'),
                    findDataByCode('EPP')?.terraceShowUrl ? 'pointerCursor' : 'autoCursor',
                  ]"
                  style="position: absolute; left: 203px; top: 107px"
                  @click="openNewLink(findDataByCode('EPP')?.terraceShowUrl)"
                >
                  <div class="smallRedBg" :class="[getSmallSignStatus('EPP')]" />
                  <span>
                    {{ findDataByCode("EPP")?.terraceName }}
                  </span>
                  <line-svg
                    :linear-id="findDataByCode('EPP')?.terraceCode"
                    :start-color="getDataStatus('EPP', 'color')"
                    :end-color="getDataStatus('EPP', 'color')"
                    class="svgClass"
                    :class="[findDataByCode('EPP')?.terraceShowUrl ? 'pointerCursor' : 'autoCursor']"
                    style="left: -126px; top: -3px"
                    div-stroke-width="6"
                    ball-stroke-width="5"
                    svg-width="125px"
                    svg-height="50px"
                    set-points="125,40 10,40 10,0"
                    @click-line="openNewLink(findDataByCode('EPP')?.terraceShowUrl)"
                  />
                </div>
              </div>
            </div>
            <!-- Maritime_CEPJ - Clouds_IOT -->
            <!-- 带!号小报警 -->
            <!-- TODO: Maybe change back -->
            <!-- <div v-if="findDataByStartAndEnd('Maritime_CEPJ', 'Clouds_IOT')?.runningStatus === '0'">
              <div class="alarmPromptMessage">
                !
              </div>
              <svg style="width: 150px; height: 52px; position: absolute; left: 100px; top: 124px">
                <polyline points="150,0 105,40 0,40" style="fill: none; stroke: var(--old-red-color); stroke-width: 1" />
              </svg>
              <div class="warnText">
                系统故障：{{ findDataByStartAndEnd('Maritime_CEPJ', 'Clouds_IOT').damageCount }}/{{ findDataByStartAndEnd('Maritime_CEPJ', 'Clouds_IOT').allCount }}
              </div>
            </div> -->
            <!-- 一整条线 -->
            <line-svg
              linear-id="Maritime_CEPJ_Clouds_IOT1"
              :start-color="findDataByLink('Maritime_CEPJ', 'Clouds_IOT')"
              :end-color="findDataByLink('Maritime_CEPJ', 'Clouds_IOT')"
              class="svgClass"
              :class="[
                findDataByStartAndEnd('Maritime_CEPJ', 'Clouds_IOT')?.pointShowUrl ? 'pointerCursor' : 'autoCursor',
              ]"
              style="left: 240px; top: 90px"
              div-stroke-width="6"
              ball-stroke-width="5"
              svg-width="20px"
              svg-height="180px"
              set-points="10,180 10,0 11,0"
              @click-line="openPointsLink(findDataByStartAndEnd('Maritime_CEPJ', 'Clouds_IOT')?.pointShowUrl)"
            />
            <!-- FPSO -->
            <!-- 带!号小报警 -->
            <div v-if="findDataByCode('FPSO')?.runningStatus === '0'">
              <div class="alarmPromptMessage" style="left: 588px; top: 262px">
                !
              </div>
              <svg
                style="background: transparent; width: 140px; height: 52px; position: absolute; left: 450px; top: 235px"
              >
                <polyline points="150,40 105,5 0,5" style="fill: none; stroke: var(--old-red-color); stroke-width: 1" />
              </svg>
              <div class="warnText" style="left: 440px; top: 216px; width: 125px;text-align: center;">
                系统故障：{{ findDataByCode('FPSO').damageCount }}/{{ findDataByCode('FPSO').allCount }}
              </div>
            </div>
            <div class="centerSystem g-w100 g-h100">
              <div class="g-w100" style="position: relative; margin-left: 43%; margin-top: 70px">
                <div
                  class="mainSize g-column-flex-HV"
                  :class="[
                    getDataStatus('FPSO', 'class'),
                    findDataByCode('FPSO')?.terraceShowUrl ? 'pointerCursor' : 'autoCursor',
                  ]"
                  @click="openNewLink(findDataByCode('FPSO')?.terraceShowUrl)"
                >
                  <div class="mainSizeRedBg" :class="[getDataStatusFPSO('FPSO')]" />
                  {{ findDataByCode("FPSO")?.terraceName }}
                </div>
              </div>
            </div>
            <!-- Maritime_CEPI -  Clouds_IOT-->
            <!-- 一整条线 -->
            <line-svg
              linear-id="Maritime_CEPI_Clouds_IOT1"
              :start-color="findDataByLink('Maritime_CEPI', 'Clouds_IOT')"
              :end-color="findDataByLink('Maritime_CEPI', 'Clouds_IOT')"
              class="svgClass"
              :class="[
                findDataByStartAndEnd('Maritime_CEPI', 'Clouds_IOT')?.pointShowUrl ? 'pointerCursor' : 'autoCursor',
              ]"
              style="left: 340px; top: 80px"
              div-stroke-width="6"
              ball-stroke-width="5"
              svg-width="20px"
              svg-height="73px"
              set-points="10,65 10,15 11,15"
              @click-line="openPointsLink(findDataByStartAndEnd('Maritime_CEPI', 'Clouds_IOT')?.pointShowUrl)"
            />
            <!-- 顶部线 -->
            <line-svg
              linear-id="Maritime_CEPI_Clouds_IOT2"
              :start-color="findDataByLink('Maritime_CEPI', 'Clouds_IOT')"
              :end-color="findDataByLink('Maritime_CEPI', 'Clouds_IOT')"
              class="svgClass"
              :class="[
                findDataByStartAndEnd('Maritime_CEPI', 'Clouds_IOT')?.pointShowUrl ? 'pointerCursor' : 'autoCursor',
              ]"
              style="left: 346px; top: 128px"
              div-stroke-width="6"
              ball-stroke-width="5"
              svg-width="822px"
              svg-height="25px"
              set-points="822,16 822,15 7,15"
              @click-line="openPointsLink(findDataByStartAndEnd('Maritime_CEPI', 'Clouds_IOT')?.pointShowUrl)"
            />
            <!-- 右侧线 -->
            <line-svg
              linear-id="Maritime_CEPI_Clouds_IOT3"
              :start-color="findDataByLink('Maritime_CEPI', 'Clouds_IOT')"
              :end-color="findDataByLink('Maritime_CEPI', 'Clouds_IOT')"
              class="svgClass"
              :class="[
                findDataByStartAndEnd('Maritime_CEPI', 'Clouds_IOT')?.pointShowUrl ? 'pointerCursor' : 'autoCursor',
              ]"
              style="left: 1157px; top: 128px; z-index: 1 !important"
              div-stroke-width="6"
              ball-stroke-width="5"
              svg-width="20px"
              svg-height="140px"
              set-points="10,140 11,15 10,15"
              @click-line="openPointsLink(findDataByStartAndEnd('Maritime_CEPI', 'Clouds_IOT')?.pointShowUrl)"
            />
            <!-- 带!号小报警 -->
            <!-- TODO: Maybe change back -->
            <!-- <div v-if="findDataByStartAndEnd('Maritime_CEPI', 'Clouds_IOT')?.runningStatus === '0'">
              <div class="alarmPromptMessage" style="left: 1157px; top: 134px">
                !
              </div>
              <svg
                style="background: transparent; width: 140px; height: 52px; position: absolute; left: 1170px; top: 144px"
              >
                <polyline points="0,0 45,50 150,50" style="fill: none; stroke: var(--old-red-color); stroke-width: 1" />
              </svg>
              <div class="warnText" style="left: 1218px; top: 171px; width: 200px">
                系统故障：{{ findDataByStartAndEnd('Maritime_CEPI', 'Clouds_IOT').damageCount }}/{{ findDataByStartAndEnd('Maritime_CEPI', 'Clouds_IOT').allCount }}
              </div>
            </div> -->
            <!-- CEPI -->
            <!-- :style="{ height: isFullScreen ? '990px' : '530px' }" -->
            <!-- 带!号小报警 -->
            <div v-if="findDataByCode('CEPI')?.runningStatus === '0'">
              <div class="alarmPromptMessage" style="left: 1158px; top: 362px">
                !
              </div>
              <svg
                style="width: 30px; height: 80px; position: absolute; left: 1153px; top: 372px"
              >
                <polyline points="15,0 15,80" style="fill: none; stroke: var(--old-red-color); stroke-width: 1" />
              </svg>
              <svg
                style="width: 120px; height: 15px; position: absolute; left: 1168px; top: 449px"
              >
                <polyline points="0,3 120,3" style="fill: none; stroke: var(--old-red-color); stroke-width: 1" />
              </svg>
              <div class="warnText" style="left: 1168px; top: 430px; width: 125px;text-align: center;">
                系统故障：{{ findDataByCode('CEPI').damageCount }}/{{ findDataByCode('CEPI').allCount }}
              </div>
            </div>
            <div class="rightSystem g-w100 g-h100">
              <div class="g-w100" style="position: relative; margin-left: 40%; margin-top: 70px">
                <div
                  class="mainSize g-column-flex-HV"
                  :class="[
                    getDataStatus('CEPI', 'class'),
                    findDataByCode('CEPI')?.terraceShowUrl ? 'pointerCursor' : 'autoCursor',
                  ]"
                  @click="openNewLink(findDataByCode('CEPI')?.terraceShowUrl)"
                >
                  <div class="mainSizeRedBg" :class="[getDataStatusMain('CEPI')]" />
                  {{ findDataByCode("CEPI")?.terraceName }}
                </div>
                <!-- WHPH -->
                <!-- 带!号小报警 -->
                <div v-if="findDataByCode('WHPH')?.runningStatus === '0'">
                  <div class="alarmPromptMessage" style="left: 270px; top: -85px">
                    !
                  </div>
                  <svg
                    style="background: transparent; width: 140px; height: 52px; position: absolute; left: 275px; top: -80px"
                  >
                    <polyline points="0,0 35,40 150,40" style="fill: none; stroke: var(--old-red-color); stroke-width: 1" />
                  </svg>
                  <div class="warnText" style="left: 298px; top: -64px; width: 125px;text-align: center;">
                    系统故障：{{ findDataByCode('WHPH').damageCount }}/{{ findDataByCode('WHPH').allCount }}
                  </div>
                </div>
                <div
                  class="g-column-flex-HV"
                  :class="[
                    getDataStatus('WHPH', 'class'),
                    findDataByCode('WHPH')?.terraceShowUrl ? 'pointerCursor' : 'autoCursor',
                  ]"
                  style="position: absolute; left: 203px; top: -73px"
                  @click="openNewLink(findDataByCode('WHPH')?.terraceShowUrl)"
                >
                  <div class="smallRedBg" :class="[getSmallSignStatus('WHPH')]" />
                  <span>
                    {{ findDataByCode("WHPH")?.terraceName }}
                  </span>
                  <line-svg
                    :linear-id="findDataByCode('WHPH')?.terraceCode"
                    :start-color="getDataStatus('WHPH', 'color')"
                    :end-color="getDataStatus('WHPH', 'color')"
                    class="svgClass"
                    :class="[findDataByCode('WHPH')?.terraceShowUrl ? 'pointerCursor' : 'autoCursor']"
                    style="left: -126px; top: 22px"
                    div-stroke-width="6"
                    ball-stroke-width="5"
                    svg-width="125px"
                    svg-height="50px"
                    set-points="125,15 10,15 10,50"
                    @click-line="openNewLink(findDataByCode('WHPH')?.terraceShowUrl)"
                  />
                </div>
                <!-- WHPB -->
                <!-- 带!号小报警 -->
                <div v-if="findDataByCode('WHPB')?.runningStatus === '0'">
                  <div class="alarmPromptMessage" style="left: -181px; top: 100px">
                    !
                  </div>
                  <svg
                    style="background: transparent; width: 140px; height: 52px; position: absolute; left: -314px; top: 106px"
                  >
                    <polyline points="150,0 105,40 0,40" style="fill: none; stroke: var(--old-red-color); stroke-width: 1" />
                  </svg>
                  <div class="warnText" style="left: -329px; top: 124px; width: 125px;text-align: center;">
                    系统故障：{{ findDataByCode('WHPB').damageCount }}/{{ findDataByCode('WHPB').allCount }}
                  </div>
                </div>
                <div
                  class="g-column-flex-HV"
                  :class="[
                    getDataStatus('WHPB', 'class'),
                    findDataByCode('WHPB')?.terraceShowUrl ? 'pointerCursor' : 'autoCursor',
                  ]"
                  style="position: absolute; left: -175px; top: 107px"
                  @click="openNewLink(findDataByCode('WHPB')?.terraceShowUrl)"
                >
                  <div class="smallRedBg" :class="[getSmallSignStatus('WHPB')]" />
                  <span>
                    {{ findDataByCode("WHPB")?.terraceName }}
                  </span>
                  <line-svg
                    :linear-id="findDataByCode('WHPB')?.terraceCode"
                    :start-color="getDataStatus('WHPB', 'color')"
                    :end-color="getDataStatus('WHPB', 'color')"
                    class="svgClass"
                    :class="[findDataByCode('WHPB')?.terraceShowUrl ? 'pointerCursor' : 'autoCursor']"
                    style="top: -3px; left: 79px"
                    div-stroke-width="6"
                    ball-stroke-width="5"
                    svg-width="125px"
                    svg-height="50px"
                    set-points="0,40 115,40 115,0"
                    @click-line="openNewLink(findDataByCode('WHPB')?.terraceShowUrl)"
                  />
                </div>
                <!-- WHPC -->
                <!-- 带!号小报警 -->
                <div v-if="findDataByCode('WHPC')?.runningStatus === '0'">
                  <div class="alarmPromptMessage" style="left: 300px; top: 8px">
                    !
                  </div>
                  <svg
                    style="background: transparent; width: 140px; height: 52px; position: absolute; left: 310px; top: 20px"
                  >
                    <polyline points="0,0 35,40 150,40" style="fill: none; stroke: var(--old-red-color); stroke-width: 1" />
                  </svg>
                  <div class="warnText" style="left: 332px; top: 37px; width: 125px;text-align: center;">
                    系统故障：{{ findDataByCode('WHPC').damageCount }}/{{ findDataByCode('WHPC').allCount }}
                  </div>
                </div>
                <div
                  class="g-column-flex-HV"
                  :class="[
                    getDataStatus('WHPC', 'class'),
                    findDataByCode('WHPC')?.terraceShowUrl ? 'pointerCursor' : 'autoCursor',
                  ]"
                  style="position: absolute; left: 230px; top: 17px"
                  @click="openNewLink(findDataByCode('WHPC')?.terraceShowUrl)"
                >
                  <div class="smallRedBg" :class="[getSmallSignStatus('WHPC')]" />
                  <span>{{
                    findDataByCode("WHPC")?.terraceName
                  }}</span>
                  <line-svg
                    :linear-id="findDataByCode('WHPC')?.terraceCode"
                    :start-color="getDataStatus('WHPC', 'color')"
                    :end-color="getDataStatus('WHPC', 'color')"
                    class="svgClass"
                    :class="[findDataByCode('WHPC')?.terraceShowUrl ? 'pointerCursor' : 'autoCursor']"
                    style="left: -125px; top: 25px"
                    div-stroke-width="6"
                    ball-stroke-width="5"
                    svg-width="126px"
                    svg-height="20px"
                    set-points="125,10 0,10 0,11"
                    @click-line="openNewLink(findDataByCode('WHPC')?.terraceShowUrl)"
                  />
                </div>
                <!-- CEPK -->
                <!-- 带!号小报警 -->
                <div v-if="findDataByCode('CEPK')?.runningStatus === '0'">
                  <div class="alarmPromptMessage" style="left: -211px; top: 8px">
                    !
                  </div>
                  <svg
                    style="background: transparent; width: 140px; height: 52px; position: absolute; left: -349px; top: 16px"
                  >
                    <polyline points="150,0 105,40 0,40" style="fill: none; stroke: var(--old-red-color); stroke-width: 1" />
                  </svg>
                  <div class="warnText" style="left: -359px; top: 32px; width: 125px;text-align: center;">
                    系统故障：{{ findDataByCode('CEPK').damageCount }}/{{ findDataByCode('CEPK').allCount }}
                  </div>
                </div>
                <div
                  class="g-column-flex-HV"
                  :class="[
                    getDataStatus('CEPK', 'class'),
                    findDataByCode('CEPK')?.terraceShowUrl ? 'pointerCursor' : 'autoCursor',
                  ]"
                  style="position: absolute; left: -204px; top: 17px"
                  @click="openNewLink(findDataByCode('CEPK')?.terraceShowUrl)"
                >
                  <div class="smallRedBg" :class="[getSmallSignStatus('CEPK')]" />
                  <span>{{
                    findDataByCode("CEPK")?.terraceName
                  }}</span>
                  <line-svg
                    :linear-id="findDataByCode('CEPK')?.terraceCode"
                    :start-color="getDataStatus('CEPK', 'color')"
                    :end-color="getDataStatus('CEPK', 'color')"
                    class="svgClass"
                    :class="[findDataByCode('CEPK')?.terraceShowUrl ? 'pointerCursor' : 'autoCursor']"
                    style="top: 25px; left: 79px"
                    div-stroke-width="6"
                    ball-stroke-width="5"
                    svg-width="126px"
                    svg-height="20px"
                    set-points="0,11 0,10 125,10"
                    @click-line="openNewLink(findDataByCode('CEPK')?.terraceShowUrl)"
                  />
                </div>
                <!-- WHPD -->
                <!-- 带!号小报警 -->
                <div v-if="findDataByCode('WHPD')?.runningStatus === '0'">
                  <div class="alarmPromptMessage" style="left: 270px; top: 100px">
                    !
                  </div>
                  <svg
                    style="background: transparent; width: 140px; height: 52px; position: absolute; left: 275px; top: 103px"
                  >
                    <polyline points="0,0 35,40 150,40" style="fill: none; stroke: var(--old-red-color); stroke-width: 1" />
                  </svg>
                  <div class="warnText" style="left: 299px; top: 120px; width: 125px;text-align: center;">
                    系统故障：{{ findDataByCode('WHPD').damageCount }}/{{ findDataByCode('WHPD').allCount }}
                  </div>
                </div>
                <div
                  class="g-column-flex-HV"
                  :class="[
                    getDataStatus('WHPD', 'class'),
                    findDataByCode('WHPD')?.terraceShowUrl ? 'pointerCursor' : 'autoCursor',
                  ]"
                  style="position: absolute; left: 203px; top: 107px"
                  @click="openNewLink(findDataByCode('WHPD')?.terraceShowUrl)"
                >
                  <div class="smallRedBg" :class="[getSmallSignStatus('WHPD')]" />
                  <span>{{
                    findDataByCode("WHPD")?.terraceName
                  }}</span>
                  <line-svg
                    :linear-id="findDataByCode('WHPD')?.terraceCode"
                    :start-color="getDataStatus('WHPD', 'color')"
                    :end-color="getDataStatus('WHPD', 'color')"
                    class="svgClass"
                    :class="[findDataByCode('WHPD')?.terraceShowUrl ? 'pointerCursor' : 'autoCursor']"
                    style="left: -126px; top: -3px"
                    div-stroke-width="6"
                    ball-stroke-width="5"
                    svg-width="125px"
                    svg-height="50px"
                    set-points="125,40 10,40 10,0"
                    @click-line="openNewLink(findDataByCode('WHPD')?.terraceShowUrl)"
                  />
                </div>
                <!-- WHPG -->
                <!-- 带!号小报警 -->
                <div v-if="findDataByCode('WHPG')?.runningStatus === '0'">
                  <div class="alarmPromptMessage" style="left: -180px; top: -80px">
                    !
                  </div>
                  <svg
                    style="background: transparent; width: 140px; height: 52px; position: absolute; left: -310px; top: -80px"
                  >
                    <polyline points="150,0 105,40 0,40" style="fill: none; stroke: var(--old-red-color); stroke-width: 1" />
                  </svg>
                  <div class="warnText" style="left: -315px; top: -65px; width: 125px; text-align: center;">
                    系统故障：{{ findDataByCode('WHPG').damageCount }}/{{ findDataByCode('WHPG').allCount }}
                  </div>
                </div>
                <div
                  class="g-column-flex-HV"
                  :class="[
                    getDataStatus('WHPG', 'class'),
                    findDataByCode('WHPG')?.terraceShowUrl ? 'pointerCursor' : 'autoCursor',
                  ]"
                  style="position: absolute; left: -175px; top: -73px"
                  @click="openNewLink(findDataByCode('WHPG')?.terraceShowUrl)"
                >
                  <div class="smallRedBg" :class="[getSmallSignStatus('WHPG')]" />
                  <span>
                    {{ findDataByCode("WHPG")?.terraceName }}
                  </span>
                  <line-svg
                    :linear-id="findDataByCode('WHPG')?.terraceCode"
                    :start-color="getDataStatus('WHPG', 'color')"
                    :end-color="getDataStatus('WHPG', 'color')"
                    class="svgClass"
                    :class="[findDataByCode('WHPG')?.terraceShowUrl ? 'pointerCursor' : 'autoCursor']"
                    style="top: 22px; left: 79px"
                    div-stroke-width="6"
                    ball-stroke-width="5"
                    svg-width="125px"
                    svg-height="50px"
                    set-points="0,15 115,15 115,50"
                    @click-line="openNewLink(findDataByCode('WHPG')?.terraceShowUrl)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </page-panel-new>
  </div>
</template>

<script>
import lineSvg from "@/pages/intelligentOilfield/messageCenter/lineSvg.vue";
import { monitorLinks } from "@/api/intelligentOilfield/system/equipment";
import { compareDateToS } from "@/utils/date.ts";
import { addTokenToUrl } from "@/utils/jumpSupApp.js";
import dayjs from "dayjs";

export default {
  name: "Message",
  components: {
    lineSvg
  },
  data() {
    return {
      zoomValue: 0,
      boxWidth: 0,
      windowWidth: 1920,
      linkMarginTop: 0,
      maritimeLinkInfos: [],
      cloudsLinkInfos: [],
      dialogTitle: "海陆物联网数据链路",
      openDialog: false,
      timer: null,
      isFullScreen: false,
      zuhuModel: "秦皇岛作业公司",
      zuhuOptions: [
        { label: "秦皇岛作业公司", value: "秦皇岛作业公司" },
        { label: "蓬勃作业公司", value: "蓬勃作业公司" }
      ],
      iframeDialogTitle: "",
      openIframeDialog: false,
      ifameList: [
        { name: "海上链路总览", url: "http://10.79.32.200:8080/resource/App_2d4a01bdc0a5336a8ddbe66c02becb1e/appCallback.html", id: "sea" },
        { name: "云端链路总览", url: "https://dds.tjioms-dev.tjltd.cnooc/#/bigDataPage/showData", id: "cloud" }
      ],
      currentIframeObj: { name: "海上链路总览", url: "http://10.79.32.200:8080/resource/App_2d4a01bdc0a5336a8ddbe66c02becb1e/appCallback.html", id: "sea" }
    };
  },
  computed: {
    // CEPJ和CEPI的背景图
    getDataStatusMain() {
      return code => {
        const tempData = this.maritimeLinkInfos.find(item => item.terraceCode === code);
        if (tempData?.runningStatus === "1") {
          if (this.$store.state.setting.mode === "dark") {
            return "mainSizeBlueBg";
          }
          return "mainSizeBlueBg_light";
        }
        return "mainSizeRedBg";
      };
    },
    // FPSO的背景图
    getDataStatusFPSO() {
      return code => {
        const tempData = this.maritimeLinkInfos.find(item => item.terraceCode === code);
        if (tempData?.runningStatus === "1") {
          if (this.$store.state.setting.mode === "dark") {
            return "mainSizeBlueBgFPSO";
          }
          return "mainSizeBlueBgFPSO_light";
        }
        return "mainSizeRedBgFPSO";
      };
    },
    // 小图标背景图
    getSmallSignStatus() {
      return code => {
        const tempData = this.maritimeLinkInfos.find(item => item.terraceCode === code);
        if (tempData?.runningStatus === "1") {
          if (this.$store.state.setting.mode === "dark") {
            return "smallBlueBg";
          }
          return "smallBlueBg_light";
        }
        return "smallRedBg";
      };
    },
    // 通过terraceCode,返回(海面)线/点背景颜色
    getDataStatus() {
      return (code, type) => {
        const tempData = this.maritimeLinkInfos.find(item => item.terraceCode === code);
        if (type === "color") {
          return tempData?.runningStatus === "1" ? "#32cd32" : "red";
        }
        return tempData?.runningStatus === "1" ? "greenSign" : "redSign";
      };
    },
    // linkType: "LINK":通过startPoint和endPoint,返回(云)线颜色
    findDataByLink() {
      return (startPoint, endPoint) => {
        const tempData = this.cloudsLinkInfos.find(
          item => item.startPoint === startPoint && item.endPoint === endPoint
        );
        return tempData?.runningStatus === "1" ? "#32cd32" : "red";
      };
    },
    // linkType: "POINT":通过startPoint,返回(云)点背景颜色
    findDataByPoint() {
      return (point, type) => {
        const tempData = this.cloudsLinkInfos.find(item => item.linkType === "POINT" && item.startPoint === point);
        if (type === "color") {
          return tempData?.runningStatus === "1" ? "#32cd32" : "red";
        }
        return tempData?.runningStatus === "1" ? "blueBg" : "redBg";
      };
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.refreshData();
      window.onresize = () => { // 窗口尺寸变化时，重新计意和缩放
        this.refreshData();
      };
      this.getStatus();
    });
  },
  destroyed() {
    window.clearInterval(this.timer);
  },
  methods: {
    refreshData() {
      const baseWidth = 1920;
      this.windowWidth = window.innerWidth;
      this.boxWidth = this.$refs.elRef.offsetWidth;
      this.zoomValue = this.boxWidth / baseWidth;

      if (this.windowWidth === 1920) {
        this.linkMarginTop = 0;
        document.getElementById("mainContainer").style.transform = "scale(0.9, 0.9)";
      } else if (this.windowWidth > 1920) {
        if (this.boxWidth >= 2604 && this.boxWidth < 3564) {
          this.linkMarginTop = this.zoomValue * 200;
        } else if (this.boxWidth >= 3564 && this.boxWidth < 5482) {
          this.linkMarginTop = this.zoomValue * 300;
        } else if (this.boxWidth >= 5482 && this.boxWidth < 7404) {
          this.linkMarginTop = this.zoomValue * 500;
        } else if (this.boxWidth >= 7404) {
          this.linkMarginTop = this.zoomValue * 600;
        } else {
          this.linkMarginTop = this.zoomValue * 100;
        }
        document.getElementById("mainContainer").style.transform = `scale(${this.zoomValue},${this.zoomValue})`;
      } else {
        this.linkMarginTop = ((1 - this.zoomValue) * 100 + 20) * -1;
        document.getElementById("mainContainer").style.transform = `scale(${this.zoomValue},${this.zoomValue})`;
      }
    },
    addToken(url) {
      return addTokenToUrl(url);
    },
    openIframeDialogMethods(iframeObj) {
    // TODO: Maybe change back
    //   this.currentIframeObj = iframeObj;
    //   this.iframeDialogTitle = iframeObj.name;
    //   this.openIframeDialog = true;
      window.open(addTokenToUrl(iframeObj.url), "_blank");
    },
    clickClouds() {
      this.openDialog = true;
    },
    submitForm() {
      this.openDialog = false;
    },
    openNewLink(url) {
      if (url) {
        window.open(addTokenToUrl(url), "_blank");
      }
    },
    openPointsLink(url) {
      if (url) {
        window.open(addTokenToUrl(url), "_blank");
      }
    },
    // 跳转设备维护
    handleToPage() {
      this.$router.push({ name: "Equipment" });
    },
    // 查找(海面)符合条件对象
    findDataByCode(code) {
      return this.maritimeLinkInfos.find(item => item.terraceCode === code);
    },
    // 查找(云)符合条件对象
    findDataByStartAndEnd(startPoint, endPoint) {
      return this.cloudsLinkInfos.find(item => item.startPoint === startPoint && item.endPoint === endPoint);
    },
    // 获取状态
    getStatus() {
      window.clearInterval(this.timer);
      const nowDate = new Date();
      compareDateToS(nowDate);
      const params = {
        checkTime: compareDateToS(nowDate)
      };
      let differenceSecond = 0;
      // 调接口
      monitorLinks(params).then(res => {
        differenceSecond = 0;
        differenceSecond = dayjs(res.data.data.nextCheckTime).diff(compareDateToS(nowDate), "seconds");
        this.maritimeLinkInfos = res.data.data.maritimeLinkInfos;
        this.cloudsLinkInfos = res.data.data.cloudsLinkInfos;
        this.timer = window.setInterval(() => {
          setTimeout(() => {
            this.getStatus();
          }, 0);
        }, differenceSecond * 1000);
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
  width: 80px;
  height: 80px;
  color: var(--old-red-color);
  background: var(--old-red-bg);
  border-radius: 2px;
  border: 1px solid var(--old-red-color);
  font-size: 14px;
  font-family: PingFangSC-Medium, "PingFang SC";
  font-weight: 500;
}

.greenSign {
  width: 80px;
  height: 80px;
  text-align: center;
  color: var(--old-blue-color);
  background: var(--old-blue-bg);
  border-radius: 2px;
  border: 1px solid var(--old-blue-color);
  font-size: 14px;
  font-family: PingFangSC-Medium, "PingFang SC";
  font-weight: 500;
}

.smallRedBg {
  width: 40px;
  height: 37px;
  background-image: url("@/assets/intelligentOilfield/small_red.png");
  background-repeat: no-repeat;
  margin-bottom: 2px;
}

.smallBlueBg {
  width: 40px;
  height: 37px;
  background-image: url("@/assets/intelligentOilfield/small_blue.png");
  background-repeat: no-repeat;
  margin-bottom: 2px;
}

.smallBlueBg_light {
  width: 40px;
  height: 37px;
  background-image: url("@/assets/intelligentOilfield/small_blue_light.png");
  background-repeat: no-repeat;
  margin-bottom: 2px;
}

.svgClass {
  top: 100%;
  z-index: 0 !important;
}

.topImage {
  margin-top: 72px;
}

.topImage1 {
  background-size: 100% 100%;
  width: 750px;
  height: 60px;
  margin-top: 40px;
}

.centerImage {
  background-size: 100% 100%;
  width: 980px;
  height: 76px;
  margin-top: 32px;
}

.bottomImage {
  background-size: 100% 100%;
  width: 1280px;
  height: 100px;
  margin-top: -111px;
}

.bottomWaterBg {
  background-size: 100% 100%;
  width: 100%;
  height: 266px;
  position: relative;
  justify-content: space-between;
}

.leftSystem {
  left: -183px;
  top: 198px;
  z-index: 0;
  width: 530px;
  height: 100%;
  position: absolute;
}

.centerSystem {
  left: 370px;
  top: 198px;
  z-index: 0;
  height: 100%;
  width: 530px;
  position: absolute;
}

.rightSystem {
  left: 900px;
  top: 198px;
  z-index: 0;
  width: 530px;
  height: 100%;
  position: absolute;
}

.kuduClass {
  position: absolute;
  left: 720px;
}

.blueBg {
  background: url("@/assets/intelligentOilfield/blue-bg.png");
  background-size: 100% 100%;
  width: 216px;
  height: 50px;
  font-size: 20px;
  font-family: PingFangSC-Medium, "PingFang SC";
  font-weight: 500;
  color: #fff;
}

.redBg {
  background: url("@/assets/intelligentOilfield/red-bg.png");
  background-size: 100% 100%;
  width: 216px;
  height: 50px;
  font-size: 20px;
  font-family: PingFangSC-Medium, "PingFang SC";
  font-weight: 500;
  color: #fff;
  padding-bottom: 9px;
}

.greenBg {
  background: url("@/assets/intelligentOilfield/green-bg.png");
  background-size: 100% 100%;
  width: 200px;
  height: 48px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, "PingFang SC";
  font-weight: 600;
  color: #fff;
  padding-bottom: 9px;
}

.yellowBg {
  background: url("@/assets/intelligentOilfield/yellow-bg.png");
  background-size: 100% 100%;
  width: 200px;
  height: 48px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, "PingFang SC";
  font-weight: 600;
  color: #fff;
}

.mainSize {
  width: 106px;
  height: 106px;
}

.mainSizeRedBg {
  width: 60px;
  height: 56px;
  background-image: url("@/assets/intelligentOilfield/main_red.png");
  background-repeat: no-repeat;
  margin-bottom: 5px;
}

.mainSizeBlueBg {
  width: 60px;
  height: 56px;
  background-image: url("@/assets/intelligentOilfield/main_blue.png");
  background-repeat: no-repeat;
  margin-bottom: 5px;
}

.mainSizeBlueBg_light {
  width: 60px;
  height: 56px;
  background-image: url("@/assets/intelligentOilfield/main_blue_light.png");
  background-repeat: no-repeat;
  margin-bottom: 5px;
}

.mainSizeRedBgFPSO {
  width: 74px;
  height: 52px;
  background-image: url("@/assets/intelligentOilfield/fpso_red.png");
  background-repeat: no-repeat;
  margin-bottom: 5px;
}

.mainSizeBlueBgFPSO {
  width: 74px;
  height: 52px;
  background-image: url("@/assets/intelligentOilfield/fpso_blue.png");
  background-repeat: no-repeat;
  margin-bottom: 5px;
}

.mainSizeBlueBgFPSO_light {
  width: 74px;
  height: 52px;
  background-image: url("@/assets/intelligentOilfield/fpso_blue_light.png");
  background-repeat: no-repeat;
  margin-bottom: 5px;
}

.dialog-footer {
  justify-content: flex-end;
}

.absoultePos {
  position: absolute;
  color: var(--light-blue-color);
  left: 0;
  top: 0;
  font-size: 14px;
}

.pointerCursor {
  cursor: pointer;
}

.autoCursor {
  cursor: default;
}

.alarmPromptMessage {
  width: 20px;
  height: 20px;
  line-height: 20px;
  background: var(--old-red-color);
  border-radius: 20px;
  position: absolute;
  left: 240px;
  top: 115px;
  z-index: 1;
  text-align: center;
}

.warnText {
  font-size: 12px;
  color: var(--old-red-color);
  position: absolute;
  left: 110px;
  top: 140px;
}
</style>