import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.css";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '../../store/slices/registrationSlice';

const API_URL = "http://localhost:5001/users";

const Registration = () => {
  const formData = useSelector((state) => state.registration.formData);
  const dispatch = useDispatch();

  const [setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
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

  useEffect(() => {
    return () => {
      dispatch(setFormData({ username: '', password: '', email: '', phone: '' }));
    };
  }, [dispatch]);

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
