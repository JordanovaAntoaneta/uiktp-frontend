import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { linkBase } from "../linkBase";
import { EditQuestionInterface } from "../interfaces/EditQuestionInterface";

type SelectedAnswers = {
  [index: number]: {
    questionId: number;
    selectedAnswer: string;
  };
};

type ChoiceKey = "A" | "B" | "C";
const choiceKeys: ChoiceKey[] = ["A", "B", "C"];

const QuestionsProfPage = () => {
  const location = useLocation();
  const { quizId, questions, subject } = location.state || {};

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEditable, setIsEditable] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});

  const [editData, setEditData] = useState<EditQuestionInterface>({
    text: "",
    choiceA: "",
    choiceB: "",
    choiceC: "",
    correctAnswer: "",
    points: 0,
    quizId: quizId || 0,
  });

  const currentQuestion = questions?.[currentIndex];
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const response = await fetch(`${linkBase}/User/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setCurrentUser(userData);
      }
    };

    getCurrentUser();
  }, []);

  useEffect(() => {
    if (currentQuestion) {
      setEditData({
        text: currentQuestion.text || "",
        choiceA: currentQuestion.choiceA || "",
        choiceB: currentQuestion.choiceB || "",
        choiceC: currentQuestion.choiceC || "",
        correctAnswer: currentQuestion.correctAnswer || "",
        points: currentQuestion.points || 0,
        quizId: quizId,
      });

      if (!selectedAnswers[currentIndex]) {
        setSelectedAnswers((prev) => ({
          ...prev,
          [currentIndex]: {
            questionId: currentQuestion.id,
            selectedAnswer: "",
          },
        }));
      }
    }
  }, [currentIndex, currentQuestion, quizId]);

  const handleEditToggle = () => {
    if (isEditable) {
      handleSaveChanges();
    } else {
      setIsEditable(true);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const questionId = currentQuestion?.id;
      const accessToken = localStorage.getItem("accessToken");

      if (!questionId || !accessToken) {
        alert("Missing required data to save changes.");
        return;
      }

      const response = await fetch(`${linkBase}/Question/edit?quiestionid=${questionId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const updatedQuestions = [...questions];
      updatedQuestions[currentIndex] = {
        ...updatedQuestions[currentIndex],
        ...editData,
      };

      location.state.questions = updatedQuestions;

      alert("Changes saved successfully!");
      setIsEditable(false);
    } catch (err) {
      console.error(err);
      alert("Error saving changes.");
    }
  };

  const handleAnswerSelect = (choice: ChoiceKey) => {
    const choiceValue = editData[`choice${choice}` as keyof EditQuestionInterface];

    if ([editData.choiceA, editData.choiceB, editData.choiceC].includes(choiceValue as string)) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [currentIndex]: {
          questionId: Number(currentQuestion.id),
          selectedAnswer: String(choiceValue),
        },
      }));
    }
  };

  const handleChoiceChange = (choice: ChoiceKey, value: string) => {
    setEditData((prev) => ({
      ...prev,
      [`choice${choice}`]: value,
    }));

    const selected = selectedAnswers[currentIndex];
    if (selected?.selectedAnswer === editData[`choice${choice}` as keyof EditQuestionInterface]) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [currentIndex]: {
          questionId: Number(currentQuestion.id),
          selectedAnswer: value,
        },
      }));
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsEditable(false);
    }
  };

  
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsEditable(false);
    }
  };

  const handleDeleteQuestion = async () => {
    const questionId = currentQuestion?.id;
    const accessToken = localStorage.getItem("accessToken");

    if (!questionId || !accessToken) {
      alert("Missing question ID or access token.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this question?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${linkBase}/Question/delete?questionid=${questionId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      alert("Question deleted successfully!");

      const updatedQuestions = [...questions];
      updatedQuestions.splice(currentIndex, 1);

      if (updatedQuestions.length === 0) {
        navigate("/generate-quiz");
      } else {
        location.state.questions = updatedQuestions;
        setCurrentIndex(Math.max(0, currentIndex - 1));
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting question.");
    }
  };

  const handleDoneClick = async () => {
    await handleSaveChanges();
    navigate("/quiz-created", {state: {subject}}); //za prakjanje id na kviz
  };

  if (!currentUser) return <div>Loading user data...</div>;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: "#f0f2ff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 6,
      }}
    >
      <Box
        sx={{
          width: 600,
          bgcolor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
          px: 5,
          py: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {currentQuestion ? (
          <>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
              Question {currentIndex + 1}
            </Typography>

            {isEditable ? (
              <TextField
                label="Question Text"
                fullWidth
                value={editData.text}
                onChange={(e) => setEditData({ ...editData, text: e.target.value })}
                sx={{ mb: 2 }}
              />
            ) : (
              <Typography
                variant="body1"
                sx={{ mb: 3, textAlign: "center", fontWeight: 500 }}
              >
                {currentQuestion.text}
              </Typography>
            )}

            {choiceKeys.map((label) => (
              <Box
                key={label}
                sx={{ display: "flex", alignItems: "center", mb: 2, width: "100%" }}
              >
                <Box
                  sx={{
                    bgcolor: "#e0d9d9",
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mr: 2,
                  }}
                >
                  {label}
                </Box>
                <TextField
                  value={editData[`choice${label}` as keyof EditQuestionInterface]}
                  onChange={(e) => handleChoiceChange(label, e.target.value)}
                  onClick={() => handleAnswerSelect(label)}
                  fullWidth
                  disabled={!isEditable}
                  sx={{
                    bgcolor: !isEditable ? "#f5f4f9" : "#ffffff",
                    borderRadius: 2,
                  }}
                />
              </Box>
            ))}

            {isEditable && (
              <>
                <TextField
                  label="Correct Answer"
                  fullWidth
                  value={editData.correctAnswer}
                  onChange={(e) =>
                    setEditData({ ...editData, correctAnswer: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Points"
                  fullWidth
                  type="number"
                  value={editData.points}
                  onChange={(e) =>
                    setEditData({ ...editData, points: parseInt(e.target.value) })
                  }
                  sx={{ mb: 2 }}
                />
              </>
            )}

            <Button
              onClick={handleEditToggle}
              variant="contained"
              sx={{
                bgcolor: isEditable ? "#d19c9c" : "#b6b1c9",
                width: "100%",
                mt: 1,
                borderRadius: 2,
              }}
            >
              {isEditable ? "Save Changes" : "Edit the question"}
            </Button>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                mt: 4,
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Button
                onClick={handleDeleteQuestion}
                variant="outlined"
                color="error"
                sx={{
                  borderRadius: 2,
                  borderColor: "#f44336",
                  color: "#f44336",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "#d32f2f",
                    backgroundColor: "#fdecea",
                  },
                }}
              >
                Delete
              </Button>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {/* buttons */}

                <Button
                  onClick={handleDoneClick}
                  disabled={currentIndex !== questions.length - 1}
                  variant="contained"
                  sx={{
                    bgcolor:
                      currentIndex === questions.length - 1
                        ? "#4caf50"
                        : "#c6c2d1",
                    borderRadius: 2,
                    px: 4,
                  }}
                >
                  Done
                </Button>

                <Button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  variant="contained"
                  sx={{
                    bgcolor: currentIndex === 0 ? "#c6c2d1" : "#6e64e8",
                    borderRadius: 2,
                    px: 4,
                    width: 110
                  }}
                >
                  Previous
                </Button>

      

                <Button
                  onClick={handleNext}
                  disabled={currentIndex === questions.length - 1}
                  variant="contained"
                  sx={{ bgcolor: "#6e64e8", borderRadius: 2, px: 4 }}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          <Typography variant="h6" color="error">
            No questions found!
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default QuestionsProfPage;
