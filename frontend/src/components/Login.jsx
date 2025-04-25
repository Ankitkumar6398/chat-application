import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userSlice';
import '../CSS/Login.css'; // Import the CSS file

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
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        <form onSubmit={onSubmitHandler}>

          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="form-input"
              type="text"
              placeholder="Username"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="form-input"
              type="password"
              placeholder="Password"
            />
          </div>

          <p className="signup-link">
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>

          <div>
            <button type="submit" className="login-button">Login</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;
