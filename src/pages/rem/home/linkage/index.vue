<template>
    <div class="container" style="height: calc(100% - 20px);width: 100%;position:relative">
        <div class="topBanner">注采联动</div>
<!--        <video-->
<!--            autoPlay-->
<!--            loop-->
<!--            style="width: 100%;height: 100%;object-fit: cover;position: absolute;top: 10;left: 0;"-->
<!--            muted-->
<!--            src="@/pages/rem/home/linkage/liandong-bg.mp4"/>-->
        <linkageBox @stopTimer="stopTimer" @startTimer="startTimer" :style="item.style" :showFlag="item.showFlag"
                    :currentList="item" :key="index" v-for="(item,index) in currentLists"></linkageBox>
        <div class="studySelf">
            <div class="studySelfInside"></div>
            <span>模型自学习</span>
        </div>
        <img class="downArrow" style="display: block;z-index:-1" src="@/assets/linkage/arrow-left.png" alt="">
        <img class="downArrow" style="z-index:-1" src="@/assets/linkage/arrow-left.png" alt="">
        <img class="rightArrow" src="@/assets/linkage/arrow-left.png" alt="">
        <img class="upArrow" src="@/assets/linkage/arrow-left.png" alt="">
        <img class="leftUpArrow" src="@/assets/linkage/arrow-left.png" alt="">
        <img class="leftArrow" src="@/assets/linkage/arrow-left.png" alt="">
        <img class="leftDownArrow" src="@/assets/linkage/arrow-left.png" alt="">
    </div>
</template>

<script>
import request from '@/utils/request'
import linkageBox from "./linkageBox/index.vue";
import {InjectionProdInfo, queryLinkageAlarmInfo} from "@/api/rem/injectionproductionlinkage";

