import React, { useState } from 'react';
import './ShowDetails.css'; 

function ShowDetails({ isOpen, onClose, needy }) {
    const [step, setStep] = useState(1);
    const [uploadedPicture, setUploadedPicture] = useState(null); 
    const [successPopup, setSuccessPopup] = useState(false); 

    if (!isOpen) return null;

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
          
            setSuccessPopup(true);
        }
    };

    const handlePictureUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUploadedPicture(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const resetForm = () => {
        setStep(1);
        setUploadedPicture(null);
       
    };

    const handleSuccessClose = () => {
        try {
            // Retrieve existing bill details from localStorage
            const existingBillsJSON = localStorage.getItem('billDetails');
            let existingBills = existingBillsJSON ? JSON.parse(existingBillsJSON) : [];

          
            if (!Array.isArray(existingBills)) {
                console.error("Invalid data in localStorage for 'billDetails'. Resetting to empty array.");
                existingBills = []; 
            }

           
            const newBillDetails = {
                date: new Date().toLocaleDateString(),
                name: needy.name,
                customer: needy.name,
                payment: `${needy.amount} PKR`,
                status: 'Pending',
            };

            // Check if a bill for this individual already exists
            const billExists = existingBills.some(
                (bill) => bill.name === newBillDetails.name && bill.customer === newBillDetails.customer
            );

            if (!billExists) {
               
                existingBills.push(newBillDetails);

                // Save the updated bills array to localStorage
                localStorage.setItem('billDetails', JSON.stringify(existingBills));
            }

            setSuccessPopup(false);
            resetForm();
            onClose(); 
        } catch (error) {
            console.error("An error occurred while handling success close:", error);
        }
    };

    return (
        <>
            <div className="modal-overlay">
                <div className="modal-content">
                    <button className="close-button" onClick={onClose}>×</button>
                    <div className="modal-body">
                        {step === 1 && (
                            <>
                                <div className="needy-picture-container">
                                    {needy.picture ? (
                                        <img src={needy.picture} alt={needy.name} className="needy-picture" />
                                    ) : (
                                        <i className="fas fa-user needy-picture-icon"></i>
                                    )}
                                </div>
                                <h2>{needy.name}</h2>
                                <h4>CODE</h4>
                                <p>{needy.code}</p>
                                <h4>Grocery Items</h4>
                                <p>{needy.amount} PKR</p>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <h2>Take a picture of the bill and upload it.</h2>
                                <p>This picture will be used for bill verification.</p>
                                <div className="upload-section" onClick={() => document.getElementById('file-input').click()}>
                                    {uploadedPicture ? (
                                        <img src={uploadedPicture} alt="Uploaded Bill" className="uploaded-image" />
                                    ) : (
                                        <div className="upload-placeholder">
                                            <i className="fas fa-upload"></i>
                                            <p>Upload media</p>
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    id="file-input"
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={handlePictureUpload}
                                />
                            </>
                        )}
                        {step === 3 && (
                            <>
                                <h2>Bill Details</h2>
                                <p>Date: {new Date().toLocaleDateString()}</p>
                                <p>Requested ID: {needy.code}</p>
                                <p>Impactee Name: {needy.name}</p>
                                <p>Total: {needy.amount} PKR</p>
                                <p>Request Type: Grocery Items</p>
                                {uploadedPicture && (
                                    <img src={uploadedPicture} alt="Uploaded Bill" className="uploaded-image" />
                                )}
                            </>
                        )}
                        <div className="modal-buttons">
                            <button onClick={onClose}>Cancel</button>
                            <button onClick={handleNext}>{step < 3 ? 'Next' : 'Done'}</button>
                        </div>
                    </div>
                </div>
            </div>

            {successPopup && (
                <div className="success-popup-overlay show">
                    <div className="success-popup">
                        <div className="checkmark">✔️</div>
                        <div className="amount">{needy.amount} PKR</div> 
                        <p>Your amount will be transferred to you at the specified time.</p>
                        <button className="ok-button" onClick={handleSuccessClose}>OK</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ShowDetails;
