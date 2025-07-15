import React, { useContext } from "react";
import "./Sidebar.css";
import { Data } from "../../Context/NotesContext";
import { Link } from "react-router-dom";

const Sidebar = () => {
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

  return (
    <div className="container">
      <div className="sidebar">
        <h1 className="heading">Pocket Notes</h1>
        <div className="groupNames">
          <ul>
            {groups &&
              groups.map((group) => (
                <li key={group._id}>
                  {isMobile ? (
                    <Link
                      to={`/group/${group._id}/notes`}
                      className={`groupName ${
                        selectedGroup?._id === group._id ? "active" : ""
                      }`}
                      onClick={() => selectGroup(group)}
                    >
                      <div
                        className="circle-name"
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
                        className={`groupName ${
                          selectedGroup?._id === group._id ? "active" : ""
                        }`}
                        onClick={() => selectGroup(group)}
                      >
                        <div
                          className="circle-name"
                          style={{ backgroundColor: group.color }}
                        >
                          {trimGroupName(group.name)}
                        </div>
                        <h3>{group.name}</h3>
                      </Link>
                    </>
                  )}
                </li>
              ))}
            <button className="group-btn" onClick={toggleNewGroupPopup}>
              +
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
