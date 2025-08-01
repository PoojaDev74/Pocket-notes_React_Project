import React, { useState, useContext, useRef, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Data } from '../../Context/NotesContext';
import styles from "./popUp.module.css"
const PostGroup = ({ onClose }) => {
  const { createGroup, groups } = useContext(Data);
  const [groupName, setGroupName] = useState('');
  const popupRef = useRef(null);

  const colorOptions = ['#a879ff', '#ff80bf', '#80f0ff', '#ffaa80', '#007bff', '#6691FF'];
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  
  const handleColorSelect = (color) => {
     console.log("Selected:", color);
    setSelectedColor(color);
  };

  const handleCreate = () => {
    const trimmedName = groupName.trim();

    if (trimmedName.length < 2) {
      toast.error("Group name must be at least 2 characters.");
      return;
    }
    
    const groupExists = groups?.some(
      (group) => group.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (groupExists) {
      toast.error("Group name already exists.");
      return;
    }

    createGroup(trimmedName, selectedColor);
    setGroupName('');
    onClose();
    };


  const handleOutsideClick = useCallback((event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose(event);
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    const escListener = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", escListener);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener("keydown", escListener);
    };
  }, [handleOutsideClick, onClose]);

  return (
    <div className={styles.groupPopupOverlay}>
      <div className={styles.groupPopup} ref={popupRef} >
        <h3>Create New Group</h3>
        <h4>Group Name</h4>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder=" Enter Group Name"
        />
          <div>
    <h4>Choose colour</h4>
    <div className={styles.colorPalette}>
      {colorOptions.map((color) => (
        <div
          key={color}
          className={`${styles.colorCircle} ${selectedColor === color ? styles.selected : ''}`}
          style={{ backgroundColor: color }}
          onClick={() =>handleColorSelect(color)}
        ></div>
      ))}
    </div>
  </div>
        <div className={styles.popupButtons}>
          <button onClick={handleCreate}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default PostGroup;

