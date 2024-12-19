import React, { useState } from 'react';
import Checkbox from './Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function CheckboxPage({ handleCheckboxChange, selectedEvent }) {
  const [disabledCheckboxes, setDisabledCheckboxes] = useState(false);
  const navigate = useNavigate();

  // Function to handle the checkbox click event
  const handleCheckboxClick = (value) => {
    const currentTime = new Date().toLocaleString(); // Capture the current date and time
    handleCheckboxChange(value);  // Handle checkbox change
    setDisabledCheckboxes(true);  // Disable checkboxes once clicked

    // Create payload with selected event and time
    const eventPayload = {
      selectedEvent: value,
      eventTime: currentTime,  // Add current date and time to payload
    };

    // Send payload to backend (Flask API)
    fetch('http://localhost:5000/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventPayload),
    })
      .then((response) => response.json())
      .then(() => {
        toast.success(`Event updated: ${value} at ${currentTime}`);
      })
      .catch((error) => console.error('Error:', error));

    // Redirect to track page after submission
    navigate('/track');
  };

  return (
    <div className="box2">
      <h3>Ordertracker</h3>

      {/* Checkboxes for different events */}
      <Checkbox
        label="Picked Up"
        value="picked up"
        id="picked-up"
        onChange={handleCheckboxClick}  // Handle click on checkbox
        checked={selectedEvent === 'picked up'}
        disabled={disabledCheckboxes}
      />
      <Checkbox
        label="Washed"
        value="washed"
        id="washed"
        onChange={handleCheckboxClick}
        checked={selectedEvent === 'washed'}
        disabled={disabledCheckboxes}
      />
      <Checkbox
        label="Out for Delivery"
        value="out for delivery"
        id="out-for-delivery"
        onChange={handleCheckboxClick}
        checked={selectedEvent === 'out for delivery'}
        disabled={disabledCheckboxes}
      />
      <Checkbox
        label="Delivered"
        value="delivered"
        id="delivered"
        onChange={handleCheckboxClick}
        checked={selectedEvent === 'delivered'}
        disabled={disabledCheckboxes}
      />

      <Link to="/track">Back to Order Tracking</Link>
    </div>
  );
}

export default CheckboxPage;
