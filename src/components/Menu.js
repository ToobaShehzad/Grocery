import React from 'react';
import './Menu.css';
import { FaStore, FaCreditCard, FaQuestionCircle, FaKey } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import BackButton from './BackButton';

function Menu() {
  return (
    <div className="menu-page">
      <div className="container">
        <h1 className="heading">Settings</h1>
        <p className="subheading">Edit your details and other settings.</p>
        <ul className="menu-list">
          <li className="menu-item">
            <Link to="/store-details" className="menu-link">
              <FaStore className="menu-icon" />
              <span className="menu-text">Store Details</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/payment-method" className="menu-link">
              <FaCreditCard className="menu-icon" />
              <span className="menu-text">Payment & Tax</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/help-disputes" className="menu-link">
              <FaQuestionCircle className="menu-icon" />
              <span className="menu-text">Help and Disputes</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/change-password" className="menu-link">
              <FaKey className="menu-icon" />
              <span className="menu-text">Change Password</span>
            </Link>
          </li>
        </ul>
        <BackButton />
      </div>
    </div>
  );
}

export default Menu;
