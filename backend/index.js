const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require("./db");

const app = express();
const port = process.env.PORT || 5000;

// Directly define your MongoDB URI here
const mongoURI = "mongodb+srv://tree123:tree123@cluster0.r7pte9e.mongodb.net/Central_Perk";

// Connect to MongoDB
connectDB(mongoURI);

// CORS middleware
app.use(cors({
    origin: ['http://localhost:3000', 'https://afia-last.vercel.app'], // Update with your allowed origins
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
}));

app.use(express.json());

// Routes
app.use('/api', require("./Routes/CreatUser"));
app.use('/api', require("./Routes/DisplayData"));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
