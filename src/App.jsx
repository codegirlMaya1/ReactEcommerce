import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './CartContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Home from './Home';
import Admin from './Admin';
import Customer from './Customer';
import AllCustomers from './AllCustomers';
import Management from './Management';
import Cart from './Cart';
import NewOrder from './NewOrder';
import UserAccount from './UserAccount';
import Login from './Login';
import './index.css';

const App = () => {
  const isLoggedIn = !!localStorage.getItem('user');

  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Sidebar />
        <div className="container" style={{ marginLeft: '250px', paddingTop: '60px' }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
            <Route path="/admin" element={isLoggedIn ? <Admin /> : <Navigate to="/login" />} />
            <Route path="/customer" element={isLoggedIn ? <Customer /> : <Navigate to="/login" />} />
            <Route path="/all-customers" element={isLoggedIn ? <AllCustomers /> : <Navigate to="/login" />} />
            <Route path="/cart" element={isLoggedIn ? <Cart /> : <Navigate to="/login" />} />
            <Route path="/management" element={isLoggedIn ? <Management /> : <Navigate to="/login" />} />
            <Route path="/new-order" element={isLoggedIn ? <NewOrder /> : <Navigate to="/login" />} />
            <Route path="/user-account" element={isLoggedIn ? <UserAccount /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
