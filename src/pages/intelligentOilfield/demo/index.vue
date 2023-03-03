<template>
  <div class="demoClass">
    <!-- 常用组件一览大全 -->
    <div class="headerTitle spaceMargin">
      ====================================================常用组件一览大全========================================
    </div>
    <div class="headerTitle spaceMargin">
      1、按钮============================================================================================
    </div>
    <div class="spaceMargin">1.1、主要按钮</div>
    <el-button type="primary" class="buttonActive_primary">主要按钮</el-button>
    <el-button type="primary" class="buttonActive_primary" icon="el-icon-search">搜索</el-button>
    <div class="spaceMargin">1.2、次要按钮</div>
    <el-button class="commonBtn">次要按钮</el-button>
    <el-button class="commonBtn" icon="el-icon-search">搜索</el-button>
    <div class="spaceMargin">1.3、取消按钮</div>
    <el-button class="cancelBtn">取消按钮</el-button>
    <el-button class="cancelBtn" icon="el-icon-search">搜索</el-button>
    <div class="spaceMargin">1.4、危险按钮</div>
    <el-button class="errorBtn">危险按钮</el-button>
    <el-button class="errorBtnplain">危险按钮</el-button>
    <div class="spaceMargin">1.5、失效按钮</div>
    <el-button class="disableBtn">失效按钮</el-button>

    <div class="headerTitle spaceMargin">
      2、下拉框=========================================================================================
    </div>
    <div class="spaceMargin">2.1、主下拉框</div>
    <div class="spaceMargin">2.1.1、单选下拉框</div>
    <el-select v-model="value" placeholder="请选择" clearable>
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
    <div class="spaceMargin">2.1.2、多选下拉框</div>
    <el-select multiple v-model="valueA" placeholder="请选择" clearable>
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
    <div class="spaceMargin">2.2、无border下拉框</div>
    <el-select v-model="value" placeholder="请选择" class="dropdown" clearable>
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
    <div class="spaceMargin">2.3、无border背景色下拉框</div>
    <el-select v-model="value" placeholder="请选择" class="noBorderBg" clearable>
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
    <div class="spaceMargin">2.4、下拉菜单</div>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link"> 下拉菜单<i class="el-icon-arrow-down el-icon--right"></i> </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item disabled>双皮奶</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="spaceMargin">2.5、Cascader 级联选择器</div>
    <el-cascader v-model="valueC" :options="optionsC"></el-cascader>
    <div class="headerTitle spaceMargin">
      3、输入框=========================================================================================
    </div>
    <div class="spaceMargin">3.1、主输入框</div>
    <el-input suffix-icon="el-icon-date" v-model="input" style="width: 300px" placeholder="请输入角色名称"></el-input>
    <div class="spaceMargin">3.2、失效输入框</div>
    <el-input
      prefix-icon="el-icon-search"
      v-model="input"
      disabled
      style="width: 300px"
      placeholder="请输入角色名称"
    ></el-input>

    <div class="spaceMargin">3.3、文本域</div>
    <el-input type="textarea" style="width: 300px" v-model="input"></el-input>

    <div class="headerTitle spaceMargin">
      4、日期选择器=========================================================================================
    </div>
    <div class="spaceMargin">4.1、时间范围选择器</div>
    <div class="spaceMargin">4.1.1、日期范围选择器</div>
    <el-date-picker
      v-model="value1"
      type="daterange"
      style="width: 400px"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    >
    </el-date-picker>
    <div class="spaceMargin">4.1.2、时间范围选择器</div>
    <el-date-picker
      v-model="value1"
      type="datetimerange"
      style="width: 400px"
      range-separator="-"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
    >
    </el-date-picker>
    <div class="spaceMargin">4.2、日期选择器</div>
    <el-date-picker type="date" placeholder="选择日期" v-model="date1" style="width: 400px"></el-date-picker>
    <div class="spaceMargin">4.3、年份选择器</div>
    <el-date-picker type="year" placeholder="选择年份" v-model="date3" style="width: 400px"></el-date-picker>
    <div class="spaceMargin">4.4、时间选择器</div>
    <el-time-picker placeholder="选择时间" v-model="date2" style="width: 400px"></el-time-picker>

    <div class="headerTitle spaceMargin">
      5、table表格=========================================================================================
    </div>
    <el-table
      :row-style="{ height: '0px' }"
      :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
      :data="tableData"
      header-cell-class-name="table_header"
      :cell-style="{ padding: '6px', 'text-align': 'center' }"
      style="width: 700px; margin: 20px 0"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column prop="date" label="日期" sortable width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" sortable width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
 <el-table
    :data="tableData"
    :border="false"
     :row-style="{ height: '0px' }"
      header-cell-class-name="table_header"
      :cell-style="{ padding: '6px', 'text-align': 'center' }"
      style="width: 800px; margin: 20px 0"
      :default-sort="{ prop: 'date', order: 'descending' }"
     :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
    >
    <el-table-column
      prop="date"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column label="配送信息">
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column label="地址">
        <el-table-column
          prop="province"
          label="省份"
          width="120">
        </el-table-column>
        <el-table-column
          prop="city"
          label="市区"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="300">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="邮编"
          width="120">
        </el-table-column>
      </el-table-column>
    </el-table-column>
  </el-table>
    <div class="headerTitle spaceMargin">
      6、分页=========================================================================================
    </div>
    <div class="spaceMargin">6.1、elementUI的分页器</div>
    <el-pagination background layout="prev, pager, next,total" :total="1000" class="paginationDiv"> </el-pagination>
    <div class="spaceMargin">6.2、自定义封装分页器，实际页面中多个地方使用，具体看实际功能列表</div>
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" />
    <div class="headerTitle spaceMargin">
      7、单选按钮=========================================================================================
    </div>
    <el-radio-group v-model="activeTabIndex">
      <el-radio :label="0">力导布局</el-radio>
      <el-radio :label="1">树形布局</el-radio>
    </el-radio-group>
    <div class="headerTitle spaceMargin">
      8、多选按钮=========================================================================================
    </div>
    <el-checkbox-group v-model="checkList">
      <el-checkbox label="复选框 A"></el-checkbox>
      <el-checkbox label="复选框 B"></el-checkbox>
      <el-checkbox label="复选框 C"></el-checkbox>
    </el-checkbox-group>
    <div class="headerTitle spaceMargin">
      9、Dialog弹窗=========================================================================================
    </div>
    <el-button type="primary" class="buttonActive_primary" @click="dialogVisible = true">点击打开Dialog</el-button>
    <el-dialog title="标题" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
      <span>何时使用：需要用户处理事务，又不希望跳转</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" class="cancelBtn">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <div class="headerTitle spaceMargin">
      10、Message消息提示=========================================================================================
    </div>
    <el-button :plain="true" @click="opensuccess" class="commonBtn">成功消息提示</el-button>
    <el-button :plain="true" @click="openwarn" class="commonBtn">警告消息提示</el-button>
    <el-button :plain="true" @click="openinfo" class="commonBtn">消息消息提示</el-button>
    <el-button :plain="true" @click="openerror" class="commonBtn">失败消息提示</el-button>
    <div class="headerTitle spaceMargin">
      11、Alert警告提示=========================================================================================
    </div>
    <el-alert
      title="成功提示的文案"
      type="success"
      description="文字说明文字说明文字说明文字说明文字说明文字说明"
      show-icon
      style="width: 400px"
    >
    </el-alert>
    <el-alert
      title="消息提示的文案"
      type="info"
      description="文字说明文字说明文字说明文字说明文字说明文字说明"
      show-icon
      style="width: 400px; margin: 10px 0"
    >
    </el-alert>
    <el-alert
      title="警告提示的文案"
      type="warning"
      description="文字说明文字说明文字说明文字说明文字说明文字说明"
      show-icon
      style="width: 400px"
    >
    </el-alert>
    <el-alert
      title="错误提示的文案"
      type="error"
      description="文字说明文字说明文字说明文字说明文字说明文字说明"
      show-icon
      style="width: 400px; margin: 10px 0"
    >
    </el-alert>
    <div class="headerTitle spaceMargin">
      12、Message弹窗【待修改：深色系弹窗背景色修改】=========================================================================================
    </div>
    <el-button class="commonBtn" @click="open1">点击弹出Message弹窗</el-button>
    <div class="headerTitle spaceMargin">
      13、Steps步骤条=========================================================================================
    </div>
    <div style="width: 40%" class="stepsrow">
      <el-steps :active="activerow" finish-status="success">
        <el-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></el-step>
        <el-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></el-step>
        <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
      </el-steps>
      <el-button style="margin-top: 12px" @click="next" class="commonBtn">下一步（横）</el-button>
      <el-button style="margin-top: 12px" @click="next1" class="commonBtn">下一步(竖)</el-button>
    </div>
    <div style="height: 300px" class="stepscolumn spaceMargin">
      <el-steps :active="activecolumn" finish-status="success" direction="vertical">
        <el-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></el-step>
        <el-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></el-step>
        <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
      </el-steps>
    </div>
    <div class="headerTitle spaceMargin">
      14、Silder滑块=========================================================================================
    </div>
    <div style="width: 40%">
      <el-slider v-model="value2"></el-slider>
    </div>
    <div class="headerTitle spaceMargin">
      15、tabs标签页=========================================================================================
    </div>
    <div class="spaceMargin">15.1、elementUI的tabs标签页</div>
    <el-tabs v-model="activeName" class="g-pageHeader">
      <el-tab-pane label="用户管理" name="first"></el-tab-pane>
      <el-tab-pane label="配置管理" name="second"></el-tab-pane>
    </el-tabs>
    <div class="spaceMargin">
      15.2、自定义的tabs切换按钮（横向，可传值，可传背景色和border色系，可控制深浅色系颜色）
    </div>
    <horizontalSwitchBtn style="margin-bottom: 10px"></horizontalSwitchBtn>
    <horizontalSwitchBtn :colorList="colorList" :borderList="borderList" :dataList="dataList"></horizontalSwitchBtn>
    <div class="spaceMargin">15.3、自定义的横向纵向tabs切换按钮（横向纵向都可以）</div>
    <div class="spaceMargin">15.3.1、横向</div>
    <verticalSwitchButton
      @selectBtn="selectBtn"
      :dataList="dataList1"
      buttonWidth="120px"
      buttonHeight="30px"
      style="width: 9%"
      btnDirection="row"
    ></verticalSwitchButton>
    <div class="spaceMargin">15.3.1、纵向</div>
    <verticalSwitchButton
      @selectBtn="selectBtn"
      :dataList="dataList1"
      buttonWidth="120px"
      buttonHeight="30px"
      style="width: 9%"
      btnDirection="column"
    ></verticalSwitchButton>
    <div class="headerTitle spaceMargin">
      16、自定义消息通知跑马灯组件=========================================================================================
    </div>
    <div class="marquee-fa" style="margin: 20px 0">
      <div class="marquee_head">
        <img src="@/assets/notice.png" alt="" style="width: 18px; height: 18px" />
        <p style="margin-left: 10px; width: 70px">通知公告：</p>
      </div>
      <Marquee>{{ val }}</Marquee>
    </div>
    <div class="headerTitle spaceMargin">
      18、echarts图表【未作封装以及大小适配】=========================================================================================
    </div>
    <chartsComponents
      :chart-data-options="dataOption"
      echartsType="pie1"
      style="width: 400px; height: 400px"
    ></chartsComponents>
    <chartsComponents
      :chart-data-options="dataOptionLine"
      echartsType="line1"
      style="width: 600px; height: 400px"
    ></chartsComponents>
    <chartsComponents
      :chart-data-options="dataZhuzhuang"
      echartsType="bar1"
      style="width: 600px; height: 400px"
    ></chartsComponents>
    <div id="lineContainer" ref="lineContainer" style="width: 50%; height: 410px"></div>
    <div class="headerTitle spaceMargin">
      18、上传图片/文件=========================================================================================
    </div>
    <div class="spaceMargin">18.1、图片上传</div>
    <el-upload
      class="avatar-uploader imageUpload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div class="spaceMargin">18.2、文件上传</div>
    <el-upload style="width: 400px;" class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <div style="margin: 40px 0">=================================end========================</div>
  </div>
