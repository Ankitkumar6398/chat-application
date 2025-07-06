import React, { useState } from 'react';
import { BiSearchAlt2 } from "react-icons/bi";
import { FiMoreVertical, FiUser, FiArrowLeft } from "react-icons/fi";
import OtherUsers from './OtherUsers';
import ProfilePhotoUpload from './ProfilePhotoUpload';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
// import '../CSS/SideBar.css';

// Define BASE_URL directly instead of importing it
const BASE_URL = "http://localhost:8080";

const SideBar = ({ onBackClick }) => {
    const [search, setSearch] = useState("");
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const { otherUsers, authUser } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/v1/user/logout`, {
                withCredentials: true
            });
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            dispatch(setMessages(null));
            dispatch(setOtherUsers(null));
            dispatch(setSelectedUser(null));
        } catch (error) {
            console.log(error);
        }
    };

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.find((user) =>
            user.fullName.toLowerCase().includes(search.toLowerCase())
        );
        if (conversationUser) {
            dispatch(setOtherUsers([conversationUser]));
        } else {
            toast.error("User not found!");
        }
    };

    const handleImageError = (e) => {
        // Create initials from full name
        const initials = authUser?.fullName
            ?.split(' ')
            .map(name => name.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2) || 'U';
        
        // Create a colored background based on user name
        const colors = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50'];
        const colorIndex = authUser?.fullName?.length % colors.length || 0;
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
            <div className="w-full h-full flex flex-col bg-white">
                {/* Header - WhatsApp style */}
                <div className="bg-indigo-600 text-white px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        {onBackClick && (
                            <button
                                onClick={onBackClick}
                                className="md:hidden p-1 hover:bg-indigo-700 rounded-full transition-colors"
                            >
                                <FiArrowLeft className="w-5 h-5" />
                            </button>
                        )}
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 cursor-pointer hover:opacity-80 transition-opacity">
                                {authUser?.profilePhoto ? (
                                    <img 
                                        src={authUser.profilePhoto} 
                                        alt="profile" 
                                        className="w-full h-full object-cover"
                                        onError={handleImageError}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-white/20 text-white font-semibold">
                                        {authUser?.fullName?.charAt(0)?.toUpperCase() || 'U'}
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => setIsProfileModalOpen(true)}
                                className="absolute -bottom-1 -right-1 w-5 h-5 bg-white text-indigo-600 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                                <FiUser className="w-2.5 h-2.5" />
                            </button>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">
                                {authUser?.fullName}
                            </div>
                            <div className="text-sm text-indigo-100">
                                @{authUser?.username}
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="p-2 text-white hover:bg-indigo-700 rounded-full transition-colors"
                    >
                        <FiMoreVertical className="w-5 h-5" />
                    </button>
                </div>

                {/* Search Bar */}
                <div className="p-3 bg-gray-50 border-b border-gray-200">
                    <form onSubmit={searchSubmitHandler} className="relative">
                        <div className="relative">
                            <BiSearchAlt2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                placeholder="Search or start new chat"
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                            />
                        </div>
                    </form>
                </div>

                {/* Chats List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <OtherUsers />
                </div>

                {/* Logout Button - Hidden on mobile, shown in menu on desktop */}
                <div className="hidden md:block p-4 border-t border-gray-200">
                    <button
                        onClick={logoutHandler}
                        className="w-full py-2 px-4 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors text-sm font-medium"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Profile Photo Upload Modal */}
            <ProfilePhotoUpload 
                isOpen={isProfileModalOpen} 
                onClose={() => setIsProfileModalOpen(false)} 
            />
        </>
    );
};

export default SideBar;
