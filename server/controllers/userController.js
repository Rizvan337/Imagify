import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//user registration
const registerUser = async (req,res)=>{
    try {
        const {name,email,password} = req.body
        if(!name || !email || !password) {
            return res.json({success:false,message: "Please provide all fields"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const userData = {
            name,
            email,
            password:hashedPassword
        }
        const newUser = new userModel(userData)
        const user = await newUser.save()
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '30d'})
        res.json({success:true,message:"User registered successfully",user:{name:user.name},token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
//user login
const loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body
        if(!email || !password) {
            return res.json({success:false,message: "Please provide all fields"})
        }
        const user = await userModel.findOne({email})
        if(!user) {
            return res.json({success:false,message: "User not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.json({success:false,message: "Invalid credentials"})
        }
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '30d'})
        res.json({success:true,message:"User logged in successfully",user:{name:user.name},token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
const userCredits = async (req,res)=>{
    console.log("🔍 userCredits route hit");

    try {
        const userId = req.userId;
        const user = await userModel.findById(userId)
        res.json({success:true,credits:user.creditBalance,user:{name:user.name}})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {registerUser, loginUser, userCredits}