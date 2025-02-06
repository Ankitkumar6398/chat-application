import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/myDatabase`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected!");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
    }
};

export default connectDB;
