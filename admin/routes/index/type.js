const typeModel = require('./../../models/getTypeList');
const {getPermissions} = require('./../../config/configuration')

let getType = async (ctx, next) => {
    let list=await typeModel.find();
    // let count = await typeModel.count(sql, (error, count) => {
    //     number = count;
    // })
    ctx.body={
        code:200,
        message:'成功',
        data:list
    }
    // let name = ctx.request.query.name || '';
    // let page = ctx.request.query.page - 1 || 0;
    // let id=ctx.request.query.type;
    // // let type=ctx.request.query.type;
    // // let sql='';
    // // if (type!=''){
    // //     //     sql={name: {$regex: name},_id:type}
    // //     // }else{
    // //     //     sql={name: {$regex: name}}
    // //     // }
    // let sql='';
    // if (name){
    //     // sql={name: {$regex: name}};
    // }
    // // if (id){
    // //     sql={_id:id}
    // // }
    //
    // let list = await typeModel.find(sql)
    //     .limit(10)
    //     .skip(10 * page);
    // let number = 0;
    // let count = await typeModel.count(sql, (error, count) => {
    //     number = count;
    // })
    // ctx.body = {
    //     code: 200,
    //     message: '查询成功',
    //     data: list,
    //     totalNumber: number
    // };
}

let deleteType = async (ctx, next) => {
    getPermissions(ctx);
    if (!ctx.body) {
        await typeModel.remove(ctx.request.body, () => {
        })
        ctx.body = {
            code: 200,
            message: '删除成功',
            data: null
        }
    }
}

let postType =  async (ctx, next) => {
    getPermissions(ctx);
    if (!ctx.body) {
        let list = await typeModel.find({"name": ctx.request.body.name});
        if (list.length == 0) {
            let body = ctx.request.body;

            if (body.name) {
                let {color, name} = body;
                let value = {
                    color: color || 'black',
                    name: name,

                }
                typeModel.create(value, (error, docs) => {
                });
                ctx.body = {
                    code: 200,
                    message: '新增类别成功',
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

let putType =  async (ctx, next) => {
    getPermissions(ctx);
    if (!ctx.body) {
        let {name, color, meta} = ctx.request.body;
        await typeModel.update(
            {_id: ctx.request.body._id},
            {
                name: name,
                color: color,
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
    postType,
    deleteType,
    putType,
    getType
}

