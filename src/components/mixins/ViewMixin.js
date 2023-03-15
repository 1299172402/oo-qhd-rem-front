import {merge, cloneDeep} from "lodash";
import { deleteNullAttribute } from "@/utils/objectOperate";

export default {
  data() {
    return {
      loading: false,
      editPopupVisible: false
    }
  },
  created() {
    this.modelOk && this.$on("model-ok", this.modelOk);
    this.getModel(this.$route.query.id);
  },
  activated() {
    this.modelOk && this.$on("model-ok", this.modelOk);
    this.getModel(this.$route.query.id);
  },
  computed: {
    isView() {
      return this.$route.query.action === "view"
    }
  },
  methods: {
    getModel(id, auditModel) {
      this.model = merge({}, cloneDeep(this.modelSchema || this.model));
      if (id && this.fn && this.fn.findById) {
        this.loading = true;
        return this.fn.findById(id)
          .then(v => {
            this.model = merge({}, this.model, deleteNullAttribute(v));
            if (this.infos) {
              this.infos.processId = this.model.procInstId;
            }
            // 控制Item显示
            this.$refs.auditInfo && this.itemControlCenter();
            this.$emit("model-ok", auditModel);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    handleEditDataOk(param) {
      this.$refs.editData.handleOk(param)
    },
    handleEditDataSaveOk() {
      this.editPopupVisible = false;
      this.getModel(this.model.id);
    },
    beforeComplete() {
      return true;
    }
  }
}