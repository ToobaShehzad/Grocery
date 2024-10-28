// src/components/BackButton.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './BackButton.css';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <button className="back-button" onClick={handleBackClick}>
      <FaArrowLeft className="back-icon" />
      Back
    </button>
  );
};

export default BackButton;
