import React, { useState, useEffect } from 'react';
import './HelpAndDisputes.css';
import BackButton from './BackButton';

const HelpAndDisputes = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [disputeHistory, setDisputeHistory] = useState([]);
  const [disputeForm, setDisputeForm] = useState({
    description: '',
    category: '',
    attachments: []
  });
  const [trackDisputeId, setTrackDisputeId] = useState('');
  const [trackedDispute, setTrackedDispute] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [showNoDisputeMessage, setShowNoDisputeMessage] = useState(false);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('disputeHistory')) || [];
    setDisputeHistory(savedHistory);
  }, []);

  useEffect(() => {
    localStorage.setItem('disputeHistory', JSON.stringify(disputeHistory));
  }, [disputeHistory]);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setDisputeForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const isValid = files.every(file => 
      file.size <= 2 * 1024 * 1024 && // Max 2MB
      ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)
    );

    if (!isValid) {
      alert('Invalid file type or size. Please upload images (JPEG/PNG) or PDFs under 2MB.');
      return;
    }

    setDisputeForm(prevForm => ({
      ...prevForm,
      attachments: files
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDispute = {
      id: Date.now().toString(),
      description: disputeForm.description,
      category: disputeForm.category,
      attachments: disputeForm.attachments,
      status: 'Pending',
      resolution: 'Awaiting response from Admin'
    };

    setDisputeHistory(prevHistory => [...prevHistory, newDispute]);
    setDisputeForm({
      description: '',
      category: '',
      attachments: []
    });
    setFeedbackMessage('Dispute submitted successfully.');
  };

  const handleTrackDispute = () => {
    setIsTracking(true);
    setShowNoDisputeMessage(false);

    const formattedTrackDisputeId = trackDisputeId.trim();

    if (!formattedTrackDisputeId) {
      setTrackedDispute(null);
      setIsTracking(false);
      return;
    }

    const foundDispute = disputeHistory.find(
      (dispute) => dispute.id === formattedTrackDisputeId
    );

    setTrackedDispute(foundDispute || null);
    setShowNoDisputeMessage(!foundDispute);
    setIsTracking(false);
  };

  const handleClearStorage = () => {
    localStorage.removeItem('disputeHistory');
    setDisputeHistory([]);
  };

  const filteredDisputeHistory = filterStatus === 'All' ? disputeHistory : disputeHistory.filter(
    (dispute) => dispute.status === filterStatus
  );

  return (
    <div className="help-and-disputes">
      <BackButton />

      <div className="help-center">
        <h2>Help Center</h2>
      </div>

      <div className="dispute-management">
        <h2>Dispute Management</h2>
        <div className="dispute-form">
          <h3>Submit a Dispute</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="dispute-description">Description</label>
              <textarea
                id="dispute-description"
                name="description"
                placeholder="Describe your dispute"
                rows="4"
                value={disputeForm.description}
                onChange={handleFormChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="dispute-category">Category</label>
              <select
                id="dispute-category"
                name="category"
                value={disputeForm.category}
                onChange={handleFormChange}
                required
              >
                <option value="">Select Category</option>
                <option value="order">Order Issue</option>
                <option value="payment">Payment Issue</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="dispute-attachments">Attachments</label>
              <input
                id="dispute-attachments"
                name="attachments"
                type="file"
                multiple
                onChange={handleFileChange}
              />
            </div>
            <button type="submit" className="submit-button">Submit</button>
            {feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>}
          </form>
        </div>

        <div className="dispute-tracking">
          <h3>Track Your Dispute</h3>
          <p>Enter your dispute ID to track the status:</p>
          <input
            type="text"
            placeholder="Enter Dispute ID"
            value={trackDisputeId}
            onChange={(e) => setTrackDisputeId(e.target.value)}
            className="dispute-id-input"
          />
          <button onClick={handleTrackDispute} className="track-button">
            Track
          </button>
          {isTracking ? (
            <p>Loading...</p>
          ) : (
            trackedDispute ? (
              <div className="tracked-dispute">
                <p><strong>Dispute ID:</strong> {trackedDispute.id}</p>
                <p><strong>Description:</strong> {trackedDispute.description}</p>
                <p><strong>Category:</strong> {trackedDispute.category}</p>
                <p><strong>Status:</strong> {trackedDispute.status}</p>
                <p><strong>Resolution:</strong> {trackedDispute.resolution}</p>
              </div>
            ) : (
              showNoDisputeMessage && <p>No dispute found with ID "{trackDisputeId}".</p>
            )
          )}
        </div>

        <div className="dispute-history">
          <h3>Dispute History</h3>
          <div className="filter-section">
            <label htmlFor="status-filter">Filter by status:</label>
            <select
              id="status-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          <button onClick={handleClearStorage} className="clear-button">
            Clear History
          </button>
          <ul>
            {filteredDisputeHistory.map(dispute => (
              <li key={dispute.id}>
                <strong>Dispute ID:</strong> {dispute.id} <br />
                <strong>Description:</strong> {dispute.description} <br />
                <strong>Category:</strong> {dispute.category} <br />
                <strong>Status:</strong> {dispute.status} <br />
                <strong>Resolution:</strong> {dispute.resolution}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HelpAndDisputes;
