import {merge, cloneDeep, get} from "lodash";
import dayJs from "dayjs";
import { deleteNullAttribute } from "@/utils/objectOperate";

/**
 * 验证必填项
 * @param {*} _this vue实例
 * @param {*} ref 要验证的form标记的ref名称
 */
function getValidateFormResult(_this, ref, fields = []) {
  let flag = true;
  _this.$refs[ref].validate((valid, error) => {
    fields.push(...Object.keys(error || {}));
    if (valid) {
      return true;
    } 
    flag = false;
    return false;
        
  });
  return flag;
}

/**
 * 必填验证未通过时定位到该元素位置
 */
export function scrollToElement(className = "has-error", options) {
  const array = document.getElementsByClassName(className);
  if (array[0]) {
    array[0].scrollIntoView(options || { block: "center" });
  }
}

export default {
  props: {
    isAudit: {
      type: Boolean,
      default: false
    },
    modelId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      loading: false,
      formatMomentDateProps: [],
      onlySubmitRequired: true,
      saveRequired: [],
      refName: "myForm",
      needNextAudit: true
    }
  },
  created() {
    this.modelOk && this.$on("model-ok", this.modelOk);
    this.$on("ok", this.handleToList)
  },
  mounted() {
    this.getModel(this.$route.query.id || this.modelId);
  },
  activated() {
    this.beforeGetModel && this.beforeGetModel();
    this.getModel(this.$route.query.id || this.modelId);
  },
  computed: {
    isAdd() {
      return this.$route.query.action === "add";
    }
  },
  methods: {
    getModel(id) {
    //   const _this = this;
      this.model = merge({}, cloneDeep(this.model));
      if (id && this.fn && this.fn.findById) {
        this.loading = true;
        return this.fn.findById(id)
          .then(v => {
            (this.formatMomentDateProps || []).forEach(p => {
              this.$set(v, p, this.momentDate(get(v, p)));
            });
            v = this.getMixinInitModel && this.getMixinInitModel(v) || v;
            this.model = merge({}, this.model, deleteNullAttribute(v));
          })
          .finally(() => {
            this.loading = false;
            this.$emit("model-ok");
          });
      } 
      this.$emit("model-ok");
            
    },
    momentDate(value) {
      return value && dayJs(value) || null;
    },
    handleOk(type) {
      this.hanleModalFormOk(type, (this.onlySubmitRequired && !this.isAudit) ? type === "submit" : true);
    },
    /**
         * 保存数据
         */
    hanleModalFormOk(type, needValid = true) {
      if (needValid && !this.validateForm(true) || !this.handleSaveRequired() || !this.fn.save) {
        return;
      }
      if (this.needNextAudit && (type === "submit") && (!this.isAudit) && (!this.model.nextAuditInfos || this.model.nextAuditInfos.length === 0)) {
        this.$message.warning("请选择下一节点审批人员");
        return;
      }
      this.loading = true;
      const formData = { ...this.getSaveModel()};
      (this.formatMomentDateProps || []).forEach(p => {
        formData[p] = formData[p] && dayJs(formData[p]).format("YYYY-MM-DD HH:mm:ss") || null;
      });
      return this.fn.save(formData, type).then(v => {
        this.$message.success(type === "save" ? "保存成功！" : "提交成功！");
        this.$emit("ok", v);
      })
        .catch((data) => {
          this.handleFlowStartedFail(type, data);
        })
        .finally(() => {
          this.$nextTick(() => {
            this.loading = false;
          });
        });
    },
    validateForm (isScroll, fields, refName = this.refName, message = "请将必填项填写完整") {
      let canNext = true;
      if (!getValidateFormResult(this, refName, fields) && message) {
        this.$message.warning(message);
        if (isScroll) {
          this.$nextTick(() => {
            scrollToElement();
          });
        }
        canNext = false;
      }
      // 是否有正在上传的文件
      const uploadSpinClass = "uploading-file";
      if (message && document.getElementsByClassName(uploadSpinClass).length > 0) {
        canNext = false;
        this.$message.warning("正在上传文件，请稍后");
      }
      canNext = this.validateAfterCanNext ? this.validateAfterCanNext(canNext, refName) && canNext : canNext;
      return canNext;
    },
    /**
         * 保存有些字段也需要必填校验
         */
    handleSaveRequired() {
      let flag = true;
      this.$refs[this.refName].validateField(this.saveRequired, v => {
        flag = !v;
      });
      if (!flag) {
        this.$message.warning("请将必填项填写完整");
      }
      return flag;
    },
    /**
         * 保存提交后跳转到查询页面
         */
    handleToList() {
      if (this.routeInfo?.ok && !this.isAudit) {
        this.$router.push({ 
          name: this.routeInfo.ok.name,
          params: this.routeInfo.ok.params,
          query: this.routeInfo.ok.query,
        })
      }
      // todo
    },
    handleReturn() {
      this.$router.go(-1);
    },
    getSaveModel() {
      return this.model;
    }
  }
}