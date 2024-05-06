import React, { useState } from 'react';

const LoginBox = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Usuario:', username);
    console.log('Contraseña:', password);
    console.log('Recordar contraseña:', rememberPassword);
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label htmlFor="username">Usuario:</label>
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


