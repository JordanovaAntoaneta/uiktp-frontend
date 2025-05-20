import React, { useEffect, useState } from "react";
import { LogInUserInterface } from "../interfaces/LogInUserInterface";
import { Box, Button, IconButton, Stack, TextField, Typography, Snackbar, CircularProgress, } from "@mui/material";
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import { useNavigate } from 'react-router-dom';
import LogInImg from "../assets/LogInUser/login-image.png";
import "../styles/loginUser.css";
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

const Alert = React.forwardRef<HTMLDivElement, any>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LogInUser: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<LogInUserInterface>({
        email: '',
        password: '',
    });

    const [snackbar, setSnackbar] = useState<{ open: boolean, message: string, severity: AlertColor }>({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);

            const response = await fetch(`${linkBase}/Authenticate/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data?.detail || "Login failed";
                setSnackbar({
                    open: true,
                    message: errorMessage,
                    severity: 'error'
                });
                return;
            }

            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);

            setSnackbar({
                open: true,
                message: "Login successful!",
                severity: "success"
            });

            setFormData({ email: '', password: '' });

            setTimeout(() => {
                navigate('/', {
                    state: {
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken,
                        email: formData.email
                    }
                });
            }, 400);
            ;

        } catch (error) {
            setSnackbar({
                open: true,
                message: "Something went wrong.",
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box className="login-container">
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>

            <Box className="login-form-container">
                <Typography component="label" variant="body2" sx={TitleStyle} className="titleUserType">
                    Welcome Back!
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} className="form-stack">
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
                            startIcon={loading ? <CircularProgress size={20} /> : null}
                        >
                            {loading ? "Logging in..." : "Log in"}
                        </Button>
                        <Typography component="label" variant="body2" sx={loginText} className="titleUserType">
                            Don’t have an account?{" "}
                            <Button onClick={() => navigate('/user-type')} sx={{ textTransform: "capitalize" }}>
                                <u><b>Register</b></u>
                            </Button>
                        </Typography>
                        <Button
                            onClick={async () => {
                                if (!formData.email.trim()) {
                                    setSnackbar({
                                        open: true,
                                        message: 'Fill in the email field.',
                                        severity: 'warning'
                                    });
                                    return;
                                }

                                try {
                                    const accessToken = localStorage.getItem("accessToken");
                                    if (!accessToken) return;

                                    const response = await fetch(`${linkBase}/User/forgot-password`, {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify(formData.email)
                                    });

                                    if (!response.ok) {
                                        const errorData = await response.json();

                                        if (errorData?.errors) {
                                            const allErrors = Object.values(errorData.errors).flat().join(' ');
                                            throw new Error(allErrors);
                                        }

                                        throw new Error(errorData.message || 'Forgot password failed');
                                    }

                                    setSnackbar({
                                        open: true,
                                        message: 'Reset link sent to your email.',
                                        severity: 'success'
                                    });
                                } catch (error) {
                                    console.error('Error during forgot password:', error);
                                    setSnackbar({
                                        open: true,
                                        message: 'Something went wrong. Please try again.',
                                        severity: 'error'
                                    });
                                }
                            }}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                textTransform: "capitalize",
                                fontSize: '0.8rem'
                            }}
                        >
                            Forgot password?
                        </Button>
                    </Stack>
                </form>
            </Box>
            <Box className="login-image-container">
                <img src={LogInImg} alt="LogIn" className="login-image" />
            </Box>
        </Box>
    );
};

export default LogInUser;