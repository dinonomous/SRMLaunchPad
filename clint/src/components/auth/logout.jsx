import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            try {
                await axios.post(`${apiUrl}/authentication/logout`, {}, {
                    withCredentials: true,
                });
                navigate('/');
            } catch (error) {
                console.error('Error during logout:', error);
            }
        };

        performLogout();
    }, [navigate]);

    return null;
};

export default logout