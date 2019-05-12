const {getPermissions,uploadUrl} = require('./../../config/configuration')

let getImage=async (ctx, next) => {
    getPermissions(ctx);
    if (!ctx.body) {
        ctx.body = {
            code: 200,
            message: '图片上传成功',
            data: {
                url: `${uploadUrl}${ctx.uploadpath.file}`
            }
        }
    }
}

module.exports={
    getImage
}
