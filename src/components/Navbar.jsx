import React from 'react'

const Navbar = () => {
  return (
      <nav className="navbar">
          <a to="/" className="logo"><h1>Unidad Deportiva El Bernabeu</h1></a>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"></link>
          <ul className="menu">
              <li><a className="menu-link" href="#">Inicio</a></li>
              <li><a className="menu-link" href="#">Espacios</a></li>
              <li><a className="menu-link" href="#">Reservar</a></li>
              <li><a className="menu-link" href="#">Contacto</a></li>
              <button class="login-button">
                <i class="fas fa-user"></i> Login
              </button>
          </ul>
      </nav>
  ) 
}

export default Navbar
