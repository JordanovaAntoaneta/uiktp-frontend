import { Box, Button, ButtonGroup, IconButton, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/GeneralHomePage/logo.png";
import profileIcon from "../assets/profile-icon.png";
//import "../styles/QuizesProf.css"
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
//import loginImg from "../assets/LogInUser/login-image.png";
import "../styles/QuizStudentDetailsPage.css"
import computer from "../assets/QuizStudentDetailsPage/computer.png";
import pdf from "../assets/QuizStudentDetailsPage/pdf.png";
import { QuizInterface } from "../interfaces/QuizInterface";
import { UserInterface } from "../interfaces/UserInterface";
import { linkBase } from "../linkBase";

const paperStyle = {
    padding: 2,
    marginBottom: 1,
    width: 'full',
    display: 'flex',
    justifyContent: 'space-around',
    height: '60px',
    alignItems: 'center',
    fontFamily: "'Montserrat', sans-serif !important",
}

const middleButtons = {
    gap: 2,
    '& .MuiButton-root': {
        border: 'none !important',
    },
    '& .MuiButtonGroup-grouped:not(:last-of-type)': {
        borderRight: 'none !important',
    },
    fontFamily: "'Montserrat', sans-serif !important",
}

const rightButtons = {
    gap: 2,
    background: 'transparent',
    boxShadow: 'none',
    '& .MuiButton-root': {
        borderRadius: '7px',
        minWidth: 100,
        boxShadow: 'none',
        border: 'none',
    },
    '.css-r6fbpn-MuiButtonGroup-root .MuiButton-root ': {
        maxHeight: 'fit- content',
    },
    '& .MuiButtonGroup-grouped:not(:last-of-type)': {
        border: 'none',
    },
    fontFamily: "'Montserrat', sans-serif !important",
}

const cloudTextStyle = {
    fontFamily: "Abhaya Libre, serif",
    fontWeight: '700',
    textAlign: 'center',
    fontSize: '1rem',
    color: 'rgb(106, 62, 167)',
    marginTop: 13,
    marginBottom: 2,
    marginLeft: 5,
    marginRight: 5,
}

//mila
const updatedCloudTextStyle = {
    fontFamily: "Abhaya Libre, serif",
    fontWeight: '700',
    textAlign: 'left', // LEFT align the text
    color: 'rgb(106, 62, 167)',
    margin: 0,         // Remove all margins
}

const TitleStyle = {
    fontFamily: "'Montserrat', sans-serif !important",
    fontWeight: 300,
    textAlign: 'left'
}

const QuizStudentDetailsPage: React.FC = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState<UserInterface | null>(null);

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
        navigate('/');
    };

    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));

    return (
        <div style={{ minHeight: '100vh' }}>
            <Paper elevation={2} sx={paperStyle}>
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
                        <Button onClick={() => navigate('/login')} sx={{ color: "black" }}>Quizzes</Button>
                        <Button onClick={() => navigate('/help')} sx={{ color: "black" }}>Help</Button>
                    </ButtonGroup>
                )}

                {isLoggedIn ? (
                    <Box>
                        <ButtonGroup sx={rightButtons}>
                            <Button onClick={handleLogout} sx={{ ...rightButtons, bgcolor: "#E3E3E3", borderRadius: 2 }}>Log out</Button>
                        </ButtonGroup>
                        <Button onClick={() => navigate('/user-details')}>
                            <img src={profileIcon} alt="profile icon" style={{ width: '40%', height: 'auto' }} />
                        </Button>
                    </Box>
                ) : (
                    <ButtonGroup sx={rightButtons}>
                        <Button onClick={() => navigate('/login')} sx={{ ...rightButtons, bgcolor: "#E3E3E3", borderRadius: 2, color: "black" }}>Log In</Button>
                        <Button onClick={() => navigate('/user-type')} sx={{ ...rightButtons, bgcolor: "rgb(106, 62, 167)", borderRadius: 2, color: "white" }}>Sign up</Button>
                    </ButtonGroup>
                )}
            </Paper>


            <Box sx={{ mb: '20px' }}>
                <Box className="quizTitle"
                    sx={{
                        bgcolor: '#eef0fe',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        width: '100%',
                        px: 6,
                        py: 1,
                        boxSizing: 'border-box',

                    }}>
                    <Typography
                        sx={{
                            ...updatedCloudTextStyle,
                            fontSize: '40pt',
                            lineHeight: 1,
                            mb: 1,
                            wordBreak: 'break-word',
                            whiteSpace: 'normal',
                            mt: 3
                        }}>
                        Algebra
                    </Typography>

                    <Typography
                        sx={{
                            ...updatedCloudTextStyle,
                            fontSize: '10pt',
                            lineHeight: 1.2,
                            wordBreak: 'break-word',
                            whiteSpace: 'normal',
                        }}>
                        Category: Mathematics
                    </Typography>
                </Box>

                {/* Quiz Title Content Section */}
                <Box className="quizCreate" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 8, pb: 10 }}>

                    {/* Left side: PDF and description */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '50px' }}>
                                <img src={pdf} alt="Pdf Image" style={{ width: '150px', height: '150px' }} />
                                <Typography sx={{ mt: 1 }}>Download PDF</Typography>
                            </Box>
                            <Typography sx={{ ml: 10, fontSize: '1.2rem', fontWeight: 500 }}>
                                Quiz Explanation Document
                            </Typography>
                        </Box>

                        {/* Instruction Text */}
                        <Box sx={{ marginTop: 10, marginLeft: '50px', maxWidth: '400px', display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h4" sx={{ fontSize: '1rem', marginBottom: 2, textAlign: 'left', fontWeight: 'bold', fontFamily: "'Montserrat', sans-serif !important" }}>
                                Click 'Start Quiz' to begin. Answer all questions to the best of your ability. Good luck!
                            </Typography>
                            <Button variant="contained"
                                sx={{ backgroundColor: '#6C63FF', textTransform: 'none', alignSelf: 'flex-start' }}
                                onClick={() => navigate('/quiz-preview')}>
                                Start Quiz
                            </Button>
                        </Box>
                    </Box>

                    {/* Right side: Computer image */}
                    <Box className="image-container" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={computer} alt="Computer Image" style={{ width: '350px', height: '350px' }} />
                    </Box>
                </Box>
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
                    <IconButton sx={{ color: "#656ED3" }} href="https://www.facebook.com/profile.php?id=61554727830080">
                        <Facebook />
                    </IconButton>
                    <IconButton sx={{ color: "#656ED3" }} href="https://www.instagram.com/edu_wiz_mk/">
                        <Instagram />
                    </IconButton>
                    <IconButton sx={{ color: "#656ED3" }} href="https://x.com/edu_wiz_mk">
                        <Twitter />
                    </IconButton>
                </Box>
            </Paper>

            <hr style={{ width: '100%', border: '1px solidrgb(100, 101, 110)', margin: '0' }} />

            <Paper sx={{ ...paperStyle, margin: 'none', bgcolor: '#AFB3FF', padding: 'none' }}>
                <Typography sx={{ fontFamily: "'Montserrat', sans-serif !important" }}>All rights reserved. Copyright © 2025</Typography>
            </Paper>

        </div>
    );
}

export default QuizStudentDetailsPage;

