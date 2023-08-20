import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    // Get User Profile.
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('AuthToken');
                if (token) {
                    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/v1/users/profile`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch user data');
                    }
                    const userData = await response.json();
                    setUser(userData.data);
                } else {
                    setUser(null);
                }
            } catch (error) {
                setUser(null);
            }
        }
        fetchUser();
    }, []);

    // Logout User.
    const handleLogout = () => {
        localStorage.removeItem('AuthToken');
        setUser(null);
        window.location.reload();
    };

    return (
        <UserContext.Provider value={{ user, handleLogout }}>
            {children}
        </UserContext.Provider>
    );
};