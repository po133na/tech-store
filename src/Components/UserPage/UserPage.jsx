import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserPage.css';

const API_URL = 'http://localhost:5001/users';

const UserPage = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newData, setNewData] = useState({});

    const currentUserId = localStorage.getItem('userId');

    useEffect(() => {
        if (!currentUserId) {
            console.error('User ID not found in localStorage!');
            return;
        }

        axios
            .get(`${API_URL}/${currentUserId}`)
            .then((response) => setUser(response.data))
            .catch((error) => console.error('Failed to fetch user data:', error));
    }, [currentUserId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData({ ...newData, [name]: value });
    };

    const handleSaveChanges = () => {
        if (!currentUserId) return;

        axios
            .put(`${API_URL}/${currentUserId}`, {
                ...user,
                ...newData,
            })
            .then((response) => {
                setUser(response.data);
                setIsEditing(false);
            })
            .catch((error) => console.error('Failed to update user:', error));
    };

    const handleDeleteAccount = () => {
        if (!currentUserId) return;

        axios
            .delete(`${API_URL}/${currentUserId}`)
            .then(() => {
                alert('Account deleted!');
                localStorage.removeItem('userId');
                window.location.href = '/login';
            })
            .catch((error) => console.error('Failed to delete account:', error));
    };

    if (!user) return <div>Loading user data...</div>;

    return (
        <div className="user-page">
            <h2>My Account</h2>

            <div className="user-details">
                <div>
                    <strong>Username:</strong> {user.username}
                </div>
                <div>
                    <strong>Phone:</strong>{' '}
                    {isEditing ? (
                        <input
                            type="text"
                            name="phone"
                            value={newData.phone || user.phone || ''}
                            onChange={handleChange}
                        />
                    ) : (
                        user.phone
                    )}
                </div>
                <div>
                    <strong>Email:</strong>{' '}
                    {isEditing ? (
                        <input
                            type="email"
                            name="email"
                            value={newData.email || user.email || ''}
                            onChange={handleChange}
                        />
                    ) : (
                        user.email
                    )}
                </div>
                <div>
                    <strong>Password:</strong>{' '}
                    {isEditing ? (
                        <input
                            type="password"
                            name="password"
                            value={newData.password || user.password || ''}
                            onChange={handleChange}
                        />
                    ) : (
                        '******'
                    )}
                </div>
            </div>

            {isEditing ? (
                <div className="actions">
                    <button onClick={handleSaveChanges}>Save Changes</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div className="actions">
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={handleDeleteAccount}>Delete Account</button>
                </div>
            )}
        </div>
    );
};

export default UserPage;
