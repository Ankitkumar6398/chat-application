import {Server} from "socket.io";
import http from "http";
import express from "express";

// Initialize express app
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with CORS configuration
const io = new Server(server, {
    cors:{
        origin:['http://localhost:3000'], // Allow requests from frontend
        methods:['GET', 'POST'],
        credentials: true
    },
});

// Helper function to get socket ID of a user
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

// Map to store user IDs and their corresponding socket IDs
const userSocketMap = {}; // {userId->socketId}

// Handle socket connections
io.on('connection', (socket)=>{
    // Get userId from query parameters
    const userId = socket.handshake.query.userId
    if(userId !== undefined){
        // Store user's socket ID
        userSocketMap[userId] = socket.id;
    } 

    // Emit online users list to all connected clients
    io.emit('getOnlineUsers',Object.keys(userSocketMap));

    // Handle user disconnection
    socket.on('disconnect', ()=>{
        // Remove user from online users map
        delete userSocketMap[userId];
        // Update online users list for all clients
        io.emit('getOnlineUsers',Object.keys(userSocketMap));
    })
})

export {app, io, server};

