<template>
  <div>
    <nav-header :activeIndex = 'activeIndex'></nav-header>
    
    <!-- 文章列表 -->
    <el-row type="flex" justify="center" class="content-blog">
      <el-col :span="10" class="content-col">
      <el-tabs class="articlemenu" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="前端" name="Front"></el-tab-pane>
        <el-tab-pane label="后端" name="Back"></el-tab-pane>
    </el-tabs>
        <nuxt-link
          v-for="item in list"
          :key="item._id"
          :to="{path:'/article',query:{id:item._id}}"
          class="box-href"
        >
          <el-card class="box-card" shadow="hover">
            <h2 class="box-title">{{item.title}}</h2>
            <div class="box-icon">
              <span>
                <i class="el-icon-date"></i>
                &nbsp;{{item.time}}
              </span>
              <span>
                <i class="el-icon-view"></i>&nbsp;115次阅读
              </span>
              <span>
                <i class="el-icon-s-custom"></i>&nbsp;{{item.author}}
              </span>
            </div>
            <div class="box-content">{{item.des}}</div>
          </el-card>
        </nuxt-link>
        <el-pagination
          class="pagination"
          @current-change="pagination"
          background
          layout="prev, pager, next"
          :page-size="5"
          :total="count"
          v-show="count >= 5"
        ></el-pagination>
      </el-col>
      <!-- 右侧关于我 -->
      <el-col :span="5" :offset="1">
        <el-card class="about">
          <div class="about-title">about Me</div>
          <div class="about-name">
            <img src="~/static/images/name.png" alt="brianlee" />
          </div>
          <div class="about-content">
            <p>网名：Super li</p>

            <p>职业：Web前端工程师</p>

            <p>邮箱：123@163.com</p>
          </div>
        </el-card>
        <!-- 近期文章开始 -->
        <el-card class="article">
          <div class="article-title">近期文章</div>
          <hr />
          <nuxt-link
            v-for="item in lately"
            :key="item._id"
            :to="{path:'/article',query:{id:item._id}}"
            class="article-link"
          >
            <i class="el-icon-edit"></i>
            &nbsp;&nbsp;{{item.title}}
          </nuxt-link>
        </el-card>
        <!-- 近期文章结束 -->

        <!-- 友情链接开始 -->
        <el-card class="link">
          <div class="link-title">友情链接</div>
          <hr />
          <div class="link-content">
            <a href="/" target="_blank" class="link-url">五子棋</a>
            <a href="/" target="_blank" class="link-url">虚位以待</a>
          </div>
        </el-card>
        <!-- 友情链接结束 -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NavHeader from "~/components/NavHeader";

export default {
  name: "index",
  data() {
    return {
      activeIndex: 'index',
      activeName:'Front'
    };
  },
  components: {
    NavHeader
  },
  methods: {
    pagination(page) {
			let json = {page,pagesize:5}
			this.$axios.get('/article/getFrontArticle',{params:json}).then(res=>{
				let {error,count,list} = res.data;
				this.list =list;
			});
		},
    handleClick(tab, event) {
        console.log(tab.name);
        this.getArticle(tab.name)
        
    },
    async getArticle(articletype) {
      let json = {page:1,pagesize:5};
      let {status,data:{count,list}} = await this.$axios.get(`/article/get${articletype}Article`,{params:json});
      let lately = list.slice(0,4);
    if(status === 200){
      this.count = count;
      this.list = list;
      this.lately = lately;
    } else {
        this.count = 4;
        this.list=[
          {
          _id: 123,
          title: "test",
          time: "2019年12月22日",
          author:'admin',
          des: "sdfjhawsiuefhwasiuofhsaioufhasioefu"
          },{
            _id: 124,
            title: "test",
            time: "2019年12月22日",
            author:'admin',
            des: "sdfjhawsiuefhwasiuofhsaioufhasioefu"
          },{
            _id: 126,
            title: "test",
            time: "2019年12月22日",
            author:'admin',
            des: "sdfjhawsiuefhwasiuofhsaioufhasioefu"
          },{
            _id: 128,
            title: "test",
            time: "2019年12月22日",
            author:'admin',
            des: "sdfjhawsiuefhwasiuofhsaioufhasioefu"
          },
        ]
        this.lately=[{
        _id:22,
        title:'test'
      },{
        _id:23,
        title:'test'
      },{
        _id:24,
        title:'test'
      }]
      }
    }
  },
  async asyncData(ctx) {
    let json = {page:1,pagesize:5};
    let {status,data:{count,list}} = await ctx.$axios.get('/article/getFrontArticle',{params:json});
    let lately = list.slice(0,4);
    if(status === 200){
      return {
        count,
        list,
        lately
      }
    } else {
      return{
        count:4,
        list:[
          {
          _id: 123,
          title: "test",
          time: "2019年12月22日",
          des: "sdfjhawsiuefhwasiuofhsaioufhasioefu"
        },{
          _id: 124,
          title: "test",
          time: "2019年12月22日",
          des: "sdfjhawsiuefhwasiuofhsaioufhasioefu"
        },{
          _id: 126,
          title: "test",
          time: "2019年12月22日",
          des: "sdfjhawsiuefhwasiuofhsaioufhasioefu"
        },{
          _id: 128,
          title: "test",
          time: "2019年12月22日",
          des: "sdfjhawsiuefhwasiuofhsaioufhasioefu"
        },
        ],
        lately:[{
        _id:22,
        title:'test'
      },{
        _id:23,
        title:'test'
      },{
        _id:24,
        title:'test'
      }]
      }
    }
  },
  head() {
		return {
			title:'李磊的个人博客-一个基于Nuxt构建的博客网站',
			meta:[
				{hid:'description',name:'description',content:'李磊个人博客，关注于web前端技术和web全栈技术的学习研究。'},
				{hid:'keywords',name:'keywords',content:'李磊,互联网,自媒体,李磊博客,新鲜科技,科技博客，个人博客,原创博客,前端,前端开发,全栈,全栈开发,nuxt,nuxtjs,vue,vuejs'},
				{hid:'author',content:'lilei'}
			]
		}
	}
};
</script>

<style lang="less">
@import "../assets/css/Index/Content.less";

.articlemenu {
  width: 400px;
}
</style>
