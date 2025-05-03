import { Button, ButtonGroup, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/GeneralHomePage/logo.png";
import profileIcon from "../assets/profile-icon.png";
import "../styles/QuizesProf.css"
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

const QuizesProfPage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    return (
        <div style={{ minHeight: '100vh', height: 'fit-content' }}>
            {/* Navigation menu */}
            <Paper elevation={2} sx={paperStyle}>
                <img src={logo} alt="Logo" style={{ width: 'auto', height: '99%' }} />
                <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                    <Button onClick={() => navigate('/')} sx={{ color: "black" }}>Home</Button>
                    <Button onClick={() => navigate('/quizes-teacher')} sx={{ color: "#AFB3FF" }}><u>Quizes</u></Button>
                    <Button onClick={() => navigate('/help')} sx={{ color: "black" }}>Help</Button>
                </ButtonGroup>
                <ButtonGroup sx={rightButtons}>
                    <Button onClick={() => navigate('/')} sx={{ ...rightButtons, bgcolor: " #E3E3E3", borderRadius: 2, }}>Log out</Button>
                    <Button onClick={() => navigate('/user-details')}>
                        <img src={profileIcon} alt="profile icon" style={{ width: '40%', height: 'auto' }} />
                    </Button>
                </ButtonGroup>
            </Paper>


            {/* Footer */}
            <Paper sx={{ ...paperStyle, marginBottom: 'none', bgcolor: '#AFB3FF' }}>
                <img src={logo} alt="Logo" style={{ width: 'auto', height: '99%' }} />
                <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                    <Button onClick={() => navigate('/')} sx={{ color: "black" }}><u>Home</u></Button>
                    <Button onClick={() => navigate('/login')} sx={{ color: "black" }}>Quizes</Button>
                    <Button onClick={() => navigate('/help')} sx={{ color: "black" }}>Help</Button>
                </ButtonGroup>
                {/* <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <IconButton sx={{ color: "#656ED3" }}>
                        <Facebook />
                    </IconButton>
                    <IconButton>
                        <Instagram />
                    </IconButton>
                    <IconButton sx={{ color: "#656ED3" }}>
                        <Twitter />
                    </IconButton>
                </Box> */}
            </Paper>

            <hr style={{ width: '100%', border: '1px solidrgb(100, 101, 110)', margin: '0' }} />

            <Paper sx={{ ...paperStyle, margin: 'none', bgcolor: '#AFB3FF', padding: 'none' }}>
                <Typography sx={{ fontFamily: "'Montserrat', sans-serif !important" }}>All rights reserved. Copyright © 2025</Typography>
            </Paper>

        </div>
    );
}

export default QuizesProfPage;