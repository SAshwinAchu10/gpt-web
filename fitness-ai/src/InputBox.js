import React, { useState } from 'react';
import './InputBox.css';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import StopCircle from '@mui/icons-material/StopCircle';
const API_BASE_URL = 'http://3.84.134.26:3001'

const InputBox = ({ addMessage, addLoading, provider }) => {


    const [text, setText] = useState('');
    const [isListening, setIsListening] = useState(false);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    const startListening = () => {
        setIsListening(true);
        recognition.start();

        recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript + ' ';
                } else {
                    interimTranscript += transcript;
                }
            }
            setInput(finalTranscript || interimTranscript);
        };
    };

    const stopListening = () => {
        setIsListening(false);
        recognition.stop();
    };

    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (isListening) {
            stopListening();
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
        } else {
            startListening();
            
        };
    }

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
                    {isListening ?
                        <StopCircle style={{
                            color: '#FFFFFF',
                            marginLeft: 5,
                        }} size={20} />
                        :
                        <SendIcon style={{
                            color: '#FFFFFF',
                            marginLeft: 5,
                        }} size={20} />
                    }
                </IconButton>
                {/* <button onClick={isListening ? stopListening : startListening} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '18px' }}>
                {isListening ? 'Stop Listening' : 'Start Listening'}
            </button> */}
            </div>
        );
    };

    export default InputBox;
