const userInfoModel = require('./../../models/getUserInfo');
const permissionsModel = require('./../../models/getPermissions');
const typeModel= require('./../../models/getTypeList');
const {getPermissions} = require('./../../config/configuration')

let getUser = async (ctx, next) => {
    getPermissions(ctx);
    if (!ctx.body) {
        // console.log(ctx.request.query.name)
        let name = ctx.request.query.name || '';
        let page = ctx.request.query.page - 1 || 0;
        let list = await userInfoModel.find({userName: {$regex: name}})
            .populate({
                path: 'permissions',
                model: permissionsModel,
                select: 'name'
            })
            .limit(10)
            .skip(10 * page);
        let number = 0;
        let count = await userInfoModel.count({userName: {$regex: name}}, (error, count) => {
            // if(err) next(err);
            // res.render('articleList.art', { title: '文章列表', articles: data, count } );
            // console.log(count)
            number = count;
        })
        ctx.body = {
            code: 200,
            message: '查询成功',
            data: list,
            totalNumber: number
        };
    }
}

let deleteUser = async (ctx, next) => {
    getPermissions(ctx);
    if (!ctx.body) {
        let list = await userInfoModel.find({'_id': ctx.request.body._id})
            .populate({
                path: 'permissions',
                model: permissionsModel,
                select: 'name'
            })
        if (list[0].permissions.name == '普通用户') {
            userInfoModel.remove(ctx.request.body, () => {

            })
            ctx.body = {
                code: 200,
                message: '删除成功',
                data: null
            }
        } else if (list[0].permissions.name == '管理员') {
            ctx.body = {
                code: -500,
                message: '您无权删除管理员',
                data: null
            }
        }
    }
}

let postUser = async (ctx, next) => {
    getPermissions(ctx);
    if (!ctx.body) {
        let list = await userInfoModel.find({"userName": ctx.request.body.userName});
        if (list.length == 0) {
            let body = ctx.request.body;

            if (body.userName && body.password && body.permissions) {
                body.meta = {
                    createAt: new Date(),
                    updataAt: new Date()
                }
                userInfoModel.create(body, (error, docs) => {
                });
                ctx.body = {
                    code: 200,
                    message: '新增用户成功',
                    data: null
                };
            } else {
                ctx.body = {
                    code: -505,
                    message: '参数缺失',
                    data: null
                };
            }
        } else {
            ctx.body = {
                code: -504,
                message: '用户名重复',
                data: null
            };
        }
    }
}

let putUser=async (ctx, next) => {
    getPermissions(ctx);
    if (!ctx.body) {
        let {userName, sex, password, userImage, permissions, meta} = ctx.request.body;
        await typeModel.update(
            {_id: ctx.request.body._id},
            {
                userName: userName,
                sex: sex || false,
                userImage: userImage || "http://localhost:3001/images/default.jpg",
                meta: {
                    createAt: meta.createAt || new Date(),
                    updataAt: new Date()
                },
                permissions: permissions,
                password: password || '1234'
            }, {multi: false}, () => {
            })
        ctx.body = {
            code: 200,
            message: '修改用户成功',
            data: null
        }
    }
}

module.exports = {
    getUser,
    postUser,
    deleteUser,
    putUser
}

