import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import MessageContainer from './MessageContainer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { authUser, selectedUser } = useSelector(store => store.user);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, []);

  // Close sidebar when a user is selected on mobile
  useEffect(() => {
    if (selectedUser && window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, [selectedUser]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile overlay for sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed md:relative z-50 h-full
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        transition-transform duration-300 ease-in-out
        w-80 md:w-80 lg:w-96
      `}>
        <SideBar onBackClick={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col h-full">
        {selectedUser ? (
          <MessageContainer onMenuClick={() => setIsSidebarOpen(true)} />
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 bg-gray-50">
            <div className="text-center p-8">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Hi, {authUser?.fullName}</h1>
              <p className="text-gray-600 mb-6">Let's start a conversation</p>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Open Contacts
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
