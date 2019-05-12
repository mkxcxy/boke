const router = require('koa-router')()
const jwt = require('jsonwebtoken');
const {returnValue,returnError, loginUrl, uploadUrl,jwtKey} = require('./../config/configuration');
const userInfoModel=require('./../models/getUserInfo')
const permissionsModel=require('./../models/getPermissions')

router.prefix('/login')

router.post(`${loginUrl}/`, async ctx => {
    // returnValue.data=ctx.request.body;
    // ctx.body = returnValue;
    let data = ctx.request.body;
    if (!data.userName && data.password) {
        return ctx.body=returnError
    }
    const result=await userInfoModel.find({
        userName:data.userName,
        password:data.password
    },{'comments': 0, 'password': 0, '_id': 0}).populate({
        path: 'permissions',
        model: permissionsModel,
        select: 'name'
    })
    if (result.length!=0){
        let token=jwt.sign({
            _id:result[0]._id,
            permissions:result[0].permissions.name
        },jwtKey,{ expiresIn:'2h' });
        returnValue.data=result[0];
        returnValue.token=token;
        returnValue.message='登录成功'
        return ctx.body=returnValue
    }else{
        ctx.body={
            code:401,
            message:'您输入的账号或密码有误，请重新输入',
            data:null
        }
    }

})

router.post(`${loginUrl}/uploadImage`, async ctx => {
    returnValue.data.imageUrl = `${uploadUrl}${ctx.uploadpath['image']}`;
    ctx.body = returnValue;
})


module.exports = router
