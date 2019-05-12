const mongoose = require("mongoose");
const db = require('./db');

let typeSchema = new mongoose.Schema({
    name: String,
    color:String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updataAt:{
            type:Date,
            default:Date.now()
        }
    }
},{
    versionKey: false
})

let typeModel = db.model('types', typeSchema, 'types');

module.exports = typeModel;
