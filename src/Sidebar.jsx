import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css'; // We'll create this CSS file for styling

const Sidebar = () => (
  <div className="sidebar">
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link className="nav-link" to="/admin">Admin</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/customer">Customer</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/all-customers">All Customers</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/management">Management Database</Link>
      </li>
    </ul>
  </div>
);

export default Sidebar;
