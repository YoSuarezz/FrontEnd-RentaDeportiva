import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginBox from './components/LoginBox';
import Espacios from './components/Espacios';
import './main.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginBox, setShowLoginBox] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigation = (page) => {
    setCurrentPage(page);
    if (page === 'home') {
      setShowLoginBox(false);
    }
  };

  const handleLoginButtonClick = () => {
    setShowLoginBox(!showLoginBox); 
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginBox(false);
  };

  return (
    <Router>
      <div>
        <Navbar onLoginClick={handleLoginButtonClick} onNavigate={handleNavigation} isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/espacios" element={<Espacios />} />
          {/* Definir otras rutas según la lógica de tu aplicación */}
        </Routes>
        {showLoginBox && <LoginBox onLogin={handleLogin} />}
      </div>
    </Router>
  );
}

export default App;
