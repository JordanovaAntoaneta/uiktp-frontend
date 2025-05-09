import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInterface } from "../interfaces/UserInterface";
import profileIcon from '../assets/profile-icon.png';
import logo from '../assets/GeneralHomePage/logo.png';
import { middleButtons, rightButtons, paperStyle, TitleStyle, buttonStyle1, buttonStyle2, cloudTextStyle, boxStyle } from "../styles/muiElementsStyle";
import { Box, Button, ButtonGroup, Card, CardContent, IconButton, Paper, Typography } from "@mui/material";
import cover from '../assets/InvitesPage/cover.png';
import { Root } from "../interfaces/MyInvitesInterface";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

const InvitesPage = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<UserInterface | null>(null);
    const [invites, setInvites] = useState<Root[]>([]);

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

    const getInvites = async (userId: number) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) return null;

            const response = await fetch(`http://localhost:8090/api/v1/Quiz/my-invites?userId=${userId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const invites = await response.json();
            setInvites(invites);
            return invites;
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            return null;
        }
    };

    useEffect(() => {
        const fetchUserAndQuizzes = async () => {
            const user: UserInterface = await getCurrentUser();
            if (user) {
                await getInvites(user.id);
            }
        };

        fetchUserAndQuizzes();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setCurrentUser(null);
        setIsLoggedIn(false);
        navigate('/');
    };

    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));

    const deleteInvite = (id: number) => {
        setInvites(invites.filter((invite) => invite.id !== id));
    }

    const acceptInvite = async (userId: number, quizId: number) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) return null;

            const response = await fetch("http://localhost:8090/api/v1/Quiz/agree-participant", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    userId,
                    quizId,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const updatedInvites = await response.json();
            setInvites(updatedInvites);
            return updatedInvites;
        } catch (error) {
            console.error("Failed to accept invite:", error);
            return null;
        }
    };
    return (
        <div className="invites-page">

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
                            <Button onClick={() => navigate('/')} sx={{ color: "black" }}>Home</Button>
                            <Button onClick={() => navigate('/quizes-student')} sx={{ color: "black" }}>Quizzes</Button>
                            <Button onClick={() => navigate('/help')} sx={{ color: "black" }}>Help</Button>
                            <Button onClick={() => navigate('/my-invites')} sx={{ color: "#AFB3FF" }}><u>Invites</u></Button>
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

            {/* Cover */}
            <img src={cover} alt="Cover" style={{ width: "100% ", marginTop: '0' }} />

            {/* Title */}
            <Typography sx={{ ...cloudTextStyle, color: "#3A377B", fontSize: '3rem', fontWeight: 600, marginBottom: '70px', marginTop: '50px' }}>
                My Invites
            </Typography>

            {/* Invites */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 4,
                    maxWidth: 900,
                    margin: '0 auto',
                    marginBottom: '50px',
                }}
            >
                {invites?.map((invite) => (
                    <Card
                        sx={{
                            display: 'flex',
                            borderRadius: '20px',
                            boxShadow: 3,
                            overflow: 'hidden',
                            bgcolor: '#f0f3ff',
                            width: 600,
                            height: 160,
                        }}
                    >
                        {/* Purple vertical bar */}
                        <Box sx={{ width: 30, bgcolor: '#656ED3', height: '100%' }} />

                        {/* Content */}
                        <CardContent sx={{ flex: 1 }}>
                            <Typography
                                variant="body1"
                                sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, textAlign: 'left', paddingBottom: '20px' }}
                            >
                                {invite.quiz.title}
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                                <Button variant="contained" sx={{ bgcolor: '#656ED3', borderRadius: '20px', px: 3 }} onClick={() => currentUser?.id && acceptInvite(currentUser.id, invite.quiz.id)}>
                                    Accept
                                </Button>
                                <Button variant="contained" sx={{ bgcolor: '#656ED3', borderRadius: '20px', px: 3 }} onClick={() => deleteInvite(invite.id)}>
                                    Deny
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
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
                            <Button onClick={() => navigate('/')} sx={{ color: "black" }}>Home</Button>
                            <Button onClick={() => navigate('/quizes-student')} sx={{ color: "black" }}>Quizzes</Button>
                            <Button onClick={() => navigate('/help')} sx={{ color: "black" }}>Help</Button>
                            <Button onClick={() => navigate('/my-invites')} sx={{ color: "black" }}><u>Invites</u></Button>
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
                    <IconButton sx={{ color: "#656ED3" }}>
                        <Facebook />
                    </IconButton>
                    <IconButton sx={{ color: "#656ED3" }}>
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

export default InvitesPage;