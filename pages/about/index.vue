<template>
    <div>
        <nav-header :activeIndex='activeIndex'/>
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="14">
                <el-card class="box-card">
                    <div class="container">
                        <h2 class="blog">关于博客</h2>
                        <h3>博客前端：</h3>
                        <p>采用服务器端渲染(ssr),基于 Vue.js 的通用应用框架:Nuxt.js + Element-UI + @nuxtjs/axios + Less</p>
                        <h3>博客后端:</h3>
                        <p>UI层：使用 Vue + Vue-Router + Vue-cli + Vue + Axios + Less + Iview</p>
                        <p>服务层：使用 Node.js + Koa2 + MongoDB + Mongoose + Koa-session</p>

                        <h2 class="self">关于博客</h2>
                        <h3>个人简介</h3>
                        <ul>
                            <li>姓名：李磊</li>
                            <li>学历：本科</li>
                            <li>专业：网络工程</li>
                            <li>毕业院校：成都信息工程大学</li>
                            <li>电子邮箱：15528022618@163.com</li>
                            <li><h2>求职意向：前端开发工程师</h2></li>
                        </ul>
                        <h3>专业技能</h3>
                        <ul>
                            <li>前端：HTML、CSS、Javacript、JQuery、Vue全家桶、微信小程序开发等等</li>
                            <li>后端：NodeJs、MongoDB数据库、Mongoose、Express、Koa2 等等</li>
                            <li>UI框架：Bootstrap、Element-UI 等等</li>
                            <li>其他：java、C语言、计算机网络、计算机基础、网络服务器配置与管理、交换与路由技术、office软件</li>
                        </ul>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import NavHeader from "~/components/NavHeader";
export default {
    data() {
        return {
            activeIndex:'about'
        }
    },
    components: {
        NavHeader
    }
}
</script>
<style lang="less">
    .row-bg {
        margin-top: 2rem;
        margin-bottom: 5rem;
        .container {
            margin: 1rem;
            .blog {
                text-align: center;
                line-height: 3rem;
                padding-bottom: 1rem;
                border-bottom: 1px dotted  black;
            }
            p {
                text-indent: 2em
            }
            .self {
                .blog
            }
            ul{
                margin-left: 40px;
            }
        }
        
    }
</style>