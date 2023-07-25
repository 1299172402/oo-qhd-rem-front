<template>
  <div>
    <div class="user-info-head" @click="editCropper()">
      <img
        :src="imgUrl1"
        title="点击上传头像"
        style="width: 150px;height: 198px"
        class="img-circle img-lg"
      >
    </div>
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="400px"
      append-to-body
      :close-on-click-modal="false"
      @opened="modalOpened"
      @close="closeDialog"
    >
      <div style="text-align: center">
        <file-upload
          v-model="imgUrl2"
          upload-type="local"
          :limit="1"
          :is-picture-card="true"
          :is-show-tip="false"
          biz-path="portal/oo-csc-upp-system-atom"
        />
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="uploadImg()">
          提 交
        </el-button>
        <el-button class="cancelBtn" @click="open = false">
          取 消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import store from "@/store";
import { updateUser } from "@/api/intelligentOilfield/system/user";
import FileUpload from "@/components/intelligentOilfield/FileUpload/index.vue";
import { downFile } from "@/components/upload/utils/file.ts";

export default {
  components: { FileUpload },
  props: {
    user: {
      type: Object
    }
  },
  data() {
    return {
      imgUrl1: "", // 引入图片方法一
      imgUrl2: undefined, // 引入图片方法二
      // 是否显示弹出层
      open: false,
      // 是否显示cropper
      visible: false,
      // 弹出层标题
      title: "修改头像",
      options: {
        img: store.getters.avatar, // 裁剪图片的地址
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true // 固定截图框大小 不允许改变
      },
      previews: {}
    };
  },
  watch: {
    user: {
      handler(newVal) {
        this.imgUrl2 = newVal ? newVal.data?.avatar : "";
        if (this.imgUrl2 === "无") {
          this.imgUrl2 = "";
        }
        if (this.imgUrl2) {
          this.previewImg(this.imgUrl2.split(":")[0]);
        } else {
          this.imgUrl1 = new URL("../../../../assets/darkPerson.png", import.meta.url).href;
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    previewImg(id) {
      downFile(id).then(res => {
        this.imgUrl1 = window.URL.createObjectURL(res);
      });
    },
    // 编辑头像
    editCropper() {
      this.open = true;
    },
    // 打开弹出层结束时的回调
    modalOpened() {
      this.visible = true;
    },
    // 覆盖默认的上传行为
    requestUpload() {},
    // 向左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    // 向右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    // 图片缩放
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    // 上传预处理
    beforeUpload(file) {
      if (file.type.indexOf("image/") === -1) {
        this.$modal.msgError("文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。");
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.options.img = reader.result;
        };
      }
    },
    // 上传图片
    uploadImg() {
      const params = {
        userId: this.user.data.userId,
        postIds: this.user.postIds,
        roleIds: this.user.roleIds,
        avatar: this.imgUrl2 ? this.imgUrl2 : "无",
        userName: this.user.data.userName,
        deptId: this.user.data.deptId
      };
      updateUser(params).then(res => {
        if (res ? res.data.code === 200 : false) {
          if (this.imgUrl2) {
            this.previewImg(this.imgUrl2.split(":")[0]);
          } else {
            this.imgUrl1 = new URL("../../../../assets/darkPerson.png", import.meta.url).href;
          }
          this.open = false;
        }
      });
    },
    // 实时预览
    realTime(data) {
      this.previews = data;
    },
    // 关闭窗口
    closeDialog() {
      this.open = false;
    }
  }
};
</script>
<style scoped>
.user-info-head {
  position: relative;
  display: inline-block;
  height: 200px;
}

.user-info-head:hover::after {
  content: "+";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  color: #eee;
  background: rgba(0, 0, 0, 0.5);
  font-size: 24px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  line-height: 200px;

  /* border-radius: 50%; */
}
</style>