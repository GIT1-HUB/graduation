import Router from 'koa-router';
import axios from './utils/axios'
import frontarticle from '../dbs/model/frontArticleSchema'
import backArticle from '../dbs/model/backArticleSchema'
import comment from '../dbs/model/commentSchema'
import config from '../dbs/model/commentConfigSchema'



let router = new Router({
  prefix: '/comment'
})

const getUserIp = (req) => {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}

router.post('/insertComment', async (ctx) => {
    try {
        let req = ctx.request.body;
        let result = {};
        // console.log(req.id)
        let result1 = await frontarticle.findOne({
            "_id": req.id
        })
        let result2 = await backArticle.findOne({
            "_id": req.id
        })
        if (result1 == null) {
            result = result2
        } else {
            result = result1;
        }
        
        let json = Object.assign(req.comment, {
            ip: getUserIp(ctx.req)
        })
        
        

        let id = result._id;
        let title = result.title;
        let author = result.author;
        // console.log(id)
        // console.log(title)
        // console.log(2111111111111)
        let result3 = await comment.updateOne({
            id: id,
            title: title,
            author:author
        }, {
            $push: {
                comment: json
            }
        }, {
            upsert: true
        })
        ctx.body = {
            status: '0',
            success: 1,
            result3
        }
    } catch (error) {
        ctx.body = {
            status: '1',
            info: error
        }
    }
    


//   try {
//     let req = ctx.request.query;
//     let page = parseInt((req.page - 1) * req.pagesize);
//     let pagesize = parseInt(req.pagesize);
//     console.log(page);
//     let list = await frontArticle.find({},{__v:0,content:0,original:0,list:0}).skip(page).limit(pagesize).sort({
//       _id: -1
//     });
//     let count = await frontArticle.countDocuments({});
//     ctx.body = {
//       error: 0,
//       count,
//       list
//     }
//   } catch (e) {
//     ctx.body = {
//       error: 1,
//       info: e
//     }
//   }
})

router.post('/commentsList', async ctx => {
    try {
        let req = ctx.request.body;
        let {parseInt} = Number;
        let page = parseInt((req.page - 1) * req.pagesize);
        let pageSize = parseInt(req.pagesize);
        let author = req.author;

        console.log(author)
        // console.log(pageSize)
        let result = await comment.find({author:author}, {
            __v: 0,
            _id: 0
        }).skip(page).limit(pageSize)
        // let count = await comment.count({})
        let count = await comment.countDocuments({});
        ctx.body = {
            error: 0,
            result,
            count
        }
    } catch ( error ) {
        ctx.body = error
    }
})

router.get('/searchCommentList', async ctx =>{
    try {
        let searcharticle = ctx.request.query.searcharticle;
        // console.log(searcharticle);
        let strReg = eval('/' + searcharticle +'/');
        // console.log(strReg);
        let sclist = await comment.find({title:strReg});
        ctx.body ={
            error:0,
            sclist,
            count:sclist.length
        }
    } catch (error) {
        ctx.body = error
    }
})

// router.get('/searchCommentsList', async ctx => {
//     try {
//         let request = ctx.request.query;
//         // console.log(ctx) title:request.searcharticle
//         let str = '/'+request.searcharticle+'/i';
//         console.log(str)    
//         let sclist = await comment.find({},{
//             __v: 0,
//             _id: 0
//         })
//         let searchlistcount = sclist.result.length;
//         ctx.body = {
//             error: 0,
//             sclist,
//             searchlistcount
//         }
//     } catch ( error ) {
//         ctx.body = error
//     }
// })

// router.post('/commentsList',async (ctx) => {
//     try {
//         let request = ctx.request.body;
//         let [result] = await comment.find({}, {
//             __v: 0,
//             _id: 0
//         })
//         ctx.body = {
//             error: 0,
//             result,
//             count: result.length
//         }
//     } catch ( error ) {
//         ctx.body = error
//     }
// })

router.post('/articleComments',async ctx => {
    try {
        let request = ctx.request.body;
        let [result] = await comment.find({
            "id": request.id
        }, {
            __v: 0,
            _id: 0
        })
        ctx.body = {
            error: 0,
            result,
            count: result.comment.length
        }
    } catch ( error ) {
        ctx.body = error
    }
})

router.get('/getConfig',async ctx => {
    try {
        let request = ctx.request.query;
        let author = request.author;
        let result = await config.find({author:author}, {
            _id: 0,
            __v: 0
        })
        ctx.body = {
            error: 0,
            data: result
        }
    } catch ( error ) {
        ctx.body = {
            error: 1,
            data: error
        }
    }
})

router.get('/setConfig',async ctx => {
    try {
        let req = ctx.request.query;
        let author = req.author;
        let status = req.status;
        // console.log(ctx.req.body)
        // console.log(author)
        // console.log(status)
        let result = await config.updateOne({author:author}, {
           status:status
        },{upsert:true})
        ctx.body = {
            error: 0,
            data: result
        }
    } catch ( error ) {
        ctx.body = {
            error: 1,
            data: error
        }
    }
})

router.post('/delComment',async ctx => {
    try {
        let request = ctx.request.body
        let {parseInt} = Number;
        let result = await comment.updateOne({
            "id": request.id
        }, {
            $pull: {
                comment: {
                    time: parseInt(request.time)
                }
            }
        })
        let check = await comment.findOne({'id':request.id});
        if (check.comment.length == 0) {
            await comment.remove({id:request.id},function(err,res){
                if (err) {
                    console.log('服务器出错')
                } else {
                    console.log('perfect')
                }
            })
        }
        ctx.body = {
            error: 0,
            delCount: result.nModified,
        }
    } catch ( error ) {
        ctx.body = {
            error: 1,
            data: error
        }
    }
})

export default router
