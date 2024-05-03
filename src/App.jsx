import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LoginBox from './components/LoginBox';
import './main.css';

function App() {
  const [showLoginBox, setShowLoginBox] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigation = (page) => {
    setCurrentPage(page);
    if (page === 'home') {
      setShowLoginBox(false);
    }
  };

  return (
    <div>
      <Navbar onLoginClick={() => setShowLoginBox(true)} onNavigate={handleNavigation} />
      {currentPage === 'home'}
      {showLoginBox && <LoginBox />}
    </div>
  );
}

export default App;


