import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardMedia, CardActionArea, Typography, Skeleton } from '@mui/material';
const API_BASE_URL = 'http://3.84.134.26:3001'




function VideoListPage() {

    let [videos, setVideos] = useState([]);
    let [loading, setLoading] = useState(false);


   


    useEffect(() => {

        async function fetchGPT(input) {
            setLoading(true);
            let _videos = localStorage.getItem('videos')
            if (_videos) {
                setVideos(JSON.parse(_videos));
            } else {
                const response = await fetch(
                    `${API_BASE_URL}/api/chat`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: input }),
                });
                const data = await response.json();
                console.log(data,"api")

                let exactJson = extractJson(data?.reply)
                setVideos(exactJson);
                localStorage.setItem('videos', JSON.stringify(exactJson))
            }
            setLoading(false);

        }
        let userData = localStorage.getItem('profile');
        if (userData) {
            userData = JSON.parse(userData);
            fetchGPT(`recommend some youtube videos links for a person whose height ${userData?.height} weight ${userData?.weight} blood pressure ${userData?.bloodPressure} and sugar level ${userData?.sugarLevel}, just provide links in json format with youtube video id and title`)
        }
    }, [])

    function extractJson(text) {
        const jsonMatch = text.match(/```json\n(\[.*?\])\n```/s);

        if (jsonMatch) {
            const jsonString = jsonMatch[1];

            try {
                const data = JSON.parse(jsonString);
                if (Array.isArray(data)) {
                    return data;

                } else {
                    return []
                }
            } catch (error) {
                return [];
            }
        } else {
            console.log("No JSON block found in the text.");
            return [];
        }
    }

    return (
        <Container maxWidth="lg" style={{ paddingTop: '10px' }}>
            <p style={{
                fontSize: 18,
                fontWeight: 600
            }}>Recommended Videos</p>

            <Grid container spacing={4}>
                {loading ?
                    [1, 2, 3].map((video,index) =>
                        <Grid item xs={12} sm={6} md={4} key={index}>
                                <Skeleton width={'100%'} height={'900%'} />
                                
                            </Grid>
                                )
                     :
                    videos?.map((video) => (
                        <Grid item xs={12} sm={6} md={4} key={video.id}>
                            <Card>
                                <CardActionArea href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" style={{height:"200px"}}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                                        alt={video.title}
                                    />
                                    <Typography variant="body2" color="textSecondary" align="center" style={{ padding: '10px' }}>
                                        {video.title}
                                    </Typography>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    );
}

export default VideoListPage;
