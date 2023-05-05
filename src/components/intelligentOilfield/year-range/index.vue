<!-- 年份范围选择器 -->
<template>
  <div class="year-range-picker">
    <el-date-picker
      v-model="startYear"
      type="year"
      placeholder="选择开始年"
      class="year-picker"
      format="yyyy 年"
      value-format="yyyy"
      :picker-options="pickerStartOptions"
      @change="changeYear"
    />
    <span class="range-word" :style="{color: $store.state.setting.mode === 'dark' ? '#fff' : '#000'}"> - </span>
    <el-date-picker
      v-model="endYear"
      type="year"
      placeholder="选择结束年"
      class="year-picker"
      format="yyyy 年"
      value-format="yyyy"
      :picker-options="pickerEndOptions"
      @change="changeYear"
    />
  </div>
</template>

<script>
export default {
  name: "YearRangePicker",
  model: {
    prop: "value",
    event: "change"
  },
  // 接收父组件传入的数据
  props: {
    value: {
      type: Array
    }
  },
  data() {
    return {
      yearRange: this.value,
      startYear: "",
      endYear: "", // 选择的生效日期时间
      pickerStartOptions: {
        disabledDate: time => {
          if (this.endYear) {
            return time.getFullYear() > new Date(this.endYear).getFullYear();
          }
        }
      },
      // 选择的失效日期时间
      pickerEndOptions: {
        disabledDate: time => {
          if (this.startYear) {
            return time.getFullYear() < new Date(this.startYear).getFullYear();
          }
        }
      }
    };
  },
  mounted() {
    // 初始化自身变量
    this.startYear = this.yearRange[0];
    this.endYear = this.yearRange[1];
  },
  methods: {
    changeYear() {
      // 将改动传回父组件
      this.$emit("change", [this.startYear, this.endYear]);
    }
  }
};
</script>

<style scoped>
.year-range-picker {
  font-size: 16px;
}

.range-word {
  margin-left: 10px;
  margin-right: 10px;
}

.year-range-picker .year-picker {
  max-width: 180px;
}
</style>