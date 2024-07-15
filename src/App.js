import React from 'react';
import './App.css';
import Home from './Screens/Home'; // Ensure the casing matches
import Login from './Screens/Login';
import Signup from './Screens/Signup.js';
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { CartProvider } from './components/ContextReducer.js';
import Cart from './Screens/Cart.js';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>  
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
          </Routes> 
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
