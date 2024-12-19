import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

function Button() {
  const handleClick = () => {
    toast.success('Your delivery has been confirmed. Help us by rating our services!');
  };

  return (
    <div>
      <button className="btn" onClick={handleClick}>
        Confirm Delivery
      </button>
      <ToastContainer />
    </div>
  );
}

export default Button;
