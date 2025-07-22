import './App.css';
import PostGroup from "./components/GroupPopUp/PostGroup"
import Input from './components/MainInput/Input';
import Sidebar from './components/Sidebar/Sidebar';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import {Data}  from './Context/NotesContext';
import { useContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useIsMobile from './hooks/useIsMobile';
import { useNavigate } from 'react-router-dom';

function App() {

const { newGroupPopupVisible, toggleNewGroupPopup, selectedGroup } = useContext(Data);
const [showGroups, setShowGroups] = useState(false);
const isMobile = useIsMobile(768);
const navigate = useNavigate();

  const handleStart = () => {
    setShowGroups(true);
  };
  
return (
 <div className="App"> 
    {isMobile ? (
       <Routes>
          <Route
              path="/"
              element={
                <>
                  <Sidebar 
                    showGroups={showGroups}
                    onStart={handleStart}
                    isMobile={isMobile}
                    selectedGroup={selectedGroup}
                  />
                  {!selectedGroup ? <WelcomeScreen /> : <Input />}
                </>
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
               </h2>} 
          />
       </Routes>
    )  : (
      <>
         <Sidebar 
             showGroups={showGroups}
             onStart={handleStart}
             isMobile={isMobile}
             selectedGroup={selectedGroup}
         />
         {selectedGroup ? <Input /> : <WelcomeScreen />}
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
