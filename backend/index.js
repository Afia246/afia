const express = require('express');
const cors = require('cors');
const mongoDB = require("./db");
require('dotenv').config();
const app = express();
const port = 5000;

// Connect to MongoDB
mongoDB();

// Use CORS middleware
app.use(cors({
    origin: ['http://localhost:3000','https://afia-last.vercel.app'],// Allow requests from this origin
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', require("./Routes/CreatUser"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
