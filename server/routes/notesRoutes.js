const express = require("express");

const Notes = require("../models/notesModel");
const Group = require("../models/groupModel");

const router = express.Router();

//Require Controller
const {getNotesByGroup,createNotes ,getGroups,createGroup}=  require("../controllers/notesController")

//GET Note Data by groupId
router.get("/group", getNotesByGroup );

//Post Note Data
router.post("/notes", createNotes);


//GET Group Data
router.get("/groups", getGroups)

//Post Group Data
router.post("/groups", createGroup)

module.exports = router;
