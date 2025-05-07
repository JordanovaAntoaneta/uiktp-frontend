import { Box, Button, ButtonGroup, Card, CardActionArea, CardContent, IconButton, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/GeneralHomePage/logo.png";
import profileIcon from "../assets/profile-icon.png";
import "../styles/QuizesProf.css"
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import loginImg from "../assets/LogInUser/login-image.png";
import { UserInterface } from "../interfaces/UserInterface";
import { QuizInterface } from "../interfaces/QuizInterface";

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

const buttonStyle2 = {
    color: "white",
    backgroundColor: "#EBB4D3",
    borderRadius: 2,
    fontSize: '1rem',
    '&:hover': {
        backgroundColor: '#e39bc8',
    },
    width: '140px',
    textTransform: 'capitalize !important',
    fontFamily: "'Montserrat', sans-serif !important",
};

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

const colors = ["#656ED3", "#FEF3BB", "FFD9D8", "82BDA9", "#A99BD4", "#E49573"]

const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

const QuizesStudentPage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState<UserInterface | null>(null);
    const [quizzes, setQuizzes] = useState<QuizInterface[]>([]);

    const getCurrentUser = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) return null;

            const response = await fetch("http://localhost:8090/api/v1/User/me", {
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

    const getQuizzes = async (userId: number) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) return null;

            const response = await fetch(`http://localhost:8090/api/v1/Quiz/visable-to-me?userid=${userId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });

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

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setCurrentUser(null);
        setIsLoggedIn(false);
        navigate('/');
    };

    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));

    return (
        <div style={{ minHeight: '100vh', height: 'fit-content' }}>
            {/* Navigation menu */}
            <Paper elevation={2} sx={paperStyle}>
                <img src={logo} alt="Logo" style={{ width: 'auto', height: '99%' }} />
                <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                    <Button onClick={() => navigate('/')} sx={{ color: "black" }}>Home</Button>
                    <Button onClick={() => navigate('/quizes-student')} sx={{ color: "#AFB3FF" }}><u>Quizzes</u></Button>
                    <Button onClick={() => navigate('/help')} sx={{ color: "black" }}>Help</Button>
                </ButtonGroup>
                <Box>
                    <ButtonGroup sx={rightButtons}>
                        <Button onClick={handleLogout} sx={{ ...rightButtons, bgcolor: " #E3E3E3", borderRadius: 2, color: "black" }}>Log Out</Button>
                    </ButtonGroup>
                    <Button onClick={() => navigate('/user-details')}>
                        <img src={profileIcon} alt="profile icon" style={{ width: '40%', height: 'auto' }} />
                    </Button>
                </Box>
            </Paper>

            <Box className="banner" sx={{ bgcolor: '#eef0fe' }}>
                <Stack className="btn" sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '100px' }}>
                    <Typography sx={{ ...cloudTextStyle, fontSize: '64pt' }}>
                        Are you ready to start
                        learning?
                    </Typography>
                </Stack>
                <Box className="image-container">
                    <img src={loginImg} alt="LogIn" className="login-image" />
                </Box>
            </Box>

            <Typography sx={{ ...cloudTextStyle, color: "#3A377B", fontSize: '3rem', fontWeight: 600, marginBottom: '70px' }}>
                My Quizzes
            </Typography>

            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={3} sx={{ marginBottom: '100px', marginLeft: '5%', marginRight: '5%' }}>
                {quizzes.map((quiz, index) => (
                    <Button onClick={() => navigate(`/quiz-student-details`, { state: { quizId: quiz.id } })} key={quiz.id} sx={{ padding: 0 }}>
                        <Card elevation={3} sx={{ '.css-1lt5qva-MuiCardContent-root': { padding: '0' } }}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" sx={{ backgroundColor: colors[index % colors.length], width: '100%', padding: 1, color: 'black' }}>
                                        {quiz.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', padding: 1 }}>
                                        Date created: Date created: {formatDate(quiz.createdAt)}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Button>
                ))}
            </Box>


            {/* Footer */}
            <Paper sx={{ ...paperStyle, marginBottom: 'none', bgcolor: '#AFB3FF' }}>
                <img src={logo} alt="Logo" style={{ width: 'auto', height: '99%' }} />
                <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                    <Button onClick={() => navigate('/')} sx={{ color: "black" }}>Home</Button>
                    <Button onClick={() => navigate('/quiz-student')} sx={{ color: "black" }}><u>Quizzes</u></Button>
                    <Button onClick={() => navigate('/help')} sx={{ color: "black" }}>Help</Button>
                </ButtonGroup>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <IconButton sx={{ color: "#656ED3" }}>
                        <Facebook />
                    </IconButton>
                    <IconButton>
                        <Instagram />
                    </IconButton>
                    <IconButton sx={{ color: "#656ED3" }}>
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

export default QuizesStudentPage;