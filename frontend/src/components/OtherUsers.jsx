import React from 'react';
import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { useSelector } from 'react-redux';
import '../CSS/OtherUsers.css';

const OtherUsers = () => {
    // my custom hook
    useGetOtherUsers();
    const { otherUsers } = useSelector(store => store.user);
    if (!otherUsers) return null; // early return in React

    return (
        <div className="user-list-container">
            {otherUsers?.map(user => (
                <OtherUser key={user._id} user={user} />
            ))}
        </div>
    );
};

export default OtherUsers;
