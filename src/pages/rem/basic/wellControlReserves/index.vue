<template>
  <div style="width: 100%; height: 100%" class="pageBox">
    <header-search class="g-w100 g-h100">
      <div class="g-row-flex-V g-w100 g-h100">
        <div style="margin-top: 20px">
          <el-form :model="ruleForm" ref="ruleForm" :inline="true">
            <el-form-item label="油田">
              <el-select v-model="ruleForm.yt" prop="yt" placeholder="">
                <el-option v-for="item in ytOptions" :key="item.id" :label="item.ytmc" :value="item.id"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="平台" prop="pt">
              <el-select v-model="ruleForm.pt" placeholder="">
                <el-option v-for="item in ptOptions" :key="item.id" :label="item.ptmc" :value="item.id"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="井别" prop="jb">
              <el-select v-model="ruleForm.jb" placeholder="">
                <el-option v-for="item in jbOptions" :key="item.id" :label="item.jbmc" :value="item.id"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="评价时间" prop="pjsj">
              <el-date-picker v-model="ruleForm.pjsj" type="month" format="yyyy-MM" value-format="yyyy-MM">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </header-search>

    <info-window infoWidth="100%" infoHeight="100%" headerTitle="单井储量信息维护">
      <div class="smart-energy-item">
        <el-form
          :model="djclForm"
          style="width: 800px; padding-top: 20px"
          ref="djclForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-row>
            <el-col :span="10">
              <el-form-item label="层位选择" prop="cw">
                <el-select v-model="djclForm.cw" placeholder="">
                  <el-option v-for="item in cwOptions" :key="item.id" :label="item.cwmc" :value="item.id"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10">
              <el-form-item label="有效厚度" prop="cw">
                <el-input v-model="djclForm.yxhd"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">m</el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="控制储量" prop="kzcl">
                <el-input v-model="djclForm.kzcl"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">m³</el-col>
            <el-col :span="10">
              <el-form-item label="控制面积" prop="kzmj">
                <el-input v-model="djclForm.kzmj"></el-input>
                <span style="position:absolue;top:19%;right:6%;color:#adadad;display:table-cell;white-space:nowrap;padding:7px 10px">㎡</span>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="2">㎡</el-col> -->
          </el-row>
          <el-row>
            <el-col :span="24" align="right" style="padding-top:20px">
       
                <el-button type="primary" icon="el-icon-edit">编辑</el-button>
                <el-button type="primary">保存</el-button>
                <el-button type="primary" icon="el-icon-search">运行计算</el-button>
           
            </el-col>
          </el-row>
        </el-form>
      </div>
    </info-window>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      ytOptions: [
        {
          id: '1',
          ytmc: '秦皇岛32-6',
        },
      ],
      ptOptions: [
        {
          id: '0',
          ptmc: '全部',
        },
        {
          id: '1',
          ptmc: '平台1',
        },
      ],
      jbOptions: [
        {
          id: '0',
          jbmc: '全部',
        },
        {
          id: '1',
          jbmc: '井别1',
        },
      ],
      cwOptions: [
        {
          id: '1',
          cwmc: 'N1ml I -3',
        },
      ],
      ruleForm: {
        yt: '1',
        pt: '0',
        jb: '0',
        pjsj: new Date().format('yyyy-MM'),
      },
      djclForm: {
        cw: '1',
        yxhd: '10',
        kzcl: '10000',
        kzmj: '260',
      },
    };
  },
  methods: {},
};
</script>

<style scoped>
.pageBox {
  color: var(--formText);
  position: relative;
  font-family: PingFangSC-Regular, PingFang SC;
}
/* .smart-energy-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 80px);
} */
</style>
<style lang="scss" scoped>
.smart-energy-item {
  width: 1000px;
  height: 500px;
  text-align: center;
  border: 2px solid #5be4e4;
  margin: 50px auto 30px;
  position: relative;
  padding-top: 70px;
  padding-left: 80px;

  &::after {
    content: '';
    width: calc(100% - 20px);
    height: 100%;
    position: absolute;
    left: 12px;
    top: -1px;
    bottom: -1px;
    border-bottom: 2px solid #0e393b;
    border-top: 2px solid #0e393b;
  }
  &::before {
    content: '';
    width: 100%;
    height: calc(100% - 20px);
    position: absolute;
    left: -1px;
    right: -1px;
    top: 12px;
    border-left: 2px solid #0e393b;
    border-right: 2px solid #0e393b;
  }
}
</style>
