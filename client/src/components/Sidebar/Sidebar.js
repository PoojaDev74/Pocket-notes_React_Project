import React, { useContext } from "react";
import styles from "./Sidebar.module.css";
import { Data } from "../../Context/NotesContext";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ showGroups, onStart }) => {
  const { groups, toggleNewGroupPopup, selectGroup, selectedGroup } = useContext(Data);
   const location = useLocation();
   const isMobile = window.innerWidth <= 768;

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

    const handleGroupClick = (group) => {
    if (window.innerWidth <= 768) {
      navigate(`/group/${group._id}/notes`);
    } else {
      selectGroup(group);
    }
  };

  const handlePlusClick = () => {
    if (onStart) {
      onStart(); 
    }
    toggleNewGroupPopup(); 
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h1 className={styles.heading}>Pocket Notes</h1>
  
      <div className={styles.sidebarContent}>
        <div className={styles.groupNames}>
          <ul>
            {groups?.length > 0 && 
              groups.map((group) => {
                const isActive =
                  selectedGroup?._id === group._id ||
                  location.pathname === `/group/${group._id}/notes`;
              
                return (
                  <li key={group._id}>
                    <Link
                      to={`/group/${group._id}/notes`}
                      className={`${styles.groupName} ${isActive ? styles.active : ""}`}
                      onClick={() => selectGroup(group)}
                    >
                      <div
                        className={styles.circleName}
                        style={{ backgroundColor: group.color }}
                      >
                        {trimGroupName(group.name)}
                      </div>
                      <h3>{group.name}</h3>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        <div className={styles.sidebarFooter}>
         <button className={styles.groupBtn} onClick={handlePlusClick}>
           +
         </button>
        </div>
      </div>
    </div>
   </div>
  );
};

export default Sidebar;
