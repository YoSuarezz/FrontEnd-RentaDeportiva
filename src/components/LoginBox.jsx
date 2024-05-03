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
    <div style={styles.container}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.inputContainer}>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="rememberPassword"
            checked={rememberPassword}
            onChange={(e) => setRememberPassword(e.target.checked)}
          />
          <label htmlFor="rememberPassword"> Recordar contraseña.</label>
        </div>
        <button type="submit" style={styles.button}><strong>Iniciar Sesión</strong></button>
      </form>
      <div style={styles.forgotPassword}>
      <a href="#" style={styles.forgotPasswordLink}><strong>¿Olvidaste tu contraseña?</strong></a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '300px',
    margin: 'auto',
    marginTop: '100px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  inputContainer: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: '3px',
    fontSize: '16px',
  },
  checkboxContainer: {
    marginBottom: '15px',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  forgotPassword: {
    marginTop: '10px',
  },

  forgotPasswordLink: {
    color: 'green', 
    textDecoration: 'none',
    fontSize: '15px', 
  },
};

export default LoginBox;


