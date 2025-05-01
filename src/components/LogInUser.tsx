import React, { useState } from "react";
import { LogInUserInterface } from "../interfaces/LogInUserInterface";
import { Box, Button, FormControl, IconButton, Stack, TextField, Typography } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import { useNavigate } from 'react-router-dom';
import LogInImg from "../assets/LogInUser/login-image.png"
import "../styles/loginUser.css";

const TitleStyle = {
    fontFamily: "Abhaya Libre, serif",
    fontStyle: "normal",
    fontWeight: 800,
    fontSize: 16,
    textAlign: "center" as const,
    pb: 3,
};

const loginText = {
    fontFamily: "Abhaya Libre, serif",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    width: '100%'
};

const LogInUser: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<LogInUserInterface>({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userData = {
            ...formData,
        };

        try {
            setLoading(true);

            const response = await fetch('http://localhost:8090/api/v1/Authenticate/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Log in failed');
            }
            navigate('/'); //// редирект во зависност од улогата на корисникот
        } finally {
            setLoading(false);
        }
    };


    return (
        <Box className="login-container">
            <Box className="login-form-container" >
                <Typography component="label" variant="body2" sx={TitleStyle} className="titleUserType">
                    Welcome Back!
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} className="form-stack" >
                        <TextField
                            label="Email:"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            size="small"
                        />
                        <TextField
                            label="Password:"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            size="small"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            className="login-button"
                        >
                            Log in
                        </Button>
                        <Typography component="label" variant="body2" sx={loginText} className="titleUserType">
                            Dont  have and account? <Button onClick={() => navigate('/user-type')} sx={{ textTransform: "capitalize" }}> <u><b>Register</b></u> </Button>
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                            <IconButton sx={{ color: "#656ED3" }}>
                                <FacebookIcon />
                            </IconButton>
                            <IconButton sx={{ color: "#656ED3" }}>
                                <WhatsAppIcon />
                            </IconButton>
                            <IconButton sx={{ color: "#656ED3" }}>
                                <TelegramIcon />
                            </IconButton>
                        </Box>
                    </Stack>
                </form>
            </Box>
            <Box className="login-image-container">
                <img src={LogInImg} alt="LogIn" className="login-image" />
            </Box>
        </Box>
    );
}

export default LogInUser;
