<template>
    <div class="container" style="position: relative">
        <div class="topBanner">注采联动</div>
        <linkageBox :style="item.style" :showFlag="item.showFlag" :currentList="item" :key="index" v-for="(item,index) in currentLists"></linkageBox>
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
import {InjectionProdInfo} from "@/api/rem/injectionproductionlinkage";
const env = import.meta.env.MODE;
const baseUrl = env == "development"?'/src':''
let curDate = new Date()
let data1 = new Date(curDate.getTime() - 24*60*60*1000).format('YYYY-MM-DD')
let data2 = new Date(curDate.getTime() - 24*60*60*1000*2).format('YYYY-MM-DD')
export default {
    components:{
        linkageBox
    },
    mounted(){
        //转动弹出图片循环
        this.arrowFun()
        this.getWarningInfo()
        //预警信息轮询查询
        this.timmerWarning = setInterval(()=>{
            this.getWarningInfo()
        },1000 * 10)
    },
    methods: {
        getWarningInfo(){
            this.currentLists.forEach((i,index)=>{
                i.warningShowFlag = false
            })
            request({
                url: `/gem001b/queryAlcAlarm`,
                method: "get",
                headers: {
                    showLoading: false
                }
            }).then(res=>{
                res.data.data.forEach(item=>{
                    this.currentLists.forEach((i,index)=>{
                        if(i.typeIdList.indexOf(item.typeId) != -1){
                            this.currentLists[index].warningShowFlag = true
                            clearInterval(this.timmer)
                        }
                    })
                })
            })
        },
        arrowFun(){
            this.timmer = setInterval(()=>{
                if(this.loopNum!= -1 && this.loopNum < 5) this.currentLists[this.loopImgNum[this.loopNum ]].showFlag = true
                if(this.loopNum!= -1 && this.loopNum < 5) this.currentLists[this.loopImgNumClose[this.loopNum ]].showFlag = false
                this.loopNum ++                
                for(let i=0;i<7;i++){
                    this.$el.querySelectorAll('img')[i].style.display = 'none'
                }
                this.$el.querySelectorAll('img')[this.loopNum].style.display = 'block'
                if(this.loopNum == 6){
                   this.loopNum = -1
                }
            },2000)
        }
    },
    data(){
        return {
            timmer:'',
            timmerWarning:'',
            baseUrl : env == "development"?'/src':'',
            loopNum: 0,
            loopImgNum: [6,4,1,10,7],
            loopImgNumClose: [7,6,4,1,10],
            showFlag: true,
            currentLists: [
                {
                    style: 'position:absolute;left: 80%;top: 21%;width:20%;height:40%;',
                    boxText: '智能分采井调控测试',
                    boxBottomText: [{name:'智能配产器调控模型',url:'https://ipm.tjioms-dev.tjltd.cnooc/#/intelligentDispensing/intelligentSubMining'}, '举升设备调控模型', '智能测试模型'],
                    boxStyle: {
                        pWidth: 'width:11vw',
                    },
                    imgUrl: new URL('./topBox/23.png', import.meta.url).href,
                    showFlag:false,
                    typeIdList:[],
                    warningShowFlag : false,
                },
                {
                    style: 'position:absolute;left: 69%;top: 26%;width:20%;height:40%;',
                    boxText: '智能分注井调控测试',
                    boxBottomText: [{name:'智能分注井调控测试',url:'https://ipm.tjioms-dev.tjltd.cnooc/#/intelligentDispensing'}],
                    boxBottomContent: [[{name:'智能配水器调控模型',url:''}, '智能测试模型']],
                    boxStyle: {
                        pWidth: 'width:11vw',
                    },
                    imgUrl: new URL('./topBox/22.png', import.meta.url).href,
                    showFlag:false,
                    typeIdList:[],
                    warningShowFlag : false,
                },

                {
                    style: 'position:absolute;left: 57%;top: 60%;width:20%;height:40%;',
                    boxText: '注采调控油藏方案',
                    boxBottomText: [{name:'分层注水优化',url:'https://rem.tjioms-dev.tjltd.cnooc/#/intelligence1/optimization'}, '产液结构优化'],
                    boxBottomContent: [['智能滚动配注模型'], ['流场调控模型']],
                    boxStyle: {
                        pWidth: 'width:11vw'
                    },
                    imgUrl: new URL('./topBox/24.png', import.meta.url).href,
                    showFlag:false,
                    typeIdList:[],
                    warningShowFlag : false,
                },
                {
                    style: 'position:absolute;left: 43%;top: 56%;width:20%;height:40%;',
                    boxText: '注采状况分析',
                    boxBottomText: [
                        {name:'注采连通分析',url:'https://rem.tjioms-dev.tjltd.cnooc/#/basic/wellGroup_Maintenance'},
                        {name:'注采平衡分析',url:'https://rem.tjioms-dev.tjltd.cnooc/#/dynamicManagement/dynamicTrackingBlock/blockAnalysisReport'},
                        {name:'采出状况分析',url:'https://rem.tjioms-dev.tjltd.cnooc/#/dynamicManagement/dynamicTrackingBlock/blockAnalysisReport'}
                    ],
                    boxBottomContent: [
                        [{name:'注采连通性评价模型',url:''}],
                        [{name:'注采平衡分析模型',url:''}],
                        [{name:'注采平衡分析采出状况分析模型',url:''}]
                    ],
                    boxStyle: {
                        pWidth: 'width:8.5vw'
                    },
                    imgUrl: new URL('./topBox/13.png', import.meta.url).href,//暂无图片
                    showFlag:false,
                    typeIdList:[],
                    warningShowFlag : false,
                },
                {
                    style: 'position:absolute;left: 30%;top: 60%;width:20%;height:40%;',
                    boxText: '剩余油分布',
                    boxBottomText: [{name:'动态分析法/数模剩余油分析',url:'https://rem.tjioms-dev.tjltd.cnooc/#/intelligence1/optimization?link=rem'}],
                    boxStyle: {
                        pWidth: 'width:8.5vw'
                    },
                    imgUrl: new URL('./topBox/11.png', import.meta.url).href,
                    showFlag:false,
                    typeIdList:[],
                    warningShowFlag : false,
                },
                {
                    style: 'position:absolute;left: 17%;top: 56%;width:20%;height:40%;',
                    boxText: '调整区块确定',
                    boxBottomText: [{name:'层间/平面矛盾分析',url:'https://rem.tjioms-dev.tjltd.cnooc/#/dynamicManagement/dynamicTrackingBlock/blockAnalysisReport'}],
                    boxStyle: {
                        pWidth: 'width:8.5vw'
                    },
                    imgUrl: new URL('./topBox/25.png', import.meta.url).href,
                    showFlag:false,
                    typeIdList:[],
                    warningShowFlag : false,
                },
                {
                    style: 'position:absolute;left: 2%;top: 60%;width:20%;height:40%;',
                    boxText: '产量运行监控',
                    boxBottomText: [
                        {name:'年度产量运行预警',url:'https://rem.tjioms-dev.tjltd.cnooc/#/developStatus/developmentWarningCapacity'}
                    ],
                    boxBottomContent: [
                        [{name:'年度产量趋势预测',url:'https://rem.tjioms-dev.tjltd.cnooc/#/modelConfiguration/modelconfig'}]
                    ],
                    boxStyle: {
                        pWidth: 'width:8.5vw'
                    },
                    imgUrl: new URL('./topBox/21.png', import.meta.url).href,
                    showFlag:false,
                    typeIdList:[],
                    warningShowFlag : true,
                    analysisUrl:`https://rem.tjioms-dev.tjltd.cnooc/#/yield/statisticalTableProduction?wellIds=%5B%5D&prodDate=${data2}&prodDateCompare=${data1}`
                },
                {
                    style: 'position:absolute;left: 20%;top: 0%;width:20%;height:40%;',
                    boxText: '注水设备能力',
                    boxBottomText: [
                        {
                            name: '动设备健康管理模型',
                            url: 'https://efm.tjioms-dev.tjltd.cnooc/#/equipment/mechanical'
                        }
                    ],
                    boxStyle: {
                        pWidth: 'width:8.5vw'
                    },
                    imgUrl: new URL('./topBox/12.png', import.meta.url).href,
                    showFlag:false,
                    typeIdList:['BJ-SBSS-001','BJ-SBSS-002','BJ-SBSS-003','BJ-SBSS-004','BJ-SBSS-005','BJ-SBSS-009','BJ-SBSS-010','BJ-SBSS-011','BJ-SBSS-012','BJ-SBSS-013'],
                    warningShowFlag : false,
                },
                {
                    style: 'position:absolute;left: 58%;top: 36%;width:20%;height:40%;',
                    boxText: '分注分采调控策略',
                    boxBottomText: [{name:'注采调控最优化方案',url:'https://ipm.tjioms-dev.tjltd.cnooc/#/waterflood/merge?route=rem'}, {name:'配注微调策略',url:'https://rem.tjioms-dev.tjltd.cnooc/#/intelligence1/optimization?link=rem'}],
                    boxBottomContent: [['智能分注调控策略优化模型', '智能分注调控策略优化模型'], ['配注方案分析评估模型']],
                    boxStyle: {
                        pWidth: 'width:11vw'
                    },
                    imgUrl: new URL('./topBox/26.png', import.meta.url).href,
                    showFlag:false,
                    typeIdList:[],
                    warningShowFlag : false,
                },
                {
                    style: 'position:absolute;left: 55%;top: 2%;width:20%;height:40%;',
                    boxText: '海管能力',
                    boxBottomText: [
                        {name:'混输海管设计输量',url:'https://prm-pom.tjioms-dev.tjltd.cnooc/#/home/pipe'},
                        {name:'注水海管设计输量',url:'https://prm-pom.tjioms-dev.tjltd.cnooc/#/home/pipe'}
                    ],
                    boxBottomContent: [
                        [{ name:'管输动态模型', url:'https://prm-pom.tjioms-dev.tjltd.cnooc/#/home/pipe' }],
                        [{ name:'管输动态模型', url:'https://prm-pom.tjioms-dev.tjltd.cnooc/#/home/pipe' }]
                    ],
                    boxStyle: {
                        pWidth: 'width:7vw'
                    },
                    imgUrl: new URL('./topBox/10.png', import.meta.url).href,
                    showFlag:false,
                    typeIdList:['BJ-SC-002'],
                    warningShowFlag : false,
                },
                {
                    style: 'position:absolute;left: 72%;top: 0%;width:20%;height:40%;',
                    boxText: '处理能力',
                    boxBottomText: [
                        {name:'混输液处理能力',url:'https://prm-pom.tjioms-dev.tjltd.cnooc/#/home/plat'},
                        {name:'生产水处理能力',url:'https://prm-pom.tjioms-dev.tjltd.cnooc/#/home/plat'}
                    ],
                    boxBottomContent: [
                        [{name:'地面平衡调配-流程监控模型',url:'https://prm-pom.tjioms-dev.tjltd.cnooc/#/home/plat'}],
                        [{name:'地面平衡调配-流程监控模型',url:'https://prm-pom.tjioms-dev.tjltd.cnooc/#/home/plat'}]
                    ],
                    boxStyle: {
                        pWidth: 'width:7vw',
                    },
                    imgUrl: new URL('./topBox/28.png', import.meta.url).href,
                    showFlag:false,
                    typeIdList:['BJ-SC-003'],
                    warningShowFlag : false,
                },
            ]
        }
    },
    beforeDestroy() {
        clearInterval(this.timmer)
        clearInterval(this.timmerWarning)
    }
}
</script>

