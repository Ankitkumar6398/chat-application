import React from 'react';
import SendInput from './SendInput';
import Messages from './Messages';
import { useSelector } from "react-redux";
import '../CSS/MessageContainer.css';

const MessageContainer = () => {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
    const isOnline = onlineUsers?.includes(selectedUser?._id);

    return (
        <>
            {
                selectedUser !== null ? (
                    <div className='message-container'>
                        <div className='user-info'>
                            <div className={`avatar ${isOnline ? 'online' : ''}`}>
                                <div className='profile-pic'>
                                    <img src={selectedUser?.profilePhoto} alt="user-profile" />
                                </div>
                            </div>
                            <div className='user-details'>
                                <div className='user-name'>
                                    <p>{selectedUser?.fullName}</p>
                                </div>
                            </div>
                        </div>
                        <Messages />
                        <SendInput />
                    </div>
                ) : (
                    <div className='welcome-container'>
                        <h1 className='welcome-title'>Hi, {authUser?.fullName} </h1>
                        <h1 className='welcome-message'>Let's start a conversation</h1>
                    </div>
                )
            }
        </>
    )
}

export default MessageContainer;
