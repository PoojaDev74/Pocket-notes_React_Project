import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostGroup from "./components/GroupPopUp/PostGroup"
import Input from './components/MainInput/Input';
import Sidebar from './components/Sidebar/Sidebar';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import {Data}  from './Context/NotesContext';
import { useContext, useEffect, useState } from 'react';


function App() {

const { newGroupPopupVisible, toggleNewGroupPopup } = useContext(Data);
const isMobile = window.innerWidth <= 700;

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth <= 700);
  //   };

  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

return (
 <div className="App"> 
  <Router>
    {isMobile ? (
      <Routes>
        <Route path="/" element={<Sidebar/>} />
        <Route path="/group/:groupId/notes" element={<Input/>} />
        <Route path="/new-group" element={<PostGroup onClose={toggleNewGroupPopup} />} />
      </Routes>
    )  : (
      <>
        <Sidebar />
        {selectedGroup ? <Input /> : <WelcomeScreen />}
      </>
    )}
    {newGroupPopupVisible && <PostGroup onClose={toggleNewGroupPopup} />}
  </Router>
    </div>
  );
}

export default App;
