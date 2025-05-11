import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, CardMedia, IconButton, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import logo from '../assets/GeneralHomePage/logo.png';
import coverImg from '../assets/GeneralHomePage/cover-image.png';
import cloudImg from '../assets/GeneralHomePage/section-one-bottom.png';
import blueImg from '../assets/GeneralHomePage/blue-img.png';
import yellowImg from '../assets/GeneralHomePage/yellow-img.png';
import pinkImg from '../assets/GeneralHomePage/pink-img.png';
import pinkMiddleLine from '../assets/GeneralHomePage/section-three-middle-line.png';
import sectionThreeImg from '../assets/GeneralHomePage/section-three-img.png';
import circleImgs from '../assets/GeneralHomePage/circle-images-bundle.png';
import { useNavigate } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { UserInterface } from "../interfaces/UserInterface";
import profileIcon from '../assets/profile-icon.png';
import { middleButtons, rightButtons, paperStyle, TitleStyle, buttonStyle1, buttonStyle2, cloudTextStyle, boxStyle } from "../styles/muiElementsStyle";

const GeneralHomePage: React.FC = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<UserInterface | null>(null);

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

    const getSectionOneButton = () => {
        if (isLoggedIn) {
            if (currentUser?.type === "Student") {
                return (
                    <Button
                        className="section-one-btn"
                        sx={buttonStyle1}
                        onClick={() => navigate('/quizes-student')}
                    >
                        Solve a quiz!
                    </Button>
                );
            } else if (currentUser?.type === "Professor") {
                return (
                    <Button
                        className="section-one-btn"
                        sx={buttonStyle1}
                        onClick={() => navigate('/generate-quiz')}
                    >
                        Create a Quiz
                    </Button>
                );
            }
        } else if (!isLoggedIn) {
            return (
                <Button
                    className="section-one-btn"
                    sx={buttonStyle1}
                    onClick={() => navigate('/login')}
                >
                    Create a Quiz
                </Button>
            );
        }
    };

    const getStartNowButton = () => {
        let targetPath = '';
        if (isLoggedIn) {
            if (currentUser?.type === "Student")
                targetPath = '/quizes-student';
            else
                targetPath = '/quizes-teacher';
        } else {
            targetPath = '/login';
        }

        return (
            <Button
                className="start-btn"
                sx={{ ...buttonStyle2, display: 'block', mx: 'auto', fontSize: '0.9rem' }}
                onClick={() => navigate(targetPath)}
            >
                Start Now!
            </Button>
        );
    };

    return (
        <div className="general-home-page">

            {/* Navigation menu */}
            <Paper elevation={2} sx={paperStyle}>
                <img src={logo} alt="Logo" style={{ width: 'auto', height: '99%' }} />
                {isLoggedIn ? (
                    currentUser?.type === "Professor" ? (
                        <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                            <Button onClick={() => navigate('/')} sx={{ color: "#AFB3FF" }}><u>Home</u></Button>
                            <Button onClick={() => navigate('/quizes-teacher')} sx={{ color: "black" }}>Quizzes</Button>
                            <Button onClick={() => navigate('/help')} sx={{ color: "black" }}>Help</Button>
                        </ButtonGroup>
                    ) : (
                        <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                            <Button onClick={() => navigate('/')} sx={{ color: "#AFB3FF" }}><u>Home</u></Button>
                            <Button onClick={() => navigate('/quizes-student')} sx={{ color: "black" }}>Quizzes</Button>
                            <Button onClick={() => navigate('/help')} sx={{ color: "black" }}>Help</Button>
                            <Button onClick={() => navigate('/my-invites')} sx={{ color: "black" }}>Invites</Button>
                        </ButtonGroup>
                    )
                ) : (
                    <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                        <Button onClick={() => navigate('/')} sx={{ color: "#AFB3FF" }}><u>Home</u></Button>
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

            {/* Section one */}
            <Box
                className="section-one"
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#fff',
                }}
            >
                <Box className="containter-left" sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <Stack spacing={3}>
                        <Typography variant="h4" sx={TitleStyle}>
                            Quiz Maker: Create a Quiz <br /> to challenge your audience
                        </Typography>
                        <Typography sx={{ fontFamily: "'Montserrat', Arial, sans-serif !important", fontWeight: 100, fontSize: '1.15rem', textAlign: 'left' }}>
                            Make fun interactive quizzes to test your audience's <br /> knowledge, run a quiz night with friends, or help students <br /> study.
                        </Typography>
                        {getSectionOneButton()}
                    </Stack>
                </Box>
                <Box className="containter-right" sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <img
                        src={coverImg}
                        alt="Cover"
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            marginRight: '120px',
                        }}
                        className="cover"
                    />
                </Box>
            </Box>

            {/* Cloud section with conditional button */}
            <Box
                className="cloud-section"
                sx={{
                    marginTop: 1,
                    backgroundImage: `url(${cloudImg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: 'cover',
                    height: '35vh',
                    maxWidth: 'full',
                }}
            >
                <Stack gap={3} sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Typography sx={cloudTextStyle}>
                        Discover our tools and create engaging quizzes that enhance <br /> learning and challenge students effectively.
                    </Typography>
                    {getStartNowButton()}
                </Stack>
            </Box>


            {/* Section two */}
            <Box sx={boxStyle}>
                <Card elevation={3} sx={{ maxWidth: 400, fontFamily: "'Montserrat', sans-serif !important", }}>
                    <CardHeader
                        title="On-boarding"
                        sx={{ fontFamily: "'Montserrat', sans-serif !important", }}
                    />
                    <CardMedia
                        component="img"
                        image={blueImg}
                        alt="On-boarding"
                        sx={{
                            bgcolor: '#656ED3',
                            width: '300px',
                            height: 'auto',
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            padding: 2,
                            fontFamily: "'Montserrat', sans-serif !important",
                        }}
                    />
                    <CardContent>
                        <Typography variant="body2" sx={{ fontFamily: "'Montserrat', sans-serif !important", }}>
                            Get started quickly-invite your students and set up your first quiz in minutes. Add users to your classroom, assign roles, and organize your quiz sessions with ease.
                        </Typography>
                    </CardContent>
                </Card>
                <Card elevation={3} sx={{ maxWidth: 400 }}>
                    <CardHeader
                        title="Educate"
                        sx={{ fontFamily: "'Montserrat', sans-serif !important", }}
                    />
                    <CardMedia
                        component="img"
                        image={yellowImg}
                        alt="Educate"
                        sx={{
                            bgcolor: '#FEF3BB',
                            width: '300px',
                            height: '307px',
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            padding: 2,
                            fontFamily: "'Montserrat', sans-serif !important",
                        }}
                    />
                    <CardContent>
                        <Typography variant="body2" sx={{ fontFamily: "'Montserrat', sans-serif !important", }}>
                            Create engaging quizzes with AI or by hand. Choose from multiple question types, import content, and let our AI help you craft personalized assessments that boost learning.
                        </Typography>
                    </CardContent>
                </Card>
                <Card elevation={3} sx={{ maxWidth: 400 }}>
                    <CardHeader
                        title="Advise"
                        sx={{ fontFamily: "'Montserrat', sans-serif !important", }}
                    />
                    <CardMedia
                        component="img"
                        image={pinkImg}
                        alt="Advise"
                        sx={{
                            bgcolor: '#FFD9D8',
                            width: '300px',
                            height: '326px',
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            padding: 2,
                            fontFamily: "'Montserrat', sans-serif !important",
                        }}
                    />
                    <CardContent>
                        <Typography variant="body2" sx={{ fontFamily: "'Montserrat', sans-serif !important", }}>
                            Track student progress and provide instant feedback. Analyze results, identify learning gaps, and offer targeted advice to help every student succeed.
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            {/* Section three */}
            <Box sx={{
                ...boxStyle,
                backgroundImage: `url(${pinkMiddleLine})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: 'cover',
                width: 'full',
                height: '100px',
                marginBottom: '470px',
            }}>
                <img
                    className="container-left"
                    src={sectionThreeImg}
                    alt="Teachers and students debating"
                    style={{
                        width: '450px',
                        height: 'auto',
                        display: 'block',
                        marginTop: '450px',
                        paddingLeft: '100px'
                    }}
                />
                <Typography
                    className="container-right"
                    align="justify"
                    sx={{
                        fontFamily: "Abhaya Libre, serif",
                        fontWeight: 100,
                        fontSize: '1.15rem',
                        maxWidth: '700px',
                        mx: 'auto',
                        mt: '450px',
                        lineHeight: 1.2,
                        px: 2
                    }}
                >
                    No matter if you're a seasoned educator or designing your first quiz,
                    crafting engaging and interactive quizzes has never been easier. With our
                    tools, tips, and best practices, you'll create quizzes that captivate students
                    and elevate the learning experience — whether you're just starting or
                    looking to level up.
                </Typography>
            </Box>

            <Box sx={{ marginBottom: '130px' }}>
                <Typography sx={{ ...cloudTextStyle, color: "#3A377B", fontSize: '1.7rem', fontWeight: 600, marginBottom: '30px' }}>
                    Interact with your audience in 3 easy steps
                </Typography>
                <img
                    src={circleImgs}
                    alt="Three steps to interact with your audience"
                    style={{
                        width: '82.5%',
                        height: 'auto',
                        display: 'block',
                        margin: 'auto',
                        padding: 'auto',
                    }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, marginTop: '30px' }}>
                    <Stack gap={2} sx={{ margin: 'auto', padding: 'auto' }}>
                        <Typography sx={{ ...TitleStyle, fontSize: '1.15rem', color: 'rgb(106, 62, 167) !important', fontWeight: 'bold', fontFamily: "Abhaya Libre, serif" }}>1. Create your questions using AI</Typography>
                        <Typography
                            align="center"
                            sx={{
                                fontFamily: "Abhaya Libre, serif",
                                fontWeight: 100,
                                fontSize: '1rem',
                                maxWidth: '200px',
                                lineHeight: 1.2,
                                padding: 'auto',
                                margin: 'auto',
                                marginRigt: '90px',
                            }}
                        >
                            Enter your topic, keywords, or a
                            short description, and add your
                            students.
                            Our AI instantly generates a quiz
                            for you-ready to review and edit
                            before sharing with your class.
                        </Typography>
                    </Stack>

                    <Stack gap={2} sx={{ margin: 'auto', padding: 'auto' }}>
                        <Typography sx={{ ...TitleStyle, fontSize: '1.15rem', color: 'rgb(106, 62, 167) !important', fontWeight: 'bold', fontFamily: "Abhaya Libre, serif" }}>2. Your audience responds</Typography>
                        <Typography
                            align="center"
                            sx={{
                                fontFamily: "Abhaya Libre, serif",
                                fontWeight: 100,
                                fontSize: '1rem',
                                maxWidth: '200px',
                                lineHeight: 1.2,
                                padding: 'auto',
                                margin: 'auto',
                            }}
                        >
                            Students join your quiz and solve
                            questions in real time or at their
                            own pace. Every participant’s
                            answers are recorded for instant
                            assessment.
                        </Typography>
                    </Stack>

                    <Stack gap={2} sx={{ margin: 'auto', padding: 'auto' }}>
                        <Typography sx={{ ...TitleStyle, fontSize: '1.15rem', color: 'rgb(106, 62, 167) !important', fontWeight: '900', fontFamily: "Abhaya Libre, serif" }}>3. You will get instant feedback</Typography>
                        <Typography
                            align="center"
                            sx={{
                                fontFamily: "Abhaya Libre, serif",
                                fontWeight: 100,
                                fontSize: '1rem',
                                maxWidth: '200px',
                                lineHeight: 1.2,
                                padding: 'auto',
                                margin: 'auto',
                            }}
                        >
                            As soon as students finish,
                            both you and your class
                            receive immediate results
                            and analytics. Download
                            detailed reports to track
                            progress and celebrate
                            success.
                        </Typography>
                    </Stack>
                </Box>
            </Box>

            {/* Footer */}
            <Paper sx={{ ...paperStyle, marginBottom: 'none', bgcolor: '#AFB3FF' }}>
                <img src={logo} alt="Logo" style={{ width: 'auto', height: '99%' }} />
                {isLoggedIn ? (
                    currentUser?.type === "Professor" ? (
                        <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                            <Button onClick={() => navigate('/')} sx={{ color: "black" }}><u>Home</u></Button>
                            <Button onClick={() => navigate('/quizes-teacher')} sx={{ color: "black" }}>Quizzes</Button>
                            <Button onClick={() => navigate('/help')} sx={{ color: "black" }}>Help</Button>
                        </ButtonGroup>
                    ) : (
                        <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                            <Button onClick={() => navigate('/')} sx={{ color: "black" }}><u>Home</u></Button>
                            <Button onClick={() => navigate('/quizes-student')} sx={{ color: "black" }}>Quizzes</Button>
                            <Button onClick={() => navigate('/help')} sx={{ color: "black" }}>Help</Button>
                            <Button onClick={() => navigate('/my-invites')} sx={{ color: "black" }}>Invites</Button>
                        </ButtonGroup>
                    )
                ) : (
                    <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                        <Button onClick={() => navigate('/')} sx={{ color: "black" }}><u>Home</u></Button>
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

        </div >
    );
}

export default GeneralHomePage;