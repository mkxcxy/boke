const mongoose = require("mongoose");
const db = require("./db.js");

let commonentSchema = new mongoose.Schema({
    date: Date,
    commentNum: Number,
    views: Number,//浏览量
    likeNum: Number,//点赞数
    replyType:Boolean,//评论类型
    newType:String,
    typeList: {
        type: Array,
        required: true
    },
    userData:String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        undataAt: {
            type: Date,
            default: Date.now()
        }
    },
    content:String,
    replyName:String,
    newId:String
},{
    versionKey: false
})

let commmentListModel = db.model('comments', commonentSchema, 'comments');

module.exports = commmentListModel;
