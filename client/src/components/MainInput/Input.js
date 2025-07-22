import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify"; 
import { Data } from "../../Context/NotesContext";
import WelcomeScreen from "../WelcomeScreen/WelcomeScreen";
import styles from "./Input.module.css";
import useIsMobile from "../../hooks/useIsMobile";
import { useNavigate, useParams } from "react-router-dom";

// --------------Input Section------------------
const Input = () => {
  const {
    groups,
    createNote,
    selectedGroup,
    notes,
  } = useContext(Data);

  const [newNoteInput, setNewNoteInput] = useState("");
  const { groupId } = useParams();
  const [currentGroup, setCurrentGroup] = useState(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile(700);

 
  useEffect(() => {
    if (groupId && groups) {
      const foundGroup = groups.find((group) => group._id === groupId);
      setCurrentGroup(foundGroup);
    }
  }, [groupId, groups]);

  const group = isMobile ? currentGroup : selectedGroup;

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

  if (group) {
    const newNote = {
      info: trimmedNote,
      groupId: group._id,
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

  // ----------------Group Initials----------------
  const trimGroupName = (name) => {
    if (!name) return "";
    const words = name.split(" ");
    return words.length === 1
      ? words[0].charAt(0).toUpperCase()
      : words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
  };

    const groupNotes = notes.filter((note) => note.groupId === group?._id);

  return (
    <div className={styles.content}>
      {group ? (
        <>
          <div className={styles.notesPanel}>
          {/* --------------Header / Navbar-------------- */}
          <div className={styles.navbar}>
            {isMobile ? (
              <div className={styles.Nav1}>
                <button onClick={() => navigate("/")} className={styles.backArrowLink}>
                  ← 
                </button>
                <div
                  className={styles.circleName}
                  style={{ backgroundColor: group.color }}
                >
                  {trimGroupName(group.name)}
                </div>
                <h3 className={styles.navHeading}>{group.name}</h3>
              </div>
            ) : (
              <div className={styles.nav}>
                <div
                  className={styles.circleName}
                  style={{ backgroundColor: group.color }}
                >
                  {trimGroupName(group.name)}
                </div>
                <h3 className={styles.navHeading}>{group.name}</h3>
              </div>
            )}
          </div>

          {/* --------------Notes List-------------- */}
          <div className={styles.records}>
            <div className={styles.recordsMain}>
             {groupNotes.map((item) => (
                <div className={styles.record} key={item._id}>
                    <p>{item.info}</p>
                    {item.createdAt && (
                      <p className={styles.noteCreatedAt}>
                        {formatDateForDisplay(item.createdAt)}
                      </p>
                    )}
                  </div>
                ))}
               {groupNotes.length === 0 && (
                <p>No notes for this group yet.</p>
              )}
            </div>
          </div>

          {/* --------------Note Input-------------- */}
          <div className={styles.noteContainer}>
            <div className={styles.newNoteInput}>
              <textarea
                value={newNoteInput}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter your text here..."
                className={styles.noteInput}
              />
              <button
                className={`${styles.noteBtn} ${newNoteInput.trim() ? styles.active : styles.disabled}`}
                onClick={handleCreateNote}
                disabled={!newNoteInput.trim()}
              >
                ➤
              </button>
            </div>
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
