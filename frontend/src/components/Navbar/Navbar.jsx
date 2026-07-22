import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="logo">IDLY KUNDAN STUDIOS</div>
            <div className="nav-links">
                <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
                <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
                <NavLink to="/session" className={({ isActive }) => isActive ? 'active' : ''}>Session</NavLink>
                <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
                <NavLink to="/privacy" className={({ isActive }) => isActive ? 'active' : ''}>Privacy</NavLink>
                <NavLink to="/terms-and-conditions" className={({ isActive }) => isActive ? 'active' : ''}>Terms</NavLink>
                <a href="/login" onClick={handleLogout} className="logout">Logout</a>
            </div>
        </nav>
    );
};

export default Navbar;
