import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const API_URL = "http://localhost:5001/users";

const Login = ({ setCurrentUser }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const users = await response.json();
      const user = users.find(
          (u) => u.username === credentials.username && u.password === credentials.password
      );

      if (user) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("currentUser", JSON.stringify(user));
        setCurrentUser(user);
        navigate("/account");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to log in. Please try again.");
    }
  };

  return (
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="input-container">
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                className="input"
                required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="input"
                required
            />
          </div>
          <button type="submit" className="button">Login</button>
        </form>
      </div>
  );
};

export default Login;
