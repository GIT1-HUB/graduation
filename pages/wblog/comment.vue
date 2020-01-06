<template>
  <div class="container">
    <Row>
      <Col :span="11">
        <Card>
          <p slot="title">评论开放规则</p>状态:
          <i-switch v-model="switch1" @on-change="change" size="large">
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
          </i-switch>
        </Card>
      </Col>
      <Col :span="11" offset="2">
        <Card>
          <p slot="title">搜索评论</p>
          <div>
            <div style="display:flex;justify-content: space-between;">
              <i-input
                search
                enter-button
                style="width:80%;"
                placeholder="搜索文章标题"
                v-model="searchArticle"
                @on-search="search"
              ></i-input>
              <!--<Button type="success" @click="search">搜索评论</Button>-->
            </div>
          </div>
        </Card>
      </Col>
      <Divider dashed style="margin-top: 200px">评论列表</Divider>
    </Row>
    <Row type="flex" justify="space-between" class="commentlist">
      <Col :span="24">
        <Card v-for="(item,key) in commentTable" :key="item.id" class="commentcard">
          <p slot="title">
            <span class="title1">{{item.title}}</span>
            <span calss="title2" style="float:right">{{item.id}}</span>
          </p>
          <i-table border :columns="columns12" :data="item.comment" max-height="183">
            <template slot-scope="{ row }" slot="username">
              <div>
                <strong>{{ row.username }}</strong>
                <el-tag type="success" v-show="curusername == row.username">作者</el-tag>
              </div>
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Button
                type="primary"
                size="small"
                style="margin-right: 5px"
                @click="show(index,item)"
              >详情</Button>
              <Button type="error" size="small" @click="remove(index,item)">删除</Button>
            </template>
          </i-table>
        </Card>
        <span class="emptycomment" v-if="commentCount === 0" >没有数据</span>
        <div class="commentPage" v-show="commentCount !== 0">
          <Page :total="commentCount" :page-size="4" @on-change="commentPage" />
        </div>
      </Col>
    </Row>
    <!-- 封装模态框 -->
    <Modal v-model="modal2" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除评论提醒</span>
      </p>
      <div style="text-align:center">
        <p style="font-weight:bold;font-size:16px;">此删除操作将会永久删除，且无法恢复</p>
        <p style="font-weight:bold;">你确定要删除么？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="modal_loading" @click="dele">确定删除</Button>
      </div>
    </Modal>
    <!-- 模态框结束 -->
  </div>
</template>
<script>
export default {
  layout: "wblog",
  data() {
    return {
      switch1: true,
      // 临时存放时间戳
      commentTime: 0,
      // 临时存放id
      commentId: null,
      delCount: "",
      error: "",
      modal2: false,
      modal_loading: false,
      value: "",
      searchArticle: "",
      page: 1,
      pagesize: 4,
      commentTable: "",
      commentCount: 0,
      commentempty:false,
      columns12: [
        {
          title: "用户名",
          slot: "username"
        },
        {
          title: "邮箱",
          key: "email"
        },
        {
          title: "IP地址",
          key: "ip"
        },
        {
          title: "时间",
          key: "time"
        },
        {
          title: "评论内容",
          key: "content"
        },
        {
          title: "Action",
          slot: "action",
          width: 180,
          align: "center"
        }
      ]
    };
  },
  created() {
    this.getCommentList();
    this.getCommentConfig();
  },
  computed: {
    curusername(){
      return this.$store.state.username
    }
  },
  methods: {
    getCommentConfig() {
        let json = {author:this.curusername}
		    this.$axios.get('/comment/getConfig',{params:json}).then(res => {
          this.switch1 = res.data.data[0].status;
        });
            // console.log(result)
    },
    async change(status) {
      let json = {author:this.curusername,status:status};
      let {data:{error}} = await this.$axios.get('/comment/setConfig',{params:json})
      if(error == 0){
        if(status == true){
          this.$Message.info("评论开启");
        } else {
          this.$Message.info("评论关闭");
        }
      }

      
    },
    async getCommentList() {
      let { data } = await this.$axios.post("/comment/commentsList", {
        page: this.page,
        pagesize: this.pagesize,
        author: this.$store.state.username
      });
      this.commentTable = data.result;
      this.commentCount = data.count;
    },
    show(index, item) {
      console.log(index);
      console.log(item);
      this.$Modal.info({
        title: "评论信息",
        content: `用户名：${item.comment[index].username}<br>邮箱：${item.comment[index].email}<br>内容：${item.comment[index].content}`
      });
    },
    remove(index, item) {
      this.modal2 = true;
      this.commentTime = item.comment[index].time;
      this.commentId = item.id;
      console.log(this.commentTime);
      console.log(this.commentId);
    },
    delete(id, time) {
      let json = { id, time };
      this.$axios.post("/comment/delComment", json).then(res => {
        let { delCount, error } = res.data;
        this.delCount = delCount;
        this.error = error;
      });
    },
    dele() {
      /*
       *真正删除数据。异步使用延迟删除
       */
      this.modal_loading = true;
      this.modal_loading = false;
      this.modal2 = false;
      this.modal2 === false
        ? this.delete(this.commentId, this.commentTime)
        : this.$Message.error("获取删除信息失败，原因未知");
      this.getCommentList();
      setTimeout(() => {
        this.error === 0
          ? this.$Message.success({
              content: "通知：成功删除评论！",
              duration: 6
            })
          : this.$Message.error("删除失败，原因未知");
      }, 1500);
    },
    search() {
      // console.log(this.searchArticle);
      if(this.searchArticle == ''){
        this.getCommentList();
      }
      this.$axios.get('/comment/searchCommentList?searcharticle='+this.searchArticle).then((res) => {
        if(res.status == 200&& res.data.error == 0){
          console.log(11)
          if(res.data.sclist.length != 0){
            this.commentTable = res.data.sclist;
            this.commentCount = res.data.count;
            this.commentempty = false
          } else {
            this.commentTable = [];
            this.commentCount = 0;
            this.commentempty = true
          }
        }
      })
      // console.log(result.data)
      // if(data.error == 0){
      //   this.commentTable = result.data.sclist;
      //   this.commentCount = result.data.count;
      //   console.log(123)
      // } else {
      //   return
      // }
    },
    commentPage(page) {
      this.page = page;
      this.getCommentList();
    }
  }
};
</script>
<style lang="less" scope>
.container {
  margin: 50px;
  p {
    color: #41b883;
    font-size: 14px;
  }
}

.ivu-table-cell span {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.commentcard {
  margin-bottom: 20px;
}
.commentPage {
  margin: 20px;
  float: right;
}
.emptycomment {
  color: red;
  text-align: center;
  display: block;
  font-size: 24px;
}
.el-tag--success {
  width: 50px;
  float: left;
}
</style>