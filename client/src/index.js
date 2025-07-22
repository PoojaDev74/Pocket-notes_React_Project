import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import NotesProvider from "./Context/NotesContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotesProvider>
    <App />
    </NotesProvider>
  </React.StrictMode>
);

