import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserInterface } from "../interfaces/UserInterface";
import { Button, Box, Typography, Paper, TextField, Snackbar, Alert } from "@mui/material";

const ChangePassword: React.FC = () => {
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState<UserInterface | null>(null);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });

    const showSnackbar = (message: string, severity: 'success' | 'error') => {
        setSnackbar({ open: true, message, severity });
    };

    const resetForm = () => {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const getCurrentUser = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) return;

            const response = await fetch("http://localhost:8090/api/v1/User/me", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setCurrentUser(data);
            } else {
                console.warn("Failed to fetch user data.");
            }
        } catch (error) {
            console.error("Error fetching current user:", error);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!oldPassword || !newPassword || !confirmPassword) {
            showSnackbar("All fields are required.", "error");
            return;
        }

        if (newPassword !== confirmPassword) {
            showSnackbar("New passwords do not match.", "error");
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem("accessToken");
            if (!token) throw new Error("Not authenticated.");

            const response = await fetch("http://localhost:8090/api/v1/User/change-password", {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    oldPassword,
                    newPassword,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const message = errorData.errors
                    ? Object.values(errorData.errors).flat().join(' ')
                    : errorData.message || 'Password change failed.';
                throw new Error(message);
            }

            showSnackbar("Password changed successfully!", "success");
            resetForm();

            setTimeout(() => navigate('/user-details'), 800);
        } catch (error: any) {
            console.error("Password change failed:", error);
            showSnackbar(error.message || "Unexpected error occurred.", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

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
                <Typography variant="h5" fontWeight="bold" mb={4}>
                    Change your password!
                </Typography>

                <form onSubmit={handlePasswordChange}>
                    <TextField
                        fullWidth
                        type="password"
                        label="Old password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        sx={{ mb: 2 }}
                        required
                    />

                    <TextField
                        fullWidth
                        type="password"
                        label="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        sx={{ mb: 2 }}
                        required
                    />

                    <TextField
                        fullWidth
                        type="password"
                        label="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        sx={{ mb: 4 }}
                        required
                    />

                    <Box display="flex" justifyContent="center" gap={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{
                                backgroundColor: '#686de0',
                                borderRadius: '20px',
                                px: 4,
                                '&:hover': { backgroundColor: '#5a5ecf' },
                            }}
                        >
                            {loading ? "Saving..." : "Confirm"}
                        </Button>

                        <Button
                            variant="contained"
                            onClick={() => navigate('/user-details')}
                            sx={{
                                backgroundColor: '#686de0',
                                borderRadius: '20px',
                                px: 4,
                                '&:hover': { backgroundColor: '#5a5ecf' },
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Paper>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    severity={snackbar.severity}
                    onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ChangePassword;
