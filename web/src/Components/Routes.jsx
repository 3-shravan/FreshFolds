import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RequestSubmission from './RequestSubmission';
import Reschedule from './Reschedule';
import NotFound from './NotFound';
import LaundryRequest from './LaundryRequest';  // Importing the LaundryRequest component

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Route for request submission */}
        <Route path="/" element={<RequestSubmission />} />
        
        {/* Route for laundry request */}
        <Route path="/" element={<LaundryRequest />} />
        
        {/* Route for rescheduling a request, using requestId from the URL */}
        <Route path="/reschedule/:requestId" element={<Reschedule />} />

        {/* Fallback route for invalid URLs */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
