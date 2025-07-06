// const express = require('express')// method-1
import express from "express"; // method-2
import dotenv from "dotenv"; 
import connectDB from "./config/db.js";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/messsage.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 8080;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());

// CORS configuration
const corsOption = {
    origin: FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
};
app.use(cors(corsOption)); 

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Chat Application API is running',
        timestamp: new Date().toISOString(),
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
});

// routes
app.use("/api/v1/user", userRoute); 
app.use("/api/v1/message", messageRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Server Error:', err.stack);
    res.status(500).json({ 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

server.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`🌐 Frontend URL: ${FRONTEND_URL}`);
        console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
});
