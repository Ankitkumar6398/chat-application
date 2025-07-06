import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = ({ user }) => {
    const dispatch = useDispatch();
    const { selectedUser, onlineUsers } = useSelector(store => store.user);
    const isOnline = onlineUsers?.includes(user._id);

    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
    };

    const handleImageError = (e) => {
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
        fallbackDiv.className = 'w-full h-full flex items-center justify-center text-white font-semibold text-sm';
        fallbackDiv.style.backgroundColor = backgroundColor;
        fallbackDiv.textContent = initials;
        parent.appendChild(fallbackDiv);
    };

    return (
        <div 
            onClick={() => selectedUserHandler(user)} 
            className={`flex items-center p-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                selectedUser?._id === user?._id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
            }`}
        >
            <div className="relative mr-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 ring-2 ring-gray-100">
                    <img 
                        src={user?.profilePhoto} 
                        alt="user-profile" 
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                    />
                </div>
                {isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
                )}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <div className="font-semibold text-gray-900 truncate">
                        {user?.fullName}
                    </div>
                    <div className="text-xs text-gray-400 ml-2">
                        {/* You can add last message time here */}
                    </div>
                </div>
                <div className="text-sm text-gray-500 truncate">
                    {/* You can add last message preview here */}
                    <span className={`inline-flex items-center ${isOnline ? 'text-green-600' : 'text-gray-400'}`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                        {isOnline ? 'online' : 'offline'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default OtherUser;
