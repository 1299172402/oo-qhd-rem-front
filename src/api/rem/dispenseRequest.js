//对于axios进行二次封装
import axios from 'axios'
//引入进度条
import nProgress from "nprogress";
//引入进度条样式
import "nprogress/nprogress.css";
//start:进度条开始   done:进度条结束
//1.利用axios对象的方法creat,去创建一个axios实列

const  Axios =axios.create({
    //配置对象
    //基础路径，发送请求的时候，路径当中会出现api
    // api的base_url
   // baseURL: 'api',
    //
    // baseURL: process.env.VUE_APP_BASE_API,
    //代表请求超时的时间5S
    timeout: 300000 ,
});
//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
Axios.interceptors.request.use((config)=>{
    //config：配置对象，对象里面有一个参数很重要，header请求头
    //进度条开始
    nProgress.start();
    return config;
})

//响应拦截器
Axios.interceptors.response.use((res)=>{
    //服务器成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到，并做一些事情
    //进度条结束
    nProgress.done();
    return res.data;

},(error)=>{
    //响应失败的回调函数      可以参考axios文档
    return Promise.reject(new Error('faile'))
});
//对外暴露
export default  Axios;
