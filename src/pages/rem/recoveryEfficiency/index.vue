<!-- 采收率及可采储量预测 -->
<template>
  <div class="app-container" style="height: 100%">
    <header-search style="height: auto; padding: 10px 20px 12px">
      <div class="g-row-flex-V" style="justify-content: space-between">
        <div class="g-row-flex-V" style="flex-wrap: wrap">
          <div style="margin: 10px 20px 10px 0px">
            <span>油田：</span>
            <el-select v-model="selectOilField" placeholder="请选择" class="f2" disabled @change="changeOilfield">
              <el-option v-for="item in oilField" :key="item.ogfId" :label="item.ogfName" :value="item.ogfId">
              </el-option>
            </el-select>
          </div>
          <div style="margin: 10px 20px 10px 0px">
            <span>区块：</span>
            <el-select v-model="selectBlock" placeholder="请选择" class="f2" @change="changeBlock">
              <el-option
                v-for="item in block"
                :key="item.reservoirAnalyseUnitId"
                :label="item.reservoirAnalyseUnitName"
                :value="item.reservoirAnalyseUnitId"
              >
              </el-option>
            </el-select>
          </div>
          <!-- <div>
                <span>层系：</span>
                <el-select v-model="cx" class="f2" style="width:180px">
                    <el-option v-for="(item,index) in position" :key="index" :label="item.layerName" :value="item.fieldLayerId" :disabled="item.disabled">
                    </el-option>
                </el-select>
            </div> -->
          <div style="margin: 10px 20px 10px 0px">
            <el-button icon="el-icon-search" type="primary" style="margin-left: 20px" @click="Retrieval"
              >搜索</el-button
            >
            <el-button class="commonBtn" icon="el-icon-refresh" @click="resetting">重置</el-button>
          </div>
        </div>
        <div class="g-row-flex-V" style="flex-wrap: wrap; align-self: flex-end" v-if="$route.query.page || $route.query.name">
          <div style="margin: 10px 0px 10px 0px">
            <el-button class="commonBtn" @click="switchToBack">返回</el-button>
          </div>
        </div>
      </div>
    </header-search>
    <page-panel-new style="height: calc(100% - 100px)">
      <div style="height: 100%">
        <el-row style="height: 200px; margin-bottom: 20px">
          <div style="height: 50px; display: flex; justify-content: flex-end; align-items: center; margin-bottom: 10px">
            <span>单位切换：</span>
            <el-select v-model="unitType" placeholder="请选择" style="width: 100px" @change="oilFieldRecoveryRatioApi">
              <el-option label="10⁴m³" value="10⁴m³"></el-option>
              <el-option label="10⁴t" value="10⁴t"></el-option>
            </el-select>
            <el-button
              icon="el-icon-download"
              type="primary"
              style="margin-left: 20px"
              @click="doDownExcel('#table4', '经验公式法')"
              >下载</el-button
            >
          </div>
          <el-table
            id="table4"
            :data="wellPerformanceAnalysis"
            style="width: 100%"
            height="150px"
            class="doubleHeader"
            :row-style="{ height: '0px' }"
            :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
            header-cell-class-name="table_header"
            :cell-style="{ padding: '6px', 'text-align': 'center' }"
          >
            <el-table-column prop="name" label="油田(区块)" fixed></el-table-column>
            <el-table-column label="储量状况">
              <el-table-column label-class-name="twoRowHeader">
                <template #header>
                  <div>
                    <span>地质储量</span>
                    <br />
                    <span>({{ unitType }})</span>
                  </div>
                </template>
                <template slot-scope="scoped">
                  <span>{{ scoped.row.geologyReservoirs | toFixedFour }}</span>
                </template>
              </el-table-column>
              <el-table-column label-class-name="twoRowHeader">
                <template #header>
                  <div>
                    <span>可采储量</span>
                    <br />
                    <span>({{ unitType }})</span>
                  </div>
                </template>
                <template slot-scope="scoped">
                  <span>{{ scoped.row.recoverableReserves | toFixedFour }}</span>
                </template>
              </el-table-column>
              <el-table-column label-class-name="twoRowHeader">
                <template #header>
                  <div>
                    <span>采收率</span>
                    <br />
                    <span>(%)</span>
                  </div>
                </template>
                <template slot-scope="scoped">
                  <span>{{ scoped.row.recoveryRatio | toFixedTwo }}</span>
                </template>
              </el-table-column>
              <el-table-column label-class-name="twoRowHeader">
                <template #header>
                  <div>
                    <span>累产油</span>
                    <br />
                    <span>({{ unitType }})</span>
                  </div>
                </template>
                <template slot-scope="scoped">
                  <span>{{ scoped.row.oilSum | toFixedFour }}</span>
                </template>
              </el-table-column>
              <el-table-column label-class-name="twoRowHeader">
                <template #header>
                  <div>
                    <span>目前剩余可采储量</span>
                    <br />
                    <span>({{ unitType }})</span>
                  </div>
                </template>
                <template slot-scope="scoped">
                  <span>{{ scoped.row.remainCurrent | toFixedFour }}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="采出程度">
              <el-table-column prop="geologyReservoirsForOutput" label-class-name="twoRowHeader">
                <template #header>
                  <div>
                    <span>地质储量</span>
                    <br />
                    <span>(%)</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="recoverableReservesForOutput" label-class-name="twoRowHeader">
                <template #header>
                  <div>
                    <span>可采储量</span>
                    <br />
                    <span>(%)</span>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="采油速度">
              <el-table-column prop="recoverableReservesForProSpeed" label-class-name="twoRowHeader">
                <template #header>
                  <div>
                    <span>可采储量</span>
                    <br />
                    <span>(%)</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="recoverableReservesRemainForProSpeed" label-class-name="twoRowHeader">
                <template #header>
                  <div>
                    <span>剩余可采储量</span>
                    <br />
                    <span>(%)</span>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row style="height: 32px; margin-bottom: 20px">
          <el-tabs class="g-pageHeader" v-model="activeName" topline @tab-click="handleClick">
            <el-tab-pane
              style="height: auto"
              v-for="(item, index) in tabs"
              :key="index"
              :label="item.label"
              :name="item.name"
            ></el-tab-pane>
          </el-tabs>
        </el-row>
        <div
          v-if="activeName == 'waterDrive'"
          style="height: calc(100% - 250px); overflow-y: scroll; overflow-x: hidden"
        >
          <div style="display: flex; align-items: center; margin-bottom: 20px">
            <span>拟合起始时间：</span>
            <el-date-picker
              v-model="dateTime"
              type="monthrange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              @change="sqtzChart"
            ></el-date-picker>
            <el-radio-group v-model="radio1" style="margin-left: 10px">
              <el-radio-button label="图表"></el-radio-button>
              <el-radio-button label="数据"></el-radio-button>
            </el-radio-group>
          </div>
          <el-row style="height: 100%" :gutter="20">
            <el-col :span="14" style="height: 100%">
              <pagePanel headerTitle="水驱特征曲线法" style="height: 350px; margin-top: 0" show-btn>
                <div style="height: 100%" v-if="radio1 == '图表'">
                  <Echart :chart-data="option" height="100%"></Echart>
                </div>
                <template v-if="radio1 == '数据'">
                  <div style="display: flex; justify-content: flex-end">
                    <el-button
                      icon="el-icon-download"
                      type="primary"
                      style="margin-bottom: 20px"
                      @click="doDownExcel('#table1', '水驱特征曲线法')"
                      >下载</el-button
                    >
                  </div>
                  <el-table id="table1" highlight :data="sjtableDate" height="calc(100% - 55px)" class="doubleHeader">
                    <el-table-column align="center" type="index" label="序号"></el-table-column>
                    <el-table-column
                      align="center"
                      prop="theDate"
                      show-overflow-tooltip
                      label-class-name="twoRowHeader"
                    >
                      <template slot="header">
                        <div>
                          <span>日期</span>
                          <br />
                          <span>(yyyy/mm/dd)</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="x"
                      :label="
                        radioType == 'A'
                          ? 'Np'
                          : radioType == 'B'
                          ? 'Np'
                          : radioType == 'C'
                          ? 'Lp'
                          : radioType == 'D'
                          ? 'Wp'
                          : radioType == 'YUQITAI'
                          ? 'lg(Lp/Wp)'
                          : 'x'
                      "
                      :formatter="toPrecise4"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="y"
                      :label="
                        radioType == 'A'
                          ? 'lgWp'
                          : radioType == 'B'
                          ? 'lgLp'
                          : radioType == 'C'
                          ? 'Lp/Np'
                          : radioType == 'D'
                          ? 'Lp/Np'
                          : radioType == 'YUQITAI'
                          ? 'logNp'
                          : 'y'
                      "
                      :formatter="toPrecise4"
                    ></el-table-column>
                  </el-table>
                </template>
              </pagePanel>
              <div
                class="pageHeader"
                style="
                  width: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  margin-top: 20px;
                  margin-bottom: 20px;
                  margin-left: 0;
                "
              >
                <span>计算结果</span>
              </div>
              <el-row style="height: 60px; text-align: center">
                <el-col :span="12">
                  <el-row>
                    <el-col
                      ><span style="font-size: 30px; color: #24deff">{{ sqproOutputRate | toFixedTwo }}</span></el-col
                    >
                    <el-col><span style="font-size: 12px; color: #24deff">采收率(%)</span></el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row>
                    <el-col
                      ><span style="font-size: 30px; color: #24deff">{{
                        sqreservoirsAvailable | toFixedFour
                      }}</span></el-col
                    >
                    <el-col><span style="font-size: 12px; color: #24deff">可采储量(10⁴m³)</span></el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="10" style="height: 100%">
              <el-row style="height: 100%">
                <pagePanel headerTitle="驱替类型" style="height: 350px; margin-top: 0" show-btn>
                  <div class="z-radioBox">
                    <el-radio v-model="radioType" label="A" @change="sqtzChart">甲型---lgWp=a+bNp</el-radio>
                    <el-radio v-model="radioType" label="B" @change="sqtzChart">乙型---lgLp=a+bNp</el-radio>
                    <el-radio v-model="radioType" label="C" @change="sqtzChart">丙型---Lp/Np=a+bLp</el-radio>
                    <el-radio v-model="radioType" label="D" @change="sqtzChart">丁型---Lp/Np=a+bWp</el-radio>
                    <div class="remark">注：Np累产油. Wp累产水. Lp累产液. NR.可动用油储量. q水驱特征参数</div>
                  </div>
                </pagePanel>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div
          v-if="activeName == 'decreasing'"
          style="height: calc(100% - 250px); overflow-y: scroll; overflow-x: hidden"
        >
          <el-row style="height: 100%; width: 100%" :gutter="20">
            <!---左下-->
            <el-col :span="24" style="height: 100%">
              <div height="100%">
                <el-row>
                  <div style="display: flex; align-items: center">
                    <span>拟合起始时间：</span>
                    <el-date-picker
                      v-model="dateTime1"
                      type="monthrange"
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      value-format="yyyy-MM-dd"
                      @change="djqxChart"
                    ></el-date-picker>
                    <el-radio-group v-model="radio2" style="margin-left: 15px">
                      <el-radio-button label="图表"></el-radio-button>
                      <el-radio-button label="数据"></el-radio-button>
                    </el-radio-group>
                    <span style="margin-left: 20px">外推时间：</span>
                    <el-input-number
                      v-model="num1"
                      :min="0"
                      :max="10"
                      label="描述文字"
                      @change="djqxChart"
                      style="margin-right: 6px"
                    ></el-input-number>
                    <span>月</span>
                  </div>
                </el-row>
                <el-row style="margin: 20px 0">
                  <el-radio-group v-model="radio3" @change="djqxChart()">
                    <el-radio :label="1">指数递减</el-radio>
                    <el-radio :label="2">调和递减</el-radio>
                    <el-radio :label="3">双曲线递减</el-radio>
                  </el-radio-group>
                </el-row>
                <el-row v-if="radio2 == '图表'">
                  <pagePanel headerTitle="递减曲线法" style="height: 350px; margin-top: 0" show-btn>
                    <Echart :chart-data="optionTwo" height="100%"></Echart>
                  </pagePanel>
                </el-row>
                <el-row v-if="radio2 == '数据'">
                  <div style="height: 300px">
                    <pagePanel headerTitle="递减曲线法" style="height: 350px; margin-top: 0" show-btn>
                      <div style="display: flex; justify-content: flex-end">
                        <el-button
                          icon="el-icon-download"
                          type="primary"
                          style="margin-bottom: 20px"
                          @click="doDownExcel('#table2', '递减曲线法')"
                          >下载</el-button
                        >
                      </div>
                      <el-table
                        id="table2"
                        highlight
                        :data="djtableDate"
                        height="calc(100% - 55px)"
                        class="doubleHeader"
                      >
                        <el-table-column align="center" type="index" label="序号"></el-table-column>
                        <el-table-column
                          align="center"
                          prop="theDate"
                          show-overflow-tooltip
                          label-class-name="twoRowHeader"
                        >
                          <template slot="header">
                            <div>
                              <span>日期</span>
                              <br />
                              <span>(yyyy/mm/dd)</span>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column align="center" prop="x" label="x" :formatter="toPrecise4"></el-table-column>
                        <el-table-column
                          align="center"
                          prop="y"
                          label-class-name="twoRowHeader"
                          :formatter="toPrecise4"
                        >
                          <template slot="header">
                            <div>
                              <span>y</span>
                              <br />
                              <span>(10⁴m³)</span>
                            </div>
                          </template>
                        </el-table-column>
                      </el-table>
                    </pagePanel>
                  </div>
                </el-row>

                <div
                  class="pageHeader"
                  style="
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 20px;
                    margin-bottom: 20px;
                    margin-left: 0;
                  "
                >
                  <span>计算结果</span>
                </div>
                <el-row style="height: 60px; text-align: center; margin-top: 20px">
                  <el-col :span="12">
                    <el-row>
                      <el-col
                        ><span style="font-size: 30px; color: #24deff">{{ djproOutputRate | toFixedTwo }}</span></el-col
                      >
                      <el-col><span style="font-size: 12px; color: #24deff">采收率(%)</span></el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12">
                    <el-row>
                      <el-col
                        ><span style="font-size: 30px; color: #24deff">{{
                          djreservoirsAvailable | toFixedFour
                        }}</span></el-col
                      >
                      <el-col><span style="font-size: 12px; color: #24deff">可采储量(10⁴m³)</span></el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <!---右下-->
            <!--<el-col :span="12" style="height:100%">
                              <el-row style="height:20%;">
                                <NormalCard title="数据类型" height="100%">
                                  &lt;!&ndash;<el-radio style="margin-left:10px;margin-top:10px" v-model="radioMonth1" :label="1"
                                            @change="djqxChart()">&ndash;&gt;<span class="fontSpan">月度</span>&lt;!&ndash;</el-radio>&ndash;&gt;
                                </NormalCard>
                              </el-row>
                              <el-row style="height:25%;margin-top:20px">
                                <NormalCard title="预测时间" height="100%">
                                  &lt;!&ndash;<el-radio style="margin-left:10px;margin-top:20px" v-model="radioDate1" :label="1"
                                            @change="djqxChart()">&ndash;&gt;
                                  <span class="fontSpan">外推时间：</span>
                                  &lt;!&ndash;</el-radio>&ndash;&gt;
                                  <el-input-number
                                      v-model="num1"
                                      :min="0"
                                      :max="10"
                                      label="描述文字"
                                      @change="djqxChart()"
                                  ></el-input-number>
                                </NormalCard>
                              </el-row>
                            </el-col>-->
          </el-row>
        </div>
        <div
          v-if="activeName == 'plateMethod'"
          style="height: calc(100% - 250px); overflow-y: scroll; overflow-x: hidden"
        >
          <el-row style="height: 100%; width: 100%" :gutter="20">
            <!---左下-->
            <el-col :span="24" style="height: 100%">
              <div height="100%">
                <el-row style="margin-bottom: 20px">
                  <div style="display: flex; align-items: center">
                    <span>拟合起始时间：</span>
                    <el-date-picker
                      v-model="dateTime2"
                      type="monthrange"
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      value-format="yyyy-MM-dd"
                      @change="tstbChart"
                    ></el-date-picker>
                    <el-radio-group v-model="radio4" style="margin-left: 15px">
                      <el-radio-button label="图表"></el-radio-button>
                      <el-radio-button label="数据"></el-radio-button>
                    </el-radio-group>
                  </div>
                </el-row>
                <el-row v-if="radio4 == '图表'">
                  <pagePanel headerTitle="童氏图版法" style="height: 350px; margin-top: 0" show-btn>
                    <Echart :chart-data="optionThree" height="100%"></Echart>
                  </pagePanel>
                </el-row>
                <el-row v-if="radio4 == '数据'">
                  <div style="height: 350px">
                    <pagePanel headerTitle="童氏图版法" style="height: 350px; margin-top: 0" show-btn>
                      <div style="display: flex; justify-content: flex-end">
                        <el-button
                          icon="el-icon-download"
                          type="primary"
                          style="margin-bottom: 20px"
                          @click="doDownExcel('#table3', '童氏图版法')"
                          >下载</el-button
                        >
                      </div>
                      <el-table
                        id="table3"
                        highlight
                        :data="tstableDate"
                        height="calc(100% - 55px)"
                        class="doubleHeader"
                      >
                        <el-table-column align="center" type="index" label="序号"></el-table-column>
                        <el-table-column
                          align="center"
                          prop="theDate"
                          show-overflow-tooltip
                          label-class-name="twoRowHeader"
                        >
                          <template slot="header">
                            <div>
                              <span>日期</span>
                              <br />
                              <span>(yyyy/mm/dd)</span>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column
                          align="center"
                          prop="x"
                          :formatter="toPrecise4"
                          label-class-name="twoRowHeader"
                        >
                          <template slot="header">
                            <div>
                              <span>x</span>
                              <br />
                              <span>(%)</span>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column
                          align="center"
                          prop="y"
                          :formatter="toPrecise4"
                          label-class-name="twoRowHeader"
                        >
                          <template slot="header">
                            <div>
                              <span>y</span>
                              <br />
                              <span>(%)</span>
                            </div>
                          </template>
                        </el-table-column>
                      </el-table>
                    </pagePanel>
                  </div>
                </el-row>
                <div
                  class="pageHeader"
                  style="
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 20px;
                    margin-bottom: 20px;
                    margin-left: 0;
                  "
                >
                  <span>计算结果</span>
                </div>
                <el-row style="height: 60px; text-align: center; margin-top: 20px">
                  <el-col :span="12">
                    <el-row>
                      <el-col
                        ><span style="font-size: 30px; color: #24deff">{{ tsproOutputRate | toFixedTwo }}</span></el-col
                      >
                      <el-col><span style="font-size: 12px; color: #24deff">采收率(%)</span></el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12">
                    <el-row>
                      <el-col
                        ><span style="font-size: 30px; color: #24deff">{{
                          tsreservoirsAvailable | toFixedFour
                        }}</span></el-col
                      >
                      <el-col><span style="font-size: 12px; color: #24deff">可采储量(10⁴m³)</span></el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
        <div
          v-if="activeName == 'empiricalFormula'"
          style="height: calc(100% - 250px); overflow-y: scroll; overflow-x: hidden"
        >
          <el-row style="height: 100%" :gutter="20">
            <!---左下-->
            <el-col :span="12" style="height: 100%">
              <div height="100%">
                <el-row style="height: 90%">
                  <el-col :span="18" style="margin-left: 60px">
                    <table class="border" style="width: 100%">
                      <thead>
                        <tr>
                          <td colspan="2">参数名称</td>
                          <td>参数值</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colspan="2">原油粘度(mPa.s)</td>
                          <td>
                            <el-input v-model="paramater.thickness" type="text" width="50px"></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2">水平渗透率(10²um²)</td>
                          <td>
                            <el-input v-model="paramater.permeability" type="text" width="50px"></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2">孔隙度(%)</td>
                          <td>
                            <el-input v-model="paramater.porosity" type="text" width="50px"></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2">井网密度(口/㎞²)</td>
                          <td>
                            <el-input v-model="paramater.wellDensity" type="text" width="50px"></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2">油层温度(℃)</td>
                          <td>
                            <el-input v-model="paramater.layerTemperature" type="text" width="50px"></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2">油气比(m³/m³)</td>
                          <td>
                            <el-input v-model="paramater.gasOilRatio" type="text" width="50px"></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2">非均质性</td>
                          <td>
                            <el-input v-model="paramater.heterogeneity" type="text" width="50px"></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2">地层束缚水饱和度(%)</td>
                          <td>
                            <el-input v-model="paramater.layerWaterSaturation" type="text" width="50px"></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2">原始原油体积系数</td>
                          <td>
                            <el-input v-model="paramater.oilVolumnFactor" type="text" width="50px"></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2">有效厚度(m)</td>
                          <td>
                            <el-input v-model="paramater.validThickness" type="text" width="50px"></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2">原始地层压力(MPa)</td>
                          <td>
                            <el-input v-model="paramater.originalLayerPressure" type="text" width="50px"></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2">砂岩系数S<sub>k</sub></td>
                          <td>
                            <el-input v-model="paramater.sk" type="text" width="50px"></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2">渗透率变异系数V<sub>k</sub></td>
                          <td>
                            <el-input v-model="paramater.variation" type="text" width="50px"></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2">地层油水粘度比μ<sub>r</sub></td>
                          <td>
                            <el-input v-model="paramater.ur" type="text" width="50px"></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2">过渡带的储量系数</td>
                          <td>
                            <el-input v-model="paramater.z" type="text" width="50px"></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2">废弃压力(MPa)</td>
                          <td>
                            <el-input v-model="paramater.pa" type="text" width="50px"></el-input>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2">井控面积(km²)</td>
                          <td>
                            <el-input v-model="paramater.ssmall" type="text" width="50px"></el-input>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </el-col>
                </el-row>
                <el-row style="height: 10%; margin-top: 20px">
                  <el-col style="margin-left: 140px" :span="6">
                    <el-button type="primary" @click="getExperienceFormulaParameter">参数读取</el-button>
                  </el-col>
                  <el-col :span="6">
                    <el-button type="primary" @click="jygsChart">开始计算</el-button>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <!---右下-->
            <el-col :span="12" style="height: 100%">
              <pagePanelNew style="height: 830px; margin-top: 2px">
                <div style="display: flex; justify-content: flex-end">
                  <el-button
                    icon="el-icon-download"
                    type="primary"
                    style="margin-bottom: 20px"
                    @click="doDownExcel('#table1', '经验公式法数据')"
                    >下载</el-button
                  >
                </div>
                <el-table id="table1" height="calc(100% - 55px)" :data="computingData" highlight class="doubleHeader">
                  <el-table-column align="center" prop="formulaName" label="采收率计算方法"></el-table-column>
                  <el-table-column
                    align="center"
                    prop="recoveryRatio"
                    label-class-name="twoRowHeader"
                    :formatter="toPrecise2"
                  >
                    <template slot="header">
                      <div>
                        <span>采收率</span>
                        <br />
                        <span>(%)</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="recoverableReserves"
                    label-class-name="twoRowHeader"
                    :formatter="toPrecise4"
                  >
                    <template slot="header">
                      <div>
                        <span>可采储量</span>
                        <br />
                        <span>(10⁴t)</span>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </pagePanelNew>
            </el-col>
          </el-row>
        </div>
      </div>
    </page-panel-new>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Echart from "@/components/tools/Echarts/index.vue";
