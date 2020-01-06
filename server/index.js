const Koa = require('koa')
const consola = require('consola')
const {
  Nuxt,
  Builder
} = require('nuxt')
var bodyParser = require('koa-bodyparser');
import mongoose from 'mongoose'
import session from 'koa-generic-session'
import Redis from 'koa-redis'
import json from 'koa-json'
import dbConfig from './dbs/config'
import Blog from './interface/blog'
import Comment from './interface/comment'
import BlogUser from './interface/bloguser'
import passport from './interface/utils/passport'
const app = new Koa()
app.use(bodyParser());
// 连接数据库
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

app.keys = ['mt', 'keyskeys']
app.proxy = true
app.use(session({
  key: 'mt',
  prefix: 'mt:uid',
  store: new Redis()
}))
// app.use(bodyParser({
//   extendTypes: ['json', 'form', 'text']
// }))
app.use(json())
app.use(passport.initialize())
app.use(passport.session())

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)
  // port = 
  const {
    host = process.env.HOST || '127.0.0.1',
      port = process.env.PORT || 3001
  } = nuxt.options.server

  // console.log(nuxt.options.server);

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(Blog.routes()).use(Blog.allowedMethods())
  app.use(Comment.routes()).use(Comment.allowedMethods())
  app.use(BlogUser.routes()).use(BlogUser.allowedMethods())

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })


 


  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
