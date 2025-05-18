import {Box, Button, ButtonGroup, IconButton, Paper, Typography,} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/GeneralHomePage/logo.png";
import profileIcon from "../assets/profile-icon.png";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import "../styles/QuizStudentDetailsPage.css";
import pdf from "../assets/QuizStudentDetailsPage/pdf.png";
import pinkPdf from "../assets/QuizProfDetailsPage/pink pdf.png";
//za da go povlecham quiz od  quizesprofpage
import { useLocation } from "react-router-dom";
//za lista na students da bide samo nadolu
import Popper from "@mui/material/Popper";
import type { PopperProps } from "@mui/material/Popper";

import board from "../assets/QuizProfDetailsPage/board.png";

//ovie se za checkbox-ot
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { UserInterface } from "../interfaces/UserInterface";
import { AllUsersInterface } from "../interfaces/AllUsersInterface";
import { linkBase } from "../linkBase";
import { QuizInterface } from "../interfaces/QuizInterface";
import { object } from "prop-types";


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
];


const CustomPopper = (props: PopperProps) => (
  <Popper
    {...props}
    placement="bottom-start"
    modifiers={[
      {
        name: "preventOverflow",
        options: {
          altBoundary: true,
          tether: false,
        },
      },
    ]}
  />
);

//do tuka

const paperStyle = {
  padding: 2,
  marginBottom: 1,
  width: "full",
  display: "flex",
  justifyContent: "space-around",
  height: "60px",
  alignItems: "center",
  fontFamily: "'Montserrat', sans-serif !important",
};

const middleButtons = {
  gap: 2,
  "& .MuiButton-root": {
    border: "none !important",
  },
  "& .MuiButtonGroup-grouped:not(:last-of-type)": {
    borderRight: "none !important",
  },
  fontFamily: "'Montserrat', sans-serif !important",
};

const rightButtons = {
  gap: 2,
  background: "transparent",
  boxShadow: "none",
  "& .MuiButton-root": {
    borderRadius: "7px",
    minWidth: 100,
    boxShadow: "none",
    border: "none",
  },
  ".css-r6fbpn-MuiButtonGroup-root .MuiButton-root ": {
    maxHeight: "fit- content",
  },
  "& .MuiButtonGroup-grouped:not(:last-of-type)": {
    border: "none",
  },
  fontFamily: "'Montserrat', sans-serif !important",
};

const cloudTextStyle = {
  fontFamily: "Abhaya Libre, serif",
  fontWeight: "700",
  textAlign: "center",
  fontSize: "1rem",
  color: "rgb(106, 62, 167)",
  marginTop: 13,
  marginBottom: 2,
  marginLeft: 5,
  marginRight: 5,
};

//mila
const updatedCloudTextStyle = {
  fontFamily: "Abhaya Libre, serif",
  fontWeight: "700",
  textAlign: "left", 
  color: "rgb(106, 62, 167)",
  margin: 0, 
};

const TitleStyle = {
  fontFamily: "'Montserrat', sans-serif !important",
  fontWeight: 300,
  textAlign: "left",
};

