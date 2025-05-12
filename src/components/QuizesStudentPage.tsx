import { Box, Button, ButtonGroup, Card, CardActionArea, CardContent, IconButton, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/GeneralHomePage/logo.png";
import profileIcon from "../assets/profile-icon.png";
import "../styles/QuizesProf.css"
import { Facebook, Instagram, Twitter, Delete as DeleteIcon } from "@mui/icons-material";
import loginImg from "../assets/LogInUser/login-image.png";
import { UserInterface } from "../interfaces/UserInterface";
import { QuizInterface } from "../interfaces/QuizInterface";
import { linkBase } from "../linkBase";

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

    const getQuizzes = async (userId: number) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) return null;

            const response = await fetch(`${linkBase}/Quiz/visable-to-me?userid=${userId}`, {
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

    const handleCount = async (quizId: number): Promise<number> => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.error('No access token found');
            return 0;
        }

        try {
            const response = await fetch(
                `${linkBase}/Question/by-quizz?quizId=${quizId}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const questions = await response.json();
            return questions.length;

        } catch (error) {
            console.error('Error fetching questions:', error);
            return 0;
        }
    };


    return (
        <div style={{ minHeight: '100vh', height: 'fit-content' }}>
            {/* Navigation menu */}
            <Paper elevation={2} sx={paperStyle}>
                <img src={logo} alt="Logo" style={{ width: 'auto', height: '99%' }} />
                {isLoggedIn ? (
                    currentUser?.type === "Professor" ? (
                        <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                            <Button onClick={() => navigate('/')} sx={{ color: "black" }}>Home</Button>
                            <Button onClick={() => navigate('/quizes-teacher')} sx={{ color: "#AFB3FF" }}><u>Quizzes</u></Button>
                            <Button onClick={() => navigate('/help')} sx={{ color: "black" }}>Help</Button>
                        </ButtonGroup>
                    ) : (
                        <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                            <Button onClick={() => navigate('/')} sx={{ color: "black" }}>Home</Button>
                            <Button onClick={() => navigate('/quizes-student')} sx={{ color: "#AFB3FF" }}><u>Quizzes</u></Button>
                            <Button onClick={() => navigate('/help')} sx={{ color: "black" }}>Help</Button>
                            <Button onClick={() => navigate('/my-invites')} sx={{ color: "black" }}>Invites</Button>
                        </ButtonGroup>
                    )
                ) : (
                    <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                        <Button onClick={() => navigate('/')} sx={{ color: "black" }}>Home</Button>
                        <Button onClick={() => navigate('/login')} sx={{ color: "black" }}><u>Quizzes</u></Button>
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

            <Box
                display="grid"
                gridTemplateColumns="repeat(3, 1fr)"
                gap={3}
                sx={{ marginBottom: '100px', marginLeft: '5%', marginRight: '5%' }}
            >
                {quizzes.map((quiz, index) => (
                    <Card
                        key={quiz.id}
                        elevation={3}
                        sx={{
                            width: 400,
                            height: 300,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            margin: '0 auto',
                            background: '#fff',
                            borderRadius: 2,
                        }}
                    >
                        <CardActionArea
                            onClick={() => navigate(`/quiz-prof-details`, { state: { quizId: quiz.id } })}
                            sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: colors[index % colors.length],
                                    width: '100%',
                                    height: '100%',
                                    paddingY: 3,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderTopLeftRadius: 8,
                                    borderTopRightRadius: 8,
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    component="div"
                                    sx={{
                                        fontWeight: 700,
                                        color: 'white',
                                        fontSize: '1.5rem',
                                        letterSpacing: 1,
                                        textAlign: 'center',
                                        textShadow: '0 1px 4px rgba(0,0,0,0.10)',
                                    }}
                                >
                                    {quiz.title}
                                </Typography>
                            </Box>
                        </CardActionArea>
                        <Box
                            sx={{
                                background: '#fff',
                                borderBottomLeftRadius: 8,
                                borderBottomRightRadius: 8,
                                borderTop: '1px solid #eee',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingX: 2,
                                paddingY: 1,
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#111',
                                    fontWeight: 500,
                                    fontSize: '1.2rem',
                                }}
                            >
                                Date created: {formatDate(quiz.createdAt)}
                            </Typography>
                            <Typography>
                                {handleCount(quiz.id)}
                            </Typography>
                        </Box>
                    </Card>
                ))}
            </Box>


            {/* Footer */}
            <Paper sx={{ ...paperStyle, marginBottom: 'none', bgcolor: '#AFB3FF' }}>
                <img src={logo} alt="Logo" style={{ width: 'auto', height: '99%' }} />
                {isLoggedIn ? (
                    currentUser?.type === "Professor" ? (
                        <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                            <Button onClick={() => navigate('/')} sx={{ color: "black" }}>Home</Button>
                            <Button onClick={() => navigate('/quizes-teacher')} sx={{ color: "black" }}><u>Quizzes</u></Button>
                            <Button onClick={() => navigate('/help')} sx={{ color: "black" }}>Help</Button>
                        </ButtonGroup>
                    ) : (
                        <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                            <Button onClick={() => navigate('/')} sx={{ color: "black" }}>Home</Button>
                            <Button onClick={() => navigate('/quizes-student')} sx={{ color: "black" }}><u>Quizzes</u></Button>
                            <Button onClick={() => navigate('/help')} sx={{ color: "black" }}>Help</Button>
                            <Button onClick={() => navigate('/my-invites')} sx={{ color: "black" }}>Invites</Button>
                        </ButtonGroup>
                    )
                ) : (
                    <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                        <Button onClick={() => navigate('/')} sx={{ color: "black" }}>Home</Button>
                        <Button onClick={() => navigate('/quizes-teacher')} sx={{ color: "black" }}><u>Quizzes</u></Button>
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

export default QuizesStudentPage;