<template>
  <pagePanel headerTitle="生产环境发布申请单填写" style="height: calc(100% - 80px)">
    <audit-container :infos="infos" :beforeComplete="beforeComplete" @ready="getModel" returnName="ProdEnvironmentReleaseList">
      <div>
        <div>项目信息</div>
        <hr />
      </div>
      <div class="form-layout">
        <div class="form-layout__item-col2 form-layout__item-col2--label-content">
          <div>客户单位:</div>
          <div>{{ model.customName }}</div>
        </div>
        <div class="form-layout__item-col2 form-layout__item-col2--label-content">
          <div>项目名称:</div>
          <div>{{ model.projectName }}</div>
        </div>
        <div class="form-layout__item-col2 form-layout__item-col2--label-content">
          <div>发布提出人:</div>
          <div>{{ model.publishUserName }}</div>
        </div>
        <div class="form-layout__item-col2 form-layout__item-col2--label-content">
          <div>发布执行时间:</div>
          <div>{{ model.publishDate }}</div>
        </div>
        <div class="form-layout__item-col2 form-layout__item-col2--label-content">
          <div>服务名称:</div>
          <div>{{ model.serviceName }}</div>
        </div>
        <div class="form-layout__item-col2 form-layout__item-col2--label-content">
          <div>升级版本号(原版本号):</div>
          <div>V{{ model.publishVersion }}</div>
        </div>
      </div>
      <div style="width: 100%">
        <div>申请表信息</div>
        <hr />
      </div>
      <div class="form-layout">
        <div class="form-layout__item-col2 form-layout__item-col2--label-content">
          <div>申请类型:</div>
          <div>{{ applyType }}</div>
        </div>
        <div class="form-layout__item-col2 form-layout__item-col2--label-content">
          <div>发布原因:</div>
          <div>{{ applyReason }}</div>
        </div>
        <div class="form-layout__item-col1 form-layout__item-col1--label-content">
          <div>发布内容:</div>
          <div>{{ model.publishContent }}</div>
        </div>
        <div class="form-layout__item-col2 form-layout__item-col2--label-content">
          <div>风险评估及控制措施:</div>
          <div>{{ model.assessControl }}</div>
        </div>
        <div class="form-layout__item-col1 form-layout__item-col1--label-content">
          <div>附件审批:</div>
          <div>{{ model.attachType }}</div>
        </div>
        <div
          v-for="item in model.attachList"
          :key="item.id"
          class="form-layout__item-col1 form-layout__item-col1--label-content"
        >
          <div>{{ `${dictMap[item.fileType]}附件` }}</div>
          <file-upload v-model="item.filePath" :showUpload="false" :viewOnly="true" />
        </div>
      </div>
      <template v-slot:editData v-if="!isView">
        <edit-popup title="编辑" :visible.sync="editPopupVisible" @ok="handleEditDataOk('save')">
          <edit-page
            ref="editData"
            @model-ok="() => (editPopupLoading = false)"
            :isAudit="true"
            :model-id="model.id"
            @ok="handleEditDataSaveOk"
          />
        </edit-popup>
      </template>
    </audit-container>
  </pagePanel>
</template>
<script>
import { PRODUCT_APPLY } from '@/constants/businessType';
import { queryById } from '@/pages/common/api/productionEnvironmentReleaseApi';
import { ModelTemplate } from '../modules/model';
import { cloneDeep } from 'lodash';

import ViewMixin from '@/components/mixins/ViewMixin';
import AuditContainer from '@/components/audit/process/AuditContainer';
import FileUpload from '@/components/intelligentOilfield/FileUpload/index.vue';
import EditPage from './EditPage.vue';
import EditPopup from '@/components/audit/process/auditComp/EditPopup.vue';

export default {
  name: 'ProdEnvironmentReleaseView',
  components: {
    AuditContainer,
    FileUpload,
    EditPage,
    EditPopup,
  },
  dicts: ['prod_env_apply_reason', 'prod_env_apply_type', 'prod_env_apply_attach_type'],
  mixins: [ViewMixin],
  data() {
    return {
      model: cloneDeep(ModelTemplate),
      fileList: [],
      infos: {
        businessType: PRODUCT_APPLY,
        processId: '',
      },
      fn: {
        findById: (id) => queryById(id).then((v) => v.data.data),
      },
      dictMap: {},
    };
  },
  computed: {
    applyType() {
      return this.dict.type.prod_env_apply_type.find((item) => item.value === this.model.applyType)?.label;
    },
    applyReason() {
      return this.dict.type.prod_env_apply_reason.find((item) => item.value === this.model.applyReasonType)?.label;
    },
  },
  watch: {
    // eslint-disable-next-line func-names
    'dict.type.prod_env_apply_attach_type': function (val) {
      val.forEach((item) => {
        this.dictMap[item.value] = item.label;
      });
    },
  },
  methods: {
    modelOk() {
      this.model.attachType = this.model.attachList.map(item => (this.dictMap[item.fileType])).join("、");
    }
  },
};
</script>
<style scoped lang="less">
@import '@/assets/styles/less/form.less';
.form-layout {
  .form-layout(150px);
}
</style>