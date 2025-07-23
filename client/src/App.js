import './App.css';
import PostGroup from "./components/GroupPopUp/PostGroup";
import Input from './components/MainInput/Input';
import Sidebar from './components/Sidebar/Sidebar';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import { Data } from './Context/NotesContext';
import { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useIsMobile from './hooks/useIsMobile';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const { newGroupPopupVisible, toggleNewGroupPopup, selectedGroup } = useContext(Data);
  const [showGroups, setShowGroups] = useState(false);
  const isMobile = useIsMobile(768);
  const navigate = useNavigate();

  const handleStart = () => {
    setShowGroups(true);
  };

  useEffect(() => {
   const isHomePage = window.location.pathname === "/";
    if (isMobile && selectedGroup && !isHomePage) {
      navigate(`/group/${selectedGroup._id}/notes`);
    }
  }, [isMobile, selectedGroup, navigate]);

  return (
    <div className="App">
      {isMobile ? (
        <Routes>
          <Route
            path="/"
            element={
                    <Sidebar
                      showGroups={showGroups}
                      onStart={handleStart}
                      isMobile={isMobile}
                      selectedGroup={selectedGroup}
                    />
            }
          />
          <Route
            path="/group/:groupId/notes"
            element={
              <Input
                isMobile={isMobile}
                onBack={() => navigate("/")}
              />
            }
          />
          <Route
            path="*"
            element={
              <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
                404 - Page Not Found
              </h2>
            }
          />
        </Routes>
      ) : (
        <>
            <div className="sidebar">
                <Sidebar
                  showGroups={showGroups}
                  onStart={handleStart}
                  isMobile={isMobile}
                  selectedGroup={selectedGroup}
                />
            </div>
           <div className="mainContent">
            {selectedGroup ? (
              <Input isMobile={isMobile} />
            ) : (
             <WelcomeScreen />
            )}
           </div>
          </>
          )}

      {newGroupPopupVisible && <PostGroup onClose={toggleNewGroupPopup} />}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
