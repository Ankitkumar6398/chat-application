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
        <div className="bg-white border-t border-gray-200 p-3">
            <form onSubmit={onSubmitHandler} className="flex items-end space-x-3">
                <div className="flex-1 relative">
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        placeholder="Type a message..."
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                        disabled={isLoading || !selectedUser?._id}
                        rows="1"
                    />
                </div>
                <button 
                    type="submit" 
                    className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-200 flex items-center justify-center"
                    disabled={isLoading || !message.trim() || !selectedUser?._id}
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <IoSend className="w-5 h-5" />
                    )}
                </button>
            </form>
        </div>
    );
};

export default SendInput;
