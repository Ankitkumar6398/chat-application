import React, {useState} from "react";
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



    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 font-sans relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.05)_80%,transparent_80%,transparent)] bg-[length:25px_25px] opacity-30 animate-pulse"></div>
            
            <div className="relative bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/10 w-full max-w-md mx-auto transform transition-all duration-400 hover:-translate-y-1 hover:shadow-3xl z-10">
                <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                    Create an Account
                </h2>
                
                <form onSubmit={onSubmit} className="space-y-4">
                    <input
                        value={user.fullName}
                        onChange={(e) => setUser({...user, fullName: e.target.value})}
                        type="text"
                        placeholder="Full Name"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm transition-all duration-300 bg-white shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 placeholder-gray-400"
                    />
                    <input
                        value={user.username}
                        onChange={(e) => setUser({...user, username: e.target.value})}
                        type="text"
                        placeholder="Username"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm transition-all duration-300 bg-white shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 placeholder-gray-400"
                    />
                    <input
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm transition-all duration-300 bg-white shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 placeholder-gray-400"
                    />
                    <input
                        value={user.confirmPassword}
                        onChange={(e) => setUser({...user, confirmPassword: e.target.value})}
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm transition-all duration-300 bg-white shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 placeholder-gray-400"
                    />
                    
                    <div className="flex justify-center space-x-8 py-4">
                        <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium text-gray-700">Male</p>
                            <input
                                checked={user.gender === "Male"}
                                onChange={() => handleCheckBox("Male")}
                                type="checkbox"
                                className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium text-gray-700">Female</p>
                            <input
                                checked={user.gender === "Female"}
                                onChange={() => handleCheckBox("Female")}
                                type="checkbox"
                                className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                            />
                        </div>
                    </div>
                    
                    <button 
                        type="submit" 
                        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/30 focus:outline-none focus:ring-4 focus:ring-indigo-200 relative overflow-hidden group"
                    >
                        <span className="relative z-10">Sign Up</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>
                    </button>
                </form>
                
                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors duration-300 relative group">
                        Log in
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
