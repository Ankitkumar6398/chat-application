import React, { useState } from 'react';
import { BiSearchAlt2 } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi"; // Added three dots (more) icon
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
import '../CSS/SideBar.css';

// Define BASE_URL directly instead of importing it
const BASE_URL = "http://localhost:8080";

const SideBar = () => {
    const [search, setSearch] = useState("");
    const { otherUsers } = useSelector(store => store.user);
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

    return (
        <div className="sidebar">
            <form onSubmit={searchSubmitHandler} className="search-form">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                    type="text"
                    placeholder="Search..."
                />
                <button type="submit" className="search-button">
                    <BiSearchAlt2 className="search-icon" />
                </button>
                <button type="hamburger-button" className="action-button">
                    <FiMoreVertical className="hamburger-icon" />
                </button>
            </form>
            <div className="divider"></div>
            <OtherUsers />
            <div className="logout-container">
                <button onClick={logoutHandler} className="logout-button">Logout</button>
            </div>
        </div>
    );
};

export default SideBar;
