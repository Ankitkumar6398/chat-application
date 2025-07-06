import React from 'react';
import SendInput from './SendInput';
import Messages from './Messages';
import { useSelector } from "react-redux";
import { FiArrowLeft, FiMoreVertical } from "react-icons/fi";

const MessageContainer = ({ onMenuClick }) => {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
    const isOnline = onlineUsers?.includes(selectedUser?._id);

    const handleImageError = (e) => {
        // Create initials from full name
        const initials = selectedUser?.fullName
            ?.split(' ')
            .map(name => name.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2) || 'U';
        
        // Create a colored background based on user name
        const colors = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50'];
        const colorIndex = selectedUser?.fullName?.length % colors.length || 0;
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
        <>
            {
                selectedUser !== null ? (
                    <div className='flex flex-col flex-1 h-full bg-gray-50'>
                        {/* Header - Matching sidebar style */}
                        <div className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-4 flex items-center justify-between shadow-sm'>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={onMenuClick}
                                    className="md:hidden p-2 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    <FiArrowLeft className="w-5 h-5" />
                                </button>
                                <div className="relative">
                                    <div className='w-10 h-10 rounded-full overflow-hidden bg-white/20 ring-2 ring-white/30'>
                                        <img 
                                            src={selectedUser?.profilePhoto} 
                                            alt="user-profile" 
                                            className="w-full h-full object-cover"
                                            onError={handleImageError}
                                        />
                                    </div>
                                    {isOnline && (
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
                                    )}
                                </div>
                                <div className='flex-1 min-w-0'>
                                    <div className='font-semibold text-lg truncate'>
                                        {selectedUser?.fullName}
                                    </div>
                                    <div className='text-sm text-blue-100'>
                                        {isOnline ? 'online' : 'offline'}
                                    </div>
                                </div>
                            </div>
                            <button className="p-2 text-white hover:bg-white/20 rounded-full transition-colors">
                                <FiMoreVertical className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <Messages />
                        
                        {/* Input Area */}
                        <SendInput />
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center flex-1 bg-gray-50'>
                        <div className="text-center p-8">
                            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h1 className='text-2xl font-bold text-gray-800 mb-2'>Hi, {authUser?.fullName}</h1>
                            <h1 className='text-lg text-gray-600'>Let's start a conversation</h1>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default MessageContainer;
