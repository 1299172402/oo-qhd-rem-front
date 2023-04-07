<template>
  <common-dialog
    v-model="visible"
    label="可视化编辑器"
    :view-only="true"
    v-bind="$attrs"
    height="1"
    style="display: inline-block; margin-left: 20px;"
    append-to-body
    width="80%"
    dialog-title="流程编辑器"
    custom-class="dialog__body--no-padding"
  >
    <iframe
      v-if="modelId"
      ref="iframe"
      class="node-editor__iframe"
      frameborder="0"
      :src="src"
      @load="onIframeLoad"
    />
  </common-dialog>
</template>
<script>
import CommonDialog from "@/components/intelligentOilfield/dialog/CommonDialog.vue";
import proxy from "@/config/host";
import JSEncrypt from "jsencrypt/bin/jsencrypt";

const env = import.meta.env.MODE || "development";
// 加密
const encryptor = new JSEncrypt();
// 设置公钥
encryptor.setPublicKey(proxy[env].PROCESS_PULBIC_KEY);
export default {
  name: "ProcessInfo",
  components: {
    CommonDialog
  },
  props: {
    modelId: {
      type: String,
      default: undefined
    },
    tenantId: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      visible: false
    };
  },
  computed: {
    src() {
      return `/modeler/index.html#/editor/${this.modelId}?FtId=${encryptor.encrypt(`${this.tenantId},${new Date().getTime()}`)}`;
    }
  },
  beforeDestroy() {
    window.removeEventListener("message", this.eventListener);
  },
  methods: {
    /**
     * 添加监听事件，如果子窗口要求关闭弹窗，则关闭当前弹窗
     */
    onIframeLoad() {
      window.addEventListener("message", this.eventListener, false);
    },
    /**
     * 根据 iframe 传回的数据判断是否关闭弹窗
     */
    eventListener(e) {
      if (e.origin === window.origin) {
        if (e.data?.closeDialog) {
          this.$emit("refresh");
          this.visible = false;
        }
      }
    }
  }
};
</script>
<style scoped lang="less">
.node-editor__iframe {
  width: 100%;
  height: 100%;
}
</style>