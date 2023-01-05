<template>
  <div>
    <!-- Progress进度条 -->
    <div>=================================大号进度条=================================</div>
    <el-progress :percentage="50" style="width: 400px"></el-progress>
    <el-progress :percentage="70" style="width: 400px"></el-progress>
    <el-progress :percentage="100" status="success" style="width: 400px"></el-progress>
    <el-progress :percentage="80" status="warning" style="width: 400px"></el-progress>
    <el-progress :percentage="50" status="exception" style="width: 400px"></el-progress>
    <el-progress type="circle" :stroke-width="4" :width="80" :percentage="0"></el-progress>
    <el-progress type="circle" :stroke-width="4" :width="80" :percentage="68"></el-progress>
    <el-progress type="circle" :stroke-width="4" :width="80" :percentage="100" status="success"></el-progress>
    <el-progress type="circle" :stroke-width="4" :width="80" :percentage="70" status="warning"></el-progress>
    <el-progress type="circle" :stroke-width="4" :width="80" :percentage="50" status="exception"></el-progress>
    <div>=================================小号进度条=================================</div>
    <el-progress :percentage="50" style="width: 200px" class="smallProgress" :stroke-width="5"></el-progress>
    <el-progress :percentage="70" style="width: 200px" class="smallProgress" :stroke-width="5"></el-progress>
    <el-progress
      :percentage="100"
      status="success"
      style="width: 200px"
      class="smallProgress"
      :stroke-width="5"
    ></el-progress>
    <el-progress
      :percentage="80"
      status="warning"
      style="width: 200px"
      class="smallProgress"
      :stroke-width="5"
    ></el-progress>
    <el-progress
      :percentage="50"
      status="exception"
      style="width: 200px"
      class="smallProgress"
      :stroke-width="5"
    ></el-progress>
    <el-progress type="circle" :stroke-width="2" :width="40" :percentage="0"></el-progress>
    <el-progress type="circle" :stroke-width="2" :width="40" :percentage="68"></el-progress>
    <el-progress type="circle" :stroke-width="2" :width="40" :percentage="100" status="success"></el-progress>
    <el-progress type="circle" :stroke-width="2" :width="40" :percentage="70" status="warning"></el-progress>
    <el-progress type="circle" :stroke-width="2" :width="40" :percentage="50" status="exception"></el-progress>
    <!-- Result结果 -->
    <div style="margin: 10px 0">=================================Result结果=================================</div>
    <div style="display: flex">
      <el-result icon="success" title="应用创建成功" subTitle="这是一句创建成功的描述这是一句创建成功的描述">
        <template slot="extra">
          <el-button type="primary" size="medium">创建应用</el-button>
          <el-button class="cancelBtn" size="medium">返回列表</el-button>
        </template>
      </el-result>
      <el-result icon="warning" title="应用创建失败" subTitle="这是一句创建失败的描述这是一句创建失败的描述">
        <template slot="extra">
          <el-button type="primary" size="medium">创建应用</el-button>
          <el-button class="cancelBtn" size="medium">返回列表</el-button>
        </template>
      </el-result>
    </div>
    <!-- 表单 -->
    <div style="margin: 10px 0">=================================表单=================================</div>
    <el-form
      :model="ruleForm"
      style="width: 600px"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域" style="width: 300px">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.date1"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="lineStyle" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送" prop="delivery">
        <el-switch v-model="ruleForm.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')" class="cancelBtn">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- Transfer穿梭窗 -->
    <div style="margin: 10px 0">=================================Transfer穿梭窗=================================</div>
    <el-transfer
      v-model="value"
      :left-default-checked="[2, 3]"
      :right-default-checked="[1]"
      :titles="['源列表', '目的列表']"
      @change="handleChange"
      :data="data"
    >
      <!-- <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
      <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button> -->
    </el-transfer>
    <!-- 自定义info信息窗 -->
    <div style="margin: 10px 0">=================================自定义info信息窗=================================</div>
    <info-window infoWidth="400px" infoHeight="300px" headerTitle="开采现状分析">
        <div style="padding:20px">放主内容</div>
    </info-window>
  </div>
</template>
<script>
import infoWindow from '@/components/info-window/index.vue';

export default {
  components: {
    infoWindow,
  },
  data() {
    const generateData = () => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0,
        });
      }
      return data;
    };
    return {
      // 自定义进度条颜色，使用:color="colors"
      colors: 'rgba(166, 29, 36, 1)',
      // 表单
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
        date1: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
        date2: [{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }],
        type: [{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }],
        resource: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }],
      },
      //   transfer穿梭窗
      data: generateData(),
      value: [1],
      value4: [1],
    };
  },
  methods: {
    format() {
      // 有参数percentage
      return '加载中';
      //   return percentage === 100 ? '满' : `${percentage}%`;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },
  },
};
</script>
<style scoped>
.el-progress {
  margin: 10px 10px;
}
.lineStyle {
  text-align: center;
}
</style>
