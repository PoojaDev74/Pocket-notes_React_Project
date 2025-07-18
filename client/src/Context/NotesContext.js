import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios"
export const Data = createContext();

const NotesContext = ({ children }) => {
  const [notes, setNotes] = useState([]); 
  const [groups, setGroups] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null); 
  const [newGroupPopupVisible, setNewGroupPopupVisible] = useState(false);

    const [userId] = useState(() => {
    let storedId = localStorage.getItem("userId");
    if (!storedId) {
      storedId = crypto.randomUUID(); // Or use uuid() from 'uuid'
      localStorage.setItem("userId", storedId);
    }
    return storedId;
  });

  const getGroups = useCallback(async () => { 
    try {
      const response = await axios.get(`https://pocket-notes-react-project-backend.onrender.com/api/groups?userId=${userId}`);
      setGroups(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  }, [userId]);

  useEffect(() => {
  let storedId = localStorage.getItem("userId");

  if (!storedId) {
    storedId = crypto.randomUUID(); 
    localStorage.setItem("userId", storedId);
    
    localStorage.removeItem("groups");
    localStorage.removeItem("notes");
    localStorage.removeItem("selectedGroup");

    setGroups([]);
    setNotes([]);
    setSelectedGroup(null);
    return;
  }

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


  const createGroup = async (name,color) => {
    try {
      const response = await axios.post(`https://pocket-notes-react-project-backend.onrender.com/api/groups`, { name , color, userId });
      getGroups(); 
      setSelectedGroup(response.data);
    } catch (error) {
      console.error("Error creating group:", error.response?.data?.error || error.message);
      
    }
  };

  const getNotes = useCallback(async (groupId) => {
    if (groupId) {
      try {
        const response = await axios.get(`https://pocket-notes-react-project-backend.onrender.com/api/group`,
        {
          params: {
          groupId,
          userId
        }
      }); 
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
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
     const response= await axios.post(`https://pocket-notes-react-project-backend.onrender.com/api/notes`,  
     {
       info: noteData.info,
       groupId: noteData.groupId,
       userId: userId,
     });
      setNotes([...notes, response.data]);
      console.log("Note created successfully:", response.data);
    } catch (error) {
      console.error("Error creating note:", error);
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
        getNotes,
        createNote,
        toggleNewGroupPopup,
        newGroupPopupVisible, 
        selectGroup,
        selectedGroup, 
        userId
      }}
    >
      {children}
    </Data.Provider>
  );
};

export default NotesContext;
