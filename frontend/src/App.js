import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './Screens/Home'; 
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import Cart from './Screens/Cart';
import MyOrder from './Screens/MyOrder';
import LoadingSpinner from './components/LoadingSpinner'; // Import the loading spinner component
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/ContextReducer.js';

function App() {
  const [loading, setLoading] = useState(true); // Manage loading state

  // Simulate loading (e.g., fetching initial data)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Turn off loading after 2 seconds (or after API call)
    }, 2000); // Adjust time according to actual loading time

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (loading) {
    return <LoadingSpinner />; // Show spinner while loading
  }

  return (
    <CartProvider>
      <Router>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/creatuser" element={<Signup />} />
            <Route exact path="/myOrder" element={<MyOrder />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route path="*" element={<h2>404 Page Not Found</h2>} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;