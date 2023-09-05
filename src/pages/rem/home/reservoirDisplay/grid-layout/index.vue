<!-- layout栅格布局：20行12列 -->
<template>
    <div id="scape">
        <div v-show="isOperation" class="g-w100 g-h100 boxOpacity" />
        <div v-show="isOperation" class="topHeaderBtn">
            <el-button type="primary" :disabled="isDisableReset" @click="resetItem">
                重置
            </el-button>
            <el-button type="primary" @click="saveItem">
                保存
            </el-button>
            <el-button class="commonBtn" @click="cancelItem">
                取消
            </el-button>
        </div>
        <div style="position: relative;top:-40px">
            <el-button type="primary" style="position:absolute;top:10%;right:2%" @click="movement()">一键推送
            </el-button>
        </div>
        <grid-layout
            :class="$store.getters['user/getIsMax'] ? 'fullWindow' : 'smallWindow'"
            :style="{ position: $store.getters['user/getIsMax'] ? 'absolute' : 'relative' }"
            :layout.sync="currentLayout"
            :col-num="colNum"
            :row-height="singleHeight"
            :max-row="3"
            :margin="[10, 10]"
            :is-draggable="isOperation"
            :is-resizable="isOperation"
            :is-mirrored="false"
            :vertical-compact="true"
            :auto-size="false"
            :use-css-transforms="true"
            :responsive="false"
            @layout-updated="layoutUpdatedEvent"
            @layout-ready="layoutReadyEvent"
        >
            <grid-item
                v-for="item in currentLayout"
                :key="item.i"
                :ref="'grid' + item.i"
                :x="item.x"
                :y="item.y"
                :w="item.w"
                :h="item.h"
                :i="item.i"
                :style="{
          display:
            currentOpertTitle === ''
              ? 'block'
              : item.name === currentOpertTitle && $store.getters['user/getIsMax']
                ? 'block'
                : !$store.getters['user/getIsMax']
                  ? 'block'
                  : 'none',
        }"
                drag-allow-from=".vue-draggable-handle"
                drag-ignore-from=".no-drag"
                @resized="resizedEvent"
            >
                <div v-show="isOperation" class="g-w100 g-h100 bb">
                    <svg-icon
                        v-show="isOperation"
                        icon-class="dark-operate"
                        style="position: absolute;bottom: 0; right: 0; opacity: 1; fill: green; font-size: 22px"
                    />
                </div>
                <div style="position: relative;z-index: 1;">
                    <div class="operateBtn g-row-flex">
                        <i v-show="isOperation" class="el-icon-rank vue-draggable-handle" style="margin: 0 0 0 10px" />
                    </div>
                </div>
                <component :is="getContent(item.name)" :current-resize-list="currentResizeList" class="no-drag" />
            </grid-item>
        </grid-layout>
        <el-dialog
            title="推送邮箱"
            :visible.sync="dialog"
            width="30%"
            v-if="dialog"
            :close-on-click-modal="true"
        >
            <el-form inline >
                <el-form-item label="发送邮箱:">
                    <el-input  v-model="mailBox" style="width: 300px"> <i slot="suffix" >@cnooc.com.cn</i></el-input>
                </el-form-item>
                <el-form-item label="邮件标题:">
                    <el-input style="width: 300px"  v-model="mailtitle"></el-input>
                </el-form-item>
                <el-form-item label="邮件内容:">
                    <el-input style="width: 400px" v-model="content" :rows="3" type="textarea"> </el-input>
                </el-form-item>
                <el-form-item style="margin-left:150px;">
                    <el-button class="cancelBtn" style="text-align: center" @click="dialog = false">取 消</el-button>
                    <el-button type="primary" class="buttonActive_primary" @click="comfirm">确 定</el-button>
                </el-form-item>

            </el-form>

        </el-dialog>
    </div>
