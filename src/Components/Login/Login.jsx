import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ users }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (users[username] && users[username].password === password) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', username);
      navigate('/products');
    } else {
      localStorage.setItem('isAuthenticated', 'false');
      alert('Invalid username or password');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/sign-up');
  };

  return (
      <div className="login-container">
        <form onSubmit={ handleLogin } className="login-form">
          <h2>Login</h2>
          <div className="input-container">
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input"
                required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                required
            />
          </div>
          <button type="submit" className="button">Login</button>
        </form>

        <div className="register-container">
          <p>
            Don't have an account?{' '}
            <span onClick={ handleRegisterRedirect } className="link">
            Register here
          </span>
          </p>
        </div>
      </div>
  );
};

export default Login;
