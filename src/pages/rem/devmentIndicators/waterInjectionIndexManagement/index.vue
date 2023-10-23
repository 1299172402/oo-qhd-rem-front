<!-- 注水指标管理 -->
<template>
  <div class="app-container">
    <header-search style="height: auto; padding: 10px 20px 12px">
      <div class="g-row-flex-V" style="justify-content: space-between">
        <div class="g-row-flex-V g-w100 g-h100" style="flex-wrap: wrap">
          <div style="margin: 10px 20px 10px 0px">
            油田：
            <el-select v-model="queryParams.oilFieldId" @change="changeOilFieldId">
              <el-option
                v-for="item in oilFieldList"
                :key="item.ogfId"
                :label="item.ogfName"
                :value="item.ogfId"
              ></el-option>
            </el-select>
          </div>
          <div style="margin: 10px 20px 10px 0px">
            年度：
            <el-date-picker
              v-model="queryParams.year"
              type="year"
              placeholder="选择年"
              value-format="yyyy-12-31"
            ></el-date-picker>
          </div>
          <div style="margin: 10px 20px 10px 0px">
            <el-button icon="el-icon-search" type="primary" @click="doSearch">搜索</el-button>
            <el-button icon="el-icon-refresh" class="commonBtn" @click="resetting">重置</el-button>
          </div>
        </div>
        <div class="g-row-flex-V" style="flex-wrap: wrap">
          <el-button
            class="commonBtn"
            v-if="$route.query.page || $route.query.name"
            @click="$router.push($route.query.page || $route.query.name)"
            >返回</el-button
          >
        </div>
      </div>
    </header-search>

    <page-panel-new class="app-content">
      <el-row style="height: auto; display: flex; flex-wrap: wrap" :gutter="20">
        <el-col v-for="(item, index) in zbData" :key="index" :span="4">
          <pagePanel
            v-if="item.title == '注水指标总览'"
            class="fl"
            :headerTitle="item.title"
            style="height: 180px; margin-top: 20px"
            @click.native="cardClick(item, index)"
          >
            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center">
              <span style="font-size: 30px; vertical-align: middle; color: rgb(143, 164, 204)">
                {{ item.title }}
              </span>
            </div>
          </pagePanel>
          <pagePanel
            v-else
            class="fl"
            :headerTitle="`${item.title}${item.chainType ? item.chainType : ''}`"
            style="height: 180px; margin-top: 20px"
          >
            <el-button
              style="
                position: absolute;
                z-index: 9;
                right: 10px;
                top: 0px;
                height: 26px;
                margin-top: 3px;
                padding: 0 16px;
              "
              type="primary"
              @click.native="cardClick(item, index)"
              >详情</el-button
            >
            <el-row>
              <el-col :span="15">
                <div style="vertical-align: middle; text-align: center">
                  <span style="font-size: 26px">{{ item.sz }}</span>
                  <sub style="color: #8fa4cc; font-size: 15px">
                    {{ item.dw }}
                  </sub>
                </div>
                <div style="margin-top: 10px">
                  <!-- item.title == '分注井层段合格率' ||  -->
                  <el-row
                    v-if="item.title == '含水上升率' || item.title == '自然递减率'"
                    :gutter="6"
                    style="line-height: 20px; text-align: center"
                  >
                    <el-col :span="13" style="color: #8fa4cc">环比上月</el-col>
                    <el-col :span="11">
                      <template v-if="item.hb">
                        <span v-if="item.hbTag == 'up'" style="color: #00c39f">{{ item.hb | numberFormat }}% ↑</span>
                        <span v-if="item.hbTag == 'down'" style="color: #cd3d00">{{ item.hb | numberFormat }}% ↓</span>
                      </template>
                      <span v-else> - </span>
                    </el-col>
                  </el-row>
                  <el-row
                    v-if="
                      item.title == '年注入量' ||
                      item.title == '地层压力保持水平' ||
                      item.title == '注水井分注率' ||
                      item.title == '动态监测完成率' ||
                      item.title == '分注井测试率'
                    "
                    :gutter="6"
                    style="line-height: 20px; text-align: center"
                  >
                    <el-col :span="13" style="color: #8fa4cc">环比上年</el-col>
                    <el-col :span="11">
                      <template v-if="item.hb">
                        <span v-if="item.hbTag == 'up'" style="color: #00c39f">{{ item.hb | numberFormat }}% ↑</span>
                        <span v-if="item.hbTag == 'down'" style="color: #cd3d00">{{ item.hb | numberFormat }}% ↓</span>
                      </template>
                      <span v-else> - </span>
                    </el-col>
                  </el-row>
                  <el-row
                    v-if="
                      item.title == '注水水质达标率' ||
                      item.title == '分注井层段合格率' ||
                      item.title == '含水上升率' ||
                      item.title == '自然递减率'
                    "
                    :gutter="6"
                    style="line-height: 20px; text-align: center"
                  >
                    <el-col :span="13" style="color: #8fa4cc">同比去年</el-col>
                    <el-col :span="11">
                      <template v-if="item.tb">
                        <span v-if="item.tbTag == 'up'" style="color: #00c39f">{{ item.tb | numberFormat }}% ↑</span>
                        <span v-if="item.tbTag == 'down'" style="color: #cd3d00">{{ item.tb | numberFormat }}% ↓</span>
                      </template>
                      <span v-else> - </span>
                    </el-col>
                  </el-row>
                  <el-row :gutter="6" style="line-height: 20px; text-align: center">
                    <el-col :span="13" style="color: #8fa4cc">与考核相比</el-col>
                    <el-col :span="11">
                      <template v-if="item.kh">
                        <span v-if="item.khTag == 'up'" style="color: #00c39f">{{ item.kh | numberFormat }}% ↑</span>
                        <span v-if="item.khTag == 'down'" style="color: #cd3d00">{{ item.kh | numberFormat }}% ↓</span>
                      </template>
                      <span v-else> - </span>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span="9">
                <Echart :chart-data="item.option" height="100%" width="100%"></Echart>
              </el-col>
            </el-row>
          </pagePanel>
        </el-col>
      </el-row>
      <pagePanel headerTitle="注水指标管理" v-if="currentIndex == 0" style="height: 500px" show-btn>
        <div class="g-row-flex-V" style="justify-content: space-between; margin-bottom: 20px">
          <div class="g-row-flex-V" style="flex-wrap: wrap">
            <div style="margin-right: 20px">
              对标油田：
              <el-select v-model="queryParams.targetOilFieldId" disabled>
                <el-option
                  v-for="item in oilFieldList"
                  :key="item.ogfId"
                  :label="item.ogfName"
                  :value="item.ogfId"
                ></el-option>
              </el-select>
            </div>
            <div style="margin-right: 20px">
              开发阶段：
              <el-select v-model="queryParams.devPhaseCode" clearable>
                <el-option
                  v-for="item in developmentPhaseList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </div>
            <div style="margin-right: 20px">
              <el-button icon="el-icon-search" type="primary" @click="doSearch">确定</el-button>
            </div>
          </div>
          <div class="g-row-flex-V" style="flex-wrap: wrap">
            <div>
              <el-button icon="el-icon-download" type="primary" style="margin-left: 20px" @click="doDownIndex">
                下载
              </el-button>
            </div>
          </div>
        </div>
        <el-table id="indexscv" :data="tableData" :key="Math.random()" highlight height="calc(100% - 55px)">
          <el-table-column prop="name" label="指标" align="center"></el-table-column>
          <el-table-column prop="real" label="实际值" align="center" :formatter="formatterNumber"></el-table-column>
          <el-table-column prop="chain" label="环比 (上年/上月)" align="center">
            <template slot-scope="scope" v-if="scope.row.chain">
              <span v-if="scope.row.name == '年注入量（10⁴m³）'">{{
                scope.row.chainType === 1
                  ? `${parseFloat(scope.row.chain).toFixed(4)} (年)`
                  : `${parseFloat(scope.row.chain).toFixed(4)} (月)`
              }}</span>
              <span v-else>{{
                scope.row.chainType === 1
                  ? `${parseFloat(scope.row.chain).toFixed(2)} (年)`
                  : `${parseFloat(scope.row.chain).toFixed(2)} (月)`
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="diffRealMom"
            label="实际值与环比差值"
            align="center"
            :formatter="formatterNumber"
          ></el-table-column>
          <el-table-column prop="checkValue" label="考核" align="center">
            <template slot-scope="scope">
              <div>
                <el-input-number
                  v-if="scope.row.state == 2"
                  placeholder="输入考核值"
                  v-model="scope.row.checkValue"
                  :precision="scope.row.name == '年注入量（10⁴m³）' ? 4 : 2"
                  style="width: 100%"
                ></el-input-number>
                <span v-else>
                  <span v-if="scope.row.name == '年注入量（10⁴m³）'">{{
                    scope.row.checkValue ? parseFloat(scope.row.checkValue).toFixed(4) : "-"
                  }}</span>
                  <span v-else>{{ scope.row.checkValue ? parseFloat(scope.row.checkValue).toFixed(2) : "-" }}</span>
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="diffRealCheck"
            label="实际值与考核差值"
            align="center"
            :formatter="formatterNumber"
          ></el-table-column>
          <el-table-column
            prop="compareOilField"
            label="对标油田"
            align="center"
            :formatter="formatterNumber"
          ></el-table-column>
          <el-table-column
            prop="realCompareOilField"
            label="实际值与对标差值"
            align="center"
            :formatter="formatterNumber"
          ></el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope" v-if="scope.row.name !== '年注入量（10⁴m³）'">
              <el-button
                type="text"
                key="button1"
                @click="editTbaleRow(scope.row, scope.$index)"
                v-if="scope.row.state == 1"
                >编辑</el-button
              >
              <el-button
                type="text"
                key="button2"
                @click="saveTableRow(scope.row, scope.$index)"
                v-else-if="scope.row.state == 2"
                >保存</el-button
              >
              <el-button
                type="text"
                key="button3"
                @click="calceTableRow(scope.row, scope.$index)"
                v-if="scope.row.state == 2"
                >取消</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </pagePanel>
      <pagePanel headerTitle="含水上升率" v-if="currentIndex == 5" style="height: 500px" show-btn>
        <div class="g-row-flex-V" style="justify-content: space-between; margin-bottom: 20px">
          <div class="g-row-flex-V" style="flex-wrap: wrap">
            <span>油藏分析单元：</span>
            <el-select v-model="queryParams.fileId">
              <el-option
                v-for="item in blockList"
                :key="item.reservoirAnalyseUnitId"
                :label="item.reservoirAnalyseUnitName"
                :value="item.reservoirAnalyseUnitId"
              >
              </el-option>
            </el-select>
            <el-button icon="el-icon-search" type="primary" style="margin-left: 20px" @click="doSearch">
              确定
            </el-button>
          </div>
        </div>
        <Echart :chart-data="rateOfWaterCutRise" height="calc(100% - 75px)"></Echart>
      </pagePanel>
      <pagePanel headerTitle="自然递减率" v-if="currentIndex == 9" style="height: 500px" show-btn>
        <div class="g-row-flex-V" style="justify-content: space-between; margin-bottom: 20px">
          <div class="g-row-flex-V" style="flex-wrap: wrap">
            <span>油藏分析单元：</span>
            <el-select v-model="queryParams.fileId">
              <el-option
                v-for="item in blockList"
                :key="item.reservoirAnalyseUnitId"
                :label="item.reservoirAnalyseUnitName"
                :value="item.reservoirAnalyseUnitId"
              >
              </el-option>
            </el-select>
            <el-button icon="el-icon-search" type="primary" style="margin-left: 20px" @click="doSearch">
              确定
            </el-button>
          </div>
        </div>
        <Echart :chart-data="naturalDeclineRate" height="calc(100% - 75px)"></Echart>
      </pagePanel>
    </page-panel-new>
  </div>
</template>

<script>
import Echart from "@/components/tools/Echarts/index.vue";
import { exportExcel } from "@/lib/exportExcel.js";
import { QueryOgfDetail, QueryReservoirAnalyseUnit, userListByUserNames } from "@/api/rem/marster.js";
import {
  injectionYear,
  layerPressureLevelRate,
  waterQualityRate,
  dividingLayerQualityRate,
  rateOfmoistureRate,
  injectionWellDividingRate,
  dynamicMoniterFinshRate,
  dividingTestRate,
  natureDeclineRate,
  injectionIndicatorStat,
  injectionAuditUpdate,
} from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
import dayjs from "dayjs";
export default {
  name: "waterInjectionIndexManagement",
  components: {
    Echart,
  },
  filters: {
    //过滤规则 保留两位小数
    numberFormat(val) {
      if (val) {
        return parseFloat(Number(val).toFixed(2));
      } else {
        return 0;
      }
    },
  },
  data() {
    return {
      currentIndex: 0,
      //查询参数
      queryParams: {
        companyId: "715AD1CD60484BB59E737CD18A9DE44A", // 作业公司
        oilFieldId: "3FC9A818F5BC43B88270DB80BBB3018F", // 油田
        targetOilFieldId: "3FC9A818F5BC43B88270DB80BBB3018F", // 对标油田
        platFormId: "", // 平台
        fileId: "", // 区块id
        layerId: "", // 层系id
        year: dayjs().format("YYYY-12-31"),
        devPhaseCode: "", // 开发阶段代码
        outputDegreeCode: "", // 采出程度代码
        reservoirsTypeCode: "", // 油藏类型代码
        // pageNum: 1,
        // pageSize: 9999,
      },
      // 油田名称
      oilFieldName: "",
      page: 1,
      pageSize: 10,
      //指标数据
      zbData: [
        { title: "注水指标总览" },
        {
          title: "年注入量",
          sz: "",
          hb: "",
          tb: "",
          kh: "",
          dw: "10⁴m³",
          option: {
            title: {
              text: "注水数据",
              textStyle: {
                color: "#8FA4CC",
                fontSize: 16,
              },
              top: 0,
              left: "center",
            },
            grid: {
              x: 0,
              y: 30,
              x2: 0,
              y2: 20,
            },
            xAxis: {
              type: "category",
              data: [
                "2020/01",
                "2020/02",
                "2020/03",
                "2020/04",
                "2020/05",
                "2020/06",
                "2020/07",
                "2020/08",
                "2020/09",
                "2020/10",
              ],
              show: false,
            },
            yAxis: {
              type: "value",
              show: false,
            },
            series: [
              {
                data: [3, 5, 3, 8, 7, 3, 8, 10, 9, 6],
                type: "line",
                showSymbol: false,
                smooth: true,
                color: "#3375EC",
                areaStyle: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#23529F",
                    },
                    {
                      offset: 1,
                      color: "#012D4F",
                    },
                  ]),
                },
              },
            ],
          },
        },
        {
          title: "地层压力保持水平",
          sz: "",
          hb: "",
          tb: "",
          kh: "",
          dw: "%",
          option: {
            title: {
              text: "注够水",
              textStyle: {
                color: "#8FA4CC",
                fontSize: 16,
              },
              top: 0,
              left: "center",
            },
            grid: {
              x: 0,
              y: 30,
              x2: 0,
              y2: 20,
            },
            xAxis: {
              type: "category",
              data: [
                "2020/01",
                "2020/02",
                "2020/03",
                "2020/04",
                "2020/05",
                "2020/06",
                "2020/07",
                "2020/08",
                "2020/09",
                "2020/10",
              ],
              show: false,
            },
            yAxis: {
              type: "value",
              show: false,
            },
            series: [
              {
                data: [3, 5, 3, 8, 7, 3, 8, 10, 9, 6],
                type: "line",
                showSymbol: false,
                smooth: true,
                color: "#3375EC",
                areaStyle: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#23529F",
                    },
                    {
                      offset: 1,
                      color: "#012D4F",
                    },
                  ]),
                },
              },
            ],
          },
        },
        {
          title: "注水水质达标率",
          sz: "",
          hb: "",
          tb: "",
          kh: "",
          dw: "%",
          option: {
            title: {
              text: "注好水",
              textStyle: {
                color: "#8FA4CC",
                fontSize: 16,
              },
              top: 0,
              left: "center",
            },
            grid: {
              x: 0,
              y: 30,
              x2: 0,
              y2: 20,
            },
            xAxis: {
              type: "category",
              data: [
                "2020/01",
                "2020/02",
                "2020/03",
                "2020/04",
                "2020/05",
                "2020/06",
                "2020/07",
                "2020/08",
                "2020/09",
                "2020/10",
              ],
              show: false,
            },
            yAxis: {
              type: "value",
              show: false,
            },
            series: [
              {
                data: [3, 5, 3, 8, 7, 3, 8, 10, 9, 6],
                type: "line",
                showSymbol: false,
                smooth: true,
                color: "#3375EC",
                areaStyle: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#23529F",
                    },
                    {
                      offset: 1,
                      color: "#012D4F",
                    },
                  ]),
                },
              },
            ],
          },
        },
        {
          title: "分注井层段合格率",
          sz: "",
          hb: "",
          tb: "",
          kh: "",
          dw: "%",
          option: {
            title: {
              text: "精细注水",
              textStyle: {
                color: "#8FA4CC",
                fontSize: 16,
              },
              top: 0,
              left: "center",
            },
            grid: {
              x: 0,
              y: 30,
              x2: 0,
              y2: 20,
            },
            xAxis: {
              type: "category",
              data: [
                "2020/01",
                "2020/02",
                "2020/03",
                "2020/04",
                "2020/05",
                "2020/06",
                "2020/07",
                "2020/08",
                "2020/09",
                "2020/10",
              ],
              show: false,
            },
            yAxis: {
              type: "value",
              show: false,
            },
            series: [
              {
                data: [3, 5, 3, 8, 7, 3, 8, 10, 9, 6],
                type: "line",
                showSymbol: false,
                smooth: true,
                color: "#3375EC",
                areaStyle: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#23529F",
                    },
                    {
                      offset: 1,
                      color: "#012D4F",
                    },
                  ]),
                },
              },
            ],
          },
        },
        {
          title: "注水井分注率",
          sz: "",
          hb: "",
          tb: "",
          kh: "",
          dw: "%",
          option: {
            title: {
              text: "精细注水",
              textStyle: {
                color: "#8FA4CC",
                fontSize: 16,
              },
              top: 0,
              left: "center",
            },
            grid: {
              x: 0,
              y: 30,
              x2: 0,
              y2: 20,
            },
            xAxis: {
              type: "category",
              data: [
                "2020/01",
                "2020/02",
                "2020/03",
                "2020/04",
                "2020/05",
                "2020/06",
                "2020/07",
                "2020/08",
                "2020/09",
                "2020/10",
              ],
              show: false,
            },
            yAxis: {
              type: "value",
              show: false,
            },
            series: [
              {
                data: [3, 5, 3, 8, 7, 3, 8, 10, 9, 6],
                type: "line",
                showSymbol: false,
                smooth: true,
                color: "#3375EC",
                areaStyle: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#23529F",
                    },
                    {
                      offset: 1,
                      color: "#012D4F",
                    },
                  ]),
                },
              },
            ],
          },
        },
        {
          title: "动态监测完成率",
          sz: "",
          hb: "",
          tb: "",
          kh: "",
          dw: "%",
          option: {
            title: {
              text: "精细注水",
              textStyle: {
                color: "#8FA4CC",
                fontSize: 16,
              },
              top: 0,
              left: "center",
            },
            grid: {
              x: 0,
              y: 30,
              x2: 0,
              y2: 20,
            },
            xAxis: {
              type: "category",
              data: [
                "2020/01",
                "2020/02",
                "2020/03",
                "2020/04",
                "2020/05",
                "2020/06",
                "2020/07",
                "2020/08",
                "2020/09",
                "2020/10",
              ],
              show: false,
            },
            yAxis: {
              type: "value",
              show: false,
            },
            series: [
              {
                data: [3, 5, 3, 8, 7, 3, 8, 10, 9, 6],
                type: "line",
                showSymbol: false,
                smooth: true,
                color: "#3375EC",
                areaStyle: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#23529F",
                    },
                    {
                      offset: 1,
                      color: "#012D4F",
                    },
                  ]),
                },
              },
            ],
          },
        },
        {
          title: "分注井测试率",
          sz: "",
          hb: "",
          tb: "",
          kh: "",
          dw: "%",
          option: {
            title: {
              text: "精细注水",
              textStyle: {
                color: "#8FA4CC",
                fontSize: 16,
              },
              top: 0,
              left: "center",
            },
            grid: {
              x: 0,
              y: 30,
              x2: 0,
              y2: 20,
            },
            xAxis: {
              type: "category",
              data: [
                "2020/01",
                "2020/02",
                "2020/03",
                "2020/04",
                "2020/05",
                "2020/06",
                "2020/07",
                "2020/08",
                "2020/09",
                "2020/10",
              ],
              show: false,
            },
            yAxis: {
              type: "value",
              show: false,
            },
            series: [
              {
                data: [3, 5, 3, 8, 7, 3, 8, 10, 9, 6],
                type: "line",
                showSymbol: false,
                smooth: true,
                color: "#3375EC",
                areaStyle: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#23529F",
                    },
                    {
                      offset: 1,
                      color: "#012D4F",
                    },
                  ]),
                },
              },
            ],
          },
        },
        {
          title: "含水上升率",
          sz: "",
          hb: "",
          tb: "",
          kh: "",
          dw: "%",
          chainType: "(月)",
          option: {
            title: {
              text: "稳油控水",
              textStyle: {
                color: "#8FA4CC",
                fontSize: 16,
              },
              top: 0,
              left: "center",
            },
            grid: {
              x: 0,
              y: 30,
              x2: 0,
              y2: 20,
            },
            xAxis: {
              type: "category",
              data: [
                "2020/01",
                "2020/02",
                "2020/03",
                "2020/04",
                "2020/05",
                "2020/06",
                "2020/07",
                "2020/08",
                "2020/09",
                "2020/10",
              ],
              show: false,
            },
            yAxis: {
              type: "value",
              show: false,
            },
            series: [
              {
                data: [3, 5, 3, 8, 7, 3, 8, 10, 9, 6],
                type: "line",
                showSymbol: false,
                smooth: true,
                color: "#3375EC",
                areaStyle: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#23529F",
                    },
                    {
                      offset: 1,
                      color: "#012D4F",
                    },
                  ]),
                },
              },
            ],
          },
        },
        {
          title: "自然递减率",
          sz: "",
          hb: "",
          tb: "",
          kh: "",
          dw: "%",
          chainType: "(月)",
          option: {
            title: {
              text: "稳油控水",
              textStyle: {
                color: "#8FA4CC",
                fontSize: 16,
              },
              top: 0,
              left: "center",
            },
            grid: {
              x: 0,
              y: 30,
              x2: 0,
              y2: 20,
            },
            xAxis: {
              type: "category",
              data: [
                "2020/01",
                "2020/02",
                "2020/03",
                "2020/04",
                "2020/05",
                "2020/06",
                "2020/07",
                "2020/08",
                "2020/09",
                "2020/10",
              ],
              show: false,
            },
            yAxis: {
              type: "value",
              show: false,
            },
            series: [
              {
                data: [3, 5, 3, 8, 7, 3, 8, 10, 9, 6],
                type: "line",
                showSymbol: false,
                smooth: true,
                color: "#3375EC",
                areaStyle: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#23529F",
                    },
                    {
                      offset: 1,
                      color: "#012D4F",
                    },
                  ]),
                },
              },
            ],
          },
        },
      ],
      //油田列表
      oilFieldList: [],
      //区块下拉数据
      blockList: [],
      //开发阶段列表
      developmentPhaseList: [
        {
          value: "低含水期",
          label: "低含水期",
        },
        {
          value: "中含水期",
          label: "中含水期",
        },
      ],
      //含水上升率
      rateOfWaterCutRise: {
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0],
            start: 0, //滚动条开始位置（共100等份）
            end: 100, //滚动条结束位置
          },
        ],
        title: {
          text: "含水上升率",
          textStyle: {
            color: "#8FA4CC",
          },
          top: 0,
          left: "center",
        },
        grid: {
          x: 120,
          y: 80,
          x2: 120,
          y2: 60,
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "含水上升率",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: [],
          textStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          x: "center",
          bottom: 0,
          icon: "rect",
          itemWidth: 12,
          itemHeight: 6,
          itemGap: 14,
        },
        xAxis: {
          name: "日期 (月)",
          nameTextStyle: {
            color: "#8FA4CC",
          },
          type: "category",
          axisLabel: {
            color: "#8FA4CC",
            fontSize: 14,
            padding: [10, 0, 0, 0],
            formatter: function (val) {
              return Number(val) + "月";
            },
          },
           axisTick: {
              show: true,
              inside: true,
            },
          axisLine: {
            show: true,
            onZero: false,
            lineStyle: {
              color: "#8FA4CC",
            },
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        yAxis: [
          {
            name: "含水上升率 (%)",
            nameLocation: "middle",
            nameGap: 70,
            nameTextStyle: {
              color: "#8FA4CC",
              fontSize: 14,
            },
            type: "value",
            minInterval: 1,
            axisLabel: {
              color: "#8FA4CC",
            },
            scale: true,
            axisTick: {
              show: true,
              inside: true,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#8FA4CC",
              },
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,255,255,.16)",
              },
            },
          },
        ],
        color: ["#1379F7", "#FF5844", "#F5BE43", "#00BC9C", "#FF5844", "#DA835E", "#9A72FF", "#FF30AD", "#2ACAFF"],
        series: [],
      },
      //自然递减率
      naturalDeclineRate: {
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0],
            start: 0, //滚动条开始位置（共100等份）
            end: 100, //滚动条结束位置
          },
        ],
        title: {
          text: "自然递减率",
          textStyle: {
            color: "#8FA4CC",
          },
          top: 0,
          left: "center",
        },
        grid: {
          x: 120,
          y: 80,
          x2: 120,
          y2: 60,
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "自然递减率",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
            },
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: [],
          textStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          x: "center",
          bottom: 0,
          icon: "rect",
          itemWidth: 12,
          itemHeight: 6,
          itemGap: 14,
        },
        xAxis: {
          name: "日期 (月)",
          nameTextStyle: {
            color: "#8FA4CC",
          },
          type: "category",
          axisLabel: {
            color: "#8FA4CC",
            fontSize: 14,
            padding: [10, 0, 0, 0],
            formatter: function (val) {
              return Number(val) + "月";
            },
          },
           axisTick: {
              show: true,
              inside: true,
            },
          axisLine: {
            show: true,
            onZero: false,
            lineStyle: {
              color: "#8FA4CC",
            },
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        yAxis: [
          {
            name: "自然递减率 (%)",
            nameLocation: "middle",
            nameGap: 70,
            nameTextStyle: {
              color: "#8FA4CC",
            },
            type: "value",
            minInterval: 1,
            axisLabel: {
              color: "#8FA4CC",
            },
            scale: true,
            axisTick: {
              show: true,
              inside: true,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#8FA4CC",
              },
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,255,255,.16)",
              },
            },
          },
        ],
        series: [],
      },
      // 注水指标管理 考核值编辑按钮点击后记录
      oldCheckValue: "",
      //注水指标管理
      tableData: [],
      //缓存权限数据
      myWidget: [],
      userInfo: {},
      //按钮权限组
      //添加记录
      canAddInfo: false,
      //修改数据
      canUpdateInfo: false,
      //发布数据
      canSendInfo: false,
      //删除数据
      canDeleteInfo: false,
      //下载数据
      canDownload: false,
      //上传数据
      canUpload: false,
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    //重置
    resetting() {
      Object.assign(this.$data, this.$options.data());
      this.initData();
    },
    //点击事件
    cardClick(item, index) {
      this.queryParams.platFormId = "";
      // this.queryParams.year = "";
      if (index == 1) {
        // 年注入量
        this.$router.push({
          name: "AnnualInjection",
          query: {},
        });
      } else if (index == 2) {
        // 地层压力保持水平
        this.$router.push({
          name: "StratumPressure",
          query: {},
        });
      } else if (index == 3) {
        // 注水水质达标率
        this.$router.push({
          name: "WaterQuality",
          query: {},
        });
      } else if (index == 4) {
        // 分注井层段合格率
        this.$router.push({
          name: "SplitHole",
          query: {},
        });
      } else if (index == 6) {
        // 注水井分注率
        this.$router.push({
          name: "WaterInjectionWell",
          query: {},
        });
      } else if (index == 7) {
        // 动态监测完成率
        this.$router.push({
          name: "DynamicMonitoring",
          query: {},
        });
      } else if (index == 8) {
        // 分注井测试率
        this.$router.push({
          name: "SplitWellTest",
          query: {},
        });
      } else {
        this.currentIndex = index;
        this.doSearch();
      }
    },
    //初始化页面
    async initData() {
      if (this.$route.query?.alarmTime) {
        this.queryParams.year = this.$route.query.alarmTime;
      }
      let params = {
        searchKeys: [this.$store.getters["user/userDetail"].user.userName],
      };
      await userListByUserNames(params).then((res) => {
        if (res.data.code == 200) {
          this.queryParams.companyId =
            res.data.data[0]?.currentTenantBindOrgId
              ? res.data.data[0].currentTenantBindOrgId
              : undefined;
        }
      });
      await QueryOgfDetail({ operationZoneId: this.queryParams.companyId }).then((data) => {
        let code = data.data.code;
        if (code == 200) {
          this.oilFieldList = data.data.data;
          if (this.queryParams.companyId === "715AD1CD60484BB59E737CD18A9DE44A") {
            this.queryParams.oilFieldId = "3FC9A818F5BC43B88270DB80BBB3018F";
          } else {
            this.queryParams.oilFieldId = this.oilFieldList[0].ogfId ? this.oilFieldList[0].ogfId : undefined;
          }
        }
      });
      //对标油田默认qhd3-26油田
      this.queryParams.targetOilFieldId = "3FC9A818F5BC43B88270DB80BBB3018F";
      this.getFetchFields();
      //下面初始化调用各个接口 因为默认的全部平台和全部区块为 油田id 所以这样的区块平台默认写为油田id
      this.doInjectionIndicatorStat();
      this.doInjectionYear();
      this.doLayerPressureLevelRate();
      this.doWaterQualityRate();
      this.doDividingLayerQualityRate();
      this.doRateOfmoistureRate();
      this.doInjectionWellDividingRate();
      this.doDynamicMoniterFinshRate();
      this.doDividingTestRate();
      this.doNatureDeclineRate();
    },
    // 切换油田更新九个指标
    changeOilFieldId() {
      this.getFetchFields();

      this.doInjectionYear();
      this.doLayerPressureLevelRate();
      this.doWaterQualityRate();
      this.doDividingLayerQualityRate();
      this.doRateOfmoistureRate();
      this.doInjectionWellDividingRate();
      this.doDynamicMoniterFinshRate();
      this.doDividingTestRate();
      this.doNatureDeclineRate();
    },
    //作业公司切换事件
    changeCompany() {
      QueryOgfDetail({}).then((data) => {
        this.queryParams.oilFieldId = null;
        this.oilFieldList = [];
        let code = data.data.code;
        if (code == 200) {
          this.oilFieldList = data.data.data;
        } else {
          this.oilFieldList = [];
        }
      });
    },
    //时间范围切换
    createChange(dates) {
      if (dates && dates.length == 2) {
        this.queryParams.beginDate = dates[0];
        this.queryParams.endDate = dates[1];
      } else {
        this.queryParams.beginDate = "";
        this.queryParams.endDate = "";
      }
    },
    //获得区块类型
    getFetchFields() {
      QueryReservoirAnalyseUnit({ ogfId: this.queryParams.oilFieldId }).then((res) => {
        if (res.data.code == 200) {
          this.blockList = res.data.data;
          this.blockList.unshift({
            reservoirAnalyseUnitId: oilFieldId,
            reservoirAnalyseUnitName: "全部",
            reservoirAnalyseUnitNo: "全部",
          });
          this.queryParams.fileId = this.queryParams.oilFieldId;
        }
      });
    },
    //查询
    doSearch() {
      //注水指标管理
      if (this.currentIndex == 0) {
        this.doInjectionIndicatorStat();
      } else if (this.currentIndex == 5) {
        //含水上升率
        this.doRateOfmoistureRate();
      } else if (this.currentIndex == 9) {
        //自然递减率
        this.doNatureDeclineRate();
      }
    },
    editTbaleRow(row, index) {
      this.oldCheckValue = row.checkValue;
      this.$set(this.tableData[index], "state", 2);
      this.$forceUpdate();
    },
    // 注水指标管理-保存按钮，保存考核值修改项
    saveTableRow(row, index) {
      injectionAuditUpdate({
        name: row.name,
        yearMonth: this.queryParams.year,
        auditNumber: row.checkValue,
      }).then((res) => {
        if (res.data.code == 200) {
          this.$message.success("保存成功");
          this.doInjectionIndicatorStat();
        } else {
          this.$message.success("保存失败");
        }
      });
    },
    // 注水指标管理-取消按钮，隐藏考核值修改项
    calceTableRow(row, index) {
      this.$set(this.tableData[index], "checkValue", this.oldCheckValue);
      this.$set(this.tableData[index], "state", 1);
      this.$forceUpdate();
    },
    //注水指标管理-注水指标统计
    doInjectionIndicatorStat() {
      injectionIndicatorStat(this.queryParams).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.injectionIndicatorManagements || [];
          if (this.tableData?.length) {
            this.tableData.forEach((item) => (item.state = 1));
          } else {
            this.tableData = [];
          }
        } else {
          this.tableData = [];
        }
      });
    },
    //注水指标管理-年注入量
    doInjectionYear() {
      injectionYear(this.queryParams).then((res) => {
        if (res.data.code == 200) {
          //获得相关指标信息
          let detail = res.data.data.indicatorContent;
          let zb = this.zbData.find((item) => {
            return item.title == "年注入量";
          });
          //指标详情
          zb.sz = detail.detail;
          //环比
          zb.hb = detail.mom;
          zb.hbTag = detail.chainTag;
          //同比
          /* zb.tb=detail.moy;
                         zb.tbTag=detail.yearOnYearTag;*/
          //考核
          zb.kh = detail.compareCheck;
          zb.khTag = detail.auditTag;
        }
      });
    },
    //注水指标管理-地层压力保持水平
    doLayerPressureLevelRate() {
      layerPressureLevelRate(this.queryParams).then((res) => {
        if (res.data.code == 200) {
          //获得相关指标信息
          let detail = res.data.data.indicatorContent;
          let zb = this.zbData.find((item) => {
            return item.title == "地层压力保持水平";
          });
          //指标详情
          zb.sz = detail.detail;
          //环比
          zb.hb = detail.mom;
          // zb.hbTag = detail.chainTag;
          zb.hbTag = "up";
          //同比
          /* zb.tb=detail.moy;
                         zb.tbTag=detail.yearOnYearTag;*/
          //考核
          zb.kh = detail.compareCheck;
          zb.khTag = detail.auditTag;
        }
      });
    },
    //注水指标管理-注水指标达标率
    doWaterQualityRate() {
      waterQualityRate(this.queryParams).then((res) => {
        if (res.data.code == 200) {
          //获得相关指标信息
          let detail = res.data.data.indicatorContent;
          let zb = this.zbData.find((item) => {
            return item.title == "注水水质达标率";
          });
          //指标详情
          zb.sz = detail.detail;
          //环比
          zb.hb = detail.mom;
          zb.hbTag = detail.chainTag;
          //同比
          zb.tb = detail.moy;
          zb.tbTag = detail.yearOnYearTag;
          //考核
          zb.kh = detail.compareCheck;
          zb.khTag = detail.auditTag;
        }
      });
    },
    //分注井层段合格率
    doDividingLayerQualityRate() {
      let queryParams = {
        ...this.queryParams,
      };
      if (queryParams.oilFieldId == queryParams.platFormId) {
        queryParams.platFormId = "";
      }
      dividingLayerQualityRate(this.queryParams).then((res) => {
        if (res.data.code == 200) {
          //获得相关指标信息
          let detail = res.data.data.indicatorContent;
          let zb = this.zbData.find((item) => {
            return item.title == "分注井层段合格率";
          });
          //指标详情
          zb.sz = detail.detail;
          //环比
          zb.hb = detail.mom;
          zb.hbTag = detail.chainTag;
          //同比
          zb.tb = detail.moy;
          zb.tbTag = detail.yearOnYearTag;
          //考核
          zb.kh = detail.compareCheck;
          zb.khTag = detail.auditTag;
        }
      });
    },
    //含水上升率
    doRateOfmoistureRate() {
      rateOfmoistureRate({
        ...this.queryParams,
      }).then((res) => {
        if (res.data.code == 200) {
          //获得相关指标信息
          let detail = res.data.data.indicatorContent;
          let zb = this.zbData.find((item) => {
            return item.title == "含水上升率";
          });
          //指标详情
          zb.sz = detail.detail;
          //环比
          zb.hb = detail.mom;
          zb.hbTag = detail.chainTag;
          //同比
          zb.tb = detail.moy;
          zb.tbTag = detail.yearOnYearTag;
          //考核
          zb.kh = detail.compareCheck;
          zb.khTag = detail.auditTag;

          let legendData = [];
          let seriesData = [];
          let xData = [];
          let xSet = new Set();
          let linearCharts = res.data.data.chart.linearDataSets;
          linearCharts.forEach((item, index) => {
            legendData.push(item.label);
            let series = {};
            series.name = item.label;
            series.markLine = {
              lineStyle: {
                type: "solid",
                color: "#8FA4CC",
              },
              symbol: "none",
              animation: false,
              silent: true,
              data: [
                {
                  yAxis: 0,
                  name: "",
                  label: {
                    show: false,
                  },
                },
              ],
            };
            if (item.label == "今年实际值") {
              series.type = "line";
              series.symbol = "circle";
              series.symbolSize = 10;
              series.itemStyle = {
                normal: {
                  color: "#f45f4e",
                  lineStyle: {
                    width: 2,
                    type: "dotted",
                  },
                },
              };
              // series.type = "bar";
              // series.barMaxWidth = 40;
              // series.itemStyle = {
              //   normal: {
              //     color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              //       {
              //         // 四个数字分别对应 数组中颜色的开始位置，分别为 右，下，左，上。例如（1,0,0,0 ）代表从右边开始渐
              //         // 变。offset取值为0~1，0代表开始时的颜色，1代表结束时的颜色，柱子表现为这两种颜色的渐变。
              //         offset: 0,
              //         color: "#16c8ed",
              //       },
              //       {
              //         offset: 1,
              //         color: "#0f66ea",
              //       },
              //     ]),
              //   },
              // };
            } else if (item.label == "去年实际值") {
              series.type = "line";
              series.symbol = "circle";
              series.symbolSize = 10;
              series.itemStyle = {
                normal: {
                  color: "#2d6ff8",
                  lineStyle: {
                    width: 2,
                    type: "dotted",
                  },
                },
              };
            } else if (item.label == "今年考核值") {
              series.type = "line";
              series.symbol = "none";
              series.symbolSize = 0;
              series.itemStyle = {
                normal: {
                  color: "#d7b501",
                  lineStyle: {
                    width: 2,
                    type: "solid",
                  },
                },
              };
            }
            let lineData = item.linearData;
            let seriesMess = [];
            lineData.forEach((dot, index) => {
              let point = [];
              point.push(dot.label.substring(5, 7));
              xSet.add(dot.label.substring(5, 7));
              point.push(dot.value);
              seriesMess.push(point);
            });
            series.data = seriesMess;
            seriesData.push(series);
          });
          xData = Array.from(xSet).sort();
          this.rateOfWaterCutRise.xAxis.data = xData;
          this.rateOfWaterCutRise.legend.data = legendData;
          this.rateOfWaterCutRise.series = seriesData;
          this.rateOfWaterCutRise.title.text = `${this.oilFieldName || ""}含水上升率`;
        }
      });
    },
    //注水井分注率
    doInjectionWellDividingRate() {
      injectionWellDividingRate(this.queryParams).then((res) => {
        if (res.data.code == 200) {
          //获得相关指标信息
          let detail = res.data.data?.indicatorContent;
          let zb = this.zbData.find((item) => {
            return item.title == "注水井分注率";
          });
          if (detail) {
            //指标详情
            zb.sz = detail.detail;
            //环比
            zb.hb = detail.mom;
            zb.hbTag = detail.chainTag;
            /*//同比
                            zb.tb=detail.moy;
                            zb.tbTag=detail.yearOnYearTag;*/
            //考核
            zb.kh = detail.compareCheck;
            zb.khTag = detail.auditTag;
          }
        }
      });
    },
    //动态监测完成率
    doDynamicMoniterFinshRate() {
      dynamicMoniterFinshRate(this.queryParams).then((res) => {
        if (res?.data?.code == 200) {
          //获得相关指标信息
          let detail = res.data.data.indicatorContent;
          let zb = this.zbData.find((item) => {
            return item.title == "动态监测完成率";
          });
          //指标详情
          zb.sz = detail.detail;
          //环比
          zb.hb = detail.mom;
          zb.hbTag = detail.chainTag;
          /*//同比
                        zb.tb=detail.moy;
                        zb.tbTag=detail.yearOnYearTag;*/
          //考核
          zb.kh = detail.compareCheck;
          zb.khTag = detail.auditTag;
        }
      });
    },
    //分注井测试率
    doDividingTestRate() {
      dividingTestRate(this.queryParams).then((res) => {
        if (res.data.code == 200) {
          //获得相关指标信息
          let detail = res.data.data.indicatorContent;
          let zb = this.zbData.find((item) => {
            return item.title == "分注井测试率";
          });
          //指标详情
          zb.sz = detail.detail;
          //环比
          zb.hb = detail.mom;
          zb.hbTag = detail.chainTag;
          /*//同比
                        zb.tb=detail.moy;
                        zb.tbTag=detail.yearOnYearTag;*/
          //考核
          zb.kh = detail.compareCheck;
          zb.khTag = detail.auditTag;
        }
      });
    },
    //自然递减率
    doNatureDeclineRate() {
      natureDeclineRate({
        ...this.queryParams,
      }).then((res) => {
        if (res.data.code == 200) {
          //获得相关指标信息
          let detail = res.data.data.indicatorContent;
          let zb = this.zbData.find((item) => {
            return item.title == "自然递减率";
          });
          //指标详情
          zb.sz = detail.detail;
          //环比
          zb.hb = detail.mom;
          zb.hbTag = detail.chainTag;
          //同比
          zb.tb = detail.moy;
          zb.tbTag = detail.yearOnYearTag;
          //考核
          zb.kh = detail.compareCheck;
          zb.khTag = detail.auditTag;

          let legendData = [];
          let seriesData = [];
          let xData = [];
          let xSet = new Set();
          let linearCharts = res.data.data.chart.linearDataSets;
          linearCharts.forEach((item, index) => {
            legendData.push(item.label);
            let series = {};
            series.name = item.label;
            series.markLine = {
              lineStyle: {
                type: "solid",
                color: "#8FA4CC",
              },
              symbol: "none",
              animation: false,
              silent: true,
              data: [
                {
                  yAxis: 0,
                  name: "",
                  label: {
                    show: false,
                  },
                },
              ],
            };
            if (item.label == "今年实际值") {
              series.type = "line";
              series.symbol = "circle";
              series.symbolSize = 10;
              series.itemStyle = {
                normal: {
                  color: "#f45f4e",
                  lineStyle: {
                    width: 2,
                    type: "dotted",
                  },
                },
              };
            } else if (item.label == "去年实际值") {
              series.type = "line";
              series.symbol = "circle";
              series.symbolSize = 10;
              series.itemStyle = {
                normal: {
                  color: "#2d6ff8",
                  lineStyle: {
                    width: 2,
                    type: "dotted",
                  },
                },
              };
            } else if (item.label == "今年考核值") {
              series.type = "line";
              series.symbol = "none";
              series.symbolSize = 0;
              series.itemStyle = {
                normal: {
                  color: "#d7b501",
                  lineStyle: {
                    width: 2,
                    type: "solid",
                  },
                },
              };
            }
            // if (item.label == "去年实际值") {
            //   series.itemStyle = {
            //     normal: {
            //       lineStyle: {
            //         width: 5,
            //         type: "dotted",
            //       },
            //     },
            //   };
            // }
            // series.type = "line";
            let lineData = item.linearData;
            let seriesMess = [];
            lineData.forEach((dot, index) => {
              let point = [];
              point.push(dot.label.substring(5, 7));
              xSet.add(dot.label.substring(5, 7));
              point.push(dot.value);
              seriesMess.push(point);
            });
            series.data = seriesMess;
            seriesData.push(series);
          });
          xData = Array.from(xSet).sort();
          this.naturalDeclineRate.xAxis.data = xData;
          this.naturalDeclineRate.legend.data = legendData;
          this.naturalDeclineRate.series = seriesData;
          this.naturalDeclineRate.title.text = `${this.oilFieldName || ""}自然递减率`;
        }
      });
    },
    //下载导出csv文件
    doDownIndex() {
      exportExcel("#indexscv", "注水指标总览");
    },
    //表格格式化方法 - 数值只保留四位小数
    formatterNumber(row, column) {
      if (row.name == "年注入量（10⁴m³）") {
        return !isNaN(parseFloat(row[column.property])) ? parseFloat(row[column.property]).toFixed(4) : "";
      } else {
        return !isNaN(parseFloat(row[column.property])) ? parseFloat(row[column.property]).toFixed(2) : "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  padding: 0 7px;
  height: 100%;
}
::v-deep .app-content {
  height: calc(100% - 100px) !important;
  overflow-y: scroll;
  .g-w100:first-child {
    padding-top: 0 !important;
    //   height:auto!important;
  }
}
.formBox {
  & > div:not(:first-child) {
    margin-left: 20px;
  }
}

.basicTable {
  height: auto;
  // padding-bottom: 10px;
}

.el-col-4 {
  width: 20%;
}

::v-deep .el-table .cell:empty::before {
  content: "-";
}
</style>
