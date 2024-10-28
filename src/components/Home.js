import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    const [sales, setSales] = useState(0);
    const [billingDetails, setBillingDetails] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [storeDetails, setStoreDetails] = useState({
        name: '',
        description: '',
        address: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        const savedProfileImage = localStorage.getItem('profileImage');
        if (savedProfileImage) {
            setProfileImage(savedProfileImage); 
        }

        
        const savedBillDetails = localStorage.getItem('billDetails');
        if (savedBillDetails) {
            let bills = JSON.parse(savedBillDetails);
            // Remove duplicates
            bills = bills.reduce((acc, bill) => {
                const key = `${bill.date}-${bill.customer}`;
                if (!acc[key]) {
                    acc[key] = bill;
                }
                return acc;
            }, {});
            setBillingDetails(Object.values(bills));
        }

       
        const savedStoreDetails = localStorage.getItem('storeDetails');
        if (savedStoreDetails) {
            setStoreDetails(JSON.parse(savedStoreDetails));
        }
    }, []);

    useEffect(() => {
       
        localStorage.setItem('billDetails', JSON.stringify(billingDetails));
    }, [billingDetails]);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result); // Set image to state
                localStorage.setItem('profileImage', reader.result); // Save image to localStorage
                document.querySelector('.placeholder-text').style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    };

    const maxSales = 100000;

    const handleAddNewBill = (newBill) => {
        if (!newBill.date || !newBill.customer || !newBill.payment) {
            alert('Please fill in all required fields.');
            return;
        }

        
        const uniqueId = `${newBill.date}-${newBill.customer}`;
        const isDuplicate = billingDetails.some(bill => bill.uniqueId === uniqueId);

        if (!isDuplicate) {
            const updatedBillingDetails = [
                ...billingDetails,
                { ...newBill, uniqueId } 
            ];
            setBillingDetails(updatedBillingDetails);
        } else {
            alert('This bill already exists.');
        }
    };

    const filteredBillingDetails = billingDetails.filter(bill =>
        bill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dashboard">
            <div className="sidebar">
                <h2>Shopkeeper Dashboard</h2>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/verification">Billing</Link></li>
                    <li><Link to="/menu">Menu</Link></li>
                </ul>
            </div>
            <div className="content">
                <div className="store-info-container">
                    <div className="profile-pic-container" onClick={() => document.getElementById('fileInput').click()}>
                        <img src={profileImage || ""} alt="Profile" className="store-image" />
                        {!profileImage && <span className="placeholder-text">Tap to add picture</span>}
                    </div>
                    <input 
                        type="file" 
                        id="fileInput" 
                        accept="image/*" 
                        style={{ display: 'none' }} 
                        onChange={handleFileSelect} 
                    />
                    <h2>{storeDetails.name}</h2> 
                    <p>{storeDetails.description}</p>
                    <p><strong>Address:</strong> {storeDetails.address}</p> 
                    <p><strong>Email:</strong> {storeDetails.email}</p> 
                    <p><strong>Phone:</strong> {storeDetails.phone}</p> 
                </div>
                <div className="sales-info-container">
                    <h3>Shop Sales</h3>
                    <p className="sales-amount">Sales: PKR {sales}</p>
                    <div className="progress-bar-container">
                        <div 
                            className="progress-bar" 
                            style={{ width: `${(sales / maxSales) * 100}%` }}
                        ></div>
                    </div>
                </div>
                <div className="billing-details-container">
                    <h3>Billing Details</h3>
                    <input
                        type="text"
                        placeholder="Search bills..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <div className="billing-history">
                        {filteredBillingDetails.length > 0 ? (
                            filteredBillingDetails.map((bill, index) => (
                                <div className="bill-card" key={index}>
                                    <div className="bill-date">{bill.date}</div>
                                    <div className="bill-info">
                                        <div className="bill-name">{bill.name}</div>
                                        <div className="bill-customer">Customer: {bill.customer}</div>
                                        <div className="bill-payment">Payment: PKR {bill.payment}</div>
                                    </div>
                                    <div className="bill-status">{bill.status}</div>
                                </div>
                            ))
                        ) : (
                            <p>No billing details available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
