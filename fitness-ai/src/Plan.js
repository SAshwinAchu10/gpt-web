import React, {useEffect, useState} from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    Box
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
const API_BASE_URL = 'http://localhost:3001'

function Plan() {
    const [planInfo, setPlanInfo] = useState(undefined);
    const [userProfile, setUserProfile] = useState(undefined);

    useEffect(() => {

        async function fetchGPT(input) {
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
            setPlanInfo(`"It is important to consult with a healthcare professional or a registered dietitian before starting any new diet plan or fitness routine, especially if you have specific health concerns or conditions.

Here are some general tips for improving fitness and developing a healthy diet plan:

1. Start by incorporating more fruits, vegetables, whole grains, and lean proteins into your meals. Focus on balanced nutrition and portion control.

2. Stay hydrated by drinking plenty of water throughout the day.

3. Aim to get at least 30 minutes of moderate exercise most days of the week. This can include activities like brisk walking, dancing, cycling, or yoga.

4. Incorporate strength training exercises into your routine to build muscle and increase metabolism.

5. Make small, gradual changes to your diet and exercise routine to avoid feeling overwhelmed or discouraged.

6. Track your progress and set achievable goals for yourself.

Remember, consistency is key when it comes to improving fitness and developing healthy habits. Listen to your body, and make adjustments as needed to ensure you are taking care of your overall well-being."`);
           
        }
        let userData = localStorage.getItem('profile');
        if (userData) {
            userData = JSON.parse(userData);
            setUserProfile(userData)
            fetchGPT(`my height is ${userData?.height}, weight is ${userData?.weight}, age is ${userData?.age}, gender is ${userData?.gender}, diet plan is ${userData?.dietPlan} i need some diet plans and routines to imporve my fitness`)

        }
    }, [])


    return (
        <Container maxWidth="lg">
          
            <Grid container spacing={3}>
                <Grid  item mt={2} xs={12} md={4} p={2} spacing={20}>
                    <Paper elevation={3} style={{ padding: '16px', height: '100%' }}>
                        <p style={{
                            fontWeight: 600,
                            fontSize: 20
                        }}>My Health Information</p>
                        <Divider/>
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
                    </Paper>
                </Grid>
                <Grid  item mt={2} xs={8} md={8} p={2} spacing={20}>
                    <Paper elevation={3} style={{ padding: '16px', height: '100%' }}>
                      <p style={{
                            fontWeight: 600, fontSize: 26
                        }}>Here is the Curated Plan to be followed on Daily Basis</p>
                        <Divider />
                        {planInfo && <ReactMarkdown
                            components={{
                                p: ({ node, ...props }) => <p style={{ fontSize: '18px', fontWeight: 500 }} {...props} />,
                            }}
                            style={{
                                background: 'beige',
                            }}   >{planInfo}</ReactMarkdown>}
                    </Paper>
                </Grid>

              
            </Grid>
        </Container>
    );
}

export default Plan;
