<template>
  <div>
    <el-button type="primary" class="confirmBut" @click="returnBut">返回</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    returnBut () {
      this.$router.go(-1)
    }
  }

}
</script>

<style lang="scss" scoped>
.confirmBut {
  background: rgba(0, 0, 0, 0);
  border: 1px solid #66ffff;
}
</style>