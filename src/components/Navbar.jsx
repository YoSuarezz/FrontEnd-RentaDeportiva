import React from 'react';

const Navbar = ({ onLoginClick, onNavigate }) => {
  return (
    <nav className="navbar">
      <a className="logo" onClick={() => onNavigate('home')}><h1>Unidad Deportiva El Bernabeu</h1></a>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
      <ul className="menu">
        <li><a className="menu-link" onClick={() => onNavigate('home')}>Inicio</a></li>
        <li><a className="menu-link" href="#">Espacios</a></li>
        <li><a className="menu-link" href="#">Reservar</a></li>
        <li><a className="menu-link" href="#">Contacto</a></li>
        <button className="login-button" onClick={onLoginClick}>
          <i className="fas fa-user"></i> Login
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
