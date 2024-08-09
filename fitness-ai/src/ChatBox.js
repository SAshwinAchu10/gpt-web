import React, { useEffect, useRef } from 'react';
import './ChatBox.css';
import Message from './Message';
import Loader from './Loader';

const ChatBox = ({ messages, loading }) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    return (
        <div  className="ChatBox">
            {messages.map((msg, index) => (
                <Message messagesEndRef={messagesEndRef} key={index} message={msg} />
            ))}
            {loading  && <Loader />}
        </div>
    );
};

export default ChatBox;
