<template>
    <div class="box">
        <img id="im" height="100%" width="80%" />
    </div>
<!--  <video-->
<!--    id="my-video"-->
<!--    class="box"-->
<!--    height="100%"-->
<!--    width="100%"-->
<!--    autoplay-->
<!--    src="./剩余油.mp4"-->
<!--  >-->
<!--    <div class="progress-bar"></div>-->
<!--    <div class="progress"></div>-->
<!--  </video>-->
    
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
        };
    },
  mounted() {
      GetModelBasicByMaxModelSort().then((res)=>{
          let data = {
              modelBasicId:res.result.modelBasicEntity.modelBasicId,
              modelLayerId: '27F34A07749947F5BC2417DD0E18D14B',
              isRealData: 0
          }
          GetModelImageList(data).then((res)=>{
              res.result.modelImageList.map((n)=>{
                  this.image.push(n.imageUrl) 
              })
              this.startImageRotation() // 开始图片轮播
          })
      })
      
  },
  methods: {
//       setInterval("changeImg()",10);
// i=1
// function
      startImageRotation() {
          let currentIndex = 0; // 当前图片索引
          var SImg = document.getElementById('im');

          // 定义每隔一定时间切换图片的函数
          const rotateImage = () => {
              SImg.src = this.image[currentIndex]; // 切换图片

              currentIndex++; // 索引递增
              if (currentIndex >= this.image.length) {
                  currentIndex = 0; // 若到达最后一张图片，则重置索引为 0
              }
          };

          // 设置定时器，每隔 10 毫秒切换一次图片
          setInterval(rotateImage, 200);
      },
    //   video() {
    //   const video = document.getElementById("im");
    //   video.onresize = () => {
    //     const videoWidth = video.offsetWidth;
    //     const newWidth = Math.floor((videoWidth / barWidth) * 100);
    //       video.style.width = `${newWidth}%`;
    //   };
    // },
  },
};
</script>

<style scoped>
.box {
  height: 100%;
  width: 100%;
  background: url("@/pages/rem/home/reservoirDisplay/modules/油藏看板视频底色.svg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  text-align: center;
  padding: 4% 0 4% 0;
  overflow: hidden;
}

</style>
