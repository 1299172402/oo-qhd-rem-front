<template>
    <div class="video-container">
        <video
            controls
           :src="videosrc"
            height="90%"
            width="90%"
            style="margin-top: -5%"
        >
        </video>
    </div>
   
</template>

<script>
import {getOilVideoFromMinIO} from "@/api/rem/reservoirbillboards.js";
export default {
    data(){
      return{
          videosrc:'',
      }  
    },
    mounted() {
        getOilVideoFromMinIO().then((res)=>{
            const videourl = URL.createObjectURL(res)
            this.videosrc = videourl
            // console.log(res,blobvideo,videourl)q
        })
    },
};
</script>

<style scoped>
video::-webkit-media-controls-fullscreen-button{display:none;}
video::-webkit-media-controls-volume-control-container{display:none;}
.video-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

</style>
