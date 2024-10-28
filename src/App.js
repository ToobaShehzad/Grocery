// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Menu from './components/Menu';
import StoreDetails from './components/StoreDetails'; 
import PaymentMethod from './components/PaymentMethod'; 
import HelpAndDisputes from './components/HelpAndDisputes'; 
import ChangePassword from './components/ChangePassword';
import Verification from './components/Verification'; 
import NextPage from './components/NextPage'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/store-details" element={<StoreDetails />} />
        <Route path="/payment-method" element={<PaymentMethod />} />
        <Route path="/help-disputes" element={<HelpAndDisputes />} /> 
        <Route path="/change-password" element={<ChangePassword />} /> 
        <Route path="/verification" element={<Verification />} /> 
        <Route path="/nextPage" element={<NextPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
