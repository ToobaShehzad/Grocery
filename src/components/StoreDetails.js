import React, { useState, useEffect } from 'react';
import './StoreDetails.css';
import BackButton from './BackButton';

function StoreDetails() {
  const [storeDetails, setStoreDetails] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    // Load the store details from localStorage when the component mounts
    const savedStoreDetails = localStorage.getItem('storeDetails');
    if (savedStoreDetails) {
      setStoreDetails(JSON.parse(savedStoreDetails));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoreDetails({ ...storeDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Details saved successfully!');

    // Save store details to localStorage
    localStorage.setItem('storeDetails', JSON.stringify(storeDetails));
  };

  return (
    <div className="store-details-page">
      <div className="container">
        <h1 className="heading">Store Details</h1>
        <form className="store-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Store Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={storeDetails.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={storeDetails.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={storeDetails.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={storeDetails.phone}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">Save Details</button>
        </form>
        <BackButton />
      </div>
    </div>
  );
}

export default StoreDetails;
