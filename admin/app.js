const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const logger = require('koa-logger')

const koaBody = require('koa-body');

const path=require('path');


const getUploadDirName=require('./config/uploadConfig/getUploadDirName')
const checkDirExist=require('./config/uploadConfig/checkDirExist')
const getUploadFileExt=require('./config/uploadConfig/getUploadFileExt');
const getUploadFileName=require('./config/uploadConfig/getUploadFileName');
const {jwtKey}=require('./config/configuration')

app.use(koaBody({
  multipart:true,
  // encoding:'gzip',
  strict  : false,
  formidable:{
    uploadDir:path.join(__dirname,'public/upload'),
    keepExtensions: true,
    maxFieldsSize:2 * 1024 * 1024,
    onFileBegin: (name, file) => {
      // console.log(file);
      // 获取文件后缀
      const ext = getUploadFileExt(file.name);
      // 最终要保存到的文件夹目录
      const dirName = getUploadDirName();

      const dir = path.join(__dirname, `public/upload/${dirName}`);
      // 检查文件夹是否存在如果不存在则新建文件夹
      checkDirExist(dir);
      // 获取文件名称
      const fileName = getUploadFileName(ext);
      // 重新覆盖 file.path 属性
      file.path = `${dir}/${fileName}`;
      app.context.uploadpath = app.context.uploadpath ? app.context.uploadpath : {};
      app.context.uploadpath[name] = `${dirName}/${fileName}`;
    },
    onError:(err)=>{
      console.log(err);
    }
  }
}));

//jwt验证

const koajwt = require('koa-jwt');


app.use((ctx, next) => {
  return next().catch((err) => {
    if(err.status === 401){
      ctx.status = 401;
      ctx.body = '您访问的路径存在问题哦';
    }else{
      throw err;
    }
  })
})

app.use(koajwt({
  secret: jwtKey
}).unless({
  path: [/^\/users/,/^\/login/,/^\/index/,/^\/permissions/,/^\/upload/,/^\/images/]
}));

//路由管理
const index = require('./routes/index')
const users = require('./routes/users')
const login = require('./routes/login')

// error handler
onerror(app)

// middlewares
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(login.routes(), login.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
