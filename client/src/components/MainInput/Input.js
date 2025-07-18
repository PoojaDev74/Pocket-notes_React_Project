import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify"; 
import { Data } from "../../Context/NotesContext";
import WelcomeScreen from "../WelcomeScreen/WelcomeScreen";
import "./Input.css";
import { Link, useParams, useNavigate } from "react-router-dom";

// --------------Input Section------------------
const Input = () => {
  const {
    groups,
    createNote,
    selectedGroup,
    deleteGroup,
    notes,
  } = useContext(Data);

  const [newNoteInput, setNewNoteInput] = useState("");
  const { groupId } = useParams();
  const [currentGroup, setCurrentGroup] = useState(null);
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 700;

  // Find the group by URL param (mobile view)
  useEffect(() => {
    if (groupId && groups) {
      const foundGroup = groups.find((group) => group._id === groupId);
      setCurrentGroup(foundGroup);
    }
  }, [groupId, groups]);

  // -------------Date and Time Format--------------
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getDate()} ${date.toLocaleString("en-US", {
      month: "short",
    })} ${date.getFullYear()}  •  ${date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;
  };

  // ---------------Create Note------------------
 const handleCreateNote = () => {
  const trimmedNote = newNoteInput.trim();

  if (!trimmedNote) {
    toast.error("Note cannot be empty.");
    return;
  }

  if (trimmedNote.length < 3) {
    toast.error("Note must be at least 3 characters long.");
    return;
  }

  if (selectedGroup) {
    const newNote = {
      info: trimmedNote,
      groupId: selectedGroup._id,
      createdAt: new Date().toISOString(),
    };
    createNote(newNote);
    setNewNoteInput("");
    toast.success("Note added successfully.");
  }
};

  const handleInputChange = (e) => setNewNoteInput(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && newNoteInput.trim()) {
      e.preventDefault();
      handleCreateNote();
    }
  };

  // ------------------Delete Group-----------------
  const handleDeleteGroup = async (groupId) => {
    await deleteGroup(groupId);
    setCurrentGroup(null);
    navigate("/");
  };

  // ----------------Group Initials----------------
  const trimGroupName = (name) => {
    if (!name) return "";
    const words = name.split(" ");
    return words.length === 1
      ? words[0].charAt(0).toUpperCase()
      : words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
  };

  const group = isMobile ? currentGroup : selectedGroup;

  return (
    <div className="content">
      {group ? (
        <>
          {/* --------------Header / Navbar-------------- */}
          <div className="navbar">
            {isMobile ? (
              <div className="Nav1">
                <Link to="/" className="back-arrow-link">
                  <i className="fa-solid fa-arrow-left"></i>
                </Link>
                <div
                  className="circle-name"
                  style={{ backgroundColor: group.color }}
                >
                  {trimGroupName(group.name)}
                </div>
                <h3 className="nav-heading">{group.name}</h3>
              </div>
            ) : (
              <div className="nav">
                <div
                  className="circle-name"
                  style={{ backgroundColor: group.color }}
                >
                  {trimGroupName(group.name)}
                </div>
                <h3 className="nav-heading">{group.name}</h3>
              </div>
            )}
          </div>

          {/* --------------Notes List-------------- */}
          <div className="records">
            <div className="records-main">
              {notes
                .filter((note) => note.groupId === group._id)
                .map((item) => (
                  <div className="record" key={item._id}>
                    <p>{item.info}</p>
                    {item.createdAt && (
                      <p className="note-created-at">
                        {formatDateForDisplay(item.createdAt)}
                      </p>
                    )}
                  </div>
                ))}
              {notes.filter((note) => note.groupId === group._id).length === 0 && (
                <p>No notes for this group yet.</p>
              )}
            </div>
          </div>

          {/* --------------Note Input-------------- */}
          <div className="note-container">
            <div className="new-note-input">
              <textarea
                value={newNoteInput}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter your text here..."
                className="note-input"
              />
              <button
                className={`note-btn ${newNoteInput.trim() ? "active" : "disabled"}`}
                onClick={handleCreateNote}
                disabled={!newNoteInput.trim()}
              >
                ➤
              </button>
            </div>
          </div>
        </>
      ) : (
        // --------------Default Welcome Screen (Desktop)--------------
       !selectedGroup &&  !isMobile && 
            <WelcomeScreen />
      )}
    </div>
  );
};

export default Input;
