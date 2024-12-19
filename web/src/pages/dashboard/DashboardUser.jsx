import React from 'react';
import "./DashboardUser.css";
import {useAuth} from '../../utils/authContext'
import {useNavigate} from 'react-router-dom'

const DashboardUser = () => {
  const {currentUser}=useAuth();
  const navigate=useNavigate();
  
   return (
      <div className="dashboard-home">
        <h2>Welcome , {currentUser.fullName}</h2>
        <p>Here's a quick overview of your recent activities and stats.</p>
  
        <div className="stats-container">
          <div className="stat-box">
            <h3>Total Orders</h3>
            <p>45</p>
          </div>
          <div className="stat-box">
            <h3>Pending Orders</h3>
            <p>10</p>
          </div>
          <div className="stat-box">
            <h3>Completed Orders</h3>
            <p>35</p>
          </div>
          <div className="stat-box">
            <h3>Outstanding Payments</h3>
            <p>$150</p>
          </div>
        </div>
  
        <div className="recent-activities">
          <h3>Recent Activities</h3>
          <ul>
            <li>Order #12345: Completed on 27th September</li>
            <li>Order #12346: In progress, expected delivery: 29th September</li>
            <li>Payment of $45 made for Order #12344 on 25th September</li>
          </ul>
        </div>
  
        <div className="quick-actions">
          <button onClick={() => navigate('/dashboard/new-order')}>Make a New Order</button>
          <button onClick={() => navigate('/dashboard/track-order')}>Track Current Orders</button>
        </div>
      </div>
    );
};

export default DashboardUser;