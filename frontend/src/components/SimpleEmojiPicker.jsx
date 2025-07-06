import React from 'react';

const SimpleEmojiPicker = ({ onEmojiSelect, isOpen, onClose }) => {
    const commonEmojis = [
        '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
        '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
        '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
        '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
        '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬',
        '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗',
        '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😯', '😦', '😧',
        '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢',
        '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '💩', '👻', '💀',
        '☠️', '👽', '👾', '🤖', '😺', '😸', '😹', '😻', '😼', '😽',
        '🙀', '😿', '😾', '🙈', '🙉', '🙊', '👶', '👧', '🧒', '👦',
        '👩', '🧑', '👨', '👵', '🧓', '👴', '👮', '🕵️', '👷', '👸',
        '🤴', '👳', '👲', '🧕', '🤵', '👰', '🤰', '🤱', '👼', '🎅',
        '🤶', '🧙', '🧚', '🧛', '🧜', '🧝', '🧞', '🧟', '🧌', '💆',
        '💇', '🚶', '🧍', '🧎', '🏃', '💃', '🕺', '🕴️', '👯', '🧖',
        '🧗', '🤺', '🏇', '⛷️', '🏂', '🏌️', '🏄', '🚣', '🏊', '⛹️',
        '🏋️', '🚴', '🚵', '🤸', '🤼', '🤽', '🤾', '🤹', '🧘', '🛀',
        '🛌', '👭', '👫', '👬', '💏', '💑', '🗣️', '👤', '👥', '🫂',
        '👣', '🦰', '🦱', '🦳', '🦲', '💋', '💌', '💘', '💝', '💖',
        '💗', '💓', '💞', '💕', '💟', '❣️', '💔', '❤️', '🩷', '🧡',
        '💛', '💚', '💙', '🩵', '💜', '🤎', '🖤', '🩶', '🤍', '💋',
        '💯', '💢', '💥', '💫', '💦', '💨', '🕳️', '💬', '🗨️', '🗯️',
        '💭', '💤', '💮', '♨️', '💈', '🛑', '🛢️', '🛎️', '🔑', '🗝️',
        '🔐', '🔒', '🔓', '🔏', '🔐', '🔑', '🗝️', '🔨', '🪓', '⛏️',
        '⚒️', '🛠️', '🔧', '🔩', '⚙️', '🗜️', '⚖️', '🦯', '🔗', '⛓️',
        '🧰', '🧲', '⚗️', '🧪', '🧫', '🧬', '🔬', '🔭', '📡', '💉',
        '🩸', '💊', '🩹', '🩺', '🩻', '🚪', '🛏️', '🛋️', '🪑', '🚽',
        '🚰', '🚿', '🛁', '🪒', '🧽', '🧴', '🛎️', '🔑', '🗝️', '🚪',
        '🪑', '🪞', '🪟', '🛏️', '🛋️', '🪑', '🚽', '🚰', '🚿', '🛁',
        '🪒', '🧽', '🧴', '🛎️', '🔑', '🗝️', '🚪', '🪑', '🪞', '🪟'
    ];

    if (!isOpen) return null;

    const handleEmojiClick = (emoji) => {
        onEmojiSelect(emoji);
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
                <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 max-w-xs">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-gray-700">Emojis</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="grid grid-cols-8 gap-1 max-h-64 overflow-y-auto custom-scrollbar">
                        {commonEmojis.map((emoji, index) => (
                            <button
                                key={index}
                                onClick={() => handleEmojiClick(emoji)}
                                className="w-8 h-8 text-lg hover:bg-gray-100 rounded transition-colors flex items-center justify-center"
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

export default SimpleEmojiPicker; 