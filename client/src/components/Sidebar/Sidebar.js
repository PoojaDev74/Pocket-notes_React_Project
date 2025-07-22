import React, { useContext } from "react";
import styles from "./Sidebar.module.css";
import { Data } from "../../Context/NotesContext";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ showGroups, onStart }) => {
  const { groups, toggleNewGroupPopup, selectGroup, selectedGroup } = useContext(Data);
  const location = useLocation();
  const navigate = useNavigate();

  const trimGroupName = (name) => {
    if (!name || typeof name !== "string") return "";
    const words = name.split(" ");
    if (words.length === 1) return words[0][0]?.toUpperCase() || "";
    return `${words[0][0]?.toUpperCase() || ""}${words[1][0]?.toUpperCase() || ""}`;
  };

  const handlePlusClick = () => {
    if (onStart) onStart();
    toggleNewGroupPopup();
  };

    const handleGroupClick = (group) => {
    selectGroup(group); 
    onStart?.(); 

    setTimeout(() => {
      navigate(`/group/${group._id}/notes`);
    }, 0);
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
                      <div
                        className={`${styles.groupName} ${isActive ? styles.active : ""}`}
                        onClick={() => handleGroupClick(group)}
                      >
                        <div
                          className={styles.circleName}
                          style={{ backgroundColor: group.color }}
                        >
                          {trimGroupName(group.name)}
                        </div>
                        <h3>{group.name}</h3>
                       </div>
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
