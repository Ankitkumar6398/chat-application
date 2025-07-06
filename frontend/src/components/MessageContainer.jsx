import React from 'react';
import SendInput from './SendInput';
import Messages from './Messages';
import { useSelector } from "react-redux";

const MessageContainer = () => {
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
                    <div className='flex flex-col flex-1 h-full'>
                        <div className='flex items-center p-4 border-b border-gray-200 bg-white'>
                            <div className="relative mr-3">
                                <div className='w-10 h-10 rounded-full overflow-hidden bg-gray-200'>
                                    <img 
                                        src={selectedUser?.profilePhoto} 
                                        alt="user-profile" 
                                        className="w-full h-full object-cover"
                                        onError={handleImageError}
                                    />
                                </div>
                                {isOnline && (
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                )}
                            </div>
                            <div className='flex-1'>
                                <div className='font-semibold text-gray-900'>
                                    {selectedUser?.fullName}
                                </div>
                                <div className='text-sm text-gray-500'>
                                    {isOnline ? 'Online' : 'Offline'}
                                </div>
                            </div>
                        </div>
                        <Messages />
                        <SendInput />
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center flex-1 bg-gray-50'>
                        <h1 className='text-3xl font-bold text-gray-800 mb-2'>Hi, {authUser?.fullName}</h1>
                        <h1 className='text-lg text-gray-600'>Let's start a conversation</h1>
                    </div>
                )
            }
        </>
    )
}

export default MessageContainer;
