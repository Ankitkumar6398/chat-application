import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

// Controller to handle sending messages
export const sendMessage = async (req, res) => {
    try {
        // Get sender and receiver IDs
        const senderId = req.id;
        const receiverId = req.params.id;
        const { message } = req.body;

        // Find or create conversation between users
        let gotConversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        // Create new conversation if it doesn't exist
        if (!gotConversation) {
            gotConversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        // Create new message
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        // Add message to conversation
        if (newMessage) {
            gotConversation.messages.push(newMessage._id);
        }
        
        // Save both conversation and message
        await Promise.all([gotConversation.save(), newMessage.save()]);
         
        // Send real-time notification to receiver if online
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        // Return success response
        return res.status(201).json({
            newMessage
        });
    } catch (error) {
        console.log(error);
        // Return error response
        return res.status(500).json({
            message: "Error sending message",
            success: false
        });
    }
};

// Controller to handle fetching messages
export const getMessage = async (req, res) => {
    try {
        // Get sender and receiver IDs
        const receiverId = req.params.id;
        const senderId = req.id;

        // Find conversation and populate messages
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages"); 

        // Return messages
        return res.status(200).json(conversation?.messages);
    } catch (error) {
        console.log(error);
        // Return error response
        return res.status(500).json({
            message: "Error fetching messages",
            success: false
        });
    }
};