import Router from 'koa-router';
import axios from './utils/axios'
import frontArticle from '../dbs/model/frontArticleSchema'
import comment from '../dbs/model/commentSchema'
import backArticle from '../dbs/model/backArticleSchema'

let router = new Router({
  prefix: '/article'
})


router.post('/insertArticle',async ctx => {
  try{
    let req = ctx.request.body;
    // console.log(123413);
    let {title,htmlContent,date,des,original,radio,author} = req;
    // let db = radio = 'Front' ? 'frontArticle' : 'backArticle';
    if(radio == 'Front') {
      var result = await frontArticle.create({title,content:htmlContent,time:date,des,original,list:radio,author})
    } else {
      var result = await backArticle.create({title,content:htmlContent,time:date,des,original,list:radio,author})
    }
    // console.log(db)
    // const front = await db.update({title},{$set:{title,content:htmlContent,time:date,des,original,list:radio}},{upsert:true});
    // console.log(result)
		ctx.body = {
			error:0,
			success:result
		}
	}catch(e){
		ctx.body = {
			error:1,
			info:e
		}
	}
})

router.get('/getFrontArticle', async ctx => {
  try {
    let req = ctx.request.query;
    let page = parseInt((req.page - 1) * req.pagesize);
    let pagesize = parseInt(req.pagesize);
    // console.log(page);
    let list = await frontArticle.find({},{__v:0,content:0,original:0,list:0}).skip(page).limit(pagesize).sort({
      _id: -1
    });
    let count = await frontArticle.countDocuments({});
    ctx.body = {
      error: 0,
      count,
      list
    }
  } catch (e) {
    ctx.body = {
      error: 1,
      info: e
    }
  }
})

router.get('/frontList', async ctx => {
  try{
    let req = ctx.request.query;
    let { parseInt } = Number;
    let page = parseInt((req.page-1) * req.pagesize);
    let pagesize = parseInt(req.pagesize);
    let author = req.author;
    // console.log(author)
    let front = await frontArticle.find({author:author},{__v:0,content:0,original:0}).skip(page).limit(pagesize).sort({'_id':-1});
    let frontCount = await frontArticle.countDocuments({author:author});
    ctx.body = {
        error: 0,
        count:frontCount,
        front
    }
  }catch(e){
      //handle error
      ctx.body = {error:1,info:e}
  }
})

router.get('/backList', async ctx => {
  try{
    let req = ctx.request.query;
    let { parseInt } = Number;
    let page = parseInt((req.page-1) * req.pagesize);
    let pagesize = parseInt(req.pagesize);
    let author = req.author;
    // console.log(author)
    let back = await backArticle.find({author:author},{__v:0,content:0,original:0}).skip(page).limit(pagesize).sort({'_id':-1});
    let backCount = await backArticle.countDocuments({author:author});
    ctx.body = {
        error: 0,
        count:backCount,
        back
    }
  }catch(e){
      //handle error
      ctx.body = {error:1,info:e}
  }
})

router.get('/getBackArticle', async ctx => {
  try {
    let req = ctx.request.query;
    let page = parseInt((req.page - 1) * req.pagesize);
    let pagesize = parseInt(req.pagesize);
    // console.log(page);
    let list = await backArticle.find({},{__v:0,content:0,original:0,list:0}).skip(page).limit(pagesize).sort({
      _id: -1
    });
    let count = await backArticle.countDocuments({});
    ctx.body = {
      error: 0,
      count,
      list
    }
  } catch (e) {
    ctx.body = {
      error: 1,
      info: e
    }
  }
})

router.get('/articleInfo', async ctx => {
  try {
    let req = ctx.request.query;
    let id = req.id
    // console.log(id);
    let result1 = await frontArticle.find({_id:id})
    let result2 = await backArticle.find({_id:id})
    let result = Object.assign(result1,result2)
    ctx.body = {
      error: 0,
      info:result
    }
  } catch (e) {
    ctx.body = {
      error: 1,
      info: e
    }
  }
})

router.post('/delArticle',async ctx => {
  try{
		let req = ctx.request.body;
	  let {id,list} = req;
    let db = list == 'front' ? frontArticle : backArticle;
    // console.log(db)
    let res = await db.remove({_id:id});
    let res2 = await comment.remove({id:id})
		let {n,ok} = res;
		ctx.body = {
			del:n,
			ok
		}
	}catch(e){
		ctx.body = {
			error:1,
			info:e
		};
	}
})


router.get('/updateArticle',async ctx => {
  let {id} = ctx.request.query;
    try {
        // let res = frontArticle.findByIdAndUpdate({_id:id},{$})
        let front = await frontArticle.find({
            _id: id
        });
        let back = await backArticle.find({
            _id: id
        });
        let arr = [...front, ...back];
        ctx.body = {
          arr
        };
    } catch ( e ) {
        //handle error
        ctx.body = e;
  }
})

router.post('/update',async ctx => {
  try {
    let req = ctx.request.body;
    // console.log(req)
    let {title, content, date, des, original, list, id} = req;
    // console.log(id)
    let front = await frontArticle.findByIdAndUpdate({
        _id: id
    }, {
        $set: {
            title,
            content,
            time: date,
            des,
            original,
            list
        }
    },function(err, res){
      if (err) {
        console.log("fError:" + err);
      }
      else {
          return res
      }
    });
    let back = await backArticle.findByIdAndUpdate({
        _id: id
    }, {
        $set: {
            title,
            content,
            time: date,
            des,
            original,
            list
        }
    },function(err, res){
      if (err) {
        console.log("bError:" + err);
      }
      else {
          return res
      }
    });
    // console.log(front)
    // console.log(arr)
    ctx.body = {
      error:0
      // arr
    };
  } catch ( e ) {
      ctx.body = {
        error:-1,
        e
      };
  }
})

export default router
