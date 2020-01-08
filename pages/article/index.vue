<template>
    <div class="comment">
        <nav-header />
        
        <!-- 顶部标题 -->
        <el-row type="flex" justify="center">
            <el-col :span="14" class="detail_title">
                <div>{{title}}</div>
                <span class="articleAuthor">作者：{{author}}</span>
                <div class="time">发布时间：{{time}}&nbsp;&nbsp;&nbsp;&nbsp;分类：{{list === 'Front' ? '前端文章' : '后端文章'}}</div>
            </el-col>
        </el-row>

        <!-- 文章 -->
        <el-row type="flex" justify="center">
            <el-col :span="14" class="detail_content">
                <div v-show="!content">暂无文章数据...</div>
                <div v-html="content" class="md markdown-body"></div>
            </el-col>
        </el-row>


        <el-row type="flex" justify="center">
            <el-col :span="14">
                <h2 style="color:#3D5064;border-top:1px dashed #3D5064;padding-top:15px;margin:30px 0 30px 0;">发表评论：</h2>
            </el-col>
        </el-row>
        <!-- 评论 -->
        <el-row type="flex" justify="center" v-if="commentConfig">
        <el-col :span="15" class="detail_content" style="margin-left:-63px;">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="username">
                <el-input type="text" v-model="ruleForm.username" @change="usernameChange" autocomplete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input type="text" v-model="ruleForm.email" autocomplete="off" placeholder="请输入邮箱 (不会呈现给任何人)"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <el-input type="textarea" :rows="8" v-model="ruleForm.content" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
            </el-form>
        </el-col>
        </el-row>
        <el-row type="flex" justify="center" v-else>
        <el-col :span="15" class="detail_content" style="margin-left:-63px;">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" disabled>
            <el-form-item label="姓名" prop="username">
                <el-input type="text" v-model="ruleForm.username" @change="usernameChange" autocomplete="off" placeholder="作者已关闭评论"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input type="text" v-model="ruleForm.email" autocomplete="off" placeholder="作者已关闭评论"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <el-input type="textarea" :rows="8" v-model="ruleForm.content" autocomplete="off" placeholder="作者已关闭评论"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
            </el-form>
        </el-col>
        </el-row>
       <el-row type="flex" justify="center" class="detail_content">
        <el-col :span="14">
            <el-card class="box-card" v-show="commentList.length !== 0" v-for="(item, index) in curcommentList" :key="index">
            <div slot="header" class="clearfix">
                <span style="font-weight: bold;">{{item.username}} <el-tag type="success" v-show="author == item.username">作者</el-tag> 说：</span>
                <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                <span style="float: right; padding: 3px 0;font-weight: bold;"><Time :time="item.time" :interval="1" /></span>
            </div>
            <div>
                {{item.content}}
            </div>
            </el-card>
            <el-pagination class="pagination" @current-change="pagination" background layout="prev, pager, next" :page-size="4" :total="count" v-show="count > 4"></el-pagination>
        </el-col>
        </el-row>


    </div>
</template>
<script>
import NavHeader from "~/components/NavHeader";
import Time from '~/plugins/time'

export default {
    data() {
        var checkUsername = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('用户名不能为空'));
            } else {
                callback()
            }
        };
        var validateEmail = (rule, value, callback) => {
            console.log(value)
            const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
            if (value === '') {
                callback(new Error('请输入您的邮箱'));
            } else {
                if (reg.test(value)) {
                callback()
                } else {
                callback(new Error('邮箱格式不正确'));
                }
                // callback();
            }
        };
        var validateContent = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入评论内容'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                username: '',
                email: '',
                content: ''
            },
            rules: {
                username: [
                    { validator: checkUsername, trigger: 'change' }
                ],
                email: [
                    { validator: validateEmail, trigger: 'blur' }
                ],
                content: [
                    { validator: validateContent, trigger: 'change' }
                ]
            },
            commentList: [],
            count: 0,
            author: '',
            page:1,
            pagesize:5,
            commentConfig:'true'
        }
    },
    created() {
        this.commentLists(this.$route.query.id)
        this.getCommentConfig();
    },
    methods: {
        getCommentConfig() {
            let json = {author:this.author}
		    this.$axios.get('/comment/getConfig',{params:json}).then(res => {
                this.commentConfig = res.data.data[0].status;
            });
            // console.log(result)
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let json = Object.assign({}, {comment: Object.assign(this.ruleForm, {time: new Date().getTime()}), id: this.$route.query.id})
                    this.commentsSubmit(json, formName)
                    // console.log(json)
                } else {
                    this.$notify({
                        title: '评论失败',
                        message: '请认真填写表单内容',
                        type: 'error'
                    });
                    return false;
                }
            });
        },
        async commentsSubmit(json, formName) {
            let {data} = await this.$axios.post('/comment/insertComment',json)
            console.log(data)
            if (Object.is(data.status, '0')) {
                this.$refs[formName].resetFields()
                this.$notify({
                    title: '评论成功',
                    message: '发布评论成功，请注意言论',
                    type: 'success',
                    duration:2000
                });
            this.commentLists(this.$route.query.id)
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        pagination(page) {
            console.log(page)
            this.page = page;
            console.log(this.curcommentList)
        },
        usernameChange (val) {
            // this.authorStatus = this.author.includes(val)
            // console.log(`status:${this.authorStatus}`)
        },
        async commentLists (id) {
            try {
                // console.log(id)
                let {data: {count, result}} = await this.$axios.post('/comment/articleComments', {id});
                // let {data: {data}} = await this.$axios.post('/comment/configList', {id})
                /*数组暂时倒序*/
                this.count = count
                this.commentList = result.comment.reverse()
                // this.author = data.author
            } catch (error) {
                // handle error
            }
        },
    },
    computed: {
        curcommentList: function() {
            return this.commentList.slice((this.page-1)*this.pagesize,this.pagesize*this.page)
        }
    },
    components: {
        NavHeader,
        Time
    },
    async asyncData(ctx) {
        let json = {id:ctx.query.id}
		let result = await ctx.$axios.get('/article/articleInfo',{params:json});
        let {info} = result.data;
        let {content,des,list,time,title,author} = info[0];
        if(result.status === 200 && result.data.error === 0){
		    return {title,des,content,list,time,author}
        } else{
            return{
                title:'test',
                time:'2019年10月-1',
                list:'Front',
                content:'<h1>暂无数据</h1>',
                author:'admin'
            }
        }
    }
}
</script>
<style lang="less" scope>
@color:#3D5064;
//#a8a8a8
//#F0F2F5
body,html {
	background:#fff;
	height:100%;
}
.comment {
    .detail_title {
        margin:2rem 0 2rem 0;
        font-size:31px;
        font-weight: bold;
        padding-bottom:1rem;
        color:@color;
        border-bottom:1px dashed @color;
        text-align: center;
        .time {
            // margin:1rem 0 0 0;
            font-size:12px;
            font-weight:normal;
        }
        .articleAuthor {
            font-size:16px;
            font-weight:normal;
        }
    }
    .detail_content {
        background:#fff;
        text-align:left;
        margin-bottom:5rem;
    }
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }
    .box-card {
      border:1px solid #dcdfe6 !important;
      border-radius: 5px;
      margin-bottom:1rem;
    }
    .el-card__body {
      background:rgb(248, 248, 248) !important;
    }
    .el-tag {
      padding:0 6px !important;
      height:25px !important;
      line-height: 25px !important;
    }
    /*分页*/
    .pagination {
      float:right;
      margin-top:1rem;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color:#41B883;
    }
}
</style>