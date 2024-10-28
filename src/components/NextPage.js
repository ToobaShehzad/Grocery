import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import BackButton from './BackButton';
import './NextPage.css';

function NextPage() {
  const location = useLocation();
  const { jazzCashDetails, easyPaisaDetails, bankDetails } = location.state || {};

  const [isBankActive, setIsBankActive] = useState(true);
  const [isJazzCashActive, setIsJazzCashActive] = useState(true);
  const [isEasyPaisaActive, setIsEasyPaisaActive] = useState(true);

  const [isBankEditMode, setIsBankEditMode] = useState(false);
  const [isJazzCashEditMode, setIsJazzCashEditMode] = useState(false);
  const [isEasyPaisaEditMode, setIsEasyPaisaEditMode] = useState(false);

  const [editableBankDetails, setEditableBankDetails] = useState(bankDetails || {});
  const [editableJazzCashDetails, setEditableJazzCashDetails] = useState(jazzCashDetails || {});
  const [editableEasyPaisaDetails, setEditableEasyPaisaDetails] = useState(easyPaisaDetails || {});

  const handleToggleBank = () => setIsBankActive(!isBankActive);
  const handleToggleJazzCash = () => setIsJazzCashActive(!isJazzCashActive);
  const handleToggleEasyPaisa = () => setIsEasyPaisaActive(!isEasyPaisaActive);

  const handleEditToggle = (type) => {
    if (type === 'Bank') setIsBankEditMode(!isBankEditMode);
    if (type === 'JazzCash') setIsJazzCashEditMode(!isJazzCashEditMode);
    if (type === 'EasyPaisa') setIsEasyPaisaEditMode(!isEasyPaisaEditMode);
  };

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === 'Bank') {
      setEditableBankDetails({ ...editableBankDetails, [name]: value });
    }
    if (type === 'JazzCash') {
      setEditableJazzCashDetails({ ...editableJazzCashDetails, [name]: value });
    }
    if (type === 'EasyPaisa') {
      setEditableEasyPaisaDetails({ ...editableEasyPaisaDetails, [name]: value });
    }
  };

  const handleSaveChanges = (type) => {
    if (type === 'Bank') {
      // Save changes to localStorage
      localStorage.setItem('bankDetails', JSON.stringify(editableBankDetails));
      setIsBankEditMode(false);
    }
    if (type === 'JazzCash') {
      // Save changes to localStorage
      localStorage.setItem('jazzCashDetails', JSON.stringify(editableJazzCashDetails));
      setIsJazzCashEditMode(false);
    }
    if (type === 'EasyPaisa') {
      // Save changes to localStorage
      localStorage.setItem('easyPaisaDetails', JSON.stringify(editableEasyPaisaDetails));
      setIsEasyPaisaEditMode(false);
    }
  };

  return (
    <div className="next-page-container">
      {bankDetails && (
        <div className="account-card">
          <h2>Bank Account Details</h2>
          <div className="account-status">
            <span>{isBankActive ? "Active" : "Inactive"}</span>
            <label className="switch">
              <input type="checkbox" checked={isBankActive} onChange={handleToggleBank} />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="account-info">
            {isBankEditMode ? (
              <>
                <input
                  name="bankName"
                  type="text"
                  value={editableBankDetails.bankName || ''}
                  onChange={(e) => handleInputChange(e, 'Bank')}
                  placeholder="Bank Name"
                />
                <input
                  name="accountTitle"
                  type="text"
                  value={editableBankDetails.accountTitle || ''}
                  onChange={(e) => handleInputChange(e, 'Bank')}
                  placeholder="Account Title"
                />
                <input
                  name="accountNumber"
                  type="text"
                  value={editableBankDetails.accountNumber || ''}
                  onChange={(e) => handleInputChange(e, 'Bank')}
                  placeholder="Account Number"
                />
                <input
                  name="iban"
                  type="text"
                  value={editableBankDetails.iban || ''}
                  onChange={(e) => handleInputChange(e, 'Bank')}
                  placeholder="IBAN"
                />
                <button className="save-button" onClick={() => handleSaveChanges('Bank')}>Save Changes</button>
              </>
            ) : (
              <>
                <p><strong>Bank Name:</strong> {editableBankDetails.bankName}</p>
                <p><strong>Account Title:</strong> {editableBankDetails.accountTitle}</p>
                <p><strong>Account Number:</strong> {editableBankDetails.accountNumber}</p>
                <p><strong>IBAN:</strong> {editableBankDetails.iban}</p>
                <button className="edit-button" onClick={() => handleEditToggle('Bank')}>Update Account</button>
              </>
            )}
          </div>
        </div>
      )}

      {jazzCashDetails && (
        <div className="account-card">
          <h2>JazzCash Account Details</h2>
          <div className="account-status">
            <span>{isJazzCashActive ? "Active" : "Inactive"}</span>
            <label className="switch">
              <input type="checkbox" checked={isJazzCashActive} onChange={handleToggleJazzCash} />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="account-info">
            {isJazzCashEditMode ? (
              <>
                <input
                  name="accountTitle"
                  type="text"
                  value={editableJazzCashDetails.accountTitle || ''}
                  onChange={(e) => handleInputChange(e, 'JazzCash')}
                  placeholder="Account Title"
                />
                <input
                  name="accountNumber"
                  type="text"
                  value={editableJazzCashDetails.accountNumber || ''}
                  onChange={(e) => handleInputChange(e, 'JazzCash')}
                  placeholder="Account Number"
                />
                <button className="save-button" onClick={() => handleSaveChanges('JazzCash')}>Save Changes</button>
              </>
            ) : (
              <>
                <p><strong>Account Title:</strong> {editableJazzCashDetails.accountTitle}</p>
                <p><strong>Account Number:</strong> {editableJazzCashDetails.accountNumber}</p>
                <button className="edit-button" onClick={() => handleEditToggle('JazzCash')}>Update Account</button>
              </>
            )}
          </div>
        </div>
      )}

      {easyPaisaDetails && (
        <div className="account-card">
          <h2>EasyPaisa Account Details</h2>
          <div className="account-status">
            <span>{isEasyPaisaActive ? "Active" : "Inactive"}</span>
            <label className="switch">
              <input type="checkbox" checked={isEasyPaisaActive} onChange={handleToggleEasyPaisa} />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="account-info">
            {isEasyPaisaEditMode ? (
              <>
                <input
                  name="accountTitle"
                  type="text"
                  value={editableEasyPaisaDetails.accountTitle || ''}
                  onChange={(e) => handleInputChange(e, 'EasyPaisa')}
                  placeholder="Account Title"
                />
                <input
                  name="accountNumber"
                  type="text"
                  value={editableEasyPaisaDetails.accountNumber || ''}
                  onChange={(e) => handleInputChange(e, 'EasyPaisa')}
                  placeholder="Account Number"
                />
                <button className="save-button" onClick={() => handleSaveChanges('EasyPaisa')}>Save Changes</button>
              </>
            ) : (
              <>
                <p><strong>Account Title:</strong> {editableEasyPaisaDetails.accountTitle}</p>
                <p><strong>Account Number:</strong> {editableEasyPaisaDetails.accountNumber}</p>
                <button className="edit-button" onClick={() => handleEditToggle('EasyPaisa')}>Update Account</button>
              </>
            )}
          </div>
        </div>
      )}

      <BackButton />
    </div>
  );
}

export default NextPage;
