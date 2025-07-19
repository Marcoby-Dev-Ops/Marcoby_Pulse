import express from "express";
import {
	isAuthenticated,
	resetPassword,
	sendResetOtp,
	sendVerifyOtp,
	signInUser,
	signOutUser,
	signUpUser,
	verifyEmailWithOtp,
} from "../controllers/auth.controller";
import { validateUser, validateLogin } from "../middlewares/inputValidator";
import userAuth from "../middlewares/user.auth";

const router = express.Router();

router.post("/sign-up", validateUser, signUpUser);
router.post("/sign-in", validateLogin, signInUser);
router.post("/sign-out", signOutUser);
router.post("/send-otp", userAuth, sendVerifyOtp);
router.post("/verify-otp", userAuth, verifyEmailWithOtp);
router.get("/is-auth", userAuth, isAuthenticated);
router.post("/send-reset-otp", sendResetOtp);
router.post("/reset-password", resetPassword);

export default router;
