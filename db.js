const mongoose = require("mongoose");

var mongoURL = "mongodb+srv://tree123:tree123@cluster0.r7pte9e.mongodb.net/mern-rooms";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

connection.on('error', () => {
    console.log('MongoDb connection failed');
});

connection.on('connected', () => {
    console.log('MongoDb connection successful');
});

module.exports = mongoose;
