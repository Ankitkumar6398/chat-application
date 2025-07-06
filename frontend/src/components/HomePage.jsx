import React, { useEffect } from 'react';
import SideBar from './SideBar';
import MessageContainer from './MessageContainer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { authUser } = useSelector(store => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <SideBar />
      <MessageContainer />
    </div>
  );
};

export default HomePage;