</template>
<script>
import VueGridLayout from "vue-grid-layout";
import { queryByPageName, savePage } from "@/api/intelligentOilfield/system/layout";
import daily from "../infoWindow/daily.vue";
import oilInfo from "../infoWindow/oilInfo.vue";
import oilEvent from "../infoWindow/oilEvent.vue"
import monthContrast from "../modules/monthContrast/index.vue"
import yieldComponects from "../modules/yieldComponects/index.vue"
import capacityFluctuations from "../modules/capacityFluctuations/index.vue"
import problemStatistics from "../modules/problemStatistics/index.vue"
import shutdownWell from "../modules/shutdownWell/index.vue"
import exhibition from "../modules/exhibition/index.vue"
import stratifiedInjection from "../modules/stratifiedInjection/index.vue"
import effectMeasure from "../modules/effectMeasure/index.vue"
import owing from "../modules/owing/index.vue"
import naturalDecline from "../modules/naturalDecline/index.vue"
import recoverLevel from "../modules/recoverLevel/index.vue"
import recoveryRate from "../modules/recoveryRate/index.vue"
import waterUp from "../modules/waterUp/index.vue"
import overviewIndicators from "../modules/overviewIndicators/index.vue"
import html2canvas from "html2canvas";
import {send} from "@/api/rem/electricpumpfailureprediction";
export default {
    components: {
        GridLayout: VueGridLayout.GridLayout,
        GridItem: VueGridLayout.GridItem
    },
    props: {
        // 公司名称
        companyName: {
            type: String,
            default: ""
        },
        // 当前显示面板布局
        layout: {
            type: Array,
            default: () => []
        },
        // 20行
        rowNum: {
            type: Number,
            default: 20
        }
    },
    data() {
        return {
            currentOpertTitle: "", // 当前操作放大缩小title的name，让其显示隐藏
            isDisableReset: true, // 重置是否被禁用，当接口有重置面板数据时方可点击重置按钮
            pageName: "", // 唯一标识
            currentLayout: JSON.parse(JSON.stringify(this.layout)), // 当前显示面板布局
            colNum: 12, // 12列
            interfaceDataStore: [], // 用于取消，上一次存储，
            initLayOut: [], // 模板面板存储
            isOperation: false, // 是否可拖拽和移动
            dialogVisible: false,
            dialog:false,
            mailBox:'sh_326yykf',
            mailtitle:'油藏看板',
            content:`尊敬的用户：\n您好!\n附件为油藏看板请您查看。`,
            singleHeight: (document.body.clientHeight - this.heightFromBottom) / this.rowNum, // 单个行高
            screenWidth: document.body.clientWidth, // 屏幕宽度
            screenHeight: document.body.clientHeight, // 屏幕高度
            heightFromBottom: 350, // 距离底部高度
            currentResizeList: { // 拖拽缩放组件集合
                i: 0,
                newH: 0,
                newW: 0,
                newHPx: 0,
                newWPx: 0
            }
        };
    },
    watch: {
        layout: {
            handler(newVal) {
                this.currentLayout = newVal;
                this.getWidthHeight();
            },
            deep: true,
            immediate: true
        }
    },
    created() {
        // 拼接唯一标识id，通过“公司名称_路由name”
        this.pageName = `${this.companyName}_${this.$router.app?.$route?.name}`;
        const tenantId = this.$store.getters["user/tenantId"];
        queryByPageName(this.pageName, tenantId).then(res => {
            if (res ? res.data.code === 200 : false) {
                if (res.data.data === null || res.data.data?.pageInfo === null) { // 首次获取面板赋值
                    this.interfaceDataStore = JSON.parse(JSON.stringify(this.currentLayout)); // 用户存储上次编辑的面板【取消用】
                    this.isDisableReset = true;
                } else { // 非首次，面板从接口获取
                    this.currentLayout = [];
                    this.currentLayout = JSON.parse(res.data.data?.pageInfo); // 当前显示面板
                    this.initLayOut = JSON.parse(res.data.data?.initialPageInfo); // 默认面板【重置用】
                    this.isDisableReset = !this.initLayOut;
                    this.interfaceDataStore = JSON.parse(res.data.data?.pageInfo); // 用户存储上次编辑的面板【取消用】
                }
            }
        });
    },
    beforeDestroy() {
        // 注册的总线事件要在组件销毁时卸载，否则会多次挂载，造成触发一次但多个响应的情况
        this.$bus.$off("emitBus");
        this.$bus.$off("zoomOut");
    },
    mounted() {
        this.$bus.$on("emitBus", () => {
            // 监听是否编辑面板
            this.isOperation = true;
        });
        this.$bus.$on("zoomOut", val => {
            // 监听是放大缩小面板
            this.currentOpertTitle = val;
        });
        this.computeNum();
        window.onresize = () =>
            (() => {
                // 监听页面宽高变化
                this.computeNum();
            })();
    },
    methods: {
        movement(){
            this.dialog = true
        },
        comfirm(){
            this.dialog = false
            this.infolist()
        },
        infolist(){
            this.$nextTick(()=>{
                const screenEl = document.getElementById('scape');
                html2canvas(document.body, {
                    useCORS: true,
                    dpi:150,
                    scale:2,
                    height: screenEl.scrollHeight + 200,
                    windowHeight: screenEl.scrollHeight + 200,
                }).then((canvas) => {
                    this.saveUrl = canvas.toDataURL()
                    var base64String = this.saveUrl.split(",")[1];
                    var byteCharacters = atob(base64String);
                    var byteArray = new Uint8Array(byteCharacters.length);
                    for (var i = 0; i < byteCharacters.length; i++) {
                        byteArray[i] = byteCharacters.charCodeAt(i);
                    }
                    let data = {
                        requestId: "f198c1a239254b0e86529a0668cf4adb",
                        toAddr:[this.mailBox + '@cnooc.com.cn'],
                        subject:this.mailtitle,
                        content:this.content,
                        ccAddr:[],
                        senderKey:'ipmEmail',
                        attachments: [{filename:"油藏看板",filedata:[...byteArray] }],
                    }
                    send(data).then((res)=>{
                        if(res==true){
                            this.$message.success('发送成功！');
                        }
                    })
                })
            })
        },
        // 保存元素
        saveItem() {
            const queryParamsNew = {
                userId: this.$store.getters["user/userDetail"].user.userId,
                pageInfo: JSON.stringify(this.currentLayout), // 页面json
                pageName: this.pageName,
                tenantId: this.$store.getters["user/tenantId"]
            };
            savePage(queryParamsNew).then(res => {
                if (res ? res.data.code === 200 : false) {
                    this.isOperation = false;
                    this.interfaceDataStore = JSON.parse(JSON.stringify(this.currentLayout));
                }
            });
        },
        getWidthHeight() {
            setTimeout(() => {
                this.$nextTick(() => {
                    this.currentLayout.forEach(item => {
                        item.height = this.$refs[`grid${item.i}`][0].$el.offsetHeight;
                        item.width = this.$refs[`grid${item.i}`][0].$el.offsetWidth;
                    });
                });
            }, 300);
        },
        computeNum() {
            this.screenWidth = document.body.clientWidth * window.devicePixelRatio;
            this.screenHeight = document.body.clientHeight * window.devicePixelRatio;
            this.singleHeight = (this.screenHeight - this.heightFromBottom) / this.rowNum; // 一份元素的高度
        },
        // 重置元素
        resetItem() {
            this.$confirm("是否将面板重置模板设定？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                // 面板重置并保存
                // 请将默认面板拷贝给后端，否则重置后的数据可能为空
                this.currentLayout = JSON.parse(JSON.stringify(this.initLayOut));
                this.getWidthHeight();
                const queryParamsNew = {
                    userId: this.$store.getters["user/userDetail"].user.userId,
                    pageInfo: JSON.stringify(this.initLayOut), // 页面json
                    pageName: this.pageName
                };
                savePage(queryParamsNew).then(res => {
                    if (res ? res.data.code === 200 : false) {
                        this.isOperation = false;
                    }
                });
            }).catch(() => { });
        },
        // 取消元素
        cancelItem() {
            this.$confirm("是否取消当前所有操作？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                // 面板取消逻辑
                this.currentLayout = JSON.parse(JSON.stringify(this.interfaceDataStore));
                this.getWidthHeight();
                // 关闭编辑窗体
                this.isOperation = false;
            }).catch(() => { });
        },
        getContent(i) {
            // if(i.show == true){
                switch (i) {
                case "秦皇岛32-6油田日度产量跟踪" :
                    return daily;
                case "剩余油情况":
                    return oilInfo;
                case "油田大事件":
                    return oilEvent;
                case "秦皇岛32-6油田月度产量对比图":
                    return monthContrast;
                case "产量构成详情":
                    return yieldComponects;
                case "产能波动":
                    return capacityFluctuations;
                case "问题井统计":
                    return problemStatistics;
                case "关停井统计":
                    return shutdownWell;
                case "单井井底流压":
                    return exhibition;
                case "分层注入量":
                    return stratifiedInjection;
                case "措施效果跟踪表":
                    return effectMeasure;
                case "超欠注情况统计":
                    return owing;
                case "自然递减率":
                    return naturalDecline;
                case "采出程度与含水率关系图":
                    return recoverLevel;
                case "采油速度":
                    return recoveryRate;
                case "含水上升":
                    return waterUp;
                case "秦皇岛32-6油田生产指标总览":
                    return overviewIndicators;
                    // 增加所需要引入子组件
                default:
                    break;
                }
            // }
        },
        layoutUpdatedEvent(newLayout) {
            this.tempLayOut = newLayout;
        },
        layoutReadyEvent() {
        },

        resizedEvent(i, newH, newW, newHPx, newWPx) {
            //   console.log(`RESIZED i=${i}, H=${newH}, W=${newW}, H(px)=${newHPx}, W(px)=${newWPx}`);
            this.currentResizeList = { i, newH, newW, newHPx, newWPx };
            this.currentLayout.find(item => item.i === i).height = newHPx;
            this.currentLayout.find(item => item.i === i).width = newWPx;
        }
    }
};
</script>

<style scoped>
.vue-grid-layout {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
}

.fullWindow >>> .vue-grid-item {
    /* 最大化 */
    width: 100vw !important;
    height: 100vh !important;
    transform: translate3d(0, 0, 0) !important;
    z-index: 999;
    position: relative;
}

.smallWindow >>> .vue-grid-item {
    /* 最小化 */
    width: auto;
}

.aa {
    position: absolute;
    left: 0;
    top: 0;
    color: aliceblue;
}

.bb {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    border: 3px solid rgba(0, 222, 240, 1);
    pointer-events: auto !important;
    z-index: 1;
}

.operateBtn {
    position: absolute;
    top: 10px;
    color: rgba(0, 222, 240, 1);
    cursor: pointer;
    font-size: 22px;
    right: 20px;
}

.boxOpacity {
    position: absolute;
    top: 0;
    left: 0;
    height: 60px;
    background: rgba(0, 0, 0, 1);
    opacity: 0.6;
}

.topHeaderBtn {
    z-index: 1;
    position: absolute;
    top: 10px;
    right: 800px;
}
</style>