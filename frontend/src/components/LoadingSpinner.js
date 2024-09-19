import React from 'react';
import './LoadingSpinner.css'; // Ensure you create this CSS file or remove this line if unnecessary

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
