<template>
    <div id="menu">
        <!--隐藏菜单-->
        <div id="ensconce">
            <h2>
                <img src="./images/show.png" alt="">
                目标导航
            </h2>
        </div>
        <!--显示菜单-->
        <div id="open">
            <div class="navH">
                目标导航
                <span><img class="obscure" src="./images/obscure.png" alt=""></span>
            </div>
            <div class="navBox">
                <el-tree
                    ref="tree"
                    :data="deptOptions"
                    show-checkbox
                    accordion
                    :expand-on-click-node="false"
                    :default-expand-all="false"
                >
                </el-tree>
            </div>
        </div>
    </div>
</template>


<script>
import axios from "axios";
export default {
    props: {
        'level': {
            type: String,
            default: '5'
        }
    },
    data() {
        return {
            deptOptions: []
        }
    },
    mounted() {
        this.init();
        this.getTreeData();
    },
    methods: {
        init() {
            // 隐藏菜单
            var obscure = document.querySelector(".navH span");
            var open = document.querySelector("#open");
            var ensconce = document.querySelector("#ensconce");
            obscure.onclick = function () {
                open.style.marginLeft = "-300px";
                setTimeout(function () {
                    ensconce.style.display = "block";
                }, 350)
            }
            //显示菜单
            var showC = document.querySelector("#ensconce h2");
            showC.onclick = function () {
                open.style.marginLeft = "0px";
                setTimeout(function () {
                    ensconce.style.display = "none";
                }, 100)

            }
            obscure.onclick()
            //===========================================
            /* rem 适应*/
            /*让文字和标签的大小随着屏幕的尺寸做变话 等比缩放*/
            var html = document.getElementsByTagName('html')[0];
            /*取到屏幕的宽度*/
            var width = window.innerWidth;
            /* 640 100  320 50 */
            if (width > 1080) {
                width = 1080;
            } else if (width < 320) {
                width = 320;
            }
            var fontSize = 100 / 1080 * width;
            /*设置fontsize*/

            html.style.fontSize = fontSize + 'px';
            window.onresize = function () {
                var html = document.getElementsByTagName('html')[0];
                /*取到屏幕的宽度*/
                var width = window.innerWidth;
                if (width > 1080) {
                    width = 1080;
                } else if (width < 320) {
                    width = 320;
                }
                /* 640 100  320 50 */
                var fontSize = 100 / 1080 * width;
                /*设置fontsize*/
                html.style.fontSize = fontSize + 'px';
            }
        },
        getTreeData() {
            let params = {level: this.level, orgId: "715AD1CD60484BB59E737CD18A9DE44A"}
            axios.post('/dev-api/masterService/api/omc003d/getYczcTree', params).then(res => {
                this.deptOptions = res.data.data
            })
        }
    }
}
</script>

<style scoped lang="less">
#menu {
    overflow: hidden;
    height: 100%;
    float: left;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

#menu #ensconce {
    /*隐藏菜单样式*/
    width: 0.3rem;
    height: 100%;
    background-color: #20343c;
    float: left;
    text-align: center;
    position: relative;
    display: none;
}

#menu #ensconce h2 {
    cursor: pointer;
    color: #fff;
    font-size: 0.18rem;
    line-height: 0.5rem;
    width: 100%;
    position: absolute;
    top: 35%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(0%, -50%);
}

#menu #ensconce h2 img {
    width: 52%;
}

#menu #open {
    /*显示菜单样式*/
    width: 2.6rem;
    height: 100%;
    background-color: #363a45;
    padding-bottom: 0.1rem;
    box-sizing: border-box;
    -webkit-transition: all 0.8s ease;
    -moz-transition: all 0.8s ease;
    -o-transition: all 0.8s ease;
    -ms-transition: all 0.8s ease;
}

#menu #open .navH {
    height: 0.6rem;
    background-color: #44495a;
    line-height: 0.6rem;
    text-align: center;
    font-size: 0.18rem;
    color: #fff;
    position: relative;
    box-sizing: border-box;
}

#menu #open .navH span {
    position: absolute;
    top: 49%;
    right: 0;
    padding: 0 0.15rem;
    cursor: pointer;
    -webkit-transform: translate(0, -50%);
    -moz-transform: translate(0, -50%);
    -ms-transform: translate(0, -50%);
    -o-transform: translate(0, -50%);
    transform: translate(0, -50%);
    display: inline-block;
}

#menu #open .navH span .obscure {
    width: 0.15rem;
}

#menu #open .navBox {
    height: 100%;
    overflow-y: auto;
    padding-left: 0.05rem;
    padding-right: 0.07rem;
    margin-top: 0.1rem;
}

#menu #open .navBox ul li {
    background-color: #393c4a;
    cursor: pointer;
    margin-bottom: 4px;
}

#menu #open .navBox ul li .obtain {
    background-color: #3889D4;
}

#menu #open .navBox ul li .obtain:hover {
    background-color: #3D8332;
}

#menu #open .navBox ul li h2 {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    color: #fff;
    font-size: 0.15rem;
    padding: 0.15rem 0;
    -webkit-transition: all 0.6s ease;
    -moz-transition: all 0.6s ease;
    -o-transition: all 0.6s ease;
    -ms-transition: all 0.6s ease;
}

#menu #open .navBox ul li h2 i {
    position: absolute;
    top: 50%;
    right: 0.15rem;
    border-top: 0.07rem transparent dashed;
    border-left: 0.07rem solid #fff;
    border-right: 0.07rem transparent dashed;
    border-bottom: 0.07rem transparent dashed;
    display: inline-block;
    -webkit-transition: -webkit-transform 0.6s ease;
    -moz-transition: -moz-transform 0.6s ease;
    -o-transition: -o-transform 0.6s ease;
    -ms-transition: -ms-transform 0.6s ease;
    transform-origin: 4px 3px;
    -webkit-transform: translate(0, -50%);
    -moz-transform: translate(0, -50%);
    -ms-transform: translate(0, -50%);
    -o-transform: translate(0, -50%);
    transform: translate(0, -50%);
}

#menu #open .navBox ul li h2 .arrowRot {
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
}

#menu #open .navBox ul li .secondary {
    overflow: hidden;
    height: 0;
    -webkit-transition: all 0.6s ease;
    -moz-transition: all 0.6s ease;
    -o-transition: all 0.6s ease;
    -ms-transition: all 0.6s ease;
}

#menu #open .navBox ul li .secondary h3 {
    padding: 0.1rem 0;
    text-align: center;
    font-size: 0.13rem;
    background-color: #282c3a;
    color: #ffffff;
    border-bottom: 0.8px solid #42495d;
    -webkit-transition: all 0.4s ease;
    -moz-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    -ms-transition: all 0.4s ease;
}

#menu #open .navBox ul li .secondary h3:hover {
    background-color: #1acbfc;
}

#menu #open .navBox ul li .secondary .seconFocus {
    background-color: #1acbfc;
    -webkit-box-shadow: 3px 3px 3px #aa8c51;
    -moz-box-shadow: 3px 3px 3px #aa8c51;
    box-shadow: 3px 3px 3px #aa8c51;
}

</style>