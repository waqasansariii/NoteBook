const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/inotebook"; // Update with your actual DB name

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI)
        console.log("✅ Connected to Mongo Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // Exit the process if the connection fails
    }
};

module.exports = connectToMongo;
