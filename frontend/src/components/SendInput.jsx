import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from '../redux/messageSlice';


import '../CSS/SendInput.css';
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
        <form onSubmit={onSubmitHandler} className="send-input-form">
            <div className="input-container">
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder="Send a message..."
                    className="message-input"
                    disabled={isLoading || !selectedUser?._id}
                />
                <button 
                    type="submit" 
                    className="send-button"
                    disabled={isLoading || !message.trim() || !selectedUser?._id}
                >
                    <IoSend />
                </button>
            </div>
        </form>
    );
};

export default SendInput;
