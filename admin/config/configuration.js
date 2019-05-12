const jwt=require('jsonwebtoken')

//成功格式
const returnValue = {
    code: 200,
    message: '查询成功',
    data: {}
}

//参数有误格式
const returnError={
    code:-403,
    message: '您的提交参数有误请检查重新提交'
}


const jwtKey='Liyu_token'

//主页面get请求路径
const url = '/api/v1/index';
//登录路径
const loginUrl = '/api/v1/login';
const indexUrl = '/api/v1/index';
//下载路径，而后要是申请了域名则判断当前是否为生产环境
const uploadUrl='http://localhost:3001/upload/';


// 验证并解析JWT
const getJWTPayload=function (token,ctx) {
    if (typeof token=='string'){
        try {
            return jwt.verify(token.split(' ')[0],jwtKey);
        }catch (e) {
            return ctx.body={
                code:-501,
                message:'您的登录已过期，请重新登录',
                data:null
            }
        }
    }else{
        return false;
    }
}

//判断当前是否有权限
function getPermissions(ctx){
    let payload = getJWTPayload(ctx.headers.authorization,ctx);
    if (payload){
        return
    }else {
        ctx.body={
            code:-501,
            message:'请先登录本页面',
            data:null
        }
    }
}

module.exports = {
    returnValue,
    url,
    loginUrl,
    uploadUrl,
    jwtKey,
    getPermissions,
    indexUrl
}
