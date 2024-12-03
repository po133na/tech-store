import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './UserPage.css';
import { setUser, clearUser } from '../../store/slices/userSlice';

const API_URL = 'http://localhost:5001/users';

const UserPage = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);

    const currentUserId = localStorage.getItem('userId');

    const [newData, setNewData] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!currentUserId) {
            console.error('User ID not found in localStorage!');
            return;
        }

        axios
            .get(`${API_URL}/${currentUserId}`)
            .then((response) => {
                dispatch(setUser(response.data));
                setNewData(response.data); // Initialize newData with current user data
            })
            .catch((error) => console.error('Failed to fetch user data:', error));
    }, [currentUserId, dispatch]);

    const handleInputChange = (field, value) => {
        setNewData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSaveChanges = () => {
        if (!currentUserId) return;

        axios
            .put(`${API_URL}/${currentUserId}`, newData)
            .then((response) => {
                alert('Profile updated successfully!');
                dispatch(setUser(response.data)); 
                setIsEditing(false);
            })
            .catch((error) => console.error('Failed to update user:', error));
    };

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
                    <strong>Username:</strong>
                    {isEditing ? (
                        <input
                            type="text"
                            value={newData.username || ''}
                            onChange={(e) => handleInputChange('username', e.target.value)}
                        />
                    ) : (
                        currentUser.username
                    )}
                </div>
                <div>
                    <strong>Phone:</strong>
                    {isEditing ? (
                        <input
                            type="text"
                            value={newData.phone || ''}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                    ) : (
                        currentUser.phone
                    )}
                </div>
                <div>
                    <strong>Email:</strong>
                    {isEditing ? (
                        <input
                            type="email"
                            value={newData.email || ''}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                    ) : (
                        currentUser.email
                    )}
                </div>
                <div>
                    <strong>Password:</strong>
                    {isEditing ? (
                        <input
                            type="password"
                            value={newData.password || ''}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                        />
                    ) : (
                        '******'
                    )}
                </div>
            </div>

            <div className="actions">
                {isEditing ? (
                    <button onClick={handleSaveChanges}>Save Changes</button>
                ) : (
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                )}
                <button onClick={handleDeleteAccount}>Delete Account</button>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default UserPage;
