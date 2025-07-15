import React, { useState, useEffect } from "react";
import { Data } from "../../Context/NotesContext";
import { useContext } from "react";
import "./Input.css";
import { Link, useParams, useNavigate } from "react-router-dom";

// --------------Input Section------------------
const Input = () => {
  const { groups, createNote, selectedGroup, deleteGroup } = useContext(Data);
  const [newNoteInput, setNewNoteInput] = useState("");
  const notesContext = useContext(Data);
  const { groupId } = useParams();
  const [currentGroup, setCurrentGroup] = useState(null);
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 700;
  useEffect(() => {
    if (groupId && groups) {
      const foundGroup = groups.find((group) => group._id === groupId);
      setCurrentGroup(foundGroup);
    }
  }, [groupId, groups]);

  // -------------Date and time Format--------------
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })} ${date.getFullYear()}  •  ${date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}`;
  };

  // ---------------Creating of Notes------------------
  const handleCreateNote = () => {
    if (selectedGroup && newNoteInput.trim()) {
      const timestampISO = new Date().toISOString();
      const newNote = {
        info: newNoteInput,
        groupId: selectedGroup._id,
        createdAt: timestampISO,
      };
      createNote(newNote);
      setNewNoteInput("");
    }
  };

  const handleInputChange = (e) => {
    setNewNoteInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && newNoteInput.trim() && selectedGroup) {
      handleCreateNote();
    }
  };
  useEffect(() => {}, [notesContext.notes, selectedGroup]);

  //  ------------------Deleting of groups-----------------
  const handleDeleteGroup = async (groupId) => {
    await deleteGroup(groupId);
    setCurrentGroup(null);
    navigate("/");
  };

  //  ----------------Trimming of the Group Name---------------
  const trimGroupName = (name) => {
    if (!name || typeof name !== "string") {
      return "";
    }
    const words = name.split(" ");
    if (words.length === 0) {
      return "";
    } else if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    } else {
      const firstLetterFirstWord = words[0].charAt(0).toUpperCase();
      const firstLetterSecondWord = words[1].charAt(0).toUpperCase();
      return `${firstLetterFirstWord}${firstLetterSecondWord}`;
    }
  };

  return (
    <div className="content">
      {selectedGroup ? (
        <>
          <div className="navbar">
            {isMobile ? (
              <div className="Nav1">
                <Link to="/" className="back-arrow-link">
                  <i class="fa-solid fa-arrow-left"></i>
                </Link>
                <div
                  className="circle-name"
                  style={{ backgroundColor: selectedGroup.color }}
                >
                  {trimGroupName(selectedGroup.name)}
                </div>
                <h3 className="nav-heading">{selectedGroup.name}</h3>
              </div>
            ) : (
              <div className="nav">
                <div
                  className="circle-name"
                  style={{ backgroundColor: selectedGroup.color }}
                >
                  {trimGroupName(selectedGroup.name)}
                </div>
                <h3 className="nav-heading">{selectedGroup.name}</h3>
              </div>
            )}
          </div>

{/* -------------records of input------------------ */}
          <div className="records">
            {notesContext.notes && Array.isArray(notesContext.notes) && (
              <div className="records-main">
                {notesContext.notes
                  .filter(
                    (note) =>
                      selectedGroup && note.groupId === selectedGroup._id
                  )
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
                {notesContext.notes.filter(
                  (note) => selectedGroup && note.groupId === selectedGroup._id
                ).length === 0 && <p>No notes for this group yet.</p>}
              </div>
            )}
          </div>

  {/* ------------------note Input Container---------------*/}
          <div className="note-container">
            <div className="new-note-input">
              <textarea
                type="text"
                value={newNoteInput}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter your text here..."
                className="note-input"
              />
              <button
                className="note-btn "
                onClick={handleCreateNote}
                disabled={!newNoteInput.trim()}
              >
                ➤
              </button>
            </div>
          </div>
        </>
      ) : (
        !isMobile && (
          <div className="content-img">
            <img
              src={require("../../Assests/background-image.png")}
              alt="main"
            />
            <h2 className="content-heading">Pocket Notes</h2>
            <p>
              Send and receive messages without keeping your phone online.
              <br />
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
            <p className="content-end">
              {" "}
              <i class="fa-solid fa-lock"></i>end-to-end encrypted
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default Input;
