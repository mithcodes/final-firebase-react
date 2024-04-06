import React, { useState,useEffect } from 'react';
import { useFirebase } from '../context/firebase';
import { useNavigate,Link} from 'react-router-dom'

const LoginPage = () => {
  const navigate=useNavigate()
  const firebase = useFirebase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=>{
    if(firebase.isLoggedIn){
navigate("/")
    }
  },[firebase,navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("login up user....");
    try {
      await firebase.signUserWithEmailAndPass(email, password);
      console.log("successful");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input 
            type="email" 
            className="form-control" 
            id="exampleInputEmail1" 
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="exampleInputPassword1" 
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <p>Do not have an account? <Link to="/register">Signup</Link></p>
        <h3 className='m-5'>or sign with google</h3>
        <button type="submit" className="btn btn-primary m-1" onClick={firebase.signWithGoogle}>sign with google</button>
      </form>
    </div>
  );
};

export default LoginPage;
