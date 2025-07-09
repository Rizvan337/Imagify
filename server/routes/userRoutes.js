import express from "express";
import { registerUser,loginUser, userCredits } from "../controllers/userController.js";
import userAuth from "../middlewares/auth.js";

const userRouter = express.Router();
// User registration route
userRouter.post("/register", registerUser);
// User login route
userRouter.post("/login", loginUser);
// User credits route
userRouter.get("/credits",userAuth,userCredits)

export default userRouter;