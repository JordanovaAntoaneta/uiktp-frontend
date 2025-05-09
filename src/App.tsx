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
import QuizStudentDetailsPage from './components/QuizStudentDetailsPage';
import QuizPreviewPage from './components/QuizPreviewPage';
import QuizFinishedPage from './components/QuizFinishedPage';
import QuizCreatedPage from './components/QuizCreatedPage';
import QuizProfDetailsPage from './components/QuizProfDetailsPage';
import QuizesStudentPage from './components/QuizesStudentPage';
import InvitesPage from './components/InvitesPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';

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
        <Route path="/quizes-student" element={<QuizesStudentPage />} />
        <Route path="/generate-quiz" element={<GenerateQuizPage />} />
        <Route path="/quiz-student-details" element={<QuizStudentDetailsPage />} />
        <Route path="/quiz-preview" element={<QuizPreviewPage />} />
        <Route path="/quiz-finished" element={<QuizFinishedPage />} />
        <Route path="/quiz-created" element={<QuizCreatedPage />} />
        <Route path="/quiz-prof-details" element={<QuizProfDetailsPage />} />
        <Route path="/my-invites" element={<InvitesPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </div>
  );
}

export default App;
