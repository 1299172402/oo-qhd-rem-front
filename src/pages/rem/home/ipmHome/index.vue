<template>
    <div class="container" style="position: relative">
        <div class="topBanner">智能注采调配</div>
        <linkageBoxBot @stopTimer="stopTimer" :style="item.style" :showFlag="item.showFlag" :remHome="true" :currentList="item" :key="index"
                       v-for="(item,index) in currentLists"></linkageBoxBot>
        <div class="studySelf">
            <div class="studySelfInside"></div>
            <span>模型自学习</span>
        </div>
        <img class="rightUpArrow" style="display: block" src="@/assets/linkage/arrow-left.png" alt="">
        <img class="rightArrow" src="@/assets/linkage/arrow-left.png" alt="">
        <img class="rightArrow2" src="@/assets/linkage/arrow-left.png" alt="">
        <img class="downArrow" src="@/assets/linkage/arrow-left.png" alt="">
        <img class="leftArrow2" src="@/assets/linkage/arrow-left.png" alt="">
        <img class="leftArrow" src="@/assets/linkage/arrow-left.png" alt="">
        <img class="lUpArrow" src="@/assets/linkage/arrow-left.png" alt="">
    </div>
</template>

<script>
import linkageBoxBot from "@/pages/rem/home/remHome/linkageBox/boxBot.vue";
import {queryLinkageAlarmInfo} from "@/api/rem/injectionproductionlinkage";

