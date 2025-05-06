import { Box, Button, ButtonGroup, IconButton, Paper, Typography } from "@mui/material";
//import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/GeneralHomePage/logo.png";
import profileIcon from "../assets/profile-icon.png";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import "../styles/QuizStudentDetailsPage.css"
import pdf from "../assets/QuizStudentDetailsPage/pdf.png";
import pinkPdf from "../assets/QuizProfDetailsPage/pink pdf.png";

//ovie se za checkbox-ot
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  // add more items as needed
];

//do tuka 

const paperStyle = {
    padding: 2,
    marginBottom: 0,
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


const QuizProfDetailsPage: React.FC = () => {
    const navigate = useNavigate();

    //i ovie dole dve se za checkbox-ot
    const [inputValue, setInputValue] = React.useState('');
    const [value, setValue] = React.useState([]);
    return (
        <div style={{ minHeight: '100vh' }}>
        {/* Navigation menu */}
        <Paper elevation={2} sx={paperStyle}>
            <img src={logo} alt="Logo" style={{ width: 'auto', height: '99%' }} />
            <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                <Button onClick={() => navigate('/')} sx={{ color: "black" }}>Home</Button>
                <Button onClick={() => navigate('/quizes-teacher')} sx={{ color: "#AFB3FF" }}><u>Quizes</u></Button>
                <Button onClick={() => navigate('/help')} sx={{ color: "black" }}>Help</Button>
            </ButtonGroup>
            <Box>
                <ButtonGroup sx={rightButtons}>
                    <Button onClick={() => navigate('/')} sx={{ ...rightButtons, bgcolor: " #E3E3E3", borderRadius: 2, color: "black" }}>Log Out</Button>
                </ButtonGroup>
                <Button onClick={() => navigate('/user-details')}>
                    <img src={profileIcon} alt="profile icon" style={{ width: '40%', height: 'auto' }} />
                </Button>
            </Box>
        </Paper>


    <Box sx={{mb: '20px'}}>
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
                        lineHeight:1, 
                        mb: 1, 
                        wordBreak: 'break-word', 
                        whiteSpace:'normal',
                        mt: 3 }}>
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
        <Box className="quizCreate" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 8, pb: 10}}>
  
        {/* Left side: PDF and description */}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
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
                    <Typography variant="h4" sx={{fontSize: '1rem', marginBottom: 2, textAlign: 'left', fontWeight: 'bold', fontFamily: "'Montserrat', sans-serif !important"}}>
                        Review the quiz as students will see it. Ensure all questions and answers are correctly generated.
                    </Typography>
                    <Button variant="contained" sx={{ backgroundColor: '#6C63FF', textTransform: 'none', alignSelf: 'flex-start' }}>
                        Preview Quiz
                    </Button>
                </Box>
            </Box>

            {/* Right side: Checkbox */}
            <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={top100Films}
                disableCloseOnSelect
                open
                disablePortal
                value={value}
                onChange={(event, newValue) => {
                setValue(Object); //tuka beshe newValue ili nes, Object jas dodadov
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
                }}
                getOptionLabel={(option) => option.title}
                renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                    <li key={key} {...optionProps}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.title}
                    </li>
                    );
                }}
            renderTags={() => null} // Hide selected options from input display
            renderInput={(params) => (
            <TextField {...params} label="Checkboxes" placeholder="Favorites" />
            )}
            style={{ width: 500 }}
            popupIcon={null} // Optional: hide dropdown icon
            />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '50px' }}>
                        <img src={pinkPdf} alt="Pdf Image" style={{ width: '150px', height: '150px' }} />
                        <Typography sx={{ mt: 1 }}>Export Results</Typography>
                    </Box>
                    <Typography sx={{ ml: 10, fontSize: '1.2rem', fontWeight: 500 }}>
                        Download the quiz results in PDF format for analysis and reporting.
                    </Typography>
        </Box>

    </Box>

        {/* Footer */}
        <Paper sx={{ ...paperStyle, marginBottom: 'none', bgcolor: '#AFB3FF' }}>
            <img src={logo} alt="Logo" style={{ width: 'auto', height: '99%' }} />
            <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                <Button onClick={() => navigate('/')} sx={{ color: "black" }}>Home</Button>
                <Button onClick={() => navigate('/quiz-student')} sx={{ color: "black" }}><u>Quizes</u></Button>
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

export default QuizProfDetailsPage;

