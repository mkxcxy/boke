const mongoose = require('mongoose');
const db = require('./db.js');

let userInfoShcema = new mongoose.Schema({
    userName: String,
    introduce: String,//介绍
    userImage: String,
    praise: String,//点赞数q
    createTime: Date,
    articleNumber: Number,//文章数量
    password:String,
    permissions:String,
    sex:Boolean,
    email:String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updataAt:{
            type:Date,
            default:Date.now()
        }
    },
},{
    versionKey: false
})

let userInfoModel = db.model('userInfo', userInfoShcema,'users')

module.exports = userInfoModel;