import { fieldOilLayers } from "@/api/oilDeposit/rem-02/primaryinfo.js";
import { QueryOgfDetail, QueryReservoirAnalyseUnit } from "@/api/rem/marster.js";
import {
  oilFieldRecoveryRatio,
  waterDriveChartData,
  declineChartData,
  tongChartData,
  experienceFormulaCalResult,
  experienceFormulaParameter,
} from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
import { exportExcel } from "@/lib/exportExcel.js";
export default {
  name: "recoveryEfficiency",
  computed: {
    ...mapState({
      mode: (state) => state.setting.mode,
    }),
  },
  watch: {
    mode(val) {
      this.option.legend.textStyle.color = val == "dark" ? "#fff" : "#000";
    },
  },
  components: { Echart },
  filters: {
    //保留4位小数
    toFixedFour(val) {
      if (val || val == 0) {
        return parseFloat(val).toFixed(4);
      } else {
        return "-";
      }
    },
    //保留2位小数
    toFixedTwo(val) {
      if (val || val == 0) {
        return parseFloat(val).toFixed(2);
      } else {
        return "-";
      }
    },
  },
  data() {
    return {
      declineTypeCode: "1",
      sqproOutputRate: "",
      sqreservoirsAvailable: "",
      djproOutputRate: "",
      djreservoirsAvailable: "",
      tsproOutputRate: "",
      tsreservoirsAvailable: "",
      radio1: "图表",
      radio2: "图表",
      radio3: 1,
      radio4: "图表",
      selectOilField: "3FC9A818F5BC43B88270DB80BBB3018F",
      oilField: [],
      selectBlock: "3FC9A818F5BC43B88270DB80BBB3018F",
      block: [],
      cx: "",
      blocks: [],

      //单位切换
      unitType: "10⁴m³",
      //拟合起始时间
      dateTime: [],
      dateTime1: [],
      dateTime2: [],
      //区潜类型
      radioType: "A",
      //月度
      radioMonth: "0",
      radioMonth1: 1,
      //预测时间
      radioDate: "0",
      radioDate1: "0",
      //预测时间数值
      num: "",
      num1: 0,

      color: [
        "#1379F7",
        "#FF5844",
        "#FF7135",
        "#00BC9C",
        "#FF0000",
        "#FF30AD",
        "#F5FFA3",
        "#9A72FF",
        "#39008D",
        "#2ACAFF",
        "#72818B",
      ],

      wellPerformanceAnalysis: [],

      sjtableDate: [],
      djtableDate: [],

      paramater: {},
      //水驱特征曲线曲线
      option: {
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "水驱特征曲线法",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
              iconStyle: {
                opacity: 0,
              },
            },
          },
        },
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0],
            start: 0, //滚动条开始位置（共100等份）
            end: 100, //滚动条结束位置
          },
        ],
        grid: {
          x: 120,
          y: 30,
          x2: 120,
          y2: 80,
        },
        legend: {
          data: [],
          textStyle: {
            color: this.$store.state.setting.mode == "dark" ? "#fff" : "#000",
            fontSize: 14,
          },
          x: "center",
          bottom: 10,
          icon: "rect",
          itemWidth: 12,
          itemHeight: 6,
          itemGap: 14,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          boundaryGap: false,
          splitNumber: 10,
          name: "10⁴m³",
          nameGap: 25,
          // nameLocation: "center",
          nameTextStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          type: "value",
          axisLabel: {
            color: "#8FA4CC",
            fontSize: 14,
            padding: [10, 0, 0, 0],
          },
          axisTick: {
            show: false,
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
              color: "#8FA4CC",
            },
          },
        },
        yAxis: {
          name: "lgWp",
          // nameLocation: "center",
          nameLocation: "middle",
          nameGap: 50,
          nameTextStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          type: "value",
          axisLabel: {
            color: "#8FA4CC",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#8FA4CC",
            },
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#8FA4CC",
            },
          },
        },
        series: [
          {
            data: [],
            type: "line",
            smooth: true,
            color: "#387DFF",
            name: "",
            symbol: "none",
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 5,
                  type: "dotted",
                },
              },
            },
          },
          {
            data: [],
            type: "line",
            color: "red",
            smooth: true,
            name: "",
            symbol: "none",
          },
        ],
      },
      //tabs切换值
      activeName: "waterDrive",
      //标签名称
      tabs: [
        {
          label: "水驱特征曲线",
          name: "waterDrive",
        },
        {
          label: "递减曲线法",
          name: "decreasing",
        },
        {
          label: "童氏图版法",
          name: "plateMethod",
        },
        {
          label: "经验公式法",
          name: "empiricalFormula",
        },
      ],
      optionTwo: {
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "递减曲线法",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
              iconStyle: {
                opacity: 0,
              },
            },
          },
        },
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0],
            start: 0, //滚动条开始位置（共100等份）
            end: 100, //滚动条结束位置
          },
        ],
        grid: {
          x: 120,
          y: 30,
          x2: 120,
          y2: 80,
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
            color: "#24DEFF",
            fontSize: 14,
          },
          x: "center",
          bottom: 10,
          icon: "rect",
          itemWidth: 12,
          itemHeight: 6,
          itemGap: 14,
        },
        xAxis: {
          name: "日",
          // name: "时间",
          type: "category",
          nameTextStyle: {
            color: "#8FA4CC",
          },
          nameGap: 25,
          axisLabel: {
            color: "#8FA4CC",
            fontSize: 14,
            padding: [10, 0, 0, 0],
          },
          axisTick: {
            show: false,
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
              color: "#8FA4CC",
            },
          },
        },
        yAxis: {
          // data:[],
          name: "日产油量(10⁴m³)",
          // nameLocation: "center",
          nameLocation: "middle",
          nameTextStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          nameGap: 65,
          type: "value",
          axisLabel: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          axisTick: {
            show: false,
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
              color: "#8FA4CC",
            },
          },
        },
        series: [
          {
            data: [],
            type: "line",
            smooth: true,
            name: "",
            symbol: "none",
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 5,
                  type: "dotted",
                },
              },
            },
          },
          {
            data: [],
            type: "line",
            symbol: "none",
            symbolSize: 10,
            name: "",
            itemStyle: {
              color: "#00FFD4	",
            },
          },
        ],
      },
      optionThree: {
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: "童氏图版法",
              pixelRatio: 15, //值越大分辨率越高,下载的图片越清晰
              backgroundColor: "#022644",
              iconStyle: {
                opacity: 0,
              },
            },
          },
        },
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0],
            start: 0, //滚动条开始位置（共100等份）
            end: 100, //滚动条结束位置
          },
        ],
        color: [],
        grid: {
          x: 120,
          y: 30,
          x2: 120,
          y2: 80,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          confine: true,
        },
        legend: {
          data: [],
          textStyle: {
            color: "#24DEFF",
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
          name: "采出程度(%)",
          nameTextStyle: {
            color: "#8FA4CC",
          },
          nameGap: 45,
          type: "value",
          axisLabel: {
            color: "#8FA4CC",
            fontSize: 14,
            padding: [10, 0, 0, 0],
          },
          axisTick: {
            show: false,
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
              color: "#8FA4CC",
            },
          },
        },
        yAxis: {
          name: "综合含水率(%)",
          // nameLocation: "center",
          nameLocation: "middle",
          nameTextStyle: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          nameGap: 45,
          type: "value",
          axisLabel: {
            color: "#8FA4CC",
            fontSize: 14,
          },
          axisTick: {
            show: false,
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
              color: "#8FA4CC",
            },
          },
        },
        series: [
          {
            data: [],
            name: "",
            type: "scatter",
            symbol: "circle",
            symbolSize: 8,
          },
          {
            data: [],
            name: "",
            type: "line",
            smooth: true,
            symbol: "none",
          },
          {
            data: [],
            name: "",
            type: "line",
            smooth: true,
            symbol: "none",
          },
          {
            data: [],
            name: "",
            type: "line",
            smooth: true,
            symbol: "none",
          },
          {
            data: [],
            name: "",
            type: "line",
            smooth: true,
            symbol: "none",
          },
          {
            data: [],
            name: "",
            type: "line",
            smooth: true,
            symbol: "none",
          },
          {
            data: [],
            name: "",
            type: "line",
            smooth: true,
            symbol: "none",
          },
          {
            data: [],
            name: "",
            type: "line",
            smooth: true,
            symbol: "none",
          },
          {
            data: [],
            name: "",
            type: "line",
            smooth: true,
            symbol: "none",
          },
          {
            data: [],
            name: "",
            type: "line",
            smooth: true,
            symbol: "none",
          },
          {
            data: [],
            name: "",
            type: "line",
            smooth: true,
            symbol: "none",
          },
          {
            data: [],
            name: "",
            type: "line",
            smooth: true,
            symbol: "none",
          },
          {
            data: [],
            name: "",
            type: "line",
            smooth: true,
            symbol: "none",
          },
          {
            data: [],
            name: "",
            type: "line",
            smooth: true,
            symbol: "none",
          },
          {
            data: [],
            name: "",
            type: "line",
            smooth: true,
            symbol: "none",
          },
          {
            data: [],
            name: "",
            type: "line",
            smooth: true,
            symbol: "none",
          },
        ],
      },
      //经验公式表格名称顺序
      formula: [
        "俞启泰公式",
        "陈元千公式（1996）",
        "水驱砂岩油藏相应井网密度",
        "美国Guthrie和Greenberger",
        "万吉业公式",
        "API公式",
        "Кожакин公式",
        "俄罗斯Гомзиков公式 ",
        "陈元千公式（1990）",
        "井网密度",
        "可采储量经验公式",
        "辽河油田水驱砂岩",
      ],
      //计算方法数据
      computingData: [],
      //层位列表
      position: [],
    };
  },
  created() {
    this.initDate();
  },
  mounted() {
    this.getOilFields();
    this.getFieldsData("3FC9A818F5BC43B88270DB80BBB3018F");
    this.getFieldOilLayers();
    this.Retrieval();
  },
  methods: {
    //重置
    resetting() {
      this.$nextTick(() => {
        this.initDate();
        this.getOilFields();
        this.getFieldsData("3FC9A818F5BC43B88270DB80BBB3018F");
        this.getFieldOilLayers();
        this.paramater = {};
        this.Retrieval();
      });
    },
    // 返回
    switchToBack() {
      this.$router.push(this.$route.query.page || this.$route.query.name);
    },
    //切换tabs
    handleClick() {
      console.log(this.activeName);
    },
    //初始化日期
    initDate() {
      //初始化时间,选择tabs值
      let today = new Date();
      let date = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
      };
      var mon = "";
      if (date.month < 10) {
        mon = date.year + "-0" + date.month;
      } else {
        mon = date.year + "-" + date.month;
      }
      let today1 = new Date().addDays(-30);
      let date1 = {
        year: today1.getFullYear(),
        month: today1.getMonth() + 1,
      };
      var mon1 = "";
      if (date1.month < 10) {
        mon1 = date1.year + "-0" + date1.month;
      } else {
        mon1 = date1.year + "-" + date1.month;
      }
      this.dateTime = [mon1, mon];
      this.dateTime1 = [mon1, mon];
      this.dateTime2 = [mon1, mon];
      this.dateTime = [new Date().addDays(-365).format("yyyy-MM-dd"), new Date().format("yyyy-MM-dd")];
      this.dateTime1 = [new Date().addDays(-365).format("yyyy-MM-dd"), new Date().format("yyyy-MM-dd")];
      this.dateTime2 = [new Date().addDays(-365).format("yyyy-MM-dd"), new Date().format("yyyy-MM-dd")];
    },
    //获取油田信息
    getOilFields() {
      QueryOgfDetail({}).then((res) => {
        //获取油田信息
        this.oilField = res.data.data;
      });
    },
    //获得区块信息
    getFieldsData(oilFieldId) {
      let _this = this;
      QueryReservoirAnalyseUnit({ ogfId: oilFieldId }).then((res) => {
        //获得区块信息
        _this.block = res.data.data;
        _this.block.unshift({
          reservoirAnalyseUnitId: oilFieldId,
          reservoirAnalyseUnitName: "全部",
          reservoirAnalyseUnitNo: "全部",
        });
        //默认选中第一个区块信息
        _this.selectBlock = oilFieldId;
      });
    },
    //获得层位信息
    getFieldOilLayers() {
      let request = {
        oilFieldId: this.selectOilField,
        fieldId: this.selectBlock,
        wellId: "",
      };
      fieldOilLayers(request).then((res) => {
        if (res.data.code == 200) {
          //层段数据
          if (res.data.data) {
            this.position = res.data.data.fieldLayers;
          } else {
            this.position = [];
          }
        }
      });
    },
    //搜索
    Retrieval() {
      this.oilFieldRecoveryRatioApi();
      this.sqtzChart();
      this.djqxChart();
      this.tstbChart();
      this.jygsChart();
    },
    //单位切换-获取表格数据
    oilFieldRecoveryRatioApi() {
      let request = {
        fieldId: this.selectBlock,
        oilFieldId: this.selectOilField,
        unitType: this.unitType,
      };
      this.wellPerformanceAnalysis = [];
      oilFieldRecoveryRatio(request).then((res) => {
        let data = res.data.data.recoveryRatioInfos;
        this.wellPerformanceAnalysis = data;
      });
    },
    //水驱特征曲线
    sqtzChart() {
      let predictDays = "0";
      let request = {
        beginDate: this.dateTime.length >= 2 ? this.dateTime[0] : "",
        endDate: this.dateTime.length >= 2 ? this.dateTime[1] : "",
        fieldId: this.selectBlock,
        oilFieldId: this.selectOilField,
        timeGranularityTypeCode: this.radioMonth,
        predictDays: predictDays,
        waterDriveCode: this.radioType,
      };
      waterDriveChartData(request).then((res) => {
        if (res.data.code == 200) {
          let data = res.data.data.chart;
          let sjdata = res.data.data.statChartDatas;
          this.sqproOutputRate = res.data.data.proOutputRate;
          this.sqreservoirsAvailable = res.data.data.reservoirsAvailable;
          this.sjtableDate = sjdata;
          this.option.legend.data = [data.bubbleDataSets[0].label, data.lineChartDataSets[0].label];
          this.option.series[0].name = data.bubbleDataSets[0].label;
          let list = data.bubbleDataSets[0].bubblePoints;
          // let length = data.bubbleDataSets[0].bubblePoints.length;
          let seriesData = [];
          list.forEach((ent, index) => {
            let dd = [ent.x, ent.y];
            seriesData.push(dd);
          });
          this.option.series[0].data = seriesData;

          this.option.series[1].name = data.lineChartDataSets[0].label;
          let list1 = data.lineChartDataSets[0].numberPoints;
          //let length1 = data.lineChartDataSets[0].numberPoints.length;
          let seriesData1 = [];
          list1.forEach((ent, index) => {
            let dd = [ent.x, ent.y];
            seriesData1.push(dd);
          });
          // this.option.xAxis.name = (this.radioType == 'A' ? 'Np' : this.radioType == 'B' ? 'Np' : this.radioType == 'C' ? 'Lp' : this.radioType == 'D' ? 'Wp' : this.radioType == 'YUQITAI' ? 'lg(Lp/Wp)' : 'x');
          this.option.yAxis.name =
            this.radioType == "A"
              ? "lgWp"
              : this.radioType == "B"
              ? "lgLp"
              : this.radioType == "C"
              ? "Lp/Np"
              : this.radioType == "D"
              ? "Lp/Np"
              : this.radioType == "YUQITAI"
              ? "logNp"
              : "y";
          this.option.series[1].data = seriesData1;
        } else {
          this.option.legend.data = [];
          this.option.series[0].data = [];
          this.option.series[1].name = [];
          this.option.series[1].data = [];
        }
      });
    },
    //递减曲线法
    djqxChart() {
      let predictDays = "0";
      predictDays = this.num1;
      let request = {
        beginDate: this.dateTime1.length >= 2 ? this.dateTime1[0] : "",
        endDate: this.dateTime1.length >= 2 ? this.dateTime1[1] : "",
        declineTypeCode: this.radio3,
        fieldId: this.selectBlock,
        oilFieldId: this.selectOilField,
        predictDays: predictDays,
        timeGranularityTypeCode: this.radioMonth,
      };
      declineChartData(request).then((res) => {
        let data = res.data.data.chart;
        this.optionTwo.legend.data = [data.linearDataSets[0].label, data.linearDataSets[1].label];
        this.optionTwo.series[0].name = data.linearDataSets[0].label;

        let charlen = data.linearDataSets.length;
        for (var i = 0; i < charlen; i++) {
          this.optionTwo.series[i].name = data.linearDataSets[i].label;
          let list = data.linearDataSets[i].linearData;
          let length = data.linearDataSets[i].linearData.length;
          let seriesData = [];
          list.forEach((ent, index) => {
            if (index < length) {
              let dd = [list[index].label, list[index].value];
              seriesData.push(dd);
            }
          });
          this.optionTwo.series[i].data = seriesData;
        }

        let djdata = res.data.data.statChartDatas;
        this.djproOutputRate = res.data.data.proOutputRate;
        this.djreservoirsAvailable = res.data.data.reservoirsAvailable;
        this.djtableDate = djdata;
      });
    },
    //童氏图版法
    tstbChart() {
      let request = {
        beginDate: this.dateTime2.length >= 2 ? this.dateTime2[0] : "",
        endDate: this.dateTime2.length >= 2 ? this.dateTime2[1] : "",
        fieldId: this.selectBlock,
        oilFieldId: this.selectOilField,
      };

      tongChartData(request).then((res) => {
        if (res.data.code == 200) {
          let data = res.data.data.chart;
          let tsdata = res.data.data.statChartDatas;
          this.tstableDate = tsdata;
          this.tsproOutputRate = res.data.data.proOutputRate;
          this.tsreservoirsAvailable = res.data.data.reservoirsAvailable;

          //        let colorlen = data.lineChartDataSets.length;
          //        let colotlist = data.lineChartDataSets;

          this.optionThree.legend.data = [
            data.bubbleDataSets[0].label,
            data.lineChartDataSets[0].label,
            data.lineChartDataSets[1].label,
            data.lineChartDataSets[2].label,
            data.lineChartDataSets[3].label,
            data.lineChartDataSets[4].label,
            data.lineChartDataSets[5].label,
            data.lineChartDataSets[6].label,
            data.lineChartDataSets[7].label,
            data.lineChartDataSets[8].label,
            data.lineChartDataSets[9].label,
            data.lineChartDataSets[10].label,
            data.lineChartDataSets[11].label,
            data.lineChartDataSets[12].label,
            data.lineChartDataSets[13].label,
          ];
          this.optionThree.series[0].name = data.bubbleDataSets[0].label;
          let charlen = data.lineChartDataSets.length;
          console.log(charlen);
          for (var j = 0; j < charlen; j++) {
            this.optionThree.series[j + 1].name = data.lineChartDataSets[j].label;
          }

          let list = data.bubbleDataSets[0].bubblePoints;
          let length = data.bubbleDataSets[0].bubblePoints.length;
          let seriesData = [];
          list.forEach((ent, index) => {
            if (index < length) {
              let dd = [list[index].x, list[index].y];
              seriesData.push(dd);
            }
          });
          this.optionThree.series[0].data = seriesData;

          for (var x = 0; x < charlen; x++) {
            let list1 = data.lineChartDataSets[x].numberPoints;
            let length1 = data.lineChartDataSets[x].numberPoints.length;
            let seriesData1 = [];
            list1.forEach((ent, index) => {
              if (index < length1) {
                let dd = [list1[index].x, list1[index].y];
                seriesData1.push(dd);
              }
            });
            this.optionThree.series[x + 1].data = seriesData1;
          }
        } else {
          this.optionThree.legend.data = [];
          let serieslist = this.optionThree.series;
          serieslist.forEach((item, index) => {
            item.name = "";
            item.data = [];
          });
        }
      });
    },
    //经验公式法
    jygsChart() {
      /*this.paramater.k=1.1;
                this.paramater.kplus=1.1;*/
      let request = {
        beginDate: this.dateTime2.length >= 2 ? this.dateTime2[0] : "",
        endDate: this.dateTime2.length >= 2 ? this.dateTime2[1] : "",
        experienceFormulaParameter: this.paramater,
        fieldId: this.selectBlock,
        oilFieldId: this.selectOilField,
      };
      // console.log(request);
      experienceFormulaCalResult(request)
        .then((res) => {
          if (res.data.code == 200) {
            let data = res.data.data.experienceFormulaCalResults;
            // console.log(data);
            this.computingData = [];
            this.formula.forEach((point, index) => {
              let zb = data.find((item) => {
                return item.formulaName == point;
              });
              if (zb) {
                this.computingData.push(zb);
              } else {
                this.computingData.push({
                  formulaName: point,
                });
              }
            });
          } else {
            this.computingData = this.formula.map((item) => {
              return {
                formulaName: item,
              };
            });
          }
        })
        .catch((error) => {
          this.computingData = this.formula.map((item) => {
            return {
              formulaName: item,
            };
          });
        });
    },
    //获得经验参数
    getExperienceFormulaParameter() {
      let request = {
        oilFieldId: this.selectOilField,
        fieldId: this.selectBlock,
        fieldLayerId: this.fieldLayerId,
      };
      experienceFormulaParameter(request).then((res) => {
        if (res.data.code == 200) {
          this.paramater = res.data.data.experienceFormulaParameter;
        }
      });
    },
    //改变油田信息
    changeOilfield(val) {
      this.selectBlock = "";
      this.block = [];
      this.cx = "";
      this.position = [];
      this.getFieldsData(val);
    },
    //改变区块信息
    changeBlock(val) {
      this.cx = "";
      this.position = [];
      this.getFieldOilLayers();
    },
    // 表格格式化方法 - 数值只保留四位小数
    toPrecise4(row, column) {
      if (
        (row[column.property] || parseFloat(row[column.property]) === 0) &&
        typeof parseFloat(row[column.property]) === "number"
      ) {
        return parseFloat(row[column.property]) || parseFloat(row[column.property]) === 0
          ? parseFloat(row[column.property]).toFixed(4)
          : "0";
      } else {
        return row[column.property] ? row[column.property] : "-";
      }
    },
    // 表格格式化方法 - 数值只保留两位位小数
    toPrecise2(row, column) {
      if (
        (row[column.property] || parseFloat(row[column.property]) === 0) &&
        typeof parseFloat(row[column.property]) === "number"
      ) {
        return parseFloat(row[column.property]) || parseFloat(row[column.property]) === 0
          ? parseFloat(row[column.property]).toFixed(2)
          : "0";
      } else {
        return row[column.property] ? row[column.property] : "-";
      }
    },
    //下载导出文件 tableId tableName
    doDownExcel(tableId, tableName) {
      exportExcel(tableId, tableName);
    },
  },
};
</script>

<style lang="scss" scoped>
.z-radioBox {
  padding-top: 20px;
  padding-left: 20px;
  .el-radio {
    margin-bottom: 20px;
  }
  .remark {
    color: #cd3d00;
  }
}
::v-deep .el-table .cell:empty::before {
  content: "-";
}
</style>
