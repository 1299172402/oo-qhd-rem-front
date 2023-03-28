<template>
    <div v-if="!isHalfLayout" class="form-model__content">
        <slot v-if="index === -1" />
        <slot v-else :name="index" />
    </div>
    <div v-else class="form-model__content-half">
        <div class="form-model__content-left">
            <slot :name="index === -1 ? 'left' : index + '-' + 'left'" />
        </div>
        <div class="form-model__content-right">
            <slot :name="index === -1 ? 'right' : index + '-' + 'right'" />
        </div>
    </div>
</template>
<script> 
export default {
  name: "Child",
  props: {
    isHalfLayout: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: -1
    }
  }
}
</script>