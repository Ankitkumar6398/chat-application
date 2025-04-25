import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';
import '../CSS/OtherUser.css';

const OtherUser = ({ user }) => {
    const dispatch = useDispatch();
    const { selectedUser, onlineUsers } = useSelector(store => store.user);
    const isOnline = onlineUsers?.includes(user._id);

    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
    };

    return (
        <>
            <div 
                onClick={() => selectedUserHandler(user)} 
                className={`user-container ${selectedUser?._id === user?._id ? 'selected-user' : ''}`}
            >
                <div className={`avatar ${isOnline ? 'online' : ''}`}>
                    <div className="avatar-img">
                        <img src={user?.profilePhoto} alt="user-profile" />
                    </div>
                </div>
                <div className="user-info">
                    <div className="user-name">
                        <p>{user?.fullName}</p>
                    </div>
                </div>
            </div>
            <div className="divider"></div>
        </>
    );
};

export default OtherUser;
