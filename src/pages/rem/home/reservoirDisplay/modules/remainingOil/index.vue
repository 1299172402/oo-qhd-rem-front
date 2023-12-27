<template>
    <div class="video-container">
        <video
            controls
           :src="videosrc"
            height="100%"
            width="100%"
          
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
video:focus {
    outline: -webkit-focus-ring-color auto 0px;
}
</style>
