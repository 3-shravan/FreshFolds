import React from 'react';

function Events({ label, value, id, selectedValue, time, onChange }) {
  // Check if the event has already occurred
  const isEventOccurred = selectedValue === value;

  return (
    <div className="event">
      <div className={`eventdetail ${isEventOccurred ? 'occurred' : ''}`}>
        <input
          type="radio"
          value={value}
          id={id}
          checked={selectedValue === value}
          readOnly
          onChange={() => onChange(value)} // Trigger onChange when clicked
        />
        <label htmlFor={id}>{label}</label>
        {/* Display the time if available, otherwise "yet to be processed" */}
        <h3>{isEventOccurred ? time : 'yet to be processed'}</h3>
      </div>
    </div>
  );
}

export default Events;
