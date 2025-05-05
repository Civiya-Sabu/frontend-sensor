import { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        try {
            const res = await axios.post('http://localhost:8010/api/login', {
                email,
                password
            });
            const { token, user } = res.data;

            // Save token to localStorage (optional)
            localStorage.setItem('token', token);

            // Set user
            setUser(user);

            return { success: true };
        } catch (error) {
            console.error('Login error:', error.response?.data?.message || error.message);
            return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
    };

    const register = async (name, email, password, otp) => {
        try {
            const res = await axios.post('http://localhost:8010/api/register', {
                name,
                email,
                password,
                otp,
            });
    
            const { token } = res.data;
    
            localStorage.setItem('token', token);
            setUser({ name, email });
    
            return { success: true };
        } catch (error) {
            console.error('Register error:', error.response?.data?.msg || error.message);
            return { success: false, message: error.response?.data?.msg || 'Register failed' };
        }
    };
    
    const sendOtp = async (email) => {
        try {
            await axios.post('http://localhost:8010/api/send-otp', { email });
            return { success: true };
        } catch (error) {
            console.error('Send OTP error:', error.response?.data?.msg || error.message);
            return { success: false, message: error.response?.data?.msg || 'Failed to send OTP' };
        }
    };



    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, sendOtp }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