</template>
<script>
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { mapState } from 'vuex';
import { CanvasRenderer } from 'echarts/renderers';
import * as echarts from 'echarts/core';
import { getFolderLineDataSet } from './index';
import { Message } from 'element-ui';
import horizontalSwitchBtn from '@/components/intelligentOilfield/horizontal-switch-button/index.vue';
import verticalSwitchButton from '@/components/intelligentOilfield/vertical-switch-button/index.vue';
// import * as echarts from "echarts";
import chartsComponents from '@/components/intelligentOilfield/echarts-com/index.vue';
import marquee from '@/components/intelligentOilfield/marquee-window/index.vue';

echarts.use([GridComponent, LegendComponent, TooltipComponent, LineChart, CanvasRenderer]);
const labelName = ['总值', '合格值'];

const getRate = 70;

const color = [
  {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: 'rgba(242, 164, 64, 1)', // 0% 处的颜色
      },
      {
        offset: 1,
        color: 'rgba(255, 213, 65, 1)', // 100% 处的颜色
      },
    ],
  },
  {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: 'rgba(29, 130, 255, 1)', // 0% 处的颜色
      },
      {
        offset: 1,
        color: 'rgba(0, 255, 246, 1)', // 100% 处的颜色
      },
    ],
  },
];
export default {
  components: {
    horizontalSwitchBtn,
    chartsComponents,
    marquee,
    verticalSwitchButton,
  },
  data() {
    return {
      imageUrl: '',
      dataList1: [
        { name: '生产曲线分析', isChecked: false },
        { name: '指标变化分析', isChecked: true },
        { name: '曲线对比分析', isChecked: false },
      ],
      date3: '',
      dataList: [],
      valueA: [],
      optionsC: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致',
                },
                {
                  value: 'fankui',
                  label: '反馈',
                },
                {
                  value: 'xiaolv',
                  label: '效率',
                },
                {
                  value: 'kekong',
                  label: '可控',
                },
              ],
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '侧向导航',
                },
                {
                  value: 'dingbudaohang',
                  label: '顶部导航',
                },
              ],
            },
          ],
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            {
              value: 'basic',
              label: 'Basic',
              children: [
                {
                  value: 'layout',
                  label: 'Layout 布局',
                },
                {
                  value: 'color',
                  label: 'Color 色彩',
                },
                {
                  value: 'typography',
                  label: 'Typography 字体',
                },
                {
                  value: 'icon',
                  label: 'Icon 图标',
                },
                {
                  value: 'button',
                  label: 'Button 按钮',
                },
              ],
            },
            {
              value: 'form',
              label: 'Form',
              children: [
                {
                  value: 'radio',
                  label: 'Radio 单选框',
                },
                {
                  value: 'checkbox',
                  label: 'Checkbox 多选框',
                },
                {
                  value: 'input',
                  label: 'Input 输入框',
                },
                {
                  value: 'input-number',
                  label: 'InputNumber 计数器',
                },
                {
                  value: 'select',
                  label: 'Select 选择器',
                },
                {
                  value: 'cascader',
                  label: 'Cascader 级联选择器',
                },
                {
                  value: 'switch',
                  label: 'Switch 开关',
                },
                {
                  value: 'slider',
                  label: 'Slider 滑块',
                },
                {
                  value: 'time-picker',
                  label: 'TimePicker 时间选择器',
                },
                {
                  value: 'date-picker',
                  label: 'DatePicker 日期选择器',
                },
                {
                  value: 'datetime-picker',
                  label: 'DateTimePicker 日期时间选择器',
                },
                {
                  value: 'upload',
                  label: 'Upload 上传',
                },
                {
                  value: 'rate',
                  label: 'Rate 评分',
                },
                {
                  value: 'form',
                  label: 'Form 表单',
                },
              ],
            },
            {
              value: 'data',
              label: 'Data',
              children: [
                {
                  value: 'table',
                  label: 'Table 表格',
                },
                {
                  value: 'tag',
                  label: 'Tag 标签',
                },
                {
                  value: 'progress',
                  label: 'Progress 进度条',
                },
                {
                  value: 'tree',
                  label: 'Tree 树形控件',
                },
                {
                  value: 'pagination',
                  label: 'Pagination 分页',
                },
                {
                  value: 'badge',
                  label: 'Badge 标记',
                },
              ],
            },
            {
              value: 'notice',
              label: 'Notice',
              children: [
                {
                  value: 'alert',
                  label: 'Alert 警告',
                },
                {
                  value: 'loading',
                  label: 'Loading 加载',
                },
                {
                  value: 'message',
                  label: 'Message 消息提示',
                },
                {
                  value: 'message-box',
                  label: 'MessageBox 弹框',
                },
                {
                  value: 'notification',
                  label: 'Notification 通知',
                },
              ],
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'menu',
                  label: 'NavMenu 导航菜单',
                },
                {
                  value: 'tabs',
                  label: 'Tabs 标签页',
                },
                {
                  value: 'breadcrumb',
                  label: 'Breadcrumb 面包屑',
                },
                {
                  value: 'dropdown',
                  label: 'Dropdown 下拉菜单',
                },
                {
                  value: 'steps',
                  label: 'Steps 步骤条',
                },
              ],
            },
            {
              value: 'others',
              label: 'Others',
              children: [
                {
                  value: 'dialog',
                  label: 'Dialog 对话框',
                },
                {
                  value: 'tooltip',
                  label: 'Tooltip 文字提示',
                },
                {
                  value: 'popover',
                  label: 'Popover 弹出框',
                },
                {
                  value: 'card',
                  label: 'Card 卡片',
                },
                {
                  value: 'carousel',
                  label: 'Carousel 走马灯',
                },
                {
                  value: 'collapse',
                  label: 'Collapse 折叠面板',
                },
              ],
            },
          ],
        },
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components',
            },
            {
              value: 'sketch',
              label: 'Sketch Templates',
            },
            {
              value: 'jiaohu',
              label: '组件交互文档',
            },
          ],
        },
      ],
      valueC: [],
      colorList: { dark: 'rgba(13,255,168,0.4)', light: 'red' },
      borderList: { dark: 'rgba(13,255,168,1)', light: 'green' },
      // 总条数
      total: 12,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      date1: '',
      date2: '',
      val: '安全生产创效益，违规操作酿祸端',
      activeName: 'first',
      input: '',
      checkList: ['复选框 A'],
      activeTabIndex: 0,
      checkBoxInput: '',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
      value1: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ],
      value: '',
      dataOption: {
        polar: {
          center: ['50%', '50%'],
          radius: ['38%', '76%'],
        },
        angleAxis: {
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          min: 0,
          max: 100,
          boundaryGap: ['0', '100'],
          startAngle: 90,
        },
        radiusAxis: {
          type: 'category',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          data: labelName,
          z: 10,
        },
        series: [
          {
            name: '',
            hoverAnimation: false,
            silent: true,
            type: 'pie',
            data: [{ name: '合格值', value: 100 }],
            z: 1,
            center: ['50%', '50%'],
            radius: ['27%', '68%'],
            label: {
              show: true,
              position: 'center',

              formatter: `{total|${getRate}%}\n\n{lname|合格值}`,
              rich: {
                total: {
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#0DDBFF',
                },
                lname: {
                  fontSize: 12,
                  color: '#FFF',
                },
              },
            },
            itemStyle: {
              color: 'rgba(62, 109, 255, 0.2)',
            },
          },
          {
            // hoverAnimation:false,
            name: labelName[0],
            barGap: '-100%',
            // silent:true,
            type: 'bar',
            data: [100],
            coordinateSystem: 'polar',
            z: 2,
            label: {
              show: false,
            },
            itemStyle: {
              color: color[0],
            },
          },
          {
            // hoverAnimation:false,
            roundCap: true,
            // silent:true,
            name: labelName[1],
            type: 'bar',
            coordinateSystem: 'polar',
            barGap: '-100%',
            data: [getRate],
            z: 3,
            label: {
              show: false,
            },
            itemStyle: {
              color: color[1],
            },
          },
        ],
      },
      dataOptionLine: {
        // 你的代码
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(0, 255, 233,0)',
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(255, 255, 255,1)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(0, 255, 233,0)',
                  },
                ],
                global: false,
              },
            },
          },
        },
        legend: {
          x: '46%',
          top: '0%',
          textStyle: {
            color: 'gray',
            fontSize: 12,
          },
          data: ['历史价格'],
        },

        grid: {
          top: '25%',
          left: '12%',
          right: '3%',
          bottom: '10%',
          // containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLine: {
              show: false,
              color: '#A582EA',
            },

            axisLabel: {
              color: 'gray',
              width: 100,
            },
            splitLine: {
              show: false,
            },
            boundaryGap: false,
            data: [
              '11/12',
              '11/13',
              '11/14',
              '11/15',
              '11/16',
              '11/17',
              '11/18',
              '11/19',
              '11/20',
              '11/21',
              '11/22',
              '11/23',
              '11/24',
              '11/25',
              '11/26',
              '11/27',
              '11/28',
              '11/29',
              '11/30',
              '12/01',
              '12/02',
              '12/03',
              '12/04',
              '12/05',
              '12/06',
              '12/07',
              '12/08',
              '12/09',
              '12/10',
              '12/11',
            ], // this.$moment(data.times).format("HH-mm") ,
          },
        ],

        yAxis: [
          {
            name: '单位：元',
            nameTextStyle: {
              color: 'gray',
              fontSize: 12,
            },
            type: 'value',
            min: 0,
            splitNumber: 10,
            splitLine: {
              show: true,
              lineStyle: {
                color: 'gray',
                opacity: 0.23,
              },
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              margin: 15,
              textStyle: {
                color: 'gray',
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: '历史价格',
            type: 'line',
            showAllSymbol: true,
            symbol: 'circle',
            symbolSize: 5,
            lineStyle: {
              normal: {
                color: '#2CABE3',
              },
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#2CABE3',
                fontSize: 10,
              },
            },
            itemStyle: {
              color: '#2CABE3',
              borderColor: '#2CABE3',
              borderWidth: 0,
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(81,150,164,0.3)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(81,150,164,0)',
                    },
                  ],
                  false,
                ),
              },
            },
            data: [
              100.08, 136.97, 142.37, 135.04, 159.28, 157.08, 66.14, 149.27, 186.26, 0, 0, 170.3, 111.31, 54.86, 119.06,
              109.57, 105.31, 34.87, 129.04, 35.33, 0, 31.51, 127.09, 136.76, 188.59, 142.03, 126.7, 133.33, 124.09,
              67.43,
            ], // data.values
          },
        ],
      },
      dataZhuzhuang: {
        backgroundColor: 'transparent',
        title: {
          show: true,
          text: '',
          textStyle: {
            align: 'rigth',
            color: 'gray',
            fontSize: 20,
          },
          top: '3%',
          left: '5%',
        },
        grid: {
          top: '28%',
          right: '10%',
          bottom: '18%', // 也可设置left和right设置距离来控制图表的大小
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(17,95,182,0.5)',
          textStyle: {
            color: '#fff',
          },
          // axisPointer: {
          //     type: "line",
          //     label: {
          //         show: false,
          //     }
          // },
          formatter: (pa) => {
            const oneDotHtml =
              '<span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:#1480C2"></span>';
            const twoDotHtml =
              '<span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:#8957A1"></span>';
            // return pa[0].name + pa[0].value
            return `${pa[0].name}<br/>${oneDotHtml}${pa[1].seriesName}：${pa[1].value}<br>${twoDotHtml}${pa[0].seriesName}：${pa[0].value}`;
          },
        },
        dataZoom: [
          {
            show: false,
            xAxisIndex: 0,
            type: 'slider',
            startValue: 0,
            endValue: this.end,
          },
        ],
        legend: {
          top: '20%',
          left: '40%',
          // icon: 'rect',
          textStyle: {
            padding: [0, 0, 0, 10],
            color: 'gray',
            fontSize: 14,
            lineHeight: 16,
          },
          itemGap: 50,
          itemHeight: 10,
          data: ['肥料', '农药'],
        },
        xAxis: {
          data: ['草堂镇', '白帝镇', '朱衣镇', '康乐镇', '永乐镇', '安坪镇'],
          axisLine: {
            show: true, // 隐藏X轴轴线
            lineStyle: {
              color: 'gray',
            },
          },
          axisTick: {
            show: false, // 隐藏X轴刻度
          },
          axisLabel: {
            show: true,
            textStyle: {
              padding: [5, 0, 0, 0],
              color: 'gray', // X轴文字颜色
            },
          },
        },
        yAxis: [
          {
            type: 'value',
            name: '吨',
            nameTextStyle: {
              color: 'gray',
              fontSize: 14,
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: 'rgba(33,35,98,1)',
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'gray',
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: 14,
                color: 'gray',
              },
            },
          },
          {
            type: 'value',
            // name: "同比",
            // nameTextStyle: {
            //     show: false,
            //     color: "#ebf8ac"
            // },
            position: 'right',
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: false,
              textStyle: {
                color: 'gray',
              },
            },
          },
          // {
          //     type: "value",
          //     // gridIndex: 1,
          //     min: 50,
          //     max: 100,
          //     splitNumber: 8,
          //     splitLine: {
          //         show: false
          //     },
          //     axisLine: {
          //         show: false
          //     },
          //     axisTick: {
          //         show: false
          //     },
          //     axisLabel: {
          //         show: false
          //     },
          //     splitArea: {
          //         show: true,
          //         areaStyle: {
          //             color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"]
          //         }
          //     }
          // }
        ],
        series: [
          {
            name: '农药',
            type: 'line',
            yAxisIndex: 1, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            smooth: false, // 平滑曲线显示
            showAllSymbol: true, // 显示所有图形。
            symbol: 'emptyCircle', // 标记的图形为实心圆
            symbolSize: 10, // 标记的大小
            itemStyle: {
              // 折线拐点标志的样式
              color: '#8957A1',
            },
            lineStyle: {
              color: '#8957A1',
            },
            // areaStyle:{
            //     color: 'transparent'
            //     // color: "rgba(5,140,255, 0.2)"
            // },
            data: [5, 5, 5, 5, 5, 5],
          },
          {
            name: '肥料',
            type: 'bar',
            barWidth: '30%',
            showBackground: false,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: 'red',
                  },
                  {
                    offset: 0,
                    color: '#1F0D5E',
                  },
                  {
                    offset: 1,
                    color: '#1480C2',
                  },
                ]),
              },
            },
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: 'gray',
                },
              },
            },
            data: [14, 16, 20, 7, 15, 11],
          },
        ],
      },
      lineContainer: '',
      lineChart: '',
      dialogVisible: false,
      showModal: false,
      title: '确认要删除这条信息吗？',
      content: '',
      loading: false,
      center: true,
      activerow: 0, // steps步骤条
      activecolumn: 0,
      value2: 50, // slider滑块
    };
  },
  computed: {
    ...mapState('setting', ['brandTheme', 'mode']),
  },
  watch: {
    brandTheme() {
      //   changeChartsTheme([this.lineChart])
    },
    mode() {
      this.renderCharts();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.updateContainer();
    });
    this.renderCharts();
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    selectBtn(item) {
      console.log('选中结果==', item);
    },
    open1() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'cancelBtn',
        type: 'warning',
      }).then(() => {
        console.log('tanchuang');
      });
    },
    open2() {
      this.$notify('info', {
        title: '标题名称',
        content: '用户表示操作引起一定后果的消息通知',
      }); // t-designer
    },
    // 调用Modal弹出对话框
    onShowModal() {
      this.content = '一系列的信息描述，可能会很长。也可以是很短同样也可以带标点。';
      this.showModal = true;
    },
    // Modal“取消”按钮回调
    onCancel() {
      this.showModal = false;
    },
    // Modal “确定”按钮回调
    onConfirm() {
      // this.loading = true // 开启加载状态
      this.showModal = false;
    },
    // message弹出框（四种）
    openwarn() {
      Message({
        type: 'warning',
        message: '这是一条提示消息，会主动消失',
      });
    },
    opensuccess() {
      Message({
        type: 'success',
        message: '这是一条成功消息，会主动消失',
      });
    },
    openinfo() {
      Message({
        message: '这是一条提示消息，会主动消失',
      });
    },
    openerror() {
      Message({
        type: 'error',
        message: '这是一条异常消息，会主动消失',
      });
    },
    next() {
      this.activerow += 1;
      if (this.activerow === 3) this.activerow = 0;
    },
    next1() {
      this.activecolumn += 1;
      if (this.activecolumn === 3) this.activecolumn = 0;
    },
    /** 采购商品申请趋势选择 */
    onMaterialChange(value) {
      const { chartColors } = this.$store.state.setting;

      this.lineChart.setOption(getFolderLineDataSet({ dateTime: value, ...chartColors }));
    },
    updateContainer() {
      this.lineChart.resize?.({
        width: this.lineContainer.clientWidth,
        height: this.lineContainer.clientHeight,
      });
    },
    renderCharts() {
      const { chartColors } = this.$store.state.setting;

      if (!this.lineContainer) {
        this.lineContainer = document.getElementById('lineContainer');
      }
      this.lineChart = echarts.init(this.lineContainer);
      this.lineChart.setOption(getFolderLineDataSet({ ...chartColors }));

      window.addEventListener('resize', this.updateContainer, false);
    },
  },
};
</script>

<style scoped>
.qiejiao {
  background: red;
  width: 50px;
  height: 50px;
  clip-path: polygon(0 30px, 100% 0, 100% 100%, 0 100%);
}
.topBox {
  display: flex;
}
.topRight {
  background: green;
  width: 200px;
  height: 50px;
}
.centerBox {
  width: 200px;
}
.eldialog ::v-deep.el-dialog {
  background: linear-gradient(to bottom, rgba(0, 162, 218, 0.3), rgba(0, 162, 218, 0.6));
}
.headerTitle {
  font-size: 16px;
  color: var(--lightBlueColor);
  font-weight: 700;
}
.demoClass .spaceMargin {
  padding: 15px 0;
}
</style>
