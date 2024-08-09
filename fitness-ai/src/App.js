import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';  
import SignIn from './SignIn';  
import Plan from './Plan'; 
import Profile from './Profile'; 
import ProgressTracker from './ProgressTracker';
import Profile from './Profile';
import Chat from './Chat'; 

function Layout() {
  const location = useLocation();

  return (
    <div style={{ display: 'flex' }}>
      {<Sidebar />}
      <main style={{ flexGrow: 1, padding: '16px' }}>
        <Routes>
          <Route path="/plans" element={<Plan />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/progress" element={<ProgressTracker />} />
          <Route path="/assistant" element={<Chat />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;
