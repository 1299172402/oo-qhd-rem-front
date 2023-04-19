<template>
    <div class="container" style="position: relative">
        <div class="topBanner">注采联动</div>
        <linkageBox :style="item.style" :currentList="item" :key="index" v-for="(item,index) in currentLists"></linkageBox>
        <div class="studySelf">
            <div class="studySelfInside"></div>
            <span>模型自学习</span>
        </div>
        <img class="downArrow" style="display: block" src="@/assets/linkage/arrow-left.png" alt="">
        <img class="rightArrow" src="@/assets/linkage/arrow-left.png" alt="">
        <img class="upArrow" src="@/assets/linkage/arrow-left.png" alt="">
        <img class="leftUpArrow" src="@/assets/linkage/arrow-left.png" alt="">
        <img class="leftArrow" src="@/assets/linkage/arrow-left.png" alt="">
        <img class="leftDownArrow" src="@/assets/linkage/arrow-left.png" alt="">
    </div>
</template>

<script>
import linkageBox from "./linkageBox/index.vue";
const env = import.meta.env.MODE;
const baseUrl = env == "development"?'/src':''
export default {
    components:{
        linkageBox
    },
    mounted(){
        this.arrowFun()
    },
    methods: {
        arrowFun(){
            setInterval(()=>{
                this.loopNum ++
                for(let i=0;i<6;i++){
                    this.$el.querySelectorAll('img')[i].style.display = 'none'
                }
                this.$el.querySelectorAll('img')[this.loopNum].style.display = 'block'
                if(this.loopNum == 5){
                   this.loopNum = -1
                }
            },1000)
        }
    },
    created() {
        console.log(env);
    },
    data(){
        return {
            baseUrl : env == "development"?'/src':'',
            loopNum: 0,
            show: true,
            currentLists: [
                {
                    style: 'position:absolute;left: 80%;top: 21%;width:20%;height:40%;',
                    boxText: '智能分采井调控测试',
                    boxBottomText: ['智能配产器调控模型', '举升设备调控模型', '智能测试模型'],
                    boxStyle: {
                        pWidth: 'width:11vw',
                    },
                    imgUrl: 'background:url('+baseUrl+'/assets/linkage/topBox/23.png)'
                },
                {
                    style: 'position:absolute;left: 69%;top: 26%;width:20%;height:40%;',
                    boxText: '智能分注井调控测试',
                    boxBottomText: ['智能分注井调控测试'],
                    boxBottomContent: [['智能配水器调控模型', '智能测试模型']],
                    boxStyle: {
                        pWidth: 'width:11vw',
                    },
                    imgUrl: 'background:url('+baseUrl+'/assets/linkage/topBox/22.png)'
                },

                {
                    style: 'position:absolute;left: 57%;top: 60%;width:20%;height:40%;',
                    boxText: '注采调控油藏方案',
                    boxBottomText: ['分层注水优化', '产液结构优化'],
                    boxBottomContent: [['智能滚动配注模型'], ['流场调控模型']],
                    boxStyle: {
                        pWidth: 'width:11vw'
                    },
                    imgUrl: 'background:url('+baseUrl+'/assets/linkage/topBox/24.png)'
                },
                {
                    style: 'position:absolute;left: 43%;top: 56%;width:20%;height:40%;',
                    boxText: '注采状况分析',
                    boxBottomText: ['注采连通分析', '注采平衡分析', '采出状况分析'],
                    boxBottomContent: [['注采连通性评价模型'], ['注采平衡分析模型'], ['注采平衡分析采出状况分析模型']],
                    boxStyle: {
                        pWidth: 'width:8.5vw'
                    },
                    imgUrl: 'background:url('+baseUrl+'/assets/linkage/topBox/13.png)'//暂无图片
                },
                {
                    style: 'position:absolute;left: 30%;top: 60%;width:20%;height:40%;',
                    boxText: '剩余油分布',
                    boxBottomText: ['动态分析法/数模剩余油分析'],
                    boxStyle: {
                        pWidth: 'width:8.5vw'
                    },
                    imgUrl: 'background:url('+baseUrl+'/assets/linkage/topBox/11.png)'
                },
                {
                    style: 'position:absolute;left: 17%;top: 56%;width:20%;height:40%;',
                    boxText: '调整区块确定',
                    boxBottomText: ['层间/平面矛盾分析'],
                    boxStyle: {
                        pWidth: 'width:8.5vw'
                    },
                    imgUrl: 'background:url('+baseUrl+'/assets/linkage/topBox/25.png)'
                },
                {
                    style: 'position:absolute;left: 2%;top: 60%;width:20%;height:40%;',
                    boxText: '产量运行监控',
                    boxBottomText: ['年度产量运行预警'],
                    boxBottomContent: [['年度产量趋势预测']],
                    boxStyle: {
                        pWidth: 'width:8.5vw'
                    },
                    imgUrl: 'background:url('+baseUrl+'/assets/linkage/topBox/21.png)'
                },
                {
                    style: 'position:absolute;left: 20%;top: 0%;width:20%;height:40%;',
                    boxText: '注水设备能力',
                    boxBottomText: ['动设备健康管理模型'],
                    boxStyle: {
                        pWidth: 'width:8.5vw'
                    },
                    imgUrl: 'background:url('+baseUrl+'/assets/linkage/topBox/12.png)'
                },
                {
                    style: 'position:absolute;left: 58%;top: 36%;width:20%;height:40%;',
                    boxText: '分注分采调控策略',
                    boxBottomText: ['注采调控最优化方案', '配注微调策略'],
                    boxBottomContent: [['智能分注调控策略优化模型', '智能分注调控策略优化模型'], ['配注方案分析评估模型']],
                    boxStyle: {
                        pWidth: 'width:11vw'
                    },
                    imgUrl: 'background:url('+baseUrl+'/assets/linkage/topBox/26.png)'
                },
                {
                    style: 'position:absolute;left: 55%;top: 2%;width:20%;height:40%;',
                    boxText: '海管能力',
                    boxBottomText: ['混输海管设计输量', '注水海管设计输量'],
                    boxBottomContent: [['管输动态模型'], ['管输动态模型']],
                    boxStyle: {
                        pWidth: 'width:7vw'
                    },
                    imgUrl: 'background:url('+baseUrl+'/assets/linkage/topBox/10.png)'
                },
                {
                    style: 'position:absolute;left: 72%;top: 0%;width:20%;height:40%;',
                    boxText: '处理能力',
                    boxBottomText: ['混输液处理能力', '生产水处理能力'],
                    boxBottomContent: [['地面平衡调配-流程监控模型'], ['地面平衡调配-流程监控模型']],
                    boxStyle: {
                        pWidth: 'width:7vw',
                    },
                    imgUrl: 'background:url('+baseUrl+'/assets/linkage/topBox/28.png)'
                },
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.container{
    height: calc(100% - 20px);
    background-image: url("@/assets/linkage/liandong-bg.jpg");
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
        z-index: 999;
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
        animation:leftDownArrow 1s linear infinite;
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
        animation:downArrow 1s linear infinite;
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
        animation:rightArrow 1s linear infinite;
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
        animation:upArrow 1s linear infinite;
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
        animation:leftUpArrow 1s linear infinite;
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
        animation:leftArrow 1s linear infinite;
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


