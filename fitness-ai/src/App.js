import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import SignIn from './SignIn';
import Profile from './Profile';
import Plan from './Plan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/plans" element={<Plan />} />
      </Routes>
    </Router>
  );
}

export default App;
