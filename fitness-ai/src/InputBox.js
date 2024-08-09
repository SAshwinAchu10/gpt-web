import React, { useState } from 'react';
import './InputBox.css';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
const API_BASE_URL = 'http://3.84.134.26:3001'

const InputBox = ({ addMessage, addLoading, provider }) => {
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (input.trim()) {
            const userMessage = { text: input, sender: 'user' };
            addMessage([userMessage]);
            setInput('');
            addLoading(true);

            const response = await fetch(
                `${API_BASE_URL}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input }),
            });
            const data = await response.json();
          
            addLoading(false);
            const botMessage = { text: data.reply, sender: 'bot' };
            addMessage([userMessage, botMessage]);
        }
    };

    return (
        <div className="InputBox">
            <input
                placeholder='What problem do you have?'
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <IconButton size='medium' onClick={handleSend} aria-label="fingerprint" style={{
                backgroundColor: '#000000',
                borderRadius: 100,
                width: 50,
                height: 50,
                marginRight: 5,
                margin: 2
            }}>
                <SendIcon style={{
                    color: '#FFFFFF',
                    marginLeft: 5,
                }} size={20} />
            </IconButton>
        </div>
    );
};

export default InputBox;
