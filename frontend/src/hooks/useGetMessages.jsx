import React, { useEffect } from 'react'
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from '../redux/messageSlice';

import toast from 'react-hot-toast';

const BASE_URL = "http://localhost:8080";
const useGetMessages = () => {
    const { selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedUser?._id) return;
            
            try {
                const res = await axios.get(`${BASE_URL}/api/v1/message/${selectedUser._id}`, {
                    withCredentials: true
                });
                dispatch(setMessages(res.data));
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch messages");
            }
        }
        fetchMessages();
    }, [selectedUser?._id, dispatch]);
}

export default useGetMessages;