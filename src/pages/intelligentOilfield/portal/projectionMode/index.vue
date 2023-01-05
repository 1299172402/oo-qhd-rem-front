<!-- 门户——投影模式 -->
<template>
  <div>
    <!-- <t-button @click="sureLayOut"> 确定布局 </t-button> -->
    <!-- <el-button type="primary" class="myPage">按钮实验</el-button>-->
    <!-- <iframe name="h5Demo" id="iframeId" width="1000px" height="600px" src="../../../../public/html5Demo.html" ></iframe> -->
    <!-- <t-table
      rowKey="index"
      :data="data"
      :columns="columns"
      :stripe="stripe"
      :bordered="bordered"
      :hover="hover"
      :size="size"
      :table-layout="tableLayout ? 'auto' : 'fixed'"
      :pagination="pagination"
      :showHeader="showHeader"
      cellEmptyContent="-"
    ></t-table>
  <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table> -->
    <grid-layout
      :layout.sync="layout"
      :col-num="3"
      :row-height="180"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
      @layout-updated="layoutUpdatedEvent"
    >
      <grid-item v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i">
        <!-- <div style="padding: 10px 0 0 10px" v-if="item.i != 2"> {{ item.i }}</div> -->
        <component :is="getContent(item.i)" />
      </grid-item>
    </grid-layout>
  </div>
</template>
<script>
import VueGridLayout from 'vue-grid-layout';
import topHeader from './components/topHeader.vue';
import centerHeader from './components/centerHeader.vue';

const data = [];
const total = 28;
for (let i = 0; i < total; i++) {
  data.push({
    index: i,
    platform: i % 2 === 0 ? '共有' : '私有',
    type: ['String', 'Number', 'Array', 'Object'][i % 4],
    default: ['0', '[]'][i % 5],
    detail: {
      position: `读取 ${i} 个数据的嵌套信息值`,
    },
    needed: i % 4 === 0 ? '是' : '否',
    description: '数据源',
  });
}
export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    topHeader,
  },

  data() {
    return {
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
      myData: '',
      layout: [
        { x: 0, y: 0, w: 2, h: 1, i: '0' },
        { x: 2, y: 0, w: 1, h: 1, i: '1' },
        { x: 0, y: 2, w: 2, h: 3, i: '2' },
        { x: 2, y: 2, w: 1, h: 1.5, i: '3' },
        { x: 2, y: 2, w: 1, h: 1.5, i: '4' },
      ],
      tempLayOut: [],

      data,
      size: 'medium',
      tableLayout: false,
      stripe: true,
      bordered: true,
      hover: false,
      showHeader: true,
      columns: [
        {
          // 序号列，设置 colKey = serial-number 即可
          colKey: 'serial-number',
          title: '序号',
          width: '100',
          // 对齐方式
          align: 'center',
          // 设置列类名
          className: 'custom-column-class-name',
          // 设置列属性
          attrs: {
            'data-id': 'first-column',
            style: {},
          },
        },
        {
          width: 100,
          colKey: 'platform',
          title: '平台',
        },
        {
          colKey: 'type',
          title: '类型',
        },
        {
          colKey: 'default',
          title: '默认值',
        },
        {
          colKey: 'needed',
          title: '是否必传',
        },
        {
          colKey: 'detail.position',
          title: '详情信息',
          width: 200,
          /**
           * 1.内容超出时，是否显示省略号。值为 true，则浮层默认显示单元格内容；
           * 2.值类型为 Function 则自定义浮层显示内容；
           * 3.值类型为 Object，则自动透传属性到 Popup 组件。
           */
          ellipsis: true,
          ellipsisTitle: false,

          // 透传省略内容浮层 Popup 组件全部特性，示例代码有效，勿删！！！
          // ellipsis: { placement: 'bottom', destroyOnClose: false },

          // 完全自定义 ellipsis 浮层的样式和内容，示例代码有效，勿删！！！
          // ellipsis: (h, {
          //   row, col, rowIndex, colIndex,
          // }) => {
          //   if (rowIndex % 2) {
          //     return <div>is even row {rowIndex + 1}, with data {row.detail.position}</div>;
          //   }
          //   return <div>is odd row {rowIndex + 1}, with data {row.detail.position}</div>;
          // },
        },
      ],
      /** 非受控用法：与分页组件对齐 */
      pagination: {
        defaultCurrent: 2,
        defaultPageSize: 5,
        total,
      },
    };
  },
  mounted() {
    // this.myJieKou();
  },
  methods: {
    getContent(i) {
      switch (i) {
      case '0':
        return topHeader;
      case '1':
        return centerHeader;
      default:
        break;
      }
    },
    sureLayOut() {
      this.layout = [];
      this.tempLayOut.forEach((el) => {
        this.layout.push({
          x: el.x,
          y: el.y,
          w: el.w,
          h: el.h,
          i: el.i,
        });
      });
    //   console.log('结果: ', this.layout);
    },
    layoutUpdatedEvent(newLayout) {
      this.tempLayOut = newLayout;
    },
    myJieKou() {
    //   console.log('token结果: ', this.$store.getters['user/token']);
      const id = 16;
      this.$request
        .get(`videoReproduce/info/${id}`)
        .then((res) => {
          console.log('接口结果====', res);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped>
/* 当前页面该组件样式 */
/deep/ .el-button--primary {
  background-color: green !important;
}
/* 类名为myInput的样式 */
.myInput >>> .el-input__inner {
  width: 100px !important;
}
</style>
<style>
/* .vue-grid-item.vue-grid-placeholder {
  background: red !important;
  opacity: 0.2;
  transition-duration: 100ms;
  z-index: 2;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.vue-grid-item.vue-grid-placeholder {
  background: green !important;
}
.container .vue-grid-item.vue-grid-placeholder {
  background: green;
} */
.vue-grid-item {
  background: rgba(71, 135, 240, 0.3) !important;
}
</style>
