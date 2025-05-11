import { Box, Button, TextField, Typography } from "@mui/material";
import illustration from "../assets/CreatedQuizPage/illustration.png";
import glass from "../assets/CreatedQuizPage/magnifying glass.png";

import { useNavigate } from "react-router-dom";

import { AllUsersInterface } from "../interfaces/AllUsersInterface";

//za checkbox
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { useState, useEffect } from "react";

import { CreateQuizInterface } from "../interfaces/CreateQuizInterface";
import { error } from "console";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Input = styled('input')({
  display: 'none',
});


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const CreatedQuizPage: React.FC = () => {
  const navigate = useNavigate();

  //ova e za site useri
  const [allUsers, setAllUsers] = useState<AllUsersInterface[]>([]);

  //ova otposle dodadov za studenti
  const [studentUsers, setStudentUsers] = useState<AllUsersInterface[]>([]);

  //ova e za text fields da mora da se popolneti pred next da se klikne
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<AllUsersInterface[]>([]);

  //alert deka ne e prikacen fajl
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // zemam token od localStorage
        const token = localStorage.getItem('accessToken');
        console.log("Token:", token);

        if (!token) {
          console.error('No access token found');
          return;
        }


        // pravam povik do api
        const response = await fetch('http://localhost:8090/api/v1/User/all', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${ token }`,
          'Content-Type': 'application/json',
          },
    });


  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  const data: AllUsersInterface[] = await response.json();

  //ova sega dodadov
  setAllUsers(data);
  const students = data.filter(user => user.type === 'Student');
  setStudentUsers(students);

  console.log("All users:", data);
  console.log("Student users:", students);
  //do tuka

  // Step 3: Update na state so useri filtrirani
  setAllUsers(studentUsers);

  console.log("Student users:", studentUsers);

} catch (error) {
  console.error('Error fetching users:', error);
}

      
    };

fetchUsers();
}, []);

useEffect(() => {
  console.log("Users:", allUsers);
}, [allUsers]);

//ova sea dodadov
useEffect(() => {
  console.log("Updated Student Users:", studentUsers);
}, [studentUsers]);



const isFormValid = topic.trim() !== '' && file !== null


//handleNext - Antoaneta
const handleNext = async () => {
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

  const quizPayload: CreateQuizInterface = {
    Name: topic,
    CreatedAt: new Date().toISOString(),
    File: topic.toLowerCase().replace(/\s+/g, "_") + ".pdf",
  };

  try {
    console.log("Sending payload:", JSON.stringify(quizPayload, null, 2));

    const response = await fetch('http://localhost:8090/api/v1/Quiz', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quizPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      setSnackbarMessage("Failed to create quiz: " + errorText);
      setSnackbarOpen(true);
      return;
    }

    const createdQuiz: CreateQuizInterface = await response.json();
    console.log("Created quiz:", createdQuiz);

    // navigate('/questions', { state: { quizId: createdQuiz.id } });

  } catch (error) {
    setSnackbarMessage("Error creating quiz");
    setSnackbarOpen(true);
    console.error("Error creating quiz:", error);
  }
};


const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFile = event.target.files?.[0];
  if (!selectedFile) return;

  if (selectedFile.type !== 'application/pdf') {
    alert('Only PDF files are allowed.');
    event.target.value = '';
    return;
  }

  setFile(selectedFile);
};


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
        width: 1000,
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
      {/* Logo Circle */}
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          bgcolor: "#eee6fc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <img src={glass} alt="Logo" width={35} />
      </Box>

      {/* Centered Title and Subtitle */}
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={1}>
        Generate Your Quiz
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        textAlign="center"
        mb={4}
        maxWidth="600px"
      >
        Enter a topic and keywords below, then click ‘Generate with AI’ to create your quiz.
      </Typography>

      {/* Two-column layout */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        {/* Left: Illustration */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pr: 2,
          }}
        >
          <img
            src={illustration}
            alt="Illustration"
            style={{ width: "100%", maxWidth: "300px" }}
          />
        </Box>

        {/* Right: Form */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            pl: 2,
          }}
        >
          <TextField
            fullWidth
            label="Quiz Topic"
            variant="outlined"
            margin="normal"
            //za next
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />

          {/* File upload button - Antoaneta */}
          <label htmlFor="upload-pdf">
            <Input
              id="upload-pdf"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              Upload file
            </Button>
          </label>
          {file && (
            <Typography variant="body2" mt={1}>
              Selected file: {file.name}
            </Typography>
          )}

          <Box sx={{ marginTop: 2 }}>
           
          </Box>


          {/* <Button onClick={() => navigate('/questions')} */}
          <Button onClick={handleNext}
            variant="contained"
            // za valid na next
            disabled={!isFormValid}
            sx={{
              mt: 3,
              bgcolor: "#8181d8",
              borderRadius: 2,
              fontWeight: "bold",
              px: 6,
              py: 1.5,
              alignSelf: "flex-end",
              //za valid sl dve
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

export default CreatedQuizPage;