import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    const {fullName, username, password, confirmPassword, gender} = req.body;

    // Validation: Ensure all required fields are provided
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        return res.status(400).json({message: "All fields are required"});
    }
    if (password !== confirmPassword) {
        return res.status(400).json({message: "Passwords do not match"});
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({username: username});
        if (existingUser) {
            return res.status(400).json({message: "username already in use"});
        }


        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const maleAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Create a new user
        const newUser = new User({
            fullName, username, avatar: gender === "Male" ? maleAvatar : femaleAvatar, password: hashedPassword, gender
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            success: true,
        });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({message: "Server error. Please try again later."});
    }
};

export const loginUser = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({message: "All fields are required"});
    }

    try {
        const user = await User.findOne({username});
        if (!user) {

            return res.status(400).json({
                message: "Incorrect username or password", success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect password", success: false
            });
        }

        const tokenData = {
            userId: user._id,
        }
        const token = await jwt.sign(tokenData, process.env.SECRET, {expiresIn: "1d"});

        return res.status(200).cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict"
        }).json({
            _id: user._id, username: user.username, fullName: user.fullName
        });


    } catch (err) {
        console.error("Error during login:", err);
    }
}

export const logoutUser = (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge: 0}).json({
            message: "User logged out",

        });
    } catch (err) {
        console.error("Error during logout:", err);
    }
}

export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");
        return res.status(200).json(otherUsers);
    } catch (err) {
        console.error("Error during getOtherUsers", err);
    }
}