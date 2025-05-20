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
import QuizStudentDetailsPage from './components/QuizStudentDetailsPage';
import QuizPreviewPage from './components/QuizPreviewPage';
import QuizFinishedPage from './components/QuizFinishedPage';
import QuizCreatedPage from './components/QuizCreatedPage';
import QuizProfDetailsPage from './components/QuizProfDetailsPage';
import QuizesStudentPage from './components/QuizesStudentPage';
import InvitesPage from './components/InvitesPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import UserDetails from './components/UserDetails';
import ChangePassword from './components/ChangePassword';
import CreatedQuizPage from './components/CreatedQuizPage';
import QusetionsProfPage from './components/QuestionsProfPage';
import EditQuizPage from './components/EditQuizPage';


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

        <Route path="/quiz-student-details" element={<QuizStudentDetailsPage />} />
        <Route path="/quiz-preview" element={<QuizPreviewPage />} />
        <Route path="/quiz-finished" element={<QuizFinishedPage />} />
        <Route path="/quiz-created" element={<QuizCreatedPage />} />
        <Route path="/quiz-prof-details" element={<QuizProfDetailsPage />} />
        <Route path="/my-invites" element={<InvitesPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path='/user-details' element={<UserDetails />} />
        <Route path='/change-password' element={<ChangePassword />} />
        <Route path='/generate-quiz' element={<CreatedQuizPage />} />
        <Route path='/questions' element={<QusetionsProfPage />} />

        <Route path='/edit-quiz/:quizId' element={<EditQuizPage />} />
      </Routes>
    </div>
  );
}

export default App;
