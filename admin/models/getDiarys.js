const mongoose = require("mongoose");
const db = require("./db.js");

let diaryListSchema = new mongoose.Schema({
    title: String,
    content: String,
    commentList: String
},{
    versionKey: false
})

let diaryListModel = db.model('diarys', diaryListSchema, 'diarys');

module.exports = diaryListModel;
