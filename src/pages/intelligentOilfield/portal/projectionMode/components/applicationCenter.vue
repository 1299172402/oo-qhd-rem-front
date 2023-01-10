<!-- 应用中心组件 -->
<template>
    <div style="font-size: 20px" class="g-w100 g-h100">
        <info-window infoWidth="100%" infoHeight="100%" headerTitle="应用中心">
            <div style="padding: 20px">
                <circularPanel :height="height"></circularPanel>
            </div>
        </info-window>
    </div>
</template>
<script>
import infoWindow from '@/components/info-window/index.vue';
import circularPanel from '@/components/circular-panel/index.vue';

export default {
  components: {
    infoWindow,
    circularPanel,
  },
  props: {
    height: {
                
    }
  },
  data() {
    return {};
  },
};
</script>

<style scoped></style>
