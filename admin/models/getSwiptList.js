const mongoose = require("mongoose");
const db = require('./db.js');

let swiptSchema = new mongoose.Schema({
    name:String,
    index:Number,
    url:String,
    imageURL:String,
    meta:{
        createAt:Date,
        updataAt:Date
    }
},{
    versionKey: false
})

let swiptModel = db.model('swipt', swiptSchema, 'swiptList');
module.exports = swiptModel;
