import React from 'react';
import SideBar from '../components/SideBar';
import MessageContainer from '../components/MessageContainer';
import '../CSS/HomePage.css'
const HomePage = () => {
    return (
        <div className='HomePage'>
            <SideBar/>
            <MessageContainer/>

            
        </div>
    );
};

export default HomePage;