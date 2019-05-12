const newListModel = require('./../../models/getNewList');
const {getPermissions} = require('./../../config/configuration')

let getNew = async (ctx, next) => {
    let page = ctx.request.query.page - 1 || 0;
    let title = ctx.request.query.title || '';
    let type = ctx.request.query.type || '';
    let sql = '';
    let typeId=ctx.request.query.type||'';
    if (ctx.request.query.id) {
        sql = {title: {$regex: title}, _id: ctx.request.query.id}
    } else {
        if (typeId.length!=0){
            sql = {title: {$regex: title}, typeList:{$in:typeId}}
        } else{
            sql = {title: {$regex: title}}
        }
    }

    let readingNumber = ctx.request.query.readingNumber;
    let commentNumber = ctx.request.query.commentNumber;
    let sort = {'meta': 1};
    if (readingNumber) {
        sort = {'readingNumber': -1};
    } else if (commentNumber) {
        sort = {'commentList': -1};
    }
    ;

    // let type=ctx.request.query.type;
    // let name=ctx.request.query.name;
    // if (name){
    //
    // }

    let list = await newListModel.find(sql)
        // .populate({
        //     path: 'typeList',
        //     model: typeModel,
        //     select: 'name'
        // })
            .sort(sort)
            .limit(10)
            .skip(10 * page)
    ;
    let number = 0;
    let count = await newListModel.count(sql, (error, count) => {
        number = count;
    })
    ctx.body = {
        code: 200,
        message: '查询成功',
        data: list,
        totalNumber: number
    };
}

let deleteNew = async (ctx, next) => {
    getPermissions(ctx);
    if (!ctx.body) {
        await newListModel.deleteOne(ctx.request.body, () => {
        })
        ctx.body = {
            code: 200,
            message: '删除文章成功',
            data: null
        }
    }
}

let putNew = async (ctx, next) => {
    getPermissions(ctx);
    if (!ctx.body) {
        // let {name, imageURL, index, url, meta} = ctx.request.body;
        await newListModel.update(
            {_id: ctx.request.body._id},
            ctx.request.body, {multi: false}, () => {
            })
        ctx.body = {
            code: 200,
            message: '修改成功',
            data: null
        }
    }
}

let postNew = async (ctx, next) => {
    getPermissions(ctx);
    if (!ctx.body) {
        let body = ctx.request.body;

        newListModel.create(body, (error, docs) => {
        });

        ctx.body = {
            code: 200,
            message: '新增文章成功',
            data: null
        };
    }
}

module.exports = {
    getNew,
    postNew,
    putNew,
    deleteNew
}

