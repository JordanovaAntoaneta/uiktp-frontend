import { RegisterUserInterface } from "../interfaces/RegisterUserInterface";
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import {
    Box, Button, Snackbar, Alert, Stack,
    TextField, Typography, CircularProgress
} from "@mui/material";
import RegisterImg from "../assets/RegisterUser/register-image.png";
import "../styles/RegisterUser.css";
import { linkBase } from "../linkBase";

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
    const navigate = useNavigate();
    const roleFromNavigation = location.state?.role; // 2 for Teacher or 4 for Student

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

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phoneNumber: '',
            role: roleFromNavigation,
        });
        setConfirmPassword('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== confirmPassword) {
            setSnackbarMessage("Passwords don't match");
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`${linkBase}/User`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();

                if (errorData?.errors) {
                    const allErrors = Object.values(errorData.errors).flat().join(' ');
                    throw new Error(allErrors);
                }

                throw new Error(errorData.message || 'Registration failed');
            }

            setSnackbarMessage("Registration successful!");
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            resetForm();

            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } catch (err) {
            setSnackbarMessage(err instanceof Error ? err.message : 'An error occurred');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box className="register-container">
            <Box className="register-image-container">
                <img src={RegisterImg} alt="Register" className="register-image" />
            </Box>
            <Box className="register-form-container">
                <Typography component="label" variant="body2" sx={TitleStyle} className="titleUserType">
                    Please Fill out form to Register!
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} className="form-stack">
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
                            startIcon={loading && <CircularProgress size={20} />}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </Button>
                        <Typography component="label" variant="body2" sx={loginText} className="titleUserType">
                            Already have an account?{' '}
                            <Button onClick={() => navigate('/login')} sx={{ textTransform: "capitalize" }}>
                                <u><b>Log in</b></u>
                            </Button>
                        </Typography>
                    </Stack>
                </form>
            </Box>

            {/* Snackbar feedback */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default RegisterUser;
