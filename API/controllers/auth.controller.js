import User from '../Models/user.model.js'
import bcrypt from "bcrypt";

import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";

export const signup = async (req, res) => {
    try{
        const { fullName, username, email, password } = req.body

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)){
            return res.status(400).json({ error })
        }

        const existingUser = await User.findOne({ username })
        if (existingUser){
            return res.status(400).json({ error: "Username is already taken"})
        }

        const existigEmail = await User.findOne({ email })
        if(existigEmail){
            return res.status(400).json({ error: "Email is already taken" })
        }
        if(password.lenght < 6){
            return res.status(400).json({ error: "Password must be at least 6 characters long"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            username,
            email,
            password:hashedPassword
        })

        if(newUser){
            generateTokenAndSetCookie(newUser.id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullname,
                username: newUser.username,
                email: newUser.email,
            })
        }
    }catch (err) {
        res.status(500).json({ error: "Internal server error "})
        console.log(err)
    }
}

export const login = async (req, res) => {
    try{
        const { username, password} = req.body;
        const user = await User.findOne({ username })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if (!user || !isPasswordCorrect){
            return res.status(400).json({ error: "Invalid username or password"})
        }

        generateTokenAndSetCookie(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email
        });
    }catch (err) {
        res.status(500).json({ message: "Internal server error "})
        console.log( err)
    }
}


export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({ message: "Logged out succesfully" })
    } catch (err){
        res.status(500).json({ error: "Internal server error"})
    }
}

