<template>
  <div class="demoClass">
    <!-- 常用组件一览大全 -->
    <div class="headerTitle spaceMargin">
      ====================================================常用组件一览大全========================================
    </div>
    <div class="headerTitle spaceMargin">
      系统主题样式，主要用字体大小============================================================================================
    </div>
    <div class="spaceMargin">
      0、深浅色系切换主题颜色
    </div>
    <div class="g-row-flex">
      <div style="background: #0075e9; width: 80px; height: 80px; color: #fff" class="g-row-flex-HV">
        浅色系
      </div>
      <div
        style="background: rgba(0, 222, 240, 1); width: 80px; height: 80px; color: #fff; margin: 0 20px"
        class="g-row-flex-HV"
      >
        深色系
      </div>
    </div>
    <div style="color: var(--light-blue-color); font-size: 16px; margin-top: 20px; font-weight: 700">
      代码直接使用【color:var(--light-blue-color)】可根据当前模式自动渲染颜色，其他颜色可参照src\style\theme\default.less文件定义的颜色变量
    </div>
    <div class="spaceMargin">
      0.1、系统主要字体大小说明
    </div>
    <div>
      <div class="primary-font-size">
        默认字体大小为14px，正文一般使用14号字体，代码中直接使用【class="primary-font-size"】
      </div>
      <div class="big-font-size">
        标题一般使用18号字体，代码中直接使用【class="big-font-size"】
      </div>
      <div style="font-weight: 700">
        其他字体大小/或常用公共布局样式可参照src\style\common-style.less文件中公开的类名
      </div>
    </div>
    <div class="headerTitle spaceMargin">
      1、按钮============================================================================================
    </div>
    <div class="spaceMargin">
      1.1、主要按钮
    </div>
    <el-button type="primary" class="buttonActive_primary">
      主要按钮
    </el-button>
    <el-button type="primary" class="buttonActive_primary" icon="el-icon-search">
      搜索
    </el-button>
    <div class="spaceMargin">
      1.2、次要按钮
    </div>
    <el-button class="commonBtn">
      次要按钮
    </el-button>
    <el-button class="commonBtn" icon="el-icon-search">
      搜索
    </el-button>
    <div class="spaceMargin">
      1.3、取消按钮
    </div>
    <el-button class="cancelBtn">
      取消按钮
    </el-button>
    <el-button class="cancelBtn" icon="el-icon-search">
      搜索
    </el-button>
    <div class="spaceMargin">
      1.4、危险按钮
    </div>
    <el-button class="errorBtn">
      危险按钮
    </el-button>
    <el-button class="errorBtnplain">
      危险按钮
    </el-button>
    <div class="spaceMargin">
      1.5、失效按钮
    </div>
    <el-button class="disableBtn">
      失效按钮
    </el-button>

    <div class="headerTitle spaceMargin">
      2、下拉框=========================================================================================
    </div>
    <div class="spaceMargin">
      2.1、主下拉框
    </div>
    <div class="spaceMargin">
      2.1.1、单选下拉框
    </div>
    <el-select v-model="value" placeholder="请选择" clearable>
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <div class="spaceMargin">
      2.1.2、多选下拉框(tag展示)
    </div>
    <el-select
      v-model="valueA"
      multiple
      placeholder="请选择"
      clearable
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <!-- TODO: Maybe change back -->
    <!-- <div class="spaceMargin">
      2.1.3、多选下拉框（合并为一段文字展示）
    </div>
    <el-select
      v-model="valueA"
      collapse-tags
      multiple
      placeholder="请选择"
      clearable
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select> -->
    <div class="spaceMargin">
      2.1.3、多选下拉框【文字过长时展示：添加class="collapseTags"如下】
    </div>
    <el-select
      v-model="valueA"
      class="collapseTags"
      collapse-tags
      multiple
      placeholder="请选择"
      clearable
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <div class="spaceMargin">
      2.2、无border下拉框【注意：不推荐做为搜索框进行使用】
    </div>
    <el-select
      v-model="value"
      placeholder="请选择"
      class="dropdown"
      clearable
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <div class="spaceMargin">
      2.3、无border背景色下拉框【注意：不推荐做为搜索框进行使用】
    </div>
    <el-select
      v-model="value"
      placeholder="请选择"
      class="noBorderBg"
      clearable
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <div class="spaceMargin">
      2.4、下拉菜单
    </div>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link"> 下拉菜单<i class="el-icon-arrow-down el-icon--right" /> </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item disabled>
          双皮奶
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="spaceMargin">
      2.5、Cascader 级联选择器
    </div>
    <el-cascader v-model="valueC" :options="optionsC" />
    <div class="spaceMargin">
      2.6、下拉框（内容为树形控件）
    </div>
    <treeselect
      v-model="selectValue"
      style="width: 215px;"
      :options="deptOptions"
      :show-count="true"
      placeholder="请选择"
    >
      <label
        slot="option-label"
        slot-scope="{ node, labelClassName }"
        :class="labelClassName"
        :title="node.label"
      >{{ node.label }}
      </label>
    </treeselect>
    <div class="spaceMargin">
      2.7、下拉框-选中滑过高亮
    </div>
    <el-select
      v-model="value"
      placeholder="请选择"
      class="selectColor"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <div class="headerTitle spaceMargin">
      3、输入框=========================================================================================
    </div>
    <div class="spaceMargin">
      3.1、主输入框
    </div>
    <el-input
      v-model="input"
      suffix-icon="el-icon-date"
      style="width: 300px"
      placeholder="请输入角色名称"
    />
    <div class="spaceMargin">
      3.2、失效输入框
    </div>
    <el-input
      v-model="input"
      prefix-icon="el-icon-search"
      disabled
      style="width: 300px"
      placeholder="请输入角色名称"
    />
    <div class="spaceMargin">
      3.3、背景蓝色无border输入框
    </div>
    <el-input
      v-model="input"
      suffix-icon="el-icon-search"
      class="noBorderBlueBg"
      style="width: 300px"
      placeholder="请输入角色名称"
    />

    <div class="spaceMargin">
      3.4、文本域
    </div>
    <el-input v-model="input" type="textarea" style="width: 300px" />

    <div class="headerTitle spaceMargin">
      4、日期选择器=========================================================================================
    </div>
    <div class="spaceMargin">
      4.1、时间范围选择器
    </div>
    <div class="spaceMargin">
      4.1.1、日期范围选择器
    </div>
    <el-date-picker
      v-model="value1"
      type="daterange"
      style="width: 400px"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    />
    <div class="spaceMargin">
      4.1.2、时间范围选择器
    </div>
    <el-date-picker
      v-model="value1"
      type="datetimerange"
      style="width: 400px"
      range-separator="-"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
    />
    <div class="spaceMargin">
      4.1.3、月份范围选择器
    </div>
    <el-date-picker
      v-model="value1"
      type="monthrange"
      style="width: 400px"
      range-separator="-"
      start-placeholder="开始月份"
      end-placeholder="结束月份"
    />
    <div class="spaceMargin">
      4.1.3、年份范围选择器
    </div>
    <year-range
      v-model="yearRange"
    />
    <div class="spaceMargin">
      4.1.4、日期范围选择器-选中滑过高亮
    </div>
    <el-date-picker
      v-model="value1"
      class="datePicker_changeColor"
      type="daterange"
      style="width: 400px"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    />
    <div class="spaceMargin">
      4.2、日期选择器
    </div>
    <el-date-picker
      v-model="date1"
      type="date"
      placeholder="选择日期"
      style="width: 400px"
    />
    <div class="spaceMargin">
      4.3、年份选择器
    </div>
    <el-date-picker
      v-model="date3"
      type="year"
      placeholder="选择年份"
      style="width: 400px"
    />
    <div class="spaceMargin">
      4.4、时间选择器
    </div>
    <el-time-picker v-model="date2" placeholder="选择时间" style="width: 400px" />
    <div class="spaceMargin">
      4.5、月度选择器
    </div>
    <el-date-picker
      v-model="date4"
      type="month"
      placeholder="选择月"
      style="width: 400px"
    />
    <div class="headerTitle spaceMargin">
      5、table表格=========================================================================================
    </div>
    <div class="spaceMargin">
      5.1、普通表格（列固定）
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
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180"
        fixed
      />
      <el-table-column
        prop="name"
        label="姓名"
        sortable
        width="180"
      />
      <el-table-column prop="address" label="地址" />
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180"
      />
      <el-table-column
        prop="name"
        label="姓名"
        sortable
        width="180"
      />
      <el-table-column prop="address" label="地址" />
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180"
      />
      <el-table-column
        prop="name"
        label="姓名"
        sortable
        width="180"
      />
      <el-table-column prop="address" label="地址" />

      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180"
      />
      <el-table-column
        prop="name"
        label="姓名"
        sortable
        width="180"
      />
      <el-table-column prop="address" label="地址" fixed="right" />
    </el-table>
    <div class="spaceMargin">
      5.2、表格头部合并
    </div>
    <el-table
      ref="mainTable"
      :data="tableData1"
      :border="false"
      :row-style="{ height: '0px' }"
      header-cell-class-name="table_header"
      :cell-style="{ padding: '6px', 'text-align': 'center' }"
      style="width: 800px; margin: 20px 0"
      :default-sort="{ prop: 'date', order: 'descending' }"
      :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
    >
      <el-table-column
        fixed
        prop="date"
        label="日期"
        width="150"
      />
      <el-table-column label="配送信息">
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column label="地址">
          <el-table-column prop="province" label="省份" width="120" />
          <el-table-column prop="city" label="市区" width="120" />
          <el-table-column prop="address" label="地址" width="300" />
          <el-table-column prop="zip" label="邮编" width="120" />
        </el-table-column>
      </el-table-column>
      <el-table-column
        fixed="right"
        prop="date"
        label="操作"
        width="150"
      />
    </el-table>
    <div class="spaceMargin">
      5.3、头部带筛选的表格
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
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180"
        fixed
      />
      <el-table-column
        :render-header="renderSpecNameHeader"
        prop="name"
        label="姓名"
        sortable
        width="180"
      >
        <template slot-scope="scope">
          {{ scope.row.name }}33
        </template>
      </el-table-column>
      <el-table-column prop="address" :render-header="renderSpecNameHeader" label="地址" />
    </el-table>
    <div class="spaceMargin">
      5.4、头部两行展示
    </div>
    <el-table
      class="doubleHeader"
      :row-style="{ height: '0px' }"
      :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
      :data="tableData"
      header-cell-class-name="table_header"
      :cell-style="{ padding: '6px', 'text-align': 'center' }"
      style="width: 700px; margin: 20px 0"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180"
        fixed
      />
      <el-table-column
        label-class-name="twoRowHeader"
        prop="name"
        label="姓名"
        width="180"
      >
        <template #header>
          <div>
            <span>试算当前吸水指数</span>
            <br>
            <span style="font-size: 12px">[m/(d·MPa)]</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址" align="left" />
      <el-table-column
        label-class-name="twoRowHeader"
        prop="date"
        label="日期"
        sortable
        width="180"
        align="left"
      >
        <template #header>
          <div class="headerSortRow1">
            <span>试算当前吸水指数</span>
            <br>
            <span style="font-size: 12px">[[m/(d·MPa)]]</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        sortable
        width="180"
      />
      <el-table-column prop="address" label="地址" />
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180"
      />
      <el-table-column
        prop="name"
        label="姓名"
        sortable
        width="180"
      />
      <el-table-column prop="address" label="地址" />

      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180"
      />
      <el-table-column
        prop="name"
        label="姓名"
        sortable
        width="180"
      />
      <el-table-column prop="address" label="地址" fixed="right" />
    </el-table>
    <div class="spaceMargin">
      5.5、行内编辑表格
    </div>
    <el-button
      icon="el-icon-edit-outline"
      size="mini"
      type="primary"
      class="buttonActive_primary"
      @click="redact"
    >
      编辑
    </el-button>
    <el-button
      icon="el-icon-document-checked"
      size="mini"
      type="primary"
      class="buttonActive_primary"
      @click="save"
    >
      保存
    </el-button>
    <el-table
      :row-style="{ height: '0px' }"
      :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
      :data="tableData"
      header-cell-class-name="table_header"
      :cell-style="{ padding: '6px', 'text-align': 'center' }"
      style="width: 1000px; margin: 20px 0"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180"
      >
        <template slot-scope="scope">
          <span v-if="isDisabled[scope.$index]">{{ scope.row.date }}</span>
          <span v-else> <el-input v-model="scope.row.date" size="small" /></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        sortable
        width="180"
      >
        <template slot-scope="scope">
          <span v-if="isDisabled[scope.$index]">{{ scope.row.name }}</span>
          <span v-else> <el-input v-model="scope.row.name" size="small" /></span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址">
        <template slot-scope="scope">
          <span v-if="isDisabled[scope.$index]">{{ scope.row.address }}</span>
          <span v-else> <el-input v-model="scope.row.address" size="small" /></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180"
      />
      <el-table-column
        prop="name"
        label="姓名"
        sortable
        width="180"
      />
      <el-table-column prop="address" label="地址" />
    </el-table>
    <div class="spaceMargin">
      5.5、header可过滤表格
    </div>
    <el-table
      ref="filterTable"
      class="filterTable"
      :data="tableDataFilter"
      style="width: 540px"
      :row-style="{ height: '0px' }"
      :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
      header-cell-class-name="table_header"
      :cell-style="{ padding: '6px', 'text-align': 'center' }"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180"
        column-key="date"
        :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
        :filter-method="filterHandler"
      />
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
      />
      <el-table-column
        prop="address"
        label="地址"
        width="180"
        :formatter="formatter"
      />
    </el-table>
    <div class="headerTitle spaceMargin">
      6、分页=========================================================================================
    </div>
    <div class="spaceMargin">
      6.1、elementUI的分页器
    </div>
    <el-pagination
      background
      layout="prev, pager, next,total"
      :total="1000"
      class="paginationDiv"
    />
    <div class="spaceMargin">
      6.2、自定义封装分页器，实际页面中多个地方使用，具体看实际功能列表
    </div>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
    />
    <div class="spaceMargin">
      6.3、small小型无背景色小分页器
    </div>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      small
      :background="true"
      class="smallNoBg"
    />
    <div class="headerTitle spaceMargin">
      7、单选按钮=========================================================================================
    </div>
    <div class="spaceMargin">
      7.1、el-radio-group按钮样式单选框组
    </div>
    <el-radio-group v-model="activeTabIndex">
      <el-radio :label="0">
        力导布局
      </el-radio>
      <el-radio :label="1">
        树形布局
      </el-radio>
    </el-radio-group>
    <div class="spaceMargin">
      7.2、el-radio-group按钮样式【建议作为第三级标题】
    </div>
    <el-radio-group v-model="radio1">
      <el-radio-button label="上海" />
      <el-radio-button label="北京" />
      <el-radio-button label="广州" />
      <el-radio-button label="深圳" />
    </el-radio-group>
    <div class="headerTitle spaceMargin">
      8、多选按钮=========================================================================================
    </div>
    <el-checkbox-group v-model="checkList">
      <el-checkbox label="复选框 A" />
      <el-checkbox label="复选框 B" />
      <el-checkbox label="复选框 C" />
    </el-checkbox-group>
    <div class="headerTitle spaceMargin">
      9、Dialog弹窗=========================================================================================
    </div>
    <el-button type="primary" class="buttonActive_primary" @click="dialogVisible = true">
      点击打开Dialog
    </el-button>
    <el-dialog
      title="标题"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
    >
      <span>何时使用：需要用户处理事务，又不希望跳转</span>
      <span slot="footer" class="dialog-footer">
        <el-button class="cancelBtn" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" class="buttonActive_primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <div class="headerTitle spaceMargin">
      10.1、Message消息提示=========================================================================================
    </div>
    <el-button :plain="true" class="commonBtn" @click="opensuccess">
      成功消息提示
    </el-button>
    <el-button :plain="true" class="commonBtn" @click="openwarn">
      警告消息提示
    </el-button>
    <el-button :plain="true" class="commonBtn" @click="openinfo">
      消息消息提示
    </el-button>
    <el-button :plain="true" class="commonBtn" @click="openerror">
      失败消息提示
    </el-button>
    <div class="headerTitle spaceMargin">
      10.2、Notification通知提示=========================================================================================
    </div>
    <el-button :plain="true" class="commonBtn" @click="opensuccess1">
      右侧成功消息提示
    </el-button>
    <el-button :plain="true" class="commonBtn" @click="openwarn1">
      右侧警告消息提示
    </el-button>
    <el-button :plain="true" class="commonBtn" @click="openinfo1">
      右侧消息消息提示
    </el-button>
    <el-button :plain="true" class="commonBtn" @click="openerror1">
      右侧失败消息提示
    </el-button>
    <div class="headerTitle spaceMargin">
      11、Alert警告提示=========================================================================================
    </div>
    <el-alert
      title="成功提示的文案"
      type="success"
      description="文字说明文字说明文字说明文字说明文字说明文字说明"
      show-icon
      style="width: 400px"
    />
    <el-alert
      title="消息提示的文案"
      type="info"
      description="文字说明文字说明文字说明文字说明文字说明文字说明"
      show-icon
      style="width: 400px; margin: 10px 0"
    />
    <el-alert
      title="警告提示的文案"
      type="warning"
      description="文字说明文字说明文字说明文字说明文字说明文字说明"
      show-icon
      style="width: 400px"
    />
    <el-alert
      title="错误提示的文案"
      type="error"
      description="文字说明文字说明文字说明文字说明文字说明文字说明"
      show-icon
      style="width: 400px; margin: 10px 0"
    />
    <div class="headerTitle spaceMargin">
      12、Message弹窗【待修改：深色系弹窗背景色修改】=========================================================================================
    </div>
    <el-button class="commonBtn" @click="open1">
      点击弹出Message弹窗
    </el-button>
    <div class="headerTitle spaceMargin">
      13、Steps步骤条=========================================================================================
    </div>
    <div style="width: 40%" class="stepsrow">
      <el-steps :active="activerow" finish-status="success">
        <el-step title="步骤 1" description="这是一段很长很长很长的描述性文字" />
        <el-step title="步骤 2" description="这是一段很长很长很长的描述性文字" />
        <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字" />
      </el-steps>
      <el-button style="margin-top: 12px" class="commonBtn" @click="next">
        下一步（横）
      </el-button>
      <el-button style="margin-top: 12px" class="commonBtn" @click="next1">
        下一步(竖)
      </el-button>
    </div>
    <div style="width: 300px; height: 300px" class="stepscolumn spaceMargin">
      <el-steps :active="activecolumn" finish-status="success" direction="vertical">
        <el-step title="步骤 1" description="这是一段很长很长很长的描述性文字" />
        <el-step title="步骤 2" description="这是一段很长很长很长的描述性文字" />
        <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字" />
      </el-steps>
    </div>
    <div class="headerTitle spaceMargin">
      14、Silder滑块=========================================================================================
    </div>
    <div style="width: 40%">
      <el-slider v-model="value2" />
    </div>
    <div class="headerTitle spaceMargin">
      15、tabs标签页=========================================================================================
    </div>
    <div class="spaceMargin">
      15.1、elementUI的tabs标签页【建议作为第一级标题】
    </div>
    <el-tabs v-model="activeName" class="g-pageHeader" style="width: 350px">
      <el-tab-pane label="开发生产中心" name="1" />
      <el-tab-pane label="安全管理中心" name="2" />
      <el-tab-pane label="设备设施中心" name="3" />
      <el-tab-pane label="通用技术中心" name="4" />
    </el-tabs>
    <div class="spaceMargin">
      15.2、自定义的tabs切换按钮（横向，可传值，可传背景色和border色系，可控制深浅色系颜色）
    </div>
    <horizontal-switch-btn style="margin-bottom: 10px" />
    <horizontal-switch-btn :color-list="colorList" :border-list="borderList" :data-list="dataList" />
    <div class="spaceMargin">
      15.3、自定义的横向纵向tabs切换按钮（横向纵向都可以）
    </div>
    <div class="spaceMargin">
      15.3.1、横向【建议作为第二级标题】
    </div>
    <vertical-switch-button
      :data-list="dataList1"
      button-width="120px"
      button-height="30px"
      style="width: 9%"
      btn-direction="row"
      @selectBtn="selectBtn"
    />
    <div class="spaceMargin">
      15.3.1、纵向
    </div>
    <vertical-switch-button
      :data-list="dataList1"
      button-width="120px"
      button-height="30px"
      style="width: 9%"
      btn-direction="column"
      @selectBtn="selectBtn"
    />
    <div class="headerTitle spaceMargin">
      16、自定义消息通知跑马灯组件=========================================================================================
    </div>
    <div class="marquee-fa" style="margin: 20px 0">
      <div class="marquee_head">
        <!-- <img src="@/assets/notice.png" alt="" style="width: 18px; height: 18px"> -->
        <p style="margin-left: 10px; width: 90px">
          通知公告：
        </p>
      </div>
      <marquee class="scrollMarquee">
        {{ val }}
      </marquee>
    </div>
    <div class="headerTitle spaceMargin">
      17、上传图片/文件=========================================================================================
    </div>
    <div class="spaceMargin">
      17.1、图片上传
    </div>
    <file-upload
      v-model="model1.appImg"
      :limit="1"
      :is-picture-card="true"
      :is-show-tip="false"
      biz-path="picture"
      bucket-name="zhy"
    />
    <div class="spaceMargin">
      17.2、文件上传
    </div>
    <file-upload
      v-model="model2.appImg"
      style="width: 400px"
      :limit="1"
      :is-show-tip="false"
      biz-path="picture"
      bucket-name="zhy"
    />
    <div class="headerTitle spaceMargin">
      18、标题栏=========================================================================================
    </div>
    <div class="pageHeader">
      我是标题栏
    </div>
    <div class="headerTitle spaceMargin">
      19、进度条=========================================================================================
    </div>
    <div class="spaceMargin">
      19.1、大号进度条
    </div>
    <el-progress :percentage="50" style="width: 400px" />
    <el-progress :percentage="70" style="width: 400px" />
    <el-progress :percentage="100" status="success" style="width: 400px" />
    <el-progress :percentage="80" status="warning" style="width: 400px" />
    <el-progress :percentage="50" status="exception" style="width: 400px" />
    <el-progress
      type="circle"
      :stroke-width="4"
      :width="80"
      :percentage="0"
    />
    <el-progress
      type="circle"
      :stroke-width="4"
      :width="80"
      :percentage="68"
    />
    <el-progress
      type="circle"
      :stroke-width="4"
      :width="80"
      :percentage="100"
      status="success"
    />
    <el-progress
      type="circle"
      :stroke-width="4"
      :width="80"
      :percentage="70"
      status="warning"
    />
    <el-progress
      type="circle"
      :stroke-width="4"
      :width="80"
      :percentage="50"
      status="exception"
    />
    <div class="spaceMargin">
      19.2、小号进度条
    </div>
    <el-progress
      :percentage="50"
      style="width: 200px"
      class="smallProgress"
      :stroke-width="5"
    />
    <el-progress
      :percentage="70"
      style="width: 200px"
      class="smallProgress"
      :stroke-width="5"
    />
    <el-progress
      :percentage="100"
      status="success"
      style="width: 200px"
      class="smallProgress"
      :stroke-width="5"
    />
    <el-progress
      :percentage="80"
      status="warning"
      style="width: 200px"
      class="smallProgress"
      :stroke-width="5"
    />
    <el-progress
      :percentage="50"
      status="exception"
      style="width: 200px"
      class="smallProgress"
      :stroke-width="5"
    />
    <el-progress
      type="circle"
      :stroke-width="2"
      :width="40"
      :percentage="0"
    />
    <el-progress
      type="circle"
      :stroke-width="2"
      :width="40"
      :percentage="68"
    />
    <el-progress
      type="circle"
      :stroke-width="2"
      :width="40"
      :percentage="100"
      status="success"
    />
    <el-progress
      type="circle"
      :stroke-width="2"
      :width="40"
      :percentage="70"
      status="warning"
    />
    <el-progress
      type="circle"
      :stroke-width="2"
      :width="40"
      :percentage="50"
      status="exception"
    />
    <div class="headerTitle spaceMargin">
      20、Result结果=========================================================================================
    </div>
    <div style="display: flex">
      <el-result icon="success" title="应用创建成功" sub-title="这是一句创建成功的描述这是一句创建成功的描述">
        <template slot="extra">
          <el-button type="primary" class="buttonActive_primary" size="medium">
            创建应用
          </el-button>
          <el-button class="cancelBtn" size="medium">
            返回列表
          </el-button>
        </template>
      </el-result>
      <el-result icon="warning" title="应用创建失败" sub-title="这是一句创建失败的描述这是一句创建失败的描述">
        <template slot="extra">
          <el-button type="primary" class="buttonActive_primary" size="medium">
            创建应用
          </el-button>
          <el-button class="cancelBtn" size="medium">
            返回列表
          </el-button>
        </template>
      </el-result>
    </div>
    <div class="headerTitle spaceMargin">
      21、表单=========================================================================================
    </div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      style="width: 600px"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select
          v-model="ruleForm.region"
          placeholder="请选择活动区域"
          style="width: 300px"
          clearable
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker
              v-model="ruleForm.date1"
              type="date"
              placeholder="选择日期"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col class="lineStyle" :span="2">
          -
        </el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker v-model="ruleForm.date2" placeholder="选择时间" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送" prop="delivery">
        <el-switch v-model="ruleForm.delivery" />
      </el-form-item>
      <el-form-item label="活动性质" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="美食/餐厅线上活动" name="type" />
          <el-checkbox label="地推活动" name="type" />
          <el-checkbox label="线下主题活动" name="type" />
          <el-checkbox label="单纯品牌曝光" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="线上品牌商赞助" />
          <el-radio label="线下场地免费" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="buttonActive_primary" @click="submitForm('ruleForm')">
          立即创建
        </el-button>
        <el-button class="cancelBtn" @click="resetForm('ruleForm')">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <div class="headerTitle spaceMargin">
      22、Transfer穿梭窗=========================================================================================
    </div>
    <el-transfer
      v-model="value5"
      :left-default-checked="[2, 3]"
      :right-default-checked="[1]"
      :titles="['源列表', '目的列表']"
      :data="data"
      @change="handleChange"
    />
    <div class="headerTitle spaceMargin">
      23、页面通用面板【具体使用可参照列表示例页】=========================================================================================
    </div>
    <div class="spaceMargin">
      23.1、老版带标题
    </div>
    <div>注意：右上角放大按钮默认为隐藏，如使用请将属性:show-btn="true"即可</div>
    <page-panel
      header-title="我是标题"
      style="height: 600px"
      :show-btn="false"
      @zoom-out-com="zoomOutCom"
    >
      <!-- <div>这里显示主内容，padding为20px</div> -->
      <el-table
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
        :data="tableData"
        header-cell-class-name="table_header"
        :cell-style="{ padding: '6px', 'text-align': 'center' }"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column
          prop="date"
          label="日期"
          sortable
          width="180"
        />
        <el-table-column
          prop="name"
          label="姓名"
          sortable
          width="180"
        />
        <el-table-column prop="address" label="地址" />
        <el-table-column
          prop="date"
          label="日期"
          sortable
          width="180"
        />
        <el-table-column
          prop="name"
          label="姓名"
          sortable
          width="180"
        />
        <el-table-column prop="address" label="地址" />
      </el-table>
    </page-panel>
    <div class="spaceMargin">
      23.2、新版不带标题【注意：仅推荐单列表页面使用该组件作为列表面板】
    </div>
    <div>注意：右上角放大按钮默认为隐藏，如使用请将属性:show-btn="true"即可</div>
    <page-panel-new style="height: 600px" :show-btn="false" @zoom-out-com="zoomOutComNew" />
    <div class="headerTitle spaceMargin">
      24、自定义info信息窗【建议只在拖拽面板页面使用】=========================================================================================
    </div>
    <div>注意：右上角放大按钮默认为隐藏，如使用请将属性:is-show-max-btn="true"即可</div>
    <info-window
      info-width="400px"
      info-height="300px"
      header-title="开采现状分析"
      :is-show-max-btn="false"
    >
      <div style="padding: 20px">
        放主内容
      </div>
    </info-window>
    <div class="headerTitle spaceMargin">
      25、Header搜索框部分=========================================================================================
    </div>
    <header-search style="height: 100px" />
    <div class="headerTitle spaceMargin">
      26、树形控件=========================================================================================
    </div>
    <div class="spaceMargin">
      26.1、普通树形控件
    </div>
    <div style="width: 20%">
      <el-tree
        ref="tree"
        :highlight-current="true"
        :data="deptOptions"
        :props="defaultProps"
        :expand-on-click-node="false"
        default-expand-all
      />
    </div>
    <div class="spaceMargin">
      26.2、带搜索树形控件
    </div>
    <div style="width: 20%">
      <el-input
        v-model="treeSelectName"
        placeholder="请输入"
        clearable
        prefix-icon="el-icon-search"
      />
      <el-tree
        ref="tree"
        :highlight-current="true"
        :data="deptOptions"
        :props="defaultProps"
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        default-expand-all
      />
    </div>
    <div class="spaceMargin">
      26.3、树形多选控件【子系统提供】
    </div>
    <div style="width: 20%; height: 600px">
      <tree-multiple-selection />
    </div>
    <div style="margin: 40px 0">
      =================================end========================
    </div>
  </div>
