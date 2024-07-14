const mongoose = require('mongoose');

const connectDB = async (mongoURI) => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        // Assuming 'food_items' is your collection name
        const foodItemsCollection = mongoose.connection.collection("food_items");

        // Fetch data from 'food_items' collection
        const foodItemsData = await foodItemsCollection.find({}).toArray();

        // Assuming 'foodCategory' is another collection name
        const foodCategoryCollection = mongoose.connection.collection("foodCategory");

        // Fetch data from 'foodCategory' collection
        const foodCategoryData = await foodCategoryCollection.find({}).toArray();

        // Assign fetched data to global variables
        global.food_items = foodItemsData;
        global.foodCategory = foodCategoryData;

        console.log("Fetched food items from MongoDB:", global.food_items);
        console.log("Fetched food categories from MongoDB:", global.foodCategory);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectDB;
