<!-- 我的待办组件 -->
<template>
  <div style="font-size: 20px" class="g-w100 g-h100">
    <info-window infoWidth="100%" infoHeight="100%" headerTitle="我的待办">
      <div class="g-w100 g-h100 g-row-flex" style="padding: 20px">
        <verticalSwitchButton @selectBtn="selectBtn" buttonWidth="120px" style="width: 9%"></verticalSwitchButton>
        <!-- 右侧事项列表 -->
        <el-scrollbar class="scrollbar">
          <div class="listBox g-row-column">
            <div class="listItemBox g-row-flex-V" :style="{background: $store.state.setting.mode==='dark'? 'rgba(0, 222, 240, 0.2)':'#fff',color: $store.state.setting.mode==='dark'? 'rgba(255,255,255,0.7)':'rgba(0, 0, 0, 0.6)'}" v-for="(item, index) in eventList" :key="index">
              <div style="width: 5%" class="text-center">{{ index + 1 }}</div>
              <div style="width: 51%" :style="{color: $store.state.setting.mode==='dark'? 'rgba(255,255,255,0.9)':'#303133'}"  class="mainText">{{ item.name }}</div>
              <div class="g-row-flex-V text-center" style="width: 7%">
                <div class="dot" :style="{ background: item.isHandle === 0 ? '#faad14' : '#0060a6' }"></div>
                <div>{{ item.isHandle === 0 ? '待办' : '已办' }}</div>
              </div>
              <div style="width: 13%" class="text-center">发起时间：{{ item.initiationTime }}</div>
              <div style="width: 12%" class="text-center">发起人：{{ item.person }}</div>
              <div style="width: 12%" :style="{color: $store.state.setting.mode==='dark'? 'var(--lightBlueColor)':'#0060a6'}" class="operation text-center">处理</div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </info-window>
  </div>
</template>
<script>
import infoWindow from '@/components/info-window/index.vue';
import verticalSwitchButton from '@/components/vertical-switch-button/index.vue';

export default {
  components: {
    infoWindow,
    verticalSwitchButton,
  },
  data() {
    return {
      eventList: [
        { name: '新项目座谈会议将在11:30召开，地点位于302', isHandle: 0, initiationTime: '2022-11-11', person: '李潇' },
        { name: '新项目座谈会议将在11:30召开，地点位于302', isHandle: 1, initiationTime: '2022-11-11', person: '李潇' },
        { name: '新项目座谈会议将在11:30召开，地点位于302', isHandle: 0, initiationTime: '2022-11-11', person: '李潇' },
        { name: '新项目座谈会议将在11:30召开，地点位于302', isHandle: 1, initiationTime: '2022-11-11', person: '李潇' },
        { name: '新项目座谈会议将在11:30召开，地点位于302', isHandle: 1, initiationTime: '2022-11-11', person: '李潇' },
        { name: '新项目座谈会议将在11:30召开，地点位于302', isHandle: 0, initiationTime: '2022-11-11', person: '李潇' },
      ],
    };
  },
  methods: {
    selectBtn(item) {
      console.log('当前选中===', item);
    },
  },
};
</script>

<style scoped>
.scrollbar {
  width: 90%;
}
.listBox {
  margin: 5px auto;
  width: 98%;
}
.scrollbar-wrap {
  overflow-x: hidden;
}
.listItemBox {
  width: 100%;
  height: 45px;
  background: #ffffff;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.3);
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 10px;
}
.mainText {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
  color: #303133;
}
.dot {
  background: #faad14;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  margin-right: 5px;
}
.operation {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #0060a6;
}
</style>
