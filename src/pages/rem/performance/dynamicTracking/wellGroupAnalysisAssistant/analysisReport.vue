<!-- 井组动态分析报告 -->
<template>
  <div style="display: flex; flex-direction: row; height: calc(100%)">
    <div style="height: 100%">
      <treeSelectionCustom
        ref="treeSelectionCustom"
        level="5"
        :treeType="3"
        :defaultCheckedKeys="defaultCheckedKeys"
        @getSelectItems="getSelectItems"
      />
    </div>
    <div
      class="z_app_container"
      style="
        display: flex;
        flex-direction: column;
        height: 100%;
        flex: 1;
        right: 0;
        overflow: hidden;
        margin-left: 20px;
      "
    >
      <!-- 旧版本 -->
      <div class="app-container" v-if="!isNewformat">
        <headerSearch style="height: 80px">
          <div class="g-row-flex-V g-w100 g-h100">
            <span>油田：</span>
            <el-select v-model="selYtdm" class="f2" style="width: 180px" filterable @change="queryBlockList">
              <el-option v-for="item in ytData" :key="item.ogfId" :label="item.ogfName" :value="item.ogfId">
              </el-option>
            </el-select>
            <span style="margin-left: 15px">区块：</span>
            <el-select v-model="selBlock" class="f2" style="width: 180px" filterable @change="changeBlock">
              <el-option
                v-for="item in blockData"
                :key="item.reservoirAnalyseUnitId"
                :label="item.reservoirAnalyseUnitName"
                :value="item.reservoirAnalyseUnitId"
              >
              </el-option>
            </el-select>
            <span style="margin-left: 15px">水井井组：</span>
            <el-select v-model="searchKeys" class="f2" style="width: 200px" filterable @change="changeWellGroup">
              <el-option
                v-for="item in wellGroupList"
                :key="item.wellGroupId"
                :label="item.wellGroupName"
                :value="item.wellGroupId"
              >
              </el-option>
            </el-select>
            <span style="margin-left: 15px">日期：</span>
            <el-date-picker
              v-model="currentDate"
              type="date"
              value-format="yyyy-MM-dd"
              :clearable="false"
            ></el-date-picker>
            <el-button icon="el-icon-search" type="primary" style="margin-left: 20px" @click="doSearch">搜索</el-button>
            <el-button class="commonBtn" icon="el-icon-refresh" @click="resetting">重置</el-button>
            <el-button
              class="commonBtn"
              v-if="$route.query.page"
              style="position: absolute; right: 2%"
              @click="
                $router.push({
                  name: $route.query.page,
                })
              "
              >返回</el-button
            >
          </div>
        </headerSearch>
        <pagePanelNew style="height: calc(100% - 100px)" class="g-w100">
          <div class="btns" style="height: 50px; display: flex; padding-left: 7px">
            <el-button type="primary" @click="$router.push({ path: '/modelConfiguration/modelconfig' })"
              >模型配置</el-button
            >
            <el-button type="primary" @click="isNewformat = !isNewformat">切换版式</el-button>
          </div>
          <!-- /* display: flex;
              flex-direction: column; */ -->
          <div
            style="
              height: calc(100% - 50px);
              overflow-y: scroll;
              overflow-x: hidden;
              padding-left: 8px;
              padding-right: 7px;
            "
          >
            <el-row style="height: auto" :gutter="15" class="cont">
              <el-col :span="19" style="height: 100%">
                <pagePanel headerTitle="开发生产问题监测" style="margin-top: 0; height: 100%">
                  <el-row :gutter="10">
                    <el-col :span="9">
                      <el-button class="commonBtn" style="width: 100%; cursor: inherit; margin-bottom: 10px"
                        >动态变化趋势</el-button
                      >
                      <el-col v-for="(item, index) in trendOfIndicators" :key="index" :span="12">
                        <el-button
                          class="z-button"
                          :class="[item.value > 0 ? 'about1' : '', item.code == selCode ? 'selectButton' : '']"
                          @click.stop="selRadioIterm(item.code, 'trendOfIndicators')"
                        >
                          {{ item.name + (item.value > 0 ? "(" + item.value + ")" : "(0)") }}
                        </el-button>
                      </el-col>
                    </el-col>
                    <el-col :span="5">
                      <el-button class="commonBtn" style="width: 100%; cursor: inherit; margin-bottom: 10px"
                        >注水受效分析</el-button
                      >
                      <el-col v-for="(item, index) in injectionResponseAnalysis" :key="index" :span="24">
                        <el-button
                          class="z-button"
                          :class="[item.value > 0 ? 'about1' : '', item.code == selCode ? 'selectButton' : '']"
                          @click.stop="selRadioIterm(item.code, 'injectionResponseAnalysis')"
                        >
                          {{ item.name + (item.value > 0 ? "(" + item.value + ")" : "(0)") }}
                        </el-button>
                      </el-col>
                    </el-col>
                    <el-col :span="5">
                      <el-button class="commonBtn" style="width: 100%; cursor: inherit; margin-bottom: 10px"
                        >注采平衡</el-button
                      >
                      <el-col v-for="(item, index) in injectionProductionBalance" :key="index" :span="24">
                        <el-button
                          class="z-button"
                          :class="[item.value > 0 ? 'about1' : '', item.code == selCode ? 'selectButton' : '']"
                          @click.stop="selRadioIterm(item.code, 'injectionProductionBalance')"
                        >
                          {{ item.name + (item.value > 0 ? "(" + item.value + ")" : "(0)") }}
                        </el-button>
                      </el-col>
                    </el-col>
                    <el-col :span="5">
                      <el-button class="commonBtn" style="width: 100%; cursor: inherit; margin-bottom: 10px"
                        >压力保持</el-button
                      >
                      <el-col v-for="(item, index) in thePressureToKeep" :key="index" :span="24">
                        <el-button
                          class="z-button"
                          :class="[item.value > 0 ? 'about1' : '', item.code == selCode ? 'selectButton' : '']"
                          @click.stop="selRadioIterm(item.code, 'thePressureToKeep')"
                        >
                          {{ item.name + (item.value > 0 ? "(" + item.value + ")" : "(0)") }}
                        </el-button>
                      </el-col>
                    </el-col>
                  </el-row>
                </pagePanel>
              </el-col>
              <el-col :span="5" style="height: 100%">
                <pagePanel headerTitle="措施推荐" style="margin-top: 0; height: 100%">
                  <el-row :gutter="10" style="height: 100%">
                    <el-col v-for="(item, index) in recommendedMeasuresOptions" :key="index" :span="24">
                      <el-button
                        class="z-button"
                        :class="[item.value > 0 ? 'about1' : '', item.code == selCode ? 'selectButton' : '']"
                        @click.stop="selRadioIterm(item.code, 'recommendedMeasuresOptions')"
                      >
                        {{ item.name + (item.value > 0 ? "(" + item.value + ")" : "(0)") }}
                      </el-button>
                    </el-col>
                  </el-row>
                </pagePanel>
              </el-col>
            </el-row>
            <div style="margin-top: 5px; margin-bottom: 10px">
              <el-row>
                <el-col :span="24">
                  <table class="condationRow" style="float: right">
                    <tr>
                      <td style="padding-right: 10px">图例：</td>
                      <td class="checkBtn">选中</td>
                      <td class="about">相关</td>
                      <td class="noCheckBtn">未选中</td>
                    </tr>
                  </table>
                </el-col>
                <el-button
                  type="primary"
                  style="position: relative; right: -93%"
                  v-if="selCode && selCode == '2010802'"
                  @click="
                    $router.push({
                      name: 'AttributtonAnalysis',
                      query: { platform, wellId, currentDate, link: 6, evalResult: selCode },
                    })
                  "
                >
                  归因分析详情
                </el-button>
              </el-row>
            </div>
            <div style="height: 620px">
              <pagePanel headerTitle="井组动态分析详情列表" style="margin-top: 0; height: 100%">
                <div style="display: flex; justify-content: flex-end">
                  <el-button
                    icon="el-icon-download"
                    type="primary"
                    style="margin-bottom: 20px"
                    @click="doDownExcel('#table1', '井组动态分析详情列表')"
                    >下载</el-button
                  >
                </div>
                <el-table
                  key="wellGroupAnalysisAssistant-table1"
                  id="table1"
                  highlight
                  :data="
                    tableData.slice(
                      (queryParams.page - 1) * queryParams.pageSize,
                      queryParams.page * queryParams.pageSize,
                    )
                  "
                  height="calc(100% - 110px)"
                  ref="tableList"
                  class="doubleHeader"
                  row-key="id"
                  default-expand-all
                  :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                  @sort-change="sortChange"
                >
                  <el-table-column
                    key="table1-index"
                    type="index"
                    label="序号"
                    align="center"
                    width="80px"
                    fixed="left"
                    :index="formatIndex"
                  ></el-table-column>

                  <el-table-column
                    key="table1-wellId"
                    prop="wellId"
                    align="center"
                    label="井组"
                    width="240px"
                    sortable="custom"
                    fixed="left"
                  ></el-table-column>
                  <el-table-column
                    v-for="(item, index) in trendOfIndicatorsTab"
                    :key="`table1-${item.code}`"
                    :prop="item.code"
                    sortable="custom"
                    align="center"
                    min-width="170"
                  >
                    <template #header>
                      <div class="headerSortRow1">
                        <span>{{ item.name }}</span>
                        <br />
                        <span>({{ item.unit }})</span>
                      </div>
                    </template>
                    <template slot-scope="{ row }">
                      <span style="display: flex; align-items: center; justify-content: center">
                        <span v-if="row[item.code + 'Message'] == ''">{{ row[item.code] ? row[item.code] : "-" }}</span>
                        <el-tooltip
                          v-else
                          class="item"
                          effect="dark"
                          :content="row[item.code + 'Message']"
                          placement="top"
                        >
                          <span>{{ row[item.code] ? row[item.code] : "-" }}</span>
                        </el-tooltip>
                        <img
                          src="@/assets/rem/yieId/upTriangle.png"
                          v-if="row[item.code + 'Message'] && row[item.code + 'Message'].includes('高')"
                          style="width: 20px; height: 20px"
                        />
                        <img
                          src="@/assets/rem/yieId/downTriangle.png"
                          v-if="row[item.code + 'Message'] && row[item.code + 'Message'].includes('低')"
                          style="width: 20px; height: 20px"
                        />
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="injectionResponseAnalysis" align="center" label="注水受效" min-width="140">
                    <template slot-scope="{ row }">
                      <span v-if="row['injectionResponseAnalysisMessage'] == ''">{{
                        row["injectionResponseAnalysis"] ? row["injectionResponseAnalysis"] : "-"
                      }}</span>
                      <el-tooltip
                        v-else
                        class="item"
                        effect="dark"
                        :content="row['injectionResponseAnalysisMessage']"
                        placement="top"
                      >
                        <span>{{ row["injectionResponseAnalysis"] ? row["injectionResponseAnalysis"] : "-" }}</span>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                  <el-table-column prop="injectionProductionBalance" align="center" label="注水平衡" min-width="140">
                    <template slot-scope="{ row }">
                      <span v-if="row['injectionProductionBalanceMessage'] == ''">{{
                        row["injectionProductionBalance"] ? row["injectionProductionBalance"] : "-"
                      }}</span>
                      <el-tooltip
                        v-else
                        class="item"
                        effect="dark"
                        :content="row['injectionProductionBalanceMessage']"
                        placement="top"
                      >
                        <span>{{ row["injectionProductionBalance"] ? row["injectionProductionBalance"] : "-" }}</span>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                  <el-table-column prop="thePressureToKeep" align="center" label="压力保持" min-width="140">
                    <template slot-scope="{ row }">
                      <span v-if="row['thePressureToKeepMessage'] == ''">{{
                        row["thePressureToKeep"] ? row["thePressureToKeep"] : "-"
                      }}</span>
                      <el-tooltip
                        v-else
                        class="item"
                        effect="dark"
                        :content="row['thePressureToKeepMessage']"
                        placement="top"
                      >
                        <span>{{ row["thePressureToKeep"] ? row["thePressureToKeep"] : "-" }}</span>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="措施初选">
                    <el-table-column prop="measuresName" align="center" label="推荐措施" min-width="140">
                      <template slot-scope="{ row }">
                        <!-- <span>{{row.measuresName?row.measuresName:'-'}}</span> -->
                        <el-tooltip
                          class="item"
                          effect="dark"
                          :content="preliminarySelectioMeasures(row.wellId, 1)"
                          placement="top"
                        >
                          <span class="">{{ preliminarySelectioMeasures(row.wellId, 1) }}</span>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                    <el-table-column prop="theDate" min-width="140px" align="center" label="推荐日期">
                      <template slot-scope="{ row }">
                        <!-- <span>{{row.theDate?row.theDate:'-'}}</span> -->
                        <el-tooltip
                          class="item"
                          effect="dark"
                          :content="preliminarySelectioMeasures(row.wellId, 2)"
                          placement="top"
                        >
                          <span class="">{{ preliminarySelectioMeasures(row.wellId, 2) }}</span>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" align="center" label="操作" min-width="140">
                      <template slot-scope="scope">
                        <el-button type="text" size="small" @click="openAnalysis(scope.row.wellId)">分析</el-button>
                      </template>
                    </el-table-column>
                  </el-table-column>
                </el-table>
                <pagination
                  v-show="pageTotal > 0"
                  layout="prev, pager, next, sizes, total"
                  :page-sizes="[10, 20, 50, 100]"
                  :pager-count="5"
                  :total="pageTotal"
                  :page.sync="queryParams.page"
                  :limit.sync="queryParams.pageSize"
                  @pagination="pagination"
                />
              </pagePanel>
            </div>
          </div>
        </pagePanelNew>
      </div>
      <!-- 新版本 -->
      <div class="app-container2" v-if="isNewformat">
        <headerSearch style="height: 80px">
          <div class="g-row-flex-V g-w100 g-h100">
            <span>油田：</span>
            <el-select v-model="selYtdm" class="f2" style="width: 180px" filterable @change="queryBlockList">
              <el-option v-for="item in ytData" :key="item.ogfId" :label="item.ogfName" :value="item.ogfId">
              </el-option>
            </el-select>
            <span style="margin-left: 15px">区块：</span>
            <el-select v-model="selBlock" class="f2" style="width: 180px" filterable @change="changeBlock">
              <el-option
                v-for="item in blockData"
                :key="item.reservoirAnalyseUnitId"
                :label="item.reservoirAnalyseUnitName"
                :value="item.reservoirAnalyseUnitId"
              >
              </el-option>
            </el-select>
            <span style="margin-left: 15px">水井井组：</span>
            <el-select v-model="searchKeys" class="f2" style="width: 200px" filterable @change="changeWellGroup">
              <el-option
                v-for="item in wellGroupList"
                :key="item.wellGroupId"
                :label="item.wellGroupName"
                :value="item.wellGroupId"
              >
              </el-option>
            </el-select>
            <span style="margin-left: 15px">日期：</span>
            <el-date-picker
              v-model="currentDate"
              type="date"
              value-format="yyyy-MM-dd"
              :clearable="false"
              @change="handleCurrentDateChange"
            ></el-date-picker>
            <el-button icon="el-icon-search" type="primary" style="margin-left: 20px" @click="doSearch">搜索</el-button>
            <el-button class="commonBtn" icon="el-icon-refresh" @click="resetting">重置</el-button>
            <el-button
              class="commonBtn"
              v-if="$route.query.page"
              style="position: absolute; right: 2%"
              @click="
                $router.push({
                  name: $route.query.page,
                })
              "
              >返回</el-button
            >
          </div>
        </headerSearch>
        <div class="app-container3">
          <div class="leftBox">
            <!-- <img src="@/assets/rem/performance/bg.gif" alt="" class="img1" />
            <img src="@/assets/rem/performance/jing-small.png" alt="" class="img2" />
            <img src="@/assets/rem/performance/shui-donghua.gif" alt="" class="img3" />
            <img src="@/assets/rem/performance/di.png" alt="" class="img4" />
            <img src="@/assets/rem/performance/01cai.gif" alt="" class="img6" />
            <img src="@/assets/rem/performance/01zhu.gif" alt="" class="img5" />
            <img src="@/assets/rem/performance/01cai.gif" alt="" class="img7" />
            <img src="@/assets/rem/performance/bg.png" alt="" class="bg" v-if="$store.state.setting.mode == 'dark'" />
            <img src="@/assets/rem/performance/bg2.png" alt="" class="bg" v-else /> -->
            <img src="@/assets/rem/performance/jingzu.gif" alt="" class="speed" />
            <img src="@/assets/rem/performance/bg.png" alt="" class="bg" v-if="$store.state.setting.mode == 'dark'" />
            <img src="@/assets/rem/performance/bg2.png" alt="" class="bg" v-else />
            
          </div>
          <div class="rightBox">
            <div class="v1">
              <img src="@/assets/rem/performance/bgline1.png" alt="" class="bgline1" />
              <div class="btns" style="height: 40px; display: flex">
                <el-button
                  type="primary"
                  style="margin-left: auto"
                  @click="$router.push({ path: '/modelConfiguration/modelconfig' })"
                  >模型配置</el-button
                >
                <el-button type="primary" @click="isNewformat = !isNewformat">切换版式</el-button>
              </div>
              <div class="btns0">
                <img src="@/assets/rem/performance/help.png" alt="" class="helpImg" />
                <span>{{ potentialWellNum }}</span>
                <b>潜力井组</b>
              </div>
            </div>
            <div class="v2">
              <pagePanel header-title="井组变化趋势分析" style="height: 100%">
                <div class="z-content" style="height: 100%; overflow-y: scroll">
                  <div class="z-content-n">
                    <div class="z-row-left">
                      <div class="z_title">
                        <img src="@/assets/rem/performance/z_sb.png" alt="" />
                        <span>动态变化趋势</span>
                      </div>
                      <div class="z_schedule">
                        <span class="sp1">正常井组：</span>
                        <div class="z_proess">
                          <span class="z_proess_sp1" :style="{ width: trendOfIndicatorsNum.zczb + '%' }">
                            <b style="cursor: pointer" @click="trendOfIndicatorsSwitch = true">{{
                              trendOfIndicatorsNum.zcnum
                            }}</b>
                          </span>
                          <span class="z_proess_sp2"></span>
                        </div>
                        <span class="sp2"
                          >异常井组：<b style="cursor: pointer" @click="trendOfIndicatorsSwitch = false">{{
                            trendOfIndicatorsNum.ycnum
                          }}</b></span
                        >
                      </div>
                    </div>
                    <div class="z-row-center">
                      <div
                        class="numBtn"
                        :class="[item.code == selCode ? 'numBtnBgActive' : '']"
                        v-for="(item, index) in trendOfIndicators"
                        :key="index"
                        v-if="item.name != '正常' && (item.value != 0 || item.isShow) && !trendOfIndicatorsSwitch"
                        @click="
                          (val) => {
                            selRadioIterm(item.code, 'trendOfIndicators');
                          }
                        "
                      >
                        <span class="sp1">{{ item.value }}</span>
                        <span class="sp2">{{ item.name }}</span>
                      </div>
                      <div
                        class="numBtn"
                        :class="[item.code == selCode ? 'numBtnBgActive' : '']"
                        v-for="(item, index) in trendOfIndicators"
                        :key="index"
                        v-if="item.name == '正常' && trendOfIndicatorsSwitch"
                        @click="
                          (val) => {
                            selRadioIterm(item.code, 'trendOfIndicators');
                          }
                        "
                      >
                        <span class="sp1">{{ item.value }}</span>
                        <span class="sp2">{{ item.name }}</span>
                      </div>
                    </div>
                    <div
                      style="
                        width: 250px;
                        display: flex;
                        justify-content: flex-end;
                        position: relative;
                        top: 40px;
                        left: -30px;
                      "
                    >
                      <el-button
                        type="primary"
                        style="margin-left: 20px"
                        v-if="selCode && selCode == '2010802'"
                        @click="
                          $router.push({
                            name: 'AttributtonAnalysis',
                            query: {
                              platform,
                              wellId,
                              searchKeys,
                              currentDate,
                              searchKeys,
                              link: 6,
                              evalResult: selCode,
                            },
                          })
                        "
                      >
                        归因分析详情
                      </el-button>
                    </div>
                  </div>
                </div>
              </pagePanel>
            </div>
            <div class="v2 v3">
              <img src="@/assets/rem/performance/bgline2.png" alt="" class="bgline2" />
              <pagePanel header-title="开发生产问题监测" style="height: 100%">
                <div class="z-content2" style="height: 100%; overflow-y: scroll">
                  <div class="z1">
                    <div class="z-content-n">
                      <div class="z-row-left">
                        <div class="z_title">
                          <img src="@/assets/rem/performance/z_sb.png" alt="" />
                          <span>注采平衡</span>
                        </div>
                        <div class="z_schedule">
                          <span class="sp1">正常井组：</span>
                          <div class="z_proess">
                            <span class="z_proess_sp1" :style="{ width: injectionProductionBalanceNum.zczb + '%' }">
                              <b style="cursor: pointer" @click="injectionProductionBalanceSwitch = true">{{
                                injectionProductionBalanceNum.zcnum
                              }}</b>
                            </span>
                            <span class="z_proess_sp2"></span>
                          </div>
                          <span class="sp2"
                            >异常井组：<b style="cursor: pointer" @click="injectionProductionBalanceSwitch = false">{{
                              injectionProductionBalanceNum.ycnum
                            }}</b></span
                          >
                        </div>
                      </div>
                      <div class="z-row-center">
                        <div
                          class="numBtn"
                          :class="[item.code == selCode ? 'numBtnBgActive' : '']"
                          v-for="(item, index) in injectionProductionBalance"
                          :key="index"
                          v-if="
                            item.name != '正常' && (item.value != 0 || item.isShow) && !injectionProductionBalanceSwitch
                          "
                          @click="
                            (val) => {
                              selRadioIterm(item.code, 'injectionProductionBalance');
                            }
                          "
                        >
                          <span class="sp1">{{ item.value }}</span>
                          <span class="sp2">{{ item.name }}</span>
                        </div>
                        <div
                          class="numBtn"
                          :class="[item.code == selCode ? 'numBtnBgActive' : '']"
                          v-for="(item, index) in injectionProductionBalance"
                          :key="index"
                          v-if="item.name == '正常' && injectionProductionBalanceSwitch"
                          @click="
                            (val) => {
                              selRadioIterm(item.code, 'injectionProductionBalance');
                            }
                          "
                        >
                          <span class="sp1">{{ item.value }}</span>
                          <span class="sp2">{{ item.name }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="z-content-n">
                      <div class="z-row-left">
                        <div class="z_title">
                          <img src="@/assets/rem/performance/z_sb.png" alt="" />
                          <span>注水受效分析</span>
                        </div>
                        <div class="z_schedule">
                          <span class="sp1">正常井组：</span>
                          <div class="z_proess">
                            <span class="z_proess_sp1" :style="{ width: injectionResponseAnalysisNum.zczb + '%' }">
                              <b style="cursor: pointer" @click="injectionResponseAnalysisSwitch = true">{{
                                injectionResponseAnalysisNum.zcnum
                              }}</b>
                            </span>
                            <span class="z_proess_sp2"></span>
                          </div>
                          <span class="sp2"
                            >异常井组：<b style="cursor: pointer" @click="injectionResponseAnalysisSwitch = false">{{
                              injectionResponseAnalysisNum.ycnum
                            }}</b></span
                          >
                        </div>
                      </div>
                      <div class="z-row-center">
                        <div
                          class="numBtn"
                          :class="[item.code == selCode ? 'numBtnBgActive' : '']"
                          v-for="(item, index) in injectionResponseAnalysis"
                          :key="index"
                          v-if="
                            item.name != '正常' && (item.value != 0 || item.isShow) && !injectionResponseAnalysisSwitch
                          "
                          @click="
                            (val) => {
                              selRadioIterm(item.code, 'injectionResponseAnalysis');
                            }
                          "
                        >
                          <span class="sp1">{{ item.value }}</span>
                          <span class="sp2">{{ item.name }}</span>
                        </div>
                        <div
                          class="numBtn"
                          :class="[item.code == selCode ? 'numBtnBgActive' : '']"
                          v-for="(item, index) in injectionResponseAnalysis"
                          :key="index"
                          v-if="item.name == '正常' && injectionResponseAnalysisSwitch"
                          @click="
                            (val) => {
                              selRadioIterm(item.code, 'injectionResponseAnalysis');
                            }
                          "
                        >
                          <span class="sp1">{{ item.value }}</span>
                          <span class="sp2">{{ item.name }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="z2">
                    <div class="z-content-n" style="flex-direction: column">
                      <div class="z-row-left" style="margin-bottom: 16px">
                        <div class="z_title">
                          <img src="@/assets/rem/performance/z_sb.png" alt="" />
                          <span>压力保持</span>
                        </div>
                        <div class="z_schedule">
                          <span class="sp1">正常井组：</span>
                          <div class="z_proess">
                            <span class="z_proess_sp1" :style="{ width: thePressureToKeepNum.zczb + '%' }">
                              <b style="cursor: pointer" @click="thePressureToKeepSwitch = true">{{
                                thePressureToKeepNum.zcnum
                              }}</b>
                            </span>
                            <span class="z_proess_sp2"></span>
                          </div>
                          <span class="sp2"
                            >异常井组：<b style="cursor: pointer" @click="thePressureToKeepSwitch = false">{{
                              thePressureToKeepNum.ycnum
                            }}</b></span
                          >
                        </div>
                      </div>
                      <div class="z-row-center">
                        <div
                          class="numBtn"
                          :class="[item.code == selCode ? 'numBtnBgActive' : '']"
                          v-for="(item, index) in thePressureToKeep"
                          :key="index"
                          v-if="item.name != '正常' && (item.value != 0 || item.isShow) && !thePressureToKeepSwitch"
                          @click="
                            (val) => {
                              selRadioIterm(item.code, 'thePressureToKeep');
                            }
                          "
                        >
                          <span class="sp1">{{ item.value }}</span>
                          <span class="sp2">{{ item.name }}</span>
                        </div>
                        <div
                          class="numBtn"
                          :class="[item.code == selCode ? 'numBtnBgActive' : '']"
                          v-for="(item, index) in thePressureToKeep"
                          :key="index"
                          v-if="item.name == '正常' && thePressureToKeepSwitch"
                          @click="
                            (val) => {
                              selRadioIterm(item.code, 'thePressureToKeep');
                            }
                          "
                        >
                          <span class="sp1">{{ item.value }}</span>
                          <span class="sp2">{{ item.name }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="z3">
                    <div class="z-row-right" style="position: relative; top: 48px">
                      <div class="name">措施推荐</div>
                      <div class="num">
                        <span
                          :class="[item.code == selCode ? 'spActive' : '']"
                          v-for="(item, index) in recommendedMeasuresOptions"
                          :key="index"
                          @click.stop="selRadioIterm(item.code, 'recommendedMeasuresOptions')"
                        >
                          {{ item.name }}：
                          <b style="color: #ffc835; font-size: 14px">{{ item.value }}</b>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </pagePanel>
            </div>
            <div style="height: 620px">
              <pagePanel header-title="井组动态分析详情列表" style="height: 100%">
                <div style="display: flex; justify-content: flex-end">
                  <el-button
                    icon="el-icon-download"
                    type="primary"
                    style="margin-bottom: 20px"
                    @click="doDownExcel('#table2', '井组动态分析详情列表')"
                    >下载</el-button
                  >
                </div>
                <el-table
                  key="wellGroupAnalysisAssistant-table2"
                  id="table2"
                  highlight
                  :data="
                    tableData.slice(
                      (queryParams.page - 1) * queryParams.pageSize,
                      queryParams.page * queryParams.pageSize,
                    )
                  "
                  row-key="id"
                  height="calc(100% - 110px)"
                  ref="tableList"
                  class="doubleHeader"
                  default-expand-all
                  :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                  @sort-change="sortChange"
                >
                  <el-table-column
                    type="index"
                    label="序号"
                    align="center"
                    width="100px"
                    fixed="left"
                    :index="formatIndex"
                  ></el-table-column>
                  <el-table-column
                    key="table2-wellId"
                    prop="wellId"
                    align="center"
                    label="井组"
                    width="240px"
                    sortable="custom"
                    fixed="left"
                  ></el-table-column>
                  <!-- sortable="custom" TODO lv 一期功能未完善，暂时屏蔽 -->
                  <el-table-column
                    v-for="(item, index) in trendOfIndicatorsTab"
                    :key="`table2-${item.code}`"
                    :prop="item.code"
                    sortable="custom"
                    align="center"
                    min-width="170"
                  >
                    <template #header>
                      <div class="headerSortRow1">
                        <span>{{ item.name }}</span>
                        <br />
                        <span>({{ item.unit }})</span>
                      </div>
                    </template>
                    <template slot-scope="{ row }">
                      <span style="display: flex; align-items: center; justify-content: center">
                        <span v-if="row[item.code + 'Message'] == ''">{{ row[item.code] ? row[item.code] : "-" }}</span>
                        <el-tooltip
                          v-else
                          class="item"
                          effect="dark"
                          :content="row[item.code + 'Message']"
                          placement="top"
                        >
                          <span>{{ row[item.code] ? row[item.code] : "-" }}</span>
                        </el-tooltip>
                        <img
                          src="@/assets/rem/yieId/upTriangle.png"
                          v-if="row[item.code + 'Message'] && row[item.code + 'Message'].includes('高')"
                          style="width: 20px; height: 20px"
                        />
                        <img
                          src="@/assets/rem/yieId/downTriangle.png"
                          v-if="row[item.code + 'Message'] && row[item.code + 'Message'].includes('低')"
                          style="width: 20px; height: 20px"
                        />
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="injectionResponseAnalysis" align="center" label="注水受效" min-width="140">
                    <template slot-scope="{ row }">
                      <span v-if="row['injectionResponseAnalysisMessage'] == ''">{{
                        row["injectionResponseAnalysis"] ? row["injectionResponseAnalysis"] : "-"
                      }}</span>
                      <el-tooltip
                        v-else
                        class="item"
                        effect="dark"
                        :content="row['injectionResponseAnalysisMessage']"
                        placement="top"
                      >
                        <span>{{ row["injectionResponseAnalysis"] ? row["injectionResponseAnalysis"] : "-" }}</span>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                  <el-table-column prop="injectionProductionBalance" align="center" label="注水平衡" min-width="140">
                    <template slot-scope="{ row }">
                      <span v-if="row['injectionProductionBalanceMessage'] == ''">{{
                        row["injectionProductionBalance"] ? row["injectionProductionBalance"] : "-"
                      }}</span>
                      <el-tooltip
                        v-else
                        class="item"
                        effect="dark"
                        :content="row['injectionProductionBalanceMessage']"
                        placement="top"
                      >
                        <span>{{ row["injectionProductionBalance"] ? row["injectionProductionBalance"] : "-" }}</span>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                  <el-table-column prop="thePressureToKeep" align="center" label="压力保持" min-width="140">
                    <template slot-scope="{ row }">
                      <span v-if="row['thePressureToKeepMessage'] == ''">{{
                        row["thePressureToKeep"] ? row["thePressureToKeep"] : "-"
                      }}</span>
                      <el-tooltip
                        v-else
                        class="item"
                        effect="dark"
                        :content="row['thePressureToKeepMessage']"
                        placement="top"
                      >
                        <span>{{ row["thePressureToKeep"] ? row["thePressureToKeep"] : "-" }}</span>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="措施初选">
                    <el-table-column prop="measuresName" align="center" label="推荐措施" min-width="140">
                      <template slot-scope="{ row }">
                        <!-- <span>{{row.measuresName?row.measuresName:'-'}}</span> -->
                        <el-tooltip
                          class="item"
                          effect="dark"
                          :content="preliminarySelectioMeasures(row.wellId, 1)"
                          placement="top"
                        >
                          <span class="">{{ preliminarySelectioMeasures(row.wellId, 1) }}</span>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                    <el-table-column prop="theDate" min-width="140px" align="center" label="推荐日期">
                      <template slot-scope="{ row }">
                        <!-- <span>{{row.theDate?row.theDate:'-'}}</span> -->
                        <el-tooltip
                          class="item"
                          effect="dark"
                          :content="preliminarySelectioMeasures(row.wellId, 2)"
                          placement="top"
                        >
                          <span class="">{{ preliminarySelectioMeasures(row.wellId, 2) }}</span>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" align="center" label="操作" min-width="140">
                      <template slot-scope="scope">
                        <el-button type="text" size="small" @click="openAnalysis(scope.row.wellId)">分析</el-button>
                      </template>
                    </el-table-column>
                  </el-table-column>
                </el-table>
                <pagination
                  v-show="pageTotal > 0"
                  layout="prev, pager, next, sizes, total"
                  :page-sizes="[10, 20, 50, 100]"
                  :pager-count="5"
                  :total="pageTotal"
                  :page.sync="queryParams.page"
                  :limit.sync="queryParams.pageSize"
                  @pagination="pagination"
                />
              </pagePanel>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  indicatorVariationTrendency,
  injectionEffectivity,
  proInjectBalance,
  pressureMaintain,
  wellGroupRecommendMeasure,
  wellGroupDynamicAnalysisDetail,
} from "@/api/oilDeposit/rem-01/wellgroupdynamicanalysis.js";
import { selectWellGroup } from "@/api/oilDeposit/rem-02/primaryinfo.js";
import { QueryOgfDetail, QueryReservoirAnalyseUnit, userListByUserNames } from "@/api/rem/marster.js";
import { getDate } from "@/api/oilDeposit/rem-04/oilAuxiliaryAnalysis.js";
import compareSort from "@/lib/compareSort.js";
import treeSelectionCustom from "@/pages/rem/basic/components/treeSelectionCustom.vue";
import { exportExcel } from "@/lib/exportExcel.js";
import { cloneDeep } from "lodash";

export default {
  name: "wellGroupAnalysisReport",
  mixins: [compareSort],
  components: {
    treeSelectionCustom,
  },
  computed: {
    pageTotal() {
      return this.tableData.length || 0;
    },
  },
  data() {
    return {
      // 主数据树结构默认选中的值
      defaultCheckedKeys: [],
      collectWells: [], //收集井
      isNewformat: true, //默认新版本
      potentialWellNum: 0, //潜力井
      //数据来源,大于０为后台提取
      dataSource: 1,
      initTypes: 1, //进行初始加载
      companyId: "",
      //油田筛选条件
      ytData: [],
      selYtdm: "", //选中项
      //区块筛选条件
      blockData: [],
      //井组筛选条件
      wellGroupList: [],
      selBlock: "", //选中项
      //附加条件
      searchKeys: "", //区块名模糊查询
      searchNames: "",
      //评价日期条件
      currentDate: "",
      //有推荐措施的井
      recommendedMeasuresWells: {},
      //选中分析项目
      selCode: "",
      selTag: "",
      //开发生产问题监测可用项目
      //指标变化趋势---zxb
      trendOfIndicators: [],
      trendOfIndicatorsNum: {
        allnum: 0,
        zcnum: 0,
        ycnum: 0,
        zczb: 0,
        yczb: 0,
      },
      trendOfIndicatorsSwitch: false, //展示异常false, 正常 true
      trendOfIndicatorsCode: "", //正常的code
      //注水受效分析---zxb
      injectionResponseAnalysis: [],
      injectionResponseAnalysisNum: {
        allnum: 0,
        zcnum: 0,
        ycnum: 0,
        zczb: 0,
        yczb: 0,
      },
      injectionResponseAnalysisSwitch: false, //展示异常false, 正常 true
      //注采平衡---zxb
      injectionProductionBalance: [],
      injectionProductionBalanceNum: {
        allnum: 0,
        zcnum: 0,
        ycnum: 0,
        zczb: 0,
        yczb: 0,
      },
      injectionProductionBalanceSwitch: false, //展示异常false, 正常 true
      //压力保持---zxb
      thePressureToKeep: [],
      thePressureToKeepNum: {
        allnum: 0,
        zcnum: 0,
        ycnum: 0,
        zczb: 0,
        yczb: 0,
      },
      thePressureToKeepSwitch: false, //展示异常false, 正常 true
      //措施推荐可用项目
      recommendedMeasuresOptions: [],
      //获取措施效果数据
      recommendedMeasuresData: [],
      //油井动态分析详细列表
      tableData: [],
      oldTableData: [],
      sortOrder: {},
      //指标变化趋势动态表头
      trendOfIndicatorsTab: [],
      queryParams: {
        page: 1,
        pageSize: 10,
      },
    };
  },
  async mounted() {
    await this.getDateApi();
  },
  watch: {
    "$route.query.wellNo"() {
      // 监听路由变化
      if (this.$route.query.wellId) {
        //判断路由是否有井号参数
        let wellItem = this.wellGroupList.find((e) => e.wellGroupName == this.$route.query.wellId);
        this.searchKeys = wellItem.wellId;
        this.searchNames = wellItem.wellGroupName;
        this.doSearch();
      }
    },
  },
  methods: {
      handleCurrentDateChange(v) {
          this.queryWellGroupList();
      },
    //重置
    resetting() {
      let isNewformat = this.isNewformat;
      Object.assign(this.$data, this.$options.data());
      this.isNewformat = isNewformat;
      this.getDateApi(); //初始化油田
    },
    //本接口获取最后一次模型计算出来的结果，返回最后一次跑模型的日期。
    async getDateApi() {
      if (this.$route.query?.alarmTime) {
        this.currentDate = this.$route.query.alarmTime;
        this.queryOilFeildList();
      } else {
        await getDate({ wellMenu: "WELL_GROUP" }).then((res) => {
          if (res.data.code == 200) {
            this.currentDate = res.data.data;
          }
          this.queryOilFeildList();
        });
      }
    },
    //获取油田
    async queryOilFeildList() {
      let params = {
        searchKeys: [this.$store.getters["user/userDetail"].user.userName],
      };
      await userListByUserNames(params).then((res) => {
        if (res.data.code == 200) {
          // this.companyId =
          //   res.data.data[0]?.currentTenantBindOrgId
          //     ? res.data.data[0].currentTenantBindOrgId
          //     : undefined;
          this.companyId = res.data.data[0]?.currentTenantBindOrgId ? res.data.data[0].currentTenantBindOrgId : undefined;
        }
      });
      await QueryOgfDetail({ operationZoneId: this.companyId }).then((data) => {
        let code = data.data.code;
        if (code == 200) {
          this.ytData = data.data.data;
          if (this.companyId === "715AD1CD60484BB59E737CD18A9DE44A") {
            this.selYtdm = "3FC9A818F5BC43B88270DB80BBB3018F";
          } else {
            this.selYtdm = this.ytData[0].ogfId ? this.ytData[0].ogfId : undefined;
          }
          this.queryBlockList();
        }
      });
    },
    //获取区块
      async queryBlockList(paramMap) {
          await QueryReservoirAnalyseUnit({ogfId: this.selYtdm}).then((res) => {
              if (res.data.code == 200) {
                  this.blockData = res.data.data;
                  if (this.blockData === null) {
                      this.blockData = [{
                          reservoirAnalyseUnitId: this.selYtdm,
                          reservoirAnalyseUnitName: "全部",
                          reservoirAnalyseUnitNo: "全部",
                      }];
                  } else {
                      this.blockData.unshift({
                          reservoirAnalyseUnitId: this.selYtdm,
                          reservoirAnalyseUnitName: "全部",
                          reservoirAnalyseUnitNo: "全部",
                      });
                  }
                  this.selBlock = this.blockData[0].reservoirAnalyseUnitId;
                  this.queryWellGroupList();
              }
          });
      },
    //获取井组
    async queryWellGroupList() {
      await selectWellGroup({
        ogfId: this.selYtdm,
        blockId: this.selBlock === this.selYtdm ? '' :this.selBlock ,
        dateTime: this.currentDate,
      }).then((res) => {
        if (res.data.code == 200) {
          this.searchKeys = "";
          this.searchNames = "";
          this.wellGroupList = res.data.data;
          this.wellGroupList.unshift({ wellGroupName: "全部", wellGroupId: "" });
        }
        if (this.initTypes == 1) {
          if (this.$route.query.wellId) {
            //判断路由是否有井组参数
            let wellItem = this.wellGroupList.find((e) => e.wellGroupName == this.$route.query.wellId);
            this.searchKeys = wellItem.wellGroupId;
            this.searchNames = wellItem.wellGroupName;
          }
          this.doSearch();
          this.initTypes--;
        }
      });
    },
    // 区块切换事件
    changeBlock() {
      this.$refs.treeSelectionCustom.setCheckedKeys([this.selBlock, this.searchKeys]);
      this.queryWellGroupList();
    },
    changeWellGroup() {
      this.$refs.treeSelectionCustom.setCheckedKeys([this.selBlock, this.searchKeys]);
      let wellItem = this.wellGroupList.find((e) => e.wellGroupId == this.searchKeys);
      console.log(wellItem, this.searchKeys);
      this.searchNames = wellItem?.wellGroupName || "";
    },
    // 主数据树结构数选中数据 selectList：选中数据Id集合，selectData：当前选中数据对象
    getSelectItems(selectList, selectData) {
      // 油田选中数据
      // this.selYtdm = selectList.ogfId;
      // 区块选中数据
      this.selBlock = selectList.blockId;
      // 井组选中数据
      this.searchKeys = selectList.wellGroupId;
      // 判断如果没有wellGroupList没有当前井组，调取井组接口根据区块获取井号数据
      let isUpdata = this.wellGroupList.map((item) => item.wellId).includes(selectList.wellGroupId);
      if (!isUpdata || selectList.blockId != this.selBlock) {
        selectWellGroup({
          ogfId: this.selYtdm,
          blockId: this.selBlock,
          dateTime: new Date().format("yyyy-MM-dd"),
        }).then((res) => {
          if (res.data.code == 200) {
            this.wellGroupList = res.data.data;
            this.wellGroupList.unshift({ wellGroupName: "全部", wellGroupId: "" });
          }
        });
      }
    },
    //进行数据查询处理
    doSearch() {
      this.selCode = "";
      this.tableData = [];
      this.collectWells = [];
      //重新初始化相关数据项目
      let paramMap = {
        oilFieldId: this.selYtdm,
        fieldId: this.selBlock,
        fileName: this.searchKeys,
        wellGroupId: this.searchKeys,
        wellGroupName: this.searchNames,
        yearMonth: this.currentDate,
        evalTopic: "",
        evalTypeId: "",
        fieldLayerId: "",
        path: "",
      };
      Promise.all([
        this.queryTrendOfIndicators(paramMap),
        this.queryInjectionResponseAnalysis(paramMap),
        this.queryInjectionProductionBalance(paramMap),
        this.queryThePressureToKeep(paramMap),
        this.queryRecommendedMeasures(paramMap),
        this.queryProWellDynamicAnalysisDetail(paramMap),
      ])
        .then((res) => {
          if (this.collectWells.length) {
            let data = [];
            for (let i = 0; i < this.collectWells.length; i++) {
              data.push(...this.collectWells[i]);
            }
            data = [...new Set(data)];
            let myData = [];
            data.forEach((el, i) => {
              myData.push({ wellId: el, children: [] });
            });
            this.queryTableData(myData);
          }
        })
        .catch((err) => {});
    },
    queryTableData(myData, val = "") {
      let myWellCount = {}; //计算各项目的井数
      let t_count = 0; //计数器
      for (let i = 0; i < myData.length; i++) {
        let myWellId = myData[i].wellId; //井号
        //动态变化趋势 trendOfIndicators
        for (let j = 0; j < this.trendOfIndicators.length; j++) {
          let t_data = this.trendOfIndicators[j]; //每个数据项
          let messData = {};
          //添加详情信息
          if (t_data.basis == null) {
            myData[i][t_data.code + "Message"] = "";
          } else {
            messData = t_data.basis.find((item) => {
              return item.well == myWellId;
            });
            myData[i][t_data.code + "Message"] = messData ? (messData.message ? messData.message : "") : "";
            myData[i][t_data.code] = messData ? (messData.itemValue ? messData.itemValue : "") : "";
            myData[i].id = Math.random() * 3;
          }
          //选中项目不需要测试
          if (val == t_data.code) {
            myData[i][t_data.code] = "是"; //默认
          } else {
            if (!isNaN(myWellCount[t_data.code])) {
              t_count = myWellCount[t_data.code];
            } else {
              t_count = 0; //初始化
            }
            let t_subWells = "," + t_data.wells + ",";
            if (myWellId != "null" && t_subWells.includes("," + myWellId + ",")) {
              // myData[i][t_data.code] = '是'; //默认
              t_count++; //计数
            }
            myWellCount[t_data.code] = t_count; //回写
          }
          //深化点-点击井组展示井号
          if (messData && messData.groupEvalBases) {
            let key1 = t_data.code + "Message";
            let key2 = t_data.code;
            let groupEvalBases = messData.groupEvalBases; //层位数据
            let children = myData[i].children;
            console.log("children信息", myData,children,i,messData)
            if (children.length) {
              for (let a = 0; a < groupEvalBases.length; a++) {
                let isFindOut = false; //默认没有查到
                for (let b = 0; b < children.length; b++) {
                  if (groupEvalBases[a].wellNo == children[b].wellId) {
                    isFindOut = true;
                    children[b].id = Math.random() * 3;
                    children[b][key1] = groupEvalBases[a].message;
                    children[b][key2] = groupEvalBases[a].itemValue;
                  }
                }
                if (!isFindOut) {
                  children.push({
                    id: Math.random() * 3,
                    wellId: groupEvalBases[a].wellNo,
                    [key1]: groupEvalBases[a].message,
                    [key2]: groupEvalBases[a].itemValue,
                  });
                }
              }
            } else {
              groupEvalBases.forEach((el, i) => {
                children.push({
                  id: Math.random() * 3,
                  wellId: el.wellNo,
                  [key1]: el.message,
                  [key2]: el.itemValue,
                });
              });
            }
          }
        }
        //注水受效分析 injectionResponseAnalysis
        for (let j = 0; j < this.injectionResponseAnalysis.length; j++) {
          let t_data = this.injectionResponseAnalysis[j]; //每个数据项
          let messData = {};
          //添加详情信息
          if (t_data.basis == null) {
            myData[i]["injectionResponseAnalysisMessage"] = "";
          } else {
            messData = t_data.basis.find((item) => {
              return item.well == myWellId;
            });
            myData[i]["injectionResponseAnalysisMessage"] = messData ? (messData.message ? messData.message : "") : "";
            myData[i].id = Math.random() * 3;
          }
          if (val == t_data.code) {
            //选中项目不需要测试
            myData[i].injectionResponseAnalysis = t_data.name; //默认
          } else {
            if (!isNaN(myWellCount[t_data.code])) {
              t_count = myWellCount[t_data.code];
            } else {
              t_count = 0; //初始化
            }
            let t_subWells = "," + t_data.wells + ",";
            if (myWellId != "null" && t_subWells.includes("," + myWellId + ",")) {
              myData[i].injectionResponseAnalysis = t_data.name; //默认
              t_count++; //计数
            }
            myWellCount[t_data.code] = t_count; //回写
          }
          //深化点-点击井组展示井号
          if (messData && messData.groupEvalBases) {
            let key1 = t_data.code + "Message";
            let key2 = t_data.code;
            let groupEvalBases = messData.groupEvalBases; //层位数据
            let children = myData[i].children;
            if (children.length) {
              for (let a = 0; a < groupEvalBases.length; a++) {
                let isFindOut = false; //默认没有查到
                for (let b = 0; b < children.length; b++) {
                  if (groupEvalBases[a].wellNo == children[b].wellId) {
                    isFindOut = true;
                    children[b].id = Math.random() * 3;
                    children[b][key1] = groupEvalBases[a].message;
                    children[b][key2] = groupEvalBases[a].itemValue;
                  }
                }
                if (!isFindOut) {
                  children.push({
                    id: Math.random() * 3,
                    wellId: groupEvalBases[a].wellNo,
                    [key1]: groupEvalBases[a].message,
                    [key2]: groupEvalBases[a].itemValue,
                  });
                }
              }
            } else {
              groupEvalBases.forEach((el, i) => {
                children.push({
                  id: Math.random() * 3,
                  wellId: el.wellNo,
                  [key1]: el.message,
                  [key2]: el.itemValue,
                });
              });
            }
          }
        }
        //注采平衡 injectionProductionBalance
        for (let j = 0; j < this.injectionProductionBalance.length; j++) {
          let t_data = this.injectionProductionBalance[j]; //每个数据项
          let messData = {};
          //添加详情信息
          if (t_data.basis == null) {
            myData[i]["injectionProductionBalanceMessage"] = "";
          } else {
            messData = t_data.basis.find((item) => {
              return item.well == myWellId;
            });
            myData[i]["injectionProductionBalanceMessage"] = messData ? (messData.message ? messData.message : "") : "";
            myData[i].id = Math.random() * 3;
          }
          //选中项目不需要测试
          if (val == t_data.code) {
            myData[i].injectionProductionBalance = t_data.name; //默认
          } else {
            if (!isNaN(myWellCount[t_data.code])) {
              t_count = myWellCount[t_data.code];
            } else {
              t_count = 0; //初始化
            }
            let t_subWells = "," + t_data.wells + ",";
            if (myWellId != "null" && t_subWells.includes("," + myWellId + ",")) {
              myData[i].injectionProductionBalance = t_data.name; //默认
              t_count++; //计数
            }
            myWellCount[t_data.code] = t_count; //回写
          }
          //深化点-点击井组展示井号
          if (messData && messData.groupEvalBases) {
            let key1 = t_data.code + "Message";
            let key2 = t_data.code;
            let groupEvalBases = messData.groupEvalBases; //层位数据
            let children = myData[i].children;
            if (children.length) {
              for (let a = 0; a < groupEvalBases.length; a++) {
                let isFindOut = false; //默认没有查到
                for (let b = 0; b < children.length; b++) {
                  if (groupEvalBases[a].wellNo == children[b].wellId) {
                    isFindOut = true;
                    children[b].id = Math.random() * 3;
                    children[b][key1] = groupEvalBases[a].message;
                    children[b][key2] = groupEvalBases[a].itemValue;
                  }
                }
                if (!isFindOut) {
                  children.push({
                    id: Math.random() * 3,
                    wellId: groupEvalBases[a].wellNo,
                    [key1]: groupEvalBases[a].message,
                    [key2]: groupEvalBases[a].itemValue,
                  });
                }
              }
            } else {
              groupEvalBases.forEach((el, i) => {
                children.push({
                  id: Math.random() * 3,
                  wellId: el.wellNo,
                  [key1]: el.message,
                  [key2]: el.itemValue,
                });
              });
            }
          }
        }
        //压力保持 thePressureToKeep
        for (let j = 0; j < this.thePressureToKeep.length; j++) {
          let t_data = this.thePressureToKeep[j]; //每个数据项
          let messData = {};
          //添加详情信息
          if (t_data.basis == null) {
            myData[i]["thePressureToKeepMessage"] = "";
          } else {
            messData = t_data.basis.find((item) => {
              return item.well == myWellId;
            });
            myData[i]["thePressureToKeepMessage"] = messData ? (messData.message ? messData.message : "") : "";
            myData[i].id = Math.random() * 3;
          }
          //选中项目不需要测试
          if (val == t_data.code) {
            myData[i].thePressureToKeep = t_data.name; //默认
          } else {
            if (!isNaN(myWellCount[t_data.code])) {
              t_count = myWellCount[t_data.code];
            } else {
              t_count = 0; //初始化
            }
            let t_subWells = "," + t_data.wells + ",";
            if (myWellId != "null" && t_subWells.includes("," + myWellId + ",")) {
              myData[i].thePressureToKeep = t_data.name; //默认
              t_count++; //计数
            }
            myWellCount[t_data.code] = t_count; //回写
          }
          //深化点-点击井组展示井号
          if (messData && messData.groupEvalBases) {
            let key1 = t_data.code + "Message";
            let key2 = t_data.code;
            let groupEvalBases = messData.groupEvalBases; //层位数据
            let children = myData[i].children;
            if (children.length) {
              for (let a = 0; a < groupEvalBases.length; a++) {
                let isFindOut = false; //默认没有查到
                for (let b = 0; b < children.length; b++) {
                  if (groupEvalBases[a].wellNo == children[b].wellId) {
                    isFindOut = true;
                    children[b].id = Math.random() * 3;
                    children[b][key1] = groupEvalBases[a].message;
                    children[b][key2] = groupEvalBases[a].itemValue;
                  }
                }
                if (!isFindOut) {
                  children.push({
                    id: Math.random() * 3,
                    wellId: groupEvalBases[a].wellNo,
                    [key1]: groupEvalBases[a].message,
                    [key2]: groupEvalBases[a].itemValue,
                  });
                }
              }
            } else {
              groupEvalBases.forEach((el, i) => {
                children.push({
                  id: Math.random() * 3,
                  wellId: el.wellNo,
                  [key1]: el.message,
                  [key2]: el.itemValue,
                });
              });
            }
          }
        }
        //recommendedMeasuresOptions//措施推荐；不需要考虑数据项
        for (let j = 0; j < this.recommendedMeasuresOptions.length; j++) {
          let t_data = this.recommendedMeasuresOptions[j]; //每个数据项
          if (val == t_data.code) {
            //选中项目不需要测试
            //myData[i][t_data.code] = '是';//默认
          } else {
            if (!isNaN(myWellCount[t_data.code])) {
              t_count = myWellCount[t_data.code];
            } else {
              t_count = 0; //初始化
            }
            let t_subWells = "," + t_data.wells + ",";
            if (myWellId != "null" && t_subWells.includes("," + myWellId + ",")) {
              //myData[i][t_data.code] = '是';//默认
              t_count++; //计数
            }
            myWellCount[t_data.code] = t_count; //回写
          }
        }
        //有推荐措施时，附加措施效果数据
        let t_index = this.recommendedMeasuresWells[myWellId];
        if (!isNaN(t_index)) {
          //转移措施数据
          let t_partData = this.recommendedMeasuresData[t_index]; //推荐措施的数据
          myData[i].theDate = t_partData.theDate;
          myData[i].measuresCode = t_partData.measuresCode;
          myData[i].measuresName = t_partData.measuresName;
          myData[i].increaseVolume = t_partData.increaseVolume;
          myData[i].increaseQuality = t_partData.increaseQuality;
          myData[i].increaseVolumeC = t_partData.increaseVolumeC;
          myData[i].increaseQualityC = t_partData.increaseQualityC;
        }
      }
      //3、根据每个项目的井数遍历检查表头
      //动态变化趋势 trendOfIndicators
      this.trendOfIndicatorsTab = [];
      for (let j = 0; j < this.trendOfIndicators.length; j++) {
        let t_data = this.trendOfIndicators[j]; //每个数据项
        //获得相关井数
        if (!isNaN(myWellCount[t_data.code])) {
          t_count = myWellCount[t_data.code];
        } else {
          t_count = 0; //初始化
        }
        // TODO lv 测试环境问题排查 trendOfIndicators   this.trendOfIndicators[j].value = t_count;赋值值可能存在问题，
        // 可能存在wellId重复
        this.trendOfIndicators[j].value = t_count; //登记条数
        if (t_count > 0) {
          let titleName = t_data.name;
          let unit = "";
          if (t_data.unit) {
            unit = t_data.unit.replace("m3", "m³");
          }
          if (t_data.name != "正常") {
            this.trendOfIndicatorsTab.push({
              code: t_data.code,
              name: titleName,
              unit,
            }); //添加动态表头
          }
        }
      }
      //注水受效分析 injectionResponseAnalysis
      for (let j = 0; j < this.injectionResponseAnalysis.length; j++) {
        let t_data = this.injectionResponseAnalysis[j]; //每个数据项
        //获得相关井数
        if (!isNaN(myWellCount[t_data.code])) {
          t_count = myWellCount[t_data.code];
        } else {
          t_count = 0; //初始化
        }
        this.injectionResponseAnalysis[j].value = t_count; //登记条数
      }
      //注采平衡 injectionProductionBalance
      for (let j = 0; j < this.injectionProductionBalance.length; j++) {
        let t_data = this.injectionProductionBalance[j]; //每个数据项
        //获得相关井数
        if (!isNaN(myWellCount[t_data.code])) {
          t_count = myWellCount[t_data.code];
        } else {
          t_count = 0; //初始化
        }
        this.injectionProductionBalance[j].value = t_count; //登记条数
      }
      //压力保持 thePressureToKeep
      for (let j = 0; j < this.thePressureToKeep.length; j++) {
        let t_data = this.thePressureToKeep[j]; //每个数据项
        //获得相关井数
        if (!isNaN(myWellCount[t_data.code])) {
          t_count = myWellCount[t_data.code];
        } else {
          t_count = 0; //初始化
        }
        this.thePressureToKeep[j].value = t_count; //登记条数
      }
      //recommendedMeasuresOptions//措施推荐；不需要考虑数据项
      for (let j = 0; j < this.recommendedMeasuresOptions.length; j++) {
        let t_data = this.recommendedMeasuresOptions[j]; //每个数据项
        //获得相关井数
        if (!isNaN(myWellCount[t_data.code])) {
          t_count = myWellCount[t_data.code];
        } else {
          t_count = 0; //初始化
        }
        this.recommendedMeasuresOptions[j].value = t_count; //登记条数
      }
      this.tableData = myData;
      this.oldTableData = cloneDeep(myData);
      this.$nextTick(() => {
        this.$refs.tableList.doLayout();
      });
      // TODO lv 点击后不更改正常异常井数
      // //zxb-重新计算数量
      // let numKeys=['trendOfIndicatorsNum','injectionProductionBalanceNum','injectionResponseAnalysisNum','thePressureToKeepNum'];
      // let datakeys=['trendOfIndicators','injectionProductionBalance','injectionResponseAnalysis','thePressureToKeep'];
      // for(let i=0;i<numKeys.length;i++){
      //     let numKey=numKeys[i];
      //     let dataKey=datakeys[i];
      //     this[numKey].allnum=0;
      //     this[numKey].zcnum=0;
      //     this[numKey].ycnum=0;
      //     this[dataKey].forEach((el,i)=>{
      //         console.log(this[dataKey][i].value,7777)
      //         console.log(Number(this[dataKey][i].value),999)
      //         this[numKey].allnum+=Number(this[dataKey][i].value);
      //         if(el.name=='正常'||el.name=='合格区'){
      //             this[numKey].zcnum=Number(this[dataKey][i].value);
      //             this[numKey].ycnum+=Number(this[dataKey][i].exeValue);
      //         }else{
      //             // this[numKey].ycnum+=Number(this[dataKey][i].value);
      //         }
      //     })
      //     this[numKey].zczb=this[numKey].zcnum/this[numKey].allnum * 100;
      //     this[numKey].yczb=this[numKey].yczb/this[numKey].allnum * 100;
      //     console.log('this[numKey]',this[numKey])
      // }
      //zxb-重新计算推荐井组
      this.potentialWellNum = 0;
      for (let i = 0; i < this.recommendedMeasuresOptions.length; i++) {
        let el = this.recommendedMeasuresOptions[i];
        this.potentialWellNum += Number(el.value);
      }
    },
    //选中项目
    selRadioIterm(val, tag) {
      let myData = []; //我的数据
      let myWellCount = {}; //计算各项目的井数
      let t_count = 0; //计数器
      this.selTag = tag; //选中数据集
      if (val == undefined || val == "") {
        return false; //无效参数
      }
      if (this.selCode != val) {
        this.selCode = val; //选中项目
      } else {
        this.selCode = "";
        this.doSearch();
        return false;
      }
      //进行运算
      //1、获取选中井集合
      if (this[tag].length) {
        for (let i = 0; i < this[tag].length; i++) {
          let tData = this[tag][i];
          if (val == tData.code) {
            if (tData.wells == undefined || tData.wells == "" || tData.wells == "null") {
              //无数据
              myData = []; //没有数据
              this[tag][i].value = 0; //井数
              myWellCount[tData.code] = 0; //计数器
            } else {
              //有数据
              let wellList = tData.wells.split(","); //我的井号串（逗号分割）
              this[tag][i].value = wellList.length; //井数
              myWellCount[tData.code] = wellList.length; //计数器
              for (let j = 0; j < wellList.length; j++) {
                myData[j] = {
                  wellId: wellList[j],
                  children: [],
                }; //初始容器
              }
            }
            break; //找到
          }
        }
      }
      this.queryTableData(myData);
    },
    //动态变化趋势---zxb
    queryTrendOfIndicators(request) {
      return indicatorVariationTrendency(request).then((res) => {
        let msg = res.data.msg;
        if (msg == "success") {
          let myData = res.data.data.indicatorAnalysisDetailInfos;
          this.trendOfIndicatorsNum.allnum = 0;
          this.trendOfIndicatorsNum.zcnum = 0;
          this.trendOfIndicatorsNum.ycnum = 0;
          myData.forEach((el, i) => {
            if (el.wells) {
              let wells = el.wells.split(",");
              this.collectWells.push(wells);
            }
            this.trendOfIndicatorsNum.allnum += Number(el.value);
            if (el.name == "正常") {
              this.trendOfIndicatorsNum.zcnum = Number(el.value);
              this.trendOfIndicatorsNum.ycnum = Number(el.exeValue);
            } else {
              console.log(Number(el.value), !!Number(el.value));
              myData[i].isShow = Number(el.value) ? true : false;
              // this.trendOfIndicatorsNum.ycnum+=Number(el.value);
            }
          });
          this.trendOfIndicatorsNum.zczb = (this.trendOfIndicatorsNum.zcnum / this.trendOfIndicatorsNum.allnum) * 100;
          this.trendOfIndicatorsNum.yczb = (this.trendOfIndicatorsNum.yczb / this.trendOfIndicatorsNum.allnum) * 100;
          this.trendOfIndicators = myData;
        }
      });
    },
    //注水受效分析---zxb
    queryInjectionResponseAnalysis(request) {
      return injectionEffectivity(request).then((res) => {
        let msg = res.data.msg;
        if (msg == "success") {
          let myData = res.data.data.indicatorAnalysisDetailInfos;
          this.injectionResponseAnalysisNum.allnum = 0;
          this.injectionResponseAnalysisNum.zcnum = 0;
          this.injectionResponseAnalysisNum.ycnum = 0;
          myData.forEach((el, i) => {
            if (el.wells) {
              let wells = el.wells.split(",");
              this.collectWells.push(wells);
            }
            this.injectionResponseAnalysisNum.allnum += Number(el.value);
            if (el.name == "正常") {
              this.injectionResponseAnalysisNum.zcnum = Number(el.value);
            } else {
              myData[i].isShow = Number(el.value) ? true : false;
              this.injectionResponseAnalysisNum.ycnum += Number(el.value);
            }
          });
          this.injectionResponseAnalysisNum.zczb =
            (this.injectionResponseAnalysisNum.zcnum / this.injectionResponseAnalysisNum.allnum) * 100;
          this.injectionResponseAnalysisNum.yczb =
            (this.injectionResponseAnalysisNum.yczb / this.injectionResponseAnalysisNum.allnum) * 100;
          this.injectionResponseAnalysis = myData;
        }
      });
    },
    //注采平衡---zxb
    queryInjectionProductionBalance(request) {
      return proInjectBalance(request).then((res) => {
        let msg = res.data.msg;
        if (msg == "success") {
          let myData = res.data.data.indicatorAnalysisDetailInfos;
          this.injectionProductionBalanceNum.allnum = 0;
          this.injectionProductionBalanceNum.zcnum = 0;
          this.injectionProductionBalanceNum.ycnum = 0;
          myData.forEach((el, i) => {
            if (el.wells) {
              let wells = el.wells.split(",");
              this.collectWells.push(wells);
            }
            this.injectionProductionBalanceNum.allnum += Number(el.value);
            if (el.name == "正常") {
              this.injectionProductionBalanceNum.zcnum = Number(el.value);
            } else {
              myData[i].isShow = Number(el.value) ? true : false;
              this.injectionProductionBalanceNum.ycnum += Number(el.value);
            }
          });
          this.injectionProductionBalanceNum.zczb =
            (this.injectionProductionBalanceNum.zcnum / this.injectionProductionBalanceNum.allnum) * 100;
          this.injectionProductionBalanceNum.yczb =
            (this.injectionProductionBalanceNum.yczb / this.injectionProductionBalanceNum.allnum) * 100;
          this.injectionProductionBalance = myData;
        }
      });
    },
    //压力保持---zxb
    queryThePressureToKeep(request) {
      return pressureMaintain(request).then((res) => {
        let msg = res.data.msg;
        if (msg == "success") {
          let myData = res.data.data.indicatorAnalysisDetailInfos;
          this.thePressureToKeepNum.allnum = 0;
          this.thePressureToKeepNum.zcnum = 0;
          this.thePressureToKeepNum.ycnum = 0;
          myData.forEach((el, i) => {
            if (el.wells) {
              let wells = el.wells.split(",");
              this.collectWells.push(wells);
            }
            this.thePressureToKeepNum.allnum += Number(el.value);
            if (el.name == "正常") {
              this.thePressureToKeepNum.zcnum = Number(el.value);
            } else {
              myData[i].isShow = Number(el.value) ? true : false;
              this.thePressureToKeepNum.ycnum += Number(el.value);
            }
          });
          this.thePressureToKeepNum.zczb = (this.thePressureToKeepNum.zcnum / this.thePressureToKeepNum.allnum) * 100;
          this.thePressureToKeepNum.yczb = (this.thePressureToKeepNum.yczb / this.thePressureToKeepNum.allnum) * 100;
          this.thePressureToKeep = myData;
        }
      });
    },
    //措施推荐可用项目
    queryRecommendedMeasures(paramMap) {
      return wellGroupRecommendMeasure(paramMap).then((res) => {
        let msg = res.data.msg;
        if (msg == "success") {
          let myData = res.data.data.indicatorAnalysisDetailInfos;
          this.potentialWellNum = 0;
          myData.forEach((el, i) => {
            this.potentialWellNum += Number(el.value);
          });
          this.recommendedMeasuresOptions = myData;
        }
      });
    },
    //措施推荐可用项目,获取措施效果数据
    queryProWellDynamicAnalysisDetail(paramMap) {
      return wellGroupDynamicAnalysisDetail(paramMap).then((res) => {
        let msg = res.data.msg;
        if (msg == "success") {
          let myData = res.data.data.evaluationResults;
          this.recommendedMeasuresData = myData;
          this.recommendedMeasuresWells = {};
          this.initRecommendedMeasuresWells(); //生成井清单
        }
      });
    },
    //初始化有措施的井清单
    initRecommendedMeasuresWells() {
      if (this.recommendedMeasuresData) {
        for (let i = 0; i < this.recommendedMeasuresData.length; i++) {
          let tData = this.recommendedMeasuresData[i];
          this.recommendedMeasuresWells[tData.wellGroupName] = i;
        }
      }
    },
    preliminarySelectioMeasures(str, type) {
      let currentArr = this.recommendedMeasuresData.filter((item) => item.wellGroupName == str);
      if (type == 1) {
        let currentName = currentArr.length > 0 ? currentArr.map((item) => item.measuresName).join("\n") : "-";
        return currentName;
      } else {
        let currentDate = currentArr.length > 0 ? currentArr.map((item) => item.theDate).join("\n") : "-";
        return currentDate;
      }
    },
    //跳转到水井页面
    goWaterWell(val) {
      if (val == "water") {
        this.$router.push("/singleWellPerformance_water");
      }
    },
    //跳转到分析
    openAnalysis(wellNumber) {
      this.$router.push({
        name: "WellGroupAnalysisAssistant",
        query: {
          oilField: this.selYtdm,
          block: this.selBlock,
          wellId: wellNumber,
        },
      });
    },
    // 表格排序自定义方法
    sortChange({ column, prop, order }) {
      this.queryParams.page = 1;
      if (order === "ascending") {
        this.tableData = this.tableData.sort((a, b) => {
          return prop === "wellId" ? this.wellNoSort(a[prop], b[prop]) : a[prop] - b[prop];
        });
      } else if (order === "descending") {
        this.tableData = this.tableData.sort((a, b) => {
          return prop === "wellId" ? this.wellNoSort(b[prop], a[prop]) : b[prop] - a[prop];
        });
      } else {
        this.tableData = cloneDeep(this.oldTableData);
      }
    },
    //下载导出文件 tableId tableName
    doDownExcel(tableId, tableName) {
      exportExcel(tableId, tableName);
    },
    // 自定序号
    formatIndex(index) {
      return (this.queryParams.page - 1) * this.queryParams.pageSize + index + 1;
    },
    /**
     * 切换分页
     */
    pagination(e) {
      this.queryParams.page = e.page;
      this.queryParams.pageSize = e.limit;
    },
  },
};
</script>

<style lang="scss" scoped>
.z_app_container {
  height: 100%;
  .app-container {
    height: 100%;
  }
  .app-container2 {
    height: 100%;
    .app-container3 {
      margin-top: 20px;
      height: calc(100% - 100px);
      position: relative;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 0px;
        height: 1px;
      }
      &::-webkit-scrollbar-thumb {
        //滑块部分
        border-radius: 5px;
        background-color: rgb(175, 74, 240);
      }
      &::-webkit-scrollbar-track {
        //轨道部分
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #ededed;
        border-radius: 5px;
      }
      .leftBox {
        width: 460px;
        // height:1240px;
        height: 1200px;
        position: relative;
        .speed {
          width: 100%;
          height: 100%;
        }
        .img1 {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
        }
        .img2 {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 2;
        }
        .img3 {
          position: absolute;
          left: 0;
          top: 146px;
          width: 563px;
          height: 378px;
        }
        .img4 {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
        }
        .img5 {
          width: 18px;
          height: 370px;
          position: absolute;
          left: 190px;
          top: 224px;
        }
        .img6 {
          width: 18px;
          height: 370px;
          position: absolute;
          left: 167px;
          top: 224px;
        }
        .img7 {
          width: 18px;
          height: 370px;
          position: absolute;
          left: 212px;
          top: 224px;
        }
        .bg {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
      .rightBox {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 3;
      }
      .v0 {
        padding-left: 400px;
      }
      .v1 {
        margin: 5px 0;
        padding-left: 400px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        z-index: 3;
        .bgline1 {
          width: 358px;
          height: 43px;
          position: absolute;
          left: 180px;
          top: 30px;
          z-index: -1;
        }
        .btns0 {
          min-width: 250px;
          height: 70px;
          padding-left: 20px;
          border: 1px solid;
          border-image: linear-gradient(180deg, #2e5b7c, #01aaf2) 3 3;
          background-image: var(--logo-bg) !important;
          display: flex;
          align-items: center;
          margin-right: 46px;
          .helpImg {
            width: 52px;
            height: 52px;
            margin-right: 18px;
          }
          span {
            flex: 1;
            font-size: 50px;
            color: #ffca07;
            font-weight: 600;
          }
          b {
            margin-right: 10px;
            position: relative;
            top: -18px;
            font-size: 16px;
            color: #24deff;
          }
        }
      }
      .v2 {
        margin-bottom: 30px;
        padding-left: 400px;
        width: 100%;
        height: 300px;
        position: relative;
        z-index: 2;
        .bgline0 {
          width: 374px;
          height: 134px;
          position: absolute;
          left: 172px;
          top: -70px;
        }
        .bgline2 {
          width: 380px;
          height: 271px;
          position: absolute;
          left: 180px;
          top: -72px;
        }
        .z-content {
          padding-left: 36px;
          .z-content-n {
            // margin-top:16px;
            display: flex;
            .z-row-left {
              width: 380px;
              .z_title {
                display: flex;
                align-items: center;
                position: relative;
                img {
                  width: 38px;
                  height: 38px;
                  margin-right: 10px;
                }
                span {
                  padding-left: 30px;
                  font-size: 16px;
                  // color: #FFFFFF;
                  text-align: center;
                  font-weight: 600;
                  z-index: 1;
                }
                &::before {
                  content: "";
                  background-image: linear-gradient(
                    137deg,
                    rgba(141, 205, 251, 0) 0%,
                    rgba(54, 151, 222, 0.41) 30%,
                    rgba(17, 110, 177, 0.54) 67%,
                    rgba(2, 95, 161, 0.2) 88%,
                    rgba(148, 210, 253, 0) 100%
                  );
                  width: 150px;
                  height: 32px;
                  position: absolute;
                  left: 60px;
                  top: 2px;
                  z-index: 0;
                }
              }
              .z_title2 {
                display: flex;
                align-items: center;
                position: relative;
                img {
                  width: 38px;
                  height: 38px;
                  margin-right: 20px;
                }
                span {
                  padding-left: 30px;
                  font-size: 16px;
                  // color: #FFFFFF;
                  text-align: center;
                  font-weight: 600;
                  z-index: 1;
                }
                &::before {
                  content: "";
                  background-image: linear-gradient(
                    137deg,
                    rgba(141, 205, 251, 0) 0%,
                    rgba(54, 151, 222, 0.41) 30%,
                    rgba(17, 110, 177, 0.54) 67%,
                    rgba(2, 95, 161, 0.2) 88%,
                    rgba(148, 210, 253, 0) 100%
                  );
                  width: 110px;
                  height: 32px;
                  position: absolute;
                  left: 50px;
                  top: 2px;
                  z-index: 0;
                }
              }
              .z_schedule {
                margin-top: 22px;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                .sp1 {
                  // width:61px;
                  font-size: 14px;
                }
                .z_proess {
                  width: 155px;
                  height: 16px;
                  border: 1px solid rgba(41, 171, 226, 1);
                  margin-right: 16px;
                  display: flex;
                  align-items: center;
                  padding: 1px;
                  .z_proess_sp1 {
                    height: 100%;
                    background: linear-gradient(to right, #2cbdfb 0%, #80e2bf 50%, #befe93 100%);
                    b {
                      font-size: 14px;
                      color: #00223f;
                      letter-spacing: 0;
                      font-weight: 700;
                      position: relative;
                      top: -6px;
                      left: 14px;
                    }
                  }
                  .z_proess_sp2 {
                    flex: 1;
                    height: 100%;
                    background: linear-gradient(to right, #ffc255 0%, #ff9c46 50%, #ff7b39 100%);
                  }
                }
                .sp2 {
                  font-size: 14px;
                  color: rgba(255, 200, 53, 0.8);
                  b {
                    font-size: 20px;
                    opacity: 1;
                    color: #ffc835;
                  }
                }
              }
            }
            .z-row-center {
              flex: 1;
              display: flex;
              flex-wrap: wrap;
              .numBtn {
                cursor: pointer;
                width: 120px;
                border-radius: 4px;
                height: 68px;
                padding: 0 10px;
                margin-right: 8px;
                margin-bottom: 8px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background-image: linear-gradient(
                  137deg,
                  rgba(141, 205, 251, 0) 0%,
                  rgba(54, 151, 222, 0.41) 30%,
                  rgba(17, 110, 177, 0.54) 67%,
                  rgba(2, 95, 161, 0.2) 88%,
                  rgba(148, 210, 253, 0) 100%
                );
                .sp1 {
                  font-size: 16px;
                  color: #ffca07;
                  font-weight: 600;
                }
                .sp2 {
                  font-size: 12px;
                }
              }
              .numBtnBgActive {
                background: var(--logo-bg) no-repeat top / contain, var(--primary-btn) !important;
              }
            }
          }
        }
      }
      .v3 {
        height: 280px;
        .z-content2 {
          padding-left: 36px;
          display: flex;
          .z1 {
            width: 636px;
            margin-right: 40px;
          }
          .z2 {
            flex: 1;
          }
          .z3 {
            display: flex;
            justify-content: flex-end;
            .z-row-right {
              width: 250px;
              height: 110px;
              margin-right: 20px;
              padding: 0 20px 0 10px;
              padding-bottom: 20px;
              border: 1px solid;
              border-image: linear-gradient(180deg, #2e5b7c, #01aaf2) 3 3;
              background-image: var(--logo-bg) !important;
              .name {
                padding-top: 14px;
                margin-bottom: 14px;
                font-size: 18px;
                color: #24deff;
                text-align: center;
                line-height: 25px;
                font-weight: 600;
              }
              .num {
                flex-wrap: wrap;
                display: flex;
                align-items: center;
                justify-content: space-between;
                span {
                  cursor: pointer;
                  width: 106px;
                  font-size: 12px;
                  // text-align: right;
                }
              }
            }
          }
          .z-content-n {
            margin-top: 16px;
            display: flex;
            .z-row-left {
              width: 380px;
              .z_title {
                display: flex;
                align-items: center;
                position: relative;
                img {
                  width: 38px;
                  height: 38px;
                  margin-right: 10px;
                }
                span {
                  padding-left: 30px;
                  font-size: 16px;
                  // color: #FFFFFF;
                  text-align: center;
                  font-weight: 600;
                  z-index: 1;
                }
                &::before {
                  content: "";
                  background-image: linear-gradient(
                    137deg,
                    rgba(141, 205, 251, 0) 0%,
                    rgba(54, 151, 222, 0.41) 30%,
                    rgba(17, 110, 177, 0.54) 67%,
                    rgba(2, 95, 161, 0.2) 88%,
                    rgba(148, 210, 253, 0) 100%
                  );
                  width: 150px;
                  height: 32px;
                  position: absolute;
                  left: 60px;
                  top: 2px;
                  z-index: 0;
                }
              }
              .z_title2 {
                display: flex;
                align-items: center;
                position: relative;
                img {
                  width: 38px;
                  height: 38px;
                  margin-right: 20px;
                }
                span {
                  padding-left: 30px;
                  font-size: 16px;
                  // color: #FFFFFF;
                  text-align: center;
                  font-weight: 600;
                  z-index: 1;
                }
                &::before {
                  content: "";
                  background-image: linear-gradient(
                    137deg,
                    rgba(141, 205, 251, 0) 0%,
                    rgba(54, 151, 222, 0.41) 30%,
                    rgba(17, 110, 177, 0.54) 67%,
                    rgba(2, 95, 161, 0.2) 88%,
                    rgba(148, 210, 253, 0) 100%
                  );
                  width: 150px;
                  height: 32px;
                  position: absolute;
                  left: 50px;
                  top: 2px;
                  z-index: 0;
                }
              }
              .z_schedule {
                margin-top: 22px;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                .sp1 {
                  // width:61px;
                  font-size: 14px;
                }
                .z_proess {
                  width: 155px;
                  height: 16px;
                  border: 1px solid rgba(41, 171, 226, 1);
                  margin-right: 16px;
                  display: flex;
                  align-items: center;
                  padding: 1px;
                  .z_proess_sp1 {
                    height: 100%;
                    background: linear-gradient(to right, #2cbdfb 0%, #80e2bf 50%, #befe93 100%);
                    b {
                      font-size: 14px;
                      color: #00223f;
                      letter-spacing: 0;
                      font-weight: 700;
                      position: relative;
                      top: -6px;
                      left: 14px;
                    }
                  }
                  .z_proess_sp2 {
                    flex: 1;
                    height: 100%;
                    background: linear-gradient(to right, #ffc255 0%, #ff9c46 50%, #ff7b39 100%);
                  }
                }
                .sp2 {
                  font-size: 14px;
                  color: rgba(255, 200, 53, 0.8);
                  b {
                    font-size: 20px;
                    opacity: 1;
                    color: #ffc835;
                  }
                }
              }
            }
            .z-row-center {
              flex: 1;
              display: flex;
              flex-wrap: wrap;
              .numBtn {
                cursor: pointer;
                width: 120px;
                border-radius: 4px;
                height: 68px;
                padding: 0 10px;
                margin-right: 8px;
                margin-bottom: 8px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background-image: linear-gradient(
                  137deg,
                  rgba(141, 205, 251, 0) 0%,
                  rgba(54, 151, 222, 0.41) 30%,
                  rgba(17, 110, 177, 0.54) 67%,
                  rgba(2, 95, 161, 0.2) 88%,
                  rgba(148, 210, 253, 0) 100%
                );
                .sp1 {
                  font-size: 16px;
                  color: #ffca07;
                  font-weight: 600;
                }
                .sp2 {
                  font-size: 12px;
                }
              }
              .numBtnBgActive {
                background: var(--logo-bg) no-repeat top / contain, var(--primary-btn) !important;
              }
            }
          }
        }
      }
    }
  }
}

.condationRow {
  height: 30px;
  line-height: 30px;
  margin-bottom: 0px;
  font-size: 14px;
}

//默认未选中
::v-deep .checkButton {
  width: 100%;
  margin-top: 5px;
  .el-radio-button__inner {
    width: 100%;
    height: 100%;
    border-radius: 0 !important;
    border: 1px solid rgba(143, 164, 204, 0.3);
    background: rgba(143, 164, 204, 0.3) !important;
    &:hover {
      background: var(--primary-btn) !important;
    }
  }
}
//选中
::v-deep .el-radio-group {
  .is-active {
    .el-radio-button__inner {
      width: 100%;
      height: 100%;
      border-radius: 0;
      border: 1px solid rgba(143, 164, 204, 0.3);
      background: var(--primary-btn) !important;
      &:hover {
        background: var(--primary-btn) !important;
      }
    }
  }
}
//相关
::v-deep .el-col .about1 {
  background: rgb(2, 43, 117);
  color: #fff;
  .el-radio-button__inner {
    color: #fff;
    background: transparent !important;
  }
}

.z-button {
  width: 100%;
  height: 28px;
  font-size: 14px;
  text-align: center;
  border-color: var(--light-blue-color);
  color: var(--form-text);
  transition: all 0s;
  height: 34px;
  line-height: 8px;
  border-radius: 0 !important;
  background: rgba(143, 164, 204, 0.3);
  background-size: 100% 100% !important;
  &:hover {
    border-image: var(--primary-btn);
    border-color: var(--light-blue-color);
    background: var(--primary-btn) !important;
    color: var(--white-color);
  }
}
.el-col .selectButton {
  border-image: var(--primary-btn);
  border-color: var(--light-blue-color);
  background: var(--primary-btn) !important;
  color: var(--white-color);
}

.checkBtn {
  width: 110px;
  height: 28px;
  font-size: 14px;
  text-align: center;
  border-image: var(--primary-btn);
  background: var(--logo-bg) no-repeat top / contain, var(--primary-btn) !important;
  background-size: 100% 100% !important;
  color: #fff;
}
.about {
  width: 110px;
  height: 28px;
  font-size: 14px;
  text-align: center;
  background: rgb(2, 43, 117);
  color: #fff;
}
.noCheckBtn {
  width: 110px;
  height: 28px;
  font-size: 14px;
  text-align: center;
  background: rgba(143, 164, 204, 0.3);
}

//表格
.table-fixed {
  ::v-deep .el-table__body-wrapper {
    height: calc(84% - 44px) !important;
  }
}
::v-deep .el-table thead.is-group th {
  background: transparent;
}
::v-deep .table_header .twoRowHeader {
  display: flex !important;
  justify-content: center;
}

.spActive {
  color: var(--light-blue-color);
}
::v-deep .el-table__body .cell {
  height: auto !important;
  line-height: 20px !important;
  .el-tooltip.item {
    white-space: pre;
  }
}
::v-deep .el-table__fixed-body-wrapper {
  top: 92px;
}
::v-deep .el-table__fixed-header-wrapper .cell,
::v-deep .el-table__header-wrapper .cell {
  height: auto !important;
  line-height: 30px !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}
</style>
