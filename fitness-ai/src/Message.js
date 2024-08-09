import CodeIcon from '@mui/icons-material/Code';
import CopyAllOutlined from '@mui/icons-material/CopyAllOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import './Message.css';

const Message = ({ message, messagesEndRef }) => {

    return (
        <div ref={messagesEndRef} className={`Message ${message.sender}`} style={{
            alignItems: 'center'
        }}>
          
            <div style={{
                marginLeft: 10,
            }} className="MessageContent"  >
                <ReactMarkdown style={{
                    background: 'grey',
                }}   >{message.text}</ReactMarkdown>   
            </div>
        </div>
    );
};

export default Message;
