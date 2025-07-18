const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
  info:{
        type:String,
        required: true,
    },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Groups",
    required: true
  }, 
  userId: {
    type: String,
    required: true
  },
  
},{timestamps:true});

const Notes = new mongoose.model("Notes", NoteSchema);

module.exports = Notes;
