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
        <>
            <div 
                onClick={() => selectedUserHandler(user)} 
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-100 ${
                    selectedUser?._id === user?._id ? 'bg-indigo-50 border-l-4 border-indigo-500' : ''
                }`}
            >
                <div className="relative mr-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                        <img 
                            src={user?.profilePhoto} 
                            alt="user-profile" 
                            className="w-full h-full object-cover"
                            onError={handleImageError}
                        />
                    </div>
                    {isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">
                        {user?.fullName}
                    </div>
                </div>
            </div>
            <div className="border-b border-gray-100 mx-3"></div>
        </>
    );
};

export default OtherUser;
