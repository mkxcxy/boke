const swiptModel = require('./../../models/getSwiptList');
const {getPermissions} = require('./../../config/configuration')

let getSwipt = async (ctx, error) => {
    const list = await swiptModel.find({}).sort({index: 1});
    // returnValue.data = list;
    ctx.body = {
        code: 200,
        message: "查询成功",
        data: list
    };
}

let deleteSwipt = async (ctx, next) => {
    getPermissions(ctx);
    if (!ctx.body) {
        await swiptModel.deleteOne(ctx.request.body, () => {
        })
        ctx.body = {
            code: 200,
            message: '删除成功',
            data: null
        }
    }
}

let postSwipt = async (ctx, next) => {
    getPermissions(ctx);
    if (!ctx.body) {
        let body = ctx.request.body;
        body.meta = {
            createAt: new Date(),
            updataAt: new Date()
        }
        if (body.name) {
            swiptModel.create(body, (error, docs) => {
            });
            ctx.body = {
                code: 200,
                message: '申请友情链接成功',
                data: null
            };
        }
    }
}

let putSwipt = async (ctx, next) => {
    getPermissions(ctx);
    if (!ctx.body) {
        let {name, imageURL, index, url, meta} = ctx.request.body;
        await swiptModel.update(
            {_id: ctx.request.body._id},
            {
                name: name,
                index: index,
                url: url,
                imageURL: imageURL || 'http://localhost:3001/images/default.jpg',
                meta: {
                    createAt: meta.createAt,
                    updataAt: new Date()
                }
            }, {multi: false}, () => {
            })
        ctx.body = {
            code: 200,
            message: '修改成功',
            data: null
        }
    }
}

module.exports = {
    postSwipt,
    deleteSwipt,
    putSwipt,
    getSwipt
}

