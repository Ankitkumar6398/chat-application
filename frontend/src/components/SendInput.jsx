import React from 'react';
import '../CSS/MessageContainer.css'

const SendInput = () => {
    return (
        <form action="" className='sendInput-form'>
            <div className='sendInput-div'>
                <input
                    className='send-input'
                    type="text"
                placeholder='Send a message...'
                />
                <button className='sendInput-btn'>Send</button>
            </div>
        </form>
    );
};

export default SendInput;