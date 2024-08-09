import Paper from '@mui/material/Paper';
import React, { useState, useEffect } from 'react';
import './App.css';
import ChatBox from './ChatBox';
import InputBox from './InputBox';
const API_BASE_URL = 'http://3.84.134.26:3001'

function Chat() {
    const [provider, setProvider] = useState(localStorage.getItem('provider') ?? 'openai');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const addMessage = (message) => {
        setMessages([...messages, ...message]);
    };

    const addLoading = (_loading) => {
        setLoading(_loading)
    };

    return (
        <>
            <Paper style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
               
                <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
                    <ChatBox messages={messages} loading={loading} provider={provider} />
                </div>
                <div style={{ padding: '10px', position: 'sticky', bottom: 0 }}>
                    <InputBox addMessage={addMessage} addLoading={addLoading} provider={provider} />
                </div>
            </Paper>
        </>
    );
}

export default Chat;
