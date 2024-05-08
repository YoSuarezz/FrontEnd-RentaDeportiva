import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginBox from './components/LoginBox';
import Espacios from './components/Espacios';
import './main.css';
 
function App() {
  const [showLoginBox, setShowLoginBox] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState('home');
 
  const handleNavigation = (page) => {
    setCurrentPage(page);
    if (page === 'home') {
      setShowLoginBox(false);
    }
  };
 
  return (
    <Router>
      <div>
        <Navbar onLoginClick={() => setShowLoginBox(true)} onNavigate={handleNavigation} />
        <Routes>
          <Route path="/espacios" element={<Espacios />} />
          {/* Definir otras rutas según la lógica de tu aplicación */}
        </Routes>
        {currentPage === 'home'}
        {showLoginBox && <LoginBox />}
      </div>
    </Router>
  );
}
 
export default App;