import React, { useState } from 'react';

const LoginBox = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar formato de correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(username)) {
      setError('Por favor ingrese un correo electrónico válido. Por ejemplo: ejemplo@dominio.com');
      return;
    }

    // No hay validación para contraseña
    onLogin();
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <div className="inputContainer">
          <label htmlFor="username">Correo Electrónico:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </div>
        <div className="checkboxContainer">
          <input
            type="checkbox"
            id="rememberPassword"
            checked={rememberPassword}
            onChange={(e) => setRememberPassword(e.target.checked)}
            />
            <label htmlFor="rememberPassword"> Recordar contraseña.</label>
          </div>
            <button type="submit" className="button"><strong>Iniciar Sesión</strong></button>
            </form>
          <div className="forgotPassword">
            <a href="#" className="forgotPasswordLink"><strong>¿Olvidaste tu contraseña?</strong></a>
          </div>
    </div>
);
};
            
export default LoginBox;