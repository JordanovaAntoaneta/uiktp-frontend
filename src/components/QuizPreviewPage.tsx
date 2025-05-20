import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import "../styles/QuizStudentDetailsPage.css";
import lightbulb from "../assets/QuizPreviewPage/lightbulb.png";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";
import { linkBase } from "../linkBase";

interface Question {
  id: number;
  text: string;
  choiceA: string;
  choiceB: string;
  choiceC: string;
  correctAnswer: string;
  points: number;
}

const QuizPage: React.FC = () => {
  const location = useLocation();
  const { quizId, title, user } = location.state || {};

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  //za hintot
  const [hint, setHint] = useState<string | null>(null);
  const [loadingHint, setLoadingHint] = useState<boolean>(false);

  //state za user-ot, za da moze da se zima na site str
  const [currentUser, setCurrentUser] = useState<any>(null);

  const navigate = useNavigate();


  //za da se zeme current user:
  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(`${linkBase}/User/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch user");

      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error("Error fetching current user:", error);
      return null;
    }
  };


  const handleAnswerSubmit = async () => {
    if (!selectedAnswer || !currentUser) return;

    const token = localStorage.getItem("accessToken");
    const currentQuestion = questions[currentQuestionIndex];

    // Map "A", "B", "C" to actual text values
    const answerMap = {
      A: currentQuestion.choiceA,
      B: currentQuestion.choiceB,
      C: currentQuestion.choiceC,
    };

    const answerText = answerMap[selectedAnswer as "A" | "B" | "C"];

    try {
      const response = await fetch(`${linkBase}/UserAnswer`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionId: currentQuestion.id,
          userId: currentUser.id,
          selectedAnswer: answerText, // ✅ Use actual answer text
        }),
      });

      if (!response.ok) throw new Error("Failed to submit answer");

      const data = await response.json();
      console.log("Answer submitted:", data);
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const fetchHint = async () => {
    const currentQuestion = questions[currentQuestionIndex];
    setLoadingHint(true);

    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(`${linkBase}/Quiz/generate-hint`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionText: currentQuestion.text,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch hint");

      const data = await response.text();
      setHint(data);
    } catch (error) {
      console.error("Error fetching hint:", error);
      setHint("Hint unavailable. Try again later.");
    } finally {
      setLoadingHint(false);
    }
  };



  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(
          `${linkBase}/Question/by-quizz?quizid=${quizId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch questions");

        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (quizId) {
      fetchQuestions();
    }
  }, [quizId]);

  //za user
  useEffect(() => {
    const getUser = async () => {
      const user = await fetchCurrentUser();
      if (user) {
        setCurrentUser(user);
      }
    };

    getUser();
  }, []);


  if (loading) {
    return (
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress />
        <Typography>Loading Questions...</Typography>
      </Box>
    );
  }

  if (questions.length === 0) {
    return (
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <Typography>No questions found for this quiz.</Typography>
      </Box>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const choices = {
    A: currentQuestion.choiceA,
    B: currentQuestion.choiceB,
    C: currentQuestion.choiceC,
  };

  const progressValue = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#C5C5FF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        px: 3,
        py: 2,
      }}
    >
      {/* Quiz Title */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mt: 2,
            flex: 1,
            textAlign: "center",
            fontWeight: "bold",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          {title} Quiz
        </Typography>

        {/* <IconButton sx={{ width: "20px" }}>
          <CloseIcon />
        </IconButton> */}
      </Box>

      {/* Top Row */}
      <Box
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={fetchHint} disabled={loadingHint}>
            <img src={lightbulb} alt="Lightbulb" style={{ height: 90, opacity: loadingHint ? 0.5 : 1, cursor: "pointer" }} />
          </IconButton>
          <Paper
            elevation={3}
            sx={{
              px: 2,
              py: 1,
              borderRadius: 5,
              bgcolor: "white",
              fontSize: "0.875rem",
              maxWidth: 250,
            }}
          >
            {loadingHint ? "Loading hint..." : hint || "Click the lightbulb for a hint!"}
          </Paper>
        </Box>
      </Box>

      {/* Question & Answers */}
      <Box
        sx={{
          textAlign: "center",
          mt: 4,
          flexGrow: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: "#fff",
          }}
        >
          {currentQuestion.text}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {Object.entries(choices).map(([label, text]) => (
            <Button
              key={label}
              variant={selectedAnswer === label ? "contained" : "outlined"}
              onClick={() => setSelectedAnswer(label)}
              sx={{
                mb: 2,
                bgcolor: selectedAnswer === label ? '#d3d3f5' : 'white',
                borderRadius: 2,
                px: 3,
                py: 2,
                width: "100%",
                maxWidth: 400,
                boxShadow: 2,
                textAlign: "left",
                display: "flex",
                gap: 2,
                fontWeight: "bold",
              }}
            >
              <Box
                sx={{
                  bgcolor: "#f2ebf9",
                  color: "#000",
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {label}
              </Box>
              {text}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Bottom Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 4,
          px: 1,
          position: "relative",
          bottom: 0,
          bgcolor: "white",
          width: "100% !important",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 150 }}>
          <LinearProgress
            variant="determinate"
            value={progressValue}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "#f0f0f0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#00D26A",
              },
            }}
          />
          <Typography
            variant="caption"
            sx={{ mt: 1, display: "block", textAlign: "center" }}
          >
            {currentQuestionIndex + 1}/{questions.length}
          </Typography>
        </Box>

        <Button
          variant="contained"
          disabled={!selectedAnswer}
          onClick={async () => {
            console.log("Selected:", selectedAnswer);
            console.log("Correct:", questions[currentQuestionIndex].correctAnswer);
            await handleAnswerSubmit();

            if (currentQuestionIndex < questions.length - 1) {
              setCurrentQuestionIndex((prev) => prev + 1);
              setSelectedAnswer(null);
              setHint(null);
            } else {
              navigate("/quiz-finished", { state: { userId: currentUser.id, quizId } });
            }
          }}
          sx={{
            bgcolor: "#8181d8",
            color: "#fff",
            borderRadius: 2,
            px: 4,
            py: 1,
            fontWeight: "bold",
            mt: 1,
            mb: 1,
            opacity: !selectedAnswer ? 0.5 : 1,
            cursor: !selectedAnswer ? "not-allowed" : "pointer",
          }}
        >
          {currentQuestionIndex < questions.length - 1 ? "CONTINUE" : "DONE"}
        </Button>
      </Box>
    </Box>
  );
};

export default QuizPage;
