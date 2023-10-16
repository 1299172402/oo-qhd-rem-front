<!-- 规范计划管理-措施管理界面 -->
<template>
  <!-- <div class="app-container"> -->
  <div style="display: flex; flex-direction: row; height: calc(100%)">
    <div style="height: 100%">
      <treeSelectionAll
        ref="treeSelectionAll"
        level="5"
        :defaultCheckedKeys="defaultCheckedKeys"
        @getSelectItems="getSelectItems"
      />
    </div>
    <div
      class="app-container"
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
      <headerSearch
        class="g-w100 g-h100"
        style="height: auto; padding-top: 18px; padding-bottom: 8px; margin-bottom: 20px"
      >
        <div style="display: flex; align-items: center; flex-wrap: wrap">
          <div style="margin-right: 15px; margin-bottom: 10px">
            <span>油田：</span>
            <el-select v-model="selectOilField" @change="onFieldChange" style="width: 165px">
              <el-option
                v-for="(item, index) in oilFields"
                :key="item.ogfId"
                :label="item.ogfName"
                :value="item.ogfId"
              ></el-option>
            </el-select>
          </div>
          <div style="margin-right: 15px; margin-bottom: 10px">
            <span>平台：</span>
            <el-select v-model="selectPlatform" @change="onPlatfromChange" style="width: 220px">
              <el-option
                v-for="(item, index) in platforms"
                :key="item.platformId"
                :label="item.platformCode"
                :value="item.platformId"
              ></el-option>
            </el-select>
          </div>
          <div style="margin-right: 15px; margin-bottom: 10px">
            <span>井号：</span>
            <el-select v-model="wellId" filterable @change="changeWell" style="width: 170px">
              <el-option
                v-for="(item, index) in wells"
                :key="item.wellId"
                :label="item.wellName"
                :value="item.wellId"
              ></el-option>
            </el-select>
          </div>
          <div style="margin-right: 15px; margin-bottom: 10px">
            <span>措施属性：</span>
            <el-select v-model="stimClassCode" filterable style="width: 170px" @change="getMeasureNameAndCode">
              <el-option
                v-for="(item, index) in stimClassCodeSelect"
                :key="index"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </div>
          <div style="margin-right: 15px; margin-bottom: 10px">
            <span>措施类型：</span>
            <el-select v-model="measureId" style="width: 170px">
              <el-option
                v-for="(item, index) in measuresTypes"
                :key="index"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </div>
          <div style="margin-right: 15px; margin-bottom: 10px">
            <span>计划/预测版本：</span>
            <el-select filterable v-model="measureVersion" style="width: 170px">
              <el-option
                v-for="(item, index) in measureVersionSelect"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div style="margin-right: 15px; margin-bottom: 10px">
            <span>年度:</span>
            <el-date-picker
              v-model="dateTime"
              style="width: 160px; margin-left: 10px"
              type="year"
              placeholder="选择年"
              value-format="yyyy"
              :clearable="false"
            ></el-date-picker>
          </div>
          <div style="margin-right: 15px; margin-bottom: 10px">
            <span>开始日期：</span>
            <el-select v-model="beginMonth" style="width: 100px" placeholder="选择开始月">
              <el-option
                v-for="(item, index) in 12"
                :key="index"
                :label="index + 1 + '月'"
                :value="index + 1"
              ></el-option>
            </el-select>
          </div>
          <div style="margin-right: 15px; margin-bottom: 10px">
            <span>结束日期：</span>
            <el-select v-model="endMonth" style="width: 100px" placeholder="选择结束月">
              <el-option
                v-for="(item, index) in 12"
                :key="index"
                :label="index + 1 + '月'"
                :value="index + 1"
              ></el-option>
            </el-select>
          </div>
          <div style="margin-right: 15px; margin-bottom: 10px">
            <el-button type="primary" icon="el-icon-search" @click="getFetchMeasureInfos">搜索</el-button>
          </div>
          <div style="margin-right: 15px; margin-bottom: 10px">
            <el-button class="commonBtn" icon="el-icon-refresh" @click="resetting">重置</el-button>
          </div>
        </div>
      </headerSearch>
      <div class="z-container">
        <pagePanelNew headerTitle="措施管理" style="height: 100%; margin-top: 0">
          <div
            class="pageHeader"
            style="
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 10px;
              margin-left: 0;
            "
          >
            <span>{{selectOilFieldName}}作业计划跟踪</span>
            <el-button type="primary" icon="el-icon-download" style="height: 30px" @click="doExportFile"
              >下载</el-button
            >
          </div>
          <div class="tableBox" id="tableBox" style="height: calc(100% - 75px)">
            <el-table
              id="csgl"
              :data="
                tableData.slice((queryParams.page - 1) * queryParams.pageSize, queryParams.page * queryParams.pageSize)
              "
              height="calc(100% - 44px)"
              :row-style="{ height: '0px' }"
              :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
              header-cell-class-name="table_header"
              :cell-style="{ padding: '2px', 'text-align': 'center' }"
              style="width: 100%; overflow-x: hidden"
            >
              <el-table-column prop="wellNo" label="井号" width="140" sortable></el-table-column>
              <el-table-column prop="measureName" label="作业类型" width="80"></el-table-column>
              <el-table-column prop="measureName3" :label="`措施作业天数\n(计划/实际)\n(d)`" width="110">
                <template slot-scope="scope">
                  <span v-if="scope.row.planMeasuresDayNum || scope.row.realityMeasuresDayNum">
                    {{ scope.row.planMeasuresDayNum ? scope.row.planMeasuresDayNum : 0 }}/{{
                      scope.row.realityMeasuresDayNum
                    }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="status" :label="`措施是否\n达标`" width="80"></el-table-column>
              <el-table-column label="类别" width="100">
                <template slot-scope="scope">
                  <div style="line-height: 18px" v-if="measureVersion == '002003'">分公司考核 <br />实际</div>
                  <div style="line-height: 18px" v-else-if="measureVersion == '001'">分公司奋斗 <br />实际</div>
                  <div style="line-height: 18px" v-else-if="measureVersion == '002'">有限考核 <br />实际</div>
                  <div style="line-height: 18px" v-else-if="measureVersion == '004002'">有限奋斗 <br />实际</div>
                  <div style="line-height: 18px" v-else>滚动预测<br />实际</div>
                </template>
              </el-table-column>
              <el-table-column :width="width + 'px'">
                <template slot="header" slot-scope="scope">
                  <div class="header-titlts">
                    <div class="icon0">
                      <b class="b0"></b>
                      <span>实际</span>
                    </div>
                    <div class="icon0">
                      <b class="b1"></b>
                      <span>{{
                        measureVersion == "002003" ||
                        measureVersion == "001" ||
                        measureVersion == "002" ||
                        measureVersion == "004002"
                          ? "计划"
                          : "滚动预测"
                      }}</span>
                    </div>
                    <div class="icon0">
                      <b class="b2"></b>
                      <span>未开始计划</span>
                    </div>
                    <div class="icon1">
                      <img src="@/assets/rem/plan/i0.png" alt="" />
                      <span>增产性措施</span>
                    </div>
                    <div class="icon1">
                      <img src="@/assets/rem/plan/i1.png" alt="" />
                      <span>增注性措施</span>
                    </div>
                    <div class="icon1" style="margin-right: 0">
                      <img src="@/assets/rem/plan/i2.png" alt="" />
                      <span>维护性措施</span>
                    </div>
                  </div>
                </template>
                <template slot-scope="scope">
                  <div
                    class="vv"
                    v-if="scope.row.type != 'date'"
                    :style="{ marginLeft: scope.row.mgleftwidth }"
                    :class="{
                      vvColor:
                        !scope.row.realityMeasuresEndTime &&
                        scope.row.planMeasuresStartTime &&
                        moment().isBefore(moment(scope.row.planMeasuresStartTime)),
                    }"
                    @click="
                      switchToMeasures(
                        scope.row.ogfId,
                        scope.row.prodPlatformId,
                        scope.row.wellId,
                        scope.row.measuresTypeCode,
                        scope.row.yearMonthDay,
                        scope.row.wellTypeCode,
                        scope.row.wellNameNano,
                        scope.row.wellBoreName,
                        scope.$index,
                        scope.row.planMeasuresStartTime,
                        scope.row.planMeasuresEndTime,
                        scope.row.realityMeasuresEndTime,
                      )
                    "
                  >
                    <div class="vv-left">
                      <img
                        :src="
                          !scope.row.realityMeasuresEndTime &&
                          scope.row.planMeasuresStartTime &&
                          moment().isBefore(moment(scope.row.planMeasuresStartTime))
                            ? require('@/assets/rem/plan/i3.png')
                            : require('@/assets/rem/plan/i0.png')
                        "
                        alt=""
                        v-if="scope.row.stimClassCode == '003'"
                        :title="`${scope.row.wellNo}\n${scope.row.measureName}(${scope.row.realityMeasuresDayNum}天)\n${
                          scope.row.realityMeasuresEndTime || '-'
                        } 增产性措施`"
                      />
                      <img
                        :src="
                          !scope.row.realityMeasuresEndTime &&
                          scope.row.planMeasuresStartTime &&
                          moment().isBefore(moment(scope.row.planMeasuresStartTime))
                            ? require('@/assets/rem/plan/i4.png')
                            : require('@/assets/rem/plan/i1.png')
                        "
                        alt=""
                        v-else-if="scope.row.stimClassCode == '004'"
                        :title="`${scope.row.wellNo}\n${scope.row.measureName}(${scope.row.realityMeasuresDayNum}天)\n${
                          scope.row.realityMeasuresEndTime || '-'
                        } 增注性措施`"
                      />
                      <img
                        :src="
                          !scope.row.realityMeasuresEndTime &&
                          scope.row.planMeasuresStartTime &&
                          moment().isBefore(moment(scope.row.planMeasuresStartTime))
                            ? require('@/assets/rem/plan/i5.png')
                            : require('@/assets/rem/plan/i2.png')
                        "
                        alt=""
                        v-else
                        :title="`${scope.row.wellNo}\n${scope.row.measureName}(${scope.row.realityMeasuresDayNum}天)\n${
                          scope.row.realityMeasuresEndTime || '-'
                        } 维护性措施`"
                      />
                    </div>
                    <div class="vv-right">
                      <!-- 计划 -->
                      <div class="vv-line">
                        <div
                          class="line"
                          :style="{ width: scope.row.jhwidth }"
                          v-if="Number(scope.row.planMeasuresDayNum)"
                        >
                          <el-progress class="progress2" type="line" :percentage="100" :show-text="false"></el-progress>
                        </div>
                        <div class="day" v-if="Number(scope.row.planMeasuresDayNum)">
                          {{ scope.row.planMeasuresDayNum }}天
                        </div>
                      </div>
                      <!-- 实际 -->
                      <div class="vv-line">
                        <div
                          class="line"
                          :style="{ width: scope.row.sjwidth }"
                          v-if="Number(scope.row.realityMeasuresDayNum)"
                        >
                          <el-progress class="progress1" type="line" :percentage="100" :show-text="false"></el-progress>
                        </div>
                        <div class="day" v-if="Number(scope.row.realityMeasuresDayNum)">
                          {{ scope.row.realityMeasuresDayNum }}天
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="z-date-box">
              <div class="z-date">
                <div class="day" :style="{ marginRight: spacing + 'px' }" v-for="(item, index) in days" :key="index">
                  {{ item }}
                </div>
              </div>
            </div>
            <div
              class="mcBox"
              :style="{ width: mcWidth, height: 'calc(100% - 110px)', left: mcMgLeft }"
              v-if="isShowMC"
            ></div>
          </div>
          <pagination
            v-if="pageTotal"
            :pageSizes="[15, 20, 40, 100]"
            :total="pageTotal"
            :page.sync="queryParams.page"
            :limit.sync="queryParams.pageSize"
            @pagination="pagination"
          />
        </pagePanelNew>
      </div>
      <!-- 现场作业进度表-弹框 -->
      <fieldOperations :dialogVisible="fieldOperationsShow" @close="fieldOperationsShow = false"></fieldOperations>
    </div>
  </div>
</template>

<script>
import fieldOperations from "./popups/fieldOperations.vue";
import moment from "dayjs";
import { QueryOgfDetail, QueryPlatformDetail, QueryWellDetail, userListByUserNames } from "@/api/rem/marster.js";
import { fetchMeasureInfos, nameAndCode } from "@/api/oilDeposit/rem-03/oilfieldmanageplan.js";
import { getMeasureVersion, getFetchMeasureInfos } from "@/api/oilDeposit/rem-04/plan.js";
import { exportExcel } from "@/lib/exportExcel.js";
import FileSaver from "file-saver";
import * as XLSX from "@/lib/xlsx";
import treeSelectionAll from "@/pages/rem/basic/components/treeSelectionAll.vue";
export default {
  name: "measureManagement",
  components: {
    fieldOperations,
    treeSelectionAll,
  },
  data() {
    return {
      moment: moment,
      // 主数据树结构默认选中的值
      defaultCheckedKeys: [],
      screenWidth: "", //界面宽度
      width: "", //table最后一列的宽度
      spacing: "", //日期间距
      mcWidth: "0px",
      mcMgLeft: "",
      basicDays: [
        "年01月",
        "年02月",
        "年03月",
        "年04月",
        "年05月",
        "年06月",
        "年07月",
        "年08月",
        "年09月",
        "年10月",
        "年11月",
        "年12月",
      ],
      days: ["01月", "02月", "03月", "04月", "05月", "06月", "07月", "08月", "09月", "10月", "11月", "12月"],
      dateTime: new Date().format("yyyy"), //时间
      // dateTime:'2022',
      beginMonth: 1, //开始月份
      endMonth: 12, //结束月份
      queryParams: {
        page: 1,
        pageSize: 15,
      },
      pageTotal: 0,
      companyId: "",
      // 油田
      selectOilField: "3FC9A818F5BC43B88270DB80BBB3018F",
      selectOilFieldName: "",
      // 油田下拉框
      oilFields: [],
      // 平台
      selectPlatform: "",
      // 平台下拉
      platforms: [],
      // 井号
      wellId: "",
      // 井号下拉
      wells: [],
      // 措施
      measureId: "",
      // 措施事件
      measuresTypes: [],
      //措施属性
      stimClassCode: "",
      stimClassCodeSelect: [
        {
          name: "全部",
          code: "",
        },
        {
          name: "维护性",
          code: "001",
        },
        {
          name: "增产性",
          code: "003",
        },
        {
          name: "增注性",
          code: "004",
        },
      ],
      //措施版本
      measureVersion: "002003",
      measureVersionSelect: [
        // {label: '全部',value: ''},
        { label: "分公司考核", value: "002003" },
        { label: "分公司奋斗", value: "001" },
        { label: "有限考核", value: "002" },
        { label: "有限奋斗", value: "004002" },
        { label: "1+11", value: "003003001" },
        { label: "2+10", value: "003003002" },
        { label: "3+9", value: "003003003" },
        { label: "4+8", value: "003003004" },
        { label: "5+7", value: "003003005" },
        { label: "6+6", value: "003003006" },
        { label: "7+5", value: "003003007" },
        { label: "8+4", value: "003003008" },
        { label: "9+3", value: "003003009" },
        { label: "10+2", value: "0030030010" },
        { label: "11+1", value: "0030030011" },
      ],
      // table表格数据
      tableData: [
        // {
        //     measureName3_1: 40,
        //     measureName3_2: 38,
        //     sj_stardata: '2022-05-03',
        //     sj_enddata: '2022-06-12',
        //     jh_stardata: '2022-05-03',
        //     jh_enddata: '2022-06-10',
        //     sjwidth: 0, //实际宽度
        //     jhwidth: 0, //计划宽度
        //     mgleftwidth: 0, //距离左边
        // },
      ],
      isShowMC: false, //措施列表蒙层是否显示
      fieldOperationsShow: false, //现场作业弹框
      // 缓存权限数据
      myWidget: [],
      userInfo: {},
      // 按钮权限组
      canDownload: true, // 下载数据
      canUpload: false, // 上传数据
    };
  },
  mounted() {
    this.$nextTick(() => {
      let width = document.getElementById("tableBox").clientWidth - 510;
      this.width = width; //table最后一列的宽度
      //计算日期 间距
      console.log("日期宽度", Math.floor(this.width - 44 - 20));
      this.spacing = Math.floor((this.width - 936 - 44 - 20) / 11);
      console.log("日期间距", this.spacing);
      this.initData();

      //监听页面缩放
      this.screenWidth = document.body.clientWidth;
      window.onresize = () => {
        return (() => {
          this.screenWidth = document.body.clientWidth;
        })();
      };
    });
  },
  watch: {
    screenWidth() {
      let width = document.getElementById("tableBox").clientWidth - 510;
      this.width = width; //table最后一列的宽度
      //计算日期 间距
      this.spacing = Math.floor((this.width - 936 - 44 - 20) / 11);
      this.initData2();
      this.mcMarginLeft();
      console.log(this.screenWidth); //浏览器窗口变化时，打印宽度。
    },
  },
  methods: {
    //重置
    resetting() {
      Object.assign(this.$data, this.$options.data());
      this.$nextTick(() => {
        let width = document.getElementById("tableBox").clientWidth - 500;
        this.width = width; //table最后一列的宽度
        //计算日期 间距
        console.log("日期宽度", Math.floor(this.width - 44 - 20));
        this.spacing = Math.floor((this.width - 936 - 44 - 20) / 11);
        console.log("日期间距", this.spacing);
        this.initData();
        //监听页面缩放
        this.screenWidth = document.body.clientWidth;
        window.onresize = () => {
          return (() => {
            this.screenWidth = document.body.clientWidth;
          })();
        };
      });
    },
    //页面初始化信息
    async initData() {
      let params = {
        searchKeys: [this.$store.getters["user/userDetail"].user.userName],
      };
      await userListByUserNames(params).then((res) => {
        if (res.data.code == 200) {
          this.companyId =
            res.data.data[0] && res.data.data[0]?.tenantInfos && res.data.data[0]?.tenantInfos[0]
              ? res.data.data[0].tenantInfos[0]?.deptId
              : undefined;
        }
      });
      await QueryOgfDetail({ operationZoneId: this.companyId }).then((data) => {
        let code = data.data.code;
        if (code == 200) {
          this.oilFields = data.data.data;
          if (this.companyId === "715AD1CD60484BB59E737CD18A9DE44A") {
            this.selectOilField = "3FC9A818F5BC43B88270DB80BBB3018F";
          } else {
            this.selectOilField = this.oilFields[0].ogfId ? this.oilFields[0].ogfId : undefined;
          }
          this.selectOilFieldName = this.oilFields.filter(item => item.ogfId === this.selectOilField)[0].ogfName || "";
        }
      });
      //油田
      await QueryOgfDetail({}).then((res) => {
        if (res.data.code == 200) {
          this.oilFields = res.data.data;
        }
      });
      //平台
      await QueryPlatformDetail({ ogfId: this.selectOilField }).then((res) => {
        if (res.data.code == 200) {
          let platform = res.data.data;

          if (platform[0].platName == "全部") {
            platform.splice(0, 1);
          }
          this.platforms = platform;
          // this.platforms[0].platFormId=this.selectOilField;
          this.selectPlatform = platform[0].platformId;
        }
      });
      //井号
      await QueryWellDetail({
        ogfId: this.selectOilField,
        platformId: this.selectPlatform,
      }).then((res) => {
        if (res.data.code == 200) {
          this.wells = res.data.data;
        }
      });
      this.wells.unshift({
        wellId: "",
        wellName: "全部",
      });
      this.wellId = "";
      let wellId = this.wellId == "" ? this.wells.map((item) => item.wellId) : [this.wellId];
      this.defaultCheckedKeys = [this.selectPlatform, ...wellId];
      //措施类型
      this.getMeasureNameAndCode();
      //措施列表数据
      this.getFetchMeasureInfos();
    },
    //措施类型下拉框数据源
    getMeasureNameAndCode() {
      let params = {
        oilFieldId: this.selectOilField, //油田id
        platformId: this.selectPlatform, //平台id
        wellId: [this.wellId], //井号id
        stimClassCode: this.stimClassCode,
        measureId: this.measuresType, //措施事件
        year: this.dateTime, //时间-年
        page: 1,
        pageSize: 1000,
      };
      nameAndCode(params).then((res) => {
        if (res.data.code == 200) {
          this.measuresTypes = res.data.data.namesAndCodes;
          this.measuresTypes.unshift({
            code: "",
            name: "全部",
          });
          this.measureId = "";
        }
      });
    },
    //措施列表数据
    getFetchMeasureInfos() {
      this.selectOilFieldName = this.oilFields.filter(item => item.ogfId === this.selectOilField)[0].ogfName || "";
      if (!this.dateTime) {
        this.$message.warning("开始年份不能为空！");
        return false;
      }
      if (this.endMonth < this.beginMonth) {
        this.$message.warning("结束月份不能低于开始月份！");
        return false;
      }
      let params = {
        oilFieldId: this.selectOilField, //油田id
        platformId: this.selectPlatform, //平台id
        wellId: [this.wellId], //井号id
        measureId: this.measureId, //措施事件
        stimClassCode: this.stimClassCode, //措施类型
        measureVersion: this.measureVersion, //措施版本
        year: this.dateTime, //时间-年月日
        beginDate: this.dateTime + "-" + (this.beginMonth < 10 ? "0" + this.beginMonth : this.beginMonth) + "-01",
        endDate: this.dateTime + "-" + (this.endMonth < 10 ? "0" + this.endMonth : this.endMonth) + "-31",
        page: 1,
        pageSize: 10000,
      };
      getFetchMeasureInfos(params).then((res) => {
        if (res.data.code == 200) {
          //措施事件
          this.getMeasureNameAndCode();
          this.tableData = res.data.data.measuresInfoList;
          //  不展示年份，只显示月份
          // this.days = [];
          // this.basicDays.forEach((el, i) => {
          //     this.days.push(this.dateTime.split('-')[0] + el);
          // })
          // if (this.dateTime.split('-')[0] == '2023') {
          // this.tableData[1].planMeasuresDayNum = '';
          // this.tableData[1].planMeasuresEndTime = '';
          // this.tableData[1].planMeasuresStartTime = '';
          // this.tableData[1].realityMeasuresDayNum = '60'
          // this.tableData[1].realityMeasuresEndTime = '2023-08-01';
          // this.tableData[1].realityMeasuresStartTime = '2023-06-01';
          // }
          this.pageTotal = this.tableData.length;
          this.initData2();
          this.mcMarginLeft();
          if (this.dateTime.split("-")[0] == "2023" && this.pageTotal) {
            this.isShowMC = true;
          } else {
            this.isShowMC = false;
          }
        }
      });
    },
    //如果是今年数据，根据当前日期显示出蒙层
    mcMarginLeft() {
      let newDate = moment().format("YYYY-MM-DD");
      let diffObject = this.leftDiff(newDate);
      let marginLeft = diffObject.month * 78 + diffObject.month * this.spacing + (78 / 30) * diffObject.day - 4;
      console.log("marginLeft", marginLeft);
      this.mcWidth = this.width - 10 - 40 - marginLeft + "px";
      this.mcMgLeft = marginLeft + 560 + "px";
      console.log("this.mcWidth", this.mcWidth);
      console.log("this.mcMgLeft", this.mcMgLeft);
    },
    initData2() {
      console.log("没执行吗？", this.tableData);

      if (this.tableData.length) {
        this.tableData.forEach((el, i) => {
          if (el.realityMeasuresStartTime) {
            if (el.realityMeasuresStartTime < this.dateTime + "-01-01") {
              el.realityMeasuresStartTime = this.dateTime + "-01-01";
            }

            let day = this.dateDiff(this.dateTime + "-01-01", el.realityMeasuresStartTime);
            let diffObject = this.leftDiff(el.realityMeasuresStartTime);
            this.tableData[i].mgleftwidth =
              diffObject.month * 78 + diffObject.month * this.spacing + (78 / 30) * diffObject.day - 4 + "px";
            let sjwidth =
              (78 / 30) * Number(el.realityMeasuresDayNum) +
              this.diffMonth(el.realityMeasuresStartTime, el.realityMeasuresEndTime) * 17.5;
            this.tableData[i].sjwidth = Math.floor(sjwidth) + "px";

            if (el.planMeasuresStartTime && el.planMeasuresEndTime) {
              let jhwidth =
                (78 / 30) * Number(el.planMeasuresDayNum) +
                this.diffMonth(el.planMeasuresStartTime, el.planMeasuresEndTime) * 17.5;
              this.tableData[i].jhwidth = Math.floor(jhwidth) + "px";
            }
          } else if (el.planMeasuresStartTime) {
            // if (el.realityMeasuresStartTime < this.dateTime + '-01-01') {
            //     el.realityMeasuresStartTime = this.dateTime + '-01-01';
            // }
            let diffObject = this.leftDiff(el.planMeasuresStartTime);
            this.tableData[i].mgleftwidth =
              diffObject.month * 78 + diffObject.month * this.spacing + (78 / 30) * diffObject.day - 4 + "px";
            if (el.realityMeasuresStartTime && el.realityMeasuresEndTime) {
              let sjwidth =
                (78 / 30) * Number(el.realityMeasuresDayNum) +
                this.diffMonth(el.realityMeasuresStartTime, el.realityMeasuresEndTime) * 17.5;
              this.tableData[i].sjwidth = Math.floor(sjwidth) + "px";
            }

            if (el.planMeasuresStartTime && el.planMeasuresEndTime) {
              let jhwidth =
                (78 / 30) * Number(el.planMeasuresDayNum) +
                this.diffMonth(el.planMeasuresStartTime, el.planMeasuresEndTime) * 17.5;
              this.tableData[i].jhwidth = Math.floor(jhwidth) + "px";
            }
          }
        });
      }
    },
    //获取两个时间相隔天数
    dateDiff(sDate1, sDate2) {
      //sDate1和sDate2是2006-12-18格式
      let aDate1, aDate2, oDate1, oDate2, iDays;
      aDate1 = sDate1.split("-");
      oDate1 = new Date(aDate1[1] + "/" + aDate1[2] + "/" + aDate1[0]);
      aDate2 = sDate2.split("-");
      oDate2 = new Date(aDate2[1] + "/" + aDate2[2] + "/" + aDate2[0]);
      iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);
      return iDays;
    },
    //计算当前时间已过去多少天
    leftDiff(sDate) {
      let date = sDate.split("-");
      let nowMonth = Number(date[1]);
      let month = nowMonth - 1; //距离今年一月相差多少月。
      let day = Number(date[2]); //当月已过去多少天
      return {
        month,
        day,
      };
    },
    //计划两个日期相差月数
    diffMonth(sDate1, sDate2) {
      // console.log(sDate1,sDate2)
      let starMonth = Number(sDate1.split("-")[1]);
      let endMonth = Number(sDate2.split("-")[1]);
      return endMonth - starMonth;
    },
    //切换分页
    pagination(e) {
      this.page = e.page;
      this.pageSize = e.limit;
    },
    //油田下拉-change
   async onFieldChange(val) {
      await this.getFetchPlatforms(val);
      this.getFetchWells(this.selectOilField, this.selectPlatform);
      this.getMeasureNameAndCode();
    },
    //通过油田查询平台
    async getFetchPlatforms(oilFieldId) {
      await QueryPlatformDetail({ ogfId: oilFieldId }).then((res) => {
        if (res.data.code == 200) {
          this.platforms = res.data.data;
          this.selectPlatform = this.platforms[0].platformId;
        }
      });
    },
    //平台下拉-change
    onPlatfromChange(val) {
      this.getFetchWells(this.selectOilField, val);
      this.getMeasureNameAndCode();
    },
    changeWell(val) {
      let wellId = this.wellId == "" ? this.wells.map((item) => item.wellId) : [this.wellId];
      this.$refs.treeSelectionAll.setCheckedKeys([this.selectPlatform, ...wellId]);
      //措施类型
      this.getMeasureNameAndCode();
    },
    // 主数据树结构数选中数据 selectList：选中数据Id集合，selectData：当前选中数据对象
    getSelectItems(selectList, selectData) {
      // 判断如果没有wellList没有当前井号，调取井号接口根据平台获取井号数据
      // let isUpdata = this.wells.map((item) => item.wellId).includes(selectList.wellIds);
      // if (!isUpdata || selectList.platformIds !=  this.selectPlatform) {
      //     this.getFetchWells(this.selectOilField, selectList.platformIds);
      // }
      //作业公司选中数据
      // this.queryParams.companyId = selectList.orgId;
      // 油田选中数据
      // this.queryParams.ogfId = selectList.ogfId;
      //平台选中数据
      this.selectPlatform = selectList.platformIds;
      // 判断如果没有wellList没有当前井号，调取井号接口根据平台获取井号数据
      let isUpdate = false;
      // 井号选中数据
      if (selectData.level == 4) {
        this.wellId = "";
      } else {
        this.wellId = selectList.wellIds;
        isUpdate = this.wells.map((item) => item.wellId).includes(selectList.wellIds);
      }
      if (!isUpdate) {
        this.wells = [];
        QueryWellDetail({
          ogfId: this.selectOilField,
          platformId: this.selectPlatform,
        }).then((res) => {
          if (res.data.code == 200) {
            this.wells = res.data.data;
          }
        });
        this.wells.unshift({
          wellId: "",
          wellName: "全部",
        });
      }
    },
    //通过油田 或 平台 获得井
    getFetchWells(oilFieldId, platformId) {
      this.wells = [];
      QueryWellDetail({
        ogfId: oilFieldId,
        platformId: platformId,
      }).then((res) => {
        if (res.data.code == 200) {
          this.wells = res.data.data;
        }
      });
      this.wells.unshift({
        wellId: "",
        wellName: "全部",
      });
      this.wellId = "";
    },
    //跳转详情界面-oilFieldId 油田id platformId 平台id selectWellId 选择井号 yearMonthDay 时间  wellType 井类型 planMeasuresStartTime 计划开始时间 planMeasuresEndTime 计划结束时间 realityMeasuresEndTime 实际结束时间
    switchToMeasures(
      oilFieldId,
      platformId,
      selectWellId,
      selectMeasuresId,
      yearMonthDay,
      wellType,
      wellNameNano,
      wellBoreName,
      index,
      planMeasuresStartTime,
      planMeasuresEndTime,
      realityMeasuresEndTime,
    ) {
      console.log(1111, selectWellId);
      // if (this.dateTime == '2023' && index == 1) {
      if (!realityMeasuresEndTime && planMeasuresStartTime && moment().isBefore(moment(planMeasuresStartTime))) {
        this.$router.push({
          path: "/plan/personnelMeasures",
          query: {
            routeName: "measureManagement",
            tabValue: "personnelplan",
            startTime: planMeasuresStartTime,
            endTime: planMeasuresEndTime,
          },
        });
        return false;
      }
      // 跳转到重点项目页面
      this.$router.push({
        path: "/plan/measureEffectTracking",
        query: {
          oilFieldId, //油田id
          platformId, //平台id
          selectWellId,
          selectMeasuresId,
          measuresDate: yearMonthDay,
          wellType,
          wellNameNano,
          wellBoreName,
          canDownload: this.canDownload,
          dateTime: this.dateTime,
        },
      });
    },
    //前端导出内容
    doExportFile() {
      // exportExcel('#csgl', '措施管理');
      let queryParams = JSON.parse(JSON.stringify(this.queryParams));
      this.queryParams.pageSize = 1000;
      this.queryParams.page = 1;
      this.$nextTick(function () {
        let xlsxParam = { raw: true };
        let wb = XLSX.utils.table_to_book(document.querySelector("#csgl"), xlsxParam);
        const wbout = XLSX.write(wb, {
          bookType: "xlsx",
          bookSST: true,
          type: "array",
        });
        try {
          FileSaver.saveAs(new Blob([wbout], { type: "application/octet-stream" }), "措施管理.xlsx");
        } catch (e) {
          if (typeof console !== "undefined") console.log(e, wbout);
        }
        this.queryParams = JSON.parse(JSON.stringify(queryParams));
        return wbout;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-table__fixed-header-wrapper,
::v-deep .el-table__header-wrapper {
  .cell {
    height: auto !important;
    line-height: 1.5 !important;
    white-space: pre;
  }
}
::v-deep #csgl .has-gutter {
  height: 66px;

  tr {
    height: 66px;
  }

  tr th:nth-child(3) {
    .cell {
      line-height: 18px;
    }
  }

  tr th:nth-child(4) {
    .cell {
      line-height: 18px;
    }
  }
}

::v-deep .el-table__body-wrapper {
  .el-table__body {
    tbody tr:last-child {
      td {
        border: none;
      }
    }
  }
}

.app-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .z-container {
    flex: 1;
    height: 0;
  }

  //自适应表头
  .header-titlts {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon0 {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 60px;

      .b0 {
        width: 18px;
        height: 18px;
        margin-right: 10px;
        background-image: linear-gradient(135deg, #26baff 0%, #7ee1c0 55%, #c0ff91 100%);
        box-shadow: 4px 0px 4px -8px rgba(0, 24, 148, 0.8);
      }

      .b1 {
        width: 18px;
        height: 18px;
        margin-right: 10px;
        background-image: linear-gradient(-45deg, #6acbff 0%, #4a91f4 45%, #2d5eeb 100%);
        border-radius: 1px;
      }
    }

    .icon1 {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 34px;

      img {
        width: 40px;
        height: 40px;
      }
    }

    span {
      font-size: 14px;
      font-weight: 500;
    }

    .b2 {
      width: 18px;
      height: 18px;
      margin-right: 10px;
      background-color: #8f9396;
      border-radius: 1px;
    }
  }

  span {
    font-size: 14px;
    font-weight: 500;
  }

  //自适应行
  .vv {
    width: 100%;
    display: flex;
    position: relative;
    z-index: 1000;

    .vv-left {
      cursor: pointer;
      width: 40px;
      height: 40px;
      margin-right: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 40px;
        height: auto;
      }
    }

    .vv-right {
      cursor: pointer;
      padding-top: 4px;

      .vv-line {
        height: 15px;
        line-height: 15px;
        display: flex;
        align-items: center;

        .line {
          width: 160px;
          margin-right: 6px;

          .progress1 {
            ::v-deep .el-progress-bar__inner {
              background-image: linear-gradient(135deg, #26baff 0%, #7ee1c0 55%, #c0ff91 100%);
              box-shadow: 4px 0px 4px -8px rgba(0, 24, 148, 0.8);
            }
          }

          .progress2 {
            ::v-deep .el-progress-bar__inner {
              background-image: linear-gradient(-45deg, #6acbff 0%, #4a91f4 45%, #2d5eeb 100%);
              border-radius: 7px;
            }
          }

          .progress3 {
            ::v-deep .el-progress-bar__inner {
              background: #8f9396;
            }
          }
        }

        .day {
          font-size: 12px;
          color: #2cbdfb;
        }

        .day3 {
          color: #8f9396;
        }
      }
    }
  }
  .vvColor {
    width: 100%;
    display: flex;
    position: relative;
    z-index: 1000;
    .vv-right {
      .vv-line {
        .line {
          .progress1 {
            ::v-deep .el-progress-bar__inner {
              background: #8f9396;
              // box-shadow: 4px 0px 4px -8px rgba(0, 24, 148, 0.8);
            }
          }

          .progress2 {
            ::v-deep .el-progress-bar__inner {
              background: #8f9396;
            }
          }
        }

        .day {
          color: #8f9396;
        }
      }
    }
  }
}

//日期
.z-date-box {
  width: 100%;
  height: 44px;

  .z-date {
    padding-right: 10px;
    margin-left: 554px;
    padding-top: 10px;
    display: flex;
    align-items: center;

    .day {
      width: 78px;
      margin-right: 20px;
    }

    .day:last-child {
      margin-right: 0 !important;
    }
  }
}

//蒙层
::v-deep .tableBox {
  overflow-x: hidden;
  position: relative;

  .mcBox {
    position: absolute;
    top: 66px;
    // width: 1190px;
    background-image: linear-gradient(90deg, rgba(169, 217, 255, 0.26) 0%, rgba(49, 167, 255, 0.26) 100%);

    &::before {
      content: "";
      position: absolute;
      width: 0px;
      height: 100%;
      border-left: 4px dotted rgba(255, 156, 37, 1);
    }
  }
}
</style>
