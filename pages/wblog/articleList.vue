<template>
    <div class="container">

        <!-- 搜索框 -->
        <Input search enter-button placeholder="输入关键词搜索文章。。。" class="searchArticle" v-model="searchStr" @on-search="searchArticle"/>


        <!-- 前端文章 -->
        <Row type="flex" justify="space-between" class="frontlist">
        <Col :span="23" >
            <h2>前端文章：</h2>
            <Table border stripe :loading="frontloading" :columns="columns12" :data="front" no-data-text="没有数据">
                <template slot-scope="{ row }" slot="title">
                    <div class="title">
                        <i-button type="success">前端文章</i-button>
                        <span class="t">{{ row.title }}</span>
                    </div>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="update(row)">修改</Button>
                    <Button type="error" size="small" @click="remove(index,'front')">删除</Button>
                </template>
            </Table>
            <div class="pagination" v-show="frontCount !== 0">
                <Page :total="frontCount" :page-size="5" show-total show-elevator @on-change="frontPage"/>
            </div>
        </Col>
        </Row>


        <!-- 后端文章 -->
        <Row type="flex" justify="space-between" class="backlist">
        <Col :span="23" >
            <h2>后端文章：</h2>
            <Table border stripe :loading="backloading" :columns="columns12" :data="back" no-data-text="没有数据">
                <template slot-scope="{ row }" slot="title">
                    <div class="title">
                        <i-button type="warning">后端文章</i-button>
                        <span class="t">{{ row.title }}</span>
                    </div>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="update(row)">修改</Button>
                    <Button type="error" size="small" @click="remove(index,'back')">删除</Button>
                </template>
            </Table>
            <div class="pagination" v-show="backCount !== 0">
                <Page :total="backCount" :page-size="5" show-total show-elevator @on-change="backPage"/>
            </div>
        </Col>
        </Row>

        <!-- 封装模态框 -->
        <Modal v-model="modal2" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除文章提醒</span>
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
    layout:'wblog',
    data() {
        return {
            searchStr:'',
            backCount: 0,
            frontCount: 0,
            modal2: false,
            modal_loading: false,
            frontloading: false,
            backloading: false,
            id: '',
            list: '',
            columns12: [
                {
                    title: '文章标题',
                    slot: 'title'
                },
                {
                    title: '文章简介',
                    key: 'des'
                },
                {
                    title: 'Id',
                    key: '_id'
                },
                {
                    title: '发布时间',
                    key: 'time',
                    sortable: true
                },
                {
                    title: 'Action',
                    slot: 'action',
                    // width: 130,
                    align: 'center'
                }
            ],
            front: [],
            back:[]
        }
    },
    created () {
        // 初始化
        this.initFront(1)
        this.initBack(1)
     },
    methods: {
        update (row) {
        this.$router.push('/wblog/updateArticle?id='+ row._id)
        },
        remove (id, list) {
        /*
        * 此方法用于打开对话框。赋值文章id和分类
        */
        
        this.modal2 = true
        if(list == 'front'){
            this.id = this.front[id]._id;
        } else if(list == 'back'){
            this.id = this.back[id]._id;
        }
        this.list = list
        console.log(this.id)
        console.log(this.list)
        },
        async initFront (page) {
        try {
            this.frontloading = true;
            let {data: {count, front}} = await this.$axios.get('/article/frontList', {params: {page, pagesize: 5,author:this.$store.state.username}})
            this.front = front
            // console.log(front)
            // console.log(123)
            this.frontCount = count
            this.frontloading = false;

        } catch (error) {
            this.$Message.error('错误', `${error}`, false)
        }
        },
        async initBack (page) {
        try {
            this.backloading = true;
            let {data: {count, back}} = await this.$axios.get('/article/backList', {params: {page, pagesize: 5,author:this.$store.state.username}})
            this.back = back
            this.backCount = count
            this.backloading = false;
        } catch (error) {
            this.$Message.error('错误', `${error}`, false)
        }
        },
        frontPage (index) {
        // 分页
        this.initFront(index)
        },
        backPage (index) {
        this.initBack(index)
        },
        delete (id, list) {
        let json = {id, list}
        this.$axios.post('/article/delArticle', json).then(res => {
            let {del, ok} = res.data
            this.del = del
            this.ok = ok
        })
        },
        dele () {
            /*
            *真正删除数据。异步使用延迟删除
            */
            this.modal_loading = true
            this.modal_loading = false
            this.modal2 = false
            this.modal2 === false ? this.delete(this.id, this.list) : this.$Message.error('获取删除信息失败，原因未知')
            setTimeout(() => {
                this.ok === 1 ? this.$Message.success({content: '通知：成功删除文章！', duration: 6}) : this.$Message.error('删除失败，原因未知')
                this.initFront(1)
                this.initBack(1)
            }, 1500)
        },
        searchArticle() {
            this.frontloading = true;
            this.backloading = true;
            if(this.searchStr == ''){
                this.initFront(1)
                this.initBack(1)
                return
            } else {
            let json = {author:this.$store.state.username,searcharticle:this.searchStr};
            this.$axios.get('/article/searchFrontArticleListByAuthor',{params:json}).then((res) => {
                if(res.status == 200 && res.data.error == 0){
                    this.front = res.data.list
                    // console.log(front)
                    // console.log(123)
                    this.frontCount = res.data.count
                    this.frontloading = false;
                }
            })
            this.$axios.get('/article/searchBackArticleListByAuthor',{params:json}).then((res) => {
                if(res.status == 200 && res.data.error == 0){
                    this.back = res.data.list
                    this.backCount = res.data.count
                    this.backloading = false;
                }
            })}
        }
    }

}
</script>
<style lang="less" scope>
    .container {
        margin: 10px 50px;
        .searchArticle {
            width: 450px;
            margin: 0 auto;
        }
        span {
            font-size: 12px;
        }
        .pagination {
            float: right;
            margin-top:20px; 
        }
        .title button{
            float: left;
            font-size: 8px;
            // display: inline;
            margin-top: 9px;

        }
        .title > span{
            text-align: left;
            line-height: 48px;
            padding-left: 2px;
        }
        .backlist {
            margin-top: 300px;
        }
    }
</style>