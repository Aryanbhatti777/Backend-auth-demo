import userModel from "../models/user.model.js";
import { generateTokens } from "../utils/utils.js";
import bcrypt from "bcryptjs"

export const register = async (req, res) => {

    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are mandatory"
        })
    }

    try {
        
        const userExists = await userModel.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword
        })

        const { accessToken, refreshToken } = generateTokens(user._id)

        user.refreshToken = refreshToken;
        await user.save()

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true
        })

        return res.status(201).json({
            message: "user created successfully",
            user,
            accessToken
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error
        })
    }
}