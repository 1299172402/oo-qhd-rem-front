<template>
  <iframe 
    ref="innerIframe"
    class="iframeClass" 
    name="innerframe" 
    frameborder="none" 
    :src="url"
    @load="innerframeload"
   ></iframe>
</template>

<style>
.iframeClass {
  position: relative;
  height: 100%;
  width: 100%;
  border: 0px;
}
</style>
<script>

/***
 * Author cuiliang@victorysoft.com.cn
 * first add    unknown
 * 1：此IFRAME组件可以通过地址栏传入参数，如下：
 * url： 要在iframe加载的页面地址（需编码）
 * title： 此组件标题部位显示的文字（需编码）
 * back： 此组件返回时的页面地址，未指定在返回前一页面
 * modify 20190613 details:
 * 1：增加作为子组件时的传入参数（请参考props节点），为了支持此组件加载的页面存在JSAPI的情况，需要在父组件中实现JSAPI的处理
 * 2：约定URL传入参数与父组件传入参数的优先级，地址栏传入参数优先，父组件传入参数其次
 * 3：iframe的加载过程会触发两个事件：VUE生命周期的创建后事件：framemounted(innerframe)；iframe页面加载之后的frameloaded(innerframe)
 * 如果内部页面存在JSAPI，可通事件在外部注入API处理（域允许的前提下）
 * 4：增加对父组件传入参数变化的监听，父组件中动态修改了传入参数，则会在子组件中生效
 * by cuiliang 20190624
 * 该iframe组件修改，将标题，按钮等交互操作移入iframeWarpper组件，
 * 参数如下：
 * url:string iframe要加载的页面
 * 事件如下：
 * framemounted(this.innerIframe),该组件mounted事件，传出参数为DOM原生iframe控件
 * frameloaded(this.innerIframe),DOM原生iframe的load事件，传出参数为DOM原生iframe控件
 * by cuiliang 20200430 
 * 增加属性watchQuery{type:Boolean,default:true},作为监听query.url参数的开关
 * 某些情况下，内部的自动监听会导致外面的监听无法正常工作，因此增加此属性
 * 
 * 
 * 
 */



export default {
  props: {
    url:
    {
      type: String,
      default: ""
    },
    watchQuery: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      
    };
  },
  watch: {
    $route(to, from) {
      if(this.watchQuery&&to.query.url!=from.query.url)
        this.url=to.query.url;
    },
    url(newV){
      this.$refs.innerIframe.src=newV;
    },
    
  },
  mounted() {
    this.innerIframe=this.$refs['innerIframe'];
    this.$emit("framemounted",this.innerIframe);
    window.onresize = function () { 
      if(!document.querySelector('.iframeClass')) return
    };
  },
  created() {
    if(this.watchQuery&&this.$route.query.url&&this.$route.query.url!="") this.url = decodeURIComponent(this.$route.query.url);
    
  },
  methods: {
    
    innerframeload: function(){
      this.$emit("frameloaded",this.innerIframe)
    }
  }
};
</script>