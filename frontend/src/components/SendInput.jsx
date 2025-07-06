import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from '../redux/messageSlice';
import toast from 'react-hot-toast';

const BASE_URL = "http://localhost:8080";

const SendInput = () => {
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        if (!selectedUser?._id) {
            toast.error("Please select a user to send message");
            return;
        }

        setIsLoading(true);
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/message/send/${selectedUser._id}`, 
                { message }, 
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            
            if (res.data?.newMessage) {
                dispatch(setMessages([...messages, res.data.newMessage]));
                setMessage("");
                toast.success("Message sent successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to send message");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center space-x-3">
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder="Send a message..."
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl text-sm transition-all duration-300 bg-white shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    disabled={isLoading || !selectedUser?._id}
                />
                <button 
                    type="submit" 
                    className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-indigo-200"
                    disabled={isLoading || !message.trim() || !selectedUser?._id}
                >
                    <IoSend className="w-5 h-5" />
                </button>
            </div>
        </form>
    );
};

export default SendInput;
