import React, { useContext } from "react";
import "./Sidebar.module.css";
import { Data } from "../../Context/NotesContext";
import { Link } from "react-router-dom";

const Sidebar = ({ showGroups, onStart }) => {
  const { groups, toggleNewGroupPopup, selectGroup, selectedGroup } =
    useContext(Data);

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
  const isMobile = window.innerWidth <= 700;

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
        <div className={styles.groupNames}>
          <ul>
            {groups && groups.length > 0 ? (
              groups.map((group) => (
                <li key={group._id}>
                  {isMobile ? (
                    <Link
                      to={`/group/${group._id}/notes`}
                      className={`${styles.groupName} ${
                        selectedGroup?._id === group._id ? styles.active : ""
                      }`}
                      onClick={() => selectGroup(group)}
                    >
                      <div
                        className={styles.circle-name}
                        style={{ backgroundColor: group.color }}
                      >
                        {trimGroupName(group.name)}
                      </div>
                      <h3>{group.name}</h3>
                    </Link>
                    
                  ) : (
                    <>
                      <Link
                        to={`/group/${group._id}/notes`}
                        className={`${styles.groupName} ${
                          selectedGroup?._id === group._id ? styles.active : ""
                        }`}
                        onClick={() => selectGroup(group)}
                      >
                        <div
                          className={styles.circle-name}
                          style={{ backgroundColor: group.color }}
                        >
                          {trimGroupName(group.name)}
                        </div>
                        <h3>{group.name}</h3>
                      </Link>
                    </>
                  )}
                </li>
              ))
            ) : null}
            <button className={styles.group-btn} onClick={handlePlusClick}>
              +
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
