<template>
  <div>
    <img
      style="width: 100%; height:600px"
     :src="url"/>
  </div>
</template>

<script>
import img from '@/pages/rem/performance/wellGroup/groupAssistance/img/渗透率分布图.png';

export default {
  data() {
    return {
      url: img,
    };
  },
};
</script>

<style>

</style>