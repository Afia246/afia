const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://tree123:tree123@cluster0.r7pte9e.mongodb.net/Central_Perk";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");

    const db = mongoose.connection.db;
    const collection = db.collection("food_items");

    const data = await collection.find({}).toArray();
    console.log(data);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = mongoDB;
