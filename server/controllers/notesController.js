const Notes = require("../models/notesModel");
const Groups = require("../models/groupModel");

//Get notes by ID

const getNotesByGroup = async(req,res)=>{
    const {groupId, userId} = req.query;

  if (!groupId || !userId) {
    return res.status(400).json({ error: "groupId and userId are required." });
   }
  try {
    const notes = await Notes.find({ groupId, userId }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to fetch notes." });
  }
};

//Post Notes Data
const createNotes = async(req,res)=>{
    const {info, groupId, userId} = req.body;
    
    if (!info || !groupId || !userId) {
    return res.status(400).json({ error: "info, groupId, and userId are required." });
    }
  try {
    const newNote = new Notes({ info, groupId, userId });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to create note." });
  }
};

//Get Group data
const getGroups = async(req,res)=>{
 const { userId } = req.query;
  try {
    const groups = await Group.find({ userId });
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching groups' });
  }
};

//Post group Data
const createGroup = async(req,res)=>{
    const {name, color, userId} = req.body;
      if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
    }
    if(!name || name.length <2){
        return res.status(400).json({Error:" Group name must at least 2 characters."});
    }
try{
    const existingGroup = await Groups.findOne({
      name: name.trim(),
      userId,
    });

    if (existingGroup) {
      return res.status(400).json({ error: "Group name already exists for this user." });
    }
    const newGroup = new Groups({ name: name.trim(), color, userId });
    const savedGroup = await newGroup.save();

    res.status(201).json(savedGroup);
  } catch (err) {
    res.status(500).json({ error: err.message || "Something went wrong." });
  }
};

module.exports = {
    getNotesByGroup,
    createNotes,
    getGroups,
    createGroup,
}
