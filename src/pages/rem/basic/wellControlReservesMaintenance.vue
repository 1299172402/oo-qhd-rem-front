<template>
    <div style="width: 100%; height: 100%" class="pageBox">
      <header-search class="g-w100 g-h100">
        <el-form :model="form" :inline="true">
          <el-form-item label="油田" prop="yt">
            <el-select v-model="form.yt" placeholder="">
              <el-option 
              v-for="item in ytOptions"
              :key="item.id"
              :label="ytmc" 
              :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="平台" prop="pt">
            <el-select v-model="form.pt" placeholder="">
              <el-option 
              v-for="item in ptOptions"
              :key="item.id"
              :label="ptmc" 
              :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="井别" prop="jb">
            <el-select v-model="form.jb" placeholder="">
              <el-option 
              v-for="item in jbOptions"
              :key="item.id"
              :label="jbmc" 
              :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="评价时间" prop="pjsj">
            <el-date-picker
              v-model="form.pjsj"
              type="month"
              format="yyyy-MM"
              value-format="yyyy-MM">
            </el-date-picker>  
          </el-form-item>
          <el-form-item>
            <el-button type="primary">搜索</el-button>
          </el-form-item>
        </el-form>
      </header-search>
      <pagePanelNew headerTitle="QHD32-6-A1井" style="height:calc(100% - 100px);" class="g-w100">
        <el-form
          :model="djclForm"
          style="width: 600px"
          ref="djclForm"
          label-width="100px"
          class="demo-ruleForm">
          <el-form-item label="层位选择" prop="cw">
            <el-input v-model="djclForm.cw"></el-input>
          </el-form-item>
          <el-form-item label="有效厚度" prop="cw">
            <el-input v-model="djclForm.yxhd"></el-input>
          </el-form-item>
          <el-form-item label="控制储量" prop="kzcl">
            <el-input v-model="djclForm.kzcl"></el-input>
          </el-form-item>
          <el-form-item label="有效厚度" prop="kzmj">
            <el-input v-model="djclForm.kzmj"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('djclForm')">编辑</el-button>
            <el-button type="primary" @click="submitForm('djclForm')">保存</el-button>
            <el-button type="primary" @click="submitForm('djclForm')">运行计算</el-button>
          </el-form-item>
        </el-form>
      </pagePanelNew>
    </div>
  </template>
  
<script>

export default {
  components: {

  },
  data() {
    return {
      ytOptions:[{
        id: '1',
        ptmc: '秦皇岛32-6'
      }],
      ptOptions:[{
        id: '0',
        ptmc: '全部'
      },{
        id: '1',
        ptmc: '平台1'
      }],
      jbOptions:[{
        id: '0',
        jbmc: '全部'
      },{
        id: '1',
        jbmc: '井别1'
      }],
      cwOption:[{
        id: '1',
        cwmc: 'N1ml I -3'
      }],
      form:{
        yt: '1',
        pt: '0',
        jb: '0',
        pjsj: (new Date()).format("yyyy-MM"),
      },
      djclForm:{
        cw: '1',
        yxhd: '10',
        kzcl: '10000',
        kzmj: '260'
      }
    },
  },
  mounted(){

  },
  methods:{
    submitForm(formName){

    }
  }
}
  
</script>
  
<style scoped>
.pageBox {
    color: var(--formText);
    position: relative;
    font-family: PingFangSC-Regular, PingFang SC;
}
.topSearchDiv {
    display: flex;
}
.btnPosition {
    margin: 0 0 20px 0;
    justify-content: flex-end;
}  
</style>
  