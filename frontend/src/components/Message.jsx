import React, { useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import '../CSS/Message.css';

const Message = ({ message }) => {
    const scroll = useRef(null);
    const { authUser, selectedUser } = useSelector(store => store.user);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    // Format timestamp dynamically
    const formatTime = (timestamp) => {
        if (!timestamp) return "";
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div ref={scroll} className={`chat ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="avatar-container">
                    <img 
                        className="user-avatar"
                        alt="User Avatar"
                        src={message?.senderId === authUser?._id ? authUser?.profilePhoto || '/default-avatar.png' : selectedUser?.profilePhoto || '/default-avatar.png'} 
                        onError={(e) => e.target.src = '/default-avatar.png'} // Fallback for broken images
                    />
                </div>
            </div>
            <div className="chat-header">
                <time className="chat-time">{formatTime(message?.timestamp)}</time>
            </div>
            <div className={`chat-bubble ${message?.senderId !== authUser?._id ? 'other-user-message' : ''}`}>
                {message?.message}
            </div>
        </div>
    );
};

export default Message;
