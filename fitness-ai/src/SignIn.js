import * as React from 'react';
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import fitnessLady from "./assets/lady.png"
import './css/global.css'
const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#1E88E5',
        },
    },
    typography: {
        h5: {
            fontWeight: 700,
        },
        subtitle1: {
            fontWeight: 500,
            color: '#757575',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: '#1976D2',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                },
            },
        },
    },
});
export default function SignIn({ }) {
    const navigate = useNavigate();
    useEffect(() => {
        let loggedIn = localStorage.getItem('loggedin');
        if (loggedIn) {
            navigate('/profile');
        }
    }, []);
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get('email') == 'test@test.com' && data.get('password') == '123456') {
            localStorage.setItem('loggedin', 'YES');
            navigate('/profile');
        } else {
            toast.error('Invalid Credentials');
        }
    };
    return (
        <div>
            <div className='bg'>
                <Box className="left-bg">
                    <img src={fitnessLady} alt="bg" style={{ height: "100vh" }} />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: "center",
                        width: "50%",
                        height: "100%",
                    }}
                >
                    <Avatar sizes='large' sx={{ m: 1, bgcolor: '#441D6B', height: 80, width: 80 }}>
                        <FitnessCenterIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Hello, Health Nut!
                    </Typography>
                    <Typography component="h2" variant="subtitle1" sx={{ mt: 1, mb: 2 }}>
                        Log in to assess your fitness & diet plans
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            sx={{
                                background: "#fff"
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            sx={{
                                background: "#fff"
                            }}
                        />
                        <Button
                            onClick={() => navigate('/profile')}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{
                                mt: 3, mb: 2, height: 60, background: "#441D6B",
                                "&:hover": {
                                    backgroundColor: "#441D6B"
                                }
                            }}
                        >
                            MAKE ME FIT
                        </Button>
                    </Box>
                </Box>
            </div>
        </div>
    );
}