const navbarModel = require('./../../models/getNavbarInfo');
const typeModel = require('./../../models/getTypeList');
const {getPermissions} = require('./../../config/configuration')

let deleteNavbar = async (ctx, next) => {
    getPermissions(ctx);
    if (!ctx.body) {
        await navbarModel.deleteOne(ctx.request.body, () => {
        })
        ctx.body = {
            code: 200,
            message: '删除路由成功',
            data: null
        }
    }
}

let postNavbar = async (ctx, next) => {
    getPermissions(ctx);
    if (!ctx.body) {
        let body = ctx.request.body;
        if (body.name) {
            navbarModel.create(body, (error, docs) => {
            });
            ctx.body = {
                code: 200,
                message: '新增轮播成功',
                data: null
            };
        }
    }
}

let putNavbar=async (ctx, next) => {
    getPermissions(ctx);
    if (!ctx.body) {
        let {name, index, url, typelist,link} = ctx.request.body;
        await navbarModel.update(
            {_id: ctx.request.body._id},
            {
                name: name,
                link: link || '/',
                url: url,
                typelist: typelist || [''],
                index:index
            }, {multi: false}, () => {
            })
        ctx.body = {
            code: 200,
            message: '修改成功',
            data: null
        }
    }
}

let getNavbar=async (ctx,next)=>{
    const list = await navbarModel.find()
        .populate({
            path: 'typelist',
            model: typeModel,
            select: 'name color'
        }).sort({'index': 1})
    ;
    ctx.body = {
        code:200,
        message:'查询成功',
        data:list
    };
}

module.exports = {
    postNavbar,
    deleteNavbar,
    putNavbar,
    getNavbar
}

