const friendshipLinkModel = require('./../../models/getFriendshipLink');
const commmentListModel = require('./../../models/getComments');
const userInfoModel = require('./../../models/getUserInfo');
const newListModel = require('./../../models/getNewList');
const {getPermissions} = require('./../../config/configuration')

let getComments = async (ctx, next) => {
    let id = ctx.request.query.id || '';
    let page = ctx.request.query.page - 1 || 0;


    const list = await commmentListModel.find()
        .populate({
            path: 'replyList',
            model: commmentListModel,
        })
        .populate({
            path: 'userData',
            model: userInfoModel,
            select: 'userName sex userImage'
        })
        .sort({"meta.updataAt": -1})
        .limit(10)
        .skip(10 * page);
    // returnValue.data = list;

    let number = 1;
    let count = await commmentListModel.count({}, (error, count) => {
        number = count;
    })
    ctx.body = {
        code: 200,
        message: '查询评论成功',
        data: list,
        totalNumber: number
    };
}

let deleteComments = async (ctx, next) => {
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

let postComments = async (ctx, next) => {
    let Value = ctx.request.body
    let {newId, userName, content, email} = Value;
    if (newId && content && userName && email) {
        let list = await userInfoModel.findOne({email: email});

        if (!list) {
            await userInfoModel.create({
                email: Value.email,
                userName: Value.userName,
                userImage: 'http://localhost:3001/images/default.jpg',
                sex: Value.sex,
                permissions: '5c9c6537820f332494e0e57d',
                password: 1234
            }, async (error, docs) => {
                await commmentListModel.create({
                    content: Value.content,
                    newId: Value.newId,
                    userData: docs._id
                }, (error, d) => {
                    newListModel.update(
                        {_id: Value.newId},
                        {
                            $push: {
                                commentList: d._id
                            }
                        }, {multi: false}, () => {
                        })
                })
            })


        } else {
            await commmentListModel.create({
                content: Value.content,
                newId: Value.newId,
                userData: list._id
            }, (error, docs) => {
                newListModel.update(
                    {_id: Value.newId},
                    {
                        $push: {
                            commentList: docs._id
                        },
                    }, {multi: false}, () => {
                    })
            })
        }

        // await commmentListModel.create(body, (error, docs) => {
        //     if (ctx.request.body.replyId) {
        //         newListModel.update(
        //             {_id: ctx.request.body.replyId},
        //             {
        //                 meta: {
        //                     createAt: meta.createAt || new Date(),
        //                     updataAt: new Date()
        //                 },
        //                 $push: {
        //                     replyList: docs._id
        //                 }
        //             }, {multi: false}, () => {
        //             })
        //     } else {
        //         newListModel.update(
        //             {_id: ctx.request.body.newId},
        //             {
        //                 $push: {
        //                     commentList: docs._id
        //                 }
        //             }, {multi: false}, () => {
        //             })
        //     }
        // });
        ctx.body = {
            code: 200,
            message: '添加成功',
            data: null
        }
    } else {
        ctx.body = {
            code: -500,
            message: '参数错误',
            data: null
        }
    }
}

let putComments = async (ctx, next) => {
    getPermissions(ctx);
    if (!ctx.body) {
        // let meta=ctx.body.meta;
        // console.log(meta)
        // console.log(ctx.request.body.show)
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
    getComments,
    postComments,
    deleteComments,
    putComments,
}

