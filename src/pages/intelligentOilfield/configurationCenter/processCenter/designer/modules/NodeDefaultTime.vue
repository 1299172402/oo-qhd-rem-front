<template>
  <el-form
    ref="form"
    :model="model"
  >
    <el-card style="margin-bottom: 20px;">
      <el-form-item label="处理期限">
        <question-info slot="label" label="处理期限" tip="flow_node_designer_urge_rule_due" />
        <div class="default-time">
          <aside>
            <el-input-number
              v-model="model.urgeModel.dueDay"
              controls-position="right"
              :precision="0"
              :min="0"
            />
            <span class="span-time">天</span>
          </aside>
          <aside>
            <el-input-number
              v-model="model.urgeModel.dueHours"
              controls-position="right"
              :precision="0"
              :min="0"
            />
            <span class="span-time">小时</span>
          </aside>
          <aside>
            <el-input-number
              v-model="model.urgeModel.dueMinute"
              controls-position="right"
              :precision="0"
              :min="0"
            />
            <span class="span-time">分钟</span>
          </aside>
        </div>
      </el-form-item>
      <el-form-item label="提前提醒">
        <question-info slot="label" label="提前提醒" tip="flow_node_designer_urge_rule_before" />
        <div class="default-time">
          <aside>
            <el-input-number
              v-model="model.urgeModel.alertDateDay"
              controls-position="right"
              :precision="0"
              :min="0"
            />
            <span class="span-time">天</span>
          </aside>
          <aside>
            <el-input-number
              v-model="model.urgeModel.alertDateHours"
              controls-position="right"
              :precision="0"
              :min="0"
            />
            <span class="span-time">小时</span>
          </aside>
          <aside>
            <el-input-number
              v-model="model.urgeModel.alertDateMinute"
              controls-position="right"
              :precision="0"
              :min="0"
            />
            <span class="span-time">分钟</span>
          </aside>
        </div>
      </el-form-item>
      <el-form-item label="之后每隔">
        <question-info slot="label" label="之后每隔" tip="flow_node_designer_urge_rule_interval" />
        <div class="default-time">
          <aside>
            <el-input-number
              v-model="model.urgeModel.intervalDay"
              controls-position="right"
              :precision="0"
              :min="0"
            />
            <span class="span-time">天</span>
          </aside>
          <aside>
            <el-input-number
              v-model="model.urgeModel.intervalHours"
              controls-position="right"
              :precision="0"
              :min="0"
            />
            <span class="span-time">小时</span>
          </aside>
          <aside>
            <el-input-number
              v-model="model.urgeModel.intervalMinute"
              controls-position="right"
              :precision="0"
              :min="0"
            />
            <span class="span-time">分钟</span>
          </aside>
        </div>
      </el-form-item>
      <el-form-item label="提醒方式">
        <question-info slot="label" label="提醒方式" tip="flow_node_designer_urge_rule_method" />
        <el-checkbox-group v-model="model.urgeModel.tipMethod" @change="handleChange($event, 'method')">
          <el-checkbox label="sms" name="tipMethod" border>
            短信
          </el-checkbox>
          <el-checkbox label="email" name="tipMethod" border>
            邮件
          </el-checkbox>
          <el-checkbox label="inSite" name="tipMethod" border>
            站内信
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="提醒次数">
        <question-info slot="label" label="提醒次数" tip="flow_node_designer_urge_rule_times" />
        <el-input-number
          v-model="model.urgeModel.maxAlertTimes"
          style="width: 100%;"
          controls-position="right"
          :precision="0"
          :min="-1"
        />
      </el-form-item>
    </el-card>
    <template v-if="needReminderMode">
      <el-form-item label="待办提醒方式">
        <question-info slot="label" label="待办提醒方式" tip="flow_add_edit_assign_task_alert" />
        <el-checkbox-group v-model="model.cbxAssignAlertMethod" @change="handleChange($event, 'assignAlertMethod')">
          <el-checkbox label="sms" name="cbxAssignAlertMethod" border>
            短信
          </el-checkbox>
          <el-checkbox label="email" name="cbxAssignAlertMethod" border>
            邮件
          </el-checkbox>
          <el-checkbox label="inSite" name="cbxAssignAlertMethod" border>
            站内信
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="告知提醒方式">
        <question-info slot="label" label="告知提醒方式" tip="flow_add_edit_notify_alert" />
        <el-checkbox-group v-model="model.cbxCcAlertMethod" @change="handleChange($event, 'ccAlertMethod')">
          <el-checkbox label="sms" name="cbxCcAlertMethod" border>
            短信
          </el-checkbox>
          <el-checkbox label="email" name="cbxCcAlertMethod" border>
            邮件
          </el-checkbox>
          <el-checkbox label="inSite" name="cbxCcAlertMethod" border>
            站内信
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </template>
  </el-form>
</template>
<script>
import QuestionInfo from "@/pages/intelligentOilfield/configurationCenter/processCenter/designer/modules/QuestionInfo.vue";

export default {
  name: "NodeDefaultTime",
  components: {
    QuestionInfo
  },
  props: {
    // 表单model
    defaultTimeModel: {
      type: Object,
      default: () => ({})
    },
    // 是否需要待办提醒和告知提醒
    needReminderMode: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    /**
     * 父子组件数据model双向绑定
     */
    model: {
      get() {
        return this.defaultTimeModel;
      },
      set(val) {
        this.$emit("update:defaultTimeModel", val);
      }
    }
  },
  methods: {
    /**
     * 多选框选中后对应字段赋值为二进制
     */
    handleChange(arr, name) {
      if (arr.length > 0) {
        const methods = [0, 0, 0];
        arr.forEach(item => {
          if (item === "sms") {
            methods[0] = 1;
          }
          if (item === "email") {
            methods[1] = 1;
          }
          if (item === "inSite") {
            methods[2] = 1;
          }
        });
        if (name === "method") {
          this.$set(this.model.urgeModel, name, parseInt((methods[0] * 100) + (methods[1] * 10) + methods[2], 2));
        } else {
          this.$set(this.model, name, parseInt((methods[0] * 100) + (methods[1] * 10) + methods[2], 2));
        }
      } else if (name === "method" && this.model.urgeModel[name]) {
        this.$set(this.model.urgeModel, name, 0);
      } else if (this.model[name]) {
        this.$set(this.model, name, 0);
      }
    }
  }
};
</script>
<style scoped lang="less">
.default-time {
  display: flex;
  justify-content: space-between;

  aside {
    flex: 1;
    display: flex;

    ::v-deep .el-input-number {
      flex: 1;
    }

    span.span-time {
      text-align: center;
      width: 50px;
    }
  }
}
</style>