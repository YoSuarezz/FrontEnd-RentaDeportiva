import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onLoginClick, onNavigate, isLoggedIn }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={() => onNavigate('home')}>
        <h1>Aventura Deportiva</h1>
      </Link>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      />
      <ul className="menu">
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/" className="menu-link" onClick={() => onNavigate('home')}>
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/espacios" className="menu-link">
                Deportistas
              </Link>
            </li>
            <li>
              <a className="menu-link" href="#">
                Noticias Y Notificaciones
              </a>
            </li>
            <li>
              <a className="menu-link" href="#">
                Calendario
              </a>
            </li>
          </>
        ) : (
          <button className="login-button" onClick={onLoginClick}>
            <i className="fas fa-user"></i> Login
          </button>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
