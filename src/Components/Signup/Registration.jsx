import React, { useState } from 'react';
import './Registration.css';
import {useNavigate} from "react-router-dom";

const Registration = ({ setUsers }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store user credentials in the dictionary
    setUsers(prevUsers => ({
      ...prevUsers,
      [formData.username]: { password: formData.password, email: formData.email, phone: formData.phone },
    }));
    alert('Registration successful! You can now log in.');
  };

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

        <div className="register-container">
          <p>
            Already have an account?{' '}
            <span onClick={handleLoginRedirect} className="link">
            Login here
          </span>
          </p>
        </div>
      </div>
  );
};

export default Registration;
