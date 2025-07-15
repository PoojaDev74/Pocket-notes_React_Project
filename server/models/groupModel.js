const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique: true,
    },
    color:{
        type: String,
        default: '#a879ff'
    },
    createdAt :{
        type:Date,
        default: Date.now,
    },
},{timestamps:true});

const Groups = mongoose.model("Groups", groupSchema);

module.exports = Groups;