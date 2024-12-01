// src/Components/UserPage/UserPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './UserPage.css';
import { setUser, clearUser } from '../../store/slices/userSlice';

const API_URL = 'http://localhost:5001/users';

const UserPage = () => {
    const dispatch = useDispatch();
    const { currentUser, isAuthenticated } = useSelector((state) => state.user);

    const currentUserId = localStorage.getItem('userId');

    useEffect(() => {
        if (!currentUserId) {
            console.error('User ID not found in localStorage!');
            return;
        }

        axios
            .get(`${API_URL}/${currentUserId}`)
            .then((response) => {
                dispatch(setUser(response.data));
            })
            .catch((error) => console.error('Failed to fetch user data:', error));
    }, [currentUserId, dispatch]);

    const handleLogout = () => {
        localStorage.removeItem('userId');
        dispatch(clearUser());
        window.location.href = '/login';
    };

    const handleDeleteAccount = () => {
        if (!currentUserId) return;

        axios
            .delete(`${API_URL}/${currentUserId}`)
            .then(() => {
                alert('Account deleted!');
                localStorage.removeItem('userId');
                dispatch(clearUser());
                window.location.href = '/login';
            })
            .catch((error) => console.error('Failed to delete account:', error));
    };

    if (!currentUser) return <div>Loading user data...</div>;

    return (
        <div className="user-page">
            <h2>My Account</h2>

            <div className="user-details">
                <div>
                    <strong>Username:</strong> {currentUser.username}
                </div>
                <div>
                    <strong>Phone:</strong> {currentUser.phone}
                </div>
                <div>
                    <strong>Email:</strong> {currentUser.email}
                </div>
                <div>
                    <strong>Password:</strong> ****** 
                </div>
            </div>

            <div className="actions">
                <button onClick={handleDeleteAccount}>Delete Account</button>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default UserPage;
