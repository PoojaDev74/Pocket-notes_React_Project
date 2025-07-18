const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
name: {
    type: String,
    required: true,
    trim: true,
  },
  color: {
    type: String,
    default: "#a879ff",
  },
  userId: {
    type: String,
    required: true,
  }
},{timestamps:true});

groupSchema.index({ name: 1, userId: 1 }, { unique: true });

const Groups = mongoose.model("Groups", groupSchema);

module.exports = Groups;
