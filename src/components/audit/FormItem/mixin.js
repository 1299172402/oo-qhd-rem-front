import { get } from "lodash";

export const emitterMixin = {
  methods: {
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        // eslint-disable-next-line prefer-spread
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    }
  }
};

export const parentMixin = {
  // 需要定义 componentName
  componentName: "ProcessFormItemParent",
  data() {
    return {
      enrollItemArr: []
    };
  },
  created() {
    this.$on("enrollItem.add", item => {
      item && this.enrollItemArr.push(item);
    });
  },
  computed: {
    /**
     * processFormItem组件参数使用
     */
    myInfos() {
      return {
        editableFormFields: this.infos?.editableFormFields || [],
        outsideAuditModel: {
          action: "complete"
        }
      };
    }
  },
  methods: {
    /**
     * Item调度中心，modelOk后调用
     */
    itemControlCenter(model = this.model) {
      this.enrollItemArr.forEach(item => {
        item.$nextTick(() => {
          item.setViewValue(get(model, item.myProp));
        });
      });
    },
    /**
      * 使用插槽字段是否可编辑
      */
    checkEdit(name) {
      if (this.infos && this.infos.editableFormFields?.length > 0) {
        const field = this.infos.editableFormFields?.find(v => v.fieldName === name);
        if (!field) {
          return false;
        }
        if (field) {
          return field.completeEnable === true;
        }
      }
      return false;
    }
  }
};