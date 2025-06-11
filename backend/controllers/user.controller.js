import { User } from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getDataUri from "../utils/datauri.js"
import cloudinary from '../utils/cloudinary.js'
import path from "path"


export const register = async (req, res) => {
    try {
        const { fullName, email, password, phoneNumber, role } = req.body

        if (!fullName || !email || !password || !phoneNumber || !role) {
            return res.status(400).json({
                message: "Please fill all the fields"
            })
        }

        const file = req.file
        const fileUri = getDataUri(file)
        const cloudResponse = cloudinary.uploader.upload(fileUri.content)
        const photo = (await cloudResponse).secure_url

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            fullName,
            email,
            password: hashedPassword,
            phoneNumber,
            role,
            profile: {
                // profilePhoto: cloudResponse.secure_url
                profilePhoto: photo
            }
        })

        return res.status(201).json({
            success: true,
            message: "Account created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later"
        })
    }

}

export const login = async (req, res) => {

    try {
        const { email, password, role } = req.body
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Please fill all the credentials"
            })
        }

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            })
        }

        // check if the role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exist with current role"
            })
        }

        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
            skills: user.profile.skills
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' })
            .json({
                message: `Welcome back ${user.fullName}`,
                user,
                success: true
            })
    } catch (error) {
        console.log(error);
    }

}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, bio, skills } = req.body
        // console.log(fullName, email, phoneNumber, bio, skills);


        // cloudinary files here
        const file = req.file
        const fileUri = getDataUri(file)

        const originalExt = path.extname(file.originalname)           
        const fileName = path.basename(file.originalname, originalExt)
        // const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
            resource_type: 'raw',                
            folder: 'resumes',                  
            public_id: `${fileName}${originalExt}`
        });

        const resume = (await cloudResponse).secure_url


        let skillsArray
        if (skills) {
            skillsArray = skills.split(",")
        }
        const userId = req.id
        let user = await User.findById(userId)

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        // updating data
        if (fullName) user.fullName = fullName
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray

        // resume comes here
        if (cloudResponse) {
            user.profile.resume = resume
            user.profile.resumeOriginalName = file.originalname
        }

        await user.save()


        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
            resume: user.profile.resume
        }

        return res.status(200).json({
            success: true,
            user,
            message: "Profile updated successfully",
        })


    } catch (error) {
        console.log(error);
    }
}