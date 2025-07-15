const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
    info:{
        type:String,
        required: true,
    },
    groupId: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
  
},{timestamps:true});

const Notes = new mongoose.model("Notes", NoteSchema);

module.exports = Notes;