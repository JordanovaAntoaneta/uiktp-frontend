import React, { useState, useEffect, useCallback } from "react";
import {
  Box, Button, TextField, Typography, Snackbar
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import illustration from "../assets/CreatedQuizPage/illustration.png";
import glass from "../assets/CreatedQuizPage/magnifying glass.png";
import { useNavigate } from "react-router-dom";
import { AllUsersInterface } from "../interfaces/AllUsersInterface";
import { linkBase } from "../linkBase";

const Input = styled('input')({ display: 'none' });

const CreatedQuizPage: React.FC = () => {
  const navigate = useNavigate();

  const [studentUsers, setStudentUsers] = useState<AllUsersInterface[]>([]);
  const [topic, setTopic] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [numberOfQuestions, setNumberOfQuestions] = useState<string>("");
  const [newQuizQuestions, setNewQuizQuestions] = useState<any[]>([]);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) return null;

        const response = await fetch(`${linkBase}/User/me`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const userData = await response.json();
        setCurrentUser(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    getCurrentUser();
  }, []);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('No access token found');
        const response = await fetch(`${linkBase}/User/all`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Failed to fetch users');
        const data: AllUsersInterface[] = await response.json();
        setStudentUsers(data.filter(user => user.type === 'Student'));
      } catch (error) {
        setSnackbarMessage((error as Error).message || "Error fetching users");
        setSnackbarOpen(true);
      }
    };
    fetchUsers();
  }, []);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    if (selectedFile.type !== 'application/pdf') {
      setSnackbarMessage('Only PDF files are allowed.');
      setSnackbarOpen(true);
      event.target.value = '';
      return;
    }
    setFile(selectedFile);
  }, []);

  const isFormValid = topic.trim() !== '' && file !== null && numberOfQuestions !== "" && Number(numberOfQuestions) > 0;

  const handleNext = useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setSnackbarMessage("No access token found");
      setSnackbarOpen(true);
      return;
    }

    if (!file) {
      setSnackbarMessage("Please upload a PDF file before proceeding.");
      setSnackbarOpen(true);
      return;
    }

    if (!currentUser || !currentUser.id) {
      setSnackbarMessage("User not loaded yet.");
      setSnackbarOpen(true);
      return;
    }

    if (!numberOfQuestions || isNaN(Number(numberOfQuestions)) || Number(numberOfQuestions) <= 0) {
      setSnackbarMessage("Please enter a valid number of questions.");
      setSnackbarOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("Name", topic);
    formData.append("UserCreatorId", currentUser.id.toString());
    formData.append("File", file);

    try {
      const response = await fetch(`${linkBase}/Quiz`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        setSnackbarMessage("Failed to create quiz: " + errorText);
        setSnackbarOpen(true);
        return;
      }

      const createdQuiz = await response.json();

      const generateQuestionsResponse = await fetch(`${linkBase}/Quiz/generate-questions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numberOfQuestions: Number(numberOfQuestions),
          subject: topic,
          quizId: createdQuiz.id
        }),
      });

      if (!generateQuestionsResponse.ok) {
        const errorText = await generateQuestionsResponse.text();
        setSnackbarMessage("Failed to generate questions: " + errorText);
        setSnackbarOpen(true);
        return;
      }

      const getQuestionsResponse = await fetch(
        `${linkBase}/Question/by-quizz?quizId=${createdQuiz.id}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!getQuestionsResponse.ok) {
        const errorText = await getQuestionsResponse.text();
        setSnackbarMessage("Failed to fetch questions: " + errorText);
        setSnackbarOpen(true);
        return;
      }

      const questions = await getQuestionsResponse.json();
      setNewQuizQuestions(questions);
      console.log("Questions fetched:", questions);

      navigate('/questions', { state: { quizId: createdQuiz.id, questions } });

    } catch (error) {
      setSnackbarMessage("Error creating quiz or generating/fetching questions");
      setSnackbarOpen(true);
    }
  }, [topic, file, currentUser, numberOfQuestions, navigate]);

  return (
    <Box sx={{
      minHeight: "100vh", width: "100%", bgcolor: "#f0f2ff",
      display: "flex", justifyContent: "center", alignItems: "center", py: 6,
    }}>
      <Box sx={{
        width: 1000, bgcolor: "#fff", borderRadius: 2, boxShadow: 3, px: 5, py: 6,
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>
        <Box sx={{
          width: 80, height: 80, borderRadius: "50%", bgcolor: "#eee6fc",
          display: "flex", alignItems: "center", justifyContent: "center", mb: 2,
        }}>
          <img src={glass} alt="Logo" width={35} />
        </Box>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={1}>
          Generate Your Quiz
        </Typography>
        <Typography variant="body2" color="textSecondary" textAlign="center" mb={4} maxWidth="600px">
          Enter a topic and keywords below, then click ‘Generate with AI’ to create your quiz.
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", pr: 2 }}>
            <img src={illustration} alt="Illustration" style={{ width: "100%", maxWidth: "300px" }} />
          </Box>
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", pl: 2 }}>
            <TextField
              fullWidth label="Quiz Topic" variant="outlined" margin="normal"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              required
              helperText={!topic.trim() && "Topic is required"}
              error={!topic.trim()}
            />
            <TextField
              fullWidth
              label="Number of questions"
              variant="outlined"
              margin="normal"
              value={numberOfQuestions}
              onChange={e => setNumberOfQuestions(e.target.value.replace(/[^0-9]/g, ""))}
              required
              type="number"
              inputProps={{ min: 1 }}
            />
            <label htmlFor="upload-pdf">
              <Input id="upload-pdf" type="file" accept="application/pdf" onChange={handleFileChange} />
              <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
                Upload file
              </Button>
            </label>
            {file && (
              <Typography variant="body2" mt={1}>
                Selected file: {file.name}
              </Typography>
            )}
            <Button
              onClick={handleNext}
              variant="contained"
              disabled={!isFormValid}
              sx={{
                mt: 3, bgcolor: "#8181d8", borderRadius: 2, fontWeight: "bold",
                px: 6, py: 1.5, alignSelf: "flex-end",
                opacity: !isFormValid ? 0.6 : 1,
                cursor: !isFormValid ? 'not-allowed' : 'pointer'
              }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert elevation={6} variant="filled" severity="error" onClose={() => setSnackbarOpen(false)}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default React.memo(CreatedQuizPage);
