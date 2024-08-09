import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
const API_BASE_URL = 'http://localhost:3001'
const theme = createTheme({

});

export default function FitnessQuestions() {
   

    return (
        <ThemeProvider theme={theme}>
            <div style={{
                background: '#eeeeef'
            }}>
                   
            </div>
        </ThemeProvider>
    );
}
