import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios"
export const Data = createContext();

const NotesContext = ({ children }) => {
  const [notes, setNotes] = useState([]); 
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null); 
  const [newGroupPopupVisible, setNewGroupPopupVisible] = useState(false);

    const [userId] = useState(() => {
    let storedId = localStorage.getItem("userId");
    if (!storedId) {
      storedId = crypto.randomUUID(); 
      localStorage.setItem("userId", storedId);
    }
    return storedId;
  });

  const getGroups = useCallback(async () => { 
    try {
      const response = await axios.get(`https://pocket-notes-react-project-backend.onrender.com/api/groups`,
      {
        params: {userId}
      });
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
    
    setGroups([]);
    setNotes([]);
    setSelectedGroup(null);
    return;
  }
    getGroups();
  }, [getGroups, userId]);

  const createGroup = async (name,color) => {
    try {
      const response = await axios.post(`https://pocket-notes-react-project-backend.onrender.com/api/groups`, { name , color, userId });
      await getGroups(); 
      setSelectedGroup(response.data);
    } catch (error) {
      console.error("Error creating group:", error.response?.data?.error || error.message);      
    }
  };

  const getNotes = useCallback(async (groupId) => {
     if (!groupId) {
        setNotes([]);
        return;
      }
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
  }, [userId]);

  const createNote = async (noteData) => {
    try {
     const response= await axios.post(`https://pocket-notes-react-project-backend.onrender.com/api/notes`,  
     {
       info: noteData.info,
       groupId: noteData.groupId,
       userId: userId,
     });
      setNotes((prev) => [...prev, response.data]);
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
     setNewGroupPopupVisible((prev) => {
      const newState = !prev;
      console.log("newGroupPopupVisible =>", newState);
      return newState;
    });
  };
  const selectGroup = (group) => {
    setSelectedGroup(group);
    getNotes(group?._id);
  };

  // ---------------------LOCAL STORAGE---------------//

  useEffect(() => {
   const storedGroup = localStorage.getItem("selectedGroup");
    if (storedGroup) {
    const group = JSON.parse(storedGroup);
    setSelectedGroup(group);
  }
}, []);
  
useEffect(() => {
  if (selectedGroup?._id) {
    getNotes(selectedGroup._id);
  }
}, [selectedGroup, getNotes]);
  
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
        groups,
        getGroups,
        createGroup,
        getNotes,
        createNote,
        toggleNewGroupPopup,
        newGroupPopupVisible, 
        selectedGroup,
        setSelectedGroup, 
        userId
      }}
    >
      {children}
    </Data.Provider>
  );
};

export default NotesContext;
