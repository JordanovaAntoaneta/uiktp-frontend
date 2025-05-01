import React from 'react';
import logo from './logo.svg';
import './App.css';
import RegisterUser from './components/RegisterUser';
import RegisterUserType from './components/RegisterUserType';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogInUser from './components/LogInUser';
import GeneralHomePage from './components/GeneralHomePage';
import HelpPage from './components/HelpPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<GeneralHomePage />} />
        <Route path="/user-type" element={<RegisterUserType />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LogInUser />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </div>
  );
}

export default App;
