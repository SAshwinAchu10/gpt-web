import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    Box,
    Skeleton
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useSpring, animated } from '@react-spring/web';

const API_BASE_URL = 'http://localhost:3001'

function Plan() {
    const paperSpring = useSpring({
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0px)' },
        config: { tension: 200, friction: 20 },
    });
    const [planInfo, setPlanInfo] = useState(undefined);
    const [userProfile, setUserProfile] = useState(undefined);
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        async function fetchGPT(input) {
            setLoading(true);
            const response = await fetch(
               `${API_BASE_URL}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input }),
            });
            const data = await response.json();
            setPlanInfo(data?.reply);
            setLoading(false);

        }
        let userData = localStorage.getItem('profile');
        console.log('userData: xxx', userData);
        if (userData) {
            console.log('userData: ', userData);
            userData = JSON.parse(userData);
            setUserProfile(userData)
            fetchGPT(`my height is ${userData?.height}, weight is ${userData?.weight}, age is ${userData?.age}, gender is ${userData?.gender}, diet plan is ${userData?.dietPlan} i need some diet plans and routines to imporve my fitness`)

        }
    }, [])


    return (
        <Container maxWidth="lg">

            <Grid container spacing={3}>
                <Grid item mt={2} xs={12} md={4} p={2} spacing={20}>

                    <Paper elevation={3} style={{ padding: '16px', height: '100%' }}>
                        <animated.div style={paperSpring}>

                            <p style={{
                                fontWeight: 600,
                                fontSize: 20
                            }}>My Health Information</p>
                            <Divider />
                            <List>
                                <ListItem>
                                    <ListItemText primary="Height" secondary={userProfile?.height} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Weight" secondary={userProfile?.weight} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Gender" secondary={userProfile?.gender} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Age" secondary={userProfile?.age} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Blood Pressure" secondary={userProfile?.bloodPressure} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Sugar Level" secondary={userProfile?.sugarLevel} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Diet Type" secondary={userProfile?.dietType} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Exercise Frequency" secondary={userProfile?.exerciseFrequency} />
                                </ListItem>
                            </List>
                        </animated.div>

                    </Paper>
                </Grid>
                <Grid item mt={2} xs={8} md={8} p={2} spacing={20}>
                    <Paper elevation={3} style={{ padding: '16px', height: '100%' }}>
                        <animated.div style={paperSpring}>

                            {loading ? <>
                                <Skeleton height={50} />
                                <Skeleton height={50} />
                                <Skeleton height={50} />
                                <Skeleton height={50} />
                                <Skeleton height={50} />
                                <Skeleton height={50} />
                                <Skeleton height={50} />
                                <Skeleton height={50} />
                                <Skeleton height={50} />
                                <Skeleton height={50} />
                                <Skeleton height={50} />
                                <Skeleton height={50} />
                                <Skeleton height={50} />
                            </> :
                                <>
                                    <p style={{
                                        fontWeight: 600, fontSize: 20
                                    }}>Here is the Curated Plan to be followed on Daily Basis</p>
                                    <Divider />
                                    {planInfo && <ReactMarkdown
                                        components={{
                                            p: ({ node, ...props }) => <p style={{ fontSize: '16px', fontWeight: 500 }} {...props} />,
                                        }}
                                        style={{
                                            background: 'beige',
                                        }}   >{planInfo}</ReactMarkdown>}
                                </>}
                        </animated.div>

                    </Paper>
                </Grid>


            </Grid>
        </Container>
    );
}

export default Plan;
