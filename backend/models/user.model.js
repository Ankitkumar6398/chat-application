import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    gender:{
        type: String,
        enum:["Male", "Female"],
        required: true,
    },
    profilePhoto: {
        type: String,
        default: function() {
            // Default avatar based on gender
            return this.gender === "Male" 
                ? `https://avatar.iran.liara.run/public/boy?username=${this.username}`
                : `https://avatar.iran.liara.run/public/girl?username=${this.username}`;
        }
    },
    // You could also add avatar customization fields
    avatarColor: {
        type: String,
        default: function() {
            // Generate a random color for avatar background
            const colors = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50'];
            return colors[Math.floor(Math.random() * colors.length)];
        }
    }
},{ timestamps: true });

// Pre-save hook to handle password hashing if needed
// userSchema.pre("save", async function (next) {
//     if (this.isModified("password")) {
//         const bcrypt = await import("bcryptjs");
//         this.password = await bcrypt.hash(this.password, 10); // Hash password before saving
//     }
//     next();
// });

// Create the User model
const User = mongoose.model("User", userSchema);

export default User;
