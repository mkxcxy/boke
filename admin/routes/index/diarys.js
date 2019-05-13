const diaryListModel = require('./../../models/getDiarys');

let getDiarys = async (ctx, next) => {
    let page=ctx.request.body.page-1 | 0;

    const list = await diaryListModel.find()
        .limit(10)
        .skip(10 * page);
    // returnValue.data = list;

    let number = 1;
    let count = await diaryListModel.count({}, (error, count) => {
        number = count;
    })
    ctx.body = {
        code: 200,
        message: '查询日记成功',
        data: list,
        totalNumber: number
    };
}

module.exports = {
    getDiarys
}