let curDate = new Date()
let data1 = new Date(curDate.getTime() - 24 * 60 * 60 * 1000 * 3).format('YYYY-MM-DD')
let data2 = new Date(curDate.getTime() - 24 * 60 * 60 * 1000 * 5).format('YYYY-MM-DD')
export default {
    components: {
        linkageBox
    },
    mounted() {
        const env = import.meta.env.MODE;
        if (window.location.origin.includes('test')) {
            this.baseUrl = 'tjioms-test.tjltd.cnooc'
        } else if (window.location.origin.includes('dev') || window.location.origin.includes('808')) {
            this.baseUrl = 'tjioms-dev.tjltd.cnooc'
        }else if (window.location.origin.includes('tpro')) {
            this.baseUrl = 'tjioms-tpro.tjltd.cnooc'
        }
        this.getWarningInfo()
        this.getinfo()
        //预警信息轮询查询
        this.timmerWarning = setInterval(() => {
            this.getWarningInfo()
        }, 1000 * 30)
        this.arrowFun()
        //转动弹出图片循环
        this.timmer = setInterval(() => {
            this.arrowFun()
        }, 100 * 50)
    },
    methods: {
        getinfo() {
            this.currentLists = [
                {
                    //选项卡的定位位置
                    style: 'position:absolute;left: 80%;top: 21%;width:20%;height:40%;',
                    //悬浮按钮名称
                    boxText: '智能分采井调控测试',
                    //悬浮按钮二级名称及路由跳转地址
                    boxBottomText: [{
                        name: '智能配产器调控模型',
                        warningShowFlag: false,
                        alarmTime: "",
                        url: `https://ipm.${this.baseUrl}/#/intelligentDispensing/sumMining?page=Linkage`
                    }, {name: '举升设备调控模型', warningShowFlag: false,},
                        {name: '智能测试模型', warningShowFlag: false,}],
                    //弹出框自定义样式
                    boxStyle: {
                        pWidth: 'width:11vw',
                    },
                    //图片资源
                    imgUrl: new URL('./topBox/23.png', import.meta.url).href,
                    //是否展示（通过定时器和组件内鼠标移入移出事件来控制该属性达到动态展示效果）
                    showFlag: false,
                    //预警信息接口返回的编号是否属于该项
                    typeIdList: [],
                    alarmPageCode: [],
                    //是否展示预警信息（轮询预警信息接口）
                    warningShowFlag: false,
                },
                {
                    style: 'position:absolute;left: 63%;top: 22%;width:20%;height:42%;',
                    boxText: '智能分注井调控测试',
                    boxBottomText: [{
                        name: '智能分注井调控测试',
                        warningShowFlag: false, alarmTime: "",
                        url: `https://ipm.${this.baseUrl}/#/intelligentDispensing?link=rem&page=Linkage`
                    }],
                    boxBottomContent: [[{name: '智能配水器调控模型', warningShowFlag: false, url: ''}, '智能测试模型']],
                    boxStyle: {
                        pWidth: 'width:11vw',
                    },
                    imgUrl: new URL('./topBox/22.png', import.meta.url).href,
                    showFlag: false,
                    typeIdList: [],
                    alarmPageCode: [],
                    warningShowFlag: false,
                },
                {
                    style: 'position:absolute;left: 70%;top: 60%;width:20%;height:38%;',
                    boxText: '注采调控油藏方案',
                    boxBottomText: [{
                        name: '分层注水优化',
                        warningShowFlag: false,
                        alarmPageCode: 'MIPFSW',
                        alarmTime: "",
                        url: `https://rem.${this.baseUrl}/#/injection/optimization?page=Linkage`
                    },
                        {
                            name: '产液结构优化', warningShowFlag: false,
                        }],
                    boxBottomContent: [['智能滚动配注模型'], ['流场调控模型']],
                    boxStyle: {
                        pWidth: 'width:11vw'
                    },
                    imgUrl: new URL('./topBox/24.png', import.meta.url).href,
                    showFlag: false,
                    typeIdList: [],
                    warningShowFlag: false,
                    alarmPageCode: [],
                    analysisUrl: `https://rem.${this.baseUrl}/#/injection/optimization?page=Linkage`
                },
                {
                    style: 'position:absolute;left: 53%;top: 56%;width:18%;height:40%;',
                    boxText: '注采状况分析',
                    boxBottomText: [
                        {
                            name: '注采连通分析',
                            warningShowFlag: false,
                            alarmPageCode: 'LOWGPC', 
                            alarmTime: "",
                            url: `https://rem.${this.baseUrl}/#/basic/wellGroup_Maintenance?link=linkage&page=Linkage`
                        },
                        {
                            name: '注采平衡分析',
                            warningShowFlag: false,
                            alarmPageCode: 'BTOBAR', alarmTime: "",
                            url: `https://rem.${this.baseUrl}/#/dynamicManagement/dynamicTrackingBlock/blockAnalysisReport?link=1&page=Linkage`
                        },
                        {
                            name: '采出状况分析',
                            warningShowFlag: false,
                            alarmPageCode: 'TTOBAR', alarmTime: "",
                            url: `https://rem.${this.baseUrl}/#/dynamicManagement/dynamicTrackingBlock/blockAnalysisReport?link=2&page=Linkage`
                        }
                    ],
                    boxBottomContent: [
                        [{name: '注采连通性评价模型', url: ''}],
                        [{name: '注采平衡分析模型', url: ''}],
                        [{name: '注采平衡分析采出状况分析模型', url: ''}]
                    ],
                    boxStyle: {
                        pWidth: 'width:8.5vw'
                    },
                    alarmPageCode: [],
                    imgUrl: new URL('./topBox/13.png', import.meta.url).href,//暂无图片
                    showFlag: false,
                    typeIdList: [],
                    warningShowFlag: false,
                },
                {
                    style: 'position:absolute;left:37.5%;top: 60%;width:18%;height:40%;',
                    boxText: '剩余油分布',
                    boxBottomText: [{
                        name: '动态分析法/数模剩余油分析',
                        warningShowFlag: false, alarmTime: "",
                        url: `https://rem.${this.baseUrl}/#/injection/optimization?link=rem&page=Linkage`
                    }],
                    boxStyle: {
                        pWidth: 'width:8.5vw'
                    },
                    imgUrl: new URL('./topBox/11.png', import.meta.url).href,
                    showFlag: false,
                    typeIdList: [],
                    alarmPageCode: [],
                    warningShowFlag: false,
                },
                {
                    style: 'position:absolute;left: 22%;top: 50%;width:20%;height:40%;',
                    boxText: '确定调整井组',
                    boxBottomText: [{
                        name: '油井动态分析',
                        warningShowFlag: false,
                        alarmPageCode: 'TYOBAR', alarmTime: "",
                        url: `https://rem.${this.baseUrl}/#/dynamicManagement/dynamicTrackingOilAuxiliary/oilAnalysisReport?page=Linkage`
                    },
                        {
                            name: '水井动态分析',
                            warningShowFlag: false,
                            alarmPageCode: 'TYOBAR', alarmTime: "",
                            url: `https://rem.${this.baseUrl}/#/dynamicManagement/dynamicTrackingWaterAuxiliary/waterAnalysisReport?page=Linkage`
                        },
                        {
                            name: '井组动态分析',
                            warningShowFlag: false,
                            alarmPageCode: 'TYOBAR', alarmTime: "",
                            url: `https://rem.${this.baseUrl}/#/dynamicManagement/dynamicTrackingWellGroup/wellGroupAnalysisReport?page=Linkage`
                        },
                        {
                            name: '开采现状分析',
                            warningShowFlag: false,
                            alarmPageCode: 'TYOBAR', alarmTime: "",
                            url: `https://rem.${this.baseUrl}/#/dynamicManagement/dynamicTrackingBlock/blockAnalysisReport?page=Linkage`
                        }],
                   
                    boxStyle: {
                        pWidth: 'width:8.5vw'
                    },
                    imgUrl: new URL('./topBox/25.png', import.meta.url).href,
                    showFlag: false,
                    typeIdList: [],
                    alarmPageCode: [],
                    warningShowFlag: false,
                },
                // {
                //     style: 'position:absolute;left: 29%;top: 56%;width:20%;height:40%;',
                //     boxText: '调整区块确定',
                //     boxBottomText: [{
                //         name: '层间/平面矛盾分析',
                //         warningShowFlag: false,
                //         alarmPageCode: 'TYOBAR', alarmTime: "",
                //         url: `https://rem.${this.baseUrl}/#/dynamicManagement/dynamicTrackingBlock/blockAnalysisReport?page=reservoirDisplay/linkage`
                //     }],
                //     boxStyle: {
                //         pWidth: 'width:8.5vw'
                //     },
                //     imgUrl: new URL('./topBox/25.png', import.meta.url).href,
                //     showFlag: false,
                //     typeIdList: [],
                //     alarmPageCode: [],
                //     warningShowFlag: false,
                // },
                {
                    style: 'position:absolute;left: 2%;top: 60%;width:20%;height:40%;',
                    boxText: '产量运行监控',
                    boxBottomText: [
                        {
                            name: '年度产量运行预警',
                            warningShowFlag: false,
                            alarmPageCode: 'QOIWTT', alarmTime: "",
                            url: `https://rem.${this.baseUrl}/#/developStatus/developmentWarningCapacity?name=Linkage`
                        }
                    ],
                    boxBottomContent: [
                        [{
                            name: '年度产量趋势预测',
                            warningShowFlag: false, alarmTime: "",
                            url: `https://rem.${this.baseUrl}/#/modelConfiguration/modelconfig?name=Linkage`
                        }]
                    ],
                    boxStyle: {
                        pWidth: 'width:8.5vw'
                    },
                    alarmPageCode: ['OSTOPF'],
                    imgUrl: new URL('./topBox/21.png', import.meta.url).href,
                    showFlag: false,
                    typeIdList: [],
                    warningShowFlag: false,
                    analysisUrl: `https://rem.${this.baseUrl}/#/yield/statisticalTableProduction?page=Linkage`
                    // analysisUrl:`https://rem.${this.baseUrl}/#/yield/statisticalTableProduction?wellIds=%5B%7B%22wellAllocDailyId%22%3Anull,%22borepipeId%22%3A%22D4BEBD2817E0449F957F78ED0A685A6C%22,%22fluidProdDaily%22%3A289.56,%22oilProdDaily%22%3A6.03,%22waterRatio%22%3A0.06,%22prodDate%22%3A%222023-06-26%22,%22borepipeNo%22%3A%22QHD32-6-I3H1%22%7D,%7B%22wellAllocDailyId%22%3Anull,%22borepipeId%22%3A%22375DB74FC89747028A9436A8E41D3991%22,%22fluidProdDaily%22%3A-4.9,%22oilProdDaily%22%3A4.47,%22waterRatio%22%3A-0.4,%22prodDate%22%3A%222023-06-26%22,%22borepipeNo%22%3A%22QHD32-6-G9H1%22%7D,%7B%22wellAllocDailyId%22%3Anull,%22borepipeId%22%3A%226E73C512F8444CE3BAEE27FE23294144%22,%22fluidProdDaily%22%3A-3.72,%22oilProdDaily%22%3A-2.06,%22waterRatio%22%3A0.54,%22prodDate%22%3A%222023-06-26%22,%22borepipeNo%22%3A%22QHD32-6-F4H3%22%7D,%7B%22wellAllocDailyId%22%3Anull,%22borepipeId%22%3A%2274B59F886DF1459AB58311A6159202A4%22,%22fluidProdDaily%22%3A2.23,%22oilProdDaily%22%3A-2.39,%22waterRatio%22%3A0.37,%22prodDate%22%3A%222023-06-26%22,%22borepipeNo%22%3A%22QHD32-6-F5%22%7D,%7B%22wellAllocDailyId%22%3Anull,%22borepipeId%22%3A%22257DE61B82E94263BFB8239D02447934%22,%22fluidProdDaily%22%3A-36.88,%22oilProdDaily%22%3A-2.9,%22waterRatio%22%3A0.07,%22prodDate%22%3A%222023-06-26%22,%22borepipeNo%22%3A%22QHD32-6-J14H1%22%7D%5D`
                },
                {
                    style: 'position:absolute;left: 20%;top: 0%;width:20%;height:40%;',
                    boxText: '注水设备能力',
                    boxBottomText: [
                        {
                            name: '动设备健康管理模型',
                            warningShowFlag: false, alarmTime: "",
                            url: `https://efm.${this.baseUrl}/#/equipment/mechanical?page=Linkage`
                        }
                    ],
                    boxStyle: {
                        pWidth: 'width:8.5vw'
                    },
                    imgUrl: new URL('./topBox/12.png', import.meta.url).href,
                    showFlag: false,
                    alarmPageCode: ['BJ-SBSS-001', 'BJ-SBSS-002', 'BJ-SBSS-003', 'BJ-SBSS-004', 'BJ-SBSS-005', 'BJ-SBSS-009', 'BJ-SBSS-010', 'BJ-SBSS-011', 'BJ-SBSS-012', 'BJ-SBSS-013'],
                    warningShowFlag: false,
                },
                {
                    style: 'position:absolute;left: 39%;top: 36%;width:20%;height:40%;',
                    boxText: '分注分采调控策略',
                    boxBottomText: [{
                        name: '注采调控最优化方案',
                        warningShowFlag: false,
                        alarmPageCode: 'OISAAE', alarmTime: "",
                        url: `https://ipm.${this.baseUrl}/#/waterflood/merge?page=Linkage`
                    }, {
                        name: '配注微调策略', alarmTime: "",
                        url: `https://rem.${this.baseUrl}/#/injection/optimization?link=rem&page=Linkage`
                    }],
                    boxBottomContent: [['智能分注调控策略优化模型', '智能分注调控策略优化模型'], ['配注方案分析评估模型']],
                    boxStyle: {
                        pWidth: 'width:11vw'
                    },
                    imgUrl: new URL('./topBox/26.png', import.meta.url).href,
                    showFlag: false,
                    typeIdList: [],
                    alarmPageCode: [],
                    warningShowFlag: false,
                },
                {
                    style: 'position:absolute;left: 55%;top: 2%;width:20%;height:40%;',
                    boxText: '海管能力',
                    boxBottomText: [
                        {
                            name: '混输海管设计输量',
                            warningShowFlag: false, alarmTime: "",
                            // https://prm.tjioms-dev.tjltd.cnooc/#/manage/optimize
                            url: `https://prm.${this.baseUrl}/#/manage/optimize?page=Linkage`
                        },
                        {
                            name: '注水海管设计输量', alarmTime: "",
                            url: `https://prm.${this.baseUrl}/#/manage/optimize?page=Linkage`
                        }
                    ],
                    boxBottomContent: [
                        [{
                            name: '管输动态模型',
                            warningShowFlag: false, alarmTime: "",
                            url: `https://prm-pom.${this.baseUrl}/#/home/pipe?page=Linkage`
                        }],
                        [{
                            name: '管输动态模型',
                            warningShowFlag: false, alarmTime: "",
                            url: `https://prm-pom.${this.baseUrl}/#/home/pipe?page=Linkage`
                        }]
                    ],
                    boxStyle: {
                        pWidth: 'width:7vw'
                    },
                    imgUrl: new URL('./topBox/10.png', import.meta.url).href,
                    showFlag: false,
                    warningurl:`https://prm.${this.baseUrl}/#/manage/gathering?page=Linkage`,
                    alarmPageCode: ['BJ-SC-002'],
                    warningShowFlag: false,
                },
                {
                    style: 'position:absolute;left: 72%;top: 0%;width:20%;height:40%;',
                    boxText: '处理能力',
                    boxBottomText: [
                        {
                            name: '混输液处理能力',
                            warningShowFlag: false, alarmTime: "",
                            url: `https://prm.${this.baseUrl}/#/manage/optimize?page=Linkage`
                        },
                        {
                            name: '生产水处理能力',
                            warningShowFlag: false, alarmTime: "",
                            url: `https://prm.${this.baseUrl}/#/manage/optimize?page=Linkage`
                        }
                    ],
                    boxBottomContent: [
                        [{
                            name: '地面平衡调配-流程监控模型', alarmTime: "",
                            url: `https://prm-pom.${this.baseUrl}/#/home/plat?page=Linkage`
                        }],
                        [{
                            name: '地面平衡调配-流程监控模型', alarmTime: "",
                            url: `https://prm-pom.${this.baseUrl}/#/home/plat?page=Linkage`
                        }]
                    ],
                    boxStyle: {
                        pWidth: 'width:7vw',
                    },
                    imgUrl: new URL('./topBox/28.png', import.meta.url).href,
                    showFlag: false,
                    warningurl:`https://prm.${this.baseUrl}/#/manage/injection?page=Linkage`,
                    alarmPageCode: ['BJ-SC-003'],
                    warningShowFlag: false,
                },
            ]
        },
        filterchild(array1, array2) {
            return array1.filter(item => item.boxBottomText.some(val => array2.has(val.alarmPageCode)));
        },
        async matchAndOutput(array1, array2) {
            const set = new Set(array1.map(item => item.alarmPageCode));
            const result = array2.filter(item => item.alarmPageCode.some(code => set.has(code)));
            const filteredChild = this.filterchild(this.currentLists, set);
            return {result, filteredChild};
        },
        async matchAndOutputchild(array1, array2) {
            const set = new Set(array1.map(item => item.alarmPageCode));
            const result = array2.filter(item => set.has(item.alarmPageCode));
            const filteredChild = this.filterchild(this.currentLists, set);
            return {result, filteredChild};
        },

        findIndex(array, obj) {
            return array.findIndex(item => item === obj);
        },
// 获取报警信息接口
        async getWarningInfo() {
            this.currentLists.map((i, index) => {
                i.warningShowFlag = false;
                i.alarmTime = '';
                if (i.boxBottomText) {
                    i?.boxBottomText.map((j) => {
                        j.warningShowFlag = false;
                        j.alarmTime = '';
                    });
                }
            });

            const data = {
                authorizedPersonnel: this.$store.getters['user/name'],
                alarmTime: new Date().format('YYYY-MM-dd'),
                alarmPageCode:['MIPFSW','LOWGPC','BTOBAR','TTOBAR','QOIWTT','OSTOPF','BJ-SBSS-001', 'BJ-SBSS-002', 'BJ-SBSS-003', 
                    'BJ-SBSS-004', 'BJ-SBSS-005', 'BJ-SBSS-009', 'BJ-SBSS-010', 'BJ-SBSS-011', 'BJ-SBSS-012', 'BJ-SBSS-013'
                ,'OISAAE','BJ-SC-002','BJ-SC-003'],
            };

            try {
                const [res1] = await Promise.all([
                    queryLinkageAlarmInfo(data),
                ]);
                let isConditionMet = false;
                if(res1.data.data.length < 1){
                    return
                }else{
                    // 获取含有标识的对象
                    const {result, filteredChild} = await this.matchAndOutput(res1.data.data, this.currentLists);
                    // 获取在数组的下标
                    const index = result.map((item) => this.findIndex(this.currentLists, item));
                    const childindex = filteredChild.map((item) => this.findIndex(this.currentLists, item));
                    // 匹配数组中的标识设置为true
                    for (let i = 0; i < childindex.length; i++) {
                        let a = this.currentLists[childindex[i]].boxBottomText;
                        const {result: childResult} = await this.matchAndOutputchild(res1.data.data, a);
                        const number = childResult.map((item) => this.findIndex(a, item));
                        if (number.length > 1) {
                            number.map((n, index) => {
                                this.currentLists[childindex[i]].boxBottomText[n].warningShowFlag = true;
                                res1.data.data.map((j) => {
                                    if (this.currentLists[childindex[i]].boxBottomText[n].alarmPageCode.includes(j.alarmPageCode)) {
                                        this.currentLists[childindex[i]].boxBottomText[n].alarmTime = j.alarmTime;
                                    }
                                });
                            });
                        } else {
                            this.currentLists[childindex[i]].boxBottomText[number[0]].warningShowFlag = true;
                            res1.data.data.map((j) => {
                                if (this.currentLists[childindex[i]].boxBottomText[number[0]].alarmPageCode.includes(j.alarmPageCode)) {
                                    this.currentLists[childindex[i]].boxBottomText[number[0]].alarmTime = j.alarmTime;
                                }
                            });
                        }
                        this.currentLists[childindex[i]].warningShowFlag = true;
                        isConditionMet = true;
                    }
                    for (let i = 0; i < index.length; i++) {
                        this.currentLists[index[i]].warningShowFlag = true;
                        isConditionMet = true;
                    }  
                }
                // 如果无报警开启定时器，有报警关闭定时器和箭头图片
                if (isConditionMet === false) {
                    this.timmer = setInterval(() => {
                        this.arrowFun();
                    }, 100 * 50);
                } else {
                    clearInterval(this.timmer);
                    this.currentLists.forEach((item) => {
                        item.showFlag = false;
                    });
                    for (let i = 0; i < 7; i++) {
                        this.$el.querySelectorAll('img')[i].style.display = 'none';
                    }
                }
            } catch (error) {
                // 错误处理
                console.error(error)
                this.$message.error('系统错误请重新尝试或联系运维人员！');
            }
        },
        arrowFun() {
            if (this.loopNum != -1 && this.loopNum < 5) this.currentLists[this.loopImgNum[this.loopNum]].showFlag = true
            if (this.loopNum != -1 && this.loopNum < 5) this.currentLists[this.loopImgNumClose[this.loopNum]].showFlag = false
            this.loopNum++
            for (let i = 0; i < 7; i++) {
                this.$el.querySelectorAll('img')[i].style.display = 'none'
            }
            this.$el.querySelectorAll('img')[this.loopNum].style.display = 'block'
            if (this.loopNum == 6) {
                this.loopNum = -1
            }
        },
        stopTimer() {
            this.currentLists.forEach(item => {
                item.showFlag = false
            })
            clearInterval(this.timmer)
        },
        startTimer(url) {
            const hasTrueValue = this.currentLists.some(item => {
                if (Array.isArray(item.boxBottomText)) {
                    return item.boxBottomText.some(subItem => subItem.warningShowFlag === true);
                } else {
                    return item.warningShowFlag === true;
                }
            });
            if (url) {
                let index = this.findIndex(this.currentLists, url)
                this.currentLists[index].warningShowFlag = false
            }
            if (hasTrueValue == true) {
                clearInterval(this.timmer)
            } else {
                clearInterval(this.timmer)
                this.timmer = setInterval(() => {
                    this.arrowFun()
                }, 5000)
            }
        }
    },
    data() {
        return {
            timmer: '',//定时器
            timmerWarning: '',//获取报警信息轮询
            baseUrl: '',//判断环境
            loopNum: 0,//循环显示图片的loop
            loopImgNum: [6, 4, 1, 10, 7],//默认显示图片的顺序
            loopImgNumClose: [7, 6, 4, 1, 10],//关闭图片显示的顺序
            showFlag: true,//是否显示
            currentLists: []
        }
    },
    beforeDestroy() {
        clearInterval(this.timmer)
        clearInterval(this.timmerWarning)
    }
}
</script>

