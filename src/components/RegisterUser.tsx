import { RegisterUserInterface } from "../interfaces/RegisterUserInterface";
import { useLocation } from 'react-router-dom';
import React, { useState } from "react";
import { Box, Button, FormControl, IconButton, Stack, TextField, Typography } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import { useNavigate } from 'react-router-dom';
import RegisterImg from "../assets/RegisterUser/register-image.png"
import "../styles/RegisterUser.css";

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

const RegisterUser: React.FC = () => {
    const location = useLocation();
    const roleFromNavigation = location.state?.role;    // 2 for Teacher or 4 for Student
    const navigate = useNavigate();

    const [formData, setFormData] = useState<RegisterUserInterface>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: roleFromNavigation,
    });

    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        const userData = {
            ...formData,
        };

        try {
            setLoading(true);
            setError('');

            const response = await fetch('http://localhost:8090/api/v1/User', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }
            navigate('/login');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };


    return (
        <Box className="register-container">
            <Box className="register-image-container">
                <img src={RegisterImg} alt="Register" className="register-image" />
            </Box>
            <Box className="register-form-container" >
                <Typography component="label" variant="body2" sx={TitleStyle} className="titleUserType">
                    Please Fill out form to Register!
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} className="form-stack" >
                        <TextField
                            label="First name:"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            size="small"
                        />
                        <TextField
                            label="Last name:"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            size="small"
                        />
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
                        <TextField
                            label="Confirm Password:"
                            name="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            variant="outlined"
                            size="small"
                        />
                        <TextField
                            label="Phone Number:"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            variant="outlined"
                            size="small"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            className="register-button"
                        >
                            Register
                        </Button>
                        <Typography component="label" variant="body2" sx={loginText} className="titleUserType">
                            Already have an account? <Button onClick={() => navigate('/login')} sx={{ textTransform: "capitalize" }}> <u><b>Log in</b></u> </Button>
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

        </Box>
    );
}

export default RegisterUser;
