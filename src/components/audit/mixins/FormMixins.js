import returnPaterPage from "@/utils/returnPaterPage";

export const BytzFormMixins = {};

export const FormMixins = {
  data() {
    return {
      refName: "Form",
      labelWidth: "200px",
      action: "",
      loading: false
    };
  },
  computed: {
    /**
     * 应用ID
     */
    modelId() {
      return this.$route.params.id || undefined;
    }
  },
  watch: {
    modelId: {
      handler(val) {
        if (val) {
          this.getModel(val);
        }
      },
      immediate: true
    }
  },
  created() {
    this.$on("model-ok", this.modelOk);
  },
  mounted() {
    this.action = this.$route.params.action || "";
  },
  methods: {
    /**
     * 根据id获取数据
     */
    getModel(id) {
      this.loading = true;
      return this.fn.findById(id)
        .then((v) => {
          this.model = this.getFindModel(v);
          this.$emit("model-ok");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * 获取数据处理
     */
    getFindModel(re) {
      return re;
    },
    /**
     * 保存数据方法
     */
    postForm(way = "save") {
      this.loading = true;
      this.fn[way](this.getSaveModel())
        .then((res) => {
          if (res ? res.data.code === 200 : false) {
            this.$message.success("保存成功");
            this.handleBack();
            this.$emit("ok");
          }
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
     * 表单校验成功之后，保存数据
     */
    handleOk(way) {
      this.validate()
        .then(() => this.postForm(way));
    },
    /**
     * 校验表单
     */
    validate(refName = this.refName) {
      return new Promise((resolve, reject) => {
        const ref = this.$refs[refName];
        if (!ref) {
          this.$message.error("请先给 Form 表单设置 :ref='refName' ");
          reject();
        } else {
          ref.validate((valid) => {
            if (valid) {
              resolve();
            } else {
              this.$message.warning("请将必填项填写完整！");
              reject();
            }
          });
        }
      });
    },
    /**
     * 页面返回
     */
    handleBack() {
      if (this.returnName && typeof this.returnName === "string") {
        returnPaterPage(this.$route.path, this.returnName)
      } else if (window.opener) {
        window.close();
      } else {
        this.$router.go(-1);
      }
    },
    /**
     * 表单数据加载完成后触发
     */
    modelOk() {
      // 用于重载
    }
  }
};