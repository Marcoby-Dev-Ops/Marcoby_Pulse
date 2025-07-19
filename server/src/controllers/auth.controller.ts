import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Response, Request } from "express";
import {
	changePasswordAndReset,
	createOtp,
	createResetPassOtp,
	createUser,
	getUserByEmail,
	getUserById,
	getUserByPhoneNo,
	resetOtp,
} from "../models/user.model";
import { Prisma } from "@prisma/client";
import transporter from "../config/nodemailer";

// GETTING SIGN UP EMAIL TEMPLATE PATH
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Handle Auth Response
const handleResponse = (res: Response, status: number, success: boolean, message: string) => {
	res.status(status).json({
		success,
		message,
	});
};

// Register User
const signUpUser = async (req: Request, res: Response) => {
	const { firstName, lastName, email, password, phoneNumber, DOB, companyName, gender }: Prisma.UserCreateInput =
		req.body;
	const signUpTemplate = fs
		.readFileSync(path.resolve(__dirname, "../", "views/signUpTemplate.html"), "utf8")
		.replace("[First Name]", firstName);

	try {
		const existingUser = await getUserByEmail(email);
		const isSamePhoneNumber = await getUserByPhoneNo(phoneNumber);

		if (existingUser) {
			return handleResponse(res, 400, false, "User already exists.");
		}

		if (isSamePhoneNumber) {
			return handleResponse(res, 400, false, "There is an account registered with this phone number");
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await createUser({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			phoneNumber,
			DOB,
			companyName,
			gender,
		});
		const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY!, { expiresIn: "7d" });

		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		// Sending Welcome Email
		const mailInfo = {
			from: process.env.SMTP_USER_2,
			to: email,
			subject: "Welcome to Marcoby Pulse",
			html: signUpTemplate,
		};

		await transporter.sendMail(mailInfo);

		handleResponse(res, 201, true, "Your account has been created successfully");
	} catch (error: any) {
		handleResponse(res, 500, false, error.message);
	}
};

// Log In User
const signInUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user = await getUserByEmail(email);
		if (!user) {
			return handleResponse(res, 400, false, "User does not exist! Please sign up!");
		}

		const isPasswordMatched = await bcrypt.compare(password, user.password);
		if (!isPasswordMatched) {
			return handleResponse(res, 400, false, "Incorrect password! Try again");
		}

		const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY!, { expiresIn: "7d" });

		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});
		res.status(200).json({
			success: true,
			message: "You are successfully logged in",
		});
	} catch (error: any) {
		handleResponse(res, 500, false, error.message);
	}
};

// Log Out User
const signOutUser = async (req: Request, res: Response) => {
	try {
		res.clearCookie("token", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
		});
		handleResponse(res, 200, true, "You are now logged out");
	} catch (error: any) {
		handleResponse(res, 500, false, error.message);
	}
};

// Send VerifyOtp To User Email
const sendVerifyOtp = async (req: Request, res: Response) => {
	try {
		const userId = (req as any).userId;
		const user = await getUserById(userId);

		if (user!.isVerified) {
			return handleResponse(res, 400, false, "Account already verified!");
		}

		const otp = String(Math.floor(100000 + Math.random() * 900000));
		const expiryTime = Date.now() + 30 * 60 * 1000;

		await createOtp(userId, otp, expiryTime);

		// SENDING OTP TO EMAIL
		const sendOtpTemplate = fs
			.readFileSync(path.resolve(__dirname, "../", "views/sendOtpTemplate.html"), "utf8")
			.replace("[First Name]", user!.firstName)
			.replace("[OTP_CODE]", otp);

		const mailInfo = {
			from: process.env.SMTP_USER_2,
			to: user!.email,
			subject: "Account Verification OTP",
			html: sendOtpTemplate,
		};

		await transporter.sendMail(mailInfo);

		handleResponse(res, 200, true, "OTP has been sent to your email");
	} catch (error: any) {
		handleResponse(res, 500, false, error.message);
	}
};

// Verify User Email
const verifyEmailWithOtp = async (req: Request, res: Response) => {
	const { otp } = req.body;
	const userId = (req as any).userId;

	if (!userId || !otp) {
		return handleResponse(res, 400, false, "Missing details");
	}

	try {
		const user = await getUserById(userId);
		if (!user) {
			return handleResponse(res, 400, false, "User not found!");
		}

		if (user.verifyOtp === "" || user.verifyOtp !== otp) {
			return handleResponse(res, 400, false, "Invalid OTP code");
		}
		const verifyOtpExpireAt = user.verifyOtpExpireAt * (1000 * 60);
		if (verifyOtpExpireAt < Date.now()) {
			return handleResponse(res, 400, false, "This OTP code is expired");
		}

		await resetOtp(userId);

		return handleResponse(res, 200, true, "Email is verified successfully");
	} catch (error) {}
};

// Check For authentication
const isAuthenticated = async (req: Request, res: Response) => {
	try {
		handleResponse(res, 200, true, "User is authenticated");
	} catch (error: any) {
		handleResponse(res, 500, false, error.message);
	}
};

// Sending Password Reset OTP
const sendResetOtp = async (req: Request, res: Response) => {
	const { email } = req.body;

	if (!email) {
		return handleResponse(res, 400, false, "Email is required!");
	}

	try {
		const user = await getUserByEmail(email);
		if (!user) {
			return handleResponse(res, 400, false, "User not found!");
		}

		const otp = String(Math.floor(100000 + Math.random() * 900000));
		const expiryTime = Date.now() + 15 * 60 * 1000;

		await createResetPassOtp(email, otp, expiryTime);

		const sendOtpTemplate = fs
			.readFileSync(path.resolve(__dirname, "../", "views/sendPasswordResetOtp.html"), "utf8")
			.replace("[First Name]", user!.firstName)
			.replace("[OTP_CODE]", otp);

		const mailInfo = {
			from: process.env.SMTP_USER_2,
			to: user!.email,
			subject: "Password Reset OTP",
			html: sendOtpTemplate,
		};

		await transporter.sendMail(mailInfo);

		handleResponse(res, 200, true, "Password reset OTP has been sent to your email");
	} catch (error: any) {
		handleResponse(res, 500, false, error.message);
	}
};

// Resetting the password
const resetPassword = async (req: Request, res: Response) => {
	const { email, otp, newPassword } = req.body;
	if (!email || !otp || !newPassword) {
		return handleResponse(res, 400, false, "Email, OTP, and new password are required");
	}

	try {
		const user = await getUserByEmail(email);
		if (!user) {
			return handleResponse(res, 400, false, "User not found!");
		}

		if (user.resetOtp === "" || user.resetOtp !== otp) {
			return handleResponse(res, 400, false, "Invalid OTP");
		}

		const resetOtpExpireAt = user.resetOtpExpireAt * (1000 * 60);
		if (resetOtpExpireAt < Date.now()) {
			return handleResponse(res, 400, false, "This OTP code is expired");
		}

		const isSamePassword = await bcrypt.compare(newPassword, user.password);
		if (isSamePassword) {
			return handleResponse(res, 400, false, "Old password cannot be new password");
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);
		await changePasswordAndReset(email, hashedPassword);

		return handleResponse(res, 200, true, "Password has been reset successfully");
	} catch (error) {}
};
export {
	signUpUser,
	signInUser,
	signOutUser,
	sendVerifyOtp,
	verifyEmailWithOtp,
	isAuthenticated,
	sendResetOtp,
	resetPassword,
};
