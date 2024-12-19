import React, { useEffect, useState } from 'react';
import Events from './Events';
import Button from './Button';
import './style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Box({ selectedEvent, handleCheckboxChange }) {
  const [eventTimes, setEventTimes] = useState({
    'picked up': '',
    'washed': '',
    'out for delivery': '',
    'delivered': '',
  });

  useEffect(() => {
    // Fetch the current event status from the backend
    fetch('http://localhost:5000/events', )
      .then((response) => response.json())
      .then((data) => {
        if (data.event) {
          handleCheckboxChange(data.event); // Update the selected event from backend
          // Update event times from the backend if available
          setEventTimes(data.eventTimes || {});
        }
      })
      .catch((error) => console.error('Error fetching event:', error));
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      // Show toast when an event is triggered
      toast(`Order has been ${selectedEvent}`);

      // Update the event time for the triggered event
      setEventTimes((prevTimes) => ({
        ...prevTimes,
        [selectedEvent]: new Date().toLocaleString(), // Set current date and time for the specific event
      }));
    }
  }, [selectedEvent]);

  return (
    <div className="flexclass">
      <div className="box">
        <Events
          label="Picked Up"
          value="picked up"
          id="picked-up"
          selectedValue={selectedEvent}
          time={eventTimes['picked up']} // Get the stored time for 'picked up'
          onChange={handleCheckboxChange}
        />
        <Events
          label="Washed"
          value="washed"
          id="washed"
          selectedValue={selectedEvent}
          time={eventTimes['washed']} // Get the stored time for 'washed'
          onChange={handleCheckboxChange}
        />
        <Events
          label="Out for Delivery"
          value="out for delivery"
          id="out-for-delivery"
          selectedValue={selectedEvent}
          time={eventTimes['out for delivery']} // Get the stored time for 'out for delivery'
          onChange={handleCheckboxChange}
        />
        <Events
          label="Delivered"
          value="delivered"
          id="delivered"
          selectedValue={selectedEvent}
          time={eventTimes['delivered']} // Get the stored time for 'delivered'
          onChange={handleCheckboxChange}
        />

        <Button />
        <div className="map">
          <a href="http://127.0.0.1:8000/">Track on Maps</a>
        </div>
      </div>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
}

export default Box;
