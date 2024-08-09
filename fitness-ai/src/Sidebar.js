import { CssBaseline, Divider, Drawer, List, ListItem, ListItemText, Toolbar, ListItemIcon } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import VerifiedUserOutlined from '@mui/icons-material/VerifiedUserOutlined';
import EventIcon from '@mui/icons-material/Event';
import AssistantIcon from '@mui/icons-material/Assistant';
import LogoutIcon from '@mui/icons-material/Logout';
function Sidebar() {
    const navigate = useNavigate(); 

    return (
        <div style={{ display: 'flex', }}>
            <CssBaseline />
            <Drawer
                variant="persistent"
                anchor="left"
                open={true}
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        backgroundColor: '#000000',
                        width: 240,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Toolbar />
                <div style={{ width: 240 }}>
                    <List sx={{ color: 'white' }}>
                        <ListItem
                            onClick={() => navigate('/profile')}
                            button
                            sx={{ borderBottom: '1px solid grey' }}
                        >
                            <ListItemIcon>
                                <VerifiedUserOutlined sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Health Profile" sx={{ color: 'white' }} />
                        </ListItem>
                        <ListItem
                            onClick={() => navigate('/plans')}
                            button
                            sx={{ borderBottom: '1px solid grey' }}
                        >
                            <ListItemIcon>
                                <EventIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Routines" sx={{ color: 'white' }} />
                        </ListItem>
                        <ListItem
                            onClick={() => navigate('/assistant')}
                            button
                            sx={{ borderBottom: '1px solid grey' }}
                        >
                            <ListItemIcon>
                                <AssistantIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Health Assistant" sx={{ color: 'white' }} />
                        </ListItem>
                        <ListItem
                            onClick={() => {
                                localStorage.clear();
                                navigate('/sign-in')
                            }}
                            button
                            sx={{ borderBottom: '1px solid grey' }}
                        >
                            <ListItemIcon>
                                <LogoutIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Logout" sx={{ color: 'white' }} />
                        </ListItem>
                    </List>
                    <Divider />
                </div>
            </Drawer>
            <main style={{ flexGrow: 1, padding: '16px' }}>
            </main>
        </div>
    );
}

export default Sidebar;
