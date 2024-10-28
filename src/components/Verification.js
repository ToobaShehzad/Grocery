import React, { useState } from 'react';
import './Verification.css'; 
import BackButton from './BackButton';
import ShowDetails from './ShowDetails'; 

function Verification({ onVerify }) {
    const [code, setCode] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [needy, setNeedy] = useState(null); 

    const codes = {
        '12345': {
            picture: 'https://via.placeholder.com/100',
            name: 'Anwar Hussain',
            code: '12345',
            amount: '3000',
        },
        '1122': {
            picture: 'https://via.placeholder.com/100', 
            name: 'Sarah Khan',
            code: '67890',
            amount: '2500',
        },
        // Add more codes and their details as needed
        '112233': {
            picture: 'https://via.placeholder.com/100', 
            name: 'Bilal Ali',
            code: '1122',
            amount: '5000',
        },
    };

    const handleVerify = () => {
        if (codes[code.trim()]) { // Check if the entered code exists in the list
            setNeedy(codes[code.trim()]); // Set the needy details for the modal
            setIsVerified(true);
            setIsModalOpen(true); // Open the modal when verified

            // Call onVerify if it's provided, otherwise log a message
            if (onVerify) {
                onVerify();
            } else {
                console.log('Verified, but no onVerify function provided.');
            }
        } else {
            alert('Invalid code. Please try again.');
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="verification-container">
            <div className="verification-content-container">
                <div className="verification-header">
                    <h1>Verification</h1>
                    <p>Enter the request Tracking ID below.</p>
                </div>
                <input
                    type="text"
                    placeholder="Enter code here"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <button onClick={handleVerify}>Verify</button>
                <BackButton />
            </div>
            {needy && (
                <ShowDetails isOpen={isModalOpen} onClose={handleCloseModal} needy={needy} />
            )}
        </div>
    );
}

export default Verification;
