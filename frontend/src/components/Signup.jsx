import React, {useState} from "react";
import "../CSS/Signup.css";
import {Link,useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


function Signup() {
    const [user, setUser] = useState({
        fullName: "", username: "", password: "", confirmPassword: "", gender: ""
    });

    const navigate = useNavigate();
    const handleCheckBox = (gender) => {
        setUser({...user, gender});
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/v1/user/register', user, {
                headers: {
                    "Content-Type": "application/json"
                }, withCredentials: true
            });
            console.log(res);
            if(res.data.success)   {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (e) {
            console.log(e);
            toast.error(e.response?.data?.message || "Registration failed. Please try again.");
        }
        setUser({
            fullName: "", username: "", password: "", confirmPassword: "", gender: ""
        })
    };



    return (<div className="signup-container">
            <div className="signup-card">
                <h2 className="signup-title">Create an Account</h2>
                <form onSubmit={onSubmit} className="signup-form">
                    <input
                        value={user.fullName}
                        onChange={(e) => setUser({...user, fullName: e.target.value})}
                        type="text"
                        placeholder="Full Name"
                        className="signup-input"
                    />
                    <input
                        value={user.username}
                        onChange={(e) => setUser({...user, username: e.target.value})}
                        type="text"
                        placeholder="Username"
                        className="signup-input"
                    />
                    <input
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        type="password"
                        placeholder="Password"
                        className="signup-input"
                    />
                    <input
                        value={user.confirmPassword}
                        onChange={(e) => setUser({...user, confirmPassword: e.target.value})}
                        type="password"
                        placeholder="Confirm Password"
                        className="signup-input"
                    />
                    <div className="checkbox">
                        <div>
                            <p>Male</p>
                            <input
                                checked={user.gender === "Male"}
                                onChange={() => handleCheckBox("Male")}
                                type="checkbox"
                            />
                        </div>
                        <div>
                            <p>Female</p>
                            <input
                                checked={user.gender === "Female"}
                                onChange={() => handleCheckBox("Female")}
                                type="checkbox"
                            />
                        </div>
                    </div>
                    <button type="submit" className="signup-button">
                        Sign Up
                    </button>
                </form>
                <p className="signup-footer">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>);
}

export default Signup;
