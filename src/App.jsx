import React, { useState, useEffect, useContext } from 'react';
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
import { FirebaseContext } from './context/firebase';


function App() {
  const [user, setUser] = useState(null);



  const {setLogin} = useContext(FirebaseContext);


  useEffect(() => {
    const auth = getAuth(); // Get the auth instance
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('hello', user);
        setUser(user);
        setLogin(true);
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
    <div >
      <div>
        {user && <Nav />} 
        <Routes>
        

          <Route path="/" element={<Home />} />
          <Route path="/book/list" element={<ListingPage />} />
          <Route path="/github" element={<Github />} />
          {user && <Route path="/register" element={<RegisterPage />} />}
          {user && <Route path="/login" element={<LoginPage />} />}
        </Routes>
      </div>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
