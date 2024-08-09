import React from 'react';
import CodeIcon from '@mui/icons-material/Code';
import Avatar from '@mui/material/Avatar';
import './Loader.css';

const Loader = () => {
    return (
        <div className="loader">
            <Avatar sx={{ background: '#d4d6dd', marginRight: 2 }}><CodeIcon /></Avatar>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
    );
};

export default Loader;