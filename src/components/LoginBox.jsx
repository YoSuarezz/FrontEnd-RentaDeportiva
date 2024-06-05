import React, { useState } from 'react';
import axios from 'axios';

const LoginBox = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Intentar autenticar al usuario
      const response = await axios.post('http://localhost:9090/api/v1/usuario-ingreso/validar', {
        usuario: username,
        contraseña: password
      });

      if (response.data) {
        onLogin(); // Si todo está correcto, se llama al método de inicio de sesión
        setError(''); // Limpiar errores anteriores
      } else {
        setError('Las credenciales son incorrectas o el usuario no está activo');
      }
    } catch (err) {
      console.error('Error al intentar iniciar sesión', err);
      setError('Error al conectar con el servidor. Por favor, intente más tarde.');
    }
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
