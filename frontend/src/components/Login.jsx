import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userSlice';

// Define BASE_URL directly instead of importing it
const BASE_URL = "http://localhost:8080";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      navigate("/");
      console.log(res);
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred during login");
      console.log(error);
    }

    setUser({
      username: "",
      password: ""
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 font-sans relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.05)_80%,transparent_80%,transparent)] bg-[length:25px_25px] opacity-30 animate-pulse"></div>
      
      <div className="relative bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/10 w-full max-w-md mx-auto transform transition-all duration-400 hover:-translate-y-1 hover:shadow-3xl z-10">
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
          Login
        </h1>
        
        <form onSubmit={onSubmitHandler} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm transition-all duration-300 bg-white shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 placeholder-gray-400"
              type="text"
              placeholder="Username"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm transition-all duration-300 bg-white shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 placeholder-gray-400"
              type="password"
              placeholder="Password"
            />
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors duration-300 relative group">
              Signup
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </p>

          <button 
            type="submit" 
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/30 focus:outline-none focus:ring-4 focus:ring-indigo-200 relative overflow-hidden group"
          >
            <span className="relative z-10">Login</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
