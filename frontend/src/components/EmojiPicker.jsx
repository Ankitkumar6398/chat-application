import React from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const EmojiPicker = ({ onEmojiSelect, isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleEmojiSelect = (emoji) => {
        onEmojiSelect(emoji.native);
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 z-40"
                onClick={onClose}
            />
            
            {/* Emoji Picker */}
            <div className="absolute bottom-16 left-4 z-50">
                <div className="bg-white rounded-lg shadow-2xl border border-gray-200">
                    <Picker
                        data={data}
                        onEmojiSelect={handleEmojiSelect}
                        theme="light"
                        set="native"
                        previewPosition="none"
                        skinTonePosition="none"
                        maxFrequentRows={0}
                        perLine={8}
                        emojiSize={20}
                        emojiButtonSize={32}
                        emojiButtonRadius={6}
                        searchPosition="sticky"
                        searchPlaceholder="Search emoji..."
                        noResultsEmoji="sleuth_or_spy"
                        noResultsText="No emoji found"
                        categoryIcons={{
                            smileys: '😀',
                            people: '👋',
                            nature: '🌱',
                            foods: '🍔',
                            activity: '⚽',
                            places: '🏠',
                            objects: '💡',
                            symbols: '💕',
                            flags: '🏁',
                        }}
                        style={{
                            width: '320px',
                            height: '400px',
                            border: 'none',
                            borderRadius: '8px',
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default EmojiPicker; 