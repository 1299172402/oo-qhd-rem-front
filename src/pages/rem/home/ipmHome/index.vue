<template>
    <div class="container" style="position: relative">
        <div class="topBanner">智能注采调配</div>
        <linkageBoxBot :style="item.style" :showFlag="item.showFlag" :remHome="true" :currentList="item" :key="index"
                       v-for="(item,index) in currentLists[0]"></linkageBoxBot>
        <linkageBoxTop :style="item.style" :showFlag="item.showFlag" :mcShow="item.mcShow" :remHome="true"
                       :currentList="item" :key="index" v-for="(item,index) in currentLists[1]"></linkageBoxTop>
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
        this.arrowFun()
    },
    methods: {
        arrowFun() {
            setInterval(() => {
                // console.log(this.currentLists[this.loopNum]);
                console.log(this.loopNum);
                if (this.loopNum != -1 && this.loopNum < 3) {
                    this.currentLists[1][this.loopNum].showFlag = true
                }
                if (this.loopNum > 0 && this.loopNum < 4) {
                    this.currentLists[1][this.loopNum - 1].showFlag = false
                }
                if (this.loopNum == 2) this.currentLists[1][this.loopNum].mcShow = true


                if (this.loopNum == 3) {
                    this.currentLists[0][2].showFlag = true
                }
                if (this.loopNum == 4) {
                    this.currentLists[0][2].showFlag = false
                    this.currentLists[0][1].showFlag = true
                }
                if (this.loopNum == 5) {
                    this.currentLists[0][1].showFlag = false
                    this.currentLists[0][0].showFlag = true
                }
                if (this.loopNum == -1) {
                    this.currentLists[0][0].showFlag = false
                }
                // if(this.loopNum != 2 && this.loopNum > 3 ) this.currentLists[0][this.loopNum-4].showFlag = false

                // if(this.loopNum > 2 && this.loopNum <6 ) { this.currentLists[0][this.loopNum-3].showFlag = true }
                // if(this.loopNum > 2 && this.loopNum <7 ) { this.currentLists[0][this.loopNum-4].showFlag = false }
                this.loopNum++
                for (let i = 0; i < 7; i++) {
                    this.$el.querySelectorAll('img')[i].style.display = 'none'
                }
                this.$el.querySelectorAll('img')[this.loopNum].style.display = 'block'
                if (this.loopNum == 6) {
                    this.loopNum = -1
                }
            }, 2000)
        }
    },
    data() {
        return {
            loopNum: 0,
            show: true,
            currentLists: [
                [
                    {
                        style: 'position:absolute;left: 10%;top: 55%;width:20%;height:40%;',
                        boxText: '注采结构优化',
                        boxBottomText: [{
                            name: '注采强度判定',
                            url: 'https://rem.tjioms-dev.tjltd.cnooc/#/dynamicManagement/dynamicTrackingBlock/analysisReport'
                        }, {
                            name: '井组注采比分析',
                            url: 'https://rem.tjioms-dev.tjltd.cnooc/#/dynamicManagement/dynamicTrackingWellGroup/analysisReport'
                        }],
                        boxStyle: {
                            pWidth: 'width:8.5vw'
                        },
                        imgUrl: new URL('./ipmHome/04.png', import.meta.url).href,//暂无图片
                        down: true,
                        showFlag: false
                    },
                    {
                        style: 'position:absolute;left: 40%;top: 55%;width:20%;height:40%;',
                        boxText: '区块注采方案',
                        boxBottomText: [{
                            name: '定产配注方案',
                            url: 'https://rem.tjioms-dev.tjltd.cnooc/#/intelligence/optimization'
                        }, {name: '注采优化方案', url: 'https://rem.tjioms-dev.tjltd.cnooc/#/waterflood/marge'}],
                        boxStyle: {
                            pWidth: 'width:8.5vw'
                        },
                        imgUrl: new URL('./ipmHome/05.png', import.meta.url).href,
                        down: true,
                        showFlag: false
                    },
                    {
                        style: 'position:absolute;left: 70%;top: 55%;width:20%;height:40%;',
                        boxText: '注采状况分析',
                        boxBottomText: [{name: '流场调整'}],
                        boxStyle: {
                            pWidth: 'width:8.5vw'
                        },
                        imgUrl: new URL('./ipmHome/06.png', import.meta.url).href,
                        down: true,
                        showFlag: false
                    },
                ],
                [
                    {
                        style: 'position:absolute;left: 10%;top: 8%;width:20%;height:40%;',
                        boxText: '产量劈分',
                        // boxBottomText: ['单井分层液量', '区块分层液量', '劈分剖面','劈分系数'],
                        boxBottomText: [{
                            name: '单井分层液量',
                            url: 'https://rem.tjioms-dev.tjltd.cnooc/#/intelligence/productionSplit'
                        },
                            {
                                name: '区块分层液量',
                                url: 'https://rem.tjioms-dev.tjltd.cnooc/#/intelligence/productionSplit'
                            },
                            {
                                name: '劈分剖面',
                                url: 'https://rem.tjioms-dev.tjltd.cnooc/#/intelligence/splitSection'
                            },
                            {
                                name: '劈分系数',
                                url: 'https://rem.tjioms-dev.tjltd.cnooc/#/intelligence/productionSplit'
                            }],
                        boxStyle: {
                            pWidth: 'width:11vw',
                        },
                        imgUrl: new URL('./ipmHome/01.png', import.meta.url).href,
                        down: false,
                        showFlag: false,
                        mcShow: false
                    },
                    {
                        style: 'position:absolute;left: 40%;top: 8%;width:20%;height:40%;',
                        boxText: '井间连通性评价',
                        // boxBottomText: ['注采井组维护', '井间连通系数', '平面液量分流'],
                        boxBottomText: [{
                            name: '注采井组维护',
                            url: 'https://rem.tjioms-dev.tjltd.cnooc/#/basic/wellGroup_Maintenance'
                        },
                            {
                                name: '井间连通系数',
                                url: 'https://rem.tjioms-dev.tjltd.cnooc/#/intelligence/connectivityData'
                            },
                            {
                                name: '平面液量分流',
                                url: ''
                            },],
                        boxStyle: {
                            pWidth: 'width:11vw',
                        },
                        imgUrl: new URL('./ipmHome/02.gif', import.meta.url).href,
                        down: false,
                        showFlag: false,
                        mcShow: false
                    },

                    {
                        style: 'position:absolute;left: 70%;top: 8%;width:20%;height:40%;',
                        boxText: '剩余油分布状况分析',
                        // boxBottomText: ['分层剩余油分布', '平面剩余油分布'],
                        boxBottomText: [{
                            name: '分层剩余油分布',
                            url: 'https://rem.tjioms-dev.tjltd.cnooc/#/intelligence/optimization'
                        },
                            {
                                name: '平面剩余油分布',
                                url: ''
                            }],
                        boxStyle: {
                            pWidth: 'width:11vw'
                        },
                        imgUrl: new URL('./ipmHome/03.png', import.meta.url).href,
                        down: false,
                        showFlag: false,
                        mcShow: false
                    },
                ]
            ]
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


