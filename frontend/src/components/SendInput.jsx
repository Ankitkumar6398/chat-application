import React, { useState, useRef, useEffect } from 'react';
import { IoSend } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from '../redux/messageSlice';
import toast from 'react-hot-toast';
import SimpleEmojiPicker from './SimpleEmojiPicker';

const BASE_URL = "http://localhost:8080";

const SendInput = () => {
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message);
    const inputRef = useRef(null);
    const emojiButtonRef = useRef(null);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        if (!selectedUser?._id) {
            toast.error("Please select a user to send message");
            return;
        }

        setIsLoading(true);
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/message/send/${selectedUser._id}`, 
                { message }, 
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            
            if (res.data?.newMessage) {
                dispatch(setMessages([...messages, res.data.newMessage]));
                setMessage("");
                toast.success("Message sent successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to send message");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmojiSelect = (emoji) => {
        const cursorPosition = inputRef.current?.selectionStart || 0;
        const textBeforeCursor = message.slice(0, cursorPosition);
        const textAfterCursor = message.slice(cursorPosition);
        const newMessage = textBeforeCursor + emoji + textAfterCursor;
        setMessage(newMessage);
        
        // Focus back to input and set cursor position after emoji
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
                const newCursorPosition = cursorPosition + emoji.length;
                inputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
            }
        }, 0);
    };

    const toggleEmojiPicker = () => {
        setIsEmojiPickerOpen(!isEmojiPickerOpen);
    };

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Ctrl+E or Cmd+E to open emoji picker
            if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                e.preventDefault();
                if (selectedUser?._id) {
                    toggleEmojiPicker();
                }
            }
            
            // Escape to close emoji picker
            if (e.key === 'Escape' && isEmojiPickerOpen) {
                setIsEmojiPickerOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isEmojiPickerOpen, selectedUser]);

    // Close emoji picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                emojiButtonRef.current && 
                !emojiButtonRef.current.contains(event.target) &&
                !event.target.closest('.emoji-picker-container')
            ) {
                setIsEmojiPickerOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-white border-t border-gray-200 p-3 relative">
            <form onSubmit={onSubmitHandler} className="flex items-end space-x-2">
                {/* Emoji Button */}
                <button
                    type="button"
                    ref={emojiButtonRef}
                    onClick={toggleEmojiPicker}
                    className={`flex-shrink-0 w-10 h-10 rounded-full transition-colors flex items-center justify-center ${
                        isEmojiPickerOpen 
                            ? 'text-blue-600 bg-blue-50' 
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                    disabled={!selectedUser?._id}
                    title="Add emoji (Ctrl+E)"
                >
                    <BsEmojiSmile className="w-5 h-5" />
                </button>

                {/* Message Input */}
                <div className="flex-1 relative">
                    <input
                        ref={inputRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        placeholder="Type a message... (Ctrl+E for emoji)"
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        disabled={isLoading || !selectedUser?._id}
                        rows="1"
                    />
                </div>

                {/* Send Button */}
                <button 
                    type="submit" 
                    className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-200 flex items-center justify-center"
                    disabled={isLoading || !message.trim() || !selectedUser?._id}
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <IoSend className="w-5 h-5" />
                    )}
                </button>
            </form>

            {/* Emoji Picker */}
            <div className="emoji-picker-container">
                <SimpleEmojiPicker
                    isOpen={isEmojiPickerOpen}
                    onEmojiSelect={handleEmojiSelect}
                    onClose={() => setIsEmojiPickerOpen(false)}
                />
            </div>
        </div>
    );
};

export default SendInput;
