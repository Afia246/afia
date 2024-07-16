require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); // Assuming db.js handles MongoDB connection
const creatuser = require('./routes/creatuser'); // Example route file

const app = express();
const PORT = process.env.PORT || 5000; // Use environment variable or default to 5000

const corsOptions = {
  origin: process.env.FRONTEND_URL, // Use frontend URL from environment variables
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Enable CORS with specified options
app.use(express.json()); // Parse JSON bodies of incoming requests

// Connect to MongoDB using the provided URI
connectDB(process.env.MONGO_URI);

// Define routes
app.use('/api', creatuser); // Example API route

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
