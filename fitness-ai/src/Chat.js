import Paper from '@mui/material/Paper';
import React, { useState, useEffect } from 'react';
import './App.css';
import ChatBox from './ChatBox';
import InputBox from './InputBox';
const API_BASE_URL = 'http://localhost:3001'

function Chat() {
    const [provider, setProvider] = useState(localStorage.getItem('provider') ?? 'openai');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getChatHistory();
        async function getChatHistory() {
            const response = await fetch(`${API_BASE_URL}/api/chat/history?provider=${provider}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setMessages(data.reverse());
        }
    }, [provider])

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
