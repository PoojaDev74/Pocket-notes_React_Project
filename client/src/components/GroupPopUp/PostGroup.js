import React, { useState, useContext, useRef, useEffect } from 'react';
import { Data } from '../../Context/NotesContext';
import "./popUp.css"
const PostGroup = ({ onClose }) => {
  const { createGroup } = useContext(Data);
  const [groupName, setGroupName] = useState('');
  const popupRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState('#a879ff');


  const colorOptions = ['#a879ff', '#ff80bf', '#80f0ff', '#ffaa80', '#007bff', '#6691FF'];
  
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };
  const handleCreate = () => {
    if (groupName.trim().length >= 2) {
      createGroup(groupName.trim(),selectedColor);
      setGroupName('');
      onClose();
    } 
    
    else {
      alert('Group name must be at least 2 characters.');
    }
  };

  const handleOutsideClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose(event);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="create-group-popup-overlay" >
      <div className="create-group-popup" ref={popupRef} >
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
    <div className="color-palette">
      {colorOptions.map((color) => (
        <div
          key={color}
          className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
          style={{ backgroundColor: color }}
          onClick={() =>handleColorSelect(color)}
        ></div>
      ))}
    </div>
  </div>
        <div className="popup-buttons">
          <button onClick={handleCreate}>Create</button>
          <button onClick={onClose}>✕</button>
        </div>
      </div>
    </div>
  );
};

export default PostGroup;

