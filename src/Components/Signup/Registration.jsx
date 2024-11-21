import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.css";
import axios from "axios";

const API_URL = "http://localhost:5001/users";

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
        .post(API_URL, formData)
        .then((response) => {
          localStorage.setItem('userId', response.data.id);
          alert('Registration successful!');
          navigate("/login");
        })
        .catch((error) => {
          console.error('Registration failed:', error);
          setError('Failed to register. Please try again.');
        });
  };

  const navigate = useNavigate();

  return (
      <div className="registration-container">
        <form onSubmit={handleSubmit} className="registration-form">
          <h2>Create Account</h2>

          <div className="input-container">
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
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
                value={formData.password}
                onChange={handleChange}
                className="input"
                required
            />
          </div>

          <div className="input-container">
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                required
            />
          </div>

          <div className="input-container">
            <label htmlFor="phone">Phone Number:</label>
            <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input"
                required
            />
          </div>

          <button type="submit" className="button">Register</button>
        </form>
      </div>
  );
};

export default Registration;
