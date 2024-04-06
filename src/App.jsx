

import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import RegisterPage from './pages/Register';
import LoginPage from './pages/LoginPage';
import Nav from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListingPage from './pages/List';
import Home from './pages/Home';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Github from './pages/Github';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(); // Get the auth instance
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('hello', user);
        setUser(user);
      } else {
        console.log("you are logged out");
        setUser(null);
      }
    });

    // Cleanup
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="container">
      
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/list" element={<ListingPage />} />
            <Route path="/github" element={<Github />} /> 
          
        
        
           
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/book/list" element={<ListingPage />} />
        </Routes>
      
    </div>
  );
}

export default App;

