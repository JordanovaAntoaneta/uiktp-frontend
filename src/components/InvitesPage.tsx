
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInterface } from "../interfaces/UserInterface";
import { QuizInterface } from "../interfaces/QuizInterface";
import profileIcon from '../assets/profile-icon.png';
import logo from '../assets/GeneralHomePage/logo.png';
import { middleButtons, rightButtons, paperStyle, TitleStyle, buttonStyle1, buttonStyle2, cloudTextStyle, boxStyle } from "../styles/muiElementsStyle";
import { Box, Button, ButtonGroup, Card, CardContent, IconButton, Paper, Typography } from "@mui/material";
import cover from '../assets/InvitesPage/cover.png';
import { Root } from "../interfaces/MyInvitesInterface";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { linkBase } from "../linkBase";

const InvitesPage = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<UserInterface | null>(null);
    const [invites, setInvites] = useState<Root[]>([]);
    const [quizzes, setQuizzes] = useState<QuizInterface[]>([]);
const [selectedQuizzes, setSelectedQuizzes] =  useState<QuizInterface[]>([]);

    const getCurrentUser = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) return null;

            const response = await fetch(`${linkBase}/User/me`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const userData = await response.json();
            setCurrentUser(userData);
            return userData;
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            return null;
        }
    };

    const getInvites = async (userId: number) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) return null;

            const response = await fetch(`${linkBase}/Quiz/my-invites?userId=${userId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const invites = await response.json();
            setInvites(invites);
            return invites;
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            return null;
        }
    };

    useEffect(() => {
        const fetchUserAndQuizzes = async () => {
            const user: UserInterface = await getCurrentUser();
            if (user) {
                await getInvites(user.id);
                await getQuizzes();
            }
        };

        fetchUserAndQuizzes();
    }, []);

    const getQuizzes = async () => {
              try {
                  const accessToken = localStorage.getItem("accessToken");
                  if (!accessToken) return null;
      
                  const response = await fetch(`${linkBase}/Quiz/all-quizzes`, {
                      method: "GET",
                      headers: {
                          "Authorization": `Bearer ${accessToken}`,
                          "Content-Type": "application/json"
                      }
                  });
      
                  if (!response.ok) {
                      throw new Error(`Error: ${response.status}`);
                  }
      
                  const quizzes = await response.json();
                  setQuizzes(quizzes);
                  return quizzes;
              } catch (error) {
                  console.error("Failed to fetch quizzes:", error);
                  return null;
              }
          };
         useEffect(() => {
                    if (!invites || !quizzes) return;

                    const selectedQuizzes = quizzes.filter(quiz =>
                        invites.some(invite => invite.quizId === quiz.id)
                    );
                    setSelectedQuizzes(selectedQuizzes);
                    console.log("Selected quizzes for invites:", selectedQuizzes);
                }, [invites, quizzes]);

          
          

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setCurrentUser(null);
        setIsLoggedIn(false);
        navigate('/');
    };

    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));

   
    

const acceptInvite = async (userId: number, quizId: number) => {
  try {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) return null;

            const response = await fetch(`${linkBase}/Quiz/agree-participant`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    userId,
                    quizId,
                }),
            });


    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Прочитај го одговорот како текст, не како JSON
    const resultText = await response.text();
    console.log('Accept invite response:', resultText);  // Треба да испише "Participant agreed."

    // Отстрани ја прифатената покана од локалниот state за да ја тргнеш картичката
    setInvites((prev) =>
      prev.filter((invite) => !(invite.userId === userId && invite.quizId === quizId))
    );
    
  } catch (error) {
    console.error('Network error:', error);
  }
};

const deleteInvite = (inviteId: number) => {
  // Едноставно филтрирај ја поканата од локалната листа
  setInvites((prev) => prev.filter((invite) => invite.id !== inviteId));
};

    return (
        <div className="invites-page">

            {/* Navigation menu */}
            <Paper elevation={2} sx={paperStyle}>
                <img src={logo} alt="Logo" style={{ width: 'auto', height: '99%' }} />
                {isLoggedIn ? (
                    currentUser?.type === "Professor" ? (
                        <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                            <Button onClick={() => navigate('/')} sx={{ color: "#AFB3FF" }}><u>Home</u></Button>
                            <Button onClick={() => navigate('/quizes-teacher')} sx={{ color: "black" }}>Quizzes</Button>
                            <Button onClick={() => navigate('/help')} sx={{ color: "black" }}>Help</Button>
                        </ButtonGroup>
                    ) : (
                        <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                            <Button onClick={() => navigate('/')} sx={{ color: "black" }}>Home</Button>
                            <Button onClick={() => navigate('/quizes-student')} sx={{ color: "black" }}>Quizzes</Button>
                            <Button onClick={() => navigate('/help')} sx={{ color: "black" }}>Help</Button>
                            <Button onClick={() => navigate('/my-invites')} sx={{ color: "#AFB3FF" }}><u>Invites</u></Button>
                        </ButtonGroup>
                    )
                ) : (
                    <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                        <Button onClick={() => navigate('/')} sx={{ color: "#AFB3FF" }}><u>Home</u></Button>
                        <Button onClick={() => navigate('/login')} sx={{ color: "black" }}>Quizzes</Button>
                        <Button onClick={() => navigate('/help')} sx={{ color: "black" }}>Help</Button>
                    </ButtonGroup>
                )}

                {isLoggedIn ? (
                    <Box>
                        <ButtonGroup sx={rightButtons}>
                            <Button onClick={handleLogout} sx={{ ...rightButtons, bgcolor: "#E3E3E3", borderRadius: 2 }}>Log out</Button>
                        </ButtonGroup>
                        <Button onClick={() => navigate('/user-details')}>
                            <img src={profileIcon} alt="profile icon" style={{ width: '40%', height: 'auto' }} />
                        </Button>
                    </Box>
                ) : (
                    <ButtonGroup sx={rightButtons}>
                        <Button onClick={() => navigate('/login')} sx={{ ...rightButtons, bgcolor: "#E3E3E3", borderRadius: 2, color: "black" }}>Log In</Button>
                        <Button onClick={() => navigate('/user-type')} sx={{ ...rightButtons, bgcolor: "rgb(106, 62, 167)", borderRadius: 2, color: "white" }}>Sign up</Button>
                    </ButtonGroup>
                )}
            </Paper>

            {/* Cover */}
            <img src={cover} alt="Cover" style={{ width: "100% ", marginTop: '0' }} />

            {/* Title */}
            <Typography sx={{ ...cloudTextStyle, color: "#3A377B", fontSize: '3rem', fontWeight: 600, marginBottom: '70px', marginTop: '50px' }}>
                My Invites
            </Typography>

            {/* Invites */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 4,
                    maxWidth: 900,
                    margin: '0 auto',
                    marginBottom: '50px',
                }}
            >
                {invites?.map((invite) => {
             const quiz = selectedQuizzes.find(q => q.id === invite.quizId);
console.log(quiz?.title)
            return (
            <Card
                key={invite.id}
                 sx={{
                display: 'flex',
                borderRadius: '20px',
                boxShadow: 3,
                overflow: 'hidden',
                bgcolor: '#f0f3ff',
                width: 600,
                height: 160,
                }}
             >
            {/* Purple vertical bar */}
            <Box sx={{ width: 30, bgcolor: '#656ED3', height: '100%' }} />

            {/* Content */}
            <CardContent sx={{ flex: 1 }}>
                <Typography
                    variant="body1"
                    sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, textAlign: 'left', paddingBottom: '20px' }}
                >
                    {quiz?.title} {/* fallback ако нема */}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                    <Button
                        variant="contained"
                        sx={{ bgcolor: '#656ED3', borderRadius: '20px', px: 3 }}
                        onClick={() => currentUser?.id && acceptInvite(currentUser.id, invite.quizId)}
                    >
                        Accept
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ bgcolor: '#656ED3', borderRadius: '20px', px: 3 }}
                        onClick={() => deleteInvite(invite.id)}
                    >
                        Deny
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
})}

            </Box>

            {/* Footer */}
            <Paper sx={{ ...paperStyle, marginBottom: 'none', bgcolor: '#AFB3FF' }}>
                <img src={logo} alt="Logo" style={{ width: 'auto', height: '99%' }} />
                {isLoggedIn ? (
                    currentUser?.type === "Professor" ? (
                        <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                            <Button onClick={() => navigate('/')} sx={{ color: "black" }}><u>Home</u></Button>
                            <Button onClick={() => navigate('/quizes-teacher')} sx={{ color: "black" }}>Quizzes</Button>
                            <Button onClick={() => navigate('/help')} sx={{ color: "black" }}>Help</Button>
                        </ButtonGroup>
                    ) : (
                        <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                            <Button onClick={() => navigate('/')} sx={{ color: "black" }}>Home</Button>
                            <Button onClick={() => navigate('/quizes-student')} sx={{ color: "black" }}>Quizzes</Button>
                            <Button onClick={() => navigate('/help')} sx={{ color: "black" }}>Help</Button>
                            <Button onClick={() => navigate('/my-invites')} sx={{ color: "black" }}><u>Invites</u></Button>
                        </ButtonGroup>
                    )
                ) : (
                    <ButtonGroup variant="text" aria-label="Basic button group" sx={middleButtons}>
                        <Button onClick={() => navigate('/')} sx={{ color: "black" }}><u>Home</u></Button>
                        <Button onClick={() => navigate('/quizes-teacher')} sx={{ color: "black" }}>Quizzes</Button>
                        <Button onClick={() => navigate('/help')} sx={{ color: "black" }}>Help</Button>
                    </ButtonGroup>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <IconButton sx={{ color: "#656ED3" }} href="https://www.facebook.com/profile.php?id=61554727830080">
                        <Facebook />
                    </IconButton>
                    <IconButton sx={{ color: "#656ED3" }} href="https://www.instagram.com/edu_wiz_mk/">
                        <Instagram />
                    </IconButton>
                    <IconButton sx={{ color: "#656ED3" }} href="https://x.com/edu_wiz_mk">
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

export default InvitesPage;