export default {
    name:'ipmHome',
    components: {
        linkageBoxBot
    },
    mounted() {
        if (window.location.origin.includes('test')) {
            this.baseUrl = 'tjioms-test.tjltd.cnooc'
        } else if (window.location.origin.includes('dev') || window.location.origin.includes('808')) {
            this.baseUrl = 'tjioms-dev.tjltd.cnooc'
        }else if (window.location.origin.includes('tpro')) {
            this.baseUrl = 'tjioms-tpro.tjltd.cnooc'
        }
        this.getinfo()
        this.arrowFun()
        this.getWarningInfo()
        this.timmerWarning = setInterval(() => {
            this.getWarningInfo()
        }, 1000 * 30)
        //转动弹出图片循环
        this.timmer = setInterval(() => {
            this.arrowFun()
        }, 100 * 20)
    },
    data() {
        return {
            timer:'',
            loopNum: 0,
            show: true,
            currentLists: []
        }
    },
    methods: {
        getinfo(){
           this.currentLists = [
                {
                    style: 'position:absolute;left: 10%;top: 8%;width:20%;height:40%;',
                    boxText: '产量劈分',
                    // boxBottomText: ['单井分层液量', '区块分层液量', '劈分剖面','劈分系数'],
                    boxBottomText: [{
                        name: '单井分层液量',
                        url: `https://rem.${this.baseUrl}/#/injection/productionSplit?page=IpmHome`
                    },
                        {
                            name: '区块分层液量',
                            url: `https://rem.${this.baseUrl}/#/injection/productionSplit?page=IpmHome`
                        },
                        {
                            name: '劈分剖面',
                            url: `https://rem.${this.baseUrl}/#/injection/splitSection?page=IpmHome`,
                            alarmPageCode: 'SPLSEC',
                        },
                        {
                            name: '劈分系数',
                            alarmPageCode: 'SPLFAC',
                            url: `https://rem.${this.baseUrl}/#/injection/DividingCoefficient?link=IpmHome`
                        }],
                    boxStyle: {
                        pWidth: 'width:11vw;margin-left: 4.5vw;',
                    },
                    imgUrl: new URL('./ipmHome/01.png', import.meta.url).href,
                    down: false,
                    warningShowFlag: false,
                    showFlag: false,
                    mcShow: false
                },
                {
                    style: 'position:absolute;left: 40%;top: 8%;width:20%;height:40%;',
                    boxText: '井间连通性评价',
                    // boxBottomText: ['注采井组维护', '井间连通系数', '平面液量分流'],
                    boxBottomText: [{
                        name: '注采井组维护',
                        url: `https://rem.${this.baseUrl}/#/basic/wellGroup_Maintenance?page=IpmHome`,
                        alarmPageCode: 'IAPGMA',
                    },
                        {
                            name: '井间连通系数',
                            url: `https://rem.${this.baseUrl}/#/injection/connectivityData?page=IpmHome`,
                            alarmPageCode: 'WECOCO',
                        },
                        {
                            name: '平面液量分流',
                            alarmPageCode: 'FLVOSH',
                            url: `https://rem.${this.baseUrl}/#/injection/connectivityData?page=IpmHome`
                        },],
                    boxStyle: {
                        pWidth: 'width:11vw;margin-left: 4.5vw;',
                    },
                    imgUrl: new URL('./ipmHome/02.gif', import.meta.url).href,
                    down: false,
                    warningShowFlag: false,
                    showFlag: false,
                    mcShow: false
                },

                {
                    style: 'position:absolute;left: 70%;top: 8%;width:20%;height:40%;',
                    boxText: '剩余油分布状况分析',
                    // boxBottomText: ['分层剩余油分布', '平面剩余油分布'],
                    boxBottomText: [{
                        name: '分层剩余油分布',
                        url: `https://rem.${this.baseUrl}/#/injection/optimization?page=IpmHome`
                    },
                        {
                            name: '平面剩余油分布',
                            url: `https://rem.${this.baseUrl}/#/injection/optimization?link=rem&page=IpmHome`
                        }],
                    boxStyle: {
                        pWidth: 'width:11vw;margin-left: 4.5vw;'
                    },
                    imgUrl: new URL('./ipmHome/03.png', import.meta.url).href,
                    down: false,
                    showFlag: false,
                    mcShow: false,
                    warningShowFlag: false,
                },
                {
                    style: 'position:absolute;left: 70%;top: 55%;width:20%;height:40%;',
                    boxText: '注采状况分析',
                    boxBottomText: [{name: '流场调整'}],
                    boxStyle: {
                        pWidth: 'width:8.5vw;margin-left: 6vw;'
                    },
                    imgUrl: new URL('./ipmHome/06.png', import.meta.url).href,
                    down: true,
                    showFlag: false,
                    warningShowFlag: false,
                },
                {
                    style: 'position:absolute;left: 40%;top: 55%;width:20%;height:40%;',
                    boxText: '区块注采方案',
                    boxBottomText: [{
                        name: '定产配注方案',
                        url: `https://rem.${this.baseUrl}/#/injection/optimization?page=IpmHome`
                    }, {name: '注采优化方案', url: `https://rem.${this.baseUrl}/#/injection/optimizationDetail?page=IpmHome`}],
                    boxStyle: {
                        pWidth: 'width:8.5vw;margin-left: 6vw;'
                    },
                    imgUrl: new URL('./ipmHome/05.png', import.meta.url).href,
                    down: true,
                    warningShowFlag: false,
                    showFlag: false
                },
                {
                    style: 'position:absolute;left: 10%;top: 55%;width:20%;height:40%;',
                    boxText: '注采结构优化',
                    boxBottomText: [{
                        name: '注采强度判定',
                        alarmPageCode: 'DOINST',
                        url: `https://rem.${this.baseUrl}/#/dynamicManagement/dynamicTrackingBlock/blockAnalysisReport?page=IpmHome`
                    }, {
                        name: '井组注采比分析',
                        url: `https://rem.${this.baseUrl}/#/dynamicManagement/dynamicTrackingWellGroup/wellGroupAnalysisReport?page=IpmHome`
                    }],
                    boxStyle: {
                        pWidth: 'width:8.5vw;margin-left: 6vw;'
                    },
                    imgUrl: new URL('./ipmHome/04.png', import.meta.url).href,//暂无图片
                    down: true,
                    warningShowFlag: false,
                    showFlag: false
                },
            ]  
        },
        arrowFun() {
                if(this.loopNum == -1) this.currentLists[5].showFlag = false
                if(this.loopNum<7 && this.loopNum >0) this.currentLists[this.loopNum -1].showFlag = false
                if(this.loopNum<6 && this.loopNum !=-1) this.currentLists[this.loopNum].showFlag = true
                this.loopNum++
                for (let i = 0; i < 7; i++) {
                    this.$el.querySelectorAll('img')[i].style.display = 'none'
                }
                this.$el.querySelectorAll('img')[this.loopNum].style.display = 'block'
                if (this.loopNum == 6) {
                    this.loopNum = -1
                }
        },
        filterchild(array1, array2) {
            return array1.filter(item => item.boxBottomText.some(val => array2.has(val.alarmPageCode)));
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
                alarmPageCode: ['SPLSEC',
                    'SPLFAC',
                    'IAPGMA',
                    'WECOCO',
                    'FLVOSH',
                    'DOINST'],
            };
            try {
                const [res1] = await Promise.all([
                    queryLinkageAlarmInfo(data),
                ]);
                let isConditionMet = false;
                if (res1.data.data.length < 1) {
                    return
                } else {
                    // 获取含有标识的对象
                    const {result, filteredChild} = await this.matchAndOutputchild(res1.data.data, this.currentLists);
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
                    }, 100 * 20);
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
        stopTimer() {
            this.currentLists.forEach(item => {
                item.showFlag = false
            })
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
            console.log(hasTrueValue)
            if (hasTrueValue == true) {
                clearInterval(this.timmer)
            } else {
                clearInterval(this.timmer)
                this.timmer = setInterval(() => {
                    this.arrowFun()
                }, 2000)
            }
        }
    },
    beforeDestroy() {
        clearInterval(this.timer)
    }
}
</script>

