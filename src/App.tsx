import React from 'react';
import logo from './logo.svg';
import './App.css';
import RegisterUser from './components/RegisterUser';
import RegisterUserType from './components/RegisterUserType';
import { Routes, Route } from "react-router-dom";
import LogInUser from './components/LogInUser';
import GeneralHomePage from './components/GeneralHomePage';
import HelpPage from './components/HelpPage';
import QuizesProfPage from './components/QuizesProfPage';
import GenerateQuizPage from './components/GenerateQuizPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<GeneralHomePage />} />
        <Route path="/user-type" element={<RegisterUserType />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LogInUser />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/quizes-teacher" element={<QuizesProfPage />} />
        <Route path="/quizes-student" element={<QuizesProfPage />} />
        <Route path="/generate-quiz" element={<GenerateQuizPage />} />
      </Routes>
    </div>
  );
}

export default App;
