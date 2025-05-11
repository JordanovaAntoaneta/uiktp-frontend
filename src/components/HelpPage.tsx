import { Accordion, AccordionDetails, AccordionSummary, Box, Button, ButtonGroup, IconButton, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/GeneralHomePage/logo.png';
import coverPhoto from '../assets/HelpPage/tutorial-example.png';
import { Facebook, Instagram, Margin, Message, Twitter } from "@mui/icons-material";
import '../styles/HelpPage.css';
import AddIcon from '@mui/icons-material/Add';
import messageIcon from '../assets/HelpPage/message-icon.png';
import profileIcon from '../assets/profile-icon.png';
import { UserInterface } from "../interfaces/UserInterface";

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

const TitleStyle = {
    fontFamily: "'Montserrat', sans-serif !important",
    fontWeight: 300,
    textAlign: 'left'
}

const buttonStyle = {
    color: "white",
    backgroundColor: "#EBB4D3",
    borderRadius: 2,
    fontSize: '1rem',
    '&:hover': {
        backgroundColor: '#e39bc8',
    },
    width: '180px',
    textTransform: 'capitalize !important',
    fontFamily: "'Montserrat', sans-serif !important",
};

const faqs = [
    {
        question: "Can I use AI to generate questions in different languages?",
        answer:
            "For now, quiz generation is only available in English. We plan to support more languages in the future!"
    },
    {
        question: "How can I make a quiz?",
        answer: "To create a quiz, simply log in as a teacher and click the 'Create Quiz' button. You can enter your own questions manually or let our AI generate questions for you by providing a topic and keywords. Once your quiz is ready, review and edit it as needed, then assign it to your students."
    },
    {
        question: "Is this free?",
        answer: "Yes! You can create and share quizzes for free using all our features. Both teachers and students can use the platform at no cost. "
    },
    {
        question: "I made a quiz, but can’t make changes now",
        answer: "Once a quiz has been published and students have started taking it, editing is restricted to maintain fairness. If you need to update a quiz, you can duplicate it, make your changes, and assign the new version to your students."
    },
    {
        question: "How can I add more students?",
        answer: "To add more students, go to your quiz dashboard and select the quiz you want to update. Click 'Add Students' and enter their email addresses. You can add students at any time."
    }
];

const HelpPage: React.FC = () => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState<number | false>(0);

    const handleChange = (panel: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

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

    const UserType = () => {
        if (isLoggedIn) {
            if (currentUser?.type === "Teacher") {
                navigate('/quizes-teacher');
            } else if (currentUser?.type === "Student") {
                navigate('/quizes-student');
            }
        } else {
            navigate('/login');
        }
    }

    return (
        <div className="help-page">

            {/* Navigation menu */}

            <Paper elevation={2} sx={paperStyle}>
                <img src={logo} alt="Logo" style={{ width: 'auto', height: '99%' }} />
                {isLoggedIn ? (
                    currentUser?.type === "Professor" ? (
                        <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                            <Button onClick={() => navigate('/')} sx={{ color: "black" }}>Home</Button>
                            <Button onClick={() => navigate('/quizes-teacher')} sx={{ color: "black" }}>Quizzes</Button>
                            <Button onClick={() => navigate('/help')} sx={{ color: "#AFB3FF" }}><u>Help</u></Button>
                        </ButtonGroup>
                    ) : (
                        <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                            <Button onClick={() => navigate('/')} sx={{ color: "black" }}>Home</Button>
                            <Button onClick={() => navigate('/quizes-student')} sx={{ color: "black" }}>Quizzes</Button>
                            <Button onClick={() => navigate('/help')} sx={{ color: "#AFB3FF" }}><u>Help</u></Button>
                            <Button onClick={() => navigate('/my-invites')} sx={{ color: "black" }}>Invites</Button>
                        </ButtonGroup>
                    )
                ) : (
                    <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                        <Button onClick={() => navigate('/')} sx={{ color: "black" }}>Home</Button>
                        <Button onClick={() => navigate('/login')} sx={{ color: "black" }}>Quizzes</Button>
                        <Button onClick={() => navigate('/help')} sx={{ color: "#AFB3FF" }}><u>Help</u></Button>
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

            {/* Main content */}

            <img src={coverPhoto} alt="Logo" style={{ height: 'auto', width: '50%', marginTop: '50px', padding: 'auto' }} />

            <Typography sx={{ fontFamily: '"Manrope", sans-serif', fontSize: '71px', fontWeight: 800, textAlign: 'left', margin: '50px 0 50px 100px' }}>
                Frequently <br /> asked questions
            </Typography>
            <Box gap={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'row', marginBottom: 5 }}>
                <Box sx={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 5 }}>
                    <Box
                        className="container-left"
                        sx={{
                            maxWidth: 900,
                            margin: "auto",
                            padding: 0,
                        }}
                    >
                        {faqs.map((faq, idx) => (
                            <Accordion
                                key={idx}
                                expanded={expanded === idx}
                                onChange={handleChange(idx)}
                                disableGutters
                                elevation={0}
                                square={false}
                                sx={{
                                    mb: 2,
                                    borderRadius: "14px",
                                    border: "1.5px solid rgb(62, 57, 57)",
                                    boxShadow: "none",
                                    "&:before": { display: "none" },
                                    "& .MuiAccordionSummary-root": {
                                        minHeight: 64,
                                        px: 3
                                    },
                                    "& .MuiAccordionSummary-content": {
                                        margin: 0
                                    }
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<AddIcon sx={{ fontSize: 28 }} />}
                                    aria-controls={`panel${idx + 1}-content`}
                                    id={`panel${idx + 1}-header`}
                                    sx={{
                                        fontWeight: idx === 0 ? 700 : 600,
                                        fontSize: idx === 0 ? "1.2rem" : "1.1rem"
                                    }}
                                >
                                    <Typography
                                        component="span"
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: "1.1rem"
                                        }}
                                    >
                                        {faq.question}
                                    </Typography>
                                </AccordionSummary>
                                {faq.answer && (
                                    <AccordionDetails sx={{ px: 3, pt: 0, pb: 2 }}>
                                        <Typography
                                            sx={{
                                                color: "#222",
                                                fontWeight: 400,
                                                fontSize: "1rem",
                                                textAlign: "left",
                                            }}
                                        >
                                            {faq.answer}
                                        </Typography>
                                    </AccordionDetails>
                                )}
                            </Accordion>
                        ))}
                    </Box>
                </Box>
                <Stack className="container-right" sx={{ display: 'flex', borderRadius: '14px', border: '1.5px solid rgb(62, 57, 57)', boxShadow: 'none', padding: '17px' }}>
                    <img src={messageIcon} alt="Logo" style={{ width: '50px', height: 'auto', margin: 'auto', marginBottom: '50px', marginTop: '50px' }} />
                    <Typography sx={{ fontFamily: "'Montserrat', sans-serif !important", fontSize: '1.2rem', textAlign: 'center', marginBottom: '20px', }}>
                        Do you have more questions?
                    </Typography>
                    <Typography sx={{
                        fontFamily: "'Montserrat', sans-serif !important",
                        fontWeight: 100,
                        fontSize: '1.15rem',
                        maxWidth: '300px',
                        mx: 'auto',
                        mt: '0px',
                        lineHeight: 1.2,
                        px: 2,
                        marginBottom: '50px',
                    }}>
                        End-to-end payments and financial management in a single solution. Meet the right platform to help realize.
                    </Typography>
                    <a href="mailto:vinariimk00@gmail.com" style={{ textDecoration: 'none' }}>
                        <Button
                            sx={{
                                ...buttonStyle,
                                display: 'block',
                                mx: 'auto',
                                fontSize: '0.9rem',
                                color: 'black',
                                marginBottom: '50px',
                            }}
                        >
                            Contact us via email
                        </Button>
                    </a>
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
                            <Button onClick={() => navigate('/help')} sx={{ color: "black" }}><u>Help</u></Button>
                        </ButtonGroup>
                    ) : (
                        <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                            <Button onClick={() => navigate('/')} sx={{ color: "black" }}>Home</Button>
                            <Button onClick={() => navigate('/quizes-student')} sx={{ color: "black" }}>Quizzes</Button>
                            <Button onClick={() => navigate('/help')} sx={{ color: "black" }}><u>Help</u></Button>
                            <Button onClick={() => navigate('/my-invites')} sx={{ color: "black" }}>Invites</Button>
                        </ButtonGroup>
                    )
                ) : (
                    <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                        <Button onClick={() => navigate('/')} sx={{ color: "black" }}>Home</Button>
                        <Button onClick={() => navigate('/quizes-teacher')} sx={{ color: "black" }}>Quizzes</Button>
                        <Button onClick={() => navigate('/help')} sx={{ color: "black" }}><u>Help</u></Button>
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

export default HelpPage;