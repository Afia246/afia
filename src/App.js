import React from 'react';
import './App.css';
import Home from './Screens/Home'; // Ensure the casing matches
import Login from './Screens/Login';
import Signup from './Screens/Signup.js';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import{
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";


function App() {
  return (
    <Router>
      <div>  
         <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/creatuser" element={<Signup/>}/>
          </Routes> 
          </div>
    
    </Router>
  );
}

export default App;
