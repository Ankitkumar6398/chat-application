import React from 'react';

const QuickEmojiReactions = ({ onEmojiSelect, isOpen, onClose, position = 'bottom' }) => {
    const quickEmojis = ['👍', '❤️', '😂', '😮', '😢', '😡', '🎉', '👏', '🔥', '💯'];

    if (!isOpen) return null;

    const handleEmojiClick = (emoji) => {
        onEmojiSelect(emoji);
        onClose();
    };

    const getPositionClasses = () => {
        switch (position) {
            case 'top':
                return 'bottom-full mb-2';
            case 'left':
                return 'right-full mr-2';
            case 'right':
                return 'left-full ml-2';
            default:
                return 'top-full mt-2';
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 z-40"
                onClick={onClose}
            />
            
            {/* Quick Emoji Reactions */}
            <div className={`absolute ${getPositionClasses()} z-50`}>
                <div className="bg-white rounded-full shadow-lg border border-gray-200 p-2">
                    <div className="flex space-x-1">
                        {quickEmojis.map((emoji, index) => (
                            <button
                                key={index}
                                onClick={() => handleEmojiClick(emoji)}
                                className="w-8 h-8 text-lg hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center hover:scale-110 transform"
                                title={`React with ${emoji}`}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuickEmojiReactions; 