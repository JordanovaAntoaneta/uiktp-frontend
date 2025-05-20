import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Paper, IconButton, ButtonGroup, Stack } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { UserInterface } from "../interfaces/UserInterface";
import logo from "../assets/GeneralHomePage/logo.png";
import profileIcon from "../assets/profile-icon.png";
import {
  paperStyle,
  middleButtons,
  rightButtons,
  buttonStyle2
} from "../styles/muiElementsStyle";
import { linkBase } from "../linkBase";

const EditQuizPage: React.FC = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quizName, setQuizName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [currentUser, setCurrentUser] = useState<UserInterface | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;
        const res = await fetch(`${linkBase}/User/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setCurrentUser(data);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async () => {
    if (!quizName.trim()) {
      alert("Quiz name cannot be empty.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("Name", quizName);
    formData.append("UserCreatorId", currentUser?.id.toString() || "");
    if (file) formData.append("File", file);

    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(`${linkBase}/Quiz/edit?quizid=${quizId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) throw new Error("Failed to update quiz");

      alert("Quiz updated successfully!");
      navigate('/quizes-teacher'); 
    } catch (err) {
      console.error("Error updating quiz:", err);
      alert("Error updating quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/quizes-teacher');
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <Paper elevation={2} sx={{ ...paperStyle }}>
        <img src={logo} alt="Logo" style={{ height: "99%" }} />

        <ButtonGroup variant="text" aria-label="nav buttons" sx={middleButtons}>
          <Button onClick={() => navigate("/")} sx={{ color: "black" }}>Home</Button>
          <Button onClick={() => navigate("/quizes-teacher")} sx={{ color: "black" }}>Quizzes</Button>
          <Button onClick={() => navigate("/help")} sx={{ color: "black" }}>Help</Button>
        </ButtonGroup>

        {isLoggedIn ? (
          <Box>
            <ButtonGroup sx={rightButtons}>
              <Button onClick={handleLogout} sx={{ bgcolor: "#E3E3E3", borderRadius: 2 }}>Log out</Button>
            </ButtonGroup>
            <Button onClick={() => navigate("/user-details")}>
              <img src={profileIcon} alt="profile icon" style={{ width: "40%" }} />
            </Button>
          </Box>
        ) : (
          <ButtonGroup sx={rightButtons}>
            <Button onClick={() => navigate("/login")} sx={{ bgcolor: "#E3E3E3", borderRadius: 2, color: "black" }}>Log In</Button>
            <Button onClick={() => navigate("/user-type")} sx={{ bgcolor: "rgb(106, 62, 167)", borderRadius: 2, color: "white" }}>Sign up</Button>
          </ButtonGroup>
        )}
      </Paper>


        {/* added za content */}
        {/* Full name and Type Section */}
      <Box sx={{ bgcolor: '#bec7ed', paddingTop: '20px !important', paddingLeft: '50px !important', paddingBottom: '20px' }}>
        <Stack direction="row" alignItems="center">
            <Box sx={{ marginLeft: '30px' }}>
                <Typography
                sx={{
                fontFamily: 'Abhaya Libre, serif',
                fontWeight: 700,
                fontSize: '40pt',
                color: '#3A3A75',
                textAlign: 'left !important',
                }}
                >
                Edit Quiz
                </Typography>
            </Box>
        </Stack>
      </Box>

      {/* Content */}
      <Box sx={{ flexGrow: 1, p: 4, backgroundColor: "#f2f2f2" }}>
        <Stack spacing={3} maxWidth={600}>
          <TextField
            fullWidth
            label="Quiz Name"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
          />
          <Button
            variant="contained"
            component="label"
            sx={{ width: 'fit-content', backgroundColor: "#EBB4D3" }}
          >
            Upload File 
            <input
              type="file"
              hidden
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </Button>
          {file && <Typography variant="body2">Selected file: {file.name}</Typography>}

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={handleCancel} disabled={loading}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit} disabled={loading} sx={{ backgroundColor: "#EBB4D3" }}>
              {loading ? "Saving..." : "Submit Changes"}
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Footer */}
      <Paper sx={{ ...paperStyle, marginBottom: 'none', bgcolor: '#AFB3FF' }}>
        <img src={logo} alt="Logo" style={{ width: 'auto', height: '99%' }} />
        {isLoggedIn ? (
          currentUser?.type === "Professor" ? (
            <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
              <Button onClick={() => navigate('/')} sx={{ color: "black" }}>Home</Button>
              <Button onClick={() => navigate('/quizes-teacher')} sx={{ color: "black" }}>Quizzes</Button>
              <Button onClick={() => navigate('/help')} sx={{ color: "black" }}>Help</Button>
            </ButtonGroup>
          ) : (
            <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
              <Button onClick={() => navigate('/')} sx={{ color: "black" }}>Home</Button>
              <Button onClick={() => navigate('/quizes-student')} sx={{ color: "black" }}>Quizzes</Button>
              <Button onClick={() => navigate('/help')} sx={{ color: "black" }}>Help</Button>
              <Button onClick={() => navigate('/my-invites')} sx={{ color: "black" }}>Invites</Button>
            </ButtonGroup>
          )
        ) : (
          <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
            <Button onClick={() => navigate('/')} sx={{ color: "black" }}>Home</Button>
            <Button onClick={() => navigate('/quizes-teacher')} sx={{ color: "black" }}>Quizzes</Button>
            <Button onClick={() => navigate('/help')} sx={{ color: "black" }}>Help</Button>
          </ButtonGroup>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <IconButton sx={{ color: "#656ED3" }} href="https://www.facebook.com/profile.php?id=61554727830080" target="_blank" rel="noopener">
            <Facebook />
          </IconButton>
          <IconButton sx={{ color: "#656ED3" }} href="https://www.instagram.com/edu_wiz_mk/" target="_blank" rel="noopener">
            <Instagram />
          </IconButton>
          <IconButton sx={{ color: "#656ED3" }} href="https://x.com/edu_wiz_mk" target="_blank" rel="noopener">
            <Twitter />
          </IconButton>
        </Box>
      </Paper>

      <hr style={{ width: '100%', border: '1px solid rgb(100, 101, 110)', margin: '0' }} />

      <Paper sx={{ ...paperStyle, margin: 'none', bgcolor: '#AFB3FF', padding: 'none' }}>
        <Typography sx={{ fontFamily: "'Montserrat', sans-serif !important" }}>
          All rights reserved. Copyright © 2025
        </Typography>
      </Paper>
    </Box>
  );
};

export default EditQuizPage;