const QuizProfDetailsPage: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserInterface | null>(null);

  const [allUsers, setAllUsers] = useState<AllUsersInterface[] | null>(null);
  //lista za studenti
  const [studentUsers, setStudentUsers] = useState<AllUsersInterface[]>([]);
  //lista na site quizzes
  const [quizzes, setQuizzes] = useState<QuizInterface[]>([]);
  //za da go zemam quiz
  const location = useLocation();
  const { quizId, subject, title } = location.state || {};
  const [quiz, setQuiz] = useState<QuizInterface | null>(null);
  //za da znam koi se invited students
  const [selectedUsers, setSelectedUsers] = useState<UserInterface[]>([]);
  const [invitedStudents, setInvitedStudents] = useState<number[]>([]);

  const getCurrentUser = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return null;

      const response = await fetch(`${linkBase}/User/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const userData = await response.json();
      setCurrentUser(userData);
      return userData;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      return null;
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    console.log("Current user:", currentUser);
  }, [currentUser]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  const [isLoggedIn, setIsLoggedIn] = React.useState(
    !!localStorage.getItem("accessToken")
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("No access token found");
        const response = await fetch(`${linkBase}/User/all`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data: AllUsersInterface[] = await response.json();
        setAllUsers(data);
        const students = data.filter((user) => user.type === "Student");
        setStudentUsers(students);

        console.log("All users:", data);
        console.log("Student users:", students);
        
        setAllUsers(studentUsers);

        console.log("Student users:", studentUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
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

  const downloadQuizFile = async (quizId: number) => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No access token found");
    try {
      const response = await fetch(
        `http://localhost:8090/api/v1/Quiz/download-file?quizid=${quizId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to download file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `quiz_${quizId}.pdf`; 
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download quiz file error:", error);
    }
  };
  //sega za export
  const exportQuizStatistics = async (quizId: number) => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No access token found");
    try {
      const response = await fetch(
        `http://localhost:8090/api/v1/Quiz/quiz-statistics-export?quizid=${quizId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to export statistics");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `quiz_${quizId}_statistics.pdf`; // или друг формат
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export statistics error:", error);
    }
  };
  //prvo zemam site quizes
  const getQuizzes = async (userId: number) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return null;

      const response = await fetch(
        `${linkBase}/Quiz/creator-quizzes?userid=${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const quizzes = await response.json();
      setQuizzes(quizzes);
      return quizzes;
    } catch (error) {
      console.error("Failed to fetch quizzes:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchUserAndQuizzes = async () => {
      const user: UserInterface = await getCurrentUser();
      if (user) {
        await getQuizzes(user.id);
      }
    };

    fetchUserAndQuizzes();
  }, []);

  useEffect(() => {
    console.log("Current user:", currentUser);
    console.log("Quizzes:", quizzes);
  }, [quizzes]);

  //sega da go zemam quiz shto e praten od localhost:3000/quizes-teacher
  useEffect(() => {
    if (quizId && quizzes.length > 0) {
      const selected = quizzes.find((q) => q.id === quizId);
      setQuiz(selected || null);
      console.log("Selected quiz:", selected);
    }
  }, [quizId, quizzes]);

  const handleSendInvitation = async (studentId: number) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    try {
      const response = await fetch(
        // "http://localhost:8090/api/v1/Quiz/add-participant",
        `${linkBase}/Quiz/add-participant`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: studentId,
            quizId: quiz?.id, // ова мора да биде достапно од родителскиот проп или стейт
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send invitation");
      }

      setInvitedStudents((prev) => [...prev, studentId]); // додади го во листата на поканети
    } catch (error) {
      console.error("Error sending invitation:", error);
    }
  };

  //i ovie dole dve se za checkbox-ot
  const [inputValue, setInputValue] = React.useState("");
  const [value, setValue] = React.useState([]);
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Navigation menu */}
      <Paper elevation={2} sx={paperStyle}>
        <img src={logo} alt="Logo" style={{ width: "auto", height: "99%" }} />
        {isLoggedIn ? (
          currentUser?.type === "Professor" ? (
            <ButtonGroup
              variant="text"
              aria-label="Basic button group"
              sx={middleButtons}
            >
              <Button onClick={() => navigate("/")} sx={{ color: "black" }}>
                Home
              </Button>
              <Button
                onClick={() => navigate("/quizes-teacher")}
                sx={{ color: "black" }}
              >
                Quizzes
              </Button>
              <Button onClick={() => navigate("/help")} sx={{ color: "black" }}>
                Help
              </Button>
            </ButtonGroup>
          ) : (
            <ButtonGroup
              variant="text"
              aria-label="Basic button group"
              sx={middleButtons}
            >
              <Button onClick={() => navigate("/")} sx={{ color: "black" }}>
                Home
              </Button>
              <Button
                onClick={() => navigate("/quizes-student")}
                sx={{ color: "black" }}
              >
                Quizzes
              </Button>
              <Button onClick={() => navigate("/help")} sx={{ color: "black" }}>
                Help
              </Button>
              <Button
                onClick={() => navigate("/my-invites")}
                sx={{ color: "black" }}
              >
                Invites
              </Button>
            </ButtonGroup>
          )
        ) : (
          <ButtonGroup
            variant="text"
            aria-label="Basic button group"
            sx={middleButtons}
          >
            <Button onClick={() => navigate("/")} sx={{ color: "black" }}>
              Home
            </Button>
            <Button onClick={() => navigate("/login")} sx={{ color: "black" }}>
              Quizzes
            </Button>
            <Button onClick={() => navigate("/help")} sx={{ color: "black" }}>
              Help
            </Button>
          </ButtonGroup>
        )}

        {isLoggedIn ? (
          <Box>
            <ButtonGroup sx={rightButtons}>
              <Button
                onClick={handleLogout}
                sx={{ ...rightButtons, bgcolor: "#E3E3E3", borderRadius: 2 }}
              >
                Log out
              </Button>
            </ButtonGroup>
            <Button onClick={() => navigate("/user-details")}>
              <img
                src={profileIcon}
                alt="profile icon"
                style={{ width: "40%", height: "auto" }}
              />
            </Button>
          </Box>
        ) : (
          <ButtonGroup sx={rightButtons}>
            <Button
              onClick={() => navigate("/login")}
              sx={{
                ...rightButtons,
                bgcolor: "#E3E3E3",
                borderRadius: 2,
                color: "black",
              }}
            >
              Log In
            </Button>
            <Button
              onClick={() => navigate("/user-type")}
              sx={{
                ...rightButtons,
                bgcolor: "rgb(106, 62, 167)",
                borderRadius: 2,
                color: "white",
              }}
            >
              Sign up
            </Button>
          </ButtonGroup>
        )}
      </Paper>

      <Box sx={{ mb: "20px" }}>
        <Box
          className="quizTitle"
          sx={{
            bgcolor: "#eef0fe",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            width: "100%",
            px: 6,
            py: 1,
            boxSizing: "border-box",
          }}
        >
          <Typography
            sx={{
              ...updatedCloudTextStyle,
              fontSize: "40pt",
              lineHeight: 1,
              mb: 1,
              wordBreak: "break-word",
              whiteSpace: "normal",
              mt: 3,
            }}
          >
            {subject || title}
            {/* // {quiz?.title || "Quiz Title"} */}
          </Typography>
        </Box>

        {/* Quiz Title Content Section */}
        <Box
          className="quizCreate"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 8,
            pb: 10,
          }}
        >
          {/* Left side: PDF and description */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginLeft: "50px",
                  cursor: "pointer",
                }}
                onClick={() => quiz?.id && downloadQuizFile(quiz.id)}
              >
                <img
                  src={pdf}
                  alt="Pdf Image"
                  style={{ width: "150px", height: "150px" }}
                />
                <Typography sx={{ mt: 1 }}>Download PDF</Typography>
              </Box>
              <Typography sx={{ ml: 10, fontSize: "1.2rem", fontWeight: 500 }}>
                Quiz Explanation Document
              </Typography>
            </Box>
          </Box>

          {/* Instruction Text */}
          <Box
            sx={{
              marginTop: 10,
              marginLeft: "50px",
              maxWidth: "400px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: "1rem",
                marginBottom: 2,
                textAlign: "left",
                fontWeight: "bold",
                fontFamily: "'Montserrat', sans-serif !important",
              }}
            >
              Review the quiz as students will see it. Ensure all questions and
              answers are correctly generated.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#6C63FF",
                textTransform: "none",
                alignSelf: "flex-start",
              }}
            >
              Preview Quiz
            </Button>
          </Box>
        </Box>

        {/* Right side: Checkbox */}
        <Autocomplete
          multiple
          options={studentUsers}
          disableCloseOnSelect
          value={value}
          onChange={(event, newValue) => {
            setValue(Object);
          }} //tuka beshe newValue ili nes, Object jas dodadov
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            const isInvited = invitedStudents.includes(option.id);
            return (
              <li
                key={key}
                {...optionProps}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 12px",
                }}
              >
                <span>
                  {option.firstName} {option.lastName}
                </span>
                <Button
                  variant="outlined"
                  size="small"
                  disabled={isInvited}
                  onClick={() => handleSendInvitation(option.id)}
                >
                  {isInvited ? "Invited" : "Send Invitation"}
                </Button>
              </li>
            );
          }}
          renderTags={() => null}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Students"
              placeholder="Select students"
            />
          )}
          style={{ width: 500 }}
          popupIcon={null}
          PopperComponent={CustomPopper}
          slotProps={{
            paper: {
              sx: {
                maxHeight: 300,
                overflowY: "auto",
              },
            },
          }}
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginLeft: "50px",
            cursor: "pointer",
          }}
          onClick={() => quiz?.id && exportQuizStatistics(quiz.id)}
        >
          <img
            src={pinkPdf}
            alt="Pdf Image"
            style={{ width: "150px", height: "150px" }}
          />
          <Typography sx={{ mt: 1 }}>Export Results</Typography>
        </Box>
        <Typography sx={{ ml: 10, fontSize: "1.2rem", fontWeight: 500 }}>
          Download the quiz results in PDF format for analysis and reporting.
        </Typography>
      </Box>

      {/* Footer */}
      <Paper sx={{ ...paperStyle, marginBottom: "none", bgcolor: "#AFB3FF" }}>
        <img src={logo} alt="Logo" style={{ width: "auto", height: "99%" }} />
        {isLoggedIn ? (
          currentUser?.type === "Professor" ? (
            <ButtonGroup
              variant="text"
              aria-label="Basic button group"
              sx={middleButtons}
            >
              <Button onClick={() => navigate("/")} sx={{ color: "black" }}>
                Home
              </Button>
              <Button
                onClick={() => navigate("/quizes-teacher")}
                sx={{ color: "black" }}
              >
                Quizzes
              </Button>
              <Button onClick={() => navigate("/help")} sx={{ color: "black" }}>
                Help
              </Button>
            </ButtonGroup>
          ) : (
            <ButtonGroup
              variant="text"
              aria-label="Basic button group"
              sx={middleButtons}
            >
              <Button onClick={() => navigate("/")} sx={{ color: "black" }}>
                Home
              </Button>
              <Button
                onClick={() => navigate("/quizes-student")}
                sx={{ color: "black" }}
              >
                Quizzes
              </Button>
              <Button onClick={() => navigate("/help")} sx={{ color: "black" }}>
                Help
              </Button>
              <Button
                onClick={() => navigate("/my-invites")}
                sx={{ color: "black" }}
              >
                Invites
              </Button>
            </ButtonGroup>
          )
        ) : (
          <ButtonGroup
            variant="text"
            aria-label="Basic button group"
            sx={middleButtons}
          >
            <Button onClick={() => navigate("/")} sx={{ color: "black" }}>
              Home
            </Button>
            <Button
              onClick={() => navigate("/quizes-teacher")}
              sx={{ color: "black" }}
            >
              Quizzes
            </Button>
            <Button onClick={() => navigate("/help")} sx={{ color: "black" }}>
              Help
            </Button>
          </ButtonGroup>
        )}

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <IconButton
            sx={{ color: "#656ED3" }}
            href="https://www.facebook.com/profile.php?id=61554727830080"
          >
            <Facebook />
          </IconButton>
          <IconButton
            sx={{ color: "#656ED3" }}
            href="https://www.instagram.com/edu_wiz_mk/"
          >
            <Instagram />
          </IconButton>
          <IconButton sx={{ color: "#656ED3" }} href="https://x.com/edu_wiz_mk">
            <Twitter />
          </IconButton>
        </Box>
      </Paper>

      <hr
        style={{
          width: "100%",
          border: "1px solidrgb(100, 101, 110)",
          margin: "0",
        }}
      />

      <Paper
        sx={{
          ...paperStyle,
          margin: "none",
          bgcolor: "#AFB3FF",
          padding: "none",
        }}
      >
        <Typography sx={{ fontFamily: "'Montserrat', sans-serif !important" }}>
          All rights reserved. Copyright © 2025
        </Typography>
      </Paper>
    </div>
  );
};

export default QuizProfDetailsPage;