</template>
<script>
import { Message, Notification } from "element-ui";
import horizontalSwitchBtn from "@/components/intelligentOilfield/horizontal-switch-button/index.vue";
import verticalSwitchButton from "@/components/intelligentOilfield/vertical-switch-button/index.vue";
import marquee from "@/components/intelligentOilfield/marquee-window/index.vue";
import FileUpload from "@/components/intelligentOilfield/FileUpload/index.vue";
import searchTableMixin from "@/pages/common/mixins/searchTableMixin";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import yearRange from "@/components/intelligentOilfield/year-range/index.vue";
import treeMultipleSelection from "@/components/intelligentOilfield/tree_multiple_selection/index.vue";

export default {
  components: {
    horizontalSwitchBtn,
    marquee,
    verticalSwitchButton,
    FileUpload,
    Treeselect,
    yearRange,
    treeMultipleSelection
  },
  mixins: [searchTableMixin],
  data() {
    const generateData = () => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        });
      }
      return data;
    };
    return {
      tableDataFilter: [{
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄",
        tag: "家"
      }, {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄",
        tag: "公司"
      }, {
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1519 弄",
        tag: "家"
      }, {
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1516 弄",
        tag: "公司"
      }],
      date4: "",
      yearRange: [],
      selectValue: undefined,
      treeSelectName: "",
      deptOptions: [
        {
          id: "1",
          label: "一级 1",
          children: [{
            id: "2",
            label: "二级 1-1",
            children: [{
              label: "三级 1-1-1",
              id: "3"
            }]
          }]
        }, {
          id: "4",
          label: "一级 2",
          children: [{
            id: "5",
            label: "二级 2-1",
            children: [{
              id: "6",
              label: "三级 2-1-1"
            }]
          }, {
            id: "7",
            label: "二级 2-2",
            children: [{
              id: "8",
              label: "三级 2-2-1"
            }]
          }]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      radio1: "上海",
      tableData1: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ],
      imageUrl: "",
      dataList1: [
        { name: "生产曲线分析", isChecked: false },
        { name: "指标变化分析", isChecked: true },
        { name: "曲线对比分析", isChecked: false }
      ],
      date3: "",
      dataList: [],
      valueA: [],
      optionsC: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      valueC: [],
      colorList: { dark: "rgba(13,255,168,0.4)", light: "red" },
      borderList: { dark: "rgba(13,255,168,1)", light: "green" },
      // 总条数
      total: 12,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      date1: "",
      date2: "",
      val: "安全生产创效益，违规操作酿祸端",
      activeName: "1",
      input: "",
      checkList: ["复选框 A"],
      activeTabIndex: 0,
      checkBoxInput: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      isDisabled: [true, true, true, true],
      value1: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      lineContainer: "",
      lineChart: "",
      dialogVisible: false,
      showModal: false,
      title: "确认要删除这条信息吗？",
      content: "",
      loading: false,
      center: true,
      activerow: 0, // steps步骤条
      activecolumn: 0,
      value2: 50, // slider滑块
      model1: {
        appImg: ""
      },
      model2: {
        appImg: ""
      },
      // 自定义进度条颜色，使用:color="colors"
      colors: "rgba(166, 29, 36, 1)",
      // 表单
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符" }
        ],
        region: [{ required: true, message: "请选择活动区域" }],
        date1: [{ type: "date", required: true, message: "请选择日期" }],
        date2: [{ type: "date", required: true, message: "请选择时间" }],
        type: [{ type: "array", required: true, message: "请至少选择一个活动性质" }],
        resource: [{ required: true, message: "请选择活动资源" }],
        desc: [{ required: true, message: "请填写活动形式" }]
      },
      //   transfer穿梭窗
      data: generateData(),
      value5: [1],
      value4: [1]
    };
  },
  watch: {
    treeSelectName(val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.mainTable.doLayout();
    });
  },
  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column.property;
      return row[property] === value;
    },
    zoomOutCom() {},
    zoomOutComNew() {},
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    redact() {
      for (let i = 0; i < this.isDisabled.length - 1; i++) {
        this.$set(this.isDisabled, i, false);
      }
    },
    save() {
      for (let i = 0; i < this.isDisabled.length - 1; i++) {
        this.$set(this.isDisabled, i, true);
      }
    },
    filterParamsChange() {
      // 可以在此方法中进行数据查询，通过this.filterParams获取表格header的搜索项以及值
    },
    format() {
      // 有参数percentage
      return "加载中";
      // TODO: Maybe change back
      // return percentage === 100 ? '满' : `${percentage}%`;
    },
    submitForm(formName) {
      this.$refs[formName].validate(() => {});
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange() {},
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    selectBtn() {},
    open1() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "cancelBtn",
        type: "warning"
      }).then(() => {});
    },
    open2() {
      this.$notify("info", {
        title: "标题名称",
        content: "用户表示操作引起一定后果的消息通知"
      }); // t-designer
    },
    // 调用Modal弹出对话框
    onShowModal() {
      this.content = "一系列的信息描述，可能会很长。也可以是很短同样也可以带标点。";
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
        type: "warning",
        message: "这是一条提示消息，会主动消失"
      });
    },
    opensuccess() {
      Message({
        type: "success",
        message: "这是一条成功消息，会主动消失"
      });
    },
    openinfo() {
      Message({
        message: "这是一条提示消息，会主动消失"
      });
    },
    openerror() {
      Message({
        type: "error",
        message: "这是一条异常消息，会主动消失"
      });
    },
    // message弹出框（四种）
    openwarn1() {
      Notification({
        title: "",
        message: "“修改指标'111'失败，该指标名称已存在",
        type: "warning",
        duration: 1000,
        offset: 50
      });
    },
    opensuccess1() {
      Notification({
        title: "",
        message: "这是一条成功的提示消息",
        type: "success",
        duration: 1000,
        offset: 50
      });
    },
    openinfo1() {
      Notification.info({
        title: "",
        message: "这是一条消息的提示消息",
        duration: 1000,
        offset: 50
      });
    },
    openerror1() {
      Notification.error({
        title: "",
        message: "r\n### Error querying database.Cause: com.kingbase8.uti1.KSOLException: 错误: 已缓冲的计划不能改变结果类型\r\n###The error may exist in file [D:  xm lupp-backend' 'cnooc-",
        duration: 1000,
        offset: 50
      });
    },
    next() {
      this.activerow += 1;
      if (this.activerow === 3) this.activerow = 0;
    },
    next1() {
      this.activecolumn += 1;
      if (this.activecolumn === 3) this.activecolumn = 0;
    }
  }
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
  color: var(--light-blue-color);
  font-weight: 700;
}

.demoClass .spaceMargin {
  padding: 15px 0;
}

.el-progress {
  margin: 10px;
}

.lineStyle {
  text-align: center;
}
</style>