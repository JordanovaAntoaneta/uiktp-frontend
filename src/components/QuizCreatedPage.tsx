import { Box, Button} from "@mui/material";
import "../styles/QuizStudentDetailsPage.css"
import created from "../assets/QuizCreated/created.png";
import { Link } from 'react-router-dom';

//za link na kopchinja
import { useNavigate } from "react-router-dom";



const QuizFinishedPage = () => {
  const navigate = useNavigate();
    return (
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          bgcolor: '#f0f2f5',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4,
          position: 'relative'
        }}
      >
        {/* Image container with relative positioning */}
        <Box sx={{ position: 'relative', width: '1075px', height: '687px' }}>
          <img
            src={created}
            alt="Quiz created succesfully!"
            style={{
              height: '100%',
              width: '100%',
              display: 'block',
            }}
          />
  
          {/* Button container on bottom of image */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              px: 4,
              pb: 2,
            }}
          >
            {/* Centered button using auto margins */}
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                sx={{
                  position: 'absolute',
                  bottom: 95,
                  right: 500, 
                  bgcolor: '#8181d8',
                  color: '#fff',
                  borderRadius: 2,
                  px: 4,
                  py: 1,
                  fontWeight: 'bold',
                }}
              >
                Preview Quiz
              </Button>
            </Box>
          </Box>
        </Box>
  
        {/* Right-aligned Back button */}
        
        <Button onClick={() => navigate('/quiz-prof-details')}
          variant="contained"
          sx={{
            position: 'absolute', 
            bottom: 95, 
            right: 260, 
            bgcolor: '#8181d8',
            color: '#fff',
            borderRadius: 2,
            px: 4,
            py: 1,
            fontWeight: 'bold',
          }}
        >
          Back
        </Button>
        
      </Box>
    );
  };
  
  export default QuizFinishedPage;