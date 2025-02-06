import React from 'react';
import '../CSS/SideBar.css';
import OtherUsers from "./OtherUsers";

const SideBar = () => {
    return (
        <div className="sidebar-container">
            {/* Search Form */}
            <form className="sidebar-search-form">
                <input
                    type="text"
                    className="sidebar-search-input"
                    placeholder="Search..."
                />
                <button type='submit' className="sidebar-search-button">Search</button>
            </form>

            {/* Active Users Section */}
            <div className="divider"></div>
                <OtherUsers />
            <div className="btn-logout-1">
                <button className='btn-logout-2'>logout</button>
            </div>

        </div>
    );
};

export default SideBar;
