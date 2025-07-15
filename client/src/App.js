import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostGroup from "./components/GroupPopUp/PostGroup"
import Input from './components/MainInput/Input';
import Sidebar from './components/Sidebar/Sidebar';
import {Data}  from './Context/NotesContext';
import { useContext } from 'react';


function App() {

const { newGroupPopupVisible, toggleNewGroupPopup } = useContext(Data);
const isMobile = window.innerWidth <= 700;

return (
  <div className="App">

    
  {isMobile ? (
    <Router>
      <Routes>
        <Route path="/" element={<Sidebar/>} />
        <Route path="/group/:groupId/notes" element={<Input/>} />
        <Route path="/new-group" element={<PostGroup onClose={toggleNewGroupPopup} />} />
      </Routes>
      {newGroupPopupVisible && <PostGroup onClose={toggleNewGroupPopup} />}
    </Router>
  )  : (
              <>
      <Router> 
  <Sidebar/>
  <Input/>
  {newGroupPopupVisible && <PostGroup onClose={toggleNewGroupPopup} />}
  </Router>

  </>
          )}
  </div>
);
}

export default App;