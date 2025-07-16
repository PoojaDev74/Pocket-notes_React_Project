import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios"
export const Data = createContext();

const NotesContext = ({ children }) => {
  const [notes, setNotes] = useState([]); 
  const [groups, setGroups] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null); 
  const [newGroupPopupVisible, setNewGroupPopupVisible] = useState(false);


  const getGroups = useCallback(async () => { 
    try {
      const response = await axios.get('https://pocketnotes-app-backend.onrender.com/api/groups');
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  }, []);

  useEffect(() => {
  const firstVisit = localStorage.getItem("firstVisit");

  if (!firstVisit) {
    localStorage.removeItem("groups");
    localStorage.removeItem("notes");
    localStorage.removeItem("selectedGroup");

    setGroups([]);
    setNotes([]);
    setSelectedGroup(null);

    localStorage.setItem("firstVisit", "true");
  }
  }, []);


  const createGroup = async (name,color) => {
    try {
      const response = await axios.post('https://pocketnotes-app-backend.onrender.com/api/groups', { name , color });
      getGroups(); 
      setSelectedGroup(response.data);
    } catch (error) {
      console.error('Error creating group:', error.response?.data?.error || error.message);
      
    }
  };

  const deleteGroup = async(groupId) =>{
    try {
      await axios.delete(`https://pocketnotes-app-backend.onrender.com/api/groups/${groupId}`);
      getGroups(); 
      setSelectedGroup(null); 
    } catch (error) {
      console.error('Error deleting group:', error.response?.data?.error || error.message);
    
    }
  };

  const getNotes = useCallback(async (groupId) => {
    if (groupId) {
      try {
        const response = await axios.get(`https://pocketnotes-app-backend.onrender.com/api/group?groupId=${groupId}`); 
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
        setNotes([]);
      }
    } else {
      setNotes([]);
    }
  }, []);
  useEffect(() => {
    getGroups();
  }, [getGroups]);

  const createNote = async (noteData) => {
    try {
     const response= await axios.post('https://pocketnotes-app-backend.onrender.com/api/notes',  noteData ); 
      setNotes([...notes, response.data]);
      console.log("Note created successfully:", response.data);
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const toggleNewGroupPopup = (event) => {
    console.log('toggleNewGroupPopup called')
    if (event) { 
      event.stopPropagation();
    }
    setNewGroupPopupVisible(!newGroupPopupVisible);
    console.log("toggleNewGroupPopup called, newGroupPopupVisible:", !newGroupPopupVisible);
  };
  const selectGroup = (group) => {
    setSelectedGroup(group);
    getNotes(group?._id);
  };

  // Fetch groups on initial component mount
  // useEffect(() => {
  //   getGroups();
  // }, []);




  // ---------------------LOCAL STORAGE---------------//

  useEffect(() => {
    const storedGroups = localStorage.getItem("groups");
    const storedNotes = localStorage.getItem("notes");
    const storedSelectedGroup = localStorage.getItem("selectedGroup");
  
    if (storedGroups) {
      setGroups(JSON.parse(storedGroups));
    } else {
      getGroups(); 
    }
  
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  
    if (storedSelectedGroup) {
      const group = JSON.parse(storedSelectedGroup);
      setSelectedGroup(group);
      getNotes(group._id); 
    }
  }, []);
  useEffect(() => {
    if (selectedGroup) {
      localStorage.setItem("selectedGroup", JSON.stringify(selectedGroup));
    } else {
      localStorage.removeItem("selectedGroup");
    }
  }, [selectedGroup]);
  
  useEffect(() => {
    if (notes) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);
  

  useEffect(() => {
    if (groups) {
      localStorage.setItem("groups", JSON.stringify(groups));
    }
  }, [groups]);
  

  return (
    <Data.Provider
      value={{
        notes,
        setNotes,
        groups,
        setGroups,
        getGroups,
        createGroup,
        deleteGroup,
        getNotes,
        createNote,
        toggleNewGroupPopup,
        newGroupPopupVisible, 
        selectGroup,
        selectedGroup, 
      }}
    >
      {children}
    </Data.Provider>
  );
};

export default NotesContext;
