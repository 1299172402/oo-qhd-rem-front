<template>
    <div class="container" style="position: relative">
        <div class="topBanner">油藏动态分析</div>
        <linkageBoxBot @stopTimer="stopTimer" refs="boxBots" :style="item.style" :currentList="item" :key="index"
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
import linkageBoxTop from "@/pages/rem/home/remHome/linkageBox/boxTop.vue";
import linkageBoxBot from "@/pages/rem/home/remHome/linkageBox/boxBot.vue";

export default {
    components: {
        linkageBoxTop,
        linkageBoxBot
    },
    mounted() {
        if(window.location.origin.includes('test')){
            this.baseUrl = 'tjioms-test.tjltd.cnooc'
        }else if (window.location.origin.includes('dev') || window.location.origin.includes('808')){
            this.baseUrl = 'tjioms-dev.tjltd.cnooc'
        }
        this.getinfo()
        this.arrowFun()
    },
    methods: {
        getinfo(){
          this.currentLists = [
                {
                    style: 'position:absolute;left: 10%;top: 8%;width:20%;height:40%;',
                    boxText: '异常井监测',
                    boxBottomText: [{
                        name: '含水率变化监测',
                        url: `https://rem.${this.baseUrl}/#/dynamicManagement/dynamicTrackingOilAuxiliary/oilAnalysisReport?page=/dynamicManagement/remHome`
                    },
                        {
                            name: '递减率变化监测',
                            url: `https://rem.${this.baseUrl}/#/dynamicManagement/dynamicTrackingOilAuxiliary/oilAnalysisReport?page=/dynamicManagement/remHome`
                        },
                        {
                            name: '产液量异常监测',
                            url: `https://rem.${this.baseUrl}/#/dynamicManagement/dynamicTrackingOilAuxiliary/oilAnalysisReport?page=/dynamicManagement/remHome`
                        },
                        {
                            name: '井底流压监测',
                            url: `https://rem.${this.baseUrl}/#/dynamicManagement/dynamicTrackingBlock/blockAnalysisReport?page=dynamicManagement/remHome`
                        }],
                    boxStyle: {
                        pWidth: 'width:11vw;margin-left: 4.5vw;',
                    },
                    imgUrl: new URL('./remHome/01.png', import.meta.url).href,
                    down: true,
                    showFlag:false
                },
                {
                    style: 'position:absolute;left: 40%;top: 8%;width:20%;height:40%;',
                    boxText: '单井/井组/区块分析',
                    boxBottomText: [{name: '水质分析',url: `https://ipm.${this.baseUrl}/#/waterflood/waterInjectionProduction?page=/dynamicManagement/remHome` },
                        {
                            name: '注采比分析',
                            url: `https://rem.${this.baseUrl}/#/dynamicManagement/dynamicTrackingWellGroup/wellGroupAnalysisReport?page=/dynamicManagement/remHome`
                        },
                        {name: '来水方向分析',url: `https://rem.${this.baseUrl}/#/dynamicManagement/dynamicTrackingBlock/blockAnalysisReport?page=/dynamicManagement/remHome`},
                        {
                            name: '储量动用情况',
                            url: `https://rem.${this.baseUrl}/#/developStatus/developmentEffectEvaluation?link=reserves?page=/dynamicManagement/remHome`
                        }],
                    boxBottomContent: [[], [{name:'开发效果评价',url: `https://rem.${this.baseUrl}/#/dynamicManagement/dynamicTrackingWellGroup/wellGroupAnalysisReport?page=/dynamicManagement/remHome`}], [], []],
                    boxStyle: {
                        pWidth: 'width:11vw;margin-left: 4.5vw;',
                    },
                    imgUrl: new URL('./remHome/02.png', import.meta.url).href,
                    down: true,
                    showFlag:false
                },

                {
                    style: 'position:absolute;left: 70%;top: 8%;width:20%;height:40%;',
                    boxText: '剩余油分布状况分析',
                    boxBottomText: [{
                        name: '剩余油甜点分析',
                        url: `https://rem.${this.baseUrl}/#/intelligence1/optimization?link=rem`
                    }],
                    boxStyle: {
                        pWidth: 'width:11vw;margin-left: 4.5vw;'
                    },
                    imgUrl: new URL('./remHome/03.png', import.meta.url).href,
                    down: true,
                    showFlag:false
                },

                {
                    style: 'position:absolute;left: 70%;top: 55%;width:20%;height:40%;',
                    boxText: '开发指标评价',
                    boxBottomText: [{
                        name: '开发指标分析',
                        url: `https://rem.${this.baseUrl}/#/devmentIndicators/waterInjectionIndexManagement?page=/dynamicManagement/remHome`
                    }, {
                        name: '管理指标分析',
                        url: `https://rem.${this.baseUrl}/#/devmentIndicators/technicalIndexManagement?page=/dynamicManagement/remHome`
                    }],
                    boxBottomContent: [['开发技术指标管理', '开发效果评价'], ['注水指标管理', '措施效果评价']],
                    boxStyle: {
                        pWidth: 'width:8.5vw;margin-left: 6vw;'
                    },
                    imgUrl: new URL('./remHome/06.png', import.meta.url).href,
                    down: true,
                    showFlag:false
                },
                {
                    style: 'position:absolute;left: 40%;top: 55%;width:20%;height:40%;',
                    boxText: '产量预测',
                    boxBottomText: [{
                        name: '递减率分析',
                        url: `https://rem.${this.baseUrl}/#/developStatus/developmentEffectEvaluation?link=decreasing`
                    }, {
                        name: '产量变化趋势分析',
                        url: `https://rem.${this.baseUrl}/#/developStatus/developmentTrendAnalysis?page=/dynamicManagement/remHome`
                    }, {
                        name: '采收率分析',
                        url: `https://rem.${this.baseUrl}/#/recoveryEfficiency/index?page=/dynamicManagement/remHome`
                    }],
                    boxBottomContent: [['递减预测', '开发趋势分析'], ['数据驱动的油藏开发规律动态预测', '产量构成曲线'], ['采收率预测']],
                    boxStyle: {
                        pWidth: 'width:8.5vw;margin-left: 6vw;'
                    },
                    imgUrl: new URL('./remHome/05.png', import.meta.url).href,
                    down: true,
                    showFlag:false
                },
                {
                    style: 'position:absolute;left: 10%;top: 55%;width:20%;height:40%;',
                    boxText: '措施建议',
                    boxBottomText: [{name: '智能分注井C1并执行存在风险!'}],
                    boxStyle: {
                        pWidth: 'width:8.5vw;margin-left: 6vw;'
                    },
                    imgUrl: new URL('./remHome/04.png', import.meta.url).href,//暂无图片
                    down: true,
                    showFlag:false
                },
            ]
        },
        arrowFun() {
            this.timer = setInterval(() => {
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
            }, 2000)
        },
        stopTimer(flag){
            if(flag){
                this.currentLists.forEach(item=>{item.showFlag = false})
                clearInterval(this.timer)
            }else{
                this.arrowFun()
            }
        }
    },
    beforeDestroy() {
        clearInterval(this.timer)
    },
    data() {
        return {
            timer:'',
            loopNum: 0,
            baseUrl:'',
            show: true,
            currentLists: []
        }
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
        z-index: 7;
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
        animation: rightUpArrow 1s linear infinite;
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
        animation: lUpArrow 1s linear infinite;
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
        animation: rightArrow 1s linear infinite;
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
        animation: rightArrow2 1s linear infinite;
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
        animation: downArrow 1s linear infinite;
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
        animation: leftArrow 1s linear infinite;
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
        animation: leftArrow2 1s linear infinite;
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


