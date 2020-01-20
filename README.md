n年前的项目，改了改给客户用，丢人，过段时间重写去



项目运行：

admin文件夹为koa2代码，后台项目，启动方式：

npm install 
npm run dev 

adminUI 文件夹下位cli3与elementUI搭建的后台管理系统，前置运行条件：

先让admin文件依赖下载完毕并运行，命令行提示数据库连接成功
然后运行

npm install
npm run dev

如果是后台则需要运行

npm install 
npm run build

然后在后台里面拿static文件夹下文件进行部署

xianyu文件夹为前端文件 由nuxt配合vuetify框架搭建

运行条件：需要运行admin然后执行

npm install 安装依赖

如果是运行到本地则可以执行

npm run dev

如果是运行到后台则需要

npm run build
npm run start 

在后台3000端口运行，需要Nginx进行重定向
