import { Button, ButtonGroup, Paper } from "@mui/material";
import React from "react";
import logo from '../assets/GeneralHomePage/logo.png';
import coverImg from '../assets/GeneralHomePage/cover.png';
import cloudImg from '../assets/GeneralHomePage/section-one-bottom.png';
import blueImg from '../assets/GeneralHomePage/blue.png';
import yellowImg from '../assets/GeneralHomePage/yellow.png';
import pinkImg from '../assets/GeneralHomePage/pink.png';
import pinkMiddleLine from '../assets/GeneralHomePage/section-three-middle-line.png';
import sectionThreeImg from '../assets/GeneralHomePage/section-three-img.png';
import circleImgs from '../assets/GeneralHomePage/circle-images-bundle.png';
import { useNavigate } from "react-router-dom";

const middleButtons = {
    gap: 2,
    '& .MuiButton-root': {
        border: 'none !important',
    },
    '& .MuiButtonGroup-grouped:not(:last-of-type)': {
        borderRight: 'none !important',
    },
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
}

const paperStyle = {
    padding: 2,
    marginBottom: 2,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    height: '60px',
    alignItems: 'center',
    bgcolor: '#EBEFFF',
}

const GeneralHomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="general-home-page">

            {/* Navigation menu */}
            <Paper elevation={2} sx={paperStyle}>
                <img src={logo} alt="Logo" style={{ width: 'auto', height: '99%' }} />
                <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                    <Button onClick={() => navigate('/')} sx={{ color: "#AFB3FF" }}><u>Home</u></Button>
                    <Button onClick={() => navigate('/login')} sx={{ color: "black" }}>Quizes</Button>
                    <Button onClick={() => navigate('/help')} sx={{ color: "black" }}>Help</Button>
                </ButtonGroup>
                <ButtonGroup sx={rightButtons}>
                    <Button onClick={() => navigate('/login')} sx={{ ...rightButtons, bgcolor: " #E3E3E3", borderRadius: 2, color: "black" }}>Log In</Button>
                    <Button onClick={() => navigate('/user-type')} sx={{ ...rightButtons, bgcolor: "rgb(106, 62, 167)", borderRadius: 2, color: "white" }}>Sign up</Button>
                </ButtonGroup>
            </Paper>

            {/* Section one */}


            {/* Section two */}


            {/* Section three */}


            {/* Section */}



        </div>
    );
}

export default GeneralHomePage;