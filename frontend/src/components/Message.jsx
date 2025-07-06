import React, { useEffect, useRef } from 'react';
import { useSelector } from "react-redux";

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

    const isOwnMessage = message?.senderId === authUser?._id;

    const handleImageError = (e) => {
        const user = isOwnMessage ? authUser : selectedUser;
        // Create initials from full name
        const initials = user?.fullName
            ?.split(' ')
            .map(name => name.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2) || 'U';
        
        // Create a colored background based on user name
        const colors = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50'];
        const colorIndex = user?.fullName?.length % colors.length || 0;
        const backgroundColor = colors[colorIndex];
        
        // Replace the img with a div containing initials
        e.target.style.display = 'none';
        const parent = e.target.parentElement;
        const fallbackDiv = document.createElement('div');
        fallbackDiv.className = 'w-full h-full flex items-center justify-center text-white font-semibold text-xs';
        fallbackDiv.style.backgroundColor = backgroundColor;
        fallbackDiv.textContent = initials;
        parent.appendChild(fallbackDiv);
    };

    return (
        <div ref={scroll} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-2`}>
            <div className={`flex items-end space-x-2 max-w-[75%] ${isOwnMessage ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {/* Avatar - only show for other user's messages */}
                {!isOwnMessage && (
                    <div className="flex-shrink-0">
                        <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200">
                            <img 
                                className="w-full h-full object-cover"
                                alt="User Avatar"
                                src={selectedUser?.profilePhoto || '/default-avatar.png'} 
                                onError={handleImageError}
                            />
                        </div>
                    </div>
                )}
                
                {/* Message Bubble */}
                <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}>
                    <div className={`px-3 py-2 rounded-2xl max-w-full break-words ${
                        isOwnMessage 
                            ? 'bg-indigo-600 text-white rounded-br-md' 
                            : 'bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-200'
                    }`}>
                        <div className="text-sm leading-relaxed">
                            {message?.message}
                        </div>
                    </div>
                    
                    {/* Timestamp */}
                    <div className={`text-xs text-gray-500 mt-1 px-1 ${
                        isOwnMessage ? 'text-right' : 'text-left'
                    }`}>
                        {formatTime(message?.timestamp)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;
