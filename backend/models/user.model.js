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
    avatar: {
        type: String,
        default: "",
    },
    gender:{
        type: String,
        enum:["Male", "Female"],
        required: true,
    },
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
