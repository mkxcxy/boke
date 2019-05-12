const mongoose = require('mongoose');
const db = require('./db');

let friendshipLinkSchema = new mongoose.Schema({
    userData: String,
    link: String,
    name: String,
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
    show:Boolean
},{
    versionKey: false
})

let friendshipLinkModel = db.model('friendshipLiink', friendshipLinkSchema, 'friendshipLink');
module.exports = friendshipLinkModel;