<style lang="less" scoped>
.container{
    height: calc(100% - 20px);
    background-image: url("@/assets/linkage/liandong-bg.gif");
    background-size: 100% 100%;
    .topBanner{
        width: 100%;height: 38px;
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
    .studySelf{
        width: 7vw;
        height: 7vw;
        position: absolute;
        bottom:40%;
        left: 5%;
        background-image: url("@/assets/linkage/02title-1.png");
        background-size: 100% 100%;
        .studySelfInside{
            width: 100%;
            height: 100%;
            color: #34d4e0;
            background-image: url("@/assets/linkage/02title-2.png");
            background-size: 100% 100%;
            //背景图旋转
            @-webkit-keyframes rotation{
                from {-webkit-transform: rotate(0deg);}
                to {-webkit-transform: rotate(360deg);}
            }
            -webkit-animation: rotation 10s linear infinite;
        }
        span{
            font-size: 1%;
            position: absolute;
            top: 43%;left: 30%;
            margin: auto;
            color: #34d4e0;
        }
    }
    img{
        display: none;
    }
    .leftDownArrow{
        transform: rotate(315deg);
        animation:leftDownArrow 2s linear infinite;
        position:absolute;
        left: 18%;top: 38%
    }
    @keyframes leftDownArrow{
        0%{
            left:20%;
            top: 36%;
            opacity:0;
        }
        100% {
            opacity: 1;
        }
    }
    .downArrow{
        transform: rotate(270deg);
        animation:downArrow 2s linear infinite;
        position:absolute;
        left: 7%;top: 70%
    }
    @keyframes downArrow{
        0%{
            top:68%;
            opacity:0;
        }
        100% {
            opacity: 1;
        }
    }
    .rightArrow{
        transform: rotate(180deg);
        animation:rightArrow 2s linear infinite;
        position:absolute;
        left: 45%;bottom: 2%;
    }
    @keyframes rightArrow{
        0%{
            left:43%;
            opacity:0;
        }
        100% {
            opacity: 1;
        }
    }
    .upArrow{
        transform: rotate(90deg);
        animation:upArrow 2s linear infinite;
        position:absolute;
        left: 85%;bottom: 20%;
    }
    @keyframes upArrow{
        0%{
            bottom:18%;
            opacity:0;
        }
        100% {
            opacity: 1;
        }
    }
    .leftUpArrow{
        transform: rotate(45deg);
        animation:leftUpArrow 2s linear infinite;
        position:absolute;
        left: 85%;top: 30%;
    }
    @keyframes leftUpArrow{
        0%{
            left: 87%;top: 32%;
            opacity:0;
        }
        100% {
            opacity: 1;
        }
    }
    .leftArrow{
        animation:leftArrow 2s linear infinite;
        position:absolute;
        left: 40%;top: 30%;
    }
    @keyframes leftArrow{
        0%{
            left:42%;
            opacity:0;
        }
        100% {
            opacity: 1;
        }
    }

}
</style>


