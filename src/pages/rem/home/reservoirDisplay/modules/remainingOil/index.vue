<template>
    <div class="box">
        <p style="position: absolute;top:3%;left:30%">{{this.tieme.slice(0,10)}}</p>
        <img id="im" style="position: absolute;top:25%;right: 18%" height="60%" width="75%" />
        <el-image v-if="initiate" :src="require('@/icons/svg/u2080.png')" style="height:20px;width:20px;position: absolute;cursor:pointer;left:93%;top:30%" @click="startImageRotation"></el-image>
        <el-image v-else  :src="require('@/icons/svg/u2077.png')" style="height:20px;width:20px;cursor:pointer;position: absolute;left:93%;top:30%" @click="stop"></el-image>
    </div>
</template>

<script>
import {
    GetModelBasicByMaxModelSort,
} from "@/api/rem/dispenseIndex.js";
import { GetModelLayerList, GetModelImageList, } from "@/api/rem/dispenseModel.js";
import {TOKEN_NAME, USER_NAME} from "@/config/global";
import proxy from "@/config/host";
export default {
    data() {
        return {
            image:[],
            initiate:true,
            SImg:'',
            tieme:'',
            rotationTimer:''
        };
    },
    mounted() {
        this.SImg = document.getElementById('im');
        GetModelBasicByMaxModelSort().then((res)=>{
            this.tieme = res.result.modelBasicEntity.inputDate
            let data = {
                modelBasicId:res.result.modelBasicEntity.modelBasicId,
                modelLayerId: '27F34A07749947F5BC2417DD0E18D14B',
                isRealData: 0
            }
            GetModelImageList(data).then((res)=>{
                res.result.modelImageList.map((n)=>{
                    this.image.push(n.imageUrl)
                })
                this.SImg.src = this.image[0]; // 切换图片
            })
        })

    },
    methods: {
        startImageRotation() {
            this.initiate = !this.initiate
            let currentIndex = 0; // 当前图片索引
            const rotateImage = () => {
                this.SImg.src = this.image[currentIndex]; // 切换图片
                currentIndex++; // 索引递增
                if (currentIndex >= this.image.length) {
                    currentIndex = 0; // 若到达最后一张图片，则重置索引为 0
                }
            };
            this.rotationTimer = setInterval(rotateImage, 200);
            // 设置定时器
        },
        stop(){
            this.initiate = !this.initiate
            clearInterval(this.rotationTimer);
        },

    },
};
</script>

<style scoped>
.box {
    height: 100%;
    width: 100%;
    background-image: url("@/pages/rem/home/reservoirDisplay/modules/油藏看板视频底色.svg");
    //background: url("@/pages/rem/home/reservoirDisplay/modules/油藏看板视频底色.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    text-align: center;
    overflow: hidden;
}

</style>
