import { debounce } from '@/lib/comFun'

export default {
  data() {
    return {
      $_resizeHandler: null
    }
  },
  mounted() {

    this.initListener();
    // 用于初始化页面是高度问题
  },
  activated() {
    if (!this.$_resizeHandler) {
      // avoid duplication init
      this.initListener()
    }

    // when keep-alive chart activated, auto resize
    this.resize()
  },
  beforeDestroy() {
    this.destroyListener()
  },
  deactivated() {
    this.destroyListener()
  },
  methods: {
    initListener() {
      this.$_resizeHandler = debounce(() => {
        this.resize()
      }, 100)
      window.addEventListener('resize', this.$_resizeHandler)
      this.watchResize()
    },
    destroyListener() {
      window.removeEventListener('resize', this.$_resizeHandler)
      this.$_resizeHandler = null
    },
    resize() {
      this.$nextTick(()=>{
        if(this.autoResizeWidth){
          this.boxOffsetWidth = this.$el.offsetWidth
        }
        if(this.autoResizeHeight){
          this.boxOffsetHeight = this.$el.offsetHeight
        }
        this.autoResizeHeight || this.autoResizeWidth ? this.watchResize() : null        
      })
    },
    watchResize(){
      const initSizeInterval = setInterval(()=>{
        if(this._height == this.$el.offsetHeight){
          clearInterval(initSizeInterval)
        }else{
          this.$_resizeHandler()
        }
      },50)
    }
  }
}
