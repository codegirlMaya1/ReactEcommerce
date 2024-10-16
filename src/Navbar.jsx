import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">ORDERS</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/cart">{language === 'en' ? 'Cart' : 'Carrito'}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user-account">{language === 'en' ? 'User Account' : 'Cuenta de Usuario'}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">{language === 'en' ? 'Login' : 'Iniciar Sesión'}</Link>
            </li>
          </ul>
          <div className="navbar-nav ms-auto">
            <select value={language} onChange={handleLanguageChange} className="form-select ms-2">
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
            <button onClick={handleLogout} className="btn btn-outline-light ms-2">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
