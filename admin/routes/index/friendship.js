const friendshipLinkModel = require('./../../models/getFriendshipLink');
const userInfoModel = require('./../../models/getUserInfo');
const {getPermissions} = require('./../../config/configuration')

let getFriendship = async (ctx, next) => {

    let name = ctx.request.query.name || '';
    let page = ctx.request.query.page - 1 || 0;
    const list = await friendshipLinkModel.find({})
        .populate({
            path: 'userData',
            model: userInfoModel,
            select: 'userName userImage Sex'
        }).sort({'meta.createAt': 1}).limit(10)
        .skip(10 * page);
    let number = 0;
    let count = await friendshipLinkModel.count({}, (error, count) => {
        number = count;
    })

    ctx.body = {
        code: 200,
        message: '查询成功',
        data: list,
        totalNumber: number
    };
}


let deleteFriendship = async (ctx, next) => {
    getPermissions(ctx);
    if (!ctx.body) {
        await friendshipLinkModel.deleteOne(ctx.request.body, () => {
        })
        ctx.body = {
            code: 200,
            message: '删除成功',
            data: null
        }
    }
}

let postFriendship = async (ctx, next) => {
    getPermissions(ctx);
    if (!ctx.body) {
        let body = ctx.request.body;
        body.meta = {
            createAt: new Date(),
            updataAt: new Date()
        }
        if (body.name) {
            friendshipLinkModel.create(body, (error, docs) => {
            });
            ctx.body = {
                code: 200,
                message: '申请友情链接成功',
                data: null
            };
        }
    }
}

let putFriendship = async (ctx, next) => {
    getPermissions(ctx);
    if (!ctx.body) {
        await friendshipLinkModel.update(
            {_id: ctx.request.body._id},
            {
                show: ctx.request.body.show,
                meta: {
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
    getFriendship,
    postFriendship,
    deleteFriendship,
    putFriendship
}

