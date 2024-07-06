import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      console.log('Login response:', response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error); // Log the full error object for detailed debugging
      if (error.response && error.response.status === 401) {
        setMessage('Unauthorized: Incorrect username or password');
      } else {
        setMessage('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {message && <div className="alert alert-danger">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Signup here</Link></p>
    </div>
  );
};

export default Login;