<style lang="less" scoped>
.container {
    height: calc(100% - 20px);
    background-image: url("@/assets/linkage/youcang-bg.jpg");
    background-size: 100% 100%;

    .topBanner {
        width: 100%;
        height: 60px;
        background: url('@/assets/topBanner.svg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        line-height: 50px;
        text-align: center;
        font-size: 25px;
        color: #00b4ff;
        z-index: 999;
        font-weight: bolder;
    }

    .studySelf {
        width: 7vw;
        height: 7vw;
        position: absolute;
        bottom: 40%;
        left: 2%;
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
            font-size: 1%;
            position: absolute;
            top: 43%;
            left: 30%;
            margin: auto;
            color: #34d4e0;
        }
    }

    img {
        display: none;
    }

    .rightUpArrow {
        transform: rotate(135deg);
        animation: rightUpArrow 2s linear infinite;
        position: absolute;
        left: 11%;
        top: 38%
    }

    @keyframes rightUpArrow {
        0% {
            left: 9%;
            top: 40%;
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .lUpArrow {
        transform: rotate(45deg);
        animation: lUpArrow 2s linear infinite;
        position: absolute;
        left: 9%;
        top: 58%
    }

    @keyframes lUpArrow {
        0% {
            left: 11%;
            top: 60%;
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
        left: 35%;
        top: 30%;
    }

    @keyframes rightArrow {
        0% {
            left: 33%;
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .rightArrow2 {
        transform: rotate(180deg);
        animation: rightArrow2 2s linear infinite;
        position: absolute;
        left: 65%;
        top: 30%;
    }

    @keyframes rightArrow2 {
        0% {
            left: 63%;
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
        left: 80%;
        bottom: 43%;
    }

    @keyframes downArrow {
        0% {
            bottom: 45%;
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .leftArrow {
        animation: leftArrow 2s linear infinite;
        position: absolute;
        left: 35%;
        top: 80%;
    }

    @keyframes leftArrow {
        0% {
            left: 37%;
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .leftArrow2 {
        animation: leftArrow2 2s linear infinite;
        position: absolute;
        left: 65%;
        top: 80%;
    }

    @keyframes leftArrow2 {
        0% {
            left: 67%;
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

}
</style>


