import userModel from "../models/user.model.js";
import { generateTokens, verifyAccessToken, verifyRefreshToken } from "../utils/utils.js";
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

export const getMe = async (req, res) => {
    
    try {
        
        const token = req.headers.authorization?.split(" ")[1]

        if (!token) {
            return res.status(403).json({
                message: "Unauthorized access"
            })
        };

        const decoded = verifyAccessToken(token);

        const user = await userModel.findById(decoded.id);

        return res.status(200).json({
            message: "Profile fetched successfully",
            user
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error
        })
    }
}

export const refresh = async (req, res) => {

    try {

        const token = req.cookies.refreshToken
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized, refresh Token missing"
            })
        }
        
        const decoded = verifyRefreshToken(token)
      
        const user = await userModel.findById(decoded.id);
      
        if (token !== user.refreshToken) {
            user.refreshToken = null;
            await user.save()
            return res.status(401).json({
                message: "Unauthorized, invalid refresh token"
            })
        }

        const { accessToken, refreshToken } = generateTokens(user._id);
        console.log(accessToken, refreshToken)

        res.cookie("refreshToken", refreshToken, { httpOnly: true })
        
        user.refreshToken = refreshToken;
        await user.save();

        return res.status(200).json({
            message: "Tokens refreshed successfully",
            user,
            accessToken
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
           
        })
    }
}