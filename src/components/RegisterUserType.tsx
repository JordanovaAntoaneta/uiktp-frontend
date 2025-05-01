import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import studentImg from '../assets/RegisterUserType/student.png';
import teacherImg from '../assets/RegisterUserType/teacher.png';
import '../styles/RegisterUserType.css';
import { Navigate, useNavigate } from 'react-router-dom';

const TitleStyle = {
    fontFamily: "Abhaya Libre, serif",
    fontStyle: "normal",
    fontWeight: 800,
    fontSize: 40,
    textAlign: "center" as const,
};

const CardStyle = {
    width: 350,
    height: 350,
    bgcolor: "#FAFAFA",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "flex-end",
    cursor: "pointer",
    transition: "transform 0.2s",
};

const textStyle = {
    fontFamily: "Abhaya Libre, serif",
    fontStyle: "normal",
    fontWeight: 800,
    fontSize: 32,
    textAlign: "center" as const,
    color: "#222",
};

const loginText = {
    fontFamily: "Abhaya Libre, serif",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
};


const RegisterUserType: React.FC = () => {
    const [role, setRole] = useState<number | null>(null);
    const navigate = useNavigate();

    return (
        <div className="register-type-page">
            <Typography component="label" variant="body2" sx={TitleStyle} className="titleUserType">
                Choose your account type!
            </Typography>
            <div className="cards">
                <Button className="teacher" onClick={() => navigate('/register', { state: { role: 2 } })} sx={{ p: 3, borderRadius: "3px" }}>
                    <Card sx={CardStyle} elevation={3}>
                        <CardMedia
                            component="img"
                            height="300"
                            image={teacherImg}
                            alt="teacher icon"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={textStyle}>
                                TEACHER
                            </Typography>
                        </CardContent>
                    </Card>
                </Button>
                <Button className="student" onClick={() => navigate('/register', { state: { role: 4 } })} sx={{ p: 3, borderRadius: "3px" }}>
                    <Card sx={CardStyle} elevation={3}>
                        <CardMedia
                            component="img"
                            height="300"
                            image={studentImg}
                            alt="graduation cap icon"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={textStyle}>
                                STUDENT
                            </Typography>
                        </CardContent>
                    </Card>
                </Button>
                <br />
                <Typography component="label" variant="body2" sx={loginText} className="titleUserType">
                    Already have an account? <Button onClick={() => navigate('/login')} sx={{ textTransform: "capitalize" }}> <u><b>Log in</b></u> </Button>
                </Typography>
            </div>
        </div>
    );
}

export default RegisterUserType;