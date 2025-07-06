import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Use MongoDB Atlas URI from environment variable, fallback to local MongoDB
        const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/chatApp";
        
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log("✅ MongoDB Connected Successfully!");
        console.log(`📊 Database: ${mongoose.connection.name}`);
        console.log(`🌐 Host: ${mongoose.connection.host}`);
        
    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err.message);
        process.exit(1); // Exit process with failure
    }
};

// Handle connection events
mongoose.connection.on('connected', () => {
    console.log('🎉 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('🔌 Mongoose disconnected from MongoDB');
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('🛑 MongoDB connection closed through app termination');
    process.exit(0);
});

export default connectDB;
