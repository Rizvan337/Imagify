import express from "express";
import { registerUser,loginUser, userCredits, paymentRazorpay, verifyRazorpay } from "../controllers/userController.js";
import userAuth from "../middlewares/auth.js";

const userRouter = express.Router();
// User registration route
userRouter.post("/register", registerUser);
// User login route
userRouter.post("/login", loginUser);
// User credits route
userRouter.get("/credits",userAuth,userCredits)
// Payment route using Razorpay
userRouter.post("/pay-razor",userAuth,paymentRazorpay)
userRouter.post("/verify-razor",verifyRazorpay)

export default userRouter;