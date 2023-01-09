<template>
    <!-- 跑马灯组件 -->
      <div class="marquee-wrap" ref="marquee-wrap">
        <div class="scroll" ref="scroll">
          <p class="marquee">{{text}}</p>
          <p class="copy" ref="copy"></p>
        </div>
        <p class="getWidth" ref="getWidth">{{text}}</p>
      </div>
    </template>
    
<script>
export default {
  name: 'marquee',
  props: ['val'],
  data () {
    return {
      timer: null,
      text: ''
    }
  },
  created () {
    const timer = setTimeout(() => {
      this.move()
      clearTimeout(timer)
    }, 1000)
  },
  mounted () {
    // for (const item of this.val) {
    //   this.text += item
    // }
    this.val.forEach(item => {
      this.text += item
    });
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    move () {
      const maxWidth = this.$refs['marquee-wrap'].clientWidth
      const width = this.$refs.getWidth.scrollWidth
      if (width <= maxWidth) return
      const {scroll} = this.$refs
      const {copy} = this.$refs
      copy.innerText = this.text
      let distance = 0 
      this.timer = setInterval(() => {
        distance -= 1
        if (-distance >= width) {
          distance = 16
        }
        scroll.style.transform = `translateX(${  distance  }px)`
      }, 20)
    }
  }
}
</script>
    
    <style scoped>
      .marquee-wrap {
        width: 100%;
        overflow: hidden;
        position: relative;
      }
      .marquee{
        margin-right: 0.16rem;
      }
      p {
        word-break:keep-all;
        white-space: nowrap;
        font-size: 0.28rem;
      }
      .scroll {
        display: flex;
      }
      .getWidth {
        word-break:keep-all;
        white-space:nowrap;
        position: absolute;
        opacity: 0;
        top: 0;
      }
    </style>