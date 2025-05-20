import React, {useEffect, useState} from "react";
import { Box, Button, Typography, CircularProgress} from "@mui/material";
import "../styles/QuizStudentDetailsPage.css"
import finished from "../assets/QuizFinished/finished.png";
import { useNavigate } from "react-router-dom";
import { linkBase } from "../linkBase";
import { useLocation } from "react-router-dom";
import { UserAnswerInterface } from "../interfaces/UserAnswerInterface";


const QuizFinishedPage = () => {
  const location = useLocation();
  const {userId, quizId, title} = location.state || {};
  
  const [answers, setAnswers] = useState<UserAnswerInterface[]>([]);
  const [loading, setLoading] = useState(true);

  const [totalCorrect, setTotalCorrect] = useState<number | null>(null); //za results

  const navigate = useNavigate();

  //api za fetch na users answers
  useEffect(() => {
  const fetchAnswers = async () => {
    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        `${linkBase}/UserAnswer/user-answers?userId=${userId}&quizId=${quizId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch answers");

      const data = await response.json();
      setAnswers(data);
    } catch (error) {
      console.error("Error fetching user answers:", error);
    } finally {
      setLoading(false);
    }
  };

  if (userId && quizId) {
    fetchAnswers();
  }
}, [userId, quizId]);

  
  const handleShowResults = () => {
    if (!answers || answers.length === 0) return;

    const correctCount = answers.filter((ans) => ans.isCorrect).length;
    setTotalCorrect(correctCount);
  };

    return (
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          bgcolor: '#f0f2f5',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4,
          position: 'relative'
        }}
      >
        {/* Image container with relative positioning */}
        <Box sx={{ position: 'relative', width: '1075px', height: '687px' }}>
          <img
            src={finished}
            alt="Quiz finished!"
            style={{
              height: '100%',
              width: '100%',
              display: 'block',
            }}
          />
  
          {/* Button container on bottom of image */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              px: 4,
              pb: 2,
            }}
          >
            {/* Centered button using auto margins */}
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                onClick={handleShowResults}
                disabled={loading || answers.length === 0}
                sx={{
                  position: 'absolute', 
                  bottom: 95, 
                  right: 500, 
                  bgcolor: '#8181d8',
                  color: '#fff',
                  borderRadius: 2,
                  px: 4,
                  py: 1,
                  fontWeight: 'bold',
                }}
              >
                Show Results
              </Button>
            </Box>
          </Box>
        </Box>

        {totalCorrect !== null && (
        <Typography
          variant="h5"
          sx={{ mt: 4, color: "#333", fontWeight: "bold" }}
        >
          Total Correct Answers: {totalCorrect} / {answers.length}
        </Typography>
      )}
  
        {/* Right-aligned Back button */}
        <Button
          variant="contained"
          sx={{
            position: 'absolute', 
            bottom: 95, 
            right: 260, 
            bgcolor: '#8181d8',
            color: '#fff',
            borderRadius: 2,
            px: 4,
            py: 1,
            fontWeight: 'bold',
          }}
          onClick={() => navigate('/quiz-student-details', {state: {title}})}
        >
          Back
        </Button>
      </Box>
    );
  };
  
  export default QuizFinishedPage;