<style lang="less" scoped>
video {
    position: fixed;
    width: 100%;
    z-index: 0;
}

.container {
    height: calc(100% - 20px);
    background: url('./注采联动20231011-big.gif');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .topBanner {
        width: 100%;
        height: 38px;
        background: url('@/assets/linkage/topBanner.svg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        line-height: 32px;
        text-align: center;
        font-size: 25px;
        color: #00b4ff;
        z-index: 7;
        font-weight: bolder;
    }
    .studySelf {
        width: 7vw;
        height: 7vw;
        position: absolute;
        bottom: 40%;
        left: 5%;
        background-image: url("@/assets/linkage/02title-1.png");
        background-size: 100% 100%;

        .studySelfInside {
            width: 100%;
            height: 100%;
            color: #34d4e0;
            background-image: url("@/assets/linkage/02title-2.png");
            background-size: 100% 100%;
            //背景图旋转
            @-webkit-keyframes rotation {
                from {
                    -webkit-transform: rotate(0deg);
                }
                to {
                    -webkit-transform: rotate(360deg);
                }
            }
            -webkit-animation: rotation 10s linear infinite;
        }

        span {
            position: absolute;
            top: 40%;
            left: 30%;
            margin: auto;
            color: #34d4e0;
        }
    }

    img {
        display: none;
    }

    .leftDownArrow {
        transform: rotate(315deg);
        animation: leftDownArrow 2s linear infinite;
        position: absolute;
        left: 18%;
        top: 38%
    }

    @keyframes leftDownArrow {
        0% {
            left: 20%;
            top: 36%;
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .downArrow {
        transform: rotate(270deg);
        animation: downArrow 2s linear infinite;
        position: absolute;
        left: 7%;
        top: 70%
    }

    @keyframes downArrow {
        0% {
            top: 68%;
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .rightArrow {
        transform: rotate(180deg);
        animation: rightArrow 2s linear infinite;
        position: absolute;
        left: 45%;
        bottom: 2%;
    }

    @keyframes rightArrow {
        0% {
            left: 43%;
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .upArrow {
        transform: rotate(90deg);
        animation: upArrow 2s linear infinite;
        position: absolute;
        left: 85%;
        bottom: 20%;
    }

    @keyframes upArrow {
        0% {
            bottom: 18%;
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .leftUpArrow {
        transform: rotate(45deg);
        animation: leftUpArrow 2s linear infinite;
        position: absolute;
        left: 85%;
        top: 30%;
    }

    @keyframes leftUpArrow {
        0% {
            left: 87%;
            top: 32%;
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .leftArrow {
        animation: leftArrow 2s linear infinite;
        position: absolute;
        left: 40%;
        top: 30%;
    }

    @keyframes leftArrow {
        0% {
            left: 42%;
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

}
</style>


