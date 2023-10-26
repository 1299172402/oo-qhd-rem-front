<!-- 后台——消息中心备份3，海上无背景图,线条有注释 -->
<template>
  <div class="g-w100 g-h100" style="font-size: 16px; color: #fff;">
    <el-dialog
      :title="dialogTitle"
      :visible.sync="openDialog"
      width="650px"
      append-to-body
      :close-on-click-modal="false"
      @close="clearSearchList"
    >
      <div style="height: 93%;">
        <div class="g-w100 g-h100" style="height: 400px;">
          <div class="g-w100 g-h100" style="position: relative;">
            <div
              class="g-row-flex-HV"
              style="margin: 0 auto;"
              :class="findDataByPoint('Clouds_IOT', 'class')"
              @click="clickClouds"
            >
              云端物联网平台
            </div>
            <div class="g-row-flex-HV" style="margin-top: 280px;">
              <div
                class="mainSize"
                :class="[getDataStatus('CEPJ', 'class'), findDataByCode('CEPJ')?.terraceShowUrl?'pointerCursor':'autoCursor']"
                @click="openNewLink(findDataByCode('CEPJ')?.terraceShowUrl)"
              >
                {{ findDataByCode("CEPJ")?.terraceName }}
              </div>
              <div
                class="mainSize"
                style="margin: 0 80px;"
                :class="[getDataStatus('FPSO', 'class'), findDataByCode('FPSO')?.terraceShowUrl?'pointerCursor':'autoCursor']"
                @click="openNewLink(findDataByCode('FPSO')?.terraceShowUrl)"
              >
                {{ findDataByCode("FPSO")?.terraceName }}
              </div>
              <div
                class="mainSize"
                :class="[getDataStatus('CEPI', 'class'), findDataByCode('CEPI')?.terraceShowUrl?'pointerCursor':'autoCursor']"
                @click="openNewLink(findDataByCode('CEPI')?.terraceShowUrl)"
              >
                {{ findDataByCode("CEPI")?.terraceName }}
              </div>
            </div>
            <!-- Maritime_FPSO -  Clouds_IOT-->
            <line-svg
              linear-id="Maritime_FPSO_Clouds_IOT"
              :start-color="findDataByLink('Maritime_FPSO', 'Clouds_IOT')"
              :end-color="findDataByLink('Maritime_FPSO', 'Clouds_IOT')"
              class="svgClass"
              :class="[findDataByStartAndEnd('Maritime_FPSO', 'Clouds_IOT')?.pointShowUrl?'pointerCursor':'autoCursor']"
              style="left: 270px; top: 45px;"
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
              :class="[findDataByStartAndEnd('Maritime_CEPJ', 'Clouds_IOT')?.pointShowUrl?'pointerCursor':'autoCursor']"
              style="left: 120px; top: 44px;"
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
              :class="[findDataByStartAndEnd('Maritime_CEPI', 'Clouds_IOT')?.pointShowUrl?'pointerCursor':'autoCursor']"
              style="left: 340px; top: 44px;"
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
    <page-panel-new ref="elRef" class="g-w100 g-column-flex" style="height: calc(100% - 0px);">
      <div class="g-row-flex" style="justify-content: flex-end;">
        <el-select v-model="zuhuModel" placeholder="请选择" clearable>
          <el-option
            v-for="item in zuhuOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div v-show="zuhuModel === '秦皇岛作业公司'" style="height: 100%; position: relative;" class="g-column-flex-H">
        <el-button style="position: absolute; top: -33px; left: 0;" type="primary" @click="handleToPage()">
          信息维护
        </el-button>
        <div style="position: absolute; right: 0; color: var(--old-blue-color);">
          <!-- TODO: Maybe change back -->
          <!-- {{ $store.getters["user/tenantName"] }} -->
          <!-- 秦皇岛作业公司 -->
        </div>
        <div class="topImage g-row-flex-HV" style="position: relative; margin-top: 80px;">
          <div
            class="g-row-flex-HV greenBg"
            :class="[findDataByStartAndEnd('Msg', 'Msg')?.pointShowUrl?'pointerCursor':'autoCursor']"
            @click="openPointsLink(findDataByStartAndEnd('Msg', 'Msg')?.pointShowUrl)"
          >
            消息中心
          </div>
          <div class="absoultePos" style="left: -62px; top: 61px;">
            大数据服务 (restful)
          </div>
          <div class="absoultePos" style="left: 112px; top: 61px;">
            监控数据
          </div>

          <!-- BigData - Msg-->
          <line-svg
            linear-id="BigData_Msg"
            :start-color="findDataByLink('BigData', 'Msg')"
            :end-color="findDataByLink('BigData', 'Msg')"
            :class="[findDataByStartAndEnd('BigData', 'Msg')?.pointShowUrl?'pointerCursor':'autoCursor']"
            class="svgClass"
            style="left: 80px;z-index: 1 !important;"
            div-stroke-width="6"
            ball-stroke-width="5"
            svg-width="125px"
            svg-height="75px"
            set-points="125,60 15,60 15,0"
            @click-line="openPointsLink(findDataByStartAndEnd('BigData', 'Msg')?.pointShowUrl)"
          />
          <div
            class="g-row-flex-HV yellowBg"
            :class="[findDataByStartAndEnd('Alarm', 'Alarm')?.pointShowUrl?'pointerCursor':'autoCursor']"
            style="margin-left: 220px;"
            @click="openPointsLink(findDataByStartAndEnd('Alarm', 'Alarm')?.pointShowUrl)"
          >
            报警中心
          </div>
          <div class="absoultePos" style="left: 369px; top: 61px;">
            大数据服务 (socket)
          </div>
          <div class="absoultePos" style="left: 538px; top: 61px;">
            报警数据
          </div>
          <!-- BigData - Alarm-->
          <line-svg
            linear-id="BigData_Alarm"
            :start-color="findDataByLink('BigData', 'Alarm')"
            :end-color="findDataByLink('BigData', 'Alarm')"
            class="svgClass"
            :class="[findDataByStartAndEnd('BigData', 'Alarm')?.pointShowUrl?'pointerCursor':'autoCursor']"
            style="left: 415px;z-index: 1 !important;"
            div-stroke-width="6"
            ball-stroke-width="5"
            svg-width="125px"
            svg-height="75px"
            set-points="0,60 110,60 110,0"
            @click-line="openPointsLink(findDataByStartAndEnd('BigData', 'Alarm')?.pointShowUrl)"
          />
        </div>
        <div class="topImage1 g-row-flex-HV" style="position: relative;">
          <div
            class="g-row-flex-HV"
            :class="[findDataByPoint('BigData', 'class'),findDataByStartAndEnd('BigData', 'Alarm')?.pointShowUrl?'pointerCursor':'autoCursor']"
            @click="openPointsLink(findDataByStartAndEnd('BigData', 'BigData')?.pointShowUrl)"
          >
            大数据分析环境
          </div>
          <div class="absoultePos" style="left: 245px; top: 65px;">
            大数据服务(Flink)
          </div>
          <div class="absoultePos" style="left: 400px; top: 65px;">
            实时数据，报警数据
          </div>
          <!-- Queue -  BigData-->
          <line-svg
            linear-id="Queue_BigData"
            :start-color="findDataByLink('Queue', 'BigData')"
            :end-color="findDataByLink('Queue', 'BigData')"
            :class="[findDataByStartAndEnd('Queue', 'BigData')?.pointShowUrl?'pointerCursor':'autoCursor']"
            class="svgClass"
            style="left: 335px; top: 48px;"
            div-stroke-width="6"
            ball-stroke-width="5"
            svg-width="100px"
            svg-height="57px"
            set-points="50,255 50,0 51,0"
            @click-line="openPointsLink(findDataByStartAndEnd('Queue', 'BigData')?.pointShowUrl)"
          />
        </div>
        <div class="centerImage g-row-flex-HV" style="position: relative;">
          <div
            class="g-row-flex-HV"
            :class="[findDataByPoint('Queue', 'class'),findDataByStartAndEnd('Queue', 'Queue')?.pointShowUrl?'pointerCursor':'autoCursor']"
            @click="openPointsLink(findDataByStartAndEnd('Queue', 'Queue')?.pointShowUrl)"
          >
            消息队列
          </div>
          <div class="absoultePos" style="left: 405px; top: 86px;">
            大数掘服务
          </div>
          <div class="absoultePos" style="left: 514px; top: 86px;">
            实时数据，报警数据
          </div>
          <!-- Clouds_IOT -  Queue-->
          <line-svg
            linear-id="Clouds_IOT_Queue"
            :start-color="findDataByLink('Clouds_IOT', 'Queue')"
            :end-color="findDataByLink('Clouds_IOT', 'Queue')"
            class="svgClass"
            :class="[findDataByStartAndEnd('Clouds_IOT', 'Queue')?.pointShowUrl?'pointerCursor':'autoCursor']"
            style="left: 450px; top: 58px;"
            div-stroke-width="6"
            ball-stroke-width="5"
            svg-width="100px"
            svg-height="75px"
            set-points="50,255 50,0 51,0"
            @click-line="openPointsLink(findDataByStartAndEnd('Clouds_IOT', 'Queue')?.pointShowUrl)"
          />
          <div
            class="kuduClass g-row-flex-HV"
            :class="[findDataByPoint('Kudu', 'class'),findDataByStartAndEnd('Kudu', 'Kudu')?.pointShowUrl?'pointerCursor':'autoCursor']"
            @click="openPointsLink(findDataByStartAndEnd('Kudu', 'Kudu')?.pointShowUrl)"
          >
            Kudu
          </div>
          <div class="absoultePos" style="left: 234px; top: 2px;">
            大数据服务(Flink)
          </div>
          <div class="absoultePos" style="left: 225px; top: 47px;">
            实时数据，报警数据
          </div>
          <!-- Queue -  Kudu-->
          <line-svg
            linear-id="Queue_Kudu"
            :start-color="findDataByLink('Queue', 'Kudu')"
            :end-color="findDataByLink('Queue', 'Kudu')"
            class="svgClass"
            :class="[findDataByStartAndEnd('Queue', 'Kudu')?.pointShowUrl?'pointerCursor':'autoCursor']"
            style="left: 212px; top: 21px;"
            div-stroke-width="6"
            ball-stroke-width="5"
            svg-width="175"
            svg-height="30"
            set-points="175,15 0,15 0,14"
            @click-line="openPointsLink(findDataByStartAndEnd('Queue', 'Kudu')?.pointShowUrl)"
          />
        </div>
        <div class="bottomImage g-row-flex-HV" style="position: relative;">
          <div
            class="g-row-flex-HV"
            style="cursor: pointer;"
            :class="findDataByPoint('Clouds_IOT', 'class')"
            @click="clickClouds"
          >
            云端物联网平台
          </div>
          <div class="absoultePos" style="left: 310px; top: 17px;">
            物联网ETL
          </div>
          <div class="absoultePos" style="left: 279px; top: 59px;">
            实时数据，报警数据
          </div>
          <div class="absoultePos" style="left: 664px; top: 149px;">
            物联网ETL
          </div>
          <div class="absoultePos" style="left: 915px; top: 19px;">
            物联网ETL
          </div>
          <div class="absoultePos" style="left: 887px; top: 63px;">
            实时数据，报警数据
          </div>

          <!-- Maritime_FPSO -  Clouds_IOT-->
          <line-svg
            linear-id="Maritime_FPSO_Clouds_IOT"
            :start-color="findDataByLink('Maritime_FPSO', 'Clouds_IOT')"
            :end-color="findDataByLink('Maritime_FPSO', 'Clouds_IOT')"
            class="svgClass"
            :class="[findDataByStartAndEnd('Maritime_FPSO', 'Clouds_IOT')?.pointShowUrl?'pointerCursor':'autoCursor']"
            style="left: 600px; top: 72px;z-index: 1 !important;"
            div-stroke-width="6"
            ball-stroke-width="5"
            svg-width="100px"
            svg-height="194px"
            set-points="50,194 50,0 51,0"
            @click-line="openPointsLink(findDataByStartAndEnd('Maritime_FPSO', 'Clouds_IOT')?.pointShowUrl)"
          />
          <div class="leftSystem g-h100">
            <div class="g-w100" style="position: relative; margin-left: 45%; margin-top: 70px;">
              <!-- CEPJ -->
              <div
                class="mainSize"
                :class="[getDataStatus('CEPJ', 'class'),findDataByCode('CEPJ')?.terraceShowUrl?'pointerCursor':'autoCursor']"
                @click="openNewLink(findDataByCode('CEPJ')?.terraceShowUrl)"
              >
                {{ findDataByCode("CEPJ")?.terraceName }}
              </div>
              <!-- WHPA -->
              <div :class="[getDataStatus('WHPA', 'class'),findDataByCode('WHPA')?.terraceShowUrl?'pointerCursor':'autoCursor']" style="position: absolute; left: -158px; top: -51px;">
                <span @click="openNewLink(findDataByCode('WHPA')?.terraceShowUrl)">
                  {{ findDataByCode("WHPA")?.terraceName }}
                </span>
                <line-svg
                  :linear-id="findDataByCode('WHPA')?.terraceCode"
                  :start-color="getDataStatus('WHPA', 'color')"
                  :end-color="getDataStatus('WHPA', 'color')"
                  class="svgClass"
                  :class="[findDataByCode('WHPA')?.terraceShowUrl?'pointerCursor':'autoCursor']"
                  style="top: 0; left: 59px;"
                  div-stroke-width="6"
                  ball-stroke-width="5"
                  svg-width="125px"
                  svg-height="50px"
                  set-points="0,15 115,15 115,50"
                  @click-line="openNewLink(findDataByCode('WHPA')?.terraceShowUrl)"
                />
              </div>
              <!-- WHPE -->
              <div :class="[getDataStatus('WHPE', 'class'),findDataByCode('WHPE')?.terraceShowUrl?'pointerCursor':'autoCursor']" style="position: absolute; left: -186px; top: 3px;">
                <span @click="openNewLink(findDataByCode('WHPE')?.terraceShowUrl)">
                  {{ findDataByCode("WHPE")?.terraceName }}
                </span>
                <line-svg
                  :linear-id="findDataByCode('WHPE')?.terraceCode"
                  :start-color="getDataStatus('WHPE', 'color')"
                  :end-color="getDataStatus('WHPE', 'color')"
                  class="svgClass"
                  :class="[findDataByCode('WHPE')?.terraceShowUrl?'pointerCursor':'autoCursor']"
                  style="top: 2px; left: 59px;"
                  div-stroke-width="6"
                  ball-stroke-width="5"
                  svg-width="126px"
                  svg-height="20px"
                  set-points="0,11 0,10 125,10"
                  @click-line="openNewLink(findDataByCode('WHPE')?.terraceShowUrl)"
                />
              </div>
              <!-- WHPF -->
              <div :class="[getDataStatus('WHPF', 'class'),findDataByCode('WHPF')?.terraceShowUrl?'pointerCursor':'autoCursor']" style="position: absolute; left: 214px; top: 5px;">
                <span @click="openNewLink(findDataByCode('WHPF')?.terraceShowUrl)">
                  {{ findDataByCode("WHPF")?.terraceName }}
                </span>
                <line-svg
                  :linear-id="findDataByCode('WHPF')?.terraceCode"
                  :start-color="getDataStatus('WHPF', 'color')"
                  :end-color="getDataStatus('WHPF', 'color')"
                  class="svgClass"
                  :class="[findDataByCode('WHPF')?.terraceShowUrl?'pointerCursor':'autoCursor']"
                  style="left: -127px; top: 2px;"
                  div-stroke-width="6"
                  ball-stroke-width="5"
                  svg-width="126px"
                  svg-height="20px"
                  set-points="125,10 0,10 0,11"
                  @click-line="openNewLink(findDataByCode('WHPF')?.terraceShowUrl)"
                />
              </div>
              <!-- CEPL -->
              <div :class="[getDataStatus('CEPL', 'class'),findDataByCode('CEPL')?.terraceShowUrl?'pointerCursor':'autoCursor']" style="position: absolute; left: -151px; top: 63px;">
                <span @click="openNewLink(findDataByCode('CEPL')?.terraceShowUrl)">
                  {{ findDataByCode("CEPL")?.terraceName }}
                </span>
                <line-svg
                  :linear-id="findDataByCode('CEPL')?.terraceCode"
                  :start-color="getDataStatus('CEPL', 'color')"
                  :end-color="getDataStatus('CEPL', 'color')"
                  class="svgClass"
                  :class="[findDataByCode('CEPL')?.terraceShowUrl?'pointerCursor':'autoCursor']"
                  style="top: -27px; left: 59px;"
                  div-stroke-width="6"
                  ball-stroke-width="5"
                  svg-width="125px"
                  svg-height="50px"
                  set-points="0,40 115,40 115,0"
                  @click-line="openNewLink(findDataByCode('CEPL')?.terraceShowUrl)"
                />
              </div>
              <!-- EPP -->
              <div :class="[getDataStatus('EPP', 'class'),findDataByCode('EPP')?.terraceShowUrl?'pointerCursor':'autoCursor']" style="position: absolute; left: 178px; top: 57px;">
                <span @click="openNewLink(findDataByCode('EPP')?.terraceShowUrl)">
                  {{ findDataByCode("EPP")?.terraceName }}
                </span>
                <line-svg
                  :linear-id="findDataByCode('EPP')?.terraceCode"
                  :start-color="getDataStatus('EPP', 'color')"
                  :end-color="getDataStatus('EPP', 'color')"
                  class="svgClass"
                  :class="[findDataByCode('EPP')?.terraceShowUrl?'pointerCursor':'autoCursor']"
                  style="left: -127px; top: -21px;"
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
          <!-- Maritime_CEPJ -  Clouds_IOT-->
          <!-- 一整条线 -->
          <!-- <line-svg
            linear-id="Maritime_CEPJ_Clouds_IOT"
            :start-color="findDataByLink('Maritime_CEPJ', 'Clouds_IOT')"
            :end-color="findDataByLink('Maritime_CEPJ', 'Clouds_IOT')"
            class="svgClass"
            :class="[findDataByStartAndEnd('Maritime_CEPJ', 'Clouds_IOT')?.pointShowUrl?'pointerCursor':'autoCursor']"
            style="left: 100px; top: 34px"
            div-stroke-width="6"
            ball-stroke-width="5"
            svg-width="435px"
            svg-height="233px"
            set-points="10,233 10,15 435,15"
            @click-line="openPointsLink(findDataByStartAndEnd('Maritime_CEPJ', 'Clouds_IOT')?.pointShowUrl)"
          /> -->
          <!-- 顶部线 -->
          <line-svg
            linear-id="Maritime_CEPJ_Clouds_IOT_top"
            :start-color="findDataByLink('Maritime_CEPJ', 'Clouds_IOT')"
            :end-color="findDataByLink('Maritime_CEPJ', 'Clouds_IOT')"
            class="svgClass"
            :class="[findDataByStartAndEnd('Maritime_CEPJ', 'Clouds_IOT')?.pointShowUrl?'pointerCursor':'autoCursor']"
            style="left: 100px; top: 34px;"
            div-stroke-width="6"
            ball-stroke-width="5"
            svg-width="435px"
            svg-height="25px"
            set-points="11,15 435,15 435,16"
            @click-line="openPointsLink(findDataByStartAndEnd('Maritime_CEPJ', 'Clouds_IOT')?.pointShowUrl)"
          />
          <!-- 左侧线 -->
          <line-svg
            linear-id="Maritime_CEPJ_Clouds_IOT_left"
            :start-color="findDataByLink('Maritime_CEPJ', 'Clouds_IOT')"
            :end-color="findDataByLink('Maritime_CEPJ', 'Clouds_IOT')"
            class="svgClass"
            :class="[findDataByStartAndEnd('Maritime_CEPJ', 'Clouds_IOT')?.pointShowUrl?'pointerCursor':'autoCursor']"
            style="left: 100px; top: 34px;"
            div-stroke-width="6"
            ball-stroke-width="5"
            svg-width="20px"
            svg-height="235px"
            set-points="10,235 10,15 11,15"
            @click-line="openPointsLink(findDataByStartAndEnd('Maritime_CEPJ', 'Clouds_IOT')?.pointShowUrl)"
          />
          <div class="centerSystem g-w100 g-h100">
            <div class="g-w100" style="position: relative; margin-left: 45%; margin-top: 70px;">
              <div
                class="mainSize"
                :class="[getDataStatus('FPSO', 'class'),findDataByCode('FPSO')?.terraceShowUrl?'pointerCursor':'autoCursor']"
                @click="openNewLink(findDataByCode('FPSO')?.terraceShowUrl)"
              >
                {{ findDataByCode("FPSO")?.terraceName }}
              </div>
            </div>
          </div>
          <!-- Maritime_CEPI -  Clouds_IOT-->
          <!-- 一整条线 -->
          <!-- <line-svg
            linear-id="Maritime_CEPI_Clouds_IOT"
            :start-color="findDataByLink('Maritime_CEPI', 'Clouds_IOT')"
            :end-color="findDataByLink('Maritime_CEPI', 'Clouds_IOT')"
            class="svgClass"
            :class="[findDataByStartAndEnd('Maritime_CEPI', 'Clouds_IOT')?.pointShowUrl?'pointerCursor':'autoCursor']"
            style="left: 744px; top: 34px"
            div-stroke-width="6"
            ball-stroke-width="5"
            svg-width="435px"
            svg-height="233px"
            set-points="425,233 425,18 0,18"
            @click-line="openPointsLink(findDataByStartAndEnd('Maritime_CEPI', 'Clouds_IOT')?.pointShowUrl)"
          /> -->
          <!-- 顶部线 -->
          <line-svg
            linear-id="Maritime_CEPI_Clouds_IOT_top"
            :start-color="findDataByLink('Maritime_CEPI', 'Clouds_IOT')"
            :end-color="findDataByLink('Maritime_CEPI', 'Clouds_IOT')"
            class="svgClass"
            :class="[findDataByStartAndEnd('Maritime_CEPI', 'Clouds_IOT')?.pointShowUrl?'pointerCursor':'autoCursor']"
            style="left: 745px; top: 34px;"
            div-stroke-width="6"
            ball-stroke-width="5"
            svg-width="435px"
            svg-height="25px"
            set-points="435,16 435,15 0,15"
            @click-line="openPointsLink(findDataByStartAndEnd('Maritime_CEPI', 'Clouds_IOT')?.pointShowUrl)"
          />
          <!-- 右侧线 -->
          <line-svg
            linear-id="Maritime_CEPI_Clouds_IOT_right"
            :start-color="findDataByLink('Maritime_CEPI', 'Clouds_IOT')"
            :end-color="findDataByLink('Maritime_CEPI', 'Clouds_IOT')"
            class="svgClass"
            :class="[findDataByStartAndEnd('Maritime_CEPI', 'Clouds_IOT')?.pointShowUrl?'pointerCursor':'autoCursor']"
            style="left: 1167px; top: 34px;z-index: 1 !important;"
            div-stroke-width="6"
            ball-stroke-width="5"
            svg-width="20px"
            svg-height="235px"
            set-points="10,235 11,15 10,15"
            @click-line="openPointsLink(findDataByStartAndEnd('Maritime_CEPI', 'Clouds_IOT')?.pointShowUrl)"
          />
          <!-- CEPI -->
          <!-- :style="{ height: isFullScreen ? '990px' : '530px' }" -->
          <div class="rightSystem g-w100 g-h100">
            <div class="g-w100" style="position: relative; margin-left: 45%; margin-top: 70px;">
              <div
                class="mainSize"
                :class="getDataStatus('CEPI', 'class')"
                @click="openNewLink(findDataByCode('CEPI')?.terraceShowUrl)"
              >
                {{ findDataByCode("CEPI")?.terraceName }}
              </div>
              <!-- WHPH -->
              <div :class="[getDataStatus('WHPH', 'class'),findDataByCode('WHPH')?.terraceShowUrl?'pointerCursor':'autoCursor']" style="position: absolute; left: 189px; top: -51px;">
                <span @click="openNewLink(findDataByCode('WHPH')?.terraceShowUrl)">
                  {{ findDataByCode("WHPH")?.terraceName }}
                </span>
                <line-svg
                  :linear-id="findDataByCode('WHPH')?.terraceCode"
                  :start-color="getDataStatus('WHPH', 'color')"
                  :end-color="getDataStatus('WHPH', 'color')"
                  class="svgClass"
                  :class="[findDataByCode('WHPH')?.terraceShowUrl?'pointerCursor':'autoCursor']"
                  style="left: -126px; top: 0;"
                  div-stroke-width="6"
                  ball-stroke-width="5"
                  svg-width="125px"
                  svg-height="50px"
                  set-points="125,15 10,15 10,50"
                  @click-line="openNewLink(findDataByCode('WHPH')?.terraceShowUrl)"
                />
              </div>
              <!-- WHPB -->
              <div :class="[getDataStatus('WHPH', 'class'),findDataByCode('WHPB')?.terraceShowUrl?'pointerCursor':'autoCursor']" style="position: absolute; left: -165px; top: 63px;">
                <span @click="openNewLink(findDataByCode('WHPB')?.terraceShowUrl)">
                  {{ findDataByCode("WHPB")?.terraceName }}
                </span>
                <line-svg
                  :linear-id="findDataByCode('WHPB')?.terraceCode"
                  :start-color="getDataStatus('WHPB', 'color')"
                  :end-color="getDataStatus('WHPB', 'color')"
                  class="svgClass"
                  :class="[findDataByCode('WHPB')?.terraceShowUrl?'pointerCursor':'autoCursor']"
                  style="top: -28px; left: 59px;"
                  div-stroke-width="6"
                  ball-stroke-width="5"
                  svg-width="125px"
                  svg-height="50px"
                  set-points="0,40 115,40 115,0"
                  @click-line="openNewLink(findDataByCode('WHPB')?.terraceShowUrl)"
                />
              </div>
              <!-- WHPC -->
              <div :class="[getDataStatus('WHPC', 'class'),findDataByCode('WHPC')?.terraceShowUrl?'pointerCursor':'autoCursor']" style="position: absolute; left: 215px; top: 3px;">
                <span @click="openNewLink(findDataByCode('WHPC')?.terraceShowUrl)">{{
                  findDataByCode("WHPC")?.terraceName
                }}</span>
                <line-svg
                  :linear-id="findDataByCode('WHPC')?.terraceCode"
                  :start-color="getDataStatus('WHPC', 'color')"
                  :end-color="getDataStatus('WHPC', 'color')"
                  class="svgClass"
                  :class="[findDataByCode('WHPC')?.terraceShowUrl?'pointerCursor':'autoCursor']"
                  style="left: -127px; top: 3px;"
                  div-stroke-width="6"
                  ball-stroke-width="5"
                  svg-width="126px"
                  svg-height="20px"
                  set-points="125,10 0,10 0,11"
                  @click-line="openNewLink(findDataByCode('WHPC')?.terraceShowUrl)"
                />
              </div>
              <!-- CEPK -->
              <div :class="[getDataStatus('CEPK', 'class'),findDataByCode('CEPK')?.terraceShowUrl?'pointerCursor':'autoCursor']" style="position: absolute; left: -186px; top: 3px;">
                <span @click="openNewLink(findDataByCode('CEPK')?.terraceShowUrl)">{{
                  findDataByCode("CEPK")?.terraceName
                }}</span>
                <line-svg
                  :linear-id="findDataByCode('CEPK')?.terraceCode"
                  :start-color="getDataStatus('CEPK', 'color')"
                  :end-color="getDataStatus('CEPK', 'color')"
                  class="svgClass"
                  :class="[findDataByCode('CEPK')?.terraceShowUrl?'pointerCursor':'autoCursor']"
                  style="top: 3px; left: 59px;"
                  div-stroke-width="6"
                  ball-stroke-width="5"
                  svg-width="126px"
                  svg-height="20px"
                  set-points="0,11 0,10 125,10"
                  @click-line="openNewLink(findDataByCode('CEPK')?.terraceShowUrl)"
                />
              </div>
              <!-- WHPD -->
              <div :class="[getDataStatus('WHPD', 'class'),findDataByCode('CEPK')?.terraceShowUrl?'pointerCursor':'autoCursor']" style="position: absolute; left: 190px; top: 63px;">
                <span @click="openNewLink(findDataByCode('WHPD')?.terraceShowUrl)">{{
                  findDataByCode("WHPD")?.terraceName
                }}</span>
                <line-svg
                  :linear-id="findDataByCode('WHPD')?.terraceCode"
                  :start-color="getDataStatus('WHPD', 'color')"
                  :end-color="getDataStatus('WHPD', 'color')"
                  class="svgClass"
                  :class="[findDataByCode('WHPD')?.terraceShowUrl?'pointerCursor':'autoCursor']"
                  style="left: -126px; top: -27px;"
                  div-stroke-width="6"
                  ball-stroke-width="5"
                  svg-width="125px"
                  svg-height="50px"
                  set-points="125,40 10,40 10,0"
                  @click-line="openNewLink(findDataByCode('WHPD')?.terraceShowUrl)"
                />
              </div>
              <!-- WHPG -->
              <div :class="[getDataStatus('WHPG', 'class'),findDataByCode('CEPK')?.terraceShowUrl?'pointerCursor':'autoCursor']" style="position: absolute; left: 18px; top: 93px;">
                <span @click="openNewLink(findDataByCode('WHPG')?.terraceShowUrl)">
                  {{ findDataByCode("WHPG")?.terraceName }}
                </span>
                <line-svg
                  :linear-id="findDataByCode('WHPG')?.terraceCode"
                  :start-color="getDataStatus('WHPG', 'color')"
                  :end-color="getDataStatus('WHPG', 'color')"
                  class="svgClass"
                  :class="[findDataByCode('WHPG')?.terraceShowUrl?'pointerCursor':'autoCursor']"
                  style="left: 13px; top: -57px;"
                  div-stroke-width="6"
                  ball-stroke-width="5"
                  svg-width="20px"
                  svg-height="56px"
                  set-points="10,56 10,1 11,0"
                  @click-line="openNewLink(findDataByCode('WHPG')?.terraceShowUrl)"
                />
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
      ]
    };
  },
  computed: {
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
    this.getStatus();
  },
  destroyed() {
    window.clearInterval(this.timer);
  },
  methods: {
    clickClouds() {
      this.openDialog = true;
    },
    clearSearchList() {},
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
  width: 60px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  color: var(--old-red-color);
  background: var(--old-red-bg);
  border-radius: 2px;
  border: 1px solid var(--old-red-color);
  font-size: 14px;
  font-family: PingFangSC-Medium, "PingFang SC";
  font-weight: 500;
}

.greenSign {
  width: 60px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  color: var(--old-blue-color);
  background: var(--old-blue-bg);
  border-radius: 2px;
  border: 1px solid var(--old-blue-color);
  font-size: 14px;
  font-family: PingFangSC-Medium, "PingFang SC";
  font-weight: 500;
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
  margin-top: 2%;
}

.centerImage {
  background-size: 100% 100%;
  width: 980px;
  height: 76px;
  margin-top: 2%;
}

.bottomImage {
  background-size: 100% 100%;
  width: 1280px;
  height: 100px;
  margin-top: 2%;
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
  left: 0;
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
  width: 88px;
  height: 36px;
  line-height: 36px;
  text-align: center;
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
</style>