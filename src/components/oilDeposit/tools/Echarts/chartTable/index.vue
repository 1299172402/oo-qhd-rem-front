<template>
  <div :style="{ width: width, height: height }">
    <p v-if="tableTitle" class="tableTitle" :style="titleStyle">{{ tableTitle }}</p>
    <el-table
      :data="tableList"
      style="width: 100%"
      :height="tableTitle ? 'calc(100% - 30px)' : '100%'"
      :show-header="false"
      :border="!noBorder"
      :cell-class-name="noBorder ? 'noBorder' : ''"
      :stripe="stripe"
    >
      <el-table-column
        v-for="item in columns"
        :key="item"
        :prop="item"
        :label="item"
        align="right"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "ChartTable",
  props: {
    tableData: {
      type: Object,
      default: () => {},
    },
    labelObject: {
      type: Object,
      default: () => {},
    },
    col: {
      type: Number,
      default: 2,
    },
    width: {
      type: String,
      default: "500px",
    },
    height: {
      type: String,
      default: "auto",
    },
    noBorder: {
      type: Boolean,
      default: false,
    },
    tableTitle: {
      type: String,
      default: "",
    },
    titleStyle: {
      type: Object,
      default: () => {},
    },
    stripe: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    tableList() {
      let _data = [];
      if (!this.tableData) return;
      Object.keys(this.tableData).forEach((val, index, list) => {
        //val key
        //tableData[val] value
        if (index % this.col == 0) {
          //col 列数
          let _obj = {};
          for (let i = 0, l = this.col; i < l; i++) {
            _obj["f" + i] = list[index + i] ? list[index + i] : "";
            _obj["f" + i + 1] = String(this.tableData[list[index + i]])
              ? this.tableData[list[index + i]]
              : ""; //String 为了防止value为零的时候转换为false
          }
          _data.push(_obj);
        }
      });
      return _data;
    },
    columns() {
      if (!this.tableList || !this.tableList.length) return [];
      return Object.keys(this.tableList[0]);
    },
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.noBorder td {
  border: none !important;
}
.tableTitle {
  line-height: 30px;
}
</style>
