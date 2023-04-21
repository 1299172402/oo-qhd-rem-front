export const getByIdMixin = {
  props: {
    modelId: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      loading: false
    };
  },
  watch: {
    modelId: {
      handler(val) {
        if (val) {
          this.visible = true;
          this.getModel(val);
        }
      },
      immediate: true
    }
  },
  methods: {
    getModel(id) {
      this.loading = true;
      return this.fn.findById(id)
        .then(v => {
          this.model = this.getFindModel(v);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getFindModel(re) {
      return re.data;
    }
  }
};
export const dialogAutoCreateMixin = {
  data() {
    return {
      visible: false,
      loading: false,
      refName: "formAutoCreate"
    };
  },
  methods: {
    /**
     * 点击提交按钮，触发表单校验
     */
    toValidate(ref = this.refName) {
      return this.$refs[ref].validate();
    },
    /**
     * 表单校验成功之后，保存数据
     */
    handleOk() {
      this.loading = true;
      this.fn.save(this.getSaveModel())
        .then(() => {
          this.$message.success("保存成功！");
          this.$emit("ok");
          this.visible = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * 保存的对象处理
     */
    getSaveModel() {
      return this.model;
    },
    /**
     * 弹窗关闭之后，清空校验，清空数据
     */
    onClosed() {
      this.model = JSON.parse(JSON.stringify(this.modelSchema));
      this.$nextTick(() => {
        this.$refs[this.refName].clearValidate();
      });
      this.$emit("closed");
    }
  }
};

export const dialogAutoCreateMixinWithFind = {
  mixins: [getByIdMixin, dialogAutoCreateMixin]
};