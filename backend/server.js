const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require('./models/Employee'); // Adjust path as per your file structure

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = 'mongodb+srv://your_username:your_password@your_cluster_url/your_database_name';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Route for login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the employee by username
    const employee = await EmployeeModel.findOne({ username });

    if (!employee) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, employee.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Login successful
    res.status(200).json({ message: 'Login successful', token: 'dummy-token' }); // Replace with actual token generation
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
