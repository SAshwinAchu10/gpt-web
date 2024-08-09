import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, Card, CardContent, Grid, MenuItem, RadioGroup, FormControlLabel, Radio, Skeleton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReactMarkdown from 'react-markdown';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import FitbitIcon from '@mui/icons-material/Fitbit';
import { useNavigate } from 'react-router-dom';  
import { useSpring, animated } from '@react-spring/web';

const API_BASE_URL = 'http://localhost:3001'
const theme = createTheme({});

export default function FitnessQuestions() {
    const navigate = useNavigate(); 
    const paperSpring = useSpring({
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0px)' },
        config: { tension: 200, friction: 20 },
    });
    const [formData, setFormData] = useState({
        height: '',
        weight: '',
        age: '',
        gender: '',
        bloodPressure: '',
        sugarLevel: '',
        exerciseFrequency: '',
        dietType: '',
    });
    const [isFirstLevelInfoShown, setIsFirstLevelInfoShown] = useState(false);
    const [isSecondLevelInfoShown, setIsSecondLevelInfoShown] = useState(false);
    const [firstLevelInfo, setFirstLevelInfo] = useState(undefined);
    const [secondLevelInfo, setSecondLevelInfo] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        localStorage.setItem('profile', JSON.stringify(formData));
        navigate('/plans')
    };
    useEffect(() => {
        let localForm = localStorage.getItem('profile');
        if (localForm) {
            setFormData(JSON.parse(localForm))
        }
        let oneLevel = localStorage.getItem('1level');
        if (oneLevel) {
            setFirstLevelInfo(oneLevel)
            setIsFirstLevelInfoShown(true);
        }
        let secondLevel = localStorage.getItem('2level');
        if (secondLevel) {
            setSecondLevelInfo(secondLevel)
            setIsSecondLevelInfoShown(true);
        }
    }, [])

    useEffect(() => {

        async function fetchGPT(input, level) {
            // const response = await fetch(
            //    `${API_BASE_URL}/api/chat`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ message: input }),
            // });
            // const data = await response.json();
            // console.log('data: ', data);
            if (level == 1) {
                localStorage.setItem('1level', `"For a 12-year-old female with a height of 100 cm and weight of 31 kg, it is important to focus on a balanced diet that includes a variety of fruits, vegetables, whole grains, lean proteins, and dairy products. Make sure to eat regular meals and snacks to maintain energy levels and support growth and development. It is also important to stay hydrated by drinking plenty of water throughout the day.
            In terms of fitness, focus on engaging in regular physical activity that includes a mix of aerobic exercises (such as running, swimming, or cycling) and strength training exercises (such as push-ups, squats, or lunges). Aim for at least 60 minutes of physical activity each day to maintain a healthy weight, build strength, and improve overall fitness levels. Prioritize activities that are enjoyable and can be done safely and comfortably at your age and fitness level."`)

                setFirstLevelInfo(`"For a 12-year-old female with a height of 100 cm and weight of 31 kg, it is important to focus on a balanced diet that includes a variety of fruits, vegetables, whole grains, lean proteins, and dairy products. Make sure to eat regular meals and snacks to maintain energy levels and support growth and development. It is also important to stay hydrated by drinking plenty of water throughout the day.
            In terms of fitness, focus on engaging in regular physical activity that includes a mix of aerobic exercises (such as running, swimming, or cycling) and strength training exercises (such as push-ups, squats, or lunges). Aim for at least 60 minutes of physical activity each day to maintain a healthy weight, build strength, and improve overall fitness levels. Prioritize activities that are enjoyable and can be done safely and comfortably at your age and fitness level."`);

            }
            if (level == 2) {
                localStorage.setItem('2level', `"For a 12-year-old female with a height of 100 cm and weight of 31 kg, it is important to focus on a balanced diet that includes a variety of fruits, vegetables, whole grains, lean proteins, and dairy products. Make sure to eat regular meals and snacks to maintain energy levels and support growth and development. It is also important to stay hydrated by drinking plenty of water throughout the day.
            In terms of fitness, focus on engaging in regular physical activity that includes a mix of aerobic exercises (such as running, swimming, or cycling) and strength training exercises (such as push-ups, squats, or lunges). Aim for at least 60 minutes of physical activity each day to maintain a healthy weight, build strength, and improve overall fitness levels. Prioritize activities that are enjoyable and can be done safely and comfortably at your age and fitness level."`)
                setSecondLevelInfo(`"For a 12-year-old female with a height of 100 cm and weight of 31 kg, it is important to focus on a balanced diet that includes a variety of fruits, vegetables, whole grains, lean proteins, and dairy products. Make sure to eat regular meals and snacks to maintain energy levels and support growth and development. It is also important to stay hydrated by drinking plenty of water throughout the day.
            In terms of fitness, focus on engaging in regular physical activity that includes a mix of aerobic exercises (such as running, swimming, or cycling) and strength training exercises (such as push-ups, squats, or lunges). Aim for at least 60 minutes of physical activity each day to maintain a healthy weight, build strength, and improve overall fitness levels. Prioritize activities that are enjoyable and can be done safely and comfortably at your age and fitness level."`);

            }
            setLoading(false);
        }
        if (formData.height && formData?.weight && formData?.gender && formData?.age && !isFirstLevelInfoShown) {
            setIsFirstLevelInfoShown(true);
            setLoading(true);
            fetchGPT(`my height is ${formData?.height}, weight is ${formData?.weight}, age is ${formData?.age}, gender is ${formData?.gender} some suggestion for diet and fitness with not more than 2 paragraph or 6lines`, 1);
        }
        if (formData.bloodPressure && formData?.sugarLevel && formData?.dietType && formData?.exerciseFrequency && !isSecondLevelInfoShown) {
            setIsSecondLevelInfoShown(true);
            setLoading(true);
            fetchGPT(`my blood pressure is ${formData?.bloodPressure}, sugar level is ${formData?.sugarLevel}, diet type is ${formData?.dietType}, exercise frequency is ${formData?.exerciseFrequency} some suggestion for diet and fitness with not more than 2 paragraph or 6lines`, 2);
        }

    }, [formData])

    return (
        <ThemeProvider theme={theme}>
            <div style={{
                background: '#fff'
            }}>
                <Container fixed sx={{ bgcolor: '#FFFFFF', borderRadius: 4, p: 6 }}>
                    <animated.div style={paperSpring}>

                    <div style={{
                        textAlign: 'center',
                        alignContent: 'center',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <FitbitIcon sx={{
                            width: 80,
                            height: 80,
                        }}/>
                        <Typography variant="h4" align="center" gutterBottom sx={{ color: 'black' }}>
                            Fitness Assessment
                        </Typography>
                        <Typography variant="body1" align="center" gutterBottom sx={{ color: 'black' }}>
                            Please provide the following information to help us tailor your fitness plan.
                        </Typography>
                   </div>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Card variant="outlined" sx={{ bgcolor: 'white', height: 130, borderRadius: 3 }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            Gender
                                        </Typography>
                                        <RadioGroup
                                            row
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                        >
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        </RadioGroup>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <Card variant="outlined" sx={{ bgcolor: 'white', height: 130, borderRadius: 3 }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            Age
                                        </Typography>
                                        <TextField
                                            select
                                            fullWidth
                                            variant="outlined"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleInputChange}
                                            placeholder="Select your age"
                                        >

                                            {[...Array(150)].map((_, i) => (
                                                <MenuItem key={i} value={`${i + 10} kg`}>{i + 10}</MenuItem>
                                            ))}
                                        </TextField>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Card variant="outlined" sx={{ bgcolor: 'white', height: 130, borderRadius: 3 }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            Height
                                        </Typography>
                                        <TextField
                                            select
                                            fullWidth
                                            variant="outlined"
                                            name="height"
                                            value={formData.height}
                                            onChange={handleInputChange}
                                            placeholder="Select your height"
                                            sx={{ bgcolor: 'white' }}
                                        >
                                            {[...Array(60)].map((_, i) => (
                                                <MenuItem key={i} value={`${i + 100} cm`}>{i + 100} cm</MenuItem>
                                            ))}
                                        </TextField>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Card variant="outlined" sx={{ bgcolor: 'white', height: 130, borderRadius: 3 }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            Weight
                                        </Typography>
                                        <TextField
                                            select
                                            fullWidth
                                            variant="outlined"
                                            name="weight"
                                            value={formData.weight}
                                            onChange={handleInputChange}
                                            placeholder="Select your weight"
                                            sx={{ bgcolor: 'white' }}
                                        >
                                            {[...Array(100)].map((_, i) => (
                                                <MenuItem key={i} value={`${i + 30} kg`}>{i + 30} kg</MenuItem>
                                            ))}
                                        </TextField>
                                    </CardContent>
                                </Card>
                            </Grid>


                            {isFirstLevelInfoShown && <>
                                {loading ?
                                    <Grid item xs={12} sm={12}>
                                        <Skeleton sx={{ background: 'lightgrey' }} height={40} />
                                        <Skeleton sx={{ background: 'lightgrey' }} height={40} />
                                        <Skeleton sx={{ background: 'lightgrey' }} height={40} />
                                    </Grid>
                                    : <Grid item xs={12} sm={12}>
                                    <Card variant="outlined" sx={{ bgcolor: '#e5f3ff' }}>
                                        <CardContent>
                                            <div style={{
                                                display: 'flex', alignItems: 'center', textAlign: 'center'
                                            }}>
                                                <AutoFixHighIcon style={{
                                                    paddingRight: 10,
                                                }} />
                                                <Typography  >
                                                    AI Recommendation
                                                </Typography>
                                            </div>
                                            <ReactMarkdown
                                                components={{
                                                    p: ({ node, ...props }) => <p style={{ fontSize: '11px', fontWeight: 600 }} {...props} />,
                                                }}
                                                style={{
                                                    background: 'beige',
                                                }}   >{firstLevelInfo}</ReactMarkdown>
                                        </CardContent>
                                    </Card>
                                </Grid>}
                            </>
                            }

                            <Grid item xs={12} sm={6}>
                                <Card variant="outlined" sx={{ bgcolor: 'white', height: 130, borderRadius: 3 }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            Blood Pressure
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            placeholder="e.g., 120/80"
                                            name="bloodPressure"
                                            value={formData.bloodPressure}
                                            onChange={handleInputChange}
                                            sx={{ bgcolor: 'white' }}
                                        />
                                    </CardContent>
                                </Card>
                            </Grid>





                            <Grid item xs={12} sm={6}>
                                <Card variant="outlined" sx={{ bgcolor: 'white', height: 130, borderRadius: 3 }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            Sugar Level
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            placeholder="e.g., 90 mg/dL"
                                            name="sugarLevel"
                                            value={formData.sugarLevel}
                                            onChange={handleInputChange}
                                            sx={{ bgcolor: 'white' }}
                                        />
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Card variant="outlined" sx={{ bgcolor: 'white', height: 130, borderRadius: 3 }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            Exercise Frequency
                                        </Typography>
                                        <TextField
                                            select
                                            fullWidth
                                            variant="outlined"
                                            name="exerciseFrequency"
                                            value={formData.exerciseFrequency}
                                            onChange={handleInputChange}
                                            sx={{ bgcolor: 'white' }}
                                        >
                                            <MenuItem value="Daily">Daily</MenuItem>
                                            <MenuItem value="3-4 times a week">3-4 times a week</MenuItem>
                                            <MenuItem value="1-2 times a week">1-2 times a week</MenuItem>
                                            <MenuItem value="Rarely">Rarely</MenuItem>
                                        </TextField>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Card variant="outlined" sx={{ bgcolor: 'white', height: 130, borderRadius: 3 }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            Diet Type
                                        </Typography>
                                        <TextField
                                            select
                                            fullWidth
                                            variant="outlined"
                                            name="dietType"
                                            value={formData.dietType}
                                            onChange={handleInputChange}
                                            sx={{ bgcolor: 'white' }}
                                        >
                                            <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                                            <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
                                            <MenuItem value="Vegan">Vegan</MenuItem>
                                            <MenuItem value="Keto">Keto</MenuItem>
                                            <MenuItem value="Paleo">Paleo</MenuItem>
                                        </TextField>
                                    </CardContent>
                                </Card>
                            </Grid>
                            {isSecondLevelInfoShown && <>
                                {loading ?
                                    <Grid item xs={12} sm={12}>
                                        <Skeleton sx={{ background: 'lightgrey' }} height={40} />
                                        <Skeleton sx={{ background: 'lightgrey' }} height={40} />
                                        <Skeleton sx={{ background: 'lightgrey' }} height={40} />
                                    </Grid>
                                    : <Grid item xs={12} sm={12}>
                                        <Card variant="outlined" sx={{ bgcolor: '#e5f3ff' }}>
                                            <CardContent>
                                                <div style={{
                                                    display: 'flex', alignItems: 'center', textAlign: 'center'
                                                }}>
                                                    <AutoFixHighIcon style={{
                                                        paddingRight: 10,
                                                    }} />
                                                    <Typography  >
                                                        AI Recommendation
                                                    </Typography>
                                                </div>
                                                <ReactMarkdown
                                                    components={{
                                                        p: ({ node, ...props }) => <p style={{ fontSize: '11px', fontWeight: 600 }} {...props} />,
                                                    }}
                                                    style={{
                                                        background: 'beige',
                                                    }}   >{secondLevelInfo}</ReactMarkdown>
                                            </CardContent>
                                        </Card>
                                    </Grid>}
                            </>
                            }
                        </Grid>
                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                                <Button
                                    color='inherit'
                                    variant='outlined'
                                onClick={handleSubmit}
                                    sx={{ padding: 1.5, borderRadius: '8px',   color: 'black' }}
                            >
                                Update Profile
                            </Button>
                        </Box>
                        </Box>
                        </animated.div>
                </Container>
            </div>
        </ThemeProvider>
    );
}
