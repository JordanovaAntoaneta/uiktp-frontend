import React, { useEffect, useState } from "react";
import logo from '../assets/GeneralHomePage/logo.png';
import { useNavigate } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { UserInterface } from "../interfaces/UserInterface";
import profileIcon from '../assets/profile-icon.png';
import { middleButtons, rightButtons, paperStyle, TitleStyle, buttonStyle1, buttonStyle2, cloudTextStyle, boxStyle } from "../styles/muiElementsStyle";
import { Box, Button, ButtonGroup, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import computer from '../assets/User details/computer.png';

const UserDetails: React.FC = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<UserInterface | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [formValues, setFormValues] = useState<UserInterface | null>(null);

    useEffect(() => {
        if (currentUser) {
            setFormValues({ ...currentUser });
        }
    }, [currentUser]);

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

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setCurrentUser(null);
        setIsLoggedIn(false);
        navigate('/');
    };

    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));

    const editDetails = async () => {
        //     try {
        //         const accessToken = localStorage.getItem("accessToken");
        //         if (!accessToken) return null;

        //         const response = await fetch("http://localhost:8090/api/v1/User/me", {
        //             method: "GET",
        //             headers: {
        //                 "Authorization": `Bearer ${accessToken}`,
        //                 "Content-Type": "application/json"
        //             }
        //         });

        //         if (!response.ok) {
        //             throw new Error(`Error: ${response.status}`);
        //         }

        //         const userData = await response.json();
        //         setCurrentUser(userData);
        //         return userData;
        //     } catch (error) {
        //         console.error("Failed to fetch user data:", error);
        //         return null;
        //     }
    };

    return (
        <Box sx={{ minHeight: '100vh' }}>

            {/* Navigation menu */}
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

            {/* Full name and Type Section */}
            <Box sx={{ bgcolor: '#bec7ed', paddingTop: '50px !important', paddingLeft: '50px !important', paddingBottom: '50px' }}>
                <Stack direction="row" alignItems="center">
                    <img src={profileIcon} alt="Logo" />

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
                            {`${currentUser?.firstName} ${currentUser?.lastName}`}
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: 'Abhaya Libre, serif',
                                fontSize: '0.9rem',
                                textAlign: 'left !important',
                                textTransform: 'uppercase'
                            }}
                        >
                            <b>{currentUser?.type}</b>
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            {/* User Details Section (Form) */}
            {!editMode ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'flex-start',
                        bgcolor: '#EBEFFF',
                        padding: '2rem 4rem',
                        gap: '4rem',
                        paddingTop: "100px",
                        paddingBottom: "100px"
                    }}
                >
                    <form style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '400px',
                        gap: '1.5rem',
                    }}>
                        <Stack spacing={6} className="form-stack">
                            <TextField
                                label="First name:"
                                name="firstName"
                                value={formValues?.firstName || ''}
                                disabled
                                variant="outlined"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                sx={{ backgroundColor: 'white' }}
                            />
                            <TextField
                                label="Last name:"
                                name="lastName"
                                value={formValues?.lastName || ''}
                                disabled
                                variant="outlined"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                sx={{ backgroundColor: 'white' }}
                            />
                            <TextField
                                label="Email:"
                                name="email"
                                type="email"
                                value={formValues?.email || ''}
                                disabled
                                variant="outlined"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                sx={{ backgroundColor: 'white' }}
                            />
                            <TextField
                                label="Phone Number:"
                                name="phoneNumber"
                                value={formValues?.phoneNumber || ''}
                                disabled
                                variant="outlined"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                sx={{ backgroundColor: 'white' }}
                            />
                            <ButtonGroup sx={{ ...middleButtons, width: '100%' }}>
                                <Button
                                    onClick={() => setEditMode(true)}
                                    sx={{ ...buttonStyle2, width: '100%' }}
                                    fullWidth
                                >
                                    Edit
                                </Button>
                                <Button
                                    onClick={() => navigate('/change-password')}
                                    sx={{ ...buttonStyle2, width: '100%' }}
                                    fullWidth
                                >
                                    Change Password
                                </Button>
                            </ButtonGroup>
                        </Stack>
                    </form>
                    <img src={computer} alt="Computer" style={{ maxWidth: '400px', height: 'auto' }} />
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'flex-start',
                        bgcolor: '#EBEFFF',
                        padding: '2rem 4rem',
                        gap: '4rem',
                        paddingTop: "100px",
                        paddingBottom: "100px"
                    }}
                >
                    <form style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '400px',
                        gap: '1.5rem',
                    }}>
                        <Stack spacing={6} className="form-stack">
                            <TextField
                                label="First name:"
                                name="firstName"
                                value={formValues?.firstName || ''}
                                variant="outlined"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                sx={{ backgroundColor: 'white' }}
                            />
                            <TextField
                                label="Last name:"
                                name="lastName"
                                value={formValues?.lastName || ''}
                                variant="outlined"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                sx={{ backgroundColor: 'white' }}
                            />
                            <TextField
                                label="Email:"
                                name="email"
                                type="email"
                                value={formValues?.email || ''}
                                variant="outlined"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                sx={{ backgroundColor: 'white' }}
                            />
                            <TextField
                                label="Phone Number:"
                                name="phoneNumber"
                                value={formValues?.phoneNumber || 'Not provided'}
                                variant="outlined"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                sx={{ backgroundColor: 'white' }}
                            />
                            <ButtonGroup sx={{ ...middleButtons, width: '100%' }}>
                                <Button
                                    onClick={() => { setEditMode(true); editDetails() }}
                                    sx={{ ...buttonStyle2, width: '100%' }}
                                    fullWidth
                                >
                                    Save changes
                                </Button>
                                <Button
                                    onClick={() => setEditMode(false)}
                                    sx={{ ...buttonStyle2, width: '100%' }}
                                    fullWidth
                                >
                                    Cancel
                                </Button>
                            </ButtonGroup>
                        </Stack>
                    </form>
                    <img src={computer} alt="Computer" style={{ maxWidth: '400px', height: 'auto' }} />
                </Box>
            )}


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
        </Box >
    );
}

export default UserDetails;
