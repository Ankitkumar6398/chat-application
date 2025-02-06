import React from 'react';
// import '../CSS/OtherUser.css'

const OtherUser = () => {
    return (

            <div>
                <div className="otherUsers">
                    <div className='avatar online'>
                        <div className='avatar-avatar'>
                            <img src="https://th.bing.com/th/id/OIP.GPgOs_sd9nF8fsKDOJe9dQHaEo?w=269&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="user-profile"/>
                        </div>

                    </div>
                    <div className='users-info'>
                        <div className='users-details'>
                            <p>John Dew</p>
                        </div>
                    </div>
                </div>
                <div className='divider'></div>
            </div>
    );
};

export default OtherUser;