const mongoose = require('mongoose');
const db = require("./db");

let navbarSchema = new mongoose.Schema({
    name: String,
    link: String,
    type: Boolean,
    index:String,
    typelist:Array
},{
    versionKey: false
})

let navbarModel=db.model('navbarInfo',navbarSchema,'navbarInfo');
module.exports= navbarModel;
