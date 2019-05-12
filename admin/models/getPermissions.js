const mongoose = require("mongoose");
const db = require("./db.js");

let permissionsSchema = new mongoose.Schema({
    name:String
},{
    versionKey: false
})

let permissionsModel = db.model('permissions', permissionsSchema, 'permissions');

module.exports = permissionsModel
