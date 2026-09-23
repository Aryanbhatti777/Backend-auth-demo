import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, "Name must me atleast 3 characters long"],
        maxLength: [50, "Name must be under 50 characters"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    }
})

const userModel = mongoose.model("User", userSchema);
export default userModel;