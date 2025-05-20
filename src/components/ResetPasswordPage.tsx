import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPasswordPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = (location.state as { email?: string })?.email || '';

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleCancel = () => {
        navigate('/login');
    };

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                background: 'linear-gradient(to bottom right, #b4b8f0, #7f7fdd)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    padding: 6,
                    backgroundColor: '#e9ecfb',
                    width: '500px',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h5" fontWeight="bold" mb={4} sx={{ fontFamily: "'Montserrat', sans-serif !important" }}>
                    Type in your new password!
                </Typography>

                <TextField
                    fullWidth
                    type="password"
                    label="New password"
                    variant="outlined"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <TextField
                    fullWidth
                    type="password"
                    label="Confirm Password"
                    variant="outlined"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    sx={{ mb: 4 }}
                />

                <Box display="flex" justifyContent="center" gap={2}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#686de0',
                            borderRadius: '20px',
                            px: 4,
                            '&:hover': {
                                backgroundColor: '#5a5ecf',
                            },
                            fontFamily: "'Montserrat', sans-serif !important"
                        }}
                    // onClick={}
                    >
                        Confirm
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#686de0',
                            borderRadius: '20px',
                            px: 4,
                            '&:hover': {
                                backgroundColor: '#5a5ecf',
                            },
                            fontFamily: "'Montserrat', sans-serif !important"
                        }}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default ResetPasswordPage;