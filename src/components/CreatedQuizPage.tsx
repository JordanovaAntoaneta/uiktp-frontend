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
import { CreateQuizInterface } from "../interfaces/CreateQuizInterface";

const Input = styled('input')({ display: 'none' });

const CreatedQuizPage: React.FC = () => {
  const navigate = useNavigate();

  const [studentUsers, setStudentUsers] = useState<AllUsersInterface[]>([]);
  const [topic, setTopic] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('No access token found');
        const response = await fetch('http://localhost:8090/api/v1/User/all', {
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

  const isFormValid = topic.trim() !== '' && file !== null;

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

    const formData = new FormData();
    formData.append("Name", topic);
    formData.append("File", file);

    try {
      const response = await fetch('http://localhost:8090/api/v1/Quiz', {
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
      // navigate('/questions', { state: { quizId: createdQuiz.id } });
    } catch (error) {
      setSnackbarMessage("Error creating quiz");
      setSnackbarOpen(true);
    }
  }, [topic, file]);

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
