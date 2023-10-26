<template>
  <el-container class="layout">
    <el-header height="auto"> </el-header>
    <el-container>
      <el-header>
        <el-row style="margin-top: 5px">
          <pagePanelNew class="pagePanelNew">
            <el-radio-group v-model="radioValue" @change="qeruyAlLData">
              <el-radio-button label="油田指标预警"></el-radio-button>
              <el-radio-button label="区块指标预警"></el-radio-button>
            </el-radio-group>
          </pagePanelNew>
        </el-row>
        <div>
          <el-row style="margin-top: 8px">
            <!-- <el-tabs v-model="activeName" class="g-pageHeader">
              <el-tab-pane label="用户管理" name="first"></el-tab-pane>
              <el-tab-pane label="配置管理" name="second"></el-tab-pane>
            </el-tabs> -->

            <el-button class="roundButton" size="mini" round @click="switchParam('1')"
              >新预警（{{ alertCount }}）</el-button
            >
            <el-button class="roundButton" size="mini" round @click="switchParam('2')">观察</el-button>
            <el-button class="roundButton" size="mini" round @click="switchParam('3')">历史预警</el-button>
          </el-row>
        </div>
      </el-header>
      <el-main style="margin-top: 60px">
        <div v-if="radioValue == '油田指标预警' && switchNumber == '1'" style="height: 100%">
          <pagePanelNew style="height: 100%; margin-top: 25px">
            <el-table :data="tableData" highlight :row-class-name="tableRowClassName">
              <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
              <el-table-column prop="theDate" label="预警时间" align="center"></el-table-column>
              <el-table-column prop="obj" label="预警对象" align="center"></el-table-column>
              <el-table-column prop="warningType" label="预警模型类型" align="center"></el-table-column>
              <el-table-column prop="warningDesc" label="预警描述" align="center"></el-table-column>
              <el-table-column label="预警分析" align="center">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.disposalStatus == '0' || scope.row.disposalStatus == '1'"
                    type="text"
                    size="small"
                    @click="warningDispose(scope.row)"
                  >
                    <span style="color: #ffffff">处理</span>
                  </el-button>
                  <el-button type="text" size="small" @click="warningDispose(scope.row)">
                    <span style="color: #ffffff">查看</span>
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column label="处置状态" align="center">
                <template slot-scope="scope">
                  {{ scope.row.status ? scope.row.status : '-' }}
                </template>
              </el-table-column>
              <el-table-column v-if="false" prop="handler" label="处理人"></el-table-column>
            </el-table>
            <el-pagination
              style="margin-top: 10px; float: right"
              :current-page="page"
              :page-size="pageSize"
              :page-sizes="[10, 20, 50, 100]"
              :pager-count="5"
              layout="prev, pager, next, total"
              :total="total"
              @size-change="handleChangePageSize"
              @current-change="handleChangePage"
            >
            </el-pagination>
          </pagePanelNew>
        </div>
        <div v-if="radioValue == '油田指标预警' && switchNumber == '2'" style="height: 100%">
          <pagePanelNew style="height: 100%; margin-top: 40px">
            <el-table :data="tableData" highlight>
              <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
              <el-table-column prop="theDate" label="预警时间" align="center"></el-table-column>
              <el-table-column prop="obj" label="预警对象" align="center"></el-table-column>
              <el-table-column prop="warningType" label="预警模型类型" align="center"></el-table-column>
              <el-table-column prop="warningDesc" label="预警描述" align="center"></el-table-column>
              <el-table-column prop="observeDays" label="加入观察室天数" align="center">
                <template slot-scope="scope">
                  {{ scope.row.observeDays != null ? scope.row.observeDays : '-' }}
                </template>
              </el-table-column>
              <el-table-column label="预警分析" align="center">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.disposalStatus == '0' || scope.row.disposalStatus == '1'"
                    type="text"
                    size="small"
                    @click="warningDispose(scope.row)"
                  >
                    <span style="color: #ffffff">处理</span>
                  </el-button>
                  <el-button type="text" size="small" @click="warningDispose(scope.row)">
                    <span style="color: #ffffff">查看</span>
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column label="处置状态" align="center">
                <template slot-scope="scope">
                  {{ scope.row.status ? scope.row.status : '-' }}
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              style="margin-top: 10px; float: right"
              :current-page="page"
              :page-size="pageSize"
              :page-sizes="[10, 20, 50, 100]"
              :pager-count="5"
              layout="prev, pager, next, total"
              :total="total"
              @size-change="handleChangePageSize"
              @current-change="handleChangePage"
            >
            </el-pagination>
          </pagePanelNew>
        </div>
        <div v-if="radioValue == '油田指标预警' && switchNumber == '3'" style="height: 100%">
          <el-row style="margin-top: 40px">
            <el-col :span="6">
              <span class="demonstration">日期：</span>
              <el-date-picker
                v-model="historyDateTime"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="4" style="margin-left: 20px">
              <span class="demonstration">预警：</span>
              <el-select v-model="warningTypeCode" class="f2" style="width: 180px">
                <el-option
                  v-for="item in warnings"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <div class="fl">
                <el-button
                  type="primary"
                  class="buttonActive_primary"
                  style="margin-left: 20px; width: 90px"
                  icon="el-icon-search"
                  @click="switchParam('3')"
                  >搜索</el-button
                >
              </div>
            </el-col>
          </el-row>
          <pagePanelNew style="height: 100%; margin-top: 10px">
            <el-table :data="tableData" highlight>
              <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
              <el-table-column prop="theDate" label="预警时间" align="center"></el-table-column>
              <el-table-column prop="obj" label="预警对象" align="center"></el-table-column>
              <el-table-column prop="warningType" label="预警模型类型" align="center"></el-table-column>
              <el-table-column prop="warningDesc" label="预警描述" align="center"></el-table-column>
              <el-table-column prop="result" label="处置结果" align="center">
                <template slot-scope="scope">
                  <div v-if="scope.row.result == null || scope.row.result == ''">
                    <span class="hrefSpan" style="cursor: pointer" href="#" @click="warningDispose(scope.row)"
                      >关闭</span
                    >
                  </div>
                  <span class="hrefSpan" style="cursor: pointer" href="#" @click="warningDispose(scope.row)">{{
                    scope.row.result
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="handler" label="处理人" align="center">
                <template slot-scope="scope">
                  {{ scope.row.handler ? scope.row.handler : '-' }}
                </template>
              </el-table-column>
              <el-table-column v-if="false" prop="handler" label="处理人"></el-table-column>
              <el-table-column v-if="false" prop="handler" label="处理人"></el-table-column>
            </el-table>
            <el-pagination
              style="margin-top: 10px; float: right"
              :current-page="page"
              :page-size="pageSize"
              :page-sizes="[10, 20, 50, 100]"
              :pager-count="5"
              layout="prev, pager, next, total"
              :total="total"
              @size-change="handleChangePageSize"
              @current-change="handleChangePage"
            >
            </el-pagination>
          </pagePanelNew>
        </div>
        <div v-if="radioValue == '区块指标预警' && switchNumber == '1'" style="height: 100%">
          <pagePanelNew style="height: 100%; margin-top: 25px">
            <el-table :data="tableData" highlight :row-class-name="tableRowClassName">
              <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
              <el-table-column prop="theDate" label="预警时间" align="center"></el-table-column>
              <el-table-column prop="obj" label="预警对象" align="center"></el-table-column>
              <el-table-column prop="warningType" label="预警模型类型" align="center"></el-table-column>
              <el-table-column prop="warningDesc" label="预警描述" align="center"></el-table-column>
              <el-table-column label="预警分析" align="center">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.disposalStatus == '0' || scope.row.disposalStatus == '1'"
                    type="text"
                    size="small"
                    @click="warningDispose(scope.row)"
                  >
                    <span style="color: #ffffff">处理</span>
                  </el-button>
                  <el-button type="text" size="small" @click="warningDispose(scope.row)">
                    <span style="color: #ffffff">查看</span>
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column label="处置状态" align="center">
                <template slot-scope="scope">
                  {{ scope.row.status ? scope.row.status : '-' }}
                </template>
              </el-table-column>
              <el-table-column v-if="false" prop="handler" label="处理人"></el-table-column>
            </el-table>
            <el-pagination
              style="margin-top: 10px; float: right"
              :current-page="page"
              :page-size="pageSize"
              :page-sizes="[10, 20, 50, 100]"
              :pager-count="5"
              layout="prev, pager, next, total"
              :total="total"
              @size-change="handleChangePageSize"
              @current-change="handleChangePage"
            >
            </el-pagination>
          </pagePanelNew>
        </div>
        <div v-if="radioValue == '区块指标预警' && switchNumber == '2'" style="height: 100%">
          <pagePanelNew style="height: 100%; margin-top: 40px">
            <el-table :data="tableData" highlight>
              <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
              <el-table-column prop="theDate" label="预警时间" align="center"> </el-table-column>
              <el-table-column prop="obj" label="预警对象" align="center"></el-table-column>
              <el-table-column prop="warningType" label="预警模型类型" align="center"></el-table-column>
              <el-table-column prop="warningDesc" label="预警描述" align="center"> </el-table-column>
              <el-table-column prop="observeDays" label="加入观察室天数" align="center">
                <template slot-scope="scope">
                  {{ scope.row.observeDays != null ? scope.row.observeDays : '-' }}
                </template>
              </el-table-column>
              <el-table-column label="预警分析" align="center">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.disposalStatus == '0' || scope.row.disposalStatus == '1'"
                    type="text"
                    size="small"
                    @click="warningDispose(scope.row)"
                  >
                    <span style="color: #ffffff">处理</span>
                  </el-button>
                  <el-button type="text" size="small" @click="warningDispose(scope.row)">
                    <span style="color: #ffffff">查看</span>
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column label="处置状态" align="center">
                <template slot-scope="scope">
                  {{ scope.row.status ? scope.row.status : '-' }}
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              style="margin-top: 10px; float: right"
              :current-page="page"
              :page-size="pageSize"
              :page-sizes="[10, 20, 50, 100]"
              :pager-count="5"
              layout="prev, pager, next, total"
              :total="total"
              @size-change="handleChangePageSize"
              @current-change="handleChangePage"
            >
            </el-pagination>
          </pagePanelNew>
        </div>
        <div v-if="radioValue == '区块指标预警' && switchNumber == '3'" style="height: 100%">
          <el-row style="margin-top: 40px">
            <el-col :span="6">
              <span class="demonstration">日期：</span>
              <el-date-picker
                v-model="historyDateTimeSec"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="4" style="margin-left: 20px">
              <span class="demonstration">预警：</span>
              <el-select v-model="warningTypeCode" class="f2" style="width: 180px">
                <el-option
                  v-for="item in warnings"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <div class="fl">
                <el-button
                  type="primary"
                  class="buttonActive_primary"
                  icon="el-icon-search"
                  style="margin-left: 20px; width: 90px"
                  @click="switchParam('3')"
                  >搜索</el-button
                >
              </div>
            </el-col>
          </el-row>
          <pagePanelNew style="height: 100%; margin-top: 10px">
            <el-table :data="tableData" highlight style="margin-top: 0px">
              <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
              <el-table-column prop="theDate" label="预警时间" align="center"></el-table-column>
              <el-table-column prop="obj" label="预警对象" align="center"></el-table-column>
              <el-table-column prop="warningType" label="预警模型类型" align="center"></el-table-column>
              <el-table-column prop="warningDesc" label="预警描述" align="center"></el-table-column>
              <el-table-column prop="result" label="处置结果" align="center">
                <template slot-scope="scope">
                  <div v-if="scope.row.result == null || scope.row.result == ''">
                    <span class="hrefSpan" style="cursor: pointer" href="#" @click="warningDispose(scope.row)"
                      >关闭</span
                    >
                  </div>
                  <span class="hrefSpan" style="cursor: pointer" href="#" @click="warningDispose(scope.row)">{{
                    scope.row.result
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="handler" label="处理人" align="center">
                <template slot-scope="scope">
                  {{ scope.row.handler }}
                </template>
              </el-table-column>
              <el-table-column v-if="false" prop="handler" label="处理人"></el-table-column>
              <el-table-column v-if="false" prop="handler" label="处理人"></el-table-column>
            </el-table>
            <pagination
              v-show="total > 0"
              :total="total"
              @size-change="handleChangePageSize"
              @current-change="handleChangePage"
              :page.sync="page"
              :page-sizes="[10, 20, 50, 100]"
              :pager-count="5"
              layout="prev, pager, next, total"
              :limit.sync="pageSize"
            />
          </pagePanelNew>
        </div>
      </el-main>
    </el-container>
    <el-header> </el-header>
  </el-container>
</template>
<script>
import { fetchOilFields, fetchFields } from '@/api/oilDeposit/rem-02/primaryinfo.js';
import { oilFieldDevWarnings, fieldDevWarnings } from '@/api/oilDeposit/rem-03/oilfieldmanageplan.js';
import { getWidgetByAreaUser } from '@/api/oilDeposit/rmm-01/rmm01';
export default {
  data() {
    return {
      //hwh 修改
      oilFieldId: '3FC9A818F5BC43B88270DB80BBB3018F',
      //预警数量
      alertCount: 0,
      //分页参数总数
      total: 10,
      //当前页
      page: 1,
      //当前页条数
      pageSize: 10,
      //div切换变量
      radioValue: '',
      //选择显示div
      switchNumber: '',
      //预警
      warningTypeCode: '',
      //搜索输入框
      input: '',
      //日期
      dateTime: '',
      //历史日期
      historyDateTime: '',
      //历史日期
      historyDateTimeSec: '',
      //缓存数据
      tempRadio: '',
      //切换div值缓存
      tempSwitchNumber: '',
      //查询参数
      queryParams: {
        warningCode: 'WARNING',
      },
      //预警类型
      warningType: '全部',
      warningTypes: [
        {
          name: '全部',
          value: '0',
        },
        {
          name: '预测预警',
          value: '1',
        },
        {
          name: '对比预警',
          value: '2',
        },
      ],
      //表格数据
      tableData: [],
      //预警信息
      warnings: [
        {
          name: '全部',
          value: '',
        },
        {
          name: '产液量预警',
          value: '7',
        },
        {
          name: '产油量预警',
          value: '6',
        },
        {
          name: '注水量预警',
          value: '9',
        },
        {
          name: '含水率预警',
          value: '8',
        },
        {
          name: '注采比',
          value: '11',
        },
        {
          name: '递减率预警',
          value: '12',
        },
      ],
      // TODO lv 页面没有使用，代码检查错误先注释
      // pickerOptions: {
      //   disabledDate(time) {
      //     let curDate = new Date().toString(); // 当前时间戳转为字符串
      //     let curDateYear = new Date().getFullYear(); // 当前时间的年份
      //     let oneYearAgoDate = curDate.replace(curDateYear, curDateYear - 1); // 字符串年份替换为一年前
      //     let oneYear = new Date(oneYearAgoDate).getTime(); //一年前字符串转为时间戳
      //     return time.getTime() > Date.now() || time.getTime() < oneYear;
      //   },
      // },
      //表单数据
      increaseAndDecrease: [
        {
          label: '增加',
          value: '增加',
        },
        {
          label: '减少',
          value: '减少',
        },
      ],
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
      //特殊管理权限
      ycglKfyj: false,
    };
  },
  created() {
    this.dateTime = [new Date().addDays(-30).format('yyyy-MM-dd'), new Date().format('yyyy-MM-dd')];
    let year = new Date().getFullYear();
    let startDate = year + '-01-01';
    this.historyDateTime = [new Date(startDate).format('yyyy-MM-dd'), new Date().format('yyyy-MM-dd')];
    this.historyDateTimeSec = [new Date(startDate).format('yyyy-MM-dd'), new Date().format('yyyy-MM-dd')];
  },
  //初始化数据
  mounted: function () {
    //获取权限问题内容
    this.getPageAuthMessage();
    this.selectOilfieldData(this.dateTime[0], this.dateTime[1], this.oilFieldId, 'WARNING');
    if (this.$route.query == undefined) {
      this.radioValue = '油田指标预警';
      //二级选择重置
      this.switchNumber = '1';
    } else {
      this.radioValue = this.$route.query.radioValue == undefined ? '油田指标预警' : this.$route.query.radioValue;
      this.switchNumber = this.$route.query.switchNumber == undefined ? '1' : this.$route.query.switchNumber;
    }
    this.qeruyAlLData();
  },
  //方法
  methods: {
    //获取油田信息
    getOilFields() {
      let _this = this;
      fetchOilFields().then((res) => {
        //获得详细信息
        let data = res.data.data;
        //获取油田信息
        _this.oilField = data.oilFields;
        //选择油田默认选中第一个
        _this.selectOilField = _this.oilField[0].oilFieldId;
      });
    },
    //获得区块信息
    getFieldsData(oilFieldId) {
      let request = { oilFieldId: oilFieldId };
      let _this = this;
      fetchFields(request).then((res) => {
        // 获得数据
        let data = res.data.data.fields;
        //获得区块信息
        _this.block = data;
        //默认选中第一个区块信息
        _this.selectBlock = _this.block[0].fieldId;
      });
    },
    //配置跳转
    /* handleClick(row) {
          this.$router.push({name:'developmentWarningConfig',query:{radioValue:this.radioValue,switchNumber:this.switchNumber}})
      },*/
    switchParam(row) {
      /*console.log(row);*/
      this.tempRadio = this.radioValue;
      this.tempSwitchNumber = this.switchNumber;
      //1级选择重置
      this.switchNumber = row;
      var OilfieldId = this.oilFieldId;
      if (this.radioValue == '油田指标预警' && row == '1') {
        this.selectOilfieldData(this.dateTime[0], this.dateTime[1], OilfieldId, 'WARNING');
      } else if (this.radioValue == '油田指标预警' && row == '2') {
        this.selectOilfieldData(this.dateTime[0], this.dateTime[1], OilfieldId, 'OBSERVE');
      } else if (this.radioValue == '油田指标预警' && row == '3') {
        this.selectOilfieldData(this.historyDateTime[0], this.historyDateTime[1], OilfieldId, 'HIS');
      } else if (this.radioValue == '区块指标预警' && row == '1') {
        this.selectFieldData(this.dateTime[0], this.dateTime[1], OilfieldId, 'WARNING');
      } else if (this.radioValue == '区块指标预警' && row == '2') {
        this.selectFieldData(this.dateTime[0], this.dateTime[1], OilfieldId, 'OBSERVE');
      } else if (this.radioValue == '区块指标预警' && row == '3') {
        this.selectFieldData(this.historyDateTimeSec[0], this.historyDateTimeSec[1], OilfieldId, 'HIS');
      } else {
        this.tableData = [];
        this.total = 0;
      }
    },
    //div切换方法
    closeDiv() {
      this.radioValue = this.tempRadio;
      this.switchNumber = this.tempSwitchNumber;
    },
    //数据查询方法
    qeruyAlLData() {
      let war = '';
      if (this.switchNumber == '1') {
        war = 'WARNING';
      } else if (this.switchNumber == '2') {
        war = 'OBSERVE';
      } else {
        war = 'HIS';
      }
      if (this.radioValue == '油田指标预警') {
        this.selectOilfieldData(this.dateTime[0], this.dateTime[1], this.oilFieldId, war);
      } else if (this.radioValue == '区块指标预警') {
        this.selectFieldData(this.dateTime[0], this.dateTime[1], this.oilFieldId, war);
      } else {
        this.tableData = [];
        this.total = 0;
      }
    },
    /**
     * hwh
     * 查询历史记录信息
     */
    queryHistoryData() {
      if (this.radioValue == '油田指标预警') {
        this.selectOilfieldData(this.historyDateTime[0], this.historyDateTime[1], this.oilFieldId, 'WARNING');
      } else if (this.radioValue == '区块指标预警') {
        this.selectFieldData(this.historyDateTimeSec[0], this.historyDateTimeSec[1], this.oilFieldId, 'WARNING');
      } else {
        this.tableData = [];
        this.total = 0;
      }
    },
    //查询油田数据统一接口
    selectOilfieldData(beginDate, endDate, fieldId, warningCode) {
      /* beginDate='2020-09-01'
          endDate='2021-03-01'*/
      let queryParams = {
        beginDate: beginDate,
        endDate: endDate,
        fieldId: fieldId,
        page: this.page,
        pageSize: this.pageSize,
        warningCode: warningCode,
        warningTypeCode: this.warningTypeCode,
      };
      oilFieldDevWarnings(queryParams).then((data) => {
        this.tableData = data.data.data.indicatorWarnings;
        this.total = data.data.data.total;
        if (warningCode == 'WARNING') {
          this.alertCount = data.data.data.total;
        }
      });
    },
    //查询区块数据统一接口
    selectFieldData(beginDate, endDate, fieldId, warningCode) {
      /*beginDate='2020-09-01'
          endDate='2021-03-01'*/
      let queryParams = {
        beginDate: beginDate,
        endDate: endDate,
        fieldId: fieldId,
        page: this.page,
        pageSize: this.pageSize,
        warningCode: warningCode,
        warningTypeCode: this.warningTypeCode,
      };
      fieldDevWarnings(queryParams).then((data) => {
        this.tableData = data.data.data.indicatorWarnings;
        this.total = data.data.data.total;
        if (warningCode == 'WARNING') {
          this.alertCount = data.data.data.total;
        }
      });
    },
    //处置结果
    warningDispose(row) {
      //6、7、8代表以油井为中心、、、9代表以水井为中心、、、11代表以油水井为中心
      if (row.warningCode == '6' || row.warningCode == '7' || row.warningCode == '8') {
        //oil
        this.$router.push({
          name: 'WarningDisposeOil',
          query: {
            warningType: row.warningType,
            theDate: row.theDate,
            handler: row.handler,
            id: row.id,
            warningCode: row.warningCode,
            oilfieldId: this.oilFieldId,
            ycglKfyj: this.ycglKfyj,
          },
        });
      } else if (row.warningCode == '9') {
        //water
        this.$router.push({
          name: 'WarningDisposeWater',
          query: {
            warningType: row.warningType,
            theDate: row.theDate,
            handler: row.handler,
            id: row.id,
            warningCode: row.warningCode,
            oilfieldId: this.oilFieldId,
            ycglKfyj: this.ycglKfyj,
          },
        });
      } else if (row.warningCode == '11') {
        //oil+water
        this.$router.push({
          name: 'warningDispose',
          query: {
            warningType: row.warningType,
            theDate: row.theDate,
            handler: row.handler,
            id: row.id,
            warningCode: row.warningCode,
            oilfieldId: this.oilFieldId,
            ycglKfyj: this.ycglKfyj,
          },
        });
      } else {
        this.$router.push({
          name: 'warningDispose',
          query: {
            warningType: row.warningType,
            theDate: row.theDate,
            handler: row.handler,
            id: row.id,
            warningCode: row.warningCode,
            oilfieldId: this.oilFieldId,
            ycglKfyj: this.ycglKfyj,
          },
        });
      }
      // this.$router.push({ name:'warningDispose',query:{warningType:row.warningType,theDate:row.theDate,handler:row.handler,id:row.id,warningCode:row.warningCode,opinion:row.result}})
    },
    /**
     *  hwh
     *  改变当前页 跳转下一页
     * @param pageValue 当前页数
     */
    handleChangePage(pageValue) {
      this.page = pageValue;
      let war = '';
      if (this.switchNumber == '1') {
        war = 'WARNING';
      } else if (this.switchNumber == '2') {
        war = 'OBSERVE';
      } else {
        war = 'HIS';
      }
      if (this.radioValue == '油田指标预警') {
        this.selectOilfieldData(this.dateTime[0], this.dateTime[1], this.oilFieldId, war);
      } else if (this.radioValue == '区块指标预警') {
        this.selectFieldData(this.dateTime[0], this.dateTime[1], this.oilFieldId, war);
      } else {
        this.tableData = [];
        this.total = 0;
      }
    },
    /**
     *  hwh
     *  改变当前页大小
     * @param rowsValue 当前页大小
     */
    handleChangePageSize(rowsValue) {
      this.pageSize = rowsValue;
      let war = '';
      if (this.switchNumber == '1') {
        war = 'WARNING';
      } else if (this.switchNumber == '2') {
        war = 'OBSERVE';
      } else {
        war = 'HIS';
      }
      if (this.radioValue == '油田指标预警') {
        this.selectOilfieldData(this.dateTime[0], this.dateTime[1], this.oilFieldId, war);
      } else if (this.radioValue == '区块指标预警') {
        this.selectFieldData(this.dateTime[0], this.dateTime[1], this.oilFieldId, war);
      } else {
        this.tableData = [];
        this.total = 0;
      }
    },
    //行间样式
    tableRowClassName({ row, rowIndex }) {
      if (!row.status) {
        return 'warning-row';
      }
      return '';
    },
    /**
     * hwh
     * 获取当前页面的权限内容，并处理其逻辑问题
     */
    getPageAuthMessage() {
      // this.userInfo = VSAuth.getAuthInfo();
      let myPath = this.$route.path;
      //该值可以为空
      let areaCode = 'znytglxt';
      let loginName = this.userInfo.userName;
      getWidgetByAreaUser({ areaCode: areaCode, loginName: loginName }).then((res) => {
        let myList = res.data.dataList;
        if (myList) {
          let pageMes = myList.find((item) => {
            return item.resPvalue == myPath;
          });
          if (pageMes) {
            this.myWidget = pageMes.widgetList;
          }
          if (this.myWidget) {
            for (let indexNum in this.myWidget) {
              try {
                let myWidgetItem = this.myWidget[indexNum];
                switch (myWidgetItem.widgetCode) {
                  case 'addInfo':
                    this.canAddInfo = true;
                    break;
                  case 'updateInfo':
                    this.canUpdateInfo = true;
                    break;
                  case 'sendInfo':
                    this.canSendInfo = true;
                    break;
                  case 'deleteInfo':
                    this.canDeleteInfo = true;
                    break;
                  case 'download':
                    this.canDownload = true;
                    break;
                  case 'upload':
                    this.canUpload = true;
                    break;
                  case 'YCGL_KFYJ':
                    this.ycglKfyj = true;
                    break;
                  default:
                }
              } catch (e) {
                continue;
              }
            }
          }
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
.fl {
  margin-left: 10px;
}
.m1 {
  margin-top: 10px;
}
.roundButton {
  margin-left: 10px;
  width: 80px;
  height: 25px;
  font-size: 12px;
  color: #409eff;
  background-color: #031527;
  border: 1px solid #409eff;
}
.hrefSpan {
  color: #24deff;
}
.editbox {
  width: 45%;
  height: 80%;
}
.el-table >>> .warning-row {
  -webkit-animation: mymove 1s infinite; /* Chrome, Safari, Opera */
  animation: mymove 3s infinite;
}
@keyframes mymove {
  50% {
    background-color: #ff5844;
  }
}
::v-deep .el-table .cell:empty::before {
  content: '-';
}

.radioButton {
  background-color: #031527;
}

//::v-deep .el-radio-button__inner {
//background-color: #031527;
//}

::v-deep .el-radio-button__inner {
  background: #031527;
  border: 1px solid #ffffff;
  border: 1px solid #409eff;
  color: #fff;
}
::v-depp .el-radio-button:first-child .el-radio-button__inner {
  border: 1px solid #409eff;
}
</style>
