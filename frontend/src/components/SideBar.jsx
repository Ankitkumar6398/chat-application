import React, { useState } from 'react';
import { BiSearchAlt2 } from "react-icons/bi";
import { FiMoreVertical, FiUser } from "react-icons/fi"; // Added user icon
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

const SideBar = () => {
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
            <div className="w-full sm:w-72 flex flex-col border-r border-gray-200 h-screen">
                {/* User Profile Section */}
                <div className="p-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 cursor-pointer hover:opacity-80 transition-opacity">
                                {authUser?.profilePhoto ? (
                                    <img 
                                        src={authUser.profilePhoto} 
                                        alt="profile" 
                                        className="w-full h-full object-cover"
                                        onError={handleImageError}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-indigo-500 text-white font-semibold">
                                        {authUser?.fullName?.charAt(0)?.toUpperCase() || 'U'}
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => setIsProfileModalOpen(true)}
                                className="absolute -bottom-1 -right-1 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors"
                            >
                                <FiUser className="w-3 h-3" />
                            </button>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 truncate">
                                {authUser?.fullName}
                            </div>
                            <div className="text-sm text-gray-500">
                                @{authUser?.username}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search & Actions */}
                <form
                    onSubmit={searchSubmitHandler}
                    className="flex items-center px-4 py-2 space-x-2 border-b border-gray-200"
                >
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Search..."
                        className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="p-2 text-gray-600 hover:text-blue-600 transition"
                    >
                        <BiSearchAlt2 className="w-5 h-5" />
                    </button>
                    <button
                        type="button"
                        className="p-2 text-gray-600 hover:text-blue-600 transition"
                    >
                        <FiMoreVertical className="w-5 h-5" />
                    </button>
                </form>

                {/* Divider */}
                <div className="h-px bg-gray-200"></div>

                {/* Other users list */}
                <div className="flex-1 overflow-y-auto">
                    <OtherUsers />
                </div>

                {/* Logout */}
                <div className="px-4 py-4 border-t border-gray-200">
                    <button
                        onClick={logoutHandler}
                        className="w-full py-2 px-4 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
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
