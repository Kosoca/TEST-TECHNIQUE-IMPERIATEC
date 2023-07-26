import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Login from './pages/Login';
import AddDisplay from './pages/AddDisplay';
import Display from './pages/Display';
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from 'react'; 
import axios from 'axios';


function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:1234/auth/auth", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((response) => {
      if(response.data.error) {
        setAuthState(false); 
      } else {
        setAuthState(true);
      }
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState(false);
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
      <BrowserRouter>
        <div className="navbar">
        {authState && (
          <>
            <Link to="/">Accueil</Link>
            <Link to="/add-display">Nouvelle arrivée</Link>
            <Link onClick={logout}>Déconnexion</Link>
          </>
        )}
        {!authState && (
          <>
            <Link to="/">Accueil</Link>
            <Link to="/login">Connexion</Link>
            <Link to="/register">S'enregistrer</Link>
          </>
        )}
        </div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/logout" element={<Logout />}/>
          <Route path="/add-display" element={<AddDisplay />}/>
          <Route path="/display/:id" element={<Display />}/>
        </Routes>
      </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
