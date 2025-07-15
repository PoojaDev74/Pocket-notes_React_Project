const Notes = require("../models/notesModel");
const Groups = require("../models/groupModel");

//Get notes by ID

const getNotesByGroup = async(req,res)=>{
    const {groupId} = req.query;
    try{
        const NoteData = await Notes.find({groupId}).sort({createdAt: -1});
        res.status(200).json(NoteData);
        }catch(err){
        res.status(400).json({Error: err.message});
        }
}

//Post Notes Data
const createNotes = async(req,res)=>{
    const {info, groupId} = req.body;
    try{
        const newNote = new Notes({info, groupId});
        const note = await newNote.save();
        res.status(200).json(note);
    }catch (err){
        res.status(400).json({Error: err.message});

    }
}

//Get Group data
const getGroups = async(req,res)=>{
    try{
const GroupData  = await Groups.find().sort({ createdAt: -1 });
res.status(200).json(GroupData)
    }catch(err){
        res.status(400).json({Error: err.message});
    }
}

//Post group Data

const createGroup = async(req,res)=>{
    const {name, color} = req.body;
    if(!name || name.length <2){
        return res.status(400).json({Error:" Group name must at least 2 characters."});
    }
    try{
const savedGroup = await Groups.findOne({name});
if(savedGroup){
    return res.status(400).json({error: "Group name already exists"});
}
const newGroup = new Groups({name, color});
const group = await newGroup.save();
res.status(201).json(group);

    }catch(err){
        res.status(400).json({Error: err.message});
    }
}


//Delete Data
const deleteGroup = async(req,res)=>{
    const {id} = req.params;
    console.log("Backend received req.params:", req.params);
  console.log("Backend received ID (req.params.id):", id);
    try{
const deleteGroup =await Groups.findByIdAndDelete(id);
if(!deleteGroup){
    res.status(404).json({ error: "Group not found." });
}
await Notes.deleteMany({ groupId: id });
res.status(200).json({ message: "Group deleted successfully." });
    }catch(err){
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getNotesByGroup,
    createNotes,
    getGroups,
    createGroup,
    deleteGroup,
}