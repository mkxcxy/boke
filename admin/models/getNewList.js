const mongoose = require("mongoose");
const db = require("./db.js");

let newListSchema = new mongoose.Schema({
    title: String,
    image: String,
    date: Date,
    commentNum: Number,
    views: Number,//浏览量
    likeNum: Number,//点赞数,
    content:String,//浏览内容
    typeList: {
        type: Array,
        required:true
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updataAt: {
            type: Date,
            default: Date.now()
        }
    },
    readingNumber:Number,
    commentList:Array
},{
    versionKey: false
})

let newListModel = db.model('news', newListSchema, 'news');

module.exports = newListModel
