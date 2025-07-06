import React from 'react';
import Message from './Message';
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from "react-redux";
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

const Messages = () => {
    useGetMessages();
    useGetRealTimeMessage();
    const { messages } = useSelector(store => store.message);

    return (
        <div className='flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50 custom-scrollbar'>
            {messages && messages.length > 0 ? (
                messages.map((message) => (
                    <Message key={message._id} message={message} />
                ))
            ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                        <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p className="text-sm">No messages yet</p>
                        <p className="text-xs text-gray-400">Start a conversation!</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Messages;
