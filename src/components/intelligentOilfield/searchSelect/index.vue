<template>
    <el-select
      v-model="selectValue"
      v-loadmore="loadData"
      v-bind="$attrs"
      filterable
      remote
      :placeholder="placeholder"
      :remote-method="handleSearch"
      v-on="$listeners"
      @visible-change="changeSearch"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </template>
  
<script>
export default {
  directives: {
    "loadmore": {
      bind(el, binding) {
        const select = el.querySelector(".el-select-dropdown .el-select-dropdown__wrap");
        select.addEventListener("scroll", () => {
          const condition = select.scrollHeight - select.scrollTop <= select.clientHeight;
          if (condition) {
            binding.value();
          }
        });
      }
    }
  },
  props: {
    value: {
      type: String,
      default: undefined
    },
    // 模糊查询属性名
    propName: {
      type: String,
      default: "idCard"
    },
    valueProp: {
      type: String,
      default: "value"
    },
    labelProp: {
      type: String,
      default: "label"
    },
    queryParamProp: {
      type: Object,
      default: () => ({
        startIndex: "pageNum",
        pageSize: "pageSize",
        totalProp: "total",
        listProp: "rows"
      })
    },
    // 查询数据的方法
    fn: {
      type: Function,
      require: true,
      default: null
    },
    // 第一页从 0 还是 1 开始，默认是 1
    fromIndex: {
      type: Number,
      default: 1
    },
    placeholder: {
      type: String,
      default: "请选择"
    }
  },
  data() {
    return {
      options: [],
      loading: false,
      pagePrarms: {
        pageSize: 10,
        startIndex: 1,
        key: undefined,
        pagesNum: 0
      },
      allowLoad: true
    };
  },
  computed: {
    selectValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  created() {
    this.getData();
  },
  methods: {
    loadData() {
      if (this.allowLoad) {
        this.pagePrarms.startIndex += 1;
        this.getData();
      }
    },
    /**
       * 将后端需要参数组装返回
       */
    getMyParams() {
      return {
        [this.queryParamProp.pageSize]: this.pagePrarms.pageSize,
        [this.queryParamProp.startIndex]: this.pagePrarms.startIndex - (1 - this.fromIndex),
        [this.propName]: this.pagePrarms.key
      };
    },
    /**
       * 获取数据
       */
    getData(type) {
      this.loading = true;
      this.fn(this.getMyParams())
        .then((v) => {
          const re = v.data[this.queryParamProp.listProp];
          re.map((item) => {
            if (!item.label) {
              item.label = item[this.labelProp];
            }
            if (!item.value) {
              item.value = item[this.valueProp];
            }
            return item;
          });
          if (type === "refresh") {
            this.options = re;
          } else {
            this.options.push(...re);
          }
          this.allowLoad = this.options.length < v.data[this.queryParamProp.totalProp];
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleSearch(query) {
      this.pagePrarms.key = query;
      this.pagePrarms.startIndex = 1;
      this.getData("refresh");
    },
    changeSearch(val) {
      if (!val && this.pagePrarms.key) {
        this.pagePrarms.key = "";
        this.pagePrarms.startIndex = 1;
        this.getData("refresh");
      }
    }
  }
};
</script>
