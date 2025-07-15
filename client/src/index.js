import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import NotesContext from "./Context/NotesContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotesContext>
    <App />
    </NotesContext>
  </React.StrictMode>
);

