import { cloneDeep, merge } from "lodash";

export default {
  data() {
    return {
      loading: false
    };
  },
  mounted() {
    this.getModal(this.$route.params.id);
  },
  methods: {
    /**
         * 初始化数据
         */
    getModal(id: string) {
      const _this = this as any;
      _this.model = merge({}, cloneDeep(this.modelSchema || this.model));
      if (id && this.fn && this.fn.findById) {
        _this.loading = true;
        return _this.fn.findById(id)
          .then(v => {
            _this.model = merge({}, _this.model, v);
            if (_this.infos) {
              _this.infos.processId = _this.model.procInstId;
            }
            if (_this.$refs.auditInfo) {
              _this.itemControlCenter();
            }
            _this.$emit("model-ok", _this.model);
          })
          .finally(() => {
            _this.loading = false;
          });
      }
    }
  }
};