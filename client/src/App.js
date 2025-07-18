import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostGroup from "./components/GroupPopUp/PostGroup"
import Input from './components/MainInput/Input';
import Sidebar from './components/Sidebar/Sidebar';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import {Data}  from './Context/NotesContext';
import { useContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

const { newGroupPopupVisible, toggleNewGroupPopup, selectedGroup } = useContext(Data);
const [showGroups, setShowGroups] = useState(false);
const isMobile = window.innerWidth <= 700;

  const handleStart = () => {
    setShowGroups(true);
  };
  
return (
 <div className="App"> 
  <Router>
    {isMobile ? (
      <Routes>
        <Route path="/" element={
         <>
          <Sidebar showGroups={showGroups} onStart={handleStart} />
          {!selectedGroup ? <WelcomeScreen /> : <Input />}
         </>
        } 
        />
        <Route path="/group/:groupId/notes" element={<Input/>} />
        <Route path="/new-group" element={<PostGroup onClose={toggleNewGroupPopup} />} />
      </Routes>
    )  : (
      <>
         <Sidebar showGroups={showGroups} onStart={handleStart} />
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
    </Router>
  </div>
);
}

export default App;
