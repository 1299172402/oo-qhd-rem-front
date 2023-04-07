<!--示踪剂-->
<template>
  <el-container class="mt-2">
    <el-main>
      <div>
        <el-row style="padding-top: 20px">
          <el-radio-group v-model="selectPosition">
            <el-radio v-for="(item,index) in position" :key="index" :label="item.value">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-row>
        <el-row style="padding-top: 20px">
          <div style="height: 600px">
            <div
                class="fl"
                title="示踪剂解释成果"
                style="width: 49.5%; height: 600px;overflow: auto;"
            >
              <el-image :src="imageFirst">
                <div slot="error">
                </div>
              </el-image>
            </div>
            <div
                class="fr"
                title="示踪剂报告"
                style="width: 49.5%; height: 600px"
            >
              <iframe :src="imageSecond?(imageSecond+'#toolbar=0'):''" style="width: 100%;height: 100%;"></iframe>
            </div>
          </div>
          <div style="margin-top: 10px;height:600px;overflow: auto;">
            <el-image  :src="imageThird">
              <div slot="error">
              </div>
            </el-image>
          </div>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import {tracer} from "@/api/oilDeposit/rem-01/wellgroupdynamicanalysis.js";
import {downFile} from "@/lib/remBase64Download.js";
export default {
  props: {
    //油田id
    oilFieldId: {},
    //区块id
    blockId: {},
    //层系id
    layerId: {},
    //井组id
    wellGroupId: {}
  },
  data() {
    return {
      //示踪剂信息
      imageFirst: '',
      //示踪剂报告
      imageSecond: '',
      //示踪剂结果
      imageThird: '',
      //单选按钮对应信息
      position: [
        {
          label: '示踪剂结果',
          value: 'TRACER_RESULTS',
        }, {
          label: '示踪剂报告',
          value: 'TRACER_REPORT',
        }, {
          label: '示踪剂信息',
          value: 'TRACER_INFORMATION',
        },],
      //单选按钮选中项
      selectPosition: '',
    };
  },
  watch: {
    selectPosition(val) {
      this.$emit('childPara', this.selectPosition);
    }
  },
  mounted() {
    //初始化调用搜索
    this.doSearch();
  },
  methods: {
    /**
     * hwh
     * 调用图片
     */
    doSearch() {
      let request = {
        oilFieldId: this.oilFieldId,
        fieldId: this.blockId,
        fieldLayerId: this.layerId,
        wellGroupId: this.wellGroupId,
      };
      tracer(request).then((res) => {
        if (res.data.code == 0) {
          /*let firstParty = 'data:;base64,';*/
          /*let secondParty = 'data:application/pdf;base64,';*/
          let first = res.data.data.tracePic;
          let firstType = res.data.data.tracePicType;
          let second = res.data.data.report;
          let secondType = res.data.data.reportType;
          let third = res.data.data.information;
          let thirdType = res.data.data.informationType;
          if(first)
            this.imageFirst = 'data:'+ firstType +';base64,' + first;
          else
            this.imageFirst = '';
          if(second){
            this.imageSecond = 'data:'+ secondType +';base64,'  + second;
          } else{
            this.imageSecond = '';
          }
          if(third)
            this.imageThird = 'data:'+ thirdType +';base64,'  + third;
          else
            this.imageThird = '';
        }
      });
    },
    /**
     * hwh
     * 下载
     */
    doDownLoad(){
      let fileName = '示踪剂';
      if(this.wellGroupName){
        fileName = this.wellGroupName + fileName;
      }
      if(this.imageFirst)
      downFile(this.imageFirst,fileName+'示踪剂结果');
      if(this.imageSecond)
      downFile(this.imageSecond,fileName+'示踪剂报告');
      if(this.imageThird)
      downFile(this.imageThird,fileName+'示踪剂信息');
    }
  }
};
</script>

<style lang="scss" scoped>
</style>