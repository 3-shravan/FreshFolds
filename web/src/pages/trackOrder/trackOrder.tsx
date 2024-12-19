import React, { useState } from 'react';
import axios from 'axios';
import "./trackOrder.css";

const TrackOrder: React.FC = () => {
  const [trackingId, setTrackingId] = useState('');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [error, setError] = useState('');

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/orders/${trackingId}`);
      setOrderDetails(response.data);
    } catch (error: any) {
      setError('Error fetching order details');
      console.error('Error fetching order details:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId) {
      fetchOrderDetails();
    }
  };

  return (
    <div className="track-order-page">
      <h1>Track Your Order</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Enter tracking ID"
          required
        />
        <button type="submit">Track Order</button>
      </form>
      {error && <p className="error">{error}</p>}
      {orderDetails && (
        <div className="order-details">
          <h2>Order Details</h2>
          <p><span>Tracking ID:</span> {orderDetails.trackingId}</p>
          <p><span>User:</span> {orderDetails.user}</p>
          <p><span>Address:</span> {orderDetails.address}</p>
          <p><span>Number of Clothes:</span> {orderDetails.numberOfClothes}</p>
          <p><span>Date Submitted:</span> {orderDetails.dateSubmitted}</p>
          <p><span>Expected Date:</span> {orderDetails.expectedDate}</p>
          <p><span>Status:</span> {orderDetails.status}</p>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
