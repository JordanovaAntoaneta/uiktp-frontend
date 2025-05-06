import React from "react";
import { Box, Button, ButtonGroup, IconButton, Paper, Typography, LinearProgress} from "@mui/material";
//import React, { useState } from "react";
import "../styles/QuizStudentDetailsPage.css"
import lightbulb from "../assets/QuizPreviewPage/lightbulb.png";
//import './App.css';
import CloseIcon from '@mui/icons-material/Close';

const QuizPage = () => {
  return (
    <Box 
      sx={{
        minHeight: '100vh', 
        bgcolor: '#C5C5FF', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        px: 3, 
        py: 2,}}>

        {/* Quiz Title */}
    <Box 
      sx={{
        display:'flex', 
        justifyContent:'center', 
        alignItems:'center'}}>
      <Typography
        variant="h5"
        sx={{
          mt: 2,
          flex: 1,
          textAlign: 'center',
          fontWeight: 'bold',
          fontFamily: 'Montserrat, sans-serif',
        }}
      >
        General Knowledge Quiz
      </Typography>

      <IconButton sx={{width:'20px'}}>
          <CloseIcon />
        </IconButton>  
    </Box>

      {/* Top row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img src={lightbulb} alt="Lightbulb" style={{ height: 90 }} />
          <Paper elevation={3} sx={{px: 2, py: 1, borderRadius: 5, bgcolor: 'white', fontSize: '0.875rem'}}>
            It’s known as the City of Light.
          </Paper>
        </Box>
      </Box>

      {/* Question & Answers */}
      <Box 
        sx={{ 
          textAlign: 'center', 
          mt: 4, 
          flexGrow: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            mb: 3,
            color: '#fff',
          }}>
          What is the capital of France?
        </Typography>

        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            width: '100%' }}>   
            
        {['A', 'B', 'C'].map((label, i) => {
          const options = ['PARIS', 'BERLIN', 'LONDON'];
          return (
            <Button
              key={label}
              variant="outlined"
              sx={{
                mb: 2,
                bgcolor: 'white',
                borderRadius: 2,
                px: 3,
                py: 2,
                width: '100%',
                maxWidth: 400,
                boxShadow: 2,
                textAlign: 'left',
                display: 'flex',
                gap: 2,
                fontWeight: 'bold',
              }}
            >
              <Box
                sx={{
                  bgcolor: '#f2ebf9',
                  color: '#000',
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {label}
              </Box>
              {options[i]}
            </Button>
          );
        })}
        </Box>
      </Box>

      {/* Bottom section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 4,
          px: 1,
          position: 'relative',
          bottom: 0,
          bgcolor: 'white',
          width: '100% !important'
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 150 }}>
          <LinearProgress
            variant="determinate"
            value={20}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: '#f0f0f0',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#00D26A',
              },
            }}
          />
          <Typography variant="caption" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
            1/5
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: '#8181d8',
            color: '#fff',
            borderRadius: 2,
            px: 4,
            py: 1,
            fontWeight: 'bold',
            mt:1,
            mb:1
          }}
        >
          CONTINUE
        </Button>
      </Box>
    </Box>
  );
};

export default QuizPage;