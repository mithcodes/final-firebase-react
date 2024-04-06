import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { FirbaseProvider } from './context/firebase.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <FirbaseProvider>
    <App />
    </FirbaseProvider>
    </BrowserRouter>
    
  </React.StrictMode>,
)
