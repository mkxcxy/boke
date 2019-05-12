const {getPermissions} = require('./../../config/configuration');
const permissionsModel = require('./../../models/getPermissions');

let getAllPermissions=async (ctx, next) => {
    getPermissions(ctx);
    if (!ctx.body) {
        let list = await permissionsModel.find()
        ctx.body = {
            code: 200,
            message: '查询成功',
            data: list
        };
    }
}

module.exports={
    getAllPermissions
}
