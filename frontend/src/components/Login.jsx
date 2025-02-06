import React, {useState} from "react";
import "../CSS/Login.css";
import {Link,useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import {setAuthUser} from "../redux/userSlice";



function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [user, setUser] = useState({
        username: "",
        password: "",
    });







    const onSubmit = async(e) => {
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:8080/api/user/login', user,{
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,

            });
            navigate("/");
            toast.success(res.data.message);
            dispatch(setAuthUser(res.data));


        }catch(err){
            toast.error(err.response.data.message)
            console.log(err);
        }
        setUser({
            username: "",
            password: "",

        })
    };

    return (<div className="signup-container">
        <div className="signup-card">
            <h2 className="signup-title">Login an Account</h2>
            <form onSubmit={onSubmit} className="signup-form">

                <input
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    type="username"
                    placeholder="UserName"
                    className="signup-input"
                />
                <input
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    type="password"
                    placeholder="Password"
                    className="signup-input"
                />

                <button type="submit" className="signup-button">
                    Login
                </button>
            </form>
            <p className="signup-footer">
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    </div>);
}

export default Login;
